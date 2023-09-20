import * as THREE from 'three'
import React, { Suspense, useRef, useMemo } from 'react'
import { extend, useThree, useLoader, useFrame } from '@react-three/fiber'
import { Sky } from '@react-three/drei'
import { Water } from 'three-stdlib'

extend({ Water })

const VELOCITY_WATER = 0.3

export function Ocean({ ...props }) {
  const ref = useRef<THREE.Mesh>()
  const gl = useThree((state) => state.gl)
  const waterNormals = useLoader(THREE.TextureLoader, '/img/waternormals.jpeg')
  waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping
  const geom = useMemo(() => new THREE.PlaneGeometry(10000, 10000), [])
  const config = useMemo(
    () => ({
      textureWidth: 512,
      textureHeight: 512,
      waterNormals,
      sunDirection: new THREE.Vector3(),
      sunColor: 0xffffff,
      waterColor: 0x001e0f,
      distortionScale: 6.0,
      fog: false,
      format: gl.encoding,
    }),
    [waterNormals],
  )
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.material.uniforms.time.value += delta * VELOCITY_WATER
    }
  })
  return (
    <>
      {/* @ts-ignore */}
      <water ref={ref} args={[geom, config]} rotation-x={-Math.PI / 2} position-y={-1} />
    </>
  )
}
