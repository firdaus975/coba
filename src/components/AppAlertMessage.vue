<template>
  <div>
    <article class="message mb-3" :class="color">
      <div class="message-body p-2 is-size-6">{{ message }}</div>
    </article>
  </div>
</template>

<script>
export default {
  name: "app-alert-message",
  props: {
    color: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
};
</script>