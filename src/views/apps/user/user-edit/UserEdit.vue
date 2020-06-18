<template>
  <div id="page-user-edit">

    <vx-card v-if="user_data">

      <div slot="no-body" class="tabs-container px-6 pt-6">

        <vs-tabs v-model="activeTab" class="tab-action-btn-fill-conatiner">
          <!--<vs-tab label="Account" icon-pack="feather" icon="icon-user">
            <div class="tab-text">
              <user-edit-tab-account class="mt-4" :data="user_data" />
            </div>
          </vs-tab>-->
          <vs-tab label="Perfil" icon-pack="feather" icon="icon-info">
            <div class="tab-text">
              <user-edit-tab-information class="mt-4" :data="user_data" />
            </div>
          </vs-tab>
          <vs-tab label="Ordenes" icon-pack="feather" icon="icon-dollar-sign">
            <div class="tab-text">
              <user-edit-tab-social class="mt-4" :data="user_data" />
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

// Store Module
import moduleUserManagement from '@/store/user-management/moduleUserManagement.js'

export default {
  components: {
    UserEditTabAccount,
    UserEditTabInformation,
    UserEditTabSocial
  },
  data () {
    return {
      user_data: null,
      user_not_found: false,

      /*
        This property is created for fetching latest data from API when tab is changed

        Please check it's watcher
      */
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
      this.user_data = this.$store.state.AppActiveUser;
      console.log(this.user_data)
      /*this.$store.dispatch('userManagement/fetchUser', userId)
        .then(res => { this.user_data = res.data })
        .catch(err => {
          if (err.response.status === 404) {
            this.user_not_found = true
            return
          }
          console.error(err) 
        })*/
    }
  },
  created () {
    // Register Module UserManagement Module
    if (!moduleUserManagement.isRegistered) {
      this.$store.registerModule('userManagement', moduleUserManagement)
      moduleUserManagement.isRegistered = true
    }
    this.fetch_user_data()
  }
}

</script>
