const CHUNK_PUBLIC_PATH = "server/instrumentation.js";
const runtime = require("./chunks/[turbopack]_runtime.js");
runtime.loadChunk("server/chunks/[root of the server]__f9d4c9._.js");
runtime.loadChunk("server/chunks/node_modules_bcryptjs_97421c._.js");
module.exports = runtime.getOrInstantiateRuntimeModule("[project]/src/instrumentation.js [instrumentation-edge] (ecmascript)", CHUNK_PUBLIC_PATH).exports;
