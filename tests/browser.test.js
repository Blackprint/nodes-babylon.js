/**
 * @jest-environment jsdom
 */

// === For Browser Environment ===
window.ResizeObserver = class{};

// This will automatically load ScarletsFrame + Engine + Sketch
require("@blackprint/sketch");

// Disable loader for browser, because we're testing with Node.js
sf.loader.turnedOff = true;
sf.loader.task = false;

test('Blackprint.Sketch does exist on window', () => {
  expect(window.Blackprint.Sketch).toBeDefined();
});