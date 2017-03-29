const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

const nodeEnv = process.env.NODE_ENV || 'development';
const isProduction = nodeEnv === 'production';

const buildPath = path.join(__dirname, './build');
const imgPath = path.join(__dirname, './src/assets/img');
const srcPath = path.join(__dirname, './src');

const entry = {
  app: './index.js',
  vendor: [
    'react', 'react-dom', 'react-router'
  ]
}

const confOptionForHMR = [
  'react-hot-loader/patch',
  'webpack-dev-server/client?http://localhost:3000',
  'webpack/hot/only-dev-server'
];

const rules = [
  { test: /\.(js|jsx)$/, 
    include: path.join(__dirname, "src"),
    exclude: /node_modules/, 
    loader: isProduction ? 'babel-loader' : ['react-hot-loader/webpack', 'babel-loader']
  },
  {
    test: /\.(png|gif|jpg|svg)$/,
    include: imgPath,
    use: 'url-loader?limit=20480&name=assets/[name]-[hash].[ext]',
  },
  {
    test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loader: "url-loader"
  },
  {
    test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loader: "file-loader"
  }
];

const plugins = [
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: Infinity,
    filename: 'vendor-[hash].js',
  }),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(nodeEnv),
    },
  }),
  new HtmlWebpackPlugin({
    template: path.join(srcPath, 'index.html'),
    path: buildPath,
    inject: 'body',
    filename: 'index.html',
  }),
  new webpack.LoaderOptionsPlugin({
    options: {
      postcss: [
        autoprefixer({
          browsers: [
            'last 3 version',
            'ie >= 10',
          ],
        }),
      ],
      context: srcPath,
    },
  }),
  new webpack.NoEmitOnErrorsPlugin(),
];

if (isProduction) {
  plugins.push(
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: true,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
      },
      output: {
        comments: false,
      },
    }),
    new ExtractTextPlugin('style-[hash].css')
  );

  rules.push(
    {
      test: /\.scss$/,
      include: path.join(__dirname, "src"),
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader', 'sass-loader']
      })
    }
  );
} else {
  plugins.push(
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  );

  rules.push(
    {
      test: /\.scss$/,
      include: path.join(__dirname, "src"),
      use: [
        'style-loader',
        'css-loader',
        'sass-loader',
      ],
    }
  );
  entry.vendor = [...entry.vendor, ...confOptionForHMR];
}

module.exports = {
  devtool: isProduction ? 'eval' : 'source-map',
  context: path.resolve(__dirname, './src'),
  entry,
  output: {
    path: buildPath,
    filename: 'app-[hash].js',
  },
  module: {
    rules,
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      path.resolve(__dirname, 'node_modules'),
      srcPath,
    ],
  },
  plugins,
  devServer: {
    headers: { 'Access-Control-Allow-Origin': '*' },
    contentBase: isProduction ? './build' : './src',
    historyApiFallback: true,
    port: 3000,
    compress: isProduction,
    inline: !isProduction,
    hot: !isProduction,
    host: '0.0.0.0',
    stats: {
      assets: true,
      children: false,
      chunks: false,
      hash: false,
      modules: false,
      publicPath: false,
      timings: true,
      version: false,
      warnings: true,
      colors: {
        green: '\u001b[32m',
      },
    },
  },
};
