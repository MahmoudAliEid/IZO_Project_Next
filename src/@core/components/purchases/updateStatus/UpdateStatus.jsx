import { useEffect, useState } from 'react'

// ** Custom Components
import CustomHeader from '../../customDialogHeader/CustomHeader'

// ** redux
import { useDispatch } from 'react-redux'

// ** MUI
import { Select, FormControl, InputLabel, MenuItem, DialogContent, Dialog, Button, DialogActions } from '@mui/material'

// ** cookies
import { getCookie } from 'cookies-next'
import axios from 'axios'

const UpdateStatus = ({ open, toggle, id }) => {
  const [data, setData] = useState({
    list_status: [],
    contact_id: null,
    status: ''
  })
  const fontStyle = getCookie('fontStyle')

  const dispatch = useDispatch()

  // ** send data
  const handleUpdateStatus = async () => {
    const token = getCookie('token')
    const URL = getCookie('apiUrl')

    try {
      await axios
        .get(
          `${URL}/app/react/purchase/update-status-change/${id}?status=${data.status}&contact_id=${data.contact_id}`,

          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        )
        .then(() => {
          dispatch(fetchPurchases({ token }))
        })
    } catch (error) {
      // throw error
      console.error(error)
    }
  }

  // ** fetch status data

  useEffect(() => {
    const token = getCookie('token')
    const URL = getCookie('apiUrl')

    const fetchStatus = async () => {
      try {
        const response = await axios.get(`${URL}/app/react/purchase/update-status/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })

        const data = response.data
        setData(data?.value)
      } catch (error) {
        // throw error
        console.error(error)
      }
    }
    fetchStatus()
  }, [id])

  return (
    <Dialog
      open={open}
      toggle={toggle}
      minWidth='lg'
      fullWidth
      sx={{
        textTransform: fontStyle
      }}
    >
      <CustomHeader title='Update Status' divider={true} handleClose={toggle} />
      <DialogContent>
        <FormControl fullWidth>
          <InputLabel id='status'>Status</InputLabel>
          <Select
            labelId='status'
            id='status'
            value={data.status}
            label='Status'
            onChange={e => setData({ ...data, status: e.target.value })}
          >
            {data &&
              Object.keys(data.list_status).map((key, index) => (
                <MenuItem key={index} value={data.list_status[key]}>
                  {data.list_status[key]}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button variant={'outlined'} onClick={toggle} color='error'>
          Cancel
        </Button>
        <Button
          variant={'contained'}
          onClick={() => {
            toggle()
            handleUpdateStatus()
          }}
          color='primary'
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default UpdateStatus
