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

    const particleCount = Math.min(85, Math.floor((width * height) / 14000))
    const particles = []

    const neonPalette = ['#38BDF8', '#818CF8', '#C084FC', '#F472B6', '#34D399', '#60A5FA']

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: (Math.random() - 0.5) * width * 1.6,
        y: (Math.random() - 0.5) * height * 1.6,
        z: Math.random() * 800 + 150,
        radius: Math.random() * 2.5 + 1.2,
        color: neonPalette[i % neonPalette.length],
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        vz: (Math.random() - 0.5) * 0.9
      })
    }

    const focalLength = 450

    const render = () => {
      mouseX += (targetMouseX - mouseX) * 0.06
      mouseY += (targetMouseY - mouseY) * 0.06

      ctx.clearRect(0, 0, width, height)

      const cameraX = (mouseX - width / 2) * 0.45
      const cameraY = (mouseY - height / 2) * 0.45

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
        const alpha = Math.max(0.2, Math.min(0.95, 1 - p.z / 1000))

        projected.push({ x: px, y: py, radius: pRadius, alpha, color: p.color, z: p.z })

        // Glowing particle aura
        ctx.beginPath()
        ctx.arc(px, py, Math.max(1, pRadius * 1.6), 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = alpha * 0.35
        ctx.fill()

        ctx.beginPath()
        ctx.arc(px, py, Math.max(0.8, pRadius), 0, Math.PI * 2)
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

          if (dist < 130 && Math.abs(p1.z - p2.z) < 260) {
            const grad = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y)
            grad.addColorStop(0, p1.color)
            grad.addColorStop(1, p2.color)

            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = grad
            ctx.globalAlpha = (1 - dist / 130) * 0.35
            ctx.lineWidth = 1
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
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Dynamic atmospheric color glow orbs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-gradient-to-tr from-blue-600/30 via-indigo-500/20 to-purple-600/30 blur-3xl animate-float-orb-1" />
      <div className="absolute top-1/3 -right-32 w-[28rem] h-[28rem] rounded-full bg-gradient-to-br from-violet-600/25 via-fuchsia-500/20 to-pink-500/20 blur-3xl animate-float-orb-2" />
      <div className="absolute -bottom-40 left-1/3 w-[32rem] h-[32rem] rounded-full bg-gradient-to-tr from-cyan-500/20 via-blue-600/20 to-emerald-500/20 blur-3xl animate-float-orb-3" />

      {/* Cyber Grid Texture Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.15] dark:opacity-[0.25]" />

      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-60 dark:opacity-85 transition-opacity"
      />
    </div>
  )
}
