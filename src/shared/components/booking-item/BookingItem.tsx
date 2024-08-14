'use client'

import { Avatar, AvatarImage } from '@/shared/components/ui/avatar'
import { Badge } from '@/shared/components/ui/badge'
import { Card, CardContent } from '@/shared/components/ui/card'
import { Prisma } from '@prisma/client'
import { format, isFuture } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet'
import Image from 'next/image'
import { BookingSummary } from '../booking-summary/BookingSummary'
import { PhoneItem } from '@/app/barbershops/[id]/components/PhoneItem'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { useState } from 'react'
import { deleteBooking } from '@/shared/actions/delete-booking'
import { toast } from 'sonner'

interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: {
        include: {
          barbershop: true
        }
      }
    }
  }>
}

export function BookingItem({ booking }: BookingItemProps) {
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  const {
    service: { barbershop },
  } = booking
  const isConcluded = isFuture(booking.date)

  async function handleDeleteBooking() {
    try {
      await deleteBooking(booking.id)
      setIsSheetOpen(false)
      toast.success('Reserva cancelada com sucesso')
    } catch (error) {
      console.error(error)
      toast.error('Erro ao cancelar reserva. Tente novamente.')
    }
  }

  function handleSheetOpenChange(isOpen: boolean) {
    setIsSheetOpen(isOpen)
  }

  return (
    <Sheet open={isSheetOpen} onOpenChange={handleSheetOpenChange}>
      <SheetTrigger className="w-full min-w-[90%]">
        <Card className="h-full min-w-[90%]">
          <CardContent className="flex h-full justify-between p-0">
            <div className="flex flex-col items-start gap-2 py-3 pl-2">
              <Badge
                className="w-fit border-none"
                variant={isConcluded ? 'default' : 'secondary'}
              >
                {isConcluded ? 'Confirmado' : 'Finalizado'}
              </Badge>

              <h3 className="font-semibold">{booking.service.name}</h3>

              <div className="flex items-center justify-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={booking.service.barbershop.imageUrl} />
                </Avatar>

                <p className="text-left text-sm">
                  {booking.service.barbershop.name}
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center border-l-2 px-4">
              <p className="text-sm">
                {format(booking.date, 'MMMM', { locale: ptBR })}
              </p>
              <p className="text-2xl">
                {format(booking.date, 'dd', { locale: ptBR })}
              </p>
              <p className="text-sm">
                {format(booking.date, 'MM:mm', { locale: ptBR })}
              </p>
            </div>
          </CardContent>
        </Card>
      </SheetTrigger>

      <SheetContent className="w-[85%] overflow-y-auto p-0 [&::-webkit-scrollbar]:hidden">
        <SheetHeader className="border-b border-solid p-4">
          <SheetTitle className="text-left">Informacões da Reserva</SheetTitle>
        </SheetHeader>

        <div className="border-b border-solid p-5">
          <div className="relative mt-6 flex h-[180px] w-full items-end">
            <Image
              src={'/map.png'}
              alt={`Mapa da barbearia ${barbershop.name}`}
              className="rounded-xl object-cover"
              fill
            />

            <Card className="z-50 mx-5 mb-3 w-full rounded-xl">
              <CardContent className="flex items-center gap-3 px-5 py-3">
                <Avatar>
                  <AvatarImage src={barbershop.imageUrl} />
                </Avatar>

                <div>
                  <h3 className="font-bold">{barbershop.name}</h3>
                  <p className="text-xs">{barbershop.address}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6">
            <Badge
              variant={isConcluded ? 'default' : 'secondary'}
              className="w-fit"
            >
              {isConcluded ? 'Confirmado' : 'Finalizado'}
            </Badge>

            <div className="mb-3 mt-6">
              <BookingSummary
                barbershop={barbershop}
                service={booking.service}
                selectedDate={booking.date}
              />
            </div>

            <div className="space-y-3">
              {barbershop.phones.map((phone, index) => (
                <PhoneItem phone={phone} key={index} />
              ))}
            </div>
          </div>
        </div>

        <SheetFooter className="p-5">
          <SheetClose asChild>
            <Button variant={'secondary'} className="w-full">
              Fechar
            </Button>
          </SheetClose>

          {isConcluded && (
            <Dialog>
              <DialogTrigger asChild>
                <Button variant={'destructive'} className="w-full">
                  Cancelar reserva
                </Button>
              </DialogTrigger>

              <DialogContent className="w-[90%]">
                <DialogHeader>
                  <DialogTitle>Cancelar reserva?</DialogTitle>

                  <DialogDescription>
                    Tem certeza que deseja cancelar a reserva? Essa ação será
                    irreversível.
                  </DialogDescription>
                </DialogHeader>

                <DialogFooter className="flex gap-3">
                  <DialogClose asChild>
                    <Button variant={'secondary'} className="w-full">
                      Voltar
                    </Button>
                  </DialogClose>

                  <DialogClose asChild>
                    <Button
                      variant={'destructive'}
                      className="w-full"
                      onClick={handleDeleteBooking}
                    >
                      Confirmar
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
