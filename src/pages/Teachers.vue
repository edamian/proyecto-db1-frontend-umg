<template>
  <div>
    <TeacherForm v-if="showTeacherForm" />
    <TeacherList v-if="showTeacherList" />
  </div>
</template>

<script>
import TeacherList from "../components/teachers/TeacherList";
import TeacherForm from "../components/teachers/TeacherForm";

export default {
  name: "Teachers",
  components: {
    TeacherList,
    TeacherForm
  },
  computed: {
    showTeacherForm: {
      get() {
        return this.$store.state.notas.showTeacherForm;
      }
    },
    showTeacherList: {
      get() {
        return this.$store.state.notas.showTeacherList;
      }
    }
  }
};
</script>

<style>
</style>