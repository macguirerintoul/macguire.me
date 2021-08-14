module.exports = { 
  webpack: function (config) {
    config.module.rules.push({test: /\.yml$/, use: 'raw-loader'})
    return config
  }
}