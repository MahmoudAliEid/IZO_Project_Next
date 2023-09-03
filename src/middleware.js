import { NextResponse } from 'next/server'
import { verifyAuth } from './jwt'

export default middleware = async req => {
  const token = req.cookies.get('token')
  const key = req.cookies.get('key')
  const url = req.url
  const validToken = token && key && (await verifyAuth(token, key))

  // console.log(`validToken: ${validToken}`)

  // // ** secretKey
  // if (secretKey == undefined || token.length === 0 || secretKey == null) {
  //   if (url.includes('/dashboards') || url == 'http://localhost:3000/') {
  //     return NextResponse.redirect('http://localhost:3000/login')
  //   }

  //   return NextResponse.redirect('http://localhost:3000/login')
  // }

  // // ** token
  // if (token == undefined || token.length === 0 || token == null) {
  //   if (url.includes('/dashboards') || url == 'http://localhost:3000/') {
  //     return NextResponse.redirect('http://localhost:3000/login')
  //   }

  //   return NextResponse.redirect('http://localhost:3000/login')
  // }

  // // ** validation
  // if (validToken) {
  //   if (url.includes('/login') || url.includes('/register') || url.includes('/loginFirstTime')) {
  //     return NextResponse.redirect('http://localhost:3000/dashboards/analytics')
  //   }

  //   return NextResponse.redirect('http://localhost:3000/dashboards/analytics')
  // }

  //  || req.nextUrl.pathname.startsWith('/')
  if (
    (!validToken && url != 'http://localhost:3000/login' && url.includes('/dashboards')) ||
    url == 'http://localhost:3000/'
  ) {
    return NextResponse.redirect('http://localhost:3000/login')
  }
  if (validToken && (url.includes('/login') || url.includes('/register') || url.includes('/loginFirstTime'))) {
    return NextResponse.redirect('http://localhost:3000/dashboards/analytics')

    // return NextResponse.next()
  }

  return NextResponse.next()
}
