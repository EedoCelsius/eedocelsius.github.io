const messages = {
  app: {
    title: 'Experience Design Library',
    description:
      'Reusable customer experience components designed for seamless deep link and channel journeys.',
  },
  navigation: {
    home: 'Home',
    components: 'Components',
    language: 'Language',
    switchToDark: 'Switch to dark mode',
    switchToLight: 'Switch to light mode',
  },
  home: {
    heroTitle: 'Design delightful deep link experiences',
    heroSubtitle:
      'Use the interactive playground to validate behaviours, copy UI text, and share specifications with your team.',
    exploreButton: 'Explore components',
    previewSectionTitle: 'Component previews',
    previewSectionSubtitle: 'Start from curated defaults and adjust props to match your product branding.',
  },
  componentsPage: {
    title: 'Component library',
    subtitle: 'Choose a component to open the interactive playground.',
  },
  component: {
    tagsLabel: 'Tags',
    goBack: 'Back to components',
    previewTitle: 'Live preview',
    playgroundTitle: 'Interactive playground',
    reset: 'Reset to defaults',
  },
  components: {
    deeplinkExperience: {
      name: 'Deep link experience',
      shortDescription:
        'Guides users from a web touch point to your mobile app with graceful fallbacks for every device.',
      description:
        'Test how the deep link behaves on different devices. Provide copy guidelines and fallbacks to your product teams.',
      tags: ['mobile', 'qr code', 'activation'],
      desktopDialogTitle: 'Available on mobile only',
      desktopDialogDescription:
        'The {appName} link opens only on mobile devices. Scan the QR code to continue on your phone.',
      desktopDialogHint: 'Scan to open {appName}.',
      desktopDialogAction: 'Understood',
      mobileLoadingTitle: 'Opening {appName}...',
      mobileLoadingDescription: 'Give us a moment while we try to launch the app.',
      mobileInstallTitle: 'Unable to launch {appName}',
      mobileInstallDescription:
        'It looks like the app did not open automatically. Install the app and try again from your mobile device.',
      mobileInstallAction: 'Close',
      playground: {
        title: 'Tune the experience',
        description: 'Update the props to match your brand and interaction timing.',
        controls: {
          appName: {
            label: 'Application name',
            helper: 'Displayed in copy and fallback messaging.',
          },
          deeplinkUrl: {
            label: 'Deep link URL',
            helper: 'Native URL scheme or universal link to launch the mobile app.',
          },
          icon: {
            label: 'Icon URL',
            helper: 'Displayed inside the QR code. Use a transparent PNG for best results.',
          },
          timeout: {
            label: 'Timeout (seconds)',
            helper: 'After this time, show the installation fallback on mobile.',
          },
        },
        trigger: 'Trigger deep link',
      },
    },
  },
  messages: {
    notFoundTitle: 'Page not found',
    notFoundDescription: 'The page you are looking for could not be found. Go back to the component gallery.',
    goHome: 'Go home',
  },
}

export default messages
