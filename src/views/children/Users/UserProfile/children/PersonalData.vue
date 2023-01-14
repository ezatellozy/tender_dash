<template>
  <div class="teacher_data">
    <!-- Start Main Loader -->

    <!-- End Main Loader -->
    <div class="personal_data_wrapper fadeIn">
      <div class="order-details-page mb-5">
        <div class="row py-2 mx-1 justify-content-center align-items-center">
          <div class="col-12">
            <div class="details border-right-0">
              <div class="row">
                <div class="col-sm-6 pt-0">
                  <div class="customer">
                    <div class="item">
                      <div class="icon">
                        <i class="fal fa-user"></i>
                      </div>
                      <div class="info">
                        <h5 class="title">
                          {{ $t('forms.labels.name') }}
                        </h5>
                        <p>
                          {{ userInfo.full_name }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-sm-6 pt-0">
                  <div class="customer">
                    <div class="item">
                      <div class="icon">
                        <i class="fal fa-futbol"></i>
                      </div>
                      <div class="info">
                        <h5 class="title">
                          {{ $t('forms.labels.phone') }}
                        </h5>
                        <p>{{ userInfo.phone }} - {{ userInfo.phone_code }}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-sm-6 pt-0">
                  <div class="customer">
                    <div class="item">
                      <div class="icon">
                        <i class="fal fa-futbol"></i>
                      </div>
                      <div class="info">
                        <h5 class="title">
                          {{ $t('forms.labels.country') }}
                        </h5>
                        <p>{{ userInfo.country.name }}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-12 fadeIn">
                  <div class="large-map">
                    <GmapMap
                      style="width: 100%; min-height: 300px; max-height: 100%;"
                      :center="{ lat: userInfo.lat, lng: userInfo.lng }"
                      :zoom="7"
                      :draggable="true"
                      map-type-id="terrain"
                    >
                      <GmapMarker
                        :position="{ lat: userInfo.lat, lng: userInfo.lng }"
                        :clickable="false"
                        :draggable="false"
                      />
                    </GmapMap>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['userInfo'],

  data() {
    return {
      data: {},
    }
  },

  computed: {
    isActive() {
      return this.userInfo.is_active ? this.$t('active') : this.$t('inactive')
    },

    isBan() {
      return this.userInfo.is_ban ? this.$t('ban') : this.$t('inban')
    },
    isActiveManager() {
      return this.userInfo.is_ban ? 'غير مفعل' : ' مفعل'
    },
  },

  methods: {},
}
</script>

<style>
.border-right-0 {
  border-right-width: 0 !important;
}
</style>
