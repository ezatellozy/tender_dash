<template>
  <div class="create_wrapper">
    <!-- Start Breadcrumb -->
    <Breadcrumb :items="items" />
    <!-- End Breadcrumb -->

    <!-- Start Main Loader -->
    <transition name="fadeInUp" mode="out-in" v-if="loaderPage">
      <MainLoader />
    </transition>
    <!-- End Main Loader -->

    <div class="custom_card" v-else>
      <div class="card-header">
        <h4 class="card-title">{{ $t('edit') }}</h4>
      </div>

      <!-- ==== Start Form ==== -->
      <form @submit.prevent="validateFormUpdateProfile">
        <div class="container">
          <div class="row">
            <div class="col-12 py-0">
              <uplode-image
                @inputChanged="uplodeImg_1"
                placeHolder="صورة المستخدم"
                :data_src="data.image"
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

            <!-- Start:: gender -->
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
                  placeholder=" "
                  :searchable="true"
                  :allow-empty="false"
                  :show-labels="false"
                ></multiselect>
              </div>
            </div>
            <!-- End:: gender -->

            <!-- Start:: Country -->
            <div class="col-lg-6 py-0">
              <div class="input_wrapper top_label">
                <label class="form-label">
                  {{ $t('forms.labels.country') }}
                </label>
                <multiselect
                  :loading="!countries.length"
                  v-model="data.country"
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
                  v-model="data.city"
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
                  label="id"
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
          </div>
        </div>

        <div class="buttons_wrapper">
          <button class="button_style_1" :disabled="btnIsLoading1">
            {{ $t('forms.submit') }}
            <span class="btn_loader" v-if="btnIsLoading1"></span>
          </button>
        </div>
      </form>
      <!-- ==== End Form ==== -->
      <v-divider></v-divider>

      <!-- ==== Start Form ==== -->
      <form @submit.prevent="validateFormUpdatePassword">
        <div class="container">
          <h5>تغير كلمه المرور</h5>
          <div class="row">
            <!-- Start:: Password -->
            <div class="col-lg-12 py-0">
              <div class="input_wrapper top_label">
                <input
                  type="password"
                  class="form-control"
                  @input="helper_checkIfInputIsEmpty"
                  v-model.trim="data.currentPassword"
                />
                <label for="name_input" class="form-label">
                  {{ $t('forms.labels.currentPassword') }}
                </label>
              </div>
            </div>
            <!-- End:: Password -->
            <!-- Start:: Password -->
            <div class="col-lg-6 py-0">
              <div class="input_wrapper top_label">
                <input
                  type="password"
                  class="form-control"
                  @input="helper_checkIfInputIsEmpty"
                  v-model.trim="data.newPassword"
                />
                <label for="name_input" class="form-label">
                  {{ $t('forms.labels.newPassword') }}
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
          </div>
        </div>

        <div class="buttons_wrapper">
          <button class="button_style_1" :disabled="btnIsLoading3">
            {{ $t('forms.submit') }}
            <span class="btn_loader" v-if="btnIsLoading3"></span>
          </button>
        </div>
      </form>
      <!-- ==== End Form ==== -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'Update',

  // props: ['id'],

  data() {
    return {
      // ========== Main Loader
      loaderPage: false,
      model: 'users',
      // ========== Breadcrumbs
      items: [
        {
          text: this.$t('breadcrumb.mainPage'),
          disabled: false,
          href: '/',
        },
        {
          text: this.$t('breadcrumb.users.edit'),
          disabled: true,
          href: '',
        },
      ],

      // ========== Loading
      btnIsLoading1: false,
      btnIsLoading2: false,
      btnIsLoading3: false,
      btnIsLoading4: false,

      // ========== create_data
      data: {
        image: null,
        name: null,
        phone: null,
        phone_code: null,
        country: null,
        city: null,
        email: null,
        gender: null,
        currentPassword: null,
        newPassword: null,
        password_confirmation: null,
      },
      // ========== Select Lists Data
      genders: [
        {
          id: 'male',
          name: this.$t('male'),
        },
        {
          id: 'female',
          name: this.$t('female'),
        },
      ],
      countries: [],
      phone_codes: [],
      cities: [],
      is_verifaction_send: false,
    }
  },

  methods: {
    // ============ Get Main Data
    getData() {
      this.loaderPage = true
      this.$axios({
        method: 'GET',
        url: `profile`,
      }).then((res) => {
        this.loaderPage = false
        this.data.image = res.data.data.avatar
        this.data.name = res.data.data.name
        this.data.phone = res.data.data.phone
        this.data.email = res.data.data.email
        this.data.country = res.data.data.country
        this.getCities(res.data.data.country)
        this.data.city = res.data.data.city
        this.data.gender = this.genders.find(
          (gender) => gender.id == res.data.data.gender,
        )
        this.data.phone_code = this.phone_codes.find(
          (code) => code.id == res.data.data.phone_code,
        )

        this.loaderPage = false
      })
    },
    getCities(e) {
      this.data.city = null
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
    // ============ Get Select Lists Data

    // Uplode Image
    uplodeImg_1(obj) {
      this.data.image = obj
    },

    // Validate update profile
    validateFormUpdateProfile() {
      this.btnIsLoading1 = true

      if (!this.data.name) {
        this.$iziToast.error({
          timeout: 2000,
          message: this.$t('forms.validation.name'),
          position: 'bottomRight',
        })
        this.btnIsLoading1 = false
        return
        // } else if (!this.data.phone_code) {
        //   this.$iziToast.error({
        //     timeout: 2000,
        //     message: this.$t('forms.validation.phone_code'),
        //     position: 'bottomRight',
        //   })
        //   this.btnIsLoading = false
        //   return
      } else if (!this.data.phone) {
        this.$iziToast.error({
          timeout: 2000,
          message: this.$t('forms.validation.phone'),
          position: 'bottomRight',
        })
        this.btnIsLoading = false
        return
      } else if (!this.data.country) {
        this.$iziToast.error({
          timeout: 2000,
          message: this.$t('forms.validation.country'),
          position: 'bottomRight',
        })
        this.btnIsLoading = false
        return
      } else if (!this.data.city) {
        this.$iziToast.error({
          timeout: 2000,
          message: this.$t('forms.validation.city'),
          position: 'bottomRight',
        })
        this.btnIsLoading = false
        return
      } else if (!this.data.gender) {
        this.$iziToast.error({
          timeout: 2000,
          message: this.$t('forms.validation.gender'),
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
        this.btnIsLoading1 = false
        return
      } else {
        this.submitDataProfileUpdate()
        return
      }
    },

    // Submit update profile
    submitDataProfileUpdate() {
      const submit_data = new FormData()
      // submit_data.append('_method', 'PUT')
      if (this.data.image.img_file) {
        submit_data.append('avatar', this.data.image.img_file)
      }
      submit_data.append('name', this.data.name)
      submit_data.append('gender', this.data.gender.id)
      submit_data.append('email', this.data.email)
      submit_data.append('phone', this.data.phone)
      submit_data.append('phone_code', this.data.phone_code?.id)
      submit_data.append('country_id', this.data.country.id)
      submit_data.append('city_id', this.data.city.id)

      this.$axios({
        method: 'POST',
        url: `profile`,
        data: submit_data,
      })
        .then(() => {
          this.$iziToast.success({
            timeout: 2000,
            message: this.$t('editSuccess'),
            position: 'bottomRight',
          })
          window.location.reload()
          // this.$router.push({ path: "/users" });
          this.btnIsLoading1 = false
        })
        .catch((err) => {
          this.$iziToast.error({
            timeout: 2000,
            message: err.response.data.message,
            position: 'bottomRight',
          })
          this.btnIsLoading1 = false
        })
    },

    // Validate update password
    validateFormUpdatePassword() {
      this.btnIsLoading3 = true

      if (!this.data.currentPassword) {
        this.$iziToast.error({
          timeout: 2000,
          message: this.$t('forms.validation.currentPassword'),
          position: 'bottomRight',
        })
        this.btnIsLoading3 = false
        return
      } else if (!this.data.newPassword) {
        this.$iziToast.error({
          timeout: 2000,
          message: 'ادخل كلمه المرور الجديده',
          position: 'bottomRight',
        })
        this.btnIsLoading3 = false
        return
      } else if (this.data.newPassword != this.data.password_confirmation) {
        this.$iziToast.error({
          timeout: 2000,
          message: 'كلمه المرور غير متوافقه',
          position: 'bottomRight',
        })
        this.btnIsLoading3 = false
        return
      } else {
        this.submitDataPasswordUpdate()
        return
      }
    },
    // submit profile update
    submitDataPasswordUpdate() {
      const submit_data = new FormData()
      // submit_data.append('_method', 'PATCH')
      submit_data.append('old_password', this.data.currentPassword)
      submit_data.append('password', this.data.newPassword)

      submit_data.append(
        'password_confirmation',
        this.data.password_confirmation,
      )

      this.$axios({
        method: 'POST',
        url: `update_password`,
        data: submit_data,
      })
        .then(() => {
          this.$iziToast.success({
            timeout: 2000,
            message: this.$t('editSuccess'),
            position: 'bottomRight',
          })
          // this.$router.push({ path: "/users" });
          this.btnIsLoading3 = false
          this.data.currentPassword = ''
          this.data.newPassword = ''
          this.data.password_confirmation = ''
        })
        .catch((err) => {
          this.$iziToast.error({
            timeout: 2000,
            message: err.response.data.message,
            position: 'bottomRight',
          })
          this.btnIsLoading3 = false
        })
    },

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
          }
        })
      })
    },
  },

  async created() {
    // Start:: Fire Methods
    await this.getCountries()
    this.getData()
    // End:: Fire Methods
  },
}
</script>
