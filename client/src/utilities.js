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
    if (res.code === 401) {
      console.log("401");
    }
    throw `API request failed with response status ${res.status} and text: ${res.statusText}`;
  }

  // 直接返回响应体的 JSON 数据
  return res.json().catch((error) => {
    throw `API request's result could not be converted to a JSON object: \n${error}`;
  });
}

export function get(endpoint, params = {}) {
  // 获取浏览器存储的token
  const TOKEN = localStorage.getItem("TuiTui");
  console.log("params: " + params + TOKEN);
  const fullPath =
    endpoint + (Object.keys(params).length ? "?" + formatParams(params) : "");
  return fetch(fullPath, {
    method: "GET",
    headers: {
      "User-Agent": "test",
      "Content-type": "application/json",
      Accept: "application/json",
      ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}),
    },
  })
    .then(convertToJSON)
    .catch((error) => {
      throw `GET request to ${fullPath} failed with error: \n${error}`;
    });
}

export function post(endpoint, params = {}) {
  // 获取浏览器存储的token
  const TOKEN = localStorage.getItem("TuiTui");
  return fetch(endpoint, {
    method: "post",
    headers: {
      "User-Agent": "test",
      "Content-type": "application/json",
      ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}),
    },
    body: JSON.stringify(params),
    credentials: "include", // 将 Cookies 和认证信息发送给服务器
  })
    .then((response) => {
      // 获取 Authorization 头
      const authorizationHeader = response.headers.get("Authorization");
      if (authorizationHeader) {
        const token = authorizationHeader.split(" ")[1]; // 提取 token 部分
        return response.json().then((data) => ({ data, token })); // 同时返回数据和 token
      } else {
        return response.json().then((data) => ({ data }));
      }
    })
    .catch((error) => {
      throw new Error(`POST request to ${endpoint} failed: ${error}`);
    });
}

/**
 * 延迟函数：模仿sleep(1000)
 *
 * @param {Number} ms - 毫秒
 */
export const delay = async (ms) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
