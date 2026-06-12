const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add 'mjs' and 'cjs' to allow resolving ESM modules like socket.io-client's engine.io-parser
config.resolver.sourceExts.push('mjs', 'cjs');

module.exports = config;
