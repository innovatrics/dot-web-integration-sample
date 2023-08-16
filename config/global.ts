global.URL.createObjectURL = vi.fn();
global.URL.revokeObjectURL = vi.fn();
global.window.Countly = { q: [], init: () => {} };
global.window.fetch = vi.fn();
global.window.scrollTo = () => {};
