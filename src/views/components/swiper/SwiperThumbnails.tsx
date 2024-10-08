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

const SwiperThumbnails = ({ images, direction }: { images: [], direction: Direction }) => {
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

  console.log(images,'images form slider')

  return (
    <Box>
      <Box ref={sliderRef} className='keen-slider' >
        {images && Array.isArray(images)&& images.length>0 && images.map((img, index) => (
          <Box sx={{ display: 'flex', height: 340 }} key={img + index} className='keen-slider__slide'

          >
            <Link href={img}
              about='image'
              target='_blank'
            >

            <img style={{
              width: "100%",
              height: "100%",
              objectFit: "cover"
            }} src={img} alt={`swiper ${index + 1}`} />
              </Link>
          </Box>
        ))
        }
        {/* <Box sx={{ display: 'flex' }} className='keen-slider__slide'>
          <img src='/images/banners/banner-1.jpg' alt='swiper 1' />
        </Box>
        <Box sx={{ display: 'flex' }} className='keen-slider__slide'>
          <img src='/images/banners/banner-2.jpg' alt='swiper 2' />
        </Box>
        <Box sx={{ display: 'flex' }} className='keen-slider__slide'>
          <img src='/images/banners/banner-3.jpg' alt='swiper 3' />
        </Box>
        <Box sx={{ display: 'flex' }} className='keen-slider__slide'>
          <img src='/images/banners/banner-4.jpg' alt='swiper 4' />
        </Box>
        <Box sx={{ display: 'flex' }} className='keen-slider__slide'>
          <img src='/images/banners/banner-5.jpg' alt='swiper 5' />
        </Box> */}
      </Box>

      <Box sx={{ mt: 4 }} ref={thumbnailRef} className='keen-slider thumbnail'>
        {images && Array.isArray(images)&& images.length>0 &&images.map((img, index) => (
          <Box key={img+index} sx={{ width: " 150px", height: "100px", display: 'flex', cursor: 'pointer' }} className='keen-slider__slide'>
            <img style={{
              width: "100%",
              height: "100%",
              objectFit: "cover"
            }}

              src={img} alt={`swiper ${index + 1}`} />
          </Box>
        ))}
        {/* <Box className='keen-slider__slide' sx={{ display: 'flex', cursor: 'pointer' }}>
          <img src='/images/banners/banner-1.jpg' alt='swiper 1' />
        </Box>
        <Box className='keen-slider__slide' sx={{ display: 'flex', cursor: 'pointer' }}>
          <img src='/images/banners/banner-2.jpg' alt='swiper 2' />
        </Box>
        <Box className='keen-slider__slide' sx={{ display: 'flex', cursor: 'pointer' }}>
          <img src='/images/banners/banner-3.jpg' alt='swiper 3' />
        </Box>
        <Box className='keen-slider__slide' sx={{ display: 'flex', cursor: 'pointer' }}>
          <img src='/images/banners/banner-4.jpg' alt='swiper 4' />
        </Box>
        <Box className='keen-slider__slide' sx={{ display: 'flex', cursor: 'pointer' }}>
          <img src='/images/banners/banner-5.jpg' alt='swiper 5' />
        </Box> */}
      </Box>
    </Box>
  )
}

export default SwiperThumbnails
