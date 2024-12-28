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
          'script-src': ["'self'", 'unsafe-inline', 'https://*.basemaps.cartocdn.com'],
          'img-src': [
            "'self'",
            'data:',
            'blob:',
            'market-assets.strapi.io',
            getOrigin(env('OCI_ENDPOINT')),
            getOrigin(env('CF_PUBLIC_ACCESS_URL')),
            'https://*.basemaps.cartocdn.com',
            'market-assets.strapi.io',
            'https://*.tile.openstreetmap.org',
            'https://unpkg.com/leaflet@1.9.4/dist/images/',
            'https://mt0.google.com',
          ],
          'media-src': [
            "'self'",
            'data:',
            'blob:',
            'market-assets.strapi.io',
            getOrigin(env('OCI_ENDPOINT')),
            getOrigin(env('CF_PUBLIC_ACCESS_URL')),
            'https://*.basemaps.cartocdn.com',
            'https://tile.openstreetmap.org',
            'https://*.tile.openstreetmap.org',
          ],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
];

