import { useEffect, useState } from 'react'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'

// ** MUI Components

import { fetchPurchaseAttachment } from 'src/store/apps/purchases/Actions/getViewAttachmentPurchase'
import CustomSlider from 'src/@core/Global/CustomSlider'

const ViewAttachment = ({ open, toggle, id }) => {
  const [attachment, setAttachment] = useState(null) // Initially setting data as null

  // ** Function to close dialog
  const handleClose = () => {
    toggle()
  }

  // ** Hook
  const dispatch = useDispatch()

  useEffect(() => {
    if (id) {
      dispatch(fetchPurchaseAttachment({ id }))
    }
  }, [id, dispatch])

  // Update data when fetchData changes
  const fetchData = useSelector(state => state.getViewAttachmentPurchase?.data?.value)

  useEffect(() => {
    if (fetchData) {
      setAttachment(fetchData)
    }
  }, [fetchData])

  console.log('data of attachment', attachment)

  return <CustomSlider open={open} toggle={handleClose} data={attachment} />
}

export default ViewAttachment
