<template>
  <div>
    <div class="vx-row">

      <!-- CARD 1: CONGRATS -->
      <div class="vx-col w-full mb-base">
        <carousel :per-page="1" autoplayTimeout="3000" loop :paginationEnabled="false" centerMode autoplay :mouse-drag="true">
          <slide>
            <img src="@/assets/images/carousel/1.jpg" alt="Imagen carousel" width="100%">
          </slide>
          <slide>
            <img src="@/assets/images/carousel/2.jpg" alt="Imagen carousel" width="100%">
          </slide>
          <slide>
            <img src="@/assets/images/carousel/3.jpg" alt="Imagen carousel" width="100%">
          </slide>
          <slide>
            <img src="@/assets/images/carousel/4.jpg" alt="Imagen carousel" width="100%">
          </slide>
          <slide>
            <img src="@/assets/images/carousel/5.jpg" alt="Imagen carousel" width="100%">
          </slide>
          <slide>
            <img src="@/assets/images/carousel/6.jpg" alt="Imagen carousel" width="100%">
          </slide>
          <slide>
            <img src="@/assets/images/carousel/7.jpg" alt="Imagen carousel" width="100%">
          </slide>
          <slide>
            <img src="@/assets/images/carousel/8.jpg" alt="Imagen carousel" width="100%">
          </slide>
          <slide>
            <img src="@/assets/images/carousel/9.jpg" alt="Imagen carousel" width="100%">
          </slide>
          <slide>
            <img src="@/assets/images/carousel/10.jpg" alt="Imagen carousel" width="100%">
          </slide>

        </carousel>
      </div>

    </div>

    <div class="vx-row">
      <div class="vx-col w-full mb-base">

      </div>
    </div>
  </div>
</template>

<script>

  import {Carousel, Slide} from 'vue-carousel';

  export default {

    components: {
      Carousel,
      Slide
    }

  };

</script>
