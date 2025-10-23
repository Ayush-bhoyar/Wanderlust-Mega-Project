// API Configuration utility
// This handles both build-time and runtime environment variables

// Build-time environment variable (set during build)
declare const __API_PATH__: string;

// Runtime environment variable (can be overridden at runtime)
const getRuntimeApiPath = (): string => {
  // Check if we're in a browser environment and if window._env_ is available
  if (typeof window !== 'undefined' && (window as any)._env_) {
    return (window as any)._env_.VITE_API_PATH;
  }
  
  // Fallback to build-time variable
  return typeof __API_PATH__ !== 'undefined' ? __API_PATH__ : 'http://localhost:31100';
};

// Export the API path
export const API_PATH = getRuntimeApiPath();

// Export a function to get the full API URL for a given endpoint
export const getApiUrl = (endpoint: string): string => {
  const basePath = API_PATH.endsWith('/') ? API_PATH.slice(0, -1) : API_PATH;
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${basePath}${cleanEndpoint}`;
};
