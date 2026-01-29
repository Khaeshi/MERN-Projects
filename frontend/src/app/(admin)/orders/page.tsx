import { Construction } from 'lucide-react';

export default function OrdersPage() {
  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center">
      <div className="text-center">
        <div className="w-24 h-24 bg-amber-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <Construction className="w-12 h-12 text-amber-400" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-3">Orders Management</h2>
        <p className="text-stone-400 text-lg mb-2">Coming Soon</p>
        <p className="text-stone-500 text-sm max-w-md mx-auto">
          Order tracking and management features are currently under development.
        </p>
      </div>
    </div>
  );
}