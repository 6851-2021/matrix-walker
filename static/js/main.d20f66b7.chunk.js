(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{161:function(e,t,c){},197:function(e,t,c){},198:function(e,t,c){"use strict";c.r(t);var s=c(0),a=c.n(s),i=c(48),n=c.n(i),h=(c(161),c(24)),r=c(119),l=c(209),o=(c(189),c(5)),u=[{key:0,text:"Row-major Indexing",value:0},{key:1,text:"Z Indexing",value:1},{key:2,text:"Hilbert Indexing",value:2}],d=function(e){return Object(o.jsx)(l.a,{placeholder:"Select Matrix",selection:!0,options:u,onChange:function(t,c){e.selected(c.value)}})},j=(c(197),c(114)),v=c(113),b=c(75),x=c(76);function f(e){return Math.floor(Math.random()*e)}function g(e){var t=e;return t=1431655765&((t=858993459&((t=252645135&((t=16711935&((t=65535&(t^t<<16))^t<<8))^t<<4))^t<<2))^t<<1)}var O=function(){function e(t,c,s){var a;Object(b.a)(this,e),this.size=t,this.n_pw2=(a=t,Math.floor(Math.pow(2,Math.ceil(Math.log2(a))))),this.i=0,this.j=0,this.loc=0,this.cache=new k(c,s),this.move(0,0)}return Object(x.a)(e,[{key:"move",value:function(e,t){e<0||e>=this.size||t<0||t>=this.size?console.log("attempted to move out of bounds"):(this.i=e,this.j=t,this.loc=this.translate(e,t),this.cache.access(this.get_cache_index(e,t)))}},{key:"random_teleport",value:function(){this.move(f(this.size),f(this.size))}},{key:"teleport",value:function(e,t){this.move(e,t)}},{key:"left",value:function(){this.move(this.i,this.j-1)}},{key:"right",value:function(){this.move(this.i,this.j+1)}},{key:"up",value:function(){this.move(this.i-1,this.j)}},{key:"down",value:function(){this.move(this.i+1,this.j)}},{key:"get_cache_index",value:function(e,t){return Math.floor(this.translate(e,t)/this.cache.width)}},{key:"get_indices_in_cache",value:function(){for(var e=[],t=0;t<this.cache.lru.length;t++)for(var c=0;c<this.cache.width;c++){var s=this.reverse_translate(this.cache.lru[t]*this.cache.width+c);e.push(s[0]*this.size+s[1])}return e}},{key:"get_cache_visual",value:function(){for(var e=Array(this.size*this.size).fill(1),t=this.get_indices_in_cache(),c=0;c<t.length;c++)e[t[c]]=.5;return e[this.i*this.size+this.j]=0,e}},{key:"get_cache_stats",value:function(){return 0===this.cache.cache_accesses?Object(o.jsxs)("div",{children:[Object(o.jsxs)("div",{children:["Cache of width ",this.cache.width," and height ",this.cache.height]}),Object(o.jsxs)("div",{children:["Total of ",this.cache.cache_accesses," cache accesses and ",this.cache.cache_hits," cache hits"]}),Object(o.jsx)("div",{children:"Cache hit percentage: N/A"})]}):Object(o.jsxs)("div",{children:[Object(o.jsxs)("div",{children:["Cache of width ",this.cache.width," and height ",this.cache.height]}),Object(o.jsxs)("div",{children:["Total of ",this.cache.cache_accesses," cache accesses and ",this.cache.cache_hits," cache hits"]}),Object(o.jsxs)("div",{children:["Cache hit percentage: ",this.cache.cache_hits/this.cache.cache_accesses]})]})}}]),e}(),y=function(e){Object(j.a)(c,e);var t=Object(v.a)(c);function c(){return Object(b.a)(this,c),t.apply(this,arguments)}return Object(x.a)(c,[{key:"translate",value:function(e,t){return this.size*e+t}},{key:"reverse_translate",value:function(e){var t=Math.floor(e/this.size);return[t,e-this.size*t]}}]),c}(O),p=function(e){Object(j.a)(c,e);var t=Object(v.a)(c);function c(){return Object(b.a)(this,c),t.apply(this,arguments)}return Object(x.a)(c,[{key:"translate",value:function(e,t){return c=e,g(t)|g(c)<<1;var c}},{key:"reverse_translate",value:function(e){var t=e.toString(2);t.length%2!==0&&(t="0"+t);for(var c=1,s=0,a=0,i=0;i<t.length/2;i++)s+=c*parseInt(t.slice(t.length-1-2*i-1,t.length-1-2*i)),a+=c*parseInt(t.slice(t.length-1-2*i,t.length-2*i)),c*=2;return[s,a]}}]),c}(O),_=function(e){Object(j.a)(c,e);var t=Object(v.a)(c);function c(){return Object(b.a)(this,c),t.apply(this,arguments)}return Object(x.a)(c,[{key:"translate",value:function(e,t){for(var c=[0,1,3,2],s=0,a=this.n_pw2/2;a>=1;a/=2){var i=(((e&a)===a)<<1)+((t&a)===a);if(s+=c[i],e&=a-1,t&=a-1,0===i){var n=[t,e];e=n[0],t=n[1]}else if(2===i){var h=[a-1-t,a-1-e];e=h[0],t=h[1]}a>1&&(s<<=2)}return s}},{key:"reverse_translate",value:function(e){for(var t=(Math.pow(this.n_pw2,2)+e).toString(2).slice(1),c="",s="",a=0;a<t.length;a+=2)c+=t.charAt(a),s+=t.charAt(a+1);c=parseInt(c,2),s=parseInt(s,2);for(var i=0,n=0,h=1;h<this.n_pw2;h*=2){var r=(c&h)===h,l=r^(s&h)===h,o=(r<<1)+l;if(h>1)if(0===o){var u=[n,i];i=u[0],n=u[1]}else if(2===o){var d=[h-1-n,h-1-i];i=d[0],n=d[1]}i+=r*h,n+=l*h}return[i,n]}}]),c}(O),k=function(){function e(t,c){Object(b.a)(this,e),this.width=t,this.height=c,this.lru=[],this.cache_accesses=0,this.cache_hits=0,this.cache_misses=0}return Object(x.a)(e,[{key:"access",value:function(e){this.lru.includes(e)?(this.cache_accesses++,this.cache_hits++,this.lru.splice(this.lru.indexOf(e),1),this.lru.unshift(e)):this.lru.length>=this.height?(this.cache_accesses++,this.cache_misses++,this.lru.pop(),this.lru.unshift(e)):(this.cache_accesses++,this.cache_misses++,this.lru.unshift(e))}},{key:"stats",value:function(){console.log("Cache of width ".concat(this.width," and height ").concat(this.height)),console.log("Total of ".concat(this.cache_accesses," cache accesses and ").concat(this.cache_hits," cache hits")),0===this.cache_accesses?console.log("No cache accesses"):console.log("Cache hit percentage: ".concat(this.cache_hits/this.cache_accesses))}}]),e}(),w=c(210),m=c(211),z=c(212);var C=function(){var e=a.a.useState(!1),t=Object(h.a)(e,2),c=t[0],s=t[1];return Object(o.jsxs)(m.a,{onClose:function(){return s(!1)},onOpen:function(){return s(!0)},open:c,trigger:Object(o.jsx)(z.a,{color:"blue",children:"Help"}),children:[Object(o.jsx)(m.a.Header,{children:"Help"}),Object(o.jsxs)(m.a.Content,{children:[Object(o.jsx)("h2",{children:"What is being displayed"}),Object(o.jsx)("p",{children:" On both sides, the entries of a 32 by 32 matrix are displayed in row major order. The black square is the current entry being accessed in the array. The grayed squares are the entries that reside in a cache with width 8 and height 8 using a LRU policy. There are three different indexing designs that can be chosen: row-major indexing, z indexing, and hilbert indexing. Row-major indexing stores the entries of the array behind the scenes in a row major order, z indexing does so using a z-order curve, and Hilbert indexing uses a pseudo Hilbert curve. Finally, below each array, some basic statistics regarding cache hits and misses are shown."}),Object(o.jsx)("h2",{children:"Usage"}),Object(o.jsxs)("ul",{children:[Object(o.jsx)("li",{children:"Use the dropdowns on the two sides of the page to select the type of indexing "}),Object(o.jsx)("li",{children:"Use the teleport UI in the center to teleport the pointer of all matrices to any entry of the array"}),Object(o.jsx)("li",{children:"Use WASD to move the pointer through the array"})]})]}),Object(o.jsx)(m.a.Actions,{children:Object(o.jsx)(z.a,{color:"blue",onClick:function(){return s(!1)},children:"Close"})})]})},S=[{key:0,value:0,text:0},{key:1,value:1,text:1},{key:2,value:2,text:2},{key:3,value:3,text:3},{key:4,value:4,text:4},{key:5,value:5,text:5},{key:6,value:6,text:6},{key:7,value:7,text:7},{key:8,value:8,text:8},{key:9,value:9,text:9},{key:10,value:10,text:10},{key:11,value:11,text:11},{key:12,value:12,text:12},{key:13,value:13,text:13},{key:14,value:14,text:14},{key:15,value:15,text:15},{key:16,value:16,text:16},{key:17,value:17,text:17},{key:18,value:18,text:18},{key:19,value:19,text:19},{key:20,value:20,text:20},{key:21,value:21,text:21},{key:22,value:22,text:22},{key:23,value:23,text:23},{key:24,value:24,text:24},{key:25,value:25,text:25},{key:26,value:26,text:26},{key:27,value:27,text:27},{key:28,value:28,text:28},{key:29,value:29,text:29},{key:30,value:30,text:30},{key:31,value:31,text:31}];var M=function(){var e=Object(s.useState)(32),t=Object(h.a)(e,1)[0],c=Object(s.useState)(-1),a=Object(h.a)(c,2),i=a[0],n=a[1],u=Object(s.useState)(-1),j=Object(h.a)(u,2),v=j[0],b=j[1],x=Object(s.useState)(new Date),f=Object(h.a)(x,2),g=f[0],O=f[1],k=Object(s.useState)(new y(t,8,8)),m=Object(h.a)(k,1)[0],z=Object(s.useState)(new p(t,8,8)),M=Object(h.a)(z,1)[0],N=Object(s.useState)(new _(t,8,8)),I=Object(h.a)(N,1)[0],T=Object(s.useState)(0),A=Object(h.a)(T,2),H=A[0],U=A[1],D=Object(s.useState)(0),F=Object(h.a)(D,2),L=F[0],E=F[1];Object(s.useEffect)((function(){return window.addEventListener("keydown",R),function(){return window.removeEventListener("keydown",R)}}),[g]);var R=function(e){"w"===e.key&&(m.up(),M.up(),I.up()),"s"===e.key&&(m.down(),M.down(),I.down()),"a"===e.key&&(m.left(),M.left(),I.left()),"d"===e.key&&(m.right(),M.right(),I.right()),O(new Date)},q=function(e,t){e?n(t):b(t)};function B(){return 0===i?m.get_cache_visual():1===i?M.get_cache_visual():2===i?I.get_cache_visual():null}function W(){return 0===v?m.get_cache_visual():1===v?M.get_cache_visual():2===v?I.get_cache_visual():null}return Object(o.jsxs)("div",{className:"App",children:[Object(o.jsx)("div",{id:"help-modal",children:Object(o.jsx)(C,{})}),Object(o.jsx)("h1",{children:"Matrix Walker Cache Visualization"}),Object(o.jsxs)("div",{className:"content",children:[Object(o.jsxs)("div",{className:"matrix-display",id:"left-matrix",children:[Object(o.jsx)(d,{selected:function(e){q(!0,e)}}),Object(o.jsx)("div",{className:"pixel-grid",children:null===B()?Object(o.jsx)("div",{}):Object(o.jsx)(r.a,{data:B(),options:{size:450/t,padding:.5,background:[0,.5,1]}})}),Object(o.jsx)("div",{className:"cache-stats",children:0===i?m.get_cache_stats():1===i?M.get_cache_stats():2===i?I.get_cache_stats():null})]}),Object(o.jsxs)("div",{id:"teleport-ui",children:[Object(o.jsx)("h3",{children:"Teleport"}),Object(o.jsxs)(w.a,{onSubmit:function(e){m.teleport(H,L),M.teleport(H,L),I.teleport(H,L),O(new Date)},children:[Object(o.jsxs)(w.a.Group,{widths:"equal",children:[Object(o.jsx)(l.a,{placeholder:"Row",fluid:!0,search:!0,selection:!0,options:S,className:"teleport-dropdown",onChange:function(e,t){var c=t.value;U(c)}}),Object(o.jsx)(l.a,{placeholder:"Col",fluid:!0,search:!0,selection:!0,options:S,className:"teleport-dropdown",onChange:function(e,t){var c=t.value;E(c)}})]}),Object(o.jsx)(w.a.Button,{color:"blue",children:"Submit"})]})]}),Object(o.jsxs)("div",{className:"matrix-display",id:"right-matrix",children:[Object(o.jsx)(d,{selected:function(e){q(!1,e)}}),Object(o.jsx)("div",{className:"pixel-grid",children:null===W()?Object(o.jsx)("div",{}):Object(o.jsx)(r.a,{data:W(),options:{size:450/t,padding:.5,background:[0,.5,1]}})}),Object(o.jsx)("div",{className:"cache-stats",children:0===v?m.get_cache_stats():1===v?M.get_cache_stats():2===v?I.get_cache_stats():null})]})]})]})},N=function(e){e&&e instanceof Function&&c.e(3).then(c.bind(null,215)).then((function(t){var c=t.getCLS,s=t.getFID,a=t.getFCP,i=t.getLCP,n=t.getTTFB;c(e),s(e),a(e),i(e),n(e)}))};n.a.render(Object(o.jsx)(a.a.StrictMode,{children:Object(o.jsx)(M,{})}),document.getElementById("root")),N()}},[[198,1,2]]]);
//# sourceMappingURL=main.d20f66b7.chunk.js.map