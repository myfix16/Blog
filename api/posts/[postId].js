var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/.pnpm/@prisma+client@3.15.2_prisma@3.15.2/node_modules/.prisma/client/index.js
var require_client = __commonJS({
  "node_modules/.pnpm/@prisma+client@3.15.2_prisma@3.15.2/node_modules/.prisma/client/index.js"(exports, module2) {
    var PrismaClient2 = class {
      constructor() {
        throw new Error(`@prisma/client did not initialize yet. Please run "prisma generate" and try to import it again.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`);
      }
    };
    module2.exports = {
      PrismaClient: PrismaClient2
    };
  }
});

// node_modules/.pnpm/@prisma+client@3.15.2_prisma@3.15.2/node_modules/@prisma/client/index.js
var require_client2 = __commonJS({
  "node_modules/.pnpm/@prisma+client@3.15.2_prisma@3.15.2/node_modules/@prisma/client/index.js"(exports, module2) {
    module2.exports = {
      ...require_client()
    };
  }
});

// node_modules/.pnpm/@umijs+preset-umi@4.0.0/node_modules/@umijs/preset-umi/dist/features/apiRoute/utils.js
var require_utils = __commonJS({
  "node_modules/.pnpm/@umijs+preset-umi@4.0.0/node_modules/@umijs/preset-umi/dist/features/apiRoute/utils.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.matchApiRoute = exports.esbuildIgnorePathPrefixPlugin = void 0;
    function esbuildIgnorePathPrefixPlugin() {
      return {
        name: "ignore-path-prefix",
        setup(build) {
          build.onResolve({ filter: /^@fs/ }, (args) => ({
            path: args.path.replace(/^@fs/, "")
          }));
        }
      };
    }
    exports.esbuildIgnorePathPrefixPlugin = esbuildIgnorePathPrefixPlugin;
    function matchApiRoute(apiRoutes2, path) {
      if (path.startsWith("/"))
        path = path.substring(1);
      if (path.startsWith("api/"))
        path = path.substring(4);
      const pathSegments = path.split("/").filter((p) => p !== "");
      if (pathSegments.length === 0 || pathSegments.length === 1 && pathSegments[0] === "api") {
        const route2 = apiRoutes2.find((r) => r.path === "/");
        if (route2)
          return { route: route2, params: {} };
        else
          return void 0;
      }
      const params = {};
      const route = apiRoutes2.find((route2) => {
        const routePathSegments = route2.path.split("/").filter((p) => p !== "");
        if (routePathSegments.length !== pathSegments.length)
          return false;
        for (let i = 0; i < routePathSegments.length; i++) {
          const routePathSegment = routePathSegments[i];
          if (routePathSegment.match(/^\[.*]$/)) {
            params[routePathSegment.substring(1, routePathSegment.length - 1)] = pathSegments[i];
            if (i == routePathSegments.length - 1)
              return true;
            continue;
          }
          if (routePathSegment !== pathSegments[i])
            return false;
          if (i == routePathSegments.length - 1)
            return true;
        }
      });
      if (route)
        return { route, params };
    }
    exports.matchApiRoute = matchApiRoute;
  }
});

// node_modules/.pnpm/@umijs+preset-umi@4.0.0/node_modules/@umijs/preset-umi/dist/features/apiRoute/request.js
var require_request = __commonJS({
  "node_modules/.pnpm/@umijs+preset-umi@4.0.0/node_modules/@umijs/preset-umi/dist/features/apiRoute/request.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils_1 = require_utils();
    var UmiApiRequest2 = class {
      constructor(req, apiRoutes2) {
        this._params = {};
        this._body = null;
        this._req = req;
        const m = (0, utils_1.matchApiRoute)(apiRoutes2, this.pathName || "");
        if (m)
          this._params = m.params;
      }
      get params() {
        return this._params;
      }
      get body() {
        return this._body;
      }
      get headers() {
        return this._req.headers;
      }
      get method() {
        return this._req.method;
      }
      get query() {
        var _a, _b;
        return ((_b = (_a = this._req.url) === null || _a === void 0 ? void 0 : _a.split("?")[1]) === null || _b === void 0 ? void 0 : _b.split("&").reduce((acc, cur) => {
          const [key, value] = cur.split("=");
          const k = acc[key];
          if (k) {
            if (k instanceof Array) {
              k.push(value);
            } else {
              acc[key] = [k, value];
            }
          } else {
            acc[key] = value;
          }
          return acc;
        }, {})) || {};
      }
      get cookies() {
        var _a;
        return (_a = this._req.headers.cookie) === null || _a === void 0 ? void 0 : _a.split(";").reduce((acc, cur) => {
          const [key, value] = cur.split("=");
          acc[key.trim()] = value;
          return acc;
        }, {});
      }
      get url() {
        return this._req.url;
      }
      get pathName() {
        var _a;
        return (_a = this._req.url) === null || _a === void 0 ? void 0 : _a.split("?")[0];
      }
      readBody() {
        if (this._req.headers["content-length"] === "0") {
          return Promise.resolve();
        }
        return new Promise((resolve, reject) => {
          let body = "";
          this._req.on("data", (chunk) => {
            body += chunk;
          });
          this._req.on("end", () => {
            switch (this._req.headers["content-type"]) {
              case "application/json":
                try {
                  this._body = JSON.parse(body);
                } catch (e) {
                  this._body = body;
                }
                break;
              default:
                this._body = body;
                break;
            }
            resolve();
          });
          this._req.on("error", reject);
        });
      }
    };
    exports.default = UmiApiRequest2;
  }
});

// node_modules/.pnpm/@umijs+preset-umi@4.0.0/node_modules/@umijs/preset-umi/dist/features/apiRoute/response.js
var require_response = __commonJS({
  "node_modules/.pnpm/@umijs+preset-umi@4.0.0/node_modules/@umijs/preset-umi/dist/features/apiRoute/response.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UmiApiResponse2 = class {
      constructor(res) {
        this._res = res;
      }
      status(statusCode) {
        this._res.statusCode = statusCode;
        return this;
      }
      header(key, value) {
        this._res.setHeader(key, value);
        return this;
      }
      setCookie(key, value) {
        this._res.setHeader("Set-Cookie", `${key}=${value}; path=/`);
        return this;
      }
      text(data) {
        this._res.setHeader("Content-Type", "text/plain; charset=utf-8");
        this._res.end(data);
        return this;
      }
      html(data) {
        this._res.setHeader("Content-Type", "text/html; charset=utf-8");
        this._res.end(data);
        return this;
      }
      json(data) {
        this._res.setHeader("Content-Type", "application/json");
        this._res.end(JSON.stringify(data));
        return this;
      }
    };
    exports.default = UmiApiResponse2;
  }
});

// node_modules/.pnpm/@umijs+preset-umi@4.0.0/node_modules/@umijs/preset-umi/dist/features/apiRoute/index.js
var require_apiRoute = __commonJS({
  "node_modules/.pnpm/@umijs+preset-umi@4.0.0/node_modules/@umijs/preset-umi/dist/features/apiRoute/index.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.matchApiRoute = exports.UmiApiResponse = exports.UmiApiRequest = void 0;
    var request_1 = require_request();
    Object.defineProperty(exports, "UmiApiRequest", { enumerable: true, get: function() {
      return __importDefault(request_1).default;
    } });
    var response_1 = require_response();
    Object.defineProperty(exports, "UmiApiResponse", { enumerable: true, get: function() {
      return __importDefault(response_1).default;
    } });
    var utils_1 = require_utils();
    Object.defineProperty(exports, "matchApiRoute", { enumerable: true, get: function() {
      return utils_1.matchApiRoute;
    } });
  }
});

// src/.umi/api/posts/[postId].ts
var postId_exports = {};
__export(postId_exports, {
  default: () => postId_default2
});
module.exports = __toCommonJS(postId_exports);

// src/.umi/api/_middlewares.ts
var middlewares_default = async (req, res, next) => {
  next();
};

// src/api/posts/[postId].ts
var import_client = __toESM(require_client2());

// node_modules/.pnpm/@upstash+redis@1.6.1/node_modules/@upstash/redis/esm/pkg/error.js
var UpstashError = class extends Error {
  constructor(message) {
    super(message);
    this.name = "UpstashError";
  }
};

// node_modules/.pnpm/@upstash+redis@1.6.1/node_modules/@upstash/redis/esm/pkg/util.js
function parseRecursive(obj) {
  const parsed = Array.isArray(obj) ? obj.map((o) => {
    try {
      return parseRecursive(o);
    } catch {
      return o;
    }
  }) : JSON.parse(obj);
  if (typeof parsed === "number" && parsed.toString() != obj) {
    return obj;
  }
  return parsed;
}
function parseResponse(result) {
  try {
    return parseRecursive(result);
  } catch {
    return result;
  }
}

