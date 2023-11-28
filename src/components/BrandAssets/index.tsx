/**
 * Copyright (c) Flashbots Ltd. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import {useState} from 'react';
import AssetCard from './AssetCard';

export default function BrandAssets() {

  return (
    <div>
      <div className='flex max-[768px]:flex-col gap-4'>
        <AssetCard
          title="Flashbots Logo - Dark"
          cover="/img/brand-assets/flashbots_logo_dark.jpg"
          svg="/img/brand-assets/flashbots_logo_dark.svg"
          png="/img/brand-assets/flashbots_logo_dark.png"
        />
        <AssetCard
          title="Flashbots Logo - Light"
          cover="/img/brand-assets/flashbots_logo_light.jpg"
          svg="/img/brand-assets/flashbots_logo_light.svg"
          png="/img/brand-assets/flashbots_logo_light.png"
        />
      </div>

      <div className='flex max-[768px]:flex-col gap-4'>
        <AssetCard
          title="Flashbots Icon"
          cover="/img/brand-assets/flashbots_icon.jpg"
          svg="/img/brand-assets/flashbots_icon.svg"
          png="/img/brand-assets/flashbots_icon.png"
        />
        <div className='block my-4 w-1/2 w-full'></div>
      </div>

    </div>
  );
}
