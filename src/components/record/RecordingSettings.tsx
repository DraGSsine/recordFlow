import React, { useEffect, useState } from "react";
import { Mic, Volume2, Camera } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { RecordingSettingsType } from "@/types/types";
import { recordingSettingsSchema } from "@/lib/validations";

const defaultSettings: RecordingSettingsType = {
  microphoneOn: true,
  systemAudioOn: false,
  cameraOn: true,
};

const RecordingSettings: React.FC = () => {
  const [screenRecordSettings, setScreenRecordSettings] =
    useState<RecordingSettingsType>(defaultSettings);

  useEffect(() => {
    const settings = localStorage.getItem("screenRecordSettings");
    if (settings) {
      try {
        const parsedSettings = JSON.parse(settings);
        // Validate against the schema, which no longer includes recordingSource
        const validatedSettings = recordingSettingsSchema.parse(parsedSettings);
        setScreenRecordSettings(validatedSettings);
      } catch (error) {
        console.error("Error parsing screen record settings:", error);
        localStorage.removeItem("screenRecordSettings");
        // Set to a default that matches the new schema
        setScreenRecordSettings(defaultSettings);
        localStorage.setItem(
          "screenRecordSettings",
          JSON.stringify(defaultSettings)
        );
        return;
      }
    } else {
      setScreenRecordSettings(defaultSettings);
      localStorage.setItem(
        "screenRecordSettings",
        JSON.stringify(defaultSettings)
      );
    }
  }, []);

  // Helper function to update settings and localStorage
  const updateSettings = (newSettings: Partial<RecordingSettingsType>) => {
    const updatedSettings = { ...screenRecordSettings, ...newSettings };
    // Ensure we only try to parse/validate settings that conform to the schema
    recordingSettingsSchema.parse(updatedSettings); // Validate before storing
    setScreenRecordSettings(updatedSettings);
    localStorage.setItem(
      "screenRecordSettings",
      JSON.stringify(updatedSettings)
    );
  };

  return (
    <Card className="bg-card/50 backdrop-blur-sm border border-border shadow-xl">
      <CardContent className="space-y-6">
        {/* Source Selection UI has been removed as getDisplayMedia handles this */}

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
              onClick={() => {
                updateSettings({
                  microphoneOn: !screenRecordSettings.microphoneOn,
                });
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
              onClick={() => {
                updateSettings({
                  systemAudioOn: !screenRecordSettings.systemAudioOn,
                });
              }}
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-card/30 rounded-xl border border-border">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-chart-2/20 rounded-lg border border-chart-2/30">
                <Camera className="w-5 h-5 text-chart-2" />
              </div>
              <div>
                <div className="text-foreground font-medium">Webcam</div>
                <div className="text-xs text-muted-foreground">
                  Show your face in a floating window
                </div>
              </div>
            </div>
            <Switch
              checked={screenRecordSettings.cameraOn}
              onClick={() => {
                updateSettings({ cameraOn: !screenRecordSettings.cameraOn });
              }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecordingSettings;
