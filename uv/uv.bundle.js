(() => {
	var ls = Object.create;
	var Si = Object.defineProperty;
	var fs = Object.getOwnPropertyDescriptor;
	var ds = Object.getOwnPropertyNames;
	var hs = Object.getPrototypeOf,
		Es = Object.prototype.hasOwnProperty;
	var Li = (e, t) => () => (
		t || e((t = { exports: {} }).exports, t), t.exports
	);
	var ms = (e, t, u, i) => {
		if ((t && typeof t == "object") || typeof t == "function")
			for (let n of ds(t))
				!Es.call(e, n) &&
					n !== u &&
					Si(e, n, {
						get: () => t[n],
						enumerable: !(i = fs(t, n)) || i.enumerable,
					});
		return e;
	};
	var Ye = (e, t, u) => (
		(u = e != null ? ls(hs(e)) : {}),
		ms(
			t || !e || !e.__esModule
				? Si(u, "default", { value: e, enumerable: !0 })
				: u,
			e
		)
	);
	var it = Li((J1, hu) => {
		"use strict";
		var Ve = typeof Reflect == "object" ? Reflect : null,
			ki =
				Ve && typeof Ve.apply == "function"
					? Ve.apply
					: function (t, u, i) {
							return Function.prototype.apply.call(t, u, i);
						},
			It;
		Ve && typeof Ve.ownKeys == "function"
			? (It = Ve.ownKeys)
			: Object.getOwnPropertySymbols
				? (It = function (t) {
						return Object.getOwnPropertyNames(t).concat(
							Object.getOwnPropertySymbols(t)
						);
					})
				: (It = function (t) {
						return Object.getOwnPropertyNames(t);
					});
		function Ts(e) {
			console && console.warn && console.warn(e);
		}
		var Pi =
			Number.isNaN ||
			function (t) {
				return t !== t;
			};
		function V() {
			V.init.call(this);
		}
		hu.exports = V;
		hu.exports.once = Cs;
		V.EventEmitter = V;
		V.prototype._events = void 0;
		V.prototype._eventsCount = 0;
		V.prototype._maxListeners = void 0;
		var Ri = 10;
		function St(e) {
			if (typeof e != "function")
				throw new TypeError(
					'The "listener" argument must be of type Function. Received type ' +
						typeof e
				);
		}
		Object.defineProperty(V, "defaultMaxListeners", {
			enumerable: !0,
			get: function () {
				return Ri;
			},
			set: function (e) {
				if (typeof e != "number" || e < 0 || Pi(e))
					throw new RangeError(
						'The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' +
							e +
							"."
					);
				Ri = e;
			},
		});
		V.init = function () {
			(this._events === void 0 ||
				this._events === Object.getPrototypeOf(this)._events) &&
				((this._events = Object.create(null)), (this._eventsCount = 0)),
				(this._maxListeners = this._maxListeners || void 0);
		};
		V.prototype.setMaxListeners = function (t) {
			if (typeof t != "number" || t < 0 || Pi(t))
				throw new RangeError(
					'The value of "n" is out of range. It must be a non-negative number. Received ' +
						t +
						"."
				);
			return (this._maxListeners = t), this;
		};
		function Oi(e) {
			return e._maxListeners === void 0
				? V.defaultMaxListeners
				: e._maxListeners;
		}
		V.prototype.getMaxListeners = function () {
			return Oi(this);
		};
		V.prototype.emit = function (t) {
			for (var u = [], i = 1; i < arguments.length; i++) u.push(arguments[i]);
			var n = t === "error",
				s = this._events;
			if (s !== void 0) n = n && s.error === void 0;
			else if (!n) return !1;
			if (n) {
				var o;
				if ((u.length > 0 && (o = u[0]), o instanceof Error)) throw o;
				var r = new Error(
					"Unhandled error." + (o ? " (" + o.message + ")" : "")
				);
				throw ((r.context = o), r);
			}
			var c = s[t];
			if (c === void 0) return !1;
			if (typeof c == "function") ki(c, this, u);
			else
				for (var h = c.length, T = Fi(c, h), i = 0; i < h; ++i)
					ki(T[i], this, u);
			return !0;
		};
		function yi(e, t, u, i) {
			var n, s, o;
			if (
				(St(u),
				(s = e._events),
				s === void 0
					? ((s = e._events = Object.create(null)), (e._eventsCount = 0))
					: (s.newListener !== void 0 &&
							(e.emit("newListener", t, u.listener ? u.listener : u),
							(s = e._events)),
						(o = s[t])),
				o === void 0)
			)
				(o = s[t] = u), ++e._eventsCount;
			else if (
				(typeof o == "function"
					? (o = s[t] = i ? [u, o] : [o, u])
					: i
						? o.unshift(u)
						: o.push(u),
				(n = Oi(e)),
				n > 0 && o.length > n && !o.warned)
			) {
				o.warned = !0;
				var r = new Error(
					"Possible EventEmitter memory leak detected. " +
						o.length +
						" " +
						String(t) +
						" listeners added. Use emitter.setMaxListeners() to increase limit"
				);
				(r.name = "MaxListenersExceededWarning"),
					(r.emitter = e),
					(r.type = t),
					(r.count = o.length),
					Ts(r);
			}
			return e;
		}
		V.prototype.addListener = function (t, u) {
			return yi(this, t, u, !1);
		};
		V.prototype.on = V.prototype.addListener;
		V.prototype.prependListener = function (t, u) {
			return yi(this, t, u, !0);
		};
		function bs() {
			if (!this.fired)
				return (
					this.target.removeListener(this.type, this.wrapFn),
					(this.fired = !0),
					arguments.length === 0
						? this.listener.call(this.target)
						: this.listener.apply(this.target, arguments)
				);
		}
		function wi(e, t, u) {
			var i = { fired: !1, wrapFn: void 0, target: e, type: t, listener: u },
				n = bs.bind(i);
			return (n.listener = u), (i.wrapFn = n), n;
		}
		V.prototype.once = function (t, u) {
			return St(u), this.on(t, wi(this, t, u)), this;
		};
		V.prototype.prependOnceListener = function (t, u) {
			return St(u), this.prependListener(t, wi(this, t, u)), this;
		};
		V.prototype.removeListener = function (t, u) {
			var i, n, s, o, r;
			if ((St(u), (n = this._events), n === void 0)) return this;
			if (((i = n[t]), i === void 0)) return this;
			if (i === u || i.listener === u)
				--this._eventsCount === 0
					? (this._events = Object.create(null))
					: (delete n[t],
						n.removeListener &&
							this.emit("removeListener", t, i.listener || u));
			else if (typeof i != "function") {
				for (s = -1, o = i.length - 1; o >= 0; o--)
					if (i[o] === u || i[o].listener === u) {
						(r = i[o].listener), (s = o);
						break;
					}
				if (s < 0) return this;
				s === 0 ? i.shift() : As(i, s),
					i.length === 1 && (n[t] = i[0]),
					n.removeListener !== void 0 && this.emit("removeListener", t, r || u);
			}
			return this;
		};
		V.prototype.off = V.prototype.removeListener;
		V.prototype.removeAllListeners = function (t) {
			var u, i, n;
			if (((i = this._events), i === void 0)) return this;
			if (i.removeListener === void 0)
				return (
					arguments.length === 0
						? ((this._events = Object.create(null)), (this._eventsCount = 0))
						: i[t] !== void 0 &&
							(--this._eventsCount === 0
								? (this._events = Object.create(null))
								: delete i[t]),
					this
				);
			if (arguments.length === 0) {
				var s = Object.keys(i),
					o;
				for (n = 0; n < s.length; ++n)
					(o = s[n]), o !== "removeListener" && this.removeAllListeners(o);
				return (
					this.removeAllListeners("removeListener"),
					(this._events = Object.create(null)),
					(this._eventsCount = 0),
					this
				);
			}
			if (((u = i[t]), typeof u == "function")) this.removeListener(t, u);
			else if (u !== void 0)
				for (n = u.length - 1; n >= 0; n--) this.removeListener(t, u[n]);
			return this;
		};
		function Bi(e, t, u) {
			var i = e._events;
			if (i === void 0) return [];
			var n = i[t];
			return n === void 0
				? []
				: typeof n == "function"
					? u
						? [n.listener || n]
						: [n]
					: u
						? gs(n)
						: Fi(n, n.length);
		}
		V.prototype.listeners = function (t) {
			return Bi(this, t, !0);
		};
		V.prototype.rawListeners = function (t) {
			return Bi(this, t, !1);
		};
		V.listenerCount = function (e, t) {
			return typeof e.listenerCount == "function"
				? e.listenerCount(t)
				: Mi.call(e, t);
		};
		V.prototype.listenerCount = Mi;
		function Mi(e) {
			var t = this._events;
			if (t !== void 0) {
				var u = t[e];
				if (typeof u == "function") return 1;
				if (u !== void 0) return u.length;
			}
			return 0;
		}
		V.prototype.eventNames = function () {
			return this._eventsCount > 0 ? It(this._events) : [];
		};
		function Fi(e, t) {
			for (var u = new Array(t), i = 0; i < t; ++i) u[i] = e[i];
			return u;
		}
		function As(e, t) {
			for (; t + 1 < e.length; t++) e[t] = e[t + 1];
			e.pop();
		}
		function gs(e) {
			for (var t = new Array(e.length), u = 0; u < t.length; ++u)
				t[u] = e[u].listener || e[u];
			return t;
		}
		function Cs(e, t) {
			return new Promise(function (u, i) {
				function n(o) {
					e.removeListener(t, s), i(o);
				}
				function s() {
					typeof e.removeListener == "function" && e.removeListener("error", n),
						u([].slice.call(arguments));
				}
				vi(e, t, s, { once: !0 }), t !== "error" && _s(e, n, { once: !0 });
			});
		}
		function _s(e, t, u) {
			typeof e.on == "function" && vi(e, "error", t, u);
		}
		function vi(e, t, u, i) {
			if (typeof e.on == "function") i.once ? e.once(t, u) : e.on(t, u);
			else if (typeof e.addEventListener == "function")
				e.addEventListener(t, function n(s) {
					i.once && e.removeEventListener(t, n), u(s);
				});
			else
				throw new TypeError(
					'The "emitter" argument must be of type EventEmitter. Received type ' +
						typeof e
				);
		}
	});
	var ri = Li((nc, Nt) => {
		"use strict";
		var tt = { decodeValues: !0, map: !1, silent: !1 };
		function ai(e) {
			return typeof e == "string" && !!e.trim();
		}
		function oi(e, t) {
			var u = e.split(";").filter(ai),
				i = u.shift(),
				n = O1(i),
				s = n.name,
				o = n.value;
			t = t ? Object.assign({}, tt, t) : tt;
			try {
				o = t.decodeValues ? decodeURIComponent(o) : o;
			} catch (c) {
				console.error(
					"set-cookie-parser encountered an error while decoding a cookie with value '" +
						o +
						"'. Set options.decodeValues to false to disable this feature.",
					c
				);
			}
			var r = { name: s, value: o };
			return (
				u.forEach(function (c) {
					var h = c.split("="),
						T = h.shift().trimLeft().toLowerCase(),
						b = h.join("=");
					T === "expires"
						? (r.expires = new Date(b))
						: T === "max-age"
							? (r.maxAge = parseInt(b, 10))
							: T === "secure"
								? (r.secure = !0)
								: T === "httponly"
									? (r.httpOnly = !0)
									: T === "samesite"
										? (r.sameSite = b)
										: T === "partitioned"
											? (r.partitioned = !0)
											: (r[T] = b);
				}),
				r
			);
		}
		function O1(e) {
			var t = "",
				u = "",
				i = e.split("=");
			return (
				i.length > 1 ? ((t = i.shift()), (u = i.join("="))) : (u = e),
				{ name: t, value: u }
			);
		}
		function B0(e, t) {
			if (((t = t ? Object.assign({}, tt, t) : tt), !e)) return t.map ? {} : [];
			if (e.headers)
				if (typeof e.headers.getSetCookie == "function")
					e = e.headers.getSetCookie();
				else if (e.headers["set-cookie"]) e = e.headers["set-cookie"];
				else {
					var u =
						e.headers[
							Object.keys(e.headers).find(function (n) {
								return n.toLowerCase() === "set-cookie";
							})
						];
					!u &&
						e.headers.cookie &&
						!t.silent &&
						console.warn(
							"Warning: set-cookie-parser appears to have been called on a request object. It is designed to parse Set-Cookie headers from responses, not Cookie headers from requests. Set the option {silent: true} to suppress this warning."
						),
						(e = u);
				}
			if (
				(Array.isArray(e) || (e = [e]),
				(t = t ? Object.assign({}, tt, t) : tt),
				t.map)
			) {
				var i = {};
				return e.filter(ai).reduce(function (n, s) {
					var o = oi(s, t);
					return (n[o.name] = o), n;
				}, i);
			} else
				return e.filter(ai).map(function (n) {
					return oi(n, t);
				});
		}
		function y1(e) {
			if (Array.isArray(e)) return e;
			if (typeof e != "string") return [];
			var t = [],
				u = 0,
				i,
				n,
				s,
				o,
				r;
			function c() {
				for (; u < e.length && /\s/.test(e.charAt(u)); ) u += 1;
				return u < e.length;
			}
			function h() {
				return (n = e.charAt(u)), n !== "=" && n !== ";" && n !== ",";
			}
			for (; u < e.length; ) {
				for (i = u, r = !1; c(); )
					if (((n = e.charAt(u)), n === ",")) {
						for (s = u, u += 1, c(), o = u; u < e.length && h(); ) u += 1;
						u < e.length && e.charAt(u) === "="
							? ((r = !0), (u = o), t.push(e.substring(i, s)), (i = u))
							: (u = s + 1);
					} else u += 1;
				(!r || u >= e.length) && t.push(e.substring(i, e.length));
			}
			return t;
		}
		Nt.exports = B0;
		Nt.exports.parse = B0;
		Nt.exports.parseString = oi;
		Nt.exports.splitCookiesString = y1;
	});
	var Mu = Ye(it(), 1);
	var Ds = new Set([
			65534, 65535, 131070, 131071, 196606, 196607, 262142, 262143, 327678,
			327679, 393214, 393215, 458750, 458751, 524286, 524287, 589822, 589823,
			655358, 655359, 720894, 720895, 786430, 786431, 851966, 851967, 917502,
			917503, 983038, 983039, 1048574, 1048575, 1114110, 1114111,
		]),
		Q = "\uFFFD",
		l;
	(function (e) {
		(e[(e.EOF = -1)] = "EOF"),
			(e[(e.NULL = 0)] = "NULL"),
			(e[(e.TABULATION = 9)] = "TABULATION"),
			(e[(e.CARRIAGE_RETURN = 13)] = "CARRIAGE_RETURN"),
			(e[(e.LINE_FEED = 10)] = "LINE_FEED"),
			(e[(e.FORM_FEED = 12)] = "FORM_FEED"),
			(e[(e.SPACE = 32)] = "SPACE"),
			(e[(e.EXCLAMATION_MARK = 33)] = "EXCLAMATION_MARK"),
			(e[(e.QUOTATION_MARK = 34)] = "QUOTATION_MARK"),
			(e[(e.NUMBER_SIGN = 35)] = "NUMBER_SIGN"),
			(e[(e.AMPERSAND = 38)] = "AMPERSAND"),
			(e[(e.APOSTROPHE = 39)] = "APOSTROPHE"),
			(e[(e.HYPHEN_MINUS = 45)] = "HYPHEN_MINUS"),
			(e[(e.SOLIDUS = 47)] = "SOLIDUS"),
			(e[(e.DIGIT_0 = 48)] = "DIGIT_0"),
			(e[(e.DIGIT_9 = 57)] = "DIGIT_9"),
			(e[(e.SEMICOLON = 59)] = "SEMICOLON"),
			(e[(e.LESS_THAN_SIGN = 60)] = "LESS_THAN_SIGN"),
			(e[(e.EQUALS_SIGN = 61)] = "EQUALS_SIGN"),
			(e[(e.GREATER_THAN_SIGN = 62)] = "GREATER_THAN_SIGN"),
			(e[(e.QUESTION_MARK = 63)] = "QUESTION_MARK"),
			(e[(e.LATIN_CAPITAL_A = 65)] = "LATIN_CAPITAL_A"),
			(e[(e.LATIN_CAPITAL_F = 70)] = "LATIN_CAPITAL_F"),
			(e[(e.LATIN_CAPITAL_X = 88)] = "LATIN_CAPITAL_X"),
			(e[(e.LATIN_CAPITAL_Z = 90)] = "LATIN_CAPITAL_Z"),
			(e[(e.RIGHT_SQUARE_BRACKET = 93)] = "RIGHT_SQUARE_BRACKET"),
			(e[(e.GRAVE_ACCENT = 96)] = "GRAVE_ACCENT"),
			(e[(e.LATIN_SMALL_A = 97)] = "LATIN_SMALL_A"),
			(e[(e.LATIN_SMALL_F = 102)] = "LATIN_SMALL_F"),
			(e[(e.LATIN_SMALL_X = 120)] = "LATIN_SMALL_X"),
			(e[(e.LATIN_SMALL_Z = 122)] = "LATIN_SMALL_Z"),
			(e[(e.REPLACEMENT_CHARACTER = 65533)] = "REPLACEMENT_CHARACTER");
	})((l = l || (l = {})));
	var ue = {
		DASH_DASH: "--",
		CDATA_START: "[CDATA[",
		DOCTYPE: "doctype",
		SCRIPT: "script",
		PUBLIC: "public",
		SYSTEM: "system",
	};
	function Lt(e) {
		return e >= 55296 && e <= 57343;
	}
	function Ui(e) {
		return e >= 56320 && e <= 57343;
	}
	function Hi(e, t) {
		return (e - 55296) * 1024 + 9216 + t;
	}
	function kt(e) {
		return (
			(e !== 32 &&
				e !== 10 &&
				e !== 13 &&
				e !== 9 &&
				e !== 12 &&
				e >= 1 &&
				e <= 31) ||
			(e >= 127 && e <= 159)
		);
	}
	function Rt(e) {
		return (e >= 64976 && e <= 65007) || Ds.has(e);
	}
	var g;
	(function (e) {
		(e.controlCharacterInInputStream = "control-character-in-input-stream"),
			(e.noncharacterInInputStream = "noncharacter-in-input-stream"),
			(e.surrogateInInputStream = "surrogate-in-input-stream"),
			(e.nonVoidHtmlElementStartTagWithTrailingSolidus =
				"non-void-html-element-start-tag-with-trailing-solidus"),
			(e.endTagWithAttributes = "end-tag-with-attributes"),
			(e.endTagWithTrailingSolidus = "end-tag-with-trailing-solidus"),
			(e.unexpectedSolidusInTag = "unexpected-solidus-in-tag"),
			(e.unexpectedNullCharacter = "unexpected-null-character"),
			(e.unexpectedQuestionMarkInsteadOfTagName =
				"unexpected-question-mark-instead-of-tag-name"),
			(e.invalidFirstCharacterOfTagName =
				"invalid-first-character-of-tag-name"),
			(e.unexpectedEqualsSignBeforeAttributeName =
				"unexpected-equals-sign-before-attribute-name"),
			(e.missingEndTagName = "missing-end-tag-name"),
			(e.unexpectedCharacterInAttributeName =
				"unexpected-character-in-attribute-name"),
			(e.unknownNamedCharacterReference = "unknown-named-character-reference"),
			(e.missingSemicolonAfterCharacterReference =
				"missing-semicolon-after-character-reference"),
			(e.unexpectedCharacterAfterDoctypeSystemIdentifier =
				"unexpected-character-after-doctype-system-identifier"),
			(e.unexpectedCharacterInUnquotedAttributeValue =
				"unexpected-character-in-unquoted-attribute-value"),
			(e.eofBeforeTagName = "eof-before-tag-name"),
			(e.eofInTag = "eof-in-tag"),
			(e.missingAttributeValue = "missing-attribute-value"),
			(e.missingWhitespaceBetweenAttributes =
				"missing-whitespace-between-attributes"),
			(e.missingWhitespaceAfterDoctypePublicKeyword =
				"missing-whitespace-after-doctype-public-keyword"),
			(e.missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers =
				"missing-whitespace-between-doctype-public-and-system-identifiers"),
			(e.missingWhitespaceAfterDoctypeSystemKeyword =
				"missing-whitespace-after-doctype-system-keyword"),
			(e.missingQuoteBeforeDoctypePublicIdentifier =
				"missing-quote-before-doctype-public-identifier"),
			(e.missingQuoteBeforeDoctypeSystemIdentifier =
				"missing-quote-before-doctype-system-identifier"),
			(e.missingDoctypePublicIdentifier = "missing-doctype-public-identifier"),
			(e.missingDoctypeSystemIdentifier = "missing-doctype-system-identifier"),
			(e.abruptDoctypePublicIdentifier = "abrupt-doctype-public-identifier"),
			(e.abruptDoctypeSystemIdentifier = "abrupt-doctype-system-identifier"),
			(e.cdataInHtmlContent = "cdata-in-html-content"),
			(e.incorrectlyOpenedComment = "incorrectly-opened-comment"),
			(e.eofInScriptHtmlCommentLikeText =
				"eof-in-script-html-comment-like-text"),
			(e.eofInDoctype = "eof-in-doctype"),
			(e.nestedComment = "nested-comment"),
			(e.abruptClosingOfEmptyComment = "abrupt-closing-of-empty-comment"),
			(e.eofInComment = "eof-in-comment"),
			(e.incorrectlyClosedComment = "incorrectly-closed-comment"),
			(e.eofInCdata = "eof-in-cdata"),
			(e.absenceOfDigitsInNumericCharacterReference =
				"absence-of-digits-in-numeric-character-reference"),
			(e.nullCharacterReference = "null-character-reference"),
			(e.surrogateCharacterReference = "surrogate-character-reference"),
			(e.characterReferenceOutsideUnicodeRange =
				"character-reference-outside-unicode-range"),
			(e.controlCharacterReference = "control-character-reference"),
			(e.noncharacterCharacterReference = "noncharacter-character-reference"),
			(e.missingWhitespaceBeforeDoctypeName =
				"missing-whitespace-before-doctype-name"),
			(e.missingDoctypeName = "missing-doctype-name"),
			(e.invalidCharacterSequenceAfterDoctypeName =
				"invalid-character-sequence-after-doctype-name"),
			(e.duplicateAttribute = "duplicate-attribute"),
			(e.nonConformingDoctype = "non-conforming-doctype"),
			(e.missingDoctype = "missing-doctype"),
			(e.misplacedDoctype = "misplaced-doctype"),
			(e.endTagWithoutMatchingOpenElement =
				"end-tag-without-matching-open-element"),
			(e.closingOfElementWithOpenChildElements =
				"closing-of-element-with-open-child-elements"),
			(e.disallowedContentInNoscriptInHead =
				"disallowed-content-in-noscript-in-head"),
			(e.openElementsLeftAfterEof = "open-elements-left-after-eof"),
			(e.abandonedHeadElementChild = "abandoned-head-element-child"),
			(e.misplacedStartTagForHeadElement =
				"misplaced-start-tag-for-head-element"),
			(e.nestedNoscriptInHead = "nested-noscript-in-head"),
			(e.eofInElementThatCanContainOnlyText =
				"eof-in-element-that-can-contain-only-text");
	})((g = g || (g = {})));
	var Is = 65536,
		Pt = class {
			constructor(t) {
				(this.handler = t),
					(this.html = ""),
					(this.pos = -1),
					(this.lastGapPos = -2),
					(this.gapStack = []),
					(this.skipNextNewLine = !1),
					(this.lastChunkWritten = !1),
					(this.endOfChunkHit = !1),
					(this.bufferWaterline = Is),
					(this.isEol = !1),
					(this.lineStartPos = 0),
					(this.droppedBufferSize = 0),
					(this.line = 1),
					(this.lastErrOffset = -1);
			}
			get col() {
				return this.pos - this.lineStartPos + +(this.lastGapPos !== this.pos);
			}
			get offset() {
				return this.droppedBufferSize + this.pos;
			}
			getError(t) {
				let { line: u, col: i, offset: n } = this;
				return {
					code: t,
					startLine: u,
					endLine: u,
					startCol: i,
					endCol: i,
					startOffset: n,
					endOffset: n,
				};
			}
			_err(t) {
				this.handler.onParseError &&
					this.lastErrOffset !== this.offset &&
					((this.lastErrOffset = this.offset),
					this.handler.onParseError(this.getError(t)));
			}
			_addGap() {
				this.gapStack.push(this.lastGapPos), (this.lastGapPos = this.pos);
			}
			_processSurrogate(t) {
				if (this.pos !== this.html.length - 1) {
					let u = this.html.charCodeAt(this.pos + 1);
					if (Ui(u)) return this.pos++, this._addGap(), Hi(t, u);
				} else if (!this.lastChunkWritten)
					return (this.endOfChunkHit = !0), l.EOF;
				return this._err(g.surrogateInInputStream), t;
			}
			willDropParsedChunk() {
				return this.pos > this.bufferWaterline;
			}
			dropParsedChunk() {
				this.willDropParsedChunk() &&
					((this.html = this.html.substring(this.pos)),
					(this.lineStartPos -= this.pos),
					(this.droppedBufferSize += this.pos),
					(this.pos = 0),
					(this.lastGapPos = -2),
					(this.gapStack.length = 0));
			}
			write(t, u) {
				this.html.length > 0 ? (this.html += t) : (this.html = t),
					(this.endOfChunkHit = !1),
					(this.lastChunkWritten = u);
			}
			insertHtmlAtCurrentPos(t) {
				(this.html =
					this.html.substring(0, this.pos + 1) +
					t +
					this.html.substring(this.pos + 1)),
					(this.endOfChunkHit = !1);
			}
			startsWith(t, u) {
				if (this.pos + t.length > this.html.length)
					return (this.endOfChunkHit = !this.lastChunkWritten), !1;
				if (u) return this.html.startsWith(t, this.pos);
				for (let i = 0; i < t.length; i++)
					if ((this.html.charCodeAt(this.pos + i) | 32) !== t.charCodeAt(i))
						return !1;
				return !0;
			}
			peek(t) {
				let u = this.pos + t;
				if (u >= this.html.length)
					return (this.endOfChunkHit = !this.lastChunkWritten), l.EOF;
				let i = this.html.charCodeAt(u);
				return i === l.CARRIAGE_RETURN ? l.LINE_FEED : i;
			}
			advance() {
				if (
					(this.pos++,
					this.isEol &&
						((this.isEol = !1), this.line++, (this.lineStartPos = this.pos)),
					this.pos >= this.html.length)
				)
					return (this.endOfChunkHit = !this.lastChunkWritten), l.EOF;
				let t = this.html.charCodeAt(this.pos);
				return t === l.CARRIAGE_RETURN
					? ((this.isEol = !0), (this.skipNextNewLine = !0), l.LINE_FEED)
					: t === l.LINE_FEED && ((this.isEol = !0), this.skipNextNewLine)
						? (this.line--,
							(this.skipNextNewLine = !1),
							this._addGap(),
							this.advance())
						: ((this.skipNextNewLine = !1),
							Lt(t) && (t = this._processSurrogate(t)),
							this.handler.onParseError === null ||
								(t > 31 && t < 127) ||
								t === l.LINE_FEED ||
								t === l.CARRIAGE_RETURN ||
								(t > 159 && t < 64976) ||
								this._checkForProblematicCharacters(t),
							t);
			}
			_checkForProblematicCharacters(t) {
				kt(t)
					? this._err(g.controlCharacterInInputStream)
					: Rt(t) && this._err(g.noncharacterInInputStream);
			}
			retreat(t) {
				for (this.pos -= t; this.pos < this.lastGapPos; )
					(this.lastGapPos = this.gapStack.pop()), this.pos--;
				this.isEol = !1;
			}
		};
	var p;
	(function (e) {
		(e[(e.CHARACTER = 0)] = "CHARACTER"),
			(e[(e.NULL_CHARACTER = 1)] = "NULL_CHARACTER"),
			(e[(e.WHITESPACE_CHARACTER = 2)] = "WHITESPACE_CHARACTER"),
			(e[(e.START_TAG = 3)] = "START_TAG"),
			(e[(e.END_TAG = 4)] = "END_TAG"),
			(e[(e.COMMENT = 5)] = "COMMENT"),
			(e[(e.DOCTYPE = 6)] = "DOCTYPE"),
			(e[(e.EOF = 7)] = "EOF"),
			(e[(e.HIBERNATION = 8)] = "HIBERNATION");
	})((p = p || (p = {})));
	function Ot(e, t) {
		for (let u = e.attrs.length - 1; u >= 0; u--)
			if (e.attrs[u].name === t) return e.attrs[u].value;
		return null;
	}
	var Ce = new Uint16Array(
		'\u1D41<\xD5\u0131\u028A\u049D\u057B\u05D0\u0675\u06DE\u07A2\u07D6\u080F\u0A4A\u0A91\u0DA1\u0E6D\u0F09\u0F26\u10CA\u1228\u12E1\u1415\u149D\u14C3\u14DF\u1525\0\0\0\0\0\0\u156B\u16CD\u198D\u1C12\u1DDD\u1F7E\u2060\u21B0\u228D\u23C0\u23FB\u2442\u2824\u2912\u2D08\u2E48\u2FCE\u3016\u32BA\u3639\u37AC\u38FE\u3A28\u3A71\u3AE0\u3B2E\u0800EMabcfglmnoprstu\\bfms\x7F\x84\x8B\x90\x95\x98\xA6\xB3\xB9\xC8\xCFlig\u803B\xC6\u40C6P\u803B&\u4026cute\u803B\xC1\u40C1reve;\u4102\u0100iyx}rc\u803B\xC2\u40C2;\u4410r;\uC000\u{1D504}rave\u803B\xC0\u40C0pha;\u4391acr;\u4100d;\u6A53\u0100gp\x9D\xA1on;\u4104f;\uC000\u{1D538}plyFunction;\u6061ing\u803B\xC5\u40C5\u0100cs\xBE\xC3r;\uC000\u{1D49C}ign;\u6254ilde\u803B\xC3\u40C3ml\u803B\xC4\u40C4\u0400aceforsu\xE5\xFB\xFE\u0117\u011C\u0122\u0127\u012A\u0100cr\xEA\xF2kslash;\u6216\u0176\xF6\xF8;\u6AE7ed;\u6306y;\u4411\u0180crt\u0105\u010B\u0114ause;\u6235noullis;\u612Ca;\u4392r;\uC000\u{1D505}pf;\uC000\u{1D539}eve;\u42D8c\xF2\u0113mpeq;\u624E\u0700HOacdefhilorsu\u014D\u0151\u0156\u0180\u019E\u01A2\u01B5\u01B7\u01BA\u01DC\u0215\u0273\u0278\u027Ecy;\u4427PY\u803B\xA9\u40A9\u0180cpy\u015D\u0162\u017Aute;\u4106\u0100;i\u0167\u0168\u62D2talDifferentialD;\u6145leys;\u612D\u0200aeio\u0189\u018E\u0194\u0198ron;\u410Cdil\u803B\xC7\u40C7rc;\u4108nint;\u6230ot;\u410A\u0100dn\u01A7\u01ADilla;\u40B8terDot;\u40B7\xF2\u017Fi;\u43A7rcle\u0200DMPT\u01C7\u01CB\u01D1\u01D6ot;\u6299inus;\u6296lus;\u6295imes;\u6297o\u0100cs\u01E2\u01F8kwiseContourIntegral;\u6232eCurly\u0100DQ\u0203\u020FoubleQuote;\u601Duote;\u6019\u0200lnpu\u021E\u0228\u0247\u0255on\u0100;e\u0225\u0226\u6237;\u6A74\u0180git\u022F\u0236\u023Aruent;\u6261nt;\u622FourIntegral;\u622E\u0100fr\u024C\u024E;\u6102oduct;\u6210nterClockwiseContourIntegral;\u6233oss;\u6A2Fcr;\uC000\u{1D49E}p\u0100;C\u0284\u0285\u62D3ap;\u624D\u0580DJSZacefios\u02A0\u02AC\u02B0\u02B4\u02B8\u02CB\u02D7\u02E1\u02E6\u0333\u048D\u0100;o\u0179\u02A5trahd;\u6911cy;\u4402cy;\u4405cy;\u440F\u0180grs\u02BF\u02C4\u02C7ger;\u6021r;\u61A1hv;\u6AE4\u0100ay\u02D0\u02D5ron;\u410E;\u4414l\u0100;t\u02DD\u02DE\u6207a;\u4394r;\uC000\u{1D507}\u0100af\u02EB\u0327\u0100cm\u02F0\u0322ritical\u0200ADGT\u0300\u0306\u0316\u031Ccute;\u40B4o\u0174\u030B\u030D;\u42D9bleAcute;\u42DDrave;\u4060ilde;\u42DCond;\u62C4ferentialD;\u6146\u0470\u033D\0\0\0\u0342\u0354\0\u0405f;\uC000\u{1D53B}\u0180;DE\u0348\u0349\u034D\u40A8ot;\u60DCqual;\u6250ble\u0300CDLRUV\u0363\u0372\u0382\u03CF\u03E2\u03F8ontourIntegra\xEC\u0239o\u0274\u0379\0\0\u037B\xBB\u0349nArrow;\u61D3\u0100eo\u0387\u03A4ft\u0180ART\u0390\u0396\u03A1rrow;\u61D0ightArrow;\u61D4e\xE5\u02CAng\u0100LR\u03AB\u03C4eft\u0100AR\u03B3\u03B9rrow;\u67F8ightArrow;\u67FAightArrow;\u67F9ight\u0100AT\u03D8\u03DErrow;\u61D2ee;\u62A8p\u0241\u03E9\0\0\u03EFrrow;\u61D1ownArrow;\u61D5erticalBar;\u6225n\u0300ABLRTa\u0412\u042A\u0430\u045E\u047F\u037Crrow\u0180;BU\u041D\u041E\u0422\u6193ar;\u6913pArrow;\u61F5reve;\u4311eft\u02D2\u043A\0\u0446\0\u0450ightVector;\u6950eeVector;\u695Eector\u0100;B\u0459\u045A\u61BDar;\u6956ight\u01D4\u0467\0\u0471eeVector;\u695Fector\u0100;B\u047A\u047B\u61C1ar;\u6957ee\u0100;A\u0486\u0487\u62A4rrow;\u61A7\u0100ct\u0492\u0497r;\uC000\u{1D49F}rok;\u4110\u0800NTacdfglmopqstux\u04BD\u04C0\u04C4\u04CB\u04DE\u04E2\u04E7\u04EE\u04F5\u0521\u052F\u0536\u0552\u055D\u0560\u0565G;\u414AH\u803B\xD0\u40D0cute\u803B\xC9\u40C9\u0180aiy\u04D2\u04D7\u04DCron;\u411Arc\u803B\xCA\u40CA;\u442Dot;\u4116r;\uC000\u{1D508}rave\u803B\xC8\u40C8ement;\u6208\u0100ap\u04FA\u04FEcr;\u4112ty\u0253\u0506\0\0\u0512mallSquare;\u65FBerySmallSquare;\u65AB\u0100gp\u0526\u052Aon;\u4118f;\uC000\u{1D53C}silon;\u4395u\u0100ai\u053C\u0549l\u0100;T\u0542\u0543\u6A75ilde;\u6242librium;\u61CC\u0100ci\u0557\u055Ar;\u6130m;\u6A73a;\u4397ml\u803B\xCB\u40CB\u0100ip\u056A\u056Fsts;\u6203onentialE;\u6147\u0280cfios\u0585\u0588\u058D\u05B2\u05CCy;\u4424r;\uC000\u{1D509}lled\u0253\u0597\0\0\u05A3mallSquare;\u65FCerySmallSquare;\u65AA\u0370\u05BA\0\u05BF\0\0\u05C4f;\uC000\u{1D53D}All;\u6200riertrf;\u6131c\xF2\u05CB\u0600JTabcdfgorst\u05E8\u05EC\u05EF\u05FA\u0600\u0612\u0616\u061B\u061D\u0623\u066C\u0672cy;\u4403\u803B>\u403Emma\u0100;d\u05F7\u05F8\u4393;\u43DCreve;\u411E\u0180eiy\u0607\u060C\u0610dil;\u4122rc;\u411C;\u4413ot;\u4120r;\uC000\u{1D50A};\u62D9pf;\uC000\u{1D53E}eater\u0300EFGLST\u0635\u0644\u064E\u0656\u065B\u0666qual\u0100;L\u063E\u063F\u6265ess;\u62DBullEqual;\u6267reater;\u6AA2ess;\u6277lantEqual;\u6A7Eilde;\u6273cr;\uC000\u{1D4A2};\u626B\u0400Aacfiosu\u0685\u068B\u0696\u069B\u069E\u06AA\u06BE\u06CARDcy;\u442A\u0100ct\u0690\u0694ek;\u42C7;\u405Eirc;\u4124r;\u610ClbertSpace;\u610B\u01F0\u06AF\0\u06B2f;\u610DizontalLine;\u6500\u0100ct\u06C3\u06C5\xF2\u06A9rok;\u4126mp\u0144\u06D0\u06D8ownHum\xF0\u012Fqual;\u624F\u0700EJOacdfgmnostu\u06FA\u06FE\u0703\u0707\u070E\u071A\u071E\u0721\u0728\u0744\u0778\u078B\u078F\u0795cy;\u4415lig;\u4132cy;\u4401cute\u803B\xCD\u40CD\u0100iy\u0713\u0718rc\u803B\xCE\u40CE;\u4418ot;\u4130r;\u6111rave\u803B\xCC\u40CC\u0180;ap\u0720\u072F\u073F\u0100cg\u0734\u0737r;\u412AinaryI;\u6148lie\xF3\u03DD\u01F4\u0749\0\u0762\u0100;e\u074D\u074E\u622C\u0100gr\u0753\u0758ral;\u622Bsection;\u62C2isible\u0100CT\u076C\u0772omma;\u6063imes;\u6062\u0180gpt\u077F\u0783\u0788on;\u412Ef;\uC000\u{1D540}a;\u4399cr;\u6110ilde;\u4128\u01EB\u079A\0\u079Ecy;\u4406l\u803B\xCF\u40CF\u0280cfosu\u07AC\u07B7\u07BC\u07C2\u07D0\u0100iy\u07B1\u07B5rc;\u4134;\u4419r;\uC000\u{1D50D}pf;\uC000\u{1D541}\u01E3\u07C7\0\u07CCr;\uC000\u{1D4A5}rcy;\u4408kcy;\u4404\u0380HJacfos\u07E4\u07E8\u07EC\u07F1\u07FD\u0802\u0808cy;\u4425cy;\u440Cppa;\u439A\u0100ey\u07F6\u07FBdil;\u4136;\u441Ar;\uC000\u{1D50E}pf;\uC000\u{1D542}cr;\uC000\u{1D4A6}\u0580JTaceflmost\u0825\u0829\u082C\u0850\u0863\u09B3\u09B8\u09C7\u09CD\u0A37\u0A47cy;\u4409\u803B<\u403C\u0280cmnpr\u0837\u083C\u0841\u0844\u084Dute;\u4139bda;\u439Bg;\u67EAlacetrf;\u6112r;\u619E\u0180aey\u0857\u085C\u0861ron;\u413Ddil;\u413B;\u441B\u0100fs\u0868\u0970t\u0500ACDFRTUVar\u087E\u08A9\u08B1\u08E0\u08E6\u08FC\u092F\u095B\u0390\u096A\u0100nr\u0883\u088FgleBracket;\u67E8row\u0180;BR\u0899\u089A\u089E\u6190ar;\u61E4ightArrow;\u61C6eiling;\u6308o\u01F5\u08B7\0\u08C3bleBracket;\u67E6n\u01D4\u08C8\0\u08D2eeVector;\u6961ector\u0100;B\u08DB\u08DC\u61C3ar;\u6959loor;\u630Aight\u0100AV\u08EF\u08F5rrow;\u6194ector;\u694E\u0100er\u0901\u0917e\u0180;AV\u0909\u090A\u0910\u62A3rrow;\u61A4ector;\u695Aiangle\u0180;BE\u0924\u0925\u0929\u62B2ar;\u69CFqual;\u62B4p\u0180DTV\u0937\u0942\u094CownVector;\u6951eeVector;\u6960ector\u0100;B\u0956\u0957\u61BFar;\u6958ector\u0100;B\u0965\u0966\u61BCar;\u6952ight\xE1\u039Cs\u0300EFGLST\u097E\u098B\u0995\u099D\u09A2\u09ADqualGreater;\u62DAullEqual;\u6266reater;\u6276ess;\u6AA1lantEqual;\u6A7Dilde;\u6272r;\uC000\u{1D50F}\u0100;e\u09BD\u09BE\u62D8ftarrow;\u61DAidot;\u413F\u0180npw\u09D4\u0A16\u0A1Bg\u0200LRlr\u09DE\u09F7\u0A02\u0A10eft\u0100AR\u09E6\u09ECrrow;\u67F5ightArrow;\u67F7ightArrow;\u67F6eft\u0100ar\u03B3\u0A0Aight\xE1\u03BFight\xE1\u03CAf;\uC000\u{1D543}er\u0100LR\u0A22\u0A2CeftArrow;\u6199ightArrow;\u6198\u0180cht\u0A3E\u0A40\u0A42\xF2\u084C;\u61B0rok;\u4141;\u626A\u0400acefiosu\u0A5A\u0A5D\u0A60\u0A77\u0A7C\u0A85\u0A8B\u0A8Ep;\u6905y;\u441C\u0100dl\u0A65\u0A6FiumSpace;\u605Flintrf;\u6133r;\uC000\u{1D510}nusPlus;\u6213pf;\uC000\u{1D544}c\xF2\u0A76;\u439C\u0480Jacefostu\u0AA3\u0AA7\u0AAD\u0AC0\u0B14\u0B19\u0D91\u0D97\u0D9Ecy;\u440Acute;\u4143\u0180aey\u0AB4\u0AB9\u0ABEron;\u4147dil;\u4145;\u441D\u0180gsw\u0AC7\u0AF0\u0B0Eative\u0180MTV\u0AD3\u0ADF\u0AE8ediumSpace;\u600Bhi\u0100cn\u0AE6\u0AD8\xEB\u0AD9eryThi\xEE\u0AD9ted\u0100GL\u0AF8\u0B06reaterGreate\xF2\u0673essLes\xF3\u0A48Line;\u400Ar;\uC000\u{1D511}\u0200Bnpt\u0B22\u0B28\u0B37\u0B3Areak;\u6060BreakingSpace;\u40A0f;\u6115\u0680;CDEGHLNPRSTV\u0B55\u0B56\u0B6A\u0B7C\u0BA1\u0BEB\u0C04\u0C5E\u0C84\u0CA6\u0CD8\u0D61\u0D85\u6AEC\u0100ou\u0B5B\u0B64ngruent;\u6262pCap;\u626DoubleVerticalBar;\u6226\u0180lqx\u0B83\u0B8A\u0B9Bement;\u6209ual\u0100;T\u0B92\u0B93\u6260ilde;\uC000\u2242\u0338ists;\u6204reater\u0380;EFGLST\u0BB6\u0BB7\u0BBD\u0BC9\u0BD3\u0BD8\u0BE5\u626Fqual;\u6271ullEqual;\uC000\u2267\u0338reater;\uC000\u226B\u0338ess;\u6279lantEqual;\uC000\u2A7E\u0338ilde;\u6275ump\u0144\u0BF2\u0BFDownHump;\uC000\u224E\u0338qual;\uC000\u224F\u0338e\u0100fs\u0C0A\u0C27tTriangle\u0180;BE\u0C1A\u0C1B\u0C21\u62EAar;\uC000\u29CF\u0338qual;\u62ECs\u0300;EGLST\u0C35\u0C36\u0C3C\u0C44\u0C4B\u0C58\u626Equal;\u6270reater;\u6278ess;\uC000\u226A\u0338lantEqual;\uC000\u2A7D\u0338ilde;\u6274ested\u0100GL\u0C68\u0C79reaterGreater;\uC000\u2AA2\u0338essLess;\uC000\u2AA1\u0338recedes\u0180;ES\u0C92\u0C93\u0C9B\u6280qual;\uC000\u2AAF\u0338lantEqual;\u62E0\u0100ei\u0CAB\u0CB9verseElement;\u620CghtTriangle\u0180;BE\u0CCB\u0CCC\u0CD2\u62EBar;\uC000\u29D0\u0338qual;\u62ED\u0100qu\u0CDD\u0D0CuareSu\u0100bp\u0CE8\u0CF9set\u0100;E\u0CF0\u0CF3\uC000\u228F\u0338qual;\u62E2erset\u0100;E\u0D03\u0D06\uC000\u2290\u0338qual;\u62E3\u0180bcp\u0D13\u0D24\u0D4Eset\u0100;E\u0D1B\u0D1E\uC000\u2282\u20D2qual;\u6288ceeds\u0200;EST\u0D32\u0D33\u0D3B\u0D46\u6281qual;\uC000\u2AB0\u0338lantEqual;\u62E1ilde;\uC000\u227F\u0338erset\u0100;E\u0D58\u0D5B\uC000\u2283\u20D2qual;\u6289ilde\u0200;EFT\u0D6E\u0D6F\u0D75\u0D7F\u6241qual;\u6244ullEqual;\u6247ilde;\u6249erticalBar;\u6224cr;\uC000\u{1D4A9}ilde\u803B\xD1\u40D1;\u439D\u0700Eacdfgmoprstuv\u0DBD\u0DC2\u0DC9\u0DD5\u0DDB\u0DE0\u0DE7\u0DFC\u0E02\u0E20\u0E22\u0E32\u0E3F\u0E44lig;\u4152cute\u803B\xD3\u40D3\u0100iy\u0DCE\u0DD3rc\u803B\xD4\u40D4;\u441Eblac;\u4150r;\uC000\u{1D512}rave\u803B\xD2\u40D2\u0180aei\u0DEE\u0DF2\u0DF6cr;\u414Cga;\u43A9cron;\u439Fpf;\uC000\u{1D546}enCurly\u0100DQ\u0E0E\u0E1AoubleQuote;\u601Cuote;\u6018;\u6A54\u0100cl\u0E27\u0E2Cr;\uC000\u{1D4AA}ash\u803B\xD8\u40D8i\u016C\u0E37\u0E3Cde\u803B\xD5\u40D5es;\u6A37ml\u803B\xD6\u40D6er\u0100BP\u0E4B\u0E60\u0100ar\u0E50\u0E53r;\u603Eac\u0100ek\u0E5A\u0E5C;\u63DEet;\u63B4arenthesis;\u63DC\u0480acfhilors\u0E7F\u0E87\u0E8A\u0E8F\u0E92\u0E94\u0E9D\u0EB0\u0EFCrtialD;\u6202y;\u441Fr;\uC000\u{1D513}i;\u43A6;\u43A0usMinus;\u40B1\u0100ip\u0EA2\u0EADncareplan\xE5\u069Df;\u6119\u0200;eio\u0EB9\u0EBA\u0EE0\u0EE4\u6ABBcedes\u0200;EST\u0EC8\u0EC9\u0ECF\u0EDA\u627Aqual;\u6AAFlantEqual;\u627Cilde;\u627Eme;\u6033\u0100dp\u0EE9\u0EEEuct;\u620Fortion\u0100;a\u0225\u0EF9l;\u621D\u0100ci\u0F01\u0F06r;\uC000\u{1D4AB};\u43A8\u0200Ufos\u0F11\u0F16\u0F1B\u0F1FOT\u803B"\u4022r;\uC000\u{1D514}pf;\u611Acr;\uC000\u{1D4AC}\u0600BEacefhiorsu\u0F3E\u0F43\u0F47\u0F60\u0F73\u0FA7\u0FAA\u0FAD\u1096\u10A9\u10B4\u10BEarr;\u6910G\u803B\xAE\u40AE\u0180cnr\u0F4E\u0F53\u0F56ute;\u4154g;\u67EBr\u0100;t\u0F5C\u0F5D\u61A0l;\u6916\u0180aey\u0F67\u0F6C\u0F71ron;\u4158dil;\u4156;\u4420\u0100;v\u0F78\u0F79\u611Cerse\u0100EU\u0F82\u0F99\u0100lq\u0F87\u0F8Eement;\u620Builibrium;\u61CBpEquilibrium;\u696Fr\xBB\u0F79o;\u43A1ght\u0400ACDFTUVa\u0FC1\u0FEB\u0FF3\u1022\u1028\u105B\u1087\u03D8\u0100nr\u0FC6\u0FD2gleBracket;\u67E9row\u0180;BL\u0FDC\u0FDD\u0FE1\u6192ar;\u61E5eftArrow;\u61C4eiling;\u6309o\u01F5\u0FF9\0\u1005bleBracket;\u67E7n\u01D4\u100A\0\u1014eeVector;\u695Dector\u0100;B\u101D\u101E\u61C2ar;\u6955loor;\u630B\u0100er\u102D\u1043e\u0180;AV\u1035\u1036\u103C\u62A2rrow;\u61A6ector;\u695Biangle\u0180;BE\u1050\u1051\u1055\u62B3ar;\u69D0qual;\u62B5p\u0180DTV\u1063\u106E\u1078ownVector;\u694FeeVector;\u695Cector\u0100;B\u1082\u1083\u61BEar;\u6954ector\u0100;B\u1091\u1092\u61C0ar;\u6953\u0100pu\u109B\u109Ef;\u611DndImplies;\u6970ightarrow;\u61DB\u0100ch\u10B9\u10BCr;\u611B;\u61B1leDelayed;\u69F4\u0680HOacfhimoqstu\u10E4\u10F1\u10F7\u10FD\u1119\u111E\u1151\u1156\u1161\u1167\u11B5\u11BB\u11BF\u0100Cc\u10E9\u10EEHcy;\u4429y;\u4428FTcy;\u442Ccute;\u415A\u0280;aeiy\u1108\u1109\u110E\u1113\u1117\u6ABCron;\u4160dil;\u415Erc;\u415C;\u4421r;\uC000\u{1D516}ort\u0200DLRU\u112A\u1134\u113E\u1149ownArrow\xBB\u041EeftArrow\xBB\u089AightArrow\xBB\u0FDDpArrow;\u6191gma;\u43A3allCircle;\u6218pf;\uC000\u{1D54A}\u0272\u116D\0\0\u1170t;\u621Aare\u0200;ISU\u117B\u117C\u1189\u11AF\u65A1ntersection;\u6293u\u0100bp\u118F\u119Eset\u0100;E\u1197\u1198\u628Fqual;\u6291erset\u0100;E\u11A8\u11A9\u6290qual;\u6292nion;\u6294cr;\uC000\u{1D4AE}ar;\u62C6\u0200bcmp\u11C8\u11DB\u1209\u120B\u0100;s\u11CD\u11CE\u62D0et\u0100;E\u11CD\u11D5qual;\u6286\u0100ch\u11E0\u1205eeds\u0200;EST\u11ED\u11EE\u11F4\u11FF\u627Bqual;\u6AB0lantEqual;\u627Dilde;\u627FTh\xE1\u0F8C;\u6211\u0180;es\u1212\u1213\u1223\u62D1rset\u0100;E\u121C\u121D\u6283qual;\u6287et\xBB\u1213\u0580HRSacfhiors\u123E\u1244\u1249\u1255\u125E\u1271\u1276\u129F\u12C2\u12C8\u12D1ORN\u803B\xDE\u40DEADE;\u6122\u0100Hc\u124E\u1252cy;\u440By;\u4426\u0100bu\u125A\u125C;\u4009;\u43A4\u0180aey\u1265\u126A\u126Fron;\u4164dil;\u4162;\u4422r;\uC000\u{1D517}\u0100ei\u127B\u1289\u01F2\u1280\0\u1287efore;\u6234a;\u4398\u0100cn\u128E\u1298kSpace;\uC000\u205F\u200ASpace;\u6009lde\u0200;EFT\u12AB\u12AC\u12B2\u12BC\u623Cqual;\u6243ullEqual;\u6245ilde;\u6248pf;\uC000\u{1D54B}ipleDot;\u60DB\u0100ct\u12D6\u12DBr;\uC000\u{1D4AF}rok;\u4166\u0AE1\u12F7\u130E\u131A\u1326\0\u132C\u1331\0\0\0\0\0\u1338\u133D\u1377\u1385\0\u13FF\u1404\u140A\u1410\u0100cr\u12FB\u1301ute\u803B\xDA\u40DAr\u0100;o\u1307\u1308\u619Fcir;\u6949r\u01E3\u1313\0\u1316y;\u440Eve;\u416C\u0100iy\u131E\u1323rc\u803B\xDB\u40DB;\u4423blac;\u4170r;\uC000\u{1D518}rave\u803B\xD9\u40D9acr;\u416A\u0100di\u1341\u1369er\u0100BP\u1348\u135D\u0100ar\u134D\u1350r;\u405Fac\u0100ek\u1357\u1359;\u63DFet;\u63B5arenthesis;\u63DDon\u0100;P\u1370\u1371\u62C3lus;\u628E\u0100gp\u137B\u137Fon;\u4172f;\uC000\u{1D54C}\u0400ADETadps\u1395\u13AE\u13B8\u13C4\u03E8\u13D2\u13D7\u13F3rrow\u0180;BD\u1150\u13A0\u13A4ar;\u6912ownArrow;\u61C5ownArrow;\u6195quilibrium;\u696Eee\u0100;A\u13CB\u13CC\u62A5rrow;\u61A5own\xE1\u03F3er\u0100LR\u13DE\u13E8eftArrow;\u6196ightArrow;\u6197i\u0100;l\u13F9\u13FA\u43D2on;\u43A5ing;\u416Ecr;\uC000\u{1D4B0}ilde;\u4168ml\u803B\xDC\u40DC\u0480Dbcdefosv\u1427\u142C\u1430\u1433\u143E\u1485\u148A\u1490\u1496ash;\u62ABar;\u6AEBy;\u4412ash\u0100;l\u143B\u143C\u62A9;\u6AE6\u0100er\u1443\u1445;\u62C1\u0180bty\u144C\u1450\u147Aar;\u6016\u0100;i\u144F\u1455cal\u0200BLST\u1461\u1465\u146A\u1474ar;\u6223ine;\u407Ceparator;\u6758ilde;\u6240ThinSpace;\u600Ar;\uC000\u{1D519}pf;\uC000\u{1D54D}cr;\uC000\u{1D4B1}dash;\u62AA\u0280cefos\u14A7\u14AC\u14B1\u14B6\u14BCirc;\u4174dge;\u62C0r;\uC000\u{1D51A}pf;\uC000\u{1D54E}cr;\uC000\u{1D4B2}\u0200fios\u14CB\u14D0\u14D2\u14D8r;\uC000\u{1D51B};\u439Epf;\uC000\u{1D54F}cr;\uC000\u{1D4B3}\u0480AIUacfosu\u14F1\u14F5\u14F9\u14FD\u1504\u150F\u1514\u151A\u1520cy;\u442Fcy;\u4407cy;\u442Ecute\u803B\xDD\u40DD\u0100iy\u1509\u150Drc;\u4176;\u442Br;\uC000\u{1D51C}pf;\uC000\u{1D550}cr;\uC000\u{1D4B4}ml;\u4178\u0400Hacdefos\u1535\u1539\u153F\u154B\u154F\u155D\u1560\u1564cy;\u4416cute;\u4179\u0100ay\u1544\u1549ron;\u417D;\u4417ot;\u417B\u01F2\u1554\0\u155BoWidt\xE8\u0AD9a;\u4396r;\u6128pf;\u6124cr;\uC000\u{1D4B5}\u0BE1\u1583\u158A\u1590\0\u15B0\u15B6\u15BF\0\0\0\0\u15C6\u15DB\u15EB\u165F\u166D\0\u1695\u169B\u16B2\u16B9\0\u16BEcute\u803B\xE1\u40E1reve;\u4103\u0300;Ediuy\u159C\u159D\u15A1\u15A3\u15A8\u15AD\u623E;\uC000\u223E\u0333;\u623Frc\u803B\xE2\u40E2te\u80BB\xB4\u0306;\u4430lig\u803B\xE6\u40E6\u0100;r\xB2\u15BA;\uC000\u{1D51E}rave\u803B\xE0\u40E0\u0100ep\u15CA\u15D6\u0100fp\u15CF\u15D4sym;\u6135\xE8\u15D3ha;\u43B1\u0100ap\u15DFc\u0100cl\u15E4\u15E7r;\u4101g;\u6A3F\u0264\u15F0\0\0\u160A\u0280;adsv\u15FA\u15FB\u15FF\u1601\u1607\u6227nd;\u6A55;\u6A5Clope;\u6A58;\u6A5A\u0380;elmrsz\u1618\u1619\u161B\u161E\u163F\u164F\u1659\u6220;\u69A4e\xBB\u1619sd\u0100;a\u1625\u1626\u6221\u0461\u1630\u1632\u1634\u1636\u1638\u163A\u163C\u163E;\u69A8;\u69A9;\u69AA;\u69AB;\u69AC;\u69AD;\u69AE;\u69AFt\u0100;v\u1645\u1646\u621Fb\u0100;d\u164C\u164D\u62BE;\u699D\u0100pt\u1654\u1657h;\u6222\xBB\xB9arr;\u637C\u0100gp\u1663\u1667on;\u4105f;\uC000\u{1D552}\u0380;Eaeiop\u12C1\u167B\u167D\u1682\u1684\u1687\u168A;\u6A70cir;\u6A6F;\u624Ad;\u624Bs;\u4027rox\u0100;e\u12C1\u1692\xF1\u1683ing\u803B\xE5\u40E5\u0180cty\u16A1\u16A6\u16A8r;\uC000\u{1D4B6};\u402Amp\u0100;e\u12C1\u16AF\xF1\u0288ilde\u803B\xE3\u40E3ml\u803B\xE4\u40E4\u0100ci\u16C2\u16C8onin\xF4\u0272nt;\u6A11\u0800Nabcdefiklnoprsu\u16ED\u16F1\u1730\u173C\u1743\u1748\u1778\u177D\u17E0\u17E6\u1839\u1850\u170D\u193D\u1948\u1970ot;\u6AED\u0100cr\u16F6\u171Ek\u0200ceps\u1700\u1705\u170D\u1713ong;\u624Cpsilon;\u43F6rime;\u6035im\u0100;e\u171A\u171B\u623Dq;\u62CD\u0176\u1722\u1726ee;\u62BDed\u0100;g\u172C\u172D\u6305e\xBB\u172Drk\u0100;t\u135C\u1737brk;\u63B6\u0100oy\u1701\u1741;\u4431quo;\u601E\u0280cmprt\u1753\u175B\u1761\u1764\u1768aus\u0100;e\u010A\u0109ptyv;\u69B0s\xE9\u170Cno\xF5\u0113\u0180ahw\u176F\u1771\u1773;\u43B2;\u6136een;\u626Cr;\uC000\u{1D51F}g\u0380costuvw\u178D\u179D\u17B3\u17C1\u17D5\u17DB\u17DE\u0180aiu\u1794\u1796\u179A\xF0\u0760rc;\u65EFp\xBB\u1371\u0180dpt\u17A4\u17A8\u17ADot;\u6A00lus;\u6A01imes;\u6A02\u0271\u17B9\0\0\u17BEcup;\u6A06ar;\u6605riangle\u0100du\u17CD\u17D2own;\u65BDp;\u65B3plus;\u6A04e\xE5\u1444\xE5\u14ADarow;\u690D\u0180ako\u17ED\u1826\u1835\u0100cn\u17F2\u1823k\u0180lst\u17FA\u05AB\u1802ozenge;\u69EBriangle\u0200;dlr\u1812\u1813\u1818\u181D\u65B4own;\u65BEeft;\u65C2ight;\u65B8k;\u6423\u01B1\u182B\0\u1833\u01B2\u182F\0\u1831;\u6592;\u65914;\u6593ck;\u6588\u0100eo\u183E\u184D\u0100;q\u1843\u1846\uC000=\u20E5uiv;\uC000\u2261\u20E5t;\u6310\u0200ptwx\u1859\u185E\u1867\u186Cf;\uC000\u{1D553}\u0100;t\u13CB\u1863om\xBB\u13CCtie;\u62C8\u0600DHUVbdhmptuv\u1885\u1896\u18AA\u18BB\u18D7\u18DB\u18EC\u18FF\u1905\u190A\u1910\u1921\u0200LRlr\u188E\u1890\u1892\u1894;\u6557;\u6554;\u6556;\u6553\u0280;DUdu\u18A1\u18A2\u18A4\u18A6\u18A8\u6550;\u6566;\u6569;\u6564;\u6567\u0200LRlr\u18B3\u18B5\u18B7\u18B9;\u655D;\u655A;\u655C;\u6559\u0380;HLRhlr\u18CA\u18CB\u18CD\u18CF\u18D1\u18D3\u18D5\u6551;\u656C;\u6563;\u6560;\u656B;\u6562;\u655Fox;\u69C9\u0200LRlr\u18E4\u18E6\u18E8\u18EA;\u6555;\u6552;\u6510;\u650C\u0280;DUdu\u06BD\u18F7\u18F9\u18FB\u18FD;\u6565;\u6568;\u652C;\u6534inus;\u629Flus;\u629Eimes;\u62A0\u0200LRlr\u1919\u191B\u191D\u191F;\u655B;\u6558;\u6518;\u6514\u0380;HLRhlr\u1930\u1931\u1933\u1935\u1937\u1939\u193B\u6502;\u656A;\u6561;\u655E;\u653C;\u6524;\u651C\u0100ev\u0123\u1942bar\u803B\xA6\u40A6\u0200ceio\u1951\u1956\u195A\u1960r;\uC000\u{1D4B7}mi;\u604Fm\u0100;e\u171A\u171Cl\u0180;bh\u1968\u1969\u196B\u405C;\u69C5sub;\u67C8\u016C\u1974\u197El\u0100;e\u1979\u197A\u6022t\xBB\u197Ap\u0180;Ee\u012F\u1985\u1987;\u6AAE\u0100;q\u06DC\u06DB\u0CE1\u19A7\0\u19E8\u1A11\u1A15\u1A32\0\u1A37\u1A50\0\0\u1AB4\0\0\u1AC1\0\0\u1B21\u1B2E\u1B4D\u1B52\0\u1BFD\0\u1C0C\u0180cpr\u19AD\u19B2\u19DDute;\u4107\u0300;abcds\u19BF\u19C0\u19C4\u19CA\u19D5\u19D9\u6229nd;\u6A44rcup;\u6A49\u0100au\u19CF\u19D2p;\u6A4Bp;\u6A47ot;\u6A40;\uC000\u2229\uFE00\u0100eo\u19E2\u19E5t;\u6041\xEE\u0693\u0200aeiu\u19F0\u19FB\u1A01\u1A05\u01F0\u19F5\0\u19F8s;\u6A4Don;\u410Ddil\u803B\xE7\u40E7rc;\u4109ps\u0100;s\u1A0C\u1A0D\u6A4Cm;\u6A50ot;\u410B\u0180dmn\u1A1B\u1A20\u1A26il\u80BB\xB8\u01ADptyv;\u69B2t\u8100\xA2;e\u1A2D\u1A2E\u40A2r\xE4\u01B2r;\uC000\u{1D520}\u0180cei\u1A3D\u1A40\u1A4Dy;\u4447ck\u0100;m\u1A47\u1A48\u6713ark\xBB\u1A48;\u43C7r\u0380;Ecefms\u1A5F\u1A60\u1A62\u1A6B\u1AA4\u1AAA\u1AAE\u65CB;\u69C3\u0180;el\u1A69\u1A6A\u1A6D\u42C6q;\u6257e\u0261\u1A74\0\0\u1A88rrow\u0100lr\u1A7C\u1A81eft;\u61BAight;\u61BB\u0280RSacd\u1A92\u1A94\u1A96\u1A9A\u1A9F\xBB\u0F47;\u64C8st;\u629Birc;\u629Aash;\u629Dnint;\u6A10id;\u6AEFcir;\u69C2ubs\u0100;u\u1ABB\u1ABC\u6663it\xBB\u1ABC\u02EC\u1AC7\u1AD4\u1AFA\0\u1B0Aon\u0100;e\u1ACD\u1ACE\u403A\u0100;q\xC7\xC6\u026D\u1AD9\0\0\u1AE2a\u0100;t\u1ADE\u1ADF\u402C;\u4040\u0180;fl\u1AE8\u1AE9\u1AEB\u6201\xEE\u1160e\u0100mx\u1AF1\u1AF6ent\xBB\u1AE9e\xF3\u024D\u01E7\u1AFE\0\u1B07\u0100;d\u12BB\u1B02ot;\u6A6Dn\xF4\u0246\u0180fry\u1B10\u1B14\u1B17;\uC000\u{1D554}o\xE4\u0254\u8100\xA9;s\u0155\u1B1Dr;\u6117\u0100ao\u1B25\u1B29rr;\u61B5ss;\u6717\u0100cu\u1B32\u1B37r;\uC000\u{1D4B8}\u0100bp\u1B3C\u1B44\u0100;e\u1B41\u1B42\u6ACF;\u6AD1\u0100;e\u1B49\u1B4A\u6AD0;\u6AD2dot;\u62EF\u0380delprvw\u1B60\u1B6C\u1B77\u1B82\u1BAC\u1BD4\u1BF9arr\u0100lr\u1B68\u1B6A;\u6938;\u6935\u0270\u1B72\0\0\u1B75r;\u62DEc;\u62DFarr\u0100;p\u1B7F\u1B80\u61B6;\u693D\u0300;bcdos\u1B8F\u1B90\u1B96\u1BA1\u1BA5\u1BA8\u622Arcap;\u6A48\u0100au\u1B9B\u1B9Ep;\u6A46p;\u6A4Aot;\u628Dr;\u6A45;\uC000\u222A\uFE00\u0200alrv\u1BB5\u1BBF\u1BDE\u1BE3rr\u0100;m\u1BBC\u1BBD\u61B7;\u693Cy\u0180evw\u1BC7\u1BD4\u1BD8q\u0270\u1BCE\0\0\u1BD2re\xE3\u1B73u\xE3\u1B75ee;\u62CEedge;\u62CFen\u803B\xA4\u40A4earrow\u0100lr\u1BEE\u1BF3eft\xBB\u1B80ight\xBB\u1BBDe\xE4\u1BDD\u0100ci\u1C01\u1C07onin\xF4\u01F7nt;\u6231lcty;\u632D\u0980AHabcdefhijlorstuwz\u1C38\u1C3B\u1C3F\u1C5D\u1C69\u1C75\u1C8A\u1C9E\u1CAC\u1CB7\u1CFB\u1CFF\u1D0D\u1D7B\u1D91\u1DAB\u1DBB\u1DC6\u1DCDr\xF2\u0381ar;\u6965\u0200glrs\u1C48\u1C4D\u1C52\u1C54ger;\u6020eth;\u6138\xF2\u1133h\u0100;v\u1C5A\u1C5B\u6010\xBB\u090A\u016B\u1C61\u1C67arow;\u690Fa\xE3\u0315\u0100ay\u1C6E\u1C73ron;\u410F;\u4434\u0180;ao\u0332\u1C7C\u1C84\u0100gr\u02BF\u1C81r;\u61CAtseq;\u6A77\u0180glm\u1C91\u1C94\u1C98\u803B\xB0\u40B0ta;\u43B4ptyv;\u69B1\u0100ir\u1CA3\u1CA8sht;\u697F;\uC000\u{1D521}ar\u0100lr\u1CB3\u1CB5\xBB\u08DC\xBB\u101E\u0280aegsv\u1CC2\u0378\u1CD6\u1CDC\u1CE0m\u0180;os\u0326\u1CCA\u1CD4nd\u0100;s\u0326\u1CD1uit;\u6666amma;\u43DDin;\u62F2\u0180;io\u1CE7\u1CE8\u1CF8\u40F7de\u8100\xF7;o\u1CE7\u1CF0ntimes;\u62C7n\xF8\u1CF7cy;\u4452c\u026F\u1D06\0\0\u1D0Arn;\u631Eop;\u630D\u0280lptuw\u1D18\u1D1D\u1D22\u1D49\u1D55lar;\u4024f;\uC000\u{1D555}\u0280;emps\u030B\u1D2D\u1D37\u1D3D\u1D42q\u0100;d\u0352\u1D33ot;\u6251inus;\u6238lus;\u6214quare;\u62A1blebarwedg\xE5\xFAn\u0180adh\u112E\u1D5D\u1D67ownarrow\xF3\u1C83arpoon\u0100lr\u1D72\u1D76ef\xF4\u1CB4igh\xF4\u1CB6\u0162\u1D7F\u1D85karo\xF7\u0F42\u026F\u1D8A\0\0\u1D8Ern;\u631Fop;\u630C\u0180cot\u1D98\u1DA3\u1DA6\u0100ry\u1D9D\u1DA1;\uC000\u{1D4B9};\u4455l;\u69F6rok;\u4111\u0100dr\u1DB0\u1DB4ot;\u62F1i\u0100;f\u1DBA\u1816\u65BF\u0100ah\u1DC0\u1DC3r\xF2\u0429a\xF2\u0FA6angle;\u69A6\u0100ci\u1DD2\u1DD5y;\u445Fgrarr;\u67FF\u0900Dacdefglmnopqrstux\u1E01\u1E09\u1E19\u1E38\u0578\u1E3C\u1E49\u1E61\u1E7E\u1EA5\u1EAF\u1EBD\u1EE1\u1F2A\u1F37\u1F44\u1F4E\u1F5A\u0100Do\u1E06\u1D34o\xF4\u1C89\u0100cs\u1E0E\u1E14ute\u803B\xE9\u40E9ter;\u6A6E\u0200aioy\u1E22\u1E27\u1E31\u1E36ron;\u411Br\u0100;c\u1E2D\u1E2E\u6256\u803B\xEA\u40EAlon;\u6255;\u444Dot;\u4117\u0100Dr\u1E41\u1E45ot;\u6252;\uC000\u{1D522}\u0180;rs\u1E50\u1E51\u1E57\u6A9Aave\u803B\xE8\u40E8\u0100;d\u1E5C\u1E5D\u6A96ot;\u6A98\u0200;ils\u1E6A\u1E6B\u1E72\u1E74\u6A99nters;\u63E7;\u6113\u0100;d\u1E79\u1E7A\u6A95ot;\u6A97\u0180aps\u1E85\u1E89\u1E97cr;\u4113ty\u0180;sv\u1E92\u1E93\u1E95\u6205et\xBB\u1E93p\u01001;\u1E9D\u1EA4\u0133\u1EA1\u1EA3;\u6004;\u6005\u6003\u0100gs\u1EAA\u1EAC;\u414Bp;\u6002\u0100gp\u1EB4\u1EB8on;\u4119f;\uC000\u{1D556}\u0180als\u1EC4\u1ECE\u1ED2r\u0100;s\u1ECA\u1ECB\u62D5l;\u69E3us;\u6A71i\u0180;lv\u1EDA\u1EDB\u1EDF\u43B5on\xBB\u1EDB;\u43F5\u0200csuv\u1EEA\u1EF3\u1F0B\u1F23\u0100io\u1EEF\u1E31rc\xBB\u1E2E\u0269\u1EF9\0\0\u1EFB\xED\u0548ant\u0100gl\u1F02\u1F06tr\xBB\u1E5Dess\xBB\u1E7A\u0180aei\u1F12\u1F16\u1F1Als;\u403Dst;\u625Fv\u0100;D\u0235\u1F20D;\u6A78parsl;\u69E5\u0100Da\u1F2F\u1F33ot;\u6253rr;\u6971\u0180cdi\u1F3E\u1F41\u1EF8r;\u612Fo\xF4\u0352\u0100ah\u1F49\u1F4B;\u43B7\u803B\xF0\u40F0\u0100mr\u1F53\u1F57l\u803B\xEB\u40EBo;\u60AC\u0180cip\u1F61\u1F64\u1F67l;\u4021s\xF4\u056E\u0100eo\u1F6C\u1F74ctatio\xEE\u0559nential\xE5\u0579\u09E1\u1F92\0\u1F9E\0\u1FA1\u1FA7\0\0\u1FC6\u1FCC\0\u1FD3\0\u1FE6\u1FEA\u2000\0\u2008\u205Allingdotse\xF1\u1E44y;\u4444male;\u6640\u0180ilr\u1FAD\u1FB3\u1FC1lig;\u8000\uFB03\u0269\u1FB9\0\0\u1FBDg;\u8000\uFB00ig;\u8000\uFB04;\uC000\u{1D523}lig;\u8000\uFB01lig;\uC000fj\u0180alt\u1FD9\u1FDC\u1FE1t;\u666Dig;\u8000\uFB02ns;\u65B1of;\u4192\u01F0\u1FEE\0\u1FF3f;\uC000\u{1D557}\u0100ak\u05BF\u1FF7\u0100;v\u1FFC\u1FFD\u62D4;\u6AD9artint;\u6A0D\u0100ao\u200C\u2055\u0100cs\u2011\u2052\u03B1\u201A\u2030\u2038\u2045\u2048\0\u2050\u03B2\u2022\u2025\u2027\u202A\u202C\0\u202E\u803B\xBD\u40BD;\u6153\u803B\xBC\u40BC;\u6155;\u6159;\u615B\u01B3\u2034\0\u2036;\u6154;\u6156\u02B4\u203E\u2041\0\0\u2043\u803B\xBE\u40BE;\u6157;\u615C5;\u6158\u01B6\u204C\0\u204E;\u615A;\u615D8;\u615El;\u6044wn;\u6322cr;\uC000\u{1D4BB}\u0880Eabcdefgijlnorstv\u2082\u2089\u209F\u20A5\u20B0\u20B4\u20F0\u20F5\u20FA\u20FF\u2103\u2112\u2138\u0317\u213E\u2152\u219E\u0100;l\u064D\u2087;\u6A8C\u0180cmp\u2090\u2095\u209Dute;\u41F5ma\u0100;d\u209C\u1CDA\u43B3;\u6A86reve;\u411F\u0100iy\u20AA\u20AErc;\u411D;\u4433ot;\u4121\u0200;lqs\u063E\u0642\u20BD\u20C9\u0180;qs\u063E\u064C\u20C4lan\xF4\u0665\u0200;cdl\u0665\u20D2\u20D5\u20E5c;\u6AA9ot\u0100;o\u20DC\u20DD\u6A80\u0100;l\u20E2\u20E3\u6A82;\u6A84\u0100;e\u20EA\u20ED\uC000\u22DB\uFE00s;\u6A94r;\uC000\u{1D524}\u0100;g\u0673\u061Bmel;\u6137cy;\u4453\u0200;Eaj\u065A\u210C\u210E\u2110;\u6A92;\u6AA5;\u6AA4\u0200Eaes\u211B\u211D\u2129\u2134;\u6269p\u0100;p\u2123\u2124\u6A8Arox\xBB\u2124\u0100;q\u212E\u212F\u6A88\u0100;q\u212E\u211Bim;\u62E7pf;\uC000\u{1D558}\u0100ci\u2143\u2146r;\u610Am\u0180;el\u066B\u214E\u2150;\u6A8E;\u6A90\u8300>;cdlqr\u05EE\u2160\u216A\u216E\u2173\u2179\u0100ci\u2165\u2167;\u6AA7r;\u6A7Aot;\u62D7Par;\u6995uest;\u6A7C\u0280adels\u2184\u216A\u2190\u0656\u219B\u01F0\u2189\0\u218Epro\xF8\u209Er;\u6978q\u0100lq\u063F\u2196les\xF3\u2088i\xED\u066B\u0100en\u21A3\u21ADrtneqq;\uC000\u2269\uFE00\xC5\u21AA\u0500Aabcefkosy\u21C4\u21C7\u21F1\u21F5\u21FA\u2218\u221D\u222F\u2268\u227Dr\xF2\u03A0\u0200ilmr\u21D0\u21D4\u21D7\u21DBrs\xF0\u1484f\xBB\u2024il\xF4\u06A9\u0100dr\u21E0\u21E4cy;\u444A\u0180;cw\u08F4\u21EB\u21EFir;\u6948;\u61ADar;\u610Firc;\u4125\u0180alr\u2201\u220E\u2213rts\u0100;u\u2209\u220A\u6665it\xBB\u220Alip;\u6026con;\u62B9r;\uC000\u{1D525}s\u0100ew\u2223\u2229arow;\u6925arow;\u6926\u0280amopr\u223A\u223E\u2243\u225E\u2263rr;\u61FFtht;\u623Bk\u0100lr\u2249\u2253eftarrow;\u61A9ightarrow;\u61AAf;\uC000\u{1D559}bar;\u6015\u0180clt\u226F\u2274\u2278r;\uC000\u{1D4BD}as\xE8\u21F4rok;\u4127\u0100bp\u2282\u2287ull;\u6043hen\xBB\u1C5B\u0AE1\u22A3\0\u22AA\0\u22B8\u22C5\u22CE\0\u22D5\u22F3\0\0\u22F8\u2322\u2367\u2362\u237F\0\u2386\u23AA\u23B4cute\u803B\xED\u40ED\u0180;iy\u0771\u22B0\u22B5rc\u803B\xEE\u40EE;\u4438\u0100cx\u22BC\u22BFy;\u4435cl\u803B\xA1\u40A1\u0100fr\u039F\u22C9;\uC000\u{1D526}rave\u803B\xEC\u40EC\u0200;ino\u073E\u22DD\u22E9\u22EE\u0100in\u22E2\u22E6nt;\u6A0Ct;\u622Dfin;\u69DCta;\u6129lig;\u4133\u0180aop\u22FE\u231A\u231D\u0180cgt\u2305\u2308\u2317r;\u412B\u0180elp\u071F\u230F\u2313in\xE5\u078Ear\xF4\u0720h;\u4131f;\u62B7ed;\u41B5\u0280;cfot\u04F4\u232C\u2331\u233D\u2341are;\u6105in\u0100;t\u2338\u2339\u621Eie;\u69DDdo\xF4\u2319\u0280;celp\u0757\u234C\u2350\u235B\u2361al;\u62BA\u0100gr\u2355\u2359er\xF3\u1563\xE3\u234Darhk;\u6A17rod;\u6A3C\u0200cgpt\u236F\u2372\u2376\u237By;\u4451on;\u412Ff;\uC000\u{1D55A}a;\u43B9uest\u803B\xBF\u40BF\u0100ci\u238A\u238Fr;\uC000\u{1D4BE}n\u0280;Edsv\u04F4\u239B\u239D\u23A1\u04F3;\u62F9ot;\u62F5\u0100;v\u23A6\u23A7\u62F4;\u62F3\u0100;i\u0777\u23AElde;\u4129\u01EB\u23B8\0\u23BCcy;\u4456l\u803B\xEF\u40EF\u0300cfmosu\u23CC\u23D7\u23DC\u23E1\u23E7\u23F5\u0100iy\u23D1\u23D5rc;\u4135;\u4439r;\uC000\u{1D527}ath;\u4237pf;\uC000\u{1D55B}\u01E3\u23EC\0\u23F1r;\uC000\u{1D4BF}rcy;\u4458kcy;\u4454\u0400acfghjos\u240B\u2416\u2422\u2427\u242D\u2431\u2435\u243Bppa\u0100;v\u2413\u2414\u43BA;\u43F0\u0100ey\u241B\u2420dil;\u4137;\u443Ar;\uC000\u{1D528}reen;\u4138cy;\u4445cy;\u445Cpf;\uC000\u{1D55C}cr;\uC000\u{1D4C0}\u0B80ABEHabcdefghjlmnoprstuv\u2470\u2481\u2486\u248D\u2491\u250E\u253D\u255A\u2580\u264E\u265E\u2665\u2679\u267D\u269A\u26B2\u26D8\u275D\u2768\u278B\u27C0\u2801\u2812\u0180art\u2477\u247A\u247Cr\xF2\u09C6\xF2\u0395ail;\u691Barr;\u690E\u0100;g\u0994\u248B;\u6A8Bar;\u6962\u0963\u24A5\0\u24AA\0\u24B1\0\0\0\0\0\u24B5\u24BA\0\u24C6\u24C8\u24CD\0\u24F9ute;\u413Amptyv;\u69B4ra\xEE\u084Cbda;\u43BBg\u0180;dl\u088E\u24C1\u24C3;\u6991\xE5\u088E;\u6A85uo\u803B\xAB\u40ABr\u0400;bfhlpst\u0899\u24DE\u24E6\u24E9\u24EB\u24EE\u24F1\u24F5\u0100;f\u089D\u24E3s;\u691Fs;\u691D\xEB\u2252p;\u61ABl;\u6939im;\u6973l;\u61A2\u0180;ae\u24FF\u2500\u2504\u6AABil;\u6919\u0100;s\u2509\u250A\u6AAD;\uC000\u2AAD\uFE00\u0180abr\u2515\u2519\u251Drr;\u690Crk;\u6772\u0100ak\u2522\u252Cc\u0100ek\u2528\u252A;\u407B;\u405B\u0100es\u2531\u2533;\u698Bl\u0100du\u2539\u253B;\u698F;\u698D\u0200aeuy\u2546\u254B\u2556\u2558ron;\u413E\u0100di\u2550\u2554il;\u413C\xEC\u08B0\xE2\u2529;\u443B\u0200cqrs\u2563\u2566\u256D\u257Da;\u6936uo\u0100;r\u0E19\u1746\u0100du\u2572\u2577har;\u6967shar;\u694Bh;\u61B2\u0280;fgqs\u258B\u258C\u0989\u25F3\u25FF\u6264t\u0280ahlrt\u2598\u25A4\u25B7\u25C2\u25E8rrow\u0100;t\u0899\u25A1a\xE9\u24F6arpoon\u0100du\u25AF\u25B4own\xBB\u045Ap\xBB\u0966eftarrows;\u61C7ight\u0180ahs\u25CD\u25D6\u25DErrow\u0100;s\u08F4\u08A7arpoon\xF3\u0F98quigarro\xF7\u21F0hreetimes;\u62CB\u0180;qs\u258B\u0993\u25FAlan\xF4\u09AC\u0280;cdgs\u09AC\u260A\u260D\u261D\u2628c;\u6AA8ot\u0100;o\u2614\u2615\u6A7F\u0100;r\u261A\u261B\u6A81;\u6A83\u0100;e\u2622\u2625\uC000\u22DA\uFE00s;\u6A93\u0280adegs\u2633\u2639\u263D\u2649\u264Bppro\xF8\u24C6ot;\u62D6q\u0100gq\u2643\u2645\xF4\u0989gt\xF2\u248C\xF4\u099Bi\xED\u09B2\u0180ilr\u2655\u08E1\u265Asht;\u697C;\uC000\u{1D529}\u0100;E\u099C\u2663;\u6A91\u0161\u2669\u2676r\u0100du\u25B2\u266E\u0100;l\u0965\u2673;\u696Alk;\u6584cy;\u4459\u0280;acht\u0A48\u2688\u268B\u2691\u2696r\xF2\u25C1orne\xF2\u1D08ard;\u696Bri;\u65FA\u0100io\u269F\u26A4dot;\u4140ust\u0100;a\u26AC\u26AD\u63B0che\xBB\u26AD\u0200Eaes\u26BB\u26BD\u26C9\u26D4;\u6268p\u0100;p\u26C3\u26C4\u6A89rox\xBB\u26C4\u0100;q\u26CE\u26CF\u6A87\u0100;q\u26CE\u26BBim;\u62E6\u0400abnoptwz\u26E9\u26F4\u26F7\u271A\u272F\u2741\u2747\u2750\u0100nr\u26EE\u26F1g;\u67ECr;\u61FDr\xEB\u08C1g\u0180lmr\u26FF\u270D\u2714eft\u0100ar\u09E6\u2707ight\xE1\u09F2apsto;\u67FCight\xE1\u09FDparrow\u0100lr\u2725\u2729ef\xF4\u24EDight;\u61AC\u0180afl\u2736\u2739\u273Dr;\u6985;\uC000\u{1D55D}us;\u6A2Dimes;\u6A34\u0161\u274B\u274Fst;\u6217\xE1\u134E\u0180;ef\u2757\u2758\u1800\u65CAnge\xBB\u2758ar\u0100;l\u2764\u2765\u4028t;\u6993\u0280achmt\u2773\u2776\u277C\u2785\u2787r\xF2\u08A8orne\xF2\u1D8Car\u0100;d\u0F98\u2783;\u696D;\u600Eri;\u62BF\u0300achiqt\u2798\u279D\u0A40\u27A2\u27AE\u27BBquo;\u6039r;\uC000\u{1D4C1}m\u0180;eg\u09B2\u27AA\u27AC;\u6A8D;\u6A8F\u0100bu\u252A\u27B3o\u0100;r\u0E1F\u27B9;\u601Arok;\u4142\u8400<;cdhilqr\u082B\u27D2\u2639\u27DC\u27E0\u27E5\u27EA\u27F0\u0100ci\u27D7\u27D9;\u6AA6r;\u6A79re\xE5\u25F2mes;\u62C9arr;\u6976uest;\u6A7B\u0100Pi\u27F5\u27F9ar;\u6996\u0180;ef\u2800\u092D\u181B\u65C3r\u0100du\u2807\u280Dshar;\u694Ahar;\u6966\u0100en\u2817\u2821rtneqq;\uC000\u2268\uFE00\xC5\u281E\u0700Dacdefhilnopsu\u2840\u2845\u2882\u288E\u2893\u28A0\u28A5\u28A8\u28DA\u28E2\u28E4\u0A83\u28F3\u2902Dot;\u623A\u0200clpr\u284E\u2852\u2863\u287Dr\u803B\xAF\u40AF\u0100et\u2857\u2859;\u6642\u0100;e\u285E\u285F\u6720se\xBB\u285F\u0100;s\u103B\u2868to\u0200;dlu\u103B\u2873\u2877\u287Bow\xEE\u048Cef\xF4\u090F\xF0\u13D1ker;\u65AE\u0100oy\u2887\u288Cmma;\u6A29;\u443Cash;\u6014asuredangle\xBB\u1626r;\uC000\u{1D52A}o;\u6127\u0180cdn\u28AF\u28B4\u28C9ro\u803B\xB5\u40B5\u0200;acd\u1464\u28BD\u28C0\u28C4s\xF4\u16A7ir;\u6AF0ot\u80BB\xB7\u01B5us\u0180;bd\u28D2\u1903\u28D3\u6212\u0100;u\u1D3C\u28D8;\u6A2A\u0163\u28DE\u28E1p;\u6ADB\xF2\u2212\xF0\u0A81\u0100dp\u28E9\u28EEels;\u62A7f;\uC000\u{1D55E}\u0100ct\u28F8\u28FDr;\uC000\u{1D4C2}pos\xBB\u159D\u0180;lm\u2909\u290A\u290D\u43BCtimap;\u62B8\u0C00GLRVabcdefghijlmoprstuvw\u2942\u2953\u297E\u2989\u2998\u29DA\u29E9\u2A15\u2A1A\u2A58\u2A5D\u2A83\u2A95\u2AA4\u2AA8\u2B04\u2B07\u2B44\u2B7F\u2BAE\u2C34\u2C67\u2C7C\u2CE9\u0100gt\u2947\u294B;\uC000\u22D9\u0338\u0100;v\u2950\u0BCF\uC000\u226B\u20D2\u0180elt\u295A\u2972\u2976ft\u0100ar\u2961\u2967rrow;\u61CDightarrow;\u61CE;\uC000\u22D8\u0338\u0100;v\u297B\u0C47\uC000\u226A\u20D2ightarrow;\u61CF\u0100Dd\u298E\u2993ash;\u62AFash;\u62AE\u0280bcnpt\u29A3\u29A7\u29AC\u29B1\u29CCla\xBB\u02DEute;\u4144g;\uC000\u2220\u20D2\u0280;Eiop\u0D84\u29BC\u29C0\u29C5\u29C8;\uC000\u2A70\u0338d;\uC000\u224B\u0338s;\u4149ro\xF8\u0D84ur\u0100;a\u29D3\u29D4\u666El\u0100;s\u29D3\u0B38\u01F3\u29DF\0\u29E3p\u80BB\xA0\u0B37mp\u0100;e\u0BF9\u0C00\u0280aeouy\u29F4\u29FE\u2A03\u2A10\u2A13\u01F0\u29F9\0\u29FB;\u6A43on;\u4148dil;\u4146ng\u0100;d\u0D7E\u2A0Aot;\uC000\u2A6D\u0338p;\u6A42;\u443Dash;\u6013\u0380;Aadqsx\u0B92\u2A29\u2A2D\u2A3B\u2A41\u2A45\u2A50rr;\u61D7r\u0100hr\u2A33\u2A36k;\u6924\u0100;o\u13F2\u13F0ot;\uC000\u2250\u0338ui\xF6\u0B63\u0100ei\u2A4A\u2A4Ear;\u6928\xED\u0B98ist\u0100;s\u0BA0\u0B9Fr;\uC000\u{1D52B}\u0200Eest\u0BC5\u2A66\u2A79\u2A7C\u0180;qs\u0BBC\u2A6D\u0BE1\u0180;qs\u0BBC\u0BC5\u2A74lan\xF4\u0BE2i\xED\u0BEA\u0100;r\u0BB6\u2A81\xBB\u0BB7\u0180Aap\u2A8A\u2A8D\u2A91r\xF2\u2971rr;\u61AEar;\u6AF2\u0180;sv\u0F8D\u2A9C\u0F8C\u0100;d\u2AA1\u2AA2\u62FC;\u62FAcy;\u445A\u0380AEadest\u2AB7\u2ABA\u2ABE\u2AC2\u2AC5\u2AF6\u2AF9r\xF2\u2966;\uC000\u2266\u0338rr;\u619Ar;\u6025\u0200;fqs\u0C3B\u2ACE\u2AE3\u2AEFt\u0100ar\u2AD4\u2AD9rro\xF7\u2AC1ightarro\xF7\u2A90\u0180;qs\u0C3B\u2ABA\u2AEAlan\xF4\u0C55\u0100;s\u0C55\u2AF4\xBB\u0C36i\xED\u0C5D\u0100;r\u0C35\u2AFEi\u0100;e\u0C1A\u0C25i\xE4\u0D90\u0100pt\u2B0C\u2B11f;\uC000\u{1D55F}\u8180\xAC;in\u2B19\u2B1A\u2B36\u40ACn\u0200;Edv\u0B89\u2B24\u2B28\u2B2E;\uC000\u22F9\u0338ot;\uC000\u22F5\u0338\u01E1\u0B89\u2B33\u2B35;\u62F7;\u62F6i\u0100;v\u0CB8\u2B3C\u01E1\u0CB8\u2B41\u2B43;\u62FE;\u62FD\u0180aor\u2B4B\u2B63\u2B69r\u0200;ast\u0B7B\u2B55\u2B5A\u2B5Flle\xEC\u0B7Bl;\uC000\u2AFD\u20E5;\uC000\u2202\u0338lint;\u6A14\u0180;ce\u0C92\u2B70\u2B73u\xE5\u0CA5\u0100;c\u0C98\u2B78\u0100;e\u0C92\u2B7D\xF1\u0C98\u0200Aait\u2B88\u2B8B\u2B9D\u2BA7r\xF2\u2988rr\u0180;cw\u2B94\u2B95\u2B99\u619B;\uC000\u2933\u0338;\uC000\u219D\u0338ghtarrow\xBB\u2B95ri\u0100;e\u0CCB\u0CD6\u0380chimpqu\u2BBD\u2BCD\u2BD9\u2B04\u0B78\u2BE4\u2BEF\u0200;cer\u0D32\u2BC6\u0D37\u2BC9u\xE5\u0D45;\uC000\u{1D4C3}ort\u026D\u2B05\0\0\u2BD6ar\xE1\u2B56m\u0100;e\u0D6E\u2BDF\u0100;q\u0D74\u0D73su\u0100bp\u2BEB\u2BED\xE5\u0CF8\xE5\u0D0B\u0180bcp\u2BF6\u2C11\u2C19\u0200;Ees\u2BFF\u2C00\u0D22\u2C04\u6284;\uC000\u2AC5\u0338et\u0100;e\u0D1B\u2C0Bq\u0100;q\u0D23\u2C00c\u0100;e\u0D32\u2C17\xF1\u0D38\u0200;Ees\u2C22\u2C23\u0D5F\u2C27\u6285;\uC000\u2AC6\u0338et\u0100;e\u0D58\u2C2Eq\u0100;q\u0D60\u2C23\u0200gilr\u2C3D\u2C3F\u2C45\u2C47\xEC\u0BD7lde\u803B\xF1\u40F1\xE7\u0C43iangle\u0100lr\u2C52\u2C5Ceft\u0100;e\u0C1A\u2C5A\xF1\u0C26ight\u0100;e\u0CCB\u2C65\xF1\u0CD7\u0100;m\u2C6C\u2C6D\u43BD\u0180;es\u2C74\u2C75\u2C79\u4023ro;\u6116p;\u6007\u0480DHadgilrs\u2C8F\u2C94\u2C99\u2C9E\u2CA3\u2CB0\u2CB6\u2CD3\u2CE3ash;\u62ADarr;\u6904p;\uC000\u224D\u20D2ash;\u62AC\u0100et\u2CA8\u2CAC;\uC000\u2265\u20D2;\uC000>\u20D2nfin;\u69DE\u0180Aet\u2CBD\u2CC1\u2CC5rr;\u6902;\uC000\u2264\u20D2\u0100;r\u2CCA\u2CCD\uC000<\u20D2ie;\uC000\u22B4\u20D2\u0100At\u2CD8\u2CDCrr;\u6903rie;\uC000\u22B5\u20D2im;\uC000\u223C\u20D2\u0180Aan\u2CF0\u2CF4\u2D02rr;\u61D6r\u0100hr\u2CFA\u2CFDk;\u6923\u0100;o\u13E7\u13E5ear;\u6927\u1253\u1A95\0\0\0\0\0\0\0\0\0\0\0\0\0\u2D2D\0\u2D38\u2D48\u2D60\u2D65\u2D72\u2D84\u1B07\0\0\u2D8D\u2DAB\0\u2DC8\u2DCE\0\u2DDC\u2E19\u2E2B\u2E3E\u2E43\u0100cs\u2D31\u1A97ute\u803B\xF3\u40F3\u0100iy\u2D3C\u2D45r\u0100;c\u1A9E\u2D42\u803B\xF4\u40F4;\u443E\u0280abios\u1AA0\u2D52\u2D57\u01C8\u2D5Alac;\u4151v;\u6A38old;\u69BClig;\u4153\u0100cr\u2D69\u2D6Dir;\u69BF;\uC000\u{1D52C}\u036F\u2D79\0\0\u2D7C\0\u2D82n;\u42DBave\u803B\xF2\u40F2;\u69C1\u0100bm\u2D88\u0DF4ar;\u69B5\u0200acit\u2D95\u2D98\u2DA5\u2DA8r\xF2\u1A80\u0100ir\u2D9D\u2DA0r;\u69BEoss;\u69BBn\xE5\u0E52;\u69C0\u0180aei\u2DB1\u2DB5\u2DB9cr;\u414Dga;\u43C9\u0180cdn\u2DC0\u2DC5\u01CDron;\u43BF;\u69B6pf;\uC000\u{1D560}\u0180ael\u2DD4\u2DD7\u01D2r;\u69B7rp;\u69B9\u0380;adiosv\u2DEA\u2DEB\u2DEE\u2E08\u2E0D\u2E10\u2E16\u6228r\xF2\u1A86\u0200;efm\u2DF7\u2DF8\u2E02\u2E05\u6A5Dr\u0100;o\u2DFE\u2DFF\u6134f\xBB\u2DFF\u803B\xAA\u40AA\u803B\xBA\u40BAgof;\u62B6r;\u6A56lope;\u6A57;\u6A5B\u0180clo\u2E1F\u2E21\u2E27\xF2\u2E01ash\u803B\xF8\u40F8l;\u6298i\u016C\u2E2F\u2E34de\u803B\xF5\u40F5es\u0100;a\u01DB\u2E3As;\u6A36ml\u803B\xF6\u40F6bar;\u633D\u0AE1\u2E5E\0\u2E7D\0\u2E80\u2E9D\0\u2EA2\u2EB9\0\0\u2ECB\u0E9C\0\u2F13\0\0\u2F2B\u2FBC\0\u2FC8r\u0200;ast\u0403\u2E67\u2E72\u0E85\u8100\xB6;l\u2E6D\u2E6E\u40B6le\xEC\u0403\u0269\u2E78\0\0\u2E7Bm;\u6AF3;\u6AFDy;\u443Fr\u0280cimpt\u2E8B\u2E8F\u2E93\u1865\u2E97nt;\u4025od;\u402Eil;\u6030enk;\u6031r;\uC000\u{1D52D}\u0180imo\u2EA8\u2EB0\u2EB4\u0100;v\u2EAD\u2EAE\u43C6;\u43D5ma\xF4\u0A76ne;\u660E\u0180;tv\u2EBF\u2EC0\u2EC8\u43C0chfork\xBB\u1FFD;\u43D6\u0100au\u2ECF\u2EDFn\u0100ck\u2ED5\u2EDDk\u0100;h\u21F4\u2EDB;\u610E\xF6\u21F4s\u0480;abcdemst\u2EF3\u2EF4\u1908\u2EF9\u2EFD\u2F04\u2F06\u2F0A\u2F0E\u402Bcir;\u6A23ir;\u6A22\u0100ou\u1D40\u2F02;\u6A25;\u6A72n\u80BB\xB1\u0E9Dim;\u6A26wo;\u6A27\u0180ipu\u2F19\u2F20\u2F25ntint;\u6A15f;\uC000\u{1D561}nd\u803B\xA3\u40A3\u0500;Eaceinosu\u0EC8\u2F3F\u2F41\u2F44\u2F47\u2F81\u2F89\u2F92\u2F7E\u2FB6;\u6AB3p;\u6AB7u\xE5\u0ED9\u0100;c\u0ECE\u2F4C\u0300;acens\u0EC8\u2F59\u2F5F\u2F66\u2F68\u2F7Eppro\xF8\u2F43urlye\xF1\u0ED9\xF1\u0ECE\u0180aes\u2F6F\u2F76\u2F7Approx;\u6AB9qq;\u6AB5im;\u62E8i\xED\u0EDFme\u0100;s\u2F88\u0EAE\u6032\u0180Eas\u2F78\u2F90\u2F7A\xF0\u2F75\u0180dfp\u0EEC\u2F99\u2FAF\u0180als\u2FA0\u2FA5\u2FAAlar;\u632Eine;\u6312urf;\u6313\u0100;t\u0EFB\u2FB4\xEF\u0EFBrel;\u62B0\u0100ci\u2FC0\u2FC5r;\uC000\u{1D4C5};\u43C8ncsp;\u6008\u0300fiopsu\u2FDA\u22E2\u2FDF\u2FE5\u2FEB\u2FF1r;\uC000\u{1D52E}pf;\uC000\u{1D562}rime;\u6057cr;\uC000\u{1D4C6}\u0180aeo\u2FF8\u3009\u3013t\u0100ei\u2FFE\u3005rnion\xF3\u06B0nt;\u6A16st\u0100;e\u3010\u3011\u403F\xF1\u1F19\xF4\u0F14\u0A80ABHabcdefhilmnoprstux\u3040\u3051\u3055\u3059\u30E0\u310E\u312B\u3147\u3162\u3172\u318E\u3206\u3215\u3224\u3229\u3258\u326E\u3272\u3290\u32B0\u32B7\u0180art\u3047\u304A\u304Cr\xF2\u10B3\xF2\u03DDail;\u691Car\xF2\u1C65ar;\u6964\u0380cdenqrt\u3068\u3075\u3078\u307F\u308F\u3094\u30CC\u0100eu\u306D\u3071;\uC000\u223D\u0331te;\u4155i\xE3\u116Emptyv;\u69B3g\u0200;del\u0FD1\u3089\u308B\u308D;\u6992;\u69A5\xE5\u0FD1uo\u803B\xBB\u40BBr\u0580;abcfhlpstw\u0FDC\u30AC\u30AF\u30B7\u30B9\u30BC\u30BE\u30C0\u30C3\u30C7\u30CAp;\u6975\u0100;f\u0FE0\u30B4s;\u6920;\u6933s;\u691E\xEB\u225D\xF0\u272El;\u6945im;\u6974l;\u61A3;\u619D\u0100ai\u30D1\u30D5il;\u691Ao\u0100;n\u30DB\u30DC\u6236al\xF3\u0F1E\u0180abr\u30E7\u30EA\u30EEr\xF2\u17E5rk;\u6773\u0100ak\u30F3\u30FDc\u0100ek\u30F9\u30FB;\u407D;\u405D\u0100es\u3102\u3104;\u698Cl\u0100du\u310A\u310C;\u698E;\u6990\u0200aeuy\u3117\u311C\u3127\u3129ron;\u4159\u0100di\u3121\u3125il;\u4157\xEC\u0FF2\xE2\u30FA;\u4440\u0200clqs\u3134\u3137\u313D\u3144a;\u6937dhar;\u6969uo\u0100;r\u020E\u020Dh;\u61B3\u0180acg\u314E\u315F\u0F44l\u0200;ips\u0F78\u3158\u315B\u109Cn\xE5\u10BBar\xF4\u0FA9t;\u65AD\u0180ilr\u3169\u1023\u316Esht;\u697D;\uC000\u{1D52F}\u0100ao\u3177\u3186r\u0100du\u317D\u317F\xBB\u047B\u0100;l\u1091\u3184;\u696C\u0100;v\u318B\u318C\u43C1;\u43F1\u0180gns\u3195\u31F9\u31FCht\u0300ahlrst\u31A4\u31B0\u31C2\u31D8\u31E4\u31EErrow\u0100;t\u0FDC\u31ADa\xE9\u30C8arpoon\u0100du\u31BB\u31BFow\xEE\u317Ep\xBB\u1092eft\u0100ah\u31CA\u31D0rrow\xF3\u0FEAarpoon\xF3\u0551ightarrows;\u61C9quigarro\xF7\u30CBhreetimes;\u62CCg;\u42DAingdotse\xF1\u1F32\u0180ahm\u320D\u3210\u3213r\xF2\u0FEAa\xF2\u0551;\u600Foust\u0100;a\u321E\u321F\u63B1che\xBB\u321Fmid;\u6AEE\u0200abpt\u3232\u323D\u3240\u3252\u0100nr\u3237\u323Ag;\u67EDr;\u61FEr\xEB\u1003\u0180afl\u3247\u324A\u324Er;\u6986;\uC000\u{1D563}us;\u6A2Eimes;\u6A35\u0100ap\u325D\u3267r\u0100;g\u3263\u3264\u4029t;\u6994olint;\u6A12ar\xF2\u31E3\u0200achq\u327B\u3280\u10BC\u3285quo;\u603Ar;\uC000\u{1D4C7}\u0100bu\u30FB\u328Ao\u0100;r\u0214\u0213\u0180hir\u3297\u329B\u32A0re\xE5\u31F8mes;\u62CAi\u0200;efl\u32AA\u1059\u1821\u32AB\u65B9tri;\u69CEluhar;\u6968;\u611E\u0D61\u32D5\u32DB\u32DF\u332C\u3338\u3371\0\u337A\u33A4\0\0\u33EC\u33F0\0\u3428\u3448\u345A\u34AD\u34B1\u34CA\u34F1\0\u3616\0\0\u3633cute;\u415Bqu\xEF\u27BA\u0500;Eaceinpsy\u11ED\u32F3\u32F5\u32FF\u3302\u330B\u330F\u331F\u3326\u3329;\u6AB4\u01F0\u32FA\0\u32FC;\u6AB8on;\u4161u\xE5\u11FE\u0100;d\u11F3\u3307il;\u415Frc;\u415D\u0180Eas\u3316\u3318\u331B;\u6AB6p;\u6ABAim;\u62E9olint;\u6A13i\xED\u1204;\u4441ot\u0180;be\u3334\u1D47\u3335\u62C5;\u6A66\u0380Aacmstx\u3346\u334A\u3357\u335B\u335E\u3363\u336Drr;\u61D8r\u0100hr\u3350\u3352\xEB\u2228\u0100;o\u0A36\u0A34t\u803B\xA7\u40A7i;\u403Bwar;\u6929m\u0100in\u3369\xF0nu\xF3\xF1t;\u6736r\u0100;o\u3376\u2055\uC000\u{1D530}\u0200acoy\u3382\u3386\u3391\u33A0rp;\u666F\u0100hy\u338B\u338Fcy;\u4449;\u4448rt\u026D\u3399\0\0\u339Ci\xE4\u1464ara\xEC\u2E6F\u803B\xAD\u40AD\u0100gm\u33A8\u33B4ma\u0180;fv\u33B1\u33B2\u33B2\u43C3;\u43C2\u0400;deglnpr\u12AB\u33C5\u33C9\u33CE\u33D6\u33DE\u33E1\u33E6ot;\u6A6A\u0100;q\u12B1\u12B0\u0100;E\u33D3\u33D4\u6A9E;\u6AA0\u0100;E\u33DB\u33DC\u6A9D;\u6A9Fe;\u6246lus;\u6A24arr;\u6972ar\xF2\u113D\u0200aeit\u33F8\u3408\u340F\u3417\u0100ls\u33FD\u3404lsetm\xE9\u336Ahp;\u6A33parsl;\u69E4\u0100dl\u1463\u3414e;\u6323\u0100;e\u341C\u341D\u6AAA\u0100;s\u3422\u3423\u6AAC;\uC000\u2AAC\uFE00\u0180flp\u342E\u3433\u3442tcy;\u444C\u0100;b\u3438\u3439\u402F\u0100;a\u343E\u343F\u69C4r;\u633Ff;\uC000\u{1D564}a\u0100dr\u344D\u0402es\u0100;u\u3454\u3455\u6660it\xBB\u3455\u0180csu\u3460\u3479\u349F\u0100au\u3465\u346Fp\u0100;s\u1188\u346B;\uC000\u2293\uFE00p\u0100;s\u11B4\u3475;\uC000\u2294\uFE00u\u0100bp\u347F\u348F\u0180;es\u1197\u119C\u3486et\u0100;e\u1197\u348D\xF1\u119D\u0180;es\u11A8\u11AD\u3496et\u0100;e\u11A8\u349D\xF1\u11AE\u0180;af\u117B\u34A6\u05B0r\u0165\u34AB\u05B1\xBB\u117Car\xF2\u1148\u0200cemt\u34B9\u34BE\u34C2\u34C5r;\uC000\u{1D4C8}tm\xEE\xF1i\xEC\u3415ar\xE6\u11BE\u0100ar\u34CE\u34D5r\u0100;f\u34D4\u17BF\u6606\u0100an\u34DA\u34EDight\u0100ep\u34E3\u34EApsilo\xEE\u1EE0h\xE9\u2EAFs\xBB\u2852\u0280bcmnp\u34FB\u355E\u1209\u358B\u358E\u0480;Edemnprs\u350E\u350F\u3511\u3515\u351E\u3523\u352C\u3531\u3536\u6282;\u6AC5ot;\u6ABD\u0100;d\u11DA\u351Aot;\u6AC3ult;\u6AC1\u0100Ee\u3528\u352A;\u6ACB;\u628Alus;\u6ABFarr;\u6979\u0180eiu\u353D\u3552\u3555t\u0180;en\u350E\u3545\u354Bq\u0100;q\u11DA\u350Feq\u0100;q\u352B\u3528m;\u6AC7\u0100bp\u355A\u355C;\u6AD5;\u6AD3c\u0300;acens\u11ED\u356C\u3572\u3579\u357B\u3326ppro\xF8\u32FAurlye\xF1\u11FE\xF1\u11F3\u0180aes\u3582\u3588\u331Bppro\xF8\u331Aq\xF1\u3317g;\u666A\u0680123;Edehlmnps\u35A9\u35AC\u35AF\u121C\u35B2\u35B4\u35C0\u35C9\u35D5\u35DA\u35DF\u35E8\u35ED\u803B\xB9\u40B9\u803B\xB2\u40B2\u803B\xB3\u40B3;\u6AC6\u0100os\u35B9\u35BCt;\u6ABEub;\u6AD8\u0100;d\u1222\u35C5ot;\u6AC4s\u0100ou\u35CF\u35D2l;\u67C9b;\u6AD7arr;\u697Bult;\u6AC2\u0100Ee\u35E4\u35E6;\u6ACC;\u628Blus;\u6AC0\u0180eiu\u35F4\u3609\u360Ct\u0180;en\u121C\u35FC\u3602q\u0100;q\u1222\u35B2eq\u0100;q\u35E7\u35E4m;\u6AC8\u0100bp\u3611\u3613;\u6AD4;\u6AD6\u0180Aan\u361C\u3620\u362Drr;\u61D9r\u0100hr\u3626\u3628\xEB\u222E\u0100;o\u0A2B\u0A29war;\u692Alig\u803B\xDF\u40DF\u0BE1\u3651\u365D\u3660\u12CE\u3673\u3679\0\u367E\u36C2\0\0\0\0\0\u36DB\u3703\0\u3709\u376C\0\0\0\u3787\u0272\u3656\0\0\u365Bget;\u6316;\u43C4r\xEB\u0E5F\u0180aey\u3666\u366B\u3670ron;\u4165dil;\u4163;\u4442lrec;\u6315r;\uC000\u{1D531}\u0200eiko\u3686\u369D\u36B5\u36BC\u01F2\u368B\0\u3691e\u01004f\u1284\u1281a\u0180;sv\u3698\u3699\u369B\u43B8ym;\u43D1\u0100cn\u36A2\u36B2k\u0100as\u36A8\u36AEppro\xF8\u12C1im\xBB\u12ACs\xF0\u129E\u0100as\u36BA\u36AE\xF0\u12C1rn\u803B\xFE\u40FE\u01EC\u031F\u36C6\u22E7es\u8180\xD7;bd\u36CF\u36D0\u36D8\u40D7\u0100;a\u190F\u36D5r;\u6A31;\u6A30\u0180eps\u36E1\u36E3\u3700\xE1\u2A4D\u0200;bcf\u0486\u36EC\u36F0\u36F4ot;\u6336ir;\u6AF1\u0100;o\u36F9\u36FC\uC000\u{1D565}rk;\u6ADA\xE1\u3362rime;\u6034\u0180aip\u370F\u3712\u3764d\xE5\u1248\u0380adempst\u3721\u374D\u3740\u3751\u3757\u375C\u375Fngle\u0280;dlqr\u3730\u3731\u3736\u3740\u3742\u65B5own\xBB\u1DBBeft\u0100;e\u2800\u373E\xF1\u092E;\u625Cight\u0100;e\u32AA\u374B\xF1\u105Aot;\u65ECinus;\u6A3Alus;\u6A39b;\u69CDime;\u6A3Bezium;\u63E2\u0180cht\u3772\u377D\u3781\u0100ry\u3777\u377B;\uC000\u{1D4C9};\u4446cy;\u445Brok;\u4167\u0100io\u378B\u378Ex\xF4\u1777head\u0100lr\u3797\u37A0eftarro\xF7\u084Fightarrow\xBB\u0F5D\u0900AHabcdfghlmoprstuw\u37D0\u37D3\u37D7\u37E4\u37F0\u37FC\u380E\u381C\u3823\u3834\u3851\u385D\u386B\u38A9\u38CC\u38D2\u38EA\u38F6r\xF2\u03EDar;\u6963\u0100cr\u37DC\u37E2ute\u803B\xFA\u40FA\xF2\u1150r\u01E3\u37EA\0\u37EDy;\u445Eve;\u416D\u0100iy\u37F5\u37FArc\u803B\xFB\u40FB;\u4443\u0180abh\u3803\u3806\u380Br\xF2\u13ADlac;\u4171a\xF2\u13C3\u0100ir\u3813\u3818sht;\u697E;\uC000\u{1D532}rave\u803B\xF9\u40F9\u0161\u3827\u3831r\u0100lr\u382C\u382E\xBB\u0957\xBB\u1083lk;\u6580\u0100ct\u3839\u384D\u026F\u383F\0\0\u384Arn\u0100;e\u3845\u3846\u631Cr\xBB\u3846op;\u630Fri;\u65F8\u0100al\u3856\u385Acr;\u416B\u80BB\xA8\u0349\u0100gp\u3862\u3866on;\u4173f;\uC000\u{1D566}\u0300adhlsu\u114B\u3878\u387D\u1372\u3891\u38A0own\xE1\u13B3arpoon\u0100lr\u3888\u388Cef\xF4\u382Digh\xF4\u382Fi\u0180;hl\u3899\u389A\u389C\u43C5\xBB\u13FAon\xBB\u389Aparrows;\u61C8\u0180cit\u38B0\u38C4\u38C8\u026F\u38B6\0\0\u38C1rn\u0100;e\u38BC\u38BD\u631Dr\xBB\u38BDop;\u630Eng;\u416Fri;\u65F9cr;\uC000\u{1D4CA}\u0180dir\u38D9\u38DD\u38E2ot;\u62F0lde;\u4169i\u0100;f\u3730\u38E8\xBB\u1813\u0100am\u38EF\u38F2r\xF2\u38A8l\u803B\xFC\u40FCangle;\u69A7\u0780ABDacdeflnoprsz\u391C\u391F\u3929\u392D\u39B5\u39B8\u39BD\u39DF\u39E4\u39E8\u39F3\u39F9\u39FD\u3A01\u3A20r\xF2\u03F7ar\u0100;v\u3926\u3927\u6AE8;\u6AE9as\xE8\u03E1\u0100nr\u3932\u3937grt;\u699C\u0380eknprst\u34E3\u3946\u394B\u3952\u395D\u3964\u3996app\xE1\u2415othin\xE7\u1E96\u0180hir\u34EB\u2EC8\u3959op\xF4\u2FB5\u0100;h\u13B7\u3962\xEF\u318D\u0100iu\u3969\u396Dgm\xE1\u33B3\u0100bp\u3972\u3984setneq\u0100;q\u397D\u3980\uC000\u228A\uFE00;\uC000\u2ACB\uFE00setneq\u0100;q\u398F\u3992\uC000\u228B\uFE00;\uC000\u2ACC\uFE00\u0100hr\u399B\u399Fet\xE1\u369Ciangle\u0100lr\u39AA\u39AFeft\xBB\u0925ight\xBB\u1051y;\u4432ash\xBB\u1036\u0180elr\u39C4\u39D2\u39D7\u0180;be\u2DEA\u39CB\u39CFar;\u62BBq;\u625Alip;\u62EE\u0100bt\u39DC\u1468a\xF2\u1469r;\uC000\u{1D533}tr\xE9\u39AEsu\u0100bp\u39EF\u39F1\xBB\u0D1C\xBB\u0D59pf;\uC000\u{1D567}ro\xF0\u0EFBtr\xE9\u39B4\u0100cu\u3A06\u3A0Br;\uC000\u{1D4CB}\u0100bp\u3A10\u3A18n\u0100Ee\u3980\u3A16\xBB\u397En\u0100Ee\u3992\u3A1E\xBB\u3990igzag;\u699A\u0380cefoprs\u3A36\u3A3B\u3A56\u3A5B\u3A54\u3A61\u3A6Airc;\u4175\u0100di\u3A40\u3A51\u0100bg\u3A45\u3A49ar;\u6A5Fe\u0100;q\u15FA\u3A4F;\u6259erp;\u6118r;\uC000\u{1D534}pf;\uC000\u{1D568}\u0100;e\u1479\u3A66at\xE8\u1479cr;\uC000\u{1D4CC}\u0AE3\u178E\u3A87\0\u3A8B\0\u3A90\u3A9B\0\0\u3A9D\u3AA8\u3AAB\u3AAF\0\0\u3AC3\u3ACE\0\u3AD8\u17DC\u17DFtr\xE9\u17D1r;\uC000\u{1D535}\u0100Aa\u3A94\u3A97r\xF2\u03C3r\xF2\u09F6;\u43BE\u0100Aa\u3AA1\u3AA4r\xF2\u03B8r\xF2\u09EBa\xF0\u2713is;\u62FB\u0180dpt\u17A4\u3AB5\u3ABE\u0100fl\u3ABA\u17A9;\uC000\u{1D569}im\xE5\u17B2\u0100Aa\u3AC7\u3ACAr\xF2\u03CEr\xF2\u0A01\u0100cq\u3AD2\u17B8r;\uC000\u{1D4CD}\u0100pt\u17D6\u3ADCr\xE9\u17D4\u0400acefiosu\u3AF0\u3AFD\u3B08\u3B0C\u3B11\u3B15\u3B1B\u3B21c\u0100uy\u3AF6\u3AFBte\u803B\xFD\u40FD;\u444F\u0100iy\u3B02\u3B06rc;\u4177;\u444Bn\u803B\xA5\u40A5r;\uC000\u{1D536}cy;\u4457pf;\uC000\u{1D56A}cr;\uC000\u{1D4CE}\u0100cm\u3B26\u3B29y;\u444El\u803B\xFF\u40FF\u0500acdefhiosw\u3B42\u3B48\u3B54\u3B58\u3B64\u3B69\u3B6D\u3B74\u3B7A\u3B80cute;\u417A\u0100ay\u3B4D\u3B52ron;\u417E;\u4437ot;\u417C\u0100et\u3B5D\u3B61tr\xE6\u155Fa;\u43B6r;\uC000\u{1D537}cy;\u4436grarr;\u61DDpf;\uC000\u{1D56B}cr;\uC000\u{1D4CF}\u0100jn\u3B85\u3B87;\u600Dj;\u600C'
			.split("")
			.map((e) => e.charCodeAt(0))
	);
	var pi = new Uint16Array(
		"\u0200aglq	\x1B\u026D\0\0p;\u4026os;\u4027t;\u403Et;\u403Cuot;\u4022"
			.split("")
			.map((e) => e.charCodeAt(0))
	);
	var Eu,
		Ls = new Map([
			[0, 65533],
			[128, 8364],
			[130, 8218],
			[131, 402],
			[132, 8222],
			[133, 8230],
			[134, 8224],
			[135, 8225],
			[136, 710],
			[137, 8240],
			[138, 352],
			[139, 8249],
			[140, 338],
			[142, 381],
			[145, 8216],
			[146, 8217],
			[147, 8220],
			[148, 8221],
			[149, 8226],
			[150, 8211],
			[151, 8212],
			[152, 732],
			[153, 8482],
			[154, 353],
			[155, 8250],
			[156, 339],
			[158, 382],
			[159, 376],
		]),
		mu =
			(Eu = String.fromCodePoint) !== null && Eu !== void 0
				? Eu
				: function (e) {
						let t = "";
						return (
							e > 65535 &&
								((e -= 65536),
								(t += String.fromCharCode(((e >>> 10) & 1023) | 55296)),
								(e = 56320 | (e & 1023))),
							(t += String.fromCharCode(e)),
							t
						);
					};
	function Tu(e) {
		var t;
		return (e >= 55296 && e <= 57343) || e > 1114111
			? 65533
			: (t = Ls.get(e)) !== null && t !== void 0
				? t
				: e;
	}
	var J;
	(function (e) {
		(e[(e.NUM = 35)] = "NUM"),
			(e[(e.SEMI = 59)] = "SEMI"),
			(e[(e.EQUALS = 61)] = "EQUALS"),
			(e[(e.ZERO = 48)] = "ZERO"),
			(e[(e.NINE = 57)] = "NINE"),
			(e[(e.LOWER_A = 97)] = "LOWER_A"),
			(e[(e.LOWER_F = 102)] = "LOWER_F"),
			(e[(e.LOWER_X = 120)] = "LOWER_X"),
			(e[(e.LOWER_Z = 122)] = "LOWER_Z"),
			(e[(e.UPPER_A = 65)] = "UPPER_A"),
			(e[(e.UPPER_F = 70)] = "UPPER_F"),
			(e[(e.UPPER_Z = 90)] = "UPPER_Z");
	})(J || (J = {}));
	var ks = 32,
		he;
	(function (e) {
		(e[(e.VALUE_LENGTH = 49152)] = "VALUE_LENGTH"),
			(e[(e.BRANCH_LENGTH = 16256)] = "BRANCH_LENGTH"),
			(e[(e.JUMP_TABLE = 127)] = "JUMP_TABLE");
	})(he || (he = {}));
	function bu(e) {
		return e >= J.ZERO && e <= J.NINE;
	}
	function Rs(e) {
		return (
			(e >= J.UPPER_A && e <= J.UPPER_F) || (e >= J.LOWER_A && e <= J.LOWER_F)
		);
	}
	function Ps(e) {
		return (
			(e >= J.UPPER_A && e <= J.UPPER_Z) ||
			(e >= J.LOWER_A && e <= J.LOWER_Z) ||
			bu(e)
		);
	}
	function Os(e) {
		return e === J.EQUALS || Ps(e);
	}
	var z;
	(function (e) {
		(e[(e.EntityStart = 0)] = "EntityStart"),
			(e[(e.NumericStart = 1)] = "NumericStart"),
			(e[(e.NumericDecimal = 2)] = "NumericDecimal"),
			(e[(e.NumericHex = 3)] = "NumericHex"),
			(e[(e.NamedEntity = 4)] = "NamedEntity");
	})(z || (z = {}));
	var we;
	(function (e) {
		(e[(e.Legacy = 0)] = "Legacy"),
			(e[(e.Strict = 1)] = "Strict"),
			(e[(e.Attribute = 2)] = "Attribute");
	})(we || (we = {}));
	var Au = class {
		constructor(t, u, i) {
			(this.decodeTree = t),
				(this.emitCodePoint = u),
				(this.errors = i),
				(this.state = z.EntityStart),
				(this.consumed = 1),
				(this.result = 0),
				(this.treeIndex = 0),
				(this.excess = 1),
				(this.decodeMode = we.Strict);
		}
		startEntity(t) {
			(this.decodeMode = t),
				(this.state = z.EntityStart),
				(this.result = 0),
				(this.treeIndex = 0),
				(this.excess = 1),
				(this.consumed = 1);
		}
		write(t, u) {
			switch (this.state) {
				case z.EntityStart:
					return t.charCodeAt(u) === J.NUM
						? ((this.state = z.NumericStart),
							(this.consumed += 1),
							this.stateNumericStart(t, u + 1))
						: ((this.state = z.NamedEntity), this.stateNamedEntity(t, u));
				case z.NumericStart:
					return this.stateNumericStart(t, u);
				case z.NumericDecimal:
					return this.stateNumericDecimal(t, u);
				case z.NumericHex:
					return this.stateNumericHex(t, u);
				case z.NamedEntity:
					return this.stateNamedEntity(t, u);
			}
		}
		stateNumericStart(t, u) {
			return u >= t.length
				? -1
				: (t.charCodeAt(u) | ks) === J.LOWER_X
					? ((this.state = z.NumericHex),
						(this.consumed += 1),
						this.stateNumericHex(t, u + 1))
					: ((this.state = z.NumericDecimal), this.stateNumericDecimal(t, u));
		}
		addToNumericResult(t, u, i, n) {
			if (u !== i) {
				let s = i - u;
				(this.result =
					this.result * Math.pow(n, s) + parseInt(t.substr(u, s), n)),
					(this.consumed += s);
			}
		}
		stateNumericHex(t, u) {
			let i = u;
			for (; u < t.length; ) {
				let n = t.charCodeAt(u);
				if (bu(n) || Rs(n)) u += 1;
				else
					return (
						this.addToNumericResult(t, i, u, 16), this.emitNumericEntity(n, 3)
					);
			}
			return this.addToNumericResult(t, i, u, 16), -1;
		}
		stateNumericDecimal(t, u) {
			let i = u;
			for (; u < t.length; ) {
				let n = t.charCodeAt(u);
				if (bu(n)) u += 1;
				else
					return (
						this.addToNumericResult(t, i, u, 10), this.emitNumericEntity(n, 2)
					);
			}
			return this.addToNumericResult(t, i, u, 10), -1;
		}
		emitNumericEntity(t, u) {
			var i;
			if (this.consumed <= u)
				return (
					(i = this.errors) === null ||
						i === void 0 ||
						i.absenceOfDigitsInNumericCharacterReference(this.consumed),
					0
				);
			if (t === J.SEMI) this.consumed += 1;
			else if (this.decodeMode === we.Strict) return 0;
			return (
				this.emitCodePoint(Tu(this.result), this.consumed),
				this.errors &&
					(t !== J.SEMI &&
						this.errors.missingSemicolonAfterCharacterReference(),
					this.errors.validateNumericCharacterReference(this.result)),
				this.consumed
			);
		}
		stateNamedEntity(t, u) {
			let { decodeTree: i } = this,
				n = i[this.treeIndex],
				s = (n & he.VALUE_LENGTH) >> 14;
			for (; u < t.length; u++, this.excess++) {
				let o = t.charCodeAt(u);
				if (
					((this.treeIndex = gu(i, n, this.treeIndex + Math.max(1, s), o)),
					this.treeIndex < 0)
				)
					return this.result === 0 ||
						(this.decodeMode === we.Attribute && (s === 0 || Os(o)))
						? 0
						: this.emitNotTerminatedNamedEntity();
				if (
					((n = i[this.treeIndex]), (s = (n & he.VALUE_LENGTH) >> 14), s !== 0)
				) {
					if (o === J.SEMI)
						return this.emitNamedEntityData(
							this.treeIndex,
							s,
							this.consumed + this.excess
						);
					this.decodeMode !== we.Strict &&
						((this.result = this.treeIndex),
						(this.consumed += this.excess),
						(this.excess = 0));
				}
			}
			return -1;
		}
		emitNotTerminatedNamedEntity() {
			var t;
			let { result: u, decodeTree: i } = this,
				n = (i[u] & he.VALUE_LENGTH) >> 14;
			return (
				this.emitNamedEntityData(u, n, this.consumed),
				(t = this.errors) === null ||
					t === void 0 ||
					t.missingSemicolonAfterCharacterReference(),
				this.consumed
			);
		}
		emitNamedEntityData(t, u, i) {
			let { decodeTree: n } = this;
			return (
				this.emitCodePoint(u === 1 ? n[t] & ~he.VALUE_LENGTH : n[t + 1], i),
				u === 3 && this.emitCodePoint(n[t + 2], i),
				i
			);
		}
		end() {
			var t;
			switch (this.state) {
				case z.NamedEntity:
					return this.result !== 0 &&
						(this.decodeMode !== we.Attribute || this.result === this.treeIndex)
						? this.emitNotTerminatedNamedEntity()
						: 0;
				case z.NumericDecimal:
					return this.emitNumericEntity(0, 2);
				case z.NumericHex:
					return this.emitNumericEntity(0, 3);
				case z.NumericStart:
					return (
						(t = this.errors) === null ||
							t === void 0 ||
							t.absenceOfDigitsInNumericCharacterReference(this.consumed),
						0
					);
				case z.EntityStart:
					return 0;
			}
		}
	};
	function xi(e) {
		let t = "",
			u = new Au(e, (i) => (t += mu(i)));
		return function (n, s) {
			let o = 0,
				r = 0;
			for (; (r = n.indexOf("&", r)) >= 0; ) {
				(t += n.slice(o, r)), u.startEntity(s);
				let h = u.write(n, r + 1);
				if (h < 0) {
					o = r + u.end();
					break;
				}
				(o = r + h), (r = h === 0 ? o + 1 : o);
			}
			let c = t + n.slice(o);
			return (t = ""), c;
		};
	}
	function gu(e, t, u, i) {
		let n = (t & he.BRANCH_LENGTH) >> 7,
			s = t & he.JUMP_TABLE;
		if (n === 0) return s !== 0 && i === s ? u : -1;
		if (s) {
			let c = i - s;
			return c < 0 || c >= n ? -1 : e[u + c] - 1;
		}
		let o = u,
			r = o + n - 1;
		for (; o <= r; ) {
			let c = (o + r) >>> 1,
				h = e[c];
			if (h < i) o = c + 1;
			else if (h > i) r = c - 1;
			else return e[c + n];
		}
		return -1;
	}
	var cr = xi(Ce),
		lr = xi(pi);
	var C;
	(function (e) {
		(e.HTML = "http://www.w3.org/1999/xhtml"),
			(e.MATHML = "http://www.w3.org/1998/Math/MathML"),
			(e.SVG = "http://www.w3.org/2000/svg"),
			(e.XLINK = "http://www.w3.org/1999/xlink"),
			(e.XML = "http://www.w3.org/XML/1998/namespace"),
			(e.XMLNS = "http://www.w3.org/2000/xmlns/");
	})((C = C || (C = {})));
	var _e;
	(function (e) {
		(e.TYPE = "type"),
			(e.ACTION = "action"),
			(e.ENCODING = "encoding"),
			(e.PROMPT = "prompt"),
			(e.NAME = "name"),
			(e.COLOR = "color"),
			(e.FACE = "face"),
			(e.SIZE = "size");
	})((_e = _e || (_e = {})));
	var $;
	(function (e) {
		(e.NO_QUIRKS = "no-quirks"),
			(e.QUIRKS = "quirks"),
			(e.LIMITED_QUIRKS = "limited-quirks");
	})(($ = $ || ($ = {})));
	var A;
	(function (e) {
		(e.A = "a"),
			(e.ADDRESS = "address"),
			(e.ANNOTATION_XML = "annotation-xml"),
			(e.APPLET = "applet"),
			(e.AREA = "area"),
			(e.ARTICLE = "article"),
			(e.ASIDE = "aside"),
			(e.B = "b"),
			(e.BASE = "base"),
			(e.BASEFONT = "basefont"),
			(e.BGSOUND = "bgsound"),
			(e.BIG = "big"),
			(e.BLOCKQUOTE = "blockquote"),
			(e.BODY = "body"),
			(e.BR = "br"),
			(e.BUTTON = "button"),
			(e.CAPTION = "caption"),
			(e.CENTER = "center"),
			(e.CODE = "code"),
			(e.COL = "col"),
			(e.COLGROUP = "colgroup"),
			(e.DD = "dd"),
			(e.DESC = "desc"),
			(e.DETAILS = "details"),
			(e.DIALOG = "dialog"),
			(e.DIR = "dir"),
			(e.DIV = "div"),
			(e.DL = "dl"),
			(e.DT = "dt"),
			(e.EM = "em"),
			(e.EMBED = "embed"),
			(e.FIELDSET = "fieldset"),
			(e.FIGCAPTION = "figcaption"),
			(e.FIGURE = "figure"),
			(e.FONT = "font"),
			(e.FOOTER = "footer"),
			(e.FOREIGN_OBJECT = "foreignObject"),
			(e.FORM = "form"),
			(e.FRAME = "frame"),
			(e.FRAMESET = "frameset"),
			(e.H1 = "h1"),
			(e.H2 = "h2"),
			(e.H3 = "h3"),
			(e.H4 = "h4"),
			(e.H5 = "h5"),
			(e.H6 = "h6"),
			(e.HEAD = "head"),
			(e.HEADER = "header"),
			(e.HGROUP = "hgroup"),
			(e.HR = "hr"),
			(e.HTML = "html"),
			(e.I = "i"),
			(e.IMG = "img"),
			(e.IMAGE = "image"),
			(e.INPUT = "input"),
			(e.IFRAME = "iframe"),
			(e.KEYGEN = "keygen"),
			(e.LABEL = "label"),
			(e.LI = "li"),
			(e.LINK = "link"),
			(e.LISTING = "listing"),
			(e.MAIN = "main"),
			(e.MALIGNMARK = "malignmark"),
			(e.MARQUEE = "marquee"),
			(e.MATH = "math"),
			(e.MENU = "menu"),
			(e.META = "meta"),
			(e.MGLYPH = "mglyph"),
			(e.MI = "mi"),
			(e.MO = "mo"),
			(e.MN = "mn"),
			(e.MS = "ms"),
			(e.MTEXT = "mtext"),
			(e.NAV = "nav"),
			(e.NOBR = "nobr"),
			(e.NOFRAMES = "noframes"),
			(e.NOEMBED = "noembed"),
			(e.NOSCRIPT = "noscript"),
			(e.OBJECT = "object"),
			(e.OL = "ol"),
			(e.OPTGROUP = "optgroup"),
			(e.OPTION = "option"),
			(e.P = "p"),
			(e.PARAM = "param"),
			(e.PLAINTEXT = "plaintext"),
			(e.PRE = "pre"),
			(e.RB = "rb"),
			(e.RP = "rp"),
			(e.RT = "rt"),
			(e.RTC = "rtc"),
			(e.RUBY = "ruby"),
			(e.S = "s"),
			(e.SCRIPT = "script"),
			(e.SECTION = "section"),
			(e.SELECT = "select"),
			(e.SOURCE = "source"),
			(e.SMALL = "small"),
			(e.SPAN = "span"),
			(e.STRIKE = "strike"),
			(e.STRONG = "strong"),
			(e.STYLE = "style"),
			(e.SUB = "sub"),
			(e.SUMMARY = "summary"),
			(e.SUP = "sup"),
			(e.TABLE = "table"),
			(e.TBODY = "tbody"),
			(e.TEMPLATE = "template"),
			(e.TEXTAREA = "textarea"),
			(e.TFOOT = "tfoot"),
			(e.TD = "td"),
			(e.TH = "th"),
			(e.THEAD = "thead"),
			(e.TITLE = "title"),
			(e.TR = "tr"),
			(e.TRACK = "track"),
			(e.TT = "tt"),
			(e.U = "u"),
			(e.UL = "ul"),
			(e.SVG = "svg"),
			(e.VAR = "var"),
			(e.WBR = "wbr"),
			(e.XMP = "xmp");
	})((A = A || (A = {})));
	var a;
	(function (e) {
		(e[(e.UNKNOWN = 0)] = "UNKNOWN"),
			(e[(e.A = 1)] = "A"),
			(e[(e.ADDRESS = 2)] = "ADDRESS"),
			(e[(e.ANNOTATION_XML = 3)] = "ANNOTATION_XML"),
			(e[(e.APPLET = 4)] = "APPLET"),
			(e[(e.AREA = 5)] = "AREA"),
			(e[(e.ARTICLE = 6)] = "ARTICLE"),
			(e[(e.ASIDE = 7)] = "ASIDE"),
			(e[(e.B = 8)] = "B"),
			(e[(e.BASE = 9)] = "BASE"),
			(e[(e.BASEFONT = 10)] = "BASEFONT"),
			(e[(e.BGSOUND = 11)] = "BGSOUND"),
			(e[(e.BIG = 12)] = "BIG"),
			(e[(e.BLOCKQUOTE = 13)] = "BLOCKQUOTE"),
			(e[(e.BODY = 14)] = "BODY"),
			(e[(e.BR = 15)] = "BR"),
			(e[(e.BUTTON = 16)] = "BUTTON"),
			(e[(e.CAPTION = 17)] = "CAPTION"),
			(e[(e.CENTER = 18)] = "CENTER"),
			(e[(e.CODE = 19)] = "CODE"),
			(e[(e.COL = 20)] = "COL"),
			(e[(e.COLGROUP = 21)] = "COLGROUP"),
			(e[(e.DD = 22)] = "DD"),
			(e[(e.DESC = 23)] = "DESC"),
			(e[(e.DETAILS = 24)] = "DETAILS"),
			(e[(e.DIALOG = 25)] = "DIALOG"),
			(e[(e.DIR = 26)] = "DIR"),
			(e[(e.DIV = 27)] = "DIV"),
			(e[(e.DL = 28)] = "DL"),
			(e[(e.DT = 29)] = "DT"),
			(e[(e.EM = 30)] = "EM"),
			(e[(e.EMBED = 31)] = "EMBED"),
			(e[(e.FIELDSET = 32)] = "FIELDSET"),
			(e[(e.FIGCAPTION = 33)] = "FIGCAPTION"),
			(e[(e.FIGURE = 34)] = "FIGURE"),
			(e[(e.FONT = 35)] = "FONT"),
			(e[(e.FOOTER = 36)] = "FOOTER"),
			(e[(e.FOREIGN_OBJECT = 37)] = "FOREIGN_OBJECT"),
			(e[(e.FORM = 38)] = "FORM"),
			(e[(e.FRAME = 39)] = "FRAME"),
			(e[(e.FRAMESET = 40)] = "FRAMESET"),
			(e[(e.H1 = 41)] = "H1"),
			(e[(e.H2 = 42)] = "H2"),
			(e[(e.H3 = 43)] = "H3"),
			(e[(e.H4 = 44)] = "H4"),
			(e[(e.H5 = 45)] = "H5"),
			(e[(e.H6 = 46)] = "H6"),
			(e[(e.HEAD = 47)] = "HEAD"),
			(e[(e.HEADER = 48)] = "HEADER"),
			(e[(e.HGROUP = 49)] = "HGROUP"),
			(e[(e.HR = 50)] = "HR"),
			(e[(e.HTML = 51)] = "HTML"),
			(e[(e.I = 52)] = "I"),
			(e[(e.IMG = 53)] = "IMG"),
			(e[(e.IMAGE = 54)] = "IMAGE"),
			(e[(e.INPUT = 55)] = "INPUT"),
			(e[(e.IFRAME = 56)] = "IFRAME"),
			(e[(e.KEYGEN = 57)] = "KEYGEN"),
			(e[(e.LABEL = 58)] = "LABEL"),
			(e[(e.LI = 59)] = "LI"),
			(e[(e.LINK = 60)] = "LINK"),
			(e[(e.LISTING = 61)] = "LISTING"),
			(e[(e.MAIN = 62)] = "MAIN"),
			(e[(e.MALIGNMARK = 63)] = "MALIGNMARK"),
			(e[(e.MARQUEE = 64)] = "MARQUEE"),
			(e[(e.MATH = 65)] = "MATH"),
			(e[(e.MENU = 66)] = "MENU"),
			(e[(e.META = 67)] = "META"),
			(e[(e.MGLYPH = 68)] = "MGLYPH"),
			(e[(e.MI = 69)] = "MI"),
			(e[(e.MO = 70)] = "MO"),
			(e[(e.MN = 71)] = "MN"),
			(e[(e.MS = 72)] = "MS"),
			(e[(e.MTEXT = 73)] = "MTEXT"),
			(e[(e.NAV = 74)] = "NAV"),
			(e[(e.NOBR = 75)] = "NOBR"),
			(e[(e.NOFRAMES = 76)] = "NOFRAMES"),
			(e[(e.NOEMBED = 77)] = "NOEMBED"),
			(e[(e.NOSCRIPT = 78)] = "NOSCRIPT"),
			(e[(e.OBJECT = 79)] = "OBJECT"),
			(e[(e.OL = 80)] = "OL"),
			(e[(e.OPTGROUP = 81)] = "OPTGROUP"),
			(e[(e.OPTION = 82)] = "OPTION"),
			(e[(e.P = 83)] = "P"),
			(e[(e.PARAM = 84)] = "PARAM"),
			(e[(e.PLAINTEXT = 85)] = "PLAINTEXT"),
			(e[(e.PRE = 86)] = "PRE"),
			(e[(e.RB = 87)] = "RB"),
			(e[(e.RP = 88)] = "RP"),
			(e[(e.RT = 89)] = "RT"),
			(e[(e.RTC = 90)] = "RTC"),
			(e[(e.RUBY = 91)] = "RUBY"),
			(e[(e.S = 92)] = "S"),
			(e[(e.SCRIPT = 93)] = "SCRIPT"),
			(e[(e.SECTION = 94)] = "SECTION"),
			(e[(e.SELECT = 95)] = "SELECT"),
			(e[(e.SOURCE = 96)] = "SOURCE"),
			(e[(e.SMALL = 97)] = "SMALL"),
			(e[(e.SPAN = 98)] = "SPAN"),
			(e[(e.STRIKE = 99)] = "STRIKE"),
			(e[(e.STRONG = 100)] = "STRONG"),
			(e[(e.STYLE = 101)] = "STYLE"),
			(e[(e.SUB = 102)] = "SUB"),
			(e[(e.SUMMARY = 103)] = "SUMMARY"),
			(e[(e.SUP = 104)] = "SUP"),
			(e[(e.TABLE = 105)] = "TABLE"),
			(e[(e.TBODY = 106)] = "TBODY"),
			(e[(e.TEMPLATE = 107)] = "TEMPLATE"),
			(e[(e.TEXTAREA = 108)] = "TEXTAREA"),
			(e[(e.TFOOT = 109)] = "TFOOT"),
			(e[(e.TD = 110)] = "TD"),
			(e[(e.TH = 111)] = "TH"),
			(e[(e.THEAD = 112)] = "THEAD"),
			(e[(e.TITLE = 113)] = "TITLE"),
			(e[(e.TR = 114)] = "TR"),
			(e[(e.TRACK = 115)] = "TRACK"),
			(e[(e.TT = 116)] = "TT"),
			(e[(e.U = 117)] = "U"),
			(e[(e.UL = 118)] = "UL"),
			(e[(e.SVG = 119)] = "SVG"),
			(e[(e.VAR = 120)] = "VAR"),
			(e[(e.WBR = 121)] = "WBR"),
			(e[(e.XMP = 122)] = "XMP");
	})((a = a || (a = {})));
	var ys = new Map([
		[A.A, a.A],
		[A.ADDRESS, a.ADDRESS],
		[A.ANNOTATION_XML, a.ANNOTATION_XML],
		[A.APPLET, a.APPLET],
		[A.AREA, a.AREA],
		[A.ARTICLE, a.ARTICLE],
		[A.ASIDE, a.ASIDE],
		[A.B, a.B],
		[A.BASE, a.BASE],
		[A.BASEFONT, a.BASEFONT],
		[A.BGSOUND, a.BGSOUND],
		[A.BIG, a.BIG],
		[A.BLOCKQUOTE, a.BLOCKQUOTE],
		[A.BODY, a.BODY],
		[A.BR, a.BR],
		[A.BUTTON, a.BUTTON],
		[A.CAPTION, a.CAPTION],
		[A.CENTER, a.CENTER],
		[A.CODE, a.CODE],
		[A.COL, a.COL],
		[A.COLGROUP, a.COLGROUP],
		[A.DD, a.DD],
		[A.DESC, a.DESC],
		[A.DETAILS, a.DETAILS],
		[A.DIALOG, a.DIALOG],
		[A.DIR, a.DIR],
		[A.DIV, a.DIV],
		[A.DL, a.DL],
		[A.DT, a.DT],
		[A.EM, a.EM],
		[A.EMBED, a.EMBED],
		[A.FIELDSET, a.FIELDSET],
		[A.FIGCAPTION, a.FIGCAPTION],
		[A.FIGURE, a.FIGURE],
		[A.FONT, a.FONT],
		[A.FOOTER, a.FOOTER],
		[A.FOREIGN_OBJECT, a.FOREIGN_OBJECT],
		[A.FORM, a.FORM],
		[A.FRAME, a.FRAME],
		[A.FRAMESET, a.FRAMESET],
		[A.H1, a.H1],
		[A.H2, a.H2],
		[A.H3, a.H3],
		[A.H4, a.H4],
		[A.H5, a.H5],
		[A.H6, a.H6],
		[A.HEAD, a.HEAD],
		[A.HEADER, a.HEADER],
		[A.HGROUP, a.HGROUP],
		[A.HR, a.HR],
		[A.HTML, a.HTML],
		[A.I, a.I],
		[A.IMG, a.IMG],
		[A.IMAGE, a.IMAGE],
		[A.INPUT, a.INPUT],
		[A.IFRAME, a.IFRAME],
		[A.KEYGEN, a.KEYGEN],
		[A.LABEL, a.LABEL],
		[A.LI, a.LI],
		[A.LINK, a.LINK],
		[A.LISTING, a.LISTING],
		[A.MAIN, a.MAIN],
		[A.MALIGNMARK, a.MALIGNMARK],
		[A.MARQUEE, a.MARQUEE],
		[A.MATH, a.MATH],
		[A.MENU, a.MENU],
		[A.META, a.META],
		[A.MGLYPH, a.MGLYPH],
		[A.MI, a.MI],
		[A.MO, a.MO],
		[A.MN, a.MN],
		[A.MS, a.MS],
		[A.MTEXT, a.MTEXT],
		[A.NAV, a.NAV],
		[A.NOBR, a.NOBR],
		[A.NOFRAMES, a.NOFRAMES],
		[A.NOEMBED, a.NOEMBED],
		[A.NOSCRIPT, a.NOSCRIPT],
		[A.OBJECT, a.OBJECT],
		[A.OL, a.OL],
		[A.OPTGROUP, a.OPTGROUP],
		[A.OPTION, a.OPTION],
		[A.P, a.P],
		[A.PARAM, a.PARAM],
		[A.PLAINTEXT, a.PLAINTEXT],
		[A.PRE, a.PRE],
		[A.RB, a.RB],
		[A.RP, a.RP],
		[A.RT, a.RT],
		[A.RTC, a.RTC],
		[A.RUBY, a.RUBY],
		[A.S, a.S],
		[A.SCRIPT, a.SCRIPT],
		[A.SECTION, a.SECTION],
		[A.SELECT, a.SELECT],
		[A.SOURCE, a.SOURCE],
		[A.SMALL, a.SMALL],
		[A.SPAN, a.SPAN],
		[A.STRIKE, a.STRIKE],
		[A.STRONG, a.STRONG],
		[A.STYLE, a.STYLE],
		[A.SUB, a.SUB],
		[A.SUMMARY, a.SUMMARY],
		[A.SUP, a.SUP],
		[A.TABLE, a.TABLE],
		[A.TBODY, a.TBODY],
		[A.TEMPLATE, a.TEMPLATE],
		[A.TEXTAREA, a.TEXTAREA],
		[A.TFOOT, a.TFOOT],
		[A.TD, a.TD],
		[A.TH, a.TH],
		[A.THEAD, a.THEAD],
		[A.TITLE, a.TITLE],
		[A.TR, a.TR],
		[A.TRACK, a.TRACK],
		[A.TT, a.TT],
		[A.U, a.U],
		[A.UL, a.UL],
		[A.SVG, a.SVG],
		[A.VAR, a.VAR],
		[A.WBR, a.WBR],
		[A.XMP, a.XMP],
	]);
	function Be(e) {
		var t;
		return (t = ys.get(e)) !== null && t !== void 0 ? t : a.UNKNOWN;
	}
	var I = a,
		qi = {
			[C.HTML]: new Set([
				I.ADDRESS,
				I.APPLET,
				I.AREA,
				I.ARTICLE,
				I.ASIDE,
				I.BASE,
				I.BASEFONT,
				I.BGSOUND,
				I.BLOCKQUOTE,
				I.BODY,
				I.BR,
				I.BUTTON,
				I.CAPTION,
				I.CENTER,
				I.COL,
				I.COLGROUP,
				I.DD,
				I.DETAILS,
				I.DIR,
				I.DIV,
				I.DL,
				I.DT,
				I.EMBED,
				I.FIELDSET,
				I.FIGCAPTION,
				I.FIGURE,
				I.FOOTER,
				I.FORM,
				I.FRAME,
				I.FRAMESET,
				I.H1,
				I.H2,
				I.H3,
				I.H4,
				I.H5,
				I.H6,
				I.HEAD,
				I.HEADER,
				I.HGROUP,
				I.HR,
				I.HTML,
				I.IFRAME,
				I.IMG,
				I.INPUT,
				I.LI,
				I.LINK,
				I.LISTING,
				I.MAIN,
				I.MARQUEE,
				I.MENU,
				I.META,
				I.NAV,
				I.NOEMBED,
				I.NOFRAMES,
				I.NOSCRIPT,
				I.OBJECT,
				I.OL,
				I.P,
				I.PARAM,
				I.PLAINTEXT,
				I.PRE,
				I.SCRIPT,
				I.SECTION,
				I.SELECT,
				I.SOURCE,
				I.STYLE,
				I.SUMMARY,
				I.TABLE,
				I.TBODY,
				I.TD,
				I.TEMPLATE,
				I.TEXTAREA,
				I.TFOOT,
				I.TH,
				I.THEAD,
				I.TITLE,
				I.TR,
				I.TRACK,
				I.UL,
				I.WBR,
				I.XMP,
			]),
			[C.MATHML]: new Set([I.MI, I.MO, I.MN, I.MS, I.MTEXT, I.ANNOTATION_XML]),
			[C.SVG]: new Set([I.TITLE, I.FOREIGN_OBJECT, I.DESC]),
			[C.XLINK]: new Set(),
			[C.XML]: new Set(),
			[C.XMLNS]: new Set(),
		};
	function yt(e) {
		return (
			e === I.H1 ||
			e === I.H2 ||
			e === I.H3 ||
			e === I.H4 ||
			e === I.H5 ||
			e === I.H6
		);
	}
	var ws = new Set([
		A.STYLE,
		A.SCRIPT,
		A.XMP,
		A.IFRAME,
		A.NOEMBED,
		A.NOFRAMES,
		A.PLAINTEXT,
	]);
	function Yi(e, t) {
		return ws.has(e) || (t && e === A.NOSCRIPT);
	}
	var Ms = new Map([
			[128, 8364],
			[130, 8218],
			[131, 402],
			[132, 8222],
			[133, 8230],
			[134, 8224],
			[135, 8225],
			[136, 710],
			[137, 8240],
			[138, 352],
			[139, 8249],
			[140, 338],
			[142, 381],
			[145, 8216],
			[146, 8217],
			[147, 8220],
			[148, 8221],
			[149, 8226],
			[150, 8211],
			[151, 8212],
			[152, 732],
			[153, 8482],
			[154, 353],
			[155, 8250],
			[156, 339],
			[158, 382],
			[159, 376],
		]),
		f;
	(function (e) {
		(e[(e.DATA = 0)] = "DATA"),
			(e[(e.RCDATA = 1)] = "RCDATA"),
			(e[(e.RAWTEXT = 2)] = "RAWTEXT"),
			(e[(e.SCRIPT_DATA = 3)] = "SCRIPT_DATA"),
			(e[(e.PLAINTEXT = 4)] = "PLAINTEXT"),
			(e[(e.TAG_OPEN = 5)] = "TAG_OPEN"),
			(e[(e.END_TAG_OPEN = 6)] = "END_TAG_OPEN"),
			(e[(e.TAG_NAME = 7)] = "TAG_NAME"),
			(e[(e.RCDATA_LESS_THAN_SIGN = 8)] = "RCDATA_LESS_THAN_SIGN"),
			(e[(e.RCDATA_END_TAG_OPEN = 9)] = "RCDATA_END_TAG_OPEN"),
			(e[(e.RCDATA_END_TAG_NAME = 10)] = "RCDATA_END_TAG_NAME"),
			(e[(e.RAWTEXT_LESS_THAN_SIGN = 11)] = "RAWTEXT_LESS_THAN_SIGN"),
			(e[(e.RAWTEXT_END_TAG_OPEN = 12)] = "RAWTEXT_END_TAG_OPEN"),
			(e[(e.RAWTEXT_END_TAG_NAME = 13)] = "RAWTEXT_END_TAG_NAME"),
			(e[(e.SCRIPT_DATA_LESS_THAN_SIGN = 14)] = "SCRIPT_DATA_LESS_THAN_SIGN"),
			(e[(e.SCRIPT_DATA_END_TAG_OPEN = 15)] = "SCRIPT_DATA_END_TAG_OPEN"),
			(e[(e.SCRIPT_DATA_END_TAG_NAME = 16)] = "SCRIPT_DATA_END_TAG_NAME"),
			(e[(e.SCRIPT_DATA_ESCAPE_START = 17)] = "SCRIPT_DATA_ESCAPE_START"),
			(e[(e.SCRIPT_DATA_ESCAPE_START_DASH = 18)] =
				"SCRIPT_DATA_ESCAPE_START_DASH"),
			(e[(e.SCRIPT_DATA_ESCAPED = 19)] = "SCRIPT_DATA_ESCAPED"),
			(e[(e.SCRIPT_DATA_ESCAPED_DASH = 20)] = "SCRIPT_DATA_ESCAPED_DASH"),
			(e[(e.SCRIPT_DATA_ESCAPED_DASH_DASH = 21)] =
				"SCRIPT_DATA_ESCAPED_DASH_DASH"),
			(e[(e.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN = 22)] =
				"SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN"),
			(e[(e.SCRIPT_DATA_ESCAPED_END_TAG_OPEN = 23)] =
				"SCRIPT_DATA_ESCAPED_END_TAG_OPEN"),
			(e[(e.SCRIPT_DATA_ESCAPED_END_TAG_NAME = 24)] =
				"SCRIPT_DATA_ESCAPED_END_TAG_NAME"),
			(e[(e.SCRIPT_DATA_DOUBLE_ESCAPE_START = 25)] =
				"SCRIPT_DATA_DOUBLE_ESCAPE_START"),
			(e[(e.SCRIPT_DATA_DOUBLE_ESCAPED = 26)] = "SCRIPT_DATA_DOUBLE_ESCAPED"),
			(e[(e.SCRIPT_DATA_DOUBLE_ESCAPED_DASH = 27)] =
				"SCRIPT_DATA_DOUBLE_ESCAPED_DASH"),
			(e[(e.SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH = 28)] =
				"SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH"),
			(e[(e.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN = 29)] =
				"SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN"),
			(e[(e.SCRIPT_DATA_DOUBLE_ESCAPE_END = 30)] =
				"SCRIPT_DATA_DOUBLE_ESCAPE_END"),
			(e[(e.BEFORE_ATTRIBUTE_NAME = 31)] = "BEFORE_ATTRIBUTE_NAME"),
			(e[(e.ATTRIBUTE_NAME = 32)] = "ATTRIBUTE_NAME"),
			(e[(e.AFTER_ATTRIBUTE_NAME = 33)] = "AFTER_ATTRIBUTE_NAME"),
			(e[(e.BEFORE_ATTRIBUTE_VALUE = 34)] = "BEFORE_ATTRIBUTE_VALUE"),
			(e[(e.ATTRIBUTE_VALUE_DOUBLE_QUOTED = 35)] =
				"ATTRIBUTE_VALUE_DOUBLE_QUOTED"),
			(e[(e.ATTRIBUTE_VALUE_SINGLE_QUOTED = 36)] =
				"ATTRIBUTE_VALUE_SINGLE_QUOTED"),
			(e[(e.ATTRIBUTE_VALUE_UNQUOTED = 37)] = "ATTRIBUTE_VALUE_UNQUOTED"),
			(e[(e.AFTER_ATTRIBUTE_VALUE_QUOTED = 38)] =
				"AFTER_ATTRIBUTE_VALUE_QUOTED"),
			(e[(e.SELF_CLOSING_START_TAG = 39)] = "SELF_CLOSING_START_TAG"),
			(e[(e.BOGUS_COMMENT = 40)] = "BOGUS_COMMENT"),
			(e[(e.MARKUP_DECLARATION_OPEN = 41)] = "MARKUP_DECLARATION_OPEN"),
			(e[(e.COMMENT_START = 42)] = "COMMENT_START"),
			(e[(e.COMMENT_START_DASH = 43)] = "COMMENT_START_DASH"),
			(e[(e.COMMENT = 44)] = "COMMENT"),
			(e[(e.COMMENT_LESS_THAN_SIGN = 45)] = "COMMENT_LESS_THAN_SIGN"),
			(e[(e.COMMENT_LESS_THAN_SIGN_BANG = 46)] = "COMMENT_LESS_THAN_SIGN_BANG"),
			(e[(e.COMMENT_LESS_THAN_SIGN_BANG_DASH = 47)] =
				"COMMENT_LESS_THAN_SIGN_BANG_DASH"),
			(e[(e.COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH = 48)] =
				"COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH"),
			(e[(e.COMMENT_END_DASH = 49)] = "COMMENT_END_DASH"),
			(e[(e.COMMENT_END = 50)] = "COMMENT_END"),
			(e[(e.COMMENT_END_BANG = 51)] = "COMMENT_END_BANG"),
			(e[(e.DOCTYPE = 52)] = "DOCTYPE"),
			(e[(e.BEFORE_DOCTYPE_NAME = 53)] = "BEFORE_DOCTYPE_NAME"),
			(e[(e.DOCTYPE_NAME = 54)] = "DOCTYPE_NAME"),
			(e[(e.AFTER_DOCTYPE_NAME = 55)] = "AFTER_DOCTYPE_NAME"),
			(e[(e.AFTER_DOCTYPE_PUBLIC_KEYWORD = 56)] =
				"AFTER_DOCTYPE_PUBLIC_KEYWORD"),
			(e[(e.BEFORE_DOCTYPE_PUBLIC_IDENTIFIER = 57)] =
				"BEFORE_DOCTYPE_PUBLIC_IDENTIFIER"),
			(e[(e.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED = 58)] =
				"DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED"),
			(e[(e.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED = 59)] =
				"DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED"),
			(e[(e.AFTER_DOCTYPE_PUBLIC_IDENTIFIER = 60)] =
				"AFTER_DOCTYPE_PUBLIC_IDENTIFIER"),
			(e[(e.BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS = 61)] =
				"BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS"),
			(e[(e.AFTER_DOCTYPE_SYSTEM_KEYWORD = 62)] =
				"AFTER_DOCTYPE_SYSTEM_KEYWORD"),
			(e[(e.BEFORE_DOCTYPE_SYSTEM_IDENTIFIER = 63)] =
				"BEFORE_DOCTYPE_SYSTEM_IDENTIFIER"),
			(e[(e.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED = 64)] =
				"DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED"),
			(e[(e.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED = 65)] =
				"DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED"),
			(e[(e.AFTER_DOCTYPE_SYSTEM_IDENTIFIER = 66)] =
				"AFTER_DOCTYPE_SYSTEM_IDENTIFIER"),
			(e[(e.BOGUS_DOCTYPE = 67)] = "BOGUS_DOCTYPE"),
			(e[(e.CDATA_SECTION = 68)] = "CDATA_SECTION"),
			(e[(e.CDATA_SECTION_BRACKET = 69)] = "CDATA_SECTION_BRACKET"),
			(e[(e.CDATA_SECTION_END = 70)] = "CDATA_SECTION_END"),
			(e[(e.CHARACTER_REFERENCE = 71)] = "CHARACTER_REFERENCE"),
			(e[(e.NAMED_CHARACTER_REFERENCE = 72)] = "NAMED_CHARACTER_REFERENCE"),
			(e[(e.AMBIGUOUS_AMPERSAND = 73)] = "AMBIGUOUS_AMPERSAND"),
			(e[(e.NUMERIC_CHARACTER_REFERENCE = 74)] = "NUMERIC_CHARACTER_REFERENCE"),
			(e[(e.HEXADEMICAL_CHARACTER_REFERENCE_START = 75)] =
				"HEXADEMICAL_CHARACTER_REFERENCE_START"),
			(e[(e.HEXADEMICAL_CHARACTER_REFERENCE = 76)] =
				"HEXADEMICAL_CHARACTER_REFERENCE"),
			(e[(e.DECIMAL_CHARACTER_REFERENCE = 77)] = "DECIMAL_CHARACTER_REFERENCE"),
			(e[(e.NUMERIC_CHARACTER_REFERENCE_END = 78)] =
				"NUMERIC_CHARACTER_REFERENCE_END");
	})(f || (f = {}));
	var Z = {
		DATA: f.DATA,
		RCDATA: f.RCDATA,
		RAWTEXT: f.RAWTEXT,
		SCRIPT_DATA: f.SCRIPT_DATA,
		PLAINTEXT: f.PLAINTEXT,
		CDATA_SECTION: f.CDATA_SECTION,
	};
	function st(e) {
		return e >= l.DIGIT_0 && e <= l.DIGIT_9;
	}
	function nt(e) {
		return e >= l.LATIN_CAPITAL_A && e <= l.LATIN_CAPITAL_Z;
	}
	function Fs(e) {
		return e >= l.LATIN_SMALL_A && e <= l.LATIN_SMALL_Z;
	}
	function ke(e) {
		return Fs(e) || nt(e);
	}
	function Cu(e) {
		return ke(e) || st(e);
	}
	function Wi(e) {
		return e >= l.LATIN_CAPITAL_A && e <= l.LATIN_CAPITAL_F;
	}
	function Xi(e) {
		return e >= l.LATIN_SMALL_A && e <= l.LATIN_SMALL_F;
	}
	function vs(e) {
		return st(e) || Wi(e) || Xi(e);
	}
	function wt(e) {
		return e + 32;
	}
	function Qi(e) {
		return (
			e === l.SPACE ||
			e === l.LINE_FEED ||
			e === l.TABULATION ||
			e === l.FORM_FEED
		);
	}
	function Us(e) {
		return e === l.EQUALS_SIGN || Cu(e);
	}
	function Vi(e) {
		return Qi(e) || e === l.SOLIDUS || e === l.GREATER_THAN_SIGN;
	}
	var at = class {
		constructor(t, u) {
			(this.options = t),
				(this.handler = u),
				(this.paused = !1),
				(this.inLoop = !1),
				(this.inForeignNode = !1),
				(this.lastStartTagName = ""),
				(this.active = !1),
				(this.state = f.DATA),
				(this.returnState = f.DATA),
				(this.charRefCode = -1),
				(this.consumedAfterSnapshot = -1),
				(this.currentCharacterToken = null),
				(this.currentToken = null),
				(this.currentAttr = { name: "", value: "" }),
				(this.preprocessor = new Pt(u)),
				(this.currentLocation = this.getCurrentLocation(-1));
		}
		_err(t) {
			var u, i;
			(i = (u = this.handler).onParseError) === null ||
				i === void 0 ||
				i.call(u, this.preprocessor.getError(t));
		}
		getCurrentLocation(t) {
			return this.options.sourceCodeLocationInfo
				? {
						startLine: this.preprocessor.line,
						startCol: this.preprocessor.col - t,
						startOffset: this.preprocessor.offset - t,
						endLine: -1,
						endCol: -1,
						endOffset: -1,
					}
				: null;
		}
		_runParsingLoop() {
			if (!this.inLoop) {
				for (this.inLoop = !0; this.active && !this.paused; ) {
					this.consumedAfterSnapshot = 0;
					let t = this._consume();
					this._ensureHibernation() || this._callState(t);
				}
				this.inLoop = !1;
			}
		}
		pause() {
			this.paused = !0;
		}
		resume(t) {
			if (!this.paused) throw new Error("Parser was already resumed");
			(this.paused = !1),
				!this.inLoop && (this._runParsingLoop(), this.paused || t?.());
		}
		write(t, u, i) {
			(this.active = !0),
				this.preprocessor.write(t, u),
				this._runParsingLoop(),
				this.paused || i?.();
		}
		insertHtmlAtCurrentPos(t) {
			(this.active = !0),
				this.preprocessor.insertHtmlAtCurrentPos(t),
				this._runParsingLoop();
		}
		_ensureHibernation() {
			return this.preprocessor.endOfChunkHit
				? (this._unconsume(this.consumedAfterSnapshot), (this.active = !1), !0)
				: !1;
		}
		_consume() {
			return this.consumedAfterSnapshot++, this.preprocessor.advance();
		}
		_unconsume(t) {
			(this.consumedAfterSnapshot -= t), this.preprocessor.retreat(t);
		}
		_reconsumeInState(t, u) {
			(this.state = t), this._callState(u);
		}
		_advanceBy(t) {
			this.consumedAfterSnapshot += t;
			for (let u = 0; u < t; u++) this.preprocessor.advance();
		}
		_consumeSequenceIfMatch(t, u) {
			return this.preprocessor.startsWith(t, u)
				? (this._advanceBy(t.length - 1), !0)
				: !1;
		}
		_createStartTagToken() {
			this.currentToken = {
				type: p.START_TAG,
				tagName: "",
				tagID: a.UNKNOWN,
				selfClosing: !1,
				ackSelfClosing: !1,
				attrs: [],
				location: this.getCurrentLocation(1),
			};
		}
		_createEndTagToken() {
			this.currentToken = {
				type: p.END_TAG,
				tagName: "",
				tagID: a.UNKNOWN,
				selfClosing: !1,
				ackSelfClosing: !1,
				attrs: [],
				location: this.getCurrentLocation(2),
			};
		}
		_createCommentToken(t) {
			this.currentToken = {
				type: p.COMMENT,
				data: "",
				location: this.getCurrentLocation(t),
			};
		}
		_createDoctypeToken(t) {
			this.currentToken = {
				type: p.DOCTYPE,
				name: t,
				forceQuirks: !1,
				publicId: null,
				systemId: null,
				location: this.currentLocation,
			};
		}
		_createCharacterToken(t, u) {
			this.currentCharacterToken = {
				type: t,
				chars: u,
				location: this.currentLocation,
			};
		}
		_createAttr(t) {
			(this.currentAttr = { name: t, value: "" }),
				(this.currentLocation = this.getCurrentLocation(0));
		}
		_leaveAttrName() {
			var t, u;
			let i = this.currentToken;
			if (Ot(i, this.currentAttr.name) === null) {
				if (
					(i.attrs.push(this.currentAttr), i.location && this.currentLocation)
				) {
					let n =
						(t = (u = i.location).attrs) !== null && t !== void 0
							? t
							: (u.attrs = Object.create(null));
					(n[this.currentAttr.name] = this.currentLocation),
						this._leaveAttrValue();
				}
			} else this._err(g.duplicateAttribute);
		}
		_leaveAttrValue() {
			this.currentLocation &&
				((this.currentLocation.endLine = this.preprocessor.line),
				(this.currentLocation.endCol = this.preprocessor.col),
				(this.currentLocation.endOffset = this.preprocessor.offset));
		}
		prepareToken(t) {
			this._emitCurrentCharacterToken(t.location),
				(this.currentToken = null),
				t.location &&
					((t.location.endLine = this.preprocessor.line),
					(t.location.endCol = this.preprocessor.col + 1),
					(t.location.endOffset = this.preprocessor.offset + 1)),
				(this.currentLocation = this.getCurrentLocation(-1));
		}
		emitCurrentTagToken() {
			let t = this.currentToken;
			this.prepareToken(t),
				(t.tagID = Be(t.tagName)),
				t.type === p.START_TAG
					? ((this.lastStartTagName = t.tagName), this.handler.onStartTag(t))
					: (t.attrs.length > 0 && this._err(g.endTagWithAttributes),
						t.selfClosing && this._err(g.endTagWithTrailingSolidus),
						this.handler.onEndTag(t)),
				this.preprocessor.dropParsedChunk();
		}
		emitCurrentComment(t) {
			this.prepareToken(t),
				this.handler.onComment(t),
				this.preprocessor.dropParsedChunk();
		}
		emitCurrentDoctype(t) {
			this.prepareToken(t),
				this.handler.onDoctype(t),
				this.preprocessor.dropParsedChunk();
		}
		_emitCurrentCharacterToken(t) {
			if (this.currentCharacterToken) {
				switch (
					(t &&
						this.currentCharacterToken.location &&
						((this.currentCharacterToken.location.endLine = t.startLine),
						(this.currentCharacterToken.location.endCol = t.startCol),
						(this.currentCharacterToken.location.endOffset = t.startOffset)),
					this.currentCharacterToken.type)
				) {
					case p.CHARACTER: {
						this.handler.onCharacter(this.currentCharacterToken);
						break;
					}
					case p.NULL_CHARACTER: {
						this.handler.onNullCharacter(this.currentCharacterToken);
						break;
					}
					case p.WHITESPACE_CHARACTER: {
						this.handler.onWhitespaceCharacter(this.currentCharacterToken);
						break;
					}
				}
				this.currentCharacterToken = null;
			}
		}
		_emitEOFToken() {
			let t = this.getCurrentLocation(0);
			t &&
				((t.endLine = t.startLine),
				(t.endCol = t.startCol),
				(t.endOffset = t.startOffset)),
				this._emitCurrentCharacterToken(t),
				this.handler.onEof({ type: p.EOF, location: t }),
				(this.active = !1);
		}
		_appendCharToCurrentCharacterToken(t, u) {
			if (this.currentCharacterToken)
				if (this.currentCharacterToken.type !== t)
					(this.currentLocation = this.getCurrentLocation(0)),
						this._emitCurrentCharacterToken(this.currentLocation),
						this.preprocessor.dropParsedChunk();
				else {
					this.currentCharacterToken.chars += u;
					return;
				}
			this._createCharacterToken(t, u);
		}
		_emitCodePoint(t) {
			let u = Qi(t)
				? p.WHITESPACE_CHARACTER
				: t === l.NULL
					? p.NULL_CHARACTER
					: p.CHARACTER;
			this._appendCharToCurrentCharacterToken(u, String.fromCodePoint(t));
		}
		_emitChars(t) {
			this._appendCharToCurrentCharacterToken(p.CHARACTER, t);
		}
		_matchNamedCharacterReference(t) {
			let u = null,
				i = 0,
				n = !1;
			for (
				let s = 0, o = Ce[0];
				s >= 0 && ((s = gu(Ce, o, s + 1, t)), !(s < 0));
				t = this._consume()
			) {
				(i += 1), (o = Ce[s]);
				let r = o & he.VALUE_LENGTH;
				if (r) {
					let c = (r >> 14) - 1;
					if (
						(t !== l.SEMICOLON &&
						this._isCharacterReferenceInAttribute() &&
						Us(this.preprocessor.peek(1))
							? ((u = [l.AMPERSAND]), (s += c))
							: ((u =
									c === 0
										? [Ce[s] & ~he.VALUE_LENGTH]
										: c === 1
											? [Ce[++s]]
											: [Ce[++s], Ce[++s]]),
								(i = 0),
								(n = t !== l.SEMICOLON)),
						c === 0)
					) {
						this._consume();
						break;
					}
				}
			}
			return (
				this._unconsume(i),
				n &&
					!this.preprocessor.endOfChunkHit &&
					this._err(g.missingSemicolonAfterCharacterReference),
				this._unconsume(1),
				u
			);
		}
		_isCharacterReferenceInAttribute() {
			return (
				this.returnState === f.ATTRIBUTE_VALUE_DOUBLE_QUOTED ||
				this.returnState === f.ATTRIBUTE_VALUE_SINGLE_QUOTED ||
				this.returnState === f.ATTRIBUTE_VALUE_UNQUOTED
			);
		}
		_flushCodePointConsumedAsCharacterReference(t) {
			this._isCharacterReferenceInAttribute()
				? (this.currentAttr.value += String.fromCodePoint(t))
				: this._emitCodePoint(t);
		}
		_callState(t) {
			switch (this.state) {
				case f.DATA: {
					this._stateData(t);
					break;
				}
				case f.RCDATA: {
					this._stateRcdata(t);
					break;
				}
				case f.RAWTEXT: {
					this._stateRawtext(t);
					break;
				}
				case f.SCRIPT_DATA: {
					this._stateScriptData(t);
					break;
				}
				case f.PLAINTEXT: {
					this._statePlaintext(t);
					break;
				}
				case f.TAG_OPEN: {
					this._stateTagOpen(t);
					break;
				}
				case f.END_TAG_OPEN: {
					this._stateEndTagOpen(t);
					break;
				}
				case f.TAG_NAME: {
					this._stateTagName(t);
					break;
				}
				case f.RCDATA_LESS_THAN_SIGN: {
					this._stateRcdataLessThanSign(t);
					break;
				}
				case f.RCDATA_END_TAG_OPEN: {
					this._stateRcdataEndTagOpen(t);
					break;
				}
				case f.RCDATA_END_TAG_NAME: {
					this._stateRcdataEndTagName(t);
					break;
				}
				case f.RAWTEXT_LESS_THAN_SIGN: {
					this._stateRawtextLessThanSign(t);
					break;
				}
				case f.RAWTEXT_END_TAG_OPEN: {
					this._stateRawtextEndTagOpen(t);
					break;
				}
				case f.RAWTEXT_END_TAG_NAME: {
					this._stateRawtextEndTagName(t);
					break;
				}
				case f.SCRIPT_DATA_LESS_THAN_SIGN: {
					this._stateScriptDataLessThanSign(t);
					break;
				}
				case f.SCRIPT_DATA_END_TAG_OPEN: {
					this._stateScriptDataEndTagOpen(t);
					break;
				}
				case f.SCRIPT_DATA_END_TAG_NAME: {
					this._stateScriptDataEndTagName(t);
					break;
				}
				case f.SCRIPT_DATA_ESCAPE_START: {
					this._stateScriptDataEscapeStart(t);
					break;
				}
				case f.SCRIPT_DATA_ESCAPE_START_DASH: {
					this._stateScriptDataEscapeStartDash(t);
					break;
				}
				case f.SCRIPT_DATA_ESCAPED: {
					this._stateScriptDataEscaped(t);
					break;
				}
				case f.SCRIPT_DATA_ESCAPED_DASH: {
					this._stateScriptDataEscapedDash(t);
					break;
				}
				case f.SCRIPT_DATA_ESCAPED_DASH_DASH: {
					this._stateScriptDataEscapedDashDash(t);
					break;
				}
				case f.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN: {
					this._stateScriptDataEscapedLessThanSign(t);
					break;
				}
				case f.SCRIPT_DATA_ESCAPED_END_TAG_OPEN: {
					this._stateScriptDataEscapedEndTagOpen(t);
					break;
				}
				case f.SCRIPT_DATA_ESCAPED_END_TAG_NAME: {
					this._stateScriptDataEscapedEndTagName(t);
					break;
				}
				case f.SCRIPT_DATA_DOUBLE_ESCAPE_START: {
					this._stateScriptDataDoubleEscapeStart(t);
					break;
				}
				case f.SCRIPT_DATA_DOUBLE_ESCAPED: {
					this._stateScriptDataDoubleEscaped(t);
					break;
				}
				case f.SCRIPT_DATA_DOUBLE_ESCAPED_DASH: {
					this._stateScriptDataDoubleEscapedDash(t);
					break;
				}
				case f.SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH: {
					this._stateScriptDataDoubleEscapedDashDash(t);
					break;
				}
				case f.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN: {
					this._stateScriptDataDoubleEscapedLessThanSign(t);
					break;
				}
				case f.SCRIPT_DATA_DOUBLE_ESCAPE_END: {
					this._stateScriptDataDoubleEscapeEnd(t);
					break;
				}
				case f.BEFORE_ATTRIBUTE_NAME: {
					this._stateBeforeAttributeName(t);
					break;
				}
				case f.ATTRIBUTE_NAME: {
					this._stateAttributeName(t);
					break;
				}
				case f.AFTER_ATTRIBUTE_NAME: {
					this._stateAfterAttributeName(t);
					break;
				}
				case f.BEFORE_ATTRIBUTE_VALUE: {
					this._stateBeforeAttributeValue(t);
					break;
				}
				case f.ATTRIBUTE_VALUE_DOUBLE_QUOTED: {
					this._stateAttributeValueDoubleQuoted(t);
					break;
				}
				case f.ATTRIBUTE_VALUE_SINGLE_QUOTED: {
					this._stateAttributeValueSingleQuoted(t);
					break;
				}
				case f.ATTRIBUTE_VALUE_UNQUOTED: {
					this._stateAttributeValueUnquoted(t);
					break;
				}
				case f.AFTER_ATTRIBUTE_VALUE_QUOTED: {
					this._stateAfterAttributeValueQuoted(t);
					break;
				}
				case f.SELF_CLOSING_START_TAG: {
					this._stateSelfClosingStartTag(t);
					break;
				}
				case f.BOGUS_COMMENT: {
					this._stateBogusComment(t);
					break;
				}
				case f.MARKUP_DECLARATION_OPEN: {
					this._stateMarkupDeclarationOpen(t);
					break;
				}
				case f.COMMENT_START: {
					this._stateCommentStart(t);
					break;
				}
				case f.COMMENT_START_DASH: {
					this._stateCommentStartDash(t);
					break;
				}
				case f.COMMENT: {
					this._stateComment(t);
					break;
				}
				case f.COMMENT_LESS_THAN_SIGN: {
					this._stateCommentLessThanSign(t);
					break;
				}
				case f.COMMENT_LESS_THAN_SIGN_BANG: {
					this._stateCommentLessThanSignBang(t);
					break;
				}
				case f.COMMENT_LESS_THAN_SIGN_BANG_DASH: {
					this._stateCommentLessThanSignBangDash(t);
					break;
				}
				case f.COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH: {
					this._stateCommentLessThanSignBangDashDash(t);
					break;
				}
				case f.COMMENT_END_DASH: {
					this._stateCommentEndDash(t);
					break;
				}
				case f.COMMENT_END: {
					this._stateCommentEnd(t);
					break;
				}
				case f.COMMENT_END_BANG: {
					this._stateCommentEndBang(t);
					break;
				}
				case f.DOCTYPE: {
					this._stateDoctype(t);
					break;
				}
				case f.BEFORE_DOCTYPE_NAME: {
					this._stateBeforeDoctypeName(t);
					break;
				}
				case f.DOCTYPE_NAME: {
					this._stateDoctypeName(t);
					break;
				}
				case f.AFTER_DOCTYPE_NAME: {
					this._stateAfterDoctypeName(t);
					break;
				}
				case f.AFTER_DOCTYPE_PUBLIC_KEYWORD: {
					this._stateAfterDoctypePublicKeyword(t);
					break;
				}
				case f.BEFORE_DOCTYPE_PUBLIC_IDENTIFIER: {
					this._stateBeforeDoctypePublicIdentifier(t);
					break;
				}
				case f.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED: {
					this._stateDoctypePublicIdentifierDoubleQuoted(t);
					break;
				}
				case f.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED: {
					this._stateDoctypePublicIdentifierSingleQuoted(t);
					break;
				}
				case f.AFTER_DOCTYPE_PUBLIC_IDENTIFIER: {
					this._stateAfterDoctypePublicIdentifier(t);
					break;
				}
				case f.BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS: {
					this._stateBetweenDoctypePublicAndSystemIdentifiers(t);
					break;
				}
				case f.AFTER_DOCTYPE_SYSTEM_KEYWORD: {
					this._stateAfterDoctypeSystemKeyword(t);
					break;
				}
				case f.BEFORE_DOCTYPE_SYSTEM_IDENTIFIER: {
					this._stateBeforeDoctypeSystemIdentifier(t);
					break;
				}
				case f.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED: {
					this._stateDoctypeSystemIdentifierDoubleQuoted(t);
					break;
				}
				case f.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED: {
					this._stateDoctypeSystemIdentifierSingleQuoted(t);
					break;
				}
				case f.AFTER_DOCTYPE_SYSTEM_IDENTIFIER: {
					this._stateAfterDoctypeSystemIdentifier(t);
					break;
				}
				case f.BOGUS_DOCTYPE: {
					this._stateBogusDoctype(t);
					break;
				}
				case f.CDATA_SECTION: {
					this._stateCdataSection(t);
					break;
				}
				case f.CDATA_SECTION_BRACKET: {
					this._stateCdataSectionBracket(t);
					break;
				}
				case f.CDATA_SECTION_END: {
					this._stateCdataSectionEnd(t);
					break;
				}
				case f.CHARACTER_REFERENCE: {
					this._stateCharacterReference(t);
					break;
				}
				case f.NAMED_CHARACTER_REFERENCE: {
					this._stateNamedCharacterReference(t);
					break;
				}
				case f.AMBIGUOUS_AMPERSAND: {
					this._stateAmbiguousAmpersand(t);
					break;
				}
				case f.NUMERIC_CHARACTER_REFERENCE: {
					this._stateNumericCharacterReference(t);
					break;
				}
				case f.HEXADEMICAL_CHARACTER_REFERENCE_START: {
					this._stateHexademicalCharacterReferenceStart(t);
					break;
				}
				case f.HEXADEMICAL_CHARACTER_REFERENCE: {
					this._stateHexademicalCharacterReference(t);
					break;
				}
				case f.DECIMAL_CHARACTER_REFERENCE: {
					this._stateDecimalCharacterReference(t);
					break;
				}
				case f.NUMERIC_CHARACTER_REFERENCE_END: {
					this._stateNumericCharacterReferenceEnd(t);
					break;
				}
				default:
					throw new Error("Unknown state");
			}
		}
		_stateData(t) {
			switch (t) {
				case l.LESS_THAN_SIGN: {
					this.state = f.TAG_OPEN;
					break;
				}
				case l.AMPERSAND: {
					(this.returnState = f.DATA), (this.state = f.CHARACTER_REFERENCE);
					break;
				}
				case l.NULL: {
					this._err(g.unexpectedNullCharacter), this._emitCodePoint(t);
					break;
				}
				case l.EOF: {
					this._emitEOFToken();
					break;
				}
				default:
					this._emitCodePoint(t);
			}
		}
		_stateRcdata(t) {
			switch (t) {
				case l.AMPERSAND: {
					(this.returnState = f.RCDATA), (this.state = f.CHARACTER_REFERENCE);
					break;
				}
				case l.LESS_THAN_SIGN: {
					this.state = f.RCDATA_LESS_THAN_SIGN;
					break;
				}
				case l.NULL: {
					this._err(g.unexpectedNullCharacter), this._emitChars(Q);
					break;
				}
				case l.EOF: {
					this._emitEOFToken();
					break;
				}
				default:
					this._emitCodePoint(t);
			}
		}
		_stateRawtext(t) {
			switch (t) {
				case l.LESS_THAN_SIGN: {
					this.state = f.RAWTEXT_LESS_THAN_SIGN;
					break;
				}
				case l.NULL: {
					this._err(g.unexpectedNullCharacter), this._emitChars(Q);
					break;
				}
				case l.EOF: {
					this._emitEOFToken();
					break;
				}
				default:
					this._emitCodePoint(t);
			}
		}
		_stateScriptData(t) {
			switch (t) {
				case l.LESS_THAN_SIGN: {
					this.state = f.SCRIPT_DATA_LESS_THAN_SIGN;
					break;
				}
				case l.NULL: {
					this._err(g.unexpectedNullCharacter), this._emitChars(Q);
					break;
				}
				case l.EOF: {
					this._emitEOFToken();
					break;
				}
				default:
					this._emitCodePoint(t);
			}
		}
		_statePlaintext(t) {
			switch (t) {
				case l.NULL: {
					this._err(g.unexpectedNullCharacter), this._emitChars(Q);
					break;
				}
				case l.EOF: {
					this._emitEOFToken();
					break;
				}
				default:
					this._emitCodePoint(t);
			}
		}
		_stateTagOpen(t) {
			if (ke(t))
				this._createStartTagToken(),
					(this.state = f.TAG_NAME),
					this._stateTagName(t);
			else
				switch (t) {
					case l.EXCLAMATION_MARK: {
						this.state = f.MARKUP_DECLARATION_OPEN;
						break;
					}
					case l.SOLIDUS: {
						this.state = f.END_TAG_OPEN;
						break;
					}
					case l.QUESTION_MARK: {
						this._err(g.unexpectedQuestionMarkInsteadOfTagName),
							this._createCommentToken(1),
							(this.state = f.BOGUS_COMMENT),
							this._stateBogusComment(t);
						break;
					}
					case l.EOF: {
						this._err(g.eofBeforeTagName),
							this._emitChars("<"),
							this._emitEOFToken();
						break;
					}
					default:
						this._err(g.invalidFirstCharacterOfTagName),
							this._emitChars("<"),
							(this.state = f.DATA),
							this._stateData(t);
				}
		}
		_stateEndTagOpen(t) {
			if (ke(t))
				this._createEndTagToken(),
					(this.state = f.TAG_NAME),
					this._stateTagName(t);
			else
				switch (t) {
					case l.GREATER_THAN_SIGN: {
						this._err(g.missingEndTagName), (this.state = f.DATA);
						break;
					}
					case l.EOF: {
						this._err(g.eofBeforeTagName),
							this._emitChars("</"),
							this._emitEOFToken();
						break;
					}
					default:
						this._err(g.invalidFirstCharacterOfTagName),
							this._createCommentToken(2),
							(this.state = f.BOGUS_COMMENT),
							this._stateBogusComment(t);
				}
		}
		_stateTagName(t) {
			let u = this.currentToken;
			switch (t) {
				case l.SPACE:
				case l.LINE_FEED:
				case l.TABULATION:
				case l.FORM_FEED: {
					this.state = f.BEFORE_ATTRIBUTE_NAME;
					break;
				}
				case l.SOLIDUS: {
					this.state = f.SELF_CLOSING_START_TAG;
					break;
				}
				case l.GREATER_THAN_SIGN: {
					(this.state = f.DATA), this.emitCurrentTagToken();
					break;
				}
				case l.NULL: {
					this._err(g.unexpectedNullCharacter), (u.tagName += Q);
					break;
				}
				case l.EOF: {
					this._err(g.eofInTag), this._emitEOFToken();
					break;
				}
				default:
					u.tagName += String.fromCodePoint(nt(t) ? wt(t) : t);
			}
		}
		_stateRcdataLessThanSign(t) {
			t === l.SOLIDUS
				? (this.state = f.RCDATA_END_TAG_OPEN)
				: (this._emitChars("<"), (this.state = f.RCDATA), this._stateRcdata(t));
		}
		_stateRcdataEndTagOpen(t) {
			ke(t)
				? ((this.state = f.RCDATA_END_TAG_NAME), this._stateRcdataEndTagName(t))
				: (this._emitChars("</"),
					(this.state = f.RCDATA),
					this._stateRcdata(t));
		}
		handleSpecialEndTag(t) {
			if (!this.preprocessor.startsWith(this.lastStartTagName, !1))
				return !this._ensureHibernation();
			this._createEndTagToken();
			let u = this.currentToken;
			switch (
				((u.tagName = this.lastStartTagName),
				this.preprocessor.peek(this.lastStartTagName.length))
			) {
				case l.SPACE:
				case l.LINE_FEED:
				case l.TABULATION:
				case l.FORM_FEED:
					return (
						this._advanceBy(this.lastStartTagName.length),
						(this.state = f.BEFORE_ATTRIBUTE_NAME),
						!1
					);
				case l.SOLIDUS:
					return (
						this._advanceBy(this.lastStartTagName.length),
						(this.state = f.SELF_CLOSING_START_TAG),
						!1
					);
				case l.GREATER_THAN_SIGN:
					return (
						this._advanceBy(this.lastStartTagName.length),
						this.emitCurrentTagToken(),
						(this.state = f.DATA),
						!1
					);
				default:
					return !this._ensureHibernation();
			}
		}
		_stateRcdataEndTagName(t) {
			this.handleSpecialEndTag(t) &&
				(this._emitChars("</"), (this.state = f.RCDATA), this._stateRcdata(t));
		}
		_stateRawtextLessThanSign(t) {
			t === l.SOLIDUS
				? (this.state = f.RAWTEXT_END_TAG_OPEN)
				: (this._emitChars("<"),
					(this.state = f.RAWTEXT),
					this._stateRawtext(t));
		}
		_stateRawtextEndTagOpen(t) {
			ke(t)
				? ((this.state = f.RAWTEXT_END_TAG_NAME),
					this._stateRawtextEndTagName(t))
				: (this._emitChars("</"),
					(this.state = f.RAWTEXT),
					this._stateRawtext(t));
		}
		_stateRawtextEndTagName(t) {
			this.handleSpecialEndTag(t) &&
				(this._emitChars("</"),
				(this.state = f.RAWTEXT),
				this._stateRawtext(t));
		}
		_stateScriptDataLessThanSign(t) {
			switch (t) {
				case l.SOLIDUS: {
					this.state = f.SCRIPT_DATA_END_TAG_OPEN;
					break;
				}
				case l.EXCLAMATION_MARK: {
					(this.state = f.SCRIPT_DATA_ESCAPE_START), this._emitChars("<!");
					break;
				}
				default:
					this._emitChars("<"),
						(this.state = f.SCRIPT_DATA),
						this._stateScriptData(t);
			}
		}
		_stateScriptDataEndTagOpen(t) {
			ke(t)
				? ((this.state = f.SCRIPT_DATA_END_TAG_NAME),
					this._stateScriptDataEndTagName(t))
				: (this._emitChars("</"),
					(this.state = f.SCRIPT_DATA),
					this._stateScriptData(t));
		}
		_stateScriptDataEndTagName(t) {
			this.handleSpecialEndTag(t) &&
				(this._emitChars("</"),
				(this.state = f.SCRIPT_DATA),
				this._stateScriptData(t));
		}
		_stateScriptDataEscapeStart(t) {
			t === l.HYPHEN_MINUS
				? ((this.state = f.SCRIPT_DATA_ESCAPE_START_DASH), this._emitChars("-"))
				: ((this.state = f.SCRIPT_DATA), this._stateScriptData(t));
		}
		_stateScriptDataEscapeStartDash(t) {
			t === l.HYPHEN_MINUS
				? ((this.state = f.SCRIPT_DATA_ESCAPED_DASH_DASH), this._emitChars("-"))
				: ((this.state = f.SCRIPT_DATA), this._stateScriptData(t));
		}
		_stateScriptDataEscaped(t) {
			switch (t) {
				case l.HYPHEN_MINUS: {
					(this.state = f.SCRIPT_DATA_ESCAPED_DASH), this._emitChars("-");
					break;
				}
				case l.LESS_THAN_SIGN: {
					this.state = f.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN;
					break;
				}
				case l.NULL: {
					this._err(g.unexpectedNullCharacter), this._emitChars(Q);
					break;
				}
				case l.EOF: {
					this._err(g.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
					break;
				}
				default:
					this._emitCodePoint(t);
			}
		}
		_stateScriptDataEscapedDash(t) {
			switch (t) {
				case l.HYPHEN_MINUS: {
					(this.state = f.SCRIPT_DATA_ESCAPED_DASH_DASH), this._emitChars("-");
					break;
				}
				case l.LESS_THAN_SIGN: {
					this.state = f.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN;
					break;
				}
				case l.NULL: {
					this._err(g.unexpectedNullCharacter),
						(this.state = f.SCRIPT_DATA_ESCAPED),
						this._emitChars(Q);
					break;
				}
				case l.EOF: {
					this._err(g.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
					break;
				}
				default:
					(this.state = f.SCRIPT_DATA_ESCAPED), this._emitCodePoint(t);
			}
		}
		_stateScriptDataEscapedDashDash(t) {
			switch (t) {
				case l.HYPHEN_MINUS: {
					this._emitChars("-");
					break;
				}
				case l.LESS_THAN_SIGN: {
					this.state = f.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN;
					break;
				}
				case l.GREATER_THAN_SIGN: {
					(this.state = f.SCRIPT_DATA), this._emitChars(">");
					break;
				}
				case l.NULL: {
					this._err(g.unexpectedNullCharacter),
						(this.state = f.SCRIPT_DATA_ESCAPED),
						this._emitChars(Q);
					break;
				}
				case l.EOF: {
					this._err(g.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
					break;
				}
				default:
					(this.state = f.SCRIPT_DATA_ESCAPED), this._emitCodePoint(t);
			}
		}
		_stateScriptDataEscapedLessThanSign(t) {
			t === l.SOLIDUS
				? (this.state = f.SCRIPT_DATA_ESCAPED_END_TAG_OPEN)
				: ke(t)
					? (this._emitChars("<"),
						(this.state = f.SCRIPT_DATA_DOUBLE_ESCAPE_START),
						this._stateScriptDataDoubleEscapeStart(t))
					: (this._emitChars("<"),
						(this.state = f.SCRIPT_DATA_ESCAPED),
						this._stateScriptDataEscaped(t));
		}
		_stateScriptDataEscapedEndTagOpen(t) {
			ke(t)
				? ((this.state = f.SCRIPT_DATA_ESCAPED_END_TAG_NAME),
					this._stateScriptDataEscapedEndTagName(t))
				: (this._emitChars("</"),
					(this.state = f.SCRIPT_DATA_ESCAPED),
					this._stateScriptDataEscaped(t));
		}
		_stateScriptDataEscapedEndTagName(t) {
			this.handleSpecialEndTag(t) &&
				(this._emitChars("</"),
				(this.state = f.SCRIPT_DATA_ESCAPED),
				this._stateScriptDataEscaped(t));
		}
		_stateScriptDataDoubleEscapeStart(t) {
			if (
				this.preprocessor.startsWith(ue.SCRIPT, !1) &&
				Vi(this.preprocessor.peek(ue.SCRIPT.length))
			) {
				this._emitCodePoint(t);
				for (let u = 0; u < ue.SCRIPT.length; u++)
					this._emitCodePoint(this._consume());
				this.state = f.SCRIPT_DATA_DOUBLE_ESCAPED;
			} else
				this._ensureHibernation() ||
					((this.state = f.SCRIPT_DATA_ESCAPED),
					this._stateScriptDataEscaped(t));
		}
		_stateScriptDataDoubleEscaped(t) {
			switch (t) {
				case l.HYPHEN_MINUS: {
					(this.state = f.SCRIPT_DATA_DOUBLE_ESCAPED_DASH),
						this._emitChars("-");
					break;
				}
				case l.LESS_THAN_SIGN: {
					(this.state = f.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN),
						this._emitChars("<");
					break;
				}
				case l.NULL: {
					this._err(g.unexpectedNullCharacter), this._emitChars(Q);
					break;
				}
				case l.EOF: {
					this._err(g.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
					break;
				}
				default:
					this._emitCodePoint(t);
			}
		}
		_stateScriptDataDoubleEscapedDash(t) {
			switch (t) {
				case l.HYPHEN_MINUS: {
					(this.state = f.SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH),
						this._emitChars("-");
					break;
				}
				case l.LESS_THAN_SIGN: {
					(this.state = f.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN),
						this._emitChars("<");
					break;
				}
				case l.NULL: {
					this._err(g.unexpectedNullCharacter),
						(this.state = f.SCRIPT_DATA_DOUBLE_ESCAPED),
						this._emitChars(Q);
					break;
				}
				case l.EOF: {
					this._err(g.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
					break;
				}
				default:
					(this.state = f.SCRIPT_DATA_DOUBLE_ESCAPED), this._emitCodePoint(t);
			}
		}
		_stateScriptDataDoubleEscapedDashDash(t) {
			switch (t) {
				case l.HYPHEN_MINUS: {
					this._emitChars("-");
					break;
				}
				case l.LESS_THAN_SIGN: {
					(this.state = f.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN),
						this._emitChars("<");
					break;
				}
				case l.GREATER_THAN_SIGN: {
					(this.state = f.SCRIPT_DATA), this._emitChars(">");
					break;
				}
				case l.NULL: {
					this._err(g.unexpectedNullCharacter),
						(this.state = f.SCRIPT_DATA_DOUBLE_ESCAPED),
						this._emitChars(Q);
					break;
				}
				case l.EOF: {
					this._err(g.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
					break;
				}
				default:
					(this.state = f.SCRIPT_DATA_DOUBLE_ESCAPED), this._emitCodePoint(t);
			}
		}
		_stateScriptDataDoubleEscapedLessThanSign(t) {
			t === l.SOLIDUS
				? ((this.state = f.SCRIPT_DATA_DOUBLE_ESCAPE_END), this._emitChars("/"))
				: ((this.state = f.SCRIPT_DATA_DOUBLE_ESCAPED),
					this._stateScriptDataDoubleEscaped(t));
		}
		_stateScriptDataDoubleEscapeEnd(t) {
			if (
				this.preprocessor.startsWith(ue.SCRIPT, !1) &&
				Vi(this.preprocessor.peek(ue.SCRIPT.length))
			) {
				this._emitCodePoint(t);
				for (let u = 0; u < ue.SCRIPT.length; u++)
					this._emitCodePoint(this._consume());
				this.state = f.SCRIPT_DATA_ESCAPED;
			} else
				this._ensureHibernation() ||
					((this.state = f.SCRIPT_DATA_DOUBLE_ESCAPED),
					this._stateScriptDataDoubleEscaped(t));
		}
		_stateBeforeAttributeName(t) {
			switch (t) {
				case l.SPACE:
				case l.LINE_FEED:
				case l.TABULATION:
				case l.FORM_FEED:
					break;
				case l.SOLIDUS:
				case l.GREATER_THAN_SIGN:
				case l.EOF: {
					(this.state = f.AFTER_ATTRIBUTE_NAME),
						this._stateAfterAttributeName(t);
					break;
				}
				case l.EQUALS_SIGN: {
					this._err(g.unexpectedEqualsSignBeforeAttributeName),
						this._createAttr("="),
						(this.state = f.ATTRIBUTE_NAME);
					break;
				}
				default:
					this._createAttr(""),
						(this.state = f.ATTRIBUTE_NAME),
						this._stateAttributeName(t);
			}
		}
		_stateAttributeName(t) {
			switch (t) {
				case l.SPACE:
				case l.LINE_FEED:
				case l.TABULATION:
				case l.FORM_FEED:
				case l.SOLIDUS:
				case l.GREATER_THAN_SIGN:
				case l.EOF: {
					this._leaveAttrName(),
						(this.state = f.AFTER_ATTRIBUTE_NAME),
						this._stateAfterAttributeName(t);
					break;
				}
				case l.EQUALS_SIGN: {
					this._leaveAttrName(), (this.state = f.BEFORE_ATTRIBUTE_VALUE);
					break;
				}
				case l.QUOTATION_MARK:
				case l.APOSTROPHE:
				case l.LESS_THAN_SIGN: {
					this._err(g.unexpectedCharacterInAttributeName),
						(this.currentAttr.name += String.fromCodePoint(t));
					break;
				}
				case l.NULL: {
					this._err(g.unexpectedNullCharacter), (this.currentAttr.name += Q);
					break;
				}
				default:
					this.currentAttr.name += String.fromCodePoint(nt(t) ? wt(t) : t);
			}
		}
		_stateAfterAttributeName(t) {
			switch (t) {
				case l.SPACE:
				case l.LINE_FEED:
				case l.TABULATION:
				case l.FORM_FEED:
					break;
				case l.SOLIDUS: {
					this.state = f.SELF_CLOSING_START_TAG;
					break;
				}
				case l.EQUALS_SIGN: {
					this.state = f.BEFORE_ATTRIBUTE_VALUE;
					break;
				}
				case l.GREATER_THAN_SIGN: {
					(this.state = f.DATA), this.emitCurrentTagToken();
					break;
				}
				case l.EOF: {
					this._err(g.eofInTag), this._emitEOFToken();
					break;
				}
				default:
					this._createAttr(""),
						(this.state = f.ATTRIBUTE_NAME),
						this._stateAttributeName(t);
			}
		}
		_stateBeforeAttributeValue(t) {
			switch (t) {
				case l.SPACE:
				case l.LINE_FEED:
				case l.TABULATION:
				case l.FORM_FEED:
					break;
				case l.QUOTATION_MARK: {
					this.state = f.ATTRIBUTE_VALUE_DOUBLE_QUOTED;
					break;
				}
				case l.APOSTROPHE: {
					this.state = f.ATTRIBUTE_VALUE_SINGLE_QUOTED;
					break;
				}
				case l.GREATER_THAN_SIGN: {
					this._err(g.missingAttributeValue),
						(this.state = f.DATA),
						this.emitCurrentTagToken();
					break;
				}
				default:
					(this.state = f.ATTRIBUTE_VALUE_UNQUOTED),
						this._stateAttributeValueUnquoted(t);
			}
		}
		_stateAttributeValueDoubleQuoted(t) {
			switch (t) {
				case l.QUOTATION_MARK: {
					this.state = f.AFTER_ATTRIBUTE_VALUE_QUOTED;
					break;
				}
				case l.AMPERSAND: {
					(this.returnState = f.ATTRIBUTE_VALUE_DOUBLE_QUOTED),
						(this.state = f.CHARACTER_REFERENCE);
					break;
				}
				case l.NULL: {
					this._err(g.unexpectedNullCharacter), (this.currentAttr.value += Q);
					break;
				}
				case l.EOF: {
					this._err(g.eofInTag), this._emitEOFToken();
					break;
				}
				default:
					this.currentAttr.value += String.fromCodePoint(t);
			}
		}
		_stateAttributeValueSingleQuoted(t) {
			switch (t) {
				case l.APOSTROPHE: {
					this.state = f.AFTER_ATTRIBUTE_VALUE_QUOTED;
					break;
				}
				case l.AMPERSAND: {
					(this.returnState = f.ATTRIBUTE_VALUE_SINGLE_QUOTED),
						(this.state = f.CHARACTER_REFERENCE);
					break;
				}
				case l.NULL: {
					this._err(g.unexpectedNullCharacter), (this.currentAttr.value += Q);
					break;
				}
				case l.EOF: {
					this._err(g.eofInTag), this._emitEOFToken();
					break;
				}
				default:
					this.currentAttr.value += String.fromCodePoint(t);
			}
		}
		_stateAttributeValueUnquoted(t) {
			switch (t) {
				case l.SPACE:
				case l.LINE_FEED:
				case l.TABULATION:
				case l.FORM_FEED: {
					this._leaveAttrValue(), (this.state = f.BEFORE_ATTRIBUTE_NAME);
					break;
				}
				case l.AMPERSAND: {
					(this.returnState = f.ATTRIBUTE_VALUE_UNQUOTED),
						(this.state = f.CHARACTER_REFERENCE);
					break;
				}
				case l.GREATER_THAN_SIGN: {
					this._leaveAttrValue(),
						(this.state = f.DATA),
						this.emitCurrentTagToken();
					break;
				}
				case l.NULL: {
					this._err(g.unexpectedNullCharacter), (this.currentAttr.value += Q);
					break;
				}
				case l.QUOTATION_MARK:
				case l.APOSTROPHE:
				case l.LESS_THAN_SIGN:
				case l.EQUALS_SIGN:
				case l.GRAVE_ACCENT: {
					this._err(g.unexpectedCharacterInUnquotedAttributeValue),
						(this.currentAttr.value += String.fromCodePoint(t));
					break;
				}
				case l.EOF: {
					this._err(g.eofInTag), this._emitEOFToken();
					break;
				}
				default:
					this.currentAttr.value += String.fromCodePoint(t);
			}
		}
		_stateAfterAttributeValueQuoted(t) {
			switch (t) {
				case l.SPACE:
				case l.LINE_FEED:
				case l.TABULATION:
				case l.FORM_FEED: {
					this._leaveAttrValue(), (this.state = f.BEFORE_ATTRIBUTE_NAME);
					break;
				}
				case l.SOLIDUS: {
					this._leaveAttrValue(), (this.state = f.SELF_CLOSING_START_TAG);
					break;
				}
				case l.GREATER_THAN_SIGN: {
					this._leaveAttrValue(),
						(this.state = f.DATA),
						this.emitCurrentTagToken();
					break;
				}
				case l.EOF: {
					this._err(g.eofInTag), this._emitEOFToken();
					break;
				}
				default:
					this._err(g.missingWhitespaceBetweenAttributes),
						(this.state = f.BEFORE_ATTRIBUTE_NAME),
						this._stateBeforeAttributeName(t);
			}
		}
		_stateSelfClosingStartTag(t) {
			switch (t) {
				case l.GREATER_THAN_SIGN: {
					let u = this.currentToken;
					(u.selfClosing = !0),
						(this.state = f.DATA),
						this.emitCurrentTagToken();
					break;
				}
				case l.EOF: {
					this._err(g.eofInTag), this._emitEOFToken();
					break;
				}
				default:
					this._err(g.unexpectedSolidusInTag),
						(this.state = f.BEFORE_ATTRIBUTE_NAME),
						this._stateBeforeAttributeName(t);
			}
		}
		_stateBogusComment(t) {
			let u = this.currentToken;
			switch (t) {
				case l.GREATER_THAN_SIGN: {
					(this.state = f.DATA), this.emitCurrentComment(u);
					break;
				}
				case l.EOF: {
					this.emitCurrentComment(u), this._emitEOFToken();
					break;
				}
				case l.NULL: {
					this._err(g.unexpectedNullCharacter), (u.data += Q);
					break;
				}
				default:
					u.data += String.fromCodePoint(t);
			}
		}
		_stateMarkupDeclarationOpen(t) {
			this._consumeSequenceIfMatch(ue.DASH_DASH, !0)
				? (this._createCommentToken(ue.DASH_DASH.length + 1),
					(this.state = f.COMMENT_START))
				: this._consumeSequenceIfMatch(ue.DOCTYPE, !1)
					? ((this.currentLocation = this.getCurrentLocation(
							ue.DOCTYPE.length + 1
						)),
						(this.state = f.DOCTYPE))
					: this._consumeSequenceIfMatch(ue.CDATA_START, !0)
						? this.inForeignNode
							? (this.state = f.CDATA_SECTION)
							: (this._err(g.cdataInHtmlContent),
								this._createCommentToken(ue.CDATA_START.length + 1),
								(this.currentToken.data = "[CDATA["),
								(this.state = f.BOGUS_COMMENT))
						: this._ensureHibernation() ||
							(this._err(g.incorrectlyOpenedComment),
							this._createCommentToken(2),
							(this.state = f.BOGUS_COMMENT),
							this._stateBogusComment(t));
		}
		_stateCommentStart(t) {
			switch (t) {
				case l.HYPHEN_MINUS: {
					this.state = f.COMMENT_START_DASH;
					break;
				}
				case l.GREATER_THAN_SIGN: {
					this._err(g.abruptClosingOfEmptyComment), (this.state = f.DATA);
					let u = this.currentToken;
					this.emitCurrentComment(u);
					break;
				}
				default:
					(this.state = f.COMMENT), this._stateComment(t);
			}
		}
		_stateCommentStartDash(t) {
			let u = this.currentToken;
			switch (t) {
				case l.HYPHEN_MINUS: {
					this.state = f.COMMENT_END;
					break;
				}
				case l.GREATER_THAN_SIGN: {
					this._err(g.abruptClosingOfEmptyComment),
						(this.state = f.DATA),
						this.emitCurrentComment(u);
					break;
				}
				case l.EOF: {
					this._err(g.eofInComment),
						this.emitCurrentComment(u),
						this._emitEOFToken();
					break;
				}
				default:
					(u.data += "-"), (this.state = f.COMMENT), this._stateComment(t);
			}
		}
		_stateComment(t) {
			let u = this.currentToken;
			switch (t) {
				case l.HYPHEN_MINUS: {
					this.state = f.COMMENT_END_DASH;
					break;
				}
				case l.LESS_THAN_SIGN: {
					(u.data += "<"), (this.state = f.COMMENT_LESS_THAN_SIGN);
					break;
				}
				case l.NULL: {
					this._err(g.unexpectedNullCharacter), (u.data += Q);
					break;
				}
				case l.EOF: {
					this._err(g.eofInComment),
						this.emitCurrentComment(u),
						this._emitEOFToken();
					break;
				}
				default:
					u.data += String.fromCodePoint(t);
			}
		}
		_stateCommentLessThanSign(t) {
			let u = this.currentToken;
			switch (t) {
				case l.EXCLAMATION_MARK: {
					(u.data += "!"), (this.state = f.COMMENT_LESS_THAN_SIGN_BANG);
					break;
				}
				case l.LESS_THAN_SIGN: {
					u.data += "<";
					break;
				}
				default:
					(this.state = f.COMMENT), this._stateComment(t);
			}
		}
		_stateCommentLessThanSignBang(t) {
			t === l.HYPHEN_MINUS
				? (this.state = f.COMMENT_LESS_THAN_SIGN_BANG_DASH)
				: ((this.state = f.COMMENT), this._stateComment(t));
		}
		_stateCommentLessThanSignBangDash(t) {
			t === l.HYPHEN_MINUS
				? (this.state = f.COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH)
				: ((this.state = f.COMMENT_END_DASH), this._stateCommentEndDash(t));
		}
		_stateCommentLessThanSignBangDashDash(t) {
			t !== l.GREATER_THAN_SIGN && t !== l.EOF && this._err(g.nestedComment),
				(this.state = f.COMMENT_END),
				this._stateCommentEnd(t);
		}
		_stateCommentEndDash(t) {
			let u = this.currentToken;
			switch (t) {
				case l.HYPHEN_MINUS: {
					this.state = f.COMMENT_END;
					break;
				}
				case l.EOF: {
					this._err(g.eofInComment),
						this.emitCurrentComment(u),
						this._emitEOFToken();
					break;
				}
				default:
					(u.data += "-"), (this.state = f.COMMENT), this._stateComment(t);
			}
		}
		_stateCommentEnd(t) {
			let u = this.currentToken;
			switch (t) {
				case l.GREATER_THAN_SIGN: {
					(this.state = f.DATA), this.emitCurrentComment(u);
					break;
				}
				case l.EXCLAMATION_MARK: {
					this.state = f.COMMENT_END_BANG;
					break;
				}
				case l.HYPHEN_MINUS: {
					u.data += "-";
					break;
				}
				case l.EOF: {
					this._err(g.eofInComment),
						this.emitCurrentComment(u),
						this._emitEOFToken();
					break;
				}
				default:
					(u.data += "--"), (this.state = f.COMMENT), this._stateComment(t);
			}
		}
		_stateCommentEndBang(t) {
			let u = this.currentToken;
			switch (t) {
				case l.HYPHEN_MINUS: {
					(u.data += "--!"), (this.state = f.COMMENT_END_DASH);
					break;
				}
				case l.GREATER_THAN_SIGN: {
					this._err(g.incorrectlyClosedComment),
						(this.state = f.DATA),
						this.emitCurrentComment(u);
					break;
				}
				case l.EOF: {
					this._err(g.eofInComment),
						this.emitCurrentComment(u),
						this._emitEOFToken();
					break;
				}
				default:
					(u.data += "--!"), (this.state = f.COMMENT), this._stateComment(t);
			}
		}
		_stateDoctype(t) {
			switch (t) {
				case l.SPACE:
				case l.LINE_FEED:
				case l.TABULATION:
				case l.FORM_FEED: {
					this.state = f.BEFORE_DOCTYPE_NAME;
					break;
				}
				case l.GREATER_THAN_SIGN: {
					(this.state = f.BEFORE_DOCTYPE_NAME), this._stateBeforeDoctypeName(t);
					break;
				}
				case l.EOF: {
					this._err(g.eofInDoctype), this._createDoctypeToken(null);
					let u = this.currentToken;
					(u.forceQuirks = !0),
						this.emitCurrentDoctype(u),
						this._emitEOFToken();
					break;
				}
				default:
					this._err(g.missingWhitespaceBeforeDoctypeName),
						(this.state = f.BEFORE_DOCTYPE_NAME),
						this._stateBeforeDoctypeName(t);
			}
		}
		_stateBeforeDoctypeName(t) {
			if (nt(t))
				this._createDoctypeToken(String.fromCharCode(wt(t))),
					(this.state = f.DOCTYPE_NAME);
			else
				switch (t) {
					case l.SPACE:
					case l.LINE_FEED:
					case l.TABULATION:
					case l.FORM_FEED:
						break;
					case l.NULL: {
						this._err(g.unexpectedNullCharacter),
							this._createDoctypeToken(Q),
							(this.state = f.DOCTYPE_NAME);
						break;
					}
					case l.GREATER_THAN_SIGN: {
						this._err(g.missingDoctypeName), this._createDoctypeToken(null);
						let u = this.currentToken;
						(u.forceQuirks = !0),
							this.emitCurrentDoctype(u),
							(this.state = f.DATA);
						break;
					}
					case l.EOF: {
						this._err(g.eofInDoctype), this._createDoctypeToken(null);
						let u = this.currentToken;
						(u.forceQuirks = !0),
							this.emitCurrentDoctype(u),
							this._emitEOFToken();
						break;
					}
					default:
						this._createDoctypeToken(String.fromCodePoint(t)),
							(this.state = f.DOCTYPE_NAME);
				}
		}
		_stateDoctypeName(t) {
			let u = this.currentToken;
			switch (t) {
				case l.SPACE:
				case l.LINE_FEED:
				case l.TABULATION:
				case l.FORM_FEED: {
					this.state = f.AFTER_DOCTYPE_NAME;
					break;
				}
				case l.GREATER_THAN_SIGN: {
					(this.state = f.DATA), this.emitCurrentDoctype(u);
					break;
				}
				case l.NULL: {
					this._err(g.unexpectedNullCharacter), (u.name += Q);
					break;
				}
				case l.EOF: {
					this._err(g.eofInDoctype),
						(u.forceQuirks = !0),
						this.emitCurrentDoctype(u),
						this._emitEOFToken();
					break;
				}
				default:
					u.name += String.fromCodePoint(nt(t) ? wt(t) : t);
			}
		}
		_stateAfterDoctypeName(t) {
			let u = this.currentToken;
			switch (t) {
				case l.SPACE:
				case l.LINE_FEED:
				case l.TABULATION:
				case l.FORM_FEED:
					break;
				case l.GREATER_THAN_SIGN: {
					(this.state = f.DATA), this.emitCurrentDoctype(u);
					break;
				}
				case l.EOF: {
					this._err(g.eofInDoctype),
						(u.forceQuirks = !0),
						this.emitCurrentDoctype(u),
						this._emitEOFToken();
					break;
				}
				default:
					this._consumeSequenceIfMatch(ue.PUBLIC, !1)
						? (this.state = f.AFTER_DOCTYPE_PUBLIC_KEYWORD)
						: this._consumeSequenceIfMatch(ue.SYSTEM, !1)
							? (this.state = f.AFTER_DOCTYPE_SYSTEM_KEYWORD)
							: this._ensureHibernation() ||
								(this._err(g.invalidCharacterSequenceAfterDoctypeName),
								(u.forceQuirks = !0),
								(this.state = f.BOGUS_DOCTYPE),
								this._stateBogusDoctype(t));
			}
		}
		_stateAfterDoctypePublicKeyword(t) {
			let u = this.currentToken;
			switch (t) {
				case l.SPACE:
				case l.LINE_FEED:
				case l.TABULATION:
				case l.FORM_FEED: {
					this.state = f.BEFORE_DOCTYPE_PUBLIC_IDENTIFIER;
					break;
				}
				case l.QUOTATION_MARK: {
					this._err(g.missingWhitespaceAfterDoctypePublicKeyword),
						(u.publicId = ""),
						(this.state = f.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED);
					break;
				}
				case l.APOSTROPHE: {
					this._err(g.missingWhitespaceAfterDoctypePublicKeyword),
						(u.publicId = ""),
						(this.state = f.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED);
					break;
				}
				case l.GREATER_THAN_SIGN: {
					this._err(g.missingDoctypePublicIdentifier),
						(u.forceQuirks = !0),
						(this.state = f.DATA),
						this.emitCurrentDoctype(u);
					break;
				}
				case l.EOF: {
					this._err(g.eofInDoctype),
						(u.forceQuirks = !0),
						this.emitCurrentDoctype(u),
						this._emitEOFToken();
					break;
				}
				default:
					this._err(g.missingQuoteBeforeDoctypePublicIdentifier),
						(u.forceQuirks = !0),
						(this.state = f.BOGUS_DOCTYPE),
						this._stateBogusDoctype(t);
			}
		}
		_stateBeforeDoctypePublicIdentifier(t) {
			let u = this.currentToken;
			switch (t) {
				case l.SPACE:
				case l.LINE_FEED:
				case l.TABULATION:
				case l.FORM_FEED:
					break;
				case l.QUOTATION_MARK: {
					(u.publicId = ""),
						(this.state = f.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED);
					break;
				}
				case l.APOSTROPHE: {
					(u.publicId = ""),
						(this.state = f.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED);
					break;
				}
				case l.GREATER_THAN_SIGN: {
					this._err(g.missingDoctypePublicIdentifier),
						(u.forceQuirks = !0),
						(this.state = f.DATA),
						this.emitCurrentDoctype(u);
					break;
				}
				case l.EOF: {
					this._err(g.eofInDoctype),
						(u.forceQuirks = !0),
						this.emitCurrentDoctype(u),
						this._emitEOFToken();
					break;
				}
				default:
					this._err(g.missingQuoteBeforeDoctypePublicIdentifier),
						(u.forceQuirks = !0),
						(this.state = f.BOGUS_DOCTYPE),
						this._stateBogusDoctype(t);
			}
		}
		_stateDoctypePublicIdentifierDoubleQuoted(t) {
			let u = this.currentToken;
			switch (t) {
				case l.QUOTATION_MARK: {
					this.state = f.AFTER_DOCTYPE_PUBLIC_IDENTIFIER;
					break;
				}
				case l.NULL: {
					this._err(g.unexpectedNullCharacter), (u.publicId += Q);
					break;
				}
				case l.GREATER_THAN_SIGN: {
					this._err(g.abruptDoctypePublicIdentifier),
						(u.forceQuirks = !0),
						this.emitCurrentDoctype(u),
						(this.state = f.DATA);
					break;
				}
				case l.EOF: {
					this._err(g.eofInDoctype),
						(u.forceQuirks = !0),
						this.emitCurrentDoctype(u),
						this._emitEOFToken();
					break;
				}
				default:
					u.publicId += String.fromCodePoint(t);
			}
		}
		_stateDoctypePublicIdentifierSingleQuoted(t) {
			let u = this.currentToken;
			switch (t) {
				case l.APOSTROPHE: {
					this.state = f.AFTER_DOCTYPE_PUBLIC_IDENTIFIER;
					break;
				}
				case l.NULL: {
					this._err(g.unexpectedNullCharacter), (u.publicId += Q);
					break;
				}
				case l.GREATER_THAN_SIGN: {
					this._err(g.abruptDoctypePublicIdentifier),
						(u.forceQuirks = !0),
						this.emitCurrentDoctype(u),
						(this.state = f.DATA);
					break;
				}
				case l.EOF: {
					this._err(g.eofInDoctype),
						(u.forceQuirks = !0),
						this.emitCurrentDoctype(u),
						this._emitEOFToken();
					break;
				}
				default:
					u.publicId += String.fromCodePoint(t);
			}
		}
		_stateAfterDoctypePublicIdentifier(t) {
			let u = this.currentToken;
			switch (t) {
				case l.SPACE:
				case l.LINE_FEED:
				case l.TABULATION:
				case l.FORM_FEED: {
					this.state = f.BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS;
					break;
				}
				case l.GREATER_THAN_SIGN: {
					(this.state = f.DATA), this.emitCurrentDoctype(u);
					break;
				}
				case l.QUOTATION_MARK: {
					this._err(
						g.missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers
					),
						(u.systemId = ""),
						(this.state = f.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED);
					break;
				}
				case l.APOSTROPHE: {
					this._err(
						g.missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers
					),
						(u.systemId = ""),
						(this.state = f.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED);
					break;
				}
				case l.EOF: {
					this._err(g.eofInDoctype),
						(u.forceQuirks = !0),
						this.emitCurrentDoctype(u),
						this._emitEOFToken();
					break;
				}
				default:
					this._err(g.missingQuoteBeforeDoctypeSystemIdentifier),
						(u.forceQuirks = !0),
						(this.state = f.BOGUS_DOCTYPE),
						this._stateBogusDoctype(t);
			}
		}
		_stateBetweenDoctypePublicAndSystemIdentifiers(t) {
			let u = this.currentToken;
			switch (t) {
				case l.SPACE:
				case l.LINE_FEED:
				case l.TABULATION:
				case l.FORM_FEED:
					break;
				case l.GREATER_THAN_SIGN: {
					this.emitCurrentDoctype(u), (this.state = f.DATA);
					break;
				}
				case l.QUOTATION_MARK: {
					(u.systemId = ""),
						(this.state = f.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED);
					break;
				}
				case l.APOSTROPHE: {
					(u.systemId = ""),
						(this.state = f.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED);
					break;
				}
				case l.EOF: {
					this._err(g.eofInDoctype),
						(u.forceQuirks = !0),
						this.emitCurrentDoctype(u),
						this._emitEOFToken();
					break;
				}
				default:
					this._err(g.missingQuoteBeforeDoctypeSystemIdentifier),
						(u.forceQuirks = !0),
						(this.state = f.BOGUS_DOCTYPE),
						this._stateBogusDoctype(t);
			}
		}
		_stateAfterDoctypeSystemKeyword(t) {
			let u = this.currentToken;
			switch (t) {
				case l.SPACE:
				case l.LINE_FEED:
				case l.TABULATION:
				case l.FORM_FEED: {
					this.state = f.BEFORE_DOCTYPE_SYSTEM_IDENTIFIER;
					break;
				}
				case l.QUOTATION_MARK: {
					this._err(g.missingWhitespaceAfterDoctypeSystemKeyword),
						(u.systemId = ""),
						(this.state = f.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED);
					break;
				}
				case l.APOSTROPHE: {
					this._err(g.missingWhitespaceAfterDoctypeSystemKeyword),
						(u.systemId = ""),
						(this.state = f.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED);
					break;
				}
				case l.GREATER_THAN_SIGN: {
					this._err(g.missingDoctypeSystemIdentifier),
						(u.forceQuirks = !0),
						(this.state = f.DATA),
						this.emitCurrentDoctype(u);
					break;
				}
				case l.EOF: {
					this._err(g.eofInDoctype),
						(u.forceQuirks = !0),
						this.emitCurrentDoctype(u),
						this._emitEOFToken();
					break;
				}
				default:
					this._err(g.missingQuoteBeforeDoctypeSystemIdentifier),
						(u.forceQuirks = !0),
						(this.state = f.BOGUS_DOCTYPE),
						this._stateBogusDoctype(t);
			}
		}
		_stateBeforeDoctypeSystemIdentifier(t) {
			let u = this.currentToken;
			switch (t) {
				case l.SPACE:
				case l.LINE_FEED:
				case l.TABULATION:
				case l.FORM_FEED:
					break;
				case l.QUOTATION_MARK: {
					(u.systemId = ""),
						(this.state = f.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED);
					break;
				}
				case l.APOSTROPHE: {
					(u.systemId = ""),
						(this.state = f.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED);
					break;
				}
				case l.GREATER_THAN_SIGN: {
					this._err(g.missingDoctypeSystemIdentifier),
						(u.forceQuirks = !0),
						(this.state = f.DATA),
						this.emitCurrentDoctype(u);
					break;
				}
				case l.EOF: {
					this._err(g.eofInDoctype),
						(u.forceQuirks = !0),
						this.emitCurrentDoctype(u),
						this._emitEOFToken();
					break;
				}
				default:
					this._err(g.missingQuoteBeforeDoctypeSystemIdentifier),
						(u.forceQuirks = !0),
						(this.state = f.BOGUS_DOCTYPE),
						this._stateBogusDoctype(t);
			}
		}
		_stateDoctypeSystemIdentifierDoubleQuoted(t) {
			let u = this.currentToken;
			switch (t) {
				case l.QUOTATION_MARK: {
					this.state = f.AFTER_DOCTYPE_SYSTEM_IDENTIFIER;
					break;
				}
				case l.NULL: {
					this._err(g.unexpectedNullCharacter), (u.systemId += Q);
					break;
				}
				case l.GREATER_THAN_SIGN: {
					this._err(g.abruptDoctypeSystemIdentifier),
						(u.forceQuirks = !0),
						this.emitCurrentDoctype(u),
						(this.state = f.DATA);
					break;
				}
				case l.EOF: {
					this._err(g.eofInDoctype),
						(u.forceQuirks = !0),
						this.emitCurrentDoctype(u),
						this._emitEOFToken();
					break;
				}
				default:
					u.systemId += String.fromCodePoint(t);
			}
		}
		_stateDoctypeSystemIdentifierSingleQuoted(t) {
			let u = this.currentToken;
			switch (t) {
				case l.APOSTROPHE: {
					this.state = f.AFTER_DOCTYPE_SYSTEM_IDENTIFIER;
					break;
				}
				case l.NULL: {
					this._err(g.unexpectedNullCharacter), (u.systemId += Q);
					break;
				}
				case l.GREATER_THAN_SIGN: {
					this._err(g.abruptDoctypeSystemIdentifier),
						(u.forceQuirks = !0),
						this.emitCurrentDoctype(u),
						(this.state = f.DATA);
					break;
				}
				case l.EOF: {
					this._err(g.eofInDoctype),
						(u.forceQuirks = !0),
						this.emitCurrentDoctype(u),
						this._emitEOFToken();
					break;
				}
				default:
					u.systemId += String.fromCodePoint(t);
			}
		}
		_stateAfterDoctypeSystemIdentifier(t) {
			let u = this.currentToken;
			switch (t) {
				case l.SPACE:
				case l.LINE_FEED:
				case l.TABULATION:
				case l.FORM_FEED:
					break;
				case l.GREATER_THAN_SIGN: {
					this.emitCurrentDoctype(u), (this.state = f.DATA);
					break;
				}
				case l.EOF: {
					this._err(g.eofInDoctype),
						(u.forceQuirks = !0),
						this.emitCurrentDoctype(u),
						this._emitEOFToken();
					break;
				}
				default:
					this._err(g.unexpectedCharacterAfterDoctypeSystemIdentifier),
						(this.state = f.BOGUS_DOCTYPE),
						this._stateBogusDoctype(t);
			}
		}
		_stateBogusDoctype(t) {
			let u = this.currentToken;
			switch (t) {
				case l.GREATER_THAN_SIGN: {
					this.emitCurrentDoctype(u), (this.state = f.DATA);
					break;
				}
				case l.NULL: {
					this._err(g.unexpectedNullCharacter);
					break;
				}
				case l.EOF: {
					this.emitCurrentDoctype(u), this._emitEOFToken();
					break;
				}
				default:
			}
		}
		_stateCdataSection(t) {
			switch (t) {
				case l.RIGHT_SQUARE_BRACKET: {
					this.state = f.CDATA_SECTION_BRACKET;
					break;
				}
				case l.EOF: {
					this._err(g.eofInCdata), this._emitEOFToken();
					break;
				}
				default:
					this._emitCodePoint(t);
			}
		}
		_stateCdataSectionBracket(t) {
			t === l.RIGHT_SQUARE_BRACKET
				? (this.state = f.CDATA_SECTION_END)
				: (this._emitChars("]"),
					(this.state = f.CDATA_SECTION),
					this._stateCdataSection(t));
		}
		_stateCdataSectionEnd(t) {
			switch (t) {
				case l.GREATER_THAN_SIGN: {
					this.state = f.DATA;
					break;
				}
				case l.RIGHT_SQUARE_BRACKET: {
					this._emitChars("]");
					break;
				}
				default:
					this._emitChars("]]"),
						(this.state = f.CDATA_SECTION),
						this._stateCdataSection(t);
			}
		}
		_stateCharacterReference(t) {
			t === l.NUMBER_SIGN
				? (this.state = f.NUMERIC_CHARACTER_REFERENCE)
				: Cu(t)
					? ((this.state = f.NAMED_CHARACTER_REFERENCE),
						this._stateNamedCharacterReference(t))
					: (this._flushCodePointConsumedAsCharacterReference(l.AMPERSAND),
						this._reconsumeInState(this.returnState, t));
		}
		_stateNamedCharacterReference(t) {
			let u = this._matchNamedCharacterReference(t);
			if (!this._ensureHibernation())
				if (u) {
					for (let i = 0; i < u.length; i++)
						this._flushCodePointConsumedAsCharacterReference(u[i]);
					this.state = this.returnState;
				} else
					this._flushCodePointConsumedAsCharacterReference(l.AMPERSAND),
						(this.state = f.AMBIGUOUS_AMPERSAND);
		}
		_stateAmbiguousAmpersand(t) {
			Cu(t)
				? this._flushCodePointConsumedAsCharacterReference(t)
				: (t === l.SEMICOLON && this._err(g.unknownNamedCharacterReference),
					this._reconsumeInState(this.returnState, t));
		}
		_stateNumericCharacterReference(t) {
			(this.charRefCode = 0),
				t === l.LATIN_SMALL_X || t === l.LATIN_CAPITAL_X
					? (this.state = f.HEXADEMICAL_CHARACTER_REFERENCE_START)
					: st(t)
						? ((this.state = f.DECIMAL_CHARACTER_REFERENCE),
							this._stateDecimalCharacterReference(t))
						: (this._err(g.absenceOfDigitsInNumericCharacterReference),
							this._flushCodePointConsumedAsCharacterReference(l.AMPERSAND),
							this._flushCodePointConsumedAsCharacterReference(l.NUMBER_SIGN),
							this._reconsumeInState(this.returnState, t));
		}
		_stateHexademicalCharacterReferenceStart(t) {
			vs(t)
				? ((this.state = f.HEXADEMICAL_CHARACTER_REFERENCE),
					this._stateHexademicalCharacterReference(t))
				: (this._err(g.absenceOfDigitsInNumericCharacterReference),
					this._flushCodePointConsumedAsCharacterReference(l.AMPERSAND),
					this._flushCodePointConsumedAsCharacterReference(l.NUMBER_SIGN),
					this._unconsume(2),
					(this.state = this.returnState));
		}
		_stateHexademicalCharacterReference(t) {
			Wi(t)
				? (this.charRefCode = this.charRefCode * 16 + t - 55)
				: Xi(t)
					? (this.charRefCode = this.charRefCode * 16 + t - 87)
					: st(t)
						? (this.charRefCode = this.charRefCode * 16 + t - 48)
						: t === l.SEMICOLON
							? (this.state = f.NUMERIC_CHARACTER_REFERENCE_END)
							: (this._err(g.missingSemicolonAfterCharacterReference),
								(this.state = f.NUMERIC_CHARACTER_REFERENCE_END),
								this._stateNumericCharacterReferenceEnd(t));
		}
		_stateDecimalCharacterReference(t) {
			st(t)
				? (this.charRefCode = this.charRefCode * 10 + t - 48)
				: t === l.SEMICOLON
					? (this.state = f.NUMERIC_CHARACTER_REFERENCE_END)
					: (this._err(g.missingSemicolonAfterCharacterReference),
						(this.state = f.NUMERIC_CHARACTER_REFERENCE_END),
						this._stateNumericCharacterReferenceEnd(t));
		}
		_stateNumericCharacterReferenceEnd(t) {
			if (this.charRefCode === l.NULL)
				this._err(g.nullCharacterReference),
					(this.charRefCode = l.REPLACEMENT_CHARACTER);
			else if (this.charRefCode > 1114111)
				this._err(g.characterReferenceOutsideUnicodeRange),
					(this.charRefCode = l.REPLACEMENT_CHARACTER);
			else if (Lt(this.charRefCode))
				this._err(g.surrogateCharacterReference),
					(this.charRefCode = l.REPLACEMENT_CHARACTER);
			else if (Rt(this.charRefCode))
				this._err(g.noncharacterCharacterReference);
			else if (kt(this.charRefCode) || this.charRefCode === l.CARRIAGE_RETURN) {
				this._err(g.controlCharacterReference);
				let u = Ms.get(this.charRefCode);
				u !== void 0 && (this.charRefCode = u);
			}
			this._flushCodePointConsumedAsCharacterReference(this.charRefCode),
				this._reconsumeInState(this.returnState, t);
		}
	};
	var Ki = new Set([
			a.DD,
			a.DT,
			a.LI,
			a.OPTGROUP,
			a.OPTION,
			a.P,
			a.RB,
			a.RP,
			a.RT,
			a.RTC,
		]),
		ji = new Set([
			...Ki,
			a.CAPTION,
			a.COLGROUP,
			a.TBODY,
			a.TD,
			a.TFOOT,
			a.TH,
			a.THEAD,
			a.TR,
		]),
		Bt = new Map([
			[a.APPLET, C.HTML],
			[a.CAPTION, C.HTML],
			[a.HTML, C.HTML],
			[a.MARQUEE, C.HTML],
			[a.OBJECT, C.HTML],
			[a.TABLE, C.HTML],
			[a.TD, C.HTML],
			[a.TEMPLATE, C.HTML],
			[a.TH, C.HTML],
			[a.ANNOTATION_XML, C.MATHML],
			[a.MI, C.MATHML],
			[a.MN, C.MATHML],
			[a.MO, C.MATHML],
			[a.MS, C.MATHML],
			[a.MTEXT, C.MATHML],
			[a.DESC, C.SVG],
			[a.FOREIGN_OBJECT, C.SVG],
			[a.TITLE, C.SVG],
		]),
		Hs = [a.H1, a.H2, a.H3, a.H4, a.H5, a.H6],
		ps = [a.TR, a.TEMPLATE, a.HTML],
		xs = [a.TBODY, a.TFOOT, a.THEAD, a.TEMPLATE, a.HTML],
		qs = [a.TABLE, a.TEMPLATE, a.HTML],
		Ys = [a.TD, a.TH],
		Mt = class {
			get currentTmplContentOrNode() {
				return this._isInTemplate()
					? this.treeAdapter.getTemplateContent(this.current)
					: this.current;
			}
			constructor(t, u, i) {
				(this.treeAdapter = u),
					(this.handler = i),
					(this.items = []),
					(this.tagIDs = []),
					(this.stackTop = -1),
					(this.tmplCount = 0),
					(this.currentTagId = a.UNKNOWN),
					(this.current = t);
			}
			_indexOf(t) {
				return this.items.lastIndexOf(t, this.stackTop);
			}
			_isInTemplate() {
				return (
					this.currentTagId === a.TEMPLATE &&
					this.treeAdapter.getNamespaceURI(this.current) === C.HTML
				);
			}
			_updateCurrentElement() {
				(this.current = this.items[this.stackTop]),
					(this.currentTagId = this.tagIDs[this.stackTop]);
			}
			push(t, u) {
				this.stackTop++,
					(this.items[this.stackTop] = t),
					(this.current = t),
					(this.tagIDs[this.stackTop] = u),
					(this.currentTagId = u),
					this._isInTemplate() && this.tmplCount++,
					this.handler.onItemPush(t, u, !0);
			}
			pop() {
				let t = this.current;
				this.tmplCount > 0 && this._isInTemplate() && this.tmplCount--,
					this.stackTop--,
					this._updateCurrentElement(),
					this.handler.onItemPop(t, !0);
			}
			replace(t, u) {
				let i = this._indexOf(t);
				(this.items[i] = u), i === this.stackTop && (this.current = u);
			}
			insertAfter(t, u, i) {
				let n = this._indexOf(t) + 1;
				this.items.splice(n, 0, u),
					this.tagIDs.splice(n, 0, i),
					this.stackTop++,
					n === this.stackTop && this._updateCurrentElement(),
					this.handler.onItemPush(
						this.current,
						this.currentTagId,
						n === this.stackTop
					);
			}
			popUntilTagNamePopped(t) {
				let u = this.stackTop + 1;
				do u = this.tagIDs.lastIndexOf(t, u - 1);
				while (
					u > 0 &&
					this.treeAdapter.getNamespaceURI(this.items[u]) !== C.HTML
				);
				this.shortenToLength(u < 0 ? 0 : u);
			}
			shortenToLength(t) {
				for (; this.stackTop >= t; ) {
					let u = this.current;
					this.tmplCount > 0 && this._isInTemplate() && (this.tmplCount -= 1),
						this.stackTop--,
						this._updateCurrentElement(),
						this.handler.onItemPop(u, this.stackTop < t);
				}
			}
			popUntilElementPopped(t) {
				let u = this._indexOf(t);
				this.shortenToLength(u < 0 ? 0 : u);
			}
			popUntilPopped(t, u) {
				let i = this._indexOfTagNames(t, u);
				this.shortenToLength(i < 0 ? 0 : i);
			}
			popUntilNumberedHeaderPopped() {
				this.popUntilPopped(Hs, C.HTML);
			}
			popUntilTableCellPopped() {
				this.popUntilPopped(Ys, C.HTML);
			}
			popAllUpToHtmlElement() {
				(this.tmplCount = 0), this.shortenToLength(1);
			}
			_indexOfTagNames(t, u) {
				for (let i = this.stackTop; i >= 0; i--)
					if (
						t.includes(this.tagIDs[i]) &&
						this.treeAdapter.getNamespaceURI(this.items[i]) === u
					)
						return i;
				return -1;
			}
			clearBackTo(t, u) {
				let i = this._indexOfTagNames(t, u);
				this.shortenToLength(i + 1);
			}
			clearBackToTableContext() {
				this.clearBackTo(qs, C.HTML);
			}
			clearBackToTableBodyContext() {
				this.clearBackTo(xs, C.HTML);
			}
			clearBackToTableRowContext() {
				this.clearBackTo(ps, C.HTML);
			}
			remove(t) {
				let u = this._indexOf(t);
				u >= 0 &&
					(u === this.stackTop
						? this.pop()
						: (this.items.splice(u, 1),
							this.tagIDs.splice(u, 1),
							this.stackTop--,
							this._updateCurrentElement(),
							this.handler.onItemPop(t, !1)));
			}
			tryPeekProperlyNestedBodyElement() {
				return this.stackTop >= 1 && this.tagIDs[1] === a.BODY
					? this.items[1]
					: null;
			}
			contains(t) {
				return this._indexOf(t) > -1;
			}
			getCommonAncestor(t) {
				let u = this._indexOf(t) - 1;
				return u >= 0 ? this.items[u] : null;
			}
			isRootHtmlElementCurrent() {
				return this.stackTop === 0 && this.tagIDs[0] === a.HTML;
			}
			hasInScope(t) {
				for (let u = this.stackTop; u >= 0; u--) {
					let i = this.tagIDs[u],
						n = this.treeAdapter.getNamespaceURI(this.items[u]);
					if (i === t && n === C.HTML) return !0;
					if (Bt.get(i) === n) return !1;
				}
				return !0;
			}
			hasNumberedHeaderInScope() {
				for (let t = this.stackTop; t >= 0; t--) {
					let u = this.tagIDs[t],
						i = this.treeAdapter.getNamespaceURI(this.items[t]);
					if (yt(u) && i === C.HTML) return !0;
					if (Bt.get(u) === i) return !1;
				}
				return !0;
			}
			hasInListItemScope(t) {
				for (let u = this.stackTop; u >= 0; u--) {
					let i = this.tagIDs[u],
						n = this.treeAdapter.getNamespaceURI(this.items[u]);
					if (i === t && n === C.HTML) return !0;
					if (((i === a.UL || i === a.OL) && n === C.HTML) || Bt.get(i) === n)
						return !1;
				}
				return !0;
			}
			hasInButtonScope(t) {
				for (let u = this.stackTop; u >= 0; u--) {
					let i = this.tagIDs[u],
						n = this.treeAdapter.getNamespaceURI(this.items[u]);
					if (i === t && n === C.HTML) return !0;
					if ((i === a.BUTTON && n === C.HTML) || Bt.get(i) === n) return !1;
				}
				return !0;
			}
			hasInTableScope(t) {
				for (let u = this.stackTop; u >= 0; u--) {
					let i = this.tagIDs[u];
					if (this.treeAdapter.getNamespaceURI(this.items[u]) === C.HTML) {
						if (i === t) return !0;
						if (i === a.TABLE || i === a.TEMPLATE || i === a.HTML) return !1;
					}
				}
				return !0;
			}
			hasTableBodyContextInTableScope() {
				for (let t = this.stackTop; t >= 0; t--) {
					let u = this.tagIDs[t];
					if (this.treeAdapter.getNamespaceURI(this.items[t]) === C.HTML) {
						if (u === a.TBODY || u === a.THEAD || u === a.TFOOT) return !0;
						if (u === a.TABLE || u === a.HTML) return !1;
					}
				}
				return !0;
			}
			hasInSelectScope(t) {
				for (let u = this.stackTop; u >= 0; u--) {
					let i = this.tagIDs[u];
					if (this.treeAdapter.getNamespaceURI(this.items[u]) === C.HTML) {
						if (i === t) return !0;
						if (i !== a.OPTION && i !== a.OPTGROUP) return !1;
					}
				}
				return !0;
			}
			generateImpliedEndTags() {
				for (; Ki.has(this.currentTagId); ) this.pop();
			}
			generateImpliedEndTagsThoroughly() {
				for (; ji.has(this.currentTagId); ) this.pop();
			}
			generateImpliedEndTagsWithExclusion(t) {
				for (; this.currentTagId !== t && ji.has(this.currentTagId); )
					this.pop();
			}
		};
	var re;
	(function (e) {
		(e[(e.Marker = 0)] = "Marker"), (e[(e.Element = 1)] = "Element");
	})((re = re || (re = {})));
	var Gi = { type: re.Marker },
		Ft = class {
			constructor(t) {
				(this.treeAdapter = t), (this.entries = []), (this.bookmark = null);
			}
			_getNoahArkConditionCandidates(t, u) {
				let i = [],
					n = u.length,
					s = this.treeAdapter.getTagName(t),
					o = this.treeAdapter.getNamespaceURI(t);
				for (let r = 0; r < this.entries.length; r++) {
					let c = this.entries[r];
					if (c.type === re.Marker) break;
					let { element: h } = c;
					if (
						this.treeAdapter.getTagName(h) === s &&
						this.treeAdapter.getNamespaceURI(h) === o
					) {
						let T = this.treeAdapter.getAttrList(h);
						T.length === n && i.push({ idx: r, attrs: T });
					}
				}
				return i;
			}
			_ensureNoahArkCondition(t) {
				if (this.entries.length < 3) return;
				let u = this.treeAdapter.getAttrList(t),
					i = this._getNoahArkConditionCandidates(t, u);
				if (i.length < 3) return;
				let n = new Map(u.map((o) => [o.name, o.value])),
					s = 0;
				for (let o = 0; o < i.length; o++) {
					let r = i[o];
					r.attrs.every((c) => n.get(c.name) === c.value) &&
						((s += 1), s >= 3 && this.entries.splice(r.idx, 1));
				}
			}
			insertMarker() {
				this.entries.unshift(Gi);
			}
			pushElement(t, u) {
				this._ensureNoahArkCondition(t),
					this.entries.unshift({ type: re.Element, element: t, token: u });
			}
			insertElementAfterBookmark(t, u) {
				let i = this.entries.indexOf(this.bookmark);
				this.entries.splice(i, 0, { type: re.Element, element: t, token: u });
			}
			removeEntry(t) {
				let u = this.entries.indexOf(t);
				u >= 0 && this.entries.splice(u, 1);
			}
			clearToLastMarker() {
				let t = this.entries.indexOf(Gi);
				t >= 0 ? this.entries.splice(0, t + 1) : (this.entries.length = 0);
			}
			getElementEntryInScopeWithTagName(t) {
				let u = this.entries.find(
					(i) =>
						i.type === re.Marker || this.treeAdapter.getTagName(i.element) === t
				);
				return u && u.type === re.Element ? u : null;
			}
			getElementEntry(t) {
				return this.entries.find(
					(u) => u.type === re.Element && u.element === t
				);
			}
		};
	function zi(e) {
		return { nodeName: "#text", value: e, parentNode: null };
	}
	var De = {
		createDocument() {
			return { nodeName: "#document", mode: $.NO_QUIRKS, childNodes: [] };
		},
		createDocumentFragment() {
			return { nodeName: "#document-fragment", childNodes: [] };
		},
		createElement(e, t, u) {
			return {
				nodeName: e,
				tagName: e,
				attrs: u,
				namespaceURI: t,
				childNodes: [],
				parentNode: null,
			};
		},
		createCommentNode(e) {
			return { nodeName: "#comment", data: e, parentNode: null };
		},
		appendChild(e, t) {
			e.childNodes.push(t), (t.parentNode = e);
		},
		insertBefore(e, t, u) {
			let i = e.childNodes.indexOf(u);
			e.childNodes.splice(i, 0, t), (t.parentNode = e);
		},
		setTemplateContent(e, t) {
			e.content = t;
		},
		getTemplateContent(e) {
			return e.content;
		},
		setDocumentType(e, t, u, i) {
			let n = e.childNodes.find((s) => s.nodeName === "#documentType");
			if (n) (n.name = t), (n.publicId = u), (n.systemId = i);
			else {
				let s = {
					nodeName: "#documentType",
					name: t,
					publicId: u,
					systemId: i,
					parentNode: null,
				};
				De.appendChild(e, s);
			}
		},
		setDocumentMode(e, t) {
			e.mode = t;
		},
		getDocumentMode(e) {
			return e.mode;
		},
		detachNode(e) {
			if (e.parentNode) {
				let t = e.parentNode.childNodes.indexOf(e);
				e.parentNode.childNodes.splice(t, 1), (e.parentNode = null);
			}
		},
		insertText(e, t) {
			if (e.childNodes.length > 0) {
				let u = e.childNodes[e.childNodes.length - 1];
				if (De.isTextNode(u)) {
					u.value += t;
					return;
				}
			}
			De.appendChild(e, zi(t));
		},
		insertTextBefore(e, t, u) {
			let i = e.childNodes[e.childNodes.indexOf(u) - 1];
			i && De.isTextNode(i) ? (i.value += t) : De.insertBefore(e, zi(t), u);
		},
		adoptAttributes(e, t) {
			let u = new Set(e.attrs.map((i) => i.name));
			for (let i = 0; i < t.length; i++) u.has(t[i].name) || e.attrs.push(t[i]);
		},
		getFirstChild(e) {
			return e.childNodes[0];
		},
		getChildNodes(e) {
			return e.childNodes;
		},
		getParentNode(e) {
			return e.parentNode;
		},
		getAttrList(e) {
			return e.attrs;
		},
		getTagName(e) {
			return e.tagName;
		},
		getNamespaceURI(e) {
			return e.namespaceURI;
		},
		getTextNodeContent(e) {
			return e.value;
		},
		getCommentNodeContent(e) {
			return e.data;
		},
		getDocumentTypeNodeName(e) {
			return e.name;
		},
		getDocumentTypeNodePublicId(e) {
			return e.publicId;
		},
		getDocumentTypeNodeSystemId(e) {
			return e.systemId;
		},
		isTextNode(e) {
			return e.nodeName === "#text";
		},
		isCommentNode(e) {
			return e.nodeName === "#comment";
		},
		isDocumentTypeNode(e) {
			return e.nodeName === "#documentType";
		},
		isElementNode(e) {
			return Object.prototype.hasOwnProperty.call(e, "tagName");
		},
		setNodeSourceCodeLocation(e, t) {
			e.sourceCodeLocation = t;
		},
		getNodeSourceCodeLocation(e) {
			return e.sourceCodeLocation;
		},
		updateNodeSourceCodeLocation(e, t) {
			e.sourceCodeLocation = { ...e.sourceCodeLocation, ...t };
		},
	};
	var $i = "html",
		Vs = "about:legacy-compat",
		Ws = "http://www.ibm.com/data/dtd/v11/ibmxhtml1-transitional.dtd",
		Zi = [
			"+//silmaril//dtd html pro v0r11 19970101//",
			"-//as//dtd html 3.0 aswedit + extensions//",
			"-//advasoft ltd//dtd html 3.0 aswedit + extensions//",
			"-//ietf//dtd html 2.0 level 1//",
			"-//ietf//dtd html 2.0 level 2//",
			"-//ietf//dtd html 2.0 strict level 1//",
			"-//ietf//dtd html 2.0 strict level 2//",
			"-//ietf//dtd html 2.0 strict//",
			"-//ietf//dtd html 2.0//",
			"-//ietf//dtd html 2.1e//",
			"-//ietf//dtd html 3.0//",
			"-//ietf//dtd html 3.2 final//",
			"-//ietf//dtd html 3.2//",
			"-//ietf//dtd html 3//",
			"-//ietf//dtd html level 0//",
			"-//ietf//dtd html level 1//",
			"-//ietf//dtd html level 2//",
			"-//ietf//dtd html level 3//",
			"-//ietf//dtd html strict level 0//",
			"-//ietf//dtd html strict level 1//",
			"-//ietf//dtd html strict level 2//",
			"-//ietf//dtd html strict level 3//",
			"-//ietf//dtd html strict//",
			"-//ietf//dtd html//",
			"-//metrius//dtd metrius presentational//",
			"-//microsoft//dtd internet explorer 2.0 html strict//",
			"-//microsoft//dtd internet explorer 2.0 html//",
			"-//microsoft//dtd internet explorer 2.0 tables//",
			"-//microsoft//dtd internet explorer 3.0 html strict//",
			"-//microsoft//dtd internet explorer 3.0 html//",
			"-//microsoft//dtd internet explorer 3.0 tables//",
			"-//netscape comm. corp.//dtd html//",
			"-//netscape comm. corp.//dtd strict html//",
			"-//o'reilly and associates//dtd html 2.0//",
			"-//o'reilly and associates//dtd html extended 1.0//",
			"-//o'reilly and associates//dtd html extended relaxed 1.0//",
			"-//sq//dtd html 2.0 hotmetal + extensions//",
			"-//softquad software//dtd hotmetal pro 6.0::19990601::extensions to html 4.0//",
			"-//softquad//dtd hotmetal pro 4.0::19971010::extensions to html 4.0//",
			"-//spyglass//dtd html 2.0 extended//",
			"-//sun microsystems corp.//dtd hotjava html//",
			"-//sun microsystems corp.//dtd hotjava strict html//",
			"-//w3c//dtd html 3 1995-03-24//",
			"-//w3c//dtd html 3.2 draft//",
			"-//w3c//dtd html 3.2 final//",
			"-//w3c//dtd html 3.2//",
			"-//w3c//dtd html 3.2s draft//",
			"-//w3c//dtd html 4.0 frameset//",
			"-//w3c//dtd html 4.0 transitional//",
			"-//w3c//dtd html experimental 19960712//",
			"-//w3c//dtd html experimental 970421//",
			"-//w3c//dtd w3 html//",
			"-//w3o//dtd w3 html 3.0//",
			"-//webtechs//dtd mozilla html 2.0//",
			"-//webtechs//dtd mozilla html//",
		],
		Xs = [
			...Zi,
			"-//w3c//dtd html 4.01 frameset//",
			"-//w3c//dtd html 4.01 transitional//",
		],
		Qs = new Set([
			"-//w3o//dtd w3 html strict 3.0//en//",
			"-/w3c/dtd html 4.0 transitional/en",
			"html",
		]),
		en = [
			"-//w3c//dtd xhtml 1.0 frameset//",
			"-//w3c//dtd xhtml 1.0 transitional//",
		],
		js = [
			...en,
			"-//w3c//dtd html 4.01 frameset//",
			"-//w3c//dtd html 4.01 transitional//",
		];
	function Ji(e, t) {
		return t.some((u) => e.startsWith(u));
	}
	function tn(e) {
		return (
			e.name === $i &&
			e.publicId === null &&
			(e.systemId === null || e.systemId === Vs)
		);
	}
	function un(e) {
		if (e.name !== $i) return $.QUIRKS;
		let { systemId: t } = e;
		if (t && t.toLowerCase() === Ws) return $.QUIRKS;
		let { publicId: u } = e;
		if (u !== null) {
			if (((u = u.toLowerCase()), Qs.has(u))) return $.QUIRKS;
			let i = t === null ? Xs : Zi;
			if (Ji(u, i)) return $.QUIRKS;
			if (((i = t === null ? en : js), Ji(u, i))) return $.LIMITED_QUIRKS;
		}
		return $.NO_QUIRKS;
	}
	var nn = { TEXT_HTML: "text/html", APPLICATION_XML: "application/xhtml+xml" },
		Gs = "definitionurl",
		zs = "definitionURL",
		Js = new Map(
			[
				"attributeName",
				"attributeType",
				"baseFrequency",
				"baseProfile",
				"calcMode",
				"clipPathUnits",
				"diffuseConstant",
				"edgeMode",
				"filterUnits",
				"glyphRef",
				"gradientTransform",
				"gradientUnits",
				"kernelMatrix",
				"kernelUnitLength",
				"keyPoints",
				"keySplines",
				"keyTimes",
				"lengthAdjust",
				"limitingConeAngle",
				"markerHeight",
				"markerUnits",
				"markerWidth",
				"maskContentUnits",
				"maskUnits",
				"numOctaves",
				"pathLength",
				"patternContentUnits",
				"patternTransform",
				"patternUnits",
				"pointsAtX",
				"pointsAtY",
				"pointsAtZ",
				"preserveAlpha",
				"preserveAspectRatio",
				"primitiveUnits",
				"refX",
				"refY",
				"repeatCount",
				"repeatDur",
				"requiredExtensions",
				"requiredFeatures",
				"specularConstant",
				"specularExponent",
				"spreadMethod",
				"startOffset",
				"stdDeviation",
				"stitchTiles",
				"surfaceScale",
				"systemLanguage",
				"tableValues",
				"targetX",
				"targetY",
				"textLength",
				"viewBox",
				"viewTarget",
				"xChannelSelector",
				"yChannelSelector",
				"zoomAndPan",
			].map((e) => [e.toLowerCase(), e])
		),
		$s = new Map([
			[
				"xlink:actuate",
				{ prefix: "xlink", name: "actuate", namespace: C.XLINK },
			],
			[
				"xlink:arcrole",
				{ prefix: "xlink", name: "arcrole", namespace: C.XLINK },
			],
			["xlink:href", { prefix: "xlink", name: "href", namespace: C.XLINK }],
			["xlink:role", { prefix: "xlink", name: "role", namespace: C.XLINK }],
			["xlink:show", { prefix: "xlink", name: "show", namespace: C.XLINK }],
			["xlink:title", { prefix: "xlink", name: "title", namespace: C.XLINK }],
			["xlink:type", { prefix: "xlink", name: "type", namespace: C.XLINK }],
			["xml:base", { prefix: "xml", name: "base", namespace: C.XML }],
			["xml:lang", { prefix: "xml", name: "lang", namespace: C.XML }],
			["xml:space", { prefix: "xml", name: "space", namespace: C.XML }],
			["xmlns", { prefix: "", name: "xmlns", namespace: C.XMLNS }],
			["xmlns:xlink", { prefix: "xmlns", name: "xlink", namespace: C.XMLNS }],
		]),
		Zs = new Map(
			[
				"altGlyph",
				"altGlyphDef",
				"altGlyphItem",
				"animateColor",
				"animateMotion",
				"animateTransform",
				"clipPath",
				"feBlend",
				"feColorMatrix",
				"feComponentTransfer",
				"feComposite",
				"feConvolveMatrix",
				"feDiffuseLighting",
				"feDisplacementMap",
				"feDistantLight",
				"feFlood",
				"feFuncA",
				"feFuncB",
				"feFuncG",
				"feFuncR",
				"feGaussianBlur",
				"feImage",
				"feMerge",
				"feMergeNode",
				"feMorphology",
				"feOffset",
				"fePointLight",
				"feSpecularLighting",
				"feSpotLight",
				"feTile",
				"feTurbulence",
				"foreignObject",
				"glyphRef",
				"linearGradient",
				"radialGradient",
				"textPath",
			].map((e) => [e.toLowerCase(), e])
		),
		ea = new Set([
			a.B,
			a.BIG,
			a.BLOCKQUOTE,
			a.BODY,
			a.BR,
			a.CENTER,
			a.CODE,
			a.DD,
			a.DIV,
			a.DL,
			a.DT,
			a.EM,
			a.EMBED,
			a.H1,
			a.H2,
			a.H3,
			a.H4,
			a.H5,
			a.H6,
			a.HEAD,
			a.HR,
			a.I,
			a.IMG,
			a.LI,
			a.LISTING,
			a.MENU,
			a.META,
			a.NOBR,
			a.OL,
			a.P,
			a.PRE,
			a.RUBY,
			a.S,
			a.SMALL,
			a.SPAN,
			a.STRONG,
			a.STRIKE,
			a.SUB,
			a.SUP,
			a.TABLE,
			a.TT,
			a.U,
			a.UL,
			a.VAR,
		]);
	function sn(e) {
		let t = e.tagID;
		return (
			(t === a.FONT &&
				e.attrs.some(
					({ name: i }) => i === _e.COLOR || i === _e.SIZE || i === _e.FACE
				)) ||
			ea.has(t)
		);
	}
	function _u(e) {
		for (let t = 0; t < e.attrs.length; t++)
			if (e.attrs[t].name === Gs) {
				e.attrs[t].name = zs;
				break;
			}
	}
	function Du(e) {
		for (let t = 0; t < e.attrs.length; t++) {
			let u = Js.get(e.attrs[t].name);
			u != null && (e.attrs[t].name = u);
		}
	}
	function vt(e) {
		for (let t = 0; t < e.attrs.length; t++) {
			let u = $s.get(e.attrs[t].name);
			u &&
				((e.attrs[t].prefix = u.prefix),
				(e.attrs[t].name = u.name),
				(e.attrs[t].namespace = u.namespace));
		}
	}
	function an(e) {
		let t = Zs.get(e.tagName);
		t != null && ((e.tagName = t), (e.tagID = Be(e.tagName)));
	}
	function ta(e, t) {
		return (
			t === C.MATHML &&
			(e === a.MI || e === a.MO || e === a.MN || e === a.MS || e === a.MTEXT)
		);
	}
	function ua(e, t, u) {
		if (t === C.MATHML && e === a.ANNOTATION_XML) {
			for (let i = 0; i < u.length; i++)
				if (u[i].name === _e.ENCODING) {
					let n = u[i].value.toLowerCase();
					return n === nn.TEXT_HTML || n === nn.APPLICATION_XML;
				}
		}
		return (
			t === C.SVG && (e === a.FOREIGN_OBJECT || e === a.DESC || e === a.TITLE)
		);
	}
	function on(e, t, u, i) {
		return (
			((!i || i === C.HTML) && ua(e, t, u)) ||
			((!i || i === C.MATHML) && ta(e, t))
		);
	}
	var ia = "hidden",
		na = 8,
		sa = 3,
		m;
	(function (e) {
		(e[(e.INITIAL = 0)] = "INITIAL"),
			(e[(e.BEFORE_HTML = 1)] = "BEFORE_HTML"),
			(e[(e.BEFORE_HEAD = 2)] = "BEFORE_HEAD"),
			(e[(e.IN_HEAD = 3)] = "IN_HEAD"),
			(e[(e.IN_HEAD_NO_SCRIPT = 4)] = "IN_HEAD_NO_SCRIPT"),
			(e[(e.AFTER_HEAD = 5)] = "AFTER_HEAD"),
			(e[(e.IN_BODY = 6)] = "IN_BODY"),
			(e[(e.TEXT = 7)] = "TEXT"),
			(e[(e.IN_TABLE = 8)] = "IN_TABLE"),
			(e[(e.IN_TABLE_TEXT = 9)] = "IN_TABLE_TEXT"),
			(e[(e.IN_CAPTION = 10)] = "IN_CAPTION"),
			(e[(e.IN_COLUMN_GROUP = 11)] = "IN_COLUMN_GROUP"),
			(e[(e.IN_TABLE_BODY = 12)] = "IN_TABLE_BODY"),
			(e[(e.IN_ROW = 13)] = "IN_ROW"),
			(e[(e.IN_CELL = 14)] = "IN_CELL"),
			(e[(e.IN_SELECT = 15)] = "IN_SELECT"),
			(e[(e.IN_SELECT_IN_TABLE = 16)] = "IN_SELECT_IN_TABLE"),
			(e[(e.IN_TEMPLATE = 17)] = "IN_TEMPLATE"),
			(e[(e.AFTER_BODY = 18)] = "AFTER_BODY"),
			(e[(e.IN_FRAMESET = 19)] = "IN_FRAMESET"),
			(e[(e.AFTER_FRAMESET = 20)] = "AFTER_FRAMESET"),
			(e[(e.AFTER_AFTER_BODY = 21)] = "AFTER_AFTER_BODY"),
			(e[(e.AFTER_AFTER_FRAMESET = 22)] = "AFTER_AFTER_FRAMESET");
	})(m || (m = {}));
	var aa = {
			startLine: -1,
			startCol: -1,
			startOffset: -1,
			endLine: -1,
			endCol: -1,
			endOffset: -1,
		},
		dn = new Set([a.TABLE, a.TBODY, a.TFOOT, a.THEAD, a.TR]),
		cn = {
			scriptingEnabled: !0,
			sourceCodeLocationInfo: !1,
			treeAdapter: De,
			onParseError: null,
		},
		We = class {
			constructor(t, u, i = null, n = null) {
				(this.fragmentContext = i),
					(this.scriptHandler = n),
					(this.currentToken = null),
					(this.stopped = !1),
					(this.insertionMode = m.INITIAL),
					(this.originalInsertionMode = m.INITIAL),
					(this.headElement = null),
					(this.formElement = null),
					(this.currentNotInHTML = !1),
					(this.tmplInsertionModeStack = []),
					(this.pendingCharacterTokens = []),
					(this.hasNonWhitespacePendingCharacterToken = !1),
					(this.framesetOk = !0),
					(this.skipNextNewLine = !1),
					(this.fosterParentingEnabled = !1),
					(this.options = { ...cn, ...t }),
					(this.treeAdapter = this.options.treeAdapter),
					(this.onParseError = this.options.onParseError),
					this.onParseError && (this.options.sourceCodeLocationInfo = !0),
					(this.document = u ?? this.treeAdapter.createDocument()),
					(this.tokenizer = new at(this.options, this)),
					(this.activeFormattingElements = new Ft(this.treeAdapter)),
					(this.fragmentContextID = i
						? Be(this.treeAdapter.getTagName(i))
						: a.UNKNOWN),
					this._setContextModes(i ?? this.document, this.fragmentContextID),
					(this.openElements = new Mt(this.document, this.treeAdapter, this));
			}
			static parse(t, u) {
				let i = new this(u);
				return i.tokenizer.write(t, !0), i.document;
			}
			static getFragmentParser(t, u) {
				let i = { ...cn, ...u };
				t ?? (t = i.treeAdapter.createElement(A.TEMPLATE, C.HTML, []));
				let n = i.treeAdapter.createElement("documentmock", C.HTML, []),
					s = new this(i, n, t);
				return (
					s.fragmentContextID === a.TEMPLATE &&
						s.tmplInsertionModeStack.unshift(m.IN_TEMPLATE),
					s._initTokenizerForFragmentParsing(),
					s._insertFakeRootElement(),
					s._resetInsertionMode(),
					s._findFormInFragmentContext(),
					s
				);
			}
			getFragment() {
				let t = this.treeAdapter.getFirstChild(this.document),
					u = this.treeAdapter.createDocumentFragment();
				return this._adoptNodes(t, u), u;
			}
			_err(t, u, i) {
				var n;
				if (!this.onParseError) return;
				let s = (n = t.location) !== null && n !== void 0 ? n : aa,
					o = {
						code: u,
						startLine: s.startLine,
						startCol: s.startCol,
						startOffset: s.startOffset,
						endLine: i ? s.startLine : s.endLine,
						endCol: i ? s.startCol : s.endCol,
						endOffset: i ? s.startOffset : s.endOffset,
					};
				this.onParseError(o);
			}
			onItemPush(t, u, i) {
				var n, s;
				(s = (n = this.treeAdapter).onItemPush) === null ||
					s === void 0 ||
					s.call(n, t),
					i && this.openElements.stackTop > 0 && this._setContextModes(t, u);
			}
			onItemPop(t, u) {
				var i, n;
				if (
					(this.options.sourceCodeLocationInfo &&
						this._setEndLocation(t, this.currentToken),
					(n = (i = this.treeAdapter).onItemPop) === null ||
						n === void 0 ||
						n.call(i, t, this.openElements.current),
					u)
				) {
					let s, o;
					this.openElements.stackTop === 0 && this.fragmentContext
						? ((s = this.fragmentContext), (o = this.fragmentContextID))
						: ({ current: s, currentTagId: o } = this.openElements),
						this._setContextModes(s, o);
				}
			}
			_setContextModes(t, u) {
				let i =
					t === this.document || this.treeAdapter.getNamespaceURI(t) === C.HTML;
				(this.currentNotInHTML = !i),
					(this.tokenizer.inForeignNode =
						!i && !this._isIntegrationPoint(u, t));
			}
			_switchToTextParsing(t, u) {
				this._insertElement(t, C.HTML),
					(this.tokenizer.state = u),
					(this.originalInsertionMode = this.insertionMode),
					(this.insertionMode = m.TEXT);
			}
			switchToPlaintextParsing() {
				(this.insertionMode = m.TEXT),
					(this.originalInsertionMode = m.IN_BODY),
					(this.tokenizer.state = Z.PLAINTEXT);
			}
			_getAdjustedCurrentElement() {
				return this.openElements.stackTop === 0 && this.fragmentContext
					? this.fragmentContext
					: this.openElements.current;
			}
			_findFormInFragmentContext() {
				let t = this.fragmentContext;
				for (; t; ) {
					if (this.treeAdapter.getTagName(t) === A.FORM) {
						this.formElement = t;
						break;
					}
					t = this.treeAdapter.getParentNode(t);
				}
			}
			_initTokenizerForFragmentParsing() {
				if (
					!(
						!this.fragmentContext ||
						this.treeAdapter.getNamespaceURI(this.fragmentContext) !== C.HTML
					)
				)
					switch (this.fragmentContextID) {
						case a.TITLE:
						case a.TEXTAREA: {
							this.tokenizer.state = Z.RCDATA;
							break;
						}
						case a.STYLE:
						case a.XMP:
						case a.IFRAME:
						case a.NOEMBED:
						case a.NOFRAMES:
						case a.NOSCRIPT: {
							this.tokenizer.state = Z.RAWTEXT;
							break;
						}
						case a.SCRIPT: {
							this.tokenizer.state = Z.SCRIPT_DATA;
							break;
						}
						case a.PLAINTEXT: {
							this.tokenizer.state = Z.PLAINTEXT;
							break;
						}
						default:
					}
			}
			_setDocumentType(t) {
				let u = t.name || "",
					i = t.publicId || "",
					n = t.systemId || "";
				if (
					(this.treeAdapter.setDocumentType(this.document, u, i, n), t.location)
				) {
					let o = this.treeAdapter
						.getChildNodes(this.document)
						.find((r) => this.treeAdapter.isDocumentTypeNode(r));
					o && this.treeAdapter.setNodeSourceCodeLocation(o, t.location);
				}
			}
			_attachElementToTree(t, u) {
				if (this.options.sourceCodeLocationInfo) {
					let i = u && { ...u, startTag: u };
					this.treeAdapter.setNodeSourceCodeLocation(t, i);
				}
				if (this._shouldFosterParentOnInsertion()) this._fosterParentElement(t);
				else {
					let i = this.openElements.currentTmplContentOrNode;
					this.treeAdapter.appendChild(i, t);
				}
			}
			_appendElement(t, u) {
				let i = this.treeAdapter.createElement(t.tagName, u, t.attrs);
				this._attachElementToTree(i, t.location);
			}
			_insertElement(t, u) {
				let i = this.treeAdapter.createElement(t.tagName, u, t.attrs);
				this._attachElementToTree(i, t.location),
					this.openElements.push(i, t.tagID);
			}
			_insertFakeElement(t, u) {
				let i = this.treeAdapter.createElement(t, C.HTML, []);
				this._attachElementToTree(i, null), this.openElements.push(i, u);
			}
			_insertTemplate(t) {
				let u = this.treeAdapter.createElement(t.tagName, C.HTML, t.attrs),
					i = this.treeAdapter.createDocumentFragment();
				this.treeAdapter.setTemplateContent(u, i),
					this._attachElementToTree(u, t.location),
					this.openElements.push(u, t.tagID),
					this.options.sourceCodeLocationInfo &&
						this.treeAdapter.setNodeSourceCodeLocation(i, null);
			}
			_insertFakeRootElement() {
				let t = this.treeAdapter.createElement(A.HTML, C.HTML, []);
				this.options.sourceCodeLocationInfo &&
					this.treeAdapter.setNodeSourceCodeLocation(t, null),
					this.treeAdapter.appendChild(this.openElements.current, t),
					this.openElements.push(t, a.HTML);
			}
			_appendCommentNode(t, u) {
				let i = this.treeAdapter.createCommentNode(t.data);
				this.treeAdapter.appendChild(u, i),
					this.options.sourceCodeLocationInfo &&
						this.treeAdapter.setNodeSourceCodeLocation(i, t.location);
			}
			_insertCharacters(t) {
				let u, i;
				if (
					(this._shouldFosterParentOnInsertion()
						? (({ parent: u, beforeElement: i } =
								this._findFosterParentingLocation()),
							i
								? this.treeAdapter.insertTextBefore(u, t.chars, i)
								: this.treeAdapter.insertText(u, t.chars))
						: ((u = this.openElements.currentTmplContentOrNode),
							this.treeAdapter.insertText(u, t.chars)),
					!t.location)
				)
					return;
				let n = this.treeAdapter.getChildNodes(u),
					s = i ? n.lastIndexOf(i) : n.length,
					o = n[s - 1];
				if (this.treeAdapter.getNodeSourceCodeLocation(o)) {
					let { endLine: c, endCol: h, endOffset: T } = t.location;
					this.treeAdapter.updateNodeSourceCodeLocation(o, {
						endLine: c,
						endCol: h,
						endOffset: T,
					});
				} else
					this.options.sourceCodeLocationInfo &&
						this.treeAdapter.setNodeSourceCodeLocation(o, t.location);
			}
			_adoptNodes(t, u) {
				for (
					let i = this.treeAdapter.getFirstChild(t);
					i;
					i = this.treeAdapter.getFirstChild(t)
				)
					this.treeAdapter.detachNode(i), this.treeAdapter.appendChild(u, i);
			}
			_setEndLocation(t, u) {
				if (this.treeAdapter.getNodeSourceCodeLocation(t) && u.location) {
					let i = u.location,
						n = this.treeAdapter.getTagName(t),
						s =
							u.type === p.END_TAG && n === u.tagName
								? {
										endTag: { ...i },
										endLine: i.endLine,
										endCol: i.endCol,
										endOffset: i.endOffset,
									}
								: {
										endLine: i.startLine,
										endCol: i.startCol,
										endOffset: i.startOffset,
									};
					this.treeAdapter.updateNodeSourceCodeLocation(t, s);
				}
			}
			shouldProcessStartTagTokenInForeignContent(t) {
				if (!this.currentNotInHTML) return !1;
				let u, i;
				return (
					this.openElements.stackTop === 0 && this.fragmentContext
						? ((u = this.fragmentContext), (i = this.fragmentContextID))
						: ({ current: u, currentTagId: i } = this.openElements),
					t.tagID === a.SVG &&
					this.treeAdapter.getTagName(u) === A.ANNOTATION_XML &&
					this.treeAdapter.getNamespaceURI(u) === C.MATHML
						? !1
						: this.tokenizer.inForeignNode ||
							((t.tagID === a.MGLYPH || t.tagID === a.MALIGNMARK) &&
								!this._isIntegrationPoint(i, u, C.HTML))
				);
			}
			_processToken(t) {
				switch (t.type) {
					case p.CHARACTER: {
						this.onCharacter(t);
						break;
					}
					case p.NULL_CHARACTER: {
						this.onNullCharacter(t);
						break;
					}
					case p.COMMENT: {
						this.onComment(t);
						break;
					}
					case p.DOCTYPE: {
						this.onDoctype(t);
						break;
					}
					case p.START_TAG: {
						this._processStartTag(t);
						break;
					}
					case p.END_TAG: {
						this.onEndTag(t);
						break;
					}
					case p.EOF: {
						this.onEof(t);
						break;
					}
					case p.WHITESPACE_CHARACTER: {
						this.onWhitespaceCharacter(t);
						break;
					}
				}
			}
			_isIntegrationPoint(t, u, i) {
				let n = this.treeAdapter.getNamespaceURI(u),
					s = this.treeAdapter.getAttrList(u);
				return on(t, n, s, i);
			}
			_reconstructActiveFormattingElements() {
				let t = this.activeFormattingElements.entries.length;
				if (t) {
					let u = this.activeFormattingElements.entries.findIndex(
							(n) =>
								n.type === re.Marker || this.openElements.contains(n.element)
						),
						i = u < 0 ? t - 1 : u - 1;
					for (let n = i; n >= 0; n--) {
						let s = this.activeFormattingElements.entries[n];
						this._insertElement(
							s.token,
							this.treeAdapter.getNamespaceURI(s.element)
						),
							(s.element = this.openElements.current);
					}
				}
			}
			_closeTableCell() {
				this.openElements.generateImpliedEndTags(),
					this.openElements.popUntilTableCellPopped(),
					this.activeFormattingElements.clearToLastMarker(),
					(this.insertionMode = m.IN_ROW);
			}
			_closePElement() {
				this.openElements.generateImpliedEndTagsWithExclusion(a.P),
					this.openElements.popUntilTagNamePopped(a.P);
			}
			_resetInsertionMode() {
				for (let t = this.openElements.stackTop; t >= 0; t--)
					switch (
						t === 0 && this.fragmentContext
							? this.fragmentContextID
							: this.openElements.tagIDs[t]
					) {
						case a.TR: {
							this.insertionMode = m.IN_ROW;
							return;
						}
						case a.TBODY:
						case a.THEAD:
						case a.TFOOT: {
							this.insertionMode = m.IN_TABLE_BODY;
							return;
						}
						case a.CAPTION: {
							this.insertionMode = m.IN_CAPTION;
							return;
						}
						case a.COLGROUP: {
							this.insertionMode = m.IN_COLUMN_GROUP;
							return;
						}
						case a.TABLE: {
							this.insertionMode = m.IN_TABLE;
							return;
						}
						case a.BODY: {
							this.insertionMode = m.IN_BODY;
							return;
						}
						case a.FRAMESET: {
							this.insertionMode = m.IN_FRAMESET;
							return;
						}
						case a.SELECT: {
							this._resetInsertionModeForSelect(t);
							return;
						}
						case a.TEMPLATE: {
							this.insertionMode = this.tmplInsertionModeStack[0];
							return;
						}
						case a.HTML: {
							this.insertionMode = this.headElement
								? m.AFTER_HEAD
								: m.BEFORE_HEAD;
							return;
						}
						case a.TD:
						case a.TH: {
							if (t > 0) {
								this.insertionMode = m.IN_CELL;
								return;
							}
							break;
						}
						case a.HEAD: {
							if (t > 0) {
								this.insertionMode = m.IN_HEAD;
								return;
							}
							break;
						}
					}
				this.insertionMode = m.IN_BODY;
			}
			_resetInsertionModeForSelect(t) {
				if (t > 0)
					for (let u = t - 1; u > 0; u--) {
						let i = this.openElements.tagIDs[u];
						if (i === a.TEMPLATE) break;
						if (i === a.TABLE) {
							this.insertionMode = m.IN_SELECT_IN_TABLE;
							return;
						}
					}
				this.insertionMode = m.IN_SELECT;
			}
			_isElementCausesFosterParenting(t) {
				return dn.has(t);
			}
			_shouldFosterParentOnInsertion() {
				return (
					this.fosterParentingEnabled &&
					this._isElementCausesFosterParenting(this.openElements.currentTagId)
				);
			}
			_findFosterParentingLocation() {
				for (let t = this.openElements.stackTop; t >= 0; t--) {
					let u = this.openElements.items[t];
					switch (this.openElements.tagIDs[t]) {
						case a.TEMPLATE: {
							if (this.treeAdapter.getNamespaceURI(u) === C.HTML)
								return {
									parent: this.treeAdapter.getTemplateContent(u),
									beforeElement: null,
								};
							break;
						}
						case a.TABLE: {
							let i = this.treeAdapter.getParentNode(u);
							return i
								? { parent: i, beforeElement: u }
								: {
										parent: this.openElements.items[t - 1],
										beforeElement: null,
									};
						}
						default:
					}
				}
				return { parent: this.openElements.items[0], beforeElement: null };
			}
			_fosterParentElement(t) {
				let u = this._findFosterParentingLocation();
				u.beforeElement
					? this.treeAdapter.insertBefore(u.parent, t, u.beforeElement)
					: this.treeAdapter.appendChild(u.parent, t);
			}
			_isSpecialElement(t, u) {
				let i = this.treeAdapter.getNamespaceURI(t);
				return qi[i].has(u);
			}
			onCharacter(t) {
				if (((this.skipNextNewLine = !1), this.tokenizer.inForeignNode)) {
					v2(this, t);
					return;
				}
				switch (this.insertionMode) {
					case m.INITIAL: {
						ot(this, t);
						break;
					}
					case m.BEFORE_HTML: {
						ct(this, t);
						break;
					}
					case m.BEFORE_HEAD: {
						lt(this, t);
						break;
					}
					case m.IN_HEAD: {
						ft(this, t);
						break;
					}
					case m.IN_HEAD_NO_SCRIPT: {
						dt(this, t);
						break;
					}
					case m.AFTER_HEAD: {
						ht(this, t);
						break;
					}
					case m.IN_BODY:
					case m.IN_CAPTION:
					case m.IN_CELL:
					case m.IN_TEMPLATE: {
						En(this, t);
						break;
					}
					case m.TEXT:
					case m.IN_SELECT:
					case m.IN_SELECT_IN_TABLE: {
						this._insertCharacters(t);
						break;
					}
					case m.IN_TABLE:
					case m.IN_TABLE_BODY:
					case m.IN_ROW: {
						Nu(this, t);
						break;
					}
					case m.IN_TABLE_TEXT: {
						Cn(this, t);
						break;
					}
					case m.IN_COLUMN_GROUP: {
						Ht(this, t);
						break;
					}
					case m.AFTER_BODY: {
						pt(this, t);
						break;
					}
					case m.AFTER_AFTER_BODY: {
						Ut(this, t);
						break;
					}
					default:
				}
			}
			onNullCharacter(t) {
				if (((this.skipNextNewLine = !1), this.tokenizer.inForeignNode)) {
					F2(this, t);
					return;
				}
				switch (this.insertionMode) {
					case m.INITIAL: {
						ot(this, t);
						break;
					}
					case m.BEFORE_HTML: {
						ct(this, t);
						break;
					}
					case m.BEFORE_HEAD: {
						lt(this, t);
						break;
					}
					case m.IN_HEAD: {
						ft(this, t);
						break;
					}
					case m.IN_HEAD_NO_SCRIPT: {
						dt(this, t);
						break;
					}
					case m.AFTER_HEAD: {
						ht(this, t);
						break;
					}
					case m.TEXT: {
						this._insertCharacters(t);
						break;
					}
					case m.IN_TABLE:
					case m.IN_TABLE_BODY:
					case m.IN_ROW: {
						Nu(this, t);
						break;
					}
					case m.IN_COLUMN_GROUP: {
						Ht(this, t);
						break;
					}
					case m.AFTER_BODY: {
						pt(this, t);
						break;
					}
					case m.AFTER_AFTER_BODY: {
						Ut(this, t);
						break;
					}
					default:
				}
			}
			onComment(t) {
				if (((this.skipNextNewLine = !1), this.currentNotInHTML)) {
					Iu(this, t);
					return;
				}
				switch (this.insertionMode) {
					case m.INITIAL:
					case m.BEFORE_HTML:
					case m.BEFORE_HEAD:
					case m.IN_HEAD:
					case m.IN_HEAD_NO_SCRIPT:
					case m.AFTER_HEAD:
					case m.IN_BODY:
					case m.IN_TABLE:
					case m.IN_CAPTION:
					case m.IN_COLUMN_GROUP:
					case m.IN_TABLE_BODY:
					case m.IN_ROW:
					case m.IN_CELL:
					case m.IN_SELECT:
					case m.IN_SELECT_IN_TABLE:
					case m.IN_TEMPLATE:
					case m.IN_FRAMESET:
					case m.AFTER_FRAMESET: {
						Iu(this, t);
						break;
					}
					case m.IN_TABLE_TEXT: {
						rt(this, t);
						break;
					}
					case m.AFTER_BODY: {
						ha(this, t);
						break;
					}
					case m.AFTER_AFTER_BODY:
					case m.AFTER_AFTER_FRAMESET: {
						Ea(this, t);
						break;
					}
					default:
				}
			}
			onDoctype(t) {
				switch (((this.skipNextNewLine = !1), this.insertionMode)) {
					case m.INITIAL: {
						ma(this, t);
						break;
					}
					case m.BEFORE_HEAD:
					case m.IN_HEAD:
					case m.IN_HEAD_NO_SCRIPT:
					case m.AFTER_HEAD: {
						this._err(t, g.misplacedDoctype);
						break;
					}
					case m.IN_TABLE_TEXT: {
						rt(this, t);
						break;
					}
					default:
				}
			}
			onStartTag(t) {
				(this.skipNextNewLine = !1),
					(this.currentToken = t),
					this._processStartTag(t),
					t.selfClosing &&
						!t.ackSelfClosing &&
						this._err(t, g.nonVoidHtmlElementStartTagWithTrailingSolidus);
			}
			_processStartTag(t) {
				this.shouldProcessStartTagTokenInForeignContent(t)
					? U2(this, t)
					: this._startTagOutsideForeignContent(t);
			}
			_startTagOutsideForeignContent(t) {
				switch (this.insertionMode) {
					case m.INITIAL: {
						ot(this, t);
						break;
					}
					case m.BEFORE_HTML: {
						Ta(this, t);
						break;
					}
					case m.BEFORE_HEAD: {
						Aa(this, t);
						break;
					}
					case m.IN_HEAD: {
						Ee(this, t);
						break;
					}
					case m.IN_HEAD_NO_SCRIPT: {
						_a(this, t);
						break;
					}
					case m.AFTER_HEAD: {
						Na(this, t);
						break;
					}
					case m.IN_BODY: {
						ee(this, t);
						break;
					}
					case m.IN_TABLE: {
						Xe(this, t);
						break;
					}
					case m.IN_TABLE_TEXT: {
						rt(this, t);
						break;
					}
					case m.IN_CAPTION: {
						g2(this, t);
						break;
					}
					case m.IN_COLUMN_GROUP: {
						Ru(this, t);
						break;
					}
					case m.IN_TABLE_BODY: {
						Yt(this, t);
						break;
					}
					case m.IN_ROW: {
						Vt(this, t);
						break;
					}
					case m.IN_CELL: {
						D2(this, t);
						break;
					}
					case m.IN_SELECT: {
						Nn(this, t);
						break;
					}
					case m.IN_SELECT_IN_TABLE: {
						I2(this, t);
						break;
					}
					case m.IN_TEMPLATE: {
						L2(this, t);
						break;
					}
					case m.AFTER_BODY: {
						R2(this, t);
						break;
					}
					case m.IN_FRAMESET: {
						P2(this, t);
						break;
					}
					case m.AFTER_FRAMESET: {
						y2(this, t);
						break;
					}
					case m.AFTER_AFTER_BODY: {
						B2(this, t);
						break;
					}
					case m.AFTER_AFTER_FRAMESET: {
						M2(this, t);
						break;
					}
					default:
				}
			}
			onEndTag(t) {
				(this.skipNextNewLine = !1),
					(this.currentToken = t),
					this.currentNotInHTML
						? H2(this, t)
						: this._endTagOutsideForeignContent(t);
			}
			_endTagOutsideForeignContent(t) {
				switch (this.insertionMode) {
					case m.INITIAL: {
						ot(this, t);
						break;
					}
					case m.BEFORE_HTML: {
						ba(this, t);
						break;
					}
					case m.BEFORE_HEAD: {
						ga(this, t);
						break;
					}
					case m.IN_HEAD: {
						Ca(this, t);
						break;
					}
					case m.IN_HEAD_NO_SCRIPT: {
						Da(this, t);
						break;
					}
					case m.AFTER_HEAD: {
						Ia(this, t);
						break;
					}
					case m.IN_BODY: {
						qt(this, t);
						break;
					}
					case m.TEXT: {
						c2(this, t);
						break;
					}
					case m.IN_TABLE: {
						Et(this, t);
						break;
					}
					case m.IN_TABLE_TEXT: {
						rt(this, t);
						break;
					}
					case m.IN_CAPTION: {
						C2(this, t);
						break;
					}
					case m.IN_COLUMN_GROUP: {
						_2(this, t);
						break;
					}
					case m.IN_TABLE_BODY: {
						Su(this, t);
						break;
					}
					case m.IN_ROW: {
						Dn(this, t);
						break;
					}
					case m.IN_CELL: {
						N2(this, t);
						break;
					}
					case m.IN_SELECT: {
						In(this, t);
						break;
					}
					case m.IN_SELECT_IN_TABLE: {
						S2(this, t);
						break;
					}
					case m.IN_TEMPLATE: {
						k2(this, t);
						break;
					}
					case m.AFTER_BODY: {
						Ln(this, t);
						break;
					}
					case m.IN_FRAMESET: {
						O2(this, t);
						break;
					}
					case m.AFTER_FRAMESET: {
						w2(this, t);
						break;
					}
					case m.AFTER_AFTER_BODY: {
						Ut(this, t);
						break;
					}
					default:
				}
			}
			onEof(t) {
				switch (this.insertionMode) {
					case m.INITIAL: {
						ot(this, t);
						break;
					}
					case m.BEFORE_HTML: {
						ct(this, t);
						break;
					}
					case m.BEFORE_HEAD: {
						lt(this, t);
						break;
					}
					case m.IN_HEAD: {
						ft(this, t);
						break;
					}
					case m.IN_HEAD_NO_SCRIPT: {
						dt(this, t);
						break;
					}
					case m.AFTER_HEAD: {
						ht(this, t);
						break;
					}
					case m.IN_BODY:
					case m.IN_TABLE:
					case m.IN_CAPTION:
					case m.IN_COLUMN_GROUP:
					case m.IN_TABLE_BODY:
					case m.IN_ROW:
					case m.IN_CELL:
					case m.IN_SELECT:
					case m.IN_SELECT_IN_TABLE: {
						An(this, t);
						break;
					}
					case m.TEXT: {
						l2(this, t);
						break;
					}
					case m.IN_TABLE_TEXT: {
						rt(this, t);
						break;
					}
					case m.IN_TEMPLATE: {
						Sn(this, t);
						break;
					}
					case m.AFTER_BODY:
					case m.IN_FRAMESET:
					case m.AFTER_FRAMESET:
					case m.AFTER_AFTER_BODY:
					case m.AFTER_AFTER_FRAMESET: {
						ku(this, t);
						break;
					}
					default:
				}
			}
			onWhitespaceCharacter(t) {
				if (
					this.skipNextNewLine &&
					((this.skipNextNewLine = !1), t.chars.charCodeAt(0) === l.LINE_FEED)
				) {
					if (t.chars.length === 1) return;
					t.chars = t.chars.substr(1);
				}
				if (this.tokenizer.inForeignNode) {
					this._insertCharacters(t);
					return;
				}
				switch (this.insertionMode) {
					case m.IN_HEAD:
					case m.IN_HEAD_NO_SCRIPT:
					case m.AFTER_HEAD:
					case m.TEXT:
					case m.IN_COLUMN_GROUP:
					case m.IN_SELECT:
					case m.IN_SELECT_IN_TABLE:
					case m.IN_FRAMESET:
					case m.AFTER_FRAMESET: {
						this._insertCharacters(t);
						break;
					}
					case m.IN_BODY:
					case m.IN_CAPTION:
					case m.IN_CELL:
					case m.IN_TEMPLATE:
					case m.AFTER_BODY:
					case m.AFTER_AFTER_BODY:
					case m.AFTER_AFTER_FRAMESET: {
						hn(this, t);
						break;
					}
					case m.IN_TABLE:
					case m.IN_TABLE_BODY:
					case m.IN_ROW: {
						Nu(this, t);
						break;
					}
					case m.IN_TABLE_TEXT: {
						gn(this, t);
						break;
					}
					default:
				}
			}
		};
	function oa(e, t) {
		let u = e.activeFormattingElements.getElementEntryInScopeWithTagName(
			t.tagName
		);
		return (
			u
				? e.openElements.contains(u.element)
					? e.openElements.hasInScope(t.tagID) || (u = null)
					: (e.activeFormattingElements.removeEntry(u), (u = null))
				: bn(e, t),
			u
		);
	}
	function ra(e, t) {
		let u = null,
			i = e.openElements.stackTop;
		for (; i >= 0; i--) {
			let n = e.openElements.items[i];
			if (n === t.element) break;
			e._isSpecialElement(n, e.openElements.tagIDs[i]) && (u = n);
		}
		return (
			u ||
				(e.openElements.shortenToLength(i < 0 ? 0 : i),
				e.activeFormattingElements.removeEntry(t)),
			u
		);
	}
	function ca(e, t, u) {
		let i = t,
			n = e.openElements.getCommonAncestor(t);
		for (let s = 0, o = n; o !== u; s++, o = n) {
			n = e.openElements.getCommonAncestor(o);
			let r = e.activeFormattingElements.getElementEntry(o),
				c = r && s >= sa;
			!r || c
				? (c && e.activeFormattingElements.removeEntry(r),
					e.openElements.remove(o))
				: ((o = la(e, r)),
					i === t && (e.activeFormattingElements.bookmark = r),
					e.treeAdapter.detachNode(i),
					e.treeAdapter.appendChild(o, i),
					(i = o));
		}
		return i;
	}
	function la(e, t) {
		let u = e.treeAdapter.getNamespaceURI(t.element),
			i = e.treeAdapter.createElement(t.token.tagName, u, t.token.attrs);
		return e.openElements.replace(t.element, i), (t.element = i), i;
	}
	function fa(e, t, u) {
		let i = e.treeAdapter.getTagName(t),
			n = Be(i);
		if (e._isElementCausesFosterParenting(n)) e._fosterParentElement(u);
		else {
			let s = e.treeAdapter.getNamespaceURI(t);
			n === a.TEMPLATE &&
				s === C.HTML &&
				(t = e.treeAdapter.getTemplateContent(t)),
				e.treeAdapter.appendChild(t, u);
		}
	}
	function da(e, t, u) {
		let i = e.treeAdapter.getNamespaceURI(u.element),
			{ token: n } = u,
			s = e.treeAdapter.createElement(n.tagName, i, n.attrs);
		e._adoptNodes(t, s),
			e.treeAdapter.appendChild(t, s),
			e.activeFormattingElements.insertElementAfterBookmark(s, n),
			e.activeFormattingElements.removeEntry(u),
			e.openElements.remove(u.element),
			e.openElements.insertAfter(t, s, n.tagID);
	}
	function Lu(e, t) {
		for (let u = 0; u < na; u++) {
			let i = oa(e, t);
			if (!i) break;
			let n = ra(e, i);
			if (!n) break;
			e.activeFormattingElements.bookmark = i;
			let s = ca(e, n, i.element),
				o = e.openElements.getCommonAncestor(i.element);
			e.treeAdapter.detachNode(s), o && fa(e, o, s), da(e, n, i);
		}
	}
	function Iu(e, t) {
		e._appendCommentNode(t, e.openElements.currentTmplContentOrNode);
	}
	function ha(e, t) {
		e._appendCommentNode(t, e.openElements.items[0]);
	}
	function Ea(e, t) {
		e._appendCommentNode(t, e.document);
	}
	function ku(e, t) {
		if (((e.stopped = !0), t.location)) {
			let u = e.fragmentContext ? 0 : 2;
			for (let i = e.openElements.stackTop; i >= u; i--)
				e._setEndLocation(e.openElements.items[i], t);
			if (!e.fragmentContext && e.openElements.stackTop >= 0) {
				let i = e.openElements.items[0],
					n = e.treeAdapter.getNodeSourceCodeLocation(i);
				if (
					n &&
					!n.endTag &&
					(e._setEndLocation(i, t), e.openElements.stackTop >= 1)
				) {
					let s = e.openElements.items[1],
						o = e.treeAdapter.getNodeSourceCodeLocation(s);
					o && !o.endTag && e._setEndLocation(s, t);
				}
			}
		}
	}
	function ma(e, t) {
		e._setDocumentType(t);
		let u = t.forceQuirks ? $.QUIRKS : un(t);
		tn(t) || e._err(t, g.nonConformingDoctype),
			e.treeAdapter.setDocumentMode(e.document, u),
			(e.insertionMode = m.BEFORE_HTML);
	}
	function ot(e, t) {
		e._err(t, g.missingDoctype, !0),
			e.treeAdapter.setDocumentMode(e.document, $.QUIRKS),
			(e.insertionMode = m.BEFORE_HTML),
			e._processToken(t);
	}
	function Ta(e, t) {
		t.tagID === a.HTML
			? (e._insertElement(t, C.HTML), (e.insertionMode = m.BEFORE_HEAD))
			: ct(e, t);
	}
	function ba(e, t) {
		let u = t.tagID;
		(u === a.HTML || u === a.HEAD || u === a.BODY || u === a.BR) && ct(e, t);
	}
	function ct(e, t) {
		e._insertFakeRootElement(),
			(e.insertionMode = m.BEFORE_HEAD),
			e._processToken(t);
	}
	function Aa(e, t) {
		switch (t.tagID) {
			case a.HTML: {
				ee(e, t);
				break;
			}
			case a.HEAD: {
				e._insertElement(t, C.HTML),
					(e.headElement = e.openElements.current),
					(e.insertionMode = m.IN_HEAD);
				break;
			}
			default:
				lt(e, t);
		}
	}
	function ga(e, t) {
		let u = t.tagID;
		u === a.HEAD || u === a.BODY || u === a.HTML || u === a.BR
			? lt(e, t)
			: e._err(t, g.endTagWithoutMatchingOpenElement);
	}
	function lt(e, t) {
		e._insertFakeElement(A.HEAD, a.HEAD),
			(e.headElement = e.openElements.current),
			(e.insertionMode = m.IN_HEAD),
			e._processToken(t);
	}
	function Ee(e, t) {
		switch (t.tagID) {
			case a.HTML: {
				ee(e, t);
				break;
			}
			case a.BASE:
			case a.BASEFONT:
			case a.BGSOUND:
			case a.LINK:
			case a.META: {
				e._appendElement(t, C.HTML), (t.ackSelfClosing = !0);
				break;
			}
			case a.TITLE: {
				e._switchToTextParsing(t, Z.RCDATA);
				break;
			}
			case a.NOSCRIPT: {
				e.options.scriptingEnabled
					? e._switchToTextParsing(t, Z.RAWTEXT)
					: (e._insertElement(t, C.HTML),
						(e.insertionMode = m.IN_HEAD_NO_SCRIPT));
				break;
			}
			case a.NOFRAMES:
			case a.STYLE: {
				e._switchToTextParsing(t, Z.RAWTEXT);
				break;
			}
			case a.SCRIPT: {
				e._switchToTextParsing(t, Z.SCRIPT_DATA);
				break;
			}
			case a.TEMPLATE: {
				e._insertTemplate(t),
					e.activeFormattingElements.insertMarker(),
					(e.framesetOk = !1),
					(e.insertionMode = m.IN_TEMPLATE),
					e.tmplInsertionModeStack.unshift(m.IN_TEMPLATE);
				break;
			}
			case a.HEAD: {
				e._err(t, g.misplacedStartTagForHeadElement);
				break;
			}
			default:
				ft(e, t);
		}
	}
	function Ca(e, t) {
		switch (t.tagID) {
			case a.HEAD: {
				e.openElements.pop(), (e.insertionMode = m.AFTER_HEAD);
				break;
			}
			case a.BODY:
			case a.BR:
			case a.HTML: {
				ft(e, t);
				break;
			}
			case a.TEMPLATE: {
				Me(e, t);
				break;
			}
			default:
				e._err(t, g.endTagWithoutMatchingOpenElement);
		}
	}
	function Me(e, t) {
		e.openElements.tmplCount > 0
			? (e.openElements.generateImpliedEndTagsThoroughly(),
				e.openElements.currentTagId !== a.TEMPLATE &&
					e._err(t, g.closingOfElementWithOpenChildElements),
				e.openElements.popUntilTagNamePopped(a.TEMPLATE),
				e.activeFormattingElements.clearToLastMarker(),
				e.tmplInsertionModeStack.shift(),
				e._resetInsertionMode())
			: e._err(t, g.endTagWithoutMatchingOpenElement);
	}
	function ft(e, t) {
		e.openElements.pop(), (e.insertionMode = m.AFTER_HEAD), e._processToken(t);
	}
	function _a(e, t) {
		switch (t.tagID) {
			case a.HTML: {
				ee(e, t);
				break;
			}
			case a.BASEFONT:
			case a.BGSOUND:
			case a.HEAD:
			case a.LINK:
			case a.META:
			case a.NOFRAMES:
			case a.STYLE: {
				Ee(e, t);
				break;
			}
			case a.NOSCRIPT: {
				e._err(t, g.nestedNoscriptInHead);
				break;
			}
			default:
				dt(e, t);
		}
	}
	function Da(e, t) {
		switch (t.tagID) {
			case a.NOSCRIPT: {
				e.openElements.pop(), (e.insertionMode = m.IN_HEAD);
				break;
			}
			case a.BR: {
				dt(e, t);
				break;
			}
			default:
				e._err(t, g.endTagWithoutMatchingOpenElement);
		}
	}
	function dt(e, t) {
		let u =
			t.type === p.EOF
				? g.openElementsLeftAfterEof
				: g.disallowedContentInNoscriptInHead;
		e._err(t, u),
			e.openElements.pop(),
			(e.insertionMode = m.IN_HEAD),
			e._processToken(t);
	}
	function Na(e, t) {
		switch (t.tagID) {
			case a.HTML: {
				ee(e, t);
				break;
			}
			case a.BODY: {
				e._insertElement(t, C.HTML),
					(e.framesetOk = !1),
					(e.insertionMode = m.IN_BODY);
				break;
			}
			case a.FRAMESET: {
				e._insertElement(t, C.HTML), (e.insertionMode = m.IN_FRAMESET);
				break;
			}
			case a.BASE:
			case a.BASEFONT:
			case a.BGSOUND:
			case a.LINK:
			case a.META:
			case a.NOFRAMES:
			case a.SCRIPT:
			case a.STYLE:
			case a.TEMPLATE:
			case a.TITLE: {
				e._err(t, g.abandonedHeadElementChild),
					e.openElements.push(e.headElement, a.HEAD),
					Ee(e, t),
					e.openElements.remove(e.headElement);
				break;
			}
			case a.HEAD: {
				e._err(t, g.misplacedStartTagForHeadElement);
				break;
			}
			default:
				ht(e, t);
		}
	}
	function Ia(e, t) {
		switch (t.tagID) {
			case a.BODY:
			case a.HTML:
			case a.BR: {
				ht(e, t);
				break;
			}
			case a.TEMPLATE: {
				Me(e, t);
				break;
			}
			default:
				e._err(t, g.endTagWithoutMatchingOpenElement);
		}
	}
	function ht(e, t) {
		e._insertFakeElement(A.BODY, a.BODY),
			(e.insertionMode = m.IN_BODY),
			xt(e, t);
	}
	function xt(e, t) {
		switch (t.type) {
			case p.CHARACTER: {
				En(e, t);
				break;
			}
			case p.WHITESPACE_CHARACTER: {
				hn(e, t);
				break;
			}
			case p.COMMENT: {
				Iu(e, t);
				break;
			}
			case p.START_TAG: {
				ee(e, t);
				break;
			}
			case p.END_TAG: {
				qt(e, t);
				break;
			}
			case p.EOF: {
				An(e, t);
				break;
			}
			default:
		}
	}
	function hn(e, t) {
		e._reconstructActiveFormattingElements(), e._insertCharacters(t);
	}
	function En(e, t) {
		e._reconstructActiveFormattingElements(),
			e._insertCharacters(t),
			(e.framesetOk = !1);
	}
	function Sa(e, t) {
		e.openElements.tmplCount === 0 &&
			e.treeAdapter.adoptAttributes(e.openElements.items[0], t.attrs);
	}
	function La(e, t) {
		let u = e.openElements.tryPeekProperlyNestedBodyElement();
		u &&
			e.openElements.tmplCount === 0 &&
			((e.framesetOk = !1), e.treeAdapter.adoptAttributes(u, t.attrs));
	}
	function ka(e, t) {
		let u = e.openElements.tryPeekProperlyNestedBodyElement();
		e.framesetOk &&
			u &&
			(e.treeAdapter.detachNode(u),
			e.openElements.popAllUpToHtmlElement(),
			e._insertElement(t, C.HTML),
			(e.insertionMode = m.IN_FRAMESET));
	}
	function Ra(e, t) {
		e.openElements.hasInButtonScope(a.P) && e._closePElement(),
			e._insertElement(t, C.HTML);
	}
	function Pa(e, t) {
		e.openElements.hasInButtonScope(a.P) && e._closePElement(),
			yt(e.openElements.currentTagId) && e.openElements.pop(),
			e._insertElement(t, C.HTML);
	}
	function Oa(e, t) {
		e.openElements.hasInButtonScope(a.P) && e._closePElement(),
			e._insertElement(t, C.HTML),
			(e.skipNextNewLine = !0),
			(e.framesetOk = !1);
	}
	function ya(e, t) {
		let u = e.openElements.tmplCount > 0;
		(!e.formElement || u) &&
			(e.openElements.hasInButtonScope(a.P) && e._closePElement(),
			e._insertElement(t, C.HTML),
			u || (e.formElement = e.openElements.current));
	}
	function wa(e, t) {
		e.framesetOk = !1;
		let u = t.tagID;
		for (let i = e.openElements.stackTop; i >= 0; i--) {
			let n = e.openElements.tagIDs[i];
			if (
				(u === a.LI && n === a.LI) ||
				((u === a.DD || u === a.DT) && (n === a.DD || n === a.DT))
			) {
				e.openElements.generateImpliedEndTagsWithExclusion(n),
					e.openElements.popUntilTagNamePopped(n);
				break;
			}
			if (
				n !== a.ADDRESS &&
				n !== a.DIV &&
				n !== a.P &&
				e._isSpecialElement(e.openElements.items[i], n)
			)
				break;
		}
		e.openElements.hasInButtonScope(a.P) && e._closePElement(),
			e._insertElement(t, C.HTML);
	}
	function Ba(e, t) {
		e.openElements.hasInButtonScope(a.P) && e._closePElement(),
			e._insertElement(t, C.HTML),
			(e.tokenizer.state = Z.PLAINTEXT);
	}
	function Ma(e, t) {
		e.openElements.hasInScope(a.BUTTON) &&
			(e.openElements.generateImpliedEndTags(),
			e.openElements.popUntilTagNamePopped(a.BUTTON)),
			e._reconstructActiveFormattingElements(),
			e._insertElement(t, C.HTML),
			(e.framesetOk = !1);
	}
	function Fa(e, t) {
		let u = e.activeFormattingElements.getElementEntryInScopeWithTagName(A.A);
		u &&
			(Lu(e, t),
			e.openElements.remove(u.element),
			e.activeFormattingElements.removeEntry(u)),
			e._reconstructActiveFormattingElements(),
			e._insertElement(t, C.HTML),
			e.activeFormattingElements.pushElement(e.openElements.current, t);
	}
	function va(e, t) {
		e._reconstructActiveFormattingElements(),
			e._insertElement(t, C.HTML),
			e.activeFormattingElements.pushElement(e.openElements.current, t);
	}
	function Ua(e, t) {
		e._reconstructActiveFormattingElements(),
			e.openElements.hasInScope(a.NOBR) &&
				(Lu(e, t), e._reconstructActiveFormattingElements()),
			e._insertElement(t, C.HTML),
			e.activeFormattingElements.pushElement(e.openElements.current, t);
	}
	function Ha(e, t) {
		e._reconstructActiveFormattingElements(),
			e._insertElement(t, C.HTML),
			e.activeFormattingElements.insertMarker(),
			(e.framesetOk = !1);
	}
	function pa(e, t) {
		e.treeAdapter.getDocumentMode(e.document) !== $.QUIRKS &&
			e.openElements.hasInButtonScope(a.P) &&
			e._closePElement(),
			e._insertElement(t, C.HTML),
			(e.framesetOk = !1),
			(e.insertionMode = m.IN_TABLE);
	}
	function mn(e, t) {
		e._reconstructActiveFormattingElements(),
			e._appendElement(t, C.HTML),
			(e.framesetOk = !1),
			(t.ackSelfClosing = !0);
	}
	function Tn(e) {
		let t = Ot(e, _e.TYPE);
		return t != null && t.toLowerCase() === ia;
	}
	function xa(e, t) {
		e._reconstructActiveFormattingElements(),
			e._appendElement(t, C.HTML),
			Tn(t) || (e.framesetOk = !1),
			(t.ackSelfClosing = !0);
	}
	function qa(e, t) {
		e._appendElement(t, C.HTML), (t.ackSelfClosing = !0);
	}
	function Ya(e, t) {
		e.openElements.hasInButtonScope(a.P) && e._closePElement(),
			e._appendElement(t, C.HTML),
			(e.framesetOk = !1),
			(t.ackSelfClosing = !0);
	}
	function Va(e, t) {
		(t.tagName = A.IMG), (t.tagID = a.IMG), mn(e, t);
	}
	function Wa(e, t) {
		e._insertElement(t, C.HTML),
			(e.skipNextNewLine = !0),
			(e.tokenizer.state = Z.RCDATA),
			(e.originalInsertionMode = e.insertionMode),
			(e.framesetOk = !1),
			(e.insertionMode = m.TEXT);
	}
	function Xa(e, t) {
		e.openElements.hasInButtonScope(a.P) && e._closePElement(),
			e._reconstructActiveFormattingElements(),
			(e.framesetOk = !1),
			e._switchToTextParsing(t, Z.RAWTEXT);
	}
	function Qa(e, t) {
		(e.framesetOk = !1), e._switchToTextParsing(t, Z.RAWTEXT);
	}
	function ln(e, t) {
		e._switchToTextParsing(t, Z.RAWTEXT);
	}
	function ja(e, t) {
		e._reconstructActiveFormattingElements(),
			e._insertElement(t, C.HTML),
			(e.framesetOk = !1),
			(e.insertionMode =
				e.insertionMode === m.IN_TABLE ||
				e.insertionMode === m.IN_CAPTION ||
				e.insertionMode === m.IN_TABLE_BODY ||
				e.insertionMode === m.IN_ROW ||
				e.insertionMode === m.IN_CELL
					? m.IN_SELECT_IN_TABLE
					: m.IN_SELECT);
	}
	function Ka(e, t) {
		e.openElements.currentTagId === a.OPTION && e.openElements.pop(),
			e._reconstructActiveFormattingElements(),
			e._insertElement(t, C.HTML);
	}
	function Ga(e, t) {
		e.openElements.hasInScope(a.RUBY) &&
			e.openElements.generateImpliedEndTags(),
			e._insertElement(t, C.HTML);
	}
	function za(e, t) {
		e.openElements.hasInScope(a.RUBY) &&
			e.openElements.generateImpliedEndTagsWithExclusion(a.RTC),
			e._insertElement(t, C.HTML);
	}
	function Ja(e, t) {
		e._reconstructActiveFormattingElements(),
			_u(t),
			vt(t),
			t.selfClosing
				? e._appendElement(t, C.MATHML)
				: e._insertElement(t, C.MATHML),
			(t.ackSelfClosing = !0);
	}
	function $a(e, t) {
		e._reconstructActiveFormattingElements(),
			Du(t),
			vt(t),
			t.selfClosing ? e._appendElement(t, C.SVG) : e._insertElement(t, C.SVG),
			(t.ackSelfClosing = !0);
	}
	function fn(e, t) {
		e._reconstructActiveFormattingElements(), e._insertElement(t, C.HTML);
	}
	function ee(e, t) {
		switch (t.tagID) {
			case a.I:
			case a.S:
			case a.B:
			case a.U:
			case a.EM:
			case a.TT:
			case a.BIG:
			case a.CODE:
			case a.FONT:
			case a.SMALL:
			case a.STRIKE:
			case a.STRONG: {
				va(e, t);
				break;
			}
			case a.A: {
				Fa(e, t);
				break;
			}
			case a.H1:
			case a.H2:
			case a.H3:
			case a.H4:
			case a.H5:
			case a.H6: {
				Pa(e, t);
				break;
			}
			case a.P:
			case a.DL:
			case a.OL:
			case a.UL:
			case a.DIV:
			case a.DIR:
			case a.NAV:
			case a.MAIN:
			case a.MENU:
			case a.ASIDE:
			case a.CENTER:
			case a.FIGURE:
			case a.FOOTER:
			case a.HEADER:
			case a.HGROUP:
			case a.DIALOG:
			case a.DETAILS:
			case a.ADDRESS:
			case a.ARTICLE:
			case a.SECTION:
			case a.SUMMARY:
			case a.FIELDSET:
			case a.BLOCKQUOTE:
			case a.FIGCAPTION: {
				Ra(e, t);
				break;
			}
			case a.LI:
			case a.DD:
			case a.DT: {
				wa(e, t);
				break;
			}
			case a.BR:
			case a.IMG:
			case a.WBR:
			case a.AREA:
			case a.EMBED:
			case a.KEYGEN: {
				mn(e, t);
				break;
			}
			case a.HR: {
				Ya(e, t);
				break;
			}
			case a.RB:
			case a.RTC: {
				Ga(e, t);
				break;
			}
			case a.RT:
			case a.RP: {
				za(e, t);
				break;
			}
			case a.PRE:
			case a.LISTING: {
				Oa(e, t);
				break;
			}
			case a.XMP: {
				Xa(e, t);
				break;
			}
			case a.SVG: {
				$a(e, t);
				break;
			}
			case a.HTML: {
				Sa(e, t);
				break;
			}
			case a.BASE:
			case a.LINK:
			case a.META:
			case a.STYLE:
			case a.TITLE:
			case a.SCRIPT:
			case a.BGSOUND:
			case a.BASEFONT:
			case a.TEMPLATE: {
				Ee(e, t);
				break;
			}
			case a.BODY: {
				La(e, t);
				break;
			}
			case a.FORM: {
				ya(e, t);
				break;
			}
			case a.NOBR: {
				Ua(e, t);
				break;
			}
			case a.MATH: {
				Ja(e, t);
				break;
			}
			case a.TABLE: {
				pa(e, t);
				break;
			}
			case a.INPUT: {
				xa(e, t);
				break;
			}
			case a.PARAM:
			case a.TRACK:
			case a.SOURCE: {
				qa(e, t);
				break;
			}
			case a.IMAGE: {
				Va(e, t);
				break;
			}
			case a.BUTTON: {
				Ma(e, t);
				break;
			}
			case a.APPLET:
			case a.OBJECT:
			case a.MARQUEE: {
				Ha(e, t);
				break;
			}
			case a.IFRAME: {
				Qa(e, t);
				break;
			}
			case a.SELECT: {
				ja(e, t);
				break;
			}
			case a.OPTION:
			case a.OPTGROUP: {
				Ka(e, t);
				break;
			}
			case a.NOEMBED: {
				ln(e, t);
				break;
			}
			case a.FRAMESET: {
				ka(e, t);
				break;
			}
			case a.TEXTAREA: {
				Wa(e, t);
				break;
			}
			case a.NOSCRIPT: {
				e.options.scriptingEnabled ? ln(e, t) : fn(e, t);
				break;
			}
			case a.PLAINTEXT: {
				Ba(e, t);
				break;
			}
			case a.COL:
			case a.TH:
			case a.TD:
			case a.TR:
			case a.HEAD:
			case a.FRAME:
			case a.TBODY:
			case a.TFOOT:
			case a.THEAD:
			case a.CAPTION:
			case a.COLGROUP:
				break;
			default:
				fn(e, t);
		}
	}
	function Za(e, t) {
		if (
			e.openElements.hasInScope(a.BODY) &&
			((e.insertionMode = m.AFTER_BODY), e.options.sourceCodeLocationInfo)
		) {
			let u = e.openElements.tryPeekProperlyNestedBodyElement();
			u && e._setEndLocation(u, t);
		}
	}
	function e2(e, t) {
		e.openElements.hasInScope(a.BODY) &&
			((e.insertionMode = m.AFTER_BODY), Ln(e, t));
	}
	function t2(e, t) {
		let u = t.tagID;
		e.openElements.hasInScope(u) &&
			(e.openElements.generateImpliedEndTags(),
			e.openElements.popUntilTagNamePopped(u));
	}
	function u2(e) {
		let t = e.openElements.tmplCount > 0,
			{ formElement: u } = e;
		t || (e.formElement = null),
			(u || t) &&
				e.openElements.hasInScope(a.FORM) &&
				(e.openElements.generateImpliedEndTags(),
				t
					? e.openElements.popUntilTagNamePopped(a.FORM)
					: u && e.openElements.remove(u));
	}
	function i2(e) {
		e.openElements.hasInButtonScope(a.P) || e._insertFakeElement(A.P, a.P),
			e._closePElement();
	}
	function n2(e) {
		e.openElements.hasInListItemScope(a.LI) &&
			(e.openElements.generateImpliedEndTagsWithExclusion(a.LI),
			e.openElements.popUntilTagNamePopped(a.LI));
	}
	function s2(e, t) {
		let u = t.tagID;
		e.openElements.hasInScope(u) &&
			(e.openElements.generateImpliedEndTagsWithExclusion(u),
			e.openElements.popUntilTagNamePopped(u));
	}
	function a2(e) {
		e.openElements.hasNumberedHeaderInScope() &&
			(e.openElements.generateImpliedEndTags(),
			e.openElements.popUntilNumberedHeaderPopped());
	}
	function o2(e, t) {
		let u = t.tagID;
		e.openElements.hasInScope(u) &&
			(e.openElements.generateImpliedEndTags(),
			e.openElements.popUntilTagNamePopped(u),
			e.activeFormattingElements.clearToLastMarker());
	}
	function r2(e) {
		e._reconstructActiveFormattingElements(),
			e._insertFakeElement(A.BR, a.BR),
			e.openElements.pop(),
			(e.framesetOk = !1);
	}
	function bn(e, t) {
		let u = t.tagName,
			i = t.tagID;
		for (let n = e.openElements.stackTop; n > 0; n--) {
			let s = e.openElements.items[n],
				o = e.openElements.tagIDs[n];
			if (i === o && (i !== a.UNKNOWN || e.treeAdapter.getTagName(s) === u)) {
				e.openElements.generateImpliedEndTagsWithExclusion(i),
					e.openElements.stackTop >= n && e.openElements.shortenToLength(n);
				break;
			}
			if (e._isSpecialElement(s, o)) break;
		}
	}
	function qt(e, t) {
		switch (t.tagID) {
			case a.A:
			case a.B:
			case a.I:
			case a.S:
			case a.U:
			case a.EM:
			case a.TT:
			case a.BIG:
			case a.CODE:
			case a.FONT:
			case a.NOBR:
			case a.SMALL:
			case a.STRIKE:
			case a.STRONG: {
				Lu(e, t);
				break;
			}
			case a.P: {
				i2(e);
				break;
			}
			case a.DL:
			case a.UL:
			case a.OL:
			case a.DIR:
			case a.DIV:
			case a.NAV:
			case a.PRE:
			case a.MAIN:
			case a.MENU:
			case a.ASIDE:
			case a.BUTTON:
			case a.CENTER:
			case a.FIGURE:
			case a.FOOTER:
			case a.HEADER:
			case a.HGROUP:
			case a.DIALOG:
			case a.ADDRESS:
			case a.ARTICLE:
			case a.DETAILS:
			case a.SECTION:
			case a.SUMMARY:
			case a.LISTING:
			case a.FIELDSET:
			case a.BLOCKQUOTE:
			case a.FIGCAPTION: {
				t2(e, t);
				break;
			}
			case a.LI: {
				n2(e);
				break;
			}
			case a.DD:
			case a.DT: {
				s2(e, t);
				break;
			}
			case a.H1:
			case a.H2:
			case a.H3:
			case a.H4:
			case a.H5:
			case a.H6: {
				a2(e);
				break;
			}
			case a.BR: {
				r2(e);
				break;
			}
			case a.BODY: {
				Za(e, t);
				break;
			}
			case a.HTML: {
				e2(e, t);
				break;
			}
			case a.FORM: {
				u2(e);
				break;
			}
			case a.APPLET:
			case a.OBJECT:
			case a.MARQUEE: {
				o2(e, t);
				break;
			}
			case a.TEMPLATE: {
				Me(e, t);
				break;
			}
			default:
				bn(e, t);
		}
	}
	function An(e, t) {
		e.tmplInsertionModeStack.length > 0 ? Sn(e, t) : ku(e, t);
	}
	function c2(e, t) {
		var u;
		t.tagID === a.SCRIPT &&
			((u = e.scriptHandler) === null ||
				u === void 0 ||
				u.call(e, e.openElements.current)),
			e.openElements.pop(),
			(e.insertionMode = e.originalInsertionMode);
	}
	function l2(e, t) {
		e._err(t, g.eofInElementThatCanContainOnlyText),
			e.openElements.pop(),
			(e.insertionMode = e.originalInsertionMode),
			e.onEof(t);
	}
	function Nu(e, t) {
		if (dn.has(e.openElements.currentTagId))
			switch (
				((e.pendingCharacterTokens.length = 0),
				(e.hasNonWhitespacePendingCharacterToken = !1),
				(e.originalInsertionMode = e.insertionMode),
				(e.insertionMode = m.IN_TABLE_TEXT),
				t.type)
			) {
				case p.CHARACTER: {
					Cn(e, t);
					break;
				}
				case p.WHITESPACE_CHARACTER: {
					gn(e, t);
					break;
				}
			}
		else mt(e, t);
	}
	function f2(e, t) {
		e.openElements.clearBackToTableContext(),
			e.activeFormattingElements.insertMarker(),
			e._insertElement(t, C.HTML),
			(e.insertionMode = m.IN_CAPTION);
	}
	function d2(e, t) {
		e.openElements.clearBackToTableContext(),
			e._insertElement(t, C.HTML),
			(e.insertionMode = m.IN_COLUMN_GROUP);
	}
	function h2(e, t) {
		e.openElements.clearBackToTableContext(),
			e._insertFakeElement(A.COLGROUP, a.COLGROUP),
			(e.insertionMode = m.IN_COLUMN_GROUP),
			Ru(e, t);
	}
	function E2(e, t) {
		e.openElements.clearBackToTableContext(),
			e._insertElement(t, C.HTML),
			(e.insertionMode = m.IN_TABLE_BODY);
	}
	function m2(e, t) {
		e.openElements.clearBackToTableContext(),
			e._insertFakeElement(A.TBODY, a.TBODY),
			(e.insertionMode = m.IN_TABLE_BODY),
			Yt(e, t);
	}
	function T2(e, t) {
		e.openElements.hasInTableScope(a.TABLE) &&
			(e.openElements.popUntilTagNamePopped(a.TABLE),
			e._resetInsertionMode(),
			e._processStartTag(t));
	}
	function b2(e, t) {
		Tn(t) ? e._appendElement(t, C.HTML) : mt(e, t), (t.ackSelfClosing = !0);
	}
	function A2(e, t) {
		!e.formElement &&
			e.openElements.tmplCount === 0 &&
			(e._insertElement(t, C.HTML),
			(e.formElement = e.openElements.current),
			e.openElements.pop());
	}
	function Xe(e, t) {
		switch (t.tagID) {
			case a.TD:
			case a.TH:
			case a.TR: {
				m2(e, t);
				break;
			}
			case a.STYLE:
			case a.SCRIPT:
			case a.TEMPLATE: {
				Ee(e, t);
				break;
			}
			case a.COL: {
				h2(e, t);
				break;
			}
			case a.FORM: {
				A2(e, t);
				break;
			}
			case a.TABLE: {
				T2(e, t);
				break;
			}
			case a.TBODY:
			case a.TFOOT:
			case a.THEAD: {
				E2(e, t);
				break;
			}
			case a.INPUT: {
				b2(e, t);
				break;
			}
			case a.CAPTION: {
				f2(e, t);
				break;
			}
			case a.COLGROUP: {
				d2(e, t);
				break;
			}
			default:
				mt(e, t);
		}
	}
	function Et(e, t) {
		switch (t.tagID) {
			case a.TABLE: {
				e.openElements.hasInTableScope(a.TABLE) &&
					(e.openElements.popUntilTagNamePopped(a.TABLE),
					e._resetInsertionMode());
				break;
			}
			case a.TEMPLATE: {
				Me(e, t);
				break;
			}
			case a.BODY:
			case a.CAPTION:
			case a.COL:
			case a.COLGROUP:
			case a.HTML:
			case a.TBODY:
			case a.TD:
			case a.TFOOT:
			case a.TH:
			case a.THEAD:
			case a.TR:
				break;
			default:
				mt(e, t);
		}
	}
	function mt(e, t) {
		let u = e.fosterParentingEnabled;
		(e.fosterParentingEnabled = !0), xt(e, t), (e.fosterParentingEnabled = u);
	}
	function gn(e, t) {
		e.pendingCharacterTokens.push(t);
	}
	function Cn(e, t) {
		e.pendingCharacterTokens.push(t),
			(e.hasNonWhitespacePendingCharacterToken = !0);
	}
	function rt(e, t) {
		let u = 0;
		if (e.hasNonWhitespacePendingCharacterToken)
			for (; u < e.pendingCharacterTokens.length; u++)
				mt(e, e.pendingCharacterTokens[u]);
		else
			for (; u < e.pendingCharacterTokens.length; u++)
				e._insertCharacters(e.pendingCharacterTokens[u]);
		(e.insertionMode = e.originalInsertionMode), e._processToken(t);
	}
	var _n = new Set([
		a.CAPTION,
		a.COL,
		a.COLGROUP,
		a.TBODY,
		a.TD,
		a.TFOOT,
		a.TH,
		a.THEAD,
		a.TR,
	]);
	function g2(e, t) {
		let u = t.tagID;
		_n.has(u)
			? e.openElements.hasInTableScope(a.CAPTION) &&
				(e.openElements.generateImpliedEndTags(),
				e.openElements.popUntilTagNamePopped(a.CAPTION),
				e.activeFormattingElements.clearToLastMarker(),
				(e.insertionMode = m.IN_TABLE),
				Xe(e, t))
			: ee(e, t);
	}
	function C2(e, t) {
		let u = t.tagID;
		switch (u) {
			case a.CAPTION:
			case a.TABLE: {
				e.openElements.hasInTableScope(a.CAPTION) &&
					(e.openElements.generateImpliedEndTags(),
					e.openElements.popUntilTagNamePopped(a.CAPTION),
					e.activeFormattingElements.clearToLastMarker(),
					(e.insertionMode = m.IN_TABLE),
					u === a.TABLE && Et(e, t));
				break;
			}
			case a.BODY:
			case a.COL:
			case a.COLGROUP:
			case a.HTML:
			case a.TBODY:
			case a.TD:
			case a.TFOOT:
			case a.TH:
			case a.THEAD:
			case a.TR:
				break;
			default:
				qt(e, t);
		}
	}
	function Ru(e, t) {
		switch (t.tagID) {
			case a.HTML: {
				ee(e, t);
				break;
			}
			case a.COL: {
				e._appendElement(t, C.HTML), (t.ackSelfClosing = !0);
				break;
			}
			case a.TEMPLATE: {
				Ee(e, t);
				break;
			}
			default:
				Ht(e, t);
		}
	}
	function _2(e, t) {
		switch (t.tagID) {
			case a.COLGROUP: {
				e.openElements.currentTagId === a.COLGROUP &&
					(e.openElements.pop(), (e.insertionMode = m.IN_TABLE));
				break;
			}
			case a.TEMPLATE: {
				Me(e, t);
				break;
			}
			case a.COL:
				break;
			default:
				Ht(e, t);
		}
	}
	function Ht(e, t) {
		e.openElements.currentTagId === a.COLGROUP &&
			(e.openElements.pop(),
			(e.insertionMode = m.IN_TABLE),
			e._processToken(t));
	}
	function Yt(e, t) {
		switch (t.tagID) {
			case a.TR: {
				e.openElements.clearBackToTableBodyContext(),
					e._insertElement(t, C.HTML),
					(e.insertionMode = m.IN_ROW);
				break;
			}
			case a.TH:
			case a.TD: {
				e.openElements.clearBackToTableBodyContext(),
					e._insertFakeElement(A.TR, a.TR),
					(e.insertionMode = m.IN_ROW),
					Vt(e, t);
				break;
			}
			case a.CAPTION:
			case a.COL:
			case a.COLGROUP:
			case a.TBODY:
			case a.TFOOT:
			case a.THEAD: {
				e.openElements.hasTableBodyContextInTableScope() &&
					(e.openElements.clearBackToTableBodyContext(),
					e.openElements.pop(),
					(e.insertionMode = m.IN_TABLE),
					Xe(e, t));
				break;
			}
			default:
				Xe(e, t);
		}
	}
	function Su(e, t) {
		let u = t.tagID;
		switch (t.tagID) {
			case a.TBODY:
			case a.TFOOT:
			case a.THEAD: {
				e.openElements.hasInTableScope(u) &&
					(e.openElements.clearBackToTableBodyContext(),
					e.openElements.pop(),
					(e.insertionMode = m.IN_TABLE));
				break;
			}
			case a.TABLE: {
				e.openElements.hasTableBodyContextInTableScope() &&
					(e.openElements.clearBackToTableBodyContext(),
					e.openElements.pop(),
					(e.insertionMode = m.IN_TABLE),
					Et(e, t));
				break;
			}
			case a.BODY:
			case a.CAPTION:
			case a.COL:
			case a.COLGROUP:
			case a.HTML:
			case a.TD:
			case a.TH:
			case a.TR:
				break;
			default:
				Et(e, t);
		}
	}
	function Vt(e, t) {
		switch (t.tagID) {
			case a.TH:
			case a.TD: {
				e.openElements.clearBackToTableRowContext(),
					e._insertElement(t, C.HTML),
					(e.insertionMode = m.IN_CELL),
					e.activeFormattingElements.insertMarker();
				break;
			}
			case a.CAPTION:
			case a.COL:
			case a.COLGROUP:
			case a.TBODY:
			case a.TFOOT:
			case a.THEAD:
			case a.TR: {
				e.openElements.hasInTableScope(a.TR) &&
					(e.openElements.clearBackToTableRowContext(),
					e.openElements.pop(),
					(e.insertionMode = m.IN_TABLE_BODY),
					Yt(e, t));
				break;
			}
			default:
				Xe(e, t);
		}
	}
	function Dn(e, t) {
		switch (t.tagID) {
			case a.TR: {
				e.openElements.hasInTableScope(a.TR) &&
					(e.openElements.clearBackToTableRowContext(),
					e.openElements.pop(),
					(e.insertionMode = m.IN_TABLE_BODY));
				break;
			}
			case a.TABLE: {
				e.openElements.hasInTableScope(a.TR) &&
					(e.openElements.clearBackToTableRowContext(),
					e.openElements.pop(),
					(e.insertionMode = m.IN_TABLE_BODY),
					Su(e, t));
				break;
			}
			case a.TBODY:
			case a.TFOOT:
			case a.THEAD: {
				(e.openElements.hasInTableScope(t.tagID) ||
					e.openElements.hasInTableScope(a.TR)) &&
					(e.openElements.clearBackToTableRowContext(),
					e.openElements.pop(),
					(e.insertionMode = m.IN_TABLE_BODY),
					Su(e, t));
				break;
			}
			case a.BODY:
			case a.CAPTION:
			case a.COL:
			case a.COLGROUP:
			case a.HTML:
			case a.TD:
			case a.TH:
				break;
			default:
				Et(e, t);
		}
	}
	function D2(e, t) {
		let u = t.tagID;
		_n.has(u)
			? (e.openElements.hasInTableScope(a.TD) ||
					e.openElements.hasInTableScope(a.TH)) &&
				(e._closeTableCell(), Vt(e, t))
			: ee(e, t);
	}
	function N2(e, t) {
		let u = t.tagID;
		switch (u) {
			case a.TD:
			case a.TH: {
				e.openElements.hasInTableScope(u) &&
					(e.openElements.generateImpliedEndTags(),
					e.openElements.popUntilTagNamePopped(u),
					e.activeFormattingElements.clearToLastMarker(),
					(e.insertionMode = m.IN_ROW));
				break;
			}
			case a.TABLE:
			case a.TBODY:
			case a.TFOOT:
			case a.THEAD:
			case a.TR: {
				e.openElements.hasInTableScope(u) && (e._closeTableCell(), Dn(e, t));
				break;
			}
			case a.BODY:
			case a.CAPTION:
			case a.COL:
			case a.COLGROUP:
			case a.HTML:
				break;
			default:
				qt(e, t);
		}
	}
	function Nn(e, t) {
		switch (t.tagID) {
			case a.HTML: {
				ee(e, t);
				break;
			}
			case a.OPTION: {
				e.openElements.currentTagId === a.OPTION && e.openElements.pop(),
					e._insertElement(t, C.HTML);
				break;
			}
			case a.OPTGROUP: {
				e.openElements.currentTagId === a.OPTION && e.openElements.pop(),
					e.openElements.currentTagId === a.OPTGROUP && e.openElements.pop(),
					e._insertElement(t, C.HTML);
				break;
			}
			case a.INPUT:
			case a.KEYGEN:
			case a.TEXTAREA:
			case a.SELECT: {
				e.openElements.hasInSelectScope(a.SELECT) &&
					(e.openElements.popUntilTagNamePopped(a.SELECT),
					e._resetInsertionMode(),
					t.tagID !== a.SELECT && e._processStartTag(t));
				break;
			}
			case a.SCRIPT:
			case a.TEMPLATE: {
				Ee(e, t);
				break;
			}
			default:
		}
	}
	function In(e, t) {
		switch (t.tagID) {
			case a.OPTGROUP: {
				e.openElements.stackTop > 0 &&
					e.openElements.currentTagId === a.OPTION &&
					e.openElements.tagIDs[e.openElements.stackTop - 1] === a.OPTGROUP &&
					e.openElements.pop(),
					e.openElements.currentTagId === a.OPTGROUP && e.openElements.pop();
				break;
			}
			case a.OPTION: {
				e.openElements.currentTagId === a.OPTION && e.openElements.pop();
				break;
			}
			case a.SELECT: {
				e.openElements.hasInSelectScope(a.SELECT) &&
					(e.openElements.popUntilTagNamePopped(a.SELECT),
					e._resetInsertionMode());
				break;
			}
			case a.TEMPLATE: {
				Me(e, t);
				break;
			}
			default:
		}
	}
	function I2(e, t) {
		let u = t.tagID;
		u === a.CAPTION ||
		u === a.TABLE ||
		u === a.TBODY ||
		u === a.TFOOT ||
		u === a.THEAD ||
		u === a.TR ||
		u === a.TD ||
		u === a.TH
			? (e.openElements.popUntilTagNamePopped(a.SELECT),
				e._resetInsertionMode(),
				e._processStartTag(t))
			: Nn(e, t);
	}
	function S2(e, t) {
		let u = t.tagID;
		u === a.CAPTION ||
		u === a.TABLE ||
		u === a.TBODY ||
		u === a.TFOOT ||
		u === a.THEAD ||
		u === a.TR ||
		u === a.TD ||
		u === a.TH
			? e.openElements.hasInTableScope(u) &&
				(e.openElements.popUntilTagNamePopped(a.SELECT),
				e._resetInsertionMode(),
				e.onEndTag(t))
			: In(e, t);
	}
	function L2(e, t) {
		switch (t.tagID) {
			case a.BASE:
			case a.BASEFONT:
			case a.BGSOUND:
			case a.LINK:
			case a.META:
			case a.NOFRAMES:
			case a.SCRIPT:
			case a.STYLE:
			case a.TEMPLATE:
			case a.TITLE: {
				Ee(e, t);
				break;
			}
			case a.CAPTION:
			case a.COLGROUP:
			case a.TBODY:
			case a.TFOOT:
			case a.THEAD: {
				(e.tmplInsertionModeStack[0] = m.IN_TABLE),
					(e.insertionMode = m.IN_TABLE),
					Xe(e, t);
				break;
			}
			case a.COL: {
				(e.tmplInsertionModeStack[0] = m.IN_COLUMN_GROUP),
					(e.insertionMode = m.IN_COLUMN_GROUP),
					Ru(e, t);
				break;
			}
			case a.TR: {
				(e.tmplInsertionModeStack[0] = m.IN_TABLE_BODY),
					(e.insertionMode = m.IN_TABLE_BODY),
					Yt(e, t);
				break;
			}
			case a.TD:
			case a.TH: {
				(e.tmplInsertionModeStack[0] = m.IN_ROW),
					(e.insertionMode = m.IN_ROW),
					Vt(e, t);
				break;
			}
			default:
				(e.tmplInsertionModeStack[0] = m.IN_BODY),
					(e.insertionMode = m.IN_BODY),
					ee(e, t);
		}
	}
	function k2(e, t) {
		t.tagID === a.TEMPLATE && Me(e, t);
	}
	function Sn(e, t) {
		e.openElements.tmplCount > 0
			? (e.openElements.popUntilTagNamePopped(a.TEMPLATE),
				e.activeFormattingElements.clearToLastMarker(),
				e.tmplInsertionModeStack.shift(),
				e._resetInsertionMode(),
				e.onEof(t))
			: ku(e, t);
	}
	function R2(e, t) {
		t.tagID === a.HTML ? ee(e, t) : pt(e, t);
	}
	function Ln(e, t) {
		var u;
		if (t.tagID === a.HTML) {
			if (
				(e.fragmentContext || (e.insertionMode = m.AFTER_AFTER_BODY),
				e.options.sourceCodeLocationInfo && e.openElements.tagIDs[0] === a.HTML)
			) {
				e._setEndLocation(e.openElements.items[0], t);
				let i = e.openElements.items[1];
				i &&
					!(
						!(
							(u = e.treeAdapter.getNodeSourceCodeLocation(i)) === null ||
							u === void 0
						) && u.endTag
					) &&
					e._setEndLocation(i, t);
			}
		} else pt(e, t);
	}
	function pt(e, t) {
		(e.insertionMode = m.IN_BODY), xt(e, t);
	}
	function P2(e, t) {
		switch (t.tagID) {
			case a.HTML: {
				ee(e, t);
				break;
			}
			case a.FRAMESET: {
				e._insertElement(t, C.HTML);
				break;
			}
			case a.FRAME: {
				e._appendElement(t, C.HTML), (t.ackSelfClosing = !0);
				break;
			}
			case a.NOFRAMES: {
				Ee(e, t);
				break;
			}
			default:
		}
	}
	function O2(e, t) {
		t.tagID === a.FRAMESET &&
			!e.openElements.isRootHtmlElementCurrent() &&
			(e.openElements.pop(),
			!e.fragmentContext &&
				e.openElements.currentTagId !== a.FRAMESET &&
				(e.insertionMode = m.AFTER_FRAMESET));
	}
	function y2(e, t) {
		switch (t.tagID) {
			case a.HTML: {
				ee(e, t);
				break;
			}
			case a.NOFRAMES: {
				Ee(e, t);
				break;
			}
			default:
		}
	}
	function w2(e, t) {
		t.tagID === a.HTML && (e.insertionMode = m.AFTER_AFTER_FRAMESET);
	}
	function B2(e, t) {
		t.tagID === a.HTML ? ee(e, t) : Ut(e, t);
	}
	function Ut(e, t) {
		(e.insertionMode = m.IN_BODY), xt(e, t);
	}
	function M2(e, t) {
		switch (t.tagID) {
			case a.HTML: {
				ee(e, t);
				break;
			}
			case a.NOFRAMES: {
				Ee(e, t);
				break;
			}
			default:
		}
	}
	function F2(e, t) {
		(t.chars = Q), e._insertCharacters(t);
	}
	function v2(e, t) {
		e._insertCharacters(t), (e.framesetOk = !1);
	}
	function kn(e) {
		for (
			;
			e.treeAdapter.getNamespaceURI(e.openElements.current) !== C.HTML &&
			!e._isIntegrationPoint(
				e.openElements.currentTagId,
				e.openElements.current
			);

		)
			e.openElements.pop();
	}
	function U2(e, t) {
		if (sn(t)) kn(e), e._startTagOutsideForeignContent(t);
		else {
			let u = e._getAdjustedCurrentElement(),
				i = e.treeAdapter.getNamespaceURI(u);
			i === C.MATHML ? _u(t) : i === C.SVG && (an(t), Du(t)),
				vt(t),
				t.selfClosing ? e._appendElement(t, i) : e._insertElement(t, i),
				(t.ackSelfClosing = !0);
		}
	}
	function H2(e, t) {
		if (t.tagID === a.P || t.tagID === a.BR) {
			kn(e), e._endTagOutsideForeignContent(t);
			return;
		}
		for (let u = e.openElements.stackTop; u > 0; u--) {
			let i = e.openElements.items[u];
			if (e.treeAdapter.getNamespaceURI(i) === C.HTML) {
				e._endTagOutsideForeignContent(t);
				break;
			}
			let n = e.treeAdapter.getTagName(i);
			if (n.toLowerCase() === t.tagName) {
				(t.tagName = n), e.openElements.shortenToLength(u);
				break;
			}
		}
	}
	var p2 = new Map([
			[34, "&quot;"],
			[38, "&amp;"],
			[39, "&apos;"],
			[60, "&lt;"],
			[62, "&gt;"],
		]),
		Fr =
			String.prototype.codePointAt != null
				? (e, t) => e.codePointAt(t)
				: (e, t) =>
						(e.charCodeAt(t) & 64512) === 55296
							? (e.charCodeAt(t) - 55296) * 1024 +
								e.charCodeAt(t + 1) -
								56320 +
								65536
							: e.charCodeAt(t);
	function Pu(e, t) {
		return function (i) {
			let n,
				s = 0,
				o = "";
			for (; (n = e.exec(i)); )
				s !== n.index && (o += i.substring(s, n.index)),
					(o += t.get(n[0].charCodeAt(0))),
					(s = n.index + 1);
			return o + i.substring(s);
		};
	}
	var vr = Pu(/[&<>'"]/g, p2),
		Rn = Pu(
			/["&\u00A0]/g,
			new Map([
				[34, "&quot;"],
				[38, "&amp;"],
				[160, "&nbsp;"],
			])
		),
		Pn = Pu(
			/[&<>\u00A0]/g,
			new Map([
				[38, "&amp;"],
				[60, "&lt;"],
				[62, "&gt;"],
				[160, "&nbsp;"],
			])
		);
	var x2 = new Set([
		A.AREA,
		A.BASE,
		A.BASEFONT,
		A.BGSOUND,
		A.BR,
		A.COL,
		A.EMBED,
		A.FRAME,
		A.HR,
		A.IMG,
		A.INPUT,
		A.KEYGEN,
		A.LINK,
		A.META,
		A.PARAM,
		A.SOURCE,
		A.TRACK,
		A.WBR,
	]);
	function On(e, t) {
		return (
			t.treeAdapter.isElementNode(e) &&
			t.treeAdapter.getNamespaceURI(e) === C.HTML &&
			x2.has(t.treeAdapter.getTagName(e))
		);
	}
	var q2 = { treeAdapter: De, scriptingEnabled: !0 };
	function Qe(e, t) {
		let u = { ...q2, ...t };
		return On(e, u) ? "" : yn(e, u);
	}
	function yn(e, t) {
		let u = "",
			i =
				t.treeAdapter.isElementNode(e) &&
				t.treeAdapter.getTagName(e) === A.TEMPLATE &&
				t.treeAdapter.getNamespaceURI(e) === C.HTML
					? t.treeAdapter.getTemplateContent(e)
					: e,
			n = t.treeAdapter.getChildNodes(i);
		if (n) for (let s of n) u += Y2(s, t);
		return u;
	}
	function Y2(e, t) {
		return t.treeAdapter.isElementNode(e)
			? V2(e, t)
			: t.treeAdapter.isTextNode(e)
				? X2(e, t)
				: t.treeAdapter.isCommentNode(e)
					? Q2(e, t)
					: t.treeAdapter.isDocumentTypeNode(e)
						? j2(e, t)
						: "";
	}
	function V2(e, t) {
		let u = t.treeAdapter.getTagName(e);
		return `<${u}${W2(e, t)}>${On(e, t) ? "" : `${yn(e, t)}</${u}>`}`;
	}
	function W2(e, { treeAdapter: t }) {
		let u = "";
		for (let i of t.getAttrList(e)) {
			if (((u += " "), !i.namespace)) u += i.name;
			else
				switch (i.namespace) {
					case C.XML: {
						u += `xml:${i.name}`;
						break;
					}
					case C.XMLNS: {
						i.name !== "xmlns" && (u += "xmlns:"), (u += i.name);
						break;
					}
					case C.XLINK: {
						u += `xlink:${i.name}`;
						break;
					}
					default:
						u += `${i.prefix}:${i.name}`;
				}
			u += `="${Rn(i.value)}"`;
		}
		return u;
	}
	function X2(e, t) {
		let { treeAdapter: u } = t,
			i = u.getTextNodeContent(e),
			n = u.getParentNode(e),
			s = n && u.isElementNode(n) && u.getTagName(n);
		return s && u.getNamespaceURI(n) === C.HTML && Yi(s, t.scriptingEnabled)
			? i
			: Pn(i);
	}
	function Q2(e, { treeAdapter: t }) {
		return `<!--${t.getCommentNodeContent(e)}-->`;
	}
	function j2(e, { treeAdapter: t }) {
		return `<!DOCTYPE ${t.getDocumentTypeNodeName(e)}>`;
	}
	function Ou(e, t) {
		return We.parse(e, t);
	}
	function Tt(e, t, u) {
		typeof e == "string" && ((u = t), (t = e), (e = null));
		let i = We.getFragmentParser(e, u);
		return i.tokenizer.write(t, !0), i.getFragment();
	}
	var yu = class extends Mu.default {
			constructor(t) {
				super(),
					(this.ctx = t),
					(this.rewriteUrl = t.rewriteUrl),
					(this.sourceUrl = t.sourceUrl);
			}
			rewrite(t, u = {}) {
				return (
					t &&
					this.recast(
						t,
						(i) => {
							i.tagName && this.emit("element", i, "rewrite"),
								i.attr && this.emit("attr", i, "rewrite"),
								i.nodeName === "#text" && this.emit("text", i, "rewrite");
						},
						u
					)
				);
			}
			source(t, u = {}) {
				return (
					t &&
					this.recast(
						t,
						(i) => {
							i.tagName && this.emit("element", i, "source"),
								i.attr && this.emit("attr", i, "source"),
								i.nodeName === "#text" && this.emit("text", i, "source");
						},
						u
					)
				);
			}
			recast(t, u, i = {}) {
				try {
					let n = (i.document ? Ou : Tt)(new String(t).toString());
					return this.iterate(n, u, i), Qe(n);
				} catch {
					return t;
				}
			}
			iterate(t, u, i) {
				if (!t) return t;
				if (t.tagName) {
					let n = new Wt(t, !1, i);
					if ((u(n), t.attrs))
						for (let s of t.attrs) s.skip || u(new wu(n, s, i));
				}
				if (t.childNodes)
					for (let n of t.childNodes) n.skip || this.iterate(n, u, i);
				return (
					t.nodeName === "#text" && u(new Bu(t, new Wt(t.parentNode), !1, i)), t
				);
			}
			wrapSrcset(t, u = this.ctx.meta) {
				let i = /(.*?)\s\d+\.?\d?[xyhw].?/g,
					n = t.matchAll(i);
				var s = !1;
				for (let o of n)
					(s = !0), (t = t.replace(o[1], this.ctx.rewriteUrl(o[1], u)));
				return s !== !0 && (t = this.ctx.rewriteUrl(t, u)), t;
			}
			unwrapSrcset(t, u = this.ctx.meta) {
				let i = /(.*?)\s\d+\.?\d?[xyhw].?/g,
					n = t.matchAll(i);
				var s = !1;
				for (let o of n)
					(s = !0), (t = t.replace(o[1], this.ctx.sourceUrl(o[1], u)));
				return s !== !0 && (t = this.ctx.sourceUrl(t, u)), t;
			}
			static parse = Ou;
			static parseFragment = Tt;
			static serialize = Qe;
		},
		Wt = class e extends Mu.default {
			constructor(t, u = !1, i = {}) {
				super(), (this.stream = u), (this.node = t), (this.options = i);
			}
			setAttribute(t, u) {
				for (let i of this.attrs) if (i.name === t) return (i.value = u), !0;
				this.attrs.push({ name: t, value: u });
			}
			getAttribute(t) {
				return (this.attrs.find((i) => i.name === t) || {}).value;
			}
			hasAttribute(t) {
				return !!this.attrs.find((u) => u.name === t);
			}
			removeAttribute(t) {
				let u = this.attrs.findIndex((i) => i.name === t);
				typeof u < "u" && this.attrs.splice(u, 1);
			}
			get tagName() {
				return this.node.tagName;
			}
			set tagName(t) {
				this.node.tagName = t;
			}
			get childNodes() {
				return this.stream ? null : this.node.childNodes;
			}
			get innerHTML() {
				return this.stream
					? null
					: Qe({ nodeName: "#document-fragment", childNodes: this.childNodes });
			}
			set innerHTML(t) {
				this.stream || (this.node.childNodes = Tt(t).childNodes);
			}
			get outerHTML() {
				return this.stream
					? null
					: Qe({ nodeName: "#document-fragment", childNodes: [this] });
			}
			set outerHTML(t) {
				this.stream ||
					this.parentNode.childNodes.splice(
						this.parentNode.childNodes.findIndex((u) => u === this.node),
						1,
						...Tt(t).childNodes
					);
			}
			get textContent() {
				if (this.stream) return null;
				let t = "";
				return (
					this.iterate(this.node, (u) => {
						u.nodeName === "#text" && (t += u.value);
					}),
					t
				);
			}
			set textContent(t) {
				this.stream ||
					(this.node.childNodes = [
						{ nodeName: "#text", value: t, parentNode: this.node },
					]);
			}
			get nodeName() {
				return this.node.nodeName;
			}
			get parentNode() {
				return this.node.parentNode ? new e(this.node.parentNode) : null;
			}
			get attrs() {
				return this.node.attrs;
			}
			get namespaceURI() {
				return this.node.namespaceURI;
			}
		},
		wu = class {
			constructor(t, u, i = {}) {
				(this.attr = u),
					(this.attrs = t.attrs),
					(this.node = t),
					(this.options = i);
			}
			delete() {
				let t = this.attrs.findIndex((u) => u === this.attr);
				return (
					this.attrs.splice(t, 1),
					Object.defineProperty(this, "deleted", { get: () => !0 }),
					!0
				);
			}
			get name() {
				return this.attr.name;
			}
			set name(t) {
				this.attr.name = t;
			}
			get value() {
				return this.attr.value;
			}
			set value(t) {
				this.attr.value = t;
			}
			get deleted() {
				return !1;
			}
		},
		Bu = class {
			constructor(t, u, i = !1, n = {}) {
				(this.stream = i),
					(this.node = t),
					(this.element = u),
					(this.options = n);
			}
			get nodeName() {
				return this.node.nodeName;
			}
			get parentNode() {
				return this.element;
			}
			get value() {
				return this.stream ? this.node.text : this.node.value;
			}
			set value(t) {
				this.stream ? (this.node.text = t) : (this.node.value = t);
			}
		},
		wn = yu;
	var Bn = Ye(it(), 1),
		Fu = class extends Bn.default {
			constructor(t) {
				super(), (this.ctx = t), (this.meta = t.meta);
			}
			rewrite(t, u) {
				return this.recast(t, u, "rewrite");
			}
			source(t, u) {
				return this.recast(t, u, "source");
			}
			recast(t, u, i) {
				let n =
					/(@import\s+(?!url\())?\s*url\(\s*(['"]?)([^'")]+)\2\s*\)|@import\s+(['"])([^'"]+)\4/g;
				return (
					t &&
					((t = new String(t).toString()),
					t.replace(n, (s, o, r, c, h, T) => {
						let b = c || T,
							d =
								i === "rewrite"
									? this.ctx.rewriteUrl(b)
									: this.ctx.sourceUrl(b);
						return o
							? `@import url(${r}${d}${r})`
							: h
								? `@import ${h}${d}${h}`
								: `url(${r}${d}${r})`;
					}))
				);
			}
		},
		Mn = Fu;
	var K2 = {
			0: "Unexpected token",
			28: "Unexpected token: '%0'",
			1: "Octal escape sequences are not allowed in strict mode",
			2: "Octal escape sequences are not allowed in template strings",
			3: "Unexpected token `#`",
			4: "Illegal Unicode escape sequence",
			5: "Invalid code point %0",
			6: "Invalid hexadecimal escape sequence",
			8: "Octal literals are not allowed in strict mode",
			7: "Decimal integer literals with a leading zero are forbidden in strict mode",
			9: "Expected number in radix %0",
			146: "Invalid left-hand side assignment to a destructible right-hand side",
			10: "Non-number found after exponent indicator",
			11: "Invalid BigIntLiteral",
			12: "No identifiers allowed directly after numeric literal",
			13: "Escapes \\8 or \\9 are not syntactically valid escapes",
			14: "Unterminated string literal",
			15: "Unterminated template literal",
			16: "Multiline comment was not closed properly",
			17: "The identifier contained dynamic unicode escape that was not closed",
			18: "Illegal character '%0'",
			19: "Missing hexadecimal digits",
			20: "Invalid implicit octal",
			21: "Invalid line break in string literal",
			22: "Only unicode escapes are legal in identifier names",
			23: "Expected '%0'",
			24: "Invalid left-hand side in assignment",
			25: "Invalid left-hand side in async arrow",
			26: 'Calls to super must be in the "constructor" method of a class expression or class declaration that has a superclass',
			27: "Member access on super must be in a method",
			29: "Await expression not allowed in formal parameter",
			30: "Yield expression not allowed in formal parameter",
			93: "Unexpected token: 'escaped keyword'",
			31: "Unary expressions as the left operand of an exponentiation expression must be disambiguated with parentheses",
			120: "Async functions can only be declared at the top level or inside a block",
			32: "Unterminated regular expression",
			33: "Unexpected regular expression flag",
			34: "Duplicate regular expression flag '%0'",
			35: "%0 functions must have exactly %1 argument%2",
			36: "Setter function argument must not be a rest parameter",
			37: "%0 declaration must have a name in this context",
			38: "Function name may not contain any reserved words or be eval or arguments in strict mode",
			39: "The rest operator is missing an argument",
			40: "A getter cannot be a generator",
			41: "A setter cannot be a generator",
			42: "A computed property name must be followed by a colon or paren",
			131: "Object literal keys that are strings or numbers must be a method or have a colon",
			44: "Found `* async x(){}` but this should be `async * x(){}`",
			43: "Getters and setters can not be generators",
			45: "'%0' can not be generator method",
			46: "No line break is allowed after '=>'",
			47: "The left-hand side of the arrow can only be destructed through assignment",
			48: "The binding declaration is not destructible",
			49: "Async arrow can not be followed by new expression",
			50: "Classes may not have a static property named 'prototype'",
			51: "Class constructor may not be a %0",
			52: "Duplicate constructor method in class",
			53: "Invalid increment/decrement operand",
			54: "Invalid use of `new` keyword on an increment/decrement expression",
			55: "`=>` is an invalid assignment target",
			56: "Rest element may not have a trailing comma",
			57: "Missing initializer in %0 declaration",
			58: "'for-%0' loop head declarations can not have an initializer",
			59: "Invalid left-hand side in for-%0 loop: Must have a single binding",
			60: "Invalid shorthand property initializer",
			61: "Property name __proto__ appears more than once in object literal",
			62: "Let is disallowed as a lexically bound name",
			63: "Invalid use of '%0' inside new expression",
			64: "Illegal 'use strict' directive in function with non-simple parameter list",
			65: 'Identifier "let" disallowed as left-hand side expression in strict mode',
			66: "Illegal continue statement",
			67: "Illegal break statement",
			68: "Cannot have `let[...]` as a var name in strict mode",
			69: "Invalid destructuring assignment target",
			70: "Rest parameter may not have a default initializer",
			71: "The rest argument must the be last parameter",
			72: "Invalid rest argument",
			74: "In strict mode code, functions can only be declared at top level or inside a block",
			75: "In non-strict mode code, functions can only be declared at top level, inside a block, or as the body of an if statement",
			76: "Without web compatibility enabled functions can not be declared at top level, inside a block, or as the body of an if statement",
			77: "Class declaration can't appear in single-statement context",
			78: "Invalid left-hand side in for-%0",
			79: "Invalid assignment in for-%0",
			80: "for await (... of ...) is only valid in async functions and async generators",
			81: "The first token after the template expression should be a continuation of the template",
			83: "`let` declaration not allowed here and `let` cannot be a regular var name in strict mode",
			82: "`let \n [` is a restricted production at the start of a statement",
			84: "Catch clause requires exactly one parameter, not more (and no trailing comma)",
			85: "Catch clause parameter does not support default values",
			86: "Missing catch or finally after try",
			87: "More than one default clause in switch statement",
			88: "Illegal newline after throw",
			89: "Strict mode code may not include a with statement",
			90: "Illegal return statement",
			91: "The left hand side of the for-header binding declaration is not destructible",
			92: "new.target only allowed within functions",
			94: "'#' not followed by identifier",
			100: "Invalid keyword",
			99: "Can not use 'let' as a class name",
			98: "'A lexical declaration can't define a 'let' binding",
			97: "Can not use `let` as variable name in strict mode",
			95: "'%0' may not be used as an identifier in this context",
			96: "Await is only valid in async functions",
			101: "The %0 keyword can only be used with the module goal",
			102: "Unicode codepoint must not be greater than 0x10FFFF",
			103: "%0 source must be string",
			104: "Only a identifier can be used to indicate alias",
			105: "Only '*' or '{...}' can be imported after default",
			106: "Trailing decorator may be followed by method",
			107: "Decorators can't be used with a constructor",
			109: "HTML comments are only allowed with web compatibility (Annex B)",
			110: "The identifier 'let' must not be in expression position in strict mode",
			111: "Cannot assign to `eval` and `arguments` in strict mode",
			112: "The left-hand side of a for-of loop may not start with 'let'",
			113: "Block body arrows can not be immediately invoked without a group",
			114: "Block body arrows can not be immediately accessed without a group",
			115: "Unexpected strict mode reserved word",
			116: "Unexpected eval or arguments in strict mode",
			117: "Decorators must not be followed by a semicolon",
			118: "Calling delete on expression not allowed in strict mode",
			119: "Pattern can not have a tail",
			121: "Can not have a `yield` expression on the left side of a ternary",
			122: "An arrow function can not have a postfix update operator",
			123: "Invalid object literal key character after generator star",
			124: "Private fields can not be deleted",
			126: "Classes may not have a field called constructor",
			125: "Classes may not have a private element named constructor",
			127: "A class field initializer may not contain arguments",
			128: "Generators can only be declared at the top level or inside a block",
			129: "Async methods are a restricted production and cannot have a newline following it",
			130: "Unexpected character after object literal property name",
			132: "Invalid key token",
			133: "Label '%0' has already been declared",
			134: "continue statement must be nested within an iteration statement",
			135: "Undefined label '%0'",
			136: "Trailing comma is disallowed inside import(...) arguments",
			137: "import() requires exactly one argument",
			138: "Cannot use new with import(...)",
			139: "... is not allowed in import()",
			140: "Expected '=>'",
			141: "Duplicate binding '%0'",
			142: "Cannot export a duplicate name '%0'",
			145: "Duplicate %0 for-binding",
			143: "Exported binding '%0' needs to refer to a top-level declared variable",
			144: "Unexpected private field",
			148: "Numeric separators are not allowed at the end of numeric literals",
			147: "Only one underscore is allowed as numeric separator",
			149: "JSX value should be either an expression or a quoted JSX text",
			150: "Expected corresponding JSX closing tag for %0",
			151: "Adjacent JSX elements must be wrapped in an enclosing tag",
			152: "JSX attributes must only be assigned a non-empty 'expression'",
			153: "'%0' has already been declared",
			154: "'%0' shadowed a catch clause binding",
			155: "Dot property must be an identifier",
			156: "Encountered invalid input after spread/rest argument",
			157: "Catch without try",
			158: "Finally without try",
			159: "Expected corresponding closing tag for JSX fragment",
			160: "Coalescing and logical operators used together in the same expression must be disambiguated with parentheses",
			161: "Invalid tagged template on optional chain",
			162: "Invalid optional chain from super property",
			163: "Invalid optional chain from new expression",
			164: 'Cannot use "import.meta" outside a module',
			165: "Leading decorators must be attached to a class declaration",
		},
		Ge = class extends SyntaxError {
			constructor(t, u, i, n, ...s) {
				let o =
					"[" + u + ":" + i + "]: " + K2[n].replace(/%(\d+)/g, (r, c) => s[c]);
				super(`${o}`),
					(this.index = t),
					(this.line = u),
					(this.column = i),
					(this.description = o),
					(this.loc = { line: u, column: i });
			}
		};
	function E(e, t, ...u) {
		throw new Ge(e.index, e.line, e.column, t, ...u);
	}
	function tu(e) {
		throw new Ge(e.index, e.line, e.column, e.type, e.params);
	}
	function ze(e, t, u, i, ...n) {
		throw new Ge(e, t, u, i, ...n);
	}
	function Je(e, t, u, i) {
		throw new Ge(e, t, u, i);
	}
	var At = ((e, t) => {
		let u = new Uint32Array(104448),
			i = 0,
			n = 0;
		for (; i < 3701; ) {
			let s = e[i++];
			if (s < 0) n -= s;
			else {
				let o = e[i++];
				s & 2 && (o = t[o]), s & 1 ? u.fill(o, n, (n += e[i++])) : (u[n++] = o);
			}
		}
		return u;
	})(
		[
			-1, 2, 26, 2, 27, 2, 5, -1, 0, 77595648, 3, 44, 2, 3, 0, 14, 2, 57, 2, 58,
			3, 0, 3, 0, 3168796671, 0, 4294956992, 2, 1, 2, 0, 2, 59, 3, 0, 4, 0,
			4294966523, 3, 0, 4, 2, 16, 2, 60, 2, 0, 0, 4294836735, 0, 3221225471, 0,
			4294901942, 2, 61, 0, 134152192, 3, 0, 2, 0, 4294951935, 3, 0, 2, 0,
			2683305983, 0, 2684354047, 2, 18, 2, 0, 0, 4294961151, 3, 0, 2, 2, 19, 2,
			0, 0, 608174079, 2, 0, 2, 54, 2, 7, 2, 6, 0, 4278222591, 3, 0, 2, 2, 1, 3,
			0, 3, 0, 4294901711, 2, 40, 0, 4089839103, 0, 2961209759, 0, 1342439375,
			0, 4294543342, 0, 3547201023, 0, 1577204103, 0, 4194240, 0, 4294688750, 2,
			2, 0, 80831, 0, 4261478351, 0, 4294549486, 2, 2, 0, 2967484831, 0, 196559,
			0, 3594373100, 0, 3288319768, 0, 8469959, 2, 200, 2, 3, 0, 4093640191, 0,
			660618719, 0, 65487, 0, 4294828015, 0, 4092591615, 0, 1616920031, 0,
			982991, 2, 3, 2, 0, 0, 2163244511, 0, 4227923919, 0, 4236247022, 2, 66, 0,
			4284449919, 0, 851904, 2, 4, 2, 12, 0, 67076095, -1, 2, 67, 0, 1073741743,
			0, 4093607775, -1, 0, 50331649, 0, 3265266687, 2, 33, 0, 4294844415, 0,
			4278190047, 2, 20, 2, 133, -1, 3, 0, 2, 2, 23, 2, 0, 2, 10, 2, 0, 2, 15,
			2, 22, 3, 0, 10, 2, 69, 2, 0, 2, 70, 2, 71, 2, 72, 2, 0, 2, 73, 2, 0, 2,
			11, 0, 261632, 2, 25, 3, 0, 2, 2, 13, 2, 4, 3, 0, 18, 2, 74, 2, 5, 3, 0,
			2, 2, 75, 0, 2151677951, 2, 29, 2, 9, 0, 909311, 3, 0, 2, 0, 814743551, 2,
			42, 0, 67090432, 3, 0, 2, 2, 41, 2, 0, 2, 6, 2, 0, 2, 30, 2, 8, 0,
			268374015, 2, 107, 2, 48, 2, 0, 2, 76, 0, 134153215, -1, 2, 7, 2, 0, 2, 8,
			0, 2684354559, 0, 67044351, 0, 3221160064, 2, 17, -1, 3, 0, 2, 0,
			67051519, 0, 1046528, 3, 0, 3, 2, 9, 2, 0, 2, 50, 0, 4294960127, 2, 10, 2,
			39, 2, 11, 0, 4294377472, 2, 12, 3, 0, 16, 2, 13, 2, 0, 2, 79, 2, 10, 2,
			0, 2, 80, 2, 81, 2, 82, 2, 206, 2, 129, 0, 1048577, 2, 83, 2, 14, -1, 2,
			14, 0, 131042, 2, 84, 2, 85, 2, 86, 2, 0, 2, 34, -83, 3, 0, 7, 0, 1046559,
			2, 0, 2, 15, 2, 0, 0, 2147516671, 2, 21, 3, 87, 2, 2, 0, -16, 2, 88, 0,
			524222462, 2, 4, 2, 0, 0, 4269801471, 2, 4, 3, 0, 2, 2, 28, 2, 16, 3, 0,
			2, 2, 17, 2, 0, -1, 2, 18, -16, 3, 0, 206, -2, 3, 0, 692, 2, 68, -1, 2,
			18, 2, 10, 3, 0, 8, 2, 90, 2, 128, 2, 0, 0, 3220242431, 3, 0, 3, 2, 19, 2,
			91, 2, 92, 3, 0, 2, 2, 93, 2, 0, 2, 94, 2, 45, 2, 0, 0, 4351, 2, 0, 2, 9,
			3, 0, 2, 0, 67043391, 0, 3909091327, 2, 0, 2, 24, 2, 9, 2, 20, 3, 0, 2, 0,
			67076097, 2, 8, 2, 0, 2, 21, 0, 67059711, 0, 4236247039, 3, 0, 2, 0,
			939524103, 0, 8191999, 2, 98, 2, 99, 2, 22, 2, 23, 3, 0, 3, 0, 67057663,
			3, 0, 349, 2, 100, 2, 101, 2, 7, -264, 3, 0, 11, 2, 24, 3, 0, 2, 2, 32,
			-1, 0, 3774349439, 2, 102, 2, 103, 3, 0, 2, 2, 19, 2, 104, 3, 0, 10, 2,
			10, 2, 18, 2, 0, 2, 46, 2, 0, 2, 31, 2, 105, 2, 25, 0, 1638399, 2, 170, 2,
			106, 3, 0, 3, 2, 20, 2, 26, 2, 27, 2, 5, 2, 28, 2, 0, 2, 8, 2, 108, -1, 2,
			109, 2, 110, 2, 111, -1, 3, 0, 3, 2, 12, -2, 2, 0, 2, 29, -3, 2, 159, -4,
			2, 20, 2, 0, 2, 36, 0, 1, 2, 0, 2, 62, 2, 6, 2, 12, 2, 10, 2, 0, 2, 112,
			-1, 3, 0, 4, 2, 10, 2, 23, 2, 113, 2, 7, 2, 0, 2, 114, 2, 0, 2, 115, 2,
			116, 2, 117, -2, 3, 0, 9, 2, 21, 2, 30, 2, 31, 2, 118, 2, 119, -2, 2, 120,
			2, 121, 2, 30, 2, 21, 2, 8, -2, 2, 122, 2, 30, 2, 32, -2, 2, 0, 2, 38, -2,
			0, 4277137519, 0, 2269118463, -1, 3, 20, 2, -1, 2, 33, 2, 37, 2, 0, 3, 30,
			2, 2, 35, 2, 19, -3, 3, 0, 2, 2, 34, -1, 2, 0, 2, 35, 2, 0, 2, 35, 2, 0,
			2, 47, -10, 2, 0, 0, 203775, -1, 2, 164, 2, 20, 2, 43, 2, 36, 2, 18, 2,
			77, 2, 18, 2, 123, 2, 21, 3, 0, 2, 2, 37, 0, 2151677888, 2, 0, 2, 12, 0,
			4294901764, 2, 140, 2, 0, 2, 52, 2, 51, 0, 5242879, 3, 0, 2, 0, 402644511,
			-1, 2, 125, 2, 38, 0, 3, -1, 2, 126, 2, 39, 2, 0, 0, 67045375, 2, 40, 0,
			4226678271, 0, 3766565279, 0, 2039759, -4, 3, 0, 2, 0, 3288270847, 0, 3,
			3, 0, 2, 0, 67043519, -5, 2, 0, 0, 4282384383, 0, 1056964609, -1, 3, 0, 2,
			0, 67043345, -1, 2, 0, 2, 41, 2, 42, -1, 2, 11, 2, 55, 2, 37, -5, 2, 0, 2,
			12, -3, 3, 0, 2, 0, 2147484671, 2, 130, 0, 4190109695, 2, 49, -2, 2, 131,
			0, 4244635647, 0, 27, 2, 0, 2, 8, 2, 43, 2, 0, 2, 63, 2, 18, 2, 0, 2, 41,
			-8, 2, 53, 2, 44, 0, 67043329, 2, 45, 2, 46, 0, 8388351, -2, 2, 132, 0,
			3028287487, 2, 47, 2, 134, 0, 33259519, 2, 42, -9, 2, 21, 0, 4294836223,
			0, 3355443199, 0, 67043335, -2, 2, 64, -2, 3, 0, 28, 2, 32, -3, 3, 0, 3,
			2, 17, 3, 0, 6, 2, 78, -81, 2, 18, 3, 0, 2, 2, 36, 3, 0, 33, 2, 25, 2, 30,
			-125, 3, 0, 18, 2, 37, -269, 3, 0, 17, 2, 41, 2, 8, 2, 23, 2, 0, 2, 8, 2,
			23, 2, 48, 2, 0, 2, 21, 2, 49, 2, 135, 2, 25, -21, 3, 0, 2, -4, 3, 0, 2,
			0, 4294936575, 2, 0, 0, 4294934783, -2, 0, 196635, 3, 0, 191, 2, 50, 3, 0,
			38, 2, 30, -1, 2, 34, -278, 2, 136, 3, 0, 9, 2, 137, 2, 138, 2, 51, 3, 0,
			11, 2, 7, -72, 3, 0, 3, 2, 139, 0, 1677656575, -147, 2, 0, 2, 24, 2, 37,
			-16, 0, 4161266656, 0, 4071, 2, 201, -4, 0, 28, -13, 3, 0, 2, 2, 52, 2, 0,
			2, 141, 2, 142, 2, 56, 2, 0, 2, 143, 2, 144, 2, 145, 3, 0, 10, 2, 146, 2,
			147, 2, 22, 3, 52, 2, 3, 148, 2, 3, 53, 2, 0, 4294954999, 2, 0, -16, 2, 0,
			2, 89, 2, 0, 0, 2105343, 0, 4160749584, 2, 174, -34, 2, 8, 2, 150, -6, 0,
			4194303871, 0, 4294903771, 2, 0, 2, 54, 2, 97, -3, 2, 0, 0, 1073684479, 0,
			17407, -9, 2, 18, 2, 17, 2, 0, 2, 32, -14, 2, 18, 2, 32, -23, 2, 151, 3,
			0, 6, 0, 8323103, -1, 3, 0, 2, 2, 55, -37, 2, 56, 2, 152, 2, 153, 2, 154,
			2, 155, 2, 156, -105, 2, 26, -32, 3, 0, 1335, -1, 3, 0, 129, 2, 32, 3, 0,
			6, 2, 10, 3, 0, 180, 2, 157, 3, 0, 233, 2, 158, 3, 0, 18, 2, 10, -77, 3,
			0, 16, 2, 10, -47, 3, 0, 154, 2, 6, 3, 0, 130, 2, 25, -22250, 3, 0, 7, 2,
			25, -6130, 3, 5, 2, -1, 0, 69207040, 3, 44, 2, 3, 0, 14, 2, 57, 2, 58, -3,
			0, 3168731136, 0, 4294956864, 2, 1, 2, 0, 2, 59, 3, 0, 4, 0, 4294966275,
			3, 0, 4, 2, 16, 2, 60, 2, 0, 2, 34, -1, 2, 18, 2, 61, -1, 2, 0, 0, 2047,
			0, 4294885376, 3, 0, 2, 0, 3145727, 0, 2617294944, 0, 4294770688, 2, 25,
			2, 62, 3, 0, 2, 0, 131135, 2, 95, 0, 70256639, 0, 71303167, 0, 272, 2, 41,
			2, 6, 0, 32511, 2, 0, 2, 42, -1, 2, 96, 2, 63, 0, 4278255616, 0,
			4294836227, 0, 4294549473, 0, 600178175, 0, 2952806400, 0, 268632067, 0,
			4294543328, 0, 57540095, 0, 1577058304, 0, 1835008, 0, 4294688736, 2, 65,
			2, 64, 0, 33554435, 2, 127, 2, 65, 2, 160, 0, 131075, 0, 3594373096, 0,
			67094296, 2, 64, -1, 0, 4294828e3, 0, 603979263, 0, 654311424, 0, 3, 0,
			4294828001, 0, 602930687, 2, 167, 0, 393219, 0, 4294828016, 0, 671088639,
			0, 2154840064, 0, 4227858435, 0, 4236247008, 2, 66, 2, 37, -1, 2, 4, 0,
			917503, 2, 37, -1, 2, 67, 0, 537788335, 0, 4026531935, -1, 0, 1, -1, 2,
			33, 2, 68, 0, 7936, -3, 2, 0, 0, 2147485695, 0, 1010761728, 0, 4292984930,
			0, 16387, 2, 0, 2, 15, 2, 22, 3, 0, 10, 2, 69, 2, 0, 2, 70, 2, 71, 2, 72,
			2, 0, 2, 73, 2, 0, 2, 12, -1, 2, 25, 3, 0, 2, 2, 13, 2, 4, 3, 0, 18, 2,
			74, 2, 5, 3, 0, 2, 2, 75, 0, 2147745791, 3, 19, 2, 0, 122879, 2, 0, 2, 9,
			0, 276824064, -2, 3, 0, 2, 2, 41, 2, 0, 0, 4294903295, 2, 0, 2, 30, 2, 8,
			-1, 2, 18, 2, 48, 2, 0, 2, 76, 2, 42, -1, 2, 21, 2, 0, 2, 29, -2, 0, 128,
			-2, 2, 28, 2, 9, 0, 8160, -1, 2, 124, 0, 4227907585, 2, 0, 2, 77, 2, 0, 2,
			78, 2, 180, 2, 10, 2, 39, 2, 11, -1, 0, 74440192, 3, 0, 6, -2, 3, 0, 8, 2,
			13, 2, 0, 2, 79, 2, 10, 2, 0, 2, 80, 2, 81, 2, 82, -3, 2, 83, 2, 14, -3,
			2, 84, 2, 85, 2, 86, 2, 0, 2, 34, -83, 3, 0, 7, 0, 817183, 2, 0, 2, 15, 2,
			0, 0, 33023, 2, 21, 3, 87, 2, -17, 2, 88, 0, 524157950, 2, 4, 2, 0, 2, 89,
			2, 4, 2, 0, 2, 22, 2, 28, 2, 16, 3, 0, 2, 2, 17, 2, 0, -1, 2, 18, -16, 3,
			0, 206, -2, 3, 0, 692, 2, 68, -1, 2, 18, 2, 10, 3, 0, 8, 2, 90, 0, 3072,
			2, 0, 0, 2147516415, 2, 10, 3, 0, 2, 2, 25, 2, 91, 2, 92, 3, 0, 2, 2, 93,
			2, 0, 2, 94, 2, 45, 0, 4294965179, 0, 7, 2, 0, 2, 9, 2, 92, 2, 9, -1, 0,
			1761345536, 2, 95, 0, 4294901823, 2, 37, 2, 20, 2, 96, 2, 35, 2, 97, 0,
			2080440287, 2, 0, 2, 34, 2, 149, 0, 3296722943, 2, 0, 0, 1046675455, 0,
			939524101, 0, 1837055, 2, 98, 2, 99, 2, 22, 2, 23, 3, 0, 3, 0, 7, 3, 0,
			349, 2, 100, 2, 101, 2, 7, -264, 3, 0, 11, 2, 24, 3, 0, 2, 2, 32, -1, 0,
			2700607615, 2, 102, 2, 103, 3, 0, 2, 2, 19, 2, 104, 3, 0, 10, 2, 10, 2,
			18, 2, 0, 2, 46, 2, 0, 2, 31, 2, 105, -3, 2, 106, 3, 0, 3, 2, 20, -1, 3,
			5, 2, 2, 107, 2, 0, 2, 8, 2, 108, -1, 2, 109, 2, 110, 2, 111, -1, 3, 0, 3,
			2, 12, -2, 2, 0, 2, 29, -8, 2, 20, 2, 0, 2, 36, -1, 2, 0, 2, 62, 2, 6, 2,
			30, 2, 10, 2, 0, 2, 112, -1, 3, 0, 4, 2, 10, 2, 18, 2, 113, 2, 7, 2, 0, 2,
			114, 2, 0, 2, 115, 2, 116, 2, 117, -2, 3, 0, 9, 2, 21, 2, 30, 2, 31, 2,
			118, 2, 119, -2, 2, 120, 2, 121, 2, 30, 2, 21, 2, 8, -2, 2, 122, 2, 30, 2,
			32, -2, 2, 0, 2, 38, -2, 0, 4277075969, 2, 30, -1, 3, 20, 2, -1, 2, 33, 2,
			123, 2, 0, 3, 30, 2, 2, 35, 2, 19, -3, 3, 0, 2, 2, 34, -1, 2, 0, 2, 35, 2,
			0, 2, 35, 2, 0, 2, 78, -10, 2, 0, 0, 197631, -2, 2, 20, 2, 43, 2, 77, 2,
			18, 0, 3, 2, 18, 2, 123, 2, 21, 2, 124, 2, 50, -1, 0, 2490368, 2, 124, 2,
			25, 2, 18, 2, 34, 2, 124, 2, 37, 0, 4294901904, 0, 4718591, 2, 124, 2, 35,
			0, 335544350, -1, 2, 125, 0, 2147487743, 0, 1, -1, 2, 126, 2, 39, 2, 8,
			-1, 2, 127, 2, 65, 0, 3758161920, 0, 3, -4, 2, 0, 2, 29, 0, 2147485568, 0,
			3, 2, 0, 2, 25, 0, 176, -5, 2, 0, 2, 17, 2, 188, -1, 2, 0, 2, 25, 2, 205,
			-1, 2, 0, 0, 16779263, -2, 2, 12, -1, 2, 37, -5, 2, 0, 2, 128, -3, 3, 0,
			2, 2, 129, 2, 130, 0, 2147549183, 0, 2, -2, 2, 131, 2, 36, 0, 10, 0,
			4294965249, 0, 67633151, 0, 4026597376, 2, 0, 0, 536871935, 2, 18, 2, 0,
			2, 41, -8, 2, 53, 2, 17, 0, 1, 2, 45, 2, 25, -3, 2, 132, 2, 36, 2, 133, 2,
			134, 0, 16778239, -10, 2, 35, 0, 4294836212, 2, 9, -3, 2, 64, -2, 3, 0,
			28, 2, 32, -3, 3, 0, 3, 2, 17, 3, 0, 6, 2, 78, -81, 2, 18, 3, 0, 2, 2, 36,
			3, 0, 33, 2, 25, 0, 126, -125, 3, 0, 18, 2, 37, -269, 3, 0, 17, 2, 41, 2,
			8, 2, 18, 2, 0, 2, 8, 2, 18, 2, 54, 2, 0, 2, 25, 2, 78, 2, 135, 2, 25,
			-21, 3, 0, 2, -4, 3, 0, 2, 0, 67583, -1, 2, 104, -2, 0, 11, 3, 0, 191, 2,
			50, 3, 0, 38, 2, 30, -1, 2, 34, -278, 2, 136, 3, 0, 9, 2, 137, 2, 138, 2,
			51, 3, 0, 11, 2, 7, -72, 3, 0, 3, 2, 139, 2, 140, -187, 3, 0, 2, 2, 52, 2,
			0, 2, 141, 2, 142, 2, 56, 2, 0, 2, 143, 2, 144, 2, 145, 3, 0, 10, 2, 146,
			2, 147, 2, 22, 3, 52, 2, 3, 148, 2, 3, 53, 2, 2, 149, -57, 2, 8, 2, 150,
			-7, 2, 18, 2, 0, 2, 54, -4, 2, 0, 0, 1065361407, 0, 16384, -9, 2, 18, 2,
			54, 2, 0, 2, 128, -14, 2, 18, 2, 128, -23, 2, 151, 3, 0, 6, 2, 123, -1, 3,
			0, 2, 0, 2063, -37, 2, 56, 2, 152, 2, 153, 2, 154, 2, 155, 2, 156, -138,
			3, 0, 1335, -1, 3, 0, 129, 2, 32, 3, 0, 6, 2, 10, 3, 0, 180, 2, 157, 3, 0,
			233, 2, 158, 3, 0, 18, 2, 10, -77, 3, 0, 16, 2, 10, -47, 3, 0, 154, 2, 6,
			3, 0, 130, 2, 25, -28386, 2, 0, 0, 1, -1, 2, 129, 2, 0, 0, 8193, -21, 2,
			198, 0, 10255, 0, 4, -11, 2, 64, 2, 179, -1, 0, 71680, -1, 2, 171, 0,
			4292900864, 0, 268435519, -5, 2, 159, -1, 2, 169, -1, 0, 6144, -2, 2, 45,
			-1, 2, 163, -1, 0, 2147532800, 2, 160, 2, 166, 0, 16744448, -2, 0, 4, -4,
			2, 194, 0, 205128192, 0, 1333757536, 0, 2147483696, 0, 423953, 0,
			747766272, 0, 2717763192, 0, 4286578751, 0, 278545, 2, 161, 0, 4294886464,
			0, 33292336, 0, 417809, 2, 161, 0, 1327482464, 0, 4278190128, 0,
			700594195, 0, 1006647527, 0, 4286497336, 0, 4160749631, 2, 162, 0,
			201327104, 0, 3634348576, 0, 8323120, 2, 162, 0, 202375680, 0, 2678047264,
			0, 4293984304, 2, 162, -1, 0, 983584, 0, 48, 0, 58720273, 0, 3489923072,
			0, 10517376, 0, 4293066815, 0, 1, 0, 2013265920, 2, 182, 2, 0, 0, 2089, 0,
			3221225552, 0, 201359520, 2, 0, -2, 0, 256, 0, 122880, 0, 16777216, 2,
			159, 0, 4160757760, 2, 0, -6, 2, 176, -11, 0, 3263218176, -1, 0, 49664, 0,
			2160197632, 0, 8388802, -1, 0, 12713984, -1, 2, 163, 2, 164, 2, 183, -2,
			2, 172, -20, 0, 3758096385, -2, 2, 165, 2, 191, 2, 91, 2, 177, 0,
			4294057984, -2, 2, 173, 2, 168, 0, 4227874816, -2, 2, 165, -1, 2, 166, -1,
			2, 178, 2, 129, 0, 4026593280, 0, 14, 0, 4292919296, -1, 2, 175, 0,
			939588608, -1, 0, 805306368, -1, 2, 129, 2, 167, 2, 168, 2, 169, 2, 207,
			2, 0, -2, 2, 170, 2, 129, -3, 0, 267386880, -1, 0, 117440512, 0, 7168, -1,
			2, 210, 2, 163, 2, 171, 2, 184, -16, 2, 172, -1, 0, 1426112704, 2, 173,
			-1, 2, 192, 0, 271581216, 0, 2149777408, 2, 25, 2, 171, 2, 129, 0, 851967,
			2, 185, -1, 2, 174, 2, 186, -4, 2, 175, -20, 2, 197, 2, 204, -56, 0,
			3145728, 2, 187, -10, 0, 32505856, -1, 2, 176, -1, 0, 2147385088, 2, 91,
			1, 2155905152, 2, -3, 2, 173, 2, 0, 0, 67108864, -2, 2, 177, -6, 2, 178,
			2, 25, 0, 1, -1, 0, 1, -1, 2, 179, -3, 2, 123, 2, 64, -2, 2, 97, -2, 0,
			32752, 2, 129, -915, 2, 170, -1, 2, 203, -10, 2, 190, -5, 2, 181, -6, 0,
			4229232640, 2, 19, -1, 2, 180, -1, 2, 181, -2, 0, 4227874752, -3, 0,
			2146435072, 2, 164, -2, 0, 1006649344, 2, 129, -1, 2, 91, 0, 201375744,
			-3, 0, 134217720, 2, 91, 0, 4286677377, 0, 32896, -1, 2, 175, -3, 0,
			4227907584, -349, 0, 65520, 0, 1920, 2, 182, 3, 0, 264, -11, 2, 169, -2,
			2, 183, 2, 0, 0, 520617856, 0, 2692743168, 0, 36, -3, 0, 524280, -13, 2,
			189, -1, 0, 4294934272, 2, 25, 2, 183, -1, 2, 213, 0, 2158720, -3, 2, 164,
			0, 1, -4, 2, 129, 0, 3808625411, 0, 3489628288, 0, 4096, 0, 1207959680, 0,
			3221274624, 2, 0, -3, 2, 184, 0, 120, 0, 7340032, -2, 2, 185, 2, 4, 2, 25,
			2, 173, 3, 0, 4, 2, 164, -1, 2, 186, 2, 182, -1, 0, 8176, 2, 166, 2, 184,
			2, 211, -1, 0, 4290773232, 2, 0, -4, 2, 173, 2, 193, 0, 15728640, 2, 182,
			-1, 2, 171, -1, 0, 134250480, 0, 4720640, 0, 3825467396, 3, 0, 2, -9, 2,
			91, 2, 178, 0, 4294967040, 2, 133, 0, 4160880640, 3, 0, 2, 0, 704, 0,
			1849688064, 2, 187, -1, 2, 129, 0, 4294901887, 2, 0, 0, 130547712, 0,
			1879048192, 2, 208, 3, 0, 2, -1, 2, 188, 2, 189, -1, 0, 17829776, 0,
			2025848832, 2, 212, -2, 2, 0, -1, 0, 4286580608, -1, 0, 29360128, 2, 196,
			0, 16252928, 0, 3791388672, 2, 39, 3, 0, 2, -2, 2, 202, 2, 0, -1, 2, 104,
			-1, 0, 66584576, -1, 2, 195, 3, 0, 9, 2, 129, -1, 0, 4294755328, 2, 0, 2,
			20, -1, 2, 171, 2, 183, 2, 25, 2, 95, 2, 25, 2, 190, 2, 91, -2, 0, 245760,
			2, 191, -1, 2, 159, 2, 199, 0, 4227923456, -1, 2, 192, 2, 171, 2, 91, -3,
			0, 4292870145, 0, 262144, -1, 2, 92, 2, 0, 0, 1073758848, 2, 193, -1, 0,
			4227921920, 2, 194, 0, 68289024, 0, 528402016, 0, 4292927536, 3, 0, 4, -2,
			0, 268435456, 2, 92, -2, 2, 195, 3, 0, 5, -1, 2, 196, 2, 173, 2, 0, -2, 0,
			4227923936, 2, 62, -1, 2, 183, 2, 95, 2, 0, 2, 163, 2, 175, 2, 197, 3, 0,
			5, -1, 2, 182, 3, 0, 3, -2, 0, 2146959360, 0, 9440640, 0, 104857600, 0,
			4227923840, 3, 0, 2, 0, 768, 2, 198, 2, 28, -2, 2, 171, -2, 2, 199, -1, 2,
			165, 2, 95, 3, 0, 7, 0, 512, 0, 8388608, 2, 200, 2, 170, 2, 189, 0,
			4286578944, 3, 0, 2, 0, 1152, 0, 1266679808, 2, 195, 0, 576, 0,
			4261707776, 2, 95, 3, 0, 9, 2, 165, 0, 131072, 0, 939524096, 2, 183, 3, 0,
			2, 2, 16, -1, 0, 2147221504, -28, 2, 183, 3, 0, 3, -3, 0, 4292902912, -6,
			2, 96, 3, 0, 81, 2, 25, -2, 2, 104, -33, 2, 18, 2, 178, 3, 0, 125, -18, 2,
			197, 3, 0, 269, -17, 2, 165, 2, 129, 2, 201, -1, 2, 129, 2, 193, 0,
			4290822144, -2, 0, 67174336, 0, 520093700, 2, 18, 3, 0, 21, -2, 2, 184, 3,
			0, 3, -2, 0, 30720, -1, 0, 32512, 3, 0, 2, 0, 4294770656, -191, 2, 181,
			-38, 2, 178, 2, 0, 2, 202, 3, 0, 278, 0, 2417033215, -9, 0, 4294705144, 0,
			4292411391, 0, 65295, -11, 2, 182, 3, 0, 72, -3, 0, 3758159872, 0,
			201391616, 3, 0, 147, -1, 2, 169, 2, 203, -3, 2, 96, 2, 0, -7, 2, 178, -1,
			0, 384, -1, 0, 133693440, -3, 2, 204, -2, 2, 107, 3, 0, 3, 3, 177, 2, -2,
			2, 91, 2, 165, 3, 0, 4, -2, 2, 192, -1, 2, 159, 0, 335552923, 2, 205, -1,
			0, 538974272, 0, 2214592512, 0, 132e3, -10, 0, 192, -8, 2, 206, -21, 0,
			134213632, 2, 158, 3, 0, 34, 2, 129, 0, 4294965279, 3, 0, 6, 0, 100663424,
			0, 63524, -1, 2, 209, 2, 148, 3, 0, 3, -1, 0, 3221282816, 0, 4294917120,
			3, 0, 9, 2, 25, 2, 207, -1, 2, 208, 3, 0, 14, 2, 25, 2, 183, 3, 0, 23, 0,
			2147520640, -6, 0, 4286578784, 2, 0, -2, 0, 1006694400, 3, 0, 24, 2, 36,
			-1, 0, 4292870144, 3, 0, 2, 0, 1, 2, 173, 3, 0, 6, 2, 205, 0, 4110942569,
			0, 1432950139, 0, 2701658217, 0, 4026532864, 0, 4026532881, 2, 0, 2, 46,
			3, 0, 8, -1, 2, 175, -2, 2, 177, 0, 98304, 0, 65537, 2, 178, -5, 2, 209,
			2, 0, 2, 77, 2, 199, 2, 182, 0, 4294770176, 2, 107, 3, 0, 4, -30, 2, 188,
			0, 3758153728, -3, 0, 125829120, -2, 2, 183, 0, 4294897664, 2, 175, -1, 2,
			195, -1, 2, 171, 0, 4294754304, 3, 0, 2, -10, 2, 177, 0, 3758145536, 2,
			210, 2, 211, 0, 4026548160, 2, 212, -4, 2, 213, -1, 2, 204, 0, 4227923967,
			3, 0, 32, -1335, 2, 0, -129, 2, 183, -6, 2, 173, -180, 0, 65532, -233, 2,
			174, -18, 2, 173, 3, 0, 77, -16, 2, 173, 3, 0, 47, -154, 2, 166, -130, 2,
			18, 3, 0, 22250, -7, 2, 18, 3, 0, 6128,
		],
		[
			4294967295, 4294967291, 4092460543, 4294828031, 4294967294, 134217726,
			4294903807, 268435455, 2147483647, 1048575, 1073741823, 3892314111,
			134217727, 1061158911, 536805376, 4294910143, 4294901759, 32767,
			4294901760, 262143, 536870911, 8388607, 4160749567, 4294902783,
			4294918143, 65535, 67043328, 2281701374, 4294967264, 2097151, 4194303,
			255, 67108863, 4294967039, 511, 524287, 131071, 127, 3238002687,
			4294902271, 4294549487, 33554431, 1023, 4294901888, 4286578687,
			4294705152, 4294770687, 67043583, 2047999, 67043343, 16777215, 4294902e3,
			4292870143, 4294966783, 16383, 67047423, 4294967279, 262083, 20511,
			4290772991, 41943039, 493567, 4294959104, 603979775, 65536, 602799615,
			805044223, 4294965206, 8191, 1031749119, 4294917631, 2134769663,
			4286578493, 4282253311, 4294942719, 33540095, 4294905855, 63, 15,
			2868854591, 1608515583, 265232348, 534519807, 2147614720, 1060109444,
			4093640016, 17376, 2139062143, 224, 4169138175, 4294909951, 4286578688,
			4294967292, 4294965759, 65734655, 4294966272, 4294967280, 32768, 8289918,
			4294934399, 4294901775, 4294965375, 1602223615, 4294967259, 4294443008,
			268369920, 4292804608, 4294967232, 486341884, 4294963199, 3087007615,
			1073692671, 4128527, 4279238655, 4294902015, 4160684047, 4290246655,
			469499899, 4294967231, 134086655, 4294966591, 2445279231, 3670015, 31,
			4294967288, 4294705151, 3221208447, 4294549472, 4095, 2147483648,
			4285526655, 4294966527, 4294966143, 64, 4294966719, 3774873592,
			1877934080, 262151, 2555904, 536807423, 67043839, 3758096383, 3959414372,
			3755993023, 2080374783, 4294835295, 4294967103, 4160749565, 4294934527,
			4087, 2016, 2147446655, 184024726, 2862017156, 1593309078, 268434431,
			268434414, 4294901763, 4294901761, 536870912, 2952790016, 202506752,
			139264, 402653184, 3758096384, 4261412864, 63488, 1610612736, 4227922944,
			49152, 57344, 65280, 3233808384, 3221225472, 65534, 61440, 57152,
			4293918720, 4290772992, 25165824, 4227915776, 4278190080, 4026531840,
			4227858432, 4160749568, 3758129152, 4294836224, 4194304, 251658240,
			196608, 4294963200, 2143289344, 2097152, 64512, 417808, 4227923712,
			12582912, 4294967168, 50331648, 65528, 65472, 15360, 4294966784, 65408,
			4294965248, 16, 12288, 4294934528, 2080374784, 4294950912, 65024,
			1073741824, 4261477888, 524288,
		]
	);
	function N(e) {
		return e.column++, (e.currentChar = e.source.charCodeAt(++e.index));
	}
	function G2(e, t) {
		if ((t & 64512) !== 55296) return 0;
		let u = e.source.charCodeAt(e.index + 1);
		return (u & 64512) !== 56320
			? 0
			: ((t = e.currentChar = 65536 + ((t & 1023) << 10) + (u & 1023)),
				(At[(t >>> 5) + 0] >>> t) & 31 & 1 || E(e, 18, be(t)),
				e.index++,
				e.column++,
				1);
	}
	function qu(e, t) {
		(e.currentChar = e.source.charCodeAt(++e.index)),
			(e.flags |= 1),
			t & 4 || ((e.column = 0), e.line++);
	}
	function Ue(e) {
		(e.flags |= 1),
			(e.currentChar = e.source.charCodeAt(++e.index)),
			(e.column = 0),
			e.line++;
	}
	function z2(e) {
		return (
			e === 160 ||
			e === 65279 ||
			e === 133 ||
			e === 5760 ||
			(e >= 8192 && e <= 8203) ||
			e === 8239 ||
			e === 8287 ||
			e === 12288 ||
			e === 8201 ||
			e === 65519
		);
	}
	function be(e) {
		return e <= 65535
			? String.fromCharCode(e)
			: String.fromCharCode(e >>> 10) + String.fromCharCode(e & 1023);
	}
	function ae(e) {
		return e < 65 ? e - 48 : (e - 65 + 10) & 15;
	}
	function J2(e) {
		switch (e) {
			case 134283266:
				return "NumericLiteral";
			case 134283267:
				return "StringLiteral";
			case 86021:
			case 86022:
				return "BooleanLiteral";
			case 86023:
				return "NullLiteral";
			case 65540:
				return "RegularExpression";
			case 67174408:
			case 67174409:
			case 132:
				return "TemplateLiteral";
			default:
				return (e & 143360) === 143360
					? "Identifier"
					: (e & 4096) === 4096
						? "Keyword"
						: "Punctuator";
		}
	}
	var H = [
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1032, 0, 0, 2056, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8192, 0, 3, 0, 0, 8192, 0, 0, 0, 256, 0,
			33024, 0, 0, 242, 242, 114, 114, 114, 114, 114, 114, 594, 594, 0, 0,
			16384, 0, 0, 0, 0, 67, 67, 67, 67, 67, 67, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
			3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 1, 0, 0, 4099, 0, 71, 71, 71, 71, 71, 71,
			7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 16384, 0, 0,
			0, 0,
		],
		$2 = [
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
			1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1,
			1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0,
			0, 0, 0,
		],
		Wn = [
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
			1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
			1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1,
			1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0,
			0, 0, 0,
		];
	function vu(e) {
		return e <= 127 ? $2[e] : (At[(e >>> 5) + 34816] >>> e) & 31 & 1;
	}
	function zt(e) {
		return e <= 127
			? Wn[e]
			: (At[(e >>> 5) + 0] >>> e) & 31 & 1 || e === 8204 || e === 8205;
	}
	var Xn = [
		"SingleLine",
		"MultiLine",
		"HTMLOpen",
		"HTMLClose",
		"HashbangComment",
	];
	function Z2(e) {
		let t = e.source;
		e.currentChar === 35 &&
			t.charCodeAt(e.index + 1) === 33 &&
			(N(e), N(e), Yu(e, t, 0, 4, e.tokenPos, e.linePos, e.colPos));
	}
	function Fn(e, t, u, i, n, s, o, r) {
		return i & 2048 && E(e, 0), Yu(e, t, u, n, s, o, r);
	}
	function Yu(e, t, u, i, n, s, o) {
		let { index: r } = e;
		for (
			e.tokenPos = e.index, e.linePos = e.line, e.colPos = e.column;
			e.index < e.end;

		) {
			if (H[e.currentChar] & 8) {
				let c = e.currentChar === 13;
				Ue(e),
					c &&
						e.index < e.end &&
						e.currentChar === 10 &&
						(e.currentChar = t.charCodeAt(++e.index));
				break;
			} else if ((e.currentChar ^ 8232) <= 1) {
				Ue(e);
				break;
			}
			N(e), (e.tokenPos = e.index), (e.linePos = e.line), (e.colPos = e.column);
		}
		if (e.onComment) {
			let c = {
				start: { line: s, column: o },
				end: { line: e.linePos, column: e.colPos },
			};
			e.onComment(Xn[i & 255], t.slice(r, e.tokenPos), n, e.tokenPos, c);
		}
		return u | 1;
	}
	function eo(e, t, u) {
		let { index: i } = e;
		for (; e.index < e.end; )
			if (e.currentChar < 43) {
				let n = !1;
				for (; e.currentChar === 42; )
					if ((n || ((u &= -5), (n = !0)), N(e) === 47)) {
						if ((N(e), e.onComment)) {
							let s = {
								start: { line: e.linePos, column: e.colPos },
								end: { line: e.line, column: e.column },
							};
							e.onComment(Xn[1], t.slice(i, e.index - 2), i - 2, e.index, s);
						}
						return (
							(e.tokenPos = e.index),
							(e.linePos = e.line),
							(e.colPos = e.column),
							u
						);
					}
				if (n) continue;
				H[e.currentChar] & 8
					? e.currentChar === 13
						? ((u |= 5), Ue(e))
						: (qu(e, u), (u = (u & -5) | 1))
					: N(e);
			} else
				(e.currentChar ^ 8232) <= 1
					? ((u = (u & -5) | 1), Ue(e))
					: ((u &= -5), N(e));
		E(e, 16);
	}
	function to(e, t) {
		let u = e.index,
			i = 0;
		e: for (;;) {
			let T = e.currentChar;
			if ((N(e), i & 1)) i &= -2;
			else
				switch (T) {
					case 47:
						if (i) break;
						break e;
					case 92:
						i |= 1;
						break;
					case 91:
						i |= 2;
						break;
					case 93:
						i &= 1;
						break;
					case 13:
					case 10:
					case 8232:
					case 8233:
						E(e, 32);
				}
			if (e.index >= e.source.length) return E(e, 32);
		}
		let n = e.index - 1,
			s = 0,
			o = e.currentChar,
			{ index: r } = e;
		for (; zt(o); ) {
			switch (o) {
				case 103:
					s & 2 && E(e, 34, "g"), (s |= 2);
					break;
				case 105:
					s & 1 && E(e, 34, "i"), (s |= 1);
					break;
				case 109:
					s & 4 && E(e, 34, "m"), (s |= 4);
					break;
				case 117:
					s & 16 && E(e, 34, "u"), (s |= 16);
					break;
				case 121:
					s & 8 && E(e, 34, "y"), (s |= 8);
					break;
				case 115:
					s & 32 && E(e, 34, "s"), (s |= 32);
					break;
				case 100:
					s & 64 && E(e, 34, "d"), (s |= 64);
					break;
				default:
					E(e, 33);
			}
			o = N(e);
		}
		let c = e.source.slice(r, e.index),
			h = e.source.slice(u, n);
		return (
			(e.tokenRegExp = { pattern: h, flags: c }),
			t & 512 && (e.tokenRaw = e.source.slice(e.tokenPos, e.index)),
			(e.tokenValue = uo(e, h, c)),
			65540
		);
	}
	function uo(e, t, u) {
		try {
			return new RegExp(t, u);
		} catch {
			try {
				return new RegExp(t, u.replace("d", "")), null;
			} catch {
				E(e, 32);
			}
		}
	}
	function io(e, t, u) {
		let { index: i } = e,
			n = "",
			s = N(e),
			o = e.index;
		for (; !(H[s] & 8); ) {
			if (s === u)
				return (
					(n += e.source.slice(o, e.index)),
					N(e),
					t & 512 && (e.tokenRaw = e.source.slice(i, e.index)),
					(e.tokenValue = n),
					134283267
				);
			if ((s & 8) === 8 && s === 92) {
				if (
					((n += e.source.slice(o, e.index)),
					(s = N(e)),
					s < 127 || s === 8232 || s === 8233)
				) {
					let r = Qn(e, t, s);
					r >= 0 ? (n += be(r)) : jn(e, r, 0);
				} else n += be(s);
				o = e.index + 1;
			}
			e.index >= e.end && E(e, 14), (s = N(e));
		}
		E(e, 14);
	}
	function Qn(e, t, u) {
		switch (u) {
			case 98:
				return 8;
			case 102:
				return 12;
			case 114:
				return 13;
			case 110:
				return 10;
			case 116:
				return 9;
			case 118:
				return 11;
			case 13:
				if (e.index < e.end) {
					let i = e.source.charCodeAt(e.index + 1);
					i === 10 && ((e.index = e.index + 1), (e.currentChar = i));
				}
			case 10:
			case 8232:
			case 8233:
				return (e.column = -1), e.line++, -1;
			case 48:
			case 49:
			case 50:
			case 51: {
				let i = u - 48,
					n = e.index + 1,
					s = e.column + 1;
				if (n < e.end) {
					let o = e.source.charCodeAt(n);
					if (H[o] & 32) {
						if (t & 1024) return -2;
						if (
							((e.currentChar = o),
							(i = (i << 3) | (o - 48)),
							n++,
							s++,
							n < e.end)
						) {
							let r = e.source.charCodeAt(n);
							H[r] & 32 &&
								((e.currentChar = r), (i = (i << 3) | (r - 48)), n++, s++);
						}
						(e.flags |= 64), (e.index = n - 1), (e.column = s - 1);
					} else if ((i !== 0 || H[o] & 512) && t & 1024) return -2;
				}
				return i;
			}
			case 52:
			case 53:
			case 54:
			case 55: {
				if (t & 1024) return -2;
				let i = u - 48,
					n = e.index + 1,
					s = e.column + 1;
				if (n < e.end) {
					let o = e.source.charCodeAt(n);
					H[o] & 32 &&
						((i = (i << 3) | (o - 48)),
						(e.currentChar = o),
						(e.index = n),
						(e.column = s));
				}
				return (e.flags |= 64), i;
			}
			case 120: {
				let i = N(e);
				if (!(H[i] & 64)) return -4;
				let n = ae(i),
					s = N(e);
				if (!(H[s] & 64)) return -4;
				let o = ae(s);
				return (n << 4) | o;
			}
			case 117: {
				let i = N(e);
				if (e.currentChar === 123) {
					let n = 0;
					for (; H[N(e)] & 64; )
						if (((n = (n << 4) | ae(e.currentChar)), n > 1114111)) return -5;
					return e.currentChar < 1 || e.currentChar !== 125 ? -4 : n;
				} else {
					if (!(H[i] & 64)) return -4;
					let n = e.source.charCodeAt(e.index + 1);
					if (!(H[n] & 64)) return -4;
					let s = e.source.charCodeAt(e.index + 2);
					if (!(H[s] & 64)) return -4;
					let o = e.source.charCodeAt(e.index + 3);
					return H[o] & 64
						? ((e.index += 3),
							(e.column += 3),
							(e.currentChar = e.source.charCodeAt(e.index)),
							(ae(i) << 12) | (ae(n) << 8) | (ae(s) << 4) | ae(o))
						: -4;
				}
			}
			case 56:
			case 57:
				if (!(t & 256)) return -3;
			default:
				return u;
		}
	}
	function jn(e, t, u) {
		switch (t) {
			case -1:
				return;
			case -2:
				E(e, u ? 2 : 1);
			case -3:
				E(e, 13);
			case -4:
				E(e, 6);
			case -5:
				E(e, 102);
		}
	}
	function Kn(e, t) {
		let { index: u } = e,
			i = 67174409,
			n = "",
			s = N(e);
		for (; s !== 96; ) {
			if (s === 36 && e.source.charCodeAt(e.index + 1) === 123) {
				N(e), (i = 67174408);
				break;
			} else if ((s & 8) === 8 && s === 92)
				if (((s = N(e)), s > 126)) n += be(s);
				else {
					let o = Qn(e, t | 1024, s);
					if (o >= 0) n += be(o);
					else if (o !== -1 && t & 65536) {
						(n = void 0), (s = no(e, s)), s < 0 && (i = 67174408);
						break;
					} else jn(e, o, 1);
				}
			else
				e.index < e.end &&
					s === 13 &&
					e.source.charCodeAt(e.index) === 10 &&
					((n += be(s)), (e.currentChar = e.source.charCodeAt(++e.index))),
					(((s & 83) < 3 && s === 10) || (s ^ 8232) <= 1) &&
						((e.column = -1), e.line++),
					(n += be(s));
			e.index >= e.end && E(e, 15), (s = N(e));
		}
		return (
			N(e),
			(e.tokenValue = n),
			(e.tokenRaw = e.source.slice(u + 1, e.index - (i === 67174409 ? 1 : 2))),
			i
		);
	}
	function no(e, t) {
		for (; t !== 96; ) {
			switch (t) {
				case 36: {
					let u = e.index + 1;
					if (u < e.end && e.source.charCodeAt(u) === 123)
						return (e.index = u), e.column++, -t;
					break;
				}
				case 10:
				case 8232:
				case 8233:
					(e.column = -1), e.line++;
			}
			e.index >= e.end && E(e, 15), (t = N(e));
		}
		return t;
	}
	function so(e, t) {
		return e.index >= e.end && E(e, 0), e.index--, e.column--, Kn(e, t);
	}
	function vn(e, t, u) {
		let i = e.currentChar,
			n = 0,
			s = 9,
			o = u & 64 ? 0 : 1,
			r = 0,
			c = 0;
		if (u & 64)
			(n = "." + Xt(e, i)), (i = e.currentChar), i === 110 && E(e, 11);
		else {
			if (i === 48)
				if (((i = N(e)), (i | 32) === 120)) {
					for (u = 136, i = N(e); H[i] & 4160; ) {
						if (i === 95) {
							c || E(e, 147), (c = 0), (i = N(e));
							continue;
						}
						(c = 1), (n = n * 16 + ae(i)), r++, (i = N(e));
					}
					(r === 0 || !c) && E(e, r === 0 ? 19 : 148);
				} else if ((i | 32) === 111) {
					for (u = 132, i = N(e); H[i] & 4128; ) {
						if (i === 95) {
							c || E(e, 147), (c = 0), (i = N(e));
							continue;
						}
						(c = 1), (n = n * 8 + (i - 48)), r++, (i = N(e));
					}
					(r === 0 || !c) && E(e, r === 0 ? 0 : 148);
				} else if ((i | 32) === 98) {
					for (u = 130, i = N(e); H[i] & 4224; ) {
						if (i === 95) {
							c || E(e, 147), (c = 0), (i = N(e));
							continue;
						}
						(c = 1), (n = n * 2 + (i - 48)), r++, (i = N(e));
					}
					(r === 0 || !c) && E(e, r === 0 ? 0 : 148);
				} else if (H[i] & 32)
					for (t & 1024 && E(e, 1), u = 1; H[i] & 16; ) {
						if (H[i] & 512) {
							(u = 32), (o = 0);
							break;
						}
						(n = n * 8 + (i - 48)), (i = N(e));
					}
				else
					H[i] & 512
						? (t & 1024 && E(e, 1), (e.flags |= 64), (u = 32))
						: i === 95 && E(e, 0);
			if (u & 48) {
				if (o) {
					for (; s >= 0 && H[i] & 4112; ) {
						if (i === 95) {
							(i = N(e)),
								(i === 95 || u & 32) && Je(e.index, e.line, e.index + 1, 147),
								(c = 1);
							continue;
						}
						(c = 0), (n = 10 * n + (i - 48)), (i = N(e)), --s;
					}
					if (
						(c && Je(e.index, e.line, e.index + 1, 148),
						s >= 0 && !vu(i) && i !== 46)
					)
						return (
							(e.tokenValue = n),
							t & 512 && (e.tokenRaw = e.source.slice(e.tokenPos, e.index)),
							134283266
						);
				}
				(n += Xt(e, i)),
					(i = e.currentChar),
					i === 46 &&
						(N(e) === 95 && E(e, 0),
						(u = 64),
						(n += "." + Xt(e, e.currentChar)),
						(i = e.currentChar));
			}
		}
		let h = e.index,
			T = 0;
		if (i === 110 && u & 128) (T = 1), (i = N(e));
		else if ((i | 32) === 101) {
			(i = N(e)), H[i] & 256 && (i = N(e));
			let { index: b } = e;
			H[i] & 16 || E(e, 10),
				(n += e.source.substring(h, b) + Xt(e, i)),
				(i = e.currentChar);
		}
		return (
			((e.index < e.end && H[i] & 16) || vu(i)) && E(e, 12),
			T
				? ((e.tokenRaw = e.source.slice(e.tokenPos, e.index)),
					(e.tokenValue = BigInt(n)),
					134283389)
				: ((e.tokenValue =
						u & 15
							? n
							: u & 32
								? parseFloat(e.source.substring(e.tokenPos, e.index))
								: +n),
					t & 512 && (e.tokenRaw = e.source.slice(e.tokenPos, e.index)),
					134283266)
		);
	}
	function Xt(e, t) {
		let u = 0,
			i = e.index,
			n = "";
		for (; H[t] & 4112; ) {
			if (t === 95) {
				let { index: s } = e;
				(t = N(e)),
					t === 95 && Je(e.index, e.line, e.index + 1, 147),
					(u = 1),
					(n += e.source.substring(i, s)),
					(i = e.index);
				continue;
			}
			(u = 0), (t = N(e));
		}
		return (
			u && Je(e.index, e.line, e.index + 1, 148),
			n + e.source.substring(i, e.index)
		);
	}
	var X = [
			"end of source",
			"identifier",
			"number",
			"string",
			"regular expression",
			"false",
			"true",
			"null",
			"template continuation",
			"template tail",
			"=>",
			"(",
			"{",
			".",
			"...",
			"}",
			")",
			";",
			",",
			"[",
			"]",
			":",
			"?",
			"'",
			'"',
			"</",
			"/>",
			"++",
			"--",
			"=",
			"<<=",
			">>=",
			">>>=",
			"**=",
			"+=",
			"-=",
			"*=",
			"/=",
			"%=",
			"^=",
			"|=",
			"&=",
			"||=",
			"&&=",
			"??=",
			"typeof",
			"delete",
			"void",
			"!",
			"~",
			"+",
			"-",
			"in",
			"instanceof",
			"*",
			"%",
			"/",
			"**",
			"&&",
			"||",
			"===",
			"!==",
			"==",
			"!=",
			"<=",
			">=",
			"<",
			">",
			"<<",
			">>",
			">>>",
			"&",
			"|",
			"^",
			"var",
			"let",
			"const",
			"break",
			"case",
			"catch",
			"class",
			"continue",
			"debugger",
			"default",
			"do",
			"else",
			"export",
			"extends",
			"finally",
			"for",
			"function",
			"if",
			"import",
			"new",
			"return",
			"super",
			"switch",
			"this",
			"throw",
			"try",
			"while",
			"with",
			"implements",
			"interface",
			"package",
			"private",
			"protected",
			"public",
			"static",
			"yield",
			"as",
			"async",
			"await",
			"constructor",
			"get",
			"set",
			"from",
			"of",
			"enum",
			"eval",
			"arguments",
			"escaped keyword",
			"escaped future reserved keyword",
			"reserved if strict",
			"#",
			"BigIntLiteral",
			"??",
			"?.",
			"WhiteSpace",
			"Illegal",
			"LineTerminator",
			"PrivateField",
			"Template",
			"@",
			"target",
			"meta",
			"LineFeed",
			"Escaped",
			"JSXText",
		],
		Gn = Object.create(null, {
			this: { value: 86113 },
			function: { value: 86106 },
			if: { value: 20571 },
			return: { value: 20574 },
			var: { value: 86090 },
			else: { value: 20565 },
			for: { value: 20569 },
			new: { value: 86109 },
			in: { value: 8738868 },
			typeof: { value: 16863277 },
			while: { value: 20580 },
			case: { value: 20558 },
			break: { value: 20557 },
			try: { value: 20579 },
			catch: { value: 20559 },
			delete: { value: 16863278 },
			throw: { value: 86114 },
			switch: { value: 86112 },
			continue: { value: 20561 },
			default: { value: 20563 },
			instanceof: { value: 8476725 },
			do: { value: 20564 },
			void: { value: 16863279 },
			finally: { value: 20568 },
			async: { value: 209007 },
			await: { value: 209008 },
			class: { value: 86096 },
			const: { value: 86092 },
			constructor: { value: 12401 },
			debugger: { value: 20562 },
			export: { value: 20566 },
			extends: { value: 20567 },
			false: { value: 86021 },
			from: { value: 12404 },
			get: { value: 12402 },
			implements: { value: 36966 },
			import: { value: 86108 },
			interface: { value: 36967 },
			let: { value: 241739 },
			null: { value: 86023 },
			of: { value: 274549 },
			package: { value: 36968 },
			private: { value: 36969 },
			protected: { value: 36970 },
			public: { value: 36971 },
			set: { value: 12403 },
			static: { value: 36972 },
			super: { value: 86111 },
			true: { value: 86022 },
			with: { value: 20581 },
			yield: { value: 241773 },
			enum: { value: 86134 },
			eval: { value: 537079927 },
			as: { value: 77934 },
			arguments: { value: 537079928 },
			target: { value: 143494 },
			meta: { value: 143495 },
		});
	function Un(e, t, u) {
		for (; Wn[N(e)]; );
		return (
			(e.tokenValue = e.source.slice(e.tokenPos, e.index)),
			e.currentChar !== 92 && e.currentChar <= 126
				? Gn[e.tokenValue] || 208897
				: Vu(e, t, 0, u)
		);
	}
	function ao(e, t) {
		let u = zn(e);
		return zt(u) || E(e, 4), (e.tokenValue = be(u)), Vu(e, t, 1, H[u] & 4);
	}
	function Vu(e, t, u, i) {
		let n = e.index;
		for (; e.index < e.end; )
			if (e.currentChar === 92) {
				(e.tokenValue += e.source.slice(n, e.index)), (u = 1);
				let o = zn(e);
				zt(o) || E(e, 4),
					(i = i && H[o] & 4),
					(e.tokenValue += be(o)),
					(n = e.index);
			} else if (zt(e.currentChar) || G2(e, e.currentChar)) N(e);
			else break;
		e.index <= e.end && (e.tokenValue += e.source.slice(n, e.index));
		let s = e.tokenValue.length;
		if (i && s >= 2 && s <= 11) {
			let o = Gn[e.tokenValue];
			return o === void 0
				? 208897
				: u
					? o === 209008
						? t & 4196352
							? 121
							: o
						: t & 1024
							? o === 36972 || (o & 36864) === 36864
								? 122
								: (o & 20480) === 20480
									? t & 268435456 && !(t & 8192)
										? o
										: 121
									: 143483
							: t & 268435456 && !(t & 8192) && (o & 20480) === 20480
								? o
								: o === 241773
									? t & 268435456
										? 143483
										: t & 2097152
											? 121
											: o
									: o === 209007
										? 143483
										: (o & 36864) === 36864
											? o
											: 121
					: o;
		}
		return 208897;
	}
	function oo(e) {
		return vu(N(e)) || E(e, 94), 131;
	}
	function zn(e) {
		return (
			e.source.charCodeAt(e.index + 1) !== 117 && E(e, 4),
			(e.currentChar = e.source.charCodeAt((e.index += 2))),
			ro(e)
		);
	}
	function ro(e) {
		let t = 0,
			u = e.currentChar;
		if (u === 123) {
			let o = e.index - 2;
			for (; H[N(e)] & 64; )
				(t = (t << 4) | ae(e.currentChar)),
					t > 1114111 && Je(o, e.line, e.index + 1, 102);
			return e.currentChar !== 125 && Je(o, e.line, e.index - 1, 6), N(e), t;
		}
		H[u] & 64 || E(e, 6);
		let i = e.source.charCodeAt(e.index + 1);
		H[i] & 64 || E(e, 6);
		let n = e.source.charCodeAt(e.index + 2);
		H[n] & 64 || E(e, 6);
		let s = e.source.charCodeAt(e.index + 3);
		return (
			H[s] & 64 || E(e, 6),
			(t = (ae(u) << 12) | (ae(i) << 8) | (ae(n) << 4) | ae(s)),
			(e.currentChar = e.source.charCodeAt((e.index += 4))),
			t
		);
	}
	var Jn = [
		129, 129, 129, 129, 129, 129, 129, 129, 129, 128, 136, 128, 128, 130, 129,
		129, 129, 129, 129, 129, 129, 129, 129, 129, 129, 129, 129, 129, 129, 129,
		129, 129, 128, 16842800, 134283267, 131, 208897, 8457015, 8455751,
		134283267, 67174411, 16, 8457014, 25233970, 18, 25233971, 67108877, 8457016,
		134283266, 134283266, 134283266, 134283266, 134283266, 134283266, 134283266,
		134283266, 134283266, 134283266, 21, 1074790417, 8456258, 1077936157,
		8456259, 22, 133, 208897, 208897, 208897, 208897, 208897, 208897, 208897,
		208897, 208897, 208897, 208897, 208897, 208897, 208897, 208897, 208897,
		208897, 208897, 208897, 208897, 208897, 208897, 208897, 208897, 208897,
		208897, 69271571, 137, 20, 8455497, 208897, 132, 4096, 4096, 4096, 4096,
		4096, 4096, 4096, 208897, 4096, 208897, 208897, 4096, 208897, 4096, 208897,
		4096, 208897, 4096, 4096, 4096, 208897, 4096, 4096, 208897, 4096, 4096,
		2162700, 8455240, 1074790415, 16842801, 129,
	];
	function L(e, t) {
		if (
			((e.flags = (e.flags | 1) ^ 1),
			(e.startPos = e.index),
			(e.startColumn = e.column),
			(e.startLine = e.line),
			(e.token = $n(e, t, 0)),
			e.onToken && e.token !== 1048576)
		) {
			let u = {
				start: { line: e.linePos, column: e.colPos },
				end: { line: e.line, column: e.column },
			};
			e.onToken(J2(e.token), e.tokenPos, e.index, u);
		}
	}
	function $n(e, t, u) {
		let i = e.index === 0,
			n = e.source,
			s = e.index,
			o = e.line,
			r = e.column;
		for (; e.index < e.end; ) {
			(e.tokenPos = e.index), (e.colPos = e.column), (e.linePos = e.line);
			let c = e.currentChar;
			if (c <= 126) {
				let h = Jn[c];
				switch (h) {
					case 67174411:
					case 16:
					case 2162700:
					case 1074790415:
					case 69271571:
					case 20:
					case 21:
					case 1074790417:
					case 18:
					case 16842801:
					case 133:
					case 129:
						return N(e), h;
					case 208897:
						return Un(e, t, 0);
					case 4096:
						return Un(e, t, 1);
					case 134283266:
						return vn(e, t, 144);
					case 134283267:
						return io(e, t, c);
					case 132:
						return Kn(e, t);
					case 137:
						return ao(e, t);
					case 131:
						return oo(e);
					case 128:
						N(e);
						break;
					case 130:
						(u |= 5), Ue(e);
						break;
					case 136:
						qu(e, u), (u = (u & -5) | 1);
						break;
					case 8456258:
						let T = N(e);
						if (e.index < e.end) {
							if (T === 60)
								return e.index < e.end && N(e) === 61
									? (N(e), 4194334)
									: 8456516;
							if (T === 61) return N(e), 8456256;
							if (T === 33) {
								let d = e.index + 1;
								if (
									d + 1 < e.end &&
									n.charCodeAt(d) === 45 &&
									n.charCodeAt(d + 1) == 45
								) {
									(e.column += 3),
										(e.currentChar = n.charCodeAt((e.index += 3))),
										(u = Fn(e, n, u, t, 2, e.tokenPos, e.linePos, e.colPos)),
										(s = e.tokenPos),
										(o = e.linePos),
										(r = e.colPos);
									continue;
								}
								return 8456258;
							}
							if (T === 47) {
								if (!(t & 16)) return 8456258;
								let d = e.index + 1;
								if (d < e.end && ((T = n.charCodeAt(d)), T === 42 || T === 47))
									break;
								return N(e), 25;
							}
						}
						return 8456258;
					case 1077936157: {
						N(e);
						let d = e.currentChar;
						return d === 61
							? N(e) === 61
								? (N(e), 8455996)
								: 8455998
							: d === 62
								? (N(e), 10)
								: 1077936157;
					}
					case 16842800:
						return N(e) !== 61
							? 16842800
							: N(e) !== 61
								? 8455999
								: (N(e), 8455997);
					case 8457015:
						return N(e) !== 61 ? 8457015 : (N(e), 4194342);
					case 8457014: {
						if ((N(e), e.index >= e.end)) return 8457014;
						let d = e.currentChar;
						return d === 61
							? (N(e), 4194340)
							: d !== 42
								? 8457014
								: N(e) !== 61
									? 8457273
									: (N(e), 4194337);
					}
					case 8455497:
						return N(e) !== 61 ? 8455497 : (N(e), 4194343);
					case 25233970: {
						N(e);
						let d = e.currentChar;
						return d === 43
							? (N(e), 33619995)
							: d === 61
								? (N(e), 4194338)
								: 25233970;
					}
					case 25233971: {
						N(e);
						let d = e.currentChar;
						if (d === 45) {
							if ((N(e), (u & 1 || i) && e.currentChar === 62)) {
								t & 256 || E(e, 109),
									N(e),
									(u = Fn(e, n, u, t, 3, s, o, r)),
									(s = e.tokenPos),
									(o = e.linePos),
									(r = e.colPos);
								continue;
							}
							return 33619996;
						}
						return d === 61 ? (N(e), 4194339) : 25233971;
					}
					case 8457016: {
						if ((N(e), e.index < e.end)) {
							let d = e.currentChar;
							if (d === 47) {
								N(e),
									(u = Yu(e, n, u, 0, e.tokenPos, e.linePos, e.colPos)),
									(s = e.tokenPos),
									(o = e.linePos),
									(r = e.colPos);
								continue;
							}
							if (d === 42) {
								N(e),
									(u = eo(e, n, u)),
									(s = e.tokenPos),
									(o = e.linePos),
									(r = e.colPos);
								continue;
							}
							if (t & 32768) return to(e, t);
							if (d === 61) return N(e), 4259877;
						}
						return 8457016;
					}
					case 67108877:
						let b = N(e);
						if (b >= 48 && b <= 57) return vn(e, t, 80);
						if (b === 46) {
							let d = e.index + 1;
							if (d < e.end && n.charCodeAt(d) === 46)
								return (
									(e.column += 2),
									(e.currentChar = n.charCodeAt((e.index += 2))),
									14
								);
						}
						return 67108877;
					case 8455240: {
						N(e);
						let d = e.currentChar;
						return d === 124
							? (N(e), e.currentChar === 61 ? (N(e), 4194346) : 8979003)
							: d === 61
								? (N(e), 4194344)
								: 8455240;
					}
					case 8456259: {
						N(e);
						let d = e.currentChar;
						if (d === 61) return N(e), 8456257;
						if (d !== 62) return 8456259;
						if ((N(e), e.index < e.end)) {
							let D = e.currentChar;
							if (D === 62) return N(e) === 61 ? (N(e), 4194336) : 8456518;
							if (D === 61) return N(e), 4194335;
						}
						return 8456517;
					}
					case 8455751: {
						N(e);
						let d = e.currentChar;
						return d === 38
							? (N(e), e.currentChar === 61 ? (N(e), 4194347) : 8979258)
							: d === 61
								? (N(e), 4194345)
								: 8455751;
					}
					case 22: {
						let d = N(e);
						if (d === 63)
							return N(e), e.currentChar === 61 ? (N(e), 4194348) : 276889982;
						if (d === 46) {
							let D = e.index + 1;
							if (D < e.end && ((d = n.charCodeAt(D)), !(d >= 48 && d <= 57)))
								return N(e), 67108991;
						}
						return 22;
					}
				}
			} else {
				if ((c ^ 8232) <= 1) {
					(u = (u & -5) | 1), Ue(e);
					continue;
				}
				if ((c & 64512) === 55296 || (At[(c >>> 5) + 34816] >>> c) & 31 & 1)
					return (
						(c & 64512) === 56320 &&
							((c = ((c & 1023) << 10) | (c & 1023) | 65536),
							(At[(c >>> 5) + 0] >>> c) & 31 & 1 || E(e, 18, be(c)),
							e.index++,
							(e.currentChar = c)),
						e.column++,
						(e.tokenValue = ""),
						Vu(e, t, 0, 0)
					);
				if (z2(c)) {
					N(e);
					continue;
				}
				E(e, 18, be(c));
			}
		}
		return 1048576;
	}
	var co = {
			AElig: "\xC6",
			AMP: "&",
			Aacute: "\xC1",
			Abreve: "\u0102",
			Acirc: "\xC2",
			Acy: "\u0410",
			Afr: "\u{1D504}",
			Agrave: "\xC0",
			Alpha: "\u0391",
			Amacr: "\u0100",
			And: "\u2A53",
			Aogon: "\u0104",
			Aopf: "\u{1D538}",
			ApplyFunction: "\u2061",
			Aring: "\xC5",
			Ascr: "\u{1D49C}",
			Assign: "\u2254",
			Atilde: "\xC3",
			Auml: "\xC4",
			Backslash: "\u2216",
			Barv: "\u2AE7",
			Barwed: "\u2306",
			Bcy: "\u0411",
			Because: "\u2235",
			Bernoullis: "\u212C",
			Beta: "\u0392",
			Bfr: "\u{1D505}",
			Bopf: "\u{1D539}",
			Breve: "\u02D8",
			Bscr: "\u212C",
			Bumpeq: "\u224E",
			CHcy: "\u0427",
			COPY: "\xA9",
			Cacute: "\u0106",
			Cap: "\u22D2",
			CapitalDifferentialD: "\u2145",
			Cayleys: "\u212D",
			Ccaron: "\u010C",
			Ccedil: "\xC7",
			Ccirc: "\u0108",
			Cconint: "\u2230",
			Cdot: "\u010A",
			Cedilla: "\xB8",
			CenterDot: "\xB7",
			Cfr: "\u212D",
			Chi: "\u03A7",
			CircleDot: "\u2299",
			CircleMinus: "\u2296",
			CirclePlus: "\u2295",
			CircleTimes: "\u2297",
			ClockwiseContourIntegral: "\u2232",
			CloseCurlyDoubleQuote: "\u201D",
			CloseCurlyQuote: "\u2019",
			Colon: "\u2237",
			Colone: "\u2A74",
			Congruent: "\u2261",
			Conint: "\u222F",
			ContourIntegral: "\u222E",
			Copf: "\u2102",
			Coproduct: "\u2210",
			CounterClockwiseContourIntegral: "\u2233",
			Cross: "\u2A2F",
			Cscr: "\u{1D49E}",
			Cup: "\u22D3",
			CupCap: "\u224D",
			DD: "\u2145",
			DDotrahd: "\u2911",
			DJcy: "\u0402",
			DScy: "\u0405",
			DZcy: "\u040F",
			Dagger: "\u2021",
			Darr: "\u21A1",
			Dashv: "\u2AE4",
			Dcaron: "\u010E",
			Dcy: "\u0414",
			Del: "\u2207",
			Delta: "\u0394",
			Dfr: "\u{1D507}",
			DiacriticalAcute: "\xB4",
			DiacriticalDot: "\u02D9",
			DiacriticalDoubleAcute: "\u02DD",
			DiacriticalGrave: "`",
			DiacriticalTilde: "\u02DC",
			Diamond: "\u22C4",
			DifferentialD: "\u2146",
			Dopf: "\u{1D53B}",
			Dot: "\xA8",
			DotDot: "\u20DC",
			DotEqual: "\u2250",
			DoubleContourIntegral: "\u222F",
			DoubleDot: "\xA8",
			DoubleDownArrow: "\u21D3",
			DoubleLeftArrow: "\u21D0",
			DoubleLeftRightArrow: "\u21D4",
			DoubleLeftTee: "\u2AE4",
			DoubleLongLeftArrow: "\u27F8",
			DoubleLongLeftRightArrow: "\u27FA",
			DoubleLongRightArrow: "\u27F9",
			DoubleRightArrow: "\u21D2",
			DoubleRightTee: "\u22A8",
			DoubleUpArrow: "\u21D1",
			DoubleUpDownArrow: "\u21D5",
			DoubleVerticalBar: "\u2225",
			DownArrow: "\u2193",
			DownArrowBar: "\u2913",
			DownArrowUpArrow: "\u21F5",
			DownBreve: "\u0311",
			DownLeftRightVector: "\u2950",
			DownLeftTeeVector: "\u295E",
			DownLeftVector: "\u21BD",
			DownLeftVectorBar: "\u2956",
			DownRightTeeVector: "\u295F",
			DownRightVector: "\u21C1",
			DownRightVectorBar: "\u2957",
			DownTee: "\u22A4",
			DownTeeArrow: "\u21A7",
			Downarrow: "\u21D3",
			Dscr: "\u{1D49F}",
			Dstrok: "\u0110",
			ENG: "\u014A",
			ETH: "\xD0",
			Eacute: "\xC9",
			Ecaron: "\u011A",
			Ecirc: "\xCA",
			Ecy: "\u042D",
			Edot: "\u0116",
			Efr: "\u{1D508}",
			Egrave: "\xC8",
			Element: "\u2208",
			Emacr: "\u0112",
			EmptySmallSquare: "\u25FB",
			EmptyVerySmallSquare: "\u25AB",
			Eogon: "\u0118",
			Eopf: "\u{1D53C}",
			Epsilon: "\u0395",
			Equal: "\u2A75",
			EqualTilde: "\u2242",
			Equilibrium: "\u21CC",
			Escr: "\u2130",
			Esim: "\u2A73",
			Eta: "\u0397",
			Euml: "\xCB",
			Exists: "\u2203",
			ExponentialE: "\u2147",
			Fcy: "\u0424",
			Ffr: "\u{1D509}",
			FilledSmallSquare: "\u25FC",
			FilledVerySmallSquare: "\u25AA",
			Fopf: "\u{1D53D}",
			ForAll: "\u2200",
			Fouriertrf: "\u2131",
			Fscr: "\u2131",
			GJcy: "\u0403",
			GT: ">",
			Gamma: "\u0393",
			Gammad: "\u03DC",
			Gbreve: "\u011E",
			Gcedil: "\u0122",
			Gcirc: "\u011C",
			Gcy: "\u0413",
			Gdot: "\u0120",
			Gfr: "\u{1D50A}",
			Gg: "\u22D9",
			Gopf: "\u{1D53E}",
			GreaterEqual: "\u2265",
			GreaterEqualLess: "\u22DB",
			GreaterFullEqual: "\u2267",
			GreaterGreater: "\u2AA2",
			GreaterLess: "\u2277",
			GreaterSlantEqual: "\u2A7E",
			GreaterTilde: "\u2273",
			Gscr: "\u{1D4A2}",
			Gt: "\u226B",
			HARDcy: "\u042A",
			Hacek: "\u02C7",
			Hat: "^",
			Hcirc: "\u0124",
			Hfr: "\u210C",
			HilbertSpace: "\u210B",
			Hopf: "\u210D",
			HorizontalLine: "\u2500",
			Hscr: "\u210B",
			Hstrok: "\u0126",
			HumpDownHump: "\u224E",
			HumpEqual: "\u224F",
			IEcy: "\u0415",
			IJlig: "\u0132",
			IOcy: "\u0401",
			Iacute: "\xCD",
			Icirc: "\xCE",
			Icy: "\u0418",
			Idot: "\u0130",
			Ifr: "\u2111",
			Igrave: "\xCC",
			Im: "\u2111",
			Imacr: "\u012A",
			ImaginaryI: "\u2148",
			Implies: "\u21D2",
			Int: "\u222C",
			Integral: "\u222B",
			Intersection: "\u22C2",
			InvisibleComma: "\u2063",
			InvisibleTimes: "\u2062",
			Iogon: "\u012E",
			Iopf: "\u{1D540}",
			Iota: "\u0399",
			Iscr: "\u2110",
			Itilde: "\u0128",
			Iukcy: "\u0406",
			Iuml: "\xCF",
			Jcirc: "\u0134",
			Jcy: "\u0419",
			Jfr: "\u{1D50D}",
			Jopf: "\u{1D541}",
			Jscr: "\u{1D4A5}",
			Jsercy: "\u0408",
			Jukcy: "\u0404",
			KHcy: "\u0425",
			KJcy: "\u040C",
			Kappa: "\u039A",
			Kcedil: "\u0136",
			Kcy: "\u041A",
			Kfr: "\u{1D50E}",
			Kopf: "\u{1D542}",
			Kscr: "\u{1D4A6}",
			LJcy: "\u0409",
			LT: "<",
			Lacute: "\u0139",
			Lambda: "\u039B",
			Lang: "\u27EA",
			Laplacetrf: "\u2112",
			Larr: "\u219E",
			Lcaron: "\u013D",
			Lcedil: "\u013B",
			Lcy: "\u041B",
			LeftAngleBracket: "\u27E8",
			LeftArrow: "\u2190",
			LeftArrowBar: "\u21E4",
			LeftArrowRightArrow: "\u21C6",
			LeftCeiling: "\u2308",
			LeftDoubleBracket: "\u27E6",
			LeftDownTeeVector: "\u2961",
			LeftDownVector: "\u21C3",
			LeftDownVectorBar: "\u2959",
			LeftFloor: "\u230A",
			LeftRightArrow: "\u2194",
			LeftRightVector: "\u294E",
			LeftTee: "\u22A3",
			LeftTeeArrow: "\u21A4",
			LeftTeeVector: "\u295A",
			LeftTriangle: "\u22B2",
			LeftTriangleBar: "\u29CF",
			LeftTriangleEqual: "\u22B4",
			LeftUpDownVector: "\u2951",
			LeftUpTeeVector: "\u2960",
			LeftUpVector: "\u21BF",
			LeftUpVectorBar: "\u2958",
			LeftVector: "\u21BC",
			LeftVectorBar: "\u2952",
			Leftarrow: "\u21D0",
			Leftrightarrow: "\u21D4",
			LessEqualGreater: "\u22DA",
			LessFullEqual: "\u2266",
			LessGreater: "\u2276",
			LessLess: "\u2AA1",
			LessSlantEqual: "\u2A7D",
			LessTilde: "\u2272",
			Lfr: "\u{1D50F}",
			Ll: "\u22D8",
			Lleftarrow: "\u21DA",
			Lmidot: "\u013F",
			LongLeftArrow: "\u27F5",
			LongLeftRightArrow: "\u27F7",
			LongRightArrow: "\u27F6",
			Longleftarrow: "\u27F8",
			Longleftrightarrow: "\u27FA",
			Longrightarrow: "\u27F9",
			Lopf: "\u{1D543}",
			LowerLeftArrow: "\u2199",
			LowerRightArrow: "\u2198",
			Lscr: "\u2112",
			Lsh: "\u21B0",
			Lstrok: "\u0141",
			Lt: "\u226A",
			Map: "\u2905",
			Mcy: "\u041C",
			MediumSpace: "\u205F",
			Mellintrf: "\u2133",
			Mfr: "\u{1D510}",
			MinusPlus: "\u2213",
			Mopf: "\u{1D544}",
			Mscr: "\u2133",
			Mu: "\u039C",
			NJcy: "\u040A",
			Nacute: "\u0143",
			Ncaron: "\u0147",
			Ncedil: "\u0145",
			Ncy: "\u041D",
			NegativeMediumSpace: "\u200B",
			NegativeThickSpace: "\u200B",
			NegativeThinSpace: "\u200B",
			NegativeVeryThinSpace: "\u200B",
			NestedGreaterGreater: "\u226B",
			NestedLessLess: "\u226A",
			NewLine: `
`,
			Nfr: "\u{1D511}",
			NoBreak: "\u2060",
			NonBreakingSpace: "\xA0",
			Nopf: "\u2115",
			Not: "\u2AEC",
			NotCongruent: "\u2262",
			NotCupCap: "\u226D",
			NotDoubleVerticalBar: "\u2226",
			NotElement: "\u2209",
			NotEqual: "\u2260",
			NotEqualTilde: "\u2242\u0338",
			NotExists: "\u2204",
			NotGreater: "\u226F",
			NotGreaterEqual: "\u2271",
			NotGreaterFullEqual: "\u2267\u0338",
			NotGreaterGreater: "\u226B\u0338",
			NotGreaterLess: "\u2279",
			NotGreaterSlantEqual: "\u2A7E\u0338",
			NotGreaterTilde: "\u2275",
			NotHumpDownHump: "\u224E\u0338",
			NotHumpEqual: "\u224F\u0338",
			NotLeftTriangle: "\u22EA",
			NotLeftTriangleBar: "\u29CF\u0338",
			NotLeftTriangleEqual: "\u22EC",
			NotLess: "\u226E",
			NotLessEqual: "\u2270",
			NotLessGreater: "\u2278",
			NotLessLess: "\u226A\u0338",
			NotLessSlantEqual: "\u2A7D\u0338",
			NotLessTilde: "\u2274",
			NotNestedGreaterGreater: "\u2AA2\u0338",
			NotNestedLessLess: "\u2AA1\u0338",
			NotPrecedes: "\u2280",
			NotPrecedesEqual: "\u2AAF\u0338",
			NotPrecedesSlantEqual: "\u22E0",
			NotReverseElement: "\u220C",
			NotRightTriangle: "\u22EB",
			NotRightTriangleBar: "\u29D0\u0338",
			NotRightTriangleEqual: "\u22ED",
			NotSquareSubset: "\u228F\u0338",
			NotSquareSubsetEqual: "\u22E2",
			NotSquareSuperset: "\u2290\u0338",
			NotSquareSupersetEqual: "\u22E3",
			NotSubset: "\u2282\u20D2",
			NotSubsetEqual: "\u2288",
			NotSucceeds: "\u2281",
			NotSucceedsEqual: "\u2AB0\u0338",
			NotSucceedsSlantEqual: "\u22E1",
			NotSucceedsTilde: "\u227F\u0338",
			NotSuperset: "\u2283\u20D2",
			NotSupersetEqual: "\u2289",
			NotTilde: "\u2241",
			NotTildeEqual: "\u2244",
			NotTildeFullEqual: "\u2247",
			NotTildeTilde: "\u2249",
			NotVerticalBar: "\u2224",
			Nscr: "\u{1D4A9}",
			Ntilde: "\xD1",
			Nu: "\u039D",
			OElig: "\u0152",
			Oacute: "\xD3",
			Ocirc: "\xD4",
			Ocy: "\u041E",
			Odblac: "\u0150",
			Ofr: "\u{1D512}",
			Ograve: "\xD2",
			Omacr: "\u014C",
			Omega: "\u03A9",
			Omicron: "\u039F",
			Oopf: "\u{1D546}",
			OpenCurlyDoubleQuote: "\u201C",
			OpenCurlyQuote: "\u2018",
			Or: "\u2A54",
			Oscr: "\u{1D4AA}",
			Oslash: "\xD8",
			Otilde: "\xD5",
			Otimes: "\u2A37",
			Ouml: "\xD6",
			OverBar: "\u203E",
			OverBrace: "\u23DE",
			OverBracket: "\u23B4",
			OverParenthesis: "\u23DC",
			PartialD: "\u2202",
			Pcy: "\u041F",
			Pfr: "\u{1D513}",
			Phi: "\u03A6",
			Pi: "\u03A0",
			PlusMinus: "\xB1",
			Poincareplane: "\u210C",
			Popf: "\u2119",
			Pr: "\u2ABB",
			Precedes: "\u227A",
			PrecedesEqual: "\u2AAF",
			PrecedesSlantEqual: "\u227C",
			PrecedesTilde: "\u227E",
			Prime: "\u2033",
			Product: "\u220F",
			Proportion: "\u2237",
			Proportional: "\u221D",
			Pscr: "\u{1D4AB}",
			Psi: "\u03A8",
			QUOT: '"',
			Qfr: "\u{1D514}",
			Qopf: "\u211A",
			Qscr: "\u{1D4AC}",
			RBarr: "\u2910",
			REG: "\xAE",
			Racute: "\u0154",
			Rang: "\u27EB",
			Rarr: "\u21A0",
			Rarrtl: "\u2916",
			Rcaron: "\u0158",
			Rcedil: "\u0156",
			Rcy: "\u0420",
			Re: "\u211C",
			ReverseElement: "\u220B",
			ReverseEquilibrium: "\u21CB",
			ReverseUpEquilibrium: "\u296F",
			Rfr: "\u211C",
			Rho: "\u03A1",
			RightAngleBracket: "\u27E9",
			RightArrow: "\u2192",
			RightArrowBar: "\u21E5",
			RightArrowLeftArrow: "\u21C4",
			RightCeiling: "\u2309",
			RightDoubleBracket: "\u27E7",
			RightDownTeeVector: "\u295D",
			RightDownVector: "\u21C2",
			RightDownVectorBar: "\u2955",
			RightFloor: "\u230B",
			RightTee: "\u22A2",
			RightTeeArrow: "\u21A6",
			RightTeeVector: "\u295B",
			RightTriangle: "\u22B3",
			RightTriangleBar: "\u29D0",
			RightTriangleEqual: "\u22B5",
			RightUpDownVector: "\u294F",
			RightUpTeeVector: "\u295C",
			RightUpVector: "\u21BE",
			RightUpVectorBar: "\u2954",
			RightVector: "\u21C0",
			RightVectorBar: "\u2953",
			Rightarrow: "\u21D2",
			Ropf: "\u211D",
			RoundImplies: "\u2970",
			Rrightarrow: "\u21DB",
			Rscr: "\u211B",
			Rsh: "\u21B1",
			RuleDelayed: "\u29F4",
			SHCHcy: "\u0429",
			SHcy: "\u0428",
			SOFTcy: "\u042C",
			Sacute: "\u015A",
			Sc: "\u2ABC",
			Scaron: "\u0160",
			Scedil: "\u015E",
			Scirc: "\u015C",
			Scy: "\u0421",
			Sfr: "\u{1D516}",
			ShortDownArrow: "\u2193",
			ShortLeftArrow: "\u2190",
			ShortRightArrow: "\u2192",
			ShortUpArrow: "\u2191",
			Sigma: "\u03A3",
			SmallCircle: "\u2218",
			Sopf: "\u{1D54A}",
			Sqrt: "\u221A",
			Square: "\u25A1",
			SquareIntersection: "\u2293",
			SquareSubset: "\u228F",
			SquareSubsetEqual: "\u2291",
			SquareSuperset: "\u2290",
			SquareSupersetEqual: "\u2292",
			SquareUnion: "\u2294",
			Sscr: "\u{1D4AE}",
			Star: "\u22C6",
			Sub: "\u22D0",
			Subset: "\u22D0",
			SubsetEqual: "\u2286",
			Succeeds: "\u227B",
			SucceedsEqual: "\u2AB0",
			SucceedsSlantEqual: "\u227D",
			SucceedsTilde: "\u227F",
			SuchThat: "\u220B",
			Sum: "\u2211",
			Sup: "\u22D1",
			Superset: "\u2283",
			SupersetEqual: "\u2287",
			Supset: "\u22D1",
			THORN: "\xDE",
			TRADE: "\u2122",
			TSHcy: "\u040B",
			TScy: "\u0426",
			Tab: "	",
			Tau: "\u03A4",
			Tcaron: "\u0164",
			Tcedil: "\u0162",
			Tcy: "\u0422",
			Tfr: "\u{1D517}",
			Therefore: "\u2234",
			Theta: "\u0398",
			ThickSpace: "\u205F\u200A",
			ThinSpace: "\u2009",
			Tilde: "\u223C",
			TildeEqual: "\u2243",
			TildeFullEqual: "\u2245",
			TildeTilde: "\u2248",
			Topf: "\u{1D54B}",
			TripleDot: "\u20DB",
			Tscr: "\u{1D4AF}",
			Tstrok: "\u0166",
			Uacute: "\xDA",
			Uarr: "\u219F",
			Uarrocir: "\u2949",
			Ubrcy: "\u040E",
			Ubreve: "\u016C",
			Ucirc: "\xDB",
			Ucy: "\u0423",
			Udblac: "\u0170",
			Ufr: "\u{1D518}",
			Ugrave: "\xD9",
			Umacr: "\u016A",
			UnderBar: "_",
			UnderBrace: "\u23DF",
			UnderBracket: "\u23B5",
			UnderParenthesis: "\u23DD",
			Union: "\u22C3",
			UnionPlus: "\u228E",
			Uogon: "\u0172",
			Uopf: "\u{1D54C}",
			UpArrow: "\u2191",
			UpArrowBar: "\u2912",
			UpArrowDownArrow: "\u21C5",
			UpDownArrow: "\u2195",
			UpEquilibrium: "\u296E",
			UpTee: "\u22A5",
			UpTeeArrow: "\u21A5",
			Uparrow: "\u21D1",
			Updownarrow: "\u21D5",
			UpperLeftArrow: "\u2196",
			UpperRightArrow: "\u2197",
			Upsi: "\u03D2",
			Upsilon: "\u03A5",
			Uring: "\u016E",
			Uscr: "\u{1D4B0}",
			Utilde: "\u0168",
			Uuml: "\xDC",
			VDash: "\u22AB",
			Vbar: "\u2AEB",
			Vcy: "\u0412",
			Vdash: "\u22A9",
			Vdashl: "\u2AE6",
			Vee: "\u22C1",
			Verbar: "\u2016",
			Vert: "\u2016",
			VerticalBar: "\u2223",
			VerticalLine: "|",
			VerticalSeparator: "\u2758",
			VerticalTilde: "\u2240",
			VeryThinSpace: "\u200A",
			Vfr: "\u{1D519}",
			Vopf: "\u{1D54D}",
			Vscr: "\u{1D4B1}",
			Vvdash: "\u22AA",
			Wcirc: "\u0174",
			Wedge: "\u22C0",
			Wfr: "\u{1D51A}",
			Wopf: "\u{1D54E}",
			Wscr: "\u{1D4B2}",
			Xfr: "\u{1D51B}",
			Xi: "\u039E",
			Xopf: "\u{1D54F}",
			Xscr: "\u{1D4B3}",
			YAcy: "\u042F",
			YIcy: "\u0407",
			YUcy: "\u042E",
			Yacute: "\xDD",
			Ycirc: "\u0176",
			Ycy: "\u042B",
			Yfr: "\u{1D51C}",
			Yopf: "\u{1D550}",
			Yscr: "\u{1D4B4}",
			Yuml: "\u0178",
			ZHcy: "\u0416",
			Zacute: "\u0179",
			Zcaron: "\u017D",
			Zcy: "\u0417",
			Zdot: "\u017B",
			ZeroWidthSpace: "\u200B",
			Zeta: "\u0396",
			Zfr: "\u2128",
			Zopf: "\u2124",
			Zscr: "\u{1D4B5}",
			aacute: "\xE1",
			abreve: "\u0103",
			ac: "\u223E",
			acE: "\u223E\u0333",
			acd: "\u223F",
			acirc: "\xE2",
			acute: "\xB4",
			acy: "\u0430",
			aelig: "\xE6",
			af: "\u2061",
			afr: "\u{1D51E}",
			agrave: "\xE0",
			alefsym: "\u2135",
			aleph: "\u2135",
			alpha: "\u03B1",
			amacr: "\u0101",
			amalg: "\u2A3F",
			amp: "&",
			and: "\u2227",
			andand: "\u2A55",
			andd: "\u2A5C",
			andslope: "\u2A58",
			andv: "\u2A5A",
			ang: "\u2220",
			ange: "\u29A4",
			angle: "\u2220",
			angmsd: "\u2221",
			angmsdaa: "\u29A8",
			angmsdab: "\u29A9",
			angmsdac: "\u29AA",
			angmsdad: "\u29AB",
			angmsdae: "\u29AC",
			angmsdaf: "\u29AD",
			angmsdag: "\u29AE",
			angmsdah: "\u29AF",
			angrt: "\u221F",
			angrtvb: "\u22BE",
			angrtvbd: "\u299D",
			angsph: "\u2222",
			angst: "\xC5",
			angzarr: "\u237C",
			aogon: "\u0105",
			aopf: "\u{1D552}",
			ap: "\u2248",
			apE: "\u2A70",
			apacir: "\u2A6F",
			ape: "\u224A",
			apid: "\u224B",
			apos: "'",
			approx: "\u2248",
			approxeq: "\u224A",
			aring: "\xE5",
			ascr: "\u{1D4B6}",
			ast: "*",
			asymp: "\u2248",
			asympeq: "\u224D",
			atilde: "\xE3",
			auml: "\xE4",
			awconint: "\u2233",
			awint: "\u2A11",
			bNot: "\u2AED",
			backcong: "\u224C",
			backepsilon: "\u03F6",
			backprime: "\u2035",
			backsim: "\u223D",
			backsimeq: "\u22CD",
			barvee: "\u22BD",
			barwed: "\u2305",
			barwedge: "\u2305",
			bbrk: "\u23B5",
			bbrktbrk: "\u23B6",
			bcong: "\u224C",
			bcy: "\u0431",
			bdquo: "\u201E",
			becaus: "\u2235",
			because: "\u2235",
			bemptyv: "\u29B0",
			bepsi: "\u03F6",
			bernou: "\u212C",
			beta: "\u03B2",
			beth: "\u2136",
			between: "\u226C",
			bfr: "\u{1D51F}",
			bigcap: "\u22C2",
			bigcirc: "\u25EF",
			bigcup: "\u22C3",
			bigodot: "\u2A00",
			bigoplus: "\u2A01",
			bigotimes: "\u2A02",
			bigsqcup: "\u2A06",
			bigstar: "\u2605",
			bigtriangledown: "\u25BD",
			bigtriangleup: "\u25B3",
			biguplus: "\u2A04",
			bigvee: "\u22C1",
			bigwedge: "\u22C0",
			bkarow: "\u290D",
			blacklozenge: "\u29EB",
			blacksquare: "\u25AA",
			blacktriangle: "\u25B4",
			blacktriangledown: "\u25BE",
			blacktriangleleft: "\u25C2",
			blacktriangleright: "\u25B8",
			blank: "\u2423",
			blk12: "\u2592",
			blk14: "\u2591",
			blk34: "\u2593",
			block: "\u2588",
			bne: "=\u20E5",
			bnequiv: "\u2261\u20E5",
			bnot: "\u2310",
			bopf: "\u{1D553}",
			bot: "\u22A5",
			bottom: "\u22A5",
			bowtie: "\u22C8",
			boxDL: "\u2557",
			boxDR: "\u2554",
			boxDl: "\u2556",
			boxDr: "\u2553",
			boxH: "\u2550",
			boxHD: "\u2566",
			boxHU: "\u2569",
			boxHd: "\u2564",
			boxHu: "\u2567",
			boxUL: "\u255D",
			boxUR: "\u255A",
			boxUl: "\u255C",
			boxUr: "\u2559",
			boxV: "\u2551",
			boxVH: "\u256C",
			boxVL: "\u2563",
			boxVR: "\u2560",
			boxVh: "\u256B",
			boxVl: "\u2562",
			boxVr: "\u255F",
			boxbox: "\u29C9",
			boxdL: "\u2555",
			boxdR: "\u2552",
			boxdl: "\u2510",
			boxdr: "\u250C",
			boxh: "\u2500",
			boxhD: "\u2565",
			boxhU: "\u2568",
			boxhd: "\u252C",
			boxhu: "\u2534",
			boxminus: "\u229F",
			boxplus: "\u229E",
			boxtimes: "\u22A0",
			boxuL: "\u255B",
			boxuR: "\u2558",
			boxul: "\u2518",
			boxur: "\u2514",
			boxv: "\u2502",
			boxvH: "\u256A",
			boxvL: "\u2561",
			boxvR: "\u255E",
			boxvh: "\u253C",
			boxvl: "\u2524",
			boxvr: "\u251C",
			bprime: "\u2035",
			breve: "\u02D8",
			brvbar: "\xA6",
			bscr: "\u{1D4B7}",
			bsemi: "\u204F",
			bsim: "\u223D",
			bsime: "\u22CD",
			bsol: "\\",
			bsolb: "\u29C5",
			bsolhsub: "\u27C8",
			bull: "\u2022",
			bullet: "\u2022",
			bump: "\u224E",
			bumpE: "\u2AAE",
			bumpe: "\u224F",
			bumpeq: "\u224F",
			cacute: "\u0107",
			cap: "\u2229",
			capand: "\u2A44",
			capbrcup: "\u2A49",
			capcap: "\u2A4B",
			capcup: "\u2A47",
			capdot: "\u2A40",
			caps: "\u2229\uFE00",
			caret: "\u2041",
			caron: "\u02C7",
			ccaps: "\u2A4D",
			ccaron: "\u010D",
			ccedil: "\xE7",
			ccirc: "\u0109",
			ccups: "\u2A4C",
			ccupssm: "\u2A50",
			cdot: "\u010B",
			cedil: "\xB8",
			cemptyv: "\u29B2",
			cent: "\xA2",
			centerdot: "\xB7",
			cfr: "\u{1D520}",
			chcy: "\u0447",
			check: "\u2713",
			checkmark: "\u2713",
			chi: "\u03C7",
			cir: "\u25CB",
			cirE: "\u29C3",
			circ: "\u02C6",
			circeq: "\u2257",
			circlearrowleft: "\u21BA",
			circlearrowright: "\u21BB",
			circledR: "\xAE",
			circledS: "\u24C8",
			circledast: "\u229B",
			circledcirc: "\u229A",
			circleddash: "\u229D",
			cire: "\u2257",
			cirfnint: "\u2A10",
			cirmid: "\u2AEF",
			cirscir: "\u29C2",
			clubs: "\u2663",
			clubsuit: "\u2663",
			colon: ":",
			colone: "\u2254",
			coloneq: "\u2254",
			comma: ",",
			commat: "@",
			comp: "\u2201",
			compfn: "\u2218",
			complement: "\u2201",
			complexes: "\u2102",
			cong: "\u2245",
			congdot: "\u2A6D",
			conint: "\u222E",
			copf: "\u{1D554}",
			coprod: "\u2210",
			copy: "\xA9",
			copysr: "\u2117",
			crarr: "\u21B5",
			cross: "\u2717",
			cscr: "\u{1D4B8}",
			csub: "\u2ACF",
			csube: "\u2AD1",
			csup: "\u2AD0",
			csupe: "\u2AD2",
			ctdot: "\u22EF",
			cudarrl: "\u2938",
			cudarrr: "\u2935",
			cuepr: "\u22DE",
			cuesc: "\u22DF",
			cularr: "\u21B6",
			cularrp: "\u293D",
			cup: "\u222A",
			cupbrcap: "\u2A48",
			cupcap: "\u2A46",
			cupcup: "\u2A4A",
			cupdot: "\u228D",
			cupor: "\u2A45",
			cups: "\u222A\uFE00",
			curarr: "\u21B7",
			curarrm: "\u293C",
			curlyeqprec: "\u22DE",
			curlyeqsucc: "\u22DF",
			curlyvee: "\u22CE",
			curlywedge: "\u22CF",
			curren: "\xA4",
			curvearrowleft: "\u21B6",
			curvearrowright: "\u21B7",
			cuvee: "\u22CE",
			cuwed: "\u22CF",
			cwconint: "\u2232",
			cwint: "\u2231",
			cylcty: "\u232D",
			dArr: "\u21D3",
			dHar: "\u2965",
			dagger: "\u2020",
			daleth: "\u2138",
			darr: "\u2193",
			dash: "\u2010",
			dashv: "\u22A3",
			dbkarow: "\u290F",
			dblac: "\u02DD",
			dcaron: "\u010F",
			dcy: "\u0434",
			dd: "\u2146",
			ddagger: "\u2021",
			ddarr: "\u21CA",
			ddotseq: "\u2A77",
			deg: "\xB0",
			delta: "\u03B4",
			demptyv: "\u29B1",
			dfisht: "\u297F",
			dfr: "\u{1D521}",
			dharl: "\u21C3",
			dharr: "\u21C2",
			diam: "\u22C4",
			diamond: "\u22C4",
			diamondsuit: "\u2666",
			diams: "\u2666",
			die: "\xA8",
			digamma: "\u03DD",
			disin: "\u22F2",
			div: "\xF7",
			divide: "\xF7",
			divideontimes: "\u22C7",
			divonx: "\u22C7",
			djcy: "\u0452",
			dlcorn: "\u231E",
			dlcrop: "\u230D",
			dollar: "$",
			dopf: "\u{1D555}",
			dot: "\u02D9",
			doteq: "\u2250",
			doteqdot: "\u2251",
			dotminus: "\u2238",
			dotplus: "\u2214",
			dotsquare: "\u22A1",
			doublebarwedge: "\u2306",
			downarrow: "\u2193",
			downdownarrows: "\u21CA",
			downharpoonleft: "\u21C3",
			downharpoonright: "\u21C2",
			drbkarow: "\u2910",
			drcorn: "\u231F",
			drcrop: "\u230C",
			dscr: "\u{1D4B9}",
			dscy: "\u0455",
			dsol: "\u29F6",
			dstrok: "\u0111",
			dtdot: "\u22F1",
			dtri: "\u25BF",
			dtrif: "\u25BE",
			duarr: "\u21F5",
			duhar: "\u296F",
			dwangle: "\u29A6",
			dzcy: "\u045F",
			dzigrarr: "\u27FF",
			eDDot: "\u2A77",
			eDot: "\u2251",
			eacute: "\xE9",
			easter: "\u2A6E",
			ecaron: "\u011B",
			ecir: "\u2256",
			ecirc: "\xEA",
			ecolon: "\u2255",
			ecy: "\u044D",
			edot: "\u0117",
			ee: "\u2147",
			efDot: "\u2252",
			efr: "\u{1D522}",
			eg: "\u2A9A",
			egrave: "\xE8",
			egs: "\u2A96",
			egsdot: "\u2A98",
			el: "\u2A99",
			elinters: "\u23E7",
			ell: "\u2113",
			els: "\u2A95",
			elsdot: "\u2A97",
			emacr: "\u0113",
			empty: "\u2205",
			emptyset: "\u2205",
			emptyv: "\u2205",
			emsp13: "\u2004",
			emsp14: "\u2005",
			emsp: "\u2003",
			eng: "\u014B",
			ensp: "\u2002",
			eogon: "\u0119",
			eopf: "\u{1D556}",
			epar: "\u22D5",
			eparsl: "\u29E3",
			eplus: "\u2A71",
			epsi: "\u03B5",
			epsilon: "\u03B5",
			epsiv: "\u03F5",
			eqcirc: "\u2256",
			eqcolon: "\u2255",
			eqsim: "\u2242",
			eqslantgtr: "\u2A96",
			eqslantless: "\u2A95",
			equals: "=",
			equest: "\u225F",
			equiv: "\u2261",
			equivDD: "\u2A78",
			eqvparsl: "\u29E5",
			erDot: "\u2253",
			erarr: "\u2971",
			escr: "\u212F",
			esdot: "\u2250",
			esim: "\u2242",
			eta: "\u03B7",
			eth: "\xF0",
			euml: "\xEB",
			euro: "\u20AC",
			excl: "!",
			exist: "\u2203",
			expectation: "\u2130",
			exponentiale: "\u2147",
			fallingdotseq: "\u2252",
			fcy: "\u0444",
			female: "\u2640",
			ffilig: "\uFB03",
			fflig: "\uFB00",
			ffllig: "\uFB04",
			ffr: "\u{1D523}",
			filig: "\uFB01",
			fjlig: "fj",
			flat: "\u266D",
			fllig: "\uFB02",
			fltns: "\u25B1",
			fnof: "\u0192",
			fopf: "\u{1D557}",
			forall: "\u2200",
			fork: "\u22D4",
			forkv: "\u2AD9",
			fpartint: "\u2A0D",
			frac12: "\xBD",
			frac13: "\u2153",
			frac14: "\xBC",
			frac15: "\u2155",
			frac16: "\u2159",
			frac18: "\u215B",
			frac23: "\u2154",
			frac25: "\u2156",
			frac34: "\xBE",
			frac35: "\u2157",
			frac38: "\u215C",
			frac45: "\u2158",
			frac56: "\u215A",
			frac58: "\u215D",
			frac78: "\u215E",
			frasl: "\u2044",
			frown: "\u2322",
			fscr: "\u{1D4BB}",
			gE: "\u2267",
			gEl: "\u2A8C",
			gacute: "\u01F5",
			gamma: "\u03B3",
			gammad: "\u03DD",
			gap: "\u2A86",
			gbreve: "\u011F",
			gcirc: "\u011D",
			gcy: "\u0433",
			gdot: "\u0121",
			ge: "\u2265",
			gel: "\u22DB",
			geq: "\u2265",
			geqq: "\u2267",
			geqslant: "\u2A7E",
			ges: "\u2A7E",
			gescc: "\u2AA9",
			gesdot: "\u2A80",
			gesdoto: "\u2A82",
			gesdotol: "\u2A84",
			gesl: "\u22DB\uFE00",
			gesles: "\u2A94",
			gfr: "\u{1D524}",
			gg: "\u226B",
			ggg: "\u22D9",
			gimel: "\u2137",
			gjcy: "\u0453",
			gl: "\u2277",
			glE: "\u2A92",
			gla: "\u2AA5",
			glj: "\u2AA4",
			gnE: "\u2269",
			gnap: "\u2A8A",
			gnapprox: "\u2A8A",
			gne: "\u2A88",
			gneq: "\u2A88",
			gneqq: "\u2269",
			gnsim: "\u22E7",
			gopf: "\u{1D558}",
			grave: "`",
			gscr: "\u210A",
			gsim: "\u2273",
			gsime: "\u2A8E",
			gsiml: "\u2A90",
			gt: ">",
			gtcc: "\u2AA7",
			gtcir: "\u2A7A",
			gtdot: "\u22D7",
			gtlPar: "\u2995",
			gtquest: "\u2A7C",
			gtrapprox: "\u2A86",
			gtrarr: "\u2978",
			gtrdot: "\u22D7",
			gtreqless: "\u22DB",
			gtreqqless: "\u2A8C",
			gtrless: "\u2277",
			gtrsim: "\u2273",
			gvertneqq: "\u2269\uFE00",
			gvnE: "\u2269\uFE00",
			hArr: "\u21D4",
			hairsp: "\u200A",
			half: "\xBD",
			hamilt: "\u210B",
			hardcy: "\u044A",
			harr: "\u2194",
			harrcir: "\u2948",
			harrw: "\u21AD",
			hbar: "\u210F",
			hcirc: "\u0125",
			hearts: "\u2665",
			heartsuit: "\u2665",
			hellip: "\u2026",
			hercon: "\u22B9",
			hfr: "\u{1D525}",
			hksearow: "\u2925",
			hkswarow: "\u2926",
			hoarr: "\u21FF",
			homtht: "\u223B",
			hookleftarrow: "\u21A9",
			hookrightarrow: "\u21AA",
			hopf: "\u{1D559}",
			horbar: "\u2015",
			hscr: "\u{1D4BD}",
			hslash: "\u210F",
			hstrok: "\u0127",
			hybull: "\u2043",
			hyphen: "\u2010",
			iacute: "\xED",
			ic: "\u2063",
			icirc: "\xEE",
			icy: "\u0438",
			iecy: "\u0435",
			iexcl: "\xA1",
			iff: "\u21D4",
			ifr: "\u{1D526}",
			igrave: "\xEC",
			ii: "\u2148",
			iiiint: "\u2A0C",
			iiint: "\u222D",
			iinfin: "\u29DC",
			iiota: "\u2129",
			ijlig: "\u0133",
			imacr: "\u012B",
			image: "\u2111",
			imagline: "\u2110",
			imagpart: "\u2111",
			imath: "\u0131",
			imof: "\u22B7",
			imped: "\u01B5",
			in: "\u2208",
			incare: "\u2105",
			infin: "\u221E",
			infintie: "\u29DD",
			inodot: "\u0131",
			int: "\u222B",
			intcal: "\u22BA",
			integers: "\u2124",
			intercal: "\u22BA",
			intlarhk: "\u2A17",
			intprod: "\u2A3C",
			iocy: "\u0451",
			iogon: "\u012F",
			iopf: "\u{1D55A}",
			iota: "\u03B9",
			iprod: "\u2A3C",
			iquest: "\xBF",
			iscr: "\u{1D4BE}",
			isin: "\u2208",
			isinE: "\u22F9",
			isindot: "\u22F5",
			isins: "\u22F4",
			isinsv: "\u22F3",
			isinv: "\u2208",
			it: "\u2062",
			itilde: "\u0129",
			iukcy: "\u0456",
			iuml: "\xEF",
			jcirc: "\u0135",
			jcy: "\u0439",
			jfr: "\u{1D527}",
			jmath: "\u0237",
			jopf: "\u{1D55B}",
			jscr: "\u{1D4BF}",
			jsercy: "\u0458",
			jukcy: "\u0454",
			kappa: "\u03BA",
			kappav: "\u03F0",
			kcedil: "\u0137",
			kcy: "\u043A",
			kfr: "\u{1D528}",
			kgreen: "\u0138",
			khcy: "\u0445",
			kjcy: "\u045C",
			kopf: "\u{1D55C}",
			kscr: "\u{1D4C0}",
			lAarr: "\u21DA",
			lArr: "\u21D0",
			lAtail: "\u291B",
			lBarr: "\u290E",
			lE: "\u2266",
			lEg: "\u2A8B",
			lHar: "\u2962",
			lacute: "\u013A",
			laemptyv: "\u29B4",
			lagran: "\u2112",
			lambda: "\u03BB",
			lang: "\u27E8",
			langd: "\u2991",
			langle: "\u27E8",
			lap: "\u2A85",
			laquo: "\xAB",
			larr: "\u2190",
			larrb: "\u21E4",
			larrbfs: "\u291F",
			larrfs: "\u291D",
			larrhk: "\u21A9",
			larrlp: "\u21AB",
			larrpl: "\u2939",
			larrsim: "\u2973",
			larrtl: "\u21A2",
			lat: "\u2AAB",
			latail: "\u2919",
			late: "\u2AAD",
			lates: "\u2AAD\uFE00",
			lbarr: "\u290C",
			lbbrk: "\u2772",
			lbrace: "{",
			lbrack: "[",
			lbrke: "\u298B",
			lbrksld: "\u298F",
			lbrkslu: "\u298D",
			lcaron: "\u013E",
			lcedil: "\u013C",
			lceil: "\u2308",
			lcub: "{",
			lcy: "\u043B",
			ldca: "\u2936",
			ldquo: "\u201C",
			ldquor: "\u201E",
			ldrdhar: "\u2967",
			ldrushar: "\u294B",
			ldsh: "\u21B2",
			le: "\u2264",
			leftarrow: "\u2190",
			leftarrowtail: "\u21A2",
			leftharpoondown: "\u21BD",
			leftharpoonup: "\u21BC",
			leftleftarrows: "\u21C7",
			leftrightarrow: "\u2194",
			leftrightarrows: "\u21C6",
			leftrightharpoons: "\u21CB",
			leftrightsquigarrow: "\u21AD",
			leftthreetimes: "\u22CB",
			leg: "\u22DA",
			leq: "\u2264",
			leqq: "\u2266",
			leqslant: "\u2A7D",
			les: "\u2A7D",
			lescc: "\u2AA8",
			lesdot: "\u2A7F",
			lesdoto: "\u2A81",
			lesdotor: "\u2A83",
			lesg: "\u22DA\uFE00",
			lesges: "\u2A93",
			lessapprox: "\u2A85",
			lessdot: "\u22D6",
			lesseqgtr: "\u22DA",
			lesseqqgtr: "\u2A8B",
			lessgtr: "\u2276",
			lesssim: "\u2272",
			lfisht: "\u297C",
			lfloor: "\u230A",
			lfr: "\u{1D529}",
			lg: "\u2276",
			lgE: "\u2A91",
			lhard: "\u21BD",
			lharu: "\u21BC",
			lharul: "\u296A",
			lhblk: "\u2584",
			ljcy: "\u0459",
			ll: "\u226A",
			llarr: "\u21C7",
			llcorner: "\u231E",
			llhard: "\u296B",
			lltri: "\u25FA",
			lmidot: "\u0140",
			lmoust: "\u23B0",
			lmoustache: "\u23B0",
			lnE: "\u2268",
			lnap: "\u2A89",
			lnapprox: "\u2A89",
			lne: "\u2A87",
			lneq: "\u2A87",
			lneqq: "\u2268",
			lnsim: "\u22E6",
			loang: "\u27EC",
			loarr: "\u21FD",
			lobrk: "\u27E6",
			longleftarrow: "\u27F5",
			longleftrightarrow: "\u27F7",
			longmapsto: "\u27FC",
			longrightarrow: "\u27F6",
			looparrowleft: "\u21AB",
			looparrowright: "\u21AC",
			lopar: "\u2985",
			lopf: "\u{1D55D}",
			loplus: "\u2A2D",
			lotimes: "\u2A34",
			lowast: "\u2217",
			lowbar: "_",
			loz: "\u25CA",
			lozenge: "\u25CA",
			lozf: "\u29EB",
			lpar: "(",
			lparlt: "\u2993",
			lrarr: "\u21C6",
			lrcorner: "\u231F",
			lrhar: "\u21CB",
			lrhard: "\u296D",
			lrm: "\u200E",
			lrtri: "\u22BF",
			lsaquo: "\u2039",
			lscr: "\u{1D4C1}",
			lsh: "\u21B0",
			lsim: "\u2272",
			lsime: "\u2A8D",
			lsimg: "\u2A8F",
			lsqb: "[",
			lsquo: "\u2018",
			lsquor: "\u201A",
			lstrok: "\u0142",
			lt: "<",
			ltcc: "\u2AA6",
			ltcir: "\u2A79",
			ltdot: "\u22D6",
			lthree: "\u22CB",
			ltimes: "\u22C9",
			ltlarr: "\u2976",
			ltquest: "\u2A7B",
			ltrPar: "\u2996",
			ltri: "\u25C3",
			ltrie: "\u22B4",
			ltrif: "\u25C2",
			lurdshar: "\u294A",
			luruhar: "\u2966",
			lvertneqq: "\u2268\uFE00",
			lvnE: "\u2268\uFE00",
			mDDot: "\u223A",
			macr: "\xAF",
			male: "\u2642",
			malt: "\u2720",
			maltese: "\u2720",
			map: "\u21A6",
			mapsto: "\u21A6",
			mapstodown: "\u21A7",
			mapstoleft: "\u21A4",
			mapstoup: "\u21A5",
			marker: "\u25AE",
			mcomma: "\u2A29",
			mcy: "\u043C",
			mdash: "\u2014",
			measuredangle: "\u2221",
			mfr: "\u{1D52A}",
			mho: "\u2127",
			micro: "\xB5",
			mid: "\u2223",
			midast: "*",
			midcir: "\u2AF0",
			middot: "\xB7",
			minus: "\u2212",
			minusb: "\u229F",
			minusd: "\u2238",
			minusdu: "\u2A2A",
			mlcp: "\u2ADB",
			mldr: "\u2026",
			mnplus: "\u2213",
			models: "\u22A7",
			mopf: "\u{1D55E}",
			mp: "\u2213",
			mscr: "\u{1D4C2}",
			mstpos: "\u223E",
			mu: "\u03BC",
			multimap: "\u22B8",
			mumap: "\u22B8",
			nGg: "\u22D9\u0338",
			nGt: "\u226B\u20D2",
			nGtv: "\u226B\u0338",
			nLeftarrow: "\u21CD",
			nLeftrightarrow: "\u21CE",
			nLl: "\u22D8\u0338",
			nLt: "\u226A\u20D2",
			nLtv: "\u226A\u0338",
			nRightarrow: "\u21CF",
			nVDash: "\u22AF",
			nVdash: "\u22AE",
			nabla: "\u2207",
			nacute: "\u0144",
			nang: "\u2220\u20D2",
			nap: "\u2249",
			napE: "\u2A70\u0338",
			napid: "\u224B\u0338",
			napos: "\u0149",
			napprox: "\u2249",
			natur: "\u266E",
			natural: "\u266E",
			naturals: "\u2115",
			nbsp: "\xA0",
			nbump: "\u224E\u0338",
			nbumpe: "\u224F\u0338",
			ncap: "\u2A43",
			ncaron: "\u0148",
			ncedil: "\u0146",
			ncong: "\u2247",
			ncongdot: "\u2A6D\u0338",
			ncup: "\u2A42",
			ncy: "\u043D",
			ndash: "\u2013",
			ne: "\u2260",
			neArr: "\u21D7",
			nearhk: "\u2924",
			nearr: "\u2197",
			nearrow: "\u2197",
			nedot: "\u2250\u0338",
			nequiv: "\u2262",
			nesear: "\u2928",
			nesim: "\u2242\u0338",
			nexist: "\u2204",
			nexists: "\u2204",
			nfr: "\u{1D52B}",
			ngE: "\u2267\u0338",
			nge: "\u2271",
			ngeq: "\u2271",
			ngeqq: "\u2267\u0338",
			ngeqslant: "\u2A7E\u0338",
			nges: "\u2A7E\u0338",
			ngsim: "\u2275",
			ngt: "\u226F",
			ngtr: "\u226F",
			nhArr: "\u21CE",
			nharr: "\u21AE",
			nhpar: "\u2AF2",
			ni: "\u220B",
			nis: "\u22FC",
			nisd: "\u22FA",
			niv: "\u220B",
			njcy: "\u045A",
			nlArr: "\u21CD",
			nlE: "\u2266\u0338",
			nlarr: "\u219A",
			nldr: "\u2025",
			nle: "\u2270",
			nleftarrow: "\u219A",
			nleftrightarrow: "\u21AE",
			nleq: "\u2270",
			nleqq: "\u2266\u0338",
			nleqslant: "\u2A7D\u0338",
			nles: "\u2A7D\u0338",
			nless: "\u226E",
			nlsim: "\u2274",
			nlt: "\u226E",
			nltri: "\u22EA",
			nltrie: "\u22EC",
			nmid: "\u2224",
			nopf: "\u{1D55F}",
			not: "\xAC",
			notin: "\u2209",
			notinE: "\u22F9\u0338",
			notindot: "\u22F5\u0338",
			notinva: "\u2209",
			notinvb: "\u22F7",
			notinvc: "\u22F6",
			notni: "\u220C",
			notniva: "\u220C",
			notnivb: "\u22FE",
			notnivc: "\u22FD",
			npar: "\u2226",
			nparallel: "\u2226",
			nparsl: "\u2AFD\u20E5",
			npart: "\u2202\u0338",
			npolint: "\u2A14",
			npr: "\u2280",
			nprcue: "\u22E0",
			npre: "\u2AAF\u0338",
			nprec: "\u2280",
			npreceq: "\u2AAF\u0338",
			nrArr: "\u21CF",
			nrarr: "\u219B",
			nrarrc: "\u2933\u0338",
			nrarrw: "\u219D\u0338",
			nrightarrow: "\u219B",
			nrtri: "\u22EB",
			nrtrie: "\u22ED",
			nsc: "\u2281",
			nsccue: "\u22E1",
			nsce: "\u2AB0\u0338",
			nscr: "\u{1D4C3}",
			nshortmid: "\u2224",
			nshortparallel: "\u2226",
			nsim: "\u2241",
			nsime: "\u2244",
			nsimeq: "\u2244",
			nsmid: "\u2224",
			nspar: "\u2226",
			nsqsube: "\u22E2",
			nsqsupe: "\u22E3",
			nsub: "\u2284",
			nsubE: "\u2AC5\u0338",
			nsube: "\u2288",
			nsubset: "\u2282\u20D2",
			nsubseteq: "\u2288",
			nsubseteqq: "\u2AC5\u0338",
			nsucc: "\u2281",
			nsucceq: "\u2AB0\u0338",
			nsup: "\u2285",
			nsupE: "\u2AC6\u0338",
			nsupe: "\u2289",
			nsupset: "\u2283\u20D2",
			nsupseteq: "\u2289",
			nsupseteqq: "\u2AC6\u0338",
			ntgl: "\u2279",
			ntilde: "\xF1",
			ntlg: "\u2278",
			ntriangleleft: "\u22EA",
			ntrianglelefteq: "\u22EC",
			ntriangleright: "\u22EB",
			ntrianglerighteq: "\u22ED",
			nu: "\u03BD",
			num: "#",
			numero: "\u2116",
			numsp: "\u2007",
			nvDash: "\u22AD",
			nvHarr: "\u2904",
			nvap: "\u224D\u20D2",
			nvdash: "\u22AC",
			nvge: "\u2265\u20D2",
			nvgt: ">\u20D2",
			nvinfin: "\u29DE",
			nvlArr: "\u2902",
			nvle: "\u2264\u20D2",
			nvlt: "<\u20D2",
			nvltrie: "\u22B4\u20D2",
			nvrArr: "\u2903",
			nvrtrie: "\u22B5\u20D2",
			nvsim: "\u223C\u20D2",
			nwArr: "\u21D6",
			nwarhk: "\u2923",
			nwarr: "\u2196",
			nwarrow: "\u2196",
			nwnear: "\u2927",
			oS: "\u24C8",
			oacute: "\xF3",
			oast: "\u229B",
			ocir: "\u229A",
			ocirc: "\xF4",
			ocy: "\u043E",
			odash: "\u229D",
			odblac: "\u0151",
			odiv: "\u2A38",
			odot: "\u2299",
			odsold: "\u29BC",
			oelig: "\u0153",
			ofcir: "\u29BF",
			ofr: "\u{1D52C}",
			ogon: "\u02DB",
			ograve: "\xF2",
			ogt: "\u29C1",
			ohbar: "\u29B5",
			ohm: "\u03A9",
			oint: "\u222E",
			olarr: "\u21BA",
			olcir: "\u29BE",
			olcross: "\u29BB",
			oline: "\u203E",
			olt: "\u29C0",
			omacr: "\u014D",
			omega: "\u03C9",
			omicron: "\u03BF",
			omid: "\u29B6",
			ominus: "\u2296",
			oopf: "\u{1D560}",
			opar: "\u29B7",
			operp: "\u29B9",
			oplus: "\u2295",
			or: "\u2228",
			orarr: "\u21BB",
			ord: "\u2A5D",
			order: "\u2134",
			orderof: "\u2134",
			ordf: "\xAA",
			ordm: "\xBA",
			origof: "\u22B6",
			oror: "\u2A56",
			orslope: "\u2A57",
			orv: "\u2A5B",
			oscr: "\u2134",
			oslash: "\xF8",
			osol: "\u2298",
			otilde: "\xF5",
			otimes: "\u2297",
			otimesas: "\u2A36",
			ouml: "\xF6",
			ovbar: "\u233D",
			par: "\u2225",
			para: "\xB6",
			parallel: "\u2225",
			parsim: "\u2AF3",
			parsl: "\u2AFD",
			part: "\u2202",
			pcy: "\u043F",
			percnt: "%",
			period: ".",
			permil: "\u2030",
			perp: "\u22A5",
			pertenk: "\u2031",
			pfr: "\u{1D52D}",
			phi: "\u03C6",
			phiv: "\u03D5",
			phmmat: "\u2133",
			phone: "\u260E",
			pi: "\u03C0",
			pitchfork: "\u22D4",
			piv: "\u03D6",
			planck: "\u210F",
			planckh: "\u210E",
			plankv: "\u210F",
			plus: "+",
			plusacir: "\u2A23",
			plusb: "\u229E",
			pluscir: "\u2A22",
			plusdo: "\u2214",
			plusdu: "\u2A25",
			pluse: "\u2A72",
			plusmn: "\xB1",
			plussim: "\u2A26",
			plustwo: "\u2A27",
			pm: "\xB1",
			pointint: "\u2A15",
			popf: "\u{1D561}",
			pound: "\xA3",
			pr: "\u227A",
			prE: "\u2AB3",
			prap: "\u2AB7",
			prcue: "\u227C",
			pre: "\u2AAF",
			prec: "\u227A",
			precapprox: "\u2AB7",
			preccurlyeq: "\u227C",
			preceq: "\u2AAF",
			precnapprox: "\u2AB9",
			precneqq: "\u2AB5",
			precnsim: "\u22E8",
			precsim: "\u227E",
			prime: "\u2032",
			primes: "\u2119",
			prnE: "\u2AB5",
			prnap: "\u2AB9",
			prnsim: "\u22E8",
			prod: "\u220F",
			profalar: "\u232E",
			profline: "\u2312",
			profsurf: "\u2313",
			prop: "\u221D",
			propto: "\u221D",
			prsim: "\u227E",
			prurel: "\u22B0",
			pscr: "\u{1D4C5}",
			psi: "\u03C8",
			puncsp: "\u2008",
			qfr: "\u{1D52E}",
			qint: "\u2A0C",
			qopf: "\u{1D562}",
			qprime: "\u2057",
			qscr: "\u{1D4C6}",
			quaternions: "\u210D",
			quatint: "\u2A16",
			quest: "?",
			questeq: "\u225F",
			quot: '"',
			rAarr: "\u21DB",
			rArr: "\u21D2",
			rAtail: "\u291C",
			rBarr: "\u290F",
			rHar: "\u2964",
			race: "\u223D\u0331",
			racute: "\u0155",
			radic: "\u221A",
			raemptyv: "\u29B3",
			rang: "\u27E9",
			rangd: "\u2992",
			range: "\u29A5",
			rangle: "\u27E9",
			raquo: "\xBB",
			rarr: "\u2192",
			rarrap: "\u2975",
			rarrb: "\u21E5",
			rarrbfs: "\u2920",
			rarrc: "\u2933",
			rarrfs: "\u291E",
			rarrhk: "\u21AA",
			rarrlp: "\u21AC",
			rarrpl: "\u2945",
			rarrsim: "\u2974",
			rarrtl: "\u21A3",
			rarrw: "\u219D",
			ratail: "\u291A",
			ratio: "\u2236",
			rationals: "\u211A",
			rbarr: "\u290D",
			rbbrk: "\u2773",
			rbrace: "}",
			rbrack: "]",
			rbrke: "\u298C",
			rbrksld: "\u298E",
			rbrkslu: "\u2990",
			rcaron: "\u0159",
			rcedil: "\u0157",
			rceil: "\u2309",
			rcub: "}",
			rcy: "\u0440",
			rdca: "\u2937",
			rdldhar: "\u2969",
			rdquo: "\u201D",
			rdquor: "\u201D",
			rdsh: "\u21B3",
			real: "\u211C",
			realine: "\u211B",
			realpart: "\u211C",
			reals: "\u211D",
			rect: "\u25AD",
			reg: "\xAE",
			rfisht: "\u297D",
			rfloor: "\u230B",
			rfr: "\u{1D52F}",
			rhard: "\u21C1",
			rharu: "\u21C0",
			rharul: "\u296C",
			rho: "\u03C1",
			rhov: "\u03F1",
			rightarrow: "\u2192",
			rightarrowtail: "\u21A3",
			rightharpoondown: "\u21C1",
			rightharpoonup: "\u21C0",
			rightleftarrows: "\u21C4",
			rightleftharpoons: "\u21CC",
			rightrightarrows: "\u21C9",
			rightsquigarrow: "\u219D",
			rightthreetimes: "\u22CC",
			ring: "\u02DA",
			risingdotseq: "\u2253",
			rlarr: "\u21C4",
			rlhar: "\u21CC",
			rlm: "\u200F",
			rmoust: "\u23B1",
			rmoustache: "\u23B1",
			rnmid: "\u2AEE",
			roang: "\u27ED",
			roarr: "\u21FE",
			robrk: "\u27E7",
			ropar: "\u2986",
			ropf: "\u{1D563}",
			roplus: "\u2A2E",
			rotimes: "\u2A35",
			rpar: ")",
			rpargt: "\u2994",
			rppolint: "\u2A12",
			rrarr: "\u21C9",
			rsaquo: "\u203A",
			rscr: "\u{1D4C7}",
			rsh: "\u21B1",
			rsqb: "]",
			rsquo: "\u2019",
			rsquor: "\u2019",
			rthree: "\u22CC",
			rtimes: "\u22CA",
			rtri: "\u25B9",
			rtrie: "\u22B5",
			rtrif: "\u25B8",
			rtriltri: "\u29CE",
			ruluhar: "\u2968",
			rx: "\u211E",
			sacute: "\u015B",
			sbquo: "\u201A",
			sc: "\u227B",
			scE: "\u2AB4",
			scap: "\u2AB8",
			scaron: "\u0161",
			sccue: "\u227D",
			sce: "\u2AB0",
			scedil: "\u015F",
			scirc: "\u015D",
			scnE: "\u2AB6",
			scnap: "\u2ABA",
			scnsim: "\u22E9",
			scpolint: "\u2A13",
			scsim: "\u227F",
			scy: "\u0441",
			sdot: "\u22C5",
			sdotb: "\u22A1",
			sdote: "\u2A66",
			seArr: "\u21D8",
			searhk: "\u2925",
			searr: "\u2198",
			searrow: "\u2198",
			sect: "\xA7",
			semi: ";",
			seswar: "\u2929",
			setminus: "\u2216",
			setmn: "\u2216",
			sext: "\u2736",
			sfr: "\u{1D530}",
			sfrown: "\u2322",
			sharp: "\u266F",
			shchcy: "\u0449",
			shcy: "\u0448",
			shortmid: "\u2223",
			shortparallel: "\u2225",
			shy: "\xAD",
			sigma: "\u03C3",
			sigmaf: "\u03C2",
			sigmav: "\u03C2",
			sim: "\u223C",
			simdot: "\u2A6A",
			sime: "\u2243",
			simeq: "\u2243",
			simg: "\u2A9E",
			simgE: "\u2AA0",
			siml: "\u2A9D",
			simlE: "\u2A9F",
			simne: "\u2246",
			simplus: "\u2A24",
			simrarr: "\u2972",
			slarr: "\u2190",
			smallsetminus: "\u2216",
			smashp: "\u2A33",
			smeparsl: "\u29E4",
			smid: "\u2223",
			smile: "\u2323",
			smt: "\u2AAA",
			smte: "\u2AAC",
			smtes: "\u2AAC\uFE00",
			softcy: "\u044C",
			sol: "/",
			solb: "\u29C4",
			solbar: "\u233F",
			sopf: "\u{1D564}",
			spades: "\u2660",
			spadesuit: "\u2660",
			spar: "\u2225",
			sqcap: "\u2293",
			sqcaps: "\u2293\uFE00",
			sqcup: "\u2294",
			sqcups: "\u2294\uFE00",
			sqsub: "\u228F",
			sqsube: "\u2291",
			sqsubset: "\u228F",
			sqsubseteq: "\u2291",
			sqsup: "\u2290",
			sqsupe: "\u2292",
			sqsupset: "\u2290",
			sqsupseteq: "\u2292",
			squ: "\u25A1",
			square: "\u25A1",
			squarf: "\u25AA",
			squf: "\u25AA",
			srarr: "\u2192",
			sscr: "\u{1D4C8}",
			ssetmn: "\u2216",
			ssmile: "\u2323",
			sstarf: "\u22C6",
			star: "\u2606",
			starf: "\u2605",
			straightepsilon: "\u03F5",
			straightphi: "\u03D5",
			strns: "\xAF",
			sub: "\u2282",
			subE: "\u2AC5",
			subdot: "\u2ABD",
			sube: "\u2286",
			subedot: "\u2AC3",
			submult: "\u2AC1",
			subnE: "\u2ACB",
			subne: "\u228A",
			subplus: "\u2ABF",
			subrarr: "\u2979",
			subset: "\u2282",
			subseteq: "\u2286",
			subseteqq: "\u2AC5",
			subsetneq: "\u228A",
			subsetneqq: "\u2ACB",
			subsim: "\u2AC7",
			subsub: "\u2AD5",
			subsup: "\u2AD3",
			succ: "\u227B",
			succapprox: "\u2AB8",
			succcurlyeq: "\u227D",
			succeq: "\u2AB0",
			succnapprox: "\u2ABA",
			succneqq: "\u2AB6",
			succnsim: "\u22E9",
			succsim: "\u227F",
			sum: "\u2211",
			sung: "\u266A",
			sup1: "\xB9",
			sup2: "\xB2",
			sup3: "\xB3",
			sup: "\u2283",
			supE: "\u2AC6",
			supdot: "\u2ABE",
			supdsub: "\u2AD8",
			supe: "\u2287",
			supedot: "\u2AC4",
			suphsol: "\u27C9",
			suphsub: "\u2AD7",
			suplarr: "\u297B",
			supmult: "\u2AC2",
			supnE: "\u2ACC",
			supne: "\u228B",
			supplus: "\u2AC0",
			supset: "\u2283",
			supseteq: "\u2287",
			supseteqq: "\u2AC6",
			supsetneq: "\u228B",
			supsetneqq: "\u2ACC",
			supsim: "\u2AC8",
			supsub: "\u2AD4",
			supsup: "\u2AD6",
			swArr: "\u21D9",
			swarhk: "\u2926",
			swarr: "\u2199",
			swarrow: "\u2199",
			swnwar: "\u292A",
			szlig: "\xDF",
			target: "\u2316",
			tau: "\u03C4",
			tbrk: "\u23B4",
			tcaron: "\u0165",
			tcedil: "\u0163",
			tcy: "\u0442",
			tdot: "\u20DB",
			telrec: "\u2315",
			tfr: "\u{1D531}",
			there4: "\u2234",
			therefore: "\u2234",
			theta: "\u03B8",
			thetasym: "\u03D1",
			thetav: "\u03D1",
			thickapprox: "\u2248",
			thicksim: "\u223C",
			thinsp: "\u2009",
			thkap: "\u2248",
			thksim: "\u223C",
			thorn: "\xFE",
			tilde: "\u02DC",
			times: "\xD7",
			timesb: "\u22A0",
			timesbar: "\u2A31",
			timesd: "\u2A30",
			tint: "\u222D",
			toea: "\u2928",
			top: "\u22A4",
			topbot: "\u2336",
			topcir: "\u2AF1",
			topf: "\u{1D565}",
			topfork: "\u2ADA",
			tosa: "\u2929",
			tprime: "\u2034",
			trade: "\u2122",
			triangle: "\u25B5",
			triangledown: "\u25BF",
			triangleleft: "\u25C3",
			trianglelefteq: "\u22B4",
			triangleq: "\u225C",
			triangleright: "\u25B9",
			trianglerighteq: "\u22B5",
			tridot: "\u25EC",
			trie: "\u225C",
			triminus: "\u2A3A",
			triplus: "\u2A39",
			trisb: "\u29CD",
			tritime: "\u2A3B",
			trpezium: "\u23E2",
			tscr: "\u{1D4C9}",
			tscy: "\u0446",
			tshcy: "\u045B",
			tstrok: "\u0167",
			twixt: "\u226C",
			twoheadleftarrow: "\u219E",
			twoheadrightarrow: "\u21A0",
			uArr: "\u21D1",
			uHar: "\u2963",
			uacute: "\xFA",
			uarr: "\u2191",
			ubrcy: "\u045E",
			ubreve: "\u016D",
			ucirc: "\xFB",
			ucy: "\u0443",
			udarr: "\u21C5",
			udblac: "\u0171",
			udhar: "\u296E",
			ufisht: "\u297E",
			ufr: "\u{1D532}",
			ugrave: "\xF9",
			uharl: "\u21BF",
			uharr: "\u21BE",
			uhblk: "\u2580",
			ulcorn: "\u231C",
			ulcorner: "\u231C",
			ulcrop: "\u230F",
			ultri: "\u25F8",
			umacr: "\u016B",
			uml: "\xA8",
			uogon: "\u0173",
			uopf: "\u{1D566}",
			uparrow: "\u2191",
			updownarrow: "\u2195",
			upharpoonleft: "\u21BF",
			upharpoonright: "\u21BE",
			uplus: "\u228E",
			upsi: "\u03C5",
			upsih: "\u03D2",
			upsilon: "\u03C5",
			upuparrows: "\u21C8",
			urcorn: "\u231D",
			urcorner: "\u231D",
			urcrop: "\u230E",
			uring: "\u016F",
			urtri: "\u25F9",
			uscr: "\u{1D4CA}",
			utdot: "\u22F0",
			utilde: "\u0169",
			utri: "\u25B5",
			utrif: "\u25B4",
			uuarr: "\u21C8",
			uuml: "\xFC",
			uwangle: "\u29A7",
			vArr: "\u21D5",
			vBar: "\u2AE8",
			vBarv: "\u2AE9",
			vDash: "\u22A8",
			vangrt: "\u299C",
			varepsilon: "\u03F5",
			varkappa: "\u03F0",
			varnothing: "\u2205",
			varphi: "\u03D5",
			varpi: "\u03D6",
			varpropto: "\u221D",
			varr: "\u2195",
			varrho: "\u03F1",
			varsigma: "\u03C2",
			varsubsetneq: "\u228A\uFE00",
			varsubsetneqq: "\u2ACB\uFE00",
			varsupsetneq: "\u228B\uFE00",
			varsupsetneqq: "\u2ACC\uFE00",
			vartheta: "\u03D1",
			vartriangleleft: "\u22B2",
			vartriangleright: "\u22B3",
			vcy: "\u0432",
			vdash: "\u22A2",
			vee: "\u2228",
			veebar: "\u22BB",
			veeeq: "\u225A",
			vellip: "\u22EE",
			verbar: "|",
			vert: "|",
			vfr: "\u{1D533}",
			vltri: "\u22B2",
			vnsub: "\u2282\u20D2",
			vnsup: "\u2283\u20D2",
			vopf: "\u{1D567}",
			vprop: "\u221D",
			vrtri: "\u22B3",
			vscr: "\u{1D4CB}",
			vsubnE: "\u2ACB\uFE00",
			vsubne: "\u228A\uFE00",
			vsupnE: "\u2ACC\uFE00",
			vsupne: "\u228B\uFE00",
			vzigzag: "\u299A",
			wcirc: "\u0175",
			wedbar: "\u2A5F",
			wedge: "\u2227",
			wedgeq: "\u2259",
			weierp: "\u2118",
			wfr: "\u{1D534}",
			wopf: "\u{1D568}",
			wp: "\u2118",
			wr: "\u2240",
			wreath: "\u2240",
			wscr: "\u{1D4CC}",
			xcap: "\u22C2",
			xcirc: "\u25EF",
			xcup: "\u22C3",
			xdtri: "\u25BD",
			xfr: "\u{1D535}",
			xhArr: "\u27FA",
			xharr: "\u27F7",
			xi: "\u03BE",
			xlArr: "\u27F8",
			xlarr: "\u27F5",
			xmap: "\u27FC",
			xnis: "\u22FB",
			xodot: "\u2A00",
			xopf: "\u{1D569}",
			xoplus: "\u2A01",
			xotime: "\u2A02",
			xrArr: "\u27F9",
			xrarr: "\u27F6",
			xscr: "\u{1D4CD}",
			xsqcup: "\u2A06",
			xuplus: "\u2A04",
			xutri: "\u25B3",
			xvee: "\u22C1",
			xwedge: "\u22C0",
			yacute: "\xFD",
			yacy: "\u044F",
			ycirc: "\u0177",
			ycy: "\u044B",
			yen: "\xA5",
			yfr: "\u{1D536}",
			yicy: "\u0457",
			yopf: "\u{1D56A}",
			yscr: "\u{1D4CE}",
			yucy: "\u044E",
			yuml: "\xFF",
			zacute: "\u017A",
			zcaron: "\u017E",
			zcy: "\u0437",
			zdot: "\u017C",
			zeetrf: "\u2128",
			zeta: "\u03B6",
			zfr: "\u{1D537}",
			zhcy: "\u0436",
			zigrarr: "\u21DD",
			zopf: "\u{1D56B}",
			zscr: "\u{1D4CF}",
			zwj: "\u200D",
			zwnj: "\u200C",
		},
		Hn = {
			0: 65533,
			128: 8364,
			130: 8218,
			131: 402,
			132: 8222,
			133: 8230,
			134: 8224,
			135: 8225,
			136: 710,
			137: 8240,
			138: 352,
			139: 8249,
			140: 338,
			142: 381,
			145: 8216,
			146: 8217,
			147: 8220,
			148: 8221,
			149: 8226,
			150: 8211,
			151: 8212,
			152: 732,
			153: 8482,
			154: 353,
			155: 8250,
			156: 339,
			158: 382,
			159: 376,
		};
	function lo(e) {
		return e.replace(/&(?:[a-zA-Z]+|#[xX][\da-fA-F]+|#\d+);/g, (t) => {
			if (t.charAt(1) === "#") {
				let u = t.charAt(2),
					i =
						u === "X" || u === "x"
							? parseInt(t.slice(3), 16)
							: parseInt(t.slice(2), 10);
				return fo(i);
			}
			return co[t.slice(1, -1)] || t;
		});
	}
	function fo(e) {
		return (e >= 55296 && e <= 57343) || e > 1114111
			? "\uFFFD"
			: (e in Hn && (e = Hn[e]), String.fromCodePoint(e));
	}
	function ho(e, t) {
		return (
			(e.startPos = e.tokenPos = e.index),
			(e.startColumn = e.colPos = e.column),
			(e.startLine = e.linePos = e.line),
			(e.token = H[e.currentChar] & 8192 ? Eo(e, t) : $n(e, t, 0)),
			e.token
		);
	}
	function Eo(e, t) {
		let u = e.currentChar,
			i = N(e),
			n = e.index;
		for (; i !== u; ) e.index >= e.end && E(e, 14), (i = N(e));
		return (
			i !== u && E(e, 14),
			(e.tokenValue = e.source.slice(n, e.index)),
			N(e),
			t & 512 && (e.tokenRaw = e.source.slice(e.tokenPos, e.index)),
			134283267
		);
	}
	function He(e, t) {
		if (
			((e.startPos = e.tokenPos = e.index),
			(e.startColumn = e.colPos = e.column),
			(e.startLine = e.linePos = e.line),
			e.index >= e.end)
		)
			return (e.token = 1048576);
		switch (Jn[e.source.charCodeAt(e.index)]) {
			case 8456258: {
				N(e),
					e.currentChar === 47 ? (N(e), (e.token = 25)) : (e.token = 8456258);
				break;
			}
			case 2162700: {
				N(e), (e.token = 2162700);
				break;
			}
			default: {
				let i = 0;
				for (; e.index < e.end; ) {
					let s = H[e.source.charCodeAt(e.index)];
					if (
						(s & 1024
							? ((i |= 5), Ue(e))
							: s & 2048
								? (qu(e, i), (i = (i & -5) | 1))
								: N(e),
						H[e.currentChar] & 16384)
					)
						break;
				}
				let n = e.source.slice(e.tokenPos, e.index);
				t & 512 && (e.tokenRaw = n), (e.tokenValue = lo(n)), (e.token = 138);
			}
		}
		return e.token;
	}
	function Uu(e) {
		if ((e.token & 143360) === 143360) {
			let { index: t } = e,
				u = e.currentChar;
			for (; H[u] & 32770; ) u = N(e);
			e.tokenValue += e.source.slice(t, e.index);
		}
		return (e.token = 208897), e.token;
	}
	function se(e, t) {
		!(e.flags & 1) &&
			(e.token & 1048576) !== 1048576 &&
			E(e, 28, X[e.token & 255]),
			U(e, t, 1074790417) || e.onInsertedSemicolon?.(e.startPos);
	}
	function Zn(e, t, u, i) {
		return t - u < 13 &&
			i === "use strict" &&
			((e.token & 1048576) === 1048576 || e.flags & 1)
			? 1
			: 0;
	}
	function Wu(e, t, u) {
		return e.token !== u ? 0 : (L(e, t), 1);
	}
	function U(e, t, u) {
		return e.token !== u ? !1 : (L(e, t), !0);
	}
	function P(e, t, u) {
		e.token !== u && E(e, 23, X[u & 255]), L(e, t);
	}
	function Te(e, t) {
		switch (t.type) {
			case "ArrayExpression":
				t.type = "ArrayPattern";
				let u = t.elements;
				for (let n = 0, s = u.length; n < s; ++n) {
					let o = u[n];
					o && Te(e, o);
				}
				return;
			case "ObjectExpression":
				t.type = "ObjectPattern";
				let i = t.properties;
				for (let n = 0, s = i.length; n < s; ++n) Te(e, i[n]);
				return;
			case "AssignmentExpression":
				(t.type = "AssignmentPattern"),
					t.operator !== "=" && E(e, 69),
					delete t.operator,
					Te(e, t.left);
				return;
			case "Property":
				Te(e, t.value);
				return;
			case "SpreadElement":
				(t.type = "RestElement"), Te(e, t.argument);
		}
	}
	function Jt(e, t, u, i, n) {
		t & 1024 &&
			((i & 36864) === 36864 && E(e, 115),
			!n && (i & 537079808) === 537079808 && E(e, 116)),
			(i & 20480) === 20480 && E(e, 100),
			u & 24 && i === 241739 && E(e, 98),
			t & 4196352 && i === 209008 && E(e, 96),
			t & 2098176 && i === 241773 && E(e, 95, "yield");
	}
	function e0(e, t, u) {
		t & 1024 &&
			((u & 36864) === 36864 && E(e, 115),
			(u & 537079808) === 537079808 && E(e, 116),
			u === 122 && E(e, 93),
			u === 121 && E(e, 93)),
			(u & 20480) === 20480 && E(e, 100),
			t & 4196352 && u === 209008 && E(e, 96),
			t & 2098176 && u === 241773 && E(e, 95, "yield");
	}
	function t0(e, t, u) {
		return (
			u === 209008 && (t & 4196352 && E(e, 96), (e.destructible |= 128)),
			u === 241773 && t & 2097152 && E(e, 95, "yield"),
			(u & 20480) === 20480 || (u & 36864) === 36864 || u == 122
		);
	}
	function mo(e) {
		return e.property ? e.property.type === "PrivateIdentifier" : !1;
	}
	function u0(e, t, u, i) {
		for (; t; ) {
			if (t["$" + u]) return i && E(e, 134), 1;
			i && t.loop && (i = 0), (t = t.$);
		}
		return 0;
	}
	function To(e, t, u) {
		let i = t;
		for (; i; ) i["$" + u] && E(e, 133, u), (i = i.$);
		t["$" + u] = 1;
	}
	function _(e, t, u, i, n, s) {
		return (
			t & 2 &&
				((s.start = u), (s.end = e.startPos), (s.range = [u, e.startPos])),
			t & 4 &&
				((s.loc = {
					start: { line: i, column: n },
					end: { line: e.startLine, column: e.startColumn },
				}),
				e.sourceFile && (s.loc.source = e.sourceFile)),
			s
		);
	}
	function $t(e) {
		switch (e.type) {
			case "JSXIdentifier":
				return e.name;
			case "JSXNamespacedName":
				return e.namespace + ":" + e.name;
			case "JSXMemberExpression":
				return $t(e.object) + "." + $t(e.property);
		}
	}
	function uu(e, t, u) {
		let i = G(pe(), 1024);
		return Oe(e, t, i, u, 1, 0), i;
	}
	function Hu(e, t, ...u) {
		let { index: i, line: n, column: s } = e;
		return { type: t, params: u, index: i, line: n, column: s };
	}
	function pe() {
		return { parent: void 0, type: 2 };
	}
	function G(e, t) {
		return { parent: e, type: t, scopeError: void 0 };
	}
	function Le(e, t, u, i, n, s) {
		n & 4 ? i0(e, t, u, i, n) : Oe(e, t, u, i, n, s), s & 64 && Fe(e, i);
	}
	function Oe(e, t, u, i, n, s) {
		let o = u["#" + i];
		o &&
			!(o & 2) &&
			(n & 1
				? (u.scopeError = Hu(e, 141, i))
				: (t & 256 && o & 64 && s & 2) || E(e, 141, i)),
			u.type & 128 &&
				u.parent["#" + i] &&
				!(u.parent["#" + i] & 2) &&
				E(e, 141, i),
			u.type & 1024 && o && !(o & 2) && n & 1 && (u.scopeError = Hu(e, 141, i)),
			u.type & 64 && u.parent["#" + i] & 768 && E(e, 154, i),
			(u["#" + i] = n);
	}
	function i0(e, t, u, i, n) {
		let s = u;
		for (; s && !(s.type & 256); ) {
			let o = s["#" + i];
			o & 248 &&
				((t & 256 &&
					!(t & 1024) &&
					((n & 128 && o & 68) || (o & 128 && n & 68))) ||
					E(e, 141, i)),
				s === u && o & 1 && n & 1 && (s.scopeError = Hu(e, 141, i)),
				o & 768 && (!(o & 512) || !(t & 256) || t & 1024) && E(e, 141, i),
				(s["#" + i] = n),
				(s = s.parent);
		}
	}
	function Fe(e, t) {
		e.exportedNames !== void 0 &&
			t !== "" &&
			(e.exportedNames["#" + t] && E(e, 142, t),
			(e.exportedNames["#" + t] = 1));
	}
	function bo(e, t) {
		e.exportedBindings !== void 0 &&
			t !== "" &&
			(e.exportedBindings["#" + t] = 1);
	}
	function Ao(e, t) {
		return function (u, i, n, s, o) {
			let r = { type: u, value: i };
			e & 2 && ((r.start = n), (r.end = s), (r.range = [n, s])),
				e & 4 && (r.loc = o),
				t.push(r);
		};
	}
	function go(e, t) {
		return function (u, i, n, s) {
			let o = { token: u };
			e & 2 && ((o.start = i), (o.end = n), (o.range = [i, n])),
				e & 4 && (o.loc = s),
				t.push(o);
		};
	}
	function Xu(e, t) {
		return e & 2098176
			? (e & 2048 && t === 209008) || (e & 2097152 && t === 241773)
				? !1
				: (t & 143360) === 143360 || (t & 12288) === 12288
			: (t & 143360) === 143360 ||
					(t & 12288) === 12288 ||
					(t & 36864) === 36864;
	}
	function Qu(e, t, u) {
		(u & 537079808) === 537079808 && (t & 1024 && E(e, 116), (e.flags |= 512)),
			Xu(t, u) || E(e, 0);
	}
	function Co(e, t, u, i, n) {
		return {
			source: e,
			flags: 0,
			index: 0,
			line: 1,
			column: 0,
			startPos: 0,
			end: e.length,
			tokenPos: 0,
			startColumn: 0,
			colPos: 0,
			linePos: 1,
			startLine: 1,
			sourceFile: t,
			tokenValue: "",
			token: 1048576,
			tokenRaw: "",
			tokenRegExp: void 0,
			currentChar: e.charCodeAt(0),
			exportedNames: [],
			exportedBindings: [],
			assignable: 1,
			destructible: 0,
			onComment: u,
			onToken: i,
			onInsertedSemicolon: n,
			leadingDecorators: [],
		};
	}
	function _o(e, t, u) {
		let i = "",
			n,
			s,
			o;
		t != null &&
			(t.module && (u |= 3072),
			t.next && (u |= 1),
			t.loc && (u |= 4),
			t.ranges && (u |= 2),
			t.uniqueKeyInPattern && (u |= 536870912),
			t.lexical && (u |= 64),
			t.webcompat && (u |= 256),
			t.directives && (u |= 520),
			t.globalReturn && (u |= 32),
			t.raw && (u |= 512),
			t.preserveParens && (u |= 128),
			t.impliedStrict && (u |= 1024),
			t.jsx && (u |= 16),
			t.source && (i = t.source),
			t.onComment != null &&
				(n = Array.isArray(t.onComment) ? Ao(u, t.onComment) : t.onComment),
			t.onInsertedSemicolon != null && (s = t.onInsertedSemicolon),
			t.onToken != null &&
				(o = Array.isArray(t.onToken) ? go(u, t.onToken) : t.onToken));
		let r = Co(e, i, n, o, s);
		u & 1 && Z2(r);
		let c = u & 64 ? pe() : void 0,
			h = [],
			T = "script";
		if (u & 2048) {
			if (((T = "module"), (h = No(r, u | 8192, c)), c))
				for (let d in r.exportedBindings)
					d[0] === "#" && !c[d] && E(r, 143, d.slice(1));
		} else h = Do(r, u | 8192, c);
		let b = { type: "Program", sourceType: T, body: h };
		return (
			u & 2 && ((b.start = 0), (b.end = e.length), (b.range = [0, e.length])),
			u & 4 &&
				((b.loc = {
					start: { line: 1, column: 0 },
					end: { line: r.line, column: r.column },
				}),
				r.sourceFile && (b.loc.source = i)),
			b
		);
	}
	function Do(e, t, u) {
		L(e, t | 32768 | 268435456);
		let i = [];
		for (; e.token === 134283267; ) {
			let {
					index: n,
					tokenPos: s,
					tokenValue: o,
					linePos: r,
					colPos: c,
					token: h,
				} = e,
				T = ie(e, t);
			Zn(e, n, s, o) && (t |= 1024), i.push(Ku(e, t, T, h, s, r, c));
		}
		for (; e.token !== 1048576; ) i.push(Ct(e, t, u, 4, {}));
		return i;
	}
	function No(e, t, u) {
		L(e, t | 32768);
		let i = [];
		if (t & 8)
			for (; e.token === 134283267; ) {
				let { tokenPos: n, linePos: s, colPos: o, token: r } = e;
				i.push(Ku(e, t, ie(e, t), r, n, s, o));
			}
		for (; e.token !== 1048576; ) i.push(Io(e, t, u));
		return i;
	}
	function Io(e, t, u) {
		e.leadingDecorators = su(e, t);
		let i;
		switch (e.token) {
			case 20566:
				i = Wo(e, t, u);
				break;
			case 86108:
				i = Yo(e, t, u);
				break;
			default:
				i = Ct(e, t, u, 4, {});
		}
		return e.leadingDecorators.length && E(e, 165), i;
	}
	function Ct(e, t, u, i, n) {
		let s = e.tokenPos,
			o = e.linePos,
			r = e.colPos;
		switch (e.token) {
			case 86106:
				return Pe(e, t, u, i, 1, 0, 0, s, o, r);
			case 133:
			case 86096:
				return xu(e, t, u, 0, s, o, r);
			case 86092:
				return pu(e, t, u, 16, 0, s, o, r);
			case 241739:
				return xo(e, t, u, i, s, o, r);
			case 20566:
				E(e, 101, "export");
			case 86108:
				switch ((L(e, t), e.token)) {
					case 67174411:
						return r0(e, t, s, o, r);
					case 67108877:
						return o0(e, t, s, o, r);
					default:
						E(e, 101, "import");
				}
			case 209007:
				return n0(e, t, u, i, n, 1, s, o, r);
			default:
				return _t(e, t, u, i, n, 1, s, o, r);
		}
	}
	function _t(e, t, u, i, n, s, o, r, c) {
		switch (e.token) {
			case 86090:
				return s0(e, t, u, 0, o, r, c);
			case 20574:
				return Lo(e, t, o, r, c);
			case 20571:
				return Po(e, t, u, n, o, r, c);
			case 20569:
				return qo(e, t, u, n, o, r, c);
			case 20564:
				return po(e, t, u, n, o, r, c);
			case 20580:
				return yo(e, t, u, n, o, r, c);
			case 86112:
				return Oo(e, t, u, n, o, r, c);
			case 1074790417:
				return ko(e, t, o, r, c);
			case 2162700:
				return gt(e, t, u && G(u, 2), n, o, r, c);
			case 86114:
				return Ro(e, t, o, r, c);
			case 20557:
				return Bo(e, t, n, o, r, c);
			case 20561:
				return wo(e, t, n, o, r, c);
			case 20579:
				return vo(e, t, u, n, o, r, c);
			case 20581:
				return Mo(e, t, u, n, o, r, c);
			case 20562:
				return Fo(e, t, o, r, c);
			case 209007:
				return n0(e, t, u, i, n, 0, o, r, c);
			case 20559:
				E(e, 157);
			case 20568:
				E(e, 158);
			case 86106:
				E(e, t & 1024 ? 74 : t & 256 ? 75 : 76);
			case 86096:
				E(e, 77);
			default:
				return So(e, t, u, i, n, s, o, r, c);
		}
	}
	function So(e, t, u, i, n, s, o, r, c) {
		let { tokenValue: h, token: T } = e,
			b;
		switch (T) {
			case 241739:
				(b = x(e, t)), t & 1024 && E(e, 83), e.token === 69271571 && E(e, 82);
				break;
			default:
				b = oe(e, t, 2, 0, 1, 0, 1, e.tokenPos, e.linePos, e.colPos);
		}
		return T & 143360 && e.token === 21
			? ju(e, t, u, i, n, h, b, T, s, o, r, c)
			: ((b = q(e, t, b, 0, 0, o, r, c)),
				(b = j(e, t, 0, 0, o, r, c, b)),
				e.token === 18 && (b = Ne(e, t, 0, o, r, c, b)),
				$e(e, t, b, o, r, c));
	}
	function gt(e, t, u, i, n, s, o) {
		let r = [];
		for (P(e, t | 32768, 2162700); e.token !== 1074790415; )
			r.push(Ct(e, t, u, 2, { $: i }));
		return (
			P(e, t | 32768, 1074790415),
			_(e, t, n, s, o, { type: "BlockStatement", body: r })
		);
	}
	function Lo(e, t, u, i, n) {
		!(t & 32) && t & 8192 && E(e, 90), L(e, t | 32768);
		let s =
			e.flags & 1 || e.token & 1048576
				? null
				: te(e, t, 0, 1, e.tokenPos, e.linePos, e.colPos);
		return (
			se(e, t | 32768),
			_(e, t, u, i, n, { type: "ReturnStatement", argument: s })
		);
	}
	function $e(e, t, u, i, n, s) {
		return (
			se(e, t | 32768),
			_(e, t, i, n, s, { type: "ExpressionStatement", expression: u })
		);
	}
	function ju(e, t, u, i, n, s, o, r, c, h, T, b) {
		Jt(e, t, 0, r, 1), To(e, n, s), L(e, t | 32768);
		let d =
			c && !(t & 1024) && t & 256 && e.token === 86106
				? Pe(e, t, G(u, 2), i, 0, 0, 0, e.tokenPos, e.linePos, e.colPos)
				: _t(e, t, u, i, n, c, e.tokenPos, e.linePos, e.colPos);
		return _(e, t, h, T, b, { type: "LabeledStatement", label: o, body: d });
	}
	function n0(e, t, u, i, n, s, o, r, c) {
		let { token: h, tokenValue: T } = e,
			b = x(e, t);
		if (e.token === 21) return ju(e, t, u, i, n, T, b, h, 1, o, r, c);
		let d = e.flags & 1;
		if (!d) {
			if (e.token === 86106)
				return s || E(e, 120), Pe(e, t, u, i, 1, 0, 1, o, r, c);
			if ((e.token & 143360) === 143360)
				return (
					(b = T0(e, t, 1, o, r, c)),
					e.token === 18 && (b = Ne(e, t, 0, o, r, c, b)),
					$e(e, t, b, o, r, c)
				);
		}
		return (
			e.token === 67174411
				? (b = Zu(e, t, b, 1, 1, 0, d, o, r, c))
				: (e.token === 10 &&
						(Qu(e, t, h), (b = nu(e, t, e.tokenValue, b, 0, 1, 0, o, r, c))),
					(e.assignable = 1)),
			(b = q(e, t, b, 0, 0, o, r, c)),
			(b = j(e, t, 0, 0, o, r, c, b)),
			(e.assignable = 1),
			e.token === 18 && (b = Ne(e, t, 0, o, r, c, b)),
			$e(e, t, b, o, r, c)
		);
	}
	function Ku(e, t, u, i, n, s, o) {
		return (
			i !== 1074790417 &&
				((e.assignable = 2),
				(u = q(e, t, u, 0, 0, n, s, o)),
				e.token !== 1074790417 &&
					((u = j(e, t, 0, 0, n, s, o, u)),
					e.token === 18 && (u = Ne(e, t, 0, n, s, o, u))),
				se(e, t | 32768)),
			t & 8 && u.type === "Literal" && typeof u.value == "string"
				? _(e, t, n, s, o, {
						type: "ExpressionStatement",
						expression: u,
						directive: u.raw.slice(1, -1),
					})
				: _(e, t, n, s, o, { type: "ExpressionStatement", expression: u })
		);
	}
	function ko(e, t, u, i, n) {
		return L(e, t | 32768), _(e, t, u, i, n, { type: "EmptyStatement" });
	}
	function Ro(e, t, u, i, n) {
		L(e, t | 32768), e.flags & 1 && E(e, 88);
		let s = te(e, t, 0, 1, e.tokenPos, e.linePos, e.colPos);
		return (
			se(e, t | 32768),
			_(e, t, u, i, n, { type: "ThrowStatement", argument: s })
		);
	}
	function Po(e, t, u, i, n, s, o) {
		L(e, t), P(e, t | 32768, 67174411), (e.assignable = 1);
		let r = te(e, t, 0, 1, e.tokenPos, e.line, e.colPos);
		P(e, t | 32768, 16);
		let c = pn(e, t, u, i, e.tokenPos, e.linePos, e.colPos),
			h = null;
		return (
			e.token === 20565 &&
				(L(e, t | 32768),
				(h = pn(e, t, u, i, e.tokenPos, e.linePos, e.colPos))),
			_(e, t, n, s, o, {
				type: "IfStatement",
				test: r,
				consequent: c,
				alternate: h,
			})
		);
	}
	function pn(e, t, u, i, n, s, o) {
		return t & 1024 || !(t & 256) || e.token !== 86106
			? _t(e, t, u, 0, { $: i }, 0, e.tokenPos, e.linePos, e.colPos)
			: Pe(e, t, G(u, 2), 0, 0, 0, 0, n, s, o);
	}
	function Oo(e, t, u, i, n, s, o) {
		L(e, t), P(e, t | 32768, 67174411);
		let r = te(e, t, 0, 1, e.tokenPos, e.linePos, e.colPos);
		P(e, t, 16), P(e, t, 2162700);
		let c = [],
			h = 0;
		for (u && (u = G(u, 8)); e.token !== 1074790415; ) {
			let { tokenPos: T, linePos: b, colPos: d } = e,
				D = null,
				k = [];
			for (
				U(e, t | 32768, 20558)
					? (D = te(e, t, 0, 1, e.tokenPos, e.linePos, e.colPos))
					: (P(e, t | 32768, 20563), h && E(e, 87), (h = 1)),
					P(e, t | 32768, 21);
				e.token !== 20558 && e.token !== 1074790415 && e.token !== 20563;

			)
				k.push(Ct(e, t | 4096, u, 2, { $: i }));
			c.push(_(e, t, T, b, d, { type: "SwitchCase", test: D, consequent: k }));
		}
		return (
			P(e, t | 32768, 1074790415),
			_(e, t, n, s, o, { type: "SwitchStatement", discriminant: r, cases: c })
		);
	}
	function yo(e, t, u, i, n, s, o) {
		L(e, t), P(e, t | 32768, 67174411);
		let r = te(e, t, 0, 1, e.tokenPos, e.linePos, e.colPos);
		P(e, t | 32768, 16);
		let c = bt(e, t, u, i);
		return _(e, t, n, s, o, { type: "WhileStatement", test: r, body: c });
	}
	function bt(e, t, u, i) {
		return _t(
			e,
			((t | 134217728) ^ 134217728) | 131072,
			u,
			0,
			{ loop: 1, $: i },
			0,
			e.tokenPos,
			e.linePos,
			e.colPos
		);
	}
	function wo(e, t, u, i, n, s) {
		t & 131072 || E(e, 66), L(e, t);
		let o = null;
		if (!(e.flags & 1) && e.token & 143360) {
			let { tokenValue: r } = e;
			(o = x(e, t | 32768)), u0(e, u, r, 1) || E(e, 135, r);
		}
		return (
			se(e, t | 32768),
			_(e, t, i, n, s, { type: "ContinueStatement", label: o })
		);
	}
	function Bo(e, t, u, i, n, s) {
		L(e, t | 32768);
		let o = null;
		if (!(e.flags & 1) && e.token & 143360) {
			let { tokenValue: r } = e;
			(o = x(e, t | 32768)), u0(e, u, r, 0) || E(e, 135, r);
		} else t & 135168 || E(e, 67);
		return (
			se(e, t | 32768), _(e, t, i, n, s, { type: "BreakStatement", label: o })
		);
	}
	function Mo(e, t, u, i, n, s, o) {
		L(e, t), t & 1024 && E(e, 89), P(e, t | 32768, 67174411);
		let r = te(e, t, 0, 1, e.tokenPos, e.linePos, e.colPos);
		P(e, t | 32768, 16);
		let c = _t(e, t, u, 2, i, 0, e.tokenPos, e.linePos, e.colPos);
		return _(e, t, n, s, o, { type: "WithStatement", object: r, body: c });
	}
	function Fo(e, t, u, i, n) {
		return (
			L(e, t | 32768),
			se(e, t | 32768),
			_(e, t, u, i, n, { type: "DebuggerStatement" })
		);
	}
	function vo(e, t, u, i, n, s, o) {
		L(e, t | 32768);
		let r = u ? G(u, 32) : void 0,
			c = gt(e, t, r, { $: i }, e.tokenPos, e.linePos, e.colPos),
			{ tokenPos: h, linePos: T, colPos: b } = e,
			d = U(e, t | 32768, 20559) ? Uo(e, t, u, i, h, T, b) : null,
			D = null;
		if (e.token === 20568) {
			L(e, t | 32768);
			let k = r ? G(u, 4) : void 0;
			D = gt(e, t, k, { $: i }, e.tokenPos, e.linePos, e.colPos);
		}
		return (
			!d && !D && E(e, 86),
			_(e, t, n, s, o, {
				type: "TryStatement",
				block: c,
				handler: d,
				finalizer: D,
			})
		);
	}
	function Uo(e, t, u, i, n, s, o) {
		let r = null,
			c = u;
		U(e, t, 67174411) &&
			(u && (u = G(u, 4)),
			(r = g0(
				e,
				t,
				u,
				(e.token & 2097152) === 2097152 ? 256 : 512,
				0,
				e.tokenPos,
				e.linePos,
				e.colPos
			)),
			e.token === 18 ? E(e, 84) : e.token === 1077936157 && E(e, 85),
			P(e, t | 32768, 16),
			u && (c = G(u, 64)));
		let h = gt(e, t, c, { $: i }, e.tokenPos, e.linePos, e.colPos);
		return _(e, t, n, s, o, { type: "CatchClause", param: r, body: h });
	}
	function Ho(e, t, u, i, n, s) {
		u && (u = G(u, 2));
		let o = 540672;
		t = ((t | o) ^ o) | 262144;
		let { body: r } = gt(e, t, u, {}, i, n, s);
		return _(e, t, i, n, s, { type: "StaticBlock", body: r });
	}
	function po(e, t, u, i, n, s, o) {
		L(e, t | 32768);
		let r = bt(e, t, u, i);
		P(e, t, 20580), P(e, t | 32768, 67174411);
		let c = te(e, t, 0, 1, e.tokenPos, e.linePos, e.colPos);
		return (
			P(e, t | 32768, 16),
			U(e, t | 32768, 1074790417),
			_(e, t, n, s, o, { type: "DoWhileStatement", body: r, test: c })
		);
	}
	function xo(e, t, u, i, n, s, o) {
		let { token: r, tokenValue: c } = e,
			h = x(e, t);
		if (e.token & 2240512) {
			let T = Ke(e, t, u, 8, 0);
			return (
				se(e, t | 32768),
				_(e, t, n, s, o, {
					type: "VariableDeclaration",
					kind: "let",
					declarations: T,
				})
			);
		}
		if (((e.assignable = 1), t & 1024 && E(e, 83), e.token === 21))
			return ju(e, t, u, i, {}, c, h, r, 0, n, s, o);
		if (e.token === 10) {
			let T;
			t & 64 && (T = uu(e, t, c)),
				(e.flags = (e.flags | 128) ^ 128),
				(h = Dt(e, t, T, [h], 0, n, s, o));
		} else (h = q(e, t, h, 0, 0, n, s, o)), (h = j(e, t, 0, 0, n, s, o, h));
		return (
			e.token === 18 && (h = Ne(e, t, 0, n, s, o, h)), $e(e, t, h, n, s, o)
		);
	}
	function pu(e, t, u, i, n, s, o, r) {
		L(e, t);
		let c = Ke(e, t, u, i, n);
		return (
			se(e, t | 32768),
			_(e, t, s, o, r, {
				type: "VariableDeclaration",
				kind: i & 8 ? "let" : "const",
				declarations: c,
			})
		);
	}
	function s0(e, t, u, i, n, s, o) {
		L(e, t);
		let r = Ke(e, t, u, 4, i);
		return (
			se(e, t | 32768),
			_(e, t, n, s, o, {
				type: "VariableDeclaration",
				kind: "var",
				declarations: r,
			})
		);
	}
	function Ke(e, t, u, i, n) {
		let s = 1,
			o = [xn(e, t, u, i, n)];
		for (; U(e, t, 18); ) s++, o.push(xn(e, t, u, i, n));
		return s > 1 && n & 32 && e.token & 262144 && E(e, 59, X[e.token & 255]), o;
	}
	function xn(e, t, u, i, n) {
		let { token: s, tokenPos: o, linePos: r, colPos: c } = e,
			h = null,
			T = g0(e, t, u, i, n, o, r, c);
		return (
			e.token === 1077936157
				? (L(e, t | 32768),
					(h = W(e, t, 1, 0, e.tokenPos, e.linePos, e.colPos)),
					(n & 32 || !(s & 2097152)) &&
						(e.token === 274549 ||
							(e.token === 8738868 && (s & 2097152 || !(i & 4) || t & 1024))) &&
						ze(o, e.line, e.index - 3, 58, e.token === 274549 ? "of" : "in"))
				: (i & 16 || (s & 2097152) > 0) &&
					(e.token & 262144) !== 262144 &&
					E(e, 57, i & 16 ? "const" : "destructuring"),
			_(e, t, o, r, c, { type: "VariableDeclarator", id: T, init: h })
		);
	}
	function qo(e, t, u, i, n, s, o) {
		L(e, t);
		let r =
			((t & 4194304) > 0 || ((t & 2048) > 0 && (t & 8192) > 0)) &&
			U(e, t, 209008);
		P(e, t | 32768, 67174411), u && (u = G(u, 1));
		let c = null,
			h = null,
			T = 0,
			b = null,
			d = e.token === 86090 || e.token === 241739 || e.token === 86092,
			D,
			{ token: k, tokenPos: R, linePos: O, colPos: y } = e;
		if (
			(d
				? k === 241739
					? ((b = x(e, t)),
						e.token & 2240512
							? (e.token === 8738868
									? t & 1024 && E(e, 65)
									: (b = _(e, t, R, O, y, {
											type: "VariableDeclaration",
											kind: "let",
											declarations: Ke(e, t | 134217728, u, 8, 32),
										})),
								(e.assignable = 1))
							: t & 1024
								? E(e, 65)
								: ((d = !1),
									(e.assignable = 1),
									(b = q(e, t, b, 0, 0, R, O, y)),
									e.token === 274549 && E(e, 112)))
					: (L(e, t),
						(b = _(
							e,
							t,
							R,
							O,
							y,
							k === 86090
								? {
										type: "VariableDeclaration",
										kind: "var",
										declarations: Ke(e, t | 134217728, u, 4, 32),
									}
								: {
										type: "VariableDeclaration",
										kind: "const",
										declarations: Ke(e, t | 134217728, u, 16, 32),
									}
						)),
						(e.assignable = 1))
				: k === 1074790417
					? r && E(e, 80)
					: (k & 2097152) === 2097152
						? ((b =
								k === 2162700
									? fe(e, t, void 0, 1, 0, 0, 2, 32, R, O, y)
									: le(e, t, void 0, 1, 0, 0, 2, 32, R, O, y)),
							(T = e.destructible),
							t & 256 && T & 64 && E(e, 61),
							(e.assignable = T & 16 ? 2 : 1),
							(b = q(
								e,
								t | 134217728,
								b,
								0,
								0,
								e.tokenPos,
								e.linePos,
								e.colPos
							)))
						: (b = ce(e, t | 134217728, 1, 0, 1, R, O, y)),
			(e.token & 262144) === 262144)
		) {
			if (e.token === 274549) {
				e.assignable & 2 && E(e, 78, r ? "await" : "of"),
					Te(e, b),
					L(e, t | 32768),
					(D = W(e, t, 1, 0, e.tokenPos, e.linePos, e.colPos)),
					P(e, t | 32768, 16);
				let w = bt(e, t, u, i);
				return _(e, t, n, s, o, {
					type: "ForOfStatement",
					left: b,
					right: D,
					body: w,
					await: r,
				});
			}
			e.assignable & 2 && E(e, 78, "in"),
				Te(e, b),
				L(e, t | 32768),
				r && E(e, 80),
				(D = te(e, t, 0, 1, e.tokenPos, e.linePos, e.colPos)),
				P(e, t | 32768, 16);
			let K = bt(e, t, u, i);
			return _(e, t, n, s, o, {
				type: "ForInStatement",
				body: K,
				left: b,
				right: D,
			});
		}
		r && E(e, 80),
			d ||
				(T & 8 && e.token !== 1077936157 && E(e, 78, "loop"),
				(b = j(e, t | 134217728, 0, 0, R, O, y, b))),
			e.token === 18 && (b = Ne(e, t, 0, e.tokenPos, e.linePos, e.colPos, b)),
			P(e, t | 32768, 1074790417),
			e.token !== 1074790417 &&
				(c = te(e, t, 0, 1, e.tokenPos, e.linePos, e.colPos)),
			P(e, t | 32768, 1074790417),
			e.token !== 16 && (h = te(e, t, 0, 1, e.tokenPos, e.linePos, e.colPos)),
			P(e, t | 32768, 16);
		let M = bt(e, t, u, i);
		return _(e, t, n, s, o, {
			type: "ForStatement",
			init: b,
			test: c,
			update: h,
			body: M,
		});
	}
	function a0(e, t, u) {
		return (
			Xu(t, e.token) || E(e, 115),
			(e.token & 537079808) === 537079808 && E(e, 116),
			u && Oe(e, t, u, e.tokenValue, 8, 0),
			x(e, t)
		);
	}
	function Yo(e, t, u) {
		let i = e.tokenPos,
			n = e.linePos,
			s = e.colPos;
		L(e, t);
		let o = null,
			{ tokenPos: r, linePos: c, colPos: h } = e,
			T = [];
		if (e.token === 134283267) o = ie(e, t);
		else {
			if (e.token & 143360) {
				let b = a0(e, t, u);
				if (
					((T = [
						_(e, t, r, c, h, { type: "ImportDefaultSpecifier", local: b }),
					]),
					U(e, t, 18))
				)
					switch (e.token) {
						case 8457014:
							T.push(qn(e, t, u));
							break;
						case 2162700:
							Yn(e, t, u, T);
							break;
						default:
							E(e, 105);
					}
			} else
				switch (e.token) {
					case 8457014:
						T = [qn(e, t, u)];
						break;
					case 2162700:
						Yn(e, t, u, T);
						break;
					case 67174411:
						return r0(e, t, i, n, s);
					case 67108877:
						return o0(e, t, i, n, s);
					default:
						E(e, 28, X[e.token & 255]);
				}
			o = Vo(e, t);
		}
		return (
			se(e, t | 32768),
			_(e, t, i, n, s, { type: "ImportDeclaration", specifiers: T, source: o })
		);
	}
	function qn(e, t, u) {
		let { tokenPos: i, linePos: n, colPos: s } = e;
		return (
			L(e, t),
			P(e, t, 77934),
			(e.token & 134217728) === 134217728 &&
				ze(i, e.line, e.index, 28, X[e.token & 255]),
			_(e, t, i, n, s, { type: "ImportNamespaceSpecifier", local: a0(e, t, u) })
		);
	}
	function Vo(e, t) {
		return (
			U(e, t, 12404) || E(e, 28, X[e.token & 255]),
			e.token !== 134283267 && E(e, 103, "Import"),
			ie(e, t)
		);
	}
	function Yn(e, t, u, i) {
		for (L(e, t); e.token & 143360; ) {
			let { token: n, tokenValue: s, tokenPos: o, linePos: r, colPos: c } = e,
				h = x(e, t),
				T;
			U(e, t, 77934)
				? ((e.token & 134217728) === 134217728 || e.token === 18
						? E(e, 104)
						: Jt(e, t, 16, e.token, 0),
					(s = e.tokenValue),
					(T = x(e, t)))
				: (Jt(e, t, 16, n, 0), (T = h)),
				u && Oe(e, t, u, s, 8, 0),
				i.push(
					_(e, t, o, r, c, { type: "ImportSpecifier", local: T, imported: h })
				),
				e.token !== 1074790415 && P(e, t, 18);
		}
		return P(e, t, 1074790415), i;
	}
	function o0(e, t, u, i, n) {
		let s = l0(
			e,
			t,
			_(e, t, u, i, n, { type: "Identifier", name: "import" }),
			u,
			i,
			n
		);
		return (
			(s = q(e, t, s, 0, 0, u, i, n)),
			(s = j(e, t, 0, 0, u, i, n, s)),
			e.token === 18 && (s = Ne(e, t, 0, u, i, n, s)),
			$e(e, t, s, u, i, n)
		);
	}
	function r0(e, t, u, i, n) {
		let s = f0(e, t, 0, u, i, n);
		return (
			(s = q(e, t, s, 0, 0, u, i, n)),
			e.token === 18 && (s = Ne(e, t, 0, u, i, n, s)),
			$e(e, t, s, u, i, n)
		);
	}
	function Wo(e, t, u) {
		let i = e.tokenPos,
			n = e.linePos,
			s = e.colPos;
		L(e, t | 32768);
		let o = [],
			r = null,
			c = null,
			h;
		if (U(e, t | 32768, 20563)) {
			switch (e.token) {
				case 86106: {
					r = Pe(e, t, u, 4, 1, 1, 0, e.tokenPos, e.linePos, e.colPos);
					break;
				}
				case 133:
				case 86096:
					r = xu(e, t, u, 1, e.tokenPos, e.linePos, e.colPos);
					break;
				case 209007:
					let { tokenPos: T, linePos: b, colPos: d } = e;
					r = x(e, t);
					let { flags: D } = e;
					D & 1 ||
						(e.token === 86106
							? (r = Pe(e, t, u, 4, 1, 1, 1, T, b, d))
							: e.token === 67174411
								? ((r = Zu(e, t, r, 1, 1, 0, D, T, b, d)),
									(r = q(e, t, r, 0, 0, T, b, d)),
									(r = j(e, t, 0, 0, T, b, d, r)))
								: e.token & 143360 &&
									(u && (u = uu(e, t, e.tokenValue)),
									(r = x(e, t)),
									(r = Dt(e, t, u, [r], 1, T, b, d))));
					break;
				default:
					(r = W(e, t, 1, 0, e.tokenPos, e.linePos, e.colPos)),
						se(e, t | 32768);
			}
			return (
				u && Fe(e, "default"),
				_(e, t, i, n, s, { type: "ExportDefaultDeclaration", declaration: r })
			);
		}
		switch (e.token) {
			case 8457014: {
				L(e, t);
				let D = null;
				return (
					U(e, t, 77934) && (u && Fe(e, e.tokenValue), (D = x(e, t))),
					P(e, t, 12404),
					e.token !== 134283267 && E(e, 103, "Export"),
					(c = ie(e, t)),
					se(e, t | 32768),
					_(e, t, i, n, s, {
						type: "ExportAllDeclaration",
						source: c,
						exported: D,
					})
				);
			}
			case 2162700: {
				L(e, t);
				let D = [],
					k = [];
				for (; e.token & 143360; ) {
					let { tokenPos: R, tokenValue: O, linePos: y, colPos: M } = e,
						K = x(e, t),
						w;
					e.token === 77934
						? (L(e, t),
							(e.token & 134217728) === 134217728 && E(e, 104),
							u && (D.push(e.tokenValue), k.push(O)),
							(w = x(e, t)))
						: (u && (D.push(e.tokenValue), k.push(e.tokenValue)), (w = K)),
						o.push(
							_(e, t, R, y, M, {
								type: "ExportSpecifier",
								local: K,
								exported: w,
							})
						),
						e.token !== 1074790415 && P(e, t, 18);
				}
				if ((P(e, t, 1074790415), U(e, t, 12404)))
					e.token !== 134283267 && E(e, 103, "Export"), (c = ie(e, t));
				else if (u) {
					let R = 0,
						O = D.length;
					for (; R < O; R++) Fe(e, D[R]);
					for (R = 0, O = k.length; R < O; R++) bo(e, k[R]);
				}
				se(e, t | 32768);
				break;
			}
			case 86096:
				r = xu(e, t, u, 2, e.tokenPos, e.linePos, e.colPos);
				break;
			case 86106:
				r = Pe(e, t, u, 4, 1, 2, 0, e.tokenPos, e.linePos, e.colPos);
				break;
			case 241739:
				r = pu(e, t, u, 8, 64, e.tokenPos, e.linePos, e.colPos);
				break;
			case 86092:
				r = pu(e, t, u, 16, 64, e.tokenPos, e.linePos, e.colPos);
				break;
			case 86090:
				r = s0(e, t, u, 64, e.tokenPos, e.linePos, e.colPos);
				break;
			case 209007:
				let { tokenPos: T, linePos: b, colPos: d } = e;
				if ((L(e, t), !(e.flags & 1) && e.token === 86106)) {
					(r = Pe(e, t, u, 4, 1, 2, 1, T, b, d)),
						u && ((h = r.id ? r.id.name : ""), Fe(e, h));
					break;
				}
			default:
				E(e, 28, X[e.token & 255]);
		}
		return _(e, t, i, n, s, {
			type: "ExportNamedDeclaration",
			declaration: r,
			specifiers: o,
			source: c,
		});
	}
	function W(e, t, u, i, n, s, o) {
		let r = oe(e, t, 2, 0, u, i, 1, n, s, o);
		return (r = q(e, t, r, i, 0, n, s, o)), j(e, t, i, 0, n, s, o, r);
	}
	function Ne(e, t, u, i, n, s, o) {
		let r = [o];
		for (; U(e, t | 32768, 18); )
			r.push(W(e, t, 1, u, e.tokenPos, e.linePos, e.colPos));
		return _(e, t, i, n, s, { type: "SequenceExpression", expressions: r });
	}
	function te(e, t, u, i, n, s, o) {
		let r = W(e, t, i, u, n, s, o);
		return e.token === 18 ? Ne(e, t, u, n, s, o, r) : r;
	}
	function j(e, t, u, i, n, s, o, r) {
		let { token: c } = e;
		if ((c & 4194304) === 4194304) {
			e.assignable & 2 && E(e, 24),
				((!i && c === 1077936157 && r.type === "ArrayExpression") ||
					r.type === "ObjectExpression") &&
					Te(e, r),
				L(e, t | 32768);
			let h = W(e, t, 1, u, e.tokenPos, e.linePos, e.colPos);
			return (
				(e.assignable = 2),
				_(
					e,
					t,
					n,
					s,
					o,
					i
						? { type: "AssignmentPattern", left: r, right: h }
						: {
								type: "AssignmentExpression",
								left: r,
								operator: X[c & 255],
								right: h,
							}
				)
			);
		}
		return (
			(c & 8454144) === 8454144 && (r = Re(e, t, u, n, s, o, 4, c, r)),
			U(e, t | 32768, 22) && (r = ve(e, t, r, n, s, o)),
			r
		);
	}
	function Qt(e, t, u, i, n, s, o, r) {
		let { token: c } = e;
		L(e, t | 32768);
		let h = W(e, t, 1, u, e.tokenPos, e.linePos, e.colPos);
		return (
			(r = _(
				e,
				t,
				n,
				s,
				o,
				i
					? { type: "AssignmentPattern", left: r, right: h }
					: {
							type: "AssignmentExpression",
							left: r,
							operator: X[c & 255],
							right: h,
						}
			)),
			(e.assignable = 2),
			r
		);
	}
	function ve(e, t, u, i, n, s) {
		let o = W(
			e,
			(t | 134217728) ^ 134217728,
			1,
			0,
			e.tokenPos,
			e.linePos,
			e.colPos
		);
		P(e, t | 32768, 21), (e.assignable = 1);
		let r = W(e, t, 1, 0, e.tokenPos, e.linePos, e.colPos);
		return (
			(e.assignable = 2),
			_(e, t, i, n, s, {
				type: "ConditionalExpression",
				test: u,
				consequent: o,
				alternate: r,
			})
		);
	}
	function Re(e, t, u, i, n, s, o, r, c) {
		let h = -((t & 134217728) > 0) & 8738868,
			T,
			b;
		for (
			e.assignable = 2;
			e.token & 8454144 &&
			((T = e.token),
			(b = T & 3840),
			((T & 524288 && r & 268435456) || (r & 524288 && T & 268435456)) &&
				E(e, 160),
			!(b + ((T === 8457273) << 8) - ((h === T) << 12) <= o));

		)
			L(e, t | 32768),
				(c = _(e, t, i, n, s, {
					type:
						T & 524288 || T & 268435456
							? "LogicalExpression"
							: "BinaryExpression",
					left: c,
					right: Re(
						e,
						t,
						u,
						e.tokenPos,
						e.linePos,
						e.colPos,
						b,
						T,
						ce(e, t, 0, u, 1, e.tokenPos, e.linePos, e.colPos)
					),
					operator: X[T & 255],
				}));
		return e.token === 1077936157 && E(e, 24), c;
	}
	function Xo(e, t, u, i, n, s, o) {
		u || E(e, 0);
		let r = e.token;
		L(e, t | 32768);
		let c = ce(e, t, 0, o, 1, e.tokenPos, e.linePos, e.colPos);
		return (
			e.token === 8457273 && E(e, 31),
			t & 1024 &&
				r === 16863278 &&
				(c.type === "Identifier" ? E(e, 118) : mo(c) && E(e, 124)),
			(e.assignable = 2),
			_(e, t, i, n, s, {
				type: "UnaryExpression",
				operator: X[r & 255],
				argument: c,
				prefix: !0,
			})
		);
	}
	function Qo(e, t, u, i, n, s, o, r, c) {
		let { token: h } = e,
			T = x(e, t),
			{ flags: b } = e;
		if (!(b & 1)) {
			if (e.token === 86106) return h0(e, t, 1, u, o, r, c);
			if ((e.token & 143360) === 143360)
				return i || E(e, 0), T0(e, t, n, o, r, c);
		}
		return !s && e.token === 67174411
			? Zu(e, t, T, n, 1, 0, b, o, r, c)
			: e.token === 10
				? (Qu(e, t, h),
					s && E(e, 49),
					nu(e, t, e.tokenValue, T, s, n, 0, o, r, c))
				: ((e.assignable = 1), T);
	}
	function jo(e, t, u, i, n, s, o) {
		if ((u && (e.destructible |= 256), t & 2097152)) {
			L(e, t | 32768),
				t & 8388608 && E(e, 30),
				i || E(e, 24),
				e.token === 22 && E(e, 121);
			let r = null,
				c = !1;
			return (
				e.flags & 1 ||
					((c = U(e, t | 32768, 8457014)),
					(e.token & 77824 || c) &&
						(r = W(e, t, 1, 0, e.tokenPos, e.linePos, e.colPos))),
				(e.assignable = 2),
				_(e, t, n, s, o, { type: "YieldExpression", argument: r, delegate: c })
			);
		}
		return t & 1024 && E(e, 95, "yield"), $u(e, t, n, s, o);
	}
	function Ko(e, t, u, i, n, s, o) {
		if ((i && (e.destructible |= 128), t & 4194304 || (t & 2048 && t & 8192))) {
			u && E(e, 0),
				t & 8388608 && ze(e.index, e.line, e.index, 29),
				L(e, t | 32768);
			let r = ce(e, t, 0, 0, 1, e.tokenPos, e.linePos, e.colPos);
			return (
				e.token === 8457273 && E(e, 31),
				(e.assignable = 2),
				_(e, t, n, s, o, { type: "AwaitExpression", argument: r })
			);
		}
		return t & 2048 && E(e, 96), $u(e, t, n, s, o);
	}
	function iu(e, t, u, i, n, s) {
		let { tokenPos: o, linePos: r, colPos: c } = e;
		P(e, t | 32768, 2162700);
		let h = [],
			T = t;
		if (e.token !== 1074790415) {
			for (; e.token === 134283267; ) {
				let { index: b, tokenPos: d, tokenValue: D, token: k } = e,
					R = ie(e, t);
				Zn(e, b, d, D) &&
					((t |= 1024),
					e.flags & 128 && ze(e.index, e.line, e.tokenPos, 64),
					e.flags & 64 && ze(e.index, e.line, e.tokenPos, 8)),
					h.push(Ku(e, t, R, k, d, e.linePos, e.colPos));
			}
			t & 1024 &&
				(n &&
					((n & 537079808) === 537079808 && E(e, 116),
					(n & 36864) === 36864 && E(e, 38)),
				e.flags & 512 && E(e, 116),
				e.flags & 256 && E(e, 115)),
				t & 64 && u && s !== void 0 && !(T & 1024) && !(t & 8192) && tu(s);
		}
		for (
			e.flags = (e.flags | 512 | 256 | 64) ^ 832,
				e.destructible = (e.destructible | 256) ^ 256;
			e.token !== 1074790415;

		)
			h.push(Ct(e, t, u, 4, {}));
		return (
			P(e, i & 24 ? t | 32768 : t, 1074790415),
			(e.flags &= -193),
			e.token === 1077936157 && E(e, 24),
			_(e, t, o, r, c, { type: "BlockStatement", body: h })
		);
	}
	function Go(e, t, u, i, n) {
		switch ((L(e, t), e.token)) {
			case 67108991:
				E(e, 162);
			case 67174411: {
				t & 524288 || E(e, 26),
					t & 16384 && !(t & 33554432) && E(e, 27),
					(e.assignable = 2);
				break;
			}
			case 69271571:
			case 67108877: {
				t & 262144 || E(e, 27),
					t & 16384 && !(t & 33554432) && E(e, 27),
					(e.assignable = 1);
				break;
			}
			default:
				E(e, 28, "super");
		}
		return _(e, t, u, i, n, { type: "Super" });
	}
	function ce(e, t, u, i, n, s, o, r) {
		let c = oe(e, t, 2, 0, u, i, n, s, o, r);
		return q(e, t, c, i, 0, s, o, r);
	}
	function zo(e, t, u, i, n, s) {
		e.assignable & 2 && E(e, 53);
		let { token: o } = e;
		return (
			L(e, t),
			(e.assignable = 2),
			_(e, t, i, n, s, {
				type: "UpdateExpression",
				argument: u,
				operator: X[o & 255],
				prefix: !1,
			})
		);
	}
	function q(e, t, u, i, n, s, o, r) {
		if ((e.token & 33619968) === 33619968 && !(e.flags & 1))
			u = zo(e, t, u, s, o, r);
		else if ((e.token & 67108864) === 67108864) {
			switch (((t = (t | 134217728) ^ 134217728), e.token)) {
				case 67108877: {
					L(e, (t | 268435456 | 8192) ^ 8192),
						t & 16384 &&
							e.token === 131 &&
							e.tokenValue === "super" &&
							E(e, 27),
						(e.assignable = 1);
					let c = c0(e, t | 65536);
					u = _(e, t, s, o, r, {
						type: "MemberExpression",
						object: u,
						computed: !1,
						property: c,
					});
					break;
				}
				case 69271571: {
					let c = !1;
					(e.flags & 2048) === 2048 &&
						((c = !0), (e.flags = (e.flags | 2048) ^ 2048)),
						L(e, t | 32768);
					let { tokenPos: h, linePos: T, colPos: b } = e,
						d = te(e, t, i, 1, h, T, b);
					P(e, t, 20),
						(e.assignable = 1),
						(u = _(e, t, s, o, r, {
							type: "MemberExpression",
							object: u,
							computed: !0,
							property: d,
						})),
						c && (e.flags |= 2048);
					break;
				}
				case 67174411: {
					if ((e.flags & 1024) === 1024)
						return (e.flags = (e.flags | 1024) ^ 1024), u;
					let c = !1;
					(e.flags & 2048) === 2048 &&
						((c = !0), (e.flags = (e.flags | 2048) ^ 2048));
					let h = Ju(e, t, i);
					(e.assignable = 2),
						(u = _(e, t, s, o, r, {
							type: "CallExpression",
							callee: u,
							arguments: h,
						})),
						c && (e.flags |= 2048);
					break;
				}
				case 67108991: {
					L(e, (t | 268435456 | 8192) ^ 8192),
						(e.flags |= 2048),
						(e.assignable = 2),
						(u = Jo(e, t, u, s, o, r));
					break;
				}
				default:
					(e.flags & 2048) === 2048 && E(e, 161),
						(e.assignable = 2),
						(u = _(e, t, s, o, r, {
							type: "TaggedTemplateExpression",
							tag: u,
							quasi:
								e.token === 67174408
									? zu(e, t | 65536)
									: Gu(e, t, e.tokenPos, e.linePos, e.colPos),
						}));
			}
			u = q(e, t, u, 0, 1, s, o, r);
		}
		return (
			n === 0 &&
				(e.flags & 2048) === 2048 &&
				((e.flags = (e.flags | 2048) ^ 2048),
				(u = _(e, t, s, o, r, { type: "ChainExpression", expression: u }))),
			u
		);
	}
	function Jo(e, t, u, i, n, s) {
		let o = !1,
			r;
		if (
			((e.token === 69271571 || e.token === 67174411) &&
				(e.flags & 2048) === 2048 &&
				((o = !0), (e.flags = (e.flags | 2048) ^ 2048)),
			e.token === 69271571)
		) {
			L(e, t | 32768);
			let { tokenPos: c, linePos: h, colPos: T } = e,
				b = te(e, t, 0, 1, c, h, T);
			P(e, t, 20),
				(e.assignable = 2),
				(r = _(e, t, i, n, s, {
					type: "MemberExpression",
					object: u,
					computed: !0,
					optional: !0,
					property: b,
				}));
		} else if (e.token === 67174411) {
			let c = Ju(e, t, 0);
			(e.assignable = 2),
				(r = _(e, t, i, n, s, {
					type: "CallExpression",
					callee: u,
					arguments: c,
					optional: !0,
				}));
		} else {
			e.token & 143360 || E(e, 155);
			let c = x(e, t);
			(e.assignable = 2),
				(r = _(e, t, i, n, s, {
					type: "MemberExpression",
					object: u,
					computed: !1,
					optional: !0,
					property: c,
				}));
		}
		return o && (e.flags |= 2048), r;
	}
	function c0(e, t) {
		return (
			!(e.token & 143360) && e.token !== 131 && E(e, 155),
			t & 1 && e.token === 131
				? eu(e, t, e.tokenPos, e.linePos, e.colPos)
				: x(e, t)
		);
	}
	function $o(e, t, u, i, n, s, o) {
		u && E(e, 54), i || E(e, 0);
		let { token: r } = e;
		L(e, t | 32768);
		let c = ce(e, t, 0, 0, 1, e.tokenPos, e.linePos, e.colPos);
		return (
			e.assignable & 2 && E(e, 53),
			(e.assignable = 2),
			_(e, t, n, s, o, {
				type: "UpdateExpression",
				argument: c,
				operator: X[r & 255],
				prefix: !0,
			})
		);
	}
	function oe(e, t, u, i, n, s, o, r, c, h) {
		if ((e.token & 143360) === 143360) {
			switch (e.token) {
				case 209008:
					return Ko(e, t, i, s, r, c, h);
				case 241773:
					return jo(e, t, s, n, r, c, h);
				case 209007:
					return Qo(e, t, s, o, n, i, r, c, h);
			}
			let { token: T, tokenValue: b } = e,
				d = x(e, t | 65536);
			return e.token === 10
				? (o || E(e, 0), Qu(e, t, T), nu(e, t, b, d, i, n, 0, r, c, h))
				: (t & 16384 && T === 537079928 && E(e, 127),
					T === 241739 && (t & 1024 && E(e, 110), u & 24 && E(e, 98)),
					(e.assignable = t & 1024 && (T & 537079808) === 537079808 ? 2 : 1),
					d);
		}
		if ((e.token & 134217728) === 134217728) return ie(e, t);
		switch (e.token) {
			case 33619995:
			case 33619996:
				return $o(e, t, i, o, r, c, h);
			case 16863278:
			case 16842800:
			case 16842801:
			case 25233970:
			case 25233971:
			case 16863277:
			case 16863279:
				return Xo(e, t, o, r, c, h, s);
			case 86106:
				return h0(e, t, 0, s, r, c, h);
			case 2162700:
				return n1(e, t, n ? 0 : 1, s, r, c, h);
			case 69271571:
				return i1(e, t, n ? 0 : 1, s, r, c, h);
			case 67174411:
				return a1(e, t | 65536, n, 1, 0, r, c, h);
			case 86021:
			case 86022:
			case 86023:
				return t1(e, t, r, c, h);
			case 86113:
				return u1(e, t);
			case 65540:
				return c1(e, t, r, c, h);
			case 133:
			case 86096:
				return l1(e, t, s, r, c, h);
			case 86111:
				return Go(e, t, r, c, h);
			case 67174409:
				return Gu(e, t, r, c, h);
			case 67174408:
				return zu(e, t);
			case 86109:
				return o1(e, t, s, r, c, h);
			case 134283389:
				return d0(e, t, r, c, h);
			case 131:
				return eu(e, t, r, c, h);
			case 86108:
				return Zo(e, t, i, s, r, c, h);
			case 8456258:
				if (t & 16) return ti(e, t, 1, r, c, h);
			default:
				if (Xu(t, e.token)) return $u(e, t, r, c, h);
				E(e, 28, X[e.token & 255]);
		}
	}
	function Zo(e, t, u, i, n, s, o) {
		let r = x(e, t);
		return e.token === 67108877
			? l0(e, t, r, n, s, o)
			: (u && E(e, 138),
				(r = f0(e, t, i, n, s, o)),
				(e.assignable = 2),
				q(e, t, r, i, 0, n, s, o));
	}
	function l0(e, t, u, i, n, s) {
		return (
			t & 2048 || E(e, 164),
			L(e, t),
			e.token !== 143495 &&
				e.tokenValue !== "meta" &&
				E(e, 28, X[e.token & 255]),
			(e.assignable = 2),
			_(e, t, i, n, s, { type: "MetaProperty", meta: u, property: x(e, t) })
		);
	}
	function f0(e, t, u, i, n, s) {
		P(e, t | 32768, 67174411), e.token === 14 && E(e, 139);
		let o = W(e, t, 1, u, e.tokenPos, e.linePos, e.colPos);
		return (
			P(e, t, 16), _(e, t, i, n, s, { type: "ImportExpression", source: o })
		);
	}
	function d0(e, t, u, i, n) {
		let { tokenRaw: s, tokenValue: o } = e;
		return (
			L(e, t),
			(e.assignable = 2),
			_(
				e,
				t,
				u,
				i,
				n,
				t & 512
					? { type: "Literal", value: o, bigint: s.slice(0, -1), raw: s }
					: { type: "Literal", value: o, bigint: s.slice(0, -1) }
			)
		);
	}
	function Gu(e, t, u, i, n) {
		e.assignable = 2;
		let { tokenValue: s, tokenRaw: o, tokenPos: r, linePos: c, colPos: h } = e;
		P(e, t, 67174409);
		let T = [Kt(e, t, s, o, r, c, h, !0)];
		return _(e, t, u, i, n, {
			type: "TemplateLiteral",
			expressions: [],
			quasis: T,
		});
	}
	function zu(e, t) {
		t = (t | 134217728) ^ 134217728;
		let { tokenValue: u, tokenRaw: i, tokenPos: n, linePos: s, colPos: o } = e;
		P(e, t | 32768, 67174408);
		let r = [Kt(e, t, u, i, n, s, o, !1)],
			c = [te(e, t, 0, 1, e.tokenPos, e.linePos, e.colPos)];
		for (
			e.token !== 1074790415 && E(e, 81);
			(e.token = so(e, t)) !== 67174409;

		) {
			let {
				tokenValue: h,
				tokenRaw: T,
				tokenPos: b,
				linePos: d,
				colPos: D,
			} = e;
			P(e, t | 32768, 67174408),
				r.push(Kt(e, t, h, T, b, d, D, !1)),
				c.push(te(e, t, 0, 1, e.tokenPos, e.linePos, e.colPos)),
				e.token !== 1074790415 && E(e, 81);
		}
		{
			let {
				tokenValue: h,
				tokenRaw: T,
				tokenPos: b,
				linePos: d,
				colPos: D,
			} = e;
			P(e, t, 67174409), r.push(Kt(e, t, h, T, b, d, D, !0));
		}
		return _(e, t, n, s, o, {
			type: "TemplateLiteral",
			expressions: c,
			quasis: r,
		});
	}
	function Kt(e, t, u, i, n, s, o, r) {
		let c = _(e, t, n, s, o, {
				type: "TemplateElement",
				value: { cooked: u, raw: i },
				tail: r,
			}),
			h = r ? 1 : 2;
		return (
			t & 2 &&
				((c.start += 1), (c.range[0] += 1), (c.end -= h), (c.range[1] -= h)),
			t & 4 && ((c.loc.start.column += 1), (c.loc.end.column -= h)),
			c
		);
	}
	function e1(e, t, u, i, n) {
		(t = (t | 134217728) ^ 134217728), P(e, t | 32768, 14);
		let s = W(e, t, 1, 0, e.tokenPos, e.linePos, e.colPos);
		return (
			(e.assignable = 1),
			_(e, t, u, i, n, { type: "SpreadElement", argument: s })
		);
	}
	function Ju(e, t, u) {
		L(e, t | 32768);
		let i = [];
		if (e.token === 16) return L(e, t | 65536), i;
		for (
			;
			e.token !== 16 &&
			(e.token === 14
				? i.push(e1(e, t, e.tokenPos, e.linePos, e.colPos))
				: i.push(W(e, t, 1, u, e.tokenPos, e.linePos, e.colPos)),
			!(e.token !== 18 || (L(e, t | 32768), e.token === 16)));

		);
		return P(e, t, 16), i;
	}
	function x(e, t) {
		let { tokenValue: u, tokenPos: i, linePos: n, colPos: s } = e;
		return L(e, t), _(e, t, i, n, s, { type: "Identifier", name: u });
	}
	function ie(e, t) {
		let { tokenValue: u, tokenRaw: i, tokenPos: n, linePos: s, colPos: o } = e;
		return e.token === 134283389
			? d0(e, t, n, s, o)
			: (L(e, t),
				(e.assignable = 2),
				_(
					e,
					t,
					n,
					s,
					o,
					t & 512
						? { type: "Literal", value: u, raw: i }
						: { type: "Literal", value: u }
				));
	}
	function t1(e, t, u, i, n) {
		let s = X[e.token & 255],
			o = e.token === 86023 ? null : s === "true";
		return (
			L(e, t),
			(e.assignable = 2),
			_(
				e,
				t,
				u,
				i,
				n,
				t & 512
					? { type: "Literal", value: o, raw: s }
					: { type: "Literal", value: o }
			)
		);
	}
	function u1(e, t) {
		let { tokenPos: u, linePos: i, colPos: n } = e;
		return (
			L(e, t), (e.assignable = 2), _(e, t, u, i, n, { type: "ThisExpression" })
		);
	}
	function Pe(e, t, u, i, n, s, o, r, c, h) {
		L(e, t | 32768);
		let T = n ? Wu(e, t, 8457014) : 0,
			b = null,
			d,
			D = u ? pe() : void 0;
		if (e.token === 67174411) s & 1 || E(e, 37, "Function");
		else {
			let O = i & 4 && (!(t & 8192) || !(t & 2048)) ? 4 : 64;
			e0(e, t | ((t & 3072) << 11), e.token),
				u &&
					(O & 4
						? i0(e, t, u, e.tokenValue, O)
						: Oe(e, t, u, e.tokenValue, O, i),
					(D = G(D, 256)),
					s && s & 2 && Fe(e, e.tokenValue)),
				(d = e.token),
				e.token & 143360 ? (b = x(e, t)) : E(e, 28, X[e.token & 255]);
		}
		(t =
			((t | 32243712) ^ 32243712) |
			67108864 |
			((o * 2 + T) << 21) |
			(T ? 0 : 268435456)),
			u && (D = G(D, 512));
		let k = m0(e, t | 8388608, D, 0, 1),
			R = iu(
				e,
				(t | 8192 | 4096 | 131072) ^ 143360,
				u ? G(D, 128) : D,
				8,
				d,
				u ? D.scopeError : void 0
			);
		return _(e, t, r, c, h, {
			type: "FunctionDeclaration",
			id: b,
			params: k,
			body: R,
			async: o === 1,
			generator: T === 1,
		});
	}
	function h0(e, t, u, i, n, s, o) {
		L(e, t | 32768);
		let r = Wu(e, t, 8457014),
			c = (u * 2 + r) << 21,
			h = null,
			T,
			b = t & 64 ? pe() : void 0;
		(e.token & 176128) > 0 &&
			(e0(e, ((t | 32243712) ^ 32243712) | c, e.token),
			b && (b = G(b, 256)),
			(T = e.token),
			(h = x(e, t))),
			(t = ((t | 32243712) ^ 32243712) | 67108864 | c | (r ? 0 : 268435456)),
			b && (b = G(b, 512));
		let d = m0(e, t | 8388608, b, i, 1),
			D = iu(e, t & -134377473, b && G(b, 128), 0, T, void 0);
		return (
			(e.assignable = 2),
			_(e, t, n, s, o, {
				type: "FunctionExpression",
				id: h,
				params: d,
				body: D,
				async: u === 1,
				generator: r === 1,
			})
		);
	}
	function i1(e, t, u, i, n, s, o) {
		let r = le(e, t, void 0, u, i, 0, 2, 0, n, s, o);
		return (
			t & 256 && e.destructible & 64 && E(e, 61),
			e.destructible & 8 && E(e, 60),
			r
		);
	}
	function le(e, t, u, i, n, s, o, r, c, h, T) {
		L(e, t | 32768);
		let b = [],
			d = 0;
		for (t = (t | 134217728) ^ 134217728; e.token !== 20; )
			if (U(e, t | 32768, 18)) b.push(null);
			else {
				let k,
					{ token: R, tokenPos: O, linePos: y, colPos: M, tokenValue: K } = e;
				if (R & 143360)
					if (
						((k = oe(e, t, o, 0, 1, n, 1, O, y, M)), e.token === 1077936157)
					) {
						e.assignable & 2 && E(e, 24),
							L(e, t | 32768),
							u && Le(e, t, u, K, o, r);
						let w = W(e, t, 1, n, e.tokenPos, e.linePos, e.colPos);
						(k = _(
							e,
							t,
							O,
							y,
							M,
							s
								? { type: "AssignmentPattern", left: k, right: w }
								: {
										type: "AssignmentExpression",
										operator: "=",
										left: k,
										right: w,
									}
						)),
							(d |=
								e.destructible & 256
									? 256
									: 0 | (e.destructible & 128)
										? 128
										: 0);
					} else
						e.token === 18 || e.token === 20
							? (e.assignable & 2 ? (d |= 16) : u && Le(e, t, u, K, o, r),
								(d |=
									e.destructible & 256
										? 256
										: 0 | (e.destructible & 128)
											? 128
											: 0))
							: ((d |= o & 1 ? 32 : o & 2 ? 0 : 16),
								(k = q(e, t, k, n, 0, O, y, M)),
								e.token !== 18 && e.token !== 20
									? (e.token !== 1077936157 && (d |= 16),
										(k = j(e, t, n, s, O, y, M, k)))
									: e.token !== 1077936157 &&
										(d |= e.assignable & 2 ? 16 : 32));
				else
					R & 2097152
						? ((k =
								e.token === 2162700
									? fe(e, t, u, 0, n, s, o, r, O, y, M)
									: le(e, t, u, 0, n, s, o, r, O, y, M)),
							(d |= e.destructible),
							(e.assignable = e.destructible & 16 ? 2 : 1),
							e.token === 18 || e.token === 20
								? e.assignable & 2 && (d |= 16)
								: e.destructible & 8
									? E(e, 69)
									: ((k = q(e, t, k, n, 0, O, y, M)),
										(d = e.assignable & 2 ? 16 : 0),
										e.token !== 18 && e.token !== 20
											? (k = j(e, t, n, s, O, y, M, k))
											: e.token !== 1077936157 &&
												(d |= e.assignable & 2 ? 16 : 32)))
						: R === 14
							? ((k = Ze(e, t, u, 20, o, r, 0, n, s, O, y, M)),
								(d |= e.destructible),
								e.token !== 18 && e.token !== 20 && E(e, 28, X[e.token & 255]))
							: ((k = ce(e, t, 1, 0, 1, O, y, M)),
								e.token !== 18 && e.token !== 20
									? ((k = j(e, t, n, s, O, y, M, k)),
										!(o & 3) && R === 67174411 && (d |= 16))
									: e.assignable & 2
										? (d |= 16)
										: R === 67174411 &&
											(d |= e.assignable & 1 && o & 3 ? 32 : 16));
				if ((b.push(k), U(e, t | 32768, 18))) {
					if (e.token === 20) break;
				} else break;
			}
		P(e, t, 20);
		let D = _(e, t, c, h, T, {
			type: s ? "ArrayPattern" : "ArrayExpression",
			elements: b,
		});
		return !i && e.token & 4194304
			? E0(e, t, d, n, s, c, h, T, D)
			: ((e.destructible = d), D);
	}
	function E0(e, t, u, i, n, s, o, r, c) {
		e.token !== 1077936157 && E(e, 24),
			L(e, t | 32768),
			u & 16 && E(e, 24),
			n || Te(e, c);
		let { tokenPos: h, linePos: T, colPos: b } = e,
			d = W(e, t, 1, i, h, T, b);
		return (
			(e.destructible =
				((u | 64 | 8) ^ 72) |
				(e.destructible & 128 ? 128 : 0) |
				(e.destructible & 256 ? 256 : 0)),
			_(
				e,
				t,
				s,
				o,
				r,
				n
					? { type: "AssignmentPattern", left: c, right: d }
					: { type: "AssignmentExpression", left: c, operator: "=", right: d }
			)
		);
	}
	function Ze(e, t, u, i, n, s, o, r, c, h, T, b) {
		L(e, t | 32768);
		let d = null,
			D = 0,
			{ token: k, tokenValue: R, tokenPos: O, linePos: y, colPos: M } = e;
		if (k & 143360)
			(e.assignable = 1),
				(d = oe(e, t, n, 0, 1, r, 1, O, y, M)),
				(k = e.token),
				(d = q(e, t, d, r, 0, O, y, M)),
				e.token !== 18 &&
					e.token !== i &&
					(e.assignable & 2 && e.token === 1077936157 && E(e, 69),
					(D |= 16),
					(d = j(e, t, r, c, O, y, M, d))),
				e.assignable & 2
					? (D |= 16)
					: k === i || k === 18
						? u && Le(e, t, u, R, n, s)
						: (D |= 32),
				(D |= e.destructible & 128 ? 128 : 0);
		else if (k === i) E(e, 39);
		else if (k & 2097152)
			(d =
				e.token === 2162700
					? fe(e, t, u, 1, r, c, n, s, O, y, M)
					: le(e, t, u, 1, r, c, n, s, O, y, M)),
				(k = e.token),
				k !== 1077936157 && k !== i && k !== 18
					? (e.destructible & 8 && E(e, 69),
						(d = q(e, t, d, r, 0, O, y, M)),
						(D |= e.assignable & 2 ? 16 : 0),
						(e.token & 4194304) === 4194304
							? (e.token !== 1077936157 && (D |= 16),
								(d = j(e, t, r, c, O, y, M, d)))
							: ((e.token & 8454144) === 8454144 &&
									(d = Re(e, t, 1, O, y, M, 4, k, d)),
								U(e, t | 32768, 22) && (d = ve(e, t, d, O, y, M)),
								(D |= e.assignable & 2 ? 16 : 32)))
					: (D |= i === 1074790415 && k !== 1077936157 ? 16 : e.destructible);
		else {
			(D |= 32), (d = ce(e, t, 1, r, 1, e.tokenPos, e.linePos, e.colPos));
			let { token: K, tokenPos: w, linePos: Y, colPos: S } = e;
			return (
				K === 1077936157 && K !== i && K !== 18
					? (e.assignable & 2 && E(e, 24),
						(d = j(e, t, r, c, w, Y, S, d)),
						(D |= 16))
					: (K === 18 ? (D |= 16) : K !== i && (d = j(e, t, r, c, w, Y, S, d)),
						(D |= e.assignable & 1 ? 32 : 16)),
				(e.destructible = D),
				e.token !== i && e.token !== 18 && E(e, 156),
				_(e, t, h, T, b, {
					type: c ? "RestElement" : "SpreadElement",
					argument: d,
				})
			);
		}
		if (e.token !== i)
			if ((n & 1 && (D |= o ? 16 : 32), U(e, t | 32768, 1077936157))) {
				D & 16 && E(e, 24), Te(e, d);
				let K = W(e, t, 1, r, e.tokenPos, e.linePos, e.colPos);
				(d = _(
					e,
					t,
					O,
					y,
					M,
					c
						? { type: "AssignmentPattern", left: d, right: K }
						: { type: "AssignmentExpression", left: d, operator: "=", right: K }
				)),
					(D = 16);
			} else D |= 16;
		return (
			(e.destructible = D),
			_(e, t, h, T, b, {
				type: c ? "RestElement" : "SpreadElement",
				argument: d,
			})
		);
	}
	function me(e, t, u, i, n, s, o) {
		let r = u & 64 ? 14680064 : 31981568;
		t = ((t | r) ^ r) | ((u & 88) << 18) | 100925440;
		let c = t & 64 ? G(pe(), 512) : void 0,
			h = s1(e, t | 8388608, c, u, 1, i);
		c && (c = G(c, 128));
		let T = iu(e, t & -134230017, c, 0, void 0, void 0);
		return _(e, t, n, s, o, {
			type: "FunctionExpression",
			params: h,
			body: T,
			async: (u & 16) > 0,
			generator: (u & 8) > 0,
			id: null,
		});
	}
	function n1(e, t, u, i, n, s, o) {
		let r = fe(e, t, void 0, u, i, 0, 2, 0, n, s, o);
		return (
			t & 256 && e.destructible & 64 && E(e, 61),
			e.destructible & 8 && E(e, 60),
			r
		);
	}
	function fe(e, t, u, i, n, s, o, r, c, h, T) {
		L(e, t);
		let b = [],
			d = 0,
			D = 0;
		for (t = (t | 134217728) ^ 134217728; e.token !== 1074790415; ) {
			let { token: R, tokenValue: O, linePos: y, colPos: M, tokenPos: K } = e;
			if (R === 14) b.push(Ze(e, t, u, 1074790415, o, r, 0, n, s, K, y, M));
			else {
				let w = 0,
					Y = null,
					S,
					de = e.token;
				if (e.token & 143360 || e.token === 121)
					if (
						((Y = x(e, t)),
						e.token === 18 || e.token === 1074790415 || e.token === 1077936157)
					)
						if (
							((w |= 4),
							t & 1024 && (R & 537079808) === 537079808
								? (d |= 16)
								: Jt(e, t, o, R, 0),
							u && Le(e, t, u, O, o, r),
							U(e, t | 32768, 1077936157))
						) {
							d |= 8;
							let B = W(e, t, 1, n, e.tokenPos, e.linePos, e.colPos);
							(d |=
								e.destructible & 256
									? 256
									: 0 | (e.destructible & 128)
										? 128
										: 0),
								(S = _(e, t, K, y, M, {
									type: "AssignmentPattern",
									left: t & 536870912 ? Object.assign({}, Y) : Y,
									right: B,
								}));
						} else
							(d |= (R === 209008 ? 128 : 0) | (R === 121 ? 16 : 0)),
								(S = t & 536870912 ? Object.assign({}, Y) : Y);
					else if (U(e, t | 32768, 21)) {
						let { tokenPos: B, linePos: v, colPos: F } = e;
						if ((O === "__proto__" && D++, e.token & 143360)) {
							let ye = e.token,
								qe = e.tokenValue;
							(d |= de === 121 ? 16 : 0),
								(S = oe(e, t, o, 0, 1, n, 1, B, v, F));
							let { token: ge } = e;
							(S = q(e, t, S, n, 0, B, v, F)),
								e.token === 18 || e.token === 1074790415
									? ge === 1077936157 || ge === 1074790415 || ge === 18
										? ((d |= e.destructible & 128 ? 128 : 0),
											e.assignable & 2
												? (d |= 16)
												: u &&
													(ye & 143360) === 143360 &&
													Le(e, t, u, qe, o, r))
										: (d |= e.assignable & 1 ? 32 : 16)
									: (e.token & 4194304) === 4194304
										? (e.assignable & 2
												? (d |= 16)
												: ge !== 1077936157
													? (d |= 32)
													: u && Le(e, t, u, qe, o, r),
											(S = j(e, t, n, s, B, v, F, S)))
										: ((d |= 16),
											(e.token & 8454144) === 8454144 &&
												(S = Re(e, t, 1, B, v, F, 4, ge, S)),
											U(e, t | 32768, 22) && (S = ve(e, t, S, B, v, F)));
						} else
							(e.token & 2097152) === 2097152
								? ((S =
										e.token === 69271571
											? le(e, t, u, 0, n, s, o, r, B, v, F)
											: fe(e, t, u, 0, n, s, o, r, B, v, F)),
									(d = e.destructible),
									(e.assignable = d & 16 ? 2 : 1),
									e.token === 18 || e.token === 1074790415
										? e.assignable & 2 && (d |= 16)
										: e.destructible & 8
											? E(e, 69)
											: ((S = q(e, t, S, n, 0, B, v, F)),
												(d = e.assignable & 2 ? 16 : 0),
												(e.token & 4194304) === 4194304
													? (S = Qt(e, t, n, s, B, v, F, S))
													: ((e.token & 8454144) === 8454144 &&
															(S = Re(e, t, 1, B, v, F, 4, R, S)),
														U(e, t | 32768, 22) && (S = ve(e, t, S, B, v, F)),
														(d |= e.assignable & 2 ? 16 : 32))))
								: ((S = ce(e, t, 1, n, 1, B, v, F)),
									(d |= e.assignable & 1 ? 32 : 16),
									e.token === 18 || e.token === 1074790415
										? e.assignable & 2 && (d |= 16)
										: ((S = q(e, t, S, n, 0, B, v, F)),
											(d = e.assignable & 2 ? 16 : 0),
											e.token !== 18 &&
												R !== 1074790415 &&
												(e.token !== 1077936157 && (d |= 16),
												(S = j(e, t, n, s, B, v, F, S)))));
					} else
						e.token === 69271571
							? ((d |= 16),
								R === 209007 && (w |= 16),
								(w |= (R === 12402 ? 256 : R === 12403 ? 512 : 1) | 2),
								(Y = je(e, t, n)),
								(d |= e.assignable),
								(S = me(e, t, w, n, e.tokenPos, e.linePos, e.colPos)))
							: e.token & 143360
								? ((d |= 16),
									R === 121 && E(e, 93),
									R === 209007 && (e.flags & 1 && E(e, 129), (w |= 16)),
									(Y = x(e, t)),
									(w |= R === 12402 ? 256 : R === 12403 ? 512 : 1),
									(S = me(e, t, w, n, e.tokenPos, e.linePos, e.colPos)))
								: e.token === 67174411
									? ((d |= 16),
										(w |= 1),
										(S = me(e, t, w, n, e.tokenPos, e.linePos, e.colPos)))
									: e.token === 8457014
										? ((d |= 16),
											R === 12402
												? E(e, 40)
												: R === 12403
													? E(e, 41)
													: R === 143483 && E(e, 93),
											L(e, t),
											(w |= 9 | (R === 209007 ? 16 : 0)),
											e.token & 143360
												? (Y = x(e, t))
												: (e.token & 134217728) === 134217728
													? (Y = ie(e, t))
													: e.token === 69271571
														? ((w |= 2), (Y = je(e, t, n)), (d |= e.assignable))
														: E(e, 28, X[e.token & 255]),
											(S = me(e, t, w, n, e.tokenPos, e.linePos, e.colPos)))
										: (e.token & 134217728) === 134217728
											? (R === 209007 && (w |= 16),
												(w |= R === 12402 ? 256 : R === 12403 ? 512 : 1),
												(d |= 16),
												(Y = ie(e, t)),
												(S = me(e, t, w, n, e.tokenPos, e.linePos, e.colPos)))
											: E(e, 130);
				else if ((e.token & 134217728) === 134217728)
					if (((Y = ie(e, t)), e.token === 21)) {
						P(e, t | 32768, 21);
						let { tokenPos: B, linePos: v, colPos: F } = e;
						if ((O === "__proto__" && D++, e.token & 143360)) {
							S = oe(e, t, o, 0, 1, n, 1, B, v, F);
							let { token: ye, tokenValue: qe } = e;
							(S = q(e, t, S, n, 0, B, v, F)),
								e.token === 18 || e.token === 1074790415
									? ye === 1077936157 || ye === 1074790415 || ye === 18
										? e.assignable & 2
											? (d |= 16)
											: u && Le(e, t, u, qe, o, r)
										: (d |= e.assignable & 1 ? 32 : 16)
									: e.token === 1077936157
										? (e.assignable & 2 && (d |= 16),
											(S = j(e, t, n, s, B, v, F, S)))
										: ((d |= 16), (S = j(e, t, n, s, B, v, F, S)));
						} else
							(e.token & 2097152) === 2097152
								? ((S =
										e.token === 69271571
											? le(e, t, u, 0, n, s, o, r, B, v, F)
											: fe(e, t, u, 0, n, s, o, r, B, v, F)),
									(d = e.destructible),
									(e.assignable = d & 16 ? 2 : 1),
									e.token === 18 || e.token === 1074790415
										? e.assignable & 2 && (d |= 16)
										: (e.destructible & 8) !== 8 &&
											((S = q(e, t, S, n, 0, B, v, F)),
											(d = e.assignable & 2 ? 16 : 0),
											(e.token & 4194304) === 4194304
												? (S = Qt(e, t, n, s, B, v, F, S))
												: ((e.token & 8454144) === 8454144 &&
														(S = Re(e, t, 1, B, v, F, 4, R, S)),
													U(e, t | 32768, 22) && (S = ve(e, t, S, B, v, F)),
													(d |= e.assignable & 2 ? 16 : 32))))
								: ((S = ce(e, t, 1, 0, 1, B, v, F)),
									(d |= e.assignable & 1 ? 32 : 16),
									e.token === 18 || e.token === 1074790415
										? e.assignable & 2 && (d |= 16)
										: ((S = q(e, t, S, n, 0, B, v, F)),
											(d = e.assignable & 1 ? 0 : 16),
											e.token !== 18 &&
												e.token !== 1074790415 &&
												(e.token !== 1077936157 && (d |= 16),
												(S = j(e, t, n, s, B, v, F, S)))));
					} else
						e.token === 67174411
							? ((w |= 1),
								(S = me(e, t, w, n, e.tokenPos, e.linePos, e.colPos)),
								(d = e.assignable | 16))
							: E(e, 131);
				else if (e.token === 69271571)
					if (
						((Y = je(e, t, n)),
						(d |= e.destructible & 256 ? 256 : 0),
						(w |= 2),
						e.token === 21)
					) {
						L(e, t | 32768);
						let {
							tokenPos: B,
							linePos: v,
							colPos: F,
							tokenValue: ye,
							token: qe,
						} = e;
						if (e.token & 143360) {
							S = oe(e, t, o, 0, 1, n, 1, B, v, F);
							let { token: ge } = e;
							(S = q(e, t, S, n, 0, B, v, F)),
								(e.token & 4194304) === 4194304
									? ((d |= e.assignable & 2 ? 16 : ge === 1077936157 ? 0 : 32),
										(S = Qt(e, t, n, s, B, v, F, S)))
									: e.token === 18 || e.token === 1074790415
										? ge === 1077936157 || ge === 1074790415 || ge === 18
											? e.assignable & 2
												? (d |= 16)
												: u && (qe & 143360) === 143360 && Le(e, t, u, ye, o, r)
											: (d |= e.assignable & 1 ? 32 : 16)
										: ((d |= 16), (S = j(e, t, n, s, B, v, F, S)));
						} else
							(e.token & 2097152) === 2097152
								? ((S =
										e.token === 69271571
											? le(e, t, u, 0, n, s, o, r, B, v, F)
											: fe(e, t, u, 0, n, s, o, r, B, v, F)),
									(d = e.destructible),
									(e.assignable = d & 16 ? 2 : 1),
									e.token === 18 || e.token === 1074790415
										? e.assignable & 2 && (d |= 16)
										: d & 8
											? E(e, 60)
											: ((S = q(e, t, S, n, 0, B, v, F)),
												(d = e.assignable & 2 ? d | 16 : 0),
												(e.token & 4194304) === 4194304
													? (e.token !== 1077936157 && (d |= 16),
														(S = Qt(e, t, n, s, B, v, F, S)))
													: ((e.token & 8454144) === 8454144 &&
															(S = Re(e, t, 1, B, v, F, 4, R, S)),
														U(e, t | 32768, 22) && (S = ve(e, t, S, B, v, F)),
														(d |= e.assignable & 2 ? 16 : 32))))
								: ((S = ce(e, t, 1, 0, 1, B, v, F)),
									(d |= e.assignable & 1 ? 32 : 16),
									e.token === 18 || e.token === 1074790415
										? e.assignable & 2 && (d |= 16)
										: ((S = q(e, t, S, n, 0, B, v, F)),
											(d = e.assignable & 1 ? 0 : 16),
											e.token !== 18 &&
												e.token !== 1074790415 &&
												(e.token !== 1077936157 && (d |= 16),
												(S = j(e, t, n, s, B, v, F, S)))));
					} else
						e.token === 67174411
							? ((w |= 1), (S = me(e, t, w, n, e.tokenPos, y, M)), (d = 16))
							: E(e, 42);
				else if (R === 8457014)
					if ((P(e, t | 32768, 8457014), (w |= 8), e.token & 143360)) {
						let { token: B, line: v, index: F } = e;
						(Y = x(e, t)),
							(w |= 1),
							e.token === 67174411
								? ((d |= 16),
									(S = me(e, t, w, n, e.tokenPos, e.linePos, e.colPos)))
								: ze(
										F,
										v,
										F,
										B === 209007
											? 44
											: B === 12402 || e.token === 12403
												? 43
												: 45,
										X[B & 255]
									);
					} else
						(e.token & 134217728) === 134217728
							? ((d |= 16),
								(Y = ie(e, t)),
								(w |= 1),
								(S = me(e, t, w, n, K, y, M)))
							: e.token === 69271571
								? ((d |= 16),
									(w |= 3),
									(Y = je(e, t, n)),
									(S = me(e, t, w, n, e.tokenPos, e.linePos, e.colPos)))
								: E(e, 123);
				else E(e, 28, X[R & 255]);
				(d |= e.destructible & 128 ? 128 : 0),
					(e.destructible = d),
					b.push(
						_(e, t, K, y, M, {
							type: "Property",
							key: Y,
							value: S,
							kind: w & 768 ? (w & 512 ? "set" : "get") : "init",
							computed: (w & 2) > 0,
							method: (w & 1) > 0,
							shorthand: (w & 4) > 0,
						})
					);
			}
			if (((d |= e.destructible), e.token !== 18)) break;
			L(e, t);
		}
		P(e, t, 1074790415), D > 1 && (d |= 64);
		let k = _(e, t, c, h, T, {
			type: s ? "ObjectPattern" : "ObjectExpression",
			properties: b,
		});
		return !i && e.token & 4194304
			? E0(e, t, d, n, s, c, h, T, k)
			: ((e.destructible = d), k);
	}
	function s1(e, t, u, i, n, s) {
		P(e, t, 67174411);
		let o = [];
		if (((e.flags = (e.flags | 128) ^ 128), e.token === 16))
			return i & 512 && E(e, 35, "Setter", "one", ""), L(e, t), o;
		i & 256 && E(e, 35, "Getter", "no", "s"),
			i & 512 && e.token === 14 && E(e, 36),
			(t = (t | 134217728) ^ 134217728);
		let r = 0,
			c = 0;
		for (; e.token !== 18; ) {
			let h = null,
				{ tokenPos: T, linePos: b, colPos: d } = e;
			if (
				(e.token & 143360
					? (t & 1024 ||
							((e.token & 36864) === 36864 && (e.flags |= 256),
							(e.token & 537079808) === 537079808 && (e.flags |= 512)),
						(h = ei(e, t, u, i | 1, 0, T, b, d)))
					: (e.token === 2162700
							? (h = fe(e, t, u, 1, s, 1, n, 0, T, b, d))
							: e.token === 69271571
								? (h = le(e, t, u, 1, s, 1, n, 0, T, b, d))
								: e.token === 14 &&
									(h = Ze(e, t, u, 16, n, 0, 0, s, 1, T, b, d)),
						(c = 1),
						e.destructible & 48 && E(e, 48)),
				e.token === 1077936157)
			) {
				L(e, t | 32768), (c = 1);
				let D = W(e, t, 1, 0, e.tokenPos, e.linePos, e.colPos);
				h = _(e, t, T, b, d, { type: "AssignmentPattern", left: h, right: D });
			}
			if ((r++, o.push(h), !U(e, t, 18) || e.token === 16)) break;
		}
		return (
			i & 512 && r !== 1 && E(e, 35, "Setter", "one", ""),
			u && u.scopeError !== void 0 && tu(u.scopeError),
			c && (e.flags |= 128),
			P(e, t, 16),
			o
		);
	}
	function je(e, t, u) {
		L(e, t | 32768);
		let i = W(
			e,
			(t | 134217728) ^ 134217728,
			1,
			u,
			e.tokenPos,
			e.linePos,
			e.colPos
		);
		return P(e, t, 20), i;
	}
	function a1(e, t, u, i, n, s, o, r) {
		e.flags = (e.flags | 128) ^ 128;
		let { tokenPos: c, linePos: h, colPos: T } = e;
		L(e, t | 32768 | 268435456);
		let b = t & 64 ? G(pe(), 1024) : void 0;
		if (((t = (t | 134217728) ^ 134217728), U(e, t, 16)))
			return Zt(e, t, b, [], u, 0, s, o, r);
		let d = 0;
		e.destructible &= -385;
		let D,
			k = [],
			R = 0,
			O = 0,
			{ tokenPos: y, linePos: M, colPos: K } = e;
		for (e.assignable = 1; e.token !== 16; ) {
			let { token: w, tokenPos: Y, linePos: S, colPos: de } = e;
			if (w & 143360)
				b && Oe(e, t, b, e.tokenValue, 1, 0),
					(D = oe(e, t, i, 0, 1, 1, 1, Y, S, de)),
					e.token === 16 || e.token === 18
						? e.assignable & 2
							? ((d |= 16), (O = 1))
							: ((w & 537079808) === 537079808 || (w & 36864) === 36864) &&
								(O = 1)
						: (e.token === 1077936157 ? (O = 1) : (d |= 16),
							(D = q(e, t, D, 1, 0, Y, S, de)),
							e.token !== 16 &&
								e.token !== 18 &&
								(D = j(e, t, 1, 0, Y, S, de, D)));
			else if ((w & 2097152) === 2097152)
				(D =
					w === 2162700
						? fe(e, t | 268435456, b, 0, 1, 0, i, n, Y, S, de)
						: le(e, t | 268435456, b, 0, 1, 0, i, n, Y, S, de)),
					(d |= e.destructible),
					(O = 1),
					(e.assignable = 2),
					e.token !== 16 &&
						e.token !== 18 &&
						(d & 8 && E(e, 119),
						(D = q(e, t, D, 0, 0, Y, S, de)),
						(d |= 16),
						e.token !== 16 &&
							e.token !== 18 &&
							(D = j(e, t, 0, 0, Y, S, de, D)));
			else if (w === 14) {
				(D = Ze(e, t, b, 16, i, n, 0, 1, 0, Y, S, de)),
					e.destructible & 16 && E(e, 72),
					(O = 1),
					R && (e.token === 16 || e.token === 18) && k.push(D),
					(d |= 8);
				break;
			} else {
				if (
					((d |= 16),
					(D = W(e, t, 1, 1, Y, S, de)),
					R && (e.token === 16 || e.token === 18) && k.push(D),
					e.token === 18 && (R || ((R = 1), (k = [D]))),
					R)
				) {
					for (; U(e, t | 32768, 18); )
						k.push(W(e, t, 1, 1, e.tokenPos, e.linePos, e.colPos));
					(e.assignable = 2),
						(D = _(e, t, y, M, K, {
							type: "SequenceExpression",
							expressions: k,
						}));
				}
				return P(e, t, 16), (e.destructible = d), D;
			}
			if (
				(R && (e.token === 16 || e.token === 18) && k.push(D),
				!U(e, t | 32768, 18))
			)
				break;
			if ((R || ((R = 1), (k = [D])), e.token === 16)) {
				d |= 8;
				break;
			}
		}
		return (
			R &&
				((e.assignable = 2),
				(D = _(e, t, y, M, K, { type: "SequenceExpression", expressions: k }))),
			P(e, t, 16),
			d & 16 && d & 8 && E(e, 146),
			(d |= e.destructible & 256 ? 256 : 0 | (e.destructible & 128) ? 128 : 0),
			e.token === 10
				? (d & 48 && E(e, 47),
					t & 4196352 && d & 128 && E(e, 29),
					t & 2098176 && d & 256 && E(e, 30),
					O && (e.flags |= 128),
					Zt(e, t, b, R ? k : [D], u, 0, s, o, r))
				: (d & 8 && E(e, 140),
					(e.destructible = ((e.destructible | 256) ^ 256) | d),
					t & 128
						? _(e, t, c, h, T, {
								type: "ParenthesizedExpression",
								expression: D,
							})
						: D)
		);
	}
	function $u(e, t, u, i, n) {
		let { tokenValue: s } = e,
			o = x(e, t);
		if (((e.assignable = 1), e.token === 10)) {
			let r;
			return (
				t & 64 && (r = uu(e, t, s)),
				(e.flags = (e.flags | 128) ^ 128),
				Dt(e, t, r, [o], 0, u, i, n)
			);
		}
		return o;
	}
	function nu(e, t, u, i, n, s, o, r, c, h) {
		s || E(e, 55), n && E(e, 49), (e.flags &= -129);
		let T = t & 64 ? uu(e, t, u) : void 0;
		return Dt(e, t, T, [i], o, r, c, h);
	}
	function Zt(e, t, u, i, n, s, o, r, c) {
		n || E(e, 55);
		for (let h = 0; h < i.length; ++h) Te(e, i[h]);
		return Dt(e, t, u, i, s, o, r, c);
	}
	function Dt(e, t, u, i, n, s, o, r) {
		e.flags & 1 && E(e, 46),
			P(e, t | 32768, 10),
			(t = ((t | 15728640) ^ 15728640) | (n << 22));
		let c = e.token !== 2162700,
			h;
		if ((u && u.scopeError !== void 0 && tu(u.scopeError), c))
			h = W(
				e,
				t & 16384 ? t | 33554432 : t,
				1,
				0,
				e.tokenPos,
				e.linePos,
				e.colPos
			);
		else {
			switch (
				(u && (u = G(u, 128)),
				(h = iu(
					e,
					(t | 134221824 | 8192 | 16384) ^ 134246400,
					u,
					16,
					void 0,
					void 0
				)),
				e.token)
			) {
				case 69271571:
					e.flags & 1 || E(e, 113);
					break;
				case 67108877:
				case 67174409:
				case 22:
					E(e, 114);
				case 67174411:
					e.flags & 1 || E(e, 113), (e.flags |= 1024);
					break;
			}
			(e.token & 8454144) === 8454144 &&
				!(e.flags & 1) &&
				E(e, 28, X[e.token & 255]),
				(e.token & 33619968) === 33619968 && E(e, 122);
		}
		return (
			(e.assignable = 2),
			_(e, t, s, o, r, {
				type: "ArrowFunctionExpression",
				params: i,
				body: h,
				async: n === 1,
				expression: c,
			})
		);
	}
	function m0(e, t, u, i, n) {
		P(e, t, 67174411), (e.flags = (e.flags | 128) ^ 128);
		let s = [];
		if (U(e, t, 16)) return s;
		t = (t | 134217728) ^ 134217728;
		let o = 0;
		for (; e.token !== 18; ) {
			let r,
				{ tokenPos: c, linePos: h, colPos: T } = e;
			if (
				(e.token & 143360
					? (t & 1024 ||
							((e.token & 36864) === 36864 && (e.flags |= 256),
							(e.token & 537079808) === 537079808 && (e.flags |= 512)),
						(r = ei(e, t, u, n | 1, 0, c, h, T)))
					: (e.token === 2162700
							? (r = fe(e, t, u, 1, i, 1, n, 0, c, h, T))
							: e.token === 69271571
								? (r = le(e, t, u, 1, i, 1, n, 0, c, h, T))
								: e.token === 14
									? (r = Ze(e, t, u, 16, n, 0, 0, i, 1, c, h, T))
									: E(e, 28, X[e.token & 255]),
						(o = 1),
						e.destructible & 48 && E(e, 48)),
				e.token === 1077936157)
			) {
				L(e, t | 32768), (o = 1);
				let b = W(e, t, 1, i, e.tokenPos, e.linePos, e.colPos);
				r = _(e, t, c, h, T, { type: "AssignmentPattern", left: r, right: b });
			}
			if ((s.push(r), !U(e, t, 18) || e.token === 16)) break;
		}
		return (
			o && (e.flags |= 128),
			u && (o || t & 1024) && u.scopeError !== void 0 && tu(u.scopeError),
			P(e, t, 16),
			s
		);
	}
	function Gt(e, t, u, i, n, s, o) {
		let { token: r } = e;
		if (r & 67108864) {
			if (r === 67108877) {
				L(e, t | 268435456), (e.assignable = 1);
				let c = c0(e, t);
				return Gt(
					e,
					t,
					_(e, t, n, s, o, {
						type: "MemberExpression",
						object: u,
						computed: !1,
						property: c,
					}),
					0,
					n,
					s,
					o
				);
			} else if (r === 69271571) {
				L(e, t | 32768);
				let { tokenPos: c, linePos: h, colPos: T } = e,
					b = te(e, t, i, 1, c, h, T);
				return (
					P(e, t, 20),
					(e.assignable = 1),
					Gt(
						e,
						t,
						_(e, t, n, s, o, {
							type: "MemberExpression",
							object: u,
							computed: !0,
							property: b,
						}),
						0,
						n,
						s,
						o
					)
				);
			} else if (r === 67174408 || r === 67174409)
				return (
					(e.assignable = 2),
					Gt(
						e,
						t,
						_(e, t, n, s, o, {
							type: "TaggedTemplateExpression",
							tag: u,
							quasi:
								e.token === 67174408
									? zu(e, t | 65536)
									: Gu(e, t, e.tokenPos, e.linePos, e.colPos),
						}),
						0,
						n,
						s,
						o
					)
				);
		}
		return u;
	}
	function o1(e, t, u, i, n, s) {
		let o = x(e, t | 32768),
			{ tokenPos: r, linePos: c, colPos: h } = e;
		if (U(e, t, 67108877)) {
			if (t & 67108864 && e.token === 143494)
				return (e.assignable = 2), r1(e, t, o, i, n, s);
			E(e, 92);
		}
		(e.assignable = 2),
			(e.token & 16842752) === 16842752 && E(e, 63, X[e.token & 255]);
		let T = oe(e, t, 2, 1, 0, u, 1, r, c, h);
		(t = (t | 134217728) ^ 134217728), e.token === 67108991 && E(e, 163);
		let b = Gt(e, t, T, u, r, c, h);
		return (
			(e.assignable = 2),
			_(e, t, i, n, s, {
				type: "NewExpression",
				callee: b,
				arguments: e.token === 67174411 ? Ju(e, t, u) : [],
			})
		);
	}
	function r1(e, t, u, i, n, s) {
		let o = x(e, t);
		return _(e, t, i, n, s, { type: "MetaProperty", meta: u, property: o });
	}
	function T0(e, t, u, i, n, s) {
		return (
			e.token === 209008 && E(e, 29),
			t & 2098176 && e.token === 241773 && E(e, 30),
			(e.token & 537079808) === 537079808 && (e.flags |= 512),
			nu(e, t, e.tokenValue, x(e, t), 0, u, 1, i, n, s)
		);
	}
	function Zu(e, t, u, i, n, s, o, r, c, h) {
		L(e, t | 32768);
		let T = t & 64 ? G(pe(), 1024) : void 0;
		if (((t = (t | 134217728) ^ 134217728), U(e, t, 16)))
			return e.token === 10
				? (o & 1 && E(e, 46), Zt(e, t, T, [], i, 1, r, c, h))
				: _(e, t, r, c, h, {
						type: "CallExpression",
						callee: u,
						arguments: [],
					});
		let b = 0,
			d = null,
			D = 0;
		e.destructible = (e.destructible | 256 | 128) ^ 384;
		let k = [];
		for (; e.token !== 16; ) {
			let { token: R, tokenPos: O, linePos: y, colPos: M } = e;
			if (R & 143360)
				T && Oe(e, t, T, e.tokenValue, n, 0),
					(d = oe(e, t, n, 0, 1, 1, 1, O, y, M)),
					e.token === 16 || e.token === 18
						? e.assignable & 2
							? ((b |= 16), (D = 1))
							: (R & 537079808) === 537079808
								? (e.flags |= 512)
								: (R & 36864) === 36864 && (e.flags |= 256)
						: (e.token === 1077936157 ? (D = 1) : (b |= 16),
							(d = q(e, t, d, 1, 0, O, y, M)),
							e.token !== 16 &&
								e.token !== 18 &&
								(d = j(e, t, 1, 0, O, y, M, d)));
			else if (R & 2097152)
				(d =
					R === 2162700
						? fe(e, t, T, 0, 1, 0, n, s, O, y, M)
						: le(e, t, T, 0, 1, 0, n, s, O, y, M)),
					(b |= e.destructible),
					(D = 1),
					e.token !== 16 &&
						e.token !== 18 &&
						(b & 8 && E(e, 119),
						(d = q(e, t, d, 0, 0, O, y, M)),
						(b |= 16),
						(e.token & 8454144) === 8454144 &&
							(d = Re(e, t, 1, r, c, h, 4, R, d)),
						U(e, t | 32768, 22) && (d = ve(e, t, d, r, c, h)));
			else if (R === 14)
				(d = Ze(e, t, T, 16, n, s, 1, 1, 0, O, y, M)),
					(b |= (e.token === 16 ? 0 : 16) | e.destructible),
					(D = 1);
			else {
				for (
					d = W(e, t, 1, 0, O, y, M), b = e.assignable, k.push(d);
					U(e, t | 32768, 18);

				)
					k.push(W(e, t, 1, 0, O, y, M));
				return (
					(b |= e.assignable),
					P(e, t, 16),
					(e.destructible = b | 16),
					(e.assignable = 2),
					_(e, t, r, c, h, { type: "CallExpression", callee: u, arguments: k })
				);
			}
			if ((k.push(d), !U(e, t | 32768, 18))) break;
		}
		return (
			P(e, t, 16),
			(b |= e.destructible & 256 ? 256 : 0 | (e.destructible & 128) ? 128 : 0),
			e.token === 10
				? (b & 48 && E(e, 25),
					(e.flags & 1 || o & 1) && E(e, 46),
					b & 128 && E(e, 29),
					t & 2098176 && b & 256 && E(e, 30),
					D && (e.flags |= 128),
					Zt(e, t, T, k, i, 1, r, c, h))
				: (b & 8 && E(e, 60),
					(e.assignable = 2),
					_(e, t, r, c, h, { type: "CallExpression", callee: u, arguments: k }))
		);
	}
	function c1(e, t, u, i, n) {
		let { tokenRaw: s, tokenRegExp: o, tokenValue: r } = e;
		return (
			L(e, t),
			(e.assignable = 2),
			t & 512
				? _(e, t, u, i, n, { type: "Literal", value: r, regex: o, raw: s })
				: _(e, t, u, i, n, { type: "Literal", value: r, regex: o })
		);
	}
	function xu(e, t, u, i, n, s, o) {
		t = (t | 16777216 | 1024) ^ 16777216;
		let r = su(e, t);
		r.length && ((n = e.tokenPos), (s = e.linePos), (o = e.colPos)),
			e.leadingDecorators.length &&
				(e.leadingDecorators.push(...r),
				(r = e.leadingDecorators),
				(e.leadingDecorators = [])),
			L(e, t);
		let c = null,
			h = null,
			{ tokenValue: T } = e;
		e.token & 4096 && e.token !== 20567
			? (t0(e, t, e.token) && E(e, 115),
				(e.token & 537079808) === 537079808 && E(e, 116),
				u && (Oe(e, t, u, T, 32, 0), i && i & 2 && Fe(e, T)),
				(c = x(e, t)))
			: i & 1 || E(e, 37, "Class");
		let b = t;
		U(e, t | 32768, 20567)
			? ((h = ce(e, t, 0, 0, 0, e.tokenPos, e.linePos, e.colPos)),
				(b |= 524288))
			: (b = (b | 524288) ^ 524288);
		let d = b0(e, b, t, u, 2, 8, 0);
		return _(
			e,
			t,
			n,
			s,
			o,
			t & 1
				? {
						type: "ClassDeclaration",
						id: c,
						superClass: h,
						decorators: r,
						body: d,
					}
				: { type: "ClassDeclaration", id: c, superClass: h, body: d }
		);
	}
	function l1(e, t, u, i, n, s) {
		let o = null,
			r = null;
		t = (t | 1024 | 16777216) ^ 16777216;
		let c = su(e, t);
		c.length && ((i = e.tokenPos), (n = e.linePos), (s = e.colPos)),
			L(e, t),
			e.token & 4096 &&
				e.token !== 20567 &&
				(t0(e, t, e.token) && E(e, 115),
				(e.token & 537079808) === 537079808 && E(e, 116),
				(o = x(e, t)));
		let h = t;
		U(e, t | 32768, 20567)
			? ((r = ce(e, t, 0, u, 0, e.tokenPos, e.linePos, e.colPos)),
				(h |= 524288))
			: (h = (h | 524288) ^ 524288);
		let T = b0(e, h, t, void 0, 2, 0, u);
		return (
			(e.assignable = 2),
			_(
				e,
				t,
				i,
				n,
				s,
				t & 1
					? {
							type: "ClassExpression",
							id: o,
							superClass: r,
							decorators: c,
							body: T,
						}
					: { type: "ClassExpression", id: o, superClass: r, body: T }
			)
		);
	}
	function su(e, t) {
		let u = [];
		if (t & 1)
			for (; e.token === 133; )
				u.push(f1(e, t, e.tokenPos, e.linePos, e.colPos));
		return u;
	}
	function f1(e, t, u, i, n) {
		L(e, t | 32768);
		let s = oe(e, t, 2, 0, 1, 0, 1, u, i, n);
		return (
			(s = q(e, t, s, 0, 0, u, i, n)),
			_(e, t, u, i, n, { type: "Decorator", expression: s })
		);
	}
	function b0(e, t, u, i, n, s, o) {
		let { tokenPos: r, linePos: c, colPos: h } = e;
		P(e, t | 32768, 2162700), (t = (t | 134217728) ^ 134217728);
		let T = e.flags & 32;
		e.flags = (e.flags | 32) ^ 32;
		let b = [],
			d;
		for (; e.token !== 1074790415; ) {
			let D = 0;
			if (
				((d = su(e, t)),
				(D = d.length),
				D > 0 && e.tokenValue === "constructor" && E(e, 107),
				e.token === 1074790415 && E(e, 106),
				U(e, t, 1074790417))
			) {
				D > 0 && E(e, 117);
				continue;
			}
			b.push(A0(e, t, i, u, n, d, 0, o, e.tokenPos, e.linePos, e.colPos));
		}
		return (
			P(e, s & 8 ? t | 32768 : t, 1074790415),
			(e.flags = (e.flags & -33) | T),
			_(e, t, r, c, h, { type: "ClassBody", body: b })
		);
	}
	function A0(e, t, u, i, n, s, o, r, c, h, T) {
		let b = o ? 32 : 0,
			d = null,
			{ token: D, tokenPos: k, linePos: R, colPos: O } = e;
		if (D & 176128)
			switch (((d = x(e, t)), D)) {
				case 36972:
					if (
						!o &&
						e.token !== 67174411 &&
						(e.token & 1048576) !== 1048576 &&
						e.token !== 1077936157
					)
						return A0(e, t, u, i, n, s, 1, r, c, h, T);
					break;
				case 209007:
					if (e.token !== 67174411 && !(e.flags & 1)) {
						if (t & 1 && (e.token & 1073741824) === 1073741824)
							return jt(e, t, d, b, s, k, R, O);
						b |= 16 | (Wu(e, t, 8457014) ? 8 : 0);
					}
					break;
				case 12402:
					if (e.token !== 67174411) {
						if (t & 1 && (e.token & 1073741824) === 1073741824)
							return jt(e, t, d, b, s, k, R, O);
						b |= 256;
					}
					break;
				case 12403:
					if (e.token !== 67174411) {
						if (t & 1 && (e.token & 1073741824) === 1073741824)
							return jt(e, t, d, b, s, k, R, O);
						b |= 512;
					}
					break;
			}
		else if (D === 69271571) (b |= 2), (d = je(e, i, r));
		else if ((D & 134217728) === 134217728) d = ie(e, t);
		else if (D === 8457014) (b |= 8), L(e, t);
		else if (t & 1 && e.token === 131)
			(b |= 4096), (d = eu(e, t | 16384, k, R, O));
		else if (t & 1 && (e.token & 1073741824) === 1073741824) b |= 128;
		else {
			if (o && D === 2162700) return Ho(e, t, u, k, R, O);
			D === 122
				? ((d = x(e, t)), e.token !== 67174411 && E(e, 28, X[e.token & 255]))
				: E(e, 28, X[e.token & 255]);
		}
		if (
			(b & 792 &&
				(e.token & 143360
					? (d = x(e, t))
					: (e.token & 134217728) === 134217728
						? (d = ie(e, t))
						: e.token === 69271571
							? ((b |= 2), (d = je(e, t, 0)))
							: e.token === 122
								? (d = x(e, t))
								: t & 1 && e.token === 131
									? ((b |= 4096), (d = eu(e, t, k, R, O)))
									: E(e, 132)),
			b & 2 ||
				(e.tokenValue === "constructor"
					? ((e.token & 1073741824) === 1073741824
							? E(e, 126)
							: !(b & 32) &&
								e.token === 67174411 &&
								(b & 920
									? E(e, 51, "accessor")
									: t & 524288 || (e.flags & 32 ? E(e, 52) : (e.flags |= 32))),
						(b |= 64))
					: !(b & 4096) && b & 824 && e.tokenValue === "prototype" && E(e, 50)),
			t & 1 && e.token !== 67174411)
		)
			return jt(e, t, d, b, s, k, R, O);
		let y = me(e, t, b, r, e.tokenPos, e.linePos, e.colPos);
		return _(
			e,
			t,
			c,
			h,
			T,
			t & 1
				? {
						type: "MethodDefinition",
						kind:
							!(b & 32) && b & 64
								? "constructor"
								: b & 256
									? "get"
									: b & 512
										? "set"
										: "method",
						static: (b & 32) > 0,
						computed: (b & 2) > 0,
						key: d,
						decorators: s,
						value: y,
					}
				: {
						type: "MethodDefinition",
						kind:
							!(b & 32) && b & 64
								? "constructor"
								: b & 256
									? "get"
									: b & 512
										? "set"
										: "method",
						static: (b & 32) > 0,
						computed: (b & 2) > 0,
						key: d,
						value: y,
					}
		);
	}
	function eu(e, t, u, i, n) {
		L(e, t);
		let { tokenValue: s } = e;
		return (
			s === "constructor" && E(e, 125),
			L(e, t),
			_(e, t, u, i, n, { type: "PrivateIdentifier", name: s })
		);
	}
	function jt(e, t, u, i, n, s, o, r) {
		let c = null;
		if ((i & 8 && E(e, 0), e.token === 1077936157)) {
			L(e, t | 32768);
			let { tokenPos: h, linePos: T, colPos: b } = e;
			e.token === 537079928 && E(e, 116);
			let d = i & 64 ? 14680064 : 31981568;
			(t = ((t | d) ^ d) | ((i & 88) << 18) | 100925440),
				(c = oe(e, t | 16384, 2, 0, 1, 0, 1, h, T, b)),
				((e.token & 1073741824) !== 1073741824 ||
					(e.token & 4194304) === 4194304) &&
					((c = q(e, t | 16384, c, 0, 0, h, T, b)),
					(c = j(e, t | 16384, 0, 0, h, T, b, c)),
					e.token === 18 && (c = Ne(e, t, 0, s, o, r, c)));
		}
		return _(e, t, s, o, r, {
			type: "PropertyDefinition",
			key: u,
			value: c,
			static: (i & 32) > 0,
			computed: (i & 2) > 0,
			decorators: n,
		});
	}
	function g0(e, t, u, i, n, s, o, r) {
		if (e.token & 143360) return ei(e, t, u, i, n, s, o, r);
		(e.token & 2097152) !== 2097152 && E(e, 28, X[e.token & 255]);
		let c =
			e.token === 69271571
				? le(e, t, u, 1, 0, 1, i, n, s, o, r)
				: fe(e, t, u, 1, 0, 1, i, n, s, o, r);
		return e.destructible & 16 && E(e, 48), e.destructible & 32 && E(e, 48), c;
	}
	function ei(e, t, u, i, n, s, o, r) {
		let { tokenValue: c, token: h } = e;
		return (
			t & 1024 &&
				((h & 537079808) === 537079808
					? E(e, 116)
					: (h & 36864) === 36864 && E(e, 115)),
			(h & 20480) === 20480 && E(e, 100),
			t & 2099200 && h === 241773 && E(e, 30),
			h === 241739 && i & 24 && E(e, 98),
			t & 4196352 && h === 209008 && E(e, 96),
			L(e, t),
			u && Le(e, t, u, c, i, n),
			_(e, t, s, o, r, { type: "Identifier", name: c })
		);
	}
	function ti(e, t, u, i, n, s) {
		if ((L(e, t), e.token === 8456259))
			return _(e, t, i, n, s, {
				type: "JSXFragment",
				openingFragment: d1(e, t, i, n, s),
				children: Vn(e, t),
				closingFragment: E1(e, t, u, e.tokenPos, e.linePos, e.colPos),
			});
		let o = null,
			r = [],
			c = b1(e, t, u, i, n, s);
		if (!c.selfClosing) {
			(r = Vn(e, t)), (o = h1(e, t, u, e.tokenPos, e.linePos, e.colPos));
			let h = $t(o.name);
			$t(c.name) !== h && E(e, 150, h);
		}
		return _(e, t, i, n, s, {
			type: "JSXElement",
			children: r,
			openingElement: c,
			closingElement: o,
		});
	}
	function d1(e, t, u, i, n) {
		return He(e, t), _(e, t, u, i, n, { type: "JSXOpeningFragment" });
	}
	function h1(e, t, u, i, n, s) {
		P(e, t, 25);
		let o = C0(e, t, e.tokenPos, e.linePos, e.colPos);
		return (
			u ? P(e, t, 8456259) : (e.token = He(e, t)),
			_(e, t, i, n, s, { type: "JSXClosingElement", name: o })
		);
	}
	function E1(e, t, u, i, n, s) {
		return (
			P(e, t, 25),
			P(e, t, 8456259),
			_(e, t, i, n, s, { type: "JSXClosingFragment" })
		);
	}
	function Vn(e, t) {
		let u = [];
		for (; e.token !== 25; )
			(e.index = e.tokenPos = e.startPos),
				(e.column = e.colPos = e.startColumn),
				(e.line = e.linePos = e.startLine),
				He(e, t),
				u.push(m1(e, t, e.tokenPos, e.linePos, e.colPos));
		return u;
	}
	function m1(e, t, u, i, n) {
		if (e.token === 138) return T1(e, t, u, i, n);
		if (e.token === 2162700) return D0(e, t, 0, 0, u, i, n);
		if (e.token === 8456258) return ti(e, t, 0, u, i, n);
		E(e, 0);
	}
	function T1(e, t, u, i, n) {
		He(e, t);
		let s = { type: "JSXText", value: e.tokenValue };
		return t & 512 && (s.raw = e.tokenRaw), _(e, t, u, i, n, s);
	}
	function b1(e, t, u, i, n, s) {
		(e.token & 143360) !== 143360 && (e.token & 4096) !== 4096 && E(e, 0);
		let o = C0(e, t, e.tokenPos, e.linePos, e.colPos),
			r = g1(e, t),
			c = e.token === 8457016;
		return (
			e.token === 8456259
				? He(e, t)
				: (P(e, t, 8457016), u ? P(e, t, 8456259) : He(e, t)),
			_(e, t, i, n, s, {
				type: "JSXOpeningElement",
				name: o,
				attributes: r,
				selfClosing: c,
			})
		);
	}
	function C0(e, t, u, i, n) {
		Uu(e);
		let s = au(e, t, u, i, n);
		if (e.token === 21) return _0(e, t, s, u, i, n);
		for (; U(e, t, 67108877); ) Uu(e), (s = A1(e, t, s, u, i, n));
		return s;
	}
	function A1(e, t, u, i, n, s) {
		let o = au(e, t, e.tokenPos, e.linePos, e.colPos);
		return _(e, t, i, n, s, {
			type: "JSXMemberExpression",
			object: u,
			property: o,
		});
	}
	function g1(e, t) {
		let u = [];
		for (; e.token !== 8457016 && e.token !== 8456259 && e.token !== 1048576; )
			u.push(_1(e, t, e.tokenPos, e.linePos, e.colPos));
		return u;
	}
	function C1(e, t, u, i, n) {
		L(e, t), P(e, t, 14);
		let s = W(e, t, 1, 0, e.tokenPos, e.linePos, e.colPos);
		return (
			P(e, t, 1074790415),
			_(e, t, u, i, n, { type: "JSXSpreadAttribute", argument: s })
		);
	}
	function _1(e, t, u, i, n) {
		if (e.token === 2162700) return C1(e, t, u, i, n);
		Uu(e);
		let s = null,
			o = au(e, t, u, i, n);
		if (
			(e.token === 21 && (o = _0(e, t, o, u, i, n)), e.token === 1077936157)
		) {
			let r = ho(e, t),
				{ tokenPos: c, linePos: h, colPos: T } = e;
			switch (r) {
				case 134283267:
					s = ie(e, t);
					break;
				case 8456258:
					s = ti(e, t, 1, c, h, T);
					break;
				case 2162700:
					s = D0(e, t, 1, 1, c, h, T);
					break;
				default:
					E(e, 149);
			}
		}
		return _(e, t, u, i, n, { type: "JSXAttribute", value: s, name: o });
	}
	function _0(e, t, u, i, n, s) {
		P(e, t, 21);
		let o = au(e, t, e.tokenPos, e.linePos, e.colPos);
		return _(e, t, i, n, s, {
			type: "JSXNamespacedName",
			namespace: u,
			name: o,
		});
	}
	function D0(e, t, u, i, n, s, o) {
		L(e, t | 32768);
		let { tokenPos: r, linePos: c, colPos: h } = e;
		if (e.token === 14) return D1(e, t, n, s, o);
		let T = null;
		return (
			e.token === 1074790415
				? (i && E(e, 152),
					(T = N1(e, t, e.startPos, e.startLine, e.startColumn)))
				: (T = W(e, t, 1, 0, r, c, h)),
			u ? P(e, t, 1074790415) : He(e, t),
			_(e, t, n, s, o, { type: "JSXExpressionContainer", expression: T })
		);
	}
	function D1(e, t, u, i, n) {
		P(e, t, 14);
		let s = W(e, t, 1, 0, e.tokenPos, e.linePos, e.colPos);
		return (
			P(e, t, 1074790415),
			_(e, t, u, i, n, { type: "JSXSpreadChild", expression: s })
		);
	}
	function N1(e, t, u, i, n) {
		return (
			(e.startPos = e.tokenPos),
			(e.startLine = e.linePos),
			(e.startColumn = e.colPos),
			_(e, t, u, i, n, { type: "JSXEmptyExpression" })
		);
	}
	function au(e, t, u, i, n) {
		let { tokenValue: s } = e;
		return L(e, t), _(e, t, u, i, n, { type: "JSXIdentifier", name: s });
	}
	function N0(e, t) {
		return _o(e, t, 0);
	}
	var { stringify: I1 } = JSON;
	if (!String.prototype.repeat)
		throw new Error(
			"String.prototype.repeat is undefined, see https://github.com/davidbonnet/astring#installation"
		);
	if (!String.prototype.endsWith)
		throw new Error(
			"String.prototype.endsWith is undefined, see https://github.com/davidbonnet/astring#installation"
		);
	var ou = {
			"||": 2,
			"??": 3,
			"&&": 4,
			"|": 5,
			"^": 6,
			"&": 7,
			"==": 8,
			"!=": 8,
			"===": 8,
			"!==": 8,
			"<": 9,
			">": 9,
			"<=": 9,
			">=": 9,
			in: 9,
			instanceof: 9,
			"<<": 10,
			">>": 10,
			">>>": 10,
			"+": 11,
			"-": 11,
			"*": 12,
			"%": 12,
			"/": 12,
			"**": 13,
		},
		Ae = 17,
		S1 = {
			ArrayExpression: 20,
			TaggedTemplateExpression: 20,
			ThisExpression: 20,
			Identifier: 20,
			PrivateIdentifier: 20,
			Literal: 18,
			TemplateLiteral: 20,
			Super: 20,
			SequenceExpression: 20,
			MemberExpression: 19,
			ChainExpression: 19,
			CallExpression: 19,
			NewExpression: 19,
			ArrowFunctionExpression: Ae,
			ClassExpression: Ae,
			FunctionExpression: Ae,
			ObjectExpression: Ae,
			UpdateExpression: 16,
			UnaryExpression: 15,
			AwaitExpression: 15,
			BinaryExpression: 14,
			LogicalExpression: 13,
			ConditionalExpression: 4,
			AssignmentExpression: 3,
			YieldExpression: 2,
			RestElement: 1,
		};
	function et(e, t) {
		let { generator: u } = e;
		if ((e.write("("), t != null && t.length > 0)) {
			u[t[0].type](t[0], e);
			let { length: i } = t;
			for (let n = 1; n < i; n++) {
				let s = t[n];
				e.write(", "), u[s.type](s, e);
			}
		}
		e.write(")");
	}
	function O0(e, t, u, i) {
		let n = e.expressionsPrecedence[t.type];
		if (n === Ae) return !0;
		let s = e.expressionsPrecedence[u.type];
		return n !== s
			? (!i && n === 15 && s === 14 && u.operator === "**") || n < s
			: n !== 13 && n !== 14
				? !1
				: t.operator === "**" && u.operator === "**"
					? !i
					: n === 13 && s === 13 && (t.operator === "??" || u.operator === "??")
						? !0
						: i
							? ou[t.operator] <= ou[u.operator]
							: ou[t.operator] < ou[u.operator];
	}
	function ru(e, t, u, i) {
		let { generator: n } = e;
		O0(e, t, u, i)
			? (e.write("("), n[t.type](t, e), e.write(")"))
			: n[t.type](t, e);
	}
	function L1(e, t, u, i) {
		let n = t.split(`
`),
			s = n.length - 1;
		if ((e.write(n[0].trim()), s > 0)) {
			e.write(i);
			for (let o = 1; o < s; o++) e.write(u + n[o].trim() + i);
			e.write(u + n[s].trim());
		}
	}
	function ne(e, t, u, i) {
		let { length: n } = t;
		for (let s = 0; s < n; s++) {
			let o = t[s];
			e.write(u),
				o.type[0] === "L"
					? e.write(
							"// " +
								o.value.trim() +
								`
`,
							o
						)
					: (e.write("/*"), L1(e, o.value, u, i), e.write("*/" + i));
		}
	}
	function k1(e) {
		let t = e;
		for (; t != null; ) {
			let { type: u } = t;
			if (u[0] === "C" && u[1] === "a") return !0;
			if (u[0] === "M" && u[1] === "e" && u[2] === "m") t = t.object;
			else return !1;
		}
	}
	function ui(e, t) {
		let { generator: u } = e,
			{ declarations: i } = t;
		e.write(t.kind + " ");
		let { length: n } = i;
		if (n > 0) {
			u.VariableDeclarator(i[0], e);
			for (let s = 1; s < n; s++) e.write(", "), u.VariableDeclarator(i[s], e);
		}
	}
	var I0,
		S0,
		L0,
		k0,
		R0,
		P0,
		R1 = {
			Program(e, t) {
				let u = t.indent.repeat(t.indentLevel),
					{ lineEnd: i, writeComments: n } = t;
				n && e.comments != null && ne(t, e.comments, u, i);
				let s = e.body,
					{ length: o } = s;
				for (let r = 0; r < o; r++) {
					let c = s[r];
					n && c.comments != null && ne(t, c.comments, u, i),
						t.write(u),
						this[c.type](c, t),
						t.write(i);
				}
				n && e.trailingComments != null && ne(t, e.trailingComments, u, i);
			},
			BlockStatement: (P0 = function (e, t) {
				let u = t.indent.repeat(t.indentLevel++),
					{ lineEnd: i, writeComments: n } = t,
					s = u + t.indent;
				t.write("{");
				let o = e.body;
				if (o != null && o.length > 0) {
					t.write(i), n && e.comments != null && ne(t, e.comments, s, i);
					let { length: r } = o;
					for (let c = 0; c < r; c++) {
						let h = o[c];
						n && h.comments != null && ne(t, h.comments, s, i),
							t.write(s),
							this[h.type](h, t),
							t.write(i);
					}
					t.write(u);
				} else
					n &&
						e.comments != null &&
						(t.write(i), ne(t, e.comments, s, i), t.write(u));
				n && e.trailingComments != null && ne(t, e.trailingComments, s, i),
					t.write("}"),
					t.indentLevel--;
			}),
			ClassBody: P0,
			StaticBlock(e, t) {
				t.write("static "), this.BlockStatement(e, t);
			},
			EmptyStatement(e, t) {
				t.write(";");
			},
			ExpressionStatement(e, t) {
				let u = t.expressionsPrecedence[e.expression.type];
				u === Ae || (u === 3 && e.expression.left.type[0] === "O")
					? (t.write("("),
						this[e.expression.type](e.expression, t),
						t.write(")"))
					: this[e.expression.type](e.expression, t),
					t.write(";");
			},
			IfStatement(e, t) {
				t.write("if ("),
					this[e.test.type](e.test, t),
					t.write(") "),
					this[e.consequent.type](e.consequent, t),
					e.alternate != null &&
						(t.write(" else "), this[e.alternate.type](e.alternate, t));
			},
			LabeledStatement(e, t) {
				this[e.label.type](e.label, t),
					t.write(": "),
					this[e.body.type](e.body, t);
			},
			BreakStatement(e, t) {
				t.write("break"),
					e.label != null && (t.write(" "), this[e.label.type](e.label, t)),
					t.write(";");
			},
			ContinueStatement(e, t) {
				t.write("continue"),
					e.label != null && (t.write(" "), this[e.label.type](e.label, t)),
					t.write(";");
			},
			WithStatement(e, t) {
				t.write("with ("),
					this[e.object.type](e.object, t),
					t.write(") "),
					this[e.body.type](e.body, t);
			},
			SwitchStatement(e, t) {
				let u = t.indent.repeat(t.indentLevel++),
					{ lineEnd: i, writeComments: n } = t;
				t.indentLevel++;
				let s = u + t.indent,
					o = s + t.indent;
				t.write("switch ("),
					this[e.discriminant.type](e.discriminant, t),
					t.write(") {" + i);
				let { cases: r } = e,
					{ length: c } = r;
				for (let h = 0; h < c; h++) {
					let T = r[h];
					n && T.comments != null && ne(t, T.comments, s, i),
						T.test
							? (t.write(s + "case "),
								this[T.test.type](T.test, t),
								t.write(":" + i))
							: t.write(s + "default:" + i);
					let { consequent: b } = T,
						{ length: d } = b;
					for (let D = 0; D < d; D++) {
						let k = b[D];
						n && k.comments != null && ne(t, k.comments, o, i),
							t.write(o),
							this[k.type](k, t),
							t.write(i);
					}
				}
				(t.indentLevel -= 2), t.write(u + "}");
			},
			ReturnStatement(e, t) {
				t.write("return"),
					e.argument && (t.write(" "), this[e.argument.type](e.argument, t)),
					t.write(";");
			},
			ThrowStatement(e, t) {
				t.write("throw "), this[e.argument.type](e.argument, t), t.write(";");
			},
			TryStatement(e, t) {
				if ((t.write("try "), this[e.block.type](e.block, t), e.handler)) {
					let { handler: u } = e;
					u.param == null
						? t.write(" catch ")
						: (t.write(" catch ("),
							this[u.param.type](u.param, t),
							t.write(") ")),
						this[u.body.type](u.body, t);
				}
				e.finalizer &&
					(t.write(" finally "), this[e.finalizer.type](e.finalizer, t));
			},
			WhileStatement(e, t) {
				t.write("while ("),
					this[e.test.type](e.test, t),
					t.write(") "),
					this[e.body.type](e.body, t);
			},
			DoWhileStatement(e, t) {
				t.write("do "),
					this[e.body.type](e.body, t),
					t.write(" while ("),
					this[e.test.type](e.test, t),
					t.write(");");
			},
			ForStatement(e, t) {
				if ((t.write("for ("), e.init != null)) {
					let { init: u } = e;
					u.type[0] === "V" ? ui(t, u) : this[u.type](u, t);
				}
				t.write("; "),
					e.test && this[e.test.type](e.test, t),
					t.write("; "),
					e.update && this[e.update.type](e.update, t),
					t.write(") "),
					this[e.body.type](e.body, t);
			},
			ForInStatement: (I0 = function (e, t) {
				t.write(`for ${e.await ? "await " : ""}(`);
				let { left: u } = e;
				u.type[0] === "V" ? ui(t, u) : this[u.type](u, t),
					t.write(e.type[3] === "I" ? " in " : " of "),
					this[e.right.type](e.right, t),
					t.write(") "),
					this[e.body.type](e.body, t);
			}),
			ForOfStatement: I0,
			DebuggerStatement(e, t) {
				t.write("debugger;", e);
			},
			FunctionDeclaration: (S0 = function (e, t) {
				t.write(
					(e.async ? "async " : "") +
						(e.generator ? "function* " : "function ") +
						(e.id ? e.id.name : ""),
					e
				),
					et(t, e.params),
					t.write(" "),
					this[e.body.type](e.body, t);
			}),
			FunctionExpression: S0,
			VariableDeclaration(e, t) {
				ui(t, e), t.write(";");
			},
			VariableDeclarator(e, t) {
				this[e.id.type](e.id, t),
					e.init != null && (t.write(" = "), this[e.init.type](e.init, t));
			},
			ClassDeclaration(e, t) {
				if (
					(t.write("class " + (e.id ? `${e.id.name} ` : ""), e), e.superClass)
				) {
					t.write("extends ");
					let { superClass: u } = e,
						{ type: i } = u,
						n = t.expressionsPrecedence[i];
					(i[0] !== "C" || i[1] !== "l" || i[5] !== "E") &&
					(n === Ae || n < t.expressionsPrecedence.ClassExpression)
						? (t.write("("), this[e.superClass.type](u, t), t.write(")"))
						: this[u.type](u, t),
						t.write(" ");
				}
				this.ClassBody(e.body, t);
			},
			ImportDeclaration(e, t) {
				t.write("import ");
				let { specifiers: u, attributes: i } = e,
					{ length: n } = u,
					s = 0;
				if (n > 0) {
					for (; s < n; ) {
						s > 0 && t.write(", ");
						let o = u[s],
							r = o.type[6];
						if (r === "D") t.write(o.local.name, o), s++;
						else if (r === "N") t.write("* as " + o.local.name, o), s++;
						else break;
					}
					if (s < n) {
						for (t.write("{"); ; ) {
							let o = u[s],
								{ name: r } = o.imported;
							if (
								(t.write(r, o),
								r !== o.local.name && t.write(" as " + o.local.name),
								++s < n)
							)
								t.write(", ");
							else break;
						}
						t.write("}");
					}
					t.write(" from ");
				}
				if ((this.Literal(e.source, t), i && i.length > 0)) {
					t.write(" with { ");
					for (let o = 0; o < i.length; o++)
						this.ImportAttribute(i[o], t), o < i.length - 1 && t.write(", ");
					t.write(" }");
				}
				t.write(";");
			},
			ImportAttribute(e, t) {
				this.Identifier(e.key, t), t.write(": "), this.Literal(e.value, t);
			},
			ImportExpression(e, t) {
				t.write("import("), this[e.source.type](e.source, t), t.write(")");
			},
			ExportDefaultDeclaration(e, t) {
				t.write("export default "),
					this[e.declaration.type](e.declaration, t),
					t.expressionsPrecedence[e.declaration.type] != null &&
						e.declaration.type[0] !== "F" &&
						t.write(";");
			},
			ExportNamedDeclaration(e, t) {
				if ((t.write("export "), e.declaration))
					this[e.declaration.type](e.declaration, t);
				else {
					t.write("{");
					let { specifiers: u } = e,
						{ length: i } = u;
					if (i > 0)
						for (let n = 0; ; ) {
							let s = u[n],
								{ name: o } = s.local;
							if (
								(t.write(o, s),
								o !== s.exported.name && t.write(" as " + s.exported.name),
								++n < i)
							)
								t.write(", ");
							else break;
						}
					if (
						(t.write("}"),
						e.source && (t.write(" from "), this.Literal(e.source, t)),
						e.attributes && e.attributes.length > 0)
					) {
						t.write(" with { ");
						for (let n = 0; n < e.attributes.length; n++)
							this.ImportAttribute(e.attributes[n], t),
								n < e.attributes.length - 1 && t.write(", ");
						t.write(" }");
					}
					t.write(";");
				}
			},
			ExportAllDeclaration(e, t) {
				if (
					(e.exported != null
						? t.write("export * as " + e.exported.name + " from ")
						: t.write("export * from "),
					this.Literal(e.source, t),
					e.attributes && e.attributes.length > 0)
				) {
					t.write(" with { ");
					for (let u = 0; u < e.attributes.length; u++)
						this.ImportAttribute(e.attributes[u], t),
							u < e.attributes.length - 1 && t.write(", ");
					t.write(" }");
				}
				t.write(";");
			},
			MethodDefinition(e, t) {
				e.static && t.write("static ");
				let u = e.kind[0];
				(u === "g" || u === "s") && t.write(e.kind + " "),
					e.value.async && t.write("async "),
					e.value.generator && t.write("*"),
					e.computed
						? (t.write("["), this[e.key.type](e.key, t), t.write("]"))
						: this[e.key.type](e.key, t),
					et(t, e.value.params),
					t.write(" "),
					this[e.value.body.type](e.value.body, t);
			},
			ClassExpression(e, t) {
				this.ClassDeclaration(e, t);
			},
			ArrowFunctionExpression(e, t) {
				t.write(e.async ? "async " : "", e);
				let { params: u } = e;
				u != null &&
					(u.length === 1 && u[0].type[0] === "I"
						? t.write(u[0].name, u[0])
						: et(t, e.params)),
					t.write(" => "),
					e.body.type[0] === "O"
						? (t.write("("), this.ObjectExpression(e.body, t), t.write(")"))
						: this[e.body.type](e.body, t);
			},
			ThisExpression(e, t) {
				t.write("this", e);
			},
			Super(e, t) {
				t.write("super", e);
			},
			RestElement: (L0 = function (e, t) {
				t.write("..."), this[e.argument.type](e.argument, t);
			}),
			SpreadElement: L0,
			YieldExpression(e, t) {
				t.write(e.delegate ? "yield*" : "yield"),
					e.argument && (t.write(" "), this[e.argument.type](e.argument, t));
			},
			AwaitExpression(e, t) {
				t.write("await ", e), ru(t, e.argument, e);
			},
			TemplateLiteral(e, t) {
				let { quasis: u, expressions: i } = e;
				t.write("`");
				let { length: n } = i;
				for (let o = 0; o < n; o++) {
					let r = i[o],
						c = u[o];
					t.write(c.value.raw, c),
						t.write("${"),
						this[r.type](r, t),
						t.write("}");
				}
				let s = u[u.length - 1];
				t.write(s.value.raw, s), t.write("`");
			},
			TemplateElement(e, t) {
				t.write(e.value.raw, e);
			},
			TaggedTemplateExpression(e, t) {
				ru(t, e.tag, e), this[e.quasi.type](e.quasi, t);
			},
			ArrayExpression: (R0 = function (e, t) {
				if ((t.write("["), e.elements.length > 0)) {
					let { elements: u } = e,
						{ length: i } = u;
					for (let n = 0; ; ) {
						let s = u[n];
						if ((s != null && this[s.type](s, t), ++n < i)) t.write(", ");
						else {
							s == null && t.write(", ");
							break;
						}
					}
				}
				t.write("]");
			}),
			ArrayPattern: R0,
			ObjectExpression(e, t) {
				let u = t.indent.repeat(t.indentLevel++),
					{ lineEnd: i, writeComments: n } = t,
					s = u + t.indent;
				if ((t.write("{"), e.properties.length > 0)) {
					t.write(i), n && e.comments != null && ne(t, e.comments, s, i);
					let o = "," + i,
						{ properties: r } = e,
						{ length: c } = r;
					for (let h = 0; ; ) {
						let T = r[h];
						if (
							(n && T.comments != null && ne(t, T.comments, s, i),
							t.write(s),
							this[T.type](T, t),
							++h < c)
						)
							t.write(o);
						else break;
					}
					t.write(i),
						n && e.trailingComments != null && ne(t, e.trailingComments, s, i),
						t.write(u + "}");
				} else
					n
						? e.comments != null
							? (t.write(i),
								ne(t, e.comments, s, i),
								e.trailingComments != null && ne(t, e.trailingComments, s, i),
								t.write(u + "}"))
							: e.trailingComments != null
								? (t.write(i),
									ne(t, e.trailingComments, s, i),
									t.write(u + "}"))
								: t.write("}")
						: t.write("}");
				t.indentLevel--;
			},
			Property(e, t) {
				e.method || e.kind[0] !== "i"
					? this.MethodDefinition(e, t)
					: (e.shorthand ||
							(e.computed
								? (t.write("["), this[e.key.type](e.key, t), t.write("]"))
								: this[e.key.type](e.key, t),
							t.write(": ")),
						this[e.value.type](e.value, t));
			},
			PropertyDefinition(e, t) {
				if (
					(e.static && t.write("static "),
					e.computed && t.write("["),
					this[e.key.type](e.key, t),
					e.computed && t.write("]"),
					e.value == null)
				) {
					e.key.type[0] !== "F" && t.write(";");
					return;
				}
				t.write(" = "), this[e.value.type](e.value, t), t.write(";");
			},
			ObjectPattern(e, t) {
				if ((t.write("{"), e.properties.length > 0)) {
					let { properties: u } = e,
						{ length: i } = u;
					for (let n = 0; this[u[n].type](u[n], t), ++n < i; ) t.write(", ");
				}
				t.write("}");
			},
			SequenceExpression(e, t) {
				et(t, e.expressions);
			},
			UnaryExpression(e, t) {
				if (e.prefix) {
					let {
						operator: u,
						argument: i,
						argument: { type: n },
					} = e;
					t.write(u);
					let s = O0(t, i, e);
					!s &&
						(u.length > 1 ||
							(n[0] === "U" &&
								(n[1] === "n" || n[1] === "p") &&
								i.prefix &&
								i.operator[0] === u &&
								(u === "+" || u === "-"))) &&
						t.write(" "),
						s
							? (t.write(u.length > 1 ? " (" : "("),
								this[n](i, t),
								t.write(")"))
							: this[n](i, t);
				} else this[e.argument.type](e.argument, t), t.write(e.operator);
			},
			UpdateExpression(e, t) {
				e.prefix
					? (t.write(e.operator), this[e.argument.type](e.argument, t))
					: (this[e.argument.type](e.argument, t), t.write(e.operator));
			},
			AssignmentExpression(e, t) {
				this[e.left.type](e.left, t),
					t.write(" " + e.operator + " "),
					this[e.right.type](e.right, t);
			},
			AssignmentPattern(e, t) {
				this[e.left.type](e.left, t),
					t.write(" = "),
					this[e.right.type](e.right, t);
			},
			BinaryExpression: (k0 = function (e, t) {
				let u = e.operator === "in";
				u && t.write("("),
					ru(t, e.left, e, !1),
					t.write(" " + e.operator + " "),
					ru(t, e.right, e, !0),
					u && t.write(")");
			}),
			LogicalExpression: k0,
			ConditionalExpression(e, t) {
				let { test: u } = e,
					i = t.expressionsPrecedence[u.type];
				i === Ae || i <= t.expressionsPrecedence.ConditionalExpression
					? (t.write("("), this[u.type](u, t), t.write(")"))
					: this[u.type](u, t),
					t.write(" ? "),
					this[e.consequent.type](e.consequent, t),
					t.write(" : "),
					this[e.alternate.type](e.alternate, t);
			},
			NewExpression(e, t) {
				t.write("new ");
				let u = t.expressionsPrecedence[e.callee.type];
				u === Ae || u < t.expressionsPrecedence.CallExpression || k1(e.callee)
					? (t.write("("), this[e.callee.type](e.callee, t), t.write(")"))
					: this[e.callee.type](e.callee, t),
					et(t, e.arguments);
			},
			CallExpression(e, t) {
				let u = t.expressionsPrecedence[e.callee.type];
				u === Ae || u < t.expressionsPrecedence.CallExpression
					? (t.write("("), this[e.callee.type](e.callee, t), t.write(")"))
					: this[e.callee.type](e.callee, t),
					e.optional && t.write("?."),
					et(t, e.arguments);
			},
			ChainExpression(e, t) {
				this[e.expression.type](e.expression, t);
			},
			MemberExpression(e, t) {
				let u = t.expressionsPrecedence[e.object.type];
				u === Ae || u < t.expressionsPrecedence.MemberExpression
					? (t.write("("), this[e.object.type](e.object, t), t.write(")"))
					: this[e.object.type](e.object, t),
					e.computed
						? (e.optional && t.write("?."),
							t.write("["),
							this[e.property.type](e.property, t),
							t.write("]"))
						: (e.optional ? t.write("?.") : t.write("."),
							this[e.property.type](e.property, t));
			},
			MetaProperty(e, t) {
				t.write(e.meta.name + "." + e.property.name, e);
			},
			Identifier(e, t) {
				t.write(e.name, e);
			},
			PrivateIdentifier(e, t) {
				t.write(`#${e.name}`, e);
			},
			Literal(e, t) {
				e.raw != null
					? t.write(e.raw, e)
					: e.regex != null
						? this.RegExpLiteral(e, t)
						: e.bigint != null
							? t.write(e.bigint + "n", e)
							: t.write(I1(e.value), e);
			},
			RegExpLiteral(e, t) {
				let { regex: u } = e;
				t.write(`/${u.pattern}/${u.flags}`, e);
			},
		},
		P1 = {};
	var ii = class {
		constructor(t) {
			let u = t ?? P1;
			(this.output = ""),
				u.output != null
					? ((this.output = u.output), (this.write = this.writeToStream))
					: (this.output = ""),
				(this.generator = u.generator != null ? u.generator : R1),
				(this.expressionsPrecedence =
					u.expressionsPrecedence != null ? u.expressionsPrecedence : S1),
				(this.indent = u.indent != null ? u.indent : "  "),
				(this.lineEnd =
					u.lineEnd != null
						? u.lineEnd
						: `
`),
				(this.indentLevel =
					u.startingIndentLevel != null ? u.startingIndentLevel : 0),
				(this.writeComments = u.comments ? u.comments : !1),
				u.sourceMap != null &&
					((this.write =
						u.output == null ? this.writeAndMap : this.writeToStreamAndMap),
					(this.sourceMap = u.sourceMap),
					(this.line = 1),
					(this.column = 0),
					(this.lineEndSize =
						this.lineEnd.split(`
`).length - 1),
					(this.mapping = {
						original: null,
						generated: this,
						name: void 0,
						source: u.sourceMap.file || u.sourceMap._file,
					}));
		}
		write(t) {
			this.output += t;
		}
		writeToStream(t) {
			this.output.write(t);
		}
		writeAndMap(t, u) {
			(this.output += t), this.map(t, u);
		}
		writeToStreamAndMap(t, u) {
			this.output.write(t), this.map(t, u);
		}
		map(t, u) {
			if (u != null) {
				let { type: s } = u;
				if (s[0] === "L" && s[2] === "n") {
					(this.column = 0), this.line++;
					return;
				}
				if (u.loc != null) {
					let { mapping: o } = this;
					(o.original = u.loc.start),
						(o.name = u.name),
						this.sourceMap.addMapping(o);
				}
				if (
					(s[0] === "T" && s[8] === "E") ||
					(s[0] === "L" && s[1] === "i" && typeof u.value == "string")
				) {
					let { length: o } = t,
						{ column: r, line: c } = this;
					for (let h = 0; h < o; h++)
						t[h] ===
						`
`
							? ((r = 0), c++)
							: r++;
					(this.column = r), (this.line = c);
					return;
				}
			}
			let { length: i } = t,
				{ lineEnd: n } = this;
			i > 0 &&
				(this.lineEndSize > 0 &&
				(n.length === 1 ? t[i - 1] === n : t.endsWith(n))
					? ((this.line += this.lineEndSize), (this.column = 0))
					: (this.column += i));
		}
		toString() {
			return this.output;
		}
	};
	function ni(e, t) {
		let u = new ii(t);
		return u.generator[e.type](e, u), u.output;
	}
	var y0 = Ye(it(), 1),
		si = class extends y0.default {
			constructor() {
				super(),
					(this.parseOptions = { ranges: !0, module: !0, globalReturn: !0 }),
					(this.generationOptions = {
						format: { quotes: "double", escapeless: !0, compact: !0 },
					}),
					(this.parse = N0),
					(this.generate = ni);
			}
			rewrite(t, u = {}) {
				return this.recast(t, u, "rewrite");
			}
			source(t, u = {}) {
				return this.recast(t, u, "source");
			}
			recast(t, u = {}, i = "") {
				try {
					let n = [],
						s = this.parse(t, this.parseOptions),
						o = {
							data: u,
							changes: [],
							input: t,
							ast: s,
							get slice() {
								return r;
							},
						},
						r = 0;
					this.iterate(s, (c, h = null) => {
						h && h.inTransformer && (c.isTransformer = !0),
							(c.parent = h),
							this.emit(c.type, c, o, i);
					}),
						o.changes.sort((c, h) => c.start - h.start || c.end - h.end);
					for (let c of o.changes)
						"start" in c &&
							typeof c.start == "number" &&
							n.push(t.slice(r, c.start)),
							c.node &&
								n.push(
									typeof c.node == "string"
										? c.node
										: ni(c.node, this.generationOptions)
								),
							"end" in c && typeof c.end == "number" && (r = c.end);
					return n.push(t.slice(r)), n.join("");
				} catch {
					return t;
				}
			}
			iterate(t, u) {
				if (typeof t != "object" || !u) return;
				i(t, null, u);
				function i(n, s, o) {
					if (!(typeof n != "object" || !o)) {
						o(n, s, o);
						for (let r in n)
							r !== "parent" &&
								(Array.isArray(n[r])
									? n[r].forEach((c) => {
											c && i(c, n, o);
										})
									: n[r] && i(n[r], n, o));
						typeof n.iterateEnd == "function" && n.iterateEnd();
					}
				}
			}
		},
		w0 = si;
	var Ii = Ye(ri(), 1);
	var M0 = {
			encode(e) {
				return e && encodeURIComponent(e);
			},
			decode(e) {
				return e && decodeURIComponent(e);
			},
		},
		F0 = {
			encode(e) {
				if (!e) return e;
				let t = "";
				for (let u = 0; u < e.length; u++)
					t += u % 2 ? String.fromCharCode(e.charCodeAt(u) ^ 2) : e[u];
				return encodeURIComponent(t);
			},
			decode(e) {
				if (!e) return e;
				let [t, ...u] = e.split("?"),
					i = "",
					n = decodeURIComponent(t);
				for (let s = 0; s < n.length; s++)
					i += s % 2 ? String.fromCharCode(n.charCodeAt(s) ^ 2) : n[s];
				return i + (u.length ? "?" + u.join("?") : "");
			},
		},
		v0 = {
			encode(e) {
				return e && ((e = e.toString()), decodeURIComponent(btoa(e)));
			},
			decode(e) {
				return e && ((e = e.toString()), atob(e));
			},
		};
	var U0 = Ye(ri(), 1);
	function ci(e, t, u = !1) {
		return e.httpOnly && u
			? !1
			: e.domain.startsWith(".")
				? !!t.url.hostname.endsWith(e.domain.slice(1))
				: !(
						e.domain !== t.url.hostname ||
						(e.secure && t.url.protocol === "http:") ||
						!t.url.pathname.startsWith(e.path)
					);
	}
	async function H0(e) {
		let t = await e("__op", 1, {
			upgrade(u) {
				u.createObjectStore("cookies", { keyPath: "id" }).createIndex(
					"path",
					"path"
				);
			},
		});
		return t.transaction(["cookies"], "readwrite").store.index("path"), t;
	}
	function p0(e = [], t, u) {
		let i = "";
		for (let n of e)
			ci(n, t, u) &&
				(i.length && (i += "; "), (i += n.name), (i += "="), (i += n.value));
		return i;
	}
	async function x0(e) {
		let t = new Date();
		return (await e.getAll("cookies")).filter((u) => {
			let i = !1;
			return (
				u.set &&
					(u.maxAge
						? (i = u.set.getTime() + u.maxAge * 1e3 < t)
						: u.expires && (i = new Date(u.expires.toLocaleString()) < t)),
				i ? (e.delete("cookies", u.id), !1) : !0
			);
		});
	}
	function q0(e, t, u) {
		if (!t) return !1;
		let i = (0, U0.default)(e, { decodeValues: !1 });
		for (let n of i)
			n.domain || (n.domain = "." + u.url.hostname),
				n.path || (n.path = "/"),
				n.domain.startsWith(".") || (n.domain = "." + n.domain),
				t.put("cookies", {
					...n,
					id: `${n.domain}@${n.path}@${n.name}`,
					set: new Date(Date.now()),
				});
		return !0;
	}
	function Y0(e, t = e.meta) {
		let { html: u, js: i, attributePrefix: n } = e,
			s = n + "-attr-";
		u.on("attr", (o, r) => {
			o.node.tagName === "base" &&
				o.name === "href" &&
				o.options.document &&
				(t.base = new URL(o.value, t.url)),
				r === "rewrite" &&
					li(o.name, o.tagName) &&
					(o.node.setAttribute(s + o.name, o.value),
					(o.value = e.rewriteUrl(o.value, t))),
				r === "rewrite" &&
					mi(o.name) &&
					(o.node.setAttribute(s + o.name, o.value),
					(o.value = u.wrapSrcset(o.value, t))),
				r === "rewrite" &&
					hi(o.name) &&
					(o.node.setAttribute(s + o.name, o.value),
					(o.value = u.rewrite(o.value, {
						...t,
						document: !0,
						injectHead: o.options.injectHead || [],
					}))),
				r === "rewrite" &&
					Ei(o.name) &&
					(o.node.setAttribute(s + o.name, o.value),
					(o.value = e.rewriteCSS(o.value, { context: "declarationList" }))),
				r === "rewrite" && di(o.name) && (o.name = s + o.name),
				r === "rewrite" &&
					w1(o.name) &&
					(o.node.setAttribute(s + o.name, o.value),
					(o.value = i.rewrite(o.value, t))),
				r === "source" &&
					o.name.startsWith(s) &&
					(o.node.hasAttribute(o.name.slice(s.length)) &&
						o.node.removeAttribute(o.name.slice(s.length)),
					(o.name = o.name.slice(s.length)));
		});
	}
	function V0(e) {
		let { html: t, js: u, css: i } = e;
		return (
			t.on("text", (n, s) => {
				n.element.tagName === "script" &&
					(n.value = s === "rewrite" ? u.rewrite(n.value) : u.source(n.value)),
					n.element.tagName === "style" &&
						(n.value =
							s === "rewrite" ? i.rewrite(n.value) : i.source(n.value));
			}),
			!0
		);
	}
	function li(e, t) {
		return (
			(t === "object" && e === "data") ||
			[
				"src",
				"href",
				"ping",
				"movie",
				"action",
				"poster",
				"profile",
				"background",
			].indexOf(e) > -1
		);
	}
	function w1(e) {
		return (
			[
				"onafterprint",
				"onbeforeprint",
				"onbeforeunload",
				"onerror",
				"onhashchange",
				"onload",
				"onmessage",
				"onoffline",
				"ononline",
				"onpagehide",
				"onpopstate",
				"onstorage",
				"onunload",
				"onblur",
				"onchange",
				"oncontextmenu",
				"onfocus",
				"oninput",
				"oninvalid",
				"onreset",
				"onsearch",
				"onselect",
				"onsubmit",
				"onkeydown",
				"onkeypress",
				"onkeyup",
				"onclick",
				"ondblclick",
				"onmousedown",
				"onmousemove",
				"onmouseout",
				"onmouseover",
				"onmouseup",
				"onmousewheel",
				"onwheel",
				"ondrag",
				"ondragend",
				"ondragenter",
				"ondragleave",
				"ondragover",
				"ondragstart",
				"ondrop",
				"onscroll",
				"oncopy",
				"oncut",
				"onpaste",
				"onabort",
				"oncanplay",
				"oncanplaythrough",
				"oncuechange",
				"ondurationchange",
				"onemptied",
				"onended",
				"onerror",
				"onloadeddata",
				"onloadedmetadata",
				"onloadstart",
				"onpause",
				"onplay",
				"onplaying",
				"onprogress",
				"onratechange",
				"onseeked",
				"onseeking",
				"onstalled",
				"onsuspend",
				"ontimeupdate",
				"onvolumechange",
				"onwaiting",
			].indexOf(e) > -1
		);
	}
	function W0(e) {
		let { html: t } = e;
		t.on("element", (u, i) => {
			if (
				i !== "rewrite" ||
				u.tagName !== "head" ||
				!("injectHead" in u.options)
			)
				return !1;
			u.childNodes.unshift(...u.options.injectHead);
		});
	}
	function fi(e = "", t = "") {
		return `self.__uv$cookies = ${JSON.stringify(e)};self.__uv$referrer = ${JSON.stringify(t)};`;
	}
	function X0(e, t, u, i, n, s) {
		return [
			{
				tagName: "script",
				nodeName: "script",
				childNodes: [{ nodeName: "#text", value: fi(n, s) }],
				attrs: [{ name: "__uv-script", value: "1", skip: !0 }],
				skip: !0,
			},
			{
				tagName: "script",
				nodeName: "script",
				childNodes: [],
				attrs: [
					{ name: "src", value: t, skip: !0 },
					{ name: "__uv-script", value: "1", skip: !0 },
				],
			},
			{
				tagName: "script",
				nodeName: "script",
				childNodes: [],
				attrs: [
					{ name: "src", value: u, skip: !0 },
					{ name: "__uv-script", value: "1", skip: !0 },
				],
			},
			{
				tagName: "script",
				nodeName: "script",
				childNodes: [],
				attrs: [
					{ name: "src", value: i, skip: !0 },
					{ name: "__uv-script", value: "1", skip: !0 },
				],
			},
			{
				tagName: "script",
				nodeName: "script",
				childNodes: [],
				attrs: [
					{ name: "src", value: e, skip: !0 },
					{ name: "__uv-script", value: "1", skip: !0 },
				],
			},
		];
	}
	function di(e) {
		return (
			["http-equiv", "integrity", "sandbox", "nonce", "crossorigin"].indexOf(
				e
			) > -1
		);
	}
	function hi(e) {
		return e === "srcdoc";
	}
	function Ei(e) {
		return e === "style";
	}
	function mi(e) {
		return e === "srcSet" || e === "srcset" || e === "imagesrcset";
	}
	function Q0(e) {
		let { js: t } = e;
		t.on("MemberExpression", (u, i, n) => {
			if (u.object.type === "Super") return !1;
			if (
				(n === "rewrite" &&
					B1(u) &&
					(i.changes.push({
						node: "__uv.$wrap((",
						start: u.property.start,
						end: u.property.start,
					}),
					(u.iterateEnd = function () {
						i.changes.push({
							node: "))",
							start: u.property.end,
							end: u.property.end,
						});
					})),
				((!u.computed && u.property.name === "location" && n === "rewrite") ||
					(u.property.name === "__uv$location" && n === "source")) &&
					i.changes.push({
						start: u.property.start,
						end: u.property.end,
						node:
							n === "rewrite"
								? "__uv$setSource(__uv).__uv$location"
								: "location",
					}),
				((!u.computed && u.property.name === "top" && n === "rewrite") ||
					(u.property.name === "__uv$top" && n === "source")) &&
					i.changes.push({
						start: u.property.start,
						end: u.property.end,
						node: n === "rewrite" ? "__uv$setSource(__uv).__uv$top" : "top",
					}),
				((!u.computed && u.property.name === "parent" && n === "rewrite") ||
					(u.property.name === "__uv$parent" && n === "source")) &&
					i.changes.push({
						start: u.property.start,
						end: u.property.end,
						node:
							n === "rewrite" ? "__uv$setSource(__uv).__uv$parent" : "parent",
					}),
				!u.computed &&
					u.property.name === "postMessage" &&
					n === "rewrite" &&
					i.changes.push({
						start: u.property.start,
						end: u.property.end,
						node: "__uv$setSource(__uv).postMessage",
					}),
				((!u.computed && u.property.name === "eval" && n === "rewrite") ||
					(u.property.name === "__uv$eval" && n === "source")) &&
					i.changes.push({
						start: u.property.start,
						end: u.property.end,
						node: n === "rewrite" ? "__uv$setSource(__uv).__uv$eval" : "eval",
					}),
				!u.computed &&
					u.property.name === "__uv$setSource" &&
					n === "source" &&
					u.parent.type === "CallExpression")
			) {
				let { parent: s, property: o } = u;
				i.changes.push({ start: o.start - 1, end: s.end }),
					(u.iterateEnd = function () {
						i.changes.push({ start: o.start, end: s.end });
					});
			}
		});
	}
	function j0(e) {
		let { js: t } = e;
		t.on("Identifier", (u, i, n) => {
			if (n !== "rewrite") return !1;
			let { parent: s } = u;
			if (
				!["location", "eval", "parent", "top"].includes(u.name) ||
				(s.type === "VariableDeclarator" && s.id === u) ||
				((s.type === "AssignmentExpression" ||
					s.type === "AssignmentPattern") &&
					s.left === u) ||
				((s.type === "FunctionExpression" ||
					s.type === "FunctionDeclaration") &&
					s.id === u) ||
				(s.type === "MemberExpression" && s.property === u && !s.computed) ||
				(u.name === "eval" && s.type === "CallExpression" && s.callee === u) ||
				(s.type === "Property" && s.key === u) ||
				(s.type === "Property" && s.value === u && s.shorthand) ||
				(s.type === "UpdateExpression" &&
					(s.operator === "++" || s.operator === "--")) ||
				((s.type === "FunctionExpression" ||
					s.type === "FunctionDeclaration" ||
					s.type === "ArrowFunctionExpression") &&
					s.params.indexOf(u) !== -1) ||
				s.type === "MethodDefinition" ||
				s.type === "ClassDeclaration" ||
				s.type === "RestElement" ||
				s.type === "ExportSpecifier" ||
				s.type === "ImportSpecifier"
			)
				return !1;
			i.changes.push({
				start: u.start,
				end: u.end,
				node: "__uv.$get(" + u.name + ")",
			});
		});
	}
	function K0(e) {
		let { js: t } = e;
		t.on("CallExpression", (u, i, n) => {
			if (
				n !== "rewrite" ||
				!u.arguments.length ||
				u.callee.type !== "Identifier" ||
				u.callee.name !== "eval"
			)
				return !1;
			let [s] = u.arguments;
			i.changes.push({
				node: "__uv.js.rewrite(",
				start: s.start,
				end: s.start,
			}),
				(u.iterateEnd = function () {
					i.changes.push({ node: ")", start: s.end, end: s.end });
				});
		});
	}
	function G0(e) {
		let { js: t } = e;
		t.on("Literal", (u, i, n) => {
			if (
				!(
					(u.parent.type === "ImportDeclaration" ||
						u.parent.type === "ExportAllDeclaration" ||
						u.parent.type === "ExportNamedDeclaration") &&
					u.parent.source === u
				)
			)
				return !1;
			i.changes.push({
				start: u.start + 1,
				end: u.end - 1,
				node: n === "rewrite" ? e.rewriteUrl(u.value) : e.sourceUrl(u.value),
			});
		});
	}
	function z0(e) {
		let { js: t } = e;
		t.on("ImportExpression", (u, i, n) => {
			if (n !== "rewrite") return !1;
			i.changes.push({
				node: `__uv.rewriteImport(${JSON.stringify(e.meta.url)},`,
				start: u.source.start,
				end: u.source.start,
			}),
				(u.iterateEnd = function () {
					i.changes.push({ node: ")", start: u.source.end, end: u.source.end });
				});
		});
	}
	function J0(e) {
		let { js: t } = e;
		t.on("CallExpression", (u, i, n) => {
			if (n !== "source" || !$0(u.callee)) return !1;
			switch (u.callee.property.name) {
				case "$wrap":
					{
						if (
							!u.arguments ||
							u.parent.type !== "MemberExpression" ||
							u.parent.property !== u
						)
							return !1;
						let [s] = u.arguments;
						i.changes.push({ start: u.callee.start, end: s.start }),
							(u.iterateEnd = function () {
								i.changes.push({ start: u.end - 2, end: u.end });
							});
					}
					break;
				case "$get":
				case "rewriteUrl":
					{
						let [s] = u.arguments;
						i.changes.push({ start: u.callee.start, end: s.start }),
							(u.iterateEnd = function () {
								i.changes.push({ start: u.end - 1, end: u.end });
							});
					}
					break;
				case "rewrite":
					{
						let [s] = u.arguments;
						i.changes.push({ start: u.callee.start, end: s.start }),
							(u.iterateEnd = function () {
								i.changes.push({ start: u.end - 1, end: u.end });
							});
					}
					break;
			}
		});
	}
	function $0(e) {
		return e.type !== "MemberExpression"
			? !1
			: e.property.name === "rewrite" && $0(e.object)
				? !0
				: !(
						e.object.type !== "Identifier" ||
						e.object.name !== "__uv" ||
						!["js", "$get", "$wrap", "rewriteUrl"].includes(e.property.name)
					);
	}
	function B1(e) {
		if (!e.computed) return !1;
		let { property: t } = e;
		return t.type, !0;
	}
	var M1 = (e, t) => t.some((u) => e instanceof u),
		Z0,
		es;
	function F1() {
		return (
			Z0 ||
			(Z0 = [IDBDatabase, IDBObjectStore, IDBIndex, IDBCursor, IDBTransaction])
		);
	}
	function v1() {
		return (
			es ||
			(es = [
				IDBCursor.prototype.advance,
				IDBCursor.prototype.continue,
				IDBCursor.prototype.continuePrimaryKey,
			])
		);
	}
	var ts = new WeakMap(),
		bi = new WeakMap(),
		us = new WeakMap(),
		Ti = new WeakMap(),
		gi = new WeakMap();
	function U1(e) {
		let t = new Promise((u, i) => {
			let n = () => {
					e.removeEventListener("success", s),
						e.removeEventListener("error", o);
				},
				s = () => {
					u(Ie(e.result)), n();
				},
				o = () => {
					i(e.error), n();
				};
			e.addEventListener("success", s), e.addEventListener("error", o);
		});
		return (
			t
				.then((u) => {
					u instanceof IDBCursor && ts.set(u, e);
				})
				.catch(() => {}),
			gi.set(t, e),
			t
		);
	}
	function H1(e) {
		if (bi.has(e)) return;
		let t = new Promise((u, i) => {
			let n = () => {
					e.removeEventListener("complete", s),
						e.removeEventListener("error", o),
						e.removeEventListener("abort", o);
				},
				s = () => {
					u(), n();
				},
				o = () => {
					i(e.error || new DOMException("AbortError", "AbortError")), n();
				};
			e.addEventListener("complete", s),
				e.addEventListener("error", o),
				e.addEventListener("abort", o);
		});
		bi.set(e, t);
	}
	var Ai = {
		get(e, t, u) {
			if (e instanceof IDBTransaction) {
				if (t === "done") return bi.get(e);
				if (t === "objectStoreNames") return e.objectStoreNames || us.get(e);
				if (t === "store")
					return u.objectStoreNames[1]
						? void 0
						: u.objectStore(u.objectStoreNames[0]);
			}
			return Ie(e[t]);
		},
		set(e, t, u) {
			return (e[t] = u), !0;
		},
		has(e, t) {
			return e instanceof IDBTransaction && (t === "done" || t === "store")
				? !0
				: t in e;
		},
	};
	function is(e) {
		Ai = e(Ai);
	}
	function p1(e) {
		return e === IDBDatabase.prototype.transaction &&
			!("objectStoreNames" in IDBTransaction.prototype)
			? function (t, ...u) {
					let i = e.call(cu(this), t, ...u);
					return us.set(i, t.sort ? t.sort() : [t]), Ie(i);
				}
			: v1().includes(e)
				? function (...t) {
						return e.apply(cu(this), t), Ie(ts.get(this));
					}
				: function (...t) {
						return Ie(e.apply(cu(this), t));
					};
	}
	function x1(e) {
		return typeof e == "function"
			? p1(e)
			: (e instanceof IDBTransaction && H1(e),
				M1(e, F1()) ? new Proxy(e, Ai) : e);
	}
	function Ie(e) {
		if (e instanceof IDBRequest) return U1(e);
		if (Ti.has(e)) return Ti.get(e);
		let t = x1(e);
		return t !== e && (Ti.set(e, t), gi.set(t, e)), t;
	}
	var cu = (e) => gi.get(e);
	function ss(
		e,
		t,
		{ blocked: u, upgrade: i, blocking: n, terminated: s } = {}
	) {
		let o = indexedDB.open(e, t),
			r = Ie(o);
		return (
			i &&
				o.addEventListener("upgradeneeded", (c) => {
					i(Ie(o.result), c.oldVersion, c.newVersion, Ie(o.transaction), c);
				}),
			u &&
				o.addEventListener("blocked", (c) => u(c.oldVersion, c.newVersion, c)),
			r
				.then((c) => {
					s && c.addEventListener("close", () => s()),
						n &&
							c.addEventListener("versionchange", (h) =>
								n(h.oldVersion, h.newVersion, h)
							);
				})
				.catch(() => {}),
			r
		);
	}
	var q1 = ["get", "getKey", "getAll", "getAllKeys", "count"],
		Y1 = ["put", "add", "delete", "clear"],
		Ci = new Map();
	function ns(e, t) {
		if (!(e instanceof IDBDatabase && !(t in e) && typeof t == "string"))
			return;
		if (Ci.get(t)) return Ci.get(t);
		let u = t.replace(/FromIndex$/, ""),
			i = t !== u,
			n = Y1.includes(u);
		if (
			!(u in (i ? IDBIndex : IDBObjectStore).prototype) ||
			!(n || q1.includes(u))
		)
			return;
		let s = async function (o, ...r) {
			let c = this.transaction(o, n ? "readwrite" : "readonly"),
				h = c.store;
			return (
				i && (h = h.index(r.shift())),
				(await Promise.all([h[u](...r), n && c.done]))[0]
			);
		};
		return Ci.set(t, s), s;
	}
	is((e) => ({
		...e,
		get: (t, u, i) => ns(t, u) || e.get(t, u, i),
		has: (t, u) => !!ns(t, u) || e.has(t, u),
	}));
	var V1 = globalThis.fetch,
		ut = globalThis.WebSocket,
		W1 = globalThis.Request,
		_i = globalThis.Response,
		lu = globalThis.SharedWorker,
		as = globalThis.localStorage,
		X1 = globalThis.navigator.serviceWorker,
		Se = {
			prototype: { send: ut.prototype.send },
			CLOSED: ut.CLOSED,
			CLOSING: ut.CLOSING,
			CONNECTING: ut.CONNECTING,
			OPEN: ut.OPEN,
		};
	async function Di() {
		let e = (
				await self.clients.matchAll({ type: "window", includeUncontrolled: !0 })
			).map(async (u) => {
				let i = await (function (n) {
					let s = new MessageChannel();
					return new Promise((o) => {
						n.postMessage({ type: "getPort", port: s.port2 }, [s.port2]),
							(s.port1.onmessage = (r) => {
								o(r.data);
							});
					});
				})(u);
				return await rs(i), i;
			}),
			t = Promise.race([
				Promise.any(e),
				new Promise((u, i) => setTimeout(i, 1e3, new TypeError("timeout"))),
			]);
		try {
			return await t;
		} catch (u) {
			if (u instanceof AggregateError)
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
				await Di()
			);
		}
	}
	function rs(e) {
		let t = new MessageChannel(),
			u = new Promise((i, n) => {
				(t.port1.onmessage = (s) => {
					s.data.type === "pong" && i();
				}),
					setTimeout(n, 1500);
			});
		return (
			e.postMessage({ message: { type: "ping" }, port: t.port2 }, [t.port2]), u
		);
	}
	function os(e, t) {
		let u = new lu(e, "bare-mux-worker");
		return (
			t &&
				X1.addEventListener("message", (i) => {
					if (i.data.type === "getPort" && i.data.port) {
						console.debug("bare-mux: recieved request for port from sw");
						let n = new lu(e, "bare-mux-worker");
						i.data.port.postMessage(n.port, [n.port]);
					}
				}),
			u.port
		);
	}
	var Ni = class {
			constructor(t) {
				(this.channel = new BroadcastChannel("bare-mux")),
					t instanceof MessagePort || t instanceof Promise
						? (this.port = t)
						: this.createChannel(t, !0);
			}
			createChannel(t, u) {
				if (self.clients)
					(this.port = Di()),
						(this.channel.onmessage = (i) => {
							i.data.type === "refreshPort" && (this.port = Di());
						});
				else if (t && lu) {
					if (!t.startsWith("/") && !t.includes("://"))
						throw new Error(
							"Invalid URL. Must be absolute or start at the root."
						);
					(this.port = os(t, u)),
						console.debug("bare-mux: setting localStorage bare-mux-path to", t),
						(as["bare-mux-path"] = t);
				} else {
					if (!lu)
						throw new Error("Unable to get a channel to the SharedWorker.");
					{
						let i = as["bare-mux-path"];
						if (
							(console.debug("bare-mux: got localStorage bare-mux-path:", i),
							!i)
						)
							throw new Error(
								"Unable to get bare-mux workerPath from localStorage."
							);
						this.port = os(i, u);
					}
				}
			}
			async sendMessage(t, u) {
				this.port instanceof Promise && (this.port = await this.port);
				try {
					await rs(this.port);
				} catch {
					return (
						console.warn(
							"bare-mux: Failed to get a ping response from the worker within 1.5s. Assuming port is dead."
						),
						this.createChannel(),
						await this.sendMessage(t, u)
					);
				}
				let i = new MessageChannel(),
					n = [i.port2, ...(u || [])],
					s = new Promise((o, r) => {
						i.port1.onmessage = (c) => {
							let h = c.data;
							h.type === "error" ? r(h.error) : o(h);
						};
					});
				return this.port.postMessage({ message: t, port: i.port2 }, n), await s;
			}
		},
		xe = class extends EventTarget {
			constructor(t, u = [], i, n, s) {
				super(),
					(this.protocols = []),
					(this.readyState = Se.CONNECTING),
					(this.binaryType = "blob"),
					(this.onopen = null),
					(this.onerror = null),
					(this.onmessage = null),
					(this.onclose = null),
					(this.url = t.toString()),
					(this.protocols = u);
				let o = (T) => {
						(this.readyState = Se.OPEN),
							(this.protocols = T),
							(this.meta = { headers: { "sec-websocket-protocol": T } });
						let b = new Event("open");
						this.dispatchEvent(b), this.onopen && this.onopen(b);
					},
					r = async (T) => {
						typeof T == "string" ||
							("byteLength" in T
								? this.binaryType === "blob"
									? (T = new Blob([T]))
									: Object.setPrototypeOf(T, s)
								: "arrayBuffer" in T &&
									this.binaryType === "arraybuffer" &&
									((T = await T.arrayBuffer()), Object.setPrototypeOf(T, s)));
						let b = new MessageEvent("message", { data: T });
						this.dispatchEvent(b), this.onmessage && this.onmessage(b);
					},
					c = (T, b) => {
						this.readyState = Se.CLOSED;
						let d = new CloseEvent("close", { code: T, reason: b });
						this.dispatchEvent(d), this.onclose && this.onclose(d);
					},
					h = () => {
						this.readyState = Se.CLOSED;
						let T = new Event("error");
						this.dispatchEvent(T), this.onerror && this.onerror(T);
					};
				(this.channel = new MessageChannel()),
					(this.channel.port1.onmessage = (T) => {
						T.data.type === "open"
							? o(T.data.args[0])
							: T.data.type === "message"
								? r(T.data.args[0])
								: T.data.type === "close"
									? c(T.data.args[0], T.data.args[1])
									: T.data.type === "error" && h();
					}),
					i.sendMessage(
						{
							type: "websocket",
							websocket: {
								url: t.toString(),
								origin,
								protocols: u,
								requestHeaders: n,
								channel: this.channel.port2,
							},
						},
						[this.channel.port2]
					);
			}
			send(...t) {
				if (this.readyState === Se.CONNECTING)
					throw new DOMException(
						"Failed to execute 'send' on 'WebSocket': Still in CONNECTING state."
					);
				let u = t[0];
				u.buffer &&
					(u = u.buffer.slice(u.byteOffset, u.byteOffset + u.byteLength)),
					this.channel.port1.postMessage(
						{ type: "data", data: u },
						u instanceof ArrayBuffer ? [u] : []
					);
			}
			close(t, u) {
				(this.readyState = Se.CLOSING),
					this.channel.port1.postMessage({
						type: "close",
						closeCode: t,
						closeReason: u,
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
	(xe.prototype.CONNECTING = Se.CONNECTING),
		(xe.prototype.OPEN = Se.OPEN),
		(xe.prototype.CLOSING = Se.CLOSING),
		(xe.prototype.CLOSED = Se.CLOSED);
	function Q1(e) {
		for (let t = 0; t < e.length; t++) {
			let u = e[t];
			if (
				!"!#$%&'*+-.0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ^_`abcdefghijklmnopqrstuvwxyz|~".includes(
					u
				)
			)
				return !1;
		}
		return !0;
	}
	var j1 = ["ws:", "wss:"],
		K1 = [101, 204, 205, 304],
		G1 = [301, 302, 303, 307, 308];
	var fu = class {
		constructor(t) {
			this.worker = new Ni(t);
		}
		createWebSocket(t, u = [], i, n, s) {
			try {
				t = new URL(t);
			} catch {
				throw new DOMException(
					`Faiiled to construct 'WebSocket': The URL '${t}' is invalid.`
				);
			}
			if (!j1.includes(t.protocol))
				throw new DOMException(
					`Failed to construct 'WebSocket': The URL's scheme must be either 'ws' or 'wss'. '${t.protocol}' is not allowed.`
				);
			Array.isArray(u) || (u = [u]), (u = u.map(String));
			for (let o of u)
				if (!Q1(o))
					throw new DOMException(
						`Failed to construct 'WebSocket': The subprotocol '${o}' is invalid.`
					);
			return (
				(s =
					s ||
					(i || ut).constructor.constructor("return ArrayBuffer")().prototype),
				((n = n || {}).Host = new URL(t).host),
				(n.Pragma = "no-cache"),
				(n["Cache-Control"] = "no-cache"),
				(n.Upgrade = "websocket"),
				(n.Connection = "Upgrade"),
				new xe(t, u, this.worker, n, s)
			);
		}
		async fetch(t, u) {
			let i = new W1(t, u),
				n = u?.headers || i.headers,
				s = n instanceof Headers ? Object.fromEntries(n) : n,
				o = i.body,
				r = new URL(i.url);
			if (r.protocol.startsWith("blob:")) {
				let c = await V1(r),
					h = new _i(c.body, c);
				return (
					(h.rawHeaders = Object.fromEntries(c.headers)), (h.rawResponse = c), h
				);
			}
			for (let c = 0; ; c++) {
				"host" in s ? (s.host = r.host) : (s.Host = r.host);
				let h = (
						await this.worker.sendMessage(
							{
								type: "fetch",
								fetch: {
									remote: r.toString(),
									method: i.method,
									headers: s,
									body: o || void 0,
								},
							},
							o ? [o] : []
						)
					).fetch,
					T = new _i(K1.includes(h.status) ? void 0 : h.body, {
						headers: new Headers(h.headers),
						status: h.status,
						statusText: h.statusText,
					});
				(T.rawHeaders = h.headers),
					(T.rawResponse = new _i(h.body)),
					(T.finalURL = r.toString());
				let b = u?.redirect || i.redirect;
				if (!G1.includes(T.status)) return T;
				switch (b) {
					case "follow": {
						let d = T.headers.get("location");
						if (20 > c && d !== null) {
							r = new URL(d, r);
							continue;
						}
						throw new TypeError("Failed to fetch");
					}
					case "error":
						throw new TypeError("Failed to fetch");
					case "manual":
						return T;
				}
			}
		}
	};
	var cs = Ye(it(), 1),
		du = class e {
			constructor(t = {}) {
				(this.prefix = t.prefix || "/service/"),
					(this.urlRegex = /^(#|about:|data:|mailto:)/),
					(this.rewriteUrl = t.rewriteUrl || this.rewriteUrl),
					(this.rewriteImport = t.rewriteImport || this.rewriteImport),
					(this.sourceUrl = t.sourceUrl || this.sourceUrl),
					(this.encodeUrl = t.encodeUrl || this.encodeUrl),
					(this.decodeUrl = t.decodeUrl || this.decodeUrl),
					(this.vanilla = "vanilla" in t ? t.vanilla : !1),
					(this.meta = t.meta || {}),
					(this.meta.base ||= void 0),
					(this.meta.origin ||= ""),
					(this.bundleScript = t.bundle || "/uv.bundle.js"),
					(this.handlerScript = t.handler || "/uv.handler.js"),
					(this.clientScript =
						t.client ||
						(t.bundle &&
							t.bundle.includes("uv.bundle.js") &&
							t.bundle.replace("uv.bundle.js", "uv.client.js")) ||
						"/uv.client.js"),
					(this.configScript = t.config || "/uv.config.js"),
					(this.meta.url ||= this.meta.base || ""),
					(this.codec = e.codec),
					(this.html = new wn(this)),
					(this.css = new Mn(this)),
					(this.js = new w0(this)),
					(this.openDB = this.constructor.openDB),
					(this.master = "__uv"),
					(this.dataPrefix = "__uv$"),
					(this.attributePrefix = "__uv"),
					(this.createHtmlInject = X0),
					(this.createJsInject = fi),
					(this.attrs = {
						isUrl: li,
						isForbidden: di,
						isHtml: hi,
						isSrcset: mi,
						isStyle: Ei,
					}),
					this.vanilla || this.implementUVMiddleware(),
					(this.cookie = {
						validateCookie: ci,
						db: () => H0(this.constructor.openDB),
						getCookies: x0,
						setCookies: q0,
						serialize: p0,
						setCookie: Ii.default,
					});
			}
			rewriteImport(t, u, i = this.meta) {
				return this.rewriteUrl(t, { ...i, base: u });
			}
			rewriteUrl(t, u = this.meta) {
				if (((t = new String(t).trim()), !t || this.urlRegex.test(t))) return t;
				if (t.startsWith("javascript:"))
					return "javascript:" + this.js.rewrite(t.slice(11));
				try {
					return (
						u.origin + this.prefix + this.encodeUrl(new URL(t, u.base).href)
					);
				} catch {
					return u.origin + this.prefix + this.encodeUrl(t);
				}
			}
			sourceUrl(t, u = this.meta) {
				if (!t || this.urlRegex.test(t)) return t;
				try {
					return new URL(
						this.decodeUrl(t.slice(this.prefix.length + u.origin.length)),
						u.base
					).href;
				} catch {
					return this.decodeUrl(t.slice(this.prefix.length + u.origin.length));
				}
			}
			encodeUrl(t) {
				return encodeURIComponent(t);
			}
			decodeUrl(t) {
				return decodeURIComponent(t);
			}
			implementUVMiddleware() {
				Y0(this),
					V0(this),
					W0(this),
					G0(this),
					z0(this),
					Q0(this),
					K0(this),
					j0(this),
					J0(this);
			}
			get rewriteHtml() {
				return this.html.rewrite.bind(this.html);
			}
			get sourceHtml() {
				return this.html.source.bind(this.html);
			}
			get rewriteCSS() {
				return this.css.rewrite.bind(this.css);
			}
			get sourceCSS() {
				return this.css.source.bind(this.css);
			}
			get rewriteJS() {
				return this.js.rewrite.bind(this.js);
			}
			get sourceJS() {
				return this.js.source.bind(this.js);
			}
			static codec = { xor: F0, base64: v0, plain: M0 };
			static setCookie = Ii.default;
			static openDB = ss;
			static BareClient = fu;
			static EventEmitter = cs.default;
		},
		Nc = du;
	typeof self == "object" && (self.Ultraviolet = du);
})();
//# sourceMappingURL=uv.bundle.js.map
