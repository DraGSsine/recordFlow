import { useEffect, useState } from "react";
import { RecordingSettingsType } from "@/types/types";
import { recordingSettingsSchema } from "../validations";

const DEFAULT_SETTINGS: RecordingSettingsType = {
  microphoneOn: true,
  systemAudioOn: false,
  cameraOn: true,
};

const STORAGE_KEY = "screenRecordSettings";

export const useRecordingSettings = () => {
  const [settings, setSettings] = useState<RecordingSettingsType>(DEFAULT_SETTINGS);

  // Load settings from localStorage on mount
  useEffect(() => {
    const loadSettings = () => {
      try {
        const storedSettings = localStorage.getItem(STORAGE_KEY);
        if (storedSettings) {
          const parsedSettings = JSON.parse(storedSettings);
          const validatedSettings = recordingSettingsSchema.parse(parsedSettings);
          setSettings(validatedSettings);
        }
      } catch (error) {
        console.error("Error loading settings from localStorage:", error);
      }
    };

    loadSettings();
  }, []);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch (error) {
      console.error("Error saving settings to localStorage:", error);
    }
  }, [settings]);

  return {
    settings,
    setSettings,
  };
};
