import { Avatar, AvatarImage } from '@/shared/components/ui/avatar'
import { Badge } from '@/shared/components/ui/badge'
import { Card, CardContent } from '@/shared/components/ui/card'
import { Prisma } from '@prisma/client'
import { format, isFuture } from 'date-fns'
import { ptBR } from 'date-fns/locale'

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
  const isConcluded = isFuture(booking.date)

  return (
    <>
      <Card className="min-w-[90%]">
        <CardContent className="flex justify-between p-0">
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

              <p className="text-sm">{booking.service.barbershop.name}</p>
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
    </>
  )
}
