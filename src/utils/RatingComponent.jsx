'use client'

import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import { useState, useEffect } from 'react'
import { Rating } from 'react-simple-star-rating'

import Modal from '@mui/material/Modal'
import Stack from '@mui/material/Stack'
import Item from '@mui/material/Stack'
import Chip from '@mui/material/Chip'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#fff',
  borderRadius: 2,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  border: '0px solid transparent'
}

export default function RatingComponent() {
  const [open, setOpen] = React.useState(localStorage.getItem('rating') ? false : true)
  const [feedback, setFeedback] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const handelCloseFeedback = () => setFeedback(false)

  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)

  // Catch Rating value
  const handleRating = rate => {
    // set rating
    setRating(rate)

    //  close modal after rating
    setOpen(false)

    // open feedback modal
    setTimeout(() => {
      setFeedback(true)
    }, 1000)

    // localStorage.setItem('rating', rate)
  }

  // Optinal callback functions
  const onPointerMove = (value, index) => setHoverRating(prev => value)

  useEffect(() => {
    if (feedback) {
      setTimeout(() => {
        setFeedback(false)
      }, 2000)
    }
  }, [feedback])

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <h1
            style={{
              textAlign: 'center'
            }}
          >
            Rate Our Service
          </h1>
          <Rating
            onClick={handleRating}
            onPointerMove={onPointerMove}
            SVGstyle={{
              margin: '0px 15px'
            }}
            transition={true}
          />
          <Stack sx={{ px: 6, py: 5 }} direction='row' justifyContent={'space-between'} gap={2} width={1}>
            <Chip label='Bad' variant='outlined' /> <Chip label='Excellent' variant='outlined' />
          </Stack>
        </Box>
      </Modal>
      <Modal
        open={feedback}
        onClose={handelCloseFeedback}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>Thank you for your feedback! ✨</Box>
      </Modal>
    </div>
  )
}
