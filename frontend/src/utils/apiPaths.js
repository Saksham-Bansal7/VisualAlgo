
export const BASE_URL = "http://localhost:5000"; // Change to your backend URL if needed

export const API_PATHS = {
  AUTH: {
    REGISTER: "/api/auth/register",
    LOGIN: "/api/auth/login",
    GET_PROFILE: "/api/auth/profile",
  },
  
  FLOWCHARTS: {
    CREATE: "/api/flowcharts",
    GET_ALL: "/api/flowcharts",
    GET_BY_ID: (id) => `/api/flowcharts/${id}`,
    UPDATE: (id) => `/api/flowcharts/${id}`,
    DELETE: (id) => `/api/flowcharts/${id}`,
  },
  MERMAID_CODE: "/api/mermaidCode",
};
 