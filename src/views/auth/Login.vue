<template>
  <div>
    <main>
      <div class="form-container">
        <h1 class="is-size-2 mb-3 is-capitalized has-text-weight-semibold">
          Login...
        </h1>

        <div>
          <app-alert-message
            v-if="errorMessage"
            color="is-danger"
            :message="errorMessage"
          ></app-alert-message>

          <app-alert-message
            v-if="successMessage"
            color="is-success"
            :message="successMessage"
          ></app-alert-message>
        </div>
        <ValidationObserver v-slot="{ handleSubmit }">
          <form @submit.prevent="handleSubmit(onSubmit)">
            <ValidationProvider
              name="name"
              rules="min:5|required"
              v-slot="{ errors }"
            >
              <div class="field is-grouped mb-0">
                <app-form-input
                  v-model="name"
                  placeholder="Enter your username"
                  :borderColor="inputBorderColor || errors[0]"
                ></app-form-input>

                <app-button
                  @buttonClicked="login"
                  :isLoading="getProgress"
                  title="Login"
                  type="submit"
                ></app-button>
              </div>
              <p class="error-text">{{ errors[0] }}</p>
            </ValidationProvider>
          </form>
        </ValidationObserver>

        <div class="is-size-6 mt-3">
          Don't have an account?
          <router-link :to="{ name: 'register' }">Sign Up</router-link>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import AppFormInput from "../../components/AppFormInput";
import AppButton from "../../components/AppButton";
import AppAlertMessage from "../../components/AppAlertMessage";
export default {
  components: {
    AppFormInput,
    AppButton,
    AppAlertMessage,
  },
  props: {
    dataSuccessMessage: {
      type: String,
    },
  },
  data() {
    return {
      name: "",
      errorMessage: "",
      successMessage: this.dataSuccessMessage,
      inputBorderColor: "",
      value: "",
    };
  },
  methods: {
    onSubmit() {
      this.login();
    },

    login() {
      if (this.name.length != 0) {
        this.$store
          .dispatch("user/login", this.name)
          .then((res) => {
            this.successMessage = res;
            this.$router.push({ name: "home" });
          })
          .catch((error) => {
            this.inputBorderColor = "is-danger";
            this.errorMessage = `Login failed, ${error}`;
            this.name = "";
          });
      }
    },
  },
  computed: {
    getProgress() {
      return this.$store.getters["progress/getProgress"];
    },
  },
};
</script>

<style  scoped>
main {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.form-container {
  width: 40%;
}

.error-text {
  font-size: 0.9rem;
  color: #f14668;
  margin-top: 0.3rem;
}
</style>
