'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { BrandSelector } from '@/components/brand-selector'
import { GenerationSelector } from '@/components/generation-selector'
import { ModelSelector } from '@/components/model-selector'
import { SelectDropdown } from '@/components/select-dropdown'
import {
  FUEL_TYPE_OPTIONS,
  TRANSMISSION_TYPE_OPTIONS,
  DRIVE_TYPE_OPTIONS,
} from '../data/constants'
import { engineSchema, type EngineFormValues } from '../data/schema'

interface EngineFormProps {
  /** Initial values for the form (for editing) */
  defaultValues?: Partial<EngineFormValues>
  /** Whether this is an edit form */
  isEdit?: boolean
  /** Loading state */
  loading?: boolean
  /** Submit handler */
  onSubmit: (values: EngineFormValues) => void | Promise<void>
  /** Cancel handler */
  onCancel: () => void
  /** Pre-selected generation ID (when creating from generation detail) */
  preselectedGenerationId?: string
}

export function EngineForm({
  defaultValues,
  isEdit = false,
  loading = false,
  onSubmit,
  onCancel,
  preselectedGenerationId,
}: EngineFormProps) {
  const [selectedBrandId, setSelectedBrandId] = useState<string>()
  const [selectedModelId, setSelectedModelId] = useState<string>()

  const form = useForm<EngineFormValues>({
    resolver: zodResolver(engineSchema),
    defaultValues: defaultValues || {
      name: '',
      generationId: preselectedGenerationId || '',
      legacySystemId: '',
      fuelType: null,
      transmissionType: null,
      driveType: null,
      consumptionCombined: null,
      consumptionCity: null,
      consumptionOutOfCity: null,
      performance: null,
      torque: null,
      volume: null,
      emission: null,
      rangeKm: null,
      acceleration: null,
      fuelTankVolume: null,
      cylinderCount: null,
      maxSpeed: null,
      weight: null,
      gearsCount: null,
      productionStart: '',
      productionStop: '',
      active: false,
      recommended: false,
    },
  })

  // Extract brand/model from default generation if editing
  useEffect(() => {
    if (defaultValues?.generationId && isEdit) {
      // This would need to be populated from the generation query
      // For now, leave empty - the BrandModelSelector will handle it
    }
  }, [defaultValues, isEdit])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>
              Enter the engine name and select its generation
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-6'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Name <span className='text-destructive'>*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder='2.0 TDI 110kW'
                      autoComplete='off'
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    The display name of the engine
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Brand Selector (Optional - for filtering) */}
            <FormItem>
              <FormLabel>Brand (Optional)</FormLabel>
              <FormControl>
                <BrandSelector
                  value={selectedBrandId}
                  onChange={(brandId) => setSelectedBrandId(brandId)}
                  placeholder='Select a brand to filter models'
                  disabled={loading || !!preselectedGenerationId}
                />
              </FormControl>
              <FormDescription>
                Select brand to filter models (optional)
              </FormDescription>
              <FormMessage />
            </FormItem>

            {/* Model Selector (Optional - for filtering) */}
            <FormItem>
              <FormLabel>Model (Optional)</FormLabel>
              <FormControl>
                <ModelSelector
                  value={selectedModelId}
                  onChange={(modelId) => setSelectedModelId(modelId)}
                  brandId={selectedBrandId}
                  placeholder={
                    selectedBrandId
                      ? 'Select a model from the chosen brand'
                      : 'Select a model (or select a brand first to filter)'
                  }
                  disabled={loading || !!preselectedGenerationId}
                />
              </FormControl>
              <FormDescription>
                Select model to filter generations (optional)
              </FormDescription>
              <FormMessage />
            </FormItem>

            {/* Generation Selector (Required) */}
            <FormField
              control={form.control}
              name='generationId'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Generation <span className='text-destructive'>*</span>
                  </FormLabel>
                  <FormControl>
                    <GenerationSelector
                      value={field.value}
                      onChange={(generationId) => field.onChange(generationId)}
                      modelId={selectedModelId}
                      placeholder={
                        selectedModelId
                          ? 'Select a generation from the chosen model'
                          : 'Select a generation (or select a model first to filter)'
                      }
                      disabled={loading || !!preselectedGenerationId}
                    />
                  </FormControl>
                  <FormDescription>
                    The generation this engine belongs to
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Engine Type */}
        <Card>
          <CardHeader>
            <CardTitle>Engine Type</CardTitle>
            <CardDescription>
              Fuel, transmission, and drive type
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-6'>
            <div className='grid gap-4 md:grid-cols-3'>
              <FormField
                control={form.control}
                name='fuelType'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fuel Type</FormLabel>
                    <FormControl>
                      <SelectDropdown
                        defaultValue={field.value as string | undefined}
                        onValueChange={(value) => field.onChange(value)}
                        placeholder='Select fuel type'
                        items={FUEL_TYPE_OPTIONS}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='transmissionType'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Transmission</FormLabel>
                    <FormControl>
                      <SelectDropdown
                        defaultValue={field.value as string | undefined}
                        onValueChange={(value) => field.onChange(value)}
                        placeholder='Select transmission'
                        items={TRANSMISSION_TYPE_OPTIONS}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='driveType'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Drive Type</FormLabel>
                    <FormControl>
                      <SelectDropdown
                        defaultValue={field.value as string | undefined}
                        onValueChange={(value) => field.onChange(value)}
                        placeholder='Select drive type'
                        items={DRIVE_TYPE_OPTIONS}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        {/* Power & Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Power & Performance</CardTitle>
            <CardDescription>
              Engine power and performance characteristics
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-6'>
            <div className='grid gap-4 md:grid-cols-3'>
              <FormField
                control={form.control}
                name='performance'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Power (kW)</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        placeholder='110'
                        {...field}
                        value={field.value ?? ''}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value ? Number(e.target.value) : null
                          )
                        }
                      />
                    </FormControl>
                    <FormDescription>Engine power in kilowatts</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='torque'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Torque (Nm)</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        placeholder='320'
                        {...field}
                        value={field.value ?? ''}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value ? Number(e.target.value) : null
                          )
                        }
                      />
                    </FormControl>
                    <FormDescription>Torque in Newton meters</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='volume'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Volume (ccm)</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        placeholder='1968'
                        {...field}
                        value={field.value ?? ''}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value ? Number(e.target.value) : null
                          )
                        }
                      />
                    </FormControl>
                    <FormDescription>
                      Engine displacement in ccm
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='grid gap-4 md:grid-cols-3'>
              <FormField
                control={form.control}
                name='cylinderCount'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cylinders</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        placeholder='4'
                        {...field}
                        value={field.value ?? ''}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value ? Number(e.target.value) : null
                          )
                        }
                      />
                    </FormControl>
                    <FormDescription>Number of cylinders</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='acceleration'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>0-100 km/h (s)</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        step='0.1'
                        placeholder='8.5'
                        {...field}
                        value={field.value ?? ''}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value ? Number(e.target.value) : null
                          )
                        }
                      />
                    </FormControl>
                    <FormDescription>Acceleration in seconds</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='maxSpeed'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Max Speed (km/h)</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        placeholder='210'
                        {...field}
                        value={field.value ?? ''}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value ? Number(e.target.value) : null
                          )
                        }
                      />
                    </FormControl>
                    <FormDescription>Maximum speed</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        {/* Consumption & Emissions */}
        <Card>
          <CardHeader>
            <CardTitle>Consumption & Emissions</CardTitle>
            <CardDescription>
              Fuel consumption and CO2 emissions
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-6'>
            <div className='grid gap-4 md:grid-cols-3'>
              <FormField
                control={form.control}
                name='consumptionCombined'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Combined (l/100km)</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        step='0.1'
                        placeholder='5.5'
                        {...field}
                        value={field.value ?? ''}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value ? Number(e.target.value) : null
                          )
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='consumptionCity'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City (l/100km)</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        step='0.1'
                        placeholder='6.8'
                        {...field}
                        value={field.value ?? ''}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value ? Number(e.target.value) : null
                          )
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='consumptionOutOfCity'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Highway (l/100km)</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        step='0.1'
                        placeholder='4.5'
                        {...field}
                        value={field.value ?? ''}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value ? Number(e.target.value) : null
                          )
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='grid gap-4 md:grid-cols-2'>
              <FormField
                control={form.control}
                name='emission'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CO2 Emissions (g/km)</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        placeholder='120'
                        {...field}
                        value={field.value ?? ''}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value ? Number(e.target.value) : null
                          )
                        }
                      />
                    </FormControl>
                    <FormDescription>
                      CO2 emissions in grams per kilometer
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='rangeKm'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Range (km)</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        placeholder='800'
                        {...field}
                        value={field.value ?? ''}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value ? Number(e.target.value) : null
                          )
                        }
                      />
                    </FormControl>
                    <FormDescription>
                      Range in kilometers (especially for electric)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        {/* Technical Details */}
        <Card>
          <CardHeader>
            <CardTitle>Technical Details</CardTitle>
            <CardDescription>
              Additional technical specifications
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-6'>
            <div className='grid gap-4 md:grid-cols-3'>
              <FormField
                control={form.control}
                name='fuelTankVolume'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fuel Tank (L)</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        placeholder='60'
                        {...field}
                        value={field.value ?? ''}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value ? Number(e.target.value) : null
                          )
                        }
                      />
                    </FormControl>
                    <FormDescription>Tank volume in liters</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='gearsCount'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gears</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        placeholder='6'
                        {...field}
                        value={field.value ?? ''}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value ? Number(e.target.value) : null
                          )
                        }
                      />
                    </FormControl>
                    <FormDescription>Number of gears</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='weight'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Weight (kg)</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        placeholder='1450'
                        {...field}
                        value={field.value ?? ''}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value ? Number(e.target.value) : null
                          )
                        }
                      />
                    </FormControl>
                    <FormDescription>Vehicle weight in kg</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        {/* Production Period */}
        <Card>
          <CardHeader>
            <CardTitle>Production Period</CardTitle>
            <CardDescription>When was this engine produced</CardDescription>
          </CardHeader>
          <CardContent className='space-y-6'>
            <div className='grid gap-4 md:grid-cols-2'>
              <FormField
                control={form.control}
                name='productionStart'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Production Start</FormLabel>
                    <FormControl>
                      <Input type='date' {...field} value={field.value || ''} />
                    </FormControl>
                    <FormDescription>
                      Production start date (optional)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='productionStop'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Production End</FormLabel>
                    <FormControl>
                      <Input type='date' {...field} value={field.value || ''} />
                    </FormControl>
                    <FormDescription>
                      Production end date (optional, leave empty if still in
                      production)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        {/* Status & Visibility */}
        <Card>
          <CardHeader>
            <CardTitle>Status & Visibility</CardTitle>
            <CardDescription>
              Control how this engine appears to users
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-6'>
            <FormField
              control={form.control}
              name='active'
              render={({ field }) => (
                <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
                  <div className='space-y-0.5'>
                    <FormLabel className='text-base'>Active</FormLabel>
                    <FormDescription>
                      {field.value
                        ? 'Engine is visible to users'
                        : 'Engine is hidden from users'}
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='recommended'
              render={({ field }) => (
                <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
                  <div className='space-y-0.5'>
                    <FormLabel className='text-base'>Recommended</FormLabel>
                    <FormDescription>
                      {field.value
                        ? 'Engine is marked as recommended'
                        : 'Engine is not recommended'}
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Legacy System Fields */}
        {!isEdit && (
          <Card>
            <CardHeader>
              <CardTitle>Legacy System</CardTitle>
              <CardDescription>
                Optional fields for migration from legacy systems
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-6'>
              <FormField
                control={form.control}
                name='legacySystemId'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-muted-foreground'>
                      Legacy System ID
                    </FormLabel>
                    <FormControl>
                      <Input placeholder='Optional' {...field} />
                    </FormControl>
                    <FormDescription>
                      ID from the previous system
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        )}

        {/* Form Actions */}
        <div className='flex items-center justify-end gap-4'>
          <Button
            type='button'
            variant='outline'
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button type='submit' disabled={loading}>
            {loading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
            {isEdit ? 'Update Engine' : 'Create Engine'}
          </Button>
        </div>
      </form>
    </Form>
  )
}
