'use client'

import { Button } from '@/shared/components/ui/button'
import { Calendar } from '@/shared/components/ui/calendar'
import { Card, CardContent } from '@/shared/components/ui/card'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/shared/components/ui/sheet'
import { Barbershop, BarbershopService, Booking } from '@prisma/client'
import Image from 'next/image'
import { ptBR } from 'date-fns/locale'
import { useState } from 'react'
import { format, set } from 'date-fns'
import { createBooking } from '@/shared/actions/create-booking'
import { toast } from 'sonner'
import { useSession } from 'next-auth/react'

interface ServiceItemProps {
  service: BarbershopService
  barbershop: Pick<Barbershop, 'name'>
}

const TIME_LIST = [
  '08:00',
  '08:30',
  '09:00',
  '09:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '12:00',
  '12:30',
  '13:00',
  '13:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
  '17:00',
  '17:30',
  '18:00',
]

const getTimeList = (bookings: Booking[]) => {
  return TIME_LIST.filter((time) => {
    const hour = Number(time.split(':')[0])
    const minute = Number(time.split(':')[1])

    const hasBookingOnCurrentTime = bookings.some(
      (booking) =>
        booking.date.getHours() === hour &&
        booking.date.getMinutes() === minute,
    )

    if (hasBookingOnCurrentTime) {
      return false
    }

    return true
  })
}

export function ServiceItem({ service, barbershop }: ServiceItemProps) {
  const { data } = useSession()
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined)
  const [dayBookings, setDayBookings] = useState<Booking[]>([])
  const [BookingSheetIsOpen, setBookingSheetIsOpen] = useState(false)
  const [selectedTime, setSelectedTime] = useState<string | undefined>(
    undefined,
  )

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDay(date)
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
  }

  const handleBookingsSheetOpenChange = () => {
    setSelectedDay(undefined)
    setSelectedTime(undefined)
    setDayBookings([])
    setBookingSheetIsOpen(false)
  }

  const handleCreateBooking = async () => {
    try {
      if (!selectedDay || !selectedTime) return

      const hour = Number(selectedTime.split(':')[0])
      const minute = Number(selectedTime.split(':')[1])
      const newDate = set(selectedDay, {
        hours: hour,
        minutes: minute,
      })

      await createBooking({
        serviceId: service.id,
        userId: 'clzlmtng50000xz31wz0trlc6',
        date: newDate,
      })

      toast.success('Reserva feita com sucesso!')
      handleBookingsSheetOpenChange()
    } catch (error) {
      console.error(error)
      toast.error('Erro ao fazer reserva!')
    }
  }

  const handleBookingClick = () => {
    if (data?.user) {
      return setBookingSheetIsOpen(true)
    }

    return toast.error('Você precisa estar logado para fazer uma reserva!')
  }

  return (
    <Card className="">
      <CardContent className="flex max-w-full items-center gap-3 p-3 max-sm:flex-col">
        <div className="relative max-h-[110px] min-h-[110px] min-w-[110px] max-w-[110px]">
          <Image
            src={service.imageUrl}
            alt={service.name}
            className="rounded-lg object-cover"
            fill
          />
        </div>

        <div className="flex w-full flex-col">
          <h3 className="text-sm font-semibold max-sm:text-center">
            {service.name}
          </h3>
          <p className="text-sm text-gray-400 max-sm:text-center">
            {service.description}
          </p>

          <div className="flex items-center justify-between">
            <p className="text-sm font-bold text-primary">
              {Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(Number(service.price))}
            </p>

            <Sheet
              open={BookingSheetIsOpen}
              onOpenChange={handleBookingsSheetOpenChange}
            >
              <Button
                variant={'secondary'}
                size={'sm'}
                onClick={handleBookingClick}
              >
                Reservar
              </Button>

              <SheetContent className="px-0 max-sm:w-full">
                <SheetHeader>
                  <SheetTitle>Fazer Reserva</SheetTitle>
                </SheetHeader>

                <div className="border-b border-solid py-5">
                  <Calendar
                    mode="single"
                    locale={ptBR}
                    selected={selectedDay}
                    onSelect={handleDateSelect}
                    styles={{
                      head_cell: {
                        width: '100%',
                        textTransform: 'capitalize',
                      },
                      cell: {
                        width: '100%',
                      },
                      button: {
                        width: '100%',
                      },
                      nav_button_previous: {
                        width: '32px',
                        height: '32px',
                      },
                      nav_button_next: {
                        width: '32px',
                        height: '32px',
                      },
                      caption: {
                        textTransform: 'capitalize',
                      },
                    }}
                  />
                </div>

                {selectedDay && (
                  <div className="flex gap-3 overflow-x-auto border-b border-solid p-5 [&::-webkit-scrollbar]:hidden">
                    {getTimeList(dayBookings).map((time) => (
                      <Button
                        key={time}
                        className="rounded-full"
                        variant={selectedTime === time ? 'default' : 'outline'}
                        onClick={() => handleTimeSelect(time)}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                )}

                {selectedDay && selectedTime && (
                  <div className="p-5">
                    <Card>
                      <CardContent className="space-y-3 p-3">
                        <div className="flex items-center justify-between">
                          <h2 className="font-bold">{service.name}</h2>
                          <p className="text-sm font-bold">
                            {Intl.NumberFormat('pt-BR', {
                              style: 'currency',
                              currency: 'BRL',
                            }).format(Number(service.price))}
                          </p>
                        </div>

                        <div className="flex items-center justify-between">
                          <h2 className="text-sm text-gray-400">Data</h2>
                          <p className="text-sm">
                            {format(selectedDay, "d 'de' MMMM", {
                              locale: ptBR,
                            })}
                          </p>
                        </div>

                        <div className="flex items-center justify-between">
                          <h2 className="text-sm text-gray-400">Barbearia</h2>
                          <p className="text-sm">{barbershop.name}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                <SheetFooter className="mt-5 px-5">
                  <SheetClose asChild>
                    <Button
                      disabled={!selectedDay || !selectedTime}
                      onClick={handleCreateBooking}
                      className="w-full"
                    >
                      Confirmar
                    </Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
