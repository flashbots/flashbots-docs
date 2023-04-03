import React from 'react';
import Mobile from '@theme-original/DocItem/TOC/Mobile';
import type MobileType from '@theme/DocItem/TOC/Mobile';
import type {WrapperProps} from '@docusaurus/types';

type Props = WrapperProps<typeof MobileType>;

export default function MobileWrapper(props: Props): JSX.Element {
  return (
    <>
      <Mobile {...props} />
    </>
  );
}
