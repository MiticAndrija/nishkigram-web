"use client";

import { upload } from "@vercel/blob/client";

export const maxAdminImageUploadSizeBytes = 50 * 1024 * 1024;
export const adminImageAccept = ".jpg,.jpeg,.png,.webp";

type AdminImageUploadResult = {
  url: string;
};

type UploadResponse = {
  upload?: {
    url: string;
  };
  error?: string;
};

function sanitizeBaseName(filename: string) {
  const base = filename.replace(/\.[^.]+$/, "");
  return (
    base
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "dj")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60) || "image"
  );
}

function getExtension(file: File) {
  const extension = file.name.split(".").pop()?.toLowerCase();

  if (extension === "jpeg") {
    return "jpg";
  }

  return extension || "jpg";
}

function validateImage(file: File) {
  const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp"]);

  if (!allowedTypes.has(file.type)) {
    return "Podržani formati su JPG, JPEG, PNG i WEBP.";
  }

  if (file.size <= 0) {
    return "Fajl je prazan.";
  }

  if (file.size > maxAdminImageUploadSizeBytes) {
    return "Slika može biti velika najviše 50 MB.";
  }

  return "";
}

async function serverUpload(file: File, endpoint: string) {
  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch(endpoint, {
    method: "POST",
    body: formData,
  });
  const payload = (await response.json()) as UploadResponse;

  if (!response.ok || !payload.upload?.url) {
    throw new Error(payload.error || "Upload slike nije uspeo.");
  }

  return { url: payload.upload.url };
}

export async function uploadAdminImage(
  file: File,
  endpoint: string,
  onProgress?: (percentage: number) => void,
): Promise<AdminImageUploadResult> {
  const validationError = validateImage(file);

  if (validationError) {
    throw new Error(validationError);
  }

  const pathname = `uploads/blog/${Date.now()}-${crypto.randomUUID()}-${sanitizeBaseName(
    file.name,
  )}.${getExtension(file)}`;

  try {
    const blob = await upload(pathname, file, {
      access: "public",
      handleUploadUrl: endpoint,
      multipart: file.size > 4 * 1024 * 1024,
      contentType: file.type,
      onUploadProgress: ({ percentage }) => onProgress?.(percentage),
    });

    return { url: blob.url };
  } catch (error) {
    const isLocalhost =
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1";

    if (file.size > 4 * 1024 * 1024 && !isLocalhost) {
      throw error;
    }

    return serverUpload(file, endpoint);
  }
}
