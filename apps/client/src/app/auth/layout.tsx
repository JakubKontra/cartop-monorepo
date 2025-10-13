export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <div>
     <div className='relative container grid h-svh flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0'>

      {children}
    </div>
    </div>;
}
