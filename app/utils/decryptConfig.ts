export async function decryptConfig(
  encryptedBase64: string,
  secretKeyBase64: string
): Promise<object> {
  const encryptedBytes = Uint8Array.from(atob(encryptedBase64), (c) =>
    c.charCodeAt(0)
  );
  const iv = encryptedBytes.slice(0, 12);
  const data = encryptedBytes.slice(12);

  const key = await crypto.subtle.importKey(
    "raw",
    Uint8Array.from(atob(secretKeyBase64), (c) => c.charCodeAt(0)),
    "AES-GCM",
    false,
    ["decrypt"]
  );

  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv },
    key,
    data
  );

  return JSON.parse(new TextDecoder().decode(decrypted));
}
