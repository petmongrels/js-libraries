import _ from 'lodash';

function getBaseApiUrl() {
    let storyBookBaseUrl = process.env.STORYBOOK_SERVER_BASE_URL;
    if (!_.isNil(storyBookBaseUrl))
        return storyBookBaseUrl;
    return "";
}

const fetchWithTimeOut = (url, options, timeout = 20000) => {
    return Promise.race([
        fetch(url, options),
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error("Server request timed out")), timeout)
        )
    ]);
};

const fetchFactory = (endpoint, method = "GET", params, responseModifier) => {
    let obj = {ok: false};
    return fetchWithTimeOut(endpoint, {"method": method, ...params})
        .then((response) => {
            obj.ok = response.ok;
            obj.status = response.status;
            obj.statusText = response.statusText;
            if (response.ok) {
                return responseModifier(response);
            }
            return response.text();
        })
        .then((data) => {
            if (obj.ok) {
                obj.data = data;
            } else {
                obj.message = data;
            }
            return obj;
        })
        .catch((error) => {
            console.log("requests", "fetchFactory", "error", error);
            obj.error = error;
            return obj;
        });
}

export const HeaderTypes = {
    jsonRequestResponse: "jsonRequestResponse",
    textRequestResponse: "textRequestResponse",
    xWwwForm: "xWwwForm"
}

const headers = {};
headers[HeaderTypes.jsonRequestResponse] = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};
headers[HeaderTypes.textRequestResponse] = {
    'Accept': 'text/plain',
    'Content-Type': 'text/plain'
};
headers[HeaderTypes.xWwwForm] = {
    'Content-Type': 'application/x-www-form-urlencoded'
};

let _getText = (endpoint) =>
    fetchFactory(endpoint, "GET", {headers: headers.textRequestResponse}, (response) => response.text());

export const post = (endpoint, body, headerType = 'jsonRequestResponse') => {
    let fullPath = `${getBaseApiUrl()}${endpoint}`;
    console.log('requests', `POSTing to ${fullPath}`);
    let postBody = headerType === 'jsonRequestResponse' ? JSON.stringify(body) : body;
    return fetchFactory(fullPath, "POST", {body: postBody, headers: headers[headerType]}, (response) => {
        return response.json();
    });
};

const put = (endpoint, body) => {
    let fullPath = `${getBaseApiUrl()}${endpoint}`;
    console.log('requests', `PUTing to ${fullPath}`);
    return fetchFactory(fullPath, "PUT", {body: JSON.stringify(body), headers: headers.jsonRequestResponse}, (response) => {
        return response.json();
    });
};

const patch = (endpoint, body) => {
    let fullPath = `${getBaseApiUrl()}${endpoint}`;
    console.log('requests', `PATCHing to ${fullPath}`);
    return fetchFactory(fullPath, "PATCH", {body: JSON.stringify(body), headers: headers.jsonRequestResponse}, (response) => {
        return response.json();
    });
};

const get = (endpoint) => {
    console.log('requests', `GETing from ${endpoint}`);
    return fetchFactory(endpoint, "GET", {headers: headers.jsonRequestResponse}, (response) => response.json());
};

const getJSON = (endpoint) => {
    return get(endpoint);
};

const deleteCall = (endpoint) => {
    return fetchFactory(endpoint, "DELETE", {}, (response) => response.json());
}

const RC = {
    get: get,
    getJSON: getJSON,
    put: put,
    patch: patch,
    post: post,
    delete: deleteCall
}

export default RC;
