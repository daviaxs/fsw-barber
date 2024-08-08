import Image from 'next/image'
import { Card, CardContent } from '../ui/card'
import { Button } from '../ui/button'
import { CalendarIcon, HomeIcon, LogInIcon, MenuIcon } from 'lucide-react'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet'
import { quickSearchOptions } from '@/app/(home)/utils/quick-search-options'
import Link from 'next/link'
import { Avatar, AvatarImage } from '../ui/avatar'

export function Header() {
  return (
    <Card className="rounded-none border-none outline outline-1 outline-border">
      <CardContent className="flex items-center justify-between px-4 py-2">
        <Image
          src="/fsw-barber.svg"
          alt="fsw barber"
          height={18}
          width={120}
          priority
          quality={100}
        />

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="secondary" size="icon">
              <MenuIcon />
            </Button>
          </SheetTrigger>

          <SheetContent className="overflow-y-scroll [&::-webkit-scrollbar]:hidden">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>

            <div className="flex items-center gap-2 border-b border-solid py-6">
              <Avatar className="outline outline-1 outline-purple-500">
                <AvatarImage
                  src="https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHBlc3NvYXxlbnwwfHwwfHx8MA%3D%3D"
                  style={{
                    objectFit: 'cover',
                  }}
                />
              </Avatar>

              <div>
                <p className="font-bold">Davi Alves</p>
                <p className="text-xs text-gray-400">davialves@gmail.com.io</p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-3 border-b border-solid py-5">
              <SheetClose asChild>
                <Button
                  className="w-full justify-start gap-2"
                  variant={'ghost'}
                  asChild
                >
                  <Link href={'/'}>
                    <HomeIcon size={18} />
                    Início
                  </Link>
                </Button>
              </SheetClose>

              <Button className="w-full justify-start gap-2" variant={'ghost'}>
                <CalendarIcon size={18} />
                Agendamentos
              </Button>
            </div>

            <div className="flex flex-col items-center gap-3 border-b border-solid py-5">
              {quickSearchOptions.map((option) => (
                <Button
                  key={option.title}
                  className="w-full justify-start gap-2"
                  variant={'ghost'}
                >
                  <Image
                    src={option.imageUrl}
                    alt={option.title}
                    height={18}
                    width={18}
                  />
                  {option.title}
                </Button>
              ))}
            </div>

            <div className="flex flex-col items-center gap-3 py-5">
              <Button className="w-full justify-start gap-2" variant={'ghost'}>
                <LogInIcon size={18} />
                Sair da conta
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </CardContent>
    </Card>
  )
}
