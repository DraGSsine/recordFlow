
/**
 * Utility functions for media stream management and error handling
 */

export interface MediaStreamError extends Error {
  name: 'NotAllowedError' | 'NotFoundError' | 'NotReadableError' | 'OverconstrainedError' | 'SecurityError' | 'TypeError';
  constraint?: string;
}

export const getMediaErrorMessage = (error: MediaStreamError): string => {
  switch (error.name) {
    case 'NotAllowedError':
      return 'Camera/microphone access denied. Please allow permissions and try again.';
    case 'NotFoundError':
      return 'No camera or microphone found on this device.';
    case 'NotReadableError':
      return 'Camera or microphone is already in use by another application.';
    case 'OverconstrainedError':
      return `Camera doesn't support the requested settings${error.constraint ? ` (${error.constraint})` : ''}.`;
    case 'SecurityError':
      return 'Camera/microphone access blocked due to security restrictions.';
    default:
      return 'An unexpected error occurred while accessing media devices.';
  }
};

export const stopMediaStream = (stream: MediaStream | null): void => {
  if (stream) {
    stream.getTracks().forEach((track) => {
      track.stop();
    });
  }
};

export const getScreenDisplayMedia = async (): Promise<MediaStream> => {
  return navigator.mediaDevices.getDisplayMedia({
    video: {
      width: { ideal: 2560, max: 7680 },
      height: { ideal: 1440, max: 4320 },
      frameRate: { ideal: 60, max: 120 },
    },
    audio: {
      echoCancellation: false,
      noiseSuppression: false,
      autoGainControl: false,
      sampleRate: 48000,
      channelCount: 2,
    },
  });
};

export const checkMediaDeviceSupport = async (): Promise<{
  hasCamera: boolean;
  hasMicrophone: boolean;
  hasScreenCapture: boolean;
}> => {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    
    return {
      hasCamera: devices.some(device => device.kind === 'videoinput'),
      hasMicrophone: devices.some(device => device.kind === 'audioinput'),
      hasScreenCapture: !!(navigator.mediaDevices.getDisplayMedia),
    };
  } catch (error) {
    console.warn('Failed to enumerate media devices:', error);
    return {
      hasCamera: false,
      hasMicrophone: false,
      hasScreenCapture: false,
    };
  }
};
