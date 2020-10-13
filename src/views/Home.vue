<template>
  <div>
    <header>
      <app-navbar></app-navbar>
    </header>
    <main>
      <app-page-progress v-if="isLoading"></app-page-progress>
      <div v-if="!isLoading" class="container">
        <div class="box">
          <h2 class="subtitle">
            Create and share beautiful images of your source code. Start typing
            or drop a file into the text area to get started. Twilight Auto
          </h2>
          <ValidationObserver v-slot="{ handleSubmit }">
            <form @submit.prevent="handleSubmit(onSubmit)">
              <div class="columns form-container">
                <!-- <div class="loading-container" v-if="isLoading">
                  <div class="lds-ring">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                </div> -->
                <div class="column is-6 p-3">
                  <!-- select languange -->
                  <ValidationProvider
                    name="Languange"
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <div class="field">
                      <label class="label">Languange</label>
                      <app-form-select
                        :data="getLanguanges"
                        :value="language"
                        title="Languange"
                        @input="updateSelectedLanguage"
                      ></app-form-select>
                    </div>

                    <p class="text-error">{{ errors[0] }}</p>
                  </ValidationProvider>

                  <!-- select twoslash if selected languange is typescript or json-->
                  <div
                    class="field"
                    v-if="language === 'typescript' || language === 'json'"
                  >
                    <label class="label">Twoslash</label>
                    <app-form-select
                      :data="getTwoslashes"
                      :value="twoslash"
                      title="Twoslash"
                      @input="updateSelectedTwoslash"
                    ></app-form-select>
                  </div>

                  <!-- input filename of code -->
                  <ValidationProvider
                    name="filename"
                    rules="filename|required"
                    v-slot="{ errors }"
                  >
                    <div class="field mb-0">
                      <label class="label">Filename</label>
                      <app-form-input
                        v-model="filename"
                        placeholder="Enter your code filename, e.g index.js"
                        :value="filename"
                      ></app-form-input>
                    </div>
                    <p class="text-error">{{ errors[0] }}</p>
                  </ValidationProvider>

                  <ValidationProvider
                    name="highlightRow"
                    rules="required|highlightRow"
                    v-slot="{ errors }"
                  >
                    <!-- input highlight of code -->
                    <div class="field mb-0">
                      <label class="label">Highlight Row</label>
                      <app-form-input
                        v-model="highlightRow"
                        placeholder="Enter your code highlight, e.g 1 or 1,2,3 or 1-3"
                        :value="highlightRow"
                      ></app-form-input>
                    </div>

                    <p class="text-error">{{ errors[0] }}</p>
                  </ValidationProvider>
                </div>
                <div class="column is-6 p-3">
                  <!-- your code -->
                  <ValidationProvider
                    name="code"
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <div class="field mb-0">
                      <label class="label">Code</label>
                      <app-text-area
                        placeholder="Paste your code here..."
                        v-model="code"
                        :value="code"
                      ></app-text-area>
                    </div>
                    <p class="text-error">{{ errors[0] }}</p>
                  </ValidationProvider>

                  <div class="button-container">
                    <app-button
                      class="mr-2"
                      title="Reset"
                      @buttonClicked="reset"
                      type="reset"
                    ></app-button>
                    <app-button
                      title="Save"
                      type="submit"
                      @buttonClicked="save"
                    ></app-button>
                  </div>
                </div>
              </div>
            </form>
          </ValidationObserver>
        </div>
      </div>
    </main>

    <app-modal-result-code :data="data" :active="showModal">
    </app-modal-result-code>
  </div>
</template>

<script>
import AppNavbar from "../components/AppNavbar";
import AppFormSelect from "../components/AppFormSelect";
import AppFormInput from "../components/AppFormInput";
import AppTextArea from "../components/AppTextArea";
import AppButton from "../components/AppButton";
import AppModalResultCode from "../components/AppModalResultCode";
import AppPageProgress from "../components/AppPageProgress";

export default {
  components: {
    AppNavbar,
    AppFormSelect,
    AppFormInput,
    AppTextArea,
    AppButton,
    AppModalResultCode,
    AppPageProgress,
  },
  data() {
    return {
      errors: {
        filename: "",
      },
      language: "",
      twoslash: "",
      filename: "",
      highlightRow: "",
      code: "",
      isLoading: false,
      showModal: false,
      data: {},
    };
  },
  created() {
    this.$store.dispatch("code/retrieveOptions");
  },
  methods: {
    closeModal() {
      this.showModal = false;
    },
    onSubmit() {
      if (this.language && this.highlightRow && this.filename && this.code) {
        if (this.language == "javascript" || this.language == "json") {
          this.save;
        }
      }
    },
    updateSelectedLanguage(value) {
      this.language = value;
    },
    updateSelectedTwoslash(value) {
      this.twoslash = value;
    },
    reset() {
      this.language = "";
      this.twoslash = "";
      this.filename = "";
      this.highlightRow = "";
      this.code = "";
    },
    async save() {
      this.isLoading = true;
      let lang = this.filename.replace(" ", "").split(".");
      lang = lang[lang.length - 1];
      const data = {
        code: this.code,
        lang: lang,
        highlight: this.highlightRow,
        fileName: this.filename,
        twoslash: this.twoslash,
      };
      await this.$store.dispatch("code/storeCode", data).then((response) => {
        this.$store
          .dispatch("code/getSingleCode", {
            isHighlighted: 1,
            id: response.id,
            user: response.user,
          })
          .then((response) => {
            this.data = response;
            this.reset();
            console.log(response);
          });
      });

      this.isLoading = false;
      this.showModal = true;
    },
  },
  computed: {
    getLanguanges() {
      return this.$store.getters["code/getLanguages"];
    },
    getTwoslashes() {
      return this.$store.getters["code/getTwoslashes"];
    },
  },
};
</script>

<style scoped>
main {
  padding: 70px 0;
  position: relative;
  height: 100%;
}

.title {
  margin-bottom: 2rem !important;
  font-size: 3rem;
}

.subtitle {
  font-size: 1.2rem;
  margin-bottom: 2.5rem !important;
}

.label {
  font-weight: 500;
}

.button-container {
  display: flex;
  justify-content: flex-end;
}

.box {
  padding: 25px;
}
.text-error {
  font-size: 0.9rem;
  color: #f14668;
  margin-top: 0.3rem;
  margin-bottom: 0.8rem;
}

.lds-ring {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 64px;
  height: 64px;
  margin: 8px;
  border: 8px solid #fff;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: rgb(88, 88, 88) transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* .form-container {
  position: relative;
}

.loading-container {
  border-radius: 10px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.1);
  position: absolute;
  z-index: 1;
} */
</style>