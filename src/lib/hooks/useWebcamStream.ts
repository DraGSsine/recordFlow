import { useCallback, useRef, useState } from "react";
import { getOptimalWebcamConstraints } from "./useMediaConstraints";
import { getMediaErrorMessage, stopMediaStream, type MediaStreamError } from "../utils/mediaUtils";

export const useWebcamStream = () => {
  const [webcamStream, setWebcamStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const webcamStreamRef = useRef<MediaStream | null>(null);

  const initWebcam = useCallback(async (): Promise<MediaStream | null> => {
    try {
      console.log("🎥 Starting webcam initialization...");
      setError(null);
      
      // Try with optimal constraints first
      let constraints = getOptimalWebcamConstraints();
      let stream: MediaStream;
      
      try {
        console.log("🎥 Trying optimal constraints:", constraints);
        stream = await navigator.mediaDevices.getUserMedia(constraints);
        console.log("🎥 Optimal constraints successful!");
      } catch (highResError) {
        console.warn("High resolution failed, trying fallback:", highResError);
        
        // Fallback to lower resolution if high-res fails
        const fallbackConstraints = {
          video: {
            width: { ideal: 640, max: 1280 },
            height: { ideal: 480, max: 720 },
            frameRate: { ideal: 30, max: 30 },
            facingMode: "user" as const,
          },
          audio: false,
        };
        
        try {
          console.log("🎥 Trying fallback constraints:", fallbackConstraints);
          stream = await navigator.mediaDevices.getUserMedia(fallbackConstraints);
          console.log("🎥 Fallback constraints successful!");
        } catch (fallbackError) {
          console.warn("Fallback resolution failed, trying basic:", fallbackError);
          
          // Final fallback to basic constraints
          console.log("🎥 Trying basic constraints...");
          stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false,
          });
          console.log("🎥 Basic constraints successful!");
        }
      }
      
      webcamStreamRef.current = stream;
      setWebcamStream(stream);
      console.log("🎥 Webcam stream set successfully:", stream);
      return stream;
    } catch (err) {
      const error = err as MediaStreamError;
      const errorMessage = getMediaErrorMessage(error);
      console.error("🎥 Webcam access failed:", errorMessage, err);
      setError(errorMessage);
      return null;
    }
  }, []);

  const stopWebcam = useCallback(() => {
    stopMediaStream(webcamStreamRef.current);
    webcamStreamRef.current = null;
    setWebcamStream(null);
    setError(null);
  }, []);

  return {
    webcamStream,
    error,
    initWebcam,
    stopWebcam,
  };
};
