<script setup lang="ts">
import "leaflet/dist/leaflet.css";
import { ref } from "vue";
import { LMap, LTileLayer, LMarker, LPopup } from "@vue-leaflet/vue-leaflet";
import L from "leaflet";

// Fix Leaflet's default marker icon paths (for Vite/Webpack)
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

const zoom = ref(13);
const center = ref<[number, number]>([52.52, 13.405]); // Berlin

const map = ref<any>(null);
</script>

<template>
  <div class="h-full w-full rounded-xl overflow-hidden shadow-lg">
    <l-map ref="map" :zoom="zoom" :center="center">
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        name="OpenStreetMap"
      />

      <l-marker :lat-lng="center">
        <l-popup>Abdeen Law Firm — Berlin</l-popup>
      </l-marker>
    </l-map>
  </div>
</template>
