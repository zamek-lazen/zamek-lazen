'use client'

import * as THREE from 'three'
import { useEffect, useRef, useState, type Dispatch, type RefObject, type SetStateAction } from 'react'
import type { IntroPhase } from './types'

const HERO_ASSET_SOURCES = [
  '/images/reference/parallax-leaves-left.webp',
  '/images/reference/parallax-leaves-right.webp',
  '/images/reference/parallax-foreground-left.webp',
  '/images/reference/parallax-foreground-right.webp',
  '/images/reference/parallax-castle.webp',
  '/images/reference/parallax-hills.webp',
  '/images/reference/parallax-horizon.webp',
  '/images/reference/parallax-sky.webp',
] as const

const LOADER_MIN_VISIBLE_MS = 350
const INTRO_DELAY_MS = 0
const INTRO_DURATION_MS = 3200
const CAM_Z = 16
const INTRO_CAM_Z = 25
const CAM_DELAY = 0.01
const PLANE_OVERSCAN = 1.1

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max)

type PlaneConfig = {
  textureIndex: number
  z: number
  scale: number
  y?: number
  flip?: boolean
  float?: boolean
  introStartX?: number
  introInitialX?: number
}

type IntroPlane = {
  mesh: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>
  config: PlaneConfig
  basePosition: THREE.Vector3
  floatSeed: number
}

type ParallaxSceneProps = {
  heroRef: RefObject<HTMLElement | null>
  phase: IntroPhase
  rootRef: RefObject<HTMLDivElement | null>
  setPhase: Dispatch<SetStateAction<IntroPhase>>
  setProgress: Dispatch<SetStateAction<number>>
}

