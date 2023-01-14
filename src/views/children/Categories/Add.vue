<template>
  <div class="create_wrapper fadeIn">
    <!-- Start Breadcrumb -->
    <Breadcrumb :items="items" />
    <!-- End Breadcrumb -->

    <div class="custom_card">
      <div class="card-header">
        <h4 class="card-title">{{ $t('addNew') }}</h4>
      </div>

      <!-- ==== Start Form ==== -->
      <form @submit.prevent="validateCreateForm">
        <div class="container">
          <div class="row justify-content-between">
            <!-- Image -->
            <uplode-image
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
  name: 'Create',

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
          text: this.$t('breadcrumb.categories.add'),
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

      if (!this.data.image?.img_src) {
        this.$iziToast.error({
          timeout: 2000,
          message: this.$t('forms.validation.image'),
          position: 'bottomRight',
        })
        this.btnIsLoading = false
        return
      } else if (!this.data.ar.name) {
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
      submit_data.append('image', this.data.image.img_file)
      submit_data.append('ar[name]', this.data.ar.name)
      submit_data.append('ar[desc]', this.data.ar.desc)
      submit_data.append('en[name]', this.data.en.name)
      submit_data.append('en[desc]', this.data.en.desc)

      submit_data.append('is_active', +this.data.is_active)

      this.$axios({
        method: 'POST',
        url: 'category',
        data: submit_data,
      })
        .then(() => {
          this.$iziToast.success({
            timeout: 2000,
            message: this.$t('addSuccess'),
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
  },
}
</script>
