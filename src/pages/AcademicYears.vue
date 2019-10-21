<template>
  <q-page padding>
    <AcademicYearForm v-if="showAcademicYearForm" />
    <AcademicYearList v-if="showAcademicYearList" />
  </q-page>
</template>

<script>
import AcademicYearList from "../components/academicyears/AcademicYearList";
import AcademicYearForm from "../components/academicyears/AcademicYearForm";

export default {
  name: "AcademicYears",
  components: {
    AcademicYearList,
    AcademicYearForm
  },
  computed: {
    showAcademicYearForm: {
      get() {
        return this.$store.state.notas.showAcademicYearForm;
      }
    },
    showAcademicYearList: {
      get() {
        return this.$store.state.notas.showAcademicYearList;
      }
    }
  }
};
</script>
