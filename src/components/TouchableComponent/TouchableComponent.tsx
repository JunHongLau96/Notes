import React from 'react';
import {Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

interface TouchableComponentProps {
  text?: string;
  image?: any;
  onPress?: any;
  style?: any;
}

const TouchableComponent: React.FC<TouchableComponentProps> = ({
  onPress,
  text,
  image,
  style,
}) => {
  //render text/image for whichever is passed in to the component
  return (
    <TouchableOpacity style={styles.iconBlock} onPress={onPress}>
      {text && <Text style={style}>{text}</Text>}
      {image && <Image source={image.source} style={image.style} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  iconBlock: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: '2%',
  },
});

export default TouchableComponent;
