import {useEffect, useState} from 'react';
import {fetchData} from '../utils/Http';
import {
  apiKey,
  baseApiUrl,
  symbolSearchFunc,
  timeSeriesDailyFunc,
} from '../utils/Variables';

const useStockApi = () => {
  const getCompanies = async (symbol) => {
    const res = await fetchData(
      baseApiUrl + symbolSearchFunc + symbol + '&apikey=' + apiKey
    );

    return res;
  };

  const getCompany = async (symbol = 'IBM') => {
    const res = await fetchData(
      baseApiUrl + timeSeriesDailyFunc + symbol + '&apikey=' + apiKey
    );

    return res;
  };

  useEffect(() => {
    getCompanies();
  }, []);

  return {getCompanies, getCompany};
};

export {useStockApi};
