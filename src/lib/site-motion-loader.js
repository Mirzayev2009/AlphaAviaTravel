let controller;
const staticController = { default: () => null };

// Startup and Layout share one deferred request; a failed enhancement cannot block the page.
export function loadSiteMotion() {
  controller ||= new Promise((resolve) => {
    const deadline = setTimeout(() => resolve(staticController), 5000);
    import("../components/SiteMotion.jsx").then((module) => {
      clearTimeout(deadline);
      resolve(module);
    }, () => {
      clearTimeout(deadline);
      resolve(staticController);
    });
  });
  return controller;
}
