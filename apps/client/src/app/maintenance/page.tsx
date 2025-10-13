import { Construction, Clock, Mail } from 'lucide-react';

export default function Maintenance() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gunmetal via-black to-gunmetal flex items-center justify-center px-4">
      <div className="max-w-3xl w-full text-center">
        {/* Icon */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
            <div className="relative bg-primary/10 rounded-full p-8">
              <Construction className="w-20 h-20 text-primary" strokeWidth={1.5} />
            </div>
          </div>
        </div>

        {/* Main Message */}
        <h1 className="text-white text-4xl md:text-6xl font-bold mb-6">Well Be Right Back</h1>
        <p className="text-cadet-grey text-xl md:text-2xl mb-12 max-w-2xl mx-auto">
          Were currently performing scheduled maintenance to improve your experience.
        </p>

        {/* Info Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-12 max-w-2xl mx-auto">
          {/* Expected Duration */}
          <div className="bg-gunmetal/50 backdrop-blur-sm border border-primary/20 rounded-lg p-6 hover:border-primary/40 transition-all duration-300">
            <div className="flex items-center justify-center mb-3">
              <Clock className="w-8 h-8 text-primary" strokeWidth={1.5} />
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">Expected Duration</h3>
            <p className="text-cadet-grey">Approximately 1-2 hours</p>
          </div>

          {/* Contact */}
          <div className="bg-gunmetal/50 backdrop-blur-sm border border-primary/20 rounded-lg p-6 hover:border-primary/40 transition-all duration-300">
            <div className="flex items-center justify-center mb-3">
              <Mail className="w-8 h-8 text-primary" strokeWidth={1.5} />
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">Need Help?</h3>
            <p className="text-cadet-grey">Contact support@cartop.com</p>
          </div>
        </div>

        {/* What We're Doing */}
        <div className="bg-gunmetal/30 backdrop-blur-sm border border-primary/10 rounded-lg p-8 mb-12 max-w-2xl mx-auto">
          <h3 className="text-white text-xl font-semibold mb-4">What Were Working On</h3>
          <ul className="text-cadet-grey space-y-3 text-left max-w-md mx-auto">
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
              <span>System performance improvements</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
              <span>Security enhancements</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
              <span>Database optimizations</span>
            </li>
          </ul>
        </div>

        {/* Loading Animation */}
        <div className="flex justify-center gap-2">
          <div
            className="w-3 h-3 bg-primary rounded-full animate-bounce"
            style={{ animationDelay: '0ms' }}
          />
          <div
            className="w-3 h-3 bg-primary rounded-full animate-bounce"
            style={{ animationDelay: '150ms' }}
          />
          <div
            className="w-3 h-3 bg-primary rounded-full animate-bounce"
            style={{ animationDelay: '300ms' }}
          />
        </div>

        {/* Footer Message */}
        <p className="text-french-grey text-sm mt-8">Thank you for your patience</p>
      </div>
    </div>
  );
}
