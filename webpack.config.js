const path=require('path');
const webpack = require('webpack')

let config= {
    mode:"none",//none || development || production
    entry:'./src/index.ts',
    module:{
        rules:[
            {
                test: /\.ts/,
                use: 'ts-loader',
                include:[path.resolve(__dirname,'src')],
                exclude:[path.resolve(__dirname,'/UI/chatWindow.js')]
            },
            // {
            //     test: /\.m?js$/,
            //     exclude: /node_modules/,
            //     use: {
            //       loader: 'babel-loader',
            //       options: {
            //         presets: [
            //           ['@babel/preset-env', { targets: "defaults" }]
            //         ]
            //       }
            //     }
            //   },
              {
                test: /\.css$/,
                use: [
                  "style-loader", //3. Inject styles into DOM
                  "css-loader", //2. Turns css into commonjs
                  "postcss-loader",
                  "sass-loader" //1. Turns sass into css
                ]
              }
            // {
            //     test: path.resolve('./UI/chatWindow.js'),
            //     use: ['imports-loader?this=>window'] 
            // },
            // {
            //     test: require.resolve("./UI/chatWindow.js"),
            //     use:  [
            //         {
            //           loader: "imports-loader",
            //           options: {
            //             wrapper: true
            //           },
            //         },
            //       ]
            //   },
            //   {
            //     test: require.resolve("./kore-bot-sdk-client.js"),
            //     use:  [
            //         {
            //           loader: "imports-loader",
            //           options: {
            //             wrapper: true
            //           },
            //         },
            //       ]
            //   },
        ]
    },
    plugins:[
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.$': 'jquery',
            'window.jQuery': 'jquery',
          }),
    ],
    resolve:{
        extensions:['.js','.ts']
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname,'dist'),
        clean: true,
    },
    devServer: {
        static: {
          directory: path.join(__dirname, 'dist'),
        },
        port: 9000,
        liveReload: true,
      },
}

module.exports= function(env,argv){
    
    console.log(`ENV:${JSON.stringify(env)} \nARGV:${JSON.stringify(argv)}`);
    if (env.dev) {
        config.devtool = 'source-map';
        config.mode='development'
    }
    if (argv.prod) {
        config.mode='production'
    }
    
    return config;
}