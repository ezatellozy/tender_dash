<template>
  <div class="wrraper custom_card">
    <!-- Start Breadcrumb -->
    <Breadcrumb :items="items" />

    <!-- End Breadcrumb -->
    <MainLoader v-if="loading"></MainLoader>
    <div v-else>
      <div v-if="allData">
        <div class="order-details-page mb-5 row">
          <div class="order-status">
            <h2 class="title">حالة الباقة</h2>
            <div class="status">
              <div class="date">
                <h5>
                  <span
                    v-if="allData.status == 'admin_reject'"
                    class="status canceled"
                  >
                    {{ orderStatus(allData.status) }}
                  </span>
                  <span
                    v-if="allData.status == 'pending'"
                    class="status pending"
                  >
                    {{ orderStatus(allData.status) }}
                  </span>
                  <span
                    v-if="allData.status == 'admin_accept'"
                    class="status success"
                  >
                    {{ orderStatus(allData.status) }}
                  </span>
                </h5>
              </div>
              <div class="action">
                <v-select
                  v-if="allData.status == 'pending'"
                  label="تغيير الحالة"
                  solo
                  :items="orderStatusItems"
                  @input="changeStatus"
                ></v-select>
              </div>
            </div>
          </div>
        </div>
        <div class="row order-details-page">
          <h2 class="title mb-2">تفاصيل الباقة</h2>

          <div class="mb-3 col-12">
            <div class="">
              <div class="details">
                <div class="row">
                  <div class="col-lg-6 mb-2">
                    <div class="customer">
                      <div class="item">
                        <div class="icon">
                          <i class="fal fa-info"></i>
                        </div>
                        <div class="info">
                          <h5 class="title">
                            {{ $t('forms.labels.job_title') }}
                          </h5>
                          <p>
                            {{ allData.job_title }}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-6 mb-2">
                    <div class="customer">
                      <div class="item">
                        <div class="icon">
                          <i class="fal fa-info"></i>
                        </div>
                        <div class="info">
                          <h5 class="title">
                            {{ $t('forms.labels.desc') }}
                          </h5>
                          <p>
                            {{ allData.desc }}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="col-lg-4 mb-2">
                    <div class="customer">
                      <div class="item">
                        <div class="icon">
                          <i class="fal fa-building"></i>
                        </div>
                        <div class="info">
                          <h5 class="title">
                            {{ $t('forms.labels.company_name') }}
                          </h5>
                          <p>
                            {{ allData.company_name }}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-4 mb-2">
                    <div class="customer">
                      <div class="item">
                        <div class="icon">
                          <i class="fal fa-globe"></i>
                        </div>
                        <div class="info">
                          <h5 class="title">
                            الدولة
                          </h5>
                          <p>
                            {{ allData.country.ar.name }}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-4 mb-2">
                    <div class="customer">
                      <div class="item">
                        <div class="icon">
                          <i class="fal fa-globe"></i>
                        </div>
                        <div class="info">
                          <h5 class="title">
                            المدينة
                          </h5>
                          <p>
                            {{ allData.city.ar.name }}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- End Image_Model -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import RatingStars from '@/components/UI/RatingStars.vue'
import UserRate from '@/components/Global/UserRate.vue'
export default {
  props: ['id'],
  components: {
    RatingStars,
    UserRate,
  },
  data() {
    return {
      selectedColor: null,
      selectedSize: null,
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
          text: this.$t('breadcrumb.jobs.all'),
          disabled: true,
          href: '',
        },
      ],
      // ========== Model
      model_1: {
        show_model: false,
        model_img_src: '',
      },
      //Data
      allData: null,
      products_details: null,
      c1: undefined,
      c2: undefined, // ========== Loding
      loading: false,
      // ========== Table

      orderStatusItems: [
        {
          text: 'قبول',
          value: 'admin_accept',
        },
        { text: 'رفض', value: 'admin_reject' },
      ],
    }
  },
  watch: {
    [`paginations.current_page`]() {},
  },
  computed: {
    ...mapGetters({
      lang: 'lang_module/lang',
    }),
    headers() {
      return [
        {
          text: '#',
          align: 'center',
          value: 'id',
          sortable: true,
        },
        {
          text: 'صوره',
          align: 'center',
          value: 'tender_images',
          sortable: false,
        },
        {
          text: 'الاسم',
          align: 'center',
          value: 'title',
          sortable: false,
        },
        {
          text: 'الوصف',
          align: 'center',
          value: 'desc',
          sortable: false,
        },
        {
          text: 'منتهي؟',
          align: 'center',
          value: 'is_expired',
          sortable: false,
        },

        {
          text: 'الحالة',
          align: 'center',
          value: 'status',
          sortable: false,
        },
      ]
    },
  },
  methods: {
    changeStatus(currStatus) {
      this.btnIsLoading = true
      let submit_data = new FormData()
      submit_data.append('_method', 'PUT')
      submit_data.append('status', currStatus)
      this.$axios({
        method: 'POST',
        url: `job/${this.allData.id}/change_status`,
        data: submit_data,
      })
        .then(() => {
          this.$iziToast.success({
            timeout: 2000,
            message: this.$t('sendSuccess'),
            position: 'bottomRight',
          })
          // this.$router.push({ path: "/transactions/all-transactions" });
          this.btnIsLoading = false
          this.setRows()
        })
        .catch((err) => {
          // console.log(err)
          if (err.response.data.status == 'fail') {
            this.$iziToast.error({
              timeout: 2000,
              message: err.response.data.message,
              position: 'bottomRight',
            })
          }
          this.setRows()
          this.btnIsLoading = false
        })
    },

    orderStatus(status) {
      if (status == 'pending') {
        return 'جاري التنفيذ'
      } else if (status == 'admin_accept') {
        return 'تم القبول'
      } else if (status == 'admin_reject') {
        return 'تم الرفض '
      }
    },
    // ===== Search Method =====
    filterClick(word) {
      if (!this.loading) {
        this.search = word
        this.helper_filterSearch()
      }
    },
    // img Model
    show_model_1(e) {
      this.model_1.model_img_src = e.target.src
      this.model_1.show_model = true
    },
    //Get Prosuct
    getJobs() {
      this.loading = true
      this.$axios({
        method: 'GET',
        url: `jobs/${this.id}`,
      }).then((res) => {
        this.loading = false
        this.allData = res.data.data
      })
    },

    // Start:: Sync Slider Behavior Method
    syncSliderBehavior(_, nextPosition) {
      this.$refs.c1.goTo(nextPosition)
      this.$refs.c2.goTo(nextPosition)
    },
    // End:: Sync Slider Behavior Method
  },
  // ======= hooks
  mounted() {
    this.c1 = this.$refs.c1
    this.c2 = this.$refs.c2
    this.getJobs()
  },
}
</script>

<style lang="scss" scoped>
span.color {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: inline-block;
}
.product_details {
  h4 {
    font-size: 20px;
    color: var(--mainColor-2);
  }
}
.specfication_card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 5px;
  border-bottom: 1px solid var(--mainColor-2);
  span {
    font-size: 15px;
  }
}
</style>
