'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getRequirements } from '@/lib/api';
import { Button } from '@/components/Button';

interface Requirement {
  _id: string;
  category: string;
  event: {
    name: string;
    type: string;
    startDate: string;
    location: string;
  };
  createdAt: string;
}

export default function RequirementsPage() {
  const router = useRouter();
  const [requirements, setRequirements] = useState<Requirement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRequirements = async () => {
      try {
        const response = await getRequirements();
        if (response.success) {
          setRequirements(response.data || []);
        } else {
          setError(response.message || 'Failed to fetch requirements');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchRequirements();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      planner: 'Event Planner',
      performer: 'Performer',
      crew: 'Crew & Staff',
    };
    return labels[category] || category;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-pearl flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-bronze mx-auto mb-4"></div>
          <p className="text-charcoal font-body font-light">Loading requirements...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pearl py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-12 animate-fadeIn">
          <div>
            <h1 className="text-5xl md:text-6xl font-display font-light text-noir mb-2">
              All Requirements
            </h1>
            <p className="text-charcoal/70 font-body font-light">
              {requirements.length} {requirements.length === 1 ? 'requirement' : 'requirements'}{' '}
              posted
            </p>
          </div>
          <Button variant="primary" onClick={() => router.push('/')}>
            Create New
          </Button>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-8 bg-red-50 border border-red-200 p-4">
            <p className="text-sm text-red-800 font-body font-light">{error}</p>
          </div>
        )}

        {/* Requirements List */}
        {requirements.length === 0 ? (
          <div className="bg-ivory border border-champagne p-12 text-center animate-fadeInUp">
            <svg
              className="w-16 h-16 mx-auto mb-4 text-charcoal/30"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="text-2xl font-display font-light text-noir mb-2">
              No requirements yet
            </h3>
            <p className="text-charcoal/70 font-body font-light mb-6">
              Create your first requirement to get started
            </p>
            <Button variant="secondary" onClick={() => router.push('/')}>
              Create Requirement
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {requirements.map((requirement, index) => (
              <div
                key={requirement._id}
                className="bg-ivory border border-champagne p-6 hover:border-bronze transition-elegant group animate-fadeInUp"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="inline-block bg-bronze text-ivory px-3 py-1 text-xs font-body font-light uppercase tracking-wider">
                    {getCategoryLabel(requirement.category)}
                  </span>
                  <span className="text-xs text-charcoal/50 font-body font-light">
                    {formatDate(requirement.createdAt)}
                  </span>
                </div>

                <h3 className="text-xl font-display font-light text-noir mb-2 group-hover:text-bronze transition-smooth">
                  {requirement.event.name}
                </h3>

                <div className="space-y-2 text-sm font-body font-light text-charcoal/70">
                  <p className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    <span className="capitalize">{requirement.event.type}</span>
                  </p>
                  <p className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {requirement.event.location}
                  </p>
                  <p className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {formatDate(requirement.event.startDate)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}