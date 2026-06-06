/**
 * views/admin/ImageUploader.tsx
 * Campo de upload via Cloudinary com preview, barra de progresso e remoção.
 */

import { useRef, type FC } from 'react';
import { useImageUpload } from '../../hooks/useImageUpload';

interface Props {
  currentUrl?: string;
  onSuccess: (url: string, publicId: string) => void;
}

export const ImageUploader: FC<Props> = ({ currentUrl, onSuccess }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    preview,
    progress,
    error,
    uploading,
    handleFileChange,
    handleRemove,
    ACCEPTED_IMAGE_TYPES,
  } = useImageUpload({ currentUrl, onSuccess });

  return (
    <div className="img-uploader">
      {/* Drop-zone / preview */}
      <div
        className={`img-uploader__zone${preview ? ' img-uploader__zone--has-image' : ''}`}
        onClick={() => !uploading && inputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
        aria-label="Clique para selecionar uma imagem"
      >
        {preview ? (
          <img
            src={preview}
            alt="Preview do produto"
            className="img-uploader__preview"
          />
        ) : (
          <div className="img-uploader__empty">
            <i className="ti ti-photo-plus" aria-hidden="true" />
            <span>Clique para adicionar imagem</span>
            <small>PNG, JPG, WebP ou SVG · máx. 5 MB</small>
          </div>
        )}

        {/* Overlay de progresso */}
        {uploading && progress && (
          <div className="img-uploader__overlay">
            <div className="img-uploader__progress-bar">
              <div
                className="img-uploader__progress-fill"
                style={{ width: `${progress.percent}%` }}
              />
            </div>
            <span className="img-uploader__progress-label">
              {progress.percent}%
            </span>
          </div>
        )}
      </div>

      {/* Botões */}
      <div className="img-uploader__actions">
        <button
          type="button"
          className="adm-btn adm-btn--ghost adm-btn--sm"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
        >
          <i className="ti ti-upload" aria-hidden="true" />
          {uploading
            ? 'Enviando…'
            : preview
              ? 'Trocar imagem'
              : 'Selecionar imagem'}
        </button>

        {preview && !uploading && (
          <button
            type="button"
            className="adm-btn adm-btn--danger adm-btn--sm"
            onClick={handleRemove}
          >
            <i className="ti ti-trash" aria-hidden="true" />
            Remover
          </button>
        )}
      </div>

      {error && (
        <div className="adm-error" style={{ marginTop: 8 }}>
          {error}
        </div>
      )}

      {/* Input oculto */}
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_IMAGE_TYPES}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </div>
  );
};
