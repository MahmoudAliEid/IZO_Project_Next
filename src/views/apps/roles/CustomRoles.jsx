// ** React Imports
import { useEffect, useState } from 'react'

// ** Next Import
// import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
// import Avatar from '@mui/material/Avatar'
import Dialog from '@mui/material/Dialog'

import Checkbox from '@mui/material/Checkbox'

import { useTheme } from '@mui/material/styles'

import TextField from '@mui/material/TextField'
// import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import DialogTitle from '@mui/material/DialogTitle'
// import AvatarGroup from '@mui/material/AvatarGroup'
import CardContent from '@mui/material/CardContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox'
import FormControlLabel from '@mui/material/FormControlLabel'

// ** Formik
import { Formik, Field, Form, FieldArray } from 'formik'
import { Chip, Divider } from '@mui/material'

const CustomRoles = () => {
  // ** States
  const [open, setOpen] = useState(false)
  const [dialogTitle, setDialogTitle] = useState('Add')

  // ** initial values for formik
  const [initialValues] = useState({
    roleName: '',
    sections: [
      {
        title: 'Dashboard',
        checked: false,
        permissions: [
          {
            title: 'Ecommerce',
            checked: false
          },
          {
            title: 'Analytics',
            checked: false
          },
          {
            title: 'CRM',
            checked: false
          }
        ]
      },
      {
        title: 'User Management',
        permissions: [
          {
            title: 'List Users',
            checked: false
          },
          {
            title: 'View User',
            checked: false
          }
        ]
      },
      {
        title: 'Product Management',

        permissions: [
          {
            title: 'List Products',
            checked: false
          },
          {
            title: 'Warranties',
            checked: false
          },
          {
            title: 'Variants',
            checked: false
          },
          {
            title: 'Categories',
            checked: false
          },
          {
            title: 'Brands',
            checked: false
          },
          {
            title: 'Import Opening Stock',
            checked: false
          },
          {
            title: 'Add Opening Stock',
            checked: false
          },
          {
            title: 'Import Product',
            checked: false
          },
          {
            title: 'Sale Price Group',
            checked: false
          }
        ]
      },
      {
        title: 'Contacts Management',
        permissions: [
          {
            title: 'Supplier',
            checked: false
          },
          {
            title: 'Customer',
            checked: false
          },
          {
            title: 'Customer Group',
            checked: false
          },
          {
            title: 'Import Contacts',
            checked: false
          }
        ]
      }
    ],
    pages: [
      {
        title: 'list Products',
        add_button: false,
        checked: false,
        table: [
          {
            title: 'Name',
            checked: false
          },
          {
            title: 'SKU',
            checked: false
          },
          {
            title: 'View Stock',
            checked: false
          }
        ],
        actions: [
          {
            title: 'Edit',
            checked: false
          },
          {
            title: 'Delete',
            checked: false
          },
          {
            title: 'View',
            checked: false
          }
        ]
      }
    ]
  })

  // ** Hook
  const theme = useTheme()

  const handleClickOpen = () => setOpen(true)

  const handleClose = () => {
    setOpen(false)
  }

  const handleSelectAllCheckbox = (checked, parentIndex, permissions, setFieldValue) => {
    permissions.forEach((_, childIndex) => {
      setFieldValue(`sections.${parentIndex}.permissions.${childIndex}.checked`, checked)
    })

    setFieldValue(`sections.${parentIndex}.checked`, checked)
  }

  return (
    <>
      {/* {renderCards()} */}
      <Grid item xs={12} sm={6} lg={6}>
        <Card
          sx={{ cursor: 'pointer' }}
          onClick={() => {
            handleClickOpen()
            setDialogTitle('Add')
          }}
        >
          <Grid container sx={{ height: '100%' }}>
            <Grid item xs={4}>
              <Box sx={{ height: '100%', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                <img
                  width={88}
                  height={105}
                  alt='add-role'
                  src={`/images/pages/add-role-illustration-${theme.palette.mode}.png`}
                />
              </Box>
            </Grid>
            <Grid item xs={8}>
              <CardContent>
                <Box sx={{ textAlign: 'right' }}>
                  <Button
                    variant='contained'
                    sx={{ mb: 3, whiteSpace: 'nowrap' }}
                    onClick={() => {
                      handleClickOpen()
                      setDialogTitle('Add')
                    }}
                  >
                    Add Role
                  </Button>
                  <Typography>Add role, if it doesn't exist.</Typography>
                </Box>
              </CardContent>
            </Grid>
          </Grid>
        </Card>
      </Grid>
      <Dialog fullWidth maxWidth='lg' scroll='body' onClose={handleClose} open={open}>
        <DialogTitle
          sx={{
            textAlign: 'center'
          }}
        >
          <Typography variant='h5' component='span'>
            {`${dialogTitle} Role`}
          </Typography>
          <Typography variant='body2'>Set Role Permissions</Typography>
        </DialogTitle>
        <Formik initialValues={initialValues} onSubmit={values => console.log(values)}>
          {({ handleChange, setFieldValue, values }) => (
            <Form>
              <DialogContent>
                <Box sx={{ my: 4 }}>
                  <FormControl fullWidth>
                    <Field name='roleName' as={TextField} label='Role Name' />
                  </FormControl>
                </Box>
                <Box sx={{ mb: 8 }}>
                  <Typography variant='h6'>Role Permissions</Typography>
                  <Divider />
                </Box>
                <Box sx={{ justifyContent: 'center', alignContent: 'center' }}>
                  <Grid container spacing={2} justifyContent='center'>
                    <Box sx={{ mb: 8 }}>
                      <Divider>
                        <Chip
                          label='Side Bar'
                          size='large'
                          sx={{
                            backgroundColor: theme => theme.palette.primary.light,
                            color: theme => theme.palette.primary.contrastText
                          }}
                        />
                      </Divider>
                    </Box>

                    <FieldArray name='sections'>
                      {() => (
                        <>
                          {initialValues.sections.map((section, parentIndex) => (
                            <Grid
                              item
                              xs={12}
                              key={parentIndex}
                              sx={{
                                m: 3,
                                justifyContent: 'center',
                                alignContent: 'center',
                                pl: 0,
                                border: theme => `1px solid ${theme.palette.divider}`,
                                borderRadius: theme => `${theme.spacing(2)} !important`
                              }}
                            >
                              <Box
                                sx={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'space-between',
                                  pl: 0
                                }}
                              >
                                <Typography
                                  sx={{
                                    fontWeight: 600,
                                    pl: 0,
                                    whiteSpace: 'nowrap',
                                    textAlign: 'center',
                                    color: `${theme.palette.text.primary} !important`
                                  }}
                                >
                                  {section.title}
                                </Typography>
                                <FormControlLabel
                                  sx={{ fontSize: '8px !important' }}
                                  control={
                                    <Field
                                      type='checkbox'
                                      label='Select All'
                                      checkedIcon={<IndeterminateCheckBoxIcon fontSize='medium' />}
                                      as={Checkbox}
                                      name={`sections.${parentIndex}.checked`}
                                      //handle the select all checkbox in its own Permission

                                      onChange={e => {
                                        handleChange(e)
                                        // add logic to handle the select all checkbox
                                        const { checked } = e.target
                                        const permissions = initialValues.sections[parentIndex].permissions

                                        handleSelectAllCheckbox(checked, parentIndex, permissions, setFieldValue)
                                      }}
                                    />
                                  }
                                />
                              </Box>
                              <Divider />

                              <FieldArray name={`sections.${parentIndex}.permissions`}>
                                {() => (
                                  <>
                                    <Grid container spacing={4}>
                                      {section.permissions.map((permission, childIndex) => (
                                        <Grid item xs={12} md={6} lg={6} sm={12} key={childIndex}>
                                          {/* <FormControlLabel
                                            label={permission.title}
                                            sx={{ fontSize: '8px !important' }}
                                            control={
                                              <Field
                                                type='checkbox'
                                                as={Checkbox}
                                                // on change i want to set the  value of sections.${parentIndex}.checked True
                                                onChange={e => {
                                                  handleChange(e)

                                                  // Check if all permissions are checked
                                                  setTimeout(() => {
                                                    const allPermissionsChecked = values.sections[
                                                      parentIndex
                                                    ].permissions.filter(permission => permission.checked)
                                                    console.log(allPermissionsChecked)

                                                    // Update the "Select All" checkbox based on all permissions checked

                                                    if (
                                                      allPermissionsChecked.length ===
                                                      values.sections[parentIndex].permissions.length
                                                    ) {
                                                      setFieldValue(`sections.${parentIndex}.checked`, true)
                                                    } else {
                                                      setFieldValue(`sections.${parentIndex}.checked`, false)
                                                    }
                                                  }, 4000)
                                                }}
                                                name={`sections.${parentIndex}.permissions.${childIndex}.checked`}
                                              />
                                            }
                                          /> */}
                                          <CustomCheckBox
                                            permission={permission}
                                            handleChange={handleChange}
                                            values={values}
                                            setFieldValue={setFieldValue}
                                            name={`sections.${parentIndex}.permissions.${childIndex}.checked`}
                                            parentIndex={parentIndex}
                                            nameOfSection='sections'
                                            nameOfPermission='permissions'
                                          />
                                        </Grid>
                                      ))}
                                    </Grid>
                                  </>
                                )}
                              </FieldArray>
                            </Grid>
                          ))}
                        </>
                      )}
                    </FieldArray>
                  </Grid>
                  <Grid container spacing={2} justifyContent='center'>
                    <Box sx={{ my: 8 }}>
                      <Divider>
                        <Chip
                          label='Pages'
                          size='large'
                          sx={{
                            backgroundColor: theme => theme.palette.primary.light,
                            color: theme => theme.palette.primary.contrastText
                          }}
                        />
                      </Divider>
                    </Box>

                    <FieldArray name='pages'>
                      {() => (
                        <>
                          {initialValues.pages.map((page, pageIndex) => (
                            <Grid
                              item
                              xs={12}
                              key={pageIndex}
                              sx={{
                                m: 3,
                                justifyContent: 'center',
                                alignContent: 'center',
                                pl: 0,
                                border: theme => `1px solid ${theme.palette.divider}`,
                                borderRadius: theme => `${theme.spacing(2)} !important`
                              }}
                            >
                              <Box
                                sx={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'space-between',
                                  pl: 0
                                }}
                              >
                                <Typography
                                  sx={{
                                    fontWeight: 600,
                                    pl: 0,
                                    whiteSpace: 'nowrap',
                                    textAlign: 'center',
                                    color: `${theme.palette.text.primary} !important`
                                  }}
                                >
                                  {page.title}
                                </Typography>
                                <FormControlLabel
                                  sx={{ fontSize: '8px !important' }}
                                  control={
                                    <Field
                                      type='checkbox'
                                      label='Select All'
                                      checkedIcon={<IndeterminateCheckBoxIcon fontSize='medium' />}
                                      as={Checkbox}
                                      name={`pages.${pageIndex}.checked`}
                                      // Handle the select all checkbox for pages
                                      onChange={e => {
                                        handleChange(e)
                                        const { checked } = e.target
                                        const actions = initialValues.pages[pageIndex].actions
                                        const table = initialValues.pages[pageIndex].table
                                        // check add button
                                        setFieldValue(`pages.${pageIndex}.add_button`, checked)
                                        actions.forEach((_, actionIndex) => {
                                          setFieldValue(`pages.${pageIndex}.actions.${actionIndex}.checked`, checked)
                                        })
                                        table.forEach((_, tableIndex) => {
                                          setFieldValue(`pages.${pageIndex}.table.${tableIndex}.checked`, checked)
                                        })
                                        setFieldValue(`pages.${pageIndex}.checked`, checked)
                                      }}
                                    />
                                  }
                                />
                              </Box>
                              <Divider />
                              <Box
                                sx={{
                                  justifyContent: 'center',
                                  alignContent: 'center',
                                  margin: 'auto'
                                }}
                              >
                                <Divider sx={{ my: 2 }}>
                                  <Chip
                                    label='Actions'
                                    size='medium'
                                    sx={{
                                      backgroundColor: theme => theme.palette.primary.light,
                                      color: theme => theme.palette.primary.contrastText
                                    }}
                                  />
                                </Divider>
                              </Box>
                              <Box>
                                {/* <FormControlLabel
                                  label='Add'
                                  sx={{ fontSize: '8px !important' }}
                                  control={
                                    <Field type='checkbox' as={Checkbox} name={`pages.${pageIndex}.add_button`} />
                                  }
                                /> */}
                                <CustomCheckBoxSecond
                                  permission={{ title: 'Add Button' }}
                                  handleChange={handleChange}
                                  values={values}
                                  setFieldValue={setFieldValue}
                                  name={`pages.${pageIndex}.add_button`}
                                  parentIndex={pageIndex}
                                  nameOfSection='pages'
                                  table={values.pages[pageIndex].table}
                                  action={values.pages[pageIndex].actions}
                                  addBtn={values.pages[pageIndex].add_button}
                                />
                              </Box>
                              <FieldArray name={`pages.${pageIndex}.actions`}>
                                {() => (
                                  <Grid container spacing={4}>
                                    {page.actions.map((action, actionIndex) => (
                                      <Grid item xs={12} md={6} lg={6} sm={12} key={actionIndex}>
                                        {/* <FormControlLabel
                                          label={action.title}
                                          sx={{ fontSize: '8px !important' }}
                                          control={
                                            <Field
                                              type='checkbox'
                                              as={Checkbox}
                                              name={`pages.${pageIndex}.actions.${actionIndex}.checked`}
                                            />
                                          }
                                        /> */}
                                        <CustomCheckBoxSecond
                                          permission={action}
                                          handleChange={handleChange}
                                          table={values.pages[pageIndex].table}
                                          action={values.pages[pageIndex].actions}
                                          values={values}
                                          setFieldValue={setFieldValue}
                                          name={`pages.${pageIndex}.actions.${actionIndex}.checked`}
                                          parentIndex={pageIndex}
                                          nameOfSection='pages'
                                          addBtn={values.pages[pageIndex].add_button}
                                        />
                                      </Grid>
                                    ))}
                                  </Grid>
                                )}
                              </FieldArray>

                              <Box
                                sx={{
                                  justifyContent: 'center',
                                  alignContent: 'center',
                                  margin: 'auto'
                                }}
                              >
                                <Divider sx={{ my: 2 }}>
                                  <Chip
                                    label='Table'
                                    size='medium'
                                    sx={{
                                      backgroundColor: theme => theme.palette.primary.light,
                                      color: theme => theme.palette.primary.contrastText
                                    }}
                                  />
                                </Divider>
                              </Box>
                              <FieldArray name={`pages.${pageIndex}.table`}>
                                {() => (
                                  <Grid container spacing={4}>
                                    {page.table.map((table, tableIndex) => (
                                      <Grid item xs={12} md={6} lg={6} sm={12} key={tableIndex}>
                                        {/* <FormControlLabel
                                          label={table.title}
                                          sx={{ fontSize: '8px !important' }}
                                          control={
                                            <Field
                                              type='checkbox'
                                              as={Checkbox}
                                              name={`pages.${pageIndex}.table.${tableIndex}.checked`}
                                            />
                                          }
                                        /> */}
                                        <CustomCheckBoxSecond
                                          permission={table}
                                          handleChange={handleChange}
                                          values={values}
                                          setFieldValue={setFieldValue}
                                          name={`pages.${pageIndex}.table.${tableIndex}.checked`}
                                          parentIndex={pageIndex}
                                          nameOfSection='pages'
                                          action={values.pages[pageIndex].actions}
                                          table={values.pages[pageIndex].table}
                                          addBtn={values.pages[pageIndex].add_button}
                                        />
                                      </Grid>
                                    ))}
                                  </Grid>
                                )}
                              </FieldArray>
                            </Grid>
                          ))}
                        </>
                      )}
                    </FieldArray>
                  </Grid>
                </Box>
              </DialogContent>
              <DialogActions
                sx={{
                  display: 'flex',
                  justifyContent: 'center'
                }}
              >
                <Box className='demo-space-x'>
                  <Button size='large' type='submit' variant='contained' onClick={handleClose}>
                    Submit
                  </Button>
                  <Button size='large' color='secondary' variant='outlined' onClick={handleClose}>
                    Cancel
                  </Button>
                </Box>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>
    </>
  )
}

export default CustomRoles

const CustomCheckBox = ({
  permission,
  handleChange,
  values,
  setFieldValue,
  name,
  parentIndex,
  nameOfSection,
  nameOfPermission
}) => {
  useEffect(() => {
    const allPermissionsChecked = values[`${nameOfSection}`][parentIndex][`${nameOfPermission}`].filter(
      permission => permission.checked
    )
    console.log(allPermissionsChecked)

    // Update the "Select All" checkbox based on all permissions checked

    if (allPermissionsChecked.length === values[`${nameOfSection}`][parentIndex][`${nameOfPermission}`].length) {
      setFieldValue(`${nameOfSection}.${parentIndex}.checked`, true)
    } else {
      setFieldValue(`${nameOfSection}.${parentIndex}.checked`, false)
    }
  }, [values, setFieldValue, parentIndex, nameOfPermission, nameOfSection])

  return (
    <FormControlLabel
      label={permission.title}
      sx={{ fontSize: '8px !important' }}
      control={
        <Field
          type='checkbox'
          as={Checkbox}
          // on change i want to set the  value of sections.${parentIndex}.checked True
          onChange={e => {
            handleChange(e)
          }}
          name={name}
        />
      }
    />
  )
}

const CustomCheckBoxSecond = ({
  permission,
  handleChange,
  setFieldValue,
  name,
  parentIndex,
  nameOfSection,
  table,
  action,
  addBtn
}) => {
  useEffect(() => {
    const allActionsChecked = action.filter(permission => permission.checked)
    const allTableChecked = table.filter(permission => permission.checked)

    // Update the "Select All" checkbox based on all permissions checked

    if (allTableChecked.length === table.length && allActionsChecked.length === action.length && addBtn) {
      setFieldValue(`${nameOfSection}.${parentIndex}.checked`, true)
    } else {
      setFieldValue(`${nameOfSection}.${parentIndex}.checked`, false)
    }
  }, [setFieldValue, parentIndex, action, table, nameOfSection, addBtn])

  return (
    <FormControlLabel
      label={permission.title}
      sx={{ fontSize: '8px !important' }}
      control={
        <Field
          type='checkbox'
          as={Checkbox}
          onChange={e => {
            handleChange(e)
          }}
          name={name}
        />
      }
    />
  )
}
