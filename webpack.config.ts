import * as path from 'path';
import { Configuration } from 'webpack';
import * as nodeExternals from 'webpack-node-externals';
import * as merge from 'webpack-merge';

const isDevelopment = process.env.NODE_ENV !== 'production';
const sourcePath = path.resolve(__dirname, 'src');

const config: Configuration = {
    mode: isDevelopment ? 'development' : 'production',
    entry: {
        EVMBytecodeDecompiler: path.resolve(sourcePath, 'index.ts')
    },
    output: {
        path: path.resolve(__dirname, 'lib'),
        library: 'EVMBytecodeDecompiler',
        libraryExport: 'default'
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

const browser: Configuration = merge.smart(config, {
    target: 'web',
    output: {
        libraryTarget: 'umd',
        umdNamedDefine: true,
        filename: '[name].js'
    }
});

const node: Configuration = merge.smart(config, {
    target: 'node',
    externals: [nodeExternals()],
    output: {
        libraryTarget: 'commonjs2',
        filename: '[name].node.js'
    }
});

export default [browser, node];
