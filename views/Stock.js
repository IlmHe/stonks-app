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
  backgroundGradientFrom: '#000000',
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: '#2b2e3f',
  backgroundGradientToOpacity: 0.5,
  fillShadowGradientFrom: '#c7fe61',
  fillShadowGradientFromOpacity: 0,
  fillShadowGradientTo: '#ffffff',
  fillShadowGradientToOpacity: 0,
  color: (opacity = 1) => `rgba(199,254,97, ${opacity})`,
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

 // console.log(axis);
 // console.log(item);
  let stockArr = [];
  axis.Xaxis = axis.Xaxis.slice(0, 7);
  // console.log("TESGINTINGTESGINT", axis.Xaxis);
  for (let i = 0; i < axis.Xaxis.length; i++) {
    stockArr[i] = axis.Xaxis[i].slice(-5);
  }
  const chartData = {
    labels: stockArr.reverse(),
    datasets: [
      {
        data: axis.Yaxis.slice(0, 7).reverse(),
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // optional
        strokeWidth: 3, // optional
        withDots: false,
        withInnerLines: false,
        withOuterLines: false,
        withVerticalLines: false,
        withHorizontalLines: false,
      },
    ],
  };
  return (
    <SafeAreaView style={styles.droidSafeArea}>
      <Text style={styles.title}>{item['2. name']}</Text>
      <LineChart style={styles.chart}
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
  }
});

Stock.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};

export default Stock;
