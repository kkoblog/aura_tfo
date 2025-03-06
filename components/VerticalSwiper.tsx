'use client';  // これを追加して、クライアントコンポーネントとして指定

import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, Pagination, EffectFade } from 'swiper/modules';
import { useRef, useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import type { SwiperRef } from 'swiper/react';

// メイン画像のパス（既存）
const mainImages = [
  '/images/iti.png',
  '/images/ni.png',
  '/images/san.png',
  '/images/yon.png',
  '/images/go.png',
];

// 下部に表示する画像のパス
const bottomImages = [
  '/images/tate.png',
  '/images/cta.png',
  '/images/cta.png',
  '/images/cta.png',
  '/images/cta.png',
];

// 公式LINEのURL
const LINE_URL = 'https://lin.ee/5BbBz9O';

// ボタン領域の座標
const buttonAreas = [
  [], // 1枚目はボタンなし（スワイプのみ）
  [
    [20, 55, 80, 65], // 「はい」ボタンの領域
    [20, 70, 80, 80]  // 「いいえ」ボタンの領域
  ],
  [
    [20, 55, 80, 65], // 3枚目の「はい」ボタンの領域
    [20, 70, 80, 80]  // 3枚目の「いいえ」ボタンの領域
  ],
  [
    [20, 55, 80, 65], // 4枚目の「はい」ボタンの領域
    [20, 70, 80, 80]  // 4枚目の「いいえ」ボタンの領域
  ],
  [] // 5枚目はボタンなし
];

export default function VerticalSwiper() {
  const swiperRef = useRef<SwiperRef>(null);
  const [showLoading, setShowLoading] = useState(false);
  const [loadingComplete, setLoadingComplete] = useState(false);

  // スワイプ制御のためのイベントリスナー
  useEffect(() => {
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
  }, []);

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
    window.open(LINE_URL, '_blank');
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
            className={`w-full h-full bg-black flex flex-col items-center justify-center p-4 ${index > 0 ? 'swiper-no-swiping' : ''}`}
          >
            {/* メイン画像 - クリックイベント付き */}
            <div 
              className="relative w-full flex-1 flex items-center justify-center"
              onClick={(e) => handleImageClick(e, index)}
            >
              <img
                src={image}
                alt={`Slide ${index + 1}`}
                className="max-w-full max-h-full object-contain touch-none select-none"
                style={{ 
                  width: 'auto', 
                  height: 'auto', 
                  maxWidth: '100%', 
                  maxHeight: '100%'
                }}
              />
            </div>
            
            {/* 下部画像 - 2枚目以降はクリック可能なCTA */}
            <div 
              className={`w-full mt-4 flex justify-center ${index > 0 ? 'cursor-pointer' : ''}`} 
              style={{ maxHeight: '20vh' }}
              onClick={index > 0 ? handleCtaClick : undefined}
            >
              <img
                src={bottomImages[index]}
                alt={index === 0 ? `Bottom image` : 'LINE公式アカウントに登録'}
                className="max-w-full max-h-full object-contain select-none"
                style={{ 
                  width: 'auto', 
                  height: 'auto', 
                  maxWidth: '100%', 
                  maxHeight: '100%'
                }}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
} 