import { Header } from '@/shared/components/header/Header'
import { Button } from '@/shared/components/ui/button'
import {
  quickSearchOptions,
  QuickSearchOptionParams,
} from '@/shared/utils/quick-search-options'
import Image from 'next/image'
import { db } from '@/app/lib/prisma'
import { BarbershopItem } from './components/BarbershopItem'
import { Search } from '@/shared/components/search/Search'
import Link from 'next/link'
import { BookingItem } from '@/shared/components/booking-item/BookingItem'
import { getConfirmedBookings } from '@/shared/actions/get-confirmed-bookings'
import { getServerSession } from 'next-auth'
import { authOption } from '@/app/lib/auth'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export default async function Home() {
  const session = await getServerSession(authOption)
  const barbershops = await db.barbershop.findMany({})
  const confirmedBookings = await getConfirmedBookings()
  const popularBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: 'desc',
    },
  })

  return (
    <div>
      <Header />

      <div className="px-4 py-6">
        <div>
          <h1 className="text-xl font-bold">
            Olá,{' '}
            <span className="lowercase">
              {session?.user ? session.user.name : 'bem vindo'}!
            </span>
          </h1>
          <p className="text-[0.7rem] text-gray-300">
            <span className="capitalize">
              {format(new Date(), 'EEEE, dd', { locale: ptBR })}
            </span>

            <span>&nbsp;de&nbsp;</span>

            <span className="capitalize">
              {format(new Date(), 'MMMM', { locale: ptBR })}
            </span>
          </p>
        </div>

        <div className="mt-6">
          <Search />
        </div>

        <div className="mt-6 flex gap-3 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          {quickSearchOptions.map((option: QuickSearchOptionParams) => (
            <Button
              key={option.title}
              variant={'secondary'}
              className="gap-2"
              asChild
            >
              <Link href={`/barbershops/?service=${option.title}`}>
                <Image
                  src={option.imageUrl}
                  alt={option.title}
                  width={16}
                  height={16}
                />

                <span className="text-[0.7rem]">{option.title}</span>
              </Link>
            </Button>
          ))}
        </div>

        <div className="relative mt-6 h-[150px] w-full">
          <Image
            src={'/banner-agende-nos-melhores.png'}
            className="rounded object-cover"
            alt="Agende nos melhores"
            fill
          />
        </div>

        {confirmedBookings.length > 0 && (
          <>
            <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
              Agendamentos
            </h2>
            <div className="flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">
              {confirmedBookings.map((booking) => (
                <BookingItem
                  key={booking.id}
                  booking={JSON.parse(JSON.stringify(booking))}
                />
              ))}
            </div>
          </>
        )}

        <div className="mt-6">
          <h2 className="mb-2 text-xs font-bold uppercase text-gray-400">
            RECOMENDADOS
          </h2>

          <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
            {barbershops.map((barbershops) => (
              <BarbershopItem key={barbershops.id} barbershop={barbershops} />
            ))}
          </div>
        </div>

        <div className="mt-6">
          <h2 className="mb-2 text-xs font-bold uppercase text-gray-400">
            POPULARES
          </h2>

          <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
            {popularBarbershops.map((barbershops) => (
              <BarbershopItem key={barbershops.id} barbershop={barbershops} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
