
import React from 'react';
import Particles from './magicui/particles';

function PrivacyPolicy() {
  return (
    <div className="p-6 bg-black dark:bg-gray-900 min-h-screen">
      <Particles
        className="fixed inset-0 h-full w-full"
        quantity={500}
        ease={100}
        color="#ffffff"
        refresh
      />
      <h1 className="text-4xl font-bold text-white text-center my-8 mt-24">Privacy Policy</h1>
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg relative z-10">
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          At NexGenBattles, we value your privacy and are committed to protecting your personal data. This Privacy Policy
          explains how we collect, use, and safeguard your personal information when you visit our website.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Information We Collect</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          We collect the following types of personal data:
        </p>
        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-6">
          <li><strong>Personal Identification Information:</strong> Name, email address, phone number, etc.</li>
          <li><strong>Technical Data:</strong> IP address, browser type, time zone, and location data.</li>
          <li><strong>Usage Data:</strong> Information on how you use our website and services.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">How We Use Your Information</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          We use your personal information for the following purposes:
        </p>
        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-6">
          <li>To provide and maintain our services.</li>
          <li>To notify you about changes to our services.</li>
          <li>To improve user experience and website performance.</li>
          <li>To comply with legal obligations.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Your Rights</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          You have the right to access, update, or delete your personal information at any time. You may also opt out of
          marketing communications by following the unsubscribe instructions included in our emails.
        </p>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
