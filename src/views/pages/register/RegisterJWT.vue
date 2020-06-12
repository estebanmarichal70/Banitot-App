<template>
  <div slot="no-body">
    <div class="vx-row no-gutter">
      <div
        class="vx-col sm:w-full md:w-full lg:w-1/2 mx-auto d-theme-dark-bg"
      >
        <div class="px-8 pt-8">
          <div class="vx-card__title mb-4">
            <h4 class="mb-4">Registrarse</h4>
            <p>Complete el formulario para crear una nueva cuenta.</p>
          </div>
          <div class="clearfix">
            <vs-input
              v-validate="'required|alpha_dash|min:3'"
              data-vv-validate-on="blur"
              label-placeholder="Nombre"
              name="displayName"
              placeholder="Nombre"
              v-model="displayName"
              class="w-full"
            />
            <span class="text-danger text-sm">{{
              errors.first("displayName")
            }}</span>

            <vs-input
              v-validate="'required|email'"
              data-vv-validate-on="blur"
              name="email"
              type="email"
              label-placeholder="Email"
              placeholder="Email"
              v-model="email"
              class="w-full mt-6"
            />
            <span class="text-danger text-sm">{{ errors.first("email") }}</span>

            <vs-input
              ref="password"
              type="password"
              data-vv-validate-on="blur"
              v-validate="'required|min:6|max:10'"
              name="password"
              label-placeholder="Contraseña"
              placeholder="Contraseña"
              v-model="password"
              class="w-full mt-6"
            />
            <span class="text-danger text-sm">{{
              errors.first("password")
            }}</span>

            <vs-input
              type="password"
              v-validate="'min:6|max:10|confirmed:password'"
              data-vv-validate-on="blur"
              data-vv-as="password"
              name="confirm_password"
              label-placeholder="Confirmar contraseña"
              placeholder="Confirmar contraseña"
              v-model="confirm_password"
              class="w-full mt-6"
            />
            <span class="text-danger text-sm">{{
              errors.first("confirm_password")
            }}</span>
          </div>
        </div>
      </div>
      <div
        class="vx-col sm:w-full md:w-full lg:w-1/2 mx-auto d-theme-dark-bg"
      >
        <div class="px-8 pt-8">
          <div class="vx-card__title mb-4">
            <h4 class="mb-4">Dirección</h4>
            <p>Complete los siguientes datos de envío.</p>
          </div>

          <div class="clearfix">
            <vs-input
              v-validate="'required'"
              data-vv-validate-on="blur"
              name="telefono"
              type="text"
              label-placeholder="Telefono"
              placeholder="Telefono"
              v-model="telefono"
              class="w-full mt-6"
            />
            <span class="text-danger text-sm">{{
              errors.first("telefono")
            }}</span>

            <vs-input
              v-validate="'required'"
              data-vv-validate-on="blur"
              name="departamento"
              type="text"
              label-placeholder="Departamento"
              placeholder="Departamento"
              v-model="departamento"
              class="w-full mt-6"
            />
            <span class="text-danger text-sm">{{
              errors.first("departamento")
            }}</span>

            <vs-input
              v-validate="'required'"
              data-vv-validate-on="blur"
              name="ciudad"
              type="text"
              label-placeholder="Ciudad"
              placeholder="Ciudad"
              v-model="ciudad"
              class="w-full mt-6"
            />
            <span class="text-danger text-sm">{{
              errors.first("ciudad")
            }}</span>

            <vs-input
              v-validate="'required'"
              data-vv-validate-on="blur"
              name="calle"
              type="text"
              label-placeholder="Calle"
              placeholder="Calle"
              v-model="calle"
              class="w-full mt-6"
            />
            <span class="text-danger text-sm">{{ errors.first("calle") }}</span>

            <vs-input
              v-validate="'required'"
              data-vv-validate-on="blur"
              name="codigo_postal"
              type="text"
              label-placeholder="Codigo Postal"
              placeholder="Código Postal"
              v-model="codigo_postal"
              class="w-full mt-6"
            />
            <span class="text-danger text-sm">{{
              errors.first("codigo_postal")
            }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="vx-row no-gutter px-8 justify-between d-theme-dark-bg">
      <router-link type="border" to="/pages/login" class="mt-6 self-center"
        >Iniciar Sesión</router-link
      >
      <vs-button
        class="float-right mt-6"
        @click="registerUserJWt"
        :disabled="!validateForm"
        >Registrarse</vs-button
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      displayName: "",
      email: "",
      password: "",
      confirm_password: "",
      isTermsConditionAccepted: true
    };
  },
  computed: {
    validateForm() {
      return (
        !this.errors.any() &&
        this.displayName !== "" &&
        this.email !== "" &&
        this.password !== "" &&
        this.confirm_password !== "" &&
        this.isTermsConditionAccepted === true
      );
    }
  },
  methods: {
    checkLogin() {
      // If user is already logged in notify
      if (this.$store.state.auth.isUserLoggedIn()) {
        // Close animation if passed as payload
        // this.$vs.loading.close()

        this.$vs.notify({
          title: "Login Attempt",
          text: "You are already logged in!",
          iconPack: "feather",
          icon: "icon-alert-circle",
          color: "warning"
        });

        return false;
      }
      return true;
    },
    registerUserJWt() {
      // If form is not validated or user is already login return
      if (!this.validateForm || !this.checkLogin()) return;

      const payload = {
        userDetails: {
          displayName: this.displayName,
          email: this.email,
          password: this.password,
          confirmPassword: this.confirm_password
        },
        notify: this.$vs.notify
      };
      this.$store.dispatch("auth/registerUserJWT", payload);
    }
  }
};
</script>
