"use client";

import Image from 'next/image';
import { createPortal } from 'react-dom';
import { useEffect, useRef, useState } from 'react';
import styles from '../SpaceJourney.module.css';

interface TesseractGridViewProps {
  isVisible: boolean;
  onExit?: () => void;
  exitLabel?: string;
}

const CDN = 'https://res.cloudinary.com/dyezhjnea/image/upload';

const GRID_IMAGES = [
  { id: 'IMG-20250210-WA0000_jzosiq',       alt: 'Photo' },
  { id: 'IMG-20240914-WA0026_iwjscl',       alt: 'Photo' },
  { id: 'IMG-20240905-WA0022_ofnafk',       alt: 'Photo' },
  { id: 'IMG-20250110-WA0036_yopih3',       alt: 'Photo' },
  { id: 'IMG-20230221-WA0007_hvilao',       alt: 'Photo' },
  { id: 'IMG-20240512-WA0017_fquhow',       alt: 'Photo' },
  { id: 'IMG-20250105-WA0009_npcddw',       alt: 'Photo' },
  { id: 'IMG-20220917-WA0016_drwlul',       alt: 'Photo' },
  { id: 'IMG_20210904_172332_lvnacs',        alt: 'Photo' },
  { id: 'IMG_20191231_135819-01_uk7zcd',    alt: 'Photo' },
  { id: 'IMG_1260_th8blw',                  alt: 'Photo' },
  { id: 'IMG_0413_yhyylv',                  alt: 'Photo' },
  { id: '1711743922832_x7tsgg',             alt: 'Photo' },
  { id: 'IMG_0138_id4sqn',                  alt: 'Photo' },
  { id: '1000081667_n1brct',                alt: 'Photo' },
  { id: '1000123048_zebpoj',                alt: 'Photo' },
  { id: '1000117014_s9mpvw',                alt: 'Photo' },
];

export default function TesseractGridView({ isVisible, onExit, exitLabel }: TesseractGridViewProps) {
  const [cellsVisible, setCellsVisible] = useState<boolean[]>(
    Array(GRID_IMAGES.length).fill(false)
  );
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [btnVisible, setBtnVisible] = useState(true);
  const lastScrollTop = useRef(0);

  // Lock page scroll while gallery is open so window scroll doesn't compete
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isVisible]);

  // Exit when user scrolls up past the top of the gallery
  useEffect(() => {
    if (!isVisible || !onExit) return;
    const el = scrollRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      if (e.deltaY < 0 && el.scrollTop === 0) {
        onExit();
      }
    };

    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (el.scrollTop === 0 && e.touches[0].clientY > touchStartY) {
        onExit();
      }
    };

    el.addEventListener('wheel', onWheel, { passive: true });
    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchmove', onTouchMove, { passive: true });
    return () => {
      el.removeEventListener('wheel', onWheel);
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchmove', onTouchMove);
    };
  }, [isVisible, onExit]);

  // Hide button when scrolling down, show when scrolling up
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const currentTop = el.scrollTop;
      setBtnVisible(currentTop <= lastScrollTop.current || currentTop <= 10);
      lastScrollTop.current = currentTop;
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, [isVisible]);

  useEffect(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];

    if (isVisible) {
      GRID_IMAGES.forEach((_, i) => {
        timersRef.current.push(
          setTimeout(() => {
            setCellsVisible((prev) => {
              const next = [...prev];
              next[i] = true;
              return next;
            });
          }, i * 40 + 50)
        );
      });
    } else {
      setCellsVisible(Array(GRID_IMAGES.length).fill(false));
    }

    return () => timersRef.current.forEach(clearTimeout);
  }, [isVisible]);

  return (
    <div
      ref={scrollRef}
      className={`fixed inset-0 z-40 backdrop-blur-sm bg-black/5 ${
        isVisible ? styles.gridEnter : styles.gridExit
      } ${styles.bentoScroll}`}
    >
      <div className={styles.bentoGrid}>
        {GRID_IMAGES.map((img, i) => {
          const delayClass = styles[`bentoCellDelay${i}` as keyof typeof styles];
          return (
            <div
              key={img.id}
              className={`${styles.bentoCell} ${delayClass ?? ''} ${
                cellsVisible[i] ? styles.bentoCellVisible : ''
              }`}
            >
              <Image
                src={`${CDN}/w_800,q_auto,f_auto/v1/${img.id}`}
                alt={img.alt}
                width={800}
                height={1067}
                className={styles.bentoImg}
                loading="lazy"
                draggable={false}
              />
            </div>
          );
        })}
      </div>

      {onExit && createPortal(
        <div className={`${styles.bentoExitBar} ${btnVisible ? '' : styles.bentoExitBarHidden}`}>
          <button
            type="button"
            onClick={onExit}
            className="px-8 py-3 border border-primary text-primary rounded-full font-semibold text-sm uppercase tracking-wider transition-all duration-300 hover:bg-primary hover:text-bg-primary hover:scale-105 active:scale-95"
          >
            {exitLabel ?? 'Exit black hole'}
          </button>
        </div>,
        document.body
      )}
    </div>
  );
}
