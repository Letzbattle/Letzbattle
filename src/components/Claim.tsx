
import React from 'react';
import Particles from './magicui/particles';

function Claim() {
  return (
    <div className="p-6 bg-black dark:bg-gray-900 min-h-screen">
      <Particles
        className="fixed inset-0 h-full w-full"
        quantity={500}
        ease={100}
        color="#ffffff"
        refresh
      />
      <h1 className="text-4xl font-bold text-white dark:text-white text-center my-8 mt-24">Claim Policy</h1>
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg relative z-10">
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          At NexGenBattles, we aim to provide accurate and transparent information regarding our tournaments, events, and services. Our commitment is to deliver exceptional value to participants, but we understand that issues may arise. The following Claim Policy outlines the process for addressing discrepancies or issues related to our services:
        </p>
        
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Eligibility for Claims</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          Claims can be made under the following conditions:
        </p>
        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-6">
          <li>You believe that the event or tournament did not match the description provided on our platform.</li>
          <li>You encountered technical issues that impacted your ability to participate in the event.</li>
          <li>Any other circumstances where the services provided do not meet your reasonable expectations based on the event information.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">How to File a Claim</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          To file a claim, please contact our support team at <a href="mailto:support@nexgenbattles.com" className="text-blue-500">support@nexgenbattles.com</a> within 7 days of the event conclusion. Include your event ID, the issue experienced, and any supporting documentation or screenshots.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Review Process</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          Our team will review your claim within 10 business days. If your claim is approved, we may offer one of the following resolutions:
        </p>
        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-6">
          <li>Full or partial refund of entry fees.</li>
          <li>Credit toward future events or tournaments.</li>
          <li>Other resolutions as deemed appropriate by our team.</li>
        </ul>

        <p className="text-gray-700 dark:text-gray-300">
        NexGenBattles reserves the right to deny claims if insufficient evidence is provided or if the claim does not meet our eligibility requirements. Our decision on claim resolutions is final.
        </p>
      </div>
    </div>
  );
}

export default Claim;
