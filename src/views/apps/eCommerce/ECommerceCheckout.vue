
<template>
    <div id="ecommerce-checkout-demo">
        <form-wizard
            ref="checkoutWizard"
            color="rgba(var(--vs-primary), 1)"
            :title="null"
            :subtitle="null"
            :hide-buttons="true">

            <!-- tab 1 content -->
            <tab-content title="Carrito" icon="feather icon-shopping-cart" class="mb-5">

                <!-- IF CART HAVE ITEMS -->
                <div class="vx-row" v-if="cartItems.length">

                    <!-- LEFT COL -->
                    <div class="vx-col lg:w-2/3 w-full relative">
                        <div class="items-list-view" v-for="(item, index) in cartItems" :key="item.id">
                            <item-list-view :item="item" class="mb-base">

                                <!-- SLOT: ITEM META -->
                                <template slot="item-meta">
                                    <h6
                                      class="item-name font-semibold mb-1 cursor-pointer hover:text-primary"
                                      @click="$router.push({name: 'ecommerce-item-detail-view', params: {item_id: item.id }}).catch(() => {})">{{ item.nombre }}</h6>
                                    <p class="text-sm mb-2">de <span class="font-semibold">{{ item.marca }}</span></p>
                                    <p class="text-sm">Unidades disponibles: <span class="font-semibold">{{item.stock}}</span></p>

                                    <p class="mt-4 font-bold text-sm">Cantidad</p>
                                    <vs-input-number :min="1" :max="item.stock" :value="guest ? item.quantity : item.pivot.cantidad" @input="updateItemQuantity($event, index, item)" class="inline-flex" />

                                </template>

                                <!-- SLOT: ACTION BUTTONS -->
                                <template slot="action-buttons">

                                    <!-- PRIMARY BUTTON: REMOVE -->
                                    <div class="item-view-primary-action-btn p-3 rounded-lg flex flex-grow items-center justify-center cursor-pointer mb-3" @click="removeItemFromCart(item)">
                                        <feather-icon icon="XIcon" svgClasses="h-4 w-4" />
                                        <span class="text-sm font-semibold ml-2">Quitar</span>
                                    </div>

                                    <!-- SECONDARY BUTTON: MOVE-TO/VIEW-IN WISHLIST -->
                                    <div class="item-view-secondary-action-btn bg-primary p-3 rounded-lg flex flex-grow items-center justify-center text-white cursor-pointer" @click="wishListButtonClicked(item)">
                                        <feather-icon icon="HeartIcon" :svgClasses="[{'text-white fill-current': isInWishList(item.id)}, 'h-4 w-4']" />
                                        <span class="text-sm font-semibold ml-2" v-if="isInWishList(item.id)">Deseado</span>
                                        <span class="text-sm font-semibold ml-2" v-else>Deseado</span>
                                    </div>
                                </template>
                            </item-list-view>
                        </div>
                    </div>

                    <!-- RIGHT COL -->
                    <div class="vx-col lg:w-1/3 w-full">
                        <vx-card>
                            <p class="font-semibold mb-3">Detalles</p>
                            <vs-divider />
                            <div class="flex justify-between mb-2">
                                <span class="text-grey">Precio total</span>
                                <span>US$ {{precio}}</span>
                            </div>
                            <div class="flex justify-between mb-2">
                                <span class="text-grey">Descuento aplicado</span>
                                <span class="text-success">5%</span>
                            </div>
                            <div class="flex justify-between mb-2">
                                <span class="text-grey">Iva</span>
                                <span>22%</span>
                            </div>
                            <div class="flex justify-between mb-2">
                                <span class="text-grey">Cargos de envío</span>
                                <span class="text-success">Gratis</span>
                            </div>

                            <vs-divider />

                            <div class="flex justify-between font-semibold mb-3">
                                <span>Total</span>
                                <span>US$ {{precioT}}</span>
                            </div>

                            <vs-button class="w-full" @click="$refs.checkoutWizard.nextTab()">Comprar</vs-button>
                        </vx-card>
                    </div>
                </div>

                <!-- IF NO ITEMS IN CART -->
                <vx-card title="No tienes ningun elemento en el carrito." v-else>
                    <vs-button @click="$router.push('/inicio').catch(() => {})">Ir al Inicio</vs-button>
                </vx-card>

            </tab-content>

            <!-- tab 2 content -->
            <tab-content title="Dirección" icon="feather icon-home" class="mb-5">

                <div class="vx-row">

                    <!-- LEFT COL: NEW ADDRESS -->
                    <div class="vx-col lg:w-2/3 w-full">
                        <vx-card title="Añadir nueva dirección" subtitle="Asegurate de comprobar que la dirección que estas ingresando es correcta." class="mb-base">

                            <form data-vv-scope="add-new-address">
                                <div class="vx-row">
                                    <div class="vx-col sm:w-1/2 w-full">

                                        <vs-input
                                            v-validate="'required|alpha_spaces'"
                                            data-vv-as="field"
                                            name="nombre"
                                            label="Nombre del Destinatario:"
                                            v-model="nombre"
                                            class="w-full mt-5" />
                                        <span v-show="errors.has('add-new-address.nombre')" class="text-danger">Este campo es obligatorio</span>

                                    </div>

                                    <div class="vx-col sm:w-1/2 w-full">

                                        <vs-input
                                            v-validate="'required|numeric'"
                                            name="telefono"
                                            label="Teléfono:"
                                            v-model="telefono"
                                            class="w-full mt-5" />
                                        <span v-show="errors.has('add-new-address.telefono')" class="text-danger">Este campo es obligatorio</span>
                                    </div>

                                </div>

                                <div class="vx-row">


                                    <div class="vx-col sm:w-1/2 w-full">

                                        <vs-input
                                            v-validate="'required'"
                                            name="calle"
                                            label="Calle:"
                                            v-model="calle"
                                            class="w-full mt-5" />
                                        <span v-show="errors.has('add-new-address.calle')" class="text-danger">Este campo es obligatorio</span>
                                    </div>

                                    <div class="vx-col sm:w-1/2 w-full">

                                        <vs-input
                                            name="info"
                                            label="Información adicional:"
                                            v-model="info"
                                            class="w-full mt-5" />
                                    </div>

                                </div>

                                <div class="vx-row">

                                    <div class="vx-col sm:w-1/2 w-full">

                                        <vs-input
                                            v-validate="'required'"
                                            name="ciudad"
                                            label="Ciudad:"
                                            v-model="ciudad"
                                            class="w-full mt-5" />
                                        <span v-show="errors.has('add-new-address.ciudad')" class="text-danger">Este campo es obligatorio</span>
                                    </div>

                                    <div class="vx-col sm:w-1/2 w-full">
                                        <vs-input
                                            v-validate="'required|numeric'"
                                            name="codigo"
                                            label="Código postal:"
                                            v-model="codigo"
                                            class="w-full mt-5" />
                                        <span v-show="errors.has('add-new-address.codigo')" class="text-danger">{{ errors.first('add-new-address.codigo') }}</span>
                                    </div>
                                </div>

                                <div class="vx-row">


                                    <div class="vx-col sm:w-1/2 w-full">

                                        <vs-input
                                            v-validate="'required'"
                                            name="departamento"
                                            label="Departamento:"
                                            v-model="departamento"
                                            class="w-full mt-5" />
                                        <span v-show="errors.has('add-new-address.departamento')" class="text-danger">Este campo es obligatorio</span>
                                    </div>


                                </div>
                                      <vs-button class="mt-6 ml-auto flex" @click.prevent="submitNewAddressForm">Enviar aquí</vs-button>
                            </form>
                        </vx-card>
                    </div>

                    <!-- RIGHT COL: CONTINUE WITH SAVED ADDRESS -->
                    <div class="vx-col lg:w-1/3 w-full" v-if="user">
                        <vx-card :title="this.user.name">
                            <div>
                                <p>{{this.user.ciudad}}, {{this.user.departamento}}</p>
                                <p>{{this.user.calle}}</p>
                                <p class="my-4">Teléfono: {{this.user.telefono}}</p>
                                <p>Código postal: {{this.user.cp}}</p>
                            </div>

                            <vs-divider />

                            <vs-button class="w-full" @click="$refs.checkoutWizard.nextTab()">Enviar a esta dirección</vs-button>
                        </vx-card>
                    </div>

                </div>
            </tab-content>

            <!-- tab 3 content -->
            <tab-content title="Pago" icon="feather icon-credit-card" class="mb-5">

                <div class="vx-row">

                    <!-- LEFT COL: PAYMENT OPTIONS -->
                    <div class="vx-col lg:w-2/3 w-full">
                        <vx-card title="Opciones de pago" subtitle="Selecciona la forma con la que quieres pagar" class="mb-base">

                            <div class="mt-3">
                                <ul>
                                  <!-- OPTION 1 -->
                                  <li>
                                    <!-- CARD DETAILS -->
                                    <div class="flex flex-wrap justify-between items-center" v-if="user">
                                        <vs-radio v-model="paymentMethod" vs-value="debit-card">
                                            <div class="flex items-center">
                                                <img src="@/assets/images/pages/eCommerce/bank.png" alt="bank-logo" height="40" width="50" class="inline-flex">
                                                <span>Pago en el momento</span>
                                            </div>
                                        </vs-radio>
                                        <span>{{this.user.name}}</span>
                                        <span>{{this.user.fecha_nac}}</span>
                                    </div>

                                    <!-- CVV BLOCK -->
                                    <form data-vv-scope="cvv-form">
                                        <div class="flex items-center flex-wrap">

                                            <vs-button class="mt-4" @click.prevent="makePayment" :disabled="false">Confirmar</vs-button>
                                        </div>
                                        <span v-show="errors.has('cvv-form.cvv')" class="text-danger ml-24">{{ errors.first('cvv-form.cvv') }}</span>
                                    </form>
                                  </li>

                                  <vs-divider class="my-6" />

                                  <!-- OPTION 2 -->
                                  <li>
                                    <vs-radio v-model="paymentMethod" vs-value="credit-debit-atmCard">Crédito / Débito</vs-radio>
                                  </li>

                                  <!-- OPTION 3 -->
                                  <li class="mt-2">
                                    <vs-radio v-model="paymentMethod" vs-value="netBanking">Transferencia Bancaria</vs-radio>
                                  </li>

                                  <!-- OPTION 4 -->
                                  <li class="mt-2">
                                    <vs-radio v-model="paymentMethod" vs-value="emi">RedPagos</vs-radio>
                                  </li>

                                  <!-- OPTION 5 -->
                                  <li class="mt-2">
                                    <vs-radio v-model="paymentMethod" vs-value="cashOnDelivery">Abitab</vs-radio>
                                  </li>
                                </ul>

                                <vs-divider />

                            </div>
                        </vx-card>
                    </div>

                    <!-- RIGHT COL: PRICE -->
                    <div class="vx-col lg:w-1/3 w-full">
                        <vx-card title="Detalles">

                            <div class="flex justify-between mb-2">
                                <span>Precio por {{cartItems.length}} artículo<span v-show="cartItems.length > 1">s</span></span>
                                <span class="font-semibold">${{precio * 42}}</span>
                            </div>
                            <div class="flex justify-between mb-2">
                                <span>Descuentos aplicados</span>
                                <span class="text-success">5%</span>
                            </div>
                            <div class="flex justify-between mb-2">
                                <span>Cargos de envío</span>
                                <span class="text-success">Gratis</span>
                            </div>
                            <vs-divider />

                            <div class="flex justify-between">
                                <span>Monto a pagar</span>
                                <span class="font-semibold">${{precioT *42}}</span>
                            </div>
                        </vx-card>
                    </div>
                </div>
            </tab-content>
        </form-wizard>
    </div>
