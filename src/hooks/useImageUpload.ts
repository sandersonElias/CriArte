import { useState, useCallback } from 'react';
import {
  uploadToCloudinary,
  ACCEPTED_IMAGE_TYPES,
  MAX_FILE_SIZE_MB,
  type UploadProgress,
} from '../services/cloudinaryService';

interface UseImageUploadOptions {
  currentUrl?: string;
  onSuccess: (url: string, publicId: string) => void;
}

export function useImageUpload({
  currentUrl,
  onSuccess,
}: UseImageUploadOptions) {
  const [preview, setPreview] = useState<string | null>(currentUrl ?? null);
  const [progress, setProgress] = useState<UploadProgress | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      // Validação no cliente
      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        setError(`Arquivo muito grande. Máximo ${MAX_FILE_SIZE_MB} MB.`);
        return;
      }
      if (!file.type.startsWith('image/')) {
        setError('Somente arquivos de imagem são aceitos.');
        return;
      }

      setError(null);
      setUploading(true);

      // Preview local imediato enquanto faz upload
      const localPreview = URL.createObjectURL(file);
      setPreview(localPreview);

      try {
        const result = await uploadToCloudinary(file, (p) => setProgress(p));
        onSuccess(result.secureUrl, result.publicId);
        setPreview(result.secureUrl);
      } catch (err: unknown) {
        setError((err as Error).message ?? 'Erro no upload. Tente novamente.');
        setPreview(currentUrl ?? null);
      } finally {
        setUploading(false);
        setProgress(null);
      }
    },
    [currentUrl, onSuccess],
  );

  const handleRemove = useCallback(() => {
    setPreview(null);
    onSuccess('', '');
  }, [onSuccess]);

  return {
    preview,
    progress,
    error,
    uploading,
    handleFileChange,
    handleRemove,
    ACCEPTED_IMAGE_TYPES,
  };
}
