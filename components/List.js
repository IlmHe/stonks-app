import {FlatList} from 'react-native';
import PropTypes from 'prop-types';
import {Button, ListItem} from '@rneui/themed';

const List = ({navigation, data}) => {
  return (
    <FlatList
      data={data.bestMatches}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item}) => (
        <ListItem
          bottomDivider
          onPress={() => {
            navigation.navigate('Stock', item);
          }}
        >
          <ListItem.Content>
            <ListItem.Title
              numberOfLines={1}
              h5
              style={{fontWeight: 'bold', color: 'black'}}
            >
              {item['1. symbol']}
            </ListItem.Title>
            <ListItem.Subtitle h7>{item['2. name']}</ListItem.Subtitle>
          </ListItem.Content>

          <ListItem.Content right>
            <Button
              size="sm"
              title="BUY"
              titleStyle={{fontWeight: 'bold'}}
              buttonStyle={{backgroundColor: '#118C4F'}}
              onPress={() => {
                navigation.navigate('StockBuy', item);
              }}
            />
          </ListItem.Content>
        </ListItem>
      )}
    />
  );
};

List.propTypes = {
  navigation: PropTypes.object,
  data: PropTypes.object,
};

export default List;
