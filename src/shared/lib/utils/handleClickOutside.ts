import { RefObject } from 'react';

export interface handleClickOutsideArgs<T extends HTMLElement = HTMLElement> {
  ref: RefObject<T | null> | RefObject<T | null>[];
  callback: (event: MouseEvent | TouchEvent) => void;
}

export type HandleClickOutsideReturnType = (
  event: MouseEvent | TouchEvent,
) => void;

export const handleClickOutside = ({
  ref,
  callback,
}: handleClickOutsideArgs): HandleClickOutsideReturnType => {
  return (event: MouseEvent | TouchEvent): void => {
    const target = event.target;

    let isOutside = false;

    if (target instanceof Node) {
      if (Array.isArray(ref)) {
        isOutside = ref
          .filter((r) => Boolean(r.current))
          .every((r) => r.current && !r.current.contains(target));
      } else if (ref?.current) {
        isOutside = !ref.current.contains(target);
      }

      if (isOutside) {
        callback(event);
      }
    }
  };
};
