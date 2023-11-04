/**
 * Copyright (c) Flashbots Ltd. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { ReactNode } from "react"
import styles from  './styles.module.css';
import Download from "./Download";

interface IAssetCard {
  title?: string
  cover?: string
  svg?: string
  png?: string
}

function AssetCard({ title, cover, svg, png }: IAssetCard) {
  return (
    <div className="my-5 w-1/2 w-full">
      <img alt="" src={ cover } className="w-full h-56 object-cover border border-solid border-slate-500/25 rounded-xl"/>
      <div className="w-full flex items-center gap-1 px-2 bg-gray-50/0 rounded-lg">
        <p className="px-2 grow m-0">{ title }</p>
        <Download file={ svg } type="svg" />
        <Download file={ png } type="png" />
      </div>
    </div>
  )
}

export default AssetCard
