import { useSession } from "next-auth/react";

export const useApi = () => {
  const { data: session } = useSession(); // Access the session to get the JWT token

  const callApi = async (url: string, options: RequestInit = {}) => {
    if (!session || !session.idToken) {
      throw new Error("User is not authenticated");
    }

    // Set up the headers with the JWT token
    const headers = {
      ...options.headers,
      Authorization: `Bearer ${session.idToken}`, // Attach the idToken to Authorization
      "Content-Type": "application/json", // Add default content type
    };

    // Merge the new headers with existing options
    const finalOptions = { ...options, headers };

    try {
      const response = await fetch(url, finalOptions);
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      return await response.json(); // Parse and return the response as JSON
    } catch (error) {
      console.error("API call failed:", error);
      throw error;
    }
  };

  return { callApi };
};
