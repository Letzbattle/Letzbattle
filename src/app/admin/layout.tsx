import Sidebar from '@/app/components/Sidebar';

export default function AdminLayout({ children }: { children: any }) {
  return (
    <div className="flex bg-black">
      <Sidebar />
      <main className="w-screen mt-24"> {/* Use margin-left to account for the sidebar width */}
        {children}
      </main>
    </div>
  );
}
