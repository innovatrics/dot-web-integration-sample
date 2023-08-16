/*
This setup is for mocking canvas for vitest while canvas package is not working with vitest yet
https://github.com/hustcc/jest-canvas-mock/issues/88
*/
// @ts-ignore mocks
// @ts-nocheck mocks

/* eslint-disable no-restricted-globals */
import { afterAll, vi } from 'vitest';

global.jest = vi;

declare global {
  // eslint-disable-next-line no-var, vars-on-top
  var jest: typeof vi | undefined;
}

const apis = [
  'Path2D',
  'CanvasGradient',
  'CanvasPattern',
  'CanvasRenderingContext2D',
  'DOMMatrix',
  'ImageData',
  'TextMetrics',
  'ImageBitmap',
  'createImageBitmap',
] as const;

async function importMockWindow() {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error: Missing files
  // eslint-disable-next-line import/extensions
  const getCanvasWindow = await import('jest-canvas-mock/lib/window.js').then(
    (res) => res.default?.default || res.default || res,
  );

  const canvasWindow = getCanvasWindow({ document: window.document });

  apis.forEach((api) => {
    global[api] = canvasWindow[api];
    global.window[api] = canvasWindow[api];
  });
}

importMockWindow();

afterAll(() => {
  delete global.jest;
  delete global.window.jest;
});
