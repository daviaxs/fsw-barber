import { Header } from '@/shared/components/header/Header'
import { db } from '@/shared/lib/prisma'
import { BarbershopItem } from '../(home)/utils/components/BarbershopItem'
import { Search } from '@/shared/components/search/Search'

interface BarbershopsPageProps {
  searchParams: {
    title?: string
    service?: string
  }
}

export default async function BarbershopsPage({
  searchParams,
}: BarbershopsPageProps) {
  const barbershops = await db.barbershop.findMany({
    where: {
      OR: [
        searchParams?.title
          ? {
              name: {
                contains: searchParams.title,
                mode: 'insensitive',
              },
            }
          : {},
        searchParams?.service
          ? {
              services: {
                some: {
                  name: {
                    contains: searchParams.service,
                    mode: 'insensitive',
                  },
                },
              },
            }
          : {},
      ],
    },
  })

  return (
    <div>
      <Header />

      <div className="mt-6 px-5">
        <Search />
      </div>

      <div className="px-5">
        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Resultados para &quot;{searchParams?.title || searchParams?.service}
          &quot;
        </h2>

        <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
          {barbershops.map((barbershop) => (
            <BarbershopItem barbershop={barbershop} key={barbershop.id} />
          ))}
        </div>
      </div>
    </div>
  )
}