// node_modules/.pnpm/@upstash+redis@1.6.1/node_modules/@upstash/redis/esm/pkg/commands/command.js
var defaultSerializer = (c) => typeof c === "string" ? c : JSON.stringify(c);
var Command = class {
  constructor(command, opts) {
    Object.defineProperty(this, "command", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "serialize", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "deserialize", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this.serialize = defaultSerializer;
    this.deserialize = typeof opts?.automaticDeserialization === "undefined" || opts.automaticDeserialization ? opts?.deserialize ?? parseResponse : (x) => x;
    this.command = command.map(this.serialize);
  }
  async exec(client) {
    const { result, error } = await client.request({
      body: this.command
    });
    if (error) {
      throw new UpstashError(error);
    }
    if (typeof result === "undefined") {
      throw new Error(`Request did not return a result`);
    }
    return this.deserialize(result);
  }
};

// node_modules/.pnpm/@upstash+redis@1.6.1/node_modules/@upstash/redis/esm/pkg/commands/append.js
var AppendCommand = class extends Command {
  constructor(cmd, opts) {
    super(["append", ...cmd], opts);
  }
};

// node_modules/.pnpm/@upstash+redis@1.6.1/node_modules/@upstash/redis/esm/pkg/commands/bitcount.js
var BitCountCommand = class extends Command {
  constructor([key, start, end], opts) {
    const command = ["bitcount", key];
    if (typeof start === "number") {
      command.push(start);
    }
    if (typeof end === "number") {
      command.push(end);
    }
    super(command, opts);
  }
};

// node_modules/.pnpm/@upstash+redis@1.6.1/node_modules/@upstash/redis/esm/pkg/commands/bitop.js
var BitOpCommand = class extends Command {
  constructor(cmd, opts) {
    super(["bitop", ...cmd], opts);
  }
};

// node_modules/.pnpm/@upstash+redis@1.6.1/node_modules/@upstash/redis/esm/pkg/commands/bitpos.js
var BitPosCommand = class extends Command {
  constructor(cmd, opts) {
    super(["bitpos", ...cmd], opts);
  }
};

// node_modules/.pnpm/@upstash+redis@1.6.1/node_modules/@upstash/redis/esm/pkg/commands/dbsize.js
var DBSizeCommand = class extends Command {
  constructor(opts) {
    super(["dbsize"], opts);
  }
};

// node_modules/.pnpm/@upstash+redis@1.6.1/node_modules/@upstash/redis/esm/pkg/commands/decr.js
var DecrCommand = class extends Command {
  constructor(cmd, opts) {
    super(["decr", ...cmd], opts);
  }
};

// node_modules/.pnpm/@upstash+redis@1.6.1/node_modules/@upstash/redis/esm/pkg/commands/decrby.js
var DecrByCommand = class extends Command {
  constructor(cmd, opts) {
    super(["decrby", ...cmd], opts);
  }
};

// node_modules/.pnpm/@upstash+redis@1.6.1/node_modules/@upstash/redis/esm/pkg/commands/del.js
var DelCommand = class extends Command {
  constructor(cmd, opts) {
    super(["del", ...cmd], opts);
  }
};

// node_modules/.pnpm/@upstash+redis@1.6.1/node_modules/@upstash/redis/esm/pkg/commands/echo.js
var EchoCommand = class extends Command {
  constructor(cmd, opts) {
    super(["echo", ...cmd], opts);
  }
};

// node_modules/.pnpm/@upstash+redis@1.6.1/node_modules/@upstash/redis/esm/pkg/commands/eval.js
var EvalCommand = class extends Command {
  constructor([script, keys, args], opts) {
    super(["eval", script, keys.length, ...keys, ...args ?? []], opts);
  }
};

// node_modules/.pnpm/@upstash+redis@1.6.1/node_modules/@upstash/redis/esm/pkg/commands/evalsha.js
var EvalshaCommand = class extends Command {
  constructor([sha, keys, args], opts) {
    super(["evalsha", sha, keys.length, ...keys, ...args ?? []], opts);
  }
};

// node_modules/.pnpm/@upstash+redis@1.6.1/node_modules/@upstash/redis/esm/pkg/commands/exists.js
var ExistsCommand = class extends Command {
  constructor(cmd, opts) {
    super(["exists", ...cmd], opts);
  }
};

// node_modules/.pnpm/@upstash+redis@1.6.1/node_modules/@upstash/redis/esm/pkg/commands/expire.js
var ExpireCommand = class extends Command {
  constructor(cmd, opts) {
    super(["expire", ...cmd], opts);
  }
};

// node_modules/.pnpm/@upstash+redis@1.6.1/node_modules/@upstash/redis/esm/pkg/commands/expireat.js
var ExpireAtCommand = class extends Command {
  constructor(cmd, opts) {
    super(["expireat", ...cmd], opts);
  }
};

// node_modules/.pnpm/@upstash+redis@1.6.1/node_modules/@upstash/redis/esm/pkg/commands/flushall.js
var FlushAllCommand = class extends Command {
  constructor(args, opts) {
    const command = ["flushall"];
    if (args && args.length > 0 && args[0].async) {
      command.push("async");
    }
    super(command, opts);
  }
};

// node_modules/.pnpm/@upstash+redis@1.6.1/node_modules/@upstash/redis/esm/pkg/commands/flushdb.js
var FlushDBCommand = class extends Command {
  constructor([opts], cmdOpts) {
    const command = ["flushdb"];
    if (opts?.async) {
      command.push("async");
    }
    super(command, cmdOpts);
  }
};

// node_modules/.pnpm/@upstash+redis@1.6.1/node_modules/@upstash/redis/esm/pkg/commands/get.js
var GetCommand = class extends Command {
  constructor(cmd, opts) {
    super(["get", ...cmd], opts);
  }
};

// node_modules/.pnpm/@upstash+redis@1.6.1/node_modules/@upstash/redis/esm/pkg/commands/getbit.js
var GetBitCommand = class extends Command {
  constructor(cmd, opts) {
    super(["getbit", ...cmd], opts);
  }
};

// node_modules/.pnpm/@upstash+redis@1.6.1/node_modules/@upstash/redis/esm/pkg/commands/getrange.js
var GetRangeCommand = class extends Command {
  constructor(cmd, opts) {
    super(["getrange", ...cmd], opts);
  }
};

// node_modules/.pnpm/@upstash+redis@1.6.1/node_modules/@upstash/redis/esm/pkg/commands/getset.js
var GetSetCommand = class extends Command {
  constructor(cmd, opts) {
    super(["getset", ...cmd], opts);
  }
};

// node_modules/.pnpm/@upstash+redis@1.6.1/node_modules/@upstash/redis/esm/pkg/commands/hdel.js
var HDelCommand = class extends Command {
  constructor(cmd, opts) {
    super(["hdel", ...cmd], opts);
  }
};

// node_modules/.pnpm/@upstash+redis@1.6.1/node_modules/@upstash/redis/esm/pkg/commands/hexists.js
var HExistsCommand = class extends Command {
  constructor(cmd, opts) {
    super(["hexists", ...cmd], opts);
  }
};

// node_modules/.pnpm/@upstash+redis@1.6.1/node_modules/@upstash/redis/esm/pkg/commands/hget.js
var HGetCommand = class extends Command {
  constructor(cmd, opts) {
    super(["hget", ...cmd], opts);
  }
};

// node_modules/.pnpm/@upstash+redis@1.6.1/node_modules/@upstash/redis/esm/pkg/commands/hgetall.js
function deserialize(result) {
  if (result.length === 0) {
    return null;
  }
  const obj = {};
  while (result.length >= 2) {
    const key = result.shift();
    const value = result.shift();
    try {
      obj[key] = JSON.parse(value);
    } catch {
      obj[key] = value;
    }
  }
  return obj;
}
var HGetAllCommand = class extends Command {
  constructor(cmd, opts) {
    super(["hgetall", ...cmd], {
      deserialize: (result) => deserialize(result),
      ...opts
    });
  }
};

// node_modules/.pnpm/@upstash+redis@1.6.1/node_modules/@upstash/redis/esm/pkg/commands/hincrby.js
var HIncrByCommand = class extends Command {
  constructor(cmd, opts) {
    super(["hincrby", ...cmd], opts);
  }
};

// node_modules/.pnpm/@upstash+redis@1.6.1/node_modules/@upstash/redis/esm/pkg/commands/hincrbyfloat.js
var HIncrByFloatCommand = class extends Command {
  constructor(cmd, opts) {
    super(["hincrbyfloat", ...cmd], opts);
  }
};

// node_modules/.pnpm/@upstash+redis@1.6.1/node_modules/@upstash/redis/esm/pkg/commands/hkeys.js
var HKeysCommand = class extends Command {
  constructor([key], opts) {
    super(["hkeys", key], opts);
  }
};

// node_modules/.pnpm/@upstash+redis@1.6.1/node_modules/@upstash/redis/esm/pkg/commands/hlen.js
var HLenCommand = class extends Command {
  constructor(cmd, opts) {
    super(["hlen", ...cmd], opts);
  }
};

// node_modules/.pnpm/@upstash+redis@1.6.1/node_modules/@upstash/redis/esm/pkg/commands/hmget.js
function deserialize2(fields, result) {
  if (result.length === 0 || result.every((field) => field === null)) {
    return null;
  }
  const obj = {};
  for (let i = 0; i < fields.length; i++) {
    try {
      obj[fields[i]] = JSON.parse(result[i]);
    } catch {
      obj[fields[i]] = result[i];
    }
  }
  return obj;
}
var HMGetCommand = class extends Command {
  constructor([key, ...fields], opts) {
    super(["hmget", key, ...fields], {
      deserialize: (result) => deserialize2(fields, result),
      ...opts
    });
  }
};

// node_modules/.pnpm/@upstash+redis@1.6.1/node_modules/@upstash/redis/esm/pkg/commands/hmset.js
var HMSetCommand = class extends Command {
  constructor([key, kv], opts) {
    super([
      "hmset",
      key,
      ...Object.entries(kv).flatMap(([field, value]) => [field, value])
    ], opts);
  }
};

// node_modules/.pnpm/@upstash+redis@1.6.1/node_modules/@upstash/redis/esm/pkg/commands/hscan.js
var HScanCommand = class extends Command {
  constructor([key, cursor, cmdOpts], opts) {
    const command = ["hscan", key, cursor];
    if (cmdOpts?.match) {
      command.push("match", cmdOpts.match);
    }
    if (typeof cmdOpts?.count === "number") {
      command.push("count", cmdOpts.count);
    }
    super(command, opts);
  }
};

// node_modules/.pnpm/@upstash+redis@1.6.1/node_modules/@upstash/redis/esm/pkg/commands/hset.js
var HSetCommand = class extends Command {
  constructor([key, kv], opts) {
    super([
      "hset",
      key,
      ...Object.entries(kv).flatMap(([field, value]) => [field, value])
    ], opts);
  }
};

// node_modules/.pnpm/@upstash+redis@1.6.1/node_modules/@upstash/redis/esm/pkg/commands/hsetnx.js
var HSetNXCommand = class extends Command {
  constructor(cmd, opts) {
    super(["hsetnx", ...cmd], opts);
  }
};

// node_modules/.pnpm/@upstash+redis@1.6.1/node_modules/@upstash/redis/esm/pkg/commands/hstrlen.js
var HStrLenCommand = class extends Command {
  constructor(cmd, opts) {
    super(["hstrlen", ...cmd], opts);
  }
};

// node_modules/.pnpm/@upstash+redis@1.6.1/node_modules/@upstash/redis/esm/pkg/commands/hvals.js
var HValsCommand = class extends Command {
  constructor(cmd, opts) {
    super(["hvals", ...cmd], opts);
  }
};

// node_modules/.pnpm/@upstash+redis@1.6.1/node_modules/@upstash/redis/esm/pkg/commands/incr.js
var IncrCommand = class extends Command {
  constructor(cmd, opts) {
    super(["incr", ...cmd], opts);
  }
};

// node_modules/.pnpm/@upstash+redis@1.6.1/node_modules/@upstash/redis/esm/pkg/commands/incrby.js
var IncrByCommand = class extends Command {
  constructor(cmd, opts) {
    super(["incrby", ...cmd], opts);
  }
};

// node_modules/.pnpm/@upstash+redis@1.6.1/node_modules/@upstash/redis/esm/pkg/commands/incrbyfloat.js
var IncrByFloatCommand = class extends Command {
  constructor(cmd, opts) {
    super(["incrbyfloat", ...cmd], opts);
  }
};

// node_modules/.pnpm/@upstash+redis@1.6.1/node_modules/@upstash/redis/esm/pkg/commands/keys.js
var KeysCommand = class extends Command {
  constructor(cmd, opts) {
    super(["keys", ...cmd], opts);
  }
};

// node_modules/.pnpm/@upstash+redis@1.6.1/node_modules/@upstash/redis/esm/pkg/commands/lindex.js
var LIndexCommand = class extends Command {
  constructor(cmd, opts) {
    super(["lindex", ...cmd], opts);
  }
};

// node_modules/.pnpm/@upstash+redis@1.6.1/node_modules/@upstash/redis/esm/pkg/commands/linsert.js
var LInsertCommand = class extends Command {
  constructor(cmd, opts) {
    super(["linsert", ...cmd], opts);
  }
};

// node_modules/.pnpm/@upstash+redis@1.6.1/node_modules/@upstash/redis/esm/pkg/commands/llen.js
var LLenCommand = class extends Command {
  constructor(cmd, opts) {
    super(["llen", ...cmd], opts);
  }
};

// node_modules/.pnpm/@upstash+redis@1.6.1/node_modules/@upstash/redis/esm/pkg/commands/lpop.js
var LPopCommand = class extends Command {
  constructor(cmd, opts) {
    super(["lpop", ...cmd], opts);
  }
};

// node_modules/.pnpm/@upstash+redis@1.6.1/node_modules/@upstash/redis/esm/pkg/commands/lpush.js
var LPushCommand = class extends Command {
  constructor(cmd, opts) {
    super(["lpush", ...cmd], opts);
  }
};

// node_modules/.pnpm/@upstash+redis@1.6.1/node_modules/@upstash/redis/esm/pkg/commands/lpushx.js
var LPushXCommand = class extends Command {
  constructor(cmd, opts) {
    super(["lpushx", ...cmd], opts);
  }
};

// node_modules/.pnpm/@upstash+redis@1.6.1/node_modules/@upstash/redis/esm/pkg/commands/lrange.js
var LRangeCommand = class extends Command {
  constructor(cmd, opts) {
    super(["lrange", ...cmd], opts);
  }
};

// node_modules/.pnpm/@upstash+redis@1.6.1/node_modules/@upstash/redis/esm/pkg/commands/lrem.js
var LRemCommand = class extends Command {
  constructor(cmd, opts) {
    super(["lrem", ...cmd], opts);
  }
};

// node_modules/.pnpm/@upstash+redis@1.6.1/node_modules/@upstash/redis/esm/pkg/commands/lset.js
var LSetCommand = class extends Command {
  constructor(cmd, opts) {
    super(["lset", ...cmd], opts);
  }
};

// node_modules/.pnpm/@upstash+redis@1.6.1/node_modules/@upstash/redis/esm/pkg/commands/ltrim.js
var LTrimCommand = class extends Command {
  constructor(cmd, opts) {
    super(["ltrim", ...cmd], opts);
  }
};

// node_modules/.pnpm/@upstash+redis@1.6.1/node_modules/@upstash/redis/esm/pkg/commands/mget.js
var MGetCommand = class extends Command {
  constructor(cmd, opts) {
    super(["mget", ...cmd], opts);
  }
};

// node_modules/.pnpm/@upstash+redis@1.6.1/node_modules/@upstash/redis/esm/pkg/commands/mset.js
var MSetCommand = class extends Command {
  constructor([kv], opts) {
    super([
      "mset",
      ...Object.entries(kv).flatMap(([key, value]) => [key, value])
    ], opts);
  }
};

// node_modules/.pnpm/@upstash+redis@1.6.1/node_modules/@upstash/redis/esm/pkg/commands/msetnx.js
var MSetNXCommand = class extends Command {
  constructor([kv], opts) {
    super(["msetnx", ...Object.entries(kv).flatMap((_) => _)], opts);
  }
};

// node_modules/.pnpm/@upstash+redis@1.6.1/node_modules/@upstash/redis/esm/pkg/commands/persist.js
var PersistCommand = class extends Command {
  constructor(cmd, opts) {
    super(["persist", ...cmd], opts);
  }
};

// node_modules/.pnpm/@upstash+redis@1.6.1/node_modules/@upstash/redis/esm/pkg/commands/pexpire.js
var PExpireCommand = class extends Command {
  constructor(cmd, opts) {
    super(["pexpire", ...cmd], opts);
  }
};

// node_modules/.pnpm/@upstash+redis@1.6.1/node_modules/@upstash/redis/esm/pkg/commands/pexpireat.js
var PExpireAtCommand = class extends Command {
  constructor(cmd, opts) {
    super(["pexpireat", ...cmd], opts);
  }
};

// node_modules/.pnpm/@upstash+redis@1.6.1/node_modules/@upstash/redis/esm/pkg/commands/ping.js
var PingCommand = class extends Command {
  constructor(cmd, opts) {
    const command = ["ping"];
    if (typeof cmd !== "undefined" && typeof cmd[0] !== "undefined") {
      command.push(cmd[0]);
    }
    super(command, opts);
  }
};

// node_modules/.pnpm/@upstash+redis@1.6.1/node_modules/@upstash/redis/esm/pkg/commands/psetex.js
var PSetEXCommand = class extends Command {
  constructor(cmd, opts) {
    super(["psetex", ...cmd], opts);
  }
};

// node_modules/.pnpm/@upstash+redis@1.6.1/node_modules/@upstash/redis/esm/pkg/commands/pttl.js
var PTtlCommand = class extends Command {
  constructor(cmd, opts) {
    super(["pttl", ...cmd], opts);
  }
};

// node_modules/.pnpm/@upstash+redis@1.6.1/node_modules/@upstash/redis/esm/pkg/commands/publish.js
var PublishCommand = class extends Command {
  constructor(cmd, opts) {
    super(["publish", ...cmd], opts);
  }
};

// node_modules/.pnpm/@upstash+redis@1.6.1/node_modules/@upstash/redis/esm/pkg/commands/randomkey.js
var RandomKeyCommand = class extends Command {
  constructor(opts) {
    super(["randomkey"], opts);
  }
};

// node_modules/.pnpm/@upstash+redis@1.6.1/node_modules/@upstash/redis/esm/pkg/commands/rename.js
var RenameCommand = class extends Command {
  constructor(cmd, opts) {
    super(["rename", ...cmd], opts);
  }
};

// node_modules/.pnpm/@upstash+redis@1.6.1/node_modules/@upstash/redis/esm/pkg/commands/renamenx.js
var RenameNXCommand = class extends Command {
  constructor(cmd, opts) {
    super(["renamenx", ...cmd], opts);
  }
};

// node_modules/.pnpm/@upstash+redis@1.6.1/node_modules/@upstash/redis/esm/pkg/commands/rpop.js
var RPopCommand = class extends Command {
  constructor(cmd, opts) {
    super(["rpop", ...cmd], opts);
  }
};

// node_modules/.pnpm/@upstash+redis@1.6.1/node_modules/@upstash/redis/esm/pkg/commands/rpush.js
var RPushCommand = class extends Command {
  constructor(cmd, opts) {
    super(["rpush", ...cmd], opts);
  }
};

// node_modules/.pnpm/@upstash+redis@1.6.1/node_modules/@upstash/redis/esm/pkg/commands/rpushx.js
var RPushXCommand = class extends Command {
  constructor(cmd, opts) {
    super(["rpushx", ...cmd], opts);
  }
};

// node_modules/.pnpm/@upstash+redis@1.6.1/node_modules/@upstash/redis/esm/pkg/commands/sadd.js
var SAddCommand = class extends Command {
  constructor(cmd, opts) {
    super(["sadd", ...cmd], opts);
  }
};

// node_modules/.pnpm/@upstash+redis@1.6.1/node_modules/@upstash/redis/esm/pkg/commands/scan.js
var ScanCommand = class extends Command {
  constructor([cursor, opts], cmdOpts) {
    const command = ["scan", cursor];
    if (opts?.match) {
      command.push("match", opts.match);
    }
    if (typeof opts?.count === "number") {
      command.push("count", opts.count);
    }
    super(command, cmdOpts);
  }
};

// node_modules/.pnpm/@upstash+redis@1.6.1/node_modules/@upstash/redis/esm/pkg/commands/scard.js
var SCardCommand = class extends Command {
  constructor(cmd, opts) {
    super(["scard", ...cmd], opts);
  }
};

// node_modules/.pnpm/@upstash+redis@1.6.1/node_modules/@upstash/redis/esm/pkg/commands/script_exists.js
var ScriptExistsCommand = class extends Command {
  constructor(hashes, opts) {
    super(["script", "exists", ...hashes], {
      deserialize: (result) => result,
      ...opts
    });
  }
};

// node_modules/.pnpm/@upstash+redis@1.6.1/node_modules/@upstash/redis/esm/pkg/commands/script_flush.js
var ScriptFlushCommand = class extends Command {
  constructor([opts], cmdOpts) {
    const cmd = ["script", "flush"];
    if (opts?.sync) {
      cmd.push("sync");
    } else if (opts?.async) {
      cmd.push("async");
    }
    super(cmd, cmdOpts);
  }
};

// node_modules/.pnpm/@upstash+redis@1.6.1/node_modules/@upstash/redis/esm/pkg/commands/script_load.js
var ScriptLoadCommand = class extends Command {
  constructor(args, opts) {
    super(["script", "load", ...args], opts);
  }
};

// node_modules/.pnpm/@upstash+redis@1.6.1/node_modules/@upstash/redis/esm/pkg/commands/sdiff.js
var SDiffCommand = class extends Command {
  constructor(cmd, opts) {
    super(["sdiff", ...cmd], opts);
  }
};

// node_modules/.pnpm/@upstash+redis@1.6.1/node_modules/@upstash/redis/esm/pkg/commands/sdiffstore.js
var SDiffStoreCommand = class extends Command {
  constructor(cmd, opts) {
    super(["sdiffstore", ...cmd], opts);
  }
};

// node_modules/.pnpm/@upstash+redis@1.6.1/node_modules/@upstash/redis/esm/pkg/commands/set.js
var SetCommand = class extends Command {
  constructor([key, value, opts], cmdOpts) {
    const command = ["set", key, value];
    if (opts) {
      if ("ex" in opts && typeof opts.ex === "number") {
        command.push("ex", opts.ex);
      } else if ("px" in opts && typeof opts.px === "number") {
        command.push("px", opts.px);
      }
      if ("nx" in opts && opts.nx) {
        command.push("nx");
      } else if ("xx" in opts && opts.xx) {
        command.push("xx");
      }
    }
    super(command, cmdOpts);
  }
};

// node_modules/.pnpm/@upstash+redis@1.6.1/node_modules/@upstash/redis/esm/pkg/commands/setbit.js
var SetBitCommand = class extends Command {
  constructor(cmd, opts) {
    super(["setbit", ...cmd], opts);
  }
};

// node_modules/.pnpm/@upstash+redis@1.6.1/node_modules/@upstash/redis/esm/pkg/commands/setex.js
var SetExCommand = class extends Command {
  constructor(cmd, opts) {
    super(["setex", ...cmd], opts);
  }
};

// node_modules/.pnpm/@upstash+redis@1.6.1/node_modules/@upstash/redis/esm/pkg/commands/setnx.js
var SetNxCommand = class extends Command {
  constructor(cmd, opts) {
    super(["setnx", ...cmd], opts);
  }
};

// node_modules/.pnpm/@upstash+redis@1.6.1/node_modules/@upstash/redis/esm/pkg/commands/setrange.js
var SetRangeCommand = class extends Command {
  constructor(cmd, opts) {
    super(["setrange", ...cmd], opts);
  }
};

// node_modules/.pnpm/@upstash+redis@1.6.1/node_modules/@upstash/redis/esm/pkg/commands/sinter.js
var SInterCommand = class extends Command {
  constructor(cmd, opts) {
    super(["sinter", ...cmd], opts);
  }
};

// node_modules/.pnpm/@upstash+redis@1.6.1/node_modules/@upstash/redis/esm/pkg/commands/sinterstore.js
var SInterStoreCommand = class extends Command {
  constructor(cmd, opts) {
    super(["sinterstore", ...cmd], opts);
  }
};

// node_modules/.pnpm/@upstash+redis@1.6.1/node_modules/@upstash/redis/esm/pkg/commands/sismember.js
var SIsMemberCommand = class extends Command {
  constructor(cmd, opts) {
    super(["sismember", ...cmd], opts);
  }
};

// node_modules/.pnpm/@upstash+redis@1.6.1/node_modules/@upstash/redis/esm/pkg/commands/smembers.js
var SMembersCommand = class extends Command {
  constructor(cmd, opts) {
    super(["smembers", ...cmd], opts);
  }
};

// node_modules/.pnpm/@upstash+redis@1.6.1/node_modules/@upstash/redis/esm/pkg/commands/smove.js
var SMoveCommand = class extends Command {
  constructor(cmd, opts) {
    super(["smove", ...cmd], opts);
  }
};

// node_modules/.pnpm/@upstash+redis@1.6.1/node_modules/@upstash/redis/esm/pkg/commands/spop.js
var SPopCommand = class extends Command {
  constructor([key, count], opts) {
    const command = ["spop", key];
    if (typeof count === "number") {
      command.push(count);
    }
    super(command, opts);
  }
};

// node_modules/.pnpm/@upstash+redis@1.6.1/node_modules/@upstash/redis/esm/pkg/commands/srandmember.js
var SRandMemberCommand = class extends Command {
  constructor([key, count], opts) {
    const command = ["srandmember", key];
    if (typeof count === "number") {
      command.push(count);
    }
    super(command, opts);
  }
};

// node_modules/.pnpm/@upstash+redis@1.6.1/node_modules/@upstash/redis/esm/pkg/commands/srem.js
var SRemCommand = class extends Command {
  constructor(cmd, opts) {
    super(["srem", ...cmd], opts);
  }
};

// node_modules/.pnpm/@upstash+redis@1.6.1/node_modules/@upstash/redis/esm/pkg/commands/sscan.js
var SScanCommand = class extends Command {
  constructor([key, cursor, opts], cmdOpts) {
    const command = ["sscan", key, cursor];
    if (opts?.match) {
      command.push("match", opts.match);
    }
    if (typeof opts?.count === "number") {
      command.push("count", opts.count);
    }
    super(command, cmdOpts);
  }
};

// node_modules/.pnpm/@upstash+redis@1.6.1/node_modules/@upstash/redis/esm/pkg/commands/strlen.js
var StrLenCommand = class extends Command {
  constructor(cmd, opts) {
    super(["strlen", ...cmd], opts);
  }
};

// node_modules/.pnpm/@upstash+redis@1.6.1/node_modules/@upstash/redis/esm/pkg/commands/sunion.js
var SUnionCommand = class extends Command {
  constructor(cmd, opts) {
    super(["sunion", ...cmd], opts);
  }
};

// node_modules/.pnpm/@upstash+redis@1.6.1/node_modules/@upstash/redis/esm/pkg/commands/sunionstore.js
var SUnionStoreCommand = class extends Command {
  constructor(cmd, opts) {
    super(["sunionstore", ...cmd], opts);
  }
};

// node_modules/.pnpm/@upstash+redis@1.6.1/node_modules/@upstash/redis/esm/pkg/commands/time.js
var TimeCommand = class extends Command {
  constructor(opts) {
    super(["time"], opts);
  }
};

// node_modules/.pnpm/@upstash+redis@1.6.1/node_modules/@upstash/redis/esm/pkg/commands/touch.js
var TouchCommand = class extends Command {
  constructor(cmd, opts) {
    super(["touch", ...cmd], opts);
  }
};

// node_modules/.pnpm/@upstash+redis@1.6.1/node_modules/@upstash/redis/esm/pkg/commands/ttl.js
var TtlCommand = class extends Command {
  constructor(cmd, opts) {
    super(["ttl", ...cmd], opts);
  }
};

// node_modules/.pnpm/@upstash+redis@1.6.1/node_modules/@upstash/redis/esm/pkg/commands/type.js
var TypeCommand = class extends Command {
  constructor(cmd, opts) {
    super(["type", ...cmd], opts);
  }
};

// node_modules/.pnpm/@upstash+redis@1.6.1/node_modules/@upstash/redis/esm/pkg/commands/unlink.js
var UnlinkCommand = class extends Command {
  constructor(cmd, opts) {
    super(["unlink", ...cmd], opts);
  }
};

// node_modules/.pnpm/@upstash+redis@1.6.1/node_modules/@upstash/redis/esm/pkg/commands/zadd.js
var ZAddCommand = class extends Command {
  constructor([key, arg1, ...arg2], opts) {
    const command = ["zadd", key];
    if ("nx" in arg1 && arg1.nx) {
      command.push("nx");
    } else if ("xx" in arg1 && arg1.xx) {
      command.push("xx");
    }
    if ("ch" in arg1 && arg1.ch) {
      command.push("ch");
    }
    if ("incr" in arg1 && arg1.incr) {
      command.push("incr");
    }
    if ("score" in arg1 && "member" in arg1) {
      command.push(arg1.score, arg1.member);
    }
    command.push(...arg2.flatMap(({ score, member }) => [score, member]));
    super(command, opts);
  }
};

// node_modules/.pnpm/@upstash+redis@1.6.1/node_modules/@upstash/redis/esm/pkg/commands/zcard.js
var ZCardCommand = class extends Command {
  constructor(cmd, opts) {
    super(["zcard", ...cmd], opts);
  }
};

// node_modules/.pnpm/@upstash+redis@1.6.1/node_modules/@upstash/redis/esm/pkg/commands/zcount.js
var ZCountCommand = class extends Command {
  constructor(cmd, opts) {
    super(["zcount", ...cmd], opts);
  }
};

// node_modules/.pnpm/@upstash+redis@1.6.1/node_modules/@upstash/redis/esm/pkg/commands/zincrby.js
var ZIncrByCommand = class extends Command {
  constructor(cmd, opts) {
    super(["zincrby", ...cmd], opts);
  }
};

// node_modules/.pnpm/@upstash+redis@1.6.1/node_modules/@upstash/redis/esm/pkg/commands/zinterstore.js
var ZInterStoreCommand = class extends Command {
  constructor([destination, numKeys, keyOrKeys, opts], cmdOpts) {
    const command = ["zinterstore", destination, numKeys];
    if (Array.isArray(keyOrKeys)) {
      command.push(...keyOrKeys);
    } else {
      command.push(keyOrKeys);
    }
    if (opts) {
      if ("weights" in opts && opts.weights) {
        command.push("weights", ...opts.weights);
      } else if ("weight" in opts && typeof opts.weight === "number") {
        command.push("weights", opts.weight);
      }
      if ("aggregate" in opts) {
        command.push("aggregate", opts.aggregate);
      }
    }
    super(command, cmdOpts);
  }
};

// node_modules/.pnpm/@upstash+redis@1.6.1/node_modules/@upstash/redis/esm/pkg/commands/zlexcount.js
var ZLexCountCommand = class extends Command {
  constructor(cmd, opts) {
    super(["zlexcount", ...cmd], opts);
  }
};

// node_modules/.pnpm/@upstash+redis@1.6.1/node_modules/@upstash/redis/esm/pkg/commands/zpopmax.js
var ZPopMaxCommand = class extends Command {
  constructor([key, count], opts) {
    const command = ["zpopmax", key];
    if (typeof count === "number") {
      command.push(count);
    }
    super(command, opts);
  }
};

// node_modules/.pnpm/@upstash+redis@1.6.1/node_modules/@upstash/redis/esm/pkg/commands/zpopmin.js
var ZPopMinCommand = class extends Command {
  constructor([key, count], opts) {
    const command = ["zpopmin", key];
    if (typeof count === "number") {
      command.push(count);
    }
    super(command, opts);
  }
};

// node_modules/.pnpm/@upstash+redis@1.6.1/node_modules/@upstash/redis/esm/pkg/commands/zrange.js
var ZRangeCommand = class extends Command {
  constructor([key, min, max, opts], cmdOpts) {
    const command = ["zrange", key, min, max];
    if (opts?.byScore) {
      command.push("byscore");
    }
    if (opts?.byLex) {
      command.push("bylex");
    }
    if (opts?.withScores) {
      command.push("withscores");
    }
    super(command, cmdOpts);
  }
};

// node_modules/.pnpm/@upstash+redis@1.6.1/node_modules/@upstash/redis/esm/pkg/commands/zrank.js
var ZRankCommand = class extends Command {
  constructor(cmd, opts) {
    super(["zrank", ...cmd], opts);
  }
};

// node_modules/.pnpm/@upstash+redis@1.6.1/node_modules/@upstash/redis/esm/pkg/commands/zrem.js
var ZRemCommand = class extends Command {
  constructor(cmd, opts) {
    super(["zrem", ...cmd], opts);
  }
};

// node_modules/.pnpm/@upstash+redis@1.6.1/node_modules/@upstash/redis/esm/pkg/commands/zremrangebylex.js
var ZRemRangeByLexCommand = class extends Command {
  constructor(cmd, opts) {
    super(["zremrangebylex", ...cmd], opts);
  }
};

// node_modules/.pnpm/@upstash+redis@1.6.1/node_modules/@upstash/redis/esm/pkg/commands/zremrangebyrank.js
var ZRemRangeByRankCommand = class extends Command {
  constructor(cmd, opts) {
    super(["zremrangebyrank", ...cmd], opts);
  }
};

// node_modules/.pnpm/@upstash+redis@1.6.1/node_modules/@upstash/redis/esm/pkg/commands/zremrangebyscore.js
var ZRemRangeByScoreCommand = class extends Command {
  constructor(cmd, opts) {
    super(["zremrangebyscore", ...cmd], opts);
  }
};

// node_modules/.pnpm/@upstash+redis@1.6.1/node_modules/@upstash/redis/esm/pkg/commands/zrevrank.js
var ZRevRankCommand = class extends Command {
  constructor(cmd, opts) {
    super(["zrevrank", ...cmd], opts);
  }
};

// node_modules/.pnpm/@upstash+redis@1.6.1/node_modules/@upstash/redis/esm/pkg/commands/zscan.js
var ZScanCommand = class extends Command {
  constructor([key, cursor, opts], cmdOpts) {
    const command = ["zscan", key, cursor];
    if (opts?.match) {
      command.push("match", opts.match);
    }
    if (typeof opts?.count === "number") {
      command.push("count", opts.count);
    }
    super(command, cmdOpts);
  }
};

// node_modules/.pnpm/@upstash+redis@1.6.1/node_modules/@upstash/redis/esm/pkg/commands/zscore.js
var ZScoreCommand = class extends Command {
  constructor(cmd, opts) {
    super(["zscore", ...cmd], opts);
  }
};

// node_modules/.pnpm/@upstash+redis@1.6.1/node_modules/@upstash/redis/esm/pkg/commands/zunionstore.js
var ZUnionStoreCommand = class extends Command {
  constructor([destination, numKeys, keyOrKeys, opts], cmdOpts) {
    const command = ["zunionstore", destination, numKeys];
    if (Array.isArray(keyOrKeys)) {
      command.push(...keyOrKeys);
    } else {
      command.push(keyOrKeys);
    }
    if (opts) {
      if ("weights" in opts && opts.weights) {
        command.push("weights", ...opts.weights);
      } else if ("weight" in opts && typeof opts.weight === "number") {
        command.push("weights", opts.weight);
      }
      if ("aggregate" in opts) {
        command.push("aggregate", opts.aggregate);
      }
    }
    super(command, cmdOpts);
  }
};

// node_modules/.pnpm/@upstash+redis@1.6.1/node_modules/@upstash/redis/esm/pkg/pipeline.js
var Pipeline = class {
  constructor(client, commandOptions) {
    Object.defineProperty(this, "client", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "commands", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "commandOptions", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "exec", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: async () => {
        if (this.commands.length === 0) {
          throw new Error("Pipeline is empty");
        }
        const res = await this.client.request({
          path: ["pipeline"],
          body: Object.values(this.commands).map((c) => c.command)
        });
        return res.map(({ error, result }, i) => {
          if (error) {
            throw new UpstashError(`Command ${i + 1} [ ${this.commands[i].command[0]} ] failed: ${error}`);
          }
          return this.commands[i].deserialize(result);
        });
      }
    });
    Object.defineProperty(this, "append", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => this.chain(new AppendCommand(args, this.commandOptions))
    });
    Object.defineProperty(this, "bitcount", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => this.chain(new BitCountCommand(args, this.commandOptions))
    });
    Object.defineProperty(this, "bitop", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (op, destinationKey, sourceKey, ...sourceKeys) => this.chain(new BitOpCommand([op, destinationKey, sourceKey, ...sourceKeys], this.commandOptions))
    });
    Object.defineProperty(this, "bitpos", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => this.chain(new BitPosCommand(args, this.commandOptions))
    });
    Object.defineProperty(this, "dbsize", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: () => this.chain(new DBSizeCommand(this.commandOptions))
    });
    Object.defineProperty(this, "decr", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => this.chain(new DecrCommand(args, this.commandOptions))
    });
    Object.defineProperty(this, "decrby", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => this.chain(new DecrByCommand(args, this.commandOptions))
    });
    Object.defineProperty(this, "del", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => this.chain(new DelCommand(args, this.commandOptions))
    });
    Object.defineProperty(this, "echo", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => this.chain(new EchoCommand(args, this.commandOptions))
    });
    Object.defineProperty(this, "eval", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => this.chain(new EvalCommand(args, this.commandOptions))
    });
    Object.defineProperty(this, "evalsha", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => this.chain(new EvalshaCommand(args, this.commandOptions))
    });
    Object.defineProperty(this, "exists", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => this.chain(new ExistsCommand(args, this.commandOptions))
    });
    Object.defineProperty(this, "expire", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => this.chain(new ExpireCommand(args, this.commandOptions))
    });
    Object.defineProperty(this, "expireat", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => this.chain(new ExpireAtCommand(args, this.commandOptions))
    });
    Object.defineProperty(this, "flushall", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (args) => this.chain(new FlushAllCommand(args, this.commandOptions))
    });
    Object.defineProperty(this, "flushdb", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => this.chain(new FlushDBCommand(args, this.commandOptions))
    });
    Object.defineProperty(this, "get", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => this.chain(new GetCommand(args, this.commandOptions))
    });
    Object.defineProperty(this, "getbit", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => this.chain(new GetBitCommand(args, this.commandOptions))
    });
    Object.defineProperty(this, "getrange", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => this.chain(new GetRangeCommand(args, this.commandOptions))
    });
    Object.defineProperty(this, "getset", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (key, value) => this.chain(new GetSetCommand([key, value], this.commandOptions))
    });
    Object.defineProperty(this, "hdel", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => this.chain(new HDelCommand(args, this.commandOptions))
    });
    Object.defineProperty(this, "hexists", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => this.chain(new HExistsCommand(args, this.commandOptions))
    });
    Object.defineProperty(this, "hget", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => this.chain(new HGetCommand(args, this.commandOptions))
    });
    Object.defineProperty(this, "hgetall", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => this.chain(new HGetAllCommand(args, this.commandOptions))
    });
    Object.defineProperty(this, "hincrby", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => this.chain(new HIncrByCommand(args, this.commandOptions))
    });
    Object.defineProperty(this, "hincrbyfloat", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => this.chain(new HIncrByFloatCommand(args, this.commandOptions))
    });
    Object.defineProperty(this, "hkeys", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => this.chain(new HKeysCommand(args, this.commandOptions))
    });
    Object.defineProperty(this, "hlen", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => this.chain(new HLenCommand(args, this.commandOptions))
    });
    Object.defineProperty(this, "hmget", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => this.chain(new HMGetCommand(args, this.commandOptions))
    });
    Object.defineProperty(this, "hmset", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (key, kv) => this.chain(new HMSetCommand([key, kv], this.commandOptions))
    });
    Object.defineProperty(this, "hscan", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => this.chain(new HScanCommand(args, this.commandOptions))
    });
    Object.defineProperty(this, "hset", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (key, kv) => this.chain(new HSetCommand([key, kv], this.commandOptions))
    });
    Object.defineProperty(this, "hsetnx", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (key, field, value) => this.chain(new HSetNXCommand([key, field, value], this.commandOptions))
    });
    Object.defineProperty(this, "hstrlen", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => this.chain(new HStrLenCommand(args, this.commandOptions))
    });
    Object.defineProperty(this, "hvals", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => this.chain(new HValsCommand(args, this.commandOptions))
    });
    Object.defineProperty(this, "incr", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => this.chain(new IncrCommand(args, this.commandOptions))
    });
    Object.defineProperty(this, "incrby", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => this.chain(new IncrByCommand(args, this.commandOptions))
    });
    Object.defineProperty(this, "incrbyfloat", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => this.chain(new IncrByFloatCommand(args, this.commandOptions))
    });
    Object.defineProperty(this, "keys", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => this.chain(new KeysCommand(args, this.commandOptions))
    });
    Object.defineProperty(this, "lindex", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => this.chain(new LIndexCommand(args, this.commandOptions))
    });
    Object.defineProperty(this, "linsert", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (key, direction, pivot, value) => this.chain(new LInsertCommand([key, direction, pivot, value], this.commandOptions))
    });
    Object.defineProperty(this, "llen", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => this.chain(new LLenCommand(args, this.commandOptions))
    });
    Object.defineProperty(this, "lpop", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => this.chain(new LPopCommand(args, this.commandOptions))
    });
    Object.defineProperty(this, "lpush", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (key, ...elements) => this.chain(new LPushCommand([key, ...elements], this.commandOptions))
    });
    Object.defineProperty(this, "lpushx", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (key, ...elements) => this.chain(new LPushXCommand([key, ...elements], this.commandOptions))
    });
    Object.defineProperty(this, "lrange", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => this.chain(new LRangeCommand(args, this.commandOptions))
    });
    Object.defineProperty(this, "lrem", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (key, count, value) => this.chain(new LRemCommand([key, count, value], this.commandOptions))
    });
    Object.defineProperty(this, "lset", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (key, index, value) => this.chain(new LSetCommand([key, index, value], this.commandOptions))
    });
    Object.defineProperty(this, "ltrim", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => this.chain(new LTrimCommand(args, this.commandOptions))
    });
    Object.defineProperty(this, "mget", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => this.chain(new MGetCommand(args, this.commandOptions))
    });
    Object.defineProperty(this, "mset", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (kv) => this.chain(new MSetCommand([kv], this.commandOptions))
    });
    Object.defineProperty(this, "msetnx", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (kv) => this.chain(new MSetNXCommand([kv], this.commandOptions))
    });
    Object.defineProperty(this, "persist", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => this.chain(new PersistCommand(args, this.commandOptions))
    });
    Object.defineProperty(this, "pexpire", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => this.chain(new PExpireCommand(args, this.commandOptions))
    });
    Object.defineProperty(this, "pexpireat", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => this.chain(new PExpireAtCommand(args, this.commandOptions))
    });
    Object.defineProperty(this, "ping", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (args) => this.chain(new PingCommand(args, this.commandOptions))
    });
    Object.defineProperty(this, "psetex", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (key, ttl, value) => this.chain(new PSetEXCommand([key, ttl, value], this.commandOptions))
    });
    Object.defineProperty(this, "pttl", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => this.chain(new PTtlCommand(args, this.commandOptions))
    });
    Object.defineProperty(this, "publish", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => this.chain(new PublishCommand(args, this.commandOptions))
    });
    Object.defineProperty(this, "randomkey", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: () => this.chain(new RandomKeyCommand(this.commandOptions))
    });
    Object.defineProperty(this, "rename", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => this.chain(new RenameCommand(args, this.commandOptions))
    });
    Object.defineProperty(this, "renamenx", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => this.chain(new RenameNXCommand(args, this.commandOptions))
    });
    Object.defineProperty(this, "rpop", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => this.chain(new RPopCommand(args, this.commandOptions))
    });
    Object.defineProperty(this, "rpush", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (key, ...elements) => this.chain(new RPushCommand([key, ...elements], this.commandOptions))
    });
    Object.defineProperty(this, "rpushx", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (key, ...elements) => this.chain(new RPushXCommand([key, ...elements], this.commandOptions))
    });
    Object.defineProperty(this, "sadd", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (key, ...members) => this.chain(new SAddCommand([key, ...members], this.commandOptions))
    });
    Object.defineProperty(this, "scan", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => this.chain(new ScanCommand(args, this.commandOptions))
    });
    Object.defineProperty(this, "scard", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => this.chain(new SCardCommand(args, this.commandOptions))
    });
    Object.defineProperty(this, "scriptExists", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => this.chain(new ScriptExistsCommand(args, this.commandOptions))
    });
    Object.defineProperty(this, "scriptFlush", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => this.chain(new ScriptFlushCommand(args, this.commandOptions))
    });
    Object.defineProperty(this, "scriptLoad", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => this.chain(new ScriptLoadCommand(args, this.commandOptions))
    });
    Object.defineProperty(this, "sdiff", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => this.chain(new SDiffCommand(args, this.commandOptions))
    });
    Object.defineProperty(this, "sdiffstore", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => this.chain(new SDiffStoreCommand(args, this.commandOptions))
    });
    Object.defineProperty(this, "set", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (key, value, opts) => this.chain(new SetCommand([key, value, opts], this.commandOptions))
    });
    Object.defineProperty(this, "setbit", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => this.chain(new SetBitCommand(args, this.commandOptions))
    });
    Object.defineProperty(this, "setex", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (key, ttl, value) => this.chain(new SetExCommand([key, ttl, value], this.commandOptions))
    });
    Object.defineProperty(this, "setnx", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (key, value) => this.chain(new SetNxCommand([key, value], this.commandOptions))
    });
    Object.defineProperty(this, "setrange", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => this.chain(new SetRangeCommand(args, this.commandOptions))
    });
    Object.defineProperty(this, "sinter", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => this.chain(new SInterCommand(args, this.commandOptions))
    });
    Object.defineProperty(this, "sinterstore", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => this.chain(new SInterStoreCommand(args, this.commandOptions))
    });
    Object.defineProperty(this, "sismember", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (key, member) => this.chain(new SIsMemberCommand([key, member], this.commandOptions))
    });
    Object.defineProperty(this, "smembers", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => this.chain(new SMembersCommand(args, this.commandOptions))
    });
    Object.defineProperty(this, "smove", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (source, destination, member) => this.chain(new SMoveCommand([source, destination, member], this.commandOptions))
    });
    Object.defineProperty(this, "spop", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => this.chain(new SPopCommand(args, this.commandOptions))
    });
    Object.defineProperty(this, "srandmember", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => this.chain(new SRandMemberCommand(args, this.commandOptions))
    });
    Object.defineProperty(this, "srem", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (key, ...members) => this.chain(new SRemCommand([key, ...members], this.commandOptions))
    });
    Object.defineProperty(this, "sscan", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => this.chain(new SScanCommand(args, this.commandOptions))
    });
    Object.defineProperty(this, "strlen", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => this.chain(new StrLenCommand(args, this.commandOptions))
    });
    Object.defineProperty(this, "sunion", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => this.chain(new SUnionCommand(args, this.commandOptions))
    });
    Object.defineProperty(this, "sunionstore", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => this.chain(new SUnionStoreCommand(args, this.commandOptions))
    });
    Object.defineProperty(this, "time", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: () => this.chain(new TimeCommand(this.commandOptions))
    });
    Object.defineProperty(this, "touch", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => this.chain(new TouchCommand(args, this.commandOptions))
    });
    Object.defineProperty(this, "ttl", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => this.chain(new TtlCommand(args, this.commandOptions))
    });
    Object.defineProperty(this, "type", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => this.chain(new TypeCommand(args, this.commandOptions))
    });
    Object.defineProperty(this, "unlink", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => this.chain(new UnlinkCommand(args, this.commandOptions))
    });
    Object.defineProperty(this, "zadd", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => {
        if ("score" in args[1]) {
          return this.chain(new ZAddCommand([args[0], args[1], ...args.slice(2)], this.commandOptions));
        }
        return this.chain(new ZAddCommand([args[0], args[1], ...args.slice(2)], this.commandOptions));
      }
    });
    Object.defineProperty(this, "zcard", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => this.chain(new ZCardCommand(args, this.commandOptions))
    });
    Object.defineProperty(this, "zcount", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => this.chain(new ZCountCommand(args, this.commandOptions))
    });
    Object.defineProperty(this, "zincrby", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (key, increment, member) => this.chain(new ZIncrByCommand([key, increment, member], this.commandOptions))
    });
    Object.defineProperty(this, "zinterstore", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => this.chain(new ZInterStoreCommand(args, this.commandOptions))
    });
    Object.defineProperty(this, "zlexcount", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => this.chain(new ZLexCountCommand(args, this.commandOptions))
    });
    Object.defineProperty(this, "zpopmax", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => this.chain(new ZPopMaxCommand(args, this.commandOptions))
    });
    Object.defineProperty(this, "zpopmin", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => this.chain(new ZPopMinCommand(args, this.commandOptions))
    });
    Object.defineProperty(this, "zrange", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => this.chain(new ZRangeCommand(args, this.commandOptions))
    });
    Object.defineProperty(this, "zrank", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (key, member) => this.chain(new ZRankCommand([key, member], this.commandOptions))
    });
    Object.defineProperty(this, "zrem", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (key, ...members) => this.chain(new ZRemCommand([key, ...members], this.commandOptions))
    });
    Object.defineProperty(this, "zremrangebylex", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => this.chain(new ZRemRangeByLexCommand(args, this.commandOptions))
    });
    Object.defineProperty(this, "zremrangebyrank", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => this.chain(new ZRemRangeByRankCommand(args, this.commandOptions))
    });
    Object.defineProperty(this, "zremrangebyscore", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => this.chain(new ZRemRangeByScoreCommand(args, this.commandOptions))
    });
    Object.defineProperty(this, "zrevrank", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (key, member) => this.chain(new ZRevRankCommand([key, member], this.commandOptions))
    });
    Object.defineProperty(this, "zscan", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => this.chain(new ZScanCommand(args, this.commandOptions))
    });
    Object.defineProperty(this, "zscore", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (key, member) => this.chain(new ZScoreCommand([key, member], this.commandOptions))
    });
    Object.defineProperty(this, "zunionstore", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => this.chain(new ZUnionStoreCommand(args, this.commandOptions))
    });
    this.client = client;
    this.commands = [];
    this.commandOptions = commandOptions;
  }
  chain(command) {
    this.commands.push(command);
    return this;
  }
};

