import { Grid } from '@mui/material'
// import { Box } from '@mui/system'
// import { Field } from 'formik'
import React from 'react'

// ** Icon Imports
// import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox'
import InnerStepper from './InnerStepper'

const CustomRoleSection = ({ data, name, handleChange }) => {
  // const name = 'product.permissions'
  // const data = {
  //   title: 'Product Management',
  //   checked: false,
  //   permissions: [
  //     {
  //       title: 'List Products',
  //       subtitle: 'View all products',
  //       tabs: [
  //         {
  //           title: 'Side Bar',
  //           value: 0,
  //           section: [
  //             {
  //               title: 'List Products',
  //               checked: false
  //             }
  //           ]
  //         },

  //         {
  //           title: 'Table',
  //           value: 1,
  //           section: [
  //             {
  //               title: 'Name',
  //               checked: false
  //             },
  //             {
  //               title: 'SKU',
  //               checked: false
  //             },
  //             {
  //               title: 'View Stock',
  //               checked: false
  //             }
  //           ]
  //         },

  //         {
  //           title: 'Actions',
  //           value: 2,
  //           section: [
  //             {
  //               title: 'Edit',
  //               checked: false
  //             },
  //             {
  //               title: 'Delete',
  //               checked: false
  //             },
  //             {
  //               title: 'View',
  //               checked: false
  //             }
  //           ]
  //         }
  //       ]
  //     },
  //     {
  //       title: 'Warranties',
  //       subtitle: 'View all warranties',
  //       tabs: [
  //         {
  //           title: 'Side Bar',
  //           value: 0,
  //           section: [
  //             {
  //               title: 'List Warranties',
  //               checked: false
  //             }
  //           ]
  //         },

  //         {
  //           title: 'Table',
  //           value: 1,
  //           section: [
  //             {
  //               title: 'Name',
  //               checked: false
  //             },
  //             {
  //               title: 'SKU',
  //               checked: false
  //             },
  //             {
  //               title: 'View Stock',
  //               checked: false
  //             }
  //           ]
  //         },

  //         {
  //           title: 'Actions',
  //           value: 2,
  //           section: [
  //             {
  //               title: 'Edit',
  //               checked: false
  //             },
  //             {
  //               title: 'Delete',
  //               checked: false
  //             },
  //             {
  //               title: 'View',
  //               checked: false
  //             }
  //           ]
  //         }
  //       ]

  //     },
  //     {
  //       title: 'Variations',
  //       subtitle: 'View all variations',
  //       tabs: [
  //         {
  //           title: 'Side Bar',
  //           value: 0,
  //           section: [
  //             {
  //               title: 'List Variations',
  //               checked: false
  //             }
  //           ]
  //         },

  //         {
  //           title: 'Table',
  //           value: 1,
  //           section: [
  //             {
  //               title: 'Name',
  //               checked: false
  //             },
  //             {
  //               title: 'SKU',
  //               checked: false
  //             },
  //             {
  //               title: 'View Stock',
  //               checked: false
  //             }
  //           ]
  //         },

  //         {
  //           title: 'Actions',
  //           value: 2,
  //           section: [
  //             {
  //               title: 'Edit',
  //               checked: false
  //             },
  //             {
  //               title: 'Delete',
  //               checked: false
  //             },
  //             {
  //               title: 'View',
  //               checked: false
  //             }
  //           ]
  //         }
  //       ]
  //     },
  //     {
  //       title: 'Categories',
  //       subtitle: 'View all categories',
  //       tabs: [
  //         {
  //           title: 'Side Bar',
  //           value: 0,
  //           section: [
  //             {
  //               title: 'List Categories',
  //               checked: false
  //             }
  //           ]
  //         },

  //         {
  //           title: 'Table',
  //           value: 1,
  //           section: [
  //             {
  //               title: 'Name',
  //               checked: false
  //             },
  //             {
  //               title: 'SKU',
  //               checked: false
  //             },
  //             {
  //               title: 'View Stock',
  //               checked: false
  //             }
  //           ]
  //         },

  //         {
  //           title: 'Actions',
  //           value: 2,
  //           section: [
  //             {
  //               title: 'Edit',
  //               checked: false
  //             },
  //             {
  //               title: 'Delete',
  //               checked: false
  //             },
  //             {
  //               title: 'View',
  //               checked: false
  //             }
  //           ]
  //         }
  //       ]
  //     },
  //     {
  //       title: 'Brands',
  //       subtitle: 'View all brands',
  //       tabs: [
  //         {
  //           title: 'Side Bar',
  //           value: 0,
  //           section: [
  //             {
  //               title: 'List Brands',
  //               checked: false
  //             }
  //           ]
  //         },

  //         {
  //           title: 'Table',
  //           value: 1,
  //           section: [
  //             {
  //               title: 'Name',
  //               checked: false
  //             },
  //             {
  //               title: 'SKU',
  //               checked: false
  //             },
  //             {
  //               title: 'View Stock',
  //               checked: false
  //             }
  //           ]
  //         },

  //         {
  //           title: 'Actions',
  //           value: 2,
  //           section: [
  //             {
  //               title: 'Edit',
  //               checked: false
  //             },
  //             {
  //               title: 'Delete',
  //               checked: false
  //             },
  //             {
  //               title: 'View',
  //               checked: false
  //             }
  //           ]
  //         }
  //       ]
  //     },

  //   ]
  // }

  return (
    <Grid container spacing={2} justifyContent='center'>
      <Grid
        item
        xs={12}
        sx={{
          m: 3,
          justifyContent: 'center',
          alignContent: 'center',
          pl: 0,
          width: '100%'
          // border: theme => `1px solid ${theme.palette.divider}`,
          // borderRadius: theme => `${theme.spacing(2)} !important`
        }}
      >
        {/* <Box
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
              color: theme => theme.palette.text.primary
            }}
          >
            Select All
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
        </Box> */}

        <InnerStepper steps={data.permissions} mainName={name} handleChange={handleChange} />
      </Grid>
    </Grid>
  )
}

