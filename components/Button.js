import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from 'react-native';

const Button = ({ 
  title, 
  onPress, 
  style, 
  textStyle, 
  disabled = false, 
  loading = false,
  variant = 'primary' 
}) => {
  const getButtonStyle = () => {
    let buttonStyle = [styles.button];
    
    if (variant === 'secondary') {
      buttonStyle.push(styles.secondaryButton);
    } else if (variant === 'outline') {
      buttonStyle.push(styles.outlineButton);
    }
    
    if (disabled) {
      buttonStyle.push(styles.disabledButton);
    }
    
    if (style) {
      buttonStyle.push(style);
    }
    
    return buttonStyle;
  };

  const getTextStyle = () => {
    let btnTextStyle = [styles.buttonText];
    
    if (variant === 'secondary') {
      btnTextStyle.push(styles.secondaryButtonText);
    } else if (variant === 'outline') {
      btnTextStyle.push(styles.outlineButtonText);
    }
    
    if (disabled) {
      btnTextStyle.push(styles.disabledText);
    }
    
    if (textStyle) {
      btnTextStyle.push(textStyle);
    }
    
    return btnTextStyle;
  };

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator 
          color={variant === 'primary' ? '#fff' : '#6200ee'} 
          size="small" 
        />
      ) : (
        <Text style={getTextStyle()}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#6200ee',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 120,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  secondaryButton: {
    backgroundColor: '#03dac6',
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#6200ee',
  },
  disabledButton: {
    backgroundColor: '#ccc',
    elevation: 0,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButtonText: {
    color: '#000',
  },
  outlineButtonText: {
    color: '#6200ee',
  },
  disabledText: {
    color: '#666',
  },
});

export default Button;
