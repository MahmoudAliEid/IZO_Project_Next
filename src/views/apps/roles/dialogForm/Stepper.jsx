// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** Styles
import { styled, useTheme } from '@mui/material/styles'

// ** Third Party Imports
import toast from 'react-hot-toast'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox'

// ** Custom Components Imports
import StepperCustomDot from 'src/views/forms/form-wizard/StepperCustomDot'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Util Import
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'

// ** Styled Component
import StepperWrapper from 'src/@core/styles/mui/stepper'

// ** Formik
import { Formik, Field, Form, FieldArray } from 'formik'

// ** MUI
import {
  Chip,
  Divider,
  Box,
  Card,
  CardContent,
  Stepper,
  StepLabel,
  Typography,
  Button,
  Grid,
  Checkbox,
  FormControl,
  FormControlLabel,
  TextField
} from '@mui/material'

// Tabs, Tab

import MuiStep from '@mui/material/Step'
import GlobalScroll from 'src/@core/components/global-scroll/GlobalScroll'

const steps = [
  {
    icon: 'bx:bx-home-circle',
    title: 'Role Name',
    subtitle: 'Enter Role Name'
  },
  {
    icon: 'bx:grid-alt',
    title: 'Dashboard Permissions',
    subtitle: 'Setup App Bar & Side Bar Permissions'
  },
  {
    icon: 'bx:grid-alt',
    title: 'users Permissions',
    subtitle: 'Setup Pages Permissions'
  },
  {
    icon: 'bx:grid-alt',
    title: 'Roles Permissions',
    subtitle: 'Setup App Bar & Side Bar Permissions'
  },
  {
    icon: 'bx:grid-alt',
    title: 'Product ',
    subtitle: 'Setup Pages Permissions'
  },
  {
    icon: 'bx:grid-alt',
    title: 'List Product Page ',
    subtitle: 'Setup App Bar & Side Bar Permissions'
  },
  {
    icon: 'bx:grid-alt',
    title: 'Pages Permissions',
    subtitle: 'Setup Pages Permissions'
  },
  {
    icon: 'bx:grid-alt',
    title: 'App Bar Permissions',
    subtitle: 'Setup App Bar & Side Bar Permissions'
  },
  {
    icon: 'bx:grid-alt',
    title: 'Pages Permissions',
    subtitle: 'Setup Pages Permissions'
  },
  {
    icon: 'bx:grid-alt',
    title: 'App Bar Permissions',
    subtitle: 'Setup App Bar & Side Bar Permissions'
  },
  {
    icon: 'bx:grid-alt',
    title: 'Pages Permissions',
    subtitle: 'Setup Pages Permissions'
  }
]

const StepperHeaderContainer = styled(CardContent)(({ theme }) => ({
  borderRight: `1px solid ${theme.palette.divider}`,
  [theme.breakpoints.down('md')]: {
    borderRight: 0,
    borderBottom: `1px solid ${theme.palette.divider}`
  }
}))

const Step = styled(MuiStep)(({ theme }) => ({
  '& .MuiStepLabel-root': {
    paddingTop: 0
  },
  '&:not(:last-of-type) .MuiStepLabel-root': {
    paddingBottom: theme.spacing(6)
  },
  '&:last-of-type .MuiStepLabel-root': {
    paddingBottom: 0
  },
  '& .MuiStepLabel-iconContainer': {
    display: 'none'
  },
  '& .step-subtitle': {
    color: `${theme.palette.text.disabled} !important`
  },
  '&:not(.Mui-completed)': {
    '& .step-title': {
      color: theme.palette.text.secondary
    },
    '& + svg': {
      color: theme.palette.text.disabled
    }
  },
  '&.Mui-completed': {
    '& .step-title': {
      color: theme.palette.text.disabled
    },
    '& + svg': {
      color: theme.palette.primary.main
    }
  },
  '& .MuiStepLabel-label.Mui-active .step-title': {
    color: theme.palette.primary.main
  }
}))

