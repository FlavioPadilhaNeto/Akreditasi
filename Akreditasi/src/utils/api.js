import axios from 'axios';
import { APP_ID, APP_SECRET } from '../store/actions/auth';

const mocks = {
  auth: { POST: { token: "This-is-a-mocked-token" } },
  "user/me": { GET: { name: "Usuario", title: "Sr." } }
};

const apiCall = {
    mockCall: ({ url, method }) =>
        new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    resolve(mocks[url]["GET"]);
                    console.log(`Mocked '${url}' - ${method || "GET"}`);
                    console.log("response: ", mocks[url][method || "GET"]);
                } catch (err) {
                    reject(new Error(err));
                }
            }, 1000);
        }),
    tokenCall: ({ url, method }) =>
        new Promise((resolve, reject) => {
            var header = {};
            header.access_token = localStorage.getItem("user-token");
            header.client_id = APP_ID;
            header["Content-Type"] = "application/json"

            axios({
                method: method,
                url: url,
                auth: {
                    username: APP_ID,
                    password: APP_SECRET
                }
            }).then(function (response) {
                resolve(response);
            })
                .catch(function (error) {
                    reject(error);
                });
        }),

    apiCall: ({ url, data, method, header = {} }) =>
        new Promise((resolve, reject) => {
            header.access_token = localStorage.getItem("user-token");
            header.client_id = APP_ID;
            header["Content-Type"] = "application/json"

            axios({
                method: method,
                url: url,
                headers: header,
                data: data
            }).then(function (response) {
                resolve(response);
            })
            .catch(function (error) {
                reject(error);
            });
        })
}

export default apiCall;
