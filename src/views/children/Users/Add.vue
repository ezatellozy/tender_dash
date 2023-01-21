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
          <div class="row">
            <div class="col-lg-12 py-0">
              <uplode-image
                @inputChanged="uplodeImg_1"
                placeHolder="صورة المستخدم"
              ></uplode-image>
              <!-- End:: Image -->
            </div>
            <!-- Start:: Image -->

            <!-- Start:: Name -->
            <div class="col-lg-6 py-0">
              <div class="input_wrapper top_label">
                <input
                  type="text"
                  class="form-control"
                  @input="helper_checkIfInputIsEmpty"
                  v-model.trim="data.name"
                />
                <label for="name_input" class="form-label">
                  {{ $t('forms.labels.name') }}
                </label>
              </div>
            </div>
            <!-- End:: Name -->

            <!-- Start:: Email -->
            <div class="col-lg-6 py-0">
              <div class="input_wrapper top_label">
                <input
                  type="email"
                  class="form-control"
                  @input="helper_checkIfInputIsEmpty"
                  v-model.trim="data.email"
                />
                <label for="name_input" class="form-label">
                  {{ $t('forms.labels.email') }}
                </label>
              </div>
            </div>
            <!-- End:: Email -->

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
            <!-- Start:: phone_code -->
            <div class="col-lg-6 py-0">
              <div class="input_wrapper top_label">
                <label class="form-label">
                  {{ $t('forms.labels.phone_code') }}
                </label>
                <multiselect
                  :loading="!phone_codes.length"
                  v-model="data.phone_code"
                  :options="phone_codes"
                  label="name"
                  track-by="id"
                  placeholder=" "
                  :searchable="true"
                  :allow-empty="false"
                  :show-labels="false"
                ></multiselect>
              </div>
            </div>

            <!-- end:: phone_code -->
            <!-- Start:: Phone -->
            <div class="col-lg-6 py-0">
              <div class="input_wrapper top_label">
                <input
                  type="number"
                  min="9"
                  class="form-control"
                  @input="helper_checkIfInputIsEmpty"
                  v-model.trim="data.phone"
                />
                <label for="name_input" class="form-label">
                  {{ $t('forms.labels.phone') }}
                </label>
              </div>
            </div>
            <!-- End:: Phone -->

            <!-- Start:: Password -->
            <div class="col-lg-6 py-0">
              <div class="input_wrapper top_label">
                <input
                  type="password"
                  class="form-control"
                  @input="helper_checkIfInputIsEmpty"
                  v-model.trim="data.password"
                />
                <label for="name_input" class="form-label">
                  {{ $t('forms.labels.password') }}
                </label>
              </div>
            </div>
            <!-- End:: Password -->

            <!-- Start:: Password  Confirmation-->
            <div class="col-lg-6 py-0">
              <div class="input_wrapper top_label">
                <input
                  type="password"
                  class="form-control"
                  @input="helper_checkIfInputIsEmpty"
                  v-model.trim="data.password_confirmation"
                />
                <label for="name_input" class="form-label">
                  {{ $t('forms.labels.confirmPassword') }}
                </label>
              </div>
            </div>
            <!-- End:: Password  Confirmation-->
            <!-- Start:: Gender -->
            <div class="col-lg-6 py-0">
              <div class="input_wrapper top_label">
                <label class="form-label">
                  {{ $t('forms.labels.gender') }}
                </label>
                <multiselect
                  v-model="data.gender"
                  :options="genders"
                  label="name"
                  track-by="id"
                  placeholder=""
                  :searchable="false"
                  :allow-empty="false"
                  :show-labels="false"
                ></multiselect>
              </div>
            </div>
            <!-- End:: Gender -->
            <div class="col-lg-6 py-0"></div>
            <!-- Start:: Is Active -->
            <div class="col-lg-4 py-0">
              <v-checkbox
                :label="$t('forms.labels.is_active')"
                v-model="data.is_active"
                color="success"
              ></v-checkbox>
            </div>
            <!-- End:: Is Active -->
            <!-- Start:: Is is_admin_active_user -->
            <div class="col-lg-4 py-0">
              <v-checkbox
                :label="$t('forms.labels.is_admin_active_user')"
                v-model="data.is_admin_active_user"
                color="success"
              ></v-checkbox>
            </div>
            <!-- End:: Is is_admin_active_user -->
            <!-- Start:: Is Active -->
            <div class="col-lg-4 py-0">
              <v-checkbox
                :label="$t('forms.labels.is_ban')"
                v-model="data.is_ban"
                color="error"
              ></v-checkbox>
            </div>
            <!-- Start:: Name -->
            <div class="col-lg-6 py-0" v-if="data.is_ban">
              <div class="input_wrapper top_label">
                <textarea
                  class="form-control"
                  @input="helper_checkIfInputIsEmpty"
                  v-model.trim="data.ban_reason"
                  :disabled="!data.is_ban"
                ></textarea>
                <label for="name_input" class="form-label">
                  {{ $t('forms.labels.ban_reason') }}
                </label>
              </div>
            </div>
            <!-- End:: Name -->
            <!-- End:: Is Active -->
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
  </div>
