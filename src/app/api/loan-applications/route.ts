import { NextResponse } from 'next/server'
import { PrismaClient, } from '@prisma/client'
import {
  getLoanApplicationById,
  getAllLoanApplications,
  updateLoanApplicationById,
  deleteLoanApplicationById,
} from '@/services/loanApplication'
//import prisma from '@/utils/prisma'

const prisma = new PrismaClient()

// Create a new LoanApplication
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { userWallet, ...loanApplicationData } = body

    if (!userWallet) {
      return NextResponse.json({ error: 'User wallet is required' }, { status: 400 })
    }

    // Validate or create passport profile
    const passportResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/passport-profiles?wallet=${userWallet}`, {
      method: 'GET',
    })

    if (!passportResponse.ok) {
      const errorData = await passportResponse.json()
      return NextResponse.json({ error: errorData.error || 'Failed to validate or create passport profile' }, { status: passportResponse.status })
    }

    const { passportId } = await passportResponse.json()

    // Create loan application
    const loanApplication = await prisma.loanApplication.create({
      data: {
        ...loanApplicationData,
        passportProfileId: passportId,
        userWallet,
      },
    })

    return NextResponse.json(loanApplication)
  } catch (error) {
    console.error('Error creating loan application:', error)
    return NextResponse.json({ error: 'Failed to create loan application' }, { status: 500 })
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  try {
    if (id) {
      const loanApplication = await getLoanApplicationById(Number(id))
      return NextResponse.json(loanApplication, { status: 200 })
    } else {
      const loanApplications = await getAllLoanApplications()
      return NextResponse.json(loanApplications, { status: 200 })
    }
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

// Update or Delete a LoanApplication
export async function PATCH(request: Request) {
  try {
    const { id, ...body } = await request.json()
    const updatedLoanApplication = await updateLoanApplicationById(
      Number(id),
      body,
    )
    return NextResponse.json(updatedLoanApplication, { status: 200 })
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

    const deletedLoanApplication = await deleteLoanApplicationById(Number(id))
    return NextResponse.json(deletedLoanApplication, { status: 200 })
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
