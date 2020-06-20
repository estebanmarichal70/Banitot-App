<template>
  <div id="data-list-thumb-view" class="data-list-container">
    <vs-table pagination :max-items="itemsPerPage" search :data="products">
      <template slot="thead">
        <vs-th sort-key="name">N°</vs-th>
        <vs-th sort-key="order_status">Estado</vs-th>
        <vs-th sort-key="price">Precio</vs-th>
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
                icon="ListIcon"
                svgClasses="w-5 h-5 hover:text-primary stroke-current"
                @click.stop="editData(tr)"
              />
              <span v-if="item.estado == 'PENDIENTE'">
                <feather-icon
                  icon="TrashIcon"
                  svgClasses="w-5 h-5 hover:text-danger stroke-current"
                  class="ml-2"
                  @click.stop="cambiarEstado(item.id)"
                />
              </span> 
            </vs-td>
          </vs-tr>
        </tbody>
      </template>
    </vs-table>
  </div>
</template>

<script>
import DataViewSidebar from "../DataViewSidebar.vue";
import moduleDataList from "@/store/data-list/moduleDataList.js";
import http from "@/http/banitotServices";

export default {
  components: {
    DataViewSidebar
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
      // products: [],
      itemsPerPage: 4,
      isMounted: false,
      addNewDataSidebar: false,
      sidebarData: {}
    };
  },
  computed: {
    currentPage() {
      if (this.isMounted) {
        return this.$refs.table.currentx;
      }
      return 0;
    },
    products() {
      return this.$store.state.dataList.products;
    },
    queriedItems() {
      return this.$refs.table
        ? this.$refs.table.queriedResults.length
        : this.products.length;
    }
  },
  created() {
    console.log(this.data_local);
    if (!moduleDataList.isRegistered) {
      this.$store.registerModule("dataList", moduleDataList);
      moduleDataList.isRegistered = true;
    }
    this.$store.dispatch("dataList/fetchDataListItems");
  },
  methods: {
    cambiarEstado(id) {
      http.services.cambiarEstado(id)
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
    editData(data) {
      // this.sidebarData = JSON.parse(JSON.stringify(this.blankData))
      this.sidebarData = data;
      this.toggleDataSidebar(true);
    },
    getOrderStatusColor(status) {
      if (status === "PENDIENTE") return "#9000D3";
      if (status === "CONFIRMADO") return "#009FEB";
      if (status === "CANCELADO") return "danger";
      if (status === "RECIBIDO") return "success";
      if (status === "EMBARCADO") return "warning";
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
