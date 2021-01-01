import * as _axios from 'axios'
_axios.defaults.baseURL = BACK_DOMAIN

export let handleError = (error) => {
    alert("通信エラーが発生しました。")
    console.log(error)
}

export let axios = _axios