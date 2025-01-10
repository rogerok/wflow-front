import React, { ElementType, FC, ReactElement } from 'react';

import { Flex, FlexProps } from '../Flex/Flex';

//TODO: remove direction prop

type HStackProps = FlexProps<ElementType>;

export const HStack: FC<HStackProps> = (props): ReactElement => {
  return <Flex {...props} direction={'row'} />;
};
