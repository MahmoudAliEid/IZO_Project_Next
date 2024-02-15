// ** React Imports
// import { ReactNode  } from 'react'
import { ToastContainer } from 'react-toastify'

// ** Next Imports
import Head from 'next/head'
import { Router } from 'next/router'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'

// ** Store Imports
import { store } from 'src/store'
import { Provider } from 'react-redux'

// ** Loader Import
import NProgress from 'nprogress'

// ** Emotion Imports
import { CacheProvider } from '@emotion/react'
import type { EmotionCache } from '@emotion/cache'
import { Global, css } from '@emotion/react'


import { useTheme } from '@mui/material/styles'
import useThemeColor from 'src/@core/utils/useThemeColor'

// ** Config Imports
import 'src/configs/i18n'

// import { defaultACLObj } from 'src/configs/acl'
import themeConfig from 'src/configs/themeConfig'


// ** Fake-DB Import
import 'src/@fake-db'

// ** Third Party Import
import { Toaster } from 'react-hot-toast'

// ** Component Imports
import UserLayout from 'src/layouts/UserLayout'

// import AclGuard from 'src/@core/components/auth/AclGuard'
import ThemeComponent from 'src/@core/theme/ThemeComponent'

// import AuthGuard from 'src/@core/components/auth/AuthGuard'
// import GuestGuard from 'src/@core/components/auth/GuestGuard'

// ** Spinner Import
// import Spinner from 'src/@core/components/spinner'

// ** Contexts
// import { AuthProvider } from 'src/context/AuthContext'
import { SettingsConsumer, SettingsProvider } from 'src/@core/context/settingsContext'

// ** Styled Components
import ReactHotToast from 'src/@core/styles/libs/react-hot-toast'

// ** Utils Imports
import { createEmotionCache } from 'src/@core/utils/create-emotion-cache'

// ** Prismjs Styles
import 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'

// ** React Perfect Scrollbar Style
import 'react-perfect-scrollbar/dist/css/styles.css'

import 'src/iconify-bundle/icons-bundle-react'

// ** Global css styles
import '../../styles/globals.css'

// ** Extend App Props with Emotion
type ExtendedAppProps = AppProps & {
  Component: NextPage
  emotionCache: EmotionCache
}

// type GuardProps = {
//   authGuard: boolean
//   guestGuard: boolean
//   children: ReactNode
// }

const clientSideEmotionCache = createEmotionCache()

// ** Pace Loader
if (themeConfig.routingLoader) {
  Router.events.on('routeChangeStart', () => {
    NProgress.start()
  })
  Router.events.on('routeChangeError', () => {
    NProgress.done()
  })
  Router.events.on('routeChangeComplete', () => {
    NProgress.done()
  })
}

// const Guard = ({ children, authGuard, guestGuard }: GuardProps) => {
//   if (guestGuard) {
//     return <GuestGuard fallback={<Spinner />}>{children}</GuestGuard>
//   } else if (!guestGuard && !authGuard) {
//     return <>{children}</>
//   } else {
//     return <AuthGuard fallback={<Spinner />}>{children}</AuthGuard>
//   }
// }

// ** Configure JSS & ClassName

const App = (props: ExtendedAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props
  const theme = useTheme();
  const { themeColor,mainColor}=useThemeColor();

  // Variables
  const contentHeightFixed = Component.contentHeightFixed ?? false
  const getLayout =
    Component.getLayout ?? (page => <UserLayout contentHeightFixed={contentHeightFixed}>{page}</UserLayout>)

  const setConfig = Component.setConfig ?? undefined

  // const authGuard = Component.authGuard ?? true

  // const guestGuard = Component.guestGuard ?? false

  // const aclAbilities = Component.acl ?? defaultACLObj

  console.log('theme color 👁‍🗨👁‍🗨 🤩🤩', themeColor)
  console.log('theme color from _app 🤍 👁‍🗨👁‍🗨', theme.palette.primary.main)


  return (
    <Provider store={store}>
      <CacheProvider value={emotionCache}>

    <Global
          styles={css`
            ::selection {
              background-color: ${themeColor} ;
            }
            ::-moz-selection {
              background-color: ${themeColor} ;
            }
            input:-webkit-autofill,
              input:-webkit-autofill:hover,
              input:-webkit-autofill:focus,
              textarea:-webkit-autofill,
              textarea:-webkit-autofill:hover,
              textarea:-webkit-autofill:focus,
              select:-webkit-autofill,
              select:-webkit-autofill:hover,
              select:-webkit-autofill:focus {

                -webkit-box-shadow: 0 0 0px 1000px ${themeColor} inset !important;
                transition: background-color 5000s ease-in-out 0s;
              }

              /* Custom scrollbar styles */
    ::-webkit-scrollbar {
      width: 10px; /* Width of the scrollbar */
      border-radius: 10px;
      height: 10px;
    }
    ::-webkit-scrollbar-track {
      background: #f1f1f1; /* Color of the track */
    }
    ::-webkit-scrollbar-thumb {
       background: ${mainColor}; /* Color of the scroll thumb on hover */

       border-radius: 10px;
    }
    ::-webkit-scrollbar-thumb:hover {

       background: ${mainColor}; /* Color of the scroll thumb */
    }


          `}
        />


        <Head>
          <title>{`${themeConfig.templateName}`}</title>
          <meta name='description' content={`${themeConfig.templateName} – IZO Admin Dashboard`} />
          <meta name='keywords' content='IZO, ERP, Admin Template, ERP Admin ' />
          <meta name='viewport' content='initial-scale=1, width=device-width' />
        </Head>

        {/* <AuthProvider> */}
        <SettingsProvider {...(setConfig ? { pageSettings: setConfig() } : {})}>
          <SettingsConsumer>
            {({ settings }) => {
              return (
                <ThemeComponent settings={settings} >
                  {/* <Guard authGuard={authGuard} guestGuard={guestGuard}>
                      <AclGuard aclAbilities={aclAbilities} guestGuard={guestGuard} authGuard={authGuard}></AclGuard>
                    </Guard> */}

                  {getLayout(<Component {...pageProps}  />)}
                  <ReactHotToast>
                    <Toaster position={settings.toastPosition} toastOptions={{ className: 'react-hot-toast' }} />
                  </ReactHotToast>
                </ThemeComponent>
              )
            }}
          </SettingsConsumer>
        </SettingsProvider>
        {/* </AuthProvider> */}
      </CacheProvider>
      <ToastContainer />
    </Provider>
  )
}

export default App
