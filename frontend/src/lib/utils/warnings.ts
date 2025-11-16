export function ignoreFocusVisibleWarning() {
  const originalWarn = console.warn;

  console.warn = (...args) => {
    const msg = args[0];

    if (
      typeof msg === "string" &&
      msg.includes("The `:focus-visible` pseudo class is not supported")
    ) {
      return;
    }

    originalWarn(...args);
  };
}
