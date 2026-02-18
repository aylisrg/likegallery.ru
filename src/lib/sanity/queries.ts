import { groq } from 'next-sanity'

// Home page: last 6 sold items as portfolio showcase
export const FEATURED_SOLD_QUERY = groq`
  *[_type == "item" && status == "sold"] | order(_createdAt desc) [0...6] {
    _id,
    title,
    slug,
    category,
    status,
    "mainImage": images[0],
    description
  }
`

// Catalog: items filtered by category with pagination
export const ITEMS_QUERY = groq`
  *[_type == "item" && ($category == "" || category == $category)] | order(_createdAt desc) [$offset...$end] {
    _id,
    title,
    slug,
    category,
    status,
    price,
    "mainImage": images[0]
  }
`

// Catalog: total count for pagination
export const ITEMS_COUNT_QUERY = groq`
  count(*[_type == "item" && ($category == "" || category == $category)])
`

// Single item by slug
export const ITEM_BY_SLUG_QUERY = groq`
  *[_type == "item" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    category,
    status,
    price,
    images[] {
      ...,
      asset->
    },
    description,
    expertisePdf {
      asset->
    }
  }
`

// All item slugs for generateStaticParams
export const ALL_ITEM_SLUGS_QUERY = groq`
  *[_type == "item"] { "slug": slug.current }
`

// Service cases for services page
export const SERVICE_CASES_QUERY = groq`
  *[_type == "serviceCase"] | order(_createdAt desc) {
    _id,
    title,
    type,
    imageBefore { asset-> },
    imageAfter { asset-> },
    description
  }
`
