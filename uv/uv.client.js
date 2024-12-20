(() => {
	var Je = Object.create;
	var z = Object.defineProperty;
	var Ye = Object.getOwnPropertyDescriptor;
	var Ze = Object.getOwnPropertyNames;
	var et = Object.getPrototypeOf,
		tt = Object.prototype.hasOwnProperty;
	var rt = (s, e) => () => (
		e || s((e = { exports: {} }).exports, e), e.exports
	);
	var ot = (s, e, r, t) => {
		if ((e && typeof e == "object") || typeof e == "function")
			for (let i of Ze(e))
				!tt.call(s, i) &&
					i !== r &&
					z(s, i, {
						get: () => e[i],
						enumerable: !(t = Ye(e, i)) || t.enumerable,
					});
		return s;
	};
	var f = (s, e, r) => (
		(r = s != null ? Je(et(s)) : {}),
		ot(
			e || !s || !s.__esModule
				? z(r, "default", { value: s, enumerable: !0 })
				: r,
			s
		)
	);
	var p = rt((ft, M) => {
		"use strict";
		var y = typeof Reflect == "object" ? Reflect : null,
			J =
				y && typeof y.apply == "function"
					? y.apply
					: function (e, r, t) {
							return Function.prototype.apply.call(e, r, t);
						},
			b;
		y && typeof y.ownKeys == "function"
			? (b = y.ownKeys)
			: Object.getOwnPropertySymbols
				? (b = function (e) {
						return Object.getOwnPropertyNames(e).concat(
							Object.getOwnPropertySymbols(e)
						);
					})
				: (b = function (e) {
						return Object.getOwnPropertyNames(e);
					});
		function it(s) {
			console && console.warn && console.warn(s);
		}
		var Z =
			Number.isNaN ||
			function (e) {
				return e !== e;
			};
		function d() {
			d.init.call(this);
		}
		M.exports = d;
		M.exports.once = ht;
		d.EventEmitter = d;
		d.prototype._events = void 0;
		d.prototype._eventsCount = 0;
		d.prototype._maxListeners = void 0;
		var Y = 10;
		function x(s) {
			if (typeof s != "function")
				throw new TypeError(
					'The "listener" argument must be of type Function. Received type ' +
						typeof s
				);
		}
		Object.defineProperty(d, "defaultMaxListeners", {
			enumerable: !0,
			get: function () {
				return Y;
			},
			set: function (s) {
				if (typeof s != "number" || s < 0 || Z(s))
					throw new RangeError(
						'The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' +
							s +
							"."
					);
				Y = s;
			},
		});
		d.init = function () {
			(this._events === void 0 ||
				this._events === Object.getPrototypeOf(this)._events) &&
				((this._events = Object.create(null)), (this._eventsCount = 0)),
				(this._maxListeners = this._maxListeners || void 0);
		};
		d.prototype.setMaxListeners = function (e) {
			if (typeof e != "number" || e < 0 || Z(e))
				throw new RangeError(
					'The value of "n" is out of range. It must be a non-negative number. Received ' +
						e +
						"."
				);
			return (this._maxListeners = e), this;
		};
		function ee(s) {
			return s._maxListeners === void 0
				? d.defaultMaxListeners
				: s._maxListeners;
		}
		d.prototype.getMaxListeners = function () {
			return ee(this);
		};
		d.prototype.emit = function (e) {
			for (var r = [], t = 1; t < arguments.length; t++) r.push(arguments[t]);
			var i = e === "error",
				o = this._events;
			if (o !== void 0) i = i && o.error === void 0;
			else if (!i) return !1;
			if (i) {
				var n;
				if ((r.length > 0 && (n = r[0]), n instanceof Error)) throw n;
				var h = new Error(
					"Unhandled error." + (n ? " (" + n.message + ")" : "")
				);
				throw ((h.context = n), h);
			}
			var c = o[e];
			if (c === void 0) return !1;
			if (typeof c == "function") J(c, this, r);
			else
				for (var u = c.length, l = ne(c, u), t = 0; t < u; ++t)
					J(l[t], this, r);
			return !0;
		};
		function te(s, e, r, t) {
			var i, o, n;
			if (
				(x(r),
				(o = s._events),
				o === void 0
					? ((o = s._events = Object.create(null)), (s._eventsCount = 0))
					: (o.newListener !== void 0 &&
							(s.emit("newListener", e, r.listener ? r.listener : r),
							(o = s._events)),
						(n = o[e])),
				n === void 0)
			)
				(n = o[e] = r), ++s._eventsCount;
			else if (
				(typeof n == "function"
					? (n = o[e] = t ? [r, n] : [n, r])
					: t
						? n.unshift(r)
						: n.push(r),
				(i = ee(s)),
				i > 0 && n.length > i && !n.warned)
			) {
				n.warned = !0;
				var h = new Error(
					"Possible EventEmitter memory leak detected. " +
						n.length +
						" " +
						String(e) +
						" listeners added. Use emitter.setMaxListeners() to increase limit"
				);
				(h.name = "MaxListenersExceededWarning"),
					(h.emitter = s),
					(h.type = e),
					(h.count = n.length),
					it(h);
			}
			return s;
		}
		d.prototype.addListener = function (e, r) {
			return te(this, e, r, !1);
		};
		d.prototype.on = d.prototype.addListener;
		d.prototype.prependListener = function (e, r) {
			return te(this, e, r, !0);
		};
		function nt() {
			if (!this.fired)
				return (
					this.target.removeListener(this.type, this.wrapFn),
					(this.fired = !0),
					arguments.length === 0
						? this.listener.call(this.target)
						: this.listener.apply(this.target, arguments)
				);
		}
		function re(s, e, r) {
			var t = { fired: !1, wrapFn: void 0, target: s, type: e, listener: r },
				i = nt.bind(t);
			return (i.listener = r), (t.wrapFn = i), i;
		}
		d.prototype.once = function (e, r) {
			return x(r), this.on(e, re(this, e, r)), this;
		};
		d.prototype.prependOnceListener = function (e, r) {
			return x(r), this.prependListener(e, re(this, e, r)), this;
		};
		d.prototype.removeListener = function (e, r) {
			var t, i, o, n, h;
			if ((x(r), (i = this._events), i === void 0)) return this;
			if (((t = i[e]), t === void 0)) return this;
			if (t === r || t.listener === r)
				--this._eventsCount === 0
					? (this._events = Object.create(null))
					: (delete i[e],
						i.removeListener &&
							this.emit("removeListener", e, t.listener || r));
			else if (typeof t != "function") {
				for (o = -1, n = t.length - 1; n >= 0; n--)
					if (t[n] === r || t[n].listener === r) {
						(h = t[n].listener), (o = n);
						break;
					}
				if (o < 0) return this;
				o === 0 ? t.shift() : st(t, o),
					t.length === 1 && (i[e] = t[0]),
					i.removeListener !== void 0 && this.emit("removeListener", e, h || r);
			}
			return this;
		};
		d.prototype.off = d.prototype.removeListener;
		d.prototype.removeAllListeners = function (e) {
			var r, t, i;
			if (((t = this._events), t === void 0)) return this;
			if (t.removeListener === void 0)
				return (
					arguments.length === 0
						? ((this._events = Object.create(null)), (this._eventsCount = 0))
						: t[e] !== void 0 &&
							(--this._eventsCount === 0
								? (this._events = Object.create(null))
								: delete t[e]),
					this
				);
			if (arguments.length === 0) {
				var o = Object.keys(t),
					n;
				for (i = 0; i < o.length; ++i)
					(n = o[i]), n !== "removeListener" && this.removeAllListeners(n);
				return (
					this.removeAllListeners("removeListener"),
					(this._events = Object.create(null)),
					(this._eventsCount = 0),
					this
				);
			}
			if (((r = t[e]), typeof r == "function")) this.removeListener(e, r);
			else if (r !== void 0)
				for (i = r.length - 1; i >= 0; i--) this.removeListener(e, r[i]);
			return this;
		};
		function oe(s, e, r) {
			var t = s._events;
			if (t === void 0) return [];
			var i = t[e];
			return i === void 0
				? []
				: typeof i == "function"
					? r
						? [i.listener || i]
						: [i]
					: r
						? at(i)
						: ne(i, i.length);
		}
		d.prototype.listeners = function (e) {
			return oe(this, e, !0);
		};
		d.prototype.rawListeners = function (e) {
			return oe(this, e, !1);
		};
		d.listenerCount = function (s, e) {
			return typeof s.listenerCount == "function"
				? s.listenerCount(e)
				: ie.call(s, e);
		};
		d.prototype.listenerCount = ie;
		function ie(s) {
			var e = this._events;
			if (e !== void 0) {
				var r = e[s];
				if (typeof r == "function") return 1;
				if (r !== void 0) return r.length;
			}
			return 0;
		}
		d.prototype.eventNames = function () {
			return this._eventsCount > 0 ? b(this._events) : [];
		};
		function ne(s, e) {
			for (var r = new Array(e), t = 0; t < e; ++t) r[t] = s[t];
			return r;
		}
		function st(s, e) {
			for (; e + 1 < s.length; e++) s[e] = s[e + 1];
			s.pop();
		}
		function at(s) {
			for (var e = new Array(s.length), r = 0; r < e.length; ++r)
				e[r] = s[r].listener || s[r];
			return e;
		}
		function ht(s, e) {
			return new Promise(function (r, t) {
				function i(n) {
					s.removeListener(e, o), t(n);
				}
				function o() {
					typeof s.removeListener == "function" && s.removeListener("error", i),
						r([].slice.call(arguments));
				}
				se(s, e, o, { once: !0 }), e !== "error" && lt(s, i, { once: !0 });
			});
		}
		function lt(s, e, r) {
			typeof s.on == "function" && se(s, "error", e, r);
		}
		function se(s, e, r, t) {
			if (typeof s.on == "function") t.once ? s.once(e, r) : s.on(e, r);
			else if (typeof s.addEventListener == "function")
				s.addEventListener(e, function i(o) {
					t.once && s.removeEventListener(e, i), r(o);
				});
			else
				throw new TypeError(
					'The "emitter" argument must be of type EventEmitter. Received type ' +
						typeof s
				);
		}
	});
	var ae = f(p(), 1);
	var k = class {
			#e;
			#t;
			constructor(e = {}, r = null, t = null) {
				(this.#e = !1),
					(this.#t = null),
					(this.data = e),
					(this.target = r),
					(this.that = t);
			}
			get intercepted() {
				return this.#e;
			}
			get returnValue() {
				return this.#t;
			}
			respondWith(e) {
				(this.#t = e), (this.#e = !0);
			}
		},
		a = k;
	var L = class extends ae.default {
			constructor(e) {
				super(),
					(this.ctx = e),
					(this.window = e.window),
					(this.document = this.window.document),
					(this.Document = this.window.Document || {}),
					(this.DOMParser = this.window.DOMParser || {}),
					(this.docProto = this.Document.prototype || {}),
					(this.domProto = this.DOMParser.prototype || {}),
					(this.title = e.nativeMethods.getOwnPropertyDescriptor(
						this.docProto,
						"title"
					)),
					(this.cookie = e.nativeMethods.getOwnPropertyDescriptor(
						this.docProto,
						"cookie"
					)),
					(this.referrer = e.nativeMethods.getOwnPropertyDescriptor(
						this.docProto,
						"referrer"
					)),
					(this.domain = e.nativeMethods.getOwnPropertyDescriptor(
						this.docProto,
						"domain"
					)),
					(this.documentURI = e.nativeMethods.getOwnPropertyDescriptor(
						this.docProto,
						"documentURI"
					)),
					(this.write = this.docProto.write),
					(this.writeln = this.docProto.writeln),
					(this.querySelector = this.docProto.querySelector),
					(this.querySelectorAll = this.docProto.querySelectorAll),
					(this.parseFromString = this.domProto.parseFromString),
					(this.URL = e.nativeMethods.getOwnPropertyDescriptor(
						this.docProto,
						"URL"
					));
			}
			overrideParseFromString() {
				this.ctx.override(this.domProto, "parseFromString", (e, r, t) => {
					if (2 > t.length) return e.apply(r, t);
					let [i, o] = t,
						n = new a({ string: i, type: o }, e, r);
					return (
						this.emit("parseFromString", n),
						n.intercepted
							? n.returnValue
							: n.target.call(n.that, n.data.string, n.data.type)
					);
				});
			}
			overrideQuerySelector() {
				this.ctx.override(this.docProto, "querySelector", (e, r, t) => {
					if (!t.length) return e.apply(r, t);
					let [i] = t,
						o = new a({ selectors: i }, e, r);
					return (
						this.emit("querySelector", o),
						o.intercepted
							? o.returnValue
							: o.target.call(o.that, o.data.selectors)
					);
				});
			}
			overrideDomain() {
				this.ctx.overrideDescriptor(this.docProto, "domain", {
					get: (e, r) => {
						let t = new a({ value: e.call(r) }, e, r);
						return (
							this.emit("getDomain", t),
							t.intercepted ? t.returnValue : t.data.value
						);
					},
					set: (e, r, [t]) => {
						let i = new a({ value: t }, e, r);
						return (
							this.emit("setDomain", i),
							i.intercepted
								? i.returnValue
								: i.target.call(i.that, i.data.value)
						);
					},
				});
			}
			overrideReferrer() {
				this.ctx.overrideDescriptor(this.docProto, "referrer", {
					get: (e, r) => {
						let t = new a({ value: e.call(r) }, e, r);
						return (
							this.emit("referrer", t),
							t.intercepted ? t.returnValue : t.data.value
						);
					},
				});
			}
			overrideCreateTreeWalker() {
				this.ctx.override(this.docProto, "createTreeWalker", (e, r, t) => {
					if (!t.length) return e.apply(r, t);
					let [i, o = 4294967295, n, h] = t,
						c = new a(
							{ root: i, show: o, filter: n, expandEntityReferences: h },
							e,
							r
						);
					return (
						this.emit("createTreeWalker", c),
						c.intercepted
							? c.returnValue
							: c.target.call(
									c.that,
									c.data.root,
									c.data.show,
									c.data.filter,
									c.data.expandEntityReferences
								)
					);
				});
			}
			overrideWrite() {
				this.ctx.override(this.docProto, "write", (e, r, t) => {
					if (!t.length) return e.apply(r, t);
					let [...i] = t,
						o = new a({ html: i }, e, r);
					return (
						this.emit("write", o),
						o.intercepted ? o.returnValue : o.target.apply(o.that, o.data.html)
					);
				}),
					this.ctx.override(this.docProto, "writeln", (e, r, t) => {
						if (!t.length) return e.apply(r, t);
						let [...i] = t,
							o = new a({ html: i }, e, r);
						return (
							this.emit("writeln", o),
							o.intercepted
								? o.returnValue
								: o.target.apply(o.that, o.data.html)
						);
					});
			}
			overrideDocumentURI() {
				this.ctx.overrideDescriptor(this.docProto, "documentURI", {
					get: (e, r) => {
						let t = new a({ value: e.call(r) }, e, r);
						return (
							this.emit("documentURI", t),
							t.intercepted ? t.returnValue : t.data.value
						);
					},
				});
			}
			overrideURL() {
				this.ctx.overrideDescriptor(this.docProto, "URL", {
					get: (e, r) => {
						let t = new a({ value: e.call(r) }, e, r);
						return (
							this.emit("url", t), t.intercepted ? t.returnValue : t.data.value
						);
					},
				});
			}
			overrideCookie() {
				this.ctx.overrideDescriptor(this.docProto, "cookie", {
					get: (e, r) => {
						let t = new a({ value: e.call(r) }, e, r);
						return (
							this.emit("getCookie", t),
							t.intercepted ? t.returnValue : t.data.value
						);
					},
					set: (e, r, [t]) => {
						let i = new a({ value: t }, e, r);
						return (
							this.emit("setCookie", i),
							i.intercepted
								? i.returnValue
								: i.target.call(i.that, i.data.value)
						);
					},
				});
			}
			overrideTitle() {
				this.ctx.overrideDescriptor(this.docProto, "title", {
					get: (e, r) => {
						let t = new a({ value: e.call(r) }, e, r);
						return (
							this.emit("getTitle", t),
							t.intercepted ? t.returnValue : t.data.value
						);
					},
					set: (e, r, [t]) => {
						let i = new a({ value: t }, e, r);
						return (
							this.emit("setTitle", i),
							i.intercepted
								? i.returnValue
								: i.target.call(i.that, i.data.value)
						);
					},
				});
			}
		},
		he = L;
	var le = f(p(), 1);
	var N = class extends le.default {
			constructor(e) {
				super(),
					(this.ctx = e),
					(this.window = e.window),
					(this.Audio = this.window.Audio),
					(this.Element = this.window.Element),
					(this.elemProto = this.Element ? this.Element.prototype : {}),
					(this.innerHTML = e.nativeMethods.getOwnPropertyDescriptor(
						this.elemProto,
						"innerHTML"
					)),
					(this.outerHTML = e.nativeMethods.getOwnPropertyDescriptor(
						this.elemProto,
						"outerHTML"
					)),
					(this.setAttribute = this.elemProto.setAttribute),
					(this.getAttribute = this.elemProto.getAttribute),
					(this.removeAttribute = this.elemProto.removeAttribute),
					(this.hasAttribute = this.elemProto.hasAttribute),
					(this.querySelector = this.elemProto.querySelector),
					(this.querySelectorAll = this.elemProto.querySelectorAll),
					(this.insertAdjacentHTML = this.elemProto.insertAdjacentHTML),
					(this.insertAdjacentText = this.elemProto.insertAdjacentText);
			}
			overrideQuerySelector() {
				this.ctx.override(this.elemProto, "querySelector", (e, r, t) => {
					if (!t.length) return e.apply(r, t);
					let [i] = t,
						o = new a({ selectors: i }, e, r);
					return (
						this.emit("querySelector", o),
						o.intercepted
							? o.returnValue
							: o.target.call(o.that, o.data.selectors)
					);
				});
			}
			overrideAttribute() {
				this.ctx.override(this.elemProto, "getAttribute", (e, r, t) => {
					if (!t.length) return e.apply(r, t);
					let [i] = t,
						o = new a({ name: i }, e, r);
					return (
						this.emit("getAttribute", o),
						o.intercepted ? o.returnValue : o.target.call(o.that, o.data.name)
					);
				}),
					this.ctx.override(this.elemProto, "setAttribute", (e, r, t) => {
						if (2 > t.length) return e.apply(r, t);
						let [i, o] = t,
							n = new a({ name: i, value: o }, e, r);
						return (
							this.emit("setAttribute", n),
							n.intercepted
								? n.returnValue
								: n.target.call(n.that, n.data.name, n.data.value)
						);
					}),
					this.ctx.override(this.elemProto, "hasAttribute", (e, r, t) => {
						if (!t.length) return e.apply(r, t);
						let [i] = t,
							o = new a({ name: i }, e, r);
						return (
							this.emit("hasAttribute", o),
							o.intercepted ? o.returnValue : o.target.call(o.that, o.data.name)
						);
					}),
					this.ctx.override(this.elemProto, "removeAttribute", (e, r, t) => {
						if (!t.length) return e.apply(r, t);
						let [i] = t,
							o = new a({ name: i }, e, r);
						return (
							this.emit("removeAttribute", o),
							o.intercepted ? o.returnValue : o.target.call(o.that, o.data.name)
						);
					});
			}
			overrideAudio() {
				this.ctx.override(
					this.window,
					"Audio",
					(e, r, t) => {
						if (!t.length) return new e(...t);
						let [i] = t,
							o = new a({ url: i }, e, r);
						return (
							this.emit("audio", o),
							o.intercepted ? o.returnValue : new o.target(o.data.url)
						);
					},
					!0
				);
			}
			overrideHtml() {
				this.hookProperty(this.Element, "innerHTML", {
					get: (e, r) => {
						let t = new a({ value: e.call(r) }, e, r);
						return (
							this.emit("getInnerHTML", t),
							t.intercepted ? t.returnValue : t.data.value
						);
					},
					set: (e, r, [t]) => {
						let i = new a({ value: t }, e, r);
						if ((this.emit("setInnerHTML", i), i.intercepted))
							return i.returnValue;
						e.call(r, i.data.value);
					},
				}),
					this.hookProperty(this.Element, "outerHTML", {
						get: (e, r) => {
							let t = new a({ value: e.call(r) }, e, r);
							return (
								this.emit("getOuterHTML", t),
								t.intercepted ? t.returnValue : t.data.value
							);
						},
						set: (e, r, [t]) => {
							let i = new a({ value: t }, e, r);
							if ((this.emit("setOuterHTML", i), i.intercepted))
								return i.returnValue;
							e.call(r, i.data.value);
						},
					});
			}
			overrideInsertAdjacentHTML() {
				this.ctx.override(this.elemProto, "insertAdjacentHTML", (e, r, t) => {
					if (2 > t.length) return e.apply(r, t);
					let [i, o] = t,
						n = new a({ position: i, html: o }, e, r);
					return (
						this.emit("insertAdjacentHTML", n),
						n.intercepted
							? n.returnValue
							: n.target.call(n.that, n.data.position, n.data.html)
					);
				});
			}
			overrideInsertAdjacentText() {
				this.ctx.override(this.elemProto, "insertAdjacentText", (e, r, t) => {
					if (2 > t.length) return e.apply(r, t);
					let [i, o] = t,
						n = new a({ position: i, text: o }, e, r);
					return (
						this.emit("insertAdjacentText", n),
						n.intercepted
							? n.returnValue
							: n.target.call(n.that, n.data.position, n.data.text)
					);
				});
			}
			hookProperty(e, r, t) {
				if (!e) return !1;
				if (this.ctx.nativeMethods.isArray(e)) {
					for (let o of e) this.hookProperty(o, r, t);
					return !0;
				}
				let i = e.prototype;
				return this.ctx.overrideDescriptor(i, r, t), !0;
			}
		},
		ce = N;
	var ue = f(p(), 1);
	var D = class extends ue.default {
			constructor(e) {
				super(),
					(this.ctx = e),
					(this.window = e.window),
					(this.Node = e.window.Node || {}),
					(this.nodeProto = this.Node.prototype || {}),
					(this.compareDocumentPosition =
						this.nodeProto.compareDocumentPosition),
					(this.contains = this.nodeProto.contains),
					(this.insertBefore = this.nodeProto.insertBefore),
					(this.replaceChild = this.nodeProto.replaceChild),
					(this.append = this.nodeProto.append),
					(this.appendChild = this.nodeProto.appendChild),
					(this.removeChild = this.nodeProto.removeChild),
					(this.textContent = e.nativeMethods.getOwnPropertyDescriptor(
						this.nodeProto,
						"textContent"
					)),
					(this.parentNode = e.nativeMethods.getOwnPropertyDescriptor(
						this.nodeProto,
						"parentNode"
					)),
					(this.parentElement = e.nativeMethods.getOwnPropertyDescriptor(
						this.nodeProto,
						"parentElement"
					)),
					(this.childNodes = e.nativeMethods.getOwnPropertyDescriptor(
						this.nodeProto,
						"childNodes"
					)),
					(this.baseURI = e.nativeMethods.getOwnPropertyDescriptor(
						this.nodeProto,
						"baseURI"
					)),
					(this.previousSibling = e.nativeMethods.getOwnPropertyDescriptor(
						this.nodeProto,
						"previousSibling"
					)),
					(this.ownerDocument = e.nativeMethods.getOwnPropertyDescriptor(
						this.nodeProto,
						"ownerDocument"
					));
			}
			overrideTextContent() {
				this.ctx.overrideDescriptor(this.nodeProto, "textContent", {
					get: (e, r) => {
						let t = new a({ value: e.call(r) }, e, r);
						return (
							this.emit("getTextContent", t),
							t.intercepted ? t.returnValue : t.data.value
						);
					},
					set: (e, r, [t]) => {
						let i = new a({ value: t }, e, r);
						if ((this.emit("setTextContent", i), i.intercepted))
							return i.returnValue;
						e.call(r, i.data.value);
					},
				});
			}
			overrideAppend() {
				this.ctx.override(this.nodeProto, "append", (e, r, [...t]) => {
					let i = new a({ nodes: t }, e, r);
					return (
						this.emit("append", i),
						i.intercepted ? i.returnValue : i.target.call(i.that, i.data.nodes)
					);
				}),
					this.ctx.override(this.nodeProto, "appendChild", (e, r, t) => {
						if (!t.length) return e.apply(r, t);
						let [i] = t,
							o = new a({ node: i }, e, r);
						return (
							this.emit("appendChild", o),
							o.intercepted ? o.returnValue : o.target.call(o.that, o.data.node)
						);
					});
			}
			overrideBaseURI() {
				this.ctx.overrideDescriptor(this.nodeProto, "baseURI", {
					get: (e, r) => {
						let t = new a({ value: e.call(r) }, e, r);
						return (
							this.emit("baseURI", t),
							t.intercepted ? t.returnValue : t.data.value
						);
					},
				});
			}
			overrideParent() {
				this.ctx.overrideDescriptor(this.nodeProto, "parentNode", {
					get: (e, r) => {
						let t = new a({ node: e.call(r) }, e, r);
						return (
							this.emit("parentNode", t),
							t.intercepted ? t.returnValue : t.data.node
						);
					},
				}),
					this.ctx.overrideDescriptor(this.nodeProto, "parentElement", {
						get: (e, r) => {
							let t = new a({ element: e.call(r) }, e, r);
							return (
								this.emit("parentElement", t),
								t.intercepted ? t.returnValue : t.data.node
							);
						},
					});
			}
			overrideOwnerDocument() {
				this.ctx.overrideDescriptor(this.nodeProto, "ownerDocument", {
					get: (e, r) => {
						let t = new a({ document: e.call(r) }, e, r);
						return (
							this.emit("ownerDocument", t),
							t.intercepted ? t.returnValue : t.data.document
						);
					},
				});
			}
			overrideCompareDocumentPosit1ion() {
				this.ctx.override(
					this.nodeProto,
					"compareDocumentPosition",
					(e, r, t) => {
						if (!t.length) return e.apply(r, t);
						let [i] = t,
							o = new a({ node: i }, e, r);
						return o.intercepted
							? o.returnValue
							: o.target.call(o.that, o.data.node);
					}
				);
			}
			overrideChildMethods() {
				this.ctx.override(this.nodeProto, "removeChild");
			}
		},
		de = D;
	var pe = f(p(), 1);
	var C = class extends pe.default {
			constructor(e) {
				super(),
					(this.ctx = e),
					(this.window = e.window),
					(this.Attr = this.window.Attr || {}),
					(this.attrProto = this.Attr.prototype || {}),
					(this.value = e.nativeMethods.getOwnPropertyDescriptor(
						this.attrProto,
						"value"
					)),
					(this.name = e.nativeMethods.getOwnPropertyDescriptor(
						this.attrProto,
						"name"
					)),
					(this.getNamedItem = this.attrProto.getNamedItem || null),
					(this.setNamedItem = this.attrProto.setNamedItem || null),
					(this.removeNamedItem = this.attrProto.removeNamedItem || null),
					(this.getNamedItemNS = this.attrProto.getNamedItemNS || null),
					(this.setNamedItemNS = this.attrProto.setNamedItemNS || null),
					(this.removeNamedItemNS = this.attrProto.removeNamedItemNS || null),
					(this.item = this.attrProto.item || null);
			}
			overrideNameValue() {
				this.ctx.overrideDescriptor(this.attrProto, "name", {
					get: (e, r) => {
						let t = new a({ value: e.call(r) }, e, r);
						return (
							this.emit("name", t), t.intercepted ? t.returnValue : t.data.value
						);
					},
				}),
					this.ctx.overrideDescriptor(this.attrProto, "value", {
						get: (e, r) => {
							let t = new a(
								{ name: this.name.get.call(r), value: e.call(r) },
								e,
								r
							);
							return (
								this.emit("getValue", t),
								t.intercepted ? t.returnValue : t.data.value
							);
						},
						set: (e, r, [t]) => {
							let i = new a({ name: this.name.get.call(r), value: t }, e, r);
							if ((this.emit("setValue", i), i.intercepted))
								return i.returnValue;
							i.target.call(i.that, i.data.value);
						},
					});
			}
			overrideItemMethods() {
				this.ctx.override(this.attrProto, "getNamedItem", (e, r, t) => {
					if (!t.length) return e.apply(r, t);
					let [i] = t,
						o = new a({ name: i }, e, r);
					return (
						this.emit("getNamedItem", o),
						o.intercepted ? o.returnValue : o.target.call(o.that, o.data.name)
					);
				}),
					this.ctx.override(this.attrProto, "setNamedItem", (e, r, t) => {
						if (2 > t.length) return e.apply(r, t);
						let [i, o] = t,
							n = new a({ name: i, value: o }, e, r);
						return (
							this.emit("setNamedItem", n),
							n.intercepted
								? n.returnValue
								: n.target.call(n.that, n.data.name, n.data.value)
						);
					}),
					this.ctx.override(this.attrProto, "removeNamedItem", (e, r, t) => {
						if (!t.length) return e.apply(r, t);
						let [i] = t,
							o = new a({ name: i }, e, r);
						return (
							this.emit("removeNamedItem", o),
							o.intercepted ? o.returnValue : o.target.call(o.that, o.data.name)
						);
					}),
					this.ctx.override(this.attrProto, "item", (e, r, t) => {
						if (!t.length) return e.apply(r, t);
						let [i] = t,
							o = new a({ index: i }, e, r);
						return (
							this.emit("item", o),
							o.intercepted ? o.returnValue : o.target.call(o.that, o.data.name)
						);
					}),
					this.ctx.override(this.attrProto, "getNamedItemNS", (e, r, t) => {
						if (2 > t.length) return e.apply(r, t);
						let [i, o] = t,
							n = new a({ namespace: i, localName: o }, e, r);
						return (
							this.emit("getNamedItemNS", n),
							n.intercepted
								? n.returnValue
								: n.target.call(n.that, n.data.namespace, n.data.localName)
						);
					}),
					this.ctx.override(this.attrProto, "setNamedItemNS", (e, r, t) => {
						if (!t.length) return e.apply(r, t);
						let [i] = t,
							o = new a({ attr: i }, e, r);
						return (
							this.emit("setNamedItemNS", o),
							o.intercepted ? o.returnValue : o.target.call(o.that, o.data.name)
						);
					}),
					this.ctx.override(this.attrProto, "removeNamedItemNS", (e, r, t) => {
						if (2 > t.length) return e.apply(r, t);
						let [i, o] = t,
							n = new a({ namespace: i, localName: o }, e, r);
						return (
							this.emit("removeNamedItemNS", n),
							n.intercepted
								? n.returnValue
								: n.target.call(n.that, n.data.namespace, n.data.localName)
						);
					});
			}
		},
		fe = C;
	var me = f(p(), 1);
	var R = class extends me.default {
			constructor(e) {
				super(),
					(this.ctx = e),
					(this.window = e.window),
					(this.Function = this.window.Function),
					(this.fnProto = this.Function.prototype),
					(this.toString = this.fnProto.toString),
					(this.fnStrings = e.fnStrings),
					(this.call = this.fnProto.call),
					(this.apply = this.fnProto.apply),
					(this.bind = this.fnProto.bind);
			}
			overrideFunction() {
				this.ctx.override(
					this.window,
					"Function",
					(e, r, t) => {
						if (!t.length) return e.apply(r, t);
						let i = t[t.length - 1],
							o = [];
						for (let h = 0; h < t.length - 1; h++) o.push(t[h]);
						let n = new a({ script: i, args: o }, e, r);
						return (
							this.emit("function", n),
							n.intercepted
								? n.returnValue
								: n.target.call(n.that, ...n.data.args, n.data.script)
						);
					},
					!0
				);
			}
			overrideToString() {
				this.ctx.override(this.fnProto, "toString", (e, r) => {
					let t = new a({ fn: r }, e, r);
					return (
						this.emit("toString", t),
						t.intercepted ? t.returnValue : t.target.call(t.data.fn)
					);
				});
			}
		},
		we = R;
	var ve = f(p(), 1);
	var V = class extends ve.default {
			constructor(e) {
				super(),
					(this.ctx = e),
					(this.window = e.window),
					(this.Object = this.window.Object),
					(this.getOwnPropertyDescriptors =
						this.Object.getOwnPropertyDescriptors),
					(this.getOwnPropertyDescriptor =
						this.Object.getOwnPropertyDescriptor),
					(this.getOwnPropertyNames = this.Object.getOwnPropertyNames);
			}
			overrideGetPropertyNames() {
				this.ctx.override(this.Object, "getOwnPropertyNames", (e, r, t) => {
					if (!t.length) return e.apply(r, t);
					let [i] = t,
						o = new a({ names: e.call(r, i) }, e, r);
					return (
						this.emit("getOwnPropertyNames", o),
						o.intercepted ? o.returnValue : o.data.names
					);
				});
			}
			overrideGetOwnPropertyDescriptors() {
				this.ctx.override(
					this.Object,
					"getOwnPropertyDescriptors",
					(e, r, t) => {
						if (!t.length) return e.apply(r, t);
						let [i] = t,
							o = new a({ descriptors: e.call(r, i) }, e, r);
						return (
							this.emit("getOwnPropertyDescriptors", o),
							o.intercepted ? o.returnValue : o.data.descriptors
						);
					}
				);
			}
		},
		ye = V;
	var ge = f(p(), 1);
	var I = class extends ge.default {
			constructor(e) {
				super(),
					(this.ctx = e),
					(this.window = e.window),
					(this.fetch = this.window.fetch),
					(this.Request = this.window.Request),
					(this.Response = this.window.Response),
					(this.Headers = this.window.Headers),
					(this.reqProto = this.Request ? this.Request.prototype : {}),
					(this.resProto = this.Response ? this.Response.prototype : {}),
					(this.headersProto = this.Headers ? this.Headers.prototype : {}),
					(this.reqUrl = e.nativeMethods.getOwnPropertyDescriptor(
						this.reqProto,
						"url"
					)),
					(this.resUrl = e.nativeMethods.getOwnPropertyDescriptor(
						this.resProto,
						"url"
					)),
					(this.reqHeaders = e.nativeMethods.getOwnPropertyDescriptor(
						this.reqProto,
						"headers"
					)),
					(this.resHeaders = e.nativeMethods.getOwnPropertyDescriptor(
						this.resProto,
						"headers"
					));
			}
			override() {
				return (
					this.overrideRequest(), this.overrideUrl(), this.overrideHeaders(), !0
				);
			}
			overrideRequest() {
				return this.fetch
					? (this.ctx.override(this.window, "fetch", (e, r, t) => {
							if (!t.length || t[0] instanceof this.Request)
								return e.apply(r, t);
							let [i, o = {}] = t,
								n = new a({ input: i, options: o }, e, r);
							return (
								this.emit("request", n),
								n.intercepted
									? n.returnValue
									: n.target.call(n.that, n.data.input, n.data.options)
							);
						}),
						this.ctx.override(
							this.window,
							"Request",
							(e, r, t) => {
								if (!t.length) return new e(...t);
								let [i, o = {}] = t,
									n = new a({ input: i, options: o }, e);
								return (
									this.emit("request", n),
									n.intercepted
										? n.returnValue
										: new n.target(n.data.input, n.data.options)
								);
							},
							!0
						),
						!0)
					: !1;
			}
			overrideUrl() {
				return (
					this.ctx.overrideDescriptor(this.reqProto, "url", {
						get: (e, r) => {
							let t = new a({ value: e.call(r) }, e, r);
							return (
								this.emit("requestUrl", t),
								t.intercepted ? t.returnValue : t.data.value
							);
						},
					}),
					this.ctx.overrideDescriptor(this.resProto, "url", {
						get: (e, r) => {
							let t = new a({ value: e.call(r) }, e, r);
							return (
								this.emit("responseUrl", t),
								t.intercepted ? t.returnValue : t.data.value
							);
						},
					}),
					!0
				);
			}
			overrideHeaders() {
				return this.Headers
					? (this.ctx.overrideDescriptor(this.reqProto, "headers", {
							get: (e, r) => {
								let t = new a({ value: e.call(r) }, e, r);
								return (
									this.emit("requestHeaders", t),
									t.intercepted ? t.returnValue : t.data.value
								);
							},
						}),
						this.ctx.overrideDescriptor(this.resProto, "headers", {
							get: (e, r) => {
								let t = new a({ value: e.call(r) }, e, r);
								return (
									this.emit("responseHeaders", t),
									t.intercepted ? t.returnValue : t.data.value
								);
							},
						}),
						this.ctx.override(this.headersProto, "get", (e, r, [t]) => {
							if (!t) return e.call(r);
							let i = new a({ name: t, value: e.call(r, t) }, e, r);
							return (
								this.emit("getHeader", i),
								i.intercepted ? i.returnValue : i.data.value
							);
						}),
						this.ctx.override(this.headersProto, "set", (e, r, t) => {
							if (2 > t.length) return e.apply(r, t);
							let [i, o] = t,
								n = new a({ name: i, value: o }, e, r);
							return (
								this.emit("setHeader", n),
								n.intercepted
									? n.returnValue
									: n.target.call(n.that, n.data.name, n.data.value)
							);
						}),
						this.ctx.override(this.headersProto, "has", (e, r, t) => {
							if (!t.length) return e.call(r);
							let [i] = t,
								o = new a({ name: i, value: e.call(r, i) }, e, r);
							return (
								this.emit("hasHeader", o),
								o.intercepted ? o.returnValue : o.data
							);
						}),
						this.ctx.override(this.headersProto, "append", (e, r, t) => {
							if (2 > t.length) return e.apply(r, t);
							let [i, o] = t,
								n = new a({ name: i, value: o }, e, r);
							return (
								this.emit("appendHeader", n),
								n.intercepted
									? n.returnValue
									: n.target.call(n.that, n.data.name, n.data.value)
							);
						}),
						this.ctx.override(this.headersProto, "delete", (e, r, t) => {
							if (!t.length) return e.apply(r, t);
							let [i] = t,
								o = new a({ name: i }, e, r);
							return (
								this.emit("deleteHeader", o),
								o.intercepted
									? o.returnValue
									: o.target.call(o.that, o.data.name)
							);
						}),
						!0)
					: !1;
			}
		},
		Pe = I;
	var be = f(p(), 1);
	var T = class extends be.default {
			constructor(e) {
				super(),
					(this.ctx = e),
					(this.window = e.window),
					(this.XMLHttpRequest = this.window.XMLHttpRequest),
					(this.xhrProto = this.window.XMLHttpRequest
						? this.window.XMLHttpRequest.prototype
						: {}),
					(this.open = this.xhrProto.open),
					(this.abort = this.xhrProto.abort),
					(this.send = this.xhrProto.send),
					(this.overrideMimeType = this.xhrProto.overrideMimeType),
					(this.getAllResponseHeaders = this.xhrProto.getAllResponseHeaders),
					(this.getResponseHeader = this.xhrProto.getResponseHeader),
					(this.setRequestHeader = this.xhrProto.setRequestHeader),
					(this.responseURL = e.nativeMethods.getOwnPropertyDescriptor(
						this.xhrProto,
						"responseURL"
					)),
					(this.responseText = e.nativeMethods.getOwnPropertyDescriptor(
						this.xhrProto,
						"responseText"
					));
			}
			override() {
				this.overrideOpen(),
					this.overrideSend(),
					this.overrideMimeType(),
					this.overrideGetResHeader(),
					this.overrideGetResHeaders(),
					this.overrideSetReqHeader();
			}
			overrideOpen() {
				this.ctx.override(this.xhrProto, "open", (e, r, t) => {
					if (2 > t.length) return e.apply(r, t);
					let [i, o, n = !0, h = null, c = null] = t,
						u = new a(
							{ method: i, input: o, async: n, user: h, password: c },
							e,
							r
						);
					return (
						this.emit("open", u),
						u.intercepted
							? u.returnValue
							: u.target.call(
									u.that,
									u.data.method,
									u.data.input,
									u.data.async,
									u.data.user,
									u.data.password
								)
					);
				});
			}
			overrideResponseUrl() {
				this.ctx.overrideDescriptor(this.xhrProto, "responseURL", {
					get: (e, r) => {
						let t = new a({ value: e.call(r) }, e, r);
						return (
							this.emit("responseUrl", t),
							t.intercepted ? t.returnValue : t.data.value
						);
					},
				});
			}
			overrideSend() {
				this.ctx.override(this.xhrProto, "send", (e, r, [t = null]) => {
					let i = new a({ body: t }, e, r);
					return (
						this.emit("send", i),
						i.intercepted ? i.returnValue : i.target.call(i.that, i.data.body)
					);
				});
			}
			overrideSetReqHeader() {
				this.ctx.override(this.xhrProto, "setRequestHeader", (e, r, t) => {
					if (2 > t.length) return e.apply(r, t);
					let [i, o] = t,
						n = new a({ name: i, value: o }, e, r);
					return (
						this.emit("setReqHeader", n),
						n.intercepted
							? n.returnValue
							: n.target.call(n.that, n.data.name, n.data.value)
					);
				});
			}
			overrideGetResHeaders() {
				this.ctx.override(this.xhrProto, "getAllResponseHeaders", (e, r) => {
					let t = new a({ value: e.call(r) }, e, r);
					return (
						this.emit("getAllResponseHeaders", t),
						t.intercepted ? t.returnValue : t.data.value
					);
				});
			}
			overrideGetResHeader() {
				this.ctx.override(this.xhrProto, "getResponseHeader", (e, r, t) => {
					if (!t.length) return e.apply(r, t);
					let [i] = t,
						o = new a({ name: i, value: e.call(r, i) }, e, r);
					return o.intercepted ? o.returnValue : o.data.value;
				});
			}
		},
		xe = T;
	var Se = f(p(), 1);
	var H = class extends Se.default {
			constructor(e) {
				super(),
					(this.ctx = e),
					(this.window = e.window),
					(this.EventSource = this.window.EventSource || {}),
					(this.esProto = this.EventSource.prototype || {}),
					(this.url = e.nativeMethods.getOwnPropertyDescriptor(
						this.esProto,
						"url"
					)),
					(this.CONNECTING = 0),
					(this.OPEN = 1),
					(this.CLOSED = 2);
			}
			overrideConstruct() {
				this.ctx.override(
					this.window,
					"EventSource",
					(e, r, t) => {
						if (!t.length) return new e(...t);
						let [i, o = {}] = t,
							n = new a({ url: i, config: o }, e, r);
						return (
							this.emit("construct", n),
							n.intercepted
								? n.returnValue
								: new n.target(n.data.url, n.data.config)
						);
					},
					!0
				),
					"EventSource" in this.window &&
						((this.window.EventSource.CONNECTING = this.CONNECTING),
						(this.window.EventSource.OPEN = this.OPEN),
						(this.window.EventSource.CLOSED = this.CLOSED));
			}
			overrideUrl() {
				this.ctx.overrideDescriptor(this.esProto, "url", {
					get: (e, r) => {
						let t = new a({ value: e.call(r) }, e, r);
						return this.emit("url", t), t.data.value;
					},
				});
			}
		},
		Oe = H;
	var Ee = f(p(), 1);
	var A = class extends Ee.default {
			constructor(e) {
				super(),
					(this.ctx = e),
					(this.window = this.ctx.window),
					(this.History = this.window.History),
					(this.history = this.window.history),
					(this.historyProto = this.History ? this.History.prototype : {}),
					(this.pushState = this.historyProto.pushState),
					(this.replaceState = this.historyProto.replaceState),
					(this.go = this.historyProto.go),
					(this.back = this.historyProto.back),
					(this.forward = this.historyProto.forward);
			}
			override() {
				this.overridePushState(),
					this.overrideReplaceState(),
					this.overrideGo(),
					this.overrideForward(),
					this.overrideBack();
			}
			overridePushState() {
				this.ctx.override(this.historyProto, "pushState", (e, r, t) => {
					if (2 > t.length) return e.apply(r, t);
					let [i, o, n = ""] = t,
						h = new a({ state: i, title: o, url: n }, e, r);
					return (
						this.emit("pushState", h),
						h.intercepted
							? h.returnValue
							: h.target.call(h.that, h.data.state, h.data.title, h.data.url)
					);
				});
			}
			overrideReplaceState() {
				this.ctx.override(this.historyProto, "replaceState", (e, r, t) => {
					if (2 > t.length) return e.apply(r, t);
					let [i, o, n = ""] = t,
						h = new a({ state: i, title: o, url: n }, e, r);
					return (
						this.emit("replaceState", h),
						h.intercepted
							? h.returnValue
							: h.target.call(h.that, h.data.state, h.data.title, h.data.url)
					);
				});
			}
			overrideGo() {
				this.ctx.override(this.historyProto, "go", (e, r, [t]) => {
					let i = new a({ delta: t }, e, r);
					return (
						this.emit("go", i),
						i.intercepted ? i.returnValue : i.target.call(i.that, i.data.delta)
					);
				});
			}
			overrideForward() {
				this.ctx.override(this.historyProto, "forward", (e, r) => {
					let t = new a(null, e, r);
					return (
						this.emit("forward", t),
						t.intercepted ? t.returnValue : t.target.call(t.that)
					);
				});
			}
			overrideBack() {
				this.ctx.override(this.historyProto, "back", (e, r) => {
					let t = new a(null, e, r);
					return (
						this.emit("back", t),
						t.intercepted ? t.returnValue : t.target.call(t.that)
					);
				});
			}
		},
		Me = A;
	var ke = f(p(), 1),
		U = class extends ke.default {
			constructor(e) {
				super(),
					(this.ctx = e),
					(this.window = e.window),
					(this.location = this.window.location),
					(this.WorkerLocation = this.ctx.worker
						? this.window.WorkerLocation
						: null),
					(this.workerLocProto = this.WorkerLocation
						? this.WorkerLocation.prototype
						: {}),
					(this.keys = [
						"href",
						"protocol",
						"host",
						"hostname",
						"port",
						"pathname",
						"search",
						"hash",
						"origin",
					]),
					(this.HashChangeEvent = this.window.HashChangeEvent || null),
					(this.href = this.WorkerLocation
						? e.nativeMethods.getOwnPropertyDescriptor(
								this.workerLocProto,
								"href"
							)
						: e.nativeMethods.getOwnPropertyDescriptor(this.location, "href"));
			}
			overrideWorkerLocation(e) {
				if (!this.WorkerLocation) return !1;
				let r = this;
				for (let t of this.keys)
					this.ctx.overrideDescriptor(this.workerLocProto, t, {
						get: () => e(r.href.get.call(this.location))[t],
					});
				return !0;
			}
			emulate(e, r) {
				let t = {},
					i = this;
				for (let o of i.keys)
					this.ctx.nativeMethods.defineProperty(t, o, {
						get() {
							return e(i.href.get.call(i.location))[o];
						},
						set:
							o !== "origin"
								? function (n) {
										switch (o) {
											case "href":
												i.location.href = r(n);
												break;
											case "hash":
												i.emit(
													"hashchange",
													t.href,
													n.trim().startsWith("#")
														? new URL(n.trim(), t.href).href
														: new URL("#" + n.trim(), t.href).href,
													i
												);
												break;
											default:
												{
													let h = new URL(t.href);
													(h[o] = n), (i.location.href = r(h.href));
												}
												break;
										}
									}
								: void 0,
						configurable: !1,
						enumerable: !0,
					});
				return (
					"reload" in this.location &&
						this.ctx.nativeMethods.defineProperty(t, "reload", {
							value: this.ctx.wrap(this.location, "reload", (o, n) =>
								o.call(n === t ? this.location : n)
							),
							writable: !1,
							enumerable: !0,
						}),
					"replace" in this.location &&
						this.ctx.nativeMethods.defineProperty(t, "replace", {
							value: this.ctx.wrap(this.location, "assign", (o, n, h) => {
								(!h.length || n !== t) && o.call(n), (n = this.location);
								let [c] = h,
									u = new URL(c, t.href);
								return o.call(n === t ? this.location : n, r(u.href));
							}),
							writable: !1,
							enumerable: !0,
						}),
					"assign" in this.location &&
						this.ctx.nativeMethods.defineProperty(t, "assign", {
							value: this.ctx.wrap(this.location, "assign", (o, n, h) => {
								(!h.length || n !== t) && o.call(n), (n = this.location);
								let [c] = h,
									u = new URL(c, t.href);
								return o.call(n === t ? this.location : n, r(u.href));
							}),
							writable: !1,
							enumerable: !0,
						}),
					"ancestorOrigins" in this.location &&
						this.ctx.nativeMethods.defineProperty(t, "ancestorOrigins", {
							get() {
								let o = [];
								return (
									i.window.DOMStringList &&
										i.ctx.nativeMethods.setPrototypeOf(
											o,
											i.window.DOMStringList.prototype
										),
									o
								);
							},
							set: void 0,
							enumerable: !0,
						}),
					this.ctx.nativeMethods.defineProperty(t, "toString", {
						value: this.ctx.wrap(this.location, "toString", () => t.href),
						enumerable: !0,
						writable: !1,
					}),
					this.ctx.nativeMethods.defineProperty(t, Symbol.toPrimitive, {
						value: () => t.href,
						writable: !1,
						enumerable: !1,
					}),
					this.ctx.window.Location &&
						this.ctx.nativeMethods.setPrototypeOf(
							t,
							this.ctx.window.Location.prototype
						),
					t
				);
			}
		},
		Le = U;
	var Ne = f(p(), 1);
	var W = class extends Ne.default {
			constructor(e) {
				super(),
					(this.ctx = e),
					(this.window = this.ctx.window),
					(this.postMessage = this.window.postMessage),
					(this.MessageEvent = this.window.MessageEvent || {}),
					(this.MessagePort = this.window.MessagePort || {}),
					(this.mpProto = this.MessagePort.prototype || {}),
					(this.mpPostMessage = this.mpProto.postMessage),
					(this.messageProto = this.MessageEvent.prototype || {}),
					(this.messageData = e.nativeMethods.getOwnPropertyDescriptor(
						this.messageProto,
						"data"
					)),
					(this.messageOrigin = e.nativeMethods.getOwnPropertyDescriptor(
						this.messageProto,
						"origin"
					));
			}
			overridePostMessage() {
				this.ctx.override(this.window, "postMessage", (e, r, t) => {
					if (!t.length) return e.apply(r, t);
					let i, o, n;
					this.ctx.worker ? ([i, n = []] = t) : ([i, o, n = []] = t);
					let h = new a(
						{ message: i, origin: o, transfer: n, worker: this.ctx.worker },
						e,
						r
					);
					return (
						this.emit("postMessage", h),
						h.intercepted
							? h.returnValue
							: this.ctx.worker
								? h.target.call(h.that, h.data.message, h.data.transfer)
								: h.target.call(
										h.that,
										h.data.message,
										h.data.origin,
										h.data.transfer
									)
					);
				});
			}
			wrapPostMessage(e, r, t = !1) {
				return this.ctx.wrap(e, r, (i, o, n) => {
					if (this.ctx.worker ? !n.length : 2 > n) return i.apply(o, n);
					let h, c, u;
					t ? (([h, u = []] = n), (c = null)) : ([h, c, u = []] = n);
					let l = new a(
						{ message: h, origin: c, transfer: u, worker: this.ctx.worker },
						i,
						e
					);
					return (
						this.emit("postMessage", l),
						l.intercepted
							? l.returnValue
							: t
								? l.target.call(l.that, l.data.message, l.data.transfer)
								: l.target.call(
										l.that,
										l.data.message,
										l.data.origin,
										l.data.transfer
									)
					);
				});
			}
			overrideMessageOrigin() {
				this.ctx.overrideDescriptor(this.messageProto, "origin", {
					get: (e, r) => {
						let t = new a({ value: e.call(r) }, e, r);
						return (
							this.emit("origin", t),
							t.intercepted ? t.returnValue : t.data.value
						);
					},
				});
			}
			overrideMessageData() {
				this.ctx.overrideDescriptor(this.messageProto, "data", {
					get: (e, r) => {
						let t = new a({ value: e.call(r) }, e, r);
						return (
							this.emit("data", t), t.intercepted ? t.returnValue : t.data.value
						);
					},
				});
			}
		},
		De = W;
	var Ce = f(p(), 1);
	var j = class extends Ce.default {
			constructor(e) {
				super(),
					(this.ctx = e),
					(this.window = e.window),
					(this.navigator = this.window.navigator),
					(this.Navigator = this.window.Navigator || {}),
					(this.navProto = this.Navigator.prototype || {}),
					(this.sendBeacon = this.navProto.sendBeacon);
			}
			overrideSendBeacon() {
				this.ctx.override(this.navProto, "sendBeacon", (e, r, t) => {
					if (!t.length) return e.apply(r, t);
					let [i, o = ""] = t,
						n = new a({ url: i, data: o }, e, r);
					return (
						this.emit("sendBeacon", n),
						n.intercepted
							? n.returnValue
							: n.target.call(n.that, n.data.url, n.data.data)
					);
				});
			}
		},
		Re = j;
	var Ae = f(p(), 1);
	var qt = globalThis.fetch,
		P = globalThis.WebSocket,
		_t = globalThis.Request,
		ct = globalThis.Response,
		S = globalThis.SharedWorker,
		Ve = globalThis.localStorage,
		ut = globalThis.navigator.serviceWorker,
		v = {
			prototype: { send: P.prototype.send },
			CLOSED: P.CLOSED,
			CLOSING: P.CLOSING,
			CONNECTING: P.CONNECTING,
			OPEN: P.OPEN,
		};
	async function _() {
		let s = (
				await self.clients.matchAll({ type: "window", includeUncontrolled: !0 })
			).map(async (r) => {
				let t = await (function (i) {
					let o = new MessageChannel();
					return new Promise((n) => {
						i.postMessage({ type: "getPort", port: o.port2 }, [o.port2]),
							(o.port1.onmessage = (h) => {
								n(h.data);
							});
					});
				})(r);
				return await He(t), t;
			}),
			e = Promise.race([
				Promise.any(s),
				new Promise((r, t) => setTimeout(t, 1e3, new TypeError("timeout"))),
			]);
		try {
			return await e;
		} catch (r) {
			if (r instanceof AggregateError)
				throw (
					(console.error(
						"bare-mux: failed to get a bare-mux SharedWorker MessagePort as all clients returned an invalid MessagePort."
					),
					new Error("All clients returned an invalid MessagePort."))
				);
			return (
				console.warn(
					"bare-mux: failed to get a bare-mux SharedWorker MessagePort within 1s, retrying"
				),
				await _()
			);
		}
	}
	function He(s) {
		let e = new MessageChannel(),
			r = new Promise((t, i) => {
				(e.port1.onmessage = (o) => {
					o.data.type === "pong" && t();
				}),
					setTimeout(i, 1500);
			});
		return (
			s.postMessage({ message: { type: "ping" }, port: e.port2 }, [e.port2]), r
		);
	}
	function Ie(s, e) {
		let r = new S(s, "bare-mux-worker");
		return (
			e &&
				ut.addEventListener("message", (t) => {
					if (t.data.type === "getPort" && t.data.port) {
						console.debug("bare-mux: recieved request for port from sw");
						let i = new S(s, "bare-mux-worker");
						t.data.port.postMessage(i.port, [i.port]);
					}
				}),
			r.port
		);
	}
	var q = null;
	function dt() {
		if (q === null) {
			let s = new MessageChannel(),
				e = new ReadableStream(),
				r;
			try {
				s.port1.postMessage(e, [e]), (r = !0);
			} catch {
				r = !1;
			}
			return (q = r), r;
		}
		return q;
	}
	var F = class {
			constructor(e) {
				(this.channel = new BroadcastChannel("bare-mux")),
					e instanceof MessagePort || e instanceof Promise
						? (this.port = e)
						: this.createChannel(e, !0);
			}
			createChannel(e, r) {
				if (self.clients)
					(this.port = _()),
						(this.channel.onmessage = (t) => {
							t.data.type === "refreshPort" && (this.port = _());
						});
				else if (e && S) {
					if (!e.startsWith("/") && !e.includes("://"))
						throw new Error(
							"Invalid URL. Must be absolute or start at the root."
						);
					(this.port = Ie(e, r)),
						console.debug("bare-mux: setting localStorage bare-mux-path to", e),
						(Ve["bare-mux-path"] = e);
				} else {
					if (!S)
						throw new Error("Unable to get a channel to the SharedWorker.");
					{
						let t = Ve["bare-mux-path"];
						if (
							(console.debug("bare-mux: got localStorage bare-mux-path:", t),
							!t)
						)
							throw new Error(
								"Unable to get bare-mux workerPath from localStorage."
							);
						this.port = Ie(t, r);
					}
				}
			}
			async sendMessage(e, r) {
				this.port instanceof Promise && (this.port = await this.port);
				try {
					await He(this.port);
				} catch {
					return (
						console.warn(
							"bare-mux: Failed to get a ping response from the worker within 1.5s. Assuming port is dead."
						),
						this.createChannel(),
						await this.sendMessage(e, r)
					);
				}
				let t = new MessageChannel(),
					i = [t.port2, ...(r || [])],
					o = new Promise((n, h) => {
						t.port1.onmessage = (c) => {
							let u = c.data;
							u.type === "error" ? h(u.error) : n(u);
						};
					});
				return this.port.postMessage({ message: e, port: t.port2 }, i), await o;
			}
		},
		g = class extends EventTarget {
			constructor(e, r = [], t, i, o) {
				super(),
					(this.protocols = []),
					(this.readyState = v.CONNECTING),
					(this.binaryType = "blob"),
					(this.onopen = null),
					(this.onerror = null),
					(this.onmessage = null),
					(this.onclose = null),
					(this.url = e.toString()),
					(this.protocols = r);
				let n = (l) => {
						(this.readyState = v.OPEN),
							(this.protocols = l),
							(this.meta = { headers: { "sec-websocket-protocol": l } });
						let w = new Event("open");
						this.dispatchEvent(w), this.onopen && this.onopen(w);
					},
					h = async (l) => {
						typeof l == "string" ||
							("byteLength" in l
								? this.binaryType === "blob"
									? (l = new Blob([l]))
									: Object.setPrototypeOf(l, o)
								: "arrayBuffer" in l &&
									this.binaryType === "arraybuffer" &&
									((l = await l.arrayBuffer()), Object.setPrototypeOf(l, o)));
						let w = new MessageEvent("message", { data: l });
						this.dispatchEvent(w), this.onmessage && this.onmessage(w);
					},
					c = (l, w) => {
						this.readyState = v.CLOSED;
						let m = new CloseEvent("close", { code: l, reason: w });
						this.dispatchEvent(m), this.onclose && this.onclose(m);
					},
					u = () => {
						this.readyState = v.CLOSED;
						let l = new Event("error");
						this.dispatchEvent(l), this.onerror && this.onerror(l);
					};
				(this.channel = new MessageChannel()),
					(this.channel.port1.onmessage = (l) => {
						l.data.type === "open"
							? n(l.data.args[0])
							: l.data.type === "message"
								? h(l.data.args[0])
								: l.data.type === "close"
									? c(l.data.args[0], l.data.args[1])
									: l.data.type === "error" && u();
					}),
					t.sendMessage(
						{
							type: "websocket",
							websocket: {
								url: e.toString(),
								origin,
								protocols: r,
								requestHeaders: i,
								channel: this.channel.port2,
							},
						},
						[this.channel.port2]
					);
			}
			send(...e) {
				if (this.readyState === v.CONNECTING)
					throw new DOMException(
						"Failed to execute 'send' on 'WebSocket': Still in CONNECTING state."
					);
				let r = e[0];
				r.buffer &&
					(r = r.buffer.slice(r.byteOffset, r.byteOffset + r.byteLength)),
					this.channel.port1.postMessage(
						{ type: "data", data: r },
						r instanceof ArrayBuffer ? [r] : []
					);
			}
			close(e, r) {
				(this.readyState = v.CLOSING),
					this.channel.port1.postMessage({
						type: "close",
						closeCode: e,
						closeReason: r,
					});
			}
			get bufferedAmount() {
				return 0;
			}
			get protocol() {
				return Array.isArray(this.protocols)
					? this.protocols[0] || ""
					: this.protocols || "";
			}
			get extensions() {
				return "";
			}
		};
	function Te(s, e, r) {
		console.error(`error while processing '${r}': `, e),
			s.postMessage({ type: "error", error: e });
	}
	(g.prototype.CONNECTING = v.CONNECTING),
		(g.prototype.OPEN = v.OPEN),
		(g.prototype.CLOSING = v.CLOSING),
		(g.prototype.CLOSED = v.CLOSED);
	var O = class {
		constructor(e) {
			this.worker = new F(e);
		}
		async getTransport() {
			return (await this.worker.sendMessage({ type: "get" })).name;
		}
		async setTransport(e, r, t) {
			await this.setManualTransport(
				`
			const { default: BareTransport } = await import("${e}");
			return [BareTransport, "${e}"];
		`,
				r,
				t
			);
		}
		async setManualTransport(e, r, t) {
			if (e === "bare-mux-remote") throw new Error("Use setRemoteTransport.");
			await this.worker.sendMessage(
				{ type: "set", client: { function: e, args: r } },
				t
			);
		}
		async setRemoteTransport(e, r) {
			let t = new MessageChannel();
			(t.port1.onmessage = async (i) => {
				let o = i.data.port,
					n = i.data.message;
				if (n.type === "fetch")
					try {
						e.ready || (await e.init()),
							await (async function (h, c, u) {
								let l = await u.request(
									new URL(h.fetch.remote),
									h.fetch.method,
									h.fetch.body,
									h.fetch.headers,
									null
								);
								if (!dt() && l.body instanceof ReadableStream) {
									let w = new ct(l.body);
									l.body = await w.arrayBuffer();
								}
								l.body instanceof ReadableStream ||
								l.body instanceof ArrayBuffer
									? c.postMessage({ type: "fetch", fetch: l }, [l.body])
									: c.postMessage({ type: "fetch", fetch: l });
							})(n, o, e);
					} catch (h) {
						Te(o, h, "fetch");
					}
				else if (n.type === "websocket")
					try {
						e.ready || (await e.init()),
							await (async function (h, c, u) {
								let [l, w] = u.connect(
									new URL(h.websocket.url),
									h.websocket.origin,
									h.websocket.protocols,
									h.websocket.requestHeaders,
									(m) => {
										h.websocket.channel.postMessage({
											type: "open",
											args: [m],
										});
									},
									(m) => {
										m instanceof ArrayBuffer
											? h.websocket.channel.postMessage(
													{ type: "message", args: [m] },
													[m]
												)
											: h.websocket.channel.postMessage({
													type: "message",
													args: [m],
												});
									},
									(m, ze) => {
										h.websocket.channel.postMessage({
											type: "close",
											args: [m, ze],
										});
									},
									(m) => {
										h.websocket.channel.postMessage({
											type: "error",
											args: [m],
										});
									}
								);
								(h.websocket.channel.onmessage = (m) => {
									m.data.type === "data"
										? l(m.data.data)
										: m.data.type === "close" &&
											w(m.data.closeCode, m.data.closeReason);
								}),
									c.postMessage({ type: "websocket" });
							})(n, o, e);
					} catch (h) {
						Te(o, h, "websocket");
					}
			}),
				await this.worker.sendMessage(
					{
						type: "set",
						client: { function: "bare-mux-remote", args: [t.port2, r] },
					},
					[t.port2]
				);
		}
		getInnerPort() {
			return this.worker.port;
		}
	};
	var G = class extends Ae.default {
			constructor(e) {
				super(),
					(this.ctx = e),
					(this.window = e.window),
					(this.Worker = this.window.Worker || {}),
					(this.Worklet = this.window.Worklet || {}),
					(this.workletProto = this.Worklet.prototype || {}),
					(this.workerProto = this.Worker.prototype || {}),
					(this.postMessage = this.workerProto.postMessage),
					(this.terminate = this.workerProto.terminate),
					(this.addModule = this.workletProto.addModule);
			}
			overrideWorker() {
				this.ctx.override(
					this.window,
					"Worker",
					(e, r, t) => {
						if (!t.length) return new e(...t);
						let [i, o = {}] = t,
							n = new a({ url: i, options: o }, e, r);
						if ((this.emit("worker", n), n.intercepted)) return n.returnValue;
						let h = new n.target(n.data.url, n.data.options),
							c = new O();
						return (
							(async () => {
								let u = await c.getInnerPort();
								h.postMessage({ __uv$type: "baremuxinit", port: u }, [u]);
							})(),
							h
						);
					},
					!0
				);
			}
			overrideAddModule() {
				this.ctx.override(this.workletProto, "addModule", (e, r, t) => {
					if (!t.length) return e.apply(r, t);
					let [i, o = {}] = t,
						n = new a({ url: i, options: o }, e, r);
					return (
						this.emit("addModule", n),
						n.intercepted
							? n.returnValue
							: n.target.call(n.that, n.data.url, n.data.options)
					);
				});
			}
			overridePostMessage() {
				this.ctx.override(this.workerProto, "postMessage", (e, r, t) => {
					if (!t.length) return e.apply(r, t);
					let [i, o = []] = t,
						n = new a({ message: i, transfer: o }, e, r);
					return (
						this.emit("postMessage", n),
						n.intercepted
							? n.returnValue
							: n.target.call(n.that, n.data.message, n.data.transfer)
					);
				});
			}
			overrideImportScripts() {
				this.ctx.override(this.window, "importScripts", (e, r, t) => {
					if (!t.length) return e.apply(r, t);
					let i = new a({ scripts: t }, e, r);
					return (
						this.emit("importScripts", i),
						i.intercepted
							? i.returnValue
							: i.target.apply(i.that, i.data.scripts)
					);
				});
			}
		},
		Ue = G;
	var We = f(p(), 1);
	var B = class extends We.default {
			constructor(e) {
				super(),
					(this.ctx = e),
					(this.window = this.ctx.window),
					(this.URL = this.window.URL || {}),
					(this.createObjectURL = this.URL.createObjectURL),
					(this.revokeObjectURL = this.URL.revokeObjectURL);
			}
			overrideObjectURL() {
				this.ctx.override(this.URL, "createObjectURL", (e, r, t) => {
					if (!t.length) return e.apply(r, t);
					let [i] = t,
						o = new a({ object: i }, e, r);
					return (
						this.emit("createObjectURL", o),
						o.intercepted ? o.returnValue : o.target.call(o.that, o.data.object)
					);
				}),
					this.ctx.override(this.URL, "revokeObjectURL", (e, r, t) => {
						if (!t.length) return e.apply(r, t);
						let [i] = t,
							o = new a({ url: i }, e, r);
						return (
							this.emit("revokeObjectURL", o),
							o.intercepted ? o.returnValue : o.target.call(o.that, o.data.url)
						);
					});
			}
		},
		je = B;
	var Qe = f(p(), 1);
	var qe = f(p(), 1);
	var $ = class extends qe.default {
			constructor(e) {
				super(),
					(this.ctx = e),
					(this.window = e.window),
					(this.localStorage = this.window.localStorage || null),
					(this.sessionStorage = this.window.sessionStorage || null),
					(this.Storage = this.window.Storage || {}),
					(this.storeProto = this.Storage.prototype || {}),
					(this.getItem = this.storeProto.getItem || null),
					(this.setItem = this.storeProto.setItem || null),
					(this.removeItem = this.storeProto.removeItem || null),
					(this.clear = this.storeProto.clear || null),
					(this.key = this.storeProto.key || null),
					(this.methods = ["key", "getItem", "setItem", "removeItem", "clear"]),
					(this.wrappers = new e.nativeMethods.Map());
			}
			overrideMethods() {
				this.ctx.override(this.storeProto, "getItem", (e, r, t) => {
					if (!t.length) return e.apply(this.wrappers.get(r) || r, t);
					let [i] = t,
						o = new a({ name: i }, e, this.wrappers.get(r) || r);
					return (
						this.emit("getItem", o),
						o.intercepted ? o.returnValue : o.target.call(o.that, o.data.name)
					);
				}),
					this.ctx.override(this.storeProto, "setItem", (e, r, t) => {
						if (2 > t.length) return e.apply(this.wrappers.get(r) || r, t);
						let [i, o] = t,
							n = new a({ name: i, value: o }, e, this.wrappers.get(r) || r);
						return (
							this.emit("setItem", n),
							n.intercepted
								? n.returnValue
								: n.target.call(n.that, n.data.name, n.data.value)
						);
					}),
					this.ctx.override(this.storeProto, "removeItem", (e, r, t) => {
						if (!t.length) return e.apply(this.wrappers.get(r) || r, t);
						let [i] = t,
							o = new a({ name: i }, e, this.wrappers.get(r) || r);
						return (
							this.emit("removeItem", o),
							o.intercepted ? o.returnValue : o.target.call(o.that, o.data.name)
						);
					}),
					this.ctx.override(this.storeProto, "clear", (e, r) => {
						let t = new a(null, e, this.wrappers.get(r) || r);
						return (
							this.emit("clear", t),
							t.intercepted ? t.returnValue : t.target.call(t.that)
						);
					}),
					this.ctx.override(this.storeProto, "key", (e, r, t) => {
						if (!t.length) return e.apply(this.wrappers.get(r) || r, t);
						let [i] = t,
							o = new a({ index: i }, e, this.wrappers.get(r) || r);
						return (
							this.emit("key", o),
							o.intercepted
								? o.returnValue
								: o.target.call(o.that, o.data.index)
						);
					});
			}
			overrideLength() {
				this.ctx.overrideDescriptor(this.storeProto, "length", {
					get: (e, r) => {
						let t = new a(
							{ length: e.call(this.wrappers.get(r) || r) },
							e,
							this.wrappers.get(r) || r
						);
						return (
							this.emit("length", t),
							t.intercepted ? t.returnValue : t.data.length
						);
					},
				});
			}
			emulate(e, r = {}) {
				this.ctx.nativeMethods.setPrototypeOf(r, this.storeProto);
				let t = new this.ctx.window.Proxy(r, {
					get: (i, o) => {
						if (o in this.storeProto || typeof o == "symbol") return e[o];
						let n = new a({ name: o }, null, e);
						return (
							this.emit("get", n),
							n.intercepted ? n.returnValue : e[n.data.name]
						);
					},
					set: (i, o, n) => {
						if (o in this.storeProto || typeof o == "symbol") return (e[o] = n);
						let h = new a({ name: o, value: n }, null, e);
						return (
							this.emit("set", h),
							h.intercepted ? h.returnValue : (e[h.data.name] = h.data.value)
						);
					},
					deleteProperty: (i, o) => {
						if (typeof o == "symbol") return delete e[o];
						let n = new a({ name: o }, null, e);
						return (
							this.emit("delete", n),
							n.intercepted ? n.returnValue : delete e[n.data.name]
						);
					},
				});
				return (
					this.wrappers.set(t, e),
					this.ctx.nativeMethods.setPrototypeOf(t, this.storeProto),
					t
				);
			}
		},
		_e = $;
	var Fe = f(p(), 1);
	var K = class extends Fe.default {
			constructor(e) {
				super(),
					(this.ctx = e),
					(this.window = e.window),
					(this.CSSStyleDeclaration = this.window.CSSStyleDeclaration || {}),
					(this.cssStyleProto = this.CSSStyleDeclaration.prototype || {}),
					(this.getPropertyValue = this.cssStyleProto.getPropertyValue || null),
					(this.setProperty = this.cssStyleProto.setProperty || null),
					this.cssText -
						e.nativeMethods.getOwnPropertyDescriptors(
							this.cssStyleProto,
							"cssText"
						),
					(this.urlProps = [
						"background",
						"backgroundImage",
						"borderImage",
						"borderImageSource",
						"listStyle",
						"listStyleImage",
						"cursor",
					]),
					(this.dashedUrlProps = [
						"background",
						"background-image",
						"border-image",
						"border-image-source",
						"list-style",
						"list-style-image",
						"cursor",
					]),
					(this.propToDashed = {
						background: "background",
						backgroundImage: "background-image",
						borderImage: "border-image",
						borderImageSource: "border-image-source",
						listStyle: "list-style",
						listStyleImage: "list-style-image",
						cursor: "cursor",
					});
			}
			overrideSetGetProperty() {
				this.ctx.override(this.cssStyleProto, "getPropertyValue", (e, r, t) => {
					if (!t.length) return e.apply(r, t);
					let [i] = t,
						o = new a({ property: i }, e, r);
					return (
						this.emit("getPropertyValue", o),
						o.intercepted
							? o.returnValue
							: o.target.call(o.that, o.data.property)
					);
				}),
					this.ctx.override(this.cssStyleProto, "setProperty", (e, r, t) => {
						if (2 > t.length) return e.apply(r, t);
						let [i, o] = t,
							n = new a({ property: i, value: o }, e, r);
						return (
							this.emit("setProperty", n),
							n.intercepted
								? n.returnValue
								: n.target.call(n.that, n.data.property, n.data.value)
						);
					});
			}
			overrideCssText() {
				this.ctx.overrideDescriptor(this.cssStyleProto, "cssText", {
					get: (e, r) => {
						let t = new a({ value: e.call(r) }, e, r);
						return (
							this.emit("getCssText", t),
							t.intercepted ? t.returnValue : t.data.value
						);
					},
					set: (e, r, [t]) => {
						let i = new a({ value: t }, e, r);
						return (
							this.emit("setCssText", i),
							i.intercepted
								? i.returnValue
								: i.target.call(i.that, i.data.value)
						);
					},
				});
			}
		},
		Ge = K;
	var Be = f(p(), 1);
	var X = class extends Be.default {
			constructor(e) {
				super(),
					(this.ctx = e),
					(this.window = this.ctx.window),
					(this.IDBDatabase = this.window.IDBDatabase || {}),
					(this.idbDatabaseProto = this.IDBDatabase.prototype || {}),
					(this.IDBFactory = this.window.IDBFactory || {}),
					(this.idbFactoryProto = this.IDBFactory.prototype || {}),
					(this.open = this.idbFactoryProto.open);
			}
			overrideOpen() {
				this.ctx.override(this.IDBFactory.prototype, "open", (e, r, t) => {
					if (!t.length || !t.length) return e.apply(r, t);
					let [i, o] = t,
						n = new a({ name: i, version: o }, e, r);
					return (
						this.emit("idbFactoryOpen", n),
						n.intercepted
							? n.returnValue
							: n.target.call(n.that, n.data.name, n.data.version)
					);
				});
			}
			overrideName() {
				this.ctx.overrideDescriptor(this.idbDatabaseProto, "name", {
					get: (e, r) => {
						let t = new a({ value: e.call(r) }, e, r);
						return (
							this.emit("idbFactoryName", t),
							t.intercepted ? t.returnValue : t.data.value
						);
					},
				});
			}
		},
		$e = X;
	var Ke = f(p(), 1);
	var Q = class extends Ke.default {
			constructor(e) {
				super(),
					(this.ctx = e),
					(this.window = e.window),
					(this.WebSocket = this.window.WebSocket || {}),
					(this.CONNECTING = WebSocket.CONNECTING),
					(this.OPEN = WebSocket.OPEN),
					(this.CLOSING = WebSocket.CLOSING),
					(this.CLOSED = WebSocket.CLOSED);
			}
			overrideWebSocket() {
				this.ctx.override(
					this.window,
					"WebSocket",
					(e, r, t) => {
						if (!t.length) return new e(...t);
						let i = new a({ args: t }, e, r);
						return (
							this.emit("websocket", i),
							i.intercepted
								? i.returnValue
								: new i.target(i.data.url, i.data.protocols)
						);
					},
					!0
				),
					(this.window.WebSocket.CONNECTING = this.CONNECTING),
					(this.window.WebSocket.OPEN = this.OPEN),
					(this.window.WebSocket.CLOSING = this.CLOSING),
					(this.window.WebSocket.CLOSED = this.CLOSED);
			}
		},
		Xe = Q;
	var E = class extends Qe.default {
			constructor(e = self, r, t = !e.window) {
				super(),
					(this.window = e),
					(this.nativeMethods = {
						fnToString: this.window.Function.prototype.toString,
						defineProperty: this.window.Object.defineProperty,
						getOwnPropertyDescriptor:
							this.window.Object.getOwnPropertyDescriptor,
						getOwnPropertyDescriptors:
							this.window.Object.getOwnPropertyDescriptors,
						getOwnPropertyNames: this.window.Object.getOwnPropertyNames,
						keys: this.window.Object.keys,
						getOwnPropertySymbols: this.window.Object.getOwnPropertySymbols,
						isArray: this.window.Array.isArray,
						setPrototypeOf: this.window.Object.setPrototypeOf,
						isExtensible: this.window.Object.isExtensible,
						Map: this.window.Map,
						Proxy: this.window.Proxy,
					}),
					(this.worker = t),
					(this.bareClient = r),
					(this.fetch = new Pe(this)),
					(this.xhr = new xe(this)),
					(this.idb = new $e(this)),
					(this.history = new Me(this)),
					(this.element = new ce(this)),
					(this.node = new de(this)),
					(this.document = new he(this)),
					(this.function = new we(this)),
					(this.object = new ye(this)),
					(this.websocket = new Xe(this)),
					(this.message = new De(this)),
					(this.navigator = new Re(this)),
					(this.eventSource = new Oe(this)),
					(this.attribute = new fe(this)),
					(this.url = new je(this)),
					(this.workers = new Ue(this)),
					(this.location = new Le(this)),
					(this.storage = new _e(this)),
					(this.style = new Ge(this));
			}
			override(e, r, t, i) {
				let o = this.wrap(e, r, t, i);
				return (e[r] = o), o;
			}
			overrideDescriptor(e, r, t = {}) {
				let i = this.wrapDescriptor(e, r, t);
				return i ? (this.nativeMethods.defineProperty(e, r, i), i) : {};
			}
			wrap(e, r, t, i = !1) {
				let o = e[r];
				if (!o) return o;
				let n =
					"prototype" in o
						? function () {
								return t(o, this, [...arguments]);
							}
						: {
								attach() {
									return t(o, this, [...arguments]);
								},
							}.attach;
				return (
					i && ((n.prototype = o.prototype), (n.prototype.constructor = n)),
					this.emit("wrap", o, n, i),
					n
				);
			}
			wrapDescriptor(e, r, t = {}) {
				let i = this.nativeMethods.getOwnPropertyDescriptor(e, r);
				if (!i) return !1;
				for (let o in t)
					o in i &&
						(o === "get" || o === "set"
							? (i[o] = this.wrap(i, o, t[o]))
							: (i[o] = typeof t[o] == "function" ? t[o](i[o]) : t[o]));
				return i;
			}
		},
		xr = E;
	typeof self == "object" && (self.UVClient = E);
})();
//# sourceMappingURL=uv.client.js.map
