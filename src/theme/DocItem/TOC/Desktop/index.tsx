import React from 'react';
import Desktop from '@theme-original/DocItem/TOC/Desktop';
import type DesktopType from '@theme/DocItem/TOC/Desktop';
import type {WrapperProps} from '@docusaurus/types';
import Feedback from '../../../../components/Feedback';

type Props = WrapperProps<typeof DesktopType>;

export default function DesktopWrapper(props: Props): JSX.Element {
  return (
    <>
      <Desktop {...props} />
      <Feedback />
    </>
  );
}
