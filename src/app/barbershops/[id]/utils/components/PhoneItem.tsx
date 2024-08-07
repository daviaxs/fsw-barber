'use client'

import { Button } from '@/shared/components/ui/button'
import { Smartphone } from 'lucide-react'
import { toast } from 'sonner'

interface PhoneItemProps {
  phone: string
}

export function PhoneItem({ phone }: PhoneItemProps) {
  const handleCopyPhoneClick = (phone: string) => {
    navigator.clipboard.writeText(phone)
    toast.success('Telefone copiado com sucesso!')
  }

  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-2">
        <Smartphone />
        <p className="text-sm">{phone}</p>
      </div>

      <Button
        variant={'outline'}
        size={'sm'}
        onClick={() => handleCopyPhoneClick(phone)}
      >
        Copiar
      </Button>
    </div>
  )
}
