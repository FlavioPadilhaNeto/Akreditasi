import axios from 'axios';
import { APP_ID, APP_SECRET } from '../store/actions/auth';

const mocks = {
  auth: { POST: { token: "This-is-a-mocked-token" } },
  "user/me": { GET: { name: "doggo", title: "sir" } }
};

const apiCall = ({ url, data, method, token = false }) =>
    new Promise((resolve, reject) => {
        console.log(method);
        console.log(data);
        console.log(url);

        if (token) {
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
        }
        else {
            var header = {};
            header.access_token = localStorage.getItem("user-token");
            header.client_id = APP_ID;
            header["Content-Type"] = "application/json"
            console.log(data);

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
        }

    //setTimeout(() => {
    //  try {
    //    resolve(mocks[url][method || "GET"]);
    //    console.log(`Mocked '${url}' - ${method || "GET"}`);
    //    console.log("response: ", mocks[url][method || "GET"]);
    //  } catch (err) {
    //    reject(new Error(err));
    //  }
    //}, 1000);
    });



export default apiCall;
