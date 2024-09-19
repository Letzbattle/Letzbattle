"use client"
import { useState } from 'react';
import { useApi } from '@/hooks/useApi'; // Ensure this is the correct path to your useApi hook
import { useRouter } from 'next/navigation';

const AddEventForm = () => {
  const [eventData, setEventData] = useState({
    name: '',
    date: '',
    entryFees: '',
    prize: '',
    seatsLeft: '',
  });
  const { post } = useApi();
  const router = useRouter();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    
    setEventData({
      ...eventData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
 const formattedData = {
    ...eventData,
    entryFees: parseInt(eventData.entryFees, 10), 
    seatsLeft: parseInt(eventData.seatsLeft, 10),
    date: new Date(eventData.date).toISOString(), // Ensure date is in ISO format (DateTime)
  };
    try {
      // Call the API to create the event
      const response = await post('/api/events', formattedData);

      if (response) {
        setSuccess('Event created successfully!');
        setError(''); 
        // router.push('/events'); 
      }
    } catch (error: any) {
      setSuccess(''); // Clear any previous success message
      setError(error?.response?.data?.message || 'Failed to create event');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h1 className="text-2xl font-semibold mb-4">Create Event</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Event Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={eventData.name}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">
            Event Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={eventData.date}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="entryFees" className="block text-sm font-medium text-gray-700">
            Entry Fees
          </label>
          <input
            type="number"
            id="entryFees"
            name="entryFees"
            value={eventData.entryFees}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="prize" className="block text-sm font-medium text-gray-700">
            Prize
          </label>
          <input
            type="number"
            id="prize"
            name="prize"
            value={eventData.prize}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="seatsLeft" className="block text-sm font-medium text-gray-700">
            Seats Left
          </label>
          <input
            type="number"
            id="seatsLeft"
            name="seatsLeft"
            value={eventData.seatsLeft}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Create Event
        </button>
      </form>
    </div>
  );
};

export default AddEventForm;
