<template>
  <div class="profile_wrapper most_profile">
    <div
      class="profile_header_wrapper custom_card"
      :style="`background: var(--mainColor-2)`"
    >
      <vue-particles
        color="#fff"
        :particleOpacity="0.7"
        :particlesNumber="180"
        shapeType="circle"
        :particleSize="4"
        linesColor="#fff"
        :linesWidth="1"
        :lineLinked="true"
        :lineOpacity="0.3"
        :linesDistance="100"
        :moveSpeed="4"
        :hoverEffect="true"
        :clickEffect="true"
        hoverMode="repulse"
        clickMode="push"
      ></vue-particles>

      <div class="profile_header_data" v-if="data.userInfo">
        <div class="avatar_wrapper">
          <img
            :src="data.userInfo.avatar"
            width="100"
            height="100"
            alt="Avatar"
          />
        </div>

        <div class="name_wrapper">
          <h3 class="mb-0">
            {{ data.userInfo.name }}
          </h3>
          <p class="mb-0">{{ data.userInfo.email }}</p>
        </div>
      </div>
      <div
        v-else
        class="text-center text-white mt-4 fs-4 position-absolute top-50 w-100"
      >
        لا يوجد بيانات
      </div>
    </div>
    <transition name="fadeInUp" mode="out-in" v-if="!data.userInfo">
      <MainLoader />
    </transition>

    <router-view :userInfo="data.userInfo"></router-view>
  </div>
</template>

<script>
import PersonalData from '../../Users/UserProfile/children/PersonalData.vue'
export default {
  components: { PersonalData },
  props: ['id'],

  data() {
    return {
      data: {
        userInfo: null,
        loading: false,
      },
    }
  },

  methods: {
    getData() {
      this.data.loading = true
      this.$axios({
        method: 'GET',
        url: `client/${this.id}`,
      })
        .then((res) => {
          this.data.userInfo = res.data.data
          this.data.userInfo.loading = false

          this.data.loading = false
        })
        .catch((err) => {
          this.$iziToast.error({
            timeout: 2000,
            message: err.response.data.message,
            position: 'bottomRight',
          })
          this.data.loading = false
        })
    },
  },

  created() {
    this.getData()
  },
}
</script>

<style></style>
