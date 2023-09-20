'use client'

import dynamic from 'next/dynamic'

const BackgroundCanvas = dynamic(
  () => import('@/components/canvas/background/BackgroundCanvas').then((mod) => mod.BackgroundCanvas),
  { ssr: false },
)

export function BackgroundCanvasClient() {
  return <BackgroundCanvas />
}
