<template>
  <div id="data-list-thumb-view" class="data-list-container">
    <vs-table :data="data_local">
      <template slot="thead">
        <vs-th>N°</vs-th>
        <vs-th>Estado</vs-th>
        <vs-th>Precio</vs-th>
        <vs-th>Accion</vs-th>
      </template>

      <template>
        <tbody>
          <vs-tr :key="item.id" v-for="item in data_local">
            <vs-td>
              <p class="product-name font-medium truncate">{{ item.id }}</p>
            </vs-td>

            <vs-td>
              <vs-chip
                :color="getOrderStatusColor(item.estado)"
                class="product-order-status font-bold"
                >{{ item.estado }}</vs-chip
              >
            </vs-td>

            <vs-td>
              <p class="product-price">${{ item.monto }}</p>
            </vs-td>

            <vs-td class="whitespace-no-wrap">
              <feather-icon
                class="mr-2"
                icon="ListIcon"
                svgClasses="w-5 h-5 hover:text-primary stroke-current"
                @click="infoOrden(item.id)"
              />
              <span v-if="item.estado == 'PENDIENTE'">
                <feather-icon
                  icon="TrashIcon"
                  svgClasses="w-5 h-5 hover:text-primary stroke-current"
                  @click="openConfirm(item.id)"
                />
              </span>
            </vs-td>
          </vs-tr>
        </tbody>
      </template>

      <template lang="html">
        <div class="centerx">
          <vs-popup
            fullscreen
            title="Información de la orden"
            :active.sync="popupActivo4"
          >
            <template>
              <div id="data-list-thumb-view" class="data-list-container">
                <vs-table  :data="articulos"
                >
                  <template slot="thead">
                    <vs-th>Imagen</vs-th>
                    <vs-th>Nombre</vs-th>
                    <vs-th>Descripción</vs-th>
                    <vs-th>Marca</vs-th>
                    <vs-th>Precio</vs-th>
                    <vs-th>Rating</vs-th>
                  </template>

                  <template>
                    <tbody>
                      <vs-tr
                        :key="item.id"
                        v-for="item in articulos"
                      >
                        <vs-td class="img-container">
                          <img :src="item.imagen" class="product-img" />
                        </vs-td>

                        <vs-td>
                          <p class="product-name font-medium truncate">
                            {{ item.nombre }}
                          </p>
                        </vs-td>

                        <vs-td>
                          <p class="product-category">{{ item.descripcion }}</p>
                        </vs-td>

                        <vs-td>
                          <p class="product-category">{{ item.marca }}</p>
                        </vs-td>

                        <vs-td>
                          <p class="product-price">${{ item.precio - item.precio * 0.05  }}</p>
                        </vs-td>

                        <vs-td>
                          <star-rating :show-rating="false" :rating="item.rating" :star-size="14" read-only />
                        </vs-td>

                      </vs-tr>
                    </tbody>
                  </template>

                </vs-table>
              </div>
            </template>
          </vs-popup>
        </div>
      </template>
<!-- termina popup -->
    </vs-table>
  </div>
</template>

<script>
import DataViewSidebar from "../DataViewSidebar.vue";
import http from "@/http/banitotServices";
import StarRating from 'vue-star-rating'

export default {
  components: {
    DataViewSidebar,
    StarRating
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      data_local: JSON.parse(JSON.stringify(this.data.ordenes)),
      selected: [],
      isMounted: false,
      addNewDataSidebar: false,
      sidebarData: {},
      activeConfirm: false,
      estadoId: "",
      popupActivo4: false,
      articulos:""
    };
  },
  computed: {
    currentPage() {
      if (this.isMounted) {
        return this.$refs.table.currentx;
      }
      return 0;
    }
  },
  methods: {
    openConfirm(id) {
      this.estadoId = id;
      this.$vs.dialog({
        type: "confirm",
        color: "danger",
        title: `Cancelar orden`,
        acceptText: "Aceptar",
        cancelText: "Cancelar",
        text: "¿Esta seguro que quiere cancelar la orden?",
        accept: this.acceptAlert
      });
    },
    acceptAlert() {
      this.cambiarEstado(this.estadoId);
    },
    cambiarEstado(id) {
      http.services
        .cambiarEstado(id)
        .then(() => {
          this.$vs.notify({
            title: "Genial!",
            text: "Se ha actualizado el estado correctamente.",
            color: "success"
          });
        })
        .catch(err => {
          this.$vs.notify({
            title: "Error",
            text: err.response.data.error,
            color: "danger"
          });
        });
    },
    infoOrden(id){
      http.services.fetchOrden(id)
      .then(res => {
        this.articulos = res.data.articulos;
        this.articulos.forEach(item => {
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
        })
      })
      .catch(err => {
          this.$vs.notify({
            title: "Error",
            text: err.response.data.error,
            color: "danger"
          });
      });
      this.popupActivo4 = true
    },
    getOrderStatusColor(status) {
      if (status === "PENDIENTE") return "warning";
      if (status === "CONFIRMADO") return "#009FEB";
      if (status === "CANCELADO") return "danger";
      if (status === "RECIBIDO") return "success";
      if (status === "EMBARCADO") return "#8B00AA";
      return "primary";
    },
    toggleDataSidebar(val = false) {
      this.addNewDataSidebar = val;
    }
  },
  mounted() {
    this.isMounted = true;
  }
};
</script>

<style lang="scss">
#data-list-thumb-view {
  .vs-con-table {
    .product-name {
      max-width: 23rem;
    }

    .vs-table--header {
      display: flex;
      flex-wrap: wrap-reverse;
      margin-left: 1.5rem;
      margin-right: 1.5rem;
      > span {
        display: flex;
        flex-grow: 1;
      }

      .vs-table--search {
        padding-top: 0;

        .vs-table--search-input {
          padding: 0.9rem 2.5rem;
          font-size: 1rem;

          & + i {
            left: 1rem;
          }

          &:focus + i {
            left: 1rem;
          }
        }
      }
    }

    .vs-table {
      border-collapse: separate;
      border-spacing: 0 1.3rem;
      padding: 0 1rem;

      tr {
        box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.05);
        td {
          padding: 10px;
          &:first-child {
            border-top-left-radius: 0.5rem;
            border-bottom-left-radius: 0.5rem;
          }
          &:last-child {
            border-top-right-radius: 0.5rem;
            border-bottom-right-radius: 0.5rem;
          }
          &.img-container {
            // width: 1rem;
            // background: #fff;

            span {
              display: flex;
              justify-content: flex-start;
            }

            .product-img {
              height: 110px;
            }
          }
        }
        td.td-check {
          padding: 20px !important;
        }
      }
    }

    .vs-table--thead {
      th {
        padding-top: 0;
        padding-bottom: 0;

        .vs-table-text {
          text-transform: uppercase;
          font-weight: 600;
        }
      }
      th.td-check {
        padding: 0 15px !important;
      }
      tr {
        background: none;
        box-shadow: none;
      }
    }

    .vs-table--pagination {
      justify-content: center;
    }
  }
}
</style>
