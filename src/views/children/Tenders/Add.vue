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
            <!-- Start:: Categories -->
            <div class="col-lg-6 py-0">
              <div class="input_wrapper top_label">
                <label class="form-label">
                  {{ $t('forms.labels.categories') }}
                </label>
                <multiselect
                  v-model="data.category_ids"
                  :options="categories"
                  :multiple="true"
                  label="name"
                  track-by="id"
                  placeholder=" "
                  :searchable="true"
                  :allow-empty="false"
                  :show-labels="false"
                ></multiselect>
              </div>
            </div>
            <!-- End:: Categories -->
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
                  {{ $t('forms.labels.title') }}
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

            <!-- Start:: tender_specifications_value -->
            <div class="col-lg-6 py-0">
              <div class="input_wrapper top_label">
                <input
                  type="number"
                  class="form-control"
                  @input="
                    helper_checkIfInputIsEmpty
                    addDataLocalStorage()
                  "
                  v-model.trim="data.tender_specifications_value"
                />
                <label for="name_input" class="form-label">
                  قيمة مواصفات المزاد
                </label>
              </div>
            </div>
            <!-- End:: tender_specifications_value-->

            <!-- Start:: insurance_value -->
            <div class="col-lg-6 py-0">
              <div class="input_wrapper top_label">
                <input
                  type="number"
                  class="form-control"
                  @input="
                    helper_checkIfInputIsEmpty
                    addDataLocalStorage()
                  "
                  v-model.trim="data.insurance_value"
                />
                <label for="name_input" class="form-label">
                  قيمة التأمين
                </label>
              </div>
            </div>
            <!-- End:: insurance_value-->
            <!-- START:: FILE INPUT -->
            <div class="col-lg-6 py-0">
              <div class="input_wrapper top_label file_input">
                <span class="file_input_label">ارفاق ملف مواصفات المزاد</span>
                <label
                  for="file_input"
                  class="form-label"
                  v-if="!data.selectedFile.name"
                >
                  اختار ملف
                </label>
                <label
                  for="file_input"
                  class="form-label"
                  v-if="data.selectedFile.name"
                >
                  {{ data.selectedFile.name }}
                </label>
                <div class="_actions" v-if="data.selectedFile.path">
                  <v-icon
                    class="show"
                    small
                    @click="show_model_1(data.selectedFile)"
                  >
                    fal fa-eye
                  </v-icon>
                </div>

                <input
                  accept="application/pdf"
                  type="file"
                  class="form-control"
                  placeholder="اختار ملف"
                  id="file_input"
                  @change="handelSelectedFile"
                />
              </div>
            </div>
            <!-- END:: FILE INPUT -->
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

            <div class="col-12">
              <div class="input_wrapper top_label">
                <label class="form-label">صور المزاد</label>
                <div class="row">
                  <div
                    class="col-lg-6 py-0 mb-4"
                    v-for="(row, index) in data.tender_images"
                    :key="index"
                  >
                    <div class="row w-100">
                      <div class="col-11">
                        <uplode-image
                          @inputChanged="uplodeImg($event, index)"
                          placeHolder="صور المزاد"
                        ></uplode-image>
                      </div>

                      <div
                        class="col-1 py-0 d-flex justify-center flex-column align-center"
                      >
                        <span
                          v-if="index == data.tender_images.length - 1"
                          class="append mx-1"
                          @click="appendTenderImagesRow"
                        >
                          <i class="fas fa-plus-circle"></i>
                        </span>

                        <span
                          v-if="data.tender_images.length > 1"
                          class="append mx-1"
                          @click="deleteTenderImagesRow(index)"
                        >
                          <i class="fas fa-minus-circle"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-12">
              <div class="row productDetails">
                <h6>ملفات اخري</h6>
                <div
                  class="col-lg-12 py-0 mb-4"
                  v-for="(row, index) in data.tender_other_files"
                  :key="index"
                >
                  <div class="row w-100">
                    <div class="col-11">
                      <div class="input_wrapper top_label file_input">
                        <span class="file_input_label">
                          ارفاق ملف
                        </span>
                        <label
                          :for="`file_input_${index}`"
                          class="form-label"
                          v-if="!row.name"
                        >
                          اختار ملف
                        </label>
                        <label
                          :for="`file_input_${index}`"
                          class="form-label"
                          v-if="row.name"
                        >
                          {{ row.name }}
                        </label>
                        <div class="_actions" v-if="row.path">
                          <v-icon class="show" small @click="show_model_1(row)">
                            fal fa-eye
                          </v-icon>
                        </div>

                        <input
                          type="file"
                          accept="application/pdf"
                          placeholder="اختار ملف"
                          class="form-control"
                          :id="`file_input_${index}`"
                          @change="handelOtherFile($event, index)"
                        />
                      </div>
                    </div>

                    <div
                      class="col-1 py-0 d-flex justify-center flex-column align-center"
                    >
                      <span
                        v-if="index == data.tender_other_files.length - 1"
                        class="append mx-1"
                        @click="appendOtherFileRow"
                      >
                        <i class="fas fa-plus-circle"></i>
                      </span>

                      <span
                        v-if="data.tender_other_files.length > 1"
                        class="append mx-1"
                        @click="deleteOtherFileRow(index)"
                      >
                        <i class="fas fa-minus-circle"></i>
                      </span>
                    </div>
                  </div>
                </div>
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
          text: this.$t('breadcrumb.tenders.title'),
          disabled: false,
          href: '/tenders/show-all',
        },
        {
          text: this.$t('breadcrumb.tenders.add'),
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
        category_ids: null,
        title: null,
        desc: null,
        expiry_date: null,
        company_name: null,
        tender_specifications_value: null,
        insurance_value: null,
        selectedFile: {
          name: null,
          path: null,
          file: null,
        },
        tender_images: [
          {
            image: null,
          },
        ],
        tender_other_files: [
          {
            file: null,
            name: null,
            path: null,
          },
        ],
      },

      // ========== Select Lists Data
      // ========== Model
      model_1: {
        show_model: false,
        model_img_src: '',
      },
      clients: [],
      categories: [],
    }
  },

  mounted() {
    this.getDataLocalStorage()
    this.$globalServices
      .getData('clients/without-pagination')
      .then((data) => (this.clients = data))
    this.$globalServices
      .getData('categories_without_pagination')
      .then((data) => (this.categories = data))
  },

  methods: {
    allowedDates(val) {
      let current = new Date(val)
      current.setDate(current.getDate() + 1)
      return current >= new Date()
    },
    addDataLocalStorage() {
      localStorage.setItem('tender_data', JSON.stringify(this.data))
    },

    getDataLocalStorage() {
      if (localStorage.getItem('tender_data')) {
        this.data = JSON.parse(localStorage.getItem('tender_data'))
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
      } else if (!this.data.category_ids) {
        this.$iziToast.error({
          timeout: 2000,
          message: this.$t('forms.validation.category'),
          position: 'bottomRight',
        })
        this.btnIsLoading = false
        return
      } else if (!this.data.selectedFile.file) {
        this.$iziToast.error({
          timeout: 2000,
          message: 'ملف مواصفات المزاد مطلوب',
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

      if (!this.data.tender_images[0].image) {
        this.$iziToast.error({
          timeout: 2000,
          message: 'حقل صوره المزاد مطلوب',
          position: 'bottomRight',
        })
        this.btnIsLoading = false
        return
      }
      this.submitData()
    },
    handelSelectedFile(e) {
      this.data.selectedFile.file = e.target.files[0]
      this.data.selectedFile.name = e.target.files[0].name
      this.data.selectedFile.path = URL.createObjectURL(e.target.files[0])
    },
    handelOtherFile(e, index) {
      this.data.tender_other_files[index].file = e.target.files[0]
      this.data.tender_other_files[index].name = e.target.files[0].name
      this.data.tender_other_files[index].path = URL.createObjectURL(
        e.target.files[0],
      )
    },
    appendTenderImagesRow() {
      this.data.tender_images.push({
        image: null,
      })
    },
    deleteTenderImagesRow(index) {
      this.data.tender_images.splice(index, 1)
    },
    appendOtherFileRow() {
      this.data.tender_other_files.push({
        file: null,
        name: null,
        path: null,
      })
    },
    deleteOtherFileRow(index) {
      this.data.tender_other_files.splice(index, 1)
    },
    uplodeImg(obj, index) {
      this.data.tender_images[index].image = obj
    },
    // Submit Data
    submitData() {
      const submit_data = new FormData()
      submit_data.append('user_id', this.data.user_id.id)
      this.data.category_ids.map((el, index) =>
        submit_data.append(`category_ids[${index}]`, el.id),
      )

      submit_data.append('title', this.data.title)
      submit_data.append('desc', this.data.desc)
      submit_data.append('expiry_date', this.data.expiry_date)
      submit_data.append('company_name', this.data.company_name)
      submit_data.append(
        'tender_specifications_value',
        this.data.tender_specifications_value,
      )
      submit_data.append('insurance_value', this.data.insurance_value)
      if (this.data.selectedFile.file) {
        submit_data.append(
          'tender_specifications_file',
          this.data.selectedFile.file,
        )
      }
      this.data.tender_images.map((el, index) => {
        if (el.image) {
          submit_data.append(`tender_images[${index}]`, el.image?.img_file)
        }
      })
      this.data.tender_other_files.map((el, index) => {
        if (el.file) {
          submit_data.append(`tender_other_files[${index}]`, el.file)
        }
      })

      this.$axios({
        method: 'POST',
        url: 'tenders',
        data: submit_data,
      })
        .then(() => {
          // =============== Start:: Remove Form Data From LocalStorage =============== //
          localStorage.removeItem('tender_data')

          // =============== End:: Remove Form Data From LocalStorage =============== //
          this.$iziToast.success({
            timeout: 2000,
            message: this.$t('addSuccess'),
            position: 'bottomRight',
          })
          this.$router.push({ path: '/tenders/show-all' })
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
