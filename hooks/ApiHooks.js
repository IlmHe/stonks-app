import {useEffect, useState} from 'react';
import {fetchData} from '../utils/Http';
import {
  apiKey,
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

export {useStockApi};
