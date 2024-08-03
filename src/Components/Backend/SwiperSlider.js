// SwiperSlides.js
import React, { useState, forwardRef, useImperativeHandle, useRef } from 'react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { A11y, EffectCoverflow } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { songs } from '../../utils/options';

const SwiperSlider = forwardRef(({ playTrack, attributes }, ref) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const { albumItems } = attributes;

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
            swiperRef.current = swiper; // Set swiper instance
          }}
          onActiveIndexChange={(val) => {
            setActiveSlide(val.activeIndex);
            playTrack(val.activeIndex); // Play track on slide change
          }}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          spaceBetween={50}
          slidesPerView={5}
        >
          {albumItems.map((item, index) => (
            <SwiperSlide key={index}>
              <div className={`${activeSlide === index ? 'activeSlide' : ''}`}>
                <img src={item?.coverSrc} alt={item?.title} />
                <div className="overlay">
                  <a href={item?.youtubeSrc} target="_blank" rel="noopener noreferrer">
                    <ion-icon name="logo-youtube"></ion-icon>
                  </a>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
});

export default SwiperSlider;
