import axios from "axios";
const baseUrl = "http://127.0.0.1:8000/api";
const Reporte = {};

Reporte.create = async (data) => {
    const urlvalida = baseUrl+"/reporte-pdf";
    const logueo=window.localStorage.getItem("logueo");
    const user=JSON.parse(logueo);
    const tokend=user.access_token;
    const config = {
        headers: { Authorization: `Bearer ${tokend}`}
    };
    const res = await axios
        .get(urlvalida, data,config)
        .then((response) => {
           console.log(response);
        })
        .catch((error) => {
            return error;
        });
    return res;
};

export { baseUrl, axios };





