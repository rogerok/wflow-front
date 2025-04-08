import { act, renderHook } from '@testing-library/react';
import { describe } from 'vitest';

import { TextField } from '../../form/fields/TextField';
import { useAutocomplete, useAutocompleteArgs } from '../useAutocomplete';

describe('test useAutocomplete hook', () => {
  type OptionsType = {
    id: string;
    label: string;
    user: string;
  };

  const field = new TextField('testField', '');
  const options: OptionsType[] = [
    {
      id: '1',
      label: 'label 1',
      user: 'user 1',
    },
    {
      id: '2',
      label: 'just label 2',
      user: 'user 2',
    },
    {
      id: '3',
      label: 'my label 3',
      user: 'user 3',
    },
    {
      id: '4',
      label: 'label 4',
      user: 'user 4',
    },
  ];

  const mockedObj: useAutocompleteArgs<{
    id: string;
    label: string;
    user: string;
  }> = {
    field: field,
    options: options,
    labelField: 'label',
    uniqueIdentifier: 'id',
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const setupHook = (customOptions: OptionsType[] = options) => {
    const mockedObj: useAutocompleteArgs<OptionsType> = {
      field,
      options: customOptions,
      labelField: 'label',
      uniqueIdentifier: 'id',
    };
    return renderHook(() => useAutocomplete(mockedObj));
  };

  it('should initialize with correct default values', () => {
    const { result } = setupHook();

    const { selectedItem, inputOptions, inputLabel } = result.current;

    expect(inputLabel).toBe('');
    expect(selectedItem).toBe(null);
    expect(inputOptions).toEqual(mockedObj.options);
  });

  it('should update state when item is selected', () => {
    const { result } = setupHook();

    act(() => {
      result.current.onItemSelect(mockedObj.options[1]);
    });

    expect(result.current.selectedItem).toBe(mockedObj.options[1]);
    expect(result.current.inputLabel).toBe(mockedObj.options[1].label);
    // TODO: test calling setValue of field
  });

  it('should filter items on input change', () => {
    const { result } = setupHook();

    act(() => {
      result.current.onChange('label');
    });

    expect(result.current.inputOptions).toEqual([
      mockedObj.options[0],
      mockedObj.options[3],
    ]);
  });

  it('should filter items on input change', () => {
    const { result } = setupHook();

    act(() => {
      result.current.onClear();
    });

    expect(result.current.inputLabel).toBe('');
    expect(result.current.inputOptions).toEqual(mockedObj.options);
    expect(result.current.selectedItem).toBe(null);
  });

  it('should restore selected value when closed', () => {
    const { result } = setupHook();

    act(() => {
      result.current.onItemSelect(mockedObj.options[0]);
    });
    act(() => {
      result.current.onClose();
    });

    expect(result.current.inputLabel).toBe(mockedObj.options[0].label);
    expect(result.current.selectedItem).toBe(mockedObj.options[0]);
  });

  it('should handle empty options gracefully', () => {
    const { result } = setupHook([]);

    act(() => {
      result.current.onChange('something');
    });

    expect(result.current.inputOptions).toEqual([]);
  });
  it('should not select non existing item', () => {
    const { result } = setupHook();

    act(() => {
      result.current.onItemSelect({
        id: '5',
        label: 'label 5',
        user: 'user 5',
      });
    });

    expect(result.current.selectedItem).not.toEqual({
      id: '5',
      label: 'label 5',
      user: 'user 5',
    });
  });

  it('should clear on same option click', () => {
    const { result } = setupHook();

    act(() => {
      result.current.onItemSelect(mockedObj.options[0]);
    });

    expect(result.current.inputLabel).toBe(options[0].label);

    act(() => {
      result.current.onItemSelect(mockedObj.options[0]);
    });

    expect(result.current.inputLabel).toBe('');
    expect(result.current.selectedItem).toBe(null);
  });
});
