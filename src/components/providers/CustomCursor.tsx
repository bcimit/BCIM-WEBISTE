'use client'

import { useEffect, useRef, useState } from 'react'

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)
  const [clicking, setClicking] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    let ringX = 0, ringY = 0
    let targetX = 0, targetY = 0
    let rafId: number

    function onMove(e: MouseEvent) {
      targetX = e.clientX
      targetY = e.clientY
      if (!visible) setVisible(true)
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${targetX}px, ${targetY}px)`
      }
    }

    function animate() {
      ringX += (targetX - ringX) * 0.12
      ringY += (targetY - ringY) * 0.12
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px)`
      }
      rafId = requestAnimationFrame(animate)
    }

    function onEnter(e: MouseEvent) {
      const el = e.target as HTMLElement
      if (el.matches('a, button, [role="button"], input, textarea, select, label')) {
        setHovered(true)
      }
    }

    function onLeave(e: MouseEvent) {
      const el = e.target as HTMLElement
      if (el.matches('a, button, [role="button"], input, textarea, select, label')) {
        setHovered(false)
      }
    }

    function onMouseDown() { setClicking(true) }
    function onMouseUp() { setClicking(false) }
    function onMouseLeave() { setVisible(false) }
    function onMouseEnterDoc() { setVisible(true) }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onEnter)
    window.addEventListener('mouseout', onLeave)
    window.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mouseup', onMouseUp)
    document.documentElement.addEventListener('mouseleave', onMouseLeave)
    document.documentElement.addEventListener('mouseenter', onMouseEnterDoc)
    rafId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onEnter)
      window.removeEventListener('mouseout', onLeave)
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
      document.documentElement.removeEventListener('mouseleave', onMouseLeave)
      document.documentElement.removeEventListener('mouseenter', onMouseEnterDoc)
      cancelAnimationFrame(rafId)
    }
  }, [visible])

  return (
    <>
      {/* Dot — follows exactly */}
      <div
        ref={dotRef}
        aria-hidden
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: hovered ? 6 : 8,
          height: hovered ? 6 : 8,
          borderRadius: '50%',
          backgroundColor: hovered ? '#F59E0B' : '#2563EB',
          pointerEvents: 'none',
          zIndex: 99999,
          translate: '-50% -50%',
          opacity: visible ? 1 : 0,
          transition: 'width 0.2s, height 0.2s, background-color 0.2s, opacity 0.3s',
          willChange: 'transform',
        }}
      />

      {/* Ring — lags behind */}
      <div
        ref={ringRef}
        aria-hidden
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: hovered ? 48 : clicking ? 28 : 36,
          height: hovered ? 48 : clicking ? 28 : 36,
          borderRadius: '50%',
          border: `2px solid ${hovered ? '#F59E0B' : '#2563EB'}`,
          pointerEvents: 'none',
          zIndex: 99998,
          translate: '-50% -50%',
          opacity: visible ? (hovered ? 0.7 : 0.4) : 0,
          transition: 'width 0.3s cubic-bezier(0.34,1.56,0.64,1), height 0.3s cubic-bezier(0.34,1.56,0.64,1), border-color 0.2s, opacity 0.3s',
          willChange: 'transform',
        }}
      />
    </>
  )
}
