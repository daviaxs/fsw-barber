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
import { useEffect, useState } from 'react'
import { addDays, set } from 'date-fns'
import { createBooking } from '@/shared/actions/create-booking'
import { toast } from 'sonner'
import { useSession } from 'next-auth/react'
import { getTimeList } from './utils/get-time-list'
import { getBookings } from '@/shared/actions/get-bookings'
import { Dialog, DialogContent } from '@/shared/components/ui/dialog'
import { SignInDialog } from '@/shared/components/sign-in-dialog/SignInDialog'
import { BookingSummary } from '@/shared/components/booking-summary/BookingSummary'

interface ServiceItemProps {
  service: BarbershopService
  barbershop: Pick<Barbershop, 'name'>
}

export function ServiceItem({ service, barbershop }: ServiceItemProps) {
  const { data } = useSession()
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined)
  const [dayBookings, setDayBookings] = useState<Booking[]>([])
  const [bookingSheetIsOpen, setBookingSheetIsOpen] = useState(false)
  const [loginDialogIsOpen, setLoginDialogIsOpen] = useState(false)
  const [selectedTime, setSelectedTime] = useState<string | undefined>(
    undefined,
  )

  useEffect(() => {
    const fetchBookings = async () => {
      if (!selectedDay) return

      const bookings = await getBookings({
        serviceId: service.id,
        date: selectedDay,
      })
      setDayBookings(bookings)
    }

    fetchBookings()
  }, [selectedDay, service.id])

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

    return setLoginDialogIsOpen(true)
  }

  return (
    <>
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
                open={bookingSheetIsOpen}
                onOpenChange={handleBookingsSheetOpenChange}
              >
                <Button
                  variant={'secondary'}
                  size={'sm'}
                  onClick={handleBookingClick}
                >
                  Reservar
                </Button>

                <SheetContent className="overflow-y-auto px-0 max-sm:w-full [&::-webkit-scrollbar]:hidden">
                  <SheetHeader>
                    <SheetTitle>Fazer Reserva</SheetTitle>
                  </SheetHeader>

                  <div className="border-b border-solid py-5">
                    <Calendar
                      mode="single"
                      locale={ptBR}
                      selected={selectedDay}
                      onSelect={handleDateSelect}
                      fromDate={addDays(new Date(), 0)}
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
                          variant={
                            selectedTime === time ? 'default' : 'outline'
                          }
                          onClick={() => handleTimeSelect(time)}
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  )}

                  {selectedDay && selectedTime && (
                    <div className="p-5">
                      <BookingSummary
                        barbershop={barbershop}
                        service={service}
                        selectedDate={selectedDay}
                      />
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

      <Dialog
        open={loginDialogIsOpen}
        onOpenChange={(open) => setLoginDialogIsOpen(open)}
      >
        <DialogContent className="w-[90%] rounded-lg">
          <SignInDialog />
        </DialogContent>
      </Dialog>
    </>
  )
}
