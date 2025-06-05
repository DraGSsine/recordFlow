import { z } from 'zod';

export const recordingSettingsSchema = z.object({
    microphoneOn: z.boolean(),
    systemAudioOn: z.boolean(),
    cameraOn: z.boolean(),
    recordingSource: z.enum(["window", "screen"]),
});
