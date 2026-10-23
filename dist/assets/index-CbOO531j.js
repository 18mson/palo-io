(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const va="169",Kl=0,Wa=1,$l=2,sl=1,rl=2,ln=3,wn=0,be=1,tn=2,En=0,fi=1,Cr=2,Xa=3,qa=4,Zl=5,Bn=100,jl=101,Jl=102,Ql=103,tc=104,ec=200,nc=201,ic=202,sc=203,Pr=204,Lr=205,rc=206,ac=207,oc=208,lc=209,cc=210,hc=211,dc=212,uc=213,fc=214,Dr=0,Ir=1,Ur=2,_i=3,Nr=4,Fr=5,Or=6,Br=7,al=0,pc=1,mc=2,Tn=0,gc=1,_c=2,xc=3,ol=4,vc=5,Mc=6,yc=7,ll=300,xi=301,vi=302,zr=303,kr=304,ks=306,Hn=1e3,kn=1001,Gr=1002,Ge=1003,Sc=1004,Ki=1005,Ke=1006,Ks=1007,Gn=1008,fn=1009,cl=1010,hl=1011,Oi=1012,Ma=1013,Vn=1014,hn=1015,zi=1016,ya=1017,Sa=1018,Mi=1020,dl=35902,ul=1021,fl=1022,$e=1023,pl=1024,ml=1025,pi=1026,yi=1027,gl=1028,Ea=1029,_l=1030,Ta=1031,wa=1033,Ss=33776,Es=33777,Ts=33778,ws=33779,Hr=35840,Vr=35841,Wr=35842,Xr=35843,qr=36196,Yr=37492,Kr=37496,$r=37808,Zr=37809,jr=37810,Jr=37811,Qr=37812,ta=37813,ea=37814,na=37815,ia=37816,sa=37817,ra=37818,aa=37819,oa=37820,la=37821,bs=36492,ca=36494,ha=36495,xl=36283,da=36284,ua=36285,fa=36286,Ec=3200,Tc=3201,vl=0,wc=1,Sn="",Ye="srgb",Rn="srgb-linear",ba="display-p3",Gs="display-p3-linear",Ds="linear",re="srgb",Is="rec709",Us="p3",$n=7680,Ya=519,bc=512,Ac=513,Rc=514,Ml=515,Cc=516,Pc=517,Lc=518,Dc=519,Ka=35044,$a="300 es",dn=2e3,Ns=2001;class Xn{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const s=this._listeners[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}}const Me=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Za=1234567;const mi=Math.PI/180,Bi=180/Math.PI;function Ti(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Me[i&255]+Me[i>>8&255]+Me[i>>16&255]+Me[i>>24&255]+"-"+Me[t&255]+Me[t>>8&255]+"-"+Me[t>>16&15|64]+Me[t>>24&255]+"-"+Me[e&63|128]+Me[e>>8&255]+"-"+Me[e>>16&255]+Me[e>>24&255]+Me[n&255]+Me[n>>8&255]+Me[n>>16&255]+Me[n>>24&255]).toLowerCase()}function we(i,t,e){return Math.max(t,Math.min(e,i))}function Aa(i,t){return(i%t+t)%t}function Ic(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function Uc(i,t,e){return i!==t?(e-i)/(t-i):0}function Fi(i,t,e){return(1-e)*i+e*t}function Nc(i,t,e,n){return Fi(i,t,1-Math.exp(-e*n))}function Fc(i,t=1){return t-Math.abs(Aa(i,t*2)-t)}function Oc(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function Bc(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function zc(i,t){return i+Math.floor(Math.random()*(t-i+1))}function kc(i,t){return i+Math.random()*(t-i)}function Gc(i){return i*(.5-Math.random())}function Hc(i){i!==void 0&&(Za=i);let t=Za+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Vc(i){return i*mi}function Wc(i){return i*Bi}function Xc(i){return(i&i-1)===0&&i!==0}function qc(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Yc(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Kc(i,t,e,n,s){const r=Math.cos,a=Math.sin,o=r(e/2),c=a(e/2),l=r((t+n)/2),d=a((t+n)/2),u=r((t-n)/2),p=a((t-n)/2),m=r((n-t)/2),g=a((n-t)/2);switch(s){case"XYX":i.set(o*d,c*u,c*p,o*l);break;case"YZY":i.set(c*p,o*d,c*u,o*l);break;case"ZXZ":i.set(c*u,c*p,o*d,o*l);break;case"XZX":i.set(o*d,c*g,c*m,o*l);break;case"YXY":i.set(c*m,o*d,c*g,o*l);break;case"ZYZ":i.set(c*g,c*m,o*d,o*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function di(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Ee(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const Se={DEG2RAD:mi,RAD2DEG:Bi,generateUUID:Ti,clamp:we,euclideanModulo:Aa,mapLinear:Ic,inverseLerp:Uc,lerp:Fi,damp:Nc,pingpong:Fc,smoothstep:Oc,smootherstep:Bc,randInt:zc,randFloat:kc,randFloatSpread:Gc,seededRandom:Hc,degToRad:Vc,radToDeg:Wc,isPowerOfTwo:Xc,ceilPowerOfTwo:qc,floorPowerOfTwo:Yc,setQuaternionFromProperEuler:Kc,normalize:Ee,denormalize:di};class Yt{constructor(t=0,e=0){Yt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(we(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*s+t.x,this.y=r*s+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ft{constructor(t,e,n,s,r,a,o,c,l){Ft.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,c,l)}set(t,e,n,s,r,a,o,c,l){const d=this.elements;return d[0]=t,d[1]=s,d[2]=o,d[3]=e,d[4]=r,d[5]=c,d[6]=n,d[7]=a,d[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],d=n[4],u=n[7],p=n[2],m=n[5],g=n[8],_=s[0],f=s[3],h=s[6],E=s[1],M=s[4],T=s[7],P=s[2],A=s[5],b=s[8];return r[0]=a*_+o*E+c*P,r[3]=a*f+o*M+c*A,r[6]=a*h+o*T+c*b,r[1]=l*_+d*E+u*P,r[4]=l*f+d*M+u*A,r[7]=l*h+d*T+u*b,r[2]=p*_+m*E+g*P,r[5]=p*f+m*M+g*A,r[8]=p*h+m*T+g*b,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],d=t[8];return e*a*d-e*o*l-n*r*d+n*o*c+s*r*l-s*a*c}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],d=t[8],u=d*a-o*l,p=o*c-d*r,m=l*r-a*c,g=e*u+n*p+s*m;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return t[0]=u*_,t[1]=(s*l-d*n)*_,t[2]=(o*n-s*a)*_,t[3]=p*_,t[4]=(d*e-s*c)*_,t[5]=(s*r-o*e)*_,t[6]=m*_,t[7]=(n*c-l*e)*_,t[8]=(a*e-n*r)*_,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,a,o){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*a+l*o)+a+t,-s*l,s*c,-s*(-l*a+c*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply($s.makeScale(t,e)),this}rotate(t){return this.premultiply($s.makeRotation(-t)),this}translate(t,e){return this.premultiply($s.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const $s=new Ft;function yl(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Fs(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function $c(){const i=Fs("canvas");return i.style.display="block",i}const ja={};function As(i){i in ja||(ja[i]=!0,console.warn(i))}function Zc(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}function jc(i){const t=i.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function Jc(i){const t=i.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const Ja=new Ft().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Qa=new Ft().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),bi={[Rn]:{transfer:Ds,primaries:Is,luminanceCoefficients:[.2126,.7152,.0722],toReference:i=>i,fromReference:i=>i},[Ye]:{transfer:re,primaries:Is,luminanceCoefficients:[.2126,.7152,.0722],toReference:i=>i.convertSRGBToLinear(),fromReference:i=>i.convertLinearToSRGB()},[Gs]:{transfer:Ds,primaries:Us,luminanceCoefficients:[.2289,.6917,.0793],toReference:i=>i.applyMatrix3(Qa),fromReference:i=>i.applyMatrix3(Ja)},[ba]:{transfer:re,primaries:Us,luminanceCoefficients:[.2289,.6917,.0793],toReference:i=>i.convertSRGBToLinear().applyMatrix3(Qa),fromReference:i=>i.applyMatrix3(Ja).convertLinearToSRGB()}},Qc=new Set([Rn,Gs]),jt={enabled:!0,_workingColorSpace:Rn,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(i){if(!Qc.has(i))throw new Error(`Unsupported working color space, "${i}".`);this._workingColorSpace=i},convert:function(i,t,e){if(this.enabled===!1||t===e||!t||!e)return i;const n=bi[t].toReference,s=bi[e].fromReference;return s(n(i))},fromWorkingColorSpace:function(i,t){return this.convert(i,this._workingColorSpace,t)},toWorkingColorSpace:function(i,t){return this.convert(i,t,this._workingColorSpace)},getPrimaries:function(i){return bi[i].primaries},getTransfer:function(i){return i===Sn?Ds:bi[i].transfer},getLuminanceCoefficients:function(i,t=this._workingColorSpace){return i.fromArray(bi[t].luminanceCoefficients)}};function gi(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Zs(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Zn;class th{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Zn===void 0&&(Zn=Fs("canvas")),Zn.width=t.width,Zn.height=t.height;const n=Zn.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=Zn}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Fs("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=gi(r[a]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(gi(e[n]/255)*255):e[n]=gi(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let eh=0;class Sl{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:eh++}),this.uuid=Ti(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(js(s[a].image)):r.push(js(s[a]))}else r=js(s);n.url=r}return e||(t.images[this.uuid]=n),n}}function js(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?th.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let nh=0;class Ae extends Xn{constructor(t=Ae.DEFAULT_IMAGE,e=Ae.DEFAULT_MAPPING,n=kn,s=kn,r=Ke,a=Gn,o=$e,c=fn,l=Ae.DEFAULT_ANISOTROPY,d=Sn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:nh++}),this.uuid=Ti(),this.name="",this.source=new Sl(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new Yt(0,0),this.repeat=new Yt(1,1),this.center=new Yt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ft,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==ll)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Hn:t.x=t.x-Math.floor(t.x);break;case kn:t.x=t.x<0?0:1;break;case Gr:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Hn:t.y=t.y-Math.floor(t.y);break;case kn:t.y=t.y<0?0:1;break;case Gr:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Ae.DEFAULT_IMAGE=null;Ae.DEFAULT_MAPPING=ll;Ae.DEFAULT_ANISOTROPY=1;class te{constructor(t=0,e=0,n=0,s=1){te.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*s+a[15]*r,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r;const c=t.elements,l=c[0],d=c[4],u=c[8],p=c[1],m=c[5],g=c[9],_=c[2],f=c[6],h=c[10];if(Math.abs(d-p)<.01&&Math.abs(u-_)<.01&&Math.abs(g-f)<.01){if(Math.abs(d+p)<.1&&Math.abs(u+_)<.1&&Math.abs(g+f)<.1&&Math.abs(l+m+h-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const M=(l+1)/2,T=(m+1)/2,P=(h+1)/2,A=(d+p)/4,b=(u+_)/4,I=(g+f)/4;return M>T&&M>P?M<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(M),s=A/n,r=b/n):T>P?T<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(T),n=A/s,r=I/s):P<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(P),n=b/r,s=I/r),this.set(n,s,r,e),this}let E=Math.sqrt((f-g)*(f-g)+(u-_)*(u-_)+(p-d)*(p-d));return Math.abs(E)<.001&&(E=1),this.x=(f-g)/E,this.y=(u-_)/E,this.z=(p-d)/E,this.w=Math.acos((l+m+h-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class ih extends Xn{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new te(0,0,t,e),this.scissorTest=!1,this.viewport=new te(0,0,t,e);const s={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ke,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new Ae(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,s=t.textures.length;n<s;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new Sl(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Wn extends ih{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class El extends Ae{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Ge,this.minFilter=Ge,this.wrapR=kn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class sh extends Ae{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Ge,this.minFilter=Ge,this.wrapR=kn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ki{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,a,o){let c=n[s+0],l=n[s+1],d=n[s+2],u=n[s+3];const p=r[a+0],m=r[a+1],g=r[a+2],_=r[a+3];if(o===0){t[e+0]=c,t[e+1]=l,t[e+2]=d,t[e+3]=u;return}if(o===1){t[e+0]=p,t[e+1]=m,t[e+2]=g,t[e+3]=_;return}if(u!==_||c!==p||l!==m||d!==g){let f=1-o;const h=c*p+l*m+d*g+u*_,E=h>=0?1:-1,M=1-h*h;if(M>Number.EPSILON){const P=Math.sqrt(M),A=Math.atan2(P,h*E);f=Math.sin(f*A)/P,o=Math.sin(o*A)/P}const T=o*E;if(c=c*f+p*T,l=l*f+m*T,d=d*f+g*T,u=u*f+_*T,f===1-o){const P=1/Math.sqrt(c*c+l*l+d*d+u*u);c*=P,l*=P,d*=P,u*=P}}t[e]=c,t[e+1]=l,t[e+2]=d,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,s,r,a){const o=n[s],c=n[s+1],l=n[s+2],d=n[s+3],u=r[a],p=r[a+1],m=r[a+2],g=r[a+3];return t[e]=o*g+d*u+c*m-l*p,t[e+1]=c*g+d*p+l*u-o*m,t[e+2]=l*g+d*m+o*p-c*u,t[e+3]=d*g-o*u-c*p-l*m,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,c=Math.sin,l=o(n/2),d=o(s/2),u=o(r/2),p=c(n/2),m=c(s/2),g=c(r/2);switch(a){case"XYZ":this._x=p*d*u+l*m*g,this._y=l*m*u-p*d*g,this._z=l*d*g+p*m*u,this._w=l*d*u-p*m*g;break;case"YXZ":this._x=p*d*u+l*m*g,this._y=l*m*u-p*d*g,this._z=l*d*g-p*m*u,this._w=l*d*u+p*m*g;break;case"ZXY":this._x=p*d*u-l*m*g,this._y=l*m*u+p*d*g,this._z=l*d*g+p*m*u,this._w=l*d*u-p*m*g;break;case"ZYX":this._x=p*d*u-l*m*g,this._y=l*m*u+p*d*g,this._z=l*d*g-p*m*u,this._w=l*d*u+p*m*g;break;case"YZX":this._x=p*d*u+l*m*g,this._y=l*m*u+p*d*g,this._z=l*d*g-p*m*u,this._w=l*d*u-p*m*g;break;case"XZY":this._x=p*d*u-l*m*g,this._y=l*m*u-p*d*g,this._z=l*d*g+p*m*u,this._w=l*d*u+p*m*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],r=e[8],a=e[1],o=e[5],c=e[9],l=e[2],d=e[6],u=e[10],p=n+o+u;if(p>0){const m=.5/Math.sqrt(p+1);this._w=.25/m,this._x=(d-c)*m,this._y=(r-l)*m,this._z=(a-s)*m}else if(n>o&&n>u){const m=2*Math.sqrt(1+n-o-u);this._w=(d-c)/m,this._x=.25*m,this._y=(s+a)/m,this._z=(r+l)/m}else if(o>u){const m=2*Math.sqrt(1+o-n-u);this._w=(r-l)/m,this._x=(s+a)/m,this._y=.25*m,this._z=(c+d)/m}else{const m=2*Math.sqrt(1+u-n-o);this._w=(a-s)/m,this._x=(r+l)/m,this._y=(c+d)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(we(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,r=t._z,a=t._w,o=e._x,c=e._y,l=e._z,d=e._w;return this._x=n*d+a*o+s*l-r*c,this._y=s*d+a*c+r*o-n*l,this._z=r*d+a*l+n*c-s*o,this._w=a*d-n*o-s*c-r*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,s=this._y,r=this._z,a=this._w;let o=a*t._w+n*t._x+s*t._y+r*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=n,this._y=s,this._z=r,this;const c=1-o*o;if(c<=Number.EPSILON){const m=1-e;return this._w=m*a+e*this._w,this._x=m*n+e*this._x,this._y=m*s+e*this._y,this._z=m*r+e*this._z,this.normalize(),this}const l=Math.sqrt(c),d=Math.atan2(l,o),u=Math.sin((1-e)*d)/l,p=Math.sin(e*d)/l;return this._w=a*u+this._w*p,this._x=n*u+this._x*p,this._y=s*u+this._y*p,this._z=r*u+this._z*p,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class R{constructor(t=0,e=0,n=0){R.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(to.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(to.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,r=t.x,a=t.y,o=t.z,c=t.w,l=2*(a*s-o*n),d=2*(o*e-r*s),u=2*(r*n-a*e);return this.x=e+c*l+a*u-o*d,this.y=n+c*d+o*l-r*u,this.z=s+c*u+r*d-a*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,r=t.z,a=e.x,o=e.y,c=e.z;return this.x=s*c-r*o,this.y=r*a-n*c,this.z=n*o-s*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Js.copy(this).projectOnVector(t),this.sub(Js)}reflect(t){return this.sub(Js.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(we(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Js=new R,to=new ki;class qn{constructor(t=new R(1/0,1/0,1/0),e=new R(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(We.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(We.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=We.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,We):We.fromBufferAttribute(r,a),We.applyMatrix4(t.matrixWorld),this.expandByPoint(We);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),$i.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),$i.copy(n.boundingBox)),$i.applyMatrix4(t.matrixWorld),this.union($i)}const s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,We),We.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Ai),Zi.subVectors(this.max,Ai),jn.subVectors(t.a,Ai),Jn.subVectors(t.b,Ai),Qn.subVectors(t.c,Ai),mn.subVectors(Jn,jn),gn.subVectors(Qn,Jn),Pn.subVectors(jn,Qn);let e=[0,-mn.z,mn.y,0,-gn.z,gn.y,0,-Pn.z,Pn.y,mn.z,0,-mn.x,gn.z,0,-gn.x,Pn.z,0,-Pn.x,-mn.y,mn.x,0,-gn.y,gn.x,0,-Pn.y,Pn.x,0];return!Qs(e,jn,Jn,Qn,Zi)||(e=[1,0,0,0,1,0,0,0,1],!Qs(e,jn,Jn,Qn,Zi))?!1:(ji.crossVectors(mn,gn),e=[ji.x,ji.y,ji.z],Qs(e,jn,Jn,Qn,Zi))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,We).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(We).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(nn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),nn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),nn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),nn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),nn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),nn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),nn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),nn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(nn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const nn=[new R,new R,new R,new R,new R,new R,new R,new R],We=new R,$i=new qn,jn=new R,Jn=new R,Qn=new R,mn=new R,gn=new R,Pn=new R,Ai=new R,Zi=new R,ji=new R,Ln=new R;function Qs(i,t,e,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){Ln.fromArray(i,r);const o=s.x*Math.abs(Ln.x)+s.y*Math.abs(Ln.y)+s.z*Math.abs(Ln.z),c=t.dot(Ln),l=e.dot(Ln),d=n.dot(Ln);if(Math.max(-Math.max(c,l,d),Math.min(c,l,d))>o)return!1}return!0}const rh=new qn,Ri=new R,tr=new R;class Gi{constructor(t=new R,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):rh.setFromPoints(t).getCenter(n);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Ri.subVectors(t,this.center);const e=Ri.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(Ri,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(tr.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Ri.copy(t.center).add(tr)),this.expandByPoint(Ri.copy(t.center).sub(tr))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const sn=new R,er=new R,Ji=new R,_n=new R,nr=new R,Qi=new R,ir=new R;class Hi{constructor(t=new R,e=new R(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,sn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=sn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(sn.copy(this.origin).addScaledVector(this.direction,e),sn.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){er.copy(t).add(e).multiplyScalar(.5),Ji.copy(e).sub(t).normalize(),_n.copy(this.origin).sub(er);const r=t.distanceTo(e)*.5,a=-this.direction.dot(Ji),o=_n.dot(this.direction),c=-_n.dot(Ji),l=_n.lengthSq(),d=Math.abs(1-a*a);let u,p,m,g;if(d>0)if(u=a*c-o,p=a*o-c,g=r*d,u>=0)if(p>=-g)if(p<=g){const _=1/d;u*=_,p*=_,m=u*(u+a*p+2*o)+p*(a*u+p+2*c)+l}else p=r,u=Math.max(0,-(a*p+o)),m=-u*u+p*(p+2*c)+l;else p=-r,u=Math.max(0,-(a*p+o)),m=-u*u+p*(p+2*c)+l;else p<=-g?(u=Math.max(0,-(-a*r+o)),p=u>0?-r:Math.min(Math.max(-r,-c),r),m=-u*u+p*(p+2*c)+l):p<=g?(u=0,p=Math.min(Math.max(-r,-c),r),m=p*(p+2*c)+l):(u=Math.max(0,-(a*r+o)),p=u>0?r:Math.min(Math.max(-r,-c),r),m=-u*u+p*(p+2*c)+l);else p=a>0?-r:r,u=Math.max(0,-(a*p+o)),m=-u*u+p*(p+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(er).addScaledVector(Ji,p),m}intersectSphere(t,e){sn.subVectors(t.center,this.origin);const n=sn.dot(this.direction),s=sn.dot(sn)-n*n,r=t.radius*t.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,e):this.at(o,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,a,o,c;const l=1/this.direction.x,d=1/this.direction.y,u=1/this.direction.z,p=this.origin;return l>=0?(n=(t.min.x-p.x)*l,s=(t.max.x-p.x)*l):(n=(t.max.x-p.x)*l,s=(t.min.x-p.x)*l),d>=0?(r=(t.min.y-p.y)*d,a=(t.max.y-p.y)*d):(r=(t.max.y-p.y)*d,a=(t.min.y-p.y)*d),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),u>=0?(o=(t.min.z-p.z)*u,c=(t.max.z-p.z)*u):(o=(t.max.z-p.z)*u,c=(t.min.z-p.z)*u),n>c||o>s)||((o>n||n!==n)&&(n=o),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,sn)!==null}intersectTriangle(t,e,n,s,r){nr.subVectors(e,t),Qi.subVectors(n,t),ir.crossVectors(nr,Qi);let a=this.direction.dot(ir),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;_n.subVectors(this.origin,t);const c=o*this.direction.dot(Qi.crossVectors(_n,Qi));if(c<0)return null;const l=o*this.direction.dot(nr.cross(_n));if(l<0||c+l>a)return null;const d=-o*_n.dot(ir);return d<0?null:this.at(d/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ie{constructor(t,e,n,s,r,a,o,c,l,d,u,p,m,g,_,f){ie.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,c,l,d,u,p,m,g,_,f)}set(t,e,n,s,r,a,o,c,l,d,u,p,m,g,_,f){const h=this.elements;return h[0]=t,h[4]=e,h[8]=n,h[12]=s,h[1]=r,h[5]=a,h[9]=o,h[13]=c,h[2]=l,h[6]=d,h[10]=u,h[14]=p,h[3]=m,h[7]=g,h[11]=_,h[15]=f,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ie().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,s=1/ti.setFromMatrixColumn(t,0).length(),r=1/ti.setFromMatrixColumn(t,1).length(),a=1/ti.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(s),l=Math.sin(s),d=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){const p=a*d,m=a*u,g=o*d,_=o*u;e[0]=c*d,e[4]=-c*u,e[8]=l,e[1]=m+g*l,e[5]=p-_*l,e[9]=-o*c,e[2]=_-p*l,e[6]=g+m*l,e[10]=a*c}else if(t.order==="YXZ"){const p=c*d,m=c*u,g=l*d,_=l*u;e[0]=p+_*o,e[4]=g*o-m,e[8]=a*l,e[1]=a*u,e[5]=a*d,e[9]=-o,e[2]=m*o-g,e[6]=_+p*o,e[10]=a*c}else if(t.order==="ZXY"){const p=c*d,m=c*u,g=l*d,_=l*u;e[0]=p-_*o,e[4]=-a*u,e[8]=g+m*o,e[1]=m+g*o,e[5]=a*d,e[9]=_-p*o,e[2]=-a*l,e[6]=o,e[10]=a*c}else if(t.order==="ZYX"){const p=a*d,m=a*u,g=o*d,_=o*u;e[0]=c*d,e[4]=g*l-m,e[8]=p*l+_,e[1]=c*u,e[5]=_*l+p,e[9]=m*l-g,e[2]=-l,e[6]=o*c,e[10]=a*c}else if(t.order==="YZX"){const p=a*c,m=a*l,g=o*c,_=o*l;e[0]=c*d,e[4]=_-p*u,e[8]=g*u+m,e[1]=u,e[5]=a*d,e[9]=-o*d,e[2]=-l*d,e[6]=m*u+g,e[10]=p-_*u}else if(t.order==="XZY"){const p=a*c,m=a*l,g=o*c,_=o*l;e[0]=c*d,e[4]=-u,e[8]=l*d,e[1]=p*u+_,e[5]=a*d,e[9]=m*u-g,e[2]=g*u-m,e[6]=o*d,e[10]=_*u+p}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(ah,t,oh)}lookAt(t,e,n){const s=this.elements;return Ue.subVectors(t,e),Ue.lengthSq()===0&&(Ue.z=1),Ue.normalize(),xn.crossVectors(n,Ue),xn.lengthSq()===0&&(Math.abs(n.z)===1?Ue.x+=1e-4:Ue.z+=1e-4,Ue.normalize(),xn.crossVectors(n,Ue)),xn.normalize(),ts.crossVectors(Ue,xn),s[0]=xn.x,s[4]=ts.x,s[8]=Ue.x,s[1]=xn.y,s[5]=ts.y,s[9]=Ue.y,s[2]=xn.z,s[6]=ts.z,s[10]=Ue.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],d=n[1],u=n[5],p=n[9],m=n[13],g=n[2],_=n[6],f=n[10],h=n[14],E=n[3],M=n[7],T=n[11],P=n[15],A=s[0],b=s[4],I=s[8],q=s[12],x=s[1],S=s[5],B=s[9],z=s[13],X=s[2],Z=s[6],k=s[10],tt=s[14],W=s[3],ft=s[7],ct=s[11],_t=s[15];return r[0]=a*A+o*x+c*X+l*W,r[4]=a*b+o*S+c*Z+l*ft,r[8]=a*I+o*B+c*k+l*ct,r[12]=a*q+o*z+c*tt+l*_t,r[1]=d*A+u*x+p*X+m*W,r[5]=d*b+u*S+p*Z+m*ft,r[9]=d*I+u*B+p*k+m*ct,r[13]=d*q+u*z+p*tt+m*_t,r[2]=g*A+_*x+f*X+h*W,r[6]=g*b+_*S+f*Z+h*ft,r[10]=g*I+_*B+f*k+h*ct,r[14]=g*q+_*z+f*tt+h*_t,r[3]=E*A+M*x+T*X+P*W,r[7]=E*b+M*S+T*Z+P*ft,r[11]=E*I+M*B+T*k+P*ct,r[15]=E*q+M*z+T*tt+P*_t,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],a=t[1],o=t[5],c=t[9],l=t[13],d=t[2],u=t[6],p=t[10],m=t[14],g=t[3],_=t[7],f=t[11],h=t[15];return g*(+r*c*u-s*l*u-r*o*p+n*l*p+s*o*m-n*c*m)+_*(+e*c*m-e*l*p+r*a*p-s*a*m+s*l*d-r*c*d)+f*(+e*l*u-e*o*m-r*a*u+n*a*m+r*o*d-n*l*d)+h*(-s*o*d-e*c*u+e*o*p+s*a*u-n*a*p+n*c*d)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],d=t[8],u=t[9],p=t[10],m=t[11],g=t[12],_=t[13],f=t[14],h=t[15],E=u*f*l-_*p*l+_*c*m-o*f*m-u*c*h+o*p*h,M=g*p*l-d*f*l-g*c*m+a*f*m+d*c*h-a*p*h,T=d*_*l-g*u*l+g*o*m-a*_*m-d*o*h+a*u*h,P=g*u*c-d*_*c-g*o*p+a*_*p+d*o*f-a*u*f,A=e*E+n*M+s*T+r*P;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const b=1/A;return t[0]=E*b,t[1]=(_*p*r-u*f*r-_*s*m+n*f*m+u*s*h-n*p*h)*b,t[2]=(o*f*r-_*c*r+_*s*l-n*f*l-o*s*h+n*c*h)*b,t[3]=(u*c*r-o*p*r-u*s*l+n*p*l+o*s*m-n*c*m)*b,t[4]=M*b,t[5]=(d*f*r-g*p*r+g*s*m-e*f*m-d*s*h+e*p*h)*b,t[6]=(g*c*r-a*f*r-g*s*l+e*f*l+a*s*h-e*c*h)*b,t[7]=(a*p*r-d*c*r+d*s*l-e*p*l-a*s*m+e*c*m)*b,t[8]=T*b,t[9]=(g*u*r-d*_*r-g*n*m+e*_*m+d*n*h-e*u*h)*b,t[10]=(a*_*r-g*o*r+g*n*l-e*_*l-a*n*h+e*o*h)*b,t[11]=(d*o*r-a*u*r-d*n*l+e*u*l+a*n*m-e*o*m)*b,t[12]=P*b,t[13]=(d*_*s-g*u*s+g*n*p-e*_*p-d*n*f+e*u*f)*b,t[14]=(g*o*s-a*_*s-g*n*c+e*_*c+a*n*f-e*o*f)*b,t[15]=(a*u*s-d*o*s+d*n*c-e*u*c-a*n*p+e*o*p)*b,this}scale(t){const e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),r=1-n,a=t.x,o=t.y,c=t.z,l=r*a,d=r*o;return this.set(l*a+n,l*o-s*c,l*c+s*o,0,l*o+s*c,d*o+n,d*c-s*a,0,l*c-s*o,d*c+s*a,r*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,a){return this.set(1,n,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,r=e._x,a=e._y,o=e._z,c=e._w,l=r+r,d=a+a,u=o+o,p=r*l,m=r*d,g=r*u,_=a*d,f=a*u,h=o*u,E=c*l,M=c*d,T=c*u,P=n.x,A=n.y,b=n.z;return s[0]=(1-(_+h))*P,s[1]=(m+T)*P,s[2]=(g-M)*P,s[3]=0,s[4]=(m-T)*A,s[5]=(1-(p+h))*A,s[6]=(f+E)*A,s[7]=0,s[8]=(g+M)*b,s[9]=(f-E)*b,s[10]=(1-(p+_))*b,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;let r=ti.set(s[0],s[1],s[2]).length();const a=ti.set(s[4],s[5],s[6]).length(),o=ti.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],Xe.copy(this);const l=1/r,d=1/a,u=1/o;return Xe.elements[0]*=l,Xe.elements[1]*=l,Xe.elements[2]*=l,Xe.elements[4]*=d,Xe.elements[5]*=d,Xe.elements[6]*=d,Xe.elements[8]*=u,Xe.elements[9]*=u,Xe.elements[10]*=u,e.setFromRotationMatrix(Xe),n.x=r,n.y=a,n.z=o,this}makePerspective(t,e,n,s,r,a,o=dn){const c=this.elements,l=2*r/(e-t),d=2*r/(n-s),u=(e+t)/(e-t),p=(n+s)/(n-s);let m,g;if(o===dn)m=-(a+r)/(a-r),g=-2*a*r/(a-r);else if(o===Ns)m=-a/(a-r),g=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=l,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=d,c[9]=p,c[13]=0,c[2]=0,c[6]=0,c[10]=m,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,s,r,a,o=dn){const c=this.elements,l=1/(e-t),d=1/(n-s),u=1/(a-r),p=(e+t)*l,m=(n+s)*d;let g,_;if(o===dn)g=(a+r)*u,_=-2*u;else if(o===Ns)g=r*u,_=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-p,c[1]=0,c[5]=2*d,c[9]=0,c[13]=-m,c[2]=0,c[6]=0,c[10]=_,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const ti=new R,Xe=new ie,ah=new R(0,0,0),oh=new R(1,1,1),xn=new R,ts=new R,Ue=new R,eo=new ie,no=new ki;class He{constructor(t=0,e=0,n=0,s=He.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,r=s[0],a=s[4],o=s[8],c=s[1],l=s[5],d=s[9],u=s[2],p=s[6],m=s[10];switch(e){case"XYZ":this._y=Math.asin(we(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-d,m),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(p,l),this._z=0);break;case"YXZ":this._x=Math.asin(-we(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(o,m),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(we(p,-1,1)),Math.abs(p)<.9999999?(this._y=Math.atan2(-u,m),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-we(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(p,m),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(we(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-d,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,m));break;case"XZY":this._z=Math.asin(-we(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(p,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-d,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return eo.makeRotationFromQuaternion(t),this.setFromRotationMatrix(eo,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return no.setFromEuler(this),this.setFromQuaternion(no,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}He.DEFAULT_ORDER="XYZ";class Ra{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let lh=0;const io=new R,ei=new ki,rn=new ie,es=new R,Ci=new R,ch=new R,hh=new ki,so=new R(1,0,0),ro=new R(0,1,0),ao=new R(0,0,1),oo={type:"added"},dh={type:"removed"},ni={type:"childadded",child:null},sr={type:"childremoved",child:null};class de extends Xn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:lh++}),this.uuid=Ti(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=de.DEFAULT_UP.clone();const t=new R,e=new He,n=new ki,s=new R(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ie},normalMatrix:{value:new Ft}}),this.matrix=new ie,this.matrixWorld=new ie,this.matrixAutoUpdate=de.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=de.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ra,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return ei.setFromAxisAngle(t,e),this.quaternion.multiply(ei),this}rotateOnWorldAxis(t,e){return ei.setFromAxisAngle(t,e),this.quaternion.premultiply(ei),this}rotateX(t){return this.rotateOnAxis(so,t)}rotateY(t){return this.rotateOnAxis(ro,t)}rotateZ(t){return this.rotateOnAxis(ao,t)}translateOnAxis(t,e){return io.copy(t).applyQuaternion(this.quaternion),this.position.add(io.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(so,t)}translateY(t){return this.translateOnAxis(ro,t)}translateZ(t){return this.translateOnAxis(ao,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(rn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?es.copy(t):es.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Ci.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?rn.lookAt(Ci,es,this.up):rn.lookAt(es,Ci,this.up),this.quaternion.setFromRotationMatrix(rn),s&&(rn.extractRotation(s.matrixWorld),ei.setFromRotationMatrix(rn),this.quaternion.premultiply(ei.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(oo),ni.child=t,this.dispatchEvent(ni),ni.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(dh),sr.child=t,this.dispatchEvent(sr),sr.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),rn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),rn.multiply(t.parent.matrixWorld)),t.applyMatrix4(rn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(oo),ni.child=t,this.dispatchEvent(ni),ni.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ci,t,ch),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ci,hh,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,d=c.length;l<d;l++){const u=c[l];r(t.shapes,u)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(t.materials,this.material[c]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];s.animations.push(r(t.animations,c))}}if(e){const o=a(t.geometries),c=a(t.materials),l=a(t.textures),d=a(t.images),u=a(t.shapes),p=a(t.skeletons),m=a(t.animations),g=a(t.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),d.length>0&&(n.images=d),u.length>0&&(n.shapes=u),p.length>0&&(n.skeletons=p),m.length>0&&(n.animations=m),g.length>0&&(n.nodes=g)}return n.object=s,n;function a(o){const c=[];for(const l in o){const d=o[l];delete d.metadata,c.push(d)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}}de.DEFAULT_UP=new R(0,1,0);de.DEFAULT_MATRIX_AUTO_UPDATE=!0;de.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const qe=new R,an=new R,rr=new R,on=new R,ii=new R,si=new R,lo=new R,ar=new R,or=new R,lr=new R,cr=new te,hr=new te,dr=new te;class ke{constructor(t=new R,e=new R,n=new R){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),qe.subVectors(t,e),s.cross(qe);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){qe.subVectors(s,e),an.subVectors(n,e),rr.subVectors(t,e);const a=qe.dot(qe),o=qe.dot(an),c=qe.dot(rr),l=an.dot(an),d=an.dot(rr),u=a*l-o*o;if(u===0)return r.set(0,0,0),null;const p=1/u,m=(l*c-o*d)*p,g=(a*d-o*c)*p;return r.set(1-m-g,g,m)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,on)===null?!1:on.x>=0&&on.y>=0&&on.x+on.y<=1}static getInterpolation(t,e,n,s,r,a,o,c){return this.getBarycoord(t,e,n,s,on)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,on.x),c.addScaledVector(a,on.y),c.addScaledVector(o,on.z),c)}static getInterpolatedAttribute(t,e,n,s,r,a){return cr.setScalar(0),hr.setScalar(0),dr.setScalar(0),cr.fromBufferAttribute(t,e),hr.fromBufferAttribute(t,n),dr.fromBufferAttribute(t,s),a.setScalar(0),a.addScaledVector(cr,r.x),a.addScaledVector(hr,r.y),a.addScaledVector(dr,r.z),a}static isFrontFacing(t,e,n,s){return qe.subVectors(n,e),an.subVectors(t,e),qe.cross(an).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return qe.subVectors(this.c,this.b),an.subVectors(this.a,this.b),qe.cross(an).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return ke.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return ke.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return ke.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return ke.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return ke.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,r=this.c;let a,o;ii.subVectors(s,n),si.subVectors(r,n),ar.subVectors(t,n);const c=ii.dot(ar),l=si.dot(ar);if(c<=0&&l<=0)return e.copy(n);or.subVectors(t,s);const d=ii.dot(or),u=si.dot(or);if(d>=0&&u<=d)return e.copy(s);const p=c*u-d*l;if(p<=0&&c>=0&&d<=0)return a=c/(c-d),e.copy(n).addScaledVector(ii,a);lr.subVectors(t,r);const m=ii.dot(lr),g=si.dot(lr);if(g>=0&&m<=g)return e.copy(r);const _=m*l-c*g;if(_<=0&&l>=0&&g<=0)return o=l/(l-g),e.copy(n).addScaledVector(si,o);const f=d*g-m*u;if(f<=0&&u-d>=0&&m-g>=0)return lo.subVectors(r,s),o=(u-d)/(u-d+(m-g)),e.copy(s).addScaledVector(lo,o);const h=1/(f+_+p);return a=_*h,o=p*h,e.copy(n).addScaledVector(ii,a).addScaledVector(si,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Tl={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},vn={h:0,s:0,l:0},ns={h:0,s:0,l:0};function ur(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class zt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ye){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,jt.toWorkingColorSpace(this,e),this}setRGB(t,e,n,s=jt.workingColorSpace){return this.r=t,this.g=e,this.b=n,jt.toWorkingColorSpace(this,s),this}setHSL(t,e,n,s=jt.workingColorSpace){if(t=Aa(t,1),e=we(e,0,1),n=we(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=ur(a,r,t+1/3),this.g=ur(a,r,t),this.b=ur(a,r,t-1/3)}return jt.toWorkingColorSpace(this,s),this}setStyle(t,e=Ye){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Ye){const n=Tl[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=gi(t.r),this.g=gi(t.g),this.b=gi(t.b),this}copyLinearToSRGB(t){return this.r=Zs(t.r),this.g=Zs(t.g),this.b=Zs(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ye){return jt.fromWorkingColorSpace(ye.copy(this),t),Math.round(we(ye.r*255,0,255))*65536+Math.round(we(ye.g*255,0,255))*256+Math.round(we(ye.b*255,0,255))}getHexString(t=Ye){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=jt.workingColorSpace){jt.fromWorkingColorSpace(ye.copy(this),e);const n=ye.r,s=ye.g,r=ye.b,a=Math.max(n,s,r),o=Math.min(n,s,r);let c,l;const d=(o+a)/2;if(o===a)c=0,l=0;else{const u=a-o;switch(l=d<=.5?u/(a+o):u/(2-a-o),a){case n:c=(s-r)/u+(s<r?6:0);break;case s:c=(r-n)/u+2;break;case r:c=(n-s)/u+4;break}c/=6}return t.h=c,t.s=l,t.l=d,t}getRGB(t,e=jt.workingColorSpace){return jt.fromWorkingColorSpace(ye.copy(this),e),t.r=ye.r,t.g=ye.g,t.b=ye.b,t}getStyle(t=Ye){jt.fromWorkingColorSpace(ye.copy(this),t);const e=ye.r,n=ye.g,s=ye.b;return t!==Ye?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(vn),this.setHSL(vn.h+t,vn.s+e,vn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(vn),t.getHSL(ns);const n=Fi(vn.h,ns.h,e),s=Fi(vn.s,ns.s,e),r=Fi(vn.l,ns.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const ye=new zt;zt.NAMES=Tl;let uh=0;class Yn extends Xn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:uh++}),this.uuid=Ti(),this.name="",this.type="Material",this.blending=fi,this.side=wn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Pr,this.blendDst=Lr,this.blendEquation=Bn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new zt(0,0,0),this.blendAlpha=0,this.depthFunc=_i,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ya,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=$n,this.stencilZFail=$n,this.stencilZPass=$n,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==fi&&(n.blending=this.blending),this.side!==wn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Pr&&(n.blendSrc=this.blendSrc),this.blendDst!==Lr&&(n.blendDst=this.blendDst),this.blendEquation!==Bn&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==_i&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Ya&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==$n&&(n.stencilFail=this.stencilFail),this.stencilZFail!==$n&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==$n&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const o in r){const c=r[o];delete c.metadata,a.push(c)}return a}if(e){const r=s(t.textures),a=s(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Le extends Yn{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new zt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new He,this.combine=al,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const he=new R,is=new Yt;class Ze{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Ka,this.updateRanges=[],this.gpuType=hn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)is.fromBufferAttribute(this,e),is.applyMatrix3(t),this.setXY(e,is.x,is.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)he.fromBufferAttribute(this,e),he.applyMatrix3(t),this.setXYZ(e,he.x,he.y,he.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)he.fromBufferAttribute(this,e),he.applyMatrix4(t),this.setXYZ(e,he.x,he.y,he.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)he.fromBufferAttribute(this,e),he.applyNormalMatrix(t),this.setXYZ(e,he.x,he.y,he.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)he.fromBufferAttribute(this,e),he.transformDirection(t),this.setXYZ(e,he.x,he.y,he.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=di(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Ee(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=di(e,this.array)),e}setX(t,e){return this.normalized&&(e=Ee(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=di(e,this.array)),e}setY(t,e){return this.normalized&&(e=Ee(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=di(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Ee(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=di(e,this.array)),e}setW(t,e){return this.normalized&&(e=Ee(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Ee(e,this.array),n=Ee(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=Ee(e,this.array),n=Ee(n,this.array),s=Ee(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=Ee(e,this.array),n=Ee(n,this.array),s=Ee(s,this.array),r=Ee(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Ka&&(t.usage=this.usage),t}}class wl extends Ze{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class bl extends Ze{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class ue extends Ze{constructor(t,e,n){super(new Float32Array(t),e,n)}}let fh=0;const Be=new ie,fr=new de,ri=new R,Ne=new qn,Pi=new qn,me=new R;class Re extends Xn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:fh++}),this.uuid=Ti(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(yl(t)?bl:wl)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Ft().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Be.makeRotationFromQuaternion(t),this.applyMatrix4(Be),this}rotateX(t){return Be.makeRotationX(t),this.applyMatrix4(Be),this}rotateY(t){return Be.makeRotationY(t),this.applyMatrix4(Be),this}rotateZ(t){return Be.makeRotationZ(t),this.applyMatrix4(Be),this}translate(t,e,n){return Be.makeTranslation(t,e,n),this.applyMatrix4(Be),this}scale(t,e,n){return Be.makeScale(t,e,n),this.applyMatrix4(Be),this}lookAt(t){return fr.lookAt(t),fr.updateMatrix(),this.applyMatrix4(fr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ri).negate(),this.translate(ri.x,ri.y,ri.z),this}setFromPoints(t){const e=[];for(let n=0,s=t.length;n<s;n++){const r=t[n];e.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new ue(e,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new qn);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new R(-1/0,-1/0,-1/0),new R(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const r=e[n];Ne.setFromBufferAttribute(r),this.morphTargetsRelative?(me.addVectors(this.boundingBox.min,Ne.min),this.boundingBox.expandByPoint(me),me.addVectors(this.boundingBox.max,Ne.max),this.boundingBox.expandByPoint(me)):(this.boundingBox.expandByPoint(Ne.min),this.boundingBox.expandByPoint(Ne.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Gi);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new R,1/0);return}if(t){const n=this.boundingSphere.center;if(Ne.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){const o=e[r];Pi.setFromBufferAttribute(o),this.morphTargetsRelative?(me.addVectors(Ne.min,Pi.min),Ne.expandByPoint(me),me.addVectors(Ne.max,Pi.max),Ne.expandByPoint(me)):(Ne.expandByPoint(Pi.min),Ne.expandByPoint(Pi.max))}Ne.getCenter(n);let s=0;for(let r=0,a=t.count;r<a;r++)me.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(me));if(e)for(let r=0,a=e.length;r<a;r++){const o=e[r],c=this.morphTargetsRelative;for(let l=0,d=o.count;l<d;l++)me.fromBufferAttribute(o,l),c&&(ri.fromBufferAttribute(t,l),me.add(ri)),s=Math.max(s,n.distanceToSquared(me))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ze(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],c=[];for(let I=0;I<n.count;I++)o[I]=new R,c[I]=new R;const l=new R,d=new R,u=new R,p=new Yt,m=new Yt,g=new Yt,_=new R,f=new R;function h(I,q,x){l.fromBufferAttribute(n,I),d.fromBufferAttribute(n,q),u.fromBufferAttribute(n,x),p.fromBufferAttribute(r,I),m.fromBufferAttribute(r,q),g.fromBufferAttribute(r,x),d.sub(l),u.sub(l),m.sub(p),g.sub(p);const S=1/(m.x*g.y-g.x*m.y);isFinite(S)&&(_.copy(d).multiplyScalar(g.y).addScaledVector(u,-m.y).multiplyScalar(S),f.copy(u).multiplyScalar(m.x).addScaledVector(d,-g.x).multiplyScalar(S),o[I].add(_),o[q].add(_),o[x].add(_),c[I].add(f),c[q].add(f),c[x].add(f))}let E=this.groups;E.length===0&&(E=[{start:0,count:t.count}]);for(let I=0,q=E.length;I<q;++I){const x=E[I],S=x.start,B=x.count;for(let z=S,X=S+B;z<X;z+=3)h(t.getX(z+0),t.getX(z+1),t.getX(z+2))}const M=new R,T=new R,P=new R,A=new R;function b(I){P.fromBufferAttribute(s,I),A.copy(P);const q=o[I];M.copy(q),M.sub(P.multiplyScalar(P.dot(q))).normalize(),T.crossVectors(A,q);const S=T.dot(c[I])<0?-1:1;a.setXYZW(I,M.x,M.y,M.z,S)}for(let I=0,q=E.length;I<q;++I){const x=E[I],S=x.start,B=x.count;for(let z=S,X=S+B;z<X;z+=3)b(t.getX(z+0)),b(t.getX(z+1)),b(t.getX(z+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Ze(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let p=0,m=n.count;p<m;p++)n.setXYZ(p,0,0,0);const s=new R,r=new R,a=new R,o=new R,c=new R,l=new R,d=new R,u=new R;if(t)for(let p=0,m=t.count;p<m;p+=3){const g=t.getX(p+0),_=t.getX(p+1),f=t.getX(p+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,_),a.fromBufferAttribute(e,f),d.subVectors(a,r),u.subVectors(s,r),d.cross(u),o.fromBufferAttribute(n,g),c.fromBufferAttribute(n,_),l.fromBufferAttribute(n,f),o.add(d),c.add(d),l.add(d),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(f,l.x,l.y,l.z)}else for(let p=0,m=e.count;p<m;p+=3)s.fromBufferAttribute(e,p+0),r.fromBufferAttribute(e,p+1),a.fromBufferAttribute(e,p+2),d.subVectors(a,r),u.subVectors(s,r),d.cross(u),n.setXYZ(p+0,d.x,d.y,d.z),n.setXYZ(p+1,d.x,d.y,d.z),n.setXYZ(p+2,d.x,d.y,d.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)me.fromBufferAttribute(t,e),me.normalize(),t.setXYZ(e,me.x,me.y,me.z)}toNonIndexed(){function t(o,c){const l=o.array,d=o.itemSize,u=o.normalized,p=new l.constructor(c.length*d);let m=0,g=0;for(let _=0,f=c.length;_<f;_++){o.isInterleavedBufferAttribute?m=c[_]*o.data.stride+o.offset:m=c[_]*d;for(let h=0;h<d;h++)p[g++]=l[m++]}return new Ze(p,d,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Re,n=this.index.array,s=this.attributes;for(const o in s){const c=s[o],l=t(c,n);e.setAttribute(o,l)}const r=this.morphAttributes;for(const o in r){const c=[],l=r[o];for(let d=0,u=l.length;d<u;d++){const p=l[d],m=t(p,n);c.push(m)}e.morphAttributes[o]=c}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const c in n){const l=n[c];t.data.attributes[c]=l.toJSON(t.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],d=[];for(let u=0,p=l.length;u<p;u++){const m=l[u];d.push(m.toJSON(t.data))}d.length>0&&(s[c]=d,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const s=t.attributes;for(const l in s){const d=s[l];this.setAttribute(l,d.clone(e))}const r=t.morphAttributes;for(const l in r){const d=[],u=r[l];for(let p=0,m=u.length;p<m;p++)d.push(u[p].clone(e));this.morphAttributes[l]=d}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let l=0,d=a.length;l<d;l++){const u=a[l];this.addGroup(u.start,u.count,u.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const co=new ie,Dn=new Hi,ss=new Gi,ho=new R,rs=new R,as=new R,os=new R,pr=new R,ls=new R,uo=new R,cs=new R;class $ extends de{constructor(t=new Re,e=new Le){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const o=this.morphTargetInfluences;if(r&&o){ls.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const d=o[c],u=r[c];d!==0&&(pr.fromBufferAttribute(u,t),a?ls.addScaledVector(pr,d):ls.addScaledVector(pr.sub(e),d))}e.add(ls)}return e}raycast(t,e){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),ss.copy(n.boundingSphere),ss.applyMatrix4(r),Dn.copy(t.ray).recast(t.near),!(ss.containsPoint(Dn.origin)===!1&&(Dn.intersectSphere(ss,ho)===null||Dn.origin.distanceToSquared(ho)>(t.far-t.near)**2))&&(co.copy(r).invert(),Dn.copy(t.ray).applyMatrix4(co),!(n.boundingBox!==null&&Dn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Dn)))}_computeIntersections(t,e,n){let s;const r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,d=r.attributes.uv1,u=r.attributes.normal,p=r.groups,m=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,_=p.length;g<_;g++){const f=p[g],h=a[f.materialIndex],E=Math.max(f.start,m.start),M=Math.min(o.count,Math.min(f.start+f.count,m.start+m.count));for(let T=E,P=M;T<P;T+=3){const A=o.getX(T),b=o.getX(T+1),I=o.getX(T+2);s=hs(this,h,t,n,l,d,u,A,b,I),s&&(s.faceIndex=Math.floor(T/3),s.face.materialIndex=f.materialIndex,e.push(s))}}else{const g=Math.max(0,m.start),_=Math.min(o.count,m.start+m.count);for(let f=g,h=_;f<h;f+=3){const E=o.getX(f),M=o.getX(f+1),T=o.getX(f+2);s=hs(this,a,t,n,l,d,u,E,M,T),s&&(s.faceIndex=Math.floor(f/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(a))for(let g=0,_=p.length;g<_;g++){const f=p[g],h=a[f.materialIndex],E=Math.max(f.start,m.start),M=Math.min(c.count,Math.min(f.start+f.count,m.start+m.count));for(let T=E,P=M;T<P;T+=3){const A=T,b=T+1,I=T+2;s=hs(this,h,t,n,l,d,u,A,b,I),s&&(s.faceIndex=Math.floor(T/3),s.face.materialIndex=f.materialIndex,e.push(s))}}else{const g=Math.max(0,m.start),_=Math.min(c.count,m.start+m.count);for(let f=g,h=_;f<h;f+=3){const E=f,M=f+1,T=f+2;s=hs(this,a,t,n,l,d,u,E,M,T),s&&(s.faceIndex=Math.floor(f/3),e.push(s))}}}}function ph(i,t,e,n,s,r,a,o){let c;if(t.side===be?c=n.intersectTriangle(a,r,s,!0,o):c=n.intersectTriangle(s,r,a,t.side===wn,o),c===null)return null;cs.copy(o),cs.applyMatrix4(i.matrixWorld);const l=e.ray.origin.distanceTo(cs);return l<e.near||l>e.far?null:{distance:l,point:cs.clone(),object:i}}function hs(i,t,e,n,s,r,a,o,c,l){i.getVertexPosition(o,rs),i.getVertexPosition(c,as),i.getVertexPosition(l,os);const d=ph(i,t,e,n,rs,as,os,uo);if(d){const u=new R;ke.getBarycoord(uo,rs,as,os,u),s&&(d.uv=ke.getInterpolatedAttribute(s,o,c,l,u,new Yt)),r&&(d.uv1=ke.getInterpolatedAttribute(r,o,c,l,u,new Yt)),a&&(d.normal=ke.getInterpolatedAttribute(a,o,c,l,u,new R),d.normal.dot(n.direction)>0&&d.normal.multiplyScalar(-1));const p={a:o,b:c,c:l,normal:new R,materialIndex:0};ke.getNormal(rs,as,os,p.normal),d.face=p,d.barycoord=u}return d}class yt extends Re{constructor(t=1,e=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const c=[],l=[],d=[],u=[];let p=0,m=0;g("z","y","x",-1,-1,n,e,t,a,r,0),g("z","y","x",1,-1,n,e,-t,a,r,1),g("x","z","y",1,1,t,n,e,s,a,2),g("x","z","y",1,-1,t,n,-e,s,a,3),g("x","y","z",1,-1,t,e,n,s,r,4),g("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new ue(l,3)),this.setAttribute("normal",new ue(d,3)),this.setAttribute("uv",new ue(u,2));function g(_,f,h,E,M,T,P,A,b,I,q){const x=T/b,S=P/I,B=T/2,z=P/2,X=A/2,Z=b+1,k=I+1;let tt=0,W=0;const ft=new R;for(let ct=0;ct<k;ct++){const _t=ct*S-z;for(let Wt=0;Wt<Z;Wt++){const Xt=Wt*x-B;ft[_]=Xt*E,ft[f]=_t*M,ft[h]=X,l.push(ft.x,ft.y,ft.z),ft[_]=0,ft[f]=0,ft[h]=A>0?1:-1,d.push(ft.x,ft.y,ft.z),u.push(Wt/b),u.push(1-ct/I),tt+=1}}for(let ct=0;ct<I;ct++)for(let _t=0;_t<b;_t++){const Wt=p+_t+Z*ct,Xt=p+_t+Z*(ct+1),H=p+(_t+1)+Z*(ct+1),nt=p+(_t+1)+Z*ct;c.push(Wt,Xt,nt),c.push(Xt,H,nt),W+=6}o.addGroup(m,W,q),m+=W,p+=tt}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new yt(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Si(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function Te(i){const t={};for(let e=0;e<i.length;e++){const n=Si(i[e]);for(const s in n)t[s]=n[s]}return t}function mh(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function Al(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:jt.workingColorSpace}const gh={clone:Si,merge:Te};var _h=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,xh=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class bn extends Yn{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=_h,this.fragmentShader=xh,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Si(t.uniforms),this.uniformsGroups=mh(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class Rl extends de{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ie,this.projectionMatrix=new ie,this.projectionMatrixInverse=new ie,this.coordinateSystem=dn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Mn=new R,fo=new Yt,po=new Yt;class Fe extends Rl{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Bi*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(mi*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Bi*2*Math.atan(Math.tan(mi*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Mn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Mn.x,Mn.y).multiplyScalar(-t/Mn.z),Mn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Mn.x,Mn.y).multiplyScalar(-t/Mn.z)}getViewSize(t,e){return this.getViewBounds(t,fo,po),e.subVectors(po,fo)}setViewOffset(t,e,n,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(mi*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*s/c,e-=a.offsetY*n/l,s*=a.width/c,n*=a.height/l}const o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const ai=-90,oi=1;class vh extends de{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Fe(ai,oi,t,e);s.layers=this.layers,this.add(s);const r=new Fe(ai,oi,t,e);r.layers=this.layers,this.add(r);const a=new Fe(ai,oi,t,e);a.layers=this.layers,this.add(a);const o=new Fe(ai,oi,t,e);o.layers=this.layers,this.add(o);const c=new Fe(ai,oi,t,e);c.layers=this.layers,this.add(c);const l=new Fe(ai,oi,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,r,a,o,c]=e;for(const l of e)this.remove(l);if(t===dn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===Ns)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,c,l,d]=this.children,u=t.getRenderTarget(),p=t.getActiveCubeFace(),m=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,a),t.setRenderTarget(n,2,s),t.render(e,o),t.setRenderTarget(n,3,s),t.render(e,c),t.setRenderTarget(n,4,s),t.render(e,l),n.texture.generateMipmaps=_,t.setRenderTarget(n,5,s),t.render(e,d),t.setRenderTarget(u,p,m),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Cl extends Ae{constructor(t,e,n,s,r,a,o,c,l,d){t=t!==void 0?t:[],e=e!==void 0?e:xi,super(t,e,n,s,r,a,o,c,l,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Mh extends Wn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new Cl(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:Ke}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new yt(5,5,5),r=new bn({name:"CubemapFromEquirect",uniforms:Si(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:be,blending:En});r.uniforms.tEquirect.value=e;const a=new $(s,r),o=e.minFilter;return e.minFilter===Gn&&(e.minFilter=Ke),new vh(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e,n,s){const r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,s);t.setRenderTarget(r)}}const mr=new R,yh=new R,Sh=new Ft;class Fn{constructor(t=new R(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=mr.subVectors(n,e).cross(yh.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(mr),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||Sh.getNormalMatrix(t),s=this.coplanarPoint(mr).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const In=new Gi,ds=new R;class Ca{constructor(t=new Fn,e=new Fn,n=new Fn,s=new Fn,r=new Fn,a=new Fn){this.planes=[t,e,n,s,r,a]}set(t,e,n,s,r,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=dn){const n=this.planes,s=t.elements,r=s[0],a=s[1],o=s[2],c=s[3],l=s[4],d=s[5],u=s[6],p=s[7],m=s[8],g=s[9],_=s[10],f=s[11],h=s[12],E=s[13],M=s[14],T=s[15];if(n[0].setComponents(c-r,p-l,f-m,T-h).normalize(),n[1].setComponents(c+r,p+l,f+m,T+h).normalize(),n[2].setComponents(c+a,p+d,f+g,T+E).normalize(),n[3].setComponents(c-a,p-d,f-g,T-E).normalize(),n[4].setComponents(c-o,p-u,f-_,T-M).normalize(),e===dn)n[5].setComponents(c+o,p+u,f+_,T+M).normalize();else if(e===Ns)n[5].setComponents(o,u,_,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),In.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),In.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(In)}intersectsSprite(t){return In.center.set(0,0,0),In.radius=.7071067811865476,In.applyMatrix4(t.matrixWorld),this.intersectsSphere(In)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(ds.x=s.normal.x>0?t.max.x:t.min.x,ds.y=s.normal.y>0?t.max.y:t.min.y,ds.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(ds)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Pl(){let i=null,t=!1,e=null,n=null;function s(r,a){e(r,a),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function Eh(i){const t=new WeakMap;function e(o,c){const l=o.array,d=o.usage,u=l.byteLength,p=i.createBuffer();i.bindBuffer(c,p),i.bufferData(c,l,d),o.onUploadCallback();let m;if(l instanceof Float32Array)m=i.FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?m=i.HALF_FLOAT:m=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)m=i.SHORT;else if(l instanceof Uint32Array)m=i.UNSIGNED_INT;else if(l instanceof Int32Array)m=i.INT;else if(l instanceof Int8Array)m=i.BYTE;else if(l instanceof Uint8Array)m=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)m=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:p,type:m,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:u}}function n(o,c,l){const d=c.array,u=c.updateRanges;if(i.bindBuffer(l,o),u.length===0)i.bufferSubData(l,0,d);else{u.sort((m,g)=>m.start-g.start);let p=0;for(let m=1;m<u.length;m++){const g=u[p],_=u[m];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++p,u[p]=_)}u.length=p+1;for(let m=0,g=u.length;m<g;m++){const _=u[m];i.bufferSubData(l,_.start*d.BYTES_PER_ELEMENT,d,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=t.get(o);c&&(i.deleteBuffer(c.buffer),t.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const d=t.get(o);(!d||d.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=t.get(o);if(l===void 0)t.set(o,e(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:s,remove:r,update:a}}class An extends Re{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const r=t/2,a=e/2,o=Math.floor(n),c=Math.floor(s),l=o+1,d=c+1,u=t/o,p=e/c,m=[],g=[],_=[],f=[];for(let h=0;h<d;h++){const E=h*p-a;for(let M=0;M<l;M++){const T=M*u-r;g.push(T,-E,0),_.push(0,0,1),f.push(M/o),f.push(1-h/c)}}for(let h=0;h<c;h++)for(let E=0;E<o;E++){const M=E+l*h,T=E+l*(h+1),P=E+1+l*(h+1),A=E+1+l*h;m.push(M,T,A),m.push(T,P,A)}this.setIndex(m),this.setAttribute("position",new ue(g,3)),this.setAttribute("normal",new ue(_,3)),this.setAttribute("uv",new ue(f,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new An(t.width,t.height,t.widthSegments,t.heightSegments)}}var Th=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,wh=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,bh=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Ah=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Rh=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Ch=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Ph=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Lh=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Dh=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Ih=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Uh=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Nh=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Fh=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Oh=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Bh=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,zh=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,kh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Gh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Hh=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Vh=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Wh=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Xh=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,qh=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Yh=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Kh=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,$h=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Zh=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,jh=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Jh=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Qh=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,td="gl_FragColor = linearToOutputTexel( gl_FragColor );",ed=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,nd=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,id=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,sd=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,rd=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,ad=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,od=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,ld=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,cd=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,hd=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,dd=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,ud=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,fd=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,pd=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,md=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,gd=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,_d=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,xd=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,vd=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Md=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,yd=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Sd=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Ed=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Td=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,wd=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,bd=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Ad=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Rd=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Cd=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Pd=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Ld=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Dd=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Id=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Ud=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Nd=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Fd=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Od=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Bd=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,zd=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,kd=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Gd=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Hd=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Vd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Wd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Xd=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,qd=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Yd=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Kd=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,$d=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Zd=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,jd=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Jd=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Qd=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,tu=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,eu=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,nu=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,iu=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,su=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,ru=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,au=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,ou=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,lu=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,cu=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,hu=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,du=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,uu=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,fu=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,pu=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,mu=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,gu=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,_u=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,xu=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,vu=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Mu=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,yu=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Su=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Eu=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Tu=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,wu=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,bu=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Au=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ru=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Cu=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Pu=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Lu=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Du=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Iu=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Uu=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Nu=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Fu=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Ou=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Bu=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,zu=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ku=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Gu=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Hu=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Vu=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Wu=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Xu=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,qu=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Yu=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Ku=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,$u=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Zu=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ju=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Ju=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Qu=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,tf=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,ef=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,nf=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Nt={alphahash_fragment:Th,alphahash_pars_fragment:wh,alphamap_fragment:bh,alphamap_pars_fragment:Ah,alphatest_fragment:Rh,alphatest_pars_fragment:Ch,aomap_fragment:Ph,aomap_pars_fragment:Lh,batching_pars_vertex:Dh,batching_vertex:Ih,begin_vertex:Uh,beginnormal_vertex:Nh,bsdfs:Fh,iridescence_fragment:Oh,bumpmap_pars_fragment:Bh,clipping_planes_fragment:zh,clipping_planes_pars_fragment:kh,clipping_planes_pars_vertex:Gh,clipping_planes_vertex:Hh,color_fragment:Vh,color_pars_fragment:Wh,color_pars_vertex:Xh,color_vertex:qh,common:Yh,cube_uv_reflection_fragment:Kh,defaultnormal_vertex:$h,displacementmap_pars_vertex:Zh,displacementmap_vertex:jh,emissivemap_fragment:Jh,emissivemap_pars_fragment:Qh,colorspace_fragment:td,colorspace_pars_fragment:ed,envmap_fragment:nd,envmap_common_pars_fragment:id,envmap_pars_fragment:sd,envmap_pars_vertex:rd,envmap_physical_pars_fragment:gd,envmap_vertex:ad,fog_vertex:od,fog_pars_vertex:ld,fog_fragment:cd,fog_pars_fragment:hd,gradientmap_pars_fragment:dd,lightmap_pars_fragment:ud,lights_lambert_fragment:fd,lights_lambert_pars_fragment:pd,lights_pars_begin:md,lights_toon_fragment:_d,lights_toon_pars_fragment:xd,lights_phong_fragment:vd,lights_phong_pars_fragment:Md,lights_physical_fragment:yd,lights_physical_pars_fragment:Sd,lights_fragment_begin:Ed,lights_fragment_maps:Td,lights_fragment_end:wd,logdepthbuf_fragment:bd,logdepthbuf_pars_fragment:Ad,logdepthbuf_pars_vertex:Rd,logdepthbuf_vertex:Cd,map_fragment:Pd,map_pars_fragment:Ld,map_particle_fragment:Dd,map_particle_pars_fragment:Id,metalnessmap_fragment:Ud,metalnessmap_pars_fragment:Nd,morphinstance_vertex:Fd,morphcolor_vertex:Od,morphnormal_vertex:Bd,morphtarget_pars_vertex:zd,morphtarget_vertex:kd,normal_fragment_begin:Gd,normal_fragment_maps:Hd,normal_pars_fragment:Vd,normal_pars_vertex:Wd,normal_vertex:Xd,normalmap_pars_fragment:qd,clearcoat_normal_fragment_begin:Yd,clearcoat_normal_fragment_maps:Kd,clearcoat_pars_fragment:$d,iridescence_pars_fragment:Zd,opaque_fragment:jd,packing:Jd,premultiplied_alpha_fragment:Qd,project_vertex:tu,dithering_fragment:eu,dithering_pars_fragment:nu,roughnessmap_fragment:iu,roughnessmap_pars_fragment:su,shadowmap_pars_fragment:ru,shadowmap_pars_vertex:au,shadowmap_vertex:ou,shadowmask_pars_fragment:lu,skinbase_vertex:cu,skinning_pars_vertex:hu,skinning_vertex:du,skinnormal_vertex:uu,specularmap_fragment:fu,specularmap_pars_fragment:pu,tonemapping_fragment:mu,tonemapping_pars_fragment:gu,transmission_fragment:_u,transmission_pars_fragment:xu,uv_pars_fragment:vu,uv_pars_vertex:Mu,uv_vertex:yu,worldpos_vertex:Su,background_vert:Eu,background_frag:Tu,backgroundCube_vert:wu,backgroundCube_frag:bu,cube_vert:Au,cube_frag:Ru,depth_vert:Cu,depth_frag:Pu,distanceRGBA_vert:Lu,distanceRGBA_frag:Du,equirect_vert:Iu,equirect_frag:Uu,linedashed_vert:Nu,linedashed_frag:Fu,meshbasic_vert:Ou,meshbasic_frag:Bu,meshlambert_vert:zu,meshlambert_frag:ku,meshmatcap_vert:Gu,meshmatcap_frag:Hu,meshnormal_vert:Vu,meshnormal_frag:Wu,meshphong_vert:Xu,meshphong_frag:qu,meshphysical_vert:Yu,meshphysical_frag:Ku,meshtoon_vert:$u,meshtoon_frag:Zu,points_vert:ju,points_frag:Ju,shadow_vert:Qu,shadow_frag:tf,sprite_vert:ef,sprite_frag:nf},rt={common:{diffuse:{value:new zt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ft},alphaMap:{value:null},alphaMapTransform:{value:new Ft},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ft}},envmap:{envMap:{value:null},envMapRotation:{value:new Ft},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ft}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ft}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ft},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ft},normalScale:{value:new Yt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ft},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ft}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ft}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ft}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new zt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new zt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ft},alphaTest:{value:0},uvTransform:{value:new Ft}},sprite:{diffuse:{value:new zt(16777215)},opacity:{value:1},center:{value:new Yt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ft},alphaMap:{value:null},alphaMapTransform:{value:new Ft},alphaTest:{value:0}}},Qe={basic:{uniforms:Te([rt.common,rt.specularmap,rt.envmap,rt.aomap,rt.lightmap,rt.fog]),vertexShader:Nt.meshbasic_vert,fragmentShader:Nt.meshbasic_frag},lambert:{uniforms:Te([rt.common,rt.specularmap,rt.envmap,rt.aomap,rt.lightmap,rt.emissivemap,rt.bumpmap,rt.normalmap,rt.displacementmap,rt.fog,rt.lights,{emissive:{value:new zt(0)}}]),vertexShader:Nt.meshlambert_vert,fragmentShader:Nt.meshlambert_frag},phong:{uniforms:Te([rt.common,rt.specularmap,rt.envmap,rt.aomap,rt.lightmap,rt.emissivemap,rt.bumpmap,rt.normalmap,rt.displacementmap,rt.fog,rt.lights,{emissive:{value:new zt(0)},specular:{value:new zt(1118481)},shininess:{value:30}}]),vertexShader:Nt.meshphong_vert,fragmentShader:Nt.meshphong_frag},standard:{uniforms:Te([rt.common,rt.envmap,rt.aomap,rt.lightmap,rt.emissivemap,rt.bumpmap,rt.normalmap,rt.displacementmap,rt.roughnessmap,rt.metalnessmap,rt.fog,rt.lights,{emissive:{value:new zt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Nt.meshphysical_vert,fragmentShader:Nt.meshphysical_frag},toon:{uniforms:Te([rt.common,rt.aomap,rt.lightmap,rt.emissivemap,rt.bumpmap,rt.normalmap,rt.displacementmap,rt.gradientmap,rt.fog,rt.lights,{emissive:{value:new zt(0)}}]),vertexShader:Nt.meshtoon_vert,fragmentShader:Nt.meshtoon_frag},matcap:{uniforms:Te([rt.common,rt.bumpmap,rt.normalmap,rt.displacementmap,rt.fog,{matcap:{value:null}}]),vertexShader:Nt.meshmatcap_vert,fragmentShader:Nt.meshmatcap_frag},points:{uniforms:Te([rt.points,rt.fog]),vertexShader:Nt.points_vert,fragmentShader:Nt.points_frag},dashed:{uniforms:Te([rt.common,rt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Nt.linedashed_vert,fragmentShader:Nt.linedashed_frag},depth:{uniforms:Te([rt.common,rt.displacementmap]),vertexShader:Nt.depth_vert,fragmentShader:Nt.depth_frag},normal:{uniforms:Te([rt.common,rt.bumpmap,rt.normalmap,rt.displacementmap,{opacity:{value:1}}]),vertexShader:Nt.meshnormal_vert,fragmentShader:Nt.meshnormal_frag},sprite:{uniforms:Te([rt.sprite,rt.fog]),vertexShader:Nt.sprite_vert,fragmentShader:Nt.sprite_frag},background:{uniforms:{uvTransform:{value:new Ft},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Nt.background_vert,fragmentShader:Nt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ft}},vertexShader:Nt.backgroundCube_vert,fragmentShader:Nt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Nt.cube_vert,fragmentShader:Nt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Nt.equirect_vert,fragmentShader:Nt.equirect_frag},distanceRGBA:{uniforms:Te([rt.common,rt.displacementmap,{referencePosition:{value:new R},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Nt.distanceRGBA_vert,fragmentShader:Nt.distanceRGBA_frag},shadow:{uniforms:Te([rt.lights,rt.fog,{color:{value:new zt(0)},opacity:{value:1}}]),vertexShader:Nt.shadow_vert,fragmentShader:Nt.shadow_frag}};Qe.physical={uniforms:Te([Qe.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ft},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ft},clearcoatNormalScale:{value:new Yt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ft},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ft},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ft},sheen:{value:0},sheenColor:{value:new zt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ft},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ft},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ft},transmissionSamplerSize:{value:new Yt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ft},attenuationDistance:{value:0},attenuationColor:{value:new zt(0)},specularColor:{value:new zt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ft},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ft},anisotropyVector:{value:new Yt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ft}}]),vertexShader:Nt.meshphysical_vert,fragmentShader:Nt.meshphysical_frag};const us={r:0,b:0,g:0},Un=new He,sf=new ie;function rf(i,t,e,n,s,r,a){const o=new zt(0);let c=r===!0?0:1,l,d,u=null,p=0,m=null;function g(E){let M=E.isScene===!0?E.background:null;return M&&M.isTexture&&(M=(E.backgroundBlurriness>0?e:t).get(M)),M}function _(E){let M=!1;const T=g(E);T===null?h(o,c):T&&T.isColor&&(h(T,1),M=!0);const P=i.xr.getEnvironmentBlendMode();P==="additive"?n.buffers.color.setClear(0,0,0,1,a):P==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||M)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function f(E,M){const T=g(M);T&&(T.isCubeTexture||T.mapping===ks)?(d===void 0&&(d=new $(new yt(1,1,1),new bn({name:"BackgroundCubeMaterial",uniforms:Si(Qe.backgroundCube.uniforms),vertexShader:Qe.backgroundCube.vertexShader,fragmentShader:Qe.backgroundCube.fragmentShader,side:be,depthTest:!1,depthWrite:!1,fog:!1})),d.geometry.deleteAttribute("normal"),d.geometry.deleteAttribute("uv"),d.onBeforeRender=function(P,A,b){this.matrixWorld.copyPosition(b.matrixWorld)},Object.defineProperty(d.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(d)),Un.copy(M.backgroundRotation),Un.x*=-1,Un.y*=-1,Un.z*=-1,T.isCubeTexture&&T.isRenderTargetTexture===!1&&(Un.y*=-1,Un.z*=-1),d.material.uniforms.envMap.value=T,d.material.uniforms.flipEnvMap.value=T.isCubeTexture&&T.isRenderTargetTexture===!1?-1:1,d.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,d.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,d.material.uniforms.backgroundRotation.value.setFromMatrix4(sf.makeRotationFromEuler(Un)),d.material.toneMapped=jt.getTransfer(T.colorSpace)!==re,(u!==T||p!==T.version||m!==i.toneMapping)&&(d.material.needsUpdate=!0,u=T,p=T.version,m=i.toneMapping),d.layers.enableAll(),E.unshift(d,d.geometry,d.material,0,0,null)):T&&T.isTexture&&(l===void 0&&(l=new $(new An(2,2),new bn({name:"BackgroundMaterial",uniforms:Si(Qe.background.uniforms),vertexShader:Qe.background.vertexShader,fragmentShader:Qe.background.fragmentShader,side:wn,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=T,l.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,l.material.toneMapped=jt.getTransfer(T.colorSpace)!==re,T.matrixAutoUpdate===!0&&T.updateMatrix(),l.material.uniforms.uvTransform.value.copy(T.matrix),(u!==T||p!==T.version||m!==i.toneMapping)&&(l.material.needsUpdate=!0,u=T,p=T.version,m=i.toneMapping),l.layers.enableAll(),E.unshift(l,l.geometry,l.material,0,0,null))}function h(E,M){E.getRGB(us,Al(i)),n.buffers.color.setClear(us.r,us.g,us.b,M,a)}return{getClearColor:function(){return o},setClearColor:function(E,M=1){o.set(E),c=M,h(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(E){c=E,h(o,c)},render:_,addToRenderList:f}}function af(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=p(null);let r=s,a=!1;function o(x,S,B,z,X){let Z=!1;const k=u(z,B,S);r!==k&&(r=k,l(r.object)),Z=m(x,z,B,X),Z&&g(x,z,B,X),X!==null&&t.update(X,i.ELEMENT_ARRAY_BUFFER),(Z||a)&&(a=!1,T(x,S,B,z),X!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(X).buffer))}function c(){return i.createVertexArray()}function l(x){return i.bindVertexArray(x)}function d(x){return i.deleteVertexArray(x)}function u(x,S,B){const z=B.wireframe===!0;let X=n[x.id];X===void 0&&(X={},n[x.id]=X);let Z=X[S.id];Z===void 0&&(Z={},X[S.id]=Z);let k=Z[z];return k===void 0&&(k=p(c()),Z[z]=k),k}function p(x){const S=[],B=[],z=[];for(let X=0;X<e;X++)S[X]=0,B[X]=0,z[X]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:S,enabledAttributes:B,attributeDivisors:z,object:x,attributes:{},index:null}}function m(x,S,B,z){const X=r.attributes,Z=S.attributes;let k=0;const tt=B.getAttributes();for(const W in tt)if(tt[W].location>=0){const ct=X[W];let _t=Z[W];if(_t===void 0&&(W==="instanceMatrix"&&x.instanceMatrix&&(_t=x.instanceMatrix),W==="instanceColor"&&x.instanceColor&&(_t=x.instanceColor)),ct===void 0||ct.attribute!==_t||_t&&ct.data!==_t.data)return!0;k++}return r.attributesNum!==k||r.index!==z}function g(x,S,B,z){const X={},Z=S.attributes;let k=0;const tt=B.getAttributes();for(const W in tt)if(tt[W].location>=0){let ct=Z[W];ct===void 0&&(W==="instanceMatrix"&&x.instanceMatrix&&(ct=x.instanceMatrix),W==="instanceColor"&&x.instanceColor&&(ct=x.instanceColor));const _t={};_t.attribute=ct,ct&&ct.data&&(_t.data=ct.data),X[W]=_t,k++}r.attributes=X,r.attributesNum=k,r.index=z}function _(){const x=r.newAttributes;for(let S=0,B=x.length;S<B;S++)x[S]=0}function f(x){h(x,0)}function h(x,S){const B=r.newAttributes,z=r.enabledAttributes,X=r.attributeDivisors;B[x]=1,z[x]===0&&(i.enableVertexAttribArray(x),z[x]=1),X[x]!==S&&(i.vertexAttribDivisor(x,S),X[x]=S)}function E(){const x=r.newAttributes,S=r.enabledAttributes;for(let B=0,z=S.length;B<z;B++)S[B]!==x[B]&&(i.disableVertexAttribArray(B),S[B]=0)}function M(x,S,B,z,X,Z,k){k===!0?i.vertexAttribIPointer(x,S,B,X,Z):i.vertexAttribPointer(x,S,B,z,X,Z)}function T(x,S,B,z){_();const X=z.attributes,Z=B.getAttributes(),k=S.defaultAttributeValues;for(const tt in Z){const W=Z[tt];if(W.location>=0){let ft=X[tt];if(ft===void 0&&(tt==="instanceMatrix"&&x.instanceMatrix&&(ft=x.instanceMatrix),tt==="instanceColor"&&x.instanceColor&&(ft=x.instanceColor)),ft!==void 0){const ct=ft.normalized,_t=ft.itemSize,Wt=t.get(ft);if(Wt===void 0)continue;const Xt=Wt.buffer,H=Wt.type,nt=Wt.bytesPerElement,pt=H===i.INT||H===i.UNSIGNED_INT||ft.gpuType===Ma;if(ft.isInterleavedBufferAttribute){const ht=ft.data,wt=ht.stride,St=ft.offset;if(ht.isInstancedInterleavedBuffer){for(let It=0;It<W.locationSize;It++)h(W.location+It,ht.meshPerAttribute);x.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=ht.meshPerAttribute*ht.count)}else for(let It=0;It<W.locationSize;It++)f(W.location+It);i.bindBuffer(i.ARRAY_BUFFER,Xt);for(let It=0;It<W.locationSize;It++)M(W.location+It,_t/W.locationSize,H,ct,wt*nt,(St+_t/W.locationSize*It)*nt,pt)}else{if(ft.isInstancedBufferAttribute){for(let ht=0;ht<W.locationSize;ht++)h(W.location+ht,ft.meshPerAttribute);x.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=ft.meshPerAttribute*ft.count)}else for(let ht=0;ht<W.locationSize;ht++)f(W.location+ht);i.bindBuffer(i.ARRAY_BUFFER,Xt);for(let ht=0;ht<W.locationSize;ht++)M(W.location+ht,_t/W.locationSize,H,ct,_t*nt,_t/W.locationSize*ht*nt,pt)}}else if(k!==void 0){const ct=k[tt];if(ct!==void 0)switch(ct.length){case 2:i.vertexAttrib2fv(W.location,ct);break;case 3:i.vertexAttrib3fv(W.location,ct);break;case 4:i.vertexAttrib4fv(W.location,ct);break;default:i.vertexAttrib1fv(W.location,ct)}}}}E()}function P(){I();for(const x in n){const S=n[x];for(const B in S){const z=S[B];for(const X in z)d(z[X].object),delete z[X];delete S[B]}delete n[x]}}function A(x){if(n[x.id]===void 0)return;const S=n[x.id];for(const B in S){const z=S[B];for(const X in z)d(z[X].object),delete z[X];delete S[B]}delete n[x.id]}function b(x){for(const S in n){const B=n[S];if(B[x.id]===void 0)continue;const z=B[x.id];for(const X in z)d(z[X].object),delete z[X];delete B[x.id]}}function I(){q(),a=!0,r!==s&&(r=s,l(r.object))}function q(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:I,resetDefaultState:q,dispose:P,releaseStatesOfGeometry:A,releaseStatesOfProgram:b,initAttributes:_,enableAttribute:f,disableUnusedAttributes:E}}function of(i,t,e){let n;function s(l){n=l}function r(l,d){i.drawArrays(n,l,d),e.update(d,n,1)}function a(l,d,u){u!==0&&(i.drawArraysInstanced(n,l,d,u),e.update(d,n,u))}function o(l,d,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,d,0,u);let m=0;for(let g=0;g<u;g++)m+=d[g];e.update(m,n,1)}function c(l,d,u,p){if(u===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let g=0;g<l.length;g++)a(l[g],d[g],p[g]);else{m.multiDrawArraysInstancedWEBGL(n,l,0,d,0,p,0,u);let g=0;for(let _=0;_<u;_++)g+=d[_];for(let _=0;_<p.length;_++)e.update(g,n,p[_])}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=c}function lf(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const b=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(b.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(b){return!(b!==$e&&n.convert(b)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(b){const I=b===zi&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(b!==fn&&n.convert(b)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&b!==hn&&!I)}function c(b){if(b==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";b="mediump"}return b==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const d=c(l);d!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",d,"instead."),l=d);const u=e.logarithmicDepthBuffer===!0,p=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control");if(p===!0){const b=t.get("EXT_clip_control");b.clipControlEXT(b.LOWER_LEFT_EXT,b.ZERO_TO_ONE_EXT)}const m=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),f=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),h=i.getParameter(i.MAX_VERTEX_ATTRIBS),E=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),M=i.getParameter(i.MAX_VARYING_VECTORS),T=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),P=g>0,A=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:u,reverseDepthBuffer:p,maxTextures:m,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:f,maxAttributes:h,maxVertexUniforms:E,maxVaryings:M,maxFragmentUniforms:T,vertexTextures:P,maxSamples:A}}function cf(i){const t=this;let e=null,n=0,s=!1,r=!1;const a=new Fn,o=new Ft,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,p){const m=u.length!==0||p||n!==0||s;return s=p,n=u.length,m},this.beginShadows=function(){r=!0,d(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,p){e=d(u,p,0)},this.setState=function(u,p,m){const g=u.clippingPlanes,_=u.clipIntersection,f=u.clipShadows,h=i.get(u);if(!s||g===null||g.length===0||r&&!f)r?d(null):l();else{const E=r?0:n,M=E*4;let T=h.clippingState||null;c.value=T,T=d(g,p,M,m);for(let P=0;P!==M;++P)T[P]=e[P];h.clippingState=T,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=E}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function d(u,p,m,g){const _=u!==null?u.length:0;let f=null;if(_!==0){if(f=c.value,g!==!0||f===null){const h=m+_*4,E=p.matrixWorldInverse;o.getNormalMatrix(E),(f===null||f.length<h)&&(f=new Float32Array(h));for(let M=0,T=m;M!==_;++M,T+=4)a.copy(u[M]).applyMatrix4(E,o),a.normal.toArray(f,T),f[T+3]=a.constant}c.value=f,c.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,f}}function hf(i){let t=new WeakMap;function e(a,o){return o===zr?a.mapping=xi:o===kr&&(a.mapping=vi),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===zr||o===kr)if(t.has(a)){const c=t.get(a).texture;return e(c,a.mapping)}else{const c=a.image;if(c&&c.height>0){const l=new Mh(c.height);return l.fromEquirectangularTexture(i,a),t.set(a,l),a.addEventListener("dispose",s),e(l.texture,a.mapping)}else return null}}return a}function s(a){const o=a.target;o.removeEventListener("dispose",s);const c=t.get(o);c!==void 0&&(t.delete(o),c.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}class Ll extends Rl{constructor(t=-1,e=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-t,a=n+t,o=s+e,c=s-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=d*this.view.offsetY,c=o-d*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const ui=4,mo=[.125,.215,.35,.446,.526,.582],zn=20,gr=new Ll,go=new zt;let _r=null,xr=0,vr=0,Mr=!1;const On=(1+Math.sqrt(5))/2,li=1/On,_o=[new R(-On,li,0),new R(On,li,0),new R(-li,0,On),new R(li,0,On),new R(0,On,-li),new R(0,On,li),new R(-1,1,-1),new R(1,1,-1),new R(-1,1,1),new R(1,1,1)];class xo{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100){_r=this._renderer.getRenderTarget(),xr=this._renderer.getActiveCubeFace(),vr=this._renderer.getActiveMipmapLevel(),Mr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=yo(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Mo(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(_r,xr,vr),this._renderer.xr.enabled=Mr,t.scissorTest=!1,fs(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===xi||t.mapping===vi?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),_r=this._renderer.getRenderTarget(),xr=this._renderer.getActiveCubeFace(),vr=this._renderer.getActiveMipmapLevel(),Mr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Ke,minFilter:Ke,generateMipmaps:!1,type:zi,format:$e,colorSpace:Rn,depthBuffer:!1},s=vo(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=vo(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=df(r)),this._blurMaterial=uf(r,t,e)}return s}_compileMaterial(t){const e=new $(this._lodPlanes[0],t);this._renderer.compile(e,gr)}_sceneToCubeUV(t,e,n,s){const o=new Fe(90,1,e,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],d=this._renderer,u=d.autoClear,p=d.toneMapping;d.getClearColor(go),d.toneMapping=Tn,d.autoClear=!1;const m=new Le({name:"PMREM.Background",side:be,depthWrite:!1,depthTest:!1}),g=new $(new yt,m);let _=!1;const f=t.background;f?f.isColor&&(m.color.copy(f),t.background=null,_=!0):(m.color.copy(go),_=!0);for(let h=0;h<6;h++){const E=h%3;E===0?(o.up.set(0,c[h],0),o.lookAt(l[h],0,0)):E===1?(o.up.set(0,0,c[h]),o.lookAt(0,l[h],0)):(o.up.set(0,c[h],0),o.lookAt(0,0,l[h]));const M=this._cubeSize;fs(s,E*M,h>2?M:0,M,M),d.setRenderTarget(s),_&&d.render(g,o),d.render(t,o)}g.geometry.dispose(),g.material.dispose(),d.toneMapping=p,d.autoClear=u,t.background=f}_textureToCubeUV(t,e){const n=this._renderer,s=t.mapping===xi||t.mapping===vi;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=yo()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Mo());const r=s?this._cubemapMaterial:this._equirectMaterial,a=new $(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=t;const c=this._cubeSize;fs(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(a,gr)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=_o[(s-r-1)%_o.length];this._blur(t,r-1,r,a,o)}e.autoClear=n}_blur(t,e,n,s,r){const a=this._pingPongRenderTarget;this._halfBlur(t,a,e,n,s,"latitudinal",r),this._halfBlur(a,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,a,o){const c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const d=3,u=new $(this._lodPlanes[s],l),p=l.uniforms,m=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*m):2*Math.PI/(2*zn-1),_=r/g,f=isFinite(r)?1+Math.floor(d*_):zn;f>zn&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${f} samples when the maximum is set to ${zn}`);const h=[];let E=0;for(let b=0;b<zn;++b){const I=b/_,q=Math.exp(-I*I/2);h.push(q),b===0?E+=q:b<f&&(E+=2*q)}for(let b=0;b<h.length;b++)h[b]=h[b]/E;p.envMap.value=t.texture,p.samples.value=f,p.weights.value=h,p.latitudinal.value=a==="latitudinal",o&&(p.poleAxis.value=o);const{_lodMax:M}=this;p.dTheta.value=g,p.mipInt.value=M-n;const T=this._sizeLods[s],P=3*T*(s>M-ui?s-M+ui:0),A=4*(this._cubeSize-T);fs(e,P,A,3*T,2*T),c.setRenderTarget(e),c.render(u,gr)}}function df(i){const t=[],e=[],n=[];let s=i;const r=i-ui+1+mo.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);e.push(o);let c=1/o;a>i-ui?c=mo[a-i+ui-1]:a===0&&(c=0),n.push(c);const l=1/(o-2),d=-l,u=1+l,p=[d,d,u,d,u,u,d,d,u,u,d,u],m=6,g=6,_=3,f=2,h=1,E=new Float32Array(_*g*m),M=new Float32Array(f*g*m),T=new Float32Array(h*g*m);for(let A=0;A<m;A++){const b=A%3*2/3-1,I=A>2?0:-1,q=[b,I,0,b+2/3,I,0,b+2/3,I+1,0,b,I,0,b+2/3,I+1,0,b,I+1,0];E.set(q,_*g*A),M.set(p,f*g*A);const x=[A,A,A,A,A,A];T.set(x,h*g*A)}const P=new Re;P.setAttribute("position",new Ze(E,_)),P.setAttribute("uv",new Ze(M,f)),P.setAttribute("faceIndex",new Ze(T,h)),t.push(P),s>ui&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function vo(i,t,e){const n=new Wn(i,t,e);return n.texture.mapping=ks,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function fs(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function uf(i,t,e){const n=new Float32Array(zn),s=new R(0,1,0);return new bn({name:"SphericalGaussianBlur",defines:{n:zn,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Pa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:En,depthTest:!1,depthWrite:!1})}function Mo(){return new bn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Pa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:En,depthTest:!1,depthWrite:!1})}function yo(){return new bn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Pa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:En,depthTest:!1,depthWrite:!1})}function Pa(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function ff(i){let t=new WeakMap,e=null;function n(o){if(o&&o.isTexture){const c=o.mapping,l=c===zr||c===kr,d=c===xi||c===vi;if(l||d){let u=t.get(o);const p=u!==void 0?u.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==p)return e===null&&(e=new xo(i)),u=l?e.fromEquirectangular(o,u):e.fromCubemap(o,u),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),u.texture;if(u!==void 0)return u.texture;{const m=o.image;return l&&m&&m.height>0||d&&m&&s(m)?(e===null&&(e=new xo(i)),u=l?e.fromEquirectangular(o):e.fromCubemap(o),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),o.addEventListener("dispose",r),u.texture):null}}}return o}function s(o){let c=0;const l=6;for(let d=0;d<l;d++)o[d]!==void 0&&c++;return c===l}function r(o){const c=o.target;c.removeEventListener("dispose",r);const l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:a}}function pf(i){const t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&As("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function mf(i,t,e,n){const s={},r=new WeakMap;function a(u){const p=u.target;p.index!==null&&t.remove(p.index);for(const g in p.attributes)t.remove(p.attributes[g]);for(const g in p.morphAttributes){const _=p.morphAttributes[g];for(let f=0,h=_.length;f<h;f++)t.remove(_[f])}p.removeEventListener("dispose",a),delete s[p.id];const m=r.get(p);m&&(t.remove(m),r.delete(p)),n.releaseStatesOfGeometry(p),p.isInstancedBufferGeometry===!0&&delete p._maxInstanceCount,e.memory.geometries--}function o(u,p){return s[p.id]===!0||(p.addEventListener("dispose",a),s[p.id]=!0,e.memory.geometries++),p}function c(u){const p=u.attributes;for(const g in p)t.update(p[g],i.ARRAY_BUFFER);const m=u.morphAttributes;for(const g in m){const _=m[g];for(let f=0,h=_.length;f<h;f++)t.update(_[f],i.ARRAY_BUFFER)}}function l(u){const p=[],m=u.index,g=u.attributes.position;let _=0;if(m!==null){const E=m.array;_=m.version;for(let M=0,T=E.length;M<T;M+=3){const P=E[M+0],A=E[M+1],b=E[M+2];p.push(P,A,A,b,b,P)}}else if(g!==void 0){const E=g.array;_=g.version;for(let M=0,T=E.length/3-1;M<T;M+=3){const P=M+0,A=M+1,b=M+2;p.push(P,A,A,b,b,P)}}else return;const f=new(yl(p)?bl:wl)(p,1);f.version=_;const h=r.get(u);h&&t.remove(h),r.set(u,f)}function d(u){const p=r.get(u);if(p){const m=u.index;m!==null&&p.version<m.version&&l(u)}else l(u);return r.get(u)}return{get:o,update:c,getWireframeAttribute:d}}function gf(i,t,e){let n;function s(p){n=p}let r,a;function o(p){r=p.type,a=p.bytesPerElement}function c(p,m){i.drawElements(n,m,r,p*a),e.update(m,n,1)}function l(p,m,g){g!==0&&(i.drawElementsInstanced(n,m,r,p*a,g),e.update(m,n,g))}function d(p,m,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,m,0,r,p,0,g);let f=0;for(let h=0;h<g;h++)f+=m[h];e.update(f,n,1)}function u(p,m,g,_){if(g===0)return;const f=t.get("WEBGL_multi_draw");if(f===null)for(let h=0;h<p.length;h++)l(p[h]/a,m[h],_[h]);else{f.multiDrawElementsInstancedWEBGL(n,m,0,r,p,0,_,0,g);let h=0;for(let E=0;E<g;E++)h+=m[E];for(let E=0;E<_.length;E++)e.update(h,n,_[E])}}this.setMode=s,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=d,this.renderMultiDrawInstances=u}function _f(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case i.TRIANGLES:e.triangles+=o*(r/3);break;case i.LINES:e.lines+=o*(r/2);break;case i.LINE_STRIP:e.lines+=o*(r-1);break;case i.LINE_LOOP:e.lines+=o*r;break;case i.POINTS:e.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function xf(i,t,e){const n=new WeakMap,s=new te;function r(a,o,c){const l=a.morphTargetInfluences,d=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=d!==void 0?d.length:0;let p=n.get(o);if(p===void 0||p.count!==u){let x=function(){I.dispose(),n.delete(o),o.removeEventListener("dispose",x)};var m=x;p!==void 0&&p.texture.dispose();const g=o.morphAttributes.position!==void 0,_=o.morphAttributes.normal!==void 0,f=o.morphAttributes.color!==void 0,h=o.morphAttributes.position||[],E=o.morphAttributes.normal||[],M=o.morphAttributes.color||[];let T=0;g===!0&&(T=1),_===!0&&(T=2),f===!0&&(T=3);let P=o.attributes.position.count*T,A=1;P>t.maxTextureSize&&(A=Math.ceil(P/t.maxTextureSize),P=t.maxTextureSize);const b=new Float32Array(P*A*4*u),I=new El(b,P,A,u);I.type=hn,I.needsUpdate=!0;const q=T*4;for(let S=0;S<u;S++){const B=h[S],z=E[S],X=M[S],Z=P*A*4*S;for(let k=0;k<B.count;k++){const tt=k*q;g===!0&&(s.fromBufferAttribute(B,k),b[Z+tt+0]=s.x,b[Z+tt+1]=s.y,b[Z+tt+2]=s.z,b[Z+tt+3]=0),_===!0&&(s.fromBufferAttribute(z,k),b[Z+tt+4]=s.x,b[Z+tt+5]=s.y,b[Z+tt+6]=s.z,b[Z+tt+7]=0),f===!0&&(s.fromBufferAttribute(X,k),b[Z+tt+8]=s.x,b[Z+tt+9]=s.y,b[Z+tt+10]=s.z,b[Z+tt+11]=X.itemSize===4?s.w:1)}}p={count:u,texture:I,size:new Yt(P,A)},n.set(o,p),o.addEventListener("dispose",x)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",a.morphTexture,e);else{let g=0;for(let f=0;f<l.length;f++)g+=l[f];const _=o.morphTargetsRelative?1:1-g;c.getUniforms().setValue(i,"morphTargetBaseInfluence",_),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",p.texture,e),c.getUniforms().setValue(i,"morphTargetsTextureSize",p.size)}return{update:r}}function vf(i,t,e,n){let s=new WeakMap;function r(c){const l=n.render.frame,d=c.geometry,u=t.get(c,d);if(s.get(u)!==l&&(t.update(u),s.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",o)===!1&&c.addEventListener("dispose",o),s.get(c)!==l&&(e.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){const p=c.skeleton;s.get(p)!==l&&(p.update(),s.set(p,l))}return u}function a(){s=new WeakMap}function o(c){const l=c.target;l.removeEventListener("dispose",o),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:r,dispose:a}}class Dl extends Ae{constructor(t,e,n,s,r,a,o,c,l,d=pi){if(d!==pi&&d!==yi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&d===pi&&(n=Vn),n===void 0&&d===yi&&(n=Mi),super(null,s,r,a,o,c,d,n,l),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=o!==void 0?o:Ge,this.minFilter=c!==void 0?c:Ge,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const Il=new Ae,So=new Dl(1,1),Ul=new El,Nl=new sh,Fl=new Cl,Eo=[],To=[],wo=new Float32Array(16),bo=new Float32Array(9),Ao=new Float32Array(4);function wi(i,t,e){const n=i[0];if(n<=0||n>0)return i;const s=t*e;let r=Eo[s];if(r===void 0&&(r=new Float32Array(s),Eo[s]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,i[a].toArray(r,o)}return r}function fe(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function pe(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function Hs(i,t){let e=To[t];e===void 0&&(e=new Int32Array(t),To[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function Mf(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function yf(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(fe(e,t))return;i.uniform2fv(this.addr,t),pe(e,t)}}function Sf(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(fe(e,t))return;i.uniform3fv(this.addr,t),pe(e,t)}}function Ef(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(fe(e,t))return;i.uniform4fv(this.addr,t),pe(e,t)}}function Tf(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(fe(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),pe(e,t)}else{if(fe(e,n))return;Ao.set(n),i.uniformMatrix2fv(this.addr,!1,Ao),pe(e,n)}}function wf(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(fe(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),pe(e,t)}else{if(fe(e,n))return;bo.set(n),i.uniformMatrix3fv(this.addr,!1,bo),pe(e,n)}}function bf(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(fe(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),pe(e,t)}else{if(fe(e,n))return;wo.set(n),i.uniformMatrix4fv(this.addr,!1,wo),pe(e,n)}}function Af(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function Rf(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(fe(e,t))return;i.uniform2iv(this.addr,t),pe(e,t)}}function Cf(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(fe(e,t))return;i.uniform3iv(this.addr,t),pe(e,t)}}function Pf(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(fe(e,t))return;i.uniform4iv(this.addr,t),pe(e,t)}}function Lf(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function Df(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(fe(e,t))return;i.uniform2uiv(this.addr,t),pe(e,t)}}function If(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(fe(e,t))return;i.uniform3uiv(this.addr,t),pe(e,t)}}function Uf(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(fe(e,t))return;i.uniform4uiv(this.addr,t),pe(e,t)}}function Nf(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(So.compareFunction=Ml,r=So):r=Il,e.setTexture2D(t||r,s)}function Ff(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||Nl,s)}function Of(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||Fl,s)}function Bf(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||Ul,s)}function zf(i){switch(i){case 5126:return Mf;case 35664:return yf;case 35665:return Sf;case 35666:return Ef;case 35674:return Tf;case 35675:return wf;case 35676:return bf;case 5124:case 35670:return Af;case 35667:case 35671:return Rf;case 35668:case 35672:return Cf;case 35669:case 35673:return Pf;case 5125:return Lf;case 36294:return Df;case 36295:return If;case 36296:return Uf;case 35678:case 36198:case 36298:case 36306:case 35682:return Nf;case 35679:case 36299:case 36307:return Ff;case 35680:case 36300:case 36308:case 36293:return Of;case 36289:case 36303:case 36311:case 36292:return Bf}}function kf(i,t){i.uniform1fv(this.addr,t)}function Gf(i,t){const e=wi(t,this.size,2);i.uniform2fv(this.addr,e)}function Hf(i,t){const e=wi(t,this.size,3);i.uniform3fv(this.addr,e)}function Vf(i,t){const e=wi(t,this.size,4);i.uniform4fv(this.addr,e)}function Wf(i,t){const e=wi(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function Xf(i,t){const e=wi(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function qf(i,t){const e=wi(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function Yf(i,t){i.uniform1iv(this.addr,t)}function Kf(i,t){i.uniform2iv(this.addr,t)}function $f(i,t){i.uniform3iv(this.addr,t)}function Zf(i,t){i.uniform4iv(this.addr,t)}function jf(i,t){i.uniform1uiv(this.addr,t)}function Jf(i,t){i.uniform2uiv(this.addr,t)}function Qf(i,t){i.uniform3uiv(this.addr,t)}function tp(i,t){i.uniform4uiv(this.addr,t)}function ep(i,t,e){const n=this.cache,s=t.length,r=Hs(e,s);fe(n,r)||(i.uniform1iv(this.addr,r),pe(n,r));for(let a=0;a!==s;++a)e.setTexture2D(t[a]||Il,r[a])}function np(i,t,e){const n=this.cache,s=t.length,r=Hs(e,s);fe(n,r)||(i.uniform1iv(this.addr,r),pe(n,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||Nl,r[a])}function ip(i,t,e){const n=this.cache,s=t.length,r=Hs(e,s);fe(n,r)||(i.uniform1iv(this.addr,r),pe(n,r));for(let a=0;a!==s;++a)e.setTextureCube(t[a]||Fl,r[a])}function sp(i,t,e){const n=this.cache,s=t.length,r=Hs(e,s);fe(n,r)||(i.uniform1iv(this.addr,r),pe(n,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||Ul,r[a])}function rp(i){switch(i){case 5126:return kf;case 35664:return Gf;case 35665:return Hf;case 35666:return Vf;case 35674:return Wf;case 35675:return Xf;case 35676:return qf;case 5124:case 35670:return Yf;case 35667:case 35671:return Kf;case 35668:case 35672:return $f;case 35669:case 35673:return Zf;case 5125:return jf;case 36294:return Jf;case 36295:return Qf;case 36296:return tp;case 35678:case 36198:case 36298:case 36306:case 35682:return ep;case 35679:case 36299:case 36307:return np;case 35680:case 36300:case 36308:case 36293:return ip;case 36289:case 36303:case 36311:case 36292:return sp}}class ap{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=zf(e.type)}}class op{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=rp(e.type)}}class lp{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(t,e[o.id],n)}}}const yr=/(\w+)(\])?(\[|\.)?/g;function Ro(i,t){i.seq.push(t),i.map[t.id]=t}function cp(i,t,e){const n=i.name,s=n.length;for(yr.lastIndex=0;;){const r=yr.exec(n),a=yr.lastIndex;let o=r[1];const c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===s){Ro(e,l===void 0?new ap(o,i,t):new op(o,i,t));break}else{let u=e.map[o];u===void 0&&(u=new lp(o),Ro(e,u)),e=u}}}class Rs{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=t.getActiveUniform(e,s),a=t.getUniformLocation(e,r.name);cp(r,a,this)}}setValue(t,e,n,s){const r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,a=e.length;r!==a;++r){const o=e[r],c=n[o.id];c.needsUpdate!==!1&&o.setValue(t,c.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,r=t.length;s!==r;++s){const a=t[s];a.id in e&&n.push(a)}return n}}function Co(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const hp=37297;let dp=0;function up(i,t){const e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){const o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}function fp(i){const t=jt.getPrimaries(jt.workingColorSpace),e=jt.getPrimaries(i);let n;switch(t===e?n="":t===Us&&e===Is?n="LinearDisplayP3ToLinearSRGB":t===Is&&e===Us&&(n="LinearSRGBToLinearDisplayP3"),i){case Rn:case Gs:return[n,"LinearTransferOETF"];case Ye:case ba:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",i),[n,"LinearTransferOETF"]}}function Po(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),s=i.getShaderInfoLog(t).trim();if(n&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const a=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+up(i.getShaderSource(t),a)}else return s}function pp(i,t){const e=fp(t);return`vec4 ${i}( vec4 value ) { return ${e[0]}( ${e[1]}( value ) ); }`}function mp(i,t){let e;switch(t){case gc:e="Linear";break;case _c:e="Reinhard";break;case xc:e="Cineon";break;case ol:e="ACESFilmic";break;case Mc:e="AgX";break;case yc:e="Neutral";break;case vc:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const ps=new R;function gp(){jt.getLuminanceCoefficients(ps);const i=ps.x.toFixed(4),t=ps.y.toFixed(4),e=ps.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function _p(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ui).join(`
`)}function xp(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function vp(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(t,s),a=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:i.getAttribLocation(t,a),locationSize:o}}return e}function Ui(i){return i!==""}function Lo(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Do(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Mp=/^[ \t]*#include +<([\w\d./]+)>/gm;function pa(i){return i.replace(Mp,Sp)}const yp=new Map;function Sp(i,t){let e=Nt[t];if(e===void 0){const n=yp.get(t);if(n!==void 0)e=Nt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return pa(e)}const Ep=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Io(i){return i.replace(Ep,Tp)}function Tp(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Uo(i){let t=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function wp(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===sl?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===rl?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===ln&&(t="SHADOWMAP_TYPE_VSM"),t}function bp(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case xi:case vi:t="ENVMAP_TYPE_CUBE";break;case ks:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Ap(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case vi:t="ENVMAP_MODE_REFRACTION";break}return t}function Rp(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case al:t="ENVMAP_BLENDING_MULTIPLY";break;case pc:t="ENVMAP_BLENDING_MIX";break;case mc:t="ENVMAP_BLENDING_ADD";break}return t}function Cp(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function Pp(i,t,e,n){const s=i.getContext(),r=e.defines;let a=e.vertexShader,o=e.fragmentShader;const c=wp(e),l=bp(e),d=Ap(e),u=Rp(e),p=Cp(e),m=_p(e),g=xp(r),_=s.createProgram();let f,h,E=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(f=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Ui).join(`
`),f.length>0&&(f+=`
`),h=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Ui).join(`
`),h.length>0&&(h+=`
`)):(f=[Uo(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+d:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ui).join(`
`),h=[Uo(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+d:"",e.envMap?"#define "+u:"",p?"#define CUBEUV_TEXEL_WIDTH "+p.texelWidth:"",p?"#define CUBEUV_TEXEL_HEIGHT "+p.texelHeight:"",p?"#define CUBEUV_MAX_MIP "+p.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Tn?"#define TONE_MAPPING":"",e.toneMapping!==Tn?Nt.tonemapping_pars_fragment:"",e.toneMapping!==Tn?mp("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Nt.colorspace_pars_fragment,pp("linearToOutputTexel",e.outputColorSpace),gp(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Ui).join(`
`)),a=pa(a),a=Lo(a,e),a=Do(a,e),o=pa(o),o=Lo(o,e),o=Do(o,e),a=Io(a),o=Io(o),e.isRawShaderMaterial!==!0&&(E=`#version 300 es
`,f=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+f,h=["#define varying in",e.glslVersion===$a?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===$a?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+h);const M=E+f+a,T=E+h+o,P=Co(s,s.VERTEX_SHADER,M),A=Co(s,s.FRAGMENT_SHADER,T);s.attachShader(_,P),s.attachShader(_,A),e.index0AttributeName!==void 0?s.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function b(S){if(i.debug.checkShaderErrors){const B=s.getProgramInfoLog(_).trim(),z=s.getShaderInfoLog(P).trim(),X=s.getShaderInfoLog(A).trim();let Z=!0,k=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(Z=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,_,P,A);else{const tt=Po(s,P,"vertex"),W=Po(s,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+S.name+`
Material Type: `+S.type+`

Program Info Log: `+B+`
`+tt+`
`+W)}else B!==""?console.warn("THREE.WebGLProgram: Program Info Log:",B):(z===""||X==="")&&(k=!1);k&&(S.diagnostics={runnable:Z,programLog:B,vertexShader:{log:z,prefix:f},fragmentShader:{log:X,prefix:h}})}s.deleteShader(P),s.deleteShader(A),I=new Rs(s,_),q=vp(s,_)}let I;this.getUniforms=function(){return I===void 0&&b(this),I};let q;this.getAttributes=function(){return q===void 0&&b(this),q};let x=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return x===!1&&(x=s.getProgramParameter(_,hp)),x},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=dp++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=P,this.fragmentShader=A,this}let Lp=0;class Dp{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(t);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new Ip(t),e.set(t,n)),n}}class Ip{constructor(t){this.id=Lp++,this.code=t,this.usedTimes=0}}function Up(i,t,e,n,s,r,a){const o=new Ra,c=new Dp,l=new Set,d=[],u=s.logarithmicDepthBuffer,p=s.reverseDepthBuffer,m=s.vertexTextures;let g=s.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function f(x){return l.add(x),x===0?"uv":`uv${x}`}function h(x,S,B,z,X){const Z=z.fog,k=X.geometry,tt=x.isMeshStandardMaterial?z.environment:null,W=(x.isMeshStandardMaterial?e:t).get(x.envMap||tt),ft=W&&W.mapping===ks?W.image.height:null,ct=_[x.type];x.precision!==null&&(g=s.getMaxPrecision(x.precision),g!==x.precision&&console.warn("THREE.WebGLProgram.getParameters:",x.precision,"not supported, using",g,"instead."));const _t=k.morphAttributes.position||k.morphAttributes.normal||k.morphAttributes.color,Wt=_t!==void 0?_t.length:0;let Xt=0;k.morphAttributes.position!==void 0&&(Xt=1),k.morphAttributes.normal!==void 0&&(Xt=2),k.morphAttributes.color!==void 0&&(Xt=3);let H,nt,pt,ht;if(ct){const Pe=Qe[ct];H=Pe.vertexShader,nt=Pe.fragmentShader}else H=x.vertexShader,nt=x.fragmentShader,c.update(x),pt=c.getVertexShaderID(x),ht=c.getFragmentShaderID(x);const wt=i.getRenderTarget(),St=X.isInstancedMesh===!0,It=X.isBatchedMesh===!0,kt=!!x.map,Gt=!!x.matcap,C=!!W,ve=!!x.aoMap,Ut=!!x.lightMap,Ot=!!x.bumpMap,bt=!!x.normalMap,Jt=!!x.displacementMap,Et=!!x.emissiveMap,w=!!x.metalnessMap,v=!!x.roughnessMap,N=x.anisotropy>0,G=x.clearcoat>0,J=x.dispersion>0,Y=x.iridescence>0,st=x.sheen>0,K=x.transmission>0,et=N&&!!x.anisotropyMap,Pt=G&&!!x.clearcoatMap,Q=G&&!!x.clearcoatNormalMap,lt=G&&!!x.clearcoatRoughnessMap,At=Y&&!!x.iridescenceMap,Lt=Y&&!!x.iridescenceThicknessMap,mt=st&&!!x.sheenColorMap,Vt=st&&!!x.sheenRoughnessMap,Dt=!!x.specularMap,ee=!!x.specularColorMap,L=!!x.specularIntensityMap,dt=K&&!!x.transmissionMap,V=K&&!!x.thicknessMap,j=!!x.gradientMap,at=!!x.alphaMap,ut=x.alphaTest>0,qt=!!x.alphaHash,ce=!!x.extensions;let Ce=Tn;x.toneMapped&&(wt===null||wt.isXRRenderTarget===!0)&&(Ce=i.toneMapping);const Kt={shaderID:ct,shaderType:x.type,shaderName:x.name,vertexShader:H,fragmentShader:nt,defines:x.defines,customVertexShaderID:pt,customFragmentShaderID:ht,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:g,batching:It,batchingColor:It&&X._colorsTexture!==null,instancing:St,instancingColor:St&&X.instanceColor!==null,instancingMorph:St&&X.morphTexture!==null,supportsVertexTextures:m,outputColorSpace:wt===null?i.outputColorSpace:wt.isXRRenderTarget===!0?wt.texture.colorSpace:Rn,alphaToCoverage:!!x.alphaToCoverage,map:kt,matcap:Gt,envMap:C,envMapMode:C&&W.mapping,envMapCubeUVHeight:ft,aoMap:ve,lightMap:Ut,bumpMap:Ot,normalMap:bt,displacementMap:m&&Jt,emissiveMap:Et,normalMapObjectSpace:bt&&x.normalMapType===wc,normalMapTangentSpace:bt&&x.normalMapType===vl,metalnessMap:w,roughnessMap:v,anisotropy:N,anisotropyMap:et,clearcoat:G,clearcoatMap:Pt,clearcoatNormalMap:Q,clearcoatRoughnessMap:lt,dispersion:J,iridescence:Y,iridescenceMap:At,iridescenceThicknessMap:Lt,sheen:st,sheenColorMap:mt,sheenRoughnessMap:Vt,specularMap:Dt,specularColorMap:ee,specularIntensityMap:L,transmission:K,transmissionMap:dt,thicknessMap:V,gradientMap:j,opaque:x.transparent===!1&&x.blending===fi&&x.alphaToCoverage===!1,alphaMap:at,alphaTest:ut,alphaHash:qt,combine:x.combine,mapUv:kt&&f(x.map.channel),aoMapUv:ve&&f(x.aoMap.channel),lightMapUv:Ut&&f(x.lightMap.channel),bumpMapUv:Ot&&f(x.bumpMap.channel),normalMapUv:bt&&f(x.normalMap.channel),displacementMapUv:Jt&&f(x.displacementMap.channel),emissiveMapUv:Et&&f(x.emissiveMap.channel),metalnessMapUv:w&&f(x.metalnessMap.channel),roughnessMapUv:v&&f(x.roughnessMap.channel),anisotropyMapUv:et&&f(x.anisotropyMap.channel),clearcoatMapUv:Pt&&f(x.clearcoatMap.channel),clearcoatNormalMapUv:Q&&f(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:lt&&f(x.clearcoatRoughnessMap.channel),iridescenceMapUv:At&&f(x.iridescenceMap.channel),iridescenceThicknessMapUv:Lt&&f(x.iridescenceThicknessMap.channel),sheenColorMapUv:mt&&f(x.sheenColorMap.channel),sheenRoughnessMapUv:Vt&&f(x.sheenRoughnessMap.channel),specularMapUv:Dt&&f(x.specularMap.channel),specularColorMapUv:ee&&f(x.specularColorMap.channel),specularIntensityMapUv:L&&f(x.specularIntensityMap.channel),transmissionMapUv:dt&&f(x.transmissionMap.channel),thicknessMapUv:V&&f(x.thicknessMap.channel),alphaMapUv:at&&f(x.alphaMap.channel),vertexTangents:!!k.attributes.tangent&&(bt||N),vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!k.attributes.color&&k.attributes.color.itemSize===4,pointsUvs:X.isPoints===!0&&!!k.attributes.uv&&(kt||at),fog:!!Z,useFog:x.fog===!0,fogExp2:!!Z&&Z.isFogExp2,flatShading:x.flatShading===!0,sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:p,skinning:X.isSkinnedMesh===!0,morphTargets:k.morphAttributes.position!==void 0,morphNormals:k.morphAttributes.normal!==void 0,morphColors:k.morphAttributes.color!==void 0,morphTargetsCount:Wt,morphTextureStride:Xt,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:x.dithering,shadowMapEnabled:i.shadowMap.enabled&&B.length>0,shadowMapType:i.shadowMap.type,toneMapping:Ce,decodeVideoTexture:kt&&x.map.isVideoTexture===!0&&jt.getTransfer(x.map.colorSpace)===re,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===tn,flipSided:x.side===be,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:ce&&x.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ce&&x.extensions.multiDraw===!0||It)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return Kt.vertexUv1s=l.has(1),Kt.vertexUv2s=l.has(2),Kt.vertexUv3s=l.has(3),l.clear(),Kt}function E(x){const S=[];if(x.shaderID?S.push(x.shaderID):(S.push(x.customVertexShaderID),S.push(x.customFragmentShaderID)),x.defines!==void 0)for(const B in x.defines)S.push(B),S.push(x.defines[B]);return x.isRawShaderMaterial===!1&&(M(S,x),T(S,x),S.push(i.outputColorSpace)),S.push(x.customProgramCacheKey),S.join()}function M(x,S){x.push(S.precision),x.push(S.outputColorSpace),x.push(S.envMapMode),x.push(S.envMapCubeUVHeight),x.push(S.mapUv),x.push(S.alphaMapUv),x.push(S.lightMapUv),x.push(S.aoMapUv),x.push(S.bumpMapUv),x.push(S.normalMapUv),x.push(S.displacementMapUv),x.push(S.emissiveMapUv),x.push(S.metalnessMapUv),x.push(S.roughnessMapUv),x.push(S.anisotropyMapUv),x.push(S.clearcoatMapUv),x.push(S.clearcoatNormalMapUv),x.push(S.clearcoatRoughnessMapUv),x.push(S.iridescenceMapUv),x.push(S.iridescenceThicknessMapUv),x.push(S.sheenColorMapUv),x.push(S.sheenRoughnessMapUv),x.push(S.specularMapUv),x.push(S.specularColorMapUv),x.push(S.specularIntensityMapUv),x.push(S.transmissionMapUv),x.push(S.thicknessMapUv),x.push(S.combine),x.push(S.fogExp2),x.push(S.sizeAttenuation),x.push(S.morphTargetsCount),x.push(S.morphAttributeCount),x.push(S.numDirLights),x.push(S.numPointLights),x.push(S.numSpotLights),x.push(S.numSpotLightMaps),x.push(S.numHemiLights),x.push(S.numRectAreaLights),x.push(S.numDirLightShadows),x.push(S.numPointLightShadows),x.push(S.numSpotLightShadows),x.push(S.numSpotLightShadowsWithMaps),x.push(S.numLightProbes),x.push(S.shadowMapType),x.push(S.toneMapping),x.push(S.numClippingPlanes),x.push(S.numClipIntersection),x.push(S.depthPacking)}function T(x,S){o.disableAll(),S.supportsVertexTextures&&o.enable(0),S.instancing&&o.enable(1),S.instancingColor&&o.enable(2),S.instancingMorph&&o.enable(3),S.matcap&&o.enable(4),S.envMap&&o.enable(5),S.normalMapObjectSpace&&o.enable(6),S.normalMapTangentSpace&&o.enable(7),S.clearcoat&&o.enable(8),S.iridescence&&o.enable(9),S.alphaTest&&o.enable(10),S.vertexColors&&o.enable(11),S.vertexAlphas&&o.enable(12),S.vertexUv1s&&o.enable(13),S.vertexUv2s&&o.enable(14),S.vertexUv3s&&o.enable(15),S.vertexTangents&&o.enable(16),S.anisotropy&&o.enable(17),S.alphaHash&&o.enable(18),S.batching&&o.enable(19),S.dispersion&&o.enable(20),S.batchingColor&&o.enable(21),x.push(o.mask),o.disableAll(),S.fog&&o.enable(0),S.useFog&&o.enable(1),S.flatShading&&o.enable(2),S.logarithmicDepthBuffer&&o.enable(3),S.reverseDepthBuffer&&o.enable(4),S.skinning&&o.enable(5),S.morphTargets&&o.enable(6),S.morphNormals&&o.enable(7),S.morphColors&&o.enable(8),S.premultipliedAlpha&&o.enable(9),S.shadowMapEnabled&&o.enable(10),S.doubleSided&&o.enable(11),S.flipSided&&o.enable(12),S.useDepthPacking&&o.enable(13),S.dithering&&o.enable(14),S.transmission&&o.enable(15),S.sheen&&o.enable(16),S.opaque&&o.enable(17),S.pointsUvs&&o.enable(18),S.decodeVideoTexture&&o.enable(19),S.alphaToCoverage&&o.enable(20),x.push(o.mask)}function P(x){const S=_[x.type];let B;if(S){const z=Qe[S];B=gh.clone(z.uniforms)}else B=x.uniforms;return B}function A(x,S){let B;for(let z=0,X=d.length;z<X;z++){const Z=d[z];if(Z.cacheKey===S){B=Z,++B.usedTimes;break}}return B===void 0&&(B=new Pp(i,S,x,r),d.push(B)),B}function b(x){if(--x.usedTimes===0){const S=d.indexOf(x);d[S]=d[d.length-1],d.pop(),x.destroy()}}function I(x){c.remove(x)}function q(){c.dispose()}return{getParameters:h,getProgramCacheKey:E,getUniforms:P,acquireProgram:A,releaseProgram:b,releaseShaderCache:I,programs:d,dispose:q}}function Np(){let i=new WeakMap;function t(a){return i.has(a)}function e(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,c){i.get(a)[o]=c}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function Fp(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function No(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Fo(){const i=[];let t=0;const e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function a(u,p,m,g,_,f){let h=i[t];return h===void 0?(h={id:u.id,object:u,geometry:p,material:m,groupOrder:g,renderOrder:u.renderOrder,z:_,group:f},i[t]=h):(h.id=u.id,h.object=u,h.geometry=p,h.material=m,h.groupOrder=g,h.renderOrder=u.renderOrder,h.z=_,h.group=f),t++,h}function o(u,p,m,g,_,f){const h=a(u,p,m,g,_,f);m.transmission>0?n.push(h):m.transparent===!0?s.push(h):e.push(h)}function c(u,p,m,g,_,f){const h=a(u,p,m,g,_,f);m.transmission>0?n.unshift(h):m.transparent===!0?s.unshift(h):e.unshift(h)}function l(u,p){e.length>1&&e.sort(u||Fp),n.length>1&&n.sort(p||No),s.length>1&&s.sort(p||No)}function d(){for(let u=t,p=i.length;u<p;u++){const m=i[u];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:o,unshift:c,finish:d,sort:l}}function Op(){let i=new WeakMap;function t(n,s){const r=i.get(n);let a;return r===void 0?(a=new Fo,i.set(n,[a])):s>=r.length?(a=new Fo,r.push(a)):a=r[s],a}function e(){i=new WeakMap}return{get:t,dispose:e}}function Bp(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new R,color:new zt};break;case"SpotLight":e={position:new R,direction:new R,color:new zt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new R,color:new zt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new R,skyColor:new zt,groundColor:new zt};break;case"RectAreaLight":e={color:new zt,position:new R,halfWidth:new R,halfHeight:new R};break}return i[t.id]=e,e}}}function zp(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Yt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Yt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Yt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let kp=0;function Gp(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function Hp(i){const t=new Bp,e=zp(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new R);const s=new R,r=new ie,a=new ie;function o(l){let d=0,u=0,p=0;for(let q=0;q<9;q++)n.probe[q].set(0,0,0);let m=0,g=0,_=0,f=0,h=0,E=0,M=0,T=0,P=0,A=0,b=0;l.sort(Gp);for(let q=0,x=l.length;q<x;q++){const S=l[q],B=S.color,z=S.intensity,X=S.distance,Z=S.shadow&&S.shadow.map?S.shadow.map.texture:null;if(S.isAmbientLight)d+=B.r*z,u+=B.g*z,p+=B.b*z;else if(S.isLightProbe){for(let k=0;k<9;k++)n.probe[k].addScaledVector(S.sh.coefficients[k],z);b++}else if(S.isDirectionalLight){const k=t.get(S);if(k.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){const tt=S.shadow,W=e.get(S);W.shadowIntensity=tt.intensity,W.shadowBias=tt.bias,W.shadowNormalBias=tt.normalBias,W.shadowRadius=tt.radius,W.shadowMapSize=tt.mapSize,n.directionalShadow[m]=W,n.directionalShadowMap[m]=Z,n.directionalShadowMatrix[m]=S.shadow.matrix,E++}n.directional[m]=k,m++}else if(S.isSpotLight){const k=t.get(S);k.position.setFromMatrixPosition(S.matrixWorld),k.color.copy(B).multiplyScalar(z),k.distance=X,k.coneCos=Math.cos(S.angle),k.penumbraCos=Math.cos(S.angle*(1-S.penumbra)),k.decay=S.decay,n.spot[_]=k;const tt=S.shadow;if(S.map&&(n.spotLightMap[P]=S.map,P++,tt.updateMatrices(S),S.castShadow&&A++),n.spotLightMatrix[_]=tt.matrix,S.castShadow){const W=e.get(S);W.shadowIntensity=tt.intensity,W.shadowBias=tt.bias,W.shadowNormalBias=tt.normalBias,W.shadowRadius=tt.radius,W.shadowMapSize=tt.mapSize,n.spotShadow[_]=W,n.spotShadowMap[_]=Z,T++}_++}else if(S.isRectAreaLight){const k=t.get(S);k.color.copy(B).multiplyScalar(z),k.halfWidth.set(S.width*.5,0,0),k.halfHeight.set(0,S.height*.5,0),n.rectArea[f]=k,f++}else if(S.isPointLight){const k=t.get(S);if(k.color.copy(S.color).multiplyScalar(S.intensity),k.distance=S.distance,k.decay=S.decay,S.castShadow){const tt=S.shadow,W=e.get(S);W.shadowIntensity=tt.intensity,W.shadowBias=tt.bias,W.shadowNormalBias=tt.normalBias,W.shadowRadius=tt.radius,W.shadowMapSize=tt.mapSize,W.shadowCameraNear=tt.camera.near,W.shadowCameraFar=tt.camera.far,n.pointShadow[g]=W,n.pointShadowMap[g]=Z,n.pointShadowMatrix[g]=S.shadow.matrix,M++}n.point[g]=k,g++}else if(S.isHemisphereLight){const k=t.get(S);k.skyColor.copy(S.color).multiplyScalar(z),k.groundColor.copy(S.groundColor).multiplyScalar(z),n.hemi[h]=k,h++}}f>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=rt.LTC_FLOAT_1,n.rectAreaLTC2=rt.LTC_FLOAT_2):(n.rectAreaLTC1=rt.LTC_HALF_1,n.rectAreaLTC2=rt.LTC_HALF_2)),n.ambient[0]=d,n.ambient[1]=u,n.ambient[2]=p;const I=n.hash;(I.directionalLength!==m||I.pointLength!==g||I.spotLength!==_||I.rectAreaLength!==f||I.hemiLength!==h||I.numDirectionalShadows!==E||I.numPointShadows!==M||I.numSpotShadows!==T||I.numSpotMaps!==P||I.numLightProbes!==b)&&(n.directional.length=m,n.spot.length=_,n.rectArea.length=f,n.point.length=g,n.hemi.length=h,n.directionalShadow.length=E,n.directionalShadowMap.length=E,n.pointShadow.length=M,n.pointShadowMap.length=M,n.spotShadow.length=T,n.spotShadowMap.length=T,n.directionalShadowMatrix.length=E,n.pointShadowMatrix.length=M,n.spotLightMatrix.length=T+P-A,n.spotLightMap.length=P,n.numSpotLightShadowsWithMaps=A,n.numLightProbes=b,I.directionalLength=m,I.pointLength=g,I.spotLength=_,I.rectAreaLength=f,I.hemiLength=h,I.numDirectionalShadows=E,I.numPointShadows=M,I.numSpotShadows=T,I.numSpotMaps=P,I.numLightProbes=b,n.version=kp++)}function c(l,d){let u=0,p=0,m=0,g=0,_=0;const f=d.matrixWorldInverse;for(let h=0,E=l.length;h<E;h++){const M=l[h];if(M.isDirectionalLight){const T=n.directional[u];T.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),T.direction.sub(s),T.direction.transformDirection(f),u++}else if(M.isSpotLight){const T=n.spot[m];T.position.setFromMatrixPosition(M.matrixWorld),T.position.applyMatrix4(f),T.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),T.direction.sub(s),T.direction.transformDirection(f),m++}else if(M.isRectAreaLight){const T=n.rectArea[g];T.position.setFromMatrixPosition(M.matrixWorld),T.position.applyMatrix4(f),a.identity(),r.copy(M.matrixWorld),r.premultiply(f),a.extractRotation(r),T.halfWidth.set(M.width*.5,0,0),T.halfHeight.set(0,M.height*.5,0),T.halfWidth.applyMatrix4(a),T.halfHeight.applyMatrix4(a),g++}else if(M.isPointLight){const T=n.point[p];T.position.setFromMatrixPosition(M.matrixWorld),T.position.applyMatrix4(f),p++}else if(M.isHemisphereLight){const T=n.hemi[_];T.direction.setFromMatrixPosition(M.matrixWorld),T.direction.transformDirection(f),_++}}}return{setup:o,setupView:c,state:n}}function Oo(i){const t=new Hp(i),e=[],n=[];function s(d){l.camera=d,e.length=0,n.length=0}function r(d){e.push(d)}function a(d){n.push(d)}function o(){t.setup(e)}function c(d){t.setupView(e,d)}const l={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:o,setupLightsView:c,pushLight:r,pushShadow:a}}function Vp(i){let t=new WeakMap;function e(s,r=0){const a=t.get(s);let o;return a===void 0?(o=new Oo(i),t.set(s,[o])):r>=a.length?(o=new Oo(i),a.push(o)):o=a[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}class Wp extends Yn{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Ec,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Xp extends Yn{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const qp=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Yp=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Kp(i,t,e){let n=new Ca;const s=new Yt,r=new Yt,a=new te,o=new Wp({depthPacking:Tc}),c=new Xp,l={},d=e.maxTextureSize,u={[wn]:be,[be]:wn,[tn]:tn},p=new bn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Yt},radius:{value:4}},vertexShader:qp,fragmentShader:Yp}),m=p.clone();m.defines.HORIZONTAL_PASS=1;const g=new Re;g.setAttribute("position",new Ze(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new $(g,p),f=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=sl;let h=this.type;this.render=function(A,b,I){if(f.enabled===!1||f.autoUpdate===!1&&f.needsUpdate===!1||A.length===0)return;const q=i.getRenderTarget(),x=i.getActiveCubeFace(),S=i.getActiveMipmapLevel(),B=i.state;B.setBlending(En),B.buffers.color.setClear(1,1,1,1),B.buffers.depth.setTest(!0),B.setScissorTest(!1);const z=h!==ln&&this.type===ln,X=h===ln&&this.type!==ln;for(let Z=0,k=A.length;Z<k;Z++){const tt=A[Z],W=tt.shadow;if(W===void 0){console.warn("THREE.WebGLShadowMap:",tt,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;s.copy(W.mapSize);const ft=W.getFrameExtents();if(s.multiply(ft),r.copy(W.mapSize),(s.x>d||s.y>d)&&(s.x>d&&(r.x=Math.floor(d/ft.x),s.x=r.x*ft.x,W.mapSize.x=r.x),s.y>d&&(r.y=Math.floor(d/ft.y),s.y=r.y*ft.y,W.mapSize.y=r.y)),W.map===null||z===!0||X===!0){const _t=this.type!==ln?{minFilter:Ge,magFilter:Ge}:{};W.map!==null&&W.map.dispose(),W.map=new Wn(s.x,s.y,_t),W.map.texture.name=tt.name+".shadowMap",W.camera.updateProjectionMatrix()}i.setRenderTarget(W.map),i.clear();const ct=W.getViewportCount();for(let _t=0;_t<ct;_t++){const Wt=W.getViewport(_t);a.set(r.x*Wt.x,r.y*Wt.y,r.x*Wt.z,r.y*Wt.w),B.viewport(a),W.updateMatrices(tt,_t),n=W.getFrustum(),T(b,I,W.camera,tt,this.type)}W.isPointLightShadow!==!0&&this.type===ln&&E(W,I),W.needsUpdate=!1}h=this.type,f.needsUpdate=!1,i.setRenderTarget(q,x,S)};function E(A,b){const I=t.update(_);p.defines.VSM_SAMPLES!==A.blurSamples&&(p.defines.VSM_SAMPLES=A.blurSamples,m.defines.VSM_SAMPLES=A.blurSamples,p.needsUpdate=!0,m.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new Wn(s.x,s.y)),p.uniforms.shadow_pass.value=A.map.texture,p.uniforms.resolution.value=A.mapSize,p.uniforms.radius.value=A.radius,i.setRenderTarget(A.mapPass),i.clear(),i.renderBufferDirect(b,null,I,p,_,null),m.uniforms.shadow_pass.value=A.mapPass.texture,m.uniforms.resolution.value=A.mapSize,m.uniforms.radius.value=A.radius,i.setRenderTarget(A.map),i.clear(),i.renderBufferDirect(b,null,I,m,_,null)}function M(A,b,I,q){let x=null;const S=I.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(S!==void 0)x=S;else if(x=I.isPointLight===!0?c:o,i.localClippingEnabled&&b.clipShadows===!0&&Array.isArray(b.clippingPlanes)&&b.clippingPlanes.length!==0||b.displacementMap&&b.displacementScale!==0||b.alphaMap&&b.alphaTest>0||b.map&&b.alphaTest>0){const B=x.uuid,z=b.uuid;let X=l[B];X===void 0&&(X={},l[B]=X);let Z=X[z];Z===void 0&&(Z=x.clone(),X[z]=Z,b.addEventListener("dispose",P)),x=Z}if(x.visible=b.visible,x.wireframe=b.wireframe,q===ln?x.side=b.shadowSide!==null?b.shadowSide:b.side:x.side=b.shadowSide!==null?b.shadowSide:u[b.side],x.alphaMap=b.alphaMap,x.alphaTest=b.alphaTest,x.map=b.map,x.clipShadows=b.clipShadows,x.clippingPlanes=b.clippingPlanes,x.clipIntersection=b.clipIntersection,x.displacementMap=b.displacementMap,x.displacementScale=b.displacementScale,x.displacementBias=b.displacementBias,x.wireframeLinewidth=b.wireframeLinewidth,x.linewidth=b.linewidth,I.isPointLight===!0&&x.isMeshDistanceMaterial===!0){const B=i.properties.get(x);B.light=I}return x}function T(A,b,I,q,x){if(A.visible===!1)return;if(A.layers.test(b.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&x===ln)&&(!A.frustumCulled||n.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(I.matrixWorldInverse,A.matrixWorld);const z=t.update(A),X=A.material;if(Array.isArray(X)){const Z=z.groups;for(let k=0,tt=Z.length;k<tt;k++){const W=Z[k],ft=X[W.materialIndex];if(ft&&ft.visible){const ct=M(A,ft,q,x);A.onBeforeShadow(i,A,b,I,z,ct,W),i.renderBufferDirect(I,null,z,ct,A,W),A.onAfterShadow(i,A,b,I,z,ct,W)}}}else if(X.visible){const Z=M(A,X,q,x);A.onBeforeShadow(i,A,b,I,z,Z,null),i.renderBufferDirect(I,null,z,Z,A,null),A.onAfterShadow(i,A,b,I,z,Z,null)}}const B=A.children;for(let z=0,X=B.length;z<X;z++)T(B[z],b,I,q,x)}function P(A){A.target.removeEventListener("dispose",P);for(const I in l){const q=l[I],x=A.target.uuid;x in q&&(q[x].dispose(),delete q[x])}}}const $p={[Dr]:Ir,[Ur]:Or,[Nr]:Br,[_i]:Fr,[Ir]:Dr,[Or]:Ur,[Br]:Nr,[Fr]:_i};function Zp(i){function t(){let L=!1;const dt=new te;let V=null;const j=new te(0,0,0,0);return{setMask:function(at){V!==at&&!L&&(i.colorMask(at,at,at,at),V=at)},setLocked:function(at){L=at},setClear:function(at,ut,qt,ce,Ce){Ce===!0&&(at*=ce,ut*=ce,qt*=ce),dt.set(at,ut,qt,ce),j.equals(dt)===!1&&(i.clearColor(at,ut,qt,ce),j.copy(dt))},reset:function(){L=!1,V=null,j.set(-1,0,0,0)}}}function e(){let L=!1,dt=!1,V=null,j=null,at=null;return{setReversed:function(ut){dt=ut},setTest:function(ut){ut?pt(i.DEPTH_TEST):ht(i.DEPTH_TEST)},setMask:function(ut){V!==ut&&!L&&(i.depthMask(ut),V=ut)},setFunc:function(ut){if(dt&&(ut=$p[ut]),j!==ut){switch(ut){case Dr:i.depthFunc(i.NEVER);break;case Ir:i.depthFunc(i.ALWAYS);break;case Ur:i.depthFunc(i.LESS);break;case _i:i.depthFunc(i.LEQUAL);break;case Nr:i.depthFunc(i.EQUAL);break;case Fr:i.depthFunc(i.GEQUAL);break;case Or:i.depthFunc(i.GREATER);break;case Br:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}j=ut}},setLocked:function(ut){L=ut},setClear:function(ut){at!==ut&&(i.clearDepth(ut),at=ut)},reset:function(){L=!1,V=null,j=null,at=null}}}function n(){let L=!1,dt=null,V=null,j=null,at=null,ut=null,qt=null,ce=null,Ce=null;return{setTest:function(Kt){L||(Kt?pt(i.STENCIL_TEST):ht(i.STENCIL_TEST))},setMask:function(Kt){dt!==Kt&&!L&&(i.stencilMask(Kt),dt=Kt)},setFunc:function(Kt,Pe,en){(V!==Kt||j!==Pe||at!==en)&&(i.stencilFunc(Kt,Pe,en),V=Kt,j=Pe,at=en)},setOp:function(Kt,Pe,en){(ut!==Kt||qt!==Pe||ce!==en)&&(i.stencilOp(Kt,Pe,en),ut=Kt,qt=Pe,ce=en)},setLocked:function(Kt){L=Kt},setClear:function(Kt){Ce!==Kt&&(i.clearStencil(Kt),Ce=Kt)},reset:function(){L=!1,dt=null,V=null,j=null,at=null,ut=null,qt=null,ce=null,Ce=null}}}const s=new t,r=new e,a=new n,o=new WeakMap,c=new WeakMap;let l={},d={},u=new WeakMap,p=[],m=null,g=!1,_=null,f=null,h=null,E=null,M=null,T=null,P=null,A=new zt(0,0,0),b=0,I=!1,q=null,x=null,S=null,B=null,z=null;const X=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let Z=!1,k=0;const tt=i.getParameter(i.VERSION);tt.indexOf("WebGL")!==-1?(k=parseFloat(/^WebGL (\d)/.exec(tt)[1]),Z=k>=1):tt.indexOf("OpenGL ES")!==-1&&(k=parseFloat(/^OpenGL ES (\d)/.exec(tt)[1]),Z=k>=2);let W=null,ft={};const ct=i.getParameter(i.SCISSOR_BOX),_t=i.getParameter(i.VIEWPORT),Wt=new te().fromArray(ct),Xt=new te().fromArray(_t);function H(L,dt,V,j){const at=new Uint8Array(4),ut=i.createTexture();i.bindTexture(L,ut),i.texParameteri(L,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(L,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let qt=0;qt<V;qt++)L===i.TEXTURE_3D||L===i.TEXTURE_2D_ARRAY?i.texImage3D(dt,0,i.RGBA,1,1,j,0,i.RGBA,i.UNSIGNED_BYTE,at):i.texImage2D(dt+qt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,at);return ut}const nt={};nt[i.TEXTURE_2D]=H(i.TEXTURE_2D,i.TEXTURE_2D,1),nt[i.TEXTURE_CUBE_MAP]=H(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),nt[i.TEXTURE_2D_ARRAY]=H(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),nt[i.TEXTURE_3D]=H(i.TEXTURE_3D,i.TEXTURE_3D,1,1),s.setClear(0,0,0,1),r.setClear(1),a.setClear(0),pt(i.DEPTH_TEST),r.setFunc(_i),Ut(!1),Ot(Wa),pt(i.CULL_FACE),C(En);function pt(L){l[L]!==!0&&(i.enable(L),l[L]=!0)}function ht(L){l[L]!==!1&&(i.disable(L),l[L]=!1)}function wt(L,dt){return d[L]!==dt?(i.bindFramebuffer(L,dt),d[L]=dt,L===i.DRAW_FRAMEBUFFER&&(d[i.FRAMEBUFFER]=dt),L===i.FRAMEBUFFER&&(d[i.DRAW_FRAMEBUFFER]=dt),!0):!1}function St(L,dt){let V=p,j=!1;if(L){V=u.get(dt),V===void 0&&(V=[],u.set(dt,V));const at=L.textures;if(V.length!==at.length||V[0]!==i.COLOR_ATTACHMENT0){for(let ut=0,qt=at.length;ut<qt;ut++)V[ut]=i.COLOR_ATTACHMENT0+ut;V.length=at.length,j=!0}}else V[0]!==i.BACK&&(V[0]=i.BACK,j=!0);j&&i.drawBuffers(V)}function It(L){return m!==L?(i.useProgram(L),m=L,!0):!1}const kt={[Bn]:i.FUNC_ADD,[jl]:i.FUNC_SUBTRACT,[Jl]:i.FUNC_REVERSE_SUBTRACT};kt[Ql]=i.MIN,kt[tc]=i.MAX;const Gt={[ec]:i.ZERO,[nc]:i.ONE,[ic]:i.SRC_COLOR,[Pr]:i.SRC_ALPHA,[cc]:i.SRC_ALPHA_SATURATE,[oc]:i.DST_COLOR,[rc]:i.DST_ALPHA,[sc]:i.ONE_MINUS_SRC_COLOR,[Lr]:i.ONE_MINUS_SRC_ALPHA,[lc]:i.ONE_MINUS_DST_COLOR,[ac]:i.ONE_MINUS_DST_ALPHA,[hc]:i.CONSTANT_COLOR,[dc]:i.ONE_MINUS_CONSTANT_COLOR,[uc]:i.CONSTANT_ALPHA,[fc]:i.ONE_MINUS_CONSTANT_ALPHA};function C(L,dt,V,j,at,ut,qt,ce,Ce,Kt){if(L===En){g===!0&&(ht(i.BLEND),g=!1);return}if(g===!1&&(pt(i.BLEND),g=!0),L!==Zl){if(L!==_||Kt!==I){if((f!==Bn||M!==Bn)&&(i.blendEquation(i.FUNC_ADD),f=Bn,M=Bn),Kt)switch(L){case fi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Cr:i.blendFunc(i.ONE,i.ONE);break;case Xa:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case qa:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}else switch(L){case fi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Cr:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case Xa:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case qa:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}h=null,E=null,T=null,P=null,A.set(0,0,0),b=0,_=L,I=Kt}return}at=at||dt,ut=ut||V,qt=qt||j,(dt!==f||at!==M)&&(i.blendEquationSeparate(kt[dt],kt[at]),f=dt,M=at),(V!==h||j!==E||ut!==T||qt!==P)&&(i.blendFuncSeparate(Gt[V],Gt[j],Gt[ut],Gt[qt]),h=V,E=j,T=ut,P=qt),(ce.equals(A)===!1||Ce!==b)&&(i.blendColor(ce.r,ce.g,ce.b,Ce),A.copy(ce),b=Ce),_=L,I=!1}function ve(L,dt){L.side===tn?ht(i.CULL_FACE):pt(i.CULL_FACE);let V=L.side===be;dt&&(V=!V),Ut(V),L.blending===fi&&L.transparent===!1?C(En):C(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),r.setFunc(L.depthFunc),r.setTest(L.depthTest),r.setMask(L.depthWrite),s.setMask(L.colorWrite);const j=L.stencilWrite;a.setTest(j),j&&(a.setMask(L.stencilWriteMask),a.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),a.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),Jt(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?pt(i.SAMPLE_ALPHA_TO_COVERAGE):ht(i.SAMPLE_ALPHA_TO_COVERAGE)}function Ut(L){q!==L&&(L?i.frontFace(i.CW):i.frontFace(i.CCW),q=L)}function Ot(L){L!==Kl?(pt(i.CULL_FACE),L!==x&&(L===Wa?i.cullFace(i.BACK):L===$l?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):ht(i.CULL_FACE),x=L}function bt(L){L!==S&&(Z&&i.lineWidth(L),S=L)}function Jt(L,dt,V){L?(pt(i.POLYGON_OFFSET_FILL),(B!==dt||z!==V)&&(i.polygonOffset(dt,V),B=dt,z=V)):ht(i.POLYGON_OFFSET_FILL)}function Et(L){L?pt(i.SCISSOR_TEST):ht(i.SCISSOR_TEST)}function w(L){L===void 0&&(L=i.TEXTURE0+X-1),W!==L&&(i.activeTexture(L),W=L)}function v(L,dt,V){V===void 0&&(W===null?V=i.TEXTURE0+X-1:V=W);let j=ft[V];j===void 0&&(j={type:void 0,texture:void 0},ft[V]=j),(j.type!==L||j.texture!==dt)&&(W!==V&&(i.activeTexture(V),W=V),i.bindTexture(L,dt||nt[L]),j.type=L,j.texture=dt)}function N(){const L=ft[W];L!==void 0&&L.type!==void 0&&(i.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function G(){try{i.compressedTexImage2D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function J(){try{i.compressedTexImage3D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Y(){try{i.texSubImage2D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function st(){try{i.texSubImage3D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function K(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function et(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Pt(){try{i.texStorage2D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Q(){try{i.texStorage3D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function lt(){try{i.texImage2D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function At(){try{i.texImage3D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Lt(L){Wt.equals(L)===!1&&(i.scissor(L.x,L.y,L.z,L.w),Wt.copy(L))}function mt(L){Xt.equals(L)===!1&&(i.viewport(L.x,L.y,L.z,L.w),Xt.copy(L))}function Vt(L,dt){let V=c.get(dt);V===void 0&&(V=new WeakMap,c.set(dt,V));let j=V.get(L);j===void 0&&(j=i.getUniformBlockIndex(dt,L.name),V.set(L,j))}function Dt(L,dt){const j=c.get(dt).get(L);o.get(dt)!==j&&(i.uniformBlockBinding(dt,j,L.__bindingPointIndex),o.set(dt,j))}function ee(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),l={},W=null,ft={},d={},u=new WeakMap,p=[],m=null,g=!1,_=null,f=null,h=null,E=null,M=null,T=null,P=null,A=new zt(0,0,0),b=0,I=!1,q=null,x=null,S=null,B=null,z=null,Wt.set(0,0,i.canvas.width,i.canvas.height),Xt.set(0,0,i.canvas.width,i.canvas.height),s.reset(),r.reset(),a.reset()}return{buffers:{color:s,depth:r,stencil:a},enable:pt,disable:ht,bindFramebuffer:wt,drawBuffers:St,useProgram:It,setBlending:C,setMaterial:ve,setFlipSided:Ut,setCullFace:Ot,setLineWidth:bt,setPolygonOffset:Jt,setScissorTest:Et,activeTexture:w,bindTexture:v,unbindTexture:N,compressedTexImage2D:G,compressedTexImage3D:J,texImage2D:lt,texImage3D:At,updateUBOMapping:Vt,uniformBlockBinding:Dt,texStorage2D:Pt,texStorage3D:Q,texSubImage2D:Y,texSubImage3D:st,compressedTexSubImage2D:K,compressedTexSubImage3D:et,scissor:Lt,viewport:mt,reset:ee}}function Bo(i,t,e,n){const s=jp(n);switch(e){case ul:return i*t;case pl:return i*t;case ml:return i*t*2;case gl:return i*t/s.components*s.byteLength;case Ea:return i*t/s.components*s.byteLength;case _l:return i*t*2/s.components*s.byteLength;case Ta:return i*t*2/s.components*s.byteLength;case fl:return i*t*3/s.components*s.byteLength;case $e:return i*t*4/s.components*s.byteLength;case wa:return i*t*4/s.components*s.byteLength;case Ss:case Es:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Ts:case ws:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Vr:case Xr:return Math.max(i,16)*Math.max(t,8)/4;case Hr:case Wr:return Math.max(i,8)*Math.max(t,8)/2;case qr:case Yr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Kr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case $r:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Zr:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case jr:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case Jr:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case Qr:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case ta:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case ea:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case na:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case ia:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case sa:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case ra:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case aa:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case oa:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case la:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case bs:case ca:case ha:return Math.ceil(i/4)*Math.ceil(t/4)*16;case xl:case da:return Math.ceil(i/4)*Math.ceil(t/4)*8;case ua:case fa:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function jp(i){switch(i){case fn:case cl:return{byteLength:1,components:1};case Oi:case hl:case zi:return{byteLength:2,components:1};case ya:case Sa:return{byteLength:2,components:4};case Vn:case Ma:case hn:return{byteLength:4,components:1};case dl:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function Jp(i,t,e,n,s,r,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Yt,d=new WeakMap;let u;const p=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(w,v){return m?new OffscreenCanvas(w,v):Fs("canvas")}function _(w,v,N){let G=1;const J=Et(w);if((J.width>N||J.height>N)&&(G=N/Math.max(J.width,J.height)),G<1)if(typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&w instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&w instanceof ImageBitmap||typeof VideoFrame<"u"&&w instanceof VideoFrame){const Y=Math.floor(G*J.width),st=Math.floor(G*J.height);u===void 0&&(u=g(Y,st));const K=v?g(Y,st):u;return K.width=Y,K.height=st,K.getContext("2d").drawImage(w,0,0,Y,st),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+J.width+"x"+J.height+") to ("+Y+"x"+st+")."),K}else return"data"in w&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+J.width+"x"+J.height+")."),w;return w}function f(w){return w.generateMipmaps&&w.minFilter!==Ge&&w.minFilter!==Ke}function h(w){i.generateMipmap(w)}function E(w,v,N,G,J=!1){if(w!==null){if(i[w]!==void 0)return i[w];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+w+"'")}let Y=v;if(v===i.RED&&(N===i.FLOAT&&(Y=i.R32F),N===i.HALF_FLOAT&&(Y=i.R16F),N===i.UNSIGNED_BYTE&&(Y=i.R8)),v===i.RED_INTEGER&&(N===i.UNSIGNED_BYTE&&(Y=i.R8UI),N===i.UNSIGNED_SHORT&&(Y=i.R16UI),N===i.UNSIGNED_INT&&(Y=i.R32UI),N===i.BYTE&&(Y=i.R8I),N===i.SHORT&&(Y=i.R16I),N===i.INT&&(Y=i.R32I)),v===i.RG&&(N===i.FLOAT&&(Y=i.RG32F),N===i.HALF_FLOAT&&(Y=i.RG16F),N===i.UNSIGNED_BYTE&&(Y=i.RG8)),v===i.RG_INTEGER&&(N===i.UNSIGNED_BYTE&&(Y=i.RG8UI),N===i.UNSIGNED_SHORT&&(Y=i.RG16UI),N===i.UNSIGNED_INT&&(Y=i.RG32UI),N===i.BYTE&&(Y=i.RG8I),N===i.SHORT&&(Y=i.RG16I),N===i.INT&&(Y=i.RG32I)),v===i.RGB_INTEGER&&(N===i.UNSIGNED_BYTE&&(Y=i.RGB8UI),N===i.UNSIGNED_SHORT&&(Y=i.RGB16UI),N===i.UNSIGNED_INT&&(Y=i.RGB32UI),N===i.BYTE&&(Y=i.RGB8I),N===i.SHORT&&(Y=i.RGB16I),N===i.INT&&(Y=i.RGB32I)),v===i.RGBA_INTEGER&&(N===i.UNSIGNED_BYTE&&(Y=i.RGBA8UI),N===i.UNSIGNED_SHORT&&(Y=i.RGBA16UI),N===i.UNSIGNED_INT&&(Y=i.RGBA32UI),N===i.BYTE&&(Y=i.RGBA8I),N===i.SHORT&&(Y=i.RGBA16I),N===i.INT&&(Y=i.RGBA32I)),v===i.RGB&&N===i.UNSIGNED_INT_5_9_9_9_REV&&(Y=i.RGB9_E5),v===i.RGBA){const st=J?Ds:jt.getTransfer(G);N===i.FLOAT&&(Y=i.RGBA32F),N===i.HALF_FLOAT&&(Y=i.RGBA16F),N===i.UNSIGNED_BYTE&&(Y=st===re?i.SRGB8_ALPHA8:i.RGBA8),N===i.UNSIGNED_SHORT_4_4_4_4&&(Y=i.RGBA4),N===i.UNSIGNED_SHORT_5_5_5_1&&(Y=i.RGB5_A1)}return(Y===i.R16F||Y===i.R32F||Y===i.RG16F||Y===i.RG32F||Y===i.RGBA16F||Y===i.RGBA32F)&&t.get("EXT_color_buffer_float"),Y}function M(w,v){let N;return w?v===null||v===Vn||v===Mi?N=i.DEPTH24_STENCIL8:v===hn?N=i.DEPTH32F_STENCIL8:v===Oi&&(N=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===Vn||v===Mi?N=i.DEPTH_COMPONENT24:v===hn?N=i.DEPTH_COMPONENT32F:v===Oi&&(N=i.DEPTH_COMPONENT16),N}function T(w,v){return f(w)===!0||w.isFramebufferTexture&&w.minFilter!==Ge&&w.minFilter!==Ke?Math.log2(Math.max(v.width,v.height))+1:w.mipmaps!==void 0&&w.mipmaps.length>0?w.mipmaps.length:w.isCompressedTexture&&Array.isArray(w.image)?v.mipmaps.length:1}function P(w){const v=w.target;v.removeEventListener("dispose",P),b(v),v.isVideoTexture&&d.delete(v)}function A(w){const v=w.target;v.removeEventListener("dispose",A),q(v)}function b(w){const v=n.get(w);if(v.__webglInit===void 0)return;const N=w.source,G=p.get(N);if(G){const J=G[v.__cacheKey];J.usedTimes--,J.usedTimes===0&&I(w),Object.keys(G).length===0&&p.delete(N)}n.remove(w)}function I(w){const v=n.get(w);i.deleteTexture(v.__webglTexture);const N=w.source,G=p.get(N);delete G[v.__cacheKey],a.memory.textures--}function q(w){const v=n.get(w);if(w.depthTexture&&w.depthTexture.dispose(),w.isWebGLCubeRenderTarget)for(let G=0;G<6;G++){if(Array.isArray(v.__webglFramebuffer[G]))for(let J=0;J<v.__webglFramebuffer[G].length;J++)i.deleteFramebuffer(v.__webglFramebuffer[G][J]);else i.deleteFramebuffer(v.__webglFramebuffer[G]);v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer[G])}else{if(Array.isArray(v.__webglFramebuffer))for(let G=0;G<v.__webglFramebuffer.length;G++)i.deleteFramebuffer(v.__webglFramebuffer[G]);else i.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&i.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let G=0;G<v.__webglColorRenderbuffer.length;G++)v.__webglColorRenderbuffer[G]&&i.deleteRenderbuffer(v.__webglColorRenderbuffer[G]);v.__webglDepthRenderbuffer&&i.deleteRenderbuffer(v.__webglDepthRenderbuffer)}const N=w.textures;for(let G=0,J=N.length;G<J;G++){const Y=n.get(N[G]);Y.__webglTexture&&(i.deleteTexture(Y.__webglTexture),a.memory.textures--),n.remove(N[G])}n.remove(w)}let x=0;function S(){x=0}function B(){const w=x;return w>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+w+" texture units while this GPU supports only "+s.maxTextures),x+=1,w}function z(w){const v=[];return v.push(w.wrapS),v.push(w.wrapT),v.push(w.wrapR||0),v.push(w.magFilter),v.push(w.minFilter),v.push(w.anisotropy),v.push(w.internalFormat),v.push(w.format),v.push(w.type),v.push(w.generateMipmaps),v.push(w.premultiplyAlpha),v.push(w.flipY),v.push(w.unpackAlignment),v.push(w.colorSpace),v.join()}function X(w,v){const N=n.get(w);if(w.isVideoTexture&&bt(w),w.isRenderTargetTexture===!1&&w.version>0&&N.__version!==w.version){const G=w.image;if(G===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(G.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Xt(N,w,v);return}}e.bindTexture(i.TEXTURE_2D,N.__webglTexture,i.TEXTURE0+v)}function Z(w,v){const N=n.get(w);if(w.version>0&&N.__version!==w.version){Xt(N,w,v);return}e.bindTexture(i.TEXTURE_2D_ARRAY,N.__webglTexture,i.TEXTURE0+v)}function k(w,v){const N=n.get(w);if(w.version>0&&N.__version!==w.version){Xt(N,w,v);return}e.bindTexture(i.TEXTURE_3D,N.__webglTexture,i.TEXTURE0+v)}function tt(w,v){const N=n.get(w);if(w.version>0&&N.__version!==w.version){H(N,w,v);return}e.bindTexture(i.TEXTURE_CUBE_MAP,N.__webglTexture,i.TEXTURE0+v)}const W={[Hn]:i.REPEAT,[kn]:i.CLAMP_TO_EDGE,[Gr]:i.MIRRORED_REPEAT},ft={[Ge]:i.NEAREST,[Sc]:i.NEAREST_MIPMAP_NEAREST,[Ki]:i.NEAREST_MIPMAP_LINEAR,[Ke]:i.LINEAR,[Ks]:i.LINEAR_MIPMAP_NEAREST,[Gn]:i.LINEAR_MIPMAP_LINEAR},ct={[bc]:i.NEVER,[Dc]:i.ALWAYS,[Ac]:i.LESS,[Ml]:i.LEQUAL,[Rc]:i.EQUAL,[Lc]:i.GEQUAL,[Cc]:i.GREATER,[Pc]:i.NOTEQUAL};function _t(w,v){if(v.type===hn&&t.has("OES_texture_float_linear")===!1&&(v.magFilter===Ke||v.magFilter===Ks||v.magFilter===Ki||v.magFilter===Gn||v.minFilter===Ke||v.minFilter===Ks||v.minFilter===Ki||v.minFilter===Gn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(w,i.TEXTURE_WRAP_S,W[v.wrapS]),i.texParameteri(w,i.TEXTURE_WRAP_T,W[v.wrapT]),(w===i.TEXTURE_3D||w===i.TEXTURE_2D_ARRAY)&&i.texParameteri(w,i.TEXTURE_WRAP_R,W[v.wrapR]),i.texParameteri(w,i.TEXTURE_MAG_FILTER,ft[v.magFilter]),i.texParameteri(w,i.TEXTURE_MIN_FILTER,ft[v.minFilter]),v.compareFunction&&(i.texParameteri(w,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(w,i.TEXTURE_COMPARE_FUNC,ct[v.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===Ge||v.minFilter!==Ki&&v.minFilter!==Gn||v.type===hn&&t.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||n.get(v).__currentAnisotropy){const N=t.get("EXT_texture_filter_anisotropic");i.texParameterf(w,N.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,s.getMaxAnisotropy())),n.get(v).__currentAnisotropy=v.anisotropy}}}function Wt(w,v){let N=!1;w.__webglInit===void 0&&(w.__webglInit=!0,v.addEventListener("dispose",P));const G=v.source;let J=p.get(G);J===void 0&&(J={},p.set(G,J));const Y=z(v);if(Y!==w.__cacheKey){J[Y]===void 0&&(J[Y]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,N=!0),J[Y].usedTimes++;const st=J[w.__cacheKey];st!==void 0&&(J[w.__cacheKey].usedTimes--,st.usedTimes===0&&I(v)),w.__cacheKey=Y,w.__webglTexture=J[Y].texture}return N}function Xt(w,v,N){let G=i.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(G=i.TEXTURE_2D_ARRAY),v.isData3DTexture&&(G=i.TEXTURE_3D);const J=Wt(w,v),Y=v.source;e.bindTexture(G,w.__webglTexture,i.TEXTURE0+N);const st=n.get(Y);if(Y.version!==st.__version||J===!0){e.activeTexture(i.TEXTURE0+N);const K=jt.getPrimaries(jt.workingColorSpace),et=v.colorSpace===Sn?null:jt.getPrimaries(v.colorSpace),Pt=v.colorSpace===Sn||K===et?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Pt);let Q=_(v.image,!1,s.maxTextureSize);Q=Jt(v,Q);const lt=r.convert(v.format,v.colorSpace),At=r.convert(v.type);let Lt=E(v.internalFormat,lt,At,v.colorSpace,v.isVideoTexture);_t(G,v);let mt;const Vt=v.mipmaps,Dt=v.isVideoTexture!==!0,ee=st.__version===void 0||J===!0,L=Y.dataReady,dt=T(v,Q);if(v.isDepthTexture)Lt=M(v.format===yi,v.type),ee&&(Dt?e.texStorage2D(i.TEXTURE_2D,1,Lt,Q.width,Q.height):e.texImage2D(i.TEXTURE_2D,0,Lt,Q.width,Q.height,0,lt,At,null));else if(v.isDataTexture)if(Vt.length>0){Dt&&ee&&e.texStorage2D(i.TEXTURE_2D,dt,Lt,Vt[0].width,Vt[0].height);for(let V=0,j=Vt.length;V<j;V++)mt=Vt[V],Dt?L&&e.texSubImage2D(i.TEXTURE_2D,V,0,0,mt.width,mt.height,lt,At,mt.data):e.texImage2D(i.TEXTURE_2D,V,Lt,mt.width,mt.height,0,lt,At,mt.data);v.generateMipmaps=!1}else Dt?(ee&&e.texStorage2D(i.TEXTURE_2D,dt,Lt,Q.width,Q.height),L&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,Q.width,Q.height,lt,At,Q.data)):e.texImage2D(i.TEXTURE_2D,0,Lt,Q.width,Q.height,0,lt,At,Q.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){Dt&&ee&&e.texStorage3D(i.TEXTURE_2D_ARRAY,dt,Lt,Vt[0].width,Vt[0].height,Q.depth);for(let V=0,j=Vt.length;V<j;V++)if(mt=Vt[V],v.format!==$e)if(lt!==null)if(Dt){if(L)if(v.layerUpdates.size>0){const at=Bo(mt.width,mt.height,v.format,v.type);for(const ut of v.layerUpdates){const qt=mt.data.subarray(ut*at/mt.data.BYTES_PER_ELEMENT,(ut+1)*at/mt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,V,0,0,ut,mt.width,mt.height,1,lt,qt,0,0)}v.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,V,0,0,0,mt.width,mt.height,Q.depth,lt,mt.data,0,0)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,V,Lt,mt.width,mt.height,Q.depth,0,mt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Dt?L&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,V,0,0,0,mt.width,mt.height,Q.depth,lt,At,mt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,V,Lt,mt.width,mt.height,Q.depth,0,lt,At,mt.data)}else{Dt&&ee&&e.texStorage2D(i.TEXTURE_2D,dt,Lt,Vt[0].width,Vt[0].height);for(let V=0,j=Vt.length;V<j;V++)mt=Vt[V],v.format!==$e?lt!==null?Dt?L&&e.compressedTexSubImage2D(i.TEXTURE_2D,V,0,0,mt.width,mt.height,lt,mt.data):e.compressedTexImage2D(i.TEXTURE_2D,V,Lt,mt.width,mt.height,0,mt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Dt?L&&e.texSubImage2D(i.TEXTURE_2D,V,0,0,mt.width,mt.height,lt,At,mt.data):e.texImage2D(i.TEXTURE_2D,V,Lt,mt.width,mt.height,0,lt,At,mt.data)}else if(v.isDataArrayTexture)if(Dt){if(ee&&e.texStorage3D(i.TEXTURE_2D_ARRAY,dt,Lt,Q.width,Q.height,Q.depth),L)if(v.layerUpdates.size>0){const V=Bo(Q.width,Q.height,v.format,v.type);for(const j of v.layerUpdates){const at=Q.data.subarray(j*V/Q.data.BYTES_PER_ELEMENT,(j+1)*V/Q.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,j,Q.width,Q.height,1,lt,At,at)}v.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,Q.width,Q.height,Q.depth,lt,At,Q.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,Lt,Q.width,Q.height,Q.depth,0,lt,At,Q.data);else if(v.isData3DTexture)Dt?(ee&&e.texStorage3D(i.TEXTURE_3D,dt,Lt,Q.width,Q.height,Q.depth),L&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,Q.width,Q.height,Q.depth,lt,At,Q.data)):e.texImage3D(i.TEXTURE_3D,0,Lt,Q.width,Q.height,Q.depth,0,lt,At,Q.data);else if(v.isFramebufferTexture){if(ee)if(Dt)e.texStorage2D(i.TEXTURE_2D,dt,Lt,Q.width,Q.height);else{let V=Q.width,j=Q.height;for(let at=0;at<dt;at++)e.texImage2D(i.TEXTURE_2D,at,Lt,V,j,0,lt,At,null),V>>=1,j>>=1}}else if(Vt.length>0){if(Dt&&ee){const V=Et(Vt[0]);e.texStorage2D(i.TEXTURE_2D,dt,Lt,V.width,V.height)}for(let V=0,j=Vt.length;V<j;V++)mt=Vt[V],Dt?L&&e.texSubImage2D(i.TEXTURE_2D,V,0,0,lt,At,mt):e.texImage2D(i.TEXTURE_2D,V,Lt,lt,At,mt);v.generateMipmaps=!1}else if(Dt){if(ee){const V=Et(Q);e.texStorage2D(i.TEXTURE_2D,dt,Lt,V.width,V.height)}L&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,lt,At,Q)}else e.texImage2D(i.TEXTURE_2D,0,Lt,lt,At,Q);f(v)&&h(G),st.__version=Y.version,v.onUpdate&&v.onUpdate(v)}w.__version=v.version}function H(w,v,N){if(v.image.length!==6)return;const G=Wt(w,v),J=v.source;e.bindTexture(i.TEXTURE_CUBE_MAP,w.__webglTexture,i.TEXTURE0+N);const Y=n.get(J);if(J.version!==Y.__version||G===!0){e.activeTexture(i.TEXTURE0+N);const st=jt.getPrimaries(jt.workingColorSpace),K=v.colorSpace===Sn?null:jt.getPrimaries(v.colorSpace),et=v.colorSpace===Sn||st===K?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,et);const Pt=v.isCompressedTexture||v.image[0].isCompressedTexture,Q=v.image[0]&&v.image[0].isDataTexture,lt=[];for(let j=0;j<6;j++)!Pt&&!Q?lt[j]=_(v.image[j],!0,s.maxCubemapSize):lt[j]=Q?v.image[j].image:v.image[j],lt[j]=Jt(v,lt[j]);const At=lt[0],Lt=r.convert(v.format,v.colorSpace),mt=r.convert(v.type),Vt=E(v.internalFormat,Lt,mt,v.colorSpace),Dt=v.isVideoTexture!==!0,ee=Y.__version===void 0||G===!0,L=J.dataReady;let dt=T(v,At);_t(i.TEXTURE_CUBE_MAP,v);let V;if(Pt){Dt&&ee&&e.texStorage2D(i.TEXTURE_CUBE_MAP,dt,Vt,At.width,At.height);for(let j=0;j<6;j++){V=lt[j].mipmaps;for(let at=0;at<V.length;at++){const ut=V[at];v.format!==$e?Lt!==null?Dt?L&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,at,0,0,ut.width,ut.height,Lt,ut.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,at,Vt,ut.width,ut.height,0,ut.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Dt?L&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,at,0,0,ut.width,ut.height,Lt,mt,ut.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,at,Vt,ut.width,ut.height,0,Lt,mt,ut.data)}}}else{if(V=v.mipmaps,Dt&&ee){V.length>0&&dt++;const j=Et(lt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,dt,Vt,j.width,j.height)}for(let j=0;j<6;j++)if(Q){Dt?L&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,lt[j].width,lt[j].height,Lt,mt,lt[j].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,Vt,lt[j].width,lt[j].height,0,Lt,mt,lt[j].data);for(let at=0;at<V.length;at++){const qt=V[at].image[j].image;Dt?L&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,at+1,0,0,qt.width,qt.height,Lt,mt,qt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,at+1,Vt,qt.width,qt.height,0,Lt,mt,qt.data)}}else{Dt?L&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,Lt,mt,lt[j]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,Vt,Lt,mt,lt[j]);for(let at=0;at<V.length;at++){const ut=V[at];Dt?L&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,at+1,0,0,Lt,mt,ut.image[j]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,at+1,Vt,Lt,mt,ut.image[j])}}}f(v)&&h(i.TEXTURE_CUBE_MAP),Y.__version=J.version,v.onUpdate&&v.onUpdate(v)}w.__version=v.version}function nt(w,v,N,G,J,Y){const st=r.convert(N.format,N.colorSpace),K=r.convert(N.type),et=E(N.internalFormat,st,K,N.colorSpace);if(!n.get(v).__hasExternalTextures){const Q=Math.max(1,v.width>>Y),lt=Math.max(1,v.height>>Y);J===i.TEXTURE_3D||J===i.TEXTURE_2D_ARRAY?e.texImage3D(J,Y,et,Q,lt,v.depth,0,st,K,null):e.texImage2D(J,Y,et,Q,lt,0,st,K,null)}e.bindFramebuffer(i.FRAMEBUFFER,w),Ot(v)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,G,J,n.get(N).__webglTexture,0,Ut(v)):(J===i.TEXTURE_2D||J>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&J<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,G,J,n.get(N).__webglTexture,Y),e.bindFramebuffer(i.FRAMEBUFFER,null)}function pt(w,v,N){if(i.bindRenderbuffer(i.RENDERBUFFER,w),v.depthBuffer){const G=v.depthTexture,J=G&&G.isDepthTexture?G.type:null,Y=M(v.stencilBuffer,J),st=v.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,K=Ut(v);Ot(v)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,K,Y,v.width,v.height):N?i.renderbufferStorageMultisample(i.RENDERBUFFER,K,Y,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,Y,v.width,v.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,st,i.RENDERBUFFER,w)}else{const G=v.textures;for(let J=0;J<G.length;J++){const Y=G[J],st=r.convert(Y.format,Y.colorSpace),K=r.convert(Y.type),et=E(Y.internalFormat,st,K,Y.colorSpace),Pt=Ut(v);N&&Ot(v)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Pt,et,v.width,v.height):Ot(v)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Pt,et,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,et,v.width,v.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function ht(w,v){if(v&&v.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,w),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(v.depthTexture).__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),X(v.depthTexture,0);const G=n.get(v.depthTexture).__webglTexture,J=Ut(v);if(v.depthTexture.format===pi)Ot(v)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,G,0,J):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,G,0);else if(v.depthTexture.format===yi)Ot(v)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,G,0,J):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,G,0);else throw new Error("Unknown depthTexture format")}function wt(w){const v=n.get(w),N=w.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==w.depthTexture){const G=w.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),G){const J=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,G.removeEventListener("dispose",J)};G.addEventListener("dispose",J),v.__depthDisposeCallback=J}v.__boundDepthTexture=G}if(w.depthTexture&&!v.__autoAllocateDepthBuffer){if(N)throw new Error("target.depthTexture not supported in Cube render targets");ht(v.__webglFramebuffer,w)}else if(N){v.__webglDepthbuffer=[];for(let G=0;G<6;G++)if(e.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[G]),v.__webglDepthbuffer[G]===void 0)v.__webglDepthbuffer[G]=i.createRenderbuffer(),pt(v.__webglDepthbuffer[G],w,!1);else{const J=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Y=v.__webglDepthbuffer[G];i.bindRenderbuffer(i.RENDERBUFFER,Y),i.framebufferRenderbuffer(i.FRAMEBUFFER,J,i.RENDERBUFFER,Y)}}else if(e.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=i.createRenderbuffer(),pt(v.__webglDepthbuffer,w,!1);else{const G=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,J=v.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,J),i.framebufferRenderbuffer(i.FRAMEBUFFER,G,i.RENDERBUFFER,J)}e.bindFramebuffer(i.FRAMEBUFFER,null)}function St(w,v,N){const G=n.get(w);v!==void 0&&nt(G.__webglFramebuffer,w,w.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),N!==void 0&&wt(w)}function It(w){const v=w.texture,N=n.get(w),G=n.get(v);w.addEventListener("dispose",A);const J=w.textures,Y=w.isWebGLCubeRenderTarget===!0,st=J.length>1;if(st||(G.__webglTexture===void 0&&(G.__webglTexture=i.createTexture()),G.__version=v.version,a.memory.textures++),Y){N.__webglFramebuffer=[];for(let K=0;K<6;K++)if(v.mipmaps&&v.mipmaps.length>0){N.__webglFramebuffer[K]=[];for(let et=0;et<v.mipmaps.length;et++)N.__webglFramebuffer[K][et]=i.createFramebuffer()}else N.__webglFramebuffer[K]=i.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){N.__webglFramebuffer=[];for(let K=0;K<v.mipmaps.length;K++)N.__webglFramebuffer[K]=i.createFramebuffer()}else N.__webglFramebuffer=i.createFramebuffer();if(st)for(let K=0,et=J.length;K<et;K++){const Pt=n.get(J[K]);Pt.__webglTexture===void 0&&(Pt.__webglTexture=i.createTexture(),a.memory.textures++)}if(w.samples>0&&Ot(w)===!1){N.__webglMultisampledFramebuffer=i.createFramebuffer(),N.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,N.__webglMultisampledFramebuffer);for(let K=0;K<J.length;K++){const et=J[K];N.__webglColorRenderbuffer[K]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,N.__webglColorRenderbuffer[K]);const Pt=r.convert(et.format,et.colorSpace),Q=r.convert(et.type),lt=E(et.internalFormat,Pt,Q,et.colorSpace,w.isXRRenderTarget===!0),At=Ut(w);i.renderbufferStorageMultisample(i.RENDERBUFFER,At,lt,w.width,w.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+K,i.RENDERBUFFER,N.__webglColorRenderbuffer[K])}i.bindRenderbuffer(i.RENDERBUFFER,null),w.depthBuffer&&(N.__webglDepthRenderbuffer=i.createRenderbuffer(),pt(N.__webglDepthRenderbuffer,w,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(Y){e.bindTexture(i.TEXTURE_CUBE_MAP,G.__webglTexture),_t(i.TEXTURE_CUBE_MAP,v);for(let K=0;K<6;K++)if(v.mipmaps&&v.mipmaps.length>0)for(let et=0;et<v.mipmaps.length;et++)nt(N.__webglFramebuffer[K][et],w,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+K,et);else nt(N.__webglFramebuffer[K],w,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0);f(v)&&h(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(st){for(let K=0,et=J.length;K<et;K++){const Pt=J[K],Q=n.get(Pt);e.bindTexture(i.TEXTURE_2D,Q.__webglTexture),_t(i.TEXTURE_2D,Pt),nt(N.__webglFramebuffer,w,Pt,i.COLOR_ATTACHMENT0+K,i.TEXTURE_2D,0),f(Pt)&&h(i.TEXTURE_2D)}e.unbindTexture()}else{let K=i.TEXTURE_2D;if((w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(K=w.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(K,G.__webglTexture),_t(K,v),v.mipmaps&&v.mipmaps.length>0)for(let et=0;et<v.mipmaps.length;et++)nt(N.__webglFramebuffer[et],w,v,i.COLOR_ATTACHMENT0,K,et);else nt(N.__webglFramebuffer,w,v,i.COLOR_ATTACHMENT0,K,0);f(v)&&h(K),e.unbindTexture()}w.depthBuffer&&wt(w)}function kt(w){const v=w.textures;for(let N=0,G=v.length;N<G;N++){const J=v[N];if(f(J)){const Y=w.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:i.TEXTURE_2D,st=n.get(J).__webglTexture;e.bindTexture(Y,st),h(Y),e.unbindTexture()}}}const Gt=[],C=[];function ve(w){if(w.samples>0){if(Ot(w)===!1){const v=w.textures,N=w.width,G=w.height;let J=i.COLOR_BUFFER_BIT;const Y=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,st=n.get(w),K=v.length>1;if(K)for(let et=0;et<v.length;et++)e.bindFramebuffer(i.FRAMEBUFFER,st.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+et,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,st.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+et,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,st.__webglMultisampledFramebuffer),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,st.__webglFramebuffer);for(let et=0;et<v.length;et++){if(w.resolveDepthBuffer&&(w.depthBuffer&&(J|=i.DEPTH_BUFFER_BIT),w.stencilBuffer&&w.resolveStencilBuffer&&(J|=i.STENCIL_BUFFER_BIT)),K){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,st.__webglColorRenderbuffer[et]);const Pt=n.get(v[et]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Pt,0)}i.blitFramebuffer(0,0,N,G,0,0,N,G,J,i.NEAREST),c===!0&&(Gt.length=0,C.length=0,Gt.push(i.COLOR_ATTACHMENT0+et),w.depthBuffer&&w.resolveDepthBuffer===!1&&(Gt.push(Y),C.push(Y),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,C)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Gt))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),K)for(let et=0;et<v.length;et++){e.bindFramebuffer(i.FRAMEBUFFER,st.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+et,i.RENDERBUFFER,st.__webglColorRenderbuffer[et]);const Pt=n.get(v[et]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,st.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+et,i.TEXTURE_2D,Pt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,st.__webglMultisampledFramebuffer)}else if(w.depthBuffer&&w.resolveDepthBuffer===!1&&c){const v=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[v])}}}function Ut(w){return Math.min(s.maxSamples,w.samples)}function Ot(w){const v=n.get(w);return w.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function bt(w){const v=a.render.frame;d.get(w)!==v&&(d.set(w,v),w.update())}function Jt(w,v){const N=w.colorSpace,G=w.format,J=w.type;return w.isCompressedTexture===!0||w.isVideoTexture===!0||N!==Rn&&N!==Sn&&(jt.getTransfer(N)===re?(G!==$e||J!==fn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",N)),v}function Et(w){return typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement?(l.width=w.naturalWidth||w.width,l.height=w.naturalHeight||w.height):typeof VideoFrame<"u"&&w instanceof VideoFrame?(l.width=w.displayWidth,l.height=w.displayHeight):(l.width=w.width,l.height=w.height),l}this.allocateTextureUnit=B,this.resetTextureUnits=S,this.setTexture2D=X,this.setTexture2DArray=Z,this.setTexture3D=k,this.setTextureCube=tt,this.rebindTextures=St,this.setupRenderTarget=It,this.updateRenderTargetMipmap=kt,this.updateMultisampleRenderTarget=ve,this.setupDepthRenderbuffer=wt,this.setupFrameBufferTexture=nt,this.useMultisampledRTT=Ot}function Qp(i,t){function e(n,s=Sn){let r;const a=jt.getTransfer(s);if(n===fn)return i.UNSIGNED_BYTE;if(n===ya)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Sa)return i.UNSIGNED_SHORT_5_5_5_1;if(n===dl)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===cl)return i.BYTE;if(n===hl)return i.SHORT;if(n===Oi)return i.UNSIGNED_SHORT;if(n===Ma)return i.INT;if(n===Vn)return i.UNSIGNED_INT;if(n===hn)return i.FLOAT;if(n===zi)return i.HALF_FLOAT;if(n===ul)return i.ALPHA;if(n===fl)return i.RGB;if(n===$e)return i.RGBA;if(n===pl)return i.LUMINANCE;if(n===ml)return i.LUMINANCE_ALPHA;if(n===pi)return i.DEPTH_COMPONENT;if(n===yi)return i.DEPTH_STENCIL;if(n===gl)return i.RED;if(n===Ea)return i.RED_INTEGER;if(n===_l)return i.RG;if(n===Ta)return i.RG_INTEGER;if(n===wa)return i.RGBA_INTEGER;if(n===Ss||n===Es||n===Ts||n===ws)if(a===re)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Ss)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Es)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Ts)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===ws)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Ss)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Es)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Ts)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===ws)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Hr||n===Vr||n===Wr||n===Xr)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Hr)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Vr)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Wr)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Xr)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===qr||n===Yr||n===Kr)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===qr||n===Yr)return a===re?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Kr)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===$r||n===Zr||n===jr||n===Jr||n===Qr||n===ta||n===ea||n===na||n===ia||n===sa||n===ra||n===aa||n===oa||n===la)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===$r)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Zr)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===jr)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Jr)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Qr)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===ta)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===ea)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===na)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===ia)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===sa)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===ra)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===aa)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===oa)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===la)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===bs||n===ca||n===ha)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===bs)return a===re?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===ca)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===ha)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===xl||n===da||n===ua||n===fa)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===bs)return r.COMPRESSED_RED_RGTC1_EXT;if(n===da)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===ua)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===fa)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Mi?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}class tm extends Fe{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class le extends de{constructor(){super(),this.isGroup=!0,this.type="Group"}}const em={type:"move"};class Sr{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new le,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new le,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new R,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new R),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new le,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new R,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new R),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){a=!0;for(const _ of t.hand.values()){const f=e.getJointPose(_,n),h=this._getHandJoint(l,_);f!==null&&(h.matrix.fromArray(f.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,h.jointRadius=f.radius),h.visible=f!==null}const d=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],p=d.position.distanceTo(u.position),m=.02,g=.005;l.inputState.pinching&&p>m+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&p<=m-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(em)))}return o!==null&&(o.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new le;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const nm=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,im=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class sm{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const s=new Ae,r=t.properties.get(s);r.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new bn({vertexShader:nm,fragmentShader:im,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new $(new An(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class rm extends Xn{constructor(t,e){super();const n=this;let s=null,r=1,a=null,o="local-floor",c=1,l=null,d=null,u=null,p=null,m=null,g=null;const _=new sm,f=e.getContextAttributes();let h=null,E=null;const M=[],T=[],P=new Yt;let A=null;const b=new Fe;b.layers.enable(1),b.viewport=new te;const I=new Fe;I.layers.enable(2),I.viewport=new te;const q=[b,I],x=new tm;x.layers.enable(1),x.layers.enable(2);let S=null,B=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(H){let nt=M[H];return nt===void 0&&(nt=new Sr,M[H]=nt),nt.getTargetRaySpace()},this.getControllerGrip=function(H){let nt=M[H];return nt===void 0&&(nt=new Sr,M[H]=nt),nt.getGripSpace()},this.getHand=function(H){let nt=M[H];return nt===void 0&&(nt=new Sr,M[H]=nt),nt.getHandSpace()};function z(H){const nt=T.indexOf(H.inputSource);if(nt===-1)return;const pt=M[nt];pt!==void 0&&(pt.update(H.inputSource,H.frame,l||a),pt.dispatchEvent({type:H.type,data:H.inputSource}))}function X(){s.removeEventListener("select",z),s.removeEventListener("selectstart",z),s.removeEventListener("selectend",z),s.removeEventListener("squeeze",z),s.removeEventListener("squeezestart",z),s.removeEventListener("squeezeend",z),s.removeEventListener("end",X),s.removeEventListener("inputsourceschange",Z);for(let H=0;H<M.length;H++){const nt=T[H];nt!==null&&(T[H]=null,M[H].disconnect(nt))}S=null,B=null,_.reset(),t.setRenderTarget(h),m=null,p=null,u=null,s=null,E=null,Xt.stop(),n.isPresenting=!1,t.setPixelRatio(A),t.setSize(P.width,P.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(H){r=H,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(H){o=H,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(H){l=H},this.getBaseLayer=function(){return p!==null?p:m},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(H){if(s=H,s!==null){if(h=t.getRenderTarget(),s.addEventListener("select",z),s.addEventListener("selectstart",z),s.addEventListener("selectend",z),s.addEventListener("squeeze",z),s.addEventListener("squeezestart",z),s.addEventListener("squeezeend",z),s.addEventListener("end",X),s.addEventListener("inputsourceschange",Z),f.xrCompatible!==!0&&await e.makeXRCompatible(),A=t.getPixelRatio(),t.getSize(P),s.renderState.layers===void 0){const nt={antialias:f.antialias,alpha:!0,depth:f.depth,stencil:f.stencil,framebufferScaleFactor:r};m=new XRWebGLLayer(s,e,nt),s.updateRenderState({baseLayer:m}),t.setPixelRatio(1),t.setSize(m.framebufferWidth,m.framebufferHeight,!1),E=new Wn(m.framebufferWidth,m.framebufferHeight,{format:$e,type:fn,colorSpace:t.outputColorSpace,stencilBuffer:f.stencil})}else{let nt=null,pt=null,ht=null;f.depth&&(ht=f.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,nt=f.stencil?yi:pi,pt=f.stencil?Mi:Vn);const wt={colorFormat:e.RGBA8,depthFormat:ht,scaleFactor:r};u=new XRWebGLBinding(s,e),p=u.createProjectionLayer(wt),s.updateRenderState({layers:[p]}),t.setPixelRatio(1),t.setSize(p.textureWidth,p.textureHeight,!1),E=new Wn(p.textureWidth,p.textureHeight,{format:$e,type:fn,depthTexture:new Dl(p.textureWidth,p.textureHeight,pt,void 0,void 0,void 0,void 0,void 0,void 0,nt),stencilBuffer:f.stencil,colorSpace:t.outputColorSpace,samples:f.antialias?4:0,resolveDepthBuffer:p.ignoreDepthValues===!1})}E.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await s.requestReferenceSpace(o),Xt.setContext(s),Xt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function Z(H){for(let nt=0;nt<H.removed.length;nt++){const pt=H.removed[nt],ht=T.indexOf(pt);ht>=0&&(T[ht]=null,M[ht].disconnect(pt))}for(let nt=0;nt<H.added.length;nt++){const pt=H.added[nt];let ht=T.indexOf(pt);if(ht===-1){for(let St=0;St<M.length;St++)if(St>=T.length){T.push(pt),ht=St;break}else if(T[St]===null){T[St]=pt,ht=St;break}if(ht===-1)break}const wt=M[ht];wt&&wt.connect(pt)}}const k=new R,tt=new R;function W(H,nt,pt){k.setFromMatrixPosition(nt.matrixWorld),tt.setFromMatrixPosition(pt.matrixWorld);const ht=k.distanceTo(tt),wt=nt.projectionMatrix.elements,St=pt.projectionMatrix.elements,It=wt[14]/(wt[10]-1),kt=wt[14]/(wt[10]+1),Gt=(wt[9]+1)/wt[5],C=(wt[9]-1)/wt[5],ve=(wt[8]-1)/wt[0],Ut=(St[8]+1)/St[0],Ot=It*ve,bt=It*Ut,Jt=ht/(-ve+Ut),Et=Jt*-ve;if(nt.matrixWorld.decompose(H.position,H.quaternion,H.scale),H.translateX(Et),H.translateZ(Jt),H.matrixWorld.compose(H.position,H.quaternion,H.scale),H.matrixWorldInverse.copy(H.matrixWorld).invert(),wt[10]===-1)H.projectionMatrix.copy(nt.projectionMatrix),H.projectionMatrixInverse.copy(nt.projectionMatrixInverse);else{const w=It+Jt,v=kt+Jt,N=Ot-Et,G=bt+(ht-Et),J=Gt*kt/v*w,Y=C*kt/v*w;H.projectionMatrix.makePerspective(N,G,J,Y,w,v),H.projectionMatrixInverse.copy(H.projectionMatrix).invert()}}function ft(H,nt){nt===null?H.matrixWorld.copy(H.matrix):H.matrixWorld.multiplyMatrices(nt.matrixWorld,H.matrix),H.matrixWorldInverse.copy(H.matrixWorld).invert()}this.updateCamera=function(H){if(s===null)return;let nt=H.near,pt=H.far;_.texture!==null&&(_.depthNear>0&&(nt=_.depthNear),_.depthFar>0&&(pt=_.depthFar)),x.near=I.near=b.near=nt,x.far=I.far=b.far=pt,(S!==x.near||B!==x.far)&&(s.updateRenderState({depthNear:x.near,depthFar:x.far}),S=x.near,B=x.far);const ht=H.parent,wt=x.cameras;ft(x,ht);for(let St=0;St<wt.length;St++)ft(wt[St],ht);wt.length===2?W(x,b,I):x.projectionMatrix.copy(b.projectionMatrix),ct(H,x,ht)};function ct(H,nt,pt){pt===null?H.matrix.copy(nt.matrixWorld):(H.matrix.copy(pt.matrixWorld),H.matrix.invert(),H.matrix.multiply(nt.matrixWorld)),H.matrix.decompose(H.position,H.quaternion,H.scale),H.updateMatrixWorld(!0),H.projectionMatrix.copy(nt.projectionMatrix),H.projectionMatrixInverse.copy(nt.projectionMatrixInverse),H.isPerspectiveCamera&&(H.fov=Bi*2*Math.atan(1/H.projectionMatrix.elements[5]),H.zoom=1)}this.getCamera=function(){return x},this.getFoveation=function(){if(!(p===null&&m===null))return c},this.setFoveation=function(H){c=H,p!==null&&(p.fixedFoveation=H),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=H)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(x)};let _t=null;function Wt(H,nt){if(d=nt.getViewerPose(l||a),g=nt,d!==null){const pt=d.views;m!==null&&(t.setRenderTargetFramebuffer(E,m.framebuffer),t.setRenderTarget(E));let ht=!1;pt.length!==x.cameras.length&&(x.cameras.length=0,ht=!0);for(let St=0;St<pt.length;St++){const It=pt[St];let kt=null;if(m!==null)kt=m.getViewport(It);else{const C=u.getViewSubImage(p,It);kt=C.viewport,St===0&&(t.setRenderTargetTextures(E,C.colorTexture,p.ignoreDepthValues?void 0:C.depthStencilTexture),t.setRenderTarget(E))}let Gt=q[St];Gt===void 0&&(Gt=new Fe,Gt.layers.enable(St),Gt.viewport=new te,q[St]=Gt),Gt.matrix.fromArray(It.transform.matrix),Gt.matrix.decompose(Gt.position,Gt.quaternion,Gt.scale),Gt.projectionMatrix.fromArray(It.projectionMatrix),Gt.projectionMatrixInverse.copy(Gt.projectionMatrix).invert(),Gt.viewport.set(kt.x,kt.y,kt.width,kt.height),St===0&&(x.matrix.copy(Gt.matrix),x.matrix.decompose(x.position,x.quaternion,x.scale)),ht===!0&&x.cameras.push(Gt)}const wt=s.enabledFeatures;if(wt&&wt.includes("depth-sensing")){const St=u.getDepthInformation(pt[0]);St&&St.isValid&&St.texture&&_.init(t,St,s.renderState)}}for(let pt=0;pt<M.length;pt++){const ht=T[pt],wt=M[pt];ht!==null&&wt!==void 0&&wt.update(ht,nt,l||a)}_t&&_t(H,nt),nt.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:nt}),g=null}const Xt=new Pl;Xt.setAnimationLoop(Wt),this.setAnimationLoop=function(H){_t=H},this.dispose=function(){}}}const Nn=new He,am=new ie;function om(i,t){function e(f,h){f.matrixAutoUpdate===!0&&f.updateMatrix(),h.value.copy(f.matrix)}function n(f,h){h.color.getRGB(f.fogColor.value,Al(i)),h.isFog?(f.fogNear.value=h.near,f.fogFar.value=h.far):h.isFogExp2&&(f.fogDensity.value=h.density)}function s(f,h,E,M,T){h.isMeshBasicMaterial||h.isMeshLambertMaterial?r(f,h):h.isMeshToonMaterial?(r(f,h),u(f,h)):h.isMeshPhongMaterial?(r(f,h),d(f,h)):h.isMeshStandardMaterial?(r(f,h),p(f,h),h.isMeshPhysicalMaterial&&m(f,h,T)):h.isMeshMatcapMaterial?(r(f,h),g(f,h)):h.isMeshDepthMaterial?r(f,h):h.isMeshDistanceMaterial?(r(f,h),_(f,h)):h.isMeshNormalMaterial?r(f,h):h.isLineBasicMaterial?(a(f,h),h.isLineDashedMaterial&&o(f,h)):h.isPointsMaterial?c(f,h,E,M):h.isSpriteMaterial?l(f,h):h.isShadowMaterial?(f.color.value.copy(h.color),f.opacity.value=h.opacity):h.isShaderMaterial&&(h.uniformsNeedUpdate=!1)}function r(f,h){f.opacity.value=h.opacity,h.color&&f.diffuse.value.copy(h.color),h.emissive&&f.emissive.value.copy(h.emissive).multiplyScalar(h.emissiveIntensity),h.map&&(f.map.value=h.map,e(h.map,f.mapTransform)),h.alphaMap&&(f.alphaMap.value=h.alphaMap,e(h.alphaMap,f.alphaMapTransform)),h.bumpMap&&(f.bumpMap.value=h.bumpMap,e(h.bumpMap,f.bumpMapTransform),f.bumpScale.value=h.bumpScale,h.side===be&&(f.bumpScale.value*=-1)),h.normalMap&&(f.normalMap.value=h.normalMap,e(h.normalMap,f.normalMapTransform),f.normalScale.value.copy(h.normalScale),h.side===be&&f.normalScale.value.negate()),h.displacementMap&&(f.displacementMap.value=h.displacementMap,e(h.displacementMap,f.displacementMapTransform),f.displacementScale.value=h.displacementScale,f.displacementBias.value=h.displacementBias),h.emissiveMap&&(f.emissiveMap.value=h.emissiveMap,e(h.emissiveMap,f.emissiveMapTransform)),h.specularMap&&(f.specularMap.value=h.specularMap,e(h.specularMap,f.specularMapTransform)),h.alphaTest>0&&(f.alphaTest.value=h.alphaTest);const E=t.get(h),M=E.envMap,T=E.envMapRotation;M&&(f.envMap.value=M,Nn.copy(T),Nn.x*=-1,Nn.y*=-1,Nn.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(Nn.y*=-1,Nn.z*=-1),f.envMapRotation.value.setFromMatrix4(am.makeRotationFromEuler(Nn)),f.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,f.reflectivity.value=h.reflectivity,f.ior.value=h.ior,f.refractionRatio.value=h.refractionRatio),h.lightMap&&(f.lightMap.value=h.lightMap,f.lightMapIntensity.value=h.lightMapIntensity,e(h.lightMap,f.lightMapTransform)),h.aoMap&&(f.aoMap.value=h.aoMap,f.aoMapIntensity.value=h.aoMapIntensity,e(h.aoMap,f.aoMapTransform))}function a(f,h){f.diffuse.value.copy(h.color),f.opacity.value=h.opacity,h.map&&(f.map.value=h.map,e(h.map,f.mapTransform))}function o(f,h){f.dashSize.value=h.dashSize,f.totalSize.value=h.dashSize+h.gapSize,f.scale.value=h.scale}function c(f,h,E,M){f.diffuse.value.copy(h.color),f.opacity.value=h.opacity,f.size.value=h.size*E,f.scale.value=M*.5,h.map&&(f.map.value=h.map,e(h.map,f.uvTransform)),h.alphaMap&&(f.alphaMap.value=h.alphaMap,e(h.alphaMap,f.alphaMapTransform)),h.alphaTest>0&&(f.alphaTest.value=h.alphaTest)}function l(f,h){f.diffuse.value.copy(h.color),f.opacity.value=h.opacity,f.rotation.value=h.rotation,h.map&&(f.map.value=h.map,e(h.map,f.mapTransform)),h.alphaMap&&(f.alphaMap.value=h.alphaMap,e(h.alphaMap,f.alphaMapTransform)),h.alphaTest>0&&(f.alphaTest.value=h.alphaTest)}function d(f,h){f.specular.value.copy(h.specular),f.shininess.value=Math.max(h.shininess,1e-4)}function u(f,h){h.gradientMap&&(f.gradientMap.value=h.gradientMap)}function p(f,h){f.metalness.value=h.metalness,h.metalnessMap&&(f.metalnessMap.value=h.metalnessMap,e(h.metalnessMap,f.metalnessMapTransform)),f.roughness.value=h.roughness,h.roughnessMap&&(f.roughnessMap.value=h.roughnessMap,e(h.roughnessMap,f.roughnessMapTransform)),h.envMap&&(f.envMapIntensity.value=h.envMapIntensity)}function m(f,h,E){f.ior.value=h.ior,h.sheen>0&&(f.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen),f.sheenRoughness.value=h.sheenRoughness,h.sheenColorMap&&(f.sheenColorMap.value=h.sheenColorMap,e(h.sheenColorMap,f.sheenColorMapTransform)),h.sheenRoughnessMap&&(f.sheenRoughnessMap.value=h.sheenRoughnessMap,e(h.sheenRoughnessMap,f.sheenRoughnessMapTransform))),h.clearcoat>0&&(f.clearcoat.value=h.clearcoat,f.clearcoatRoughness.value=h.clearcoatRoughness,h.clearcoatMap&&(f.clearcoatMap.value=h.clearcoatMap,e(h.clearcoatMap,f.clearcoatMapTransform)),h.clearcoatRoughnessMap&&(f.clearcoatRoughnessMap.value=h.clearcoatRoughnessMap,e(h.clearcoatRoughnessMap,f.clearcoatRoughnessMapTransform)),h.clearcoatNormalMap&&(f.clearcoatNormalMap.value=h.clearcoatNormalMap,e(h.clearcoatNormalMap,f.clearcoatNormalMapTransform),f.clearcoatNormalScale.value.copy(h.clearcoatNormalScale),h.side===be&&f.clearcoatNormalScale.value.negate())),h.dispersion>0&&(f.dispersion.value=h.dispersion),h.iridescence>0&&(f.iridescence.value=h.iridescence,f.iridescenceIOR.value=h.iridescenceIOR,f.iridescenceThicknessMinimum.value=h.iridescenceThicknessRange[0],f.iridescenceThicknessMaximum.value=h.iridescenceThicknessRange[1],h.iridescenceMap&&(f.iridescenceMap.value=h.iridescenceMap,e(h.iridescenceMap,f.iridescenceMapTransform)),h.iridescenceThicknessMap&&(f.iridescenceThicknessMap.value=h.iridescenceThicknessMap,e(h.iridescenceThicknessMap,f.iridescenceThicknessMapTransform))),h.transmission>0&&(f.transmission.value=h.transmission,f.transmissionSamplerMap.value=E.texture,f.transmissionSamplerSize.value.set(E.width,E.height),h.transmissionMap&&(f.transmissionMap.value=h.transmissionMap,e(h.transmissionMap,f.transmissionMapTransform)),f.thickness.value=h.thickness,h.thicknessMap&&(f.thicknessMap.value=h.thicknessMap,e(h.thicknessMap,f.thicknessMapTransform)),f.attenuationDistance.value=h.attenuationDistance,f.attenuationColor.value.copy(h.attenuationColor)),h.anisotropy>0&&(f.anisotropyVector.value.set(h.anisotropy*Math.cos(h.anisotropyRotation),h.anisotropy*Math.sin(h.anisotropyRotation)),h.anisotropyMap&&(f.anisotropyMap.value=h.anisotropyMap,e(h.anisotropyMap,f.anisotropyMapTransform))),f.specularIntensity.value=h.specularIntensity,f.specularColor.value.copy(h.specularColor),h.specularColorMap&&(f.specularColorMap.value=h.specularColorMap,e(h.specularColorMap,f.specularColorMapTransform)),h.specularIntensityMap&&(f.specularIntensityMap.value=h.specularIntensityMap,e(h.specularIntensityMap,f.specularIntensityMapTransform))}function g(f,h){h.matcap&&(f.matcap.value=h.matcap)}function _(f,h){const E=t.get(h).light;f.referencePosition.value.setFromMatrixPosition(E.matrixWorld),f.nearDistance.value=E.shadow.camera.near,f.farDistance.value=E.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function lm(i,t,e,n){let s={},r={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(E,M){const T=M.program;n.uniformBlockBinding(E,T)}function l(E,M){let T=s[E.id];T===void 0&&(g(E),T=d(E),s[E.id]=T,E.addEventListener("dispose",f));const P=M.program;n.updateUBOMapping(E,P);const A=t.render.frame;r[E.id]!==A&&(p(E),r[E.id]=A)}function d(E){const M=u();E.__bindingPointIndex=M;const T=i.createBuffer(),P=E.__size,A=E.usage;return i.bindBuffer(i.UNIFORM_BUFFER,T),i.bufferData(i.UNIFORM_BUFFER,P,A),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,M,T),T}function u(){for(let E=0;E<o;E++)if(a.indexOf(E)===-1)return a.push(E),E;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function p(E){const M=s[E.id],T=E.uniforms,P=E.__cache;i.bindBuffer(i.UNIFORM_BUFFER,M);for(let A=0,b=T.length;A<b;A++){const I=Array.isArray(T[A])?T[A]:[T[A]];for(let q=0,x=I.length;q<x;q++){const S=I[q];if(m(S,A,q,P)===!0){const B=S.__offset,z=Array.isArray(S.value)?S.value:[S.value];let X=0;for(let Z=0;Z<z.length;Z++){const k=z[Z],tt=_(k);typeof k=="number"||typeof k=="boolean"?(S.__data[0]=k,i.bufferSubData(i.UNIFORM_BUFFER,B+X,S.__data)):k.isMatrix3?(S.__data[0]=k.elements[0],S.__data[1]=k.elements[1],S.__data[2]=k.elements[2],S.__data[3]=0,S.__data[4]=k.elements[3],S.__data[5]=k.elements[4],S.__data[6]=k.elements[5],S.__data[7]=0,S.__data[8]=k.elements[6],S.__data[9]=k.elements[7],S.__data[10]=k.elements[8],S.__data[11]=0):(k.toArray(S.__data,X),X+=tt.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,B,S.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function m(E,M,T,P){const A=E.value,b=M+"_"+T;if(P[b]===void 0)return typeof A=="number"||typeof A=="boolean"?P[b]=A:P[b]=A.clone(),!0;{const I=P[b];if(typeof A=="number"||typeof A=="boolean"){if(I!==A)return P[b]=A,!0}else if(I.equals(A)===!1)return I.copy(A),!0}return!1}function g(E){const M=E.uniforms;let T=0;const P=16;for(let b=0,I=M.length;b<I;b++){const q=Array.isArray(M[b])?M[b]:[M[b]];for(let x=0,S=q.length;x<S;x++){const B=q[x],z=Array.isArray(B.value)?B.value:[B.value];for(let X=0,Z=z.length;X<Z;X++){const k=z[X],tt=_(k),W=T%P,ft=W%tt.boundary,ct=W+ft;T+=ft,ct!==0&&P-ct<tt.storage&&(T+=P-ct),B.__data=new Float32Array(tt.storage/Float32Array.BYTES_PER_ELEMENT),B.__offset=T,T+=tt.storage}}}const A=T%P;return A>0&&(T+=P-A),E.__size=T,E.__cache={},this}function _(E){const M={boundary:0,storage:0};return typeof E=="number"||typeof E=="boolean"?(M.boundary=4,M.storage=4):E.isVector2?(M.boundary=8,M.storage=8):E.isVector3||E.isColor?(M.boundary=16,M.storage=12):E.isVector4?(M.boundary=16,M.storage=16):E.isMatrix3?(M.boundary=48,M.storage=48):E.isMatrix4?(M.boundary=64,M.storage=64):E.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",E),M}function f(E){const M=E.target;M.removeEventListener("dispose",f);const T=a.indexOf(M.__bindingPointIndex);a.splice(T,1),i.deleteBuffer(s[M.id]),delete s[M.id],delete r[M.id]}function h(){for(const E in s)i.deleteBuffer(s[E]);a=[],s={},r={}}return{bind:c,update:l,dispose:h}}class cm{constructor(t={}){const{canvas:e=$c(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:u=!1}=t;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=a;const m=new Uint32Array(4),g=new Int32Array(4);let _=null,f=null;const h=[],E=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Ye,this.toneMapping=Tn,this.toneMappingExposure=1;const M=this;let T=!1,P=0,A=0,b=null,I=-1,q=null;const x=new te,S=new te;let B=null;const z=new zt(0);let X=0,Z=e.width,k=e.height,tt=1,W=null,ft=null;const ct=new te(0,0,Z,k),_t=new te(0,0,Z,k);let Wt=!1;const Xt=new Ca;let H=!1,nt=!1;const pt=new ie,ht=new ie,wt=new R,St=new te,It={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let kt=!1;function Gt(){return b===null?tt:1}let C=n;function ve(y,D){return e.getContext(y,D)}try{const y={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:d,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${va}`),e.addEventListener("webglcontextlost",j,!1),e.addEventListener("webglcontextrestored",at,!1),e.addEventListener("webglcontextcreationerror",ut,!1),C===null){const D="webgl2";if(C=ve(D,y),C===null)throw ve(D)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(y){throw console.error("THREE.WebGLRenderer: "+y.message),y}let Ut,Ot,bt,Jt,Et,w,v,N,G,J,Y,st,K,et,Pt,Q,lt,At,Lt,mt,Vt,Dt,ee,L;function dt(){Ut=new pf(C),Ut.init(),Dt=new Qp(C,Ut),Ot=new lf(C,Ut,t,Dt),bt=new Zp(C),Ot.reverseDepthBuffer&&bt.buffers.depth.setReversed(!0),Jt=new _f(C),Et=new Np,w=new Jp(C,Ut,bt,Et,Ot,Dt,Jt),v=new hf(M),N=new ff(M),G=new Eh(C),ee=new af(C,G),J=new mf(C,G,Jt,ee),Y=new vf(C,J,G,Jt),Lt=new xf(C,Ot,w),Q=new cf(Et),st=new Up(M,v,N,Ut,Ot,ee,Q),K=new om(M,Et),et=new Op,Pt=new Vp(Ut),At=new rf(M,v,N,bt,Y,p,c),lt=new Kp(M,Y,Ot),L=new lm(C,Jt,Ot,bt),mt=new of(C,Ut,Jt),Vt=new gf(C,Ut,Jt),Jt.programs=st.programs,M.capabilities=Ot,M.extensions=Ut,M.properties=Et,M.renderLists=et,M.shadowMap=lt,M.state=bt,M.info=Jt}dt();const V=new rm(M,C);this.xr=V,this.getContext=function(){return C},this.getContextAttributes=function(){return C.getContextAttributes()},this.forceContextLoss=function(){const y=Ut.get("WEBGL_lose_context");y&&y.loseContext()},this.forceContextRestore=function(){const y=Ut.get("WEBGL_lose_context");y&&y.restoreContext()},this.getPixelRatio=function(){return tt},this.setPixelRatio=function(y){y!==void 0&&(tt=y,this.setSize(Z,k,!1))},this.getSize=function(y){return y.set(Z,k)},this.setSize=function(y,D,F=!0){if(V.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}Z=y,k=D,e.width=Math.floor(y*tt),e.height=Math.floor(D*tt),F===!0&&(e.style.width=y+"px",e.style.height=D+"px"),this.setViewport(0,0,y,D)},this.getDrawingBufferSize=function(y){return y.set(Z*tt,k*tt).floor()},this.setDrawingBufferSize=function(y,D,F){Z=y,k=D,tt=F,e.width=Math.floor(y*F),e.height=Math.floor(D*F),this.setViewport(0,0,y,D)},this.getCurrentViewport=function(y){return y.copy(x)},this.getViewport=function(y){return y.copy(ct)},this.setViewport=function(y,D,F,O){y.isVector4?ct.set(y.x,y.y,y.z,y.w):ct.set(y,D,F,O),bt.viewport(x.copy(ct).multiplyScalar(tt).round())},this.getScissor=function(y){return y.copy(_t)},this.setScissor=function(y,D,F,O){y.isVector4?_t.set(y.x,y.y,y.z,y.w):_t.set(y,D,F,O),bt.scissor(S.copy(_t).multiplyScalar(tt).round())},this.getScissorTest=function(){return Wt},this.setScissorTest=function(y){bt.setScissorTest(Wt=y)},this.setOpaqueSort=function(y){W=y},this.setTransparentSort=function(y){ft=y},this.getClearColor=function(y){return y.copy(At.getClearColor())},this.setClearColor=function(){At.setClearColor.apply(At,arguments)},this.getClearAlpha=function(){return At.getClearAlpha()},this.setClearAlpha=function(){At.setClearAlpha.apply(At,arguments)},this.clear=function(y=!0,D=!0,F=!0){let O=0;if(y){let U=!1;if(b!==null){const it=b.texture.format;U=it===wa||it===Ta||it===Ea}if(U){const it=b.texture.type,ot=it===fn||it===Vn||it===Oi||it===Mi||it===ya||it===Sa,gt=At.getClearColor(),xt=At.getClearAlpha(),Rt=gt.r,Ct=gt.g,vt=gt.b;ot?(m[0]=Rt,m[1]=Ct,m[2]=vt,m[3]=xt,C.clearBufferuiv(C.COLOR,0,m)):(g[0]=Rt,g[1]=Ct,g[2]=vt,g[3]=xt,C.clearBufferiv(C.COLOR,0,g))}else O|=C.COLOR_BUFFER_BIT}D&&(O|=C.DEPTH_BUFFER_BIT,C.clearDepth(this.capabilities.reverseDepthBuffer?0:1)),F&&(O|=C.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),C.clear(O)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",j,!1),e.removeEventListener("webglcontextrestored",at,!1),e.removeEventListener("webglcontextcreationerror",ut,!1),et.dispose(),Pt.dispose(),Et.dispose(),v.dispose(),N.dispose(),Y.dispose(),ee.dispose(),L.dispose(),st.dispose(),V.dispose(),V.removeEventListener("sessionstart",Fa),V.removeEventListener("sessionend",Oa),Cn.stop()};function j(y){y.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),T=!0}function at(){console.log("THREE.WebGLRenderer: Context Restored."),T=!1;const y=Jt.autoReset,D=lt.enabled,F=lt.autoUpdate,O=lt.needsUpdate,U=lt.type;dt(),Jt.autoReset=y,lt.enabled=D,lt.autoUpdate=F,lt.needsUpdate=O,lt.type=U}function ut(y){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",y.statusMessage)}function qt(y){const D=y.target;D.removeEventListener("dispose",qt),ce(D)}function ce(y){Ce(y),Et.remove(y)}function Ce(y){const D=Et.get(y).programs;D!==void 0&&(D.forEach(function(F){st.releaseProgram(F)}),y.isShaderMaterial&&st.releaseShaderCache(y))}this.renderBufferDirect=function(y,D,F,O,U,it){D===null&&(D=It);const ot=U.isMesh&&U.matrixWorld.determinant()<0,gt=Wl(y,D,F,O,U);bt.setMaterial(O,ot);let xt=F.index,Rt=1;if(O.wireframe===!0){if(xt=J.getWireframeAttribute(F),xt===void 0)return;Rt=2}const Ct=F.drawRange,vt=F.attributes.position;let Qt=Ct.start*Rt,se=(Ct.start+Ct.count)*Rt;it!==null&&(Qt=Math.max(Qt,it.start*Rt),se=Math.min(se,(it.start+it.count)*Rt)),xt!==null?(Qt=Math.max(Qt,0),se=Math.min(se,xt.count)):vt!=null&&(Qt=Math.max(Qt,0),se=Math.min(se,vt.count));const ae=se-Qt;if(ae<0||ae===1/0)return;ee.setup(U,O,gt,F,xt);let De,$t=mt;if(xt!==null&&(De=G.get(xt),$t=Vt,$t.setIndex(De)),U.isMesh)O.wireframe===!0?(bt.setLineWidth(O.wireframeLinewidth*Gt()),$t.setMode(C.LINES)):$t.setMode(C.TRIANGLES);else if(U.isLine){let Mt=O.linewidth;Mt===void 0&&(Mt=1),bt.setLineWidth(Mt*Gt()),U.isLineSegments?$t.setMode(C.LINES):U.isLineLoop?$t.setMode(C.LINE_LOOP):$t.setMode(C.LINE_STRIP)}else U.isPoints?$t.setMode(C.POINTS):U.isSprite&&$t.setMode(C.TRIANGLES);if(U.isBatchedMesh)if(U._multiDrawInstances!==null)$t.renderMultiDrawInstances(U._multiDrawStarts,U._multiDrawCounts,U._multiDrawCount,U._multiDrawInstances);else if(Ut.get("WEBGL_multi_draw"))$t.renderMultiDraw(U._multiDrawStarts,U._multiDrawCounts,U._multiDrawCount);else{const Mt=U._multiDrawStarts,xe=U._multiDrawCounts,Zt=U._multiDrawCount,Ve=xt?G.get(xt).bytesPerElement:1,Kn=Et.get(O).currentProgram.getUniforms();for(let Ie=0;Ie<Zt;Ie++)Kn.setValue(C,"_gl_DrawID",Ie),$t.render(Mt[Ie]/Ve,xe[Ie])}else if(U.isInstancedMesh)$t.renderInstances(Qt,ae,U.count);else if(F.isInstancedBufferGeometry){const Mt=F._maxInstanceCount!==void 0?F._maxInstanceCount:1/0,xe=Math.min(F.instanceCount,Mt);$t.renderInstances(Qt,ae,xe)}else $t.render(Qt,ae)};function Kt(y,D,F){y.transparent===!0&&y.side===tn&&y.forceSinglePass===!1?(y.side=be,y.needsUpdate=!0,Yi(y,D,F),y.side=wn,y.needsUpdate=!0,Yi(y,D,F),y.side=tn):Yi(y,D,F)}this.compile=function(y,D,F=null){F===null&&(F=y),f=Pt.get(F),f.init(D),E.push(f),F.traverseVisible(function(U){U.isLight&&U.layers.test(D.layers)&&(f.pushLight(U),U.castShadow&&f.pushShadow(U))}),y!==F&&y.traverseVisible(function(U){U.isLight&&U.layers.test(D.layers)&&(f.pushLight(U),U.castShadow&&f.pushShadow(U))}),f.setupLights();const O=new Set;return y.traverse(function(U){if(!(U.isMesh||U.isPoints||U.isLine||U.isSprite))return;const it=U.material;if(it)if(Array.isArray(it))for(let ot=0;ot<it.length;ot++){const gt=it[ot];Kt(gt,F,U),O.add(gt)}else Kt(it,F,U),O.add(it)}),E.pop(),f=null,O},this.compileAsync=function(y,D,F=null){const O=this.compile(y,D,F);return new Promise(U=>{function it(){if(O.forEach(function(ot){Et.get(ot).currentProgram.isReady()&&O.delete(ot)}),O.size===0){U(y);return}setTimeout(it,10)}Ut.get("KHR_parallel_shader_compile")!==null?it():setTimeout(it,10)})};let Pe=null;function en(y){Pe&&Pe(y)}function Fa(){Cn.stop()}function Oa(){Cn.start()}const Cn=new Pl;Cn.setAnimationLoop(en),typeof self<"u"&&Cn.setContext(self),this.setAnimationLoop=function(y){Pe=y,V.setAnimationLoop(y),y===null?Cn.stop():Cn.start()},V.addEventListener("sessionstart",Fa),V.addEventListener("sessionend",Oa),this.render=function(y,D){if(D!==void 0&&D.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(T===!0)return;if(y.matrixWorldAutoUpdate===!0&&y.updateMatrixWorld(),D.parent===null&&D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),V.enabled===!0&&V.isPresenting===!0&&(V.cameraAutoUpdate===!0&&V.updateCamera(D),D=V.getCamera()),y.isScene===!0&&y.onBeforeRender(M,y,D,b),f=Pt.get(y,E.length),f.init(D),E.push(f),ht.multiplyMatrices(D.projectionMatrix,D.matrixWorldInverse),Xt.setFromProjectionMatrix(ht),nt=this.localClippingEnabled,H=Q.init(this.clippingPlanes,nt),_=et.get(y,h.length),_.init(),h.push(_),V.enabled===!0&&V.isPresenting===!0){const it=M.xr.getDepthSensingMesh();it!==null&&Ws(it,D,-1/0,M.sortObjects)}Ws(y,D,0,M.sortObjects),_.finish(),M.sortObjects===!0&&_.sort(W,ft),kt=V.enabled===!1||V.isPresenting===!1||V.hasDepthSensing()===!1,kt&&At.addToRenderList(_,y),this.info.render.frame++,H===!0&&Q.beginShadows();const F=f.state.shadowsArray;lt.render(F,y,D),H===!0&&Q.endShadows(),this.info.autoReset===!0&&this.info.reset();const O=_.opaque,U=_.transmissive;if(f.setupLights(),D.isArrayCamera){const it=D.cameras;if(U.length>0)for(let ot=0,gt=it.length;ot<gt;ot++){const xt=it[ot];za(O,U,y,xt)}kt&&At.render(y);for(let ot=0,gt=it.length;ot<gt;ot++){const xt=it[ot];Ba(_,y,xt,xt.viewport)}}else U.length>0&&za(O,U,y,D),kt&&At.render(y),Ba(_,y,D);b!==null&&(w.updateMultisampleRenderTarget(b),w.updateRenderTargetMipmap(b)),y.isScene===!0&&y.onAfterRender(M,y,D),ee.resetDefaultState(),I=-1,q=null,E.pop(),E.length>0?(f=E[E.length-1],H===!0&&Q.setGlobalState(M.clippingPlanes,f.state.camera)):f=null,h.pop(),h.length>0?_=h[h.length-1]:_=null};function Ws(y,D,F,O){if(y.visible===!1)return;if(y.layers.test(D.layers)){if(y.isGroup)F=y.renderOrder;else if(y.isLOD)y.autoUpdate===!0&&y.update(D);else if(y.isLight)f.pushLight(y),y.castShadow&&f.pushShadow(y);else if(y.isSprite){if(!y.frustumCulled||Xt.intersectsSprite(y)){O&&St.setFromMatrixPosition(y.matrixWorld).applyMatrix4(ht);const ot=Y.update(y),gt=y.material;gt.visible&&_.push(y,ot,gt,F,St.z,null)}}else if((y.isMesh||y.isLine||y.isPoints)&&(!y.frustumCulled||Xt.intersectsObject(y))){const ot=Y.update(y),gt=y.material;if(O&&(y.boundingSphere!==void 0?(y.boundingSphere===null&&y.computeBoundingSphere(),St.copy(y.boundingSphere.center)):(ot.boundingSphere===null&&ot.computeBoundingSphere(),St.copy(ot.boundingSphere.center)),St.applyMatrix4(y.matrixWorld).applyMatrix4(ht)),Array.isArray(gt)){const xt=ot.groups;for(let Rt=0,Ct=xt.length;Rt<Ct;Rt++){const vt=xt[Rt],Qt=gt[vt.materialIndex];Qt&&Qt.visible&&_.push(y,ot,Qt,F,St.z,vt)}}else gt.visible&&_.push(y,ot,gt,F,St.z,null)}}const it=y.children;for(let ot=0,gt=it.length;ot<gt;ot++)Ws(it[ot],D,F,O)}function Ba(y,D,F,O){const U=y.opaque,it=y.transmissive,ot=y.transparent;f.setupLightsView(F),H===!0&&Q.setGlobalState(M.clippingPlanes,F),O&&bt.viewport(x.copy(O)),U.length>0&&qi(U,D,F),it.length>0&&qi(it,D,F),ot.length>0&&qi(ot,D,F),bt.buffers.depth.setTest(!0),bt.buffers.depth.setMask(!0),bt.buffers.color.setMask(!0),bt.setPolygonOffset(!1)}function za(y,D,F,O){if((F.isScene===!0?F.overrideMaterial:null)!==null)return;f.state.transmissionRenderTarget[O.id]===void 0&&(f.state.transmissionRenderTarget[O.id]=new Wn(1,1,{generateMipmaps:!0,type:Ut.has("EXT_color_buffer_half_float")||Ut.has("EXT_color_buffer_float")?zi:fn,minFilter:Gn,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:jt.workingColorSpace}));const it=f.state.transmissionRenderTarget[O.id],ot=O.viewport||x;it.setSize(ot.z,ot.w);const gt=M.getRenderTarget();M.setRenderTarget(it),M.getClearColor(z),X=M.getClearAlpha(),X<1&&M.setClearColor(16777215,.5),M.clear(),kt&&At.render(F);const xt=M.toneMapping;M.toneMapping=Tn;const Rt=O.viewport;if(O.viewport!==void 0&&(O.viewport=void 0),f.setupLightsView(O),H===!0&&Q.setGlobalState(M.clippingPlanes,O),qi(y,F,O),w.updateMultisampleRenderTarget(it),w.updateRenderTargetMipmap(it),Ut.has("WEBGL_multisampled_render_to_texture")===!1){let Ct=!1;for(let vt=0,Qt=D.length;vt<Qt;vt++){const se=D[vt],ae=se.object,De=se.geometry,$t=se.material,Mt=se.group;if($t.side===tn&&ae.layers.test(O.layers)){const xe=$t.side;$t.side=be,$t.needsUpdate=!0,ka(ae,F,O,De,$t,Mt),$t.side=xe,$t.needsUpdate=!0,Ct=!0}}Ct===!0&&(w.updateMultisampleRenderTarget(it),w.updateRenderTargetMipmap(it))}M.setRenderTarget(gt),M.setClearColor(z,X),Rt!==void 0&&(O.viewport=Rt),M.toneMapping=xt}function qi(y,D,F){const O=D.isScene===!0?D.overrideMaterial:null;for(let U=0,it=y.length;U<it;U++){const ot=y[U],gt=ot.object,xt=ot.geometry,Rt=O===null?ot.material:O,Ct=ot.group;gt.layers.test(F.layers)&&ka(gt,D,F,xt,Rt,Ct)}}function ka(y,D,F,O,U,it){y.onBeforeRender(M,D,F,O,U,it),y.modelViewMatrix.multiplyMatrices(F.matrixWorldInverse,y.matrixWorld),y.normalMatrix.getNormalMatrix(y.modelViewMatrix),U.onBeforeRender(M,D,F,O,y,it),U.transparent===!0&&U.side===tn&&U.forceSinglePass===!1?(U.side=be,U.needsUpdate=!0,M.renderBufferDirect(F,D,O,U,y,it),U.side=wn,U.needsUpdate=!0,M.renderBufferDirect(F,D,O,U,y,it),U.side=tn):M.renderBufferDirect(F,D,O,U,y,it),y.onAfterRender(M,D,F,O,U,it)}function Yi(y,D,F){D.isScene!==!0&&(D=It);const O=Et.get(y),U=f.state.lights,it=f.state.shadowsArray,ot=U.state.version,gt=st.getParameters(y,U.state,it,D,F),xt=st.getProgramCacheKey(gt);let Rt=O.programs;O.environment=y.isMeshStandardMaterial?D.environment:null,O.fog=D.fog,O.envMap=(y.isMeshStandardMaterial?N:v).get(y.envMap||O.environment),O.envMapRotation=O.environment!==null&&y.envMap===null?D.environmentRotation:y.envMapRotation,Rt===void 0&&(y.addEventListener("dispose",qt),Rt=new Map,O.programs=Rt);let Ct=Rt.get(xt);if(Ct!==void 0){if(O.currentProgram===Ct&&O.lightsStateVersion===ot)return Ha(y,gt),Ct}else gt.uniforms=st.getUniforms(y),y.onBeforeCompile(gt,M),Ct=st.acquireProgram(gt,xt),Rt.set(xt,Ct),O.uniforms=gt.uniforms;const vt=O.uniforms;return(!y.isShaderMaterial&&!y.isRawShaderMaterial||y.clipping===!0)&&(vt.clippingPlanes=Q.uniform),Ha(y,gt),O.needsLights=ql(y),O.lightsStateVersion=ot,O.needsLights&&(vt.ambientLightColor.value=U.state.ambient,vt.lightProbe.value=U.state.probe,vt.directionalLights.value=U.state.directional,vt.directionalLightShadows.value=U.state.directionalShadow,vt.spotLights.value=U.state.spot,vt.spotLightShadows.value=U.state.spotShadow,vt.rectAreaLights.value=U.state.rectArea,vt.ltc_1.value=U.state.rectAreaLTC1,vt.ltc_2.value=U.state.rectAreaLTC2,vt.pointLights.value=U.state.point,vt.pointLightShadows.value=U.state.pointShadow,vt.hemisphereLights.value=U.state.hemi,vt.directionalShadowMap.value=U.state.directionalShadowMap,vt.directionalShadowMatrix.value=U.state.directionalShadowMatrix,vt.spotShadowMap.value=U.state.spotShadowMap,vt.spotLightMatrix.value=U.state.spotLightMatrix,vt.spotLightMap.value=U.state.spotLightMap,vt.pointShadowMap.value=U.state.pointShadowMap,vt.pointShadowMatrix.value=U.state.pointShadowMatrix),O.currentProgram=Ct,O.uniformsList=null,Ct}function Ga(y){if(y.uniformsList===null){const D=y.currentProgram.getUniforms();y.uniformsList=Rs.seqWithValue(D.seq,y.uniforms)}return y.uniformsList}function Ha(y,D){const F=Et.get(y);F.outputColorSpace=D.outputColorSpace,F.batching=D.batching,F.batchingColor=D.batchingColor,F.instancing=D.instancing,F.instancingColor=D.instancingColor,F.instancingMorph=D.instancingMorph,F.skinning=D.skinning,F.morphTargets=D.morphTargets,F.morphNormals=D.morphNormals,F.morphColors=D.morphColors,F.morphTargetsCount=D.morphTargetsCount,F.numClippingPlanes=D.numClippingPlanes,F.numIntersection=D.numClipIntersection,F.vertexAlphas=D.vertexAlphas,F.vertexTangents=D.vertexTangents,F.toneMapping=D.toneMapping}function Wl(y,D,F,O,U){D.isScene!==!0&&(D=It),w.resetTextureUnits();const it=D.fog,ot=O.isMeshStandardMaterial?D.environment:null,gt=b===null?M.outputColorSpace:b.isXRRenderTarget===!0?b.texture.colorSpace:Rn,xt=(O.isMeshStandardMaterial?N:v).get(O.envMap||ot),Rt=O.vertexColors===!0&&!!F.attributes.color&&F.attributes.color.itemSize===4,Ct=!!F.attributes.tangent&&(!!O.normalMap||O.anisotropy>0),vt=!!F.morphAttributes.position,Qt=!!F.morphAttributes.normal,se=!!F.morphAttributes.color;let ae=Tn;O.toneMapped&&(b===null||b.isXRRenderTarget===!0)&&(ae=M.toneMapping);const De=F.morphAttributes.position||F.morphAttributes.normal||F.morphAttributes.color,$t=De!==void 0?De.length:0,Mt=Et.get(O),xe=f.state.lights;if(H===!0&&(nt===!0||y!==q)){const Oe=y===q&&O.id===I;Q.setState(O,y,Oe)}let Zt=!1;O.version===Mt.__version?(Mt.needsLights&&Mt.lightsStateVersion!==xe.state.version||Mt.outputColorSpace!==gt||U.isBatchedMesh&&Mt.batching===!1||!U.isBatchedMesh&&Mt.batching===!0||U.isBatchedMesh&&Mt.batchingColor===!0&&U.colorTexture===null||U.isBatchedMesh&&Mt.batchingColor===!1&&U.colorTexture!==null||U.isInstancedMesh&&Mt.instancing===!1||!U.isInstancedMesh&&Mt.instancing===!0||U.isSkinnedMesh&&Mt.skinning===!1||!U.isSkinnedMesh&&Mt.skinning===!0||U.isInstancedMesh&&Mt.instancingColor===!0&&U.instanceColor===null||U.isInstancedMesh&&Mt.instancingColor===!1&&U.instanceColor!==null||U.isInstancedMesh&&Mt.instancingMorph===!0&&U.morphTexture===null||U.isInstancedMesh&&Mt.instancingMorph===!1&&U.morphTexture!==null||Mt.envMap!==xt||O.fog===!0&&Mt.fog!==it||Mt.numClippingPlanes!==void 0&&(Mt.numClippingPlanes!==Q.numPlanes||Mt.numIntersection!==Q.numIntersection)||Mt.vertexAlphas!==Rt||Mt.vertexTangents!==Ct||Mt.morphTargets!==vt||Mt.morphNormals!==Qt||Mt.morphColors!==se||Mt.toneMapping!==ae||Mt.morphTargetsCount!==$t)&&(Zt=!0):(Zt=!0,Mt.__version=O.version);let Ve=Mt.currentProgram;Zt===!0&&(Ve=Yi(O,D,U));let Kn=!1,Ie=!1,Xs=!1;const oe=Ve.getUniforms(),pn=Mt.uniforms;if(bt.useProgram(Ve.program)&&(Kn=!0,Ie=!0,Xs=!0),O.id!==I&&(I=O.id,Ie=!0),Kn||q!==y){Ot.reverseDepthBuffer?(pt.copy(y.projectionMatrix),jc(pt),Jc(pt),oe.setValue(C,"projectionMatrix",pt)):oe.setValue(C,"projectionMatrix",y.projectionMatrix),oe.setValue(C,"viewMatrix",y.matrixWorldInverse);const Oe=oe.map.cameraPosition;Oe!==void 0&&Oe.setValue(C,wt.setFromMatrixPosition(y.matrixWorld)),Ot.logarithmicDepthBuffer&&oe.setValue(C,"logDepthBufFC",2/(Math.log(y.far+1)/Math.LN2)),(O.isMeshPhongMaterial||O.isMeshToonMaterial||O.isMeshLambertMaterial||O.isMeshBasicMaterial||O.isMeshStandardMaterial||O.isShaderMaterial)&&oe.setValue(C,"isOrthographic",y.isOrthographicCamera===!0),q!==y&&(q=y,Ie=!0,Xs=!0)}if(U.isSkinnedMesh){oe.setOptional(C,U,"bindMatrix"),oe.setOptional(C,U,"bindMatrixInverse");const Oe=U.skeleton;Oe&&(Oe.boneTexture===null&&Oe.computeBoneTexture(),oe.setValue(C,"boneTexture",Oe.boneTexture,w))}U.isBatchedMesh&&(oe.setOptional(C,U,"batchingTexture"),oe.setValue(C,"batchingTexture",U._matricesTexture,w),oe.setOptional(C,U,"batchingIdTexture"),oe.setValue(C,"batchingIdTexture",U._indirectTexture,w),oe.setOptional(C,U,"batchingColorTexture"),U._colorsTexture!==null&&oe.setValue(C,"batchingColorTexture",U._colorsTexture,w));const qs=F.morphAttributes;if((qs.position!==void 0||qs.normal!==void 0||qs.color!==void 0)&&Lt.update(U,F,Ve),(Ie||Mt.receiveShadow!==U.receiveShadow)&&(Mt.receiveShadow=U.receiveShadow,oe.setValue(C,"receiveShadow",U.receiveShadow)),O.isMeshGouraudMaterial&&O.envMap!==null&&(pn.envMap.value=xt,pn.flipEnvMap.value=xt.isCubeTexture&&xt.isRenderTargetTexture===!1?-1:1),O.isMeshStandardMaterial&&O.envMap===null&&D.environment!==null&&(pn.envMapIntensity.value=D.environmentIntensity),Ie&&(oe.setValue(C,"toneMappingExposure",M.toneMappingExposure),Mt.needsLights&&Xl(pn,Xs),it&&O.fog===!0&&K.refreshFogUniforms(pn,it),K.refreshMaterialUniforms(pn,O,tt,k,f.state.transmissionRenderTarget[y.id]),Rs.upload(C,Ga(Mt),pn,w)),O.isShaderMaterial&&O.uniformsNeedUpdate===!0&&(Rs.upload(C,Ga(Mt),pn,w),O.uniformsNeedUpdate=!1),O.isSpriteMaterial&&oe.setValue(C,"center",U.center),oe.setValue(C,"modelViewMatrix",U.modelViewMatrix),oe.setValue(C,"normalMatrix",U.normalMatrix),oe.setValue(C,"modelMatrix",U.matrixWorld),O.isShaderMaterial||O.isRawShaderMaterial){const Oe=O.uniformsGroups;for(let Ys=0,Yl=Oe.length;Ys<Yl;Ys++){const Va=Oe[Ys];L.update(Va,Ve),L.bind(Va,Ve)}}return Ve}function Xl(y,D){y.ambientLightColor.needsUpdate=D,y.lightProbe.needsUpdate=D,y.directionalLights.needsUpdate=D,y.directionalLightShadows.needsUpdate=D,y.pointLights.needsUpdate=D,y.pointLightShadows.needsUpdate=D,y.spotLights.needsUpdate=D,y.spotLightShadows.needsUpdate=D,y.rectAreaLights.needsUpdate=D,y.hemisphereLights.needsUpdate=D}function ql(y){return y.isMeshLambertMaterial||y.isMeshToonMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isShadowMaterial||y.isShaderMaterial&&y.lights===!0}this.getActiveCubeFace=function(){return P},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return b},this.setRenderTargetTextures=function(y,D,F){Et.get(y.texture).__webglTexture=D,Et.get(y.depthTexture).__webglTexture=F;const O=Et.get(y);O.__hasExternalTextures=!0,O.__autoAllocateDepthBuffer=F===void 0,O.__autoAllocateDepthBuffer||Ut.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),O.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(y,D){const F=Et.get(y);F.__webglFramebuffer=D,F.__useDefaultFramebuffer=D===void 0},this.setRenderTarget=function(y,D=0,F=0){b=y,P=D,A=F;let O=!0,U=null,it=!1,ot=!1;if(y){const xt=Et.get(y);if(xt.__useDefaultFramebuffer!==void 0)bt.bindFramebuffer(C.FRAMEBUFFER,null),O=!1;else if(xt.__webglFramebuffer===void 0)w.setupRenderTarget(y);else if(xt.__hasExternalTextures)w.rebindTextures(y,Et.get(y.texture).__webglTexture,Et.get(y.depthTexture).__webglTexture);else if(y.depthBuffer){const vt=y.depthTexture;if(xt.__boundDepthTexture!==vt){if(vt!==null&&Et.has(vt)&&(y.width!==vt.image.width||y.height!==vt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");w.setupDepthRenderbuffer(y)}}const Rt=y.texture;(Rt.isData3DTexture||Rt.isDataArrayTexture||Rt.isCompressedArrayTexture)&&(ot=!0);const Ct=Et.get(y).__webglFramebuffer;y.isWebGLCubeRenderTarget?(Array.isArray(Ct[D])?U=Ct[D][F]:U=Ct[D],it=!0):y.samples>0&&w.useMultisampledRTT(y)===!1?U=Et.get(y).__webglMultisampledFramebuffer:Array.isArray(Ct)?U=Ct[F]:U=Ct,x.copy(y.viewport),S.copy(y.scissor),B=y.scissorTest}else x.copy(ct).multiplyScalar(tt).floor(),S.copy(_t).multiplyScalar(tt).floor(),B=Wt;if(bt.bindFramebuffer(C.FRAMEBUFFER,U)&&O&&bt.drawBuffers(y,U),bt.viewport(x),bt.scissor(S),bt.setScissorTest(B),it){const xt=Et.get(y.texture);C.framebufferTexture2D(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_CUBE_MAP_POSITIVE_X+D,xt.__webglTexture,F)}else if(ot){const xt=Et.get(y.texture),Rt=D||0;C.framebufferTextureLayer(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0,xt.__webglTexture,F||0,Rt)}I=-1},this.readRenderTargetPixels=function(y,D,F,O,U,it,ot){if(!(y&&y.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let gt=Et.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&ot!==void 0&&(gt=gt[ot]),gt){bt.bindFramebuffer(C.FRAMEBUFFER,gt);try{const xt=y.texture,Rt=xt.format,Ct=xt.type;if(!Ot.textureFormatReadable(Rt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Ot.textureTypeReadable(Ct)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}D>=0&&D<=y.width-O&&F>=0&&F<=y.height-U&&C.readPixels(D,F,O,U,Dt.convert(Rt),Dt.convert(Ct),it)}finally{const xt=b!==null?Et.get(b).__webglFramebuffer:null;bt.bindFramebuffer(C.FRAMEBUFFER,xt)}}},this.readRenderTargetPixelsAsync=async function(y,D,F,O,U,it,ot){if(!(y&&y.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let gt=Et.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&ot!==void 0&&(gt=gt[ot]),gt){const xt=y.texture,Rt=xt.format,Ct=xt.type;if(!Ot.textureFormatReadable(Rt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Ot.textureTypeReadable(Ct))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(D>=0&&D<=y.width-O&&F>=0&&F<=y.height-U){bt.bindFramebuffer(C.FRAMEBUFFER,gt);const vt=C.createBuffer();C.bindBuffer(C.PIXEL_PACK_BUFFER,vt),C.bufferData(C.PIXEL_PACK_BUFFER,it.byteLength,C.STREAM_READ),C.readPixels(D,F,O,U,Dt.convert(Rt),Dt.convert(Ct),0);const Qt=b!==null?Et.get(b).__webglFramebuffer:null;bt.bindFramebuffer(C.FRAMEBUFFER,Qt);const se=C.fenceSync(C.SYNC_GPU_COMMANDS_COMPLETE,0);return C.flush(),await Zc(C,se,4),C.bindBuffer(C.PIXEL_PACK_BUFFER,vt),C.getBufferSubData(C.PIXEL_PACK_BUFFER,0,it),C.deleteBuffer(vt),C.deleteSync(se),it}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(y,D=null,F=0){y.isTexture!==!0&&(As("WebGLRenderer: copyFramebufferToTexture function signature has changed."),D=arguments[0]||null,y=arguments[1]);const O=Math.pow(2,-F),U=Math.floor(y.image.width*O),it=Math.floor(y.image.height*O),ot=D!==null?D.x:0,gt=D!==null?D.y:0;w.setTexture2D(y,0),C.copyTexSubImage2D(C.TEXTURE_2D,F,0,0,ot,gt,U,it),bt.unbindTexture()},this.copyTextureToTexture=function(y,D,F=null,O=null,U=0){y.isTexture!==!0&&(As("WebGLRenderer: copyTextureToTexture function signature has changed."),O=arguments[0]||null,y=arguments[1],D=arguments[2],U=arguments[3]||0,F=null);let it,ot,gt,xt,Rt,Ct;F!==null?(it=F.max.x-F.min.x,ot=F.max.y-F.min.y,gt=F.min.x,xt=F.min.y):(it=y.image.width,ot=y.image.height,gt=0,xt=0),O!==null?(Rt=O.x,Ct=O.y):(Rt=0,Ct=0);const vt=Dt.convert(D.format),Qt=Dt.convert(D.type);w.setTexture2D(D,0),C.pixelStorei(C.UNPACK_FLIP_Y_WEBGL,D.flipY),C.pixelStorei(C.UNPACK_PREMULTIPLY_ALPHA_WEBGL,D.premultiplyAlpha),C.pixelStorei(C.UNPACK_ALIGNMENT,D.unpackAlignment);const se=C.getParameter(C.UNPACK_ROW_LENGTH),ae=C.getParameter(C.UNPACK_IMAGE_HEIGHT),De=C.getParameter(C.UNPACK_SKIP_PIXELS),$t=C.getParameter(C.UNPACK_SKIP_ROWS),Mt=C.getParameter(C.UNPACK_SKIP_IMAGES),xe=y.isCompressedTexture?y.mipmaps[U]:y.image;C.pixelStorei(C.UNPACK_ROW_LENGTH,xe.width),C.pixelStorei(C.UNPACK_IMAGE_HEIGHT,xe.height),C.pixelStorei(C.UNPACK_SKIP_PIXELS,gt),C.pixelStorei(C.UNPACK_SKIP_ROWS,xt),y.isDataTexture?C.texSubImage2D(C.TEXTURE_2D,U,Rt,Ct,it,ot,vt,Qt,xe.data):y.isCompressedTexture?C.compressedTexSubImage2D(C.TEXTURE_2D,U,Rt,Ct,xe.width,xe.height,vt,xe.data):C.texSubImage2D(C.TEXTURE_2D,U,Rt,Ct,it,ot,vt,Qt,xe),C.pixelStorei(C.UNPACK_ROW_LENGTH,se),C.pixelStorei(C.UNPACK_IMAGE_HEIGHT,ae),C.pixelStorei(C.UNPACK_SKIP_PIXELS,De),C.pixelStorei(C.UNPACK_SKIP_ROWS,$t),C.pixelStorei(C.UNPACK_SKIP_IMAGES,Mt),U===0&&D.generateMipmaps&&C.generateMipmap(C.TEXTURE_2D),bt.unbindTexture()},this.copyTextureToTexture3D=function(y,D,F=null,O=null,U=0){y.isTexture!==!0&&(As("WebGLRenderer: copyTextureToTexture3D function signature has changed."),F=arguments[0]||null,O=arguments[1]||null,y=arguments[2],D=arguments[3],U=arguments[4]||0);let it,ot,gt,xt,Rt,Ct,vt,Qt,se;const ae=y.isCompressedTexture?y.mipmaps[U]:y.image;F!==null?(it=F.max.x-F.min.x,ot=F.max.y-F.min.y,gt=F.max.z-F.min.z,xt=F.min.x,Rt=F.min.y,Ct=F.min.z):(it=ae.width,ot=ae.height,gt=ae.depth,xt=0,Rt=0,Ct=0),O!==null?(vt=O.x,Qt=O.y,se=O.z):(vt=0,Qt=0,se=0);const De=Dt.convert(D.format),$t=Dt.convert(D.type);let Mt;if(D.isData3DTexture)w.setTexture3D(D,0),Mt=C.TEXTURE_3D;else if(D.isDataArrayTexture||D.isCompressedArrayTexture)w.setTexture2DArray(D,0),Mt=C.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}C.pixelStorei(C.UNPACK_FLIP_Y_WEBGL,D.flipY),C.pixelStorei(C.UNPACK_PREMULTIPLY_ALPHA_WEBGL,D.premultiplyAlpha),C.pixelStorei(C.UNPACK_ALIGNMENT,D.unpackAlignment);const xe=C.getParameter(C.UNPACK_ROW_LENGTH),Zt=C.getParameter(C.UNPACK_IMAGE_HEIGHT),Ve=C.getParameter(C.UNPACK_SKIP_PIXELS),Kn=C.getParameter(C.UNPACK_SKIP_ROWS),Ie=C.getParameter(C.UNPACK_SKIP_IMAGES);C.pixelStorei(C.UNPACK_ROW_LENGTH,ae.width),C.pixelStorei(C.UNPACK_IMAGE_HEIGHT,ae.height),C.pixelStorei(C.UNPACK_SKIP_PIXELS,xt),C.pixelStorei(C.UNPACK_SKIP_ROWS,Rt),C.pixelStorei(C.UNPACK_SKIP_IMAGES,Ct),y.isDataTexture||y.isData3DTexture?C.texSubImage3D(Mt,U,vt,Qt,se,it,ot,gt,De,$t,ae.data):D.isCompressedArrayTexture?C.compressedTexSubImage3D(Mt,U,vt,Qt,se,it,ot,gt,De,ae.data):C.texSubImage3D(Mt,U,vt,Qt,se,it,ot,gt,De,$t,ae),C.pixelStorei(C.UNPACK_ROW_LENGTH,xe),C.pixelStorei(C.UNPACK_IMAGE_HEIGHT,Zt),C.pixelStorei(C.UNPACK_SKIP_PIXELS,Ve),C.pixelStorei(C.UNPACK_SKIP_ROWS,Kn),C.pixelStorei(C.UNPACK_SKIP_IMAGES,Ie),U===0&&D.generateMipmaps&&C.generateMipmap(Mt),bt.unbindTexture()},this.initRenderTarget=function(y){Et.get(y).__webglFramebuffer===void 0&&w.setupRenderTarget(y)},this.initTexture=function(y){y.isCubeTexture?w.setTextureCube(y,0):y.isData3DTexture?w.setTexture3D(y,0):y.isDataArrayTexture||y.isCompressedArrayTexture?w.setTexture2DArray(y,0):w.setTexture2D(y,0),bt.unbindTexture()},this.resetState=function(){P=0,A=0,b=null,bt.reset(),ee.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return dn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=t===ba?"display-p3":"srgb",e.unpackColorSpace=jt.workingColorSpace===Gs?"display-p3":"srgb"}}class La{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new zt(t),this.near=e,this.far=n}clone(){return new La(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class hm extends de{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new He,this.environmentIntensity=1,this.environmentRotation=new He,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class yn extends Yn{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new zt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const Os=new R,Bs=new R,zo=new ie,Li=new Hi,ms=new Gi,Er=new R,ko=new R;class dm extends de{constructor(t=new Re,e=new yn){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let s=1,r=e.count;s<r;s++)Os.fromBufferAttribute(e,s-1),Bs.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=Os.distanceTo(Bs);t.setAttribute("lineDistance",new ue(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ms.copy(n.boundingSphere),ms.applyMatrix4(s),ms.radius+=r,t.ray.intersectsSphere(ms)===!1)return;zo.copy(s).invert(),Li.copy(t.ray).applyMatrix4(zo);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,d=n.index,p=n.attributes.position;if(d!==null){const m=Math.max(0,a.start),g=Math.min(d.count,a.start+a.count);for(let _=m,f=g-1;_<f;_+=l){const h=d.getX(_),E=d.getX(_+1),M=gs(this,t,Li,c,h,E);M&&e.push(M)}if(this.isLineLoop){const _=d.getX(g-1),f=d.getX(m),h=gs(this,t,Li,c,_,f);h&&e.push(h)}}else{const m=Math.max(0,a.start),g=Math.min(p.count,a.start+a.count);for(let _=m,f=g-1;_<f;_+=l){const h=gs(this,t,Li,c,_,_+1);h&&e.push(h)}if(this.isLineLoop){const _=gs(this,t,Li,c,g-1,m);_&&e.push(_)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function gs(i,t,e,n,s,r){const a=i.geometry.attributes.position;if(Os.fromBufferAttribute(a,s),Bs.fromBufferAttribute(a,r),e.distanceSqToSegment(Os,Bs,Er,ko)>n)return;Er.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(Er);if(!(c<t.near||c>t.far))return{distance:c,point:ko.clone().applyMatrix4(i.matrixWorld),index:s,face:null,faceIndex:null,barycoord:null,object:i}}const Go=new R,Ho=new R;class je extends dm{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[];for(let s=0,r=e.count;s<r;s+=2)Go.fromBufferAttribute(e,s),Ho.fromBufferAttribute(e,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+Go.distanceTo(Ho);t.setAttribute("lineDistance",new ue(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Ol extends Yn{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new zt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const Vo=new ie,ma=new Hi,_s=new Gi,xs=new R;class um extends de{constructor(t=new Re,e=new Ol){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),_s.copy(n.boundingSphere),_s.applyMatrix4(s),_s.radius+=r,t.ray.intersectsSphere(_s)===!1)return;Vo.copy(s).invert(),ma.copy(t.ray).applyMatrix4(Vo);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=n.index,u=n.attributes.position;if(l!==null){const p=Math.max(0,a.start),m=Math.min(l.count,a.start+a.count);for(let g=p,_=m;g<_;g++){const f=l.getX(g);xs.fromBufferAttribute(u,f),Wo(xs,f,c,s,t,e,this)}}else{const p=Math.max(0,a.start),m=Math.min(u.count,a.start+a.count);for(let g=p,_=m;g<_;g++)xs.fromBufferAttribute(u,g),Wo(xs,g,c,s,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function Wo(i,t,e,n,s,r,a){const o=ma.distanceSqToPoint(i);if(o<e){const c=new R;ma.closestPointToPoint(i,c),c.applyMatrix4(n);const l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:t,face:null,faceIndex:null,barycoord:null,object:a})}}class Vi extends Ae{constructor(t,e,n,s,r,a,o,c,l){super(t,e,n,s,r,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Da extends Re{constructor(t=1,e=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:s},e=Math.max(3,e);const r=[],a=[],o=[],c=[],l=new R,d=new Yt;a.push(0,0,0),o.push(0,0,1),c.push(.5,.5);for(let u=0,p=3;u<=e;u++,p+=3){const m=n+u/e*s;l.x=t*Math.cos(m),l.y=t*Math.sin(m),a.push(l.x,l.y,l.z),o.push(0,0,1),d.x=(a[p]/t+1)/2,d.y=(a[p+1]/t+1)/2,c.push(d.x,d.y)}for(let u=1;u<=e;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new ue(a,3)),this.setAttribute("normal",new ue(o,3)),this.setAttribute("uv",new ue(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Da(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class Ht extends Re{constructor(t=1,e=1,n=1,s=32,r=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:c};const l=this;s=Math.floor(s),r=Math.floor(r);const d=[],u=[],p=[],m=[];let g=0;const _=[],f=n/2;let h=0;E(),a===!1&&(t>0&&M(!0),e>0&&M(!1)),this.setIndex(d),this.setAttribute("position",new ue(u,3)),this.setAttribute("normal",new ue(p,3)),this.setAttribute("uv",new ue(m,2));function E(){const T=new R,P=new R;let A=0;const b=(e-t)/n;for(let I=0;I<=r;I++){const q=[],x=I/r,S=x*(e-t)+t;for(let B=0;B<=s;B++){const z=B/s,X=z*c+o,Z=Math.sin(X),k=Math.cos(X);P.x=S*Z,P.y=-x*n+f,P.z=S*k,u.push(P.x,P.y,P.z),T.set(Z,b,k).normalize(),p.push(T.x,T.y,T.z),m.push(z,1-x),q.push(g++)}_.push(q)}for(let I=0;I<s;I++)for(let q=0;q<r;q++){const x=_[q][I],S=_[q+1][I],B=_[q+1][I+1],z=_[q][I+1];t>0&&(d.push(x,S,z),A+=3),e>0&&(d.push(S,B,z),A+=3)}l.addGroup(h,A,0),h+=A}function M(T){const P=g,A=new Yt,b=new R;let I=0;const q=T===!0?t:e,x=T===!0?1:-1;for(let B=1;B<=s;B++)u.push(0,f*x,0),p.push(0,x,0),m.push(.5,.5),g++;const S=g;for(let B=0;B<=s;B++){const X=B/s*c+o,Z=Math.cos(X),k=Math.sin(X);b.x=q*k,b.y=f*x,b.z=q*Z,u.push(b.x,b.y,b.z),p.push(0,x,0),A.x=Z*.5+.5,A.y=k*.5*x+.5,m.push(A.x,A.y),g++}for(let B=0;B<s;B++){const z=P+B,X=S+B;T===!0?d.push(X,X+1,z):d.push(X+1,X,z),I+=3}l.addGroup(h,I,T===!0?1:2),h+=I}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ht(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Wi extends Ht{constructor(t=1,e=1,n=32,s=1,r=!1,a=0,o=Math.PI*2){super(0,t,e,n,s,r,a,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(t){return new Wi(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}const vs=new R,Ms=new R,Tr=new R,ys=new ke;class Je extends Re{constructor(t=null,e=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:t,thresholdAngle:e},t!==null){const s=Math.pow(10,4),r=Math.cos(mi*e),a=t.getIndex(),o=t.getAttribute("position"),c=a?a.count:o.count,l=[0,0,0],d=["a","b","c"],u=new Array(3),p={},m=[];for(let g=0;g<c;g+=3){a?(l[0]=a.getX(g),l[1]=a.getX(g+1),l[2]=a.getX(g+2)):(l[0]=g,l[1]=g+1,l[2]=g+2);const{a:_,b:f,c:h}=ys;if(_.fromBufferAttribute(o,l[0]),f.fromBufferAttribute(o,l[1]),h.fromBufferAttribute(o,l[2]),ys.getNormal(Tr),u[0]=`${Math.round(_.x*s)},${Math.round(_.y*s)},${Math.round(_.z*s)}`,u[1]=`${Math.round(f.x*s)},${Math.round(f.y*s)},${Math.round(f.z*s)}`,u[2]=`${Math.round(h.x*s)},${Math.round(h.y*s)},${Math.round(h.z*s)}`,!(u[0]===u[1]||u[1]===u[2]||u[2]===u[0]))for(let E=0;E<3;E++){const M=(E+1)%3,T=u[E],P=u[M],A=ys[d[E]],b=ys[d[M]],I=`${T}_${P}`,q=`${P}_${T}`;q in p&&p[q]?(Tr.dot(p[q].normal)<=r&&(m.push(A.x,A.y,A.z),m.push(b.x,b.y,b.z)),p[q]=null):I in p||(p[I]={index0:l[E],index1:l[M],normal:Tr.clone()})}}for(const g in p)if(p[g]){const{index0:_,index1:f}=p[g];vs.fromBufferAttribute(o,_),Ms.fromBufferAttribute(o,f),m.push(vs.x,vs.y,vs.z),m.push(Ms.x,Ms.y,Ms.z)}this.setAttribute("position",new ue(m,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}}class Xi extends Re{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const c=Math.min(a+o,Math.PI);let l=0;const d=[],u=new R,p=new R,m=[],g=[],_=[],f=[];for(let h=0;h<=n;h++){const E=[],M=h/n;let T=0;h===0&&a===0?T=.5/e:h===n&&c===Math.PI&&(T=-.5/e);for(let P=0;P<=e;P++){const A=P/e;u.x=-t*Math.cos(s+A*r)*Math.sin(a+M*o),u.y=t*Math.cos(a+M*o),u.z=t*Math.sin(s+A*r)*Math.sin(a+M*o),g.push(u.x,u.y,u.z),p.copy(u).normalize(),_.push(p.x,p.y,p.z),f.push(A+T,1-M),E.push(l++)}d.push(E)}for(let h=0;h<n;h++)for(let E=0;E<e;E++){const M=d[h][E+1],T=d[h][E],P=d[h+1][E],A=d[h+1][E+1];(h!==0||a>0)&&m.push(M,T,A),(h!==n-1||c<Math.PI)&&m.push(T,P,A)}this.setIndex(m),this.setAttribute("position",new ue(g,3)),this.setAttribute("normal",new ue(_,3)),this.setAttribute("uv",new ue(f,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Xi(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class ne extends Yn{constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new zt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new zt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=vl,this.normalScale=new Yt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new He,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Ia extends de{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new zt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class fm extends Ia{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(de.DEFAULT_UP),this.updateMatrix(),this.groundColor=new zt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const wr=new ie,Xo=new R,qo=new R;class Bl{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Yt(512,512),this.map=null,this.mapPass=null,this.matrix=new ie,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ca,this._frameExtents=new Yt(1,1),this._viewportCount=1,this._viewports=[new te(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;Xo.setFromMatrixPosition(t.matrixWorld),e.position.copy(Xo),qo.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(qo),e.updateMatrixWorld(),wr.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(wr),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(wr)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const Yo=new ie,Di=new R,br=new R;class pm extends Bl{constructor(){super(new Fe(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Yt(4,2),this._viewportCount=6,this._viewports=[new te(2,1,1,1),new te(0,1,1,1),new te(3,1,1,1),new te(1,1,1,1),new te(3,0,1,1),new te(1,0,1,1)],this._cubeDirections=[new R(1,0,0),new R(-1,0,0),new R(0,0,1),new R(0,0,-1),new R(0,1,0),new R(0,-1,0)],this._cubeUps=[new R(0,1,0),new R(0,1,0),new R(0,1,0),new R(0,1,0),new R(0,0,1),new R(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,s=this.matrix,r=t.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),Di.setFromMatrixPosition(t.matrixWorld),n.position.copy(Di),br.copy(n.position),br.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(br),n.updateMatrixWorld(),s.makeTranslation(-Di.x,-Di.y,-Di.z),Yo.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Yo)}}class Ko extends Ia{constructor(t,e,n=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new pm}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class mm extends Bl{constructor(){super(new Ll(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class $o extends Ia{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(de.DEFAULT_UP),this.updateMatrix(),this.target=new de,this.shadow=new mm}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class gm{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Zo(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=Zo();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function Zo(){return performance.now()}const jo=new ie;class _m{constructor(t,e,n=0,s=1/0){this.ray=new Hi(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new Ra,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return jo.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(jo),this}intersectObject(t,e=!0,n=[]){return ga(t,this,n,e),n.sort(Jo),n}intersectObjects(t,e=!0,n=[]){for(let s=0,r=t.length;s<r;s++)ga(t[s],this,n,e);return n.sort(Jo),n}}function Jo(i,t){return i.distance-t.distance}function ga(i,t,e,n){let s=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let a=0,o=r.length;a<o;a++)ga(r[a],t,e,!0)}}class xm extends Xn{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:va}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=va);const ci=new He(0,0,0,"YXZ"),hi=new R,vm={type:"change"},Mm={type:"lock"},ym={type:"unlock"},Qo=Math.PI/2;class Sm extends xm{constructor(t,e=null){super(t,e),this.isLocked=!1,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.pointerSpeed=1,this._onMouseMove=Em.bind(this),this._onPointerlockChange=Tm.bind(this),this._onPointerlockError=wm.bind(this),this.domElement!==null&&this.connect()}connect(){this.domElement.ownerDocument.addEventListener("mousemove",this._onMouseMove),this.domElement.ownerDocument.addEventListener("pointerlockchange",this._onPointerlockChange),this.domElement.ownerDocument.addEventListener("pointerlockerror",this._onPointerlockError)}disconnect(){this.domElement.ownerDocument.removeEventListener("mousemove",this._onMouseMove),this.domElement.ownerDocument.removeEventListener("pointerlockchange",this._onPointerlockChange),this.domElement.ownerDocument.removeEventListener("pointerlockerror",this._onPointerlockError)}dispose(){this.disconnect()}getObject(){return console.warn("THREE.PointerLockControls: getObject() has been deprecated. Use controls.object instead."),this.object}getDirection(t){return t.set(0,0,-1).applyQuaternion(this.object.quaternion)}moveForward(t){if(this.enabled===!1)return;const e=this.object;hi.setFromMatrixColumn(e.matrix,0),hi.crossVectors(e.up,hi),e.position.addScaledVector(hi,t)}moveRight(t){if(this.enabled===!1)return;const e=this.object;hi.setFromMatrixColumn(e.matrix,0),e.position.addScaledVector(hi,t)}lock(){this.domElement.requestPointerLock()}unlock(){this.domElement.ownerDocument.exitPointerLock()}}function Em(i){if(this.enabled===!1||this.isLocked===!1)return;const t=i.movementX||i.mozMovementX||i.webkitMovementX||0,e=i.movementY||i.mozMovementY||i.webkitMovementY||0,n=this.object;ci.setFromQuaternion(n.quaternion),ci.y-=t*.002*this.pointerSpeed,ci.x-=e*.002*this.pointerSpeed,ci.x=Math.max(Qo-this.maxPolarAngle,Math.min(Qo-this.minPolarAngle,ci.x)),n.quaternion.setFromEuler(ci),this.dispatchEvent(vm)}function Tm(){this.domElement.ownerDocument.pointerLockElement===this.domElement?(this.dispatchEvent(Mm),this.isLocked=!0):(this.dispatchEvent(ym),this.isLocked=!1)}function wm(){console.error("THREE.PointerLockControls: Unable to use Pointer Lock API")}class bm{constructor(){this._listeners={}}on(t,e){return this._listeners[t]||(this._listeners[t]=[]),this._listeners[t].push(e),()=>this.off(t,e)}off(t,e){this._listeners[t]&&(this._listeners[t]=this._listeners[t].filter(n=>n!==e))}emit(t,...e){this._listeners[t]&&this._listeners[t].forEach(n=>n(...e))}once(t,e){const n=(...s)=>{e(...s),this.off(t,n)};this.on(t,n)}}const Tt=new bm;class Am{constructor(){this.scene=new hm,this.camera=new Fe(90,window.innerWidth/window.innerHeight,.05,500),this.renderer=new cm({antialias:!0,powerPreference:"high-performance"}),this.controls=null,this.clock=new gm,this.running=!1,this._frameId=null,this._updateFns=[],this.scene.add(this.camera),this._initRenderer(),this._initControls(),this._handleResize()}_initRenderer(){this.renderer.setSize(window.innerWidth,window.innerHeight),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=rl,this.renderer.outputColorSpace=Ye,this.renderer.toneMapping=ol,this.renderer.toneMappingExposure=1.1,this.renderer.setClearColor(7385850,1),this.scene.background=new zt(7385850);const t=document.getElementById("canvas-wrapper");t&&(t.innerHTML="",t.appendChild(this.renderer.domElement))}_initControls(){this.controls=new Sm(this.camera,this.renderer.domElement),this.controls.addEventListener("lock",()=>{Tt.emit("controls:locked")}),this.controls.addEventListener("unlock",()=>{Tt.emit("controls:unlocked")}),document.getElementById("game-container").addEventListener("click",e=>{const n=document.getElementById("play-overlay");n&&!n.classList.contains("hidden")||e.target.closest("button")||e.target.closest("#po-play-btn")||this.controls.isLocked||this.controls.lock()})}_handleResize(){window.addEventListener("resize",()=>this.resize())}resize(){const t=window.innerWidth,e=window.innerHeight;this.camera.aspect=t/e,this.camera.updateProjectionMatrix(),this.renderer.setSize(t,e)}addUpdateFn(t){this._updateFns.push(t)}removeUpdateFn(t){this._updateFns=this._updateFns.filter(e=>e!==t)}start(){this.running||(this.running=!0,this.clock.start(),this.resize(),this._loop())}stop(){this.running=!1,this._frameId&&cancelAnimationFrame(this._frameId),this._frameId=null}_loop(){this._frameId=requestAnimationFrame(()=>this._loop());const t=Math.min(this.clock.getDelta(),.05);for(const e of this._updateFns)e(t);this.renderer.render(this.scene,this.camera)}get isLocked(){var t;return((t=this.controls)==null?void 0:t.isLocked)??!1}lockPointer(){var t;(t=this.controls)==null||t.lock()}unlockPointer(){var t;(t=this.controls)==null||t.unlock()}}function Rm(){const i=document.createElement("canvas");i.width=1024,i.height=1024;const t=i.getContext("2d");t.fillStyle="#8f8072",t.fillRect(0,0,1024,1024);const e=128,n=["#f4ede2","#ebdccb","#f7f1e6","#e7dabf","#efe5d6","#f2e8da","#e2d3be","#eadecd"];for(let a=0;a<8;a++)for(let o=0;o<8;o++){const c=o*e,l=a*e,d=(a*3+o*5+a*o)%n.length;t.fillStyle=n[d],t.fillRect(c+4,l+4,e-8,e-8);const u=t.createLinearGradient(c,l,c+e,l+e);u.addColorStop(0,"rgba(255, 255, 255, 0.55)"),u.addColorStop(.5,"rgba(255, 255, 255, 0.10)"),u.addColorStop(1,"rgba(120, 100, 80, 0.14)"),t.fillStyle=u,t.fillRect(c+4,l+4,e-8,e-8),t.fillStyle="rgba(255, 255, 255, 0.85)",t.fillRect(c+4,l+4,e-8,3),t.fillRect(c+4,l+4,3,e-8),t.fillStyle="rgba(90, 75, 60, 0.38)",t.fillRect(c+4,l+e-7,e-8,3),t.fillRect(c+e-7,l+4,3,e-8),t.fillStyle="#9a8b7c",(a+o)%2===0?(t.fillRect(c+e/2-1,l+4,3,e-8),t.fillStyle="rgba(255, 255, 255, 0.4)",t.fillRect(c+e/2+2,l+4,1,e-8)):(t.fillRect(c+4,l+e/2-1,e-8,3),t.fillStyle="rgba(255, 255, 255, 0.4)",t.fillRect(c+4,l+e/2+2,e-8,1))}for(let a=0;a<22e3;a++){const o=Math.random()*1024,c=Math.random()*1024,l=Math.random()>.4;t.fillStyle=l?"rgba(255, 255, 255, 0.35)":"rgba(140, 120, 100, 0.18)",t.fillRect(o,c,2,2)}t.strokeStyle="#f59e0b",t.lineWidth=8,t.setLineDash([36,20]),t.beginPath(),t.moveTo(64,512),t.lineTo(960,512),t.stroke(),t.setLineDash([]),t.strokeStyle="rgba(255, 255, 255, 0.75)",t.lineWidth=6,t.strokeRect(128,128,768,768),t.strokeStyle="rgba(255, 70, 85, 0.65)",t.lineWidth=4,t.strokeRect(144,144,736,736),t.strokeStyle="#00f0ff",t.lineWidth=3;const s=[256,512,768];for(const a of s)for(const o of s)t.beginPath(),t.moveTo(a-20,o),t.lineTo(a+20,o),t.moveTo(a,o-20),t.lineTo(a,o+20),t.stroke(),t.strokeRect(a-8,o-8,16,16);const r=new Vi(i);return r.wrapS=Hn,r.wrapT=Hn,r.repeat.set(12,12),r.anisotropy=8,r.needsUpdate=!0,r}function Cm(){const i=document.createElement("canvas");i.width=256,i.height=256;const t=i.getContext("2d"),e=128,n=128,s=t.createRadialGradient(e,n,4,e,n,120);s.addColorStop(0,"rgba(255, 255, 255, 1)"),s.addColorStop(.12,"rgba(255, 235, 100, 0.95)"),s.addColorStop(.35,"rgba(255, 130, 20, 0.7)"),s.addColorStop(.7,"rgba(255, 50, 10, 0.25)"),s.addColorStop(1,"rgba(255, 0, 0, 0)"),t.save(),t.translate(e,n);for(let o=0;o<4;o++)t.rotate(Math.PI/2),t.beginPath(),t.moveTo(0,0),t.lineTo(-10,20),t.lineTo(0,122),t.lineTo(10,20),t.closePath(),t.fillStyle=s,t.fill();for(let o=0;o<4;o++)t.rotate(Math.PI/2),t.beginPath(),t.moveTo(0,0),t.lineTo(-6,12),t.lineTo(0,80),t.lineTo(6,12),t.closePath(),t.fillStyle=s,t.fill();t.beginPath(),t.moveTo(0,-38),t.lineTo(38,0),t.lineTo(0,38),t.lineTo(-38,0),t.closePath(),t.fillStyle="#ffffff",t.fill();const r=t.createRadialGradient(0,0,2,0,0,42);return r.addColorStop(0,"#ffffff"),r.addColorStop(.4,"rgba(255, 248, 190, 0.95)"),r.addColorStop(1,"rgba(255, 170, 30, 0)"),t.fillStyle=r,t.beginPath(),t.arc(0,0,42,0,Math.PI*2),t.fill(),t.restore(),new Vi(i)}function Pm(){const i=document.createElement("canvas");i.width=1024,i.height=1024;const t=i.getContext("2d");t.fillStyle="#c5a47e",t.fillRect(0,0,1024,1024);const e=48,n=112,s=["#b8946e","#be9b74","#c9a882","#b38f69","#caa67f"];for(let a=0;a<=1024;a+=e){const c=Math.floor(a/e)%2===1?n/2:0;t.fillStyle="rgba(40, 30, 20, 0.35)",t.fillRect(0,a,1024,5);for(let l=-n+c;l<=1024;l+=n){const d=s[Math.abs(Math.floor(l/40)+Math.floor(a/20))%s.length];t.fillStyle=d,t.fillRect(l+3,a+4,n-6,e-7),t.fillStyle="rgba(255, 255, 255, 0.12)",t.fillRect(l+3,a+4,n-6,3),t.fillStyle="rgba(0, 0, 0, 0.25)",t.fillRect(l+3,a+e-6,n-6,3),t.fillStyle="rgba(40, 30, 20, 0.35)",t.fillRect(l+n-3,a,5,e)}}for(let a=0;a<8e3;a++){const o=Math.random()*1024,c=Math.random()*1024;t.fillStyle=Math.random()>.5?"rgba(255, 255, 255, 0.08)":"rgba(0, 0, 0, 0.08)",t.fillRect(o,c,2,2)}t.fillStyle="#6b543d",t.fillRect(0,930,1024,94),t.fillStyle="rgba(255, 255, 255, 0.22)",t.fillRect(0,930,1024,6),t.fillStyle="rgba(0, 0, 0, 0.4)",t.fillRect(0,936,1024,4);const r=new Vi(i);return r.wrapS=Hn,r.wrapT=Hn,r.repeat.set(2,2),r.anisotropy=8,r.needsUpdate=!0,r}function Lm(){const i=document.createElement("canvas");i.width=512,i.height=512;const t=i.getContext("2d");t.fillStyle="#042f24",t.fillRect(0,0,512,512),t.fillStyle="rgba(52, 211, 153, 0.15)",t.fillRect(10,10,492,492),t.fillStyle="#064e3b",t.fillRect(24,24,464,464);const e=t.createRadialGradient(256,256,15,256,256,220);e.addColorStop(0,"#6ee7b7"),e.addColorStop(.35,"#10b981"),e.addColorStop(.7,"#059669"),e.addColorStop(1,"#022c22"),t.fillStyle=e,t.beginPath(),t.moveTo(256,60),t.lineTo(452,256),t.lineTo(256,452),t.lineTo(60,256),t.closePath(),t.fill(),t.strokeStyle="#a7f3d0",t.lineWidth=6,t.stroke(),t.strokeStyle="rgba(255, 255, 255, 0.7)",t.lineWidth=3,t.beginPath(),t.moveTo(256,110),t.lineTo(402,256),t.lineTo(256,402),t.lineTo(110,256),t.closePath(),t.stroke();const n=new Vi(i);return n.anisotropy=8,n.needsUpdate=!0,n}function Dm(i){const t=document.createElement("canvas");t.width=1024,t.height=1024;const e=t.getContext("2d"),n=e.createLinearGradient(0,0,0,1024);n.addColorStop(0,"#1b6bd6"),n.addColorStop(.25,"#3b8fee"),n.addColorStop(.48,"#70b2fa"),n.addColorStop(.62,"#b2d9fc"),n.addColorStop(.7,"#e2f0fe"),n.addColorStop(.74,"#ebe2d5"),n.addColorStop(1,"#d2c4b0"),e.fillStyle=n,e.fillRect(0,0,1024,1024);const s=[{fill:"rgba(255, 255, 255, 0.85)",shadow:"rgba(180, 210, 245, 0.45)",y:220,r:55},{fill:"rgba(255, 255, 255, 0.75)",shadow:"rgba(185, 215, 245, 0.40)",y:350,r:75},{fill:"rgba(255, 255, 255, 0.60)",shadow:"rgba(200, 225, 250, 0.35)",y:480,r:90}];for(const _ of s)for(let f=0;f<14;f++){const h=(f*85+Math.sin(f*3.7)*40)%1024,E=_.y+Math.cos(f*4.2)*30,M=_.r+f%3*18;e.fillStyle=_.shadow,e.beginPath(),e.arc(h,E+8,M,0,Math.PI*2),e.arc(h+M*.7,E+M*.1,M*.75,0,Math.PI*2),e.arc(h-M*.7,E+M*.15,M*.7,0,Math.PI*2),e.fill(),e.fillStyle=_.fill,e.beginPath(),e.arc(h,E,M,0,Math.PI*2),e.arc(h+M*.7,E-M*.2,M*.75,0,Math.PI*2),e.arc(h-M*.7,E-M*.1,M*.7,0,Math.PI*2),e.arc(h+M*1.3,E+M*.1,M*.6,0,Math.PI*2),e.fill()}const r=e.createRadialGradient(760,240,10,760,240,260);r.addColorStop(0,"rgba(255, 255, 240, 1.0)"),r.addColorStop(.15,"rgba(255, 245, 180, 0.75)"),r.addColorStop(.4,"rgba(255, 215, 130, 0.35)"),r.addColorStop(.75,"rgba(255, 190, 100, 0.10)"),r.addColorStop(1,"rgba(255, 190, 100, 0)"),e.fillStyle=r,e.beginPath(),e.arc(760,240,260,0,Math.PI*2),e.fill();const a=new Vi(t);a.needsUpdate=!0;const o=new Xi(280,36,24),c=new Le({map:a,side:be,depthWrite:!1,depthTest:!0}),l=new $(o,c);l.position.y=0,l.renderOrder=-100,i.add(l);const d=new le,u=[14067832,14595212,13145960,14992286],p=[12733996,12076068,13524024],m=u.map(_=>new ne({color:_,roughness:.75,metalness:.1})),g=p.map(_=>new ne({color:_,roughness:.65,metalness:.15}));for(let _=0;_<36;_++){const f=_/36*Math.PI*2,h=85+_%4*16,E=12+_%4*6,M=18+_%5*10,T=12+_%2*6,P=m[_%m.length],A=new yt(E,M,T),b=new $(A,P);if(b.position.set(Math.cos(f)*h,M/2-2,Math.sin(f)*h),b.receiveShadow=!0,d.add(b),M>22){const I=g[_%g.length],q=new Wi(E*.72,7,4),x=new $(q,I);x.position.set(Math.cos(f)*h,M+1.5,Math.sin(f)*h),x.rotation.y=Math.PI/4,x.receiveShadow=!0,d.add(x)}}return i.add(d),{skyMesh:l,bgGroup:d}}class Im{constructor(t){this.scene=t,this.colliders=[],this.group=new le,this.scene.add(this.group),this.skyDomeData=null}async load(t){this.clear();const e=Rm(),n=Pm(),s=Lm();this.materials={ground:new ne({map:e,roughness:.7,metalness:.05}),wall:new ne({map:n,roughness:.65,metalness:.1}),box:new ne({color:10121802,roughness:.7,metalness:.1}),platform:new ne({color:9083560,roughness:.55,metalness:.15}),structure:new ne({map:n,roughness:.7,metalness:.1}),radianite:new ne({map:s,emissive:366185,emissiveIntensity:.45,roughness:.3,metalness:.4})},this.edgeMaterials={ground:new yn({color:61695,transparent:!0,opacity:.25}),wall:new yn({color:14861465,transparent:!0,opacity:.45}),box:new yn({color:14251782,transparent:!0,opacity:.65}),platform:new yn({color:61695,transparent:!0,opacity:.65}),structure:new yn({color:11900010,transparent:!0,opacity:.45}),radianite:new yn({color:3462041,transparent:!0,opacity:.95})},this.skyDomeData=Dm(this.scene),this.scene.background=new zt(11721212),this.scene.fog=new La(12115194,t.fogNear??140,t.fogFar??350);const r=new An(600,600),a=new ne({map:e,roughness:.75,metalness:.05}),o=new $(r,a);o.rotation.x=-Math.PI/2,o.position.y=-.51,o.receiveShadow=!0,this.group.add(o);const c=new fm(15267071,13680808,1.25);this.group.add(c);const l=new $o(16775406,1.65);l.position.set(40,65,30),l.castShadow=!0,l.shadow.mapSize.width=2048,l.shadow.mapSize.height=2048,l.shadow.camera.near=.5,l.shadow.camera.far=180,l.shadow.camera.left=-55,l.shadow.camera.right=55,l.shadow.camera.top=55,l.shadow.camera.bottom=-55,l.shadow.bias=-4e-4,this.group.add(l);const d=new $o(10865653,.45);d.position.set(-35,40,-35),this.group.add(d);const u=new Ko(61695,2.5,50);u.position.set(0,8,0),this.group.add(u);const p=new Ko(16729685,2,40);p.position.set(-20,6,-20),this.group.add(p);for(const m of t.blocks)m.comment||this._addBlock(m);return t}_addBlock(t){const{x:e,y:n,z:s,w:r,h:a,d:o,type:c="wall"}=t,l=new yt(r,a,o),d=this.materials[c]??this.materials.wall,u=new $(l,d);if(u.position.set(e,n,s),u.receiveShadow=!0,u.castShadow=!0,u.userData.type=c,this.group.add(u),c!=="ground"){const p=new Je(l),m=this.edgeMaterials[c]??this.edgeMaterials.wall,g=new je(p,m);u.add(g)}if(c!=="trigger"){const p=new qn().setFromObject(u);this.colliders.push({box:p,mesh:u,type:c})}}getColliders(){return this.colliders}getSpawnPoints(t){return(t.spawn??[[0,.9,-28]]).map(e=>new R(e[0],e[1],e[2]))}clear(){this.group.clear(),this.colliders=[],this.skyDomeData&&(this.scene.remove(this.skyDomeData.skyMesh),this.scene.remove(this.skyDomeData.bgGroup),this.skyDomeData=null),this.scene.fog=null}}const Ar=new R;class Um{constructor(t){this.colliders=t||[]}update(t){this.colliders=t||[]}resolve(t,e,n=.4,s=.9,r=!0){let a=!1,o=!1,c=!1;const l=t.clone(),d=l.y+e.y,u=new qn(new R(l.x-n,d-s,l.z-n),new R(l.x+n,d+s,l.z+n));let p=!1;for(const{box:g}of this.colliders)if(u.intersectsBox(g)){if(e.y<0){if(l.y-s>=g.max.y-.25){l.y=g.max.y+s,e.y=0,a=!0,p=!0;break}}else if(e.y>0&&l.y+s<=g.min.y+.25){l.y=g.min.y-s,e.y=0,p=!0;break}}p||(l.y=d),l.y<s&&(l.y=s,e.y=0,a=!0);const m=.05;if(e.x!==0){const g=l.x+e.x;for(const{box:_}of this.colliders)if(!(l.y+s-m<=_.min.y||l.y-s+m>=_.max.y)&&!(l.z+n-m<=_.min.z||l.z-n+m>=_.max.z)){if(e.x>0&&l.x+n<=_.min.x+m&&g+n>=_.min.x){l.x=_.min.x-n,e.x=0,o=!0;break}else if(e.x<0&&l.x-n>=_.max.x-m&&g-n<=_.max.x){l.x=_.max.x+n,e.x=0,o=!0;break}}o||(l.x=g)}if(e.z!==0){const g=l.z+e.z;for(const{box:_}of this.colliders)if(!(l.y+s-m<=_.min.y||l.y-s+m>=_.max.y)&&!(l.x+n-m<=_.min.x||l.x-n+m>=_.max.x)){if(e.z>0&&l.z+n<=_.min.z+m&&g+n>=_.min.z){l.z=_.min.z-n,e.z=0,c=!0;break}else if(e.z<0&&l.z-n>=_.max.z-m&&g-n<=_.max.z){l.z=_.max.z+n,e.z=0,c=!0;break}}c||(l.z=g)}return r||(o&&(l.z=t.z,e.z=0),c&&(l.x=t.x,e.x=0)),{position:l,displacement:e,onGround:a,collidedX:o,collidedZ:c}}raycast(t,e,n=1e3){const s=new Hi(t,e.clone().normalize());let r=null,a=n;for(const{box:o}of this.colliders)if(s.intersectBox(o,Ar)!==null){const l=t.distanceTo(Ar);l<a&&(a=l,r={point:Ar.clone(),distance:l})}return r}}const tl={vandal:{id:"vandal",name:"VANDAL",shortName:"VDL",type:"rifle",damageBody:40,damageHead:156,damageLeg:34,fireRate:9.75,reloadTime:2500,magazineSize:25,isAuto:!0,spread:.015,recoilPattern:[0,.01,.02,.03,.04],range:500,scopeMultiplier:1,color:16729685},spectre:{id:"spectre",name:"SPECTRE",shortName:"SPC",type:"smg",damageBody:26,damageHead:78,damageLeg:22,fireRate:13.33,reloadTime:2250,magazineSize:30,isAuto:!0,spread:.025,recoilPattern:[0,.005,.01,.015],range:250,scopeMultiplier:1,color:11065578},operator:{id:"operator",name:"OPERATOR",shortName:"OPR",type:"sniper",damageBody:150,damageHead:255,damageLeg:127,fireRate:.75,reloadTime:3700,magazineSize:5,isAuto:!1,spread:.001,spreadScoped:1e-4,recoilPattern:[0],range:1e3,scopeMultiplier:5,color:3045328},odin:{id:"odin",name:"ODIN",shortName:"ODN",type:"lmg",damageBody:38,damageHead:95,damageLeg:32,fireRate:12,reloadTime:5e3,magazineSize:100,isAuto:!0,spread:.035,recoilPattern:[0,.002,.004,.006,.008],range:400,scopeMultiplier:1,color:16106818},bucky:{id:"bucky",name:"BUCKY",shortName:"BCK",type:"shotgun",damageBody:34,damageHead:51,damageLeg:28,pellets:5,fireRate:1.1,reloadTime:2500,magazineSize:5,isAuto:!1,spread:.08,recoilPattern:[0],range:20,scopeMultiplier:1,color:8072587},classic:{id:"classic",name:"CLASSIC",shortName:"CLS",type:"pistol",damageBody:26,damageHead:78,damageLeg:22,fireRate:6.25,reloadTime:1750,magazineSize:12,isAuto:!1,spread:.02,recoilPattern:[0,.01],range:300,scopeMultiplier:1,color:7766137}};function zl(i){return tl[i]??tl.classic}class Nm{constructor(){this.ctx=null,this.enabled=!0,this._initialized=!1}_init(){if(this._initialized)return;const t=window.AudioContext||window.webkitAudioContext;t&&(this.ctx=new t,this._initialized=!0)}_resume(){this._init(),this.ctx&&this.ctx.state==="suspended"&&this.ctx.resume()}playShoot(t="vandal"){if(this._resume(),!this.ctx)return;const e=this.ctx.currentTime;switch(t){case"operator":this._playHeavyBoom(e);break;case"spectre":this._playRapidSmg(e);break;case"odin":this._playHeavyChug(e);break;case"bucky":this._playShotgunBlast(e);break;case"classic":this._playPistolPop(e);break;case"vandal":default:this._playRifleShot(e);break}}_playRifleShot(t){const e=this.ctx.createOscillator(),n=this.ctx.createOscillator(),s=this.ctx.createGain();e.type="sawtooth",e.frequency.setValueAtTime(260,t),e.frequency.exponentialRampToValueAtTime(42,t+.13),n.type="triangle",n.frequency.setValueAtTime(140,t),n.frequency.exponentialRampToValueAtTime(32,t+.15),s.gain.setValueAtTime(.42,t),s.gain.exponentialRampToValueAtTime(.001,t+.15),e.connect(s),n.connect(s),s.connect(this.ctx.destination),e.start(t),n.start(t),e.stop(t+.15),n.stop(t+.15),this._playNoise(t,.09,.45,3200),this._playClick(t,2400,.03,.25)}_playPistolPop(t){const e=this.ctx.createOscillator(),n=this.ctx.createGain();e.type="triangle",e.frequency.setValueAtTime(360,t),e.frequency.exponentialRampToValueAtTime(75,t+.08),n.gain.setValueAtTime(.32,t),n.gain.exponentialRampToValueAtTime(.001,t+.08),e.connect(n),n.connect(this.ctx.destination),e.start(t),e.stop(t+.08),this._playNoise(t,.05,.28,3800),this._playClick(t+.015,3200,.02,.2)}_playRapidSmg(t){const e=this.ctx.createOscillator(),n=this.ctx.createGain();e.type="sine",e.frequency.setValueAtTime(190,t),e.frequency.exponentialRampToValueAtTime(55,t+.06),n.gain.setValueAtTime(.28,t),n.gain.exponentialRampToValueAtTime(.001,t+.06),e.connect(n),n.connect(this.ctx.destination),e.start(t),e.stop(t+.06),this._playNoise(t,.045,.26,1600),this._playClick(t,1800,.015,.15)}_playHeavyBoom(t){const e=this.ctx.createOscillator(),n=this.ctx.createOscillator(),s=this.ctx.createGain();e.type="sine",e.frequency.setValueAtTime(150,t),e.frequency.exponentialRampToValueAtTime(20,t+.45),n.type="sawtooth",n.frequency.setValueAtTime(210,t),n.frequency.exponentialRampToValueAtTime(35,t+.3),s.gain.setValueAtTime(.75,t),s.gain.exponentialRampToValueAtTime(.001,t+.45),e.connect(s),n.connect(s),s.connect(this.ctx.destination),e.start(t),n.start(t),e.stop(t+.45),n.stop(t+.45),this._playNoise(t,.32,.7,2800),setTimeout(()=>{this.ctx&&this._playNoise(this.ctx.currentTime,.25,.25,1200)},90)}_playHeavyChug(t){const e=this.ctx.createOscillator(),n=this.ctx.createOscillator(),s=this.ctx.createGain();e.type="square",e.frequency.setValueAtTime(190,t),e.frequency.exponentialRampToValueAtTime(45,t+.09),n.type="triangle",n.frequency.setValueAtTime(95,t),n.frequency.exponentialRampToValueAtTime(30,t+.11),s.gain.setValueAtTime(.38,t),s.gain.exponentialRampToValueAtTime(.001,t+.11),e.connect(s),n.connect(s),s.connect(this.ctx.destination),e.start(t),n.start(t),e.stop(t+.11),n.stop(t+.11),this._playNoise(t,.07,.38,2600),this._playClick(t,3400,.02,.22)}_playShotgunBlast(t){const e=this.ctx.createOscillator(),n=this.ctx.createGain();e.type="triangle",e.frequency.setValueAtTime(175,t),e.frequency.exponentialRampToValueAtTime(28,t+.22),n.gain.setValueAtTime(.62,t),n.gain.exponentialRampToValueAtTime(.001,t+.22),e.connect(n),n.connect(this.ctx.destination),e.start(t),e.stop(t+.22),this._playNoise(t,.22,.65,1800),this._playClick(t,1400,.04,.35)}_playClick(t,e,n,s){const r=this.ctx.createOscillator(),a=this.ctx.createGain();r.type="sine",r.frequency.setValueAtTime(e,t),r.frequency.exponentialRampToValueAtTime(e*.4,t+n),a.gain.setValueAtTime(s,t),a.gain.exponentialRampToValueAtTime(.001,t+n),r.connect(a),a.connect(this.ctx.destination),r.start(t),r.stop(t+n)}_playNoise(t,e,n,s){const r=Math.floor(this.ctx.sampleRate*e),a=this.ctx.createBuffer(1,r,this.ctx.sampleRate),o=a.getChannelData(0);for(let u=0;u<r;u++)o[u]=Math.random()*2-1;const c=this.ctx.createBufferSource();c.buffer=a;const l=this.ctx.createBiquadFilter();l.type="lowpass",l.frequency.setValueAtTime(s,t),l.frequency.exponentialRampToValueAtTime(300,t+e);const d=this.ctx.createGain();d.gain.setValueAtTime(n,t),d.gain.exponentialRampToValueAtTime(.001,t+e),c.connect(l),l.connect(d),d.connect(this.ctx.destination),c.start(t),c.stop(t+e)}playHit(t=!1){if(this._resume(),!this.ctx)return;const e=this.ctx.currentTime;if(t){const n=this.ctx.createOscillator(),s=this.ctx.createOscillator(),r=this.ctx.createGain();n.type="sine",s.type="triangle",n.frequency.setValueAtTime(1760,e),n.frequency.exponentialRampToValueAtTime(880,e+.18),s.frequency.setValueAtTime(2640,e),s.frequency.exponentialRampToValueAtTime(1320,e+.15),r.gain.setValueAtTime(.4,e),r.gain.exponentialRampToValueAtTime(.001,e+.2),n.connect(r),s.connect(r),r.connect(this.ctx.destination),n.start(e),s.start(e),n.stop(e+.2),s.stop(e+.2)}else{const n=this.ctx.createOscillator(),s=this.ctx.createGain();n.type="sine",n.frequency.setValueAtTime(880,e),n.frequency.exponentialRampToValueAtTime(440,e+.08),s.gain.setValueAtTime(.25,e),s.gain.exponentialRampToValueAtTime(.001,e+.08),n.connect(s),s.connect(this.ctx.destination),n.start(e),n.stop(e+.08)}}playSlide(){if(this._resume(),!this.ctx)return;const t=this.ctx.currentTime;this._playNoise(t,.35,.15,900)}playJump(){if(this._resume(),!this.ctx)return;const t=this.ctx.currentTime,e=this.ctx.createOscillator(),n=this.ctx.createGain();e.type="sine",e.frequency.setValueAtTime(120,t),e.frequency.exponentialRampToValueAtTime(260,t+.1),n.gain.setValueAtTime(.18,t),n.gain.exponentialRampToValueAtTime(.001,t+.12),e.connect(n),n.connect(this.ctx.destination),e.start(t),e.stop(t+.12)}playReload(){if(this._resume(),!this.ctx)return;const t=this.ctx.currentTime;this._playNoise(t,.05,.28,2600),setTimeout(()=>{this.ctx&&this.playMagSlap()},350)}playMagSlap(){if(this._resume(),!this.ctx)return;const t=this.ctx.currentTime,e=this.ctx.createOscillator(),n=this.ctx.createGain();e.type="triangle",e.frequency.setValueAtTime(260,t),e.frequency.exponentialRampToValueAtTime(70,t+.08),n.gain.setValueAtTime(.35,t),n.gain.exponentialRampToValueAtTime(.001,t+.08),e.connect(n),n.connect(this.ctx.destination),e.start(t),e.stop(t+.08),this._playNoise(t,.06,.35,3400)}playBoltCycle(){if(this._resume(),!this.ctx)return;const t=this.ctx.currentTime;this._playNoise(t,.04,.28,4200),setTimeout(()=>{if(!this.ctx)return;const e=this.ctx.currentTime,n=this.ctx.createOscillator(),s=this.ctx.createGain();n.type="sine",n.frequency.setValueAtTime(1400,e),n.frequency.exponentialRampToValueAtTime(900,e+.05),s.gain.setValueAtTime(.2,e),s.gain.exponentialRampToValueAtTime(.001,e+.05),n.connect(s),s.connect(this.ctx.destination),n.start(e),n.stop(e+.05),this._playNoise(e,.03,.2,3800)},180),setTimeout(()=>{if(!this.ctx)return;const e=this.ctx.currentTime;this._playNoise(e,.05,.35,4500);const n=this.ctx.createOscillator(),s=this.ctx.createGain();n.type="triangle",n.frequency.setValueAtTime(320,e),n.frequency.exponentialRampToValueAtTime(110,e+.06),s.gain.setValueAtTime(.25,e),s.gain.exponentialRampToValueAtTime(.001,e+.06),n.connect(s),s.connect(this.ctx.destination),n.start(e),n.stop(e+.06)},380)}playPumpCycle(){if(this._resume(),!this.ctx)return;const t=this.ctx.currentTime;this._playNoise(t,.06,.3,2600),setTimeout(()=>{this.ctx&&this._playNoise(this.ctx.currentTime,.07,.35,3e3)},160)}playKill(){if(this._resume(),!this.ctx)return;const t=this.ctx.currentTime[783.99].forEach((e,n)=>{const s=this.ctx.createOscillator(),r=this.ctx.createGain();s.type="sawtooth",s.frequency.setValueAtTime(e,t+n*.03),r.gain.setValueAtTime(.2,t+n*.03),r.gain.exponentialRampToValueAtTime(.001,t+.45),s.connect(r),r.connect(this.ctx.destination),s.start(t+n*.03),s.stop(t+.5)})}playFootstep(t=!1){if(this._resume(),!this.ctx)return;const e=this.ctx.currentTime,n=t?.28:.14,s=this.ctx.createOscillator(),r=this.ctx.createGain();s.type="triangle",s.frequency.setValueAtTime(140+Math.random()*20,e),s.frequency.exponentialRampToValueAtTime(50,e+.07),r.gain.setValueAtTime(n,e),r.gain.exponentialRampToValueAtTime(.001,e+.07),s.connect(r),r.connect(this.ctx.destination),s.start(e),s.stop(e+.08),this._playNoise(e,.035,n*.6,2200)}}const cn=new Nm,Fm=-24,Om=7.4,Bm=7.85,zm=.58,km=.44,Gm=32,Hm=4,Vm=.12;class Wm{constructor(t,e,n,s){this.camera=t,this.collision=e,this.scene=n,this.tracerManager=s,this.position=new R(0,.9,-28),this.velocity=new R,this.onGround=!0,this.health=100,this.maxHealth=100,this.shield=50,this.alive=!0,this.isInvulnerable=!1,this.invulnTimer=0,this.keys={w:!1,s:!1,a:!1,d:!1,space:!1,ctrl:!1,shift:!1},this.isCrouched=!1,this.crouchProgress=0,this.isWalking=!1,this.taggingTimer=0,this.landingTimer=0,this.speedMult=1,this.weaponSlots=[null,null],this.activeSlot=0,this.weaponData=null,this.ammoMag=0,this.isReloading=!1,this.reloadTimer=null,this.lastFireTime=0,this.isFiring=!1,this.isScoped=!1,this.recoilPitch=0,this.recoilShots=0,this.gunRecoilOffset=new R,this.gunRecoilRot=new He(0,0,0,"YXZ"),this.reloadStartTime=0,this.reloadDuration=2500,this.actionCycleType=null,this.actionCycleTimer=0,this.actionCycleTotal=0,this.wasScopedBeforeCycle=!1,this.walkBobPhase=0,this.raycaster=new _m,this.footstepTimer=0,this.gunMesh=null,this.muzzleFlash=null,this._createGunModel(),this._createMuzzleFlash(),this._bindKeys(),this._triggerSpawnProtection(3e3)}setTracerManager(t){this.tracerManager=t}setAgent(t){this.speedMult=t.speed,this.maxHealth=t.health,this.health=t.health,this.shield=50,this._triggerSpawnProtection(3e3)}_triggerSpawnProtection(t=3e3){this.isInvulnerable=!0,this.invulnTimer=t,Tt.emit("player:spawn_shield",{active:!0,durationMs:t}),setTimeout(()=>{this.isInvulnerable=!1,Tt.emit("player:spawn_shield",{active:!1})},t)}equipWeapon(t,e=0){const n=zl(t);this.weaponSlots[e]={def:n,mag:n.magazineSize},this.activeSlot===e&&this._activateSlot(e)}_activateSlot(t){this.activeSlot=t;const e=this.weaponSlots[t];e&&(this.weaponData=e.def,this.ammoMag=e.mag,this.isReloading=!1,clearTimeout(this.reloadTimer),this._updateGunAppearance(e.def),Tt.emit("weapon:switch",{slot:t,weapon:e.def,mag:e.mag}))}switchSlot(t){t!==this.activeSlot&&this.weaponSlots[t]&&(this.isReloading&&(clearTimeout(this.reloadTimer),this.isReloading=!1),this._activateSlot(t))}_createGunModel(){this.gunMesh=new le,this.gunBasePos=new R(.24,-.22,-.46),this.gunMesh.position.copy(this.gunBasePos),this.camera.add(this.gunMesh),this.magMesh=null,this.boltMesh=null,this.weaponData&&this._buildDistinctWeaponMesh(this.weaponData.id)}_buildDistinctWeaponMesh(t){var l;if(!this.gunMesh)return;this.gunMesh.clear(),this.magMesh=null,this.boltMesh=null;const e=new ne({color:1317412,roughness:.35,metalness:.85}),n=new ne({color:2371389,roughness:.45,metalness:.7}),s=new ne({color:1119773,roughness:.85,metalness:.1}),r=new ne({color:13938487,roughness:.3,metalness:.9}),a=new Le({color:61695,transparent:!0,opacity:.85}),o=((l=this.weaponData)==null?void 0:l.color)??16729685,c=new ne({color:o,emissive:o,emissiveIntensity:.5,roughness:.3});switch(this.gunAccentMat=c,t){case"vandal":{const d=new yt(.075,.12,.46),u=new $(d,n);this.gunMesh.add(u);const p=new yt(.065,.05,.38),m=new $(p,e);m.position.set(0,.07,-.02),this.gunMesh.add(m);const g=new Ht(.018,.018,.34,8);g.rotateX(Math.PI/2);const _=new $(g,e);_.position.set(0,.03,-.38),this.gunMesh.add(_);const f=new yt(.038,.045,.08),h=new $(f,r);h.position.set(0,.03,-.56),this.gunMesh.add(h);const E=new yt(.06,.1,.26),M=new $(E,s);M.position.set(0,-.02,.32),this.gunMesh.add(M);const T=new yt(.05,.16,.07);T.rotateX(.28);const P=new $(T,s);P.position.set(0,-.12,.12),this.gunMesh.add(P);const A=new le,b=new yt(.05,.24,.1);b.rotateX(-.25);const I=new $(b,e);I.position.set(0,-.1,0),A.add(I),A.position.set(0,-.05,-.06),this.gunMesh.add(A),this.magMesh=A;const q=new yt(.078,.02,.34),x=new $(q,c);x.position.set(0,.03,-.04),this.gunMesh.add(x);break}case"spectre":{const d=new yt(.068,.1,.32),u=new $(d,e);this.gunMesh.add(u);const p=new Ht(.032,.032,.32,12);p.rotateX(Math.PI/2);const m=new $(p,n);m.position.set(0,.02,-.3),this.gunMesh.add(m);const g=new Ht(.034,.034,.04,12);g.rotateX(Math.PI/2);const _=new $(g,c);_.position.set(0,.02,-.22);const f=_.clone();f.position.z=-.38,this.gunMesh.add(_),this.gunMesh.add(f);const h=new le,E=new yt(.045,.22,.06),M=new $(E,n);M.position.set(0,-.09,0),h.add(M),h.position.set(0,-.04,.02),this.gunMesh.add(h),this.magMesh=h;const T=new yt(.04,.06,.18),P=new $(T,e);P.position.set(0,-.01,.24),this.gunMesh.add(P);const A=new yt(.04,.1,.05);A.rotateX(.2);const b=new $(A,s);b.position.set(0,-.08,-.12),this.gunMesh.add(b);break}case"operator":{const d=new yt(.085,.14,.65),u=new $(d,n);this.gunMesh.add(u);const p=new Ht(.025,.022,.62,10);p.rotateX(Math.PI/2);const m=new $(p,e);m.position.set(0,.04,-.62),this.gunMesh.add(m);const g=new yt(.06,.06,.12),_=new $(g,e);_.position.set(0,.04,-.96),this.gunMesh.add(_);const f=new Ht(.038,.042,.36,12);f.rotateX(Math.PI/2);const h=new $(f,e);h.position.set(0,.14,-.06),this.gunMesh.add(h);const E=new Da(.036,12),M=new $(E,a);M.position.set(0,.14,.12),this.gunMesh.add(M);const T=new le,P=new Ht(.012,.012,.08);P.rotateZ(Math.PI/3);const A=new $(P,r),b=new Xi(.02,8,8),I=new $(b,r);I.position.set(.06,.03,0),T.add(A),T.add(I),T.position.set(.045,.08,.08),this.gunMesh.add(T),this.boltMesh=T;const q=new le,x=new yt(.065,.2,.14),S=new $(x,e);S.position.set(0,-.08,0),q.add(S),q.position.set(0,-.06,.05),this.gunMesh.add(q),this.magMesh=q;break}case"odin":{const d=new yt(.12,.16,.52),u=new $(d,e);this.gunMesh.add(u);for(let M=0;M<4;M++){const T=M/4*Math.PI*2,P=new Ht(.014,.014,.42,6);P.rotateX(Math.PI/2);const A=new $(P,n);A.position.set(Math.cos(T)*.03,Math.sin(T)*.03+.03,-.46),this.gunMesh.add(A)}const p=new yt(.04,.08,.26),m=new $(p,s);m.position.set(0,.16,-.05),this.gunMesh.add(m);const g=new le,_=new Ht(.11,.11,.14,16);_.rotateZ(Math.PI/2);const f=new $(_,r);g.add(f),g.position.set(-.12,-.1,.02),this.gunMesh.add(g),this.magMesh=g;const h=new yt(.08,.04,.06),E=new $(h,r);E.position.set(-.06,-.02,.02),this.gunMesh.add(E);break}case"bucky":{const d=new yt(.08,.12,.42),u=new $(d,e);this.gunMesh.add(u);const p=new Ht(.022,.022,.38,10);p.rotateX(Math.PI/2);const m=new $(p,n);m.position.set(0,.04,-.38),this.gunMesh.add(m);const g=new Ht(.018,.018,.36,10);g.rotateX(Math.PI/2);const _=new $(g,e);_.position.set(0,-.02,-.36),this.gunMesh.add(_);const f=new le,h=new yt(.075,.08,.18),E=new $(h,s);f.add(E),f.position.set(0,-.02,-.32),this.gunMesh.add(f),this.boltMesh=f;const M=new yt(.07,.12,.28),T=new $(M,s);T.position.set(0,-.03,.32),this.gunMesh.add(T);break}case"classic":default:{const d=new yt(.055,.12,.26),u=new $(d,s);u.position.set(0,-.02,0),this.gunMesh.add(u);const p=new le,m=new yt(.058,.065,.28),g=new $(m,n);p.add(g),p.position.set(0,.06,-.01),this.gunMesh.add(p),this.boltMesh=p;const _=new yt(.048,.18,.08);_.rotateX(.24);const f=new $(_,s);f.position.set(0,-.12,.08),this.gunMesh.add(f);const h=new le,E=new yt(.038,.18,.06);E.rotateX(.24);const M=new $(E,e);h.add(M),h.position.set(0,-.12,.08),this.gunMesh.add(h),this.magMesh=h;const T=new yt(.06,.018,.14),P=new $(T,c);P.position.set(0,.07,-.04),this.gunMesh.add(P);break}}}_updateGunAppearance(t){this.gunMesh&&this._buildDistinctWeaponMesh(t.id)}_createMuzzleFlash(){const t=new An(.36,.36),e=Cm(),n=new Le({map:e,transparent:!0,opacity:0,depthTest:!1,blending:Cr,side:tn});this.muzzleFlash=new $(t,n),this.muzzleFlash.position.set(.24,-.16,-.75),this.camera.add(this.muzzleFlash)}_showMuzzleFlash(){if(this.muzzleFlash&&!this.isScoped){this.muzzleFlash.rotation.z=Math.random()*Math.PI*2;const t=.85+Math.random()*.35;this.muzzleFlash.scale.set(t,t,t),this.muzzleFlash.material.opacity=1,setTimeout(()=>{this.muzzleFlash&&(this.muzzleFlash.material.opacity=0)},35)}}startFire(){this.isFiring=!0}stopFire(){this.isFiring=!1,this.recoilShots=0}_tryFire(t,e){if(!this.weaponData||!this.alive||this.isReloading||this.actionCycleTimer>0)return;const n=1e3/this.weaponData.fireRate;if(!(e-this.lastFireTime<n)){if(this.ammoMag<=0){this.reload();return}this.lastFireTime=e,this.ammoMag--,this.weaponSlots[this.activeSlot].mag=this.ammoMag,Tt.emit("weapon:fire",{mag:this.ammoMag,weapon:this.weaponData}),cn.playShoot(this.weaponData.id),this._doShoot(t),this._applyRecoil(),this._showMuzzleFlash(),this.weaponData.isAuto||(this.isFiring=!1)}}_doShoot(t){const e=this.weaponData,n=e.pellets??1,s=e.id==="operator",r=Math.sqrt(this.velocity.x**2+this.velocity.z**2);let a=1;this.onGround?r>2&&!this.isWalking&&!this.isCrouched?a=s?6:2.8:this.isCrouched&&(a=.75):a=s?8:4;for(let o=0;o<n;o++){const l=(this.isScoped?e.spreadScoped??1e-4:e.spread)*a,d=new R((Math.random()-.5)*l*2,(Math.random()-.5)*l*2,-1).normalize();d.applyQuaternion(this.camera.quaternion),this.raycaster.set(this.camera.position,d);const u=t.flatMap(h=>h.hitboxes??[h.mesh]).filter(Boolean),p=this.raycaster.intersectObjects(u,!1);let m=null,g=new R(0,1,0),_=!1;if(p.length>0){const h=p[0];m=h.point.clone();const E=h.object.userData.isHead,M=t.find(T=>T.mesh===h.object||T.hitboxes&&T.hitboxes.includes(h.object));if(M&&!M.isDead){_=!0;const T=E?e.damageHead:e.damageBody;cn.playHit(E),Tt.emit("player:shot_bot",{bot:M,damage:T,isHead:E,point:m})}}if(!_){const h=this.collision.raycast(this.camera.position,d,e.range);h?(m=h.point,this.tracerManager&&this.tracerManager.addSparks(m,g)):m=this.camera.position.clone().addScaledVector(d,80)}let f;this.isScoped||s?f=this.camera.position.clone().addScaledVector(d,.45):(f=new R(.24,-.16,-.55),f.applyQuaternion(this.camera.quaternion).add(this.camera.position)),this.tracerManager&&m&&this.tracerManager.addTracer(f,m,!1,s)}this.recoilShots++}_applyRecoil(){if(!this.weaponData)return;const t=this.weaponData.recoilPattern,e=Math.min(this.recoilShots,t.length-1);switch(this.recoilPitch+=t[e]??.015,this.weaponData.id){case"operator":this.gunRecoilOffset.z=.2,this.gunRecoilOffset.y=.05,this.gunRecoilRot.x=.32,this.gunRecoilRot.y=.04,this.actionCycleType="bolt",this.actionCycleTotal=.85,this.actionCycleTimer=.85,cn.playBoltCycle(),this.isScoped&&(this.wasScopedBeforeCycle=!0,this.setScoped(!1));break;case"bucky":this.gunRecoilOffset.z=.15,this.gunRecoilOffset.y=.04,this.gunRecoilRot.x=.24,this.actionCycleType="pump",this.actionCycleTotal=.42,this.actionCycleTimer=.42,cn.playPumpCycle();break;case"odin":this.gunRecoilOffset.z=.08,this.gunRecoilOffset.y=(Math.random()-.5)*.025,this.gunRecoilRot.x=.12,this.gunRecoilRot.y=(Math.random()-.5)*.05,this.gunRecoilRot.z=(Math.random()-.5)*.06;break;case"spectre":this.gunRecoilOffset.z=.05,this.gunRecoilOffset.y=.015,this.gunRecoilRot.x=.08,this.gunRecoilRot.y=(Math.random()-.5)*.03;break;case"classic":this.gunRecoilOffset.z=.06,this.gunRecoilOffset.y=.03,this.gunRecoilRot.x=.22,this.gunRecoilRot.y=(Math.random()-.5)*.03,this.boltMesh&&(this.boltMesh.position.z=.04,setTimeout(()=>{this.boltMesh&&(this.boltMesh.position.z=-.01)},45));break;case"vandal":default:this.gunRecoilOffset.z=.11,this.gunRecoilOffset.y=.035,this.gunRecoilRot.x=.17,this.gunRecoilRot.y=(Math.random()-.5)*.04,this.gunRecoilRot.z=(Math.random()-.5)*.04;break}}reload(){!this.weaponData||this.isReloading||this.ammoMag>=this.weaponData.magazineSize||(this.isReloading=!0,this.reloadStartTime=performance.now(),this.reloadDuration=this.weaponData.reloadTime,this.isScoped&&this.setScoped(!1),cn.playReload(),Tt.emit("weapon:reload_start",{weapon:this.weaponData}))}takeDamage(t){var e;if(this.alive&&!this.isInvulnerable){if(this.shield>0){const n=Math.min(this.shield,t*.5);this.shield-=n*2,t-=n,this.shield<0&&(this.shield=0)}this.health=Math.max(0,this.health-t),this.taggingTimer=.38,Tt.emit("player:damaged",{health:this.health,shield:this.shield}),this.health<=0&&(this.alive=!1,Tt.emit("player:died",{currentWeaponId:((e=this.weaponData)==null?void 0:e.id)??"vandal"}))}}respawn(t){this.health=this.maxHealth,this.shield=50,this.alive=!0,this.velocity.set(0,0,0),this.position.copy(t),this.camera.position.copy(t),this.camera.position.y+=.72,this.camera.rotation.order="YXZ",this.camera.rotation.set(0,0,0),this.recoilPitch=0,this.recoilShots=0,this._triggerSpawnProtection(3e3),Tt.emit("player:respawn",{health:this.health})}update(t,e){var T;if(!this.alive)return;this.camera.rotation.order="YXZ",this.camera.rotation.z=0,this.camera.rotation.x=Math.max(-1.45,Math.min(1.45,this.camera.rotation.x));const n=performance.now();this.isFiring&&this.weaponData&&this._tryFire(e,n);const s=new R,r=new R;if(this.isReloading){const P=n-this.reloadStartTime,A=Math.min(1,P/this.reloadDuration);if(A>=1)this.ammoMag=this.weaponData.magazineSize,this.weaponSlots[this.activeSlot].mag=this.ammoMag,this.isReloading=!1,this.recoilShots=0,this.magMesh&&(this.magMesh.position.y=this.magBaseY??this.magMesh.position.y,this.magMesh.rotation.z=0),Tt.emit("weapon:reload_done",{mag:this.ammoMag});else if(this.magBaseY===void 0&&this.magMesh&&(this.magBaseY=this.magMesh.position.y),A<.25){const b=A/.25;s.y-=.18*Math.sin(b*Math.PI*.5),s.x-=.05*b,r.z-=.45*b,r.x-=.22*b}else if(A<.6){const b=(A-.25)/.35;s.y-=.18,s.x-=.05,r.z-=.45,r.x-=.22,this.magMesh&&(this.magMesh.position.y=(this.magBaseY??-.06)-Math.min(.35,b*.6),this.magMesh.rotation.z=b*.4)}else if(A<.78){const b=(A-.6)/.18,I=Math.min(1,b*1.5);this.magMesh&&(this.magMesh.position.y=(this.magBaseY??-.06)-(1-I)*.35,this.magMesh.rotation.z=(1-I)*.4);const q=Math.sin(b*Math.PI)*.06;s.y-=.18-q,s.x-=.05*(1-b*.6),r.z-=.45*(1-b*.4),r.x-=.22-q*2}else{const b=(A-.78)/.22,I=1-Math.cos(b*Math.PI*.5);s.y-=.18*(1-I),s.x-=.02*(1-I),r.z-=.27*(1-I),r.x-=.13*(1-I),this.magMesh&&(this.magMesh.position.y=this.magBaseY??this.magMesh.position.y,this.magMesh.rotation.z=0)}}if(this.actionCycleTimer>0){this.actionCycleTimer-=t;const P=1-Math.max(0,this.actionCycleTimer/this.actionCycleTotal);if(this.actionCycleType==="bolt")if(P<.35){const A=P/.35;r.z-=.4*Math.sin(A*Math.PI*.5),r.y+=.16*Math.sin(A*Math.PI*.5),s.z+=.08*A,this.boltMesh&&(this.boltMesh.rotation.z=Math.PI/3+A*.6)}else if(P<.65)r.z-=.4,r.y+=.16,s.z+=.08,this.boltMesh&&(this.boltMesh.position.z=.08+(P-.35)*.15);else{const A=(P-.65)/.35;r.z-=.4*(1-A),r.y+=.16*(1-A),s.z+=.08*(1-A),this.boltMesh&&(this.boltMesh.position.z=.08,this.boltMesh.rotation.z=Math.PI/3+(1-A)*.6)}else if(this.actionCycleType==="pump"){const A=Math.sin(P*Math.PI);s.z+=.07*A,s.y-=.03*A,r.x+=.1*A,this.boltMesh&&(this.boltMesh.position.z=-.32+A*.12)}this.actionCycleTimer<=0&&(this.actionCycleTimer=0,this.actionCycleType=null,this.boltMesh&&((T=this.weaponData)==null?void 0:T.id)==="bucky"&&(this.boltMesh.position.z=-.32))}const a=Math.sqrt(this.velocity.x**2+this.velocity.z**2);if(this.onGround&&a>.5){const P=this.walkBobPhase??0;this.walkBobPhase=P+t*(this.isWalking?7:11),s.x+=Math.cos(this.walkBobPhase)*.007,s.y+=Math.abs(Math.sin(this.walkBobPhase))*.006,!this.isWalking&&Math.sin(P)<0&&Math.sin(this.walkBobPhase)>=0&&cn.playFootstep(a>6)}this.gunRecoilOffset.lerp(new R(0,0,0),t*16),this.gunRecoilRot.x+=(0-this.gunRecoilRot.x)*Math.min(1,t*16),this.gunRecoilRot.y+=(0-this.gunRecoilRot.y)*Math.min(1,t*16),this.gunRecoilRot.z+=(0-this.gunRecoilRot.z)*Math.min(1,t*16),this.gunMesh&&(this.gunMesh.position.copy(this.gunBasePos).add(this.gunRecoilOffset).add(s),this.gunMesh.rotation.set(this.gunRecoilRot.x+r.x,this.gunRecoilRot.y+r.y,this.gunRecoilRot.z+r.z),this.gunMesh.visible=!this.isScoped),this.recoilPitch>0&&(this.recoilPitch=Math.max(0,this.recoilPitch-t*6));const o=new R,c=new R;this.camera.getWorldDirection(o),o.y=0,o.normalize(),c.crossVectors(o,new R(0,1,0)).normalize();const l=new R;this.keys.w&&l.add(o),this.keys.s&&l.sub(o),this.keys.d&&l.add(c),this.keys.a&&l.sub(c),l.length()>1&&l.normalize(),this.taggingTimer>0&&(this.taggingTimer-=t),this.landingTimer>0&&(this.landingTimer-=t),this.isWalking=this.keys.shift,this.isCrouched=this.keys.ctrl;const d=this.isCrouched?1:0;this.crouchProgress+=(d-this.crouchProgress)*Math.min(1,t*16);let u=Bm*this.speedMult;if(this.isScoped?u*=.45:this.isCrouched?u*=km:this.isWalking&&(u*=zm),this.taggingTimer>0){const P=.35+(1-this.taggingTimer/.38)*.65;u*=P}this.landingTimer>0&&(u*=.65);const p=l.x*u,m=l.z*u,g=this.onGround?Gm:Hm;this.velocity.x+=(p-this.velocity.x)*Math.min(1,t*g),this.velocity.z+=(m-this.velocity.z)*Math.min(1,t*g),this.keys.space&&this.onGround&&!this.isCrouched&&(cn.playJump(),this.velocity.y=Om,this.onGround=!1),this.onGround||(this.velocity.y+=Fm*t);const _=!!(this.keys.a||this.keys.d),f=this.velocity.clone().multiplyScalar(t),h=this.collision.resolve(this.position,f,.4,.9,_),E=this.onGround;this.position.copy(h.position),this.onGround=h.onGround,this.onGround&&this.velocity.y<0&&(this.velocity.y=0),h.collidedX&&(this.velocity.x=0),h.collidedZ&&(this.velocity.z=0),!_&&(h.collidedX||h.collidedZ)&&(this.velocity.x=0,this.velocity.z=0),!E&&this.onGround&&(this.landingTimer=Vm);const M=.72-this.crouchProgress*.4;this.camera.position.x=this.position.x,this.camera.position.y=this.position.y+M,this.camera.position.z=this.position.z,this.keys.space=!1}setScoped(t){var n;this.isScoped=t;const e=((n=this.weaponData)==null?void 0:n.scopeMultiplier)>1?90/this.weaponData.scopeMultiplier:70;this.camera.fov=t?e:90,this.camera.updateProjectionMatrix(),Tt.emit("player:scope",{scoped:t})}_bindKeys(){const t=(e,n)=>{switch(e.code){case"KeyW":this.keys.w=n;break;case"KeyS":this.keys.s=n;break;case"KeyA":this.keys.a=n;break;case"KeyD":this.keys.d=n;break;case"Space":n&&(this.keys.space=!0);break;case"ControlLeft":case"ControlRight":this.keys.ctrl=n;break;case"ShiftLeft":case"ShiftRight":this.keys.shift=n;break}};document.addEventListener("keydown",e=>t(e,!0)),document.addEventListener("keyup",e=>t(e,!1)),document.addEventListener("keydown",e=>{e.code==="Digit1"&&this.switchSlot(0),e.code==="Digit2"&&this.switchSlot(1),e.code==="KeyR"&&this.reload()}),document.addEventListener("wheel",e=>{const n=e.deltaY>0?1:0;this.switchSlot(n)})}}class Xm{static build(t,e){const n=new le,s=[],r=t.bodyColor??15857145,a=t.vestColor??16729685,o=t.accentColor??16739125,c=new ne({color:r,roughness:.45,metalness:.15}),l=new ne({color:a,roughness:.4,metalness:.25}),d=new ne({color:o,emissive:o,emissiveIntensity:.7,roughness:.2}),u=new ne({color:15910045,roughness:.65}),p=new ne({color:3359832,roughness:.65,metalness:.1}),m=new ne({color:2370872,roughness:.6,metalness:.2}),g=new yn({color:16721984,transparent:!0,opacity:.85}),_=new le;_.position.y=.55;const f=new Ht(.38,.32,.52,8),h=new $(f,c);h.position.y=.16,h.castShadow=!0,h.receiveShadow=!0,h.userData.isHead=!1,h.add(new je(new Je(f),g)),_.add(h),s.push(h);const E=new Ht(.32,.3,.36,8),M=new $(E,p);M.position.y=-.18,M.castShadow=!0,_.add(M);const T=new Ht(.36,.34,.44,8,1,!1,-Math.PI/2,Math.PI),P=new $(T,l);P.position.set(0,.14,.05),P.castShadow=!0,P.add(new je(new Je(T),g)),_.add(P);const A=new yt(.46,.06,.32),b=new $(A,d);b.position.set(0,.18,.12),_.add(b);const I=new Ht(.34,.34,.12,12),q=new $(I,m);q.position.y=-.36,_.add(q);for(let st=-1;st<=1;st+=2){const K=new yt(.12,.14,.14),et=new $(K,m);et.position.set(st*.36,-.36,.05),_.add(et)}const x=new Ht(.12,.1,.22,6);x.rotateZ(Math.PI/2);const S=new $(x,l);S.position.set(-.46,.32,0),S.rotation.z=.25,S.castShadow=!0,S.add(new je(new Je(x),g));const B=new $(x,l);B.position.set(.46,.32,0),B.rotation.z=-.25,B.castShadow=!0,B.add(new je(new Je(x),g)),_.add(S),_.add(B);const z=new yt(.12,.26,.16),X=new $(z,m);X.position.set(.4,-.42,.05),X.rotation.z=-.15,_.add(X);const Z=new yt(.06,.12,.08),k=new $(Z,l);k.position.set(.43,-.3,.05),k.rotation.z=-.3,_.add(k);const tt=new yt(.09,.16,.08),W=new $(tt,m);W.position.set(-.32,.36,.16);const ft=new Ht(.01,.01,.18),ct=new $(ft,m);ct.position.set(-.32,.5,.16),_.add(W),_.add(ct);const _t=new yt(.12,.12,.04),Wt=new Le({color:o}),Xt=new $(_t,Wt);Xt.position.set(0,.18,.24),Xt.rotation.z=Math.PI/4,_.add(Xt),n.add(_);const H=new le;H.position.y=1.48;const nt=new Ht(.12,.14,.18,8),pt=new $(nt,u);pt.position.y=-.18,H.add(pt);const ht=new Ht(.24,.2,.44,8),wt=new $(ht,u);switch(wt.userData.isHead=!0,wt.castShadow=!0,wt.receiveShadow=!0,wt.add(new je(new Je(ht),g)),H.add(wt),s.push(wt),t.id){case"blaze":{const st=new Ht(.28,.26,.24,8),K=new $(st,m);K.position.y=-.16,H.add(K);const et=new Wi(.26,.38,7),Pt=new ne({color:16739125,emissive:16729685,emissiveIntensity:.65}),Q=new $(et,Pt);Q.position.set(0,.32,-.04),H.add(Q);break}case"cipher":{const st=new Xi(.13,8,8),K=new ne({color:16777215,roughness:.5}),et=new $(st,K);et.position.set(0,.32,-.14),H.add(et);const Pt=new Ht(.25,.25,.1,8),Q=new $(Pt,d);Q.position.y=.12,H.add(Q);break}case"scope":{const st=new Ht(.27,.27,.28,8),K=new $(st,c);K.position.y=.18,H.add(K);const et=new yt(.12,.08,.06),Pt=new Le({color:61695}),Q=new $(et,Pt);Q.position.set(-.1,.05,.2),H.add(Q);break}case"rampart":{const st=new Ht(.26,.26,.24,8),K=new ne({color:11032055,roughness:.75}),et=new $(st,K);et.position.y=.24,H.add(et);const Pt=new yt(.34,.1,.06),Q=new ne({color:16765286,metalness:.8,roughness:.2}),lt=new $(Pt,Q);lt.position.set(0,.05,.2),H.add(lt);break}case"phantom":{const st=new Ht(.28,.27,.48,8),K=new ne({color:7020968,emissive:4988309,emissiveIntensity:.45,roughness:.55}),et=new $(st,K);H.add(et);const Pt=new Le({color:61695});for(let Q=-1;Q<=1;Q++){const lt=new yt(.04,.16,.04),At=new $(lt,Pt);At.position.set(Q*.09,.05,.22),H.add(At)}break}}n.add(H);const St=new Ht(.08,.07,.65,8),It=new $(St,c);It.position.set(-.44,.45,.12),It.rotation.x=-Math.PI/4,It.rotation.z=Math.PI/12,It.castShadow=!0,It.add(new je(new Je(St),g)),n.add(It);const kt=new $(St,c);kt.position.set(.44,.45,.12),kt.rotation.x=-Math.PI/4,kt.rotation.z=-Math.PI/12,kt.castShadow=!0,kt.add(new je(new Je(St),g)),n.add(kt);const Gt=new Ht(.13,.11,.82,8),C=new Ht(.12,.12,.18,6);C.rotateZ(Math.PI/2);const ve=new yt(.24,.24,.36),Ut=new le;Ut.position.set(-.18,.12,0);const Ot=new $(Gt,p);Ot.position.y=-.42,Ot.castShadow=!0,Ot.userData.isHead=!1,Ut.add(Ot),s.push(Ot);const bt=new $(C,l);bt.position.set(0,-.38,.12),bt.add(new je(new Je(C),g)),Ut.add(bt);const Jt=new $(ve,m);Jt.position.set(0,-.78,.05),Jt.castShadow=!0,Ut.add(Jt),n.add(Ut);const Et=new le;Et.position.set(.18,.12,0);const w=new $(Gt,p);w.position.y=-.42,w.castShadow=!0,w.userData.isHead=!1,Et.add(w),s.push(w);const v=new $(C,l);v.position.set(0,-.38,.12),v.add(new je(new Je(C),g)),Et.add(v);const N=new $(ve,m);N.position.set(0,-.78,.05),N.castShadow=!0,Et.add(N),n.add(Et);const G=new le,J=new ne({color:3885142,metalness:.6,roughness:.35});switch((e==null?void 0:e.id)??"vandal"){case"spectre":{const st=new $(new yt(.08,.12,.35),J);G.add(st);const K=new $(new Ht(.035,.035,.32,8),m);K.geometry.rotateX(Math.PI/2),K.position.set(0,.02,-.32),G.add(K);const et=new $(new yt(.05,.22,.06),m);et.position.set(0,-.12,.02),G.add(et);break}case"operator":{const st=new $(new yt(.09,.15,.75),J);G.add(st);const K=new $(new Ht(.025,.022,.65,8),m);K.geometry.rotateX(Math.PI/2),K.position.set(0,.03,-.68),G.add(K);const et=new $(new Ht(.04,.042,.38,8),l);et.geometry.rotateX(Math.PI/2),et.position.set(0,.14,-.05),G.add(et);break}case"odin":{const st=new $(new yt(.13,.16,.55),J);G.add(st);const K=new $(new Ht(.12,.12,.16,12),l);K.geometry.rotateZ(Math.PI/2),K.position.set(-.13,-.1,.02),G.add(K);break}case"bucky":{const st=new $(new yt(.09,.13,.48),J);G.add(st);const K=new $(new Ht(.025,.025,.42,8),m);K.geometry.rotateX(Math.PI/2),K.position.set(0,.04,-.42),G.add(K);break}case"classic":{const st=new $(new yt(.06,.1,.28),m);G.add(st);const K=new $(new yt(.062,.06,.28),J);K.position.set(0,.06,0),G.add(K);break}case"vandal":default:{const st=new $(new yt(.08,.13,.52),J);G.add(st);const K=new $(new Ht(.02,.02,.38,8),m);K.geometry.rotateX(Math.PI/2),K.position.set(0,.03,-.44),G.add(K);const et=new $(new yt(.05,.24,.1),l);et.geometry.rotateX(-.25),et.position.set(0,-.12,-.06),G.add(et);const Pt=new $(new yt(.085,.025,.36),d);Pt.position.set(0,.04,-.05),G.add(Pt);break}}return G.position.set(.2,.58,.45),n.add(G),{root:n,hitboxes:s,legL:Ut,legR:Et,armL:It,armR:kt,torso:_,headGroup:H,gunGroup:G}}}const Ii=5.8,qm=32,el=52,Ym=18,ge={IDLE:0,WANDER:1,CHASE:2,SHOOT:3,DEAD:4};let Km=0;class $m{constructor(t,e,n,s,r){this.id=Km++,this.scene=t,this.spawnPos=e.clone(),this.agent=n,this.weaponDef=zl(s),this.tracerManager=r,this.name=`BOT_${["CIPHER","SCOPE","RAMPART","PHANTOM","BLAZE"][this.id%5]}`,this.position=e.clone(),this.velocity=new R,this.rotation=0,this.targetRotation=0,this.health=n.health,this.maxHealth=n.health,this.state=ge.IDLE,this.isDead=!1,this.kills=0,this.ammo=this.weaponDef.magazineSize,this.lastFire=0,this.isReloading=!1,this.spottedTimer=0,this.burstRemaining=0,this.burstCooldown=0,this.wanderTarget=e.clone(),this.wanderTimer=0,this.stuckTimer=0,this.lastStuckPos=e.clone(),this.animTime=Math.random()*10,this.isMoving=!1,this.flinchTimer=0,this.deathFallTimer=0,this.jumpTimer=0,this.jumpCooldown=2.5+Math.random()*3,this.verticalVel=0,this.isJumping=!1,this.mesh=null,this.hitboxes=[],this.legL=null,this.legR=null,this.armL=null,this.armR=null,this.torso=null,this.headGroup=null,this.healthBar=null,this._buildModel()}_buildModel(){const t=Xm.build(this.agent,this.weaponDef);this.mesh=t.root,this.hitboxes=t.hitboxes,this.legL=t.legL,this.legR=t.legR,this.armL=t.armL,this.armR=t.armR,this.torso=t.torso,this.headGroup=t.headGroup;const e=new An(1.04,.14),n=new Le({color:988970,transparent:!0,opacity:.85,depthTest:!1}),s=new $(e,n);s.position.y=2.25,s.rotation.x=-.3,this.mesh.add(s);const r=new An(1,.1),a=new Le({color:65415,transparent:!0,opacity:.95,depthTest:!1});this.healthBar=new $(r,a),this.healthBar.position.set(0,2.25,.01),this.healthBar.rotation.x=-.3,this.mesh.add(this.healthBar);const o=new Wi(.11,.18,4);o.rotateX(Math.PI);const c=new Le({color:16726866,depthTest:!1}),l=new $(o,c);l.position.y=2.46,this.mesh.add(l),this.mesh.position.copy(this.position),this.scene.add(this.mesh)}_updateHealthBar(){if(!this.healthBar)return;const t=this.health/this.maxHealth;this.healthBar.scale.x=Math.max(0,t);const e=new zt;e.setHSL(t*.33,1,.5),this.healthBar.material.color.copy(e)}update(t,e,n,s,r,a=[]){if(this.isDead){this.deathFallTimer>0&&(this.deathFallTimer-=t,this.mesh&&(this.mesh.rotation.x=Se.lerp(this.mesh.rotation.x,-Math.PI/2,t*20),this.mesh.position.y=Se.lerp(this.mesh.position.y,this.spawnPos.y-.45,t*20)));return}const o=performance.now();let c=null,l=1/0;if(s){const u=this.position.distanceTo(e);u<el&&this._hasLineOfSight(e,n)&&(c={isPlayer:!0,position:e,velocity:r,distance:u,name:"YOU",entity:null},l=u)}if(Array.isArray(a))for(const u of a){if(!u||u===this||u.isDead)continue;const p=this.position.distanceTo(u.position);p<el&&p<l&&this._hasLineOfSight(u.position,n)&&(c={isPlayer:!1,position:u.position,velocity:u.velocity,distance:p,name:u.name,entity:u},l=p)}switch(this.currentTarget=c,c?(this.spottedTimer+=t,l<qm&&this.spottedTimer>.28?this.state=ge.SHOOT:this.state=ge.CHASE):(this.spottedTimer=0,(this.state===ge.SHOOT||this.state===ge.CHASE)&&(this.state=ge.WANDER)),this.isMoving=!1,this.state){case ge.IDLE:this.wanderTimer-=t*1e3,this.wanderTimer<=0&&(this.state=ge.WANDER,this._pickWanderTarget(e));break;case ge.WANDER:this.isMoving=!0,this._moveToward(this.wanderTarget,Ii*.65,t,n),this.position.distanceTo(this.wanderTarget)<1.5&&(this._pickWanderTarget(e),this.state=ge.IDLE,this.wanderTimer=800+Math.random()*1500),this.stuckTimer+=t*1e3,this.stuckTimer>1800&&(this.position.distanceTo(this.lastStuckPos)<.6&&this._pickWanderTarget(e),this.lastStuckPos.copy(this.position),this.stuckTimer=0);break;case ge.CHASE:this.isMoving=!0,this._moveToward(c.position,Ii,t,n),this._aimAt(c.position);break;case ge.SHOOT:this._strafeAround(c.position,t,n),this._aimAt(c.position),this._tryShootTarget(c,o);break}let d=this.targetRotation-this.rotation;for(;d<-Math.PI;)d+=Math.PI*2;for(;d>Math.PI;)d-=Math.PI*2;if(this.rotation+=d*Math.min(1,t*14),this.jumpTimer+=t,this.jumpTimer>this.jumpCooldown&&(this.state===ge.CHASE||this.state===ge.SHOOT)&&!this.isJumping&&(Math.random()<.45&&(this.isJumping=!0,this.verticalVel=5.2),this.jumpTimer=0,this.jumpCooldown=2+Math.random()*2.8),this.isJumping?(this.verticalVel-=18*t,this.position.y+=this.verticalVel*t,this.position.y<=this.spawnPos.y&&(this.position.y=this.spawnPos.y,this.verticalVel=0,this.isJumping=!1)):this.position.y=this.spawnPos.y,this.mesh.position.copy(this.position),this.mesh.rotation.y=this.rotation,c&&(this.headGroup||this.torso)){const u=c.position.y+.8-(this.position.y+1.2),p=Math.hypot(c.position.x-this.position.x,c.position.z-this.position.z),m=-Math.atan2(u,Math.max(.1,p));this.headGroup&&(this.headGroup.rotation.x=Se.lerp(this.headGroup.rotation.x,m*.7,t*10))}else this.headGroup&&(this.headGroup.rotation.x=Se.lerp(this.headGroup.rotation.x,0,t*6));this._animateBot(t),this._updateHealthBar()}_hasLineOfSight(t,e){const n=this.position.clone();n.y+=1.48;const s=t.clone();s.y+=.75;const r=new R().subVectors(s,n),a=r.length();return r.normalize(),e.raycast(n,r,a-.2)===null}_animateBot(t){if(this.animTime+=t*(this.isMoving?11:2.5),this.flinchTimer>0&&(this.flinchTimer-=t),this.isJumping)this.legL&&(this.legL.rotation.x=Se.lerp(this.legL.rotation.x,-.45,t*14)),this.legR&&(this.legR.rotation.x=Se.lerp(this.legR.rotation.x,-.35,t*14)),this.armL&&(this.armL.rotation.x=Se.lerp(this.armL.rotation.x,-Math.PI/3,t*12)),this.torso&&(this.torso.rotation.x=Se.lerp(this.torso.rotation.x,.15,t*10));else if(this.isMoving){const e=Math.sin(this.animTime)*.52;this.legL&&(this.legL.rotation.x=e),this.legR&&(this.legR.rotation.x=-e),this.torso&&(this.torso.position.y=.55+Math.abs(Math.sin(this.animTime))*.06,this.torso.rotation.z=Math.sin(this.animTime*.5)*.05,this.torso.rotation.x=.08),this.armL&&(this.armL.rotation.x=-Math.PI/4+e*.28),this.armR&&(this.armR.rotation.x=-Math.PI/4-e*.18)}else{const e=Math.sin(this.animTime)*.02;this.legL&&(this.legL.rotation.x=Se.lerp(this.legL.rotation.x,0,t*10)),this.legR&&(this.legR.rotation.x=Se.lerp(this.legR.rotation.x,0,t*10)),this.armL&&(this.armL.rotation.x=Se.lerp(this.armL.rotation.x,-Math.PI/4+e,t*10)),this.armR&&(this.armR.rotation.x=Se.lerp(this.armR.rotation.x,-Math.PI/4+e,t*10)),this.torso&&(this.torso.position.y=Se.lerp(this.torso.position.y,.55+e,t*8),this.torso.rotation.z=Se.lerp(this.torso.rotation.z,0,t*10),this.torso.rotation.x=Se.lerp(this.torso.rotation.x,0,t*10))}this.flinchTimer>0&&this.torso&&(this.torso.rotation.x=-.15*(this.flinchTimer/.18))}_moveToward(t,e,n,s){const r=new R().subVectors(t,this.position);if(r.y=0,r.length()<.1)return;r.normalize();const a=r.clone().multiplyScalar(e*n);if(s){const o=s.resolve(this.position,a,.45,.9);this.position.copy(o.position),this.state===ge.WANDER&&o.displacement.x===0&&o.displacement.z===0&&this._pickWanderTarget()}else this.position.add(a);this.targetRotation=Math.atan2(r.x,r.z)}_strafeAround(t,e,n){const s=new R().subVectors(t,this.position);s.y=0;const r=s.length(),a=11,o=new R;r>a+2?(s.normalize(),o.addScaledVector(s,Ii*.5*e),this.isMoving=!0):r<a-2&&(s.normalize(),o.addScaledVector(s,-Ii*.4*e),this.isMoving=!0);const c=new R(-s.z,0,s.x).normalize(),l=Math.sin(performance.now()*.002+this.id*2);if(o.addScaledVector(c,l*Ii*.45*e),Math.abs(l)>.2&&(this.isMoving=!0),n&&o.lengthSq()>0){const d=n.resolve(this.position,o,.45,.9);this.position.copy(d.position)}else this.position.add(o)}_aimAt(t){const e=new R().subVectors(t,this.position);this.targetRotation=Math.atan2(e.x,e.z)}_pickWanderTarget(t=null){if(Math.random()<.7){const e=t||new R(0,this.spawnPos.y,0),n=new R((Math.random()-.5)*22,0,(Math.random()-.5)*22);this.wanderTarget.copy(e).add(n),this.wanderTarget.y=this.spawnPos.y}else{const e=Math.random()*Math.PI*2,n=Math.random()*Ym;this.wanderTarget.set(this.position.x+Math.cos(e)*n,this.spawnPos.y,this.position.z+Math.sin(e)*n)}}_tryShootTarget(t,e){if(this.isReloading)return;if(this.ammo<=0){this._reload();return}if(this.burstCooldown>0){this.burstCooldown-=.016;return}const n=1e3/(this.weaponDef.fireRate*.55);if(e-this.lastFire<n)return;this.lastFire=e,this.ammo--;const s=this.position.clone();s.y+=.85;const r=new R(Math.sin(this.rotation),0,Math.cos(this.rotation)).normalize(),a=new R(r.z,0,-r.x);s.addScaledVector(r,.45).addScaledVector(a,.25);const o=t.position.clone();o.y+=t.isPlayer?.72:.85;const l=.55+(t.velocity?Math.sqrt(t.velocity.x**2+t.velocity.z**2):0)*.08,d=new R((Math.random()-.5)*l,(Math.random()-.5)*l*.4,(Math.random()-.5)*l),u=o.clone().add(d);this.tracerManager&&this.tracerManager.addTracer(s,u,!0),cn.playShoot(this.weaponDef.id);const m=.75+(this.position.distanceTo(t.position)<10?.35:0);if(u.distanceTo(o)<m){const _=Math.random()<.12,f=_?this.weaponDef.damageHead:this.weaponDef.damageBody;if(t.isPlayer){const h=f*.32,E=Math.atan2(this.position.x-t.position.x,this.position.z-t.position.z);Tt.emit("bot:shot_player",{botId:this.id,damage:h,isHead:_,botName:this.name,botPos:this.position.clone(),angle:E})}else if(t.entity&&!t.entity.isDead){const h=t.entity,E=f*.45;h.takeDamage(E,_,this.name)}}this.burstRemaining++,this.burstRemaining>=3+Math.floor(Math.random()*2)&&(this.burstRemaining=0,this.burstCooldown=.35+Math.random()*.3)}_reload(){this.isReloading||(this.isReloading=!0,setTimeout(()=>{this.ammo=this.weaponDef.magazineSize,this.isReloading=!1},this.weaponDef.reloadTime*.8))}takeDamage(t,e,n=null){this.isDead||(this.health-=t,this.flinchTimer=.18,this.health<=0?(this.health=0,this._die(n,e)):this.state=ge.CHASE)}_die(t=null,e=!1){this.isDead||(this.isDead=!0,this.deathTime=performance.now(),this.deathFallTimer=.45,this.state=ge.DEAD,t&&t!=="YOU"&&Tt.emit("bot:killed_bot",{killer:t,victim:this.name,weapon:this.weaponDef.id,isHead:e}),Tt.emit("bot:died",{botId:this.id,botName:this.name,killer:t,isHead:e}),setTimeout(()=>{this.mesh&&(this.mesh.visible=!1)},180),setTimeout(()=>{this.isDead&&this._respawn()},900))}_respawn(){if(this.onGetSafeSpawn){const t=this.onGetSafeSpawn();this.position.copy(t),this.spawnPos.copy(t)}else{const t=new R((Math.random()-.5)*6,0,(Math.random()-.5)*6);this.position.copy(this.spawnPos).add(t)}this.position.y=this.spawnPos.y,this.mesh.position.copy(this.position),this._pickWanderTarget(),this.health=this.maxHealth,this.isDead=!1,this.deathTime=0,this.state=ge.WANDER,this.ammo=this.weaponDef.magazineSize,this.isReloading=!1,this.mesh.rotation.set(0,this.rotation,0),this.mesh.visible=!0,this.deathFallTimer=0,this.flinchTimer=0,this._updateHealthBar(),Tt.emit("bot:respawned",{botId:this.id})}destroy(){this.scene.remove(this.mesh)}}const Zm={blaze:{id:"blaze",name:"BLAZE",role:"Duelist",emoji:"🔥",color:"#FF4655",secondaryColor:"#FF8C42",weapon:"vandal",health:100,speed:1,bodyColor:15857145,vestColor:16729685,accentColor:16739125,description:"Aggressive duelist. Standard assault rifle. Balanced for all ranges."},cipher:{id:"cipher",name:"CIPHER",role:"Duelist",emoji:"💨",color:"#A8D8EA",secondaryColor:"#FFFFFF",weapon:"spectre",health:90,speed:1.2,bodyColor:14742270,vestColor:165063,accentColor:61695,description:"High-mobility duelist. SMG for close-range aggression."},scope:{id:"scope",name:"SCOPE",role:"Initiator",emoji:"🔭",color:"#2E77D0",secondaryColor:"#7EC8E3",weapon:"operator",health:100,speed:.9,bodyColor:1920728,vestColor:10576391,accentColor:6333946,description:"Long-range initiator. One-shot sniper with scope. High skill ceiling."},rampart:{id:"rampart",name:"RAMPART",role:"Sentinel",emoji:"🤖",color:"#F5C542",secondaryColor:"#5BE050",weapon:"odin",health:130,speed:.8,bodyColor:16436245,vestColor:1467700,accentColor:2278750,description:"Sentinel with heavy armor. LMG with massive mag. Slow but durable."},phantom:{id:"phantom",name:"PHANTOM",role:"Controller",emoji:"👻",color:"#7B2D8B",secondaryColor:"#00C4C4",weapon:"bucky",health:100,speed:1,bodyColor:9133302,vestColor:3223169,accentColor:62975,description:"Elusive controller. Shotgun devastates at close quarters."}},Cs=Object.values(Zm);function zs(i,t=[],e=18){if(!i||i.length===0)return new R(0,.9,0);const n=(t||[]).filter(c=>c&&c.position&&!c.isDead);if(n.length===0){const c=Math.floor(Math.random()*i.length);return i[c].clone()}const s=i.map(c=>{let l=1/0;for(const d of n){const u=c.distanceTo(d.position);u<l&&(l=u)}return{point:c,minDist:l}});s.sort((c,l)=>l.minDist-c.minDist);const r=s.filter(c=>c.minDist>=e),a=r.length>0?r:s.slice(0,Math.min(3,s.length)),o=a[Math.floor(Math.random()*a.length)].point.clone();return o.x+=(Math.random()-.5)*1,o.z+=(Math.random()-.5)*1,o}const nl=[{agentId:"cipher",weapon:"spectre"},{agentId:"scope",weapon:"operator"},{agentId:"rampart",weapon:"odin"},{agentId:"phantom",weapon:"bucky"},{agentId:"blaze",weapon:"vandal"}];class jm{constructor(t,e){this.scene=t,this.tracerManager=e,this.bots=[],this.spawnPoints=[],this.playerRef=null}setTracerManager(t){this.tracerManager=t}spawn(t,e,n=null){this.clearAll(),this.spawnPoints=e,this.playerRef=n;const s=Cs;for(let r=0;r<t;r++){const a=nl[r%nl.length],o=s.find(u=>u.id===a.agentId)??s[0],c=[];this.playerRef&&c.push(this.playerRef);for(const u of this.bots)c.push(u);const l=zs(this.spawnPoints,c,18),d=new $m(this.scene,l,o,a.weapon,this.tracerManager);d.onGetSafeSpawn=()=>{const u=[];this.playerRef&&u.push(this.playerRef);for(const p of this.bots)p!==d&&!p.isDead&&u.push(p);return zs(this.spawnPoints,u,20)},this.bots.push(d)}return this.bots}update(t,e,n,s,r){const a=performance.now();for(const o of this.bots)o.update(t,e,n,s,r,this.bots),o.isDead&&o.deathTime>0&&a-o.deathTime>2200&&o._respawn()}getAll(){return this.bots}getLiving(){return this.bots.filter(t=>!t.isDead)}clearAll(){for(const t of this.bots)t.destroy();this.bots=[]}}class Jm{constructor(t){this.scene=t,this.tracers=[],this.sparks=[],this.tracerMat=new Le({color:16773222,transparent:!0,opacity:.9,depthWrite:!1}),this.enemyTracerMat=new Le({color:16724804,transparent:!0,opacity:.85,depthWrite:!1}),this.sparkGeo=new Re,this.sparkMat=new Ol({color:16763955,size:.12,transparent:!0,opacity:1,depthWrite:!1})}addTracer(t,e,n=!1,s=!1){const a=new R().subVectors(e,t).length();if(a<.2)return;const o=s?.012:.016,c=new Ht(o,o,a,4);c.translate(0,a/2,0),c.rotateX(Math.PI/2);let l;n?l=this.enemyTracerMat.clone():s?l=new Le({color:5239039,transparent:!0,opacity:.95,depthWrite:!1}):l=this.tracerMat.clone();const d=new $(c,l);d.position.copy(t),d.lookAt(e),this.scene.add(d);const u=s?.045:.065;this.tracers.push({mesh:d,life:u,maxLife:u})}addSparks(t,e=new R(0,1,0)){const s=new Float32Array(30),r=[];for(let c=0;c<10;c++){s[c*3]=t.x,s[c*3+1]=t.y,s[c*3+2]=t.z;const l=new R((Math.random()-.5)*4+e.x*2,(Math.random()-.5)*4+e.y*2,(Math.random()-.5)*4+e.z*2);r.push(l)}const a=new Re;a.setAttribute("position",new Ze(s,3));const o=new um(a,this.sparkMat.clone());this.scene.add(o),this.sparks.push({points:o,velocities:r,life:.25,maxLife:.25})}update(t){for(let e=this.tracers.length-1;e>=0;e--){const n=this.tracers[e];n.life-=t,n.life<=0?(this.scene.remove(n.mesh),n.mesh.geometry.dispose(),n.mesh.material.dispose(),this.tracers.splice(e,1)):n.mesh.material.opacity=n.life/n.maxLife*.9}for(let e=this.sparks.length-1;e>=0;e--){const n=this.sparks[e];if(n.life-=t,n.life<=0)this.scene.remove(n.points),n.points.geometry.dispose(),n.points.material.dispose(),this.sparks.splice(e,1);else{const s=n.points.geometry.attributes.position.array,r=n.velocities.length;for(let a=0;a<r;a++)s[a*3]+=n.velocities[a].x*t,s[a*3+1]+=n.velocities[a].y*t,s[a*3+2]+=n.velocities[a].z*t,n.velocities[a].y-=9.8*t;n.points.geometry.attributes.position.needsUpdate=!0,n.points.material.opacity=n.life/n.maxLife}}}clear(){for(const t of this.tracers)this.scene.remove(t.mesh),t.mesh.geometry.dispose();for(const t of this.sparks)this.scene.remove(t.points),t.points.geometry.dispose();this.tracers=[],this.sparks=[]}}const Rr=30,Qm=5*60*1e3;class t0{constructor(){this.playerKills=0,this.playerDeaths=0,this.botKillsTotal=0,this.startTime=0,this.timeLimit=Qm,this.active=!1,this.finished=!1,this._setupListeners()}_setupListeners(){Tt.on("bot:died",({botId:t,botName:e,killer:n})=>{this.active&&n==="YOU"&&(this.playerKills++,Tt.emit("dm:kill",{killer:"YOU",victim:e,kills:this.playerKills,goal:Rr}),this._checkWin())}),Tt.on("bot:shot_player",({botId:t,damage:e,isHead:n,botName:s})=>{this.active&&Tt.emit("player:take_damage",{amount:e,isHead:n,from:s})}),Tt.on("player:died",()=>{this.active&&(this.playerDeaths++,Tt.emit("dm:player_died",{deaths:this.playerDeaths}))}),Tt.on("player:shot_bot",({bot:t,damage:e,isHead:n,point:s})=>{this.active&&(t.takeDamage(e,n,"YOU"),Tt.emit("dm:hit",{damage:e,isHead:n,point:s}))})}start(){this.playerKills=0,this.playerDeaths=0,this.botKillsTotal=0,this.startTime=performance.now(),this.active=!0,this.finished=!1,Tt.emit("dm:started")}stop(){this.active=!1,this.finished=!0}_checkWin(){this.playerKills>=Rr&&this._end("win")}_end(t){if(this.finished)return;this.active=!1,this.finished=!0;const e=performance.now()-this.startTime;Tt.emit("dm:end",{result:t,kills:this.playerKills,deaths:this.playerDeaths,kd:+(this.playerKills/Math.max(1,this.playerDeaths)).toFixed(2),elapsed:Math.floor(e/1e3)})}update(){if(!this.active)return;const t=performance.now()-this.startTime,e=Math.max(0,this.timeLimit-t);Tt.emit("dm:tick",{remaining:e,kills:this.playerKills,goal:Rr}),e<=0&&this._end(this.playerKills>0?"win":"lose")}getStats(){return{kills:this.playerKills,deaths:this.playerDeaths,kd:+(this.playerKills/Math.max(1,this.playerDeaths)).toFixed(2)}}}class e0{constructor(){this.elTimer=document.getElementById("hud-timer"),this.elKills=document.getElementById("hud-kills"),this.elHealth=document.getElementById("hud-health-value"),this.elHealthBar=document.getElementById("hud-health-bar"),this.elShield=document.getElementById("hud-shield-value"),this.elAmmoMag=document.getElementById("hud-ammo-mag"),this.elReload=document.getElementById("hud-reload-label"),this.elAgentIcon=document.getElementById("hud-agent-icon"),this.elAgentName=document.getElementById("hud-agent-name"),this.elSlot1Name=document.getElementById("slot-1-name"),this.elSlot2Name=document.getElementById("slot-2-name"),this.elSlot1=document.getElementById("slot-1"),this.elSlot2=document.getElementById("slot-2"),this.elHitInd=document.getElementById("hit-indicator"),this.elDamageVig=document.getElementById("damage-vignette"),this.killFeedEl=document.getElementById("kill-feed"),this.elHitmarker=document.getElementById("hitmarker"),this.elDmgIndicator=document.getElementById("damage-indicator"),this.elSpawnShield=document.getElementById("spawn-shield-badge"),this.elPlayOverlay=document.getElementById("play-overlay"),this.elPoTitle=document.getElementById("po-title"),this.elPoSubtitle=document.getElementById("po-subtitle"),this.elPoPlayBtn=document.getElementById("po-play-btn"),this.elPoPlayText=document.getElementById("po-play-text"),this.elWeaponPicker=document.getElementById("death-weapon-picker"),this.maxHealth=100,this._setupListeners()}setAgent(t){this.maxHealth=t.health,this.elAgentIcon.textContent=t.emoji,this.elAgentName.textContent=t.name,this.elAgentIcon.style.background=t.color+"33",this.elAgentIcon.style.borderColor=t.color+"66"}setWeaponSlot(t,e){t===0&&(this.elSlot1Name.textContent=e?e.shortName:"—",this.elWeaponPicker&&e&&this.elWeaponPicker.querySelectorAll(".death-weapon-btn").forEach(n=>{n.classList.toggle("active",n.dataset.weapon===e.id)})),t===1&&(this.elSlot2Name.textContent=e?e.shortName:"—")}_setupListeners(){Tt.on("player:damaged",({health:t,shield:e})=>{this.setHealth(t,e),this._flashDamage()}),Tt.on("player:spawn_shield",({active:t})=>{this.elSpawnShield&&this.elSpawnShield.classList.toggle("hidden",!t)}),Tt.on("player:respawn",({health:t})=>{this.setHealth(t,50),this.hidePlayOverlay()}),Tt.on("player:died",t=>{this.showPlayOverlay({title:"ELIMINATED",subtitle:"CHOOSE WEAPON & CLICK TO RESPAWN",playText:"CLICK TO RESPAWN",weaponId:(t==null?void 0:t.currentWeaponId)??"vandal"})}),Tt.on("controls:locked",()=>{this.hidePlayOverlay()}),Tt.on("controls:unlocked",()=>{const t=document.getElementById("game-container");t&&t.classList.contains("active")&&this.showPlayOverlay({title:"TACTICAL LOADOUT",subtitle:"CHOOSE WEAPON & CLICK TO DEPLOY",playText:"CLICK TO PLAY"})}),this.elWeaponPicker&&this.elWeaponPicker.addEventListener("click",t=>{const e=t.target.closest(".death-weapon-btn");e&&(this.elWeaponPicker.querySelectorAll(".death-weapon-btn").forEach(n=>n.classList.remove("active")),e.classList.add("active"),Tt.emit("player:select_weapon",{weaponId:e.dataset.weapon}))}),this.elPoPlayBtn&&this.elPoPlayBtn.addEventListener("click",()=>{Tt.emit("player:click_to_play")}),Tt.on("weapon:fire",({mag:t})=>{this.setAmmo(t)}),Tt.on("weapon:switch",({slot:t,weapon:e,mag:n})=>{this.setAmmo(n),this.setActiveSlot(t)}),Tt.on("weapon:reload_start",()=>{this.elReload.textContent="RELOADING..."}),Tt.on("weapon:reload_done",({mag:t})=>{this.setAmmo(t),this.elReload.textContent=""}),Tt.on("dm:tick",({remaining:t,kills:e,goal:n})=>{this.setTimer(t),this.setKills(e,n)}),Tt.on("dm:kill",({killer:t,victim:e,kills:n,goal:s})=>{this.addKillFeed(t,e),this.setKills(n,s),t==="YOU"&&cn.playKill()}),Tt.on("dm:hit",({isHead:t})=>{this.flashHitIndicator(t),this.flashHitmarker(t)}),Tt.on("player:scope",({scoped:t})=>{const e=document.getElementById("sniper-scope");e&&e.classList.toggle("active",t),document.getElementById("crosshair").style.opacity=t?0:1})}showPlayOverlay({title:t="ELIMINATED",subtitle:e="CHOOSE WEAPON & CLICK TO RESPAWN",playText:n="CLICK TO PLAY",weaponId:s}={}){this.elPlayOverlay&&(this.elPoTitle.textContent=t,this.elPoSubtitle.textContent=e,this.elPoPlayText.textContent=n,s&&this.elWeaponPicker&&this.elWeaponPicker.querySelectorAll(".death-weapon-btn").forEach(r=>{r.classList.toggle("active",r.dataset.weapon===s)}),this.elPlayOverlay.classList.remove("hidden"))}hidePlayOverlay(){this.elPlayOverlay&&this.elPlayOverlay.classList.add("hidden")}flashHitmarker(t){this.elHitmarker&&(this.elHitmarker.classList.toggle("headshot",t),this.elHitmarker.classList.remove("active"),this.elHitmarker.offsetWidth,this.elHitmarker.classList.add("active"))}flashDirectionalDamage(t,e){if(!this.elDmgIndicator)return;const n=(t-e)*(180/Math.PI);this.elDmgIndicator.style.transform=`translate(-50%, -50%) rotate(${n}deg)`,this.elDmgIndicator.classList.remove("flash"),this.elDmgIndicator.offsetWidth,this.elDmgIndicator.classList.add("flash")}setHealth(t,e){t=Math.max(0,t),this.elHealth.textContent=Math.ceil(t),this.elShield.textContent=`🛡 ${Math.ceil(e??0)}`;const n=t/this.maxHealth*100;this.elHealthBar.style.width=n+"%",this.elHealthBar.style.background=n>50?"#00ff87":n>25?"#ffb347":"#ff4655"}setAmmo(t){this.elAmmoMag.textContent=t}setTimer(t){const e=Math.ceil(t/1e3),n=Math.floor(e/60),s=String(e%60).padStart(2,"0");this.elTimer.textContent=`${n}:${s}`,e<=30?this.elTimer.style.color="#ff4655":this.elTimer.style.color=""}setKills(t,e){this.elKills.textContent=`${t} / ${e}`}setActiveSlot(t){this.elSlot1.classList.toggle("active",t===0),this.elSlot2.classList.toggle("active",t===1)}addKillFeed(t,e,n="",s=!1){const r=document.createElement("div");for(r.className=`kill-entry${s?" headshot":""}`,r.innerHTML=`
      <span class="kill-killer">${t}</span>
      <span class="kill-icon">${s?"💀":"⚡"}</span>
      <span class="kill-victim">${e}</span>
    `,this.killFeedEl.prepend(r),setTimeout(()=>r.remove(),4e3);this.killFeedEl.children.length>5;)this.killFeedEl.lastChild.remove()}flashHitIndicator(t){this.elHitInd.style.borderColor=t?"#C89B3C":"#FF4655",this.elHitInd.classList.remove("flash"),this.elHitInd.offsetWidth,this.elHitInd.classList.add("flash")}_flashDamage(){this.elDamageVig.classList.add("hurt"),clearTimeout(this._damageTimer),this._damageTimer=setTimeout(()=>{this.elDamageVig.classList.remove("hurt")},600)}}class n0{constructor(){this.el=document.getElementById("agent-select"),this.listEl=document.getElementById("agent-list"),this.detailsEl=document.getElementById("agent-details"),this.btnConfirm=document.getElementById("btn-confirm-agent"),this.btnBack=document.getElementById("btn-back-menu"),this.selectedAgentId="blaze",this.onConfirm=null,this.onBack=null,this._render(),this._bindEvents()}show(t,e){this.onConfirm=t,this.onBack=e,this.el.classList.add("active"),this._selectAgent(this.selectedAgentId)}hide(){this.el.classList.remove("active")}_render(){this.listEl.innerHTML=Cs.map(t=>`
      <div class="agent-card" data-id="${t.id}">
        <div class="agent-card-icon" style="background:${t.color}22; border:2px solid ${t.color}44">
          ${t.emoji}
        </div>
        <div class="agent-card-info">
          <div class="agent-card-name">${t.name}</div>
          <div class="agent-card-role">${t.role}</div>
        </div>
      </div>
    `).join("")}_selectAgent(t){this.selectedAgentId=t,this.listEl.querySelectorAll(".agent-card").forEach(e=>{e.classList.toggle("active",e.dataset.id===t)}),this._updateDetails()}_updateDetails(){const t=Cs.find(s=>s.id===this.selectedAgentId);if(!t)return;const e=Math.round(t.speed*80),n=Math.round(t.health/130*100);this.detailsEl.innerHTML=`
      <div class="agent-details-name" style="color:${t.color}">${t.name}</div>
      <div class="agent-details-role">${t.role}</div>
      <div style="font-size:14px;color:#8899a6;max-width:440px;line-height:1.6;margin-top:8px">${t.description}</div>

      <!-- Agent Attributes -->
      <div class="agent-stat-grid" style="margin-top:20px">
        <div class="agent-stat-item">
          <div class="agent-stat-label">BASE HEALTH</div>
          <div class="agent-stat-value">${t.health} HP</div>
          <div class="agent-stat-bar"><div class="agent-stat-bar-fill" style="width:${n}%;background:${t.color}"></div></div>
        </div>
        <div class="agent-stat-item">
          <div class="agent-stat-label">MOBILITY SPEED</div>
          <div class="agent-stat-value">${t.speed.toFixed(1)}x</div>
          <div class="agent-stat-bar"><div class="agent-stat-bar-fill" style="width:${e}%;background:${t.color}"></div></div>
        </div>
      </div>

      <!-- Tactical Lore Box -->
      <div style="margin-top:24px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);padding:18px 22px;border-radius:4px;max-width:440px">
        <div style="font-size:11px;letter-spacing:2px;color:var(--val-gray);text-transform:uppercase;margin-bottom:6px">TACTICAL PROFILE</div>
        <div style="font-size:13px;color:#c5d0db;line-height:1.5">
          Specialized in high-tempo engagements. Weapon loadout can be chosen freely on deployment.
        </div>
      </div>
    `}_bindEvents(){this.listEl.addEventListener("click",t=>{const e=t.target.closest(".agent-card");e&&this._selectAgent(e.dataset.id)}),this.btnConfirm.addEventListener("click",()=>{var e;const t=Cs.find(n=>n.id===this.selectedAgentId);this.hide(),(e=this.onConfirm)==null||e.call(this,t)}),this.btnBack.addEventListener("click",()=>{var t;this.hide(),(t=this.onBack)==null||t.call(this)})}}class i0{constructor(){this.el=document.getElementById("end-screen"),this.elResult=document.getElementById("end-result"),this.elStats=document.getElementById("end-stats"),this.btnAgain=document.getElementById("btn-play-again"),this.btnMenu=document.getElementById("btn-main-menu-end")}show({result:t,kills:e,deaths:n,kd:s,elapsed:r},a,o){this.el.classList.add("active"),this.elResult.textContent=t==="win"?"VICTORY":"DEFEAT",this.elResult.className=`end-result ${t}`;const c=Math.floor(r/60),l=String(r%60).padStart(2,"0");this.elStats.innerHTML=`
      <div class="end-stat-item">
        <div class="stat-label">KILLS</div>
        <div class="stat-val" style="color:#00ff87">${e}</div>
      </div>
      <div class="end-stat-item">
        <div class="stat-label">DEATHS</div>
        <div class="stat-val" style="color:#ff4655">${n}</div>
      </div>
      <div class="end-stat-item">
        <div class="stat-label">K/D</div>
        <div class="stat-val">${s}</div>
      </div>
      <div class="end-stat-item">
        <div class="stat-label">TIME</div>
        <div class="stat-val" style="font-size:24px">${c}:${l}</div>
      </div>
    `,this.btnAgain.onclick=()=>{this.hide(),a==null||a()},this.btnMenu.onclick=()=>{this.hide(),o==null||o()}}hide(){this.el.classList.remove("active")}}const s0="ASCENT",r0="Authentic 1:1 recreation of Valorant's Ascent Mid Courtyard, Catwalk, Market & Links in Venice, Italy",a0="#70b2fa",o0="#b8dcfa",l0=140,c0=350,h0=1.25,d0="#fff5e6",u0=1.65,f0="#fff8ee",p0=[[0,.9,30],[0,.9,-30],[17,2.9,-4],[-19,2.4,-2],[20,.9,-24],[-20,.9,20],[8,.9,12],[-8,.9,12],[24,.9,16],[-24,.9,-16],[24,.9,-14],[-24,.9,14],[6,.9,-14],[-6,.9,-14],[10,.9,26],[-10,.9,26]],m0=[{comment:"=== GROUND (VENETIAN PAVEMENT) ===",x:0,y:-.5,z:0,w:90,h:1,d:90,type:"ground"},{comment:"=== OUTER MAP BOUNDARY WALLS ===",x:0,y:5,z:-45,w:90,h:11,d:2,type:"wall"},{x:0,y:5,z:45,w:90,h:11,d:2,type:"wall"},{x:-45,y:5,z:0,w:2,h:11,d:90,type:"wall"},{x:45,y:5,z:0,w:2,h:11,d:90,type:"wall"},{comment:"=== MID COURTYARD CENTER RADIANITE STACK ==="},{x:3,y:1.25,z:1.5,w:2.8,h:2.5,d:2.8,type:"radianite"},{x:3,y:1.25,z:-1.5,w:2.8,h:2.5,d:2.8,type:"radianite"},{x:3,y:3.15,z:0,w:2.6,h:1.3,d:2.6,type:"box"},{comment:"=== MID COURTYARD WEST WOODEN COVER ==="},{x:-6,y:1,z:3,w:2.4,h:2,d:2.4,type:"box"},{x:-6,y:1,z:-3,w:2.4,h:2,d:2.4,type:"box"},{comment:"=== CATWALK (A-SIDE ELEVATED WALKWAY) ==="},{x:18,y:2,z:-4,w:6,h:.8,d:24,type:"platform"},{x:18,y:.8,z:-4,w:5.6,h:1.6,d:23.6,type:"structure"},{x:13,y:1,z:10,w:4,h:.8,d:6,type:"platform"},{x:13,y:.3,z:10,w:3.8,h:.6,d:5.8,type:"structure"},{comment:"=== CATWALK STAIRS (STEPPED INCLINE) ==="},{x:15,y:.3,z:6,w:3,h:.4,d:1.5,type:"platform"},{x:15.8,y:.7,z:4.5,w:3,h:.4,d:1.5,type:"platform"},{x:16.6,y:1.1,z:3,w:3,h:.4,d:1.5,type:"platform"},{x:17.4,y:1.5,z:1.5,w:3,h:.4,d:1.5,type:"platform"},{x:14.8,y:2.7,z:-4,w:.4,h:1,d:18,type:"wall"},{x:20,y:2.9,z:-9,w:2.2,h:1.2,d:2.2,type:"box"},{comment:"=== TREE / A LINK CONNECTION ==="},{x:14.5,y:3.5,z:-20,w:2,h:7,d:2,type:"wall"},{x:23.5,y:3.5,z:-20,w:2,h:7,d:2,type:"wall"},{x:19,y:6.5,z:-20,w:11,h:1.5,d:2,type:"wall"},{x:22,y:1.25,z:-28,w:3.2,h:2.5,d:3.2,type:"box"},{x:27,y:3.5,z:-22,w:2,h:7,d:22,type:"wall"},{comment:"=== MID MARKET / PIZZA (B-SIDE) ==="},{x:-20,y:1.5,z:-2,w:10,h:.8,d:20,type:"platform"},{x:-20,y:.6,z:-2,w:9.6,h:1.2,d:19.6,type:"structure"},{x:-14.8,y:3.5,z:4.5,w:.6,h:7,d:7,type:"wall"},{x:-14.8,y:3.5,z:-8.5,w:.6,h:7,d:7,type:"wall"},{x:-14.8,y:2.2,z:-2,w:.6,h:.8,d:4.5,type:"wall"},{x:-14.8,y:6.2,z:-2,w:.6,h:1.8,d:4.5,type:"wall"},{comment:"=== MARKET WINDOW SILL & AWNING ==="},{x:-14.4,y:2.7,z:-2,w:.4,h:.15,d:4.6,type:"structure"},{x:-14.2,y:5.4,z:-2,w:1,h:.2,d:5,type:"box"},{x:-25,y:4,z:-2,w:1.5,h:8,d:22,type:"wall"},{x:-21,y:2.4,z:-2,w:1.8,h:1.2,d:5.5,type:"box"},{comment:"=== B LINK / MID BOTTOM CONNECTOR ==="},{x:-18,y:3.5,z:18,w:2,h:7,d:16,type:"wall"},{x:-10,y:1.25,z:20,w:2.8,h:2.5,d:2.8,type:"radianite"},{x:-24,y:1,z:24,w:2.4,h:2,d:2.4,type:"box"},{comment:"=== TOP MID / DEFENDER ARCH (NORTH) ==="},{x:-4.5,y:4,z:-22,w:2.5,h:8,d:2.5,type:"wall"},{x:4.5,y:4,z:-22,w:2.5,h:8,d:2.5,type:"wall"},{x:0,y:7.2,z:-22,w:11.5,h:1.8,d:2.5,type:"structure"},{comment:"=== ARCH CORNICE & PILLAR BASES ==="},{x:-4.5,y:.5,z:-22,w:3,h:1,d:3,type:"structure"},{x:4.5,y:.5,z:-22,w:3,h:1,d:3,type:"structure"},{x:0,y:4,z:-38,w:36,h:8,d:2,type:"wall"},{x:-6,y:1.25,z:-28,w:3,h:2.5,d:3,type:"box"},{x:6,y:1.25,z:-28,w:3,h:2.5,d:3,type:"radianite"},{comment:"=== MID TILES / CUBBY (ATTACKER SOUTH) ==="},{x:-9,y:3.5,z:24,w:12,h:7,d:2,type:"wall"},{x:9,y:3.5,z:24,w:12,h:7,d:2,type:"wall"},{x:10,y:3,z:15,w:2,h:6,d:6,type:"wall"},{x:0,y:4,z:42,w:40,h:8,d:2,type:"wall"},{x:-3,y:1.25,z:32,w:2.8,h:2.5,d:2.8,type:"box"},{x:4,y:1.25,z:32,w:2.8,h:2.5,d:2.8,type:"radianite"}],il={name:s0,description:r0,skyColor:a0,fogColor:o0,fogNear:l0,fogFar:c0,ambientIntensity:h0,ambientColor:d0,sunIntensity:u0,sunColor:f0,spawn:p0,blocks:m0};let _e,Ps,_a,Bt,un,Ni,ze,Ei,kl,Gl,Hl=null,Ua="vandal",Ls=[];const g0=7;function _0(){_e=new Am,Ei=new Jm(_e.scene),Ps=new Im(_e.scene),ze=new e0,kl=new n0,Gl=new i0,un=new jm(_e.scene,Ei),x0(),v0()}function Na(){Vs(),document.getElementById("main-menu").classList.add("active"),_e.stop()}function Vs(){document.querySelectorAll(".screen").forEach(i=>{i.classList.remove("active"),i.style.display=""})}function x0(){document.getElementById("btn-play").addEventListener("click",()=>{Vs(),kl.show((i,t)=>Vl(i,t),()=>Na())}),document.getElementById("btn-leaderboard").addEventListener("click",()=>{alert("Leaderboard is coming in Phase 2 (Supabase integration) 🚀")}),document.getElementById("btn-settings").addEventListener("click",()=>{alert("Settings coming soon in next update.")})}async function Vl(i,t="vandal"){var s,r;Hl=i,Ua=t,Vs(),document.getElementById("game-container").classList.add("active"),_e.resize(),await Ps.load(il),Ls=Ps.getSpawnPoints(il),_a=new Um(Ps.getColliders());const n=zs(Ls,[]);Bt=new Wm(_e.camera,_a,_e.scene,Ei),Bt.setAgent(i),Bt.position.copy(n),Bt.camera.position.copy(n),Bt.camera.position.y+=.72,Bt.equipWeapon(t,0),Bt.equipWeapon("classic",1),Bt.switchSlot(0),un.setTracerManager(Ei),un.spawn(g0,Ls,Bt),ze.setAgent(i),ze.setWeaponSlot(0,(s=Bt.weaponSlots[0])==null?void 0:s.def),ze.setWeaponSlot(1,(r=Bt.weaponSlots[1])==null?void 0:r.def),ze.setActiveSlot(0),ze.setHealth(i.health,50),ze.showPlayOverlay({title:"READY TO DEPLOY",subtitle:"CHOOSE WEAPON & CLICK TO PLAY",playText:"CLICK TO PLAY",weaponId:t}),Ni&&Ni.stop(),Ni=new t0,_e.removeUpdateFn(xa),_e.addUpdateFn(xa),_e.start(),Ni.start()}function xa(i){!Bt||!un||(Ei.update(i),Bt.update(i,un.getAll()),un.update(i,Bt.position,_a,Bt.alive,Bt.velocity),Ni.update())}function v0(){const i=document.getElementById("game-container");i.addEventListener("mousedown",t=>{_e.isLocked&&(t.button===0&&(Bt==null||Bt.startFire()),t.button===2&&(Bt==null||Bt.setScoped(!0)))}),window.addEventListener("mouseup",t=>{t.button===0&&(Bt==null||Bt.stopFire()),t.button===2&&(Bt==null||Bt.setScoped(!1))}),i.addEventListener("contextmenu",t=>t.preventDefault()),Tt.on("player:take_damage",({amount:t,isHead:e,from:n,angle:s})=>{Bt==null||Bt.takeDamage(t),ze.addKillFeed(n??"BOT","YOU","",e),s!==void 0&&ze.flashDirectionalDamage(s,_e.camera.rotation.y)}),Tt.on("bot:killed_bot",({killer:t,victim:e,weapon:n,isHead:s})=>{ze.addKillFeed(t,e,n,s)}),Tt.on("player:select_weapon",({weaponId:t})=>{var e;Ua=t,Bt&&(Bt.equipWeapon(t,0),ze.setWeaponSlot(0,(e=Bt.weaponSlots[0])==null?void 0:e.def))}),Tt.on("player:died",()=>{_e.unlockPointer()}),Tt.on("player:click_to_play",()=>{var t;if(Bt){if(!Bt.alive){const e=un?un.getLiving():[],n=zs(Ls,e,22);Bt.respawn(n)}ze.setWeaponSlot(0,(t=Bt.weaponSlots[0])==null?void 0:t.def),_e.lockPointer()}}),Tt.on("dm:end",t=>{M0(t)}),window.addEventListener("keydown",t=>{t.code==="Tab"&&t.preventDefault()})}function M0(i){_e.stop(),_e.unlockPointer(),_e.removeUpdateFn(xa),un.clearAll(),Ei.clear(),Vs(),Gl.show(i,()=>Vl(Hl,Ua),()=>Na())}_0();Na();
//# sourceMappingURL=index-CbOO531j.js.map
