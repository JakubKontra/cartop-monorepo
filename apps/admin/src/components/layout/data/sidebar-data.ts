import {
  Construction,
  LayoutDashboard,
  Monitor,
  Bug,
  ListTodo,
  FileX,
  HelpCircle,
  Lock,
  Bell,
  Package,
  Palette,
  ServerOff,
  Settings,
  Wrench,
  UserCog,
  UserX,
  Users,
  MessagesSquare,
  ShieldCheck,
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
  Tags,
  Car,
  History,
  Building2,
  ClipboardList,
  FileText,
  Upload,
  Paintbrush,
  Percent,
  Cog,
  ListChecks,
  UserCircle,
  PackageOpen,
} from 'lucide-react'
import { type SidebarData } from '../types'
import { Permission } from '@/lib/permissions'

export const sidebarData: SidebarData = {
  user: {
    name: 'satnaing',
    email: 'satnaingdev@gmail.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'CarTop Admin',
      logo: Command,
      plan: 'Administrace',
    },
  ],
  navGroups: [
    {
      title: 'Přehled',
      items: [
        {
          title: 'Dashboard',
          url: '/',
          icon: LayoutDashboard,
        },
      ],
    },
    {
      title: 'Katalog vozidel',
      items: [
        {
          title: 'Značky a modely',
          icon: Car,
          items: [
            {
              title: 'Značky',
              url: '/brands',
              icon: Tags,
              requiredPermissions: [Permission.CATALOG_BRANDS_VIEW],
            },
            {
              title: 'Modely',
              url: '/models',
              icon: Car,
              requiredPermissions: [Permission.CATALOG_MODELS_VIEW],
            },
            {
              title: 'Generace',
              url: '/generations',
              icon: History,
              requiredPermissions: [Permission.CATALOG_MODELS_VIEW],
            },
            {
              title: 'Motorizace',
              url: '/engines',
              icon: Cog,
              requiredPermissions: [Permission.CATALOG_MODELS_VIEW],
            },
          ],
        },
        {
          title: 'Vybavení a barvy',
          icon: Paintbrush,
          items: [
            {
              title: 'Položky vybavení',
              url: '/equipment-items',
              icon: ListChecks,
            },
            {
              title: 'Barvy',
              url: '/colors',
              icon: Paintbrush,
            },
          ],
        },
        {
          title: 'Náhled slev',
          url: '/discounts',
          icon: Percent,
        },
      ],
    },
    {
      title: 'Poptávky',
      items: [
        {
          title: 'Poptávky vozů',
          url: '/car-requests',
          icon: ClipboardList,
        },
        {
          title: 'Onboardingy',
          url: '/onboardings',
          icon: Upload,
        },
      ],
    },
    {
      title: 'Zákazníci',
      items: [
        {
          title: 'Zákazníci',
          url: '/customers',
          icon: UserCircle,
        },
      ],
    },
    {
      title: 'Nabídky',
      items: [
        {
          title: 'Všechny nabídky',
          url: '/offers',
          icon: PackageOpen,
        },
      ],
    },
    {
      title: 'Leasing',
      items: [
        {
          title: 'Leasingové společnosti',
          url: '/leasing-companies',
          icon: Building2,
        },
        {
          title: 'Šablony dokumentů',
          url: '/document-templates',
          icon: FileText,
        },
      ],
    },
    {
      title: 'Uživatelé',
      items: [
        {
          title: 'Uživatelé',
          url: '/users',
          icon: Users,
          requiredPermissions: [Permission.USERS_VIEW],
        },
      ],
    },
    {
      title: 'Nastavení',
      items: [
        {
          title: 'Profil',
          url: '/settings',
          icon: UserCog,
        },
        {
          title: 'Účet',
          url: '/settings/account',
          icon: Wrench,
        },
        {
          title: 'Vzhled',
          url: '/settings/appearance',
          icon: Palette,
        },
        {
          title: 'Notifikace',
          url: '/settings/notifications',
          icon: Bell,
        },
        {
          title: 'Zobrazení',
          url: '/settings/display',
          icon: Monitor,
        },
      ],
    },
  ],
}
