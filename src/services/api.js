/**
 * Mock API service for tour registration
 * 
 * In production, replace the mock endpoints with your actual backend API:
 * 1. Update BASE_URL to your server URL
 * 2. Add authentication headers if needed
 * 3. Handle error responses appropriately
 * 4. Implement proper validation on the backend
 */

const BASE_URL = "/api";
const USE_MOCK = true; // Set to false when connecting to real backend

// Mock registration - simulates API call
const mockRegister = async (registrationData) => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Store in localStorage as backup
  try {
    const existing = JSON.parse(localStorage.getItem("registrations") || "[]");
    const newRegistration = {
      ...registrationData,
      id: `reg_${Date.now()}`,
      timestamp: new Date().toISOString(),
    };
    existing.push(newRegistration);
    localStorage.setItem("registrations", JSON.stringify(existing));
  } catch (e) {
    console.error("Failed to save to localStorage:", e);
  }

  // Mock success response
  return {
    ok: true,
    id: `reg_${Date.now()}`,
    message: "Registration successful! We'll contact you within 24 hours.",
  };
};

// Contact form submission
const mockContact = async (contactData) => {
  await new Promise((resolve) => setTimeout(resolve, 600));

  try {
    const existing = JSON.parse(localStorage.getItem("contacts") || "[]");
    existing.push({
      ...contactData,
      id: `contact_${Date.now()}`,
      timestamp: new Date().toISOString(),
    });
    localStorage.setItem("contacts", JSON.stringify(existing));
  } catch (e) {
    console.error("Failed to save contact to localStorage:", e);
  }

  return {
    ok: true,
    message: "Message received! We'll respond to your email soon.",
  };
};

/**
 * Register for a tour
 * @param {Object} data - Registration data
 * @param {string} data.tourId - Tour identifier
 * @param {string} data.name - Full name
 * @param {string} data.email - Email address
 * @param {string} data.phone - Phone number
 * @param {number} data.numberOfPeople - Number of travelers
 * @param {string} data.notes - Additional notes/requests
 */
export const registerForTour = async (data) => {
  if (USE_MOCK) {
    return mockRegister(data);
  }

  try {
    const response = await fetch(`${BASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Registration failed");
    }

    return await response.json();
  } catch (error) {
    console.error("Registration error:", error);
    // Fallback to localStorage on network error
    return mockRegister(data);
  }
};

/**
 * Submit contact form
 * @param {Object} data - Contact data
 * @param {string} data.name - Full name
 * @param {string} data.email - Email address
 * @param {string} data.subject - Message subject
 * @param {string} data.message - Message content
 */
export const submitContactForm = async (data) => {
  if (USE_MOCK) {
    return mockContact(data);
  }

  try {
    const response = await fetch(`${BASE_URL}/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Contact form submission failed");
    }

    return await response.json();
  } catch (error) {
    console.error("Contact form error:", error);
    return mockContact(data);
  }
};
