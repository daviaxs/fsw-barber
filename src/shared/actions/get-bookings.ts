'use server'

import { endOfDay, startOfDay } from 'date-fns'
import { db } from '../../app/lib/prisma'

interface GetBookingsParams {
  serviceId: string
  date: Date
}

export const getBookings = ({ date }: GetBookingsParams) => {
  return db.booking.findMany({
    where: {
      date: {
        lte: endOfDay(date),
        gte: startOfDay(date),
      },
    },
  })
}
