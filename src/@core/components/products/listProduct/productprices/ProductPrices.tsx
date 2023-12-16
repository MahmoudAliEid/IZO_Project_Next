/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

// ** React Imports
import { ChangeEvent, useState, useEffect, useRef, Fragment } from 'react'


//** Redux Imports
import { useDispatch, useSelector } from 'react-redux'


// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import TextField from '@mui/material/TextField'
import { Box, FormControl, InputLabel, Select, MenuItem ,Chip,Button, Divider, Grid } from '@mui/material'
import { SelectChangeEvent } from '@mui/material'
import { useTheme } from '@mui/material/styles'


const ProductPrices = ({ initialValues, errors, touched, handleBlur, handleChange, setFieldValue }) => {
 // ** States
  const [tax, setTax] = useState('')
  const [filteredSubUnitsData, setFilteredSubUnitsData] = useState([])
  const [productType, setProductType] = useState('')
  const [unitsData, setUnitsData] = useState([])
  const [subUnitsIds, setSubUnitsIds] = useState([])
  const [unitId, setUnitId] = useState('')
  const [subUnitsData, setSubUnitsData] = useState([])
  const [showMore, setShowMore] = useState(false)
  const [tableData, setTableData] = useState([
    {
      id: 1,
      unit_id: unitId,
      value: 'default_price',
      single_dpp: '',
      single_dpp_in_tax: '',
      profit_percent: '',
      single_dsp: '',
      single_dsp_inc_tax: ''
    },
    {
      id: 2,
      unit_id: unitId,
      value: 'whole_price',
      single_dpp: '',
      single_dpp_in_tax: '',
      profit_percent: '',
      single_dsp: '',
      single_dsp_inc_tax: ''
    },
    {
      id: 3,
      unit_id: unitId,
      value: 'retail_price',
      single_dpp: '',
      single_dpp_in_tax: '',
      profit_percent: '',
      single_dsp: '',
      single_dsp_inc_tax: ''
    },
    {
      id: 4,
      unit_id: unitId,
      value: 'minimum_price',
      single_dpp: '',
      single_dpp_in_tax: '',
      profit_percent: '',
      single_dsp: '',
      single_dsp_inc_tax: ''
    },
    {
      id: 5,
      unit_id: unitId,
      value: 'last_price',
      single_dpp: '',
      single_dpp_in_tax: '',
      profit_percent: '',
      single_dsp: '',
      single_dsp_inc_tax: ''
    },
    {
      id: 6,
      unit_id: unitId,
      value: 'ecm_before_price',
      single_dpp: '',
      single_dpp_in_tax: '',
      profit_percent: '',
      single_dsp: '',
      single_dsp_inc_tax: ''
    },
    {
      id: 7,
      unit_id: unitId,
      value: 'ecm_after_price',
      single_dpp: '',
      single_dpp_in_tax: '',
      profit_percent: '',
      single_dsp: '',
      single_dsp_inc_tax: ''
    },
    {
      id: 8,
      unit_id: unitId,
      value: 'custom_price_1',
      single_dpp: '',
      single_dpp_in_tax: '',
      profit_percent: '',
      single_dsp: '',
      single_dsp_inc_tax: ''
    },
    {
      id: 9,
      unit_id: unitId,
      value: 'custom_price_2',
      single_dpp: '',
      single_dpp_in_tax: '',
      profit_percent: '',
      single_dsp: '',
      single_dsp_inc_tax: ''
    },
    {
      id: 10,
      unit_id: unitId,
      value: 'custom_price_3',
      single_dpp: '',
      single_dpp_in_tax: '',
      profit_percent: '',
      single_dsp: '',
      single_dsp_inc_tax: ''
    },
    {
      id: 11,
      unit_id: unitId,
      value: 'custom_price_4',
      single_dpp: '',
      single_dpp_in_tax: '',
      profit_percent: '',
      single_dsp: '',
      single_dsp_inc_tax: ''
    }
  ])
  const [tableDataChild1, setTableDataChild1] = useState([
    {
      id: 1,
      unit_id: subUnitsIds.length > 0 ? subUnitsIds[0] : '',
      value: 'default_price',
      single_dpp: '',
      single_dpp_in_tax: '',
      profit_percent: '',
      single_dsp: '',
      single_dsp_inc_tax: ''
    },
    {
      id: 2,
      unit_id: subUnitsIds.length > 0 ? subUnitsIds[0] : '',
      value: 'whole_price',
      single_dpp: '',
      single_dpp_in_tax: '',
      profit_percent: '',
      single_dsp: '',
      single_dsp_inc_tax: ''
    },
    {
      id: 3,
      unit_id: subUnitsIds.length > 0 ? subUnitsIds[0] : '',
      value: 'retail_price',
      single_dpp: '',
      single_dpp_in_tax: '',
      profit_percent: '',
      single_dsp: '',
      single_dsp_inc_tax: ''
    },
    {
      id: 4,
      unit_id: subUnitsIds.length > 0 ? subUnitsIds[0] : '',
      value: 'minimum_price',
      single_dpp: '',
      single_dpp_in_tax: '',
      profit_percent: '',
      single_dsp: '',
      single_dsp_inc_tax: ''
    },
    {
      id: 5,
      unit_id: subUnitsIds.length > 0 ? subUnitsIds[0] : '',
      value: 'last_price',
      single_dpp: '',
      single_dpp_in_tax: '',
      profit_percent: '',
      single_dsp: '',
      single_dsp_inc_tax: ''
    },
    {
      id: 6,
      unit_id: subUnitsIds.length > 0 ? subUnitsIds[0] : '',
      value: 'ecm_before_price',
      single_dpp: '',
      single_dpp_in_tax: '',
      profit_percent: '',
      single_dsp: '',
      single_dsp_inc_tax: ''
    },
    {
      id: 7,
      unit_id: subUnitsIds.length > 0 ? subUnitsIds[0] : '',
      value: 'ecm_after_price',
      single_dpp: '',
      single_dpp_in_tax: '',
      profit_percent: '',
      single_dsp: '',
      single_dsp_inc_tax: ''
    },
    {
      id: 8,
      unit_id: subUnitsIds.length > 0 ? subUnitsIds[0] : '',
      value: 'custom_price_1',
      single_dpp: '',
      single_dpp_in_tax: '',
      profit_percent: '',
      single_dsp: '',
      single_dsp_inc_tax: ''
    },
    {
      id: 9,
      unit_id: subUnitsIds.length > 0 ? subUnitsIds[0] : '',
      value: 'custom_price_2',
      single_dpp: '',
      single_dpp_in_tax: '',
      profit_percent: '',
      single_dsp: '',
      single_dsp_inc_tax: ''
    },
    {
      id: 10,
      unit_id: subUnitsIds.length > 0 ? subUnitsIds[0] : '',
      value: 'custom_price_3',
      single_dpp: '',
      single_dpp_in_tax: '',
      profit_percent: '',
      single_dsp: '',
      single_dsp_inc_tax: ''
    },
    {
      id: 11,
      unit_id: subUnitsIds.length > 0 ? subUnitsIds[0] : '',
      value: 'custom_price_4',
      single_dpp: '',
      single_dpp_in_tax: '',
      profit_percent: '',
      single_dsp: '',
      single_dsp_inc_tax: ''
    }
  ])
  const [tableDataChild2, setTableDataChild2] = useState([
    {
      id: 1,
      unit_id: subUnitsIds.length > 0 ? subUnitsIds[1] : '',
      value: 'default_price',
      single_dpp: '',
      single_dpp_in_tax: '',
      profit_percent: '',
      single_dsp: '',
      single_dsp_inc_tax: ''
    },
    {
      id: 2,
      unit_id: subUnitsIds.length > 0 ? subUnitsIds[1] : '',
      value: 'whole_price',
      single_dpp: '',
      single_dpp_in_tax: '',
      profit_percent: '',
      single_dsp: '',
      single_dsp_inc_tax: ''
    },
    {
      id: 3,
      unit_id: subUnitsIds.length > 0 ? subUnitsIds[1] : '',
      value: 'retail_price',
      single_dpp: '',
      single_dpp_in_tax: '',
      profit_percent: '',
      single_dsp: '',
      single_dsp_inc_tax: ''
    },
    {
      id: 4,
      unit_id: subUnitsIds.length > 0 ? subUnitsIds[1] : '',
      value: 'minimum_price',
      single_dpp: '',
      single_dpp_in_tax: '',
      profit_percent: '',
      single_dsp: '',
      single_dsp_inc_tax: ''
    },
    {
      id: 5,
      unit_id: subUnitsIds.length > 0 ? subUnitsIds[1] : '',
      value: 'last_price',
      single_dpp: '',
      single_dpp_in_tax: '',
      profit_percent: '',
      single_dsp: '',
      single_dsp_inc_tax: ''
    },
    {
      id: 6,
      unit_id: subUnitsIds.length > 0 ? subUnitsIds[1] : '',
      value: 'ecm_before_price',
      single_dpp: '',
      single_dpp_in_tax: '',
      profit_percent: '',
      single_dsp: '',
      single_dsp_inc_tax: ''
    },
    {
      id: 7,
      unit_id: subUnitsIds.length > 0 ? subUnitsIds[1] : '',
      value: 'ecm_after_price',
      single_dpp: '',
      single_dpp_in_tax: '',
      profit_percent: '',
      single_dsp: '',
      single_dsp_inc_tax: ''
    },
    {
      id: 8,
      unit_id: subUnitsIds.length > 0 ? subUnitsIds[1] : '',
      value: 'custom_price_1',
      single_dpp: '',
      single_dpp_in_tax: '',
      profit_percent: '',
      single_dsp: '',
      single_dsp_inc_tax: ''
    },
    {
      id: 9,
      unit_id: subUnitsIds.length > 0 ? subUnitsIds[1] : '',
      value: 'custom_price_2',
      single_dpp: '',
      single_dpp_in_tax: '',
      profit_percent: '',
      single_dsp: '',
      single_dsp_inc_tax: ''
    },
    {
      id: 10,
      unit_id: subUnitsIds.length > 0 ? subUnitsIds[1] : '',
      value: 'custom_price_3',
      single_dpp: '',
      single_dpp_in_tax: '',
      profit_percent: '',
      single_dsp: '',
      single_dsp_inc_tax: ''
    },
    {
      id: 11,
      unit_id: subUnitsIds.length > 0 ? subUnitsIds[1] : '',
      value: 'custom_price_4',
      single_dpp: '',
      single_dpp_in_tax: '',
      profit_percent: '',
      single_dsp: '',
      single_dsp_inc_tax: ''
    }
  ])


  // ** Grid columns
  const columns: GridColDef[] = [
    {
      field: 'value',
      headerName: 'Header',
      width: 140,
      renderCell: params => (
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
            >
              {params.row.value.replace(/_/g, ' ')}
            </p>
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
                params.row.single_dpp ? Number(params.row.single_dpp) * Number(tax) + Number(params.row.single_dpp) : ''
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


  // ** Hooks
  const cardRef = useRef(null)
  const theme = useTheme()


  // ** Selectors
  const productData = useSelector(state => state.getCreateProduct?.data?.value)
  const { units, sub_units } = productData

  // ** useEffect
  useEffect(() => {
    setUnitsData(units)
    if (sub_units) {
      setSubUnitsData(sub_units)
    }
  }, [units, sub_units])

  // ** filter sub units
  useEffect(() => {
    if (initialValues.sub_unit_id) {
      setSubUnitsIds(initialValues.sub_unit_id)
    }
  }, [subUnitsData, initialValues.sub_unit_id])

  // ** filter unit_id
  useEffect(() => {
    if (initialValues.unit_id) {
      setUnitId(initialValues.unit_id)
    }
  }, [initialValues.unit_id])

    // ** filter sub units
  useEffect(() => {
      const filteredSubUnits = subUnitsData.filter(subUnit => subUnit.parent_id === initialValues.unit_id)
      setFilteredSubUnitsData(filteredSubUnits.length ? filteredSubUnits : [])
    }, [subUnitsData, initialValues.unit_id])

  // ** Functions

   const handleChangeTax = (event: SelectChangeEvent) => {
    setTax(event.target.value)
  }

  const handleChangeProductType = (event: SelectChangeEvent) => {
    setProductType(event.target.value)
  }


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
            disabled={true}
            error={touched.unit_id && !!errors.unit_id}
          >
            {unitsData.map(unit => (
              <MenuItem key={unit.id} value={unit.id} disabled={initialValues.unit_id === unit.id ? false : true}>
                {unit.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box padding={2}>
        <DataGrid autoHeight columns={columns} rowHeight={120} rows={tableData} />
       {
          subUnitsIds.length > 0 && (
            <Button
            variant='contained'
            color='primary'
            onClick={() => {
              setShowMore(!showMore)
            }}
          >
            {showMore ? 'Show Less' : 'Show More'}
          </Button>
          )
       }
      </Box>

      {showMore &&
        subUnitsIds.length > 0 &&
        subUnitsIds.map(
          (subUnit, index) => (

            (
              <Box
                key={index}
                sx={{
                  marginTop: '1rem',
                  padding: '1rem',
                  border: '1px solid ',
                  borderRadius: '10px',
                  borderColor:theme => theme.palette.divider,
                }}
              >

                <Grid item xs={6} sx={{my:5}}>
              <FormControl fullWidth>
                <InputLabel id='demo-simple-select-label'>Sub Unit</InputLabel>
                <Select
                  value={initialValues.sub_unit_id}
                  onChange={handleChange}
                  multiple
                  name='sub_unit_id'
                  id='demo-simple-select'
                  label='Sub Unit'
                  fullWidth
                  renderValue={selected =>
                    filteredSubUnitsData && filteredSubUnitsData.length > 0 ? (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          <Chip
                            label={filteredSubUnitsData.find(subUnit => subUnit.id === selected[index])?.name || null}
                            onDelete={() => {
                              const updatedSubUnitIds = initialValues.sub_unit_id.filter(item => item !== selected[index])
                              setFieldValue('sub_unit_id', updatedSubUnitIds)
                              setFilteredSubUnitsData(filteredSubUnitsData.filter(item => item.id !== selected[index]))
                            }}
                          />
                      </Box>
                    ) : null
                  }
                  onBlur={handleBlur}
                  disabled={ true}
                >
                  {initialValues.sub_unit_id.length >= 2 && (
                    <MenuItem value='' disabled>
                      <em>You can select only up to two sub units</em>
                    </MenuItem>
                  )}
                  {filteredSubUnitsData.map(subUnit => (
                    <MenuItem
                      key={subUnit.id}
                      value={subUnit.id}
                      disabled={
                          !initialValues.sub_unit_id.includes(subUnit.id)
                      }
                    >
                      {subUnit.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

                <DataGrid
                  autoHeight
                  columns={columns}
                  rowHeight={120}
                  rows={index === 0 ? tableDataChild1 : tableDataChild2}
                />
              </Box>
            )
          )
        )}
    </Card>
  )
}

export default ProductPrices
