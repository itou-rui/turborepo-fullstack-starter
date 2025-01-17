/* eslint-disable no-undef, @typescript-eslint/no-empty-function */

import { render } from '@testing-library/react';
import * as ResizeObserverModule from 'resize-observer-polyfill';
import { ReduxProvider } from '../components/Providers/ReduxProvider';

import '@testing-library/jest-dom/extend-expect';

/* Resize */
global.ResizeObserver = ResizeObserverModule.default;

/* MatchMadia */
window.matchMedia = jest.fn().mockImplementation((query) => {
	return {
		matches: false,
		media: query,
		onchange: null,
		addListener: jest.fn(),
		removeListener: jest.fn(),
		addEventListener: jest.fn(),
		removeEventListener: jest.fn(),
		dispatchEvent: jest.fn(),
	};
});

/* Intersection */
global.IntersectionObserver = class IntersectionObserver {
	constructor(callback, options = {}) {
		this.callback = callback;
		this.options = options;
	}
	observe(target) {
		this.callback([{ isIntersecting: true, target }]);
	}
	unobserve() {}
	disconnect() {}
};

const customRender = (ui, options) => render(<ReduxProvider>{ui}</ReduxProvider>, options);

export * from '@testing-library/react';

export { customRender as render };
