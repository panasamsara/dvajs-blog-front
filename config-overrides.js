const {
    override,
    addLessLoader,
    overrideDevServer,
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
    // config.output.chunkFilename = "VideoCloud_public/static/js/[name].chunk.js";
    // config.output.filename = "VideoCloud_public/static/js/bundle.js";
    // try{
    //   if (process.env.NODE_ENV === "production"){
    //     config.plugins[5].options.filename = "VideoCloud_public/" + config.plugins[5].options.filename;
    //     config.plugins[5].options.chunkFilename = "VideoCloud_public/" + config.plugins[5].options.chunkFilename;
    //     config.plugins[6].opts.fileName="VideoCloud_public/asset-manifest.json";
    //   }
    // }catch(e){}
    return config;
  };
  const webpackConfig=override(
    rewiredMap(),
    addLessLoader({ javascriptEnabled: true }),
  );
  module.exports = {
    webpack:webpackConfig,
    devServer: overrideDevServer(devServerConfig()),
  };