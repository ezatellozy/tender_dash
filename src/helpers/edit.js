import axios from 'axios'
import iziToast from 'izitoast'
import i18n from '../i18n'
import 'izitoast/dist/css/iziToast.min.css'
// Vue.prototype.$iziToast = iziToast // Glopal variable
// Vue.use(iziToast)
export default class GlobalEditi {
  submitData({ data }, url) {
    let exeptions = [
      'inputType',
      'step',
      'options',
      'multiple',
      'time_from_modal',
      'time_to_modal',
      'exeptions',
      'image_model',
      'preview',
      'modal',
    ]

    const submit_data = new FormData()
    submit_data.append('_method', 'PUT')

    for (const [item, value] of Object.entries(data)) {
      if (value) {
        if (typeof value == 'object') {
          if (Array.isArray(value)) {
            value.map((main_el, main_index) => {
              for (const [objKey, objValue] of Object.entries(
                value[main_index],
              )) {
                const found = exeptions.find((found) => objKey == found)
                if (found != objKey) {
                  if (item == 'images') {
                    submit_data.append(
                      `${item}[${main_index}]`,
                      objValue?.id ? objValue.id : objValue,
                    )
                  } else {
                    submit_data.append(
                      `${item}[${main_index}][${objKey}]`,
                      objValue?.id ? objValue.id : objValue,
                    )
                  }
                }
              }
            })
          } else {
            for (const [k, v] of Object.entries(value)) {
              const found = exeptions.find((found) => k == found)
              if (k != found) {
                if (k != 'value') {
                  if (item == 'ar' || item == 'en') {
                    submit_data.append(`${item}[${k}]`, v?.value ? v.value : v)
                  } else {
                    if (k == 'id' || k == 'img_file') {
                      submit_data.append(`${item}`, v)
                    }
                  }
                } else {
                  if (Array.isArray(v)) {
                    v.map((e, i) => submit_data.append(`${item}[${i}]`, e.id))
                  } else {
                    submit_data.append(item, v?.id ? v.id : v)
                  }
                }
              }
            }
          }
        } else {
          if (
            item != 'is_active' &&
            item != 'is_ban' &&
            item != 'avatar' &&
            item != 'image' &&
            item != 'is_admin_active_user'
          ) {
            submit_data.append(item, value)
          }
        }
      }
      if (item == 'is_ban') {
        submit_data.append(item, +value)
      }
      if (item == 'is_active') {
        submit_data.append(item, +value)
      }
      if (item == 'is_admin_active_user') {
        submit_data.append(item, +value)
      }
    }
    return axios({
      method: 'POST',
      url: url,
      data: submit_data,
    })
      .then((res) => {
        if (res.data.status == 'success') {
          iziToast.success({
            timeout: 2000,
            message: i18n.t('addSuccess'),
            position: 'bottomRight',
          })
        }
        return res.data
      })
      .catch((err) => {
        if (err.response) {
          let message = ''
          err.response.data.message
            ? (message = err.response.data.message)
            : (message = err.response.data.messages)
          iziToast.error({
            timeout: 2000,
            message: message,
            position: 'bottomRight',
          })
        }
        return err.response
      })
  }
}
