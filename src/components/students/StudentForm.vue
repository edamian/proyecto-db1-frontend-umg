<template>
  <div class="q-pa-md">
    <h3>Alumno</h3>
    <q-form class="q-gutter-md">
      <q-input outlined v-model="student.nombre" label="Nombres" />
      <q-input outlined v-model="student.apellido" label="Apellidos" />
      <q-input outlined v-model="student.contactoEmergencia" label="Contacto emergencia" />
      <q-select
        outlined
        v-model="academicYear"
        :options="academicYears"
        label="Anio"
        option-value="id"
        option-label="nombre"
      />
      <q-btn-group outline>
        <q-btn color="primary" v-if="id == 0" label="Guardar" @click="save" />
        <q-btn color="primary" v-if="id > 0" label="Editar" @click="update" />
        <q-btn color="secondary" label="Cancelar" @click="close" />
      </q-btn-group>
    </q-form>
  </div>
</template>
<script>
export default {
  name: "StudentForm",
  data() {
    return {
      student: {
        id: 0,
        foto:
          "https://www.bsn.eu/wp-content/uploads/2016/12/user-icon-image-placeholder-300-grey.jpg",
        nombre: "",
        apellido: "",
        contactoEmergencia: ""
      },
      academicYears: [],
      academicYear: {}
    };
  },
  computed: {
    id: {
      get() {
        return this.$store.state.notas.studentToEdit;
      }
    }
  },
  created() {
    if (this.id) {
      this.getAlumno(this.id);
    }
    this.getAcademicYears();
  },
  methods: {
    getAcademicYears() {
      this.$axios
        .get(`http://localhost:8080/anios`)
        .then(response => {
          this.academicYears = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
    getAlumno(id) {
      this.$axios
        .get(`http://localhost:8080/alumnos/${id}`)
        .then(response => {
          this.student = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
    save() {
      delete this.student.pagos;
      this.student.id_anio = this.academicYear.id;
      this.$axios
        .post("http://localhost:8080/alumnos", this.student)
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    },
    update() {
      delete this.student.pagos;
      this.$axios
        .put(`http://localhost:8080/alumnos/${this.id}`, this.student)
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    },
    close() {
      const id = 0;
      this.$store.commit("notas/updateShowStudentForm", { id });
      this.$store.commit("notas/updateShowStudentList");
      this.clean();
    },
    clean() {
      this.student.id = 0;
      this.student.foto = "";
      this.student.nombre = "";
      this.student.apellido = "";
      this.student.contactoEmergencia = "";
    }
  }
};
</script>
