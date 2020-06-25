<template>
  <div class="h-screen flex w-full bg-img">
    <div class="vx-col sm:w-3/5 md:w-3/5 lg:w-3/4 xl:w-3/5 mx-auto self-center">
      <vx-card>
        <div slot="no-body" class="full-page-bg-color">
          <div class="vx-row">
            <div class="vx-col hidden sm:hidden md:hidden lg:block lg:w-1/2 mx-auto self-center">
              <img src="@/assets/images/pages/reset-password.png" alt="login" class="mx-auto">
            </div>
            <div class="vx-col sm:w-full md:w-full lg:w-1/2 mx-auto self-center  d-theme-dark-bg">
              <div class="p-8">
                <div class="vx-card__title mb-8">
                  <h4 class="mb-4">Restablecer Contraseña</h4>
                  <p>Por favor, completa los siguientes campos.</p>
                </div>
                <vs-input type="email" readonly label-placeholder="Email" v-model="email" class="w-full mb-6"/>
                <vs-input
                  ref="contraseña"
                  type="password"
                  data-vv-validate-on="blur"
                  v-validate="'required|min:8|max:128'"
                  name="contraseña"
                  label-placeholder="Contraseña"
                  placeholder="Contraseña"
                  v-model="password"
                  class="w-full mt-6"
                />
                <span class="text-danger text-sm">{{
              errors.first("contraseña")
            }}</span>

                <vs-input
                  type="password"
                  v-validate="'min:8|max:128|confirmed:contraseña'"
                  data-vv-validate-on="blur"
                  data-vv-as="contraseña"
                  name="confirmar_contraseña"
                  label-placeholder="Confirmar contraseña"
                  placeholder="Confirmar contraseña"
                  v-model="confirm_password"
                  class="w-full mt-6"
                />
                <span class="text-danger text-sm">{{
              errors.first("confirmar_contraseña")
            }}</span>

                <div class="flex flex-wrap justify-between mt-6 flex-col-reverse sm:flex-row">
                  <vs-button type="border" to="/acceder" class="w-full sm:w-auto mb-8 sm:mb-auto mt-3 sm:mt-auto">
                    Iniciar Sesión
                  </vs-button>
                  <vs-button :disabled="!validateForm" @click="resetPassword" class="w-full sm:w-auto">Restablecer
                  </vs-button>
                </div>

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
        email: '',
        password: '',
        confirm_password: '',
        reset_token: "",
      }
    },
    computed: {
      validateForm() {
        return (
          !this.errors.any() &&
          this.password !== "" &&
          this.confirm_password !== ""
        );
      }
    },
    methods: {
      resetPassword() {
        this.$vs.loading();

        const data = {
          email: this.email,
          token: this.reset_token,
          password: this.password,
          password_confirmation: this.confirm_password
        }

        http.services.resetPassword(data)
          .then(() => {
            this.$vs.loading.close();
            this.$vs.notify({
              title: "Genial!",
              text: "Se ha cambiado la contraseña con exito.",
              color: "success",
              time: 4000
            });
            this.$router.push("/acceder");
          })
          .catch(() => {
            this.$vs.loading.close();
            this.$vs.notify({
              title: "Error",
              text: "La solicitud es invalida, por favor vuelve a solicitar el cambio de contraseña",
              color: "danger",
              time: 4000
            });
          })
      }
    },
    created() {
      this.reset_token = this.$route.query.token;
      this.email = this.$route.query.email;
    }
  }
</script>
