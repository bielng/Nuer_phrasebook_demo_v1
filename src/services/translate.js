import { Client } from "@gradio/client";

const SPACE_ID = "dayomtechnologies/English_to_Nuer_Translator";

let clientPromise = null;
function getClient() {
  if (!clientPromise) {
    clientPromise = Client.connect(SPACE_ID);
  }
  return clientPromise;
}

/**
 * @param {string} text
 * @param {"en-to-nus" | "nus-to-en"} direction
 * @returns {Promise<string>}
 */
export async function translateText(text, direction) {
  const gradioDirection =
    direction === "en-to-nus" ? "English to Nuer" : "Nuer to English";

  const client = await getClient();
  const result = await client.predict("/translate", {
    text,
    direction: gradioDirection,
  });

  return (result?.data?.[0] ?? "").toString();
}
