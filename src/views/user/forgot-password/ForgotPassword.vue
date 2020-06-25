<template>
  <div class="h-screen flex w-full bg-img">
    <div class="vx-col w-4/5 sm:w-4/5 md:w-3/5 lg:w-3/4 xl:w-3/5 mx-auto self-center">
      <vx-card>
        <div slot="no-body" class="full-page-bg-color">
          <div class="vx-row">
            <div class="vx-col hidden sm:hidden md:hidden lg:block lg:w-1/2 mx-auto self-center">
              <img src="@/assets/images/pages/forgot-password.png" alt="login" class="mx-auto">
            </div>
            <div class="vx-col sm:w-full md:w-full lg:w-1/2 mx-auto self-center d-theme-dark-bg">
              <div class="p-8">
                <div class="vx-card__title mb-8">
                  <h4 class="mb-4">¿Olvidaste tu contraseña?</h4>
                  <p>Por favor, ingresá tu email asi te podemos enviar las instrucciones para poder cambiarla.</p>
                </div>

                <vs-input type="email" label-placeholder="Email" v-model="email" class="w-full mb-8"/>
                <vs-button type="border" to="/acceder" class="px-4 w-full md:w-auto">Iniciar Sesión</vs-button>
                <vs-button @click="sendPasswordResetRequest"
                           class="float-right px-4 w-full md:w-auto mt-3 mb-8 md:mt-0 md:mb-0">Enviar instrucciones
                </vs-button>
              </div>
            </div>
          </div>
        </div>
      </vx-card>
    </div>
  </div>
</template>

<script>
  import http from "../../../http/banitotServices";

  export default {
    data() {
      return {
        email: ''
      }
    },
    methods: {
      sendPasswordResetRequest() {
        this.$vs.loading();
        http.services.requestResetPassword({email: this.email}).then(() => {
          this.$vs.loading.close();
          this.$vs.notify({
            title: "Genial!",
            text: "Se te ha enviado un mail con las instrucciones a seguir.",
            color: "success",
            time: 4000
          });
          this.$router.push("/acceder");
        }).catch(err => {
          this.$vs.loading.close();
          if (err.response) {
            return err.response.status === 404 ? this.$vs.notify({
              title: "Error",
              text: "El mail ingresado no existe.",
              color: "danger",
              time: 4000
            }) : null;
          } else {
            this.$vs.notify({
              title: "Error",
              text: "Ha ocurrido un error inesperado",
              color: "danger",
              time: 4000
            });
          }
        })
      }
    }
  }
</script>
