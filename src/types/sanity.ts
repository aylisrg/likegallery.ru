export interface SanityImageAsset {
  _ref: string
  _type: 'reference'
  url?: string
}

export interface SanityImage {
  _type: 'image'
  alt?: string
  asset: SanityImageAsset
}

export interface SanityFile {
  _type: 'file'
  asset: {
    _ref: string
    _type: 'reference'
    url?: string
  }
}

export type ItemStatus = 'active' | 'sold' | 'restoration'

export type ItemCategory =
  | 'Буддизм'
  | 'Христианство'
  | 'Индия/Гималаи'
  | 'Китай/Тибет'
  | 'Монголия/Дзанабазар'
  | 'Современники'
  | 'Артефакты Востока'

export interface Item {
  _id: string
  title: string
  slug: { current: string }
  category: ItemCategory
  status: ItemStatus
  price?: string
  images?: SanityImage[]
  mainImage?: SanityImage
  description?: string
  expertisePdf?: SanityFile
}

export type ServiceCaseType = 'restoration' | 'expertise'

export interface ServiceCase {
  _id: string
  title: string
  type: ServiceCaseType
  imageBefore: SanityImage
  imageAfter: SanityImage
  description?: string
}
