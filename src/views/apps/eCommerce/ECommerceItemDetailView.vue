
<template>
  <div id="item-detail-page">

    <vs-alert color="danger" title="Error al cargar el artículo" :active.sync="error_occured">
      <span>{{ error_msg }}. </span>
      <span>
        <span>Ver </span><router-link :to="{name:'ecommerce-shop'}" class="text-inherit underline">todos los articúlos</router-link>
      </span>
    </vs-alert>

    <vx-card v-if="item_data" :key="item_data.id">


      <template slot="no-body">

        <div class="item-content">

          <!-- Item Main Info -->
          <div class="product-details p-6">
            <div class="vx-row mt-6">
              <div class="vx-col md:w-2/5 w-full flex items-center justify-center">
                <div class="product-img-container w-3/5 mx-auto mb-10 md:mb-0">
                  <img :src="item_data.imagen" :alt="item_data.nombre" class="responsive">

                  <!--
                    UnComment Below line for true flow
                    <img :src="item_data.image" :alt="item_data.name" class="responsive">

                    Remove above img tag which is for demo purpose in actual flow
                  -->
                </div>
              </div>

              <!-- Item Content -->
              <div class="vx-col md:w-3/5 w-full">

                <h3>{{ item_data.nombre }}</h3>

                <p class="my-2">
                  <span class="mr-2">de</span>
                  <span>{{ item_data.marca }}</span>
                </p>
                <p class="flex items-center flex-wrap">
                  <span class="text-2xl leading-none font-medium text-primary mr-4 mt-2">${{ item_data.precio }}</span>
                  <span class="pl-4 mr-2 mt-2 border border-solid d-theme-border-grey-light border-t-0 border-b-0 border-r-0"><star-rating :show-rating="false" :rating="item_data.rating" :star-size="20" read-only /></span>
                  <span class="cursor-pointer leading-none mt-2">{{item_data.count}}</span>
                </p>

                <vs-divider />

                <p>{{ item_data.descripcion }}</p>

                <vs-list class="product-sales-meta-list px-0 pt-4">
                  <vs-list-item
                    class="p-0 border-none"
                    title="Envío gratis"
                    icon-pack="feather"
                    icon="icon-truck" />
                  <vs-list-item class="p-0 border-none" title="Impuestos incluidos" icon-pack="feather" icon="icon-dollar-sign"></vs-list-item>
                </vs-list>

                <vs-divider />

                <!-- Quantity -->
                <div class="vx-row">

                  <div class="vx-col w-full">
                    <strong><p class="my-2">
                      <span>Stock</span>
                      <span class="mx-2">-</span>
                      <span class="text-success" v-if="item_data.stock">Disponible</span>
                      <span class="text-danger" v-else>No disponible</span>
                    </p></strong>
                  </div>

                  <div class="vx-col w-full">
                    <div class="flex flex-wrap items-start mb-4">

                      <!-- Add To Cart Button -->
                      <vs-button
                        class="mr-4 mb-4"
                        icon-pack="feather"
                        icon="icon-shopping-cart"
                        v-if="!isInCart(item_data.id)"
                        @click="toggleItemInCart(item_data)"
                        :disabled="item_data.stock ? false : true">
                        Agregar al carrito
                      </vs-button>

                      <vs-button
                        v-else
                        class="mr-4 mb-4"
                        icon-pack="feather"
                        icon="icon-shopping-cart"
                        @click="$router.push({name: 'ecommerce-checkout'}).catch(err => {})"
                        :disabled="item_data.stock ? false : true">
                        Ver en el carrito
                      </vs-button>
                      <!-- /Add To Cart Button -->

                      <!-- Wishlist Button -->
                      <vs-button
                        v-if="isInWishList(item_data.id)"
                        key="filled"
                        class="mb-4"
                        icon-pack="feather"
                        icon="icon-heart"
                        color="danger"
                        @click="toggleItemInWishList(item_data)">
                        Deseado
                      </vs-button>

                      <vs-button
                        v-else
                        key="border"
                        class="mb-4"
                        type="border"
                        icon-pack="feather"
                        icon="icon-heart"
                        color="danger"
                        @click="toggleItemInWishList(item_data)">
                        Deseado
                      </vs-button>
                      <!-- /Wishlist Button -->

                    </div>
                  </div>
                </div>
                <!-- /Quantity -->

              </div>

            </div>
          </div>

          <!-- Product Feature/Meta Row -->
          <div class="py-24 mb-16 mt-10 text-center item-features">
            <div class="vx-row">
              <div class="vx-col md:w-1/3 w-full">
                <div class="w-64 mx-auto mb-16 md:mb-0">
                  <feather-icon icon="AwardIcon" svgClasses="h-12 w-12 text-primary stroke-current" class="block mb-4" />
                  <span class="font-semibold text-lg">100% Original</span>
                  <p class="mt-2">Nuestros productos son 100% originales.</p>
                </div>
              </div>
              <div class="vx-col md:w-1/3 w-full">
                <div class="w-64 mx-auto mb-16 md:mb-0">
                  <feather-icon icon="ClockIcon" svgClasses="h-12 w-12 text-primary stroke-current" class="block mb-4" />
                  <span class="font-semibold text-lg">10 Dias para devolución</span>
                  <p class="mt-2">Si no te gustó el producto o presenta fallas, podés cambiarlo en los primeros  diez días después de la compra.</p>
                </div>
              </div>
              <div class="vx-col md:w-1/3 w-full">
                <div class="w-64 mx-auto">
                  <feather-icon icon="ShieldIcon" svgClasses="h-12 w-12 text-primary stroke-current" class="block mb-4" />
                  <span class="font-semibold text-lg">1 Año de garantía</span>
                  <p class="mt-2">Todos nuestros productos cuentan con garantía de un año.</p>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Related Products -->
          <div class="related-products text-center px-6">

            <div class="related-headings mb-8 text-center">
              <h2 class="uppercase">Más productos</h2>
              <p>Las personas tambien buscan por estos artículos</p>
            </div>
            <swiper :options="swiperOption" :dir="$vs.rtl ? 'rtl' : 'ltr'" :key="$vs.rtl" class="related-product-swiper px-12 py-6">
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
                  <div class="img-container w-32 mx-auto my-base">
                    <img class="responsive" :src="item.imagen" :alt="item.nombre">
                  </div>

                  <!-- Item Meta -->
                  <div class="item-meta">
                    <star-rating :show-rating="false" :rating="item.rating" :star-size="14" class="justify-center" read-only />
                    <p class="text-lg font-medium text-primary">${{ item.precio }}</p>
                  </div>
                </div>
              </swiper-slide>
              <div class="swiper-button-prev" slot="button-prev"></div>
              <div class="swiper-button-next" slot="button-next"></div>
            </swiper>
          </div>
        </div>
      </template>
    </vx-card>
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.min.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import http from '@/http/banitotServices';
import algoliasearch from 'algoliasearch/lite'
import StarRating from 'vue-star-rating'

