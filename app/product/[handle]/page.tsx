import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'

// import { ProductCanvas } from 'components/canvas/product/productCanvas';
// import { GridTileImage } from 'components/grid/tile'
// import Footer from 'components/layout/footer'
// import { Gallery } from 'components/product/gallery'
// import { ProductDescription } from 'components/product/product-description'
import { HIDDEN_PRODUCT_TAG } from 'lib/constants'
import { getProduct, getProductRecommendations } from 'lib/shopify'
import { Image } from 'lib/shopify/types'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { BackgroundCanvasClient } from '@/components/canvas/background/BackgroundCanvasClient'

const ProductCanvas = dynamic(() => import('@/components/canvas/product/productCanvas'), { ssr: false })

// This Route Path:
// http://localhost:3000/product/original-lenovo-lp40-pro-tws-earphones-wireless-bluetooth-5-1-sport-noise-reduction-headphones-touch-control-250mah-2022-new

export const runtime = 'edge'

export async function generateMetadata({ params }: { params: { handle: string } }): Promise<Metadata> {
  // TODO: Descomentar para que busque el producto pasado por parametro
  // const product = await getProduct(params.handle)
  const product = await getProduct(
    'original-lenovo-lp40-pro-tws-earphones-wireless-bluetooth-5-1-sport-noise-reduction-headphones-touch-control-250mah-2022-new',
  )

  if (!product) return notFound()

  const { url, width, height, altText: alt } = product.featuredImage || {}
  const indexable = !product.tags.includes(HIDDEN_PRODUCT_TAG)

  return {
    title: product.seo.title || product.title,
    description: product.seo.description || product.description,
    robots: {
      index: indexable,
      follow: indexable,
      googleBot: {
        index: indexable,
        follow: indexable,
      },
    },
    openGraph: url
      ? {
          images: [
            {
              url,
              width,
              height,
              alt,
            },
          ],
        }
      : null,
  }
}

export default async function ProductPage({ params }: { params: { handle: string } }) {
  // TODO: Descomentar para que busque el producto pasado por parametro
  // const product = await getProduct(params.handle)
  const product = await getProduct(
    'original-lenovo-lp40-pro-tws-earphones-wireless-bluetooth-5-1-sport-noise-reduction-headphones-touch-control-250mah-2022-new',
  )

  if (!product) return notFound()

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    image: product.featuredImage.url,
    offers: {
      '@type': 'AggregateOffer',
      availability: product.availableForSale ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      priceCurrency: product.priceRange.minVariantPrice.currencyCode,
      highPrice: product.priceRange.maxVariantPrice.amount,
      lowPrice: product.priceRange.minVariantPrice.amount,
    },
  }

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd),
        }}
      />
      <h1>HOLA MUNDO PAGE PRODUCT</h1>
      <BackgroundCanvasClient />
      {/* <div className='mx-auto max-w-screen-2xl px-4'>
        <div className='flex flex-col rounded-lg border border-neutral-200 bg-white p-8 dark:border-neutral-800 dark:bg-black md:p-12 lg:flex-row lg:gap-8'>
          <div className='h-full w-full basis-full lg:basis-4/6'>
            <Gallery
              images={product.images.map((image: Image) => ({
                src: image.url,
                altText: image.altText,
              }))}
            />
          </div>

          <div className='basis-full lg:basis-2/6'>
            <ProductDescription product={product} />
          </div>
        </div>
        <Suspense>
          <RelatedProducts id={product.id} />
        </Suspense>
      </div> */}
      <h1>Hello World React-ThreeFiber</h1>
      <ProductCanvas product={product} />
      <div>
        <pre>{JSON.stringify(product, null, 2)}</pre>
      </div>
      {/* <Suspense>
        <Footer />
      </Suspense> */}
      {/** @ts-ignore */}
      {/* <View orbit className='relative h-full animate-bounce sm:h-48 sm:w-full'>
        <Suspense fallback={null}>
          <Duck route='/blob' scale={2} position={[0, -1.6, 0]} />
          <Common color={'lightblue'} />
        </Suspense>
      </View> */}
    </>
  )
}

async function RelatedProducts({ id }: { id: string }) {
  const relatedProducts = await getProductRecommendations(id)

  if (!relatedProducts.length) return null

  return (
    <div className='py-8'>
      <h2 className='mb-4 text-2xl font-bold'>Related Products</h2>
      <ul className='flex w-full gap-4 overflow-x-auto pt-1'>
        {relatedProducts.map((product) => (
          <li
            key={product.handle}
            className='aspect-square w-full flex-none min-[475px]:w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5'
          >
            {/* <Link className='relative h-full w-full' href={`/product/${product.handle}`}>
              <GridTileImage
                alt={product.title}
                label={{
                  title: product.title,
                  amount: product.priceRange.maxVariantPrice.amount,
                  currencyCode: product.priceRange.maxVariantPrice.currencyCode,
                }}
                src={product.featuredImage?.url}
                fill
                sizes='(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw'
              />
            </Link> */}
          </li>
        ))}
      </ul>
    </div>
  )
}
