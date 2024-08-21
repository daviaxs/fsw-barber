'use server'

import { revalidatePath } from 'next/cache'
import { db } from '../../app/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOption } from '../../app/lib/auth'

interface CreateBookingParams {
  serviceId: string
  date: Date
}

export const createBooking = async (params: CreateBookingParams) => {
  const user = await getServerSession(authOption)

  if (!user) {
    throw new Error('Usuário não autenticado')
  }

  await db.booking.create({
    data: { ...params, userId: (user.user as any).id },
  })
  revalidatePath(`/barbershops/[id]`)
  revalidatePath(`/bookings`)
}
