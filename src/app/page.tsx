import Link from "next/link";
import PageLayout from "@/components/PageLayout";
import { BreadcrumbStep } from "@/components/Breadcrumbs";

export default function Home() {
  // Пример данных для бредкрамбсов
  const breadcrumbSteps: BreadcrumbStep[] = [
    { id: 'new-campaign', label: 'New Campaign', status: 'completed', isSection: true },
    { id: 'general', label: 'General', status: 'current' },
    { id: 'channels', label: 'Channels', status: 'pending' },
    { id: 'channel-details', label: 'Channel Details', status: 'pending' },
    { id: 'summary', label: 'Summary', status: 'pending' }
  ];

  return (
    <PageLayout breadcrumbs={breadcrumbSteps} title="Campaign Information">
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 h-full">
        <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-full">
          <h1 className="text-4xl font-bold text-center mb-8">Madhive Proto</h1>
          <p className="text-lg text-gray-600 mb-4">Пример страницы с бредкрамбсами и заголовком</p>
        </div>
      </div>
    </PageLayout>
  );
}
