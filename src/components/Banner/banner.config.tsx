/* Custom Banner Module
Use it to quickly deploy a simple banner to the Flashbots homepage

To add a new banner all you need to do is edit the properties below and set them
to your desired values.

For simple banners with just a couple of colors - for copy and background - you
can use the properties here. But if the banner requires more sophisticated styling
you can override the color options by setting `customCSS: true` and adding your CSS
rules to ./Banner.custom.module.scss.

There are detailed explanations for each property below, but here's a quick guide:
 - bannerContent: What should appear inside the banner
 - backgroundColor: Solid, single color for the banner
 - textColor: Solid, single color for all the copy inside the banner
 - startDate: When should the banner start appearing on the site
 - endDate: When should the banner stop appearing on the site
 - customCSS: Whether the banner should make use of custom CSS rules loaded from ./Banner.custom.module.scss
*/

import React from 'react'
import BannerOptions from './Banner'

export const bannerConfig: BannerOptions = {
  /*
  bannerContent: The pure text or HTML markup to appear in the banner
  - Banner won't appear when set to null
  
  Examples:
    - bannerContent: null
    - bannerContent: "Banner content!"
    - bannerContent: (<span>Banner content! <a href='https://example.com' target='_blank' rel='noreferrer'>Link</a></span>)
  */
  bannerContent: null,

  /*
  backgroundColor: Single, solid background color for the banner
  - Will default to the site's background when set to null
  - Has no effect if customCSS is true

  Examples:
    - backgroundColor: null
    - backgroundColor: "#023047"
  */
  backgroundColor: null,

  /*
  textColor: Single, solid text color for the banner
  - Will default to the site's text color when set to null
  - Has no effect if customCSS is true

  Examples:
    - textColor: null
    - textColor: "#ffb703"
  */
  textColor: null,

  /*
  startDate: Date and time (UTC) when the banner should start appearing on the website
  - When set to null a banner will always appear, provided there is content to be shown
    and the endDate, if there is one, hasn't been reached
  Format: "YYYY-MM-DD HH:mmZ"

  Examples:
    - startDate: null
    - startDate: "2001-09-14 16:00Z"
  */
  startDate: null,

  /*
  endDate: Date and time (UTC) when the banner should stop appearing on the website
  - When set to null a banner will always appear, provided there is content to be shown
    and the startDate, if there is one, has been reached
  Format: "YYYY-MM-DD HH:mmZ"

  Examples:
    - endDate: null
    - endDate: "2007-02-01 00:00Z"
  */
  endDate: null,

  /*
  customCSS: Determines whether to use a custom CSS instead instead of the color options
  - Custom CSS must be set in ./Banner.custom.module.scss
  - Will completely bypass backgroundColor and textColor if set to true

  Examples:
    - customCSS: true
  */
  customBannerCSS: false
}

export default bannerConfig
