// Netlify Blobs writes occasionally fail transiently (cold-start connection
// errors are the main one seen in production). Retrying a couple of times
// before giving up turns most of these into a no-op for the caller instead
// of a user-visible save/upload error.
export async function withRetry<T>(fn: () => Promise<T>, attempts = 3, delaysMs: number[] = [400, 1200]): Promise<T> {
  let lastErr: unknown;
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (err) {
      lastErr = err;
      if (i < attempts - 1) {
        await new Promise((r) => setTimeout(r, delaysMs[i] ?? delaysMs[delaysMs.length - 1] ?? 1000));
      }
    }
  }
  throw lastErr;
}
