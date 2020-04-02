import axios from 'axios'
import qs from 'qs';

const request = axios.create({
    // baseURL: 'http://111.229.84.153:234',
    // baseURL: 'http://192.168.0.103:234',
    baseURL: 'https://news.yuanjun1024.tech:8080',
    method: 'post',
    transformRequest: [function (data, headers) {
        return qs.stringify(data);
    }],
    transformResponse: [function (data) {
        return JSON.parse(data);
    }],
})

export default request