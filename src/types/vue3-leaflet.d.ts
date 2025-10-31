// Minimal declaration to avoid TypeScript "could not find declaration file" for vue3-leaflet
declare module "vue3-leaflet" {
  import { Component } from "vue";
  export const LMap: Component;
  export const LTileLayer: Component;
  export const LMarker: Component;
  const _default: {
    LMap: Component;
    LTileLayer: Component;
    LMarker: Component;
  };
  export default _default;
}
