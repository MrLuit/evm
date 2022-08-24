import * as path from 'path';
import { Configuration } from 'webpack';
import * as nodeExternals from 'webpack-node-externals';
import merge from 'webpack-merge';

const isDevelopment = process.env.NODE_ENV !== 'production';
const sourcePath = path.resolve(__dirname, 'src');

const config: Configuration = {
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
                        loader: 'ts-loader'
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

const browser: Configuration = merge(config, {
    target: 'web',
    output: {
        libraryTarget: 'umd',
        umdNamedDefine: true,
        filename: '[name].js'
    }
});

const node: Configuration = merge(config, {
    target: 'node',
    externals: [nodeExternals()],
    output: {
        libraryTarget: 'commonjs2',
        filename: '[name].node.js'
    }
});

export default [browser, node];
