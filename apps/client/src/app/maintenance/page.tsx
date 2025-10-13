import { Clock, Construction, Mail } from 'lucide-react';

export default function Maintenance() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gunmetal via-black to-gunmetal px-4">
      <div className="w-full max-w-3xl text-center">
        {/* Icon */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 animate-pulse rounded-full bg-primary/20 blur-xl" />
            <div className="relative rounded-full bg-primary/10 p-8">
              <Construction className="h-20 w-20 text-primary" strokeWidth={1.5} />
            </div>
          </div>
        </div>

        {/* Main Message */}
        <h1 className="mb-6 text-4xl font-bold text-white md:text-6xl">Well Be Right Back</h1>
        <p className="mx-auto mb-12 max-w-2xl text-xl text-cadet-grey md:text-2xl">
          Were currently performing scheduled maintenance to improve your experience.
        </p>

        {/* Info Cards */}
        <div className="mx-auto mb-12 grid max-w-2xl gap-6 md:grid-cols-2">
          {/* Expected Duration */}
          <div className="rounded-lg border border-primary/20 bg-gunmetal/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/40">
            <div className="mb-3 flex items-center justify-center">
              <Clock className="h-8 w-8 text-primary" strokeWidth={1.5} />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-white">Expected Duration</h3>
            <p className="text-cadet-grey">Approximately 1-2 hours</p>
          </div>

          {/* Contact */}
          <div className="rounded-lg border border-primary/20 bg-gunmetal/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/40">
            <div className="mb-3 flex items-center justify-center">
              <Mail className="h-8 w-8 text-primary" strokeWidth={1.5} />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-white">Need Help?</h3>
            <p className="text-cadet-grey">Contact support@cartop.com</p>
          </div>
        </div>

        {/* What We're Doing */}
        <div className="mx-auto mb-12 max-w-2xl rounded-lg border border-primary/10 bg-gunmetal/30 p-8 backdrop-blur-sm">
          <h3 className="mb-4 text-xl font-semibold text-white">What Were Working On</h3>
          <ul className="mx-auto max-w-md space-y-3 text-left text-cadet-grey">
            <li className="flex items-start gap-3">
              <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-primary" />
              <span>System performance improvements</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-primary" />
              <span>Security enhancements</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-primary" />
              <span>Database optimizations</span>
            </li>
          </ul>
        </div>

        {/* Loading Animation */}
        <div className="flex justify-center gap-2">
          <div
            className="h-3 w-3 animate-bounce rounded-full bg-primary"
            style={{ animationDelay: '0ms' }}
          />
          <div
            className="h-3 w-3 animate-bounce rounded-full bg-primary"
            style={{ animationDelay: '150ms' }}
          />
          <div
            className="h-3 w-3 animate-bounce rounded-full bg-primary"
            style={{ animationDelay: '300ms' }}
          />
        </div>

        {/* Footer Message */}
        <p className="mt-8 text-sm text-french-grey">Thank you for your patience</p>
      </div>
    </div>
  );
}
