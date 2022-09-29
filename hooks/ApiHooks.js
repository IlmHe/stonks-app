import {useEffect, useState} from 'react';
import {fetchData} from '../utils/Http';
import {apiKey, baseApiUrl, symbolSearchFunc} from '../utils/Variables';

const useStockApi = () => {
  const [companiesArray, setCompaniesArray] = useState([]);

  const getCompanies = async (symbol = 'a') => {
    const res = await fetchData(
      baseApiUrl + symbolSearchFunc + symbol + '&apikey=' + apiKey
    );

    setCompaniesArray(res);
  };

  useEffect(() => {
    getCompanies();
  }, []);

  return {companiesArray, getCompanies};
};

export {useStockApi};
