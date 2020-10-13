<template>
  <div class="control">
    <button
      @click="buttonClicked"
      class="button is-primary"
      :class="{ 'is-loading': isLoading }"
      :disabled="isLoading"
      :type="type"
    >
      {{ title }}
    </button>
  </div>
</template>

<script>
export default {
  name: "app-button",
  props: {
    title: {
      type: String,
      required: true,
    },
    isLoading: {
      type: Boolean,
    },
    type: {
      type: String,
    },
  },
  methods: {
    buttonClicked(event) {
      this.$emit("buttonClicked", event);
    },
  },
  computed: {
    getProgress() {
      return this.$store.getters["progress/getProgress"];
    },
  },
};
</script>