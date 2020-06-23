<template>
  <div>
      <!-- CARD 1: CONGRATS -->
      <div >
        <carousel :per-page="1" :autoplayTimeout="3000" loop :paginationEnabled="false" centerMode autoplay :mouse-drag="true">
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

    <!-- Related Products -->
    <div class="related-products text-center px-6" id="item-slider">
      <div class="related-headings mb-8 text-center">
        <h2 class="uppercase">Nuestros productos</h2>
        <p>Las personas tambien buscan por estos artículos</p>
      </div>
      <swiper  :options="swiperOption" :dir="$vs.rtl ? 'rtl' : 'ltr'" :key="$vs.rtl" class="related-product-swiper px-12 py-6">
        <swiper-slide v-for="item in related_items" :key="item.id" class="p-6 rounded cursor-pointer">
          <div @click="handleArticulo(item.id)">
            <!-- Item Heading -->
            <div class="item-heading mb-4">
              <p class="text-lg font-semibold truncate">{{ item.nombre }}</p>
              <p class="text-sm">
                <span class="mr-2">de</span>
                <span>{{ item.marca }}</span>
              </p>
            </div>

            <!-- Item Image -->
            <img class="responsive imagen" :src="item.imagen" :alt="item.nombre">
            

            <!-- Item Meta -->
            <div class="item-meta">
              <star-rating :show-rating="false" :rating="item.rating" :star-size="14" class="justify-center" read-only />
              <p class="text-lg font-medium text-primary">US$ {{ item.precio }}</p>
            </div>
          </div>
        </swiper-slide>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </swiper>
    </div>

  </div>
</template>

<script>

  import {Carousel, Slide} from 'vue-carousel';
  import 'swiper/dist/css/swiper.min.css'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import StarRating from 'vue-star-rating'
  import http from '@/http/banitotServices';

  export default {

    components: {
      swiper,
      swiperSlide,
      StarRating,
      Carousel,
      Slide
    },
    created () {
      http.services.getAllArticulos(1, "", "", "", "", "", "GPU")
      .then(res => {
        res.data.articulos.data.forEach(item => {
          const feed = item.feedbacks
          let rating = 0
            feed.forEach(feed => {
              rating += feed.rating
            })
          if(feed.length)
            rating /= feed.length
          else
            rating = 0;
          item['rating'] = rating
          this.related_items.push(item)
        })
      })
      .catch(error => {
        console.log(error)
      })
    },
    data () {
      return {
        swiperOption: {
          slidesPerView: 5,
          spaceBetween: 55,
          breakpoints: {
            1600: {
              slidesPerView: 4,
              spaceBetween: 55
            },
            1300: {
              slidesPerView: 3,
              spaceBetween: 55
            },
            900: {
              slidesPerView: 2,
              spaceBetween: 55
            },
            640: {
              slidesPerView: 1,
              spaceBetween: 55
            }
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }
        },
        related_items: []
      }
    },
    methods: {
       handleArticulo(itemId){
        this.$router.push({name: 'ecommerce-item-detail-view', params: {item_id: itemId }})
        .catch(() => {})
      }
    }
}

</script>

<style lang="scss">

@import "@/assets/scss/vuexy/_variables.scss";

#item-slider{
  .related-product-swiper {
    .swiper-wrapper {
      padding-bottom: 2rem;

      .imagen{
        display:unset;
        height: 112px;
        width: auto;
      }

      > .swiper-slide {
        background-color: #ffffff;
        box-shadow: 0 4px 18px 0 rgba(0,0,0,0.1), 0 5px 12px 0 rgba(0,0,0,0.08) !important;

        .theme-dark & {
          background-color: $theme-light-dark-bg;
        }
      }
    }

    .swiper-button-next,
    .swiper-button-prev {
      transform: scale(.5);
      filter: hue-rotate(40deg);
    }

    .swiper-button-next {
      right: 0
    }

    .swiper-button-prev {
      left: 0;
    }
  }
}
</style>