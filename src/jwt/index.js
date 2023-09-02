import * as jose from 'jose'

export const getSecretKey = req => {
  const secretKey = req.cookies.get('key')
  if (secretKey === null || secretKey === undefined || secretKey.length === 0 || !secretKey) {
    return new Error('No secret key')
  }

  const textEncoder = new TextEncoder()
  const stringKey = toString(secretKey)

  return textEncoder.encode(stringKey)
}
export const verifyAuth = async (token, req) => {
  const stringToken = toString(token)

  try {
    const verification = await jose.jwtVerify(stringToken.replace('Bearer ', ''), getSecretKey(req))
    console.log('verification', verification)

    return verification.payload
  } catch (e) {
    console.log('error auth verify:=>', e)

    return null
  }
}
