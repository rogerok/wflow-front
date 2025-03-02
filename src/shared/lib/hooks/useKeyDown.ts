import { useCallback, useEffect } from 'react';

export interface useKeyDownArgs {
  callBack: () => void;
  keyCode: KeyboardEvent['code'];
}

export const useKeyDown = ({ callBack, keyCode }: useKeyDownArgs): void => {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.code === keyCode) {
        callBack();
      }
    },
    [keyCode, callBack],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);
};
