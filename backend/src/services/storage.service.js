import { supabaseAdmin } from '../config/supabase.js';
import { buildStoragePath } from '../config/storage.js';

// Upload a file buffer to a Supabase Storage bucket.
// Returns the public URL (or signed URL path for private buckets).
export async function uploadFile({ bucket, teamId, originalName, buffer, mimeType }) {
  const path = buildStoragePath(teamId, originalName);

  const { data, error } = await supabaseAdmin.storage
    .from(bucket)
    .upload(path, buffer, {
      contentType: mimeType,
      upsert: false,
    });

  if (error) {
    throw new Error(`Storage upload failed: ${error.message}`);
  }

  // Return path for private buckets (sign URLs on demand)
  return { path: data.path, bucket };
}

// Generate a short-lived signed URL for a private bucket object
export async function getSignedUrl(bucket, path, expiresInSeconds = 3600) {
  const { data, error } = await supabaseAdmin.storage
    .from(bucket)
    .createSignedUrl(path, expiresInSeconds);

  if (error) {
    throw new Error(`Failed to create signed URL: ${error.message}`);
  }

  return data.signedUrl;
}

// Delete a file from storage (used on re-upload to clean up old file)
export async function deleteFile(bucket, path) {
  const { error } = await supabaseAdmin.storage.from(bucket).remove([path]);
  if (error) {
    // Non-fatal — log but don't throw
    console.warn(`Failed to delete old file ${path} from ${bucket}:`, error.message);
  }
}
