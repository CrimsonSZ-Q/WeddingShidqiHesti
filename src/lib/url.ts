/**
 * Utility to encode guest names into a URL-safe Base64 format
 */
export function encodeGuestName(name: string): string {
  if (!name) return "";
  try {
    // Encode string to UTF-8 bytes, then convert to base64
    const utf8Bytes = new TextEncoder().encode(name.trim());
    const binString = Array.from(utf8Bytes, (byte) => String.fromCharCode(byte)).join("");
    const base64 = btoa(binString);
    
    // Make Base64 URL-safe (replace +, /, and remove padding =)
    return base64
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
  } catch (e) {
    console.error("Encoding error:", e);
    return name;
  }
}

/**
 * Utility to decode URL-safe Base64 guest names
 */
export function decodeGuestName(encoded: string): string {
  if (!encoded) return "";
  try {
    // Restore standard Base64 characters
    let base64 = encoded.replace(/-/g, "+").replace(/_/g, "/");
    
    // Restore padding =
    while (base64.length % 4) {
      base64 += "=";
    }
    
    // Decode base64 to binary string, then decode UTF-8
    const binString = atob(base64);
    const bytes = Uint8Array.from(binString, (char) => char.charCodeAt(0));
    return new TextDecoder().decode(bytes);
  } catch (e) {
    // Fallback: If it's not valid Base64, assume it is plain text (backward compatibility)
    return decodeURIComponent(encoded)
      .replace(/[-_+]/g, " ")
      .replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.substring(1))
      .replace(/\bDan\b/g, "dan");
  }
}
