import axios from "axios";

//API Docs:
//https://freecurrencyapi.com/

const BASEURL = 'https://api.freecurrencyapi.com/v1/'
const API_KEY = 'UwNZa94VSo93k4LrJyW7JAJo33zipMTnosE49XDF'

export const getCurrencyList = () => {
    return axios.get(BASEURL + 'currencies', {params: {apikey: API_KEY}}).then(res => res.data.data).catch(err => console.log(err))
}

export const getExchangeList = (currency: string) => {
    return axios.get(BASEURL + 'latest', {params: {apikey: API_KEY, base_currency: currency}}).then(res => res.data.data).catch(err => console.log(err))
}

export const getExchange = (from: string, to: string) => {
    return axios.get(BASEURL + 'latest', {params: {apikey: API_KEY, base_currency: from}}).then(res => res.data.data).then(data => {
        for (let key in data) {
            if (key === to) {
                return data[key]
            }
        }
    }).catch(err => console.log(err))
}