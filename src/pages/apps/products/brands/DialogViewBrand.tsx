import React, { useEffect } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import { fetchBrandDetails } from 'src/store/apps/products/brands/getbrandDetailsSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Box } from '@mui/system'
import { Chip } from '@mui/material'

interface DialogViewBrandProps {
    open: boolean
    onClose: () => void
    brandID: any // replace with your brand type
}

const DialogViewBrand: React.FC<DialogViewBrandProps> = ({ open, onClose, brandID }) => {
    const dispatch = useDispatch()
    const [brand, setBrand] = React.useState<any>({})
    useEffect(() => {
        if (brandID !== undefined) {
            dispatch(fetchBrandDetails(brandID))
        }
    }, [brandID])

    const brandDetailsResponse = useSelector(
        (state: { getbrandDetailsSlice: { data: any } }) => state.getbrandDetailsSlice.brand
    )

    if (brandDetailsResponse.status === 200 && brandDetailsResponse.value && brandDetailsResponse.value.info) {
        console.log(brandDetailsResponse.value.info, 'brandDetailsResponse for view ✨✨✨✨✨✨')
    }

    useEffect(() => {
        if (brandDetailsResponse.status === 200 && brandDetailsResponse.value && brandDetailsResponse.value.info) {
            setBrand(brandDetailsResponse.value.info)
        }
    }, [brandDetailsResponse])

    return (
        <Dialog open={open} onClose={onClose}
            maxWidth='md'
            fullWidth={true}
        >
            <DialogTitle>Brand Details</DialogTitle>
            <DialogContent>
                {brand && brand.name && (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
                            <Box sx={{ width: '50%' }}>
                                <label>Name</label>
                                <Chip label={brand.name} sx={{ marginLeft: '1rem' }} />
                            </Box>
                            <Box sx={{ width: '50%' }}>
                                <label>Description</label>
                                <Chip label={brand.description} sx={{ marginLeft: '1rem' }} />
                            </Box>
                        </Box>
                        <Box sx={{ width: '50%' }}>
                            <label>Use for repair</label>
                            <Chip label={brand.use_for_repair} sx={{ marginLeft: '1rem' }} />
                        </Box>
                        <Box sx={{ width: '50%' }}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'start',
                                justifyContent: 'start',
                                gap: '1rem'
                            }}
                        >
                            <span
                            >
                                Image
                            </span>
                            <img src={brand.image_url} alt='' style={{
                                borderRadius: '15px', width: '200px', height: '200px',
                                objectFit: 'contain'
                            }} />
                        </Box>
                    </Box>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color='primary'>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default DialogViewBrand
