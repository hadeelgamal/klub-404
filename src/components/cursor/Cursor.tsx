'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

type CursorState = 'default' | 'hover-link' | 'hover-cta' | 'hover-card'

export default function Cursor() {
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return

    const ring = ringRef.current
    if (!ring) return

    gsap.set(ring, { x: -100, y: -100, opacity: 0 })

    const xTo = gsap.quickTo(ring, 'x', { duration: 0.35, ease: 'power3.out' })
    const yTo = gsap.quickTo(ring, 'y', { duration: 0.35, ease: 'power3.out' })

    let visible = false

    function onMove(e: MouseEvent) {
      xTo(e.clientX - 8)
      yTo(e.clientY - 8)
      if (!visible) {
        gsap.to(ring, { opacity: 1, duration: 0.2 })
        visible = true
      }
    }

    function applyState(state: CursorState) {
      switch (state) {
        case 'hover-link':
          gsap.to(ring, { scale: 2.2, backgroundColor: '#FF4D00', borderColor: 'transparent', duration: 0.25 })
          break
        case 'hover-cta':
          gsap.to(ring, { scale: 3.5, backgroundColor: '#FF4D00', borderColor: 'transparent', duration: 0.25 })
          break
        case 'hover-card':
          gsap.to(ring, { scale: 3, backgroundColor: '#ffffff', borderColor: 'transparent', duration: 0.25 })
          break
        default:
          gsap.to(ring, { scale: 1, backgroundColor: 'transparent', borderColor: '#ffffff', duration: 0.25 })
      }
    }

    const wired = new WeakSet<Element>()

    function wireElement(el: HTMLElement) {
      if (wired.has(el)) return
      wired.add(el)
      el.addEventListener('mouseenter', () => {
        const state = (el.dataset.cursorState as CursorState) || 'default'
        document.body.dataset.cursor = state
        applyState(state)
      })
      el.addEventListener('mouseleave', () => {
        document.body.dataset.cursor = 'default'
        applyState('default')
      })
    }

    document.querySelectorAll<HTMLElement>('[data-cursor-state]').forEach(wireElement)

    const domObserver = new MutationObserver(() => {
      document.querySelectorAll<HTMLElement>('[data-cursor-state]').forEach(wireElement)
    })
    domObserver.observe(document.body, { childList: true, subtree: true })

    window.addEventListener('mousemove', onMove)

    return () => {
      window.removeEventListener('mousemove', onMove)
      domObserver.disconnect()
    }
  }, [])

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <style>{`
        .cursor-ring {
          position: fixed;
          top: 0; left: 0;
          width: 16px; height: 16px;
          border-radius: 50%;
          border: 1.5px solid #ffffff;
          background-color: transparent;
          pointer-events: none;
          z-index: 9999;
          transform-origin: center;
        }
        @media (pointer: coarse) { .cursor-ring { display: none; } }
      `}</style>
    </>
  )
}
