/**
 * services/cloudinaryService.ts
 *
 * Upload de imagens via Cloudinary (plano gratuito — 25 GB).
 * Usa o endpoint de upload não autenticado com "unsigned preset".
 *
 * CONFIGURAÇÃO (faça uma vez no cloudinary.com):
 * 1. Crie uma conta gratuita em cloudinary.com
 * 2. No dashboard: Settings → Upload → Upload presets → Add upload preset
 *    - Signing Mode: "Unsigned"
 *    - Folder: "cri-artes/products"
 *    - Allowed formats: jpg, png, webp, svg
 *    - Max file size: 5 MB
 *    - Salve e copie o "Preset name"
 * 3. Copie seu "Cloud name" do dashboard principal
 * 4. Adicione ao .env:
 *    VITE_CLOUDINARY_CLOUD_NAME=seu_cloud_name
 *    VITE_CLOUDINARY_UPLOAD_PRESET=seu_preset_name
 *
 * Por que unsigned preset é seguro aqui?
 * - O preset limita pasta, formato e tamanho máximo
 * - Qualquer upload vai para a pasta "cri-artes/products" — não há acesso
 *   a outras pastas da conta
 * - Em produção, você pode adicionar moderação automática no preset
 */

export type UploadProgress = {
  percent: number; // 0–100
  state: 'running' | 'error' | 'success';
};

export const ACCEPTED_IMAGE_TYPES =
  'image/jpeg,image/png,image/webp,image/svg+xml';
export const MAX_FILE_SIZE_MB = 5;

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME as string;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET as string;

if (import.meta.env.DEV && (!CLOUD_NAME || !UPLOAD_PRESET)) {
  console.error(
    '[Cloudinary] Variáveis faltando no .env:\n' +
      '  VITE_CLOUDINARY_CLOUD_NAME\n' +
      '  VITE_CLOUDINARY_UPLOAD_PRESET',
  );
}

export interface CloudinaryResult {
  url: string; // URL original
  secureUrl: string; // URL HTTPS (use esta)
  publicId: string; // ID para deletar/transformar depois
  width: number;
  height: number;
}

/**
 * Faz upload de uma imagem para o Cloudinary.
 * Retorna a URL segura (HTTPS) da imagem após o upload.
 */
export function uploadToCloudinary(
  file: File,
  onProgress?: (p: UploadProgress) => void,
): Promise<CloudinaryResult> {
  return new Promise((resolve, reject) => {
    // Valida tamanho antes de enviar
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      reject(new Error(`Arquivo muito grande. Máximo ${MAX_FILE_SIZE_MB} MB.`));
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET);
    formData.append('folder', 'cri-artes/products');

    // Usa XMLHttpRequest para ter progresso real de upload
    const xhr = new XMLHttpRequest();

    xhr.upload.addEventListener('progress', (e) => {
      if (e.lengthComputable) {
        const percent = Math.round((e.loaded / e.total) * 100);
        onProgress?.({ percent, state: 'running' });
      }
    });

    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        const data = JSON.parse(xhr.responseText);
        onProgress?.({ percent: 100, state: 'success' });
        resolve({
          url: data.url,
          secureUrl: data.secure_url,
          publicId: data.public_id,
          width: data.width,
          height: data.height,
        });
      } else {
        const msg =
          JSON.parse(xhr.responseText)?.error?.message ?? 'Erro no upload';
        onProgress?.({ percent: 0, state: 'error' });
        reject(new Error(msg));
      }
    });

    xhr.addEventListener('error', () => {
      onProgress?.({ percent: 0, state: 'error' });
      reject(new Error('Erro de conexão. Verifique sua internet.'));
    });

    xhr.open(
      'POST',
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    );
    xhr.send(formData);
  });
}

/**
 * Gera uma URL transformada do Cloudinary.
 * Útil para redimensionar automaticamente as imagens do catálogo.
 *
 * Exemplos:
 *   optimizeUrl(publicId, { width: 600, quality: "auto" })
 *   optimizeUrl(publicId, { width: 400, height: 500, crop: "fill" })
 */
export function optimizeUrl(
  publicId: string,
  opts: {
    width?: number;
    height?: number;
    crop?: 'fill' | 'fit' | 'scale' | 'thumb';
    quality?: 'auto' | number;
    format?: 'auto' | 'webp' | 'jpg' | 'png';
  } = {},
): string {
  const {
    width,
    height,
    crop = 'fill',
    quality = 'auto',
    format = 'auto',
  } = opts;
  const transforms = [
    `f_${format}`,
    `q_${quality}`,
    crop && `c_${crop}`,
    width && `w_${width}`,
    height && `h_${height}`,
  ]
    .filter(Boolean)
    .join(',');

  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transforms}/${publicId}`;
}
