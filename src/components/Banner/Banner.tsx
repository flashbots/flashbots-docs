/* Custom Banner Module
Use it to quickly deploy a simple banner to the Flashbots homepage

To add a new banner all you need to do is edit the ./banner.config.tsx
file and set the applicable properties. No other work is necessary.

You'll find more in-depth documentation there.
*/

import React from 'react'
import clsx from 'clsx'
import bannerConfig from './banner.config'
import customStyles from './Banner.custom.module.scss'
import bannerStyles from './Banner.module.scss'

export interface BannerOptions {
  bannerContent?: JSX.Element | string | null
  backgroundColor: string
  textColor: string
  startDate: string | null
  endDate: string | null
  customBannerCSS: boolean
}

class BannerConfigs {
  options: BannerOptions

  constructor(options: BannerOptions) {
    this.options = options
  }

  // Sets the appropriate CSS rules for the element
  // based on the `customCSS` option
  getBannerStyle(): React.CSSProperties | null {
    return !this.options.customBannerCSS
      ? {
          "--banner-text-color": this.options.textColor,
          "--banner-background-color": this.options.backgroundColor
        }
      : null
  }

  // Sets the appropriate class name for the element
  // based on the `customCSS` option
  getBannerClass(): string {
    const styles = this.options.customBannerCSS ? customStyles : bannerStyles

    return clsx(styles.banner)
  }

  // Determines whether the banner should appear based on:
  // 1. Whether there is content to be shown
  // 2. The start and end dates exist and are valid
  shouldShowBanner(): boolean {
    if (!this.options.bannerContent) {
      return false
    }

    const parsedStart = Date.parse(this.options.startDate)
    const parsedEnd = Date.parse(this.options.endDate)
    const currentDate = Date.now()

    return (
      (isNaN(parsedStart) || parsedStart <= currentDate) &&
      (isNaN(parsedEnd) || parsedEnd >= currentDate)
    )
  }
}

export default function Banner(): JSX.Element {
  const configs = new BannerConfigs(bannerConfig)

  if (!configs.shouldShowBanner()) {
    return null
  }

  return (
    <div style={configs.getBannerStyle()} className={configs.getBannerClass()}>
      {configs.options.bannerContent}
    </div>
  )
}
