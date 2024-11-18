import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Colors from '../../utils/Color';

interface ListItemProps {
  imageLeft?: string;
  item: any;
  imageRight?: string;
  textStyle?: any;
}

const ListItem: React.FC<ListItemProps> = ({
  imageLeft,
  item,
  imageRight,
  textStyle = styles.title,
}) => {
  return (
    //dynamic rendering based on image passed in
    <View style={styles.container}>
      {imageLeft && (
        <View style={styles.iconBlock}>
          <Image
            source={
              typeof imageLeft === 'string' ? {uri: imageLeft} : imageLeft
            }
          />
        </View>
      )}
      <View style={styles.textBlock}>
        <Text style={textStyle}>{item}</Text>
      </View>
      {imageRight && (
        <View style={styles.iconBlock}>
          <Image
            source={
              typeof imageRight === 'string' ? {uri: imageRight} : imageRight
            }
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Semi-transparent background
    flexDirection: 'row',
    padding: 20,
    marginVertical: 8,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Colors.BORDER_COLOR,
  },
  title: {color: Colors.WHITE, fontSize: 14},
  textBlock: {flex: 15},
  iconBlock: {flex: 1, paddingRight: 10},
});

export default ListItem;
