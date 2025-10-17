import { Link } from '@tanstack/react-router'
import { ArrowLeft, Building2, Package, UserCog } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export function OfferCreatePage() {
  return (
    <div className='container mx-auto max-w-5xl py-6'>
      <div className='mb-6 flex items-center gap-4'>
        <Link to='/offers'>
          <Button variant='ghost' size='icon'>
            <ArrowLeft className='h-4 w-4' />
          </Button>
        </Link>
        <div>
          <h1 className='text-3xl font-bold'>Vytvořit nabídku</h1>
          <p className='text-muted-foreground'>
            Vyberte typ nabídky, kterou chcete vytvořit
          </p>
        </div>
      </div>

      <div className='grid gap-6 md:grid-cols-3'>
        <Link
          to='/offers/new/operational-leasing'
          className='transition-transform hover:scale-105'
        >
          <Card className='h-full cursor-pointer border-2 hover:border-primary'>
            <CardHeader>
              <div className='mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900'>
                <Building2 className='h-6 w-6 text-blue-600 dark:text-blue-300' />
              </div>
              <CardTitle>Operativní leasing</CardTitle>
              <CardDescription>
                Nabídka operativního leasingu s měsíčními splátkami a
                zahrnutými službami
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className='space-y-2 text-sm text-muted-foreground'>
                <li>• Měsíční splátky</li>
                <li>• Doba leasingu 12-60 měsíců</li>
                <li>• Roční limit kilometrů</li>
                <li>• Volitelné služby (servis, zimní pneumatiky)</li>
              </ul>
            </CardContent>
          </Card>
        </Link>

        <Link
          to='/offers/new/direct-purchase'
          className='transition-transform hover:scale-105'
        >
          <Card className='h-full cursor-pointer border-2 hover:border-primary'>
            <CardHeader>
              <div className='mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900'>
                <Package className='h-6 w-6 text-green-600 dark:text-green-300' />
              </div>
              <CardTitle>Přímý prodej</CardTitle>
              <CardDescription>
                Veřejná nabídka přímého prodeje vozidla se slevou a zárukou
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className='space-y-2 text-sm text-muted-foreground'>
                <li>• Celková cena</li>
                <li>• Možnost slevy</li>
                <li>• Záruka (volitelné)</li>
                <li>• Možnost financování</li>
              </ul>
            </CardContent>
          </Card>
        </Link>

        <Link
          to='/offers/new/individual'
          className='transition-transform hover:scale-105'
        >
          <Card className='h-full cursor-pointer border-2 hover:border-primary'>
            <CardHeader>
              <div className='mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900'>
                <UserCog className='h-6 w-6 text-purple-600 dark:text-purple-300' />
              </div>
              <CardTitle>Individuální nabídka</CardTitle>
              <CardDescription>
                Nabídka na míru pro konkrétního zákazníka s vlastními požadavky
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className='space-y-2 text-sm text-muted-foreground'>
                <li>• Přiřazení k zákazníkovi</li>
                <li>• Speciální požadavky</li>
                <li>• Termín odpovědi</li>
                <li>• Interní poznámky</li>
              </ul>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}
