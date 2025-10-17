import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertCircle, Construction } from 'lucide-react'
import { DiscountPreviewTab } from './components/discount-preview-tab'
import { mockDiscountData } from './mock-data'

export default function DiscountsPage() {
  return (
    <div className='flex flex-col gap-4 p-4 md:gap-8 md:p-8'>
      {/* Page Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>
            Náhled slev
          </h1>
          <p className='text-muted-foreground mt-2'>
            Přehled a správa slev pro značky, modely a výbavy
          </p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue='preview' className='w-full'>
        <TabsList className='grid w-full max-w-md grid-cols-2'>
          <TabsTrigger value='preview'>Náhled slev</TabsTrigger>
          <TabsTrigger value='builder'>Nastavení slev</TabsTrigger>
        </TabsList>

        {/* Preview Tab */}
        <TabsContent value='preview' className='mt-6'>
          <DiscountPreviewTab data={mockDiscountData} />
        </TabsContent>

        {/* Builder Tab - Placeholder */}
        <TabsContent value='builder' className='mt-6'>
          <Card>
            <CardHeader>
              <div className='flex items-center gap-2'>
                <Construction className='h-5 w-5 text-muted-foreground' />
                <CardTitle>Nastavení slev - Připravujeme</CardTitle>
              </div>
              <CardDescription>
                Tato funkcionalita je momentálně ve vývoji
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-6'>
              <div className='rounded-lg border border-dashed p-8 text-center'>
                <Construction className='mx-auto h-12 w-12 text-muted-foreground mb-4' />
                <h3 className='text-lg font-semibold mb-2'>
                  Konfigurátor slev bude brzy k dispozici
                </h3>
                <p className='text-sm text-muted-foreground max-w-md mx-auto'>
                  Zde budete moci interaktivně nastavovat slevy pro jednotlivé
                  značky, modely a výbavy. Systém bude podporovat jak procentuální,
                  tak nominální slevy s automatickým výpočtem celkové slevy.
                </p>
              </div>

              {/* Preview of future functionality */}
              <Card className='border-blue-500/50 bg-blue-500/5'>
                <CardHeader>
                  <div className='flex items-center gap-2'>
                    <AlertCircle className='h-4 w-4 text-blue-600' />
                    <CardTitle className='text-base'>
                      Plánované funkce
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className='space-y-2 text-sm'>
                    <li className='flex items-start gap-2'>
                      <span className='text-blue-600 font-bold'>•</span>
                      <span>
                        <strong>Krok 1:</strong> Výběr značky a nastavení základní slevy
                      </span>
                    </li>
                    <li className='flex items-start gap-2'>
                      <span className='text-blue-600 font-bold'>•</span>
                      <span>
                        <strong>Krok 2:</strong> Výběr modelů s možností individuální slevy
                      </span>
                    </li>
                    <li className='flex items-start gap-2'>
                      <span className='text-blue-600 font-bold'>•</span>
                      <span>
                        <strong>Krok 3:</strong> Detailní nastavení pro výbavy a motorizace
                      </span>
                    </li>
                    <li className='flex items-start gap-2'>
                      <span className='text-blue-600 font-bold'>•</span>
                      <span>
                        <strong>Krok 4:</strong> Náhled efektivní slevy v reálném čase
                      </span>
                    </li>
                    <li className='flex items-start gap-2'>
                      <span className='text-blue-600 font-bold'>•</span>
                      <span>
                        <strong>Kombinace slev:</strong> Možnost nastavit procentuální i nominální slevu současně
                      </span>
                    </li>
                    <li className='flex items-start gap-2'>
                      <span className='text-blue-600 font-bold'>•</span>
                      <span>
                        <strong>Hromadné úpravy:</strong> Rychlé nastavení slev pro více modelů najednou
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Mockup Preview */}
              <div className='space-y-4'>
                <h3 className='font-semibold'>Náhled budoucího rozhraní:</h3>
                <div className='grid gap-4 md:grid-cols-3'>
                  <Card className='border-dashed'>
                    <CardHeader>
                      <CardTitle className='text-sm'>1. Výběr značky</CardTitle>
                    </CardHeader>
                    <CardContent className='text-xs text-muted-foreground'>
                      Dropdown se všemi aktivními značkami + pole pro % a Kč slevu
                    </CardContent>
                  </Card>
                  <Card className='border-dashed'>
                    <CardHeader>
                      <CardTitle className='text-sm'>2. Výběr modelu</CardTitle>
                    </CardHeader>
                    <CardContent className='text-xs text-muted-foreground'>
                      Seznam modelů vybrané značky s individuálním nastavením
                    </CardContent>
                  </Card>
                  <Card className='border-dashed'>
                    <CardHeader>
                      <CardTitle className='text-sm'>3. Výbavy</CardTitle>
                    </CardHeader>
                    <CardContent className='text-xs text-muted-foreground'>
                      Detailní konfigurace pro motorizace a výbavové stupně
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
