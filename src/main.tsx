import React from 'react';
import {createRoot,hydrateRoot} from 'react-dom/client';
import SmartSite from './smart-site';
import './styles.css';
const page=document.documentElement.dataset.page||'accueil';
const root=document.getElementById('root')!;
if(root.hasChildNodes())hydrateRoot(root,<SmartSite page={page}/>);
else createRoot(root).render(<SmartSite page={page}/>);
// Anchor targets are rendered by React after the initial HTML has loaded.
if(location.hash){requestAnimationFrame(()=>requestAnimationFrame(()=>document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView()));}
