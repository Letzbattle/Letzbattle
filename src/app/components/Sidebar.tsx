"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
  const pathname = usePathname(); // Get the current pathname

  console.log('Current Pathname:', pathname); 

  return (
    <div className="fixed top-0 left-0 w-64 h-screen p-4 bg-gray-800 text-white z-50">
      <h1 className="text-lg font-bold mb-6">Admin Dashboard</h1>
      <ul>
        <li className="mb-2">
          <Link href="/admin/addEvent" className={`block p-2 rounded ${pathname === '/admin/addEvent' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}>
            Add Events
          </Link>
        </li>
        <li className="mb-2">
          <Link href="/admin/events" className={`block p-2 rounded ${pathname === '/admin/events' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}>
            Your Events
          </Link>
        </li>
        <li className="mb-2">
          <Link href="/admin/inReviews" className={`block p-2 rounded ${pathname === '/admin/inReviews' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}>
            In Review
          </Link>
        </li>
        <li className="mb-2">
          <Link href="/admin/live" className={`block p-2 rounded ${pathname === '/admin/live' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}>
            Live
          </Link>
        </li>
        <li className="mb-2">
          <Link href="/admin/wallet" className={`block p-2 rounded ${pathname === '/admin/wallet' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}>
            Wallet
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
