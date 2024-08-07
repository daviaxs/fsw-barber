import { Card, CardContent } from '../ui/card'

export function Footer() {
  return (
    <footer>
      <Card className="w-[100vw] rounded-none border-none outline outline-1 outline-border">
        <CardContent className="px-5 py-6">
          <p className="text-sm text-gray-400">
            © 2023 Copyright <span className="font-bold">DAVI AXS</span>
          </p>
        </CardContent>
      </Card>
    </footer>
  )
}
