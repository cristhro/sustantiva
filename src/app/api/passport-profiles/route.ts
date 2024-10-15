import { NextResponse } from 'next/server'
import prisma from '@/utils/prisma'

// Create or Get All PassportProfiles
export async function POST(request: Request) {
  const body = await request.json()
  const { wallet } = body

  if (!wallet) {
    return NextResponse.json({ error: 'Wallet address is required' }, { status: 400 })
  }

  try {
    const passportProfile = await prisma.passportProfile.create({
      data: { wallet },
    })

    return NextResponse.json({ passportId: passportProfile.id })
  } catch (error) {
    console.error('Error creating passport profile:', error)
    return NextResponse.json({ error: 'Failed to create passport profile' }, { status: 500 })
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const wallet = searchParams.get('wallet')

  if (!wallet) {
    return NextResponse.json({ error: 'Wallet address is required' }, { status: 400 })
  }

  try {
    let passportProfile = await prisma.passportProfile.findUnique({
      where: { wallet },
    })

    if (!passportProfile) {
      passportProfile = await prisma.passportProfile.create({
        data: { wallet },
      })
    }

    return NextResponse.json({ passportId: passportProfile.id })
  } catch (error) {
    console.error('Error in passport profile operation:', error)
    return NextResponse.json({ error: 'Failed to process passport profile' }, { status: 500 })
  }
}

// Update or Delete a PassportProfile
export async function PATCH(request: Request) {
  try {
    const { id, ...body } = await request.json()
    const updatedProfile = await updatePassportProfileById(Number(id), body)
    return NextResponse.json(updatedProfile, { status: 200 })
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    } else {
      return NextResponse.json(
        { error: 'An unknown error occurred' },
        { status: 500 },
      )
    }
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  try {
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }

    const deletedProfile = await deletePassportProfileById(Number(id))
    return NextResponse.json(deletedProfile, { status: 200 })
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    } else {
      return NextResponse.json(
        { error: 'An unknown error occurred' },
        { status: 500 },
      )
    }
  }
}
