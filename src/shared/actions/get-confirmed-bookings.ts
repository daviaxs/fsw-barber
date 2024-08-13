'use server'

import { getServerSession } from 'next-auth'
import { authOption } from '../lib/auth'
import { db } from '../lib/prisma'

export const getConfirmedBookings = async () => {
  const session = await getServerSession(authOption)

  if (!session?.user) return []

  return db.booking.findMany({
    where: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      userId: (session.user as any).id,
      date: {
        gte: new Date(),
      },
    },
    include: {
      service: {
        include: {
          barbershop: true,
        },
      },
    },
    orderBy: {
      date: 'asc',
    },
  })
}
