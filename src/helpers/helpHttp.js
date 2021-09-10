export const helpHttp = () => {

    const customFetch = (endpoint, options) => {

        const defaultHeader = {accept: "application/json"}
        const controller = new AbortController()
        options.signal = controller.signal;
        options.method = options.method || "GET";
        options.headers = options.headers? {...defaultHeader, ...options.headers} : defaultHeader;
        options.body = JSON.stringify(options.body) || false ;
        if(!options.body) delete options.body ;

        let timer = setTimeout(() => {
            controller.abort()
        }, 3000)

        return fetch(endpoint, options)
            .then(res => {
                if(res.ok){
                    clearTimeout(timer)
                    return res.json()
                }else{
                    return Promise.reject(res)
                }
            })
            .catch(res=>{
                clearTimeout(timer)
                let err = {
                    err: true,
                    status: res.status || '',
                    statusText: res.statusText || 'An error has occurred'
                }
                return err
            })
    }

    const get = (url, options = {}) => customFetch(url, options);

    const post = (url, options = {}) => {
        options.method = "POST"
        return customFetch(url, options)
    }
    const put = (url, options = {}) => {
        options.method = "PUT"
        return customFetch(url, options)
    }
    const del = (url, options = {}) => {
        options.method = "DELETE"
        return customFetch(url, options)
    }
 
    return{ get, post, put, del }
}