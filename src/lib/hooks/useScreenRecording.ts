import { useCallback, useMemo, useEffect } from "react";
import { useReactMediaRecorder } from "react-media-recorder";
import { useRecordingSettings } from "./useRecordingSettings";
import { useWebcamStream } from "./useWebcamStream";
import { getRecorderOptions } from "./useMediaConstraints";

const useScreenRecording = () => {
  const { settings, setSettings } = useRecordingSettings();
  const { webcamStream, error: webcamError, initWebcam, stopWebcam } = useWebcamStream();

  // Compute audio settings
  const hasAudio = settings.microphoneOn || settings.systemAudioOn;
  
  // Get optimized recorder options
  const recorderOptions = useMemo(() => getRecorderOptions(hasAudio), [hasAudio]);

  // Use the react-media-recorder hook with optimal configuration
  const {
    status,
    startRecording: startMediaRecording,
    stopRecording: stopMediaRecording,
    mediaBlobUrl: videoUrl,
    clearBlobUrl,
    error: recorderError
  } = useReactMediaRecorder(recorderOptions);

  // Compute isRecording based on status
  const isRecording = status === "recording";

  // Only initialize webcam when recording starts (not for preview)
  // Remove the useEffect that auto-initializes webcam

  const startRecording = useCallback(async () => {
    try {
      // Initialize webcam if camera is enabled
      if (settings.cameraOn) {
        console.log("Initializing webcam for recording...");
        await initWebcam();
      }
      
      // Start the main recording with react-media-recorder
      startMediaRecording();
    } catch (error) {
      console.error("Failed to start recording:", error);
    }
  }, [settings.cameraOn, initWebcam, startMediaRecording]);

  const stopRecording = useCallback(() => {
    // Stop the main recording
    stopMediaRecording();
    
    // Always stop webcam when recording stops
    stopWebcam();
  }, [stopMediaRecording, stopWebcam]);
  
  const clearVideo = useCallback(() => {
    if (videoUrl) {
      clearBlobUrl();
    }
  }, [videoUrl, clearBlobUrl]);

  return {
    // Recording state
    isRecording,
    status,
    error: recorderError || webcamError,
    
    // Media
    videoUrl,
    webcamStream,
    
    // Settings
    settings,
    setSettings,
    
    // Actions
    startRecording,
    stopRecording,
    clearVideo,
    initWebcam,
  };
};

export default useScreenRecording;