</template>

<script>
import { FormWizard, TabContent } from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import http from '@/http/banitotServices';
const ItemListView = () => import('./components/ItemListView.vue')


export default {
  data () {
    return {
      guest: true,
      precio: 0,
      precioT: 0,
      cartItems: [],
      // TAB 2
      user : null,
      newAddress: false,
      nombre: '',
      telefono: '',
      codigo: '',
      calle: '',
      info: '',
      ciudad: '',
      departamento: '',
      // TAB 3
      paymentMethod: 'debit-card',
      cvv: ''
    }
  },
  computed: {
    lcartItems () {
      return this.$store.state.eCommerce.cartItems.slice().reverse()
    },
    isInWishList () {
      return (itemId) => this.$store.getters['eCommerce/isInWishList'](itemId)
    }
  },
  async created () {
    if(this.$store.state.AppActiveUser.name){
      this.guest = false;
      await this.fetchCarrito()
      await this.fetchUser()
    } else {
      this.precioRating(this.lcartItems)
    }
  },
  methods: {
    // TAB 1
    async fetchUser() {
      await http.services.fetchUser()
      .then(res => {
            this.user = res.data.user
            this.$vs.loading.close()
        })
      .catch(error => {
        this.$vs.notify({
          title: 'Error',
          text: error.message,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'danger'
        })
        this.$vs.loading.close()
      })
    },
    async fetchCarrito() {
      this.$vs.loading()
      await http.services.getCarrito(this.$store.state.AppActiveUser.carrito[0].id)
      .then(res => {
          this.precioRating(res.data.articulos)
        })
      .catch(error => {
        this.$vs.notify({
          title: 'Error',
          text: error.message,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'danger'
        })
      })
    },
    precioRating (res) {
      this.cartItems = res
      this.cartItems.forEach(item => {
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
        if(!this.guest)
          this.precio += item.precio*item.pivot.cantidad
        else{
          this.precio += item.precio*item.quantity
        }
      })
      this.precio = parseInt(this.precio)
      this.precioT = parseInt(this.precio - this.precio * 0.05)
    },
    removeItemFromCart (item) {
      if(!this.guest)
        item['carrito_id'] = this.user.carrito[0].id

      this.$store.dispatch('eCommerce/toggleItemInCart', item)
      this.cartItems.forEach((i, index) => {
          if(i.id === item.id){
            if(!this.guest)
              this.precio -= i.precio*i.pivot.cantidad
            else
              this.precio -= i.precio*i.quantity

            this.precio = parseInt(this.precio)
            this.precioT = parseInt(this.precio - this.precio * 0.05)
            this.cartItems.splice(index, 1)
          }
      })
    },
    wishListButtonClicked (item) {
      // Toggle in Wish List
      if(!this.guest){
        if (this.isInWishList(item.id)) this.$router.push('/deseados').catch(() => {})
        else {
          this.toggleItemInWishList(item)
          this.removeItemFromCart(item)
        }
      } else {
        this.$vs.notify({
          title: 'Advertencia',
          text: "Debes iniciar sesión para usar la lista de deseados",
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'warning',
          time: 3000
        })
      }
    },
    toggleItemInWishList (item) {
      item['wishlist_id'] = this.$store.state.AppActiveUser.carrito[0].id;
      this.$store.dispatch('eCommerce/toggleItemInWishList', item)
    },
    updateItemQuantity (event, index, item) {
      if(event > 0 && event <= item.stock){
        const itemIndex = Math.abs(index + 1 - this.cartItems.length)

        let carritoid = null;
        if(!this.guest){
          carritoid = this.$store.state.AppActiveUser.carrito[0].id
          this.precio += (item.precio * event - item.precio * item.pivot.cantidad)
          item.pivot.cantidad = event
        }
        else
          this.precio += (item.precio * event - item.precio * item.quantity)

        this.precio = parseInt(this.precio)
        this.precioT = parseInt(this.precio - this.precio * 0.05)

        this.$store.dispatch('eCommerce/updateItemQuantity', { quantity: event, articulo_id: item.id, carrito_id: carritoid,index: itemIndex })
      }
    },
    // TAB 2
    submitNewAddressForm () {
      return new Promise(() => {
        this.$validator.validateAll('add-new-address').then(result => {
          if (result) {
            this.newAddress = true
            this.$refs.checkoutWizard.nextTab()
          } else {
            this.$vs.notify({
              title: 'Error',
              text: 'Por favor ingresa información valida',
              color: 'warning',
              iconPack: 'feather',
              icon: 'icon-alert-circle'
            })
          }
        })
      })
    },
    handleDireccion() {
      if(!this.newAddress){
        this.nombre = this.user.name
        this.calle = this.user.calle
        this.telefono = this.user.telefono
        this.codigo = this.user.cp
        this.ciudad = this.user.ciudad
        this.departamento = this.user.departamento
      }
    },
    // TAB 3
    makePayment () {
      return new Promise(() => {
        this.$validator.validateAll('cvv-form').then(result => {
          if (result) {
            this.handleDireccion()
            const arti = []
            this.cartItems.forEach(item => {
              const art = {
                id: item.id,
                cantidad: item.pivot.cantidad
              }
              arti.push(art)
            })
            const orden = {
              estado:"PENDIENTE",
              monto:this.precioT,
              user_id:this.$store.state.AppActiveUser.id,
              articulos: arti,
              direccion: {
                  nombre: this.nombre,
                  telefono: this.telefono,
                  calle: this.calle,
                  info: this.info,
                  ciudad: this.ciudad,
                  departamento: this.departamento,
                  codigo: this.codigo
              }
            }
            http.services.createOrden(orden)
            .then(() => {
                this.$vs.notify({
                  title: 'Recibido!',
                  text: 'Estamos procesando tu orden.',
                  color: 'success',
                  iconPack: 'feather',
                  icon: 'icon-check',
                  time: 4000
                })
                this.cartItems.forEach(item => {
                  item['carrito_id'] = this.$store.state.AppActiveUser.carrito[0].id;
                  this.$store.dispatch('eCommerce/toggleItemInCart', item)
                })
                this.$router.push('/inicio').catch(() => {})
              })
            .catch(error => {
              this.$vs.notify({
                title: 'Error',
                text: error.message,
                iconPack: 'feather',
                icon: 'icon-alert-circle',
                color: 'danger'
              })
            })

          } else {
            this.$vs.notify({
              title: 'Error',
              text: 'Por favor ingresa detalles validos',
              color: 'warning',
              iconPack: 'feather',
              icon: 'icon-alert-circle'
            })
          }
        })
      })
    }
  },
  components: {
    ItemListView,
    FormWizard,
    TabContent
  }
}
</script>

<style lang="scss" scoped>
#ecommerce-checkout-demo {
    .item-view-primary-action-btn {
        color: #2c2c2c !important;
        background-color: #f6f6f6;
    }

    .item-name {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
        -webkit-line-clamp: 2;
    }

    .vue-form-wizard {
        padding-bottom: 0;

        ::v-deep .wizard-header {
            padding: 0;
        }

        ::v-deep .wizard-tab-content {
            padding-right: 0;
            padding-left: 0;
            padding-bottom: 0;

            .wizard-tab-container{
              margin-bottom: 0 !important;
            }
        }
    }
}
</style>
