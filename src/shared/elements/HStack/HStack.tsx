import React, { ElementType, FC, ReactElement } from 'react';

import { Flex, FlexProps } from '../Flex/Flex';

type HStackProps = Omit<FlexProps<ElementType>, 'direction'>;

export const HStack: FC<HStackProps> = (props): ReactElement => {
  return <Flex {...props} direction={'row'} />;
};
