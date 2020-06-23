<template>
  <vx-card title="Basic" code-toggler>

    <p>Creating basic google map</p>

    <div class="mt-5">
      <g-map-map
        :center="center"
        :zoom="7"
        map-type-id="terrain"
        style="width: 100%; height: 400px">
        <g-map-marker
          :key="index"
          v-for="(m, index) in markers"
          :position="m.position"
          :clickable="true"
          :draggable="true"
          @click="center=m.position"
        />
      </g-map-map>
    </div>
  </vx-card>
</template>

<script>

  import {Map, Marker} from "vue2-google-maps";

  export default {
    data() {
      return {
        center: {lat: 10.0, lng: 10.0},
        markers: [
          {position: {lat: 10.0, lng: 10.0}},
          {position: {lat: 11.0, lng: 11.0}}
        ]
      }
    },
    components: {
      'g-map-map': Map,
      'g-map-marker': Marker
    }
  }
</script>
