// pages/terms-of-use.tsx

const TermsOfUse = () => {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold text-center mb-10">Terms of Use</h1>

      <div className="max-w-4xl mx-auto text-lg text-gray-600 leading-relaxed space-y-6">
        <p>
          By accessing and using the <strong>LetzBattle</strong> platform, you agree to abide by the following terms and conditions. Please read these carefully, as they affect your legal rights.
        </p>

        <h2 className="text-3xl font-semibold mt-6 mb-2">1. Acceptance of Terms</h2>
        <p>
          By using our website or services, you confirm that you accept these terms and conditions. If you do not agree with any part of these terms, you must refrain from using our services.
        </p>

        <h2 className="text-3xl font-semibold mt-6 mb-2">2. User Responsibilities</h2>
        <p>
          Users are responsible for maintaining the confidentiality of their account information, including usernames and passwords. You are also responsible for ensuring that your activities on the platform comply with applicable laws and regulations.
        </p>

        <h2 className="text-3xl font-semibold mt-6 mb-2">3. Limitation of Liability</h2>
        <p>
          LetzBattle will not be held liable for any direct, indirect, incidental, or consequential damages arising from the use of our platform.
        </p>

        <h2 className="text-3xl font-semibold mt-6 mb-2">4. Changes to Terms</h2>
        <p>
          We reserve the right to modify these terms at any time. Continued use of the platform after changes are made indicates your acceptance of the new terms.
        </p>

        <h2 className="text-3xl font-semibold mt-6 mb-2">5. Contact Information</h2>
        <p>
          If you have any questions about these Terms of Use, please contact us at <a href="mailto:support@letzbattle.com" className="text-blue-500 underline">support@letzbattle.com</a>.
        </p>
      </div>

      <div className="text-center mt-10">
        <a href="/contact-us" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded">
          Contact Us for More Information
        </a>
      </div>
    </div>
  );
};

export default TermsOfUse;
