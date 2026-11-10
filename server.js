'use strict';
const http=require('node:http');
const fs=require('node:fs');
const path=require('node:path');
const root=__dirname;
const mime={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'application/javascript; charset=utf-8','.png':'image/png','.gif':'image/gif','.jpg':'image/jpeg','.jpeg':'image/jpeg','.svg':'image/svg+xml','.webp':'image/webp','.mp4':'video/mp4','.woff2':'font/woff2','.txt':'text/plain; charset=utf-8','.xml':'application/xml; charset=utf-8'};
const publicFiles=new Map();
function add(file){const absolute=path.join(root,file);if(fs.existsSync(absolute))publicFiles.set('/'+file,absolute)}
for(const f of ['index.html','index.css','app.js','robots.txt','sitemap.xml'])add(f);
function walk(dir){for(const e of fs.readdirSync(path.join(root,dir),{withFileTypes:true})){const name=dir+'/'+e.name;if(e.isDirectory())walk(name);else if(e.isFile())add(name)}}walk('assets');
const port=Number(process.env.PORT||80);if(!Number.isInteger(port)||port<1||port>65535)throw new Error('PORT must be between 1 and 65535');
const server=http.createServer((req,res)=>{
 res.setHeader('X-Content-Type-Options','nosniff');res.setHeader('Referrer-Policy','strict-origin-when-cross-origin');
 if(!['GET','HEAD'].includes(req.method)){res.writeHead(405,{'Allow':'GET, HEAD'});return res.end()}
 let pathname;try{pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname)}catch{res.writeHead(400);return res.end('Bad request')}
 if(pathname==='/health'){res.writeHead(200,{'Content-Type':'application/json','Cache-Control':'no-store'});return res.end(req.method==='HEAD'?undefined:JSON.stringify({status:'ok',site:'ohyusemri.xyz'}))}
 if(pathname==='/')pathname='/index.html';
 const file=publicFiles.get(pathname);if(!file){res.writeHead(404,{'Content-Type':'text/plain; charset=utf-8'});return res.end(req.method==='HEAD'?undefined:'Not found')}
 fs.readFile(file,(error,data)=>{if(error){res.writeHead(500);return res.end('Unable to read asset')}
 res.writeHead(200,{'Content-Type':mime[path.extname(file)]||'application/octet-stream','Content-Length':data.length,'Cache-Control':pathname.startsWith('/assets/')?'public, max-age=3600':'no-cache'});res.end(req.method==='HEAD'?undefined:data)
 });
});
server.listen(port,'0.0.0.0',()=>console.log(`OhYu online on port ${port} | domain: ohyusemri.xyz`));
server.on('error',error=>{console.error('Unable to start server:',error.message);process.exit(1)});
for(const signal of ['SIGTERM','SIGINT'])process.on(signal,()=>{server.close(()=>process.exit(0));setTimeout(()=>process.exit(0),5000).unref()});
