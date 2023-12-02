import React, { Fragment } from 'react'
import Lottie from 'lottie-react'
import errorAnimation from '/src/animation/errorAnimation.json'
import successAnimation from '/src/animation/successAnimation.json'
import loadingAnimation from '/src/animation/loadingAnimation.json'
import { Dialog, DialogContent } from '@mui/material'

const LottieAnimation = ({ open, onClose, storeWarrantiesResponseStatuse }) => {
  // console.log(storeWarrantiesResponseStatuse, '===> storeWarrantiesResponseStatuse')

  return (
    <Fragment>
      <Dialog open={open} onClose={onClose}>
        <DialogContent>
          <Lottie
            animationData={
              storeWarrantiesResponseStatuse.loading
                ? loadingAnimation
                : storeWarrantiesResponseStatuse.success
                ? successAnimation
                : storeWarrantiesResponseStatuse.error
                ? errorAnimation
                : null
            }
            style={{
              width: '300px',
              height: '300px'
            }}
          />
        </DialogContent>
      </Dialog>
    </Fragment>
  )
}

export default LottieAnimation
