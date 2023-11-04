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
      <div className='flex gap-4'>
        <AssetCard
          title="Flashbots Logo - Color"
          cover="/img/brand-assets/flashbots_logo_color.jpg"
          svg="/img/brand-assets/flashbots_logo_color.svg"
          png="/img/brand-assets/flashbots_logo_color.png"
        />
        <AssetCard
          title="Flashbots Icon - Color"
          cover="/img/brand-assets/flashbots_icon_color.jpg"
          svg="/img/brand-assets/flashbots_icon_color.svg"
          png="/img/brand-assets/flashbots_icon_color.png"
        />
      </div>

      <div className='flex gap-4'>
        <AssetCard
          title="Flashbots Logo - Black"
          cover="/img/brand-assets/flashbots_logo_black.jpg"
          svg="/img/brand-assets/flashbots_logo_black.svg"
          png="/img/brand-assets/flashbots_logo_black.png"
        />
        <AssetCard
          title="Flashbots Icon - Black"
          cover="/img/brand-assets/flashbots_icon_black.jpg"
          svg="/img/brand-assets/flashbots_icon_black.svg"
          png="/img/brand-assets/flashbots_icon_black.png"
        />
      </div>

      <div className='flex gap-4'>
        <AssetCard
          title="Flashbots Logo - White"
          cover="/img/brand-assets/flashbots_logo_white.jpg"
          svg="/img/brand-assets/flashbots_logo_white.svg"
          png="/img/brand-assets/flashbots_logo_white.png"
        />
        <AssetCard
          title="Flashbots Icon - White"
          cover="/img/brand-assets/flashbots_icon_white.jpg"
          svg="/img/brand-assets/flashbots_icon_white.svg"
          png="/img/brand-assets/flashbots_icon_white.png"
        />
      </div>
    </div>
  );
}
