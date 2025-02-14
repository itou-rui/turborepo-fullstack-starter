/* eslint-disable no-undef */
import React from 'react';
import 'whatwg-fetch';
import '@testing-library/jest-dom';
import { render, act } from '@testing-library/react';
import { ReduxProvider, ThemeProvider } from '../components/Providers';

// Setup for React 18's concurrent features
globalThis.IS_REACT_ACT_ENVIRONMENT = true;
global.React = React;

// Setup for matchMedia
window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
      addEventListener: function () {},
      removeEventListener: function () {},
      dispatchEvent: function () {
        return true;
      },
    };
  };

// Custom render with providers that returns the rendered UI plus additional helper methods
const customRender = (ui, options = {}) => {
  const Wrapper = ({ children }) => (
    <ReduxProvider>
      <ThemeProvider defaultTheme='light' enableSystem={false}>
        {children}
      </ThemeProvider>
    </ReduxProvider>
  );

  return {
    ...render(ui, {
      wrapper: Wrapper,
      ...options,
    }),
  };
};

// Setup cleanup after each test
afterEach(() => {
  // Clean up any mounted components
  act(() => {
    // Cleanup any pending effects
  });
});

// Re-export everything
export * from '@testing-library/react';
export * from '@testing-library/user-event';

// Override render method
export { customRender as render };
