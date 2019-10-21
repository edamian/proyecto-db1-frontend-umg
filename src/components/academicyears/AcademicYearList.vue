<template>
  <div class="q-pa-md">
    <q-table title="Students" :data="academicYears" :columns="columns">
      <template v-slot:top>
        <q-btn flat dense color="primary" label="Agregar" @click="addRow(0)" />
        <q-space />
        <q-input borderless dense debounce="300" color="primary" v-model="filter">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="nombre">{{ props.row.nombre }}</q-td>
          <q-td>
            <q-btn-group>
              <q-btn color="green" @click="addRow(props.row.id)">Editar</q-btn>
              <q-btn color="red" @click="deleteRow(props.row.id)">Eliminar</q-btn>
            </q-btn-group>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>
<script>
export default {
  name: "AcademicYearList",
  data() {
    return {
      filter: "",
      academicYears: [],
      columns: [
        {
          name: "Año",
          label: "Año",
          field: "nombre",
          sortable: true
        },
        {
          name: "opciones",
          label: "Opciones",
          field: "id"
        }
      ]
    };
  },
  created() {
    this.getAcademicYears();
  },
  methods: {
    getAcademicYears() {
      this.$axios
        .get("http://localhost:8080/anios")
        .then(response => {
          this.academicYears = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
    addRow(id) {
      this.$store.commit("notas/updateShowAcademicYearForm", { id });
      this.$store.commit("notas/updateShowAcademicYearList");
    },
    deleteRow(id) {
      this.$axios
        .delete(`http://localhost:8080/anios/${id}`)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
};
</script>
<style lang="stylus"></style>
