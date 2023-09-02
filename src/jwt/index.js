import { jwtVerify } from 'jose'

export const getSecretKey = () => {
  const secretKey = req.cookies.get('key')
  if (secretKey === null || secretKey === undefined || secretKey.length === 0 || !secretKey) {
    return new Error('No secret key')
  }

  return secretKey
}
export const verifyAuth = async token => {
  try {
    const verification = await jwtVerify(token, new TextDecoder().encode(getSecretKey()))

    return verification.payload
  } catch (e) {
    return null
  }
}
