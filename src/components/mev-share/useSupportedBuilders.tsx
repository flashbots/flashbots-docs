/**
 * Copyright (c) Flashbots Ltd. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import {useEffect, useState} from 'react';
import axios from 'axios';

export type Builder = {
  name: string;
  rpc: string;
  'supported-apis': Array<string>; // TODO: can we please change this to camelCase
};

export const useSupportedBuilders = () => {
  const [builders, setBuilders] = useState<Builder[]>([]);

  useEffect(() => {
    const source = axios.CancelToken.source();
    const fetchSupportedBuilders = async () => {
      try {
        const res = await axios.get(
          'https://raw.githubusercontent.com/flashbots/dowg/main/builder-registrations.json',
          {cancelToken: source.token},
        );
        setBuilders(res.data);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('Request canceled', error.message);
        } else {
          throw error;
        }
      }
    };

    fetchSupportedBuilders();
    return () => {
      source.cancel('Component unmounted');
    };
  }, []);

  return builders;
};
