<template>
  <div class="create_wrapper">
    <!-- Start Breadcrumb -->
    <Breadcrumb :items="items" />
    <!-- End Breadcrumb -->
    <MainLoader v-if="loading"></MainLoader>
    <div class="custom_card fadeIn" v-else>
      <div class="card-header">
        <h4 class="card-title">{{ $t('edit') }}</h4>
      </div>

      <!-- ==== Start Form ==== -->
      <form @submit.prevent="validateCreateForm">
        <div class="container">
          <div class="row justify-content-between">
            <!-- Image -->
            <uplode-image
              :data_src="data.image"
              @inputChanged="uplodeImg_1"
              placeHolder="صورة التصنيف"
            ></uplode-image>
            <!-- Start:: Is Active -->
            <div class="col-lg-12 py-0">
              <v-checkbox
                :label="$t('forms.labels.is_active')"
                v-model="data.is_active"
                color="success"
              ></v-checkbox>
            </div>
            <!-- End:: Is Active -->

            <div class="col-lg-6 py-0">
              <div class="input_wrapper top_label">
                <input
                  type="text"
                  class="form-control"
                  @input="helper_checkIfInputIsEmpty"
                  v-model.trim="data.ar.name"
                />
                <label for="name_input" class="form-label">
                  {{ $t('forms.labels.name_ar') }}
                </label>
              </div>
            </div>

            <div class="col-lg-6 py-0">
              <div class="input_wrapper top_label">
                <input
                  type="text"
                  class="form-control"
                  @input="helper_checkIfInputIsEmpty"
                  v-model.trim="data.en.name"
                />
                <label for="name_input" class="form-label">
                  {{ $t('forms.labels.name_en') }}
                </label>
              </div>
            </div>

            <div class="col-lg-6 py-0">
              <div class="input_wrapper top_label">
                <label for="textarea_1" class="form-label">
                  {{ $t('forms.labels.content_ar') }}
                </label>
                <textarea
                  class="form-control"
                  rows="5"
                  v-model="data.ar.desc"
                ></textarea>
              </div>
            </div>

            <div class="col-lg-6 py-0">
              <div class="input_wrapper top_label">
                <label for="textarea_1" class="form-label">
                  {{ $t('forms.labels.content_en') }}
                </label>
                <textarea
                  class="form-control"
                  rows="5"
                  v-model="data.en.desc"
                ></textarea>
              </div>
            </div>
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
  name: 'Update',

  props: ['id'],

  data() {
    return {
      loading: false,
      // ========== Breadcrumbs
      items: [
        {
          text: this.$t('breadcrumb.mainPage'),
          disabled: false,
          href: '/',
        },
        {
          text: this.$t('breadcrumb.categories.title'),
          disabled: false,
          href: '/categories/show-all',
        },
        {
          text: this.$t('breadcrumb.categories.edit'),
          disabled: true,
          href: '',
        },
      ],

      // ========== Loading
      btnIsLoading: false,

      // ========== create_data
      data: {
        image: null,
        ar: {
          name: null,
          desc: null,
        },
        en: {
          name: null,
          desc: null,
        },
        is_active: true,
      },
    }
  },

  methods: {
    // Uplode Image
    uplodeImg_1(obj) {
      this.data.image = obj
    },

    // Validate Data
    validateCreateForm() {
      this.btnIsLoading = true

      if (!this.data.ar.name) {
        this.$iziToast.error({
          timeout: 2000,
          message: this.$t('forms.validation.name_ar'),
          position: 'bottomRight',
        })
        this.btnIsLoading = false
        return
      } else if (!this.data.en.name) {
        this.$iziToast.error({
          timeout: 2000,
          message: this.$t('forms.validation.name_en'),
          position: 'bottomRight',
        })
        this.btnIsLoading = false
        return
      } else if (!this.data.en.desc) {
        this.$iziToast.error({
          timeout: 2000,
          message: this.$t('forms.validation.content_en'),
          position: 'bottomRight',
        })
        this.btnIsLoading = false
        return
      } else if (!this.data.ar.desc) {
        this.$iziToast.error({
          timeout: 2000,
          message: this.$t('forms.validation.content_ar'),
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
      this.btnIsLoading = true

      const submit_data = new FormData()
      if (this.data.image?.img_file) {
        submit_data.append('image', this.data.image.img_file)
      }
      submit_data.append('ar[name]', this.data.ar.name)
      submit_data.append('ar[desc]', this.data.ar.desc)
      submit_data.append('en[name]', this.data.en.name)
      submit_data.append('en[desc]', this.data.en.desc)

      submit_data.append('is_active', +this.data.is_active)

      submit_data.append('_method', 'PUT')

      this.$axios({
        method: 'POST',
        url: `category/${this.id}`,
        data: submit_data,
      })
        .then(() => {
          this.$iziToast.success({
            timeout: 2000,
            message: this.$t('editSuccess'),
            position: 'bottomRight',
          })

          this.$router.push({ path: '/categories/show-all' })

          this.btnIsLoading = false
        })
        .catch((err) => {
          this.$iziToast.error({
            timeout: 2000,
            message: err.response.data.message,
            position: 'bottomRight',
          })
          this.btnIsLoading = false
        })
    },

    getData() {
      this.loading = true
      this.$axios({
        method: 'GET',
        url: `category/${this.id}`,
      }).then((res) => {
        this.loading = false
        this.data.image = res.data.data.image

        this.data.ar.name = res.data.data.ar.name
        this.data.ar.desc = res.data.data.ar.desc

        this.data.en.name = res.data.data.en.name
        this.data.en.desc = res.data.data.en.desc

        this.data.is_active = res.data.data.is_active
      })
    },
  },

  mounted() {
    this.getData()
  },
}
</script>
