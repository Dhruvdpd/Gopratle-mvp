'use client';

import { Button } from '@/components/Button';
import { useRouter } from 'next/navigation';

export default function SuccessPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-pearl flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center animate-fadeInUp">
        <div className="mb-8">
          <div className="w-24 h-24 bg-bronze rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-12 h-12 text-ivory"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-5xl md:text-6xl font-display font-light text-noir mb-4">
            Requirement Submitted
          </h1>
          <p className="text-lg text-charcoal/70 font-body font-light">
            Your event requirement has been successfully created and saved to our database.
          </p>
        </div>

        <div className="bg-ivory border border-champagne p-8 mb-8">
          <p className="text-sm font-body font-light text-charcoal leading-relaxed">
            We've recorded all the details of your requirement. Your submission includes event
            information, category selection, and specific requirements. You can create another
            requirement or return to the home page.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="primary" onClick={() => router.push('/')}>
            Create Another Requirement
          </Button>
          <Button variant="secondary" onClick={() => router.push('/requirements')}>
            View All Requirements
          </Button>
        </div>
      </div>
    </div>
  );
}