// ** React Imports
import { MutableRefObject } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import { Direction } from '@mui/material'
import { useTheme } from '@mui/material/styles'

// ** Third Party Components
import { useKeenSlider, KeenSliderPlugin, KeenSliderInstance } from 'keen-slider/react'
// ** Link Next
import Link from 'next/link'

const ThumbnailPlugin = (mainRef: MutableRefObject<KeenSliderInstance | null>): KeenSliderPlugin => {
  return slider => {
    function removeActive() {
      slider.slides.forEach(slide => {
        slide.classList.remove('active')
      })
    }
    function addActive(idx: number) {
      slider.slides[idx].classList.add('active')
    }

    function addClickEvents() {
      slider.slides.forEach((slide, idx) => {
        slide.addEventListener('click', () => {
          if (mainRef.current) mainRef.current.moveToIdx(idx)
        })
      })
    }

    slider.on('created', () => {
      if (!mainRef.current) return
      addActive(slider.track.details.rel)
      addClickEvents()
      mainRef.current.on('animationStarted', main => {
        removeActive()
        const next = main.animator.targetIdx || 0
        addActive(main.track.absToRel(next))
        slider.moveToIdx(next)
      })
    })
  }
}

const CustomSwiperThumbnails = ({ images, direction }: { images: [], direction: Direction }) => {
  // ** Hooks
  const theme = useTheme()
const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    rtl: direction === 'rtl'
})

  const [thumbnailRef] = useKeenSlider<HTMLDivElement>(
    {
      rtl: direction === 'rtl',
      slides: {
        perView: 4,
        spacing: 16
      },
      breakpoints: {
        [`(max-width: ${theme.breakpoints.values.sm}px)`]: {
          slides: {
            perView: 3,
            spacing: 8
          }
        }
      }
    },
    [ThumbnailPlugin(instanceRef)]

  )

  console.log(images, 'images form slider')

  return (
    <Box

    >
      <Box ref={sliderRef} className='keen-slider'

      >
        {images &&
          Array.isArray(images) &&
          images.length > 0 &&

          images.map((img, index) => {
            if (typeof img === 'string') {
              return (
                <Box sx={{ display: 'flex', height: 340, width: '100%' }} key={img + index} className='keen-slider__slide'>
                  <Link href={img} about='image' target='_blank'>
                    <img
                      style={{
                        width: '125%',
                        height: '100%',

                      }}

                      src={img}
                      alt={`swiper ${index + 1}`}
                    />
                  </Link>
                </Box>
              )
            }
            else {
              return (
                 <Box sx={{ display: 'flex', height: 340 ,width:'100%'}} key={img + index} className='keen-slider__slide'>
              <Link href={URL.createObjectURL(img as File)} about='image' target='_blank'>
                <img
                  style={{
                    width: '125%',
                    height: '100%',

                  }}

                  src={URL.createObjectURL(img as File)}
                  alt={`swiper ${index + 1}`}
                />
              </Link>
            </Box>
              )
            }
          }
          )}

      </Box>

      <Box sx={{ mt: 4 }} ref={thumbnailRef} className='keen-slider thumbnail'>
        {images &&
          Array.isArray(images) &&
          images.length > 0 &&
          images.map((img, index) => {
            if (typeof img === 'string') {
              return (
                <Box key={img + index} sx={{ width: ' 150px', height: '100px', display: 'flex', cursor: 'pointer' }} className='keen-slider__slide'>
                  <img
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                    src={img}
                    alt={`swiper ${index + 1}`}
                  />
                </Box>
              )
            }
            else {
              return (
                <Box key={img + index} sx={{ width: ' 150px', height: '100px', display: 'flex', cursor: 'pointer' }} className='keen-slider__slide'>
                  <img
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                    src={URL.createObjectURL(img as File)}
                    alt={`swiper ${index + 1}`}
                  />
                </Box>
              )
            }
          })}

      </Box>
    </Box>
  )
}

export default CustomSwiperThumbnails
