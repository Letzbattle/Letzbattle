import Sidebar from '@/app/components/Sidebar';

export default function AdminLayout({ children }: { children: any }) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="w-screen"> {/* Use margin-left to account for the sidebar width */}
        {children}
      </main>
    </div>
  );
}
