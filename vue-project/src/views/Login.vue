<template>
  <LoginForm :user="data" />
</template>

<script>
import LoginForm from "@/components/LoginForm.vue";
export default {
  components: {
    LoginForm,
  },
  data: () => ({
    data: {
      email: "",
    },
  }),
};
</script>
