'use client';  // これを追加して、クライアントコンポーネントとして指定

import * as React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, Pagination, EffectFade } from 'swiper/modules';
import { useRef, useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import type { SwiperRef } from 'swiper/react';

// メイン画像のパス（1〜11まで）
const mainImages = [
  '/images/1.png',
  '/images/2.png',
  '/images/3.png',
  '/images/4.png',
  '/images/5.png',
  '/images/6.png',
  '/images/7.png',
  '/images/8.png',
  '/images/9.png',
  '/images/10.png',
  '/images/11.png',
];

// 下部に表示する画像のパス（仮に全てcta.pngで揃えます。必要に応じて変更してください）
const bottomImages = [
  '/images/cta2.png', // 1枚目
  '/images/cta2.png', // 2枚目
  '/images/cta2.png', // 3枚目
  '/images/cta2.png', // 4枚目
  '/images/cta2.png', // 5枚目
  '/images/cta2.png', // 6枚目
  '/images/cta2.png', // 7枚目
  '/images/cta2.png', // 8枚目
  '/images/cta2.png', // 9枚目
  '/images/cta2.png', // 10枚目
  '/images/cta2.png', // 11枚目
];

// 公式LINEのURL
const CTA_URL = 'https://lin.ee/eRDCJbo';

// ボタン領域の座標（2〜10枚目に仮でボタン領域を設定。必要に応じて調整してください）
const buttonAreas = [
  [], // 1枚目はボタンなし
  [ [20, 55, 80, 65], [20, 70, 80, 80] ], // 2枚目
  [ [20, 55, 80, 65], [20, 70, 80, 80] ], // 3枚目
  [ [20, 55, 80, 65], [20, 70, 80, 80] ], // 4枚目
  [ [20, 55, 80, 65], [20, 70, 80, 80] ], // 5枚目
  [ [20, 55, 80, 65], [20, 70, 80, 80] ], // 6枚目
  [ [20, 55, 80, 65], [20, 70, 80, 80] ], // 7枚目
  [ [20, 55, 80, 65], [20, 70, 80, 80] ], // 8枚目
  [ [20, 55, 80, 65], [20, 70, 80, 80] ], // 9枚目
  [ [20, 55, 80, 65], [20, 70, 80, 80] ], // 10枚目
  [], // 11枚目はボタンなし
];

function SwipeGuide() {
  return null; // スワイプガイドを非表示にする
}

export default function VerticalSwiper() {
  const swiperRef = useRef<SwiperRef>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Swiperのスライド変更時にClarityへカスタムイベント送信
  const handleSlideChange = () => {
    if (typeof window !== 'undefined' && (window as any).clarity && swiperRef.current?.swiper) {
      (window as any).clarity('set', 'slide', swiperRef.current.swiper.activeIndex);
    }
  };

  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>, slideIndex: number) => {
    if (slideIndex === 0 || slideIndex >= buttonAreas.length - 1) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    const areas = buttonAreas[slideIndex];
    for (const [x1, y1, x2, y2] of areas) {
      if (x >= x1 && x <= x2 && y >= y1 && y <= y2) {
        swiperRef.current?.swiper.slideNext();
        break;
      }
    }
  };

  // CTA画像クリック時の処理
  const handleCtaClick = () => {
    window.open(CTA_URL, '_blank');
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden">
      <Swiper
        ref={swiperRef}
        direction={'horizontal'}
        slidesPerView={1}
        spaceBetween={0}
        mousewheel={true}
        pagination={{ clickable: true, dynamicBullets: true }}
        effect={'fade'}
        fadeEffect={{ crossFade: true }}
        modules={[Mousewheel, Pagination, EffectFade]}
        className="w-full h-full"
        touchRatio={1.5}
        resistance={true}
        resistanceRatio={0.85}
        preventClicks={true}
        noSwipingClass="swiper-no-swiping"
        noSwipingSelector=".pagination-bullet"
        onSlideChange={handleSlideChange}
      >
        {mainImages.map((image, index) => (
          <SwiperSlide 
            key={index} 
            className="w-full h-full bg-white p-0 m-0"
          >
            <div className="flex flex-col w-full h-[100dvh]" style={{
              paddingTop: 'env(safe-area-inset-top)',
              paddingBottom: 'env(safe-area-inset-bottom)',
              paddingLeft: 'env(safe-area-inset-left)',
              paddingRight: 'env(safe-area-inset-right)',
            }}>
              {/* メイン画像エリア */}
              <div
                className="flex items-center justify-center w-full h-[70vh]"
                onClick={(e) => handleImageClick(e, index)}
              >
                <img
                  src={image}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-contain select-none"
                  style={{ maxWidth: '100vw', maxHeight: '70vh' }}
                />
              </div>
              {/* CTA画像エリア */}
              <div
                className="relative w-full flex items-center justify-center h-[30vh]"
              >
                <a
                  href="https://beauty.hotpepper.jp/slnH000291361/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-full flex items-center justify-center"
                  style={{ maxHeight: '100%', maxWidth: '100%', marginTop: '-24px' }}
                >
                  <img
                    src={bottomImages[index]}
                    alt={index === 0 ? `Bottom image` : 'LINE公式アカウントに登録'}
                    className="w-full h-full object-contain select-none cursor-pointer"
                    style={{ maxHeight: '100%', maxWidth: '100%' }}
                  />
                </a>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
} 