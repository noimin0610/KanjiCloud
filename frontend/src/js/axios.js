import * as _axios from 'axios'
// _axios.defaults.baseURL = "https://kanji-cloud-api.herokuapp.com"
_axios.defaults.baseURL = "http://localhost:5000"

export let handleError = (error) => {
    alert("通信エラーが発生しました。")
    console.log(error)
}

export let axios = _axios