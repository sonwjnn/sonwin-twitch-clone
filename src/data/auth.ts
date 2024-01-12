import { currentUser } from '@/lib/auth'
import { db } from '@/lib/db'

export const getSelf = async () => {
  try {
    const self = await currentUser()

    // if (!self) {
    //   throw new Error('Unauthorized')
    // }

    const user = await db.user.findUnique({
      // where: { id: self.id },
      where: { id: 'clr7mclbe000012d77p333jre' },
    })

    if (!user) {
      throw new Error('Not found')
    }

    return user
  } catch {
    return null
  }
}

export const getSelfByUsername = async (name: string) => {
  try {
    const self = await currentUser()

    // if (!self || !self.name) {
    //   throw new Error('Unauthorized')
    // }

    const user = await db.user.findUnique({
      // where: { name },
      where: { name: 'sonwin111' },
    })

    if (!user) {
      throw new Error('User not found')
    }

    // if (self.name !== user.name) {
    //   throw new Error('Unauthorized')
    // }

    return user
  } catch {
    return null
  }
}
