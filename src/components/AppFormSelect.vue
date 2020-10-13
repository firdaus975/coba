<template >
  <div class="control is-expanded">
    <div class="select select is-fullwidth">
      <select
        @change="onValueChanged"
        :disabled="getProgress"
        :class="{ 'is-loading': getProgress }"
      >
        <option value="" disabled selected>Select {{ title }}</option>
        <option
          v-for="(value, index) in data"
          :key="index"
          :value="selectedValue(value)"
          :selected="isSelected(value)"
        >
          {{ value }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  name: "app-form-select",
  props: {
    title: {
      type: String,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },
    value: {
      type: String,
    },
  },
  methods: {
    onValueChanged(event) {
      if (event.target.value && event.target.value.length > 0) {
        this.$emit("input", event.target.value);
      } else {
        this.$emit("input", null);
      }
    },
  },
  computed: {
    isSelected() {
      return (selectedItem) => {
        return this.value === selectedItem;
      };
    },
    selectedValue() {
      return (selectedValue) => {
        return selectedValue;
      };
    },
    getProgress() {
      return this.$store.getters["progress/getProgress"];
    },
  },
};
</script>