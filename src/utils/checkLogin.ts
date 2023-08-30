import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

// import jwt_decode from 'jwt-decode'
import { useRouter } from 'next/router'
import { RootState } from 'src/types/apps/rooteState'
import { getCookies } from 'cookies-next'

export function useNavigateToDashboardAnalysisIfTokenMatches() {
  const dispatch = useDispatch()
  const router = useRouter()
  const id = useSelector((state: RootState) => state.login.data.authorization?.user?.id)
  const first_name = useSelector((state: RootState) => state.login.data.authorization?.user?.first_name)

  const login_first_time = useSelector((state: RootState) => state.login.login_first_time)
  console.log('id,first_name', id, first_name)

  useEffect(() => {
    // Get the token from local storage
    // @ts-ignore
    const token: string = getCookies('token')

    console.log('token', token)

    // Check if there is a token in local storage
    if (!token) {
      // Token is not present, handle this case if needed
      console.log('Token not found in local storage')

      return
    }
    if (token) {
      router.replace('/dashboards/analytics')
      console.log("router.push('/dashboard/analysis') ..... we can navigate to dashboard")
    } else if (!token && !router.pathname.includes('login')) {
      // Values do not match, handle this case if needed
      console.log('Token values do not match')
      router.replace('/login')
    }

    // try {
    //   // Decode the token using jwt-decode
    //   const decodedToken: any = jwt_decode(token)
    //   console.log('decodedToken', decodedToken)
    //   console.log('decodedToken sub', decodedToken.sub)

    //   // Check if the token has expired
    //   if (decodedToken.exp < Date.now() / 1000) {
    //     // Token has expired, handle this case if needed
    //     console.log('Token has expired')

    //     // Remove the token from local storage
    //     deleteCookie('token')

    //     // Redirect to login page
    //     router.push('/login')
    //   } else {
    //     // Token is still valid, handle this case if needed
    //     console.log('Token is still valid')
    //   }

    //   // Compare the decoded token value with the Redux state value

    // } catch (error) {
    //   // Handle the error gracefully
    //   console.error('Invalid token:', error)
    // }
  }, [dispatch, router, id, first_name])

  return login_first_time
}