export default CustomRoleSection

// const CustomCheckBox = ({
//   permission,
//   handleChange,
//   values,
//   setFieldValue,
//   name,

//   nameOfSection,
//   nameOfPermission
// }) => {
//   useEffect(() => {
//     const allPermissionsChecked = values[`${nameOfSection}`][`${nameOfPermission}`].filter(
//       permission => permission.checked
//     )

//     // Update the "Select All" checkbox based on all permissions checked

//     if (allPermissionsChecked.length === values[`${nameOfSection}`][`${nameOfPermission}`].length) {
//       setFieldValue(`${nameOfSection}.checked`, true)
//     } else {
//       setFieldValue(`${nameOfSection}.checked`, false)
//     }
//   }, [values, setFieldValue, nameOfPermission, nameOfSection])

//   return (
//     <FormControlLabel
//       label={permission.title}
//       sx={{ fontSize: '8px !important' }}
//       control={
//         <Field
//           type='checkbox'
//           as={Checkbox}
//           // on change i want to set the  value of sections.${parentIndex}.checked True
//           onChange={e => {
//             handleChange(e)
//           }}
//           name={name}
//         />
//       }
//     />
//   )
// }

// const CustomCheckBoxSecond = ({
//   permission,
//   handleChange,
//   setFieldValue,
//   name,
//   nameOfSection,
//   table,
//   action,
//   addBtn
// }) => {
//   useEffect(() => {
//     const allActionsChecked = action.filter(item => item.checked)
//     const allTableChecked = table.filter(item => item.checked)

//     const isAllChecked = allActionsChecked.length === action.length && allTableChecked.length === table.length && addBtn

//     setFieldValue(`${nameOfSection}.checked`, isAllChecked)
//   }, [setFieldValue, action, table, nameOfSection, addBtn])

//   return (
//     <FormControlLabel
//       label={permission.title}
//       sx={{ fontSize: '8px !important' }}
//       control={<Field type='checkbox' as={Checkbox} onChange={e => handleChange(e)} name={name} />}
//     />
//   )
// }
