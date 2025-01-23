import { type MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Web app',
    short_name: 'App',
    description: 'Exsample web app',
    start_url: '/',
    display: 'standalone',
    icons: [
      {
        src: '/favicon.ico',
        sizes: '64x64',
        type: 'image/ico',
      },
    ],
  };
}
