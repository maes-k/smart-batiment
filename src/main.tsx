import React from 'react';
import {createRoot} from 'react-dom/client';
import SmartSite from './smart-site';
import './styles.css';
const page=document.documentElement.dataset.page||'accueil';
createRoot(document.getElementById('root')!).render(<SmartSite page={page}/>);
// Anchor targets are rendered by React after the initial HTML has loaded.
if(location.hash){requestAnimationFrame(()=>requestAnimationFrame(()=>document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView()));}
