import React from 'react';
import { View } from 'react-native';
import Svg, { Rect, Path, Text as SvgText } from 'react-native-svg';

const SvgImage = ({ width = 300, height = 200 }) => {
  return (
    <View style={{ width, height }}>
      <Svg width="100%" height="100%" viewBox="0 0 500 300">
        <Rect width="500" height="300" rx="10" fill="#F0F4FF" />
        <Path 
          d="M100 150C100 121.716 122.716 99 151 99H349C377.284 99 400 121.716 400 150C400 178.284 377.284 201 349 201H151C122.716 201 100 178.284 100 150Z" 
          fill="#E2E8F0" 
        />
        <Path 
          d="M150 130C150 123.373 155.373 118 162 118H338C344.627 118 350 123.373 350 130V170C350 176.627 344.627 182 338 182H162C155.373 182 150 176.627 150 170V130Z" 
          fill="#C7D2FE" 
        />
        <SvgText 
          x="250" 
          y="155" 
          fontFamily="Arial" 
          fontSize="24" 
          fontWeight="bold" 
          textAnchor="middle" 
          fill="#4F46E5"
        >
          ಕನ್ನಡ
        </SvgText>
        <SvgText 
          x="250" 
          y="185" 
          fontFamily="Arial" 
          fontSize="16" 
          textAnchor="middle" 
          fill="#4F46E5"
        >
          Learn Kannada with Ease
        </SvgText>
      </Svg>
    </View>
  );
};

export default SvgImage;
