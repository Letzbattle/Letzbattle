// pages/refund-and-cancellation.tsx

import Particles from "./magicui/particles";

const RefundAndCancellation = () => {
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
          Refund and Cancellation Policy
        </h1>

        <div className="max-w-4xl mx-auto text-lg leading-relaxed space-y-6">
          <p>
            At <strong>NexGen Battles</strong>, we strive to provide a seamless
            and exciting gaming experience for all our participants. To ensure
            fairness and transparency, we have established the following refund
            and cancellation policies.
          </p>

          <h2 className="text-3xl font-semibold mt-6 mb-2">
            Event Cancellations by NexGen Battles
          </h2>
          <p>
            If an event is canceled by NexGen Battles due to technical issues,
            insufficient participation, or unforeseen circumstances:
          </p>
          <ul className="list-disc list-inside">
            <li>
              <strong>Full Refund</strong>: All participants will receive a full
              refund of their entry fee, which will be automatically credited to
              the original payment method within 7-10 business days.
            </li>
          </ul>

          <h2 className="text-3xl font-semibold mt-6 mb-2">
            Participant Cancellations
          </h2>
          <p>
            If a participant wishes to cancel their registration for an event,
            the following conditions apply:
          </p>
          <ul className="list-disc list-inside">
            <li>
              <strong>Cancellation Before 24 Hours of Event Start</strong>: A
              full refund will be issued for cancellations made at least 24
              hours prior to the event's start time.
            </li>
            <li>
              <strong>Cancellation Within 24 Hours of Event Start</strong>: No
              refunds will be issued for cancellations made within 24 hours of
              the event's start time.
            </li>
          </ul>

          <h2 className="text-3xl font-semibold mt-6 mb-2">No-Show Policy</h2>
          <p>
            Participants who fail to attend the event without prior cancellation
            notice will not be eligible for a refund.
          </p>

          <h2 className="text-3xl font-semibold mt-6 mb-2">
            Disqualification
          </h2>
          <p>
            Participants disqualified from an event due to rule violations,
            cheating, or unsportsmanlike behavior will not receive a refund.
          </p>

          <h2 className="text-3xl font-semibold mt-6 mb-2">
            Technical Issues on Participant's End
          </h2>
          <p>
            NexGen Battles is not responsible for technical issues on the
            participant’s end, such as poor internet connection, device failure,
            or inability to log in. Refunds will not be issued in these cases.
          </p>

          <h2 className="text-3xl font-semibold mt-6 mb-2">Refund Process</h2>
          <p>
            Refunds will be processed within 7-10 business days after approval.
            If you have not received your refund within this period, please
            contact our support team at [support email].
          </p>

          <h2 className="text-3xl font-semibold mt-6 mb-2">
            Changes to the Policy
          </h2>
          <p>
            NexGen Battles reserves the right to modify or update this refund
            and cancellation policy at any time. Any changes will be
            communicated via email or on our website.
          </p>
        </div>

        <div className="text-center mt-10">
          <h3 className="text-2xl font-semibold mb-4">
            Have Questions or Concerns?
          </h3>
          <a
            href="/contact"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default RefundAndCancellation;
