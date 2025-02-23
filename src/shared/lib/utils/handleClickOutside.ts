import { RefObject } from 'react';

export interface handleClickOutsideArgs<T extends HTMLElement = HTMLElement> {
  ref: RefObject<T | null> | RefObject<T | null>[];
  callback: (event: MouseEvent | TouchEvent) => void;
}

export type HandleClickOutsideReturnType = (
  event: MouseEvent | TouchEvent,
) => void;

// export const handleClickOutside = ({
//   ref,
//   callback,
// }: handleClickOutsideArgs): HandleClickOutsideReturnType => {
//   return (event: MouseEvent | TouchEvent): void => {
//     const target = event.target as Node;
//
//     let isOutside = false;
//
//     if (Array.isArray(ref)) {
//       isOutside = ref
//         .filter((r) => Boolean(r.current))
//         .every((r) => !r.current?.contains(target));
//     } else if (ref?.current && !Array.isArray(ref) && 'contains' in ref) {
//       isOutside = 'contains' in ref.current && ref.current.contains(target);
//     }
//
//     if (isOutside) {
//       callback(event);
//     }
//   };
// };

export const handleClickOutside = ({
  ref,
  callback,
}: handleClickOutsideArgs): HandleClickOutsideReturnType => {
  return (event: MouseEvent | TouchEvent): void => {
    const target = event.target as Node;

    let isOutside = false;

    if (Array.isArray(ref)) {
      isOutside = ref
        .filter((r) => Boolean(r.current))
        .every((r) => r.current && !r.current.contains(target)); // Corrected
    } else if (ref?.current) {
      isOutside = !ref.current.contains(target); // Corrected
    }

    if (isOutside) {
      callback(event);
    }
  };
};
