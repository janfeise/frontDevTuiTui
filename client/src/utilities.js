/* 
    格式化参数
    ex: formatParams({ some_key: "some_value", a: "b"}) => "some_key=some_value&a=b"
*/
function formatParams(params) {
    return Object.keys(params)
    .map((key) => key + "=" + encodeURIComponent(params[key]))
    .join("&");
};

/* 
    将响应传来的数据JSON化，request<===>response
*/
function convertToJSON(res)
{
    if (!res.ok)
    {
        throw `API request failed with response status ${res.status} and text: ${res.statusText}`;
    }
    
    // 克隆响应并读取响应文本
    return res.clone()
        .text()  // 获取响应文本
        .then(text => {
            try {
                // 尝试将文本解析为 JSON
                return JSON.parse(text);
            } catch (error) {
                // 如果解析失败，抛出错误
                throw `API request's result could not be converted to a JSON object: \n${text}`;
            }
        });
}

export function get(endpoint, params = {})
{
    const fullPath =  "/api" + endpoint + "?" + formatParams(params);
    return fetch(fullPath)
    .then(convertToJSON)
    .catch((error) => {
        throw `GET request to ${fullPath} failed with error: \n${error}`
    });
}

export function post(endpoint, params = {})
{
    return fetch("/api" + endpoint, {
        method: "post",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(params),
    })
    .then(convertToJSON)
    .catch(error => {
        throw `POST request to ${endpoint} failed with error:\n${error}`;
    })
}