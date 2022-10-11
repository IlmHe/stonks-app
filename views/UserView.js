import {StyleSheet, SafeAreaView, Text, View} from 'react-native';
import {useEffect} from 'react';
import PropTypes from 'prop-types';


const UserView = (userMedia) => {
  const item = userMedia.route.params;
  const parseUser = async () => {
    try {
      return (
        <SafeAreaView style={styles.container}>
          <Text style={styles.title}>{item}</Text>
          <View style={styles.text}></View>
        </SafeAreaView>
      );
    } catch (error) {
      console.log('PARSE ERROR', error);
    }
  };
  useEffect(() => {
    parseUser();
  }, []);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff0000',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
  },
  text: {
    width: '100%',
    height: '100%',
    backgroundColor: '#0000ff',
  }
});

UserView.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};

export default UserView;
