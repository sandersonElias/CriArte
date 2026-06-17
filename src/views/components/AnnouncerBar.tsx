import type { FC } from 'react';
import type { FSSettings } from '../../models/FirestoreModels';

interface Props {
  settings: FSSettings;
  loading?: boolean;
}

export const AnnouncerBar: FC<Props> = ({ settings, loading }) => {
  if (loading || !settings.announceActive) return null;

  return (
    <div
      className="announce"
      dangerouslySetInnerHTML={{ __html: settings.announceText }}
    />
  );
};
