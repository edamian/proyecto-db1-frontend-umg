<template>
  <div class="q-pa-md">
    <h3>Grado</h3>
    <q-form class="q-gutter-md">
      <q-input outlined v-model="academicYear.nombre" />
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
  name: "AcademicYearForm",
  data() {
    return {
      academicYear: {
        id: 0,
        name: ""
      }
    };
  },
  computed: {
    id: {
      get() {
        return this.$store.state.notas.academicYearToEdit;
      }
    }
  },
  created() {
    if (this.id) {
      this.getAcademicYear(this.id);
    }
  },
  methods: {
    getAcademicYear(id) {
      this.$axios
        .get(`http://localhost:8080/anios/${id}`)
        .then(response => {
          this.academicYear = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
    save() {
      delete this.academicYear.cursos;
      this.$axios
        .post("http://localhost:8080/anios", this.academicYear)
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    },
    update() {
      delete this.academicYear.cursos;
      this.$axios
        .put(`http://localhost:8080/anios/${this.id}`, this.academicYear)
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    },
    close() {
      const id = 0;
      this.$store.commit("notas/updateShowAcademicYearForm", { id });
      this.$store.commit("notas/updateShowAcademicYearList");
      this.clean();
    },
    clean() {
      this.academicYear.id = 0;
      this.academicYear.name = "";
    }
  }
};
</script>