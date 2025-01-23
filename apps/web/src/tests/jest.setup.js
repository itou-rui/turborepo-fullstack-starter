/* eslint-disable no-undef */

import { render } from '@testing-library/react';
import { ReduxProvider, ThemeProvider } from '../components/Providers';

global.matchMedia =
	global.matchMedia ||
	function () {
		return {
			matches: false,
			addListener: function () {},
			removeListener: function () {},
		};
	};

const customRender = (ui, options) =>
	render(
		<ReduxProvider>
			<ThemeProvider>{ui}</ThemeProvider>
		</ReduxProvider>,
		options,
	);

export * from '@testing-library/react';
export * from '@testing-library/user-event';

export { customRender as render };
