import React, { useEffect, useRef } from 'react'

export default function Background3D() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animationFrameId
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    let mouseX = width / 2
    let mouseY = height / 2
    let targetMouseX = mouseX
    let targetMouseY = mouseY

    const handleMouseMove = (e) => {
      targetMouseX = e.clientX
      targetMouseY = e.clientY
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('resize', handleResize)

    const particleCount = Math.min(65, Math.floor((width * height) / 18000))
    const particles = []

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: (Math.random() - 0.5) * width * 1.5,
        y: (Math.random() - 0.5) * height * 1.5,
        z: Math.random() * 800 + 200,
        radius: Math.random() * 2 + 1,
        color: i % 3 === 0 ? '#3B82F6' : i % 3 === 1 ? '#8B5CF6' : '#10B981',
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        vz: (Math.random() - 0.5) * 0.8
      })
    }

    const focalLength = 400

    const render = () => {
      mouseX += (targetMouseX - mouseX) * 0.05
      mouseY += (targetMouseY - mouseY) * 0.05

      ctx.clearRect(0, 0, width, height)

      const cameraX = (mouseX - width / 2) * 0.4
      const cameraY = (mouseY - height / 2) * 0.4

      const projected = []

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy
        p.z += p.vz

        if (p.z < 100) p.z = 1000
        if (p.z > 1000) p.z = 100

        const relX = p.x - cameraX
        const relY = p.y - cameraY
        const scale = focalLength / p.z

        const px = width / 2 + relX * scale
        const py = height / 2 + relY * scale
        const pRadius = p.radius * scale
        const alpha = Math.max(0.15, Math.min(0.85, 1 - p.z / 1000))

        projected.push({ x: px, y: py, radius: pRadius, alpha, color: p.color, z: p.z })

        ctx.beginPath()
        ctx.arc(px, py, Math.max(0.5, pRadius), 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = alpha
        ctx.fill()
      }

      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const p1 = projected[i]
          const p2 = projected[j]
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < 110 && Math.abs(p1.z - p2.z) < 250) {
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = '#6366F1'
            ctx.globalAlpha = (1 - dist / 110) * 0.2
            ctx.lineWidth = 0.75
            ctx.stroke()
          }
        }
      }

      ctx.globalAlpha = 1.0
      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-40 dark:opacity-60 transition-opacity"
    />
  )
}
