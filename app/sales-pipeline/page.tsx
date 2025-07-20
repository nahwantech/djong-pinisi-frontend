import SalesPipelineList from '@/components/sales-pipeline/SalesPipelineList';

export default function SalesPipelinePage() {
  return (
    <main className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Sales Pipeline</h1>
        <SalesPipelineList />
      </div>
    </main>
  );
}