import { Dispatch, SetStateAction, useCallback, useState } from 'react';

type UseBooleanToggleReturnType = [boolean, Dispatch<SetStateAction<boolean>>];

export const useBooleanToggle = (
  defaultValue?: boolean,
): UseBooleanToggleReturnType => {
  const [value, setValue] = useState<boolean>(!!defaultValue);

  const toggle = useCallback((): void => {
    setValue((v) => !v);
  }, []);

  return [value, toggle];
};
