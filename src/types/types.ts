import { recordingSettingsSchema } from "@/lib/validations";
import { z } from "zod";

export type RecordingSettingsType = z.infer<typeof recordingSettingsSchema>;