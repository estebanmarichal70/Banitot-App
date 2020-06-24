<template>
  <vx-card class="font-bold text-center" title="Ubicación">
    
    <div class="mt-5">
      <gmap-map :center="center" :zoom="16" style="width: 100%; height: 500px">
        <gmap-info-window
          :options="infoOptions"
          :position="infoWindowPos"
          :opened="infoWinOpen"
          @closeclick="infoWinOpen = false"
        >
          {{ infoContent }}
        </gmap-info-window>
        <gmap-marker
          :key="i"
          v-for="(m, i) in markers"
          :position="m.position"
          :clickable="true"
          @click="toggleInfoWindow(m, i)"
        ></gmap-marker>
      </gmap-map>
    </div>
  </vx-card>
</template>

<script>
export default {
  data() {
    return {
      center: { lat: -34.9099, lng: -54.955 },
      infoContent: "",
      infoWindowPos: null,
      infoWinOpen: false,
      currentMidx: null,
      //optional: offset infowindow so it visually sits nicely on top of our marker
      infoOptions: {
        pixelOffset: { width: 0, height: -35 }
      },
      markers: [
        { position: { lat: -34.9083, lng: -54.9588832 }, infoText: "BaniTot" }
      ]
    };
  },
  methods: {
    toggleInfoWindow(marker, idx) {
      this.infoWindowPos = marker.position;
      this.infoContent = marker.infoText;

      if (this.currentMidx === idx) {
        //check if its the same marker that was selected if yes toggle
        this.infoWinOpen = !this.infoWinOpen;
      } else {
        //if different marker set infowindow to open and reset current marker index
        this.infoWinOpen = true;
        this.currentMidx = idx;
      }
    }
  }
};
</script>
