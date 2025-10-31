/* Minimal TypeScript shim for leaflet when @types/leaflet isn't installed.
   This prevents TS errors in the project. If you prefer, install
   `npm i -D @types/leaflet` and remove this file. */
declare module "leaflet" {
  const L: any;
  export default L;
  export const Icon: any;
  export const icon: any;
}
