'use client';

import { useHelloQuery } from '@/store';

export const ClientHello = () => {
  const { data } = useHelloQuery();
  return <>{data?.message || 'No Result'}</>;
};
