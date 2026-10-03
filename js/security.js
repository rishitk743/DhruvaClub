/**
 * ===================================================================
 * DHRUVA CLUB — TAMPER-RESISTANT REDIRECT & SESSION TOKEN HANDLER
 * ===================================================================
 * Protects against URL/storage tampering.
 * Generates obfuscated, checksum-verified tokens for result navigation
 * and preserves calculated PQ/IQ/SQ scores securely.
 * ===================================================================
 */

(function (window) {
  // Secret salt for signature generation
  const SALT = "DHRUVA_CLUB_PQ_IQ_SQ_SECURE_SALT_2026_@v3";

  // Fast, deterministic checksum
  function generateChecksum(str) {
    let hash = 5381;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) + hash) + str.charCodeAt(i);
      hash = hash & hash;
    }
    return Math.abs(hash).toString(36);
  }

  /**
   * Encrypt arbitrary session object (gender, fullName, scores: { pq, iq, sq })
   */
  function encryptSessionPayload(data) {
    const jsonStr = JSON.stringify(data || {});
    const timestamp = Date.now();
    const nonce = Math.random().toString(36).substring(2, 8);
    const rawPayload = `${jsonStr}|${timestamp}|${nonce}`;
    const signature = generateChecksum(rawPayload + SALT);
    const fullString = `${rawPayload}|${signature}`;

    // XOR obfuscation with salt
    let encryptedChars = [];
    for (let i = 0; i < fullString.length; i++) {
      const code = fullString.charCodeAt(i) ^ SALT.charCodeAt(i % SALT.length);
      encryptedChars.push(String.fromCharCode(code));
    }

    // URL-safe Base64 encoding
    return btoa(encryptedChars.join(""))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
  }

  /**
   * Decrypt session object and verify checksum signature
   */
  function decryptSessionPayload(token) {
    if (!token || typeof token !== "string") return null;

    try {
      let base64 = token.replace(/-/g, "+").replace(/_/g, "/");
      while (base64.length % 4) {
        base64 += "=";
      }
      const rawString = atob(base64);

      let decryptedChars = [];
      for (let i = 0; i < rawString.length; i++) {
        const code = rawString.charCodeAt(i) ^ SALT.charCodeAt(i % SALT.length);
        decryptedChars.push(String.fromCharCode(code));
      }
      const fullString = decryptedChars.join("");
      const lastPipeIndex = fullString.lastIndexOf("|");
      if (lastPipeIndex === -1) return null;

      const signature = fullString.substring(lastPipeIndex + 1);
      const rawPayload = fullString.substring(0, lastPipeIndex);

      const expectedSignature = generateChecksum(rawPayload + SALT);
      if (signature !== expectedSignature) {
        console.warn("⚠️ Invalid or tampered security signature detected.");
        return null;
      }

      const payloadParts = rawPayload.split("|");
      if (payloadParts.length < 3) return null;

      const jsonStr = payloadParts.slice(0, payloadParts.length - 2).join("|");
      return JSON.parse(jsonStr);
    } catch (e) {
      console.error("Payload decryption failed:", e);
      return null;
    }
  }

  // Backward-compatible wrappers for gender token
  function encryptGenderToken(gender) {
    return encryptSessionPayload({ gender: (gender || "male").toLowerCase().trim() });
  }

  function decryptGenderToken(token) {
    const data = decryptSessionPayload(token);
    return data && data.gender ? data.gender.toLowerCase() : null;
  }

  window.DhruvaSecurity = {
    encryptSessionPayload,
    decryptSessionPayload,
    encryptGenderToken,
    decryptGenderToken
  };
})(window);

