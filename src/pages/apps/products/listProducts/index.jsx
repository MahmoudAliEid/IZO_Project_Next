/* eslint-disable @typescript-eslint/no-unused-vars */
// ** React & Components
import { useState, useEffect } from 'react'
import ProgressCustomization from 'src/views/components/progress/ProgressCircularCustomization'
import QuickSearchToolbar from 'src/views/table/data-grid/QuickSearchToolbar'
import DeleteGlobalAlert from 'src/@core/components/deleteGlobalAlert/DeleteGlobalAlert'
import FormProduct from 'src/@core/components/products/listProduct/forms/FormProduct'
import ProductsTable from 'src/@core/components/products/listProduct/ProductsTable'

// ** Next Imports
import { getCookie } from 'cookies-next'
import Image from 'next/image'
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import Card from '@mui/material/Card'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { FormControl, Select, InputLabel, FormControlLabel, Checkbox } from '@mui/material'
import { styled } from '@mui/material/styles'
import { Global, css } from '@emotion/react'
import useThemeColor from 'src/@core/utils/useThemeColor'

// ** Util Import
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'

// ** Custom Component Import
import TabsWrapper from 'src/@core/styles/mui/TabsWrapper'

// ** Third Party Components
import { DataGrid } from '@mui/x-data-grid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from 'src/store/apps/products/listProducts/getProductsSlice'
import { fetchCreateProduct } from 'src/store/apps/products/listProducts/getCreateProductSlice'

import { deleteProduct } from 'src/store/apps/products/listProducts/postDeleteProductSlice'

const ListProducts = () => {
  // ** State
  const [openForm, setOpenForm] = useState(false)
  const [token, setToken] = useState(null)
  const [url, setUrl] = useState(null)
  const [TabValue, setTabValue] = useState('1')
  const title = 'Products List'
  const { themeColor } = useThemeColor()

  // ** Hooks
  const dispatch = useDispatch()

  useEffect(() => {
    // ** Cookies
    const token = getCookie('token')
    const url = getCookie('apiUrl')
    setToken(token)
    setUrl(url)
  }, [token, url])

  useEffect(() => {
    dispatch(fetchCreateProduct())
  }, [dispatch])

  useEffect(() => {
    if (token && url) {
      dispatch(fetchProducts({ token }))
    }
  }, [dispatch, token, url])

  // ** Functions
  const handleAddClickOpen = () => setOpenForm(true)
  const toggle = () => {
    setOpenForm(prev => !prev)
  }

  const handleChangeTabValue = (event, newValue) => {
    setTabValue(newValue)
  }

  return (
    <Grid container spacing={6}>
      <Grid item lg={12} xs={12}>
        <Box>
          <Card sx={{ mb: 20 }}>
            <CardHeader title={title} />
            <Divider sx={{ m: '0 !important' }} />
            <Box
              sx={{
                p: 6,
                gap: 4,
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Box sx={{ gap: 4, display: 'flex', flexWrap: 'wrap', alignItems: 'center', width: '200px' }}>
                <Button fullWidth startIcon={<AddCircleOutlineIcon />} onClick={handleAddClickOpen} variant='contained'>
                  Add
                </Button>
              </Box>
            </Box>
          </Card>

          <Box>
            <TabsWrapper panelTopRound='both'>
              <TabContext value={TabValue}>
                <TabList centered onChange={handleChangeTabValue} aria-label='icon tabs example'>
                  <Tab value='1' label='All Products' icon={<Icon icon='system-uicons:cubes' />} />
                  <Tab value='2' label='Inventory Report' icon={<Icon icon='material-symbols:inventory-sharp' />} />
                </TabList>
                <TabPanel value='1'>
                  <ProductsTable />
                </TabPanel>
                <TabPanel value='2'>
                  <Typography>Under Develope</Typography>
                </TabPanel>
              </TabContext>
            </TabsWrapper>
          </Box>
        </Box>
      </Grid>
      {openForm && <FormProduct isEdit={false} open={openForm} toggle={toggle} />}
    </Grid>
  )
}

export default ListProducts
