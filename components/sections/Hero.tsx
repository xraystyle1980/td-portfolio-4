'use client';

import styles from './Hero.module.css';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import localFont from 'next/font/local'

const cooper = localFont({
  src: '../../public/fonts/Cooper-var.ttf',
  variable: '--font-cooper',
  preload: true
})

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const wordRef = useRef<HTMLSpanElement>(null);
  const buildWordRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const initGSAP = async () => {
      const { default: ScrollTrigger } = await import('gsap/ScrollTrigger')
      
      // Register plugins
      gsap.registerPlugin(ScrollTrigger)

      // Initialize GSAP defaults
      ScrollTrigger.defaults({
        markers: false
      })
    }

    initGSAP()
  }, [])

  return (
    <section id="hero" className={`${styles.hero} ${cooper.variable}`} suppressHydrationWarning>
      <div className={styles.heroContent}>
        <div className={styles.contentOverlay}>
          <div className={styles.content} ref={containerRef}>
            <div className={styles.headlineWrapper}>
              <h1 ref={headlineRef} className={styles.heroHeadline}>
                <span ref={buildWordRef} className={styles.headlineWord}>Build</span>
                <span className={`${styles.headlineWord} ${styles.staticWord}`}>Cool</span>
                <span ref={wordRef} className={styles.headlineWord}>Stuff</span>
              </h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
