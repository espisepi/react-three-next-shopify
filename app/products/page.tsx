import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'

// import { ProductCanvas } from 'components/canvas/product/productCanvas';
// import { GridTileImage } from 'components/grid/tile'
// import Footer from 'components/layout/footer'
// import { Gallery } from 'components/product/gallery'
// import { ProductDescription } from 'components/product/product-description'
import { HIDDEN_PRODUCT_TAG } from 'lib/constants'
import { getProducts } from 'lib/shopify'
import { Image } from 'lib/shopify/types'
import Link from 'next/link'
import dynamic from 'next/dynamic'

const ProductCanvas = dynamic(() => import('@/components/canvas/product/productCanvas'), { ssr: false })

// This Route Path:
// http://localhost:3000/products

export const runtime = 'edge'

export default async function ProductsPage({ params }: { params: { handle: string } }) {
  const products = await getProducts({})

  if (!products) return notFound()

  return (
    <>
      <h1>List Products Page</h1>
      <div>
        <pre>{JSON.stringify(products, null, 2)}</pre>
      </div>
    </>
  )
}
