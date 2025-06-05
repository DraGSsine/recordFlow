"use client";
import { Play, Square, Pause, Camera, CameraOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useState, useRef } from "react";

interface RecordingControlProps {
  onStartRecording: () => void;
  onStopRecording: () => void;
  includeWebcam?: boolean;
}

const RecordingControl: React.FC<RecordingControlProps> = ({
  onStartRecording,
  onStopRecording,
  includeWebcam = true,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);


  const handleToggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      setRecordingTime(0);
      onStopRecording();
      // stopRecording();
    } else {
      setIsRecording(true);
      onStartRecording();
      // startRecording();
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
          {!isRecording && (
            <div className="text-muted-foreground text-center">
              <p className="text-lg mb-2">Click to start recording</p>
              <p className="text-sm opacity-75">
                Make sure to configure your settings first
              </p>
            </div>
          )}
          {/* <video src={mediaBlobUrl} controls autoPlay loop /> */}
        </div>
      </div>
    </div>
  );
};

export default RecordingControl;
