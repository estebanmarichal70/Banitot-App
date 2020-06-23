<template>
  <div id="extra-component-google-map-demo">
    <vx-card>
      <div class="text-center">
        <h6 class="font-bold mt-1 mb-1">
          Florida 2378 esquina 18 de Julio
          <br />
          <br />
          <span class="cursor-pointer iconoF">4223 6595</span> -
          <span class="cursor-pointer iconoF">+598 99887766</span>
          <br />
          <br />
          Lunes a Viernes 9:30 a 13 y 14 a 19 hrs. Sábados 9 a 13hrs.
        </h6>
        <div class="mt-5">
            <feather-icon
              icon="FacebookIcon"
              class="p-2 ml-4 iconoF shadow-drop rounded-lg cursor-pointer hidden sm:inline-flex"
            />
          </router-link>
          
          <feather-icon
            icon="YoutubeIcon"
            class="p-2 ml-4 iconoY shadow-drop rounded-lg cursor-pointer hidden sm:inline-flex"
          />
          <feather-icon
            icon="TwitterIcon"
            class="p-2 ml-4 iconoT shadow-drop rounded-lg cursor-pointer hidden sm:inline-flex"
          />
          <feather-icon
            icon="MailIcon"
            class="p-2 ml-4 iconoM shadow-drop rounded-lg cursor-pointer hidden sm:inline-flex"
          />
        </div>
      </div>
    </vx-card>
    <google-map-info-window></google-map-info-window>

    <div class="content-area__content"></div>
  </div>
</template>

<script>
import GoogleMapInfoWindow from "./GoogleMapInfoWindow.vue";
export default {
  components: {
    GoogleMapInfoWindow
  }
};
</script>

<style lang="scss">
.iconoF {
  &:hover {
    color: #3b5998;
  }
}
.iconoT {
  &:hover {
    color: #00acee;
  }
}
.iconoY {
  &:hover {
    color: #c4302b;
  }
}
.iconoM {
  &:hover {
    color: #990803;
  }
}
</style>
