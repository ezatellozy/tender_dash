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
      <form @submit.prevent="validateCreateForm">
        <div class="container">
          <div class="row justify-content-center">
            <!-- Start:: Replay -->
            <div class="col-lg-6 py-0">
              <div class="card-table">
                <div class="details">
                  <h3>
                    <i class="fal fa-user ml-2"></i>
                    <span>الإسم:</span>
                    {{ allData.fullname }}
                  </h3>
                  <h4>
                    <i class="fal fa-phone ml-2"></i>
                    <span>رقم الهاتف:</span>
                    {{ allData.phone }}
                  </h4>
                  <h4>
                    <i class="fal fa-envelope ml-2"></i>
                    <span>الرسالة:</span>
                    <p>
                      {{ allData.content }}
                    </p>
                  </h4>
                </div>
                <div class="logo-hidden">
                  <img src="@/assets/images/icons/logo.svg" alt="" />
                </div>
              </div>
            </div>
            <div class="col-lg-12 py-0">
              <div class="input_wrapper top_label">
                <label class="form-label">نوع الارسال</label>
                <multiselect
                  v-model="data.send_type"
                  :options="send_types"
                  label="name"
                  track-by="id"
                  placeholder=" "
                  :searchable="true"
                  :allow-empty="true"
                  :show-labels="false"
                ></multiselect>
              </div>
            </div>
            <div class="col-lg-12 py-0">
              <div class="input_wrapper top_label">
                <label for="textarea_1" class="form-label">
                  {{ $t('forms.labels.replay') }}
                </label>
                <textarea
                  v-model="data.replay"
                  class="form-control"
                  rows="5"
                ></textarea>
              </div>
            </div>
            <!-- End:: Replay -->
          </div>
        </div>

        <div class="buttons_wrapper">
          <button
            class="button_style_1"
            :class="btnIsLoading ? 'disabled' : ''"
          >
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
import UserMessage from '@/components/Global/UserMessage.vue'
export default {
  name: 'Create',

  props: ['id'],
  components: {
    UserMessage,
  },

  data() {
    return {
      dateMenu: false,
      dateMenu2: false,
      // ========== Breadcrumbs
      items: [
        {
          text: this.$t('breadcrumb.mainPage'),
          disabled: false,
          href: '/',
        },
        {
          text: this.$t('breadcrumb.about.title'),
          disabled: false,
          href: '/settings/about',
        },
        {
          text: this.$t('breadcrumb.about.edit'),
          disabled: true,
          href: '',
        },
      ],

      // ========== Loading
      btnIsLoading: false,
      allData: null,

      // ========== create_data
      data: {
        replay: null,
        send_type: null,
      },
      send_types: [
        {
          id: 'fcm',
          name: 'fcm',
        },
        {
          id: 'sms',
          name: 'sms',
        },
        {
          id: 'email',
          name: 'email',
        },
      ],
    }
  },

  methods: {
    // Uplode Image
    uplodeImg_1(obj) {
      this.data.ar.image = obj
    },
    // Uplode Image
    uplodeImg_2(obj) {
      this.data.en.image = obj
    },

    // Validate Data
    validateCreateForm() {
      this.btnIsLoading = true
      this.submitData()
    },

    //GET DATA
    getData() {
      this.$axios({
        method: 'GET',
        url: `contacts/${this.id}`,
      }).then((res) => {
        this.allData = res.data.data
      })
    },
    //GET DATA

    // Submit Data
    submitData() {
      const submit_data = new FormData()

      submit_data.append('send_type', this.data.send_type.id)

      submit_data.append('reply', this.data.replay)

      this.$axios({
        method: 'POST',
        url: `contacts/${this.id}/reply`,
        data: submit_data,
      })
        .then(() => {
          this.$iziToast.success({
            timeout: 2000,
            message: this.$t('editSuccess'),
            position: 'bottomRight',
          })
          this.$router.push({ path: '/settings/contact_messages' })
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

  created() {
    this.getData()
    console.log(this.id)
  },
}
</script>
<style scoped>
.card-table .details {
  padding: 20px 20px !important;
}

.card-table .details p {
  margin-bottom: 0;
}
</style>
