import {Platform, SafeAreaView, StyleSheet, Text} from 'react-native';
import PropTypes from 'prop-types';
import {useStockApi} from '../hooks/ApiHooks';
import {useEffect, useState} from 'react';

const Stock = ({route}) => {
  const {getCompany} = useStockApi();
  const {item} = route.params;
  const [axis, setAxis] = useState({
    Xaxis: [],
    Yaxis: [],
  });

  const parseStockFetch = async () => {
    const Yvalues = [];
    const Xvalues = [];

    try {
      const res = await getCompany(item['1. symbol']);

      for (let key in res['Time Series (Daily)']) {
        Yvalues.push(res['Time Series (Daily)'][key]['1. open']);
        Xvalues.push(key);
      }

      setAxis({
        Yaxis: Yvalues,
        Xaxis: Xvalues,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    parseStockFetch();
  }, []);

  console.log(axis);
  console.log(item);

  return (
    <SafeAreaView style={styles.droidSafeArea}>
      <Text>stocks</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  droidSafeArea: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? 30 : 0,
  },
});

Stock.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};

export default Stock;
