import { markRaw } from 'vue';
import DeeplinkExperience from '../components/deeplink/DeeplinkExperience.vue';

/**
 * @typedef {Object} PlaygroundControl
 * @property {string} prop
 * @property {string} type
 * @property {string} labelKey
 * @property {string} [helperKey]
 * @property {string} [placeholderKey]
 * @property {number} [min]
 * @property {number} [max]
 * @property {number} [step]
 */

/**
 * @typedef {Object} ComponentDefinition
 * @property {string} slug
 * @property {string} nameKey
 * @property {string} summaryKey
 * @property {string} descriptionKey
 * @property {string} propsKey
 * @property {{ desktop: string; mobile: string }} notesKeys
 * @property {Record<string, unknown>} defaultProps
 * @property {PlaygroundControl[]} controls
 * @property {import('vue').Component} component
 */

/** @type {ComponentDefinition[]} */
export const componentRegistry = [
  {
    slug: 'deeplink-experience',
    nameKey: 'catalog.deeplink.name',
    summaryKey: 'catalog.deeplink.summary',
    descriptionKey: 'catalog.deeplink.description',
    propsKey: 'catalog.deeplink.props',
    notesKeys: {
      desktop: 'catalog.deeplink.notes.desktop',
      mobile: 'catalog.deeplink.notes.mobile',
    },
    component: markRaw(DeeplinkExperience),
    defaultProps: {
      appName: 'KakaoTalk',
      deeplinkUrl: 'kakaotalk://qr',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/3/3d/KakaoTalk_logo.svg',
      timeout: 1.5,
    },
    controls: [
      {
        prop: 'appName',
        type: 'text',
        labelKey: 'controls.appName',
        helperKey: 'catalog.deeplink.props.appName',
      },
      {
        prop: 'deeplinkUrl',
        type: 'text',
        labelKey: 'controls.deeplinkUrl',
        helperKey: 'catalog.deeplink.props.deeplinkUrl',
      },
      {
        prop: 'icon',
        type: 'text',
        labelKey: 'controls.icon',
        helperKey: 'catalog.deeplink.props.icon',
      },
      {
        prop: 'timeout',
        type: 'number',
        labelKey: 'controls.timeout',
        helperKey: 'catalog.deeplink.props.timeout',
        min: 0.5,
        max: 10,
        step: 0.5,
        componentProps: {
          mode: 'decimal',
          minFractionDigits: 1,
          maxFractionDigits: 1,
        },
      },
    ],
  },
];

export function findComponentBySlug(slug) {
  return componentRegistry.find((item) => item.slug === slug);
}
