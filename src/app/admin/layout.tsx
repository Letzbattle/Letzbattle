import Sidebar from '@/app/components/Sidebar';

export default function AdminLayout({ children }: { children: any }) {
  return (
    <div className="flex bg-black ">
      <Sidebar />
      <main className="w-screen md:relative md:w-[80%] md:left-[20%] mt-24"> {/* Use margin-left to account for the sidebar width */}
        {children}
      </main>
    </div>
  );
}
