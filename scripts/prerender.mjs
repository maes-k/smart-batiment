import {readFile,writeFile,mkdir,rm,readdir} from 'node:fs/promises';
import {resolve} from 'node:path';
import {pathToFileURL} from 'node:url';
import ts from 'typescript';
import React from 'react';
import {renderToString} from 'react-dom/server';
const outputDir=process.argv[2]||'docs';
const folder=resolve('.render-cache');
await mkdir(folder,{recursive:true});
try{
 for(const name of ['smart-site','home-depth','smart-image']){
  const source=await readFile(`src/${name}.tsx`,'utf8');
  let output=ts.transpileModule(source,{compilerOptions:{jsx:ts.JsxEmit.ReactJSX,module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText;
  output=output.replaceAll("'./home-depth'","'./home-depth.mjs'").replaceAll("'./smart-image'","'./smart-image.mjs'");
  output=output.replace(/import imageInfo from ['"]\.\/image-info\.json['"];?/,`const imageInfo=${await readFile('src/image-info.json','utf8')};`);
  await writeFile(`${folder}/${name}.mjs`,output);
 }
 const {default:SmartSite}=await import(pathToFileURL(`${folder}/smart-site.mjs`).href);
 for(const [filename,page] of [['index','accueil'],['solutions','solutions'],['offres','offres'],['univers','univers'],['contact','contact']]){
  const path=`${outputDir}/${filename}.html`;
  const content=renderToString(React.createElement(SmartSite,{page}));
  const html=await readFile(path,'utf8');
  if(!html.includes('<div id="root"></div>'))throw new Error('Emplacement HTML introuvable : '+path);
  await writeFile(path,html.replace('<div id="root"></div>','<div id="root">'+content+'</div>'));
 }
 const source=(await readFile('src/smart-site.tsx','utf8'))+'\n'+(await readFile('src/home-depth.tsx','utf8'));
 const used=new Set(Array.from(source.matchAll(/(["'])([^"'<>\n]+\.webp)\1/g),m=>m[2].split('/').pop()));
 for(const name of Array.from(used))if(name.endsWith('-photo.webp')){used.add(name.replace('.webp','-480.webp'));used.add(name.replace('.webp','-800.webp'));}
 for(const name of await readdir(`${outputDir}/images`))if(name.endsWith('.webp')&&!used.has(name))await rm(`${outputDir}/images/${name}`);
 console.log('5 pages pré-rendues : contenu visible avant le chargement du JavaScript.');
}finally{await rm(folder,{recursive:true,force:true});}
