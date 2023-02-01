import axios from 'axios';
import { Platform } from 'react-native';

import {
  sessionLocalKey,
  getData,
} from '../StorageData';

import CustomError from '../utils/customerrors';

const config = {
  ENDPOINT_URL: 'https://services.visiongroup.nyc/core',
  UPLOAD_URL: 'https://services.visiongroup.nyc/core/upload',
  APPLICATION_TOKEN: '801f5287-8ae5-44cb-b00f-07c963311215-R2D39K',
};

const BASE_URL = config.ENDPOINT_URL;

export default async function api(params) {
  const localParams = { ...params.query };
  const localtoken = await getData(sessionLocalKey);
  const finalHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'user-agent': 'Hells Quiz Mobile App',
    'token-application': config.APPLICATION_TOKEN,
  };

  if (localtoken) finalHeaders.Authorization = `bearer: ${localtoken.jwt}`;
  if (params.headers) {
    Object.keys(params.headers).forEach((k) => {
      (finalHeaders[k] = params.headers[k]);
      return true;
    });
  }

  const optionsAxios = {
    method: params.method.toLowerCase(),
    url: `${[params.microservice, params.module].filter((p) => p !== '').join('/')}`,
    params: localParams,
    baseURL: params.host || BASE_URL,
    timeout: 5000,
    headers: { ...finalHeaders },
  };
  if (params.data && Object.keys(params.data).length > 0) optionsAxios.data = params.data;

  const instance = axios.create(optionsAxios);

  try {
    // console.info('api call options: ', optionsAxios);
    const response = await instance.request(optionsAxios);
    return response;
  } catch (err) {
    console.info('Error lib API: network error: ', err.response?.status, err.response.data);
    throw new CustomError({
      status: err.response?.status,
      message: err.response.data.message ? err.response.data.message : err.response.data,
    });
  }
}

export async function uploadFile(file, folder, props = {}) {
  try {
    const oData = new FormData();
    // console.info('uploading file: ', file, folder);
    const {
      uri,
    } = file;

    const extension = uri.split('.').pop();
    const fileName = uri.split('/').pop();
    let mime = '';
    switch (extension) {
    case 'jpg':
      mime = 'image/jpg';
      break;
    case 'jpeg':
      mime = 'image/jpg';
      break;
    case 'png':
      mime = 'image/png';
      break;
    default:
      mime = 'image/jpg';
    }
    oData.append('folder', folder);

    // append extra props
    Object.keys(props).forEach((key) => {
      oData.append(key, props[key]);
    });

    oData.append('upfile', {
      name: fileName,
      uri: Platform.OS === 'android' ? uri : uri.replace('file://', ''),
      type: mime,
    });

    const localtoken = await getData(sessionLocalKey);
    const requestData = {
      method: 'POST',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'multipart/form-data',
        'token-application': config.APPLICATION_TOKEN,
        Authorization: `Bearer: ${localtoken.jwt}`,
      },
      body: oData,
    };
    const response = await fetch(config.UPLOAD_URL, requestData);
    return response.json();
  } catch (err) {
    console.info('Error uploading file: ', err);
    throw new Error(err);
  }
}

export async function uploadFileBase64(file) {
  try {
    const {
      uri,
    } = file;

    const extension = uri.split('.').pop();

    let mime = '';
    switch (extension) {
    case 'jpg':
      mime = 'image/jpg';
      break;
    case 'jpeg':
      mime = 'image/jpg';
      break;
    case 'png':
      mime = 'image/png';
      break;
    default:
      mime = 'image/jpg';
    }

    const response = await api({
      microservice: '/files',
      module: '',
      method: 'post',
      data: {
        data: file.base64,
        sizes: ['900x900', '120x120', '640x640'],
        type: mime,
      },
    });
    return response.data;
  } catch (err) {
    console.info('Error uploadFile file: ', err.toString());
  }
  return null;
}
