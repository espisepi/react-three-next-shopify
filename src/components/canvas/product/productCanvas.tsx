'use client'

import { Box, OrbitControls, useGLTF } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Product } from 'lib/shopify/types'
import { Suspense } from 'react'
import dynamic from 'next/dynamic'

const Duck = dynamic(() => import('@/components/canvas/Examples').then((mod) => mod.Duck), { ssr: false })
const View = dynamic(() => import('@/components/canvas/View').then((mod) => mod.View), {
  ssr: false,
  loading: () => (
    <div className='flex h-96 w-full flex-col items-center justify-center'>
      <svg className='-ml-1 mr-3 h-5 w-5 animate-spin text-black' fill='none' viewBox='0 0 24 24'>
        <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
        <path
          className='opacity-75'
          fill='currentColor'
          d='M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
        />
      </svg>
    </div>
  ),
})
const Common = dynamic(() => import('@/components/canvas/View').then((mod) => mod.Common), { ssr: false })

export default function ProductCanvas({ product }: { product: Product }) {
  console.log('Hello ProductCanvas Component')
  console.log(product)
  //   const media = product.media
  //   const [url] = media.sources
  //     .filter((source) => source.mimeType.includes('model/gltf-binary'))
  //     .map((source) => source.url)
  //   console.log(url)
  //@ts-ignore
  const url = product.media.nodes[10].sources[0].url
  console.log(url)
  const gltf = useGLTF(url)
  console.log(gltf)
  return (
    <>
      {/** @ts-ignore */}
      <View orbit className='relative h-full sm:h-48 sm:w-full'>
        <Suspense fallback={null}>
          <Duck route='/blob' scale={2} position={[0, -1.6, 0]} />
          <Common color={'lightblue'} />
          {/* @ts-ignore */}
          <primitive object={gltf.scene} />
        </Suspense>
      </View>
    </>
  )
}
