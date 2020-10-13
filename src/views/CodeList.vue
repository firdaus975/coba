<template>
  <div>
    <app-page-progress v-if="getProgress"></app-page-progress>
    <header>
      <app-navbar></app-navbar>
    </header>
    <div>
      <main>
        <div class="container">
          <div class="columns is-multiline mt-6">
            <div
              v-for="(code, index) in getCodes"
              :key="index"
              class="column is-6"
            >
              <app-card-code-item :code="code"></app-card-code-item>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>


<script>
import AppNavbar from "../components/AppNavbar";
import AppCardCodeItem from "../components/AppCardCodeItem";
import AppPageProgress from "../components/AppPageProgress";
export default {
  components: {
    AppNavbar,
    AppCardCodeItem,
    AppPageProgress,
  },
  created() {
    this.$store.dispatch("code/geListCode");
  },
  computed: {
    getCodes() {
      return this.$store.state.code.codes;
    },
    getProgress() {
      return this.$store.getters["progress/getProgress"];
    },
  },
};
</script>

<style scoped>
body {
  position: relative;
}
</style>