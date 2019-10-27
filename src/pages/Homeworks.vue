<template>
  <div>
    <HomeworkForm v-if="showHomeworkForm" />
    <HomeworkList v-if="showHomeworkList" />
  </div>
</template>

<script>
import HomeworkList from "../components/homework/HomeworkList";
import HomeworkForm from "../components/homework/HomeworkForm";

export default {
  name: "Homeworks",
  components: {
    HomeworkList,
    HomeworkForm
  },
  computed: {
    showHomeworkForm: {
      get() {
        return this.$store.state.notas.showHomeworkForm;
      }
    },
    showHomeworkList: {
      get() {
        return this.$store.state.notas.showHomeworkList;
      }
    }
  }
};
</script>

<style>
</style>