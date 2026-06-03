"use strict";
var UpProvider = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined") return require.apply(this, arguments);
    throw Error('Dynamic require of "' + x + '" is not supported');
  });
  var __commonJS = (cb, mod) => function __require2() {
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
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // ../../node_modules/.pnpm/ms@2.1.3/node_modules/ms/index.js
  var require_ms = __commonJS({
    "../../node_modules/.pnpm/ms@2.1.3/node_modules/ms/index.js"(exports, module) {
      "use strict";
      var s = 1e3;
      var m = s * 60;
      var h = m * 60;
      var d = h * 24;
      var w = d * 7;
      var y = d * 365.25;
      module.exports = function(val, options) {
        options = options || {};
        var type = typeof val;
        if (type === "string" && val.length > 0) {
          return parse2(val);
        } else if (type === "number" && isFinite(val)) {
          return options.long ? fmtLong(val) : fmtShort(val);
        }
        throw new Error(
          "val is not a non-empty string or a valid number. val=" + JSON.stringify(val)
        );
      };
      function parse2(str) {
        str = String(str);
        if (str.length > 100) {
          return;
        }
        var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
          str
        );
        if (!match) {
          return;
        }
        var n = parseFloat(match[1]);
        var type = (match[2] || "ms").toLowerCase();
        switch (type) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return n * y;
          case "weeks":
          case "week":
          case "w":
            return n * w;
          case "days":
          case "day":
          case "d":
            return n * d;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return n * h;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return n * m;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return n * s;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return n;
          default:
            return void 0;
        }
      }
      function fmtShort(ms) {
        var msAbs = Math.abs(ms);
        if (msAbs >= d) {
          return Math.round(ms / d) + "d";
        }
        if (msAbs >= h) {
          return Math.round(ms / h) + "h";
        }
        if (msAbs >= m) {
          return Math.round(ms / m) + "m";
        }
        if (msAbs >= s) {
          return Math.round(ms / s) + "s";
        }
        return ms + "ms";
      }
      function fmtLong(ms) {
        var msAbs = Math.abs(ms);
        if (msAbs >= d) {
          return plural(ms, msAbs, d, "day");
        }
        if (msAbs >= h) {
          return plural(ms, msAbs, h, "hour");
        }
        if (msAbs >= m) {
          return plural(ms, msAbs, m, "minute");
        }
        if (msAbs >= s) {
          return plural(ms, msAbs, s, "second");
        }
        return ms + " ms";
      }
      function plural(ms, msAbs, n, name) {
        var isPlural = msAbs >= n * 1.5;
        return Math.round(ms / n) + " " + name + (isPlural ? "s" : "");
      }
    }
  });

  // ../../node_modules/.pnpm/debug@4.4.3/node_modules/debug/src/common.js
  var require_common = __commonJS({
    "../../node_modules/.pnpm/debug@4.4.3/node_modules/debug/src/common.js"(exports, module) {
      "use strict";
      function setup(env) {
        createDebug.debug = createDebug;
        createDebug.default = createDebug;
        createDebug.coerce = coerce;
        createDebug.disable = disable;
        createDebug.enable = enable;
        createDebug.enabled = enabled;
        createDebug.humanize = require_ms();
        createDebug.destroy = destroy;
        Object.keys(env).forEach((key) => {
          createDebug[key] = env[key];
        });
        createDebug.names = [];
        createDebug.skips = [];
        createDebug.formatters = {};
        function selectColor(namespace) {
          let hash = 0;
          for (let i = 0; i < namespace.length; i++) {
            hash = (hash << 5) - hash + namespace.charCodeAt(i);
            hash |= 0;
          }
          return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
        }
        createDebug.selectColor = selectColor;
        function createDebug(namespace) {
          let prevTime;
          let enableOverride = null;
          let namespacesCache;
          let enabledCache;
          function debug4(...args) {
            if (!debug4.enabled) {
              return;
            }
            const self = debug4;
            const curr = Number(/* @__PURE__ */ new Date());
            const ms = curr - (prevTime || curr);
            self.diff = ms;
            self.prev = prevTime;
            self.curr = curr;
            prevTime = curr;
            args[0] = createDebug.coerce(args[0]);
            if (typeof args[0] !== "string") {
              args.unshift("%O");
            }
            let index = 0;
            args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
              if (match === "%%") {
                return "%";
              }
              index++;
              const formatter = createDebug.formatters[format];
              if (typeof formatter === "function") {
                const val = args[index];
                match = formatter.call(self, val);
                args.splice(index, 1);
                index--;
              }
              return match;
            });
            createDebug.formatArgs.call(self, args);
            const logFn = self.log || createDebug.log;
            logFn.apply(self, args);
          }
          debug4.namespace = namespace;
          debug4.useColors = createDebug.useColors();
          debug4.color = createDebug.selectColor(namespace);
          debug4.extend = extend;
          debug4.destroy = createDebug.destroy;
          Object.defineProperty(debug4, "enabled", {
            enumerable: true,
            configurable: false,
            get: () => {
              if (enableOverride !== null) {
                return enableOverride;
              }
              if (namespacesCache !== createDebug.namespaces) {
                namespacesCache = createDebug.namespaces;
                enabledCache = createDebug.enabled(namespace);
              }
              return enabledCache;
            },
            set: (v) => {
              enableOverride = v;
            }
          });
          if (typeof createDebug.init === "function") {
            createDebug.init(debug4);
          }
          return debug4;
        }
        function extend(namespace, delimiter) {
          const newDebug = createDebug(this.namespace + (typeof delimiter === "undefined" ? ":" : delimiter) + namespace);
          newDebug.log = this.log;
          return newDebug;
        }
        function enable(namespaces) {
          createDebug.save(namespaces);
          createDebug.namespaces = namespaces;
          createDebug.names = [];
          createDebug.skips = [];
          const split = (typeof namespaces === "string" ? namespaces : "").trim().replace(/\s+/g, ",").split(",").filter(Boolean);
          for (const ns of split) {
            if (ns[0] === "-") {
              createDebug.skips.push(ns.slice(1));
            } else {
              createDebug.names.push(ns);
            }
          }
        }
        function matchesTemplate(search, template) {
          let searchIndex = 0;
          let templateIndex = 0;
          let starIndex = -1;
          let matchIndex = 0;
          while (searchIndex < search.length) {
            if (templateIndex < template.length && (template[templateIndex] === search[searchIndex] || template[templateIndex] === "*")) {
              if (template[templateIndex] === "*") {
                starIndex = templateIndex;
                matchIndex = searchIndex;
                templateIndex++;
              } else {
                searchIndex++;
                templateIndex++;
              }
            } else if (starIndex !== -1) {
              templateIndex = starIndex + 1;
              matchIndex++;
              searchIndex = matchIndex;
            } else {
              return false;
            }
          }
          while (templateIndex < template.length && template[templateIndex] === "*") {
            templateIndex++;
          }
          return templateIndex === template.length;
        }
        function disable() {
          const namespaces = [
            ...createDebug.names,
            ...createDebug.skips.map((namespace) => "-" + namespace)
          ].join(",");
          createDebug.enable("");
          return namespaces;
        }
        function enabled(name) {
          for (const skip of createDebug.skips) {
            if (matchesTemplate(name, skip)) {
              return false;
            }
          }
          for (const ns of createDebug.names) {
            if (matchesTemplate(name, ns)) {
              return true;
            }
          }
          return false;
        }
        function coerce(val) {
          if (val instanceof Error) {
            return val.stack || val.message;
          }
          return val;
        }
        function destroy() {
          console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
        }
        createDebug.enable(createDebug.load());
        return createDebug;
      }
      module.exports = setup;
    }
  });

  // ../../node_modules/.pnpm/debug@4.4.3/node_modules/debug/src/browser.js
  var require_browser = __commonJS({
    "../../node_modules/.pnpm/debug@4.4.3/node_modules/debug/src/browser.js"(exports, module) {
      "use strict";
      exports.formatArgs = formatArgs;
      exports.save = save;
      exports.load = load;
      exports.useColors = useColors;
      exports.storage = localstorage();
      exports.destroy = /* @__PURE__ */ (() => {
        let warned = false;
        return () => {
          if (!warned) {
            warned = true;
            console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
          }
        };
      })();
      exports.colors = [
        "#0000CC",
        "#0000FF",
        "#0033CC",
        "#0033FF",
        "#0066CC",
        "#0066FF",
        "#0099CC",
        "#0099FF",
        "#00CC00",
        "#00CC33",
        "#00CC66",
        "#00CC99",
        "#00CCCC",
        "#00CCFF",
        "#3300CC",
        "#3300FF",
        "#3333CC",
        "#3333FF",
        "#3366CC",
        "#3366FF",
        "#3399CC",
        "#3399FF",
        "#33CC00",
        "#33CC33",
        "#33CC66",
        "#33CC99",
        "#33CCCC",
        "#33CCFF",
        "#6600CC",
        "#6600FF",
        "#6633CC",
        "#6633FF",
        "#66CC00",
        "#66CC33",
        "#9900CC",
        "#9900FF",
        "#9933CC",
        "#9933FF",
        "#99CC00",
        "#99CC33",
        "#CC0000",
        "#CC0033",
        "#CC0066",
        "#CC0099",
        "#CC00CC",
        "#CC00FF",
        "#CC3300",
        "#CC3333",
        "#CC3366",
        "#CC3399",
        "#CC33CC",
        "#CC33FF",
        "#CC6600",
        "#CC6633",
        "#CC9900",
        "#CC9933",
        "#CCCC00",
        "#CCCC33",
        "#FF0000",
        "#FF0033",
        "#FF0066",
        "#FF0099",
        "#FF00CC",
        "#FF00FF",
        "#FF3300",
        "#FF3333",
        "#FF3366",
        "#FF3399",
        "#FF33CC",
        "#FF33FF",
        "#FF6600",
        "#FF6633",
        "#FF9900",
        "#FF9933",
        "#FFCC00",
        "#FFCC33"
      ];
      function useColors() {
        if (typeof window !== "undefined" && window.process && (window.process.type === "renderer" || window.process.__nwjs)) {
          return true;
        }
        if (typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
          return false;
        }
        let m;
        return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
        typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
        // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
        typeof navigator !== "undefined" && navigator.userAgent && (m = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(m[1], 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
        typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
      }
      function formatArgs(args) {
        args[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + args[0] + (this.useColors ? "%c " : " ") + "+" + module.exports.humanize(this.diff);
        if (!this.useColors) {
          return;
        }
        const c = "color: " + this.color;
        args.splice(1, 0, c, "color: inherit");
        let index = 0;
        let lastC = 0;
        args[0].replace(/%[a-zA-Z%]/g, (match) => {
          if (match === "%%") {
            return;
          }
          index++;
          if (match === "%c") {
            lastC = index;
          }
        });
        args.splice(lastC, 0, c);
      }
      exports.log = console.debug || console.log || (() => {
      });
      function save(namespaces) {
        try {
          if (namespaces) {
            exports.storage.setItem("debug", namespaces);
          } else {
            exports.storage.removeItem("debug");
          }
        } catch (error) {
        }
      }
      function load() {
        let r;
        try {
          r = exports.storage.getItem("debug") || exports.storage.getItem("DEBUG");
        } catch (error) {
        }
        if (!r && typeof process !== "undefined" && "env" in process) {
          r = process.env.DEBUG;
        }
        return r;
      }
      function localstorage() {
        try {
          return localStorage;
        } catch (error) {
        }
      }
      module.exports = require_common()(exports);
      var { formatters } = module.exports;
      formatters.j = function(v) {
        try {
          return JSON.stringify(v);
        } catch (error) {
          return "[UnexpectedJSONParseError]: " + error.message;
        }
      };
    }
  });

  // ../../node_modules/.pnpm/has-flag@4.0.0/node_modules/has-flag/index.js
  var require_has_flag = __commonJS({
    "../../node_modules/.pnpm/has-flag@4.0.0/node_modules/has-flag/index.js"(exports, module) {
      "use strict";
      module.exports = (flag, argv = process.argv) => {
        const prefix = flag.startsWith("-") ? "" : flag.length === 1 ? "-" : "--";
        const position = argv.indexOf(prefix + flag);
        const terminatorPosition = argv.indexOf("--");
        return position !== -1 && (terminatorPosition === -1 || position < terminatorPosition);
      };
    }
  });

  // ../../node_modules/.pnpm/supports-color@8.1.1/node_modules/supports-color/index.js
  var require_supports_color = __commonJS({
    "../../node_modules/.pnpm/supports-color@8.1.1/node_modules/supports-color/index.js"(exports, module) {
      "use strict";
      var os = __require("os");
      var tty = __require("tty");
      var hasFlag = require_has_flag();
      var { env } = process;
      var flagForceColor;
      if (hasFlag("no-color") || hasFlag("no-colors") || hasFlag("color=false") || hasFlag("color=never")) {
        flagForceColor = 0;
      } else if (hasFlag("color") || hasFlag("colors") || hasFlag("color=true") || hasFlag("color=always")) {
        flagForceColor = 1;
      }
      function envForceColor() {
        if ("FORCE_COLOR" in env) {
          if (env.FORCE_COLOR === "true") {
            return 1;
          }
          if (env.FORCE_COLOR === "false") {
            return 0;
          }
          return env.FORCE_COLOR.length === 0 ? 1 : Math.min(Number.parseInt(env.FORCE_COLOR, 10), 3);
        }
      }
      function translateLevel(level) {
        if (level === 0) {
          return false;
        }
        return {
          level,
          hasBasic: true,
          has256: level >= 2,
          has16m: level >= 3
        };
      }
      function supportsColor(haveStream, { streamIsTTY, sniffFlags = true } = {}) {
        const noFlagForceColor = envForceColor();
        if (noFlagForceColor !== void 0) {
          flagForceColor = noFlagForceColor;
        }
        const forceColor = sniffFlags ? flagForceColor : noFlagForceColor;
        if (forceColor === 0) {
          return 0;
        }
        if (sniffFlags) {
          if (hasFlag("color=16m") || hasFlag("color=full") || hasFlag("color=truecolor")) {
            return 3;
          }
          if (hasFlag("color=256")) {
            return 2;
          }
        }
        if (haveStream && !streamIsTTY && forceColor === void 0) {
          return 0;
        }
        const min = forceColor || 0;
        if (env.TERM === "dumb") {
          return min;
        }
        if (process.platform === "win32") {
          const osRelease = os.release().split(".");
          if (Number(osRelease[0]) >= 10 && Number(osRelease[2]) >= 10586) {
            return Number(osRelease[2]) >= 14931 ? 3 : 2;
          }
          return 1;
        }
        if ("CI" in env) {
          if (["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI", "GITHUB_ACTIONS", "BUILDKITE", "DRONE"].some((sign) => sign in env) || env.CI_NAME === "codeship") {
            return 1;
          }
          return min;
        }
        if ("TEAMCITY_VERSION" in env) {
          return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
        }
        if (env.COLORTERM === "truecolor") {
          return 3;
        }
        if ("TERM_PROGRAM" in env) {
          const version = Number.parseInt((env.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
          switch (env.TERM_PROGRAM) {
            case "iTerm.app":
              return version >= 3 ? 3 : 2;
            case "Apple_Terminal":
              return 2;
          }
        }
        if (/-256(color)?$/i.test(env.TERM)) {
          return 2;
        }
        if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
          return 1;
        }
        if ("COLORTERM" in env) {
          return 1;
        }
        return min;
      }
      function getSupportLevel(stream, options = {}) {
        const level = supportsColor(stream, {
          streamIsTTY: stream && stream.isTTY,
          ...options
        });
        return translateLevel(level);
      }
      module.exports = {
        supportsColor: getSupportLevel,
        stdout: getSupportLevel({ isTTY: tty.isatty(1) }),
        stderr: getSupportLevel({ isTTY: tty.isatty(2) })
      };
    }
  });

  // ../../node_modules/.pnpm/debug@4.4.3/node_modules/debug/src/node.js
  var require_node = __commonJS({
    "../../node_modules/.pnpm/debug@4.4.3/node_modules/debug/src/node.js"(exports, module) {
      "use strict";
      var tty = __require("tty");
      var util = __require("util");
      exports.init = init;
      exports.log = log;
      exports.formatArgs = formatArgs;
      exports.save = save;
      exports.load = load;
      exports.useColors = useColors;
      exports.destroy = util.deprecate(
        () => {
        },
        "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
      );
      exports.colors = [6, 2, 3, 4, 5, 1];
      try {
        const supportsColor = require_supports_color();
        if (supportsColor && (supportsColor.stderr || supportsColor).level >= 2) {
          exports.colors = [
            20,
            21,
            26,
            27,
            32,
            33,
            38,
            39,
            40,
            41,
            42,
            43,
            44,
            45,
            56,
            57,
            62,
            63,
            68,
            69,
            74,
            75,
            76,
            77,
            78,
            79,
            80,
            81,
            92,
            93,
            98,
            99,
            112,
            113,
            128,
            129,
            134,
            135,
            148,
            149,
            160,
            161,
            162,
            163,
            164,
            165,
            166,
            167,
            168,
            169,
            170,
            171,
            172,
            173,
            178,
            179,
            184,
            185,
            196,
            197,
            198,
            199,
            200,
            201,
            202,
            203,
            204,
            205,
            206,
            207,
            208,
            209,
            214,
            215,
            220,
            221
          ];
        }
      } catch (error) {
      }
      exports.inspectOpts = Object.keys(process.env).filter((key) => {
        return /^debug_/i.test(key);
      }).reduce((obj, key) => {
        const prop = key.substring(6).toLowerCase().replace(/_([a-z])/g, (_, k) => {
          return k.toUpperCase();
        });
        let val = process.env[key];
        if (/^(yes|on|true|enabled)$/i.test(val)) {
          val = true;
        } else if (/^(no|off|false|disabled)$/i.test(val)) {
          val = false;
        } else if (val === "null") {
          val = null;
        } else {
          val = Number(val);
        }
        obj[prop] = val;
        return obj;
      }, {});
      function useColors() {
        return "colors" in exports.inspectOpts ? Boolean(exports.inspectOpts.colors) : tty.isatty(process.stderr.fd);
      }
      function formatArgs(args) {
        const { namespace: name, useColors: useColors2 } = this;
        if (useColors2) {
          const c = this.color;
          const colorCode = "\x1B[3" + (c < 8 ? c : "8;5;" + c);
          const prefix = `  ${colorCode};1m${name} \x1B[0m`;
          args[0] = prefix + args[0].split("\n").join("\n" + prefix);
          args.push(colorCode + "m+" + module.exports.humanize(this.diff) + "\x1B[0m");
        } else {
          args[0] = getDate() + name + " " + args[0];
        }
      }
      function getDate() {
        if (exports.inspectOpts.hideDate) {
          return "";
        }
        return (/* @__PURE__ */ new Date()).toISOString() + " ";
      }
      function log(...args) {
        return process.stderr.write(util.formatWithOptions(exports.inspectOpts, ...args) + "\n");
      }
      function save(namespaces) {
        if (namespaces) {
          process.env.DEBUG = namespaces;
        } else {
          delete process.env.DEBUG;
        }
      }
      function load() {
        return process.env.DEBUG;
      }
      function init(debug4) {
        debug4.inspectOpts = {};
        const keys = Object.keys(exports.inspectOpts);
        for (let i = 0; i < keys.length; i++) {
          debug4.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
        }
      }
      module.exports = require_common()(exports);
      var { formatters } = module.exports;
      formatters.o = function(v) {
        this.inspectOpts.colors = this.useColors;
        return util.inspect(v, this.inspectOpts).split("\n").map((str) => str.trim()).join(" ");
      };
      formatters.O = function(v) {
        this.inspectOpts.colors = this.useColors;
        return util.inspect(v, this.inspectOpts);
      };
    }
  });

  // ../../node_modules/.pnpm/debug@4.4.3/node_modules/debug/src/index.js
  var require_src = __commonJS({
    "../../node_modules/.pnpm/debug@4.4.3/node_modules/debug/src/index.js"(exports, module) {
      "use strict";
      if (typeof process === "undefined" || process.type === "renderer" || process.browser === true || process.__nwjs) {
        module.exports = require_browser();
      } else {
        module.exports = require_node();
      }
    }
  });

  // ../../node_modules/.pnpm/eventemitter3@5.0.1/node_modules/eventemitter3/index.js
  var require_eventemitter3 = __commonJS({
    "../../node_modules/.pnpm/eventemitter3@5.0.1/node_modules/eventemitter3/index.js"(exports, module) {
      "use strict";
      var has = Object.prototype.hasOwnProperty;
      var prefix = "~";
      function Events() {
      }
      if (Object.create) {
        Events.prototype = /* @__PURE__ */ Object.create(null);
        if (!new Events().__proto__) prefix = false;
      }
      function EE(fn, context, once) {
        this.fn = fn;
        this.context = context;
        this.once = once || false;
      }
      function addListener(emitter, event, fn, context, once) {
        if (typeof fn !== "function") {
          throw new TypeError("The listener must be a function");
        }
        var listener = new EE(fn, context || emitter, once), evt = prefix ? prefix + event : event;
        if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
        else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
        else emitter._events[evt] = [emitter._events[evt], listener];
        return emitter;
      }
      function clearEvent(emitter, evt) {
        if (--emitter._eventsCount === 0) emitter._events = new Events();
        else delete emitter._events[evt];
      }
      function EventEmitter2() {
        this._events = new Events();
        this._eventsCount = 0;
      }
      EventEmitter2.prototype.eventNames = function eventNames() {
        var names = [], events, name;
        if (this._eventsCount === 0) return names;
        for (name in events = this._events) {
          if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
        }
        if (Object.getOwnPropertySymbols) {
          return names.concat(Object.getOwnPropertySymbols(events));
        }
        return names;
      };
      EventEmitter2.prototype.listeners = function listeners(event) {
        var evt = prefix ? prefix + event : event, handlers = this._events[evt];
        if (!handlers) return [];
        if (handlers.fn) return [handlers.fn];
        for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
          ee[i] = handlers[i].fn;
        }
        return ee;
      };
      EventEmitter2.prototype.listenerCount = function listenerCount(event) {
        var evt = prefix ? prefix + event : event, listeners = this._events[evt];
        if (!listeners) return 0;
        if (listeners.fn) return 1;
        return listeners.length;
      };
      EventEmitter2.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
        var evt = prefix ? prefix + event : event;
        if (!this._events[evt]) return false;
        var listeners = this._events[evt], len = arguments.length, args, i;
        if (listeners.fn) {
          if (listeners.once) this.removeListener(event, listeners.fn, void 0, true);
          switch (len) {
            case 1:
              return listeners.fn.call(listeners.context), true;
            case 2:
              return listeners.fn.call(listeners.context, a1), true;
            case 3:
              return listeners.fn.call(listeners.context, a1, a2), true;
            case 4:
              return listeners.fn.call(listeners.context, a1, a2, a3), true;
            case 5:
              return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
            case 6:
              return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
          }
          for (i = 1, args = new Array(len - 1); i < len; i++) {
            args[i - 1] = arguments[i];
          }
          listeners.fn.apply(listeners.context, args);
        } else {
          var length = listeners.length, j;
          for (i = 0; i < length; i++) {
            if (listeners[i].once) this.removeListener(event, listeners[i].fn, void 0, true);
            switch (len) {
              case 1:
                listeners[i].fn.call(listeners[i].context);
                break;
              case 2:
                listeners[i].fn.call(listeners[i].context, a1);
                break;
              case 3:
                listeners[i].fn.call(listeners[i].context, a1, a2);
                break;
              case 4:
                listeners[i].fn.call(listeners[i].context, a1, a2, a3);
                break;
              default:
                if (!args) for (j = 1, args = new Array(len - 1); j < len; j++) {
                  args[j - 1] = arguments[j];
                }
                listeners[i].fn.apply(listeners[i].context, args);
            }
          }
        }
        return true;
      };
      EventEmitter2.prototype.on = function on(event, fn, context) {
        return addListener(this, event, fn, context, false);
      };
      EventEmitter2.prototype.once = function once(event, fn, context) {
        return addListener(this, event, fn, context, true);
      };
      EventEmitter2.prototype.removeListener = function removeListener(event, fn, context, once) {
        var evt = prefix ? prefix + event : event;
        if (!this._events[evt]) return this;
        if (!fn) {
          clearEvent(this, evt);
          return this;
        }
        var listeners = this._events[evt];
        if (listeners.fn) {
          if (listeners.fn === fn && (!once || listeners.once) && (!context || listeners.context === context)) {
            clearEvent(this, evt);
          }
        } else {
          for (var i = 0, events = [], length = listeners.length; i < length; i++) {
            if (listeners[i].fn !== fn || once && !listeners[i].once || context && listeners[i].context !== context) {
              events.push(listeners[i]);
            }
          }
          if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
          else clearEvent(this, evt);
        }
        return this;
      };
      EventEmitter2.prototype.removeAllListeners = function removeAllListeners(event) {
        var evt;
        if (event) {
          evt = prefix ? prefix + event : event;
          if (this._events[evt]) clearEvent(this, evt);
        } else {
          this._events = new Events();
          this._eventsCount = 0;
        }
        return this;
      };
      EventEmitter2.prototype.off = EventEmitter2.prototype.removeListener;
      EventEmitter2.prototype.addListener = EventEmitter2.prototype.on;
      EventEmitter2.prefixed = prefix;
      EventEmitter2.EventEmitter = EventEmitter2;
      if ("undefined" !== typeof module) {
        module.exports = EventEmitter2;
      }
    }
  });

  // ../../node_modules/.pnpm/json-rpc-2.0@1.7.1/node_modules/json-rpc-2.0/dist/models.js
  var require_models = __commonJS({
    "../../node_modules/.pnpm/json-rpc-2.0@1.7.1/node_modules/json-rpc-2.0/dist/models.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || /* @__PURE__ */ (function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      })();
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.createJSONRPCNotification = exports.createJSONRPCRequest = exports.createJSONRPCSuccessResponse = exports.createJSONRPCErrorResponse = exports.JSONRPCErrorCode = exports.JSONRPCErrorException = exports.isJSONRPCResponses = exports.isJSONRPCResponse = exports.isJSONRPCRequests = exports.isJSONRPCRequest = exports.isJSONRPCID = exports.JSONRPC = void 0;
      exports.JSONRPC = "2.0";
      var isJSONRPCID = function(id) {
        return typeof id === "string" || typeof id === "number" || id === null;
      };
      exports.isJSONRPCID = isJSONRPCID;
      var isJSONRPCRequest = function(payload) {
        return payload.jsonrpc === exports.JSONRPC && payload.method !== void 0 && payload.result === void 0 && payload.error === void 0;
      };
      exports.isJSONRPCRequest = isJSONRPCRequest;
      var isJSONRPCRequests = function(payload) {
        return Array.isArray(payload) && payload.every(exports.isJSONRPCRequest);
      };
      exports.isJSONRPCRequests = isJSONRPCRequests;
      var isJSONRPCResponse = function(payload) {
        return payload.jsonrpc === exports.JSONRPC && payload.id !== void 0 && (payload.result !== void 0 || payload.error !== void 0);
      };
      exports.isJSONRPCResponse = isJSONRPCResponse;
      var isJSONRPCResponses = function(payload) {
        return Array.isArray(payload) && payload.every(exports.isJSONRPCResponse);
      };
      exports.isJSONRPCResponses = isJSONRPCResponses;
      var createJSONRPCError = function(code, message, data) {
        var error = { code, message };
        if (data != null) {
          error.data = data;
        }
        return error;
      };
      var JSONRPCErrorException = (
        /** @class */
        (function(_super) {
          __extends(JSONRPCErrorException2, _super);
          function JSONRPCErrorException2(message, code, data) {
            var _this = _super.call(this, message) || this;
            Object.setPrototypeOf(_this, JSONRPCErrorException2.prototype);
            _this.code = code;
            _this.data = data;
            return _this;
          }
          JSONRPCErrorException2.prototype.toObject = function() {
            return createJSONRPCError(this.code, this.message, this.data);
          };
          return JSONRPCErrorException2;
        })(Error)
      );
      exports.JSONRPCErrorException = JSONRPCErrorException;
      var JSONRPCErrorCode;
      (function(JSONRPCErrorCode2) {
        JSONRPCErrorCode2[JSONRPCErrorCode2["ParseError"] = -32700] = "ParseError";
        JSONRPCErrorCode2[JSONRPCErrorCode2["InvalidRequest"] = -32600] = "InvalidRequest";
        JSONRPCErrorCode2[JSONRPCErrorCode2["MethodNotFound"] = -32601] = "MethodNotFound";
        JSONRPCErrorCode2[JSONRPCErrorCode2["InvalidParams"] = -32602] = "InvalidParams";
        JSONRPCErrorCode2[JSONRPCErrorCode2["InternalError"] = -32603] = "InternalError";
      })(JSONRPCErrorCode = exports.JSONRPCErrorCode || (exports.JSONRPCErrorCode = {}));
      var createJSONRPCErrorResponse = function(id, code, message, data) {
        return {
          jsonrpc: exports.JSONRPC,
          id,
          error: createJSONRPCError(code, message, data)
        };
      };
      exports.createJSONRPCErrorResponse = createJSONRPCErrorResponse;
      var createJSONRPCSuccessResponse = function(id, result) {
        return {
          jsonrpc: exports.JSONRPC,
          id,
          result: result !== null && result !== void 0 ? result : null
        };
      };
      exports.createJSONRPCSuccessResponse = createJSONRPCSuccessResponse;
      var createJSONRPCRequest = function(id, method, params) {
        return {
          jsonrpc: exports.JSONRPC,
          id,
          method,
          params
        };
      };
      exports.createJSONRPCRequest = createJSONRPCRequest;
      var createJSONRPCNotification = function(method, params) {
        return {
          jsonrpc: exports.JSONRPC,
          method,
          params
        };
      };
      exports.createJSONRPCNotification = createJSONRPCNotification;
    }
  });

  // ../../node_modules/.pnpm/json-rpc-2.0@1.7.1/node_modules/json-rpc-2.0/dist/internal.js
  var require_internal = __commonJS({
    "../../node_modules/.pnpm/json-rpc-2.0@1.7.1/node_modules/json-rpc-2.0/dist/internal.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.DefaultErrorCode = void 0;
      exports.DefaultErrorCode = 0;
    }
  });

  // ../../node_modules/.pnpm/json-rpc-2.0@1.7.1/node_modules/json-rpc-2.0/dist/client.js
  var require_client = __commonJS({
    "../../node_modules/.pnpm/json-rpc-2.0@1.7.1/node_modules/json-rpc-2.0/dist/client.js"(exports) {
      "use strict";
      var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
        function adopt(value) {
          return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
          });
        }
        return new (P || (P = Promise))(function(resolve, reject) {
          function fulfilled(value) {
            try {
              step(generator.next(value));
            } catch (e) {
              reject(e);
            }
          }
          function rejected(value) {
            try {
              step(generator["throw"](value));
            } catch (e) {
              reject(e);
            }
          }
          function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
          }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
      };
      var __generator = exports && exports.__generator || function(thisArg, body) {
        var _ = { label: 0, sent: function() {
          if (t[0] & 1) throw t[1];
          return t[1];
        }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
          return this;
        }), g;
        function verb(n) {
          return function(v) {
            return step([n, v]);
          };
        }
        function step(op) {
          if (f) throw new TypeError("Generator is already executing.");
          while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
              case 0:
              case 1:
                t = op;
                break;
              case 4:
                _.label++;
                return { value: op[1], done: false };
              case 5:
                _.label++;
                y = op[1];
                op = [0];
                continue;
              case 7:
                op = _.ops.pop();
                _.trys.pop();
                continue;
              default:
                if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                  _ = 0;
                  continue;
                }
                if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                  _.label = op[1];
                  break;
                }
                if (op[0] === 6 && _.label < t[1]) {
                  _.label = t[1];
                  t = op;
                  break;
                }
                if (t && _.label < t[2]) {
                  _.label = t[2];
                  _.ops.push(op);
                  break;
                }
                if (t[2]) _.ops.pop();
                _.trys.pop();
                continue;
            }
            op = body.call(thisArg, _);
          } catch (e) {
            op = [6, e];
            y = 0;
          } finally {
            f = t = 0;
          }
          if (op[0] & 5) throw op[1];
          return { value: op[0] ? op[1] : void 0, done: true };
        }
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.JSONRPCClient = void 0;
      var models_1 = require_models();
      var internal_1 = require_internal();
      var JSONRPCClient2 = (
        /** @class */
        (function() {
          function JSONRPCClient3(_send, createID) {
            this._send = _send;
            this.createID = createID;
            this.idToResolveMap = /* @__PURE__ */ new Map();
            this.id = 0;
          }
          JSONRPCClient3.prototype._createID = function() {
            if (this.createID) {
              return this.createID();
            } else {
              return ++this.id;
            }
          };
          JSONRPCClient3.prototype.timeout = function(delay, overrideCreateJSONRPCErrorResponse) {
            var _this = this;
            if (overrideCreateJSONRPCErrorResponse === void 0) {
              overrideCreateJSONRPCErrorResponse = function(id) {
                return (0, models_1.createJSONRPCErrorResponse)(id, internal_1.DefaultErrorCode, "Request timeout");
              };
            }
            var timeoutRequest = function(ids, request) {
              var timeoutID = setTimeout(function() {
                ids.forEach(function(id) {
                  var resolve = _this.idToResolveMap.get(id);
                  if (resolve) {
                    _this.idToResolveMap.delete(id);
                    resolve(overrideCreateJSONRPCErrorResponse(id));
                  }
                });
              }, delay);
              return request().then(function(result) {
                clearTimeout(timeoutID);
                return result;
              }, function(error) {
                clearTimeout(timeoutID);
                return Promise.reject(error);
              });
            };
            var requestAdvanced = function(request, clientParams) {
              var ids = (!Array.isArray(request) ? [request] : request).map(function(request2) {
                return request2.id;
              }).filter(isDefinedAndNonNull);
              return timeoutRequest(ids, function() {
                return _this.requestAdvanced(request, clientParams);
              });
            };
            return {
              request: function(method, params, clientParams) {
                var id = _this._createID();
                return timeoutRequest([id], function() {
                  return _this.requestWithID(method, params, clientParams, id);
                });
              },
              requestAdvanced: function(request, clientParams) {
                return requestAdvanced(request, clientParams);
              }
            };
          };
          JSONRPCClient3.prototype.request = function(method, params, clientParams) {
            return this.requestWithID(method, params, clientParams, this._createID());
          };
          JSONRPCClient3.prototype.requestWithID = function(method, params, clientParams, id) {
            return __awaiter(this, void 0, void 0, function() {
              var request, response;
              return __generator(this, function(_a) {
                switch (_a.label) {
                  case 0:
                    request = (0, models_1.createJSONRPCRequest)(id, method, params);
                    return [4, this.requestAdvanced(request, clientParams)];
                  case 1:
                    response = _a.sent();
                    if (response.result !== void 0 && !response.error) {
                      return [2, response.result];
                    } else if (response.result === void 0 && response.error) {
                      return [2, Promise.reject(new models_1.JSONRPCErrorException(response.error.message, response.error.code, response.error.data))];
                    } else {
                      return [2, Promise.reject(new Error("An unexpected error occurred"))];
                    }
                    return [
                      2
                      /*return*/
                    ];
                }
              });
            });
          };
          JSONRPCClient3.prototype.requestAdvanced = function(requests, clientParams) {
            var _this = this;
            var areRequestsOriginallyArray = Array.isArray(requests);
            if (!Array.isArray(requests)) {
              requests = [requests];
            }
            var requestsWithID = requests.filter(function(request) {
              return isDefinedAndNonNull(request.id);
            });
            var promises = requestsWithID.map(function(request) {
              return new Promise(function(resolve) {
                return _this.idToResolveMap.set(request.id, resolve);
              });
            });
            var promise = Promise.all(promises).then(function(responses) {
              if (areRequestsOriginallyArray || !responses.length) {
                return responses;
              } else {
                return responses[0];
              }
            });
            return this.send(areRequestsOriginallyArray ? requests : requests[0], clientParams).then(function() {
              return promise;
            }, function(error) {
              requestsWithID.forEach(function(request) {
                _this.receive((0, models_1.createJSONRPCErrorResponse)(request.id, internal_1.DefaultErrorCode, error && error.message || "Failed to send a request"));
              });
              return promise;
            });
          };
          JSONRPCClient3.prototype.notify = function(method, params, clientParams) {
            var request = (0, models_1.createJSONRPCNotification)(method, params);
            this.send(request, clientParams).then(void 0, function() {
              return void 0;
            });
          };
          JSONRPCClient3.prototype.send = function(payload, clientParams) {
            return __awaiter(this, void 0, void 0, function() {
              return __generator(this, function(_a) {
                return [2, this._send(payload, clientParams)];
              });
            });
          };
          JSONRPCClient3.prototype.rejectAllPendingRequests = function(message) {
            this.idToResolveMap.forEach(function(resolve, id) {
              return resolve((0, models_1.createJSONRPCErrorResponse)(id, internal_1.DefaultErrorCode, message));
            });
            this.idToResolveMap.clear();
          };
          JSONRPCClient3.prototype.receive = function(responses) {
            var _this = this;
            if (!Array.isArray(responses)) {
              responses = [responses];
            }
            responses.forEach(function(response) {
              var resolve = _this.idToResolveMap.get(response.id);
              if (resolve) {
                _this.idToResolveMap.delete(response.id);
                resolve(response);
              }
            });
          };
          return JSONRPCClient3;
        })()
      );
      exports.JSONRPCClient = JSONRPCClient2;
      var isDefinedAndNonNull = function(value) {
        return value !== void 0 && value !== null;
      };
    }
  });

  // ../../node_modules/.pnpm/json-rpc-2.0@1.7.1/node_modules/json-rpc-2.0/dist/interfaces.js
  var require_interfaces = __commonJS({
    "../../node_modules/.pnpm/json-rpc-2.0@1.7.1/node_modules/json-rpc-2.0/dist/interfaces.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
    }
  });

  // ../../node_modules/.pnpm/json-rpc-2.0@1.7.1/node_modules/json-rpc-2.0/dist/server.js
  var require_server = __commonJS({
    "../../node_modules/.pnpm/json-rpc-2.0@1.7.1/node_modules/json-rpc-2.0/dist/server.js"(exports) {
      "use strict";
      var __assign = exports && exports.__assign || function() {
        __assign = Object.assign || function(t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
              t[p] = s[p];
          }
          return t;
        };
        return __assign.apply(this, arguments);
      };
      var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
        function adopt(value) {
          return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
          });
        }
        return new (P || (P = Promise))(function(resolve, reject) {
          function fulfilled(value) {
            try {
              step(generator.next(value));
            } catch (e) {
              reject(e);
            }
          }
          function rejected(value) {
            try {
              step(generator["throw"](value));
            } catch (e) {
              reject(e);
            }
          }
          function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
          }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
      };
      var __generator = exports && exports.__generator || function(thisArg, body) {
        var _ = { label: 0, sent: function() {
          if (t[0] & 1) throw t[1];
          return t[1];
        }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
          return this;
        }), g;
        function verb(n) {
          return function(v) {
            return step([n, v]);
          };
        }
        function step(op) {
          if (f) throw new TypeError("Generator is already executing.");
          while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
              case 0:
              case 1:
                t = op;
                break;
              case 4:
                _.label++;
                return { value: op[1], done: false };
              case 5:
                _.label++;
                y = op[1];
                op = [0];
                continue;
              case 7:
                op = _.ops.pop();
                _.trys.pop();
                continue;
              default:
                if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                  _ = 0;
                  continue;
                }
                if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                  _.label = op[1];
                  break;
                }
                if (op[0] === 6 && _.label < t[1]) {
                  _.label = t[1];
                  t = op;
                  break;
                }
                if (t && _.label < t[2]) {
                  _.label = t[2];
                  _.ops.push(op);
                  break;
                }
                if (t[2]) _.ops.pop();
                _.trys.pop();
                continue;
            }
            op = body.call(thisArg, _);
          } catch (e) {
            op = [6, e];
            y = 0;
          } finally {
            f = t = 0;
          }
          if (op[0] & 5) throw op[1];
          return { value: op[0] ? op[1] : void 0, done: true };
        }
      };
      var __spreadArray = exports && exports.__spreadArray || function(to, from, pack) {
        if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
          if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
          }
        }
        return to.concat(ar || Array.prototype.slice.call(from));
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.JSONRPCServer = void 0;
      var models_1 = require_models();
      var internal_1 = require_internal();
      var createParseErrorResponse = function() {
        return (0, models_1.createJSONRPCErrorResponse)(null, models_1.JSONRPCErrorCode.ParseError, "Parse error");
      };
      var createInvalidRequestResponse = function(request) {
        return (0, models_1.createJSONRPCErrorResponse)((0, models_1.isJSONRPCID)(request.id) ? request.id : null, models_1.JSONRPCErrorCode.InvalidRequest, "Invalid Request");
      };
      var createMethodNotFoundResponse = function(id) {
        return (0, models_1.createJSONRPCErrorResponse)(id, models_1.JSONRPCErrorCode.MethodNotFound, "Method not found");
      };
      var JSONRPCServer2 = (
        /** @class */
        (function() {
          function JSONRPCServer3(options) {
            if (options === void 0) {
              options = {};
            }
            var _a;
            this.mapErrorToJSONRPCErrorResponse = defaultMapErrorToJSONRPCErrorResponse;
            this.nameToMethodDictionary = {};
            this.middleware = null;
            this.errorListener = (_a = options.errorListener) !== null && _a !== void 0 ? _a : console.warn;
          }
          JSONRPCServer3.prototype.hasMethod = function(name) {
            return !!this.nameToMethodDictionary[name];
          };
          JSONRPCServer3.prototype.addMethod = function(name, method) {
            this.addMethodAdvanced(name, this.toJSONRPCMethod(method));
          };
          JSONRPCServer3.prototype.removeMethod = function(name) {
            delete this.nameToMethodDictionary[name];
          };
          JSONRPCServer3.prototype.toJSONRPCMethod = function(method) {
            return function(request, serverParams) {
              var response = method(request.params, serverParams);
              return Promise.resolve(response).then(function(result) {
                return mapResultToJSONRPCResponse(request.id, result);
              });
            };
          };
          JSONRPCServer3.prototype.addMethodAdvanced = function(name, method) {
            var _a;
            this.nameToMethodDictionary = __assign(__assign({}, this.nameToMethodDictionary), (_a = {}, _a[name] = method, _a));
          };
          JSONRPCServer3.prototype.receiveJSON = function(json, serverParams) {
            var request = this.tryParseRequestJSON(json);
            if (request) {
              return this.receive(request, serverParams);
            } else {
              return Promise.resolve(createParseErrorResponse());
            }
          };
          JSONRPCServer3.prototype.tryParseRequestJSON = function(json) {
            try {
              return JSON.parse(json);
            } catch (_a) {
              return null;
            }
          };
          JSONRPCServer3.prototype.receive = function(request, serverParams) {
            if (Array.isArray(request)) {
              return this.receiveMultiple(request, serverParams);
            } else {
              return this.receiveSingle(request, serverParams);
            }
          };
          JSONRPCServer3.prototype.receiveMultiple = function(requests, serverParams) {
            return __awaiter(this, void 0, void 0, function() {
              var responses;
              var _this = this;
              return __generator(this, function(_a) {
                switch (_a.label) {
                  case 0:
                    return [4, Promise.all(requests.map(function(request) {
                      return _this.receiveSingle(request, serverParams);
                    }))];
                  case 1:
                    responses = _a.sent().filter(isNonNull);
                    if (responses.length === 1) {
                      return [2, responses[0]];
                    } else if (responses.length) {
                      return [2, responses];
                    } else {
                      return [2, null];
                    }
                    return [
                      2
                      /*return*/
                    ];
                }
              });
            });
          };
          JSONRPCServer3.prototype.receiveSingle = function(request, serverParams) {
            return __awaiter(this, void 0, void 0, function() {
              var method, response;
              return __generator(this, function(_a) {
                switch (_a.label) {
                  case 0:
                    method = this.nameToMethodDictionary[request.method];
                    if (!!(0, models_1.isJSONRPCRequest)(request)) return [3, 1];
                    return [2, createInvalidRequestResponse(request)];
                  case 1:
                    return [4, this.callMethod(method, request, serverParams)];
                  case 2:
                    response = _a.sent();
                    return [2, mapResponse(request, response)];
                }
              });
            });
          };
          JSONRPCServer3.prototype.applyMiddleware = function() {
            var middlewares = [];
            for (var _i = 0; _i < arguments.length; _i++) {
              middlewares[_i] = arguments[_i];
            }
            if (this.middleware) {
              this.middleware = this.combineMiddlewares(__spreadArray([
                this.middleware
              ], middlewares, true));
            } else {
              this.middleware = this.combineMiddlewares(middlewares);
            }
          };
          JSONRPCServer3.prototype.combineMiddlewares = function(middlewares) {
            if (!middlewares.length) {
              return null;
            } else {
              return middlewares.reduce(this.middlewareReducer);
            }
          };
          JSONRPCServer3.prototype.middlewareReducer = function(prevMiddleware, nextMiddleware) {
            return function(next, request, serverParams) {
              return prevMiddleware(function(request2, serverParams2) {
                return nextMiddleware(next, request2, serverParams2);
              }, request, serverParams);
            };
          };
          JSONRPCServer3.prototype.callMethod = function(method, request, serverParams) {
            var _this = this;
            var callMethod = function(request2, serverParams2) {
              if (method) {
                return method(request2, serverParams2);
              } else if (request2.id !== void 0) {
                return Promise.resolve(createMethodNotFoundResponse(request2.id));
              } else {
                return Promise.resolve(null);
              }
            };
            var onError = function(error) {
              _this.errorListener('An unexpected error occurred while executing "'.concat(request.method, '" JSON-RPC method:'), error);
              return Promise.resolve(_this.mapErrorToJSONRPCErrorResponseIfNecessary(request.id, error));
            };
            try {
              return (this.middleware || noopMiddleware)(callMethod, request, serverParams).then(void 0, onError);
            } catch (error) {
              return onError(error);
            }
          };
          JSONRPCServer3.prototype.mapErrorToJSONRPCErrorResponseIfNecessary = function(id, error) {
            if (id !== void 0) {
              return this.mapErrorToJSONRPCErrorResponse(id, error);
            } else {
              return null;
            }
          };
          return JSONRPCServer3;
        })()
      );
      exports.JSONRPCServer = JSONRPCServer2;
      var isNonNull = function(value) {
        return value !== null;
      };
      var noopMiddleware = function(next, request, serverParams) {
        return next(request, serverParams);
      };
      var mapResultToJSONRPCResponse = function(id, result) {
        if (id !== void 0) {
          return (0, models_1.createJSONRPCSuccessResponse)(id, result);
        } else {
          return null;
        }
      };
      var defaultMapErrorToJSONRPCErrorResponse = function(id, error) {
        var _a;
        var message = (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : "An unexpected error occurred";
        var code = internal_1.DefaultErrorCode;
        var data;
        if (error instanceof models_1.JSONRPCErrorException) {
          code = error.code;
          data = error.data;
        }
        return (0, models_1.createJSONRPCErrorResponse)(id, code, message, data);
      };
      var mapResponse = function(request, response) {
        if (response) {
          return response;
        } else if (request.id !== void 0) {
          return (0, models_1.createJSONRPCErrorResponse)(request.id, models_1.JSONRPCErrorCode.InternalError, "Internal error");
        } else {
          return null;
        }
      };
    }
  });

  // ../../node_modules/.pnpm/json-rpc-2.0@1.7.1/node_modules/json-rpc-2.0/dist/server-and-client.js
  var require_server_and_client = __commonJS({
    "../../node_modules/.pnpm/json-rpc-2.0@1.7.1/node_modules/json-rpc-2.0/dist/server-and-client.js"(exports) {
      "use strict";
      var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
        function adopt(value) {
          return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
          });
        }
        return new (P || (P = Promise))(function(resolve, reject) {
          function fulfilled(value) {
            try {
              step(generator.next(value));
            } catch (e) {
              reject(e);
            }
          }
          function rejected(value) {
            try {
              step(generator["throw"](value));
            } catch (e) {
              reject(e);
            }
          }
          function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
          }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
      };
      var __generator = exports && exports.__generator || function(thisArg, body) {
        var _ = { label: 0, sent: function() {
          if (t[0] & 1) throw t[1];
          return t[1];
        }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
          return this;
        }), g;
        function verb(n) {
          return function(v) {
            return step([n, v]);
          };
        }
        function step(op) {
          if (f) throw new TypeError("Generator is already executing.");
          while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
              case 0:
              case 1:
                t = op;
                break;
              case 4:
                _.label++;
                return { value: op[1], done: false };
              case 5:
                _.label++;
                y = op[1];
                op = [0];
                continue;
              case 7:
                op = _.ops.pop();
                _.trys.pop();
                continue;
              default:
                if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                  _ = 0;
                  continue;
                }
                if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                  _.label = op[1];
                  break;
                }
                if (op[0] === 6 && _.label < t[1]) {
                  _.label = t[1];
                  t = op;
                  break;
                }
                if (t && _.label < t[2]) {
                  _.label = t[2];
                  _.ops.push(op);
                  break;
                }
                if (t[2]) _.ops.pop();
                _.trys.pop();
                continue;
            }
            op = body.call(thisArg, _);
          } catch (e) {
            op = [6, e];
            y = 0;
          } finally {
            f = t = 0;
          }
          if (op[0] & 5) throw op[1];
          return { value: op[0] ? op[1] : void 0, done: true };
        }
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.JSONRPCServerAndClient = void 0;
      var models_1 = require_models();
      var JSONRPCServerAndClient = (
        /** @class */
        (function() {
          function JSONRPCServerAndClient2(server, client, options) {
            if (options === void 0) {
              options = {};
            }
            var _a;
            this.server = server;
            this.client = client;
            this.errorListener = (_a = options.errorListener) !== null && _a !== void 0 ? _a : console.warn;
          }
          JSONRPCServerAndClient2.prototype.applyServerMiddleware = function() {
            var _a;
            var middlewares = [];
            for (var _i = 0; _i < arguments.length; _i++) {
              middlewares[_i] = arguments[_i];
            }
            (_a = this.server).applyMiddleware.apply(_a, middlewares);
          };
          JSONRPCServerAndClient2.prototype.hasMethod = function(name) {
            return this.server.hasMethod(name);
          };
          JSONRPCServerAndClient2.prototype.addMethod = function(name, method) {
            this.server.addMethod(name, method);
          };
          JSONRPCServerAndClient2.prototype.addMethodAdvanced = function(name, method) {
            this.server.addMethodAdvanced(name, method);
          };
          JSONRPCServerAndClient2.prototype.removeMethod = function(name) {
            this.server.removeMethod(name);
          };
          JSONRPCServerAndClient2.prototype.timeout = function(delay) {
            return this.client.timeout(delay);
          };
          JSONRPCServerAndClient2.prototype.request = function(method, params, clientParams) {
            return this.client.request(method, params, clientParams);
          };
          JSONRPCServerAndClient2.prototype.requestAdvanced = function(jsonRPCRequest, clientParams) {
            return this.client.requestAdvanced(jsonRPCRequest, clientParams);
          };
          JSONRPCServerAndClient2.prototype.notify = function(method, params, clientParams) {
            this.client.notify(method, params, clientParams);
          };
          JSONRPCServerAndClient2.prototype.rejectAllPendingRequests = function(message) {
            this.client.rejectAllPendingRequests(message);
          };
          JSONRPCServerAndClient2.prototype.receiveAndSend = function(payload, serverParams, clientParams) {
            return __awaiter(this, void 0, void 0, function() {
              var response, message;
              return __generator(this, function(_a) {
                switch (_a.label) {
                  case 0:
                    if (!((0, models_1.isJSONRPCResponse)(payload) || (0, models_1.isJSONRPCResponses)(payload))) return [3, 1];
                    this.client.receive(payload);
                    return [3, 4];
                  case 1:
                    if (!((0, models_1.isJSONRPCRequest)(payload) || (0, models_1.isJSONRPCRequests)(payload))) return [3, 3];
                    return [4, this.server.receive(payload, serverParams)];
                  case 2:
                    response = _a.sent();
                    if (response) {
                      return [2, this.client.send(response, clientParams)];
                    }
                    return [3, 4];
                  case 3:
                    message = "Received an invalid JSON-RPC message";
                    this.errorListener(message, payload);
                    return [2, Promise.reject(new Error(message))];
                  case 4:
                    return [
                      2
                      /*return*/
                    ];
                }
              });
            });
          };
          return JSONRPCServerAndClient2;
        })()
      );
      exports.JSONRPCServerAndClient = JSONRPCServerAndClient;
    }
  });

  // ../../node_modules/.pnpm/json-rpc-2.0@1.7.1/node_modules/json-rpc-2.0/dist/index.js
  var require_dist = __commonJS({
    "../../node_modules/.pnpm/json-rpc-2.0@1.7.1/node_modules/json-rpc-2.0/dist/index.js"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = { enumerable: true, get: function() {
            return m[k];
          } };
        }
        Object.defineProperty(o, k2, desc);
      }) : (function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
      }));
      var __exportStar = exports && exports.__exportStar || function(m, exports2) {
        for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding(exports2, m, p);
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      __exportStar(require_client(), exports);
      __exportStar(require_interfaces(), exports);
      __exportStar(require_models(), exports);
      __exportStar(require_server(), exports);
      __exportStar(require_server_and_client(), exports);
    }
  });

  // src/client.ts
  var client_exports = {};
  __export(client_exports, {
    createClientUPProvider: () => createClientUPProvider
  });
  var import_debug3 = __toESM(require_src());

  // ../../node_modules/.pnpm/eventemitter3@5.0.1/node_modules/eventemitter3/index.mjs
  var import_index = __toESM(require_eventemitter3(), 1);
  var eventemitter3_default = import_index.default;

  // src/client.ts
  var import_json_rpc_22 = __toESM(require_dist());

  // ../../node_modules/.pnpm/uuid@13.0.0/node_modules/uuid/dist-node/regex.js
  var regex_default = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/i;

  // ../../node_modules/.pnpm/uuid@13.0.0/node_modules/uuid/dist-node/validate.js
  function validate(uuid) {
    return typeof uuid === "string" && regex_default.test(uuid);
  }
  var validate_default = validate;

  // ../../node_modules/.pnpm/uuid@13.0.0/node_modules/uuid/dist-node/parse.js
  function parse(uuid) {
    if (!validate_default(uuid)) {
      throw TypeError("Invalid UUID");
    }
    let v;
    return Uint8Array.of((v = parseInt(uuid.slice(0, 8), 16)) >>> 24, v >>> 16 & 255, v >>> 8 & 255, v & 255, (v = parseInt(uuid.slice(9, 13), 16)) >>> 8, v & 255, (v = parseInt(uuid.slice(14, 18), 16)) >>> 8, v & 255, (v = parseInt(uuid.slice(19, 23), 16)) >>> 8, v & 255, (v = parseInt(uuid.slice(24, 36), 16)) / 1099511627776 & 255, v / 4294967296 & 255, v >>> 24 & 255, v >>> 16 & 255, v >>> 8 & 255, v & 255);
  }
  var parse_default = parse;

  // ../../node_modules/.pnpm/uuid@13.0.0/node_modules/uuid/dist-node/stringify.js
  var byteToHex = [];
  for (let i = 0; i < 256; ++i) {
    byteToHex.push((i + 256).toString(16).slice(1));
  }
  function unsafeStringify(arr, offset = 0) {
    return (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
  }

  // ../../node_modules/.pnpm/uuid@13.0.0/node_modules/uuid/dist-node/rng.js
  var import_node_crypto = __require("crypto");
  var rnds8Pool = new Uint8Array(256);
  var poolPtr = rnds8Pool.length;
  function rng() {
    if (poolPtr > rnds8Pool.length - 16) {
      (0, import_node_crypto.randomFillSync)(rnds8Pool);
      poolPtr = 0;
    }
    return rnds8Pool.slice(poolPtr, poolPtr += 16);
  }

  // ../../node_modules/.pnpm/uuid@13.0.0/node_modules/uuid/dist-node/v35.js
  function stringToBytes(str) {
    str = unescape(encodeURIComponent(str));
    const bytes = new Uint8Array(str.length);
    for (let i = 0; i < str.length; ++i) {
      bytes[i] = str.charCodeAt(i);
    }
    return bytes;
  }
  var DNS = "6ba7b810-9dad-11d1-80b4-00c04fd430c8";
  var URL2 = "6ba7b811-9dad-11d1-80b4-00c04fd430c8";
  function v35(version, hash, value, namespace, buf, offset) {
    const valueBytes = typeof value === "string" ? stringToBytes(value) : value;
    const namespaceBytes = typeof namespace === "string" ? parse_default(namespace) : namespace;
    if (typeof namespace === "string") {
      namespace = parse_default(namespace);
    }
    if (namespace?.length !== 16) {
      throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");
    }
    let bytes = new Uint8Array(16 + valueBytes.length);
    bytes.set(namespaceBytes);
    bytes.set(valueBytes, namespaceBytes.length);
    bytes = hash(bytes);
    bytes[6] = bytes[6] & 15 | version;
    bytes[8] = bytes[8] & 63 | 128;
    if (buf) {
      offset = offset || 0;
      for (let i = 0; i < 16; ++i) {
        buf[offset + i] = bytes[i];
      }
      return buf;
    }
    return unsafeStringify(bytes);
  }

  // ../../node_modules/.pnpm/uuid@13.0.0/node_modules/uuid/dist-node/native.js
  var import_node_crypto2 = __require("crypto");
  var native_default = { randomUUID: import_node_crypto2.randomUUID };

  // ../../node_modules/.pnpm/uuid@13.0.0/node_modules/uuid/dist-node/v4.js
  function _v4(options, buf, offset) {
    options = options || {};
    const rnds = options.random ?? options.rng?.() ?? rng();
    if (rnds.length < 16) {
      throw new Error("Random bytes length must be >= 16");
    }
    rnds[6] = rnds[6] & 15 | 64;
    rnds[8] = rnds[8] & 63 | 128;
    if (buf) {
      offset = offset || 0;
      if (offset < 0 || offset + 16 > buf.length) {
        throw new RangeError(`UUID byte range ${offset}:${offset + 15} is out of buffer bounds`);
      }
      for (let i = 0; i < 16; ++i) {
        buf[offset + i] = rnds[i];
      }
      return buf;
    }
    return unsafeStringify(rnds);
  }
  function v4(options, buf, offset) {
    if (native_default.randomUUID && !buf && !options) {
      return native_default.randomUUID();
    }
    return _v4(options, buf, offset);
  }
  var v4_default = v4;

  // ../../node_modules/.pnpm/uuid@13.0.0/node_modules/uuid/dist-node/sha1.js
  var import_node_crypto3 = __require("crypto");
  function sha1(bytes) {
    if (Array.isArray(bytes)) {
      bytes = Buffer.from(bytes);
    } else if (typeof bytes === "string") {
      bytes = Buffer.from(bytes, "utf8");
    }
    return (0, import_node_crypto3.createHash)("sha1").update(bytes).digest();
  }
  var sha1_default = sha1;

  // ../../node_modules/.pnpm/uuid@13.0.0/node_modules/uuid/dist-node/v5.js
  function v5(value, namespace, buf, offset) {
    return v35(80, sha1_default, value, namespace, buf, offset);
  }
  v5.DNS = DNS;
  v5.URL = URL2;
  var v5_default = v5;

  // src/UniversalProfiles_Apps_Logo_96px.svg.ts
  var image = `<?xml version="1.0" encoding="UTF-8"?><svg version="1.1" viewBox="0 0 205 205" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><style type="text/css">
	.st0{fill:none;stroke:url(#a);stroke-width:5;stroke-miterlimit:10;}
	.st1{fill:none;stroke:url(#SVGID_00000056389333576465390850000010798922027916692147_);stroke-width:5;stroke-miterlimit:10;}
	.st2{fill:none;stroke:url(#SVGID_00000051380137365445111330000009167280533949070741_);stroke-width:5;stroke-miterlimit:10;}
	.st3{fill:none;stroke:url(#SVGID_00000047778497278181544540000005454496077506244747_);stroke-width:5;stroke-miterlimit:10;}
	.st4{fill:none;stroke:url(#SVGID_00000158713292131007947860000004514829925534755714_);stroke-width:5;stroke-miterlimit:10;}
	.st5{fill:none;stroke:url(#SVGID_00000176752301671797505420000008656037770344976573_);stroke-width:5;stroke-miterlimit:10;}
	.st6{fill:none;stroke:url(#SVGID_00000019668949540468568120000000864275969910642319_);stroke-width:5;stroke-miterlimit:10;}
	.st7{fill:none;stroke:url(#SVGID_00000047054428014998274810000000046417757098061213_);stroke-width:5;stroke-miterlimit:10;}
	.st8{fill:none;stroke:url(#SVGID_00000022549651360086842380000007881063083396207791_);stroke-width:5;stroke-miterlimit:10;}
	.st9{fill:none;stroke:url(#SVGID_00000130631511062807885040000011931776790515364762_);stroke-width:5;stroke-miterlimit:10;}
	.st10{fill:none;stroke:url(#SVGID_00000014605678686996040940000017393520465879767969_);stroke-width:5;stroke-miterlimit:10;}
	.st11{fill:none;stroke:url(#SVGID_00000163756482267622025550000014979451267598818966_);stroke-width:5;stroke-miterlimit:10;}
	.st12{fill:none;stroke:url(#SVGID_00000124141954871206116560000005273572469214934666_);stroke-width:5;stroke-miterlimit:10;}
	.st13{fill:none;stroke:url(#SVGID_00000105408899360936988710000010273703361233894794_);stroke-width:5;stroke-miterlimit:10;}
	.st14{fill:none;stroke:url(#SVGID_00000105426278926465751030000016934798543375658152_);stroke-width:5;stroke-miterlimit:10;}
	.st15{fill:none;stroke:url(#SVGID_00000123402864351232224400000005626520335657750453_);stroke-width:5;stroke-miterlimit:10;}
	.st16{fill:none;stroke:url(#SVGID_00000054240225344145864930000004454693569321605311_);stroke-width:5;stroke-miterlimit:10;}
	.st17{fill:none;stroke:url(#SVGID_00000165198640681901127460000012866876033927105466_);stroke-width:5;stroke-miterlimit:10;}
	.st18{fill:none;stroke:url(#SVGID_00000010296938220999196390000009217749098280550545_);stroke-width:5;stroke-miterlimit:10;}
	.st19{fill:none;stroke:url(#SVGID_00000034073387945625344930000006656368762102967742_);stroke-width:5;stroke-miterlimit:10;}
	.st20{fill:none;stroke:url(#SVGID_00000176743270661283872710000018309169195545041059_);stroke-width:5;stroke-miterlimit:10;}
	.st21{fill:none;stroke:url(#SVGID_00000015315768876778818720000011431544963531332520_);stroke-width:5;stroke-miterlimit:10;}
	.st22{fill:none;stroke:url(#SVGID_00000027562111282714744500000005490249511516742272_);stroke-width:5;stroke-miterlimit:10;}
	.st23{fill:none;stroke:url(#SVGID_00000127742865247414638530000010753077084961061270_);stroke-width:5;stroke-miterlimit:10;}
	.st24{fill:none;stroke:url(#SVGID_00000101789324830174438290000009297370073624241576_);stroke-width:5;stroke-miterlimit:10;}
	.st25{fill:none;stroke:url(#SVGID_00000017500845606749358970000015230857459735047856_);stroke-width:5;stroke-miterlimit:10;}
	.st26{fill:none;stroke:url(#SVGID_00000091015942850621393280000009022728536804063160_);stroke-width:5;stroke-miterlimit:10;}
	.st27{fill:none;stroke:url(#SVGID_00000090989720155308621060000010240571899488221826_);stroke-width:5;stroke-miterlimit:10;}
	.st28{fill:none;stroke:url(#SVGID_00000129902600288722924760000008573063894180376961_);stroke-width:5;stroke-miterlimit:10;}
	.st29{fill:none;stroke:url(#SVGID_00000058583537738930683450000015023544084554769294_);stroke-width:5;stroke-miterlimit:10;}
	.st30{fill:none;stroke:url(#SVGID_00000003804661720899413000000008401752229313256105_);stroke-width:5;stroke-miterlimit:10;}
	.st31{fill:none;stroke:url(#SVGID_00000085963063803388969600000003208953804493595038_);stroke-width:5;stroke-miterlimit:10;}
	.st32{fill:none;stroke:url(#SVGID_00000072966978096607921080000017898876817739748490_);stroke-width:5;stroke-miterlimit:10;}
	.st33{fill:none;stroke:url(#SVGID_00000044868694292747046660000008821631534945180843_);stroke-width:5;stroke-miterlimit:10;}
	.st34{fill:none;stroke:url(#SVGID_00000137112799151377606860000014693891205085347256_);stroke-width:5;stroke-miterlimit:10;}
	.st35{fill:none;stroke:url(#SVGID_00000002382026647477974920000016183252234771263910_);stroke-width:5;stroke-miterlimit:10;}
	.st36{fill:none;stroke:url(#SVGID_00000084525857658817268560000010083959727551026334_);stroke-width:5;stroke-miterlimit:10;}
	.st37{fill:none;stroke:url(#SVGID_00000070111086173007299860000009434208121563659443_);stroke-width:5;stroke-miterlimit:10;}
	.st38{fill:none;stroke:url(#SVGID_00000102505790783277835730000000964811951744520072_);stroke-width:5;stroke-miterlimit:10;}
	.st39{fill:none;stroke:url(#SVGID_00000165915544478628760480000016922512963244969366_);stroke-width:5;stroke-miterlimit:10;}
	.st40{fill:none;stroke:url(#SVGID_00000089546558642276323190000005391279568885040006_);stroke-width:5;stroke-miterlimit:10;}
	.st41{fill:none;stroke:url(#SVGID_00000167378843446581152770000011707843822981528194_);stroke-width:5;stroke-miterlimit:10;}
	.st42{fill:none;stroke:url(#SVGID_00000168119232016106846570000013419701087766081454_);stroke-width:5;stroke-miterlimit:10;}
	.st43{fill:none;stroke:url(#SVGID_00000167394825817402548920000002075089606777446556_);stroke-width:5;stroke-miterlimit:10;}
	.st44{fill:none;stroke:url(#SVGID_00000084510851761702941550000009477386628738193292_);stroke-width:5;stroke-miterlimit:10;}
	.st45{fill:none;stroke:url(#SVGID_00000056408517440310375340000010264108419479253922_);stroke-width:5;stroke-miterlimit:10;}
	.st46{fill:none;stroke:url(#SVGID_00000052089677177323945810000003568789998996187573_);stroke-width:5;stroke-miterlimit:10;}
	.st47{fill:none;stroke:url(#SVGID_00000014623913530728028500000013543833695712392346_);stroke-width:5;stroke-miterlimit:10;}
	.st48{fill:none;stroke:url(#SVGID_00000013154695334869467910000006421302680227263405_);stroke-width:5;stroke-miterlimit:10;}
	.st49{fill:none;stroke:url(#SVGID_00000050623051460253816960000007532467332512672433_);stroke-width:5;stroke-miterlimit:10;}
	.st50{fill:none;stroke:url(#SVGID_00000134218795595679531370000003351303235943955639_);stroke-width:5;stroke-miterlimit:10;}
	.st51{fill:none;stroke:url(#SVGID_00000181057842005773389870000005696612509835399060_);stroke-width:5;stroke-miterlimit:10;}
	.st52{fill:none;stroke:url(#SVGID_00000078742114689626592490000017020225732925789618_);stroke-width:5;stroke-miterlimit:10;}
	.st53{fill:none;stroke:url(#SVGID_00000028290209729755355380000012203081210844865168_);stroke-width:5;stroke-miterlimit:10;}
	.st54{fill:none;stroke:url(#SVGID_00000079455762041076334420000005898854641888466571_);stroke-width:5;stroke-miterlimit:10;}
	.st55{fill:none;stroke:url(#SVGID_00000091734002111818624060000017394333686986493568_);stroke-width:5;stroke-miterlimit:10;}
	.st56{fill:none;stroke:url(#SVGID_00000111182052283944150350000017412150973607273876_);stroke-width:5;stroke-miterlimit:10;}
	.st57{fill:none;stroke:url(#SVGID_00000101065227870351957860000010885497696594366378_);stroke-width:5;stroke-miterlimit:10;}
	.st58{fill:none;stroke:url(#SVGID_00000133511354585973938690000010310522060030073753_);stroke-width:5;stroke-miterlimit:10;}
	.st59{fill:none;stroke:url(#SVGID_00000165233680036648094120000006698224943178494357_);stroke-width:5;stroke-miterlimit:10;}
	.st60{fill:none;stroke:url(#SVGID_00000098904833180917867920000017049053739982670468_);stroke-width:5;stroke-miterlimit:10;}
	.st61{fill:none;stroke:url(#SVGID_00000167366533717241253010000012344196281903811732_);stroke-width:5;stroke-miterlimit:10;}
	.st62{fill:none;stroke:url(#SVGID_00000142889411660844436240000005312836201473624710_);stroke-width:5;stroke-miterlimit:10;}
	.st63{fill:none;stroke:url(#SVGID_00000139269393346137155550000011716049963213405095_);stroke-width:5;stroke-miterlimit:10;}
	.st64{fill:none;stroke:url(#SVGID_00000093876980850354128010000014534565552025921462_);stroke-width:5;stroke-miterlimit:10;}
	.st65{fill:none;stroke:url(#SVGID_00000136373109140918354470000006171493265636621979_);stroke-width:5;stroke-miterlimit:10;}
	.st66{fill:none;stroke:url(#SVGID_00000150077671619754085120000016153201097528477579_);stroke-width:5;stroke-miterlimit:10;}
	.st67{fill:none;stroke:url(#SVGID_00000029017252934418598770000000823255553040305052_);stroke-width:5;stroke-miterlimit:10;}
	.st68{fill:none;stroke:url(#SVGID_00000112604373331140592300000014777117207542942640_);stroke-width:5;stroke-miterlimit:10;}
	.st69{fill:none;stroke:url(#SVGID_00000116946114276402661480000004378529819849870774_);stroke-width:5;stroke-miterlimit:10;}
	.st70{fill:none;stroke:url(#SVGID_00000102506886172947022540000017343173005075878812_);stroke-width:5;stroke-miterlimit:10;}
	.st71{fill:none;stroke:url(#SVGID_00000124840978928821080400000002281832406117525145_);stroke-width:5;stroke-miterlimit:10;}
	.st72{fill:none;stroke:url(#SVGID_00000170245617588902170720000006912587284346141320_);stroke-width:5;stroke-miterlimit:10;}
	.st73{fill:none;stroke:url(#SVGID_00000083776943110666405990000011471330538153760389_);stroke-width:5;stroke-miterlimit:10;}
	.st74{fill:none;stroke:url(#SVGID_00000146502060470899465010000001250791755231580862_);stroke-width:5;stroke-miterlimit:10;}
	.st75{fill:none;stroke:url(#SVGID_00000088819347351791242500000013107193007155670658_);stroke-width:5;stroke-miterlimit:10;}
	.st76{fill:none;stroke:url(#SVGID_00000098192921558647243650000011278677112161862294_);stroke-width:5;stroke-miterlimit:10;}
	.st77{fill:none;stroke:url(#SVGID_00000042007395515809536850000003183848658102735764_);stroke-width:5;stroke-miterlimit:10;}
	.st78{fill:none;stroke:url(#SVGID_00000097490746738385962170000002570786228642433967_);stroke-width:5;stroke-miterlimit:10;}
	.st79{fill:none;stroke:url(#SVGID_00000069365943264275782720000017179113781878133889_);stroke-width:5;stroke-miterlimit:10;}
	.st80{fill:none;stroke:url(#SVGID_00000034055757277602214150000003488284017013618311_);stroke-width:5;stroke-miterlimit:10;}
	.st81{fill:none;stroke:url(#SVGID_00000034777787907783757330000016252589249423194299_);stroke-width:5;stroke-miterlimit:10;}
	.st82{fill:none;stroke:url(#SVGID_00000106135745597918267070000000004239942053515183_);stroke-width:5;stroke-miterlimit:10;}
	.st83{fill:none;stroke:url(#SVGID_00000145772689669218015590000007105130906213875112_);stroke-width:5;stroke-miterlimit:10;}
	.st84{fill:none;stroke:url(#SVGID_00000013891897453760358770000017670402668518874778_);stroke-width:5;stroke-miterlimit:10;}
	.st85{fill:none;stroke:url(#SVGID_00000109732427888582968050000015066209310374742680_);stroke-width:5;stroke-miterlimit:10;}
	.st86{fill:none;stroke:url(#SVGID_00000047741154486080417310000014664027673370821766_);stroke-width:5;stroke-miterlimit:10;}
	.st87{fill:none;stroke:url(#SVGID_00000068635049878208944190000000533216387174909059_);stroke-width:5;stroke-miterlimit:10;}
	.st88{fill:none;stroke:url(#SVGID_00000013153300998308834300000001513174756982371207_);stroke-width:5;stroke-miterlimit:10;}
	.st89{fill:none;stroke:url(#SVGID_00000106124814921120210160000014679919063178231999_);stroke-width:5;stroke-miterlimit:10;}
	.st90{fill:none;stroke:url(#SVGID_00000161619652674751969170000001829736489751934088_);stroke-width:5;stroke-miterlimit:10;}
	.st91{fill:none;stroke:url(#SVGID_00000109007922325232383460000003552756348063800755_);stroke-width:5;stroke-miterlimit:10;}
	.st92{fill:none;stroke:url(#SVGID_00000111183555827063523980000013185562189890078375_);stroke-width:5;stroke-miterlimit:10;}
	.st93{fill:none;stroke:url(#SVGID_00000031165850742261718760000004777964438470868656_);stroke-width:5;stroke-miterlimit:10;}
	.st94{fill:none;stroke:url(#SVGID_00000090274996417041406300000004039395265917733272_);stroke-width:5;stroke-miterlimit:10;}
	.st95{fill:none;stroke:url(#SVGID_00000065768075922874117940000017538962735675953081_);stroke-width:5;stroke-miterlimit:10;}
	.st96{fill:none;stroke:url(#SVGID_00000148646919575503628150000007519633719793660573_);stroke-width:5;stroke-miterlimit:10;}
	.st97{fill:none;stroke:url(#SVGID_00000065790763276290639510000000201118417240643772_);stroke-width:5;stroke-miterlimit:10;}
	.st98{fill:none;stroke:url(#SVGID_00000075164235789427125460000000104372776398630326_);stroke-width:5;stroke-miterlimit:10;}
	.st99{fill:none;stroke:url(#SVGID_00000057864297585687382250000018210493985566754213_);stroke-width:5;stroke-miterlimit:10;}
	.st100{fill:none;stroke:url(#SVGID_00000045595445976607013190000008611366245250715571_);stroke-width:5;stroke-miterlimit:10;}
	.st101{fill:none;stroke:url(#SVGID_00000182523556723523056900000003483506746862807217_);stroke-width:5;stroke-miterlimit:10;}
	.st102{fill:none;stroke:#757EB4;stroke-width:5;stroke-miterlimit:10;}
	.st103{fill:none;stroke:url(#SVGID_00000128453970100024162880000006547400476427467172_);stroke-width:5;stroke-miterlimit:10;}
	.st104{fill:none;stroke:url(#SVGID_00000125577602961606391520000010114338921627474585_);stroke-width:5;stroke-miterlimit:10;}
	.st105{fill:none;stroke:url(#SVGID_00000043456621670713235080000002553250403372169349_);stroke-width:5;stroke-miterlimit:10;}
	.st106{fill:none;stroke:url(#SVGID_00000127733790326717246900000007594342496987171232_);stroke-width:5;stroke-miterlimit:10;}
	.st107{fill:none;stroke:url(#SVGID_00000134231686295055524420000015061697689259460504_);stroke-width:5;stroke-miterlimit:10;}
	.st108{fill:none;stroke:url(#SVGID_00000108995926887150032590000005303979745435875213_);stroke-width:5;stroke-miterlimit:10;}
	.st109{fill:none;stroke:url(#SVGID_00000081642644150793862560000002022914590133615540_);stroke-width:5;stroke-miterlimit:10;}
	.st110{fill:none;stroke:url(#SVGID_00000041991226162332262860000001184417984240518041_);stroke-width:5;stroke-miterlimit:10;}
	.st111{fill:none;stroke:url(#SVGID_00000093893608351242965810000000487807601985913227_);stroke-width:5;stroke-miterlimit:10;}
	.st112{fill:none;stroke:url(#SVGID_00000034770163552112952210000007871950429685271683_);stroke-width:5;stroke-miterlimit:10;}
	.st113{fill:none;stroke:url(#SVGID_00000059989381983490265650000002034466747055463810_);stroke-width:5;stroke-miterlimit:10;}
	.st114{fill:none;stroke:url(#SVGID_00000125583506688367613870000018154196008315070119_);stroke-width:5;stroke-miterlimit:10;}
	.st115{fill:none;stroke:url(#SVGID_00000117646387355380661340000009334399988584140206_);stroke-width:5;stroke-miterlimit:10;}
	.st116{fill:none;stroke:url(#SVGID_00000013156276316353635230000016654269340791251641_);stroke-width:5;stroke-miterlimit:10;}
	.st117{fill:none;stroke:url(#SVGID_00000088845125758224684120000011621715175913805477_);stroke-width:5;stroke-miterlimit:10;}
	.st118{fill:none;stroke:url(#SVGID_00000062915054326126352380000010623612336048119957_);stroke-width:5;stroke-miterlimit:10;}
	.st119{fill:none;stroke:url(#SVGID_00000003806561593149220910000013267903521237113258_);stroke-width:5;stroke-miterlimit:10;}
	.st120{fill:none;stroke:url(#SVGID_00000134214034514871549610000003118520003330203270_);stroke-width:5;stroke-miterlimit:10;}
	.st121{fill:none;stroke:url(#SVGID_00000093167656965168574160000012240056245346630052_);stroke-width:5;stroke-miterlimit:10;}
	.st122{fill:none;stroke:url(#SVGID_00000174562443250177689320000005287945487715485063_);stroke-width:5;stroke-miterlimit:10;}
	.st123{fill:none;stroke:url(#SVGID_00000052817053787295771590000006134066193763166905_);stroke-width:5;stroke-miterlimit:10;}
	.st124{fill:none;stroke:url(#SVGID_00000036946792550920911210000007255713389976622504_);stroke-width:5;stroke-miterlimit:10;}
	.st125{fill:none;stroke:url(#SVGID_00000122686371442761706510000010773293858743901092_);stroke-width:5;stroke-miterlimit:10;}
	.st126{fill:none;stroke:url(#SVGID_00000183249709875249145880000016011354232562626727_);stroke-width:5;stroke-miterlimit:10;}
	.st127{fill:none;stroke:url(#SVGID_00000100358747981352865260000010977000215790911415_);stroke-width:5;stroke-miterlimit:10;}
	.st128{fill:none;stroke:url(#SVGID_00000160186203872389779700000007114474660579329686_);stroke-width:5;stroke-miterlimit:10;}
	.st129{fill:none;stroke:url(#SVGID_00000013160889052283306520000003996384242507041700_);stroke-width:5;stroke-miterlimit:10;}
	.st130{fill:none;stroke:url(#SVGID_00000127015761217743178200000016662411473063658123_);stroke-width:5;stroke-miterlimit:10;}
	.st131{fill:none;stroke:url(#SVGID_00000052802537056054924190000005603056556094689201_);stroke-width:5;stroke-miterlimit:10;}
	.st132{fill:none;stroke:url(#SVGID_00000114071916312341561010000005455098366248001423_);stroke-width:5;stroke-miterlimit:10;}
	.st133{fill:none;stroke:url(#SVGID_00000171714174242819446000000009744124901989503914_);stroke-width:5;stroke-miterlimit:10;}
	.st134{fill:none;stroke:url(#SVGID_00000043417465350265472470000017938710855653009580_);stroke-width:5;stroke-miterlimit:10;}
	.st135{fill:none;stroke:url(#SVGID_00000011018780746824428810000004261442624854604185_);stroke-width:5;stroke-miterlimit:10;}
	.st136{fill:none;stroke:url(#SVGID_00000134957448699195559800000006934429449926047130_);stroke-width:5;stroke-miterlimit:10;}
	.st137{fill:none;stroke:url(#SVGID_00000055677743805044780280000016506373066881847960_);stroke-width:5;stroke-miterlimit:10;}
	.st138{fill:none;stroke:url(#SVGID_00000038410718236291877190000018440957628807735961_);stroke-width:5;stroke-miterlimit:10;}
	.st139{fill:none;stroke:url(#SVGID_00000100352911268009459830000001175268917907061157_);stroke-width:5;stroke-miterlimit:10;}
	.st140{fill:none;stroke:url(#SVGID_00000010284569549211818030000000679282970688672900_);stroke-width:5;stroke-miterlimit:10;}
	.st141{fill:none;stroke:url(#SVGID_00000084492680296000541010000000530088054040073856_);stroke-width:5;stroke-miterlimit:10;}
	.st142{fill:none;stroke:url(#SVGID_00000029754489504380711860000009440471718934714813_);stroke-width:5;stroke-miterlimit:10;}
	.st143{fill:none;stroke:url(#SVGID_00000139252841737307596300000002431117634795570068_);stroke-width:5;stroke-miterlimit:10;}
	.st144{fill:none;stroke:url(#SVGID_00000054239915491683840770000005430746058649738664_);stroke-width:5;stroke-miterlimit:10;}
	.st145{fill:none;stroke:url(#SVGID_00000132070142119578294570000010307998783161211285_);stroke-width:5;stroke-miterlimit:10;}
	.st146{fill:none;stroke:url(#SVGID_00000029017975496332145100000010423097961941432458_);stroke-width:5;stroke-miterlimit:10;}
	.st147{fill:none;stroke:url(#SVGID_00000160171018853486708930000017245322569085794967_);stroke-width:5;stroke-miterlimit:10;}
	.st148{fill:none;stroke:url(#SVGID_00000115514444799447629560000006038347170468476858_);stroke-width:5;stroke-miterlimit:10;}
	.st149{fill:none;stroke:url(#SVGID_00000073681575907552194520000004453507388697710253_);stroke-width:5;stroke-miterlimit:10;}
	.st150{fill:none;stroke:url(#SVGID_00000008131888057925507410000014135654435796038547_);stroke-width:5;stroke-miterlimit:10;}
	.st151{fill:none;stroke:url(#SVGID_00000114766854745708244490000003491137928265155742_);stroke-width:5;stroke-miterlimit:10;}
	.st152{fill:none;stroke:url(#SVGID_00000137822457993682600630000008116636510510267270_);stroke-width:5;stroke-miterlimit:10;}
	.st153{fill:none;stroke:url(#SVGID_00000065787355192961699780000002216316436222616741_);stroke-width:5;stroke-miterlimit:10;}
	.st154{fill:none;stroke:url(#SVGID_00000158751041575611506820000000021107695557966012_);stroke-width:5;stroke-miterlimit:10;}
	.st155{fill:none;stroke:url(#SVGID_00000080919362883751060930000016023686073584905866_);stroke-width:5;stroke-miterlimit:10;}
	.st156{fill:none;stroke:url(#SVGID_00000135680139157801466770000009616510136904981171_);stroke-width:5;stroke-miterlimit:10;}
	.st157{fill:none;stroke:url(#SVGID_00000139295392992611807310000002273691859038170785_);stroke-width:5;stroke-miterlimit:10;}
	.st158{fill:none;stroke:url(#SVGID_00000124854444813742982250000016827023168389575316_);stroke-width:5;stroke-miterlimit:10;}
	.st159{fill:none;stroke:url(#SVGID_00000051362107904549324810000013420088189427568015_);stroke-width:5;stroke-miterlimit:10;}
	.st160{fill:none;stroke:url(#SVGID_00000069400308146107686460000011750810831821115063_);stroke-width:5;stroke-miterlimit:10;}
	.st161{fill:none;stroke:url(#SVGID_00000060709860605794185320000003429035099515703985_);stroke-width:5;stroke-miterlimit:10;}
	.st162{fill:none;stroke:url(#SVGID_00000107578078134441303370000007124048552455332515_);stroke-width:5;stroke-miterlimit:10;}
	.st163{fill:none;stroke:url(#SVGID_00000134221215268321318030000013626773960072020394_);stroke-width:5;stroke-miterlimit:10;}
	.st164{fill:none;stroke:url(#SVGID_00000102543157236958984970000012940659604655003539_);stroke-width:5;stroke-miterlimit:10;}
	.st165{fill:none;stroke:url(#SVGID_00000111157975911645384150000011796497375106214280_);stroke-width:5;stroke-miterlimit:10;}
	.st166{fill:none;stroke:url(#SVGID_00000095329415028924284430000008428684107072686505_);stroke-width:5;stroke-miterlimit:10;}
	.st167{fill:none;stroke:url(#SVGID_00000014621035806541151170000000467916282088546743_);stroke-width:5;stroke-miterlimit:10;}
	.st168{fill:none;stroke:url(#SVGID_00000172411910706464202030000007880271469304968856_);stroke-width:5;stroke-miterlimit:10;}
	.st169{fill:none;stroke:url(#SVGID_00000097467632177454747130000015920272161035589532_);stroke-width:5;stroke-miterlimit:10;}
	.st170{fill:none;stroke:url(#SVGID_00000018224847520583304110000010375332986654869179_);stroke-width:5;stroke-miterlimit:10;}
	.st171{fill:none;stroke:url(#SVGID_00000153683488792605754090000013964904151400417215_);stroke-width:5;stroke-miterlimit:10;}
	.st172{fill:none;stroke:url(#SVGID_00000096742079297961558140000013113367150666350734_);stroke-width:5;stroke-miterlimit:10;}
	.st173{fill:none;stroke:url(#SVGID_00000109026582917991442220000015325860948827979400_);stroke-width:5;stroke-miterlimit:10;}
	.st174{fill:none;stroke:url(#SVGID_00000072269672573927719180000006184419712149187749_);stroke-width:5;stroke-miterlimit:10;}
	.st175{fill:none;stroke:url(#SVGID_00000031913224269419552560000001186399608601714059_);stroke-width:5;stroke-miterlimit:10;}
	.st176{fill:none;stroke:url(#SVGID_00000090275425151096046310000009247821072575841430_);stroke-width:5;stroke-miterlimit:10;}
	.st177{fill:none;stroke:url(#SVGID_00000157281797883690809350000001707011766559905155_);stroke-width:5;stroke-miterlimit:10;}
	.st178{fill:none;stroke:url(#SVGID_00000001626050341965524590000014181443492502809737_);stroke-width:5;stroke-miterlimit:10;}
	.st179{fill:none;stroke:url(#SVGID_00000085235159434903551850000001914556320944674439_);stroke-width:5;stroke-miterlimit:10;}
	.st180{fill:none;stroke:url(#SVGID_00000096758145765871038250000011271958903353428378_);stroke-width:5;stroke-miterlimit:10;}
	.st181{fill:none;stroke:url(#SVGID_00000114782939256225768450000008730694137816860303_);stroke-width:5;stroke-miterlimit:10;}
	.st182{fill:none;stroke:url(#SVGID_00000107554747513931422210000002541858802449964945_);stroke-width:5;stroke-miterlimit:10;}
	.st183{fill:none;stroke:url(#SVGID_00000116931614747529790790000010855112819507358875_);stroke-width:5;stroke-miterlimit:10;}
	.st184{fill:none;stroke:url(#SVGID_00000105427415909295254790000000185738707286971008_);stroke-width:5;stroke-miterlimit:10;}
	.st185{fill:none;stroke:url(#SVGID_00000093894616006804096910000000639750542531299007_);stroke-width:5;stroke-miterlimit:10;}
	.st186{fill:none;stroke:url(#SVGID_00000063606025823076849130000009664112137161458359_);stroke-width:5;stroke-miterlimit:10;}
	.st187{fill:none;stroke:url(#SVGID_00000070799235951359580930000001361700777049503385_);stroke-width:5;stroke-miterlimit:10;}
	.st188{fill:none;stroke:url(#SVGID_00000163781170011613723670000004132486132229631162_);stroke-width:5;stroke-miterlimit:10;}
	.st189{fill:none;stroke:url(#SVGID_00000067951913084904503850000003097681837288707201_);stroke-width:5;stroke-miterlimit:10;}
	.st190{fill:none;stroke:url(#SVGID_00000059268952404469204420000010043136548961333149_);stroke-width:5;stroke-miterlimit:10;}
	.st191{fill:none;stroke:url(#SVGID_00000098937868177210759360000008850743351685897379_);stroke-width:5;stroke-miterlimit:10;}
	.st192{fill:none;stroke:url(#SVGID_00000124148318205264145110000011011237420395773848_);stroke-width:5;stroke-miterlimit:10;}
	.st193{fill:none;stroke:url(#SVGID_00000166647236732747623210000003974681264039691157_);stroke-width:5;stroke-miterlimit:10;}
	.st194{fill:none;stroke:url(#SVGID_00000004527251796857997850000017231720107554392742_);stroke-width:5;stroke-miterlimit:10;}
	.st195{fill:none;stroke:url(#SVGID_00000156548031804148300400000004347254282148332674_);stroke-width:5;stroke-miterlimit:10;}
	.st196{fill:none;stroke:url(#SVGID_00000111160500733791294190000016105503294234803387_);stroke-width:5;stroke-miterlimit:10;}
	.st197{fill:none;stroke:url(#SVGID_00000008107883777863030950000006104525450370205858_);stroke-width:5;stroke-miterlimit:10;}
	.st198{fill:none;stroke:url(#SVGID_00000144324191436601783660000015887365208115143040_);stroke-width:5;stroke-miterlimit:10;}
	.st199{fill:none;stroke:url(#SVGID_00000066517959197972028490000009881444364898800569_);stroke-width:5;stroke-miterlimit:10;}
	.st200{fill:none;stroke:url(#SVGID_00000113345733670153472110000003330974647446081666_);stroke-width:5;stroke-miterlimit:10;}
	.st201{fill:none;stroke:url(#SVGID_00000151512322988953826230000000068956367469679745_);stroke-width:5;stroke-miterlimit:10;}
	.st202{fill:none;stroke:url(#SVGID_00000088828810278578599610000007670743873603350939_);stroke-width:5;stroke-miterlimit:10;}
	.st203{fill:none;stroke:url(#SVGID_00000001653351069891019140000013659089616142036138_);stroke-width:5;stroke-miterlimit:10;}
	.st204{clip-path:url(#SVGID_00000063600701861291676710000014449124631234970538_);}
	.st205{fill:#989898;}
	.st206{fill:#A2A1A1;}
	.st207{fill:#ACABAA;}
	.st208{fill:#B6B4B4;}
	.st209{fill:#C0BFBE;}
	.st210{fill:#CCCACA;}
	.st211{fill:#D7D5D5;}
	.st212{fill:#E3E1E1;}
	.st213{fill:#EFEEED;}
	.st214{fill:#FFFFFF;}
	.st215{fill:#F6F5F5;}
	.st216{fill:#F0EFEF;}
	.st217{fill:#EBEAE9;}
	.st218{fill:#E5E4E4;}
	.st219{fill:#E0DFDF;}
	.st220{fill:#DBDADA;}
	.st221{fill:#D5D5D5;}
	.st222{fill:#D1D1D1;}
	.st223{fill:#CCCBCB;}
</style><g transform="translate(-25.5,-25.5)"><linearGradient id="a" x1="66.676" x2="189.32" y1="21.784" y2="234.22" gradientUnits="userSpaceOnUse"><stop stop-color="#8991C5" offset="0"/><stop stop-color="#414A73" offset="1"/></linearGradient><path class="st0" d="m183.14 228h-110.28c-24.67 0-44.86-20.19-44.86-44.86v-110.28c0-24.67 20.19-44.86 44.86-44.86h110.28c24.67 0 44.86 20.19 44.86 44.86v110.28c0 24.67-20.19 44.86-44.86 44.86z" stroke="url(#a)"/><linearGradient id="bn" x1="66.795" x2="189.21" y1="21.989" y2="234.01" gradientUnits="userSpaceOnUse"><stop stop-color="#8991C5" offset="0"/><stop stop-color="#414A73" offset="1"/></linearGradient><path d="m183.03 227.8h-110.06c-24.62 0-44.77-20.15-44.77-44.77v-110.06c0-24.62 20.15-44.77 44.77-44.77h110.06c24.62 0 44.77 20.15 44.77 44.77v110.06c0 24.63-20.14 44.77-44.77 44.77z" fill="none" stroke="url(#bn)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="cz" x1="66.914" x2="189.09" y1="22.195" y2="233.8" gradientUnits="userSpaceOnUse"><stop stop-color="#8991C5" offset="0"/><stop stop-color="#414A73" offset="1"/></linearGradient><path d="m182.92 227.6h-109.84c-24.58 0-44.68-20.11-44.68-44.68v-109.84c0-24.58 20.1-44.68 44.68-44.68h109.84c24.58 0 44.68 20.11 44.68 44.68v109.84c0 24.58-20.1 44.68-44.68 44.68z" fill="none" stroke="url(#cz)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="fj" x1="67.033" x2="188.97" y1="22.401" y2="233.6" gradientUnits="userSpaceOnUse"><stop stop-color="#8991C5" offset="0"/><stop stop-color="#424A74" offset="1"/></linearGradient><path d="m182.81 227.41h-109.62c-24.53 0-44.59-20.07-44.59-44.59v-109.63c0-24.53 20.07-44.59 44.59-44.59h109.63c24.53 0 44.59 20.07 44.59 44.59v109.63c0 24.52-20.07 44.59-44.6 44.59z" fill="none" stroke="url(#fj)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="ey" x1="67.151" x2="188.85" y1="22.607" y2="233.39" gradientUnits="userSpaceOnUse"><stop stop-color="#8991C5" offset="0"/><stop stop-color="#424A74" offset="1"/></linearGradient><path d="m182.7 227.21h-109.4c-24.48 0-44.5-20.03-44.5-44.5v-109.41c0-24.48 20.03-44.5 44.5-44.5h109.4c24.48 0 44.5 20.03 44.5 44.5v109.4c0.01 24.48-20.02 44.51-44.5 44.51z" fill="none" stroke="url(#ey)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="ep" x1="67.27" x2="188.73" y1="22.813" y2="233.19" gradientUnits="userSpaceOnUse"><stop stop-color="#8991C5" offset="0"/><stop stop-color="#424B74" offset="1"/></linearGradient><path d="m182.59 227.01h-109.18c-24.43 0-44.42-19.99-44.42-44.42v-109.18c0-24.43 19.99-44.42 44.42-44.42h109.19c24.43 0 44.42 19.99 44.42 44.42v109.19c-0.01 24.42-20 44.41-44.43 44.41z" fill="none" stroke="url(#ep)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="j" x1="67.389" x2="188.61" y1="23.019" y2="232.98" gradientUnits="userSpaceOnUse"><stop stop-color="#8991C5" offset="0"/><stop stop-color="#424B74" offset="1"/></linearGradient><path d="m182.49 226.81h-108.98c-24.38 0-44.33-19.95-44.33-44.33v-108.97c0-24.38 19.95-44.33 44.33-44.33h108.97c24.38 0 44.33 19.95 44.33 44.33v108.97c0 24.39-19.94 44.33-44.32 44.33z" fill="none" stroke="url(#j)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="cw" x1="67.508" x2="188.49" y1="23.225" y2="232.78" gradientUnits="userSpaceOnUse"><stop stop-color="#8991C5" offset="0"/><stop stop-color="#424B75" offset="1"/></linearGradient><path d="m182.38 226.61h-108.76c-24.33 0-44.24-19.91-44.24-44.24v-108.75c0-24.33 19.91-44.24 44.24-44.24h108.75c24.33 0 44.24 19.91 44.24 44.24v108.75c0 24.34-19.9 44.24-44.23 44.24z" fill="none" stroke="url(#cw)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="eq" x1="67.627" x2="188.37" y1="23.431" y2="232.57" gradientUnits="userSpaceOnUse"><stop stop-color="#8991C5" offset="0"/><stop stop-color="#424B75" offset="1"/></linearGradient><path d="m182.27 226.42h-108.54c-24.28 0-44.15-19.87-44.15-44.15v-108.54c0-24.28 19.87-44.15 44.15-44.15h108.54c24.28 0 44.15 19.87 44.15 44.15v108.54c0 24.28-19.87 44.15-44.15 44.15z" fill="none" stroke="url(#eq)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="eg" x1="67.746" x2="188.25" y1="23.637" y2="232.36" gradientUnits="userSpaceOnUse"><stop stop-color="#8991C5" offset="0"/><stop stop-color="#434B75" offset="1"/></linearGradient><path d="m182.16 226.22h-108.32c-24.23 0-44.06-19.83-44.06-44.06v-108.32c0-24.23 19.83-44.06 44.06-44.06h108.32c24.23 0 44.06 19.83 44.06 44.06v108.32c0 24.23-19.83 44.06-44.06 44.06z" fill="none" stroke="url(#eg)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="ag" x1="67.865" x2="188.14" y1="23.843" y2="232.16" gradientUnits="userSpaceOnUse"><stop stop-color="#8991C5" offset="0"/><stop stop-color="#434C76" offset="1"/></linearGradient><path d="m182.05 226.02h-108.1c-24.18 0-43.97-19.79-43.97-43.97v-108.1c0-24.18 19.79-43.97 43.97-43.97h108.1c24.18 0 43.97 19.79 43.97 43.97v108.1c0 24.18-19.79 43.97-43.97 43.97z" fill="none" stroke="url(#ag)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="i" x1="67.983" x2="188.02" y1="24.048" y2="231.95" gradientUnits="userSpaceOnUse"><stop stop-color="#8991C5" offset="0"/><stop stop-color="#434C76" offset="1"/></linearGradient><path d="m181.94 225.82h-107.88c-24.14 0-43.88-19.75-43.88-43.88v-107.88c0-24.14 19.75-43.88 43.88-43.88h107.88c24.14 0 43.88 19.75 43.88 43.88v107.88c0 24.14-19.74 43.88-43.88 43.88z" fill="none" stroke="url(#i)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="gp" x1="68.102" x2="187.9" y1="24.254" y2="231.75" gradientUnits="userSpaceOnUse"><stop stop-color="#8991C5" offset="0"/><stop stop-color="#434C76" offset="1"/></linearGradient><path d="m181.83 225.63h-107.66c-24.09 0-43.79-19.71-43.79-43.79v-107.67c0-24.09 19.71-43.79 43.79-43.79h107.66c24.09 0 43.79 19.71 43.79 43.79v107.66c0.01 24.09-19.7 43.8-43.79 43.8z" fill="none" stroke="url(#gp)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="e" x1="68.221" x2="187.78" y1="24.46" y2="231.54" gradientUnits="userSpaceOnUse"><stop stop-color="#8991C5" offset="0"/><stop stop-color="#434C76" offset="1"/></linearGradient><path d="m181.72 225.43h-107.44c-24.04 0-43.71-19.67-43.71-43.71v-107.44c0-24.04 19.67-43.71 43.71-43.71h107.44c24.04 0 43.71 19.67 43.71 43.71v107.44c0 24.04-19.67 43.71-43.71 43.71z" fill="none" stroke="url(#e)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="eo" x1="68.34" x2="187.66" y1="24.666" y2="231.33" gradientUnits="userSpaceOnUse"><stop stop-color="#8991C5" offset="0"/><stop stop-color="#444C76" offset="1"/></linearGradient><path d="m181.61 225.23h-107.22c-23.99 0-43.62-19.63-43.62-43.62v-107.22c0-23.99 19.63-43.62 43.62-43.62h107.23c23.99 0 43.62 19.63 43.62 43.62v107.23c-0.01 23.98-19.64 43.61-43.63 43.61z" fill="none" stroke="url(#eo)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="ea" x1="68.459" x2="187.54" y1="24.872" y2="231.13" gradientUnits="userSpaceOnUse"><stop stop-color="#8991C5" offset="0"/><stop stop-color="#444C77" offset="1"/></linearGradient><path d="m181.5 225.03h-107c-23.94 0-43.53-19.59-43.53-43.53v-107c0-23.94 19.59-43.53 43.53-43.53h107c23.94 0 43.53 19.59 43.53 43.53v107c0 23.94-19.59 43.53-43.53 43.53z" fill="none" stroke="url(#ea)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="cp" x1="68.578" x2="187.42" y1="25.078" y2="230.92" gradientUnits="userSpaceOnUse"><stop stop-color="#8991C5" offset="0"/><stop stop-color="#444C77" offset="1"/></linearGradient><path d="m181.39 224.83h-106.78c-23.89 0-43.44-19.55-43.44-43.44v-106.78c0-23.89 19.55-43.44 43.44-43.44h106.79c23.89 0 43.44 19.55 43.44 43.44v106.79c-0.01 23.89-19.55 43.43-43.45 43.43z" fill="none" stroke="url(#cp)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="gm" x1="68.697" x2="187.3" y1="25.284" y2="230.72" gradientUnits="userSpaceOnUse"><stop stop-color="#8991C5" offset="0"/><stop stop-color="#444C77" offset="1"/></linearGradient><path d="m181.29 224.64h-106.58c-23.84 0-43.35-19.51-43.35-43.35v-106.58c0-23.84 19.51-43.35 43.35-43.35h106.57c23.84 0 43.35 19.51 43.35 43.35v106.57c0.01 23.85-19.5 43.36-43.34 43.36z" fill="none" stroke="url(#gm)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="fy" x1="68.816" x2="187.18" y1="25.49" y2="230.51" gradientUnits="userSpaceOnUse"><stop stop-color="#8991C5" offset="0"/><stop stop-color="#444D77" offset="1"/></linearGradient><path d="m181.18 224.44h-106.36c-23.79 0-43.26-19.47-43.26-43.26v-106.36c0-23.79 19.47-43.26 43.26-43.26h106.35c23.79 0 43.26 19.47 43.26 43.26v106.35c0.01 23.8-19.46 43.27-43.25 43.27z" fill="none" stroke="url(#fy)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="dn" x1="68.935" x2="187.07" y1="25.696" y2="230.3" gradientUnits="userSpaceOnUse"><stop stop-color="#8991C5" offset="0"/><stop stop-color="#444D78" offset="1"/></linearGradient><path d="m181.07 224.24h-106.14c-23.75 0-43.17-19.43-43.17-43.17v-106.14c0-23.75 19.43-43.17 43.17-43.17h106.13c23.75 0 43.17 19.43 43.17 43.17v106.13c0.01 23.75-19.42 43.18-43.16 43.18z" fill="none" stroke="url(#dn)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="fi" x1="69.053" x2="186.95" y1="25.902" y2="230.1" gradientUnits="userSpaceOnUse"><stop stop-color="#8991C5" offset="0"/><stop stop-color="#454D78" offset="1"/></linearGradient><path d="m180.96 224.04h-105.92c-23.7 0-43.08-19.39-43.08-43.08v-105.92c0-23.7 19.39-43.08 43.08-43.08h105.92c23.7 0 43.08 19.39 43.08 43.08v105.92c0 23.69-19.39 43.08-43.08 43.08z" fill="none" stroke="url(#fi)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="dc" x1="69.172" x2="186.83" y1="26.107" y2="229.89" gradientUnits="userSpaceOnUse"><stop stop-color="#8991C5" offset="0"/><stop stop-color="#454D78" offset="1"/></linearGradient><path d="m180.85 223.84h-105.7c-23.65 0-43-19.35-43-43v-105.69c0-23.65 19.35-43 43-43h105.7c23.65 0 43 19.35 43 43v105.7c-0.01 23.65-19.35 42.99-43 42.99z" fill="none" stroke="url(#dc)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="di" x1="69.291" x2="186.71" y1="26.313" y2="229.69" gradientUnits="userSpaceOnUse"><stop stop-color="#8991C5" offset="0"/><stop stop-color="#454D79" offset="1"/></linearGradient><path d="m180.74 223.65h-105.48c-23.6 0-42.91-19.31-42.91-42.91v-105.48c0-23.6 19.31-42.91 42.91-42.91h105.48c23.6 0 42.91 19.31 42.91 42.91v105.48c0 23.6-19.31 42.91-42.91 42.91z" fill="none" stroke="url(#di)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="by" x1="69.41" x2="186.59" y1="26.519" y2="229.48" gradientUnits="userSpaceOnUse"><stop stop-color="#8991C5" offset="0"/><stop stop-color="#454D79" offset="1"/></linearGradient><path d="m180.63 223.45h-105.26c-23.55 0-42.82-19.27-42.82-42.82v-105.26c0-23.55 19.27-42.82 42.82-42.82h105.26c23.55 0 42.82 19.27 42.82 42.82v105.26c0 23.55-19.27 42.82-42.82 42.82z" fill="none" stroke="url(#by)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="gn" x1="69.529" x2="186.47" y1="26.725" y2="229.27" gradientUnits="userSpaceOnUse"><stop stop-color="#8991C5" offset="0"/><stop stop-color="#454D79" offset="1"/></linearGradient><path d="m180.52 223.25h-105.04c-23.5 0-42.73-19.23-42.73-42.73v-105.04c0-23.5 19.23-42.73 42.73-42.73h105.04c23.5 0 42.73 19.23 42.73 42.73v105.04c0 23.5-19.23 42.73-42.73 42.73z" fill="none" stroke="url(#gn)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="bu" x1="69.648" x2="186.35" y1="26.931" y2="229.07" gradientUnits="userSpaceOnUse"><stop stop-color="#8991C5" offset="0"/><stop stop-color="#454E79" offset="1"/></linearGradient><path d="m180.41 223.05h-104.82c-23.45 0-42.64-19.19-42.64-42.64v-104.82c0-23.45 19.19-42.64 42.64-42.64h104.83c23.45 0 42.64 19.19 42.64 42.64v104.83c-0.01 23.44-19.2 42.63-42.65 42.63z" fill="none" stroke="url(#bu)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="gb" x1="69.767" x2="186.23" y1="27.137" y2="228.86" gradientUnits="userSpaceOnUse"><stop stop-color="#8991C5" offset="0"/><stop stop-color="#464E7A" offset="1"/></linearGradient><path d="m180.3 222.86h-104.6c-23.4 0-42.55-19.15-42.55-42.55v-104.61c0-23.4 19.15-42.55 42.55-42.55h104.6c23.4 0 42.55 19.15 42.55 42.55v104.6c0.01 23.41-19.14 42.56-42.55 42.56z" fill="none" stroke="url(#gb)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="cl" x1="69.886" x2="186.11" y1="27.343" y2="228.66" gradientUnits="userSpaceOnUse"><stop stop-color="#8991C5" offset="0"/><stop stop-color="#464E7A" offset="1"/></linearGradient><path d="m180.19 222.66h-104.38c-23.35 0-42.46-19.11-42.46-42.46v-104.39c0-23.35 19.11-42.46 42.46-42.46h104.39c23.35 0 42.46 19.11 42.46 42.46v104.39c0 23.35-19.11 42.46-42.47 42.46z" fill="none" stroke="url(#cl)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="fx" x1="70.004" x2="186" y1="27.549" y2="228.45" gradientUnits="userSpaceOnUse"><stop stop-color="#8991C5" offset="0"/><stop stop-color="#464E7A" offset="1"/></linearGradient><path d="m180.09 222.46h-104.18c-23.31 0-42.37-19.07-42.37-42.37v-104.18c0-23.31 19.07-42.37 42.37-42.37h104.17c23.31 0 42.37 19.07 42.37 42.37v104.17c0.01 23.31-19.06 42.38-42.36 42.38z" fill="none" stroke="url(#fx)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="bd" x1="70.123" x2="185.88" y1="27.755" y2="228.25" gradientUnits="userSpaceOnUse"><stop stop-color="#8991C5" offset="0"/><stop stop-color="#464F7A" offset="1"/></linearGradient><path d="m179.98 222.26h-103.96c-23.26 0-42.29-19.03-42.29-42.29v-103.95c0-23.26 19.03-42.29 42.29-42.29h103.95c23.26 0 42.29 19.03 42.29 42.29v103.95c0 23.26-19.03 42.29-42.28 42.29z" fill="none" stroke="url(#bd)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="ei" x1="70.242" x2="185.76" y1="27.961" y2="228.04" gradientUnits="userSpaceOnUse"><stop stop-color="#8991C5" offset="0"/><stop stop-color="#464F7B" offset="1"/></linearGradient><path d="m179.87 222.06h-103.74c-23.21 0-42.2-18.99-42.2-42.2v-103.73c0-23.21 18.99-42.2 42.2-42.2h103.73c23.21 0 42.2 18.99 42.2 42.2v103.73c0 23.22-18.98 42.2-42.19 42.2z" fill="none" stroke="url(#ei)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="bt" x1="70.361" x2="185.64" y1="28.166" y2="227.83" gradientUnits="userSpaceOnUse"><stop stop-color="#8991C5" offset="0"/><stop stop-color="#464F7B" offset="1"/></linearGradient><path d="m179.76 221.87h-103.52c-23.16 0-42.11-18.95-42.11-42.11v-103.52c0-23.16 18.95-42.11 42.11-42.11h103.52c23.16 0 42.11 18.95 42.11 42.11v103.52c0 23.16-18.95 42.11-42.11 42.11z" fill="none" stroke="url(#bt)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="ap" x1="70.48" x2="185.52" y1="28.372" y2="227.63" gradientUnits="userSpaceOnUse"><stop stop-color="#8991C5" offset="0"/><stop stop-color="#474F7B" offset="1"/></linearGradient><path d="m179.65 221.67h-103.3c-23.11 0-42.02-18.91-42.02-42.02v-103.3c0-23.11 18.91-42.02 42.02-42.02h103.3c23.11 0 42.02 18.91 42.02 42.02v103.3c0 23.11-18.91 42.02-42.02 42.02z" fill="none" stroke="url(#ap)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="cu" x1="70.599" x2="185.4" y1="28.578" y2="227.42" gradientUnits="userSpaceOnUse"><stop stop-color="#8991C5" offset="0"/><stop stop-color="#474F7B" offset="1"/></linearGradient><path d="m179.54 221.47h-103.08c-23.06 0-41.93-18.87-41.93-41.93v-103.08c0-23.06 18.87-41.93 41.93-41.93h103.08c23.06 0 41.93 18.87 41.93 41.93v103.08c0 23.06-18.87 41.93-41.93 41.93z" fill="none" stroke="url(#cu)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="bm" x1="70.718" x2="185.28" y1="28.784" y2="227.22" gradientUnits="userSpaceOnUse"><stop stop-color="#8991C5" offset="0"/><stop stop-color="#47507C" offset="1"/></linearGradient><path d="m179.43 221.27h-102.86c-23.01 0-41.84-18.83-41.84-41.84v-102.86c0-23.01 18.83-41.84 41.84-41.84h102.86c23.01 0 41.84 18.83 41.84 41.84v102.86c0 23.01-18.83 41.84-41.84 41.84z" fill="none" stroke="url(#bm)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="cd" x1="70.837" x2="185.16" y1="28.99" y2="227.01" gradientUnits="userSpaceOnUse"><stop stop-color="#8991C5" offset="0"/><stop stop-color="#47507C" offset="1"/></linearGradient><path d="m179.32 221.07h-102.64c-22.96 0-41.75-18.79-41.75-41.75v-102.64c0-22.96 18.79-41.75 41.75-41.75h102.64c22.96 0 41.75 18.79 41.75 41.75v102.64c0 22.97-18.78 41.75-41.75 41.75z" fill="none" stroke="url(#cd)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="az" x1="70.955" x2="185.04" y1="29.196" y2="226.8" gradientUnits="userSpaceOnUse"><stop stop-color="#8991C5" offset="0"/><stop stop-color="#47507C" offset="1"/></linearGradient><path d="m179.21 220.88h-102.42c-22.92 0-41.66-18.75-41.66-41.66v-102.43c0-22.92 18.75-41.66 41.66-41.66h102.42c22.92 0 41.66 18.75 41.66 41.66v102.42c0.01 22.92-18.74 41.67-41.66 41.67z" fill="none" stroke="url(#az)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="gf" x1="71.074" x2="184.93" y1="29.402" y2="226.6" gradientUnits="userSpaceOnUse"><stop stop-color="#8991C5" offset="0"/><stop stop-color="#48507C" offset="1"/></linearGradient><path d="m179.1 220.68h-102.2c-22.87 0-41.58-18.71-41.58-41.58v-102.2c0-22.87 18.71-41.58 41.58-41.58h102.2c22.87 0 41.58 18.71 41.58 41.58v102.2c0 22.87-18.71 41.58-41.58 41.58z" fill="none" stroke="url(#gf)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="gk" x1="71.193" x2="184.81" y1="29.608" y2="226.39" gradientUnits="userSpaceOnUse"><stop stop-color="#8991C5" offset="0"/><stop stop-color="#48507C" offset="1"/></linearGradient><path d="m178.99 220.48h-101.98c-22.82 0-41.49-18.67-41.49-41.49v-101.98c0-22.82 18.67-41.49 41.49-41.49h101.99c22.82 0 41.49 18.67 41.49 41.49v101.99c-0.01 22.81-18.68 41.48-41.5 41.48z" fill="none" stroke="url(#gk)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="ca" x1="71.312" x2="184.69" y1="29.814" y2="226.19" gradientUnits="userSpaceOnUse"><stop stop-color="#8991C5" offset="0"/><stop stop-color="#48507D" offset="1"/></linearGradient><path d="m178.89 220.28h-101.78c-22.77 0-41.4-18.63-41.4-41.4v-101.77c0-22.77 18.63-41.4 41.4-41.4h101.77c22.77 0 41.4 18.63 41.4 41.4v101.77c0 22.77-18.63 41.4-41.39 41.4z" fill="none" stroke="url(#ca)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="x" x1="71.431" x2="184.57" y1="30.02" y2="225.98" gradientUnits="userSpaceOnUse"><stop stop-color="#8991C5" offset="0"/><stop stop-color="#48517D" offset="1"/></linearGradient><path d="m178.78 220.08h-101.56c-22.72 0-41.31-18.59-41.31-41.31v-101.55c0-22.72 18.59-41.31 41.31-41.31h101.55c22.72 0 41.31 18.59 41.31 41.31v101.55c0 22.73-18.58 41.31-41.3 41.31z" fill="none" stroke="url(#x)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="dv" x1="71.55" x2="184.45" y1="30.225" y2="225.77" gradientUnits="userSpaceOnUse"><stop stop-color="#8991C5" offset="0"/><stop stop-color="#48517D" offset="1"/></linearGradient><path d="m178.67 219.89h-101.34c-22.67 0-41.22-18.55-41.22-41.22v-101.34c0-22.67 18.55-41.22 41.22-41.22h101.33c22.67 0 41.22 18.55 41.22 41.22v101.33c0.01 22.68-18.54 41.23-41.21 41.23z" fill="none" stroke="url(#dv)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="dh" x1="71.669" x2="184.33" y1="30.431" y2="225.57" gradientUnits="userSpaceOnUse"><stop stop-color="#8991C5" offset="0"/><stop stop-color="#48517D" offset="1"/></linearGradient><path d="m178.56 219.69h-101.12c-22.62 0-41.13-18.51-41.13-41.13v-101.12c0-22.62 18.51-41.13 41.13-41.13h101.12c22.62 0 41.13 18.51 41.13 41.13v101.12c0 22.62-18.51 41.13-41.13 41.13z" fill="none" stroke="url(#dh)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="bf" x1="71.788" x2="184.21" y1="30.637" y2="225.36" gradientUnits="userSpaceOnUse"><stop stop-color="#8991C5" offset="0"/><stop stop-color="#49517E" offset="1"/></linearGradient><path d="m178.45 219.49h-100.9c-22.57 0-41.04-18.47-41.04-41.04v-100.9c0-22.57 18.47-41.04 41.04-41.04h100.9c22.57 0 41.04 18.47 41.04 41.04v100.9c0 22.57-18.47 41.04-41.04 41.04z" fill="none" stroke="url(#bf)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="o" x1="71.907" x2="184.09" y1="30.843" y2="225.16" gradientUnits="userSpaceOnUse"><stop stop-color="#8991C5" offset="0"/><stop stop-color="#49527E" offset="1"/></linearGradient><path d="m178.34 219.29h-100.68c-22.52 0-40.95-18.43-40.95-40.95v-100.68c0-22.52 18.43-40.95 40.95-40.95h100.68c22.52 0 40.95 18.43 40.95 40.95v100.68c0 22.52-18.43 40.95-40.95 40.95z" fill="none" stroke="url(#o)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="cb" x1="72.025" x2="183.97" y1="31.049" y2="224.95" gradientUnits="userSpaceOnUse"><stop stop-color="#8991C5" offset="0"/><stop stop-color="#49527E" offset="1"/></linearGradient><path d="m178.23 219.1h-100.46c-22.48 0-40.86-18.39-40.86-40.86v-100.47c0-22.48 18.39-40.86 40.86-40.86h100.46c22.48 0 40.86 18.39 40.86 40.86v100.46c0.01 22.48-18.38 40.87-40.86 40.87z" fill="none" stroke="url(#cb)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="ba" x1="72.144" x2="183.86" y1="31.255" y2="224.75" gradientUnits="userSpaceOnUse"><stop stop-color="#8991C5" offset="0"/><stop stop-color="#49527E" offset="1"/></linearGradient><path d="m178.12 218.9h-100.24c-22.43 0-40.78-18.35-40.78-40.78v-100.24c0-22.43 18.35-40.78 40.78-40.78h100.24c22.43 0 40.78 18.35 40.78 40.78v100.24c0 22.43-18.35 40.78-40.78 40.78z" fill="none" stroke="url(#ba)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="gr" x1="72.263" x2="183.74" y1="31.461" y2="224.54" gradientUnits="userSpaceOnUse"><stop stop-color="#8991C5" offset="0"/><stop stop-color="#49527F" offset="1"/></linearGradient><path d="m178.01 218.7h-100.02c-22.38 0-40.69-18.31-40.69-40.69v-100.02c0-22.38 18.31-40.69 40.69-40.69h100.02c22.38 0 40.69 18.31 40.69 40.69v100.02c0 22.38-18.31 40.69-40.69 40.69z" fill="none" stroke="url(#gr)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="ai" x1="72.382" x2="183.62" y1="31.667" y2="224.33" gradientUnits="userSpaceOnUse"><stop stop-color="#8991C5" offset="0"/><stop stop-color="#49527F" offset="1"/></linearGradient><path d="m177.9 218.5h-99.8c-22.33 0-40.6-18.27-40.6-40.6v-99.8c0-22.33 18.27-40.6 40.6-40.6h99.81c22.33 0 40.6 18.27 40.6 40.6v99.81c-0.01 22.32-18.28 40.59-40.61 40.59z" fill="none" stroke="url(#ai)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="w" x1="72.501" x2="183.5" y1="31.873" y2="224.13" gradientUnits="userSpaceOnUse"><stop stop-color="#8991C5" offset="0"/><stop stop-color="#4A527F" offset="1"/></linearGradient><path d="m177.79 218.3h-99.58c-22.28 0-40.51-18.23-40.51-40.51v-99.58c0-22.28 18.23-40.51 40.51-40.51h99.59c22.28 0 40.51 18.23 40.51 40.51v99.59c-0.01 22.27-18.24 40.5-40.52 40.5z" fill="none" stroke="url(#w)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="gd" x1="72.62" x2="183.38" y1="32.078" y2="223.92" gradientUnits="userSpaceOnUse"><stop stop-color="#8991C5" offset="0"/><stop stop-color="#4A527F" offset="1"/></linearGradient><path d="m177.68 218.11h-99.36c-22.23 0-40.42-18.19-40.42-40.42v-99.37c0-22.23 18.19-40.42 40.42-40.42h99.37c22.23 0 40.42 18.19 40.42 40.42v99.37c0 22.23-18.19 40.42-40.43 40.42z" fill="none" stroke="url(#gd)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="cg" x1="72.739" x2="183.26" y1="32.284" y2="223.72" gradientUnits="userSpaceOnUse"><stop stop-color="#8991C5" offset="0"/><stop stop-color="#4A5380" offset="1"/></linearGradient><path d="m177.58 217.91h-99.16c-22.18 0-40.33-18.15-40.33-40.33v-99.16c0-22.18 18.15-40.33 40.33-40.33h99.15c22.18 0 40.33 18.15 40.33 40.33v99.15c0.01 22.19-18.14 40.34-40.32 40.34z" fill="none" stroke="url(#cg)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="b" x1="72.857" x2="183.14" y1="32.49" y2="223.51" gradientUnits="userSpaceOnUse"><stop stop-color="#8991C5" offset="0"/><stop stop-color="#4A5380" offset="1"/></linearGradient><path d="m177.47 217.71h-98.94c-22.13 0-40.24-18.11-40.24-40.24v-98.94c0-22.13 18.11-40.24 40.24-40.24h98.93c22.13 0 40.24 18.11 40.24 40.24v98.93c0.01 22.14-18.1 40.25-40.23 40.25z" fill="none" stroke="url(#b)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="gs" x1="72.976" x2="183.02" y1="32.696" y2="223.3" gradientUnits="userSpaceOnUse"><stop stop-color="#8991C5" offset="0"/><stop stop-color="#4A5380" offset="1"/></linearGradient><path d="m177.36 217.51h-98.72c-22.09 0-40.15-18.07-40.15-40.15v-98.72c0-22.09 18.07-40.15 40.15-40.15h98.71c22.09 0 40.15 18.07 40.15 40.15v98.71c0.01 22.09-18.06 40.16-40.14 40.16z" fill="none" stroke="url(#gs)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="ec" x1="73.095" x2="182.9" y1="32.902" y2="223.1" gradientUnits="userSpaceOnUse"><stop stop-color="#8991C5" offset="0"/><stop stop-color="#4A5380" offset="1"/></linearGradient><path d="m177.25 217.31h-98.5c-22.04 0-40.07-18.03-40.07-40.07v-98.5c0-22.04 18.03-40.07 40.07-40.07h98.5c22.04 0 40.07 18.03 40.07 40.07v98.5c-0.01 22.04-18.04 40.07-40.07 40.07z" fill="none" stroke="url(#ec)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="ef" x1="73.214" x2="182.79" y1="33.108" y2="222.89" gradientUnits="userSpaceOnUse"><stop stop-color="#8991C5" offset="0"/><stop stop-color="#4B5380" offset="1"/></linearGradient><path d="m177.14 217.12h-98.28c-21.99 0-39.98-17.99-39.98-39.98v-98.28c0-21.99 17.99-39.98 39.98-39.98h98.28c21.99 0 39.98 17.99 39.98 39.98v98.28c0 21.99-17.99 39.98-39.98 39.98z" fill="none" stroke="url(#ef)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="ct" x1="73.333" x2="182.67" y1="33.314" y2="222.69" gradientUnits="userSpaceOnUse"><stop stop-color="#8991C5" offset="0"/><stop stop-color="#4B5380" offset="1"/></linearGradient><path d="m177.03 216.92h-98.06c-21.94 0-39.89-17.95-39.89-39.89v-98.06c0-21.94 17.95-39.89 39.89-39.89h98.06c21.94 0 39.89 17.95 39.89 39.89v98.06c0 21.94-17.95 39.89-39.89 39.89z" fill="none" stroke="url(#ct)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="be" x1="73.452" x2="182.55" y1="33.52" y2="222.48" gradientUnits="userSpaceOnUse"><stop stop-color="#8991C5" offset="0"/><stop stop-color="#4B5380" offset="1"/></linearGradient><path d="m176.92 216.72h-97.84c-21.89 0-39.8-17.91-39.8-39.8v-97.84c0-21.89 17.91-39.8 39.8-39.8h97.84c21.89 0 39.8 17.91 39.8 39.8v97.84c0 21.89-17.91 39.8-39.8 39.8z" fill="none" stroke="url(#be)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="v" x1="73.571" x2="182.43" y1="33.726" y2="222.27" gradientUnits="userSpaceOnUse"><stop stop-color="#8991C5" offset="0"/><stop stop-color="#4B5481" offset="1"/></linearGradient><path d="m176.81 216.52h-97.62c-21.84 0-39.71-17.87-39.71-39.71v-97.62c0-21.84 17.87-39.71 39.71-39.71h97.62c21.84 0 39.71 17.87 39.71 39.71v97.62c0 21.84-17.87 39.71-39.71 39.71z" fill="none" stroke="url(#v)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="p" x1="73.69" x2="182.31" y1="33.932" y2="222.07" gradientUnits="userSpaceOnUse"><stop stop-color="#8991C5" offset="0"/><stop stop-color="#4B5481" offset="1"/></linearGradient><path d="m176.7 216.32h-97.4c-21.79 0-39.62-17.83-39.62-39.62v-97.4c0-21.79 17.83-39.62 39.62-39.62h97.41c21.79 0 39.62 17.83 39.62 39.62v97.41c-0.01 21.78-17.84 39.61-39.63 39.61z" fill="none" stroke="url(#p)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="cy" x1="73.809" x2="182.19" y1="34.138" y2="221.86" gradientUnits="userSpaceOnUse"><stop stop-color="#8991C5" offset="0"/><stop stop-color="#4B5481" offset="1"/></linearGradient><path d="m176.59 216.13h-97.18c-21.74 0-39.53-17.79-39.53-39.53v-97.19c0-21.74 17.79-39.53 39.53-39.53h97.19c21.74 0 39.53 17.79 39.53 39.53v97.19c0 21.74-17.79 39.53-39.54 39.53z" fill="none" stroke="url(#cy)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="cm" x1="73.927" x2="182.07" y1="34.343" y2="221.66" gradientUnits="userSpaceOnUse"><stop stop-color="#8991C5" offset="0"/><stop stop-color="#4C5482" offset="1"/></linearGradient><path d="m176.48 215.93h-96.96c-21.69 0-39.44-17.75-39.44-39.44v-96.97c0-21.69 17.75-39.44 39.44-39.44h96.97c21.69 0 39.44 17.75 39.44 39.44v96.97c0 21.69-17.75 39.44-39.45 39.44z" fill="none" stroke="url(#cm)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="gv" x1="74.046" x2="181.95" y1="34.549" y2="221.45" gradientUnits="userSpaceOnUse"><stop stop-color="#8991C5" offset="0"/><stop stop-color="#4C5482" offset="1"/></linearGradient><path d="m176.38 215.73h-96.76c-21.65 0-39.36-17.71-39.36-39.36v-96.75c0-21.65 17.71-39.36 39.36-39.36h96.75c21.65 0 39.36 17.71 39.36 39.36v96.75c0 21.65-17.71 39.36-39.35 39.36z" fill="none" stroke="url(#gv)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="db" x1="74.165" x2="181.83" y1="34.755" y2="221.24" gradientUnits="userSpaceOnUse"><stop stop-color="#8991C5" offset="0"/><stop stop-color="#4C5482" offset="1"/></linearGradient><path d="m176.27 215.53h-96.54c-21.6 0-39.27-17.67-39.27-39.27v-96.53c0-21.6 17.67-39.27 39.27-39.27h96.53c21.6 0 39.27 17.67 39.27 39.27v96.53c0 21.6-17.67 39.27-39.26 39.27z" fill="none" stroke="url(#db)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="cv" x1="74.284" x2="181.72" y1="34.961" y2="221.04" gradientUnits="userSpaceOnUse"><stop stop-color="#8991C5" offset="0"/><stop stop-color="#4C5582" offset="1"/></linearGradient><path d="m176.16 215.34h-96.32c-21.55 0-39.18-17.63-39.18-39.18v-96.32c0-21.55 17.63-39.18 39.18-39.18h96.31c21.55 0 39.18 17.63 39.18 39.18v96.31c0.01 21.56-17.62 39.19-39.17 39.19z" fill="none" stroke="url(#cv)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="cc" x1="74.403" x2="181.6" y1="35.167" y2="220.83" gradientUnits="userSpaceOnUse"><stop stop-color="#8991C5" offset="0"/><stop stop-color="#4C5583" offset="1"/></linearGradient><path d="m176.05 215.14h-96.1c-21.5 0-39.09-17.59-39.09-39.09v-96.1c0-21.5 17.59-39.09 39.09-39.09h96.1c21.5 0 39.09 17.59 39.09 39.09v96.1c0 21.5-17.59 39.09-39.09 39.09z" fill="none" stroke="url(#cc)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="cx" x1="74.522" x2="181.48" y1="35.373" y2="220.63" gradientUnits="userSpaceOnUse"><stop stop-color="#8991C5" offset="0"/><stop stop-color="#4C5583" offset="1"/></linearGradient><path d="m175.94 214.94h-95.88c-21.45 0-39-17.55-39-39v-95.88c0-21.45 17.55-39 39-39h95.88c21.45 0 39 17.55 39 39v95.88c0 21.45-17.55 39-39 39z" fill="none" stroke="url(#cx)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="an" x1="74.641" x2="181.36" y1="35.579" y2="220.42" gradientUnits="userSpaceOnUse"><stop stop-color="#8991C5" offset="0"/><stop stop-color="#4C5583" offset="1"/></linearGradient><path d="m175.83 214.74h-95.66c-21.4 0-38.91-17.51-38.91-38.91v-95.66c0-21.4 17.51-38.91 38.91-38.91h95.66c21.4 0 38.91 17.51 38.91 38.91v95.66c0 21.4-17.51 38.91-38.91 38.91z" fill="none" stroke="url(#an)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="dq" x1="74.759" x2="181.24" y1="35.785" y2="220.22" gradientUnits="userSpaceOnUse"><stop stop-color="#8991C5" offset="0"/><stop stop-color="#4C5583" offset="1"/></linearGradient><path d="m175.72 214.54h-95.44c-21.35 0-38.82-17.47-38.82-38.82v-95.44c0-21.35 17.47-38.82 38.82-38.82h95.44c21.35 0 38.82 17.47 38.82 38.82v95.44c0 21.35-17.47 38.82-38.82 38.82z" fill="none" stroke="url(#dq)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="t" x1="74.878" x2="181.12" y1="35.991" y2="220.01" gradientUnits="userSpaceOnUse"><stop stop-color="#8991C5" offset="0"/><stop stop-color="#4D5684" offset="1"/></linearGradient><path d="m175.61 214.35h-95.22c-21.3 0-38.73-17.43-38.73-38.73v-95.23c0-21.3 17.43-38.73 38.73-38.73h95.22c21.3 0 38.73 17.43 38.73 38.73v95.22c0.01 21.31-17.42 38.74-38.73 38.74z" fill="none" stroke="url(#t)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="ak" x1="74.997" x2="181" y1="36.196" y2="219.8" gradientUnits="userSpaceOnUse"><stop stop-color="#8991C5" offset="0"/><stop stop-color="#4D5684" offset="1"/></linearGradient><path d="m175.5 214.15h-95c-21.26 0-38.65-17.39-38.65-38.65v-95c0-21.26 17.39-38.65 38.65-38.65h95.01c21.26 0 38.65 17.39 38.65 38.65v95.01c-0.01 21.25-17.4 38.64-38.66 38.64z" fill="none" stroke="url(#ak)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="ab" x1="75.116" x2="180.88" y1="36.402" y2="219.6" gradientUnits="userSpaceOnUse"><stop stop-color="#8991C5" offset="0"/><stop stop-color="#4D5684" offset="1"/></linearGradient><path d="m175.39 213.95h-94.78c-21.21 0-38.56-17.35-38.56-38.56v-94.78c0-21.21 17.35-38.56 38.56-38.56h94.79c21.21 0 38.56 17.35 38.56 38.56v94.79c-0.01 21.2-17.36 38.55-38.57 38.55z" fill="none" stroke="url(#ab)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="ac" x1="75.235" x2="180.76" y1="36.608" y2="219.39" gradientUnits="userSpaceOnUse"><stop stop-color="#8991C5" offset="0"/><stop stop-color="#4D5684" offset="1"/></linearGradient><path d="m175.28 213.75h-94.56c-21.16 0-38.47-17.31-38.47-38.47v-94.56c0-21.16 17.31-38.47 38.47-38.47h94.57c21.16 0 38.47 17.31 38.47 38.47v94.57c-0.01 21.15-17.32 38.46-38.48 38.46z" fill="none" stroke="url(#ac)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="bi" x1="75.354" x2="180.65" y1="36.814" y2="219.19" gradientUnits="userSpaceOnUse"><stop stop-color="#8991C5" offset="0"/><stop stop-color="#4D5684" offset="1"/></linearGradient><path d="m175.18 213.55h-94.36c-21.11 0-38.38-17.27-38.38-38.38v-94.35c0-21.11 17.27-38.38 38.38-38.38h94.35c21.11 0 38.38 17.27 38.38 38.38v94.35c0 21.11-17.27 38.38-38.37 38.38z" fill="none" stroke="url(#bi)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="bx" x1="75.473" x2="180.53" y1="37.02" y2="218.98" gradientUnits="userSpaceOnUse"><stop stop-color="#8991C5" offset="0"/><stop stop-color="#4D5785" offset="1"/></linearGradient><path d="m175.07 213.36h-94.14c-21.06 0-38.29-17.23-38.29-38.29v-94.14c0-21.06 17.23-38.29 38.29-38.29h94.13c21.06 0 38.29 17.23 38.29 38.29v94.13c0.01 21.07-17.22 38.3-38.28 38.3z" fill="none" stroke="url(#bx)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="er" x1="75.592" x2="180.41" y1="37.226" y2="218.77" gradientUnits="userSpaceOnUse"><stop stop-color="#8991C5" offset="0"/><stop stop-color="#4D5785" offset="1"/></linearGradient><path d="m174.96 213.16h-93.92c-21.01 0-38.2-17.19-38.2-38.2v-93.92c0-21.01 17.19-38.2 38.2-38.2h93.91c21.01 0 38.2 17.19 38.2 38.2v93.91c0.01 21.02-17.18 38.21-38.19 38.21z" fill="none" stroke="url(#er)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="ee" x1="75.711" x2="180.29" y1="37.432" y2="218.57" gradientUnits="userSpaceOnUse"><stop stop-color="#8991C5" offset="0"/><stop stop-color="#4E5786" offset="1"/></linearGradient><path d="m174.85 212.96h-93.7c-20.96 0-38.11-17.15-38.11-38.11v-93.7c0-20.96 17.15-38.11 38.11-38.11h93.7c20.96 0 38.11 17.15 38.11 38.11v93.7c0 20.96-17.15 38.11-38.11 38.11z" fill="none" stroke="url(#ee)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="fv" x1="75.829" x2="180.17" y1="37.638" y2="218.36" gradientUnits="userSpaceOnUse"><stop stop-color="#8991C5" offset="0"/><stop stop-color="#4E5786" offset="1"/></linearGradient><path d="m174.74 212.76h-93.48c-20.91 0-38.02-17.11-38.02-38.02v-93.48c0-20.91 17.11-38.02 38.02-38.02h93.48c20.91 0 38.02 17.11 38.02 38.02v93.48c0 20.91-17.11 38.02-38.02 38.02z" fill="none" stroke="url(#fv)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="cj" x1="75.948" x2="180.05" y1="37.844" y2="218.16" gradientUnits="userSpaceOnUse"><stop stop-color="#8991C5" offset="0"/><stop stop-color="#4E5786" offset="1"/></linearGradient><path d="m174.63 212.57h-93.26c-20.86 0-37.94-17.07-37.94-37.94v-93.26c0-20.86 17.07-37.94 37.94-37.94h93.26c20.86 0 37.94 17.07 37.94 37.94v93.26c0 20.86-17.08 37.94-37.94 37.94z" fill="none" stroke="url(#cj)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="ax" x1="76.067" x2="179.93" y1="38.05" y2="217.95" gradientUnits="userSpaceOnUse"><stop stop-color="#8991C5" offset="0"/><stop stop-color="#4E5886" offset="1"/></linearGradient><path d="m174.52 212.37h-93.04c-20.82 0-37.85-17.03-37.85-37.85v-93.04c0-20.82 17.03-37.85 37.85-37.85h93.04c20.82 0 37.85 17.03 37.85 37.85v93.04c0 20.82-17.03 37.85-37.85 37.85z" fill="none" stroke="url(#ax)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="ft" x1="76.186" x2="179.81" y1="38.256" y2="217.74" gradientUnits="userSpaceOnUse"><stop stop-color="#8991C5" offset="0"/><stop stop-color="#4E5887" offset="1"/></linearGradient><path d="m174.41 212.17h-92.82c-20.77 0-37.76-16.99-37.76-37.76v-92.82c0-20.77 16.99-37.76 37.76-37.76h92.82c20.77 0 37.76 16.99 37.76 37.76v92.82c0 20.77-16.99 37.76-37.76 37.76z" fill="none" stroke="url(#ft)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="fd" x1="76.305" x2="179.7" y1="38.461" y2="217.54" gradientUnits="userSpaceOnUse"><stop stop-color="#8991C5" offset="0"/><stop stop-color="#4E5887" offset="1"/></linearGradient><path d="m174.3 211.97h-92.6c-20.72 0-37.67-16.95-37.67-37.67v-92.6c0-20.72 16.95-37.67 37.67-37.67h92.6c20.72 0 37.67 16.95 37.67 37.67v92.6c0 20.72-16.95 37.67-37.67 37.67z" fill="none" stroke="url(#fd)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="dr" x1="76.424" x2="179.58" y1="38.667" y2="217.33" gradientUnits="userSpaceOnUse"><stop stop-color="#8991C5" offset="0"/><stop stop-color="#4E5887" offset="1"/></linearGradient><path d="m174.19 211.77h-92.38c-20.67 0-37.58-16.91-37.58-37.58v-92.38c0-20.67 16.91-37.58 37.58-37.58h92.39c20.67 0 37.58 16.91 37.58 37.58v92.39c-0.01 20.66-16.92 37.57-37.59 37.57z" fill="none" stroke="url(#dr)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="dg" x1="76.543" x2="179.46" y1="38.873" y2="217.13" gradientUnits="userSpaceOnUse"><stop stop-color="#8991C5" offset="0"/><stop stop-color="#4F5988" offset="1"/></linearGradient><path d="m174.08 211.58h-92.16c-20.62 0-37.49-16.87-37.49-37.49v-92.17c0-20.62 16.87-37.49 37.49-37.49h92.17c20.62 0 37.49 16.87 37.49 37.49v92.17c0 20.61-16.88 37.49-37.5 37.49z" fill="none" stroke="url(#dg)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="r" x1="76.661" x2="179.34" y1="39.079" y2="216.92" gradientUnits="userSpaceOnUse"><stop stop-color="#8991C5" offset="0"/><stop stop-color="#4F5988" offset="1"/></linearGradient><path d="m173.97 211.38h-91.94c-20.57 0-37.4-16.83-37.4-37.4v-91.95c0-20.57 16.83-37.4 37.4-37.4h91.95c20.57 0 37.4 16.83 37.4 37.4v91.95c0 20.57-16.83 37.4-37.41 37.4z" fill="none" stroke="url(#r)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="l" x1="76.78" x2="179.22" y1="39.285" y2="216.72" gradientUnits="userSpaceOnUse"><stop stop-color="#8991C5" offset="0"/><stop stop-color="#4F5988" offset="1"/></linearGradient><path d="m173.87 211.18h-91.74c-20.52 0-37.31-16.79-37.31-37.31v-91.74c0-20.52 16.79-37.31 37.31-37.31h91.73c20.52 0 37.31 16.79 37.31 37.31v91.73c0.01 20.53-16.78 37.32-37.3 37.32z" fill="none" stroke="url(#l)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="cf" x1="76.899" x2="179.1" y1="39.491" y2="216.51" gradientUnits="userSpaceOnUse"><stop stop-color="#8991C5" offset="0"/><stop stop-color="#4F5988" offset="1"/></linearGradient><path d="m173.76 210.98h-91.52c-20.47 0-37.23-16.75-37.23-37.23v-91.51c0-20.47 16.75-37.23 37.23-37.23h91.51c20.47 0 37.23 16.75 37.23 37.23v91.51c0 20.48-16.75 37.23-37.22 37.23z" fill="none" stroke="url(#cf)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="aj" x1="77.018" x2="178.98" y1="39.697" y2="216.3" gradientUnits="userSpaceOnUse"><stop stop-color="#8991C5" offset="0"/><stop stop-color="#4F5988" offset="1"/></linearGradient><path d="m173.65 210.78h-91.3c-20.43 0-37.14-16.71-37.14-37.14v-91.3c0-20.43 16.71-37.14 37.14-37.14h91.3c20.43 0 37.14 16.71 37.14 37.14v91.3c-0.01 20.43-16.72 37.14-37.14 37.14z" fill="none" stroke="url(#aj)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="bg" x1="77.137" x2="178.86" y1="39.903" y2="216.1" gradientUnits="userSpaceOnUse"><stop stop-color="#8991C5" offset="0"/><stop stop-color="#4F5989" offset="1"/></linearGradient><path d="m173.54 210.59h-91.08c-20.38 0-37.05-16.67-37.05-37.05v-91.08c0-20.38 16.67-37.05 37.05-37.05h91.08c20.38 0 37.05 16.67 37.05 37.05v91.08c0 20.37-16.68 37.05-37.05 37.05z" fill="none" stroke="url(#bg)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="bq" x1="77.256" x2="178.74" y1="40.109" y2="215.89" gradientUnits="userSpaceOnUse"><stop stop-color="#8991C5" offset="0"/><stop stop-color="#505A89" offset="1"/></linearGradient><path d="m173.43 210.39h-90.86c-20.33 0-36.96-16.63-36.96-36.96v-90.86c0-20.33 16.63-36.96 36.96-36.96h90.86c20.33 0 36.96 16.63 36.96 36.96v90.86c0 20.33-16.63 36.96-36.96 36.96z" fill="none" stroke="url(#bq)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="fe" x1="77.375" x2="178.63" y1="40.314" y2="215.69" gradientUnits="userSpaceOnUse"><stop stop-color="#8991C5" offset="0"/><stop stop-color="#505A89" offset="1"/></linearGradient><path d="m173.32 210.19h-90.64c-20.28 0-36.87-16.59-36.87-36.87v-90.64c0-20.28 16.59-36.87 36.87-36.87h90.64c20.28 0 36.87 16.59 36.87 36.87v90.64c0 20.28-16.59 36.87-36.87 36.87z" fill="none" stroke="url(#fe)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="gj" x1="77.494" x2="178.51" y1="40.52" y2="215.48" gradientUnits="userSpaceOnUse"><stop stop-color="#8991C5" offset="0"/><stop stop-color="#505A8A" offset="1"/></linearGradient><path d="m173.21 209.99h-90.42c-20.23 0-36.78-16.55-36.78-36.78v-90.42c0-20.23 16.55-36.78 36.78-36.78h90.42c20.23 0 36.78 16.55 36.78 36.78v90.42c0 20.23-16.55 36.78-36.78 36.78z" fill="none" stroke="url(#gj)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="aa" x1="77.613" x2="178.39" y1="40.726" y2="215.27" gradientUnits="userSpaceOnUse"><stop stop-color="#8991C5" offset="0"/><stop stop-color="#505A8A" offset="1"/></linearGradient><path d="m173.1 209.79h-90.2c-20.18 0-36.69-16.51-36.69-36.69v-90.2c0-20.18 16.51-36.69 36.69-36.69h90.2c20.18 0 36.69 16.51 36.69 36.69v90.2c0 20.18-16.51 36.69-36.69 36.69z" fill="none" stroke="url(#aa)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="dy" x1="77.731" x2="178.27" y1="40.932" y2="215.07" gradientUnits="userSpaceOnUse"><stop stop-color="#8991C5" offset="0"/><stop stop-color="#505A8A" offset="1"/></linearGradient><path d="m172.99 209.6h-89.98c-20.13 0-36.6-16.47-36.6-36.6v-89.99c0-20.13 16.47-36.6 36.6-36.6h89.99c20.13 0 36.6 16.47 36.6 36.6v89.99c0 20.13-16.47 36.6-36.61 36.6z" fill="none" stroke="url(#dy)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="au" x1="77.85" x2="178.15" y1="41.138" y2="214.86" gradientUnits="userSpaceOnUse"><stop stop-color="#8991C5" offset="0"/><stop stop-color="#515B8B" offset="1"/></linearGradient><path d="m172.88 209.4h-89.76c-20.08 0-36.52-16.43-36.52-36.52v-89.76c0-20.08 16.43-36.52 36.52-36.52h89.77c20.08 0 36.52 16.43 36.52 36.52v89.77c-0.01 20.08-16.44 36.51-36.53 36.51z" fill="none" stroke="url(#au)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="da" x1="77.969" x2="178.03" y1="41.344" y2="214.66" gradientUnits="userSpaceOnUse"><stop stop-color="#8991C5" offset="0"/><stop stop-color="#515B8B" offset="1"/></linearGradient><path d="m172.77 209.2h-89.54c-20.03 0-36.43-16.39-36.43-36.43v-89.54c0-20.03 16.39-36.43 36.43-36.43h89.55c20.03 0 36.43 16.39 36.43 36.43v89.55c-0.01 20.03-16.4 36.42-36.44 36.42z" fill="none" stroke="url(#da)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="ci" x1="78.088" x2="177.91" y1="41.55" y2="214.45" gradientUnits="userSpaceOnUse"><stop stop-color="#8991C5" offset="0"/><stop stop-color="#515B8B" offset="1"/></linearGradient><path d="m172.67 209h-89.34c-19.98 0-36.33-16.35-36.33-36.33v-89.34c0-19.98 16.35-36.33 36.33-36.33h89.33c19.99 0 36.34 16.35 36.34 36.33v89.33c0 19.99-16.35 36.34-36.33 36.34z" fill="none" stroke="url(#ci)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="fc" x1="78.207" x2="177.79" y1="41.756" y2="214.24" gradientUnits="userSpaceOnUse"><stop stop-color="#8991C5" offset="0"/><stop stop-color="#515B8B" offset="1"/></linearGradient><path d="m172.56 208.81h-89.12c-19.94 0-36.25-16.31-36.25-36.25v-89.12c0-19.94 16.31-36.25 36.25-36.25h89.11c19.94 0 36.25 16.31 36.25 36.25v89.11c0.01 19.94-16.31 36.26-36.24 36.26z" fill="none" stroke="url(#fc)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="dm" x1="78.326" x2="177.67" y1="41.962" y2="214.04" gradientUnits="userSpaceOnUse"><stop stop-color="#8991C5" offset="0"/><stop stop-color="#515B8C" offset="1"/></linearGradient><path d="m172.45 208.61h-88.9c-19.89 0-36.16-16.27-36.16-36.16v-88.9c0-19.89 16.27-36.16 36.16-36.16h88.89c19.89 0 36.16 16.27 36.16 36.16v88.89c0.01 19.9-16.26 36.17-36.15 36.17z" fill="none" stroke="url(#dm)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="go" x1="78.445" x2="177.56" y1="42.168" y2="213.83" gradientUnits="userSpaceOnUse"><stop stop-color="#8991C5" offset="0"/><stop stop-color="#515B8C" offset="1"/></linearGradient><path d="m172.34 208.41h-88.68c-19.84 0-36.07-16.23-36.07-36.07v-88.68c0-19.84 16.23-36.07 36.07-36.07h88.68c19.84 0 36.07 16.23 36.07 36.07v88.68c0 19.84-16.23 36.07-36.07 36.07z" fill="none" stroke="url(#go)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="ds" x1="78.563" x2="177.44" y1="42.374" y2="213.63" gradientUnits="userSpaceOnUse"><stop stop-color="#8991C5" offset="0"/><stop stop-color="#515B8C" offset="1"/></linearGradient><path d="m172.23 208.21h-88.46c-19.79 0-35.98-16.19-35.98-35.98v-88.46c0-19.79 16.19-35.98 35.98-35.98h88.46c19.79 0 35.98 16.19 35.98 35.98v88.46c0 19.79-16.19 35.98-35.98 35.98z" fill="none" stroke="url(#ds)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="fz" x1="78.682" x2="177.32" y1="42.579" y2="213.42" gradientUnits="userSpaceOnUse"><stop stop-color="#8991C5" offset="0"/><stop stop-color="#525B8C" offset="1"/></linearGradient><path d="m172.12 208.01h-88.24c-19.74 0-35.89-16.15-35.89-35.89v-88.24c0-19.74 16.15-35.89 35.89-35.89h88.24c19.74 0 35.89 16.15 35.89 35.89v88.24c0 19.74-16.15 35.89-35.89 35.89z" fill="none" stroke="url(#fz)" stroke-miterlimit="10" stroke-width="5"/><path class="st102" d="m128.21 128.38h-0.42c-0.09 0-0.17-0.08-0.17-0.17v-0.42c0-0.09 0.08-0.17 0.17-0.17h0.42c0.09 0 0.17 0.08 0.17 0.17v0.42c0 0.09-0.08 0.17-0.17 0.17z"/><linearGradient id="do" x1="126.05" x2="129.95" y1="124.62" y2="131.38" gradientUnits="userSpaceOnUse"><stop stop-color="#757EB5" offset="0"/><stop stop-color="#757EB4" offset="1"/></linearGradient><path d="m128.64 129.17h-1.29c-0.29 0-0.52-0.24-0.52-0.52v-1.29c0-0.29 0.24-0.52 0.52-0.52h1.29c0.29 0 0.52 0.24 0.52 0.52v1.29c0.01 0.28-0.23 0.52-0.52 0.52z" fill="none" stroke="url(#do)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="bk" x1="125.57" x2="130.43" y1="123.8" y2="132.2" gradientUnits="userSpaceOnUse"><stop stop-color="#757EB5" offset="0"/><stop stop-color="#757DB3" offset="1"/></linearGradient><path d="m129.08 129.96h-2.16c-0.48 0-0.88-0.39-0.88-0.88v-2.16c0-0.48 0.39-0.88 0.88-0.88h2.16c0.48 0 0.88 0.39 0.88 0.88v2.16c0 0.48-0.4 0.88-0.88 0.88z" fill="none" stroke="url(#bk)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="ch" x1="125.1" x2="130.9" y1="122.98" y2="133.02" gradientUnits="userSpaceOnUse"><stop stop-color="#767FB5" offset="0"/><stop stop-color="#747DB3" offset="1"/></linearGradient><path d="m129.51 130.74h-3.03c-0.68 0-1.23-0.55-1.23-1.23v-3.03c0-0.68 0.55-1.23 1.23-1.23h3.03c0.68 0 1.23 0.55 1.23 1.23v3.03c0 0.68-0.55 1.23-1.23 1.23z" fill="none" stroke="url(#ch)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="c" x1="124.63" x2="131.37" y1="122.16" y2="133.84" gradientUnits="userSpaceOnUse"><stop stop-color="#767FB5" offset="0"/><stop stop-color="#747DB2" offset="1"/></linearGradient><path d="m129.95 131.53h-3.9c-0.87 0-1.58-0.71-1.58-1.58v-3.9c0-0.87 0.71-1.58 1.58-1.58h3.9c0.87 0 1.58 0.71 1.58 1.58v3.9c0 0.87-0.71 1.58-1.58 1.58z" fill="none" stroke="url(#c)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="df" x1="124.15" x2="131.85" y1="121.34" y2="134.66" gradientUnits="userSpaceOnUse"><stop stop-color="#767FB5" offset="0"/><stop stop-color="#737CB2" offset="1"/></linearGradient><path d="m130.38 132.32h-4.77c-1.07 0-1.94-0.87-1.94-1.94v-4.77c0-1.07 0.87-1.94 1.94-1.94h4.77c1.07 0 1.94 0.87 1.94 1.94v4.77c0 1.07-0.87 1.94-1.94 1.94z" fill="none" stroke="url(#df)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="gw" x1="123.68" x2="132.32" y1="120.52" y2="135.48" gradientUnits="userSpaceOnUse"><stop stop-color="#777FB5" offset="0"/><stop stop-color="#737CB2" offset="1"/></linearGradient><path d="m130.82 133.11h-5.64c-1.26 0-2.29-1.03-2.29-2.29v-5.64c0-1.26 1.03-2.29 2.29-2.29h5.64c1.26 0 2.29 1.03 2.29 2.29v5.64c0 1.26-1.03 2.29-2.29 2.29z" fill="none" stroke="url(#gw)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="fa" x1="123.21" x2="132.79" y1="119.7" y2="136.3" gradientUnits="userSpaceOnUse"><stop stop-color="#777FB5" offset="0"/><stop stop-color="#737CB2" offset="1"/></linearGradient><path d="m131.25 133.9h-6.51c-1.46 0-2.65-1.19-2.65-2.65v-6.51c0-1.46 1.19-2.65 2.65-2.65h6.51c1.46 0 2.65 1.19 2.65 2.65v6.51c0 1.46-1.19 2.65-2.65 2.65z" fill="none" stroke="url(#fa)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="ew" x1="122.73" x2="133.27" y1="118.88" y2="137.12" gradientUnits="userSpaceOnUse"><stop stop-color="#777FB5" offset="0"/><stop stop-color="#737BB1" offset="1"/></linearGradient><path d="m131.69 134.69h-7.37c-1.65 0-3-1.35-3-3v-7.37c0-1.65 1.35-3 3-3h7.37c1.65 0 3 1.35 3 3v7.37c0 1.65-1.35 3-3 3z" fill="none" stroke="url(#ew)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="h" x1="122.26" x2="133.74" y1="118.06" y2="137.94" gradientUnits="userSpaceOnUse"><stop stop-color="#7780B5" offset="0"/><stop stop-color="#727BB1" offset="1"/></linearGradient><path d="m132.12 135.48h-8.24c-1.84 0-3.35-1.51-3.35-3.35v-8.24c0-1.84 1.51-3.35 3.35-3.35h8.24c1.84 0 3.35 1.51 3.35 3.35v8.24c0.01 1.84-1.5 3.35-3.35 3.35z" fill="none" stroke="url(#h)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="ck" x1="121.79" x2="134.21" y1="117.24" y2="138.76" gradientUnits="userSpaceOnUse"><stop stop-color="#7780B5" offset="0"/><stop stop-color="#727BB0" offset="1"/></linearGradient><path d="m132.56 136.26h-9.11c-2.04 0-3.71-1.67-3.71-3.71v-9.11c0-2.04 1.67-3.71 3.71-3.71h9.11c2.04 0 3.71 1.67 3.71 3.71v9.11c-0.01 2.05-1.67 3.71-3.71 3.71z" fill="none" stroke="url(#ck)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="br" x1="121.31" x2="134.69" y1="116.42" y2="139.58" gradientUnits="userSpaceOnUse"><stop stop-color="#7780B5" offset="0"/><stop stop-color="#717AB0" offset="1"/></linearGradient><path d="m132.99 137.05h-9.98c-2.23 0-4.06-1.83-4.06-4.06v-9.98c0-2.23 1.83-4.06 4.06-4.06h9.98c2.23 0 4.06 1.83 4.06 4.06v9.98c0 2.24-1.82 4.06-4.06 4.06z" fill="none" stroke="url(#br)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="eh" x1="120.84" x2="135.16" y1="115.6" y2="140.4" gradientUnits="userSpaceOnUse"><stop stop-color="#7780B6" offset="0"/><stop stop-color="#717AAF" offset="1"/></linearGradient><path d="m133.43 137.84h-10.85c-2.43 0-4.41-1.99-4.41-4.41v-10.85c0-2.43 1.99-4.41 4.41-4.41h10.85c2.43 0 4.41 1.99 4.41 4.41v10.85c0 2.42-1.99 4.41-4.41 4.41z" fill="none" stroke="url(#eh)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="aq" x1="120.36" x2="135.64" y1="114.78" y2="141.23" gradientUnits="userSpaceOnUse"><stop stop-color="#7880B6" offset="0"/><stop stop-color="#7079AE" offset="1"/></linearGradient><path d="m133.86 138.63h-11.72c-2.62 0-4.77-2.15-4.77-4.77v-11.72c0-2.62 2.15-4.77 4.77-4.77h11.72c2.62 0 4.77 2.15 4.77 4.77v11.72c0 2.62-2.15 4.77-4.77 4.77z" fill="none" stroke="url(#aq)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="fs" x1="119.89" x2="136.11" y1="113.95" y2="142.05" gradientUnits="userSpaceOnUse"><stop stop-color="#7880B6" offset="0"/><stop stop-color="#7079AE" offset="1"/></linearGradient><path d="m134.3 139.42h-12.6c-2.82 0-5.12-2.3-5.12-5.12v-12.6c0-2.82 2.3-5.12 5.12-5.12h12.59c2.82 0 5.12 2.3 5.12 5.12v12.59c0.01 2.82-2.3 5.13-5.11 5.13z" fill="none" stroke="url(#fs)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="dd" x1="119.42" x2="136.58" y1="113.13" y2="142.87" gradientUnits="userSpaceOnUse"><stop stop-color="#7880B6" offset="0"/><stop stop-color="#7078AD" offset="1"/></linearGradient><path d="m134.73 140.21h-13.46c-3.01 0-5.48-2.46-5.48-5.48v-13.46c0-3.01 2.46-5.48 5.48-5.48h13.46c3.01 0 5.48 2.46 5.48 5.48v13.46c0 3.01-2.47 5.48-5.48 5.48z" fill="none" stroke="url(#dd)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="gu" x1="118.94" x2="137.06" y1="112.31" y2="143.69" gradientUnits="userSpaceOnUse"><stop stop-color="#7980B7" offset="0"/><stop stop-color="#7078AD" offset="1"/></linearGradient><path d="m135.17 140.99h-14.33c-3.21 0-5.83-2.62-5.83-5.83v-14.33c0-3.21 2.62-5.83 5.83-5.83h14.33c3.21 0 5.83 2.62 5.83 5.83v14.33c-0.01 3.21-2.63 5.83-5.83 5.83z" fill="none" stroke="url(#gu)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="ej" x1="118.47" x2="137.53" y1="111.49" y2="144.51" gradientUnits="userSpaceOnUse"><stop stop-color="#7980B7" offset="0"/><stop stop-color="#6F78AD" offset="1"/></linearGradient><path d="m135.6 141.78h-15.2c-3.4 0-6.18-2.78-6.18-6.18v-15.2c0-3.4 2.78-6.18 6.18-6.18h15.2c3.4 0 6.18 2.78 6.18 6.18v15.2c0 3.4-2.78 6.18-6.18 6.18z" fill="none" stroke="url(#ej)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="av" x1="118" x2="138" y1="110.67" y2="145.33" gradientUnits="userSpaceOnUse"><stop stop-color="#7980B7" offset="0"/><stop stop-color="#6F77AC" offset="1"/></linearGradient><path d="m136.03 142.57h-16.07c-3.6 0-6.54-2.94-6.54-6.54v-16.07c0-3.6 2.94-6.54 6.54-6.54h16.07c3.6 0 6.54 2.94 6.54 6.54v16.07c0 3.6-2.94 6.54-6.54 6.54z" fill="none" stroke="url(#av)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="gg" x1="117.52" x2="138.48" y1="109.85" y2="146.15" gradientUnits="userSpaceOnUse"><stop stop-color="#7980B7" offset="0"/><stop stop-color="#6E77AC" offset="1"/></linearGradient><path d="m136.47 143.36h-16.94c-3.79 0-6.89-3.1-6.89-6.89v-16.94c0-3.79 3.1-6.89 6.89-6.89h16.94c3.79 0 6.89 3.1 6.89 6.89v16.94c0 3.79-3.1 6.89-6.89 6.89z" fill="none" stroke="url(#gg)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="n" x1="117.05" x2="138.95" y1="109.03" y2="146.97" gradientUnits="userSpaceOnUse"><stop stop-color="#7981B7" offset="0"/><stop stop-color="#6E77AB" offset="1"/></linearGradient><path d="m136.9 144.15h-17.8c-3.98 0-7.24-3.26-7.24-7.24v-17.81c0-3.98 3.26-7.24 7.24-7.24h17.81c3.98 0 7.24 3.26 7.24 7.24v17.81c0 3.98-3.26 7.24-7.25 7.24z" fill="none" stroke="url(#n)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="de" x1="116.58" x2="139.42" y1="108.21" y2="147.79" gradientUnits="userSpaceOnUse"><stop stop-color="#7981B7" offset="0"/><stop stop-color="#6E77AB" offset="1"/></linearGradient><path d="m137.34 144.94h-18.68c-4.18 0-7.6-3.42-7.6-7.6v-18.68c0-4.18 3.42-7.6 7.6-7.6h18.68c4.18 0 7.6 3.42 7.6 7.6v18.68c0 4.18-3.42 7.6-7.6 7.6z" fill="none" stroke="url(#de)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="eb" x1="116.1" x2="139.9" y1="107.39" y2="148.61" gradientUnits="userSpaceOnUse"><stop stop-color="#7981B7" offset="0"/><stop stop-color="#6E76AB" offset="1"/></linearGradient><path d="m137.77 145.73h-19.55c-4.37 0-7.95-3.58-7.95-7.95v-19.55c0-4.37 3.58-7.95 7.95-7.95h19.55c4.37 0 7.95 3.58 7.95 7.95v19.55c0.01 4.37-3.57 7.95-7.95 7.95z" fill="none" stroke="url(#eb)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="eu" x1="115.63" x2="140.37" y1="106.57" y2="149.43" gradientUnits="userSpaceOnUse"><stop stop-color="#7A81B7" offset="0"/><stop stop-color="#6D76AA" offset="1"/></linearGradient><path d="m138.21 146.51h-20.42c-4.57 0-8.31-3.74-8.31-8.31v-20.42c0-4.57 3.74-8.31 8.31-8.31h20.42c4.57 0 8.31 3.74 8.31 8.31v20.42c-0.01 4.58-3.74 8.31-8.31 8.31z" fill="none" stroke="url(#eu)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="bb" x1="115.15" x2="140.85" y1="105.75" y2="150.25" gradientUnits="userSpaceOnUse"><stop stop-color="#7A82B8" offset="0"/><stop stop-color="#6D75AA" offset="1"/></linearGradient><path d="m138.64 147.3h-21.29c-4.76 0-8.66-3.9-8.66-8.66v-21.29c0-4.76 3.9-8.66 8.66-8.66h21.29c4.76 0 8.66 3.9 8.66 8.66v21.29c0 4.77-3.89 8.66-8.66 8.66z" fill="none" stroke="url(#bb)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="es" x1="114.68" x2="141.32" y1="104.93" y2="151.07" gradientUnits="userSpaceOnUse"><stop stop-color="#7A82B8" offset="0"/><stop stop-color="#6C74A8" offset="1"/></linearGradient><path d="m139.08 148.09h-22.16c-4.96 0-9.01-4.06-9.01-9.01v-22.16c0-4.96 4.06-9.01 9.01-9.01h22.16c4.96 0 9.01 4.06 9.01 9.01v22.16c0 4.96-4.05 9.01-9.01 9.01z" fill="none" stroke="url(#es)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="m" x1="114.21" x2="141.79" y1="104.11" y2="151.89" gradientUnits="userSpaceOnUse"><stop stop-color="#7B82B8" offset="0"/><stop stop-color="#6C74A8" offset="1"/></linearGradient><path d="m139.51 148.88h-23.03c-5.15 0-9.37-4.21-9.37-9.37v-23.03c0-5.15 4.21-9.37 9.37-9.37h23.03c5.15 0 9.37 4.21 9.37 9.37v23.03c0 5.15-4.22 9.37-9.37 9.37z" fill="none" stroke="url(#m)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="fr" x1="113.73" x2="142.27" y1="103.29" y2="152.71" gradientUnits="userSpaceOnUse"><stop stop-color="#7B82B8" offset="0"/><stop stop-color="#6B74A8" offset="1"/></linearGradient><path d="m139.95 149.67h-23.9c-5.35 0-9.72-4.37-9.72-9.72v-23.9c0-5.35 4.37-9.72 9.72-9.72h23.9c5.35 0 9.72 4.37 9.72 9.72v23.9c0 5.34-4.38 9.72-9.72 9.72z" fill="none" stroke="url(#fr)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="d" x1="113.26" x2="142.74" y1="102.47" y2="153.53" gradientUnits="userSpaceOnUse"><stop stop-color="#7B82B9" offset="0"/><stop stop-color="#6B74A7" offset="1"/></linearGradient><path d="m140.38 150.46h-24.76c-5.54 0-10.07-4.53-10.07-10.07v-24.76c0-5.54 4.53-10.07 10.07-10.07h24.76c5.54 0 10.07 4.53 10.07 10.07v24.76c0.01 5.53-4.53 10.07-10.07 10.07z" fill="none" stroke="url(#d)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="dj" x1="112.79" x2="143.21" y1="101.65" y2="154.35" gradientUnits="userSpaceOnUse"><stop stop-color="#7B82B9" offset="0"/><stop stop-color="#6B73A7" offset="1"/></linearGradient><path d="m140.82 151.24h-25.63c-5.74 0-10.43-4.69-10.43-10.43v-25.63c0-5.74 4.69-10.43 10.43-10.43h25.63c5.74 0 10.43 4.69 10.43 10.43v25.63c-0.01 5.74-4.7 10.43-10.43 10.43z" fill="none" stroke="url(#dj)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="co" x1="112.31" x2="143.69" y1="100.83" y2="155.17" gradientUnits="userSpaceOnUse"><stop stop-color="#7B83B9" offset="0"/><stop stop-color="#6B73A7" offset="1"/></linearGradient><path d="m141.25 152.03h-26.5c-5.93 0-10.78-4.85-10.78-10.78v-26.5c0-5.93 4.85-10.78 10.78-10.78h26.5c5.93 0 10.78 4.85 10.78 10.78v26.5c0 5.93-4.85 10.78-10.78 10.78z" fill="none" stroke="url(#co)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="bc" x1="111.84" x2="144.16" y1="100.01" y2="155.99" gradientUnits="userSpaceOnUse"><stop stop-color="#7B83B9" offset="0"/><stop stop-color="#6A72A6" offset="1"/></linearGradient><path d="m141.69 152.82h-27.37c-6.12 0-11.13-5.01-11.13-11.13v-27.37c0-6.12 5.01-11.13 11.13-11.13h27.37c6.12 0 11.13 5.01 11.13 11.13v27.37c0 6.12-5.01 11.13-11.13 11.13z" fill="none" stroke="url(#bc)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="q" x1="111.36" x2="144.63" y1="99.187" y2="156.81" gradientUnits="userSpaceOnUse"><stop stop-color="#7B83B9" offset="0"/><stop stop-color="#6972A6" offset="1"/></linearGradient><path d="m142.12 153.61h-28.24c-6.32 0-11.49-5.17-11.49-11.49v-28.24c0-6.32 5.17-11.49 11.49-11.49h28.24c6.32 0 11.49 5.17 11.49 11.49v28.24c0 6.32-5.17 11.49-11.49 11.49z" fill="none" stroke="url(#q)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="ez" x1="110.89" x2="145.11" y1="98.367" y2="157.63" gradientUnits="userSpaceOnUse"><stop stop-color="#7C83B9" offset="0"/><stop stop-color="#6972A5" offset="1"/></linearGradient><path d="m142.56 154.4h-29.11c-6.51 0-11.84-5.33-11.84-11.84v-29.11c0-6.51 5.33-11.84 11.84-11.84h29.11c6.51 0 11.84 5.33 11.84 11.84v29.11c0 6.51-5.33 11.84-11.84 11.84z" fill="none" stroke="url(#ez)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="dz" x1="110.42" x2="145.58" y1="97.547" y2="158.45" gradientUnits="userSpaceOnUse"><stop stop-color="#7C83B9" offset="0"/><stop stop-color="#6972A5" offset="1"/></linearGradient><path d="m142.99 155.19h-29.98c-6.71 0-12.2-5.49-12.2-12.2v-29.98c0-6.71 5.49-12.2 12.2-12.2h29.98c6.71 0 12.2 5.49 12.2 12.2v29.98c0 6.71-5.49 12.2-12.2 12.2z" fill="none" stroke="url(#dz)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="fh" x1="109.94" x2="146.06" y1="96.726" y2="159.27" gradientUnits="userSpaceOnUse"><stop stop-color="#7C84BA" offset="0"/><stop stop-color="#6971A5" offset="1"/></linearGradient><path d="m143.43 155.98h-30.85c-6.9 0-12.55-5.65-12.55-12.55v-30.85c0-6.9 5.65-12.55 12.55-12.55h30.85c6.9 0 12.55 5.65 12.55 12.55v30.85c0 6.9-5.65 12.55-12.55 12.55z" fill="none" stroke="url(#fh)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="ao" x1="109.47" x2="146.53" y1="95.906" y2="160.09" gradientUnits="userSpaceOnUse"><stop stop-color="#7D84BA" offset="0"/><stop stop-color="#6871A5" offset="1"/></linearGradient><path d="m143.86 156.76h-31.72c-7.1 0-12.9-5.81-12.9-12.9v-31.72c0-7.1 5.81-12.9 12.9-12.9h31.72c7.1 0 12.9 5.81 12.9 12.9v31.72c0 7.1-5.8 12.9-12.9 12.9z" fill="none" stroke="url(#ao)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="ae" x1="109" x2="147" y1="95.085" y2="160.91" gradientUnits="userSpaceOnUse"><stop stop-color="#7D84BA" offset="0"/><stop stop-color="#6870A3" offset="1"/></linearGradient><path d="m144.3 157.55h-32.6c-7.29 0-13.26-5.97-13.26-13.26v-32.59c0-7.29 5.97-13.26 13.26-13.26h32.59c7.29 0 13.26 5.97 13.26 13.26v32.59c0 7.3-5.96 13.26-13.25 13.26z" fill="none" stroke="url(#ae)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="gh" x1="108.52" x2="147.48" y1="94.265" y2="161.74" gradientUnits="userSpaceOnUse"><stop stop-color="#7D84BA" offset="0"/><stop stop-color="#6770A3" offset="1"/></linearGradient><path d="m144.73 158.34h-33.46c-7.49 0-13.61-6.12-13.61-13.61v-33.46c0-7.49 6.12-13.61 13.61-13.61h33.46c7.49 0 13.61 6.12 13.61 13.61v33.46c0 7.49-6.12 13.61-13.61 13.61z" fill="none" stroke="url(#gh)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="cq" x1="108.05" x2="147.95" y1="93.445" y2="162.56" gradientUnits="userSpaceOnUse"><stop stop-color="#7D84BB" offset="0"/><stop stop-color="#676FA3" offset="1"/></linearGradient><path d="m145.16 159.13h-34.33c-7.68 0-13.96-6.28-13.96-13.96v-34.33c0-7.68 6.28-13.96 13.96-13.96h34.33c7.68 0 13.96 6.28 13.96 13.96v34.33c0.01 7.68-6.27 13.96-13.96 13.96z" fill="none" stroke="url(#cq)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="cs" x1="107.58" x2="148.42" y1="92.624" y2="163.38" gradientUnits="userSpaceOnUse"><stop stop-color="#7D85BB" offset="0"/><stop stop-color="#666FA2" offset="1"/></linearGradient><path d="m145.6 159.92h-35.2c-7.87 0-14.32-6.44-14.32-14.32v-35.2c0-7.87 6.44-14.32 14.32-14.32h35.2c7.87 0 14.32 6.44 14.32 14.32v35.2c0 7.87-6.45 14.32-14.32 14.32z" fill="none" stroke="url(#cs)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="bs" x1="107.1" x2="148.9" y1="91.804" y2="164.2" gradientUnits="userSpaceOnUse"><stop stop-color="#7D85BB" offset="0"/><stop stop-color="#666FA2" offset="1"/></linearGradient><path d="m146.03 160.71h-36.07c-8.07 0-14.67-6.6-14.67-14.67v-36.07c0-8.07 6.6-14.67 14.67-14.67h36.07c8.07 0 14.67 6.6 14.67 14.67v36.07c0.01 8.06-6.6 14.67-14.67 14.67z" fill="none" stroke="url(#bs)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="bz" x1="106.63" x2="149.37" y1="90.983" y2="165.02" gradientUnits="userSpaceOnUse"><stop stop-color="#7D85BB" offset="0"/><stop stop-color="#666FA2" offset="1"/></linearGradient><path d="m146.47 161.49h-36.94c-8.26 0-15.03-6.76-15.03-15.03v-36.94c0-8.26 6.76-15.03 15.03-15.03h36.94c8.26 0 15.03 6.76 15.03 15.03v36.94c-0.01 8.27-6.77 15.03-15.03 15.03z" fill="none" stroke="url(#bz)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="ev" x1="106.15" x2="149.85" y1="90.163" y2="165.84" gradientUnits="userSpaceOnUse"><stop stop-color="#7E85BB" offset="0"/><stop stop-color="#666EA1" offset="1"/></linearGradient><path d="m146.9 162.28h-37.8c-8.46 0-15.38-6.92-15.38-15.38v-37.8c0-8.46 6.92-15.38 15.38-15.38h37.81c8.46 0 15.38 6.92 15.38 15.38v37.81c-0.01 8.45-6.93 15.37-15.39 15.37z" fill="none" stroke="url(#ev)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="du" x1="105.68" x2="150.32" y1="89.342" y2="166.66" gradientUnits="userSpaceOnUse"><stop stop-color="#7E85BB" offset="0"/><stop stop-color="#656EA1" offset="1"/></linearGradient><path d="m147.34 163.07h-38.68c-8.65 0-15.73-7.08-15.73-15.73v-38.68c0-8.65 7.08-15.73 15.73-15.73h38.68c8.65 0 15.73 7.08 15.73 15.73v38.68c0 8.65-7.08 15.73-15.73 15.73z" fill="none" stroke="url(#du)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="bl" x1="105.21" x2="150.79" y1="88.522" y2="167.48" gradientUnits="userSpaceOnUse"><stop stop-color="#7E85BB" offset="0"/><stop stop-color="#656EA0" offset="1"/></linearGradient><path d="m147.77 163.86h-39.55c-8.85 0-16.09-7.24-16.09-16.09v-39.55c0-8.85 7.24-16.09 16.09-16.09h39.55c8.85 0 16.09 7.24 16.09 16.09v39.55c0 8.85-7.24 16.09-16.09 16.09z" fill="none" stroke="url(#bl)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="ay" x1="104.73" x2="151.27" y1="87.702" y2="168.3" gradientUnits="userSpaceOnUse"><stop stop-color="#7F86BC" offset="0"/><stop stop-color="#646DA0" offset="1"/></linearGradient><path d="m148.21 164.65h-40.42c-9.04 0-16.44-7.4-16.44-16.44v-40.42c0-9.04 7.4-16.44 16.44-16.44h40.42c9.04 0 16.44 7.4 16.44 16.44v40.42c0 9.04-7.4 16.44-16.44 16.44z" fill="none" stroke="url(#ay)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="gq" x1="104.26" x2="151.74" y1="86.881" y2="169.12" gradientUnits="userSpaceOnUse"><stop stop-color="#7F86BC" offset="0"/><stop stop-color="#646DA0" offset="1"/></linearGradient><path d="m148.64 165.44h-41.29c-9.24 0-16.79-7.56-16.79-16.79v-41.29c0-9.24 7.56-16.79 16.79-16.79h41.29c9.24 0 16.79 7.56 16.79 16.79v41.29c0.01 9.23-7.55 16.79-16.79 16.79z" fill="none" stroke="url(#gq)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="ah" x1="103.79" x2="152.21" y1="86.061" y2="169.94" gradientUnits="userSpaceOnUse"><stop stop-color="#7F86BC" offset="0"/><stop stop-color="#646D9F" offset="1"/></linearGradient><path d="m149.08 166.23h-42.16c-9.43 0-17.15-7.72-17.15-17.15v-42.16c0-9.43 7.72-17.15 17.15-17.15h42.16c9.43 0 17.15 7.72 17.15 17.15v42.16c0 9.43-7.72 17.15-17.15 17.15z" fill="none" stroke="url(#ah)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="gl" x1="103.31" x2="152.69" y1="85.24" y2="170.76" gradientUnits="userSpaceOnUse"><stop stop-color="#7F86BC" offset="0"/><stop stop-color="#636C9E" offset="1"/></linearGradient><path d="m149.51 167.01h-43.02c-9.63 0-17.5-7.88-17.5-17.5v-43.02c0-9.63 7.88-17.5 17.5-17.5h43.02c9.63 0 17.5 7.88 17.5 17.5v43.02c0 9.63-7.87 17.5-17.5 17.5z" fill="none" stroke="url(#gl)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="ce" x1="102.84" x2="153.16" y1="84.42" y2="171.58" gradientUnits="userSpaceOnUse"><stop stop-color="#8087BC" offset="0"/><stop stop-color="#636C9E" offset="1"/></linearGradient><path d="m149.95 167.8h-43.89c-9.82 0-17.86-8.03-17.86-17.86v-43.89c0-9.82 8.03-17.86 17.86-17.86h43.89c9.82 0 17.86 8.03 17.86 17.86v43.89c-0.01 9.83-8.04 17.86-17.86 17.86z" fill="none" stroke="url(#ce)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="fu" x1="102.37" x2="153.63" y1="83.6" y2="172.4" gradientUnits="userSpaceOnUse"><stop stop-color="#7F87BD" offset="0"/><stop stop-color="#636B9E" offset="1"/></linearGradient><path d="m150.38 168.59h-44.76c-10.01 0-18.21-8.19-18.21-18.21v-44.76c0-10.01 8.19-18.21 18.21-18.21h44.76c10.01 0 18.21 8.19 18.21 18.21v44.76c0 10.02-8.19 18.21-18.21 18.21z" fill="none" stroke="url(#fu)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="el" x1="101.89" x2="154.11" y1="82.779" y2="173.22" gradientUnits="userSpaceOnUse"><stop stop-color="#7F87BD" offset="0"/><stop stop-color="#626B9E" offset="1"/></linearGradient><path d="m150.82 169.38h-45.63c-10.21 0-18.56-8.35-18.56-18.56v-45.63c0-10.21 8.35-18.56 18.56-18.56h45.63c10.21 0 18.56 8.35 18.56 18.56v45.63c0 10.21-8.35 18.56-18.56 18.56z" fill="none" stroke="url(#el)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="af" x1="101.42" x2="154.58" y1="81.959" y2="174.04" gradientUnits="userSpaceOnUse"><stop stop-color="#8087BD" offset="0"/><stop stop-color="#626B9D" offset="1"/></linearGradient><path d="m151.25 170.17h-46.5c-10.4 0-18.92-8.51-18.92-18.92v-46.5c0-10.4 8.51-18.92 18.92-18.92h46.5c10.4 0 18.92 8.51 18.92 18.92v46.5c0 10.41-8.51 18.92-18.92 18.92z" fill="none" stroke="url(#af)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="aw" x1="100.94" x2="155.06" y1="81.138" y2="174.86" gradientUnits="userSpaceOnUse"><stop stop-color="#8088BD" offset="0"/><stop stop-color="#626B9D" offset="1"/></linearGradient><path d="m151.69 170.96h-47.37c-10.6 0-19.27-8.67-19.27-19.27v-47.37c0-10.6 8.67-19.27 19.27-19.27h47.37c10.6 0 19.27 8.67 19.27 19.27v47.37c0 10.59-8.68 19.27-19.27 19.27z" fill="none" stroke="url(#aw)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="bj" x1="100.47" x2="155.53" y1="80.318" y2="175.68" gradientUnits="userSpaceOnUse"><stop stop-color="#8088BD" offset="0"/><stop stop-color="#626A9C" offset="1"/></linearGradient><path d="m152.12 171.74h-48.24c-10.79 0-19.62-8.83-19.62-19.62v-48.24c0-10.79 8.83-19.62 19.62-19.62h48.24c10.79 0 19.62 8.83 19.62 19.62v48.24c0 10.79-8.83 19.62-19.62 19.62z" fill="none" stroke="url(#bj)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="gt" x1="99.997" x2="156" y1="79.498" y2="176.5" gradientUnits="userSpaceOnUse"><stop stop-color="#8088BD" offset="0"/><stop stop-color="#616A9C" offset="1"/></linearGradient><path d="m152.56 172.53h-49.11c-10.99 0-19.98-8.99-19.98-19.98v-49.11c0-10.99 8.99-19.98 19.98-19.98h49.11c10.99 0 19.98 8.99 19.98 19.98v49.11c-0.01 10.99-9 19.98-19.98 19.98z" fill="none" stroke="url(#gt)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="fo" x1="99.523" x2="156.48" y1="78.677" y2="177.32" gradientUnits="userSpaceOnUse"><stop stop-color="#8088BD" offset="0"/><stop stop-color="#616A9C" offset="1"/></linearGradient><path d="m152.99 173.32h-49.98c-11.18 0-20.33-9.15-20.33-20.33v-49.98c0-11.18 9.15-20.33 20.33-20.33h49.98c11.18 0 20.33 9.15 20.33 20.33v49.98c0 11.18-9.15 20.33-20.33 20.33z" fill="none" stroke="url(#fo)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="fl" x1="99.05" x2="156.95" y1="77.857" y2="178.14" gradientUnits="userSpaceOnUse"><stop stop-color="#8088BE" offset="0"/><stop stop-color="#60699B" offset="1"/></linearGradient><path d="m153.43 174.11h-50.85c-11.38 0-20.68-9.31-20.68-20.68v-50.85c0-11.38 9.31-20.68 20.68-20.68h50.85c11.38 0 20.68 9.31 20.68 20.68v50.85c0 11.37-9.31 20.68-20.68 20.68z" fill="none" stroke="url(#fl)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="at" x1="98.576" x2="157.42" y1="77.036" y2="178.96" gradientUnits="userSpaceOnUse"><stop stop-color="#8088BE" offset="0"/><stop stop-color="#60699B" offset="1"/></linearGradient><path d="m153.86 174.9h-51.72c-11.57 0-21.04-9.47-21.04-21.04v-51.72c0-11.57 9.47-21.04 21.04-21.04h51.72c11.57 0 21.04 9.47 21.04 21.04v51.72c0 11.57-9.47 21.04-21.04 21.04z" fill="none" stroke="url(#at)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="ed" x1="98.103" x2="157.9" y1="76.216" y2="179.78" gradientUnits="userSpaceOnUse"><stop stop-color="#8188BE" offset="0"/><stop stop-color="#60689A" offset="1"/></linearGradient><path d="m154.29 175.69h-52.59c-11.77 0-21.39-9.63-21.39-21.39v-52.59c0-11.77 9.63-21.39 21.39-21.39h52.59c11.77 0 21.39 9.63 21.39 21.39v52.59c0.01 11.76-9.62 21.39-21.39 21.39z" fill="none" stroke="url(#ed)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="gc" x1="97.629" x2="158.37" y1="75.396" y2="180.6" gradientUnits="userSpaceOnUse"><stop stop-color="#8189BE" offset="0"/><stop stop-color="#5F689A" offset="1"/></linearGradient><path d="m154.73 176.48h-53.46c-11.96 0-21.75-9.79-21.75-21.75v-53.46c0-11.96 9.79-21.75 21.75-21.75h53.46c11.96 0 21.75 9.79 21.75 21.75v53.46c0 11.96-9.79 21.75-21.75 21.75z" fill="none" stroke="url(#gc)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="fw" x1="97.155" x2="158.84" y1="74.575" y2="181.42" gradientUnits="userSpaceOnUse"><stop stop-color="#8189BE" offset="0"/><stop stop-color="#5F6799" offset="1"/></linearGradient><path d="m155.16 177.26h-54.33c-12.15 0-22.1-9.94-22.1-22.1v-54.33c0-12.15 9.94-22.1 22.1-22.1h54.33c12.15 0 22.1 9.94 22.1 22.1v54.33c0 12.16-9.94 22.1-22.1 22.1z" fill="none" stroke="url(#fw)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="bv" x1="96.682" x2="159.32" y1="73.755" y2="182.25" gradientUnits="userSpaceOnUse"><stop stop-color="#8189BE" offset="0"/><stop stop-color="#5F6799" offset="1"/></linearGradient><path d="m155.6 178.05h-55.2c-12.35 0-22.45-10.1-22.45-22.45v-55.2c0-12.35 10.1-22.45 22.45-22.45h55.2c12.35 0 22.45 10.1 22.45 22.45v55.2c0 12.35-10.1 22.45-22.45 22.45z" fill="none" stroke="url(#bv)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="s" x1="96.208" x2="159.79" y1="72.934" y2="183.07" gradientUnits="userSpaceOnUse"><stop stop-color="#8189BF" offset="0"/><stop stop-color="#5E6799" offset="1"/></linearGradient><path d="m156.03 178.84h-56.06c-12.54 0-22.81-10.26-22.81-22.81v-56.06c0-12.54 10.26-22.81 22.81-22.81h56.07c12.54 0 22.81 10.26 22.81 22.81v56.07c-0.01 12.54-10.27 22.8-22.82 22.8z" fill="none" stroke="url(#s)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="gi" x1="95.734" x2="160.27" y1="72.114" y2="183.89" gradientUnits="userSpaceOnUse"><stop stop-color="#818ABF" offset="0"/><stop stop-color="#5E6798" offset="1"/></linearGradient><path d="m156.47 179.63h-56.94c-12.74 0-23.16-10.42-23.16-23.16v-56.94c0-12.74 10.42-23.16 23.16-23.16h56.94c12.74 0 23.16 10.42 23.16 23.16v56.94c0 12.74-10.42 23.16-23.16 23.16z" fill="none" stroke="url(#gi)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="fb" x1="95.26" x2="160.74" y1="71.294" y2="184.71" gradientUnits="userSpaceOnUse"><stop stop-color="#828ABF" offset="0"/><stop stop-color="#5D6698" offset="1"/></linearGradient><path d="m156.9 180.42h-57.8c-12.93 0-23.51-10.58-23.51-23.51v-57.81c0-12.93 10.58-23.51 23.51-23.51h57.81c12.93 0 23.51 10.58 23.51 23.51v57.81c0 12.93-10.58 23.51-23.52 23.51z" fill="none" stroke="url(#fb)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="g" x1="94.787" x2="161.21" y1="70.473" y2="185.53" gradientUnits="userSpaceOnUse"><stop stop-color="#828ABF" offset="0"/><stop stop-color="#5D6698" offset="1"/></linearGradient><path d="m157.34 181.21h-58.68c-13.13 0-23.87-10.74-23.87-23.87v-58.68c0-13.13 10.74-23.87 23.87-23.87h58.68c13.13 0 23.87 10.74 23.87 23.87v58.68c0 13.13-10.74 23.87-23.87 23.87z" fill="none" stroke="url(#g)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="et" x1="94.313" x2="161.69" y1="69.653" y2="186.35" gradientUnits="userSpaceOnUse"><stop stop-color="#828ABF" offset="0"/><stop stop-color="#5D6697" offset="1"/></linearGradient><path d="m157.77 181.99h-59.54c-13.32 0-24.22-10.9-24.22-24.22v-59.54c0-13.32 10.9-24.22 24.22-24.22h59.55c13.32 0 24.22 10.9 24.22 24.22v59.55c-0.01 13.31-10.91 24.21-24.23 24.21z" fill="none" stroke="url(#et)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="dp" x1="93.84" x2="162.16" y1="68.832" y2="187.17" gradientUnits="userSpaceOnUse"><stop stop-color="#828BC0" offset="0"/><stop stop-color="#5D6697" offset="1"/></linearGradient><path d="m158.21 182.78h-60.42c-13.52 0-24.58-11.06-24.58-24.58v-60.41c0-13.52 11.06-24.58 24.58-24.58h60.42c13.52 0 24.58 11.06 24.58 24.58v60.42c-0.01 13.51-11.07 24.57-24.58 24.57z" fill="none" stroke="url(#dp)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="fp" x1="93.366" x2="162.63" y1="68.012" y2="187.99" gradientUnits="userSpaceOnUse"><stop stop-color="#838BC0" offset="0"/><stop stop-color="#5C6597" offset="1"/></linearGradient><path d="m158.64 183.57h-61.28c-13.71 0-24.93-11.22-24.93-24.93v-61.28c0-13.71 11.22-24.93 24.93-24.93h61.28c13.71 0 24.93 11.22 24.93 24.93v61.28c0 13.71-11.22 24.93-24.93 24.93z" fill="none" stroke="url(#fp)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="cn" x1="92.892" x2="163.11" y1="67.192" y2="188.81" gradientUnits="userSpaceOnUse"><stop stop-color="#838BC0" offset="0"/><stop stop-color="#5C6597" offset="1"/></linearGradient><path d="m159.08 184.36h-62.16c-13.91 0-25.28-11.38-25.28-25.28v-62.16c0-13.91 11.38-25.28 25.28-25.28h62.15c13.91 0 25.28 11.38 25.28 25.28v62.15c0.01 13.91-11.37 25.29-25.27 25.29z" fill="none" stroke="url(#cn)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="bo" x1="92.419" x2="163.58" y1="66.371" y2="189.63" gradientUnits="userSpaceOnUse"><stop stop-color="#838BC0" offset="0"/><stop stop-color="#5B6596" offset="1"/></linearGradient><path d="m159.51 185.15h-63.02c-14.1 0-25.64-11.54-25.64-25.64v-63.02c0-14.1 11.54-25.64 25.64-25.64h63.02c14.1 0 25.64 11.54 25.64 25.64v63.02c0 14.1-11.54 25.64-25.64 25.64z" fill="none" stroke="url(#bo)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="ge" x1="91.945" x2="164.06" y1="65.551" y2="190.45" gradientUnits="userSpaceOnUse"><stop stop-color="#838BC0" offset="0"/><stop stop-color="#5C6596" offset="1"/></linearGradient><path d="m159.95 185.94h-63.9c-14.29 0-25.99-11.7-25.99-25.99v-63.9c0-14.29 11.7-25.99 25.99-25.99h63.89c14.29 0 25.99 11.7 25.99 25.99v63.89c0.01 14.3-11.69 26-25.98 26z" fill="none" stroke="url(#ge)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="fg" x1="91.471" x2="164.53" y1="64.73" y2="191.27" gradientUnits="userSpaceOnUse"><stop stop-color="#838BC0" offset="0"/><stop stop-color="#5B6495" offset="1"/></linearGradient><path d="m160.38 186.73h-64.76c-14.49 0-26.34-11.85-26.34-26.34v-64.77c0-14.49 11.85-26.34 26.34-26.34h64.76c14.49 0 26.34 11.85 26.34 26.34v64.76c0.01 14.49-11.85 26.35-26.34 26.35z" fill="none" stroke="url(#fg)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="dw" x1="90.998" x2="165" y1="63.91" y2="192.09" gradientUnits="userSpaceOnUse"><stop stop-color="#838BC0" offset="0"/><stop stop-color="#5B6495" offset="1"/></linearGradient><path d="m160.82 187.51h-65.64c-14.68 0-26.7-12.01-26.7-26.7v-65.63c0-14.68 12.01-26.7 26.7-26.7h65.63c14.68 0 26.7 12.01 26.7 26.7v65.63c0 14.69-12.01 26.7-26.69 26.7z" fill="none" stroke="url(#dw)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="fq" x1="90.524" x2="165.48" y1="63.09" y2="192.91" gradientUnits="userSpaceOnUse"><stop stop-color="#838CC1" offset="0"/><stop stop-color="#5A6394" offset="1"/></linearGradient><path d="m161.25 188.3h-66.5c-14.88 0-27.05-12.17-27.05-27.05v-66.5c0-14.88 12.17-27.05 27.05-27.05h66.5c14.88 0 27.05 12.17 27.05 27.05v66.5c0 14.88-12.17 27.05-27.05 27.05z" fill="none" stroke="url(#fq)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="z" x1="90.05" x2="165.95" y1="62.269" y2="193.73" gradientUnits="userSpaceOnUse"><stop stop-color="#848CC2" offset="0"/><stop stop-color="#596394" offset="1"/></linearGradient><path d="m161.69 189.09h-67.38c-15.07 0-27.41-12.33-27.41-27.41v-67.37c0-15.07 12.33-27.41 27.41-27.41h67.37c15.07 0 27.41 12.33 27.41 27.41v67.37c0 15.08-12.33 27.41-27.4 27.41z" fill="none" stroke="url(#z)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="bp" x1="89.577" x2="166.42" y1="61.449" y2="194.55" gradientUnits="userSpaceOnUse"><stop stop-color="#848CC2" offset="0"/><stop stop-color="#596394" offset="1"/></linearGradient><path d="m162.12 189.88h-68.24c-15.27 0-27.76-12.49-27.76-27.76v-68.24c0-15.27 12.49-27.76 27.76-27.76h68.24c15.27 0 27.76 12.49 27.76 27.76v68.24c0 15.27-12.49 27.76-27.76 27.76z" fill="none" stroke="url(#bp)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="am" x1="89.103" x2="166.9" y1="60.628" y2="195.37" gradientUnits="userSpaceOnUse"><stop stop-color="#848CC2" offset="0"/><stop stop-color="#596394" offset="1"/></linearGradient><path d="m162.56 190.67h-69.12c-15.46 0-28.11-12.65-28.11-28.11v-69.12c0-15.46 12.65-28.11 28.11-28.11h69.11c15.46 0 28.11 12.65 28.11 28.11v69.11c0.01 15.47-12.64 28.12-28.1 28.12z" fill="none" stroke="url(#am)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="cr" x1="88.629" x2="167.37" y1="59.808" y2="196.19" gradientUnits="userSpaceOnUse"><stop stop-color="#858DC2" offset="0"/><stop stop-color="#596293" offset="1"/></linearGradient><path d="m162.99 191.46h-69.98c-15.66 0-28.47-12.81-28.47-28.47v-69.98c0-15.66 12.81-28.47 28.47-28.47h69.98c15.66 0 28.47 12.81 28.47 28.47v69.98c0 15.66-12.81 28.47-28.47 28.47z" fill="none" stroke="url(#cr)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="al" x1="88.156" x2="167.84" y1="58.987" y2="197.01" gradientUnits="userSpaceOnUse"><stop stop-color="#858DC2" offset="0"/><stop stop-color="#586293" offset="1"/></linearGradient><path d="m163.42 192.24h-70.84c-15.85 0-28.82-12.97-28.82-28.82v-70.84c0-15.85 12.97-28.82 28.82-28.82h70.85c15.85 0 28.82 12.97 28.82 28.82v70.85c-0.01 15.85-12.97 28.81-28.83 28.81z" fill="none" stroke="url(#al)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="fk" x1="87.682" x2="168.32" y1="58.167" y2="197.83" gradientUnits="userSpaceOnUse"><stop stop-color="#858DC2" offset="0"/><stop stop-color="#586293" offset="1"/></linearGradient><path d="m163.86 193.03h-71.72c-16.05 0-29.17-13.13-29.17-29.17v-71.72c0-16.05 13.13-29.17 29.17-29.17h71.72c16.05 0 29.17 13.13 29.17 29.17v71.72c0 16.04-13.13 29.17-29.17 29.17z" fill="none" stroke="url(#fk)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="dk" x1="87.208" x2="168.79" y1="57.347" y2="198.65" gradientUnits="userSpaceOnUse"><stop stop-color="#858DC2" offset="0"/><stop stop-color="#586192" offset="1"/></linearGradient><path d="m164.29 193.82h-72.58c-16.24 0-29.53-13.29-29.53-29.53v-72.58c0-16.24 13.29-29.53 29.53-29.53h72.59c16.24 0 29.53 13.29 29.53 29.53v72.59c-0.01 16.23-13.3 29.52-29.54 29.52z" fill="none" stroke="url(#dk)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="ad" x1="86.735" x2="169.27" y1="56.526" y2="199.47" gradientUnits="userSpaceOnUse"><stop stop-color="#858EC3" offset="0"/><stop stop-color="#586192" offset="1"/></linearGradient><path d="m164.73 194.61h-73.46c-16.43 0-29.88-13.45-29.88-29.88v-73.46c0-16.43 13.45-29.88 29.88-29.88h73.46c16.43 0 29.88 13.45 29.88 29.88v73.46c0 16.43-13.45 29.88-29.88 29.88z" fill="none" stroke="url(#ad)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="dx" x1="86.261" x2="169.74" y1="55.706" y2="200.29" gradientUnits="userSpaceOnUse"><stop stop-color="#858EC3" offset="0"/><stop stop-color="#576192" offset="1"/></linearGradient><path d="m165.16 195.4h-74.32c-16.63 0-30.23-13.61-30.23-30.23v-74.33c0-16.63 13.61-30.23 30.23-30.23h74.33c16.63 0 30.23 13.61 30.23 30.23v74.33c0 16.62-13.61 30.23-30.24 30.23z" fill="none" stroke="url(#dx)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="fm" x1="85.787" x2="170.21" y1="54.886" y2="201.11" gradientUnits="userSpaceOnUse"><stop stop-color="#858EC3" offset="0"/><stop stop-color="#576091" offset="1"/></linearGradient><path d="m165.6 196.19h-75.2c-16.82 0-30.59-13.76-30.59-30.59v-75.2c0-16.82 13.76-30.59 30.59-30.59h75.2c16.82 0 30.59 13.76 30.59 30.59v75.2c0 16.82-13.77 30.59-30.59 30.59z" fill="none" stroke="url(#fm)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="f" x1="85.314" x2="170.69" y1="54.065" y2="201.93" gradientUnits="userSpaceOnUse"><stop stop-color="#868EC3" offset="0"/><stop stop-color="#566091" offset="1"/></linearGradient><path d="m166.03 196.98h-76.06c-17.02 0-30.94-13.92-30.94-30.94v-76.07c0-17.02 13.92-30.94 30.94-30.94h76.07c17.02 0 30.94 13.92 30.94 30.94v76.07c0 17.01-13.93 30.94-30.95 30.94z" fill="none" stroke="url(#f)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="k" x1="84.84" x2="171.16" y1="53.245" y2="202.76" gradientUnits="userSpaceOnUse"><stop stop-color="#868FC3" offset="0"/><stop stop-color="#566090" offset="1"/></linearGradient><path d="m166.47 197.76h-76.94c-17.21 0-31.3-14.08-31.3-31.3v-76.93c0-17.21 14.08-31.3 31.3-31.3h76.94c17.21 0 31.3 14.08 31.3 31.3v76.94c-0.01 17.21-14.09 31.29-31.3 31.29z" fill="none" stroke="url(#k)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="bh" x1="84.366" x2="171.63" y1="52.424" y2="203.58" gradientUnits="userSpaceOnUse"><stop stop-color="#868FC4" offset="0"/><stop stop-color="#555F90" offset="1"/></linearGradient><path d="m166.9 198.55h-77.8c-17.41 0-31.65-14.24-31.65-31.65v-77.8c0-17.41 14.24-31.65 31.65-31.65h77.81c17.41 0 31.65 14.24 31.65 31.65v77.81c-0.01 17.4-14.25 31.64-31.66 31.64z" fill="none" stroke="url(#bh)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="en" x1="83.893" x2="172.11" y1="51.604" y2="204.4" gradientUnits="userSpaceOnUse"><stop stop-color="#878FC4" offset="0"/><stop stop-color="#555F8F" offset="1"/></linearGradient><path d="m167.34 199.34h-78.68c-17.6 0-32-14.4-32-32v-78.68c0-17.6 14.4-32 32-32h78.68c17.6 0 32 14.4 32 32v78.68c0 17.6-14.4 32-32 32z" fill="none" stroke="url(#en)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="ex" x1="83.419" x2="172.58" y1="50.784" y2="205.22" gradientUnits="userSpaceOnUse"><stop stop-color="#878FC4" offset="0"/><stop stop-color="#555F8F" offset="1"/></linearGradient><path d="m167.77 200.13h-79.54c-17.8 0-32.36-14.56-32.36-32.36v-79.54c0-17.8 14.56-32.36 32.36-32.36h79.54c17.8 0 32.36 14.56 32.36 32.36v79.54c0 17.8-14.56 32.36-32.36 32.36z" fill="none" stroke="url(#ex)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="u" x1="82.945" x2="173.05" y1="49.963" y2="206.04" gradientUnits="userSpaceOnUse"><stop stop-color="#878FC5" offset="0"/><stop stop-color="#555E8F" offset="1"/></linearGradient><path d="m168.21 200.92h-80.42c-17.99 0-32.71-14.72-32.71-32.71v-80.42c0-17.99 14.72-32.71 32.71-32.71h80.41c17.99 0 32.71 14.72 32.71 32.71v80.41c0.01 18-14.71 32.72-32.7 32.72z" fill="none" stroke="url(#u)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="bw" x1="82.472" x2="173.53" y1="49.143" y2="206.86" gradientUnits="userSpaceOnUse"><stop stop-color="#8790C5" offset="0"/><stop stop-color="#545E8F" offset="1"/></linearGradient><path d="m168.64 201.71h-81.28c-18.19 0-33.06-14.88-33.06-33.06v-81.29c0-18.19 14.88-33.06 33.06-33.06h81.28c18.19 0 33.06 14.88 33.06 33.06v81.28c0.01 18.19-14.87 33.07-33.06 33.07z" fill="none" stroke="url(#bw)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="em" x1="81.998" x2="174" y1="48.322" y2="207.68" gradientUnits="userSpaceOnUse"><stop stop-color="#8790C5" offset="0"/><stop stop-color="#545E8F" offset="1"/></linearGradient><path d="m169.08 202.49h-82.16c-18.38 0-33.42-15.04-33.42-33.42v-82.15c0-18.38 15.04-33.42 33.42-33.42h82.15c18.38 0 33.42 15.04 33.42 33.42v82.15c0 18.39-15.03 33.42-33.41 33.42z" fill="none" stroke="url(#em)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="ff" x1="81.524" x2="174.48" y1="47.502" y2="208.5" gradientUnits="userSpaceOnUse"><stop stop-color="#8790C5" offset="0"/><stop stop-color="#545D8E" offset="1"/></linearGradient><path d="m169.51 203.28h-83.02c-18.57 0-33.77-15.2-33.77-33.77v-83.02c0-18.57 15.2-33.77 33.77-33.77h83.02c18.57 0 33.77 15.2 33.77 33.77v83.02c0 18.58-15.19 33.77-33.77 33.77z" fill="none" stroke="url(#ff)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="ga" x1="81.051" x2="174.95" y1="46.681" y2="209.32" gradientUnits="userSpaceOnUse"><stop stop-color="#8790C5" offset="0"/><stop stop-color="#545D8E" offset="1"/></linearGradient><path d="m169.95 204.07h-83.9c-18.77 0-34.13-15.36-34.13-34.13v-83.89c0-18.77 15.36-34.13 34.13-34.13h83.89c18.77 0 34.13 15.36 34.13 34.13v83.89c0 18.78-15.35 34.13-34.12 34.13z" fill="none" stroke="url(#ga)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="dl" x1="80.577" x2="175.42" y1="45.861" y2="210.14" gradientUnits="userSpaceOnUse"><stop stop-color="#8890C5" offset="0"/><stop stop-color="#535D8E" offset="1"/></linearGradient><path d="m170.38 204.86h-84.76c-18.96 0-34.48-15.52-34.48-34.48v-84.76c0-18.96 15.52-34.48 34.48-34.48h84.76c18.96 0 34.48 15.52 34.48 34.48v84.76c0 18.96-15.52 34.48-34.48 34.48z" fill="none" stroke="url(#dl)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="ek" x1="80.103" x2="175.9" y1="45.041" y2="210.96" gradientUnits="userSpaceOnUse"><stop stop-color="#8890C5" offset="0"/><stop stop-color="#535D8D" offset="1"/></linearGradient><path d="m170.82 205.65h-85.64c-19.16 0-34.83-15.67-34.83-34.83v-85.64c0-19.16 15.67-34.83 34.83-34.83h85.63c19.16 0 34.83 15.67 34.83 34.83v85.63c0.01 19.16-15.67 34.84-34.82 34.84z" fill="none" stroke="url(#ek)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="ar" x1="79.63" x2="176.37" y1="44.22" y2="211.78" gradientUnits="userSpaceOnUse"><stop stop-color="#8891C5" offset="0"/><stop stop-color="#525C8C" offset="1"/></linearGradient><path d="m171.25 206.44h-86.5c-19.35 0-35.19-15.83-35.19-35.19v-86.5c0-19.35 15.83-35.19 35.19-35.19h86.5c19.35 0 35.19 15.83 35.19 35.19v86.5c0 19.35-15.84 35.19-35.19 35.19z" fill="none" stroke="url(#ar)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="fn" x1="79.156" x2="176.84" y1="43.4" y2="212.6" gradientUnits="userSpaceOnUse"><stop stop-color="#8991C5" offset="0"/><stop stop-color="#525C8C" offset="1"/></linearGradient><path d="m171.69 207.23h-87.38c-19.55 0-35.54-15.99-35.54-35.54v-87.38c0-19.55 15.99-35.54 35.54-35.54h87.37c19.55 0 35.54 15.99 35.54 35.54v87.37c0.01 19.55-15.99 35.55-35.53 35.55z" fill="none" stroke="url(#fn)" stroke-miterlimit="10" stroke-width="5"/><linearGradient id="dt" x1="78.682" x2="177.32" y1="42.579" y2="213.42" gradientUnits="userSpaceOnUse"><stop stop-color="#8991C5" offset="0"/><stop stop-color="#515B8C" offset="1"/></linearGradient><path d="m172.12 208.01h-88.24c-19.74 0-35.89-16.15-35.89-35.89v-88.24c0-19.74 16.15-35.89 35.89-35.89h88.24c19.74 0 35.89 16.15 35.89 35.89v88.24c0 19.74-16.15 35.89-35.89 35.89z" fill="none" stroke="url(#dt)" stroke-miterlimit="10" stroke-width="5"/><defs><path id="y" d="m112.25 140.03s0.18 24.02-28.26 24.14l-0.14-0.01-0.14 0.01c-28.44-0.12-28.26-24.14-28.26-24.14v-38.1s-0.61-4.94 3.96-4.94h10.94s2.72-0.12 2.72 4.63v37.31s-0.12 10.67 10.73 10.67h0.09c10.85 0 10.73-10.67 10.73-10.67v-37.31c0-4.76 2.72-4.63 2.72-4.63h10.94c4.57 0 3.96 4.94 3.96 4.94v38.1zm-28.4 24.14h-0.14-0.03 0.34-0.03-0.14zm90.55-46.51c0 20.79-16.46 22.86-23.9 23.29h-3.54s-2.99-0.12-2.99 3.41v15.61s0.18 2.87-2.87 2.87h-11.83s-2.77-0.06-2.77-2.77-0.03-59.23-0.03-59.11c0 0-0.49-4.08 4.08-4.08h21.83c0.01-0.01 22.02-0.01 22.02 20.78zm-17.92 1.15c0-7.62-5.73-7.74-5.73-7.74h-6.77l0.06 15.91h4.27c8.78-1.03 8.17-8.17 8.17-8.17zm31.05 20.85h7.62c4.08 0 3.72-3.72 3.72-3.72l1.71-34.93c0-4.63-4.21-4.21-4.21-4.21h-9.45c-5.87 0-4.63 4.63-4.63 4.63l1.95 34.93c-0.01 3.49 3.29 3.3 3.29 3.3zm3.84 7.5c-5.31 0-9.01 3.71-9.01 8.76 0 4.89 3.71 8.68 9.01 8.68 5.31 0 9.01-3.79 9.01-8.68 0.01-5.05-3.7-8.76-9.01-8.76z"/></defs><clipPath id="as"><use xlink:href="#y"/></clipPath><g clip-path="url(#as)"><path class="st205" d="m112.25 140.15s0.18 24.02-28.26 24.14l-0.14-0.01-0.14 0.01c-28.44-0.12-28.26-24.14-28.26-24.14v-38.1s-0.61-4.94 3.96-4.94h10.94s2.72-0.12 2.72 4.63v37.31s-0.12 10.67 10.73 10.67h0.09c10.85 0 10.73-10.67 10.73-10.67v-37.31c0-4.76 2.72-4.63 2.72-4.63h10.94c4.57 0 3.96 4.94 3.96 4.94v38.1z"/><path class="st205" d="m83.85 164.29h-0.14-0.03 0.34-0.03-0.14z"/><path class="st206" d="m112.6 140.5s0.18 24.02-28.26 24.14l-0.14-0.01-0.14 0.01c-28.44-0.12-28.26-24.14-28.26-24.14v-38.1s-0.61-4.94 3.96-4.94h10.94s2.72-0.12 2.72 4.63v37.31s-0.12 10.67 10.73 10.67h0.09c10.85 0 10.73-10.67 10.73-10.67v-37.31c0-4.76 2.72-4.63 2.72-4.63h10.94c4.57 0 3.96 4.94 3.96 4.94v38.1z"/><path class="st206" d="m84.2 164.64h-0.14-0.03 0.34-0.03-0.14z"/><path class="st207" d="m112.95 140.85s0.18 24.02-28.26 24.14l-0.14-0.01-0.14 0.01c-28.44-0.12-28.26-24.14-28.26-24.14v-38.1s-0.61-4.94 3.96-4.94h10.94s2.72-0.12 2.72 4.63v37.31s-0.12 10.67 10.73 10.67h0.09c10.85 0 10.73-10.67 10.73-10.67v-37.31c0-4.76 2.72-4.63 2.72-4.63h10.94c4.57 0 3.96 4.94 3.96 4.94v38.1z"/><path class="st207" d="m84.56 164.99h-0.14-0.03 0.34-0.03-0.14z"/><path class="st208" d="m113.3 141.2s0.18 24.02-28.26 24.14l-0.14-0.01-0.14 0.01c-28.44-0.12-28.26-24.14-28.26-24.14v-38.1s-0.61-4.94 3.96-4.94h10.94s2.72-0.12 2.72 4.63v37.31s-0.12 10.67 10.73 10.67h0.09c10.85 0 10.73-10.67 10.73-10.67v-37.31c0-4.76 2.72-4.63 2.72-4.63h10.94c4.57 0 3.96 4.94 3.96 4.94v38.1z"/><path class="st208" d="m84.91 165.35h-0.14-0.03 0.34-0.03-0.14z"/><path class="st209" d="m113.66 141.56s0.18 24.02-28.26 24.14l-0.14-0.01-0.14 0.01c-28.44-0.12-28.26-24.14-28.26-24.14v-38.1s-0.61-4.94 3.96-4.94h10.94s2.72-0.12 2.72 4.63v37.31s-0.12 10.67 10.73 10.67h0.09c10.85 0 10.73-10.67 10.73-10.67v-37.31c0-4.76 2.72-4.63 2.72-4.63h10.94c4.57 0 3.96 4.94 3.96 4.94v38.1z"/><path class="st209" d="m85.26 165.7h-0.14-0.03 0.34-0.03-0.14z"/><path class="st210" d="m114.01 141.91s0.18 24.02-28.26 24.14l-0.14-0.01-0.14 0.01c-28.44-0.12-28.26-24.14-28.26-24.14v-38.1s-0.61-4.94 3.96-4.94h10.94s2.72-0.12 2.72 4.63v37.31s-0.12 10.67 10.73 10.67h0.09c10.85 0 10.73-10.67 10.73-10.67v-37.31c0-4.76 2.72-4.63 2.72-4.63h10.94c4.57 0 3.96 4.94 3.96 4.94v38.1z"/><path class="st210" d="m85.61 166.05h-0.14-0.03 0.34-0.03-0.14z"/><path class="st211" d="m114.36 142.26s0.18 24.02-28.26 24.14l-0.14-0.01-0.14 0.01c-28.44-0.12-28.26-24.14-28.26-24.14v-38.1s-0.61-4.94 3.96-4.94h10.94s2.72-0.12 2.72 4.63v37.31s-0.12 10.67 10.73 10.67h0.09c10.85 0 10.73-10.67 10.73-10.67v-37.31c0-4.76 2.72-4.63 2.72-4.63h10.94c4.57 0 3.96 4.94 3.96 4.94v38.1z"/><path class="st211" d="m85.96 166.4h-0.14-0.03 0.34-0.03-0.14z"/><path class="st212" d="m114.71 142.61s0.18 24.02-28.26 24.14l-0.14-0.01-0.14 0.01c-28.44-0.12-28.26-24.14-28.26-24.14v-38.1s-0.61-4.94 3.96-4.94h10.94s2.72-0.12 2.72 4.63v37.31s-0.12 10.67 10.73 10.67h0.09c10.85 0 10.73-10.67 10.73-10.67v-37.31c0-4.76 2.72-4.63 2.72-4.63h10.94c4.57 0 3.96 4.94 3.96 4.94v38.1z"/><path class="st212" d="m86.32 166.76h-0.14-0.03 0.34-0.03-0.14z"/><path class="st213" d="m115.07 142.97s0.18 24.02-28.26 24.14l-0.14-0.01-0.14 0.01c-28.44-0.12-28.26-24.14-28.26-24.14v-38.1s-0.61-4.94 3.96-4.94h10.94s2.72-0.12 2.72 4.63v37.31s-0.12 10.67 10.73 10.67h0.09c10.85 0 10.73-10.67 10.73-10.67v-37.31c0-4.76 2.72-4.63 2.72-4.63h10.94c4.57 0 3.96 4.94 3.96 4.94v38.1z"/><path class="st213" d="m86.67 167.11h-0.14-0.03 0.34-0.03-0.14z"/><path class="st214" d="m115.42 143.32s0.18 24.02-28.26 24.14l-0.14-0.01-0.14 0.01c-28.44-0.12-28.26-24.14-28.26-24.14v-38.1s-0.61-4.94 3.96-4.94h10.94s2.72-0.12 2.72 4.63v37.31s-0.12 10.67 10.73 10.67h0.09c10.85 0 10.73-10.67 10.73-10.67v-37.31c0-4.76 2.72-4.63 2.72-4.63h10.94c4.57 0 3.96 4.94 3.96 4.94v38.1z"/><path class="st214" d="m87.02 167.46h-0.14-0.03 0.34-0.03-0.14z"/><path class="st205" d="m174.4 117.77c0 20.79-16.46 22.86-23.9 23.29h-3.54s-2.99-0.12-2.99 3.41v15.61s0.18 2.87-2.87 2.87h-11.83s-2.77-0.06-2.77-2.77-0.03-59.23-0.03-59.11c0 0-0.49-4.08 4.08-4.08h21.83c0.01-0.01 22.02-0.01 22.02 20.78z"/><path class="st206" d="m174.75 118.13c0 20.79-16.46 22.86-23.9 23.29h-3.54s-2.99-0.12-2.99 3.41v15.61s0.18 2.87-2.87 2.87h-11.83s-2.77-0.06-2.77-2.77-0.03-59.23-0.03-59.11c0 0-0.49-4.08 4.08-4.08h21.83c0.01-0.01 22.02-0.01 22.02 20.78z"/><path class="st207" d="m175.11 118.48c0 20.79-16.46 22.86-23.9 23.29h-3.54s-2.99-0.12-2.99 3.41v15.61s0.18 2.87-2.87 2.87h-11.83s-2.77-0.06-2.77-2.77-0.03-59.23-0.03-59.11c0 0-0.49-4.08 4.08-4.08h21.83c0.01-0.01 22.02-0.01 22.02 20.78z"/><path class="st208" d="m175.46 118.83c0 20.79-16.46 22.86-23.9 23.29h-3.54s-2.99-0.12-2.99 3.41v15.61s0.18 2.87-2.87 2.87h-11.83s-2.77-0.06-2.77-2.77-0.03-59.23-0.03-59.11c0 0-0.49-4.08 4.08-4.08h21.83c0.01-0.01 22.02-0.01 22.02 20.78z"/><path class="st209" d="m175.81 119.18c0 20.79-16.46 22.86-23.9 23.29h-3.54s-2.99-0.12-2.99 3.41v15.61s0.18 2.87-2.87 2.87h-11.81s-2.77-0.06-2.77-2.77-0.03-59.23-0.03-59.11c0 0-0.49-4.08 4.08-4.08h21.83c-0.01-0.01 22-0.01 22 20.78z"/><path class="st210" d="m176.16 119.53c0 20.79-16.46 22.86-23.9 23.29h-3.54s-2.99-0.12-2.99 3.41v15.61s0.18 2.87-2.87 2.87h-11.83s-2.77-0.06-2.77-2.77-0.03-59.23-0.03-59.11c0 0-0.49-4.08 4.08-4.08h21.83c0.01-0.01 22.02-0.01 22.02 20.78z"/><path class="st211" d="m176.52 119.89c0 20.79-16.46 22.86-23.9 23.29h-3.54s-2.99-0.12-2.99 3.41v15.61s0.18 2.87-2.87 2.87h-11.82s-2.77-0.06-2.77-2.77-0.03-59.23-0.03-59.11c0 0-0.49-4.08 4.08-4.08h21.83c0-0.01 22.01-0.01 22.01 20.78z"/><path class="st212" d="m176.87 120.24c0 20.79-16.46 22.86-23.9 23.29h-3.54s-2.99-0.12-2.99 3.41v15.61s0.18 2.87-2.87 2.87h-11.83s-2.77-0.06-2.77-2.77-0.03-59.23-0.03-59.11c0 0-0.49-4.08 4.08-4.08h21.83c0.01-0.01 22.02-0.01 22.02 20.78z"/><path class="st213" d="m177.22 120.59c0 20.79-16.46 22.86-23.9 23.29h-3.54s-2.99-0.12-2.99 3.41v15.61s0.18 2.87-2.87 2.87h-11.82s-2.77-0.06-2.77-2.77-0.03-59.23-0.03-59.11c0 0-0.49-4.08 4.08-4.08h21.83c0-0.01 22.01-0.01 22.01 20.78z"/><path class="st214" d="m177.57 120.94c0 20.79-16.46 22.86-23.9 23.29h-3.54s-2.99-0.12-2.99 3.41v15.61s0.18 2.87-2.87 2.87h-11.83s-2.77-0.06-2.77-2.77-0.03-59.23-0.03-59.11c0 0-0.49-4.08 4.08-4.08h21.83c0.01-0.01 22.02-0.01 22.02 20.78z"/><path class="st205" d="m187.53 139.78h7.62c4.08 0 3.72-3.72 3.72-3.72l1.71-34.93c0-4.63-4.21-4.21-4.21-4.21h-9.45c-5.87 0-4.63 4.63-4.63 4.63l1.95 34.93c-0.01 3.49 3.29 3.3 3.29 3.3z"/><path class="st205" d="m191.37 147.28c-5.31 0-9.01 3.71-9.01 8.76 0 4.89 3.71 8.68 9.01 8.68 5.31 0 9.01-3.79 9.01-8.68 0.01-5.05-3.7-8.76-9.01-8.76z"/><path class="st206" d="m187.88 140.13h7.62c4.08 0 3.72-3.72 3.72-3.72l1.71-34.93c0-4.63-4.21-4.21-4.21-4.21h-9.45c-5.87 0-4.63 4.63-4.63 4.63l1.95 34.93c0 3.49 3.29 3.3 3.29 3.3z"/><path class="st206" d="m191.73 147.63c-5.31 0-9.01 3.71-9.01 8.76 0 4.89 3.71 8.68 9.01 8.68s9.01-3.79 9.01-8.68c0-5.05-3.71-8.76-9.01-8.76z"/><path class="st207" d="m188.23 140.49h7.62c4.08 0 3.72-3.72 3.72-3.72l1.71-34.93c0-4.63-4.21-4.21-4.21-4.21h-9.45c-5.87 0-4.63 4.63-4.63 4.63l1.95 34.93c0 3.48 3.29 3.3 3.29 3.3z"/><path class="st207" d="m192.08 147.99c-5.31 0-9.01 3.71-9.01 8.76 0 4.89 3.71 8.68 9.01 8.68 5.31 0 9.01-3.79 9.01-8.68 0-5.06-3.71-8.76-9.01-8.76z"/><path class="st208" d="m188.58 140.84h7.62c4.08 0 3.72-3.72 3.72-3.72l1.71-34.93c0-4.63-4.21-4.21-4.21-4.21h-9.45c-5.87 0-4.63 4.63-4.63 4.63l1.95 34.93c0 3.48 3.29 3.3 3.29 3.3z"/><path class="st208" d="m192.43 148.34c-5.31 0-9.01 3.71-9.01 8.76 0 4.89 3.71 8.68 9.01 8.68s9.01-3.79 9.01-8.68c0-5.06-3.7-8.76-9.01-8.76z"/><path class="st209" d="m188.93 141.19h7.62c4.08 0 3.72-3.72 3.72-3.72l1.71-34.93c0-4.63-4.21-4.21-4.21-4.21h-9.45c-5.87 0-4.63 4.63-4.63 4.63l1.95 34.93c0 3.48 3.29 3.3 3.29 3.3z"/><path class="st209" d="m192.78 148.69c-5.31 0-9.01 3.71-9.01 8.76 0 4.89 3.71 8.68 9.01 8.68 5.31 0 9.01-3.79 9.01-8.68 0.01-5.05-3.7-8.76-9.01-8.76z"/><path class="st210" d="m189.29 141.54h7.62c4.08 0 3.72-3.72 3.72-3.72l1.71-34.93c0-4.63-4.21-4.21-4.21-4.21h-9.45c-5.87 0-4.63 4.63-4.63 4.63l1.95 34.93c-0.01 3.49 3.29 3.3 3.29 3.3z"/><path class="st210" d="m193.13 149.04c-5.31 0-9.01 3.71-9.01 8.76 0 4.89 3.71 8.68 9.01 8.68 5.31 0 9.01-3.79 9.01-8.68 0.01-5.05-3.7-8.76-9.01-8.76z"/><path class="st211" d="m189.64 141.9h7.62c4.08 0 3.72-3.72 3.72-3.72l1.71-34.93c0-4.63-4.21-4.21-4.21-4.21h-9.45c-5.87 0-4.63 4.63-4.63 4.63l1.95 34.93c0 3.48 3.29 3.3 3.29 3.3z"/><path class="st211" d="m193.49 149.39c-5.31 0-9.01 3.71-9.01 8.76 0 4.89 3.71 8.68 9.01 8.68s9.01-3.79 9.01-8.68c0-5.05-3.71-8.76-9.01-8.76z"/><path class="st212" d="m189.99 142.25h7.62c4.08 0 3.72-3.72 3.72-3.72l1.71-34.93c0-4.63-4.21-4.21-4.21-4.21h-9.45c-5.87 0-4.63 4.63-4.63 4.63l1.95 34.93c0 3.48 3.29 3.3 3.29 3.3z"/><path class="st212" d="m193.84 149.75c-5.31 0-9.01 3.71-9.01 8.76 0 4.89 3.71 8.68 9.01 8.68 5.31 0 9.01-3.79 9.01-8.68 0-5.06-3.7-8.76-9.01-8.76z"/><path class="st213" d="m190.34 142.6h7.62c4.08 0 3.72-3.72 3.72-3.72l1.71-34.93c0-4.63-4.21-4.21-4.21-4.21h-9.45c-5.87 0-4.63 4.63-4.63 4.63l1.95 34.93c0 3.48 3.29 3.3 3.29 3.3z"/><path class="st213" d="m194.19 150.1c-5.31 0-9.01 3.71-9.01 8.76 0 4.89 3.71 8.68 9.01 8.68s9.01-3.79 9.01-8.68c0-5.05-3.7-8.76-9.01-8.76z"/><path class="st214" d="m190.7 142.95h7.62c4.08 0 3.72-3.72 3.72-3.72l1.71-34.93c0-4.63-4.21-4.21-4.21-4.21h-9.45c-5.87 0-4.63 4.63-4.63 4.63l1.95 34.93c-0.01 3.49 3.29 3.3 3.29 3.3z"/><path class="st214" d="m194.54 150.45c-5.31 0-9.01 3.71-9.01 8.76 0 4.89 3.71 8.68 9.01 8.68 5.31 0 9.01-3.79 9.01-8.68 0.01-5.05-3.7-8.76-9.01-8.76z"/><path class="st214" d="m159.65 122.1c0-7.62-5.73-7.74-5.73-7.74h-6.77l0.06 15.91h4.27c8.78-1.04 8.17-8.17 8.17-8.17z"/><path class="st215" d="m159.3 121.75c0-7.62-5.73-7.74-5.73-7.74h-6.77l0.06 15.91h4.27c8.78-1.04 8.17-8.17 8.17-8.17z"/><path class="st216" d="m158.94 121.4c0-7.62-5.73-7.74-5.73-7.74h-6.77l0.06 15.91h4.27c8.78-1.04 8.17-8.17 8.17-8.17z"/><path class="st217" d="m158.59 121.04c0-7.62-5.73-7.74-5.73-7.74h-6.77l0.06 15.91h4.27c8.78-1.03 8.17-8.17 8.17-8.17z"/><path class="st218" d="m158.24 120.69c0-7.62-5.73-7.74-5.73-7.74h-6.77l0.06 15.91h4.27c8.78-1.03 8.17-8.17 8.17-8.17z"/><path class="st219" d="m157.89 120.34c0-7.62-5.73-7.74-5.73-7.74h-6.77l0.06 15.91h4.27c8.78-1.04 8.17-8.17 8.17-8.17z"/><path class="st220" d="m157.53 119.99c0-7.62-5.73-7.74-5.73-7.74h-6.77l0.06 15.91h4.27c8.78-1.04 8.17-8.17 8.17-8.17z"/><path class="st221" d="m157.18 119.64c0-7.62-5.73-7.74-5.73-7.74h-6.77l0.06 15.91h4.27c8.78-1.04 8.17-8.17 8.17-8.17z"/><path class="st222" d="m156.83 119.28c0-7.62-5.73-7.74-5.73-7.74h-6.77l0.06 15.91h4.27c8.78-1.03 8.17-8.17 8.17-8.17z"/><path class="st223" d="m156.48 118.93c0-7.62-5.73-7.74-5.73-7.74h-6.77l0.06 15.91h4.27c8.78-1.04 8.17-8.17 8.17-8.17z"/></g></g></svg>`;
  var UniversalProfiles_Apps_Logo_96px_svg_default = image;

  // src/popup.ts
  var import_debug = __toESM(require_src());
  var popupLog = (0, import_debug.default)("upProvider:popup");
  var VanillaModalPopup = class {
    constructor(iframeSrc, id) {
      this.isOpen = false;
      this.handleIframeLoad = () => {
        popupLog("Iframe loaded, contentWindow:", this.iframeElement.contentWindow);
        this.contentWindow = this.iframeElement.contentWindow || void 0;
        this.resolve?.(this.contentWindow);
      };
      this.handleIframeError = (e) => {
        popupLog("Iframe error occurred:", e.error, e.message);
        this.reject?.(e.error);
        this.closeModal();
      };
      this.iframeSrc = iframeSrc;
      this.modalElement = document.createElement("div");
      this.modalElement.id = id;
      this.modalElement.className = "up-modal";
      this.modalElement.innerHTML = `
      <div class="up-modal-content">
        <span class="up-close-button">&times;</span>
        <iframe src="about:blank" allow="publickey-credentials-get; publickey-credentials-create"></iframe>
      </div>
    `;
      this.closeButton = this.modalElement.querySelector(".up-close-button");
      this.iframeElement = this.modalElement.querySelector("iframe");
      this.closeButton.addEventListener("click", () => this.closeModal());
      this.iframeElement.addEventListener("load", this.handleIframeLoad);
      this.iframeElement.addEventListener("error", this.handleIframeError);
      if (!document.getElementById("up-modal-styles")) {
        const style = document.createElement("style");
        style.id = "up-modal-styles";
        style.textContent = `
        .up-modal {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          justify-content: center;
          align-items: center;
          z-index: 9999;
        }
        .up-modal.show {
          display: flex;
        }
        .up-modal-content {
          background-color: #fff;
          border-radius: 8px;
          overflow: hidden;
          position: relative;
          width: 480px;
          height: 640px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
        }
        @media (max-width: 768px) {
          .up-modal-content {
            width: 100%;
            height: 100%;
            border-radius: 0;
          }
        }
        .up-close-button {
          position: absolute;
          top: 10px;
          right: 15px;
          font-size: 24px;
          cursor: pointer;
          z-index: 10;
          color: #000;
          background: rgba(255, 255, 255, 0.8);
          width: 30px;
          height: 30px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          line-height: 1;
        }
        .up-close-button:hover {
          background: rgba(255, 255, 255, 1);
        }
        .up-modal iframe {
          width: 100%;
          height: 100%;
          border: none;
        }
      `;
        document.head.appendChild(style);
      }
      document.body.appendChild(this.modalElement);
    }
    async createModal() {
      popupLog("createModal called, has promise:", !!this.promise, "iframe src:", this.iframeSrc);
      if (this.promise) {
        popupLog("Reusing existing popup promise");
        return this.promise.then((window2) => ({
          isNew: false,
          window: window2
        }));
      }
      popupLog("Creating new popup promise");
      this.promise = new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
        if (this.iframeSrc) {
          this.iframeElement.src = this.iframeSrc;
        }
        const debugMode = window.location.search.includes("debug=true") || localStorage.getItem("upProvider:debug") === "true";
        if (debugMode) {
          setTimeout(() => this.openModal(), 100);
        }
      });
      return this.promise.then((window2) => ({
        isNew: true,
        window: window2
      }));
    }
    openModal() {
      if (this.isOpen) {
        return;
      }
      requestAnimationFrame(() => {
        this.isOpen = true;
        this.modalElement.classList.add("show");
        popupLog("Opening popup");
        this.modalElement.dispatchEvent(
          new CustomEvent("open", {
            bubbles: true,
            composed: true
          })
        );
        window.parent.postMessage({ type: "upProvider:modalOpened" }, "*");
      });
    }
    closeModal() {
      popupLog("closeModal called from:", new Error().stack);
      const debugMode = window.location.search.includes("debug=true") || localStorage.getItem("upProvider:debug") === "true";
      if (debugMode) {
        popupLog("Debug mode: keeping modal open");
        return;
      }
      this.isOpen = false;
      this.modalElement.classList.remove("show");
      popupLog("Closing popup");
      this.modalElement.dispatchEvent(
        new CustomEvent("close", {
          bubbles: true,
          composed: true
        })
      );
      window.parent.postMessage({ type: "upProvider:modalClosed" }, "*");
    }
    destroyModal() {
      this.contentWindow = void 0;
      this.closeModal();
      this.iframeElement.removeEventListener("load", this.handleIframeLoad);
      this.iframeElement.removeEventListener("error", this.handleIframeError);
      this.modalElement.remove();
      popupLog("Destroying popup");
      this.modalElement.dispatchEvent(
        new CustomEvent("destroy", {
          bubbles: true,
          composed: true
        })
      );
    }
  };
  async function createWalletPopup(_url) {
    if (typeof window === "undefined" || typeof document === "undefined") {
      throw new Error("This function can only be called in a browser environment.");
    }
    const url = new URL(_url);
    const key = `up-wallet-popup-${url.hostname.replace(/\./g, "-")}${url.pathname.split("/").join("-")}`;
    const existingElement = document.getElementById(key);
    if (existingElement && existingElement._popup) {
      return { isNew: false, popup: existingElement._popup };
    }
    popupLog("Instantiating new popup");
    const popup = new VanillaModalPopup(_url, key);
    const element = document.getElementById(key);
    if (element) {
      ;
      element._popup = popup;
    }
    return popup.createModal().then(({ isNew }) => ({ isNew, popup })).catch((error) => {
      popupLog("Error creating popup:", error);
      popup.destroyModal();
      throw error;
    });
  }

  // src/server.ts
  var import_debug2 = __toESM(require_src());
  var import_json_rpc_2 = __toESM(require_dist());
  var serverLog = (0, import_debug2.default)("upProvider:server");

  // src/index.ts
  var cleanupAccounts = (values) => {
    const output = [];
    for (const value of values) {
      if (!value || /^0x0+$/.test(value)) {
        break;
      }
      output.push(value);
    }
    return output;
  };

  // src/client.ts
  var clientLog = (0, import_debug3.default)("upProvider:client");
  var UP_PROVIDER_JSONRPC_TYPE = "upProvider:jsonrpc";
  var pendingRequests = /* @__PURE__ */ new Map();
  function createUPClientProvider(options) {
    let bufferedEvents = [];
    const emitter = new eventemitter3_default();
    const provider = {
      get isUPClientProvider() {
        return true;
      },
      eventNames: () => emitter.eventNames(),
      listeners: (event) => emitter.listeners(event),
      listenerCount: (event) => emitter.listenerCount(event),
      emit: (event, ...args) => {
        if (bufferedEvents) {
          bufferedEvents.push([event, args]);
          return false;
        }
        return emitter.emit(event, ...args);
      },
      on: (event, fn, context) => {
        provider.resume(500);
        emitter.on(event, fn, context);
        return provider;
      },
      addListener: (event, fn, context) => {
        provider.resume(500);
        emitter.addListener(event, fn, context);
        return provider;
      },
      once: (event, fn, context) => {
        emitter.once(event, fn, context);
        return provider;
      },
      removeListener: (event, fn, context, once) => {
        emitter.removeListener(event, fn, context, once);
        return provider;
      },
      off: (event, fn, context, once) => {
        emitter.off(event, fn, context, once);
        return provider;
      },
      removeAllListeners: (event) => {
        emitter.removeAllListeners(event);
        return provider;
      },
      resume: (delay = 0) => {
        const buffered = bufferedEvents;
        if (!buffered) {
          return;
        }
        bufferedEvents = void 0;
        setTimeout(() => {
          while (buffered.length > 0) {
            const val = buffered.shift();
            if (val) {
              const [event, args] = val;
              emitter.emit(event, ...args);
            }
          }
        }, delay);
      },
      get isConnected() {
        return options.allowedAccounts().length > 0;
      },
      get isMiniApp() {
        return options?.startupPromise.catch(() => false).then(() => true);
      },
      request: async (_method, _params, _clientParams) => {
        await options?.preStartupPromise;
        const method = typeof _method === "string" ? _method : _method.method;
        const params = typeof _method === "string" ? _params : _method.params;
        if (!options?.client) {
          if ((options?.isPopup || options.isIframe) && (method === "wallet_requestPermissions" || method === "eth_sendTransaction" || method === "eth_requestAccounts" || method === "eth_accounts" && provider.accounts?.length === 0)) {
            await options?.allocateConnection();
            await options?.startupPromise;
          }
        }
        if (method === "eth_requestAccounts" || method === "wallet_requestPermissions") {
          const shouldShowUI = method === "wallet_requestPermissions" || !provider.accounts?.length;
          if ((options?.isIframe || options?.isPopup) && shouldShowUI) {
            if (options.popup) {
              options.popup?.openModal();
            }
            if (!options.loginPromise) {
              options.loginPromise = options.client?.request("embedded_login", ["force"], _clientParams).then((result2) => {
                return result2;
              });
            }
            const result = await options.loginPromise;
            if (method === "wallet_requestPermissions") {
              const accounts = Array.isArray(result) ? result : provider.accounts;
              if (options?.popup) {
                clientLog("Closing modal after wallet_requestPermissions");
                options?.popup?.closeModal();
              }
              return [{
                parentCapability: "eth_accounts",
                invoker: window.location.origin,
                caveats: [{
                  type: "restrictReturnedAccounts",
                  value: accounts
                }]
              }];
            }
          }
          if (method === "wallet_requestPermissions") {
            const accounts = provider.accounts;
            if (options?.popup) {
              clientLog("Closing modal after wallet_requestPermissions");
              options?.popup?.closeModal();
            }
            return [{
              parentCapability: "eth_accounts",
              invoker: window.location.origin,
              caveats: [{
                type: "restrictReturnedAccounts",
                value: accounts
              }]
            }];
          }
        }
        if (method === "eth_requestAccounts" || method === "eth_accounts") {
          if (provider.chainId && provider.accounts.length > 0) {
            if (!options?.connectEmitted) {
              provider.emit("connect", { chainId: `0x${provider.chainId.toString(16)}` });
              options.connectEmitted = true;
            }
          } else {
            options.connectEmitted = false;
          }
          return provider.accounts;
        }
        if (method === "eth_chainId") {
          return `0x${provider.chainId.toString(16)}`;
        }
        if (method === "wallet_switchEthereumChain") {
          options.switchChainId(Number(params?.[0]?.chainId));
          return `0x${provider.chainId.toString(16)}`;
        }
        if (method === "eth_accounts") {
          return provider.accounts;
        }
        const clientParams = typeof _method === "string" ? _clientParams : _params;
        if (method === "up_contextAccounts") {
          return options.contextAccounts();
        }
        if (!options?.client) {
          clientLog("Client not ready, allocating connection first");
          await options?.allocateConnection();
          await options?.startupPromise;
        }
        if (method === "wallet_requestPermissions") {
          const result = await options?.client?.request(method, params, clientParams);
          if (result && result[0]?.caveats?.[0]?.type === "restrictReturnedAccounts" && Array.isArray(result[0].caveats[0].value)) {
            const newAccounts = result[0].caveats[0].value;
            const currentAccounts = options?.allowedAccounts() || [];
            if ((currentAccounts?.length ?? 0) !== (newAccounts?.length ?? 0) || currentAccounts?.some((account, index) => account !== newAccounts[index])) {
              clientLog("wallet_requestPermissions returned different accounts, expecting accountsChanged event");
            }
          }
          return result;
        }
        return options?.client?.request(method, params, clientParams) || null;
      },
      get chainId() {
        return options?.chainId() || 0;
      },
      get accounts() {
        return options?.allowedAccounts() || [];
      },
      get contextAccounts() {
        return options?.contextAccounts() || [];
      }
    };
    return provider;
  }
  async function testWindow(up, remote, options) {
    const _up = up || (typeof window !== "undefined" ? window.parent : void 0);
    if (!_up) {
      throw new Error("No UP found");
    }
    return new Promise((resolve, reject) => {
      let timeout = 0;
      const channel = new MessageChannel();
      const testFn = (event) => {
        if (event.data?.type === UP_PROVIDER_JSONRPC_TYPE && !options.clientChannel) {
          const jsonrpcMessage = event.data.payload;
          if (jsonrpcMessage && typeof jsonrpcMessage.id !== "undefined") {
            const pending = pendingRequests.get(String(jsonrpcMessage.id));
            if (pending) {
              if (jsonrpcMessage.error) {
                pending.reject(jsonrpcMessage.error);
              } else {
                pending.resolve(jsonrpcMessage.result);
              }
              pendingRequests.delete(String(jsonrpcMessage.id));
            }
          }
          return;
        }
        if (event.data?.type === "upProvider:windowInitialize") {
          const { chainId, allowedAccounts, contextAccounts, rpcUrls } = event.data;
          clientLog("client init", event.data, _up);
          window.removeEventListener("message", testFn);
          if (timeout) {
            clearTimeout(timeout);
            timeout = 0;
          }
          if (event.ports?.[0]) {
            clientLog("Received MessageChannel port from server");
            options.clientChannel = event.ports[0];
          } else {
            options.clientChannel = channel.port1;
          }
          options.window = _up;
          try {
            _up.addEventListener("close", () => {
              options.restart();
              remote.emit("windowClosed");
            });
          } catch {
          }
          options.init = { chainId, allowedAccounts, contextAccounts, rpcUrls };
          clientLog("client connected", event.data.type, event.data);
          options.clientChannel.postMessage({
            type: "upProvider:windowInitialized",
            chainId,
            allowedAccounts,
            contextAccounts,
            rpcUrls
          });
          resolve(remote);
        }
      };
      channel.port1.addEventListener("message", testFn);
      channel.port1.start();
      window.addEventListener("message", testFn);
      let canTransferPort = false;
      try {
        void _up.location.href;
        canTransferPort = true;
      } catch (e) {
        clientLog("Cross-origin detected, will send without port");
      }
      const targetOrigin = options.targetOrigin || "*";
      clientLog("Using target origin for postMessage:", targetOrigin);
      let messageType = "upProvider:hasProvider";
      if (options.isIframe) {
        messageType = "upProvider:requestIframeProvider";
      }
      if (canTransferPort) {
        _up.postMessage(messageType, targetOrigin, [channel.port2]);
      } else {
        _up.postMessage(messageType, targetOrigin);
      }
      timeout = setTimeout(() => {
        timeout = 0;
        window.removeEventListener("message", testFn);
        channel.port1.removeEventListener("message", testFn);
        clientLog("client", "No UP found", _up);
        reject(new Error("No UP found"));
      }, 1e3);
    });
  }
  async function findDestination(authURL, remote, options, search = false) {
    let theWindow = typeof authURL === "object" && authURL?.url ? null : authURL;
    if (typeof authURL === "object" && !(authURL instanceof Window) && authURL?.url) {
      try {
        ;
        options.targetOrigin = new URL(authURL.url).origin;
        clientLog("Stored target origin:", options.targetOrigin);
      } catch (e) {
        clientLog("Could not determine target origin from URL");
      }
    }
    if (typeof authURL === "object" && !(authURL instanceof Window) && authURL?.url) {
      const info = localStorage.getItem(`upProvider:info:${authURL}`);
      if (info) {
        const { chainId, allowedAccounts, contextAccounts, rpcUrls } = JSON.parse(info);
        options.init = { chainId, allowedAccounts, contextAccounts, rpcUrls };
      }
      if (typeof window !== "undefined" && typeof document !== "undefined") {
        if (authURL.mode === "popup") {
          const childWindow = window.open(authURL.url, "UE Wallet", "width=400,height=600");
          if (childWindow) {
            clientLog("popup opened");
            theWindow = childWindow;
          }
        }
        if (authURL.mode === "iframe") {
          const { popup, isNew } = await createWalletPopup(authURL.url);
          if (popup) {
            options.popup = popup;
            const { window: current } = await popup.createModal();
            if (current) {
              clientLog(isNew ? "New iframe created" : "Reusing existing iframe");
              if (isNew) {
                const close = (event) => {
                  if (event.data?.type === "upProvider:modalClosed") {
                    clientLog("iframe modal closed (keeping connection)");
                    window.removeEventListener("message", close);
                  }
                };
                window.addEventListener("message", close);
                try {
                  current.addEventListener("close", () => {
                    clientLog("iframe window actually closed");
                    options.restart();
                    remote.emit("windowClosed");
                    window.removeEventListener("message", close);
                  });
                } catch {
                }
              }
              theWindow = current;
              if (authURL.mode === "iframe" && current && isNew) {
                clientLog("Waiting for new iframe to announce ready");
                await new Promise((resolve) => {
                  let timeoutId;
                  const readyHandler = (event) => {
                    if (event.data === "upProvider:ready") {
                      clientLog("Received upProvider:ready from:", event.source, "expected:", current, "match:", event.source === current);
                    }
                    if (event.data === "upProvider:ready") {
                      clientLog("Iframe announced ready");
                      clearTimeout(timeoutId);
                      window.removeEventListener("message", readyHandler);
                      resolve();
                    }
                  };
                  window.addEventListener("message", readyHandler);
                  timeoutId = setTimeout(() => {
                    window.removeEventListener("message", readyHandler);
                    clientLog("Iframe ready timeout (proceeding anyway - this is normal)");
                    resolve();
                  }, 3e3);
                });
              }
            }
          }
        }
      }
    }
    let up = await testWindow(theWindow, remote, options).catch((error) => {
      if (search) {
        return void 0;
      }
      throw error;
    });
    if (search && !up) {
      let retry = 3;
      while (retry > 0) {
        let current = theWindow || (window.opener && window.opener !== window ? window.opener : window.parent && window.parent !== window ? window.parent : void 0);
        while (current) {
          up = await testWindow(current, remote, options).catch(() => void 0);
          if (up) {
            break;
          }
          if (current === window.top) {
            break;
          }
          current = theWindow || (current.opener && current.opener !== current ? current.opener : current.parent && current.parent !== current ? current.parent : void 0);
        }
        if (up) {
          break;
        }
        await new Promise((resolve) => setTimeout(resolve, 1e3));
        retry--;
      }
    }
    if (!up) {
      throw new Error("No UP found");
    }
    return up;
  }
  function createClientUPProvider(authURL, search = true) {
    let chainId = 0;
    let allowedAccounts = [];
    let contextAccounts = [];
    let rpcUrls = [];
    let startupResolve;
    let preStartupResolve = () => {
    };
    const preStartupPromise = new Promise((resolve) => {
      preStartupResolve = resolve;
    }).then(() => {
      clientLog("pre startup resolved");
    });
    let startupPromise = new Promise((resolve) => {
      startupResolve = resolve;
    }).then(() => {
      remote.emit("initialized");
    });
    const allocateConnection = async () => {
      const client = new import_json_rpc_22.JSONRPCClient(async (jsonRPCRequest) => {
        await doSearch(client).then((up) => {
          options.client = client;
          return up;
        });
        return new Promise((resolve, reject) => {
          const { id, method, params } = jsonRPCRequest;
          pendingRequests.set(id, {
            resolve,
            reject,
            sent: false,
            id,
            method,
            params
          });
          clientLog("Sending JSONRPC request:", method, "id:", id, "via:", options.clientChannel ? "MessageChannel" : "postMessage");
          if (options.clientChannel) {
            try {
              options.clientChannel.postMessage(jsonRPCRequest);
            } catch (e) {
              console.error("*** MessageChannel postMessage failed:", e);
              clientLog("MessageChannel appears to be broken, may need to reconnect");
            }
          } else if (options.window) {
            options.window.postMessage(
              {
                type: UP_PROVIDER_JSONRPC_TYPE,
                payload: jsonRPCRequest
              },
              options.targetOrigin || "*"
            );
          }
        });
      });
      const request_ = client.request.bind(client);
      const wrapper = async (method, params) => {
        await preStartupPromise;
        switch (method) {
          case "eth_accounts":
          case "eth_requestAccounts":
            if (allowedAccounts.length > 0) {
              return allowedAccounts;
            }
            break;
          case "wallet_switchEthereumChain": {
            const { chainId: _chainId } = params?.[0];
            if (_chainId) {
              chainId = Number(_chainId);
              persist();
              remote.emit("chainChanged", chainId);
            }
            return `0x${chainId.toString(16)}`;
          }
          case "eth_chainId":
            return `0x${chainId.toString(16)}`;
          case "eth_call":
            if (rpcUrls.length > 0 && Object.keys(params?.[0] ?? {}).every((key) => !/^gasPrice|maxFeePerGas|maxPriorityFeePerGas|value$/.test(key))) {
              clientLog("client direct rpc", rpcUrls, method, params);
              const urls = [...rpcUrls];
              const errors = [];
              while (urls.length > 0) {
                const url = urls.shift();
                try {
                  if (!url) {
                    throw new Error("No RPC URL found");
                  }
                  const result = fetch(url, {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                      jsonrpc: "2.0",
                      id: v4_default(),
                      method,
                      params
                    })
                  }).then((response) => {
                    if (response.ok) {
                      return response.json();
                    }
                    throw new Error("Network response was not ok");
                  });
                  return result;
                } catch (error) {
                  console.error("error", error);
                  errors.push(error);
                }
              }
              const err = new Error(`All RPC URLs failed: ${errors.map((e) => e.message).join(", ")}`);
              err.errors = errors;
              throw err;
            }
        }
        return request_(method, params);
      };
      client.request = async (method, params) => {
        const methodName = typeof method === "string" ? method : method.method;
        switch (methodName) {
          case "wallet_revokePermissions":
            if ((allowedAccounts?.length ?? 0) > 0) {
              allowedAccounts = [];
              persist();
              remote.emit(
                "accountsChanged",
                // Cleanup wrong null or undefined.
                cleanupAccounts(allowedAccounts)
              );
            }
            if ((contextAccounts?.length ?? 0) > 0) {
              contextAccounts = [];
              persist();
              remote.emit(
                "contextAccountsChanged",
                // Cleanup wrong null or undefined.
                cleanupAccounts(contextAccounts)
              );
            }
            remote.emit("disconnect");
            return null;
        }
        await doSearch(client);
        await startupPromise;
        if (typeof method === "string") {
          return await wrapper(method, params);
        }
        const { method: _method, params: _params } = method;
        return await wrapper(_method, _params);
      };
      await doSearch(client);
    };
    const options = {
      chainId: () => chainId,
      switchChainId: (_chainId) => {
        chainId = _chainId;
        persist();
        remote.emit("chainChanged", chainId);
      },
      restart: () => {
      },
      connectEmitted: false,
      allowedAccounts: () => allowedAccounts,
      contextAccounts: () => contextAccounts,
      startupPromise,
      preStartupPromise,
      allocateConnection,
      isPopup: authURL?.url !== void 0,
      isIframe: authURL?.mode === "iframe"
    };
    options.restart = function restart() {
      clientLog("Restarting connection - cleaning up state");
      options.window = void 0;
      options.clientChannel = void 0;
      options.connectEmitted = false;
      searchPromise = null;
      options.startupPromise = startupPromise = new Promise((resolve) => {
        startupResolve = resolve;
      }).then(() => {
        remote.emit("initialized");
      });
    };
    const remote = createUPClientProvider(options);
    let searchPromise;
    if (authURL && !(authURL instanceof Window)) {
      authURL.get().then((value) => {
        if (value.chainId) {
          chainId = value.chainId;
        }
        if (value.allowedAccounts) {
          allowedAccounts = value.allowedAccounts;
        }
        if (value.rpcUrls) {
          rpcUrls = value.rpcUrls;
        }
        preStartupResolve();
      });
    } else {
      preStartupResolve();
    }
    if (authURL instanceof Window || !authURL || !authURL?.preventRegistration) {
      const info = authURL && !(authURL instanceof Window) ? authURL : void 0;
      const rdns = info?.rdns || "dev.lukso.auth";
      const dns = rdns.split(".").reverse().join(".");
      const providerInfo = {
        uuid: v5_default(dns, v5_default.DNS),
        name: info?.name || "UE Universal Profile",
        icon: info?.icon || `data:image/svg+xml,${encodeURIComponent(UniversalProfiles_Apps_Logo_96px_svg_default)}`,
        rdns
      };
      const announceEvent = new CustomEvent("eip6963:announceProvider", {
        detail: Object.freeze({ info: providerInfo, provider: remote })
      });
      window.dispatchEvent(announceEvent);
      window.addEventListener("eip6963:requestProvider", () => {
        window.dispatchEvent(announceEvent);
      });
    }
    const persist = () => {
      if (authURL && !(authURL instanceof Window)) {
        authURL.set({
          chainId,
          allowedAccounts,
          rpcUrls
        });
      }
    };
    const doSearch = async (client) => {
      if (searchPromise) {
        return searchPromise;
      }
      const activeSearchPromise = findDestination(authURL, remote, options, search).then((up) => {
        up?.addListener("windowClosed", () => {
          searchPromise = null;
        });
        const init = options.init;
        if (init) {
          ;
          ({ chainId, allowedAccounts, contextAccounts, rpcUrls } = init || {});
          persist();
        }
        if (options.initialAccounts?.length) {
          clientLog("Applying initial accounts from provider initialization:", options.initialAccounts);
          allowedAccounts = options.initialAccounts;
          persist();
          delete options.initialAccounts;
        }
        if (options.clientChannel) {
          clientLog("Setting up MessageChannel listener, channel exists:", !!options.clientChannel);
          options.clientChannel.addEventListener("message", (event) => {
            try {
              const response = event.data;
              clientLog("client MessageChannel message received:", response);
              clientLog("Message details - method:", response?.method, "params:", response?.params, "id:", response?.id);
              switch (response.method) {
                case "chainChanged":
                  chainId = response.params[0];
                  persist();
                  up.emit("chainChanged", chainId);
                  return;
                case "contextAccountsChanged":
                  if ((contextAccounts?.length ?? 0) !== (response.params?.length ?? 0) || contextAccounts?.some((account, index) => account !== response.params[index])) {
                    contextAccounts = response.params;
                    up.emit(
                      "contextAccountsChanged",
                      // Cleanup wrong null or undefined.
                      cleanupAccounts(contextAccounts)
                    );
                  }
                  return;
                case "accountsChanged":
                  clientLog("Received accountsChanged:", response.params);
                  if ((allowedAccounts?.length ?? 0) !== (response.params?.length ?? 0) || allowedAccounts?.some((account, index) => account !== response.params[index])) {
                    clientLog("Updating allowedAccounts from", allowedAccounts, "to", response.params);
                    allowedAccounts = response.params;
                    persist();
                    up.emit(
                      "accountsChanged",
                      // Cleanup wrong null or undefined.
                      cleanupAccounts(allowedAccounts)
                    );
                  }
                  return;
                case "rpcUrlsChanged":
                  rpcUrls = response.params;
                  persist();
                  up.emit("rpcUrls", rpcUrls);
                  return;
                case "showPopup":
                  clientLog("Received showPopup request:", response.params);
                  if (options.popup) {
                    const shouldShow = response.params?.[0];
                    if (shouldShow === true) {
                      clientLog("Opening modal popup");
                      options.popup.openModal();
                    } else if (shouldShow === false) {
                      clientLog("Closing modal popup");
                      options.popup.closeModal();
                    }
                  } else {
                    clientLog("No popup available to control");
                  }
                  return;
                case "connect":
                  up.emit("connect", response.params[0]);
                  return;
                case "disconnect":
                  options.connectEmitted = false;
                  options.loginPromise = void 0;
                  if ((allowedAccounts?.length ?? 0) > 0) {
                    allowedAccounts = [];
                    persist();
                    up.emit(
                      "accountsChanged",
                      // Cleanup wrong null or undefined.
                      cleanupAccounts(allowedAccounts)
                    );
                  }
                  if ((contextAccounts?.length ?? 0) > 0) {
                    contextAccounts = [];
                    persist();
                    up.emit(
                      "contextAccountsChanged",
                      // Cleanup wrong null or undefined.
                      cleanupAccounts(contextAccounts)
                    );
                  }
                  up.emit("disconnect");
                  return;
              }
              const item = pendingRequests.get(response.id);
              clientLog("Response received for id:", response.id, "found in pending:", !!item, "method was:", item?.method);
              if (response.id && item) {
                const { resolve, reject } = item;
                if (response.result !== void 0) {
                  client.receive({ ...response, id: item.id });
                  resolve();
                } else if (response.error) {
                  const { error: _error, jsonrpc } = response;
                  const { method, params, id } = item;
                  const error = {
                    ..._error,
                    message: `${_error.message} ${JSON.stringify(method)}(${JSON.stringify(params)})`
                  };
                  console.error("error", { error, method, params, id, jsonrpc });
                  client.receive({ ...response, id: item.id });
                  reject(error);
                }
                pendingRequests.delete(response.id);
              }
            } catch (error) {
              console.error("Error parsing JSON RPC response", error, event);
            }
          });
          clientLog("Starting MessageChannel listener");
          options.clientChannel.start();
        } else if (options.window) {
          const messageHandler = (event) => {
            if (event.data?.type === UP_PROVIDER_JSONRPC_TYPE) {
              try {
                const response = event.data.payload;
                clientLog("client (cross-origin)", response);
                switch (response.method) {
                  case "chainChanged":
                    chainId = response.params[0];
                    persist();
                    up.emit("chainChanged", chainId);
                    return;
                  case "contextAccountsChanged":
                    if ((contextAccounts?.length ?? 0) !== (response.params?.length ?? 0) || contextAccounts?.some((account, index) => account !== response.params[index])) {
                      contextAccounts = response.params;
                      up.emit("contextAccountsChanged", cleanupAccounts(contextAccounts));
                    }
                    return;
                  case "accountsChanged":
                    clientLog("Received accountsChanged (cross-origin):", response.params);
                    if ((allowedAccounts?.length ?? 0) !== (response.params?.length ?? 0) || allowedAccounts?.some((account, index) => account !== response.params[index])) {
                      clientLog("Updating allowedAccounts from", allowedAccounts, "to", response.params);
                      allowedAccounts = response.params;
                      persist();
                      up.emit("accountsChanged", cleanupAccounts(allowedAccounts));
                    }
                    return;
                  case "rpcUrlsChanged":
                    rpcUrls = response.params;
                    persist();
                    up.emit("rpcUrls", rpcUrls);
                    return;
                  case "showPopup":
                    clientLog("Received showPopup request (cross-origin):", response.params);
                    if (options.popup) {
                      const shouldShow = response.params?.[0];
                      if (shouldShow === true) {
                        clientLog("Opening modal popup");
                        options.popup.openModal();
                      } else if (shouldShow === false) {
                        clientLog("Closing modal popup");
                        options.popup.closeModal();
                      }
                    } else {
                      clientLog("No popup available to control");
                    }
                    return;
                  case "connect":
                    up.emit("connect", response.params[0]);
                    return;
                  case "disconnect":
                    options.connectEmitted = false;
                    if ((allowedAccounts?.length ?? 0) > 0) {
                      allowedAccounts = [];
                      persist();
                      up.emit("accountsChanged", cleanupAccounts(allowedAccounts));
                    }
                    if ((contextAccounts?.length ?? 0) > 0) {
                      contextAccounts = [];
                      persist();
                      up.emit("contextAccountsChanged", cleanupAccounts(contextAccounts));
                    }
                    up.emit("disconnect");
                    return;
                }
                const item = pendingRequests.get(response.id);
                clientLog("Cross-origin response received for id:", response.id, "found in pending:", !!item, "method was:", item?.method);
                if (response.id && item) {
                  const { resolve, reject } = item;
                  if (response.result !== void 0) {
                    client.receive({ ...response, id: item.id });
                    resolve();
                  } else if (response.error) {
                    const { error: _error, jsonrpc } = response;
                    const { method, params, id } = item;
                    const error = {
                      ..._error,
                      message: `${_error.message} ${JSON.stringify(method)}(${JSON.stringify(params)})`
                    };
                    console.error("error", { error, method, params, id, jsonrpc });
                    client.receive({ ...response, id: item.id });
                    reject(error);
                  }
                  pendingRequests.delete(response.id);
                }
              } catch (error) {
                console.error("Error parsing wrapped JSON RPC response", error, event.data);
              }
            }
          };
          window.addEventListener("message", messageHandler);
        }
        options.client = client;
        const fn = startupResolve;
        if (fn) {
          fn();
        }
        startupResolve = () => {
        };
        return up;
      }).catch((error) => {
        options.client = client;
        startupResolve();
        searchPromise = null;
        throw error;
      }).then((up) => {
        if (!up) {
          searchPromise = null;
        }
        return up;
      });
      searchPromise = activeSearchPromise;
      return activeSearchPromise;
    };
    if (!authURL || !authURL?.url || authURL?.mode === "iframe") {
      allocateConnection();
    }
    return remote;
  }
  return __toCommonJS(client_exports);
})();
//# sourceMappingURL=client.global.js.map