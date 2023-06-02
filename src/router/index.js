import Vue from 'vue'
import VueRouter from 'vue-router'

// ============================== Start Views ==============================
import Home from '../views/Home.vue' // Home

// ********** Children
import HomePage from '../views/children/HomePage.vue'

// ========== Start HomePage ==========

// ========== Start Users ==========

import UsersHome from '../views/children/Users/Home.vue'
import AllUserss from '../views/children/Users/ShowAll.vue'
import AddUsers from '../views/children/Users/Add.vue'
import EditUsers from '../views/children/Users/Edit.vue'
import UserShowHome from '../views/children/Users/UserProfile/AdminShowHome.vue'

// ========== end Users ==========

// ========== Start Countries ==========
import CountriesHome from '../views/children/Countries/Home.vue'
// Show All
import AllCountries from '../views/children/Countries/ShowAll.vue'
// Add
import AddCountry from '../views/children/Countries/Add.vue'
// Edit
import EditCountry from '../views/children/Countries/Edit.vue'
// ========== End Countries ==========

// ========== Start Cities ==========
import CitiesHome from '../views/children/Cities/Home.vue'
// Show All
import AllCities from '../views/children/Cities/ShowAll.vue'
// Add
import AddCity from '../views/children/Cities/Add.vue'
// Edit
import EditCity from '../views/children/Cities/Edit.vue'
// ========== End Cities ==========

// ========== Start profile ==========
// import ProfileHome from '../views/children/Profile/Home.vue'
// import ProfileShow from '../views/children/Profile/AdminShowHome.vue'
// import ProfileEdit from '../views/children/Profile/Edit.vue'
// ********** Auth
import Login from '../views/Auth/Login.vue'

// ********** NotFound
import NotFound from '../views/NotFound.vue'

// ============================== End Views ==============================

