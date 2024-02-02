import { NextResponse } from 'next/server'
import { verifyAuth } from './jwt'

export default middleware = async req => {
  const token = req.cookies.get('token')
  const key = req.cookies.get('key')
  const url = req.url
  const validToken = token && key && (await verifyAuth(token, key))

  // Define Vercel deployment URL
  const vercelDeploymentURL = process.env.VERCEL_URL || 'http://localhost:3000'

  // Redirect logic
  // ...

  // ** First Time
  if (!validToken && !url.includes('/login') && url.includes('/dashboards')) {
    return NextResponse.redirect(`${vercelDeploymentURL}/login`)
  }

  if (validToken && (url.includes('/login') || url.includes('/register') || url.includes('/loginFirstTime'))) {
    return NextResponse.redirect(`${vercelDeploymentURL}/dashboards/analytics`)
  }

  return NextResponse.next()
  // ...
}
