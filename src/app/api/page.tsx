'use client';

import dynamic from 'next/dynamic';
import { apiSpec } from '@/lib/swagger';
import 'swagger-ui-react/swagger-ui.css';
import './swagger-ui.css';

// Создаем компонент с подавлением предупреждений
const SwaggerUI = dynamic(() => import('swagger-ui-react'), {
  ssr: false,
  loading: () => <div className="p-8 text-center">Loading API Documentation...</div>
});

export default function ApiDocsPage() {
  // Подавляем предупреждения React Strict Mode для Swagger UI
  if (typeof window !== 'undefined') {
    const originalConsoleWarn = console.warn;
    console.warn = (message, ...args) => {
      if (typeof message === 'string' && 
          (message.includes('UNSAFE_componentWillReceiveProps') || 
           message.includes('OperationContainer'))) {
        return; // Игнорируем предупреждения от Swagger UI
      }
      originalConsoleWarn(message, ...args);
    };
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <SwaggerUI spec={apiSpec} />
        </div>
      </div>
    </div>
  );
}