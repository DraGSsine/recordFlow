"use client";
import { Play, Square, Pause, Camera, CameraOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useState, useRef } from "react";
import useScreenRecording from "@/lib/hooks/useScreenRecording";
import WebcamOverlay from "./WebcamOverlay";
import { testWebcamAccess } from "@/lib/utils/webcamTest";


const RecordingControl = () => {
  const [recordingTime, setRecordingTime] = useState(0);
  const {
    isRecording,
    videoUrl,
    startRecording,
    stopRecording,
    clearVideo,
    webcamStream,
    settings,
    status,
    error
  } = useScreenRecording();

  const handleToggleRecording = async () => {
    if (isRecording) {
      stopRecording();
      setRecordingTime(0);
    } else {
      // Test webcam access before starting recording
      console.log("🎬 Starting recording with camera enabled:", settings.cameraOn);
      if (settings.cameraOn) {
        const webcamWorks = await testWebcamAccess();
        console.log("🎬 Webcam test result:", webcamWorks);
      }
      
      await startRecording();
      setRecordingTime(0);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  return (
    <div className="relative">
      {/* Floating Webcam Overlay - Only show when recording */}
      <WebcamOverlay 
        stream={webcamStream} 
        isRecording={isRecording} 
        cameraEnabled={settings.cameraOn && isRecording}
        error={error}
      />
      
      {/* Main Card */}
      <div className="relative bg-card/50 backdrop-blur-sm border border-border rounded-3xl p-8 shadow-xl">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-chart-1/5 rounded-3xl"></div>

        <div className="relative text-center">
          {/* Status Badge */}
          <div
            className={cn(
              "inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-8 transition-all duration-300 backdrop-blur-sm",
              isRecording
                ? "bg-destructive/20 text-destructive border border-destructive/30"
                : "bg-muted/50 text-muted-foreground border border-border"
            )}
          >
            <div
              className={cn(
                "w-2 h-2 rounded-full mr-2 transition-all duration-300",
                isRecording
                  ? "bg-destructive animate-pulse"
                  : "bg-muted-foreground"
              )}
            ></div>
            {isRecording ? "Recording in progress" : "Ready to record"}
          </div>

          {/* Recording Button */}
          <div className="relative mb-8">
            <Button
              onClick={handleToggleRecording}
              className={cn(
                "relative w-32 h-32 rounded-full text-white font-semibold text-lg transition-all duration-500 shadow-xl border-4",
                isRecording
                  ? "bg-gradient-to-r from-destructive to-destructive/80 hover:from-destructive/90 hover:to-destructive/70 border-destructive/50 shadow-destructive/25"
                  : "bg-gradient-to-r from-primary to-chart-1 hover:from-primary/90 hover:to-chart-1/90 border-primary/50 shadow-primary/25 hover:scale-105"
              )}
            >
              {isRecording ? (
                <Square className="w-8 h-8" fill="currentColor" />
              ) : (
                <Play className="w-8 h-8 ml-1" fill="currentColor" />
              )}

              {/* Pulse Ring for Recording */}
              {isRecording && (
                <div className="absolute inset-0 rounded-full border-4 border-destructive/30 animate-ping"></div>
              )}
            </Button>
          </div>

          {/* Timer Display */}
          {isRecording && (
            <div className="bg-card/70 backdrop-blur-sm rounded-2xl p-6 border border-border">
              <div className="text-3xl font-mono font-bold text-foreground mb-2">
                {formatTime(recordingTime)}
              </div>
              <div className="text-muted-foreground text-sm">
                Recording duration
              </div>
            </div>
          )}

          {/* Action Hint */}
          {!isRecording && !videoUrl && (
            <div className="text-muted-foreground text-center">
              <p className="text-lg mb-2">Click to start recording</p>
              <p className="text-sm opacity-75">
                Make sure to configure your settings first
              </p>
            </div>
          )}

          {/* Error Display */}
          {error && (
            <div className="mt-4 p-4 bg-destructive/10 border border-destructive/30 rounded-lg">
              <p className="text-destructive text-sm font-medium">Recording Error:</p>
              <p className="text-destructive text-xs mt-1">{String(error)}</p>
            </div>
          )}

          {/* Recording Status */}
          {status && status !== "idle" && (
            <div className="mt-4 text-center">
              <p className="text-sm text-muted-foreground">
                Status: <span className="capitalize">{status}</span>
              </p>
            </div>
          )}

          {/* Video Recording Result */}
          {videoUrl && !isRecording && (
            <div className="mt-6 space-y-4">
              <div className="bg-card/70 backdrop-blur-sm rounded-2xl p-6 border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-4">Recording Complete!</h3>
                
                {/* Video Preview */}
                <div className="bg-black rounded-lg overflow-hidden mb-4">
                  <video 
                    src={videoUrl} 
                    controls 
                    className="w-full h-auto max-h-64 object-contain"
                    preload="metadata"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button
                    onClick={() => {
                      const a = document.createElement('a');
                      a.href = videoUrl;
                      a.download = `screen-recording-${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.webm`;
                      a.click();
                    }}
                    className="flex-1"
                  >
                    Download Video
                  </Button>
                  
                  <Button
                    onClick={clearVideo}
                    variant="outline"
                    className="flex-1"
                  >
                    Clear Recording
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecordingControl;
