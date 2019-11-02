<template>
  <div>
    <q-table title="Alumnos" :data="students" :columns="columns">
      <template v-slot:top>
        <q-input borderless dense debounce="300" color="primary" v-model="filter">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="nombre" :props="props">{{ props.row.nombres }}</q-td>
          <q-td>
            <q-btn-group>
              <q-btn
                color="green"
                @click="takeAssistance(props.row.idAlumno, props.row.idCurso, 'presente')"
              >Presente</q-btn>
              <q-btn
                color="red"
                @click="takeAssistance(props.row.idAlumno, props.row.idCurso, 'ausente')"
              >Ausente</q-btn>
            </q-btn-group>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>
<script>
export default {
  name: "AsistenciaForm",
  data() {
    return {
      students: [],
      filter: "",
      columns: [
        {
          name: "nombre",
          label: "Nombre",
          field: "nombres",
          sortable: true
        },
        {
          name: "opciones",
          label: "Opciones"
        }
      ]
    };
  },
  computed: {
    courseId: {
      get() {
        return this.$route.params.courseId;
      }
    }
  },
  created() {
    this.getStudents();
  },
  methods: {
    getStudents() {
      this.$axios
        .get(`http://localhost:8080/alumnos/${this.courseId}/cursos`)
        .then(response => {
          this.students = response.data;
          console.log(this.students);
        })
        .catch(error => {
          console.error(error);
        });
    },
    takeAssistance(studentId, courseId, status) {
      console.log(`${studentId} ${courseId} ${status}`);
      this.$axios
        .post(`http://localhost:8080/asistencia`, {
          id_alumno: studentId,
          id_curso: courseId,
          estadoid_alumnoid_cursonombres: status
        })
        .then(response => {
          console.log(response.result);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
};
</script>