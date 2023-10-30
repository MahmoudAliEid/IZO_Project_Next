// ** Next Import
import { GetServerSideProps, GetServerSidePropsContext } from 'next/types'

// ** Third Party Imports
import axios from 'axios'
import useFetchView from 'src/hooks/useFetchView'

// import { getCookie } from 'cookies-next'

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
    //   Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3Rlc3QuaXpvY2xvdWQubmV0L2FwaS9hcHAvcmVhY3QvbG9naW4iLCJpYXQiOjE2OTg2NTU1NTksImV4cCI6MTY5ODc0MTk1OSwibmJmIjoxNjk4NjU1NTU5LCJqdGkiOiJVRkVFWnVwMFY3bEhoaDlFIiwic3ViIjoiNTkiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3Iiwic2VjcmV0X2siOiJpem8tMTIzNDU2TG91ZnkifQ.ZUvTZeHCBD5eX8LaEAxOaIDIS1bLoZ4eREdys58qr3I`,
    // })
    // const userInfo = await response.data.user

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
