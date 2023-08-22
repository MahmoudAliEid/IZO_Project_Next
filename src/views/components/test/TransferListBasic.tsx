// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import List from '@mui/material/List'
import Button from '@mui/material/Button'
import ListItem from '@mui/material/ListItem'
import Checkbox from '@mui/material/Checkbox'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

const not = (a: readonly number[], b: readonly number[]) => {
  return a.filter(value => b.indexOf(value) === -1)
}

const intersection = (a: readonly number[], b: readonly number[]) => {
  return a.filter(value => b.indexOf(value) !== -1)
}

const TransferListBasic = () => {
  const [checked, setChecked] = useState<readonly number[]>([])
  const [left, setLeft] = useState<readonly number[]>([0, 1, 2, 3])
  const [right, setRight] = useState<readonly number[]>([4, 5, 6, 7])

  const leftChecked = intersection(checked, left)
  const rightChecked = intersection(checked, right)

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value)
    const newChecked = [...checked]

    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }

    setChecked(newChecked)
  }

  const handleAllRight = () => {
    setRight(right.concat(left))
    setLeft([])
  }

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked))
    setLeft(not(left, leftChecked))
    setChecked(not(checked, leftChecked))
  }

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked))
    setRight(not(right, rightChecked))
    setChecked(not(checked, rightChecked))
  }

  const handleAllLeft = () => {
    setLeft(left.concat(right))
    setRight([])
  }

  const customList = (items: readonly number[]) => (
    <Card>
      <List component='div' role='list' sx={{ width: 200, height: 265, overflow: 'auto' }}>
        {items.map((value: number) => {
          const labelId = `transfer-list-item-${value}-label`

          return (
            <ListItem key={value} role='listitem' button onClick={handleToggle(value)}>
              <ListItemIcon>
                <Checkbox
                  tabIndex={-1}
                  disableRipple
                  checked={checked.indexOf(value) !== -1}
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`List item ${value + 1}`} />
            </ListItem>
          )
        })}
        <ListItem />
      </List>
    </Card>
  )

  return (
    <Grid container spacing={4} justifyContent='center' alignItems='center'>
      <Grid item>{customList(left)}</Grid>
      <Grid item>
        <Grid container direction='column' alignItems='center'>
          <Button
            size='small'
            sx={{ my: 1 }}
            variant='outlined'
            onClick={handleAllRight}
            aria-label='move all right'
            disabled={left.length === 0}
          >
            ≫
          </Button>
          <Button
            size='small'
            sx={{ my: 1 }}
            variant='outlined'
            onClick={handleCheckedRight}
            aria-label='move selected right'
            disabled={leftChecked.length === 0}
          >
            &gt;
          </Button>
          <Button
            size='small'
            sx={{ my: 1 }}
            variant='outlined'
            onClick={handleCheckedLeft}
            aria-label='move selected left'
            disabled={rightChecked.length === 0}
          >
            &lt;
          </Button>
          <Button
            size='small'
            sx={{ my: 1 }}
            variant='outlined'
            onClick={handleAllLeft}
            aria-label='move all left'
            disabled={right.length === 0}
          >
            ≪
          </Button>
        </Grid>
      </Grid>
      <Grid item>{customList(right)}</Grid>
    </Grid>
  )
}

export default TransferListBasic
