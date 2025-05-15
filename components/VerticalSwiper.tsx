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
  '/images/cta.png', // 1枚目
  '/images/cta.png', // 2枚目
  '/images/cta.png', // 3枚目
  '/images/cta.png', // 4枚目
  '/images/cta.png', // 5枚目
  '/images/cta.png', // 6枚目
  '/images/cta.png', // 7枚目
  '/images/cta.png', // 8枚目
  '/images/cta.png', // 9枚目
  '/images/cta.png', // 10枚目
  '/images/cta.png', // 11枚目
];

// 公式LINEのURL
const CTA_URL = 'https://beauty.hotpepper.jp/slnH000291361/';

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

export default function VerticalSwiper() {
  const swiperRef = useRef<SwiperRef>(null);
  const [showLoading, setShowLoading] = useState(false);
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // スワイプ制御のためのイベントリスナー
  useEffect(() => {
    if (!isMounted) return;

    const swiper = swiperRef.current?.swiper;
    if (!swiper) return;

    // スライド変更時のイベントリスナー
    const handleSlideChange = () => {
      const currentIndex = swiper.activeIndex;
      
      // 1枚目はスワイプ可能、2枚目以降はスワイプ不可
      if (currentIndex >= 1) {
        swiper.allowTouchMove = false; // タッチによるスワイプを無効化
        swiper.mousewheel.disable(); // マウスホイールを無効化
      } else {
        swiper.allowTouchMove = true; // タッチによるスワイプを有効化
        swiper.mousewheel.enable(); // マウスホイールを有効化
      }
    };

    // 初期状態の設定
    handleSlideChange();
    
    // イベントリスナーの登録
    swiper.on('slideChange', handleSlideChange);
    
    // クリーンアップ
    return () => {
      swiper.off('slideChange', handleSlideChange);
    };
  }, [isMounted]);

  if (!isMounted) {
    return null;
  }

  // 画像上のクリック位置を計算してボタン領域内かチェック
  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>, slideIndex: number) => {
    if (slideIndex === 0 || slideIndex >= 4) return; // 1枚目と5枚目はスキップ
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    // ボタン領域内かチェック
    const areas = buttonAreas[slideIndex];
    for (const [x1, y1, x2, y2] of areas) {
      if (x >= x1 && x <= x2 && y >= y1 && y <= y2) {
        // 4枚目の場合はローディング画面を表示
        if (slideIndex === 3) {
          setShowLoading(true);
          // 3秒後にローディング完了、その後最終スライドへ
          setTimeout(() => {
            setLoadingComplete(true);
            setTimeout(() => {
              swiperRef.current?.swiper.slideNext();
              setShowLoading(false);
              setLoadingComplete(false);
            }, 500);
          }, 3000);
        } else {
          // それ以外は通常通り次のスライドへ
          swiperRef.current?.swiper.slideNext();
        }
        break;
      }
    }
  };

  // CTA画像クリック時の処理
  const handleCtaClick = () => {
    window.open(CTA_URL, '_blank');
  };

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden">
      {/* ローディング画面 */}
      {showLoading && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black bg-opacity-80">
          <div className="text-white text-xl mb-4">
            {loadingComplete ? "完了しました！" : "アンケート結果を出しています..."}
          </div>
          {!loadingComplete && (
            <div className="w-12 h-12 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
          )}
        </div>
      )}
      
      <Swiper
        ref={swiperRef}
        direction={'vertical'}
        slidesPerView={1}
        spaceBetween={0}
        mousewheel={true}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
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
                {/* 1枚目だけスワイプ案内をCTAの直上に絶対配置 */}
                {index === 0 && (
                  <div className="absolute top-0 left-0 w-full flex flex-col items-center z-10">
                    <span className="text-2xl animate-bounce text-gray-400">↑</span>
                    <span className="text-gray-500 text-sm tracking-wide font-medium mt-1">スワイプ</span>
                  </div>
                )}
                <a
                  href="https://beauty.hotpepper.jp/slnH000291361/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-full flex items-center justify-center"
                  style={{ maxHeight: '100%', maxWidth: '100%' }}
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