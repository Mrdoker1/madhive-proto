import ServerStatus from "@/components/features/ServerStatus";

export default function Home() {
  return (
    <main className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <ServerStatus />
      </div>
    </main>
  );
}