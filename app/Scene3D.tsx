'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import RetroGrid from '@/components/3d/RetroGrid'
import { useRef, useEffect } from 'react'
import { Vector3, MathUtils, PerspectiveCamera as ThreePerspectiveCamera } from 'three'
import styles from './Scene3D.module.css'

interface Scene3DProps {
  scroll: number
  currentSection: number
}

function Scene({ scroll }: { scroll: number }) {
  const cameraRef = useRef<ThreePerspectiveCamera>(null)
  const currentPos = useRef(new Vector3(0, 600, 0)) // Match playground's initial position
  const targetPos = useRef(new Vector3(0, 1200, -800)) // Keep our final position
  const currentRot = useRef<[number, number, number]>([-0.1, 0, 0]) // Almost level
  const targetRot = useRef<[number, number, number]>([-0.7, 0, 0]) // Final rotation
  const currentFov = useRef(80) // Match playground's initial FOV
  const targetFov = useRef(45) // Keep our target FOV
  const isAnimating = useRef(true)

  useEffect(() => {
    // Start the animation when component mounts
    if (cameraRef.current) {
      cameraRef.current.position.set(currentPos.current.x, currentPos.current.y, currentPos.current.z)
      cameraRef.current.rotation.set(currentRot.current[0], currentRot.current[1], currentRot.current[2])
      cameraRef.current.fov = currentFov.current
      cameraRef.current.updateProjectionMatrix()
    }
  }, [])

  useFrame(({ camera }) => {
    if (!isAnimating.current) return

    // Smoothly interpolate camera position with easing
    const positionLerp = 0.0333 // Match playground's smoother movement
    currentPos.current.x = MathUtils.lerp(currentPos.current.x, targetPos.current.x, positionLerp)
    currentPos.current.y = MathUtils.lerp(currentPos.current.y, targetPos.current.y, positionLerp)
    currentPos.current.z = MathUtils.lerp(currentPos.current.z, targetPos.current.z, positionLerp)

    // Smoothly interpolate camera rotation - slightly faster than position
    const rotationLerp = 0.0333
    currentRot.current[0] = MathUtils.lerp(currentRot.current[0], targetRot.current[0], rotationLerp)
    currentRot.current[1] = MathUtils.lerp(currentRot.current[1], targetRot.current[1], rotationLerp)
    currentRot.current[2] = MathUtils.lerp(currentRot.current[2], targetRot.current[2], rotationLerp)

    // Smoothly interpolate FOV - match position speed for consistency
    const fovLerp = 0.0333
    currentFov.current = MathUtils.lerp(currentFov.current, targetFov.current, fovLerp)

    // Apply the interpolated values
    camera.position.set(currentPos.current.x, currentPos.current.y, currentPos.current.z)
    camera.rotation.set(currentRot.current[0], currentRot.current[1], currentRot.current[2])
    if ('fov' in camera) {
      camera.fov = currentFov.current
      camera.updateProjectionMatrix()
    }

    // Check if we're close enough to stop animating
    const positionDelta = camera.position.distanceTo(new Vector3(...Object.values(targetPos.current)))
    const rotationDelta = Math.abs(currentRot.current[0] - targetRot.current[0])
    const fovDelta = Math.abs(currentFov.current - targetFov.current)
    if (positionDelta < 1 && rotationDelta < 0.01 && fovDelta < 0.1) {
      isAnimating.current = false
    }
  })

  return (
    <>
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        position={[0, 1200, -800]}
        rotation={[-0.7, 0, 0]}
        fov={45}
        near={0.1}
        far={15000}
      />
      
      <RetroGrid scroll={scroll} />

      {/* Ambient light for overall scene brightness */}
      <ambientLight intensity={0.3} />
    </>
  )
}

export default function Scene3D({ scroll, currentSection }: Scene3DProps) {
  return (
    <>
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          background: '#161616',
          zIndex: 1
        }}
      />
      <Canvas
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          zIndex: 2,
          pointerEvents: 'none',
          background: 'transparent'
        }}
      >
        <Scene scroll={scroll} />
      </Canvas>
    </>
  )
} 