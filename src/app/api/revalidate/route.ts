import { revalidatePath } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const secret = req.headers.get('authorization')?.replace('Bearer ', '')

  if (!process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Revalidation secret not configured' }, { status: 500 })
  }

  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { _type, slug } = body as { _type?: string; slug?: string }

    if (_type === 'item') {
      revalidatePath('/catalog')
      revalidatePath('/')
      if (slug) {
        revalidatePath(`/catalog/${slug}`)
      }
    }

    if (_type === 'serviceCase') {
      revalidatePath('/services')
    }

    return NextResponse.json({
      revalidated: true,
      _type,
      slug,
      timestamp: new Date().toISOString(),
    })
  } catch (err) {
    console.error('Revalidation error:', err)
    return NextResponse.json(
      { message: 'Revalidation failed', error: String(err) },
      { status: 500 }
    )
  }
}