const StepperRoles = ({ isEdit }) => {
  // ** States
  const [activeStep, setActiveStep] = useState(0)
  // ** initial values for formik
  const [initialValues] = useState({
    roleName: '',
    dashboard: {
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
    users: {
      title: 'User Management',
      checked: false,
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
    roles: {
      title: 'Role Management',
      checked: false,
      permissions: [
        {
          title: 'List Roles',
          checked: false
        },
        {
          title: 'View Role',
          checked: false
        }
      ]
    },
    products: {
      title: 'Product Management',
      checked: false,
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

    list_products_page: {
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

    // sections: [
    //   {
    //     title: 'Dashboard',
    //     checked: false,
    //     permissions: [
    //       {
    //         title: 'Ecommerce',
    //         checked: false
    //       },
    //       {
    //         title: 'Analytics',
    //         checked: false
    //       },
    //       {
    //         title: 'CRM',
    //         checked: false
    //       }
    //     ]
    //   },
    //   {
    //     title: 'User Management',
    //     permissions: [
    //       {
    //         title: 'List Users',
    //         checked: false
    //       },
    //       {
    //         title: 'View User',
    //         checked: false
    //       }
    //     ]
    //   },
    //   {
    //     title: 'Product Management',

    //     permissions: [
    //       {
    //         title: 'List Products',
    //         checked: false
    //       },
    //       {
    //         title: 'Warranties',
    //         checked: false
    //       },
    //       {
    //         title: 'Variants',
    //         checked: false
    //       },
    //       {
    //         title: 'Categories',
    //         checked: false
    //       },
    //       {
    //         title: 'Brands',
    //         checked: false
    //       },
    //       {
    //         title: 'Import Opening Stock',
    //         checked: false
    //       },
    //       {
    //         title: 'Add Opening Stock',
    //         checked: false
    //       },
    //       {
    //         title: 'Import Product',
    //         checked: false
    //       },
    //       {
    //         title: 'Sale Price Group',
    //         checked: false
    //       }
    //     ]
    //   },
    //   {
    //     title: 'Contacts Management',
    //     permissions: [
    //       {
    //         title: 'Supplier',
    //         checked: false
    //       },
    //       {
    //         title: 'Customer',
    //         checked: false
    //       },
    //       {
    //         title: 'Customer Group',
    //         checked: false
    //       },
    //       {
    //         title: 'Import Contacts',
    //         checked: false
    //       }
    //     ]
    //   }
    // ],
  })

  // ** Hook
  const theme = useTheme()

  const handleSelectAllCheckbox = (name, checked, permissions, setFieldValue) => {
    permissions.forEach((_, childIndex) => {
      setFieldValue(`${name}.permissions.${childIndex}.checked`, checked)
    })

    setFieldValue(`${name}.checked`, checked)
  }

  // Handle Stepper
  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }
  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1)
    if (activeStep === steps.length - 1) {
      toast.success('Form Submitted')
    }
  }

  const getStepContent = ({ activeStep, values, setFieldValue, handleChange }) => {
    switch (activeStep) {
      case 0:
        return (
          <Fragment key={activeStep}>
            <Grid item xs={12} sx={{ mt: 4 }}>
              <FormControl fullWidth>
                <Field name='roleName' as={TextField} label='Role Name' fullWidth />
              </FormControl>
            </Grid>
          </Fragment>
        )
      case 1:
        return (
          <Fragment key={activeStep}>
            <Grid container spacing={2} justifyContent='center'>
              <Grid
                item
                xs={12}
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
                    {values.dashboard.title}
                  </Typography>
                  <FormControlLabel
                    sx={{ fontSize: '8px !important' }}
                    control={
                      <Field
                        type='checkbox'
                        label='Select All'
                        checkedIcon={<IndeterminateCheckBoxIcon fontSize='medium' />}
                        as={Checkbox}
                        name={`dashboard.checked`}
                        //handle the select all checkbox in its own Permission

                        onChange={e => {
                          handleChange(e)
                          // add logic to handle the select all checkbox
                          const { checked } = e.target
                          const permissions = values.dashboard.permissions

                          handleSelectAllCheckbox('dashboard', checked, permissions, setFieldValue)
                        }}
                      />
                    }
                  />
                </Box>
                <Divider />

                <FieldArray name={`dashboard.permissions`}>
                  {() => (
                    <>
                      <Grid container spacing={4}>
                        {values.dashboard.permissions.map((permission, childIndex) => (
                          <Grid item xs={12} md={6} lg={6} sm={12} key={childIndex}>
                            <CustomCheckBox
                              permission={permission}
                              handleChange={handleChange}
                              values={values}
                              setFieldValue={setFieldValue}
                              name={`dashboard.permissions.${childIndex}.checked`}
                              nameOfSection='dashboard'
                              nameOfPermission='permissions'
                            />
                          </Grid>
                        ))}
                      </Grid>
                    </>
                  )}
                </FieldArray>
              </Grid>
            </Grid>
          </Fragment>
        )
      case 2:
        return (
          <Fragment key={activeStep}>
            <Grid container spacing={2} justifyContent='center'>
              <Grid
                item
                xs={12}
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
                    {values.users.title}
                  </Typography>
                  <FormControlLabel
                    sx={{ fontSize: '8px !important' }}
                    control={
                      <Field
                        type='checkbox'
                        label='Select All'
                        checkedIcon={<IndeterminateCheckBoxIcon fontSize='medium' />}
                        as={Checkbox}
                        name={`users.checked`}
                        //handle the select all checkbox in its own Permission

                        onChange={e => {
                          handleChange(e)
                          // add logic to handle the select all checkbox
                          const { checked } = e.target
                          const permissions = values.users.permissions

                          handleSelectAllCheckbox('users', checked, permissions, setFieldValue)
                        }}
                      />
                    }
                  />
                </Box>
                <Divider />

                <FieldArray name={`users.permissions`}>
                  {() => (
                    <>
                      <Grid container spacing={4}>
                        {values.users.permissions.map((permission, childIndex) => (
                          <Grid item xs={12} md={6} lg={6} sm={12} key={childIndex}>
                            <CustomCheckBox
                              permission={permission}
                              handleChange={handleChange}
                              values={values}
                              setFieldValue={setFieldValue}
                              name={`users.permissions.${childIndex}.checked`}
                              nameOfSection='users'
                              nameOfPermission='permissions'
                            />
                          </Grid>
                        ))}
                      </Grid>
                    </>
                  )}
                </FieldArray>
              </Grid>
            </Grid>
          </Fragment>
        )
      case 3:
        return (
          <Fragment key={activeStep}>
            <Grid container spacing={2} justifyContent='center'>
              <Grid
                item
                xs={12}
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
                    {values.roles.title}
                  </Typography>
                  <FormControlLabel
                    sx={{ fontSize: '8px !important' }}
                    control={
                      <Field
                        type='checkbox'
                        label='Select All'
                        checkedIcon={<IndeterminateCheckBoxIcon fontSize='medium' />}
                        as={Checkbox}
                        name={`roles.checked`}
                        //handle the select all checkbox in its own Permission

                        onChange={e => {
                          handleChange(e)
                          // add logic to handle the select all checkbox
                          const { checked } = e.target
                          const permissions = values.roles.permissions

                          handleSelectAllCheckbox('roles', checked, permissions, setFieldValue)
                        }}
                      />
                    }
                  />
                </Box>
                <Divider />

                <FieldArray name={`roles.permissions`}>
                  {() => (
                    <>
                      <Grid container spacing={4}>
                        {values.roles.permissions.map((permission, childIndex) => (
                          <Grid item xs={12} md={6} lg={6} sm={12} key={childIndex}>
                            <CustomCheckBox
                              permission={permission}
                              handleChange={handleChange}
                              values={values}
                              setFieldValue={setFieldValue}
                              name={`roles.permissions.${childIndex}.checked`}
                              nameOfSection='roles'
                              nameOfPermission='permissions'
                            />
                          </Grid>
                        ))}
                      </Grid>
                    </>
                  )}
                </FieldArray>
              </Grid>
            </Grid>
          </Fragment>
        )
      case 4:
        return (
          <Fragment key={activeStep}>
            <Grid container spacing={2} justifyContent='center'>
              <Grid
                item
                xs={12}
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
                    {values.products.title}
                  </Typography>
                  <FormControlLabel
                    sx={{ fontSize: '8px !important' }}
                    control={
                      <Field
                        type='checkbox'
                        label='Select All'
                        checkedIcon={<IndeterminateCheckBoxIcon fontSize='medium' />}
                        as={Checkbox}
                        name={`products.checked`}
                        //handle the select all checkbox in its own Permission

                        onChange={e => {
                          handleChange(e)
                          // add logic to handle the select all checkbox
                          const { checked } = e.target
                          const permissions = values.products.permissions

                          handleSelectAllCheckbox('products', checked, permissions, setFieldValue)
                        }}
                      />
                    }
                  />
                </Box>
                <Divider />

                <FieldArray name={`products.permissions`}>
                  {() => (
                    <>
                      <Grid container spacing={4}>
                        {values.products.permissions.map((permission, childIndex) => (
                          <Grid item xs={12} md={6} lg={6} sm={12} key={childIndex}>
                            <CustomCheckBox
                              permission={permission}
                              handleChange={handleChange}
                              values={values}
                              setFieldValue={setFieldValue}
                              name={`products.permissions.${childIndex}.checked`}
                              nameOfSection='products'
                              nameOfPermission='permissions'
                            />
                          </Grid>
                        ))}
                      </Grid>
                    </>
                  )}
                </FieldArray>
              </Grid>
            </Grid>
          </Fragment>
        )
      case 5:
        return (
          <Fragment key={activeStep}>
            <Grid container spacing={2} justifyContent='center'>
              <Grid
                item
                xs={12}
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
                    {values.list_products_page.title}
                  </Typography>
                  <FormControlLabel
                    sx={{ fontSize: '8px !important' }}
                    control={
                      <Field
                        type='checkbox'
                        label='Select All'
                        checkedIcon={<IndeterminateCheckBoxIcon fontSize='medium' />}
                        as={Checkbox}
                        name={`list_products_page.checked`}
                        // Handle the select all checkbox for pages
                        onChange={e => {
                          handleChange(e)
                          const { checked } = e.target
                          const actions = values.list_products_page.actions
                          const table = values.list_products_page.table

                          setFieldValue(`list_products_page.add_button`, checked)
                          actions.forEach((_, actionIndex) => {
                            setFieldValue(`list_products_page.actions.${actionIndex}.checked`, checked)
                          })
                          table.forEach((_, tableIndex) => {
                            setFieldValue(`list_products_page.table.${tableIndex}.checked`, checked)
                          })
                          setFieldValue(`list_products_page.checked`, checked)
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
                  <CustomCheckBoxSecond
                    permission={{ title: 'Add Button' }}
                    handleChange={handleChange}
                    values={values}
                    setFieldValue={setFieldValue}
                    name={`list_products_page.add_button`}
                    nameOfSection='list_products_page'
                    table={values.list_products_page.table}
                    action={values.list_products_page.actions}
                    addBtn={values.list_products_page.add_button}
                  />
                </Box>
                <FieldArray name={`list_products_page.actions`}>
                  {() => (
                    <Grid container spacing={4}>
                      {values.list_products_page.actions.map((action, actionIndex) => (
                        <Grid item xs={12} md={6} lg={6} sm={12} key={actionIndex}>
                          <CustomCheckBoxSecond
                            permission={action}
                            handleChange={handleChange}
                            table={values.list_products_page.table}
                            action={values.list_products_page.actions}
                            values={values}
                            setFieldValue={setFieldValue}
                            name={`list_products_page.actions.${actionIndex}.checked`}
                            nameOfSection='list_products_page'
                            addBtn={values.list_products_page.add_button}
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
                <FieldArray name={`list_products_page.table`}>
                  {() => (
                    <Grid container spacing={4}>
                      {values.list_products_page.table.map((table, tableIndex) => (
                        <Grid item xs={12} md={6} lg={6} sm={12} key={tableIndex}>
                          <CustomCheckBoxSecond
                            permission={table}
                            handleChange={handleChange}
                            values={values}
                            setFieldValue={setFieldValue}
                            name={`list_products_page.table.${tableIndex}.checked`}
                            nameOfSection='list_products_page'
                            action={values.list_products_page.actions}
                            table={values.list_products_page.table}
                            addBtn={values.list_products_page.add_button}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  )}
                </FieldArray>
              </Grid>
            </Grid>
          </Fragment>
        )

      default:
        return 'Unknown Step'
    }
  }
  // const getStepContent = ({ activeStep, values, setFieldValue, handleChange }) => {
  //   switch (activeStep) {
  //     case 0:
  //       return (
  //         <Fragment key={activeStep}>
  //           <Grid item xs={12} sx={{ mt: 4 }}>
  //             <FormControl fullWidth>
  //               <Field name='roleName' as={TextField} label='Role Name' fullWidth />
  //             </FormControl>
  //           </Grid>
  //         </Fragment>
  //       )
  //     case 1:
  //       return (
  //         <Fragment key={activeStep}>
  //           <Taps
  //             initialValues={initialValues}
  //             handleChange={handleChange}
  //             handleSelectAllCheckbox={handleSelectAllCheckbox}
  //             setFieldValue={setFieldValue}
  //             theme={theme}
  //             values={values}
  //           />
  //         </Fragment>
  //       )
  //     case 2:
  //       return (
  //         <Fragment key={activeStep}>
  //           <Grid container spacing={2} justifyContent='center'>
  //             <FieldArray name='pages'>
  //               {() => (
  //                 <>
  //                   {initialValues.pages.map((page, pageIndex) => (
  //                     <Grid
  //                       item
  //                       xs={12}
  //                       key={pageIndex}
  //                       sx={{
  //                         m: 3,
  //                         justifyContent: 'center',
  //                         alignContent: 'center',
  //                         pl: 0,
  //                         border: theme => `1px solid ${theme.palette.divider}`,
  //                         borderRadius: theme => `${theme.spacing(2)} !important`
  //                       }}
  //                     >
  //                       <Box
  //                         sx={{
  //                           display: 'flex',
  //                           alignItems: 'center',
  //                           justifyContent: 'space-between',
  //                           pl: 0
  //                         }}
  //                       >
  //                         <Typography
  //                           sx={{
  //                             fontWeight: 600,
  //                             pl: 0,
  //                             whiteSpace: 'nowrap',
  //                             textAlign: 'center',
  //                             color: `${theme.palette.text.primary} !important`
  //                           }}
  //                         >
  //                           {page.title}
  //                         </Typography>
  //                         <FormControlLabel
  //                           sx={{ fontSize: '8px !important' }}
  //                           control={
  //                             <Field
  //                               type='checkbox'
  //                               label='Select All'
  //                               checkedIcon={<IndeterminateCheckBoxIcon fontSize='medium' />}
  //                               as={Checkbox}
  //                               name={`pages.${pageIndex}.checked`}
  //                               // Handle the select all checkbox for pages
  //                               onChange={e => {
  //                                 handleChange(e)
  //                                 const { checked } = e.target
  //                                 const actions = initialValues.pages[pageIndex].actions
  //                                 const table = initialValues.pages[pageIndex].table
  //                                 // check add button
  //                                 setFieldValue(`pages.${pageIndex}.add_button`, checked)
  //                                 actions.forEach((_, actionIndex) => {
  //                                   setFieldValue(`pages.${pageIndex}.actions.${actionIndex}.checked`, checked)
  //                                 })
  //                                 table.forEach((_, tableIndex) => {
  //                                   setFieldValue(`pages.${pageIndex}.table.${tableIndex}.checked`, checked)
  //                                 })
  //                                 setFieldValue(`pages.${pageIndex}.checked`, checked)
  //                               }}
  //                             />
  //                           }
  //                         />
  //                       </Box>
  //                       <Divider />
  //                       <Box
  //                         sx={{
  //                           justifyContent: 'center',
  //                           alignContent: 'center',
  //                           margin: 'auto'
  //                         }}
  //                       >
  //                         <Divider sx={{ my: 2 }}>
  //                           <Chip
  //                             label='Actions'
  //                             size='medium'
  //                             sx={{
  //                               backgroundColor: theme => theme.palette.primary.light,
  //                               color: theme => theme.palette.primary.contrastText
  //                             }}
  //                           />
  //                         </Divider>
  //                       </Box>
  //                       <Box>
  //                         <CustomCheckBoxSecond
  //                           permission={{ title: 'Add Button' }}
  //                           handleChange={handleChange}
  //                           values={values}
  //                           setFieldValue={setFieldValue}
  //                           name={`pages.${pageIndex}.add_button`}
  //                           parentIndex={pageIndex}
  //                           nameOfSection='pages'
  //                           table={values.pages[pageIndex].table}
  //                           action={values.pages[pageIndex].actions}
  //                           addBtn={values.pages[pageIndex].add_button}
  //                         />
  //                       </Box>
  //                       <FieldArray name={`pages.${pageIndex}.actions`}>
  //                         {() => (
  //                           <Grid container spacing={4}>
  //                             {page.actions.map((action, actionIndex) => (
  //                               <Grid item xs={12} md={6} lg={6} sm={12} key={actionIndex}>
  //                                 <CustomCheckBoxSecond
  //                                   permission={action}
  //                                   handleChange={handleChange}
  //                                   table={values.pages[pageIndex].table}
  //                                   action={values.pages[pageIndex].actions}
  //                                   values={values}
  //                                   setFieldValue={setFieldValue}
  //                                   name={`pages.${pageIndex}.actions.${actionIndex}.checked`}
  //                                   parentIndex={pageIndex}
  //                                   nameOfSection='pages'
  //                                   addBtn={values.pages[pageIndex].add_button}
  //                                 />
  //                               </Grid>
  //                             ))}
  //                           </Grid>
  //                         )}
  //                       </FieldArray>

  //                       <Box
  //                         sx={{
  //                           justifyContent: 'center',
  //                           alignContent: 'center',
  //                           margin: 'auto'
  //                         }}
  //                       >
  //                         <Divider sx={{ my: 2 }}>
  //                           <Chip
  //                             label='Table'
  //                             size='medium'
  //                             sx={{
  //                               backgroundColor: theme => theme.palette.primary.light,
  //                               color: theme => theme.palette.primary.contrastText
  //                             }}
  //                           />
  //                         </Divider>
  //                       </Box>
  //                       <FieldArray name={`pages.${pageIndex}.table`}>
  //                         {() => (
  //                           <Grid container spacing={4}>
  //                             {page.table.map((table, tableIndex) => (
  //                               <Grid item xs={12} md={6} lg={6} sm={12} key={tableIndex}>
  //                                 <CustomCheckBoxSecond
  //                                   permission={table}
  //                                   handleChange={handleChange}
  //                                   values={values}
  //                                   setFieldValue={setFieldValue}
  //                                   name={`pages.${pageIndex}.table.${tableIndex}.checked`}
  //                                   parentIndex={pageIndex}
  //                                   nameOfSection='pages'
  //                                   action={values.pages[pageIndex].actions}
  //                                   table={values.pages[pageIndex].table}
  //                                   addBtn={values.pages[pageIndex].add_button}
  //                                 />
  //                               </Grid>
  //                             ))}
  //                           </Grid>
  //                         )}
  //                       </FieldArray>
  //                     </Grid>
  //                   ))}
  //                 </>
  //               )}
  //             </FieldArray>
  //           </Grid>
  //         </Fragment>
  //       )

  //     default:
  //       return 'Unknown Step'
  //   }
  // }

  const renderContent = () => {
    if (activeStep === steps.length) {
      return (
        <>
          <Grid
            container
            spacing={2}
            justifyContent={'center'}
            alignContent={'center'}
            alignItems={'center'}
            sx={{ height: '100vh', px: 10 }}
          >
            <Grid item xs={12} sx={{ margin: 'auto' }}>
              <Typography align='center'>All steps are completed! 🎉</Typography>
            </Grid>
            <Grid item xs={12} sx={{ margin: 'auto', mt: 4 }}>
              <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                <Button size='large' variant='contained' onClick={handleReset}>
                  Reset
                </Button>
              </Box>
            </Grid>
          </Grid>
        </>
      )
    } else {
      return (
        <Formik initialValues={initialValues} onSubmit={e => e.preventDefault()}>
          {({ values, setFieldValue, handleChange }) => (
            <Form>
              <Grid container spacing={5} sx={{ px: 10 }}>
                <Grid item xs={12}>
                  <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                    {steps[activeStep].title}
                  </Typography>
                  <Typography variant='caption' component='p'>
                    {steps[activeStep].subtitle}
                  </Typography>
                </Grid>

                <GlobalScroll height={'auto'}>
                  <Grid item xs={12} sx={{ justifyContent: 'center', alignContent: 'center' }}>
                    {getStepContent({ activeStep, values, setFieldValue, handleChange })}
                  </Grid>
                </GlobalScroll>

                <Grid
                  item
                  xs={12}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    paddingLeft: '3px !important',
                    paddingTop: '5px !important',
                    bottom: 0,
                    gap: 10,
                    right: 0,
                    padding: 0,
                    width: '100%',
                    border: '1px',
                    borderColor: theme => theme.palette.grey[300],

                    position: 'absolute',
                    backgroundColor: theme => theme.palette.background.paper
                  }}
                >
                  <Box
                    // center it in middel of grid
                    sx={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: 40,
                      pb: 5
                    }}
                  >
                    <Button
                      size='medium'
                      variant='outlined'
                      color='secondary'
                      disabled={activeStep === 0}
                      onClick={handleBack}
                    >
                      Back
                    </Button>
                    {activeStep === steps.length - 1 ? (
                      <Button
                        size={'medium'}
                        variant='contained'
                        color='primary'
                        onClick={() => handleSubmitForm(values, { resetForm })}
                      >
                        {isEdit ? 'Update' : 'Create'}
                      </Button>
                    ) : (
                      <Button size={'medium'} variant='contained' color='primary' onClick={handleNext}>
                        Next
                      </Button>
                    )}
                  </Box>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      )
    }
  }

  return (
    <Card sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row', lg: 'row' } }}>
      <StepperHeaderContainer>
        <StepperWrapper sx={{ height: 'auto', overflowY: 'scroll' }}>
          <Stepper
            activeStep={activeStep}
            connector={<></>}
            orientation='vertical'
            sx={{
              height: '100%',
              minWidth: '15rem',
              overFlowY: 'scroll',
              overFlowX: 'hidden',
              mb: '100px'
            }}
          >
            {steps.map((step, index) => {
              return (
                <Step
                  key={index}
                  sx={{
                    padding: '0px !important'
                  }}
                >
                  <StepLabel StepIconComponent={StepperCustomDot}>
                    <div
                      className='step-label'
                      style={{
                        cursor: 'pointer'
                      }}
                      onClick={() => {
                        setActiveStep(index)
                      }}
                    >
                      <CustomAvatar
                        variant='rounded'
                        skin={activeStep === index ? 'filled' : 'light'}
                        color={activeStep >= index ? 'primary' : 'secondary'}
                        sx={{
                          mr: 2,
                          borderRadius: 1,
                          ...(activeStep === index && {
                            boxShadow: theme => `0 0.1875rem 0.375rem 0 ${hexToRGBA(theme.palette.primary.main, 0.4)}`
                          })
                        }}
                      >
                        <Icon icon={step.icon} />
                      </CustomAvatar>
                      <div>
                        <Typography
                          // add style for break points in font size
                          sx={{
                            fontSize: { xs: '12px', md: '14px', lg: '16px' }
                          }}
                          className='step-title'
                        >
                          {step.title}
                        </Typography>
                        <Typography className='step-subtitle'>{step.subtitle}</Typography>
                      </div>
                    </div>
                  </StepLabel>
                </Step>
              )
            })}
          </Stepper>
        </StepperWrapper>
      </StepperHeaderContainer>
      <Divider sx={{ m: '0 !important' }} />
      <CardContent
        sx={{
          width: '100%',

          overFlowY: 'hidden'
        }}
      >
        {renderContent()}
      </CardContent>
    </Card>
  )
}

export default StepperRoles

const CustomCheckBox = ({
  permission,
  handleChange,
  values,
  setFieldValue,
  name,

  nameOfSection,
  nameOfPermission
}) => {
  useEffect(() => {
    const allPermissionsChecked = values[`${nameOfSection}`][`${nameOfPermission}`].filter(
      permission => permission.checked
    )

    // Update the "Select All" checkbox based on all permissions checked

    if (allPermissionsChecked.length === values[`${nameOfSection}`][`${nameOfPermission}`].length) {
      setFieldValue(`${nameOfSection}.checked`, true)
    } else {
      setFieldValue(`${nameOfSection}.checked`, false)
    }
  }, [values, setFieldValue, nameOfPermission, nameOfSection])

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
  nameOfSection,
  table,
  action,
  addBtn
}) => {
  useEffect(() => {
    const allActionsChecked = action.filter(item => item.checked)
    const allTableChecked = table.filter(item => item.checked)

    const isAllChecked = allActionsChecked.length === action.length && allTableChecked.length === table.length && addBtn

    setFieldValue(`${nameOfSection}.checked`, isAllChecked)
  }, [setFieldValue, action, table, nameOfSection, addBtn])

  return (
    <FormControlLabel
      label={permission.title}
      sx={{ fontSize: '8px !important' }}
      control={<Field type='checkbox' as={Checkbox} onChange={e => handleChange(e)} name={name} />}
    />
  )
}

// const Taps = ({ initialValues, handleChange, handleSelectAllCheckbox, setFieldValue, theme, values }) => {
//   const [activeStep, setActiveStep] = useState(0)

//   const handleTabChange = (event, newValue) => {
//     setActiveStep(newValue)
//   }

//   return (
//     <Fragment>
//       <Tabs
//         value={activeStep}
//         onChange={handleTabChange}
//         variant='scrollable'
//         scrollButtons='auto'
//         // give it fixed width to make it scrollable
//         sx={{
//           width: '300px',
//           '& .MuiTabs-indicator': {
//             backgroundColor: theme.palette.primary.main
//           }
//         }}
//       >
//         {initialValues.sections.map((section, index) => (
//           <Tab key={index} label={section.title} />
//         ))}
//       </Tabs>

//       {initialValues.sections.map((section, parentIndex) => (
//         <TabPanel value={activeStep} index={parentIndex} key={parentIndex}>
//           <Grid container spacing={2} justifyContent='center'>
//             <Grid
//               item
//               xs={12}
//               sx={{
//                 m: 3,
//                 mb: 0,
//                 justifyContent: 'center',
//                 alignContent: 'center',
//                 pl: 0,
//                 border: theme => `1px solid ${theme.palette.divider}`,
//                 borderRadius: theme => `${theme.spacing(2)} !important`
//               }}
//             >
//               <Box
//                 sx={{
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'space-between',
//                   pl: 0
//                 }}
//               >
//                 <Typography
//                   sx={{
//                     fontWeight: 600,
//                     pl: 0,
//                     whiteSpace: 'nowrap',
//                     textAlign: 'center',
//                     color: `${theme.palette.text.primary} !important`
//                   }}
//                 >
//                   {section.title}
//                 </Typography>
//                 <FormControlLabel
//                   sx={{ fontSize: '8px !important' }}
//                   control={
//                     <Checkbox
//                       type='checkbox'
//                       label='Select All'
//                       checkedIcon={<IndeterminateCheckBoxIcon fontSize='medium' />}
//                       name={`sections.checked`}
//                       onChange={e => {
//                         handleChange(e)
//                         const { checked } = e.target
//                         const permissions = initialValues.sections[parentIndex].permissions
//                         handleSelectAllCheckbox(checked, parentIndex, permissions, setFieldValue)
//                       }}
//                     />
//                   }
//                 />
//               </Box>
//               <Divider />

//               <FieldArray name={`sections.${parentIndex}.permissions`}>
//                 {() => (
//                   <Grid container spacing={4}>
//                     {section.permissions.map((permission, childIndex) => (
//                       <Grid item xs={12} md={6} lg={6} sm={12} key={childIndex}>
//                         <CustomCheckBox
//                           permission={permission}
//                           handleChange={handleChange}
//                           values={values}
//                           setFieldValue={setFieldValue}
//                           name={`sections.${parentIndex}.permissions.${childIndex}.checked`}
//                           parentIndex={parentIndex}
//                           nameOfSection='sections'
//                           nameOfPermission='permissions'
//                         />
//                       </Grid>
//                     ))}
//                   </Grid>
//                 )}
//               </FieldArray>
//             </Grid>
//           </Grid>
//         </TabPanel>
//       ))}
//     </Fragment>
//   )
// }

// function TabPanel(props) {
//   const { children, value, index, ...other } = props

//   return (
//     <div role='tabpanel' hidden={value !== index} id={`tabpanel-${index}`} aria-labelledby={`tab-${index}`} {...other}>
//       {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
//     </div>
//   )
// }
