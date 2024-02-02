import { NextResponse } from 'next/server'
import { verifyAuth } from './jwt'

const middleware = async req => {
  const token = req.cookies.get('token')
  const key = req.cookies.get('key')
  const path = req.nextUrl.pathname // Extract the path from the URL
  const validToken = token && key && (await verifyAuth(token, key))

  // Redirect logic
  // ...

  // ** First Time
  if (!validToken && !path.includes('/login') && path.includes('/dashboards')) {
    return NextResponse.redirect('/login')
  }

  if (validToken && (path.includes('/login') || path.includes('/register') || path.includes('/loginFirstTime'))) {
    return NextResponse.redirect('/dashboards/analytics')
  }

  return NextResponse.next()
  // ...
}

export default middleware
