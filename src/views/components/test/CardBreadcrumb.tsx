// ** React Imports
import { MouseEvent } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Breadcrumbs from '@mui/material/Breadcrumbs'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const CardBreadcrumb = () => {
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault()
    console.info('You clicked a breadcrumb.')
  }

  return (
    <Card>
      <CardContent>
        <Breadcrumbs aria-label='breadcrumb'>
          <Link href='/' onClick={handleClick}>
            MUI
          </Link>
          <Link href='/' onClick={handleClick}>
            Core
          </Link>
          <Typography>Breadcrumb</Typography>
        </Breadcrumbs>

        <Breadcrumbs separator='-' aria-label='breadcrumb'>
          <Link href='/' onClick={handleClick}>
            MUI
          </Link>
          <Link href='/' onClick={handleClick}>
            Core
          </Link>
          <Typography>Breadcrumb</Typography>
        </Breadcrumbs>

        <Breadcrumbs aria-label='breadcrumb' separator={<Icon icon='bx:chevron-right' fontSize={20} />}>
          <Link href='/' onClick={handleClick}>
            MUI
          </Link>
          <Link href='/' onClick={handleClick}>
            Core
          </Link>
          <Typography>Breadcrumb</Typography>
        </Breadcrumbs>

        <Breadcrumbs aria-label='breadcrumb' sx={{ mt: 2, '& a': { display: 'flex', alignItems: 'center' } }}>
          <Link href='/' onClick={handleClick}>
            <Icon icon='bx:home' fontSize={20} />
            MUI
          </Link>
          <Link href='/' onClick={handleClick}>
            <Icon icon='bx:bookmark' fontSize={20} />
            Core
          </Link>
          <Typography sx={{ display: 'flex', alignItems: 'center' }}>
            <Icon icon='bx:file-blank' fontSize={20} />
            Breadcrumb
          </Typography>
        </Breadcrumbs>
      </CardContent>
    </Card>
  )
}

export default CardBreadcrumb
