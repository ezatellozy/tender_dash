<template>
  <div class="wrraper">
    <!-- Start Breadcrumb -->
    <Breadcrumb
      :items="items"
      search_route="/agents/add"
      search_title="إضافه وكيل جديدة"
      icon="fa-plus"
    />
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
              {{ $t("table.noData") }}
            </template>

            <!-- avatar -->
            <template v-slot:[`item.agent_images`]="{ item }">
              <img
                v-if="item.agent_images.length"
                @click="show_model_1"
                class="image"
                :src="item.agent_images[0].media"
              />
              <span v-else>لا يوجد</span>
            </template>
            <template v-slot:[`item.is_expired`]="{ item }">
              <span
                class="status"
                :class="item.is_expired ? 'success' : 'canceled'"
              >
                {{ item.is_expired ? $t("yes") : $t("no") }}
              </span>
            </template>
            <template v-slot:[`item.index`]="{ index }">
              <span>{{ index + 1 }}</span>
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
              <h3 class="title table-title">الوكلاء</h3>
              <!-- Delete dialog -->
              <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card>
                  <v-card-title class="text-h5 justify-center">
                    {{ $t("table.deletedialog.areYouSure") }}
                  </v-card-title>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="#1B5E20" @click="deleteItemConfirm">
                      {{ $t("table.deletedialog.ok") }}
                    </v-btn>
                    <v-btn color="#F44336" @click="dialogDelete = false">
                      {{ $t("table.deletedialog.cancel") }}
                    </v-btn>
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>

              <!-- Add & Delete -->
              <v-row>
                <v-col cols="12">
                  <v-tabs fixed-tabs dark class="pt-0 mb-2">
                    <v-tab
                      exact-active-class="v-tab-active"
                      to="/agents/show-all?type=required_agent_or_distrebutor"
                    >
                      مطلوب (وكيل / موزع)
                    </v-tab>
                    <v-tab
                      exact-active-class="v-tab-active"
                      to="/agents/show-all?type=potential_agent_or_potential_distrebutor"
                    >
                      وكيل محتمل / موزع محتمل
                    </v-tab>
                  </v-tabs>
                </v-col>
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
        <!-- End Image_Model -->
      </template>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      // ========== Main Loader
      loaderPage: false,
      // ========== Breadcrumbs
      items: [
        {
          text: this.$t("breadcrumb.mainPage"),
          disabled: false,
          href: "/",
        },
        {
          text: this.$t("breadcrumb.agents.title"),
          disabled: false,
          href: "/agents/show-all",
        },
        {
          text: this.$t("breadcrumb.agents.all"),
          disabled: true,
          href: "",
        },
      ],

      // ========== Statistics
      statisticsItem: {},

      // ========== Top Section
      search: "",

      // ========== dialog Status
      dialogDelete: false,
      itemtoDelete: null,

      // ========== Model
      model_1: {
        show_model: false,
        model_img_src: "",
      },

      // ========== Body Section
      calories: "",

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
    };
  },

  computed: {
    ...mapGetters({
      lang: "lang_module/lang",
    }),

    headers() {
      if (this.lang == "ar") {
        return [
          {
            text: "#",
            align: "center",
            value: "index",
            sortable: true,
          },
          {
            text: "صوره",
            align: "center",
            value: "agent_images",
            sortable: false,
          },
          {
            text: "الاسم",
            align: "center",
            value: "title",
            sortable: false,
          },
          {
            text: "الوصف",
            align: "center",
            value: "desc",
            sortable: false,
          },
          {
            text: "اسم المنتج",
            align: "center",
            value: "product_name",
            sortable: false,
          },
          {
            text: "تاريخ الانتهاء",
            align: "center",
            value: "expiry_date",
            sortable: false,
          },
          {
            text: "منتهي؟",
            align: "center",
            value: "is_expired",
            sortable: false,
          },

          {
            text: "الحالة",
            align: "center",
            value: "status",
            sortable: false,
          },

          {
            text: "التحكم",
            value: "actions",
            sortable: false,
            align: "center",
          },
        ];
      } else {
        return [
          {
            text: "#",
            align: "center",
            value: "id",
            sortable: true,
          },
          {
            text: "Flag",
            align: "center",
            value: "image",
            sortable: false,
          },
          {
            text: "Name",
            align: "center",
            value: "ar.name",
            sortable: false,
          },
          {
            text: "Name (En)",
            align: "center",
            value: "en.name",
            sortable: false,
          },
          {
            text: "Short Name",
            align: "center",
            value: "short_name",
            sortable: false,
          },
          {
            text: "Phone Code",
            align: "center",
            value: "phonecode",
            sortable: false,
          },
          {
            text: "Currency (Ar)",
            align: "center",
            value: "ar.currency",
            sortable: false,
          },
          {
            text: "Currency (En)",
            align: "center",
            value: "en.currency",
            sortable: false,
          },
          {
            text: "Actions",
            value: "actions",
            sortable: false,
            align: "center",
          },
        ];
      }
    },
  },
  watch: {
    [`$route`]() {
      if (this.$route.query.page) {
        this.paginations.current_page = +this.$route.query.page;
        this.setRows();
      } else {
        this.paginations.current_page = 1;
        this.setRows();
      }
    },
  },

  methods: {
    // ===== Search Method =====
    filterClick(word) {
      if (!this.loading) {
        this.search = word;
        this.helper_filterSearch();
      }
    },

    // img Model
    show_model_1(e) {
      this.model_1.model_img_src = e.target.src;
      this.model_1.show_model = true;
    },

    // ==================== Start CRUD ====================
    addItem() {
      this.$router.push({ path: "/agents/add" });
    },
    showItem(item) {
      this.$router.push({ path: "/agents/show/" + item.id });
    },
    editItem(item) {
      this.$router.push({ path: "/agents/edit/" + item.id });
    },
    // ===== Delete
    deleteItem(item) {
      this.dialogDelete = true;
      this.itemtoDelete = item;
    },
    deleteItemConfirm() {
      this.$axios({
        method: "DELETE",
        url: `agents/${this.itemtoDelete.id}`,
      })
        .then(() => {
          this.rows = this.rows.filter((item) => {
            return item.id != this.itemtoDelete.id;
          });
          this.dialogDelete = false;
          this.$iziToast.success({
            timeout: 2000,
            message: this.$t("deleteSuccess"),
            position: "bottomRight",
          });
        })
        .catch((err) => {
          this.dialogDelete = false;
          this.$iziToast.error({
            timeout: 2000,
            message: err.response.data.message,
            position: "bottomRight",
          });
        });
    },
    // ==================== End CRUD ====================

    // Set Rows
    setRows() {
      this.loading = true;
      this.loaderPage = true;
      this.$axios({
        method: "GET",
        url: "agents",
        params: {
          page: this.paginations.current_page,

          type: this.$route.query.type,
        },
      })
        .then((res) => {
          this.paginations.last_page = res.data.meta.last_page;
          this.paginations.items_per_page = res.data.meta.per_page;

          this.rows = res.data.data;
          // console.log(res.data.data)
          this.statisticsItem.number = res.data.meta.total;

          this.loaderPage = false;
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
          this.loaderPage = false;
        });
    },
    fetchData(e) {
      this.$router.replace({ query: { page: e } });
      this.setRows();
    },
  },
  created() {
    if (this.$route.query.page) {
      this.paginations.current_page = +this.$route.query.page;
    }
    this.setRows();
  },

  // ======= hooks
};
</script>

<style lang="scss">
.v-item-group {
  background-color: transparent !important;
  box-shadow: 0px 5px 14px rgb(0 0 0 / 5%);
  .v-tabs-bar__content {
    .v-tab {
      color: var(--mainColor-2) !important;
      &.v-tab-active {
        background: linear-gradient(97.46deg, #2d70ab -1.53%, #2d70ab 132.35%);
        color: #fff !important;
        border-radius: 10px;
      }
    }
  }
  .v-tabs {
    .v-tab {
      letter-spacing: normal !important;
      // color: var(--main) !important;
      // &.v-tab {
      //   color: var(--main) !important;
      // }
    }
    background: linear-gradient(
      97.46deg,
      #322176 -1.53%,
      #2d70ab 132.35%
    ) !important;
  }
  &:not(.v-tab--active) {
    color: transparent !important;
  }
}
._actions {
  > button {
    &:first-child {
      margin-inline-end: 5px;
    }
  }
}
</style>
