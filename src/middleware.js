import { NextResponse } from 'next/server'

// import {decode} from "jsonwebtoken"

export default middleware = req => {
  const token = req.cookies.get('token')
  const url = req.url

  // const vaildToken=decode(token,SECRT-KEY)

  //  || req.nextUrl.pathname.startsWith('/')
  if ((token == null && url.includes('/dashboards')) || url == 'http://localhost:3000/') {
    return NextResponse.redirect('http://localhost:3000/login')
  }
  if (token != null && (url.includes('/login') || url.includes('/register') || url.includes('/loginFirstTime'))) {
    return NextResponse.redirect('http://localhost:3000/dashboards/analytics')

    // return NextResponse.next()
  }

  return NextResponse.next()
}
