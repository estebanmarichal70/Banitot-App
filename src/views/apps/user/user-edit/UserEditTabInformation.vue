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
            label="Contraseña nueva"
            v-model="passwordNuevo"
            name="passwordNuevo"
            type="password"
          />

          <vs-input
            class="w-full mt-4"
            label="Contraseña actual"
            v-model="passwordViejo"
            name="passwordViejo"
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
                :disabled="contador == 0"
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
      required: true
    }
  },
  data() {
    return {
      data_local: JSON.parse(JSON.stringify(this.data)),
      nombre: "",
      email: "",
      passwordViejo: "",
      passwordNuevo: "",
      calle: "",
      ciudad: "",
      departamento: "",
      cp: "",
      fecha_nac: null,
      telefono: "",
      contador: 0,
      usuarioActualizado: {}
    };
  },
  watch: {
    data_local: {
      handler() {
        if (this.data.name !== this.data_local.name && this.data_local.name !== "") {
            this.usuarioActualizado.nombre = this.data_local.name;
            this.contador = this.contador + 1;
        }
        if (this.data.telefono !== this.data_local.telefono && this.data_local.telefono !== "") {
            this.usuarioActualizado.telefono = this.data_local.telefono;
            this.contador = this.contador + 1;
        }
        if (this.data.departamento !== this.data_local.departamento && this.data_local.departamento !== "") {
            this.usuarioActualizado.departamento = this.data_local.departamento;
            this.contador = this.contador + 1;
        }
        if (this.data.cp !== this.data_local.cp && this.data_local.cp !== "") {
            this.usuarioActualizado.cp = this.data_local.cp;
            this.contador = this.contador + 1;
        }
        if (this.data.calle !== this.data_local.calle && this.data_local.calle !== "") {
            this.usuarioActualizado.calle = this.data_local.calle;
            this.contador = this.contador + 1;
        }
        if (this.data.ciudad !== this.data_local.ciudad && this.data_local.ciudad !== "") {
            this.usuarioActualizado.ciudad = this.data_local.ciudad;
            this.contador = this.contador + 1;
        }
      },
      deep: true
    },
    passwordViejo() {
      if(this.passwordViejo !== "" && this.passwordNuevo !== ""){
        this.usuarioActualizado.passwordViejo = this.passwordViejo;
        this.usuarioActualizado.passwordNuevo = this.passwordNuevo;
        this.contador = this.contador + 1;
      }
    }
  },
  methods: {
    save_changes() {
      this.contador = 0;
      http.services
        .updateUser(this.usuarioActualizado)
        .then(() => {
          this.$vs.notify({
            title: "Genial!",
            text: "Se ha actualizado el usuario correctamente.",
            color: "success"
          });
        })
        .catch(err => {
          this.$vs.notify({
            title: "Error",
            text: err.response.data.error,
            color: "danger"
          });
        });
    },
    reset_data() {
      this.data_local = Object.assign({}, this.data);
    }
  }
};
</script>
