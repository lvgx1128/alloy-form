module.exports = {
  plugins: [
    [
      'import',
      {
        libraryName: 'antd',
        style: true, // or 'css'
      },
    ],
    '@babel/plugin-transform-runtime',
  ],
};