export default{
  components: {
    swiper,
    swiperSlide,
    StarRating
  },
  data () {
    return {
      algolia_index: algoliasearch(
        'latency',
        '6be0576ff61c053d5f9a3225e2a90f76'
      ).initIndex('instant_search'),
      item_data: null,
      error_occured: false,
      error_msg: '',
      is_hearted: false,
      productos: null,

      // Related Products Swiper
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
  created () {
    this.$vs.loading()
    this.fetch_item_details(this.$route.params.item_id)
  },
  computed: {
    isInWishList () {
      return (itemId) => this.$store.getters['eCommerce/isInWishList'](itemId)
    },
    isInCart () {
      return (itemId) => this.$store.getters['eCommerce/isInCart'](itemId)
    }
  },
  watch: {
    "$route.params" (){
      this.$vs.loading()
      this.related_items = []
      this.fetch_item_details(this.$route.params.item_id)
    }
  },
  methods: {
    handleArticulo(itemId){
        this.$router.push({name: 'ecommerce-item-detail-view', params: {item_id: itemId }})
        .catch(() => {})
    },
    toggleItemInWishList (item) {
      item['wishlist_id'] = this.$store.state.AppActiveUser.wishlist[0].id;
      this.$store.dispatch('eCommerce/toggleItemInWishList', item)
    },
    toggleItemInCart (item) {
      item['carrito_id'] = this.$store.state.AppActiveUser.carrito[0].id;
      this.$store.dispatch('eCommerce/toggleItemInCart', item)
    },
    async fetch_item_details (id) {
       await http.services.getArticuloById(id)
      .then(async res => {
        this.item_data = res.data
        http.services.countRating(this.item_data.id)
        .then(res => {
          this.item_data['count'] = res.data
          const feed = this.item_data.feedbacks
          let rating = 0
            feed.forEach(feed => {
              rating += feed.rating
            })
          if(feed.length)
            rating /= feed.length
          else
            rating = 0;
          this.item_data['rating'] = rating
          console.log(this.item_data)
        })
        .catch(error => {
          console.log(error)
        })
        await this.fetchProducts(this.item_data.categoria)
      })
      .catch(error => {
        console.log(error)
      })
    },
    async fetchProducts(categoria) {
      await http.services.getAllArticulos(1, "", "", "", "", "", categoria)
      .then(res => {
        res.data.articulos.data.forEach(item => {
          if(this.item_data.id !== item.id){
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
          }
        })
        this.$vs.loading.close()
      })
      .catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style lang="scss">

@import "@/assets/scss/vuexy/_variables.scss";

#item-detail-page {
  .color-radio {
    height: 2.28rem;
    width: 2.28rem;

    > div {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  .item-features {
    background-color: #f7f7f7;

    .theme-dark & {
      background-color: $theme-dark-secondary-bg;
    }
  }

  .product-sales-meta-list {
    .vs-list--icon {
      padding-left: 0;
    }
  }

  .related-product-swiper {
    .swiper-wrapper {
      padding-bottom: 2rem;

      > .swiper-slide {
        background-color: #f7f7f7;
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
