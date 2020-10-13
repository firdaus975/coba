<template>
  <div class="modal" :class="getIsActive">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ data.fileName }}</p>
        <button
          class="delete"
          @click="active = false"
          aria-label="close"
        ></button>
      </header>
      <section class="modal-card-body" v-html="data.code"></section>
      <footer class="modal-card-foot">
        <router-link :to="{ name: 'codeList' }">See all code lists</router-link>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: "app-modal-result-code",
  props: {
    active: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Object,
      required: true,
    },
  },
  computed: {
    getIsActive() {
      if (this.active == true) {
        return "is-active";
      }
      return "";
    },
  },
};
</script>