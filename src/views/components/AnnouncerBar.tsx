import type { FC } from 'react';
import type { FSSettings } from '../../models/FirestoreModels';

interface Props {
  settings: FSSettings;
}

export const AnnouncerBar: FC<Props> = ({ settings }) => {
  if (!settings.announceActive) return null;

  return (
    <div
      className="announce"
      dangerouslySetInnerHTML={{ __html: settings.announceText }}
    />
  );
};
