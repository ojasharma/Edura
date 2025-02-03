import { createEnv } from '@t3-oss/env-core';
import z from 'zod';

export const env = createEnv({
  server: {
    MONGO_CONN_URI: z.string(),
    JWT_SECRET: z.string(),
    CLOUDINARY_CLOUD_NAME: z.string(),
    CLOUDINARY_API_KEY: z.string(),
    CLOUDINARY_API_SECRET: z.string(),
    HUGGINGFACE_API_KEY: z.string(),
    HUGGINGFACE_WHISPER_URL: z.string().url(),
    HUGGINGFACE_QWEN_URL: z.string().url(),
    GROQ_API_KEY: z.string().url(),
    EMAIL_USER: z.string(),
    EMAIL_PASSWORD: z.string()
  },
  runtimeEnv: process.env
})
