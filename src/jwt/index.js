import jwt_decode from 'jwt-decode'

export const verifyAuth = async (token, key) => {
  const tokenSecret = token
  const keySecret = key

  // const stringToken = token.toString()
  // console.log('Token received:', token.value)

  try {
    const verification = await jwt_decode(tokenSecret.value)

    // console.log('verification', verification)
    // console.log('verification.secret_k', typeof verification.secret_k)
    // console.log('keySecret.value', typeof keySecret.value)

    if (verification.secret_k === keySecret.value) {
      return true
    } else {
      return null
    }
  } catch (e) {
    // console.log('error auth verify:=>', e)

    return null
  }
}
