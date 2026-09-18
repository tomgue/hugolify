/**
 * PostCSS config — hugolify-theme-bootstrap
 *
 * Copy this file to "postcss/bootstrap" directory of your Hugo project and install the dependencies:
 *   hugo mod get && hugo mod npm pack && yarn install
 *
 * Requires Hugo stats for PurgeCSS (hugo.yaml):
 *   build:
 *     writeStats: true
 */

/* eslint-disable no-undef */
module.exports = {
  plugins: {
    autoprefixer: {},
    '@fullhuman/postcss-purgecss': {
      mode: 'all',
      content: ['./hugo_stats.json'],
      dynamicAttributes: [
        'aria-current',
        'aria-hidden',
        'aria-expanded',
        'href',
        'role',
        'type'
      ],
      safelist: {
        standard: [
          'show',
          'showing',
          'hide',
          'fade',
          /-backdrop$/,
          /^is-/,
          /^splide_/
        ],
        deep: [
          /^tobii/
        ]
      },
      defaultExtractor: (content) => {
        // hugo_stats.json holds null tags/classes/ids until Hugo finishes
        // collecting stats (first build, or after a crashed build), so guard
        // against null to avoid "Cannot read properties of null (reading 'concat')".
        const els = JSON.parse(content).htmlElements;
        return [
          ...(els.tags || []),
          ...(els.classes || []),
          ...(els.ids || [])
        ];
      }
    }
  }
};