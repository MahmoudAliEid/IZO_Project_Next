// ** Next Import
import { GetServerSideProps, GetServerSidePropsContext } from 'next/types'

// ** Third Party Imports
import axios from 'axios'
import useFetchView from 'src/hooks/useFetchView'

// ** Types
import { InvoiceType } from 'src/types/apps/invoiceTypes'

// ** Demo Components Imports
import UserViewPage from 'src/views/apps/user/view/UserViewPage'



const UserView = ({ tab, invoiceData, id }: { tab: string; invoiceData: InvoiceType[]; id: string, userInfo: object }) => {
  console.log("user id from userView page", id)
  const { data } = useFetchView(id)

  //@ts-ignore
  return <UserViewPage tab={tab} invoiceData={invoiceData} userInfo={data?.user || "There is no data"} />
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  try {

    // const token = getCookie('token')
    const res = await axios.get('/apps/invoice/invoices');
    const invoiceData: InvoiceType[] = res.data.allData;


    // const response = await axios.get(`https://test.izocloud.net/api/app/react/users/view/${context.params?.id}`, {
    //   //@ts-ignore
    //   Authorization: `Bearer ${token}`,
    // })
    // const userInfo = await response.data
    // make a slice the get the fun that fetch data here and send to it a id to fetch data

    return {
      props: {
        invoiceData,
        tab: context.params?.tab || '',
        id: context.params?.id || '',
      },
    };
  } catch (error) {
    console.error('Error fetching invoice data:', error);

    return {
      notFound: true,
    };
  }
};

export default UserView;
