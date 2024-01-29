import { useState, useEffect } from 'react'
import { getCookie } from 'cookies-next'
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'

const useThemeColor = () => {
  const [themeColor, setThemeColor] = useState(hexToRGBA('#ec6608', 0.5))

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newLocalThemeColor = getCookie('localThemeColor')
      if (newLocalThemeColor === undefined) {
        setThemeColor(hexToRGBA('#ec6608', 0.5))
      }
      if (newLocalThemeColor !== undefined) {
        if (newLocalThemeColor !== themeColor) {
          setThemeColor(hexToRGBA(newLocalThemeColor, 0.5))
        }
      }
    }, 1000) // Check every second

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId)
  }, [themeColor]) // Add themeColor as a dependency

  return { themeColor }
}

export default useThemeColor
