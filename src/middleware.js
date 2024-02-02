import { NextResponse } from 'next/server'
import { verifyAuth } from './jwt'

const getAbsoluteUrl = (req, path) => {
  // Determine protocol based on the environment
  const protocol = req.headers['x-forwarded-proto'] || 'http'

  // Determine host based on the environment
  const host = req.headers['x-forwarded-host'] || req.headers.host || 'localhost:3000'

  return `${protocol}://${host}${path}`
}

const middleware = async req => {
  const token = req.cookies.get('token')
  const key = req.cookies.get('key')
  const path = req.nextUrl.pathname // Extract the path from the URL
  const validToken = token && key && (await verifyAuth(token, key))

  // If token is not valid and user is not on the login page, redirect to login
  if (!validToken && !path.includes('/login') && path.includes('/dashboards/')) {
    return NextResponse.redirect(getAbsoluteUrl(req, '/login'))
  }
  if (!validToken && !path.includes('/login')) {
    return NextResponse.redirect(getAbsoluteUrl(req, '/login'))
  }

  // If token is valid and user is on the login, register, or loginFirstTime page, redirect to dashboards/analytics
  if (validToken && (path === '/login' || path === '/register' || path === '/loginFirstTime')) {
    return NextResponse.redirect(getAbsoluteUrl(req, '/dashboards/analytics'))
  }

  // If token is valid and user is on the home page, redirect to dashboards/analytics
  if (validToken && path === '/' && !path.includes('/dashboards')) {
    return NextResponse.redirect(getAbsoluteUrl(req, '/dashboards/analytics'))
  }

  // if token is not valid and user is on the dashboards page, redirect to login
  if (!validToken && !path.includes('/login') && path.includes('/dashboards/')) {
    return NextResponse.redirect(getAbsoluteUrl(req, '/login'))
  }

  // If token is not valid and user is on the app page, redirect to login
  if (!validToken && !path.includes('/login') && path.includes('/app/')) {
    return NextResponse.redirect(getAbsoluteUrl(req, '/login'))
  }

  // If token is not valid and user is on the home page, redirect to login
  if (!validToken && !path.includes('/login') && path === '/') {
    return NextResponse.redirect(getAbsoluteUrl(req, '/login'))
  }

  return NextResponse.next()
}

export default middleware
