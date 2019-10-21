<template>
  <div class="q-pa-md">
    <h3>Student form</h3>
    <q-form class="q-gutter-md">
      <q-input outlined v-model="student.nombre" label="Nombres" />
      <q-input outlined v-model="student.apellido" label="Apellidos" />
      <q-input outlined v-model="student.contactoEmergencia" label="Contacto emergencia" />
      <q-select
        outlined
        v-model="student.grado"
        :options="grados"
        option-value="id"
        option-label="nombre"
        map-options
        label="Grados"
      />
      <q-btn-group outline>
        <q-btn color="primary" label="Guardar" @click="save" />
        <q-btn color="secondary" label="Cancelar" />
      </q-btn-group>
    </q-form>
  </div>
</template>
<script>
export default {
  name: 'StudentForm',
  props: {
    id: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      student: {
        foto:
          'https://www.bsn.eu/wp-content/uploads/2016/12/user-icon-image-placeholder-300-grey.jpg',
        nombre: '',
        apellido: '',
        contactoEmergencia: '',
        grado: () => ({}),
      },
      grados: [],
    };
  },
  mounted() {
    this.getGrados();
    if (this.id) {
      this.getAlumno(this.id);
    }
  },
  methods: {
    getGrados() {
      this.$axios
        .get('http://localhost:8080/anios')
        .then((response) => {
          this.grados = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    getAlumno(id) {
      this.$axios
        .get(`http://localhost:8080/alumnos/${id}`)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    save() {
      delete this.student.grado;
      this.$axios
        .post('http://localhost:8080/alumnos', this.student)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>