// node_modules/.pnpm/@upstash+redis@1.6.1/node_modules/@upstash/redis/esm/pkg/redis.js
var Redis = class {
  constructor(client, opts) {
    Object.defineProperty(this, "client", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "opts", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "pipeline", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: () => new Pipeline(this.client, this.opts)
    });
    Object.defineProperty(this, "append", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => new AppendCommand(args, this.opts).exec(this.client)
    });
    Object.defineProperty(this, "bitcount", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => new BitCountCommand(args, this.opts).exec(this.client)
    });
    Object.defineProperty(this, "bitop", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (op, destinationKey, sourceKey, ...sourceKeys) => new BitOpCommand([op, destinationKey, sourceKey, ...sourceKeys], this.opts).exec(this.client)
    });
    Object.defineProperty(this, "bitpos", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => new BitPosCommand(args, this.opts).exec(this.client)
    });
    Object.defineProperty(this, "dbsize", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: () => new DBSizeCommand(this.opts).exec(this.client)
    });
    Object.defineProperty(this, "decr", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => new DecrCommand(args, this.opts).exec(this.client)
    });
    Object.defineProperty(this, "decrby", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => new DecrByCommand(args, this.opts).exec(this.client)
    });
    Object.defineProperty(this, "del", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => new DelCommand(args, this.opts).exec(this.client)
    });
    Object.defineProperty(this, "echo", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => new EchoCommand(args, this.opts).exec(this.client)
    });
    Object.defineProperty(this, "eval", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => new EvalCommand(args, this.opts).exec(this.client)
    });
    Object.defineProperty(this, "evalsha", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => new EvalshaCommand(args, this.opts).exec(this.client)
    });
    Object.defineProperty(this, "exists", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => new ExistsCommand(args, this.opts).exec(this.client)
    });
    Object.defineProperty(this, "expire", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => new ExpireCommand(args, this.opts).exec(this.client)
    });
    Object.defineProperty(this, "expireat", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => new ExpireAtCommand(args, this.opts).exec(this.client)
    });
    Object.defineProperty(this, "flushall", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (args) => new FlushAllCommand(args, this.opts).exec(this.client)
    });
    Object.defineProperty(this, "flushdb", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => new FlushDBCommand(args, this.opts).exec(this.client)
    });
    Object.defineProperty(this, "get", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => new GetCommand(args, this.opts).exec(this.client)
    });
    Object.defineProperty(this, "getbit", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => new GetBitCommand(args, this.opts).exec(this.client)
    });
    Object.defineProperty(this, "getrange", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => new GetRangeCommand(args, this.opts).exec(this.client)
    });
    Object.defineProperty(this, "getset", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (key, value) => new GetSetCommand([key, value], this.opts).exec(this.client)
    });
    Object.defineProperty(this, "hdel", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => new HDelCommand(args, this.opts).exec(this.client)
    });
    Object.defineProperty(this, "hexists", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => new HExistsCommand(args, this.opts).exec(this.client)
    });
    Object.defineProperty(this, "hget", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => new HGetCommand(args, this.opts).exec(this.client)
    });
    Object.defineProperty(this, "hgetall", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => new HGetAllCommand(args, this.opts).exec(this.client)
    });
    Object.defineProperty(this, "hincrby", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => new HIncrByCommand(args, this.opts).exec(this.client)
    });
    Object.defineProperty(this, "hincrbyfloat", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => new HIncrByFloatCommand(args, this.opts).exec(this.client)
    });
    Object.defineProperty(this, "hkeys", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => new HKeysCommand(args, this.opts).exec(this.client)
    });
    Object.defineProperty(this, "hlen", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => new HLenCommand(args, this.opts).exec(this.client)
    });
    Object.defineProperty(this, "hmget", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => new HMGetCommand(args, this.opts).exec(this.client)
    });
    Object.defineProperty(this, "hmset", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (key, kv) => new HMSetCommand([key, kv], this.opts).exec(this.client)
    });
    Object.defineProperty(this, "hscan", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => new HScanCommand(args, this.opts).exec(this.client)
    });
    Object.defineProperty(this, "hset", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (key, kv) => new HSetCommand([key, kv], this.opts).exec(this.client)
    });
    Object.defineProperty(this, "hsetnx", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (key, field, value) => new HSetNXCommand([key, field, value], this.opts).exec(this.client)
    });
    Object.defineProperty(this, "hstrlen", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => new HStrLenCommand(args, this.opts).exec(this.client)
    });
    Object.defineProperty(this, "hvals", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => new HValsCommand(args, this.opts).exec(this.client)
    });
    Object.defineProperty(this, "incr", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => new IncrCommand(args, this.opts).exec(this.client)
    });
    Object.defineProperty(this, "incrby", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => new IncrByCommand(args, this.opts).exec(this.client)
    });
    Object.defineProperty(this, "incrbyfloat", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => new IncrByFloatCommand(args, this.opts).exec(this.client)
    });
    Object.defineProperty(this, "keys", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => new KeysCommand(args, this.opts).exec(this.client)
    });
    Object.defineProperty(this, "lindex", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => new LIndexCommand(args, this.opts).exec(this.client)
    });
    Object.defineProperty(this, "linsert", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (key, direction, pivot, value) => new LInsertCommand([key, direction, pivot, value], this.opts).exec(this.client)
    });
    Object.defineProperty(this, "llen", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => new LLenCommand(args, this.opts).exec(this.client)
    });
    Object.defineProperty(this, "lpop", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => new LPopCommand(args, this.opts).exec(this.client)
    });
    Object.defineProperty(this, "lpush", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (key, ...elements) => new LPushCommand([key, ...elements], this.opts).exec(this.client)
    });
    Object.defineProperty(this, "lpushx", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (key, ...elements) => new LPushXCommand([key, ...elements], this.opts).exec(this.client)
    });
    Object.defineProperty(this, "lrange", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => new LRangeCommand(args, this.opts).exec(this.client)
    });
    Object.defineProperty(this, "lrem", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (key, count, value) => new LRemCommand([key, count, value], this.opts).exec(this.client)
    });
    Object.defineProperty(this, "lset", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (key, index, value) => new LSetCommand([key, index, value], this.opts).exec(this.client)
    });
    Object.defineProperty(this, "ltrim", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => new LTrimCommand(args, this.opts).exec(this.client)
    });
    Object.defineProperty(this, "mget", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => new MGetCommand(args, this.opts).exec(this.client)
    });
    Object.defineProperty(this, "mset", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (kv) => new MSetCommand([kv], this.opts).exec(this.client)
    });
    Object.defineProperty(this, "msetnx", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (kv) => new MSetNXCommand([kv], this.opts).exec(this.client)
    });
    Object.defineProperty(this, "persist", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => new PersistCommand(args, this.opts).exec(this.client)
    });
    Object.defineProperty(this, "pexpire", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => new PExpireCommand(args, this.opts).exec(this.client)
    });
    Object.defineProperty(this, "pexpireat", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => new PExpireAtCommand(args, this.opts).exec(this.client)
    });
    Object.defineProperty(this, "ping", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (args) => new PingCommand(args, this.opts).exec(this.client)
    });
    Object.defineProperty(this, "psetex", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (key, ttl, value) => new PSetEXCommand([key, ttl, value], this.opts).exec(this.client)
    });
    Object.defineProperty(this, "pttl", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => new PTtlCommand(args, this.opts).exec(this.client)
    });
    Object.defineProperty(this, "publish", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => new PublishCommand(args, this.opts).exec(this.client)
    });
    Object.defineProperty(this, "randomkey", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: () => new RandomKeyCommand().exec(this.client)
    });
    Object.defineProperty(this, "rename", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => new RenameCommand(args, this.opts).exec(this.client)
    });
    Object.defineProperty(this, "renamenx", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => new RenameNXCommand(args, this.opts).exec(this.client)
    });
    Object.defineProperty(this, "rpop", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => new RPopCommand(args, this.opts).exec(this.client)
    });
    Object.defineProperty(this, "rpush", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (key, ...elements) => new RPushCommand([key, ...elements], this.opts).exec(this.client)
    });
    Object.defineProperty(this, "rpushx", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (key, ...elements) => new RPushXCommand([key, ...elements], this.opts).exec(this.client)
    });
    Object.defineProperty(this, "sadd", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (key, ...members) => new SAddCommand([key, ...members], this.opts).exec(this.client)
    });
    Object.defineProperty(this, "scan", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => new ScanCommand(args, this.opts).exec(this.client)
    });
    Object.defineProperty(this, "scard", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => new SCardCommand(args, this.opts).exec(this.client)
    });
    Object.defineProperty(this, "scriptExists", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => new ScriptExistsCommand(args, this.opts).exec(this.client)
    });
    Object.defineProperty(this, "scriptFlush", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => new ScriptFlushCommand(args, this.opts).exec(this.client)
    });
    Object.defineProperty(this, "scriptLoad", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => new ScriptLoadCommand(args, this.opts).exec(this.client)
    });
    Object.defineProperty(this, "sdiff", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => new SDiffCommand(args, this.opts).exec(this.client)
    });
    Object.defineProperty(this, "sdiffstore", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => new SDiffStoreCommand(args, this.opts).exec(this.client)
    });
    Object.defineProperty(this, "set", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (key, value, opts2) => new SetCommand([key, value, opts2], this.opts).exec(this.client)
    });
    Object.defineProperty(this, "setbit", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => new SetBitCommand(args, this.opts).exec(this.client)
    });
    Object.defineProperty(this, "setex", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (key, ttl, value) => new SetExCommand([key, ttl, value], this.opts).exec(this.client)
    });
    Object.defineProperty(this, "setnx", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (key, value) => new SetNxCommand([key, value], this.opts).exec(this.client)
    });
    Object.defineProperty(this, "setrange", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => new SetRangeCommand(args, this.opts).exec(this.client)
    });
    Object.defineProperty(this, "sinter", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => new SInterCommand(args, this.opts).exec(this.client)
    });
    Object.defineProperty(this, "sinterstore", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => new SInterStoreCommand(args, this.opts).exec(this.client)
    });
    Object.defineProperty(this, "sismember", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (key, member) => new SIsMemberCommand([key, member], this.opts).exec(this.client)
    });
    Object.defineProperty(this, "smembers", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => new SMembersCommand(args, this.opts).exec(this.client)
    });
    Object.defineProperty(this, "smove", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (source, destination, member) => new SMoveCommand([source, destination, member], this.opts).exec(this.client)
    });
    Object.defineProperty(this, "spop", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => new SPopCommand(args, this.opts).exec(this.client)
    });
    Object.defineProperty(this, "srandmember", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => new SRandMemberCommand(args, this.opts).exec(this.client)
    });
    Object.defineProperty(this, "srem", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (key, ...members) => new SRemCommand([key, ...members], this.opts).exec(this.client)
    });
    Object.defineProperty(this, "sscan", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => new SScanCommand(args, this.opts).exec(this.client)
    });
    Object.defineProperty(this, "strlen", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => new StrLenCommand(args, this.opts).exec(this.client)
    });
    Object.defineProperty(this, "sunion", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => new SUnionCommand(args, this.opts).exec(this.client)
    });
    Object.defineProperty(this, "sunionstore", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => new SUnionStoreCommand(args, this.opts).exec(this.client)
    });
    Object.defineProperty(this, "time", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: () => new TimeCommand().exec(this.client)
    });
    Object.defineProperty(this, "touch", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => new TouchCommand(args, this.opts).exec(this.client)
    });
    Object.defineProperty(this, "ttl", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => new TtlCommand(args, this.opts).exec(this.client)
    });
    Object.defineProperty(this, "type", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => new TypeCommand(args, this.opts).exec(this.client)
    });
    Object.defineProperty(this, "unlink", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => new UnlinkCommand(args, this.opts).exec(this.client)
    });
    Object.defineProperty(this, "zadd", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => {
        if ("score" in args[1]) {
          return new ZAddCommand([args[0], args[1], ...args.slice(2)], this.opts).exec(this.client);
        }
        return new ZAddCommand([args[0], args[1], ...args.slice(2)], this.opts).exec(this.client);
      }
    });
    Object.defineProperty(this, "zcard", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => new ZCardCommand(args, this.opts).exec(this.client)
    });
    Object.defineProperty(this, "zcount", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => new ZCountCommand(args, this.opts).exec(this.client)
    });
    Object.defineProperty(this, "zincrby", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (key, increment, member) => new ZIncrByCommand([key, increment, member], this.opts).exec(this.client)
    });
    Object.defineProperty(this, "zinterstore", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => new ZInterStoreCommand(args, this.opts).exec(this.client)
    });
    Object.defineProperty(this, "zlexcount", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => new ZLexCountCommand(args, this.opts).exec(this.client)
    });
    Object.defineProperty(this, "zpopmax", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => new ZPopMaxCommand(args, this.opts).exec(this.client)
    });
    Object.defineProperty(this, "zpopmin", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => new ZPopMinCommand(args, this.opts).exec(this.client)
    });
    Object.defineProperty(this, "zrange", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => new ZRangeCommand(args, this.opts).exec(this.client)
    });
    Object.defineProperty(this, "zrank", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (key, member) => new ZRankCommand([key, member], this.opts).exec(this.client)
    });
    Object.defineProperty(this, "zrem", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (key, ...members) => new ZRemCommand([key, ...members], this.opts).exec(this.client)
    });
    Object.defineProperty(this, "zremrangebylex", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => new ZRemRangeByLexCommand(args, this.opts).exec(this.client)
    });
    Object.defineProperty(this, "zremrangebyrank", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => new ZRemRangeByRankCommand(args, this.opts).exec(this.client)
    });
    Object.defineProperty(this, "zremrangebyscore", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => new ZRemRangeByScoreCommand(args, this.opts).exec(this.client)
    });
    Object.defineProperty(this, "zrevrank", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (key, member) => new ZRevRankCommand([key, member], this.opts).exec(this.client)
    });
    Object.defineProperty(this, "zscan", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => new ZScanCommand(args, this.opts).exec(this.client)
    });
    Object.defineProperty(this, "zscore", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (key, member) => new ZScoreCommand([key, member], this.opts).exec(this.client)
    });
    Object.defineProperty(this, "zunionstore", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: (...args) => new ZUnionStoreCommand(args, this.opts).exec(this.client)
    });
    this.client = client;
    this.opts = opts;
  }
};

