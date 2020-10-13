
<template>
  <div class="control is-expanded">
    <input
      class="input"
      :placeholder="placeholder"
      :disabled="getProgress"
      @input="updateValue"
      :class="borderColor"
      :value="value"
    />
  </div>
</template>

<script>
export default {
  name: "app-form-input",
  props: {
    placeholder: {
      type: String,
      required: true,
    },
    borderColor: {
      type: String,
      default: "",
    },
    value: {
      type: String,
      default: "",
    },
  },
  methods: {
    updateValue(event) {
      this.$emit("input", event.target.value);
    },
  },
  computed: {
    getProgress() {
      return this.$store.getters["progress/getProgress"];
    },
  },
};
</script>