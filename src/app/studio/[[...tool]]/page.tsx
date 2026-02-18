'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '../../../../sanity.config'

// Force dynamic to prevent static caching of the Studio
export const dynamic = 'force-dynamic'

export default function StudioPage() {
  return <NextStudio config={config} />
}