export function ParallaxScene({
  heroRef,
  phase,
  rootRef,
  setPhase,
  setProgress,
}: ParallaxSceneProps) {
  const stageRef = useRef<HTMLDivElement | null>(null)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updateMotionPreference = () => {
      setPrefersReducedMotion(mediaQuery.matches)
    }

    updateMotionPreference()
    mediaQuery.addEventListener('change', updateMotionPreference)

    return () => {
      mediaQuery.removeEventListener('change', updateMotionPreference)
    }
  }, [])

  useEffect(() => {
    const rootNode = rootRef.current
    const heroNode = heroRef.current
    const stageNode = stageRef.current

    if (!rootNode || !heroNode || !stageNode) {
      return
    }

    rootNode.style.setProperty('--mx', '0')
    rootNode.style.setProperty('--my', '0')
    rootNode.style.setProperty('--scroll', '0')
    rootNode.style.setProperty('--intro-progress', prefersReducedMotion ? '1' : '0')
    rootNode.style.setProperty('--intro-reverse', prefersReducedMotion ? '0' : '1')

    if (prefersReducedMotion) {
      const readyFrame = window.requestAnimationFrame(() => {
        setProgress(100)
        setPhase('ready')
      })

      return () => {
        window.cancelAnimationFrame(readyFrame)
      }
    }

    let disposed = false
    let raf = 0
    let resizeRaf = 0
    let progressTimer: number | undefined
    let introActive = false
    let introFinished = false
    let introStartAt = 0
    let pointerTargetX = 0
    let pointerTargetY = 0
    let pointerX = 0
    let pointerY = 0
    let phaseReadyCommitted = false
    const loadStartAt = performance.now()

    const renderer = new THREE.WebGLRenderer({
      antialias: window.devicePixelRatio < 2,
      alpha: true,
      powerPreference: 'high-performance',
    })
    renderer.setClearColor(0x082019, 1)
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio))
    renderer.setSize(stageNode.clientWidth, stageNode.clientHeight, false)
    renderer.domElement.style.width = '100%'
    renderer.domElement.style.height = '100%'
    renderer.domElement.style.display = 'block'
    stageNode.replaceChildren(renderer.domElement)

    const scene = new THREE.Scene()
    scene.add(new THREE.AmbientLight(0xffffff))
    const dolly = new THREE.Object3D()
    scene.add(dolly)

    const camera = new THREE.PerspectiveCamera(36, 1, 0.25, 6000)
    camera.position.z = CAM_Z
    dolly.add(camera)

    const planeConfigs: PlaneConfig[] = [
      { textureIndex: 0, z: 10, scale: 1.5, float: true, introStartX: 1, introInitialX: 2 },
      {
        textureIndex: 1,
        z: 12,
        scale: 3,
        y: -1,
        flip: true,
        float: true,
        introStartX: 1.5,
        introInitialX: 2.5,
      },
      {
        textureIndex: 0,
        z: 15,
        scale: 15,
        y: 0.25,
        float: true,
        introStartX: 2,
        introInitialX: 3,
      },
      { textureIndex: 1, z: 10.1, scale: 1.5, float: true, introStartX: -1, introInitialX: -2 },
      {
        textureIndex: 0,
        z: 12.1,
        scale: 3,
        y: -0.25,
        flip: true,
        float: true,
        introStartX: -1.5,
        introInitialX: -2.5,
      },
      { textureIndex: 1, z: 15.1, scale: 15, introStartX: -2, introInitialX: -3 },
      { textureIndex: 2, z: 8, scale: 1 },
      { textureIndex: 3, z: 5, scale: 1 },
      { textureIndex: 4, z: 0, scale: 1 },
      { textureIndex: 5, z: -40, scale: 1 },
      { textureIndex: 6, z: -400, scale: 1 },
      { textureIndex: 7, z: -5000, scale: 1 },
    ]

    const planes: IntroPlane[] = []

    for (const config of planeConfigs) {
      const geometry = new THREE.PlaneGeometry(config.scale, config.scale)
      const material = new THREE.MeshBasicMaterial({
        transparent: true,
        depthTest: false,
      })
      const mesh = new THREE.Mesh(geometry, material)
      mesh.position.set(0, config.y ?? 0, config.z)
      scene.add(mesh)
      planes.push({
        mesh,
        config,
        basePosition: new THREE.Vector3(0, config.y ?? 0, config.z),
        floatSeed: Math.random() * 1000,
      })
    }

    const resizePlanes = () => {
      const width = stageNode.clientWidth
      const height = stageNode.clientHeight

      if (width <= 0 || height <= 0) {
        return
      }

      renderer.setSize(width, height, false)
      camera.aspect = width / height
      camera.updateProjectionMatrix()

      const filmHeight = camera.getFilmHeight()
      const focalLength = camera.getFocalLength()

      for (const plane of planes) {
        const distance = CAM_Z - plane.config.z
        const scaleY = (distance * filmHeight) / focalLength
        const scaleX = scaleY * camera.aspect
        const overscan = width < 768 ? 1.42 : PLANE_OVERSCAN
        const coverScale = Math.max(scaleX, scaleY) * overscan
        plane.mesh.scale.set(coverScale * (plane.config.flip ? -1 : 1), coverScale, 1)
      }
    }

    const onResize = () => {
      if (resizeRaf !== 0) {
        return
      }

      resizeRaf = window.requestAnimationFrame(() => {
        resizeRaf = 0
        resizePlanes()
      })
    }

    const loadingManager = new THREE.LoadingManager()
    loadingManager.onProgress = (_url, loaded, total) => {
      if (!disposed) {
        setProgress(Math.round((loaded / total) * 100))
      }
    }

    const textureLoader = new THREE.TextureLoader(loadingManager)

    const loadTextures = async () => {
      const textures = await Promise.all(
        HERO_ASSET_SOURCES.map(src => textureLoader.loadAsync(src)),
      )

      if (disposed) {
        for (const texture of textures) {
          texture.dispose()
        }

        return
      }

      for (const texture of textures) {
        texture.minFilter = THREE.LinearFilter
        texture.generateMipmaps = false
      }

      for (let index = 0; index < planes.length; index += 1) {
        planes[index].mesh.material.map = textures[planes[index].config.textureIndex]
        planes[index].mesh.material.needsUpdate = true
      }

      renderer.compile(scene, camera)

      const elapsed = performance.now() - loadStartAt
      const delay = Math.max(LOADER_MIN_VISIBLE_MS - elapsed, 0)
      progressTimer = window.setTimeout(() => {
        if (disposed) {
          return
        }

        setPhase('unfold')
        introActive = true
        introStartAt = performance.now() + INTRO_DELAY_MS
        camera.position.z = INTRO_CAM_Z
        pointerX = 0
        pointerY = 0

        for (const plane of planes) {
          const initialX = plane.config.introInitialX ?? plane.config.introStartX ?? 0
          plane.basePosition.x = initialX
          plane.mesh.position.x = initialX
        }
      }, delay)
    }

    const onMouseMove = (event: MouseEvent) => {
      pointerTargetX = clamp((event.clientX / window.innerWidth) * 2 - 1, -1, 1)
      pointerTargetY = clamp(-((event.clientY / window.innerHeight) * 2) + 1, -1, 1)
      rootNode.style.setProperty('--mx', pointerTargetX.toFixed(4))
      rootNode.style.setProperty('--my', pointerTargetY.toFixed(4))
    }

    const onMouseLeave = () => {
      pointerTargetX = 0
      pointerTargetY = 0
      rootNode.style.setProperty('--mx', '0')
      rootNode.style.setProperty('--my', '0')
    }

    const animate = (time: number) => {
      if (disposed) {
        return
      }

      raf = window.requestAnimationFrame(animate)

      pointerX += (pointerTargetX - pointerX) * CAM_DELAY
      pointerY += (pointerTargetY - pointerY) * CAM_DELAY
      dolly.rotation.x = pointerY * 0.0125
      dolly.rotation.y = pointerX * -0.025

      const heroRect = heroNode.getBoundingClientRect()
      const scrollRatio = clamp(-heroRect.top / window.innerHeight, -1, 1)
      rootNode.style.setProperty('--scroll', scrollRatio.toFixed(4))

      const cameraYTarget = clamp(scrollRatio * camera.aspect * -2, -1.25, 1.25)
      camera.position.y += (cameraYTarget - camera.position.y) * 0.05

      if (introActive && !introFinished) {
        const rawProgress =
          time < introStartAt ? 0 : clamp((time - introStartAt) / INTRO_DURATION_MS, 0, 1)
        const eased = Math.sin((rawProgress * Math.PI) / 2)
        rootNode.style.setProperty('--intro-progress', eased.toFixed(4))
        rootNode.style.setProperty('--intro-reverse', (1 - eased).toFixed(4))

        for (const plane of planes) {
          const startX = plane.config.introStartX ?? 0
          plane.basePosition.x = THREE.MathUtils.lerp(startX, 0, eased)
        }

        camera.position.z = THREE.MathUtils.lerp(INTRO_CAM_Z, CAM_Z, eased)

        if (rawProgress >= 1) {
          introFinished = true
          introActive = false
        }
      } else if (introFinished && !phaseReadyCommitted) {
        phaseReadyCommitted = true
        setPhase('ready')
        rootNode.style.setProperty('--intro-progress', '1')
        rootNode.style.setProperty('--intro-reverse', '0')
      }

      for (const plane of planes) {
        plane.mesh.position.copy(plane.basePosition)
        if (plane.config.float) {
          const drift = Math.sin((time + plane.floatSeed) * 0.001) * 0.0005
          plane.mesh.position.x += drift
          plane.mesh.position.y += drift
        }
      }

      renderer.render(scene, camera)
    }

    const cleanup = () => {
      disposed = true

      if (raf !== 0) {
        window.cancelAnimationFrame(raf)
      }

      if (resizeRaf !== 0) {
        window.cancelAnimationFrame(resizeRaf)
      }

      if (progressTimer) {
        window.clearTimeout(progressTimer)
      }

      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseleave', onMouseLeave)

      for (const plane of planes) {
        plane.mesh.geometry.dispose()
        plane.mesh.material.map?.dispose()
        plane.mesh.material.dispose()
      }

      renderer.dispose()
      stageNode.replaceChildren()
    }

    loadTextures().catch(() => {
      setProgress(100)
      setPhase('ready')
    })
    resizePlanes()
    window.addEventListener('resize', onResize, { passive: true })
    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('mouseleave', onMouseLeave, { passive: true })
    raf = window.requestAnimationFrame(animate)

    return cleanup
  }, [heroRef, prefersReducedMotion, rootRef, setPhase, setProgress])

  const stageCanvasClassName =
    phase === 'loading'
      ? 'absolute inset-0 block scale-[1.24] brightness-[0.58] saturate-[0.72] blur-[2px] transition-[transform,filter] duration-[900ms] [transition-timing-function:cubic-bezier(0.2,0.72,0.2,1)]'
      : phase === 'unfold'
        ? 'absolute inset-0 block scale-100 transition-[transform,filter] duration-[3200ms,1800ms] [transition-timing-function:cubic-bezier(0.15,0.8,0.16,1)]'
        : 'absolute inset-0 block scale-100 transition-[transform,filter] duration-[900ms] [transition-timing-function:cubic-bezier(0.2,0.72,0.2,1)]'

  return (
    <div className='pointer-events-none absolute inset-0 h-full w-full overflow-hidden [will-change:transform] max-md:inset-[-20svh_-18vw_-18svh]'>
      <div ref={stageRef} className={stageCanvasClassName} />
    </div>
  )
}
