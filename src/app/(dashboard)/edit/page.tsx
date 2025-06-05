'use client'

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Download, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

const EditPage = () => {
  const router = useRouter();
  const [screenVideoUrl, setScreenVideoUrl] = useState<string | null>(null);
  const [hasWebcamRecording, setHasWebcamRecording] = useState(false);
  const [isScreenVideoPlaying, setIsScreenVideoPlaying] = useState(false);
  const [isScreenVideoMuted, setIsScreenVideoMuted] = useState(false);

  useEffect(() => {
    // Get recorded video URLs from sessionStorage
    const storedScreenVideo = sessionStorage.getItem('recordedVideoUrl');
    const storedWebcamFlag = sessionStorage.getItem('recordedWebcamUrl');
    
    if (storedScreenVideo) {
      setScreenVideoUrl(storedScreenVideo);
    }
    
    if (storedWebcamFlag) {
      setHasWebcamRecording(true);
    }
    
    // If no recording found, redirect back to record page
    if (!storedScreenVideo) {
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

  const handleBackToRecord = () => {
    // Clear the stored video URLs
    sessionStorage.removeItem('recordedVideoUrl');
    sessionStorage.removeItem('recordedWebcamUrl');
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

  const toggleScreenVideoMute = () => {
    const video = document.getElementById('screen-video') as HTMLVideoElement;
    if (video) {
      video.muted = !video.muted;
      setIsScreenVideoMuted(!isScreenVideoMuted);
    }
  };

  if (!screenVideoUrl) {
    return (
      <div className="bg-background min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your recording...</p>
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
          
          <Button onClick={handleDownloadScreenVideo} className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Download Screen Recording
          </Button>
        </div>

        {/* Video Grid */}
        <div className={cn(
          "grid gap-8",
          hasWebcamRecording ? "lg:grid-cols-2" : "lg:grid-cols-1"
        )}>
          {/* Screen Recording */}
          <Card className="bg-card/50 backdrop-blur-sm border border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-foreground">Screen Recording</h2>
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

          {/* Webcam Recording Placeholder */}
          {hasWebcamRecording && (
            <Card className="bg-card/50 backdrop-blur-sm border border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-foreground">Webcam Recording</h2>
                </div>
                
                <div className="bg-gradient-to-br from-muted/30 to-muted/60 rounded-lg aspect-video flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Play className="w-8 h-8 text-primary" />
                    </div>
                    <p className="text-foreground font-medium mb-2">Webcam Recording Available</p>
                    <p className="text-sm text-muted-foreground max-w-sm">
                      Webcam video was recorded during your session. 
                      Full editing capabilities coming soon!
                    </p>
                  </div>
                </div>
                
                <div className="mt-4 flex justify-between items-center">
                  <div className="text-sm text-muted-foreground">
                    Webcam video capture
                  </div>
                  <Button
                    variant="outline"
                    disabled
                    className="flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Coming Soon
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Additional Info */}
        <Card className="mt-8 bg-card/30 backdrop-blur-sm border border-border">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-3">Recording Summary</h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <div className="text-muted-foreground">Type</div>
                <div className="font-medium">
                  Screen Recording {hasWebcamRecording && '+ Webcam'}
                </div>
              </div>
              <div>
                <div className="text-muted-foreground">Format</div>
                <div className="font-medium">WebM (VP9/Opus)</div>
              </div>
              <div>
                <div className="text-muted-foreground">Quality</div>
                <div className="font-medium">High (10 Mbps)</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EditPage;
