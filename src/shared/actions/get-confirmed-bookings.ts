'use server'

import { getServerSession } from 'next-auth'
import { authOption } from '../../app/lib/auth'
import { db } from '../../app/lib/prisma'

export const getConfirmedBookings = async () => {
  const session = await getServerSession(authOption)

  if (!session?.user) return []

  return db.booking.findMany({
    where: {
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
