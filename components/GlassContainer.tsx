import clsx from 'clsx';
import { FC } from 'react';

export interface GlassContainerProps {
  children: React.ReactNode;
  className?: string;
}

const GlassContainer: FC<GlassContainerProps> = ({ children, className }) => {
  return (
    <div
      className={clsx(
        'glass rounded-2xl border-solid border-2 border-gray-200',
        className
      )}
    >
      {children}
    </div>
  );
};

export default GlassContainer;
