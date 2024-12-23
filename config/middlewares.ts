const getOrigin = (url: string = ''): string => {
  if (!url) return '';
  return url.replace(/^https?:\/\//, '');
};

export default ({ env }) => [
  'strapi::logger',
  'strapi::errors',
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': [
            "'self'",
            'data:',
            'blob:',
            'market-assets.strapi.io',
            getOrigin(env('OCI_ENDPOINT')),
            getOrigin(env('CF_PUBLIC_ACCESS_URL')),
          ],
          'media-src': [
            "'self'",
            'data:',
            'blob:',
            'market-assets.strapi.io',
            getOrigin(env('OCI_ENDPOINT')),
            getOrigin(env('CF_PUBLIC_ACCESS_URL')),
          ],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
];

