import i18n from '../i18n'
export default {
  data() {
    return {
      genders: [
        {
          id: 'male',
          name: i18n.t('male'),
        },
        { id: 'female', name: i18n.t('female') },
      ],

      continents: [
        {
          id: 'africa',
          name: i18n.t('africa'),
        },
        {
          id: 'asia',
          name: i18n.t('asia'),
        },
        {
          id: 'europe',
          name: i18n.t('europe'),
        },
        {
          id: 'south_america',
          name: i18n.t('south_america'),
        },
        {
          id: 'north_america',
          name: i18n.t('north_america'),
        },
        {
          id: 'australia',
          name: i18n.t('australia'),
        },
      ],
    }
  },
  methods: {
    helper_checkIfInputIsEmpty(e) {
      let inputElement = e.target
      if (inputElement.value.length > 0) {
        inputElement.classList.remove('empty')
      } else {
        inputElement.classList.add('empty')
      }
    },

    helper_togglePasswordVisibility(e) {
      let passwordElement = e.currentTarget.parentElement.children[1]
      let passwordTogglerBtn = e.currentTarget
      if (passwordElement.type == 'password') {
        passwordElement.type = 'text'
        passwordTogglerBtn.classList.add('password_is_visible')
      } else if (passwordElement.type == 'text') {
        passwordElement.type = 'password'
        passwordTogglerBtn.classList.remove('password_is_visible')
      }
    },

    helper_validEmail(email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(email)
    },

    helper_filterSearch(value, search, item) {
      console.log(item)
      if (search == 'all') return true
      return value != null && search != null && value.indexOf(search) !== -1
    },

    helper_containsObject(obj, arr, key) {
      console.log(arr)
      console.log(key)
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].uniqeID == obj.uniqeID) {
          console.log('the same element')
        } else {
          console.log('not the same')
        }
        // if (arr[i][key] !== obj[key]) {
        //   return true;
        // }
      }
      // return false;
    },
  },
}
