'use client'

import { CalendarIcon, HomeIcon, LogInIcon } from 'lucide-react'
import { SheetClose, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet'
import { quickSearchOptions } from '@/app/(home)/utils/quick-search-options'
import Link from 'next/link'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import Image from 'next/image'
import { signIn, signOut, useSession } from 'next-auth/react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'

export function Sidebar() {
  const handleLoginWithGoogle = () => signIn('google')
  const handleLogout = () => signOut()
  const { data } = useSession()

  return (
    <SheetContent className="overflow-y-scroll [&::-webkit-scrollbar]:hidden">
      <SheetHeader>
        <SheetTitle className="text-left">Menu</SheetTitle>
      </SheetHeader>
      {data?.user ? (
        <div className="flex items-center gap-2 border-b border-solid py-6">
          <Avatar className="outline outline-1 outline-purple-500">
            <AvatarImage
              src={data.user.image as string}
              style={{
                objectFit: 'cover',
              }}
            />
          </Avatar>

          <div>
            <p className="font-bold">{data.user.name}</p>
            <p className="text-xs text-gray-400">{data.user.email}</p>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between gap-2 border-b border-solid py-6">
          <h2 className="font-bold">Olá, faça seu login!</h2>
          <Dialog>
            <DialogTrigger asChild>
              <Button size={'icon'}>
                <LogInIcon />
              </Button>
            </DialogTrigger>

            <DialogContent className="w-[90%] rounded-lg">
              <DialogHeader>
                <DialogTitle className="text-center">
                  Faça login na plataforma
                </DialogTitle>
                <DialogDescription className="text-center">
                  Conecte-se usando sua conta do Google
                </DialogDescription>
              </DialogHeader>

              <Button
                variant={'outline'}
                className="gap-2 font-bold"
                onClick={handleLoginWithGoogle}
              >
                <Image
                  src={'./google.svg'}
                  alt="google"
                  height={18}
                  width={18}
                />
                Google
              </Button>
            </DialogContent>
          </Dialog>
        </div>
      )}

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
        <Button
          className="w-full justify-start gap-2"
          variant={'ghost'}
          onClick={handleLogout}
        >
          <LogInIcon size={18} />
          Sair da conta
        </Button>
      </div>
    </SheetContent>
  )
}
