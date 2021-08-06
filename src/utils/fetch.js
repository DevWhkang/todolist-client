import axios from 'axios';

const TYPE = {
  GET: 'get',
  POST: 'post',
  PATCH: 'patch',
  DELETE: 'delete',
};

const fetch = async (mode, param, query, body) => {
  const url = 'http://localhost:5000/api/todos';
  let res;

  try {
    switch (mode) {
      case TYPE.GET:
        if (query) res = await axios.get(`${url}/filter`, { params: query });
        else {
          res = await axios.get(url);
        }
        return res.data;
      case TYPE.POST:
        await axios.post(url, body);
        break;
      case TYPE.PATCH:
        await axios.patch(`${url}/${param}`, body);
        break;
      case TYPE.DELETE:
        res = await axios.delete(`${url}/${param}`);
        break;
      default:
        return;
    }
  } catch (err) {
    return err;
  }
};

export default fetch;
