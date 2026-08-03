import { Client } from "@gradio/client";

const SPACE_ID = "dayomtechnologies/English_to_Nuer_Translator";

let clientPromise = null;
function getClient() {
  if (!clientPromise) {
    clientPromise = Client.connect(SPACE_ID);
  }
  return clientPromise;
}
