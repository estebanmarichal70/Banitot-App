<template>
  <div
    class="the-navbar__user-meta flex items-center"
    v-if="hideUserData != null && hideUserData === false"
  >
    <vs-dropdown vs-custom-content vs-trigger-click class="cursor-pointer">
      <div class="text-right leading-tight hidden sm:block">
        <p class="font-semibold">{{ activeUserInfo.name }}</p>
        <small>En linea</small>
      </div>

      <vs-dropdown-menu class="vx-navbar-dropdown">
        <ul style="min-width: 9rem">
          <li
            class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
            @click="$router.push('/usuario/perfil').catch(() => {})"
          >
            <feather-icon icon="UserIcon" svgClasses="w-4 h-4"/>
            <span class="ml-2">Perfil</span>
          </li>

          <li
            class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
            @click="$router.push('/deseados').catch(() => {})"
          >
            <feather-icon icon="HeartIcon" svgClasses="w-4 h-4"/>
            <span class="ml-2">Deseados</span>
          </li>

          <vs-divider class="m-1"/>

          <li
            class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
            @click="logout"
          >
            <feather-icon icon="LogOutIcon" svgClasses="w-4 h-4"/>
            <span class="ml-2">Salir</span>
          </li>
        </ul>
      </vs-dropdown-menu>
    </vs-dropdown>
  </div>
  <router-link to="/acceder" v-else class="the-navbar__user-meta flex items-center">
    Acceder
  </router-link>
</template>

<script>

  export default {
    data() {
      return {
        hideUserData: null
      }
    },
    beforeMount() {
      this.hideUserData = localStorage.getItem("accessToken") !== null ? false : true;
    },
    computed: {
      activeUserInfo() {
        return this.$store.state.AppActiveUser;
      },
    },
    methods: {
      logout() {
        if (localStorage.getItem("accessToken")) {
          localStorage.removeItem("userInfo");
          localStorage.removeItem("accessToken");
          this.hideUserData = true;
        }
        this.$acl.change("admin");
      }
    }
  };
</script>
