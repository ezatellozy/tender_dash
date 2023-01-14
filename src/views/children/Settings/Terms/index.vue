<template>
  <div class="create_wrapper custom_card">
    <!-- START:: CARD TITLE -->
    <div class="card-header">
      <h4 class="card-title">{{ $t('CRUD.Update.main_title') }}</h4>
    </div>
    <!-- END:: CARD TITLE -->

    <!-- START:: UPDATE FORM WRAPPER -->
    <form @submit.prevent="validateCreateForm">
      <div class="container">
        <div class="row justify-content-between">
          <!-- START:: INPUT WRAPPER -->
          <div class="col-lg-6 py-0">
            <div class="input_wrapper top_label">
              <textarea
                class="form-control"
                id="name_input8"
                @input="checkIfInputIsEmpty"
                v-model.trim="updateData.terms_ar"
              ></textarea>
              <label class="form-label">الشروط والاحكام باللغة العربية</label>
            </div>
          </div>
          <!-- END:: INPUT WRAPPER -->

          <!-- START:: INPUT WRAPPER -->
          <div class="col-lg-6 py-0">
            <div class="input_wrapper top_label">
              <textarea
                class="form-control"
                id="name_input8"
                @input="checkIfInputIsEmpty"
                v-model.trim="updateData.terms_en"
              ></textarea>
              <label class="form-label">
                الشروط والاحكام باللغة الانجليزية
              </label>
            </div>
          </div>
          <!-- END:: INPUT WRAPPER -->
        </div>
      </div>

      <div class="buttons_wrapper">
        <!-- START:: BUTTON -->
        <button class="button_style_1" :class="btnIsLoading ? 'disabled' : ''">
          {{ $t('forms.submit') }}
          <span class="btn_loader" v-if="btnIsLoading"></span>
        </button>
        <!-- END:: BUTTON -->
      </div>
    </form>
    <!-- END:: UPDATE FORM WRAPPER -->
  </div>
</template>

<script>
export default {
  name: 'policy',
  data() {
    return {
      // START:: BUTTON LOADER HANDLING DATA
      btnIsLoading: false,
      // END:: BUTTON LOADER HANDLING DATA

      // START:: CREATE DATA
      updateData: {
        terms_ar: null,
        terms_en: null,
      },
      // END:: CREATE DATA
      encryValue: [
        { name: 'ssl', value: 'ssl' },
        { name: 'tls', value: 'tls' },
      ],
      smsStatus: [
        { name: 'مفعل', value: 'enable' },
        { name: 'غير مفعل', value: 'disable' },
      ],
      smsProviders: [
        { name: 'HISMS', value: 'hisms' },
        { name: 'Net powers', value: 'net_powers' },
        { name: 'SMS Gateway', value: 'sms_gateway' },
      ],
    }
  },
  methods: {
    checkIfInputIsEmpty(e) {
      let inputElement = e.currentTarget
      if (inputElement.value.length > 0) {
        inputElement.classList.add('not_empty')
      } else {
        inputElement.classList.remove('not_empty')
      }
    },

    //START:: GET DATA
    getData() {
      this.$axios({
        method: 'GET',
        url: 'setting',
      }).then((res) => {
        const result = res.data.data
        for (let [key, value] of Object.entries(this.updateData)) {
          console.log(value)
          result.map((el) => {
            if (key == el.key) {
              this.updateData[key] = el.value
            }
          })
        }
      })
    },

    // START:: VALIDATE CREATE FORM
    validateCreateForm() {
      this.btnIsLoading = true

      const data = new FormData()
      for (const [key, value] of Object.entries(this.updateData)) {
        if (value) {
          if (typeof value == 'object') {
            data.append(key, value.value)
          } else {
            data.append(key, value)
          }
        }
      }
      this.$axios({
        method: 'post',
        url: 'setting',
        data: data,
      })
        .then(() => {
          this.$iziToast.success({
            timeout: 2000,
            message: this.$t('editSuccess'),
            position: 'bottomRight',
          })
          this.btnIsLoading = false
          this.$router.push({ path: '/' })
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
    // END:: VALIDATE CREATE FORM
  },

  created() {
    this.getData()
  },
}
</script>
