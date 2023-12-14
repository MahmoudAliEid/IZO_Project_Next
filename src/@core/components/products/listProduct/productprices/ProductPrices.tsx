/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

// ** React Imports
import { ChangeEvent, useState, useEffect, useRef, Fragment } from 'react'
import { Button, Divider, Grid } from '@mui/material'

//** Redux Imports
import { useDispatch, useSelector } from 'react-redux'

// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import TextField from '@mui/material/TextField'
import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { SelectChangeEvent } from '@mui/material'

const ProductPrices = ({ initialValues, errors, touched, handleBlur, handleChange, setFieldValue }) => {
  const [tax, setTax] = useState('')

  const [productType, setProductType] = useState('')
  const [unitsData, setUnitsData] = useState([])
  const [filteredSubUnitsData, setFilteredSubUnitsData] = useState([])
  const [subUnitsData, setSubUnitsData] = useState([])
  const [showMore, setShowMore] = useState(false)
  const handleChangeTax = (event: SelectChangeEvent) => {
    setTax(event.target.value)
  }

  const handleChangeProductType = (event: SelectChangeEvent) => {
    setProductType(event.target.value)
  }

  // const x = {
  //   unit_id: 1,
  //   "default_price": {
  //     nameofobject: '',
  //     single_dpp: '',
  //     single_dpp_inc_tax: '',
  //     profit_percent: '',
  //     single_dsp: '',
  //     single_dsp_inc_tax: ''
  //   }
  //   ,
  //   "whole_price": {
  //     nameofobject: '',
  //     single_dpp: '',
  //     single_dpp_inc_tax: '',
  //     profit_percent: '',
  //     single_dsp: '',
  //     single_dsp_inc_tax: ''
  //   },
  //   "retail_price": {
  //     nameofobject: '',
  //     single_dpp: '',
  //     single_dpp_inc_tax: '',
  //     profit_percent: '',
  //     single_dsp: '',
  //     single_dsp_inc_tax: ''
  //   },
  // }


  const [tableData, setTableData] = useState([
    {
      id: 1,
      unit_id: "1",
      value: "default_price",
      single_dpp: "",
      single_dpp_in_tax: "",
      profit_percent: "",
      single_dsp: "",
      single_dsp_inc_tax: ""
    },
    {
      id: 2,
      unit_id: "1",
      value: "whole_price",
      single_dpp: "",
      single_dpp_in_tax: "",
      profit_percent: "",
      single_dsp: "",
      single_dsp_inc_tax: ""
    },
    {
      id: 3,
      unit_id: "1",
      value: "retail_price",
      single_dpp: "",
      single_dpp_in_tax: "",
      profit_percent: "",
      single_dsp: "",
      single_dsp_inc_tax: ""
    },
    {
      id: 4,
      unit_id: "1",
      value: "minimum_price",
      single_dpp: "",
      single_dpp_in_tax: "",
      profit_percent: "",
      single_dsp: "",
      single_dsp_inc_tax: ""
    },
    {
      id: 5,
      unit_id: "1",
      value: "last_price",
      single_dpp: "",
      single_dpp_in_tax: "",
      profit_percent: "",
      single_dsp: "",
      single_dsp_inc_tax: ""
    },
    {
      id: 6,
      unit_id: "1",
      value: "ecm_before_price",
      single_dpp: "",
      single_dpp_in_tax: "",
      profit_percent: "",
      single_dsp: "",
      single_dsp_inc_tax: ""
    },
    {
      id: 7,
      unit_id: "1",
      value: "ecm_after_price",
      single_dpp: "",
      single_dpp_in_tax: "",
      profit_percent: "",
      single_dsp: "",
      single_dsp_inc_tax: ""
    },
    {
      id: 8,
      unit_id: "1",
      value: "custom_price_1",
      single_dpp: "",
      single_dpp_in_tax: "",
      profit_percent: "",
      single_dsp: "",
      single_dsp_inc_tax: ""
    },
    {
      id: 9,
      unit_id: "1",
      value: "custom_price_2",
      single_dpp: "",
      single_dpp_in_tax: "",
      profit_percent: "",
      single_dsp: "",
      single_dsp_inc_tax: ""
    },
    {
      id: 10,
      unit_id: "1",
      value: "custom_price_",
      single_dpp: "",
      single_dpp_in_tax: "",
      profit_percent: "",
      single_dsp: "",
      single_dsp_inc_tax: ""
    },
    {
      id: 11,
      unit_id: "1",
      value: "custom_price_4",
      single_dpp: "",
      single_dpp_in_tax: "",
      profit_percent: "",
      single_dsp: "",
      single_dsp_inc_tax: ""
    }
  ]
  )


  // ** States
  const [data, setData] = useState([
    {
      id: 1,
      typeOfPrice: 'Default Price',
      defaultPurchasePrice: {
        excTax: '', //single_dpp1[]
        incTax: '' //single_dpp_inc_tax1[]
      },
      margin: '25', //profit_percent1[]
      defaultSalesPrice: {
        excTax: '', //single_dsp1[]
        incTax: '' //single_dsp_inc_tax1[]
      }
    },
    {
      id: 2,
      typeOfPrice: 'Whole Price',
      defaultPurchasePrice: {
        excTax: '', //single_dpp1[]
        incTax: '' //single_dpp_inc_tax1[]
      },
      margin: '25', //profit_percent1[]
      defaultSalesPrice: {
        excTax: '', //single_dsp1[]
        incTax: '' //single_dsp_inc_tax1[]
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
    {
      field: 'value', headerName: 'Header', width: 120
      , renderCell: params => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem'
          }}
        >
          <Box>
            <p
              style={{
                textTransform: 'capitalize'
              }}
            >{params.row.value.replace(/_/g, ' ')}</p>
          </Box>
        </div>
      )
    },
    {
      field: 'single_dpp',
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
              value={params.row.single_dpp ? Number(params.row.single_dpp) : ''}
              onChange={e => {
                const value = e.target.value
                setTableData(prev => {
                  const newData = [...prev]
                  newData[params.row.id - 1].single_dpp = value

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
                params.row.single_dpp
                  ? Number(params.row.single_dpp) * Number(tax) +
                  Number(params.row.single_dpp)
                  : ''
              }
              onChange={e => {
                const value = e.target.value
                setTableData(prev => {
                  const newData = [...prev]
                  newData[params.row.id - 1].single_dpp_in_tax = value

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
            <p>Margin: {params.row.profit_percent}%</p>
            <TextField
              type='text'
              value={params.row.profit_percent}
              onChange={e => {
                const value = e.target.value
                setTableData(prev => {
                  const newData = [...prev]
                  newData[params.row.id - 1].profit_percent = value

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
            <TextField
              type='text'
              value={
                params.row.single_dpp
                  ? Number(params.row.single_dpp) * Number(params.row.profit_percent) * 0.01 +
                  Number(params.row.single_dpp)
                  : ''
              }
              onChange={e => {
                const value = e.target.value
                setTableData(prev => {
                  const newData = [...prev]
                  newData[params.row.id - 1].single_dsp = value

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
                params.row.single_dpp
                  ? Number(params.row.single_dpp) * Number(tax) * Number(params.row.profit_percent) * 0.01 +
                  Number(params.row.single_dpp) * Number(params.row.profit_percent) * 0.01 +
                  Number(params.row.single_dpp)
                  : ''
              }
              onChange={e => {
                const value = e.target.value
                setTableData(prev => {
                  const newData = [...prev]
                  newData[params.row.id - 1].single_dsp_inc_tax = value

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

  // ** Selectors
  const productData = useSelector(state => state.getCreateProduct?.data?.value)
  const { units, sub_units } = productData
  useEffect(() => {
    setUnitsData(units)
    if (sub_units) {
      setSubUnitsData(sub_units)
    }
  }, [units, sub_units])

  // ** filter sub units
  useEffect(() => {
    const filteredSubUnits = subUnitsData.filter(subUnit => subUnit.parent_id === initialValues.unit_id)
    setFilteredSubUnitsData(filteredSubUnits.length ? filteredSubUnits : [])
  }, [subUnitsData, initialValues.unit_id])

  console.log('filteredSubUnitsData', filteredSubUnitsData)

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

        <FormControl fullWidth>
          <InputLabel id='demo-simple-select-label'>Unit</InputLabel>
          <Select
            value={initialValues.unit_id}
            onChange={handleChange}
            name='unit_id'
            id='demo-simple-select'
            label='Unit'
            fullWidth
            onBlur={handleBlur}
            error={touched.unit_id && !!errors.unit_id}
          >
            <MenuItem value=''>
              <em>Select a unit</em>
            </MenuItem>
            {unitsData.map(unit => (
              <MenuItem key={unit.id} value={unit.id}>
                {unit.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box padding={2}>
        <DataGrid autoHeight
          columns={columns}
          rowHeight={120}
          rows={tableData}
        />
        <Button
          variant='contained'
          color='primary'
          onClick={() => setShowMore(!showMore)}
          style={{ marginTop: '1rem' }}
        >
          {showMore ? 'Show Less' : 'Show More'}
        </Button>
      </Box>
      {showMore &&
        filteredSubUnitsData.length > 0 &&
        filteredSubUnitsData.map(subUnit => (
          <Box
            key={subUnit.id}
            sx={{
              marginTop: '1rem',
              padding: '1rem',
              border: '1px solid #ccc'
            }}
          >
            <DataGrid autoHeight
              columns={columns}
              rowHeight={120}
              rows={data}
            />
          </Box>
        ))}
    </Card>
  )
}

export default ProductPrices
