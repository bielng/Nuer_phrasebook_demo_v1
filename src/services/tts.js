import { Client } from "@gradio/client";

// Hosted on Hugging Face Spaces (facebook/mms-tts-nus) — Nuer text only.
const TTS_SPACE_ID = "dayomtechnologies/Text_To_Speech_Thok_Naath";

let ttsClientPromise = null;
function getTTSClient() {
  if (!ttsClientPromise) {
    ttsClientPromise = Client.connect(TTS_SPACE_ID);
  }
  return ttsClientPromise;
}

/**
 * Synthesizes Nuer (Thok Naath) speech from text using the fine-tuned
 * facebook/mms-tts-nus model hosted on our HF Space.
 * @param {string} text - Nuer text to speak.
 * @param {number} seed - Optional seed for reproducible synthesis.
 * @returns {Promise<string>} A playable audio URL.
 */
export async function synthesizeNuerSpeech(text, seed = 42) {
  const client = await getTTSClient();
  const result = await client.predict("/synthesize", { text, seed });

  // The Space returns [audio, downloadFile]; audio is a FileData object
  // with a `url` pointing to the generated WAV.
  const audioData = result?.data?.[0];
  const url = audioData?.url || audioData?.path;
  if (!url) throw new Error("No audio returned from TTS model.");
  return url;
}
