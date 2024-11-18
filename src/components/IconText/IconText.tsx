import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Colors from '../../utils/Color';

interface IconTextProps {
  text: string;
  image: any;
  headerView?: any;
  textStyle?: any;
}

const IconText: React.FC<IconTextProps> = ({
  image,
  text,
  textStyle = styles.headerText, //text style passed in as props
}) => {
  return (
    <View style={styles.container}>
      <Image source={typeof image === 'string' ? {uri: image} : image} />
      <Text style={textStyle}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: '3%',
  },
  headerText: {color: Colors.WHITE, fontSize: 18, paddingLeft: '3%'},
});

export default IconText;
