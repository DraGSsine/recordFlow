'use client'

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Download, Play, Pause, Volume2, VolumeX, Camera, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

const EditPage = () => {
  const router = useRouter();
  const [screenVideoUrl, setScreenVideoUrl] = useState<string | null>(null);
  const [webcamVideoUrl, setWebcamVideoUrl] = useState<string | null>(null);
  const [isScreenVideoPlaying, setIsScreenVideoPlaying] = useState(false);
  const [isWebcamVideoPlaying, setIsWebcamVideoPlaying] = useState(false);
  const [isScreenVideoMuted, setIsScreenVideoMuted] = useState(false);
  const [isWebcamVideoMuted, setIsWebcamVideoMuted] = useState(false);

  useEffect(() => {
    // Get recorded video URLs from sessionStorage
    const storedScreenVideo = sessionStorage.getItem('screenRecordingUrl') || sessionStorage.getItem('recordedVideoUrl');
    const storedWebcamVideo = sessionStorage.getItem('webcamRecordingUrl');
    
    if (storedScreenVideo) {
      setScreenVideoUrl(storedScreenVideo);
    }
    
    if (storedWebcamVideo) {
      setWebcamVideoUrl(storedWebcamVideo);
    }
    
    // If no recording found, redirect back to record page
    if (!storedScreenVideo && !storedWebcamVideo) {
      router.push('/record');
    }
  }, [router]);
  const handleDownloadScreenVideo = () => {
    if (screenVideoUrl) {
      const a = document.createElement('a');
      a.href = screenVideoUrl;
      a.download = `screen-recording-${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.webm`;
      a.click();
    }
  };

  const handleDownloadWebcamVideo = () => {
    if (webcamVideoUrl) {
      const a = document.createElement('a');
      a.href = webcamVideoUrl;
      a.download = `webcam-recording-${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.webm`;
      a.click();
    }
  };

  const handleBackToRecord = () => {
    // Clear the stored video URLs
    sessionStorage.removeItem('recordedVideoUrl');
    sessionStorage.removeItem('recordedWebcamUrl');
    sessionStorage.removeItem('screenRecordingUrl');
    sessionStorage.removeItem('webcamRecordingUrl');
    router.push('/record');
  };
  const toggleScreenVideoPlayback = () => {
    const video = document.getElementById('screen-video') as HTMLVideoElement;
    if (video) {
      if (isScreenVideoPlaying) {
        video.pause();
      } else {
        video.play();
      }
      setIsScreenVideoPlaying(!isScreenVideoPlaying);
    }
  };

  const toggleWebcamVideoPlayback = () => {
    const video = document.getElementById('webcam-video') as HTMLVideoElement;
    if (video) {
      if (isWebcamVideoPlaying) {
        video.pause();
      } else {
        video.play();
      }
      setIsWebcamVideoPlaying(!isWebcamVideoPlaying);
    }
  };

  const toggleScreenVideoMute = () => {
    const video = document.getElementById('screen-video') as HTMLVideoElement;
    if (video) {
      video.muted = !video.muted;
      setIsScreenVideoMuted(!isScreenVideoMuted);
    }
  };

  const toggleWebcamVideoMute = () => {
    const video = document.getElementById('webcam-video') as HTMLVideoElement;
    if (video) {
      video.muted = !video.muted;
      setIsWebcamVideoMuted(!isWebcamVideoMuted);
    }
  };
  if (!screenVideoUrl && !webcamVideoUrl) {
    return (
      <div className="bg-background min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your recordings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto py-8 px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={handleBackToRecord}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Record
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Edit Recording</h1>
              <p className="text-muted-foreground">Review and download your recorded content</p>
            </div>
          </div>
          {/* Download Buttons */}
        <div className="flex justify-end gap-4 mb-8">
          {screenVideoUrl && (
            <Button onClick={handleDownloadScreenVideo} className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Download Screen Recording
            </Button>
          )}
          {webcamVideoUrl && (
            <Button onClick={handleDownloadWebcamVideo} variant="outline" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Download Webcam Recording
            </Button>
          )}
        </div>
          </div>

        {/* Video Grid */}
        <div className={cn(
          "grid gap-8",
          webcamVideoUrl && screenVideoUrl ? "lg:grid-cols-2" : "lg:grid-cols-1"
        )}>
          {/* Screen Recording */}
          {screenVideoUrl && (
            <Card className="bg-card/50 backdrop-blur-sm border border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Monitor className="w-5 h-5 text-primary" />
                    <h2 className="text-xl font-semibold text-foreground">Screen Recording</h2>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={toggleScreenVideoPlayback}
                      className="flex items-center gap-2"
                    >
                      {isScreenVideoPlaying ? (
                        <Pause className="w-4 h-4" />
                      ) : (
                        <Play className="w-4 h-4" />
                      )}
                      {isScreenVideoPlaying ? 'Pause' : 'Play'}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={toggleScreenVideoMute}
                      className="flex items-center gap-2"
                    >
                      {isScreenVideoMuted ? (
                        <VolumeX className="w-4 h-4" />
                      ) : (
                        <Volume2 className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>
                
                <div className="bg-black rounded-lg overflow-hidden">
                  <video
                    id="screen-video"
                    src={screenVideoUrl}
                    controls
                    className="w-full h-auto"
                    preload="metadata"
                    onPlay={() => setIsScreenVideoPlaying(true)}
                    onPause={() => setIsScreenVideoPlaying(false)}
                    onVolumeChange={(e) => {
                      const video = e.target as HTMLVideoElement;
                      setIsScreenVideoMuted(video.muted);
                    }}
                  />
                </div>
                
                <div className="mt-4 flex justify-between items-center">
                  <div className="text-sm text-muted-foreground">
                    Screen capture with audio
                  </div>
                  <Button
                    variant="outline"
                    onClick={handleDownloadScreenVideo}
                    className="flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Webcam Recording */}
          {webcamVideoUrl && (
            <Card className="bg-card/50 backdrop-blur-sm border border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Camera className="w-5 h-5 text-primary" />
                    <h2 className="text-xl font-semibold text-foreground">Webcam Recording</h2>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={toggleWebcamVideoPlayback}
                      className="flex items-center gap-2"
                    >
                      {isWebcamVideoPlaying ? (
                        <Pause className="w-4 h-4" />
                      ) : (
                        <Play className="w-4 h-4" />
                      )}
                      {isWebcamVideoPlaying ? 'Pause' : 'Play'}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={toggleWebcamVideoMute}
                      className="flex items-center gap-2"
                    >
                      {isWebcamVideoMuted ? (
                        <VolumeX className="w-4 h-4" />
                      ) : (
                        <Volume2 className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>
                
                <div className="bg-black rounded-lg overflow-hidden">
                  <video
                    id="webcam-video"
                    src={webcamVideoUrl}
                    controls
                    className="w-full h-auto"
                    preload="metadata"
                    onPlay={() => setIsWebcamVideoPlaying(true)}
                    onPause={() => setIsWebcamVideoPlaying(false)}
                    onVolumeChange={(e) => {
                      const video = e.target as HTMLVideoElement;
                      setIsWebcamVideoMuted(video.muted);
                    }}
                  />
                </div>
                
                <div className="mt-4 flex justify-between items-center">
                  <div className="text-sm text-muted-foreground">
                    Face recording
                  </div>
                  <Button
                    variant="outline"
                    onClick={handleDownloadWebcamVideo}
                    className="flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}        </div>

        {/* Recording Summary */}
        <Card className="mt-8 bg-card/30 backdrop-blur-sm border border-border">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-3">Recording Summary</h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <div className="text-muted-foreground">Type</div>
                <div className="font-medium">
                  {screenVideoUrl && webcamVideoUrl ? 'Screen + Webcam Recording' : 
                   screenVideoUrl ? 'Screen Recording' : 'Webcam Recording'}
                </div>
              </div>
              <div>
                <div className="text-muted-foreground">Format</div>
                <div className="font-medium">WebM (VP9/Opus)</div>
              </div>
              <div>
                <div className="text-muted-foreground">Quality</div>
                <div className="font-medium">High Definition</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EditPage;
