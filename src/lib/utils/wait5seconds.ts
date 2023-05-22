export function waitForFiveSeconds() {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, 5000);
  });
}
