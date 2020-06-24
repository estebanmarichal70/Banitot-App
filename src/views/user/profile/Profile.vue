<template>
  <div id="page-user-edit">

    <vx-card v-if="user_data">

      <div slot="no-body" class="tabs-container px-6 pt-6">

        <vs-tabs v-model="activeTab" class="tab-action-btn-fill-conatiner">
          <vs-tab label="Perfil" icon-pack="feather" icon="icon-info">
            <div class="tab-text">
              <tab-information class="mt-4" :data="user_data" @fetch="fetch_user_data"/>
            </div>
          </vs-tab>
          <vs-tab label="Ordenes" icon-pack="feather" icon="icon-truck">
            <div class="tab-text">
              <user-orders class="mt-4" :data="user_data" @fetch="fetch_user_data"/>
            </div>
          </vs-tab>
        </vs-tabs>

      </div>

    </vx-card>
  </div>
</template>

<script>
  import TabInformation from './TabInformation.vue'
  import UserOrders from './TabOrders'
  import http from "@/http/banitotServices";

  export default {
    components: {
      TabInformation,
      UserOrders
    },
    data() {
      return {
        user_data: null,
        user_not_found: false,
        activeTab: 0
      }
    },
    watch: {
      activeTab() {
        this.fetch_user_data()
      }
    },
    methods: {
      fetch_user_data() {
        this.$vs.loading();
        http.services.fetchUser()
          .then(res => {
            this.user_data = res.data.user
            this.$vs.loading.close();
          })
          .catch(err => {
            this.$vs.notify({
              title: "Error",
              text: err.response.data.error,
              color: "danger"
            });
          })
        this.$vs.loading.close();
      }
    },
    created() {
      this.fetch_user_data()
    }
  }

</script>
