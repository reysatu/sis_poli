import axios from "axios";
const baseUrl = "http://127.0.0.1:8000/api";
const Modality = {};


// Modality.list = async () => {
//     const urList = baseUrl + "/perfil";
//     const logueo=window.localStorage.getItem("logueo");
//     const user=JSON.parse(logueo);
//     const tokend=user.access_token;
//     const config = {
//         headers: { Authorization: `Bearer ${tokend}`}
//     };
//     const res = await axios
//         .get(urList,config)
//         .then((response) => {
//             return response.data;
//         })
//         .catch((error) => {
//             return error;
//         });
//     return res;
// };

Modality.list = async () => {
    const urList = baseUrl + "/modality_list";
    const logueo=window.localStorage.getItem("logueo");
    const user=JSON.parse(logueo);
    const tokend=user.access_token;
    console.log("moda");
    const config = {
        headers: { Authorization: `Bearer ${tokend}`}
    };
    const res = await axios
        .get(urList,config)
        .then((response) => {
            console.log("modality");
            console.log(response);
            return response.data;
        })
        .catch((error) => {
            return error;
        });
    return res;
};

// Modality.create = async (data) => {
//     const urlvalida = baseUrl+"/perfilC";
//     const logueo=window.localStorage.getItem("logueo");
//     const user=JSON.parse(logueo);
//     const tokend=user.access_token;
//     const config = {
//         headers: { Authorization: `Bearer ${tokend}`}
//     };
//     const res = await axios
//         .post(urlvalida, data,config)
//         .then((response) => {
//            console.log(response);
//         })
//         .catch((error) => {
//             return error;
//         });
//     return res;
// };

// Modality.update = async (id,data) => {
//     const urlvalida = baseUrl+"/perfilU/"+id;
//     const logueo=window.localStorage.getItem("logueo");
//     const user=JSON.parse(logueo);
//     const tokend=user.access_token;
//     const config = {
//         headers: { Authorization: `Bearer ${tokend}`}
//     };
//     const res = await axios
//         .put(urlvalida, data,config)
//         .then((response) => {
//            console.log(response);
//         })
//         .catch((error) => {
//             return error;
//         });
//     return res;
// };

// Modality.getPermisosPerfil= async (id) => {
//     const urList = baseUrl + "/perfil_edit/"+id;
//     const logueo=window.localStorage.getItem("logueo");
//     const user=JSON.parse(logueo);
//     const tokend=user.access_token;
//     const config = {
//         headers: { Authorization: `Bearer ${tokend}`}
//     };
//     const res = await axios
//         .get(urList,config)
//         .then((response) => {
//             return response.data;
//         })
//         .catch((error) => {
//             return error;
//         });
//     return res;
// };

// Modality.eliminar = async (id) => {
//     const urlvalida = baseUrl+"/perfilD/"+id;
//     const logueo=window.localStorage.getItem("logueo");
//     const user=JSON.parse(logueo);
//     const tokend=user.access_token;
//     const config = {
//         headers: { Authorization: `Bearer ${tokend}`}
//     };
//     const res = await axios
//         .delete(urlvalida,config)
//         .then((response) => {
//            console.log(response);
//         })
//         .catch((error) => {
//             return error;
//         });
//     return res;
// };
export default Modality;