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
import {LineChart} from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const chartConfig = {
  backgroundGradientFrom: '#1E2923',
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: '#08130D',
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};

const Stock = ({route}) => {
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

  console.log(axis);
  console.log(item);

  const chartData = {
    labels: axis.Xaxis.slice(0, 5),
    datasets: [
      {
        data: axis.Yaxis.slice(0, 5),
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
    ],
    legend: ['Rainy Days'], // optional
  };

  return (
    <SafeAreaView style={styles.droidSafeArea}>
      <Text>{item['2. name']}</Text>
      <LineChart
        data={chartData}
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
      />
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
