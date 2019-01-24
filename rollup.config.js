import typescript from 'rollup-plugin-typescript2';

export default {
    input: 'src/main.ts',
    
    output: [
        {
            file: 'dist/index.esm.js',
            format: 'es'
        }
    ],
    plugins: [
        typescript({
            tsconfig: 'tsconfig.json'
        })
    ]
}