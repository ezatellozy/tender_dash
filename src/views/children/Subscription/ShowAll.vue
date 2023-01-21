<template>
  <div class="wrraper">
    <!-- Start Breadcrumb -->
    <Breadcrumb :items="items" />
    <!-- End Breadcrumb -->

    <!-- Start Statistics Card-->

    <!-- Start Main Loader -->
    <transition name="fadeInUp" mode="out-in" v-if="loaderPage">
      <MainLoader />
    </transition>
    <!-- End Main Loader -->
    <div class="fadeIn" v-else>
      <!-- <div class="row mb-5">
        <div class="wrraper">
          <stats-card
            :title="$t('countriesNum')"
            :number="statisticsItem.number"
          ></stats-card>
        </div>
      </div> -->
      <!-- End Statistics Card-->
      <template>
        <!-- Start Main Section -->
        <main>
          <v-data-table
            class="elevation-1 thumb diff_table"
            :headers="headers"
            :items="rows"
            :search="search"
            :custom-filter="helper_filterSearch"
            :loading="loading"
            :loading-text="$t('table.loadingData')"
            item-key="id"
            :items-per-page="paginations.items_per_page"
            hide-default-footer
          >
            <!-- ================== You Can use any slots you want ================== -->
            <!-- Select no data State -->
            <template v-slot:no-data>
              {{ $t('table.noData') }}
            </template>

            <template v-slot:[`item.is_expired`]="{ item }">
              <span
                class="status"
                :class="item.is_expired ? 'success' : 'canceled'"
              >
                {{ item.is_expired ? $t('yes') : $t('no') }}
              </span>
            </template>

            <!-- Select actions-->
            <template v-slot:[`item.actions`]="{ item }">
              <div class="_actions">
                <v-icon class="show" small @click="showItem(item)">
                  fal fa-eye
                </v-icon>

                <v-icon class="edit" small @click="editItem(item)">
                  fal fa-edit
                </v-icon>
                <v-icon class="delete" small @click="deleteItem(item)">
                  fal fa-trash
                </v-icon>
              </div>
            </template>

            <!-- ======================== Start Top Section ======================== -->
            <template v-slot:top>
              <h3 class="title table-title">
                الباقات
              </h3>
              <!-- Delete dialog -->
              <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card>
                  <v-card-title class="text-h5 justify-center">
                    {{ $t('table.deletedialog.areYouSure') }}
                  </v-card-title>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="#1B5E20" @click="deleteItemConfirm">
                      {{ $t('table.deletedialog.ok') }}
                    </v-btn>
                    <v-btn color="#F44336" @click="dialogDelete = false">
                      {{ $t('table.deletedialog.cancel') }}
                    </v-btn>
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>

              <!-- Add & Delete -->
              <v-row>
                <v-col cols="12" sm="8"></v-col>
              </v-row>
            </template>
            <!-- ======================== End Top Section ======================== -->
          </v-data-table>
        </main>
        <!-- End Main Section -->

        <!-- Start Pagination -->
        <template>
          <div
            class="pagination_container text-center mb-5 d-flex justify-content-end"
          >
            <v-pagination
              v-model.number="paginations.current_page"
              :length="paginations.last_page"
              :total-visible="5"
              @input="fetchData($event)"
            ></v-pagination>
          </div>
        </template>
        <!-- End Pagination -->

        <!-- Start Image_Model -->

        <v-dialog v-model="model_1.show_model" persistent max-width="700px">
          <v-card>
            <v-container>
              <div class="row justify-content-between">
                <!-- Start:: title -->
                <div
                  class="col-lg-6 py-0"
                  v-for="(item, key) of model_1.itemToShow"
                  :key="item"
                >
                  <div class="input_wrapper top_label">
                    <input
                      disabled
                      type="text"
                      class="form-control"
                      :value="item"
                    />
                    <label for="name_input" class="form-label">
                      {{ $t(`forms.labels.${key}`) }}
                    </label>
                  </div>
                </div>
                <!-- End:: title-->
              </div>
            </v-container>
            <v-spacer></v-spacer>
            <v-btn
              color="blue darken-1"
              text
              @click="model_1.show_model = false"
            >
              اغلاق
            </v-btn>
          </v-card>
        </v-dialog>
        <!-- End Image_Model -->
      </template>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      // ========== Main Loader
      loaderPage: false,
      // ========== Breadcrumbs
      items: [
        {
          text: this.$t('breadcrumb.mainPage'),
          disabled: false,
          href: '/',
        },
        {
          text: this.$t('breadcrumb.subscription.title'),
          disabled: false,
          href: '/subscriptionl',
        },
      ],

      // ========== Statistics
      statisticsItem: 0,

      // ========== Top Section
      search: '',

      // ========== dialog Status
      dialogDelete: false,
      itemtoDelete: null,

      // ========== Model
      model_1: {
        show_model: false,
        itemToShow: null,
      },

      // ========== Body Section
      calories: '',

      // ========== Your Data
      rows: [], // injected in created

      // ========== pagination
      paginations: {
        current_page: 1,
        last_page: 2,
        items_per_page: 20,
      },

      // ========== Loding
      loading: false,
    }
  },

  computed: {
    ...mapGetters({
      lang: 'lang_module/lang',
    }),

    headers() {
      if (this.lang == 'ar') {
        return [
          {
            text: '#',
            align: 'center',
            value: 'id',
            sortable: true,
          },
          {
            text: 'العنوان',
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
            text: 'الحالة',
            align: 'center',
            value: 'duration_by_month',
            sortable: false,
          },
          {
            text: 'تغيير الحالة',
            align: 'center',
            value: 'type',
            sortable: false,
          },
        ]
      } else {
        return [
          {
            text: '#',
            align: 'center',
            value: 'id',
            sortable: true,
          },
          {
            text: 'Flag',
            align: 'center',
            value: 'image',
            sortable: false,
          },
          {
            text: 'Name',
            align: 'center',
            value: 'ar.name',
            sortable: false,
          },
          {
            text: 'Name (En)',
            align: 'center',
            value: 'en.name',
            sortable: false,
          },
          {
            text: 'Short Name',
            align: 'center',
            value: 'short_name',
            sortable: false,
          },
          {
            text: 'Phone Code',
            align: 'center',
            value: 'phonecode',
            sortable: false,
          },
          {
            text: 'Currency (Ar)',
            align: 'center',
            value: 'ar.currency',
            sortable: false,
          },
          {
            text: 'Currency (En)',
            align: 'center',
            value: 'en.currency',
            sortable: false,
          },
          {
            text: 'Actions',
            value: 'actions',
            sortable: false,
            align: 'center',
          },
        ]
      }
    },
  },

  methods: {
    // ===== Search Method =====
    filterClick(word) {
      if (!this.loading) {
        this.search = word
        this.helper_filterSearch()
      }
    },

    // img Model
    show_model_1(e) {
      this.model_1.itemToShow = e
      this.model_1.show_model = true
    },

    // ==================== Start CRUD ====================
    addItem() {
      this.$router.push({ path: '/packages/add' })
    },
    showItem(item) {
      let obj = {}
      for (const [key, value] of Object.entries(item)) {
        if (key != 'id') {
          obj[key] = value
        }
      }
      this.model_1.itemToShow = obj
      this.model_1.show_model = true
    },
    editItem(item) {
      this.$router.push({ path: '/packages/edit/' + item.id })
    },
    // ===== Delete
    deleteItem(item) {
      this.dialogDelete = true
      this.itemtoDelete = item
    },
    deleteItemConfirm() {
      this.$axios({
        method: 'DELETE',
        url: `packages/${this.itemtoDelete.id}`,
      })
        .then(() => {
          this.rows = this.rows.filter((item) => {
            return item.id != this.itemtoDelete.id
          })
          this.dialogDelete = false
          this.$iziToast.success({
            timeout: 2000,
            message: this.$t('deleteSuccess'),
            position: 'bottomRight',
          })
        })
        .catch((err) => {
          this.dialogDelete = false
          this.$iziToast.error({
            timeout: 2000,
            message: err.response.data.message,
            position: 'bottomRight',
          })
        })
    },
    // ==================== End CRUD ====================

    // Set Rows
    setRows() {
      this.loading = true
      this.loaderPage = true
      this.$axios({
        method: 'GET',
        url: 'subscriptions',
        params: { page: this.paginations.current_page },
      })
        .then((res) => {
          this.paginations.last_page = res.data.meta?.last_page
          this.paginations.items_per_page = res.data.meta?.per_page
          this.rows = res.data.data
          this.statisticsItem = res.data.meta?.total || 0
          this.loaderPage = false
          this.loading = false
        })
        .catch((err) => {
          this.loading = false
          this.loaderPage = false
        })
    },
    fetchData(e) {
      this.$router.replace({ query: { page: e } })
      this.setRows()
    },
  },
  created() {
    if (this.$route.query.page) {
      this.paginations.current_page = +this.$route.query.page
    }
    this.setRows()
  },

  // ======= hooks
}
</script>

<style lang="scss" scoped></style>
