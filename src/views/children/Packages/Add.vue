<template>
  <div class="create_wrapper">
    <!-- Start Breadcrumb -->
    <Breadcrumb :items="items" />
    <!-- End Breadcrumb -->

    <div class="custom_card">
      <div class="card-header">
        <h4 class="card-title">{{ $t('addNew') }}</h4>
      </div>

      <!-- ==== Start Form ==== -->
      <form @submit.prevent="validateForm">
        <div class="container">
          <div class="row justify-content-between">
            <!-- Start:: title -->
            <div class="col-lg-6 py-0">
              <div class="input_wrapper top_label">
                <input
                  type="text"
                  class="form-control"
                  @input="
                    helper_checkIfInputIsEmpty
                    addDataLocalStorage()
                  "
                  v-model.trim="data.title"
                />
                <label for="name_input" class="form-label">
                  {{ $t('forms.labels.title') }}
                </label>
              </div>
            </div>
            <!-- End:: title-->
            <!-- Start:: price -->
            <div class="col-lg-6 py-0">
              <div class="input_wrapper top_label">
                <input
                  type="number"
                  class="form-control"
                  @input="
                    helper_checkIfInputIsEmpty
                    addDataLocalStorage()
                  "
                  v-model.trim="data.price"
                />
                <label for="name_input" class="form-label">
                  {{ $t('forms.labels.price') }}
                </label>
              </div>
            </div>
            <!-- End:: price-->

            <!-- Start:: desc -->

            <div class="col-lg-6 py-0">
              <div class="input_wrapper top_label">
                <textarea
                  class="form-control"
                  @input="
                    helper_checkIfInputIsEmpty
                    addDataLocalStorage()
                  "
                  v-model.trim="data.desc"
                ></textarea>
                <label for="name_input" class="form-label">
                  {{ $t('forms.labels.desc') }}
                </label>
              </div>
            </div>

            <!-- Start:: desc -->

            <div class="col-lg-6 py-0">
              <div class="input_wrapper top_label">
                <textarea
                  class="form-control"
                  @input="
                    helper_checkIfInputIsEmpty
                    addDataLocalStorage()
                  "
                  v-model.trim="data.note"
                ></textarea>
                <label for="name_input" class="form-label">
                  {{ $t('forms.labels.note') }}
                </label>
              </div>
            </div>
            <!-- End:: desc-->

            <!-- Start:: price -->
            <div class="col-lg-6 py-0">
              <div class="input_wrapper top_label">
                <input
                  type="number"
                  class="form-control"
                  @input="
                    helper_checkIfInputIsEmpty
                    addDataLocalStorage()
                  "
                  v-model.trim="data.duration_by_month"
                />
                <label for="name_input" class="form-label">
                  {{ $t('forms.labels.duration_by_month') }}
                </label>
              </div>
            </div>
            <!-- End:: price-->

            <!-- Start:: Types -->
            <div class="col-lg-6 py-0">
              <div class="input_wrapper top_label">
                <label class="form-label">
                  {{ $t('forms.labels.type') }}
                </label>
                <multiselect
                  v-model="data.type"
                  :options="types"
                  label="name"
                  track-by="id"
                  placeholder=" "
                  :searchable="true"
                  :allow-empty="false"
                  :show-labels="false"
                ></multiselect>
              </div>
            </div>
            <!-- End:: Types -->
          </div>
        </div>

        <div class="buttons_wrapper">
          <button class="button_style_1" :disabled="btnIsLoading">
            {{ $t('forms.submit') }}
            <span class="btn_loader" v-if="btnIsLoading"></span>
          </button>
        </div>
      </form>
      <!-- ==== End Form ==== -->
    </div>
    <!-- Start Image_Model -->
    <base-model
      @closeModel="model_1.show_model = false"
      :show="model_1.show_model"
    >
      <div class="image">
        <embed
          type="video/webm"
          :src="model_1.model_img_src"
          width="100%"
          style="max-height: 50rem; min-height: 20rem;"
        />
      </div>
    </base-model>
    <!-- End Image_Model -->
  </div>
</template>

<script>
import { json } from 'body-parser'

