// ** React Imports
// import { ReactNode } from 'react'

// ** Next Import
// import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, InferGetStaticPropsType } from 'next/types'

// ** Third Party Imports
// import axios from 'axios'

// // ** Types
// import { InvoiceType } from 'src/types/apps/invoiceTypes'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'
import ViewContactPrintPage from 'src/@core/components/customerGroups/contactView/printPage/ViewContactPrintPage'

// ** Demo Components Imports
// import PrintPage from 'src/views/apps/invoice/print/PrintPage'

const ViewPrint = ({ id, type, startDate, endDate }) => {
  return <ViewContactPrintPage id={id} type={type} startDate={startDate} endDate={endDate} />
}

// export const getStaticPaths= async () => {
//   const res = await axios.get('/apps/invoice/invoices')
//   const data = await res.data.allData

//   const paths = data.map((item) => ({
//     params: { id: `${item.id}` }
//   }))

//   return {
//     paths,
//     fallback: false
//   }
// }

export const getServerSideProps = async context => {
  return {
    props: {
      id: context.params?.id || '',
      type: context.query?.type || '',
      startDate: context.query?.startDate || '',
      endDate: context.query?.endDate || ''
    }
  }
}

ViewPrint.getLayout = page => <BlankLayout>{page}</BlankLayout>

ViewPrint.setConfig = () => {
  return {
    mode: 'light'
  }
}

export default ViewPrint
