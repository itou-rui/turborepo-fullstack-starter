import { type ReactNode } from 'react';

type Singleparam = { slug: string };

type DinamicParams = { [key: string]: string };

type Params = Promise<Singleparam | DinamicParams | string[] | undefined>;

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export type PageProps = {
  params: Params;
  searchParams: SearchParams;
};

export type LayoutProps = {
  params: Params;
  children: ReactNode;
};
