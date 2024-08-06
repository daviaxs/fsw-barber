import { Avatar, AvatarImage } from '@/shared/components/ui/avatar'
import { Badge } from '@/shared/components/ui/badge'
import { Card, CardContent } from '@/shared/components/ui/card'

export function BookingItem() {
  return (
    <>
      <h2 className="mb-2 text-xs font-bold uppercase text-gray-400">
        AGENDAMENTOS
      </h2>

      <Card>
        <CardContent className="flex justify-between p-0">
          <div className="flex flex-col items-start gap-2 py-3 pl-2">
            <Badge className="w-fit border-none">Confirmado</Badge>
            <h3>Corte de Cabelo</h3>

            <div className="flex items-center justify-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src="https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png" />
              </Avatar>

              <p className="text-sm">Vintage Barber</p>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center border-l-2 px-4">
            <p className="text-sm">Fevereiro</p>
            <p className="text-2xl">06</p>
            <p className="text-sm">20:00</p>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
