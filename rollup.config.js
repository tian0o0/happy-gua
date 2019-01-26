import typescript from 'rollup-plugin-typescript2';
import uglify from "rollup-plugin-uglify-es";
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
        }),
        uglify()
    ]
}