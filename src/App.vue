<template>
  <v-app>
    <transition>
      <router-view></router-view>
    </transition>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  mounted() {
    // ===> Vuetify Direction
    if (this.$store.getters['lang_module/lang'] == 'ar') {
      this.$vuetify.rtl = true
    } else {
      this.$vuetify.rtl = false
    }

    // ===> Vuetify Theme
    if (this.$store.getters['theme_module/current_theme'] == 'light') {
      this.$vuetify.theme.dark = false
    } else {
      this.$vuetify.theme.dark = true
    }

    // ===> Scroll To Top Alwayse
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
    
  },
}
</script>
