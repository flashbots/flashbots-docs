import React from 'react';
import Layout from '@theme-original/Layout';
import type LayoutType from '@theme/Layout';
import type {WrapperProps} from '@docusaurus/types';
import { Analytics } from '@vercel/analytics/react';
import { FeedbackProvider } from '../../components/Feedback/FeedbackContext';
type Props = WrapperProps<typeof LayoutType>;

export default function LayoutWrapper(props: Props): JSX.Element {
  return (
    <>
      <FeedbackProvider>
        <Layout {...props} />
      </FeedbackProvider>
      <Analytics />
    </>
  );
}
