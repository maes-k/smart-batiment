import {defineConfig} from 'vite';
import {resolve} from 'node:path';
export default defineConfig({base:'./',esbuild:{jsx:'automatic'},build:{outDir:'docs',emptyOutDir:true,rollupOptions:{input:{accueil:resolve('index.html'),solutions:resolve('solutions.html'),offres:resolve('offres.html'),univers:resolve('univers.html'),contact:resolve('contact.html')}}}});
