import type { BlurhashConfig } from '@aguzztn54/strapi-blurhash-plugin/dist/server/types';

interface PluginConfig extends BlurhashConfig {
  [key: string]: any;
}
export default ({ env }): PluginConfig => ({
  upload: {
    config: {
      provider: 'aws-s3',
      providerOptions: {
        s3Options: {
          credentials: {
            accessKeyId: env('OCI_ACCESS_KEY_ID'),
            secretAccessKey: env('OCI_ACCESS_SECRET'),
          },
          region: env('OCI_REGION'),
          endpoint: env('OCI_ENDPOINT'),
          forcePathStyle: true,
          signatureVersion: 'v4',
          params: {
            ACL: env('OCI_VISIBILITY', 'public-read'), // <== set ACL to private
            signedUrlExpires: env('OCI_SIGNED_URL_EXPIRES', 15 * 60),
            Bucket: env('OCI_BUCKET'),
          },
        },
      },
      actionOptions: {
        upload: {},
        uploadStream: {},
        delete: {},
      },
    },
  },
  blurhash: {
    enabled: true,
    config: {
      regenerateOnUpdate: true,
      forceRegenerateOnUpdate: false,
    },
  },
  // ...
});
