<template>
  <div class="q-pa-md">
    <h3>Maestro</h3>
    <q-form class="q-gutter-md">
      <q-input outlined v-model="teacher.nombre" label="Nombres" />
      <q-input outlined v-model="teacher.apellido" label="Apellidos" />
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
  name: "TeacherForm",
  data() {
    return {
      teacher: {
        nombre: "",
        apellido: ""
      }
    };
  },
  computed: {
    id: {
      get() {
        return this.$store.state.notas.teacherToEdit;
      }
    }
  },
  created() {
    if (this.id) {
      this.getTeacher(this.id);
    }
  },
  methods: {
    getTeacher(id) {
      this.$axios
        .get(`http://localhost:8080/maestros/${id}`)
        .then(response => {
          this.teacher = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
    save() {
      //delete this.teacher.pagos;
      this.$axios
        .post("http://localhost:8080/maestros", this.teacher)
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    },
    update() {
      //delete this.teacher.pagos;
      this.$axios
        .put(`http://localhost:8080/maestros/${this.id}`, this.teacher)
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    },
    close() {
      const id = 0;
      this.$store.commit("notas/updateShowTeacherForm", { id });
      this.$store.commit("notas/updateShowTeacherList");
      this.clean();
    },
    clean() {
      this.id = 0;
      this.teacher.nombre = "";
      this.teacher.apellido = "";
    }
  }
};
</script>
