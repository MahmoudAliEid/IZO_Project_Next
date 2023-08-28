import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import jwt_decode from 'jwt-decode'
import { useRouter } from 'next/router'

interface RootState {
  login: {
    data: {
      authorization: {
        user: {
          id: string
          first_name: string
        }
      }
    }
  }
  authorization: any
  user: object
  data: any[] // You should replace 'any' with the actual type of 'data'
  userType: string
  token: string
  status: 'idle' | 'loading' | 'success' | 'error' // Adjust the possible values for 'status' as needed
  login_first_time: boolean | null // Assuming this should be a boolean
  error: Error | null // Assuming this should be an Error type
}

export function useNavigateToDashboardAnalysisIfTokenMatches() {
  const dispatch = useDispatch()
  const router = useRouter()
  const id = useSelector((state: RootState) => state.login.data.authorization?.user?.id)
  const first_name = useSelector((state: RootState) => state.login.data.authorization?.user?.first_name)
  console.log('id,first_name', id, first_name)

  useEffect(() => {
    // Get the token from local storage
    const token = localStorage.getItem('token')
    console.log('token', token)

    // Check if there is a token in local storage
    if (!token) {
      // Token is not present, handle this case if needed
      console.log('Token not found in local storage')

      return
    }

    // Decode the token using jwt-decode
    const decodedToken: any = jwt_decode(token) // Replace 'any' with your token structure type
    console.log('decodedToken', decodedToken)
    console.log('decodedToken sub', decodedToken.sub)

    // Check if the token has expired
    if (decodedToken.exp < Date.now() / 1000) {
      // Token has expired, handle this case if needed
      console.log('Token has expired')

      // Remove the token from local storage
      localStorage.removeItem('token')

      // Redirect to login page
      router.push('/login')
    } else {
      // Token is still valid, handle this case if needed
      console.log('Token is still valid')
    }

    // Compare the decoded token value with the Redux state value
    if (decodedToken.sub === id?.toString()) {
      // Replace 'someField' with the appropriate field in the decoded token
      // Values match, navigate to /dashboard/analysis
      // router.push('/dashboards/analytics')
      console.log("router.push('/dashboard/analysis') ..... we can navigate to dashboard")
    } else if (!token && !router.pathname.includes('login')) {
      // Values do not match, handle this case if needed
      console.log('Token values do not match')
      router.replace('/login')
    }
  }, [dispatch, router, id, first_name])

  return null // You can return null or any other value you prefer
}
