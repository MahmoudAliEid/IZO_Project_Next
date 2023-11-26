// ** React Imports
import { Fragment, useState, useEffect } from 'react'
import { getCookie } from 'cookies-next'

// ** Store Imports
// import { useDispatch, useSelector } from 'react-redux'
// import { fetchVariations } from 'src/store/apps/products/variations/getVariationsSlice'
// import { fetchEditVariations } from 'src/store/apps/products/variations/getEditVariationsSlice'
// import { deleteVariationRow } from 'src/store/apps/products/variations/deleteVariationRowSlice'

// ** MUI Imports
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'
import DeleteIcon from '@mui/icons-material/Delete'
import CancelIcon from '@mui/icons-material/Cancel'

// import useSubmitEdit from 'src/hooks/useSubmitEdit'

const DeleteAlert = ({ open, close, idRow, itemId, oldListData, setOldListData }) => {
  // ** State

  const [token, setToken] = useState('')
  const [url, setUrl] = useState('')

  // const store = useSelector(state => state.getEditVariations?.data?.value[0].list)

  // const { handleSubmitEdit } = useSubmitEdit()

  // const mainData = row.map(item => {
  //   const { id, name } = item

  //   return { id, name }
  // })

  //** Functions

  function removeObjectById(arr, idToRemove) {
    const newArray = arr.filter(item => item.id !== idToRemove)

    return newArray
  }

  // if (store) {
  //    setDataList(store)
  // }

  // ** Hooks
  // const dispatch = useDispatch()
  // useEffect(() => {
  //   if (store) {
  //     setDataList(store)
  //   }
  // }, [store])

  // ** Cookies
  useEffect(() => {
    const token = getCookie('token')
    const url = getCookie('apiUrl')

    setToken(token)

    setUrl(url)
  }, [token, url])

  // console.log(data, ' data form alert')

  // const removeObjectById = (arr, idToRemove) => {
  //   const indexToRemove = arr.findIndex(item => item.id === idToRemove)

  //   if (indexToRemove !== -1) {
  //     arr.splice(indexToRemove, 1)
  //   }

  //   return arr
  // }

  const handleDelete = async () => {
    console.log('handleDelete', idRow)

    // console.log(dataList, 'dataList')
    // console.log(values, 'values of form from alert')

    console.log(itemId, 'item id  from alert')

    // const newData = removeObjectById(data, id)
    // if (newData) {
    //   setData(newData)
    // }

    // console.log(data)

    // if (!idRow && !token && !url) {
    //   console.log('Invalid id or token')
    //   close()

    //   return
    // }

    const newOldData = await removeObjectById(oldListData, idRow)

    console.log(newOldData, 'list of newOldData data after remove ')
    if (newOldData && newOldData.length) {
      setOldListData(newOldData)
      close()
    } else {
      setOldListData('')
    }

    // console.log(datalist, 'datalist form delete Variations')

    // dispatch(deleteVariationRow({ idRow }))
    //   .then(() => {
    //     dispatch(fetchVariations(token, url))
    //     dispatch(fetchEditVariations({ itemId }))
    //   })
    //   .then(() => {
    //     close()
    //     handleSubmitEdit(values, itemId)
    //   })
    //   .catch(error => {
    //     console.error('Error deleting user:', error)

    //     // Handle the error as needed
    //     close()
    //   })
  }

  const handleCloseAlert = () => close()

  return (
    <Fragment>
      {/* <Button variant='outlined' onClick={handleClickOpen}>
        Open dialog
      </Button> */}
      <Dialog
        open={open}
        onClose={handleCloseAlert}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>Delete Variation Value!</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>Are you sure you want to delete?</DialogContentText>
        </DialogContent>
        <DialogActions sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
          <Button
            startIcon={<CancelIcon />}
            size='small'
            variant='contained'
            color='success'
            onClick={handleCloseAlert}
          >
            Cancel
          </Button>

          <Button size='small' startIcon={<DeleteIcon />} variant='contained' color='error' onClick={handleDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}

export default DeleteAlert
