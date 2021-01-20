/* eslint @typescript-eslint/no-var-requires: "off",  react/display-name: "off", @typescript-eslint/explicit-module-boundary-types: "off" */
const merge = require("lodash.merge");

/**
 * External dependencies
 */
import { createStore, Provider } from "@frontity/connect";
import React from "react";

/**
 * Internal dependencies
 */
import settings from "./sample-data/frontity.settings";

// export const withFrontityStore = (StoryFn: Function) => (
//   <div id="frontity">
//     <StoryFn />
//   </div>
// );

export function withFrontityStore(stateOverrides = {}, defaultOverrides = {}) {
  // Deep merge instead of using spread operator (...) - as {state.theme} was getting overwritten.
  const state = {
    ...settings,
    ...{
      router: {
        link: "/",
      },
    },
  };
  merge(state, stateOverrides);

  // Default actions taken from node_modules/@frontity/router/__tests__/index.test.ts
  const defaultActions = {
    router: {
      /*eslint no-unused-vars: ["error", { "args": "none" }]*/
      set: () => {
        console.log("Link Clicked");
      },
    },
    theme: {
      toggleMobileMenu: () => {
        console.log("toggleMobileMenu Action");
      },
    },
    ...defaultOverrides,
  };

  // We need to expose a store in order for frontity components to work:
  // Mock store technique taken from frontity test suite: https://github.com/frontity/frontity/blob/83c5eadb4dffc6275fe4d93b8d379c21449a2727/packages/connect/src/__tests__/connect.tests.jsx#L11
  const store = createStore({
    state: state,
    actions: defaultActions,
  });

  return function (renderedComponent) {
    return <Provider value={store}>{renderedComponent}</Provider>;
  };
}
