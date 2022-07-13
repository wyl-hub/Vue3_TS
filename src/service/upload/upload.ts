import { BASE_URL } from '../request/config'

const uploadRequest = function(config) {
    return new Promise((resolve, reject) => {
        const { url, data } = config
        const xhr = new XMLHttpRequest()

        const requestUrl = BASE_URL + url
        
        xhr.timeout = 10000
        xhr.open('post', requestUrl)

        xhr.onload = function() {
            resolve(this.responseText)
        }
    
        xhr.onerror = function(err) {
            console.log(err)
            reject(err)
        }
    
        xhr.ontimeout = function(err) {
            console.log(err)
            reject(err)
        }
        xhr.send(data)
    })
}

export default uploadRequest