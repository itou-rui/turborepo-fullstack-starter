'use client';

import { Provider, type ProviderProps } from 'react-redux';
import store from '@/store';

export const ReduxProvider = (props: ProviderProps) => {
	return <Provider store={store}>{props.children}</Provider>;
};
