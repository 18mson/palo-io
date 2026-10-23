(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(i){if(i.ep)return;i.ep=!0;const s=t(i);fetch(i.href,s)}})();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Ea="169",Eh=0,il=1,Ah=2,Dc=1,Nc=2,In=3,Fn=0,qt=1,Nt=2,$n=0,Bi=1,Ss=2,sl=3,rl=4,Rh=5,di=100,Ch=101,Ph=102,Lh=103,Ih=104,Dh=200,Nh=201,Uh=202,Bh=203,Po=204,Lo=205,Oh=206,Fh=207,kh=208,zh=209,Gh=210,Hh=211,Vh=212,Wh=213,Xh=214,Io=0,Do=1,No=2,Hi=3,Uo=4,Bo=5,Oo=6,Fo=7,Uc=0,qh=1,Kh=2,Jn=0,Yh=1,jh=2,Zh=3,Bc=4,$h=5,Jh=6,Qh=7,ol="attached",ed="detached",Oc=300,Vi=301,Wi=302,ko=303,zo=304,Lr=306,Fe=1e3,jn=1001,vr=1002,Xt=1003,Fc=1004,gs=1005,en=1006,hr=1007,Bn=1008,kn=1009,kc=1010,zc=1011,bs=1012,Aa=1013,pi=1014,mn=1015,Cs=1016,Ra=1017,Ca=1018,Xi=1020,Gc=35902,Hc=1021,Vc=1022,an=1023,Wc=1024,Xc=1025,Oi=1026,qi=1027,Pa=1028,La=1029,qc=1030,Ia=1031,Da=1033,dr=33776,ur=33777,fr=33778,pr=33779,Go=35840,Ho=35841,Vo=35842,Wo=35843,Xo=36196,qo=37492,Ko=37496,Yo=37808,jo=37809,Zo=37810,$o=37811,Jo=37812,Qo=37813,ea=37814,ta=37815,na=37816,ia=37817,sa=37818,ra=37819,oa=37820,aa=37821,mr=36492,la=36494,ca=36495,Kc=36283,ha=36284,da=36285,ua=36286,Ts=2300,ws=2301,Fr=2302,al=2400,ll=2401,cl=2402,td=2500,nd=0,Yc=1,fa=2,id=3200,sd=3201,jc=0,rd=1,Yn="",Ft="srgb",Ut="srgb-linear",Na="display-p3",Ir="display-p3-linear",Mr="linear",xt="srgb",Sr="rec709",br="p3",xi=7680,hl=519,od=512,ad=513,ld=514,Zc=515,cd=516,hd=517,dd=518,ud=519,pa=35044,dl="300 es",On=2e3,Tr=2001;class gi{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const i=this._listeners[e];if(i!==void 0){const s=i.indexOf(t);s!==-1&&i.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let s=0,o=i.length;s<o;s++)i[s].call(this,e);e.target=null}}}const Bt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let ul=1234567;const Fi=Math.PI/180,Ki=180/Math.PI;function gn(){const r=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Bt[r&255]+Bt[r>>8&255]+Bt[r>>16&255]+Bt[r>>24&255]+"-"+Bt[e&255]+Bt[e>>8&255]+"-"+Bt[e>>16&15|64]+Bt[e>>24&255]+"-"+Bt[t&63|128]+Bt[t>>8&255]+"-"+Bt[t>>16&255]+Bt[t>>24&255]+Bt[n&255]+Bt[n>>8&255]+Bt[n>>16&255]+Bt[n>>24&255]).toLowerCase()}function kt(r,e,t){return Math.max(e,Math.min(t,r))}function Ua(r,e){return(r%e+e)%e}function fd(r,e,t,n,i){return n+(r-e)*(i-n)/(t-e)}function pd(r,e,t){return r!==e?(t-r)/(e-r):0}function vs(r,e,t){return(1-t)*r+t*e}function md(r,e,t,n){return vs(r,e,1-Math.exp(-t*n))}function gd(r,e=1){return e-Math.abs(Ua(r,e*2)-e)}function _d(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*(3-2*r))}function xd(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*r*(r*(r*6-15)+10))}function yd(r,e){return r+Math.floor(Math.random()*(e-r+1))}function vd(r,e){return r+Math.random()*(e-r)}function Md(r){return r*(.5-Math.random())}function Sd(r){r!==void 0&&(ul=r);let e=ul+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function bd(r){return r*Fi}function Td(r){return r*Ki}function wd(r){return(r&r-1)===0&&r!==0}function Ed(r){return Math.pow(2,Math.ceil(Math.log(r)/Math.LN2))}function Ad(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function Rd(r,e,t,n,i){const s=Math.cos,o=Math.sin,a=s(t/2),l=o(t/2),c=s((e+n)/2),d=o((e+n)/2),h=s((e-n)/2),u=o((e-n)/2),p=s((n-e)/2),g=o((n-e)/2);switch(i){case"XYX":r.set(a*d,l*h,l*u,a*c);break;case"YZY":r.set(l*u,a*d,l*h,a*c);break;case"ZXZ":r.set(l*h,l*u,a*d,a*c);break;case"XZX":r.set(a*d,l*g,l*p,a*c);break;case"YXY":r.set(l*p,a*d,l*g,a*c);break;case"ZYZ":r.set(l*g,l*p,a*d,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function pn(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function ht(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}const Me={DEG2RAD:Fi,RAD2DEG:Ki,generateUUID:gn,clamp:kt,euclideanModulo:Ua,mapLinear:fd,inverseLerp:pd,lerp:vs,damp:md,pingpong:gd,smoothstep:_d,smootherstep:xd,randInt:yd,randFloat:vd,randFloatSpread:Md,seededRandom:Sd,degToRad:bd,radToDeg:Td,isPowerOfTwo:wd,ceilPowerOfTwo:Ed,floorPowerOfTwo:Ad,setQuaternionFromProperEuler:Rd,normalize:ht,denormalize:pn};class qe{constructor(e=0,t=0){qe.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(kt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*n-o*i+e.x,this.y=s*i+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Xe{constructor(e,t,n,i,s,o,a,l,c){Xe.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,o,a,l,c)}set(e,t,n,i,s,o,a,l,c){const d=this.elements;return d[0]=e,d[1]=i,d[2]=a,d[3]=t,d[4]=s,d[5]=l,d[6]=n,d[7]=o,d[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],d=n[4],h=n[7],u=n[2],p=n[5],g=n[8],_=i[0],f=i[3],m=i[6],v=i[1],x=i[4],M=i[7],A=i[2],E=i[5],w=i[8];return s[0]=o*_+a*v+l*A,s[3]=o*f+a*x+l*E,s[6]=o*m+a*M+l*w,s[1]=c*_+d*v+h*A,s[4]=c*f+d*x+h*E,s[7]=c*m+d*M+h*w,s[2]=u*_+p*v+g*A,s[5]=u*f+p*x+g*E,s[8]=u*m+p*M+g*w,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],d=e[8];return t*o*d-t*a*c-n*s*d+n*a*l+i*s*c-i*o*l}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],d=e[8],h=d*o-a*c,u=a*l-d*s,p=c*s-o*l,g=t*h+n*u+i*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=h*_,e[1]=(i*c-d*n)*_,e[2]=(a*n-i*o)*_,e[3]=u*_,e[4]=(d*t-i*l)*_,e[5]=(i*s-a*t)*_,e[6]=p*_,e[7]=(n*l-c*t)*_,e[8]=(o*t-n*s)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,s,o,a){const l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*o+c*a)+o+e,-i*c,i*l,-i*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(kr.makeScale(e,t)),this}rotate(e){return this.premultiply(kr.makeRotation(-e)),this}translate(e,t){return this.premultiply(kr.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const kr=new Xe;function $c(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}function Es(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function Cd(){const r=Es("canvas");return r.style.display="block",r}const fl={};function gr(r){r in fl||(fl[r]=!0,console.warn(r))}function Pd(r,e,t){return new Promise(function(n,i){function s(){switch(r.clientWaitSync(e,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:i();break;case r.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}function Ld(r){const e=r.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function Id(r){const e=r.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const pl=new Xe().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),ml=new Xe().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),rs={[Ut]:{transfer:Mr,primaries:Sr,luminanceCoefficients:[.2126,.7152,.0722],toReference:r=>r,fromReference:r=>r},[Ft]:{transfer:xt,primaries:Sr,luminanceCoefficients:[.2126,.7152,.0722],toReference:r=>r.convertSRGBToLinear(),fromReference:r=>r.convertLinearToSRGB()},[Ir]:{transfer:Mr,primaries:br,luminanceCoefficients:[.2289,.6917,.0793],toReference:r=>r.applyMatrix3(ml),fromReference:r=>r.applyMatrix3(pl)},[Na]:{transfer:xt,primaries:br,luminanceCoefficients:[.2289,.6917,.0793],toReference:r=>r.convertSRGBToLinear().applyMatrix3(ml),fromReference:r=>r.applyMatrix3(pl).convertLinearToSRGB()}},Dd=new Set([Ut,Ir]),st={enabled:!0,_workingColorSpace:Ut,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(r){if(!Dd.has(r))throw new Error(`Unsupported working color space, "${r}".`);this._workingColorSpace=r},convert:function(r,e,t){if(this.enabled===!1||e===t||!e||!t)return r;const n=rs[e].toReference,i=rs[t].fromReference;return i(n(r))},fromWorkingColorSpace:function(r,e){return this.convert(r,this._workingColorSpace,e)},toWorkingColorSpace:function(r,e){return this.convert(r,e,this._workingColorSpace)},getPrimaries:function(r){return rs[r].primaries},getTransfer:function(r){return r===Yn?Mr:rs[r].transfer},getLuminanceCoefficients:function(r,e=this._workingColorSpace){return r.fromArray(rs[e].luminanceCoefficients)}};function ki(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function zr(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let yi;class Nd{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{yi===void 0&&(yi=Es("canvas")),yi.width=e.width,yi.height=e.height;const n=yi.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=yi}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Es("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),s=i.data;for(let o=0;o<s.length;o++)s[o]=ki(s[o]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(ki(t[n]/255)*255):t[n]=ki(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Ud=0;class Jc{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Ud++}),this.uuid=gn(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?s.push(Gr(i[o].image)):s.push(Gr(i[o]))}else s=Gr(i);n.url=s}return t||(e.images[this.uuid]=n),n}}function Gr(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?Nd.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Bd=0;class Et extends gi{constructor(e=Et.DEFAULT_IMAGE,t=Et.DEFAULT_MAPPING,n=jn,i=jn,s=en,o=Bn,a=an,l=kn,c=Et.DEFAULT_ANISOTROPY,d=Yn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Bd++}),this.uuid=gn(),this.name="",this.source=new Jc(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new qe(0,0),this.repeat=new qe(1,1),this.center=new qe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Xe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Oc)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Fe:e.x=e.x-Math.floor(e.x);break;case jn:e.x=e.x<0?0:1;break;case vr:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Fe:e.y=e.y-Math.floor(e.y);break;case jn:e.y=e.y<0?0:1;break;case vr:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Et.DEFAULT_IMAGE=null;Et.DEFAULT_MAPPING=Oc;Et.DEFAULT_ANISOTROPY=1;class rt{constructor(e=0,t=0,n=0,i=1){rt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*i+o[12]*s,this.y=o[1]*t+o[5]*n+o[9]*i+o[13]*s,this.z=o[2]*t+o[6]*n+o[10]*i+o[14]*s,this.w=o[3]*t+o[7]*n+o[11]*i+o[15]*s,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,s;const l=e.elements,c=l[0],d=l[4],h=l[8],u=l[1],p=l[5],g=l[9],_=l[2],f=l[6],m=l[10];if(Math.abs(d-u)<.01&&Math.abs(h-_)<.01&&Math.abs(g-f)<.01){if(Math.abs(d+u)<.1&&Math.abs(h+_)<.1&&Math.abs(g+f)<.1&&Math.abs(c+p+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const x=(c+1)/2,M=(p+1)/2,A=(m+1)/2,E=(d+u)/4,w=(h+_)/4,L=(g+f)/4;return x>M&&x>A?x<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(x),i=E/n,s=w/n):M>A?M<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(M),n=E/i,s=L/i):A<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(A),n=w/s,i=L/s),this.set(n,i,s,t),this}let v=Math.sqrt((f-g)*(f-g)+(h-_)*(h-_)+(u-d)*(u-d));return Math.abs(v)<.001&&(v=1),this.x=(f-g)/v,this.y=(h-_)/v,this.z=(u-d)/v,this.w=Math.acos((c+p+m-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Od extends gi{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new rt(0,0,e,t),this.scissorTest=!1,this.viewport=new rt(0,0,e,t);const i={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:en,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const s=new Et(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);s.flipY=!1,s.generateMipmaps=n.generateMipmaps,s.internalFormat=n.internalFormat,this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,i=e.textures.length;n<i;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new Jc(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class mi extends Od{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Qc extends Et{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Xt,this.minFilter=Xt,this.wrapR=jn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Fd extends Et{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Xt,this.minFilter=Xt,this.wrapR=jn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ei{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,s,o,a){let l=n[i+0],c=n[i+1],d=n[i+2],h=n[i+3];const u=s[o+0],p=s[o+1],g=s[o+2],_=s[o+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=d,e[t+3]=h;return}if(a===1){e[t+0]=u,e[t+1]=p,e[t+2]=g,e[t+3]=_;return}if(h!==_||l!==u||c!==p||d!==g){let f=1-a;const m=l*u+c*p+d*g+h*_,v=m>=0?1:-1,x=1-m*m;if(x>Number.EPSILON){const A=Math.sqrt(x),E=Math.atan2(A,m*v);f=Math.sin(f*E)/A,a=Math.sin(a*E)/A}const M=a*v;if(l=l*f+u*M,c=c*f+p*M,d=d*f+g*M,h=h*f+_*M,f===1-a){const A=1/Math.sqrt(l*l+c*c+d*d+h*h);l*=A,c*=A,d*=A,h*=A}}e[t]=l,e[t+1]=c,e[t+2]=d,e[t+3]=h}static multiplyQuaternionsFlat(e,t,n,i,s,o){const a=n[i],l=n[i+1],c=n[i+2],d=n[i+3],h=s[o],u=s[o+1],p=s[o+2],g=s[o+3];return e[t]=a*g+d*h+l*p-c*u,e[t+1]=l*g+d*u+c*h-a*p,e[t+2]=c*g+d*p+a*u-l*h,e[t+3]=d*g-a*h-l*u-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,i=e._y,s=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(n/2),d=a(i/2),h=a(s/2),u=l(n/2),p=l(i/2),g=l(s/2);switch(o){case"XYZ":this._x=u*d*h+c*p*g,this._y=c*p*h-u*d*g,this._z=c*d*g+u*p*h,this._w=c*d*h-u*p*g;break;case"YXZ":this._x=u*d*h+c*p*g,this._y=c*p*h-u*d*g,this._z=c*d*g-u*p*h,this._w=c*d*h+u*p*g;break;case"ZXY":this._x=u*d*h-c*p*g,this._y=c*p*h+u*d*g,this._z=c*d*g+u*p*h,this._w=c*d*h-u*p*g;break;case"ZYX":this._x=u*d*h-c*p*g,this._y=c*p*h+u*d*g,this._z=c*d*g-u*p*h,this._w=c*d*h+u*p*g;break;case"YZX":this._x=u*d*h+c*p*g,this._y=c*p*h+u*d*g,this._z=c*d*g-u*p*h,this._w=c*d*h-u*p*g;break;case"XZY":this._x=u*d*h-c*p*g,this._y=c*p*h-u*d*g,this._z=c*d*g+u*p*h,this._w=c*d*h+u*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],s=t[8],o=t[1],a=t[5],l=t[9],c=t[2],d=t[6],h=t[10],u=n+a+h;if(u>0){const p=.5/Math.sqrt(u+1);this._w=.25/p,this._x=(d-l)*p,this._y=(s-c)*p,this._z=(o-i)*p}else if(n>a&&n>h){const p=2*Math.sqrt(1+n-a-h);this._w=(d-l)/p,this._x=.25*p,this._y=(i+o)/p,this._z=(s+c)/p}else if(a>h){const p=2*Math.sqrt(1+a-n-h);this._w=(s-c)/p,this._x=(i+o)/p,this._y=.25*p,this._z=(l+d)/p}else{const p=2*Math.sqrt(1+h-n-a);this._w=(o-i)/p,this._x=(s+c)/p,this._y=(l+d)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(kt(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,s=e._z,o=e._w,a=t._x,l=t._y,c=t._z,d=t._w;return this._x=n*d+o*a+i*c-s*l,this._y=i*d+o*l+s*a-n*c,this._z=s*d+o*c+n*l-i*a,this._w=o*d-n*a-i*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,i=this._y,s=this._z,o=this._w;let a=o*e._w+n*e._x+i*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=i,this._z=s,this;const l=1-a*a;if(l<=Number.EPSILON){const p=1-t;return this._w=p*o+t*this._w,this._x=p*n+t*this._x,this._y=p*i+t*this._y,this._z=p*s+t*this._z,this.normalize(),this}const c=Math.sqrt(l),d=Math.atan2(c,a),h=Math.sin((1-t)*d)/c,u=Math.sin(t*d)/c;return this._w=o*h+this._w*u,this._x=n*h+this._x*u,this._y=i*h+this._y*u,this._z=s*h+this._z*u,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class C{constructor(e=0,t=0,n=0){C.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(gl.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(gl.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*i,this.y=s[1]*t+s[4]*n+s[7]*i,this.z=s[2]*t+s[5]*n+s[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=e.elements,o=1/(s[3]*t+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*i+s[12])*o,this.y=(s[1]*t+s[5]*n+s[9]*i+s[13])*o,this.z=(s[2]*t+s[6]*n+s[10]*i+s[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,s=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*i-a*n),d=2*(a*t-s*i),h=2*(s*n-o*t);return this.x=t+l*c+o*h-a*d,this.y=n+l*d+a*c-s*h,this.z=i+l*h+s*d-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*i,this.y=s[1]*t+s[5]*n+s[9]*i,this.z=s[2]*t+s[6]*n+s[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,s=e.z,o=t.x,a=t.y,l=t.z;return this.x=i*l-s*a,this.y=s*o-n*l,this.z=n*a-i*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Hr.copy(this).projectOnVector(e),this.sub(Hr)}reflect(e){return this.sub(Hr.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(kt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Hr=new C,gl=new ei;class Yt{constructor(e=new C(1/0,1/0,1/0),t=new C(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(hn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(hn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=hn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,hn):hn.fromBufferAttribute(s,o),hn.applyMatrix4(e.matrixWorld),this.expandByPoint(hn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Ns.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Ns.copy(n.boundingBox)),Ns.applyMatrix4(e.matrixWorld),this.union(Ns)}const i=e.children;for(let s=0,o=i.length;s<o;s++)this.expandByObject(i[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,hn),hn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(os),Us.subVectors(this.max,os),vi.subVectors(e.a,os),Mi.subVectors(e.b,os),Si.subVectors(e.c,os),Gn.subVectors(Mi,vi),Hn.subVectors(Si,Mi),ni.subVectors(vi,Si);let t=[0,-Gn.z,Gn.y,0,-Hn.z,Hn.y,0,-ni.z,ni.y,Gn.z,0,-Gn.x,Hn.z,0,-Hn.x,ni.z,0,-ni.x,-Gn.y,Gn.x,0,-Hn.y,Hn.x,0,-ni.y,ni.x,0];return!Vr(t,vi,Mi,Si,Us)||(t=[1,0,0,0,1,0,0,0,1],!Vr(t,vi,Mi,Si,Us))?!1:(Bs.crossVectors(Gn,Hn),t=[Bs.x,Bs.y,Bs.z],Vr(t,vi,Mi,Si,Us))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,hn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(hn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(En[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),En[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),En[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),En[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),En[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),En[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),En[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),En[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(En),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const En=[new C,new C,new C,new C,new C,new C,new C,new C],hn=new C,Ns=new Yt,vi=new C,Mi=new C,Si=new C,Gn=new C,Hn=new C,ni=new C,os=new C,Us=new C,Bs=new C,ii=new C;function Vr(r,e,t,n,i){for(let s=0,o=r.length-3;s<=o;s+=3){ii.fromArray(r,s);const a=i.x*Math.abs(ii.x)+i.y*Math.abs(ii.y)+i.z*Math.abs(ii.z),l=e.dot(ii),c=t.dot(ii),d=n.dot(ii);if(Math.max(-Math.max(l,c,d),Math.min(l,c,d))>a)return!1}return!0}const kd=new Yt,as=new C,Wr=new C;class bn{constructor(e=new C,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):kd.setFromPoints(e).getCenter(n);let i=0;for(let s=0,o=e.length;s<o;s++)i=Math.max(i,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;as.subVectors(e,this.center);const t=as.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(as,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Wr.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(as.copy(e.center).add(Wr)),this.expandByPoint(as.copy(e.center).sub(Wr))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const An=new C,Xr=new C,Os=new C,Vn=new C,qr=new C,Fs=new C,Kr=new C;class Qi{constructor(e=new C,t=new C(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,An)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=An.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(An.copy(this.origin).addScaledVector(this.direction,t),An.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){Xr.copy(e).add(t).multiplyScalar(.5),Os.copy(t).sub(e).normalize(),Vn.copy(this.origin).sub(Xr);const s=e.distanceTo(t)*.5,o=-this.direction.dot(Os),a=Vn.dot(this.direction),l=-Vn.dot(Os),c=Vn.lengthSq(),d=Math.abs(1-o*o);let h,u,p,g;if(d>0)if(h=o*l-a,u=o*a-l,g=s*d,h>=0)if(u>=-g)if(u<=g){const _=1/d;h*=_,u*=_,p=h*(h+o*u+2*a)+u*(o*h+u+2*l)+c}else u=s,h=Math.max(0,-(o*u+a)),p=-h*h+u*(u+2*l)+c;else u=-s,h=Math.max(0,-(o*u+a)),p=-h*h+u*(u+2*l)+c;else u<=-g?(h=Math.max(0,-(-o*s+a)),u=h>0?-s:Math.min(Math.max(-s,-l),s),p=-h*h+u*(u+2*l)+c):u<=g?(h=0,u=Math.min(Math.max(-s,-l),s),p=u*(u+2*l)+c):(h=Math.max(0,-(o*s+a)),u=h>0?s:Math.min(Math.max(-s,-l),s),p=-h*h+u*(u+2*l)+c);else u=o>0?-s:s,h=Math.max(0,-(o*u+a)),p=-h*h+u*(u+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,h),i&&i.copy(Xr).addScaledVector(Os,u),p}intersectSphere(e,t){An.subVectors(e.center,this.origin);const n=An.dot(this.direction),i=An.dot(An)-n*n,s=e.radius*e.radius;if(i>s)return null;const o=Math.sqrt(s-i),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,s,o,a,l;const c=1/this.direction.x,d=1/this.direction.y,h=1/this.direction.z,u=this.origin;return c>=0?(n=(e.min.x-u.x)*c,i=(e.max.x-u.x)*c):(n=(e.max.x-u.x)*c,i=(e.min.x-u.x)*c),d>=0?(s=(e.min.y-u.y)*d,o=(e.max.y-u.y)*d):(s=(e.max.y-u.y)*d,o=(e.min.y-u.y)*d),n>o||s>i||((s>n||isNaN(n))&&(n=s),(o<i||isNaN(i))&&(i=o),h>=0?(a=(e.min.z-u.z)*h,l=(e.max.z-u.z)*h):(a=(e.max.z-u.z)*h,l=(e.min.z-u.z)*h),n>l||a>i)||((a>n||n!==n)&&(n=a),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,An)!==null}intersectTriangle(e,t,n,i,s){qr.subVectors(t,e),Fs.subVectors(n,e),Kr.crossVectors(qr,Fs);let o=this.direction.dot(Kr),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Vn.subVectors(this.origin,e);const l=a*this.direction.dot(Fs.crossVectors(Vn,Fs));if(l<0)return null;const c=a*this.direction.dot(qr.cross(Vn));if(c<0||l+c>o)return null;const d=-a*Vn.dot(Kr);return d<0?null:this.at(d/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ze{constructor(e,t,n,i,s,o,a,l,c,d,h,u,p,g,_,f){ze.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,o,a,l,c,d,h,u,p,g,_,f)}set(e,t,n,i,s,o,a,l,c,d,h,u,p,g,_,f){const m=this.elements;return m[0]=e,m[4]=t,m[8]=n,m[12]=i,m[1]=s,m[5]=o,m[9]=a,m[13]=l,m[2]=c,m[6]=d,m[10]=h,m[14]=u,m[3]=p,m[7]=g,m[11]=_,m[15]=f,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ze().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,i=1/bi.setFromMatrixColumn(e,0).length(),s=1/bi.setFromMatrixColumn(e,1).length(),o=1/bi.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,s=e.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(i),c=Math.sin(i),d=Math.cos(s),h=Math.sin(s);if(e.order==="XYZ"){const u=o*d,p=o*h,g=a*d,_=a*h;t[0]=l*d,t[4]=-l*h,t[8]=c,t[1]=p+g*c,t[5]=u-_*c,t[9]=-a*l,t[2]=_-u*c,t[6]=g+p*c,t[10]=o*l}else if(e.order==="YXZ"){const u=l*d,p=l*h,g=c*d,_=c*h;t[0]=u+_*a,t[4]=g*a-p,t[8]=o*c,t[1]=o*h,t[5]=o*d,t[9]=-a,t[2]=p*a-g,t[6]=_+u*a,t[10]=o*l}else if(e.order==="ZXY"){const u=l*d,p=l*h,g=c*d,_=c*h;t[0]=u-_*a,t[4]=-o*h,t[8]=g+p*a,t[1]=p+g*a,t[5]=o*d,t[9]=_-u*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const u=o*d,p=o*h,g=a*d,_=a*h;t[0]=l*d,t[4]=g*c-p,t[8]=u*c+_,t[1]=l*h,t[5]=_*c+u,t[9]=p*c-g,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const u=o*l,p=o*c,g=a*l,_=a*c;t[0]=l*d,t[4]=_-u*h,t[8]=g*h+p,t[1]=h,t[5]=o*d,t[9]=-a*d,t[2]=-c*d,t[6]=p*h+g,t[10]=u-_*h}else if(e.order==="XZY"){const u=o*l,p=o*c,g=a*l,_=a*c;t[0]=l*d,t[4]=-h,t[8]=c*d,t[1]=u*h+_,t[5]=o*d,t[9]=p*h-g,t[2]=g*h-p,t[6]=a*d,t[10]=_*h+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(zd,e,Gd)}lookAt(e,t,n){const i=this.elements;return $t.subVectors(e,t),$t.lengthSq()===0&&($t.z=1),$t.normalize(),Wn.crossVectors(n,$t),Wn.lengthSq()===0&&(Math.abs(n.z)===1?$t.x+=1e-4:$t.z+=1e-4,$t.normalize(),Wn.crossVectors(n,$t)),Wn.normalize(),ks.crossVectors($t,Wn),i[0]=Wn.x,i[4]=ks.x,i[8]=$t.x,i[1]=Wn.y,i[5]=ks.y,i[9]=$t.y,i[2]=Wn.z,i[6]=ks.z,i[10]=$t.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],d=n[1],h=n[5],u=n[9],p=n[13],g=n[2],_=n[6],f=n[10],m=n[14],v=n[3],x=n[7],M=n[11],A=n[15],E=i[0],w=i[4],L=i[8],U=i[12],y=i[1],S=i[5],B=i[9],F=i[13],z=i[2],Y=i[6],G=i[10],J=i[14],X=i[3],le=i[7],re=i[11],ue=i[15];return s[0]=o*E+a*y+l*z+c*X,s[4]=o*w+a*S+l*Y+c*le,s[8]=o*L+a*B+l*G+c*re,s[12]=o*U+a*F+l*J+c*ue,s[1]=d*E+h*y+u*z+p*X,s[5]=d*w+h*S+u*Y+p*le,s[9]=d*L+h*B+u*G+p*re,s[13]=d*U+h*F+u*J+p*ue,s[2]=g*E+_*y+f*z+m*X,s[6]=g*w+_*S+f*Y+m*le,s[10]=g*L+_*B+f*G+m*re,s[14]=g*U+_*F+f*J+m*ue,s[3]=v*E+x*y+M*z+A*X,s[7]=v*w+x*S+M*Y+A*le,s[11]=v*L+x*B+M*G+A*re,s[15]=v*U+x*F+M*J+A*ue,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],s=e[12],o=e[1],a=e[5],l=e[9],c=e[13],d=e[2],h=e[6],u=e[10],p=e[14],g=e[3],_=e[7],f=e[11],m=e[15];return g*(+s*l*h-i*c*h-s*a*u+n*c*u+i*a*p-n*l*p)+_*(+t*l*p-t*c*u+s*o*u-i*o*p+i*c*d-s*l*d)+f*(+t*c*h-t*a*p-s*o*h+n*o*p+s*a*d-n*c*d)+m*(-i*a*d-t*l*h+t*a*u+i*o*h-n*o*u+n*l*d)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],d=e[8],h=e[9],u=e[10],p=e[11],g=e[12],_=e[13],f=e[14],m=e[15],v=h*f*c-_*u*c+_*l*p-a*f*p-h*l*m+a*u*m,x=g*u*c-d*f*c-g*l*p+o*f*p+d*l*m-o*u*m,M=d*_*c-g*h*c+g*a*p-o*_*p-d*a*m+o*h*m,A=g*h*l-d*_*l-g*a*u+o*_*u+d*a*f-o*h*f,E=t*v+n*x+i*M+s*A;if(E===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const w=1/E;return e[0]=v*w,e[1]=(_*u*s-h*f*s-_*i*p+n*f*p+h*i*m-n*u*m)*w,e[2]=(a*f*s-_*l*s+_*i*c-n*f*c-a*i*m+n*l*m)*w,e[3]=(h*l*s-a*u*s-h*i*c+n*u*c+a*i*p-n*l*p)*w,e[4]=x*w,e[5]=(d*f*s-g*u*s+g*i*p-t*f*p-d*i*m+t*u*m)*w,e[6]=(g*l*s-o*f*s-g*i*c+t*f*c+o*i*m-t*l*m)*w,e[7]=(o*u*s-d*l*s+d*i*c-t*u*c-o*i*p+t*l*p)*w,e[8]=M*w,e[9]=(g*h*s-d*_*s-g*n*p+t*_*p+d*n*m-t*h*m)*w,e[10]=(o*_*s-g*a*s+g*n*c-t*_*c-o*n*m+t*a*m)*w,e[11]=(d*a*s-o*h*s-d*n*c+t*h*c+o*n*p-t*a*p)*w,e[12]=A*w,e[13]=(d*_*i-g*h*i+g*n*u-t*_*u-d*n*f+t*h*f)*w,e[14]=(g*a*i-o*_*i-g*n*l+t*_*l+o*n*f-t*a*f)*w,e[15]=(o*h*i-d*a*i+d*n*l-t*h*l-o*n*u+t*a*u)*w,this}scale(e){const t=this.elements,n=e.x,i=e.y,s=e.z;return t[0]*=n,t[4]*=i,t[8]*=s,t[1]*=n,t[5]*=i,t[9]*=s,t[2]*=n,t[6]*=i,t[10]*=s,t[3]*=n,t[7]*=i,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),s=1-n,o=e.x,a=e.y,l=e.z,c=s*o,d=s*a;return this.set(c*o+n,c*a-i*l,c*l+i*a,0,c*a+i*l,d*a+n,d*l-i*o,0,c*l-i*a,d*l+i*o,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,s,o){return this.set(1,n,s,0,e,1,o,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,s=t._x,o=t._y,a=t._z,l=t._w,c=s+s,d=o+o,h=a+a,u=s*c,p=s*d,g=s*h,_=o*d,f=o*h,m=a*h,v=l*c,x=l*d,M=l*h,A=n.x,E=n.y,w=n.z;return i[0]=(1-(_+m))*A,i[1]=(p+M)*A,i[2]=(g-x)*A,i[3]=0,i[4]=(p-M)*E,i[5]=(1-(u+m))*E,i[6]=(f+v)*E,i[7]=0,i[8]=(g+x)*w,i[9]=(f-v)*w,i[10]=(1-(u+_))*w,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;let s=bi.set(i[0],i[1],i[2]).length();const o=bi.set(i[4],i[5],i[6]).length(),a=bi.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),e.x=i[12],e.y=i[13],e.z=i[14],dn.copy(this);const c=1/s,d=1/o,h=1/a;return dn.elements[0]*=c,dn.elements[1]*=c,dn.elements[2]*=c,dn.elements[4]*=d,dn.elements[5]*=d,dn.elements[6]*=d,dn.elements[8]*=h,dn.elements[9]*=h,dn.elements[10]*=h,t.setFromRotationMatrix(dn),n.x=s,n.y=o,n.z=a,this}makePerspective(e,t,n,i,s,o,a=On){const l=this.elements,c=2*s/(t-e),d=2*s/(n-i),h=(t+e)/(t-e),u=(n+i)/(n-i);let p,g;if(a===On)p=-(o+s)/(o-s),g=-2*o*s/(o-s);else if(a===Tr)p=-o/(o-s),g=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=d,l[9]=u,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,i,s,o,a=On){const l=this.elements,c=1/(t-e),d=1/(n-i),h=1/(o-s),u=(t+e)*c,p=(n+i)*d;let g,_;if(a===On)g=(o+s)*h,_=-2*h;else if(a===Tr)g=s*h,_=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-u,l[1]=0,l[5]=2*d,l[9]=0,l[13]=-p,l[2]=0,l[6]=0,l[10]=_,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const bi=new C,dn=new ze,zd=new C(0,0,0),Gd=new C(1,1,1),Wn=new C,ks=new C,$t=new C,_l=new ze,xl=new ei;class wt{constructor(e=0,t=0,n=0,i=wt.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,s=i[0],o=i[4],a=i[8],l=i[1],c=i[5],d=i[9],h=i[2],u=i[6],p=i[10];switch(t){case"XYZ":this._y=Math.asin(kt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-d,p),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-kt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(kt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-h,p),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-kt(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(u,p),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(kt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-d,c),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-kt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-d,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return _l.makeRotationFromQuaternion(e),this.setFromRotationMatrix(_l,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return xl.setFromEuler(this),this.setFromQuaternion(xl,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}wt.DEFAULT_ORDER="XYZ";class Ba{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Hd=0;const yl=new C,Ti=new ei,Rn=new ze,zs=new C,ls=new C,Vd=new C,Wd=new ei,vl=new C(1,0,0),Ml=new C(0,1,0),Sl=new C(0,0,1),bl={type:"added"},Xd={type:"removed"},wi={type:"childadded",child:null},Yr={type:"childremoved",child:null};class yt extends gi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Hd++}),this.uuid=gn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=yt.DEFAULT_UP.clone();const e=new C,t=new wt,n=new ei,i=new C(1,1,1);function s(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new ze},normalMatrix:{value:new Xe}}),this.matrix=new ze,this.matrixWorld=new ze,this.matrixAutoUpdate=yt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=yt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ba,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ti.setFromAxisAngle(e,t),this.quaternion.multiply(Ti),this}rotateOnWorldAxis(e,t){return Ti.setFromAxisAngle(e,t),this.quaternion.premultiply(Ti),this}rotateX(e){return this.rotateOnAxis(vl,e)}rotateY(e){return this.rotateOnAxis(Ml,e)}rotateZ(e){return this.rotateOnAxis(Sl,e)}translateOnAxis(e,t){return yl.copy(e).applyQuaternion(this.quaternion),this.position.add(yl.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(vl,e)}translateY(e){return this.translateOnAxis(Ml,e)}translateZ(e){return this.translateOnAxis(Sl,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Rn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?zs.copy(e):zs.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),ls.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Rn.lookAt(ls,zs,this.up):Rn.lookAt(zs,ls,this.up),this.quaternion.setFromRotationMatrix(Rn),i&&(Rn.extractRotation(i.matrixWorld),Ti.setFromRotationMatrix(Rn),this.quaternion.premultiply(Ti.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(bl),wi.child=e,this.dispatchEvent(wi),wi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Xd),Yr.child=e,this.dispatchEvent(Yr),Yr.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Rn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Rn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Rn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(bl),wi.child=e,this.dispatchEvent(wi),wi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const i=this.children;for(let s=0,o=i.length;s<o;s++)i[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ls,e,Vd),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ls,Wd,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const i=this.children;for(let s=0,o=i.length;s<o;s++)i[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,d=l.length;c<d;c++){const h=l[c];s(e.shapes,h)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(e.materials,this.material[l]));i.material=a}else i.material=s(e.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];i.animations.push(s(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),d=o(e.images),h=o(e.shapes),u=o(e.skeletons),p=o(e.animations),g=o(e.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),d.length>0&&(n.images=d),h.length>0&&(n.shapes=h),u.length>0&&(n.skeletons=u),p.length>0&&(n.animations=p),g.length>0&&(n.nodes=g)}return n.object=i,n;function o(a){const l=[];for(const c in a){const d=a[c];delete d.metadata,l.push(d)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}}yt.DEFAULT_UP=new C(0,1,0);yt.DEFAULT_MATRIX_AUTO_UPDATE=!0;yt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const un=new C,Cn=new C,jr=new C,Pn=new C,Ei=new C,Ai=new C,Tl=new C,Zr=new C,$r=new C,Jr=new C,Qr=new rt,eo=new rt,to=new rt;class on{constructor(e=new C,t=new C,n=new C){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),un.subVectors(e,t),i.cross(un);const s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(e,t,n,i,s){un.subVectors(i,t),Cn.subVectors(n,t),jr.subVectors(e,t);const o=un.dot(un),a=un.dot(Cn),l=un.dot(jr),c=Cn.dot(Cn),d=Cn.dot(jr),h=o*c-a*a;if(h===0)return s.set(0,0,0),null;const u=1/h,p=(c*l-a*d)*u,g=(o*d-a*l)*u;return s.set(1-p-g,g,p)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,Pn)===null?!1:Pn.x>=0&&Pn.y>=0&&Pn.x+Pn.y<=1}static getInterpolation(e,t,n,i,s,o,a,l){return this.getBarycoord(e,t,n,i,Pn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Pn.x),l.addScaledVector(o,Pn.y),l.addScaledVector(a,Pn.z),l)}static getInterpolatedAttribute(e,t,n,i,s,o){return Qr.setScalar(0),eo.setScalar(0),to.setScalar(0),Qr.fromBufferAttribute(e,t),eo.fromBufferAttribute(e,n),to.fromBufferAttribute(e,i),o.setScalar(0),o.addScaledVector(Qr,s.x),o.addScaledVector(eo,s.y),o.addScaledVector(to,s.z),o}static isFrontFacing(e,t,n,i){return un.subVectors(n,t),Cn.subVectors(e,t),un.cross(Cn).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return un.subVectors(this.c,this.b),Cn.subVectors(this.a,this.b),un.cross(Cn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return on.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return on.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,s){return on.getInterpolation(e,this.a,this.b,this.c,t,n,i,s)}containsPoint(e){return on.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return on.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,s=this.c;let o,a;Ei.subVectors(i,n),Ai.subVectors(s,n),Zr.subVectors(e,n);const l=Ei.dot(Zr),c=Ai.dot(Zr);if(l<=0&&c<=0)return t.copy(n);$r.subVectors(e,i);const d=Ei.dot($r),h=Ai.dot($r);if(d>=0&&h<=d)return t.copy(i);const u=l*h-d*c;if(u<=0&&l>=0&&d<=0)return o=l/(l-d),t.copy(n).addScaledVector(Ei,o);Jr.subVectors(e,s);const p=Ei.dot(Jr),g=Ai.dot(Jr);if(g>=0&&p<=g)return t.copy(s);const _=p*c-l*g;if(_<=0&&c>=0&&g<=0)return a=c/(c-g),t.copy(n).addScaledVector(Ai,a);const f=d*g-p*h;if(f<=0&&h-d>=0&&p-g>=0)return Tl.subVectors(s,i),a=(h-d)/(h-d+(p-g)),t.copy(i).addScaledVector(Tl,a);const m=1/(f+_+u);return o=_*m,a=u*m,t.copy(n).addScaledVector(Ei,o).addScaledVector(Ai,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const eh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Xn={h:0,s:0,l:0},Gs={h:0,s:0,l:0};function no(r,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?r+(e-r)*6*t:t<1/2?e:t<2/3?r+(e-r)*6*(2/3-t):r}class De{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Ft){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,st.toWorkingColorSpace(this,t),this}setRGB(e,t,n,i=st.workingColorSpace){return this.r=e,this.g=t,this.b=n,st.toWorkingColorSpace(this,i),this}setHSL(e,t,n,i=st.workingColorSpace){if(e=Ua(e,1),t=kt(t,0,1),n=kt(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,o=2*n-s;this.r=no(o,s,e+1/3),this.g=no(o,s,e),this.b=no(o,s,e-1/3)}return st.toWorkingColorSpace(this,i),this}setStyle(e,t=Ft){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=i[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Ft){const n=eh[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ki(e.r),this.g=ki(e.g),this.b=ki(e.b),this}copyLinearToSRGB(e){return this.r=zr(e.r),this.g=zr(e.g),this.b=zr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Ft){return st.fromWorkingColorSpace(Ot.copy(this),e),Math.round(kt(Ot.r*255,0,255))*65536+Math.round(kt(Ot.g*255,0,255))*256+Math.round(kt(Ot.b*255,0,255))}getHexString(e=Ft){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=st.workingColorSpace){st.fromWorkingColorSpace(Ot.copy(this),t);const n=Ot.r,i=Ot.g,s=Ot.b,o=Math.max(n,i,s),a=Math.min(n,i,s);let l,c;const d=(a+o)/2;if(a===o)l=0,c=0;else{const h=o-a;switch(c=d<=.5?h/(o+a):h/(2-o-a),o){case n:l=(i-s)/h+(i<s?6:0);break;case i:l=(s-n)/h+2;break;case s:l=(n-i)/h+4;break}l/=6}return e.h=l,e.s=c,e.l=d,e}getRGB(e,t=st.workingColorSpace){return st.fromWorkingColorSpace(Ot.copy(this),t),e.r=Ot.r,e.g=Ot.g,e.b=Ot.b,e}getStyle(e=Ft){st.fromWorkingColorSpace(Ot.copy(this),e);const t=Ot.r,n=Ot.g,i=Ot.b;return e!==Ft?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(Xn),this.setHSL(Xn.h+e,Xn.s+t,Xn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Xn),e.getHSL(Gs);const n=vs(Xn.h,Gs.h,t),i=vs(Xn.s,Gs.s,t),s=vs(Xn.l,Gs.l,t);return this.setHSL(n,i,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,i=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*i,this.g=s[1]*t+s[4]*n+s[7]*i,this.b=s[2]*t+s[5]*n+s[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ot=new De;De.NAMES=eh;let qd=0;class vn extends gi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:qd++}),this.uuid=gn(),this.name="",this.type="Material",this.blending=Bi,this.side=Fn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Po,this.blendDst=Lo,this.blendEquation=di,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new De(0,0,0),this.blendAlpha=0,this.depthFunc=Hi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=hl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=xi,this.stencilZFail=xi,this.stencilZPass=xi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Bi&&(n.blending=this.blending),this.side!==Fn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Po&&(n.blendSrc=this.blendSrc),this.blendDst!==Lo&&(n.blendDst=this.blendDst),this.blendEquation!==di&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Hi&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==hl&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==xi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==xi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==xi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(t){const s=i(e.textures),o=i(e.images);s.length>0&&(n.textures=s),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class lt extends vn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new De(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new wt,this.combine=Uc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const bt=new C,Hs=new qe;class Lt{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=pa,this.updateRanges=[],this.gpuType=mn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Hs.fromBufferAttribute(this,t),Hs.applyMatrix3(e),this.setXY(t,Hs.x,Hs.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)bt.fromBufferAttribute(this,t),bt.applyMatrix3(e),this.setXYZ(t,bt.x,bt.y,bt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)bt.fromBufferAttribute(this,t),bt.applyMatrix4(e),this.setXYZ(t,bt.x,bt.y,bt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)bt.fromBufferAttribute(this,t),bt.applyNormalMatrix(e),this.setXYZ(t,bt.x,bt.y,bt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)bt.fromBufferAttribute(this,t),bt.transformDirection(e),this.setXYZ(t,bt.x,bt.y,bt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=pn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=ht(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=pn(t,this.array)),t}setX(e,t){return this.normalized&&(t=ht(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=pn(t,this.array)),t}setY(e,t){return this.normalized&&(t=ht(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=pn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=ht(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=pn(t,this.array)),t}setW(e,t){return this.normalized&&(t=ht(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=ht(t,this.array),n=ht(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=ht(t,this.array),n=ht(n,this.array),i=ht(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e*=this.itemSize,this.normalized&&(t=ht(t,this.array),n=ht(n,this.array),i=ht(i,this.array),s=ht(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==pa&&(e.usage=this.usage),e}}class th extends Lt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class nh extends Lt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class gt extends Lt{constructor(e,t,n){super(new Float32Array(e),t,n)}}let Kd=0;const nn=new ze,io=new yt,Ri=new C,Jt=new Yt,cs=new Yt,Ct=new C;class Tt extends gi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Kd++}),this.uuid=gn(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new($c(e)?nh:th)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new Xe().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return nn.makeRotationFromQuaternion(e),this.applyMatrix4(nn),this}rotateX(e){return nn.makeRotationX(e),this.applyMatrix4(nn),this}rotateY(e){return nn.makeRotationY(e),this.applyMatrix4(nn),this}rotateZ(e){return nn.makeRotationZ(e),this.applyMatrix4(nn),this}translate(e,t,n){return nn.makeTranslation(e,t,n),this.applyMatrix4(nn),this}scale(e,t,n){return nn.makeScale(e,t,n),this.applyMatrix4(nn),this}lookAt(e){return io.lookAt(e),io.updateMatrix(),this.applyMatrix4(io.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ri).negate(),this.translate(Ri.x,Ri.y,Ri.z),this}setFromPoints(e){const t=[];for(let n=0,i=e.length;n<i;n++){const s=e[n];t.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new gt(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Yt);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new C(-1/0,-1/0,-1/0),new C(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const s=t[n];Jt.setFromBufferAttribute(s),this.morphTargetsRelative?(Ct.addVectors(this.boundingBox.min,Jt.min),this.boundingBox.expandByPoint(Ct),Ct.addVectors(this.boundingBox.max,Jt.max),this.boundingBox.expandByPoint(Ct)):(this.boundingBox.expandByPoint(Jt.min),this.boundingBox.expandByPoint(Jt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new bn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new C,1/0);return}if(e){const n=this.boundingSphere.center;if(Jt.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){const a=t[s];cs.setFromBufferAttribute(a),this.morphTargetsRelative?(Ct.addVectors(Jt.min,cs.min),Jt.expandByPoint(Ct),Ct.addVectors(Jt.max,cs.max),Jt.expandByPoint(Ct)):(Jt.expandByPoint(cs.min),Jt.expandByPoint(cs.max))}Jt.getCenter(n);let i=0;for(let s=0,o=e.count;s<o;s++)Ct.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared(Ct));if(t)for(let s=0,o=t.length;s<o;s++){const a=t[s],l=this.morphTargetsRelative;for(let c=0,d=a.count;c<d;c++)Ct.fromBufferAttribute(a,c),l&&(Ri.fromBufferAttribute(e,c),Ct.add(Ri)),i=Math.max(i,n.distanceToSquared(Ct))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,i=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Lt(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let L=0;L<n.count;L++)a[L]=new C,l[L]=new C;const c=new C,d=new C,h=new C,u=new qe,p=new qe,g=new qe,_=new C,f=new C;function m(L,U,y){c.fromBufferAttribute(n,L),d.fromBufferAttribute(n,U),h.fromBufferAttribute(n,y),u.fromBufferAttribute(s,L),p.fromBufferAttribute(s,U),g.fromBufferAttribute(s,y),d.sub(c),h.sub(c),p.sub(u),g.sub(u);const S=1/(p.x*g.y-g.x*p.y);isFinite(S)&&(_.copy(d).multiplyScalar(g.y).addScaledVector(h,-p.y).multiplyScalar(S),f.copy(h).multiplyScalar(p.x).addScaledVector(d,-g.x).multiplyScalar(S),a[L].add(_),a[U].add(_),a[y].add(_),l[L].add(f),l[U].add(f),l[y].add(f))}let v=this.groups;v.length===0&&(v=[{start:0,count:e.count}]);for(let L=0,U=v.length;L<U;++L){const y=v[L],S=y.start,B=y.count;for(let F=S,z=S+B;F<z;F+=3)m(e.getX(F+0),e.getX(F+1),e.getX(F+2))}const x=new C,M=new C,A=new C,E=new C;function w(L){A.fromBufferAttribute(i,L),E.copy(A);const U=a[L];x.copy(U),x.sub(A.multiplyScalar(A.dot(U))).normalize(),M.crossVectors(E,U);const S=M.dot(l[L])<0?-1:1;o.setXYZW(L,x.x,x.y,x.z,S)}for(let L=0,U=v.length;L<U;++L){const y=v[L],S=y.start,B=y.count;for(let F=S,z=S+B;F<z;F+=3)w(e.getX(F+0)),w(e.getX(F+1)),w(e.getX(F+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Lt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let u=0,p=n.count;u<p;u++)n.setXYZ(u,0,0,0);const i=new C,s=new C,o=new C,a=new C,l=new C,c=new C,d=new C,h=new C;if(e)for(let u=0,p=e.count;u<p;u+=3){const g=e.getX(u+0),_=e.getX(u+1),f=e.getX(u+2);i.fromBufferAttribute(t,g),s.fromBufferAttribute(t,_),o.fromBufferAttribute(t,f),d.subVectors(o,s),h.subVectors(i,s),d.cross(h),a.fromBufferAttribute(n,g),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,f),a.add(d),l.add(d),c.add(d),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(f,c.x,c.y,c.z)}else for(let u=0,p=t.count;u<p;u+=3)i.fromBufferAttribute(t,u+0),s.fromBufferAttribute(t,u+1),o.fromBufferAttribute(t,u+2),d.subVectors(o,s),h.subVectors(i,s),d.cross(h),n.setXYZ(u+0,d.x,d.y,d.z),n.setXYZ(u+1,d.x,d.y,d.z),n.setXYZ(u+2,d.x,d.y,d.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Ct.fromBufferAttribute(e,t),Ct.normalize(),e.setXYZ(t,Ct.x,Ct.y,Ct.z)}toNonIndexed(){function e(a,l){const c=a.array,d=a.itemSize,h=a.normalized,u=new c.constructor(l.length*d);let p=0,g=0;for(let _=0,f=l.length;_<f;_++){a.isInterleavedBufferAttribute?p=l[_]*a.data.stride+a.offset:p=l[_]*d;for(let m=0;m<d;m++)u[g++]=c[p++]}return new Lt(u,d,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Tt,n=this.index.array,i=this.attributes;for(const a in i){const l=i[a],c=e(l,n);t.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let d=0,h=c.length;d<h;d++){const u=c[d],p=e(u,n);l.push(p)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const i={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],d=[];for(let h=0,u=c.length;h<u;h++){const p=c[h];d.push(p.toJSON(e.data))}d.length>0&&(i[l]=d,s=!0)}s&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const i=e.attributes;for(const c in i){const d=i[c];this.setAttribute(c,d.clone(t))}const s=e.morphAttributes;for(const c in s){const d=[],h=s[c];for(let u=0,p=h.length;u<p;u++)d.push(h[u].clone(t));this.morphAttributes[c]=d}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,d=o.length;c<d;c++){const h=o[c];this.addGroup(h.start,h.count,h.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const wl=new ze,si=new Qi,Vs=new bn,El=new C,Ws=new C,Xs=new C,qs=new C,so=new C,Ks=new C,Al=new C,Ys=new C;class P extends yt{constructor(e=new Tt,t=new lt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const a=this.morphTargetInfluences;if(s&&a){Ks.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const d=a[l],h=s[l];d!==0&&(so.fromBufferAttribute(h,e),o?Ks.addScaledVector(so,d):Ks.addScaledVector(so.sub(t),d))}t.add(Ks)}return t}raycast(e,t){const n=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Vs.copy(n.boundingSphere),Vs.applyMatrix4(s),si.copy(e.ray).recast(e.near),!(Vs.containsPoint(si.origin)===!1&&(si.intersectSphere(Vs,El)===null||si.origin.distanceToSquared(El)>(e.far-e.near)**2))&&(wl.copy(s).invert(),si.copy(e.ray).applyMatrix4(wl),!(n.boundingBox!==null&&si.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,si)))}_computeIntersections(e,t,n){let i;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,d=s.attributes.uv1,h=s.attributes.normal,u=s.groups,p=s.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=u.length;g<_;g++){const f=u[g],m=o[f.materialIndex],v=Math.max(f.start,p.start),x=Math.min(a.count,Math.min(f.start+f.count,p.start+p.count));for(let M=v,A=x;M<A;M+=3){const E=a.getX(M),w=a.getX(M+1),L=a.getX(M+2);i=js(this,m,e,n,c,d,h,E,w,L),i&&(i.faceIndex=Math.floor(M/3),i.face.materialIndex=f.materialIndex,t.push(i))}}else{const g=Math.max(0,p.start),_=Math.min(a.count,p.start+p.count);for(let f=g,m=_;f<m;f+=3){const v=a.getX(f),x=a.getX(f+1),M=a.getX(f+2);i=js(this,o,e,n,c,d,h,v,x,M),i&&(i.faceIndex=Math.floor(f/3),t.push(i))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,_=u.length;g<_;g++){const f=u[g],m=o[f.materialIndex],v=Math.max(f.start,p.start),x=Math.min(l.count,Math.min(f.start+f.count,p.start+p.count));for(let M=v,A=x;M<A;M+=3){const E=M,w=M+1,L=M+2;i=js(this,m,e,n,c,d,h,E,w,L),i&&(i.faceIndex=Math.floor(M/3),i.face.materialIndex=f.materialIndex,t.push(i))}}else{const g=Math.max(0,p.start),_=Math.min(l.count,p.start+p.count);for(let f=g,m=_;f<m;f+=3){const v=f,x=f+1,M=f+2;i=js(this,o,e,n,c,d,h,v,x,M),i&&(i.faceIndex=Math.floor(f/3),t.push(i))}}}}function Yd(r,e,t,n,i,s,o,a){let l;if(e.side===qt?l=n.intersectTriangle(o,s,i,!0,a):l=n.intersectTriangle(i,s,o,e.side===Fn,a),l===null)return null;Ys.copy(a),Ys.applyMatrix4(r.matrixWorld);const c=t.ray.origin.distanceTo(Ys);return c<t.near||c>t.far?null:{distance:c,point:Ys.clone(),object:r}}function js(r,e,t,n,i,s,o,a,l,c){r.getVertexPosition(a,Ws),r.getVertexPosition(l,Xs),r.getVertexPosition(c,qs);const d=Yd(r,e,t,n,Ws,Xs,qs,Al);if(d){const h=new C;on.getBarycoord(Al,Ws,Xs,qs,h),i&&(d.uv=on.getInterpolatedAttribute(i,a,l,c,h,new qe)),s&&(d.uv1=on.getInterpolatedAttribute(s,a,l,c,h,new qe)),o&&(d.normal=on.getInterpolatedAttribute(o,a,l,c,h,new C),d.normal.dot(n.direction)>0&&d.normal.multiplyScalar(-1));const u={a,b:l,c,normal:new C,materialIndex:0};on.getNormal(Ws,Xs,qs,u.normal),d.face=u,d.barycoord=h}return d}class q extends Tt{constructor(e=1,t=1,n=1,i=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:s,depthSegments:o};const a=this;i=Math.floor(i),s=Math.floor(s),o=Math.floor(o);const l=[],c=[],d=[],h=[];let u=0,p=0;g("z","y","x",-1,-1,n,t,e,o,s,0),g("z","y","x",1,-1,n,t,-e,o,s,1),g("x","z","y",1,1,e,n,t,i,o,2),g("x","z","y",1,-1,e,n,-t,i,o,3),g("x","y","z",1,-1,e,t,n,i,s,4),g("x","y","z",-1,-1,e,t,-n,i,s,5),this.setIndex(l),this.setAttribute("position",new gt(c,3)),this.setAttribute("normal",new gt(d,3)),this.setAttribute("uv",new gt(h,2));function g(_,f,m,v,x,M,A,E,w,L,U){const y=M/w,S=A/L,B=M/2,F=A/2,z=E/2,Y=w+1,G=L+1;let J=0,X=0;const le=new C;for(let re=0;re<G;re++){const ue=re*S-F;for(let Ye=0;Ye<Y;Ye++){const tt=Ye*y-B;le[_]=tt*v,le[f]=ue*x,le[m]=z,c.push(le.x,le.y,le.z),le[_]=0,le[f]=0,le[m]=E>0?1:-1,d.push(le.x,le.y,le.z),h.push(Ye/w),h.push(1-re/L),J+=1}}for(let re=0;re<L;re++)for(let ue=0;ue<w;ue++){const Ye=u+ue+Y*re,tt=u+ue+Y*(re+1),j=u+(ue+1)+Y*(re+1),ee=u+(ue+1)+Y*re;l.push(Ye,tt,ee),l.push(tt,j,ee),X+=6}a.addGroup(p,X,U),p+=X,u+=J}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new q(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Yi(r){const e={};for(const t in r){e[t]={};for(const n in r[t]){const i=r[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function Vt(r){const e={};for(let t=0;t<r.length;t++){const n=Yi(r[t]);for(const i in n)e[i]=n[i]}return e}function jd(r){const e=[];for(let t=0;t<r.length;t++)e.push(r[t].clone());return e}function ih(r){const e=r.getRenderTarget();return e===null?r.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:st.workingColorSpace}const Zd={clone:Yi,merge:Vt};var $d=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Jd=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Qn extends vn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=$d,this.fragmentShader=Jd,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Yi(e.uniforms),this.uniformsGroups=jd(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const o=this.uniforms[i].value;o&&o.isTexture?t.uniforms[i]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[i]={type:"m4",value:o.toArray()}:t.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class sh extends yt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ze,this.projectionMatrix=new ze,this.projectionMatrixInverse=new ze,this.coordinateSystem=On}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const qn=new C,Rl=new qe,Cl=new qe;class zt extends sh{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Ki*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Fi*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ki*2*Math.atan(Math.tan(Fi*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){qn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(qn.x,qn.y).multiplyScalar(-e/qn.z),qn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(qn.x,qn.y).multiplyScalar(-e/qn.z)}getViewSize(e,t){return this.getViewBounds(e,Rl,Cl),t.subVectors(Cl,Rl)}setViewOffset(e,t,n,i,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Fi*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,s=-.5*i;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*i/l,t-=o.offsetY*n/c,i*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Ci=-90,Pi=1;class Qd extends yt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new zt(Ci,Pi,e,t);i.layers=this.layers,this.add(i);const s=new zt(Ci,Pi,e,t);s.layers=this.layers,this.add(s);const o=new zt(Ci,Pi,e,t);o.layers=this.layers,this.add(o);const a=new zt(Ci,Pi,e,t);a.layers=this.layers,this.add(a);const l=new zt(Ci,Pi,e,t);l.layers=this.layers,this.add(l);const c=new zt(Ci,Pi,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,i,s,o,a,l]=t;for(const c of t)this.remove(c);if(e===On)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Tr)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,c,d]=this.children,h=e.getRenderTarget(),u=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,s),e.setRenderTarget(n,1,i),e.render(t,o),e.setRenderTarget(n,2,i),e.render(t,a),e.setRenderTarget(n,3,i),e.render(t,l),e.setRenderTarget(n,4,i),e.render(t,c),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,i),e.render(t,d),e.setRenderTarget(h,u,p),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class rh extends Et{constructor(e,t,n,i,s,o,a,l,c,d){e=e!==void 0?e:[],t=t!==void 0?t:Vi,super(e,t,n,i,s,o,a,l,c,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class eu extends mi{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new rh(i,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:en}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new q(5,5,5),s=new Qn({name:"CubemapFromEquirect",uniforms:Yi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:qt,blending:$n});s.uniforms.tEquirect.value=t;const o=new P(i,s),a=t.minFilter;return t.minFilter===Bn&&(t.minFilter=en),new Qd(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,n,i){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,i);e.setRenderTarget(s)}}const ro=new C,tu=new C,nu=new Xe;class ci{constructor(e=new C(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=ro.subVectors(n,t).cross(tu.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(ro),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||nu.getNormalMatrix(e),i=this.coplanarPoint(ro).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ri=new bn,Zs=new C;class Oa{constructor(e=new ci,t=new ci,n=new ci,i=new ci,s=new ci,o=new ci){this.planes=[e,t,n,i,s,o]}set(e,t,n,i,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(i),a[4].copy(s),a[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=On){const n=this.planes,i=e.elements,s=i[0],o=i[1],a=i[2],l=i[3],c=i[4],d=i[5],h=i[6],u=i[7],p=i[8],g=i[9],_=i[10],f=i[11],m=i[12],v=i[13],x=i[14],M=i[15];if(n[0].setComponents(l-s,u-c,f-p,M-m).normalize(),n[1].setComponents(l+s,u+c,f+p,M+m).normalize(),n[2].setComponents(l+o,u+d,f+g,M+v).normalize(),n[3].setComponents(l-o,u-d,f-g,M-v).normalize(),n[4].setComponents(l-a,u-h,f-_,M-x).normalize(),t===On)n[5].setComponents(l+a,u+h,f+_,M+x).normalize();else if(t===Tr)n[5].setComponents(a,h,_,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ri.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ri.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ri)}intersectsSprite(e){return ri.center.set(0,0,0),ri.radius=.7071067811865476,ri.applyMatrix4(e.matrixWorld),this.intersectsSphere(ri)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(Zs.x=i.normal.x>0?e.max.x:e.min.x,Zs.y=i.normal.y>0?e.max.y:e.min.y,Zs.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(Zs)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function oh(){let r=null,e=!1,t=null,n=null;function i(s,o){t(s,o),n=r.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=r.requestAnimationFrame(i),e=!0)},stop:function(){r.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){r=s}}}function iu(r){const e=new WeakMap;function t(a,l){const c=a.array,d=a.usage,h=c.byteLength,u=r.createBuffer();r.bindBuffer(l,u),r.bufferData(l,c,d),a.onUploadCallback();let p;if(c instanceof Float32Array)p=r.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?p=r.HALF_FLOAT:p=r.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=r.SHORT;else if(c instanceof Uint32Array)p=r.UNSIGNED_INT;else if(c instanceof Int32Array)p=r.INT;else if(c instanceof Int8Array)p=r.BYTE;else if(c instanceof Uint8Array)p=r.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:h}}function n(a,l,c){const d=l.array,h=l.updateRanges;if(r.bindBuffer(c,a),h.length===0)r.bufferSubData(c,0,d);else{h.sort((p,g)=>p.start-g.start);let u=0;for(let p=1;p<h.length;p++){const g=h[u],_=h[p];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++u,h[u]=_)}h.length=u+1;for(let p=0,g=h.length;p<g;p++){const _=h[p];r.bufferSubData(c,_.start*d.BYTES_PER_ELEMENT,d,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=e.get(a);l&&(r.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const d=e.get(a);(!d||d.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:i,remove:s,update:o}}class ln extends Tt{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const s=e/2,o=t/2,a=Math.floor(n),l=Math.floor(i),c=a+1,d=l+1,h=e/a,u=t/l,p=[],g=[],_=[],f=[];for(let m=0;m<d;m++){const v=m*u-o;for(let x=0;x<c;x++){const M=x*h-s;g.push(M,-v,0),_.push(0,0,1),f.push(x/a),f.push(1-m/l)}}for(let m=0;m<l;m++)for(let v=0;v<a;v++){const x=v+c*m,M=v+c*(m+1),A=v+1+c*(m+1),E=v+1+c*m;p.push(x,M,E),p.push(M,A,E)}this.setIndex(p),this.setAttribute("position",new gt(g,3)),this.setAttribute("normal",new gt(_,3)),this.setAttribute("uv",new gt(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ln(e.width,e.height,e.widthSegments,e.heightSegments)}}var su=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,ru=`#ifdef USE_ALPHAHASH
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
#endif`,ou=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,au=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,lu=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,cu=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,hu=`#ifdef USE_AOMAP
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
#endif`,du=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,uu=`#ifdef USE_BATCHING
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
#endif`,fu=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,pu=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,mu=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,gu=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,_u=`#ifdef USE_IRIDESCENCE
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
#endif`,xu=`#ifdef USE_BUMPMAP
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
#endif`,yu=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,vu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Mu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Su=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,bu=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Tu=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,wu=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Eu=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Au=`#define PI 3.141592653589793
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
} // validated`,Ru=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Cu=`vec3 transformedNormal = objectNormal;
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
#endif`,Pu=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Lu=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Iu=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Du=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Nu="gl_FragColor = linearToOutputTexel( gl_FragColor );",Uu=`
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
}`,Bu=`#ifdef USE_ENVMAP
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
#endif`,Ou=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Fu=`#ifdef USE_ENVMAP
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
#endif`,ku=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,zu=`#ifdef USE_ENVMAP
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
#endif`,Gu=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Hu=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Vu=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Wu=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Xu=`#ifdef USE_GRADIENTMAP
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
}`,qu=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Ku=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Yu=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,ju=`uniform bool receiveShadow;
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
#endif`,Zu=`#ifdef USE_ENVMAP
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
#endif`,$u=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Ju=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Qu=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,ef=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,tf=`PhysicalMaterial material;
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
#endif`,nf=`struct PhysicalMaterial {
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
}`,sf=`
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
#endif`,rf=`#if defined( RE_IndirectDiffuse )
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
#endif`,of=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,af=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,lf=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,cf=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,hf=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,df=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,uf=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,ff=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,pf=`#if defined( USE_POINTS_UV )
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
#endif`,mf=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,gf=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,_f=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,xf=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,yf=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,vf=`#ifdef USE_MORPHTARGETS
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
#endif`,Mf=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Sf=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,bf=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Tf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,wf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ef=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Af=`#ifdef USE_NORMALMAP
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
#endif`,Rf=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Cf=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Pf=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Lf=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,If=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Df=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Nf=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Uf=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Bf=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Of=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Ff=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,kf=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,zf=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Gf=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Hf=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Vf=`float getShadowMask() {
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
}`,Wf=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Xf=`#ifdef USE_SKINNING
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
#endif`,qf=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Kf=`#ifdef USE_SKINNING
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
#endif`,Yf=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,jf=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Zf=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,$f=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Jf=`#ifdef USE_TRANSMISSION
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
#endif`,Qf=`#ifdef USE_TRANSMISSION
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
#endif`,ep=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,tp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,np=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,ip=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const sp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,rp=`uniform sampler2D t2D;
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
}`,op=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ap=`#ifdef ENVMAP_TYPE_CUBE
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
}`,lp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cp=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,hp=`#include <common>
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
}`,dp=`#if DEPTH_PACKING == 3200
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
}`,up=`#define DISTANCE
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
}`,fp=`#define DISTANCE
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
}`,pp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,mp=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,gp=`uniform float scale;
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
}`,_p=`uniform vec3 diffuse;
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
}`,xp=`#include <common>
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
}`,yp=`uniform vec3 diffuse;
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
}`,vp=`#define LAMBERT
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
}`,Mp=`#define LAMBERT
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
}`,Sp=`#define MATCAP
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
}`,bp=`#define MATCAP
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
}`,Tp=`#define NORMAL
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
}`,wp=`#define NORMAL
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
}`,Ep=`#define PHONG
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
}`,Ap=`#define PHONG
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
}`,Rp=`#define STANDARD
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
}`,Cp=`#define STANDARD
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
}`,Pp=`#define TOON
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
}`,Lp=`#define TOON
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
}`,Ip=`uniform float size;
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
}`,Dp=`uniform vec3 diffuse;
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
}`,Np=`#include <common>
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
}`,Up=`uniform vec3 color;
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
}`,Bp=`uniform float rotation;
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
}`,Op=`uniform vec3 diffuse;
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
}`,We={alphahash_fragment:su,alphahash_pars_fragment:ru,alphamap_fragment:ou,alphamap_pars_fragment:au,alphatest_fragment:lu,alphatest_pars_fragment:cu,aomap_fragment:hu,aomap_pars_fragment:du,batching_pars_vertex:uu,batching_vertex:fu,begin_vertex:pu,beginnormal_vertex:mu,bsdfs:gu,iridescence_fragment:_u,bumpmap_pars_fragment:xu,clipping_planes_fragment:yu,clipping_planes_pars_fragment:vu,clipping_planes_pars_vertex:Mu,clipping_planes_vertex:Su,color_fragment:bu,color_pars_fragment:Tu,color_pars_vertex:wu,color_vertex:Eu,common:Au,cube_uv_reflection_fragment:Ru,defaultnormal_vertex:Cu,displacementmap_pars_vertex:Pu,displacementmap_vertex:Lu,emissivemap_fragment:Iu,emissivemap_pars_fragment:Du,colorspace_fragment:Nu,colorspace_pars_fragment:Uu,envmap_fragment:Bu,envmap_common_pars_fragment:Ou,envmap_pars_fragment:Fu,envmap_pars_vertex:ku,envmap_physical_pars_fragment:Zu,envmap_vertex:zu,fog_vertex:Gu,fog_pars_vertex:Hu,fog_fragment:Vu,fog_pars_fragment:Wu,gradientmap_pars_fragment:Xu,lightmap_pars_fragment:qu,lights_lambert_fragment:Ku,lights_lambert_pars_fragment:Yu,lights_pars_begin:ju,lights_toon_fragment:$u,lights_toon_pars_fragment:Ju,lights_phong_fragment:Qu,lights_phong_pars_fragment:ef,lights_physical_fragment:tf,lights_physical_pars_fragment:nf,lights_fragment_begin:sf,lights_fragment_maps:rf,lights_fragment_end:of,logdepthbuf_fragment:af,logdepthbuf_pars_fragment:lf,logdepthbuf_pars_vertex:cf,logdepthbuf_vertex:hf,map_fragment:df,map_pars_fragment:uf,map_particle_fragment:ff,map_particle_pars_fragment:pf,metalnessmap_fragment:mf,metalnessmap_pars_fragment:gf,morphinstance_vertex:_f,morphcolor_vertex:xf,morphnormal_vertex:yf,morphtarget_pars_vertex:vf,morphtarget_vertex:Mf,normal_fragment_begin:Sf,normal_fragment_maps:bf,normal_pars_fragment:Tf,normal_pars_vertex:wf,normal_vertex:Ef,normalmap_pars_fragment:Af,clearcoat_normal_fragment_begin:Rf,clearcoat_normal_fragment_maps:Cf,clearcoat_pars_fragment:Pf,iridescence_pars_fragment:Lf,opaque_fragment:If,packing:Df,premultiplied_alpha_fragment:Nf,project_vertex:Uf,dithering_fragment:Bf,dithering_pars_fragment:Of,roughnessmap_fragment:Ff,roughnessmap_pars_fragment:kf,shadowmap_pars_fragment:zf,shadowmap_pars_vertex:Gf,shadowmap_vertex:Hf,shadowmask_pars_fragment:Vf,skinbase_vertex:Wf,skinning_pars_vertex:Xf,skinning_vertex:qf,skinnormal_vertex:Kf,specularmap_fragment:Yf,specularmap_pars_fragment:jf,tonemapping_fragment:Zf,tonemapping_pars_fragment:$f,transmission_fragment:Jf,transmission_pars_fragment:Qf,uv_pars_fragment:ep,uv_pars_vertex:tp,uv_vertex:np,worldpos_vertex:ip,background_vert:sp,background_frag:rp,backgroundCube_vert:op,backgroundCube_frag:ap,cube_vert:lp,cube_frag:cp,depth_vert:hp,depth_frag:dp,distanceRGBA_vert:up,distanceRGBA_frag:fp,equirect_vert:pp,equirect_frag:mp,linedashed_vert:gp,linedashed_frag:_p,meshbasic_vert:xp,meshbasic_frag:yp,meshlambert_vert:vp,meshlambert_frag:Mp,meshmatcap_vert:Sp,meshmatcap_frag:bp,meshnormal_vert:Tp,meshnormal_frag:wp,meshphong_vert:Ep,meshphong_frag:Ap,meshphysical_vert:Rp,meshphysical_frag:Cp,meshtoon_vert:Pp,meshtoon_frag:Lp,points_vert:Ip,points_frag:Dp,shadow_vert:Np,shadow_frag:Up,sprite_vert:Bp,sprite_frag:Op},ce={common:{diffuse:{value:new De(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Xe},alphaMap:{value:null},alphaMapTransform:{value:new Xe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Xe}},envmap:{envMap:{value:null},envMapRotation:{value:new Xe},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Xe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Xe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Xe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Xe},normalScale:{value:new qe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Xe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Xe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Xe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Xe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new De(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new De(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Xe},alphaTest:{value:0},uvTransform:{value:new Xe}},sprite:{diffuse:{value:new De(16777215)},opacity:{value:1},center:{value:new qe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Xe},alphaMap:{value:null},alphaMapTransform:{value:new Xe},alphaTest:{value:0}}},yn={basic:{uniforms:Vt([ce.common,ce.specularmap,ce.envmap,ce.aomap,ce.lightmap,ce.fog]),vertexShader:We.meshbasic_vert,fragmentShader:We.meshbasic_frag},lambert:{uniforms:Vt([ce.common,ce.specularmap,ce.envmap,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.fog,ce.lights,{emissive:{value:new De(0)}}]),vertexShader:We.meshlambert_vert,fragmentShader:We.meshlambert_frag},phong:{uniforms:Vt([ce.common,ce.specularmap,ce.envmap,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.fog,ce.lights,{emissive:{value:new De(0)},specular:{value:new De(1118481)},shininess:{value:30}}]),vertexShader:We.meshphong_vert,fragmentShader:We.meshphong_frag},standard:{uniforms:Vt([ce.common,ce.envmap,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.roughnessmap,ce.metalnessmap,ce.fog,ce.lights,{emissive:{value:new De(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:We.meshphysical_vert,fragmentShader:We.meshphysical_frag},toon:{uniforms:Vt([ce.common,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.gradientmap,ce.fog,ce.lights,{emissive:{value:new De(0)}}]),vertexShader:We.meshtoon_vert,fragmentShader:We.meshtoon_frag},matcap:{uniforms:Vt([ce.common,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.fog,{matcap:{value:null}}]),vertexShader:We.meshmatcap_vert,fragmentShader:We.meshmatcap_frag},points:{uniforms:Vt([ce.points,ce.fog]),vertexShader:We.points_vert,fragmentShader:We.points_frag},dashed:{uniforms:Vt([ce.common,ce.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:We.linedashed_vert,fragmentShader:We.linedashed_frag},depth:{uniforms:Vt([ce.common,ce.displacementmap]),vertexShader:We.depth_vert,fragmentShader:We.depth_frag},normal:{uniforms:Vt([ce.common,ce.bumpmap,ce.normalmap,ce.displacementmap,{opacity:{value:1}}]),vertexShader:We.meshnormal_vert,fragmentShader:We.meshnormal_frag},sprite:{uniforms:Vt([ce.sprite,ce.fog]),vertexShader:We.sprite_vert,fragmentShader:We.sprite_frag},background:{uniforms:{uvTransform:{value:new Xe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:We.background_vert,fragmentShader:We.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Xe}},vertexShader:We.backgroundCube_vert,fragmentShader:We.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:We.cube_vert,fragmentShader:We.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:We.equirect_vert,fragmentShader:We.equirect_frag},distanceRGBA:{uniforms:Vt([ce.common,ce.displacementmap,{referencePosition:{value:new C},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:We.distanceRGBA_vert,fragmentShader:We.distanceRGBA_frag},shadow:{uniforms:Vt([ce.lights,ce.fog,{color:{value:new De(0)},opacity:{value:1}}]),vertexShader:We.shadow_vert,fragmentShader:We.shadow_frag}};yn.physical={uniforms:Vt([yn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Xe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Xe},clearcoatNormalScale:{value:new qe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Xe},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Xe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Xe},sheen:{value:0},sheenColor:{value:new De(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Xe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Xe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Xe},transmissionSamplerSize:{value:new qe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Xe},attenuationDistance:{value:0},attenuationColor:{value:new De(0)},specularColor:{value:new De(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Xe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Xe},anisotropyVector:{value:new qe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Xe}}]),vertexShader:We.meshphysical_vert,fragmentShader:We.meshphysical_frag};const $s={r:0,b:0,g:0},oi=new wt,Fp=new ze;function kp(r,e,t,n,i,s,o){const a=new De(0);let l=s===!0?0:1,c,d,h=null,u=0,p=null;function g(v){let x=v.isScene===!0?v.background:null;return x&&x.isTexture&&(x=(v.backgroundBlurriness>0?t:e).get(x)),x}function _(v){let x=!1;const M=g(v);M===null?m(a,l):M&&M.isColor&&(m(M,1),x=!0);const A=r.xr.getEnvironmentBlendMode();A==="additive"?n.buffers.color.setClear(0,0,0,1,o):A==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(r.autoClear||x)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function f(v,x){const M=g(x);M&&(M.isCubeTexture||M.mapping===Lr)?(d===void 0&&(d=new P(new q(1,1,1),new Qn({name:"BackgroundCubeMaterial",uniforms:Yi(yn.backgroundCube.uniforms),vertexShader:yn.backgroundCube.vertexShader,fragmentShader:yn.backgroundCube.fragmentShader,side:qt,depthTest:!1,depthWrite:!1,fog:!1})),d.geometry.deleteAttribute("normal"),d.geometry.deleteAttribute("uv"),d.onBeforeRender=function(A,E,w){this.matrixWorld.copyPosition(w.matrixWorld)},Object.defineProperty(d.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(d)),oi.copy(x.backgroundRotation),oi.x*=-1,oi.y*=-1,oi.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(oi.y*=-1,oi.z*=-1),d.material.uniforms.envMap.value=M,d.material.uniforms.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,d.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,d.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,d.material.uniforms.backgroundRotation.value.setFromMatrix4(Fp.makeRotationFromEuler(oi)),d.material.toneMapped=st.getTransfer(M.colorSpace)!==xt,(h!==M||u!==M.version||p!==r.toneMapping)&&(d.material.needsUpdate=!0,h=M,u=M.version,p=r.toneMapping),d.layers.enableAll(),v.unshift(d,d.geometry,d.material,0,0,null)):M&&M.isTexture&&(c===void 0&&(c=new P(new ln(2,2),new Qn({name:"BackgroundMaterial",uniforms:Yi(yn.background.uniforms),vertexShader:yn.background.vertexShader,fragmentShader:yn.background.fragmentShader,side:Fn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=M,c.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,c.material.toneMapped=st.getTransfer(M.colorSpace)!==xt,M.matrixAutoUpdate===!0&&M.updateMatrix(),c.material.uniforms.uvTransform.value.copy(M.matrix),(h!==M||u!==M.version||p!==r.toneMapping)&&(c.material.needsUpdate=!0,h=M,u=M.version,p=r.toneMapping),c.layers.enableAll(),v.unshift(c,c.geometry,c.material,0,0,null))}function m(v,x){v.getRGB($s,ih(r)),n.buffers.color.setClear($s.r,$s.g,$s.b,x,o)}return{getClearColor:function(){return a},setClearColor:function(v,x=1){a.set(v),l=x,m(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(v){l=v,m(a,l)},render:_,addToRenderList:f}}function zp(r,e){const t=r.getParameter(r.MAX_VERTEX_ATTRIBS),n={},i=u(null);let s=i,o=!1;function a(y,S,B,F,z){let Y=!1;const G=h(F,B,S);s!==G&&(s=G,c(s.object)),Y=p(y,F,B,z),Y&&g(y,F,B,z),z!==null&&e.update(z,r.ELEMENT_ARRAY_BUFFER),(Y||o)&&(o=!1,M(y,S,B,F),z!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,e.get(z).buffer))}function l(){return r.createVertexArray()}function c(y){return r.bindVertexArray(y)}function d(y){return r.deleteVertexArray(y)}function h(y,S,B){const F=B.wireframe===!0;let z=n[y.id];z===void 0&&(z={},n[y.id]=z);let Y=z[S.id];Y===void 0&&(Y={},z[S.id]=Y);let G=Y[F];return G===void 0&&(G=u(l()),Y[F]=G),G}function u(y){const S=[],B=[],F=[];for(let z=0;z<t;z++)S[z]=0,B[z]=0,F[z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:S,enabledAttributes:B,attributeDivisors:F,object:y,attributes:{},index:null}}function p(y,S,B,F){const z=s.attributes,Y=S.attributes;let G=0;const J=B.getAttributes();for(const X in J)if(J[X].location>=0){const re=z[X];let ue=Y[X];if(ue===void 0&&(X==="instanceMatrix"&&y.instanceMatrix&&(ue=y.instanceMatrix),X==="instanceColor"&&y.instanceColor&&(ue=y.instanceColor)),re===void 0||re.attribute!==ue||ue&&re.data!==ue.data)return!0;G++}return s.attributesNum!==G||s.index!==F}function g(y,S,B,F){const z={},Y=S.attributes;let G=0;const J=B.getAttributes();for(const X in J)if(J[X].location>=0){let re=Y[X];re===void 0&&(X==="instanceMatrix"&&y.instanceMatrix&&(re=y.instanceMatrix),X==="instanceColor"&&y.instanceColor&&(re=y.instanceColor));const ue={};ue.attribute=re,re&&re.data&&(ue.data=re.data),z[X]=ue,G++}s.attributes=z,s.attributesNum=G,s.index=F}function _(){const y=s.newAttributes;for(let S=0,B=y.length;S<B;S++)y[S]=0}function f(y){m(y,0)}function m(y,S){const B=s.newAttributes,F=s.enabledAttributes,z=s.attributeDivisors;B[y]=1,F[y]===0&&(r.enableVertexAttribArray(y),F[y]=1),z[y]!==S&&(r.vertexAttribDivisor(y,S),z[y]=S)}function v(){const y=s.newAttributes,S=s.enabledAttributes;for(let B=0,F=S.length;B<F;B++)S[B]!==y[B]&&(r.disableVertexAttribArray(B),S[B]=0)}function x(y,S,B,F,z,Y,G){G===!0?r.vertexAttribIPointer(y,S,B,z,Y):r.vertexAttribPointer(y,S,B,F,z,Y)}function M(y,S,B,F){_();const z=F.attributes,Y=B.getAttributes(),G=S.defaultAttributeValues;for(const J in Y){const X=Y[J];if(X.location>=0){let le=z[J];if(le===void 0&&(J==="instanceMatrix"&&y.instanceMatrix&&(le=y.instanceMatrix),J==="instanceColor"&&y.instanceColor&&(le=y.instanceColor)),le!==void 0){const re=le.normalized,ue=le.itemSize,Ye=e.get(le);if(Ye===void 0)continue;const tt=Ye.buffer,j=Ye.type,ee=Ye.bytesPerElement,Se=j===r.INT||j===r.UNSIGNED_INT||le.gpuType===Aa;if(le.isInterleavedBufferAttribute){const xe=le.data,Oe=xe.stride,ye=le.offset;if(xe.isInstancedInterleavedBuffer){for(let $e=0;$e<X.locationSize;$e++)m(X.location+$e,xe.meshPerAttribute);y.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=xe.meshPerAttribute*xe.count)}else for(let $e=0;$e<X.locationSize;$e++)f(X.location+$e);r.bindBuffer(r.ARRAY_BUFFER,tt);for(let $e=0;$e<X.locationSize;$e++)x(X.location+$e,ue/X.locationSize,j,re,Oe*ee,(ye+ue/X.locationSize*$e)*ee,Se)}else{if(le.isInstancedBufferAttribute){for(let xe=0;xe<X.locationSize;xe++)m(X.location+xe,le.meshPerAttribute);y.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=le.meshPerAttribute*le.count)}else for(let xe=0;xe<X.locationSize;xe++)f(X.location+xe);r.bindBuffer(r.ARRAY_BUFFER,tt);for(let xe=0;xe<X.locationSize;xe++)x(X.location+xe,ue/X.locationSize,j,re,ue*ee,ue/X.locationSize*xe*ee,Se)}}else if(G!==void 0){const re=G[J];if(re!==void 0)switch(re.length){case 2:r.vertexAttrib2fv(X.location,re);break;case 3:r.vertexAttrib3fv(X.location,re);break;case 4:r.vertexAttrib4fv(X.location,re);break;default:r.vertexAttrib1fv(X.location,re)}}}}v()}function A(){L();for(const y in n){const S=n[y];for(const B in S){const F=S[B];for(const z in F)d(F[z].object),delete F[z];delete S[B]}delete n[y]}}function E(y){if(n[y.id]===void 0)return;const S=n[y.id];for(const B in S){const F=S[B];for(const z in F)d(F[z].object),delete F[z];delete S[B]}delete n[y.id]}function w(y){for(const S in n){const B=n[S];if(B[y.id]===void 0)continue;const F=B[y.id];for(const z in F)d(F[z].object),delete F[z];delete B[y.id]}}function L(){U(),o=!0,s!==i&&(s=i,c(s.object))}function U(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:a,reset:L,resetDefaultState:U,dispose:A,releaseStatesOfGeometry:E,releaseStatesOfProgram:w,initAttributes:_,enableAttribute:f,disableUnusedAttributes:v}}function Gp(r,e,t){let n;function i(c){n=c}function s(c,d){r.drawArrays(n,c,d),t.update(d,n,1)}function o(c,d,h){h!==0&&(r.drawArraysInstanced(n,c,d,h),t.update(d,n,h))}function a(c,d,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,d,0,h);let p=0;for(let g=0;g<h;g++)p+=d[g];t.update(p,n,1)}function l(c,d,h,u){if(h===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<c.length;g++)o(c[g],d[g],u[g]);else{p.multiDrawArraysInstancedWEBGL(n,c,0,d,0,u,0,h);let g=0;for(let _=0;_<h;_++)g+=d[_];for(let _=0;_<u.length;_++)t.update(g,n,u[_])}}this.setMode=i,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function Hp(r,e,t,n){let i;function s(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const w=e.get("EXT_texture_filter_anisotropic");i=r.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(w){return!(w!==an&&n.convert(w)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(w){const L=w===Cs&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(w!==kn&&n.convert(w)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&w!==mn&&!L)}function l(w){if(w==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const d=l(c);d!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",d,"instead."),c=d);const h=t.logarithmicDepthBuffer===!0,u=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control");if(u===!0){const w=e.get("EXT_clip_control");w.clipControlEXT(w.LOWER_LEFT_EXT,w.ZERO_TO_ONE_EXT)}const p=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),g=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=r.getParameter(r.MAX_TEXTURE_SIZE),f=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),m=r.getParameter(r.MAX_VERTEX_ATTRIBS),v=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),x=r.getParameter(r.MAX_VARYING_VECTORS),M=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),A=g>0,E=r.getParameter(r.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:h,reverseDepthBuffer:u,maxTextures:p,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:f,maxAttributes:m,maxVertexUniforms:v,maxVaryings:x,maxFragmentUniforms:M,vertexTextures:A,maxSamples:E}}function Vp(r){const e=this;let t=null,n=0,i=!1,s=!1;const o=new ci,a=new Xe,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,u){const p=h.length!==0||u||n!==0||i;return i=u,n=h.length,p},this.beginShadows=function(){s=!0,d(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,u){t=d(h,u,0)},this.setState=function(h,u,p){const g=h.clippingPlanes,_=h.clipIntersection,f=h.clipShadows,m=r.get(h);if(!i||g===null||g.length===0||s&&!f)s?d(null):c();else{const v=s?0:n,x=v*4;let M=m.clippingState||null;l.value=M,M=d(g,u,x,p);for(let A=0;A!==x;++A)M[A]=t[A];m.clippingState=M,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=v}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function d(h,u,p,g){const _=h!==null?h.length:0;let f=null;if(_!==0){if(f=l.value,g!==!0||f===null){const m=p+_*4,v=u.matrixWorldInverse;a.getNormalMatrix(v),(f===null||f.length<m)&&(f=new Float32Array(m));for(let x=0,M=p;x!==_;++x,M+=4)o.copy(h[x]).applyMatrix4(v,a),o.normal.toArray(f,M),f[M+3]=o.constant}l.value=f,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,f}}function Wp(r){let e=new WeakMap;function t(o,a){return a===ko?o.mapping=Vi:a===zo&&(o.mapping=Wi),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===ko||a===zo)if(e.has(o)){const l=e.get(o).texture;return t(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new eu(l.height);return c.fromEquirectangularTexture(r,o),e.set(o,c),o.addEventListener("dispose",i),t(c.texture,o.mapping)}else return null}}return o}function i(o){const a=o.target;a.removeEventListener("dispose",i);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function s(){e=new WeakMap}return{get:n,dispose:s}}class Fa extends sh{constructor(e=-1,t=1,n=1,i=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let s=n-e,o=n+e,a=i+t,l=i-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=d*this.view.offsetY,l=a-d*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const Ui=4,Pl=[.125,.215,.35,.446,.526,.582],ui=20,oo=new Fa,Ll=new De;let ao=null,lo=0,co=0,ho=!1;const hi=(1+Math.sqrt(5))/2,Li=1/hi,Il=[new C(-hi,Li,0),new C(hi,Li,0),new C(-Li,0,hi),new C(Li,0,hi),new C(0,hi,-Li),new C(0,hi,Li),new C(-1,1,-1),new C(1,1,-1),new C(-1,1,1),new C(1,1,1)];class Dl{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100){ao=this._renderer.getRenderTarget(),lo=this._renderer.getActiveCubeFace(),co=this._renderer.getActiveMipmapLevel(),ho=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,i,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Bl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ul(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(ao,lo,co),this._renderer.xr.enabled=ho,e.scissorTest=!1,Js(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Vi||e.mapping===Wi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),ao=this._renderer.getRenderTarget(),lo=this._renderer.getActiveCubeFace(),co=this._renderer.getActiveMipmapLevel(),ho=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:en,minFilter:en,generateMipmaps:!1,type:Cs,format:an,colorSpace:Ut,depthBuffer:!1},i=Nl(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Nl(e,t,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Xp(s)),this._blurMaterial=qp(s,e,t)}return i}_compileMaterial(e){const t=new P(this._lodPlanes[0],e);this._renderer.compile(t,oo)}_sceneToCubeUV(e,t,n,i){const a=new zt(90,1,t,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],d=this._renderer,h=d.autoClear,u=d.toneMapping;d.getClearColor(Ll),d.toneMapping=Jn,d.autoClear=!1;const p=new lt({name:"PMREM.Background",side:qt,depthWrite:!1,depthTest:!1}),g=new P(new q,p);let _=!1;const f=e.background;f?f.isColor&&(p.color.copy(f),e.background=null,_=!0):(p.color.copy(Ll),_=!0);for(let m=0;m<6;m++){const v=m%3;v===0?(a.up.set(0,l[m],0),a.lookAt(c[m],0,0)):v===1?(a.up.set(0,0,l[m]),a.lookAt(0,c[m],0)):(a.up.set(0,l[m],0),a.lookAt(0,0,c[m]));const x=this._cubeSize;Js(i,v*x,m>2?x:0,x,x),d.setRenderTarget(i),_&&d.render(g,a),d.render(e,a)}g.geometry.dispose(),g.material.dispose(),d.toneMapping=u,d.autoClear=h,e.background=f}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===Vi||e.mapping===Wi;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Bl()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ul());const s=i?this._cubemapMaterial:this._equirectMaterial,o=new P(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;const l=this._cubeSize;Js(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(o,oo)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const i=this._lodPlanes.length;for(let s=1;s<i;s++){const o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=Il[(i-s-1)%Il.length];this._blur(e,s-1,s,o,a)}t.autoClear=n}_blur(e,t,n,i,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,i,"latitudinal",s),this._halfBlur(o,e,n,n,i,"longitudinal",s)}_halfBlur(e,t,n,i,s,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const d=3,h=new P(this._lodPlanes[i],c),u=c.uniforms,p=this._sizeLods[n]-1,g=isFinite(s)?Math.PI/(2*p):2*Math.PI/(2*ui-1),_=s/g,f=isFinite(s)?1+Math.floor(d*_):ui;f>ui&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${f} samples when the maximum is set to ${ui}`);const m=[];let v=0;for(let w=0;w<ui;++w){const L=w/_,U=Math.exp(-L*L/2);m.push(U),w===0?v+=U:w<f&&(v+=2*U)}for(let w=0;w<m.length;w++)m[w]=m[w]/v;u.envMap.value=e.texture,u.samples.value=f,u.weights.value=m,u.latitudinal.value=o==="latitudinal",a&&(u.poleAxis.value=a);const{_lodMax:x}=this;u.dTheta.value=g,u.mipInt.value=x-n;const M=this._sizeLods[i],A=3*M*(i>x-Ui?i-x+Ui:0),E=4*(this._cubeSize-M);Js(t,A,E,3*M,2*M),l.setRenderTarget(t),l.render(h,oo)}}function Xp(r){const e=[],t=[],n=[];let i=r;const s=r-Ui+1+Pl.length;for(let o=0;o<s;o++){const a=Math.pow(2,i);t.push(a);let l=1/a;o>r-Ui?l=Pl[o-r+Ui-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),d=-c,h=1+c,u=[d,d,h,d,h,h,d,d,h,h,d,h],p=6,g=6,_=3,f=2,m=1,v=new Float32Array(_*g*p),x=new Float32Array(f*g*p),M=new Float32Array(m*g*p);for(let E=0;E<p;E++){const w=E%3*2/3-1,L=E>2?0:-1,U=[w,L,0,w+2/3,L,0,w+2/3,L+1,0,w,L,0,w+2/3,L+1,0,w,L+1,0];v.set(U,_*g*E),x.set(u,f*g*E);const y=[E,E,E,E,E,E];M.set(y,m*g*E)}const A=new Tt;A.setAttribute("position",new Lt(v,_)),A.setAttribute("uv",new Lt(x,f)),A.setAttribute("faceIndex",new Lt(M,m)),e.push(A),i>Ui&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Nl(r,e,t){const n=new mi(r,e,t);return n.texture.mapping=Lr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Js(r,e,t,n,i){r.viewport.set(e,t,n,i),r.scissor.set(e,t,n,i)}function qp(r,e,t){const n=new Float32Array(ui),i=new C(0,1,0);return new Qn({name:"SphericalGaussianBlur",defines:{n:ui,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:ka(),fragmentShader:`

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
		`,blending:$n,depthTest:!1,depthWrite:!1})}function Ul(){return new Qn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ka(),fragmentShader:`

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
		`,blending:$n,depthTest:!1,depthWrite:!1})}function Bl(){return new Qn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ka(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:$n,depthTest:!1,depthWrite:!1})}function ka(){return`

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
	`}function Kp(r){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===ko||l===zo,d=l===Vi||l===Wi;if(c||d){let h=e.get(a);const u=h!==void 0?h.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==u)return t===null&&(t=new Dl(r)),h=c?t.fromEquirectangular(a,h):t.fromCubemap(a,h),h.texture.pmremVersion=a.pmremVersion,e.set(a,h),h.texture;if(h!==void 0)return h.texture;{const p=a.image;return c&&p&&p.height>0||d&&p&&i(p)?(t===null&&(t=new Dl(r)),h=c?t.fromEquirectangular(a):t.fromCubemap(a),h.texture.pmremVersion=a.pmremVersion,e.set(a,h),a.addEventListener("dispose",s),h.texture):null}}}return a}function i(a){let l=0;const c=6;for(let d=0;d<c;d++)a[d]!==void 0&&l++;return l===c}function s(a){const l=a.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function Yp(r){const e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=r.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const i=t(n);return i===null&&gr("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function jp(r,e,t,n){const i={},s=new WeakMap;function o(h){const u=h.target;u.index!==null&&e.remove(u.index);for(const g in u.attributes)e.remove(u.attributes[g]);for(const g in u.morphAttributes){const _=u.morphAttributes[g];for(let f=0,m=_.length;f<m;f++)e.remove(_[f])}u.removeEventListener("dispose",o),delete i[u.id];const p=s.get(u);p&&(e.remove(p),s.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function a(h,u){return i[u.id]===!0||(u.addEventListener("dispose",o),i[u.id]=!0,t.memory.geometries++),u}function l(h){const u=h.attributes;for(const g in u)e.update(u[g],r.ARRAY_BUFFER);const p=h.morphAttributes;for(const g in p){const _=p[g];for(let f=0,m=_.length;f<m;f++)e.update(_[f],r.ARRAY_BUFFER)}}function c(h){const u=[],p=h.index,g=h.attributes.position;let _=0;if(p!==null){const v=p.array;_=p.version;for(let x=0,M=v.length;x<M;x+=3){const A=v[x+0],E=v[x+1],w=v[x+2];u.push(A,E,E,w,w,A)}}else if(g!==void 0){const v=g.array;_=g.version;for(let x=0,M=v.length/3-1;x<M;x+=3){const A=x+0,E=x+1,w=x+2;u.push(A,E,E,w,w,A)}}else return;const f=new($c(u)?nh:th)(u,1);f.version=_;const m=s.get(h);m&&e.remove(m),s.set(h,f)}function d(h){const u=s.get(h);if(u){const p=h.index;p!==null&&u.version<p.version&&c(h)}else c(h);return s.get(h)}return{get:a,update:l,getWireframeAttribute:d}}function Zp(r,e,t){let n;function i(u){n=u}let s,o;function a(u){s=u.type,o=u.bytesPerElement}function l(u,p){r.drawElements(n,p,s,u*o),t.update(p,n,1)}function c(u,p,g){g!==0&&(r.drawElementsInstanced(n,p,s,u*o,g),t.update(p,n,g))}function d(u,p,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,p,0,s,u,0,g);let f=0;for(let m=0;m<g;m++)f+=p[m];t.update(f,n,1)}function h(u,p,g,_){if(g===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let m=0;m<u.length;m++)c(u[m]/o,p[m],_[m]);else{f.multiDrawElementsInstancedWEBGL(n,p,0,s,u,0,_,0,g);let m=0;for(let v=0;v<g;v++)m+=p[v];for(let v=0;v<_.length;v++)t.update(m,n,_[v])}}this.setMode=i,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=d,this.renderMultiDrawInstances=h}function $p(r){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,o,a){switch(t.calls++,o){case r.TRIANGLES:t.triangles+=a*(s/3);break;case r.LINES:t.lines+=a*(s/2);break;case r.LINE_STRIP:t.lines+=a*(s-1);break;case r.LINE_LOOP:t.lines+=a*s;break;case r.POINTS:t.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function Jp(r,e,t){const n=new WeakMap,i=new rt;function s(o,a,l){const c=o.morphTargetInfluences,d=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,h=d!==void 0?d.length:0;let u=n.get(a);if(u===void 0||u.count!==h){let y=function(){L.dispose(),n.delete(a),a.removeEventListener("dispose",y)};var p=y;u!==void 0&&u.texture.dispose();const g=a.morphAttributes.position!==void 0,_=a.morphAttributes.normal!==void 0,f=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],v=a.morphAttributes.normal||[],x=a.morphAttributes.color||[];let M=0;g===!0&&(M=1),_===!0&&(M=2),f===!0&&(M=3);let A=a.attributes.position.count*M,E=1;A>e.maxTextureSize&&(E=Math.ceil(A/e.maxTextureSize),A=e.maxTextureSize);const w=new Float32Array(A*E*4*h),L=new Qc(w,A,E,h);L.type=mn,L.needsUpdate=!0;const U=M*4;for(let S=0;S<h;S++){const B=m[S],F=v[S],z=x[S],Y=A*E*4*S;for(let G=0;G<B.count;G++){const J=G*U;g===!0&&(i.fromBufferAttribute(B,G),w[Y+J+0]=i.x,w[Y+J+1]=i.y,w[Y+J+2]=i.z,w[Y+J+3]=0),_===!0&&(i.fromBufferAttribute(F,G),w[Y+J+4]=i.x,w[Y+J+5]=i.y,w[Y+J+6]=i.z,w[Y+J+7]=0),f===!0&&(i.fromBufferAttribute(z,G),w[Y+J+8]=i.x,w[Y+J+9]=i.y,w[Y+J+10]=i.z,w[Y+J+11]=z.itemSize===4?i.w:1)}}u={count:h,texture:L,size:new qe(A,E)},n.set(a,u),a.addEventListener("dispose",y)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(r,"morphTexture",o.morphTexture,t);else{let g=0;for(let f=0;f<c.length;f++)g+=c[f];const _=a.morphTargetsRelative?1:1-g;l.getUniforms().setValue(r,"morphTargetBaseInfluence",_),l.getUniforms().setValue(r,"morphTargetInfluences",c)}l.getUniforms().setValue(r,"morphTargetsTexture",u.texture,t),l.getUniforms().setValue(r,"morphTargetsTextureSize",u.size)}return{update:s}}function Qp(r,e,t,n){let i=new WeakMap;function s(l){const c=n.render.frame,d=l.geometry,h=e.get(l,d);if(i.get(h)!==c&&(e.update(h),i.set(h,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),i.get(l)!==c&&(t.update(l.instanceMatrix,r.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,r.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){const u=l.skeleton;i.get(u)!==c&&(u.update(),i.set(u,c))}return h}function o(){i=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:o}}class ah extends Et{constructor(e,t,n,i,s,o,a,l,c,d=Oi){if(d!==Oi&&d!==qi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&d===Oi&&(n=pi),n===void 0&&d===qi&&(n=Xi),super(null,i,s,o,a,l,d,n,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:Xt,this.minFilter=l!==void 0?l:Xt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const lh=new Et,Ol=new ah(1,1),ch=new Qc,hh=new Fd,dh=new rh,Fl=[],kl=[],zl=new Float32Array(16),Gl=new Float32Array(9),Hl=new Float32Array(4);function es(r,e,t){const n=r[0];if(n<=0||n>0)return r;const i=e*t;let s=Fl[i];if(s===void 0&&(s=new Float32Array(i),Fl[i]=s),e!==0){n.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,r[o].toArray(s,a)}return s}function At(r,e){if(r.length!==e.length)return!1;for(let t=0,n=r.length;t<n;t++)if(r[t]!==e[t])return!1;return!0}function Rt(r,e){for(let t=0,n=e.length;t<n;t++)r[t]=e[t]}function Dr(r,e){let t=kl[e];t===void 0&&(t=new Int32Array(e),kl[e]=t);for(let n=0;n!==e;++n)t[n]=r.allocateTextureUnit();return t}function em(r,e){const t=this.cache;t[0]!==e&&(r.uniform1f(this.addr,e),t[0]=e)}function tm(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(At(t,e))return;r.uniform2fv(this.addr,e),Rt(t,e)}}function nm(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(r.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(At(t,e))return;r.uniform3fv(this.addr,e),Rt(t,e)}}function im(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(At(t,e))return;r.uniform4fv(this.addr,e),Rt(t,e)}}function sm(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(At(t,e))return;r.uniformMatrix2fv(this.addr,!1,e),Rt(t,e)}else{if(At(t,n))return;Hl.set(n),r.uniformMatrix2fv(this.addr,!1,Hl),Rt(t,n)}}function rm(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(At(t,e))return;r.uniformMatrix3fv(this.addr,!1,e),Rt(t,e)}else{if(At(t,n))return;Gl.set(n),r.uniformMatrix3fv(this.addr,!1,Gl),Rt(t,n)}}function om(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(At(t,e))return;r.uniformMatrix4fv(this.addr,!1,e),Rt(t,e)}else{if(At(t,n))return;zl.set(n),r.uniformMatrix4fv(this.addr,!1,zl),Rt(t,n)}}function am(r,e){const t=this.cache;t[0]!==e&&(r.uniform1i(this.addr,e),t[0]=e)}function lm(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(At(t,e))return;r.uniform2iv(this.addr,e),Rt(t,e)}}function cm(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(At(t,e))return;r.uniform3iv(this.addr,e),Rt(t,e)}}function hm(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(At(t,e))return;r.uniform4iv(this.addr,e),Rt(t,e)}}function dm(r,e){const t=this.cache;t[0]!==e&&(r.uniform1ui(this.addr,e),t[0]=e)}function um(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(At(t,e))return;r.uniform2uiv(this.addr,e),Rt(t,e)}}function fm(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(At(t,e))return;r.uniform3uiv(this.addr,e),Rt(t,e)}}function pm(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(At(t,e))return;r.uniform4uiv(this.addr,e),Rt(t,e)}}function mm(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i);let s;this.type===r.SAMPLER_2D_SHADOW?(Ol.compareFunction=Zc,s=Ol):s=lh,t.setTexture2D(e||s,i)}function gm(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||hh,i)}function _m(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||dh,i)}function xm(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||ch,i)}function ym(r){switch(r){case 5126:return em;case 35664:return tm;case 35665:return nm;case 35666:return im;case 35674:return sm;case 35675:return rm;case 35676:return om;case 5124:case 35670:return am;case 35667:case 35671:return lm;case 35668:case 35672:return cm;case 35669:case 35673:return hm;case 5125:return dm;case 36294:return um;case 36295:return fm;case 36296:return pm;case 35678:case 36198:case 36298:case 36306:case 35682:return mm;case 35679:case 36299:case 36307:return gm;case 35680:case 36300:case 36308:case 36293:return _m;case 36289:case 36303:case 36311:case 36292:return xm}}function vm(r,e){r.uniform1fv(this.addr,e)}function Mm(r,e){const t=es(e,this.size,2);r.uniform2fv(this.addr,t)}function Sm(r,e){const t=es(e,this.size,3);r.uniform3fv(this.addr,t)}function bm(r,e){const t=es(e,this.size,4);r.uniform4fv(this.addr,t)}function Tm(r,e){const t=es(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,t)}function wm(r,e){const t=es(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,t)}function Em(r,e){const t=es(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,t)}function Am(r,e){r.uniform1iv(this.addr,e)}function Rm(r,e){r.uniform2iv(this.addr,e)}function Cm(r,e){r.uniform3iv(this.addr,e)}function Pm(r,e){r.uniform4iv(this.addr,e)}function Lm(r,e){r.uniform1uiv(this.addr,e)}function Im(r,e){r.uniform2uiv(this.addr,e)}function Dm(r,e){r.uniform3uiv(this.addr,e)}function Nm(r,e){r.uniform4uiv(this.addr,e)}function Um(r,e,t){const n=this.cache,i=e.length,s=Dr(t,i);At(n,s)||(r.uniform1iv(this.addr,s),Rt(n,s));for(let o=0;o!==i;++o)t.setTexture2D(e[o]||lh,s[o])}function Bm(r,e,t){const n=this.cache,i=e.length,s=Dr(t,i);At(n,s)||(r.uniform1iv(this.addr,s),Rt(n,s));for(let o=0;o!==i;++o)t.setTexture3D(e[o]||hh,s[o])}function Om(r,e,t){const n=this.cache,i=e.length,s=Dr(t,i);At(n,s)||(r.uniform1iv(this.addr,s),Rt(n,s));for(let o=0;o!==i;++o)t.setTextureCube(e[o]||dh,s[o])}function Fm(r,e,t){const n=this.cache,i=e.length,s=Dr(t,i);At(n,s)||(r.uniform1iv(this.addr,s),Rt(n,s));for(let o=0;o!==i;++o)t.setTexture2DArray(e[o]||ch,s[o])}function km(r){switch(r){case 5126:return vm;case 35664:return Mm;case 35665:return Sm;case 35666:return bm;case 35674:return Tm;case 35675:return wm;case 35676:return Em;case 5124:case 35670:return Am;case 35667:case 35671:return Rm;case 35668:case 35672:return Cm;case 35669:case 35673:return Pm;case 5125:return Lm;case 36294:return Im;case 36295:return Dm;case 36296:return Nm;case 35678:case 36198:case 36298:case 36306:case 35682:return Um;case 35679:case 36299:case 36307:return Bm;case 35680:case 36300:case 36308:case 36293:return Om;case 36289:case 36303:case 36311:case 36292:return Fm}}class zm{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=ym(t.type)}}class Gm{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=km(t.type)}}class Hm{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let s=0,o=i.length;s!==o;++s){const a=i[s];a.setValue(e,t[a.id],n)}}}const uo=/(\w+)(\])?(\[|\.)?/g;function Vl(r,e){r.seq.push(e),r.map[e.id]=e}function Vm(r,e,t){const n=r.name,i=n.length;for(uo.lastIndex=0;;){const s=uo.exec(n),o=uo.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===i){Vl(t,c===void 0?new zm(a,r,e):new Gm(a,r,e));break}else{let h=t.map[a];h===void 0&&(h=new Hm(a),Vl(t,h)),t=h}}}class _r{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const s=e.getActiveUniform(t,i),o=e.getUniformLocation(t,s.name);Vm(s,o,this)}}setValue(e,t,n,i){const s=this.map[t];s!==void 0&&s.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let s=0,o=t.length;s!==o;++s){const a=t[s],l=n[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,s=e.length;i!==s;++i){const o=e[i];o.id in t&&n.push(o)}return n}}function Wl(r,e,t){const n=r.createShader(e);return r.shaderSource(n,t),r.compileShader(n),n}const Wm=37297;let Xm=0;function qm(r,e){const t=r.split(`
`),n=[],i=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=i;o<s;o++){const a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}function Km(r){const e=st.getPrimaries(st.workingColorSpace),t=st.getPrimaries(r);let n;switch(e===t?n="":e===br&&t===Sr?n="LinearDisplayP3ToLinearSRGB":e===Sr&&t===br&&(n="LinearSRGBToLinearDisplayP3"),r){case Ut:case Ir:return[n,"LinearTransferOETF"];case Ft:case Na:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",r),[n,"LinearTransferOETF"]}}function Xl(r,e,t){const n=r.getShaderParameter(e,r.COMPILE_STATUS),i=r.getShaderInfoLog(e).trim();if(n&&i==="")return"";const s=/ERROR: 0:(\d+)/.exec(i);if(s){const o=parseInt(s[1]);return t.toUpperCase()+`

`+i+`

`+qm(r.getShaderSource(e),o)}else return i}function Ym(r,e){const t=Km(e);return`vec4 ${r}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function jm(r,e){let t;switch(e){case Yh:t="Linear";break;case jh:t="Reinhard";break;case Zh:t="Cineon";break;case Bc:t="ACESFilmic";break;case Jh:t="AgX";break;case Qh:t="Neutral";break;case $h:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+r+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Qs=new C;function Zm(){st.getLuminanceCoefficients(Qs);const r=Qs.x.toFixed(4),e=Qs.y.toFixed(4),t=Qs.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function $m(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(_s).join(`
`)}function Jm(r){const e=[];for(const t in r){const n=r[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Qm(r,e){const t={},n=r.getProgramParameter(e,r.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const s=r.getActiveAttrib(e,i),o=s.name;let a=1;s.type===r.FLOAT_MAT2&&(a=2),s.type===r.FLOAT_MAT3&&(a=3),s.type===r.FLOAT_MAT4&&(a=4),t[o]={type:s.type,location:r.getAttribLocation(e,o),locationSize:a}}return t}function _s(r){return r!==""}function ql(r,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Kl(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const e0=/^[ \t]*#include +<([\w\d./]+)>/gm;function ma(r){return r.replace(e0,n0)}const t0=new Map;function n0(r,e){let t=We[e];if(t===void 0){const n=t0.get(e);if(n!==void 0)t=We[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return ma(t)}const i0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Yl(r){return r.replace(i0,s0)}function s0(r,e,t,n){let i="";for(let s=parseInt(e);s<parseInt(t);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function jl(r){let e=`precision ${r.precision} float;
	precision ${r.precision} int;
	precision ${r.precision} sampler2D;
	precision ${r.precision} samplerCube;
	precision ${r.precision} sampler3D;
	precision ${r.precision} sampler2DArray;
	precision ${r.precision} sampler2DShadow;
	precision ${r.precision} samplerCubeShadow;
	precision ${r.precision} sampler2DArrayShadow;
	precision ${r.precision} isampler2D;
	precision ${r.precision} isampler3D;
	precision ${r.precision} isamplerCube;
	precision ${r.precision} isampler2DArray;
	precision ${r.precision} usampler2D;
	precision ${r.precision} usampler3D;
	precision ${r.precision} usamplerCube;
	precision ${r.precision} usampler2DArray;
	`;return r.precision==="highp"?e+=`
#define HIGH_PRECISION`:r.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function r0(r){let e="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===Dc?e="SHADOWMAP_TYPE_PCF":r.shadowMapType===Nc?e="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===In&&(e="SHADOWMAP_TYPE_VSM"),e}function o0(r){let e="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case Vi:case Wi:e="ENVMAP_TYPE_CUBE";break;case Lr:e="ENVMAP_TYPE_CUBE_UV";break}return e}function a0(r){let e="ENVMAP_MODE_REFLECTION";if(r.envMap)switch(r.envMapMode){case Wi:e="ENVMAP_MODE_REFRACTION";break}return e}function l0(r){let e="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case Uc:e="ENVMAP_BLENDING_MULTIPLY";break;case qh:e="ENVMAP_BLENDING_MIX";break;case Kh:e="ENVMAP_BLENDING_ADD";break}return e}function c0(r){const e=r.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function h0(r,e,t,n){const i=r.getContext(),s=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=r0(t),c=o0(t),d=a0(t),h=l0(t),u=c0(t),p=$m(t),g=Jm(s),_=i.createProgram();let f,m,v=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(_s).join(`
`),f.length>0&&(f+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(_s).join(`
`),m.length>0&&(m+=`
`)):(f=[jl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+d:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(_s).join(`
`),m=[jl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+d:"",t.envMap?"#define "+h:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Jn?"#define TONE_MAPPING":"",t.toneMapping!==Jn?We.tonemapping_pars_fragment:"",t.toneMapping!==Jn?jm("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",We.colorspace_pars_fragment,Ym("linearToOutputTexel",t.outputColorSpace),Zm(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(_s).join(`
`)),o=ma(o),o=ql(o,t),o=Kl(o,t),a=ma(a),a=ql(a,t),a=Kl(a,t),o=Yl(o),a=Yl(a),t.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,f=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+f,m=["#define varying in",t.glslVersion===dl?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===dl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const x=v+f+o,M=v+m+a,A=Wl(i,i.VERTEX_SHADER,x),E=Wl(i,i.FRAGMENT_SHADER,M);i.attachShader(_,A),i.attachShader(_,E),t.index0AttributeName!==void 0?i.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(_,0,"position"),i.linkProgram(_);function w(S){if(r.debug.checkShaderErrors){const B=i.getProgramInfoLog(_).trim(),F=i.getShaderInfoLog(A).trim(),z=i.getShaderInfoLog(E).trim();let Y=!0,G=!0;if(i.getProgramParameter(_,i.LINK_STATUS)===!1)if(Y=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,_,A,E);else{const J=Xl(i,A,"vertex"),X=Xl(i,E,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(_,i.VALIDATE_STATUS)+`

Material Name: `+S.name+`
Material Type: `+S.type+`

Program Info Log: `+B+`
`+J+`
`+X)}else B!==""?console.warn("THREE.WebGLProgram: Program Info Log:",B):(F===""||z==="")&&(G=!1);G&&(S.diagnostics={runnable:Y,programLog:B,vertexShader:{log:F,prefix:f},fragmentShader:{log:z,prefix:m}})}i.deleteShader(A),i.deleteShader(E),L=new _r(i,_),U=Qm(i,_)}let L;this.getUniforms=function(){return L===void 0&&w(this),L};let U;this.getAttributes=function(){return U===void 0&&w(this),U};let y=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return y===!1&&(y=i.getProgramParameter(_,Wm)),y},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Xm++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=A,this.fragmentShader=E,this}let d0=0;class u0{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),s=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new f0(e),t.set(e,n)),n}}class f0{constructor(e){this.id=d0++,this.code=e,this.usedTimes=0}}function p0(r,e,t,n,i,s,o){const a=new Ba,l=new u0,c=new Set,d=[],h=i.logarithmicDepthBuffer,u=i.reverseDepthBuffer,p=i.vertexTextures;let g=i.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function f(y){return c.add(y),y===0?"uv":`uv${y}`}function m(y,S,B,F,z){const Y=F.fog,G=z.geometry,J=y.isMeshStandardMaterial?F.environment:null,X=(y.isMeshStandardMaterial?t:e).get(y.envMap||J),le=X&&X.mapping===Lr?X.image.height:null,re=_[y.type];y.precision!==null&&(g=i.getMaxPrecision(y.precision),g!==y.precision&&console.warn("THREE.WebGLProgram.getParameters:",y.precision,"not supported, using",g,"instead."));const ue=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,Ye=ue!==void 0?ue.length:0;let tt=0;G.morphAttributes.position!==void 0&&(tt=1),G.morphAttributes.normal!==void 0&&(tt=2),G.morphAttributes.color!==void 0&&(tt=3);let j,ee,Se,xe;if(re){const Ee=yn[re];j=Ee.vertexShader,ee=Ee.fragmentShader}else j=y.vertexShader,ee=y.fragmentShader,l.update(y),Se=l.getVertexShaderID(y),xe=l.getFragmentShaderID(y);const Oe=r.getRenderTarget(),ye=z.isInstancedMesh===!0,$e=z.isBatchedMesh===!0,Je=!!y.map,Qe=!!y.matcap,I=!!X,Gt=!!y.aoMap,je=!!y.lightMap,et=!!y.bumpMap,Le=!!y.normalMap,ft=!!y.displacementMap,Ue=!!y.emissiveMap,R=!!y.metalnessMap,b=!!y.roughnessMap,k=y.anisotropy>0,Z=y.clearcoat>0,Q=y.dispersion>0,K=y.iridescence>0,oe=y.sheen>0,se=y.transmission>0,pe=k&&!!y.anisotropyMap,nt=Z&&!!y.clearcoatMap,te=Z&&!!y.clearcoatNormalMap,ve=Z&&!!y.clearcoatRoughnessMap,Ce=K&&!!y.iridescenceMap,Ie=K&&!!y.iridescenceThicknessMap,ge=oe&&!!y.sheenColorMap,Ge=oe&&!!y.sheenRoughnessMap,Pe=!!y.specularMap,it=!!y.specularColorMap,D=!!y.specularIntensityMap,he=se&&!!y.transmissionMap,W=se&&!!y.thicknessMap,$=!!y.gradientMap,ae=!!y.alphaMap,de=y.alphaTest>0,He=!!y.alphaHash,pt=!!y.extensions;let Ve=Jn;y.toneMapped&&(Oe===null||Oe.isXRRenderTarget===!0)&&(Ve=r.toneMapping);const me={shaderID:re,shaderType:y.type,shaderName:y.name,vertexShader:j,fragmentShader:ee,defines:y.defines,customVertexShaderID:Se,customFragmentShaderID:xe,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:g,batching:$e,batchingColor:$e&&z._colorsTexture!==null,instancing:ye,instancingColor:ye&&z.instanceColor!==null,instancingMorph:ye&&z.morphTexture!==null,supportsVertexTextures:p,outputColorSpace:Oe===null?r.outputColorSpace:Oe.isXRRenderTarget===!0?Oe.texture.colorSpace:Ut,alphaToCoverage:!!y.alphaToCoverage,map:Je,matcap:Qe,envMap:I,envMapMode:I&&X.mapping,envMapCubeUVHeight:le,aoMap:Gt,lightMap:je,bumpMap:et,normalMap:Le,displacementMap:p&&ft,emissiveMap:Ue,normalMapObjectSpace:Le&&y.normalMapType===rd,normalMapTangentSpace:Le&&y.normalMapType===jc,metalnessMap:R,roughnessMap:b,anisotropy:k,anisotropyMap:pe,clearcoat:Z,clearcoatMap:nt,clearcoatNormalMap:te,clearcoatRoughnessMap:ve,dispersion:Q,iridescence:K,iridescenceMap:Ce,iridescenceThicknessMap:Ie,sheen:oe,sheenColorMap:ge,sheenRoughnessMap:Ge,specularMap:Pe,specularColorMap:it,specularIntensityMap:D,transmission:se,transmissionMap:he,thicknessMap:W,gradientMap:$,opaque:y.transparent===!1&&y.blending===Bi&&y.alphaToCoverage===!1,alphaMap:ae,alphaTest:de,alphaHash:He,combine:y.combine,mapUv:Je&&f(y.map.channel),aoMapUv:Gt&&f(y.aoMap.channel),lightMapUv:je&&f(y.lightMap.channel),bumpMapUv:et&&f(y.bumpMap.channel),normalMapUv:Le&&f(y.normalMap.channel),displacementMapUv:ft&&f(y.displacementMap.channel),emissiveMapUv:Ue&&f(y.emissiveMap.channel),metalnessMapUv:R&&f(y.metalnessMap.channel),roughnessMapUv:b&&f(y.roughnessMap.channel),anisotropyMapUv:pe&&f(y.anisotropyMap.channel),clearcoatMapUv:nt&&f(y.clearcoatMap.channel),clearcoatNormalMapUv:te&&f(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ve&&f(y.clearcoatRoughnessMap.channel),iridescenceMapUv:Ce&&f(y.iridescenceMap.channel),iridescenceThicknessMapUv:Ie&&f(y.iridescenceThicknessMap.channel),sheenColorMapUv:ge&&f(y.sheenColorMap.channel),sheenRoughnessMapUv:Ge&&f(y.sheenRoughnessMap.channel),specularMapUv:Pe&&f(y.specularMap.channel),specularColorMapUv:it&&f(y.specularColorMap.channel),specularIntensityMapUv:D&&f(y.specularIntensityMap.channel),transmissionMapUv:he&&f(y.transmissionMap.channel),thicknessMapUv:W&&f(y.thicknessMap.channel),alphaMapUv:ae&&f(y.alphaMap.channel),vertexTangents:!!G.attributes.tangent&&(Le||k),vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,pointsUvs:z.isPoints===!0&&!!G.attributes.uv&&(Je||ae),fog:!!Y,useFog:y.fog===!0,fogExp2:!!Y&&Y.isFogExp2,flatShading:y.flatShading===!0,sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:h,reverseDepthBuffer:u,skinning:z.isSkinnedMesh===!0,morphTargets:G.morphAttributes.position!==void 0,morphNormals:G.morphAttributes.normal!==void 0,morphColors:G.morphAttributes.color!==void 0,morphTargetsCount:Ye,morphTextureStride:tt,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:y.dithering,shadowMapEnabled:r.shadowMap.enabled&&B.length>0,shadowMapType:r.shadowMap.type,toneMapping:Ve,decodeVideoTexture:Je&&y.map.isVideoTexture===!0&&st.getTransfer(y.map.colorSpace)===xt,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===Nt,flipSided:y.side===qt,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:pt&&y.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(pt&&y.extensions.multiDraw===!0||$e)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return me.vertexUv1s=c.has(1),me.vertexUv2s=c.has(2),me.vertexUv3s=c.has(3),c.clear(),me}function v(y){const S=[];if(y.shaderID?S.push(y.shaderID):(S.push(y.customVertexShaderID),S.push(y.customFragmentShaderID)),y.defines!==void 0)for(const B in y.defines)S.push(B),S.push(y.defines[B]);return y.isRawShaderMaterial===!1&&(x(S,y),M(S,y),S.push(r.outputColorSpace)),S.push(y.customProgramCacheKey),S.join()}function x(y,S){y.push(S.precision),y.push(S.outputColorSpace),y.push(S.envMapMode),y.push(S.envMapCubeUVHeight),y.push(S.mapUv),y.push(S.alphaMapUv),y.push(S.lightMapUv),y.push(S.aoMapUv),y.push(S.bumpMapUv),y.push(S.normalMapUv),y.push(S.displacementMapUv),y.push(S.emissiveMapUv),y.push(S.metalnessMapUv),y.push(S.roughnessMapUv),y.push(S.anisotropyMapUv),y.push(S.clearcoatMapUv),y.push(S.clearcoatNormalMapUv),y.push(S.clearcoatRoughnessMapUv),y.push(S.iridescenceMapUv),y.push(S.iridescenceThicknessMapUv),y.push(S.sheenColorMapUv),y.push(S.sheenRoughnessMapUv),y.push(S.specularMapUv),y.push(S.specularColorMapUv),y.push(S.specularIntensityMapUv),y.push(S.transmissionMapUv),y.push(S.thicknessMapUv),y.push(S.combine),y.push(S.fogExp2),y.push(S.sizeAttenuation),y.push(S.morphTargetsCount),y.push(S.morphAttributeCount),y.push(S.numDirLights),y.push(S.numPointLights),y.push(S.numSpotLights),y.push(S.numSpotLightMaps),y.push(S.numHemiLights),y.push(S.numRectAreaLights),y.push(S.numDirLightShadows),y.push(S.numPointLightShadows),y.push(S.numSpotLightShadows),y.push(S.numSpotLightShadowsWithMaps),y.push(S.numLightProbes),y.push(S.shadowMapType),y.push(S.toneMapping),y.push(S.numClippingPlanes),y.push(S.numClipIntersection),y.push(S.depthPacking)}function M(y,S){a.disableAll(),S.supportsVertexTextures&&a.enable(0),S.instancing&&a.enable(1),S.instancingColor&&a.enable(2),S.instancingMorph&&a.enable(3),S.matcap&&a.enable(4),S.envMap&&a.enable(5),S.normalMapObjectSpace&&a.enable(6),S.normalMapTangentSpace&&a.enable(7),S.clearcoat&&a.enable(8),S.iridescence&&a.enable(9),S.alphaTest&&a.enable(10),S.vertexColors&&a.enable(11),S.vertexAlphas&&a.enable(12),S.vertexUv1s&&a.enable(13),S.vertexUv2s&&a.enable(14),S.vertexUv3s&&a.enable(15),S.vertexTangents&&a.enable(16),S.anisotropy&&a.enable(17),S.alphaHash&&a.enable(18),S.batching&&a.enable(19),S.dispersion&&a.enable(20),S.batchingColor&&a.enable(21),y.push(a.mask),a.disableAll(),S.fog&&a.enable(0),S.useFog&&a.enable(1),S.flatShading&&a.enable(2),S.logarithmicDepthBuffer&&a.enable(3),S.reverseDepthBuffer&&a.enable(4),S.skinning&&a.enable(5),S.morphTargets&&a.enable(6),S.morphNormals&&a.enable(7),S.morphColors&&a.enable(8),S.premultipliedAlpha&&a.enable(9),S.shadowMapEnabled&&a.enable(10),S.doubleSided&&a.enable(11),S.flipSided&&a.enable(12),S.useDepthPacking&&a.enable(13),S.dithering&&a.enable(14),S.transmission&&a.enable(15),S.sheen&&a.enable(16),S.opaque&&a.enable(17),S.pointsUvs&&a.enable(18),S.decodeVideoTexture&&a.enable(19),S.alphaToCoverage&&a.enable(20),y.push(a.mask)}function A(y){const S=_[y.type];let B;if(S){const F=yn[S];B=Zd.clone(F.uniforms)}else B=y.uniforms;return B}function E(y,S){let B;for(let F=0,z=d.length;F<z;F++){const Y=d[F];if(Y.cacheKey===S){B=Y,++B.usedTimes;break}}return B===void 0&&(B=new h0(r,S,y,s),d.push(B)),B}function w(y){if(--y.usedTimes===0){const S=d.indexOf(y);d[S]=d[d.length-1],d.pop(),y.destroy()}}function L(y){l.remove(y)}function U(){l.dispose()}return{getParameters:m,getProgramCacheKey:v,getUniforms:A,acquireProgram:E,releaseProgram:w,releaseShaderCache:L,programs:d,dispose:U}}function m0(){let r=new WeakMap;function e(o){return r.has(o)}function t(o){let a=r.get(o);return a===void 0&&(a={},r.set(o,a)),a}function n(o){r.delete(o)}function i(o,a,l){r.get(o)[a]=l}function s(){r=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:s}}function g0(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.z!==e.z?r.z-e.z:r.id-e.id}function Zl(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function $l(){const r=[];let e=0;const t=[],n=[],i=[];function s(){e=0,t.length=0,n.length=0,i.length=0}function o(h,u,p,g,_,f){let m=r[e];return m===void 0?(m={id:h.id,object:h,geometry:u,material:p,groupOrder:g,renderOrder:h.renderOrder,z:_,group:f},r[e]=m):(m.id=h.id,m.object=h,m.geometry=u,m.material=p,m.groupOrder=g,m.renderOrder=h.renderOrder,m.z=_,m.group=f),e++,m}function a(h,u,p,g,_,f){const m=o(h,u,p,g,_,f);p.transmission>0?n.push(m):p.transparent===!0?i.push(m):t.push(m)}function l(h,u,p,g,_,f){const m=o(h,u,p,g,_,f);p.transmission>0?n.unshift(m):p.transparent===!0?i.unshift(m):t.unshift(m)}function c(h,u){t.length>1&&t.sort(h||g0),n.length>1&&n.sort(u||Zl),i.length>1&&i.sort(u||Zl)}function d(){for(let h=e,u=r.length;h<u;h++){const p=r[h];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:n,transparent:i,init:s,push:a,unshift:l,finish:d,sort:c}}function _0(){let r=new WeakMap;function e(n,i){const s=r.get(n);let o;return s===void 0?(o=new $l,r.set(n,[o])):i>=s.length?(o=new $l,s.push(o)):o=s[i],o}function t(){r=new WeakMap}return{get:e,dispose:t}}function x0(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new C,color:new De};break;case"SpotLight":t={position:new C,direction:new C,color:new De,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new C,color:new De,distance:0,decay:0};break;case"HemisphereLight":t={direction:new C,skyColor:new De,groundColor:new De};break;case"RectAreaLight":t={color:new De,position:new C,halfWidth:new C,halfHeight:new C};break}return r[e.id]=t,t}}}function y0(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new qe};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new qe};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new qe,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[e.id]=t,t}}}let v0=0;function M0(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function S0(r){const e=new x0,t=y0(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new C);const i=new C,s=new ze,o=new ze;function a(c){let d=0,h=0,u=0;for(let U=0;U<9;U++)n.probe[U].set(0,0,0);let p=0,g=0,_=0,f=0,m=0,v=0,x=0,M=0,A=0,E=0,w=0;c.sort(M0);for(let U=0,y=c.length;U<y;U++){const S=c[U],B=S.color,F=S.intensity,z=S.distance,Y=S.shadow&&S.shadow.map?S.shadow.map.texture:null;if(S.isAmbientLight)d+=B.r*F,h+=B.g*F,u+=B.b*F;else if(S.isLightProbe){for(let G=0;G<9;G++)n.probe[G].addScaledVector(S.sh.coefficients[G],F);w++}else if(S.isDirectionalLight){const G=e.get(S);if(G.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){const J=S.shadow,X=t.get(S);X.shadowIntensity=J.intensity,X.shadowBias=J.bias,X.shadowNormalBias=J.normalBias,X.shadowRadius=J.radius,X.shadowMapSize=J.mapSize,n.directionalShadow[p]=X,n.directionalShadowMap[p]=Y,n.directionalShadowMatrix[p]=S.shadow.matrix,v++}n.directional[p]=G,p++}else if(S.isSpotLight){const G=e.get(S);G.position.setFromMatrixPosition(S.matrixWorld),G.color.copy(B).multiplyScalar(F),G.distance=z,G.coneCos=Math.cos(S.angle),G.penumbraCos=Math.cos(S.angle*(1-S.penumbra)),G.decay=S.decay,n.spot[_]=G;const J=S.shadow;if(S.map&&(n.spotLightMap[A]=S.map,A++,J.updateMatrices(S),S.castShadow&&E++),n.spotLightMatrix[_]=J.matrix,S.castShadow){const X=t.get(S);X.shadowIntensity=J.intensity,X.shadowBias=J.bias,X.shadowNormalBias=J.normalBias,X.shadowRadius=J.radius,X.shadowMapSize=J.mapSize,n.spotShadow[_]=X,n.spotShadowMap[_]=Y,M++}_++}else if(S.isRectAreaLight){const G=e.get(S);G.color.copy(B).multiplyScalar(F),G.halfWidth.set(S.width*.5,0,0),G.halfHeight.set(0,S.height*.5,0),n.rectArea[f]=G,f++}else if(S.isPointLight){const G=e.get(S);if(G.color.copy(S.color).multiplyScalar(S.intensity),G.distance=S.distance,G.decay=S.decay,S.castShadow){const J=S.shadow,X=t.get(S);X.shadowIntensity=J.intensity,X.shadowBias=J.bias,X.shadowNormalBias=J.normalBias,X.shadowRadius=J.radius,X.shadowMapSize=J.mapSize,X.shadowCameraNear=J.camera.near,X.shadowCameraFar=J.camera.far,n.pointShadow[g]=X,n.pointShadowMap[g]=Y,n.pointShadowMatrix[g]=S.shadow.matrix,x++}n.point[g]=G,g++}else if(S.isHemisphereLight){const G=e.get(S);G.skyColor.copy(S.color).multiplyScalar(F),G.groundColor.copy(S.groundColor).multiplyScalar(F),n.hemi[m]=G,m++}}f>0&&(r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ce.LTC_FLOAT_1,n.rectAreaLTC2=ce.LTC_FLOAT_2):(n.rectAreaLTC1=ce.LTC_HALF_1,n.rectAreaLTC2=ce.LTC_HALF_2)),n.ambient[0]=d,n.ambient[1]=h,n.ambient[2]=u;const L=n.hash;(L.directionalLength!==p||L.pointLength!==g||L.spotLength!==_||L.rectAreaLength!==f||L.hemiLength!==m||L.numDirectionalShadows!==v||L.numPointShadows!==x||L.numSpotShadows!==M||L.numSpotMaps!==A||L.numLightProbes!==w)&&(n.directional.length=p,n.spot.length=_,n.rectArea.length=f,n.point.length=g,n.hemi.length=m,n.directionalShadow.length=v,n.directionalShadowMap.length=v,n.pointShadow.length=x,n.pointShadowMap.length=x,n.spotShadow.length=M,n.spotShadowMap.length=M,n.directionalShadowMatrix.length=v,n.pointShadowMatrix.length=x,n.spotLightMatrix.length=M+A-E,n.spotLightMap.length=A,n.numSpotLightShadowsWithMaps=E,n.numLightProbes=w,L.directionalLength=p,L.pointLength=g,L.spotLength=_,L.rectAreaLength=f,L.hemiLength=m,L.numDirectionalShadows=v,L.numPointShadows=x,L.numSpotShadows=M,L.numSpotMaps=A,L.numLightProbes=w,n.version=v0++)}function l(c,d){let h=0,u=0,p=0,g=0,_=0;const f=d.matrixWorldInverse;for(let m=0,v=c.length;m<v;m++){const x=c[m];if(x.isDirectionalLight){const M=n.directional[h];M.direction.setFromMatrixPosition(x.matrixWorld),i.setFromMatrixPosition(x.target.matrixWorld),M.direction.sub(i),M.direction.transformDirection(f),h++}else if(x.isSpotLight){const M=n.spot[p];M.position.setFromMatrixPosition(x.matrixWorld),M.position.applyMatrix4(f),M.direction.setFromMatrixPosition(x.matrixWorld),i.setFromMatrixPosition(x.target.matrixWorld),M.direction.sub(i),M.direction.transformDirection(f),p++}else if(x.isRectAreaLight){const M=n.rectArea[g];M.position.setFromMatrixPosition(x.matrixWorld),M.position.applyMatrix4(f),o.identity(),s.copy(x.matrixWorld),s.premultiply(f),o.extractRotation(s),M.halfWidth.set(x.width*.5,0,0),M.halfHeight.set(0,x.height*.5,0),M.halfWidth.applyMatrix4(o),M.halfHeight.applyMatrix4(o),g++}else if(x.isPointLight){const M=n.point[u];M.position.setFromMatrixPosition(x.matrixWorld),M.position.applyMatrix4(f),u++}else if(x.isHemisphereLight){const M=n.hemi[_];M.direction.setFromMatrixPosition(x.matrixWorld),M.direction.transformDirection(f),_++}}}return{setup:a,setupView:l,state:n}}function Jl(r){const e=new S0(r),t=[],n=[];function i(d){c.camera=d,t.length=0,n.length=0}function s(d){t.push(d)}function o(d){n.push(d)}function a(){e.setup(t)}function l(d){e.setupView(t,d)}const c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:i,state:c,setupLights:a,setupLightsView:l,pushLight:s,pushShadow:o}}function b0(r){let e=new WeakMap;function t(i,s=0){const o=e.get(i);let a;return o===void 0?(a=new Jl(r),e.set(i,[a])):s>=o.length?(a=new Jl(r),o.push(a)):a=o[s],a}function n(){e=new WeakMap}return{get:t,dispose:n}}class T0 extends vn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=id,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class w0 extends vn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const E0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,A0=`uniform sampler2D shadow_pass;
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
}`;function R0(r,e,t){let n=new Oa;const i=new qe,s=new qe,o=new rt,a=new T0({depthPacking:sd}),l=new w0,c={},d=t.maxTextureSize,h={[Fn]:qt,[qt]:Fn,[Nt]:Nt},u=new Qn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new qe},radius:{value:4}},vertexShader:E0,fragmentShader:A0}),p=u.clone();p.defines.HORIZONTAL_PASS=1;const g=new Tt;g.setAttribute("position",new Lt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new P(g,u),f=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Dc;let m=this.type;this.render=function(E,w,L){if(f.enabled===!1||f.autoUpdate===!1&&f.needsUpdate===!1||E.length===0)return;const U=r.getRenderTarget(),y=r.getActiveCubeFace(),S=r.getActiveMipmapLevel(),B=r.state;B.setBlending($n),B.buffers.color.setClear(1,1,1,1),B.buffers.depth.setTest(!0),B.setScissorTest(!1);const F=m!==In&&this.type===In,z=m===In&&this.type!==In;for(let Y=0,G=E.length;Y<G;Y++){const J=E[Y],X=J.shadow;if(X===void 0){console.warn("THREE.WebGLShadowMap:",J,"has no shadow.");continue}if(X.autoUpdate===!1&&X.needsUpdate===!1)continue;i.copy(X.mapSize);const le=X.getFrameExtents();if(i.multiply(le),s.copy(X.mapSize),(i.x>d||i.y>d)&&(i.x>d&&(s.x=Math.floor(d/le.x),i.x=s.x*le.x,X.mapSize.x=s.x),i.y>d&&(s.y=Math.floor(d/le.y),i.y=s.y*le.y,X.mapSize.y=s.y)),X.map===null||F===!0||z===!0){const ue=this.type!==In?{minFilter:Xt,magFilter:Xt}:{};X.map!==null&&X.map.dispose(),X.map=new mi(i.x,i.y,ue),X.map.texture.name=J.name+".shadowMap",X.camera.updateProjectionMatrix()}r.setRenderTarget(X.map),r.clear();const re=X.getViewportCount();for(let ue=0;ue<re;ue++){const Ye=X.getViewport(ue);o.set(s.x*Ye.x,s.y*Ye.y,s.x*Ye.z,s.y*Ye.w),B.viewport(o),X.updateMatrices(J,ue),n=X.getFrustum(),M(w,L,X.camera,J,this.type)}X.isPointLightShadow!==!0&&this.type===In&&v(X,L),X.needsUpdate=!1}m=this.type,f.needsUpdate=!1,r.setRenderTarget(U,y,S)};function v(E,w){const L=e.update(_);u.defines.VSM_SAMPLES!==E.blurSamples&&(u.defines.VSM_SAMPLES=E.blurSamples,p.defines.VSM_SAMPLES=E.blurSamples,u.needsUpdate=!0,p.needsUpdate=!0),E.mapPass===null&&(E.mapPass=new mi(i.x,i.y)),u.uniforms.shadow_pass.value=E.map.texture,u.uniforms.resolution.value=E.mapSize,u.uniforms.radius.value=E.radius,r.setRenderTarget(E.mapPass),r.clear(),r.renderBufferDirect(w,null,L,u,_,null),p.uniforms.shadow_pass.value=E.mapPass.texture,p.uniforms.resolution.value=E.mapSize,p.uniforms.radius.value=E.radius,r.setRenderTarget(E.map),r.clear(),r.renderBufferDirect(w,null,L,p,_,null)}function x(E,w,L,U){let y=null;const S=L.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(S!==void 0)y=S;else if(y=L.isPointLight===!0?l:a,r.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0){const B=y.uuid,F=w.uuid;let z=c[B];z===void 0&&(z={},c[B]=z);let Y=z[F];Y===void 0&&(Y=y.clone(),z[F]=Y,w.addEventListener("dispose",A)),y=Y}if(y.visible=w.visible,y.wireframe=w.wireframe,U===In?y.side=w.shadowSide!==null?w.shadowSide:w.side:y.side=w.shadowSide!==null?w.shadowSide:h[w.side],y.alphaMap=w.alphaMap,y.alphaTest=w.alphaTest,y.map=w.map,y.clipShadows=w.clipShadows,y.clippingPlanes=w.clippingPlanes,y.clipIntersection=w.clipIntersection,y.displacementMap=w.displacementMap,y.displacementScale=w.displacementScale,y.displacementBias=w.displacementBias,y.wireframeLinewidth=w.wireframeLinewidth,y.linewidth=w.linewidth,L.isPointLight===!0&&y.isMeshDistanceMaterial===!0){const B=r.properties.get(y);B.light=L}return y}function M(E,w,L,U,y){if(E.visible===!1)return;if(E.layers.test(w.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&y===In)&&(!E.frustumCulled||n.intersectsObject(E))){E.modelViewMatrix.multiplyMatrices(L.matrixWorldInverse,E.matrixWorld);const F=e.update(E),z=E.material;if(Array.isArray(z)){const Y=F.groups;for(let G=0,J=Y.length;G<J;G++){const X=Y[G],le=z[X.materialIndex];if(le&&le.visible){const re=x(E,le,U,y);E.onBeforeShadow(r,E,w,L,F,re,X),r.renderBufferDirect(L,null,F,re,E,X),E.onAfterShadow(r,E,w,L,F,re,X)}}}else if(z.visible){const Y=x(E,z,U,y);E.onBeforeShadow(r,E,w,L,F,Y,null),r.renderBufferDirect(L,null,F,Y,E,null),E.onAfterShadow(r,E,w,L,F,Y,null)}}const B=E.children;for(let F=0,z=B.length;F<z;F++)M(B[F],w,L,U,y)}function A(E){E.target.removeEventListener("dispose",A);for(const L in c){const U=c[L],y=E.target.uuid;y in U&&(U[y].dispose(),delete U[y])}}}const C0={[Io]:Do,[No]:Oo,[Uo]:Fo,[Hi]:Bo,[Do]:Io,[Oo]:No,[Fo]:Uo,[Bo]:Hi};function P0(r){function e(){let D=!1;const he=new rt;let W=null;const $=new rt(0,0,0,0);return{setMask:function(ae){W!==ae&&!D&&(r.colorMask(ae,ae,ae,ae),W=ae)},setLocked:function(ae){D=ae},setClear:function(ae,de,He,pt,Ve){Ve===!0&&(ae*=pt,de*=pt,He*=pt),he.set(ae,de,He,pt),$.equals(he)===!1&&(r.clearColor(ae,de,He,pt),$.copy(he))},reset:function(){D=!1,W=null,$.set(-1,0,0,0)}}}function t(){let D=!1,he=!1,W=null,$=null,ae=null;return{setReversed:function(de){he=de},setTest:function(de){de?Se(r.DEPTH_TEST):xe(r.DEPTH_TEST)},setMask:function(de){W!==de&&!D&&(r.depthMask(de),W=de)},setFunc:function(de){if(he&&(de=C0[de]),$!==de){switch(de){case Io:r.depthFunc(r.NEVER);break;case Do:r.depthFunc(r.ALWAYS);break;case No:r.depthFunc(r.LESS);break;case Hi:r.depthFunc(r.LEQUAL);break;case Uo:r.depthFunc(r.EQUAL);break;case Bo:r.depthFunc(r.GEQUAL);break;case Oo:r.depthFunc(r.GREATER);break;case Fo:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}$=de}},setLocked:function(de){D=de},setClear:function(de){ae!==de&&(r.clearDepth(de),ae=de)},reset:function(){D=!1,W=null,$=null,ae=null}}}function n(){let D=!1,he=null,W=null,$=null,ae=null,de=null,He=null,pt=null,Ve=null;return{setTest:function(me){D||(me?Se(r.STENCIL_TEST):xe(r.STENCIL_TEST))},setMask:function(me){he!==me&&!D&&(r.stencilMask(me),he=me)},setFunc:function(me,Ee,St){(W!==me||$!==Ee||ae!==St)&&(r.stencilFunc(me,Ee,St),W=me,$=Ee,ae=St)},setOp:function(me,Ee,St){(de!==me||He!==Ee||pt!==St)&&(r.stencilOp(me,Ee,St),de=me,He=Ee,pt=St)},setLocked:function(me){D=me},setClear:function(me){Ve!==me&&(r.clearStencil(me),Ve=me)},reset:function(){D=!1,he=null,W=null,$=null,ae=null,de=null,He=null,pt=null,Ve=null}}}const i=new e,s=new t,o=new n,a=new WeakMap,l=new WeakMap;let c={},d={},h=new WeakMap,u=[],p=null,g=!1,_=null,f=null,m=null,v=null,x=null,M=null,A=null,E=new De(0,0,0),w=0,L=!1,U=null,y=null,S=null,B=null,F=null;const z=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let Y=!1,G=0;const J=r.getParameter(r.VERSION);J.indexOf("WebGL")!==-1?(G=parseFloat(/^WebGL (\d)/.exec(J)[1]),Y=G>=1):J.indexOf("OpenGL ES")!==-1&&(G=parseFloat(/^OpenGL ES (\d)/.exec(J)[1]),Y=G>=2);let X=null,le={};const re=r.getParameter(r.SCISSOR_BOX),ue=r.getParameter(r.VIEWPORT),Ye=new rt().fromArray(re),tt=new rt().fromArray(ue);function j(D,he,W,$){const ae=new Uint8Array(4),de=r.createTexture();r.bindTexture(D,de),r.texParameteri(D,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(D,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let He=0;He<W;He++)D===r.TEXTURE_3D||D===r.TEXTURE_2D_ARRAY?r.texImage3D(he,0,r.RGBA,1,1,$,0,r.RGBA,r.UNSIGNED_BYTE,ae):r.texImage2D(he+He,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,ae);return de}const ee={};ee[r.TEXTURE_2D]=j(r.TEXTURE_2D,r.TEXTURE_2D,1),ee[r.TEXTURE_CUBE_MAP]=j(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),ee[r.TEXTURE_2D_ARRAY]=j(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),ee[r.TEXTURE_3D]=j(r.TEXTURE_3D,r.TEXTURE_3D,1,1),i.setClear(0,0,0,1),s.setClear(1),o.setClear(0),Se(r.DEPTH_TEST),s.setFunc(Hi),je(!1),et(il),Se(r.CULL_FACE),I($n);function Se(D){c[D]!==!0&&(r.enable(D),c[D]=!0)}function xe(D){c[D]!==!1&&(r.disable(D),c[D]=!1)}function Oe(D,he){return d[D]!==he?(r.bindFramebuffer(D,he),d[D]=he,D===r.DRAW_FRAMEBUFFER&&(d[r.FRAMEBUFFER]=he),D===r.FRAMEBUFFER&&(d[r.DRAW_FRAMEBUFFER]=he),!0):!1}function ye(D,he){let W=u,$=!1;if(D){W=h.get(he),W===void 0&&(W=[],h.set(he,W));const ae=D.textures;if(W.length!==ae.length||W[0]!==r.COLOR_ATTACHMENT0){for(let de=0,He=ae.length;de<He;de++)W[de]=r.COLOR_ATTACHMENT0+de;W.length=ae.length,$=!0}}else W[0]!==r.BACK&&(W[0]=r.BACK,$=!0);$&&r.drawBuffers(W)}function $e(D){return p!==D?(r.useProgram(D),p=D,!0):!1}const Je={[di]:r.FUNC_ADD,[Ch]:r.FUNC_SUBTRACT,[Ph]:r.FUNC_REVERSE_SUBTRACT};Je[Lh]=r.MIN,Je[Ih]=r.MAX;const Qe={[Dh]:r.ZERO,[Nh]:r.ONE,[Uh]:r.SRC_COLOR,[Po]:r.SRC_ALPHA,[Gh]:r.SRC_ALPHA_SATURATE,[kh]:r.DST_COLOR,[Oh]:r.DST_ALPHA,[Bh]:r.ONE_MINUS_SRC_COLOR,[Lo]:r.ONE_MINUS_SRC_ALPHA,[zh]:r.ONE_MINUS_DST_COLOR,[Fh]:r.ONE_MINUS_DST_ALPHA,[Hh]:r.CONSTANT_COLOR,[Vh]:r.ONE_MINUS_CONSTANT_COLOR,[Wh]:r.CONSTANT_ALPHA,[Xh]:r.ONE_MINUS_CONSTANT_ALPHA};function I(D,he,W,$,ae,de,He,pt,Ve,me){if(D===$n){g===!0&&(xe(r.BLEND),g=!1);return}if(g===!1&&(Se(r.BLEND),g=!0),D!==Rh){if(D!==_||me!==L){if((f!==di||x!==di)&&(r.blendEquation(r.FUNC_ADD),f=di,x=di),me)switch(D){case Bi:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Ss:r.blendFunc(r.ONE,r.ONE);break;case sl:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case rl:r.blendFuncSeparate(r.ZERO,r.SRC_COLOR,r.ZERO,r.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}else switch(D){case Bi:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Ss:r.blendFunc(r.SRC_ALPHA,r.ONE);break;case sl:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case rl:r.blendFunc(r.ZERO,r.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}m=null,v=null,M=null,A=null,E.set(0,0,0),w=0,_=D,L=me}return}ae=ae||he,de=de||W,He=He||$,(he!==f||ae!==x)&&(r.blendEquationSeparate(Je[he],Je[ae]),f=he,x=ae),(W!==m||$!==v||de!==M||He!==A)&&(r.blendFuncSeparate(Qe[W],Qe[$],Qe[de],Qe[He]),m=W,v=$,M=de,A=He),(pt.equals(E)===!1||Ve!==w)&&(r.blendColor(pt.r,pt.g,pt.b,Ve),E.copy(pt),w=Ve),_=D,L=!1}function Gt(D,he){D.side===Nt?xe(r.CULL_FACE):Se(r.CULL_FACE);let W=D.side===qt;he&&(W=!W),je(W),D.blending===Bi&&D.transparent===!1?I($n):I(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),s.setFunc(D.depthFunc),s.setTest(D.depthTest),s.setMask(D.depthWrite),i.setMask(D.colorWrite);const $=D.stencilWrite;o.setTest($),$&&(o.setMask(D.stencilWriteMask),o.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),o.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),ft(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?Se(r.SAMPLE_ALPHA_TO_COVERAGE):xe(r.SAMPLE_ALPHA_TO_COVERAGE)}function je(D){U!==D&&(D?r.frontFace(r.CW):r.frontFace(r.CCW),U=D)}function et(D){D!==Eh?(Se(r.CULL_FACE),D!==y&&(D===il?r.cullFace(r.BACK):D===Ah?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):xe(r.CULL_FACE),y=D}function Le(D){D!==S&&(Y&&r.lineWidth(D),S=D)}function ft(D,he,W){D?(Se(r.POLYGON_OFFSET_FILL),(B!==he||F!==W)&&(r.polygonOffset(he,W),B=he,F=W)):xe(r.POLYGON_OFFSET_FILL)}function Ue(D){D?Se(r.SCISSOR_TEST):xe(r.SCISSOR_TEST)}function R(D){D===void 0&&(D=r.TEXTURE0+z-1),X!==D&&(r.activeTexture(D),X=D)}function b(D,he,W){W===void 0&&(X===null?W=r.TEXTURE0+z-1:W=X);let $=le[W];$===void 0&&($={type:void 0,texture:void 0},le[W]=$),($.type!==D||$.texture!==he)&&(X!==W&&(r.activeTexture(W),X=W),r.bindTexture(D,he||ee[D]),$.type=D,$.texture=he)}function k(){const D=le[X];D!==void 0&&D.type!==void 0&&(r.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function Z(){try{r.compressedTexImage2D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Q(){try{r.compressedTexImage3D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function K(){try{r.texSubImage2D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function oe(){try{r.texSubImage3D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function se(){try{r.compressedTexSubImage2D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function pe(){try{r.compressedTexSubImage3D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function nt(){try{r.texStorage2D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function te(){try{r.texStorage3D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ve(){try{r.texImage2D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Ce(){try{r.texImage3D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Ie(D){Ye.equals(D)===!1&&(r.scissor(D.x,D.y,D.z,D.w),Ye.copy(D))}function ge(D){tt.equals(D)===!1&&(r.viewport(D.x,D.y,D.z,D.w),tt.copy(D))}function Ge(D,he){let W=l.get(he);W===void 0&&(W=new WeakMap,l.set(he,W));let $=W.get(D);$===void 0&&($=r.getUniformBlockIndex(he,D.name),W.set(D,$))}function Pe(D,he){const $=l.get(he).get(D);a.get(he)!==$&&(r.uniformBlockBinding(he,$,D.__bindingPointIndex),a.set(he,$))}function it(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),c={},X=null,le={},d={},h=new WeakMap,u=[],p=null,g=!1,_=null,f=null,m=null,v=null,x=null,M=null,A=null,E=new De(0,0,0),w=0,L=!1,U=null,y=null,S=null,B=null,F=null,Ye.set(0,0,r.canvas.width,r.canvas.height),tt.set(0,0,r.canvas.width,r.canvas.height),i.reset(),s.reset(),o.reset()}return{buffers:{color:i,depth:s,stencil:o},enable:Se,disable:xe,bindFramebuffer:Oe,drawBuffers:ye,useProgram:$e,setBlending:I,setMaterial:Gt,setFlipSided:je,setCullFace:et,setLineWidth:Le,setPolygonOffset:ft,setScissorTest:Ue,activeTexture:R,bindTexture:b,unbindTexture:k,compressedTexImage2D:Z,compressedTexImage3D:Q,texImage2D:ve,texImage3D:Ce,updateUBOMapping:Ge,uniformBlockBinding:Pe,texStorage2D:nt,texStorage3D:te,texSubImage2D:K,texSubImage3D:oe,compressedTexSubImage2D:se,compressedTexSubImage3D:pe,scissor:Ie,viewport:ge,reset:it}}function Ql(r,e,t,n){const i=L0(n);switch(t){case Hc:return r*e;case Wc:return r*e;case Xc:return r*e*2;case Pa:return r*e/i.components*i.byteLength;case La:return r*e/i.components*i.byteLength;case qc:return r*e*2/i.components*i.byteLength;case Ia:return r*e*2/i.components*i.byteLength;case Vc:return r*e*3/i.components*i.byteLength;case an:return r*e*4/i.components*i.byteLength;case Da:return r*e*4/i.components*i.byteLength;case dr:case ur:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case fr:case pr:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Ho:case Wo:return Math.max(r,16)*Math.max(e,8)/4;case Go:case Vo:return Math.max(r,8)*Math.max(e,8)/2;case Xo:case qo:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case Ko:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Yo:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case jo:return Math.floor((r+4)/5)*Math.floor((e+3)/4)*16;case Zo:return Math.floor((r+4)/5)*Math.floor((e+4)/5)*16;case $o:return Math.floor((r+5)/6)*Math.floor((e+4)/5)*16;case Jo:return Math.floor((r+5)/6)*Math.floor((e+5)/6)*16;case Qo:return Math.floor((r+7)/8)*Math.floor((e+4)/5)*16;case ea:return Math.floor((r+7)/8)*Math.floor((e+5)/6)*16;case ta:return Math.floor((r+7)/8)*Math.floor((e+7)/8)*16;case na:return Math.floor((r+9)/10)*Math.floor((e+4)/5)*16;case ia:return Math.floor((r+9)/10)*Math.floor((e+5)/6)*16;case sa:return Math.floor((r+9)/10)*Math.floor((e+7)/8)*16;case ra:return Math.floor((r+9)/10)*Math.floor((e+9)/10)*16;case oa:return Math.floor((r+11)/12)*Math.floor((e+9)/10)*16;case aa:return Math.floor((r+11)/12)*Math.floor((e+11)/12)*16;case mr:case la:case ca:return Math.ceil(r/4)*Math.ceil(e/4)*16;case Kc:case ha:return Math.ceil(r/4)*Math.ceil(e/4)*8;case da:case ua:return Math.ceil(r/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function L0(r){switch(r){case kn:case kc:return{byteLength:1,components:1};case bs:case zc:case Cs:return{byteLength:2,components:1};case Ra:case Ca:return{byteLength:2,components:4};case pi:case Aa:case mn:return{byteLength:4,components:1};case Gc:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${r}.`)}function I0(r,e,t,n,i,s,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new qe,d=new WeakMap;let h;const u=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(R,b){return p?new OffscreenCanvas(R,b):Es("canvas")}function _(R,b,k){let Z=1;const Q=Ue(R);if((Q.width>k||Q.height>k)&&(Z=k/Math.max(Q.width,Q.height)),Z<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){const K=Math.floor(Z*Q.width),oe=Math.floor(Z*Q.height);h===void 0&&(h=g(K,oe));const se=b?g(K,oe):h;return se.width=K,se.height=oe,se.getContext("2d").drawImage(R,0,0,K,oe),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Q.width+"x"+Q.height+") to ("+K+"x"+oe+")."),se}else return"data"in R&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Q.width+"x"+Q.height+")."),R;return R}function f(R){return R.generateMipmaps&&R.minFilter!==Xt&&R.minFilter!==en}function m(R){r.generateMipmap(R)}function v(R,b,k,Z,Q=!1){if(R!==null){if(r[R]!==void 0)return r[R];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let K=b;if(b===r.RED&&(k===r.FLOAT&&(K=r.R32F),k===r.HALF_FLOAT&&(K=r.R16F),k===r.UNSIGNED_BYTE&&(K=r.R8)),b===r.RED_INTEGER&&(k===r.UNSIGNED_BYTE&&(K=r.R8UI),k===r.UNSIGNED_SHORT&&(K=r.R16UI),k===r.UNSIGNED_INT&&(K=r.R32UI),k===r.BYTE&&(K=r.R8I),k===r.SHORT&&(K=r.R16I),k===r.INT&&(K=r.R32I)),b===r.RG&&(k===r.FLOAT&&(K=r.RG32F),k===r.HALF_FLOAT&&(K=r.RG16F),k===r.UNSIGNED_BYTE&&(K=r.RG8)),b===r.RG_INTEGER&&(k===r.UNSIGNED_BYTE&&(K=r.RG8UI),k===r.UNSIGNED_SHORT&&(K=r.RG16UI),k===r.UNSIGNED_INT&&(K=r.RG32UI),k===r.BYTE&&(K=r.RG8I),k===r.SHORT&&(K=r.RG16I),k===r.INT&&(K=r.RG32I)),b===r.RGB_INTEGER&&(k===r.UNSIGNED_BYTE&&(K=r.RGB8UI),k===r.UNSIGNED_SHORT&&(K=r.RGB16UI),k===r.UNSIGNED_INT&&(K=r.RGB32UI),k===r.BYTE&&(K=r.RGB8I),k===r.SHORT&&(K=r.RGB16I),k===r.INT&&(K=r.RGB32I)),b===r.RGBA_INTEGER&&(k===r.UNSIGNED_BYTE&&(K=r.RGBA8UI),k===r.UNSIGNED_SHORT&&(K=r.RGBA16UI),k===r.UNSIGNED_INT&&(K=r.RGBA32UI),k===r.BYTE&&(K=r.RGBA8I),k===r.SHORT&&(K=r.RGBA16I),k===r.INT&&(K=r.RGBA32I)),b===r.RGB&&k===r.UNSIGNED_INT_5_9_9_9_REV&&(K=r.RGB9_E5),b===r.RGBA){const oe=Q?Mr:st.getTransfer(Z);k===r.FLOAT&&(K=r.RGBA32F),k===r.HALF_FLOAT&&(K=r.RGBA16F),k===r.UNSIGNED_BYTE&&(K=oe===xt?r.SRGB8_ALPHA8:r.RGBA8),k===r.UNSIGNED_SHORT_4_4_4_4&&(K=r.RGBA4),k===r.UNSIGNED_SHORT_5_5_5_1&&(K=r.RGB5_A1)}return(K===r.R16F||K===r.R32F||K===r.RG16F||K===r.RG32F||K===r.RGBA16F||K===r.RGBA32F)&&e.get("EXT_color_buffer_float"),K}function x(R,b){let k;return R?b===null||b===pi||b===Xi?k=r.DEPTH24_STENCIL8:b===mn?k=r.DEPTH32F_STENCIL8:b===bs&&(k=r.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):b===null||b===pi||b===Xi?k=r.DEPTH_COMPONENT24:b===mn?k=r.DEPTH_COMPONENT32F:b===bs&&(k=r.DEPTH_COMPONENT16),k}function M(R,b){return f(R)===!0||R.isFramebufferTexture&&R.minFilter!==Xt&&R.minFilter!==en?Math.log2(Math.max(b.width,b.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?b.mipmaps.length:1}function A(R){const b=R.target;b.removeEventListener("dispose",A),w(b),b.isVideoTexture&&d.delete(b)}function E(R){const b=R.target;b.removeEventListener("dispose",E),U(b)}function w(R){const b=n.get(R);if(b.__webglInit===void 0)return;const k=R.source,Z=u.get(k);if(Z){const Q=Z[b.__cacheKey];Q.usedTimes--,Q.usedTimes===0&&L(R),Object.keys(Z).length===0&&u.delete(k)}n.remove(R)}function L(R){const b=n.get(R);r.deleteTexture(b.__webglTexture);const k=R.source,Z=u.get(k);delete Z[b.__cacheKey],o.memory.textures--}function U(R){const b=n.get(R);if(R.depthTexture&&R.depthTexture.dispose(),R.isWebGLCubeRenderTarget)for(let Z=0;Z<6;Z++){if(Array.isArray(b.__webglFramebuffer[Z]))for(let Q=0;Q<b.__webglFramebuffer[Z].length;Q++)r.deleteFramebuffer(b.__webglFramebuffer[Z][Q]);else r.deleteFramebuffer(b.__webglFramebuffer[Z]);b.__webglDepthbuffer&&r.deleteRenderbuffer(b.__webglDepthbuffer[Z])}else{if(Array.isArray(b.__webglFramebuffer))for(let Z=0;Z<b.__webglFramebuffer.length;Z++)r.deleteFramebuffer(b.__webglFramebuffer[Z]);else r.deleteFramebuffer(b.__webglFramebuffer);if(b.__webglDepthbuffer&&r.deleteRenderbuffer(b.__webglDepthbuffer),b.__webglMultisampledFramebuffer&&r.deleteFramebuffer(b.__webglMultisampledFramebuffer),b.__webglColorRenderbuffer)for(let Z=0;Z<b.__webglColorRenderbuffer.length;Z++)b.__webglColorRenderbuffer[Z]&&r.deleteRenderbuffer(b.__webglColorRenderbuffer[Z]);b.__webglDepthRenderbuffer&&r.deleteRenderbuffer(b.__webglDepthRenderbuffer)}const k=R.textures;for(let Z=0,Q=k.length;Z<Q;Z++){const K=n.get(k[Z]);K.__webglTexture&&(r.deleteTexture(K.__webglTexture),o.memory.textures--),n.remove(k[Z])}n.remove(R)}let y=0;function S(){y=0}function B(){const R=y;return R>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+i.maxTextures),y+=1,R}function F(R){const b=[];return b.push(R.wrapS),b.push(R.wrapT),b.push(R.wrapR||0),b.push(R.magFilter),b.push(R.minFilter),b.push(R.anisotropy),b.push(R.internalFormat),b.push(R.format),b.push(R.type),b.push(R.generateMipmaps),b.push(R.premultiplyAlpha),b.push(R.flipY),b.push(R.unpackAlignment),b.push(R.colorSpace),b.join()}function z(R,b){const k=n.get(R);if(R.isVideoTexture&&Le(R),R.isRenderTargetTexture===!1&&R.version>0&&k.__version!==R.version){const Z=R.image;if(Z===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Z.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{tt(k,R,b);return}}t.bindTexture(r.TEXTURE_2D,k.__webglTexture,r.TEXTURE0+b)}function Y(R,b){const k=n.get(R);if(R.version>0&&k.__version!==R.version){tt(k,R,b);return}t.bindTexture(r.TEXTURE_2D_ARRAY,k.__webglTexture,r.TEXTURE0+b)}function G(R,b){const k=n.get(R);if(R.version>0&&k.__version!==R.version){tt(k,R,b);return}t.bindTexture(r.TEXTURE_3D,k.__webglTexture,r.TEXTURE0+b)}function J(R,b){const k=n.get(R);if(R.version>0&&k.__version!==R.version){j(k,R,b);return}t.bindTexture(r.TEXTURE_CUBE_MAP,k.__webglTexture,r.TEXTURE0+b)}const X={[Fe]:r.REPEAT,[jn]:r.CLAMP_TO_EDGE,[vr]:r.MIRRORED_REPEAT},le={[Xt]:r.NEAREST,[Fc]:r.NEAREST_MIPMAP_NEAREST,[gs]:r.NEAREST_MIPMAP_LINEAR,[en]:r.LINEAR,[hr]:r.LINEAR_MIPMAP_NEAREST,[Bn]:r.LINEAR_MIPMAP_LINEAR},re={[od]:r.NEVER,[ud]:r.ALWAYS,[ad]:r.LESS,[Zc]:r.LEQUAL,[ld]:r.EQUAL,[dd]:r.GEQUAL,[cd]:r.GREATER,[hd]:r.NOTEQUAL};function ue(R,b){if(b.type===mn&&e.has("OES_texture_float_linear")===!1&&(b.magFilter===en||b.magFilter===hr||b.magFilter===gs||b.magFilter===Bn||b.minFilter===en||b.minFilter===hr||b.minFilter===gs||b.minFilter===Bn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(R,r.TEXTURE_WRAP_S,X[b.wrapS]),r.texParameteri(R,r.TEXTURE_WRAP_T,X[b.wrapT]),(R===r.TEXTURE_3D||R===r.TEXTURE_2D_ARRAY)&&r.texParameteri(R,r.TEXTURE_WRAP_R,X[b.wrapR]),r.texParameteri(R,r.TEXTURE_MAG_FILTER,le[b.magFilter]),r.texParameteri(R,r.TEXTURE_MIN_FILTER,le[b.minFilter]),b.compareFunction&&(r.texParameteri(R,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(R,r.TEXTURE_COMPARE_FUNC,re[b.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(b.magFilter===Xt||b.minFilter!==gs&&b.minFilter!==Bn||b.type===mn&&e.has("OES_texture_float_linear")===!1)return;if(b.anisotropy>1||n.get(b).__currentAnisotropy){const k=e.get("EXT_texture_filter_anisotropic");r.texParameterf(R,k.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,i.getMaxAnisotropy())),n.get(b).__currentAnisotropy=b.anisotropy}}}function Ye(R,b){let k=!1;R.__webglInit===void 0&&(R.__webglInit=!0,b.addEventListener("dispose",A));const Z=b.source;let Q=u.get(Z);Q===void 0&&(Q={},u.set(Z,Q));const K=F(b);if(K!==R.__cacheKey){Q[K]===void 0&&(Q[K]={texture:r.createTexture(),usedTimes:0},o.memory.textures++,k=!0),Q[K].usedTimes++;const oe=Q[R.__cacheKey];oe!==void 0&&(Q[R.__cacheKey].usedTimes--,oe.usedTimes===0&&L(b)),R.__cacheKey=K,R.__webglTexture=Q[K].texture}return k}function tt(R,b,k){let Z=r.TEXTURE_2D;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&(Z=r.TEXTURE_2D_ARRAY),b.isData3DTexture&&(Z=r.TEXTURE_3D);const Q=Ye(R,b),K=b.source;t.bindTexture(Z,R.__webglTexture,r.TEXTURE0+k);const oe=n.get(K);if(K.version!==oe.__version||Q===!0){t.activeTexture(r.TEXTURE0+k);const se=st.getPrimaries(st.workingColorSpace),pe=b.colorSpace===Yn?null:st.getPrimaries(b.colorSpace),nt=b.colorSpace===Yn||se===pe?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,b.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,b.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,nt);let te=_(b.image,!1,i.maxTextureSize);te=ft(b,te);const ve=s.convert(b.format,b.colorSpace),Ce=s.convert(b.type);let Ie=v(b.internalFormat,ve,Ce,b.colorSpace,b.isVideoTexture);ue(Z,b);let ge;const Ge=b.mipmaps,Pe=b.isVideoTexture!==!0,it=oe.__version===void 0||Q===!0,D=K.dataReady,he=M(b,te);if(b.isDepthTexture)Ie=x(b.format===qi,b.type),it&&(Pe?t.texStorage2D(r.TEXTURE_2D,1,Ie,te.width,te.height):t.texImage2D(r.TEXTURE_2D,0,Ie,te.width,te.height,0,ve,Ce,null));else if(b.isDataTexture)if(Ge.length>0){Pe&&it&&t.texStorage2D(r.TEXTURE_2D,he,Ie,Ge[0].width,Ge[0].height);for(let W=0,$=Ge.length;W<$;W++)ge=Ge[W],Pe?D&&t.texSubImage2D(r.TEXTURE_2D,W,0,0,ge.width,ge.height,ve,Ce,ge.data):t.texImage2D(r.TEXTURE_2D,W,Ie,ge.width,ge.height,0,ve,Ce,ge.data);b.generateMipmaps=!1}else Pe?(it&&t.texStorage2D(r.TEXTURE_2D,he,Ie,te.width,te.height),D&&t.texSubImage2D(r.TEXTURE_2D,0,0,0,te.width,te.height,ve,Ce,te.data)):t.texImage2D(r.TEXTURE_2D,0,Ie,te.width,te.height,0,ve,Ce,te.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){Pe&&it&&t.texStorage3D(r.TEXTURE_2D_ARRAY,he,Ie,Ge[0].width,Ge[0].height,te.depth);for(let W=0,$=Ge.length;W<$;W++)if(ge=Ge[W],b.format!==an)if(ve!==null)if(Pe){if(D)if(b.layerUpdates.size>0){const ae=Ql(ge.width,ge.height,b.format,b.type);for(const de of b.layerUpdates){const He=ge.data.subarray(de*ae/ge.data.BYTES_PER_ELEMENT,(de+1)*ae/ge.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,W,0,0,de,ge.width,ge.height,1,ve,He,0,0)}b.clearLayerUpdates()}else t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,W,0,0,0,ge.width,ge.height,te.depth,ve,ge.data,0,0)}else t.compressedTexImage3D(r.TEXTURE_2D_ARRAY,W,Ie,ge.width,ge.height,te.depth,0,ge.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Pe?D&&t.texSubImage3D(r.TEXTURE_2D_ARRAY,W,0,0,0,ge.width,ge.height,te.depth,ve,Ce,ge.data):t.texImage3D(r.TEXTURE_2D_ARRAY,W,Ie,ge.width,ge.height,te.depth,0,ve,Ce,ge.data)}else{Pe&&it&&t.texStorage2D(r.TEXTURE_2D,he,Ie,Ge[0].width,Ge[0].height);for(let W=0,$=Ge.length;W<$;W++)ge=Ge[W],b.format!==an?ve!==null?Pe?D&&t.compressedTexSubImage2D(r.TEXTURE_2D,W,0,0,ge.width,ge.height,ve,ge.data):t.compressedTexImage2D(r.TEXTURE_2D,W,Ie,ge.width,ge.height,0,ge.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Pe?D&&t.texSubImage2D(r.TEXTURE_2D,W,0,0,ge.width,ge.height,ve,Ce,ge.data):t.texImage2D(r.TEXTURE_2D,W,Ie,ge.width,ge.height,0,ve,Ce,ge.data)}else if(b.isDataArrayTexture)if(Pe){if(it&&t.texStorage3D(r.TEXTURE_2D_ARRAY,he,Ie,te.width,te.height,te.depth),D)if(b.layerUpdates.size>0){const W=Ql(te.width,te.height,b.format,b.type);for(const $ of b.layerUpdates){const ae=te.data.subarray($*W/te.data.BYTES_PER_ELEMENT,($+1)*W/te.data.BYTES_PER_ELEMENT);t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,$,te.width,te.height,1,ve,Ce,ae)}b.clearLayerUpdates()}else t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,te.width,te.height,te.depth,ve,Ce,te.data)}else t.texImage3D(r.TEXTURE_2D_ARRAY,0,Ie,te.width,te.height,te.depth,0,ve,Ce,te.data);else if(b.isData3DTexture)Pe?(it&&t.texStorage3D(r.TEXTURE_3D,he,Ie,te.width,te.height,te.depth),D&&t.texSubImage3D(r.TEXTURE_3D,0,0,0,0,te.width,te.height,te.depth,ve,Ce,te.data)):t.texImage3D(r.TEXTURE_3D,0,Ie,te.width,te.height,te.depth,0,ve,Ce,te.data);else if(b.isFramebufferTexture){if(it)if(Pe)t.texStorage2D(r.TEXTURE_2D,he,Ie,te.width,te.height);else{let W=te.width,$=te.height;for(let ae=0;ae<he;ae++)t.texImage2D(r.TEXTURE_2D,ae,Ie,W,$,0,ve,Ce,null),W>>=1,$>>=1}}else if(Ge.length>0){if(Pe&&it){const W=Ue(Ge[0]);t.texStorage2D(r.TEXTURE_2D,he,Ie,W.width,W.height)}for(let W=0,$=Ge.length;W<$;W++)ge=Ge[W],Pe?D&&t.texSubImage2D(r.TEXTURE_2D,W,0,0,ve,Ce,ge):t.texImage2D(r.TEXTURE_2D,W,Ie,ve,Ce,ge);b.generateMipmaps=!1}else if(Pe){if(it){const W=Ue(te);t.texStorage2D(r.TEXTURE_2D,he,Ie,W.width,W.height)}D&&t.texSubImage2D(r.TEXTURE_2D,0,0,0,ve,Ce,te)}else t.texImage2D(r.TEXTURE_2D,0,Ie,ve,Ce,te);f(b)&&m(Z),oe.__version=K.version,b.onUpdate&&b.onUpdate(b)}R.__version=b.version}function j(R,b,k){if(b.image.length!==6)return;const Z=Ye(R,b),Q=b.source;t.bindTexture(r.TEXTURE_CUBE_MAP,R.__webglTexture,r.TEXTURE0+k);const K=n.get(Q);if(Q.version!==K.__version||Z===!0){t.activeTexture(r.TEXTURE0+k);const oe=st.getPrimaries(st.workingColorSpace),se=b.colorSpace===Yn?null:st.getPrimaries(b.colorSpace),pe=b.colorSpace===Yn||oe===se?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,b.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,b.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,pe);const nt=b.isCompressedTexture||b.image[0].isCompressedTexture,te=b.image[0]&&b.image[0].isDataTexture,ve=[];for(let $=0;$<6;$++)!nt&&!te?ve[$]=_(b.image[$],!0,i.maxCubemapSize):ve[$]=te?b.image[$].image:b.image[$],ve[$]=ft(b,ve[$]);const Ce=ve[0],Ie=s.convert(b.format,b.colorSpace),ge=s.convert(b.type),Ge=v(b.internalFormat,Ie,ge,b.colorSpace),Pe=b.isVideoTexture!==!0,it=K.__version===void 0||Z===!0,D=Q.dataReady;let he=M(b,Ce);ue(r.TEXTURE_CUBE_MAP,b);let W;if(nt){Pe&&it&&t.texStorage2D(r.TEXTURE_CUBE_MAP,he,Ge,Ce.width,Ce.height);for(let $=0;$<6;$++){W=ve[$].mipmaps;for(let ae=0;ae<W.length;ae++){const de=W[ae];b.format!==an?Ie!==null?Pe?D&&t.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+$,ae,0,0,de.width,de.height,Ie,de.data):t.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+$,ae,Ge,de.width,de.height,0,de.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Pe?D&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+$,ae,0,0,de.width,de.height,Ie,ge,de.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+$,ae,Ge,de.width,de.height,0,Ie,ge,de.data)}}}else{if(W=b.mipmaps,Pe&&it){W.length>0&&he++;const $=Ue(ve[0]);t.texStorage2D(r.TEXTURE_CUBE_MAP,he,Ge,$.width,$.height)}for(let $=0;$<6;$++)if(te){Pe?D&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,0,0,ve[$].width,ve[$].height,Ie,ge,ve[$].data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,Ge,ve[$].width,ve[$].height,0,Ie,ge,ve[$].data);for(let ae=0;ae<W.length;ae++){const He=W[ae].image[$].image;Pe?D&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+$,ae+1,0,0,He.width,He.height,Ie,ge,He.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+$,ae+1,Ge,He.width,He.height,0,Ie,ge,He.data)}}else{Pe?D&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,0,0,Ie,ge,ve[$]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,Ge,Ie,ge,ve[$]);for(let ae=0;ae<W.length;ae++){const de=W[ae];Pe?D&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+$,ae+1,0,0,Ie,ge,de.image[$]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+$,ae+1,Ge,Ie,ge,de.image[$])}}}f(b)&&m(r.TEXTURE_CUBE_MAP),K.__version=Q.version,b.onUpdate&&b.onUpdate(b)}R.__version=b.version}function ee(R,b,k,Z,Q,K){const oe=s.convert(k.format,k.colorSpace),se=s.convert(k.type),pe=v(k.internalFormat,oe,se,k.colorSpace);if(!n.get(b).__hasExternalTextures){const te=Math.max(1,b.width>>K),ve=Math.max(1,b.height>>K);Q===r.TEXTURE_3D||Q===r.TEXTURE_2D_ARRAY?t.texImage3D(Q,K,pe,te,ve,b.depth,0,oe,se,null):t.texImage2D(Q,K,pe,te,ve,0,oe,se,null)}t.bindFramebuffer(r.FRAMEBUFFER,R),et(b)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,Z,Q,n.get(k).__webglTexture,0,je(b)):(Q===r.TEXTURE_2D||Q>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&Q<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,Z,Q,n.get(k).__webglTexture,K),t.bindFramebuffer(r.FRAMEBUFFER,null)}function Se(R,b,k){if(r.bindRenderbuffer(r.RENDERBUFFER,R),b.depthBuffer){const Z=b.depthTexture,Q=Z&&Z.isDepthTexture?Z.type:null,K=x(b.stencilBuffer,Q),oe=b.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,se=je(b);et(b)?a.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,se,K,b.width,b.height):k?r.renderbufferStorageMultisample(r.RENDERBUFFER,se,K,b.width,b.height):r.renderbufferStorage(r.RENDERBUFFER,K,b.width,b.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,oe,r.RENDERBUFFER,R)}else{const Z=b.textures;for(let Q=0;Q<Z.length;Q++){const K=Z[Q],oe=s.convert(K.format,K.colorSpace),se=s.convert(K.type),pe=v(K.internalFormat,oe,se,K.colorSpace),nt=je(b);k&&et(b)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,nt,pe,b.width,b.height):et(b)?a.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,nt,pe,b.width,b.height):r.renderbufferStorage(r.RENDERBUFFER,pe,b.width,b.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function xe(R,b){if(b&&b.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(r.FRAMEBUFFER,R),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(b.depthTexture).__webglTexture||b.depthTexture.image.width!==b.width||b.depthTexture.image.height!==b.height)&&(b.depthTexture.image.width=b.width,b.depthTexture.image.height=b.height,b.depthTexture.needsUpdate=!0),z(b.depthTexture,0);const Z=n.get(b.depthTexture).__webglTexture,Q=je(b);if(b.depthTexture.format===Oi)et(b)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,Z,0,Q):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,Z,0);else if(b.depthTexture.format===qi)et(b)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,Z,0,Q):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,Z,0);else throw new Error("Unknown depthTexture format")}function Oe(R){const b=n.get(R),k=R.isWebGLCubeRenderTarget===!0;if(b.__boundDepthTexture!==R.depthTexture){const Z=R.depthTexture;if(b.__depthDisposeCallback&&b.__depthDisposeCallback(),Z){const Q=()=>{delete b.__boundDepthTexture,delete b.__depthDisposeCallback,Z.removeEventListener("dispose",Q)};Z.addEventListener("dispose",Q),b.__depthDisposeCallback=Q}b.__boundDepthTexture=Z}if(R.depthTexture&&!b.__autoAllocateDepthBuffer){if(k)throw new Error("target.depthTexture not supported in Cube render targets");xe(b.__webglFramebuffer,R)}else if(k){b.__webglDepthbuffer=[];for(let Z=0;Z<6;Z++)if(t.bindFramebuffer(r.FRAMEBUFFER,b.__webglFramebuffer[Z]),b.__webglDepthbuffer[Z]===void 0)b.__webglDepthbuffer[Z]=r.createRenderbuffer(),Se(b.__webglDepthbuffer[Z],R,!1);else{const Q=R.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,K=b.__webglDepthbuffer[Z];r.bindRenderbuffer(r.RENDERBUFFER,K),r.framebufferRenderbuffer(r.FRAMEBUFFER,Q,r.RENDERBUFFER,K)}}else if(t.bindFramebuffer(r.FRAMEBUFFER,b.__webglFramebuffer),b.__webglDepthbuffer===void 0)b.__webglDepthbuffer=r.createRenderbuffer(),Se(b.__webglDepthbuffer,R,!1);else{const Z=R.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Q=b.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,Q),r.framebufferRenderbuffer(r.FRAMEBUFFER,Z,r.RENDERBUFFER,Q)}t.bindFramebuffer(r.FRAMEBUFFER,null)}function ye(R,b,k){const Z=n.get(R);b!==void 0&&ee(Z.__webglFramebuffer,R,R.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),k!==void 0&&Oe(R)}function $e(R){const b=R.texture,k=n.get(R),Z=n.get(b);R.addEventListener("dispose",E);const Q=R.textures,K=R.isWebGLCubeRenderTarget===!0,oe=Q.length>1;if(oe||(Z.__webglTexture===void 0&&(Z.__webglTexture=r.createTexture()),Z.__version=b.version,o.memory.textures++),K){k.__webglFramebuffer=[];for(let se=0;se<6;se++)if(b.mipmaps&&b.mipmaps.length>0){k.__webglFramebuffer[se]=[];for(let pe=0;pe<b.mipmaps.length;pe++)k.__webglFramebuffer[se][pe]=r.createFramebuffer()}else k.__webglFramebuffer[se]=r.createFramebuffer()}else{if(b.mipmaps&&b.mipmaps.length>0){k.__webglFramebuffer=[];for(let se=0;se<b.mipmaps.length;se++)k.__webglFramebuffer[se]=r.createFramebuffer()}else k.__webglFramebuffer=r.createFramebuffer();if(oe)for(let se=0,pe=Q.length;se<pe;se++){const nt=n.get(Q[se]);nt.__webglTexture===void 0&&(nt.__webglTexture=r.createTexture(),o.memory.textures++)}if(R.samples>0&&et(R)===!1){k.__webglMultisampledFramebuffer=r.createFramebuffer(),k.__webglColorRenderbuffer=[],t.bindFramebuffer(r.FRAMEBUFFER,k.__webglMultisampledFramebuffer);for(let se=0;se<Q.length;se++){const pe=Q[se];k.__webglColorRenderbuffer[se]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,k.__webglColorRenderbuffer[se]);const nt=s.convert(pe.format,pe.colorSpace),te=s.convert(pe.type),ve=v(pe.internalFormat,nt,te,pe.colorSpace,R.isXRRenderTarget===!0),Ce=je(R);r.renderbufferStorageMultisample(r.RENDERBUFFER,Ce,ve,R.width,R.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+se,r.RENDERBUFFER,k.__webglColorRenderbuffer[se])}r.bindRenderbuffer(r.RENDERBUFFER,null),R.depthBuffer&&(k.__webglDepthRenderbuffer=r.createRenderbuffer(),Se(k.__webglDepthRenderbuffer,R,!0)),t.bindFramebuffer(r.FRAMEBUFFER,null)}}if(K){t.bindTexture(r.TEXTURE_CUBE_MAP,Z.__webglTexture),ue(r.TEXTURE_CUBE_MAP,b);for(let se=0;se<6;se++)if(b.mipmaps&&b.mipmaps.length>0)for(let pe=0;pe<b.mipmaps.length;pe++)ee(k.__webglFramebuffer[se][pe],R,b,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+se,pe);else ee(k.__webglFramebuffer[se],R,b,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+se,0);f(b)&&m(r.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(oe){for(let se=0,pe=Q.length;se<pe;se++){const nt=Q[se],te=n.get(nt);t.bindTexture(r.TEXTURE_2D,te.__webglTexture),ue(r.TEXTURE_2D,nt),ee(k.__webglFramebuffer,R,nt,r.COLOR_ATTACHMENT0+se,r.TEXTURE_2D,0),f(nt)&&m(r.TEXTURE_2D)}t.unbindTexture()}else{let se=r.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(se=R.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(se,Z.__webglTexture),ue(se,b),b.mipmaps&&b.mipmaps.length>0)for(let pe=0;pe<b.mipmaps.length;pe++)ee(k.__webglFramebuffer[pe],R,b,r.COLOR_ATTACHMENT0,se,pe);else ee(k.__webglFramebuffer,R,b,r.COLOR_ATTACHMENT0,se,0);f(b)&&m(se),t.unbindTexture()}R.depthBuffer&&Oe(R)}function Je(R){const b=R.textures;for(let k=0,Z=b.length;k<Z;k++){const Q=b[k];if(f(Q)){const K=R.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:r.TEXTURE_2D,oe=n.get(Q).__webglTexture;t.bindTexture(K,oe),m(K),t.unbindTexture()}}}const Qe=[],I=[];function Gt(R){if(R.samples>0){if(et(R)===!1){const b=R.textures,k=R.width,Z=R.height;let Q=r.COLOR_BUFFER_BIT;const K=R.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,oe=n.get(R),se=b.length>1;if(se)for(let pe=0;pe<b.length;pe++)t.bindFramebuffer(r.FRAMEBUFFER,oe.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+pe,r.RENDERBUFFER,null),t.bindFramebuffer(r.FRAMEBUFFER,oe.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+pe,r.TEXTURE_2D,null,0);t.bindFramebuffer(r.READ_FRAMEBUFFER,oe.__webglMultisampledFramebuffer),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,oe.__webglFramebuffer);for(let pe=0;pe<b.length;pe++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(Q|=r.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(Q|=r.STENCIL_BUFFER_BIT)),se){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,oe.__webglColorRenderbuffer[pe]);const nt=n.get(b[pe]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,nt,0)}r.blitFramebuffer(0,0,k,Z,0,0,k,Z,Q,r.NEAREST),l===!0&&(Qe.length=0,I.length=0,Qe.push(r.COLOR_ATTACHMENT0+pe),R.depthBuffer&&R.resolveDepthBuffer===!1&&(Qe.push(K),I.push(K),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,I)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,Qe))}if(t.bindFramebuffer(r.READ_FRAMEBUFFER,null),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),se)for(let pe=0;pe<b.length;pe++){t.bindFramebuffer(r.FRAMEBUFFER,oe.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+pe,r.RENDERBUFFER,oe.__webglColorRenderbuffer[pe]);const nt=n.get(b[pe]).__webglTexture;t.bindFramebuffer(r.FRAMEBUFFER,oe.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+pe,r.TEXTURE_2D,nt,0)}t.bindFramebuffer(r.DRAW_FRAMEBUFFER,oe.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.resolveDepthBuffer===!1&&l){const b=R.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[b])}}}function je(R){return Math.min(i.maxSamples,R.samples)}function et(R){const b=n.get(R);return R.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function Le(R){const b=o.render.frame;d.get(R)!==b&&(d.set(R,b),R.update())}function ft(R,b){const k=R.colorSpace,Z=R.format,Q=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||k!==Ut&&k!==Yn&&(st.getTransfer(k)===xt?(Z!==an||Q!==kn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",k)),b}function Ue(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(c.width=R.naturalWidth||R.width,c.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(c.width=R.displayWidth,c.height=R.displayHeight):(c.width=R.width,c.height=R.height),c}this.allocateTextureUnit=B,this.resetTextureUnits=S,this.setTexture2D=z,this.setTexture2DArray=Y,this.setTexture3D=G,this.setTextureCube=J,this.rebindTextures=ye,this.setupRenderTarget=$e,this.updateRenderTargetMipmap=Je,this.updateMultisampleRenderTarget=Gt,this.setupDepthRenderbuffer=Oe,this.setupFrameBufferTexture=ee,this.useMultisampledRTT=et}function D0(r,e){function t(n,i=Yn){let s;const o=st.getTransfer(i);if(n===kn)return r.UNSIGNED_BYTE;if(n===Ra)return r.UNSIGNED_SHORT_4_4_4_4;if(n===Ca)return r.UNSIGNED_SHORT_5_5_5_1;if(n===Gc)return r.UNSIGNED_INT_5_9_9_9_REV;if(n===kc)return r.BYTE;if(n===zc)return r.SHORT;if(n===bs)return r.UNSIGNED_SHORT;if(n===Aa)return r.INT;if(n===pi)return r.UNSIGNED_INT;if(n===mn)return r.FLOAT;if(n===Cs)return r.HALF_FLOAT;if(n===Hc)return r.ALPHA;if(n===Vc)return r.RGB;if(n===an)return r.RGBA;if(n===Wc)return r.LUMINANCE;if(n===Xc)return r.LUMINANCE_ALPHA;if(n===Oi)return r.DEPTH_COMPONENT;if(n===qi)return r.DEPTH_STENCIL;if(n===Pa)return r.RED;if(n===La)return r.RED_INTEGER;if(n===qc)return r.RG;if(n===Ia)return r.RG_INTEGER;if(n===Da)return r.RGBA_INTEGER;if(n===dr||n===ur||n===fr||n===pr)if(o===xt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===dr)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===ur)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===fr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===pr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===dr)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===ur)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===fr)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===pr)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Go||n===Ho||n===Vo||n===Wo)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===Go)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Ho)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Vo)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Wo)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Xo||n===qo||n===Ko)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===Xo||n===qo)return o===xt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===Ko)return o===xt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Yo||n===jo||n===Zo||n===$o||n===Jo||n===Qo||n===ea||n===ta||n===na||n===ia||n===sa||n===ra||n===oa||n===aa)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===Yo)return o===xt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===jo)return o===xt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Zo)return o===xt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===$o)return o===xt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Jo)return o===xt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Qo)return o===xt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===ea)return o===xt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===ta)return o===xt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===na)return o===xt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===ia)return o===xt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===sa)return o===xt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===ra)return o===xt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===oa)return o===xt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===aa)return o===xt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===mr||n===la||n===ca)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===mr)return o===xt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===la)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===ca)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Kc||n===ha||n===da||n===ua)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===mr)return s.COMPRESSED_RED_RGTC1_EXT;if(n===ha)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===da)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===ua)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Xi?r.UNSIGNED_INT_24_8:r[n]!==void 0?r[n]:null}return{convert:t}}class N0 extends zt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class ke extends yt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const U0={type:"move"};class fo{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ke,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ke,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new C,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new C),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ke,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new C,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new C),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,s=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const _ of e.hand.values()){const f=t.getJointPose(_,n),m=this._getHandJoint(c,_);f!==null&&(m.matrix.fromArray(f.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=f.radius),m.visible=f!==null}const d=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],u=d.position.distanceTo(h.position),p=.02,g=.005;c.inputState.pinching&&u>p+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&u<=p-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(U0)))}return a!==null&&(a.visible=i!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new ke;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const B0=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,O0=`
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

}`;class F0{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){const i=new Et,s=e.properties.get(i);s.__webglTexture=t.texture,(t.depthNear!=n.depthNear||t.depthFar!=n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Qn({vertexShader:B0,fragmentShader:O0,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new P(new ln(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class k0 extends gi{constructor(e,t){super();const n=this;let i=null,s=1,o=null,a="local-floor",l=1,c=null,d=null,h=null,u=null,p=null,g=null;const _=new F0,f=t.getContextAttributes();let m=null,v=null;const x=[],M=[],A=new qe;let E=null;const w=new zt;w.layers.enable(1),w.viewport=new rt;const L=new zt;L.layers.enable(2),L.viewport=new rt;const U=[w,L],y=new N0;y.layers.enable(1),y.layers.enable(2);let S=null,B=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(j){let ee=x[j];return ee===void 0&&(ee=new fo,x[j]=ee),ee.getTargetRaySpace()},this.getControllerGrip=function(j){let ee=x[j];return ee===void 0&&(ee=new fo,x[j]=ee),ee.getGripSpace()},this.getHand=function(j){let ee=x[j];return ee===void 0&&(ee=new fo,x[j]=ee),ee.getHandSpace()};function F(j){const ee=M.indexOf(j.inputSource);if(ee===-1)return;const Se=x[ee];Se!==void 0&&(Se.update(j.inputSource,j.frame,c||o),Se.dispatchEvent({type:j.type,data:j.inputSource}))}function z(){i.removeEventListener("select",F),i.removeEventListener("selectstart",F),i.removeEventListener("selectend",F),i.removeEventListener("squeeze",F),i.removeEventListener("squeezestart",F),i.removeEventListener("squeezeend",F),i.removeEventListener("end",z),i.removeEventListener("inputsourceschange",Y);for(let j=0;j<x.length;j++){const ee=M[j];ee!==null&&(M[j]=null,x[j].disconnect(ee))}S=null,B=null,_.reset(),e.setRenderTarget(m),p=null,u=null,h=null,i=null,v=null,tt.stop(),n.isPresenting=!1,e.setPixelRatio(E),e.setSize(A.width,A.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(j){s=j,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(j){a=j,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(j){c=j},this.getBaseLayer=function(){return u!==null?u:p},this.getBinding=function(){return h},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(j){if(i=j,i!==null){if(m=e.getRenderTarget(),i.addEventListener("select",F),i.addEventListener("selectstart",F),i.addEventListener("selectend",F),i.addEventListener("squeeze",F),i.addEventListener("squeezestart",F),i.addEventListener("squeezeend",F),i.addEventListener("end",z),i.addEventListener("inputsourceschange",Y),f.xrCompatible!==!0&&await t.makeXRCompatible(),E=e.getPixelRatio(),e.getSize(A),i.renderState.layers===void 0){const ee={antialias:f.antialias,alpha:!0,depth:f.depth,stencil:f.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(i,t,ee),i.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),v=new mi(p.framebufferWidth,p.framebufferHeight,{format:an,type:kn,colorSpace:e.outputColorSpace,stencilBuffer:f.stencil})}else{let ee=null,Se=null,xe=null;f.depth&&(xe=f.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ee=f.stencil?qi:Oi,Se=f.stencil?Xi:pi);const Oe={colorFormat:t.RGBA8,depthFormat:xe,scaleFactor:s};h=new XRWebGLBinding(i,t),u=h.createProjectionLayer(Oe),i.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),v=new mi(u.textureWidth,u.textureHeight,{format:an,type:kn,depthTexture:new ah(u.textureWidth,u.textureHeight,Se,void 0,void 0,void 0,void 0,void 0,void 0,ee),stencilBuffer:f.stencil,colorSpace:e.outputColorSpace,samples:f.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await i.requestReferenceSpace(a),tt.setContext(i),tt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function Y(j){for(let ee=0;ee<j.removed.length;ee++){const Se=j.removed[ee],xe=M.indexOf(Se);xe>=0&&(M[xe]=null,x[xe].disconnect(Se))}for(let ee=0;ee<j.added.length;ee++){const Se=j.added[ee];let xe=M.indexOf(Se);if(xe===-1){for(let ye=0;ye<x.length;ye++)if(ye>=M.length){M.push(Se),xe=ye;break}else if(M[ye]===null){M[ye]=Se,xe=ye;break}if(xe===-1)break}const Oe=x[xe];Oe&&Oe.connect(Se)}}const G=new C,J=new C;function X(j,ee,Se){G.setFromMatrixPosition(ee.matrixWorld),J.setFromMatrixPosition(Se.matrixWorld);const xe=G.distanceTo(J),Oe=ee.projectionMatrix.elements,ye=Se.projectionMatrix.elements,$e=Oe[14]/(Oe[10]-1),Je=Oe[14]/(Oe[10]+1),Qe=(Oe[9]+1)/Oe[5],I=(Oe[9]-1)/Oe[5],Gt=(Oe[8]-1)/Oe[0],je=(ye[8]+1)/ye[0],et=$e*Gt,Le=$e*je,ft=xe/(-Gt+je),Ue=ft*-Gt;if(ee.matrixWorld.decompose(j.position,j.quaternion,j.scale),j.translateX(Ue),j.translateZ(ft),j.matrixWorld.compose(j.position,j.quaternion,j.scale),j.matrixWorldInverse.copy(j.matrixWorld).invert(),Oe[10]===-1)j.projectionMatrix.copy(ee.projectionMatrix),j.projectionMatrixInverse.copy(ee.projectionMatrixInverse);else{const R=$e+ft,b=Je+ft,k=et-Ue,Z=Le+(xe-Ue),Q=Qe*Je/b*R,K=I*Je/b*R;j.projectionMatrix.makePerspective(k,Z,Q,K,R,b),j.projectionMatrixInverse.copy(j.projectionMatrix).invert()}}function le(j,ee){ee===null?j.matrixWorld.copy(j.matrix):j.matrixWorld.multiplyMatrices(ee.matrixWorld,j.matrix),j.matrixWorldInverse.copy(j.matrixWorld).invert()}this.updateCamera=function(j){if(i===null)return;let ee=j.near,Se=j.far;_.texture!==null&&(_.depthNear>0&&(ee=_.depthNear),_.depthFar>0&&(Se=_.depthFar)),y.near=L.near=w.near=ee,y.far=L.far=w.far=Se,(S!==y.near||B!==y.far)&&(i.updateRenderState({depthNear:y.near,depthFar:y.far}),S=y.near,B=y.far);const xe=j.parent,Oe=y.cameras;le(y,xe);for(let ye=0;ye<Oe.length;ye++)le(Oe[ye],xe);Oe.length===2?X(y,w,L):y.projectionMatrix.copy(w.projectionMatrix),re(j,y,xe)};function re(j,ee,Se){Se===null?j.matrix.copy(ee.matrixWorld):(j.matrix.copy(Se.matrixWorld),j.matrix.invert(),j.matrix.multiply(ee.matrixWorld)),j.matrix.decompose(j.position,j.quaternion,j.scale),j.updateMatrixWorld(!0),j.projectionMatrix.copy(ee.projectionMatrix),j.projectionMatrixInverse.copy(ee.projectionMatrixInverse),j.isPerspectiveCamera&&(j.fov=Ki*2*Math.atan(1/j.projectionMatrix.elements[5]),j.zoom=1)}this.getCamera=function(){return y},this.getFoveation=function(){if(!(u===null&&p===null))return l},this.setFoveation=function(j){l=j,u!==null&&(u.fixedFoveation=j),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=j)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(y)};let ue=null;function Ye(j,ee){if(d=ee.getViewerPose(c||o),g=ee,d!==null){const Se=d.views;p!==null&&(e.setRenderTargetFramebuffer(v,p.framebuffer),e.setRenderTarget(v));let xe=!1;Se.length!==y.cameras.length&&(y.cameras.length=0,xe=!0);for(let ye=0;ye<Se.length;ye++){const $e=Se[ye];let Je=null;if(p!==null)Je=p.getViewport($e);else{const I=h.getViewSubImage(u,$e);Je=I.viewport,ye===0&&(e.setRenderTargetTextures(v,I.colorTexture,u.ignoreDepthValues?void 0:I.depthStencilTexture),e.setRenderTarget(v))}let Qe=U[ye];Qe===void 0&&(Qe=new zt,Qe.layers.enable(ye),Qe.viewport=new rt,U[ye]=Qe),Qe.matrix.fromArray($e.transform.matrix),Qe.matrix.decompose(Qe.position,Qe.quaternion,Qe.scale),Qe.projectionMatrix.fromArray($e.projectionMatrix),Qe.projectionMatrixInverse.copy(Qe.projectionMatrix).invert(),Qe.viewport.set(Je.x,Je.y,Je.width,Je.height),ye===0&&(y.matrix.copy(Qe.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale)),xe===!0&&y.cameras.push(Qe)}const Oe=i.enabledFeatures;if(Oe&&Oe.includes("depth-sensing")){const ye=h.getDepthInformation(Se[0]);ye&&ye.isValid&&ye.texture&&_.init(e,ye,i.renderState)}}for(let Se=0;Se<x.length;Se++){const xe=M[Se],Oe=x[Se];xe!==null&&Oe!==void 0&&Oe.update(xe,ee,c||o)}ue&&ue(j,ee),ee.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ee}),g=null}const tt=new oh;tt.setAnimationLoop(Ye),this.setAnimationLoop=function(j){ue=j},this.dispose=function(){}}}const ai=new wt,z0=new ze;function G0(r,e){function t(f,m){f.matrixAutoUpdate===!0&&f.updateMatrix(),m.value.copy(f.matrix)}function n(f,m){m.color.getRGB(f.fogColor.value,ih(r)),m.isFog?(f.fogNear.value=m.near,f.fogFar.value=m.far):m.isFogExp2&&(f.fogDensity.value=m.density)}function i(f,m,v,x,M){m.isMeshBasicMaterial||m.isMeshLambertMaterial?s(f,m):m.isMeshToonMaterial?(s(f,m),h(f,m)):m.isMeshPhongMaterial?(s(f,m),d(f,m)):m.isMeshStandardMaterial?(s(f,m),u(f,m),m.isMeshPhysicalMaterial&&p(f,m,M)):m.isMeshMatcapMaterial?(s(f,m),g(f,m)):m.isMeshDepthMaterial?s(f,m):m.isMeshDistanceMaterial?(s(f,m),_(f,m)):m.isMeshNormalMaterial?s(f,m):m.isLineBasicMaterial?(o(f,m),m.isLineDashedMaterial&&a(f,m)):m.isPointsMaterial?l(f,m,v,x):m.isSpriteMaterial?c(f,m):m.isShadowMaterial?(f.color.value.copy(m.color),f.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function s(f,m){f.opacity.value=m.opacity,m.color&&f.diffuse.value.copy(m.color),m.emissive&&f.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(f.map.value=m.map,t(m.map,f.mapTransform)),m.alphaMap&&(f.alphaMap.value=m.alphaMap,t(m.alphaMap,f.alphaMapTransform)),m.bumpMap&&(f.bumpMap.value=m.bumpMap,t(m.bumpMap,f.bumpMapTransform),f.bumpScale.value=m.bumpScale,m.side===qt&&(f.bumpScale.value*=-1)),m.normalMap&&(f.normalMap.value=m.normalMap,t(m.normalMap,f.normalMapTransform),f.normalScale.value.copy(m.normalScale),m.side===qt&&f.normalScale.value.negate()),m.displacementMap&&(f.displacementMap.value=m.displacementMap,t(m.displacementMap,f.displacementMapTransform),f.displacementScale.value=m.displacementScale,f.displacementBias.value=m.displacementBias),m.emissiveMap&&(f.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,f.emissiveMapTransform)),m.specularMap&&(f.specularMap.value=m.specularMap,t(m.specularMap,f.specularMapTransform)),m.alphaTest>0&&(f.alphaTest.value=m.alphaTest);const v=e.get(m),x=v.envMap,M=v.envMapRotation;x&&(f.envMap.value=x,ai.copy(M),ai.x*=-1,ai.y*=-1,ai.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(ai.y*=-1,ai.z*=-1),f.envMapRotation.value.setFromMatrix4(z0.makeRotationFromEuler(ai)),f.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,f.reflectivity.value=m.reflectivity,f.ior.value=m.ior,f.refractionRatio.value=m.refractionRatio),m.lightMap&&(f.lightMap.value=m.lightMap,f.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,f.lightMapTransform)),m.aoMap&&(f.aoMap.value=m.aoMap,f.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,f.aoMapTransform))}function o(f,m){f.diffuse.value.copy(m.color),f.opacity.value=m.opacity,m.map&&(f.map.value=m.map,t(m.map,f.mapTransform))}function a(f,m){f.dashSize.value=m.dashSize,f.totalSize.value=m.dashSize+m.gapSize,f.scale.value=m.scale}function l(f,m,v,x){f.diffuse.value.copy(m.color),f.opacity.value=m.opacity,f.size.value=m.size*v,f.scale.value=x*.5,m.map&&(f.map.value=m.map,t(m.map,f.uvTransform)),m.alphaMap&&(f.alphaMap.value=m.alphaMap,t(m.alphaMap,f.alphaMapTransform)),m.alphaTest>0&&(f.alphaTest.value=m.alphaTest)}function c(f,m){f.diffuse.value.copy(m.color),f.opacity.value=m.opacity,f.rotation.value=m.rotation,m.map&&(f.map.value=m.map,t(m.map,f.mapTransform)),m.alphaMap&&(f.alphaMap.value=m.alphaMap,t(m.alphaMap,f.alphaMapTransform)),m.alphaTest>0&&(f.alphaTest.value=m.alphaTest)}function d(f,m){f.specular.value.copy(m.specular),f.shininess.value=Math.max(m.shininess,1e-4)}function h(f,m){m.gradientMap&&(f.gradientMap.value=m.gradientMap)}function u(f,m){f.metalness.value=m.metalness,m.metalnessMap&&(f.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,f.metalnessMapTransform)),f.roughness.value=m.roughness,m.roughnessMap&&(f.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,f.roughnessMapTransform)),m.envMap&&(f.envMapIntensity.value=m.envMapIntensity)}function p(f,m,v){f.ior.value=m.ior,m.sheen>0&&(f.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),f.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(f.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,f.sheenColorMapTransform)),m.sheenRoughnessMap&&(f.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,f.sheenRoughnessMapTransform))),m.clearcoat>0&&(f.clearcoat.value=m.clearcoat,f.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(f.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,f.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(f.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,f.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(f.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,f.clearcoatNormalMapTransform),f.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===qt&&f.clearcoatNormalScale.value.negate())),m.dispersion>0&&(f.dispersion.value=m.dispersion),m.iridescence>0&&(f.iridescence.value=m.iridescence,f.iridescenceIOR.value=m.iridescenceIOR,f.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],f.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(f.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,f.iridescenceMapTransform)),m.iridescenceThicknessMap&&(f.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,f.iridescenceThicknessMapTransform))),m.transmission>0&&(f.transmission.value=m.transmission,f.transmissionSamplerMap.value=v.texture,f.transmissionSamplerSize.value.set(v.width,v.height),m.transmissionMap&&(f.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,f.transmissionMapTransform)),f.thickness.value=m.thickness,m.thicknessMap&&(f.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,f.thicknessMapTransform)),f.attenuationDistance.value=m.attenuationDistance,f.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(f.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(f.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,f.anisotropyMapTransform))),f.specularIntensity.value=m.specularIntensity,f.specularColor.value.copy(m.specularColor),m.specularColorMap&&(f.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,f.specularColorMapTransform)),m.specularIntensityMap&&(f.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,f.specularIntensityMapTransform))}function g(f,m){m.matcap&&(f.matcap.value=m.matcap)}function _(f,m){const v=e.get(m).light;f.referencePosition.value.setFromMatrixPosition(v.matrixWorld),f.nearDistance.value=v.shadow.camera.near,f.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function H0(r,e,t,n){let i={},s={},o=[];const a=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function l(v,x){const M=x.program;n.uniformBlockBinding(v,M)}function c(v,x){let M=i[v.id];M===void 0&&(g(v),M=d(v),i[v.id]=M,v.addEventListener("dispose",f));const A=x.program;n.updateUBOMapping(v,A);const E=e.render.frame;s[v.id]!==E&&(u(v),s[v.id]=E)}function d(v){const x=h();v.__bindingPointIndex=x;const M=r.createBuffer(),A=v.__size,E=v.usage;return r.bindBuffer(r.UNIFORM_BUFFER,M),r.bufferData(r.UNIFORM_BUFFER,A,E),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,x,M),M}function h(){for(let v=0;v<a;v++)if(o.indexOf(v)===-1)return o.push(v),v;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(v){const x=i[v.id],M=v.uniforms,A=v.__cache;r.bindBuffer(r.UNIFORM_BUFFER,x);for(let E=0,w=M.length;E<w;E++){const L=Array.isArray(M[E])?M[E]:[M[E]];for(let U=0,y=L.length;U<y;U++){const S=L[U];if(p(S,E,U,A)===!0){const B=S.__offset,F=Array.isArray(S.value)?S.value:[S.value];let z=0;for(let Y=0;Y<F.length;Y++){const G=F[Y],J=_(G);typeof G=="number"||typeof G=="boolean"?(S.__data[0]=G,r.bufferSubData(r.UNIFORM_BUFFER,B+z,S.__data)):G.isMatrix3?(S.__data[0]=G.elements[0],S.__data[1]=G.elements[1],S.__data[2]=G.elements[2],S.__data[3]=0,S.__data[4]=G.elements[3],S.__data[5]=G.elements[4],S.__data[6]=G.elements[5],S.__data[7]=0,S.__data[8]=G.elements[6],S.__data[9]=G.elements[7],S.__data[10]=G.elements[8],S.__data[11]=0):(G.toArray(S.__data,z),z+=J.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,B,S.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function p(v,x,M,A){const E=v.value,w=x+"_"+M;if(A[w]===void 0)return typeof E=="number"||typeof E=="boolean"?A[w]=E:A[w]=E.clone(),!0;{const L=A[w];if(typeof E=="number"||typeof E=="boolean"){if(L!==E)return A[w]=E,!0}else if(L.equals(E)===!1)return L.copy(E),!0}return!1}function g(v){const x=v.uniforms;let M=0;const A=16;for(let w=0,L=x.length;w<L;w++){const U=Array.isArray(x[w])?x[w]:[x[w]];for(let y=0,S=U.length;y<S;y++){const B=U[y],F=Array.isArray(B.value)?B.value:[B.value];for(let z=0,Y=F.length;z<Y;z++){const G=F[z],J=_(G),X=M%A,le=X%J.boundary,re=X+le;M+=le,re!==0&&A-re<J.storage&&(M+=A-re),B.__data=new Float32Array(J.storage/Float32Array.BYTES_PER_ELEMENT),B.__offset=M,M+=J.storage}}}const E=M%A;return E>0&&(M+=A-E),v.__size=M,v.__cache={},this}function _(v){const x={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(x.boundary=4,x.storage=4):v.isVector2?(x.boundary=8,x.storage=8):v.isVector3||v.isColor?(x.boundary=16,x.storage=12):v.isVector4?(x.boundary=16,x.storage=16):v.isMatrix3?(x.boundary=48,x.storage=48):v.isMatrix4?(x.boundary=64,x.storage=64):v.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",v),x}function f(v){const x=v.target;x.removeEventListener("dispose",f);const M=o.indexOf(x.__bindingPointIndex);o.splice(M,1),r.deleteBuffer(i[x.id]),delete i[x.id],delete s[x.id]}function m(){for(const v in i)r.deleteBuffer(i[v]);o=[],i={},s={}}return{bind:l,update:c,dispose:m}}class V0{constructor(e={}){const{canvas:t=Cd(),context:n=null,depth:i=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:h=!1}=e;this.isWebGLRenderer=!0;let u;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");u=n.getContextAttributes().alpha}else u=o;const p=new Uint32Array(4),g=new Int32Array(4);let _=null,f=null;const m=[],v=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Ft,this.toneMapping=Jn,this.toneMappingExposure=1;const x=this;let M=!1,A=0,E=0,w=null,L=-1,U=null;const y=new rt,S=new rt;let B=null;const F=new De(0);let z=0,Y=t.width,G=t.height,J=1,X=null,le=null;const re=new rt(0,0,Y,G),ue=new rt(0,0,Y,G);let Ye=!1;const tt=new Oa;let j=!1,ee=!1;const Se=new ze,xe=new ze,Oe=new C,ye=new rt,$e={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Je=!1;function Qe(){return w===null?J:1}let I=n;function Gt(T,N){return t.getContext(T,N)}try{const T={alpha:!0,depth:i,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:d,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Ea}`),t.addEventListener("webglcontextlost",$,!1),t.addEventListener("webglcontextrestored",ae,!1),t.addEventListener("webglcontextcreationerror",de,!1),I===null){const N="webgl2";if(I=Gt(N,T),I===null)throw Gt(N)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(T){throw console.error("THREE.WebGLRenderer: "+T.message),T}let je,et,Le,ft,Ue,R,b,k,Z,Q,K,oe,se,pe,nt,te,ve,Ce,Ie,ge,Ge,Pe,it,D;function he(){je=new Yp(I),je.init(),Pe=new D0(I,je),et=new Hp(I,je,e,Pe),Le=new P0(I),et.reverseDepthBuffer&&Le.buffers.depth.setReversed(!0),ft=new $p(I),Ue=new m0,R=new I0(I,je,Le,Ue,et,Pe,ft),b=new Wp(x),k=new Kp(x),Z=new iu(I),it=new zp(I,Z),Q=new jp(I,Z,ft,it),K=new Qp(I,Q,Z,ft),Ie=new Jp(I,et,R),te=new Vp(Ue),oe=new p0(x,b,k,je,et,it,te),se=new G0(x,Ue),pe=new _0,nt=new b0(je),Ce=new kp(x,b,k,Le,K,u,l),ve=new R0(x,K,et),D=new H0(I,ft,et,Le),ge=new Gp(I,je,ft),Ge=new Zp(I,je,ft),ft.programs=oe.programs,x.capabilities=et,x.extensions=je,x.properties=Ue,x.renderLists=pe,x.shadowMap=ve,x.state=Le,x.info=ft}he();const W=new k0(x,I);this.xr=W,this.getContext=function(){return I},this.getContextAttributes=function(){return I.getContextAttributes()},this.forceContextLoss=function(){const T=je.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=je.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return J},this.setPixelRatio=function(T){T!==void 0&&(J=T,this.setSize(Y,G,!1))},this.getSize=function(T){return T.set(Y,G)},this.setSize=function(T,N,H=!0){if(W.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}Y=T,G=N,t.width=Math.floor(T*J),t.height=Math.floor(N*J),H===!0&&(t.style.width=T+"px",t.style.height=N+"px"),this.setViewport(0,0,T,N)},this.getDrawingBufferSize=function(T){return T.set(Y*J,G*J).floor()},this.setDrawingBufferSize=function(T,N,H){Y=T,G=N,J=H,t.width=Math.floor(T*H),t.height=Math.floor(N*H),this.setViewport(0,0,T,N)},this.getCurrentViewport=function(T){return T.copy(y)},this.getViewport=function(T){return T.copy(re)},this.setViewport=function(T,N,H,V){T.isVector4?re.set(T.x,T.y,T.z,T.w):re.set(T,N,H,V),Le.viewport(y.copy(re).multiplyScalar(J).round())},this.getScissor=function(T){return T.copy(ue)},this.setScissor=function(T,N,H,V){T.isVector4?ue.set(T.x,T.y,T.z,T.w):ue.set(T,N,H,V),Le.scissor(S.copy(ue).multiplyScalar(J).round())},this.getScissorTest=function(){return Ye},this.setScissorTest=function(T){Le.setScissorTest(Ye=T)},this.setOpaqueSort=function(T){X=T},this.setTransparentSort=function(T){le=T},this.getClearColor=function(T){return T.copy(Ce.getClearColor())},this.setClearColor=function(){Ce.setClearColor.apply(Ce,arguments)},this.getClearAlpha=function(){return Ce.getClearAlpha()},this.setClearAlpha=function(){Ce.setClearAlpha.apply(Ce,arguments)},this.clear=function(T=!0,N=!0,H=!0){let V=0;if(T){let O=!1;if(w!==null){const ne=w.texture.format;O=ne===Da||ne===Ia||ne===La}if(O){const ne=w.texture.type,_e=ne===kn||ne===pi||ne===bs||ne===Xi||ne===Ra||ne===Ca,be=Ce.getClearColor(),Te=Ce.getClearAlpha(),Ne=be.r,Be=be.g,we=be.b;_e?(p[0]=Ne,p[1]=Be,p[2]=we,p[3]=Te,I.clearBufferuiv(I.COLOR,0,p)):(g[0]=Ne,g[1]=Be,g[2]=we,g[3]=Te,I.clearBufferiv(I.COLOR,0,g))}else V|=I.COLOR_BUFFER_BIT}N&&(V|=I.DEPTH_BUFFER_BIT,I.clearDepth(this.capabilities.reverseDepthBuffer?0:1)),H&&(V|=I.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),I.clear(V)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",$,!1),t.removeEventListener("webglcontextrestored",ae,!1),t.removeEventListener("webglcontextcreationerror",de,!1),pe.dispose(),nt.dispose(),Ue.dispose(),b.dispose(),k.dispose(),K.dispose(),it.dispose(),D.dispose(),oe.dispose(),W.dispose(),W.removeEventListener("sessionstart",Kt),W.removeEventListener("sessionend",ti),_n.stop()};function $(T){T.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),M=!0}function ae(){console.log("THREE.WebGLRenderer: Context Restored."),M=!1;const T=ft.autoReset,N=ve.enabled,H=ve.autoUpdate,V=ve.needsUpdate,O=ve.type;he(),ft.autoReset=T,ve.enabled=N,ve.autoUpdate=H,ve.needsUpdate=V,ve.type=O}function de(T){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function He(T){const N=T.target;N.removeEventListener("dispose",He),pt(N)}function pt(T){Ve(T),Ue.remove(T)}function Ve(T){const N=Ue.get(T).programs;N!==void 0&&(N.forEach(function(H){oe.releaseProgram(H)}),T.isShaderMaterial&&oe.releaseShaderCache(T))}this.renderBufferDirect=function(T,N,H,V,O,ne){N===null&&(N=$e);const _e=O.isMesh&&O.matrixWorld.determinant()<0,be=Sh(T,N,H,V,O);Le.setMaterial(V,_e);let Te=H.index,Ne=1;if(V.wireframe===!0){if(Te=Q.getWireframeAttribute(H),Te===void 0)return;Ne=2}const Be=H.drawRange,we=H.attributes.position;let ct=Be.start*Ne,_t=(Be.start+Be.count)*Ne;ne!==null&&(ct=Math.max(ct,ne.start*Ne),_t=Math.min(_t,(ne.start+ne.count)*Ne)),Te!==null?(ct=Math.max(ct,0),_t=Math.min(_t,Te.count)):we!=null&&(ct=Math.max(ct,0),_t=Math.min(_t,we.count));const vt=_t-ct;if(vt<0||vt===1/0)return;it.setup(O,V,be,H,Te);let jt,ot=ge;if(Te!==null&&(jt=Z.get(Te),ot=Ge,ot.setIndex(jt)),O.isMesh)V.wireframe===!0?(Le.setLineWidth(V.wireframeLinewidth*Qe()),ot.setMode(I.LINES)):ot.setMode(I.TRIANGLES);else if(O.isLine){let Ae=V.linewidth;Ae===void 0&&(Ae=1),Le.setLineWidth(Ae*Qe()),O.isLineSegments?ot.setMode(I.LINES):O.isLineLoop?ot.setMode(I.LINE_LOOP):ot.setMode(I.LINE_STRIP)}else O.isPoints?ot.setMode(I.POINTS):O.isSprite&&ot.setMode(I.TRIANGLES);if(O.isBatchedMesh)if(O._multiDrawInstances!==null)ot.renderMultiDrawInstances(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount,O._multiDrawInstances);else if(je.get("WEBGL_multi_draw"))ot.renderMultiDraw(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount);else{const Ae=O._multiDrawStarts,It=O._multiDrawCounts,at=O._multiDrawCount,cn=Te?Z.get(Te).bytesPerElement:1,_i=Ue.get(V).currentProgram.getUniforms();for(let Zt=0;Zt<at;Zt++)_i.setValue(I,"_gl_DrawID",Zt),ot.render(Ae[Zt]/cn,It[Zt])}else if(O.isInstancedMesh)ot.renderInstances(ct,vt,O.count);else if(H.isInstancedBufferGeometry){const Ae=H._maxInstanceCount!==void 0?H._maxInstanceCount:1/0,It=Math.min(H.instanceCount,Ae);ot.renderInstances(ct,vt,It)}else ot.render(ct,vt)};function me(T,N,H){T.transparent===!0&&T.side===Nt&&T.forceSinglePass===!1?(T.side=qt,T.needsUpdate=!0,Ds(T,N,H),T.side=Fn,T.needsUpdate=!0,Ds(T,N,H),T.side=Nt):Ds(T,N,H)}this.compile=function(T,N,H=null){H===null&&(H=T),f=nt.get(H),f.init(N),v.push(f),H.traverseVisible(function(O){O.isLight&&O.layers.test(N.layers)&&(f.pushLight(O),O.castShadow&&f.pushShadow(O))}),T!==H&&T.traverseVisible(function(O){O.isLight&&O.layers.test(N.layers)&&(f.pushLight(O),O.castShadow&&f.pushShadow(O))}),f.setupLights();const V=new Set;return T.traverse(function(O){if(!(O.isMesh||O.isPoints||O.isLine||O.isSprite))return;const ne=O.material;if(ne)if(Array.isArray(ne))for(let _e=0;_e<ne.length;_e++){const be=ne[_e];me(be,H,O),V.add(be)}else me(ne,H,O),V.add(ne)}),v.pop(),f=null,V},this.compileAsync=function(T,N,H=null){const V=this.compile(T,N,H);return new Promise(O=>{function ne(){if(V.forEach(function(_e){Ue.get(_e).currentProgram.isReady()&&V.delete(_e)}),V.size===0){O(T);return}setTimeout(ne,10)}je.get("KHR_parallel_shader_compile")!==null?ne():setTimeout(ne,10)})};let Ee=null;function St(T){Ee&&Ee(T)}function Kt(){_n.stop()}function ti(){_n.start()}const _n=new oh;_n.setAnimationLoop(St),typeof self<"u"&&_n.setContext(self),this.setAnimationLoop=function(T){Ee=T,W.setAnimationLoop(T),T===null?_n.stop():_n.start()},W.addEventListener("sessionstart",Kt),W.addEventListener("sessionend",ti),this.render=function(T,N){if(N!==void 0&&N.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(M===!0)return;if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),W.enabled===!0&&W.isPresenting===!0&&(W.cameraAutoUpdate===!0&&W.updateCamera(N),N=W.getCamera()),T.isScene===!0&&T.onBeforeRender(x,T,N,w),f=nt.get(T,v.length),f.init(N),v.push(f),xe.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),tt.setFromProjectionMatrix(xe),ee=this.localClippingEnabled,j=te.init(this.clippingPlanes,ee),_=pe.get(T,m.length),_.init(),m.push(_),W.enabled===!0&&W.isPresenting===!0){const ne=x.xr.getDepthSensingMesh();ne!==null&&Nr(ne,N,-1/0,x.sortObjects)}Nr(T,N,0,x.sortObjects),_.finish(),x.sortObjects===!0&&_.sort(X,le),Je=W.enabled===!1||W.isPresenting===!1||W.hasDepthSensing()===!1,Je&&Ce.addToRenderList(_,T),this.info.render.frame++,j===!0&&te.beginShadows();const H=f.state.shadowsArray;ve.render(H,T,N),j===!0&&te.endShadows(),this.info.autoReset===!0&&this.info.reset();const V=_.opaque,O=_.transmissive;if(f.setupLights(),N.isArrayCamera){const ne=N.cameras;if(O.length>0)for(let _e=0,be=ne.length;_e<be;_e++){const Te=ne[_e];Ja(V,O,T,Te)}Je&&Ce.render(T);for(let _e=0,be=ne.length;_e<be;_e++){const Te=ne[_e];$a(_,T,Te,Te.viewport)}}else O.length>0&&Ja(V,O,T,N),Je&&Ce.render(T),$a(_,T,N);w!==null&&(R.updateMultisampleRenderTarget(w),R.updateRenderTargetMipmap(w)),T.isScene===!0&&T.onAfterRender(x,T,N),it.resetDefaultState(),L=-1,U=null,v.pop(),v.length>0?(f=v[v.length-1],j===!0&&te.setGlobalState(x.clippingPlanes,f.state.camera)):f=null,m.pop(),m.length>0?_=m[m.length-1]:_=null};function Nr(T,N,H,V){if(T.visible===!1)return;if(T.layers.test(N.layers)){if(T.isGroup)H=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(N);else if(T.isLight)f.pushLight(T),T.castShadow&&f.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||tt.intersectsSprite(T)){V&&ye.setFromMatrixPosition(T.matrixWorld).applyMatrix4(xe);const _e=K.update(T),be=T.material;be.visible&&_.push(T,_e,be,H,ye.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||tt.intersectsObject(T))){const _e=K.update(T),be=T.material;if(V&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),ye.copy(T.boundingSphere.center)):(_e.boundingSphere===null&&_e.computeBoundingSphere(),ye.copy(_e.boundingSphere.center)),ye.applyMatrix4(T.matrixWorld).applyMatrix4(xe)),Array.isArray(be)){const Te=_e.groups;for(let Ne=0,Be=Te.length;Ne<Be;Ne++){const we=Te[Ne],ct=be[we.materialIndex];ct&&ct.visible&&_.push(T,_e,ct,H,ye.z,we)}}else be.visible&&_.push(T,_e,be,H,ye.z,null)}}const ne=T.children;for(let _e=0,be=ne.length;_e<be;_e++)Nr(ne[_e],N,H,V)}function $a(T,N,H,V){const O=T.opaque,ne=T.transmissive,_e=T.transparent;f.setupLightsView(H),j===!0&&te.setGlobalState(x.clippingPlanes,H),V&&Le.viewport(y.copy(V)),O.length>0&&Is(O,N,H),ne.length>0&&Is(ne,N,H),_e.length>0&&Is(_e,N,H),Le.buffers.depth.setTest(!0),Le.buffers.depth.setMask(!0),Le.buffers.color.setMask(!0),Le.setPolygonOffset(!1)}function Ja(T,N,H,V){if((H.isScene===!0?H.overrideMaterial:null)!==null)return;f.state.transmissionRenderTarget[V.id]===void 0&&(f.state.transmissionRenderTarget[V.id]=new mi(1,1,{generateMipmaps:!0,type:je.has("EXT_color_buffer_half_float")||je.has("EXT_color_buffer_float")?Cs:kn,minFilter:Bn,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:st.workingColorSpace}));const ne=f.state.transmissionRenderTarget[V.id],_e=V.viewport||y;ne.setSize(_e.z,_e.w);const be=x.getRenderTarget();x.setRenderTarget(ne),x.getClearColor(F),z=x.getClearAlpha(),z<1&&x.setClearColor(16777215,.5),x.clear(),Je&&Ce.render(H);const Te=x.toneMapping;x.toneMapping=Jn;const Ne=V.viewport;if(V.viewport!==void 0&&(V.viewport=void 0),f.setupLightsView(V),j===!0&&te.setGlobalState(x.clippingPlanes,V),Is(T,H,V),R.updateMultisampleRenderTarget(ne),R.updateRenderTargetMipmap(ne),je.has("WEBGL_multisampled_render_to_texture")===!1){let Be=!1;for(let we=0,ct=N.length;we<ct;we++){const _t=N[we],vt=_t.object,jt=_t.geometry,ot=_t.material,Ae=_t.group;if(ot.side===Nt&&vt.layers.test(V.layers)){const It=ot.side;ot.side=qt,ot.needsUpdate=!0,Qa(vt,H,V,jt,ot,Ae),ot.side=It,ot.needsUpdate=!0,Be=!0}}Be===!0&&(R.updateMultisampleRenderTarget(ne),R.updateRenderTargetMipmap(ne))}x.setRenderTarget(be),x.setClearColor(F,z),Ne!==void 0&&(V.viewport=Ne),x.toneMapping=Te}function Is(T,N,H){const V=N.isScene===!0?N.overrideMaterial:null;for(let O=0,ne=T.length;O<ne;O++){const _e=T[O],be=_e.object,Te=_e.geometry,Ne=V===null?_e.material:V,Be=_e.group;be.layers.test(H.layers)&&Qa(be,N,H,Te,Ne,Be)}}function Qa(T,N,H,V,O,ne){T.onBeforeRender(x,N,H,V,O,ne),T.modelViewMatrix.multiplyMatrices(H.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),O.onBeforeRender(x,N,H,V,T,ne),O.transparent===!0&&O.side===Nt&&O.forceSinglePass===!1?(O.side=qt,O.needsUpdate=!0,x.renderBufferDirect(H,N,V,O,T,ne),O.side=Fn,O.needsUpdate=!0,x.renderBufferDirect(H,N,V,O,T,ne),O.side=Nt):x.renderBufferDirect(H,N,V,O,T,ne),T.onAfterRender(x,N,H,V,O,ne)}function Ds(T,N,H){N.isScene!==!0&&(N=$e);const V=Ue.get(T),O=f.state.lights,ne=f.state.shadowsArray,_e=O.state.version,be=oe.getParameters(T,O.state,ne,N,H),Te=oe.getProgramCacheKey(be);let Ne=V.programs;V.environment=T.isMeshStandardMaterial?N.environment:null,V.fog=N.fog,V.envMap=(T.isMeshStandardMaterial?k:b).get(T.envMap||V.environment),V.envMapRotation=V.environment!==null&&T.envMap===null?N.environmentRotation:T.envMapRotation,Ne===void 0&&(T.addEventListener("dispose",He),Ne=new Map,V.programs=Ne);let Be=Ne.get(Te);if(Be!==void 0){if(V.currentProgram===Be&&V.lightsStateVersion===_e)return tl(T,be),Be}else be.uniforms=oe.getUniforms(T),T.onBeforeCompile(be,x),Be=oe.acquireProgram(be,Te),Ne.set(Te,Be),V.uniforms=be.uniforms;const we=V.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(we.clippingPlanes=te.uniform),tl(T,be),V.needsLights=Th(T),V.lightsStateVersion=_e,V.needsLights&&(we.ambientLightColor.value=O.state.ambient,we.lightProbe.value=O.state.probe,we.directionalLights.value=O.state.directional,we.directionalLightShadows.value=O.state.directionalShadow,we.spotLights.value=O.state.spot,we.spotLightShadows.value=O.state.spotShadow,we.rectAreaLights.value=O.state.rectArea,we.ltc_1.value=O.state.rectAreaLTC1,we.ltc_2.value=O.state.rectAreaLTC2,we.pointLights.value=O.state.point,we.pointLightShadows.value=O.state.pointShadow,we.hemisphereLights.value=O.state.hemi,we.directionalShadowMap.value=O.state.directionalShadowMap,we.directionalShadowMatrix.value=O.state.directionalShadowMatrix,we.spotShadowMap.value=O.state.spotShadowMap,we.spotLightMatrix.value=O.state.spotLightMatrix,we.spotLightMap.value=O.state.spotLightMap,we.pointShadowMap.value=O.state.pointShadowMap,we.pointShadowMatrix.value=O.state.pointShadowMatrix),V.currentProgram=Be,V.uniformsList=null,Be}function el(T){if(T.uniformsList===null){const N=T.currentProgram.getUniforms();T.uniformsList=_r.seqWithValue(N.seq,T.uniforms)}return T.uniformsList}function tl(T,N){const H=Ue.get(T);H.outputColorSpace=N.outputColorSpace,H.batching=N.batching,H.batchingColor=N.batchingColor,H.instancing=N.instancing,H.instancingColor=N.instancingColor,H.instancingMorph=N.instancingMorph,H.skinning=N.skinning,H.morphTargets=N.morphTargets,H.morphNormals=N.morphNormals,H.morphColors=N.morphColors,H.morphTargetsCount=N.morphTargetsCount,H.numClippingPlanes=N.numClippingPlanes,H.numIntersection=N.numClipIntersection,H.vertexAlphas=N.vertexAlphas,H.vertexTangents=N.vertexTangents,H.toneMapping=N.toneMapping}function Sh(T,N,H,V,O){N.isScene!==!0&&(N=$e),R.resetTextureUnits();const ne=N.fog,_e=V.isMeshStandardMaterial?N.environment:null,be=w===null?x.outputColorSpace:w.isXRRenderTarget===!0?w.texture.colorSpace:Ut,Te=(V.isMeshStandardMaterial?k:b).get(V.envMap||_e),Ne=V.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,Be=!!H.attributes.tangent&&(!!V.normalMap||V.anisotropy>0),we=!!H.morphAttributes.position,ct=!!H.morphAttributes.normal,_t=!!H.morphAttributes.color;let vt=Jn;V.toneMapped&&(w===null||w.isXRRenderTarget===!0)&&(vt=x.toneMapping);const jt=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,ot=jt!==void 0?jt.length:0,Ae=Ue.get(V),It=f.state.lights;if(j===!0&&(ee===!0||T!==U)){const tn=T===U&&V.id===L;te.setState(V,T,tn)}let at=!1;V.version===Ae.__version?(Ae.needsLights&&Ae.lightsStateVersion!==It.state.version||Ae.outputColorSpace!==be||O.isBatchedMesh&&Ae.batching===!1||!O.isBatchedMesh&&Ae.batching===!0||O.isBatchedMesh&&Ae.batchingColor===!0&&O.colorTexture===null||O.isBatchedMesh&&Ae.batchingColor===!1&&O.colorTexture!==null||O.isInstancedMesh&&Ae.instancing===!1||!O.isInstancedMesh&&Ae.instancing===!0||O.isSkinnedMesh&&Ae.skinning===!1||!O.isSkinnedMesh&&Ae.skinning===!0||O.isInstancedMesh&&Ae.instancingColor===!0&&O.instanceColor===null||O.isInstancedMesh&&Ae.instancingColor===!1&&O.instanceColor!==null||O.isInstancedMesh&&Ae.instancingMorph===!0&&O.morphTexture===null||O.isInstancedMesh&&Ae.instancingMorph===!1&&O.morphTexture!==null||Ae.envMap!==Te||V.fog===!0&&Ae.fog!==ne||Ae.numClippingPlanes!==void 0&&(Ae.numClippingPlanes!==te.numPlanes||Ae.numIntersection!==te.numIntersection)||Ae.vertexAlphas!==Ne||Ae.vertexTangents!==Be||Ae.morphTargets!==we||Ae.morphNormals!==ct||Ae.morphColors!==_t||Ae.toneMapping!==vt||Ae.morphTargetsCount!==ot)&&(at=!0):(at=!0,Ae.__version=V.version);let cn=Ae.currentProgram;at===!0&&(cn=Ds(V,N,O));let _i=!1,Zt=!1,Ur=!1;const Mt=cn.getUniforms(),zn=Ae.uniforms;if(Le.useProgram(cn.program)&&(_i=!0,Zt=!0,Ur=!0),V.id!==L&&(L=V.id,Zt=!0),_i||U!==T){et.reverseDepthBuffer?(Se.copy(T.projectionMatrix),Ld(Se),Id(Se),Mt.setValue(I,"projectionMatrix",Se)):Mt.setValue(I,"projectionMatrix",T.projectionMatrix),Mt.setValue(I,"viewMatrix",T.matrixWorldInverse);const tn=Mt.map.cameraPosition;tn!==void 0&&tn.setValue(I,Oe.setFromMatrixPosition(T.matrixWorld)),et.logarithmicDepthBuffer&&Mt.setValue(I,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(V.isMeshPhongMaterial||V.isMeshToonMaterial||V.isMeshLambertMaterial||V.isMeshBasicMaterial||V.isMeshStandardMaterial||V.isShaderMaterial)&&Mt.setValue(I,"isOrthographic",T.isOrthographicCamera===!0),U!==T&&(U=T,Zt=!0,Ur=!0)}if(O.isSkinnedMesh){Mt.setOptional(I,O,"bindMatrix"),Mt.setOptional(I,O,"bindMatrixInverse");const tn=O.skeleton;tn&&(tn.boneTexture===null&&tn.computeBoneTexture(),Mt.setValue(I,"boneTexture",tn.boneTexture,R))}O.isBatchedMesh&&(Mt.setOptional(I,O,"batchingTexture"),Mt.setValue(I,"batchingTexture",O._matricesTexture,R),Mt.setOptional(I,O,"batchingIdTexture"),Mt.setValue(I,"batchingIdTexture",O._indirectTexture,R),Mt.setOptional(I,O,"batchingColorTexture"),O._colorsTexture!==null&&Mt.setValue(I,"batchingColorTexture",O._colorsTexture,R));const Br=H.morphAttributes;if((Br.position!==void 0||Br.normal!==void 0||Br.color!==void 0)&&Ie.update(O,H,cn),(Zt||Ae.receiveShadow!==O.receiveShadow)&&(Ae.receiveShadow=O.receiveShadow,Mt.setValue(I,"receiveShadow",O.receiveShadow)),V.isMeshGouraudMaterial&&V.envMap!==null&&(zn.envMap.value=Te,zn.flipEnvMap.value=Te.isCubeTexture&&Te.isRenderTargetTexture===!1?-1:1),V.isMeshStandardMaterial&&V.envMap===null&&N.environment!==null&&(zn.envMapIntensity.value=N.environmentIntensity),Zt&&(Mt.setValue(I,"toneMappingExposure",x.toneMappingExposure),Ae.needsLights&&bh(zn,Ur),ne&&V.fog===!0&&se.refreshFogUniforms(zn,ne),se.refreshMaterialUniforms(zn,V,J,G,f.state.transmissionRenderTarget[T.id]),_r.upload(I,el(Ae),zn,R)),V.isShaderMaterial&&V.uniformsNeedUpdate===!0&&(_r.upload(I,el(Ae),zn,R),V.uniformsNeedUpdate=!1),V.isSpriteMaterial&&Mt.setValue(I,"center",O.center),Mt.setValue(I,"modelViewMatrix",O.modelViewMatrix),Mt.setValue(I,"normalMatrix",O.normalMatrix),Mt.setValue(I,"modelMatrix",O.matrixWorld),V.isShaderMaterial||V.isRawShaderMaterial){const tn=V.uniformsGroups;for(let Or=0,wh=tn.length;Or<wh;Or++){const nl=tn[Or];D.update(nl,cn),D.bind(nl,cn)}}return cn}function bh(T,N){T.ambientLightColor.needsUpdate=N,T.lightProbe.needsUpdate=N,T.directionalLights.needsUpdate=N,T.directionalLightShadows.needsUpdate=N,T.pointLights.needsUpdate=N,T.pointLightShadows.needsUpdate=N,T.spotLights.needsUpdate=N,T.spotLightShadows.needsUpdate=N,T.rectAreaLights.needsUpdate=N,T.hemisphereLights.needsUpdate=N}function Th(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return A},this.getActiveMipmapLevel=function(){return E},this.getRenderTarget=function(){return w},this.setRenderTargetTextures=function(T,N,H){Ue.get(T.texture).__webglTexture=N,Ue.get(T.depthTexture).__webglTexture=H;const V=Ue.get(T);V.__hasExternalTextures=!0,V.__autoAllocateDepthBuffer=H===void 0,V.__autoAllocateDepthBuffer||je.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),V.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(T,N){const H=Ue.get(T);H.__webglFramebuffer=N,H.__useDefaultFramebuffer=N===void 0},this.setRenderTarget=function(T,N=0,H=0){w=T,A=N,E=H;let V=!0,O=null,ne=!1,_e=!1;if(T){const Te=Ue.get(T);if(Te.__useDefaultFramebuffer!==void 0)Le.bindFramebuffer(I.FRAMEBUFFER,null),V=!1;else if(Te.__webglFramebuffer===void 0)R.setupRenderTarget(T);else if(Te.__hasExternalTextures)R.rebindTextures(T,Ue.get(T.texture).__webglTexture,Ue.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){const we=T.depthTexture;if(Te.__boundDepthTexture!==we){if(we!==null&&Ue.has(we)&&(T.width!==we.image.width||T.height!==we.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");R.setupDepthRenderbuffer(T)}}const Ne=T.texture;(Ne.isData3DTexture||Ne.isDataArrayTexture||Ne.isCompressedArrayTexture)&&(_e=!0);const Be=Ue.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(Be[N])?O=Be[N][H]:O=Be[N],ne=!0):T.samples>0&&R.useMultisampledRTT(T)===!1?O=Ue.get(T).__webglMultisampledFramebuffer:Array.isArray(Be)?O=Be[H]:O=Be,y.copy(T.viewport),S.copy(T.scissor),B=T.scissorTest}else y.copy(re).multiplyScalar(J).floor(),S.copy(ue).multiplyScalar(J).floor(),B=Ye;if(Le.bindFramebuffer(I.FRAMEBUFFER,O)&&V&&Le.drawBuffers(T,O),Le.viewport(y),Le.scissor(S),Le.setScissorTest(B),ne){const Te=Ue.get(T.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_CUBE_MAP_POSITIVE_X+N,Te.__webglTexture,H)}else if(_e){const Te=Ue.get(T.texture),Ne=N||0;I.framebufferTextureLayer(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,Te.__webglTexture,H||0,Ne)}L=-1},this.readRenderTargetPixels=function(T,N,H,V,O,ne,_e){if(!(T&&T.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let be=Ue.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&_e!==void 0&&(be=be[_e]),be){Le.bindFramebuffer(I.FRAMEBUFFER,be);try{const Te=T.texture,Ne=Te.format,Be=Te.type;if(!et.textureFormatReadable(Ne)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!et.textureTypeReadable(Be)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}N>=0&&N<=T.width-V&&H>=0&&H<=T.height-O&&I.readPixels(N,H,V,O,Pe.convert(Ne),Pe.convert(Be),ne)}finally{const Te=w!==null?Ue.get(w).__webglFramebuffer:null;Le.bindFramebuffer(I.FRAMEBUFFER,Te)}}},this.readRenderTargetPixelsAsync=async function(T,N,H,V,O,ne,_e){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let be=Ue.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&_e!==void 0&&(be=be[_e]),be){const Te=T.texture,Ne=Te.format,Be=Te.type;if(!et.textureFormatReadable(Ne))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!et.textureTypeReadable(Be))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(N>=0&&N<=T.width-V&&H>=0&&H<=T.height-O){Le.bindFramebuffer(I.FRAMEBUFFER,be);const we=I.createBuffer();I.bindBuffer(I.PIXEL_PACK_BUFFER,we),I.bufferData(I.PIXEL_PACK_BUFFER,ne.byteLength,I.STREAM_READ),I.readPixels(N,H,V,O,Pe.convert(Ne),Pe.convert(Be),0);const ct=w!==null?Ue.get(w).__webglFramebuffer:null;Le.bindFramebuffer(I.FRAMEBUFFER,ct);const _t=I.fenceSync(I.SYNC_GPU_COMMANDS_COMPLETE,0);return I.flush(),await Pd(I,_t,4),I.bindBuffer(I.PIXEL_PACK_BUFFER,we),I.getBufferSubData(I.PIXEL_PACK_BUFFER,0,ne),I.deleteBuffer(we),I.deleteSync(_t),ne}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(T,N=null,H=0){T.isTexture!==!0&&(gr("WebGLRenderer: copyFramebufferToTexture function signature has changed."),N=arguments[0]||null,T=arguments[1]);const V=Math.pow(2,-H),O=Math.floor(T.image.width*V),ne=Math.floor(T.image.height*V),_e=N!==null?N.x:0,be=N!==null?N.y:0;R.setTexture2D(T,0),I.copyTexSubImage2D(I.TEXTURE_2D,H,0,0,_e,be,O,ne),Le.unbindTexture()},this.copyTextureToTexture=function(T,N,H=null,V=null,O=0){T.isTexture!==!0&&(gr("WebGLRenderer: copyTextureToTexture function signature has changed."),V=arguments[0]||null,T=arguments[1],N=arguments[2],O=arguments[3]||0,H=null);let ne,_e,be,Te,Ne,Be;H!==null?(ne=H.max.x-H.min.x,_e=H.max.y-H.min.y,be=H.min.x,Te=H.min.y):(ne=T.image.width,_e=T.image.height,be=0,Te=0),V!==null?(Ne=V.x,Be=V.y):(Ne=0,Be=0);const we=Pe.convert(N.format),ct=Pe.convert(N.type);R.setTexture2D(N,0),I.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,N.flipY),I.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),I.pixelStorei(I.UNPACK_ALIGNMENT,N.unpackAlignment);const _t=I.getParameter(I.UNPACK_ROW_LENGTH),vt=I.getParameter(I.UNPACK_IMAGE_HEIGHT),jt=I.getParameter(I.UNPACK_SKIP_PIXELS),ot=I.getParameter(I.UNPACK_SKIP_ROWS),Ae=I.getParameter(I.UNPACK_SKIP_IMAGES),It=T.isCompressedTexture?T.mipmaps[O]:T.image;I.pixelStorei(I.UNPACK_ROW_LENGTH,It.width),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,It.height),I.pixelStorei(I.UNPACK_SKIP_PIXELS,be),I.pixelStorei(I.UNPACK_SKIP_ROWS,Te),T.isDataTexture?I.texSubImage2D(I.TEXTURE_2D,O,Ne,Be,ne,_e,we,ct,It.data):T.isCompressedTexture?I.compressedTexSubImage2D(I.TEXTURE_2D,O,Ne,Be,It.width,It.height,we,It.data):I.texSubImage2D(I.TEXTURE_2D,O,Ne,Be,ne,_e,we,ct,It),I.pixelStorei(I.UNPACK_ROW_LENGTH,_t),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,vt),I.pixelStorei(I.UNPACK_SKIP_PIXELS,jt),I.pixelStorei(I.UNPACK_SKIP_ROWS,ot),I.pixelStorei(I.UNPACK_SKIP_IMAGES,Ae),O===0&&N.generateMipmaps&&I.generateMipmap(I.TEXTURE_2D),Le.unbindTexture()},this.copyTextureToTexture3D=function(T,N,H=null,V=null,O=0){T.isTexture!==!0&&(gr("WebGLRenderer: copyTextureToTexture3D function signature has changed."),H=arguments[0]||null,V=arguments[1]||null,T=arguments[2],N=arguments[3],O=arguments[4]||0);let ne,_e,be,Te,Ne,Be,we,ct,_t;const vt=T.isCompressedTexture?T.mipmaps[O]:T.image;H!==null?(ne=H.max.x-H.min.x,_e=H.max.y-H.min.y,be=H.max.z-H.min.z,Te=H.min.x,Ne=H.min.y,Be=H.min.z):(ne=vt.width,_e=vt.height,be=vt.depth,Te=0,Ne=0,Be=0),V!==null?(we=V.x,ct=V.y,_t=V.z):(we=0,ct=0,_t=0);const jt=Pe.convert(N.format),ot=Pe.convert(N.type);let Ae;if(N.isData3DTexture)R.setTexture3D(N,0),Ae=I.TEXTURE_3D;else if(N.isDataArrayTexture||N.isCompressedArrayTexture)R.setTexture2DArray(N,0),Ae=I.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}I.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,N.flipY),I.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),I.pixelStorei(I.UNPACK_ALIGNMENT,N.unpackAlignment);const It=I.getParameter(I.UNPACK_ROW_LENGTH),at=I.getParameter(I.UNPACK_IMAGE_HEIGHT),cn=I.getParameter(I.UNPACK_SKIP_PIXELS),_i=I.getParameter(I.UNPACK_SKIP_ROWS),Zt=I.getParameter(I.UNPACK_SKIP_IMAGES);I.pixelStorei(I.UNPACK_ROW_LENGTH,vt.width),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,vt.height),I.pixelStorei(I.UNPACK_SKIP_PIXELS,Te),I.pixelStorei(I.UNPACK_SKIP_ROWS,Ne),I.pixelStorei(I.UNPACK_SKIP_IMAGES,Be),T.isDataTexture||T.isData3DTexture?I.texSubImage3D(Ae,O,we,ct,_t,ne,_e,be,jt,ot,vt.data):N.isCompressedArrayTexture?I.compressedTexSubImage3D(Ae,O,we,ct,_t,ne,_e,be,jt,vt.data):I.texSubImage3D(Ae,O,we,ct,_t,ne,_e,be,jt,ot,vt),I.pixelStorei(I.UNPACK_ROW_LENGTH,It),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,at),I.pixelStorei(I.UNPACK_SKIP_PIXELS,cn),I.pixelStorei(I.UNPACK_SKIP_ROWS,_i),I.pixelStorei(I.UNPACK_SKIP_IMAGES,Zt),O===0&&N.generateMipmaps&&I.generateMipmap(Ae),Le.unbindTexture()},this.initRenderTarget=function(T){Ue.get(T).__webglFramebuffer===void 0&&R.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?R.setTextureCube(T,0):T.isData3DTexture?R.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?R.setTexture2DArray(T,0):R.setTexture2D(T,0),Le.unbindTexture()},this.resetState=function(){A=0,E=0,w=null,Le.reset(),it.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return On}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===Na?"display-p3":"srgb",t.unpackColorSpace=st.workingColorSpace===Ir?"display-p3":"srgb"}}class za{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new De(e),this.near=t,this.far=n}clone(){return new za(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class ec extends yt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new wt,this.environmentIntensity=1,this.environmentRotation=new wt,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class W0{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=pa,this.updateRanges=[],this.version=0,this.uuid=gn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,s=this.stride;i<s;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=gn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=gn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Ht=new C;class Ga{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Ht.fromBufferAttribute(this,t),Ht.applyMatrix4(e),this.setXYZ(t,Ht.x,Ht.y,Ht.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Ht.fromBufferAttribute(this,t),Ht.applyNormalMatrix(e),this.setXYZ(t,Ht.x,Ht.y,Ht.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Ht.fromBufferAttribute(this,t),Ht.transformDirection(e),this.setXYZ(t,Ht.x,Ht.y,Ht.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=pn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=ht(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=ht(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=ht(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=ht(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=ht(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=pn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=pn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=pn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=pn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=ht(t,this.array),n=ht(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=ht(t,this.array),n=ht(n,this.array),i=ht(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=ht(t,this.array),n=ht(n,this.array),i=ht(i,this.array),s=ht(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=s,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return new Lt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Ga(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const tc=new C,nc=new rt,ic=new rt,X0=new C,sc=new ze,er=new C,po=new bn,rc=new ze,mo=new Qi;class q0 extends P{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=ol,this.bindMatrix=new ze,this.bindMatrixInverse=new ze,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Yt),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,er),this.boundingBox.expandByPoint(er)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new bn),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,er),this.boundingSphere.expandByPoint(er)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),po.copy(this.boundingSphere),po.applyMatrix4(i),e.ray.intersectsSphere(po)!==!1&&(rc.copy(i).invert(),mo.copy(e.ray).applyMatrix4(rc),!(this.boundingBox!==null&&mo.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,mo)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new rt,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);const s=1/e.manhattanLength();s!==1/0?e.multiplyScalar(s):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===ol?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===ed?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,i=this.geometry;nc.fromBufferAttribute(i.attributes.skinIndex,e),ic.fromBufferAttribute(i.attributes.skinWeight,e),tc.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let s=0;s<4;s++){const o=ic.getComponent(s);if(o!==0){const a=nc.getComponent(s);sc.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),t.addScaledVector(X0.copy(tc).applyMatrix4(sc),o)}}return t.applyMatrix4(this.bindMatrixInverse)}}class uh extends yt{constructor(){super(),this.isBone=!0,this.type="Bone"}}class fh extends Et{constructor(e=null,t=1,n=1,i,s,o,a,l,c=Xt,d=Xt,h,u){super(null,o,a,l,c,d,i,s,h,u),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const oc=new ze,K0=new ze;class Ha{constructor(e=[],t=[]){this.uuid=gn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new ze)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new ze;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let s=0,o=e.length;s<o;s++){const a=e[s]?e[s].matrixWorld:K0;oc.multiplyMatrices(a,t[s]),oc.toArray(n,s*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new Ha(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new fh(t,e,e,an,mn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){const s=e.bones[n];let o=t[s];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",s),o=new uh),this.bones.push(o),this.boneInverses.push(new ze().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let i=0,s=t.length;i<s;i++){const o=t[i];e.bones.push(o.uuid);const a=n[i];e.boneInverses.push(a.toArray())}return e}}class ga extends Lt{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Ii=new ze,ac=new ze,tr=[],lc=new Yt,Y0=new ze,hs=new P,ds=new bn;class j0 extends P{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new ga(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,Y0)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Yt),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ii),lc.copy(e.boundingBox).applyMatrix4(Ii),this.boundingBox.union(lc)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new bn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ii),ds.copy(e.boundingSphere).applyMatrix4(Ii),this.boundingSphere.union(ds)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,s=n.length+1,o=e*s+1;for(let a=0;a<n.length;a++)n[a]=i[o+a]}raycast(e,t){const n=this.matrixWorld,i=this.count;if(hs.geometry=this.geometry,hs.material=this.material,hs.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ds.copy(this.boundingSphere),ds.applyMatrix4(n),e.ray.intersectsSphere(ds)!==!1))for(let s=0;s<i;s++){this.getMatrixAt(s,Ii),ac.multiplyMatrices(n,Ii),hs.matrixWorld=ac,hs.raycast(e,tr);for(let o=0,a=tr.length;o<a;o++){const l=tr[o];l.instanceId=s,l.object=this,t.push(l)}tr.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new ga(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new fh(new Float32Array(i*this.count),i,this.count,Pa,mn));const s=this.morphTexture.source.data.data;let o=0;for(let c=0;c<n.length;c++)o+=n[c];const a=this.geometry.morphTargetsRelative?1:1-o,l=i*e;s[l]=a,s.set(n,l+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class Dt extends vn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new De(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const wr=new C,Er=new C,cc=new ze,us=new Qi,nr=new bn,go=new C,hc=new C;class Va extends yt{constructor(e=new Tt,t=new Dt){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let i=1,s=t.count;i<s;i++)wr.fromBufferAttribute(t,i-1),Er.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=wr.distanceTo(Er);e.setAttribute("lineDistance",new gt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),nr.copy(n.boundingSphere),nr.applyMatrix4(i),nr.radius+=s,e.ray.intersectsSphere(nr)===!1)return;cc.copy(i).invert(),us.copy(e.ray).applyMatrix4(cc);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,d=n.index,u=n.attributes.position;if(d!==null){const p=Math.max(0,o.start),g=Math.min(d.count,o.start+o.count);for(let _=p,f=g-1;_<f;_+=c){const m=d.getX(_),v=d.getX(_+1),x=ir(this,e,us,l,m,v);x&&t.push(x)}if(this.isLineLoop){const _=d.getX(g-1),f=d.getX(p),m=ir(this,e,us,l,_,f);m&&t.push(m)}}else{const p=Math.max(0,o.start),g=Math.min(u.count,o.start+o.count);for(let _=p,f=g-1;_<f;_+=c){const m=ir(this,e,us,l,_,_+1);m&&t.push(m)}if(this.isLineLoop){const _=ir(this,e,us,l,g-1,p);_&&t.push(_)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function ir(r,e,t,n,i,s){const o=r.geometry.attributes.position;if(wr.fromBufferAttribute(o,i),Er.fromBufferAttribute(o,s),t.distanceSqToSegment(wr,Er,go,hc)>n)return;go.applyMatrix4(r.matrixWorld);const l=e.ray.origin.distanceTo(go);if(!(l<e.near||l>e.far))return{distance:l,point:hc.clone().applyMatrix4(r.matrixWorld),index:i,face:null,faceIndex:null,barycoord:null,object:r}}const dc=new C,uc=new C;class Wt extends Va{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let i=0,s=t.count;i<s;i+=2)dc.fromBufferAttribute(t,i),uc.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+dc.distanceTo(uc);e.setAttribute("lineDistance",new gt(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Z0 extends Va{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class Ar extends vn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new De(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const fc=new ze,_a=new Qi,sr=new bn,rr=new C;class xa extends yt{constructor(e=new Tt,t=new Ar){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),sr.copy(n.boundingSphere),sr.applyMatrix4(i),sr.radius+=s,e.ray.intersectsSphere(sr)===!1)return;fc.copy(i).invert(),_a.copy(e.ray).applyMatrix4(fc);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,h=n.attributes.position;if(c!==null){const u=Math.max(0,o.start),p=Math.min(c.count,o.start+o.count);for(let g=u,_=p;g<_;g++){const f=c.getX(g);rr.fromBufferAttribute(h,f),pc(rr,f,l,i,e,t,this)}}else{const u=Math.max(0,o.start),p=Math.min(h.count,o.start+o.count);for(let g=u,_=p;g<_;g++)rr.fromBufferAttribute(h,g),pc(rr,g,l,i,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function pc(r,e,t,n,i,s,o){const a=_a.distanceSqToPoint(r);if(a<t){const l=new C;_a.closestPointToPoint(r,l),l.applyMatrix4(n);const c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;s.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}class ut extends Et{constructor(e,t,n,i,s,o,a,l,c){super(e,t,n,i,s,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Rr extends Tt{constructor(e=1,t=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:i},t=Math.max(3,t);const s=[],o=[],a=[],l=[],c=new C,d=new qe;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let h=0,u=3;h<=t;h++,u+=3){const p=n+h/t*i;c.x=e*Math.cos(p),c.y=e*Math.sin(p),o.push(c.x,c.y,c.z),a.push(0,0,1),d.x=(o[u]/e+1)/2,d.y=(o[u+1]/e+1)/2,l.push(d.x,d.y)}for(let h=1;h<=t;h++)s.push(h,h+1,0);this.setIndex(s),this.setAttribute("position",new gt(o,3)),this.setAttribute("normal",new gt(a,3)),this.setAttribute("uv",new gt(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Rr(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class fe extends Tt{constructor(e=1,t=1,n=1,i=32,s=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:s,openEnded:o,thetaStart:a,thetaLength:l};const c=this;i=Math.floor(i),s=Math.floor(s);const d=[],h=[],u=[],p=[];let g=0;const _=[],f=n/2;let m=0;v(),o===!1&&(e>0&&x(!0),t>0&&x(!1)),this.setIndex(d),this.setAttribute("position",new gt(h,3)),this.setAttribute("normal",new gt(u,3)),this.setAttribute("uv",new gt(p,2));function v(){const M=new C,A=new C;let E=0;const w=(t-e)/n;for(let L=0;L<=s;L++){const U=[],y=L/s,S=y*(t-e)+e;for(let B=0;B<=i;B++){const F=B/i,z=F*l+a,Y=Math.sin(z),G=Math.cos(z);A.x=S*Y,A.y=-y*n+f,A.z=S*G,h.push(A.x,A.y,A.z),M.set(Y,w,G).normalize(),u.push(M.x,M.y,M.z),p.push(F,1-y),U.push(g++)}_.push(U)}for(let L=0;L<i;L++)for(let U=0;U<s;U++){const y=_[U][L],S=_[U+1][L],B=_[U+1][L+1],F=_[U][L+1];e>0&&(d.push(y,S,F),E+=3),t>0&&(d.push(S,B,F),E+=3)}c.addGroup(m,E,0),m+=E}function x(M){const A=g,E=new qe,w=new C;let L=0;const U=M===!0?e:t,y=M===!0?1:-1;for(let B=1;B<=i;B++)h.push(0,f*y,0),u.push(0,y,0),p.push(.5,.5),g++;const S=g;for(let B=0;B<=i;B++){const z=B/i*l+a,Y=Math.cos(z),G=Math.sin(z);w.x=U*G,w.y=f*y,w.z=U*Y,h.push(w.x,w.y,w.z),u.push(0,y,0),E.x=Y*.5+.5,E.y=G*.5*y+.5,p.push(E.x,E.y),g++}for(let B=0;B<i;B++){const F=A+B,z=S+B;M===!0?d.push(z,z+1,F):d.push(z+1,z,F),L+=3}c.addGroup(m,L,M===!0?1:2),m+=L}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new fe(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Mn extends fe{constructor(e=1,t=1,n=32,i=1,s=!1,o=0,a=Math.PI*2){super(0,e,t,n,i,s,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:i,openEnded:s,thetaStart:o,thetaLength:a}}static fromJSON(e){return new Mn(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Wa extends Tt{constructor(e=[],t=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:i};const s=[],o=[];a(i),c(n),d(),this.setAttribute("position",new gt(s,3)),this.setAttribute("normal",new gt(s.slice(),3)),this.setAttribute("uv",new gt(o,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function a(v){const x=new C,M=new C,A=new C;for(let E=0;E<t.length;E+=3)p(t[E+0],x),p(t[E+1],M),p(t[E+2],A),l(x,M,A,v)}function l(v,x,M,A){const E=A+1,w=[];for(let L=0;L<=E;L++){w[L]=[];const U=v.clone().lerp(M,L/E),y=x.clone().lerp(M,L/E),S=E-L;for(let B=0;B<=S;B++)B===0&&L===E?w[L][B]=U:w[L][B]=U.clone().lerp(y,B/S)}for(let L=0;L<E;L++)for(let U=0;U<2*(E-L)-1;U++){const y=Math.floor(U/2);U%2===0?(u(w[L][y+1]),u(w[L+1][y]),u(w[L][y])):(u(w[L][y+1]),u(w[L+1][y+1]),u(w[L+1][y]))}}function c(v){const x=new C;for(let M=0;M<s.length;M+=3)x.x=s[M+0],x.y=s[M+1],x.z=s[M+2],x.normalize().multiplyScalar(v),s[M+0]=x.x,s[M+1]=x.y,s[M+2]=x.z}function d(){const v=new C;for(let x=0;x<s.length;x+=3){v.x=s[x+0],v.y=s[x+1],v.z=s[x+2];const M=f(v)/2/Math.PI+.5,A=m(v)/Math.PI+.5;o.push(M,1-A)}g(),h()}function h(){for(let v=0;v<o.length;v+=6){const x=o[v+0],M=o[v+2],A=o[v+4],E=Math.max(x,M,A),w=Math.min(x,M,A);E>.9&&w<.1&&(x<.2&&(o[v+0]+=1),M<.2&&(o[v+2]+=1),A<.2&&(o[v+4]+=1))}}function u(v){s.push(v.x,v.y,v.z)}function p(v,x){const M=v*3;x.x=e[M+0],x.y=e[M+1],x.z=e[M+2]}function g(){const v=new C,x=new C,M=new C,A=new C,E=new qe,w=new qe,L=new qe;for(let U=0,y=0;U<s.length;U+=9,y+=6){v.set(s[U+0],s[U+1],s[U+2]),x.set(s[U+3],s[U+4],s[U+5]),M.set(s[U+6],s[U+7],s[U+8]),E.set(o[y+0],o[y+1]),w.set(o[y+2],o[y+3]),L.set(o[y+4],o[y+5]),A.copy(v).add(x).add(M).divideScalar(3);const S=f(A);_(E,y+0,v,S),_(w,y+2,x,S),_(L,y+4,M,S)}}function _(v,x,M,A){A<0&&v.x===1&&(o[x]=v.x-1),M.x===0&&M.z===0&&(o[x]=A/2/Math.PI+.5)}function f(v){return Math.atan2(v.z,-v.x)}function m(v){return Math.atan2(-v.y,Math.sqrt(v.x*v.x+v.z*v.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Wa(e.vertices,e.indices,e.radius,e.details)}}const or=new C,ar=new C,_o=new C,lr=new on;class Qt extends Tt{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){const i=Math.pow(10,4),s=Math.cos(Fi*t),o=e.getIndex(),a=e.getAttribute("position"),l=o?o.count:a.count,c=[0,0,0],d=["a","b","c"],h=new Array(3),u={},p=[];for(let g=0;g<l;g+=3){o?(c[0]=o.getX(g),c[1]=o.getX(g+1),c[2]=o.getX(g+2)):(c[0]=g,c[1]=g+1,c[2]=g+2);const{a:_,b:f,c:m}=lr;if(_.fromBufferAttribute(a,c[0]),f.fromBufferAttribute(a,c[1]),m.fromBufferAttribute(a,c[2]),lr.getNormal(_o),h[0]=`${Math.round(_.x*i)},${Math.round(_.y*i)},${Math.round(_.z*i)}`,h[1]=`${Math.round(f.x*i)},${Math.round(f.y*i)},${Math.round(f.z*i)}`,h[2]=`${Math.round(m.x*i)},${Math.round(m.y*i)},${Math.round(m.z*i)}`,!(h[0]===h[1]||h[1]===h[2]||h[2]===h[0]))for(let v=0;v<3;v++){const x=(v+1)%3,M=h[v],A=h[x],E=lr[d[v]],w=lr[d[x]],L=`${M}_${A}`,U=`${A}_${M}`;U in u&&u[U]?(_o.dot(u[U].normal)<=s&&(p.push(E.x,E.y,E.z),p.push(w.x,w.y,w.z)),u[U]=null):L in u||(u[L]={index0:c[v],index1:c[x],normal:_o.clone()})}}for(const g in u)if(u[g]){const{index0:_,index1:f}=u[g];or.fromBufferAttribute(a,_),ar.fromBufferAttribute(a,f),p.push(or.x,or.y,or.z),p.push(ar.x,ar.y,ar.z)}this.setAttribute("position",new gt(p,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}class Xa extends Wa{constructor(e=1,t=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],i=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,i,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Xa(e.radius,e.detail)}}class qa extends Tt{constructor(e=.5,t=1,n=32,i=1,s=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:i,thetaStart:s,thetaLength:o},n=Math.max(3,n),i=Math.max(1,i);const a=[],l=[],c=[],d=[];let h=e;const u=(t-e)/i,p=new C,g=new qe;for(let _=0;_<=i;_++){for(let f=0;f<=n;f++){const m=s+f/n*o;p.x=h*Math.cos(m),p.y=h*Math.sin(m),l.push(p.x,p.y,p.z),c.push(0,0,1),g.x=(p.x/t+1)/2,g.y=(p.y/t+1)/2,d.push(g.x,g.y)}h+=u}for(let _=0;_<i;_++){const f=_*(n+1);for(let m=0;m<n;m++){const v=m+f,x=v,M=v+n+1,A=v+n+2,E=v+1;a.push(x,M,E),a.push(M,A,E)}}this.setIndex(a),this.setAttribute("position",new gt(l,3)),this.setAttribute("normal",new gt(c,3)),this.setAttribute("uv",new gt(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new qa(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class Un extends Tt{constructor(e=1,t=32,n=16,i=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:s,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(o+a,Math.PI);let c=0;const d=[],h=new C,u=new C,p=[],g=[],_=[],f=[];for(let m=0;m<=n;m++){const v=[],x=m/n;let M=0;m===0&&o===0?M=.5/t:m===n&&l===Math.PI&&(M=-.5/t);for(let A=0;A<=t;A++){const E=A/t;h.x=-e*Math.cos(i+E*s)*Math.sin(o+x*a),h.y=e*Math.cos(o+x*a),h.z=e*Math.sin(i+E*s)*Math.sin(o+x*a),g.push(h.x,h.y,h.z),u.copy(h).normalize(),_.push(u.x,u.y,u.z),f.push(E+M,1-x),v.push(c++)}d.push(v)}for(let m=0;m<n;m++)for(let v=0;v<t;v++){const x=d[m][v+1],M=d[m][v],A=d[m+1][v],E=d[m+1][v+1];(m!==0||o>0)&&p.push(x,M,E),(m!==n-1||l<Math.PI)&&p.push(M,A,E)}this.setIndex(p),this.setAttribute("position",new gt(g,3)),this.setAttribute("normal",new gt(_,3)),this.setAttribute("uv",new gt(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Un(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class ie extends vn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new De(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new De(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=jc,this.normalScale=new qe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new wt,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Tn extends ie{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new qe(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return kt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new De(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new De(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new De(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}function cr(r,e,t){return!r||!t&&r.constructor===e?r:typeof e.BYTES_PER_ELEMENT=="number"?new e(r):Array.prototype.slice.call(r)}function $0(r){return ArrayBuffer.isView(r)&&!(r instanceof DataView)}function J0(r){function e(i,s){return r[i]-r[s]}const t=r.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function mc(r,e,t){const n=r.length,i=new r.constructor(n);for(let s=0,o=0;o!==n;++s){const a=t[s]*e;for(let l=0;l!==e;++l)i[o++]=r[a+l]}return i}function ph(r,e,t,n){let i=1,s=r[0];for(;s!==void 0&&s[n]===void 0;)s=r[i++];if(s===void 0)return;let o=s[n];if(o!==void 0)if(Array.isArray(o))do o=s[n],o!==void 0&&(e.push(s.time),t.push.apply(t,o)),s=r[i++];while(s!==void 0);else if(o.toArray!==void 0)do o=s[n],o!==void 0&&(e.push(s.time),o.toArray(t,t.length)),s=r[i++];while(s!==void 0);else do o=s[n],o!==void 0&&(e.push(s.time),t.push(o)),s=r[i++];while(s!==void 0)}class Ps{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,i=t[n],s=t[n-1];n:{e:{let o;t:{i:if(!(e<i)){for(let a=n+2;;){if(i===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(s=i,i=t[++n],e<i)break e}o=t.length;break t}if(!(e>=s)){const a=t[1];e<a&&(n=2,s=a);for(let l=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=s,s=t[--n-1],e>=s)break e}o=n,n=0;break t}break n}for(;n<o;){const a=n+o>>>1;e<t[a]?o=a:n=a+1}if(i=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i;for(let o=0;o!==i;++o)t[o]=n[s+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class Q0 extends Ps{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:al,endingEnd:al}}intervalChanged_(e,t,n){const i=this.parameterPositions;let s=e-2,o=e+1,a=i[s],l=i[o];if(a===void 0)switch(this.getSettings_().endingStart){case ll:s=e,a=2*t-n;break;case cl:s=i.length-2,a=t+i[s]-i[s+1];break;default:s=e,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case ll:o=e,l=2*n-t;break;case cl:o=1,l=n+i[1]-i[0];break;default:o=e-1,l=t}const c=(n-t)*.5,d=this.valueSize;this._weightPrev=c/(t-a),this._weightNext=c/(l-n),this._offsetPrev=s*d,this._offsetNext=o*d}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,d=this._offsetPrev,h=this._offsetNext,u=this._weightPrev,p=this._weightNext,g=(n-t)/(i-t),_=g*g,f=_*g,m=-u*f+2*u*_-u*g,v=(1+u)*f+(-1.5-2*u)*_+(-.5+u)*g+1,x=(-1-p)*f+(1.5+p)*_+.5*g,M=p*f-p*_;for(let A=0;A!==a;++A)s[A]=m*o[d+A]+v*o[c+A]+x*o[l+A]+M*o[h+A];return s}}class eg extends Ps{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,d=(n-t)/(i-t),h=1-d;for(let u=0;u!==a;++u)s[u]=o[c+u]*h+o[l+u]*d;return s}}class tg extends Ps{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}}class wn{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=cr(t,this.TimeBufferType),this.values=cr(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:cr(e.times,Array),values:cr(e.values,Array)};const i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new tg(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new eg(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Q0(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Ts:t=this.InterpolantFactoryMethodDiscrete;break;case ws:t=this.InterpolantFactoryMethodLinear;break;case Fr:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Ts;case this.InterpolantFactoryMethodLinear:return ws;case this.InterpolantFactoryMethodSmooth:return Fr}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){const n=this.times,i=n.length;let s=0,o=i-1;for(;s!==i&&n[s]<e;)++s;for(;o!==-1&&n[o]>t;)--o;if(++o,s!==0||o!==i){s>=o&&(o=Math.max(o,1),s=o-1);const a=this.getValueSize();this.times=n.slice(s,o),this.values=this.values.slice(s*a,o*a)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,i=this.values,s=n.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==s;a++){const l=n[a];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,l),e=!1;break}if(o!==null&&o>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,l,o),e=!1;break}o=l}if(i!==void 0&&$0(i))for(let a=0,l=i.length;a!==l;++a){const c=i[a];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,c),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===Fr,s=e.length-1;let o=1;for(let a=1;a<s;++a){let l=!1;const c=e[a],d=e[a+1];if(c!==d&&(a!==1||c!==e[0]))if(i)l=!0;else{const h=a*n,u=h-n,p=h+n;for(let g=0;g!==n;++g){const _=t[h+g];if(_!==t[u+g]||_!==t[p+g]){l=!0;break}}}if(l){if(a!==o){e[o]=e[a];const h=a*n,u=o*n;for(let p=0;p!==n;++p)t[u+p]=t[h+p]}++o}}if(s>0){e[o]=e[s];for(let a=s*n,l=o*n,c=0;c!==n;++c)t[l+c]=t[a+c];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}}wn.prototype.TimeBufferType=Float32Array;wn.prototype.ValueBufferType=Float32Array;wn.prototype.DefaultInterpolation=ws;class ts extends wn{constructor(e,t,n){super(e,t,n)}}ts.prototype.ValueTypeName="bool";ts.prototype.ValueBufferType=Array;ts.prototype.DefaultInterpolation=Ts;ts.prototype.InterpolantFactoryMethodLinear=void 0;ts.prototype.InterpolantFactoryMethodSmooth=void 0;class mh extends wn{}mh.prototype.ValueTypeName="color";class ji extends wn{}ji.prototype.ValueTypeName="number";class ng extends Ps{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(n-t)/(i-t);let c=e*a;for(let d=c+a;c!==d;c+=4)ei.slerpFlat(s,0,o,c-a,o,c,l);return s}}class Zi extends wn{InterpolantFactoryMethodLinear(e){return new ng(this.times,this.values,this.getValueSize(),e)}}Zi.prototype.ValueTypeName="quaternion";Zi.prototype.InterpolantFactoryMethodSmooth=void 0;class ns extends wn{constructor(e,t,n){super(e,t,n)}}ns.prototype.ValueTypeName="string";ns.prototype.ValueBufferType=Array;ns.prototype.DefaultInterpolation=Ts;ns.prototype.InterpolantFactoryMethodLinear=void 0;ns.prototype.InterpolantFactoryMethodSmooth=void 0;class $i extends wn{}$i.prototype.ValueTypeName="vector";class ig{constructor(e="",t=-1,n=[],i=td){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=gn(),this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,i=1/(e.fps||1);for(let o=0,a=n.length;o!==a;++o)t.push(rg(n[o]).scale(i));const s=new this(e.name,e.duration,t,e.blendMode);return s.uuid=e.uuid,s}static toJSON(e){const t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let s=0,o=n.length;s!==o;++s)t.push(wn.toJSON(n[s]));return i}static CreateFromMorphTargetSequence(e,t,n,i){const s=t.length,o=[];for(let a=0;a<s;a++){let l=[],c=[];l.push((a+s-1)%s,a,(a+1)%s),c.push(0,1,0);const d=J0(l);l=mc(l,1,d),c=mc(c,1,d),!i&&l[0]===0&&(l.push(s),c.push(c[0])),o.push(new ji(".morphTargetInfluences["+t[a].name+"]",l,c).scale(1/n))}return new this(e,-1,o)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const i={},s=/^([\w-]*?)([\d]+)$/;for(let a=0,l=e.length;a<l;a++){const c=e[a],d=c.name.match(s);if(d&&d.length>1){const h=d[1];let u=i[h];u||(i[h]=u=[]),u.push(c)}}const o=[];for(const a in i)o.push(this.CreateFromMorphTargetSequence(a,i[a],t,n));return o}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(h,u,p,g,_){if(p.length!==0){const f=[],m=[];ph(p,f,m,g),f.length!==0&&_.push(new h(u,f,m))}},i=[],s=e.name||"default",o=e.fps||30,a=e.blendMode;let l=e.length||-1;const c=e.hierarchy||[];for(let h=0;h<c.length;h++){const u=c[h].keys;if(!(!u||u.length===0))if(u[0].morphTargets){const p={};let g;for(g=0;g<u.length;g++)if(u[g].morphTargets)for(let _=0;_<u[g].morphTargets.length;_++)p[u[g].morphTargets[_]]=-1;for(const _ in p){const f=[],m=[];for(let v=0;v!==u[g].morphTargets.length;++v){const x=u[g];f.push(x.time),m.push(x.morphTarget===_?1:0)}i.push(new ji(".morphTargetInfluence["+_+"]",f,m))}l=p.length*o}else{const p=".bones["+t[h].name+"]";n($i,p+".position",u,"pos",i),n(Zi,p+".quaternion",u,"rot",i),n($i,p+".scale",u,"scl",i)}}return i.length===0?null:new this(s,l,i,a)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,i=e.length;n!==i;++n){const s=this.tracks[n];t=Math.max(t,s.times[s.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function sg(r){switch(r.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return ji;case"vector":case"vector2":case"vector3":case"vector4":return $i;case"color":return mh;case"quaternion":return Zi;case"bool":case"boolean":return ts;case"string":return ns}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+r)}function rg(r){if(r.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=sg(r.type);if(r.times===void 0){const t=[],n=[];ph(r.keys,t,n,"value"),r.times=t,r.values=n}return e.parse!==void 0?e.parse(r):new e(r.name,r.times,r.values,r.interpolation)}const Zn={enabled:!1,files:{},add:function(r,e){this.enabled!==!1&&(this.files[r]=e)},get:function(r){if(this.enabled!==!1)return this.files[r]},remove:function(r){delete this.files[r]},clear:function(){this.files={}}};class og{constructor(e,t,n){const i=this;let s=!1,o=0,a=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(d){a++,s===!1&&i.onStart!==void 0&&i.onStart(d,o,a),s=!0},this.itemEnd=function(d){o++,i.onProgress!==void 0&&i.onProgress(d,o,a),o===a&&(s=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(d){i.onError!==void 0&&i.onError(d)},this.resolveURL=function(d){return l?l(d):d},this.setURLModifier=function(d){return l=d,this},this.addHandler=function(d,h){return c.push(d,h),this},this.removeHandler=function(d){const h=c.indexOf(d);return h!==-1&&c.splice(h,2),this},this.getHandler=function(d){for(let h=0,u=c.length;h<u;h+=2){const p=c[h],g=c[h+1];if(p.global&&(p.lastIndex=0),p.test(d))return g}return null}}}const ag=new og;class is{constructor(e){this.manager=e!==void 0?e:ag,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(i,s){n.load(e,i,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}is.DEFAULT_MATERIAL_NAME="__DEFAULT";const Ln={};class lg extends Error{constructor(e,t){super(e),this.response=t}}class gh extends is{constructor(e){super(e)}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=Zn.get(e);if(s!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(s),this.manager.itemEnd(e)},0),s;if(Ln[e]!==void 0){Ln[e].push({onLoad:t,onProgress:n,onError:i});return}Ln[e]=[],Ln[e].push({onLoad:t,onProgress:n,onError:i});const o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),a=this.mimeType,l=this.responseType;fetch(o).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const d=Ln[e],h=c.body.getReader(),u=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),p=u?parseInt(u):0,g=p!==0;let _=0;const f=new ReadableStream({start(m){v();function v(){h.read().then(({done:x,value:M})=>{if(x)m.close();else{_+=M.byteLength;const A=new ProgressEvent("progress",{lengthComputable:g,loaded:_,total:p});for(let E=0,w=d.length;E<w;E++){const L=d[E];L.onProgress&&L.onProgress(A)}m.enqueue(M),v()}},x=>{m.error(x)})}}});return new Response(f)}else throw new lg(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(d=>new DOMParser().parseFromString(d,a));case"json":return c.json();default:if(a===void 0)return c.text();{const h=/charset="?([^;"\s]*)"?/i.exec(a),u=h&&h[1]?h[1].toLowerCase():void 0,p=new TextDecoder(u);return c.arrayBuffer().then(g=>p.decode(g))}}}).then(c=>{Zn.add(e,c);const d=Ln[e];delete Ln[e];for(let h=0,u=d.length;h<u;h++){const p=d[h];p.onLoad&&p.onLoad(c)}}).catch(c=>{const d=Ln[e];if(d===void 0)throw this.manager.itemError(e),c;delete Ln[e];for(let h=0,u=d.length;h<u;h++){const p=d[h];p.onError&&p.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}}class cg extends is{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,o=Zn.get(e);if(o!==void 0)return s.manager.itemStart(e),setTimeout(function(){t&&t(o),s.manager.itemEnd(e)},0),o;const a=Es("img");function l(){d(),Zn.add(e,this),t&&t(this),s.manager.itemEnd(e)}function c(h){d(),i&&i(h),s.manager.itemError(e),s.manager.itemEnd(e)}function d(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),s.manager.itemStart(e),a.src=e,a}}class hg extends is{constructor(e){super(e)}load(e,t,n,i){const s=new Et,o=new cg(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){s.image=a,s.needsUpdate=!0,t!==void 0&&t(s)},n,i),s}}class Ls extends yt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new De(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class dg extends Ls{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(yt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new De(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const xo=new ze,gc=new C,_c=new C;class Ka{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new qe(512,512),this.map=null,this.mapPass=null,this.matrix=new ze,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Oa,this._frameExtents=new qe(1,1),this._viewportCount=1,this._viewports=[new rt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;gc.setFromMatrixPosition(e.matrixWorld),t.position.copy(gc),_c.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(_c),t.updateMatrixWorld(),xo.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(xo),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(xo)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class ug extends Ka{constructor(){super(new zt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){const t=this.camera,n=Ki*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height,s=e.distance||t.far;(n!==t.fov||i!==t.aspect||s!==t.far)&&(t.fov=n,t.aspect=i,t.far=s,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class fg extends Ls{constructor(e,t,n=0,i=Math.PI/3,s=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(yt.DEFAULT_UP),this.updateMatrix(),this.target=new yt,this.distance=n,this.angle=i,this.penumbra=s,this.decay=o,this.map=null,this.shadow=new ug}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const xc=new ze,fs=new C,yo=new C;class pg extends Ka{constructor(){super(new zt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new qe(4,2),this._viewportCount=6,this._viewports=[new rt(2,1,1,1),new rt(0,1,1,1),new rt(3,1,1,1),new rt(1,1,1,1),new rt(3,0,1,1),new rt(1,0,1,1)],this._cubeDirections=[new C(1,0,0),new C(-1,0,0),new C(0,0,1),new C(0,0,-1),new C(0,1,0),new C(0,-1,0)],this._cubeUps=[new C(0,1,0),new C(0,1,0),new C(0,1,0),new C(0,1,0),new C(0,0,1),new C(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,i=this.matrix,s=e.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),fs.setFromMatrixPosition(e.matrixWorld),n.position.copy(fs),yo.copy(n.position),yo.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(yo),n.updateMatrixWorld(),i.makeTranslation(-fs.x,-fs.y,-fs.z),xc.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(xc)}}class xs extends Ls{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new pg}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class mg extends Ka{constructor(){super(new Fa(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class As extends Ls{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(yt.DEFAULT_UP),this.updateMatrix(),this.target=new yt,this.shadow=new mg}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class gg extends Ls{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class Ms{static decodeText(e){if(console.warn("THREE.LoaderUtils: decodeText() has been deprecated with r165 and will be removed with r175. Use TextDecoder instead."),typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let n=0,i=e.length;n<i;n++)t+=String.fromCharCode(e[n]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}class _g extends is{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,o=Zn.get(e);if(o!==void 0){if(s.manager.itemStart(e),o.then){o.then(c=>{t&&t(c),s.manager.itemEnd(e)}).catch(c=>{i&&i(c)});return}return setTimeout(function(){t&&t(o),s.manager.itemEnd(e)},0),o}const a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader;const l=fetch(e,a).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(s.options,{colorSpaceConversion:"none"}))}).then(function(c){return Zn.add(e,c),t&&t(c),s.manager.itemEnd(e),c}).catch(function(c){i&&i(c),Zn.remove(e),s.manager.itemError(e),s.manager.itemEnd(e)});Zn.add(e,l),s.manager.itemStart(e)}}class xg{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=yc(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=yc();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}function yc(){return performance.now()}const Ya="\\[\\]\\.:\\/",yg=new RegExp("["+Ya+"]","g"),ja="[^"+Ya+"]",vg="[^"+Ya.replace("\\.","")+"]",Mg=/((?:WC+[\/:])*)/.source.replace("WC",ja),Sg=/(WCOD+)?/.source.replace("WCOD",vg),bg=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",ja),Tg=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",ja),wg=new RegExp("^"+Mg+Sg+bg+Tg+"$"),Eg=["material","materials","bones","map"];class Ag{constructor(e,t,n){const i=n||dt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,s=n.length;i!==s;++i)n[i].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class dt{constructor(e,t,n){this.path=t,this.parsedPath=n||dt.parseTrackName(t),this.node=dt.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new dt.Composite(e,t,n):new dt(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(yg,"")}static parseTrackName(e){const t=wg.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){const s=n.nodeName.substring(i+1);Eg.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(s){for(let o=0;o<s.length;o++){const a=s[o];if(a.name===t||a.uuid===t)return a;const l=n(a.children);if(l)return l}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,i=t.propertyName;let s=t.propertyIndex;if(e||(e=dt.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let d=0;d<e.length;d++)if(e[d].name===c){c=d;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}const o=e[i];if(o===void 0){const c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=s}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}dt.Composite=Ag;dt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};dt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};dt.prototype.GetterByBindingType=[dt.prototype._getValue_direct,dt.prototype._getValue_array,dt.prototype._getValue_arrayElement,dt.prototype._getValue_toArray];dt.prototype.SetterByBindingTypeAndVersioning=[[dt.prototype._setValue_direct,dt.prototype._setValue_direct_setNeedsUpdate,dt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[dt.prototype._setValue_array,dt.prototype._setValue_array_setNeedsUpdate,dt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[dt.prototype._setValue_arrayElement,dt.prototype._setValue_arrayElement_setNeedsUpdate,dt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[dt.prototype._setValue_fromArray,dt.prototype._setValue_fromArray_setNeedsUpdate,dt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];const vc=new ze;class Rg{constructor(e,t,n=0,i=1/0){this.ray=new Qi(e,t),this.near=n,this.far=i,this.camera=null,this.layers=new Ba,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return vc.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(vc),this}intersectObject(e,t=!0,n=[]){return ya(e,this,n,t),n.sort(Mc),n}intersectObjects(e,t=!0,n=[]){for(let i=0,s=e.length;i<s;i++)ya(e[i],this,n,t);return n.sort(Mc),n}}function Mc(r,e){return r.distance-e.distance}function ya(r,e,t,n){let i=!0;if(r.layers.test(e.layers)&&r.raycast(e,t)===!1&&(i=!1),i===!0&&n===!0){const s=r.children;for(let o=0,a=s.length;o<a;o++)ya(s[o],e,t,!0)}}class Cg extends Wt{constructor(e,t=16776960){const n=new Uint16Array([0,1,1,2,2,3,3,0,4,5,5,6,6,7,7,4,0,4,1,5,2,6,3,7]),i=[1,1,1,-1,1,1,-1,-1,1,1,-1,1,1,1,-1,-1,1,-1,-1,-1,-1,1,-1,-1],s=new Tt;s.setIndex(new Lt(n,1)),s.setAttribute("position",new gt(i,3)),super(s,new Dt({color:t,toneMapped:!1})),this.box=e,this.type="Box3Helper",this.geometry.computeBoundingSphere()}updateMatrixWorld(e){const t=this.box;t.isEmpty()||(t.getCenter(this.position),t.getSize(this.scale),this.scale.multiplyScalar(.5),super.updateMatrixWorld(e))}dispose(){this.geometry.dispose(),this.material.dispose()}}class Pg extends gi{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Ea}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Ea);const Di=new wt(0,0,0,"YXZ"),Ni=new C,Lg={type:"change"},Ig={type:"lock"},Dg={type:"unlock"},Sc=Math.PI/2;class Ng extends Pg{constructor(e,t=null){super(e,t),this.isLocked=!1,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.pointerSpeed=1,this._onMouseMove=Ug.bind(this),this._onPointerlockChange=Bg.bind(this),this._onPointerlockError=Og.bind(this),this.domElement!==null&&this.connect()}connect(){this.domElement.ownerDocument.addEventListener("mousemove",this._onMouseMove),this.domElement.ownerDocument.addEventListener("pointerlockchange",this._onPointerlockChange),this.domElement.ownerDocument.addEventListener("pointerlockerror",this._onPointerlockError)}disconnect(){this.domElement.ownerDocument.removeEventListener("mousemove",this._onMouseMove),this.domElement.ownerDocument.removeEventListener("pointerlockchange",this._onPointerlockChange),this.domElement.ownerDocument.removeEventListener("pointerlockerror",this._onPointerlockError)}dispose(){this.disconnect()}getObject(){return console.warn("THREE.PointerLockControls: getObject() has been deprecated. Use controls.object instead."),this.object}getDirection(e){return e.set(0,0,-1).applyQuaternion(this.object.quaternion)}moveForward(e){if(this.enabled===!1)return;const t=this.object;Ni.setFromMatrixColumn(t.matrix,0),Ni.crossVectors(t.up,Ni),t.position.addScaledVector(Ni,e)}moveRight(e){if(this.enabled===!1)return;const t=this.object;Ni.setFromMatrixColumn(t.matrix,0),t.position.addScaledVector(Ni,e)}lock(){this.domElement.requestPointerLock()}unlock(){this.domElement.ownerDocument.exitPointerLock()}}function Ug(r){if(this.enabled===!1||this.isLocked===!1)return;const e=r.movementX||r.mozMovementX||r.webkitMovementX||0,t=r.movementY||r.mozMovementY||r.webkitMovementY||0,n=this.object;Di.setFromQuaternion(n.quaternion),Di.y-=e*.002*this.pointerSpeed,Di.x-=t*.002*this.pointerSpeed,Di.x=Math.max(Sc-this.maxPolarAngle,Math.min(Sc-this.minPolarAngle,Di.x)),n.quaternion.setFromEuler(Di),this.dispatchEvent(Lg)}function Bg(){this.domElement.ownerDocument.pointerLockElement===this.domElement?(this.dispatchEvent(Ig),this.isLocked=!0):(this.dispatchEvent(Dg),this.isLocked=!1)}function Og(){console.error("THREE.PointerLockControls: Unable to use Pointer Lock API")}class Fg{constructor(){this._listeners={}}on(e,t){return this._listeners[e]||(this._listeners[e]=[]),this._listeners[e].push(t),()=>this.off(e,t)}off(e,t){this._listeners[e]&&(this._listeners[e]=this._listeners[e].filter(n=>n!==t))}emit(e,...t){this._listeners[e]&&this._listeners[e].forEach(n=>n(...t))}once(e,t){const n=(...i)=>{t(...i),this.off(e,n)};this.on(e,n)}}const Re=new Fg;class kg{constructor(){this.scene=new ec,this.camera=new zt(90,window.innerWidth/window.innerHeight,.05,500),this.renderer=new V0({antialias:!0,powerPreference:"high-performance",preserveDrawingBuffer:!1}),this.controls=null,this.clock=new xg,this.running=!1,this._frameId=null,this._updateFns=[],this._isRecording=!1,this.scene.add(this.camera),this.viewmodelScene=new ec,this.viewmodelCamera=new zt(70,window.innerWidth/window.innerHeight,.01,50),this.viewmodelScene.add(this.viewmodelCamera),this._initRenderer(),this._initControls(),this._handleResize()}_initRenderer(){this.renderer.setSize(window.innerWidth,window.innerHeight),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=Nc,this.renderer.outputColorSpace=Ft,this.renderer.toneMapping=Bc,this.renderer.toneMappingExposure=1.1,this.renderer.setClearColor(7385850,1),this.scene.background=new De(7385850);const e=document.getElementById("canvas-wrapper");e&&(e.innerHTML="",e.appendChild(this.renderer.domElement))}_initControls(){this.controls=new Ng(this.camera,this.renderer.domElement),this.controls.addEventListener("lock",()=>{Re.emit("controls:locked")}),this.controls.addEventListener("unlock",()=>{Re.emit("controls:unlocked")}),document.getElementById("game-container").addEventListener("click",t=>{const n=document.getElementById("play-overlay");n&&!n.classList.contains("hidden")||t.target.closest("button")||t.target.closest("#po-play-btn")||this.controls.isLocked||this.controls.lock()})}_handleResize(){window.addEventListener("resize",()=>this.resize())}resize(){const e=window.innerWidth,t=window.innerHeight;this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.viewmodelCamera.aspect=e/t,this.viewmodelCamera.updateProjectionMatrix(),this.renderer.setSize(e,t)}addUpdateFn(e){this._updateFns.push(e)}removeUpdateFn(e){this._updateFns=this._updateFns.filter(t=>t!==e)}start(){this.running||(this.running=!0,this.clock.start(),this.resize(),this._loop())}stop(){this.running=!1,this._frameId&&cancelAnimationFrame(this._frameId),this._frameId=null}_loop(){this._frameId=requestAnimationFrame(()=>this._loop());const e=Math.min(this.clock.getDelta(),.05);for(const t of this._updateFns)t(e);this.renderer.autoClear=!1,this.renderer.clear(),this.renderer.render(this.scene,this.camera),this.renderer.clearDepth(),this.renderer.render(this.viewmodelScene,this.viewmodelCamera)}get isLocked(){var e;return((e=this.controls)==null?void 0:e.isLocked)??!1}lockPointer(){var e;(e=this.controls)==null||e.lock()}unlockPointer(){var e;(e=this.controls)==null||e.unlock()}captureScreenshot(){try{this.renderer.autoClear=!1,this.renderer.clear(),this.renderer.render(this.scene,this.camera),this.renderer.clearDepth(),this.renderer.render(this.viewmodelScene,this.viewmodelCamera);const e=this.renderer.domElement.toDataURL("image/png"),t=document.createElement("a"),n=new Date().toISOString().replace(/[:.]/g,"-").slice(0,19);return t.download=`palo-io-screenshot-${n}.png`,t.href=e,document.body.appendChild(t),t.click(),document.body.removeChild(t),Re.emit("screenshot:taken"),!0}catch(e){return console.error("Failed to capture screenshot:",e),!1}}recordClip(e=3e3,t=null){var i;if(this._isRecording)return!1;const n=(i=this.renderer)==null?void 0:i.domElement;if(!n)return!1;try{const s=n.captureStream?n.captureStream(60):n.mozCaptureStream?n.mozCaptureStream(60):null;if(!s)return console.warn("captureStream is not supported in this browser."),!1;const o=["video/mp4;codecs=avc1","video/mp4;codecs=h264","video/mp4","video/webm;codecs=h264","video/webm;codecs=vp8","video/webm;codecs=vp9","video/webm"];let a="";if(window.MediaRecorder&&typeof MediaRecorder.isTypeSupported=="function"){for(const p of o)if(MediaRecorder.isTypeSupported(p)){a=p;break}}const l=a?{mimeType:a,videoBitsPerSecond:4e6}:void 0,c=new MediaRecorder(s,l),d=[];this._isRecording=!0,c.ondataavailable=p=>{p.data&&p.data.size>0&&d.push(p.data)};const h=performance.now();let u=null;return t&&(t(e/1e3),u=setInterval(()=>{const p=performance.now()-h,g=Math.max(0,(e-p)/1e3);t(g)},100)),c.onstop=()=>{this._isRecording=!1,u&&clearInterval(u);try{const p=c.mimeType||a||"video/mp4",_=p.toLowerCase().includes("mp4")?"mp4":"webm",f=new Blob(d,{type:p}),m=URL.createObjectURL(f),v=document.createElement("a"),x=new Date().toISOString().replace(/[:.]/g,"-").slice(0,19);v.download=`palo-io-clip-${x}.${_}`,v.href=m,document.body.appendChild(v),v.click(),document.body.removeChild(v),setTimeout(()=>URL.revokeObjectURL(m),1e4),Re.emit("record:completed",{durationMs:e,ext:_})}catch(p){console.error("Error saving recorded video:",p)}},c.start(100),Re.emit("record:started",{durationMs:e}),setTimeout(()=>{c.state!=="inactive"&&c.stop()},e),!0}catch(s){return this._isRecording=!1,console.error("Failed to start recording clip:",s),!1}}}function zg(){const r=document.createElement("canvas");r.width=1024,r.height=1024;const e=r.getContext("2d");e.fillStyle="#8f8072",e.fillRect(0,0,1024,1024);const t=128,n=["#f4ede2","#ebdccb","#f7f1e6","#e7dabf","#efe5d6","#f2e8da","#e2d3be","#eadecd"];for(let o=0;o<8;o++)for(let a=0;a<8;a++){const l=a*t,c=o*t,d=(o*3+a*5+o*a)%n.length;e.fillStyle=n[d],e.fillRect(l+4,c+4,t-8,t-8);const h=e.createLinearGradient(l,c,l+t,c+t);h.addColorStop(0,"rgba(255, 255, 255, 0.55)"),h.addColorStop(.5,"rgba(255, 255, 255, 0.10)"),h.addColorStop(1,"rgba(120, 100, 80, 0.14)"),e.fillStyle=h,e.fillRect(l+4,c+4,t-8,t-8),e.fillStyle="rgba(255, 255, 255, 0.85)",e.fillRect(l+4,c+4,t-8,3),e.fillRect(l+4,c+4,3,t-8),e.fillStyle="rgba(90, 75, 60, 0.38)",e.fillRect(l+4,c+t-7,t-8,3),e.fillRect(l+t-7,c+4,3,t-8),e.fillStyle="#9a8b7c",(o+a)%2===0?(e.fillRect(l+t/2-1,c+4,3,t-8),e.fillStyle="rgba(255, 255, 255, 0.4)",e.fillRect(l+t/2+2,c+4,1,t-8)):(e.fillRect(l+4,c+t/2-1,t-8,3),e.fillStyle="rgba(255, 255, 255, 0.4)",e.fillRect(l+4,c+t/2+2,t-8,1))}for(let o=0;o<22e3;o++){const a=Math.random()*1024,l=Math.random()*1024,c=Math.random()>.4;e.fillStyle=c?"rgba(255, 255, 255, 0.35)":"rgba(140, 120, 100, 0.18)",e.fillRect(a,l,2,2)}e.strokeStyle="#f59e0b",e.lineWidth=8,e.setLineDash([36,20]),e.beginPath(),e.moveTo(64,512),e.lineTo(960,512),e.stroke(),e.setLineDash([]),e.strokeStyle="rgba(255, 255, 255, 0.75)",e.lineWidth=6,e.strokeRect(128,128,768,768),e.strokeStyle="rgba(255, 70, 85, 0.65)",e.lineWidth=4,e.strokeRect(144,144,736,736),e.strokeStyle="#00f0ff",e.lineWidth=3;const i=[256,512,768];for(const o of i)for(const a of i)e.beginPath(),e.moveTo(o-20,a),e.lineTo(o+20,a),e.moveTo(o,a-20),e.lineTo(o,a+20),e.stroke(),e.strokeRect(o-8,a-8,16,16);const s=new ut(r);return s.wrapS=Fe,s.wrapT=Fe,s.repeat.set(12,12),s.anisotropy=8,s.needsUpdate=!0,s}function Gg(){const r=document.createElement("canvas");r.width=256,r.height=256;const e=r.getContext("2d"),t=128,n=128,i=e.createRadialGradient(t,n,4,t,n,120);i.addColorStop(0,"rgba(255, 255, 255, 1)"),i.addColorStop(.12,"rgba(255, 235, 100, 0.95)"),i.addColorStop(.35,"rgba(255, 130, 20, 0.7)"),i.addColorStop(.7,"rgba(255, 50, 10, 0.25)"),i.addColorStop(1,"rgba(255, 0, 0, 0)"),e.save(),e.translate(t,n);for(let a=0;a<4;a++)e.rotate(Math.PI/2),e.beginPath(),e.moveTo(0,0),e.lineTo(-10,20),e.lineTo(0,122),e.lineTo(10,20),e.closePath(),e.fillStyle=i,e.fill();for(let a=0;a<4;a++)e.rotate(Math.PI/2),e.beginPath(),e.moveTo(0,0),e.lineTo(-6,12),e.lineTo(0,80),e.lineTo(6,12),e.closePath(),e.fillStyle=i,e.fill();e.beginPath(),e.moveTo(0,-38),e.lineTo(38,0),e.lineTo(0,38),e.lineTo(-38,0),e.closePath(),e.fillStyle="#ffffff",e.fill();const s=e.createRadialGradient(0,0,2,0,0,42);return s.addColorStop(0,"#ffffff"),s.addColorStop(.4,"rgba(255, 248, 190, 0.95)"),s.addColorStop(1,"rgba(255, 170, 30, 0)"),e.fillStyle=s,e.beginPath(),e.arc(0,0,42,0,Math.PI*2),e.fill(),e.restore(),new ut(r)}function Hg(){const r=document.createElement("canvas");r.width=1024,r.height=1024;const e=r.getContext("2d");e.fillStyle="#c5a47e",e.fillRect(0,0,1024,1024);const t=48,n=112,i=["#b8946e","#be9b74","#c9a882","#b38f69","#caa67f"];for(let o=0;o<=1024;o+=t){const l=Math.floor(o/t)%2===1?n/2:0;e.fillStyle="rgba(40, 30, 20, 0.35)",e.fillRect(0,o,1024,5);for(let c=-n+l;c<=1024;c+=n){const d=i[Math.abs(Math.floor(c/40)+Math.floor(o/20))%i.length];e.fillStyle=d,e.fillRect(c+3,o+4,n-6,t-7),e.fillStyle="rgba(255, 255, 255, 0.12)",e.fillRect(c+3,o+4,n-6,3),e.fillStyle="rgba(0, 0, 0, 0.25)",e.fillRect(c+3,o+t-6,n-6,3),e.fillStyle="rgba(40, 30, 20, 0.35)",e.fillRect(c+n-3,o,5,t)}}for(let o=0;o<8e3;o++){const a=Math.random()*1024,l=Math.random()*1024;e.fillStyle=Math.random()>.5?"rgba(255, 255, 255, 0.08)":"rgba(0, 0, 0, 0.08)",e.fillRect(a,l,2,2)}e.fillStyle="#6b543d",e.fillRect(0,930,1024,94),e.fillStyle="rgba(255, 255, 255, 0.22)",e.fillRect(0,930,1024,6),e.fillStyle="rgba(0, 0, 0, 0.4)",e.fillRect(0,936,1024,4);const s=new ut(r);return s.wrapS=Fe,s.wrapT=Fe,s.repeat.set(2,2),s.anisotropy=8,s.needsUpdate=!0,s}function Vg(){const r=document.createElement("canvas");r.width=512,r.height=512;const e=r.getContext("2d");e.fillStyle="#042f24",e.fillRect(0,0,512,512),e.fillStyle="rgba(52, 211, 153, 0.15)",e.fillRect(10,10,492,492),e.fillStyle="#064e3b",e.fillRect(24,24,464,464);const t=e.createRadialGradient(256,256,15,256,256,220);t.addColorStop(0,"#6ee7b7"),t.addColorStop(.35,"#10b981"),t.addColorStop(.7,"#059669"),t.addColorStop(1,"#022c22"),e.fillStyle=t,e.beginPath(),e.moveTo(256,60),e.lineTo(452,256),e.lineTo(256,452),e.lineTo(60,256),e.closePath(),e.fill(),e.strokeStyle="#a7f3d0",e.lineWidth=6,e.stroke(),e.strokeStyle="rgba(255, 255, 255, 0.7)",e.lineWidth=3,e.beginPath(),e.moveTo(256,110),e.lineTo(402,256),e.lineTo(256,402),e.lineTo(110,256),e.closePath(),e.stroke();const n=new ut(r);return n.anisotropy=8,n.needsUpdate=!0,n}function Wg(){const r=document.createElement("canvas");r.width=1024,r.height=1024;const e=r.getContext("2d");e.fillStyle="#4a3d35",e.fillRect(0,0,1024,1024);const t=44,n=108,i=["#a8432c","#983b24","#b54e35","#8c331d","#9e3e27","#af462f"];for(let o=0;o<=1024;o+=t){const l=Math.floor(o/t)%2===1?n/2:0;e.fillStyle="#3a2d24",e.fillRect(0,o,1024,5);for(let c=-n+l;c<=1024;c+=n){const d=Math.abs(Math.floor(c/37)+Math.floor(o/21))%i.length;e.fillStyle=i[d],e.fillRect(c+3,o+4,n-6,t-7),e.fillStyle="rgba(255, 255, 255, 0.14)",e.fillRect(c+3,o+4,n-6,2),e.fillStyle="rgba(0, 0, 0, 0.35)",e.fillRect(c+3,o+t-6,n-6,2),e.fillStyle="#3a2d24",e.fillRect(c+n-3,o,4,t)}}for(let o=0;o<9e3;o++){const a=Math.random()*1024,l=Math.random()*1024;e.fillStyle=Math.random()>.5?"rgba(255, 255, 255, 0.06)":"rgba(0, 0, 0, 0.12)",e.fillRect(a,l,2,2)}const s=new ut(r);return s.wrapS=Fe,s.wrapT=Fe,s.repeat.set(2,2),s.anisotropy=8,s.needsUpdate=!0,s}function Xg(){const r=document.createElement("canvas");r.width=512,r.height=512;const e=r.getContext("2d");e.fillStyle="#8b5a2b",e.fillRect(0,0,512,512);const t=128,n=["#966332","#8c5929","#a06a37","#855224"];for(let a=0;a<4;a++){e.fillStyle=n[a],e.fillRect(4,a*t+4,504,t-8),e.fillStyle="rgba(60, 30, 10, 0.15)";for(let l=0;l<12;l++){const c=a*t+10+l*9;e.fillRect(4,c,504,2)}e.fillStyle="#42240c",e.fillRect(0,a*t,512,4)}e.fillStyle="#334155";const i=80;e.fillRect(0,0,i,28),e.fillRect(0,0,28,i),e.fillRect(512-i,0,i,28),e.fillRect(484,0,28,i),e.fillRect(0,484,i,28),e.fillRect(0,512-i,28,i),e.fillRect(512-i,484,i,28),e.fillRect(484,512-i,28,i),e.fillStyle="#cbd5e1";const s=[[14,14],[50,14],[14,50],[498,14],[462,14],[498,50],[14,498],[50,498],[14,462],[498,498],[462,498],[498,462]];for(const[a,l]of s)e.beginPath(),e.arc(a,l,4,0,Math.PI*2),e.fill();e.fillStyle="rgba(255, 255, 255, 0.45)",e.font="bold 28px sans-serif",e.textAlign="center",e.fillText("KINGDOM",256,230),e.font="bold 18px sans-serif",e.fillText("RADIANITE CARGO // ASCENT",256,265),e.strokeRect(100,190,312,95);const o=new ut(r);return o.anisotropy=8,o.needsUpdate=!0,o}function qg(){const r=document.createElement("canvas");r.width=1024,r.height=1024;const e=r.getContext("2d");e.fillStyle="#1e2632",e.fillRect(0,0,1024,1024),e.fillStyle="#2b3544",e.fillRect(32,32,960,440),e.fillRect(32,520,960,472),e.fillStyle="#0f172a";for(let i=80;i<440;i+=32)e.fillRect(64,i,896,16),e.fillStyle="rgba(6, 182, 212, 0.45)",e.fillRect(80,i+4,864,8),e.fillStyle="#0f172a";e.fillStyle="#06b6d4",e.fillRect(64,480,896,32),e.fillStyle="#ffffff",e.fillRect(64,492,896,8);const t=e.createRadialGradient(512,750,20,512,750,180);t.addColorStop(0,"#67e8f9"),t.addColorStop(.3,"#06b6d4"),t.addColorStop(.7,"#0891b2"),t.addColorStop(1,"#0e3a47"),e.fillStyle=t,e.beginPath(),e.arc(512,750,180,0,Math.PI*2),e.fill(),e.fillStyle="#f59e0b";for(let i=0;i<8;i++)e.beginPath(),e.moveTo(120+i*100,40),e.lineTo(160+i*100,40),e.lineTo(130+i*100,70),e.lineTo(90+i*100,70),e.fill();const n=new ut(r);return n.anisotropy=8,n.needsUpdate=!0,n}function Kg(){const r=document.createElement("canvas");r.width=512,r.height=1024;const e=r.getContext("2d");e.fillStyle="#1c3330",e.fillRect(0,0,512,1024);for(let n=60;n<1e3;n+=120){e.fillStyle="#274743",e.fillRect(24,n,464,88),e.fillStyle="rgba(255, 255, 255, 0.25)",e.fillRect(24,n,464,6),e.fillStyle="rgba(0, 0, 0, 0.5)",e.fillRect(24,n+82,464,6),e.fillStyle="#94a3b8";for(let i=60;i<=450;i+=130)e.beginPath(),e.arc(i,n+44,7,0,Math.PI*2),e.fill()}e.fillStyle="#0f172a",e.fillRect(24,480,464,70),e.fillStyle="#facc15";for(let n=0;n<500;n+=50)e.beginPath(),e.moveTo(n+24,480),e.lineTo(n+50,480),e.lineTo(n+20,550),e.lineTo(n-6,550),e.fill();e.fillStyle="#475569",e.fillRect(220,440,72,150),e.fillStyle="#ef4444",e.beginPath(),e.arc(256,515,12,0,Math.PI*2),e.fill();const t=new ut(r);return t.anisotropy=8,t.needsUpdate=!0,t}function Yg(){const r=document.createElement("canvas");r.width=512,r.height=512;const e=r.getContext("2d"),t=64,n=["#15803d","#f8fafc","#dc2626","#f8fafc"];for(let s=0;s<512;s+=t){const o=Math.floor(s/t)%n.length;e.fillStyle=n[o],e.fillRect(s,0,t,512);const a=e.createLinearGradient(s,0,s+t,0);a.addColorStop(0,"rgba(0, 0, 0, 0.25)"),a.addColorStop(.5,"rgba(255, 255, 255, 0.15)"),a.addColorStop(1,"rgba(0, 0, 0, 0.25)"),e.fillStyle=a,e.fillRect(s,0,t,512)}e.fillStyle="rgba(0, 0, 0, 0.35)",e.fillRect(0,490,512,22);const i=new ut(r);return i.wrapS=Fe,i.wrapT=Fe,i.repeat.set(2,1),i.anisotropy=8,i.needsUpdate=!0,i}function jg(){const r=document.createElement("canvas");r.width=512,r.height=512;const e=r.getContext("2d");e.fillStyle="#b94827",e.fillRect(0,0,512,512);const t=32,n=64;for(let s=0;s<512;s+=n)for(let o=0;o<512;o+=t){const a=e.createLinearGradient(o,s,o+t,s);a.addColorStop(0,"#782611"),a.addColorStop(.3,"#d45d39"),a.addColorStop(.7,"#ea6e48"),a.addColorStop(1,"#66200d"),e.fillStyle=a,e.fillRect(o,s,t,n-4),e.fillStyle="rgba(0, 0, 0, 0.45)",e.fillRect(o,s+n-6,t,6)}const i=new ut(r);return i.wrapS=Fe,i.wrapT=Fe,i.repeat.set(3,3),i.anisotropy=8,i.needsUpdate=!0,i}function Zg(r){const e=document.createElement("canvas");e.width=1024,e.height=1024;const t=e.getContext("2d"),n=t.createLinearGradient(0,0,0,1024);n.addColorStop(0,"#1b6bd6"),n.addColorStop(.25,"#3b8fee"),n.addColorStop(.48,"#70b2fa"),n.addColorStop(.62,"#b2d9fc"),n.addColorStop(.7,"#e2f0fe"),n.addColorStop(.74,"#ebe2d5"),n.addColorStop(1,"#d2c4b0"),t.fillStyle=n,t.fillRect(0,0,1024,1024);const i=[{fill:"rgba(255, 255, 255, 0.85)",shadow:"rgba(180, 210, 245, 0.45)",y:220,r:55},{fill:"rgba(255, 255, 255, 0.75)",shadow:"rgba(185, 215, 245, 0.40)",y:350,r:75},{fill:"rgba(255, 255, 255, 0.60)",shadow:"rgba(200, 225, 250, 0.35)",y:480,r:90}];for(const x of i)for(let M=0;M<14;M++){const A=(M*85+Math.sin(M*3.7)*40)%1024,E=x.y+Math.cos(M*4.2)*30,w=x.r+M%3*18;t.fillStyle=x.shadow,t.beginPath(),t.arc(A,E+8,w,0,Math.PI*2),t.arc(A+w*.7,E+w*.1,w*.75,0,Math.PI*2),t.arc(A-w*.7,E+w*.15,w*.7,0,Math.PI*2),t.fill(),t.fillStyle=x.fill,t.beginPath(),t.arc(A,E,w,0,Math.PI*2),t.arc(A+w*.7,E-w*.2,w*.75,0,Math.PI*2),t.arc(A-w*.7,E-w*.1,w*.7,0,Math.PI*2),t.arc(A+w*1.3,E+w*.1,w*.6,0,Math.PI*2),t.fill()}const s=t.createRadialGradient(760,240,10,760,240,260);s.addColorStop(0,"rgba(255, 255, 240, 1.0)"),s.addColorStop(.15,"rgba(255, 245, 180, 0.75)"),s.addColorStop(.4,"rgba(255, 215, 130, 0.35)"),s.addColorStop(.75,"rgba(255, 190, 100, 0.10)"),s.addColorStop(1,"rgba(255, 190, 100, 0)"),t.fillStyle=s,t.beginPath(),t.arc(760,240,260,0,Math.PI*2),t.fill();const o=new ut(e);o.needsUpdate=!0;const a=new Un(450,36,24),l=new lt({map:o,side:qt,depthWrite:!1,depthTest:!0}),c=new P(a,l);c.position.y=0,c.renderOrder=-100,r.add(c);const d=new ke,h=[14067832,14595212,13145960,14992286],u=[12733996,12076068,13524024],p=h.map(x=>new ie({color:x,roughness:.75,metalness:.1})),g=u.map(x=>new ie({color:x,roughness:.65,metalness:.15}));for(let x=0;x<44;x++){const M=x/44*Math.PI*2,A=135+x%4*22,E=14+x%4*6,w=x===6||x===28?46:20+x%5*10,L=14+x%2*6,U=p[x%p.length],y=new q(E,w,L),S=new P(y,U);if(S.position.set(Math.cos(M)*A,w/2-.5,Math.sin(M)*A),S.receiveShadow=!0,d.add(S),x===6||x===28){const B=new ie({color:4026472,roughness:.4,metalness:.3}),F=new Mn(E*.75,16,4),z=new P(F,B);z.position.set(Math.cos(M)*A,w+7.5,Math.sin(M)*A),z.rotation.y=Math.PI/4,d.add(z)}else if(w>22){const B=g[x%g.length],F=new Mn(E*.72,8,4),z=new P(F,B);z.position.set(Math.cos(M)*A,w+3.5,Math.sin(M)*A),z.rotation.y=Math.PI/4,z.receiveShadow=!0,d.add(z)}}const _=new ie({color:5523256,roughness:.85,metalness:.15}),f=new ie({color:13935475,roughness:.7,metalness:.1}),m=new ie({color:1096065,emissive:3462041,emissiveIntensity:1.2,roughness:.2}),v=[{angle:.3,dist:175,y:32,scale:1.2},{angle:.9,dist:210,y:48,scale:1.6},{angle:1.6,dist:185,y:28,scale:1},{angle:2.3,dist:230,y:62,scale:2},{angle:3.1,dist:180,y:35,scale:1.3},{angle:3.8,dist:220,y:55,scale:1.7},{angle:4.5,dist:195,y:30,scale:1.1},{angle:5.2,dist:240,y:68,scale:2.2},{angle:5.8,dist:180,y:40,scale:1.4},{angle:6.2,dist:215,y:52,scale:1.5}];for(const x of v){const M=new ke,A=Math.cos(x.angle)*x.dist,E=Math.sin(x.angle)*x.dist;M.position.set(A,x.y,E),M.scale.set(x.scale,x.scale,x.scale);const w=new Mn(18,22,6);w.rotateX(Math.PI);const L=new P(w,_);L.position.y=-10,M.add(L);const U=new fe(18.5,17.5,3.5,7),y=new P(U,f);y.position.y=1,M.add(y);const S=new q(7,8,7),B=new P(S,f);B.position.set(2,6,-1),M.add(B);const F=new fe(2.2,2.2,5,8,1,!1,0,Math.PI),z=new P(F,f);z.rotation.z=Math.PI/2,z.position.set(2,10,-1),M.add(z);const Y=new Xa(3.5,0),G=new P(Y,m);G.position.y=-20,M.add(G),d.add(M)}return r.add(d),{skyMesh:c,bgGroup:d}}function $g(){const r=document.createElement("canvas");r.width=512,r.height=512;const e=r.getContext("2d");e.fillStyle="#dfd3c3",e.fillRect(0,0,512,512);const t=128;for(let i=0;i<4;i++){const s=i*t,o=e.createLinearGradient(0,s,0,s+t);o.addColorStop(0,"#f5efe6"),o.addColorStop(.3,"#ebdccb"),o.addColorStop(.9,"#ddcebc"),o.addColorStop(1,"#b8a795"),e.fillStyle=o,e.fillRect(0,s,512,t),e.fillStyle="rgba(160, 140, 120, 0.12)";for(let l=0;l<30;l++){const c=(l*37+i*83)%512,d=s+15+l*19%(t-30);e.fillRect(c,d,l%5+3,2)}e.fillStyle="rgba(70, 55, 45, 0.45)",e.fillRect(0,s+t-8,512,8),e.fillStyle="rgba(50, 40, 30, 0.65)",e.fillRect(0,s+t-3,512,3);const a=e.createLinearGradient(0,s,0,s+16);a.addColorStop(0,"#fde68a"),a.addColorStop(.35,"#d97706"),a.addColorStop(.8,"#b45309"),a.addColorStop(1,"#78350f"),e.fillStyle=a,e.fillRect(0,s,512,14),e.fillStyle="rgba(60, 30, 10, 0.45)";for(let l=0;l<512;l+=16)e.fillRect(l,s+2,2,10);e.fillStyle="rgba(255, 255, 255, 0.85)",e.fillRect(0,s,512,2)}const n=new ut(r);return n.wrapS=Fe,n.wrapT=Fe,n.repeat.set(1,1),n.anisotropy=8,n.needsUpdate=!0,n}function Jg(){const r=document.createElement("canvas");r.width=512,r.height=512;const e=r.getContext("2d");e.fillStyle="#4a2f1b",e.fillRect(0,0,512,512);const t=128;for(let i=0;i<4;i++){const s=i*t,o=e.createLinearGradient(0,s,0,s+t);o.addColorStop(0,"#8c5936"),o.addColorStop(.4,"#704426"),o.addColorStop(1,"#422513"),e.fillStyle=o,e.fillRect(0,s,512,t),e.strokeStyle="rgba(30, 15, 5, 0.25)",e.lineWidth=1.5;for(let a=0;a<12;a++){e.beginPath();const l=s+10+a*10;e.moveTo(0,l),e.bezierCurveTo(150,l+4,350,l-4,512,l+2),e.stroke()}e.fillStyle="rgba(255, 255, 255, 0.25)",e.fillRect(0,s,512,3),e.fillStyle="rgba(20, 10, 5, 0.65)",e.fillRect(0,s+t-6,512,6),e.fillStyle="#262626",e.beginPath(),e.arc(24,s+20,4,0,Math.PI*2),e.fill(),e.beginPath(),e.arc(488,s+20,4,0,Math.PI*2),e.fill()}const n=new ut(r);return n.wrapS=Fe,n.wrapT=Fe,n.repeat.set(1,1),n.anisotropy=8,n.needsUpdate=!0,n}function Qg(){const r=document.createElement("canvas");r.width=512,r.height=512;const e=r.getContext("2d");e.fillStyle="#2d3339",e.fillRect(0,0,512,512);const t=8,n=12,i=512/t,s=512/n,o=["#4f5861","#5d6771","#454c54","#66717d","#545d66"];for(let l=0;l<n;l++){const c=l%2*(i/2);for(let d=-1;d<=t;d++){const h=d*i+c,u=l*s,p=(l*7+d*11)%o.length;e.fillStyle=o[p],e.beginPath(),e.roundRect(h+4,u+3,i-8,s-6,6),e.fill(),e.fillStyle="rgba(255, 255, 255, 0.35)",e.beginPath(),e.roundRect(h+5,u+4,i-14,3,2),e.fill(),e.fillStyle="rgba(20, 25, 30, 0.45)",e.beginPath(),e.roundRect(h+6,u+s-7,i-12,3,2),e.fill()}}const a=new ut(r);return a.wrapS=Fe,a.wrapT=Fe,a.repeat.set(3,3),a.anisotropy=8,a.needsUpdate=!0,a}function e_(){const r=document.createElement("canvas");r.width=512,r.height=512;const e=r.getContext("2d");e.fillStyle="#c7b7a6",e.fillRect(0,0,512,512);const t=64,n=["#b85d43","#c4664a","#a85038","#cf7153","#bf6247"];for(let s=0;s<8;s++)for(let o=0;o<8;o++){const a=o*t,l=s*t,c=(s*3+o*5)%n.length;e.fillStyle=n[c],e.fillRect(a+3,l+3,t-6,t-6);const d=e.createLinearGradient(a,l,a+t,l+t);d.addColorStop(0,"rgba(255, 255, 255, 0.25)"),d.addColorStop(1,"rgba(60, 20, 10, 0.20)"),e.fillStyle=d,e.fillRect(a+3,l+3,t-6,t-6),e.fillStyle="rgba(255, 255, 255, 0.4)",e.fillRect(a+3,l+3,t-6,2),e.fillRect(a+3,l+3,2,t-6),e.fillStyle="rgba(70, 25, 15, 0.4)",e.fillRect(a+3,l+t-5,t-6,2),e.fillRect(a+t-5,l+3,2,t-6)}const i=new ut(r);return i.wrapS=Fe,i.wrapT=Fe,i.repeat.set(3,3),i.anisotropy=8,i.needsUpdate=!0,i}function bc(r="A"){const e=document.createElement("canvas");e.width=512,e.height=512;const t=e.getContext("2d");t.fillStyle="#e8dec8",t.fillRect(0,0,512,512);const n=r==="A",i=n?"#06b6d4":"#10b981",s=n?"rgba(6, 182, 212, 0.25)":"rgba(16, 185, 129, 0.25)";t.strokeStyle=i,t.lineWidth=14,t.beginPath(),t.arc(256,256,210,0,Math.PI*2),t.stroke(),t.fillStyle=s,t.beginPath(),t.arc(256,256,203,0,Math.PI*2),t.fill(),t.strokeStyle="#f8fafc",t.lineWidth=4,t.beginPath(),t.arc(256,256,175,0,Math.PI*2),t.stroke(),t.strokeStyle=i,t.lineWidth=6,t.beginPath(),t.moveTo(256,30),t.lineTo(256,90),t.moveTo(256,422),t.lineTo(256,482),t.moveTo(30,256),t.lineTo(90,256),t.moveTo(422,256),t.lineTo(482,256),t.stroke(),t.font="900 160px sans-serif",t.textAlign="center",t.textBaseline="middle",t.fillStyle=i,t.fillText(r,256,256),t.strokeStyle="#ffffff",t.lineWidth=3,t.strokeText(r,256,256);const o=new ut(e);return o.anisotropy=8,o.needsUpdate=!0,o}function t_(){const r=document.createElement("canvas");r.width=512,r.height=512;const e=r.getContext("2d");e.fillStyle="#2a6372",e.fillRect(0,0,512,512);const t=32;for(let i=0;i<16;i++){const s=i*t,o=e.createLinearGradient(0,s,0,s+t);o.addColorStop(0,"#438a9c"),o.addColorStop(.5,"#357788"),o.addColorStop(1,"#1c4a56"),e.fillStyle=o,e.fillRect(8,s+2,496,t-4),e.fillStyle="rgba(255, 255, 255, 0.45)",e.fillRect(8,s+2,496,2)}e.strokeStyle="#183c46",e.lineWidth=12,e.strokeRect(6,6,500,500);const n=new ut(r);return n.wrapS=Fe,n.wrapT=Fe,n.repeat.set(2,2),n.anisotropy=8,n.needsUpdate=!0,n}function n_(){const r=document.createElement("canvas");r.width=512,r.height=512;const e=r.getContext("2d");e.clearRect(0,0,512,512),e.strokeStyle="#2d5a27",e.lineWidth=4,e.beginPath(),e.moveTo(100,0),e.bezierCurveTo(120,180,80,320,110,512),e.moveTo(250,0),e.bezierCurveTo(230,150,270,340,240,512),e.moveTo(400,0),e.bezierCurveTo(420,200,380,360,410,512),e.stroke();const t=["#1e4620","#2d6a2e","#3b833c","#4da14e","#235326"];for(let i=0;i<90;i++){const s=40+Math.random()*432,o=20+Math.random()*472,a=16+Math.random()*22,l=Math.random()*Math.PI*2;e.save(),e.translate(s,o),e.rotate(l),e.fillStyle=t[i%t.length],e.beginPath(),e.moveTo(0,-a),e.bezierCurveTo(a*.8,-a*.8,a*.9,a*.3,0,a),e.bezierCurveTo(-a*.9,a*.3,-a*.8,-a*.8,0,-a),e.fill(),e.strokeStyle="rgba(255, 255, 255, 0.3)",e.lineWidth=1.5,e.beginPath(),e.moveTo(0,-a*.7),e.lineTo(0,a*.6),e.stroke(),e.restore()}const n=new ut(r);return n.wrapS=Fe,n.wrapT=Fe,n.repeat.set(1,2),n.anisotropy=8,n.needsUpdate=!0,n}function i_(){const r=document.createElement("canvas");r.width=128,r.height=128;const e=r.getContext("2d"),t=e.createRadialGradient(64,64,4,64,64,62);t.addColorStop(0,"rgba(20, 25, 35, 0.70)"),t.addColorStop(.35,"rgba(20, 25, 35, 0.45)"),t.addColorStop(.7,"rgba(20, 25, 35, 0.15)"),t.addColorStop(1,"rgba(0, 0, 0, 0)"),e.fillStyle=t,e.beginPath(),e.arc(64,64,62,0,Math.PI*2),e.fill();const n=new ut(r);return n.needsUpdate=!0,n}function s_(){const r=document.createElement("canvas");r.width=512,r.height=512;const e=r.getContext("2d"),t=e.createLinearGradient(0,0,512,512);t.addColorStop(0,"#0284c7"),t.addColorStop(.35,"#06b6d4"),t.addColorStop(.7,"#0891b2"),t.addColorStop(1,"#0369a1"),e.fillStyle=t,e.fillRect(0,0,512,512),e.strokeStyle="rgba(255, 255, 255, 0.45)",e.lineWidth=3;for(let i=0;i<36;i++){const s=i*73%512,o=i*97%512,a=24+i%5*8;e.beginPath(),e.arc(s,o,a,0,Math.PI*2),e.stroke(),e.fillStyle="rgba(190, 242, 255, 0.20)",e.beginPath(),e.arc(s+6,o+6,a*.7,0,Math.PI*2),e.fill()}e.fillStyle="rgba(255, 255, 255, 0.85)";for(let i=0;i<45;i++){const s=(i*41+13)%512,o=(i*59+29)%512;e.fillRect(s,o,3,3)}const n=new ut(r);return n.wrapS=Fe,n.wrapT=Fe,n.repeat.set(4,4),n.anisotropy=8,n.needsUpdate=!0,n}function r_(){const r=document.createElement("canvas");r.width=512,r.height=512;const e=r.getContext("2d");e.fillStyle="#4a1d0f",e.fillRect(0,0,512,512);const t=64;for(let i=0;i<8;i++){const s=i*t,o=e.createLinearGradient(0,s,0,s+t);o.addColorStop(0,"#7c2d12"),o.addColorStop(.4,"#6c2810"),o.addColorStop(1,"#431407"),e.fillStyle=o,e.fillRect(0,s,512,t),e.strokeStyle="rgba(30, 8, 4, 0.35)",e.lineWidth=1.8;for(let a=0;a<6;a++){e.beginPath();const l=s+8+a*9;e.moveTo(0,l),e.bezierCurveTo(160,l+3,340,l-3,512,l+1),e.stroke()}e.fillStyle="rgba(255, 200, 160, 0.25)",e.fillRect(0,s,512,2),e.fillStyle="#1c0702",e.fillRect(0,s+t-3,512,3),e.fillStyle="#260a03",e.beginPath(),e.arc(28,s+t/2,4.5,0,Math.PI*2),e.fill(),e.beginPath(),e.arc(484,s+t/2,4.5,0,Math.PI*2),e.fill()}const n=new ut(r);return n.wrapS=Fe,n.wrapT=Fe,n.repeat.set(2,2),n.anisotropy=8,n.needsUpdate=!0,n}function o_(){const r=document.createElement("canvas");r.width=512,r.height=512;const e=r.getContext("2d");e.fillStyle="#581c1c",e.fillRect(0,0,512,512);const t=64,n=32;for(let s=0;s<8;s++){const o=s*t;for(let a=0;a<16;a++){const l=a*n,c=e.createLinearGradient(l,0,l+n,0);c.addColorStop(0,"#7f1d1d"),c.addColorStop(.3,"#b91c1c"),c.addColorStop(.7,"#991b1b"),c.addColorStop(1,"#450a0a"),e.fillStyle=c,e.fillRect(l+1,o,n-2,t-3),e.fillStyle="rgba(255, 200, 200, 0.40)",e.fillRect(l+8,o,4,t-3),e.fillStyle="#f59e0b",e.fillRect(l+2,o+t-4,n-4,3)}e.fillStyle="#260404",e.fillRect(0,o+t-2,512,2)}const i=new ut(r);return i.wrapS=Fe,i.wrapT=Fe,i.repeat.set(2,2),i.anisotropy=8,i.needsUpdate=!0,i}function a_(){const r=document.createElement("canvas");r.width=512,r.height=512;const e=r.getContext("2d");e.fillStyle="#c5b8a5",e.fillRect(0,0,512,512);const t=64,n=["#ede5d8","#e5dacb","#f2ece2","#ddd1bf","#e8dfd1"];for(let s=0;s<8;s++)for(let o=0;o<8;o++){const a=o*t,l=s*t,c=(s*5+o*7)%n.length;e.fillStyle=n[c],e.fillRect(a+2,l+2,t-4,t-4),e.fillStyle="rgba(255, 255, 255, 0.5)",e.fillRect(a+2,l+2,t-4,2),e.fillRect(a+2,l+2,2,t-4),e.fillStyle="rgba(80, 70, 60, 0.35)",e.fillRect(a+2,l+t-3,t-4,2),e.fillRect(a+t-3,l+2,2,t-4)}const i=new ut(r);return i.wrapS=Fe,i.wrapT=Fe,i.repeat.set(3,3),i.anisotropy=8,i.needsUpdate=!0,i}class l_{constructor(e){this.scene=e,this.colliders=[],this.ramps=[],this.radianiteMeshes=[],this.waterTexture=null,this.group=new ke,this.scene.add(this.group),this.skyDomeData=null}async load(e){this.clear();const t=zg(),n=Hg(),i=Wg(),s=Xg(),o=Vg(),a=qg(),l=Kg(),c=Yg(),d=jg(),h=$g(),u=Jg(),p=Qg(),g=e_(),_=bc("A"),f=bc("B"),m=t_(),v=n_(),x=s_(),M=r_(),A=o_(),E=a_();this.waterTexture=x,this.materials={ground:new ie({map:t,roughness:.7,metalness:.05}),accent_stone:new ie({map:E,roughness:.65,metalness:.05}),wall:new ie({map:n,roughness:.65,metalness:.1}),brick:new ie({map:i,roughness:.75,metalness:.05}),pagoda_wood:new ie({map:M,roughness:.7,metalness:.1}),asian_roof:new ie({map:A,roughness:.6,metalness:.15}),water:new ie({map:x,color:3718648,roughness:.15,metalness:.8,transparent:!0,opacity:.82}),box:new ie({map:s,roughness:.7,metalness:.15}),platform:new ie({map:t,roughness:.55,metalness:.1}),stairs:new ie({map:h,roughness:.55,metalness:.35}),stairs_wood:new ie({map:u,roughness:.75,metalness:.2}),cobble:new ie({map:p,roughness:.5,metalness:.15}),terracotta:new ie({map:g,roughness:.65,metalness:.05}),site_a:new ie({map:_,roughness:.45,metalness:.25}),site_b:new ie({map:f,roughness:.45,metalness:.25}),teal:new ie({map:m,roughness:.65,metalness:.1}),ivy:new ie({map:v,transparent:!0,alphaTest:.35,side:Nt,roughness:.6}),structure:new ie({map:n,roughness:.7,metalness:.1}),radianite:new ie({map:o,emissive:366185,emissiveIntensity:.65,roughness:.3,metalness:.4}),generator:new ie({map:a,roughness:.4,metalness:.7}),door:new ie({map:l,roughness:.5,metalness:.45}),awning:new ie({map:c,roughness:.85,metalness:0}),roof:new ie({map:d,roughness:.7,metalness:.1}),metal:new ie({color:3359061,roughness:.45,metalness:.8})},this.edgeMaterials={ground:new Dt({color:61695,transparent:!0,opacity:.25}),wall:new Dt({color:14861465,transparent:!0,opacity:.45}),box:new Dt({color:14251782,transparent:!0,opacity:.65}),platform:new Dt({color:16096779,transparent:!0,opacity:.55}),stairs:new Dt({color:16096779,transparent:!0,opacity:.75}),structure:new Dt({color:11900010,transparent:!0,opacity:.45}),radianite:new Dt({color:3462041,transparent:!0,opacity:.95}),generator:new Dt({color:440020,transparent:!0,opacity:.65})},this.skyDomeData=Zg(this.scene),this.scene.background=new De(11721212),this.scene.fog=new za(12115194,e.fogNear??160,e.fogFar??420);const w=new ln(1200,1200),L=new ie({map:t,roughness:.7,metalness:.05}),U=new P(w,L);U.rotation.x=-Math.PI/2,U.position.y=-.005,U.receiveShadow=!0,this.group.add(U);const y=new dg(15267071,13680808,1.25);this.group.add(y);const S=new As(16775406,1.65);S.position.set(60,95,50),S.target.position.set(0,0,0),this.group.add(S.target),S.castShadow=!0,S.shadow.mapSize.width=2048,S.shadow.mapSize.height=2048,S.shadow.camera.near=.5,S.shadow.camera.far=280,S.shadow.camera.left=-95,S.shadow.camera.right=95,S.shadow.camera.top=95,S.shadow.camera.bottom=-95,S.shadow.bias=-1e-4,S.shadow.normalBias=.04,this.group.add(S);const B=new As(10865653,.45);B.position.set(-50,60,-50),this.group.add(B);const F=new xs(61695,2.5,60);F.position.set(0,8,0),this.group.add(F);const z=new xs(16729685,2,50);z.position.set(-45,6,-25),this.group.add(z);const Y=new xs(16096779,2,50);Y.position.set(45,6,-25),this.group.add(Y);for(const G of e.blocks)G.comment||(G.isRamp?this._addRamp(G):this._addBlock(G));return this._addAscentProps(),e}_addAscentProps(){const e=[{x:-6.5,z:-25},{x:8,z:-14},{x:8,z:14},{x:26,z:-20},{x:38,z:-20},{x:-38,z:-12}],t=new q(1.6,.7,1.6),n=this.materials.wall,i=new fe(.14,.18,2.2,8),s=new ie({color:4073251,roughness:.9}),o=new ie({color:1981222,roughness:.85,metalness:.05});for(const h of e){const u=new ke;u.position.set(h.x,0,h.z);const p=new P(t,n);p.position.y=.35,p.castShadow=!0,p.receiveShadow=!0,u.add(p);const g=new P(i,s);g.position.y=1.6,g.castShadow=!0,u.add(g);const _=new P(new Mn(1.15,3.8,8),o);_.position.y=3.6,_.castShadow=!0,u.add(_);const f=new P(new Mn(.9,3.2,8),o);f.position.y=5.2,f.castShadow=!0,u.add(f);const m=new P(new Mn(.55,2.6,8),o);m.position.y=6.8,m.castShadow=!0,u.add(m),this.group.add(u);const v=new Yt().setFromObject(p);this.colliders.push({box:v,mesh:p,type:"structure"})}const a=[{x:0,y:7,z:-27.8,w:10,h:3.5,rx:0,ry:0},{x:12,y:6.8,z:-2,w:6,h:4,rx:0,ry:Math.PI/2},{x:-13.2,y:5.5,z:2,w:5,h:3.2,rx:0,ry:Math.PI/2},{x:64,y:5.2,z:-2,w:8,h:3.5,rx:0,ry:0}];for(const h of a){const u=new ln(h.w,h.h),p=new P(u,this.materials.ivy);p.position.set(h.x,h.y,h.z),p.rotation.set(h.rx,h.ry,0),this.group.add(p)}const l=[{x:-7.5,y:4.1,z:-2.3},{x:7.5,y:4.1,z:-2.3},{x:-7.5,y:4.1,z:2.3},{x:7.5,y:4.1,z:2.3},{x:-8.8,y:4.5,z:-46},{x:8.8,y:4.5,z:-46},{x:-8.8,y:4.5,z:46},{x:8.8,y:4.5,z:46},{x:42,y:8.2,z:10},{x:42,y:8.2,z:18}],c=new ie({color:2040873,metalness:.9,roughness:.3}),d=new ie({color:15680580,emissive:14251782,emissiveIntensity:1.4,roughness:.2});for(const h of l){const u=new ke;u.position.set(h.x,h.y,h.z);const p=new P(new fe(.015,.015,.35),c);u.add(p);const g=new P(new fe(.18,.16,.38,8),d);g.position.set(0,-.28,0),u.add(g);const _=new P(new fe(.2,.2,.05,8),c);_.position.set(0,-.09,0),u.add(_);const f=new P(new fe(.14,.14,.05,8),c);f.position.set(0,-.47,0),u.add(f);const m=new xs(16096779,1.4,14);m.position.set(0,-.28,0),u.add(m),this.group.add(u)}}update(e){if(this.waterTexture&&(this.waterTexture.offset.x=e*.04%1,this.waterTexture.offset.y=e*.025%1),this.radianiteMeshes.length>0){const t=.5+Math.sin(e*2.8)*.25;for(const n of this.radianiteMeshes)n.material&&(n.material.emissiveIntensity=t)}}_addBlock(e){const{x:t,y:n,z:i,w:s,h:o,d:a,type:l="wall"}=e,c=new q(s,o,a),d=this.materials[l]??this.materials.wall,h=new P(c,d);if(h.position.set(t,n,i),h.receiveShadow=!0,h.castShadow=l!=="ground"&&l!=="water",h.userData.type=l,this.group.add(h),l==="radianite"&&this.radianiteMeshes.push(h),l==="radianite"||l==="generator"){const u=new Qt(c),p=this.edgeMaterials[l]??this.edgeMaterials.radianite,g=new Wt(u,p);h.add(g)}if(l!=="trigger"&&l!=="water"){const u=new Yt().setFromObject(h);this.colliders.push({box:u,mesh:h,type:l})}}_addRamp(e){const{minX:t,maxX:n,minZ:i,maxZ:s,startY:o,endY:a,axis:l="z",type:c="pagoda_wood"}=e,d=n-t,h=s-i,u=(t+n)/2,p=(i+s)/2,g=(o+a)/2,_=l==="z"?h:d,f=a-o,m=Math.sqrt(_*_+f*f),v=Math.atan2(f,_),x=new q(l==="z"?d:m,.35,l==="z"?m:h),M=this.materials[c]??this.materials.pagoda_wood,A=new P(x,M);A.position.set(u,g,p),l==="z"?A.rotation.x=-v:A.rotation.z=v,A.receiveShadow=!0,A.castShadow=!0,A.userData.type=c,A.userData.isRamp=!0,this.group.add(A),this.ramps.push({minX:t,maxX:n,minZ:i,maxZ:s,startY:o,endY:a,axis:l,type:c});const E=new Yt().setFromObject(A);this.colliders.push({box:E,mesh:A,type:c,isRamp:!0})}getColliders(){return this.colliders}getRamps(){return this.ramps||[]}getSpawnPoints(e){return(e.spawn??[[0,.9,-28]]).map(t=>new C(t[0],t[1],t[2]))}clear(){this.group.clear(),this.colliders=[],this.ramps=[],this.radianiteMeshes=[],this.skyDomeData&&(this.scene.remove(this.skyDomeData.skyMesh),this.scene.remove(this.skyDomeData.bgGroup),this.skyDomeData=null),this.scene.fog=null}}const vo=new C;class c_{constructor(e=[],t=[]){this.colliders=e||[],this.ramps=t||[]}update(e,t=[]){this.colliders=e||[],this.ramps=t||[]}resolve(e,t,n=.4,i=.9,s=!0){let o=!1,a=!1,l=!1;const c=e.clone();let d=!1;for(const u of this.ramps)if(c.x+n>=u.minX&&c.x-n<=u.maxX&&c.z+n>=u.minZ&&c.z-n<=u.maxZ){let p;u.axis==="z"?p=Me.clamp((c.z-u.minZ)/(u.maxZ-u.minZ),0,1):p=Me.clamp((c.x-u.minX)/(u.maxX-u.minX),0,1);const g=Me.lerp(u.startY,u.endY,p);if(c.y-i>=g-.45&&c.y-i<=g+.65){c.y=g+i,t.y=0,o=!0,d=!0;break}}if(!d){const u=c.y+t.y,p=new Yt(new C(c.x-n,u-i,c.z-n),new C(c.x+n,u+i,c.z+n));let g=!1;for(const _ of this.colliders){if(_.isRamp)continue;const{box:f}=_;if(p.intersectsBox(f)){if(t.y<=0){if(c.y-i>=f.max.y-.25){c.y=f.max.y+i,t.y=0,o=!0,g=!0;break}}else if(t.y>0&&c.y+i<=f.min.y+.25){c.y=f.min.y-i,t.y=0,g=!0;break}}}g||(c.y=u),c.y<=i+.001&&(c.y=i,t.y=0,o=!0)}const h=.05;if(t.x!==0){const u=c.x+t.x;for(const p of this.colliders){if(p.isRamp)continue;const{box:g}=p;if(!(c.y+i-h<=g.min.y||c.y-i+h>=g.max.y)&&!(c.z+n-h<=g.min.z||c.z-n+h>=g.max.z)){if(t.x>0&&c.x+n<=g.min.x+h&&u+n>=g.min.x){c.x=g.min.x-n,t.x=0,a=!0;break}else if(t.x<0&&c.x-n>=g.max.x-h&&u-n<=g.max.x){c.x=g.max.x+n,t.x=0,a=!0;break}}}a||(c.x=u)}if(t.z!==0){const u=c.z+t.z;for(const p of this.colliders){if(p.isRamp)continue;const{box:g}=p;if(!(c.y+i-h<=g.min.y||c.y-i+h>=g.max.y)&&!(c.x+n-h<=g.min.x||c.x-n+h>=g.max.x)){if(t.z>0&&c.z+n<=g.min.z+h&&u+n>=g.min.z){c.z=g.min.z-n,t.z=0,l=!0;break}else if(t.z<0&&c.z-n>=g.max.z-h&&u-n<=g.max.z){c.z=g.max.z+n,t.z=0,l=!0;break}}}l||(c.z=u)}return s||(a&&(c.z=e.z,t.z=0),l&&(c.x=e.x,t.x=0)),{position:c,displacement:t,onGround:o,collidedX:a,collidedZ:l}}raycast(e,t,n=1e3){const i=new Qi(e,t.clone().normalize());let s=null,o=n;for(const{box:a}of this.colliders)if(i.intersectBox(a,vo)!==null){const c=e.distanceTo(vo);c<o&&(o=c,s={point:vo.clone(),distance:c})}return s}}const Tc={vandal:{id:"vandal",name:"VANDAL",shortName:"VDL",type:"rifle",damageBody:40,damageHead:160,damageLeg:34,fireRate:9.75,reloadTime:2500,magazineSize:25,isAuto:!0,spread:0,recoilPattern:[0,.004,.008,.012,.016],range:500,scopeMultiplier:1,color:16729685},spectre:{id:"spectre",name:"SPECTRE",shortName:"SPC",type:"smg",damageBody:26,damageHead:78,damageLeg:22,fireRate:13.33,reloadTime:2250,magazineSize:30,isAuto:!0,spread:.001,recoilPattern:[0,.002,.005,.008],range:250,scopeMultiplier:1,color:11065578},operator:{id:"operator",name:"OPERATOR",shortName:"OPR",type:"sniper",damageBody:150,damageHead:255,damageLeg:120,fireRate:.75,reloadTime:3700,magazineSize:5,isAuto:!1,spread:0,spreadScoped:0,recoilPattern:[0],range:1e3,scopeMultiplier:5,color:3045328},odin:{id:"odin",name:"ODIN",shortName:"ODN",type:"lmg",damageBody:38,damageHead:95,damageLeg:32,fireRate:12,reloadTime:5e3,magazineSize:100,isAuto:!0,spread:.002,recoilPattern:[0,.002,.003,.004,.005],range:400,scopeMultiplier:1,color:16106818},bucky:{id:"bucky",name:"BUCKY",shortName:"BCK",type:"shotgun",damageBody:22,damageHead:44,damageLeg:19,pellets:15,fireRate:1.1,reloadTime:2500,magazineSize:5,isAuto:!1,spread:.036,recoilPattern:[0],range:35,scopeMultiplier:1,color:8072587},classic:{id:"classic",name:"CLASSIC",shortName:"CLS",type:"pistol",damageBody:26,damageHead:78,damageLeg:22,fireRate:6.75,reloadTime:1500,magazineSize:12,isAuto:!1,spread:0,recoilPattern:[0,.005],range:300,scopeMultiplier:1,color:7766137}};function _h(r){return Tc[r]??Tc.classic}class h_{constructor(){this.ctx=null,this.enabled=!0,this._initialized=!1}_init(){if(this._initialized)return;const e=window.AudioContext||window.webkitAudioContext;e&&(this.ctx=new e,this._initialized=!0)}_resume(){this._init(),this.ctx&&this.ctx.state==="suspended"&&this.ctx.resume()}playShoot(e="vandal"){if(this._resume(),!this.ctx)return;const t=this.ctx.currentTime;switch(e){case"operator":this._playHeavyBoom(t);break;case"spectre":this._playRapidSmg(t);break;case"odin":this._playHeavyChug(t);break;case"bucky":this._playShotgunBlast(t);break;case"classic":this._playPistolPop(t);break;case"vandal":default:this._playRifleShot(t);break}}_playRifleShot(e){const t=this.ctx.createOscillator(),n=this.ctx.createOscillator(),i=this.ctx.createGain();t.type="sawtooth",t.frequency.setValueAtTime(260,e),t.frequency.exponentialRampToValueAtTime(42,e+.13),n.type="triangle",n.frequency.setValueAtTime(140,e),n.frequency.exponentialRampToValueAtTime(32,e+.15),i.gain.setValueAtTime(.42,e),i.gain.exponentialRampToValueAtTime(.001,e+.15),t.connect(i),n.connect(i),i.connect(this.ctx.destination),t.start(e),n.start(e),t.stop(e+.15),n.stop(e+.15),this._playNoise(e,.09,.45,3200),this._playClick(e,2400,.03,.25)}_playPistolPop(e){const t=this.ctx.createOscillator(),n=this.ctx.createGain();t.type="triangle",t.frequency.setValueAtTime(360,e),t.frequency.exponentialRampToValueAtTime(75,e+.08),n.gain.setValueAtTime(.32,e),n.gain.exponentialRampToValueAtTime(.001,e+.08),t.connect(n),n.connect(this.ctx.destination),t.start(e),t.stop(e+.08),this._playNoise(e,.05,.28,3800),this._playClick(e+.015,3200,.02,.2)}_playRapidSmg(e){const t=this.ctx.createOscillator(),n=this.ctx.createGain();t.type="sine",t.frequency.setValueAtTime(190,e),t.frequency.exponentialRampToValueAtTime(55,e+.06),n.gain.setValueAtTime(.28,e),n.gain.exponentialRampToValueAtTime(.001,e+.06),t.connect(n),n.connect(this.ctx.destination),t.start(e),t.stop(e+.06),this._playNoise(e,.045,.26,1600),this._playClick(e,1800,.015,.15)}_playHeavyBoom(e){const t=this.ctx.createOscillator(),n=this.ctx.createOscillator(),i=this.ctx.createGain();t.type="sine",t.frequency.setValueAtTime(150,e),t.frequency.exponentialRampToValueAtTime(20,e+.45),n.type="sawtooth",n.frequency.setValueAtTime(210,e),n.frequency.exponentialRampToValueAtTime(35,e+.3),i.gain.setValueAtTime(.75,e),i.gain.exponentialRampToValueAtTime(.001,e+.45),t.connect(i),n.connect(i),i.connect(this.ctx.destination),t.start(e),n.start(e),t.stop(e+.45),n.stop(e+.45),this._playNoise(e,.32,.7,2800),setTimeout(()=>{this.ctx&&this._playNoise(this.ctx.currentTime,.25,.25,1200)},90)}_playHeavyChug(e){const t=this.ctx.createOscillator(),n=this.ctx.createOscillator(),i=this.ctx.createGain();t.type="square",t.frequency.setValueAtTime(190,e),t.frequency.exponentialRampToValueAtTime(45,e+.09),n.type="triangle",n.frequency.setValueAtTime(95,e),n.frequency.exponentialRampToValueAtTime(30,e+.11),i.gain.setValueAtTime(.38,e),i.gain.exponentialRampToValueAtTime(.001,e+.11),t.connect(i),n.connect(i),i.connect(this.ctx.destination),t.start(e),n.start(e),t.stop(e+.11),n.stop(e+.11),this._playNoise(e,.07,.38,2600),this._playClick(e,3400,.02,.22)}_playShotgunBlast(e){const t=this.ctx.createOscillator(),n=this.ctx.createGain();t.type="triangle",t.frequency.setValueAtTime(175,e),t.frequency.exponentialRampToValueAtTime(28,e+.22),n.gain.setValueAtTime(.62,e),n.gain.exponentialRampToValueAtTime(.001,e+.22),t.connect(n),n.connect(this.ctx.destination),t.start(e),t.stop(e+.22),this._playNoise(e,.22,.65,1800),this._playClick(e,1400,.04,.35)}_playClick(e,t,n,i){const s=this.ctx.createOscillator(),o=this.ctx.createGain();s.type="sine",s.frequency.setValueAtTime(t,e),s.frequency.exponentialRampToValueAtTime(t*.4,e+n),o.gain.setValueAtTime(i,e),o.gain.exponentialRampToValueAtTime(.001,e+n),s.connect(o),o.connect(this.ctx.destination),s.start(e),s.stop(e+n)}_playNoise(e,t,n,i,s=null){if(!this.ctx)return;const o=s||this.ctx.destination,a=Math.max(1,Math.floor(this.ctx.sampleRate*t)),l=this.ctx.createBuffer(1,a,this.ctx.sampleRate),c=l.getChannelData(0);for(let p=0;p<a;p++)c[p]=Math.random()*2-1;const d=this.ctx.createBufferSource();d.buffer=l;const h=this.ctx.createBiquadFilter();h.type="lowpass",h.frequency.setValueAtTime(i,e),h.frequency.exponentialRampToValueAtTime(Math.min(300,i),e+t);const u=this.ctx.createGain();u.gain.setValueAtTime(n,e),u.gain.exponentialRampToValueAtTime(.001,e+t),d.connect(h),h.connect(u),u.connect(o),d.start(e),d.stop(e+t)}playHit(e=!1){if(this._resume(),!this.ctx)return;const t=this.ctx.currentTime;if(e){this._playClick(t,4800,.025,.35),this._playNoise(t,.035,.3,6e3);const n=this.ctx.createOscillator(),i=this.ctx.createOscillator(),s=this.ctx.createOscillator(),o=this.ctx.createGain();n.type="sine",i.type="triangle",s.type="sine",n.frequency.setValueAtTime(2349,t),n.frequency.exponentialRampToValueAtTime(1174,t+.22),i.frequency.setValueAtTime(3520,t),i.frequency.exponentialRampToValueAtTime(1760,t+.18),s.frequency.setValueAtTime(4698,t),s.frequency.exponentialRampToValueAtTime(2349,t+.12),o.gain.setValueAtTime(.55,t),o.gain.exponentialRampToValueAtTime(.001,t+.26),n.connect(o),i.connect(o),s.connect(o),o.connect(this.ctx.destination),n.start(t),i.start(t),s.start(t),n.stop(t+.26),i.stop(t+.26),s.stop(t+.26)}else{const n=this.ctx.createOscillator(),i=this.ctx.createGain();n.type="sine",n.frequency.setValueAtTime(980,t),n.frequency.exponentialRampToValueAtTime(490,t+.08),i.gain.setValueAtTime(.28,t),i.gain.exponentialRampToValueAtTime(.001,t+.08),n.connect(i),i.connect(this.ctx.destination),n.start(t),n.stop(t+.08)}}playSlide(){if(this._resume(),!this.ctx)return;const e=this.ctx.currentTime;this._playNoise(e,.35,.15,900)}playJump(){if(this._resume(),!this.ctx)return;const e=this.ctx.currentTime,t=this.ctx.createOscillator(),n=this.ctx.createGain();t.type="sine",t.frequency.setValueAtTime(120,e),t.frequency.exponentialRampToValueAtTime(260,e+.1),n.gain.setValueAtTime(.18,e),n.gain.exponentialRampToValueAtTime(.001,e+.12),t.connect(n),n.connect(this.ctx.destination),t.start(e),t.stop(e+.12)}playReload(){if(this._resume(),!this.ctx)return;const e=this.ctx.currentTime;this._playNoise(e,.05,.28,2600),setTimeout(()=>{this.ctx&&this.playMagSlap()},350)}playReloadPart(e,t){if(this._resume(),!this.ctx)return;const n=this.ctx.currentTime;switch(`${e}:${t}`){case"vandal:eject":{this._playNoise(n,.05,.28,2800),this._playClick(n,2200,.03,.25);break}case"vandal:slap":{const i=this.ctx.createOscillator(),s=this.ctx.createGain();i.type="triangle",i.frequency.setValueAtTime(320,n),i.frequency.exponentialRampToValueAtTime(80,n+.09),s.gain.setValueAtTime(.42,n),s.gain.exponentialRampToValueAtTime(.001,n+.09),i.connect(s),s.connect(this.ctx.destination),i.start(n),i.stop(n+.09),this._playNoise(n,.07,.38,3200),this._playClick(n+.04,1800,.03,.22);break}case"vandal:bolt":{this._playNoise(n,.04,.3,4200),setTimeout(()=>{if(this.ctx){const i=this.ctx.currentTime;this._playNoise(i,.06,.38,4800),this._playClick(i,1600,.03,.3)}},120);break}case"spectre:eject":{this._playClick(n,2600,.03,.25),this._playNoise(n,.04,.22,3400);break}case"spectre:insert":{this._playNoise(n,.05,.26,2600),this._playClick(n+.03,2800,.02,.28);break}case"spectre:hkslap":{const i=this.ctx.createOscillator(),s=this.ctx.createGain();i.type="sawtooth",i.frequency.setValueAtTime(450,n),i.frequency.exponentialRampToValueAtTime(120,n+.08),s.gain.setValueAtTime(.45,n),s.gain.exponentialRampToValueAtTime(.001,n+.08),i.connect(s),s.connect(this.ctx.destination),i.start(n),i.stop(n+.08),this._playNoise(n,.08,.42,4500);break}case"operator:bolt_up":{this._playClick(n,900,.06,.32),this._playNoise(n,.05,.3,2400);break}case"operator:bolt_back":{this._playNoise(n,.06,.35,3800),this._playClick(n+.05,1400,.04,.25);break}case"operator:mag_out":{this._playNoise(n,.07,.32,2200),this._playClick(n,800,.05,.3);break}case"operator:mag_in":{const i=this.ctx.createOscillator(),s=this.ctx.createGain();i.type="triangle",i.frequency.setValueAtTime(220,n),i.frequency.exponentialRampToValueAtTime(60,n+.12),s.gain.setValueAtTime(.48,n),s.gain.exponentialRampToValueAtTime(.001,n+.12),i.connect(s),s.connect(this.ctx.destination),i.start(n),i.stop(n+.12),this._playNoise(n,.08,.4,2800);break}case"operator:bolt_forward":{this._playNoise(n,.07,.32,3400);break}case"operator:bolt_lock":{const i=this.ctx.createOscillator(),s=this.ctx.createGain();i.type="triangle",i.frequency.setValueAtTime(280,n),i.frequency.exponentialRampToValueAtTime(90,n+.08),s.gain.setValueAtTime(.4,n),s.gain.exponentialRampToValueAtTime(.001,n+.08),i.connect(s),s.connect(this.ctx.destination),i.start(n),i.stop(n+.08),this._playClick(n,1600,.04,.35);break}case"odin:cover_open":{this._playClick(n,1100,.05,.35),this._playNoise(n,.08,.32,2400);break}case"odin:drum_out":{this._playNoise(n,.1,.35,1800),this._playClick(n,700,.06,.3);break}case"odin:drum_in":{const i=this.ctx.createOscillator(),s=this.ctx.createGain();i.type="triangle",i.frequency.setValueAtTime(180,n),i.frequency.exponentialRampToValueAtTime(50,n+.14),s.gain.setValueAtTime(.5,n),s.gain.exponentialRampToValueAtTime(.001,n+.14),i.connect(s),s.connect(this.ctx.destination),i.start(n),i.stop(n+.14),this._playNoise(n,.08,.42,2600);break}case"odin:cover_slam":{const i=this.ctx.createOscillator(),s=this.ctx.createGain();i.type="triangle",i.frequency.setValueAtTime(240,n),i.frequency.exponentialRampToValueAtTime(40,n+.16),s.gain.setValueAtTime(.6,n),s.gain.exponentialRampToValueAtTime(.001,n+.16),i.connect(s),s.connect(this.ctx.destination),i.start(n),i.stop(n+.16),this._playNoise(n,.12,.55,3600),this._playClick(n,2400,.03,.4);break}case"odin:rack":{this._playNoise(n,.08,.38,4200),setTimeout(()=>{if(this.ctx){const i=this.ctx.currentTime;this._playNoise(i,.09,.45,4500),this._playClick(i,1800,.04,.35)}},140);break}case"bucky:shell_insert":{this._playNoise(n,.04,.25,2400),this._playClick(n+.02,1900,.03,.32);const i=this.ctx.createOscillator(),s=this.ctx.createGain();i.type="sine",i.frequency.setValueAtTime(420,n+.02),i.frequency.exponentialRampToValueAtTime(200,n+.07),s.gain.setValueAtTime(.25,n+.02),s.gain.exponentialRampToValueAtTime(.001,n+.07),i.connect(s),s.connect(this.ctx.destination),i.start(n+.02),i.stop(n+.07);break}case"bucky:pump":{this.playPumpCycle();break}case"classic:eject":{this._playClick(n,2800,.025,.24),this._playNoise(n,.035,.2,3600);break}case"classic:insert":{this._playNoise(n,.04,.22,2800);break}case"classic:slap":{const i=this.ctx.createOscillator(),s=this.ctx.createGain();i.type="triangle",i.frequency.setValueAtTime(340,n),i.frequency.exponentialRampToValueAtTime(110,n+.07),s.gain.setValueAtTime(.38,n),s.gain.exponentialRampToValueAtTime(.001,n+.07),i.connect(s),s.connect(this.ctx.destination),i.start(n),i.stop(n+.07),this._playNoise(n,.05,.32,3400);break}case"classic:slide_release":{this._playClick(n,3200,.02,.35),this._playNoise(n,.05,.36,4600);break}default:{this.playMagSlap();break}}}playMagSlap(){if(this._resume(),!this.ctx)return;const e=this.ctx.currentTime,t=this.ctx.createOscillator(),n=this.ctx.createGain();t.type="triangle",t.frequency.setValueAtTime(260,e),t.frequency.exponentialRampToValueAtTime(70,e+.08),n.gain.setValueAtTime(.35,e),n.gain.exponentialRampToValueAtTime(.001,e+.08),t.connect(n),n.connect(this.ctx.destination),t.start(e),t.stop(e+.08),this._playNoise(e,.06,.35,3400)}playBoltCycle(){if(this._resume(),!this.ctx)return;const e=this.ctx.currentTime;this._playNoise(e,.04,.28,4200),setTimeout(()=>{if(!this.ctx)return;const t=this.ctx.currentTime,n=this.ctx.createOscillator(),i=this.ctx.createGain();n.type="sine",n.frequency.setValueAtTime(1400,t),n.frequency.exponentialRampToValueAtTime(900,t+.05),i.gain.setValueAtTime(.2,t),i.gain.exponentialRampToValueAtTime(.001,t+.05),n.connect(i),i.connect(this.ctx.destination),n.start(t),n.stop(t+.05),this._playNoise(t,.03,.2,3800)},180),setTimeout(()=>{if(!this.ctx)return;const t=this.ctx.currentTime;this._playNoise(t,.05,.35,4500);const n=this.ctx.createOscillator(),i=this.ctx.createGain();n.type="triangle",n.frequency.setValueAtTime(320,t),n.frequency.exponentialRampToValueAtTime(110,t+.06),i.gain.setValueAtTime(.25,t),i.gain.exponentialRampToValueAtTime(.001,t+.06),n.connect(i),i.connect(this.ctx.destination),n.start(t),n.stop(t+.06)},380)}playPumpCycle(){if(this._resume(),!this.ctx)return;const e=this.ctx.currentTime;this._playNoise(e,.06,.3,2600),setTimeout(()=>{this.ctx&&this._playNoise(this.ctx.currentTime,.07,.35,3e3)},160)}playKill(e=1,t=!1){if(this._resume(),!this.ctx)return;const n=this.ctx.currentTime,i=this.ctx.createOscillator(),s=this.ctx.createGain();i.type="triangle",i.frequency.setValueAtTime(140,n),i.frequency.exponentialRampToValueAtTime(35,n+.16),s.gain.setValueAtTime(.45,n),s.gain.exponentialRampToValueAtTime(.001,n+.16),i.connect(s),s.connect(this.ctx.destination),i.start(n),i.stop(n+.16);let o=[523.25,659.25,783.99];e===2?o=[587.33,739.99,880]:e===3?o=[659.25,830.61,987.77]:e===4?o=[783.99,987.77,1174.66]:e>=5&&(o=[523.25,659.25,783.99,1046.5,1318.51]),o.forEach((a,l)=>{const c=this.ctx.createOscillator(),d=this.ctx.createGain();c.type=e>=5?"sawtooth":"triangle",c.frequency.setValueAtTime(a,n+l*.025),d.gain.setValueAtTime(e>=5?.28:.22,n+l*.025),d.gain.exponentialRampToValueAtTime(.001,n+.48),c.connect(d),d.connect(this.ctx.destination),c.start(n+l*.025),c.stop(n+.52)}),t&&(this._playClick(n,3800,.03,.35),this._playNoise(n,.04,.32,5400))}playFootstep(e=!1,t=!1){if(this._resume(),!this.ctx)return;const n=this.ctx.currentTime,i=t?1.05:.95,s=t?.12:-.12;let o=this.ctx.destination;if(typeof this.ctx.createStereoPanner=="function")try{const a=this.ctx.createStereoPanner();a.pan.setValueAtTime(s,n),a.connect(this.ctx.destination),o=a}catch{o=this.ctx.destination}if(e){const a=this.ctx.createOscillator(),l=this.ctx.createGain();a.type="triangle",a.frequency.setValueAtTime(95*i,n),a.frequency.exponentialRampToValueAtTime(36,n+.075),l.gain.setValueAtTime(.38,n),l.gain.exponentialRampToValueAtTime(.001,n+.075),a.connect(l),l.connect(o),a.start(n),a.stop(n+.08);const c=this.ctx.createOscillator(),d=this.ctx.createGain();c.type="sine",c.frequency.setValueAtTime(280*i,n),c.frequency.exponentialRampToValueAtTime(70,n+.045),d.gain.setValueAtTime(.26,n),d.gain.exponentialRampToValueAtTime(.001,n+.045),c.connect(d),d.connect(o),c.start(n),c.stop(n+.05),this._playNoise(n,.038,.22,3600*i,o),this._playNoise(n,.045,.06,5800,o)}else{const a=this.ctx.createOscillator(),l=this.ctx.createGain();a.type="sine",a.frequency.setValueAtTime(75*i,n),a.frequency.exponentialRampToValueAtTime(32,n+.055),l.gain.setValueAtTime(.12,n),l.gain.exponentialRampToValueAtTime(.001,n+.055),a.connect(l),l.connect(o),a.start(n),a.stop(n+.06),this._playNoise(n,.024,.05,1600*i,o)}}}const xn=new h_,Mo=new Map;function ss(r,e){if(Mo.has(r))return Mo.get(r);const t=e();return Mo.set(r,t),t}function Dn(){return ss("carbon_fiber",()=>{const r=document.createElement("canvas");r.width=256,r.height=256;const e=r.getContext("2d");e.fillStyle="#14181f",e.fillRect(0,0,256,256);const t=16;for(let i=0;i<256;i+=t)for(let s=0;s<256;s+=t){const o=(s/t+i/t)%2===0,a=e.createLinearGradient(s,i,s+t,i+t);o?(a.addColorStop(0,"#1f2937"),a.addColorStop(.5,"#2e3d4f"),a.addColorStop(1,"#111827")):(a.addColorStop(0,"#111827"),a.addColorStop(.5,"#1e293b"),a.addColorStop(1,"#0f172a")),e.fillStyle=a,e.fillRect(s,i,t,t),e.strokeStyle="rgba(255, 255, 255, 0.08)",e.lineWidth=1,e.beginPath(),e.moveTo(s,i+t/2),e.lineTo(s+t,i+t/2),e.stroke()}const n=new ut(r);return n.wrapS=Fe,n.wrapT=Fe,n.repeat.set(4,4),n.anisotropy=8,n.needsUpdate=!0,n})}function fn(){return ss("brushed_steel",()=>{const r=document.createElement("canvas");r.width=256,r.height=256;const e=r.getContext("2d");e.fillStyle="#1e242d",e.fillRect(0,0,256,256);for(let n=0;n<400;n++){const i=Math.random()*256,s=40+Math.random()*180,o=Math.random()*256,a=.04+Math.random()*.12,l=Math.random()>.45;e.strokeStyle=l?`rgba(226, 232, 240, ${a})`:`rgba(15, 23, 42, ${a*1.5})`,e.lineWidth=1,e.beginPath(),e.moveTo(o,i),e.lineTo(o+s,i),e.stroke()}const t=new ut(r);return t.wrapS=Fe,t.wrapT=Fe,t.repeat.set(2,2),t.anisotropy=8,t.needsUpdate=!0,t})}function So(){return ss("polymer_grip",()=>{const r=document.createElement("canvas");r.width=128,r.height=128;const e=r.getContext("2d");e.fillStyle="#11141a",e.fillRect(0,0,128,128);for(let n=2;n<128;n+=4)for(let i=2;i<128;i+=4){const s=(Math.random()-.5)*1.5,o=(Math.random()-.5)*1.5,a=Math.random()>.5;e.fillStyle=a?"rgba(55, 65, 81, 0.75)":"rgba(0, 0, 0, 0.85)",e.beginPath(),e.arc(i+s,n+o,1.2,0,Math.PI*2),e.fill()}const t=new ut(r);return t.wrapS=Fe,t.wrapT=Fe,t.repeat.set(4,4),t.anisotropy=8,t.needsUpdate=!0,t})}function bo(r="#00f0ff"){const e=`radiant_${r}`;return ss(e,()=>{const t=document.createElement("canvas");t.width=256,t.height=256;const n=t.getContext("2d");n.fillStyle="#0a1018",n.fillRect(0,0,256,256),n.strokeStyle=r,n.lineWidth=3,n.shadowColor=r,n.shadowBlur=12;for(let s=0;s<18;s++){const o=s*47%256,a=s*61%256,l=(o+60)%256,c=(a+80)%256;n.beginPath(),n.moveTo(o,a),n.lineTo(l,c),n.stroke()}n.shadowBlur=0;const i=new ut(t);return i.wrapS=Fe,i.wrapT=Fe,i.repeat.set(2,2),i.needsUpdate=!0,i})}function To(r="#00f0ff",e="circle-dot"){const t=`reticle_${r}_${e}`;return ss(t,()=>{const n=document.createElement("canvas");n.width=256,n.height=256;const i=n.getContext("2d");i.clearRect(0,0,256,256);const s=128,o=128;if(i.shadowColor=r,i.shadowBlur=10,i.strokeStyle=r,i.fillStyle=r,e==="circle-dot")i.lineWidth=3,i.beginPath(),i.arc(s,o,54,0,Math.PI*2),i.stroke(),i.lineWidth=4,i.beginPath(),i.moveTo(s,o-64),i.lineTo(s,o-44),i.moveTo(s,o+44),i.lineTo(s,o+64),i.moveTo(s-64,o),i.lineTo(s-44,o),i.moveTo(s+44,o),i.lineTo(s+64,o),i.stroke(),i.beginPath(),i.arc(s,o,6,0,Math.PI*2),i.fill();else if(e==="sniper-cross"){i.lineWidth=2,i.beginPath(),i.moveTo(s,0),i.lineTo(s,256),i.moveTo(0,o),i.lineTo(256,o),i.stroke();for(let l=-60;l<=60;l+=20)l!==0&&(i.beginPath(),i.arc(s+l,o,3,0,Math.PI*2),i.fill(),i.beginPath(),i.arc(s,o+l,3,0,Math.PI*2),i.fill());i.beginPath(),i.arc(s,o,4,0,Math.PI*2),i.fill()}const a=new ut(n);return a.needsUpdate=!0,a})}function d_(){return ss("scope_lens",()=>{const r=document.createElement("canvas");r.width=256,r.height=256;const e=r.getContext("2d"),t=e.createRadialGradient(128,128,20,128,128,128);t.addColorStop(0,"rgba(6, 182, 212, 0.45)"),t.addColorStop(.65,"rgba(16, 185, 129, 0.65)"),t.addColorStop(1,"rgba(15, 23, 42, 0.95)"),e.fillStyle=t,e.fillRect(0,0,256,256),e.strokeStyle="rgba(255, 255, 255, 0.35)",e.lineWidth=6,e.beginPath(),e.arc(128,128,105,-Math.PI/4,Math.PI/8),e.stroke();const n=new ut(r);return n.needsUpdate=!0,n})}function wc(r,e){if(e===nd)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),r;if(e===fa||e===Yc){let t=r.getIndex();if(t===null){const o=[],a=r.getAttribute("position");if(a!==void 0){for(let l=0;l<a.count;l++)o.push(l);r.setIndex(o),t=r.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),r}const n=t.count-2,i=[];if(e===fa)for(let o=1;o<=n;o++)i.push(t.getX(0)),i.push(t.getX(o)),i.push(t.getX(o+1));else for(let o=0;o<n;o++)o%2===0?(i.push(t.getX(o)),i.push(t.getX(o+1)),i.push(t.getX(o+2))):(i.push(t.getX(o+2)),i.push(t.getX(o+1)),i.push(t.getX(o)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const s=r.clone();return s.setIndex(i),s.clearGroups(),s}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),r}class u_ extends is{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new __(t)}),this.register(function(t){return new x_(t)}),this.register(function(t){return new A_(t)}),this.register(function(t){return new R_(t)}),this.register(function(t){return new C_(t)}),this.register(function(t){return new v_(t)}),this.register(function(t){return new M_(t)}),this.register(function(t){return new S_(t)}),this.register(function(t){return new b_(t)}),this.register(function(t){return new g_(t)}),this.register(function(t){return new T_(t)}),this.register(function(t){return new y_(t)}),this.register(function(t){return new E_(t)}),this.register(function(t){return new w_(t)}),this.register(function(t){return new p_(t)}),this.register(function(t){return new P_(t)}),this.register(function(t){return new L_(t)})}load(e,t,n,i){const s=this;let o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){const c=Ms.extractUrlBase(e);o=Ms.resolveURL(c,this.path)}else o=Ms.extractUrlBase(e);this.manager.itemStart(e);const a=function(c){i?i(c):console.error(c),s.manager.itemError(e),s.manager.itemEnd(e)},l=new gh(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{s.parse(c,o,function(d){t(d),s.manager.itemEnd(e)},a)}catch(d){a(d)}},n,a)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let s;const o={},a={},l=new TextDecoder;if(typeof e=="string")s=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===xh){try{o[Ze.KHR_BINARY_GLTF]=new I_(e)}catch(h){i&&i(h);return}s=JSON.parse(o[Ze.KHR_BINARY_GLTF].content)}else s=JSON.parse(l.decode(e));else s=e;if(s.asset===void 0||s.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const c=new X_(s,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let d=0;d<this.pluginCallbacks.length;d++){const h=this.pluginCallbacks[d](c);h.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[h.name]=h,o[h.name]=!0}if(s.extensionsUsed)for(let d=0;d<s.extensionsUsed.length;++d){const h=s.extensionsUsed[d],u=s.extensionsRequired||[];switch(h){case Ze.KHR_MATERIALS_UNLIT:o[h]=new m_;break;case Ze.KHR_DRACO_MESH_COMPRESSION:o[h]=new D_(s,this.dracoLoader);break;case Ze.KHR_TEXTURE_TRANSFORM:o[h]=new N_;break;case Ze.KHR_MESH_QUANTIZATION:o[h]=new U_;break;default:u.indexOf(h)>=0&&a[h]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+h+'".')}}c.setExtensions(o),c.setPlugins(a),c.parse(n,i)}parseAsync(e,t){const n=this;return new Promise(function(i,s){n.parse(e,t,i,s)})}}function f_(){let r={};return{get:function(e){return r[e]},add:function(e,t){r[e]=t},remove:function(e){delete r[e]},removeAll:function(){r={}}}}const Ze={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class p_{constructor(e){this.parser=e,this.name=Ze.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){const s=t[n];s.extensions&&s.extensions[this.name]&&s.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,s.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let i=t.cache.get(n);if(i)return i;const s=t.json,l=((s.extensions&&s.extensions[this.name]||{}).lights||[])[e];let c;const d=new De(16777215);l.color!==void 0&&d.setRGB(l.color[0],l.color[1],l.color[2],Ut);const h=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new As(d),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new xs(d),c.distance=h;break;case"spot":c=new fg(d),c.distance=h,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),c.decay=2,Nn(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),i=Promise.resolve(c),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,s=n.json.nodes[e],a=(s.extensions&&s.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(l){return n._getNodeRef(t.cache,a,l)})}}class m_{constructor(){this.name=Ze.KHR_MATERIALS_UNLIT}getMaterialType(){return lt}extendParams(e,t,n){const i=[];e.color=new De(1,1,1),e.opacity=1;const s=t.pbrMetallicRoughness;if(s){if(Array.isArray(s.baseColorFactor)){const o=s.baseColorFactor;e.color.setRGB(o[0],o[1],o[2],Ut),e.opacity=o[3]}s.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",s.baseColorTexture,Ft))}return Promise.all(i)}}class g_{constructor(e){this.parser=e,this.name=Ze.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name].emissiveStrength;return s!==void 0&&(t.emissiveIntensity=s),Promise.resolve()}}class __{constructor(e){this.parser=e,this.name=Ze.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Tn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];if(o.clearcoatFactor!==void 0&&(t.clearcoat=o.clearcoatFactor),o.clearcoatTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatMap",o.clearcoatTexture)),o.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=o.clearcoatRoughnessFactor),o.clearcoatRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatRoughnessMap",o.clearcoatRoughnessTexture)),o.clearcoatNormalTexture!==void 0&&(s.push(n.assignTexture(t,"clearcoatNormalMap",o.clearcoatNormalTexture)),o.clearcoatNormalTexture.scale!==void 0)){const a=o.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new qe(a,a)}return Promise.all(s)}}class x_{constructor(e){this.parser=e,this.name=Ze.KHR_MATERIALS_DISPERSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Tn}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name];return t.dispersion=s.dispersion!==void 0?s.dispersion:0,Promise.resolve()}}class y_{constructor(e){this.parser=e,this.name=Ze.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Tn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];return o.iridescenceFactor!==void 0&&(t.iridescence=o.iridescenceFactor),o.iridescenceTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceMap",o.iridescenceTexture)),o.iridescenceIor!==void 0&&(t.iridescenceIOR=o.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),o.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=o.iridescenceThicknessMinimum),o.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=o.iridescenceThicknessMaximum),o.iridescenceThicknessTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceThicknessMap",o.iridescenceThicknessTexture)),Promise.all(s)}}class v_{constructor(e){this.parser=e,this.name=Ze.KHR_MATERIALS_SHEEN}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Tn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[];t.sheenColor=new De(0,0,0),t.sheenRoughness=0,t.sheen=1;const o=i.extensions[this.name];if(o.sheenColorFactor!==void 0){const a=o.sheenColorFactor;t.sheenColor.setRGB(a[0],a[1],a[2],Ut)}return o.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=o.sheenRoughnessFactor),o.sheenColorTexture!==void 0&&s.push(n.assignTexture(t,"sheenColorMap",o.sheenColorTexture,Ft)),o.sheenRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"sheenRoughnessMap",o.sheenRoughnessTexture)),Promise.all(s)}}class M_{constructor(e){this.parser=e,this.name=Ze.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Tn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];return o.transmissionFactor!==void 0&&(t.transmission=o.transmissionFactor),o.transmissionTexture!==void 0&&s.push(n.assignTexture(t,"transmissionMap",o.transmissionTexture)),Promise.all(s)}}class S_{constructor(e){this.parser=e,this.name=Ze.KHR_MATERIALS_VOLUME}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Tn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];t.thickness=o.thicknessFactor!==void 0?o.thicknessFactor:0,o.thicknessTexture!==void 0&&s.push(n.assignTexture(t,"thicknessMap",o.thicknessTexture)),t.attenuationDistance=o.attenuationDistance||1/0;const a=o.attenuationColor||[1,1,1];return t.attenuationColor=new De().setRGB(a[0],a[1],a[2],Ut),Promise.all(s)}}class b_{constructor(e){this.parser=e,this.name=Ze.KHR_MATERIALS_IOR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Tn}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name];return t.ior=s.ior!==void 0?s.ior:1.5,Promise.resolve()}}class T_{constructor(e){this.parser=e,this.name=Ze.KHR_MATERIALS_SPECULAR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Tn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];t.specularIntensity=o.specularFactor!==void 0?o.specularFactor:1,o.specularTexture!==void 0&&s.push(n.assignTexture(t,"specularIntensityMap",o.specularTexture));const a=o.specularColorFactor||[1,1,1];return t.specularColor=new De().setRGB(a[0],a[1],a[2],Ut),o.specularColorTexture!==void 0&&s.push(n.assignTexture(t,"specularColorMap",o.specularColorTexture,Ft)),Promise.all(s)}}class w_{constructor(e){this.parser=e,this.name=Ze.EXT_MATERIALS_BUMP}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Tn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];return t.bumpScale=o.bumpFactor!==void 0?o.bumpFactor:1,o.bumpTexture!==void 0&&s.push(n.assignTexture(t,"bumpMap",o.bumpTexture)),Promise.all(s)}}class E_{constructor(e){this.parser=e,this.name=Ze.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Tn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];return o.anisotropyStrength!==void 0&&(t.anisotropy=o.anisotropyStrength),o.anisotropyRotation!==void 0&&(t.anisotropyRotation=o.anisotropyRotation),o.anisotropyTexture!==void 0&&s.push(n.assignTexture(t,"anisotropyMap",o.anisotropyTexture)),Promise.all(s)}}class A_{constructor(e){this.parser=e,this.name=Ze.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;const s=i.extensions[this.name],o=t.options.ktx2Loader;if(!o){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,s.source,o)}}class R_{constructor(e){this.parser=e,this.name=Ze.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;const o=s.extensions[t],a=i.images[o.source];let l=n.textureLoader;if(a.uri){const c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return n.loadTextureImage(e,o.source,l);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class C_{constructor(e){this.parser=e,this.name=Ze.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;const o=s.extensions[t],a=i.images[o.source];let l=n.textureLoader;if(a.uri){const c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return n.loadTextureImage(e,o.source,l);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class P_{constructor(e){this.name=Ze.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const i=n.extensions[this.name],s=this.parser.getDependency("buffer",i.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return s.then(function(a){const l=i.byteOffset||0,c=i.byteLength||0,d=i.count,h=i.byteStride,u=new Uint8Array(a,l,c);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(d,h,u,i.mode,i.filter).then(function(p){return p.buffer}):o.ready.then(function(){const p=new ArrayBuffer(d*h);return o.decodeGltfBuffer(new Uint8Array(p),d,h,u,i.mode,i.filter),p})})}else return null}}class L_{constructor(e){this.name=Ze.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const i=t.meshes[n.mesh];for(const c of i.primitives)if(c.mode!==sn.TRIANGLES&&c.mode!==sn.TRIANGLE_STRIP&&c.mode!==sn.TRIANGLE_FAN&&c.mode!==void 0)return null;const o=n.extensions[this.name].attributes,a=[],l={};for(const c in o)a.push(this.parser.getDependency("accessor",o[c]).then(d=>(l[c]=d,l[c])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(c=>{const d=c.pop(),h=d.isGroup?d.children:[d],u=c[0].count,p=[];for(const g of h){const _=new ze,f=new C,m=new ei,v=new C(1,1,1),x=new j0(g.geometry,g.material,u);for(let M=0;M<u;M++)l.TRANSLATION&&f.fromBufferAttribute(l.TRANSLATION,M),l.ROTATION&&m.fromBufferAttribute(l.ROTATION,M),l.SCALE&&v.fromBufferAttribute(l.SCALE,M),x.setMatrixAt(M,_.compose(f,m,v));for(const M in l)if(M==="_COLOR_0"){const A=l[M];x.instanceColor=new ga(A.array,A.itemSize,A.normalized)}else M!=="TRANSLATION"&&M!=="ROTATION"&&M!=="SCALE"&&g.geometry.setAttribute(M,l[M]);yt.prototype.copy.call(x,g),this.parser.assignFinalMaterial(x),p.push(x)}return d.isGroup?(d.clear(),d.add(...p),d):p[0]}))}}const xh="glTF",ps=12,Ec={JSON:1313821514,BIN:5130562};class I_{constructor(e){this.name=Ze.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,ps),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==xh)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const i=this.header.length-ps,s=new DataView(e,ps);let o=0;for(;o<i;){const a=s.getUint32(o,!0);o+=4;const l=s.getUint32(o,!0);if(o+=4,l===Ec.JSON){const c=new Uint8Array(e,ps+o,a);this.content=n.decode(c)}else if(l===Ec.BIN){const c=ps+o;this.body=e.slice(c,c+a)}o+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class D_{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=Ze.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,i=this.dracoLoader,s=e.extensions[this.name].bufferView,o=e.extensions[this.name].attributes,a={},l={},c={};for(const d in o){const h=va[d]||d.toLowerCase();a[h]=o[d]}for(const d in e.attributes){const h=va[d]||d.toLowerCase();if(o[d]!==void 0){const u=n.accessors[e.attributes[d]],p=zi[u.componentType];c[h]=p.name,l[h]=u.normalized===!0}}return t.getDependency("bufferView",s).then(function(d){return new Promise(function(h,u){i.decodeDracoFile(d,function(p){for(const g in p.attributes){const _=p.attributes[g],f=l[g];f!==void 0&&(_.normalized=f)}h(p)},a,c,Ut,u)})})}}class N_{constructor(){this.name=Ze.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class U_{constructor(){this.name=Ze.KHR_MESH_QUANTIZATION}}class yh extends Ps{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i*3+i;for(let o=0;o!==i;o++)t[o]=n[s+o];return t}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=a*2,c=a*3,d=i-t,h=(n-t)/d,u=h*h,p=u*h,g=e*c,_=g-c,f=-2*p+3*u,m=p-u,v=1-f,x=m-u+h;for(let M=0;M!==a;M++){const A=o[_+M+a],E=o[_+M+l]*d,w=o[g+M+a],L=o[g+M]*d;s[M]=v*A+x*E+f*w+m*L}return s}}const B_=new ei;class O_ extends yh{interpolate_(e,t,n,i){const s=super.interpolate_(e,t,n,i);return B_.fromArray(s).normalize().toArray(s),s}}const sn={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},zi={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Ac={9728:Xt,9729:en,9984:Fc,9985:hr,9986:gs,9987:Bn},Rc={33071:jn,33648:vr,10497:Fe},wo={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},va={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Kn={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},F_={CUBICSPLINE:void 0,LINEAR:ws,STEP:Ts},Eo={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function k_(r){return r.DefaultMaterial===void 0&&(r.DefaultMaterial=new ie({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Fn})),r.DefaultMaterial}function li(r,e,t){for(const n in t.extensions)r[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function Nn(r,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(r.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function z_(r,e,t){let n=!1,i=!1,s=!1;for(let c=0,d=e.length;c<d;c++){const h=e[c];if(h.POSITION!==void 0&&(n=!0),h.NORMAL!==void 0&&(i=!0),h.COLOR_0!==void 0&&(s=!0),n&&i&&s)break}if(!n&&!i&&!s)return Promise.resolve(r);const o=[],a=[],l=[];for(let c=0,d=e.length;c<d;c++){const h=e[c];if(n){const u=h.POSITION!==void 0?t.getDependency("accessor",h.POSITION):r.attributes.position;o.push(u)}if(i){const u=h.NORMAL!==void 0?t.getDependency("accessor",h.NORMAL):r.attributes.normal;a.push(u)}if(s){const u=h.COLOR_0!==void 0?t.getDependency("accessor",h.COLOR_0):r.attributes.color;l.push(u)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(l)]).then(function(c){const d=c[0],h=c[1],u=c[2];return n&&(r.morphAttributes.position=d),i&&(r.morphAttributes.normal=h),s&&(r.morphAttributes.color=u),r.morphTargetsRelative=!0,r})}function G_(r,e){if(r.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)r.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(r.morphTargetInfluences.length===t.length){r.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)r.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function H_(r){let e;const t=r.extensions&&r.extensions[Ze.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+Ao(t.attributes):e=r.indices+":"+Ao(r.attributes)+":"+r.mode,r.targets!==void 0)for(let n=0,i=r.targets.length;n<i;n++)e+=":"+Ao(r.targets[n]);return e}function Ao(r){let e="";const t=Object.keys(r).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+r[t[n]]+";";return e}function Ma(r){switch(r){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function V_(r){return r.search(/\.jpe?g($|\?)/i)>0||r.search(/^data\:image\/jpeg/)===0?"image/jpeg":r.search(/\.webp($|\?)/i)>0||r.search(/^data\:image\/webp/)===0?"image/webp":"image/png"}const W_=new ze;class X_{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new f_,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=-1,s=!1,o=-1;if(typeof navigator<"u"){const a=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(a)===!0;const l=a.match(/Version\/(\d+)/);i=n&&l?parseInt(l[1],10):-1,s=a.indexOf("Firefox")>-1,o=s?a.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&i<17||s&&o<98?this.textureLoader=new hg(this.options.manager):this.textureLoader=new _g(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new gh(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,i=this.json,s=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(o){const a={scene:o[0][i.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:i.asset,parser:n,userData:{}};return li(s,a,i),Nn(a,i),Promise.all(n._invokeAll(function(l){return l.afterRoot&&l.afterRoot(a)})).then(function(){for(const l of a.scenes)l.updateMatrixWorld();e(a)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,s=t.length;i<s;i++){const o=t[i].joints;for(let a=0,l=o.length;a<l;a++)e[o[a]].isBone=!0}for(let i=0,s=e.length;i<s;i++){const o=e[i];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(n[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const i=n.clone(),s=(o,a)=>{const l=this.associations.get(o);l!=null&&this.associations.set(a,l);for(const[c,d]of o.children.entries())s(d,a.children[c])};return s(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const i=e(t[n]);if(i)return i}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let i=0;i<t.length;i++){const s=e(t[i]);s&&n.push(s)}return n}getDependency(e,t){const n=e+":"+t;let i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(s){return s.loadNode&&s.loadNode(t)});break;case"mesh":i=this._invokeOne(function(s){return s.loadMesh&&s.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(s){return s.loadBufferView&&s.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(s){return s.loadMaterial&&s.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(s){return s.loadTexture&&s.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(s){return s.loadAnimation&&s.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(s){return s!=this&&s.getDependency&&s.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(s,o){return n.getDependency(e,o)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[Ze.KHR_BINARY_GLTF].body);const i=this.options;return new Promise(function(s,o){n.load(Ms.resolveURL(t.uri,i.path),s,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const i=t.byteLength||0,s=t.byteOffset||0;return n.slice(s,s+i)})}loadAccessor(e){const t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){const o=wo[i.type],a=zi[i.componentType],l=i.normalized===!0,c=new a(i.count*o);return Promise.resolve(new Lt(c,o,l))}const s=[];return i.bufferView!==void 0?s.push(this.getDependency("bufferView",i.bufferView)):s.push(null),i.sparse!==void 0&&(s.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),s.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(s).then(function(o){const a=o[0],l=wo[i.type],c=zi[i.componentType],d=c.BYTES_PER_ELEMENT,h=d*l,u=i.byteOffset||0,p=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,g=i.normalized===!0;let _,f;if(p&&p!==h){const m=Math.floor(u/p),v="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+m+":"+i.count;let x=t.cache.get(v);x||(_=new c(a,m*p,i.count*p/d),x=new W0(_,p/d),t.cache.add(v,x)),f=new Ga(x,l,u%p/d,g)}else a===null?_=new c(i.count*l):_=new c(a,u,i.count*l),f=new Lt(_,l,g);if(i.sparse!==void 0){const m=wo.SCALAR,v=zi[i.sparse.indices.componentType],x=i.sparse.indices.byteOffset||0,M=i.sparse.values.byteOffset||0,A=new v(o[1],x,i.sparse.count*m),E=new c(o[2],M,i.sparse.count*l);a!==null&&(f=new Lt(f.array.slice(),f.itemSize,f.normalized)),f.normalized=!1;for(let w=0,L=A.length;w<L;w++){const U=A[w];if(f.setX(U,E[w*l]),l>=2&&f.setY(U,E[w*l+1]),l>=3&&f.setZ(U,E[w*l+2]),l>=4&&f.setW(U,E[w*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}f.normalized=g}return f})}loadTexture(e){const t=this.json,n=this.options,s=t.textures[e].source,o=t.images[s];let a=this.textureLoader;if(o.uri){const l=n.manager.getHandler(o.uri);l!==null&&(a=l)}return this.loadTextureImage(e,s,a)}loadTextureImage(e,t,n){const i=this,s=this.json,o=s.textures[e],a=s.images[t],l=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[l])return this.textureCache[l];const c=this.loadImageSource(t,n).then(function(d){d.flipY=!1,d.name=o.name||a.name||"",d.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(d.name=a.uri);const u=(s.samplers||{})[o.sampler]||{};return d.magFilter=Ac[u.magFilter]||en,d.minFilter=Ac[u.minFilter]||Bn,d.wrapS=Rc[u.wrapS]||Fe,d.wrapT=Rc[u.wrapT]||Fe,i.associations.set(d,{textures:e}),d}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){const n=this,i=this.json,s=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(h=>h.clone());const o=i.images[e],a=self.URL||self.webkitURL;let l=o.uri||"",c=!1;if(o.bufferView!==void 0)l=n.getDependency("bufferView",o.bufferView).then(function(h){c=!0;const u=new Blob([h],{type:o.mimeType});return l=a.createObjectURL(u),l});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const d=Promise.resolve(l).then(function(h){return new Promise(function(u,p){let g=u;t.isImageBitmapLoader===!0&&(g=function(_){const f=new Et(_);f.needsUpdate=!0,u(f)}),t.load(Ms.resolveURL(h,s.path),g,void 0,p)})}).then(function(h){return c===!0&&a.revokeObjectURL(l),Nn(h,o),h.userData.mimeType=o.mimeType||V_(o.uri),h}).catch(function(h){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),h});return this.sourceCache[e]=d,d}assignTexture(e,t,n,i){const s=this;return this.getDependency("texture",n.index).then(function(o){if(!o)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(o=o.clone(),o.channel=n.texCoord),s.extensions[Ze.KHR_TEXTURE_TRANSFORM]){const a=n.extensions!==void 0?n.extensions[Ze.KHR_TEXTURE_TRANSFORM]:void 0;if(a){const l=s.associations.get(o);o=s.extensions[Ze.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),s.associations.set(o,l)}}return i!==void 0&&(o.colorSpace=i),e[t]=o,o})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const i=t.attributes.tangent===void 0,s=t.attributes.color!==void 0,o=t.attributes.normal===void 0;if(e.isPoints){const a="PointsMaterial:"+n.uuid;let l=this.cache.get(a);l||(l=new Ar,vn.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,l.sizeAttenuation=!1,this.cache.add(a,l)),n=l}else if(e.isLine){const a="LineBasicMaterial:"+n.uuid;let l=this.cache.get(a);l||(l=new Dt,vn.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,this.cache.add(a,l)),n=l}if(i||s||o){let a="ClonedMaterial:"+n.uuid+":";i&&(a+="derivative-tangents:"),s&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let l=this.cache.get(a);l||(l=n.clone(),s&&(l.vertexColors=!0),o&&(l.flatShading=!0),i&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(a,l),this.associations.set(l,this.associations.get(n))),n=l}e.material=n}getMaterialType(){return ie}loadMaterial(e){const t=this,n=this.json,i=this.extensions,s=n.materials[e];let o;const a={},l=s.extensions||{},c=[];if(l[Ze.KHR_MATERIALS_UNLIT]){const h=i[Ze.KHR_MATERIALS_UNLIT];o=h.getMaterialType(),c.push(h.extendParams(a,s,t))}else{const h=s.pbrMetallicRoughness||{};if(a.color=new De(1,1,1),a.opacity=1,Array.isArray(h.baseColorFactor)){const u=h.baseColorFactor;a.color.setRGB(u[0],u[1],u[2],Ut),a.opacity=u[3]}h.baseColorTexture!==void 0&&c.push(t.assignTexture(a,"map",h.baseColorTexture,Ft)),a.metalness=h.metallicFactor!==void 0?h.metallicFactor:1,a.roughness=h.roughnessFactor!==void 0?h.roughnessFactor:1,h.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(a,"metalnessMap",h.metallicRoughnessTexture)),c.push(t.assignTexture(a,"roughnessMap",h.metallicRoughnessTexture))),o=this._invokeOne(function(u){return u.getMaterialType&&u.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(u){return u.extendMaterialParams&&u.extendMaterialParams(e,a)})))}s.doubleSided===!0&&(a.side=Nt);const d=s.alphaMode||Eo.OPAQUE;if(d===Eo.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,d===Eo.MASK&&(a.alphaTest=s.alphaCutoff!==void 0?s.alphaCutoff:.5)),s.normalTexture!==void 0&&o!==lt&&(c.push(t.assignTexture(a,"normalMap",s.normalTexture)),a.normalScale=new qe(1,1),s.normalTexture.scale!==void 0)){const h=s.normalTexture.scale;a.normalScale.set(h,h)}if(s.occlusionTexture!==void 0&&o!==lt&&(c.push(t.assignTexture(a,"aoMap",s.occlusionTexture)),s.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=s.occlusionTexture.strength)),s.emissiveFactor!==void 0&&o!==lt){const h=s.emissiveFactor;a.emissive=new De().setRGB(h[0],h[1],h[2],Ut)}return s.emissiveTexture!==void 0&&o!==lt&&c.push(t.assignTexture(a,"emissiveMap",s.emissiveTexture,Ft)),Promise.all(c).then(function(){const h=new o(a);return s.name&&(h.name=s.name),Nn(h,s),t.associations.set(h,{materials:e}),s.extensions&&li(i,h,s),h})}createUniqueName(e){const t=dt.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,i=this.primitiveCache;function s(a){return n[Ze.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,t).then(function(l){return Cc(l,a,t)})}const o=[];for(let a=0,l=e.length;a<l;a++){const c=e[a],d=H_(c),h=i[d];if(h)o.push(h.promise);else{let u;c.extensions&&c.extensions[Ze.KHR_DRACO_MESH_COMPRESSION]?u=s(c):u=Cc(new Tt,c,t),i[d]={primitive:c,promise:u},o.push(u)}}return Promise.all(o)}loadMesh(e){const t=this,n=this.json,i=this.extensions,s=n.meshes[e],o=s.primitives,a=[];for(let l=0,c=o.length;l<c;l++){const d=o[l].material===void 0?k_(this.cache):this.getDependency("material",o[l].material);a.push(d)}return a.push(t.loadGeometries(o)),Promise.all(a).then(function(l){const c=l.slice(0,l.length-1),d=l[l.length-1],h=[];for(let p=0,g=d.length;p<g;p++){const _=d[p],f=o[p];let m;const v=c[p];if(f.mode===sn.TRIANGLES||f.mode===sn.TRIANGLE_STRIP||f.mode===sn.TRIANGLE_FAN||f.mode===void 0)m=s.isSkinnedMesh===!0?new q0(_,v):new P(_,v),m.isSkinnedMesh===!0&&m.normalizeSkinWeights(),f.mode===sn.TRIANGLE_STRIP?m.geometry=wc(m.geometry,Yc):f.mode===sn.TRIANGLE_FAN&&(m.geometry=wc(m.geometry,fa));else if(f.mode===sn.LINES)m=new Wt(_,v);else if(f.mode===sn.LINE_STRIP)m=new Va(_,v);else if(f.mode===sn.LINE_LOOP)m=new Z0(_,v);else if(f.mode===sn.POINTS)m=new xa(_,v);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+f.mode);Object.keys(m.geometry.morphAttributes).length>0&&G_(m,s),m.name=t.createUniqueName(s.name||"mesh_"+e),Nn(m,s),f.extensions&&li(i,m,f),t.assignFinalMaterial(m),h.push(m)}for(let p=0,g=h.length;p<g;p++)t.associations.set(h[p],{meshes:e,primitives:p});if(h.length===1)return s.extensions&&li(i,h[0],s),h[0];const u=new ke;s.extensions&&li(i,u,s),t.associations.set(u,{meshes:e});for(let p=0,g=h.length;p<g;p++)u.add(h[p]);return u})}loadCamera(e){let t;const n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new zt(Me.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new Fa(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),Nn(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let i=0,s=t.joints.length;i<s;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){const s=i.pop(),o=i,a=[],l=[];for(let c=0,d=o.length;c<d;c++){const h=o[c];if(h){a.push(h);const u=new ze;s!==null&&u.fromArray(s.array,c*16),l.push(u)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new Ha(a,l)})}loadAnimation(e){const t=this.json,n=this,i=t.animations[e],s=i.name?i.name:"animation_"+e,o=[],a=[],l=[],c=[],d=[];for(let h=0,u=i.channels.length;h<u;h++){const p=i.channels[h],g=i.samplers[p.sampler],_=p.target,f=_.node,m=i.parameters!==void 0?i.parameters[g.input]:g.input,v=i.parameters!==void 0?i.parameters[g.output]:g.output;_.node!==void 0&&(o.push(this.getDependency("node",f)),a.push(this.getDependency("accessor",m)),l.push(this.getDependency("accessor",v)),c.push(g),d.push(_))}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(l),Promise.all(c),Promise.all(d)]).then(function(h){const u=h[0],p=h[1],g=h[2],_=h[3],f=h[4],m=[];for(let v=0,x=u.length;v<x;v++){const M=u[v],A=p[v],E=g[v],w=_[v],L=f[v];if(M===void 0)continue;M.updateMatrix&&M.updateMatrix();const U=n._createAnimationTracks(M,A,E,w,L);if(U)for(let y=0;y<U.length;y++)m.push(U[y])}return new ig(s,void 0,m)})}createNodeMesh(e){const t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(s){const o=n._getNodeRef(n.meshCache,i.mesh,s);return i.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let l=0,c=i.weights.length;l<c;l++)a.morphTargetInfluences[l]=i.weights[l]}),o})}loadNode(e){const t=this.json,n=this,i=t.nodes[e],s=n._loadNodeShallow(e),o=[],a=i.children||[];for(let c=0,d=a.length;c<d;c++)o.push(n.getDependency("node",a[c]));const l=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([s,Promise.all(o),l]).then(function(c){const d=c[0],h=c[1],u=c[2];u!==null&&d.traverse(function(p){p.isSkinnedMesh&&p.bind(u,W_)});for(let p=0,g=h.length;p<g;p++)d.add(h[p]);return d})}_loadNodeShallow(e){const t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const s=t.nodes[e],o=s.name?i.createUniqueName(s.name):"",a=[],l=i._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&a.push(l),s.camera!==void 0&&a.push(i.getDependency("camera",s.camera).then(function(c){return i._getNodeRef(i.cameraCache,s.camera,c)})),i._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){a.push(c)}),this.nodeCache[e]=Promise.all(a).then(function(c){let d;if(s.isBone===!0?d=new uh:c.length>1?d=new ke:c.length===1?d=c[0]:d=new yt,d!==c[0])for(let h=0,u=c.length;h<u;h++)d.add(c[h]);if(s.name&&(d.userData.name=s.name,d.name=o),Nn(d,s),s.extensions&&li(n,d,s),s.matrix!==void 0){const h=new ze;h.fromArray(s.matrix),d.applyMatrix4(h)}else s.translation!==void 0&&d.position.fromArray(s.translation),s.rotation!==void 0&&d.quaternion.fromArray(s.rotation),s.scale!==void 0&&d.scale.fromArray(s.scale);return i.associations.has(d)||i.associations.set(d,{}),i.associations.get(d).nodes=e,d}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],i=this,s=new ke;n.name&&(s.name=i.createUniqueName(n.name)),Nn(s,n),n.extensions&&li(t,s,n);const o=n.nodes||[],a=[];for(let l=0,c=o.length;l<c;l++)a.push(i.getDependency("node",o[l]));return Promise.all(a).then(function(l){for(let d=0,h=l.length;d<h;d++)s.add(l[d]);const c=d=>{const h=new Map;for(const[u,p]of i.associations)(u instanceof vn||u instanceof Et)&&h.set(u,p);return d.traverse(u=>{const p=i.associations.get(u);p!=null&&h.set(u,p)}),h};return i.associations=c(s),s})}_createAnimationTracks(e,t,n,i,s){const o=[],a=e.name?e.name:e.uuid,l=[];Kn[s.path]===Kn.weights?e.traverse(function(u){u.morphTargetInfluences&&l.push(u.name?u.name:u.uuid)}):l.push(a);let c;switch(Kn[s.path]){case Kn.weights:c=ji;break;case Kn.rotation:c=Zi;break;case Kn.position:case Kn.scale:c=$i;break;default:switch(n.itemSize){case 1:c=ji;break;case 2:case 3:default:c=$i;break}break}const d=i.interpolation!==void 0?F_[i.interpolation]:ws,h=this._getArrayFromAccessor(n);for(let u=0,p=l.length;u<p;u++){const g=new c(l[u]+"."+Kn[s.path],t.array,h,d);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(g),o.push(g)}return o}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const n=Ma(t.constructor),i=new Float32Array(t.length);for(let s=0,o=t.length;s<o;s++)i[s]=t[s]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){const i=this instanceof Zi?O_:yh;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function q_(r,e,t){const n=e.attributes,i=new Yt;if(n.POSITION!==void 0){const a=t.json.accessors[n.POSITION],l=a.min,c=a.max;if(l!==void 0&&c!==void 0){if(i.set(new C(l[0],l[1],l[2]),new C(c[0],c[1],c[2])),a.normalized){const d=Ma(zi[a.componentType]);i.min.multiplyScalar(d),i.max.multiplyScalar(d)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const s=e.targets;if(s!==void 0){const a=new C,l=new C;for(let c=0,d=s.length;c<d;c++){const h=s[c];if(h.POSITION!==void 0){const u=t.json.accessors[h.POSITION],p=u.min,g=u.max;if(p!==void 0&&g!==void 0){if(l.setX(Math.max(Math.abs(p[0]),Math.abs(g[0]))),l.setY(Math.max(Math.abs(p[1]),Math.abs(g[1]))),l.setZ(Math.max(Math.abs(p[2]),Math.abs(g[2]))),u.normalized){const _=Ma(zi[u.componentType]);l.multiplyScalar(_)}a.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(a)}r.boundingBox=i;const o=new bn;i.getCenter(o.center),o.radius=i.min.distanceTo(i.max)/2,r.boundingSphere=o}function Cc(r,e,t){const n=e.attributes,i=[];function s(o,a){return t.getDependency("accessor",o).then(function(l){r.setAttribute(a,l)})}for(const o in n){const a=va[o]||o.toLowerCase();a in r.attributes||i.push(s(n[o],a))}if(e.indices!==void 0&&!r.index){const o=t.getDependency("accessor",e.indices).then(function(a){r.setIndex(a)});i.push(o)}return st.workingColorSpace!==Ut&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${st.workingColorSpace}" not supported.`),Nn(r,e),q_(r,e,t),Promise.all(i).then(function(){return e.targets!==void 0?z_(r,e.targets,t):r})}const K_={vandal:.85,spectre:.62,operator:1.25,odin:1.05,bucky:.88,classic:.28};class Y_{constructor(){this.loader=new u_,this.modelCache=new Map,this.checkCache=new Map}async loadModel(e){if(this.modelCache.has(e))return this.modelCache.get(e).clone();if(this.checkCache.get(e)===!1)return null;const t=`/models/${e}.glb`;try{if(!(await fetch(t,{method:"HEAD"})).ok)return this.checkCache.set(e,!1),null;const s=(await this._loadGLTF(t)).scene,o=new Yt().setFromObject(s),a=new C;o.getSize(a);const l=Math.max(a.x,a.y,a.z),c=K_[e]||.8;if(l>.001){const d=c/l;s.scale.setScalar(d)}return s.traverse(d=>{d.isMesh&&(d.castShadow=!1,d.receiveShadow=!1,d.material&&(d.material.depthWrite=!0,d.material.map&&(d.material.map.anisotropy=8)))}),this.modelCache.set(e,s),this.checkCache.set(e,!0),s.clone()}catch{return this.checkCache.set(e,!1),null}}_loadGLTF(e){return new Promise((t,n)=>{this.loader.load(e,t,void 0,n)})}hasCustomModel(e){return this.checkCache.get(e)===!0}}const j_=new Y_,Z_=-24,$_=7.4,J_=7.85,Q_=.58,ex=.44,tx=32,nx=4,ix=.12;class sx{constructor(e,t,n,i,s=null){this.camera=e,this.viewmodelCamera=s,this.viewmodelTarget=s||e,this.collision=t,this.scene=n,this.tracerManager=i,this.position=new C(0,.9,-28),this.velocity=new C,this.onGround=!0,this.health=100,this.maxHealth=100,this.shield=50,this.alive=!0,this.isInvulnerable=!1,this.invulnTimer=0,this.keys={w:!1,s:!1,a:!1,d:!1,space:!1,ctrl:!1,shift:!1},this.isCrouched=!1,this.crouchProgress=0,this.isWalking=!1,this.taggingTimer=0,this.landingTimer=0,this.speedMult=1,this.isNoclip=!1,this.noclipSpeed=18,this.isGodMode=!1,this.isInfiniteAmmo=!1,this.weaponSlots=[null,null],this.activeSlot=0,this.weaponData=null,this.ammoMag=0,this.isReloading=!1,this.reloadTimer=null,this.lastFireTime=0,this.isFiring=!1,this.isScoped=!1,this.recoilPitch=0,this.recoilShots=0,this.gunRecoilOffset=new C,this.gunRecoilRot=new wt(0,0,0,"YXZ"),this.reloadStartTime=0,this.reloadDuration=2500,this.actionCycleType=null,this.actionCycleTimer=0,this.actionCycleTotal=0,this.wasScopedBeforeCycle=!1,this.defaultGunPosition=new C(.22,-.21,-.44),this.defaultGunRotation=new wt(-.02,-.035,.02,"YXZ"),this.currentBobOffset=new C(0,0,0),this.targetBobOffset=new C(0,0,0),this.currentBobRot=new wt(0,0,0,"YXZ"),this.targetBobRot=new wt(0,0,0,"YXZ"),this.bobPhase=0,this.bobWeight=0,this.idleTime=0,this.mouseSwayX=0,this.mouseSwayY=0,this.mouseSwayRotZ=0,this.mouseSwayRotX=0,this._mouseDeltaX=0,this._mouseDeltaY=0,this.mouseVelX=0,this.mouseVelY=0,this.strafeRoll=0,this.currentLandDip=0,this.jumpDip=0,this.raycaster=new Rg,this.footstepTimer=0,this.gunMesh=null,this.muzzleFlash=null,this._createGunModel(),this._createMuzzleFlash(),this._bindKeys(),this._triggerSpawnProtection(3e3)}setTracerManager(e){this.tracerManager=e}setAgent(e){this.speedMult=e.speed,this.maxHealth=e.health,this.health=e.health,this.shield=50,this._triggerSpawnProtection(3e3)}_triggerSpawnProtection(e=3e3){this.isInvulnerable=!0,this.invulnTimer=e,Re.emit("player:spawn_shield",{active:!0,durationMs:e}),setTimeout(()=>{this.isInvulnerable=!1,Re.emit("player:spawn_shield",{active:!1})},e)}equipWeapon(e,t=0){const n=_h(e);this.weaponSlots[t]={def:n,mag:n.magazineSize},this.activeSlot===t&&this._activateSlot(t)}_activateSlot(e){this.activeSlot=e;const t=this.weaponSlots[e];t&&(this.weaponData=t.def,this.ammoMag=t.mag,this.isReloading=!1,clearTimeout(this.reloadTimer),this._updateGunAppearance(t.def),Re.emit("weapon:switch",{slot:e,weapon:t.def,mag:t.mag}))}switchSlot(e){e!==this.activeSlot&&this.weaponSlots[e]&&(this.isReloading&&(clearTimeout(this.reloadTimer),this.isReloading=!1,this._resetReloadParts()),this._activateSlot(e))}_createGunModel(){this.gunMesh=new ke,this.gunBasePos=this.defaultGunPosition,this.gunBaseRot=this.defaultGunRotation,this.gunMesh.position.copy(this.defaultGunPosition),this.gunMesh.rotation.copy(this.defaultGunRotation),this.viewmodelTarget.add(this.gunMesh);const e=new As(16777215,1.25);e.position.set(.35,.55,.25),this.viewmodelTarget.add(e);const t=new As(9684477,.6);t.position.set(-.45,-.2,-.35),this.viewmodelTarget.add(t);const n=new gg(16777215,.85);this.viewmodelTarget.add(n),this.magMesh=null,this.boltMesh=null,this.coverMesh=null,this.beltMesh=null,this.shellMesh=null,this.magBasePos=null,this.boltBasePos=null,this.boltBaseRot=null,this.coverBasePos=null,this.coverBaseRot=null,this.shellBasePos=null,this.reloadSoundTriggers=new Set,this.weaponData&&this._buildDistinctWeaponMesh(this.weaponData.id)}_resetReloadParts(){this.magMesh&&(this.magBasePos&&this.magMesh.position.copy(this.magBasePos),this.magMesh.rotation.set(0,0,0),this.magMesh.visible=!0),this.boltMesh&&(this.boltBasePos&&this.boltMesh.position.copy(this.boltBasePos),this.boltBaseRot?this.boltMesh.rotation.copy(this.boltBaseRot):this.boltMesh.rotation.set(0,0,0)),this.coverMesh&&(this.coverBaseRot?this.coverMesh.rotation.copy(this.coverBaseRot):this.coverMesh.rotation.set(0,0,0)),this.beltMesh&&(this.beltMesh.visible=!0),this.shellMesh&&(this.shellMesh.visible=!1),this.reloadSoundTriggers.clear()}_buildDistinctWeaponMesh(e){if(!this.gunMesh)return;this.gunMesh.traverse(i=>{i.isMesh&&(i.geometry&&i.geometry.dispose(),i.material&&(Array.isArray(i.material)?i.material.forEach(s=>s.dispose()):i.material.dispose()))}),this.gunMesh.clear(),this.magMesh=null,this.boltMesh=null,this.coverMesh=null,this.beltMesh=null,this.shellMesh=null,this.magBasePos=null,this.boltBasePos=null,this.boltBaseRot=null,this.coverBasePos=null,this.coverBaseRot=null,this.shellBasePos=null,new ie({color:1449254,roughness:.35,metalness:.85,map:Dn()});const t=new ie({color:1119776,roughness:.8,metalness:.15,map:So()}),n=new ie({color:1317668,roughness:.35,metalness:.9,map:fn()});switch(e){case"vandal":{const i=new ie({color:1581100,roughness:.35,metalness:.85,map:Dn()}),s=new ie({color:16317180,roughness:.28,metalness:.3}),o=new ie({color:16096779,roughness:.2,metalness:.95,map:fn()}),a=new ie({color:16729685,emissive:16729685,emissiveIntensity:1.1,roughness:.2,map:bo("#ff4655")}),l=new P(new q(.07,.08,.46),i);l.position.set(0,.02,0),this.gunMesh.add(l);const c=new P(new q(.065,.065,.24),i);c.position.set(0,-.04,.04),this.gunMesh.add(c);const d=new P(new q(.062,.038,.36),s);d.position.set(0,.075,-.03),this.gunMesh.add(d);const h=new P(new q(.015,.032,.09),n);h.position.set(.035,.035,.02),this.gunMesh.add(h);const u=new P(new q(.032,.012,.32),n);u.position.set(0,.095,-.03),this.gunMesh.add(u);for(let re=0;re<7;re++){const ue=new P(new q(.036,.006,.016),o);ue.position.set(0,.103,-.15+re*.04),this.gunMesh.add(ue)}const p=new P(new q(.038,.022,.08),n);p.position.set(0,.11,-.04);const g=new P(new q(.04,.036,.014),o);g.position.set(0,.134,-.01);const _=new P(new ln(.032,.028),new lt({map:To("#00f0ff","circle-dot"),transparent:!0,opacity:.95,side:Nt}));_.position.set(0,.134,-.012),this.gunMesh.add(p),this.gunMesh.add(g),this.gunMesh.add(_);const f=new P(new q(.03,.024,.015),o);f.position.set(0,.11,.11),this.gunMesh.add(f);const m=new P(new q(.022,.032,.015),o);m.position.set(0,.08,-.44),this.gunMesh.add(m);const v=new P(new q(.032,.045,.05),n);v.position.set(0,.045,-.4),this.gunMesh.add(v);const x=new P(new fe(.01,.01,.28,8),n);x.geometry.rotateX(Math.PI/2),x.position.set(0,.05,-.25),this.gunMesh.add(x);const M=new P(new fe(.017,.017,.36,10),i);M.geometry.rotateX(Math.PI/2),M.position.set(0,.015,-.4),this.gunMesh.add(M);const A=new P(new q(.038,.042,.08),o);A.position.set(0,.015,-.6);const E=new P(new fe(.009,.009,.03,10),new lt({color:328965}));E.geometry.rotateX(Math.PI/2),E.position.set(0,.015,-.64),this.gunMesh.add(A),this.gunMesh.add(E);const w=new P(new q(.056,.09,.26),i);w.position.set(0,-.01,.34);const L=new P(new q(.058,.11,.025),n);L.position.set(0,-.01,.47);const U=new P(new q(.06,.016,.22),o);U.position.set(0,.045,.34),this.gunMesh.add(w),this.gunMesh.add(L),this.gunMesh.add(U);const y=new P(new q(.046,.16,.075),t);y.geometry.rotateX(.28),y.position.set(0,-.12,.14),this.gunMesh.add(y);const S=new P(new q(.02,.05,.085),n);S.position.set(0,-.085,.06);const B=new P(new q(.008,.032,.014),o);B.geometry.rotateX(.3),B.position.set(0,-.08,.06),this.gunMesh.add(S),this.gunMesh.add(B);const F=new ke,z=new P(new fe(.008,.008,.03,8),n);z.geometry.rotateZ(Math.PI/2);const Y=new P(new q(.025,.018,.04),o);Y.position.set(.02,0,0),F.add(z),F.add(Y),this.boltBasePos=new C(.042,.04,-.04),this.boltBaseRot=new wt(0,0,0),F.position.copy(this.boltBasePos),this.gunMesh.add(F),this.boltMesh=F;const G=new ke,J=new P(new q(.048,.24,.095),i);J.geometry.rotateX(-.25),J.position.set(0,-.1,0),G.add(J);for(let re=0;re<3;re++){const ue=new P(new q(.052,.012,.098),o);ue.geometry.rotateX(-.25),ue.position.set(0,-.06-re*.05,-.01+re*.015),G.add(ue)}const X=new P(new q(.054,.025,.11),o);X.geometry.rotateX(-.25),X.position.set(0,-.21,.025),G.add(X),this.magBasePos=new C(0,-.06,-.05),G.position.copy(this.magBasePos),this.gunMesh.add(G),this.magMesh=G;const le=new P(new q(.074,.02,.36),a);le.position.set(0,.02,-.02),this.gunMesh.add(le);break}case"spectre":{const i=new ie({color:15857145,roughness:.25,metalness:.35}),s=new ie({color:9741240,roughness:.28,metalness:.88,map:fn()}),o=new ie({color:61695,emissive:61695,emissiveIntensity:1.2,roughness:.2,map:bo("#00f0ff")}),a=new ie({color:1976635,roughness:.65,metalness:.2,map:So()}),l=new P(new q(.064,.09,.34),i);l.position.set(0,.02,0),this.gunMesh.add(l);const c=new P(new q(.03,.012,.26),n);c.position.set(0,.075,-.02),this.gunMesh.add(c);const d=new P(new q(.034,.018,.065),n);d.position.set(0,.088,-.02);const h=new P(new ln(.028,.024),new lt({map:To("#00f0ff","circle-dot"),transparent:!0,opacity:.95,side:Nt}));h.position.set(0,.106,-.01),this.gunMesh.add(d),this.gunMesh.add(h);const u=new P(new q(.015,.028,.07),n);u.position.set(.032,.03,.01),this.gunMesh.add(u);const p=new P(new fe(.03,.03,.34,14),s);p.geometry.rotateX(Math.PI/2),p.position.set(0,.015,-.32),this.gunMesh.add(p);const g=new P(new fe(.024,.03,.04,14),n);g.geometry.rotateX(Math.PI/2),g.position.set(0,.015,-.5);const _=new P(new fe(.008,.008,.03,10),new lt({color:328965}));_.geometry.rotateX(Math.PI/2),_.position.set(0,.015,-.52),this.gunMesh.add(g),this.gunMesh.add(_);const f=new fe(.033,.033,.032,14);f.rotateX(Math.PI/2);const m=new P(f,o);m.position.set(0,.015,-.24);const v=m.clone();v.position.z=-.38,this.gunMesh.add(m),this.gunMesh.add(v);const x=new ke,M=new P(new fe(.01,.01,.18,8),n);M.geometry.rotateX(Math.PI/2);const A=new P(new q(.025,.018,.035),s);A.position.set(-.025,.015,0),x.add(M),x.add(A),this.boltBasePos=new C(-.035,.055,-.14),this.boltBaseRot=new wt(0,0,0),x.position.copy(this.boltBasePos),this.gunMesh.add(x),this.boltMesh=x;const E=new ke,w=new P(new q(.042,.24,.055),i);w.position.set(0,-.1,0);const L=new P(new q(.046,.08,.015),o);L.position.set(0,-.09,.026);const U=new P(new q(.046,.025,.065),s);U.position.set(0,-.21,0),E.add(w),E.add(L),E.add(U),this.magBasePos=new C(0,-.04,.02),E.position.copy(this.magBasePos),this.gunMesh.add(E),this.magMesh=E;const y=new P(new q(.038,.06,.18),a);y.position.set(0,-.01,.24);const S=new P(new q(.042,.1,.02),n);S.position.set(0,-.02,.33),this.gunMesh.add(y),this.gunMesh.add(S);const B=new P(new q(.038,.1,.05),a);B.geometry.rotateX(.25),B.position.set(0,-.08,-.12),this.gunMesh.add(B);const F=new P(new q(.044,.16,.07),t);F.geometry.rotateX(.25),F.position.set(0,-.11,.12),this.gunMesh.add(F);const z=new P(new q(.018,.045,.075),n);z.position.set(0,-.07,.08);const Y=new P(new q(.008,.028,.012),o);Y.position.set(0,-.065,.08),this.gunMesh.add(z),this.gunMesh.add(Y);break}case"operator":{const i=new ie({color:5774471,roughness:.32,metalness:.65,map:Dn()}),s=new ie({color:1970739,roughness:.4,metalness:.75,map:Dn()}),o=new ie({color:13621468,roughness:.2,metalness:.92,map:fn()}),a=new ie({color:16498468,roughness:.18,metalness:.95,map:fn()}),l=new lt({map:d_(),transparent:!0,opacity:.94,side:Nt}),c=new lt({map:To("#06b6d4","sniper-cross"),transparent:!0,opacity:.9,side:Nt}),d=new P(new q(.08,.12,.68),i);d.position.set(0,.01,0),this.gunMesh.add(d);const h=new P(new fe(.024,.02,.68,12),o);h.geometry.rotateX(Math.PI/2),h.position.set(0,.035,-.66),this.gunMesh.add(h);const u=new P(new q(.058,.06,.13),s);u.position.set(0,.035,-1.04);const p=new P(new q(.062,.02,.09),a);p.position.set(0,.035,-1.04);const g=new P(new fe(.013,.013,.04,12),new lt({color:197379}));g.geometry.rotateX(Math.PI/2),g.position.set(0,.035,-1.1),this.gunMesh.add(u),this.gunMesh.add(p),this.gunMesh.add(g);const _=new P(new q(.045,.03,.06),n);_.position.set(0,-.06,-.28),this.gunMesh.add(_);const f=new P(new q(.016,.016,.26),o);f.position.set(-.04,-.07,-.4);const m=f.clone();m.position.x=.04,this.gunMesh.add(f),this.gunMesh.add(m);const v=new P(new q(.032,.05,.18),n);v.position.set(0,.085,-.04),this.gunMesh.add(v);const x=new P(new fe(.036,.038,.38,14),s);x.geometry.rotateX(Math.PI/2),x.position.set(0,.14,-.04);const M=new P(new fe(.042,.042,.025,14),a);M.geometry.rotateX(Math.PI/2),M.position.set(0,.14,-.04),this.gunMesh.add(x),this.gunMesh.add(M);const A=new P(new fe(.014,.014,.025,8),a);A.position.set(0,.185,-.04);const E=new P(new fe(.014,.014,.025,8),a);E.geometry.rotateZ(Math.PI/2),E.position.set(.045,.14,-.04),this.gunMesh.add(A),this.gunMesh.add(E);const w=new P(new Rr(.034,16),l);w.position.set(0,.14,.15);const L=new P(new Rr(.033,16),c);L.position.set(0,.14,.149),this.gunMesh.add(w),this.gunMesh.add(L);const U=new ke,y=new P(new fe(.016,.016,.16,10),o);y.geometry.rotateX(Math.PI/2);const S=new P(new fe(.009,.009,.08,8),a);S.geometry.rotateZ(Math.PI/3);const B=new P(new Un(.018,10,10),a);B.position.set(.065,.032,0),U.add(y),U.add(S),U.add(B),this.boltBasePos=new C(.042,.065,.06),this.boltBaseRot=new wt(0,0,0),U.position.copy(this.boltBasePos),this.gunMesh.add(U),this.boltMesh=U;const F=new ke,z=new P(new q(.06,.2,.14),s);z.position.set(0,-.08,0);const Y=new P(new q(.064,.02,.15),a);Y.position.set(0,-.17,0),F.add(z),F.add(Y),this.magBasePos=new C(0,-.05,.04),F.position.copy(this.magBasePos),this.gunMesh.add(F),this.magMesh=F;const G=new P(new q(.062,.11,.32),i);G.position.set(0,-.01,.44);const J=new P(new q(.045,.03,.16),s);J.position.set(0,.06,.4);const X=new P(new q(.066,.13,.035),n);X.position.set(0,-.01,.6),this.gunMesh.add(G),this.gunMesh.add(J),this.gunMesh.add(X);const le=new P(new q(.045,.16,.07),t);le.geometry.rotateX(.12),le.position.set(0,-.11,.18);const re=new P(new q(.02,.05,.09),n);re.position.set(0,-.075,.11);const ue=new P(new q(.008,.03,.014),a);ue.position.set(0,-.07,.11),this.gunMesh.add(le),this.gunMesh.add(re),this.gunMesh.add(ue);break}case"odin":{const i=new ie({color:15357964,roughness:.35,metalness:.5,map:Dn()}),s=new ie({color:3359061,roughness:.35,metalness:.88,map:fn()}),o=new ie({color:16096779,roughness:.22,metalness:.95,map:fn()}),a=new ie({color:16436245,roughness:.3,metalness:.4}),l=new P(new q(.11,.14,.52),i);l.position.set(0,.01,0),this.gunMesh.add(l);for(let L=0;L<4;L++){const U=L/4*Math.PI*2,y=new P(new fe(.013,.013,.44,8),s);y.geometry.rotateX(Math.PI/2),y.position.set(Math.cos(U)*.028,Math.sin(U)*.028+.02,-.48),this.gunMesh.add(y)}const c=new P(new fe(.046,.046,.04,12),o);c.geometry.rotateX(Math.PI/2),c.position.set(0,.02,-.66),this.gunMesh.add(c);for(let L=0;L<4;L++){const U=L/4*Math.PI*2,y=new P(new fe(.005,.005,.03,8),new lt({color:328965}));y.geometry.rotateX(Math.PI/2),y.position.set(Math.cos(U)*.028,Math.sin(U)*.028+.02,-.68),this.gunMesh.add(y)}const d=new P(new q(.038,.08,.24),s);d.position.set(0,.15,-.05);const h=new P(new q(.042,.025,.1),a);h.position.set(0,.18,-.05),this.gunMesh.add(d),this.gunMesh.add(h);const u=new ke,p=new P(new q(.1,.032,.26),s);p.position.set(0,0,.13);const g=new P(new q(.04,.018,.03),o);g.position.set(0,.015,.25),u.add(p),u.add(g),this.coverBasePos=new C(0,.08,-.14),this.coverBaseRot=new wt(0,0,0),u.position.copy(this.coverBasePos),this.gunMesh.add(u),this.coverMesh=u;const _=new ke;for(let L=0;L<4;L++){const U=new P(new fe(.007,.007,.04,8),o);U.geometry.rotateZ(Math.PI/2),U.position.set(-.06+L*.02,.065,-.02),_.add(U)}this.gunMesh.add(_),this.beltMesh=_;const f=new ke,m=new P(new fe(.105,.105,.13,16),o);m.geometry.rotateZ(Math.PI/2);const v=new P(new fe(.11,.11,.03,16),i);v.geometry.rotateZ(Math.PI/2),f.add(m),f.add(v),this.magBasePos=new C(-.13,-.08,.02),f.position.copy(this.magBasePos),this.gunMesh.add(f),this.magMesh=f;const x=new ke,M=new P(new q(.018,.018,.08),n),A=new P(new q(.032,.04,.025),o);A.position.set(.02,0,.03),x.add(M),x.add(A),this.boltBasePos=new C(.065,.03,.04),x.position.copy(this.boltBasePos),this.gunMesh.add(x),this.boltMesh=x;const E=new P(new q(.05,.18,.08),t);E.geometry.rotateX(.24),E.position.set(0,-.11,.2);const w=new P(new q(.024,.06,.09),n);w.position.set(0,-.075,.13),this.gunMesh.add(E),this.gunMesh.add(w);break}case"bucky":{const i=new ie({color:14427686,roughness:.25,metalness:.45,map:Dn()}),s=new ie({color:16708551,roughness:.4,metalness:.15}),o=new ie({color:16096779,roughness:.22,metalness:.95,map:fn()}),a=new ie({color:1976635,roughness:.35,metalness:.88,map:fn()}),l=new P(new q(.075,.11,.42),i);l.position.set(0,.01,0),this.gunMesh.add(l);const c=new P(new q(.015,.035,.09),n);c.position.set(.038,.02,.02);const d=new P(new q(.038,.012,.08),o);d.position.set(0,-.05,-.04),this.gunMesh.add(c),this.gunMesh.add(d);const h=new P(new fe(.02,.02,.42,12),a);h.geometry.rotateX(Math.PI/2),h.position.set(0,.035,-.42);const u=new P(new Un(.006,8,8),o);u.position.set(0,.06,-.62);const p=new P(new fe(.013,.013,.03,12),new lt({color:328965}));p.geometry.rotateX(Math.PI/2),p.position.set(0,.035,-.63),this.gunMesh.add(h),this.gunMesh.add(u),this.gunMesh.add(p);const g=new P(new fe(.017,.017,.38,12),a);g.geometry.rotateX(Math.PI/2),g.position.set(0,-.02,-.4);const _=new P(new q(.042,.075,.025),o);_.position.set(0,.01,-.56),this.gunMesh.add(g),this.gunMesh.add(_);const f=new ke,m=new P(new q(.068,.075,.18),s),v=new P(new q(.072,.078,.025),o);v.position.z=-.06;const x=new P(new q(.072,.078,.025),o);x.position.z=.06,f.add(m),f.add(v),f.add(x),this.boltBasePos=new C(0,-.02,-.32),f.position.copy(this.boltBasePos),this.gunMesh.add(f),this.boltMesh=f;const M=new ke,A=new P(new fe(.011,.011,.055,10),i);A.geometry.rotateX(Math.PI/2);const E=new P(new fe(.0115,.0115,.02,10),o);E.geometry.rotateX(Math.PI/2),E.position.z=.022,M.add(A),M.add(E),M.visible=!1,this.shellMesh=M,this.gunMesh.add(M);const w=new P(new q(.064,.11,.28),s);w.position.set(0,-.025,.32);const L=new P(new q(.068,.035,.03),o);L.position.set(0,-.025,.22);const U=new P(new q(.068,.12,.025),n);U.position.set(0,-.025,.46),this.gunMesh.add(w),this.gunMesh.add(L),this.gunMesh.add(U);const y=new P(new q(.02,.05,.08),n);y.position.set(0,-.075,.06);const S=new P(new q(.008,.03,.012),o);S.position.set(0,-.07,.06),this.gunMesh.add(y),this.gunMesh.add(S);break}case"classic":default:{const i=new ie({color:440020,roughness:.22,metalness:.7,map:fn()}),s=new ie({color:1317412,roughness:.65,metalness:.25,map:Dn()}),o=new ie({color:15485081,emissive:15485081,emissiveIntensity:1,roughness:.2,map:bo("#ec4899")}),a=new ie({color:16777215,roughness:.3,metalness:.1}),l=new P(new q(.052,.09,.26),s);l.position.set(0,-.015,0),this.gunMesh.add(l);const c=new P(new q(.034,.012,.08),n);c.position.set(0,-.05,-.08),this.gunMesh.add(c);const d=new ke,h=new P(new q(.055,.06,.28),i),u=new P(new q(.018,.025,.06),n);u.position.set(.022,.015,.01);const p=new P(new q(.057,.012,.16),o);p.position.set(0,.02,0);const g=new P(new q(.01,.018,.012),n);g.position.set(0,.038,-.12);const _=new P(new Un(.003,6,6),a);_.position.set(0,.04,-.11);const f=new P(new q(.026,.016,.014),n);f.position.set(0,.036,.12);const m=new P(new Un(.0025,6,6),a);m.position.set(-.008,.038,.125);const v=new P(new Un(.0025,6,6),a);v.position.set(.008,.038,.125),d.add(h),d.add(u),d.add(p),d.add(g),d.add(_),d.add(f),d.add(m),d.add(v),this.boltBasePos=new C(0,.055,-.01),d.position.copy(this.boltBasePos),this.gunMesh.add(d),this.boltMesh=d;const x=new P(new fe(.008,.008,.04,10),new lt({color:328965}));x.geometry.rotateX(Math.PI/2),x.position.set(0,.055,-.16),this.gunMesh.add(x);const M=new P(new q(.045,.18,.075),t);M.geometry.rotateX(.24),M.position.set(0,-.11,.08),this.gunMesh.add(M);const A=new P(new q(.018,.048,.075),n);A.position.set(0,-.07,.04);const E=new P(new q(.008,.028,.012),i);E.position.set(0,-.065,.04),this.gunMesh.add(A),this.gunMesh.add(E);const w=new ke,L=new P(new q(.036,.18,.055),n);L.geometry.rotateX(.24);const U=new P(new q(.04,.02,.065),i);U.position.set(0,-.1,0),w.add(L),w.add(U),this.magBasePos=new C(0,-.11,.08),w.position.copy(this.magBasePos),this.gunMesh.add(w),this.magMesh=w;const y=new P(new q(.054,.016,.06),o);y.position.set(0,.01,-.04),this.gunMesh.add(y);break}}this._buildFirstPersonArms(e),j_.loadModel(e).then(i=>{var s;if(i&&((s=this.weaponData)==null?void 0:s.id)===e&&this.gunMesh){const o=this.gunMesh.getObjectByName("firstPersonArms");this.gunMesh.clear(),this.gunMesh.add(i),o&&this.gunMesh.add(o),this.magMesh=i.getObjectByName("mag")||i.getObjectByName("magazine")||null,this.boltMesh=i.getObjectByName("bolt")||i.getObjectByName("slide")||null,this.coverMesh=i.getObjectByName("cover")||null,this.shellMesh=i.getObjectByName("shell")||null,this.gunMesh.traverse(a=>{a.isMesh&&(a.castShadow=!1,a.receiveShadow=!1)})}}),this.gunMesh.traverse(i=>{i.isMesh&&(i.castShadow=!1,i.receiveShadow=!1)})}_buildFirstPersonArms(e){const t=new ie({color:2042167,roughness:.7,metalness:.1,map:Dn()}),n=new ie({color:1120295,roughness:.6,metalness:.2,map:So()}),i=new ie({color:3621201,roughness:.4,metalness:.35}),s=new ke;s.name="firstPersonArms";const o=new ke,a=new fe(.044,.054,.38,10);a.rotateZ(.38),a.rotateX(-.45);const l=new P(a,t);l.position.set(.14,-.22,.26),o.add(l);const c=new ke,d=new q(.062,.075,.08),h=new P(d,n),u=new q(.066,.022,.055),p=new P(u,i);p.position.set(.025,.015,-.01);const g=new P(new q(.016,.016,.055),n);g.position.set(.015,.02,-.055),g.rotation.x=.2;const _=new P(new q(.018,.018,.045),n);_.position.set(-.035,.025,-.01),_.rotation.y=.4,c.add(h),c.add(p),c.add(g),c.add(_);let f=new C(0,-.1,.13);e==="operator"?f.set(0,-.1,.16):e==="odin"?f.set(0,-.1,.18):e==="classic"?f.set(0,-.09,.07):e==="spectre"&&f.set(0,-.1,.11),c.position.copy(f),c.rotation.x=.24,o.add(c),s.add(o);const m=new ke;if(this.leftArmMesh=m,e==="classic"){const v=new fe(.042,.05,.36,10);v.rotateZ(-.45),v.rotateX(-.4);const x=new P(v,t);x.position.set(-.13,-.21,.22),m.add(x);const M=new ke,A=new P(new q(.065,.07,.075),n),E=new P(new q(.068,.02,.05),i);E.position.set(-.02,.015,-.01),M.add(A),M.add(E),M.position.set(-.02,-.1,.06),M.rotation.z=-.3,M.rotation.x=.22,m.add(M)}else{let v=new C(-.02,-.07,-.22);e==="spectre"?v.set(-.02,-.08,-.12):e==="operator"?v.set(-.02,-.07,-.26):e==="odin"?v.set(-.02,-.08,-.18):e==="bucky"&&v.set(0,-.04,-.32);const x=new fe(.042,.05,.42,10);x.rotateZ(-.42),x.rotateX(-.55);const M=new P(x,t);M.position.set(-.16,-.2,v.z+.3),m.add(M);const A=new ke,E=new P(new q(.065,.055,.085),n),w=new P(new q(.068,.018,.055),i);w.position.set(-.025,-.02,0);const L=new P(new q(.022,.065,.065),n);L.position.set(.035,.015,0);const U=new P(new q(.018,.02,.05),n);U.position.set(-.035,.025,0),A.add(E),A.add(w),A.add(L),A.add(U),A.position.copy(v),A.rotation.z=-.15,e==="bucky"&&this.boltMesh?(A.position.set(0,-.02,0),this.boltMesh.add(A)):m.add(A)}s.add(m),this.gunMesh.add(s)}_updateGunAppearance(e){this.gunMesh&&this._buildDistinctWeaponMesh(e.id)}_createMuzzleFlash(){const e=new ln(.36,.36),t=Gg(),n=new lt({map:t,transparent:!0,opacity:0,depthTest:!1,blending:Ss,side:Nt});this.muzzleFlash=new P(e,n),this.muzzleFlash.position.set(.24,-.16,-.75),this.viewmodelTarget.add(this.muzzleFlash)}_showMuzzleFlash(){if(this.muzzleFlash&&!this.isScoped){this.muzzleFlash.rotation.z=Math.random()*Math.PI*2;const e=.85+Math.random()*.35;this.muzzleFlash.scale.set(e,e,e),this.muzzleFlash.material.opacity=1,setTimeout(()=>{this.muzzleFlash&&(this.muzzleFlash.material.opacity=0)},35)}}startFire(){this.isFiring=!0}stopFire(){this.isFiring=!1,this.recoilShots=0}_tryFire(e,t){if(!this.weaponData||!this.alive||this.isReloading||this.actionCycleTimer>0)return;const n=1e3/this.weaponData.fireRate;if(!(t-this.lastFireTime<n)){if(this.ammoMag<=0){this.reload();return}this.lastFireTime=t,this.isInfiniteAmmo||(this.ammoMag--,this.weaponSlots[this.activeSlot].mag=this.ammoMag),Re.emit("weapon:fire",{mag:this.ammoMag,weapon:this.weaponData}),xn.playShoot(this.weaponData.id),this._doShoot(e),this._applyRecoil(),this._showMuzzleFlash(),this.weaponData.isAuto||(this.isFiring=!1)}}_doShoot(e){const t=this.weaponData,n=t.pellets??1,i=t.id==="operator";for(let s=0;s<n;s++){let o=0,a=0;if(n>1){if(s>0){const v=(s-1)/(n-1)*Math.PI*2+(Math.random()-.5)*.35,x=Math.sqrt(Math.random())*.036;o=Math.cos(v)*x,a=Math.sin(v)*x}}else if(i||this.isScoped||this.recoilShots<=1)o=0,a=0;else{const v=Math.min(.0055,(this.recoilShots-1)*.001);o=(Math.random()-.5)*v*2,a=(Math.random()-.5)*v*2}const l=new C(o,a,-1).normalize();l.applyQuaternion(this.camera.quaternion),this.raycaster.set(this.camera.position,l);const c=this.collision.raycast(this.camera.position,l,t.range),d=c?this.camera.position.distanceTo(c.point):1/0,h=e.filter(v=>v&&!v.isDead),u=[];for(const v of h)if(v.hitboxes&&v.hitboxes.length>0)for(const x of v.hitboxes)x.userData.bot=v,u.push(x);const p=this.raycaster.intersectObjects(u,!1);let g=null,_=new C(0,1,0),f=!1;if(p.length>0){const v=p[0];if(v.distance<d){g=v.point.clone();const x=v.object,M=x.userData.bot;if(M&&!M.isDead){f=!0;const A=x.userData.hitPart==="head"||x.userData.isHead===!0,E=x.userData.hitPart==="leg"||x.userData.isLeg===!0,w=A?t.damageHead:E?t.damageLeg??t.damageBody:t.damageBody;xn.playHit(A),Re.emit("player:shot_bot",{bot:M,damage:w,isHead:A,point:g}),this.tracerManager&&(A?this.tracerManager.addHeadshotSparks(g,this.camera):this.tracerManager.addSparks(g))}}}f||(c?(g=c.point,this.tracerManager&&this.tracerManager.addSparks(g,_)):g=this.camera.position.clone().addScaledVector(l,80));let m;this.isScoped||i?m=this.camera.position.clone().addScaledVector(l,.45):(m=new C(.24,-.16,-.55),m.applyQuaternion(this.camera.quaternion).add(this.camera.position)),this.tracerManager&&g&&this.tracerManager.addTracer(m,g,!1,i)}this.recoilShots++}_applyRecoil(){if(!this.weaponData)return;const e=this.weaponData.recoilPattern,t=Math.min(this.recoilShots,e.length-1);switch(this.recoilPitch+=e[t]??.015,this.weaponData.id){case"operator":this.gunRecoilOffset.z=.2,this.gunRecoilOffset.y=.05,this.gunRecoilRot.x=.32,this.gunRecoilRot.y=.04,this.actionCycleType="bolt",this.actionCycleTotal=.85,this.actionCycleTimer=.85,xn.playBoltCycle(),this.isScoped&&(this.wasScopedBeforeCycle=!0,this.setScoped(!1));break;case"bucky":this.gunRecoilOffset.z=.15,this.gunRecoilOffset.y=.04,this.gunRecoilRot.x=.24,this.actionCycleType="pump",this.actionCycleTotal=.42,this.actionCycleTimer=.42,xn.playPumpCycle();break;case"odin":this.gunRecoilOffset.z=.08,this.gunRecoilOffset.y=(Math.random()-.5)*.025,this.gunRecoilRot.x=.12,this.gunRecoilRot.y=(Math.random()-.5)*.05,this.gunRecoilRot.z=(Math.random()-.5)*.06;break;case"spectre":this.gunRecoilOffset.z=.05,this.gunRecoilOffset.y=.015,this.gunRecoilRot.x=.08,this.gunRecoilRot.y=(Math.random()-.5)*.03;break;case"classic":this.gunRecoilOffset.z=.06,this.gunRecoilOffset.y=.03,this.gunRecoilRot.x=.22,this.gunRecoilRot.y=(Math.random()-.5)*.03,this.boltMesh&&(this.boltMesh.position.z=.04,setTimeout(()=>{this.boltMesh&&(this.boltMesh.position.z=-.01)},45));break;case"vandal":default:this.gunRecoilOffset.z=.11,this.gunRecoilOffset.y=.035,this.gunRecoilRot.x=.17,this.gunRecoilRot.y=(Math.random()-.5)*.04,this.gunRecoilRot.z=(Math.random()-.5)*.04;break}}reload(){!this.weaponData||this.isReloading||this.ammoMag>=this.weaponData.magazineSize||(this.isReloading=!0,this.actionCycleTimer=0,this.actionCycleType=null,this.reloadStartTime=performance.now(),this.reloadDuration=this.weaponData.reloadTime,this._resetReloadParts(),this.isScoped&&this.setScoped(!1),Re.emit("weapon:reload_start",{weapon:this.weaponData}))}takeDamage(e){var t;if(!(!this.alive||this.isGodMode)&&!this.isInvulnerable){if(this.shield>0){const n=Math.min(this.shield,e*.5);this.shield-=n*2,e-=n,this.shield<0&&(this.shield=0)}this.health=Math.max(0,this.health-e),this.taggingTimer=.38,Re.emit("player:damaged",{health:this.health,shield:this.shield}),this.health<=0&&(this.alive=!1,Re.emit("player:died",{currentWeaponId:((t=this.weaponData)==null?void 0:t.id)??"vandal"}))}}respawn(e){this.health=this.maxHealth,this.shield=50,this.alive=!0,this.velocity.set(0,0,0),this.position.copy(e),this.camera.position.copy(e),this.camera.position.y+=.72,this.camera.rotation.order="YXZ",this.camera.rotation.set(0,0,0),this.recoilPitch=0,this.recoilShots=0,this._triggerSpawnProtection(3e3),Re.emit("player:respawn",{health:this.health})}update(e,t=[]){if(!this.alive)return;const n=Math.min(e,.05);if(this.camera.rotation.order="YXZ",this.camera.rotation.z=0,this.camera.rotation.x=Math.max(-1.45,Math.min(1.45,this.camera.rotation.x)),this.isNoclip){const a=new C;this.camera.getWorldDirection(a);const l=new C().crossVectors(a,new C(0,1,0)).normalize(),c=new C;this.keys.w&&c.add(a),this.keys.s&&c.sub(a),this.keys.d&&c.add(l),this.keys.a&&c.sub(l),this.keys.space&&(c.y+=1),this.keys.ctrl&&(c.y-=1),c.lengthSq()>0&&c.normalize();const d=this.keys.shift?this.noclipSpeed*2.5:this.noclipSpeed;this.position.addScaledVector(c,d*n),this.velocity.set(0,0,0),this.onGround=!1;const h=.72-this.crouchProgress*.4;this.camera.position.x=this.position.x,this.camera.position.y=this.position.y+h,this.camera.position.z=this.position.z,this.keys.space=!1}else{const a=new C,l=new C;this.camera.getWorldDirection(a),a.y=0,a.normalize(),l.crossVectors(a,new C(0,1,0)).normalize();const c=new C;this.keys.w&&c.add(a),this.keys.s&&c.sub(a),this.keys.d&&c.add(l),this.keys.a&&c.sub(l),c.length()>1&&c.normalize(),this.taggingTimer>0&&(this.taggingTimer-=n),this.landingTimer>0&&(this.landingTimer-=n),this.isWalking=this.keys.shift,this.isCrouched=this.keys.ctrl;const d=this.isCrouched?1:0;this.crouchProgress+=(d-this.crouchProgress)*Math.min(1,n*16);let h=J_*this.speedMult;if(this.isScoped?h*=.45:this.isCrouched?h*=ex:this.isWalking&&(h*=Q_),this.taggingTimer>0){const A=.35+(1-this.taggingTimer/.38)*.65;h*=A}this.landingTimer>0&&(h*=.65);const u=c.x*h,p=c.z*h,g=this.onGround?tx:nx;this.velocity.x+=(u-this.velocity.x)*Math.min(1,n*g),this.velocity.z+=(p-this.velocity.z)*Math.min(1,n*g),this.keys.space&&this.onGround&&!this.isCrouched&&(xn.playJump(),this.velocity.y=$_,this.onGround=!1),this.onGround||(this.velocity.y+=Z_*n);const _=this.velocity.y,f=!!(this.keys.a||this.keys.d),m=this.velocity.clone().multiplyScalar(n),v=this.collision.resolve(this.position,m,.4,.9,f),x=this.onGround;this.position.copy(v.position),this.onGround=v.onGround,this.onGround&&this.velocity.y<0&&(this.velocity.y=0),v.collidedX&&(this.velocity.x=0),v.collidedZ&&(this.velocity.z=0),!f&&(v.collidedX||v.collidedZ)&&(this.velocity.x=0,this.velocity.z=0),!x&&this.onGround&&_<-3&&(this.landingTimer=ix,this.triggerLandDip(_));const M=.72-this.crouchProgress*.4;this.camera.position.x=this.position.x,this.camera.position.y=this.position.y+M,this.camera.position.z=this.position.z,this.keys.space=!1}const i=performance.now();this.isFiring&&this.weaponData&&this._tryFire(t,i),this.recoilPitch>0&&(this.recoilPitch=Math.max(0,this.recoilPitch-n*6));const s=new C,o=new C;if(this.isReloading){const a=i-this.reloadStartTime,l=Math.min(1,a/this.reloadDuration);if(l>=1)this.ammoMag=this.weaponData.magazineSize,this.weaponSlots[this.activeSlot].mag=this.ammoMag,this.isReloading=!1,this.recoilShots=0,this._resetReloadParts(),Re.emit("weapon:reload_done",{mag:this.ammoMag});else{const c=this.weaponData.id,d=h=>{this.reloadSoundTriggers.has(h)||(this.reloadSoundTriggers.add(h),xn.playReloadPart(c,h))};switch(c){case"vandal":{if(l<.22){const h=l/.22;s.x-=.04*h,s.y-=.14*Math.sin(h*Math.PI*.5),o.z-=.25*h,o.x-=.15*h,this.magMesh&&this.magBasePos&&(this.magMesh.position.y=this.magBasePos.y-h*.4,this.magMesh.position.z=this.magBasePos.z-h*.15,this.magMesh.rotation.x=-h*.5),d("eject")}else if(l<.55){const h=(l-.22)/.33;s.x-=.04,s.y-=.14,o.z-=.25,o.x-=.15,this.magMesh&&this.magBasePos&&(this.magMesh.position.y=this.magBasePos.y-(1-h)*.35,this.magMesh.position.z=this.magBasePos.z-(1-h)*.1,this.magMesh.rotation.x=-(1-h)*.3)}else if(l<.75){const h=(l-.55)/.2;this.magMesh&&this.magBasePos&&(this.magMesh.position.copy(this.magBasePos),this.magMesh.rotation.set(0,0,0));const u=Math.sin(h*Math.PI)*.05;s.y-=.14-u,o.x-=.15-u*2.5,o.z-=.25*(1-h*.3),d("slap")}else{const h=(l-.75)/.25;if(h<.5){const u=h/.5;this.boltMesh&&this.boltBasePos&&(this.boltMesh.position.z=this.boltBasePos.z+u*.12),s.z+=.05*u,o.z-=.12*u,d("bolt")}else{const u=(h-.5)/.5;this.boltMesh&&this.boltBasePos&&(this.boltMesh.position.z=this.boltBasePos.z+(1-u)*.12),s.z+=.05*(1-u),s.y-=.14*(1-u),o.z-=.18*(1-u),o.x-=.15*(1-u)}}break}case"spectre":{if(l<.2){const h=l/.2;o.z+=.28*h,o.y-=.12*h,s.y-=.08*h,this.magMesh&&this.magBasePos&&(this.magMesh.position.y=this.magBasePos.y-h*.45),d("eject")}else if(l<.55){const h=(l-.2)/.35;o.z=.28,o.y=-.12,s.y=-.08,this.magMesh&&this.magBasePos&&(this.magMesh.position.y=this.magBasePos.y-(1-h)*.35),h>.8&&d("insert")}else if(l<.82){const h=(l-.55)/.27;if(this.magMesh&&this.magBasePos&&this.magMesh.position.copy(this.magBasePos),h<.4){const u=h/.4;this.boltMesh&&this.boltBasePos&&(this.boltMesh.position.z=this.boltBasePos.z+u*.08,this.boltMesh.rotation.z=u*.4)}else{const u=(h-.4)/.6;this.boltMesh&&this.boltBasePos&&(this.boltMesh.position.z=this.boltBasePos.z,this.boltMesh.rotation.z=(1-u)*.4);const p=Math.sin(u*Math.PI)*.04;s.y-=.08+p,o.z-=p*2,d("hkslap")}}else{const h=(l-.82)/.18;o.z=.28*(1-h),o.y=-.12*(1-h),s.y=-.08*(1-h)}break}case"operator":{if(l<.18){const h=l/.18;s.x-=.05*h,o.z-=.15*h,this.boltMesh&&this.boltBaseRot&&(this.boltMesh.rotation.z=this.boltBaseRot.z+h*(Math.PI/2)),d("bolt_up")}else if(l<.36){const h=(l-.18)/.18;s.x-=.05,o.z-=.15,this.boltMesh&&this.boltBasePos&&(this.boltMesh.position.z=this.boltBasePos.z+h*.16),d("bolt_back")}else if(l<.54){const h=(l-.36)/.18;this.magMesh&&this.magBasePos&&(this.magMesh.position.y=this.magBasePos.y-h*.45),d("mag_out")}else if(l<.72){const h=(l-.54)/.18;this.magMesh&&this.magBasePos&&(this.magMesh.position.y=this.magBasePos.y-(1-h)*.45),d("mag_in")}else if(l<.88){const h=(l-.72)/.16;this.magMesh&&this.magBasePos&&this.magMesh.position.copy(this.magBasePos),this.boltMesh&&this.boltBasePos&&(this.boltMesh.position.z=this.boltBasePos.z+(1-h)*.16),d("bolt_forward")}else{const h=(l-.88)/.12;this.boltMesh&&this.boltBaseRot&&(this.boltMesh.rotation.z=this.boltBaseRot.z+(1-h)*(Math.PI/2)),s.x=-.05*(1-h),o.z=-.15*(1-h),d("bolt_lock")}break}case"odin":{if(l<.2){const h=l/.2;s.y-=.16*h,o.x-=.25*h,this.coverMesh&&(this.coverMesh.rotation.x=-h*1.05),d("cover_open")}else if(l<.45){const h=(l-.2)/.25;s.y-=.16,o.x-=.25,this.coverMesh&&(this.coverMesh.rotation.x=-1.05),this.magMesh&&this.magBasePos&&(this.magMesh.position.y=this.magBasePos.y-h*.45,this.magMesh.position.x=this.magBasePos.x-h*.2),this.beltMesh&&(this.beltMesh.visible=!1),d("drum_out")}else if(l<.7){const h=(l-.45)/.25;this.magMesh&&this.magBasePos&&(this.magMesh.position.y=this.magBasePos.y-(1-h)*.35,this.magMesh.position.x=this.magBasePos.x-(1-h)*.15),h>.8&&(this.beltMesh&&(this.beltMesh.visible=!0),d("drum_in"))}else if(l<.86){const h=(l-.7)/.16;this.magMesh&&this.magBasePos&&this.magMesh.position.copy(this.magBasePos),this.coverMesh&&(this.coverMesh.rotation.x=-(1-h)*1.05);const u=Math.sin(h*Math.PI)*.08;s.y-=.16+u,o.x-=.25-u*2,d("cover_slam")}else{const h=(l-.86)/.14;if(this.coverMesh&&(this.coverMesh.rotation.x=0),h<.5){const u=h/.5;this.boltMesh&&this.boltBasePos&&(this.boltMesh.position.z=this.boltBasePos.z+u*.14),d("rack")}else{const u=(h-.5)/.5;this.boltMesh&&this.boltBasePos&&(this.boltMesh.position.z=this.boltBasePos.z+(1-u)*.14)}s.y=-.16*(1-h),o.x=-.25*(1-h)}break}case"bucky":{if(l<.2){const h=l/.2;o.z+=.55*h,o.x-=.2*h,s.x-=.05*h,this.shellMesh&&(this.shellMesh.visible=!1)}else if(l<.45){const h=(l-.2)/.25;o.z=.55,o.x=-.2,s.x=-.05,this.shellMesh&&(this.shellMesh.visible=!0,this.shellMesh.position.set(0,-.18+h*.14,-.18+h*.12),this.shellMesh.rotation.x=-.3+h*.3),d("shell_insert")}else if(l<.7){const h=(l-.45)/.25;this.shellMesh&&(this.shellMesh.visible=!0,this.shellMesh.position.set(0,-.18+h*.14,-.18+h*.12),this.shellMesh.rotation.x=-.3+h*.3),h>.4&&d("shell_insert")}else if(l<.92){const h=(l-.7)/.22;this.shellMesh&&(this.shellMesh.visible=!1),o.z=.55*(1-h),o.x=-.2*(1-h),s.x=-.05*(1-h);const u=Math.sin(h*Math.PI);this.boltMesh&&this.boltBasePos&&(this.boltMesh.position.z=this.boltBasePos.z+u*.14),s.z+=u*.04,d("pump")}else this.boltMesh&&this.boltBasePos&&this.boltMesh.position.copy(this.boltBasePos),this.shellMesh&&(this.shellMesh.visible=!1);break}case"classic":{if(l<.22){const h=l/.22;s.z+=.1*h,s.y-=.08*h,o.z-=.25*h,this.magMesh&&this.magBasePos&&(this.magMesh.position.y=this.magBasePos.y-h*.42,this.magMesh.position.z=this.magBasePos.z+h*.12),this.boltMesh&&this.boltBasePos&&(this.boltMesh.position.z=this.boltBasePos.z+h*.045),d("eject")}else if(l<.55){const h=(l-.22)/.33;s.z=.1,s.y=-.08,o.z=-.25,this.magMesh&&this.magBasePos&&(this.magMesh.position.y=this.magBasePos.y-(1-h)*.35,this.magMesh.position.z=this.magBasePos.z+(1-h)*.1),h>.8&&d("insert")}else if(l<.76){const h=(l-.55)/.21;this.magMesh&&this.magBasePos&&this.magMesh.position.copy(this.magBasePos);const u=Math.sin(h*Math.PI)*.04;s.y+=u,o.x-=u*1.5,d("slap")}else if(l<.9){const h=(l-.76)/.14;this.boltMesh&&this.boltBasePos&&(this.boltMesh.position.z=this.boltBasePos.z+(1-h)*.045);const u=Math.sin(h*Math.PI)*.02;s.z+=u,d("slide_release")}else{const h=(l-.9)/.1;this.boltMesh&&this.boltBasePos&&this.boltMesh.position.copy(this.boltBasePos),s.z=.1*(1-h),s.y=-.08*(1-h),o.z=-.25*(1-h)}break}}}}if(this.actionCycleTimer>0){this.actionCycleTimer-=e;const a=1-Math.max(0,this.actionCycleTimer/this.actionCycleTotal);if(this.actionCycleType==="bolt")if(a<.35){const l=a/.35;o.z-=.3*Math.sin(l*Math.PI*.5),o.y+=.12*Math.sin(l*Math.PI*.5),s.z+=.06*l,this.boltMesh&&this.boltBaseRot&&(this.boltMesh.rotation.z=this.boltBaseRot.z+l*(Math.PI/2))}else if(a<.65){const l=(a-.35)/.3;o.z-=.3,o.y+=.12,s.z+=.06,this.boltMesh&&this.boltBasePos&&(this.boltMesh.position.z=this.boltBasePos.z+l*.15)}else{const l=(a-.65)/.35;o.z-=.3*(1-l),o.y+=.12*(1-l),s.z+=.06*(1-l),this.boltMesh&&this.boltBasePos&&this.boltBaseRot&&(this.boltMesh.position.z=this.boltBasePos.z+(1-l)*.15,this.boltMesh.rotation.z=this.boltBaseRot.z+(1-l)*(Math.PI/2))}else if(this.actionCycleType==="pump"){const l=Math.sin(a*Math.PI);s.z+=.07*l,s.y-=.03*l,o.x+=.1*l,this.boltMesh&&this.boltBasePos&&(this.boltMesh.position.z=this.boltBasePos.z+l*.14)}this.actionCycleTimer<=0&&(this.actionCycleTimer=0,this.actionCycleType=null,this.boltMesh&&(this.boltBasePos&&this.boltMesh.position.copy(this.boltBasePos),this.boltBaseRot&&this.boltMesh.rotation.copy(this.boltBaseRot)))}this._updateWeaponBobbing(n,s,o)}_updateWeaponBobbing(e,t,n){if(!this.gunMesh)return;const i=Math.sqrt(this.velocity.x**2+this.velocity.z**2),o=this.onGround&&i>.4?Math.min(1,(i-.4)/(this.isWalking?2.5:4.5)):0;this.bobWeight=Me.damp(this.bobWeight,o,8,e);const a=this.isWalking?5.8:7.2,l=this.bobPhase;if(this.bobWeight>.001&&(this.bobPhase+=e*a,this.bobPhase>Math.PI*200&&(this.bobPhase%=Math.PI*2),this.bobWeight>.35)){const E=!this.isWalking&&i>5;Math.sin(l)<0&&Math.sin(this.bobPhase)>=0?xn.playFootstep(E,!1):Math.sin(l)>=0&&Math.sin(this.bobPhase)<0&&xn.playFootstep(E,!0)}const c=(Math.cos(this.bobPhase*2)-1)*.5*.018*this.bobWeight,d=Math.sin(this.bobPhase)*.015*this.bobWeight,h=Math.cos(this.bobPhase)*.008*this.bobWeight,u=-Math.sin(this.bobPhase)*.024*this.bobWeight,p=Math.sin(this.bobPhase)*.014*this.bobWeight,g=Math.sin(this.bobPhase*2)*.008*this.bobWeight;this.idleTime+=e;const _=1-this.bobWeight,f=Math.sin(this.idleTime*1.5)*.0012*_,m=Math.cos(this.idleTime*.75)*8e-4*_,v=Math.sin(this.idleTime*1.5)*.0015*_;this.currentBobOffset.set(d+m,c+f,h),this.currentBobRot.set(g+v,p,u);let x=0;if(this.keys.a&&!this.keys.d?x=-.04:this.keys.d&&!this.keys.a&&(x=.04),this.strafeRoll=Me.damp(this.strafeRoll,x,8,e),this.onGround)this.jumpDip=Me.damp(this.jumpDip,0,10,e);else{const E=Math.max(-.016,Math.min(.024,-this.velocity.y*.003));this.jumpDip=Me.damp(this.jumpDip,E,8,e)}this.currentLandDip=Me.damp(this.currentLandDip,0,9,e);const M=Math.max(-30,Math.min(30,this._mouseDeltaX)),A=Math.max(-30,Math.min(30,this._mouseDeltaY));this._mouseDeltaX=0,this._mouseDeltaY=0,this.mouseVelX=Me.damp(this.mouseVelX,M,14,e),this.mouseVelY=Me.damp(this.mouseVelY,A,14,e),this.mouseVelX=Me.damp(this.mouseVelX,0,7,e),this.mouseVelY=Me.damp(this.mouseVelY,0,7,e),this.mouseSwayX=-this.mouseVelX*18e-5,this.mouseSwayY=this.mouseVelY*18e-5,this.mouseSwayRotZ=-this.mouseVelX*45e-5,this.gunRecoilOffset.lerp(new C(0,0,0),Math.min(1,e*18)),this.gunRecoilOffset.lengthSq()<5e-6&&this.gunRecoilOffset.set(0,0,0),this.gunRecoilRot.x=Me.lerp(this.gunRecoilRot.x,0,e*18),this.gunRecoilRot.y=Me.lerp(this.gunRecoilRot.y,0,e*18),this.gunRecoilRot.z=Me.lerp(this.gunRecoilRot.z,0,e*18),this.gunMesh.position.copy(this.defaultGunPosition).add(this.currentBobOffset).add(t).add(this.gunRecoilOffset),this.gunMesh.position.x+=this.mouseSwayX-this.strafeRoll*.2,this.gunMesh.position.y+=this.mouseSwayY-this.jumpDip-this.currentLandDip,this.crouchProgress>.01&&(this.gunMesh.position.y-=.01*this.crouchProgress,this.gunMesh.position.z+=.018*this.crouchProgress),this.gunMesh.rotation.set(this.defaultGunRotation.x+this.currentBobRot.x+n.x+this.gunRecoilRot.x+this.jumpDip*.7-this.currentLandDip*.55,this.defaultGunRotation.y+this.currentBobRot.y+n.y+this.gunRecoilRot.y,this.defaultGunRotation.z+this.currentBobRot.z+n.z+this.gunRecoilRot.z+this.strafeRoll+this.mouseSwayRotZ),this.gunMesh.visible=!this.isScoped}triggerLandDip(e=-6){if(e>=-3)return;const t=Math.min(.035,(Math.abs(e)-3)*.005);this.currentLandDip=t}setScoped(e){var n;this.isScoped=e;const t=((n=this.weaponData)==null?void 0:n.scopeMultiplier)>1?90/this.weaponData.scopeMultiplier:70;this.camera.fov=e?t:90,this.camera.updateProjectionMatrix(),Re.emit("player:scope",{scoped:e})}setNoclip(e){this.isNoclip=e,e&&(this.velocity.set(0,0,0),this.onGround=!1)}toggleNoclip(){return this.setNoclip(!this.isNoclip),this.isNoclip}teleportTo(e,t,n){this.position.set(e,t,n),this.velocity.set(0,0,0);const i=.72-this.crouchProgress*.4;this.camera.position.set(e,t+i,n)}_bindKeys(){const e=(t,n)=>{switch(t.code){case"KeyW":this.keys.w=n;break;case"KeyS":this.keys.s=n;break;case"KeyA":this.keys.a=n;break;case"KeyD":this.keys.d=n;break;case"Space":n&&(this.keys.space=!0);break;case"ControlLeft":case"ControlRight":this.keys.ctrl=n;break;case"ShiftLeft":case"ShiftRight":this.keys.shift=n;break}};document.addEventListener("keydown",t=>e(t,!0)),document.addEventListener("keyup",t=>e(t,!1)),document.addEventListener("keydown",t=>{t.code==="Digit1"&&this.switchSlot(0),t.code==="Digit2"&&this.switchSlot(1),t.code==="KeyR"&&this.reload()}),document.addEventListener("wheel",t=>{const n=t.deltaY>0?1:0;this.switchSlot(n)}),document.addEventListener("mousemove",t=>{document.pointerLockElement&&(this._mouseDeltaX+=t.movementX,this._mouseDeltaY+=t.movementY)})}}class rx{static build(e,t){const n=new ke,i=[],s=e.bodyColor??15857145,o=e.vestColor??16729685,a=e.accentColor??16739125,l=new ie({color:s,roughness:.45,metalness:.15}),c=new ie({color:o,roughness:.4,metalness:.25}),d=new ie({color:a,emissive:a,emissiveIntensity:.7,roughness:.2}),h=new ie({color:15910045,roughness:.65}),u=new ie({color:3359832,roughness:.65,metalness:.1}),p=new ie({color:2370872,roughness:.6,metalness:.2}),g=new ie({color:61695,emissive:50392,emissiveIntensity:.85,roughness:.15,metalness:.8}),_=new Dt({color:16721984,transparent:!0,opacity:.85}),f=new ke;f.position.set(0,0,0);const m=new fe(.2,.18,.12,8),v=new P(m,u);v.position.y=.05,v.castShadow=!0,v.userData.hitPart="body",v.userData.isBody=!0,f.add(v),i.push(v);const x=new fe(.22,.22,.08,12),M=new P(x,p);M.position.y=.11,f.add(M);for(let Ve=-1;Ve<=1;Ve+=2){const me=new q(.08,.09,.09),Ee=new P(me,p);Ee.position.set(Ve*.22,.11,.04),f.add(Ee)}const A=new q(.08,.18,.11),E=new P(A,p);E.position.set(.24,.02,.04),E.rotation.z=-.15,f.add(E);const w=new q(.04,.08,.05),L=new P(w,c);L.position.set(.26,.1,.04),L.rotation.z=-.3,f.add(L);const U=new fe(.21,.19,.18,8),y=new P(U,u);y.position.y=.23,y.castShadow=!0,y.userData.hitPart="body",y.userData.isBody=!0,f.add(y),i.push(y);const S=new fe(.24,.2,.3,8),B=new P(S,l);B.position.y=.46,B.castShadow=!0,B.receiveShadow=!0,B.userData.hitPart="body",B.userData.isBody=!0,B.add(new Wt(new Qt(S),_)),f.add(B),i.push(B);const F=new fe(.24,.21,.28,8,1,!1,-Math.PI/2,Math.PI),z=new P(F,c);z.position.set(0,.46,.03),z.castShadow=!0,z.userData.hitPart="body",z.userData.isBody=!0,z.add(new Wt(new Qt(F),_)),f.add(z),i.push(z);const Y=new q(.3,.045,.22),G=new P(Y,d);G.position.set(0,.48,.06),f.add(G);const J=new q(.08,.08,.03),X=new lt({color:a}),le=new P(J,X);le.position.set(0,.48,.15),le.rotation.z=Math.PI/4,f.add(le);const re=new fe(.12,.14,.08,8),ue=new P(re,p);ue.position.set(0,.62,.01),ue.castShadow=!0,f.add(ue);const Ye=new fe(.09,.08,.16,6);Ye.rotateZ(Math.PI/2);const tt=new P(Ye,c);tt.position.set(-.28,.56,.01),tt.rotation.z=.25,tt.castShadow=!0,tt.add(new Wt(new Qt(Ye),_));const j=new P(Ye,c);j.position.set(.28,.56,.01),j.rotation.z=-.25,j.castShadow=!0,j.add(new Wt(new Qt(Ye),_)),f.add(tt),f.add(j);const ee=new q(.065,.11,.06),Se=new P(ee,p);Se.position.set(-.2,.58,.1);const xe=new fe(.007,.007,.12),Oe=new P(xe,p);Oe.position.set(-.2,.67,.1),f.add(Se),f.add(Oe);const ye=new ke;ye.position.set(0,.65,.01);const $e=new fe(.075,.085,.12,8),Je=new P($e,h);Je.position.y=.04,Je.castShadow=!0,Je.userData.hitPart="head",Je.userData.isHead=!0,Je.add(new Wt(new Qt($e),_)),ye.add(Je),i.push(Je);const Qe=new fe(.11,.095,.22,8),I=new P(Qe,h);I.position.set(0,.18,.01),I.castShadow=!0,I.receiveShadow=!0,I.userData.hitPart="head",I.userData.isHead=!0,I.add(new Wt(new Qt(Qe),_)),ye.add(I),i.push(I);const Gt=new q(.14,.042,.06),je=new P(Gt,g);je.position.set(0,.19,.09),ye.add(je);const et=new fe(.04,.04,.04,8);et.rotateZ(Math.PI/2);const Le=new P(et,p);Le.position.set(-.11,.18,.01);const ft=new P(et,p);ft.position.set(.11,.18,.01);const Ue=new q(.23,.025,.05),R=new P(Ue,p);R.position.set(0,.29,.01);const b=new fe(.007,.007,.09,6);b.rotateX(Math.PI/2);const k=new P(b,p);switch(k.position.set(-.1,.14,.07),ye.add(Le),ye.add(ft),ye.add(R),ye.add(k),e.id){case"blaze":{const Ve=new Mn(.12,.22,7),me=new ie({color:16739125,emissive:16729685,emissiveIntensity:.65}),Ee=new P(Ve,me);Ee.position.set(0,.32,-.01),Ee.userData.hitPart="head",Ee.userData.isHead=!0,ye.add(Ee),i.push(Ee);break}case"cipher":{const Ve=new Un(.07,8,8),me=new ie({color:16777215,roughness:.5}),Ee=new P(Ve,me);Ee.position.set(0,.31,-.06),Ee.userData.hitPart="head",Ee.userData.isHead=!0,ye.add(Ee),i.push(Ee);const St=new fe(.12,.12,.05,8),Kt=new P(St,d);Kt.position.set(0,.22,.01),ye.add(Kt);break}case"scope":{const Ve=new fe(.13,.13,.18,8),me=new P(Ve,l);me.position.set(0,.23,0),me.userData.hitPart="head",me.userData.isHead=!0,ye.add(me),i.push(me);const Ee=new fe(.025,.025,.04,8);Ee.rotateX(Math.PI/2);const St=new lt({color:61695}),Kt=new P(Ee,St);Kt.position.set(-.05,.19,.1),ye.add(Kt);break}case"rampart":{const Ve=new fe(.125,.125,.15,8),me=new ie({color:11032055,roughness:.75}),Ee=new P(Ve,me);Ee.position.set(0,.25,0),Ee.userData.hitPart="head",Ee.userData.isHead=!0,ye.add(Ee),i.push(Ee);const St=new q(.16,.05,.05),Kt=new ie({color:16765286,metalness:.8,roughness:.2}),ti=new P(St,Kt);ti.position.set(0,.19,.09),ye.add(ti);break}case"phantom":{const Ve=new fe(.135,.13,.24,8),me=new ie({color:7020968,emissive:4988309,emissiveIntensity:.45,roughness:.55}),Ee=new P(Ve,me);Ee.position.set(0,.21,0),Ee.userData.hitPart="head",Ee.userData.isHead=!0,ye.add(Ee),i.push(Ee);const St=new lt({color:61695});for(let Kt=-1;Kt<=1;Kt++){const ti=new q(.02,.08,.03),_n=new P(ti,St);_n.position.set(Kt*.04,.18,.12),ye.add(_n)}break}}f.add(ye);const Z=new fe(.06,.05,.54,8),Q=new P(Z,l);Q.position.set(-.28,.54,.04),Q.rotation.x=-Math.PI/4,Q.rotation.z=Math.PI/12,Q.castShadow=!0,Q.userData.hitPart="body",Q.userData.isBody=!0,Q.add(new Wt(new Qt(Z),_)),f.add(Q),i.push(Q);const K=new P(Z,l);K.position.set(.28,.54,.04),K.rotation.x=-Math.PI/4,K.rotation.z=-Math.PI/12,K.castShadow=!0,K.userData.hitPart="body",K.userData.isBody=!0,K.add(new Wt(new Qt(Z),_)),f.add(K),i.push(K);const oe=new ke,se=new ie({color:3885142,metalness:.75,roughness:.32,map:fn()}),pe=new ie({color:1581100,metalness:.85,roughness:.35,map:Dn()});switch((t==null?void 0:t.id)??"vandal"){case"spectre":{const Ve=new P(new q(.08,.12,.35),pe);oe.add(Ve);const me=new P(new fe(.035,.035,.32,8),se);me.geometry.rotateX(Math.PI/2),me.position.set(0,.02,-.32),oe.add(me);const Ee=new P(new q(.05,.22,.06),p);Ee.position.set(0,-.12,.02),oe.add(Ee);break}case"operator":{const Ve=new P(new q(.09,.15,.75),pe);oe.add(Ve);const me=new P(new fe(.025,.022,.65,8),se);me.geometry.rotateX(Math.PI/2),me.position.set(0,.03,-.68),oe.add(me);const Ee=new P(new fe(.04,.042,.38,8),se);Ee.geometry.rotateX(Math.PI/2),Ee.position.set(0,.14,-.05),oe.add(Ee);break}case"odin":{const Ve=new P(new q(.13,.16,.55),se);oe.add(Ve);const me=new P(new fe(.12,.12,.16,12),c);me.geometry.rotateZ(Math.PI/2),me.position.set(-.13,-.1,.02),oe.add(me);break}case"bucky":{const Ve=new P(new q(.09,.13,.48),se);oe.add(Ve);const me=new P(new fe(.025,.025,.42,8),pe);me.geometry.rotateX(Math.PI/2),me.position.set(0,.04,-.42),oe.add(me);break}case"classic":{const Ve=new P(new q(.06,.1,.28),pe);oe.add(Ve);const me=new P(new q(.062,.06,.28),se);me.position.set(0,.06,0),oe.add(me);break}case"vandal":default:{const Ve=new P(new q(.08,.13,.52),pe);oe.add(Ve);const me=new P(new fe(.02,.02,.38,8),se);me.geometry.rotateX(Math.PI/2),me.position.set(0,.03,-.44),oe.add(me);const Ee=new P(new q(.05,.24,.1),c);Ee.geometry.rotateX(-.25),Ee.position.set(0,-.12,-.06),oe.add(Ee);const St=new P(new q(.085,.025,.36),d);St.position.set(0,.04,-.05),oe.add(St);break}}oe.position.set(.18,.44,.34),f.add(oe),n.add(f);const te=new fe(.095,.08,.38,8),ve=new fe(.08,.065,.36,8),Ce=new fe(.085,.085,.12,6);Ce.rotateZ(Math.PI/2);const Ie=new q(.15,.14,.24),ge=new ke;ge.position.set(-.12,0,0);const Ge=new P(te,u);Ge.position.y=-.19,Ge.castShadow=!0,Ge.userData.hitPart="leg",Ge.userData.isLeg=!0,ge.add(Ge),i.push(Ge);const Pe=new ke;Pe.position.set(0,-.38,0);const it=new P(ve,u);it.position.y=-.18,it.castShadow=!0,it.userData.hitPart="leg",it.userData.isLeg=!0,Pe.add(it),i.push(it);const D=new P(Ce,c);D.position.set(0,.02,.07),D.userData.hitPart="leg",D.userData.isLeg=!0,D.add(new Wt(new Qt(Ce),_)),Pe.add(D),i.push(D);const he=new P(Ie,p);he.position.set(0,-.36,.03),he.castShadow=!0,he.userData.hitPart="leg",he.userData.isLeg=!0,Pe.add(he),i.push(he),ge.add(Pe),n.add(ge);const W=new ke;W.position.set(.12,0,0);const $=new P(te,u);$.position.y=-.19,$.castShadow=!0,$.userData.hitPart="leg",$.userData.isLeg=!0,W.add($),i.push($);const ae=new ke;ae.position.set(0,-.38,0);const de=new P(ve,u);de.position.y=-.18,de.castShadow=!0,de.userData.hitPart="leg",de.userData.isLeg=!0,ae.add(de),i.push(de);const He=new P(Ce,c);He.position.set(0,.02,.07),He.userData.hitPart="leg",He.userData.isLeg=!0,He.add(new Wt(new Qt(Ce),_)),ae.add(He),i.push(He);const pt=new P(Ie,p);return pt.position.set(0,-.36,.03),pt.castShadow=!0,pt.userData.hitPart="leg",pt.userData.isLeg=!0,ae.add(pt),i.push(pt),W.add(ae),n.add(W),{root:n,hitboxes:i,legL:ge,legR:W,kneeL:Pe,kneeR:ae,armL:Q,armR:K,torso:f,headGroup:ye,gunGroup:oe}}}const ms=5.8,ox=32,Pc=52,ax=18,Pt={IDLE:0,WANDER:1,CHASE:2,SHOOT:3,DEAD:4};let lx=0;class cx{constructor(e,t,n,i,s){this.id=lx++,this.scene=e,this.spawnPos=t.clone(),this.agent=n,this.weaponDef=_h(i),this.tracerManager=s,this.name=`BOT_${["CIPHER","SCOPE","RAMPART","PHANTOM","BLAZE"][this.id%5]}`,this.position=t.clone(),this.velocity=new C,this.rotation=0,this.targetRotation=0,this.health=n.health,this.maxHealth=n.health,this.state=Pt.IDLE,this.isDead=!1,this.kills=0,this.ammo=this.weaponDef.magazineSize,this.lastFire=0,this.isReloading=!1,this.spottedTimer=0,this.burstRemaining=0,this.burstCooldown=0,this.wanderTarget=t.clone(),this.wanderTimer=0,this.stuckTimer=0,this.lastStuckPos=t.clone(),this.animTime=Math.random()*10,this.isMoving=!1,this.flinchTimer=0,this.deathFallTimer=0,this.jumpTimer=0,this.jumpCooldown=2.5+Math.random()*3,this.verticalVel=0,this.isJumping=!1,this.botLandDip=0,this.mesh=null,this.hitboxes=[],this.legL=null,this.legR=null,this.kneeL=null,this.kneeR=null,this.armL=null,this.armR=null,this.torso=null,this.headGroup=null,this.gunGroup=null,this.healthBar=null,this.recoilKick=0,this.isHeadshotDeath=!1,this.isFrozen=!1,this.isPassive=!1,this._buildModel()}_buildModel(){const e=rx.build(this.agent,this.weaponDef);this.mesh=e.root,this.hitboxes=e.hitboxes||[];for(const p of this.hitboxes)p.userData.bot=this;this.legL=e.legL,this.legR=e.legR,this.kneeL=e.kneeL,this.kneeR=e.kneeR,this.armL=e.armL,this.armR=e.armR,this.torso=e.torso,this.headGroup=e.headGroup,this.gunGroup=e.gunGroup,this.gunGroup&&this.gunGroup.traverse(p=>{p.raycast=()=>{}});const t=new ln(1.04,.14),n=new lt({color:988970,transparent:!0,opacity:.85,depthTest:!1}),i=new P(t,n);i.position.y=1.15,i.rotation.x=-.3,i.raycast=()=>{},this.mesh.add(i);const s=new ln(1,.1),o=new lt({color:65415,transparent:!0,opacity:.95,depthTest:!1});this.healthBar=new P(s,o),this.healthBar.position.set(0,1.15,.01),this.healthBar.rotation.x=-.3,this.healthBar.raycast=()=>{},this.mesh.add(this.healthBar);const a=new Mn(.11,.18,4);a.rotateX(Math.PI);const l=new lt({color:16726866,depthTest:!1}),c=new P(a,l);c.position.y=1.28,c.raycast=()=>{},this.mesh.add(c);const d=new ln(.95,.95),h=new lt({map:i_(),transparent:!0,opacity:.65,depthWrite:!1}),u=new P(d,h);u.rotation.x=-Math.PI/2,u.position.y=-.895,u.raycast=()=>{},this.mesh.add(u),this.mesh.position.copy(this.position),this.scene.add(this.mesh)}_updateHealthBar(){if(!this.healthBar)return;const e=this.health/this.maxHealth;this.healthBar.scale.x=Math.max(0,e);const t=new De;t.setHSL(e*.33,1,.5),this.healthBar.material.color.copy(t)}update(e,t,n,i,s,o=[]){if(this.isFrozen){this.mesh&&this.mesh.position.copy(this.position),this._updateHealthBar();return}if(this.isDead){this.deathFallTimer>0&&(this.deathFallTimer-=e,this.isHeadshotDeath?(this.headGroup&&(this.headGroup.rotation.x=Me.lerp(this.headGroup.rotation.x,-.95,e*18)),this.torso&&(this.torso.rotation.x=Me.lerp(this.torso.rotation.x,-.45,e*15),this.torso.rotation.y=Me.lerp(this.torso.rotation.y,.35,e*12)),this.kneeL&&(this.kneeL.rotation.x=Me.lerp(this.kneeL.rotation.x,1.45,e*15)),this.kneeR&&(this.kneeR.rotation.x=Me.lerp(this.kneeR.rotation.x,1.3,e*15)),this.legL&&(this.legL.rotation.x=Me.lerp(this.legL.rotation.x,-.6,e*15)),this.legR&&(this.legR.rotation.x=Me.lerp(this.legR.rotation.x,-.4,e*15)),this.armL&&(this.armL.rotation.x=Me.lerp(this.armL.rotation.x,.4,e*12)),this.armR&&(this.armR.rotation.x=Me.lerp(this.armR.rotation.x,.6,e*12)),this.mesh&&(this.mesh.position.y=Me.lerp(this.mesh.position.y,this.spawnPos.y-.7,e*14),this.mesh.rotation.x=Me.lerp(this.mesh.rotation.x,-.65,e*10))):(this.torso&&(this.torso.rotation.x=Me.lerp(this.torso.rotation.x,.85,e*16)),this.headGroup&&(this.headGroup.rotation.x=Me.lerp(this.headGroup.rotation.x,.55,e*16)),this.kneeL&&(this.kneeL.rotation.x=Me.lerp(this.kneeL.rotation.x,1.35,e*15)),this.kneeR&&(this.kneeR.rotation.x=Me.lerp(this.kneeR.rotation.x,1.2,e*15)),this.armL&&(this.armL.rotation.x=Me.lerp(this.armL.rotation.x,-.2,e*10)),this.armR&&(this.armR.rotation.x=Me.lerp(this.armR.rotation.x,-.1,e*10)),this.mesh&&(this.mesh.position.y=Me.lerp(this.mesh.position.y,this.spawnPos.y-.72,e*14),this.mesh.rotation.x=Me.lerp(this.mesh.rotation.x,.85,e*10))));return}const a=performance.now();let l=null,c=1/0;if(i){const u=this.position.distanceTo(t);u<Pc&&this._hasLineOfSight(t,n)&&(l={isPlayer:!0,position:t,velocity:s,distance:u,name:"YOU",entity:null},c=u)}if(Array.isArray(o))for(const u of o){if(!u||u===this||u.isDead)continue;const p=this.position.distanceTo(u.position);p<Pc&&p<c&&this._hasLineOfSight(u.position,n)&&(l={isPlayer:!1,position:u.position,velocity:u.velocity,distance:p,name:u.name,entity:u},c=p)}switch(this.currentTarget=l,l?(this.spottedTimer+=e,c<ox&&this.spottedTimer>.28?this.state=Pt.SHOOT:this.state=Pt.CHASE):(this.spottedTimer=0,(this.state===Pt.SHOOT||this.state===Pt.CHASE)&&(this.state=Pt.WANDER)),this.isMoving=!1,this.state){case Pt.IDLE:this.wanderTimer-=e*1e3,this.wanderTimer<=0&&(this.state=Pt.WANDER,this._pickWanderTarget(t));break;case Pt.WANDER:this.isMoving=!0,this._moveToward(this.wanderTarget,ms*.65,e,n),this.position.distanceTo(this.wanderTarget)<1.5&&(this._pickWanderTarget(t),this.state=Pt.IDLE,this.wanderTimer=800+Math.random()*1500),this.stuckTimer+=e*1e3,this.stuckTimer>1800&&(this.position.distanceTo(this.lastStuckPos)<.6&&this._pickWanderTarget(t),this.lastStuckPos.copy(this.position),this.stuckTimer=0);break;case Pt.CHASE:this.isMoving=!0,this._moveToward(l.position,ms,e,n),this._aimAt(l.position);break;case Pt.SHOOT:this._strafeAround(l.position,e,n),this._aimAt(l.position),this._tryShootTarget(l,a);break}let d=this.targetRotation-this.rotation;for(;d<-Math.PI;)d+=Math.PI*2;for(;d>Math.PI;)d-=Math.PI*2;this.rotation+=d*Math.min(1,e*14);const h=-d*.18;if(this.mesh.rotation.z=Me.lerp(this.mesh.rotation.z,h,e*10),this.jumpTimer+=e,this.jumpTimer>this.jumpCooldown&&(this.state===Pt.CHASE||this.state===Pt.SHOOT)&&!this.isJumping&&(Math.random()<.45&&(this.isJumping=!0,this.verticalVel=5.2),this.jumpTimer=0,this.jumpCooldown=2+Math.random()*2.8),this.isJumping?(this.verticalVel-=18*e,this.position.y+=this.verticalVel*e,this.position.y<=this.spawnPos.y&&(this.position.y=this.spawnPos.y,this.verticalVel=0,this.isJumping=!1,this.botLandDip=.08)):this.position.y=this.spawnPos.y,this.mesh.position.copy(this.position),this.mesh.rotation.y=this.rotation,l&&(this.headGroup||this.torso)){const u=l.position.y+.72-(this.position.y+.84),p=Math.hypot(l.position.x-this.position.x,l.position.z-this.position.z),g=-Math.atan2(u,Math.max(.1,p));this.headGroup&&(this.headGroup.rotation.x=Me.lerp(this.headGroup.rotation.x,g*.7,e*10))}else this.headGroup&&(this.headGroup.rotation.x=Me.lerp(this.headGroup.rotation.x,0,e*6));this._animateBot(e),this._updateHealthBar()}_hasLineOfSight(e,t){const n=this.position.clone();n.y+=.84;const i=e.clone();i.y+=.72;const s=new C().subVectors(i,n),o=s.length();return s.normalize(),t.raycast(n,s,o-.2)===null}_animateBot(e){if(this.animTime+=e*(this.isMoving?11.5:2.5),this.flinchTimer>0&&(this.flinchTimer-=e),this.recoilKick>0&&(this.recoilKick=Me.lerp(this.recoilKick,0,e*16)),this.botLandDip>0&&(this.botLandDip=Me.lerp(this.botLandDip,0,e*14),this.botLandDip<.001&&(this.botLandDip=0)),this.isJumping)this.legL&&(this.legL.rotation.x=Me.lerp(this.legL.rotation.x,-.4,e*14)),this.legR&&(this.legR.rotation.x=Me.lerp(this.legR.rotation.x,-.32,e*14)),this.kneeL&&(this.kneeL.rotation.x=Me.lerp(this.kneeL.rotation.x,.7,e*14)),this.kneeR&&(this.kneeR.rotation.x=Me.lerp(this.kneeR.rotation.x,.6,e*14)),this.armL&&(this.armL.rotation.x=Me.lerp(this.armL.rotation.x,-Math.PI/3,e*12)),this.armR&&(this.armR.rotation.x=Me.lerp(this.armR.rotation.x,-Math.PI/3,e*12)),this.torso&&(this.torso.rotation.x=Me.lerp(this.torso.rotation.x,.12,e*10),this.torso.rotation.z=Me.lerp(this.torso.rotation.z,0,e*10));else if(this.isMoving){const t=Math.sin(this.animTime),n=Math.sin(this.animTime+Math.PI);this.legL&&(this.legL.rotation.x=t*.56),this.legR&&(this.legR.rotation.x=n*.56);const i=Math.sin(this.animTime-.4),s=Math.sin(this.animTime+Math.PI-.4);this.kneeL&&(this.kneeL.rotation.x=Math.max(.04,-i*.78)),this.kneeR&&(this.kneeR.rotation.x=Math.max(.04,-s*.78)),this.torso&&(this.torso.position.y=Math.abs(Math.sin(this.animTime))*.035-this.botLandDip,this.torso.rotation.z=Math.cos(this.animTime)*.035,this.torso.rotation.x=.07,this.torso.rotation.y=-t*.06),this.armL&&(this.armL.rotation.x=-Math.PI/4+t*.15),this.armR&&(this.armR.rotation.x=-Math.PI/4+n*.1),this.gunGroup&&(this.gunGroup.position.y=.44+Math.abs(Math.sin(this.animTime))*.015-this.botLandDip,this.gunGroup.rotation.z=Math.cos(this.animTime)*.025,this.gunGroup.rotation.x=-this.recoilKick)}else{const t=Math.sin(this.animTime)*.012;this.legL&&(this.legL.rotation.x=Me.lerp(this.legL.rotation.x,0,e*10)),this.legR&&(this.legR.rotation.x=Me.lerp(this.legR.rotation.x,0,e*10)),this.kneeL&&(this.kneeL.rotation.x=Me.lerp(this.kneeL.rotation.x,.04,e*10)),this.kneeR&&(this.kneeR.rotation.x=Me.lerp(this.kneeR.rotation.x,.04,e*10)),this.armL&&(this.armL.rotation.x=Me.lerp(this.armL.rotation.x,-Math.PI/4+t,e*10)),this.armR&&(this.armR.rotation.x=Me.lerp(this.armR.rotation.x,-Math.PI/4+t,e*10)),this.torso&&(this.torso.position.y=Me.lerp(this.torso.position.y,t-this.botLandDip,e*8),this.torso.rotation.z=Me.lerp(this.torso.rotation.z,0,e*10),this.torso.rotation.x=Me.lerp(this.torso.rotation.x,0,e*10),this.torso.rotation.y=Me.lerp(this.torso.rotation.y,0,e*10)),this.gunGroup&&(this.gunGroup.position.y=Me.lerp(this.gunGroup.position.y,.44-this.botLandDip,e*8),this.gunGroup.rotation.z=Me.lerp(this.gunGroup.rotation.z,0,e*10),this.gunGroup.rotation.x=-this.recoilKick)}this.flinchTimer>0&&this.torso&&(this.torso.rotation.x=-.15*(this.flinchTimer/.18)),this.isReloading&&(this.gunGroup&&(this.gunGroup.position.y=Me.lerp(this.gunGroup.position.y,.48,e*10),this.gunGroup.rotation.x=Me.lerp(this.gunGroup.rotation.x,.28,e*10)),this.armL&&(this.armL.rotation.x=Me.lerp(this.armL.rotation.x,-.15,e*10),this.armL.rotation.y=Me.lerp(this.armL.rotation.y,.35,e*10)))}_moveToward(e,t,n,i){const s=new C().subVectors(e,this.position);if(s.y=0,s.length()<.1)return;s.normalize();const o=s.clone().multiplyScalar(t*n);if(i){const a=i.resolve(this.position,o,.45,.9);this.position.copy(a.position),this.state===Pt.WANDER&&a.displacement.x===0&&a.displacement.z===0&&this._pickWanderTarget()}else this.position.add(o);this.targetRotation=Math.atan2(s.x,s.z)}_strafeAround(e,t,n){const i=new C().subVectors(e,this.position);i.y=0;const s=i.length(),o=11,a=new C;s>o+2?(i.normalize(),a.addScaledVector(i,ms*.5*t),this.isMoving=!0):s<o-2&&(i.normalize(),a.addScaledVector(i,-ms*.4*t),this.isMoving=!0);const l=new C(-i.z,0,i.x).normalize(),c=Math.sin(performance.now()*.002+this.id*2);if(a.addScaledVector(l,c*ms*.45*t),Math.abs(c)>.2&&(this.isMoving=!0),n&&a.lengthSq()>0){const d=n.resolve(this.position,a,.45,.9);this.position.copy(d.position)}else this.position.add(a)}_aimAt(e){const t=new C().subVectors(e,this.position);this.targetRotation=Math.atan2(t.x,t.z)}_pickWanderTarget(e=null){if(Math.random()<.7){const t=e||new C(0,this.spawnPos.y,0),n=new C((Math.random()-.5)*22,0,(Math.random()-.5)*22);this.wanderTarget.copy(t).add(n),this.wanderTarget.y=this.spawnPos.y}else{const t=Math.random()*Math.PI*2,n=Math.random()*ax;this.wanderTarget.set(this.position.x+Math.cos(t)*n,this.spawnPos.y,this.position.z+Math.sin(t)*n)}}_tryShootTarget(e,t){if(this.isPassive||this.isFrozen||this.isReloading)return;if(this.ammo<=0){this._reload();return}if(this.burstCooldown>0){this.burstCooldown-=.016;return}const n=1e3/(this.weaponDef.fireRate*.55);if(t-this.lastFire<n)return;this.lastFire=t,this.ammo--,this.recoilKick=.16;const i=this.position.clone();i.y+=.85;const s=new C(Math.sin(this.rotation),0,Math.cos(this.rotation)).normalize(),o=new C(s.z,0,-s.x);i.addScaledVector(s,.45).addScaledVector(o,.25);const a=e.position.clone();a.y+=e.isPlayer?.72:.85;const c=.55+(e.velocity?Math.sqrt(e.velocity.x**2+e.velocity.z**2):0)*.08,d=new C((Math.random()-.5)*c,(Math.random()-.5)*c*.4,(Math.random()-.5)*c),h=a.clone().add(d);this.tracerManager&&this.tracerManager.addTracer(i,h,!0),xn.playShoot(this.weaponDef.id);const p=.75+(this.position.distanceTo(e.position)<10?.35:0);if(h.distanceTo(a)<p){const _=Math.random()<.12,f=_?this.weaponDef.damageHead:this.weaponDef.damageBody;if(e.isPlayer){const m=f*.32,v=Math.atan2(this.position.x-e.position.x,this.position.z-e.position.z);Re.emit("bot:shot_player",{botId:this.id,damage:m,isHead:_,botName:this.name,botPos:this.position.clone(),angle:v})}else if(e.entity&&!e.entity.isDead){const m=e.entity,v=f*.45;m.takeDamage(v,_,this.name)}}this.burstRemaining++,this.burstRemaining>=3+Math.floor(Math.random()*2)&&(this.burstRemaining=0,this.burstCooldown=.35+Math.random()*.3)}_reload(){this.isReloading||(this.isReloading=!0,setTimeout(()=>{this.ammo=this.weaponDef.magazineSize,this.isReloading=!1},this.weaponDef.reloadTime*.8))}takeDamage(e,t,n=null){this.isDead||(this.health-=e,this.flinchTimer=.18,this.health<=0?(this.health=0,this._die(n,t)):this.state=Pt.CHASE)}_die(e=null,t=!1){this.isDead||(this.isDead=!0,this.isHeadshotDeath=!!t,this.deathTime=performance.now(),this.deathFallTimer=.65,this.state=Pt.DEAD,e&&e!=="YOU"&&Re.emit("bot:killed_bot",{killer:e,victim:this.name,weapon:this.weaponDef.id,isHead:t}),Re.emit("bot:died",{botId:this.id,botName:this.name,killer:e,isHead:t}),setTimeout(()=>{this.mesh&&(this.mesh.visible=!1)},650),setTimeout(()=>{this.isDead&&this._respawn()},1200))}_respawn(){if(this.onGetSafeSpawn){const e=this.onGetSafeSpawn();this.position.copy(e),this.spawnPos.copy(e)}else{const e=new C((Math.random()-.5)*6,0,(Math.random()-.5)*6);this.position.copy(this.spawnPos).add(e)}this.position.y=this.spawnPos.y,this.mesh.position.copy(this.position),this._pickWanderTarget(),this.health=this.maxHealth,this.isDead=!1,this.isHeadshotDeath=!1,this.deathTime=0,this.state=Pt.WANDER,this.ammo=this.weaponDef.magazineSize,this.isReloading=!1,this.mesh.rotation.set(0,this.rotation,0),this.mesh.visible=!0,this.deathFallTimer=0,this.flinchTimer=0,this.recoilKick=0,this.headGroup&&this.headGroup.rotation.set(0,0,0),this.torso&&(this.torso.rotation.set(0,0,0),this.torso.position.set(0,0,0)),this.kneeL&&this.kneeL.rotation.set(.04,0,0),this.kneeR&&this.kneeR.rotation.set(.04,0,0),this.legL&&this.legL.rotation.set(0,0,0),this.legR&&this.legR.rotation.set(0,0,0),this.armL&&this.armL.rotation.set(-Math.PI/4,0,Math.PI/12),this.armR&&this.armR.rotation.set(-Math.PI/4,0,-Math.PI/12),this.gunGroup&&(this.gunGroup.position.set(.18,.44,.34),this.gunGroup.rotation.set(0,0,0)),this._updateHealthBar(),Re.emit("bot:respawned",{botId:this.id})}destroy(){this.scene.remove(this.mesh)}}const hx={blaze:{id:"blaze",name:"BLAZE",role:"Duelist",emoji:"🔥",color:"#FF4655",secondaryColor:"#FF8C42",weapon:"vandal",health:100,speed:1,bodyColor:15857145,vestColor:16729685,accentColor:16739125,description:"Aggressive duelist. Standard assault rifle. Balanced for all ranges."},cipher:{id:"cipher",name:"CIPHER",role:"Duelist",emoji:"💨",color:"#A8D8EA",secondaryColor:"#FFFFFF",weapon:"spectre",health:90,speed:1.2,bodyColor:14742270,vestColor:165063,accentColor:61695,description:"High-mobility duelist. SMG for close-range aggression."},scope:{id:"scope",name:"SCOPE",role:"Initiator",emoji:"🔭",color:"#2E77D0",secondaryColor:"#7EC8E3",weapon:"operator",health:100,speed:.9,bodyColor:1920728,vestColor:10576391,accentColor:6333946,description:"Long-range initiator. One-shot sniper with scope. High skill ceiling."},rampart:{id:"rampart",name:"RAMPART",role:"Sentinel",emoji:"🤖",color:"#F5C542",secondaryColor:"#5BE050",weapon:"odin",health:130,speed:.8,bodyColor:16436245,vestColor:1467700,accentColor:2278750,description:"Sentinel with heavy armor. LMG with massive mag. Slow but durable."},phantom:{id:"phantom",name:"PHANTOM",role:"Controller",emoji:"👻",color:"#7B2D8B",secondaryColor:"#00C4C4",weapon:"bucky",health:100,speed:1,bodyColor:9133302,vestColor:3223169,accentColor:62975,description:"Elusive controller. Shotgun devastates at close quarters."}},xr=Object.values(hx);function Cr(r,e=[],t=18){if(!r||r.length===0)return new C(0,.9,0);const n=(e||[]).filter(l=>l&&l.position&&!l.isDead);if(n.length===0){const l=Math.floor(Math.random()*r.length);return r[l].clone()}const i=r.map(l=>{let c=1/0;for(const d of n){const h=l.distanceTo(d.position);h<c&&(c=h)}return{point:l,minDist:c}});i.sort((l,c)=>c.minDist-l.minDist);const s=i.filter(l=>l.minDist>=t),o=s.length>0?s:i.slice(0,Math.min(3,i.length)),a=o[Math.floor(Math.random()*o.length)].point.clone();return a.x+=(Math.random()-.5)*1,a.z+=(Math.random()-.5)*1,a}const Lc=[{agentId:"cipher",weapon:"spectre"},{agentId:"scope",weapon:"operator"},{agentId:"rampart",weapon:"odin"},{agentId:"phantom",weapon:"bucky"},{agentId:"blaze",weapon:"vandal"}];class dx{constructor(e,t){this.scene=e,this.tracerManager=t,this.bots=[],this.spawnPoints=[],this.playerRef=null}setTracerManager(e){this.tracerManager=e}spawn(e,t,n=null){this.clearAll(),this.spawnPoints=t,this.playerRef=n;const i=xr;for(let s=0;s<e;s++){const o=Lc[s%Lc.length],a=i.find(h=>h.id===o.agentId)??i[0],l=[];this.playerRef&&l.push(this.playerRef);for(const h of this.bots)l.push(h);const c=Cr(this.spawnPoints,l,18),d=new cx(this.scene,c,a,o.weapon,this.tracerManager);d.onGetSafeSpawn=()=>{const h=[];this.playerRef&&h.push(this.playerRef);for(const u of this.bots)u!==d&&!u.isDead&&h.push(u);return Cr(this.spawnPoints,h,20)},this.bots.push(d)}return this.bots}update(e,t,n,i,s){const o=performance.now();for(const a of this.bots)a.update(e,t,n,i,s,this.bots),a.isDead&&a.deathTime>0&&o-a.deathTime>2200&&a._respawn()}getAll(){return this.bots}getLiving(){return this.bots.filter(e=>!e.isDead)}setFrozen(e){for(const t of this.bots)t.isFrozen=e}setPassive(e){for(const t of this.bots)t.isPassive=e}respawnAll(){for(const e of this.bots)e.isDead=!1,e.health=e.maxHealth,e._respawn()}clearAll(){for(const e of this.bots)e.destroy();this.bots=[]}}class ux{constructor(e){this.scene=e,this.tracers=[],this.sparks=[],this.tracerMat=new lt({color:16773222,transparent:!0,opacity:.9,depthWrite:!1}),this.enemyTracerMat=new lt({color:16724804,transparent:!0,opacity:.85,depthWrite:!1}),this.sparkGeo=new Tt,this.sparkMat=new Ar({color:16763955,size:.12,transparent:!0,opacity:1,depthWrite:!1}),this.headshotSparkMat=new Ar({color:16766720,size:.22,transparent:!0,opacity:1,depthWrite:!1,blending:Ss}),this.rings=[]}addHeadshotSparks(e,t=null){const n=new qa(.06,.16,16),i=new lt({color:16762624,side:Nt,transparent:!0,opacity:.95,depthWrite:!1,blending:Ss}),s=new P(n,i);s.position.copy(e),t?s.lookAt(t.position):s.rotation.x=Math.PI/2,this.scene.add(s),this.rings.push({mesh:s,life:.22,maxLife:.22,scale:1});const o=28,a=new Float32Array(o*3),l=[];for(let h=0;h<o;h++){a[h*3]=e.x,a[h*3+1]=e.y,a[h*3+2]=e.z;const u=Math.random()*Math.PI*2,p=(Math.random()-.5)*Math.PI,g=4.5+Math.random()*5.5;l.push(new C(Math.cos(p)*Math.cos(u)*g,Math.abs(Math.sin(p))*g+2,Math.cos(p)*Math.sin(u)*g))}const c=new Tt;c.setAttribute("position",new Lt(a,3));const d=new xa(c,this.headshotSparkMat.clone());this.scene.add(d),this.sparks.push({points:d,velocities:l,life:.32,maxLife:.32})}addTracer(e,t,n=!1,i=!1){const o=new C().subVectors(t,e).length();if(o<.2)return;const a=i?.012:.016,l=new fe(a,a,o,4);l.translate(0,o/2,0),l.rotateX(Math.PI/2);let c;n?c=this.enemyTracerMat.clone():i?c=new lt({color:5239039,transparent:!0,opacity:.95,depthWrite:!1}):c=this.tracerMat.clone();const d=new P(l,c);d.position.copy(e),d.lookAt(t),this.scene.add(d);const h=i?.045:.065;this.tracers.push({mesh:d,life:h,maxLife:h})}addSparks(e,t=new C(0,1,0)){const i=new Float32Array(30),s=[];for(let l=0;l<10;l++){i[l*3]=e.x,i[l*3+1]=e.y,i[l*3+2]=e.z;const c=new C((Math.random()-.5)*4+t.x*2,(Math.random()-.5)*4+t.y*2,(Math.random()-.5)*4+t.z*2);s.push(c)}const o=new Tt;o.setAttribute("position",new Lt(i,3));const a=new xa(o,this.sparkMat.clone());this.scene.add(a),this.sparks.push({points:a,velocities:s,life:.25,maxLife:.25})}update(e){for(let t=this.tracers.length-1;t>=0;t--){const n=this.tracers[t];n.life-=e,n.life<=0?(this.scene.remove(n.mesh),n.mesh.geometry.dispose(),n.mesh.material.dispose(),this.tracers.splice(t,1)):n.mesh.material.opacity=n.life/n.maxLife*.9}for(let t=this.sparks.length-1;t>=0;t--){const n=this.sparks[t];if(n.life-=e,n.life<=0)this.scene.remove(n.points),n.points.geometry.dispose(),n.points.material.dispose(),this.sparks.splice(t,1);else{const i=n.points.geometry.attributes.position.array,s=n.velocities.length;for(let o=0;o<s;o++)i[o*3]+=n.velocities[o].x*e,i[o*3+1]+=n.velocities[o].y*e,i[o*3+2]+=n.velocities[o].z*e,n.velocities[o].y-=9.8*e;n.points.geometry.attributes.position.needsUpdate=!0,n.points.material.opacity=n.life/n.maxLife}}for(let t=this.rings.length-1;t>=0;t--){const n=this.rings[t];if(n.life-=e,n.life<=0)this.scene.remove(n.mesh),n.mesh.geometry.dispose(),n.mesh.material.dispose(),this.rings.splice(t,1);else{const s=1+(1-n.life/n.maxLife)*3.5;n.mesh.scale.set(s,s,s),n.mesh.material.opacity=n.life/n.maxLife*.95}}}clear(){for(const e of this.tracers)this.scene.remove(e.mesh),e.mesh.geometry.dispose();for(const e of this.sparks)this.scene.remove(e.points),e.points.geometry.dispose();for(const e of this.rings)this.scene.remove(e.mesh),e.mesh.geometry.dispose();this.tracers=[],this.sparks=[],this.rings=[]}}const Ro=30,fx=5*60*1e3;class px{constructor(){this.playerKills=0,this.playerDeaths=0,this.botKillsTotal=0,this.startTime=0,this.timeLimit=fx,this.active=!1,this.finished=!1,this._setupListeners()}_setupListeners(){Re.on("bot:died",({botId:e,botName:t,killer:n,isHead:i})=>{this.active&&n==="YOU"&&(this.playerKills++,Re.emit("dm:kill",{killer:"YOU",victim:t,kills:this.playerKills,goal:Ro,isHead:!!i}),this._checkWin())}),Re.on("bot:shot_player",({botId:e,damage:t,isHead:n,botName:i})=>{this.active&&Re.emit("player:take_damage",{amount:t,isHead:n,from:i})}),Re.on("player:died",()=>{this.active&&(this.playerDeaths++,Re.emit("dm:player_died",{deaths:this.playerDeaths}))}),Re.on("player:shot_bot",({bot:e,damage:t,isHead:n,point:i})=>{this.active&&(e.takeDamage(t,n,"YOU"),Re.emit("dm:hit",{damage:t,isHead:n,point:i}))})}start(){this.playerKills=0,this.playerDeaths=0,this.botKillsTotal=0,this.startTime=performance.now(),this.active=!0,this.finished=!1,Re.emit("dm:started")}stop(){this.active=!1,this.finished=!0}_checkWin(){this.playerKills>=Ro&&this._end("win")}_end(e){if(this.finished)return;this.active=!1,this.finished=!0;const t=performance.now()-this.startTime;Re.emit("dm:end",{result:e,kills:this.playerKills,deaths:this.playerDeaths,kd:+(this.playerKills/Math.max(1,this.playerDeaths)).toFixed(2),elapsed:Math.floor(t/1e3)})}update(){if(!this.active)return;const e=performance.now()-this.startTime,t=Math.max(0,this.timeLimit-e);Re.emit("dm:tick",{remaining:t,kills:this.playerKills,goal:Ro}),t<=0&&this._end(this.playerKills>0?"win":"lose")}getStats(){return{kills:this.playerKills,deaths:this.playerDeaths,kd:+(this.playerKills/Math.max(1,this.playerDeaths)).toFixed(2)}}}class mx{constructor(){this.elTimer=document.getElementById("hud-timer"),this.elKills=document.getElementById("hud-kills"),this.elHealth=document.getElementById("hud-health-value"),this.elHealthBar=document.getElementById("hud-health-bar"),this.elShield=document.getElementById("hud-shield-value"),this.elAmmoMag=document.getElementById("hud-ammo-mag"),this.elReload=document.getElementById("hud-reload-label"),this.elAgentIcon=document.getElementById("hud-agent-icon"),this.elAgentName=document.getElementById("hud-agent-name"),this.elSlot1Name=document.getElementById("slot-1-name"),this.elSlot2Name=document.getElementById("slot-2-name"),this.elSlot1=document.getElementById("slot-1"),this.elSlot2=document.getElementById("slot-2"),this.elHitInd=document.getElementById("hit-indicator"),this.elDamageVig=document.getElementById("damage-vignette"),this.killFeedEl=document.getElementById("kill-feed"),this.elHitmarker=document.getElementById("hitmarker"),this.elDmgIndicator=document.getElementById("damage-indicator"),this.elSpawnShield=document.getElementById("spawn-shield-badge"),this.elKillBanner=document.getElementById("kill-banner"),this.elKbBadge=document.getElementById("kb-streak-badge"),this.elKbVictim=document.getElementById("kb-victim"),this.elKbStars=document.getElementById("kb-stars"),this.elKillVig=document.getElementById("kill-vignette"),this.killStreak=0,this.lastKillTime=0,this.killBannerTimer=null,this.elPlayOverlay=document.getElementById("play-overlay"),this.elPoTitle=document.getElementById("po-title"),this.elPoSubtitle=document.getElementById("po-subtitle"),this.elPoPlayBtn=document.getElementById("po-play-btn"),this.elPoPlayText=document.getElementById("po-play-text"),this.elWeaponPicker=document.getElementById("death-weapon-picker"),this.maxHealth=100,this._setupListeners()}setAgent(e){this.maxHealth=e.health,this.elAgentIcon.textContent=e.emoji,this.elAgentName.textContent=e.name,this.elAgentIcon.style.background=e.color+"33",this.elAgentIcon.style.borderColor=e.color+"66"}setWeaponSlot(e,t){e===0&&(this.elSlot1Name.textContent=t?t.shortName:"—",this.elWeaponPicker&&t&&this.elWeaponPicker.querySelectorAll(".death-weapon-btn").forEach(n=>{n.classList.toggle("active",n.dataset.weapon===t.id)})),e===1&&(this.elSlot2Name.textContent=t?t.shortName:"—")}_setupListeners(){Re.on("player:damaged",({health:e,shield:t})=>{this.setHealth(e,t),this._flashDamage()}),Re.on("player:spawn_shield",({active:e})=>{this.elSpawnShield&&this.elSpawnShield.classList.toggle("hidden",!e)}),Re.on("player:respawn",({health:e})=>{this.setHealth(e,50),this.hidePlayOverlay()}),Re.on("player:died",e=>{this.showPlayOverlay({title:"ELIMINATED",subtitle:"CHOOSE WEAPON & CLICK TO RESPAWN",playText:"CLICK TO RESPAWN",weaponId:(e==null?void 0:e.currentWeaponId)??"vandal"})}),Re.on("controls:locked",()=>{this.hidePlayOverlay()}),Re.on("controls:unlocked",()=>{const e=document.getElementById("game-container");e&&e.classList.contains("active")&&this.showPlayOverlay({title:"TACTICAL LOADOUT",subtitle:"CHOOSE WEAPON & CLICK TO DEPLOY",playText:"CLICK TO PLAY"})}),this.elWeaponPicker&&this.elWeaponPicker.addEventListener("click",e=>{const t=e.target.closest(".death-weapon-btn");t&&(this.elWeaponPicker.querySelectorAll(".death-weapon-btn").forEach(n=>n.classList.remove("active")),t.classList.add("active"),Re.emit("player:select_weapon",{weaponId:t.dataset.weapon}))}),this.elPoPlayBtn&&this.elPoPlayBtn.addEventListener("click",()=>{Re.emit("player:click_to_play")}),Re.on("weapon:fire",({mag:e})=>{this.setAmmo(e)}),Re.on("weapon:switch",({slot:e,weapon:t,mag:n})=>{this.setAmmo(n),this.setActiveSlot(e)}),Re.on("weapon:reload_start",()=>{this.elReload.textContent="RELOADING..."}),Re.on("weapon:reload_done",({mag:e})=>{this.setAmmo(e),this.elReload.textContent=""}),Re.on("dm:tick",({remaining:e,kills:t,goal:n})=>{this.setTimer(e),this.setKills(t,n)}),Re.on("dm:kill",({killer:e,victim:t,kills:n,goal:i,isHead:s})=>{this.addKillFeed(e,t,"",s),this.setKills(n,i),e==="YOU"&&this.triggerKillBanner(t,s)}),Re.on("dm:hit",({isHead:e})=>{this.flashHitIndicator(e),this.flashHitmarker(e)}),Re.on("player:scope",({scoped:e})=>{const t=document.getElementById("sniper-scope");t&&t.classList.toggle("active",e),document.getElementById("crosshair").style.opacity=e?0:1})}showPlayOverlay({title:e="ELIMINATED",subtitle:t="CHOOSE WEAPON & CLICK TO RESPAWN",playText:n="CLICK TO PLAY",weaponId:i}={}){this.elPlayOverlay&&(this.elPoTitle.textContent=e,this.elPoSubtitle.textContent=t,this.elPoPlayText.textContent=n,i&&this.elWeaponPicker&&this.elWeaponPicker.querySelectorAll(".death-weapon-btn").forEach(s=>{s.classList.toggle("active",s.dataset.weapon===i)}),this.elPlayOverlay.classList.remove("hidden"))}hidePlayOverlay(){this.elPlayOverlay&&this.elPlayOverlay.classList.add("hidden")}flashHitmarker(e){this.elHitmarker&&(this.elHitmarker.classList.toggle("headshot",e),this.elHitmarker.classList.remove("active"),this.elHitmarker.offsetWidth,this.elHitmarker.classList.add("active"))}flashDirectionalDamage(e,t){if(!this.elDmgIndicator)return;const n=(e-t)*(180/Math.PI);this.elDmgIndicator.style.transform=`translate(-50%, -50%) rotate(${n}deg)`,this.elDmgIndicator.classList.remove("flash"),this.elDmgIndicator.offsetWidth,this.elDmgIndicator.classList.add("flash")}setHealth(e,t){e=Math.max(0,e),this.elHealth.textContent=Math.ceil(e),this.elShield.textContent=`🛡 ${Math.ceil(t??0)}`;const n=e/this.maxHealth*100;this.elHealthBar.style.width=n+"%",this.elHealthBar.style.background=n>50?"#00ff87":n>25?"#ffb347":"#ff4655"}setAmmo(e){this.elAmmoMag.textContent=e}setTimer(e){const t=Math.ceil(e/1e3),n=Math.floor(t/60),i=String(t%60).padStart(2,"0");this.elTimer.textContent=`${n}:${i}`,t<=30?this.elTimer.style.color="#ff4655":this.elTimer.style.color=""}setKills(e,t){this.elKills.textContent=`${e} / ${t}`}setActiveSlot(e){this.elSlot1.classList.toggle("active",e===0),this.elSlot2.classList.toggle("active",e===1)}addKillFeed(e,t,n="",i=!1){const s=document.createElement("div");for(s.className=`kill-entry${i?" headshot":""}`,s.innerHTML=`
      <span class="kill-killer">${e}</span>
      <span class="kill-icon">${i?"💀":"⚡"}</span>
      <span class="kill-victim">${t}</span>
    `,this.killFeedEl.prepend(s),setTimeout(()=>s.remove(),4e3);this.killFeedEl.children.length>5;)this.killFeedEl.lastChild.remove()}triggerKillBanner(e,t=!1){if(!this.elKillBanner)return;const n=performance.now();n-this.lastKillTime<6e3?this.killStreak++:this.killStreak=1,this.lastKillTime=n,xn.playKill(this.killStreak,t);let i=t?"HEADSHOT":"ELIMINATED";if(this.killStreak===2?i="DOUBLE KILL":this.killStreak===3?i="TRIPLE KILL":this.killStreak===4?i="QUADRA KILL":this.killStreak>=5&&(i="ACE!"),this.elKbBadge&&(this.elKbBadge.textContent=i),this.elKbVictim&&(this.elKbVictim.textContent=e.toUpperCase()),this.elKbStars){const s=this.elKbStars.children;for(let o=0;o<s.length;o++)s[o].classList.toggle("active",o<Math.min(this.killStreak,5))}this.elKillBanner.classList.remove("hidden","slam","headshot","ace"),t&&this.elKillBanner.classList.add("headshot"),this.killStreak>=5&&this.elKillBanner.classList.add("ace"),this.elKillBanner.offsetWidth,this.elKillBanner.classList.add("slam"),this.elKillVig&&(this.elKillVig.className="kill-vignette",this.elKillVig.offsetWidth,this.elKillVig.classList.add(t?"flash-headshot":"flash")),this.killBannerTimer&&clearTimeout(this.killBannerTimer),this.killBannerTimer=setTimeout(()=>{this.elKillBanner&&(this.elKillBanner.classList.add("hidden"),this.elKillBanner.classList.remove("slam"))},2600)}flashHitIndicator(e){this.elHitInd.style.borderColor=e?"#C89B3C":"#FF4655",this.elHitInd.classList.remove("flash"),this.elHitInd.offsetWidth,this.elHitInd.classList.add("flash")}_flashDamage(){this.elDamageVig.classList.add("hurt"),clearTimeout(this._damageTimer),this._damageTimer=setTimeout(()=>{this.elDamageVig.classList.remove("hurt")},600)}}class gx{constructor(){this.el=document.getElementById("agent-select"),this.listEl=document.getElementById("agent-list"),this.detailsEl=document.getElementById("agent-details"),this.btnConfirm=document.getElementById("btn-confirm-agent"),this.btnBack=document.getElementById("btn-back-menu"),this.selectedAgentId="blaze",this.onConfirm=null,this.onBack=null,this._render(),this._bindEvents()}show(e,t){this.onConfirm=e,this.onBack=t,this.el.classList.add("active"),this._selectAgent(this.selectedAgentId)}hide(){this.el.classList.remove("active")}_render(){this.listEl.innerHTML=xr.map(e=>`
      <div class="agent-card" data-id="${e.id}">
        <div class="agent-card-icon" style="background:${e.color}22; border:2px solid ${e.color}44">
          ${e.emoji}
        </div>
        <div class="agent-card-info">
          <div class="agent-card-name">${e.name}</div>
          <div class="agent-card-role">${e.role}</div>
        </div>
      </div>
    `).join("")}_selectAgent(e){this.selectedAgentId=e,this.listEl.querySelectorAll(".agent-card").forEach(t=>{t.classList.toggle("active",t.dataset.id===e)}),this._updateDetails()}_updateDetails(){const e=xr.find(i=>i.id===this.selectedAgentId);if(!e)return;const t=Math.round(e.speed*80),n=Math.round(e.health/130*100);this.detailsEl.innerHTML=`
      <div class="agent-details-name" style="color:${e.color}">${e.name}</div>
      <div class="agent-details-role">${e.role}</div>
      <div style="font-size:14px;color:#8899a6;max-width:440px;line-height:1.6;margin-top:8px">${e.description}</div>

      <!-- Agent Attributes -->
      <div class="agent-stat-grid" style="margin-top:20px">
        <div class="agent-stat-item">
          <div class="agent-stat-label">BASE HEALTH</div>
          <div class="agent-stat-value">${e.health} HP</div>
          <div class="agent-stat-bar"><div class="agent-stat-bar-fill" style="width:${n}%;background:${e.color}"></div></div>
        </div>
        <div class="agent-stat-item">
          <div class="agent-stat-label">MOBILITY SPEED</div>
          <div class="agent-stat-value">${e.speed.toFixed(1)}x</div>
          <div class="agent-stat-bar"><div class="agent-stat-bar-fill" style="width:${t}%;background:${e.color}"></div></div>
        </div>
      </div>

      <!-- Tactical Lore Box -->
      <div style="margin-top:24px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);padding:18px 22px;border-radius:4px;max-width:440px">
        <div style="font-size:11px;letter-spacing:2px;color:var(--val-gray);text-transform:uppercase;margin-bottom:6px">TACTICAL PROFILE</div>
        <div style="font-size:13px;color:#c5d0db;line-height:1.5">
          Specialized in high-tempo engagements. Weapon loadout can be chosen freely on deployment.
        </div>
      </div>
    `}_bindEvents(){this.listEl.addEventListener("click",e=>{const t=e.target.closest(".agent-card");t&&this._selectAgent(t.dataset.id)}),this.btnConfirm.addEventListener("click",()=>{var t;const e=xr.find(n=>n.id===this.selectedAgentId);this.hide(),(t=this.onConfirm)==null||t.call(this,e)}),this.btnBack.addEventListener("click",()=>{var e;this.hide(),(e=this.onBack)==null||e.call(this)})}}class _x{constructor(){this.el=document.getElementById("end-screen"),this.elResult=document.getElementById("end-result"),this.elStats=document.getElementById("end-stats"),this.btnAgain=document.getElementById("btn-play-again"),this.btnMenu=document.getElementById("btn-main-menu-end")}show({result:e,kills:t,deaths:n,kd:i,elapsed:s},o,a){this.el.classList.add("active"),this.elResult.textContent=e==="win"?"VICTORY":"DEFEAT",this.elResult.className=`end-result ${e}`;const l=Math.floor(s/60),c=String(s%60).padStart(2,"0");this.elStats.innerHTML=`
      <div class="end-stat-item">
        <div class="stat-label">KILLS</div>
        <div class="stat-val" style="color:#00ff87">${t}</div>
      </div>
      <div class="end-stat-item">
        <div class="stat-label">DEATHS</div>
        <div class="stat-val" style="color:#ff4655">${n}</div>
      </div>
      <div class="end-stat-item">
        <div class="stat-label">K/D</div>
        <div class="stat-val">${i}</div>
      </div>
      <div class="end-stat-item">
        <div class="stat-label">TIME</div>
        <div class="stat-val" style="font-size:24px">${l}:${c}</div>
      </div>
    `,this.btnAgain.onclick=()=>{this.hide(),o==null||o()},this.btnMenu.onclick=()=>{this.hide(),a==null||a()}}hide(){this.el.classList.remove("active")}}const Co=[{id:"a_site",name:"A Site (Plant)",x:-34,y:.9,z:-4,key:"1"},{id:"a_heaven",name:"A Heaven (Balcony)",x:-44,y:4.7,z:-4,key:"2"},{id:"a_hell",name:"A Hell (Under)",x:-46,y:.9,z:-4,key:"3"},{id:"a_gen",name:"A Generator (Boost)",x:-32.5,y:3.4,z:-14,key:"4"},{id:"mid_bridge",name:"Mid Bridge (High)",x:0,y:4.35,z:0,key:"5"},{id:"mid_catwalk",name:"Mid Catwalk (Terrace)",x:-9.5,y:2.7,z:-13,key:"6"},{id:"mid_canal",name:"Mid Canal (Water)",x:0,y:.5,z:0,key:"7"},{id:"b_site",name:"B Site (Plant)",x:34,y:.9,z:-4,key:"8"},{id:"b_heaven",name:"B Heaven (Window)",x:40,y:4.3,z:14,key:"9"},{id:"b_hell",name:"B Hell (Under Window)",x:42,y:.9,z:14,key:"0"},{id:"b_backsite",name:"B Backsite Deck",x:42,y:1.85,z:-8,key:"-"},{id:"atk_spawn",name:"Attacker Spawn",x:0,y:.9,z:-46,key:"["},{id:"def_spawn",name:"Defender Spawn",x:0,y:.9,z:46,key:"]"}];class xx{constructor(e,t,n,i,s){this.scene=e,this.camera=t,this.player=n,this.mapLoader=i,this.bots=s,this.isActive=!1,this.showWireframe=!1,this.botState="frozen",this.wireframeGroup=null,this.lastFpsUpdate=performance.now(),this.framesCount=0,this.currentFps=60,this._createUI(),this._bindEvents()}enable(){this.isActive=!0,this.player&&(this.player.isGodMode=!0,this.player.isInfiniteAmmo=!0),this.setBotState("frozen"),this.overlayEl&&(this.overlayEl.style.display="block"),this._updateHUD()}disable(){this.isActive=!1,this.player&&(this.player.setNoclip(!1),this.player.isGodMode=!1,this.player.isInfiniteAmmo=!1),this.setBotState("active"),this.setWireframeVisible(!1),this.overlayEl&&(this.overlayEl.style.display="none")}toggle(){return this.isActive?this.disable():this.enable(),this.isActive}setBotState(e){this.botState=e,this.bots&&(e==="frozen"?(this.bots.setFrozen(!0),this.bots.setPassive(!0)):e==="passive"?(this.bots.setFrozen(!1),this.bots.setPassive(!0)):(this.bots.setFrozen(!1),this.bots.setPassive(!1)),this._updateHUD())}cycleBotState(){const e=this.botState==="frozen"?"passive":this.botState==="passive"?"active":"frozen";this.setBotState(e)}toggleNoclip(){if(!this.player)return!1;const e=this.player.toggleNoclip();return this._updateHUD(),e}setWireframeVisible(e){var u,p,g,_;if(this.showWireframe=e,!e){this.wireframeGroup&&(this.scene.remove(this.wireframeGroup),this.wireframeGroup.traverse(f=>{f.geometry&&f.geometry.dispose(),f.material&&f.material.dispose()}),this.wireframeGroup=null),this._updateHUD();return}this.wireframeGroup&&this.scene.remove(this.wireframeGroup);const t=new ke,n=new Dt({color:3718648,transparent:!0,opacity:.65}),i=new Dt({color:16347926,transparent:!0,opacity:.75}),s=new Dt({color:440020,transparent:!0,opacity:.8}),o=new Dt({color:16096779,transparent:!0,opacity:.9}),a=new Dt({color:2278750,transparent:!0,opacity:.85}),l=((u=this.mapLoader)==null?void 0:u.getColliders())||[];for(const f of l){if(f.isRamp)continue;const{box:m,type:v}=f,x=v==="box"||v==="radianite"?i:v==="water"?s:n,M=new Cg(m,x.color);t.add(M)}const c=((p=this.mapLoader)==null?void 0:p.getRamps())||[];for(const f of c){const m=f.maxX-f.minX,v=f.maxZ-f.minZ,x=(f.minX+f.maxX)/2,M=(f.minZ+f.maxZ)/2,A=(f.startY+f.endY)/2,E=f.axis==="z"?v:m,w=f.endY-f.startY,L=Math.sqrt(E*E+w*w),U=Math.atan2(w,E),y=new q(f.axis==="z"?m:L,.35,f.axis==="z"?L:v),S=new Wt(new Qt(y),o);S.position.set(x,A,M),f.axis==="z"?S.rotation.x=-U:S.rotation.z=U,t.add(S)}const d=((_=(g=this.mapLoader)==null?void 0:g.getSpawnPoints)==null?void 0:_.call(g,{spawn:Co.map(f=>[f.x,f.y,f.z])}))||[],h=new fe(.35,.35,1.8,8);for(const f of d){const m=new Wt(new Qt(h),a);m.position.set(f.x,f.y,f.z),t.add(m)}this.wireframeGroup=t,this.scene.add(this.wireframeGroup),this._updateHUD()}toggleWireframe(){return this.setWireframeVisible(!this.showWireframe),this.showWireframe}teleportTo(e,t,n,i=null){this.player&&(this.player.teleportTo(e,t,n),i&&this._showToast(`TELEPORTED TO: ${i.toUpperCase()}`))}teleportByZoneId(e){const t=Co.find(n=>n.id===e);t&&this.teleportTo(t.x,t.y,t.z,t.name)}detectZone(e){const{x:t,y:n,z:i}=e;return i<=-35?{name:"ATTACKER SPAWN",color:"#38bdf8",desc:"North Entrance Pavilion"}:i>=35?{name:"DEFENDER SPAWN",color:"#ff4655",desc:"South Defense Pavilion"}:t>=-18&&t<=18?n>=3&&Math.abs(i)<=3.5?{name:"MID BRIDGE (HIGH GROUND)",color:"#f59e0b",desc:"Elevated Deck Over Canal"}:t<=-6.5&&i>=-22&&i<=-5?{name:"MID CATWALK (TERRACE)",color:"#a855f7",desc:"Elevated Lane to A Short"}:Math.abs(t)<=4.5&&Math.abs(i)<=22&&n<=1?{name:"MID WATER CANAL (SUB-LEVEL)",color:"#06b6d4",desc:"Sunken Turquoise Water Bed"}:t>=9&&Math.abs(i)<=8&&n>=1?{name:"MID MARKET (DOORWAY)",color:"#10b981",desc:"Raised Market Connection"}:{name:"MID COURTYARD",color:"#e2e8f0",desc:"Central Open Courtyard"}:t<-18?t<=-40&&n>=3.2&&i>=-14&&i<=6?{name:"A HEAVEN (SNIPER BALCONY)",color:"#f59e0b",desc:"Level 2 Overlook over Site A"}:t<=-40&&n<=3&&i>=-14&&i<=6?{name:"A HELL (UNDER HEAVEN)",color:"#ef4444",desc:"Covered Ground Floor Refuge"}:t>=-35&&t<=-29&&i<=-12&&n>=2?{name:"A GENERATOR (BOOST ROOF)",color:"#a855f7",desc:"Tiered High-Ground Boost"}:i<=-20?{name:"A MAIN & A WINE",color:"#64748b",desc:"Chokepoint & Sunken Alcove"}:{name:"A SITE (PLANT ZONE)",color:"#00f0ff",desc:"Open Courtyard & Water Basin"}:t>18?t>=36&&i>=8&&i<=20&&n>=3?{name:"B HEAVEN (SNIPER WINDOW)",color:"#f59e0b",desc:"Pagoda Tower Upper Window"}:t>=36&&i>=8&&i<=20&&n<=2.8?{name:"B HELL (UNDER WINDOW)",color:"#ef4444",desc:"Ground Floor Tower Alcove"}:t>=36&&i<=-2&&n>=.8?{name:"B BACKSITE (RAISED DECK)",color:"#a855f7",desc:"Elevated Wooden Hold Deck"}:i<=-20?{name:"B MAIN & CORRIDOR",color:"#64748b",desc:"Tight Flank Approach"}:{name:"B SITE (PLANT ZONE)",color:"#00f0ff",desc:"Tight Yard & Triple Box"}:{name:"MAP FLANK CORRIDOR",color:"#94a3b8",desc:"Outer Rotation Alley"}}update(){if(!this.isActive||!this.player)return;this.framesCount++;const e=performance.now();e-this.lastFpsUpdate>=500&&(this.currentFps=Math.round(this.framesCount*1e3/(e-this.lastFpsUpdate)),this.framesCount=0,this.lastFpsUpdate=e),this._updateHUD()}_createUI(){const e=document.getElementById("debug-explorer-overlay");e&&e.remove();const t=document.createElement("div");t.id="debug-explorer-overlay",t.className="debug-explorer-container",t.style.display="none",t.innerHTML=`
      <!-- Top Telemetry Header -->
      <div class="explorer-card telemetry-card">
        <div class="explorer-header-row">
          <div class="explorer-badge">🛠️ MAP EXPLORER & DEBUG</div>
          <div class="explorer-fps-badge" id="exp-fps">60 FPS</div>
          <button class="explorer-close-btn" id="btn-exp-close" title="Tutup / Sembunyikan [F1]">✕</button>
        </div>
        <div class="explorer-zone-row">
          <div class="zone-pin-icon">📍</div>
          <div class="zone-name" id="exp-zone-name">LOADING ZONE...</div>
        </div>
        <div class="zone-desc" id="exp-zone-desc">Detecting player coordinates</div>

        <div class="explorer-coords-grid">
          <div class="coord-item">
            <span class="coord-label">X:</span>
            <span class="coord-val" id="exp-coord-x">0.00</span>
          </div>
          <div class="coord-item">
            <span class="coord-label">Y (Mata):</span>
            <span class="coord-val" id="exp-coord-y">0.00</span>
          </div>
          <div class="coord-item">
            <span class="coord-label">Z:</span>
            <span class="coord-val" id="exp-coord-z">0.00</span>
          </div>
        </div>

        <!-- Action Control Buttons -->
        <div class="explorer-btn-grid">
          <button class="exp-action-btn" id="btn-toggle-noclip">
            <span class="btn-icon">✈️</span>
            <span class="btn-text">Fly/Noclip: <b id="exp-noclip-status">OFF</b></span>
            <span class="btn-key">[F]</span>
          </button>
          <button class="exp-action-btn" id="btn-toggle-wire">
            <span class="btn-icon">📐</span>
            <span class="btn-text">Wireframe: <b id="exp-wire-status">OFF</b></span>
            <span class="btn-key">[H]</span>
          </button>
          <button class="exp-action-btn" id="btn-toggle-bots">
            <span class="btn-icon">🤖</span>
            <span class="btn-text">Bot: <b id="exp-bot-status">BEKU</b></span>
            <span class="btn-key">[B]</span>
          </button>
          <button class="exp-action-btn" id="btn-toggle-god">
            <span class="btn-icon">🛡️</span>
            <span class="btn-text">God Mode: <b id="exp-god-status">ON</b></span>
            <span class="btn-key">[G]</span>
          </button>
          <button class="exp-action-btn secondary" id="btn-respawn-bots">
            <span class="btn-icon">🔄</span>
            <span class="btn-text">Respawn Bot</span>
            <span class="btn-key">[K]</span>
          </button>
          <button class="exp-action-btn secondary" id="btn-copy-pos">
            <span class="btn-icon">📋</span>
            <span class="btn-text">Copy Posisi</span>
            <span class="btn-key">[P]</span>
          </button>
        </div>
      </div>

      <!-- Bottom Quick Teleport Bar -->
      <div class="explorer-card teleport-card">
        <div class="teleport-title">
          <span>⚡ INSTANT TELEPORT TO ZONE (Click / Alt + Key):</span>
          <button class="help-btn-pill" id="btn-exp-help" title="Panduan Shortcut [F1]">❓ BANTUAN</button>
        </div>
        <div class="teleport-pills-row" id="teleport-pills-container">
          <!-- Populated dynamically from TELEPORT_ZONES -->
        </div>
      </div>

      <!-- Toast Notification -->
      <div id="explorer-toast" class="explorer-toast"></div>

      <!-- Help Modal -->
      <div id="explorer-help-modal" class="explorer-help-modal" style="display:none">
        <div class="modal-card">
          <div class="modal-header">
            <div class="modal-title">🛠️ PANDUAN MODE EKSPLORASI & DEBUG MAP</div>
            <button class="modal-close" id="btn-close-help">✕</button>
          </div>
          <div class="modal-body">
            <div class="help-section">
              <div class="help-sec-title">✈️ KONTROL TERBANG / NOCLIP ([F])</div>
              <ul>
                <li><b>W / A / S / D</b>: Terbang bebas mengikuti arah pandangan kamera (termasuk naik/turun sesuai sudut bidikan).</li>
                <li><b>Space</b>: Melayang naik vertikal ke atas.</li>
                <li><b>Ctrl / C</b>: Melayang turun vertikal ke bawah.</li>
                <li><b>Tahan Shift</b>: Turbo Speed (kecepatan terbang 2.5x lebih kencang).</li>
              </ul>
            </div>
            <div class="help-section">
              <div class="help-sec-title">📐 INSPECTOR WIREFRAME KOLISI ([H])</div>
              <ul>
                <li><b>Garis Biru Muda</b>: Dinding dan lantai solid AABB.</li>
                <li><b>Garis Emas / Kuning</b>: Lereng tanjakan dan turunan kontinu (*continuous ramps*).</li>
                <li><b>Garis Oranye</b>: Peti dan boks taktis jump-boost.</li>
                <li><b>Garis Hijau</b>: Titik spawn pemain dan bot.</li>
              </ul>
            </div>
            <div class="help-section">
              <div class="help-sec-title">🤖 KONTROL BOT ([B])</div>
              <ul>
                <li><b>BEKU (FROZEN)</b>: Bot diam mematung untuk inspeksi model, uji tembak kepala, dan cek jarak.</li>
                <li><b>PASIF (PASSIVE)</b>: Bot bergerak/patroli tanpa menembak Anda.</li>
                <li><b>AKTIF (ACTIVE)</b>: Bot kembali bertarung normal.</li>
              </ul>
            </div>
            <div class="help-section">
              <div class="help-sec-title">⚡ SHORTCUT TELEPORT CEPAT</div>
              <ul>
                <li>Klik tombol zona di bilah bawah, atau tekan <b>Alt + Angka (1 - 0)</b> untuk teleport instan.</li>
                <li>Tekan <b>[P]</b> untuk menyalin koordinat X, Y, Z ke clipboard untuk dicatat.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    `,document.body.appendChild(t),this.overlayEl=t;const n=t.querySelector("#teleport-pills-container");for(const i of Co){const s=document.createElement("button");s.className="teleport-pill",s.innerHTML=`<span class="pill-key">${i.key}</span> ${i.name}`,s.addEventListener("click",o=>{o.stopPropagation(),this.teleportTo(i.x,i.y,i.z,i.name)}),n.appendChild(s)}t.querySelector("#btn-toggle-noclip").addEventListener("click",()=>this.toggleNoclip()),t.querySelector("#btn-toggle-wire").addEventListener("click",()=>this.toggleWireframe()),t.querySelector("#btn-toggle-bots").addEventListener("click",()=>this.cycleBotState()),t.querySelector("#btn-toggle-god").addEventListener("click",()=>{this.player&&(this.player.isGodMode=!this.player.isGodMode,this.player.isInfiniteAmmo=this.player.isGodMode,this._updateHUD(),this._showToast(`GOD MODE & AMMO: ${this.player.isGodMode?"AKTIF":"NONAKTIF"}`))}),t.querySelector("#btn-respawn-bots").addEventListener("click",()=>{this.bots&&(this.bots.respawnAll(),this._showToast("SEMUA BOT TELAH DI-RESPAWN"))}),t.querySelector("#btn-copy-pos").addEventListener("click",()=>this._copyPosition()),t.querySelector("#btn-exp-close").addEventListener("click",()=>this.disable()),t.querySelector("#btn-exp-help").addEventListener("click",()=>{const i=t.querySelector("#explorer-help-modal");i.style.display="flex"}),t.querySelector("#btn-close-help").addEventListener("click",()=>{const i=t.querySelector("#explorer-help-modal");i.style.display="none"})}_bindEvents(){window.addEventListener("keydown",e=>{var t;if(e.code==="F1"||e.code==="F3"){e.preventDefault(),this.toggle();return}if(this.isActive&&!(e.target.tagName==="INPUT"||e.target.tagName==="TEXTAREA")&&(e.code==="KeyF"?(e.preventDefault(),this.toggleNoclip()):e.code==="KeyH"?(e.preventDefault(),this.toggleWireframe()):e.code==="KeyB"?(e.preventDefault(),this.cycleBotState()):e.code==="KeyG"?(e.preventDefault(),this.player&&(this.player.isGodMode=!this.player.isGodMode,this.player.isInfiniteAmmo=this.player.isGodMode,this._updateHUD(),this._showToast(`GOD MODE: ${this.player.isGodMode?"AKTIF":"NONAKTIF"}`))):e.code==="KeyK"?(e.preventDefault(),(t=this.bots)==null||t.respawnAll(),this._showToast("SEMUA BOT TELAH DI-RESPAWN")):e.code==="KeyP"&&(e.preventDefault(),this._copyPosition()),e.altKey)){const i={Digit1:"a_site",Digit2:"a_heaven",Digit3:"a_hell",Digit4:"a_gen",Digit5:"mid_bridge",Digit6:"mid_catwalk",Digit7:"mid_canal",Digit8:"b_site",Digit9:"b_heaven",Digit0:"b_hell",Minus:"b_backsite",BracketLeft:"atk_spawn",BracketRight:"def_spawn"}[e.code];i&&(e.preventDefault(),this.teleportByZoneId(i))}})}_updateHUD(){var p,g;if(!this.overlayEl||!this.isActive)return;const e=this.player?this.player.position:this.camera.position,t=this.detectZone(e),n=this.overlayEl.querySelector("#exp-zone-name"),i=this.overlayEl.querySelector("#exp-zone-desc");n&&(n.textContent=t.name,n.style.color=t.color),i&&(i.textContent=t.desc);const s=this.overlayEl.querySelector("#exp-coord-x"),o=this.overlayEl.querySelector("#exp-coord-y"),a=this.overlayEl.querySelector("#exp-coord-z");s&&(s.textContent=e.x.toFixed(2)),o&&(o.textContent=(e.y+.72).toFixed(2)),a&&(a.textContent=e.z.toFixed(2));const l=this.overlayEl.querySelector("#exp-fps");l&&(l.textContent=`${this.currentFps} FPS`);const c=this.overlayEl.querySelector("#exp-noclip-status");if(c){const _=(p=this.player)==null?void 0:p.isNoclip;c.textContent=_?"TERBANG (FLY)":"JALAN (OFF)",c.style.color=_?"#22c55e":"#94a3b8"}const d=this.overlayEl.querySelector("#exp-wire-status");d&&(d.textContent=this.showWireframe?"ON":"OFF",d.style.color=this.showWireframe?"#00f0ff":"#94a3b8");const h=this.overlayEl.querySelector("#exp-bot-status");if(h){const _=this.botState==="frozen"?"BEKU (FROZEN)":this.botState==="passive"?"PASIF":"AKTIF",f=this.botState==="frozen"?"#38bdf8":this.botState==="passive"?"#f59e0b":"#ff4655";h.textContent=_,h.style.color=f}const u=this.overlayEl.querySelector("#exp-god-status");if(u){const _=(g=this.player)==null?void 0:g.isGodMode;u.textContent=_?"AKTIF":"OFF",u.style.color=_?"#eab308":"#94a3b8"}}_copyPosition(){var n;if(!this.player)return;const e=this.player.position,t=`X: ${e.x.toFixed(2)}, Y: ${(e.y+.72).toFixed(2)}, Z: ${e.z.toFixed(2)}`;(n=navigator.clipboard)==null||n.writeText(t).catch(()=>{}),this._showToast(`POSISI DISALIN: ${t}`)}_showToast(e){var n;const t=(n=this.overlayEl)==null?void 0:n.querySelector("#explorer-toast");t&&(t.textContent=e,t.classList.add("active"),clearTimeout(this._toastTimer),this._toastTimer=setTimeout(()=>{t.classList.remove("active")},2400))}}const yx="ACCENT",vx="Authentic 1:1 recreation of the ACCENT Competitive Map: 110x110m, full multi-tiered verticality with A Heaven & Hell, B Heaven & Hell, Mid Catwalk, Elevated Mid Bridge with underpass, and tactical jump-boost crate stacks",Mx="#70b2fa",Sx="#b8dcfa",bx=160,Tx=450,wx=1.3,Ex="#fff5e6",Ax=1.75,Rx="#fff8ee",Cx=[[0,.9,-46],[-8,.9,-46],[8,.9,-46],[0,.9,46],[-8,.9,46],[8,.9,46],[0,4.35,0],[-6,4.35,0],[6,4.35,0],[0,.5,-8],[0,.5,8],[-32,.9,-4],[-38,.9,-4],[-32,.9,6],[-44,4.7,-4],[-28,.9,-24],[-42,.9,-26],[-36,.9,-16],[32,.9,-4],[38,.9,-4],[32,.9,6],[40,4.3,14],[28,.9,-24],[42,.9,-26],[36,.9,-16],[-9.5,2.7,-13],[42,1.85,-8],[-18,.9,-4],[18,.9,-4],[-18,.9,18],[18,.9,18],[-32,.9,32],[32,.9,32],[-14,.9,42],[14,.9,42],[-24,.9,12],[24,.9,12],[0,.9,-28]],Px=[{comment:"=== 1. VAST GROUND PAVEMENT (110x110m) ==="},{x:0,y:-.5,z:0,w:130,h:1,d:130,type:"ground"},{comment:"=== 2. OUTER PERIMETER BOUNDARY WALLS (H=11m) ==="},{x:0,y:5,z:-58,w:120,h:11,d:2,type:"wall"},{x:0,y:5,z:58,w:120,h:11,d:2,type:"wall"},{x:-58,y:5,z:0,w:2,h:11,d:120,type:"wall"},{x:58,y:5,z:0,w:2,h:11,d:120,type:"wall"},{comment:"=== 3. ATTACKER SPAWN (NORTH PAVILION, Z=-46) ==="},{comment:"Attacker Grand Stone Plinth & Flooring"},{x:0,y:.25,z:-46,w:22,h:.5,d:16,type:"accent_stone"},{comment:"Attacker Pavilion Cedar Pillars"},{x:-9,y:2.5,z:-52,w:1.2,h:5,d:1.2,type:"pagoda_wood"},{x:9,y:2.5,z:-52,w:1.2,h:5,d:1.2,type:"pagoda_wood"},{x:-9,y:2.5,z:-40,w:1.2,h:5,d:1.2,type:"pagoda_wood"},{x:9,y:2.5,z:-40,w:1.2,h:5,d:1.2,type:"pagoda_wood"},{comment:"Attacker Pavilion Architrave Beams & Asian Roof"},{x:0,y:5.2,z:-46,w:24,h:.8,d:18,type:"pagoda_wood"},{x:0,y:6.4,z:-46,w:26,h:1.6,d:20,type:"asian_roof"},{comment:"Attacker Flank Exits Barriers"},{x:-16,y:3,z:-46,w:8,h:6,d:2,type:"wall"},{x:16,y:3,z:-46,w:8,h:6,d:2,type:"wall"},{comment:"Attacker Spawn Exit Smooth Ramp (Turunan Halus Menuju Mid)"},{isRamp:!0,minX:-4,maxX:4,minZ:-38,maxZ:-32,startY:.5,endY:.15,axis:"z",type:"accent_stone"},{comment:"=== 4. DEFENDER SPAWN (SOUTH PAVILION, Z=+46) ==="},{comment:"Defender Raised Stone Plinth"},{x:0,y:.25,z:46,w:22,h:.5,d:16,type:"accent_stone"},{comment:"Defender Pavilion Pillars"},{x:-9,y:2.5,z:40,w:1.2,h:5,d:1.2,type:"pagoda_wood"},{x:9,y:2.5,z:40,w:1.2,h:5,d:1.2,type:"pagoda_wood"},{x:-9,y:2.5,z:52,w:1.2,h:5,d:1.2,type:"pagoda_wood"},{x:9,y:2.5,z:52,w:1.2,h:5,d:1.2,type:"pagoda_wood"},{comment:"Defender Architrave & Roof"},{x:0,y:5.2,z:46,w:24,h:.8,d:18,type:"pagoda_wood"},{x:0,y:6.4,z:46,w:26,h:1.6,d:20,type:"asian_roof"},{comment:"Defender Flank Walls"},{x:-16,y:3,z:46,w:8,h:6,d:2,type:"wall"},{x:16,y:3,z:46,w:8,h:6,d:2,type:"wall"},{comment:"Defender Spawn Exit Smooth Ramp (Turunan Halus Menuju Mid)"},{isRamp:!0,minX:-4,maxX:4,minZ:32,maxZ:38,startY:.15,endY:.5,axis:"z",type:"accent_stone"},{comment:"=== 5. CENTRAL MID WATER CANAL (LEVEL 0: SUNKEN TRENCH Y=0.0-0.15m) ==="},{comment:"Canal Bed Excavation Stone Base"},{x:0,y:-.2,z:0,w:9,h:.4,d:42,type:"cobble"},{comment:"Shimmering Turquoise Water Body"},{x:0,y:.15,z:0,w:8.6,h:.25,d:41.6,type:"water"},{comment:"Canal West Retaining Stone Wall"},{x:-4.6,y:.6,z:0,w:.8,h:1.4,d:42,type:"accent_stone"},{comment:"Canal East Retaining Stone Wall"},{x:4.6,y:.6,z:0,w:.8,h:1.4,d:42,type:"accent_stone"},{comment:"Canal North Slipway Ramp (Turunan Batu Mulus ke Kanal Air)"},{isRamp:!0,minX:-3.5,maxX:3.5,minZ:-22,maxZ:-16,startY:.85,endY:.15,axis:"z",type:"accent_stone"},{comment:"Canal South Slipway Ramp (Turunan Batu Mulus ke Kanal Air)"},{isRamp:!0,minX:-3.5,maxX:3.5,minZ:16,maxZ:22,startY:.15,endY:.85,axis:"z",type:"accent_stone"},{comment:"Canal Jump-Out Tactical Crates (Step out of water directly up to Courtyard)"},{x:-3.8,y:.55,z:0,w:1.4,h:1,d:1.4,type:"box"},{x:3.8,y:.55,z:0,w:1.4,h:1,d:1.4,type:"box"},{comment:"=== 6. CENTRAL ELEVATED MID BRIDGE (LEVEL 2: HIGH GROUND Y=3.45m WITH UNDERPASS) ==="},{comment:"Bridge Deck Plank Span (L=18m, W=4.6m, H=0.5m, Underpass Clearance=2.8m)"},{x:0,y:3.2,z:0,w:18,h:.5,d:4.6,type:"pagoda_wood"},{comment:"Bridge Support Piers (Pilar Kayu di Tepi Kanal)"},{x:-4.8,y:1.6,z:-1.8,w:1,h:3.2,d:1,type:"pagoda_wood"},{x:-4.8,y:1.6,z:1.8,w:1,h:3.2,d:1,type:"pagoda_wood"},{x:4.8,y:1.6,z:-1.8,w:1,h:3.2,d:1,type:"pagoda_wood"},{x:4.8,y:1.6,z:1.8,w:1,h:3.2,d:1,type:"pagoda_wood"},{comment:"Bridge Protective Wooden Railings"},{x:0,y:3.85,z:-2.15,w:18,h:.8,d:.25,type:"pagoda_wood"},{x:0,y:3.85,z:2.15,w:18,h:.8,d:.25,type:"pagoda_wood"},{comment:"Mid Bridge West Ramp Incline (Tanjakan Kayu Halus ke Jembatan Mid)"},{isRamp:!0,minX:-17,maxX:-9,minZ:-2.3,maxZ:2.3,startY:.5,endY:3.2,axis:"x",type:"pagoda_wood"},{comment:"Mid Bridge East Ramp Decline (Turunan Kayu Halus dari Jembatan Mid)"},{isRamp:!0,minX:9,maxX:17,minZ:-2.3,maxZ:2.3,startY:3.2,endY:.5,axis:"x",type:"pagoda_wood"},{comment:"Mid Bridge Ramp Base Pedestals"},{x:-17.2,y:.8,z:-2.3,w:.8,h:1.6,d:.8,type:"pagoda_wood"},{x:-17.2,y:.8,z:2.3,w:.8,h:1.6,d:.8,type:"pagoda_wood"},{x:17.2,y:.8,z:-2.3,w:.8,h:1.6,d:.8,type:"pagoda_wood"},{x:17.2,y:.8,z:2.3,w:.8,h:1.6,d:.8,type:"pagoda_wood"},{comment:"=== 7. MID CATWALK (LEVEL 1: ELEVATED TERRACE Y=1.8m TO A SHORT) ==="},{comment:"Mid Catwalk Stone Deck"},{x:-9.5,y:1.6,z:-13,w:4.2,h:.4,d:13,type:"accent_stone"},{comment:"Catwalk Incline Ramp from Top Mid"},{isRamp:!0,minX:-11.6,maxX:-7.4,minZ:-24,maxZ:-19.5,startY:.5,endY:1.8,axis:"z",type:"accent_stone"},{comment:"Catwalk Balustrade Overlooking Mid Courtyard"},{x:-7.3,y:2.2,z:-13,w:.25,h:.8,d:13,type:"pagoda_wood"},{comment:"Catwalk to Mid Bridge Connection Ramp"},{isRamp:!0,minX:-11.6,maxX:-7.4,minZ:-6.5,maxZ:-2.3,startY:1.8,endY:3.2,axis:"z",type:"pagoda_wood"},{comment:"=== 8. MID SURROUNDING BUILDINGS & MARKET WINDOW ==="},{comment:"Mid West Flank Building (Connecting A Lobby)"},{x:-18,y:4,z:-12,w:8,h:8,d:14,type:"wall"},{x:-18,y:8.5,z:-12,w:9,h:1.5,d:15,type:"asian_roof"},{x:-18,y:4,z:12,w:8,h:8,d:14,type:"wall"},{x:-18,y:8.5,z:12,w:9,h:1.5,d:15,type:"asian_roof"},{comment:"Mid East Flank Building & Market (Connecting B Lobby)"},{x:18,y:4,z:-12,w:8,h:8,d:14,type:"wall"},{x:18,y:8.5,z:-12,w:9,h:1.5,d:15,type:"asian_roof"},{x:18,y:4,z:12,w:8,h:8,d:14,type:"wall"},{x:18,y:8.5,z:12,w:9,h:1.5,d:15,type:"asian_roof"},{comment:"Mid Market Elevated Platform (Pizza / Market Doorway Y=1.4m)"},{x:13.5,y:.7,z:0,w:3,h:1.4,d:6,type:"cobble"},{isRamp:!0,minX:10,maxX:12,minZ:-3,maxZ:3,startY:.5,endY:1.4,axis:"x",type:"accent_stone"},{comment:"Mid Courtyard Jumpable Crates"},{x:-7,y:.6,z:-6,w:1.8,h:1.1,d:1.8,type:"box"},{x:-7,y:1.55,z:-6,w:1.4,h:1,d:1.4,type:"radianite"},{x:7,y:.6,z:6,w:1.8,h:1.1,d:1.8,type:"box"},{x:7,y:1.55,z:6,w:1.4,h:1,d:1.4,type:"box"},{x:0,y:4.2,z:0,w:1.4,h:1.4,d:1.4,type:"radianite"},{comment:"=== 9. A SITE (TWO-TIER VERTICALITY: A HELL & A HEAVEN BALCONY) ==="},{comment:"A Site Stone Plaza Base"},{x:-34,y:.15,z:-4,w:26,h:.3,d:28,type:"accent_stone"},{comment:"A Site Plant Zone Circle Inlay"},{x:-34,y:.32,z:-4,w:11,h:.05,d:11,type:"site_a"},{comment:"A Water Basin / Moat (Beside A Site)"},{x:-24,y:-.1,z:8,w:10,h:.4,d:12,type:"cobble"},{x:-24,y:.12,z:8,w:9.2,h:.2,d:11.2,type:"water"},{x:-24,y:.45,z:14.2,w:10.4,h:.6,d:.8,type:"accent_stone"},{x:-24,y:.45,z:1.8,w:10.4,h:.6,d:.8,type:"accent_stone"},{comment:"A TOWER TIER 1: A HELL (SHELTERED GROUND FLOOR ROOM Y=0.15 - 3.6m)"},{comment:"Hell Back Wall (West)"},{x:-51,y:1.8,z:-4,w:.8,h:3.6,d:16,type:"brick"},{comment:"Hell North Wall"},{x:-46,y:1.8,z:-12,w:10,h:3.6,d:.8,type:"brick"},{comment:"Hell South Wall"},{x:-46,y:1.8,z:4,w:10,h:3.6,d:.8,type:"brick"},{comment:"Hell Interior Stone Floor"},{x:-46,y:.15,z:-4,w:10,h:.3,d:16,type:"accent_stone"},{comment:"A TOWER TIER 2: A HEAVEN & RAFTERS BALCONY (HIGH GROUND Y=3.8m)"},{comment:"A Heaven Floor Slab (Walkable surface at Y=3.8m, ceiling over Hell)"},{x:-46,y:3.6,z:-4,w:10,h:.4,d:16,type:"pagoda_wood"},{comment:"A Heaven Sniper Balcony Front Railing"},{x:-41.2,y:4.25,z:-4,w:.3,h:.9,d:14,type:"pagoda_wood"},{comment:"A Heaven Upper Back Wall"},{x:-51,y:5.8,z:-4,w:.8,h:4,d:16,type:"brick"},{comment:"A Heaven Upper North Wall"},{x:-46,y:5.8,z:-12,w:10,h:4,d:.8,type:"brick"},{comment:"A Heaven Upper South Wall"},{x:-46,y:5.8,z:4,w:10,h:4,d:.8,type:"brick"},{comment:"A Heaven Asian Pagoda Roof Eaves"},{x:-46,y:8,z:-4,w:12,h:1.4,d:18,type:"asian_roof"},{comment:"A Heaven Access Incline Ramp & Stairs (From A Link to Heaven Y=0.5 -> 3.6m)"},{isRamp:!0,minX:-50,maxX:-46,minZ:4,maxZ:12,startY:3.6,endY:.5,axis:"z",type:"accent_stone"},{comment:"A Site Generator (A Gen: Jumpable Tiered High Ground Stack)"},{comment:"Gen Step-Up Box (Y=1.15m)"},{x:-30,y:.6,z:-14,w:1.6,h:1.1,d:1.6,type:"box"},{comment:"Gen Main Generator Body (Y=2.45m - Jumpable from Step-Up Box)"},{x:-32.5,y:1.25,z:-14,w:3.2,h:2.4,d:2.4,type:"radianite"},{comment:"A Site Dice / Green Boxes (Double Crate Stack)"},{comment:"Lower Crate (Y=1.15m)"},{x:-32,y:.6,z:-8,w:1.6,h:1.1,d:1.6,type:"box"},{comment:"Upper Double Crate (Y=2.35m)"},{x:-32,y:1.25,z:-6.2,w:1.6,h:2.4,d:1.8,type:"box"},{comment:"A Wine / A Main Sunken Nook & Cover"},{x:-46,y:.6,z:-22,w:4,h:1.1,d:.8,type:"brick"},{comment:"A Main Entry Gateway & Corridor"},{isRamp:!0,minX:-44,maxX:-36,minZ:-20,maxZ:-14,startY:.05,endY:.35,axis:"z",type:"accent_stone"},{x:-34,y:4,z:-28,w:.8,h:8,d:20,type:"wall"},{x:-46,y:4,z:-28,w:.8,h:8,d:20,type:"wall"},{x:-40,y:7.5,z:-22,w:12,h:1.2,d:2,type:"asian_roof"},{comment:"=== 10. B SITE (TWO-TIER VERTICALITY: B HELL, B HEAVEN & RAISED BACKSITE) ==="},{comment:"B Site Stone Plaza Base"},{x:34,y:.15,z:-4,w:26,h:.3,d:28,type:"cobble"},{comment:"B Site Plant Zone Inlay"},{x:34,y:.32,z:-4,w:11,h:.05,d:11,type:"site_b"},{comment:"B TOWER TIER 1: B HELL (GROUND FLOOR UNDER WINDOW Y=0.15 - 3.2m)"},{comment:"Hell Back Wall"},{x:47,y:1.6,z:14,w:.8,h:3.2,d:9,type:"brick"},{comment:"Hell North Wall"},{x:42,y:1.6,z:9.5,w:10,h:3.2,d:.8,type:"brick"},{comment:"Hell South Wall"},{x:42,y:1.6,z:18.5,w:10,h:3.2,d:.8,type:"brick"},{comment:"Hell Floor"},{x:42,y:.15,z:14,w:10,h:.3,d:9,type:"cobble"},{comment:"B TOWER TIER 2: B HEAVEN (UPPER SNIPER WINDOW Y=3.4m)"},{comment:"B Heaven Floor Slab (Surface at Y=3.4m)"},{x:42,y:3.2,z:14,w:9,h:.4,d:9,type:"pagoda_wood"},{comment:"B Heaven Window Balustrade Facing Site B"},{x:37.6,y:3.85,z:14,w:.3,h:.9,d:7,type:"pagoda_wood"},{comment:"B Heaven Upper Walls"},{x:46.5,y:5.2,z:14,w:.8,h:3.6,d:9,type:"brick"},{x:42,y:5.2,z:9.5,w:9,h:3.6,d:.8,type:"brick"},{x:42,y:5.2,z:18.5,w:9,h:3.6,d:.8,type:"brick"},{comment:"Pagoda Roof Tier 1"},{x:42,y:7.2,z:14,w:10.5,h:.9,d:10.5,type:"asian_roof"},{comment:"B Pagoda Tower Spire & Upper Eaves"},{x:42,y:9,z:14,w:6.5,h:3,d:6.5,type:"pagoda_wood"},{x:42,y:10.8,z:14,w:8,h:1.2,d:8,type:"asian_roof"},{comment:"B Heaven Access Stairs (Ramp/Stairs from Defender Backsite Y=0.5 -> 3.2m)"},{isRamp:!0,minX:35,maxX:39,minZ:18.5,maxZ:26,startY:3.2,endY:.5,axis:"z",type:"stairs_wood"},{comment:"B Backsite Raised Deck (Level Y=0.95m Elevated Defense Hold)"},{x:42,y:.75,z:-8,w:8,h:.4,d:12,type:"pagoda_wood"},{isRamp:!0,minX:35,maxX:38,minZ:-14,maxZ:-2,startY:.15,endY:.95,axis:"x",type:"accent_stone"},{comment:"Backsite Cover Crates on Raised Deck"},{x:42,y:1.7,z:-8,w:2,h:1.5,d:2,type:"box"},{comment:"B Site Triple Box (Default Jump-Stack Cover)"},{x:34,y:.65,z:-4,w:2.6,h:1.1,d:2.6,type:"radianite"},{x:34,y:1.75,z:-4,w:1.8,h:1.1,d:1.8,type:"box"},{x:26,y:.6,z:2,w:2,h:1.1,d:2,type:"box"},{x:26,y:1.65,z:2,w:1.6,h:1,d:1.6,type:"box"},{comment:"B Main Entry Gateway & Corridor"},{isRamp:!0,minX:36,maxX:44,minZ:-20,maxZ:-14,startY:.05,endY:.35,axis:"z",type:"cobble"},{x:34,y:4,z:-28,w:.8,h:8,d:20,type:"wall"},{x:46,y:4,z:-28,w:.8,h:8,d:20,type:"wall"},{x:40,y:7.5,z:-22,w:12,h:1.2,d:2,type:"asian_roof"},{comment:"=== 11. FLANK CORRIDORS & ALLEYWAYS (EAST & WEST) ==="},{comment:"West Alley / Flank Route"},{x:-28,y:3.5,z:24,w:.8,h:7,d:24,type:"wall"},{x:-38,y:3.5,z:24,w:.8,h:7,d:24,type:"wall"},{x:-33,y:.15,z:24,w:9.2,h:.3,d:24,type:"cobble"},{x:-33,y:.6,z:24,w:2,h:1.1,d:2,type:"box"},{comment:"East Alley / Flank Route"},{x:28,y:3.5,z:24,w:.8,h:7,d:24,type:"wall"},{x:38,y:3.5,z:24,w:.8,h:7,d:24,type:"wall"},{x:33,y:.15,z:24,w:9.2,h:.3,d:24,type:"cobble"},{x:33,y:.6,z:24,w:2,h:1.1,d:2,type:"box"}],Ic={name:yx,description:vx,skyColor:Mx,fogColor:Sx,fogNear:bx,fogFar:Tx,ambientIntensity:wx,ambientColor:Ex,sunIntensity:Ax,sunColor:Rx,spawn:Cx,blocks:Px};let mt,fi,Sa,Ke,Sn,ys,rn,Ji,ba,vh,Gi,Mh=null,Za="vandal",yr=[];const Lx=7;function Ix(){mt=new kg,Ji=new ux(mt.scene),fi=new l_(mt.scene),rn=new mx,ba=new gx,vh=new _x,Sn=new dx(mt.scene,Ji),Dx(),Nx()}function Pr(){Rs(),document.getElementById("main-menu").classList.add("active"),mt.stop()}function Rs(){document.querySelectorAll(".screen").forEach(r=>{r.classList.remove("active"),r.style.display=""})}function Dx(){document.getElementById("btn-play").addEventListener("click",()=>{Rs(),ba.show((r,e)=>Ta(r,e,!1),()=>Pr())}),document.getElementById("btn-explore").addEventListener("click",()=>{Rs(),ba.show((r,e)=>Ta(r,e,!0),()=>Pr())}),document.getElementById("btn-leaderboard").addEventListener("click",()=>{alert("Leaderboard is coming in Phase 2 (Supabase integration) 🚀")}),document.getElementById("btn-settings").addEventListener("click",()=>{alert("Settings coming soon in next update.")})}async function Ta(r,e="vandal",t=!1){var s,o;Mh=r,Za=e,Rs(),document.getElementById("game-container").classList.add("active"),mt.resize(),await fi.load(Ic),yr=fi.getSpawnPoints(Ic),Sa=new c_(fi.getColliders(),fi.getRamps());const i=Cr(yr,[]);Ke=new sx(mt.camera,Sa,mt.scene,Ji,mt.viewmodelCamera),Ke.setAgent(r),Ke.position.copy(i),Ke.camera.position.copy(i),Ke.camera.position.y+=.72,Ke.equipWeapon(e,0),Ke.equipWeapon("classic",1),Ke.switchSlot(0),Sn.setTracerManager(Ji),Sn.spawn(Lx,yr,Ke),Gi=new xx(mt.scene,mt.camera,Ke,fi,Sn),t?Gi.enable():Gi.disable(),rn.setAgent(r),rn.setWeaponSlot(0,(s=Ke.weaponSlots[0])==null?void 0:s.def),rn.setWeaponSlot(1,(o=Ke.weaponSlots[1])==null?void 0:o.def),rn.setActiveSlot(0),rn.setHealth(r.health,50),rn.showPlayOverlay({title:t?"MODE EKSPLORASI & DEBUG":"READY TO DEPLOY",subtitle:t?"TERBANG BEBAS [F] · INSPECT KOLISI [H] · TELEPORT [1-0]":"CHOOSE WEAPON & CLICK TO PLAY",playText:t?"MULAI EKSPLORASI":"CLICK TO PLAY",weaponId:e}),ys&&ys.stop(),ys=new px,mt.removeUpdateFn(wa),mt.addUpdateFn(wa),mt.start(),ys.start()}function wa(r){!Ke||!Sn||(fi.update(performance.now()*.001),Ji.update(r),Ke.update(r,Sn.getAll()),Sn.update(r,Ke.position,Sa,Ke.alive,Ke.velocity),ys.update(),Gi==null||Gi.update())}function Nx(){var s,o;const r=document.getElementById("game-container");r.addEventListener("mousedown",a=>{mt.isLocked&&(a.button===0&&(Ke==null||Ke.startFire()),a.button===2&&(Ke==null||Ke.setScoped(!0)))}),window.addEventListener("mouseup",a=>{a.button===0&&(Ke==null||Ke.stopFire()),a.button===2&&(Ke==null||Ke.setScoped(!1))}),r.addEventListener("contextmenu",a=>a.preventDefault());let e="BOT",t=!1;Re.on("player:take_damage",({amount:a,isHead:l,from:c,angle:d})=>{e=c??"BOT",t=!!l,Ke==null||Ke.takeDamage(a),d!==void 0&&rn.flashDirectionalDamage(d,mt.camera.rotation.y)}),Re.on("bot:killed_bot",({killer:a,victim:l,weapon:c,isHead:d})=>{rn.addKillFeed(a,l,c,d)}),Re.on("player:select_weapon",({weaponId:a})=>{var l;Za=a,Ke&&(Ke.equipWeapon(a,0),rn.setWeaponSlot(0,(l=Ke.weaponSlots[0])==null?void 0:l.def))}),Re.on("player:died",()=>{rn.addKillFeed(e,"YOU","",t),mt.unlockPointer()}),Re.on("player:click_to_play",()=>{var a;if(Ke){if(!Ke.alive){const l=Sn?Sn.getLiving():[],c=Cr(yr,l,22);Ke.respawn(c)}rn.setWeaponSlot(0,(a=Ke.weaponSlots[0])==null?void 0:a.def),mt.lockPointer()}}),Re.on("dm:end",a=>{Ux(a)});function n(){if(mt==null?void 0:mt.captureScreenshot()){const l=document.getElementById("screenshot-toast");l&&(l.classList.remove("hidden"),clearTimeout(l._timer),l._timer=setTimeout(()=>l.classList.add("hidden"),2200))}}function i(){const a=document.getElementById("record-indicator"),l=document.getElementById("rec-countdown");(mt==null?void 0:mt.recordClip(3e3,d=>{l&&(l.textContent=`${d.toFixed(1)}s`)}))&&a&&(a.classList.remove("hidden"),l&&(l.textContent="3.0s"))}Re.on("record:completed",({ext:a="mp4"}={})=>{const l=document.getElementById("record-indicator");l&&l.classList.add("hidden");const c=document.getElementById("record-toast");c&&(c.textContent=`🎥 3s Clip (${a.toUpperCase()}) Saved & Ready to Upload!`,c.classList.remove("hidden"),clearTimeout(c._timer),c._timer=setTimeout(()=>c.classList.add("hidden"),2800))}),(s=document.getElementById("btn-screenshot"))==null||s.addEventListener("click",a=>{a.stopPropagation(),n()}),(o=document.getElementById("btn-record"))==null||o.addEventListener("click",a=>{a.stopPropagation(),i()}),window.addEventListener("keydown",a=>{a.code==="Tab"&&a.preventDefault(),(a.code==="KeyP"||a.code==="F2"||a.code==="PrintScreen")&&n(),(a.code==="F9"||a.code==="Backslash"||a.code==="BracketRight")&&i()})}function Ux(r){mt.stop(),mt.unlockPointer(),mt.removeUpdateFn(wa),Sn.clearAll(),Ji.clear(),Rs(),vh.show(r,()=>Ta(Mh,Za),()=>Pr())}Ix();Pr();
//# sourceMappingURL=index-BA5GV9o5.js.map
