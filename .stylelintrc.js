module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-prettier'],
  plugins: ['stylelint-copyright'],
  rules: {
    'docusaurus/copyright-header': [
      true,
      {
        header: `*
 * Copyright (c) Flashbots Ltd. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.`,
      },
};
