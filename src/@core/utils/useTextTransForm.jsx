import { useState, useEffect } from 'react'
import { getCookie } from 'cookies-next'

const useTextTransform = () => {
  const [fontStyle, setFontStyle] = useState(getCookie('fontStyle') || 'none')

  useEffect(() => {
    const updateFontStyle = () => {
      const newFontStyle = getCookie('fontStyle')
      if (newFontStyle !== fontStyle) {
        setFontStyle(newFontStyle || 'none')
      }
    }

    updateFontStyle() // Initial check on mount
    const intervalId = setInterval(updateFontStyle, 1000) // Check every second

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId)
  }, [fontStyle]) // Add fontStyle as a dependency to re-run effect if it changes

  return { fontStyle }
}

export default useTextTransform
