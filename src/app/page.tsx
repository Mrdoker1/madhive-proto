import Link from "next/link";
import PageLayout from "@/components/layout/PageLayout";

export default function Home() {
  return (
    <PageLayout>
      <div style={{ backgroundColor: 'var(--page-background)' }} className="h-full">
        <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-full">
          <h1 style={{ color: 'black' }} className="text-4xl font-bold text-center mb-8">Madhive Proto</h1>
          <p style={{ color: 'black' }} className="text-lg mb-8">TBD: Placeholder for Dashboard Page</p>
          
          <div style={{ marginTop: '16px', display: 'flex', gap: '16px', flexDirection: 'column', alignItems: 'center' }}>
            <Link 
              href="/new-campaign"
              className="inline-block px-6 py-3 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              style={{ backgroundColor: '#2A1037' }}
            >
              Create New Campaign
            </Link>
            
            <Link 
              href="/channel-details"
              className="inline-block px-6 py-3 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              style={{ backgroundColor: '#2A1037' }}
            >
              Channel Details
            </Link>
            
            <Link 
              href="/summary"
              className="inline-block px-6 py-3 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              style={{ backgroundColor: '#2A1037' }}
            >
              Summary
            </Link>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
