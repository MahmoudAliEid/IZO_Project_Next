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
  TextField,
  CircularProgress
} from '@mui/material'

// Tabs, Tab

import MuiStep from '@mui/material/Step'
import GlobalScroll from 'src/@core/components/global-scroll/GlobalScroll'
import CustomRoleSection from './CustomRoleSection'
import axios from 'axios'
import { getCookie } from 'cookies-next'

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
    role_name: '',
    service_staff: {
      title: 'Service staff Management',
      checked: false,
      permissions: [
        {
          title: 'Service staff',
          checked: false
        }
      ]
    },
    dashboard: {
      title: 'Dashboard Management',
      checked: false,
      permissions: [
        {
          title: 'E-commerce',
          checked: false
        },
        {
          title: 'Analytics',
          checked: false
        },
        {
          title: 'CRM Analytics',
          checked: false
        }
      ]
    },
    Users: {
      title: 'Users Management',
      checked: false,
      permissions: [
        {
          title: 'List Users',
          subTitle: 'View All List Users',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'List Users',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: 'User Username',
                  checked: false
                },
                {
                  title: 'User Name',
                  checked: false
                },
                {
                  title: 'User Role',
                  checked: false
                },
                {
                  title: 'User Email',
                  checked: false
                },
                {
                  title: 'User Action',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: 'View User',
                  checked: false
                },
                {
                  title: 'Create User',
                  checked: false
                },
                {
                  title: 'Edit User',
                  checked: false
                },
                {
                  title: 'Delete User',
                  checked: false
                }
              ]
            }
          ]
        }
      ]
    },
    Roles: {
      title: 'Roles Management',
      checked: false,
      permissions: [
        {
          title: 'List Roles',
          subTitle: 'View All List Roles',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'List Roles',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: 'Role Name',
                  checked: false
                },
                {
                  title: 'Role Assigned To',
                  checked: false
                },
                {
                  title: 'Role Action',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: 'View Role',
                  checked: false
                },
                {
                  title: 'Create Role',
                  checked: false
                },
                {
                  title: 'Edit Role',
                  checked: false
                },
                {
                  title: 'Delete Role',
                  checked: false
                }
              ]
            }
          ]
        }
      ]
    },
    Contacts: {
      title: 'Contacts Management',
      checked: false,
      permissions: [
        {
          title: 'List Supplier',
          subTitle: 'View All List Supplier',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'List Supplier',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: 'Supplier Contact ID',
                  checked: false
                },
                {
                  title: 'Supplier Business Name',
                  checked: false
                },
                {
                  title: 'Supplier Email',
                  checked: false
                },
                {
                  title: 'Supplier Tax Number',
                  checked: false
                },
                {
                  title: 'Supplier Opening Balance',
                  checked: false
                },
                {
                  title: 'Supplier Advanced Balance',
                  checked: false
                },
                {
                  title: 'Supplier Added On',
                  checked: false
                },
                {
                  title: 'Supplier Pay Term',
                  checked: false
                },
                {
                  title: 'Supplier Address',
                  checked: false
                },
                {
                  title: 'Supplier Mobile',
                  checked: false
                },
                {
                  title: 'Supplier Total Purchase Due',
                  checked: false
                },
                {
                  title: 'Supplier Total Purchase Return Due',
                  checked: false
                },
                {
                  title: 'Supplier Custom Field 1',
                  checked: false
                },
                {
                  title: 'Supplier Custom Field 2',
                  checked: false
                },
                {
                  title: 'Supplier Custom Field 3',
                  checked: false
                },
                {
                  title: 'Supplier Custom Field 4',
                  checked: false
                },
                {
                  title: 'Supplier Custom Field 5',
                  checked: false
                },
                {
                  title: 'Supplier Custom Field 6',
                  checked: false
                },
                {
                  title: 'Supplier Custom Field 7',
                  checked: false
                },
                {
                  title: 'Supplier Custom Field 8',
                  checked: false
                },
                {
                  title: 'Supplier Custom Field 9',
                  checked: false
                },
                {
                  title: 'Supplier Custom Field 10',
                  checked: false
                },
                {
                  title: 'Supplier Action',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: 'View Supplier',
                  checked: false
                },
                {
                  title: 'View Statement Supplier',
                  checked: false
                },
                {
                  title: 'Ledger Supplier',
                  checked: false
                },
                {
                  title: 'Create Supplier',
                  checked: false
                },
                {
                  title: 'Edit Supplier',
                  checked: false
                },
                {
                  title: 'Delete Supplier',
                  checked: false
                },
                {
                  title: 'Pay Supplier',
                  checked: false
                },
                {
                  title: 'Deactivate Supplier',
                  checked: false
                },
                {
                  title: 'View Purchase Supplier',
                  checked: false
                },
                {
                  title: 'Supplier Stock Report',
                  checked: false
                },
                {
                  title: 'Document & Note Supplier',
                  checked: false
                }
              ]
            }
          ]
        },
        {
          title: 'List Customer',
          subTitle: 'View All List Customer',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'List Customer',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: 'Customer Contact ID',
                  checked: false
                },
                {
                  title: 'Customer Business Name',
                  checked: false
                },
                {
                  title: 'Customer Email',
                  checked: false
                },
                {
                  title: 'Customer Tax Number',
                  checked: false
                },
                {
                  title: 'Customer Opening Balance',
                  checked: false
                },
                {
                  title: 'Customer Advanced Balance',
                  checked: false
                },
                {
                  title: 'Customer Customer Group',
                  checked: false
                },
                {
                  title: 'Customer Added On',
                  checked: false
                },
                {
                  title: 'Customer Credit Limit',
                  checked: false
                },
                {
                  title: 'Customer Pay Term',
                  checked: false
                },
                {
                  title: 'Customer Address',
                  checked: false
                },
                {
                  title: 'Customer Mobile',
                  checked: false
                },
                {
                  title: 'Customer Total Sale Due',
                  checked: false
                },
                {
                  title: 'Customer Total Sale Return Due',
                  checked: false
                },
                {
                  title: 'Customer Custom Field 1',
                  checked: false
                },
                {
                  title: 'Customer Custom Field 2',
                  checked: false
                },
                {
                  title: 'Customer Custom Field 3',
                  checked: false
                },
                {
                  title: 'Customer Custom Field 4',
                  checked: false
                },
                {
                  title: 'Customer Custom Field 5',
                  checked: false
                },
                {
                  title: 'Customer Custom Field 6',
                  checked: false
                },
                {
                  title: 'Customer Custom Field 7',
                  checked: false
                },
                {
                  title: 'Customer Custom Field 8',
                  checked: false
                },
                {
                  title: 'Customer Custom Field 9',
                  checked: false
                },
                {
                  title: 'Customer Custom Field 10',
                  checked: false
                },
                {
                  title: 'Customer Action',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: 'View Customer',
                  checked: false
                },
                {
                  title: 'View Statement Customer',
                  checked: false
                },
                {
                  title: 'Ledger Customer',
                  checked: false
                },
                {
                  title: 'Create Customer',
                  checked: false
                },
                {
                  title: 'Edit Customer',
                  checked: false
                },
                {
                  title: 'Delete Customer',
                  checked: false
                },
                {
                  title: 'Pay Customer',
                  checked: false
                },
                {
                  title: 'Deactivate Customer',
                  checked: false
                },
                {
                  title: 'View Sales Customer',
                  checked: false
                },
                {
                  title: 'Customer Stock Report',
                  checked: false
                },
                {
                  title: 'Document & Note Customer',
                  checked: false
                }
              ]
            }
          ]
        },
        {
          title: 'List Customer Group',
          subTitle: 'View All List Customer Group',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'List Customer Group',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: 'Customer Group Name',
                  checked: false
                },
                {
                  title: 'Customer Group Calculation Percentage',
                  checked: false
                },
                {
                  title: 'Customer Group Sale Price Group',
                  checked: false
                },
                {
                  title: 'Customer Group Action',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: 'View Customer Group',
                  checked: false
                },
                {
                  title: 'Create Customer Group',
                  checked: false
                },
                {
                  title: 'Edit Customer Group',
                  checked: false
                },
                {
                  title: 'Delete Customer Group',
                  checked: false
                }
              ]
            }
          ]
        },
        {
          title: 'Import Contacts',
          subTitle: 'View All Import Contacts',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Import Contacts',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: []
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: 'Download Import Contacts',
                  checked: false
                },
                {
                  title: 'Submit Import Contacts',
                  checked: false
                }
              ]
            }
          ]
        }
      ]
    },
    Products: {
      title: 'Products Management',
      checked: false,
      permissions: [
        {
          title: 'List Products',
          subTitle: 'View All List Products',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'List Products',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: 'Product Image',
                  checked: false
                },
                {
                  title: 'Product Name',
                  checked: false
                },
                {
                  title: 'Product Business Location',
                  checked: false
                },
                {
                  title: 'Product Unit Cost Price',
                  checked: false
                },
                {
                  title: 'Product Unit Sale Price Exc.Vat',
                  checked: false
                },
                {
                  title: 'Product Sale Price',
                  checked: false
                },
                {
                  title: 'Product Current Stock',
                  checked: false
                },
                {
                  title: 'Product Type',
                  checked: false
                },
                {
                  title: 'Product Category',
                  checked: false
                },
                {
                  title: 'Product Sub Category',
                  checked: false
                },
                {
                  title: 'Product Brand',
                  checked: false
                },
                {
                  title: 'Product Tax',
                  checked: false
                },
                {
                  title: 'Product Code',
                  checked: false
                },
                {
                  title: 'Product Sub Code',
                  checked: false
                },
                {
                  title: 'Product Custom Field 1',
                  checked: false
                },
                {
                  title: 'Product Custom Field 2',
                  checked: false
                },
                {
                  title: 'Product Custom Field 3',
                  checked: false
                },
                {
                  title: 'Product Custom Field 4',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: 'View Product',
                  checked: false
                },
                {
                  title: 'Create Product',
                  checked: false
                },
                {
                  title: 'Edit Product',
                  checked: false
                },
                {
                  title: 'Delete Product',
                  checked: false
                },
                {
                  title: 'Product Labels',
                  checked: false
                },
                {
                  title: 'Product Add Barcode',
                  checked: false
                },
                {
                  title: 'Label Barcode',
                  checked: false
                },
                {
                  title: 'Product Add Opening Stock',
                  checked: false
                },
                {
                  title: 'Product History',
                  checked: false
                },
                {
                  title: 'Duplicate Product',
                  checked: false
                },
                {
                  title: 'Download Product Brochure',
                  checked: false
                }
              ]
            }
          ]
        },
        {
          title: 'Import Products',
          subTitle: 'View All Import Products',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Import Products',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: []
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: 'Download Import Products',
                  checked: false
                },
                {
                  title: 'Submit Import Products',
                  checked: false
                }
              ]
            }
          ]
        },
        {
          title: 'Print Labels',
          subTitle: 'View All Print Labels',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Print Labels',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: []
            },
            {
              title: 'Actions',
              value: 2,
              section: []
            }
          ]
        },
        {
          title: 'Variations',
          subTitle: 'View All Variations',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Variations',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: 'Variations',
                  checked: false
                },
                {
                  title: 'Variation Value',
                  checked: false
                },
                {
                  title: 'Variation Action',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: 'View Variation',
                  checked: false
                },
                {
                  title: 'Create Variation',
                  checked: false
                },
                {
                  title: 'Edit Variation',
                  checked: false
                },
                {
                  title: 'Delete Variation',
                  checked: false
                }
              ]
            }
          ]
        },
        {
          title: 'List Opening Stock',
          subTitle: 'View All List Opening Stock',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'List Opening Stock',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: 'Opening Stock Reference No',
                  checked: false
                },
                {
                  title: 'Opening Stock Business Location',
                  checked: false
                },
                {
                  title: 'Opening Stock Date',
                  checked: false
                },
                {
                  title: 'Opening Stock Action',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: 'View Opening Stock',
                  checked: false
                },
                {
                  title: 'Create Opening Stock',
                  checked: false
                },
                {
                  title: 'Edit Opening Stock',
                  checked: false
                },
                {
                  title: 'Delete Opening Stock',
                  checked: false
                }
              ]
            }
          ]
        },
        {
          title: 'Import Opening Stock',
          subTitle: 'View All Import Opening Stock',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Import Opening Stock',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: []
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: 'Download Import Opening Stock',
                  checked: false
                },
                {
                  title: 'Submit Import Opening Stock',
                  checked: false
                }
              ]
            }
          ]
        },
        {
          title: 'Sales Price Group',
          subTitle: 'View All Sales Price Group',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Sales Price Group',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: 'Sales Price Group Name',
                  checked: false
                },
                {
                  title: 'Sales Price Group Description',
                  checked: false
                },
                {
                  title: 'Sales Price Group Action',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: 'View Sales Price Group',
                  checked: false
                },
                {
                  title: 'Create Sales Price Group',
                  checked: false
                },
                {
                  title: 'Edit Sales Price Group',
                  checked: false
                },
                {
                  title: 'Delete Sales Price Group',
                  checked: false
                },
                {
                  title: 'Deactivate Sales Price Group',
                  checked: false
                },
                {
                  title: 'Download Import Sales Price Group',
                  checked: false
                },
                {
                  title: 'Submit Import Sales Price Group',
                  checked: false
                }
              ]
            }
          ]
        },
        {
          title: 'Units',
          subTitle: 'View All Units',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Units',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: 'Unit Name',
                  checked: false
                },
                {
                  title: 'Unit Short Name',
                  checked: false
                },
                {
                  title: 'Unit Accept Decimal',
                  checked: false
                },
                {
                  title: 'Unit Action',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: 'View Unit',
                  checked: false
                },
                {
                  title: 'Create Unit',
                  checked: false
                },
                {
                  title: 'Edit Unit',
                  checked: false
                },
                {
                  title: 'Delete Unit',
                  checked: false
                },
                {
                  title: 'Default Unit',
                  checked: false
                }
              ]
            }
          ]
        },
        {
          title: 'Categories',
          subTitle: 'View All Categories',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Categories',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: 'Category Name',
                  checked: false
                },
                {
                  title: 'Category Code',
                  checked: false
                },
                {
                  title: 'Category Description',
                  checked: false
                },
                {
                  title: 'Category Action',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: 'View Category',
                  checked: false
                },
                {
                  title: 'Create Category',
                  checked: false
                },
                {
                  title: 'Edit Category',
                  checked: false
                },
                {
                  title: 'Delete Category',
                  checked: false
                }
              ]
            }
          ]
        },
        {
          title: 'Brands',
          subTitle: 'View All Brands',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Brands',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: 'Brand Name',
                  checked: false
                },
                {
                  title: 'Brand Note',
                  checked: false
                },
                {
                  title: 'Brand Action',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: 'View Brand',
                  checked: false
                },
                {
                  title: 'Create Brand',
                  checked: false
                },
                {
                  title: 'Edit Brand',
                  checked: false
                },
                {
                  title: 'Delete Brand',
                  checked: false
                }
              ]
            }
          ]
        },
        {
          title: 'Warranties',
          subTitle: 'View All Warranties',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Warranties',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: 'Warranty Name',
                  checked: false
                },
                {
                  title: 'Warranty Description',
                  checked: false
                },
                {
                  title: 'Warranty Duration',
                  checked: false
                },
                {
                  title: 'Warranty Action',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: 'View Warranty',
                  checked: false
                },
                {
                  title: 'Create Warranty',
                  checked: false
                },
                {
                  title: 'Edit Warranty',
                  checked: false
                },
                {
                  title: 'Delete Warranty',
                  checked: false
                }
              ]
            }
          ]
        }
      ]
    },
    Inventory: {
      title: 'Inventory Management',
      checked: false,
      permissions: [
        {
          title: 'Product Gallery',
          subTitle: 'View All Product Gallery',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Product Gallery',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: 'Product Gallery Name',
                  checked: false
                },
                {
                  title: 'Product Gallery Image',
                  checked: false
                },
                {
                  title: 'Product Gallery Price',
                  checked: false
                },
                {
                  title: 'Product Gallery Current Qty',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: []
            }
          ]
        },
        {
          title: 'Inventory Report',
          subTitle: 'View All Inventory Report',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Inventory Report',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: 'Inventory Report Name',
                  checked: false
                },
                {
                  title: 'Inventory Report Code',
                  checked: false
                },
                {
                  title: 'Inventory Report Image',
                  checked: false
                },
                {
                  title: 'Inventory Report Current Qty',
                  checked: false
                },
                {
                  title: 'Inventory Report Price',
                  checked: false
                },
                {
                  title: 'Inventory Report Total',
                  checked: false
                },
                {
                  title: 'Inventory Report Should Received',
                  checked: false
                },
                {
                  title: 'Inventory Report Should Delivered',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: []
            }
          ]
        }
      ]
    },
    Manufacturing: {
      title: 'Manufacturing Management',
      checked: false,
      permissions: [
        {
          title: 'Recipe',
          subTitle: 'View All Recipe',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Recipe',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: 'Recipe Name',
                  checked: false
                },
                {
                  title: 'Recipe Category',
                  checked: false
                },
                {
                  title: 'Recipe Sub Category',
                  checked: false
                },
                {
                  title: 'Recipe Quantity',
                  checked: false
                },
                {
                  title: 'Recipe Action',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: 'View Recipe',
                  checked: false
                },
                {
                  title: 'Create Recipe',
                  checked: false
                },
                {
                  title: 'Edit Recipe',
                  checked: false
                },
                {
                  title: 'Delete Recipe',
                  checked: false
                }
              ]
            }
          ]
        },
        {
          title: 'Production',
          subTitle: 'View All Production',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Production',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: 'Production Date',
                  checked: false
                },
                {
                  title: 'Production Reference No',
                  checked: false
                },
                {
                  title: 'Production Location',
                  checked: false
                },
                {
                  title: 'Production Product name',
                  checked: false
                },
                {
                  title: 'Production Quantity',
                  checked: false
                },
                {
                  title: 'Production Total Cost',
                  checked: false
                },
                {
                  title: 'Production Action',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: 'View Production',
                  checked: false
                },
                {
                  title: 'Create Production',
                  checked: false
                },
                {
                  title: 'Edit Production',
                  checked: false
                },
                {
                  title: 'Delete Production',
                  checked: false
                },
                {
                  title: 'Entry Production',
                  checked: false
                }
              ]
            }
          ]
        },
        {
          title: 'Manufacturing Report',
          subTitle: 'View All Manufacturing Report',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Manufacturing Report',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: 'Total Production',
                  checked: false
                },
                {
                  title: 'Total Production Cost',
                  checked: false
                },
                {
                  title: 'Total Sold',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: 'Manufacturing Report Inventory Report',
                  checked: false
                },
                {
                  title: 'Manufacturing Report Items Report',
                  checked: false
                }
              ]
            }
          ]
        }
      ]
    },
    Purchases: {
      title: 'Purchases Management',
      checked: false,
      permissions: [
        {
          title: 'List Purchases',
          subTitle: 'View All List Purchases',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'List Purchases',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: 'Purchase Date',
                  checked: false
                },
                {
                  title: 'Purchase Receipt Reference',
                  checked: false
                },
                {
                  title: 'Purchase Reference No',
                  checked: false
                },
                {
                  title: 'Purchase Location',
                  checked: false
                },
                {
                  title: 'Purchase Supplier Name',
                  checked: false
                },
                {
                  title: 'Purchase Status',
                  checked: false
                },
                {
                  title: 'Purchase Payment Status',
                  checked: false
                },
                {
                  title: 'Purchase Received Status',
                  checked: false
                },
                {
                  title: 'Purchase Store Name',
                  checked: false
                },
                {
                  title: 'Purchase Grand Total',
                  checked: false
                },
                {
                  title: 'Purchase Payment Due',
                  checked: false
                },
                {
                  title: 'Purchase Added By',
                  checked: false
                },
                {
                  title: 'Purchase Action',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: 'View Purchase',
                  checked: false
                },
                {
                  title: 'Create Purchase',
                  checked: false
                },
                {
                  title: 'Edit Purchase',
                  checked: false
                },
                {
                  title: 'Delete Purchase',
                  checked: false
                },
                {
                  title: 'Entry Purchase',
                  checked: false
                },
                {
                  title: 'Map Purchase',
                  checked: false
                },
                {
                  title: 'Add Payment Purchase',
                  checked: false
                },
                {
                  title: 'View Payment Purchase',
                  checked: false
                },
                {
                  title: 'Return Purchase',
                  checked: false
                },
                {
                  title: 'Update Status',
                  checked: false
                },
                {
                  title: 'Edit Payment Purchase',
                  checked: false
                },
                {
                  title: 'Delete Payment Purchase',
                  checked: false
                },
                {
                  title: 'Print Purchase',
                  checked: false
                },
                {
                  title: 'New Order Notification Purchase',
                  checked: false
                }
              ]
            }
          ]
        },
        {
          title: 'List Purchases Return',
          subTitle: 'View All List Purchases Return',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'List Purchases Return',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: 'Purchase Return Date',
                  checked: false
                },
                {
                  title: 'Purchase Return Reference No',
                  checked: false
                },
                {
                  title: 'Purchase Return Parent Purchase',
                  checked: false
                },
                {
                  title: 'Purchase Return Location',
                  checked: false
                },
                {
                  title: 'Purchase Return Status',
                  checked: false
                },
                {
                  title: 'Purchase Return Supplier Name',
                  checked: false
                },
                {
                  title: 'Purchase Return Payment Status',
                  checked: false
                },
                {
                  title: 'Purchase Return Received Status',
                  checked: false
                },
                {
                  title: 'Purchase Return Store Name',
                  checked: false
                },
                {
                  title: 'Purchase Return Added By',
                  checked: false
                },
                {
                  title: 'Purchase Return Action',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: 'View Purchases Return',
                  checked: false
                },
                {
                  title: 'Create Purchases Return',
                  checked: false
                },
                {
                  title: 'Edit Purchases Return',
                  checked: false
                },
                {
                  title: 'Delete Purchases Return',
                  checked: false
                },
                {
                  title: 'View Payment Purchase Return',
                  checked: false
                },
                {
                  title: 'Print Purchase Return',
                  checked: false
                },
                {
                  title: 'Entry Purchase Return',
                  checked: false
                },
                {
                  title: 'Edit Payment Purchase Return',
                  checked: false
                },
                {
                  title: 'Delete Payment Purchase Return',
                  checked: false
                },
                {
                  title: 'Add Payment Purchase Return',
                  checked: false
                }
              ]
            }
          ]
        },
        {
          title: 'Map',
          subTitle: 'View All Map',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Map',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: 'Map Date',
                  checked: false
                },
                {
                  title: 'Map Source Reference no',
                  checked: false
                },
                {
                  title: 'Map Action',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: 'View Map',
                  checked: false
                }
              ]
            }
          ]
        }
      ]
    },
    Sales: {
      title: 'Sales Management',
      checked: false,
      permissions: [
        {
          title: 'List Sales',
          subTitle: 'View All List Sales',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'List Sales',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: 'Sales Date',
                  checked: false
                },
                {
                  title: 'Sales Agent',
                  checked: false
                },
                {
                  title: 'Sales Cost Center',
                  checked: false
                },
                {
                  title: 'Sales Project Number',
                  checked: false
                },
                {
                  title: 'Sales Invoice Number',
                  checked: false
                },
                {
                  title: 'Sales Customer Name',
                  checked: false
                },
                {
                  title: 'Sales Customer Mobile Number',
                  checked: false
                },
                {
                  title: 'Sales Store Name',
                  checked: false
                },
                {
                  title: 'Sales Location',
                  checked: false
                },
                {
                  title: 'Sales Payment Status',
                  checked: false
                },
                {
                  title: 'Sales Payment Method',
                  checked: false
                },
                {
                  title: 'Sales Sales Delivery Status',
                  checked: false
                },
                {
                  title: 'Sales Total Amount',
                  checked: false
                },
                {
                  title: 'Sales Return Due',
                  checked: false
                },
                {
                  title: 'Sales Total Paid',
                  checked: false
                },
                {
                  title: 'Sales Due',
                  checked: false
                },
                {
                  title: 'Sales Shipping Status',
                  checked: false
                },
                {
                  title: 'Sales Total Items',
                  checked: false
                },
                {
                  title: 'Sales Type Of Service',
                  checked: false
                },
                {
                  title: 'Sales Custom Field 1',
                  checked: false
                },
                {
                  title: 'Sales Added By',
                  checked: false
                },
                {
                  title: 'Sales Note',
                  checked: false
                },
                {
                  title: 'Sales Shipping Details',
                  checked: false
                },
                {
                  title: 'Sales Action',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: 'View Sales',
                  checked: false
                },
                {
                  title: 'Create Sales',
                  checked: false
                },
                {
                  title: 'Edit Sales',
                  checked: false
                },
                {
                  title: 'Delete Sales',
                  checked: false
                },
                {
                  title: 'Entry Sales',
                  checked: false
                },
                {
                  title: 'Map Sales',
                  checked: false
                },
                {
                  title: 'Add Payment Sales',
                  checked: false
                },
                {
                  title: 'View Payment Sales',
                  checked: false
                },
                {
                  title: 'Return Sales',
                  checked: false
                },
                {
                  title: 'Duplicate Sales',
                  checked: false
                },
                {
                  title: 'Edit Payment Sales',
                  checked: false
                },
                {
                  title: 'Delete Payment Sales',
                  checked: false
                },
                {
                  title: 'Print Sales',
                  checked: false
                },
                {
                  title: 'Packing list Sales',
                  checked: false
                },
                {
                  title: 'Invoice Url Sales',
                  checked: false
                },
                {
                  title: 'View Delivered',
                  checked: false
                }
              ]
            }
          ]
        },
        {
          title: 'List Approved Quotation',
          subTitle: 'View All List Approved Quotation',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'List Approved Quotation',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: 'Approved Date',
                  checked: false
                },
                {
                  title: 'Approved Agent',
                  checked: false
                },
                {
                  title: 'Approved Cost Center',
                  checked: false
                },
                {
                  title: 'Approved Project Number',
                  checked: false
                },
                {
                  title: 'Approved Reference Number',
                  checked: false
                },
                {
                  title: 'Approved Approved Number',
                  checked: false
                },
                {
                  title: 'Approved Quotation NumberApproved Draft Number',
                  checked: false
                },
                {
                  title: 'Approved Customer Name',
                  checked: false
                },
                {
                  title: 'Approved Customer Mobile Number',
                  checked: false
                },
                {
                  title: 'Approved Store Name',
                  checked: false
                },
                {
                  title: 'Approved Payment Status',
                  checked: false
                },
                {
                  title: 'Approved Delivery Status',
                  checked: false
                },
                {
                  title: 'Approved Total Amount',
                  checked: false
                },
                {
                  title: 'Approved Added By',
                  checked: false
                },
                {
                  title: 'Approved Converted',
                  checked: false
                },
                {
                  title: 'Approved Converted Date',
                  checked: false
                },
                {
                  title: 'Approved Action',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: 'View Approved',
                  checked: false
                },
                {
                  title: 'Create Approved',
                  checked: false
                },
                {
                  title: 'Edit Approved',
                  checked: false
                },
                {
                  title: 'Delete Approved',
                  checked: false
                },
                {
                  title: 'Print Approved',
                  checked: false
                },
                {
                  title: 'Convert To Invoice',
                  checked: false
                }
              ]
            }
          ]
        },
        {
          title: 'List Quotation',
          subTitle: 'View All List Quotation',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'List Quotation',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: 'Quotation Date',
                  checked: false
                },
                {
                  title: 'Quotation Agent',
                  checked: false
                },
                {
                  title: 'Quotation Cost Center',
                  checked: false
                },
                {
                  title: 'Quotation Project Number',
                  checked: false
                },
                {
                  title: 'Quotation Reference Number',
                  checked: false
                },
                {
                  title: 'Quotation Customer Name',
                  checked: false
                },
                {
                  title: 'Quotation Customer Mobile',
                  checked: false
                },
                {
                  title: 'Quotation Location',
                  checked: false
                },
                {
                  title: 'Quotation Total Items',
                  checked: false
                },
                {
                  title: 'Quotation Store Name',
                  checked: false
                },
                {
                  title: 'Quotation Added By',
                  checked: false
                },
                {
                  title: 'Quotation Action',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: 'View Quotation',
                  checked: false
                },
                {
                  title: 'Create Quotation',
                  checked: false
                },
                {
                  title: 'Edit Quotation',
                  checked: false
                },
                {
                  title: 'Delete Quotation',
                  checked: false
                },
                {
                  title: 'Print Quotation',
                  checked: false
                },
                {
                  title: 'Quotation Url Quotation',
                  checked: false
                },
                {
                  title: 'New Quotation Notifications Quotation',
                  checked: false
                },
                {
                  title: 'Convert To Approved Quotation',
                  checked: false
                }
              ]
            }
          ]
        },
        {
          title: 'List Draft',
          subTitle: 'View All List Draft',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'List Draft',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: 'Draft Date',
                  checked: false
                },
                {
                  title: 'Draft Agent',
                  checked: false
                },
                {
                  title: 'Draft Project Number',
                  checked: false
                },
                {
                  title: 'Draft Reference Number',
                  checked: false
                },
                {
                  title: 'Draft Customer Name',
                  checked: false
                },
                {
                  title: 'Draft Customer Mobile',
                  checked: false
                },
                {
                  title: 'Draft Location',
                  checked: false
                },
                {
                  title: 'Draft Store Name',
                  checked: false
                },
                {
                  title: 'Draft Total Items',
                  checked: false
                },
                {
                  title: 'Draft Added By',
                  checked: false
                },
                {
                  title: 'Draft Action',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: 'View Draft',
                  checked: false
                },
                {
                  title: 'Create Draft',
                  checked: false
                },
                {
                  title: 'Edit Draft',
                  checked: false
                },
                {
                  title: 'Delete Draft',
                  checked: false
                },
                {
                  title: 'Print Draft',
                  checked: false
                },
                {
                  title: 'Convert To Quotation',
                  checked: false
                }
              ]
            }
          ]
        },
        {
          title: 'List Sale Return',
          subTitle: 'View All List Sale Return',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'List Sale Return',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: 'SalesReturn Date',
                  checked: false
                },
                {
                  title: 'SalesReturn Invoice Number',
                  checked: false
                },
                {
                  title: 'SalesReturn Parent Sale',
                  checked: false
                },
                {
                  title: 'SalesReturn Customer Name',
                  checked: false
                },
                {
                  title: 'SalesReturn Location',
                  checked: false
                },
                {
                  title: 'SalesReturn Invoice Status',
                  checked: false
                },
                {
                  title: 'SalesReturn Payment Status',
                  checked: false
                },
                {
                  title: 'SalesReturn Total Amount',
                  checked: false
                },
                {
                  title: 'SalesReturn Payment Due',
                  checked: false
                },
                {
                  title: 'SalesReturn Delivery Status',
                  checked: false
                },
                {
                  title: 'SalesReturn Added By',
                  checked: false
                },
                {
                  title: 'SalesReturn Store Name',
                  checked: false
                },
                {
                  title: 'SalesReturn Action',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: 'View Sale Return',
                  checked: false
                },
                {
                  title: 'Create Sale Return',
                  checked: false
                },
                {
                  title: 'Edit Sale Return',
                  checked: false
                },
                {
                  title: 'Delete Sale Return',
                  checked: false
                },
                {
                  title: 'Print Sale Return',
                  checked: false
                },
                {
                  title: 'Add Payment Sale Return',
                  checked: false
                },
                {
                  title: 'View Payment Sale Return',
                  checked: false
                },
                {
                  title: 'View Delivered Sale Return',
                  checked: false
                }
              ]
            }
          ]
        },
        {
          title: 'Sales Commission Agent',
          subTitle: 'View All Sales Commission Agent',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Sales Commission Agent',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: 'SCAgent Name',
                  checked: false
                },
                {
                  title: 'SCAgent Email',
                  checked: false
                },
                {
                  title: 'SCAgent Customer Number',
                  checked: false
                },
                {
                  title: 'SCAgent Address',
                  checked: false
                },
                {
                  title: 'SCAgent Sales Commission Percentage (%)',
                  checked: false
                },
                {
                  title: 'SCAgent Action',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: []
            }
          ]
        },
        {
          title: 'Import Sales',
          subTitle: 'View All Import Sales',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Import Sales',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: []
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: 'Download Import Sales',
                  checked: false
                },
                {
                  title: 'Submit Import Sales',
                  checked: false
                }
              ]
            }
          ]
        },
        {
          title: 'Quotation Terms',
          subTitle: 'View All Quotation Terms',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Quotation Terms',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: 'Quotation Terms Name',
                  checked: false
                },
                {
                  title: 'Quotation Terms Description',
                  checked: false
                },
                {
                  title: 'Quotation Terms Date',
                  checked: false
                },
                {
                  title: 'Quotation Terms Action',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: 'View Quotation Terms',
                  checked: false
                },
                {
                  title: 'Create Quotation Terms',
                  checked: false
                },
                {
                  title: 'Edit Quotation Terms',
                  checked: false
                },
                {
                  title: 'Delete Quotation Terms',
                  checked: false
                }
              ]
            }
          ]
        }
      ]
    },
    Vouchers: {
      title: 'Vouchers Management',
      checked: false,
      permissions: [
        {
          title: 'Vouchers List',
          subTitle: 'View All Vouchers List',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Vouchers List',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: 'Vouchers Reference Number',
                  checked: false
                },
                {
                  title: 'Vouchers Contact',
                  checked: false
                },
                {
                  title: 'Vouchers Amount',
                  checked: false
                },
                {
                  title: 'Vouchers Invoice Amount',
                  checked: false
                },
                {
                  title: 'Vouchers Account',
                  checked: false
                },
                {
                  title: 'Vouchers Type',
                  checked: false
                },
                {
                  title: 'Voucher Date',
                  checked: false
                },
                {
                  title: 'Vouchers Action',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: 'View Voucher',
                  checked: false
                },
                {
                  title: 'Create Voucher',
                  checked: false
                },
                {
                  title: 'Edit Voucher',
                  checked: false
                },
                {
                  title: 'Delete Voucher',
                  checked: false
                },
                {
                  title: 'Attachment Voucher',
                  checked: false
                },
                {
                  title: 'Entry Voucher',
                  checked: false
                },
                {
                  title: 'Print Voucher',
                  checked: false
                }
              ]
            }
          ]
        },
        {
          title: 'Receipt Voucher',
          subTitle: 'View All Receipt Voucher',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Receipt Voucher',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: []
            },
            {
              title: 'Actions',
              value: 2,
              section: []
            }
          ]
        },
        {
          title: 'Payment Voucher',
          subTitle: 'View All Payment Voucher',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Payment Voucher',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: []
            },
            {
              title: 'Actions',
              value: 2,
              section: []
            }
          ]
        },
        {
          title: 'Journal Voucher List',
          subTitle: 'View All Journal Voucher List',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Journal Voucher List',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: 'Journal Voucher Reference Number',
                  checked: false
                },
                {
                  title: 'Journal Voucher Amount',
                  checked: false
                },
                {
                  title: 'Journal Voucher Date',
                  checked: false
                },
                {
                  title: 'Journal Voucher Action',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: 'View Journal Voucher',
                  checked: false
                },
                {
                  title: 'Create Journal Voucher',
                  checked: false
                },
                {
                  title: 'Edit Journal Voucher',
                  checked: false
                },
                {
                  title: 'Delete Journal Voucher',
                  checked: false
                },
                {
                  title: 'Attachment Journal Voucher',
                  checked: false
                },
                {
                  title: 'Entry Journal Voucher',
                  checked: false
                },
                {
                  title: 'Print Journal Voucher',
                  checked: false
                }
              ]
            }
          ]
        },
        {
          title: 'Expense Voucher List',
          subTitle: 'View All Expense Voucher List',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Expense Voucher List',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: 'Expense Voucher Reference Number',
                  checked: false
                },
                {
                  title: 'Expense Voucher Amount',
                  checked: false
                },
                {
                  title: 'Expense Voucher Date',
                  checked: false
                },
                {
                  title: 'Expense Voucher Action',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: 'View Expense Voucher',
                  checked: false
                },
                {
                  title: 'Create Expense Voucher',
                  checked: false
                },
                {
                  title: 'Edit Expense Voucher',
                  checked: false
                },
                {
                  title: 'Delete Expense Voucher',
                  checked: false
                },
                {
                  title: 'Attachment Expense Voucher',
                  checked: false
                },
                {
                  title: 'Entry Expense Voucher',
                  checked: false
                },
                {
                  title: 'Print Expense Voucher',
                  checked: false
                }
              ]
            }
          ]
        }
      ]
    },
    Cheques: {
      title: 'Cheques Management',
      checked: false,
      permissions: [
        {
          title: 'Cheques List',
          subTitle: 'View All Cheques List',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Cheques List',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: 'Cheques Reference Number',
                  checked: false
                },
                {
                  title: 'Cheques Cheque Number',
                  checked: false
                },
                {
                  title: 'Cheques Contact',
                  checked: false
                },
                {
                  title: 'Cheques Amount',
                  checked: false
                },
                {
                  title: 'Cheques Payment For',
                  checked: false
                },
                {
                  title: 'Cheques Account',
                  checked: false
                },
                {
                  title: 'Cheques Collection Account',
                  checked: false
                },
                {
                  title: 'Cheques Status',
                  checked: false
                },
                {
                  title: 'Cheques Write Date',
                  checked: false
                },
                {
                  title: 'Cheques Due Date',
                  checked: false
                },
                {
                  title: 'Cheques Collection Date',
                  checked: false
                },
                {
                  title: 'Cheques Note',
                  checked: false
                },
                {
                  title: 'Cheques Action',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: 'View Cheques',
                  checked: false
                },
                {
                  title: 'Create Cheques',
                  checked: false
                },
                {
                  title: 'Edit Cheques',
                  checked: false
                },
                {
                  title: 'Delete Cheques',
                  checked: false
                },
                {
                  title: 'Collect Cheques',
                  checked: false
                },
                {
                  title: 'UnCollect Cheques',
                  checked: false
                },
                {
                  title: 'Refund Cheques',
                  checked: false
                },
                {
                  title: 'Delete Collect Cheques',
                  checked: false
                },
                {
                  title: 'Attachment Cheques',
                  checked: false
                },
                {
                  title: 'Entry Cheques',
                  checked: false
                },
                {
                  title: 'Print Cheques',
                  checked: false
                }
              ]
            }
          ]
        },
        {
          title: 'Add Cheque In',
          subTitle: 'View All Add Cheque In',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Add Cheque In',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: []
            },
            {
              title: 'Actions',
              value: 2,
              section: []
            }
          ]
        },
        {
          title: 'Add Cheque Out',
          subTitle: 'View All Add Cheque Out',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Add Cheque Out',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: []
            },
            {
              title: 'Actions',
              value: 2,
              section: []
            }
          ]
        },
        {
          title: 'Contact Bank',
          subTitle: 'View All Contact Bank',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Contact Bank',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: 'Contact Bank Name',
                  checked: false
                },
                {
                  title: 'Contact Bank Business Location',
                  checked: false
                },
                {
                  title: 'Contact Bank Action',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: 'View Contact Bank',
                  checked: false
                },
                {
                  title: 'Create Contact Bank',
                  checked: false
                },
                {
                  title: 'Edit Contact Bank',
                  checked: false
                },
                {
                  title: 'Delete Contact Bank',
                  checked: false
                }
              ]
            }
          ]
        }
      ]
    },
    Store: {
      title: 'Store Management',
      checked: false,
      permissions: [
        {
          title: 'Stores List',
          subTitle: 'View All Stores List',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Stores List',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: 'Store Name',
                  checked: false
                },
                {
                  title: 'Store Parent Store',
                  checked: false
                },
                {
                  title: 'Store Action',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: 'View Store',
                  checked: false
                },
                {
                  title: 'Create Store',
                  checked: false
                },
                {
                  title: 'Edit Store',
                  checked: false
                },
                {
                  title: 'Delete Store',
                  checked: false
                }
              ]
            }
          ]
        },
        {
          title: 'Stores Movement',
          subTitle: 'View All Stores Movement',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Stores Movement',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: 'Store Move Product Name',
                  checked: false
                },
                {
                  title: 'Store Move Location',
                  checked: false
                },
                {
                  title: 'Store Move Unit',
                  checked: false
                },
                {
                  title: 'Store Move Store Name',
                  checked: false
                },
                {
                  title: 'Store Move Movement',
                  checked: false
                },
                {
                  title: 'Store Move Plus',
                  checked: false
                },
                {
                  title: 'Store Move Minus',
                  checked: false
                },
                {
                  title: 'Store Move Current Amount',
                  checked: false
                },
                {
                  title: 'Store Move Date',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: []
            }
          ]
        },
        {
          title: 'Stores Transfers',
          subTitle: 'View All Stores Transfers',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Stores Transfers',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: 'Store Transfer Date',
                  checked: false
                },
                {
                  title: 'Store Transfer References Number',
                  checked: false
                },
                {
                  title: 'Store Transfer From Store Name',
                  checked: false
                },
                {
                  title: 'Store Transfer To Store Name',
                  checked: false
                },
                {
                  title: 'Store Transfer Status',
                  checked: false
                },
                {
                  title: 'Store Transfer Total Quantity',
                  checked: false
                },
                {
                  title: 'Store Transfer Additional Notes',
                  checked: false
                },
                {
                  title: 'Store Transfer Action',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: 'View Stores Transfers',
                  checked: false
                },
                {
                  title: 'Create Stores Transfers',
                  checked: false
                },
                {
                  title: 'Edit Stores Transfers',
                  checked: false
                },
                {
                  title: 'Print Stores Transfers',
                  checked: false
                },
                {
                  title: 'Delete Stores Transfers',
                  checked: false
                },
                {
                  title: 'Change Status Stores Transfers',
                  checked: false
                }
              ]
            }
          ]
        },
        {
          title: 'Received',
          subTitle: 'View All Received',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Received',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: []
            },
            {
              title: 'Actions',
              value: 2,
              section: []
            }
          ]
        },
        {
          title: 'Delivered',
          subTitle: 'View All Delivered',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Delivered',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: []
            },
            {
              title: 'Actions',
              value: 2,
              section: []
            }
          ]
        }
      ]
    },
    Cash_and_Bank: {
      title: 'Cash and Bank Management',
      checked: false,
      permissions: [
        {
          title: 'Cash List',
          subTitle: 'View All Cash List',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Cash List',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: 'Cash Account Number',
                  checked: false
                },
                {
                  title: 'Cash Account Name',
                  checked: false
                },
                {
                  title: 'Cash Debit',
                  checked: false
                },
                {
                  title: 'Cash Credit',
                  checked: false
                },
                {
                  title: 'Cash Status',
                  checked: false
                },
                {
                  title: 'Cash Balance',
                  checked: false
                },
                {
                  title: 'Cash Action',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: 'Ledger Cash',
                  checked: false
                },
                {
                  title: 'Create Cash',
                  checked: false
                },
                {
                  title: 'Edit Cash',
                  checked: false
                },
                {
                  title: 'Close Cash',
                  checked: false
                }
              ]
            }
          ]
        },
        {
          title: 'Bank List',
          subTitle: 'View All Bank List',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Bank List',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: 'Bank Account Number',
                  checked: false
                },
                {
                  title: 'Bank Account Name',
                  checked: false
                },
                {
                  title: 'Bank Debit',
                  checked: false
                },
                {
                  title: 'Bank Credit',
                  checked: false
                },
                {
                  title: 'Bank Status',
                  checked: false
                },
                {
                  title: 'Bank Balance',
                  checked: false
                },
                {
                  title: 'Bank Action',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: 'ledger Bank',
                  checked: false
                },
                {
                  title: 'Create Bank',
                  checked: false
                },
                {
                  title: 'Edit Bank',
                  checked: false
                },
                {
                  title: 'Close Bank',
                  checked: false
                }
              ]
            }
          ]
        }
      ]
    },
    Accounts: {
      title: 'Accounts Management',
      checked: false,
      permissions: [
        {
          title: 'List Accounts',
          subTitle: 'View All List Accounts',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'List Accounts',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: 'Account Number',
                  checked: false
                },
                {
                  title: 'Account Name',
                  checked: false
                },
                {
                  title: 'Account Main Account Name',
                  checked: false
                },
                {
                  title: 'Account Debit',
                  checked: false
                },
                {
                  title: 'Account Credit',
                  checked: false
                },
                {
                  title: 'Account Note',
                  checked: false
                },
                {
                  title: 'Account Balance',
                  checked: false
                },
                {
                  title: 'Account Action',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: 'ledger Account',
                  checked: false
                },
                {
                  title: 'Create Account',
                  checked: false
                },
                {
                  title: 'Edit Account',
                  checked: false
                },
                {
                  title: 'Close Account',
                  checked: false
                }
              ]
            }
          ]
        },
        {
          title: 'Balance Sheet',
          subTitle: 'View All Balance Sheet',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Balance Sheet',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: 'Balance Sheet Liability',
                  checked: false
                },
                {
                  title: 'Balance Sheet Assets',
                  checked: false
                },
                {
                  title: 'Balance Sheet Loss Amount',
                  checked: false
                },
                {
                  title: 'Balance Sheet Profit Amount',
                  checked: false
                },
                {
                  title: 'Balance Sheet Closing Stock',
                  checked: false
                },
                {
                  title: 'Balance Sheet Total Liability',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: 'Print Balance Sheet',
                  checked: false
                }
              ]
            }
          ]
        },
        {
          title: 'Trial Balance',
          subTitle: 'View All Trial Balance',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Trial Balance',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: 'Trial Balance Main Account',
                  checked: false
                },
                {
                  title: 'Trial Balance Account Type Name',
                  checked: false
                },
                {
                  title: 'Trial Balance Account Name',
                  checked: false
                },
                {
                  title: 'Trial Balance Credit',
                  checked: false
                },
                {
                  title: 'Trial Balance Debit',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: 'Print Trial Balance',
                  checked: false
                }
              ]
            }
          ]
        },
        {
          title: 'Cash Flow',
          subTitle: 'View All Cash Flow',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Cash Flow',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: 'Cash Flow Date',
                  checked: false
                },
                {
                  title: 'Cash Flow Account Name',
                  checked: false
                },
                {
                  title: 'Cash Flow Description',
                  checked: false
                },
                {
                  title: 'Cash Flow Credit',
                  checked: false
                },
                {
                  title: 'Cash Flow Debit',
                  checked: false
                },
                {
                  title: 'Cash Flow Balance',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: []
            }
          ]
        },
        {
          title: 'List Entries',
          subTitle: 'View All List Entries',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'List Entries',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: 'Entries Date',
                  checked: false
                },
                {
                  title: 'Entries Reference Number',
                  checked: false
                },
                {
                  title: 'Entries Source Number',
                  checked: false
                },
                {
                  title: 'Entries State',
                  checked: false
                },
                {
                  title: 'Entries Action',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: 'Entry Entries',
                  checked: false
                }
              ]
            }
          ]
        },
        {
          title: 'Cost Center',
          subTitle: 'View All Cost Center',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Cost Center',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: 'Cost Center Number',
                  checked: false
                },
                {
                  title: 'Cost Center Name',
                  checked: false
                },
                {
                  title: 'Cost Center Action',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: 'Movement Cost Center',
                  checked: false
                },
                {
                  title: 'Create Cost Center',
                  checked: false
                },
                {
                  title: 'Delete Cost Center',
                  checked: false
                },
                {
                  title: 'Edit Cost Center',
                  checked: false
                }
              ]
            }
          ]
        }
      ]
    },
    Reports: {
      title: 'Reports Management',
      checked: false,
      permissions: [
        {
          title: 'Profit & Loss Report',
          subTitle: 'View All Profit & Loss Report',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Profit & Loss Report',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: 'Profit/Loss Top Table',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: []
            }
          ]
        },
        {
          title: 'Profit & Loss Report By Product',
          subTitle: 'View All Profit & Loss Report By Product',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Profit & Loss Report By Product',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: 'Profit/Loss By Product Product Name',
                  checked: false
                },
                {
                  title: 'Profit/Loss By Product Gross Profit',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: []
            }
          ]
        },
        {
          title: 'Profit & Loss Report By Categories',
          subTitle: 'View All Profit & Loss Report By Categories',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Profit & Loss Report By Categories',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: 'Profit/Loss By Categories Category Name',
                  checked: false
                },
                {
                  title: 'Profit/Loss By Categories Gross Profit',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: []
            }
          ]
        },
        {
          title: 'Profit & Loss Report By Brands',
          subTitle: 'View All Profit & Loss Report By Brands',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Profit & Loss Report By Brands',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: 'Profit/Loss By Brands Brand Name',
                  checked: false
                },
                {
                  title: 'Profit/Loss By Brands Gross Profit',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: []
            }
          ]
        },
        {
          title: 'Profit & Loss Report By Locations',
          subTitle: 'View All Profit & Loss Report By Locations',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Profit & Loss Report By Locations',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: 'Profit/Loss By Locations Location Name',
                  checked: false
                },
                {
                  title: 'Profit/Loss By Locations Gross Profit',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: []
            }
          ]
        },
        {
          title: 'Profit & Loss Report By Invoice',
          subTitle: 'View All Profit & Loss Report By Invoice',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Profit & Loss Report By Invoice',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: 'Profit/Loss By Invoice Invoice NUmber',
                  checked: false
                },
                {
                  title: 'Profit/Loss By Invoice Gross Profit',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: []
            }
          ]
        },
        {
          title: 'Profit & Loss Report By Date',
          subTitle: 'View All Profit & Loss Report By Date',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Profit & Loss Report By Date',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: 'Profit/Loss By Date Date',
                  checked: false
                },
                {
                  title: 'Profit/Loss By Date Gross Profit',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: []
            }
          ]
        },
        {
          title: 'Profit & Loss Report By Customer',
          subTitle: 'View All Profit & Loss Report By Customer',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Profit & Loss Report By Customer',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: 'Profit/Loss By Customer Customer Name',
                  checked: false
                },
                {
                  title: 'Profit/Loss By Customer Gross Profit',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: []
            }
          ]
        },
        {
          title: 'Profit & Loss Report By Day',
          subTitle: 'View All Profit & Loss Report By Day',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Profit & Loss Report By Day',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: 'Profit/Loss By Day Day Name',
                  checked: false
                },
                {
                  title: 'Profit/Loss By Day Gross Profit',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: []
            }
          ]
        },
        {
          title: 'Product Purchase Report',
          subTitle: 'View All Product Purchase Report',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Product Purchase Report',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: []
            }
          ]
        },
        {
          title: 'Sales Representative Report',
          subTitle: 'View All Sales Representative Report',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Sales Representative Report',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: []
            },
            {
              title: 'Actions',
              value: 2,
              section: []
            }
          ]
        },
        {
          title: 'Register Report',
          subTitle: 'View All Register Report',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Register Report',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: 'Register Report Open Time',
                  checked: false
                },
                {
                  title: 'Register Report Close Time',
                  checked: false
                },
                {
                  title: 'Register Report Location',
                  checked: false
                },
                {
                  title: 'Register Report User',
                  checked: false
                },
                {
                  title: 'Register Report Total Card Slips',
                  checked: false
                },
                {
                  title: 'Register Report Total Cheques',
                  checked: false
                },
                {
                  title: 'Register Report Total Cash',
                  checked: false
                },
                {
                  title: 'Register Report Actions',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: []
            }
          ]
        },
        {
          title: 'Expense Report',
          subTitle: 'View All Expense Report',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Expense Report',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: 'Expense Report Expense Category',
                  checked: false
                },
                {
                  title: 'Expense Report Total Expense',
                  checked: false
                },
                {
                  title: 'Expense Report Footer Total',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: []
            }
          ]
        },
        {
          title: 'Report Setting',
          subTitle: 'View All Report Setting',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Report Setting',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: []
            },
            {
              title: 'Actions',
              value: 2,
              section: []
            }
          ]
        },
        {
          title: 'Sale Payment Report',
          subTitle: 'View All Sale Payment Report',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Sale Payment Report',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: 'Sale Payment Report Reference Number',
                  checked: false
                },
                {
                  title: 'Sale Payment Report Paid On',
                  checked: false
                },
                {
                  title: 'Sale Payment Report Amount',
                  checked: false
                },
                {
                  title: 'Sale Payment Report Customer Name',
                  checked: false
                },
                {
                  title: 'Sale Payment Report Customer Group',
                  checked: false
                },
                {
                  title: 'Sale Payment Report Payment Method',
                  checked: false
                },
                {
                  title: 'Sale Payment Report Sales Number',
                  checked: false
                },
                {
                  title: 'Sale Payment Report Action',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: 'View Sale Payment Report',
                  checked: false
                }
              ]
            }
          ]
        },
        {
          title: 'Purchase Payment Report',
          subTitle: 'View All Purchase Payment Report',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Purchase Payment Report',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: 'Purchase Payment Report Reference Number',
                  checked: false
                },
                {
                  title: 'Purchase Payment Report Paid On',
                  checked: false
                },
                {
                  title: 'Purchase Payment Report Amount',
                  checked: false
                },
                {
                  title: 'Purchase Payment Report Supplier Name',
                  checked: false
                },
                {
                  title: 'Purchase Payment Report Payment Method',
                  checked: false
                },
                {
                  title: 'Purchase Payment Report Purchase Number',
                  checked: false
                },
                {
                  title: 'Purchase Payment Report Action',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: 'View Purchase Payment Report',
                  checked: false
                }
              ]
            }
          ]
        },
        {
          title: 'Product Sale Report Detailed',
          subTitle: 'View All Product Sale Report Detailed',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Product Sale Report Detailed',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: 'Product Sale Report Detailed Returned',
                  checked: false
                },
                {
                  title: 'Product Sale Report Detailed Product Name',
                  checked: false
                },
                {
                  title: 'Product Sale Report Detailed Item Code',
                  checked: false
                },
                {
                  title: 'Product Sale Report Detailed Customer Name',
                  checked: false
                },
                {
                  title: 'Product Sale Report Detailed Contact Id',
                  checked: false
                },
                {
                  title: 'Product Sale Report Detailed Invoice Number',
                  checked: false
                },
                {
                  title: 'Product Sale Report Detailed Date',
                  checked: false
                },
                {
                  title: 'Product Sale Report Detailed Quantity',
                  checked: false
                },
                {
                  title: 'Product Sale Report Detailed Unit Price',
                  checked: false
                },
                {
                  title: 'Product Sale Report Detailed Discount',
                  checked: false
                },
                {
                  title: 'Product Sale Report Detailed Tax',
                  checked: false
                },
                {
                  title: 'Product Sale Report Detailed Price inc.tax',
                  checked: false
                },
                {
                  title: 'Product Sale Report Detailed Total',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: []
            }
          ]
        },
        {
          title: 'Product Sale Report DWPurchase',
          subTitle: 'View All Product Sale Report DWPurchase',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Product Sale Report DWPurchase',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: 'Product Sale Report DWPurchase Product Name',
                  checked: false
                },
                {
                  title: 'Product Sale Report DWPurchase Item Code',
                  checked: false
                },
                {
                  title: 'Product Sale Report DWPurchase Customer Name',
                  checked: false
                },
                {
                  title: 'Product Sale Report DWPurchase Invoice Number',
                  checked: false
                },
                {
                  title: 'Product Sale Report DWPurchase Date',
                  checked: false
                },
                {
                  title: 'Product Sale Report DWPurchase Purchase Reference Number',
                  checked: false
                },
                {
                  title: 'Product Sale Report DWPurchase Supplier Name',
                  checked: false
                },
                {
                  title: 'Product Sale Report DWPurchase Quantity',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: []
            }
          ]
        },
        {
          title: 'Product Sale Report Grouped',
          subTitle: 'View All Product Sale Report Grouped',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Product Sale Report Grouped',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: 'Product Sale Report Grouped Product Name',
                  checked: false
                },
                {
                  title: 'Product Sale Report Grouped Item Code',
                  checked: false
                },
                {
                  title: 'Product Sale Report Grouped Date',
                  checked: false
                },
                {
                  title: 'Product Sale Report Grouped Current Stock',
                  checked: false
                },
                {
                  title: 'Product Sale Report Grouped Total Unit Sold',
                  checked: false
                },
                {
                  title: 'Product Sale Report Grouped Total',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: []
            }
          ]
        },
        {
          title: 'Items Report',
          subTitle: 'View All Items Report',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Items Report',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: 'Items Report Product Name',
                  checked: false
                },
                {
                  title: 'Items Report Item Code',
                  checked: false
                },
                {
                  title: 'Items Report Purchase Date',
                  checked: false
                },
                {
                  title: 'Items Report Purchase Number',
                  checked: false
                },
                {
                  title: 'Items Report Supplier Name',
                  checked: false
                },
                {
                  title: 'Items Report Purchase Price',
                  checked: false
                },
                {
                  title: 'Items Report Sale Date',
                  checked: false
                },
                {
                  title: 'Items Report Sale Number',
                  checked: false
                },
                {
                  title: 'Items Report Customer Name',
                  checked: false
                },
                {
                  title: 'Items Report Location',
                  checked: false
                },
                {
                  title: 'Items Report Quantity',
                  checked: false
                },
                {
                  title: 'Items Report Sale Price',
                  checked: false
                },
                {
                  title: 'Items Report SubTotal',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: []
            }
          ]
        },
        {
          title: 'Stock Expire Report',
          subTitle: 'View All Stock Expire Report',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Stock Expire Report',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: 'Stock Expire Report Product Name',
                  checked: false
                },
                {
                  title: 'Stock Expire Report Item Code',
                  checked: false
                },
                {
                  title: 'Stock Expire Report Location',
                  checked: false
                },
                {
                  title: 'Stock Expire Report Stock Left',
                  checked: false
                },
                {
                  title: 'Stock Expire Report Lot Number',
                  checked: false
                },
                {
                  title: 'Stock Expire Report Exp Date',
                  checked: false
                },
                {
                  title: 'Stock Expire Report MFG date',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: []
            }
          ]
        },
        {
          title: 'Product Sale Day',
          subTitle: 'View All Product Sale Day',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Product Sale Day',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: []
            },
            {
              title: 'Actions',
              value: 2,
              section: []
            }
          ]
        },
        {
          title: 'Trending Product',
          subTitle: 'View All Trending Product',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Trending Product',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: []
            },
            {
              title: 'Actions',
              value: 2,
              section: []
            }
          ]
        },
        {
          title: 'Stock Adjustment Report',
          subTitle: 'View All Stock Adjustment Report',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Stock Adjustment Report',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: 'Stock Adjustment Report Date',
                  checked: false
                },
                {
                  title: 'Stock Adjustment Report Reference Number',
                  checked: false
                },
                {
                  title: 'Stock Adjustment Report Location',
                  checked: false
                },
                {
                  title: 'Stock Adjustment Report Adjustment Type',
                  checked: false
                },
                {
                  title: 'Stock Adjustment Report Total Quantity',
                  checked: false
                },
                {
                  title: 'Stock Adjustment Report Total Amount Recovered',
                  checked: false
                },
                {
                  title: 'Stock Adjustment Report Reason',
                  checked: false
                },
                {
                  title: 'Stock Adjustment Report Added By',
                  checked: false
                },
                {
                  title: 'Stock Adjustment Report Action',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: []
            }
          ]
        },
        {
          title: 'Inventory Reports',
          subTitle: 'View All Inventory Reports',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Inventory Reports',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: 'Inventory Report Closing Stock By Purchase',
                  checked: false
                },
                {
                  title: 'Inventory Report Closing Stock By Sale',
                  checked: false
                },
                {
                  title: 'Inventory Report Potential Profit',
                  checked: false
                },
                {
                  title: 'Inventory Report Profit Margin %',
                  checked: false
                },
                {
                  title: 'Inventory Report Item Code',
                  checked: false
                },
                {
                  title: 'Inventory Report Product Name',
                  checked: false
                },
                {
                  title: 'Inventory Report Location',
                  checked: false
                },
                {
                  title: 'Inventory Report Unit Price',
                  checked: false
                },
                {
                  title: 'Inventory Report Current Stock',
                  checked: false
                },
                {
                  title: 'Inventory Report Should Receive',
                  checked: false
                },
                {
                  title: 'Inventory Report Should Deliver',
                  checked: false
                },
                {
                  title: 'Inventory Report Reserved Quantity',
                  checked: false
                },
                {
                  title: 'Inventory Report Current Stock Individual Price Purchase',
                  checked: false
                },
                {
                  title: 'Inventory Report Current Stock Price Purchase',
                  checked: false
                },
                {
                  title: 'Inventory Report Purchase Price In Local Currency',
                  checked: false
                },
                {
                  title: 'Inventory Report Current Stock Individual Price Sale',
                  checked: false
                },
                {
                  title: 'Inventory Report Current Stock Price Sale',
                  checked: false
                },
                {
                  title: 'Inventory Report Sale Price In Local Currency',
                  checked: false
                },
                {
                  title: 'Inventory Report Potential individual Profit',
                  checked: false
                },
                {
                  title: 'Inventory Report Total Unit Sold',
                  checked: false
                },
                {
                  title: 'Inventory Report Total Unit Transferred',
                  checked: false
                },
                {
                  title: 'Inventory Report Total Unit Adjusted',
                  checked: false
                },
                {
                  title: 'Inventory Report Current Stock Manufacturing',
                  checked: false
                },
                {
                  title: 'Inventory Report Action',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: []
            }
          ]
        },
        {
          title: 'Customer Group Report',
          subTitle: 'View All Customer Group Report',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Customer Group Report',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: 'Customer Group Report Customer Group Name',
                  checked: false
                },
                {
                  title: 'Customer Group Report Total Sale',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: []
            }
          ]
        },
        {
          title: 'Supplier & Customer Report',
          subTitle: 'View All Supplier & Customer Report',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Supplier & Customer Report',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: 'Supplier & Customer Report Contact Name',
                  checked: false
                },
                {
                  title: 'Supplier & Customer Report Total Purchase',
                  checked: false
                },
                {
                  title: 'Supplier & Customer Report Total Purchase Return',
                  checked: false
                },
                {
                  title: 'Supplier & Customer Report Total Sale',
                  checked: false
                },
                {
                  title: 'Supplier & Customer Report Total Sale Return',
                  checked: false
                },
                {
                  title: 'Supplier & Customer Report Opening Balance Due',
                  checked: false
                },
                {
                  title: 'Supplier & Customer Report Due',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: []
            }
          ]
        },
        {
          title: 'Tax Report Input Tax',
          subTitle: 'View All Tax Report Input Tax',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Tax Report Input Tax',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: 'Tax Report InpTax Date',
                  checked: false
                },
                {
                  title: 'Tax Report InpTax Reference Number',
                  checked: false
                },
                {
                  title: 'Tax Report InpTax Supplier Name',
                  checked: false
                },
                {
                  title: 'Tax Report InpTax Tax Number',
                  checked: false
                },
                {
                  title: 'Tax Report InpTax Tax Amount',
                  checked: false
                },
                {
                  title: 'Tax Report InpTax Discount',
                  checked: false
                },
                {
                  title: 'Tax Report InpTax By Table',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: []
            }
          ]
        },
        {
          title: 'Tax Report OutPut Tax',
          subTitle: 'View All Tax Report OutPut Tax',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Tax Report OutPut Tax',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: 'Tax Report OupTax Date',
                  checked: false
                },
                {
                  title: 'Tax Report OupTax Invoice Number',
                  checked: false
                },
                {
                  title: 'Tax Report OupTax Customer Name',
                  checked: false
                },
                {
                  title: 'Tax Report OupTax Tax Number',
                  checked: false
                },
                {
                  title: 'Tax Report OupTax Total Amount',
                  checked: false
                },
                {
                  title: 'Tax Report OupTax Discount',
                  checked: false
                },
                {
                  title: 'Tax Report OupTax By Table',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: []
            }
          ]
        },
        {
          title: 'Tax Report Expense Tax',
          subTitle: 'View All Tax Report Expense Tax',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Tax Report Expense Tax',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: 'Tax Report ExpTax Date',
                  checked: false
                },
                {
                  title: 'Tax Report ExpTax Reference Number',
                  checked: false
                },
                {
                  title: 'Tax Report ExpTax Tax Number',
                  checked: false
                },
                {
                  title: 'Tax Report ExpTax Total Amount',
                  checked: false
                },
                {
                  title: 'Tax Report ExpTax By Table',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: []
            }
          ]
        },
        {
          title: 'Tax Report OutPut Tax (Project Invoice)',
          subTitle: 'View All Tax Report OutPut Tax (Project Invoice)',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Tax Report OutPut Tax (Project Invoice)',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: 'Tax Report OupTax (Project Invoice) Date',
                  checked: false
                },
                {
                  title: 'Tax Report OupTax (Project Invoice) Invoice Number',
                  checked: false
                },
                {
                  title: 'Tax Report OupTax (Project Invoice) Customer Name',
                  checked: false
                },
                {
                  title: 'Tax Report OupTax (Project Invoice) Tax Number',
                  checked: false
                },
                {
                  title: 'Tax Report OupTax (Project Invoice) Total Amount',
                  checked: false
                },
                {
                  title: 'Tax Report OupTax (Project Invoice) Discount',
                  checked: false
                },
                {
                  title: 'Tax Report OupTax (Project Invoice) By Table',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: []
            }
          ]
        },
        {
          title: 'Purchase & Sale Report',
          subTitle: 'View All Purchase & Sale Report',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Purchase & Sale Report',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: []
            },
            {
              title: 'Actions',
              value: 2,
              section: []
            }
          ]
        },
        {
          title: 'Activity Log',
          subTitle: 'View All Activity Log',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Activity Log',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: 'Activity Date',
                  checked: false
                },
                {
                  title: 'Activity Subject Type',
                  checked: false
                },
                {
                  title: 'Activity Action',
                  checked: false
                },
                {
                  title: 'Activity By',
                  checked: false
                },
                {
                  title: 'Activity Note',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: []
            }
          ]
        }
      ]
    },
    Patterns: {
      title: 'Patterns Management',
      checked: false,
      permissions: [
        {
          title: 'Business Location',
          subTitle: 'View All Business Location',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Business Location',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: 'Business Location Name',
                  checked: false
                },
                {
                  title: 'Business Location Location Id',
                  checked: false
                },
                {
                  title: 'Business Location Landmark',
                  checked: false
                },
                {
                  title: 'Business Location City',
                  checked: false
                },
                {
                  title: 'Business Location Zip Code',
                  checked: false
                },
                {
                  title: 'Business Location State',
                  checked: false
                },
                {
                  title: 'Business Location Country',
                  checked: false
                },
                {
                  title: 'Business Location Price Group',
                  checked: false
                },
                {
                  title: 'Business Location Invoice Schema',
                  checked: false
                },
                {
                  title: 'Business Location Invoice Layout For Pos',
                  checked: false
                },
                {
                  title: 'Business Location Invoice Layout For Sale',
                  checked: false
                },
                {
                  title: 'Business Location Action',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: 'View Business Location',
                  checked: false
                },
                {
                  title: 'Settings Business Location',
                  checked: false
                },
                {
                  title: 'Create Business Location',
                  checked: false
                },
                {
                  title: 'Edit Business Location',
                  checked: false
                },
                {
                  title: 'Deactivate Business Location',
                  checked: false
                }
              ]
            }
          ]
        },
        {
          title: 'Define Pattern',
          subTitle: 'View All Define Pattern',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Define Pattern',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: 'Pattern Name',
                  checked: false
                },
                {
                  title: 'Pattern Location',
                  checked: false
                },
                {
                  title: 'Pattern Invoice Schema',
                  checked: false
                },
                {
                  title: 'Pattern Invoice Layout',
                  checked: false
                },
                {
                  title: 'Pattern POS Relations',
                  checked: false
                },
                {
                  title: 'Pattern Date',
                  checked: false
                },
                {
                  title: 'Pattern Added By',
                  checked: false
                },
                {
                  title: 'Pattern Action',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: 'View Pattern',
                  checked: false
                },
                {
                  title: 'Create Pattern',
                  checked: false
                },
                {
                  title: 'Edit Pattern',
                  checked: false
                },
                {
                  title: 'Delete Pattern',
                  checked: false
                }
              ]
            }
          ]
        },
        {
          title: 'System Account',
          subTitle: 'View All System Account',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'System Account',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: 'System Account Pattern Name',
                  checked: false
                },
                {
                  title: 'System Account Location',
                  checked: false
                },
                {
                  title: 'System Account Date',
                  checked: false
                },
                {
                  title: 'System Account Added By',
                  checked: false
                },
                {
                  title: 'System Account Action',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: 'View System Account',
                  checked: false
                },
                {
                  title: 'Create System Account',
                  checked: false
                },
                {
                  title: 'Edit System Account',
                  checked: false
                },
                {
                  title: 'Delete System Account',
                  checked: false
                }
              ]
            }
          ]
        }
      ]
    },
    Settings: {
      title: 'Settings Management',
      checked: false,
      permissions: [
        {
          title: 'Business Setting',
          subTitle: 'View All Business Setting',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Business Setting',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: []
            },
            {
              title: 'Actions',
              value: 2,
              section: []
            }
          ]
        },
        {
          title: 'Invoice Settings',
          subTitle: 'View All Invoice Settings',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Invoice Settings',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: []
            },
            {
              title: 'Actions',
              value: 2,
              section: []
            }
          ]
        },
        {
          title: 'Barcode Settings',
          subTitle: 'View All Barcode Settings',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Barcode Settings',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: []
            },
            {
              title: 'Actions',
              value: 2,
              section: []
            }
          ]
        },
        {
          title: 'Product Price',
          subTitle: 'View All Product Price',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Product Price',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: []
            },
            {
              title: 'Actions',
              value: 2,
              section: []
            }
          ]
        },
        {
          title: 'Receipt Printer',
          subTitle: 'View All Receipt Printer',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Receipt Printer',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: []
            },
            {
              title: 'Actions',
              value: 2,
              section: []
            }
          ]
        },
        {
          title: 'Tax Rates',
          subTitle: 'View All Tax Rates',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Tax Rates',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: []
            },
            {
              title: 'Actions',
              value: 2,
              section: []
            }
          ]
        },
        {
          title: 'Types Of Services',
          subTitle: 'View All Types Of Services',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Types Of Services',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: []
            },
            {
              title: 'Actions',
              value: 2,
              section: []
            }
          ]
        },
        {
          title: 'Delete Service',
          subTitle: 'View All Delete Service',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Delete Service',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: []
            },
            {
              title: 'Actions',
              value: 2,
              section: []
            }
          ]
        },
        {
          title: 'Package Subscription',
          subTitle: 'View All Package Subscription',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Package Subscription',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: []
            },
            {
              title: 'Actions',
              value: 2,
              section: []
            }
          ]
        }
      ]
    },
    Log_File: {
      title: 'Log File Management',
      checked: false,
      permissions: [
        {
          title: 'Products log',
          subTitle: 'View All Products log',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Products log',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            }
          ]
        },
        {
          title: 'Sales log',
          subTitle: 'View All Sales log',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Sales log',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            }
          ]
        },
        {
          title: 'Purchases log',
          subTitle: 'View All Purchases log',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Purchases log',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            }
          ]
        },
        {
          title: 'Payments log',
          subTitle: 'View All Payments log',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Payments log',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            }
          ]
        },
        {
          title: 'Users log',
          subTitle: 'View All Users log',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Users log',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            }
          ]
        },
        {
          title: 'Vouchers log',
          subTitle: 'View All Vouchers log',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Vouchers log',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            }
          ]
        },
        {
          title: 'Cheques log',
          subTitle: 'View All Cheques log',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Cheques log',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            }
          ]
        },
        {
          title: 'Stores log',
          subTitle: 'View All Stores log',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Stores log',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            }
          ]
        },
        {
          title: 'Contacts log',
          subTitle: 'View All Contacts log',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Contacts log',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: []
            },
            {
              title: 'Actions',
              value: 2,
              section: []
            }
          ]
        },
        {
          title: 'Accounts log',
          subTitle: 'View All Accounts log',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Accounts log',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: []
            },
            {
              title: 'Actions',
              value: 2,
              section: []
            }
          ]
        },
        {
          title: 'Recipes log',
          subTitle: 'View All Recipes log',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Recipes log',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: []
            },
            {
              title: 'Actions',
              value: 2,
              section: []
            }
          ]
        },
        {
          title: 'Production log',
          subTitle: 'View All Production log',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Production log',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: []
            },
            {
              title: 'Actions',
              value: 2,
              section: []
            }
          ]
        }
      ]
    },
    Assets: {
      title: 'Assets Management',
      checked: false,
      permissions: [
        {
          title: 'List Assets',
          subTitle: 'View All List Assets',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'List Assets',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: 'Asset Code',
                  checked: false
                },
                {
                  title: 'Asset Location',
                  checked: false
                },
                {
                  title: 'Asset Quantity',
                  checked: false
                },
                {
                  title: 'Asset Description',
                  checked: false
                },
                {
                  title: 'Asset Create Date',
                  checked: false
                },
                {
                  title: 'Asset Type',
                  checked: false
                },
                {
                  title: 'Asset Depreciation/Increase Ratio',
                  checked: false
                },
                {
                  title: 'Asset Price',
                  checked: false
                },
                {
                  title: 'Asset Edit Date',
                  checked: false
                },
                {
                  title: 'Asset Price Second',
                  checked: false
                },
                {
                  title: 'Asset Status',
                  checked: false
                },
                {
                  title: 'Asset Note',
                  checked: false
                },
                {
                  title: 'Asset Actions',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: 'Create Asset',
                  checked: false
                },
                {
                  title: 'Edit Asset',
                  checked: false
                },
                {
                  title: 'View Asset',
                  checked: false
                },
                {
                  title: 'Delete Asset',
                  checked: false
                }
              ]
            }
          ]
        }
      ]
    },
    Partners: {
      title: 'Partners Management',
      checked: false,
      permissions: [
        {
          title: 'List Partners',
          subTitle: 'View All List Partners',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'List Partners',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: 'Partner Name',
                  checked: false
                },
                {
                  title: 'Partner Address',
                  checked: false
                },
                {
                  title: 'Partner Mobile',
                  checked: false
                },
                {
                  title: 'Partner The value of paid-up capital',
                  checked: false
                },
                {
                  title: 'Partner Number of Shares',
                  checked: false
                },
                {
                  title: 'Partner Debit',
                  checked: false
                },
                {
                  title: 'Partner Credit',
                  checked: false
                },
                {
                  title: 'Partner Actions',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: 'Create Partner',
                  checked: false
                },
                {
                  title: 'Edit Partner',
                  checked: false
                },
                {
                  title: 'View Partner',
                  checked: false
                },
                {
                  title: 'Delete Partner',
                  checked: false
                }
              ]
            }
          ]
        },
        {
          title: 'Partner Payment history',
          subTitle: 'View All Partner Payment history',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Partner Payment history',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: 'Partner Payment history Name',
                  checked: false
                },
                {
                  title: 'Partner Payment history Amount',
                  checked: false
                },
                {
                  title: 'Partner Payment history Date',
                  checked: false
                },
                {
                  title: 'Partner Payment history Type Of Process',
                  checked: false
                },
                {
                  title: 'Partner Payment history By',
                  checked: false
                },
                {
                  title: 'Partner Payment history Note',
                  checked: false
                },
                {
                  title: 'Partner Payment history Actions',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: 'Create Partner Payment history',
                  checked: false
                },
                {
                  title: 'Edit Partner Payment history',
                  checked: false
                },
                {
                  title: 'View Partner Payment history',
                  checked: false
                },
                {
                  title: 'Delete Partner Payment history',
                  checked: false
                }
              ]
            }
          ]
        },
        {
          title: 'Final Accounts',
          subTitle: 'View All Final Accounts',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Final Accounts',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: 'Final Accounts Profit Amount',
                  checked: false
                },
                {
                  title: 'Final Accounts Period From',
                  checked: false
                },
                {
                  title: 'Final Accounts Period To',
                  checked: false
                },
                {
                  title: 'Final Accounts Number Of Shares',
                  checked: false
                },
                {
                  title: 'Final Accounts Share Amount',
                  checked: false
                },
                {
                  title: 'Final Accounts Note',
                  checked: false
                },
                {
                  title: 'Final Accounts Actions',
                  checked: false
                },
                {
                  title: 'Final Accounts Name',
                  checked: false
                },
                {
                  title: 'Final Accounts Address',
                  checked: false
                },
                {
                  title: 'Final Accounts Mobile',
                  checked: false
                },
                {
                  title: 'Final Accounts Debit',
                  checked: false
                },
                {
                  title: 'Final Accounts Credit',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: 'Create Final Accounts',
                  checked: false
                },
                {
                  title: 'Edit Final Accounts',
                  checked: false
                },
                {
                  title: 'View Final Accounts',
                  checked: false
                },
                {
                  title: 'Delete Final Accounts',
                  checked: false
                },
                {
                  title: 'Final Accounts Distribute',
                  checked: false
                }
              ]
            }
          ]
        },
        {
          title: 'Financial Estimation',
          subTitle: 'View All Financial Estimation',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Financial Estimation',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: 'Financial Estimation Ending inventory (purchase price)',
                  checked: false
                },
                {
                  title: 'Financial Estimation Ending inventory (at selling price)',
                  checked: false
                },
                {
                  title: 'Financial Estimation Potential profit',
                  checked: false
                },
                {
                  title: 'Financial Estimation Profit Margin %',
                  checked: false
                },
                {
                  title: 'Financial Estimation Storage and bank balance',
                  checked: false
                },
                {
                  title: 'Financial Estimation Customer receivables',
                  checked: false
                },
                {
                  title: "Financial Estimation Suppliers' receivables",
                  checked: false
                },
                {
                  title: 'Financial Estimation Total at purchase price',
                  checked: false
                },
                {
                  title: 'Financial Estimation Total selling price',
                  checked: false
                },
                {
                  title: 'Financial Estimation Number Of Shares',
                  checked: false
                },
                {
                  title: 'Financial Estimation Share price at purchase price',
                  checked: false
                },
                {
                  title: 'Financial Estimation Share price at selling price',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: []
            }
          ]
        }
      ]
    },
    Maintenance_Services: {
      title: 'Maintenance Services Management',
      checked: false,
      permissions: [
        {
          title: 'List Services',
          subTitle: 'View All List Services',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'List Services',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            }
          ]
        },
        {
          title: 'Work List',
          subTitle: 'View All Work List',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Work List',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            }
          ]
        },
        {
          title: 'Add a Receipt Number',
          subTitle: 'View All Add a Receipt Number',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Add a Receipt Number',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            }
          ]
        },
        {
          title: 'Service Warranty',
          subTitle: 'View All Service Warranty',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Service Warranty',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            }
          ]
        },
        {
          title: 'Payment List',
          subTitle: 'View All Payment List',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Payment List',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            }
          ]
        },
        {
          title: 'Add Service Invoice',
          subTitle: 'View All Add Service Invoice',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Add Service Invoice',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            }
          ]
        },
        {
          title: 'Service Brand',
          subTitle: 'View All Service Brand',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Service Brand',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            }
          ]
        },
        {
          title: 'Service Settings',
          subTitle: 'View All Service Settings',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Service Settings',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            }
          ]
        }
      ]
    },
    Installment: {
      title: 'Installment Management',
      checked: false,
      permissions: [
        {
          title: 'Installment Systems',
          subTitle: 'View All Installment Systems',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Installment Systems',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            }
          ]
        },
        {
          title: 'List Invoices',
          subTitle: 'View All List Invoices',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'List Invoices',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            }
          ]
        },
        {
          title: 'Customer Premiums',
          subTitle: 'View All Customer Premiums',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Customer Premiums',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            }
          ]
        },
        {
          title: 'Installment Report',
          subTitle: 'View All Installment Report',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Installment Report',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            }
          ]
        },
        {
          title: 'Installment Customers',
          subTitle: 'View All Installment Customers',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Installment Customers',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            }
          ]
        }
      ]
    },
    Restaurants: {
      title: 'Restaurants Management',
      checked: false,
      permissions: [
        {
          title: 'Orders Kitchen',
          subTitle: 'View All Orders Kitchen',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Orders Kitchen',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            }
          ]
        },
        {
          title: 'Orders',
          subTitle: 'View All Orders',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Orders',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            }
          ]
        },
        {
          title: 'Bookings',
          subTitle: 'View All Bookings',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Bookings',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            }
          ]
        },
        {
          title: 'Table Report',
          subTitle: 'View All Table Report',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Table Report',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            }
          ]
        },
        {
          title: 'Service Personnel Report',
          subTitle: 'View All Service Personnel Report',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Service Personnel Report',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            }
          ]
        },
        {
          title: 'Tables',
          subTitle: 'View All Tables',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Tables',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            }
          ]
        },
        {
          title: 'Additions',
          subTitle: 'View All Additions',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Additions',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            }
          ]
        },
        {
          title: 'Sections',
          subTitle: 'View All Sections',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Sections',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            }
          ]
        },
        {
          title: 'Kitchen Sections',
          subTitle: 'View All Kitchen Sections',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Kitchen Sections',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            }
          ]
        }
      ]
    },
    Store_Inventory: {
      title: 'Store Inventory Management',
      checked: false,
      permissions: [
        {
          title: 'List Store Inventories',
          subTitle: 'View All List Store Inventories',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'List Store Inventories',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            }
          ]
        }
      ]
    },
    Damaged_Inventory: {
      title: 'Damaged Inventory Management',
      checked: false,
      permissions: [
        {
          title: 'List Damaged Inventories',
          subTitle: 'View All List Damaged Inventories',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'List Damaged Inventories',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            }
          ]
        }
      ]
    },
    Notifications: {
      title: 'Notifications Management',
      checked: false,
      permissions: [
        {
          title: 'Notice Forms',
          subTitle: 'View All Notice Forms',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Notice Forms',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            }
          ]
        }
      ]
    },
    Projects: {
      title: 'Projects Management',
      checked: false,
      permissions: [
        {
          title: 'Projects',
          subTitle: 'View All Projects',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Projects',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            }
          ]
        },
        {
          title: 'My Tasks',
          subTitle: 'View All My Tasks',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'My Tasks',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            }
          ]
        },
        {
          title: 'Projects Reports',
          subTitle: 'View All Projects Reports',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Projects Reports',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            }
          ]
        },
        {
          title: 'Project Categories',
          subTitle: 'View All Project Categories',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Project Categories',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            }
          ]
        }
      ]
    },
    HRM: {
      title: 'HRM Management',
      checked: false,
      permissions: [
        {
          title: 'HRM',
          subTitle: 'View All HRM',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'HRM',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            }
          ]
        },
        {
          title: 'The Kind Of Holiday',
          subTitle: 'View All The Kind Of Holiday',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'The Kind Of Holiday',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            }
          ]
        },
        {
          title: 'Leave',
          subTitle: 'View All Leave',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Leave',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            }
          ]
        },
        {
          title: 'The Audience',
          subTitle: 'View All The Audience',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'The Audience',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            }
          ]
        },
        {
          title: 'Deduction Allowance',
          subTitle: 'View All Deduction Allowance',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Deduction Allowance',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            }
          ]
        },
        {
          title: 'Payroll',
          subTitle: 'View All Payroll',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Payroll',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            }
          ]
        },
        {
          title: 'Holiday',
          subTitle: 'View All Holiday',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Holiday',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            }
          ]
        },
        {
          title: 'HR Department',
          subTitle: 'View All HR Department',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'HR Department',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            }
          ]
        },
        {
          title: 'HR Designation',
          subTitle: 'View All HR Designation',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'HR Designation',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            }
          ]
        },
        {
          title: 'HR Settings',
          subTitle: 'View All HR Settings',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'HR Settings',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            }
          ]
        }
      ]
    },
    Essentials: {
      title: 'Essentials Management',
      checked: false,
      permissions: [
        {
          title: 'Essentials',
          subTitle: 'View All Essentials',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Essentials',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            }
          ]
        },
        {
          title: 'TO DO',
          subTitle: 'View All TO DO',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'TO DO',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            }
          ]
        },
        {
          title: 'Document',
          subTitle: 'View All Document',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Document',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            }
          ]
        },
        {
          title: 'Memos',
          subTitle: 'View All Memos',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Memos',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            }
          ]
        },
        {
          title: 'Reminders',
          subTitle: 'View All Reminders',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Reminders',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            }
          ]
        },
        {
          title: 'Messages',
          subTitle: 'View All Messages',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Messages',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            }
          ]
        },
        {
          title: 'Essentials Settings',
          subTitle: 'View All Essentials Settings',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Essentials Settings',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            }
          ]
        }
      ]
    },
    Catalogue_QR: {
      title: 'Catalogue QR Management',
      checked: false,
      permissions: [
        {
          title: 'Catalogue QR',
          subTitle: 'View All Catalogue QR',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Catalogue QR',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            }
          ]
        }
      ]
    },
    User_Activation: {
      title: 'User Activation Management',
      checked: false,
      permissions: [
        {
          title: 'List Of Users',
          subTitle: 'View All List Of Users',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'List Of Users',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            }
          ]
        },
        {
          title: 'List Of User Requests',
          subTitle: 'View All List Of User Requests',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'List Of User Requests',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            }
          ]
        }
      ]
    },
    React_Frontend_Section: {
      title: 'React Frontend Section Management',
      checked: false,
      permissions: [
        {
          title: 'List React',
          subTitle: 'View All List React',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'List React',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            }
          ]
        }
      ]
    },
    Mobile_Section: {
      title: 'Mobile Section Management',
      checked: false,
      permissions: [
        {
          title: 'List Mobile',
          subTitle: 'View All List Mobile',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'List Mobile',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            }
          ]
        }
      ]
    },
    CRM: {
      title: 'CRM Management',
      checked: false,
      permissions: [
        {
          title: 'CRM',
          subTitle: 'View All CRM',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'CRM',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            }
          ]
        },
        {
          title: 'Leads',
          subTitle: 'View All Leads',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Leads',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            }
          ]
        },
        {
          title: 'Follow ups',
          subTitle: 'View All Follow ups',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Follow ups',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            }
          ]
        },
        {
          title: 'Campaigns',
          subTitle: 'View All Campaigns',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Campaigns',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            }
          ]
        },
        {
          title: 'Contact Login',
          subTitle: 'View All Contact Login',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Contact Login',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            }
          ]
        },
        {
          title: 'Sources',
          subTitle: 'View All Sources',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Sources',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            }
          ]
        },
        {
          title: 'Life Stage',
          subTitle: 'View All Life Stage',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Life Stage',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            }
          ]
        },
        {
          title: 'Reports',
          subTitle: 'View All Reports',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Reports',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: []
            },
            {
              title: 'Actions',
              value: 2,
              section: []
            }
          ]
        }
      ]
    },
    Ecommerce: {
      title: 'E-commerce Management',
      checked: false,
      permissions: [
        {
          title: 'Websites',
          subTitle: 'View All Websites',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Websites',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            }
          ]
        },
        {
          title: 'List Of Invoices',
          subTitle: 'View All List Of Invoices',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'List Of Invoices',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            }
          ]
        },
        {
          title: 'List Of Carts',
          subTitle: 'View All List Of Carts',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'List Of Carts',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            }
          ]
        },
        {
          title: 'Websites Settings',
          subTitle: 'View All Websites Settings',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Websites Settings',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            }
          ]
        },
        {
          title: 'Websites Main Settings',
          subTitle: 'View All Websites Main Settings',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Websites Main Settings',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            }
          ]
        },
        {
          title: 'Accounts Settings',
          subTitle: 'View All Accounts Settings',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Accounts Settings',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            }
          ]
        },
        {
          title: 'Floating Bar Settings',
          subTitle: 'View All Floating Bar Settings',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Floating Bar Settings',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            }
          ]
        },
        {
          title: 'Shop By Category Settings',
          subTitle: 'View All Shop By Category Settings',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Shop By Category Settings',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            }
          ]
        },
        {
          title: 'Sections Settings',
          subTitle: 'View All Sections Settings',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Sections Settings',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            }
          ]
        },
        {
          title: 'Contacts Us Settings',
          subTitle: 'View All Contacts Us Settings',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Contacts Us Settings',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            }
          ]
        },
        {
          title: 'Stripe Settings',
          subTitle: 'View All Stripe Settings',
          taps: [
            {
              title: 'Side Bar',
              value: 0,
              section: [
                {
                  title: 'Stripe Settings',
                  checked: false
                }
              ]
            },
            {
              title: 'Table',
              value: 1,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            },
            {
              title: 'Actions',
              value: 2,
              section: [
                {
                  title: '',
                  checked: false
                }
              ]
            }
          ]
        }
      ]
    },
    Access_Sales_Price_Group: {
      title: 'Access Sales Price Group Management',
      checked: false,
      permissions: [
        {
          title: 'access_default_selling_price',
          checked: true
        },
        {
          title: 'retail price',
          checked: false
        },
        {
          title: 'whole price',
          checked: false
        },
        {
          title: 'Mahmoud Ali Group',
          checked: false
        },
        {
          title: 'Loufy',
          checked: false
        },
        {
          title: 'Whole Price 2',
          checked: false
        },
        {
          title: 'AGT22',
          checked: false
        }
      ]
    }
  })
  const [stepsApi, setStepsApi] = useState([])
  const [initApi, setInitApi] = useState([])

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
  const handleReset = () => {
    setActiveStep(0)
  }

  const handleSubmitForm = values => {
    console.log('values of Roles', values)
  }

  // axios in useEffect fetch data
  useEffect(() => {
    const token = getCookie('token')
    const url = getCookie('apiUrl')
    const fetchData = async () => {
      try {
        const response = await axios.get(`${url}/app/react/role/create`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setStepsApi(response.data.response.steps)
        setInitApi(response.data.response.initial)
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [])

  console.log('stepsApi', stepsApi)
  console.log('initApi', initApi)

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

  if (stepsApi !== undefined && stepsApi.length !== 0 && initApi !== null && initApi !== undefined) {
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
              <Grid item xs={12} sx={{ mt: 4 }}>
                <FormControl fullWidth>
                  <h2>hi</h2>
                </FormControl>
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
                  </Box>
                  <Divider />

                  <FieldArray name={`dashboard.permissions`}>
                    {() => (
                      <>
                        <Grid container spacing={4}>
                          {values.dashboard.permissions.map((permission, childIndex) => (
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
              <CustomRoleSection data={values.Users} name={'Users'} handleChange={handleChange} />
            </Fragment>
          )
        case 4:
          return (
            <Fragment key={activeStep}>
              <CustomRoleSection data={values.Roles} name={'Roles'} handleChange={handleChange} />
            </Fragment>
          )
        case 5:
          return (
            <Fragment key={activeStep}>
              <CustomRoleSection data={values.Contacts} name={'Contacts'} handleChange={handleChange} />
            </Fragment>
          )

        // case 2:
        //   return (
        //     <Fragment key={activeStep}>
        //       <Grid container spacing={2} justifyContent='center'>
        //         <Grid
        //           item
        //           xs={12}
        //           sx={{
        //             m: 3,
        //             justifyContent: 'center',
        //             alignContent: 'center',
        //             pl: 0,
        //             border: theme => `1px solid ${theme.palette.divider}`,
        //             borderRadius: theme => `${theme.spacing(2)} !important`
        //           }}
        //         >
        //           <Box
        //             sx={{
        //               display: 'flex',
        //               alignItems: 'center',
        //               justifyContent: 'space-between',
        //               pl: 0
        //             }}
        //           >
        //             <Typography
        //               sx={{
        //                 fontWeight: 600,
        //                 pl: 0,
        //                 whiteSpace: 'nowrap',
        //                 textAlign: 'center',
        //                 color: `${theme.palette.text.primary} !important`
        //               }}
        //             >
        //               Select All
        //             </Typography>
        //             <FormControlLabel
        //               sx={{ fontSize: '8px !important' }}
        //               control={
        //                 <Field
        //                   type='checkbox'
        //                   label='Select All'
        //                   checkedIcon={<IndeterminateCheckBoxIcon fontSize='medium' />}
        //                   as={Checkbox}
        //                   name={`users.checked`}
        //                   //handle the select all checkbox in its own Permission

        //                   onChange={e => {
        //                     handleChange(e)
        //                     // add logic to handle the select all checkbox
        //                     const { checked } = e.target
        //                     const permissions = values.users.permissions

        //                     handleSelectAllCheckbox('users', checked, permissions, setFieldValue)
        //                   }}
        //                 />
        //               }
        //             />
        //           </Box>
        //           <Divider />

        //           <FieldArray name={`users.permissions`}>
        //             {() => (
        //               <>
        //                 <Grid container spacing={4}>
        //                   {values.users.permissions.map((permission, childIndex) => (
        //                     <Grid item xs={12} md={4} lg={4} sm={12} key={childIndex}>
        //                       <CustomCheckBox
        //                         permission={permission}
        //                         handleChange={handleChange}
        //                         values={values}
        //                         setFieldValue={setFieldValue}
        //                         name={`users.permissions.${childIndex}.checked`}
        //                         nameOfSection='users'
        //                         nameOfPermission='permissions'
        //                       />
        //                     </Grid>
        //                   ))}
        //                 </Grid>
        //               </>
        //             )}
        //           </FieldArray>
        //         </Grid>
        //       </Grid>
        //     </Fragment>
        //   )
        // case 3:
        //   return (
        //     <Fragment key={activeStep}>
        //       <Grid container spacing={2} justifyContent='center'>
        //         <Grid
        //           item
        //           xs={12}
        //           sx={{
        //             m: 3,
        //             justifyContent: 'center',
        //             alignContent: 'center',
        //             pl: 0,
        //             border: theme => `1px solid ${theme.palette.divider}`,
        //             borderRadius: theme => `${theme.spacing(2)} !important`
        //           }}
        //         >
        //           <Box
        //             sx={{
        //               display: 'flex',
        //               alignItems: 'center',
        //               justifyContent: 'space-between',
        //               pl: 0
        //             }}
        //           >
        //             <Typography
        //               sx={{
        //                 fontWeight: 600,
        //                 pl: 0,
        //                 whiteSpace: 'nowrap',
        //                 textAlign: 'center',
        //                 color: `${theme.palette.text.primary} !important`
        //               }}
        //             >
        //               Select All
        //             </Typography>
        //             <FormControlLabel
        //               sx={{ fontSize: '8px !important' }}
        //               control={
        //                 <Field
        //                   type='checkbox'
        //                   label='Select All'
        //                   checkedIcon={<IndeterminateCheckBoxIcon fontSize='medium' />}
        //                   as={Checkbox}
        //                   name={`roles.checked`}
        //                   //handle the select all checkbox in its own Permission

        //                   onChange={e => {
        //                     handleChange(e)
        //                     // add logic to handle the select all checkbox
        //                     const { checked } = e.target
        //                     const permissions = values.roles.permissions

        //                     handleSelectAllCheckbox('roles', checked, permissions, setFieldValue)
        //                   }}
        //                 />
        //               }
        //             />
        //           </Box>
        //           <Divider />

        //           <FieldArray name={`roles.permissions`}>
        //             {() => (
        //               <>
        //                 <Grid container spacing={4}>
        //                   {values.roles.permissions.map((permission, childIndex) => (
        //                     <Grid item xs={12} md={4} lg={4} sm={12} key={childIndex}>
        //                       <CustomCheckBox
        //                         permission={permission}
        //                         handleChange={handleChange}
        //                         values={values}
        //                         setFieldValue={setFieldValue}
        //                         name={`roles.permissions.${childIndex}.checked`}
        //                         nameOfSection='roles'
        //                         nameOfPermission='permissions'
        //                       />
        //                     </Grid>
        //                   ))}
        //                 </Grid>
        //               </>
        //             )}
        //           </FieldArray>
        //         </Grid>
        //       </Grid>
        //     </Fragment>
        //   )
        case 6:
          return (
            <Fragment key={activeStep}>
              <CustomRoleSection data={values.Products} name={'products'} handleChange={handleChange} />
            </Fragment>
          )
        case 7:
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
                          <Grid item xs={12} md={4} lg={4} sm={12} key={actionIndex}>
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
                          <Grid item xs={12} md={4} lg={4} sm={12} key={tableIndex}>
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
    const renderContent = () => {
      if (activeStep === stepsApi.length) {
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
                <Grid container spacing={5} sx={{ px: 2 }}>
                  <Grid item xs={12}>
                    <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                      {stepsApi[activeStep]?.title || steps[activeStep].title}
                    </Typography>
                    <Typography variant='caption' component='p'>
                      {stepsApi[activeStep]?.subtitle || steps[activeStep].subtitle}
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
                      gap: 6,
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
                      // center it in middle of grid
                      sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: 30,
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

                      <Button
                        size={'medium'}
                        variant='contained'
                        color='primary'
                        onClick={() => handleSubmitForm(values)}
                      >
                        {isEdit ? 'Update' : 'Create'}
                      </Button>

                      <Button size={'medium'} variant='contained' color='primary' onClick={handleNext}>
                        Next
                      </Button>
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
              {stepsApi.map((step, index) => {
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
            mb: '100px',
            overFlowY: 'hidden'
          }}
        >
          {renderContent()}
        </CardContent>
      </Card>
    )
  } else {
    // Loading component

    return (
      <Grid
        container
        spacing={1}
        justifyContent={'center'}
        alignContent={'center'}
        alignItems={'center'}
        align='center'
        sx={{ height: '100vh', margin: 'auto' }}
      >
        <Grid
          item
          xs={6}
          sx={{
            margin: 'auto',
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
            display: 'flex'
          }}
        >
          <CircularProgress />
        </Grid>
      </Grid>
    )
  }
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
