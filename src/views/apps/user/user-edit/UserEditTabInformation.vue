<template>
  <div id="user-edit-tab-info">
    <div class="vx-row">
      <div class="vx-col w-full md:w-1/2">
        <!-- Col Header -->
        <div class="flex items-end">
          <feather-icon icon="UserIcon" class="mr-2" svgClasses="w-5 h-5" />
          <span class="leading-none font-medium">Información Personal</span>
        </div>

        <!-- Col Content -->
        <div>
          <!-- DOB -->

          <div class="mt-4">
            <label class="text-sm">Fecha de nacimiento</label>
            <flat-pickr
              v-model="data_local.fecha_nac"
              :config="{ dateFormat: 'Y-m-d', maxDate: new Date() }"
              class="w-full"
              name="feha_nac"
            />
          </div>

          <vs-input
            class="w-full mt-4"
            label="Nombre"
            v-model="data_local.name"
            name="nombre"
          />

          <vs-input
            class="w-full mt-4"
            label="Email"
            v-model="data_local.email"
            name="email"
            readOnly
          />

          <vs-input
            class="w-full mt-4"
            label="Teléfono"
            v-model="data_local.telefono"
            name="telefono"
          />

          <vs-input
            class="w-full mt-4"
            label="Contraseña Anterior"
            v-model="passwordViejo"
            name="passwordViejo"
            type="password"
          />

          <vs-input
            class="w-full mt-4"
            label="Contraseña nueva"
            v-model="passwordNuevo"
            name="passwordNuevo"
            type="password"
          />
          <span class="text-danger text-sm"></span>
        </div>
      </div>

      <!-- Address Col -->
      <div class="vx-col w-full md:w-1/2">
        <!-- Col Header -->
        <div class="flex items-end md:mt-0 mt-base">
          <feather-icon icon="MapPinIcon" class="mr-2" svgClasses="w-5 h-5" />
          <span class="leading-none font-medium">Dirección</span>
        </div>

        <!-- Col Content -->
        <div>
          <vs-input
            class="w-full mt-4"
            label="Departamento"
            v-model="data_local.departamento"
            name="departamento"
          />

          <vs-input
            class="w-full mt-4"
            label="Ciudad"
            v-model="data_local.ciudad"
            name="ciudad"
          />

          <vs-input
            class="w-full mt-4"
            label="Calle"
            v-model="data_local.calle"
            name="calle"
          />

          <vs-input
            class="w-full mt-4"
            label="Código postal"
            v-model="data_local.cp"
            name="cp"
          />
        </div>
        <!-- Save & Reset Button -->
        <div class="vx-row">
          <div class="vx-col w-full">
            <div class="mt-8 flex flex-wrap items-center justify-end">
              <vs-button
                class="ml-auto mt-2"
                @click="save_changes"
                :disabled="!validateForm"
                >Guardar cambios</vs-button
              >
              <vs-button
                class="ml-4 mt-2"
                type="border"
                color="warning"
                @click="reset_data"
                >Reiniciar</vs-button
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import vSelect from "vue-select";
import http from "@/http/banitotServices";

export default {
  components: {
    vSelect,
    flatPickr
  },
  props: {
    data: {
      type: Object,
      required: true,
      nombre: "",
      email: "",
      passwordViejo: "",
      passwordNuevo: "",
      calle: "",
      ciudad: "",
      departamento: "",
      cp: "",
      fecha_nac: null,
      telefono: ""
    }
  },
  data() {
    return {
      data_local: JSON.parse(JSON.stringify(this.data)),
    };
  },
  computed: {
    validateForm() { 
        return (
          !this.errors.any() &&
          this.nombre !== "" &&
          this.passwordViejo !== "" &&
          this.passwordNuevo !== "" &&
          this.cp !== "" &&
          this.telefono !== "" &&
          this.calle !== "" &&
          this.ciudad !== "" &&
          this.departamento !== ""
        );
    }
  },
  methods: {
    save_changes() {
      if (!this.validateForm) return;

        const data = {
          name: this.data_local.name,
          email: this.data_local.email,
          password_Viejo: this.passwordViejo,
          password_Nuevo: this.passwordNuevo,
          calle: this.data_local.calle,
          ciudad: this.data_local.ciudad,
          departamento: this.data_local.departamento,
          cp: this.data_local.cp,
          telefono: this.data_local.telefono,
          fecha_nac: this.data_local.fecha_nac
        };

      http.services
        .updateUser(data)
        .then(() => {
            this.$vs.notify({
              title: 'Genial!',
              text: "Se ha actualizado el usuario correctamente.",
              color: 'success'
            })
          })
          .catch(err => {
              this.$vs.notify({
                title: 'Error',
                text: "Ha ocurrido un error inesperado",
                color: 'danger'
              })
          })


      // Here will go your API call for updating data
      // You can get data in "this.data_local"

      /* eslint-enable */
    },
    reset_data() {
      this.data_local = Object.assign({}, this.data);
    }
  }
};
</script>
