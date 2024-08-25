import { useState, useEffect } from 'react'
import { Grid, Typography } from '@mui/material'

// ** Custom Components
import ProgressCustomization from 'src/views/components/progress/ProgressCircularCustomization'

const ListLoading = () => {
  const [triggerLoadingList, setTriggerLoadingList] = useState(true)

  // ** handle loading list
  useEffect(() => {
    const timer = setTimeout(() => {
      setTriggerLoadingList(false)
    }, 8000)

    return () => clearTimeout(timer) // Cleanup timer on unmount
  }, [])

  return (
    <Grid container alignItems='center' justifyContent='center' sx={{ padding: '20px' }}>
      {triggerLoadingList ? <ProgressCustomization /> : <Typography>No Data Found...</Typography>}
    </Grid>
  )
}

export default ListLoading
