import { Button } from '@/shared/components/ui/button'
import { db } from '@/shared/lib/prisma'
import { ChevronLeft, MapPin, Menu, Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface BarbershopPageParams {
  params: {
    id: string
  }
}

export default async function BarbershopPage({ params }: BarbershopPageParams) {
  const barbershop = await db.barbershop.findUnique({
    where: {
      id: params.id,
    },
    include: {
      services: true,
    },
  })

  if (!barbershop) {
    return notFound()
  }

  return (
    <div>
      <div className="relative h-[250px] w-full">
        <Image
          src={barbershop.imageUrl}
          alt={barbershop?.name}
          className="object-cover"
          fill
        />

        <div>
          <Button
            className="absolute left-4 top-4"
            size={'icon'}
            variant={'secondary'}
            asChild
          >
            <Link href={'/'}>
              <ChevronLeft />
            </Link>
          </Button>

          <Button
            className="absolute right-4 top-4"
            size={'icon'}
            variant={'secondary'}
          >
            <Menu />
          </Button>
        </div>
      </div>

      <div className="border-b border-solid p-5">
        <h1 className="mb-3 text-xl font-bold">{barbershop.name}</h1>

        <div className="space-y-1">
          <div className="flex items-center justify-start gap-2">
            <MapPin className="text-primary" size={18} />
            <p className="text-sm">{barbershop.address}</p>
          </div>

          <div className="flex items-center justify-start gap-2">
            <Star className="fill-primary text-primary" size={18} />
            <p className="text-sm">5,0 (889 avaliações)</p>
          </div>
        </div>
      </div>

      <div className="space-y-2 border-b border-solid p-5">
        <h2 className="text-sm font-bold uppercase text-gray-400">sobre nós</h2>

        <p className="text-justify text-sm">{barbershop.description}</p>
      </div>
    </div>
  )
}