"use client";

import Image from 'next/image';
import { createPortal } from 'react-dom';
import { useEffect, useRef, useState } from 'react';
import styles from '../SpaceJourney.module.css';
import { useWindowScrollRedirect } from '../hooks/useWindowScrollRedirect';

interface TesseractGridViewProps {
  isVisible: boolean;
  onExit?: () => void;
  exitLabel?: string;
}

const CDN = 'https://res.cloudinary.com/dyezhjnea/image/upload';

const GRID_IMAGES = [
  { id: 'IMG-20250210-WA0000_hkh0wi',       alt: 'Photo' },
  { id: 'IMG-20230221-WA0007_zcbkdk',       alt: 'Photo' },
  { id: 'IMG-20250105-WA0009_hpxjem',       alt: 'Photo' },
  { id: 'IMG_20210904_172332_ioy9x6',       alt: 'Photo' },
  { id: 'IMG_20191231_135819-01_s1d2ig',    alt: 'Photo' },
  { id: 'IMG_1260_osifbk',                  alt: 'Photo' },
  { id: 'IMG_0558_ixt4t1',                  alt: 'Photo' },
  { id: 'IMG_0436_hjjboa',                  alt: 'Photo' },
  { id: '1000123048_y8tl2k',                alt: 'Photo' },
  { id: 'IMG_0138_vxowxh',                  alt: 'Photo' },
  { id: '1000081667_hxf2rm',                alt: 'Photo' },
  { id: 'IMG_0346_hgh3tk',                  alt: 'Photo' },
  { id: 'IMG_0250_p5hnpt',                  alt: 'Photo' },
  { id: 'IMG_0413_vfwpx8',                  alt: 'Photo' },
  { id: 'IMG_0374_vbmf99',                  alt: 'Photo' },
  { id: '1000117014_zgy8lj',                alt: 'Photo' },
  { id: 'IMG-20220121-WA0024_1_x9gltf',    alt: 'Photo' },
  { id: '1000095261_kfmj9w',                alt: 'Photo' },
  { id: 'IMG-20241120-WA0013_bfbd7n',       alt: 'Photo' },
  { id: '83cacc30-c319-4879-b4ca-2efe519ac7de_nqi7uq', alt: 'Photo' },
  { id: 'IMG_7513_wvhtsh',                  alt: 'Photo' },
  { id: 'angie-daniel_wrs2h6',              alt: 'Photo' },
];

export default function TesseractGridView({ isVisible, onExit, exitLabel }: TesseractGridViewProps) {
  const [cellsVisible, setCellsVisible] = useState<boolean[]>(
    Array(GRID_IMAGES.length).fill(false)
  );
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [btnVisible, setBtnVisible] = useState(true);
  const lastScrollTop = useRef(0);

  // Redirect window scroll into this grid while visible.
  // Pass onExit so scrolling up at the top of the grid triggers the exit.
  useWindowScrollRedirect(scrollRef, isVisible, onExit, undefined, undefined, undefined, true);

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
      className={`fixed inset-0 z-40 ${styles.blackHoleBg} ${
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
