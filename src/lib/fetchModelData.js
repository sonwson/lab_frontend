const API_BASE_URL = (
  process.env.REACT_APP_API_BASE_URL || "https://7ppl78-8080.csb.app"
).replace(/\/$/, "");

function buildRequestUrl(endpoint) {
  if (/^https?:\/\//i.test(endpoint)) {
    return endpoint;
  }

  if (!API_BASE_URL) {
    return endpoint;
  }

  const normalizedEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  return `${API_BASE_URL}${normalizedEndpoint}`;
}

const fetchModel = async (endpoint) => {
  try {
    const response = await fetch(buildRequestUrl(endpoint));
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};

export default fetchModel;
