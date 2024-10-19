import { useState, useEffect } from 'react'
import { getCookie } from 'cookies-next'
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'

const useThemeColor = () => {
  const [themeColor, setThemeColor] = useState(hexToRGBA('#ec6608', 0.5))
  const [mainColor, setMainColor] = useState('#ec6608')

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newLocalThemeColor = getCookie('localThemeColor')
      if (newLocalThemeColor === undefined) {
        setThemeColor(hexToRGBA('#ec6608', 0.5))
      }
      if (newLocalThemeColor !== undefined) {
        if (newLocalThemeColor !== themeColor) {
          setThemeColor(hexToRGBA(newLocalThemeColor, 0.5))
          setMainColor(newLocalThemeColor)
        }
      }
    }, 1000) // Check every second

    return () => clearInterval(intervalId)
  }, [themeColor])

  return { themeColor, mainColor }
}

export default useThemeColor
