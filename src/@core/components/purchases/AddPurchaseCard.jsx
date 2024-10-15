// ** React Imports
import { useState, useEffect, Fragment } from 'react'

// ** MUI Imports
import { Grid, Divider, Card } from '@mui/material'

// ** Custom Component Imports
import LoadingAnimation from 'src/@core/components/utilities/loadingComp'

// ** Third Party Components
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

// ** Redux
import { useDispatch, useSelector } from 'react-redux'
import { fetchCreatePurchase } from 'src/store/apps/purchases/getCreatePurchase'
import { createPurchase } from 'src/store/apps/purchases/postCreatePurchaseSlice'

// ** Custom Components
import AddExpense from './AddExpense'
import ExpenseActions from './ExpenseActions'
import PurchaseFirstSection from './PurchaseFirstSection'
import PurchaseSecondSection from './PurchaseSecondSection'
import PurchaseThirdSection from './PurchaseThirdSection'
import PurchaseFooterSection from './PurchaseFooterSection'
import PurchaseTableSection from './PurchaseTableSection'

const now = new Date()
const tomorrowDate = now.setDate(now.getDate() + 7)

const AddPurchaseCard = () => {
  // ** State
  const [data, setData] = useState()
  const [openLoading, setOpenLoading] = useState(false)
  const [searchSupplier, setSearchSupplier] = useState(null)
  const [addExpense, setAddExpense] = useState(false)
  const [initialValues, setInitialValues] = useState({
    total_items: 0,
    sub_total: 0,
    search_product: '',
    search_supplier: '',
    business_info: null,
    parent_price: null,
    discount: 0,
    discount_type: '',
    discount_amount: 0,
    discount_amount_curr: 0,
    discount_amount_value: 0,
    sub_total_curr: 0,
    tax_amount: '',
    tax: 0,
    tax_curr: 0,
    tax_value: 0,
    tax_final: 0,
    final_total: 0,
    final_total_curr: 0,
    final_additional_cost: 0,
    final_additional_supplier: 0,
    shipping_details: '',
    contact_id: '',
    contactText: '',
    sup_refe: '',
    transaction_date: new Date(),
    due_date: new Date(tomorrowDate),
    exchange_rage: '',
    location_id: '',
    pay_term_type: '',
    pay_term_number: '',
    status: '',
    cost_center_id: '',
    store_id: '',
    currency_id: '',
    currency_id_amount: '',
    currency_symbol: '',
    additional_supplier_charges: 0,
    additional_cost_charges: 0,
    project_no: '',
    depending_curr: '',
    dis_currency: '',
    dis_type: '',
    attachment: [],
    items: [
      {
        id: -111,
        name: 'Demo Product',
        description: '',
        product_id: '',
        variation_id: '',
        cost: 0,
        quantity: null,
        unit: null,
        initial: true,
        stock: '',
        unit_price_before_dis: 0,
        purchase_price: 0,
        unit_price_before_dis_include_vat: 0,
        list_prices: [],
        all_unit: [],
        child_price: '',
        unit_price_after_dis: 0,
        unit_price_after_dis_include_vat: 0,
        amount_discount: 0,
        percentage_discount: 0,
        unit_price_after_dis_curr: 0,
        unit_price_before_dis_curr: 0,
        total: 0,
        total_currency: 0,

        mfg_date: '',
        unit_quantity: 0,
        line_sort: -1,
        unit_quantity: '',
        exp_date: ''
      }
    ],
    expense: [],
    expense_total_amount: 0,
    expense_total: 0,
    expense_total_vat: 0,
    expense_total_amount_curr: 0,
    expense_total_curr: 0,
    expense_total_vat_curr: 0,
    expense_currency_id: '',
    expense_currency_id_amount: '',
    expense_currency_symbol: '',
    additional_supplier_charges_curr: 0,
    additional_cost_charges_curr: 0,
    expense_attachment: [],
    additional_notes: ''
  })

  // ** Hooks

  const dispatch = useDispatch()

  // ** Selectors
  const store = useSelector(state => state.getCreatePurchase?.data?.value)
  const createStatus = useSelector(state => state.postCreatePurchase)
  const dataOfLastSupplier = useSelector(state => state.getLastSupplierAdded?.data?.value)

  // ** Validation Schema
  const validationSchema = Yup.object().shape({
    store_id: Yup.string().required('This field is required'),
    contact_id: Yup.string().required('This field is required'),
    transaction_date: Yup.date().required('This field is required'),
    status: Yup.string().required('This field is required')
  })

  // ** fetch create purchase data
  useEffect(() => {
    dispatch(fetchCreatePurchase())
  }, [dispatch])

  // ** set Data
  useEffect(() => {
    if (store) {
      setData(store)
    }
  }, [store])

  // ** Trigger last supplier added
  useEffect(() => {
    if (dataOfLastSupplier) {
      setInitialValues(prev => {
        return {
          ...prev,
          business_info: {
            name: dataOfLastSupplier?.name,
            businessName: dataOfLastSupplier?.businessName,
            contactNumber: dataOfLastSupplier?.contactNumber,
            mobile: dataOfLastSupplier?.mobile,
            tax_number: dataOfLastSupplier?.tax_number,
            email: dataOfLastSupplier?.email,
            balance: dataOfLastSupplier?.balance
          }
        }
      })
    }
  }, [dataOfLastSupplier])

  // ** Function to handle form submit
  const handleSubmit = (values, { setSubmitting }) => {
    setOpenLoading(true)
    dispatch(createPurchase({ values })).then(() => {
      setSubmitting(false)
    })
  }

  return (
    <Fragment>
      {openLoading && (
        <LoadingAnimation open={openLoading} onClose={() => setOpenLoading(false)} statusType={createStatus} />
      )}

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values, handleBlur, handleChange, errors, touched, setFieldValue, isSubmitting }) => (
          <Form>
            <Grid container spacing={6}>
              <Grid item xs={12} md={12} sm={12}>
                <Card>
                  {/* First section */}
                  <PurchaseFirstSection />

                  <Divider
                    sx={{
                      mt: theme => `${theme.spacing(1.25)} !important`,
                      mb: theme => `${theme.spacing(4)} !important`
                    }}
                  />

                  {/* {Second sections} */}
                  <PurchaseSecondSection
                    values={values}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    data={data}
                    touched={touched}
                    errors={errors}
                    setFieldValue={setFieldValue}
                  />

                  <Divider
                    sx={{
                      mt: theme => `${theme.spacing(1.25)} !important`,
                      mb: theme => `${theme.spacing(4)} !important`
                    }}
                  />

                  {/* section three */}
                  <PurchaseThirdSection
                    values={values}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    data={data}
                    touched={touched}
                    errors={errors}
                    setFieldValue={setFieldValue}
                    searchSupplier={searchSupplier}
                    setSearchSupplier={setSearchSupplier}
                  />

                  <Divider
                    sx={{
                      mt: theme => `${theme.spacing(3.5)} !important`,
                      mb: theme => `${theme.spacing(2.5)} !important`
                    }}
                  />

                  {/* Table Section */}
                  <PurchaseTableSection handleChange={handleChange} values={values} setFieldValue={setFieldValue} />

                  <Divider sx={{ mt: '0 !important', mb: theme => `${theme.spacing(2.5)} !important` }} />

                  {/* Footer Section */}
                  <PurchaseFooterSection
                    setAddExpense={setAddExpense}
                    setFieldValue={setFieldValue}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    values={values}
                    data={data}
                    errors={errors}
                    touched={touched}
                  />
                </Card>
              </Grid>
              <Grid item xl={12} md={12} xs={12}>
                <Card>
                  <ExpenseActions values={values} setFieldValue={setFieldValue} isSubmitting={isSubmitting} />
                </Card>
              </Grid>
            </Grid>

            {addExpense && (
              <AddExpense
                data={data}
                open={addExpense}
                setFieldValue={setFieldValue}
                handleChange={handleChange}
                values={values}
                toggle={() => setAddExpense(!addExpense)}
              />
            )}
          </Form>
        )}
      </Formik>
    </Fragment>
  )
}

export default AddPurchaseCard
