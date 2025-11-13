// api.js

// 🚨 Important: Set the base URL for your local Express server.
// When you deploy, you will change this to your live domain (e.g., 'https://api.yourcompany.com').
const API_BASE_URL = "http://localhost:5000/api";

// --- GET Requests for Data ---

/**
 * Fetches all available tours from the backend.
 * @returns {Promise<Object>} An object containing the tours data.
 */
export async function fetchTours() {
  try {
    const response = await fetch(`${API_BASE_URL}/tours`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching tours:", error);
    // You might want to return an empty object or throw the error further
    return {};
  }
}

/**
 * Fetches all available destinations data.
 * @returns {Promise<Object>} An object containing the destinations data.
 */
export async function fetchDestinations() {
  try {
    const response = await fetch(`${API_BASE_URL}/destinations`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching destinations:", error);
    return {};
  }
}

// You can create similar functions for /gallery, /team, /services, and /visa:

// ... (fetchGallery, fetchTeam, fetchServices, fetchVisa functions go here)

// Example for /gallery:
export async function fetchGallery() {
  try {
    const response = await fetch(`${API_BASE_URL}/gallery`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching gallery:", error);
    return {};
  }
}


// --- POST Requests for Forms ---

/**
 * Submits the registration form data (sends an email via the backend).
 * @param {Object} formData The registration data (name, email, country, phone, message).
 * @returns {Promise<Object>} The response object from the server.
 */
export async function submitRegistration(formData) {
  try {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      // Throw the error with the message provided by the server
      throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }

    return data; // { success: true, message: "..." }
  } catch (error) {
    console.error("Error submitting registration:", error);
    // Re-throw the error so the calling component can handle it
    throw error;
  }
}

/**
 * Submits a visa question/query.
 * @param {Object} formData The visa query data.
 * @returns {Promise<Object>} The response object from the server.
 */
export async function postVisaQuestion(formData) {
  try {
    const response = await fetch(`${API_BASE_URL}/visa-question`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }

    return data; // { success: true, message: "..." }
  } catch (error) {
    console.error("Error posting visa question:", error);
    throw error;
  }
}