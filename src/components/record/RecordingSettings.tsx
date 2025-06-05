import React, { useEffect, useState } from "react";
import {
  Settings,
  Monitor,
  Mic,
  Volume2,
  Camera,
  ChevronDown,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { RecordingSettingsType } from "@/types/types";

const defaultSettings: RecordingSettingsType = {
  microphoneOn: true,
  systemAudioOn: false,
  cameraOn: true,
  recordingSource: "window",
};

const RecordingSettings: React.FC = () => {
  const [screenRecordSettings, setScreenRecordSettings] =
    useState<RecordingSettingsType>(defaultSettings);

  useEffect(() => {
    const settings = localStorage.getItem("screenRecordSettings");
    if (settings) {
      const parsedSettings: RecordingSettingsType = JSON.parse(settings);
      setScreenRecordSettings(parsedSettings);
    } else {
      setScreenRecordSettings(defaultSettings);
    }
  }, []);
  return (
    <Card className="bg-card/50 backdrop-blur-sm border border-border shadow-xl">
      <CardContent className="space-y-6">
        {/* Source Selection */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground mb-3">
            Recording Source
          </h3>
          <div className="grid grid-cols-1 gap-3">
            <Button
              variant="outline"
              className={`flex items-center justify-between h-auto p-4 text-left transition-all ${
                screenRecordSettings.recordingSource === "screen"
                  ? "bg-primary/10 border-primary/30 hover:border-primary/50 hover:bg-primary/20"
                  : "bg-card/30 border-border hover:border-muted"
              }`}
              onClick={() => {
                setScreenRecordSettings((prev) => ({
                  ...prev,
                  recordingSource: "screen",
                }));
                localStorage.setItem(
                  "screenRecordSettings",
                  JSON.stringify({
                    ...screenRecordSettings,
                    recordingSource: "screen",
                  })
                );
              }}
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-chart-2/20 rounded-lg border border-chart-2/30">
                  <Monitor className="w-5 h-5 text-chart-2" />
                </div>
                <div>
                  <div className="text-foreground font-medium">Full Screen</div>
                  <div className="text-xs text-muted-foreground">
                    Capture entire screen
                  </div>
                </div>
              </div>
              <div className={`w-3 h-3 rounded-full ${
                screenRecordSettings.recordingSource === "screen"
                  ? "bg-primary"
                  : "bg-muted-foreground/50"
              }`}></div>
            </Button>

            <Button
              variant="outline"
              className={`flex items-center justify-between h-auto p-4 text-left transition-all ${
                screenRecordSettings.recordingSource === "window"
                  ? "bg-primary/10 border-primary/30 hover:border-primary/50 hover:bg-primary/20"
                  : "bg-card/30 border-border hover:border-muted"
              }`}
              onClick={() => {
                setScreenRecordSettings((prev) => ({
                  ...prev,
                  recordingSource: "window",
                }));
                localStorage.setItem(
                  "screenRecordSettings",
                  JSON.stringify({
                    ...screenRecordSettings,
                    recordingSource: "window",
                  })
                );
              }}
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-muted/20 rounded-lg border border-muted/30">
                  <Camera className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <div className="text-muted-foreground font-medium">
                    Window
                  </div>
                  <div className="text-xs text-muted-foreground/70">
                    Select specific window
                  </div>
                </div>
              </div>
              <div className={`w-3 h-3 rounded-full ${
                screenRecordSettings.recordingSource === "window"
                  ? "bg-primary"
                  : "bg-muted-foreground/50"
              }`}></div>
            </Button>
          </div>
        </div>

        {/* Audio Settings */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-foreground">
            Audio Settings
          </h3>

          <div className="flex items-center justify-between p-4 bg-card/30 rounded-xl border border-border">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-chart-3/20 rounded-lg border border-chart-3/30">
                <Mic className="w-5 h-5 text-chart-3" />
              </div>
              <div>
                <div className="text-foreground font-medium">Microphone</div>
                <div className="text-xs text-muted-foreground">
                  Record voice narration
                </div>
              </div>
            </div>
            <Switch
              checked={screenRecordSettings.microphoneOn}
              onChange={(e) => {
                setScreenRecordSettings((prev) => ({
                  ...prev,
                  microphoneOn: !prev.microphoneOn,
                }));
                localStorage.setItem(
                  "screenRecordSettings",
                  JSON.stringify({
                    ...screenRecordSettings,
                    microphoneOn: !screenRecordSettings.microphoneOn,
                  })
                );
              }}
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-card/30 rounded-xl border border-border">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-chart-4/20 rounded-lg border border-chart-4/30">
                <Volume2 className="w-5 h-5 text-chart-4" />
              </div>
              <div>
                <div className="text-foreground font-medium">System Audio</div>
                <div className="text-xs text-muted-foreground">
                  Include computer sounds
                </div>
              </div>
            </div>
            <Switch
              checked={screenRecordSettings.systemAudioOn}
              onChange={(e) => {
                setScreenRecordSettings((prev) => ({
                  ...prev,
                  systemAudioOn: !prev.systemAudioOn,
                }));
                localStorage.setItem(
                  "screenRecordSettings",
                  JSON.stringify({
                    ...screenRecordSettings,
                    systemAudioOn: !screenRecordSettings.systemAudioOn,
                  })
                );
              }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecordingSettings;
