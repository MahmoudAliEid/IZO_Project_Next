import { NextResponse } from 'next/server'

export default middleware = req => {
  const token = req.cookies.get('token')
  const url = req.url

  //  || req.nextUrl.pathname.startsWith('/')
  if (!token && url.includes('/dashboards')) {
    return NextResponse.redirect('http://localhost:3000/login')
  }
  if ((token && url.includes('/login')) || url.includes('/register') || url.includes('/loginFirstTime')) {
    return NextResponse.redirect('http://localhost:3000/dashboards/analytics')

    // return NextResponse.next()
  }

  return NextResponse.next()
}
