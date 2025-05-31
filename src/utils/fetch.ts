import axios from 'axios';
import { config } from '../config';
import { getAuthCookies } from '../lib/actions';
// import { handleError } from "./handleError";
export async function postData({
  url,
  payload,
}: {
  url: string;
  payload: unknown;
}) {
  const token = await getAuthCookies();

  const res = await axios.post(`${config.api_host_dev}/${url}`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  return res.data;
}

export async function getData(url: string, params?: string) {
  const token = await getAuthCookies();
  try {
    const res = await axios.get(`${config.api_host_dev}/${url}`, {
      params: params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (error) {
    return error as Error;
  }
}
export async function putData(url: string, payload: unknown) {
  const token = await getAuthCookies();
  try {
    const res = await axios.put(`${config.api_host_dev}${url}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (error) {
    return error as Error;
  }
}
export async function deletData(url: string) {
  const token = await getAuthCookies();
  try {
    const res = await axios.delete(`${config.api_host_dev}${url}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (error) {
    return error as Error;
  }
}
