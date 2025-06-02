export async function encryptConfig(
  config: object,
  secretKeyBase64: string
): Promise<string> {
  const configJson = JSON.stringify(config);
  const enc = new TextEncoder();
  const iv = crypto.getRandomValues(new Uint8Array(12)); // Initialization Vector

  const key = await crypto.subtle.importKey(
    "raw",
    Uint8Array.from(atob(secretKeyBase64), (c) => c.charCodeAt(0)),
    "AES-GCM",
    false,
    ["encrypt"]
  );

  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    enc.encode(configJson)
  );

  // Concatenate IV and encrypted data
  const encryptedBytes = new Uint8Array([...iv, ...new Uint8Array(encrypted)]);
  return btoa(String.fromCharCode(...encryptedBytes));
}
