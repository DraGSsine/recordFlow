"use client";
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Camera } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WebcamOverlayProps {
  stream: MediaStream | null;
  isRecording: boolean;
  cameraEnabled: boolean;
  error?: string | null;
}

const WebcamOverlay: React.FC<WebcamOverlayProps> = ({ stream, isRecording, cameraEnabled, error }) => {
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Initialize webcam feed when stream is available
  useEffect(() => {
    console.log("📹 WebcamOverlay: stream changed", { stream, cameraEnabled, isRecording });
    if (videoRef.current && stream) {
      console.log("📹 WebcamOverlay: Setting stream to video element");
      videoRef.current.srcObject = stream;
      videoRef.current.play()
        .then(() => {
          console.log("📹 WebcamOverlay: Video started playing successfully");
          setVideoLoaded(true);
        })
        .catch((err) => {
          console.error("📹 WebcamOverlay: Error playing video:", err);
          setVideoLoaded(false);
        });
    } else {
      console.log("📹 WebcamOverlay: No stream or video ref");
      setVideoLoaded(false);
    }
    
    return () => {
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    };
  }, [stream, cameraEnabled, isRecording]);

  // Handle mouse down event for dragging
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!containerRef.current) return;
    
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  }, [position]);

  // Handle mouse move event for dragging with performance optimization
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isDragging) {
      e.preventDefault();
      
      requestAnimationFrame(() => {
        const newX = Math.max(0, Math.min(window.innerWidth - 220, e.clientX - dragOffset.x));
        const newY = Math.max(0, Math.min(window.innerHeight - 165, e.clientY - dragOffset.y)); // 165 = 220 * 9/16 aspect ratio
        
        setPosition({ x: newX, y: newY });
      });
    }
  }, [isDragging, dragOffset]);

  // Handle mouse up event to stop dragging
  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Add and remove event listeners for dragging
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove, { passive: false });
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = 'none';
    } else {
      document.body.style.userSelect = '';
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = '';
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  if (!cameraEnabled) {
    return null;
  }

  const showOverlay = stream || error;

  return (
    <div 
      ref={containerRef}
      className={cn(
        "fixed z-50 rounded-lg overflow-hidden shadow-xl border-2",
        "transition-all duration-300 ease-in-out",
        isDragging ? "cursor-grabbing border-primary scale-105" : "cursor-grab border-border hover:border-primary",
        isRecording ? "border-destructive/70" : ""
      )}
      style={{ 
        width: '220px',
        left: position.x,
        top: position.y,
        transform: isDragging ? 'scale(1.05)' : 'scale(1)',
        willChange: isDragging ? 'transform' : 'auto'
      }}
      onMouseDown={handleMouseDown}
    >
      <div className="bg-black w-full aspect-video relative">
        {/* Video Stream */}
        {stream && (
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            muted 
            className={cn(
              "w-full h-full object-cover transition-opacity duration-300 scale-x-[-1]",
              videoLoaded ? "opacity-100" : "opacity-0"
            )}
          />
        )}
        
        {/* Loading State */}
        {stream && !videoLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
        )}
        
        {/* Error State */}
        {error && !stream && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 text-white text-center p-4">
            <Camera className="w-8 h-8 mb-2 text-gray-400" />
            <p className="text-xs font-medium">Camera Error</p>
            <p className="text-xs text-gray-400 mt-1">{error}</p>
          </div>
        )}
        
        {/* No Stream State */}
        {!stream && !error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 text-white">
            <Camera className="w-8 h-8 mb-2 text-gray-400" />
            <p className="text-xs font-medium">Initializing Camera...</p>
          </div>
        )}
        
        {/* Recording indicator */}
        {isRecording && (
          <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 bg-destructive/90 backdrop-blur-sm rounded-full text-xs text-white font-medium shadow-lg">
            <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
            <span>REC</span>
          </div>
        )}
        
        {/* Drag handle indicator */}
        <div className="absolute bottom-2 left-2 opacity-50 hover:opacity-100 transition-opacity">
          <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-1 h-1 bg-white/60 rounded-full"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebcamOverlay;
