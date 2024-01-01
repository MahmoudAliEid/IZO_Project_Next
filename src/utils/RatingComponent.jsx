'use client'

import * as React from 'react'
import Box from '@mui/material/Box'
import { useEffect } from 'react'
import { Rating } from 'react-simple-star-rating'

import Stack from '@mui/material/Stack'
import Chip from '@mui/material/Chip'

import { useTheme } from '@mui/material/styles'

// ** MUI Imports
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'

export default function RatingComponent() {
  const [open, setOpen] = React.useState(localStorage.getItem('rating') ? false : true)
  const [feedback, setFeedback] = React.useState(false)

  const handleClose = () => setOpen(false)
  const handelCloseFeedback = () => setFeedback(false)

  const theme = useTheme()

  // Catch Rating value
  const handleRating = rate => {
    //  close modal after rating
    setOpen(false)

    // open feedback modal
    setTimeout(() => {
      setFeedback(true)
    }, 1000)

    localStorage.setItem('rating', rate)
  }

  useEffect(() => {
    if (feedback) {
      setTimeout(() => {
        setFeedback(false)
      }, 2000)
    }
  }, [feedback])

  return (
    <React.Fragment>
      <Dialog open={open} maxWidth='sm' fullWidth={true} onClose={handleClose} aria-labelledby='max-width-dialog-title'>
        <DialogContent
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <DialogContentText id='alert-dialog-description'>
            <Box>
              <h1
                style={{
                  textAlign: 'center',
                  color: theme.palette.primary.main
                }}
              >
                Rate Our Service
              </h1>
              <Rating
                onClick={handleRating}
                SVGstyle={{
                  margin: '0px 15px'
                }}
                transition={true}
              />
              <Stack sx={{ px: 6, py: 5 }} direction='row' justifyContent={'space-between'} gap={2} width={1}>
                <Chip
                  label='Bad'
                  variant='outlined'
                  style={{
                    color: theme.palette.primary.main
                  }}
                />{' '}
                <Chip
                  label='Excellent'
                  variant='outlined'
                  style={{
                    color: theme.palette.primary.main
                  }}
                />
              </Stack>
            </Box>
          </DialogContentText>
        </DialogContent>
      </Dialog>

      <Dialog
        open={feedback}
        maxWidth='sm'
        fullWidth={true}
        onClose={handelCloseFeedback}
        aria-labelledby='max-width-dialog-title'
      >
        <DialogContent
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <DialogContentText id='alert-dialog-description'>
            <Box>
              <h1
                style={{
                  textAlign: 'center',
                  color: theme.palette.primary.main
                }}
              >
                Thank you for your feedback! ✨
              </h1>
            </Box>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  )
}
