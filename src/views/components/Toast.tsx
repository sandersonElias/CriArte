import type { FC } from 'react';

interface Props {
  text: string;
  visible: boolean;
}

export const Toast: FC<Props> = ({ text, visible }) => (
  <div className={`toast${visible ? ' toast--visible' : ''}`}>{text}</div>
);
