/* 
    格式化参数
    ex: formatParams({ some_key: "some_value", a: "b"}) => "some_key=some_value&a=b"
*/
function formatParams(params) {
    return Object.keys(params)
        .map((key) => key + "=" + encodeURIComponent(params[key]))
        .join("&");
}

/* 
    将响应传来的数据JSON化，request<===>response
*/
function convertToJSON(res) {
    if (!res.ok) {
        throw new Error(`API request failed with response status ${res.status} and text: ${res.statusText}`);
    }
    
    return res
    .json()
    .catch((err) => {
        return res.text().then(text => {
            throw new Error(`API request's result could not be converted to a JSON object: \n${text}`);
        });
    });
}

export function get(endpoint, params = {}) {
    const fullPath = endpoint + "?" + formatParams(params);
    return fetch(fullPath)
        .then(convertToJSON)
        .catch((err) => {
            throw new Error(`GET request to ${fullPath} failed with error: \n${err}`);
        });
}

export function post(endpoint, params = {}) {
    return fetch("api" + endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params),
    })
    .then(convertToJSON)
    .catch(err => {
        throw new Error(`POST request to ${endpoint} failed with error:\n${err}`);
    });
}
