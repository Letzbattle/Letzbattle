// import { useSession } from "next-auth/react";

// export const useApi = () => {
//   const { data: session } = useSession(); // Access the session to get the JWT token

//   const callApi = async (url: string, options: RequestInit = {}) => {
//     if (!session || !session.idToken) {
//       throw new Error("User is not authenticated");
//     }

//     // Set up the headers with the JWT token
//     const headers = {
//       ...options.headers,
//       Authorization: `Bearer ${session.idToken}`, // Attach the idToken to Authorization
//       "Content-Type": "application/json", // Add default content type
//     };

//     // Merge the new headers with existing options
//     const finalOptions = { ...options, headers };

//     try {
//       const response = await fetch(url, finalOptions);
//       if (!response.ok) {
//         throw new Error(`Error: ${response.statusText}`);
//       }
//       return await response.json(); // Parse and return the response as JSON
//     } catch (error) {
//       console.error("API call failed:", error);
//       throw error;
//     }
//   };

//   return { callApi };
// };
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
export const useApi = () => {
  const { data: session, status } = useSession(); // Fetch session and status
  const router=useRouter()
  // If the session is still loading, return a loading state
  if (status === 'loading') {
    return {
      loading: true,
      get: () => Promise.resolve(null),
      post: () => Promise.resolve(null),
      put: () => Promise.resolve(null),
      delete: () => Promise.resolve(null),
    };
  }
  console.log(session)

  // If session is not found, handle the error gracefully
  if (!session || !session.idToken) {
    // throw new Error("User is not authenticated");
    router.push('/')
  }
  if (session && new Date(session.expires) < new Date()) {
    // session is valid and not expired
    router.push('/')
  }

  // Set default headers
  const api = axios.create({
    baseURL: "https://api.nexgenbattles.com", // Make sure to define this in your environment variables
    headers: {
      Authorization: `Bearer ${session?.idToken}`,
    },
  });

  return {
    loading: false,
    get: (url: string) => api.get(url),
    post: (url: string, data: any) => api.post(url, data),
    put: (url: string, data: any) => api.put(url, data),
    delete: (url: string) => api.delete(url),
  };
};
