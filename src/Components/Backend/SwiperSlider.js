// SwiperSlides.js
import React, { useState, forwardRef, useImperativeHandle, useRef } from 'react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { A11y, EffectCoverflow } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { IoLogoYoutube } from '../../utils/icons';

const SwiperSlider = forwardRef(({ playTrack, attributes }, ref) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const { albumItems, albumOptions } = attributes;
  const { isExternalLink } = albumOptions;

  // Use useRef to store the swiper instance
  const swiperRef = useRef(null);

  // Expose the swiper instance to parent component using a ref
  useImperativeHandle(ref, () => ({
    slideTo(index) {
      if (swiperRef.current) {
        swiperRef.current.slideTo(index);
      }
    },
  }));


  return (
    <div className="album-cover">
      <div className="swiper">
        <Swiper
          // install Swiper modules
          modules={[EffectCoverflow, A11y]}
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onActiveIndexChange={(val) => {
            setActiveSlide(val.activeIndex);
            playTrack(val.activeIndex);
          }}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          spaceBetween={50}
          slidesPerView='auto'
        >
          {albumItems.map((item, index) => (
            <SwiperSlide key={index}>
              <div className={`${activeSlide === index ? 'activeSlide' : ''}`}>
                <img src={item?.coverSrc} alt={item?.title} />
                {activeSlide === index && isExternalLink === true &&  <div className="overlay">
                  <span onClick={() => item.youtubeSrc ? window.open(`${item.youtubeSrc}`, albumOptions.openNewTab ? '_blank' : '_self') : {}} >
                    <IoLogoYoutube style={{ color: "red", cursor: "pointer", width: "20px" }} className='youtubeIcon' />
                  </span>
                </div>
                }
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
});

export default SwiperSlider;
