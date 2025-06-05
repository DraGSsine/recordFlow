export const getOptimalScreenConstraints = () => ({
  video: {
    width: { ideal: 2560, max: 7680 }, // Support up to 8K resolution
    height: { ideal: 1440, max: 4320 },
    frameRate: { ideal: 60, max: 120 }, // Higher frame rate for smoother recording
  },
  audio: {
    echoCancellation: false,
    noiseSuppression: false,
    autoGainControl: false,
    sampleRate: 48000, // High quality audio
    channelCount: 2,
  },
});

export const getOptimalWebcamConstraints = () => ({
  video: {
    width: { ideal: 1280, max: 1920 }, // More compatible resolution
    height: { ideal: 720, max: 1080 },
    frameRate: { ideal: 30, max: 60 }, // More conservative frame rate
    facingMode: "user" as const,
    // Removed aspectRatio for better compatibility
  },
  audio: false, // Audio handled separately
});

export const getRecorderOptions = (hasAudio: boolean) => ({
  screen: true,
  audio: hasAudio,
  video: getOptimalScreenConstraints().video,
  askPermissionOnMount: false,
  blobPropertyBag: { 
    type: 'video/webm;codecs=vp9,opus' // VP9 for better compression and quality
  },
  mediaRecorderOptions: {
    videoBitsPerSecond: 10000000, // 10 Mbps for high quality
    audioBitsPerSecond: 256000,   // 256 kbps for high quality audio
  },
});
