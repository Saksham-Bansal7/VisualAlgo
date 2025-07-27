// Test script to check if backend is running
const testBackend = async () => {
  try {
    const response = await fetch("http://localhost:5000");
    const text = await response.text();
    console.log("Backend response:", text);
  } catch (error) {
    console.error("Backend not running:", error.message);
  }
};

testBackend();
