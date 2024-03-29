
'use client'

// ** React Imports
import { useState,  useRef } from 'react'
import {  Divider} from '@mui/material'

// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import TextField from '@mui/material/TextField'
import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { SelectChangeEvent } from '@mui/material'

const ProductPrices = () => {
  const [tax, setTax] = useState('')

  const [productType, setProductType] = useState('')

  const handleChangeTax = (event: SelectChangeEvent) => {
    setTax(event.target.value)
  }

  const handleChangeProductType = (event: SelectChangeEvent) => {
    setProductType(event.target.value)
  }

  // ** States
  const [data, setData] = useState([
    {
      id: 1,
      typeOfPrice: 'Default Price',
      defaultPurchasePrice: {
        excTax: '',
        incTax: ''
      },
      margin: '25',
      defaultSalesPrice: {
        excTax: '',
        incTax: ''
      }
    },
    {
      id: 2,
      typeOfPrice: 'Whole Price',
      defaultPurchasePrice: {
        excTax: '',
        incTax: ''
      },
      margin: '25',
      defaultSalesPrice: {
        excTax: '',
        incTax: ''
      }
    },
    {
      id: 3,
      typeOfPrice: 'Retail Price',
      defaultPurchasePrice: {
        excTax: '',
        incTax: ''
      },
      margin: '25',
      defaultSalesPrice: {
        excTax: '',
        incTax: ''
      }
    },
    {
      id: 4,
      typeOfPrice: 'Minimum Price',
      defaultPurchasePrice: {
        excTax: '',
        incTax: ''
      },
      margin: '25',
      defaultSalesPrice: {
        excTax: '',
        incTax: ''
      }
    },
    {
      id: 5,
      typeOfPrice: 'Last Price',
      defaultPurchasePrice: {
        excTax: '',
        incTax: ''
      },
      margin: '25',
      defaultSalesPrice: {
        excTax: '',
        incTax: ''
      }
    },
    {
      id: 6,
      typeOfPrice: 'ECM Before',
      defaultPurchasePrice: {
        excTax: '',
        incTax: ''
      },
      margin: '25',
      defaultSalesPrice: {
        excTax: '',
        incTax: ''
      }
    },
    {
      id: 7,
      typeOfPrice: 'ECM After',
      defaultPurchasePrice: {
        excTax: '',
        incTax: ''
      },
      margin: '25',
      defaultSalesPrice: {
        excTax: '',
        incTax: ''
      }
    },
    {
      id: 8,
      typeOfPrice: 'Custom Price',
      defaultPurchasePrice: {
        excTax: '',
        incTax: ''
      },
      margin: '25',
      defaultSalesPrice: {
        excTax: '',
        incTax: ''
      }
    }
  ])

  const columns: GridColDef[] = [
    { field: 'typeOfPrice', headerName: 'Type Of Price', width: 150 },
    {
      field: 'defaultPurchasePrice',
      headerName: 'Default Purchase Price',
      width: 400,
      renderCell: params => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem'
          }}
        >
          <Box>
            <p>Exc. tax:</p>
            <TextField
              type='text'
              value={params.row.defaultPurchasePrice.excTax ? Number(params.row.defaultPurchasePrice.excTax) : ''}
              onChange={e => {
                const value = e.target.value
                setData(prev => {
                  const newData = [...prev]
                  newData[params.row.id - 1].defaultPurchasePrice.excTax = value

                  return newData
                })
              }}
            />
          </Box>
          <Box>
            <p>Inc. tax: </p>
            <TextField
              type='text'
              value={
                params.row.defaultPurchasePrice.excTax
                  ? Number(params.row.defaultPurchasePrice.excTax) * Number(tax) +
                  Number(params.row.defaultPurchasePrice.excTax)
                  : ''
              }
              onChange={e => {
                const value = e.target.value
                setData(prev => {
                  const newData = [...prev]
                  newData[params.row.id - 1].defaultPurchasePrice.incTax = value

                  return newData
                })
              }}
            />
          </Box>
        </div>
      )
    },
    {
      field: 'xmargin',
      headerName: 'X Margin(%)',
      width: 220,
      renderCell: params => (
        <div
          style={{
            display: 'flex',
            alignItems: 'end',
            height: '85%'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'start',
              flexDirection: 'column'
            }}
          >
            <p>Margin: {params.row.margin}%</p>
            <TextField
              type='text'
              value={params.row.margin}
              onChange={e => {
                const value = e.target.value
                setData(prev => {
                  const newData = [...prev]
                  newData[params.row.id - 1].margin = value

                  return newData
                })
              }}
            />
          </Box>
        </div>
      )
    },
    {
      field: 'defaultSalesPrice',
      headerName: 'Default Sales Price',
      width: 400,
      renderCell: params => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem'
          }}
        >
          <Box>
            <p>Exc. tax:</p>
            <TextField type='text'
              value={
                params.row.defaultPurchasePrice.excTax
                  ? Number(params.row.defaultPurchasePrice.excTax) * Number(params.row.margin) * 0.01 +
                  Number(params.row.defaultPurchasePrice.excTax)
                  : ''
              }
              onChange={e => {
                const value = e.target.value
                setData(prev => {
                  const newData = [...prev]
                  newData[params.row.id - 1].defaultSalesPrice.excTax = value

                  return newData
                })
              }}
            />
          </Box>
          <Box>
            <p>Inc. tax: </p>
            <TextField type='text'
              value={
                params.row.defaultPurchasePrice.excTax
                  ? Number(params.row.defaultPurchasePrice.excTax) * Number(tax) * Number(params.row.margin) * 0.01 +
                  Number(params.row.defaultPurchasePrice.excTax) * Number(params.row.margin) * 0.01 +
                  Number(params.row.defaultPurchasePrice.excTax)
                  : ''
              }
              onChange={e => {
                const value = e.target.value
                setData(prev => {
                  const newData = [...prev]
                  newData[params.row.id - 1].defaultSalesPrice.incTax = value

                  return newData
                })
              }}
            />
          </Box>
        </div>
      )
    }
  ]

  const cardRef = useRef(null)

  return (
    <Card style={{ height: '100%', width: '100%' }} ref={cardRef}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3, spacing: 2 }}>
        <CardHeader title='Product Prices' />
        <Divider sx={{ m: '0 !important' }} />
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem',
          marginBottom: '1rem',
          width: '100%',
          padding: '0px 1rem'
        }}
      >
        <FormControl fullWidth>
          <InputLabel>Applicable Tax:</InputLabel>
          <Select value={tax} onChange={handleChangeTax} label='Applicable Tax'>
            <MenuItem value=''>
              <em>Please Select</em>
            </MenuItem>
            <MenuItem value={0}>Vat 0 %</MenuItem>
            <MenuItem value={0.05}>Vat 0.05 %</MenuItem>
            <MenuItem value={0.1}>Vat 10 %</MenuItem>
            <MenuItem value={1}>Vat 1</MenuItem>
            <MenuItem value={2}>Vat 2</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Product Type:</InputLabel>
          <Select value={productType} onChange={handleChangeProductType} label='Product Type'>
            <MenuItem value=''>
              <em>Please Select</em>
            </MenuItem>
            <MenuItem value={'Single'}>Single</MenuItem>
            <MenuItem value={'Variable'}>Variable</MenuItem>
            <MenuItem value={'Combo'}>Combo</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box padding={2}>
        <DataGrid autoHeight columns={columns} rowHeight={120} rows={data} />
      </Box>
    </Card>
  )
}

export default ProductPrices
