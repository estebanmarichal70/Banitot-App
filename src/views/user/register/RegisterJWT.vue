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
              v-validate="'required'"
              data-vv-validate-on="none"
              label-placeholder="Nombre completo*"
              name="nombre"
              placeholder="Nombre completo*"
              v-model="nombre"
              class="w-full"
            />
            <span class="text-danger text-sm">{{
              errors.first("nombre")
            }}</span>

            <vs-input
              v-validate="'required|email'"
              data-vv-validate-on="none"
              name="email"
              type="email"
              label-placeholder="Email*"
              placeholder="Email*"
              v-model="email"
              class="w-full mt-6"
            />
            <span class="text-danger text-sm">{{ errors.first("email") }}</span>

            <vs-input
              ref="contraseña"
              type="password"
              data-vv-validate-on="none"
              v-validate="'required|min:8|max:128'"
              name="contraseña"
              label-placeholder="Contraseña*"
              placeholder="Contraseña*"
              v-model="password"
              class="w-full mt-6"
            />
            <span class="text-danger text-sm">{{
              errors.first("contraseña")
            }}</span>

            <vs-input
              type="password"
              v-validate="'required|min:8|max:128|confirmed:contraseña'"
              data-vv-validate-on="none"
              data-vv-as="confirmar contraseña"
              name="confirmar_contraseña"
              label-placeholder="Confirmar contraseña*"
              placeholder="Confirmar contraseña*"
              v-model="confirm_password"
              class="w-full mt-6"
            />
            <span class="text-danger text-sm">{{
              errors.first("confirmar_contraseña")
            }}</span>

            <vs-input
              v-validate="'required'"
              type="date"
              data-vv-as="fecha de nacimiento"
              data-vv-validate-on="none"
              name="fechaNac"
              label-placeholder="Fecha de nacimiento*"
              v-model="fecha_nac"
              class="w-full mt-8"
            />
            <span class="text-danger text-sm">{{
              errors.first("fechaNac")
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
              data-vv-validate-on="none"
              name="telefono"
              type="text"
              label-placeholder="Telefono*"
              placeholder="Telefono*"
              v-model="telefono"
              class="w-full mt-6"
            />
            <span class="text-danger text-sm">{{
              errors.first("telefono")
            }}</span>

            <vs-input
              v-validate="'required'"
              data-vv-validate-on="none"
              name="departamento"
              type="text"
              label-placeholder="Departamento*"
              placeholder="Departamento*"
              v-model="departamento"
              class="w-full mt-6"
            />
            <span class="text-danger text-sm">{{
              errors.first("departamento")
            }}</span>

            <vs-input
              v-validate="'required'"
              data-vv-validate-on="none"
              name="ciudad"
              type="text"
              label-placeholder="Ciudad*"
              placeholder="Ciudad*"
              v-model="ciudad"
              class="w-full mt-6"
            />
            <span class="text-danger text-sm">{{
              errors.first("ciudad")
            }}</span>

            <vs-input
              v-validate="'required'"
              data-vv-validate-on="none"
              name="calle"
              type="text"
              label-placeholder="Calle*"
              placeholder="Calle*"
              v-model="calle"
              class="w-full mt-6"
            />
            <span class="text-danger text-sm">{{ errors.first("calle") }}</span>

            <vs-input
              v-validate="'required'"
              data-vv-validate-on="none"
              name="codigo postal"
              type="text"
              label-placeholder="Codigo Postal*"
              placeholder="Código Postal*"
              v-model="codigo_postal"
              class="w-full mt-6"
            />
            <span class="text-danger text-sm">{{
              errors.first("codigo postal")
            }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="vx-row no-gutter px-8 justify-between d-theme-dark-bg">
      <router-link type="border" to="/acceder" class="mt-6 self-center"
      >Iniciar Sesión
      </router-link
      >
      <vs-button
        class="float-right mt-6"
        @click="registerUserJWt"
      >Registrarse
      </vs-button
      >
    </div>
  </div>
</template>

<script>

  import http from "../../../http/banitotServices";

  export default {
    data() {
      return {
        nombre: "",
        email: "",
        password: "",
        confirm_password: "",
        calle: "",
        ciudad: "",
        departamento: "",
        codigo_postal: "",
        fecha_nac: null,
        telefono: ""
      };
    },
    computed: {
      validateForm() {
        return (
          !this.errors.any() &&
          this.nombre !== "" &&
          this.email !== "" &&
          this.password !== "" &&
          this.confirm_password !== "" &&
          this.codigo_postal !== "" &&
          this.telefono !== "" &&
          this.calle !== "" &&
          this.ciudad !== "" &&
          this.departamento !== ""
        );
      }
    },
    methods: {

      registerUserJWt() {

        this.$validator.validateAll().then(success => {
          if (!success) return;

          this.$vs.loading()
          const payload = {
            name: this.nombre,
            email: this.email,
            password: this.password,
            password_confirmation: this.confirm_password,
            calle: this.calle,
            ciudad: this.ciudad,
            departamento: this.departamento,
            cp: this.codigo_postal,
            telefono: this.telefono,
            fecha_nac: this.fecha_nac
          };

          http.services.register(payload)
            .then(() => {
              this.$vs.notify({
                title: 'Genial!',
                text: "Se ha enviado un mail de confirmacion.",
                color: 'success',
                time: 4000
              });
              this.$vs.loading.close()
              this.$router.push("/");
            })
            .catch(err => {
              if (err.response) {
                if (err.response.data.error) {
                  if(err.response.data.error.email) {
                    this.$vs.notify({
                      title: 'Error',
                      text: "El mail ingresado ya existe.",
                      color: 'danger',
                      time: 4000
                    })
                  }else{
                    this.$vs.notify({
                      title: 'Error',
                      text: "Ha ocurrido un error inesperado",
                      color: 'danger',
                      time: 4000
                    })
                  }
                } else {
                  this.$vs.notify({
                    title: 'Error',
                    text: "Ha ocurrido un error inesperado",
                    color: 'danger',
                    time: 4000
                  })
                }
              } else {
                this.$vs.notify({
                  title: 'Error',
                  text: "Ha ocurrido un error inesperado",
                  color: 'danger',
                  time: 4000

                })
              }
              this.$vs.loading.close()
            })
        })
      }
    }
  };
</script>
