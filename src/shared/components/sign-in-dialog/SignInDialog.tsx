import { signIn } from 'next-auth/react'
import { Button } from '../ui/button'
import { DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog'
import Image from 'next/image'

export function SignInDialog() {
  const handleLoginWithGoogle = () => signIn('google')

  return (
    <>
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
        <Image src={'./google.svg'} alt="google" height={18} width={18} />
        Google
      </Button>
    </>
  )
}
