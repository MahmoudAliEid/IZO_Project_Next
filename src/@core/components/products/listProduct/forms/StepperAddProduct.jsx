// ** React Imports
import { Fragment, useState, useEffect } from 'react'
// import { EditorState } from 'draft-js'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Stepper from '@mui/material/Stepper'
import { styled } from '@mui/material/styles'
import StepLabel from '@mui/material/StepLabel'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import MuiStep from '@mui/material/Step'
import { Formik } from 'formik'
import * as Yup from 'yup'
import ProductPrices from '../productprices/ProductPrices'
import { useDispatch, useSelector } from 'react-redux'
import { saveProduct } from 'src/store/apps/products/productStoreSlice'
import { postUpdateProduct } from 'src/store/apps/products/postUpdateProductSlice'
import { fetchProducts } from 'src/store/apps/products/listProducts/getProductsSlice'

// import { fetchCreateProduct } from 'src/store/apps/products/listProducts/getCreateProductSlice'

// ** Third Party Imports
import toast from 'react-hot-toast'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'
import StepperCustomDot from './StepperCustomDot'
import ProductInfo from '../productInfo/ProductInfo'
import ProductMedia from '../productmedia'
import LoadingAnimation from 'src/@core/components/utilities/loadingComp'

// ** Util Import
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'

// ** Styled Component
import StepperWrapper from 'src/@core/styles/mui/stepper'
import { getCookie } from 'cookies-next'

import ProductAdditionalInfo from '../productAdditionalInfo/ProductAdditionalInfo'

const steps = [
  {
    icon: 'fluent-mdl2:product-variant',
    title: 'Product Information',
    subtitle: 'Manage Product Information'
  },
  {
    icon: 'ic:baseline-perm-media',
    title: 'Product Media',
    subtitle: 'Provide Product Media'
  },
  {
    icon: 'bx:info-circle',
    title: 'Product Additional Info',
    subtitle: 'Provide Additional Information'
  },
  {
    icon: 'tdesign:money',
    title: 'Product Prices',
    subtitle: 'Manage Product Prices'
  }
]

