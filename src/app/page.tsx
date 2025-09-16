import Link from "next/link";
import PageLayout from "@/components/PageLayout";

export default function Home() {
  return (
    <PageLayout>
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 h-full">
        <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-full">
          <h1 className="text-4xl font-bold text-center mb-8">Madhive Proto</h1>
          <p className="text-lg text-gray-600 mb-8">Welcome to the campaign management platform</p>
          
          <div className="space-y-4">
            <Link 
              href="/new-campaign"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Create New Campaign
            </Link>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
