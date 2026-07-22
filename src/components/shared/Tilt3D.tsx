'use client'

import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

interface Tilt3DProps {
  children: React.ReactNode
  className?: string
  intensity?: number   // 1–20, default 10
  glowColor?: string  // rgba string
  disabled?: boolean
}

export function Tilt3D({
  children,
  className = '',
  intensity = 10,
  glowColor = 'rgba(37,99,235,0.2)',
  disabled = false,
}: Tilt3DProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const glowXRaw = useMotionValue(50)
  const glowYRaw = useMotionValue(50)

  const cfg = { stiffness: 180, damping: 22, mass: 0.4 }
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [intensity, -intensity]), cfg)
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-intensity, intensity]), cfg)
  const glowX  = useSpring(glowXRaw, cfg)
  const glowY  = useSpring(glowYRaw, cfg)

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (disabled) return
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const nx = (e.clientX - rect.left) / rect.width - 0.5
    const ny = (e.clientY - rect.top)  / rect.height - 0.5
    mouseX.set(nx)
    mouseY.set(ny)
    glowXRaw.set(((nx + 0.5) * 100))
    glowYRaw.set(((ny + 0.5) * 100))
  }

  function onLeave() {
    mouseX.set(0)
    mouseY.set(0)
    glowXRaw.set(50)
    glowYRaw.set(50)
    setHovered(false)
  }

  if (disabled) return <div className={className}>{children}</div>

  return (
    <div ref={ref} style={{ perspective: 900 }} className={className}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onLeave}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative w-full h-full"
      >
        {children}

        {/* Cursor glow overlay */}
        {hovered && (
          <motion.div
            className="absolute inset-0 pointer-events-none z-10 rounded-[inherit]"
            style={{
              background: `radial-gradient(180px circle at ${glowX.get()}% ${glowY.get()}%, ${glowColor}, transparent 70%)`,
            }}
          />
        )}
      </motion.div>
    </div>
  )
}
