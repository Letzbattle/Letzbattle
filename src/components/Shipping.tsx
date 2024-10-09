// pages/shipping-and-delivery.tsx

import Particles from "./magicui/particles";

const ShippingAndDelivery = () => {
  return (
    <div className="bg-black h-full flex justify-center items-center">
      <Particles
        className="fixed inset-0 h-full w-full"
        quantity={500}
        ease={100}
        color="#ffffff"
        refresh
      />
      <div className="container mx-auto p-8 z-10 text-white">
        <h1 className="text-4xl font-bold text-center my-20">
          Shipping and Delivery Policy
        </h1>

        <div className="max-w-4xl mx-auto text-lg leading-relaxed space-y-6">
          <p>
            At <strong>NexGen Battles</strong>, we aim to provide a seamless
            shopping experience for any merchandise or products related to our
            platform. Please review the following shipping and delivery
            guidelines for any orders made through our site.
          </p>

          <h2 className="text-3xl font-semibold mt-6 mb-2">Order Processing</h2>
          <p>
            All orders are processed within 1-3 business days (excluding
            weekends and holidays) after receiving your order confirmation email.
            You will receive another notification when your order has shipped.
          </p>

          <h2 className="text-3xl font-semibold mt-6 mb-2">
            Shipping Rates and Delivery Estimates
          </h2>
          <p>
            Shipping charges for your order will be calculated and displayed at
            checkout. Delivery times may vary based on your location and shipping
            method selected at checkout.
          </p>
          <ul className="list-disc list-inside">
            <li>
              **Standard Shipping**: Estimated 5-7 business days.
            </li>
            <li>
              **Express Shipping**: Estimated 2-3 business days.
            </li>
            <li>
              **International Shipping**: Estimated 10-15 business days.
            </li>
          </ul>

          <h2 className="text-3xl font-semibold mt-6 mb-2">
            Shipment Confirmation and Order Tracking
          </h2>
          <p>
            Once your order has been shipped, you will receive a shipment
            confirmation email containing your tracking number(s). The tracking
            number will be active within 24 hours.
          </p>

          <h2 className="text-3xl font-semibold mt-6 mb-2">International Shipping</h2>
          <p>
            We currently offer international shipping to selected countries. Please
            note that additional customs or import taxes may apply, depending on
            your location, and these are the responsibility of the recipient.
          </p>

          <h2 className="text-3xl font-semibold mt-6 mb-2">Shipping Delays</h2>
          <p>
            Delivery times are only estimates and may be delayed due to
            unforeseen circumstances such as customs delays, natural disasters,
            or logistical disruptions. NexGen Battles is not responsible for
            delays outside of our control but will notify you of any major
            delays affecting your shipment.
          </p>

          <h2 className="text-3xl font-semibold mt-6 mb-2">
            Missing or Lost Packages
          </h2>
          <p>
            If your package is lost in transit or you do not receive it within the
            estimated delivery timeframe, please contact our support team. We will
            assist you in locating the package or sending a replacement.
          </p>

          <h2 className="text-3xl font-semibold mt-6 mb-2">Contact Us</h2>
          <p>
            For any questions or concerns regarding shipping and delivery, feel free
            to reach out to us at [support email].
          </p>
        </div>

        <div className="text-center mt-10">
          <h3 className="text-2xl font-semibold mb-4">
            Need Help with Your Order?
          </h3>
          <a
            href="/contact"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
};

export default ShippingAndDelivery;
