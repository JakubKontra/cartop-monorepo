import type { LucideIcon } from 'lucide-react'
import {
  Phone,
  PhoneMissed,
  FileText,
  Upload,
  Handshake,
  ShoppingCart,
  XCircle,
} from 'lucide-react'

export type CarRequestStateCode =
  | 'CALLED'
  | 'NOT_REACHED'
  | 'OFFERS_SENT'
  | 'PROVIDING_DOCUMENTS'
  | 'FORWARDED_RISK'
  | 'PURCHASED'
  | 'CANCELLED'

export type CarRequestSection = 'NEW' | 'OPEN' | 'WAITING_FOR_OFFER' | 'FOLLOW_UP_NEEDED'

export interface CarRequestState {
  code: CarRequestStateCode
  name: string
  colorHex: string
  bgColorLight: string
  icon: LucideIcon
  description: string
}

export interface CarRequestSectionConfig {
  key: CarRequestSection
  label: string
  description: string
}

// State Definitions
export const CAR_REQUEST_STATES: Record<CarRequestStateCode, CarRequestState> = {
  CALLED: {
    code: 'CALLED',
    name: 'Dovoláno',
    colorHex: '#3b82f6',
    bgColorLight: '#eff6ff',
    icon: Phone,
    description: 'Zákazník byl úspěšně kontaktován',
  },
  NOT_REACHED: {
    code: 'NOT_REACHED',
    name: 'Nedovoláno',
    colorHex: '#f59e0b',
    bgColorLight: '#fffbeb',
    icon: PhoneMissed,
    description: 'Nepodařilo se zákazníka zastihnout',
  },
  OFFERS_SENT: {
    code: 'OFFERS_SENT',
    name: 'Zaslány nabídky',
    colorHex: '#8b5cf6',
    bgColorLight: '#faf5ff',
    icon: FileText,
    description: 'Nabídky byly zákazníkovi zaslány',
  },
  PROVIDING_DOCUMENTS: {
    code: 'PROVIDING_DOCUMENTS',
    name: 'Dodává podklady',
    colorHex: '#06b6d4',
    bgColorLight: '#ecfeff',
    icon: Upload,
    description: 'Zákazník dodává potřebné dokumenty',
  },
  FORWARDED_RISK: {
    code: 'FORWARDED_RISK',
    name: 'Předáno/Risk',
    colorHex: '#f97316',
    bgColorLight: '#fff7ed',
    icon: Handshake,
    description: 'Poptávka předána dealerovi nebo v riziku',
  },
  PURCHASED: {
    code: 'PURCHASED',
    name: 'Koupeno/Objednáno',
    colorHex: '#10b981',
    bgColorLight: '#f0fdf4',
    icon: ShoppingCart,
    description: 'Zákazník zakoupil nebo objednal vozidlo',
  },
  CANCELLED: {
    code: 'CANCELLED',
    name: 'Zrušeno',
    colorHex: '#ef4444',
    bgColorLight: '#fef2f2',
    icon: XCircle,
    description: 'Poptávka byla zrušena',
  },
}

// Section Definitions
export const CAR_REQUEST_SECTIONS: CarRequestSectionConfig[] = [
  {
    key: 'NEW',
    label: 'Nové',
    description: 'Nové nepřiřazené poptávky',
  },
  {
    key: 'OPEN',
    label: 'Otevřené',
    description: 'Aktivní poptávky v procesu',
  },
  {
    key: 'WAITING_FOR_OFFER',
    label: 'Čekající na nabídku',
    description: 'Poptávky čekající na nabídku od dealera',
  },
  {
    key: 'FOLLOW_UP_NEEDED',
    label: 'Vyžaduje follow-up',
    description: 'Zákazníci s nabídkami zaslanými včera a více',
  },
]

// Helper to get state config by code
export function getStateConfig(code: CarRequestStateCode): CarRequestState {
  return CAR_REQUEST_STATES[code]
}

// Helper to get all state codes
export function getAllStateCodes(): CarRequestStateCode[] {
  return Object.keys(CAR_REQUEST_STATES) as CarRequestStateCode[]
}

// Helper to check if offers were sent more than 1 day ago (need follow-up)
export function needsFollowUpAfterOffer(
  stateCode: CarRequestStateCode | null | undefined,
  offersSentAt: string | null | undefined
): boolean {
  if (stateCode !== 'OFFERS_SENT' || !offersSentAt) return false

  const sentDate = new Date(offersSentAt)
  const now = new Date()
  const daysSince = Math.floor(
    (now.getTime() - sentDate.getTime()) / (1000 * 60 * 60 * 24)
  )

  return daysSince >= 1
}
