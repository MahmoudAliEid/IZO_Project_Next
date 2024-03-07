// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'

// ** Custom Component Import
import TabsWrapper from 'src/@core/styles/mui/TabsWrapper'
import { Field, FieldArray } from 'formik'
import { FormControlLabel, Grid, Checkbox } from '@mui/material'

const CustomRoleTabs = ({ taps, parentIndex, mainName, handleChange }) => {
  // ** State
  const [value, setValue] = useState(0)

  const handleChangeValue = (event, newValue) => {
    setValue(newValue)
  }

  // need array of objects to map through each object representing a tab

  return (
    <TabsWrapper>
      <TabContext value={value}>
        <TabList variant='fullWidth' onChange={handleChangeValue} aria-label='full width tabs example'>
          {taps &&
            Array.isArray(taps) &&
            taps.map((tab, index) => {
              return <Tab key={index} value={tab.value} label={tab.title} />
            })}
        </TabList>
        <FieldArray name={`${mainName}.permissions.${parentIndex}.taps`}>
          {() => (
            <>
              {taps.map((tab, index) => {
                return (
                  <TabPanel key={index} value={tab.value}>
                    <Grid container spacing={4}>
                      {tab.section.map((section, childIndex) => (
                        <Grid item xs={12} md={4} lg={4} sm={12} key={childIndex}>
                          <FormControlLabel
                            label={section.title}
                            sx={{ fontSize: '8px !important' }}
                            control={
                              <Field
                                type='checkbox'
                                as={Checkbox}
                                onChange={e => {
                                  handleChange(e)
                                }}
                                name={`products.permissions.${parentIndex}.taps.${index}.section.${childIndex}.checked`}
                              />
                            }
                          />
                        </Grid>
                      ))}
                      {/* {values.dashboard.permissions.map((permission, childIndex) => (
                        <Grid item xs={12} md={4} lg={4} sm={12} key={childIndex}>
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
                      ))} */}
                    </Grid>
                  </TabPanel>
                )
              })}
            </>
          )}
        </FieldArray>
      </TabContext>
    </TabsWrapper>
  )
}

export default CustomRoleTabs

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
