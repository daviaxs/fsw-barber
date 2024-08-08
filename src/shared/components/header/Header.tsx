import Image from 'next/image'
import { Card, CardContent } from '../ui/card'
import { Button } from '../ui/button'
import { MenuIcon } from 'lucide-react'
import { Sheet, SheetTrigger } from '../ui/sheet'
import { Sidebar } from '../sidebar/Sidebar'

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

          <Sidebar />
        </Sheet>
      </CardContent>
    </Card>
  )
}
