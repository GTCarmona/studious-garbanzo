import axios from "axios";
/* Replace by enviroment variable in real use case, hardcoded values for this challenge  */
// const companyDomain = "noname21";
// const token = "7b6b1fa7a47b6d9f3e7c0599223801b46325c9b5";
const companyDomain = process.env.REACT_APP_COMPANY_NAME;
const token = process.env.REACT_APP_API_TOKEN;

const api = axios.create({
  baseURL: `https://${companyDomain}.pipedrive.com/api/v1`,
  headers: {
    "Content-Type": "application/json",
  },
});
const errHandler = (err) => {
  console.error(err);
  if (err.response && err.response.data) {
    console.error("API response", err.response.data);
    throw err.response.data.message;
  }
  throw err;
};
const getContacts = () => {
  return api
    .get("/persons?api_token=" + token)
    .then((res) => {
      return res.data;
    })
    .catch(errHandler);
};
const getSingleContact = (id) => {
  return api
    .get(`/persons/${id}?api_token=` + token)
    .then((res) => {
      return res.data;
    })
    .catch(errHandler);
};
const getContactFields = () => {
  return api
    .get('/personFields?api_token=' + token)
    .then((res) => {
      return res.data;
    })
    .catch(errHandler);
};

const getOrgs = () => {
  return api
    .get("/organizations?api_token=" + token)
    .then((res) => {
      return res.data;
    })
    .catch(errHandler);
};
const addContact = (data) => {
  return api
    .post("/persons?api_token=" + token, data)
    .then((res) => {
      return res.data;
    })
    .catch(errHandler);
};
const removeContact = (id) => {
  return api
    .delete(`/persons/${id}/?api_token=${token}`)
    .then((res) => {
      return res.data;
    })
    .catch(errHandler);
};
export default { getContacts, getOrgs , getSingleContact, addContact, getContactFields, removeContact};
