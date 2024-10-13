import prisma from '@/utils/prisma'

// Create a new PassportProfile
export const createPassportProfile = async (data: {
  walletId: string
  talentPassportId: number
  talentUserId: string
  name: string
  profilePictureUrl: string
  verified: boolean
  humanCheck: boolean
  score: number
  activityScore: number
  identityScore: number
  skillsScore: number
  nominationsReceived: number
  socialsLinked: number
  followerCount: number
}) => {
  try {
    const newProfile = await prisma.passportProfile.create({
      data,
    })
    return newProfile
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error creating PassportProfile: ${error.message}`)
    } else {
      throw new Error(`Unknown error occurred`)
    }
  }
}

// Retrieve a PassportProfile by ID
export const getPassportProfileById = async (id: number) => {
  try {
    const profile = await prisma.passportProfile.findUnique({
      where: { id },
    })
    if (!profile) throw new Error('Profile not found')
    return profile
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error retrieving PassportProfile: ${error.message}`)
    } else {
      throw new Error(`Unknown error occurred`)
    }
  }
}

// Retrieve all PassportProfiles
export const getAllPassportProfiles = async () => {
  try {
    const profiles = await prisma.passportProfile.findMany()
    return profiles
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error retrieving PassportProfiles: ${error.message}`)
    } else {
      throw new Error(`Unknown error occurred`)
    }
  }
}

// Update a PassportProfile by ID
export const updatePassportProfileById = async (
  id: number,
  data: Partial<{
    walletId: string
    talentPassportId: number
    talentUserId: string
    name: string
    profilePictureUrl: string
    verified: boolean
    humanCheck: boolean
    score: number
    activityScore: number
    identityScore: number
    skillsScore: number
    nominationsReceived: number
    socialsLinked: number
    followerCount: number
  }>,
) => {
  try {
    const updatedProfile = await prisma.passportProfile.update({
      where: { id },
      data,
    })
    return updatedProfile
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error updating PassportProfile: ${error.message}`)
    } else {
      throw new Error(`Unknown error occurred`)
    }
  }
}

// Delete a PassportProfile by ID
export const deletePassportProfileById = async (id: number) => {
  try {
    const deletedProfile = await prisma.passportProfile.delete({
      where: { id },
    })
    return deletedProfile
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error deleting PassportProfile: ${error.message}`)
    } else {
      throw new Error(`Unknown error occurred`)
    }
  }
}