// node_modules/.pnpm/@upstash+redis@1.6.1/node_modules/@upstash/redis/esm/pkg/http.js
var HttpClient = class {
  constructor(config) {
    Object.defineProperty(this, "baseUrl", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "headers", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "options", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "retry", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this.baseUrl = config.baseUrl.replace(/\/$/, "");
    this.headers = { "Content-Type": "application/json", ...config.headers };
    this.options = { backend: config.options?.backend };
    if (typeof config?.retry === "boolean" && config?.retry === false) {
      this.retry = {
        attempts: 1,
        backoff: () => 0
      };
    } else {
      this.retry = {
        attempts: config?.retry?.retries ?? 5,
        backoff: config?.retry?.backoff ?? ((retryCount) => Math.exp(retryCount) * 50)
      };
    }
  }
  async request(req) {
    const requestOptions = {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(req.body),
      keepalive: true,
      backend: this.options?.backend
    };
    let res = null;
    let error = null;
    for (let i = 0; i <= this.retry.attempts; i++) {
      try {
        res = await fetch([this.baseUrl, ...req.path ?? []].join("/"), requestOptions);
        break;
      } catch (err) {
        error = err;
        await new Promise((r) => setTimeout(r, this.retry.backoff(i)));
      }
    }
    if (!res) {
      throw error ?? new Error("Exhausted all retries");
    }
    const body = await res.json();
    if (!res.ok) {
      throw new UpstashError(body.error);
    }
    return body;
  }
};

// node_modules/.pnpm/@upstash+redis@1.6.1/node_modules/@upstash/redis/esm/platforms/nodejs.js
var Redis2 = class extends Redis {
  constructor(configOrRequester) {
    if ("request" in configOrRequester) {
      super(configOrRequester);
      return;
    }
    if (configOrRequester.url.startsWith(" ") || configOrRequester.url.endsWith(" ") || /\r|\n/.test(configOrRequester.url)) {
      console.warn("The redis url contains whitespace or newline, which can cause errors!");
    }
    if (configOrRequester.token.startsWith(" ") || configOrRequester.token.endsWith(" ") || /\r|\n/.test(configOrRequester.token)) {
      console.warn("The redis token contains whitespace or newline, which can cause errors!");
    }
    const client = new HttpClient({
      baseUrl: configOrRequester.url,
      retry: configOrRequester.retry,
      headers: { authorization: `Bearer ${configOrRequester.token}` }
    });
    super(client, {
      automaticDeserialization: configOrRequester.automaticDeserialization
    });
  }
  static fromEnv(config) {
    if (typeof process?.env === "undefined") {
      throw new Error('Unable to get environment variables, `process.env` is undefined. If you are deploying to cloudflare, please import from "@upstash/redis/cloudflare" instead');
    }
    const url = process?.env["UPSTASH_REDIS_REST_URL"];
    if (!url) {
      throw new Error("Unable to find environment variable: `UPSTASH_REDIS_REST_URL`");
    }
    const token = process?.env["UPSTASH_REDIS_REST_TOKEN"];
    if (!token) {
      throw new Error("Unable to find environment variable: `UPSTASH_REDIS_REST_TOKEN`");
    }
    return new Redis2({ ...config, url, token });
  }
};

// src/api/posts/[postId].ts
async function postId_default(req, res) {
  let prisma;
  switch (req.method) {
    case "GET":
      const redis = Redis2.fromEnv();
      let post = await redis.get("post-" + req.params.postId);
      if (post) {
        res.status(200).json(post);
        return;
      }
      if (!post) {
        prisma = new import_client.PrismaClient();
        post = await prisma.post.findUnique({
          where: { id: +req.params.postId },
          include: { author: true }
        });
        if (post) {
          res.status(200).json(post);
        } else {
          res.status(404).json({ error: "Post not found." });
        }
        await redis.set("post-" + req.params.postId, JSON.stringify(post));
        await prisma.$disconnect();
      }
      break;
    default:
      res.status(405).json({ error: "Method not allowed" });
  }
}

// src/.umi/api/posts/[postId].ts
var import_apiRoute = __toESM(require_apiRoute());
var apiRoutes = [{ "path": "posts/[postId]", "id": "posts/[postId]", "file": "posts/[postId].ts", "absPath": "/posts/[postId]", "__content": `import type { UmiApiRequest, UmiApiResponse } from "umi";\r
import { PrismaClient } from '@prisma/client';\r
import { Redis } from "@upstash/redis";\r
\r
export default async function (req: UmiApiRequest, res: UmiApiResponse) {\r
  let prisma: PrismaClient;\r
  switch (req.method) {\r
    case 'GET':\r
      const redis = Redis.fromEnv();\r
      let post = await redis.get('post-' + req.params.postId);\r
      if (post) {\r
        res.status(200).json(post);\r
        return;\r
      }\r
      if (!post) {\r
        prisma = new PrismaClient();\r
        post = await prisma.post.findUnique({\r
          where: { id: +req.params.postId },\r
          include: { author: true }\r
        });\r
        if (post) {\r
          res.status(200).json(post);\r
        } else {\r
          res.status(404).json({ error: 'Post not found.' });\r
        }\r
        await redis.set('post-' + req.params.postId, JSON.stringify(post));\r
        await prisma.$disconnect();\r
      }\r
      break;\r
    default:\r
      res.status(405).json({ error: 'Method not allowed' })\r
  }\r
}` }, { "path": "posts", "id": "posts/index", "file": "posts/index.ts", "absPath": "/posts", "__content": `import type { UmiApiRequest, UmiApiResponse } from "umi";\r
import { PrismaClient } from '@prisma/client'\r
import { verifyToken } from "../../../utils/jwt";\r
\r
export default async function (req: UmiApiRequest, res: UmiApiResponse) {\r
  let prisma: PrismaClient;\r
  switch (req.method) {\r
    case 'GET':\r
      prisma = new PrismaClient();\r
      const allPosts = await prisma.post.findMany({ include: { author: true } });\r
      res.status(200).json(allPosts);\r
      await prisma.$disconnect()\r
      break;\r
\r
    case 'POST':\r
      if (!req.cookies?.token) {\r
        return res.status(401).json({\r
          message: 'Unauthorized'\r
        })\r
      }\r
      const authorId = (await verifyToken(req.cookies.token)).id;\r
      prisma = new PrismaClient();\r
      const newPost = await prisma.post.create({\r
        data: {\r
          title: req.body.title,\r
          content: req.body.content,\r
          createdAt: new Date(),\r
          authorId,\r
          tags: req.body.tags.join(','),\r
          imageUrl: req.body.imageUrl\r
        }\r
      })\r
      res.status(200).json(newPost);\r
      await prisma.$disconnect()\r
      break;\r
    default:\r
      res.status(405).json({ error: 'Method not allowed' })\r
  }\r
}` }, { "path": "register", "id": "register", "file": "register.ts", "absPath": "/register", "__content": `import type { UmiApiRequest, UmiApiResponse } from "umi";\r
import { PrismaClient } from '@prisma/client'\r
import bcrypt from 'bcryptjs'\r
import { signToken } from "../../utils/jwt";\r
\r
export default async function (req: UmiApiRequest, res: UmiApiResponse) {\r
  switch (req.method) {\r
\r
    // \u5982\u679C\u5BF9\u8FD9\u4E2A\u8DEF\u5F84\u53D1\u8D77 POST \u8BF7\u6C42\uFF0C\u4EE3\u8868\u4ED6\u60F3\u8981\u6CE8\u518C\u4E00\u4E2A\u8D26\u53F7\r
    case 'POST':\r
      try {\r
\r
        // \u5EFA\u7ACB\u4E00\u4E2A Prisma \u5BA2\u6237\u7AEF\uFF0C\u4ED6\u53EF\u4EE5\u5E2E\u52A9\u6211\u4EEC\u8FDE\u7EBF\u5230\u6570\u636E\u5E93\r
        const prisma = new PrismaClient();\r
\r
        // \u5728\u6570\u636E\u5E93\u7684 User \u8868\u4E2D\u5EFA\u7ACB\u4E00\u4E2A\u65B0\u7684\u6570\u636E\r
        const user = await prisma.user.create({\r
          data: {\r
            email: req.body.email,\r
\r
            // \u5BC6\u7801\u662F\u7ECF\u8FC7 bcrypt \u52A0\u5BC6\u7684\r
            passwordHash: bcrypt.hashSync(req.body.password, 8),\r
            name: req.body.name,\r
            avatarUrl: req.body.avatarUrl\r
          }\r
        });\r
\r
        // \u628A\u5EFA\u7ACB\u6210\u529F\u7684\u7528\u6237\u6570\u636E\uFF08\u4E0D\u5305\u542B\u5BC6\u7801\uFF09\u548C JWT \u56DE\u4F20\u7ED9\u524D\u7AEF\r
        res.status(201)\r
          .setCookie('token', await signToken(user.id))\r
          .json({ ...user, passwordHash: undefined })\r
\r
        // \u5904\u7406\u5B8C\u8BF7\u6C42\u4EE5\u540E\u8BB0\u5F97\u65AD\u5F00\u6570\u636E\u5E93\u94FE\u63A5\r
        await prisma.$disconnect();\r
\r
      } catch (e: any) {\r
        // \u5982\u679C\u53D1\u751F\u672A\u9884\u671F\u7684\u9519\u8BEF\uFF0C\u5C06\u5BF9\u5E94\u7684\u9519\u8BEF\u8BF4\u660E\u7684 Prisma \u6587\u6863\u53D1\u7ED9\u7528\u6237\r
        res.status(500).json({\r
          result: false,\r
          message: typeof e.code === 'string' ? 'https://www.prisma.io/docs/reference/api-reference/error-reference#' + e.code.toLowerCase() : e\r
        })\r
      }\r
      break;\r
    default:\r
      // \u5982\u679C\u4E0D\u662F POST \u8BF7\u6C42\uFF0C\u4EE3\u8868\u4ED6\u6B63\u5728\u7528\u9519\u8BEF\u7684\u65B9\u5F0F\u8BBF\u95EE\u8FD9\u4E2A API\r
      res.status(405).json({ error: 'Method not allowed' })\r
  }\r
}` }, { "path": "login", "id": "login", "file": "login.ts", "absPath": "/login", "__content": `import type { UmiApiRequest, UmiApiResponse } from "umi";\r
import { PrismaClient } from '@prisma/client'\r
import bcrypt from "bcryptjs";\r
import { signToken } from "../../utils/jwt";\r
\r
export default async function (req: UmiApiRequest, res: UmiApiResponse) {\r
  switch (req.method) {\r
    case 'POST':\r
      try {\r
        const prisma = new PrismaClient();\r
        const user = await prisma.user.findUnique({\r
          where: { email: req.body.email }\r
        });\r
        if (!user || !bcrypt.compareSync(req.body.password, user.passwordHash)) {\r
          return res.status(401).json({\r
            message: 'Invalid email or password'\r
          });\r
        }\r
        res.status(200)\r
          .setCookie('token', await signToken(user.id))\r
          .json({ ...user, passwordHash: undefined });\r
        await prisma.$disconnect()\r
      } catch (error: any) {\r
        res.status(500).json(error);\r
      }\r
      break;\r
    default:\r
      res.status(405).json({ error: 'Method not allowed' })\r
  }\r
}` }];
var postId_default2 = async (req, res) => {
  const umiReq = new import_apiRoute.UmiApiRequest(req, apiRoutes);
  await umiReq.readBody();
  const umiRes = new import_apiRoute.UmiApiResponse(res);
  await new Promise((resolve) => middlewares_default(umiReq, umiRes, resolve));
  await postId_default(umiReq, umiRes);
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
