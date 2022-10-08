import {
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';
import {useStockApi} from '../hooks/ApiHooks';
import {useEffect, useState} from 'react';
import {Button, Input} from '@rneui/themed';

const StockBuy = ({route}) => {
  const {getCompany} = useStockApi();
  const item = route.params;
  const [axis, setAxis] = useState({
    Xaxis: ['January', 'February', 'March', 'April', 'May', 'June'],
    Yaxis: [20, 45, 28, 80, 99, 43],
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

  let stockArr = [];
  axis.Xaxis = axis.Xaxis.slice(0, 7);
  console.log("TESGINTINGTESGINT", axis.Xaxis);
  for (let i = 0; i < axis.Xaxis.length; i++) {
    stockArr[i] = axis.Xaxis[i].slice(-5);
  }
  return (
    <SafeAreaView style={styles.droidSafeArea}>
      <Text style={styles.title}>{item['2. name']}</Text>
      <Input style={styles.input}
        placeholder="Purchase amount in $ USD"
      />
      <Button
        size="sm"
        title="BUY"
        titleStyle={{fontWeight: 'bold'}}
        buttonStyle={{backgroundColor: '#118C4F'}}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  droidSafeArea: {
    flex: 1,
    backgroundColor: '#2b2e3f',
    paddingTop: Platform.OS === 'android' ? 30 : 0,
  },
  title: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    paddingBottom: 30,
  },
  chart: {
    alignSelf: 'center',
    marginRight: 30,
  },
  input: {
    color: 'white',
  }
});

StockBuy.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};

export default StockBuy;
