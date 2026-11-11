import type {ImgHTMLAttributes} from 'react';
import imageInfo from './image-info.json';
type Info={width:number;height:number;responsive?:boolean};
export default function SmartImage({src='',alt='',loading='lazy',sizes,...props}:ImgHTMLAttributes<HTMLImageElement>){
 const filename=typeof src==='string'?src.split('/').pop()||'':'';
 const info=(imageInfo as Record<string,Info>)[filename];
 const stem=typeof src==='string'?src.replace(/\.webp$/,''):'';
 const srcSet=info?.responsive?`${stem}-480.webp 480w, ${stem}-800.webp 800w, ${src} ${info.width}w`:undefined;
 return <img {...props} src={src} alt={alt} loading={loading} decoding="async" width={info?.width} height={info?.height} srcSet={srcSet} sizes={srcSet?(sizes||'(max-width: 580px) 90vw, (max-width: 1000px) 48vw, 650px'):undefined}/>;
}
