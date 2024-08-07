import { Header } from '@/shared/components/header/Header'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { Search } from 'lucide-react'
import {
  QuickSearchOption,
  quickSearchOptions,
} from './utils/quick-search-options'
import Image from 'next/image'
import { BookingItem } from './utils/components/BookingItem'
import { db } from '@/shared/lib/prisma'
import { BarbershopItem } from './utils/components/BarbershopItem'

export default async function Home() {
  const barbershops = await db.barbershop.findMany({})
  const popularBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: 'desc',
    },
  })

  return (
    <>
      <Header />

      <div className="px-4 py-6">
        <div>
          <h1 className="text-xl font-bold">Olá, Davi!</h1>
          <p className="text-[0.7rem] text-gray-300">Sexta, 2 de Fevereiro</p>
        </div>

        <div className="mt-6 flex w-full items-center justify-center gap-2">
          <Input placeholder="Buscar" />

          <Button>
            <Search size={15} />
          </Button>
        </div>

        <div className="mt-6 flex gap-3 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          {quickSearchOptions.map((option: QuickSearchOption) => (
            <Button key={option.title} variant={'secondary'} className="gap-2">
              <Image
                src={option.imageUrl}
                alt={option.title}
                width={16}
                height={16}
              />

              <span className="text-[0.7rem]">{option.title}</span>
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

        <div className="mt-6">
          <BookingItem />
        </div>

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
    </>
  )
}
