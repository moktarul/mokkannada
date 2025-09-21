// @ts-check
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

// Create the default Metro config
const config = getDefaultConfig(__dirname, {
  isCSSEnabled: true, // Enable CSS support
});

// For web, we'll handle SVGs through webpack
if (process.env.BUILD_TARGET !== 'web') {
  // For native platforms, use react-native-svg-transformer
  const { transformer, resolver } = config;
  
  config.transformer = {
    ...transformer,
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  };
  
  config.resolver = {
    ...resolver,
    assetExts: resolver.assetExts.filter(ext => ext !== 'svg'),
    sourceExts: [...resolver.sourceExts, 'svg'],
  };
}

module.exports = config;
