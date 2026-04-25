'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { gsap } from 'gsap'

export default function CyberneticGridShader() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // dpr declared first — used in onResize, onMouseMove, and smoothed
    const dpr = window.devicePixelRatio

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(dpr)
    container.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
    const clock = new THREE.Clock()

    const vertexShader = `
      void main() {
        gl_Position = vec4(position, 1.0);
      }
    `

    const fragmentShader = `
      precision highp float;
      uniform vec2 iResolution;
      uniform float iTime;
      uniform vec2 iMouse;

      float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
      }

      void main() {
        vec2 uv    = (gl_FragCoord.xy - 0.5 * iResolution.xy) / iResolution.y;
        vec2 mouse = (iMouse - 0.5 * iResolution.xy) / iResolution.y;

        float t         = iTime * 0.2;
        float mouseDist = length(uv - mouse);

        float warp = sin(mouseDist * 20.0 - t * 4.0) * 0.1;
        warp *= smoothstep(0.4, 0.0, mouseDist);
        uv += warp;

        vec2 gridUv = abs(fract(uv * 10.0) - 0.5);
        float line  = pow(1.0 - min(gridUv.x, gridUv.y), 50.0);

        vec3 gridColor = vec3(0.1, 0.5, 1.0);
        vec3 color     = gridColor * line * (0.5 + sin(t * 2.0) * 0.2);

        float energy = sin(uv.x * 20.0 + t * 5.0) * sin(uv.y * 20.0 + t * 3.0);
        energy = smoothstep(0.8, 1.0, energy);
        color += vec3(1.0, 0.2, 0.8) * energy * line;

        float glow = smoothstep(0.1, 0.0, mouseDist);
        color += vec3(1.0) * glow * 0.5;

        color += random(uv + t * 0.1) * 0.05;

        gl_FragColor = vec4(color, 1.0);
      }
    `

    // iMouse starts off-screen matching cursor ring's (-100,-100) origin, in physical px
    const uniforms = {
      iTime:       { value: 0 },
      iResolution: { value: new THREE.Vector2() },
      iMouse:      { value: new THREE.Vector2(-100 * dpr, -100 * dpr) },
    }

    const material = new THREE.ShaderMaterial({ vertexShader, fragmentShader, uniforms })
    const geometry = new THREE.PlaneGeometry(2, 2)
    scene.add(new THREE.Mesh(geometry, material))

    // iResolution must be physical pixels — gl_FragCoord is physical when setPixelRatio > 1
    const onResize = () => {
      const w = container.clientWidth
      const h = container.clientHeight
      renderer.setSize(w, h)
      uniforms.iResolution.value.set(w * dpr, h * dpr)
    }
    window.addEventListener('resize', onResize)
    onResize()

    // Smooth mouse with same duration + ease as Cursor.tsx so both tracks are in sync
    const smoothed = { x: -100 * dpr, y: -100 * dpr }
    const xTo = gsap.quickTo(smoothed, 'x', { duration: 0.35, ease: 'power3.out' })
    const yTo = gsap.quickTo(smoothed, 'y', { duration: 0.35, ease: 'power3.out' })

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      xTo((e.clientX - rect.left) * dpr)
      yTo((container.clientHeight - (e.clientY - rect.top)) * dpr)
    }
    window.addEventListener('mousemove', onMouseMove)

    renderer.setAnimationLoop(() => {
      uniforms.iTime.value = clock.getElapsedTime()
      uniforms.iMouse.value.set(smoothed.x, smoothed.y)
      renderer.render(scene, camera)
    })

    return () => {
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMouseMove)
      renderer.setAnimationLoop(null)
      const canvas = renderer.domElement
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas)
      material.dispose()
      geometry.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    />
  )
}
