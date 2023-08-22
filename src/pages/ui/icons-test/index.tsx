// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

// ** Axios Import
import axios from 'axios'

// ** Type Import
import { IconsDataType } from 'src/@fake-db/iconify-icons'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const AnalyticsDashboard = () => {
  // ** State
  const [iconData, setIconData] = useState<IconsDataType[]>([])

  useEffect(() => {
    axios.get('/api/icons/data').then(response => setIconData(response.data))
  }, [])

  return (
    <>
      <Typography variant='h5' sx={{ mb: 4 }}>
        All the icons are made with the help of our custom component.
      </Typography>
      <Typography variant='h4' sx={{ mb: 4 }}>
        Icons from APIs
      </Typography>
      <Typography variant='h5' sx={{ mb: 4 }}>
        Online Icons
      </Typography>
      <Typography>
        BoxIcons coming from Iconify's API
        <Icon icon='bx:x' />
      </Typography>
      <Typography variant='h5' sx={{ my: 4 }}>
        FakeDB Box icons but offline
      </Typography>
      <Typography sx={{ mb: 4 }}>Box icons coming from our API and SVGs are from the Iconify Bundle</Typography>
      {iconData.map((icon: IconsDataType, index: number) => (
        <Icon key={index} fontSize='2.1875rem' icon={`bx:${icon.icon}`} />
      ))}
      <Typography variant='h4' sx={{ my: 4 }}>
        Offline Icons
      </Typography>
      <Typography>
        Iconify icons come with the following props as well: <code>id</code>, <code>key</code>, <code>name</code>,{' '}
        <code>ref</code>, <code>role</code>, <code>strokeLinecap</code>.
      </Typography>
      <Typography>
        Our logo wrapped with <code>Box</code> component
        <Box component='span' sx={{ ml: 5, display: 'inline-flex', color: 'primary.main' }}>
          <Icon icon='custom:logo' />
        </Box>
      </Typography>
      <Typography sx={{ mt: 4, fontWeight: 600 }}>Material Line Icons with height</Typography>
      <Icon icon='line-md:home-twotone-alt' height='35' />
      <Icon icon='line-md:github' height='35' />
      <Icon icon='line-md:document-list' height='35' />
      <Icon icon='line-md:document-code' height='35' />
      <Icon icon='line-md:image-twotone' height='35' />
      <Typography sx={{ mt: 4, fontWeight: 600 }}>Box Icons</Typography>
      <Typography>
        Simple Box Icon
        <Icon icon='bx:rocket' />
      </Typography>
      <Typography sx={{ display: 'flex', alignItems: 'center' }}>
        Box Icon wrapped with <code>Box</code> component
        <Box component='span' sx={{ ml: 5, display: 'inline-flex', color: 'success.main' }}>
          <Icon icon='bx:rocket' />
        </Box>
      </Typography>
      <Typography>
        Box Icon with font-size
        <Icon icon='bx:rocket' fontSize={50} />
      </Typography>
      <Typography>
        Box Icon with color and passed color-name
        <Icon icon='bx:rocket' color='red' />
      </Typography>
      <Typography>
        Box Icon with horizontal flip
        <Icon icon='bx:rocket' hFlip />
      </Typography>
      <Typography>
        Box Icon with vertical flip
        <Icon icon='bx:rocket' vFlip />
      </Typography>
      <Typography>
        Box Icon with vertical & horizontal flips
        <Icon icon='bx:rocket' hFlip vFlip />
      </Typography>
      <Typography>
        Box Icon with color and passed hex code
        <Icon icon='bx:rocket' color='#09a6eb' />
      </Typography>
      <Typography>
        Box Icon with rotate 90 degree
        <Icon icon='bx:rocket' rotate={1} />
      </Typography>
      <Typography>
        Box Icon with rotate 270 degree
        <Icon icon='bx:rocket' rotate={3} />
      </Typography>
      <Typography>
        Inline Box Icon
        <Icon icon='bx:rocket' inline={true} />
      </Typography>
      <Typography>
        Box Icon with width
        <Icon icon='bx:rocket' width='100' />
      </Typography>
      <Typography>
        Box Icon with height
        <Icon icon='bx:rocket' height='75' />
      </Typography>
      <Typography>
        Box Icon with cursor pointer
        <Icon icon='bx:rocket' cursor='pointer' />
      </Typography>
      <Typography>
        Box Icon with display flex
        <Icon icon='bx:rocket' display='flex' />
      </Typography>
      <Typography>
        Box Icon with fill-opacity using string
        <Icon icon='bx:rocket' fillOpacity='0.5' />
        Box Icon with fill-opacity using number
        <Icon icon='bx:rocket' fillOpacity={0.25} />
      </Typography>
      <Typography>
        Box Icon with onClick. It has all props for <code>on</code>
        <Icon icon='bx:rocket' onClick={() => alert('Clicked on the icon')} />
      </Typography>
      <Typography>
        Box Icon with opacity using string
        <Icon icon='bx:rocket' opacity='0.6' />
        Box Icon with opacity using number
        <Icon icon='bx:rocket' opacity={0.3} />
      </Typography>
      <Typography>
        Box Icon with stroke
        <Icon icon='bx:rocket' stroke='#f00' />
      </Typography>
      <Typography>
        Box Icon with stroke and stroke-dasharray using string
        <Icon icon='bx:rocket' stroke='#f00' strokeDasharray='3' />
        Box Icon with stroke and stroke-dasharray using number
        <Icon icon='bx:rocket' stroke='#f00' strokeDasharray={5} />
      </Typography>
      <Typography>
        Box Icon with stroke and stroke-opacity using string
        <Icon icon='bx:rocket' stroke='#f00' strokeOpacity='0.5' />
        Box Icon with stroke and stroke-opacity using number
        <Icon icon='bx:rocket' stroke='#f00' strokeOpacity={0.25} />
      </Typography>
      <Typography>
        Box Icon with stroke and stroke-width using string
        <Icon icon='bx:rocket' stroke='#f00' strokeWidth='2' />
        Box Icon with stroke and stroke-width using number
        <Icon icon='bx:rocket' stroke='#f00' strokeWidth={2} />
      </Typography>
      <Typography>
        Box Icon with style
        <Icon icon='bx:rocket' style={{ color: '#00f' }} />
      </Typography>
      <Typography>
        Box Icon with transform scale
        <Icon icon='bx:rocket' transform='scale(2)' />
      </Typography>
      <Typography>
        Box Icon with visibility hidden
        <Icon icon='bx:rocket' visibility='hidden' />
      </Typography>
      <Typography variant='h5' sx={{ mt: 4 }}>
        Icons from different icon libraries
      </Typography>
      <Icon icon='bx:basket' />
      <Icon icon='bi:airplane-engines' />
      <Icon icon='tabler:anchor' />
      <Icon icon='uit:adobe-alt' />
      <Icon icon='fa6-regular:comment' />
      <Icon icon='twemoji:auto-rickshaw' />
    </>
  )
}

export default AnalyticsDashboard
