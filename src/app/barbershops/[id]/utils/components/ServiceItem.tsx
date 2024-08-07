import { Button } from '@/shared/components/ui/button'
import { Card, CardContent } from '@/shared/components/ui/card'
import { BarbershopService } from '@prisma/client'
import Image from 'next/image'

interface ServiceItemProps {
  service: BarbershopService
}

export function ServiceItem({ service }: ServiceItemProps) {
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

            <Button variant={'secondary'} size={'sm'}>
              Reservar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
