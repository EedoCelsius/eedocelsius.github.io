import QrCodeCard from '../components/lab/QrCodeCard.vue';
import BlurOverlay from '../components/lab/BlurOverlay.vue';
import LoadingOverlay from '../components/lab/LoadingOverlay.vue';

export const labComponents = [
  {
    id: 'qr-card',
    i18nKey: 'lab.components.qrCard',
    component: QrCodeCard,
    defaultProps: {
      content: 'https://component.lab',
      lightColor: '#ffffff',
      darkColor: '#1f2937',
      icon: ''
    },
    controls: [
      {
        type: 'textarea',
        prop: 'content',
        labelKey: 'lab.components.qrCard.props.content',
        placeholder: 'https://component.lab'
      },
      {
        type: 'color',
        prop: 'lightColor',
        labelKey: 'lab.components.qrCard.props.lightColor'
      },
      {
        type: 'color',
        prop: 'darkColor',
        labelKey: 'lab.components.qrCard.props.darkColor'
      },
      {
        type: 'text',
        prop: 'icon',
        labelKey: 'lab.components.qrCard.props.icon',
        placeholder: 'https://example.com/icon.png'
      }
    ]
  },
  {
    id: 'blur-overlay',
    i18nKey: 'lab.components.blurOverlay',
    component: BlurOverlay,
    defaultProps: {
      blur: 12
    },
    controls: [
      {
        type: 'range',
        prop: 'blur',
        labelKey: 'lab.components.blurOverlay.props.blur',
        min: 0,
        max: 40,
        step: 1
      }
    ]
  },
  {
    id: 'loading-overlay',
    i18nKey: 'lab.components.loadingOverlay',
    component: LoadingOverlay,
    defaultProps: {
      blur: 18,
      description: ''
    },
    controls: [
      {
        type: 'range',
        prop: 'blur',
        labelKey: 'lab.components.loadingOverlay.props.blur',
        min: 0,
        max: 40,
        step: 1
      },
      {
        type: 'text',
        prop: 'description',
        labelKey: 'lab.components.loadingOverlay.props.description',
        placeholder: 'Loading your dashboard...'
      }
    ]
  }
];

export const getComponentById = id => labComponents.find(component => component.id === id);
