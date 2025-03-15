import './Pulse.scss';

import { cn } from '@bem-react/classname';
import { FC } from 'react';

const cnPulse = cn('Pulse');

interface PulseProps {
  className?: string;
}

export const Pulse: FC<PulseProps> = (props) => {
  return <div className={cnPulse(undefined, [props.className])} />;
};
