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
import { fetchEditPurchase } from 'src/store/apps/purchases/getEditPurchase'
import { fetchCreatePurchase } from 'src/store/apps/purchases/getCreatePurchase'

// ** Custom Components
import AddExpense from '../AddExpense'
import ExpenseActions from '../ExpenseActions'
import PurchaseFirstSection from '../PurchaseFirstSection'
import PurchaseSecondSection from '../PurchaseSecondSection'
import PurchaseThirdSection from '../PurchaseThirdSection'
import PurchaseFooterSection from '../PurchaseFooterSection'
import PurchaseTableSection from '../PurchaseTableSection'

const now = new Date()
const tomorrowDate = now.setDate(now.getDate() + 7)

const EditPurchaseCard = ({ id }) => {
  // ** State
  const [data, setData] = useState()
  const [openLoading, setOpenLoading] = useState(false)
  const [searchSupplier, setSearchSupplier] = useState('ebrahem')
  const [addExpense, setAddExpense] = useState(false)
  const [initialValues, setInitialValues] = useState({
    total_items: 0,
    sub_total: 0,
    search_product: '',
    search_supplier: '',
    business_info: null,
    parent_price: 0,
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
    items: [],
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
  const store = useSelector(state => state.getEditPurchase?.data?.value)

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
    dispatch(fetchEditPurchase({ itemId: id }))
  }, [dispatch, id])
  useEffect(() => {
    dispatch(fetchCreatePurchase())
  }, [dispatch])

  // ** set Data
  useEffect(() => {
    if (store) {
      setData(store.requirement)
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

  // ** set Data
  useEffect(() => {
    if (store) {
      const { info } = store
      setInitialValues(prev => {
        return {
          ...prev,
          store_id: info[0].store,
          storeName: info[0].storeName,
          location_id: info[0].location,
          type: info[0].type,
          status: info[0].status,
          payment_status: info[0].payment_status,
          transaction_date: new Date(info[0].date),
          due_date: new Date(info[0].due_date),
          parent_price: info[0].list_price,
          cost_center_id: info[0].cost_center_id,
          tax_value: Number(info[0].taxValue) / 100,
          attachment: [],
          business_info: {
            name: info[0].contact_info.name,
            id: info[0].contact_info.id,
            businessName: info[0].contact_info.businessName,
            contactNumber: info[0].contact_info.contactNumber,
            tax_number: info[0].contact_info.tax_number,
            mobile: info[0].contact_info.mobile,
            email: info[0].contact_info.email,
            balance: info[0].contact_info.balance
          },
          contact_id: info[0].contact,
          reference_no: info[0].reference_no,
          project_no: info[0].project_no,
          tax_amount: Number(info[0].tax),
          tax_final: Number(info[0].tax_amount),
          discount_type: info[0].discount_type,
          discount_amount: Number(info[0].discount_amount),
          currency_symbol: info[0].currency_symbol,
          sub_total: Number(info[0].sub_total),
          final_total: Number(info[0].final_total),
          tax_curr: Number(info[0].tax_amount_curr),
          additional_notes: info[0].additional_notes,
          shipping_details: info[0].shipping_details,
          sup_refe: info[0].source_reference,
          currency_id: info[0].currency_id,
          currency_id_amount: info[0].exchange_price ? Number(info[0].exchange_price) : '',
          final_total_curr: Number(info[0].final_total_curr),
          main_currency_symbol: info[0].main_currency_symbol,
          sub_total_curr: Number(info[0].sub_total_curr),
          discount_amount_value: Number(info[0].discount_amount_view),
          discount_amount_curr: Number(info[0].discount_amount_view_curr),
          items: info[0].list.map(item => ({
            ...item,
            id: item.id,
            name: item.name,
            description: item.purchase_note,
            product_id: item.product_id,
            variation_id: item.variation_id,
            quantity: item.quantity,
            unit: 1,
            initial: false,
            unit_price_before_dis: item.pp_without_discount,
            unit_price_before_dis_include_vat: item.pp_without_discount_tax,
            list_prices: item.all_unit[0].list_price || [],
            all_unit: item.all_unit || [],
            child_price: item.list_price,
            unit_price_after_dis: item.purchase_price,
            unit_price_after_dis_include_vat: item.purchase_price_inc_tax,
            amount_discount: item.discount_percent,
            percentage_discount: item.discount_percentage,
            unit_price_after_dis_curr: item.purchase_price_curr,
            unit_price_before_dis_curr: item.pp_without_discount_curr,
            total: item.purchase_total,
            total_currency: item.purchase_total_curr,
            mfg_date: item.mfg_date,
            unit_quantity: 1,
            line_sort: item.line_sort,
            unit_quantity: '',
            exp_date: item.exp_date
          })),
          expense_total_amount: Number(info[0].additional[0].amount),
          expense_total_vat: Number(info[0].additional[0].vat),
          expense_total: Number(info[0].additional[0].total),
          additional_cost_charges: Number(info[0].additional[0].cost_shipping),
          additional_supplier_charges: Number(info[0].additional[0].supplier_shipping),
          additional_supplier_charges_curr: Number(info[0].additional[0].supplier_shipping_curr),
          additional_cost_charges_curr: Number(info[0].additional[0].cost_shipping_curr),
          expense: info[0].additional[0].lines.map(expense => ({
            id: expense.id,
            cost_center: expense.cost_center_id,
            supplier: expense.supplier_id,
            amount: expense.amount_line,
            vat: expense.vat_line,
            total: expense.total_line,
            supplier_name: expense.supplier_name,
            total_curr: expense.total_line_curr,
            vat_curr: expense.vat_line_curr,
            amount_curr: expense.amount_line_curr,
            note: expense.note,
            debit: expense.debit_account_id,
            date: new Date(expense.date),
            currency_id: expense.currency_id,
            currency_id_amount: expense.currency_amount
          }))
        }
      })
      setSearchSupplier({
        name: info[0].contact_info.name,
        id: info[0].contact_info.id,
        businessName: info[0].contact_info.businessName,
        contactNumber: info[0].contact_info.contactNumber,
        tax_number: info[0].contact_info.tax_number,
        mobile: info[0].contact_info.mobile,
        email: info[0].contact_info.email,
        balance: info[0].contact_info.balance
      })
    }
  }, [store])

  // ** Function to handle form submit
  const handleSubmit = (values, { setSubmitting }) => {
    setOpenLoading(true)
    console.log('id form edit purchase edit and values:=>', id, values)

    setSubmitting(false)
  }
  console.log('store of edit purchase & data:=>', data)
  console.log('initialValues of edit purchase :=>', initialValues)

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
                  <ExpenseActions
                    values={values}
                    setFieldValue={setFieldValue}
                    isSubmitting={isSubmitting}
                    edit={true}
                  />
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

export default EditPurchaseCard
