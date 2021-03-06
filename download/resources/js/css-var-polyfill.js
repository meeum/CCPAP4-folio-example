/*!
 * css-vars-ponyfill
 * v1.4.0
 * https://github.com/jhildenbiddle/css-vars-ponyfill
 * (c) 2018 John Hildenbiddle <http://hildenbiddle.com>
 * MIT license
 */
!(function(e, n) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = n())
    : "function" == typeof define && define.amd
      ? define(n)
      : (e.cssVars = n());
})(this, function() {
  "use strict";
  function e(e) {
    var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
      r = {
        mimeType: n.mimeType || null,
        onComplete: n.onComplete || Function.prototype,
        onError: n.onError || Function.prototype,
        onSuccess: n.onSuccess || Function.prototype
      },
      t = Array.isArray(e) ? e : [e],
      o = Array.apply(null, Array(t.length)).map(function(e) {
        return null;
      });
    function i(e, n) {
      r.onError(e, t[n], n);
    }
    function s(e, n) {
      (o[n] = e),
        r.onSuccess(e, t[n], n),
        -1 === o.indexOf(null) && r.onComplete(o);
    }
    t.forEach(function(e, n) {
      var t = document.createElement("a");
      t.setAttribute("href", e), (t.href = t.href);
      var o = t.host !== location.host,
        a = t.protocol === location.protocol;
      if (o && "undefined" != typeof XDomainRequest)
        if (a) {
          var u = new XDomainRequest();
          u.open("GET", e),
            (u.timeout = 0),
            (u.onprogress = Function.prototype),
            (u.ontimeout = Function.prototype),
            (u.onload = function() {
              s(u.responseText, n);
            }),
            (u.onerror = function(e) {
              i(u, n);
            }),
            setTimeout(function() {
              u.send();
            }, 0);
        } else
          console.log(
            "Internet Explorer 9 Cross-Origin (CORS) requests must use the same protocol"
          ),
            i(null, n);
      else {
        var c = new XMLHttpRequest();
        c.open("GET", e),
          r.mimeType && c.overrideMimeType && c.overrideMimeType(r.mimeType),
          (c.onreadystatechange = function() {
            4 === c.readyState &&
              (200 === c.status ? s(c.responseText, n) : i(c, n));
          }),
          c.send();
      }
    });
  }
  function n(n) {
    var t = {
        cssComments: /\/\*[\s\S]+?\*\//g,
        cssImports: /(?:@import\s*)(?:url\(\s*)?(?:['"])([^'"]*)(?:['"])(?:\s*\))?(?:[^;]*;)/g
      },
      o = {
        include: n.include || 'style,link[rel="stylesheet"]',
        exclude: n.exclude || null,
        filter: n.filter || null,
        onComplete: n.onComplete || Function.prototype,
        onError: n.onError || Function.prototype,
        onSuccess: n.onSuccess || Function.prototype
      },
      i = Array.apply(null, document.querySelectorAll(o.include)).filter(
        function(e) {
          return (
            (n = e),
            (r = o.exclude),
            !(
              n.matches ||
              n.matchesSelector ||
              n.webkitMatchesSelector ||
              n.mozMatchesSelector ||
              n.msMatchesSelector ||
              n.oMatchesSelector
            ).call(n, r)
          );
          var n, r;
        }
      ),
      s = Array.apply(null, Array(i.length)).map(function(e) {
        return null;
      });
    function a() {
      if (-1 === s.indexOf(null)) {
        var e = s.join("");
        o.onComplete(e, s, i);
      }
    }
    function u(n, i, u, c) {
      !(function n(o, i, s) {
        var a =
          arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : [];
        var u =
          arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : [];
        var c = o.replace(t.cssComments, "").match(t.cssImports);
        c = (c || []).filter(function(e) {
          return -1 === u.indexOf(e);
        });
        if (c.length) {
          var l = c
            .map(function(e) {
              return e.replace(t.cssImports, "$1");
            })
            .map(function(e) {
              return r(e, i);
            });
          e(l, {
            onError: function(e, r, t) {
              a.push({ xhr: e, url: r }), u.push(c[t]), n(o, i, s, a, u);
            },
            onSuccess: function(e, r, t) {
              var i = c[t],
                l = o.replace(i, e);
              n(l, r, s, a, u);
            }
          });
        } else s(o, a);
      })(n, c, function(e, n) {
        if (null === s[i]) {
          if (
            (n.forEach(function(e) {
              return o.onError(e.xhr, u, e.url);
            }),
            !o.filter || o.filter.test(e))
          ) {
            var r = o.onSuccess(e, u, c);
            s[i] = !1 === r ? "" : r || e;
          } else s[i] = "";
          a();
        }
      });
    }
    i.length
      ? i.forEach(function(n, t) {
          var i = n.getAttribute("href"),
            c = n.getAttribute("rel"),
            l =
              "LINK" === n.nodeName &&
              i &&
              c &&
              "stylesheet" === c.toLowerCase(),
            f = "STYLE" === n.nodeName;
          l
            ? e(i, {
                mimeType: "text/css",
                onError: function(e, r, i) {
                  (s[t] = ""), o.onError(e, n, r), a();
                },
                onSuccess: function(e, o, s) {
                  var a = r(i, location.href);
                  u(e, t, n, a);
                }
              })
            : f
              ? u(n.textContent, t, n, location.href)
              : ((s[t] = ""), a());
        })
      : o.onComplete("", []);
  }
  function r(e) {
    var n =
        arguments.length > 1 && void 0 !== arguments[1]
          ? arguments[1]
          : location.href,
      r = document.implementation.createHTMLDocument(""),
      t = r.createElement("base"),
      o = r.createElement("a");
    return (
      r.head.appendChild(t),
      r.body.appendChild(o),
      (t.href = n),
      (o.href = e),
      o.href
    );
  }
  function t() {
    for (
      var e = function(e) {
          return e instanceof Object && e.constructor === Object;
        },
        n = arguments.length,
        r = Array(n),
        o = 0;
      o < n;
      o++
    )
      r[o] = arguments[o];
    return r.reduce(function(n, r) {
      return (
        Object.keys(r).forEach(function(o) {
          var i = n[o],
            s = r[o];
          e(i) && e(s) ? (n[o] = t(i, s)) : (n[o] = s);
        }),
        n
      );
    }, {});
  }
  var o = i;
  function i(e, n, r) {
    e instanceof RegExp && (e = s(e, r)), n instanceof RegExp && (n = s(n, r));
    var t = a(e, n, r);
    return (
      t && {
        start: t[0],
        end: t[1],
        pre: r.slice(0, t[0]),
        body: r.slice(t[0] + e.length, t[1]),
        post: r.slice(t[1] + n.length)
      }
    );
  }
  function s(e, n) {
    var r = n.match(e);
    return r ? r[0] : null;
  }
  function a(e, n, r) {
    var t,
      o,
      i,
      s,
      a,
      u = r.indexOf(e),
      c = r.indexOf(n, u + 1),
      l = u;
    if (u >= 0 && c > 0) {
      for (t = [], i = r.length; l >= 0 && !a; )
        l == u
          ? (t.push(l), (u = r.indexOf(e, l + 1)))
          : 1 == t.length
            ? (a = [t.pop(), c])
            : ((o = t.pop()) < i && ((i = o), (s = c)),
              (c = r.indexOf(n, l + 1))),
          (l = u < c && u >= 0 ? u : c);
      t.length && (a = [i, s]);
    }
    return a;
  }
  function u(e) {
    function n(e) {
      throw new Error("CSS parse error: " + e);
    }
    function r(n) {
      var r = n.exec(e);
      if (r) return (e = e.slice(r[0].length)), r;
    }
    function t() {
      r(/^\s*/);
    }
    function o() {
      return r(/^{\s*/);
    }
    function i() {
      return r(/^}/);
    }
    function s() {
      if ((t(), "/" === e[0] && "*" === e[1])) {
        for (var r = 2; e[r] && ("*" !== e[r] || "/" !== e[r + 1]); ) r++;
        if (!e[r]) return n("end of comment is missing");
        var o = e.slice(2, r);
        return (e = e.slice(r + 2)), { type: "comment", comment: o };
      }
    }
    function a() {
      for (var e = [], n = void 0; (n = s()); ) e.push(n);
      return e;
    }
    function u() {
      for (t(); "}" === e[0]; ) n("extra closing bracket");
      var o = r(/^(("(?:\\"|[^"])*"|'(?:\\'|[^'])*'|[^{])+)/);
      if (o)
        return o[0]
          .trim()
          .replace(/\/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*\/+/g, "")
          .replace(/"(?:\\"|[^"])*"|'(?:\\'|[^'])*'/g, function(e) {
            return e.replace(/,/g, "???");
          })
          .split(/\s*(?![^(]*\)),\s*/)
          .map(function(e) {
            return e.replace(/\u200C/g, ",");
          });
    }
    function c() {
      r(/^([;\s]*)+/);
      var e = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g,
        t = r(/^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/);
      if (t) {
        if (((t = t[0].trim()), !r(/^:\s*/))) return n("property missing ':'");
        var o = r(
            /^((?:\/\*.*?\*\/|'(?:\\'|.)*?'|"(?:\\"|.)*?"|\((\s*'(?:\\'|.)*?'|"(?:\\"|.)*?"|[^)]*?)\s*\)|[^};])+)/
          ),
          i = {
            type: "declaration",
            property: t.replace(e, ""),
            value: o ? o[0].replace(e, "").trim() : ""
          };
        return r(/^[;\s]*/), i;
      }
    }
    function l() {
      if (!o()) return n("missing '{'");
      for (var e = void 0, r = a(); (e = c()); ) r.push(e), (r = r.concat(a()));
      return i() ? r : n("missing '}'");
    }
    function f() {
      t();
      for (
        var e = [], n = void 0;
        (n = r(/^((\d+\.\d+|\.\d+|\d+)%?|[a-z]+)\s*/));

      )
        e.push(n[1]), r(/^,\s*/);
      if (e.length) return { type: "keyframe", values: e, declarations: l() };
    }
    function p() {
      if ((t(), "@" === e[0]))
        return (
          (function() {
            var e = r(/^@([-\w]+)?keyframes\s*/);
            if (e) {
              var t = e[1];
              if (!(e = r(/^([-\w]+)\s*/))) return n("@keyframes missing name");
              var s = e[1];
              if (!o()) return n("@keyframes missing '{'");
              for (var u = void 0, c = a(); (u = f()); )
                c.push(u), (c = c.concat(a()));
              return i()
                ? { type: "keyframes", name: s, vendor: t, keyframes: c }
                : n("@keyframes missing '}'");
            }
          })() ||
          (function() {
            var e = r(/^@supports *([^{]+)/);
            if (e)
              return { type: "supports", supports: e[1].trim(), rules: d() };
          })() ||
          (function() {
            if (r(/^@host\s*/)) return { type: "host", rules: d() };
          })() ||
          (function() {
            var e = r(/^@media *([^{]+)/);
            if (e) return { type: "media", media: e[1].trim(), rules: d() };
          })() ||
          (function() {
            var e = r(/^@custom-media\s+(--[^\s]+)\s*([^{;]+);/);
            if (e)
              return {
                type: "custom-media",
                name: e[1].trim(),
                media: e[2].trim()
              };
          })() ||
          (function() {
            if (r(/^@page */))
              return { type: "page", selectors: u() || [], declarations: l() };
          })() ||
          (function() {
            var e = r(/^@([-\w]+)?document *([^{]+)/);
            if (e)
              return {
                type: "document",
                document: e[2].trim(),
                vendor: e[1] ? e[1].trim() : null,
                rules: d()
              };
          })() ||
          (function() {
            if (r(/^@font-face\s*/))
              return { type: "font-face", declarations: l() };
          })() ||
          (function() {
            var e = r(/^@(import|charset|namespace)\s*([^;]+);/);
            if (e) return { type: e[1], name: e[2].trim() };
          })()
        );
    }
    function d(r) {
      if (!r && !o()) return n("missing '{'");
      for (
        var t, s = void 0, c = a();
        e.length &&
        (r || "}" !== e[0]) &&
        (s =
          p() ||
          (void 0,
          (t = u() || []).length || n("selector missing"),
          { type: "rule", selectors: t, declarations: l() }));

      )
        c.push(s), (c = c.concat(a()));
      return r || i() ? c : n("missing '}'");
    }
    return { type: "stylesheet", stylesheet: { rules: d(!0), errors: [] } };
  }
  i.range = a;
  var c = {},
    l = "--",
    f = "var";
  function p(e) {
    var n,
      r,
      i = {},
      s = t(
        {
          fixNestedCalc: !0,
          onlyVars: !0,
          persist: !1,
          preserve: !1,
          variables: {},
          onWarning: function() {}
        },
        arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
      ),
      a = s.persist ? c : s.variables,
      p = u(e);
    if (
      (s.onlyVars &&
        (p.stylesheet.rules = (function e(n) {
          return n.filter(function(n) {
            if (n.declarations) {
              var r = n.declarations.filter(function(e) {
                var n = e.property && 0 === e.property.indexOf(l),
                  r = e.value && e.value.indexOf(f + "(") > -1;
                return n || r;
              });
              return (
                "font-face" !== n.type && (n.declarations = r),
                Boolean(r.length)
              );
            }
            return n.keyframes
              ? Boolean(
                  n.keyframes.filter(function(e) {
                    return Boolean(
                      e.declarations.filter(function(e) {
                        var n = e.property && 0 === e.property.indexOf(l),
                          r = e.value && e.value.indexOf(f + "(") > -1;
                        return n || r;
                      }).length
                    );
                  }).length
                )
              : !n.rules ||
                  ((n.rules = e(n.rules).filter(function(e) {
                    return e.declarations && e.declarations.length;
                  })),
                  Boolean(n.rules.length));
          });
        })(p.stylesheet.rules)),
      p.stylesheet.rules.forEach(function(e) {
        var n = [];
        if (
          "rule" === e.type &&
          1 === e.selectors.length &&
          ":root" === e.selectors[0] &&
          (e.declarations.forEach(function(e, r) {
            var t = e.property,
              o = e.value;
            t && 0 === t.indexOf(l) && ((i[t] = o), n.push(r));
          }),
          !s.preserve)
        )
          for (var r = n.length - 1; r >= 0; r--)
            e.declarations.splice(n[r], 1);
      }),
      Object.keys(s.variables).forEach(function(e) {
        var n = "--" + e.replace(/^-+/, ""),
          r = s.variables[e];
        e !== n && ((s.variables[n] = r), delete s.variables[e]),
          s.persist && (c[n] = r);
      }),
      Object.keys(a).length)
    ) {
      var m = { declarations: [], selectors: [":root"], type: "rule" };
      Object.keys(a).forEach(function(e) {
        (i[e] = a[e]),
          m.declarations.push({
            type: "declaration",
            property: e,
            value: a[e]
          }),
          s.persist && (c[e] = a[e]);
      }),
        s.preserve && p.stylesheet.rules.push(m);
    }
    return (
      (function e(n, r) {
        n.rules.forEach(function(t) {
          t.rules
            ? e(t, r)
            : t.keyframes
              ? t.keyframes.forEach(function(e) {
                  "keyframe" === e.type && r(e.declarations, t);
                })
              : t.declarations && r(t.declarations, n);
        });
      })(p.stylesheet, function(e, n) {
        for (var r = void 0, t = void 0, o = void 0, a = 0; a < e.length; a++)
          (o = (r = e[a]).value),
            "declaration" === r.type &&
              o &&
              -1 !== o.indexOf(f + "(") &&
              "undefined" !== (t = d(o, i, s)) &&
              (s.preserve
                ? (e.splice(a, 0, {
                    type: r.type,
                    property: r.property,
                    value: t
                  }),
                  a++)
                : (r.value = t));
      }),
      s.fixNestedCalc &&
        ((n = p.stylesheet.rules),
        (r = /(-[a-z]+-)?calc\(/),
        n.forEach(function(e) {
          e.declarations &&
            e.declarations.forEach(function(e) {
              for (var n = e.value, t = ""; r.test(n); ) {
                var i = o("calc(", ")", n || "");
                for (n = n.slice(i.end); r.test(i.body); ) {
                  var s = o(r, ")", i.body);
                  i.body = s.pre + "(" + s.body + ")" + s.post;
                }
                (t += i.pre + "calc(" + i.body),
                  (t += r.test(n) ? "" : ")" + i.post);
              }
              e.value = t || e.value;
            });
        })),
      (function(e) {
        var n =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
          r = arguments[2],
          t = {
            charset: function(e) {
              return "@charset " + e.name + ";";
            },
            comment: function(e) {
              return "";
            },
            "custom-media": function(e) {
              return "@custom-media " + e.name + " " + e.media + ";";
            },
            declaration: function(e) {
              return e.property + ":" + e.value + ";";
            },
            document: function(e) {
              return (
                "@" +
                (e.vendor || "") +
                "document " +
                e.document +
                "{" +
                o(e.rules) +
                "}"
              );
            },
            "font-face": function(e) {
              return "@font-face{" + o(e.declarations) + "}";
            },
            host: function(e) {
              return "@host{" + o(e.rules) + "}";
            },
            import: function(e) {
              return "@import " + e.name + ";";
            },
            keyframe: function(e) {
              return e.values.join(",") + "{" + o(e.declarations) + "}";
            },
            keyframes: function(e) {
              return (
                "@" +
                (e.vendor || "") +
                "keyframes " +
                e.name +
                "{" +
                o(e.keyframes) +
                "}"
              );
            },
            media: function(e) {
              return "@media " + e.media + "{" + o(e.rules) + "}";
            },
            namespace: function(e) {
              return "@namespace " + e.name + ";";
            },
            page: function(e) {
              return (
                "@page " +
                (e.selectors.length ? e.selectors.join(", ") : "") +
                "{" +
                o(e.declarations) +
                "}"
              );
            },
            rule: function(e) {
              var n = e.declarations;
              if (n.length) return e.selectors.join(",") + "{" + o(n) + "}";
            },
            supports: function(e) {
              return "@supports " + e.supports + "{" + o(e.rules) + "}";
            }
          };
        function o(e) {
          for (var o = "", i = 0; i < e.length; i++) {
            var s = e[i];
            r && r(s);
            var a = t[s.type](s);
            a && ((o += a), a.length && s.selectors && (o += n));
          }
          return o;
        }
        return o(e.stylesheet.rules);
      })(p)
    );
  }
  function d(e, n, r) {
    var t = o("(", ")", e),
      i = e.indexOf("var("),
      s = o("(", ")", e.substring(i)).body,
      a = "CSS transform warning:";
    t || r.onWarning(a + ' missing closing ")" in the value "' + e + '"'),
      "" === s &&
        r.onWarning(a + " var() must contain a non-whitespace string");
    var u = f + "(" + s + ")",
      c = s.replace(/([\w-]+)(?:\s*,\s*)?(.*)?/, function(e, t, o) {
        var i = n[t];
        return (
          i || o || r.onWarning(a + ' variable "' + t + '" is undefined'),
          !i && o ? o : i
        );
      });
    return (
      -1 !== (e = e.split(u).join(c)).indexOf(f + "(") && (e = d(e, n, r)), e
    );
  }
  var m = "css-vars-ponyfill",
    v = {
      include: "style,link[rel = stylesheet]",
      exclude: "",
      fixNestedCalc: !0,
      onlyLegacy: !0,
      onlyVars: !1,
      preserve: !1,
      silent: !1,
      updateDOM: !0,
      variables: {},
      onSuccess: function() {},
      onError: function() {},
      onWarning: function() {},
      onComplete: function() {}
    },
    y = /(?:(?::root\s*{\s*[^;]*;*\s*)|(?:var\(\s*))(--[^:)]+)(?:\s*[:)])/;
  return function e() {
    var r = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
      o = t(v, r);
    function i(e, n, r, t) {
      o.silent || console.error(e + "\n", n), o.onError(e, n, r, t);
    }
    function s(e) {
      o.silent || console.warn(e), o.onWarning(e);
    }
    if ("loading" !== document.readyState) {
      var a =
        window.CSS && window.CSS.supports && window.CSS.supports("(--a: 0)");
      if (a && o.onlyLegacy)
        a &&
          o.updateDOM &&
          Object.keys(o.variables).forEach(function(e) {
            var n = "--" + e.replace(/^-+/, ""),
              r = o.variables[e];
            document.documentElement.style.setProperty(n, r);
          });
      else {
        var u = m;
        n({
          include: o.include,
          exclude: "#" + u + (o.exclude ? "," + o.exclude : ""),
          filter: o.onlyVars ? y : null,
          onComplete: function(e, n, r) {
            var t = null;
            try {
              e = p(e, {
                fixNestedCalc: o.fixNestedCalc,
                onlyVars: o.onlyVars,
                persist: o.updateDOM,
                preserve: o.preserve,
                variables: o.variables,
                onWarning: s
              });
              var a = o.onSuccess(e);
              if (
                ((e = !1 === a ? "" : a || e), o.updateDOM && r && r.length)
              ) {
                var c = r[r.length - 1];
                (t =
                  document.querySelector("#" + u) ||
                  document.createElement("style")).setAttribute("id", u),
                  t.textContent !== e && (t.textContent = e),
                  c.nextSibling !== t &&
                    c.parentNode.insertBefore(t, c.nextSibling);
              }
            } catch (e) {
              var l = !1;
              n.forEach(function(e, n) {
                try {
                  e = p(e, o);
                } catch (e) {
                  var t = r[n - 0];
                  (l = !0), i(e.message, t);
                }
              }),
                l || i(e.message || e);
            }
            o.onComplete(e, t);
          },
          onError: function(e, n, r) {
            i(
              'CSS XHR error: "' +
                e.responseURL +
                '" ' +
                e.status +
                (e.statusText ? " (" + e.statusText + ")" : ""),
              n,
              e,
              r
            );
          }
        });
      }
    } else
      document.addEventListener("DOMContentLoaded", function n(t) {
        e(r), document.removeEventListener("DOMContentLoaded", n);
      });
  };
});
//# sourceMappingURL=css-vars-ponyfill.min.js.map
