const {
    override,
    addLessLoader,
    overrideDevServer,
    addBabelPlugins,
  } = require('customize-cra');
  
  const devServerConfig = () => config => {
    return {
      ...config,
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:7001/',// 
          ws: true,
          changeOrigin: true,
        },
        '/base': {
          target: 'http://129.204.245.148:13026',
          ws: true,
        },
        '/tass': {
          target: '172.20.91.23:13026',
          ws: true,
        },
      },
    };
  };
  
  const rewiredMap = () => config => {
    if (config.mode === 'development') {
      config.devtool = 'cheap-module-source-map';
      // config = rewireReactHotLoader(config);
    } else {
      config.devtool = false;
    }
    config.optimization.runtimeChunk = false;
    config.optimization.splitChunks = {
      cacheGroups: {
        default: false,
      },
    };
    config.externals = {
    //   react: 'React',
    //   'react-dom': 'ReactDOM',
    //   antd: 'antd',
    //   echarts: 'echarts',
    };

    return config;
  };
  const webpackConfig=override(
    rewiredMap(),
    addLessLoader({ javascriptEnabled: true }),
    addBabelPlugins(
      // 支持装饰器
      [
        '@babel/plugin-proposal-decorators',
        {
          legacy: true
        }
      ]
    )
  );
  module.exports = {
    webpack:webpackConfig,
    devServer: overrideDevServer(devServerConfig()),
  };