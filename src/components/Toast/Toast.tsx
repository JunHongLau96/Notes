import React, {useState, useEffect} from 'react';
import {Text, StyleSheet, Animated} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Color from '../../utils/Color';

interface ToastProps {
  message: string;
  visible: boolean;
  duration?: number;
  onClose?: () => void;
}

const Toast: React.FC<ToastProps> = ({
  message,
  visible,
  duration = 2000,
  onClose,
}) => {
  const [opacity] = useState(new Animated.Value(0));

  useEffect(() => {
    if (visible) {
      // Show toast
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        // Hide toast after some duration
        setTimeout(() => {
          Animated.timing(opacity, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }).start(() => {
            onClose && onClose();
          });
        }, duration);
      });
    }
  }, [visible, duration, onClose, opacity]);

  if (!visible) return null;

  return (
    <Animated.View style={[styles.toastContainer, {opacity}]}>
      <LinearGradient
        colors={[Color.PURPLE_PINK, Color.VIOLET_BLUE]}
        start={{x: 0.5, y: 0}} //gradient top to bottom setup
        end={{x: 0.5, y: 1}}
        style={styles.gradientBackground}>
        <Text style={styles.toastText}>{message}</Text>
      </LinearGradient>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    position: 'absolute',
    top: '40%',
    left: '70%',
    transform: [{translateX: -150}, {translateY: -25}], // Adjust for toast size
    width: 180,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
  },
  gradientBackground: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  toastText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Toast;
