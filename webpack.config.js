const path = require('path'); // Импортируем модуль "path" для работы с путями файлов
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin'); // Импортируем CopyPlugin
   



module.exports = {
   entry: './src/index.js', // Точка входа для сборки проекта


   output: {
       filename: 'bundle.js', // Имя выходного файла сборки
       path: path.resolve(__dirname, 'dist'), // Путь для выходного файла сборки
   },


   module: {
       rules: [
           {
               test: /\.css$/, // Регулярное выражение для обработки файлов с расширением .css
               use: ['style-loader', 'css-loader'], // Загрузчики, используемые для обработки CSS-файлов
           },
       ],
   },


   plugins: [
    new CopyPlugin({
        patterns: [
            {from: './src/img/logo.png', to: 'dist'},
        ],
    }),
    new HtmlWebpackPlugin({
        template: './src/главная.html',
        inject: true,
        filename: 'главная.html'
    }),
    new HtmlWebpackPlugin({
        template: './src/проекты.html',
        inject: true,
        filename: 'проекты.html'
    }),
    new HtmlWebpackPlugin({
        template: './src/о приложении.html',
        inject: true,
        filename: 'о приложении.html'
    }),
    new HtmlWebpackPlugin({
        template: './src/список задач.html',
        inject: true,
        filename: 'список задач.html'
    }),
   ],


   devServer: {
       static: {
           directory: path.join(__dirname, 'dist'), // Каталог для статики
       },
       open: true, // Автоматически открывать браузер
   },


   mode: 'development', // Режим сборки
};