</template>

<script>
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
          text: this.$t('breadcrumb.users.title'),
          disabled: false,
          href: '/users/show-all',
        },
        {
          text: this.$t('breadcrumb.users.add'),
          disabled: true,
          href: '',
        },
      ],

      // ========== Loading
      btnIsLoading: false,

      // ========== create_data
      data: {
        name: null,
        password: null,
        password_confirmation: null,
        email: null,
        phone: null,
        phone_code: null,
        avatar: null,
        country_id: null,
        gender: null,
        city_id: null,
        is_active: true,
        is_admin_active_user: true,
        is_ban: false,
        ban_reason: null,
      },

      countries: [],
      cities: [],
      phone_codes: [],
    }
  },

  methods: {
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

    // Uplode Image
    uplodeImg_1(obj) {
      this.data.avatar = obj
    },

    // Empty Form Data
    emptyFormData() {
      this.data.avatar = null

      this.name = null
      this.phone = null

      this.email = null

      this.password = null
      this.password_confirmation = null
    },

    // Validate Data
    validateForm() {
      this.btnIsLoading = true

      if (!this.data.avatar) {
        this.$iziToast.error({
          timeout: 2000,
          message: this.$t('forms.validation.image'),
          position: 'bottomRight',
        })
        this.btnIsLoading = false
        return
      } else if (!this.data.name) {
        this.$iziToast.error({
          timeout: 2000,
          message: this.$t('forms.validation.name'),
          position: 'bottomRight',
        })
        this.btnIsLoading = false
        return
      } else if (!this.data.phone_code) {
        this.$iziToast.error({
          timeout: 2000,
          message: this.$t('forms.validation.phone_code'),
          position: 'bottomRight',
        })
        this.btnIsLoading = false
        return
      } else if (!this.data.phone) {
        this.$iziToast.error({
          timeout: 2000,
          message: this.$t('forms.validation.phone'),
          position: 'bottomRight',
        })
        this.btnIsLoading = false
        return
      } else if (this.data.phone.length < 9) {
        this.$iziToast.error({
          timeout: 2000,
          message: 'رقم الهاتف يجب ان يكون اكبر من 9 ارقام',
          position: 'bottomRight',
        })
        this.btnIsLoading = false
        return
      } else if (this.data.phone.length > 11) {
        this.$iziToast.error({
          timeout: 2000,
          message: 'رقم الهاتف يجب ان يكون اقل من 11 رقم',
          position: 'bottomRight',
        })
        this.btnIsLoading = false
        return
      } else if (!this.data.email) {
        this.$iziToast.error({
          timeout: 2000,
          message: this.$t('forms.validation.email'),
          position: 'bottomRight',
        })
        this.btnIsLoading = false
        return
      } else if (!this.data.country_id) {
        this.$iziToast.error({
          timeout: 2000,
          message: this.$t('forms.validation.country'),
          position: 'bottomRight',
        })
        this.btnIsLoading = false
        return
      } else if (!this.data.city_id) {
        this.$iziToast.error({
          timeout: 2000,
          message: this.$t('forms.validation.city'),
          position: 'bottomRight',
        })
        this.btnIsLoading = false
        return
      } else if (this.data.is_ban && !this.data.ban_reason) {
        this.$iziToast.error({
          timeout: 2000,
          message: this.$t('forms.validation.ban_reason'),
          position: 'bottomRight',
        })
        this.btnIsLoading = false
        return
      } else if (!this.data.password) {
        this.$iziToast.error({
          timeout: 2000,
          message: this.$t('forms.validation.password'),
          position: 'bottomRight',
        })
        this.btnIsLoading = false
        return
      } else if (this.data.password != this.data.password_confirmation) {
        this.$iziToast.error({
          timeout: 2000,
          message: 'تاكيد الباسورد يجب  ان يساوي الباسورد',
          position: 'bottomRight',
        })
        this.btnIsLoading = false
        return
      } else {
        this.submitData()
        return
      }
    },

    // Submit Data
    submitData() {
      this.$globalStore
        .submitData({ data: this.data }, 'client')
        .then((res) => {
          this.btnIsLoading = false
          if (res.data.status == false) {
            return
          }
          this.$router.push('/users/show-all')
        })
        .catch(() => (this.btnIsLoading = false))
    },
  },

  created() {
    // Start:: Fire Methods
    this.getCountries()

    // End:: Fire Methods
  },
}
</script>
