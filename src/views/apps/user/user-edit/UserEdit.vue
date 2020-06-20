<template>
  <div id="page-user-edit">

    <vx-card v-if="user_data">

      <div slot="no-body" class="tabs-container px-6 pt-6">

        <vs-tabs v-model="activeTab" class="tab-action-btn-fill-conatiner">
          <vs-tab label="Perfil" icon-pack="feather" icon="icon-info">
            <div class="tab-text">
              <user-edit-tab-information class="mt-4" :data="user_data" />
            </div>
          </vs-tab>
          <vs-tab label="Ordenes" icon-pack="feather" icon="icon-dollar-sign">
            <div class="tab-text">
              <user-orders class="mt-4" :data="user_data" />
            </div>
          </vs-tab>
        </vs-tabs>

      </div>

    </vx-card>
  </div>
</template>

<script>
import UserEditTabAccount     from './UserEditTabAccount.vue'
import UserEditTabInformation from './UserEditTabInformation.vue'
import UserEditTabSocial      from './UserEditTabSocial.vue'
import UserOrders from '@/views/data-list/thumb-view/DataListThumbView.vue'

// Store Module
import moduleUserManagement from '@/store/user-management/moduleUserManagement.js'
import http from "@/http/banitotServices";

export default {
  components: {
    UserEditTabAccount,
    UserEditTabInformation,
    UserEditTabSocial,
    UserOrders
  },
  data () {
    return {
      user_data: null,
      user_not_found: false,
      activeTab: 0
    }
  },
  watch: {
    activeTab () {
      this.fetch_user_data()
    }
  },
  methods: {
    fetch_user_data () {
      http.services.fetchUser()
      .then(res => {
        this.user_data = res.data.user
      })
      .catch(err => {
        this.$vs.notify({
            title: "Error",
            text: err.response.data.error,
            color: "danger"
          });
      })
    }
  },
  created () {
    if (!moduleUserManagement.isRegistered) {
      this.$store.registerModule('userManagement', moduleUserManagement)
      moduleUserManagement.isRegistered = true
    }
    this.fetch_user_data()
  }
}

</script>
