'use client'

import * as React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/effect-fade"
import { EffectFade, Mousewheel, Pagination } from "swiper/modules"

const MAIN_IMAGES = [
  "/images/1.png", "/images/2.png", "/images/3.png", "/images/4.png", "/images/5.png"
]
const CTA_IMAGE = "/images/cta2.png"
const LINE_URL = "https://lin.ee/eRDCJbo"

export function DevicePreview() {
  const handleCtaClick = () => {
    window.open(LINE_URL, '_blank')
  }

  return (
    <div className="fixed inset-0 w-full h-full">
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 flex items-center justify-center">
        <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden w-full max-w-[430px] h-[calc(100vh-40px)] flex flex-col">
          {/* メイン画像エリア（70%） */}
          <div className="relative h-[70%] w-full">
            <Swiper
              direction="vertical"
              slidesPerView={1}
              mousewheel
              pagination={{ clickable: true }}
              effect="fade"
              modules={[Mousewheel, Pagination, EffectFade]}
              className="h-full"
            >
              {MAIN_IMAGES.map((src, i) => (
                <SwiperSlide key={i} className="h-full">
                  <div className="relative w-full h-full">
                    <img
                      src={src}
                      alt={`メイン画像${i + 1}`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* CTA画像エリア（30%） - クリック可能 */}
          <div 
            className="relative h-[30%] w-full bg-white cursor-pointer"
            onClick={handleCtaClick}
            role="button"
            aria-label="LINEで友だち追加"
          >
            <img
              src={CTA_IMAGE}
              alt="LINE友だち追加"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  )
} 