<template>
  <div class="control is-expanded">
    <textarea
      class="textarea"
      :placeholder="placeholder"
      @input="updateValue"
      :value="value"
    ></textarea>
  </div>
</template>

<script>
export default {
  name: "app-text-area",
  props: {
    placeholder: {
      type: String,
      required: true,
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
};
</script>