// "use client";
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';

// const Sidebar = () => {
//   const pathname = usePathname(); // Get the current pathname

//   console.log('Current Pathname:', pathname); 

//   return (
//     <div className="fixed top-0 left-0 w-64 h-screen p-4 bg-gray-800 text-white z-50">
//       <h1 className="text-lg font-bold mb-6">Admin Dashboard</h1>
//       <ul>
//         <li className="mb-2">
//           <Link href="/admin/addEvent" className={`block p-2 rounded ${pathname === '/admin/addEvent' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}>
//             Add Events
//           </Link>
//         </li>
//         <li className="mb-2">
//           <Link href="/admin/events" className={`block p-2 rounded ${pathname === '/admin/events' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}>
//             Your Events
//           </Link>
//         </li>
//         <li className="mb-2">
//           <Link href="/admin/inReviews" className={`block p-2 rounded ${pathname === '/admin/inReviews' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}>
//             In Review
//           </Link>
//         </li>
//         <li className="mb-2">
//           <Link href="/admin/live" className={`block p-2 rounded ${pathname === '/admin/live' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}>
//             Live
//           </Link>
//         </li>
//         <li className="mb-2">
//           <Link href="/admin/wallet" className={`block p-2 rounded ${pathname === '/admin/wallet' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}>
//             Wallet
//           </Link>
//         </li>
//       </ul>
//     </div>
//   );
// };

// export default Sidebar;




// "use client";
// import { useState } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { FiMenu, FiX } from "react-icons/fi"; // Using react-icons for the menu icons

// const Sidebar = () => {
//   const [isOpen, setIsOpen] = useState(false); // State to control sidebar visibility
//   const pathname = usePathname(); // Get the current pathname

//   const toggleSidebar = () => {
//     setIsOpen(!isOpen); // Toggle the sidebar visibility
//   };

//   return (
//     <div>
//       {/* Hamburger Button */}
//       <button
//         onClick={toggleSidebar}
//         className="fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded-md"
//       >
//         {isOpen ? <FiX size={24} /> : <FiMenu size={24} />} {/* Show close (X) icon when open */}
//       </button>

//       {/* Sidebar */}
//       <div
//         className={`fixed top-0 left-0 w-64 h-screen p-4 bg-gray-800 text-white z-40 transform ${
//           isOpen ? "translate-x-0" : "-translate-x-full"
//         } transition-transform duration-300 ease-in-out`}
//       >
//         <h1 className="text-lg font-bold mb-6">Admin Dashboard</h1>
//         <ul>
//           <li className="mb-2">
//             <Link
//               href="/admin/addEvent"
//               className={`block p-2 rounded ${
//                 pathname === "/admin/addEvent" ? "bg-gray-700" : "hover:bg-gray-700"
//               }`}
//             >
//               Add Events
//             </Link>
//           </li>
//           <li className="mb-2">
//             <Link
//               href="/admin/events"
//               className={`block p-2 rounded ${
//                 pathname === "/admin/events" ? "bg-gray-700" : "hover:bg-gray-700"
//               }`}
//             >
//               Your Events
//             </Link>
//           </li>
//           <li className="mb-2">
//             <Link
//               href="/admin/inReviews"
//               className={`block p-2 rounded ${
//                 pathname === "/admin/inReviews" ? "bg-gray-700" : "hover:bg-gray-700"
//               }`}
//             >
//               In Review
//             </Link>
//           </li>
//           <li className="mb-2">
//             <Link
//               href="/admin/live"
//               className={`block p-2 rounded ${
//                 pathname === "/admin/live" ? "bg-gray-700" : "hover:bg-gray-700"
//               }`}
//             >
//               Live
//             </Link>
//           </li>
//           <li className="mb-2">
//             <Link
//               href="/admin/wallet"
//               className={`block p-2 rounded ${
//                 pathname === "/admin/wallet" ? "bg-gray-700" : "hover:bg-gray-700"
//               }`}
//             >
//               Wallet
//             </Link>
//           </li>
//         </ul>
//       </div>

//       {/* Overlay (optional, click to close the sidebar) */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 z-30"
//           onClick={toggleSidebar} // Close sidebar when the overlay is clicked
//         ></div>
//       )}
//     </div>
//   );
// };

// export default Sidebar;


"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiMenu, FiX } from "react-icons/fi"; // Using react-icons for the menu icons

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false); // State to control sidebar visibility
  const pathname = usePathname(); // Get the current pathname

  const toggleSidebar = () => {
    setIsOpen(!isOpen); // Toggle the sidebar visibility
  };

  return (
    <div>
      {/* Hamburger Button */}
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 left-2 z-50 p-2 bg-black text-white rounded-md md:h-screen"
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />} {/* Show close (X) icon when open */}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 w-64 h-screen p-4 bg-black text-white z-40 transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          absolute md:translate-x-0` } // `absolute` ensures it doesn't take space
      >
        <h1 className="text-lg font-bold mb-6 mt-10">Admin Dashboard</h1>
        <ul>
          <li className="mb-2">
            <Link
              href="/admin/addEvent"
              className={`block p-2 rounded ${
                pathname === "/admin/addEvent" ? "bg-gray-700" : "hover:bg-gray-700"
              }`}
            >
              Add Events
            </Link>
          </li>
          <li className="mb-2">
            <Link
              href="/admin/events"
              className={`block p-2 rounded ${
                pathname === "/admin/events" ? "bg-gray-700" : "hover:bg-gray-700"
              }`}
            >
              Your Events
            </Link>
          </li>
          <li className="mb-2">
            <Link
              href="/admin/inReviews"
              className={`block p-2 rounded ${
                pathname === "/admin/inReviews" ? "bg-gray-700" : "hover:bg-gray-700"
              }`}
            >
              In Review
            </Link>
          </li>
          <li className="mb-2">
            <Link
              href="/admin/live"
              className={`block p-2 rounded ${
                pathname === "/admin/live" ? "bg-gray-700" : "hover:bg-gray-700"
              }`}
            >
              Live
            </Link>
          </li>
          <li className="mb-2">
            <Link
              href="/admin/wallet"
              className={`block p-2 rounded ${
                pathname === "/admin/wallet" ? "bg-gray-700" : "hover:bg-gray-700"
              }`}
            >
              Wallet
            </Link>
          </li>
        </ul>
      </div>

      {/* Overlay (optional, click to close the sidebar) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={toggleSidebar} // Close sidebar when the overlay is clicked
        ></div>
      )}
    </div>
  );
};

export default Sidebar;

