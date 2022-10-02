import {FlatList} from 'react-native';
import PropTypes from 'prop-types';
import {ListItem} from '@rneui/themed';

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
            <ListItem.Title numberOfLines={1} h5>
              {item['1. symbol']}
            </ListItem.Title>
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
