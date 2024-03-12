const { PrismaClient } = require('@prisma/client')
const cuid = require('cuid')
const prisma = new PrismaClient()

async function main() {
  const user1 = await prisma.User.upsert({
    where: { id: 'cltlr872y0000e6odte4ze9d0'},
    update: {},
    create: {
      email: 'asdf@asdf.com',
      displayName: 'asdf@asdf.com',
      password: '$2b$10$pkuiEDa8v.U3YOWi8C8EMOk1sLLfKlFnizuGNh1Sga9BsbSd1iz0u',
      locationPostal: "12345",
    },
  })
  const wetSpot = await prisma.Store.upsert({
    where: { id: 'wet-spot-store-id'},
    update: {},
    create: {
      storeName: 'The Wet Spot',
      description1: 'Beautiful fish available',
      email: 'alice@prisma.io',
      phone: '6023500692',
      isShipping: false,
      isPickup: true,
      locationPostal: "55555",
    },
  })
  const baseTrout = await prisma.BaseSpecie.upsert({
    where: { id: 'malawi-trout-id'},
    update: {},
    create: {
      id: 'malawi-trout-id',
      commonName: 'Malawi trout',
      scientificName: 'Der Malawi trout',
      description: 'Beautiful troue fish',
      maxSize: 233,
      temperament: 'temperament',
      diet: 'diet',
      compatability: 'compatability',
    },
  });

  const storeTrout = await prisma.StoreSpecie.upsert({
    where: { id: 'my-malawi-trout-id'},
    update: {},
    create: {
      id: 'my-malawi-trout-id',
      baseSpecieId: 'malawi-trout-id',
      commonName: 'my Malawi trout',
      scientificName: 'my Der Malawi trout',
      description: 'my Beautiful troue fish',
      maxSize: 233,
      temperament: 'my temperament',
      diet: 'my diet',
      compatability: 'my compatability',
    },
  });

  const troutSku1 = await prisma.Sku.upsert({
    where: { id: 'sku1'},
    update: {},
    create: {
      id: 'sku1',
      storeSpecieId: 'my-malawi-trout-id',
      price: "14",
      sex: "MALE",
      size: "L"
    },
  })
  const troutSku2 = await prisma.Sku.upsert({
    where: { id: 'sku2' },
    update: {},
    create: {
      id: 'sku2',
      storeSpecieId: 'my-malawi-trout-id',
      price: "11",
      sex: "MALE",
      size: "XS"
    },
  });


  console.log({ wetSpot, baseTrout, storeTrout})//, troutSku })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })



//   Message: Error in Prisma Client request: 


// Invalid `f=e.match(J2t)?.[1]??"",g=e.match(Q2t)?.[1]??null,v=e.match(Z2t)?.[1]??null,{getPrismaClient:E,PrismaClientKnownRequestError:x,PrismaClientRustPanicError:S,PrismaClientInitializationError:C,PrismaClientValidationError:A}=require(`${c.prismaClient}/runtime/${u}`),O=Buffer.from(e,"utf-8").toString("base64"),I=(0,GN.createHash)("sha256").update()` invocation in
// /Users/gdylanc/.nvm/versions/node/v18.18.2/lib/node_modules/prisma/build/index.js:1521:12640

//   1518 For more information, check out the Getting started guide here: ${ye("https://pris.ly/d/accelerate-getting-started")}`)}else return on(`Accelerate enabled. Use your secure API key in your Accelerate connection string to authenticate requests.
//   1519 
//   1520 For more information, check out the Getting started guide here: ${ye("https://pris.ly/d/accelerate-getting-started")}`)}};var zR={};da(zR,{$:()=>GR,Create:()=>VR,Delete:()=>HR,Show:()=>WR});var GR=class e{constructor(r){this.commands=r}static new(r){return new e(r)}async parse(r){return ca(this.commands,r)}};var VR=class e{static new(){return new e}async parse(r){let n=pe(r,{...Dr.project,"--name":String,"-n":"--name"});if(ee(n))return n;let i=await Cr(n),a=Gt(n,["--workspace","-w"]);if(ee(a))return a;let o=Gt(n,["--project","-p"]);if(ee(o))return o;let u=Co(n,["--name","-n"]),c=await fr({token:i,path:`/${a}/${o}/settings/api-keys/create`,route:"_app.$organizationId_.$projectId.settings.api-keys.create",payload:{displayName:u}});if(c.error?.message)throw new Error(c.error.message);return on(`New API Key created: ${c.data.tenantAPIKey}`)}};var HR=class e{static new(){return new e}async parse(r){let n=pe(r,{...Dr.project,"--apikey":String});if(ee(n))return n;let i=await Cr(n),a=Gt(n,["--workspace","-w"]);if(ee(a))return a;let o=Gt(n,["--project","-p"]);if(ee(o))return o;let u=Gt(n,["--apikey"]);if(ee(u))return u;let c=await fr({token:i,path:`/${a}/${o}/settings/api-keys`,route:"_app.$organizationId_.$projectId.settings.api-keys",payload:{id:u}});if(c.error?.message)throw new Error(c.error.message);return on(`API Key ${c.data.displayName} deleted.`)}};var WR=class e{static new(){return new e}async parse(r){let n=pe(r,{...Dr.project});if(ee(n))return n;let i=await Cr(n),a=Gt(n,["--workspace","-w"]);if(ee(a))return a;let o=Gt(n,["--project","-p"]);if(ee(o))return o;let u=await fr({token:i,path:`/${a}/${o}/settings/api-keys`,route:"_app.$organizationId_.$projectId.settings.api-keys"});return console.table(u.serviceKeys.map(({id:c,displayName:p,createdAt:l})=>({id:c,createdAt:l,name:p})),["id","name","createdAt"]),""}};var XR={};da(XR,{$:()=>KR,Login:()=>$5,Logout:()=>q5,Show:()=>YR});var KR=class e{constructor(r){this.commands=r}static new(r){return new e(r)}async parse(r){return ca(this.commands,r)}};var g2e=L(h2e()),v2e=L(v0()),y2e=L(require("http"));var b2e=L(Q3()),M5=L(Bf());var x2e=ue("prisma:cli:platform:login"),$5=class e{static new(){return new e}async parse(){let r=await E2();if(ee(r))throw r;if(r.token)return`Already authenticated. Run ${Y(Ee("prisma platform auth show --early-access"))} to see the current user.`;console.info("Authenticating to Prisma Platform CLI via browser");let n=y2e.default.createServer(),i=await(0,g2e.default)(n,0,"127.0.0.1"),a=await llt({connection:"github",redirectTo:i.href});console.info("Visit the following URL in your browser to authenticate:"),console.info(ye(a.href));try{let[o]=await Promise.all([new Promise((c,p)=>{n.once("request",(l,f)=>{n.close(),f.setHeader("connection","close");let g=new URL(l.url||"/","http://localhost").searchParams,v=g.get("token")??"",E=g.get("error"),x=new URL("/auth/cli",$R);if(E)x.pathname+="/error",x.searchParams.set("error",E),p(new Error(E));else{let S=flt(g.get("user")??"");if(S){g.delete("token"),g.delete("user"),x.pathname+="/success";let C=new URLSearchParams({...Object.fromEntries(g.entries()),email:S.email});x.search=C.toString(),c({token:v,user:S})}else x.pathname+="/error",x.searchParams.set("error","Invalid user"),p(new Error("Invalid user"))}f.statusCode=302,f.setHeader("location",x.href),f.end()}),n.once("error",p)}),(0,b2e.default)(a.href)]),u=await d2e({token:o.token});if(ee(u))throw u;return on(`Authentication successful for ${o.user.email}`)}catch(o){throw new Error(`Authentication failed: ${ee(o)?o.message:""}`)}}},llt=async e=>{let r=await v2e.getSignature().catch(o=>(x2e(`await checkpoint.getSignature() failed silently with ${o}`),null)),n={client:`${M5.name}@${M5.version}`,signature:r,...e},i=Buffer.from(JSON.stringify(n),"utf-8").toString("base64"),a=new URL("/auth/cli",$R);return a.searchParams.set("state",i),a},dlt=e=>{if(typeof e!="object"||e===null)return!1;let r=e;return typeof r.id=="string"&&typeof r.displayName=="string"&&typeof r.handle=="string"&&typeof r.email=="string"},flt=e=>{try{let r=JSON.parse(Buffer.from(e,"base64").toString("utf-8"));return dlt(r)?r:null}catch(r){return x2e(`parseUser() failed silently with ${r}`),null}};var q5=class e{static new(){return new e}async parse(){let r=await E2();if(ee(r))throw r;return r.token?(await f2e(),on("You have logged out")):`You are not currently logged in. Run ${Y(Ee("prisma platform auth login --early-access"))} to log in.`}};var YR=class e{static new(){return new e}async parse(r){let n=pe(r,{...Dr.global});if(ee(n))return n;let i=await Cr(n),a=await fr({token:i,path:"/settings/account",route:"_app._user.settings.account"});return console.info(`Currently authenticated as ${Y(a.user.email)}
// → 1521 `),Cc([["id",a.user.id],["handle",a.user.handle],["email",a.user.email],["displayName",a.user.displayName]])}};var tI={};da(tI,{$:()=>JR,Create:()=>QR,Delete:()=>ZR,Show:()=>eI});var JR=class e{constructor(r){this.commands=r}static new(r){return new e(r)}async parse(r){return ca(this.commands,r)}};var QR=class e{static new(){return new e}async parse(r){let n=pe(r,{...Dr.workspace,"--name":String,"-n":"--name"});if(ee(n))return n;let i=await Cr(n),a=Gt(n,["--workspace","-w"]);if(ee(a))return a;let o=Co(n,["--name","-n"]),u=await fr({token:i,path:`/${a}/overview/create`,route:"_app.$organizationId.overview.create",payload:{displayName:o}});if(u.error)throw new Error(`${u.error.name}: ${u.error.message}`);return on(`Project ${u.data.displayName} - ${u.data.id} created.`)}};var ZR=class e{static new(){return new e}async parse(r){let n=pe(r,{...Dr.project});if(ee(n))return n;let i=await Cr(n),a=Gt(n,["--workspace","-w"]);if(ee(a))return a;let o=Gt(n,["--project","-p"]);if(ee(o))return o;let u=await fr({token:i,path:`/${a}/${o}/settings/general`,route:"_app.$organizationId_.$projectId.settings.general",payload:{intent:"delete"}});if(u.error)throw new Error(`${u.error.name}: ${u.error.message}`);return on(`Project ${u.data.displayName} - ${u.data.id} deleted.`)}};var eI=class e{static new(){return new e}async parse(r){let n=pe(r,{...Dr.workspace});if(ee(n))return n;let i=await Cr(n),a=Gt(n,["--workspace","-w"]);if(ee(a))return a;let o=await fr({token:i,path:`/${a}/overview`,route:"_app.$organizationId.overview"});return console.table(o.organization.projects.map(({id:u,displayName:c,createdAt:p})=>({id:u,createdAt:p,name:c})),["id","name","createdAt"]),""}};var iI={};da(iI,{$:()=>rI,Show:()=>nI});var rI=class e{constructor(r){this.commands=r}static new(r){return new e(r)}async parse(r){return ca(this.commands,r)}};var nI=class e{static new(){return new e}async parse(r){let n=pe(r,{...Dr.global});if(ee(n))return n;let i=await Cr(n),a=await fr({token:i,path:"/settings/workspaces",route:"_app._user.settings.workspaces"});return console.table(a.organizations.map(o=>({id:o.id,name:o.displayName,createdAt:o.createdAt})),["id","name","createdAt"]),""}};var K8e=require("@prisma/engines");var w2e=require("buffer");function E2e(e,r,n,i){Object.defineProperty(e,r,{get:n,set:i,enumerable:!0,configurable:!0})}var _2e={};E2e(_2e,"serializeRPCMessage",()=>oI);E2e(_2e,"deserializeRPCMessage",()=>uI);var aI="PrismaBigInt::",sI="PrismaBytes::";function oI(e){return JSON.stringify(e,(r,n)=>typeof n=="bigint"?aI+n:n?.type==="Buffer"&&Array.isArray(n?.data)?sI+w2e.Buffer.from(n.data).toString("base64"):n)}function uI(e){return JSON.parse(e,(r,n)=>typeof n=="string"&&n.startsWith(aI)?BigInt(n.substr(aI.length)):typeof n=="string"&&n.startsWith(sI)?n.substr(sI.length):n)}var q8e=L(O2e()),O9=L(w8e()),j8e=L(require("http")),B8e=L(S8e()),U8e=require("zlib");var Ns=require("path");var GN=require("crypto"),O8e=L(qN());function A9(e,r,n,i){Object.defineProperty(e,r,{get:n,set:i,enumerable:!0,configurable:!0})}var R8e=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{},jN={},P9={},Ma=R8e.parcelRequire1308;Ma==null&&(Ma=function(e){if(e in jN)return jN[e].exports;if(e in P9){var r=P9[e];delete P9[e];var n={id:e,exports:{}};return jN[e]=n,r.call(n.exports,n,n.exports),n.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i},Ma.register=function(r,n){P9[r]=n},R8e.parcelRequire1308=Ma);Ma.register("9lTzd",function(module,exports){A9(module.exports,"guessEnginePaths",()=>guessEnginePaths),A9(module.exports,"guessPrismaClientPath",()=>guessPrismaClientPath);var $5COlq=Ma("5COlq");async function guessEnginePaths({forceBinary,forceLibrary,resolveOverrides}){let queryEngineName,queryEngineType;if(forceLibrary?(queryEngineName=await $5COlq.prismaEngineName("query-engine","library"),queryEngineType="library"):forceBinary?(queryEngineName=await $5COlq.prismaEngineName("query-engine","binary"),queryEngineType="binary"):(queryEngineName=void 0,queryEngineType=void 0),!queryEngineName||!queryEngineType)return{queryEngine:void 0};let queryEnginePath;if(resolveOverrides[".prisma/client"])queryEnginePath=(0,Ns.resolve)(resolveOverrides[".prisma/client"],`../${queryEngineName}`);else if(resolveOverrides["@prisma/engines"])queryEnginePath=(0,Ns.resolve)(resolveOverrides["@prisma/engines"],`../../${queryEngineName}`);else{let atPrismaEnginesPath;try{atPrismaEnginesPath=eval("require.resolve('@prisma/engines')")}catch(e){throw new Error("Unable to resolve Prisma engine paths. This is a bug.")}queryEnginePath=(0,Ns.resolve)(atPrismaEnginesPath`../../${queryEngineName}`)}return{queryEngine:{type:queryEngineType,path:queryEnginePath}}}function guessPrismaClientPath({resolveOverrides}){let prismaClientPath=resolveOverrides["@prisma/client"]||eval("require.resolve('@prisma/client')");return(0,Ns.resolve)(prismaClientPath,"../")}});Ma.register("5COlq",function(e,r){A9(e.exports,"prismaEngineName",()=>i);var n=Ma("1dWWL");async function i(a,o){let u=await n.getPlatform(),c=u==="windows"?".exe":"";if(o==="library")return qa(u,"fs");if(o==="binary")return`${a}-${u}${c}`;throw new Error(`Unknown engine type: ${o}`)}});Ma.register("1dWWL",function(e,r){A9(e.exports,"getPlatform",()=>i);let n;async function i(){return n||(n=await hr(),n)}});function X2t(e){return{models:BN(e.models),enums:BN(e.enums),types:BN(e.types)}}function BN(e){let r={};for(let{name:n,...i}of e)r[n]=i;return r}var Y2=(0,O8e.debug)("prisma:studio-pcw"),J2t=/^\s*datasource\s+([^\s]+)\s*{/m,Q2t=/url *= *env\("(.*)"\)/,Z2t=/url *= *"(.*)"/;async function egt({schema:e,schemaPath:r,dmmf:n,datasourceProvider:i,previewFeatures:a,datasources:o,engineType:u,paths:c,directUrl:p,versions:l}){let f=e.match(J2t)?.[1]??"",g=e.match(Q2t)?.[1]??null,v=e.match(Z2t)?.[1]??null,{getPrismaClient:E,PrismaClientKnownRequestError:x,PrismaClientRustPanicError:S,PrismaClientInitializationError:C,PrismaClientValidationError:A}=require(`${c.prismaClient}/runtime/${u}`),O=Buffer.from(e,"utf-8").toString("base64"),I=(0,GN.createHash)("sha256").update(
// The column `Store.description` does not exist in the current database.
  
// Query:
// {
//   "modelName": "Store",
//   "operation": "findMany",
//   "args": {
//     "take": 100,
//     "skip": 0,
//     "select": {
//       "id": true,
//       "users": {
//         "select": {
//           "id": true
//         }
//       },
//       "address": true,
//       "storeName": true,
//       "description": true,
//       "email": true,
//       "phone": true,
//       "locationPostal": true,
//       "isShipping": true,
//       "isPickup": true,
//       "isHidePhone": true,
//       "isHideAddress": true,
//       "createdAt": true,
//       "updatedAt": true
//     }
//   }
// }
  