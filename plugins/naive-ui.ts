import { setup } from '@css-render/vue3-ssr';
import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin(nuxtApp => {
  if (!process.server) {
    return;
  }

  const { collect } = setup(nuxtApp.vueApp);
  const originalRenderMeta = nuxtApp.ssrContext?.renderMeta;

  if (!nuxtApp.ssrContext) {
    return;
  }

  nuxtApp.ssrContext.renderMeta = () => {
    if (!originalRenderMeta) {
      return { headTags: collect() };
    }

    const originalMeta = originalRenderMeta();

    if (!Reflect.has(originalMeta, 'then')) {
      return {
        ...originalMeta,
        headTags: originalMeta.headTags + collect(),
      };
    }

    return originalMeta.then((resolvedOriginalMeta: any) => {
      return {
        ...resolvedOriginalMeta,
        headTags: resolvedOriginalMeta.headTags + collect(),
      };
    });
  };
});
