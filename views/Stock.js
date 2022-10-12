import {SafeAreaView, StyleSheet, Text, Dimensions, View} from 'react-native';
import PropTypes from 'prop-types';
import {useStockApi} from '../hooks/ApiHooks';
import {useEffect, useState} from 'react';
import {LineChart} from 'react-native-chart-kit';
import {Divider, Button} from '@rneui/themed';

const screenWidth = Dimensions.get('window').width;

const chartConfig = {
  backgroundGradientFrom: '#000000',
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: '#2b2e3f',
  backgroundGradientToOpacity: 6,
  fillShadowGradientFrom: '#c7fe61',
  fillShadowGradientFromOpacity: 0.5,
  color: (opacity = 2) => `rgba(199,254,97, ${opacity})`,
  barPercentage: 1,
  barRadius: 20,
};

const Stock = ({navigation, route}) => {
  const {getCompany} = useStockApi();
  const [price, setPrice] = useState(0.0);
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

      setPrice(parseFloat(Yvalues.slice(0, 1)[0]));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    parseStockFetch();
  }, []);

  let stockArr = [];

  axis.Xaxis = axis.Xaxis.slice(0, 7);

  for (let i = 0; i < axis.Xaxis.length; i++) {
    stockArr[i] = axis.Xaxis[i].slice(-5);
  }

  const chartData = {
    labels: stockArr.reverse(),
    datasets: [
      {
        data: axis.Yaxis.slice(0, 7).reverse(),
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // optional
        strokeWidth: 2, // optional
        withDots: true,
      },
    ],
  };

  return (
    <SafeAreaView style={styles.droidSafeArea}>
      <View
        style={{
          backgroundColor: '#2b2e3f',
          borderBottomColor: 'grey',
          borderBottomWidth: 1,
          alignItems: 'center',
          flexDirection: 'row',
          paddingTop: 30,
          paddingBottom: 30,
          shadowOffset: {
            width: 0,
            height: 6.5,
          },
          shadowOpacity: 0.72,
          shadowRadius: 12.3,
        }}
      >
        <View style={{marginLeft: 15}}>
          <Text
            style={{
              fontWeight: 'bold',
              color: '#c7fe61',
              fontSize: 20,
              marginBottom: 5,
            }}
          >
            {item['2. name']}
          </Text>
          <Text
            style={{
              fontWeight: 'bold',
              color: 'white',
              marginBottom: 10,
            }}
          >
            {item['1. symbol']}
          </Text>
        </View>

        <View style={{marginLeft: 'auto', marginRight: 15}}>
          <Text
            style={{
              fontWeight: 'bold',
              marginLeft: 'auto',
              color: 'white',
              marginBottom: 5,
              fontSize: 20,
            }}
          >
            {price} {item['8. currency']}
          </Text>

          <Text
            style={{
              marginLeft: 'auto',
              fontWeight: 'bold',
              color: 'white',
            }}
          >
            Region: {item['4. region']}
          </Text>
        </View>

        <Divider
          style={{
            shadowOffset: {
              width: 0,
              height: 6.5,
            },
            shadowOpacity: 0.72,
            shadowRadius: 12.3,
          }}
        />
      </View>

      <View
        style={{
          backgroundColor: '#2b2e3f',
          borderWidth: 0.5,
          borderTopEndRadius: 10,
          borderBottomEndRadius: 10,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
          borderBottomStartRadius: 10,
          borderColor: 'grey',
          margin: 10,
          marginTop: 15,
          padding: 25,
          paddingBottom: 0,
        }}
      >
        <LineChart
          segments={6}
          style={styles.chart}
          data={chartData}
          width={screenWidth}
          height={425}
          chartConfig={chartConfig}
        />

        <Button
          size="lg"
          title="Place an order"
          containerStyle={{alignSelf: 'center'}}
          titleStyle={{fontWeight: 'bold', fontSize: 17, paddingHorizontal: 40}}
          buttonStyle={{
            borderRadius: 10,
            backgroundColor: '#118C4F',
            marginBottom: 35,
          }}
          onPress={() => {
            navigation.navigate('StockBuy', item);
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  droidSafeArea: {
    flex: 1,
    backgroundColor: '#272938',
  },
  title: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    paddingBottom: 30,
  },
  chart: {
    alignSelf: 'center',
    justifyContent: 'center',
    marginRight: 30,
  },
});

Stock.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};

export default Stock;
