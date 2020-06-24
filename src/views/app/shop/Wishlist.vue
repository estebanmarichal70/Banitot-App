<template>
  <div id="ecommerce-wishlist-demo">
    <div class="items-grid-view vx-row match-height" v-if="wishListitems.length" appear>
      <div class="vx-col lg:w-1/4 md:w-1/3 sm:w-1/2 w-full" v-for="item in wishListitems" :key="item.id">

        <item-grid-view :item="item">

          <!-- SLOT: ACTION BUTTONS -->
          <template slot="action-buttons">
            <div class="flex flex-wrap">

              <!-- PRIMARY BUTTON : REMOVE -->
              <div
                class="item-view-primary-action-btn p-3 flex flex-grow items-center justify-center cursor-pointer"
                @click="removeItemFromWishList(item)">
                <feather-icon icon="XIcon" svgClasses="h-4 w-4"/>

                <span class="text-sm font-semibold ml-2">Remover</span>
              </div>

              <!-- SECONDARY BUTTON: MOVE TO CART -->
              <div
                class="item-view-secondary-action-btn bg-primary p-3 flex flex-grow items-center justify-center text-white cursor-pointer"
                @click="cartButtonClicked(item)">
                <feather-icon icon="ShoppingBagIcon" svgClasses="h-4 w-4"/>

                <span class="text-sm font-semibold ml-2" v-if="isInCart(item.id)">Ver en carrito</span>
                <span class="text-sm font-semibold ml-2" v-else-if="item.stock <= 0">Sin Stock</span>
                <span class="text-sm font-semibold ml-2" v-else>Mover al carrito</span>
              </div>
            </div>
          </template>
        </item-grid-view>

      </div>
    </div>

    <!-- IF NO ITEMS IN CART -->
    <vx-card title="No tienes ningún artículo en la lista de deseados." v-else>
      <vs-button @click="$router.push('/inicio').catch(() => {})">Ir al Inicio</vs-button>
    </vx-card>
  </div>
</template>

<script>
  const ItemGridView = () => import('./components/ItemGridView.vue')

  export default {
    components: {
      ItemGridView
    },
    computed: {
      wishListitems() {
        return this.$store.state.eCommerce.wishList
      },
      isInCart() {
        return (itemId) => this.$store.getters['eCommerce/isInCart'](itemId)
      },
      isInWishList() {
        return (itemId) => this.$store.getters['eCommerce/isInWishList'](itemId)
      }
    },
    methods: {
      removeItemFromWishList(item) {
        item['wishlist_id'] = this.$store.state.AppActiveUser.wishlist[0].id;
        this.$store.dispatch('eCommerce/toggleItemInWishList', item)
      },
      cartButtonClicked(item) {
        if (item.stock > 0) {
          if (this.isInCart(item.id)) this.$router.push('/checkout').catch(() => {
          })
          else {
            this.additemInCart(item)
            this.removeItemFromWishList(item)
          }
        } else {
          this.$vs.notify({
            title: 'Advertencia',
            text: "Ya no quedan mas unidades de este producto.",
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'warning',
            time: 3000
          })
        }
      },
      additemInCart(item) {
        item['carrito_id'] = this.$store.state.AppActiveUser.carrito[0].id;
        this.$store.dispatch('eCommerce/additemInCart', item)
      }
    }
  }
</script>

<style lang="scss" scoped>
  #ecommerce-wishlist-demo {
    .item-view-primary-action-btn {
      color: #2c2c2c !important;
      background-color: #f6f6f6;
      min-width: 50%;
    }

    .item-view-secondary-action-btn {
      min-width: 50%;
    }
  }
</style>