export default {
  name: 'Create',

  data() {
    return {
      // ========== Breadcrumbs
      items: [
        {
          text: this.$t('breadcrumb.mainPage'),
          disabled: false,
          href: '/',
        },
        {
          text: this.$t('breadcrumb.packages.title'),
          disabled: false,
          href: '/packages/show-all',
        },
        {
          text: this.$t('breadcrumb.packages.add'),
          disabled: true,
          href: '',
        },
      ],

      // ========== Loading
      btnIsLoading: false,
      dateMenu: false,
      // ========== Data
      data: {
        note: null,
        price: null,
        title: null,
        desc: null,
        type: null,
        duration_by_month: null,
      },

      // ========== Select Lists Data
      // ========== Model
      model_1: {
        show_model: false,
        model_img_src: '',
      },
      types: [
        {
          id: 'free',
          name: 'مجاني',
        },
        { id: 'supplier_package', name: 'حزمة المورد' },
        {
          id: 'package_agents_and_distributors',
          name: 'باقة الوكلاء والموزعين',
        },
        { id: 'package_inclusive', name: 'باقة شاملة' },
      ],
    }
  },

  mounted() {
    this.getDataLocalStorage()
  },

  methods: {
    addDataLocalStorage() {
      localStorage.setItem('packages_data', JSON.stringify(this.data))
    },
    // ============ Get Select Lists Data
    getDataLocalStorage() {
      if (localStorage.getItem('packages_data')) {
        this.data = JSON.parse(localStorage.getItem('packages_data'))
      }
    },
    show_model_1(e) {
      this.model_1.model_img_src = e.path
      this.model_1.show_model = true
    },
    // Validate Data
    validateForm() {
      this.btnIsLoading = true

      if (!this.data.title) {
        this.$iziToast.error({
          timeout: 2000,
          message: this.$t('forms.validation.title'),
          position: 'bottomRight',
        })
        this.btnIsLoading = false
        return
      } else if (!this.data.desc) {
        this.$iziToast.error({
          timeout: 2000,
          message: this.$t('forms.validation.desc'),
          position: 'bottomRight',
        })
        this.btnIsLoading = false
        return
      } else if (!this.data.price) {
        this.$iziToast.error({
          timeout: 2000,
          message: this.$t('forms.validation.price'),
          position: 'bottomRight',
        })
        this.btnIsLoading = false
        return
      } else if (!this.data.note) {
        this.$iziToast.error({
          timeout: 2000,
          message: this.$t('forms.validation.note'),
          position: 'bottomRight',
        })
        this.btnIsLoading = false
        return
      } else if (!this.data.duration_by_month) {
        this.$iziToast.error({
          timeout: 2000,
          message: this.$t('forms.validation.duration_by_month'),
          position: 'bottomRight',
        })
        this.btnIsLoading = false
        return
      } else if (!this.data.type) {
        this.$iziToast.error({
          timeout: 2000,
          message: this.$t('forms.validation.type'),
          position: 'bottomRight',
        })
        this.btnIsLoading = false
        return
      }

      this.submitData()
    },

    // Submit Data
    submitData() {
      const submit_data = new FormData()
      submit_data.append('title', this.data.title)
      submit_data.append('desc', this.data.desc)
      submit_data.append('note', this.data.note)
      submit_data.append('duration_by_month', this.data.duration_by_month)
      submit_data.append('type', this.data.type?.id)
      submit_data.append('price', this.data.price)

      this.$axios({
        method: 'POST',
        url: 'packages',
        data: submit_data,
      })
        .then(() => {
          // =============== Start:: Remove Form Data From LocalStorage =============== //
          localStorage.removeItem('packages_data')

          // =============== End:: Remove Form Data From LocalStorage =============== //
          this.$iziToast.success({
            timeout: 2000,
            message: this.$t('addSuccess'),
            position: 'bottomRight',
          })
          this.$router.push({ path: '/packages/show-all' })
          this.btnIsLoading = false
        })
        .catch((err) => {
          let message = ''
          err.response.data.message
            ? (message = err.response.data.message)
            : (message = err.response.data.messages)
          this.$iziToast.error({
            timeout: 2000,
            message: message,
            position: 'bottomRight',
          })
          this.btnIsLoading = false
        })
    },
  },
}
</script>
