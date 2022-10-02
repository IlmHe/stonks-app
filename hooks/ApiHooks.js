import {useEffect, useState} from 'react';
import {fetchData} from '../utils/Http';
import {
  apiKey,
  apiUrl,
  baseApiUrl,
  symbolSearchFunc,
  timeSeriesDailyFunc,
} from '../utils/Variables';

const useStockApi = () => {
  const [companiesArray, setCompaniesArray] = useState([]);
  const [companyArray, setCompanyArray] = useState([]);

  const getCompanies = async (symbol = 'a') => {
    const res = await fetchData(
      baseApiUrl + symbolSearchFunc + symbol + '&apikey=' + apiKey
    );
    setCompaniesArray(res);
  };

  const getCompany = async (symbol = 'IBM') => {
    const res = await fetchData(
      baseApiUrl + timeSeriesDailyFunc + symbol + '&apikey=' + apiKey
    );
    setCompanyArray(res);
  };

  useEffect(() => {
    getCompanies();
    getCompany();
  }, []);

  return {companiesArray, companyArray, getCompanies, getCompany};
};

const useLogin = () => {
  const postLogin = async (userCredentials) => {
    // user credentials format: {username: 'someUsername', password: 'somePassword'}
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userCredentials),
    };
    try {
      return await fetchData(apiUrl + 'login', options);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return {postLogin};
};
const useUser = () => {
  const checkUsername = async (username) => {
    try {
      const result = await fetchData(apiUrl + 'users/username/' + username);
      console.log('checkUsername():', result);
      return result.available;
    } catch (error) {
      console.log('checkUsername() failed', error);
    }
  };

  const getUserByToken = async (token) => {
    try {
      const options = {
        method: 'GET',
        headers: {'x-access-token': token},
      };
      return await fetchData(apiUrl + 'users/user', options);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const postUser = async (userData) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    };
    try {
      return await fetchData(apiUrl + 'users', options);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const getUserById = () => {};
  return {checkUsername, getUserByToken, postUser, getUserById};

};

export {useStockApi, useLogin, useUser};
