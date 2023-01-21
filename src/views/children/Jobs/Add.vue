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
            <!-- Start:: user -->
            <div class="col-lg-6 py-0">
              <div class="input_wrapper top_label">
                <label class="form-label">
                  {{ $t('forms.labels.client') }}
                </label>
                <multiselect
                  v-model="data.user_id"
                  :options="clients"
                  label="name"
                  track-by="id"
                  placeholder=" "
                  :searchable="true"
                  :allow-empty="false"
                  :show-labels="false"
                ></multiselect>
              </div>
            </div>
            <!-- End:: user -->

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
                  {{ $t('forms.labels.job_title') }}
                </label>
              </div>
            </div>
            <!-- End:: title-->
            <!-- Start:: company_name -->
            <div class="col-lg-6 py-0">
              <div class="input_wrapper top_label">
                <input
                  type="text"
                  class="form-control"
                  @input="
                    helper_checkIfInputIsEmpty
                    addDataLocalStorage()
                  "
                  v-model.trim="data.company_name"
                />
                <label for="name_input" class="form-label">
                  اسم الشركة
                </label>
              </div>
            </div>
            <!-- End:: company_name-->
            <!-- START:: DATE PICKER INPUT -->
            <div class="col-lg-6 py-0">
              <div class="input_wrapper top_label date_input">
                <label class="form-label">تاريخ الانتهاء</label>
                <v-menu
                  v-model="dateMenu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="data.expiry_date"
                      label="Picker without buttons"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    :allowed-dates="allowedDates"
                    v-model="data.expiry_date"
                    @input="dateMenu = false"
                    no-title
                  ></v-date-picker>
                </v-menu>
              </div>
            </div>
            <!-- END:: DATE PICKER INPUT -->

            <!-- Start:: Country -->
            <div class="col-lg-6 py-0">
              <div class="input_wrapper top_label">
                <label class="form-label">
                  {{ $t('forms.labels.country') }}
                </label>
                <multiselect
                  :loading="!countries.length"
                  v-model="data.country_id"
                  :options="countries"
                  label="name"
                  track-by="id"
                  placeholder=" "
                  @input="getCities"
                  :searchable="true"
                  :allow-empty="false"
                  :show-labels="false"
                ></multiselect>
              </div>
            </div>
            <!-- end:: Country -->

            <!-- Start:: city -->
            <div class="col-lg-6 py-0">
              <div class="input_wrapper top_label">
                <label class="form-label">
                  {{ $t('forms.labels.city') }}
                </label>
                <multiselect
                  v-model="data.city_id"
                  :options="cities"
                  label="name"
                  track-by="id"
                  placeholder=" "
                  :searchable="true"
                  :allow-empty="false"
                  :show-labels="false"
                ></multiselect>
              </div>
            </div>
            <!-- end:: city -->

            <!-- Start:: desc -->
            <div class="col-12"></div>
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
            <!-- End:: desc-->
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
          text: this.$t('breadcrumb.jobs.title'),
          disabled: false,
          href: '/jobs/show-all',
        },
        {
          text: this.$t('breadcrumb.jobs.add'),
          disabled: true,
          href: '',
        },
      ],

      // ========== Loading
      btnIsLoading: false,
      dateMenu: false,
      // ========== Data
      data: {
        user_id: null,
        country_id: null,
        city_id: null,
        title: null,
        desc: null,

        expiry_date: null,
        company_name: null,
      },

      // ========== Select Lists Data
      // ========== Model
      model_1: {
        show_model: false,
        model_img_src: '',
      },
      countries: [],
      cities: [],
      clients: [],
    }
  },

  mounted() {
    this.getCountries()
    this.getDataLocalStorage()
    this.$globalServices
      .getData('clients/without-pagination')
      .then((data) => (this.clients = data))
  },

  methods: {
    allowedDates(val) {
      let current = new Date(val)
      current.setDate(current.getDate() + 1)
      return current >= new Date()
    },
    addDataLocalStorage() {
      localStorage.setItem('jobs_data', JSON.stringify(this.data))
    },
    // ============ Get Select Lists Data
    getCountries() {
      this.$axios({
        method: 'GET',
        url: `countries_without_pagination`,
      }).then((res) => {
        this.countries = res.data.data.map((item) => {
          return {
            id: item.id,
            name: item.name,
          }
        })
        this.phone_codes = res.data.data.map((item) => {
          return {
            id: item.phone_code,
            name: item.phone_code,
          }
        })
      })
    },
    getCities(e) {
      this.data.city_id = null
      this.$axios({
        method: 'GET',
        // url: `cities`,
        url: `countries/${e.id}`,
      }).then((res) => {
        this.cities = res.data.data.cities.map((item) => {
          return {
            id: item.id,
            name: item.name,
          }
        })
      })
    },

    getDataLocalStorage() {
      if (localStorage.getItem('jobs_data')) {
        this.data = JSON.parse(localStorage.getItem('jobs_data'))
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
      } else if (!this.data.user_id) {
        this.$iziToast.error({
          timeout: 2000,
          message: this.$t('forms.validation.user'),
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
      } else if (!this.data.expiry_date) {
        this.$iziToast.error({
          timeout: 2000,
          message: 'حقل تاريخ الانتهاء مطلوب',
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
      submit_data.append('user_id', this.data.user_id.id)

      submit_data.append('job_title', this.data.title)
      submit_data.append('desc', this.data.desc)
      submit_data.append('expiry_date', this.data.expiry_date)
      submit_data.append('company_name', this.data.company_name)
      submit_data.append('country_id', this.data.country_id?.id)
      submit_data.append('city_id', this.data.city_id?.id)

      this.$axios({
        method: 'POST',
        url: 'jobs',
        data: submit_data,
      })
        .then(() => {
          // =============== Start:: Remove Form Data From LocalStorage =============== //
          localStorage.removeItem('jobs_data')

          // =============== End:: Remove Form Data From LocalStorage =============== //
          this.$iziToast.success({
            timeout: 2000,
            message: this.$t('addSuccess'),
            position: 'bottomRight',
          })
          this.$router.push({ path: '/jobs/show-all' })
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
