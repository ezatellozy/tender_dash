<template>
  <div class="wrraper">
    <!-- Start Breadcrumb -->
    <Breadcrumb
      :items="items"
      search_route="/categories/add"
      search_title="إضافه قسم جديد"
      icon="fa-plus"
    />
    <!-- End Breadcrumb -->
    <MainLoader v-if="loading"></MainLoader>
    <div class="fadeIn" v-else>
      <main>
        <v-data-table
          class="elevation-1 thumb diff_table"
          :headers="headers"
          :items="rows"
          :search="search"
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

          <template v-slot:[`item.index`]="{ index }">
            {{ index + 1 }}
          </template>

          <!-- Start:: Users Routes -->
          <template v-slot:[`item.image`]="{ item }">
            <img
              :src="item.image"
              width="50"
              height="50"
              class="rounded-circle"
              alt=""
              @click="show_model_1"
            />
          </template>

          <template v-slot:[`item.desc`]="{ item }">
            <span>
              {{ item.desc.slice(0, 50) }}
              {{ item.desc.length > 50 ? '...' : '' }}
            </span>
          </template>
          <template v-slot:[`item.is_active`]="{ item }">
            <span
              class="status"
              :class="item.is_active ? 'success' : 'canceled'"
            >
              {{ item.is_active ? $t('active') : $t('inactive') }}
            </span>
          </template>

          <!-- Select actions-->
          <template v-slot:[`item.actions`]="{ item }">
            <div class="_actions d-flex">
              <v-icon class="show" small @click="editItem(item)">
                fal fa-edit
              </v-icon>
              <!-- <v-icon class="edit" small @click="editItem(item)">
                  fal fa-edit
                </v-icon> -->
              <v-icon class="delete" small @click="deleteItem(item)">
                fal fa-trash
              </v-icon>
            </div>
          </template>

          <!-- ======================== Start Top Section ======================== -->
          <template v-slot:top>
            <h3 class="table-title title">الاقسام</h3>
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
          </template>
          <!-- ======================== End Top Section ======================== -->
        </v-data-table>
      </main>

      <!-- Start Pagination -->
      <template>
        <div
          class="pagination_container text-center mb-5 d-flex justify-content-end"
        >
          <v-pagination
            color="primary"
            v-model="paginations.current_page"
            :length="paginations.last_page"
            :total-visible="5"
            @input="fetchData($event)"
          ></v-pagination>
        </div>
      </template>
      <!-- End Pagination -->
    </div>
    <!-- End Image_Model -->
    <!-- Start Image_Model -->
    <base-model
      @closeModel="model_1.show_model = false"
      :show="model_1.show_model"
    >
      <div class="image">
        <img
          v-if="model_1.model_img_src"
          :src="model_1.model_img_src"
          alt="..."
        />
      </div>
    </base-model>
    <!-- Delete dialog -->
    <v-dialog v-model="dialogDelete" max-width="500px" :retain-focus="false">
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
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
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
          text: this.$t('breadcrumb.categories.all'),
          disabled: true,
          href: '',
        },
      ],

      // ========== Statistics
      statisticsItem: {},

      // ========== Top Section
      search: '',

      // ========== dialog Status
      dialogDelete: false,
      dialogDelete_selected: false,
      itemtoDelete: null,

      // ========== Model
      model_1: {
        show_model: false,
        model_img_src: '',
      },

      // ========== Your Data
      rows: [], // injected in created

      // ========== elected Data
      selected: [],
      singleSelect: false,

      // ========== pagination
      paginations: {
        current_page: 1,
        last_page: 1,
        items_per_page: 20,
      },

      // ========== Loding
      loading: false,
      // expanded: [],
      // singleExpand: false,
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
            align: 'start',
            value: 'index',
            width: '60',
            sortable: false,
          },
          {
            text: 'الصوره',
            align: 'start',
            value: 'image',
            width: '120',
            sortable: true,
          },
          {
            text: 'الاسم',
            align: 'start',
            value: 'name',

            width: '140',
            sortable: true,
          },

          {
            text: 'الوصف',
            align: 'start',
            value: 'desc',

            width: '200',
            sortable: true,
          },

          {
            text: 'مفعل؟',
            align: 'start',
            width: '200',
            value: 'is_active',
            sortable: true,
          },
          {
            text: 'الاجراءات',
            align: 'start',
            width: '120',
            value: 'actions',
            sortable: true,
          },
        ]
      } else {
        return [
          {
            text: '#',
            align: 'start',
            value: 'id',
            sortable: true,
          },
          {
            text: 'Reporter',
            align: 'start',
            value: 'from',
            sortable: false,
          },
          {
            text: 'Reported',
            align: 'start',
            value: 'to',
            sortable: false,
          },
          {
            text: 'Report Reason',
            align: 'start',
            value: 'report_reason',
            sortable: false,
          },
          {
            text: 'Actions',
            value: 'actions',
            sortable: false,
            align: 'start',
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
      this.model_1.model_img_src = e.target.src
      this.model_1.show_model = true
    },

    // ==================== Start CRUD ====================
    addItem() {
      this.$router.push({ path: '/categories/add' })
    },
    showItem(item) {
      this.$router.push({ path: '/categories/show/' + item.id })
    },
    editItem(item) {
      this.$router.push({ path: '/categories/edit/' + item.id })
    },

    // ===== Delete
    deleteItem(item) {
      this.dialogDelete = true
      this.itemtoDelete = item
    },
    deleteItemConfirm() {
      this.$axios({
        method: 'DELETE',
        url: `categories/${this.itemtoDelete.id}`,
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
    deleteSelected() {
      this.dialogDelete_selected = true
    },
    deleteSelectedConfirm() {
      this.$axios({
        method: 'POST',
        url: `categories/deleteAll`,
        data: { ids: this.selected.map((item) => item.id) },
      })
        .then(() => {
          this.rows = this.rows.filter((item) => {
            return !this.selected.filter((obj) => obj.id == item.id).length > 0
          })
          this.dialogDelete_selected = false
          this.$iziToast.error({
            timeout: 2000,
            message: this.$t('deleteSuccess'),
            position: 'bottomRight',
          })
        })
        .catch((err) => {
          this.dialogDelete_selected = false
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
      this.$axios({
        method: 'GET',
        url: 'categories',
        params: { page: this.paginations.current_page },
      })
        .then((res) => {
          this.paginations.last_page = res.data.meta.last_page
          this.paginations.items_per_page = res.data.meta.per_page
          this.rows = res.data.data

          this.loading = false
        })
        .catch((err) => {
          console.log(err)
          this.loading = false
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

<style lang="scss" scoped>
.image {
  // width: 120px;
  img {
    width: 100%;
  }
}
</style>
