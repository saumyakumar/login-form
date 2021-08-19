<template>
  <v-row class="text-center">
    <v-col cols="12">
      <v-alert
        v-model="alert"
        dismissible
        close-icon="mdi-delete"
        color="red"
        border="left"
        elevation="2"
        colored-border
      >
        {{ alertMsg }}
      </v-alert>
      <h2>Login Page</h2>
      <v-card class="mx-auto" max-width="400">
        <v-img
          src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
          height="200px"
        ></v-img>
        <v-col cols="12">
          <v-form v-model="valid" @submit.prevent="submit">
            <v-text-field
              v-model="user.email"
              :rules="[rules.required, rules.email]"
              label="Email*"
              placeholder="Enter your email"
              prepend-inner-icon="mdi-receipt"
              outlined
              type="email"
            ></v-text-field>

            <v-btn :disabled="!valid" type="submit" color="primary" block>
              LOGIN</v-btn
            >
          </v-form>
        </v-col>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
/* eslint-disable no-debugger */

export default {
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    valid: false,
    rules: {
      required: (value) => !!value || "Required.",
      email: (value) => {
        const pattern =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Invalid e-mail.";
      },
    },
    alert: false,
    alertMsg: "",
  }),

  methods: {
    submit() {
      localStorage.setItem("email", JSON.stringify(this.user.email));
      this.$router.push({ path: "/Home" });
    },
  },
};
</script>
