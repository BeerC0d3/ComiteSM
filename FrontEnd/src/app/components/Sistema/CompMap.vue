<template>
  <!-- <q-btn class="show-steps-btn" color="black" text-color="white" label="Show journey" @click="getGeolocalitation" /> -->
  <div id="map"></div>
</template>
<script>
import { defineComponent, onMounted, onBeforeMount, watch, ref, watchEffect } from 'vue'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'



export default defineComponent({
  name: 'CompMap',
  props: {
    markers: {
      type: Array,
      required: false,
      default: () => []
    },
    isCurrentGeolocatation: {
      type: Boolean,
      required: false,
      default: true,
    }
  },
  setup(props) {

    let map = null;
    let marker, circle, zoomed;
    const data = ref([...props.markers]);
    const localMarkers = ref(props.markers)

    onBeforeMount(() => {
      console.log('onBeforeMount')
      if (map) {
        console.log('map.remove')
        map.remove();
      }
    })
    onMounted(() => {
      console.log('onMounted')
      createMapLayer()

    })

    const createMapLayer = () => {

      map = L.map('map').setView([18.9974329, -98.0624686], 5);
      L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map)

    };
    watch(
      () => props.markers,
      () => {
        localMarkers.value = props.markers
        setMarker();
      }
    );

    const setMarker = () => {
      props.markers.map((marker) => {
        return L.marker([marker.latitude, marker.longitude]).addTo(map)
          .bindPopup('marker.latitude=>' + marker.latitude + ' marker.latitude=> ' + marker.longitude);

      })

      map.setView([localMarkers.value[0].latitude, localMarkers.value[0].longitude], 16);
      localMarkers.value = [];
    }
    const setGeolocalitation = () => {

      if (marker) {
        map.removeLayer(marker);
        map.removeLayer(circle);
      }

      marker = L.marker([data.value[0].latitude, data.value[0].longitude]).addTo(map);
      circle = L.circle([data.value[0].latitude, data.value[0].longitude], { radius: data.value[0].accuracy }).addTo(map);

      if (!zoomed) {
        zoomed = map.fitBounds(circle.getBounds());
      }
      map.setView([data.value[0].latitude, data.value[0].longitude], 17);

      data.value = [];

    };

  }

});
</script>
<style>
#map {
  height: 40vh;
  /* min-height: 100%; */
  /* height: 45vw; */
  /* width: 100vw; */
}

/* #page-map .container-template {
  max-width: 100vw !important;
} */

.show-steps-btn {
  position: absolute;
  z-index: 1002;
  margin: 10px;
  left: 35px
}
</style>
