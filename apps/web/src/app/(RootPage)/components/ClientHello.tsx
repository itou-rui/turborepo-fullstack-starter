'use client';

import { useHelloQuery } from '@/store/services/api';

export const ClientHello = () => {
  const { data } = useHelloQuery();
  return <>{data?.message || 'No Result'}</>;
};
