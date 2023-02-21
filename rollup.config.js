import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser'

export default {
  input: 'src/index.tsx',
  output: {
    dir: 'dist'
  },
  plugins: [typescript(), terser()]
};