// Simple webcam test - add this temporarily to debug
export const testWebcamAccess = async () => {
  try {
    console.log("🧪 Testing basic webcam access...");
    
    // Check if getUserMedia is available
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      console.error("🧪 getUserMedia not supported");
      return false;
    }
    
    // Test with most basic constraints
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false
    });
    
    console.log("🧪 Basic webcam test successful:", stream);
    
    // Stop the test stream
    stream.getTracks().forEach(track => track.stop());
    
    return true;
  } catch (error) {
    console.error("🧪 Basic webcam test failed:", error);
    return false;
  }
};

// Call this in your component to test
// testWebcamAccess();
