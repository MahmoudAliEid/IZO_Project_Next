// ** React Imports
import { KeyboardEvent, MouseEvent, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ListItemButton from '@mui/material/ListItemButton'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const DrawerComponent = () => {
  // ** State
  const [open, setOpen] = useState<boolean>(false)

  const toggleDrawer = (open: boolean) => (event: KeyboardEvent | MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as KeyboardEvent).key === 'Tab' || (event as KeyboardEvent).key === 'Shift')
    ) {
      return
    }

    setOpen(open)
  }

  return (
    <div>
      <Button variant='outlined' onClick={toggleDrawer(true)}>
        Left
      </Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <Box role='presentation' sx={{ width: 260 }} onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Icon icon='bx:archive-in' />
                </ListItemIcon>
                <ListItemText primary='Index' />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Icon icon='bx:star' />
                </ListItemIcon>
                <ListItemText primary='Starred' />
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Icon icon='bx:trash-alt' />
                </ListItemIcon>
                <ListItemText primary='Trash' />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Icon icon='bx:info-circle' />
                </ListItemIcon>
                <ListItemText primary='Spam' />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </div>
  )
}

export default DrawerComponent
