<script setup lang="ts">
import "leaflet/dist/leaflet.css";
import { ref, computed, onMounted, watch } from "vue";
import { LMap, LTileLayer, LMarker, LPopup } from "@vue-leaflet/vue-leaflet";
import L from "leaflet";

// Fix Leaflet's default marker icon paths (for Vite/Webpack)
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

import { useSettings } from "../composables/useSettings";

L.Icon.Default.mergeOptions({
  iconUrl,
  iconRetinaUrl,
  shadowUrl,
});

const { settings, fetchSettings } = useSettings();

const zoom = ref(13);

// start with some safe default (can be anything valid)
const center = ref<[number, number]>([0, 0]);

// only render the map when we have valid numbers
const hasValidCenter = computed(
  () => !Number.isNaN(center.value[0]) && !Number.isNaN(center.value[1])
);

// load settings (cached in composable)
onMounted(() => {
  fetchSettings();
});

// when settings change, update the map center
watch(
  settings,
  (val) => {
    if (!val) return;
    const lat = Number(val.latitude);
    const lng = Number(val.longitude);
    if (!Number.isNaN(lat) && !Number.isNaN(lng)) {
      center.value = [lat, lng];
    }
  },
  { immediate: true }
);

const map = ref<any>(null);
</script>

<template>
  <div class="h-full w-full rounded-xl overflow-hidden shadow-lg">
    <l-map v-if="hasValidCenter" ref="map" :zoom="zoom" :center="center">
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        name="OpenStreetMap"
      />

      <l-marker :lat-lng="center">
        <l-popup>Abdeen Law Firm</l-popup>
      </l-marker>
    </l-map>
  </div>
</template>
