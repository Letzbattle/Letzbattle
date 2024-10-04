
import React from 'react';
import Particles from './magicui/particles';

function CookiePolicy() {
  return (
    <div className="p-6 bg-black dark:bg-gray-900 min-h-screen">
      <Particles
        className="fixed inset-0 h-full w-full"
        quantity={500}
        ease={100}
        color="#ffffff"
        refresh
      />
      <h1 className="text-4xl font-bold text-white text-center my-8 mt-24">Cookie Policy</h1>
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg relative z-10">
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          This Cookie Policy explains how NexGenBattles (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) uses cookies and similar technologies to
          recognize you when you visit our website. It explains what these technologies are, why we use them, and your
          rights to control our use of them.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">What are Cookies?</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          Cookies are small data files that are placed on your computer or mobile device when you visit a website. They
          are widely used by website owners to make their websites work or to work more efficiently, as well as to
          provide reporting information.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Why Do We Use Cookies?</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          We use first- and third-party cookies for several reasons. Some cookies are required for technical reasons in
          order for our website to operate, and we refer to these as &quot;essential&quot; or &quot;strictly necessary&quot; cookies. Other
          cookies enable us to track and target the interests of our users to enhance their experience on our website.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Types of Cookies We Use</h2>
        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-6">
          <li><strong>Strictly Necessary Cookies:</strong> These cookies are essential to provide you with services available through our website and to use some of its features.</li>
          <li><strong>Performance Cookies:</strong> These cookies collect information about how you use our website to help us improve the website&apos;s performance and user experience.</li>
          <li><strong>Targeting Cookies:</strong> These cookies are used to deliver relevant ads to users and track the effectiveness of our marketing campaigns.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">How Can I Control Cookies?</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          You have the right to decide whether to accept or reject cookies. You can exercise your cookie rights by
          setting your preferences in the cookie consent manager.
        </p>
      </div>
    </div>
  );
}

export default CookiePolicy;
