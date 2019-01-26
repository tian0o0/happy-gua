import typescript from 'rollup-plugin-typescript2';
import uglify from "rollup-plugin-uglify-es";
import pkg from './package.json';

export default {
    input: 'src/main.ts',
    
    output: [
        {
            file: pkg.module,
            format: 'es'
        },
        {
            name: 'HappyGua',
            file: pkg.broswer,
            format: 'umd'
        },
        {
            file: pkg.main,
            format: 'cjs'
        }
    ],
    plugins: [
        typescript({
            tsconfig: 'tsconfig.json'
        }),
        uglify()
    ]
}