// ** React Imports
// import { ReactNode } from 'react'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Components Imports
import PrintPage from 'src/views/apps/invoice/print/PrintPage'

const ViewPrint = () => {
  return <PrintPage id='4987' />
}

ViewPrint.getLayout = page => <BlankLayout>{page}</BlankLayout>

ViewPrint.setConfig = () => {
  return {
    mode: 'light'
  }
}

export default ViewPrint