const Step = styled(MuiStep)(({ theme }) => ({
  paddingLeft: theme.spacing(4),
  paddingRight: theme.spacing(4),
  '&:first-of-type': {
    paddingLeft: 0
  },
  '&:last-of-type': {
    paddingRight: 0
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

const StepperHeaderContainer = styled(CardContent)(({ theme }) => ({
  borderRight: `1px solid ${theme.palette.divider}`,
  gridColumn: 'span 3',

  [theme.breakpoints.down('md')]: {
    borderRight: 0,
    borderBottom: `1px solid ${theme.palette.divider}`
  }
}))

const StepperAddProduct = ({ isEdit, itemId }) => {
  // select names
  const names = useSelector(state => state.getCreateProduct.data?.value?.product_price)

  // ** Initial Data Names
  const testNames = [
    { id: 1, value: 'Default Price' },
    { id: 2, value: 'Whole Sale Price' },
    { id: 3, value: 'Retail Price' },
    { id: 4, value: 'Minium Price' },
    { id: 5, value: 'Last Price' },
    { id: 6, value: 'ECM Before Price' },
    { id: 7, value: 'ECM After Price' },
    { id: 8, value: 'Custom Price One' },
    { id: 9, value: 'Custom Price Two' },
    { id: 10, value: 'Custom Price Three' }
  ]

  // const contentDataState = ContentState.createFromBlockArray(convertFromHTML(initialLD))
  // const editorDataState = EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(initialLD)))

  //** States */
  const [token, setToken] = useState('')
  const [url, setUrl] = useState('')
  const [tableNames, setTableNames] = useState(names || testNames)
  const [activeStep, setActiveStep] = useState(0)
  const [unitId, setUnitId] = useState('')
  const [openLoading, setOpenLoading] = useState(false)
  const [updatingProductData, setUpdatingProductData] = useState(null)
  const [initialValues, setInitialValues] = useState({
    name: '',
    code: '',
    code2: '',
    barcode_type: '',
    unit_id: '',
    sub_unit_id: [],
    brand_id: '',
    category_id: '',
    sub_category_id: '',
    enable_stock: 0,
    alert_quantity: null,
    warranty_id: '',
    show_more_price: false,
    long_description: '',
    short_description: '',
    location: [],
    productImage: [],
    productmultipleimages: [],
    productbrochure: [],
    productvideo: [],
    expiry_period_type: 'no Applicable',
    not_for_sale: false,
    expiry_period: '',
    weight: '',
    custom_field_1: '',
    custom_field_2: '',
    custom_field_3: '',
    custom_field_4: '',
    product_type: 'single',
    positionDetailsValue: [],
    tax: 0,
    tax_id: '',
    tableData: [
      {
        id: 1,
        value: `${tableNames[0].value}`,
        single_dpp: 0,
        single_dpp_in_tax: 0,
        profit_percent: 0,
        single_dsp: 0,
        single_dsp_inc_tax: 0
      },
      {
        id: 2,
        value: `${tableNames[1].value}`,
        single_dpp: 0,
        single_dpp_in_tax: 0,
        profit_percent: 0,
        single_dsp: 0,
        single_dsp_inc_tax: 0
      },
      {
        id: 3,
        value: `${tableNames[2].value}`,
        single_dpp: 0,
        single_dpp_in_tax: 0,
        profit_percent: 0,
        single_dsp: 0,
        single_dsp_inc_tax: 0
      },
      {
        id: 4,
        value: `${tableNames[3].value}`,
        single_dpp: 0,
        single_dpp_in_tax: 0,
        profit_percent: 0,
        single_dsp: 0,
        single_dsp_inc_tax: 0
      },
      {
        id: 5,
        value: `${tableNames[4].value}`,
        single_dpp: 0,
        single_dpp_in_tax: 0,
        profit_percent: 0,
        single_dsp: 0,
        single_dsp_inc_tax: 0
      },
      {
        id: 6,
        value: `${tableNames[5].value}`,
        single_dpp: 0,
        single_dpp_in_tax: 0,
        profit_percent: 0,
        single_dsp: 0,
        single_dsp_inc_tax: 0
      },
      {
        id: 7,
        value: `${tableNames[6].value}`,
        single_dpp: 0,
        single_dpp_in_tax: 0,
        profit_percent: 0,
        single_dsp: 0,
        single_dsp_inc_tax: 0
      },
      {
        id: 8,
        value: `${tableNames[7].value}`,
        single_dpp: 0,
        single_dpp_in_tax: 0,
        profit_percent: 0,
        single_dsp: 0,
        single_dsp_inc_tax: 0
      },
      {
        id: 9,
        value: `${tableNames[8].value}`,
        single_dpp: 0,
        single_dpp_in_tax: 0,
        profit_percent: 0,
        single_dsp: 0,
        single_dsp_inc_tax: 0
      },
      {
        id: 10,
        value: `${tableNames[9].value}`,
        single_dpp: 0,
        single_dpp_in_tax: 0,
        profit_percent: 0,
        single_dsp: 0,
        single_dsp_inc_tax: 0
      }
    ],
    tableDataChildOne: [
      {
        id: 1,
        value: `${tableNames[0].value}`,
        single_dpp: 0,
        single_dpp_in_tax: 0,
        profit_percent: 0,
        single_dsp: 0,
        single_dsp_inc_tax: 0
      },
      {
        id: 2,
        value: `${tableNames[1].value}`,
        single_dpp: 0,
        single_dpp_in_tax: 0,
        profit_percent: 0,
        single_dsp: 0,
        single_dsp_inc_tax: 0
      },
      {
        id: 3,
        value: `${tableNames[2].value}`,
        single_dpp: 0,
        single_dpp_in_tax: 0,
        profit_percent: 0,
        single_dsp: 0,
        single_dsp_inc_tax: 0
      },
      {
        id: 4,
        value: `${tableNames[3].value}`,
        single_dpp: 0,
        single_dpp_in_tax: 0,
        profit_percent: 0,
        single_dsp: 0,
        single_dsp_inc_tax: 0
      },
      {
        id: 5,
        value: `${tableNames[4].value}`,
        single_dpp: 0,
        single_dpp_in_tax: 0,
        profit_percent: 0,
        single_dsp: 0,
        single_dsp_inc_tax: 0
      },
      {
        id: 6,
        value: `${tableNames[5].value}`,
        single_dpp: 0,
        single_dpp_in_tax: 0,
        profit_percent: 0,
        single_dsp: 0,
        single_dsp_inc_tax: 0
      },
      {
        id: 7,
        value: `${tableNames[6].value}`,
        single_dpp: 0,
        single_dpp_in_tax: 0,
        profit_percent: 0,
        single_dsp: 0,
        single_dsp_inc_tax: 0
      },
      {
        id: 8,
        value: `${tableNames[7].value}`,
        single_dpp: 0,
        single_dpp_in_tax: 0,
        profit_percent: 0,
        single_dsp: 0,
        single_dsp_inc_tax: 0
      },
      {
        id: 9,
        value: `${tableNames[8].value}`,
        single_dpp: 0,
        single_dpp_in_tax: 0,
        profit_percent: 0,
        single_dsp: 0,
        single_dsp_inc_tax: 0
      },
      {
        id: 10,
        value: `${tableNames[9].value}`,
        single_dpp: 0,
        single_dpp_in_tax: 0,
        profit_percent: 0,
        single_dsp: 0,
        single_dsp_inc_tax: 0
      }
    ],
    tableDataChildTwo: [
      {
        id: 1,
        value: `${tableNames[0].value}`,
        single_dpp: 0,
        single_dpp_in_tax: 0,
        profit_percent: 0,
        single_dsp: 0,
        single_dsp_inc_tax: 0
      },
      {
        id: 2,
        value: `${tableNames[1].value}`,
        single_dpp: 0,
        single_dpp_in_tax: 0,
        profit_percent: 0,
        single_dsp: 0,
        single_dsp_inc_tax: 0
      },
      {
        id: 3,
        value: `${tableNames[2].value}`,
        single_dpp: 0,
        single_dpp_in_tax: 0,
        profit_percent: 0,
        single_dsp: 0,
        single_dsp_inc_tax: 0
      },
      {
        id: 4,
        value: `${tableNames[3].value}`,
        single_dpp: 0,
        single_dpp_in_tax: 0,
        profit_percent: 0,
        single_dsp: 0,
        single_dsp_inc_tax: 0
      },
      {
        id: 5,
        value: `${tableNames[4].value}`,
        single_dpp: 0,
        single_dpp_in_tax: 0,
        profit_percent: 0,
        single_dsp: 0,
        single_dsp_inc_tax: 0
      },
      {
        id: 6,
        value: `${tableNames[5].value}`,
        single_dpp: 0,
        single_dpp_in_tax: 0,
        profit_percent: 0,
        single_dsp: 0,
        single_dsp_inc_tax: 0
      },
      {
        id: 7,
        value: `${tableNames[6].value}`,
        single_dpp: 0,
        single_dpp_in_tax: 0,
        profit_percent: 0,
        single_dsp: 0,
        single_dsp_inc_tax: 0
      },
      {
        id: 8,
        value: `${tableNames[7].value}`,
        single_dpp: 0,
        single_dpp_in_tax: 0,
        profit_percent: 0,
        single_dsp: 0,
        single_dsp_inc_tax: 0
      },
      {
        id: 9,
        value: `${tableNames[8].value}`,
        single_dpp: 0,
        single_dpp_in_tax: 0,
        profit_percent: 0,
        single_dsp: 0,
        single_dsp_inc_tax: 0
      },
      {
        id: 10,
        value: `${tableNames[9].value}`,
        single_dpp: 0,
        single_dpp_in_tax: 0,
        profit_percent: 0,
        single_dsp: 0,
        single_dsp_inc_tax: 0
      }
    ],

    product_variation: [
      {
        id: 1,
        variation_template_id: '',
        variations: [
          {
            sub_sku: '',
            variation_value_id: null,
            value: '',
            default_purchase_price: 0,
            dpp_inc_tax: 0,
            profit_percent: 0,
            default_sell_price: 0,
            sell_price_inc_tax: 0,
            image: []
          }
        ]
      }
    ],
    product_compo: [
      {
        item_level_purchase_price_total: 0, //hide price before tax
        profit_percent: '',
        selling_price: 0, //hide
        selling_price_inc_tax: '', // default_sell_price
        purchase_price_inc_tax: '',
        search_product: '',
        p_id: '',
        change: null,
        rows: [
          {
            name: '',
            composition_variation_id: '', //hide variation_id
            quantity: 0,
            unit: '', //selected unit form menu
            purchase_price_exc: '', //purchase_price
            total_amount: 0, // quantity * purchase_price_exc
            all_unit: [],
            initial: true,
            unit_quantity: 1
          }
        ]
      }
    ]
  })

  // localStorage.setItem('TableCount', 2 )
  // const [test, setTest] = useState({
  //  tableOne: [
  //           {
  //                   itemCode: '',
  //                   value: '',
  //                   exc: '',
  //                   inc: '',
  //                   profit: ''
  //                   ,
  //                   second_exc: '',
  //                   second_inc: '',
  //                   image: '',
  //             },
  //           {
  //                   itemCode: '',
  //                   value: '',
  //                   exc: '',
  //                   inc: '',
  //                   profit: ''
  //                   ,
  //                   second_exc: '',
  //                   second_inc: '',
  //                   image: '',
  //             },
  //           {
  //                   itemCode: '',
  //                   value: '',
  //                   exc: '',
  //                   inc: '',
  //                   profit: ''
  //                   ,
  //                   second_exc: '',
  //                   second_inc: '',
  //                   image: '',
  //             },

  //   ],
  //   TableTwo: [

  //   ]

  // })

  // // add Object to test in table one
  // const addTableOne = (id) => {
  //   setTest({
  //     ...test,
  //     [`table_${id}`]: [...test.tableOne, {
  //       itemCode: '',
  //       value: '',
  //       exc: '',
  //       inc: '',
  //       profit: ''
  //       ,
  //       second_exc: '',
  //       second_inc: '',
  //       image: '',
  //     }]
  //   })
  // }

  // // add Table  as array of objects to test
  // const addTable = () => {
  //   const tableCount= localStorage.getItem('TableCount')
  //   setTest({
  //     ...test,
  //     [`Table_${Number(tableCount) + 1}`]: [
  //       {
  //         itemCode: '',
  //         value: '',
  //         exc: '',
  //         inc: '',
  //         profit: ''
  //         ,
  //         second_exc: '',
  //         second_inc: '',
  //         image: '',
  //       }
  //     ]
  //   })

  // }

  // ** Selector for Update Product
  const updateProduct = useSelector(state => state.getUpdateProduct?.data?.value.info)

  // Trigger Change in Update Product
  useEffect(() => {
    if (updateProduct) {
      setUpdatingProductData(updateProduct)
    }
  }, [updateProduct])

  useEffect(() => {
    if (names) {
      setTableNames(names)
    }
  }, [names])

  console.log('from stepper tableNames 🧀🧀', tableNames)

  // ** Set Initial Values for Update Product in UseEffect
  useEffect(() => {
    if (isEdit && updatingProductData) {
      setInitialValues(prevState => ({
        ...prevState,
        name: updatingProductData.name || prevState.name,
        code: updatingProductData.code || prevState.code,
        code2: updatingProductData.code2 || prevState.code2,
        barcode_type: updatingProductData.barcode_type || prevState.barcode_type,
        unit_id: updatingProductData.unit_id || prevState.unit_id,
        sub_unit_id: updatingProductData.sub_unit_id || prevState.sub_unit_id,
        brand_id: updatingProductData.brand_id || prevState.brand_id,
        category_id: updatingProductData.category_id || prevState.category_id,
        sub_category_id: updatingProductData.sub_category_id || prevState.sub_category_id,
        enable_stock: updatingProductData.enable_stock || prevState.enable_stock,
        alert_quantity: updatingProductData.alert_quantity || prevState.alert_quantity,
        warranty_id: updatingProductData.warranty_id || prevState.warranty_id,
        show_more_price: updatingProductData.show_more_price || prevState.show_more_price,
        long_description: updatingProductData.long_description || prevState.long_description,
        short_description: updatingProductData.short_description || prevState.short_description,
        location: updatingProductData.location || prevState.location,
        productImage: updatingProductData.productImage || prevState.productImage,
        productmultipleimages: updatingProductData.productmultipleimages || prevState.productmultipleimages,
        productbrochure: updatingProductData.productbrochure || prevState.productbrochure,
        productvideo: updatingProductData.productvideo || prevState.productvideo,
        not_for_sale: updatingProductData.not_for_sale || prevState.not_for_sale,
        expiry_period: updatingProductData.expiry_period || prevState.expiry_period,
        expiry_period_type: updatingProductData.expiry_period_type || prevState.expiry_period_type,
        weight: updatingProductData.weight || prevState.weight,
        custom_field_1: updatingProductData.custom_field_1 || prevState.custom_field_1,
        custom_field_2: updatingProductData.custom_field_2 || prevState.custom_field_2,
        custom_field_3: updatingProductData.custom_field_3 || prevState.custom_field_3,
        custom_field_4: updatingProductData.custom_field_4 || prevState.custom_field_4,
        product_type: updatingProductData.product_type || prevState.product_type,
        positionDetailsValue: updatingProductData.positionDetailsValue || prevState.positionDetailsValue,
        tax: updatingProductData.tax || prevState.tax,
        tax_id: updatingProductData.tax_id || prevState.tax_id,
        tableData:
          updatingProductData.tableData.map(item => {
            return {
              id: item.id,
              value: item.value,
              single_dpp: item.single_dpp,
              single_dpp_in_tax: item.single_dpp_in_tax,
              profit_percent: item.profit_percent,
              single_dsp: item.single_dsp,
              single_dsp_inc_tax: item.single_dsp_inc_tax
            }
          }) || prevState.tableData,
        tableDataChildOne: updatingProductData.tableDataChildOne || prevState.tableDataChildOne,
        tableDataChildTwo: updatingProductData.tableDataChildTwo || prevState.tableDataChildTwo,
        product_variation: updatingProductData.product_variation || prevState.product_variation,
        product_compo: updatingProductData.product_compo || prevState.product_compo
      }))
    }
  }, [isEdit, updatingProductData])

  // ** Test
  console.log('from stepper product isEdit & itemId 🎶', isEdit, itemId)

  // ** Hooks
  const dispatch = useDispatch()
  const saveProductMain = useSelector(state => state.postCreateProduct)
  console.log(saveProductMain, 'from stepper saveProductMain 🎶')
  const postUpdateProductMain = useSelector(state => state.postUpdateProduct)

  useEffect(() => {
    if (initialValues.unit_id) {
      setUnitId(initialValues.unit_id)
    }
  }, [initialValues.unit_id])

  useEffect(() => {
    const token = getCookie('token')
    const url = getCookie('apiUrl')
    setToken(token)
    setUrl(url)
  }, [token, url])

  // useEffect(() => {
  //   dispatch(fetchCreateProduct())
  // }, [dispatch])

  // ** Functions
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

  console.log(unitId, 'from stepper unitId 🎶')
  console.log(initialValues.unit_id, 'from stepper initialValues 🎶')

  const getStepContent = ({ values, errors, touched, handleBlur, handleChange, setFieldValue, step }) => {
    switch (step) {
      case 0:
        return (
          <Fragment key={step}>
            {/* // **Done: Create Product Information Section here  */}
            <ProductInfo
              initialValues={values}
              errors={errors}
              touched={touched}
              handleBlur={handleBlur}
              handleChange={handleChange}
              setFieldValue={setFieldValue}
              updatingProductData={updatingProductData || []}
              isEdit={isEdit}
            />
          </Fragment>
        )
      case 1:
        return (
          <Fragment key={step}>
            <ProductMedia
              initialValues={values}
              errors={errors}
              touched={touched}
              handleBlur={handleBlur}
              handleChange={handleChange}
              setFieldValue={setFieldValue}
            />
          </Fragment>
        )
      case 2:
        return (
          <Fragment key={step}>
            <ProductAdditionalInfo
              initialValues={values}
              errors={errors}
              touched={touched}
              handleBlur={handleBlur}
              handleChange={handleChange}
              setFieldValue={setFieldValue}
            />
          </Fragment>
        )
      case 3:
        return (
          <Fragment key={step}>
            <ProductPrices
              initialValues={values}
              errors={errors}
              touched={touched}
              handleBlur={handleBlur}
              handleChange={handleChange}
              setFieldValue={setFieldValue}
              setInitialValues={setInitialValues}
            />
          </Fragment>
        )
      case 4:
        return <Fragment key={step}></Fragment>
      default:
        return 'Unknown Step'
    }
  }

  //** Validation
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    code: Yup.string(),
    code2: Yup.string(),
    barcode_type: Yup.string().required('Barcode type is required'),
    unit_id: Yup.string().required('Unit is required'),
    brand_id: Yup.string(),
    category_id: Yup.string().required('Category is required'),
    sub_category_id: Yup.string().required('Sub Category is required'),
    enable_stock: Yup.boolean(),
    alert_quantity: Yup.string().required('Alert quantity is required when stock is enabled'),
    warranty_id: Yup.string(),
    location: Yup.array()
      .required('Location is required')
      .test('not-empty', 'Business Location must not be empty', array => array.length > 0)
  })

  // ** Submit
  const handleSubmitForm = (values, { resetForm }) => {
    // ** Test

    toast.success('Form Submitted 🎉')
    console.log(values, 'from submit Product 🐱‍🏍')
    if (isEdit && itemId) {
      console.log('from stepper isEdit & itemId ☢☢', isEdit, itemId)
      dispatch(postUpdateProduct({ newProduct: values, id: itemId })).then(() => {
        dispatch(fetchProducts({ token }))
      })
      setActiveStep(activeStep + 1)
    } else {
      dispatch(saveProduct({ product: values })).then(() => {
        dispatch(fetchProducts({ token }))
      })
      setActiveStep(activeStep + 1)
    }
    setOpenLoading(true)

    resetForm()
  }

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
            padding={3}
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
        // <Fragment>
        //   <Typography>All steps are completed!</Typography>
        //   <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
        //     <Button size='large' variant='contained' onClick={handleReset}>
        //       Reset
        //     </Button>
        //   </Box>
        // </Fragment>
      )
    } else {
      return (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmitForm}
          enableReinitialize={true}
        >
          {({ values, errors, touched, handleBlur, handleChange, setFieldValue, resetForm }) => (
            <form>
              <Grid container mt={5}>
                <Grid item xs={12} mb={5} sx={{ px: 3 }}>
                  <Typography variant='body1' sx={{ fontWeight: 600, color: 'text.primary' }}>
                    {steps[activeStep].title}
                  </Typography>
                  <Typography variant='caption' component='p'>
                    {steps[activeStep].subtitle}
                  </Typography>
                </Grid>
                <Grid item xs={12} mb={5}>
                  {getStepContent({
                    values,
                    errors,
                    touched,
                    handleBlur,
                    handleChange,
                    setFieldValue,
                    step: activeStep
                  })}
                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', p: 3 }}>
                  <Button
                    variant='outlined'
                    color='secondary'
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ fontSize: { sx: '0.75rem', md: '1rem' } }}
                  >
                    Back
                  </Button>
                  {activeStep === steps.length - 1 ? (
                    <Button
                      variant='contained'
                      color='primary'
                      sx={{ fontSize: { sx: '0.5rem', md: '1rem' } }}
                      onClick={() => handleSubmitForm(values, { resetForm })}
                      type='submit'
                    >
                      {isEdit ? 'Update Product' : 'Add Product'}
                    </Button>
                  ) : (
                    <Button
                      sx={{ fontSize: { sx: '0.5rem', md: '1rem' } }}
                      size='large'
                      variant='contained'
                      color='primary'
                      onClick={e => {
                        e.preventDefault()
                        handleNext()
                      }}
                    >
                      Next
                    </Button>
                  )}
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      )
    }
  }

  return (
    <Card
      sx={{ display: 'flex', height: '100%', width: '100%', flexDirection: { xs: 'column', md: 'row', lg: 'row' } }}
    >
      <LoadingAnimation
        open={openLoading}
        onClose={() => setOpenLoading(false)}
        statusType={isEdit ? postUpdateProductMain : saveProductMain}
      />
      <StepperHeaderContainer>
        <StepperWrapper sx={{ height: '100%' }}>
          <Stepper
            activeStep={activeStep}
            orientation='vertical'
            connector={<></>}
            sx={{ height: '100%', minWidth: '15rem' }}
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
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                        padding: '1rem 0'
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
                          borderRadius: 1,
                          ...(activeStep === index && {
                            boxShadow: theme => `0 0.1875rem 0.375rem 0 ${hexToRGBA(theme.palette.primary.main, 0.4)}`
                          })
                        }}
                      >
                        <Icon icon={step.icon} />
                      </CustomAvatar>
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.5rem',
                          marginTop: '0.5rem'
                        }}
                      >
                        <Typography className='step-title'>{step.title}</Typography>
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
      <CardContent
        sx={{
          overflowY: 'auto',
          overflowX: 'hidden',
          padding: '0 !important',
          height: '100%',
          width: '100%'

          // gridColumn: 'span 9'
          // padding: '2rem'
        }}
      >
        {renderContent()}
      </CardContent>
    </Card>
  )
}

export default StepperAddProduct
