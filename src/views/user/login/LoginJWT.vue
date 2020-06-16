<template>
  <div>
    <vs-input
      v-validate="'required|email|min:3'"
      data-vv-validate-on="blur"
      name="email"
      icon-no-border
      icon="icon icon-user"
      icon-pack="feather"
      label-placeholder="Email"
      v-model="email"
      class="w-full"/>
    <span class="text-danger text-sm">{{ errors.first('email') }}</span>

    <vs-input
      data-vv-validate-on="blur"
      v-validate="'required|min:8|max:128'"
      type="password"
      name="contraseña"
      icon-no-border
      icon="icon icon-lock"
      icon-pack="feather"
      label-placeholder="Contraseña"
      v-model="password"
      class="w-full mt-8"/>
    <span class="text-danger text-sm">{{ errors.first('contraseña') }}</span>

    <div class="flex flex-wrap justify-between my-5">
      <router-link to="/pages/forgot-password">Olvidaste tu contraseña?</router-link>
    </div>
    <div class="flex flex-wrap justify-between mb-3">
      <vs-button type="border" @click="registerUser">Registrar</vs-button>
      <vs-button :disabled="!validateForm" @click="loginJWT">Iniciar Sesion</vs-button>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        email: 'admin@admin.com',
        password: 'adminadmin',
        checkbox_remember_me: false
      }
    },
    computed: {
      validateForm() {
        return !this.errors.any() && this.email !== '' && this.password !== ''
      }
    },
    methods: {
      loginJWT() {

        this.$vs.loading()

        const payload = {
          userDetails: {
            email: this.email,
            password: this.password
          }
        }

        this.$store.dispatch('auth/loginJWT', payload)
          .then(() => {
            this.$vs.loading.close()
          })
          .catch(error => {
            this.$vs.loading.close()
            if (error.response.status == 401) {
              this.$vs.notify({
                title: 'Error',
                text: "Email o contraseña incorrectos.",
                iconPack: 'feather',
                icon: 'icon-alert-circle',
                color: 'danger'
              })
            } else {
              this.$vs.notify({
                title: 'Error',
                text: error.message,
                iconPack: 'feather',
                icon: 'icon-alert-circle',
                color: 'danger'
              })
            }
          })
      },
      registerUser() {
        this.$router.push('/registrarse').catch(() => {
        })
      }
    }
  }

</script>

