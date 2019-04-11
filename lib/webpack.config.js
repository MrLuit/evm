"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const nodeExternals = require("webpack-node-externals");
const merge = require("webpack-merge");
const isDevelopment = process.env.NODE_ENV !== 'production';
const sourcePath = path.resolve(__dirname, 'src');
const config = {
    mode: isDevelopment ? 'development' : 'production',
    entry: {
        EVM: path.resolve(sourcePath, 'index.ts')
    },
    output: {
        path: path.resolve(__dirname, 'lib'),
        library: 'EVM'
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    {
                        loader: 'awesome-typescript-loader',
                        options: {
                            useCache: true,
                            useBabel: true,
                            babelCore: '@babel/core'
                        }
                    }
                ],
                exclude: /node_modules/
            },
            {
                test: /\.js$/,
                use: ['file-loader'],
                include: /node_modules\/ethereumjs-vm\/dist\/opcodes\.js/
            }
        ]
    },
    devtool: 'source-map'
};
const browser = merge.smart(config, {
    target: 'web',
    output: {
        libraryTarget: 'umd',
        umdNamedDefine: true,
        filename: '[name].js'
    }
});
const node = merge.smart(config, {
    target: 'node',
    externals: [nodeExternals()],
    output: {
        libraryTarget: 'commonjs2',
        filename: '[name].node.js'
    }
});
exports.default = [browser, node];
//# sourceMappingURL=webpack.config.js.map