import { Button } from '@/components/Button';

interface Step4Props {
  eventData: any;
  categoryData: any;
  detailsData: any;
  onBack: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

export default function Step4Review({
  eventData,
  categoryData,
  detailsData,
  onBack,
  onSubmit,
  isSubmitting,
}: Step4Props) {
  const formatDate = (dateString: string) => {
    if (!dateString) return 'Not specified';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
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

  return (
    <div className="space-y-8 animate-fadeInUp">
      <div className="mb-8">
        <h2 className="text-4xl md:text-5xl font-display font-light text-noir mb-3">
          Review & Submit
        </h2>
        <p className="text-charcoal/70 font-body font-light text-sm tracking-wide">
          Verify your requirement details before submission
        </p>
      </div>

      {/* Event Details */}
      <div className="bg-ivory border border-champagne p-6">
        <h3 className="text-xl font-display font-light text-noir mb-4 border-b border-champagne pb-2">
          Event Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-body font-light">
          <div>
            <p className="text-charcoal/60 uppercase tracking-wider text-xs mb-1">Event Name</p>
            <p className="text-noir">{eventData.name}</p>
          </div>
          <div>
            <p className="text-charcoal/60 uppercase tracking-wider text-xs mb-1">Event Type</p>
            <p className="text-noir capitalize">{eventData.type}</p>
          </div>
          <div>
            <p className="text-charcoal/60 uppercase tracking-wider text-xs mb-1">Start Date</p>
            <p className="text-noir">{formatDate(eventData.startDate)}</p>
          </div>
          {eventData.endDate && (
            <div>
              <p className="text-charcoal/60 uppercase tracking-wider text-xs mb-1">End Date</p>
              <p className="text-noir">{formatDate(eventData.endDate)}</p>
            </div>
          )}
          <div>
            <p className="text-charcoal/60 uppercase tracking-wider text-xs mb-1">Location</p>
            <p className="text-noir">{eventData.location}</p>
          </div>
          {eventData.venue && (
            <div>
              <p className="text-charcoal/60 uppercase tracking-wider text-xs mb-1">Venue</p>
              <p className="text-noir">{eventData.venue}</p>
            </div>
          )}
        </div>
      </div>

      {/* Category */}
      <div className="bg-ivory border border-champagne p-6">
        <h3 className="text-xl font-display font-light text-noir mb-4 border-b border-champagne pb-2">
          Requirement Category
        </h3>
        <p className="text-noir text-sm font-body font-light">
          {getCategoryLabel(categoryData.category)}
        </p>
      </div>

      {/* Category-specific Details */}
      <div className="bg-ivory border border-champagne p-6">
        <h3 className="text-xl font-display font-light text-noir mb-4 border-b border-champagne pb-2">
          {getCategoryLabel(categoryData.category)} Details
        </h3>
        <div className="space-y-3 text-sm font-body font-light">
          {Object.entries(detailsData).map(([key, value]) => {
            if (!value || (Array.isArray(value) && value.length === 0)) return null;
            
            const label = key
              .replace(/([A-Z])/g, ' $1')
              .replace(/^./, (str) => str.toUpperCase());

            return (
              <div key={key}>
                <p className="text-charcoal/60 uppercase tracking-wider text-xs mb-1">
                  {label}
                </p>
                {Array.isArray(value) ? (
                  <div className="flex flex-wrap gap-2">
                    {value.map((item, index) => (
                      <span
                        key={index}
                        className="inline-block bg-champagne px-3 py-1 text-xs text-charcoal"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-noir">{String(value)}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="pt-6 flex justify-between">
        <Button type="button" variant="ghost" onClick={onBack} disabled={isSubmitting}>
          Back
        </Button>
        <Button type="button" variant="primary" onClick={onSubmit} isLoading={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Requirement'}
        </Button>
      </div>
    </div>
  );
}