// Vuex store
import store from '../store/index'
let router = null
window.rootRouter = router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    // Main
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '/',
          name: 'HomePage',
          component: HomePage,
        },

        // ========== Start Categories ==========
        {
          path: 'categories',
          component: () => import('../views/children/Categories/Home.vue'),
          children: [
            {
              path: 'show-all',
              name: 'AllCategories',
              component: () =>
                import('../views/children/Categories/ShowAll.vue'),
            },
            // Add
            {
              path: 'add',
              name: 'AddCategory',
              component: () => import('../views/children/Categories/Add.vue'),
            },
            // Edit
            {
              path: 'edit/:id',
              name: 'EditCategory',
              component: () => import('../views/children/Categories/Edit.vue'),
              props: true,
            },
            // Sub
          ],
        },
        // ========== End Categories ==========

        // ========== Start Users ==========
        {
          path: '/users',
          component: UsersHome,
          children: [
            {
              path: 'show-all',
              name: 'AllUserss',
              component: AllUserss,
            },
            {
              path: 'add',
              name: 'AddUsers',
              component: AddUsers,
            },
            {
              path: 'edit/:id',
              name: 'EditUsers',
              component: EditUsers,
              props: true,
            },
            // Show Admin
            {
              path: 'show/:id',
              component: () =>
                import('../views/children/Users/UserProfile/AdminShowHome.vue'),
              props: true,
              children: [
                {
                  path: '',
                  component: () =>
                    import(
                      '@/views/children/Users/UserProfile/children/Cards.vue'
                    ),
                },
                {
                  path: 'data',
                  component: () =>
                    import(
                      '../views/children/Users/UserProfile/children/PersonalData.vue'
                    ),
                },
              ],
            },
          ],
        },
        // ========== End Users ==========

        // ========== Start Admins ==========
        {
          path: '/admins',
          component: () => import('../views/children/Admins/Home.vue'),
          children: [
            {
              path: 'show-all',
              name: 'AllAdmins',
              component: () => import('../views/children/Admins/ShowAll.vue'),
            },
            {
              path: 'add',
              name: 'AddAdmins',
              component: () => import('../views/children/Admins/Add.vue'),
            },
            {
              path: 'edit/:id',
              name: 'EditAdmins',
              component: () => import('../views/children/Admins/Edit.vue'),
              props: true,
            },
            // Show Admin
            {
              path: 'show/:id',
              component: () =>
                import(
                  '../views/children/Admins/AdminProfile/AdminShowHome.vue'
                ),
              props: true,
            },
          ],
        },
        // ========== End Admins ==========

        // ========== Start profile ==========
        {
          path: '/profile',
          component: () =>
            import('../views/children/Profile/AdminShowHome.vue'),
          children: [
            {
              path: 'show',
              component: () =>
                import(
                  '../views/children/Profile/UserProfile/children/Cards.vue'
                ),
            },
            {
              path: 'data',
              component: () =>
                import(
                  '../views/children/Profile/UserProfile/children/PersonalData.vue'
                ),
            },

            {
              path: 'edit',
              component: () => import('../views/children/Profile/Edit.vue'),
            },
          ],
        },
        // ========== End profile ==========
        // ========== Start Tenders ==========
        {
          path: '/tenders',
          component: () => import('@/views/children/Tenders/Home.vue'),
          children: [
            // Show All
            {
              path: 'show-all',
              name: 'AllTenders',
              component: () => import('@/views/children/Tenders/ShowAll.vue'),
            },
            // Add
            {
              path: 'add',
              name: 'AddTender',
              component: () => import('@/views/children/Tenders/Add.vue'),
            },
            // Show
            {
              path: 'show/:id',
              name: 'ShowTender',
              component: () => import('@/views/children/Tenders/Show.vue'),
              props: true,
            },
            // Edit
            {
              path: 'edit/:id',
              name: 'EditTender',
              component: () => import('@/views/children/Tenders/Edit.vue'),
              props: true,
            },
          ],
        },
        // ========== End Tenders ==========
        // ========== Start Expiration ==========
        {
          path: '/expirations',
          component: () => import('@/views/children/Expiration/Home.vue'),
          children: [
            // Show All
            {
              path: 'show-all',
              name: 'AllExpiration',
              component: () =>
                import('@/views/children/Expiration/ShowAll.vue'),
            },
            // Add
            {
              path: 'add',
              name: 'AddExpiration',
              component: () => import('@/views/children/Expiration/Add.vue'),
            },
            // Show
            {
              path: 'show/:id',
              name: 'ShowExpiration',
              component: () => import('@/views/children/Expiration/Show.vue'),
              props: true,
            },

            // Edit
            {
              path: 'edit/:id',
              name: 'EditExpiration',
              component: () => import('@/views/children/Expiration/Edit.vue'),
              props: true,
            },
          ],
        },
        // ========== End Expiration ==========
        // ========== Start Agents ==========
        {
          path: '/agents',
          component: () => import('@/views/children/Agents/Home.vue'),
          children: [
            // Show All
            {
              path: 'show-all',
              name: 'AllAgents',
              component: () => import('@/views/children/Agents/ShowAll.vue'),
            },
            // Add
            {
              path: 'add',
              name: 'AddAgent',
              component: () => import('@/views/children/Agents/Add.vue'),
            },
            // Show
            {
              path: 'show/:id',
              name: 'ShowAgent',
              component: () => import('@/views/children/Agents/Show.vue'),
              props: true,
            },

            // Edit
            {
              path: 'edit/:id',
              name: 'EditAgent',
              component: () => import('@/views/children/Agents/Edit.vue'),
              props: true,
            },
          ],
        },
        // ========== End Agents ==========
        // ========== Start Countries ==========
        {
          path: '/countries',
          component: CountriesHome,
          children: [
            // Show All
            {
              path: 'show-all',
              name: 'AllCountries',
              component: AllCountries,
            },
            // Add
            {
              path: 'add',
              name: 'AddCountry',
              component: AddCountry,
            },
            // Edit
            {
              path: 'edit/:id',
              name: 'EditCountry',
              component: EditCountry,
              props: true,
            },
          ],
        },
        // ========== End Countries ==========

        // ========== Start Cities ==========
        {
          path: '/cities',
          component: CitiesHome,
          children: [
            // Show All
            {
              path: 'show-all',
              name: 'AllCities',
              component: AllCities,
            },
            // Add
            {
              path: 'add',
              name: 'AddCity',
              component: AddCity,
            },
            // Edit
            {
              path: 'edit/:id',
              name: 'EditCitiy',
              component: EditCity,
              props: true,
            },
          ],
        },
        // ========== End Cities ==========

        // ========== Start Jobs ==========
        {
          path: '/jobs',
          component: () => import('../views/children/Jobs/Home.vue'),
          children: [
            // Show All
            {
              path: 'show-all',
              name: 'AllJobs',
              component: () => import('../views/children/Jobs/ShowAll.vue'),
            },
            // Add
            {
              path: 'add',
              name: 'AddJob',
              component: () => import('../views/children/Jobs/Add.vue'),
            },
            // Show
            {
              path: 'show/:id',
              name: 'ShowJob',
              component: () => import('@/views/children/Jobs/Show.vue'),
              props: true,
            },
            // Edit
            {
              path: 'edit/:id',
              name: 'EditJob',
              component: () => import('../views/children/Jobs/Edit.vue'),
              props: true,
            },
          ],
        },
        // ========== End Jobs ==========

        // ========== Start Packages ==========
        {
          path: '/packages',
          component: () => import('../views/children/Packages/Home.vue'),
          children: [
            // Show All
            {
              path: 'show-all',
              name: 'AllPackages',
              component: () => import('../views/children/Packages/ShowAll.vue'),
            },
            // Add
            {
              path: 'add',
              name: 'AddPackage',
              component: () => import('../views/children/Packages/Add.vue'),
            },
            // Show
            {
              path: 'show/:id',
              name: 'ShowPackage',
              component: () => import('@/views/children/Packages/Show.vue'),
              props: true,
            },
            // Edit
            {
              path: 'edit/:id',
              name: 'EditPackage',
              component: () => import('../views/children/Packages/Edit.vue'),
              props: true,
            },
          ],
        },
        // ========== End Packages ==========
        // ========== Start Subscription ==========
        {
          path: '/subscriptions',
          component: () => import('../views/children/Subscription/ShowAll.vue'),
          name: 'AllSubscription',
        },
        // ========== End Subscription ==========

        // ========== Start  Notifications ==========
        {
          path: '/notifications',
          component: () => import('../views/children/Notifications/Home.vue'),
          children: [
            // Show All
            {
              path: 'show-all',
              name: 'AllNotifications',
              component: () =>
                import('../views/children/Notifications/ShowAll.vue'),
            },
            // Add
            {
              path: 'add',
              name: 'AddNotification',
              component: () =>
                import('../views/children/Notifications/Add.vue'),
            },
            // Edit
            {
              path: 'show/:id',
              name: 'ShowNotification',
              component: () =>
                import('../views/children/Notifications/Show.vue'),
              props: true,
            },
          ],
        },
        // ========== End Notifications ==========

        // ========== Start Settings ==========
        {
          path: 'settings',
          name: 'settings',
          component: () => import('../views/children/Settings/Home.vue'),
          children: [
            {
              path: '',
              component: () =>
                import('../views/children/Settings/Global/index.vue'),
            },
            {
              path: 'about',
              component: () =>
                import('../views/children/Settings/About/index.vue'),
            },
            {
              path: 'policy',
              component: () =>
                import('../views/children/Settings/Policy/index.vue'),
            },
            {
              path: 'terms',
              component: () =>
                import('../views/children/Settings/Terms/index.vue'),
            },
            {
              path: 'whyus',
              component: () =>
                import('../views/children/Settings/WhyUs/index.vue'),
            },
          ],
        },
        {
          path: '/contact_messages',
          component: () =>
            import('../views/children/Settings/ContactMessages/ShowAll.vue'),
        },
        // ========== End Settings ==========
      ],
    },

    // Auth
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },

    // NotFound
    { path: '/:notFound(.*)', name: 'NotFound', component: NotFound },
  ],
})

const TOKEN = store.getters['auth_module/currentUser'].token

router.beforeEach((to, _2, next) => {
  if (to.name !== 'Login' && !TOKEN) {
    next({ name: 'Login' })
  } else if (to.name == 'Login' && TOKEN) {
    next('/')
  } else if (to.name == 'Login' || to.name == 'NotFound') {
    store.dispatch('sideNav_module/reseatBodyPadding')
    next()
  } else {
    next()
  }
})

Vue.use(VueRouter)
export default router
