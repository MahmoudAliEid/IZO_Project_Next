// import { NextResponse } from 'next/server'
// import { verifyAuth } from './jwt'

// const getAbsoluteUrl = (req, path) => {
//   const protocol = req.protocol || 'http'
//   const host = req.headers['x-forwarded-host'] || req.headers.host || 'localhost:3000'

//   return `${protocol}://${host}${path}`
// }

// const middleware = async req => {
//   const token = req.cookies.get('token')
//   const key = req.cookies.get('key')
//   const path = req.nextUrl.pathname // Extract the path from the URL
//   const validToken = token && key && (await verifyAuth(token, key))

//   // If token is not valid and user is not on the login page, redirect to login
//   if (!validToken && !path.includes('/login') && path.includes('/dashboards')) {
//     return NextResponse.redirect(getAbsoluteUrl(req, '/login'))
//   }
//   if (!validToken && !path.includes('/login')) {
//     return NextResponse.redirect(getAbsoluteUrl(req, '/login'))
//   }

//   // If token is not valid and user is on the app page, redirect to login
//   if (!validToken && !path.includes('/login') && path.includes('/app')) {
//     return NextResponse.redirect(getAbsoluteUrl(req, '/login'))
//   }

//   // If token is not valid and user is on the home page, redirect to login
//   if (!validToken && !path.includes('/login') && path === '/') {
//     return NextResponse.redirect(getAbsoluteUrl(req, '/login'))
//   }

//   // If token is valid and user is on the login, register, or loginFirstTime page, redirect to dashboards/analytics
//   if (
//     validToken &&
//     (path === '/login' || path === '/register' || path === '/loginFirstTime') &&
//     !path.includes('/dashboards')
//   ) {
//     return NextResponse.redirect(getAbsoluteUrl(req, '/dashboards/analytics'))
//   }

//   // If token is valid and user is on the home page, redirect to dashboards/analytics
//   if (validToken && path === '/' && !path.includes('/dashboards')) {
//     return NextResponse.redirect(getAbsoluteUrl(req, '/dashboards/analytics'))
//   }

//   return NextResponse.next()
// }

// export default middleware

// import { NextResponse } from 'next/server'
// import { verifyAuth } from './jwt'

// export default middleware = async req => {
//   const token = req.cookies.get('token')
//   const key = req.cookies.get('key')
//   const url = req.url
//   const validToken = token && key && (await verifyAuth(token, key))

//   // Define Vercel deployment URL

//   // Redirect logic
//   // ...

//   // ** First Time
//   if (!validToken && !url.includes('/login') && url.includes('/dashboards')) {
//     return NextResponse.redirect(`http://localhost:3000'/login`)
//   }

//   if (
//     (!validToken && url != 'http://localhost:3000/login' && url.includes('/dashboards')) ||
//     url == 'http://localhost:3000/'
//   ) {
//     return NextResponse.redirect('http://localhost:3000/login')
//   }

//   if (validToken && (url.includes('/login') || url.includes('/register') || url.includes('/loginFirstTime'))) {
//     return NextResponse.redirect(`http://localhost:3000'/dashboards/analytics`)
//   }

//   return NextResponse.next()

//   // // ** First Second
//   // if (url.includes('/login') && !validToken) {
//   //   return NextResponse.next()
//   // }

//   // if (!validToken && !url.includes('/login') && url.includes('/dashboards')) {
//   //   return NextResponse.redirect('/login')
//   // }

//   // if (validToken && (url.includes('/login') || url.includes('/register') || url.includes('/loginFirstTime'))) {
//   //   return NextResponse.redirect('/dashboards/analytics')
//   // }

//   // return NextResponse.next()
//   // ...
// }

// import { NextResponse } from 'next/server'
// import { verifyAuth } from './jwt'

// const middleware = async req => {
//   const token = req.cookies.get('token')
//   const key = req.cookies.get('key')
//   const url = req.url
//   const validToken = token && key && (await verifyAuth(token, key))

//   // Redirect logic
//   // ...

//   // First Time
//   if (!validToken && !url.includes('/login') && url.includes('/dashboards')) {
//     return NextResponse.redirect('http://localhost:3000/login')
//   }

//   if (
//     (!validToken && url !== 'http://localhost:3000/login' && url.includes('/dashboards')) ||
//     url === 'http://localhost:3000/'
//   ) {
//     return NextResponse.redirect('http://localhost:3000/login')
//   }

//   if (validToken && (url.includes('/login') || url.includes('/register') || url.includes('/loginFirstTime'))) {
//     return NextResponse.redirect('http://localhost:3000/dashboards/analytics')
//   }

//   return NextResponse.next()
// }

// export default middleware

import { NextResponse } from 'next/server'
import { verifyAuth } from './jwt'

const getBaseUrl = req => {
  const protocol = req.headers.get('x-forwarded-proto') || 'http'
  const host = req.headers.get('host')

  // console.log('protocol', protocol)
  // console.log('host', host)
  // console.log('req', req)

  return `${protocol}://${host}`
}

const middleware = async req => {
  const token = req.cookies.get('token')
  const key = req.cookies.get('key')
  const url = req.url
  const validToken = token && key && (await verifyAuth(token, key))

  // Redirect logic
  // ...

  const baseUrl = getBaseUrl(req)

  // First Time
  if (!validToken && !url.includes('/login') && url.includes('/dashboards')) {
    return NextResponse.redirect(`${baseUrl}/login`)
  }

  if ((!validToken && url !== `${baseUrl}/login` && url.includes('/dashboards')) || url === baseUrl) {
    return NextResponse.redirect(`${baseUrl}/login`)
  }

  if (validToken && (url.includes('/login') || url.includes('/register') || url.includes('/loginFirstTime'))) {
    return NextResponse.redirect(`${baseUrl}/dashboards/analytics`)
  }

  if (validToken && url === `${baseUrl}/`) {
    return NextResponse.redirect(`${baseUrl}/dashboards/analytics`)
  }
  if (!validToken && url === `${baseUrl}/`) {
    return NextResponse.redirect(`${baseUrl}/login`)
  }

  if (!validToken && url.includes('/app')) {
    return NextResponse.redirect(`${baseUrl}/login`)
  }

  return NextResponse.next()
}

export default middleware
