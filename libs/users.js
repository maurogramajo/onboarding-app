import api from './api';

export async function login(email) {
  try {
    console.info('login api client called: ', email);
    const response = await api({
      microservice: 'users',
      module: 'login',
      method: 'post',
      data: {
        email,
      },
    });
    return response.data;
  } catch (err) {
    console.info('Lib Login error: ', err.status, err.message);
    throw err;
  }
}

export async function validateEmailAndCode(email, token) {
  try {
    const response = await api({
      microservice: '/users',
      module: 'verify',
      method: 'post',
      data: {
        email,
        token,
      },
    });
    return response.data;
  } catch (err) {
    console.info('Lib validateEmailAndCode error: ', err.status, err.message);
    throw err;
  }
}

export async function getUserData(uuid) {
  try {
    const response = await api({
      microservice: '/core',
      module: 'users',
      method: 'public',
      query: {
        uuid,
      },
    });
    return response.data;
  } catch (err) {
    console.info('Lib getUserData error: ', err.status, err.message);
    throw err;
  }
}

export async function updateUser(props = {}) {
  try {
    const { data } = await api({
      microservice: '/users',
      module: '',
      method: 'patch',
      data: {
        ...props,
      },
    });
    return data;
  } catch (err) {
    console.info('Lib updateUser error: ', err.status, err.message);
    throw err;
  }
}

export async function searchUsers(filter = '', order = '', page = 1, limit = 5) {
  try {
    const { data } = await api({
      microservice: '/users',
      module: '',
      method: 'get',
      query: {
        page,
        limit,
        q: `${filter}`,
        sort: `${order}`,
      },
    });
    return data;
  } catch (err) {
    console.info('Lib searchUsers error: ', err.status, err.message);
    throw err;
  }
}
