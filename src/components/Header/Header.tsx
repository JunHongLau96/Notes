import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Colors from '../../utils/Color';
import TouchableComponent from '../TouchableComponent/TouchableComponent';

interface HeaderProps {
  headerText: string;
  imageLeft?: any;
  imageRight?: any;
  imageLeftOnPress?: any;
  imageRightOnPress?: any;
}

const Header: React.FC<HeaderProps> = ({
  headerText,
  imageLeft,
  imageRight,
  imageLeftOnPress,
  imageRightOnPress,
}) => {
  //dynamic rendering based on the image passed in
  return (
    <View style={styles.container}>
      {imageLeft && (
        <TouchableComponent onPress={imageLeftOnPress} image={imageLeft} />
      )}
      <View style={styles.headerBlock}>
        <Text style={styles.headerText}>{headerText}</Text>
      </View>
      {imageRight && (
        <TouchableComponent onPress={imageRightOnPress} image={imageRight} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 2,
    flexDirection: 'row',
    backgroundColor: Colors.DARK_PURPLE,
    alignItems: 'center',
    paddingHorizontal: '5%',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerBlock: {flex: 13, backgroundColor: Colors.DARK_PURPLE},
  headerText: {color: Colors.WHITE, fontSize: 22},
  iconBlock: {flex: 1},
});

export default Header;
