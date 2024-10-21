import { useEffect, useState } from 'react'

// ** Custom Components
import CustomHeader from '../../customDialogHeader/CustomHeader'

// ** MUI
import { Select, FormControl, InputLabel, MenuItem, DialogContent, Dialog } from '@mui/material'

// ** cookies
import { getCookie } from 'cookies-next'
import axios from 'axios'

const UpdateStatus = ({ open, toggle, id }) => {
  const [data, setData] = useState({
    list_status: [],
    contact_id: null,
    status: ''
  })

  // ** send data
  const handleUpdateStatus = async status => {
    const token = getCookie('token')
    const URL = getCookie('apiUrl')

    try {
      await axios.get(
        `${URL}/app/react/purchase/update-status-change/${id}?status=${status}&contact_id=${data.contact_id}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      )
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

  console.log(data.status, 'data from update status')

  return (
    <Dialog open={open} toggle={toggle} maxWidth='sm'>
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
                <MenuItem
                  key={index}
                  value={data.list_status[key]}
                  onClick={() => handleUpdateStatus(data.list_status[key])}
                >
                  {data.list_status[key]}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </DialogContent>
    </Dialog>
  )
}

export default UpdateStatus
