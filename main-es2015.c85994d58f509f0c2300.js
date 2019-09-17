(window.webpackJsonp = window.webpackJsonp || []).push([
    [1], {
        0: function(e, t, n) {
            e.exports = n("zUnb")
        },
        zUnb: function(e, t, n) {
            "use strict";

            function l(e) {
                return "function" == typeof e
            }
            n.r(t);
            let r = !1;
            const o = {
                Promise: void 0,
                set useDeprecatedSynchronousErrorHandling(e) {
                    r = e
                },
                get useDeprecatedSynchronousErrorHandling() {
                    return r
                }
            };

            function s(e) {
                setTimeout(() => {
                    throw e
                })
            }
            const i = {
                    closed: !0,
                    next(e) {},
                    error(e) {
                        if (o.useDeprecatedSynchronousErrorHandling) throw e;
                        s(e)
                    },
                    complete() {}
                },
                u = Array.isArray || (e => e && "number" == typeof e.length);

            function a(e) {
                return null !== e && "object" == typeof e
            }

            function c(e) {
                return Error.call(this), this.message = e ? `${e.length} errors occurred during unsubscription:\n${e.map((e,t)=>`${t+1}) ${e.toString()}`).join("\n  ")}` : "", this.name = "UnsubscriptionError", this.errors = e, this
            }
            c.prototype = Object.create(Error.prototype);
            const d = c,
                h = (() => {
                    class e {
                        constructor(e) {
                            this.closed = !1, this._parent = null, this._parents = null, this._subscriptions = null, e && (this._unsubscribe = e)
                        }
                        unsubscribe() {
                            let e, t = !1;
                            if (this.closed) return;
                            let {
                                _parent: n,
                                _parents: r,
                                _unsubscribe: o,
                                _subscriptions: s
                            } = this;
                            this.closed = !0, this._parent = null, this._parents = null, this._subscriptions = null;
                            let i = -1,
                                c = r ? r.length : 0;
                            for (; n;) n.remove(this), n = ++i < c && r[i] || null;
                            if (l(o)) try {
                                o.call(this)
                            } catch (h) {
                                t = !0, e = h instanceof d ? p(h.errors) : [h]
                            }
                            if (u(s))
                                for (i = -1, c = s.length; ++i < c;) {
                                    const n = s[i];
                                    if (a(n)) try {
                                        n.unsubscribe()
                                    } catch (h) {
                                        t = !0, e = e || [], h instanceof d ? e = e.concat(p(h.errors)) : e.push(h)
                                    }
                                }
                            if (t) throw new d(e)
                        }
                        add(t) {
                            let n = t;
                            switch (typeof t) {
                                case "function":
                                    n = new e(t);
                                case "object":
                                    if (n === this || n.closed || "function" != typeof n.unsubscribe) return n;
                                    if (this.closed) return n.unsubscribe(), n;
                                    if (!(n instanceof e)) {
                                        const t = n;
                                        (n = new e)._subscriptions = [t]
                                    }
                                    break;
                                default:
                                    if (!t) return e.EMPTY;
                                    throw new Error("unrecognized teardown " + t + " added to Subscription.")
                            }
                            if (n._addParent(this)) {
                                const e = this._subscriptions;
                                e ? e.push(n) : this._subscriptions = [n]
                            }
                            return n
                        }
                        remove(e) {
                            const t = this._subscriptions;
                            if (t) {
                                const n = t.indexOf(e); - 1 !== n && t.splice(n, 1)
                            }
                        }
                        _addParent(e) {
                            let {
                                _parent: t,
                                _parents: n
                            } = this;
                            return t !== e && (t ? n ? -1 === n.indexOf(e) && (n.push(e), !0) : (this._parents = [e], !0) : (this._parent = e, !0))
                        }
                    }
                    return e.EMPTY = function(e) {
                        return e.closed = !0, e
                    }(new e), e
                })();

            function p(e) {
                return e.reduce((e, t) => e.concat(t instanceof d ? t.errors : t), [])
            }
            const f = "function" == typeof Symbol ? Symbol("rxSubscriber") : "@@rxSubscriber_" + Math.random();
            class m extends h {
                constructor(e, t, n) {
                    switch (super(), this.syncErrorValue = null, this.syncErrorThrown = !1, this.syncErrorThrowable = !1, this.isStopped = !1, arguments.length) {
                        case 0:
                            this.destination = i;
                            break;
                        case 1:
                            if (!e) {
                                this.destination = i;
                                break
                            }
                            if ("object" == typeof e) {
                                e instanceof m ? (this.syncErrorThrowable = e.syncErrorThrowable, this.destination = e, e.add(this)) : (this.syncErrorThrowable = !0, this.destination = new g(this, e));
                                break
                            }
                            default:
                                this.syncErrorThrowable = !0, this.destination = new g(this, e, t, n)
                    }
                } [f]() {
                    return this
                }
                static create(e, t, n) {
                    const l = new m(e, t, n);
                    return l.syncErrorThrowable = !1, l
                }
                next(e) {
                    this.isStopped || this._next(e)
                }
                error(e) {
                    this.isStopped || (this.isStopped = !0, this._error(e))
                }
                complete() {
                    this.isStopped || (this.isStopped = !0, this._complete())
                }
                unsubscribe() {
                    this.closed || (this.isStopped = !0, super.unsubscribe())
                }
                _next(e) {
                    this.destination.next(e)
                }
                _error(e) {
                    this.destination.error(e), this.unsubscribe()
                }
                _complete() {
                    this.destination.complete(), this.unsubscribe()
                }
                _unsubscribeAndRecycle() {
                    const {
                        _parent: e,
                        _parents: t
                    } = this;
                    return this._parent = null, this._parents = null, this.unsubscribe(), this.closed = !1, this.isStopped = !1, this._parent = e, this._parents = t, this
                }
            }
            class g extends m {
                constructor(e, t, n, r) {
                    let o;
                    super(), this._parentSubscriber = e;
                    let s = this;
                    l(t) ? o = t : t && (o = t.next, n = t.error, r = t.complete, t !== i && (l((s = Object.create(t)).unsubscribe) && this.add(s.unsubscribe.bind(s)), s.unsubscribe = this.unsubscribe.bind(this))), this._context = s, this._next = o, this._error = n, this._complete = r
                }
                next(e) {
                    if (!this.isStopped && this._next) {
                        const {
                            _parentSubscriber: t
                        } = this;
                        o.useDeprecatedSynchronousErrorHandling && t.syncErrorThrowable ? this.__tryOrSetError(t, this._next, e) && this.unsubscribe() : this.__tryOrUnsub(this._next, e)
                    }
                }
                error(e) {
                    if (!this.isStopped) {
                        const {
                            _parentSubscriber: t
                        } = this, {
                            useDeprecatedSynchronousErrorHandling: n
                        } = o;
                        if (this._error) n && t.syncErrorThrowable ? (this.__tryOrSetError(t, this._error, e), this.unsubscribe()) : (this.__tryOrUnsub(this._error, e), this.unsubscribe());
                        else if (t.syncErrorThrowable) n ? (t.syncErrorValue = e, t.syncErrorThrown = !0) : s(e), this.unsubscribe();
                        else {
                            if (this.unsubscribe(), n) throw e;
                            s(e)
                        }
                    }
                }
                complete() {
                    if (!this.isStopped) {
                        const {
                            _parentSubscriber: e
                        } = this;
                        if (this._complete) {
                            const t = () => this._complete.call(this._context);
                            o.useDeprecatedSynchronousErrorHandling && e.syncErrorThrowable ? (this.__tryOrSetError(e, t), this.unsubscribe()) : (this.__tryOrUnsub(t), this.unsubscribe())
                        } else this.unsubscribe()
                    }
                }
                __tryOrUnsub(e, t) {
                    try {
                        e.call(this._context, t)
                    } catch (n) {
                        if (this.unsubscribe(), o.useDeprecatedSynchronousErrorHandling) throw n;
                        s(n)
                    }
                }
                __tryOrSetError(e, t, n) {
                    if (!o.useDeprecatedSynchronousErrorHandling) throw new Error("bad call");
                    try {
                        t.call(this._context, n)
                    } catch (l) {
                        return o.useDeprecatedSynchronousErrorHandling ? (e.syncErrorValue = l, e.syncErrorThrown = !0, !0) : (s(l), !0)
                    }
                    return !1
                }
                _unsubscribe() {
                    const {
                        _parentSubscriber: e
                    } = this;
                    this._context = null, this._parentSubscriber = null, e.unsubscribe()
                }
            }
            const y = "function" == typeof Symbol && Symbol.observable || "@@observable";
            const _ = (() => {
                class e {
                    constructor(e) {
                        this._isScalar = !1, e && (this._subscribe = e)
                    }
                    lift(t) {
                        const n = new e;
                        return n.source = this, n.operator = t, n
                    }
                    subscribe(e, t, n) {
                        const {
                            operator: l
                        } = this, r = function(e, t, n) {
                            if (e) {
                                if (e instanceof m) return e;
                                if (e[f]) return e[f]()
                            }
                            return e || t || n ? new m(e, t, n) : new m(i)
                        }(e, t, n);
                        if (r.add(l ? l.call(r, this.source) : this.source || o.useDeprecatedSynchronousErrorHandling && !r.syncErrorThrowable ? this._subscribe(r) : this._trySubscribe(r)), o.useDeprecatedSynchronousErrorHandling && r.syncErrorThrowable && (r.syncErrorThrowable = !1, r.syncErrorThrown)) throw r.syncErrorValue;
                        return r
                    }
                    _trySubscribe(e) {
                        try {
                            return this._subscribe(e)
                        } catch (t) {
                            o.useDeprecatedSynchronousErrorHandling && (e.syncErrorThrown = !0, e.syncErrorValue = t),
                                function(e) {
                                    for (; e;) {
                                        const {
                                            closed: t,
                                            destination: n,
                                            isStopped: l
                                        } = e;
                                        if (t || l) return !1;
                                        e = n && n instanceof m ? n : null
                                    }
                                    return !0
                                }(e) ? e.error(t) : console.warn(t)
                        }
                    }
                    forEach(e, t) {
                        return new(t = w(t))((t, n) => {
                            let l;
                            l = this.subscribe(t => {
                                try {
                                    e(t)
                                } catch (r) {
                                    n(r), l && l.unsubscribe()
                                }
                            }, n, t)
                        })
                    }
                    _subscribe(e) {
                        const {
                            source: t
                        } = this;
                        return t && t.subscribe(e)
                    } [y]() {
                        return this
                    }
                    pipe(...e) {
                        return 0 === e.length ? this : ((t = e) ? 1 === t.length ? t[0] : function(e) {
                            return t.reduce((e, t) => t(e), e)
                        } : function() {})(this);
                        var t
                    }
                    toPromise(e) {
                        return new(e = w(e))((e, t) => {
                            let n;
                            this.subscribe(e => n = e, e => t(e), () => e(n))
                        })
                    }
                }
                return e.create = (t => new e(t)), e
            })();

            function w(e) {
                if (e || (e = o.Promise || Promise), !e) throw new Error("no Promise impl found");
                return e
            }

            function b() {
                return Error.call(this), this.message = "object unsubscribed", this.name = "ObjectUnsubscribedError", this
            }
            b.prototype = Object.create(Error.prototype);
            const v = b;
            class C extends h {
                constructor(e, t) {
                    super(), this.subject = e, this.subscriber = t, this.closed = !1
                }
                unsubscribe() {
                    if (this.closed) return;
                    this.closed = !0;
                    const e = this.subject,
                        t = e.observers;
                    if (this.subject = null, !t || 0 === t.length || e.isStopped || e.closed) return;
                    const n = t.indexOf(this.subscriber); - 1 !== n && t.splice(n, 1)
                }
            }
            class x extends m {
                constructor(e) {
                    super(e), this.destination = e
                }
            }
            const E = (() => {
                class e extends _ {
                    constructor() {
                        super(), this.observers = [], this.closed = !1, this.isStopped = !1, this.hasError = !1, this.thrownError = null
                    } [f]() {
                        return new x(this)
                    }
                    lift(e) {
                        const t = new k(this, this);
                        return t.operator = e, t
                    }
                    next(e) {
                        if (this.closed) throw new v;
                        if (!this.isStopped) {
                            const {
                                observers: t
                            } = this, n = t.length, l = t.slice();
                            for (let r = 0; r < n; r++) l[r].next(e)
                        }
                    }
                    error(e) {
                        if (this.closed) throw new v;
                        this.hasError = !0, this.thrownError = e, this.isStopped = !0;
                        const {
                            observers: t
                        } = this, n = t.length, l = t.slice();
                        for (let r = 0; r < n; r++) l[r].error(e);
                        this.observers.length = 0
                    }
                    complete() {
                        if (this.closed) throw new v;
                        this.isStopped = !0;
                        const {
                            observers: e
                        } = this, t = e.length, n = e.slice();
                        for (let l = 0; l < t; l++) n[l].complete();
                        this.observers.length = 0
                    }
                    unsubscribe() {
                        this.isStopped = !0, this.closed = !0, this.observers = null
                    }
                    _trySubscribe(e) {
                        if (this.closed) throw new v;
                        return super._trySubscribe(e)
                    }
                    _subscribe(e) {
                        if (this.closed) throw new v;
                        return this.hasError ? (e.error(this.thrownError), h.EMPTY) : this.isStopped ? (e.complete(), h.EMPTY) : (this.observers.push(e), new C(this, e))
                    }
                    asObservable() {
                        const e = new _;
                        return e.source = this, e
                    }
                }
                return e.create = ((e, t) => new k(e, t)), e
            })();
            class k extends E {
                constructor(e, t) {
                    super(), this.destination = e, this.source = t
                }
                next(e) {
                    const {
                        destination: t
                    } = this;
                    t && t.next && t.next(e)
                }
                error(e) {
                    const {
                        destination: t
                    } = this;
                    t && t.error && this.destination.error(e)
                }
                complete() {
                    const {
                        destination: e
                    } = this;
                    e && e.complete && this.destination.complete()
                }
                _subscribe(e) {
                    const {
                        source: t
                    } = this;
                    return t ? this.source.subscribe(e) : h.EMPTY
                }
            }
            class T extends m {
                constructor(e, t, n) {
                    super(), this.parent = e, this.outerValue = t, this.outerIndex = n, this.index = 0
                }
                _next(e) {
                    this.parent.notifyNext(this.outerValue, e, this.outerIndex, this.index++, this)
                }
                _error(e) {
                    this.parent.notifyError(e, this), this.unsubscribe()
                }
                _complete() {
                    this.parent.notifyComplete(this), this.unsubscribe()
                }
            }
            const I = e => t => {
                    for (let n = 0, l = e.length; n < l && !t.closed; n++) t.next(e[n]);
                    t.closed || t.complete()
                },
                S = e => t => (e.then(e => {
                    t.closed || (t.next(e), t.complete())
                }, e => t.error(e)).then(null, s), t);

            function A() {
                return "function" == typeof Symbol && Symbol.iterator ? Symbol.iterator : "@@iterator"
            }
            const N = A(),
                D = e => t => {
                    const n = e[N]();
                    for (;;) {
                        const e = n.next();
                        if (e.done) {
                            t.complete();
                            break
                        }
                        if (t.next(e.value), t.closed) break
                    }
                    return "function" == typeof n.return && t.add(() => {
                        n.return && n.return()
                    }), t
                },
                O = e => t => {
                    const n = e[y]();
                    if ("function" != typeof n.subscribe) throw new TypeError("Provided object does not correctly implement Symbol.observable");
                    return n.subscribe(t)
                },
                M = e => e && "number" == typeof e.length && "function" != typeof e;

            function R(e) {
                return !!e && "function" != typeof e.subscribe && "function" == typeof e.then
            }
            const P = e => {
                if (e instanceof _) return t => e._isScalar ? (t.next(e.value), void t.complete()) : e.subscribe(t);
                if (e && "function" == typeof e[y]) return O(e);
                if (M(e)) return I(e);
                if (R(e)) return S(e);
                if (e && "function" == typeof e[N]) return D(e); {
                    const t = a(e) ? "an invalid object" : `'${e}'`;
                    throw new TypeError(`You provided ${t} where a stream was expected.` + " You can provide an Observable, Promise, Array, or Iterable.")
                }
            };
            class V extends m {
                notifyNext(e, t, n, l, r) {
                    this.destination.next(t)
                }
                notifyError(e, t) {
                    this.destination.error(e)
                }
                notifyComplete(e) {
                    this.destination.complete()
                }
            }
            class H {
                constructor(e, t) {
                    this.project = e, this.thisArg = t
                }
                call(e, t) {
                    return t.subscribe(new j(e, this.project, this.thisArg))
                }
            }
            class j extends m {
                constructor(e, t, n) {
                    super(e), this.project = t, this.count = 0, this.thisArg = n || this
                }
                _next(e) {
                    let t;
                    try {
                        t = this.project.call(this.thisArg, e, this.count++)
                    } catch (n) {
                        return void this.destination.error(n)
                    }
                    this.destination.next(t)
                }
            }

            function L(e, t) {
                return new _(t ? n => {
                    const l = new h;
                    let r = 0;
                    return l.add(t.schedule(function() {
                        r !== e.length ? (n.next(e[r++]), n.closed || l.add(this.schedule())) : n.complete()
                    })), l
                } : I(e))
            }
            class F {
                constructor(e, t = Number.POSITIVE_INFINITY) {
                    this.project = e, this.concurrent = t
                }
                call(e, t) {
                    return t.subscribe(new B(e, this.project, this.concurrent))
                }
            }
            class B extends V {
                constructor(e, t, n = Number.POSITIVE_INFINITY) {
                    super(e), this.project = t, this.concurrent = n, this.hasCompleted = !1, this.buffer = [], this.active = 0, this.index = 0
                }
                _next(e) {
                    this.active < this.concurrent ? this._tryNext(e) : this.buffer.push(e)
                }
                _tryNext(e) {
                    let t;
                    const n = this.index++;
                    try {
                        t = this.project(e, n)
                    } catch (l) {
                        return void this.destination.error(l)
                    }
                    this.active++, this._innerSub(t, e, n)
                }
                _innerSub(e, t, n) {
                    const l = new T(this, void 0, void 0);
                    this.destination.add(l),
                        function(e, t, n, l, r = new T(e, n, l)) {
                            r.closed || P(t)(r)
                        }(this, e, t, n, l)
                }
                _complete() {
                    this.hasCompleted = !0, 0 === this.active && 0 === this.buffer.length && this.destination.complete(), this.unsubscribe()
                }
                notifyNext(e, t, n, l, r) {
                    this.destination.next(t)
                }
                notifyComplete(e) {
                    const t = this.buffer;
                    this.remove(e), this.active--, t.length > 0 ? this._next(t.shift()) : 0 === this.active && this.hasCompleted && this.destination.complete()
                }
            }

            function z(e) {
                return e
            }

            function $() {
                return function(e) {
                    return e.lift(new U(e))
                }
            }
            class U {
                constructor(e) {
                    this.connectable = e
                }
                call(e, t) {
                    const {
                        connectable: n
                    } = this;
                    n._refCount++;
                    const l = new Z(e, n),
                        r = t.subscribe(l);
                    return l.closed || (l.connection = n.connect()), r
                }
            }
            class Z extends m {
                constructor(e, t) {
                    super(e), this.connectable = t
                }
                _unsubscribe() {
                    const {
                        connectable: e
                    } = this;
                    if (!e) return void(this.connection = null);
                    this.connectable = null;
                    const t = e._refCount;
                    if (t <= 0) return void(this.connection = null);
                    if (e._refCount = t - 1, t > 1) return void(this.connection = null);
                    const {
                        connection: n
                    } = this, l = e._connection;
                    this.connection = null, !l || n && l !== n || l.unsubscribe()
                }
            }
            const W = class extends _ {
                    constructor(e, t) {
                        super(), this.source = e, this.subjectFactory = t, this._refCount = 0, this._isComplete = !1
                    }
                    _subscribe(e) {
                        return this.getSubject().subscribe(e)
                    }
                    getSubject() {
                        const e = this._subject;
                        return e && !e.isStopped || (this._subject = this.subjectFactory()), this._subject
                    }
                    connect() {
                        let e = this._connection;
                        return e || (this._isComplete = !1, (e = this._connection = new h).add(this.source.subscribe(new Q(this.getSubject(), this))), e.closed ? (this._connection = null, e = h.EMPTY) : this._connection = e), e
                    }
                    refCount() {
                        return $()(this)
                    }
                }.prototype,
                K = {
                    operator: {
                        value: null
                    },
                    _refCount: {
                        value: 0,
                        writable: !0
                    },
                    _subject: {
                        value: null,
                        writable: !0
                    },
                    _connection: {
                        value: null,
                        writable: !0
                    },
                    _subscribe: {
                        value: W._subscribe
                    },
                    _isComplete: {
                        value: W._isComplete,
                        writable: !0
                    },
                    getSubject: {
                        value: W.getSubject
                    },
                    connect: {
                        value: W.connect
                    },
                    refCount: {
                        value: W.refCount
                    }
                };
            class Q extends x {
                constructor(e, t) {
                    super(e), this.connectable = t
                }
                _error(e) {
                    this._unsubscribe(), super._error(e)
                }
                _complete() {
                    this.connectable._isComplete = !0, this._unsubscribe(), super._complete()
                }
                _unsubscribe() {
                    const e = this.connectable;
                    if (e) {
                        this.connectable = null;
                        const t = e._connection;
                        e._refCount = 0, e._subject = null, e._connection = null, t && t.unsubscribe()
                    }
                }
            }

            function q() {
                return new E
            }
            const G = "__parameters__";

            function J(e, t, n) {
                const l = function(e) {
                    return function(...t) {
                        if (e) {
                            const n = e(...t);
                            for (const e in n) this[e] = n[e]
                        }
                    }
                }(t);

                function r(...e) {
                    if (this instanceof r) return l.apply(this, e), this;
                    const t = new r(...e);
                    return n.annotation = t, n;

                    function n(e, n, l) {
                        const r = e.hasOwnProperty(G) ? e[G] : Object.defineProperty(e, G, {
                            value: []
                        })[G];
                        for (; r.length <= l;) r.push(null);
                        return (r[l] = r[l] || []).push(t), e
                    }
                }
                return n && (r.prototype = Object.create(n.prototype)), r.prototype.ngMetadataName = e, r.annotationCls = r, r
            }
            const Y = J("Inject", e => ({
                    token: e
                })),
                X = J("Optional"),
                ee = J("Self"),
                te = J("SkipSelf");
            var ne = function(e) {
                return e[e.Default = 0] = "Default", e[e.Host = 1] = "Host", e[e.Self = 2] = "Self", e[e.SkipSelf = 4] = "SkipSelf", e[e.Optional = 8] = "Optional", e
            }({});

            function le(e) {
                for (let t in e)
                    if (e[t] === le) return t;
                throw Error("Could not find renamed property on target object.")
            }

            function re(e) {
                return {
                    providedIn: e.providedIn || null,
                    factory: e.factory,
                    value: void 0
                }
            }

            function oe(e) {
                return e && e.hasOwnProperty(se) ? e[se] : null
            }
            const se = le({
                ngInjectableDef: le
            });

            function ie(e) {
                if ("string" == typeof e) return e;
                if (e instanceof Array) return "[" + e.map(ie).join(", ") + "]";
                if (null == e) return "" + e;
                if (e.overriddenName) return `${e.overriddenName}`;
                if (e.name) return `${e.name}`;
                const t = e.toString();
                if (null == t) return "" + t;
                const n = t.indexOf("\n");
                return -1 === n ? t : t.substring(0, n)
            }
            const ue = le({
                __forward_ref__: le
            });

            function ae(e) {
                return e.__forward_ref__ = ae, e.toString = function() {
                    return ie(this())
                }, e
            }

            function ce(e) {
                const t = e;
                return "function" == typeof t && t.hasOwnProperty(ue) && t.__forward_ref__ === ae ? t() : e
            }

            function de() {
                const e = "undefined" != typeof globalThis && globalThis,
                    t = "undefined" != typeof window && window,
                    n = "undefined" != typeof self && "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope && self,
                    l = "undefined" != typeof global && global;
                return e || l || t || n
            }
            const he = de();
            let pe, fe = void 0;

            function me(e) {
                const t = fe;
                return fe = e, t
            }
            class ge {
                constructor(e, t) {
                    this._desc = e, this.ngMetadataName = "InjectionToken", this.ngInjectableDef = void 0, "number" == typeof t ? this.__NG_ELEMENT_ID__ = t : void 0 !== t && (this.ngInjectableDef = re({
                        providedIn: t.providedIn || "root",
                        factory: t.factory
                    }))
                }
                toString() {
                    return `InjectionToken ${this._desc}`
                }
            }
            const ye = "__source",
                _e = new Object,
                we = new ge("INJECTOR", -1);
            class be {
                get(e, t = _e) {
                    if (t === _e) {
                        const t = new Error(`NullInjectorError: No provider for ${ie(e)}!`);
                        throw t.name = "NullInjectorError", t
                    }
                    return t
                }
            }
            const ve = (() => {
                    class e {
                        static create(e, t) {
                            return Array.isArray(e) ? new De(e, t) : new De(e.providers, e.parent, e.name || null)
                        }
                    }
                    return e.THROW_IF_NOT_FOUND = _e, e.NULL = new be, e.ngInjectableDef = re({
                        providedIn: "any",
                        factory: () => (function(e, t = ne.Default) {
                            return (pe || function(e, t = ne.Default) {
                                if (void 0 === fe) throw new Error("inject() must be called from an injection context");
                                return null === fe ? function(e, t, n) {
                                    const l = oe(e);
                                    if (l && "root" == l.providedIn) return void 0 === l.value ? l.value = l.factory() : l.value;
                                    if (n & ne.Optional) return null;
                                    throw new Error(`Injector: NOT_FOUND [${ie(e)}]`)
                                }(e, 0, t) : fe.get(e, t & ne.Optional ? null : void 0, t)
                            })(e, t)
                        })(we)
                    }), e.__NG_ELEMENT_ID__ = -1, e
                })(),
                Ce = function(e) {
                    return e
                },
                xe = [],
                Ee = Ce,
                ke = function() {
                    return Array.prototype.slice.call(arguments)
                },
                Te = le({
                    provide: String,
                    useValue: le
                }),
                Ie = "ngTokenPath",
                Se = "ngTempTokenPath",
                Ae = /\n/gm,
                Ne = "\u0275";
            class De {
                constructor(e, t = ve.NULL, n = null) {
                    this.parent = t, this.source = n;
                    const l = this._records = new Map;
                    l.set(ve, {
                            token: ve,
                            fn: Ce,
                            deps: xe,
                            value: this,
                            useNew: !1
                        }), l.set(we, {
                            token: we,
                            fn: Ce,
                            deps: xe,
                            value: this,
                            useNew: !1
                        }),
                        function e(t, n) {
                            if (n)
                                if ((n = ce(n)) instanceof Array)
                                    for (let l = 0; l < n.length; l++) e(t, n[l]);
                                else {
                                    if ("function" == typeof n) throw Re("Function/Class not supported", n);
                                    if (!n || "object" != typeof n || !n.provide) throw Re("Unexpected provider", n); {
                                        let e = ce(n.provide);
                                        const l = function(e) {
                                            const t = function(e) {
                                                let t = xe;
                                                const n = e.deps;
                                                if (n && n.length) {
                                                    t = [];
                                                    for (let e = 0; e < n.length; e++) {
                                                        let l = 6,
                                                            r = ce(n[e]);
                                                        if (r instanceof Array)
                                                            for (let e = 0, t = r; e < t.length; e++) {
                                                                const n = t[e];
                                                                n instanceof X || n == X ? l |= 1 : n instanceof te || n == te ? l &= -3 : n instanceof ee || n == ee ? l &= -5 : r = n instanceof Y ? n.token : ce(n)
                                                            }
                                                        t.push({
                                                            token: r,
                                                            options: l
                                                        })
                                                    }
                                                } else if (e.useExisting) t = [{
                                                    token: ce(e.useExisting),
                                                    options: 6
                                                }];
                                                else if (!(n || Te in e)) throw Re("'deps' required", e);
                                                return t
                                            }(e);
                                            let n = Ce,
                                                l = xe,
                                                r = !1,
                                                o = ce(e.provide);
                                            if (Te in e) l = e.useValue;
                                            else if (e.useFactory) n = e.useFactory;
                                            else if (e.useExisting);
                                            else if (e.useClass) r = !0, n = ce(e.useClass);
                                            else {
                                                if ("function" != typeof o) throw Re("StaticProvider does not have [useValue|useFactory|useExisting|useClass] or [provide] is not newable", e);
                                                r = !0, n = o
                                            }
                                            return {
                                                deps: t,
                                                fn: n,
                                                useNew: r,
                                                value: l
                                            }
                                        }(n);
                                        if (!0 === n.multi) {
                                            let l = t.get(e);
                                            if (l) {
                                                if (l.fn !== ke) throw Oe(e)
                                            } else t.set(e, l = {
                                                token: n.provide,
                                                deps: [],
                                                useNew: !1,
                                                fn: ke,
                                                value: xe
                                            });
                                            l.deps.push({
                                                token: e = n,
                                                options: 6
                                            })
                                        }
                                        const r = t.get(e);
                                        if (r && r.fn == ke) throw Oe(e);
                                        t.set(e, l)
                                    }
                                }
                        }(l, e)
                }
                get(e, t, n = ne.Default) {
                    const l = this._records.get(e);
                    try {
                        return function e(t, n, l, r, o, s) {
                            try {
                                return function(t, n, l, r, o, s) {
                                    let i;
                                    if (!n || s & ne.SkipSelf) s & ne.Self || (i = r.get(t, o, ne.Default));
                                    else {
                                        if ((i = n.value) == Ee) throw Error(Ne + "Circular dependency");
                                        if (i === xe) {
                                            n.value = Ee;
                                            let t = void 0,
                                                o = n.useNew,
                                                s = n.fn,
                                                u = n.deps,
                                                a = xe;
                                            if (u.length) {
                                                a = [];
                                                for (let t = 0; t < u.length; t++) {
                                                    const n = u[t],
                                                        o = n.options,
                                                        s = 2 & o ? l.get(n.token) : void 0;
                                                    a.push(e(n.token, s, l, s || 4 & o ? r : ve.NULL, 1 & o ? null : ve.THROW_IF_NOT_FOUND, ne.Default))
                                                }
                                            }
                                            n.value = i = o ? new s(...a) : s.apply(t, a)
                                        }
                                    }
                                    return i
                                }(t, n, l, r, o, s)
                            } catch (i) {
                                throw i instanceof Error || (i = new Error(i)), (i[Se] = i[Se] || []).unshift(t), n && n.value == Ee && (n.value = xe), i
                            }
                        }(e, l, this._records, this.parent, t, n)
                    } catch (r) {
                        return function(e, t, n, l) {
                            const r = e[Se];
                            throw t[ye] && r.unshift(t[ye]), e.message = Me("\n" + e.message, r, "StaticInjectorError", l), e[Ie] = r, e[Se] = null, e
                        }(r, e, 0, this.source)
                    }
                }
                toString() {
                    const e = [];
                    return this._records.forEach((t, n) => e.push(ie(n))), `StaticInjector[${e.join(", ")}]`
                }
            }

            function Oe(e) {
                return Re("Cannot mix multi providers and regular providers", e)
            }

            function Me(e, t, n, l = null) {
                e = e && "\n" === e.charAt(0) && e.charAt(1) == Ne ? e.substr(2) : e;
                let r = ie(t);
                if (t instanceof Array) r = t.map(ie).join(" -> ");
                else if ("object" == typeof t) {
                    let e = [];
                    for (let n in t)
                        if (t.hasOwnProperty(n)) {
                            let l = t[n];
                            e.push(n + ":" + ("string" == typeof l ? JSON.stringify(l) : ie(l)))
                        } r = `{${e.join(", ")}}`
                }
                return `${n}${l?"("+l+")":""}[${r}]: ${e.replace(Ae,"\n  ")}`
            }

            function Re(e, t) {
                return new Error(Me(e, t, "StaticInjectorError"))
            }
            const Pe = "ngDebugContext",
                Ve = "ngOriginalError",
                He = "ngErrorLogger",
                je = function() {
                    var e = {
                        Emulated: 0,
                        Native: 1,
                        None: 2,
                        ShadowDom: 3
                    };
                    return e[e.Emulated] = "Emulated", e[e.Native] = "Native", e[e.None] = "None", e[e.ShadowDom] = "ShadowDom", e
                }(),
                Le = (() => ("undefined" != typeof requestAnimationFrame && requestAnimationFrame || setTimeout).bind(he))();

            function Fe(e) {
                return e[Pe]
            }

            function Be(e) {
                return e[Ve]
            }

            function ze(e, ...t) {
                e.error(...t)
            }
            class $e {
                constructor() {
                    this._console = console
                }
                handleError(e) {
                    const t = this._findOriginalError(e),
                        n = this._findContext(e),
                        l = function(e) {
                            return e[He] || ze
                        }(e);
                    l(this._console, "ERROR", e), t && l(this._console, "ORIGINAL ERROR", t), n && l(this._console, "ERROR CONTEXT", n)
                }
                _findContext(e) {
                    return e ? Fe(e) ? Fe(e) : this._findContext(Be(e)) : null
                }
                _findOriginalError(e) {
                    let t = Be(e);
                    for (; t && Be(t);) t = Be(t);
                    return t
                }
            }
            let Ue = !0,
                Ze = !1;

            function We() {
                return Ze = !0, Ue
            }
            class Ke {
                constructor(e) {
                    if (this.defaultDoc = e, this.inertDocument = this.defaultDoc.implementation.createHTMLDocument("sanitization-inert"), this.inertBodyElement = this.inertDocument.body, null == this.inertBodyElement) {
                        const e = this.inertDocument.createElement("html");
                        this.inertDocument.appendChild(e), this.inertBodyElement = this.inertDocument.createElement("body"), e.appendChild(this.inertBodyElement)
                    }
                    this.inertBodyElement.innerHTML = '<svg><g onload="this.parentNode.remove()"></g></svg>', !this.inertBodyElement.querySelector || this.inertBodyElement.querySelector("svg") ? (this.inertBodyElement.innerHTML = '<svg><p><style><img src="</style><img src=x onerror=alert(1)//">', this.getInertBodyElement = this.inertBodyElement.querySelector && this.inertBodyElement.querySelector("svg img") && function() {
                        try {
                            return !!window.DOMParser
                        } catch (e) {
                            return !1
                        }
                    }() ? this.getInertBodyElement_DOMParser : this.getInertBodyElement_InertDocument) : this.getInertBodyElement = this.getInertBodyElement_XHR
                }
                getInertBodyElement_XHR(e) {
                    e = "<body><remove></remove>" + e + "</body>";
                    try {
                        e = encodeURI(e)
                    } catch (l) {
                        return null
                    }
                    const t = new XMLHttpRequest;
                    t.responseType = "document", t.open("GET", "data:text/html;charset=utf-8," + e, !1), t.send(void 0);
                    const n = t.response.body;
                    return n.removeChild(n.firstChild), n
                }
                getInertBodyElement_DOMParser(e) {
                    e = "<body><remove></remove>" + e + "</body>";
                    try {
                        const n = (new window.DOMParser).parseFromString(e, "text/html").body;
                        return n.removeChild(n.firstChild), n
                    } catch (t) {
                        return null
                    }
                }
                getInertBodyElement_InertDocument(e) {
                    const t = this.inertDocument.createElement("template");
                    return "content" in t ? (t.innerHTML = e, t) : (this.inertBodyElement.innerHTML = e, this.defaultDoc.documentMode && this.stripCustomNsAttrs(this.inertBodyElement), this.inertBodyElement)
                }
                stripCustomNsAttrs(e) {
                    const t = e.attributes;
                    for (let l = t.length - 1; 0 < l; l--) {
                        const n = t.item(l).name;
                        "xmlns:ns1" !== n && 0 !== n.indexOf("ns1:") || e.removeAttribute(n)
                    }
                    let n = e.firstChild;
                    for (; n;) n.nodeType === Node.ELEMENT_NODE && this.stripCustomNsAttrs(n), n = n.nextSibling
                }
            }
            const Qe = /^(?:(?:https?|mailto|ftp|tel|file):|[^&:\/?#]*(?:[\/?#]|$))/gi,
                qe = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+\/]+=*$/i;

            function Ge(e) {
                return (e = String(e)).match(Qe) || e.match(qe) ? e : (We() && console.warn(`WARNING: sanitizing unsafe URL value ${e} (see http://g.co/ng/security#xss)`), "unsafe:" + e)
            }

            function Je(e) {
                const t = {};
                for (const n of e.split(",")) t[n] = !0;
                return t
            }

            function Ye(...e) {
                const t = {};
                for (const n of e)
                    for (const e in n) n.hasOwnProperty(e) && (t[e] = !0);
                return t
            }
            const Xe = Je("area,br,col,hr,img,wbr"),
                et = Je("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"),
                tt = Je("rp,rt"),
                nt = Ye(tt, et),
                lt = Ye(Xe, Ye(et, Je("address,article,aside,blockquote,caption,center,del,details,dialog,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,main,map,menu,nav,ol,pre,section,summary,table,ul")), Ye(tt, Je("a,abbr,acronym,audio,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,picture,q,ruby,rp,rt,s,samp,small,source,span,strike,strong,sub,sup,time,track,tt,u,var,video")), nt),
                rt = Je("background,cite,href,itemtype,longdesc,poster,src,xlink:href"),
                ot = Je("srcset"),
                st = Ye(rt, ot, Je("abbr,accesskey,align,alt,autoplay,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,controls,coords,datetime,default,dir,download,face,headers,height,hidden,hreflang,hspace,ismap,itemscope,itemprop,kind,label,lang,language,loop,media,muted,nohref,nowrap,open,preload,rel,rev,role,rows,rowspan,rules,scope,scrolling,shape,size,sizes,span,srclang,start,summary,tabindex,target,title,translate,type,usemap,valign,value,vspace,width"), Je("aria-activedescendant,aria-atomic,aria-autocomplete,aria-busy,aria-checked,aria-colcount,aria-colindex,aria-colspan,aria-controls,aria-current,aria-describedby,aria-details,aria-disabled,aria-dropeffect,aria-errormessage,aria-expanded,aria-flowto,aria-grabbed,aria-haspopup,aria-hidden,aria-invalid,aria-keyshortcuts,aria-label,aria-labelledby,aria-level,aria-live,aria-modal,aria-multiline,aria-multiselectable,aria-orientation,aria-owns,aria-placeholder,aria-posinset,aria-pressed,aria-readonly,aria-relevant,aria-required,aria-roledescription,aria-rowcount,aria-rowindex,aria-rowspan,aria-selected,aria-setsize,aria-sort,aria-valuemax,aria-valuemin,aria-valuenow,aria-valuetext")),
                it = Je("script,style,template");
            class ut {
                constructor() {
                    this.sanitizedSomething = !1, this.buf = []
                }
                sanitizeChildren(e) {
                    let t = e.firstChild,
                        n = !0;
                    for (; t;)
                        if (t.nodeType === Node.ELEMENT_NODE ? n = this.startElement(t) : t.nodeType === Node.TEXT_NODE ? this.chars(t.nodeValue) : this.sanitizedSomething = !0, n && t.firstChild) t = t.firstChild;
                        else
                            for (; t;) {
                                t.nodeType === Node.ELEMENT_NODE && this.endElement(t);
                                let e = this.checkClobberedElement(t, t.nextSibling);
                                if (e) {
                                    t = e;
                                    break
                                }
                                t = this.checkClobberedElement(t, t.parentNode)
                            }
                    return this.buf.join("")
                }
                startElement(e) {
                    const t = e.nodeName.toLowerCase();
                    if (!lt.hasOwnProperty(t)) return this.sanitizedSomething = !0, !it.hasOwnProperty(t);
                    this.buf.push("<"), this.buf.push(t);
                    const n = e.attributes;
                    for (let r = 0; r < n.length; r++) {
                        const e = n.item(r),
                            t = e.name,
                            o = t.toLowerCase();
                        if (!st.hasOwnProperty(o)) {
                            this.sanitizedSomething = !0;
                            continue
                        }
                        let s = e.value;
                        rt[o] && (s = Ge(s)), ot[o] && (l = s, s = (l = String(l)).split(",").map(e => Ge(e.trim())).join(", ")), this.buf.push(" ", t, '="', dt(s), '"')
                    }
                    var l;
                    return this.buf.push(">"), !0
                }
                endElement(e) {
                    const t = e.nodeName.toLowerCase();
                    lt.hasOwnProperty(t) && !Xe.hasOwnProperty(t) && (this.buf.push("</"), this.buf.push(t), this.buf.push(">"))
                }
                chars(e) {
                    this.buf.push(dt(e))
                }
                checkClobberedElement(e, t) {
                    if (t && (e.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_CONTAINED_BY) === Node.DOCUMENT_POSITION_CONTAINED_BY) throw new Error(`Failed to sanitize html because the element is clobbered: ${e.outerHTML}`);
                    return t
                }
            }
            const at = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g,
                ct = /([^\#-~ |!])/g;

            function dt(e) {
                return e.replace(/&/g, "&amp;").replace(at, function(e) {
                    return "&#" + (1024 * (e.charCodeAt(0) - 55296) + (e.charCodeAt(1) - 56320) + 65536) + ";"
                }).replace(ct, function(e) {
                    return "&#" + e.charCodeAt(0) + ";"
                }).replace(/</g, "&lt;").replace(/>/g, "&gt;")
            }
            let ht;

            function pt(e) {
                return "content" in e && function(e) {
                    return e.nodeType === Node.ELEMENT_NODE && "TEMPLATE" === e.nodeName
                }(e) ? e.content : null
            }
            const ft = function() {
                var e = {
                    NONE: 0,
                    HTML: 1,
                    STYLE: 2,
                    SCRIPT: 3,
                    URL: 4,
                    RESOURCE_URL: 5
                };
                return e[e.NONE] = "NONE", e[e.HTML] = "HTML", e[e.STYLE] = "STYLE", e[e.SCRIPT] = "SCRIPT", e[e.URL] = "URL", e[e.RESOURCE_URL] = "RESOURCE_URL", e
            }();
            class mt {}
            const gt = new RegExp("^([-,.\"'%_!# a-zA-Z0-9]+|(?:(?:matrix|translate|scale|rotate|skew|perspective)(?:X|Y|3d)?|(?:rgb|hsl)a?|(?:repeating-)?(?:linear|radial)-gradient|(?:calc|attr))\\([-0-9.%, #a-zA-Z]+\\))$", "g"),
                yt = /^url\(([^)]+)\)$/,
                _t = /([A-Z])/g;

            function wt(e) {
                try {
                    return null != e ? e.toString().slice(0, 30) : e
                } catch (t) {
                    return "[ERROR] Exception while trying to serialize the value"
                }
            }

            function bt(e) {
                return !!e && "function" == typeof e.then
            }
            let vt = null;

            function Ct() {
                if (!vt) {
                    const e = he.Symbol;
                    if (e && e.iterator) vt = e.iterator;
                    else {
                        const e = Object.getOwnPropertyNames(Map.prototype);
                        for (let t = 0; t < e.length; ++t) {
                            const n = e[t];
                            "entries" !== n && "size" !== n && Map.prototype[n] === Map.prototype.entries && (vt = n)
                        }
                    }
                }
                return vt
            }

            function xt(e, t) {
                return e === t || "number" == typeof e && "number" == typeof t && isNaN(e) && isNaN(t)
            }

            function Et(e, t) {
                const n = Tt(e),
                    l = Tt(t);
                if (n && l) return function(e, t, n) {
                    const l = e[Ct()](),
                        r = t[Ct()]();
                    for (;;) {
                        const e = l.next(),
                            t = r.next();
                        if (e.done && t.done) return !0;
                        if (e.done || t.done) return !1;
                        if (!n(e.value, t.value)) return !1
                    }
                }(e, t, Et); {
                    const r = e && ("object" == typeof e || "function" == typeof e),
                        o = t && ("object" == typeof t || "function" == typeof t);
                    return !(n || !r || l || !o) || xt(e, t)
                }
            }
            class kt {
                constructor(e) {
                    this.wrapped = e
                }
                static wrap(e) {
                    return new kt(e)
                }
                static unwrap(e) {
                    return kt.isWrapped(e) ? e.wrapped : e
                }
                static isWrapped(e) {
                    return e instanceof kt
                }
            }

            function Tt(e) {
                return !!It(e) && (Array.isArray(e) || !(e instanceof Map) && Ct() in e)
            }

            function It(e) {
                return null !== e && ("function" == typeof e || "object" == typeof e)
            }
            class St {
                constructor(e, t, n) {
                    this.previousValue = e, this.currentValue = t, this.firstChange = n
                }
                isFirstChange() {
                    return this.firstChange
                }
            }
            const At = new ge("The presence of this token marks an injector as being the root injector.");
            class Nt {}
            class Dt {}

            function Ot(e) {
                const t = Error(`No component factory found for ${ie(e)}. Did you add it to @NgModule.entryComponents?`);
                return t[Mt] = e, t
            }
            const Mt = "ngComponent";
            class Rt {
                resolveComponentFactory(e) {
                    throw Ot(e)
                }
            }
            const Pt = (() => {
                class e {}
                return e.NULL = new Rt, e
            })();
            class Vt {
                constructor(e, t, n) {
                    this._parent = t, this._ngModule = n, this._factories = new Map;
                    for (let l = 0; l < e.length; l++) {
                        const t = e[l];
                        this._factories.set(t.componentType, t)
                    }
                }
                resolveComponentFactory(e) {
                    let t = this._factories.get(e);
                    if (!t && this._parent && (t = this._parent.resolveComponentFactory(e)), !t) throw Ot(e);
                    return new Ht(t, this._ngModule)
                }
            }
            class Ht extends Dt {
                constructor(e, t) {
                    super(), this.factory = e, this.ngModule = t, this.selector = e.selector, this.componentType = e.componentType, this.ngContentSelectors = e.ngContentSelectors, this.inputs = e.inputs, this.outputs = e.outputs
                }
                create(e, t, n, l) {
                    return this.factory.create(e, t, n, l || this.ngModule)
                }
            }
            class jt {}
            class Lt {}

            function Ft(...e) {}
            const Bt = (() => {
                    class e {
                        constructor(e) {
                            this.nativeElement = e
                        }
                    }
                    return e.__NG_ELEMENT_ID__ = (() => zt(e)), e
                })(),
                zt = Ft;
            class $t {}
            class Ut {}
            const Zt = function() {
                    var e = {
                        Important: 1,
                        DashCase: 2
                    };
                    return e[e.Important] = "Important", e[e.DashCase] = "DashCase", e
                }(),
                Wt = (() => {
                    class e {}
                    return e.__NG_ELEMENT_ID__ = (() => Kt()), e
                })(),
                Kt = Ft;
            class Qt {
                constructor(e) {
                    this.full = e, this.major = e.split(".")[0], this.minor = e.split(".")[1], this.patch = e.split(".").slice(2).join(".")
                }
            }
            const qt = new Qt("8.0.3");
            class Gt {
                constructor() {}
                supports(e) {
                    return Tt(e)
                }
                create(e) {
                    return new Yt(e)
                }
            }
            const Jt = (e, t) => t;
            class Yt {
                constructor(e) {
                    this.length = 0, this._linkedRecords = null, this._unlinkedRecords = null, this._previousItHead = null, this._itHead = null, this._itTail = null, this._additionsHead = null, this._additionsTail = null, this._movesHead = null, this._movesTail = null, this._removalsHead = null, this._removalsTail = null, this._identityChangesHead = null, this._identityChangesTail = null, this._trackByFn = e || Jt
                }
                forEachItem(e) {
                    let t;
                    for (t = this._itHead; null !== t; t = t._next) e(t)
                }
                forEachOperation(e) {
                    let t = this._itHead,
                        n = this._removalsHead,
                        l = 0,
                        r = null;
                    for (; t || n;) {
                        const o = !n || t && t.currentIndex < nn(n, l, r) ? t : n,
                            s = nn(o, l, r),
                            i = o.currentIndex;
                        if (o === n) l--, n = n._nextRemoved;
                        else if (t = t._next, null == o.previousIndex) l++;
                        else {
                            r || (r = []);
                            const e = s - l,
                                t = i - l;
                            if (e != t) {
                                for (let n = 0; n < e; n++) {
                                    const l = n < r.length ? r[n] : r[n] = 0,
                                        o = l + n;
                                    t <= o && o < e && (r[n] = l + 1)
                                }
                                r[o.previousIndex] = t - e
                            }
                        }
                        s !== i && e(o, s, i)
                    }
                }
                forEachPreviousItem(e) {
                    let t;
                    for (t = this._previousItHead; null !== t; t = t._nextPrevious) e(t)
                }
                forEachAddedItem(e) {
                    let t;
                    for (t = this._additionsHead; null !== t; t = t._nextAdded) e(t)
                }
                forEachMovedItem(e) {
                    let t;
                    for (t = this._movesHead; null !== t; t = t._nextMoved) e(t)
                }
                forEachRemovedItem(e) {
                    let t;
                    for (t = this._removalsHead; null !== t; t = t._nextRemoved) e(t)
                }
                forEachIdentityChange(e) {
                    let t;
                    for (t = this._identityChangesHead; null !== t; t = t._nextIdentityChange) e(t)
                }
                diff(e) {
                    if (null == e && (e = []), !Tt(e)) throw new Error(`Error trying to diff '${ie(e)}'. Only arrays and iterables are allowed`);
                    return this.check(e) ? this : null
                }
                onDestroy() {}
                check(e) {
                    this._reset();
                    let t, n, l, r = this._itHead,
                        o = !1;
                    if (Array.isArray(e)) {
                        this.length = e.length;
                        for (let t = 0; t < this.length; t++) l = this._trackByFn(t, n = e[t]), null !== r && xt(r.trackById, l) ? (o && (r = this._verifyReinsertion(r, n, l, t)), xt(r.item, n) || this._addIdentityChange(r, n)) : (r = this._mismatch(r, n, l, t), o = !0), r = r._next
                    } else t = 0,
                        function(e, t) {
                            if (Array.isArray(e))
                                for (let n = 0; n < e.length; n++) t(e[n]);
                            else {
                                const n = e[Ct()]();
                                let l;
                                for (; !(l = n.next()).done;) t(l.value)
                            }
                        }(e, e => {
                            l = this._trackByFn(t, e), null !== r && xt(r.trackById, l) ? (o && (r = this._verifyReinsertion(r, e, l, t)), xt(r.item, e) || this._addIdentityChange(r, e)) : (r = this._mismatch(r, e, l, t), o = !0), r = r._next, t++
                        }), this.length = t;
                    return this._truncate(r), this.collection = e, this.isDirty
                }
                get isDirty() {
                    return null !== this._additionsHead || null !== this._movesHead || null !== this._removalsHead || null !== this._identityChangesHead
                }
                _reset() {
                    if (this.isDirty) {
                        let e, t;
                        for (e = this._previousItHead = this._itHead; null !== e; e = e._next) e._nextPrevious = e._next;
                        for (e = this._additionsHead; null !== e; e = e._nextAdded) e.previousIndex = e.currentIndex;
                        for (this._additionsHead = this._additionsTail = null, e = this._movesHead; null !== e; e = t) e.previousIndex = e.currentIndex, t = e._nextMoved;
                        this._movesHead = this._movesTail = null, this._removalsHead = this._removalsTail = null, this._identityChangesHead = this._identityChangesTail = null
                    }
                }
                _mismatch(e, t, n, l) {
                    let r;
                    return null === e ? r = this._itTail : (r = e._prev, this._remove(e)), null !== (e = null === this._linkedRecords ? null : this._linkedRecords.get(n, l)) ? (xt(e.item, t) || this._addIdentityChange(e, t), this._moveAfter(e, r, l)) : null !== (e = null === this._unlinkedRecords ? null : this._unlinkedRecords.get(n, null)) ? (xt(e.item, t) || this._addIdentityChange(e, t), this._reinsertAfter(e, r, l)) : e = this._addAfter(new Xt(t, n), r, l), e
                }
                _verifyReinsertion(e, t, n, l) {
                    let r = null === this._unlinkedRecords ? null : this._unlinkedRecords.get(n, null);
                    return null !== r ? e = this._reinsertAfter(r, e._prev, l) : e.currentIndex != l && (e.currentIndex = l, this._addToMoves(e, l)), e
                }
                _truncate(e) {
                    for (; null !== e;) {
                        const t = e._next;
                        this._addToRemovals(this._unlink(e)), e = t
                    }
                    null !== this._unlinkedRecords && this._unlinkedRecords.clear(), null !== this._additionsTail && (this._additionsTail._nextAdded = null), null !== this._movesTail && (this._movesTail._nextMoved = null), null !== this._itTail && (this._itTail._next = null), null !== this._removalsTail && (this._removalsTail._nextRemoved = null), null !== this._identityChangesTail && (this._identityChangesTail._nextIdentityChange = null)
                }
                _reinsertAfter(e, t, n) {
                    null !== this._unlinkedRecords && this._unlinkedRecords.remove(e);
                    const l = e._prevRemoved,
                        r = e._nextRemoved;
                    return null === l ? this._removalsHead = r : l._nextRemoved = r, null === r ? this._removalsTail = l : r._prevRemoved = l, this._insertAfter(e, t, n), this._addToMoves(e, n), e
                }
                _moveAfter(e, t, n) {
                    return this._unlink(e), this._insertAfter(e, t, n), this._addToMoves(e, n), e
                }
                _addAfter(e, t, n) {
                    return this._insertAfter(e, t, n), this._additionsTail = null === this._additionsTail ? this._additionsHead = e : this._additionsTail._nextAdded = e, e
                }
                _insertAfter(e, t, n) {
                    const l = null === t ? this._itHead : t._next;
                    return e._next = l, e._prev = t, null === l ? this._itTail = e : l._prev = e, null === t ? this._itHead = e : t._next = e, null === this._linkedRecords && (this._linkedRecords = new tn), this._linkedRecords.put(e), e.currentIndex = n, e
                }
                _remove(e) {
                    return this._addToRemovals(this._unlink(e))
                }
                _unlink(e) {
                    null !== this._linkedRecords && this._linkedRecords.remove(e);
                    const t = e._prev,
                        n = e._next;
                    return null === t ? this._itHead = n : t._next = n, null === n ? this._itTail = t : n._prev = t, e
                }
                _addToMoves(e, t) {
                    return e.previousIndex === t ? e : (this._movesTail = null === this._movesTail ? this._movesHead = e : this._movesTail._nextMoved = e, e)
                }
                _addToRemovals(e) {
                    return null === this._unlinkedRecords && (this._unlinkedRecords = new tn), this._unlinkedRecords.put(e), e.currentIndex = null, e._nextRemoved = null, null === this._removalsTail ? (this._removalsTail = this._removalsHead = e, e._prevRemoved = null) : (e._prevRemoved = this._removalsTail, this._removalsTail = this._removalsTail._nextRemoved = e), e
                }
                _addIdentityChange(e, t) {
                    return e.item = t, this._identityChangesTail = null === this._identityChangesTail ? this._identityChangesHead = e : this._identityChangesTail._nextIdentityChange = e, e
                }
            }
            class Xt {
                constructor(e, t) {
                    this.item = e, this.trackById = t, this.currentIndex = null, this.previousIndex = null, this._nextPrevious = null, this._prev = null, this._next = null, this._prevDup = null, this._nextDup = null, this._prevRemoved = null, this._nextRemoved = null, this._nextAdded = null, this._nextMoved = null, this._nextIdentityChange = null
                }
            }
            class en {
                constructor() {
                    this._head = null, this._tail = null
                }
                add(e) {
                    null === this._head ? (this._head = this._tail = e, e._nextDup = null, e._prevDup = null) : (this._tail._nextDup = e, e._prevDup = this._tail, e._nextDup = null, this._tail = e)
                }
                get(e, t) {
                    let n;
                    for (n = this._head; null !== n; n = n._nextDup)
                        if ((null === t || t <= n.currentIndex) && xt(n.trackById, e)) return n;
                    return null
                }
                remove(e) {
                    const t = e._prevDup,
                        n = e._nextDup;
                    return null === t ? this._head = n : t._nextDup = n, null === n ? this._tail = t : n._prevDup = t, null === this._head
                }
            }
            class tn {
                constructor() {
                    this.map = new Map
                }
                put(e) {
                    const t = e.trackById;
                    let n = this.map.get(t);
                    n || (n = new en, this.map.set(t, n)), n.add(e)
                }
                get(e, t) {
                    const n = this.map.get(e);
                    return n ? n.get(e, t) : null
                }
                remove(e) {
                    const t = e.trackById;
                    return this.map.get(t).remove(e) && this.map.delete(t), e
                }
                get isEmpty() {
                    return 0 === this.map.size
                }
                clear() {
                    this.map.clear()
                }
            }

            function nn(e, t, n) {
                const l = e.previousIndex;
                if (null === l) return l;
                let r = 0;
                return n && l < n.length && (r = n[l]), l + t + r
            }
            class ln {
                constructor() {}
                supports(e) {
                    return e instanceof Map || It(e)
                }
                create() {
                    return new rn
                }
            }
            class rn {
                constructor() {
                    this._records = new Map, this._mapHead = null, this._appendAfter = null, this._previousMapHead = null, this._changesHead = null, this._changesTail = null, this._additionsHead = null, this._additionsTail = null, this._removalsHead = null, this._removalsTail = null
                }
                get isDirty() {
                    return null !== this._additionsHead || null !== this._changesHead || null !== this._removalsHead
                }
                forEachItem(e) {
                    let t;
                    for (t = this._mapHead; null !== t; t = t._next) e(t)
                }
                forEachPreviousItem(e) {
                    let t;
                    for (t = this._previousMapHead; null !== t; t = t._nextPrevious) e(t)
                }
                forEachChangedItem(e) {
                    let t;
                    for (t = this._changesHead; null !== t; t = t._nextChanged) e(t)
                }
                forEachAddedItem(e) {
                    let t;
                    for (t = this._additionsHead; null !== t; t = t._nextAdded) e(t)
                }
                forEachRemovedItem(e) {
                    let t;
                    for (t = this._removalsHead; null !== t; t = t._nextRemoved) e(t)
                }
                diff(e) {
                    if (e) {
                        if (!(e instanceof Map || It(e))) throw new Error(`Error trying to diff '${ie(e)}'. Only maps and objects are allowed`)
                    } else e = new Map;
                    return this.check(e) ? this : null
                }
                onDestroy() {}
                check(e) {
                    this._reset();
                    let t = this._mapHead;
                    if (this._appendAfter = null, this._forEach(e, (e, n) => {
                            if (t && t.key === n) this._maybeAddToChanges(t, e), this._appendAfter = t, t = t._next;
                            else {
                                const l = this._getOrCreateRecordForKey(n, e);
                                t = this._insertBeforeOrAppend(t, l)
                            }
                        }), t) {
                        t._prev && (t._prev._next = null), this._removalsHead = t;
                        for (let e = t; null !== e; e = e._nextRemoved) e === this._mapHead && (this._mapHead = null), this._records.delete(e.key), e._nextRemoved = e._next, e.previousValue = e.currentValue, e.currentValue = null, e._prev = null, e._next = null
                    }
                    return this._changesTail && (this._changesTail._nextChanged = null), this._additionsTail && (this._additionsTail._nextAdded = null), this.isDirty
                }
                _insertBeforeOrAppend(e, t) {
                    if (e) {
                        const n = e._prev;
                        return t._next = e, t._prev = n, e._prev = t, n && (n._next = t), e === this._mapHead && (this._mapHead = t), this._appendAfter = e, e
                    }
                    return this._appendAfter ? (this._appendAfter._next = t, t._prev = this._appendAfter) : this._mapHead = t, this._appendAfter = t, null
                }
                _getOrCreateRecordForKey(e, t) {
                    if (this._records.has(e)) {
                        const n = this._records.get(e);
                        this._maybeAddToChanges(n, t);
                        const l = n._prev,
                            r = n._next;
                        return l && (l._next = r), r && (r._prev = l), n._next = null, n._prev = null, n
                    }
                    const n = new on(e);
                    return this._records.set(e, n), n.currentValue = t, this._addToAdditions(n), n
                }
                _reset() {
                    if (this.isDirty) {
                        let e;
                        for (this._previousMapHead = this._mapHead, e = this._previousMapHead; null !== e; e = e._next) e._nextPrevious = e._next;
                        for (e = this._changesHead; null !== e; e = e._nextChanged) e.previousValue = e.currentValue;
                        for (e = this._additionsHead; null != e; e = e._nextAdded) e.previousValue = e.currentValue;
                        this._changesHead = this._changesTail = null, this._additionsHead = this._additionsTail = null, this._removalsHead = null
                    }
                }
                _maybeAddToChanges(e, t) {
                    xt(t, e.currentValue) || (e.previousValue = e.currentValue, e.currentValue = t, this._addToChanges(e))
                }
                _addToAdditions(e) {
                    null === this._additionsHead ? this._additionsHead = this._additionsTail = e : (this._additionsTail._nextAdded = e, this._additionsTail = e)
                }
                _addToChanges(e) {
                    null === this._changesHead ? this._changesHead = this._changesTail = e : (this._changesTail._nextChanged = e, this._changesTail = e)
                }
                _forEach(e, t) {
                    e instanceof Map ? e.forEach(t) : Object.keys(e).forEach(n => t(e[n], n))
                }
            }
            class on {
                constructor(e) {
                    this.key = e, this.previousValue = null, this.currentValue = null, this._nextPrevious = null, this._next = null, this._prev = null, this._nextAdded = null, this._nextRemoved = null, this._nextChanged = null
                }
            }
            const sn = (() => {
                    class e {
                        constructor(e) {
                            this.factories = e
                        }
                        static create(t, n) {
                            if (null != n) {
                                const e = n.factories.slice();
                                t = t.concat(e)
                            }
                            return new e(t)
                        }
                        static extend(t) {
                            return {
                                provide: e,
                                useFactory: n => {
                                    if (!n) throw new Error("Cannot extend IterableDiffers without a parent injector");
                                    return e.create(t, n)
                                },
                                deps: [
                                    [e, new te, new X]
                                ]
                            }
                        }
                        find(e) {
                            const t = this.factories.find(t => t.supports(e));
                            if (null != t) return t;
                            throw new Error(`Cannot find a differ supporting object '${e}' of type '${n=e,n.name||typeof n}'`);
                            var n
                        }
                    }
                    return e.ngInjectableDef = re({
                        providedIn: "root",
                        factory: () => new e([new Gt])
                    }), e
                })(),
                un = (() => {
                    class e {
                        constructor(e) {
                            this.factories = e
                        }
                        static create(t, n) {
                            if (n) {
                                const e = n.factories.slice();
                                t = t.concat(e)
                            }
                            return new e(t)
                        }
                        static extend(t) {
                            return {
                                provide: e,
                                useFactory: n => {
                                    if (!n) throw new Error("Cannot extend KeyValueDiffers without a parent injector");
                                    return e.create(t, n)
                                },
                                deps: [
                                    [e, new te, new X]
                                ]
                            }
                        }
                        find(e) {
                            const t = this.factories.find(t => t.supports(e));
                            if (t) return t;
                            throw new Error(`Cannot find a differ supporting object '${e}'`)
                        }
                    }
                    return e.ngInjectableDef = re({
                        providedIn: "root",
                        factory: () => new e([new ln])
                    }), e
                })(),
                an = (() => {
                    class e {}
                    return e.__NG_ELEMENT_ID__ = (() => cn()), e
                })(),
                cn = (...e) => {},
                dn = [new ln],
                hn = new sn([new Gt]),
                pn = new un(dn),
                fn = (() => {
                    class e {}
                    return e.__NG_ELEMENT_ID__ = (() => mn(e, Bt)), e
                })(),
                mn = Ft,
                gn = (() => {
                    class e {}
                    return e.__NG_ELEMENT_ID__ = (() => yn(e, Bt)), e
                })(),
                yn = Ft;

            function _n(e, t, n, l) {
                let r = `ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked. Previous value: '${t}'. Current value: '${n}'.`;
                return l && (r += " It seems like the view has been created after its parent and its children have been dirty checked. Has it been created in a change detection hook ?"),
                    function(e, t) {
                        const n = new Error(e);
                        return wn(n, t), n
                    }(r, e)
            }

            function wn(e, t) {
                e[Pe] = t, e[He] = t.logError.bind(t)
            }

            function bn(e) {
                return new Error(`ViewDestroyedError: Attempt to use a destroyed view: ${e}`)
            }

            function vn(e, t, n) {
                const l = e.state,
                    r = 1792 & l;
                return r === t ? (e.state = -1793 & l | n, e.initIndex = -1, !0) : r === n
            }

            function Cn(e, t, n) {
                return (1792 & e.state) === t && e.initIndex <= n && (e.initIndex = n + 1, !0)
            }

            function xn(e, t) {
                return e.nodes[t]
            }

            function En(e, t) {
                return e.nodes[t]
            }

            function kn(e, t) {
                return e.nodes[t]
            }

            function Tn(e, t) {
                return e.nodes[t]
            }

            function In(e, t) {
                return e.nodes[t]
            }
            const Sn = {
                    setCurrentNode: void 0,
                    createRootView: void 0,
                    createEmbeddedView: void 0,
                    createComponentView: void 0,
                    createNgModuleRef: void 0,
                    overrideProvider: void 0,
                    overrideComponentView: void 0,
                    clearOverrides: void 0,
                    checkAndUpdateView: void 0,
                    checkNoChangesView: void 0,
                    destroyView: void 0,
                    resolveDep: void 0,
                    createDebugContext: void 0,
                    handleEvent: void 0,
                    updateDirectives: void 0,
                    updateRenderer: void 0,
                    dirtyParentQueries: void 0
                },
                An = () => {},
                Nn = new Map;

            function Dn(e) {
                let t = Nn.get(e);
                return t || (t = ie(e) + "_" + Nn.size, Nn.set(e, t)), t
            }
            const On = "$$undefined",
                Mn = "$$empty";

            function Rn(e) {
                return {
                    id: On,
                    styles: e.styles,
                    encapsulation: e.encapsulation,
                    data: e.data
                }
            }
            let Pn = 0;

            function Vn(e, t, n, l) {
                return !(!(2 & e.state) && xt(e.oldValues[t.bindingIndex + n], l))
            }

            function Hn(e, t, n, l) {
                return !!Vn(e, t, n, l) && (e.oldValues[t.bindingIndex + n] = l, !0)
            }

            function jn(e, t, n, l) {
                const r = e.oldValues[t.bindingIndex + n];
                if (1 & e.state || !Et(r, l)) {
                    const o = t.bindings[n].name;
                    throw _n(Sn.createDebugContext(e, t.nodeIndex), `${o}: ${r}`, `${o}: ${l}`, 0 != (1 & e.state))
                }
            }

            function Ln(e) {
                let t = e;
                for (; t;) 2 & t.def.flags && (t.state |= 8), t = t.viewContainerParent || t.parent
            }

            function Fn(e, t) {
                let n = e;
                for (; n && n !== t;) n.state |= 64, n = n.viewContainerParent || n.parent
            }

            function Bn(e, t, n, l) {
                try {
                    return Ln(33554432 & e.def.nodes[t].flags ? En(e, t).componentView : e), Sn.handleEvent(e, t, n, l)
                } catch (r) {
                    e.root.errorHandler.handleError(r)
                }
            }

            function zn(e) {
                return e.parent ? En(e.parent, e.parentNodeDef.nodeIndex) : null
            }

            function $n(e) {
                return e.parent ? e.parentNodeDef.parent : null
            }

            function Un(e, t) {
                switch (201347067 & t.flags) {
                    case 1:
                        return En(e, t.nodeIndex).renderElement;
                    case 2:
                        return xn(e, t.nodeIndex).renderText
                }
            }

            function Zn(e) {
                return !!e.parent && !!(32768 & e.parentNodeDef.flags)
            }

            function Wn(e) {
                return !(!e.parent || 32768 & e.parentNodeDef.flags)
            }

            function Kn(e) {
                const t = {};
                let n = 0;
                const l = {};
                return e && e.forEach(([e, r]) => {
                    "number" == typeof e ? (t[e] = r, n |= function(e) {
                        return 1 << e % 32
                    }(e)) : l[e] = r
                }), {
                    matchedQueries: t,
                    references: l,
                    matchedQueryIds: n
                }
            }

            function Qn(e, t) {
                return e.map(e => {
                    let n, l;
                    return Array.isArray(e) ? [l, n] = e : (l = 0, n = e), n && ("function" == typeof n || "object" == typeof n) && t && Object.defineProperty(n, ye, {
                        value: t,
                        configurable: !0
                    }), {
                        flags: l,
                        token: n,
                        tokenKey: Dn(n)
                    }
                })
            }

            function qn(e, t, n) {
                let l = n.renderParent;
                return l ? 0 == (1 & l.flags) || 0 == (33554432 & l.flags) || l.element.componentRendererType && l.element.componentRendererType.encapsulation === je.Native ? En(e, n.renderParent.nodeIndex).renderElement : void 0 : t
            }
            const Gn = new WeakMap;

            function Jn(e) {
                let t = Gn.get(e);
                return t || ((t = e(() => An)).factory = e, Gn.set(e, t)), t
            }

            function Yn(e, t, n, l, r) {
                3 === t && (n = e.renderer.parentNode(Un(e, e.def.lastRenderRootNode))), Xn(e, t, 0, e.def.nodes.length - 1, n, l, r)
            }

            function Xn(e, t, n, l, r, o, s) {
                for (let i = n; i <= l; i++) {
                    const n = e.def.nodes[i];
                    11 & n.flags && tl(e, n, t, r, o, s), i += n.childCount
                }
            }

            function el(e, t, n, l, r, o) {
                let s = e;
                for (; s && !Zn(s);) s = s.parent;
                const i = s.parent,
                    u = $n(s),
                    a = u.nodeIndex + u.childCount;
                for (let c = u.nodeIndex + 1; c <= a; c++) {
                    const e = i.def.nodes[c];
                    e.ngContentIndex === t && tl(i, e, n, l, r, o), c += e.childCount
                }
                if (!i.parent) {
                    const s = e.root.projectableNodes[t];
                    if (s)
                        for (let t = 0; t < s.length; t++) nl(e, s[t], n, l, r, o)
                }
            }

            function tl(e, t, n, l, r, o) {
                if (8 & t.flags) el(e, t.ngContent.index, n, l, r, o);
                else {
                    const s = Un(e, t);
                    if (3 === n && 33554432 & t.flags && 48 & t.bindingFlags ? (16 & t.bindingFlags && nl(e, s, n, l, r, o), 32 & t.bindingFlags && nl(En(e, t.nodeIndex).componentView, s, n, l, r, o)) : nl(e, s, n, l, r, o), 16777216 & t.flags) {
                        const s = En(e, t.nodeIndex).viewContainer._embeddedViews;
                        for (let e = 0; e < s.length; e++) Yn(s[e], n, l, r, o)
                    }
                    1 & t.flags && !t.element.name && Xn(e, n, t.nodeIndex + 1, t.nodeIndex + t.childCount, l, r, o)
                }
            }

            function nl(e, t, n, l, r, o) {
                const s = e.renderer;
                switch (n) {
                    case 1:
                        s.appendChild(l, t);
                        break;
                    case 2:
                        s.insertBefore(l, t, r);
                        break;
                    case 3:
                        s.removeChild(l, t);
                        break;
                    case 0:
                        o.push(t)
                }
            }
            const ll = /^:([^:]+):(.+)$/;

            function rl(e) {
                if (":" === e[0]) {
                    const t = e.match(ll);
                    return [t[1], t[2]]
                }
                return ["", e]
            }

            function ol(e) {
                let t = 0;
                for (let n = 0; n < e.length; n++) t |= e[n].flags;
                return t
            }
            const sl = new Object,
                il = Dn(ve),
                ul = Dn(we),
                al = Dn(jt);

            function cl(e, t, n, l) {
                return n = ce(n), {
                    index: -1,
                    deps: Qn(l, ie(t)),
                    flags: e,
                    token: t,
                    value: n
                }
            }

            function dl(e, t, n = ve.THROW_IF_NOT_FOUND) {
                const l = me(e);
                try {
                    if (8 & t.flags) return t.token;
                    if (2 & t.flags && (n = null), 1 & t.flags) return e._parent.get(t.token, n);
                    const s = t.tokenKey;
                    switch (s) {
                        case il:
                        case ul:
                        case al:
                            return e
                    }
                    const i = e._def.providersByKey[s];
                    let u;
                    if (i) {
                        let t = e._providers[i.index];
                        return void 0 === t && (t = e._providers[i.index] = hl(e, i)), t === sl ? void 0 : t
                    }
                    if ((u = oe(t.token)) && (r = e, null != (o = u).providedIn && (function(e, t) {
                            return e._def.modules.indexOf(o.providedIn) > -1
                        }(r) || "root" === o.providedIn && r._def.isRoot))) {
                        const n = e._providers.length;
                        return e._def.providers[n] = e._def.providersByKey[t.tokenKey] = {
                            flags: 5120,
                            value: u.factory,
                            deps: [],
                            index: n,
                            token: t.token
                        }, e._providers[n] = sl, e._providers[n] = hl(e, e._def.providersByKey[t.tokenKey])
                    }
                    return 4 & t.flags ? n : e._parent.get(t.token, n)
                } finally {
                    me(l)
                }
                var r, o
            }

            function hl(e, t) {
                let n;
                switch (201347067 & t.flags) {
                    case 512:
                        n = function(e, t, n) {
                            const l = n.length;
                            switch (l) {
                                case 0:
                                    return new t;
                                case 1:
                                    return new t(dl(e, n[0]));
                                case 2:
                                    return new t(dl(e, n[0]), dl(e, n[1]));
                                case 3:
                                    return new t(dl(e, n[0]), dl(e, n[1]), dl(e, n[2]));
                                default:
                                    const r = new Array(l);
                                    for (let t = 0; t < l; t++) r[t] = dl(e, n[t]);
                                    return new t(...r)
                            }
                        }(e, t.value, t.deps);
                        break;
                    case 1024:
                        n = function(e, t, n) {
                            const l = n.length;
                            switch (l) {
                                case 0:
                                    return t();
                                case 1:
                                    return t(dl(e, n[0]));
                                case 2:
                                    return t(dl(e, n[0]), dl(e, n[1]));
                                case 3:
                                    return t(dl(e, n[0]), dl(e, n[1]), dl(e, n[2]));
                                default:
                                    const r = Array(l);
                                    for (let t = 0; t < l; t++) r[t] = dl(e, n[t]);
                                    return t(...r)
                            }
                        }(e, t.value, t.deps);
                        break;
                    case 2048:
                        n = dl(e, t.deps[0]);
                        break;
                    case 256:
                        n = t.value
                }
                return n === sl || null === n || "object" != typeof n || 131072 & t.flags || "function" != typeof n.ngOnDestroy || (t.flags |= 131072), void 0 === n ? sl : n
            }

            function pl(e, t) {
                const n = e.viewContainer._embeddedViews;
                if ((null == t || t >= n.length) && (t = n.length - 1), t < 0) return null;
                const l = n[t];
                return l.viewContainerParent = null, yl(n, t), Sn.dirtyParentQueries(l), ml(l), l
            }

            function fl(e, t, n) {
                const l = t ? Un(t, t.def.lastRenderRootNode) : e.renderElement,
                    r = n.renderer.parentNode(l),
                    o = n.renderer.nextSibling(l);
                Yn(n, 2, r, o, void 0)
            }

            function ml(e) {
                Yn(e, 3, null, null, void 0)
            }

            function gl(e, t, n) {
                t >= e.length ? e.push(n) : e.splice(t, 0, n)
            }

            function yl(e, t) {
                t >= e.length - 1 ? e.pop() : e.splice(t, 1)
            }
            const _l = new Object;

            function wl(e, t, n, l, r, o) {
                return new bl(e, t, n, l, r, o)
            }
            class bl extends Dt {
                constructor(e, t, n, l, r, o) {
                    super(), this.selector = e, this.componentType = t, this._inputs = l, this._outputs = r, this.ngContentSelectors = o, this.viewDefFactory = n
                }
                get inputs() {
                    const e = [],
                        t = this._inputs;
                    for (let n in t) e.push({
                        propName: n,
                        templateName: t[n]
                    });
                    return e
                }
                get outputs() {
                    const e = [];
                    for (let t in this._outputs) e.push({
                        propName: t,
                        templateName: this._outputs[t]
                    });
                    return e
                }
                create(e, t, n, l) {
                    if (!l) throw new Error("ngModule should be provided");
                    const r = Jn(this.viewDefFactory),
                        o = r.nodes[0].element.componentProvider.nodeIndex,
                        s = Sn.createRootView(e, t || [], n, r, l, _l),
                        i = kn(s, o).instance;
                    return n && s.renderer.setAttribute(En(s, 0).renderElement, "ng-version", qt.full), new vl(s, new kl(s), i)
                }
            }
            class vl extends Nt {
                constructor(e, t, n) {
                    super(), this._view = e, this._viewRef = t, this._component = n, this._elDef = this._view.def.nodes[0], this.hostView = t, this.changeDetectorRef = t, this.instance = n
                }
                get location() {
                    return new Bt(En(this._view, this._elDef.nodeIndex).renderElement)
                }
                get injector() {
                    return new Al(this._view, this._elDef)
                }
                get componentType() {
                    return this._component.constructor
                }
                destroy() {
                    this._viewRef.destroy()
                }
                onDestroy(e) {
                    this._viewRef.onDestroy(e)
                }
            }

            function Cl(e, t, n) {
                return new xl(e, t, n)
            }
            class xl {
                constructor(e, t, n) {
                    this._view = e, this._elDef = t, this._data = n, this._embeddedViews = []
                }
                get element() {
                    return new Bt(this._data.renderElement)
                }
                get injector() {
                    return new Al(this._view, this._elDef)
                }
                get parentInjector() {
                    let e = this._view,
                        t = this._elDef.parent;
                    for (; !t && e;) t = $n(e), e = e.parent;
                    return e ? new Al(e, t) : new Al(this._view, null)
                }
                clear() {
                    for (let e = this._embeddedViews.length - 1; e >= 0; e--) {
                        const t = pl(this._data, e);
                        Sn.destroyView(t)
                    }
                }
                get(e) {
                    const t = this._embeddedViews[e];
                    if (t) {
                        const e = new kl(t);
                        return e.attachToViewContainerRef(this), e
                    }
                    return null
                }
                get length() {
                    return this._embeddedViews.length
                }
                createEmbeddedView(e, t, n) {
                    const l = e.createEmbeddedView(t || {});
                    return this.insert(l, n), l
                }
                createComponent(e, t, n, l, r) {
                    const o = n || this.parentInjector;
                    r || e instanceof Ht || (r = o.get(jt));
                    const s = e.create(o, l, void 0, r);
                    return this.insert(s.hostView, t), s
                }
                insert(e, t) {
                    if (e.destroyed) throw new Error("Cannot insert a destroyed View in a ViewContainer!");
                    const n = e;
                    return function(e, t, n, l) {
                        let r = t.viewContainer._embeddedViews;
                        null == n && (n = r.length), l.viewContainerParent = e, gl(r, n, l),
                            function(e, t) {
                                const n = zn(t);
                                if (!n || n === e || 16 & t.state) return;
                                t.state |= 16;
                                let l = n.template._projectedViews;
                                l || (l = n.template._projectedViews = []), l.push(t),
                                    function(e, n) {
                                        if (4 & n.flags) return;
                                        t.parent.def.nodeFlags |= 4, n.flags |= 4;
                                        let l = n.parent;
                                        for (; l;) l.childFlags |= 4, l = l.parent
                                    }(0, t.parentNodeDef)
                            }(t, l), Sn.dirtyParentQueries(l), fl(t, n > 0 ? r[n - 1] : null, l)
                    }(this._view, this._data, t, n._view), n.attachToViewContainerRef(this), e
                }
                move(e, t) {
                    if (e.destroyed) throw new Error("Cannot move a destroyed View in a ViewContainer!");
                    const n = this._embeddedViews.indexOf(e._view);
                    return function(e, t, l) {
                        const r = e.viewContainer._embeddedViews,
                            o = r[n];
                        yl(r, n), null == l && (l = r.length), gl(r, l, o), Sn.dirtyParentQueries(o), ml(o), fl(e, l > 0 ? r[l - 1] : null, o)
                    }(this._data, 0, t), e
                }
                indexOf(e) {
                    return this._embeddedViews.indexOf(e._view)
                }
                remove(e) {
                    const t = pl(this._data, e);
                    t && Sn.destroyView(t)
                }
                detach(e) {
                    const t = pl(this._data, e);
                    return t ? new kl(t) : null
                }
            }

            function El(e) {
                return new kl(e)
            }
            class kl {
                constructor(e) {
                    this._view = e, this._viewContainerRef = null, this._appRef = null
                }
                get rootNodes() {
                    return function(e) {
                        const t = [];
                        return Yn(e, 0, void 0, void 0, t), t
                    }(this._view)
                }
                get context() {
                    return this._view.context
                }
                get destroyed() {
                    return 0 != (128 & this._view.state)
                }
                markForCheck() {
                    Ln(this._view)
                }
                detach() {
                    this._view.state &= -5
                }
                detectChanges() {
                    const e = this._view.root.rendererFactory;
                    e.begin && e.begin();
                    try {
                        Sn.checkAndUpdateView(this._view)
                    } finally {
                        e.end && e.end()
                    }
                }
                checkNoChanges() {
                    Sn.checkNoChangesView(this._view)
                }
                reattach() {
                    this._view.state |= 4
                }
                onDestroy(e) {
                    this._view.disposables || (this._view.disposables = []), this._view.disposables.push(e)
                }
                destroy() {
                    this._appRef ? this._appRef.detachView(this) : this._viewContainerRef && this._viewContainerRef.detach(this._viewContainerRef.indexOf(this)), Sn.destroyView(this._view)
                }
                detachFromAppRef() {
                    this._appRef = null, ml(this._view), Sn.dirtyParentQueries(this._view)
                }
                attachToAppRef(e) {
                    if (this._viewContainerRef) throw new Error("This view is already attached to a ViewContainer!");
                    this._appRef = e
                }
                attachToViewContainerRef(e) {
                    if (this._appRef) throw new Error("This view is already attached directly to the ApplicationRef!");
                    this._viewContainerRef = e
                }
            }

            function Tl(e, t) {
                return new Il(e, t)
            }
            class Il extends fn {
                constructor(e, t) {
                    super(), this._parentView = e, this._def = t
                }
                createEmbeddedView(e) {
                    return new kl(Sn.createEmbeddedView(this._parentView, this._def, this._def.element.template, e))
                }
                get elementRef() {
                    return new Bt(En(this._parentView, this._def.nodeIndex).renderElement)
                }
            }

            function Sl(e, t) {
                return new Al(e, t)
            }
            class Al {
                constructor(e, t) {
                    this.view = e, this.elDef = t
                }
                get(e, t = ve.THROW_IF_NOT_FOUND) {
                    return Sn.resolveDep(this.view, this.elDef, !!this.elDef && 0 != (33554432 & this.elDef.flags), {
                        flags: 0,
                        token: e,
                        tokenKey: Dn(e)
                    }, t)
                }
            }

            function Nl(e) {
                return new Dl(e.renderer)
            }
            class Dl {
                constructor(e) {
                    this.delegate = e
                }
                selectRootElement(e) {
                    return this.delegate.selectRootElement(e)
                }
                createElement(e, t) {
                    const [n, l] = rl(t), r = this.delegate.createElement(l, n);
                    return e && this.delegate.appendChild(e, r), r
                }
                createViewRoot(e) {
                    return e
                }
                createTemplateAnchor(e) {
                    const t = this.delegate.createComment("");
                    return e && this.delegate.appendChild(e, t), t
                }
                createText(e, t) {
                    const n = this.delegate.createText(t);
                    return e && this.delegate.appendChild(e, n), n
                }
                projectNodes(e, t) {
                    for (let n = 0; n < t.length; n++) this.delegate.appendChild(e, t[n])
                }
                attachViewAfter(e, t) {
                    const n = this.delegate.parentNode(e),
                        l = this.delegate.nextSibling(e);
                    for (let r = 0; r < t.length; r++) this.delegate.insertBefore(n, t[r], l)
                }
                detachView(e) {
                    for (let t = 0; t < e.length; t++) {
                        const n = e[t],
                            l = this.delegate.parentNode(n);
                        this.delegate.removeChild(l, n)
                    }
                }
                destroyView(e, t) {
                    for (let n = 0; n < t.length; n++) this.delegate.destroyNode(t[n])
                }
                listen(e, t, n) {
                    return this.delegate.listen(e, t, n)
                }
                listenGlobal(e, t, n) {
                    return this.delegate.listen(e, t, n)
                }
                setElementProperty(e, t, n) {
                    this.delegate.setProperty(e, t, n)
                }
                setElementAttribute(e, t, n) {
                    const [l, r] = rl(t);
                    null != n ? this.delegate.setAttribute(e, r, n, l) : this.delegate.removeAttribute(e, r, l)
                }
                setBindingDebugInfo(e, t, n) {}
                setElementClass(e, t, n) {
                    n ? this.delegate.addClass(e, t) : this.delegate.removeClass(e, t)
                }
                setElementStyle(e, t, n) {
                    null != n ? this.delegate.setStyle(e, t, n) : this.delegate.removeStyle(e, t)
                }
                invokeElementMethod(e, t, n) {
                    e[t].apply(e, n)
                }
                setText(e, t) {
                    this.delegate.setValue(e, t)
                }
                animate() {
                    throw new Error("Renderer.animate is no longer supported!")
                }
            }

            function Ol(e, t, n, l) {
                return new Ml(e, t, n, l)
            }
            class Ml {
                constructor(e, t, n, l) {
                    this._moduleType = e, this._parent = t, this._bootstrapComponents = n, this._def = l, this._destroyListeners = [], this._destroyed = !1, this.injector = this,
                        function(e) {
                            const t = e._def,
                                n = e._providers = new Array(t.providers.length);
                            for (let l = 0; l < t.providers.length; l++) {
                                const r = t.providers[l];
                                4096 & r.flags || void 0 === n[l] && (n[l] = hl(e, r))
                            }
                        }(this)
                }
                get(e, t = ve.THROW_IF_NOT_FOUND, n = ne.Default) {
                    let l = 0;
                    return n & ne.SkipSelf ? l |= 1 : n & ne.Self && (l |= 4), dl(this, {
                        token: e,
                        tokenKey: Dn(e),
                        flags: l
                    }, t)
                }
                get instance() {
                    return this.get(this._moduleType)
                }
                get componentFactoryResolver() {
                    return this.get(Pt)
                }
                destroy() {
                    if (this._destroyed) throw new Error(`The ng module ${ie(this.instance.constructor)} has already been destroyed.`);
                    this._destroyed = !0,
                        function(e, t) {
                            const n = e._def,
                                l = new Set;
                            for (let r = 0; r < n.providers.length; r++)
                                if (131072 & n.providers[r].flags) {
                                    const t = e._providers[r];
                                    if (t && t !== sl) {
                                        const e = t.ngOnDestroy;
                                        "function" != typeof e || l.has(t) || (e.apply(t), l.add(t))
                                    }
                                }
                        }(this), this._destroyListeners.forEach(e => e())
                }
                onDestroy(e) {
                    this._destroyListeners.push(e)
                }
            }
            const Rl = Dn($t),
                Pl = Dn(Wt),
                Vl = Dn(Bt),
                Hl = Dn(gn),
                jl = Dn(fn),
                Ll = Dn(an),
                Fl = Dn(ve),
                Bl = Dn(we);

            function zl(e, t, n, l, r, o, s, i) {
                const u = [];
                if (s)
                    for (let c in s) {
                        const [e, t] = s[c];
                        u[e] = {
                            flags: 8,
                            name: c,
                            nonMinifiedName: t,
                            ns: null,
                            securityContext: null,
                            suffix: null
                        }
                    }
                const a = [];
                if (i)
                    for (let c in i) a.push({
                        type: 1,
                        propName: c,
                        target: null,
                        eventName: i[c]
                    });
                return function(e, t, n, l, r, o, s, i, u) {
                    const {
                        matchedQueries: a,
                        references: c,
                        matchedQueryIds: d
                    } = Kn(n);
                    u || (u = []), i || (i = []), o = ce(o);
                    const h = Qn(s, ie(r));
                    return {
                        nodeIndex: -1,
                        parent: null,
                        renderParent: null,
                        bindingIndex: -1,
                        outputIndex: -1,
                        checkIndex: e,
                        flags: t,
                        childFlags: 0,
                        directChildFlags: 0,
                        childMatchedQueries: 0,
                        matchedQueries: a,
                        matchedQueryIds: d,
                        references: c,
                        ngContentIndex: -1,
                        childCount: l,
                        bindings: i,
                        bindingFlags: ol(i),
                        outputs: u,
                        element: null,
                        provider: {
                            token: r,
                            value: o,
                            deps: h
                        },
                        text: null,
                        query: null,
                        ngContent: null
                    }
                }(e, t |= 16384, n, l, r, r, o, u, a)
            }

            function $l(e, t) {
                return Kl(e, t)
            }

            function Ul(e, t) {
                let n = e;
                for (; n.parent && !Zn(n);) n = n.parent;
                return Ql(n.parent, $n(n), !0, t.provider.value, t.provider.deps)
            }

            function Zl(e, t) {
                const n = Ql(e, t.parent, (32768 & t.flags) > 0, t.provider.value, t.provider.deps);
                if (t.outputs.length)
                    for (let r = 0; r < t.outputs.length; r++) {
                        const o = t.outputs[r],
                            s = n[o.propName];
                        if (!(l = s) || "function" != typeof l.subscribe) throw new Error(`@Output ${o.propName} not initialized in '${n.constructor.name}'.`); {
                            const n = s.subscribe(Wl(e, t.parent.nodeIndex, o.eventName));
                            e.disposables[t.outputIndex + r] = n.unsubscribe.bind(n)
                        }
                    }
                var l;
                return n
            }

            function Wl(e, t, n) {
                return l => Bn(e, t, n, l)
            }

            function Kl(e, t) {
                const n = (8192 & t.flags) > 0,
                    l = t.provider;
                switch (201347067 & t.flags) {
                    case 512:
                        return Ql(e, t.parent, n, l.value, l.deps);
                    case 1024:
                        return function(e, t, n, l, r) {
                            const o = r.length;
                            switch (o) {
                                case 0:
                                    return l();
                                case 1:
                                    return l(Gl(e, t, n, r[0]));
                                case 2:
                                    return l(Gl(e, t, n, r[0]), Gl(e, t, n, r[1]));
                                case 3:
                                    return l(Gl(e, t, n, r[0]), Gl(e, t, n, r[1]), Gl(e, t, n, r[2]));
                                default:
                                    const s = Array(o);
                                    for (let l = 0; l < o; l++) s[l] = Gl(e, t, n, r[l]);
                                    return l(...s)
                            }
                        }(e, t.parent, n, l.value, l.deps);
                    case 2048:
                        return Gl(e, t.parent, n, l.deps[0]);
                    case 256:
                        return l.value
                }
            }

            function Ql(e, t, n, l, r) {
                const o = r.length;
                switch (o) {
                    case 0:
                        return new l;
                    case 1:
                        return new l(Gl(e, t, n, r[0]));
                    case 2:
                        return new l(Gl(e, t, n, r[0]), Gl(e, t, n, r[1]));
                    case 3:
                        return new l(Gl(e, t, n, r[0]), Gl(e, t, n, r[1]), Gl(e, t, n, r[2]));
                    default:
                        const s = new Array(o);
                        for (let l = 0; l < o; l++) s[l] = Gl(e, t, n, r[l]);
                        return new l(...s)
                }
            }
            const ql = {};

            function Gl(e, t, n, l, r = ve.THROW_IF_NOT_FOUND) {
                if (8 & l.flags) return l.token;
                const o = e;
                2 & l.flags && (r = null);
                const s = l.tokenKey;
                s === Ll && (n = !(!t || !t.element.componentView)), t && 1 & l.flags && (n = !1, t = t.parent);
                let i = e;
                for (; i;) {
                    if (t) switch (s) {
                        case Rl:
                            return Nl(Jl(i, t, n));
                        case Pl:
                            return Jl(i, t, n).renderer;
                        case Vl:
                            return new Bt(En(i, t.nodeIndex).renderElement);
                        case Hl:
                            return En(i, t.nodeIndex).viewContainer;
                        case jl:
                            if (t.element.template) return En(i, t.nodeIndex).template;
                            break;
                        case Ll:
                            return El(Jl(i, t, n));
                        case Fl:
                        case Bl:
                            return Sl(i, t);
                        default:
                            const e = (n ? t.element.allProviders : t.element.publicProviders)[s];
                            if (e) {
                                let t = kn(i, e.nodeIndex);
                                return t || (t = {
                                    instance: Kl(i, e)
                                }, i.nodes[e.nodeIndex] = t), t.instance
                            }
                    }
                    n = Zn(i), t = $n(i), i = i.parent, 4 & l.flags && (i = null)
                }
                const u = o.root.injector.get(l.token, ql);
                return u !== ql || r === ql ? u : o.root.ngModule.injector.get(l.token, r)
            }

            function Jl(e, t, n) {
                let l;
                if (n) l = En(e, t.nodeIndex).componentView;
                else
                    for (l = e; l.parent && !Zn(l);) l = l.parent;
                return l
            }

            function Yl(e, t, n, l, r, o) {
                if (32768 & n.flags) {
                    const t = En(e, n.parent.nodeIndex).componentView;
                    2 & t.def.flags && (t.state |= 8)
                }
                if (t.instance[n.bindings[l].name] = r, 524288 & n.flags) {
                    o = o || {};
                    const t = kt.unwrap(e.oldValues[n.bindingIndex + l]);
                    o[n.bindings[l].nonMinifiedName] = new St(t, r, 0 != (2 & e.state))
                }
                return e.oldValues[n.bindingIndex + l] = r, o
            }

            function Xl(e, t) {
                if (!(e.def.nodeFlags & t)) return;
                const n = e.def.nodes;
                let l = 0;
                for (let r = 0; r < n.length; r++) {
                    const o = n[r];
                    let s = o.parent;
                    for (!s && o.flags & t && tr(e, r, o.flags & t, l++), 0 == (o.childFlags & t) && (r += o.childCount); s && 1 & s.flags && r === s.nodeIndex + s.childCount;) s.directChildFlags & t && (l = er(e, s, t, l)), s = s.parent
                }
            }

            function er(e, t, n, l) {
                for (let r = t.nodeIndex + 1; r <= t.nodeIndex + t.childCount; r++) {
                    const t = e.def.nodes[r];
                    t.flags & n && tr(e, r, t.flags & n, l++), r += t.childCount
                }
                return l
            }

            function tr(e, t, n, l) {
                const r = kn(e, t);
                if (!r) return;
                const o = r.instance;
                o && (Sn.setCurrentNode(e, t), 1048576 & n && Cn(e, 512, l) && o.ngAfterContentInit(), 2097152 & n && o.ngAfterContentChecked(), 4194304 & n && Cn(e, 768, l) && o.ngAfterViewInit(), 8388608 & n && o.ngAfterViewChecked(), 131072 & n && o.ngOnDestroy())
            }
            const nr = new ge("SCHEDULER_TOKEN", {
                providedIn: "root",
                factory: () => Le
            });
            class lr extends E {
                constructor(e = !1) {
                    super(), this.__isAsync = e
                }
                emit(e) {
                    super.next(e)
                }
                subscribe(e, t, n) {
                    let l, r = e => null,
                        o = () => null;
                    e && "object" == typeof e ? (l = this.__isAsync ? t => {
                        setTimeout(() => e.next(t))
                    } : t => {
                        e.next(t)
                    }, e.error && (r = this.__isAsync ? t => {
                        setTimeout(() => e.error(t))
                    } : t => {
                        e.error(t)
                    }), e.complete && (o = this.__isAsync ? () => {
                        setTimeout(() => e.complete())
                    } : () => {
                        e.complete()
                    })) : (l = this.__isAsync ? t => {
                        setTimeout(() => e(t))
                    } : t => {
                        e(t)
                    }, t && (r = this.__isAsync ? e => {
                        setTimeout(() => t(e))
                    } : e => {
                        t(e)
                    }), n && (o = this.__isAsync ? () => {
                        setTimeout(() => n())
                    } : () => {
                        n()
                    }));
                    const s = super.subscribe(l, r, o);
                    return e instanceof h && e.add(s), s
                }
            }
            class rr {
                constructor() {
                    this.dirty = !0, this._results = [], this.changes = new lr, this.length = 0
                }
                map(e) {
                    return this._results.map(e)
                }
                filter(e) {
                    return this._results.filter(e)
                }
                find(e) {
                    return this._results.find(e)
                }
                reduce(e, t) {
                    return this._results.reduce(e, t)
                }
                forEach(e) {
                    this._results.forEach(e)
                }
                some(e) {
                    return this._results.some(e)
                }
                toArray() {
                    return this._results.slice()
                } [Ct()]() {
                    return this._results[Ct()]()
                }
                toString() {
                    return this._results.toString()
                }
                reset(e) {
                    this._results = function e(t, n) {
                        void 0 === n && (n = t);
                        for (let l = 0; l < t.length; l++) {
                            let r = t[l];
                            Array.isArray(r) ? (n === t && (n = t.slice(0, l)), e(r, n)) : n !== t && n.push(r)
                        }
                        return n
                    }(e), this.dirty = !1, this.length = this._results.length, this.last = this._results[this.length - 1], this.first = this._results[0]
                }
                notifyOnChanges() {
                    this.changes.emit(this)
                }
                setDirty() {
                    this.dirty = !0
                }
                destroy() {
                    this.changes.complete(), this.changes.unsubscribe()
                }
            }
            const or = new ge("Application Initializer"),
                sr = (() => (class {
                    constructor(e) {
                        this.appInits = e, this.initialized = !1, this.done = !1, this.donePromise = new Promise((e, t) => {
                            this.resolve = e, this.reject = t
                        })
                    }
                    runInitializers() {
                        if (this.initialized) return;
                        const e = [],
                            t = () => {
                                this.done = !0, this.resolve()
                            };
                        if (this.appInits)
                            for (let n = 0; n < this.appInits.length; n++) {
                                const t = this.appInits[n]();
                                bt(t) && e.push(t)
                            }
                        Promise.all(e).then(() => {
                            t()
                        }).catch(e => {
                            this.reject(e)
                        }), 0 === e.length && t(), this.initialized = !0
                    }
                }))(),
                ir = new ge("AppId");

            function ur() {
                return `${ar()}${ar()}${ar()}`
            }

            function ar() {
                return String.fromCharCode(97 + Math.floor(25 * Math.random()))
            }
            const cr = new ge("Platform Initializer"),
                dr = new ge("Platform ID"),
                hr = new ge("appBootstrapListener"),
                pr = (() => (class {
                    log(e) {
                        console.log(e)
                    }
                    warn(e) {
                        console.warn(e)
                    }
                }))();

            function fr() {
                throw new Error("Runtime compiler is not loaded")
            }
            const mr = fr,
                gr = fr,
                yr = fr,
                _r = fr,
                wr = (() => (class {
                    constructor() {
                        this.compileModuleSync = mr, this.compileModuleAsync = gr, this.compileModuleAndAllComponentsSync = yr, this.compileModuleAndAllComponentsAsync = _r
                    }
                    clearCache() {}
                    clearCacheFor(e) {}
                    getModuleId(e) {}
                }))();
            class br {}
            let vr, Cr;

            function xr() {
                const e = he.wtf;
                return !(!e || !(vr = e.trace) || (Cr = vr.events, 0))
            }
            const Er = xr(),
                kr = Er ? function(e, t = null) {
                    return Cr.createScope(e, t)
                } : (e, t) => (function(e, t) {
                    return null
                }),
                Tr = Er ? function(e, t) {
                    return vr.leaveScope(e, t), t
                } : (e, t) => t,
                Ir = (() => Promise.resolve(0))();

            function Sr(e) {
                "undefined" == typeof Zone ? Ir.then(() => {
                    e && e.apply(null, null)
                }) : Zone.current.scheduleMicroTask("scheduleMicrotask", e)
            }
            class Ar {
                constructor({
                    enableLongStackTrace: e = !1
                }) {
                    if (this.hasPendingMicrotasks = !1, this.hasPendingMacrotasks = !1, this.isStable = !0, this.onUnstable = new lr(!1), this.onMicrotaskEmpty = new lr(!1), this.onStable = new lr(!1), this.onError = new lr(!1), "undefined" == typeof Zone) throw new Error("In this configuration Angular requires Zone.js");
                    var t;
                    Zone.assertZonePatched(), this._nesting = 0, this._outer = this._inner = Zone.current, Zone.wtfZoneSpec && (this._inner = this._inner.fork(Zone.wtfZoneSpec)), Zone.TaskTrackingZoneSpec && (this._inner = this._inner.fork(new Zone.TaskTrackingZoneSpec)), e && Zone.longStackTraceZoneSpec && (this._inner = this._inner.fork(Zone.longStackTraceZoneSpec)), (t = this)._inner = t._inner.fork({
                        name: "angular",
                        properties: {
                            isAngularZone: !0
                        },
                        onInvokeTask: (e, n, l, r, o, s) => {
                            try {
                                return Mr(t), e.invokeTask(l, r, o, s)
                            } finally {
                                Rr(t)
                            }
                        },
                        onInvoke: (e, n, l, r, o, s, i) => {
                            try {
                                return Mr(t), e.invoke(l, r, o, s, i)
                            } finally {
                                Rr(t)
                            }
                        },
                        onHasTask: (e, n, l, r) => {
                            e.hasTask(l, r), n === l && ("microTask" == r.change ? (t.hasPendingMicrotasks = r.microTask, Or(t)) : "macroTask" == r.change && (t.hasPendingMacrotasks = r.macroTask))
                        },
                        onHandleError: (e, n, l, r) => (e.handleError(l, r), t.runOutsideAngular(() => t.onError.emit(r)), !1)
                    })
                }
                static isInAngularZone() {
                    return !0 === Zone.current.get("isAngularZone")
                }
                static assertInAngularZone() {
                    if (!Ar.isInAngularZone()) throw new Error("Expected to be in Angular Zone, but it is not!")
                }
                static assertNotInAngularZone() {
                    if (Ar.isInAngularZone()) throw new Error("Expected to not be in Angular Zone, but it is!")
                }
                run(e, t, n) {
                    return this._inner.run(e, t, n)
                }
                runTask(e, t, n, l) {
                    const r = this._inner,
                        o = r.scheduleEventTask("NgZoneEvent: " + l, e, Dr, Nr, Nr);
                    try {
                        return r.runTask(o, t, n)
                    } finally {
                        r.cancelTask(o)
                    }
                }
                runGuarded(e, t, n) {
                    return this._inner.runGuarded(e, t, n)
                }
                runOutsideAngular(e) {
                    return this._outer.run(e)
                }
            }

            function Nr() {}
            const Dr = {};

            function Or(e) {
                if (0 == e._nesting && !e.hasPendingMicrotasks && !e.isStable) try {
                    e._nesting++, e.onMicrotaskEmpty.emit(null)
                } finally {
                    if (e._nesting--, !e.hasPendingMicrotasks) try {
                        e.runOutsideAngular(() => e.onStable.emit(null))
                    } finally {
                        e.isStable = !0
                    }
                }
            }

            function Mr(e) {
                e._nesting++, e.isStable && (e.isStable = !1, e.onUnstable.emit(null))
            }

            function Rr(e) {
                e._nesting--, Or(e)
            }
            class Pr {
                constructor() {
                    this.hasPendingMicrotasks = !1, this.hasPendingMacrotasks = !1, this.isStable = !0, this.onUnstable = new lr, this.onMicrotaskEmpty = new lr, this.onStable = new lr, this.onError = new lr
                }
                run(e) {
                    return e()
                }
                runGuarded(e) {
                    return e()
                }
                runOutsideAngular(e) {
                    return e()
                }
                runTask(e) {
                    return e()
                }
            }
            const Vr = (() => (class {
                    constructor(e) {
                        this._ngZone = e, this._pendingCount = 0, this._isZoneStable = !0, this._didWork = !1, this._callbacks = [], this.taskTrackingZone = null, this._watchAngularEvents(), e.run(() => {
                            this.taskTrackingZone = "undefined" == typeof Zone ? null : Zone.current.get("TaskTrackingZone")
                        })
                    }
                    _watchAngularEvents() {
                        this._ngZone.onUnstable.subscribe({
                            next: () => {
                                this._didWork = !0, this._isZoneStable = !1
                            }
                        }), this._ngZone.runOutsideAngular(() => {
                            this._ngZone.onStable.subscribe({
                                next: () => {
                                    Ar.assertNotInAngularZone(), Sr(() => {
                                        this._isZoneStable = !0, this._runCallbacksIfReady()
                                    })
                                }
                            })
                        })
                    }
                    increasePendingRequestCount() {
                        return this._pendingCount += 1, this._didWork = !0, this._pendingCount
                    }
                    decreasePendingRequestCount() {
                        if (this._pendingCount -= 1, this._pendingCount < 0) throw new Error("pending async requests below zero");
                        return this._runCallbacksIfReady(), this._pendingCount
                    }
                    isStable() {
                        return this._isZoneStable && 0 === this._pendingCount && !this._ngZone.hasPendingMacrotasks
                    }
                    _runCallbacksIfReady() {
                        if (this.isStable()) Sr(() => {
                            for (; 0 !== this._callbacks.length;) {
                                let e = this._callbacks.pop();
                                clearTimeout(e.timeoutId), e.doneCb(this._didWork)
                            }
                            this._didWork = !1
                        });
                        else {
                            let e = this.getPendingTasks();
                            this._callbacks = this._callbacks.filter(t => !t.updateCb || !t.updateCb(e) || (clearTimeout(t.timeoutId), !1)), this._didWork = !0
                        }
                    }
                    getPendingTasks() {
                        return this.taskTrackingZone ? this.taskTrackingZone.macroTasks.map(e => ({
                            source: e.source,
                            creationLocation: e.creationLocation,
                            data: e.data
                        })) : []
                    }
                    addCallback(e, t, n) {
                        let l = -1;
                        t && t > 0 && (l = setTimeout(() => {
                            this._callbacks = this._callbacks.filter(e => e.timeoutId !== l), e(this._didWork, this.getPendingTasks())
                        }, t)), this._callbacks.push({
                            doneCb: e,
                            timeoutId: l,
                            updateCb: n
                        })
                    }
                    whenStable(e, t, n) {
                        if (n && !this.taskTrackingZone) throw new Error('Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/dist/task-tracking.js" loaded?');
                        this.addCallback(e, t, n), this._runCallbacksIfReady()
                    }
                    getPendingRequestCount() {
                        return this._pendingCount
                    }
                    findProviders(e, t, n) {
                        return []
                    }
                }))(),
                Hr = (() => {
                    class e {
                        constructor() {
                            this._applications = new Map, Fr.addToWindow(this)
                        }
                        registerApplication(e, t) {
                            this._applications.set(e, t)
                        }
                        unregisterApplication(e) {
                            this._applications.delete(e)
                        }
                        unregisterAllApplications() {
                            this._applications.clear()
                        }
                        getTestability(e) {
                            return this._applications.get(e) || null
                        }
                        getAllTestabilities() {
                            return Array.from(this._applications.values())
                        }
                        getAllRootElements() {
                            return Array.from(this._applications.keys())
                        }
                        findTestabilityInTree(e, t = !0) {
                            return Fr.findTestabilityInTree(this, e, t)
                        }
                    }
                    return e.ctorParameters = (() => []), e
                })();
            class jr {
                addToWindow(e) {}
                findTestabilityInTree(e, t, n) {
                    return null
                }
            }
            let Lr, Fr = new jr,
                Br = function(e) {
                    return e instanceof Ht
                };
            const zr = new ge("AllowMultipleToken");
            class $r {
                constructor(e, t) {
                    this.name = e, this.token = t
                }
            }

            function Ur(e, t, n = []) {
                const l = `Platform: ${t}`,
                    r = new ge(l);
                return (t = []) => {
                    let o = Zr();
                    if (!o || o.injector.get(zr, !1))
                        if (e) e(n.concat(t).concat({
                            provide: r,
                            useValue: !0
                        }));
                        else {
                            const e = n.concat(t).concat({
                                provide: r,
                                useValue: !0
                            });
                            ! function(e) {
                                if (Lr && !Lr.destroyed && !Lr.injector.get(zr, !1)) throw new Error("There can be only one platform. Destroy the previous one to create a new one.");
                                Lr = e.get(Wr);
                                const t = e.get(cr, null);
                                t && t.forEach(e => e())
                            }(ve.create({
                                providers: e,
                                name: l
                            }))
                        } return function(e) {
                        const t = Zr();
                        if (!t) throw new Error("No platform exists!");
                        if (!t.injector.get(e, null)) throw new Error("A platform with a different configuration has been created. Please destroy it first.");
                        return t
                    }(r)
                }
            }

            function Zr() {
                return Lr && !Lr.destroyed ? Lr : null
            }
            const Wr = (() => (class {
                constructor(e) {
                    this._injector = e, this._modules = [], this._destroyListeners = [], this._destroyed = !1
                }
                bootstrapModuleFactory(e, t) {
                    const n = "noop" === (r = t ? t.ngZone : void 0) ? new Pr : ("zone.js" === r ? void 0 : r) || new Ar({
                            enableLongStackTrace: We()
                        }),
                        l = [{
                            provide: Ar,
                            useValue: n
                        }];
                    var r;
                    return n.run(() => {
                        const t = ve.create({
                                providers: l,
                                parent: this.injector,
                                name: e.moduleType.name
                            }),
                            r = e.create(t),
                            o = r.injector.get($e, null);
                        if (!o) throw new Error("No ErrorHandler. Is platform module (BrowserModule) included?");
                        return r.onDestroy(() => qr(this._modules, r)), n.runOutsideAngular(() => n.onError.subscribe({
                                next: e => {
                                    o.handleError(e)
                                }
                            })),
                            function(e, t, n) {
                                try {
                                    const r = n();
                                    return bt(r) ? r.catch(n => {
                                        throw t.runOutsideAngular(() => e.handleError(n)), n
                                    }) : r
                                } catch (l) {
                                    throw t.runOutsideAngular(() => e.handleError(l)), l
                                }
                            }(o, n, () => {
                                const e = r.injector.get(sr);
                                return e.runInitializers(), e.donePromise.then(() => (this._moduleDoBootstrap(r), r))
                            })
                    })
                }
                bootstrapModule(e, t = []) {
                    const n = Kr({}, t);
                    return function(e, t, n) {
                        return e.get(br).createCompiler([t]).compileModuleAsync(n)
                    }(this.injector, n, e).then(e => this.bootstrapModuleFactory(e, n))
                }
                _moduleDoBootstrap(e) {
                    const t = e.injector.get(Qr);
                    if (e._bootstrapComponents.length > 0) e._bootstrapComponents.forEach(e => t.bootstrap(e));
                    else {
                        if (!e.instance.ngDoBootstrap) throw new Error(`The module ${ie(e.instance.constructor)} was bootstrapped, but it does not declare "@NgModule.bootstrap" components nor a "ngDoBootstrap" method. ` + "Please define one of these.");
                        e.instance.ngDoBootstrap(t)
                    }
                    this._modules.push(e)
                }
                onDestroy(e) {
                    this._destroyListeners.push(e)
                }
                get injector() {
                    return this._injector
                }
                destroy() {
                    if (this._destroyed) throw new Error("The platform has already been destroyed!");
                    this._modules.slice().forEach(e => e.destroy()), this._destroyListeners.forEach(e => e()), this._destroyed = !0
                }
                get destroyed() {
                    return this._destroyed
                }
            }))();

            function Kr(e, t) {
                return Array.isArray(t) ? t.reduce(Kr, e) : Object.assign({}, e, t)
            }
            const Qr = (() => {
                class e {
                    constructor(e, t, n, l, r, o) {
                        this._zone = e, this._console = t, this._injector = n, this._exceptionHandler = l, this._componentFactoryResolver = r, this._initStatus = o, this._bootstrapListeners = [], this._views = [], this._runningTick = !1, this._enforceNoNewChanges = !1, this._stable = !0, this.componentTypes = [], this.components = [], this._enforceNoNewChanges = We(), this._zone.onMicrotaskEmpty.subscribe({
                            next: () => {
                                this._zone.run(() => {
                                    this.tick()
                                })
                            }
                        });
                        const s = new _(e => {
                                this._stable = this._zone.isStable && !this._zone.hasPendingMacrotasks && !this._zone.hasPendingMicrotasks, this._zone.runOutsideAngular(() => {
                                    e.next(this._stable), e.complete()
                                })
                            }),
                            i = new _(e => {
                                let t;
                                this._zone.runOutsideAngular(() => {
                                    t = this._zone.onStable.subscribe(() => {
                                        Ar.assertNotInAngularZone(), Sr(() => {
                                            this._stable || this._zone.hasPendingMacrotasks || this._zone.hasPendingMicrotasks || (this._stable = !0, e.next(!0))
                                        })
                                    })
                                });
                                const n = this._zone.onUnstable.subscribe(() => {
                                    Ar.assertInAngularZone(), this._stable && (this._stable = !1, this._zone.runOutsideAngular(() => {
                                        e.next(!1)
                                    }))
                                });
                                return () => {
                                    t.unsubscribe(), n.unsubscribe()
                                }
                            });
                        this.isStable = function(...e) {
                            let t = Number.POSITIVE_INFINITY,
                                n = null,
                                l = e[e.length - 1];
                            var r;
                            return (r = l) && "function" == typeof r.schedule ? (n = e.pop(), e.length > 1 && "number" == typeof e[e.length - 1] && (t = e.pop())) : "number" == typeof l && (t = e.pop()), null === n && 1 === e.length && e[0] instanceof _ ? e[0] : function(e = Number.POSITIVE_INFINITY) {
                                return function e(t, n, l = Number.POSITIVE_INFINITY) {
                                    return "function" == typeof n ? r => r.pipe(e((e, l) => (function(e, t) {
                                        return e instanceof _ ? e : new _(P(e))
                                    })(t(e, l)).pipe(function(e, t) {
                                        return function(t) {
                                            return t.lift(new H(e, void 0))
                                        }
                                    }((t, r) => n(e, t, l, r))), l)) : ("number" == typeof n && (l = n), e => e.lift(new F(t, l)))
                                }(z, e)
                            }(t)(L(e, n))
                        }(s, i.pipe(e => $()(function(e, t) {
                            return function(t) {
                                let n;
                                n = "function" == typeof e ? e : function() {
                                    return e
                                };
                                const l = Object.create(t, K);
                                return l.source = t, l.subjectFactory = n, l
                            }
                        }(q)(e))))
                    }
                    bootstrap(e, t) {
                        if (!this._initStatus.done) throw new Error("Cannot bootstrap as there are still asynchronous initializers running. Bootstrap components in the `ngDoBootstrap` method of the root module.");
                        let n;
                        n = e instanceof Dt ? e : this._componentFactoryResolver.resolveComponentFactory(e), this.componentTypes.push(n.componentType);
                        const l = Br(n) ? null : this._injector.get(jt),
                            r = n.create(ve.NULL, [], t || n.selector, l);
                        r.onDestroy(() => {
                            this._unloadComponent(r)
                        });
                        const o = r.injector.get(Vr, null);
                        return o && r.injector.get(Hr).registerApplication(r.location.nativeElement, o), this._loadComponent(r), We() && this._console.log("Angular is running in the development mode. Call enableProdMode() to enable the production mode."), r
                    }
                    tick() {
                        if (this._runningTick) throw new Error("ApplicationRef.tick is called recursively");
                        const t = e._tickScope();
                        try {
                            this._runningTick = !0;
                            for (let e of this._views) e.detectChanges();
                            if (this._enforceNoNewChanges)
                                for (let e of this._views) e.checkNoChanges()
                        } catch (n) {
                            this._zone.runOutsideAngular(() => this._exceptionHandler.handleError(n))
                        } finally {
                            this._runningTick = !1, Tr(t)
                        }
                    }
                    attachView(e) {
                        const t = e;
                        this._views.push(t), t.attachToAppRef(this)
                    }
                    detachView(e) {
                        const t = e;
                        qr(this._views, t), t.detachFromAppRef()
                    }
                    _loadComponent(e) {
                        this.attachView(e.hostView), this.tick(), this.components.push(e), this._injector.get(hr, []).concat(this._bootstrapListeners).forEach(t => t(e))
                    }
                    _unloadComponent(e) {
                        this.detachView(e.hostView), qr(this.components, e)
                    }
                    ngOnDestroy() {
                        this._views.slice().forEach(e => e.destroy())
                    }
                    get viewCount() {
                        return this._views.length
                    }
                }
                return e._tickScope = kr("ApplicationRef#tick()"), e
            })();

            function qr(e, t) {
                const n = e.indexOf(t);
                n > -1 && e.splice(n, 1)
            }
            class Gr {
                constructor(e, t) {
                    this.name = e, this.callback = t
                }
            }
            class Jr {
                constructor(e, t, n) {
                    this.listeners = [], this.parent = null, this._debugContext = n, this.nativeNode = e, t && t instanceof Yr && t.addChild(this)
                }
                get injector() {
                    return this._debugContext.injector
                }
                get componentInstance() {
                    return this._debugContext.component
                }
                get context() {
                    return this._debugContext.context
                }
                get references() {
                    return this._debugContext.references
                }
                get providerTokens() {
                    return this._debugContext.providerTokens
                }
            }
            class Yr extends Jr {
                constructor(e, t, n) {
                    super(e, t, n), this.properties = {}, this.attributes = {}, this.classes = {}, this.styles = {}, this.childNodes = [], this.nativeElement = e
                }
                addChild(e) {
                    e && (this.childNodes.push(e), e.parent = this)
                }
                removeChild(e) {
                    const t = this.childNodes.indexOf(e); - 1 !== t && (e.parent = null, this.childNodes.splice(t, 1))
                }
                insertChildrenAfter(e, t) {
                    const n = this.childNodes.indexOf(e); - 1 !== n && (this.childNodes.splice(n + 1, 0, ...t), t.forEach(t => {
                        t.parent && t.parent.removeChild(t), e.parent = this
                    }))
                }
                insertBefore(e, t) {
                    const n = this.childNodes.indexOf(e); - 1 === n ? this.addChild(t) : (t.parent && t.parent.removeChild(t), t.parent = this, this.childNodes.splice(n, 0, t))
                }
                query(e) {
                    return this.queryAll(e)[0] || null
                }
                queryAll(e) {
                    const t = [];
                    return function e(t, n, l) {
                        t.childNodes.forEach(t => {
                            t instanceof Yr && (n(t) && l.push(t), e(t, n, l))
                        })
                    }(this, e, t), t
                }
                queryAllNodes(e) {
                    const t = [];
                    return function e(t, n, l) {
                        t instanceof Yr && t.childNodes.forEach(t => {
                            n(t) && l.push(t), t instanceof Yr && e(t, n, l)
                        })
                    }(this, e, t), t
                }
                get children() {
                    return this.childNodes.filter(e => e instanceof Yr)
                }
                triggerEventHandler(e, t) {
                    this.listeners.forEach(n => {
                        n.name == e && n.callback(t)
                    })
                }
            }
            const Xr = new Map,
                eo = function(e) {
                    return Xr.get(e) || null
                };

            function to(e) {
                Xr.set(e.nativeNode, e)
            }
            const no = Ur(null, "core", [{
                    provide: dr,
                    useValue: "unknown"
                }, {
                    provide: Wr,
                    deps: [ve]
                }, {
                    provide: Hr,
                    deps: []
                }, {
                    provide: pr,
                    deps: []
                }]),
                lo = new ge("LocaleId");

            function ro() {
                return hn
            }

            function oo() {
                return pn
            }

            function so(e) {
                return e || "en-US"
            }

            function io(e) {
                let t = [];
                return e.onStable.subscribe(() => {
                        for (; t.length;) t.pop()()
                    }),
                    function(e) {
                        t.push(e)
                    }
            }
            const uo = (() => (class {
                constructor(e) {}
            }))();

            function ao(e, t, n, l, r, o) {
                e |= 1;
                const {
                    matchedQueries: s,
                    references: i,
                    matchedQueryIds: u
                } = Kn(t);
                return {
                    nodeIndex: -1,
                    parent: null,
                    renderParent: null,
                    bindingIndex: -1,
                    outputIndex: -1,
                    flags: e,
                    checkIndex: -1,
                    childFlags: 0,
                    directChildFlags: 0,
                    childMatchedQueries: 0,
                    matchedQueries: s,
                    matchedQueryIds: u,
                    references: i,
                    ngContentIndex: n,
                    childCount: l,
                    bindings: [],
                    bindingFlags: 0,
                    outputs: [],
                    element: {
                        ns: null,
                        name: null,
                        attrs: null,
                        template: o ? Jn(o) : null,
                        componentProvider: null,
                        componentView: null,
                        componentRendererType: null,
                        publicProviders: null,
                        allProviders: null,
                        handleEvent: r || An
                    },
                    provider: null,
                    text: null,
                    query: null,
                    ngContent: null
                }
            }

            function co(e, t, n, l, r, o, s = [], i, u, a, c, d) {
                a || (a = An);
                const {
                    matchedQueries: h,
                    references: p,
                    matchedQueryIds: f
                } = Kn(n);
                let m = null,
                    g = null;
                o && ([m, g] = rl(o)), i = i || [];
                const y = new Array(i.length);
                for (let b = 0; b < i.length; b++) {
                    const [e, t, n] = i[b], [l, r] = rl(t);
                    let o = void 0,
                        s = void 0;
                    switch (15 & e) {
                        case 4:
                            s = n;
                            break;
                        case 1:
                        case 8:
                            o = n
                    }
                    y[b] = {
                        flags: e,
                        ns: l,
                        name: r,
                        nonMinifiedName: r,
                        securityContext: o,
                        suffix: s
                    }
                }
                u = u || [];
                const _ = new Array(u.length);
                for (let b = 0; b < u.length; b++) {
                    const [e, t] = u[b];
                    _[b] = {
                        type: 0,
                        target: e,
                        eventName: t,
                        propName: null
                    }
                }
                const w = (s = s || []).map(([e, t]) => {
                    const [n, l] = rl(e);
                    return [n, l, t]
                });
                return d = function(e) {
                    if (e && e.id === On) {
                        const t = null != e.encapsulation && e.encapsulation !== je.None || e.styles.length || Object.keys(e.data).length;
                        e.id = t ? `c${Pn++}` : Mn
                    }
                    return e && e.id === Mn && (e = null), e || null
                }(d), c && (t |= 33554432), {
                    nodeIndex: -1,
                    parent: null,
                    renderParent: null,
                    bindingIndex: -1,
                    outputIndex: -1,
                    checkIndex: e,
                    flags: t |= 1,
                    childFlags: 0,
                    directChildFlags: 0,
                    childMatchedQueries: 0,
                    matchedQueries: h,
                    matchedQueryIds: f,
                    references: p,
                    ngContentIndex: l,
                    childCount: r,
                    bindings: y,
                    bindingFlags: ol(y),
                    outputs: _,
                    element: {
                        ns: m,
                        name: g,
                        attrs: w,
                        template: null,
                        componentProvider: null,
                        componentView: c || null,
                        componentRendererType: d,
                        publicProviders: null,
                        allProviders: null,
                        handleEvent: a || An
                    },
                    provider: null,
                    text: null,
                    query: null,
                    ngContent: null
                }
            }

            function ho(e, t, n) {
                const l = n.element,
                    r = e.root.selectorOrNode,
                    o = e.renderer;
                let s;
                if (e.parent || !r) {
                    s = l.name ? o.createElement(l.name, l.ns) : o.createComment("");
                    const r = qn(e, t, n);
                    r && o.appendChild(r, s)
                } else s = o.selectRootElement(r, !!l.componentRendererType && l.componentRendererType.encapsulation === je.ShadowDom);
                if (l.attrs)
                    for (let i = 0; i < l.attrs.length; i++) {
                        const [e, t, n] = l.attrs[i];
                        o.setAttribute(s, t, n, e)
                    }
                return s
            }

            function po(e, t, n, l) {
                for (let s = 0; s < n.outputs.length; s++) {
                    const i = n.outputs[s],
                        u = fo(e, n.nodeIndex, (o = i.eventName, (r = i.target) ? `${r}:${o}` : o));
                    let a = i.target,
                        c = e;
                    "component" === i.target && (a = null, c = t);
                    const d = c.renderer.listen(a || l, i.eventName, u);
                    e.disposables[n.outputIndex + s] = d
                }
                var r, o
            }

            function fo(e, t, n) {
                return l => Bn(e, t, n, l)
            }

            function mo(e, t, n, l) {
                if (!Hn(e, t, n, l)) return !1;
                const r = t.bindings[n],
                    o = En(e, t.nodeIndex),
                    s = o.renderElement,
                    i = r.name;
                switch (15 & r.flags) {
                    case 1:
                        ! function(e, t, n, l, r, o) {
                            const s = t.securityContext;
                            let i = s ? e.root.sanitizer.sanitize(s, o) : o;
                            i = null != i ? i.toString() : null;
                            const u = e.renderer;
                            null != o ? u.setAttribute(n, r, i, l) : u.removeAttribute(n, r, l)
                        }(e, r, s, r.ns, i, l);
                        break;
                    case 2:
                        ! function(e, t, n, l) {
                            const r = e.renderer;
                            l ? r.addClass(t, n) : r.removeClass(t, n)
                        }(e, s, i, l);
                        break;
                    case 4:
                        ! function(e, t, n, l, r) {
                            let o = e.root.sanitizer.sanitize(ft.STYLE, r);
                            if (null != o) {
                                o = o.toString();
                                const e = t.suffix;
                                null != e && (o += e)
                            } else o = null;
                            const s = e.renderer;
                            null != o ? s.setStyle(n, l, o) : s.removeStyle(n, l)
                        }(e, r, s, i, l);
                        break;
                    case 8:
                        ! function(e, t, n, l, r) {
                            const o = t.securityContext;
                            let s = o ? e.root.sanitizer.sanitize(o, r) : r;
                            e.renderer.setProperty(n, l, s)
                        }(33554432 & t.flags && 32 & r.flags ? o.componentView : e, r, s, i, l)
                }
                return !0
            }

            function go(e) {
                const t = e.def.nodeMatchedQueries;
                for (; e.parent && Wn(e);) {
                    let n = e.parentNodeDef;
                    e = e.parent;
                    const l = n.nodeIndex + n.childCount;
                    for (let r = 0; r <= l; r++) {
                        const l = e.def.nodes[r];
                        67108864 & l.flags && 536870912 & l.flags && (l.query.filterId & t) === l.query.filterId && In(e, r).setDirty(), !(1 & l.flags && r + l.childCount < n.nodeIndex) && 67108864 & l.childFlags && 536870912 & l.childFlags || (r += l.childCount)
                    }
                }
                if (134217728 & e.def.nodeFlags)
                    for (let n = 0; n < e.def.nodes.length; n++) {
                        const t = e.def.nodes[n];
                        134217728 & t.flags && 536870912 & t.flags && In(e, n).setDirty(), n += t.childCount
                    }
            }

            function yo(e, t) {
                const n = In(e, t.nodeIndex);
                if (!n.dirty) return;
                let l, r = void 0;
                if (67108864 & t.flags) {
                    const n = t.parent.parent;
                    r = _o(e, n.nodeIndex, n.nodeIndex + n.childCount, t.query, []), l = kn(e, t.parent.nodeIndex).instance
                } else 134217728 & t.flags && (r = _o(e, 0, e.def.nodes.length - 1, t.query, []), l = e.component);
                n.reset(r);
                const o = t.query.bindings;
                let s = !1;
                for (let i = 0; i < o.length; i++) {
                    const e = o[i];
                    let t;
                    switch (e.bindingType) {
                        case 0:
                            t = n.first;
                            break;
                        case 1:
                            t = n, s = !0
                    }
                    l[e.propName] = t
                }
                s && n.notifyOnChanges()
            }

            function _o(e, t, n, l, r) {
                for (let o = t; o <= n; o++) {
                    const t = e.def.nodes[o],
                        n = t.matchedQueries[l.id];
                    if (null != n && r.push(wo(e, t, n)), 1 & t.flags && t.element.template && (t.element.template.nodeMatchedQueries & l.filterId) === l.filterId) {
                        const n = En(e, o);
                        if ((t.childMatchedQueries & l.filterId) === l.filterId && (_o(e, o + 1, o + t.childCount, l, r), o += t.childCount), 16777216 & t.flags) {
                            const e = n.viewContainer._embeddedViews;
                            for (let t = 0; t < e.length; t++) {
                                const o = e[t],
                                    s = zn(o);
                                s && s === n && _o(o, 0, o.def.nodes.length - 1, l, r)
                            }
                        }
                        const s = n.template._projectedViews;
                        if (s)
                            for (let e = 0; e < s.length; e++) {
                                const t = s[e];
                                _o(t, 0, t.def.nodes.length - 1, l, r)
                            }
                    }(t.childMatchedQueries & l.filterId) !== l.filterId && (o += t.childCount)
                }
                return r
            }

            function wo(e, t, n) {
                if (null != n) switch (n) {
                    case 1:
                        return En(e, t.nodeIndex).renderElement;
                    case 0:
                        return new Bt(En(e, t.nodeIndex).renderElement);
                    case 2:
                        return En(e, t.nodeIndex).template;
                    case 3:
                        return En(e, t.nodeIndex).viewContainer;
                    case 4:
                        return kn(e, t.nodeIndex).instance
                }
            }

            function bo(e, t, n) {
                const l = qn(e, t, n);
                l && el(e, n.ngContent.index, 1, l, null, void 0)
            }

            function vo(e, t, n) {
                const l = new Array(n.length - 1);
                for (let r = 1; r < n.length; r++) l[r - 1] = {
                    flags: 8,
                    name: null,
                    ns: null,
                    nonMinifiedName: null,
                    securityContext: null,
                    suffix: n[r]
                };
                return {
                    nodeIndex: -1,
                    parent: null,
                    renderParent: null,
                    bindingIndex: -1,
                    outputIndex: -1,
                    checkIndex: e,
                    flags: 2,
                    childFlags: 0,
                    directChildFlags: 0,
                    childMatchedQueries: 0,
                    matchedQueries: {},
                    matchedQueryIds: 0,
                    references: {},
                    ngContentIndex: t,
                    childCount: 0,
                    bindings: l,
                    bindingFlags: 8,
                    outputs: [],
                    element: null,
                    provider: null,
                    text: {
                        prefix: n[0]
                    },
                    query: null,
                    ngContent: null
                }
            }

            function Co(e, t, n) {
                let l;
                const r = e.renderer;
                l = r.createText(n.text.prefix);
                const o = qn(e, t, n);
                return o && r.appendChild(o, l), {
                    renderText: l
                }
            }

            function xo(e, t) {
                return (null != e ? e.toString() : "") + t.suffix
            }

            function Eo(e, t, n, l) {
                let r = 0,
                    o = 0,
                    s = 0,
                    i = 0,
                    u = 0,
                    a = null,
                    c = null,
                    d = !1,
                    h = !1,
                    p = null;
                for (let f = 0; f < t.length; f++) {
                    const e = t[f];
                    if (e.nodeIndex = f, e.parent = a, e.bindingIndex = r, e.outputIndex = o, e.renderParent = c, s |= e.flags, u |= e.matchedQueryIds, e.element) {
                        const t = e.element;
                        t.publicProviders = a ? a.element.publicProviders : Object.create(null), t.allProviders = t.publicProviders, d = !1, h = !1, e.element.template && (u |= e.element.template.nodeMatchedQueries)
                    }
                    if (To(a, e, t.length), r += e.bindings.length, o += e.outputs.length, !c && 3 & e.flags && (p = e), 20224 & e.flags) {
                        d || (d = !0, a.element.publicProviders = Object.create(a.element.publicProviders), a.element.allProviders = a.element.publicProviders);
                        const t = 0 != (32768 & e.flags);
                        0 == (8192 & e.flags) || t ? a.element.publicProviders[Dn(e.provider.token)] = e : (h || (h = !0, a.element.allProviders = Object.create(a.element.publicProviders)), a.element.allProviders[Dn(e.provider.token)] = e), t && (a.element.componentProvider = e)
                    }
                    if (a ? (a.childFlags |= e.flags, a.directChildFlags |= e.flags, a.childMatchedQueries |= e.matchedQueryIds, e.element && e.element.template && (a.childMatchedQueries |= e.element.template.nodeMatchedQueries)) : i |= e.flags, e.childCount > 0) a = e, ko(e) || (c = e);
                    else
                        for (; a && f === a.nodeIndex + a.childCount;) {
                            const e = a.parent;
                            e && (e.childFlags |= a.childFlags, e.childMatchedQueries |= a.childMatchedQueries), c = (a = e) && ko(a) ? a.renderParent : a
                        }
                }
                return {
                    factory: null,
                    nodeFlags: s,
                    rootNodeFlags: i,
                    nodeMatchedQueries: u,
                    flags: e,
                    nodes: t,
                    updateDirectives: n || An,
                    updateRenderer: l || An,
                    handleEvent: (e, n, l, r) => t[n].element.handleEvent(e, l, r),
                    bindingCount: r,
                    outputCount: o,
                    lastRenderRootNode: p
                }
            }

            function ko(e) {
                return 0 != (1 & e.flags) && null === e.element.name
            }

            function To(e, t, n) {
                const l = t.element && t.element.template;
                if (l) {
                    if (!l.lastRenderRootNode) throw new Error("Illegal State: Embedded templates without nodes are not allowed!");
                    if (l.lastRenderRootNode && 16777216 & l.lastRenderRootNode.flags) throw new Error(`Illegal State: Last root node of a template can't have embedded views, at index ${t.nodeIndex}!`)
                }
                if (20224 & t.flags && 0 == (1 & (e ? e.flags : 0))) throw new Error(`Illegal State: StaticProvider/Directive nodes need to be children of elements or anchors, at index ${t.nodeIndex}!`);
                if (t.query) {
                    if (67108864 & t.flags && (!e || 0 == (16384 & e.flags))) throw new Error(`Illegal State: Content Query nodes need to be children of directives, at index ${t.nodeIndex}!`);
                    if (134217728 & t.flags && e) throw new Error(`Illegal State: View Query nodes have to be top level nodes, at index ${t.nodeIndex}!`)
                }
                if (t.childCount) {
                    const l = e ? e.nodeIndex + e.childCount : n - 1;
                    if (t.nodeIndex <= l && t.nodeIndex + t.childCount > l) throw new Error(`Illegal State: childCount of node leads outside of parent, at index ${t.nodeIndex}!`)
                }
            }

            function Io(e, t, n, l) {
                const r = No(e.root, e.renderer, e, t, n);
                return Do(r, e.component, l), Oo(r), r
            }

            function So(e, t, n) {
                const l = No(e, e.renderer, null, null, t);
                return Do(l, n, n), Oo(l), l
            }

            function Ao(e, t, n, l) {
                const r = t.element.componentRendererType;
                let o;
                return o = r ? e.root.rendererFactory.createRenderer(l, r) : e.root.renderer, No(e.root, o, e, t.element.componentProvider, n)
            }

            function No(e, t, n, l, r) {
                const o = new Array(r.nodes.length),
                    s = r.outputCount ? new Array(r.outputCount) : null;
                return {
                    def: r,
                    parent: n,
                    viewContainerParent: null,
                    parentNodeDef: l,
                    context: null,
                    component: null,
                    nodes: o,
                    state: 13,
                    root: e,
                    renderer: t,
                    oldValues: new Array(r.bindingCount),
                    disposables: s,
                    initIndex: -1
                }
            }

            function Do(e, t, n) {
                e.component = t, e.context = n
            }

            function Oo(e) {
                let t;
                Zn(e) && (t = En(e.parent, e.parentNodeDef.parent.nodeIndex).renderElement);
                const n = e.def,
                    l = e.nodes;
                for (let r = 0; r < n.nodes.length; r++) {
                    const o = n.nodes[r];
                    let s;
                    switch (Sn.setCurrentNode(e, r), 201347067 & o.flags) {
                        case 1:
                            const n = ho(e, t, o);
                            let i = void 0;
                            if (33554432 & o.flags) {
                                const t = Jn(o.element.componentView);
                                i = Sn.createComponentView(e, o, t, n)
                            }
                            po(e, i, o, n), s = {
                                renderElement: n,
                                componentView: i,
                                viewContainer: null,
                                template: o.element.template ? Tl(e, o) : void 0
                            }, 16777216 & o.flags && (s.viewContainer = Cl(e, o, s));
                            break;
                        case 2:
                            s = Co(e, t, o);
                            break;
                        case 512:
                        case 1024:
                        case 2048:
                        case 256:
                            (s = l[r]) || 4096 & o.flags || (s = {
                                instance: $l(e, o)
                            });
                            break;
                        case 16:
                            s = {
                                instance: Ul(e, o)
                            };
                            break;
                        case 16384:
                            (s = l[r]) || (s = {
                                instance: Zl(e, o)
                            }), 32768 & o.flags && Do(En(e, o.parent.nodeIndex).componentView, s.instance, s.instance);
                            break;
                        case 32:
                        case 64:
                        case 128:
                            s = {
                                value: void 0
                            };
                            break;
                        case 67108864:
                        case 134217728:
                            s = new rr;
                            break;
                        case 8:
                            bo(e, t, o), s = void 0
                    }
                    l[r] = s
                }
                Bo(e, Fo.CreateViewNodes), Zo(e, 201326592, 268435456, 0)
            }

            function Mo(e) {
                Vo(e), Sn.updateDirectives(e, 1), zo(e, Fo.CheckNoChanges), Sn.updateRenderer(e, 1), Bo(e, Fo.CheckNoChanges), e.state &= -97
            }

            function Ro(e) {
                1 & e.state ? (e.state &= -2, e.state |= 2) : e.state &= -3, vn(e, 0, 256), Vo(e), Sn.updateDirectives(e, 0), zo(e, Fo.CheckAndUpdate), Zo(e, 67108864, 536870912, 0);
                let t = vn(e, 256, 512);
                Xl(e, 2097152 | (t ? 1048576 : 0)), Sn.updateRenderer(e, 0), Bo(e, Fo.CheckAndUpdate), Zo(e, 134217728, 536870912, 0), Xl(e, 8388608 | ((t = vn(e, 512, 768)) ? 4194304 : 0)), 2 & e.def.flags && (e.state &= -9), e.state &= -97, vn(e, 768, 1024)
            }

            function Po(e, t, n, l, r, o, s, i, u, a, c, d, h) {
                return 0 === n ? function(e, t, n, l, r, o, s, i, u, a, c, d) {
                    switch (201347067 & t.flags) {
                        case 1:
                            return function(e, t, n, l, r, o, s, i, u, a, c, d) {
                                const h = t.bindings.length;
                                let p = !1;
                                return h > 0 && mo(e, t, 0, n) && (p = !0), h > 1 && mo(e, t, 1, l) && (p = !0), h > 2 && mo(e, t, 2, r) && (p = !0), h > 3 && mo(e, t, 3, o) && (p = !0), h > 4 && mo(e, t, 4, s) && (p = !0), h > 5 && mo(e, t, 5, i) && (p = !0), h > 6 && mo(e, t, 6, u) && (p = !0), h > 7 && mo(e, t, 7, a) && (p = !0), h > 8 && mo(e, t, 8, c) && (p = !0), h > 9 && mo(e, t, 9, d) && (p = !0), p
                            }(e, t, n, l, r, o, s, i, u, a, c, d);
                        case 2:
                            return function(e, t, n, l, r, o, s, i, u, a, c, d) {
                                let h = !1;
                                const p = t.bindings,
                                    f = p.length;
                                if (f > 0 && Hn(e, t, 0, n) && (h = !0), f > 1 && Hn(e, t, 1, l) && (h = !0), f > 2 && Hn(e, t, 2, r) && (h = !0), f > 3 && Hn(e, t, 3, o) && (h = !0), f > 4 && Hn(e, t, 4, s) && (h = !0), f > 5 && Hn(e, t, 5, i) && (h = !0), f > 6 && Hn(e, t, 6, u) && (h = !0), f > 7 && Hn(e, t, 7, a) && (h = !0), f > 8 && Hn(e, t, 8, c) && (h = !0), f > 9 && Hn(e, t, 9, d) && (h = !0), h) {
                                    let h = t.text.prefix;
                                    f > 0 && (h += xo(n, p[0])), f > 1 && (h += xo(l, p[1])), f > 2 && (h += xo(r, p[2])), f > 3 && (h += xo(o, p[3])), f > 4 && (h += xo(s, p[4])), f > 5 && (h += xo(i, p[5])), f > 6 && (h += xo(u, p[6])), f > 7 && (h += xo(a, p[7])), f > 8 && (h += xo(c, p[8])), f > 9 && (h += xo(d, p[9]));
                                    const m = xn(e, t.nodeIndex).renderText;
                                    e.renderer.setValue(m, h)
                                }
                                return h
                            }(e, t, n, l, r, o, s, i, u, a, c, d);
                        case 16384:
                            return function(e, t, n, l, r, o, s, i, u, a, c, d) {
                                const h = kn(e, t.nodeIndex),
                                    p = h.instance;
                                let f = !1,
                                    m = void 0;
                                const g = t.bindings.length;
                                return g > 0 && Vn(e, t, 0, n) && (f = !0, m = Yl(e, h, t, 0, n, m)), g > 1 && Vn(e, t, 1, l) && (f = !0, m = Yl(e, h, t, 1, l, m)), g > 2 && Vn(e, t, 2, r) && (f = !0, m = Yl(e, h, t, 2, r, m)), g > 3 && Vn(e, t, 3, o) && (f = !0, m = Yl(e, h, t, 3, o, m)), g > 4 && Vn(e, t, 4, s) && (f = !0, m = Yl(e, h, t, 4, s, m)), g > 5 && Vn(e, t, 5, i) && (f = !0, m = Yl(e, h, t, 5, i, m)), g > 6 && Vn(e, t, 6, u) && (f = !0, m = Yl(e, h, t, 6, u, m)), g > 7 && Vn(e, t, 7, a) && (f = !0, m = Yl(e, h, t, 7, a, m)), g > 8 && Vn(e, t, 8, c) && (f = !0, m = Yl(e, h, t, 8, c, m)), g > 9 && Vn(e, t, 9, d) && (f = !0, m = Yl(e, h, t, 9, d, m)), m && p.ngOnChanges(m), 65536 & t.flags && Cn(e, 256, t.nodeIndex) && p.ngOnInit(), 262144 & t.flags && p.ngDoCheck(), f
                            }(e, t, n, l, r, o, s, i, u, a, c, d);
                        case 32:
                        case 64:
                        case 128:
                            return function(e, t, n, l, r, o, s, i, u, a, c, d) {
                                const h = t.bindings;
                                let p = !1;
                                const f = h.length;
                                if (f > 0 && Hn(e, t, 0, n) && (p = !0), f > 1 && Hn(e, t, 1, l) && (p = !0), f > 2 && Hn(e, t, 2, r) && (p = !0), f > 3 && Hn(e, t, 3, o) && (p = !0), f > 4 && Hn(e, t, 4, s) && (p = !0), f > 5 && Hn(e, t, 5, i) && (p = !0), f > 6 && Hn(e, t, 6, u) && (p = !0), f > 7 && Hn(e, t, 7, a) && (p = !0), f > 8 && Hn(e, t, 8, c) && (p = !0), f > 9 && Hn(e, t, 9, d) && (p = !0), p) {
                                    const p = Tn(e, t.nodeIndex);
                                    let m;
                                    switch (201347067 & t.flags) {
                                        case 32:
                                            m = new Array(h.length), f > 0 && (m[0] = n), f > 1 && (m[1] = l), f > 2 && (m[2] = r), f > 3 && (m[3] = o), f > 4 && (m[4] = s), f > 5 && (m[5] = i), f > 6 && (m[6] = u), f > 7 && (m[7] = a), f > 8 && (m[8] = c), f > 9 && (m[9] = d);
                                            break;
                                        case 64:
                                            m = {}, f > 0 && (m[h[0].name] = n), f > 1 && (m[h[1].name] = l), f > 2 && (m[h[2].name] = r), f > 3 && (m[h[3].name] = o), f > 4 && (m[h[4].name] = s), f > 5 && (m[h[5].name] = i), f > 6 && (m[h[6].name] = u), f > 7 && (m[h[7].name] = a), f > 8 && (m[h[8].name] = c), f > 9 && (m[h[9].name] = d);
                                            break;
                                        case 128:
                                            const e = n;
                                            switch (f) {
                                                case 1:
                                                    m = e.transform(n);
                                                    break;
                                                case 2:
                                                    m = e.transform(l);
                                                    break;
                                                case 3:
                                                    m = e.transform(l, r);
                                                    break;
                                                case 4:
                                                    m = e.transform(l, r, o);
                                                    break;
                                                case 5:
                                                    m = e.transform(l, r, o, s);
                                                    break;
                                                case 6:
                                                    m = e.transform(l, r, o, s, i);
                                                    break;
                                                case 7:
                                                    m = e.transform(l, r, o, s, i, u);
                                                    break;
                                                case 8:
                                                    m = e.transform(l, r, o, s, i, u, a);
                                                    break;
                                                case 9:
                                                    m = e.transform(l, r, o, s, i, u, a, c);
                                                    break;
                                                case 10:
                                                    m = e.transform(l, r, o, s, i, u, a, c, d)
                                            }
                                    }
                                    p.value = m
                                }
                                return p
                            }(e, t, n, l, r, o, s, i, u, a, c, d);
                        default:
                            throw "unreachable"
                    }
                }(e, t, l, r, o, s, i, u, a, c, d, h) : function(e, t, n) {
                    switch (201347067 & t.flags) {
                        case 1:
                            return function(e, t, n) {
                                let l = !1;
                                for (let r = 0; r < n.length; r++) mo(e, t, r, n[r]) && (l = !0);
                                return l
                            }(e, t, n);
                        case 2:
                            return function(e, t, n) {
                                const l = t.bindings;
                                let r = !1;
                                for (let o = 0; o < n.length; o++) Hn(e, t, o, n[o]) && (r = !0);
                                if (r) {
                                    let r = "";
                                    for (let e = 0; e < n.length; e++) r += xo(n[e], l[e]);
                                    r = t.text.prefix + r;
                                    const o = xn(e, t.nodeIndex).renderText;
                                    e.renderer.setValue(o, r)
                                }
                                return r
                            }(e, t, n);
                        case 16384:
                            return function(e, t, n) {
                                const l = kn(e, t.nodeIndex),
                                    r = l.instance;
                                let o = !1,
                                    s = void 0;
                                for (let i = 0; i < n.length; i++) Vn(e, t, i, n[i]) && (o = !0, s = Yl(e, l, t, i, n[i], s));
                                return s && r.ngOnChanges(s), 65536 & t.flags && Cn(e, 256, t.nodeIndex) && r.ngOnInit(), 262144 & t.flags && r.ngDoCheck(), o
                            }(e, t, n);
                        case 32:
                        case 64:
                        case 128:
                            return function(e, t, n) {
                                const l = t.bindings;
                                let r = !1;
                                for (let o = 0; o < n.length; o++) Hn(e, t, o, n[o]) && (r = !0);
                                if (r) {
                                    const r = Tn(e, t.nodeIndex);
                                    let o;
                                    switch (201347067 & t.flags) {
                                        case 32:
                                            o = n;
                                            break;
                                        case 64:
                                            o = {};
                                            for (let t = 0; t < n.length; t++) o[l[t].name] = n[t];
                                            break;
                                        case 128:
                                            const e = n[0],
                                                r = n.slice(1);
                                            o = e.transform(...r)
                                    }
                                    r.value = o
                                }
                                return r
                            }(e, t, n);
                        default:
                            throw "unreachable"
                    }
                }(e, t, l)
            }

            function Vo(e) {
                const t = e.def;
                if (4 & t.nodeFlags)
                    for (let n = 0; n < t.nodes.length; n++) {
                        const l = t.nodes[n];
                        if (4 & l.flags) {
                            const t = En(e, n).template._projectedViews;
                            if (t)
                                for (let n = 0; n < t.length; n++) {
                                    const l = t[n];
                                    l.state |= 32, Fn(l, e)
                                }
                        } else 0 == (4 & l.childFlags) && (n += l.childCount)
                    }
            }

            function Ho(e, t, n, l, r, o, s, i, u, a, c, d, h) {
                return 0 === n ? function(e, t, n, l, r, o, s, i, u, a, c, d) {
                    const h = t.bindings.length;
                    h > 0 && jn(e, t, 0, n), h > 1 && jn(e, t, 1, l), h > 2 && jn(e, t, 2, r), h > 3 && jn(e, t, 3, o), h > 4 && jn(e, t, 4, s), h > 5 && jn(e, t, 5, i), h > 6 && jn(e, t, 6, u), h > 7 && jn(e, t, 7, a), h > 8 && jn(e, t, 8, c), h > 9 && jn(e, t, 9, d)
                }(e, t, l, r, o, s, i, u, a, c, d, h) : function(e, t, n) {
                    for (let l = 0; l < n.length; l++) jn(e, t, l, n[l])
                }(e, t, l), !1
            }

            function jo(e, t) {
                if (In(e, t.nodeIndex).dirty) throw _n(Sn.createDebugContext(e, t.nodeIndex), `Query ${t.query.id} not dirty`, `Query ${t.query.id} dirty`, 0 != (1 & e.state))
            }

            function Lo(e) {
                if (!(128 & e.state)) {
                    if (zo(e, Fo.Destroy), Bo(e, Fo.Destroy), Xl(e, 131072), e.disposables)
                        for (let t = 0; t < e.disposables.length; t++) e.disposables[t]();
                    ! function(e) {
                        if (!(16 & e.state)) return;
                        const t = zn(e);
                        if (t) {
                            const n = t.template._projectedViews;
                            n && (yl(n, n.indexOf(e)), Sn.dirtyParentQueries(e))
                        }
                    }(e), e.renderer.destroyNode && function(e) {
                        const t = e.def.nodes.length;
                        for (let n = 0; n < t; n++) {
                            const t = e.def.nodes[n];
                            1 & t.flags ? e.renderer.destroyNode(En(e, n).renderElement) : 2 & t.flags ? e.renderer.destroyNode(xn(e, n).renderText) : (67108864 & t.flags || 134217728 & t.flags) && In(e, n).destroy()
                        }
                    }(e), Zn(e) && e.renderer.destroy(), e.state |= 128
                }
            }
            const Fo = function() {
                var e = {
                    CreateViewNodes: 0,
                    CheckNoChanges: 1,
                    CheckNoChangesProjectedViews: 2,
                    CheckAndUpdate: 3,
                    CheckAndUpdateProjectedViews: 4,
                    Destroy: 5
                };
                return e[e.CreateViewNodes] = "CreateViewNodes", e[e.CheckNoChanges] = "CheckNoChanges", e[e.CheckNoChangesProjectedViews] = "CheckNoChangesProjectedViews", e[e.CheckAndUpdate] = "CheckAndUpdate", e[e.CheckAndUpdateProjectedViews] = "CheckAndUpdateProjectedViews", e[e.Destroy] = "Destroy", e
            }();

            function Bo(e, t) {
                const n = e.def;
                if (33554432 & n.nodeFlags)
                    for (let l = 0; l < n.nodes.length; l++) {
                        const r = n.nodes[l];
                        33554432 & r.flags ? $o(En(e, l).componentView, t) : 0 == (33554432 & r.childFlags) && (l += r.childCount)
                    }
            }

            function zo(e, t) {
                const n = e.def;
                if (16777216 & n.nodeFlags)
                    for (let l = 0; l < n.nodes.length; l++) {
                        const r = n.nodes[l];
                        if (16777216 & r.flags) {
                            const n = En(e, l).viewContainer._embeddedViews;
                            for (let e = 0; e < n.length; e++) $o(n[e], t)
                        } else 0 == (16777216 & r.childFlags) && (l += r.childCount)
                    }
            }

            function $o(e, t) {
                const n = e.state;
                switch (t) {
                    case Fo.CheckNoChanges:
                        0 == (128 & n) && (12 == (12 & n) ? Mo(e) : 64 & n && Uo(e, Fo.CheckNoChangesProjectedViews));
                        break;
                    case Fo.CheckNoChangesProjectedViews:
                        0 == (128 & n) && (32 & n ? Mo(e) : 64 & n && Uo(e, t));
                        break;
                    case Fo.CheckAndUpdate:
                        0 == (128 & n) && (12 == (12 & n) ? Ro(e) : 64 & n && Uo(e, Fo.CheckAndUpdateProjectedViews));
                        break;
                    case Fo.CheckAndUpdateProjectedViews:
                        0 == (128 & n) && (32 & n ? Ro(e) : 64 & n && Uo(e, t));
                        break;
                    case Fo.Destroy:
                        Lo(e);
                        break;
                    case Fo.CreateViewNodes:
                        Oo(e)
                }
            }

            function Uo(e, t) {
                zo(e, t), Bo(e, t)
            }

            function Zo(e, t, n, l) {
                if (!(e.def.nodeFlags & t && e.def.nodeFlags & n)) return;
                const r = e.def.nodes.length;
                for (let o = 0; o < r; o++) {
                    const r = e.def.nodes[o];
                    if (r.flags & t && r.flags & n) switch (Sn.setCurrentNode(e, r.nodeIndex), l) {
                        case 0:
                            yo(e, r);
                            break;
                        case 1:
                            jo(e, r)
                    }
                    r.childFlags & t && r.childFlags & n || (o += r.childCount)
                }
            }
            let Wo = !1;

            function Ko(e, t, n, l, r, o) {
                const s = r.injector.get(Ut);
                return So(qo(e, r, s, t, n), l, o)
            }

            function Qo(e, t, n, l, r, o) {
                const s = r.injector.get(Ut),
                    i = qo(e, r, new Is(s), t, n),
                    u = os(l);
                return ks(ds.create, So, null, [i, u, o])
            }

            function qo(e, t, n, l, r) {
                const o = t.injector.get(mt),
                    s = t.injector.get($e),
                    i = n.createRenderer(null, null);
                return {
                    ngModule: t,
                    injector: e,
                    projectableNodes: l,
                    selectorOrNode: r,
                    sanitizer: o,
                    rendererFactory: n,
                    renderer: i,
                    errorHandler: s
                }
            }

            function Go(e, t, n, l) {
                const r = os(n);
                return ks(ds.create, Io, null, [e, t, r, l])
            }

            function Jo(e, t, n, l) {
                return n = ts.get(t.element.componentProvider.provider.token) || os(n), ks(ds.create, Ao, null, [e, t, n, l])
            }

            function Yo(e, t, n, l) {
                return Ol(e, t, n, function(e) {
                    const {
                        hasOverrides: t,
                        hasDeprecatedOverrides: n
                    } = function(e) {
                        let t = !1,
                            n = !1;
                        return 0 === Xo.size ? {
                            hasOverrides: t,
                            hasDeprecatedOverrides: n
                        } : (e.providers.forEach(e => {
                            const l = Xo.get(e.token);
                            3840 & e.flags && l && (t = !0, n = n || l.deprecatedBehavior)
                        }), e.modules.forEach(e => {
                            es.forEach((l, r) => {
                                oe(r).providedIn === e && (t = !0, n = n || l.deprecatedBehavior)
                            })
                        }), {
                            hasOverrides: t,
                            hasDeprecatedOverrides: n
                        })
                    }(e);
                    return t ? (function(e) {
                        for (let t = 0; t < e.providers.length; t++) {
                            const l = e.providers[t];
                            n && (l.flags |= 4096);
                            const r = Xo.get(l.token);
                            r && (l.flags = -3841 & l.flags | r.flags, l.deps = Qn(r.deps), l.value = r.value)
                        }
                        if (es.size > 0) {
                            let t = new Set(e.modules);
                            es.forEach((l, r) => {
                                if (t.has(oe(r).providedIn)) {
                                    let t = {
                                        token: r,
                                        flags: l.flags | (n ? 4096 : 0),
                                        deps: Qn(l.deps),
                                        value: l.value,
                                        index: e.providers.length
                                    };
                                    e.providers.push(t), e.providersByKey[Dn(r)] = t
                                }
                            })
                        }
                    }(e = e.factory(() => An)), e) : e
                }(l))
            }
            const Xo = new Map,
                es = new Map,
                ts = new Map;

            function ns(e) {
                let t;
                Xo.set(e.token, e), "function" == typeof e.token && (t = oe(e.token)) && "function" == typeof t.providedIn && es.set(e.token, e)
            }

            function ls(e, t) {
                const n = Jn(t.viewDefFactory),
                    l = Jn(n.nodes[0].element.componentView);
                ts.set(e, l)
            }

            function rs() {
                Xo.clear(), es.clear(), ts.clear()
            }

            function os(e) {
                if (0 === Xo.size) return e;
                const t = function(e) {
                    const t = [];
                    let n = null;
                    for (let l = 0; l < e.nodes.length; l++) {
                        const r = e.nodes[l];
                        1 & r.flags && (n = r), n && 3840 & r.flags && Xo.has(r.provider.token) && (t.push(n.nodeIndex), n = null)
                    }
                    return t
                }(e);
                if (0 === t.length) return e;
                e = e.factory(() => An);
                for (let l = 0; l < t.length; l++) n(e, t[l]);
                return e;

                function n(e, t) {
                    for (let n = t + 1; n < e.nodes.length; n++) {
                        const t = e.nodes[n];
                        if (1 & t.flags) return;
                        if (3840 & t.flags) {
                            const e = t.provider,
                                n = Xo.get(e.token);
                            n && (t.flags = -3841 & t.flags | n.flags, e.deps = Qn(n.deps), e.value = n.value)
                        }
                    }
                }
            }

            function ss(e, t, n, l, r, o, s, i, u, a, c, d, h) {
                const p = e.def.nodes[t];
                return Po(e, p, n, l, r, o, s, i, u, a, c, d, h), 224 & p.flags ? Tn(e, t).value : void 0
            }

            function is(e, t, n, l, r, o, s, i, u, a, c, d, h) {
                const p = e.def.nodes[t];
                return Ho(e, p, n, l, r, o, s, i, u, a, c, d, h), 224 & p.flags ? Tn(e, t).value : void 0
            }

            function us(e) {
                return ks(ds.detectChanges, Ro, null, [e])
            }

            function as(e) {
                return ks(ds.checkNoChanges, Mo, null, [e])
            }

            function cs(e) {
                return ks(ds.destroy, Lo, null, [e])
            }
            const ds = function() {
                var e = {
                    create: 0,
                    detectChanges: 1,
                    checkNoChanges: 2,
                    destroy: 3,
                    handleEvent: 4
                };
                return e[e.create] = "create", e[e.detectChanges] = "detectChanges", e[e.checkNoChanges] = "checkNoChanges", e[e.destroy] = "destroy", e[e.handleEvent] = "handleEvent", e
            }();
            let hs, ps, fs;

            function ms(e, t) {
                ps = e, fs = t
            }

            function gs(e, t, n, l) {
                return ms(e, t), ks(ds.handleEvent, e.def.handleEvent, null, [e, t, n, l])
            }

            function ys(e, t) {
                if (128 & e.state) throw bn(ds[hs]);
                return ms(e, vs(e, 0)), e.def.updateDirectives(function(e, n, l, ...r) {
                    const o = e.def.nodes[n];
                    return 0 === t ? ws(e, o, l, r) : bs(e, o, l, r), 16384 & o.flags && ms(e, vs(e, n)), 224 & o.flags ? Tn(e, o.nodeIndex).value : void 0
                }, e)
            }

            function _s(e, t) {
                if (128 & e.state) throw bn(ds[hs]);
                return ms(e, Cs(e, 0)), e.def.updateRenderer(function(e, n, l, ...r) {
                    const o = e.def.nodes[n];
                    return 0 === t ? ws(e, o, l, r) : bs(e, o, l, r), 3 & o.flags && ms(e, Cs(e, n)), 224 & o.flags ? Tn(e, o.nodeIndex).value : void 0
                }, e)
            }

            function ws(e, t, n, l) {
                if (Po(e, t, n, ...l)) {
                    const s = 1 === n ? l[0] : l;
                    if (16384 & t.flags) {
                        const n = {};
                        for (let e = 0; e < t.bindings.length; e++) {
                            const l = t.bindings[e],
                                i = s[e];
                            8 & l.flags && (n[(r = l.nonMinifiedName, o = void 0, o = r.replace(/[$@]/g, "_"), `ng-reflect-${r=o.replace(_t,(...e)=>"-"+e[1].toLowerCase())}`)] = wt(i))
                        }
                        const l = t.parent,
                            i = En(e, l.nodeIndex).renderElement;
                        if (l.element.name)
                            for (let t in n) {
                                const l = n[t];
                                null != l ? e.renderer.setAttribute(i, t, l) : e.renderer.removeAttribute(i, t)
                            } else e.renderer.setValue(i, `bindings=${JSON.stringify(n,null,2)}`)
                    }
                }
                var r, o
            }

            function bs(e, t, n, l) {
                Ho(e, t, n, ...l)
            }

            function vs(e, t) {
                for (let n = t; n < e.def.nodes.length; n++) {
                    const t = e.def.nodes[n];
                    if (16384 & t.flags && t.bindings && t.bindings.length) return n
                }
                return null
            }

            function Cs(e, t) {
                for (let n = t; n < e.def.nodes.length; n++) {
                    const t = e.def.nodes[n];
                    if (3 & t.flags && t.bindings && t.bindings.length) return n
                }
                return null
            }
            class xs {
                constructor(e, t) {
                    this.view = e, this.nodeIndex = t, null == t && (this.nodeIndex = t = 0), this.nodeDef = e.def.nodes[t];
                    let n = this.nodeDef,
                        l = e;
                    for (; n && 0 == (1 & n.flags);) n = n.parent;
                    if (!n)
                        for (; !n && l;) n = $n(l), l = l.parent;
                    this.elDef = n, this.elView = l
                }
                get elOrCompView() {
                    return En(this.elView, this.elDef.nodeIndex).componentView || this.view
                }
                get injector() {
                    return Sl(this.elView, this.elDef)
                }
                get component() {
                    return this.elOrCompView.component
                }
                get context() {
                    return this.elOrCompView.context
                }
                get providerTokens() {
                    const e = [];
                    if (this.elDef)
                        for (let t = this.elDef.nodeIndex + 1; t <= this.elDef.nodeIndex + this.elDef.childCount; t++) {
                            const n = this.elView.def.nodes[t];
                            20224 & n.flags && e.push(n.provider.token), t += n.childCount
                        }
                    return e
                }
                get references() {
                    const e = {};
                    if (this.elDef) {
                        Es(this.elView, this.elDef, e);
                        for (let t = this.elDef.nodeIndex + 1; t <= this.elDef.nodeIndex + this.elDef.childCount; t++) {
                            const n = this.elView.def.nodes[t];
                            20224 & n.flags && Es(this.elView, n, e), t += n.childCount
                        }
                    }
                    return e
                }
                get componentRenderElement() {
                    const e = function(e) {
                        for (; e && !Zn(e);) e = e.parent;
                        return e.parent ? En(e.parent, $n(e).nodeIndex) : null
                    }(this.elOrCompView);
                    return e ? e.renderElement : void 0
                }
                get renderNode() {
                    return 2 & this.nodeDef.flags ? Un(this.view, this.nodeDef) : Un(this.elView, this.elDef)
                }
                logError(e, ...t) {
                    let n, l;
                    2 & this.nodeDef.flags ? (n = this.view.def, l = this.nodeDef.nodeIndex) : (n = this.elView.def, l = this.elDef.nodeIndex);
                    const r = function(e, t) {
                        let n = -1;
                        for (let l = 0; l <= t; l++) 3 & e.nodes[l].flags && n++;
                        return n
                    }(n, l);
                    let o = -1;
                    n.factory(() => ++o === r ? e.error.bind(e, ...t) : An), o < r && (e.error("Illegal state: the ViewDefinitionFactory did not call the logger!"), e.error(...t))
                }
            }

            function Es(e, t, n) {
                for (let l in t.references) n[l] = wo(e, t, t.references[l])
            }

            function ks(e, t, n, l) {
                const r = hs,
                    o = ps,
                    s = fs;
                try {
                    hs = e;
                    const u = t.apply(n, l);
                    return ps = o, fs = s, hs = r, u
                } catch (i) {
                    if (Fe(i) || !ps) throw i;
                    throw function(e, t) {
                        return e instanceof Error || (e = new Error(e.toString())), wn(e, t), e
                    }(i, Ts())
                }
            }

            function Ts() {
                return ps ? new xs(ps, fs) : null
            }
            class Is {
                constructor(e) {
                    this.delegate = e
                }
                createRenderer(e, t) {
                    return new Ss(this.delegate.createRenderer(e, t))
                }
                begin() {
                    this.delegate.begin && this.delegate.begin()
                }
                end() {
                    this.delegate.end && this.delegate.end()
                }
                whenRenderingDone() {
                    return this.delegate.whenRenderingDone ? this.delegate.whenRenderingDone() : Promise.resolve(null)
                }
            }
            class Ss {
                constructor(e) {
                    this.delegate = e, this.debugContextFactory = Ts, this.data = this.delegate.data
                }
                createDebugContext(e) {
                    return this.debugContextFactory(e)
                }
                destroyNode(e) {
                    ! function(e) {
                        Xr.delete(e.nativeNode)
                    }(eo(e)), this.delegate.destroyNode && this.delegate.destroyNode(e)
                }
                destroy() {
                    this.delegate.destroy()
                }
                createElement(e, t) {
                    const n = this.delegate.createElement(e, t),
                        l = this.createDebugContext(n);
                    if (l) {
                        const t = new Yr(n, null, l);
                        t.name = e, to(t)
                    }
                    return n
                }
                createComment(e) {
                    const t = this.delegate.createComment(e),
                        n = this.createDebugContext(t);
                    return n && to(new Jr(t, null, n)), t
                }
                createText(e) {
                    const t = this.delegate.createText(e),
                        n = this.createDebugContext(t);
                    return n && to(new Jr(t, null, n)), t
                }
                appendChild(e, t) {
                    const n = eo(e),
                        l = eo(t);
                    n && l && n instanceof Yr && n.addChild(l), this.delegate.appendChild(e, t)
                }
                insertBefore(e, t, n) {
                    const l = eo(e),
                        r = eo(t),
                        o = eo(n);
                    l && r && l instanceof Yr && l.insertBefore(o, r), this.delegate.insertBefore(e, t, n)
                }
                removeChild(e, t) {
                    const n = eo(e),
                        l = eo(t);
                    n && l && n instanceof Yr && n.removeChild(l), this.delegate.removeChild(e, t)
                }
                selectRootElement(e, t) {
                    const n = this.delegate.selectRootElement(e, t),
                        l = Ts();
                    return l && to(new Yr(n, null, l)), n
                }
                setAttribute(e, t, n, l) {
                    const r = eo(e);
                    r && r instanceof Yr && (r.attributes[l ? l + ":" + t : t] = n), this.delegate.setAttribute(e, t, n, l)
                }
                removeAttribute(e, t, n) {
                    const l = eo(e);
                    l && l instanceof Yr && (l.attributes[n ? n + ":" + t : t] = null), this.delegate.removeAttribute(e, t, n)
                }
                addClass(e, t) {
                    const n = eo(e);
                    n && n instanceof Yr && (n.classes[t] = !0), this.delegate.addClass(e, t)
                }
                removeClass(e, t) {
                    const n = eo(e);
                    n && n instanceof Yr && (n.classes[t] = !1), this.delegate.removeClass(e, t)
                }
                setStyle(e, t, n, l) {
                    const r = eo(e);
                    r && r instanceof Yr && (r.styles[t] = n), this.delegate.setStyle(e, t, n, l)
                }
                removeStyle(e, t, n) {
                    const l = eo(e);
                    l && l instanceof Yr && (l.styles[t] = null), this.delegate.removeStyle(e, t, n)
                }
                setProperty(e, t, n) {
                    const l = eo(e);
                    l && l instanceof Yr && (l.properties[t] = n), this.delegate.setProperty(e, t, n)
                }
                listen(e, t, n) {
                    if ("string" != typeof e) {
                        const l = eo(e);
                        l && l.listeners.push(new Gr(t, n))
                    }
                    return this.delegate.listen(e, t, n)
                }
                parentNode(e) {
                    return this.delegate.parentNode(e)
                }
                nextSibling(e) {
                    return this.delegate.nextSibling(e)
                }
                setValue(e, t) {
                    return this.delegate.setValue(e, t)
                }
            }

            function As(e, t, n) {
                return new Ns(e, t, n)
            }
            class Ns extends Lt {
                constructor(e, t, n) {
                    super(), this.moduleType = e, this._bootstrapComponents = t, this._ngModuleDefFactory = n
                }
                create(e) {
                    ! function() {
                        if (Wo) return;
                        Wo = !0;
                        const e = We() ? {
                            setCurrentNode: ms,
                            createRootView: Qo,
                            createEmbeddedView: Go,
                            createComponentView: Jo,
                            createNgModuleRef: Yo,
                            overrideProvider: ns,
                            overrideComponentView: ls,
                            clearOverrides: rs,
                            checkAndUpdateView: us,
                            checkNoChangesView: as,
                            destroyView: cs,
                            createDebugContext: (e, t) => new xs(e, t),
                            handleEvent: gs,
                            updateDirectives: ys,
                            updateRenderer: _s
                        } : {
                            setCurrentNode: () => {},
                            createRootView: Ko,
                            createEmbeddedView: Io,
                            createComponentView: Ao,
                            createNgModuleRef: Ol,
                            overrideProvider: An,
                            overrideComponentView: An,
                            clearOverrides: An,
                            checkAndUpdateView: Ro,
                            checkNoChangesView: Mo,
                            destroyView: Lo,
                            createDebugContext: (e, t) => new xs(e, t),
                            handleEvent: (e, t, n, l) => e.def.handleEvent(e, t, n, l),
                            updateDirectives: (e, t) => e.def.updateDirectives(0 === t ? ss : is, e),
                            updateRenderer: (e, t) => e.def.updateRenderer(0 === t ? ss : is, e)
                        };
                        Sn.setCurrentNode = e.setCurrentNode, Sn.createRootView = e.createRootView, Sn.createEmbeddedView = e.createEmbeddedView, Sn.createComponentView = e.createComponentView, Sn.createNgModuleRef = e.createNgModuleRef, Sn.overrideProvider = e.overrideProvider, Sn.overrideComponentView = e.overrideComponentView, Sn.clearOverrides = e.clearOverrides, Sn.checkAndUpdateView = e.checkAndUpdateView, Sn.checkNoChangesView = e.checkNoChangesView, Sn.destroyView = e.destroyView, Sn.resolveDep = Gl, Sn.createDebugContext = e.createDebugContext, Sn.handleEvent = e.handleEvent, Sn.updateDirectives = e.updateDirectives, Sn.updateRenderer = e.updateRenderer, Sn.dirtyParentQueries = go
                    }();
                    const t = function(e) {
                        const t = Array.from(e.providers),
                            n = Array.from(e.modules),
                            l = {};
                        for (const r in e.providersByKey) l[r] = e.providersByKey[r];
                        return {
                            factory: e.factory,
                            isRoot: e.isRoot,
                            providers: t,
                            modules: n,
                            providersByKey: l
                        }
                    }(Jn(this._ngModuleDefFactory));
                    return Sn.createNgModuleRef(this.moduleType, e || ve.NULL, this._bootstrapComponents, t)
                }
            }
            class Ds {}

            function Os(e, t, n, l) {
                return new(n || (n = Promise))(function(r, o) {
                    function s(e) {
                        try {
                            u(l.next(e))
                        } catch (t) {
                            o(t)
                        }
                    }

                    function i(e) {
                        try {
                            u(l.throw(e))
                        } catch (t) {
                            o(t)
                        }
                    }

                    function u(e) {
                        e.done ? r(e.value) : new n(function(t) {
                            t(e.value)
                        }).then(s, i)
                    }
                    u((l = l.apply(e, t || [])).next())
                })
            }
            class Ms {
                constructor() {
                    this.title = "my-portfolio", this.start = !1, this.start2 = !1, this.start3 = !1, this.start4 = !1, this.start5 = !1, this.start6 = !1, this.start7 = !1, this.start8 = !1, this.start9 = !1, this.start10 = !1, this.start11 = !1, this.start12 = !1, this.start13 = !1, this.start14 = !1, this.start15 = !1, this.start16 = !1, this.start17 = !1, this.start18 = !1, this.start19 = !1, this.start19After = !1, this.start20 = !1, this.start21 = !1, this.start21After = !1, this.start22 = !1, this.start23 = !1, this.start24 = !1, this.start25 = !1, this.start26 = !1, this.start27 = !1, this.start28 = !1, this.startmiddle = !1, this.startmiddle2 = !1, this.startmiddle3 = !1, this.stringInterpolation = "Angular 4 Typing Animation Directive (string interpolation)"
                }
                delay(e) {
                    return new Promise(t => setTimeout(t, e))
                }
                ngOnInit() {
                    this.start = !0
                }
                onTypingAnimationComplete1() {
                    return this.start2 = !0, !0
                }
                onTypingAnimationComplete2() {
                    (() => Os(this, void 0, void 0, function*() {
                        yield this.delay(1e3), this.start3 = !0
                    }))()
                }
                onTypingAnimationComplete3() {
                    return this.start4 = !0, !0
                }
                scrollWin() {
                    return window.scrollTo(0, document.body.scrollHeight), !0
                }
                onTypingAnimationComplete4() {
                    return this.start5 = !0, !0
                }
                onTypingAnimationComplete5() {
                    this.start6 = !0
                }
                onTypingAnimationComplete6() {
                    this.start7 = !0
                }
                onTypingAnimationComplete7() {
                    return this.start8 = !0, !0
                }
                onTypingAnimationComplete8() {
                    return this.start9 = !0, !0
                }
                onTypingAnimationComplete9() {
                    (() => Os(this, void 0, void 0, function*() {
                        return yield this.delay(1e3), this.start10 = !0, !0
                    }))()
                }
                onTypingAnimationComplete10() {
                    return this.start11 = !0, !0
                }
                onTypingAnimationComplete11() {
                    return this.start12 = !0, !0
                }
                onTypingAnimationComplete12() {
                    return this.start13 = !0, !0
                }
                onTypingAnimationComplete13() {
                    return this.start14 = !0, !0
                }
                onTypingAnimationComplete14() {
                    return this.start15 = !0, !0
                }
                onTypingAnimationComplete15() {
                    return this.start16 = !0, !0
                }
                onTypingAnimationComplete16() {
                    return this.start17 = !0, !0
                }
                onTypingAnimationComplete17() {
                    return this.start18 = !0, !0
                }
                onTypingAnimationComplete18() {
                    return this.start19 = !0, !0
                }
                onTypingAnimationComplete19() {
                    return this.start19After = !0, !0
                }
                onTypingAnimationComplete19After() {
                    return this.start20 = !0, !0
                }
                onTypingAnimationComplete20() {
                    return this.start21 = !0, !0
                }
                onTypingAnimationComplete21After() {
                    return this.start22 = !0, !0
                }
                onTypingAnimationComplete21() {
                    return this.start21After = !0, !0
                }
                onTypingAnimationComplete22() {
                    return this.start23 = !0, !0
                }
                onTypingAnimationComplete23() {
                    return this.start24 = !0, !0
                }
                onTypingAnimationComplete24() {
                    return this.start25 = !0, !0
                }
                onTypingAnimationComplete25() {
                    return this.start26 = !0, !0
                }
                onTypingAnimationComplete26() {
                    return this.start27 = !0, !0
                }
                onTypingAnimationComplete27() {
                    return this.start28 = !0, !0
                }
                onTypingAnimationCompletemiddle() {
                    return this.startmiddle = !0, !0
                }
                onTypingAnimationCompletemiddle2() {
                    return this.startmiddle2 = !0, !0
                }
                onTypingAnimationCompleteMiddle2() {
                    return this.startmiddle3 = !0, !0
                }
            }
            class Rs {}
            const Ps = void 0;
            var Vs = ["en", [
                    ["a", "p"],
                    ["AM", "PM"], Ps
                ],
                [
                    ["AM", "PM"], Ps, Ps
                ],
                [
                    ["S", "M", "T", "W", "T", "F", "S"],
                    ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                    ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                    ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
                ], Ps, [
                    ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
                    ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                    ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
                ], Ps, [
                    ["B", "A"],
                    ["BC", "AD"],
                    ["Before Christ", "Anno Domini"]
                ], 0, [6, 0],
                ["M/d/yy", "MMM d, y", "MMMM d, y", "EEEE, MMMM d, y"],
                ["h:mm a", "h:mm:ss a", "h:mm:ss a z", "h:mm:ss a zzzz"],
                ["{1}, {0}", Ps, "{1} 'at' {0}", Ps],
                [".", ",", ";", "%", "+", "-", "E", "\xd7", "\u2030", "\u221e", "NaN", ":"],
                ["#,##0.###", "#,##0%", "\xa4#,##0.00", "#E0"], "$", "US Dollar", {},
                function(e) {
                    let t = Math.floor(Math.abs(e)),
                        n = e.toString().replace(/^[^.]*\.?/, "").length;
                    return 1 === t && 0 === n ? 1 : 5
                }
            ];
            const Hs = {},
                js = function() {
                    var e = {
                        Zero: 0,
                        One: 1,
                        Two: 2,
                        Few: 3,
                        Many: 4,
                        Other: 5
                    };
                    return e[e.Zero] = "Zero", e[e.One] = "One", e[e.Two] = "Two", e[e.Few] = "Few", e[e.Many] = "Many", e[e.Other] = "Other", e
                }(),
                Ls = new ge("UseV4Plurals");
            class Fs {}
            const Bs = (() => (class extends Fs {
                    constructor(e, t) {
                        super(), this.locale = e, this.deprecatedPluralFn = t
                    }
                    getPluralCategory(e, t) {
                        switch (this.deprecatedPluralFn ? this.deprecatedPluralFn(t || this.locale, e) : function(e) {
                            return function(e) {
                                const t = e.toLowerCase().replace(/_/g, "-");
                                let n = Hs[t];
                                if (n) return n;
                                const l = t.split("-")[0];
                                if (n = Hs[l]) return n;
                                if ("en" === l) return Vs;
                                throw new Error(`Missing locale data for the locale "${e}".`)
                            }(e)[18]
                        }(t || this.locale)(e)) {
                            case js.Zero:
                                return "zero";
                            case js.One:
                                return "one";
                            case js.Two:
                                return "two";
                            case js.Few:
                                return "few";
                            case js.Many:
                                return "many";
                            default:
                                return "other"
                        }
                    }
                }))(),
                zs = (() => (class {
                    constructor(e, t) {
                        this._viewContainer = e, this._context = new $s, this._thenTemplateRef = null, this._elseTemplateRef = null, this._thenViewRef = null, this._elseViewRef = null, this._thenTemplateRef = t
                    }
                    set ngIf(e) {
                        this._context.$implicit = this._context.ngIf = e, this._updateView()
                    }
                    set ngIfThen(e) {
                        Us("ngIfThen", e), this._thenTemplateRef = e, this._thenViewRef = null, this._updateView()
                    }
                    set ngIfElse(e) {
                        Us("ngIfElse", e), this._elseTemplateRef = e, this._elseViewRef = null, this._updateView()
                    }
                    _updateView() {
                        this._context.$implicit ? this._thenViewRef || (this._viewContainer.clear(), this._elseViewRef = null, this._thenTemplateRef && (this._thenViewRef = this._viewContainer.createEmbeddedView(this._thenTemplateRef, this._context))) : this._elseViewRef || (this._viewContainer.clear(), this._thenViewRef = null, this._elseTemplateRef && (this._elseViewRef = this._viewContainer.createEmbeddedView(this._elseTemplateRef, this._context)))
                    }
                    static ngTemplateGuard_ngIf(e, t) {
                        return !0
                    }
                }))();
            class $s {
                constructor() {
                    this.$implicit = null, this.ngIf = null
                }
            }

            function Us(e, t) {
                if (t && !t.createEmbeddedView) throw new Error(`${e} must be a TemplateRef, but received '${ie(t)}'.`)
            }
            const Zs = (() => (class {}))(),
                Ws = new ge("DocumentToken");
            var Ks = Object.assign || function(e) {
                    for (var t, n = 1, l = arguments.length; n < l; n++)
                        for (var r in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
                    return e
                },
                Qs = function() {
                    function e(e, t) {
                        this.element = e, this.options = Ks({}, {
                            typeSpeed: 0,
                            startDelay: 0,
                            showCursor: !0,
                            hideCursorOnComplete: !1,
                            onComplete: function() {}
                        }, t), this.textContent = e.textContent.trim(), this.strPos = 0, this.typingComplete = !1, this.element.textContent = "", this.appendAnimationCss()
                    }
                    return e.prototype.begin = function() {
                        var e = this;
                        if (this.typingComplete) return this.restart();
                        this.insertCursor(), this.timeout = setTimeout(function() {
                            e.typewrite()
                        }, this.options.startDelay)
                    }, e.prototype.typewrite = function() {
                        var e = this,
                            t = this.humanizer(this.options.typeSpeed);
                        this.timeout = setTimeout(function() {
                            e.toggleBlinking(!1), e.strPos === e.textContent.length ? e.doneTyping() : e.keepTyping()
                        }, t)
                    }, e.prototype.keepTyping = function() {
                        0 === this.strPos && this.toggleBlinking(!1), this.strPos += 1;
                        var e = this.textContent.substr(0, this.strPos);
                        this.replaceText(e), this.typewrite()
                    }, e.prototype.doneTyping = function() {
                        this.toggleBlinking(!0), this.textContent.length === this.strPos && this.complete()
                    }, e.prototype.complete = function() {
                        this.options.hideCursorOnComplete && this.removeCursor(), this.typingComplete = !0, this.options.onComplete()
                    }, e.prototype.restart = function() {
                        this.typingComplete && (clearTimeout(this.timeout), this.replaceText(""), this.removeCursor(), this.strPos = 0, this.typingComplete = !1, this.begin())
                    }, e.prototype.insertCursor = function() {
                        this.cursor || (this.cursor = document.createElement("span"), this.cursor.className = "typed-cursor", this.cursor.innerHTML = "|", this.element.parentNode && this.element.parentNode.insertBefore(this.cursor, this.element.nextSibling))
                    }, e.prototype.removeCursor = function() {
                        this.cursor && this.cursor.parentNode && (this.cursor.parentNode.removeChild(this.cursor), this.cursor = null)
                    }, e.prototype.replaceText = function(e) {
                        this.element.textContent = e
                    }, e.prototype.humanizer = function(e) {
                        return Math.round(Math.random() * e / 2) + e
                    }, e.prototype.toggleBlinking = function(e) {
                        this.cursor && this.cursorBlinking !== e && (this.cursorBlinking = e, this.cursor.style.animationIterationCount = e ? "infinite" : 0)
                    }, e.prototype.appendAnimationCss = function() {
                        if (this.options.showCursor) {
                            if (document.head.querySelector("#typing")) return;
                            var e = document.createElement("style");
                            e.type = "text/css", e.id = "typing", e.innerHTML = "\n                .typed-cursor{\n                    opacity: 1;\n                    animation: typedjsBlink 0.7s infinite;\n                    -webkit-animation: typedjsBlink 0.7s infinite;\n                    animation: typedjsBlink 0.7s infinite;\n                }\n                @keyframes typedjsBlink{\n                    50% { opacity: 0.0; }\n                }\n                @-webkit-keyframes typedjsBlink{\n                    0% { opacity: 1; }\n                    50% { opacity: 0.0; }\n                    100% { opacity: 1; }\n                }\n            ", document.head.appendChild(e)
                        }
                    }, e
                }(),
                qs = function() {
                    function e(e) {
                        this.elRef = e, this.typeSpeed = 0, this.startDelay = 0, this.condition = !0, this.hideCursorOnComplete = !1, this.complete = new lr, this.typingLock = !1
                    }
                    return e.prototype.ngOnInit = function() {
                        this.checkContent() && this.createTyped()
                    }, e.prototype.ngAfterViewInit = function() {
                        var e = this;
                        if (!this.typed) return this.checkContent() ? void this.createTyped() : (this.contentObservable = new _(function(t) {
                            e.checkContent() && (t.next(e.elRef.nativeElement.textContent.trim()), t.complete())
                        }), void(this.contentSubscription = this.contentObservable.subscribe(function(t) {
                            e.createTyped(), e.contentSubscription.unsubscribe()
                        })))
                    }, e.prototype.ngOnChanges = function(e) {
                        if ("condition" in e && this.typed) {
                            if (this.typingLock) return;
                            this.condition && (this.typed.begin(), this.typingLock = !0)
                        }
                    }, e.prototype.checkContent = function() {
                        return this.elRef.nativeElement.textContent.trim().length > 0
                    }, e.prototype.createTyped = function() {
                        var e = this;
                        this.typed = new Qs(this.elRef.nativeElement, {
                            typeSpeed: this.typeSpeed,
                            startDelay: this.startDelay,
                            condition: this.condition,
                            hideCursorOnComplete: this.hideCursorOnComplete,
                            onComplete: function() {
                                e.complete.emit(null), e.typingLock = !1
                            }
                        }), this.condition && (this.typed.begin(), this.typingLock = !0)
                    }, e
                }(),
                Gs = Rn({
                    encapsulation: 0,
                    styles: [
                        ["#console[_ngcontent-%COMP%]{font-family:courier,monospace;color:#fff;width:750px;margin-left:auto;margin-right:auto;font-size:1.05em}#a[_ngcontent-%COMP%]{font-family:courier,monospace;color:#0f0;width:750px;margin-left:auto;margin-right:auto;margin-top:800px;font-size:1.05em}#b[_ngcontent-%COMP%]{font-family:courier,monospace;color:#f0f;width:750px;margin-left:auto;margin-right:auto;margin-top:100px;font-size:1.05em}#red[_ngcontent-%COMP%]{font-family:courier,monospace;color:red;width:750px;margin-left:auto;margin-right:auto;margin-top:500px;font-size:1.05em;font-weight:700}.blinking[_ngcontent-%COMP%]{-webkit-animation:.8s infinite blinkingText;animation:.8s infinite blinkingText}@-webkit-keyframes blinkingText{0%{opacity:0}50%{opacity:.5}100%{color:red}}@keyframes blinkingText{0%{opacity:0}50%{opacity:.5}100%{color:red}}div.list-group[_ngcontent-%COMP%]{width:250px;box-shadow:0 4px 8px 0 rgba(0,0,0,10),0 6px 20px 0 rgba(0,0,0,10);text-align:center;background-color:#343d46}.list-1[_ngcontent-%COMP%], .list-2[_ngcontent-%COMP%], .list-3[_ngcontent-%COMP%], .list-4[_ngcontent-%COMP%], .list-5[_ngcontent-%COMP%]{border:0;color:#fff;background-color:#343d46;font-family:courier,monospace;text-align:left}span.list-1[_ngcontent-%COMP%]:hover{color:#a3be8c;background:#343d46}span.list-2[_ngcontent-%COMP%]:hover{color:#add8e6;background:#343d46}span.list-3[_ngcontent-%COMP%]:hover{color:#d08770;background:#343d46}a.list-4[_ngcontent-%COMP%]:hover{color:#a3be8c!important;background:#343d46!important}a.list-4[_ngcontent-%COMP%]:active{color:#fff!important;background:#343d46!important}a.list-4[_ngcontent-%COMP%]:visited{color:#fff;background:#343d46}a.list-5[_ngcontent-%COMP%]:active, a.list-5[_ngcontent-%COMP%]:hover{color:#a3be8c!important;background:#343d46!important}a.list-5[_ngcontent-%COMP%]:visited{color:#fff;background:#343d46}ul.list-group[_ngcontent-%COMP%]{width:-webkit-max-content;width:-moz-max-content;width:max-content}.fa-github[_ngcontent-%COMP%]:hover, .fa-linkedin[_ngcontent-%COMP%]:hover, .fa-medium[_ngcontent-%COMP%]:hover{color:#fff!important}.clear[_ngcontent-%COMP%]{clear:both}"]
                    ],
                    data: {}
                });

            function Js(e) {
                return Eo(0, [(e()(), co(0, 0, null, null, 2, "span", [
                    ["id", "b"]
                ], null, null, null, null, null)), (e()(), co(1, 0, null, null, 1, "span", [], null, null, null, null, null)), (e()(), vo(-1, null, ["~/welcome \xa0\xa0"]))], null, null)
            }

            function Ys(e) {
                return Eo(0, [(e()(), co(0, 0, null, null, 12, "span", [
                    ["id", "console"]
                ], null, null, null, null, null)), (e()(), co(1, 0, null, null, 6, "div", [
                    ["class", "row"]
                ], null, null, null, null, null)), (e()(), co(2, 0, null, null, 1, "div", [
                    ["class", "col-lg-4"]
                ], null, null, null, null, null)), (e()(), vo(-1, null, [" about-me.txt"])), (e()(), co(4, 0, null, null, 1, "div", [
                    ["class", "col-lg-4"]
                ], null, null, null, null, null)), (e()(), vo(-1, null, [" skills.md"])), (e()(), co(6, 0, null, null, 1, "div", [
                    ["class", "col-lg-4"]
                ], null, null, null, null, null)), (e()(), vo(-1, null, ["personal-projects.md"])), (e()(), co(8, 0, null, null, 4, "div", [
                    ["class", "row"]
                ], null, null, null, null, null)), (e()(), co(9, 0, null, null, 1, "div", [
                    ["class", "col-lg-4"]
                ], null, null, null, null, null)), (e()(), vo(-1, null, ["contact-me.md"])), (e()(), co(11, 0, null, null, 1, "div", [
                    ["class", "col-lg-4"]
                ], null, null, null, null, null)), (e()(), vo(-1, null, [" awards-and-recognitions.txt"]))], null, null)
            }

            function Xs(e) {
                return Eo(0, [(e()(), co(0, 0, null, null, 2, "span", [
                    ["id", "a"]
                ], null, null, null, null, null)), (e()(), co(1, 0, null, null, 1, "span", [], null, null, null, null, null)), (e()(), vo(-1, null, ["Mayur@Bavisiya\xa0"]))], null, null)
            }

            function ei(e) {
                return Eo(0, [(e()(), co(0, 0, null, null, 2, "span", [
                    ["id", "b"]
                ], null, null, null, null, null)), (e()(), co(1, 0, null, null, 1, "span", [], null, null, null, null, null)), (e()(), vo(-1, null, ["~/welcome \xa0\xa0"]))], null, null)
            }

            function ti(e) {
                return Eo(0, [(e()(), co(0, 0, null, null, 2, "span", [
                    ["id", "a"]
                ], null, null, null, null, null)), (e()(), co(1, 0, null, null, 1, "span", [], null, null, null, null, null)), (e()(), vo(-1, null, ["Mayur@Bavisiya\xa0"]))], null, null)
            }

            function ni(e) {
                return Eo(0, [(e()(), co(0, 0, null, null, 2, "span", [
                    ["id", "b"]
                ], null, null, null, null, null)), (e()(), co(1, 0, null, null, 1, "span", [], null, null, null, null, null)), (e()(), vo(-1, null, ["~/welcome \xa0\xa0"]))], null, null)
            }

            function li(e) {
                return Eo(0, [(e()(), co(0, 0, null, null, 2, "span", [
                    ["id", "a"]
                ], null, null, null, null, null)), (e()(), co(1, 0, null, null, 1, "span", [], null, null, null, null, null)), (e()(), vo(-1, null, ["Mayur@Bavisiya\xa0"]))], null, null)
            }

            function ri(e) {
                return Eo(0, [(e()(), co(0, 0, null, null, 2, "span", [
                    ["id", "b"]
                ], null, null, null, null, null)), (e()(), co(1, 0, null, null, 1, "span", [], null, null, null, null, null)), (e()(), vo(-1, null, ["~/welcome \xa0\xa0"]))], null, null)
            }

            function oi(e) {
                return Eo(0, [(e()(), co(0, 0, null, null, 0, "div", [
                    ["class", " col-md-1 col-lg-1"]
                ], null, null, null, null, null))], null, null)
            }

            function si(e) {
                return Eo(0, [(e()(), co(0, 0, null, null, 13, "div", [
                    ["class", "col-xs-10 col-sm-10 col-md-4 col-lg-4"]
                ], null, null, null, null, null)), (e()(), co(1, 0, null, null, 12, "div", [
                    ["class", "list-group"],
                    ["style", "border: solid black 0.7px; border-radius: 0px;"]
                ], null, null, null, null, null)), (e()(), co(2, 0, null, null, 1, "span", [
                    ["class", "list-group-item "],
                    ["style", "background-color: lightblue; margin: 10px; border-radius:0px;font-family: courier, monospace; font-weight: bolder;color:black;"]
                ], null, null, null, null, null)), (e()(), vo(-1, null, [" Tools/Others "])), (e()(), co(4, 0, null, null, 1, "span", [
                    ["class", "list-group-item list-2"]
                ], null, null, null, null, null)), (e()(), vo(-1, null, ["Docker"])), (e()(), co(6, 0, null, null, 1, "span", [
                    ["class", "list-group-item list-2"]
                ], null, null, null, null, null)), (e()(), vo(-1, null, ["Kubernetes"])), (e()(), co(8, 0, null, null, 1, "span", [
                    ["class", "list-group-item list-2"]
                ], null, null, null, null, null)), (e()(), vo(-1, null, ["Jenkins"])), (e()(), co(10, 0, null, null, 1, "span", [
                    ["class", "list-group-item list-2"]
                ], null, null, null, null, null)), (e()(), vo(-1, null, ["Shell Scripting"])), (e()(), co(12, 0, null, null, 1, "span", [
                    ["class", "list-group-item list-2"]
                ], null, null, null, null, null)), (e()(), vo(-1, null, ["Ansible/ Terraform/ Azure"]))], null, null)
            }

            function ii(e) {
                return Eo(0, [(e()(), co(0, 0, null, null, 0, "div", [
                    ["class", " col-md-2 col-lg-2"]
                ], null, null, null, null, null))], null, null)
            }

            function ui(e) {
                return Eo(0, [(e()(), co(0, 0, null, null, 21, "div", [], null, null, null, null, null)), (e()(), co(1, 0, null, null, 0, "div", [
                    ["class", " col-md-1 col-lg-1"]
                ], null, null, null, null, null)), (e()(), co(2, 0, null, null, 13, "div", [
                    ["class", "col-xs-10 col-sm-4 col-md-4 col-lg-4"]
                ], null, null, null, null, null)), (e()(), co(3, 0, null, null, 12, "div", [
                    ["class", "list-group"],
                    ["style", "border: solid black 0.7px; border-radius: 0px;"]
                ], null, null, null, null, null)), (e()(), co(4, 0, null, null, 1, "span", [
                    ["class", "list-group-item "],
                    ["style", "background-color: #A3BE8C; margin: 10px; border-radius:0px;font-family: courier, monospace; font-weight: bolder;color:black;"]
                ], null, null, null, null, null)), (e()(), vo(-1, null, [" Languages/Frameworks "])), (e()(), co(6, 0, null, null, 1, "span", [
                    ["class", "list-group-item  list-1"]
                ], null, null, null, null, null)), (e()(), vo(-1, null, ["Java"])), (e()(), co(8, 0, null, null, 1, "span", [
                    ["class", "list-group-item list-1"]
                ], null, null, null, null, null)), (e()(), vo(-1, null, ["Spring Boot"])), (e()(), co(10, 0, null, null, 1, "span", [
                    ["class", "list-group-item list-1"]
                ], null, null, null, null, null)), (e()(), vo(-1, null, ["Angular"])), (e()(), co(12, 0, null, null, 1, "span", [
                    ["class", "list-group-item list-1"]
                ], null, null, null, null, null)), (e()(), vo(-1, null, ["Blockchain"])), (e()(), co(14, 0, null, null, 1, "span", [
                    ["class", "list-group-item list-1"]
                ], null, null, null, null, null)), (e()(), vo(-1, null, ["Hyperledger Fabric"])), (e()(), ao(16777216, null, null, 1, null, oi)), zl(17, 16384, null, 0, zs, [gn, fn], {
                    ngIf: [0, "ngIf"]
                }, null), (e()(), ao(16777216, null, null, 1, null, si)), zl(19, 16384, null, 0, zs, [gn, fn], {
                    ngIf: [0, "ngIf"]
                }, null), (e()(), ao(16777216, null, null, 1, null, ii)), zl(21, 16384, null, 0, zs, [gn, fn], {
                    ngIf: [0, "ngIf"]
                }, null)], function(e, t) {
                    var n = t.component;
                    e(t, 17, 0, n.start12 && n.scrollWin()), e(t, 19, 0, n.start12 && n.scrollWin()), e(t, 21, 0, n.start12 && n.scrollWin())
                }, null)
            }

            function ai(e) {
                return Eo(0, [(e()(), co(0, 0, null, null, 2, "span", [
                    ["id", "a"]
                ], null, null, null, null, null)), (e()(), co(1, 0, null, null, 1, "span", [], null, null, null, null, null)), (e()(), vo(-1, null, ["Mayur@Bavisiya\xa0"]))], null, null)
            }

            function ci(e) {
                return Eo(0, [(e()(), co(0, 0, null, null, 2, "span", [
                    ["id", "b"]
                ], null, null, null, null, null)), (e()(), co(1, 0, null, null, 1, "span", [], null, null, null, null, null)), (e()(), vo(-1, null, ["~/welcome \xa0\xa0"]))], null, null)
            }

            function di(e) {
                return Eo(0, [(e()(), co(0, 0, null, null, 3, "span", [
                    ["class", "list-group-item list-3"]
                ], null, null, null, null, null)), (e()(), vo(-1, null, ["balance-transfer-java\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0"])), (e()(), co(2, 0, null, null, 1, "a", [
                    ["href", "https://github.com/MindtreeLtd/balance-transfer-java"],
                    ["target", "_blank"]
                ], null, null, null, null, null)), (e()(), co(3, 0, null, null, 0, "i", [
                    ["aria-hidden", "true"],
                    ["class", "fa fa-fw fa-github fa-2x"],
                    ["style", " color: white; border-radius: 10%"]
                ], null, null, null, null, null))], null, null)
            }

            function hi(e) {
                return Eo(0, [(e()(), co(0, 0, null, null, 32, "div", [
                    ["class", "row"]
                ], null, null, null, null, null)), (e()(), co(1, 0, null, null, 31, "div", [], null, null, null, null, null)), (e()(), co(2, 0, null, null, 0, "div", [
                    ["class", " col-md-1 col-lg-1"]
                ], null, null, null, null, null)), (e()(), co(3, 0, null, null, 29, "div", [
                    ["class", "col-xs-10 col-sm-10 col-md-4 col-lg-4"]
                ], null, null, null, null, null)), (e()(), co(4, 0, null, null, 28, "div", [
                    ["class", "list-group"],
                    ["style", "border: solid black 0.7px; border-radius: 0px; width:350px;"]
                ], null, null, null, null, null)), (e()(), co(5, 0, null, null, 1, "span", [
                    ["class", "list-group-item "],
                    ["style", "background-color: #d08770; margin: 20px; border-radius:0px;font-family: courier, monospace; font-weight: bolder;color:black;"]
                ], null, null, null, null, null)), (e()(), vo(-1, null, [" A few of my Open Source projects "])), (e()(), co(7, 0, null, null, 9, "span", [
                    ["class", "list-group-item  list-3"]
                ], null, null, null, null, null)), (e()(), vo(-1, null, ["Save Notes \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0"])), (e()(), co(9, 0, null, null, 1, "a", [
                    ["href", "https://github.com/Swatikp/save-notes-chrome-extension"],
                    ["target", "_blank"]
                ], null, null, null, null, null)), (e()(), co(10, 0, null, null, 0, "i", [
                    ["aria-hidden", "true"],
                    ["class", "fa fa-fw fa-github fa-2x"],
                    ["style", "color: white; border-radius: 10%"]
                ], null, null, null, null, null)), (e()(), vo(-1, null, ["\xa0\xa0"])), (e()(), co(12, 0, null, null, 1, "a", [
                    ["href", "https://medium.com/@SwatiKp/my-first-chrome-extension-journey-towards-my-smart-goal-a30ed1885d73"],
                    ["target", "_blank"]
                ], null, null, null, null, null)), (e()(), co(13, 0, null, null, 0, "i", [
                    ["aria-hidden", "true"],
                    ["class", "fa fa-fw fa-medium fa-2x"],
                    ["style", " color: whitesmoke; border-radius: 10%"]
                ], null, null, null, null, null)), (e()(), vo(-1, null, ["\xa0\xa0"])), (e()(), co(15, 0, null, null, 1, "a", [
                    ["href", "https://drive.google.com/file/d/1-BJIwFLqS5S6ViJnOdwoAqBgRtwfB3Yv/view"],
                    ["target", "_blank"]
                ], null, null, null, null, null)), (e()(), co(16, 0, null, null, 0, "i", [
                    ["aria-hidden", "true"],
                    ["class", "fa fa-fw fa-video-camera fa-lg"],
                    ["style", " color: whitesmoke; border-radius: 10%"]
                ], null, null, null, null, null)), (e()(), co(17, 0, null, null, 9, "span", [
                    ["class", "list-group-item list-3"]
                ], null, null, null, null, null)), (e()(), vo(-1, null, ["Oh My Link\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0"])), (e()(), co(19, 0, null, null, 1, "a", [
                    ["href", "https://github.com/Swatikp/oh-my-link"],
                    ["target", "_blank"]
                ], null, null, null, null, null)), (e()(), co(20, 0, null, null, 0, "i", [
                    ["aria-hidden", "true"],
                    ["class", "fa fa-fw fa-github fa-2x"],
                    ["style", "color: white; border-radius: 10%"]
                ], null, null, null, null, null)), (e()(), vo(-1, null, ["\xa0\xa0"])), (e()(), co(22, 0, null, null, 1, "a", [
                    ["href", "https://chrome.google.com/webstore/detail/oh-my-link/fjhnndnenmfmfcaocdbpdejodhokmllb"],
                    ["target", "_blank"]
                ], null, null, null, null, null)), (e()(), co(23, 0, null, null, 0, "i", [
                    ["aria-hidden", "true"],
                    ["class", "fa fa-fw fa-chrome fa-2x"],
                    ["style", " color: whitesmoke; border-radius: 10%"]
                ], null, null, null, null, null)), (e()(), vo(-1, null, ["\xa0\xa0"])), (e()(), co(25, 0, null, null, 1, "a", [
                    ["href", "https://drive.google.com/file/d/1-AwLHhs7yBENS6J1reQvMAU-NPkO_B66/view"],
                    ["target", "_blank"]
                ], null, null, null, null, null)), (e()(), co(26, 0, null, null, 0, "i", [
                    ["aria-hidden", "true"],
                    ["class", "fa fa-fw fa-video-camera fa-lg"],
                    ["style", " color: whitesmoke; border-radius: 10%"]
                ], null, null, null, null, null)), (e()(), co(27, 0, null, null, 3, "span", [
                    ["class", "list-group-item list-3"]
                ], null, null, null, null, null)), (e()(), vo(-1, null, ["Auto Hyperledger Network Setup\xa0\xa0\xa0"])), (e()(), co(29, 0, null, null, 1, "a", [
                    ["href", "https://github.com/MindtreeLtd/dynamic-hyperledger-network-creation"],
                    ["target", "_blank"]
                ], null, null, null, null, null)), (e()(), co(30, 0, null, null, 0, "i", [
                    ["aria-hidden", "true"],
                    ["class", "fa fa-fw fa-github fa-2x"],
                    ["style", " color: white; border-radius: 10%"]
                ], null, null, null, null, null)), (e()(), ao(16777216, null, null, 1, null, di)), zl(32, 16384, null, 0, zs, [gn, fn], {
                    ngIf: [0, "ngIf"]
                }, null)], function(e, t) {
                    e(t, 32, 0, t.component.scrollWin())
                }, null)
            }

            function pi(e) {
                return Eo(0, [(e()(), co(0, 0, null, null, 2, "span", [
                    ["id", "a"]
                ], null, null, null, null, null)), (e()(), co(1, 0, null, null, 1, "span", [], null, null, null, null, null)), (e()(), vo(-1, null, ["Mayur@Bavisiya\xa0"]))], null, null)
            }

            function fi(e) {
                return Eo(0, [(e()(), co(0, 0, null, null, 2, "span", [
                    ["id", "b"]
                ], null, null, null, null, null)), (e()(), co(1, 0, null, null, 1, "span", [], null, null, null, null, null)), (e()(), vo(-1, null, ["~/welcome \xa0\xa0"]))], null, null)
            }

            function mi(e) {
                return Eo(0, [(e()(), co(0, 0, null, null, 2, "div", [
                    ["class", "col-xs-12 col-sm-12 col-md-12 col-lg-12"],
                    ["style", "overflow: hidden;"]
                ], null, null, null, null, null)), (e()(), co(1, 0, null, null, 1, "pre", [
                    ["style", "overflow: hidden; background-color: #293846; color: white; border: none"]
                ], null, null, null, null, null)), (e()(), vo(-1, null, ["  ___________          ___________                                     \n '._==_==_=_.'        '._==_==_=_.'        \n .-\\:      /-.        .-\\:      /-.        \n| (|:.     |) |      | (|:.     |) |       \n '-|:.     |-'        '-|:.     |-'        \n   \\::.    /            \\::.    /          \n    '::. .'              '::. .'           \n      ) (                  ) (             \n    _.' '._              _.' '._           \n   `\"\"\"\"\"\"\"`            `\"\"\"\"\"\"\"`"]))], null, null)
            }

            function gi(e) {
                return Eo(0, [(e()(), co(0, 0, null, null, 0, "div", [
                    ["class", "col-xs-12 col-sm-12 col-md-12 col-lg-12"]
                ], null, null, null, null, null))], null, null)
            }

            function yi(e) {
                return Eo(0, [(e()(), co(0, 0, null, null, 2, "span", [
                    ["id", "a"]
                ], null, null, null, null, null)), (e()(), co(1, 0, null, null, 1, "span", [], null, null, null, null, null)), (e()(), vo(-1, null, ["Mayur@Bavisiya\xa0"]))], null, null)
            }

            function _i(e) {
                return Eo(0, [(e()(), co(0, 0, null, null, 2, "span", [
                    ["id", "b"]
                ], null, null, null, null, null)), (e()(), co(1, 0, null, null, 1, "span", [], null, null, null, null, null)), (e()(), vo(-1, null, ["~/welcome \xa0\xa0"]))], null, null)
            }

            function wi(e) {
                return Eo(0, [(e()(), co(0, 0, null, null, 0, "div", [
                    ["class", " col-md-1 col-lg-1"]
                ], null, null, null, null, null))], null, null)
            }

            function bi(e) {
                return Eo(0, [(e()(), co(0, 0, null, null, 9, "div", [
                    ["class", "col-xs-10 col-sm-10 col-md-4 col-lg-4"]
                ], null, null, null, null, null)), (e()(), co(1, 0, null, null, 8, "div", [
                    ["class", "list-group"],
                    ["style", "border: solid black 0.7px; border-radius: 0px;height: 212px;"]
                ], null, null, null, null, null)), (e()(), co(2, 0, null, null, 1, "span", [
                    ["class", "list-group-item "],
                    ["style", "background-color: #A3BE8C; margin: 10px; border-radius:0px;font-family: courier, monospace; font-weight: bolder;color:black;"]
                ], null, null, null, null, null)), (e()(), vo(-1, null, [" Social "])), (e()(), co(4, 0, null, null, 2, "a", [
                    ["class", "list-group-item  list-5"],
                    ["href", "https://www.facebook.com/profile.php?id=100010924271009"],
                    ["target", "_blank"]
                ], null, null, null, null, null)), (e()(), co(5, 0, null, null, 0, "i", [
                    ["aria-hidden", "true"],
                    ["class", "fa fa-fw fa-facebook fa-2x"],
                    ["style", "color: white; border-radius: 10%"]
                ], null, null, null, null, null)), (e()(), vo(-1, null, [" Facebook"])), (e()(), co(7, 0, null, null, 2, "a", [
                    ["class", "list-group-item  list-5"],
                    ["href", "https://www.instagram.com/mayur.bavisiya/"],
                    ["target", "_blank"]
                ], null, null, null, null, null)), (e()(), co(8, 0, null, null, 0, "i", [
                    ["aria-hidden", "true"],
                    ["class", "fa fa-fw fa-instagram fa-2x"],
                    ["style", "color: white; border-radius: 10%"]
                ], null, null, null, null, null)), (e()(), vo(-1, null, [" Instagram"]))], null, null)
            }

            function vi(e) {
                return Eo(0, [(e()(), co(0, 0, null, null, 0, "div", [
                    ["class", " col-md-2 col-lg-2"]
                ], null, null, null, null, null))], null, null)
            }

            function Ci(e) {
                return Eo(0, [(e()(), co(0, 0, null, null, 20, "div", [], null, null, null, null, null)), (e()(), co(1, 0, null, null, 0, "div", [
                    ["class", " col-md-1 col-lg-1"]
                ], null, null, null, null, null)), (e()(), co(2, 0, null, null, 12, "div", [
                    ["class", "col-xs-10 col-sm-4 col-md-4 col-lg-4"]
                ], null, null, null, null, null)), (e()(), co(3, 0, null, null, 11, "div", [
                    ["class", "list-group"],
                    ["style", "border: solid black 0.7px; border-radius: 0px;"]
                ], null, null, null, null, null)), (e()(), co(4, 0, null, null, 1, "span", [
                    ["class", "list-group-item "],
                    ["style", "background-color: #A3BE8C; margin: 10px; border-radius:0px;font-family: courier, monospace; font-weight: bolder;color:black;"]
                ], null, null, null, null, null)), (e()(), vo(-1, null, [" Professional "])), (e()(), co(6, 0, null, null, 2, "a", [
                    ["class", "list-group-item  list-4"],
                    ["href", "https://github.com/Swatikp"],
                    ["target", "_blank"]
                ], null, null, null, null, null)), (e()(), co(7, 0, null, null, 0, "i", [
                    ["aria-hidden", "true"],
                    ["class", "fa fa-fw fa-github fa-2x"],
                    ["style", "color: white; border-radius: 10%"]
                ], null, null, null, null, null)), (e()(), vo(-1, null, [" Github"])), (e()(), co(9, 0, null, null, 2, "a", [
                    ["class", "list-group-item  list-4"],
                    ["href", "https://medium.com/@SwatiKp"],
                    ["target", "_blank"]
                ], null, null, null, null, null)), (e()(), co(10, 0, null, null, 0, "i", [
                    ["aria-hidden", "true"],
                    ["class", "fa fa-fw fa-medium fa-2x"],
                    ["style", "color: white; border-radius: 10%"]
                ], null, null, null, null, null)), (e()(), vo(-1, null, [" Medium"])), (e()(), co(12, 0, null, null, 2, "a", [
                    ["class", "list-group-item  list-4"],
                    ["href", "https://www.facebook.com/mayur.bavisiya"],
                    ["target", "_blank"]
                ], null, null, null, null, null)), (e()(), co(13, 0, null, null, 0, "i", [
                    ["aria-hidden", "true"],
                    ["class", "fa fa-fw fa-linkedin fa-2x"],
                    ["style", "color: white; border-radius: 10%"]
                ], null, null, null, null, null)), (e()(), vo(-1, null, [" Linkedin"])), (e()(), ao(16777216, null, null, 1, null, wi)), zl(16, 16384, null, 0, zs, [gn, fn], {
                    ngIf: [0, "ngIf"]
                }, null), (e()(), ao(16777216, null, null, 1, null, bi)), zl(18, 16384, null, 0, zs, [gn, fn], {
                    ngIf: [0, "ngIf"]
                }, null), (e()(), ao(16777216, null, null, 1, null, vi)), zl(20, 16384, null, 0, zs, [gn, fn], {
                    ngIf: [0, "ngIf"]
                }, null)], function(e, t) {
                    var n = t.component;
                    e(t, 16, 0, n.start24 && n.scrollWin()), e(t, 18, 0, n.start24 && n.scrollWin()), e(t, 20, 0, n.start24 && n.scrollWin())
                }, null)
            }

            function xi(e) {
                return Eo(0, [(e()(), co(0, 0, null, null, 2, "span", [
                    ["id", "a"]
                ], null, null, null, null, null)), (e()(), co(1, 0, null, null, 1, "span", [], null, null, null, null, null)), (e()(), vo(-1, null, ["Mayur@Bavisiya\xa0"]))], null, null)
            }

            function Ei(e) {
                return Eo(0, [(e()(), co(0, 0, null, null, 2, "span", [
                    ["id", "b"]
                ], null, null, null, null, null)), (e()(), co(1, 0, null, null, 1, "span", [], null, null, null, null, null)), (e()(), vo(-1, null, ["~/welcome \xa0\xa0"]))], null, null)
            }

            function ki(e) {
                return Eo(0, [(e()(), co(0, 0, null, null, 60, "div", [
                    ["class", "row"]
                ], null, null, null, null, null)), (e()(), ao(16777216, null, null, 1, null, mi)), zl(2, 16384, null, 0, zs, [gn, fn], {
                    ngIf: [0, "ngIf"]
                }, null), (e()(), ao(16777216, null, null, 1, null, gi)), zl(4, 16384, null, 0, zs, [gn, fn], {
                    ngIf: [0, "ngIf"]
                }, null), (e()(), co(5, 0, null, null, 3, "span", [
                    ["id", "console"],
                    ["typingAnimation", ""]
                ], null, [
                    [null, "complete"]
                ], function(e, t, n) {
                    var l = !0,
                        r = e.component;
                    return "complete" === t && (l = !1 !== (r.onTypingAnimationComplete19() && r.scrollWin()) && l), l
                }, null, null)), zl(6, 4800512, null, 0, qs, [Bt], {
                    typeSpeed: [0, "typeSpeed"],
                    startDelay: [1, "startDelay"],
                    condition: [2, "condition"],
                    hideCursorOnComplete: [3, "hideCursorOnComplete"]
                }, {
                    complete: "complete"
                }), (e()(), co(7, 0, null, null, 1, "span", [], null, null, null, null, null)), (e()(), vo(-1, null, ["\u2022 Recognized by the CEO of Mindtree, Mr. Rostow Ravanan as Star performer of the project (2019)."])), (e()(), co(9, 0, null, null, 0, "div", [
                    ["class", "clear"]
                ], null, null, null, null, null)), (e()(), co(10, 0, null, null, 3, "span", [
                    ["id", "console"],
                    ["typingAnimation", ""]
                ], null, [
                    [null, "complete"]
                ], function(e, t, n) {
                    var l = !0,
                        r = e.component;
                    return "complete" === t && (l = !1 !== (r.onTypingAnimationComplete19After() && r.scrollWin()) && l), l
                }, null, null)), zl(11, 4800512, null, 0, qs, [Bt], {
                    typeSpeed: [0, "typeSpeed"],
                    startDelay: [1, "startDelay"],
                    condition: [2, "condition"],
                    hideCursorOnComplete: [3, "hideCursorOnComplete"]
                }, {
                    complete: "complete"
                }), (e()(), co(12, 0, null, null, 1, "span", [], null, null, null, null, null)), (e()(), vo(-1, null, ["\u2022 Winner of Mindtree's Pillar award (2019)."])), (e()(), co(14, 0, null, null, 0, "div", [
                    ["class", "clear"]
                ], null, null, null, null, null)), (e()(), co(15, 0, null, null, 3, "span", [
                    ["id", "console"],
                    ["typingAnimation", ""]
                ], null, [
                    [null, "complete"]
                ], function(e, t, n) {
                    var l = !0,
                        r = e.component;
                    return "complete" === t && (l = !1 !== (r.onTypingAnimationComplete20() && r.scrollWin()) && l), l
                }, null, null)), zl(16, 4800512, null, 0, qs, [Bt], {
                    typeSpeed: [0, "typeSpeed"],
                    startDelay: [1, "startDelay"],
                    condition: [2, "condition"],
                    hideCursorOnComplete: [3, "hideCursorOnComplete"]
                }, {
                    complete: "complete"
                }), (e()(), co(17, 0, null, null, 1, "span", [], null, null, null, null, null)), (e()(), vo(-1, null, ["\u2022 4th Prize winner in Blockchain Hackthon organized by Karnataka Government (2018)."])), (e()(), co(19, 0, null, null, 0, "div", [
                    ["class", "clear"]
                ], null, null, null, null, null)), (e()(), co(20, 0, null, null, 3, "span", [
                    ["id", "console"],
                    ["typingAnimation", ""]
                ], null, [
                    [null, "complete"]
                ], function(e, t, n) {
                    var l = !0,
                        r = e.component;
                    return "complete" === t && (l = !1 !== (r.onTypingAnimationComplete21() && r.scrollWin()) && l), l
                }, null, null)), zl(21, 4800512, null, 0, qs, [Bt], {
                    typeSpeed: [0, "typeSpeed"],
                    startDelay: [1, "startDelay"],
                    condition: [2, "condition"],
                    hideCursorOnComplete: [3, "hideCursorOnComplete"]
                }, {
                    complete: "complete"
                }), (e()(), co(22, 0, null, null, 1, "span", [], null, null, null, null, null)), (e()(), vo(-1, null, ["\u2022 Winner of Mindtree's Outstanding performer Award (2019, 2018)."])), (e()(), co(24, 0, null, null, 0, "div", [
                    ["class", "clear"]
                ], null, null, null, null, null)), (e()(), co(25, 0, null, null, 3, "span", [
                    ["id", "console"],
                    ["typingAnimation", ""]
                ], null, [
                    [null, "complete"]
                ], function(e, t, n) {
                    var l = !0,
                        r = e.component;
                    return "complete" === t && (l = !1 !== (r.onTypingAnimationComplete21After() && r.scrollWin()) && l), l
                }, null, null)), zl(26, 4800512, null, 0, qs, [Bt], {
                    typeSpeed: [0, "typeSpeed"],
                    startDelay: [1, "startDelay"],
                    condition: [2, "condition"],
                    hideCursorOnComplete: [3, "hideCursorOnComplete"]
                }, {
                    complete: "complete"
                }), (e()(), co(27, 0, null, null, 1, "span", [], null, null, null, null, null)), (e()(), vo(-1, null, ["\u2022 Runner up in 2 of Mindtree's internal Hackathons."])), (e()(), co(29, 0, null, null, 0, "div", [
                    ["class", "clear"]
                ], null, null, null, null, null)), (e()(), co(30, 0, null, null, 0, "br", [], null, null, null, null, null)), (e()(), co(31, 0, null, null, 0, "div", [
                    ["class", "clear"]
                ], null, null, null, null, null)), (e()(), ao(16777216, null, null, 1, null, yi)), zl(33, 16384, null, 0, zs, [gn, fn], {
                    ngIf: [0, "ngIf"]
                }, null), (e()(), ao(16777216, null, null, 1, null, _i)), zl(35, 16384, null, 0, zs, [gn, fn], {
                    ngIf: [0, "ngIf"]
                }, null), (e()(), co(36, 0, null, null, 0, "div", [
                    ["class", "clear"]
                ], null, null, null, null, null)), (e()(), co(37, 0, null, null, 3, "span", [
                    ["id", "console"],
                    ["typingAnimation", ""]
                ], null, [
                    [null, "complete"]
                ], function(e, t, n) {
                    var l = !0,
                        r = e.component;
                    return "complete" === t && (l = !1 !== (r.onTypingAnimationComplete23() && r.scrollWin()) && l), l
                }, null, null)), zl(38, 4800512, null, 0, qs, [Bt], {
                    typeSpeed: [0, "typeSpeed"],
                    startDelay: [1, "startDelay"],
                    condition: [2, "condition"],
                    hideCursorOnComplete: [3, "hideCursorOnComplete"]
                }, {
                    complete: "complete"
                }), (e()(), co(39, 0, null, null, 1, "span", [], null, null, null, null, null)), (e()(), vo(-1, null, ["$ skp-md-viewer contact-me.md"])), (e()(), co(41, 0, null, null, 0, "br", [], null, null, null, null, null)), (e()(), co(42, 0, null, null, 0, "br", [], null, null, null, null, null)), (e()(), ao(16777216, null, null, 1, null, Ci)), zl(44, 16384, null, 0, zs, [gn, fn], {
                    ngIf: [0, "ngIf"]
                }, null), (e()(), co(45, 0, null, null, 0, "div", [
                    ["class", "clear"]
                ], null, null, null, null, null)), (e()(), co(46, 0, null, null, 0, "br", [], null, null, null, null, null)), (e()(), ao(16777216, null, null, 1, null, xi)), zl(48, 16384, null, 0, zs, [gn, fn], {
                    ngIf: [0, "ngIf"]
                }, null), (e()(), ao(16777216, null, null, 1, null, Ei)), zl(50, 16384, null, 0, zs, [gn, fn], {
                    ngIf: [0, "ngIf"]
                }, null), (e()(), co(51, 0, null, null, 0, "div", [
                    ["class", "clear"]
                ], null, null, null, null, null)), (e()(), co(52, 0, null, null, 3, "span", [
                    ["id", "console"],
                    ["typingAnimation", ""]
                ], null, [
                    [null, "complete"]
                ], function(e, t, n) {
                    var l = !0;
                    return "complete" === t && (l = !1 !== e.component.onTypingAnimationComplete26() && l), l
                }, null, null)), zl(53, 4800512, null, 0, qs, [Bt], {
                    typeSpeed: [0, "typeSpeed"],
                    startDelay: [1, "startDelay"],
                    condition: [2, "condition"],
                    hideCursorOnComplete: [3, "hideCursorOnComplete"]
                }, {
                    complete: "complete"
                }), (e()(), co(54, 0, null, null, 1, "span", [], null, null, null, null, null)), (e()(), vo(-1, null, ["$ exit"])), (e()(), co(56, 0, null, null, 0, "div", [
                    ["class", "clear"]
                ], null, null, null, null, null)), (e()(), co(57, 0, null, null, 3, "span", [
                    ["id", "console"],
                    ["style", "color:#293846"],
                    ["typingAnimation", ""]
                ], null, null, null, null, null)), zl(58, 4800512, null, 0, qs, [Bt], {
                    typeSpeed: [0, "typeSpeed"],
                    startDelay: [1, "startDelay"],
                    condition: [2, "condition"],
                    hideCursorOnComplete: [3, "hideCursorOnComplete"]
                }, null), (e()(), co(59, 0, null, null, 1, "span", [], null, null, null, null, null)), (e()(), vo(-1, null, ["end"]))], function(e, t) {
                    var n = t.component;
                    e(t, 2, 0, n.start18 && n.onTypingAnimationComplete18()), e(t, 4, 0, n.start19 && n.scrollWin()), e(t, 6, 0, 10, 500, n.start19, !0), e(t, 11, 0, 10, 1500, n.start19After, !0), e(t, 16, 0, 10, 1500, n.start20, !0), e(t, 21, 0, 10, 1500, n.start21, !0), e(t, 26, 0, 10, 1500, n.start21After, !0), e(t, 33, 0, n.start22 && n.scrollWin()), e(t, 35, 0, n.start22 && n.onTypingAnimationComplete22() && n.scrollWin()), e(t, 38, 0, 50, 500, n.start23, !0), e(t, 44, 0, n.start24 && n.onTypingAnimationComplete24() && n.scrollWin()), e(t, 48, 0, n.start25 && n.scrollWin()), e(t, 50, 0, n.start25 && n.onTypingAnimationComplete25() && n.scrollWin()), e(t, 53, 0, 15, 1500, n.start26, !0), e(t, 58, 0, 10, 500, n.start27 && n.onTypingAnimationComplete27(), !0)
                }, null)
            }

            function Ti(e) {
                return Eo(0, [(e()(), co(0, 0, [
                    ["scrollMe", 1]
                ], null, 120, "div", [], null, null, null, null, null)), (e()(), co(1, 0, null, null, 119, "div", [
                    ["class", "container-fluid"]
                ], null, null, null, null, null)), (e()(), co(2, 0, null, null, 118, "div", [
                    ["class", "row"]
                ], null, null, null, null, null)), (e()(), co(3, 0, null, null, 0, "div", [
                    ["class", "col-xs-6 col-sm-6 col-md-10 col-lg-9"]
                ], null, null, null, null, null)), (e()(), co(4, 0, null, null, 13, "div", [
                    ["class", "col-xs-6 col-sm-6 col-md-2 col-lg-3"]
                ], null, null, null, null, null)), (e()(), co(5, 0, null, null, 12, "div", [
                    ["class", "row"]
                ], null, null, null, null, null)), (e()(), co(6, 0, null, null, 0, "div", [
                    ["class", "col-md-1 col-lg-4"]
                ], null, null, null, null, null)), (e()(), co(7, 0, null, null, 2, "div", [
                    ["class", "col-xs-1 col-sm-1 col-md-2 col-lg-1"]
                ], null, null, null, null, null)), (e()(), co(8, 0, null, null, 1, "a", [
                    ["class", " list-4"],
                    ["href", "https://github.com/mayurbavisiya"],
                    ["target", "_blank"]
                ], null, null, null, null, null)), (e()(), co(9, 0, null, null, 0, "i", [
                    ["aria-hidden", "true"],
                    ["class", "fa fa-fw fa-github fa-2x"],
                    ["style", "color: rgba(255,255,255,.5);; border-radius: 10%"]
                ], null, null, null, null, null)), (e()(), co(10, 0, null, null, 0, "div", [
                    ["class", "col-xs-1 col-sm-1 col-md-1  col-lg-1"]
                ], null, null, null, null, null)), (e()(), co(11, 0, null, null, 2, "div", [
                    ["class", " col-xs-1 col-sm-1 col-md-2 col-lg-1"]
                ], null, null, null, null, null)), (e()(), co(12, 0, null, null, 1, "a", [
                    ["class", " list-4"],
                    ["href", "https://medium.com/@mayurbavisiya"],
                    ["target", "_blank"]
                ], null, null, null, null, null)), (e()(), co(13, 0, null, null, 0, "i", [
                    ["aria-hidden", "true"],
                    ["class", "fa fa-fw fa-medium fa-2x"],
                    ["style", "color: rgba(255,255,255,.5);; border-radius: 10%"]
                ], null, null, null, null, null)), (e()(), co(14, 0, null, null, 0, "div", [
                    ["class", "col-xs-2 col-sm-2 col-md-2 col-lg-1"]
                ], null, null, null, null, null)), (e()(), co(15, 0, null, null, 2, "div", [
                    ["class", " col-xs-2 col-sm-2 col-md-2 col-lg-1 "]
                ], null, null, null, null, null)), (e()(), co(16, 0, null, null, 1, "a", [
                    ["class", " list-4"],
                    ["href", "https://www.linkedin.com/in/swati-kp-49a022146/"],
                    ["target", "_blank"]
                ], null, null, null, null, null)), (e()(), co(17, 0, null, null, 0, "i", [
                    ["aria-hidden", "true"],
                    ["class", "fa fa-fw fa-linkedin fa-2x"],
                    ["style", "color: rgba(255,255,255,.5);; border-radius: 10%"]
                ], null, null, null, null, null)), (e()(), co(18, 0, null, null, 0, "div", [
                    ["class", "col-xs-1 col-sm-1 col-md-2 col-lg-2"]
                ], null, null, null, null, null)), (e()(), co(19, 0, null, null, 101, "div", [
                    ["class", "col-xs-10 col-sm-10 col-md-8 col-lg-8"]
                ], null, null, null, null, null)), (e()(), co(20, 0, null, null, 2, "span", [
                    ["id", "a"]
                ], null, null, null, null, null)), (e()(), co(21, 0, null, null, 1, "span", [], null, null, null, null, null)), (e()(), vo(-1, null, ["Mayur@Bavisiya\xa0"])), (e()(), ao(16777216, null, null, 1, null, Js)), zl(24, 16384, null, 0, zs, [gn, fn], {
                    ngIf: [0, "ngIf"]
                }, null), (e()(), co(25, 0, null, null, 0, "div", [
                    ["class", "clear"]
                ], null, null, null, null, null)), (e()(), co(26, 0, null, null, 3, "span", [
                    ["id", "console"],
                    ["typingAnimation", ""]
                ], null, [
                    [null, "complete"]
                ], function(e, t, n) {
                    var l = !0;
                    return "complete" === t && (l = !1 !== e.component.onTypingAnimationComplete2() && l), l
                }, null, null)), zl(27, 4800512, null, 0, qs, [Bt], {
                    typeSpeed: [0, "typeSpeed"],
                    startDelay: [1, "startDelay"],
                    condition: [2, "condition"],
                    hideCursorOnComplete: [3, "hideCursorOnComplete"]
                }, {
                    complete: "complete"
                }), (e()(), co(28, 0, null, null, 1, "span", [], null, null, null, null, null)), (e()(), vo(-1, null, ["$ ls"])), (e()(), co(30, 0, null, null, 0, "div", [
                    ["class", "clear"]
                ], null, null, null, null, null)), (e()(), ao(16777216, null, null, 1, null, Ys)), zl(32, 16384, null, 0, zs, [gn, fn], {
                    ngIf: [0, "ngIf"]
                }, null), (e()(), co(33, 0, null, null, 0, "div", [
                    ["class", "clear"]
                ], null, null, null, null, null)), (e()(), co(34, 0, null, null, 0, "br", [], null, null, null, null, null)), (e()(), ao(16777216, null, null, 1, null, Xs)), zl(36, 16384, null, 0, zs, [gn, fn], {
                    ngIf: [0, "ngIf"]
                }, null), (e()(), ao(16777216, null, null, 1, null, ei)), zl(38, 16384, null, 0, zs, [gn, fn], {
                    ngIf: [0, "ngIf"]
                }, null), (e()(), co(39, 0, null, null, 0, "div", [
                    ["class", "clear"]
                ], null, null, null, null, null)), (e()(), co(40, 0, null, null, 3, "span", [
                    ["id", "console"],
                    ["typingAnimation", ""]
                ], null, [
                    [null, "complete"]
                ], function(e, t, n) {
                    var l = !0;
                    return "complete" === t && (l = !1 !== e.component.onTypingAnimationComplete5() && l), l
                }, null, null)), zl(41, 4800512, null, 0, qs, [Bt], {
                    typeSpeed: [0, "typeSpeed"],
                    startDelay: [1, "startDelay"],
                    condition: [2, "condition"],
                    hideCursorOnComplete: [3, "hideCursorOnComplete"]
                }, {
                    complete: "complete"
                }), (e()(), co(42, 0, null, null, 1, "span", [], null, null, null, null, null)), (e()(), vo(-1, null, ["$ cat about-me.txt"])), (e()(), co(44, 0, null, null, 0, "div", [
                    ["class", "clear"]
                ], null, null, null, null, null)), (e()(), co(45, 0, null, null, 3, "span", [
                    ["id", "console"],
                    ["typingAnimation", ""]
                ], null, [
                    [null, "complete"]
                ], function(e, t, n) {
                    var l = !0;
                    return "complete" === t && (l = !1 !== e.component.onTypingAnimationCompletemiddle() && l), l
                }, null, null)), zl(46, 4800512, null, 0, qs, [Bt], {
                    typeSpeed: [0, "typeSpeed"],
                    startDelay: [1, "startDelay"],
                    condition: [2, "condition"],
                    hideCursorOnComplete: [3, "hideCursorOnComplete"]
                }, {
                    complete: "complete"
                }), (e()(), co(47, 0, null, null, 1, "span", [], null, null, null, null, null)), (e()(), vo(-1, null, [" Hi I am Mayur Bavisiya. "])), (e()(), co(49, 0, null, null, 3, "span", [
                    ["id", "console"],
                    ["typingAnimation", ""]
                ], null, [
                    [null, "complete"]
                ], function(e, t, n) {
                    var l = !0;
                    return "complete" === t && (l = !1 !== e.component.onTypingAnimationCompletemiddle2() && l), l
                }, null, null)), zl(50, 4800512, null, 0, qs, [Bt], {
                    typeSpeed: [0, "typeSpeed"],
                    startDelay: [1, "startDelay"],
                    condition: [2, "condition"],
                    hideCursorOnComplete: [3, "hideCursorOnComplete"]
                }, {
                    complete: "complete"
                }), (e()(), co(51, 0, null, null, 1, "span", [], null, null, null, null, null)), (e()(), vo(-1, null, ["\xa0 I am an Energetic Full Stack Engineer having 2.7+ years of experience in building robust code for next generation applications with a can-do attitude. "])), (e()(), co(53, 0, null, null, 0, "div", [
                    ["class", "clear"]
                ], null, null, null, null, null)), (e()(), co(54, 0, null, null, 3, "span", [
                    ["id", "console"],
                    ["typingAnimation", ""]
                ], null, [
                    [null, "complete"]
                ], function(e, t, n) {
                    var l = !0;
                    return "complete" === t && (l = !1 !== e.component.onTypingAnimationCompleteMiddle2() && l), l
                }, null, null)), zl(55, 4800512, null, 0, qs, [Bt], {
                    typeSpeed: [0, "typeSpeed"],
                    startDelay: [1, "startDelay"],
                    condition: [2, "condition"],
                    hideCursorOnComplete: [3, "hideCursorOnComplete"]
                }, {
                    complete: "complete"
                }), (e()(), co(56, 0, null, null, 1, "span", [], null, null, null, null, null)), (e()(), vo(-1, null, ["I enjoy learning new things and can assimilate new ideas quickly. "])), (e()(), co(58, 0, null, null, 0, "div", [
                    ["class", "clear"]
                ], null, null, null, null, null)), (e()(), co(59, 0, null, null, 3, "span", [
                    ["id", "console"],
                    ["typingAnimation", ""]
                ], null, [
                    [null, "complete"]
                ], function(e, t, n) {
                    var l = !0;
                    return "complete" === t && (l = !1 !== e.component.onTypingAnimationComplete6() && l), l
                }, null, null)), zl(60, 4800512, null, 0, qs, [Bt], {
                    typeSpeed: [0, "typeSpeed"],
                    startDelay: [1, "startDelay"],
                    condition: [2, "condition"],
                    hideCursorOnComplete: [3, "hideCursorOnComplete"]
                }, {
                    complete: "complete"
                }), (e()(), co(61, 0, null, null, 1, "span", [], null, null, null, null, null)), (e()(), vo(-1, null, ["I am a tech enthusiast, open source supporter-cum-contributor and a strong believer of solving any problem in hand with innovation. "])), (e()(), co(63, 0, null, null, 0, "div", [
                    ["class", "clear"]
                ], null, null, null, null, null)), (e()(), co(64, 0, null, null, 0, "br", [], null, null, null, null, null)), (e()(), ao(16777216, null, null, 1, null, ti)), zl(66, 16384, null, 0, zs, [gn, fn], {
                    ngIf: [0, "ngIf"]
                }, null), (e()(), ao(16777216, null, null, 1, null, ni)), zl(68, 16384, null, 0, zs, [gn, fn], {
                    ngIf: [0, "ngIf"]
                }, null), (e()(), co(69, 0, null, null, 0, "div", [
                    ["class", "clear"]
                ], null, null, null, null, null)), (e()(), co(70, 0, null, null, 3, "span", [
                    ["id", "console"],
                    ["typingAnimation", ""]
                ], null, [
                    [null, "complete"]
                ], function(e, t, n) {
                    var l = !0;
                    return "complete" === t && (l = !1 !== e.component.onTypingAnimationComplete8() && l), l
                }, null, null)), zl(71, 4800512, null, 0, qs, [Bt], {
                    typeSpeed: [0, "typeSpeed"],
                    startDelay: [1, "startDelay"],
                    condition: [2, "condition"],
                    hideCursorOnComplete: [3, "hideCursorOnComplete"]
                }, {
                    complete: "complete"
                }), (e()(), co(72, 0, null, null, 1, "span", [], null, null, null, null, null)), (e()(), vo(-1, null, ["$ du -sh skills.md"])), (e()(), co(74, 0, null, null, 0, "div", [
                    ["class", "clear"]
                ], null, null, null, null, null)), (e()(), co(75, 0, null, null, 3, "span", [
                    ["class", "blinking"],
                    ["id", "red"],
                    ["typingAnimation", ""]
                ], null, [
                    [null, "complete"]
                ], function(e, t, n) {
                    var l = !0;
                    return "complete" === t && (l = !1 !== e.component.onTypingAnimationComplete9() && l), l
                }, null, null)), zl(76, 4800512, null, 0, qs, [Bt], {
                    typeSpeed: [0, "typeSpeed"],
                    startDelay: [1, "startDelay"],
                    condition: [2, "condition"],
                    hideCursorOnComplete: [3, "hideCursorOnComplete"]
                }, {
                    complete: "complete"
                }), (e()(), co(77, 0, null, null, 1, "span", [], null, null, null, null, null)), (e()(), vo(-1, null, ["300 TB skills.md "])), (e()(), co(79, 0, null, null, 0, "div", [
                    ["class", "clear"]
                ], null, null, null, null, null)), (e()(), co(80, 0, null, null, 0, "br", [], null, null, null, null, null)), (e()(), ao(16777216, null, null, 1, null, li)), zl(82, 16384, null, 0, zs, [gn, fn], {
                    ngIf: [0, "ngIf"]
                }, null), (e()(), ao(16777216, null, null, 1, null, ri)), zl(84, 16384, null, 0, zs, [gn, fn], {
                    ngIf: [0, "ngIf"]
                }, null), (e()(), co(85, 0, null, null, 0, "div", [
                    ["class", "clear"]
                ], null, null, null, null, null)), (e()(), co(86, 0, null, null, 3, "span", [
                    ["id", "console"],
                    ["typingAnimation", ""]
                ], null, [
                    [null, "complete"]
                ], function(e, t, n) {
                    var l = !0;
                    return "complete" === t && (l = !1 !== e.component.onTypingAnimationComplete11() && l), l
                }, null, null)), zl(87, 4800512, null, 0, qs, [Bt], {
                    typeSpeed: [0, "typeSpeed"],
                    startDelay: [1, "startDelay"],
                    condition: [2, "condition"],
                    hideCursorOnComplete: [3, "hideCursorOnComplete"]
                }, {
                    complete: "complete"
                }), (e()(), co(88, 0, null, null, 1, "span", [], null, null, null, null, null)), (e()(), vo(-1, null, ["$ skp-md-viewer skills.md"])), (e()(), co(90, 0, null, null, 0, "div", [
                    ["class", "clear"]
                ], null, null, null, null, null)), (e()(), co(91, 0, null, null, 0, "br", [], null, null, null, null, null)), (e()(), ao(16777216, null, null, 1, null, ui)), zl(93, 16384, null, 0, zs, [gn, fn], {
                    ngIf: [0, "ngIf"]
                }, null), (e()(), co(94, 0, null, null, 0, "div", [
                    ["class", "clear"]
                ], null, null, null, null, null)), (e()(), ao(16777216, null, null, 1, null, ai)), zl(96, 16384, null, 0, zs, [gn, fn], {
                    ngIf: [0, "ngIf"]
                }, null), (e()(), ao(16777216, null, null, 1, null, ci)), zl(98, 16384, null, 0, zs, [gn, fn], {
                    ngIf: [0, "ngIf"]
                }, null), (e()(), co(99, 0, null, null, 0, "div", [
                    ["class", "clear"]
                ], null, null, null, null, null)), (e()(), co(100, 0, null, null, 3, "span", [
                    ["id", "console"],
                    ["typingAnimation", ""]
                ], null, [
                    [null, "complete"]
                ], function(e, t, n) {
                    var l = !0;
                    return "complete" === t && (l = !1 !== e.component.onTypingAnimationComplete14() && l), l
                }, null, null)), zl(101, 4800512, null, 0, qs, [Bt], {
                    typeSpeed: [0, "typeSpeed"],
                    startDelay: [1, "startDelay"],
                    condition: [2, "condition"],
                    hideCursorOnComplete: [3, "hideCursorOnComplete"]
                }, {
                    complete: "complete"
                }), (e()(), co(102, 0, null, null, 1, "span", [], null, null, null, null, null)), (e()(), vo(-1, null, ["$ skp-md-viewer personal-projects.md"])), (e()(), co(104, 0, null, null, 0, "br", [], null, null, null, null, null)), (e()(), co(105, 0, null, null, 0, "br", [], null, null, null, null, null)), (e()(), co(106, 0, null, null, 0, "div", [
                    ["class", "clear"]
                ], null, null, null, null, null)), (e()(), ao(16777216, null, null, 1, null, hi)), zl(108, 16384, null, 0, zs, [gn, fn], {
                    ngIf: [0, "ngIf"]
                }, null), (e()(), co(109, 0, null, null, 0, "div", [
                    ["class", "clear"]
                ], null, null, null, null, null)), (e()(), ao(16777216, null, null, 1, null, pi)), zl(111, 16384, null, 0, zs, [gn, fn], {
                    ngIf: [0, "ngIf"]
                }, null), (e()(), ao(16777216, null, null, 1, null, fi)), zl(113, 16384, null, 0, zs, [gn, fn], {
                    ngIf: [0, "ngIf"]
                }, null), (e()(), co(114, 0, null, null, 0, "div", [
                    ["class", "clear"]
                ], null, null, null, null, null)), (e()(), co(115, 0, null, null, 3, "span", [
                    ["id", "console"],
                    ["typingAnimation", ""]
                ], null, [
                    [null, "complete"]
                ], function(e, t, n) {
                    var l = !0,
                        r = e.component;
                    return "complete" === t && (l = !1 !== (r.onTypingAnimationComplete17() && r.scrollWin()) && l), l
                }, null, null)), zl(116, 4800512, null, 0, qs, [Bt], {
                    typeSpeed: [0, "typeSpeed"],
                    startDelay: [1, "startDelay"],
                    condition: [2, "condition"],
                    hideCursorOnComplete: [3, "hideCursorOnComplete"]
                }, {
                    complete: "complete"
                }), (e()(), co(117, 0, null, null, 1, "span", [], null, null, null, null, null)), (e()(), vo(-1, null, ["$ cat awards-and-recognitions.txt"])), (e()(), ao(16777216, null, null, 1, null, ki)), zl(120, 16384, null, 0, zs, [gn, fn], {
                    ngIf: [0, "ngIf"]
                }, null)], function(e, t) {
                    var n = t.component;
                    e(t, 24, 0, n.onTypingAnimationComplete1() && n.scrollWin()), e(t, 27, 0, 30, 1200, n.start2, !0), e(t, 32, 0, n.start3 && n.onTypingAnimationComplete3() && n.scrollWin()), e(t, 36, 0, n.start4), e(t, 38, 0, n.start4 && n.onTypingAnimationComplete4() && n.scrollWin()), e(t, 41, 0, 30, 800, n.start5, !0), e(t, 46, 0, 15, 800, n.start6, !0), e(t, 50, 0, 15, 1200, n.startmiddle, !0), e(t, 55, 0, 15, 1200, n.startmiddle2, !0), e(t, 60, 0, 15, 1200, n.startmiddle3, !0), e(t, 66, 0, n.start7), e(t, 68, 0, n.start7 && n.onTypingAnimationComplete7() && n.scrollWin()), e(t, 71, 0, 50, 1e3, n.start8, !0), e(t, 76, 0, 0, 1e3, n.start9, !0), e(t, 82, 0, n.start10), e(t, 84, 0, n.start10 && n.onTypingAnimationComplete10() && n.scrollWin()), e(t, 87, 0, 50, 1500, n.start11, !0), e(t, 93, 0, n.start12 && n.onTypingAnimationComplete12() && n.scrollWin()), e(t, 96, 0, n.start13 && n.scrollWin()), e(t, 98, 0, n.start13 && n.onTypingAnimationComplete13() && n.scrollWin()), e(t, 101, 0, 50, 2500, n.start14, !0), e(t, 108, 0, n.start15 && n.onTypingAnimationComplete15()), e(t, 111, 0, n.start16), e(t, 113, 0, n.start16 && n.onTypingAnimationComplete16()), e(t, 116, 0, 50, 500, n.start17, !0), e(t, 120, 0, n.start18 && n.scrollWin())
                }, null)
            }

            function Ii(e) {
                return Eo(0, [(e()(), co(0, 0, null, null, 1, "app-root", [], null, null, null, Ti, Gs)), zl(1, 114688, null, 0, Ms, [], null, null)], function(e, t) {
                    e(t, 1, 0)
                }, null)
            }
            var Si = wl("app-root", Ms, Ii, {}, {}, []);
            let Ai = null;

            function Ni() {
                return Ai
            }
            class Di {
                constructor() {
                    this.resourceLoaderType = null
                }
                get attrToPropMap() {
                    return this._attrToPropMap
                }
                set attrToPropMap(e) {
                    this._attrToPropMap = e
                }
            }
            class Oi extends Di {
                constructor() {
                    super(), this._animationPrefix = null, this._transitionEnd = null;
                    try {
                        const t = this.createElement("div", document);
                        if (null != this.getStyle(t, "animationName")) this._animationPrefix = "";
                        else {
                            const e = ["Webkit", "Moz", "O", "ms"];
                            for (let n = 0; n < e.length; n++)
                                if (null != this.getStyle(t, e[n] + "AnimationName")) {
                                    this._animationPrefix = "-" + e[n].toLowerCase() + "-";
                                    break
                                }
                        }
                        const n = {
                            WebkitTransition: "webkitTransitionEnd",
                            MozTransition: "transitionend",
                            OTransition: "oTransitionEnd otransitionend",
                            transition: "transitionend"
                        };
                        Object.keys(n).forEach(e => {
                            null != this.getStyle(t, e) && (this._transitionEnd = n[e])
                        })
                    } catch (e) {
                        this._animationPrefix = null, this._transitionEnd = null
                    }
                }
                getDistributedNodes(e) {
                    return e.getDistributedNodes()
                }
                resolveAndSetHref(e, t, n) {
                    e.href = null == n ? t : t + "/../" + n
                }
                supportsDOMEvents() {
                    return !0
                }
                supportsNativeShadowDOM() {
                    return "function" == typeof document.body.createShadowRoot
                }
                getAnimationPrefix() {
                    return this._animationPrefix ? this._animationPrefix : ""
                }
                getTransitionEnd() {
                    return this._transitionEnd ? this._transitionEnd : ""
                }
                supportsAnimation() {
                    return null != this._animationPrefix && null != this._transitionEnd
                }
            }
            const Mi = {
                    class: "className",
                    innerHtml: "innerHTML",
                    readonly: "readOnly",
                    tabindex: "tabIndex"
                },
                Ri = 3,
                Pi = {
                    "\b": "Backspace",
                    "\t": "Tab",
                    "\x7f": "Delete",
                    "\x1b": "Escape",
                    Del: "Delete",
                    Esc: "Escape",
                    Left: "ArrowLeft",
                    Right: "ArrowRight",
                    Up: "ArrowUp",
                    Down: "ArrowDown",
                    Menu: "ContextMenu",
                    Scroll: "ScrollLock",
                    Win: "OS"
                },
                Vi = {
                    A: "1",
                    B: "2",
                    C: "3",
                    D: "4",
                    E: "5",
                    F: "6",
                    G: "7",
                    H: "8",
                    I: "9",
                    J: "*",
                    K: "+",
                    M: "-",
                    N: ".",
                    O: "/",
                    "`": "0",
                    "\x90": "NumLock"
                },
                Hi = (() => {
                    if (he.Node) return he.Node.prototype.contains || function(e) {
                        return !!(16 & this.compareDocumentPosition(e))
                    }
                })();
            class ji extends Oi {
                parse(e) {
                    throw new Error("parse not implemented")
                }
                static makeCurrent() {
                    var e;
                    e = new ji, Ai || (Ai = e)
                }
                hasProperty(e, t) {
                    return t in e
                }
                setProperty(e, t, n) {
                    e[t] = n
                }
                getProperty(e, t) {
                    return e[t]
                }
                invoke(e, t, n) {
                    e[t](...n)
                }
                logError(e) {
                    window.console && (console.error ? console.error(e) : console.log(e))
                }
                log(e) {
                    window.console && window.console.log && window.console.log(e)
                }
                logGroup(e) {
                    window.console && window.console.group && window.console.group(e)
                }
                logGroupEnd() {
                    window.console && window.console.groupEnd && window.console.groupEnd()
                }
                get attrToPropMap() {
                    return Mi
                }
                contains(e, t) {
                    return Hi.call(e, t)
                }
                querySelector(e, t) {
                    return e.querySelector(t)
                }
                querySelectorAll(e, t) {
                    return e.querySelectorAll(t)
                }
                on(e, t, n) {
                    e.addEventListener(t, n, !1)
                }
                onAndCancel(e, t, n) {
                    return e.addEventListener(t, n, !1), () => {
                        e.removeEventListener(t, n, !1)
                    }
                }
                dispatchEvent(e, t) {
                    e.dispatchEvent(t)
                }
                createMouseEvent(e) {
                    const t = this.getDefaultDocument().createEvent("MouseEvent");
                    return t.initEvent(e, !0, !0), t
                }
                createEvent(e) {
                    const t = this.getDefaultDocument().createEvent("Event");
                    return t.initEvent(e, !0, !0), t
                }
                preventDefault(e) {
                    e.preventDefault(), e.returnValue = !1
                }
                isPrevented(e) {
                    return e.defaultPrevented || null != e.returnValue && !e.returnValue
                }
                getInnerHTML(e) {
                    return e.innerHTML
                }
                getTemplateContent(e) {
                    return "content" in e && this.isTemplateElement(e) ? e.content : null
                }
                getOuterHTML(e) {
                    return e.outerHTML
                }
                nodeName(e) {
                    return e.nodeName
                }
                nodeValue(e) {
                    return e.nodeValue
                }
                type(e) {
                    return e.type
                }
                content(e) {
                    return this.hasProperty(e, "content") ? e.content : e
                }
                firstChild(e) {
                    return e.firstChild
                }
                nextSibling(e) {
                    return e.nextSibling
                }
                parentElement(e) {
                    return e.parentNode
                }
                childNodes(e) {
                    return e.childNodes
                }
                childNodesAsList(e) {
                    const t = e.childNodes,
                        n = new Array(t.length);
                    for (let l = 0; l < t.length; l++) n[l] = t[l];
                    return n
                }
                clearNodes(e) {
                    for (; e.firstChild;) e.removeChild(e.firstChild)
                }
                appendChild(e, t) {
                    e.appendChild(t)
                }
                removeChild(e, t) {
                    e.removeChild(t)
                }
                replaceChild(e, t, n) {
                    e.replaceChild(t, n)
                }
                remove(e) {
                    return e.parentNode && e.parentNode.removeChild(e), e
                }
                insertBefore(e, t, n) {
                    e.insertBefore(n, t)
                }
                insertAllBefore(e, t, n) {
                    n.forEach(n => e.insertBefore(n, t))
                }
                insertAfter(e, t, n) {
                    e.insertBefore(n, t.nextSibling)
                }
                setInnerHTML(e, t) {
                    e.innerHTML = t
                }
                getText(e) {
                    return e.textContent
                }
                setText(e, t) {
                    e.textContent = t
                }
                getValue(e) {
                    return e.value
                }
                setValue(e, t) {
                    e.value = t
                }
                getChecked(e) {
                    return e.checked
                }
                setChecked(e, t) {
                    e.checked = t
                }
                createComment(e) {
                    return this.getDefaultDocument().createComment(e)
                }
                createTemplate(e) {
                    const t = this.getDefaultDocument().createElement("template");
                    return t.innerHTML = e, t
                }
                createElement(e, t) {
                    return (t = t || this.getDefaultDocument()).createElement(e)
                }
                createElementNS(e, t, n) {
                    return (n = n || this.getDefaultDocument()).createElementNS(e, t)
                }
                createTextNode(e, t) {
                    return (t = t || this.getDefaultDocument()).createTextNode(e)
                }
                createScriptTag(e, t, n) {
                    const l = (n = n || this.getDefaultDocument()).createElement("SCRIPT");
                    return l.setAttribute(e, t), l
                }
                createStyleElement(e, t) {
                    const n = (t = t || this.getDefaultDocument()).createElement("style");
                    return this.appendChild(n, this.createTextNode(e, t)), n
                }
                createShadowRoot(e) {
                    return e.createShadowRoot()
                }
                getShadowRoot(e) {
                    return e.shadowRoot
                }
                getHost(e) {
                    return e.host
                }
                clone(e) {
                    return e.cloneNode(!0)
                }
                getElementsByClassName(e, t) {
                    return e.getElementsByClassName(t)
                }
                getElementsByTagName(e, t) {
                    return e.getElementsByTagName(t)
                }
                classList(e) {
                    return Array.prototype.slice.call(e.classList, 0)
                }
                addClass(e, t) {
                    e.classList.add(t)
                }
                removeClass(e, t) {
                    e.classList.remove(t)
                }
                hasClass(e, t) {
                    return e.classList.contains(t)
                }
                setStyle(e, t, n) {
                    e.style[t] = n
                }
                removeStyle(e, t) {
                    e.style[t] = ""
                }
                getStyle(e, t) {
                    return e.style[t]
                }
                hasStyle(e, t, n) {
                    const l = this.getStyle(e, t) || "";
                    return n ? l == n : l.length > 0
                }
                tagName(e) {
                    return e.tagName
                }
                attributeMap(e) {
                    const t = new Map,
                        n = e.attributes;
                    for (let l = 0; l < n.length; l++) {
                        const e = n.item(l);
                        t.set(e.name, e.value)
                    }
                    return t
                }
                hasAttribute(e, t) {
                    return e.hasAttribute(t)
                }
                hasAttributeNS(e, t, n) {
                    return e.hasAttributeNS(t, n)
                }
                getAttribute(e, t) {
                    return e.getAttribute(t)
                }
                getAttributeNS(e, t, n) {
                    return e.getAttributeNS(t, n)
                }
                setAttribute(e, t, n) {
                    e.setAttribute(t, n)
                }
                setAttributeNS(e, t, n, l) {
                    e.setAttributeNS(t, n, l)
                }
                removeAttribute(e, t) {
                    e.removeAttribute(t)
                }
                removeAttributeNS(e, t, n) {
                    e.removeAttributeNS(t, n)
                }
                templateAwareRoot(e) {
                    return this.isTemplateElement(e) ? this.content(e) : e
                }
                createHtmlDocument() {
                    return document.implementation.createHTMLDocument("fakeTitle")
                }
                getDefaultDocument() {
                    return document
                }
                getBoundingClientRect(e) {
                    try {
                        return e.getBoundingClientRect()
                    } catch (t) {
                        return {
                            top: 0,
                            bottom: 0,
                            left: 0,
                            right: 0,
                            width: 0,
                            height: 0
                        }
                    }
                }
                getTitle(e) {
                    return e.title
                }
                setTitle(e, t) {
                    e.title = t || ""
                }
                elementMatches(e, t) {
                    return !!this.isElementNode(e) && (e.matches && e.matches(t) || e.msMatchesSelector && e.msMatchesSelector(t) || e.webkitMatchesSelector && e.webkitMatchesSelector(t))
                }
                isTemplateElement(e) {
                    return this.isElementNode(e) && "TEMPLATE" === e.nodeName
                }
                isTextNode(e) {
                    return e.nodeType === Node.TEXT_NODE
                }
                isCommentNode(e) {
                    return e.nodeType === Node.COMMENT_NODE
                }
                isElementNode(e) {
                    return e.nodeType === Node.ELEMENT_NODE
                }
                hasShadowRoot(e) {
                    return null != e.shadowRoot && e instanceof HTMLElement
                }
                isShadowRoot(e) {
                    return e instanceof DocumentFragment
                }
                importIntoDoc(e) {
                    return document.importNode(this.templateAwareRoot(e), !0)
                }
                adoptNode(e) {
                    return document.adoptNode(e)
                }
                getHref(e) {
                    return e.getAttribute("href")
                }
                getEventKey(e) {
                    let t = e.key;
                    if (null == t) {
                        if (null == (t = e.keyIdentifier)) return "Unidentified";
                        t.startsWith("U+") && (t = String.fromCharCode(parseInt(t.substring(2), 16)), e.location === Ri && Vi.hasOwnProperty(t) && (t = Vi[t]))
                    }
                    return Pi[t] || t
                }
                getGlobalEventTarget(e, t) {
                    return "window" === t ? window : "document" === t ? e : "body" === t ? e.body : null
                }
                getHistory() {
                    return window.history
                }
                getLocation() {
                    return window.location
                }
                getBaseHref(e) {
                    const t = Fi || (Fi = document.querySelector("base")) ? Fi.getAttribute("href") : null;
                    return null == t ? null : (n = t, Li || (Li = document.createElement("a")), Li.setAttribute("href", n), "/" === Li.pathname.charAt(0) ? Li.pathname : "/" + Li.pathname);
                    var n
                }
                resetBaseElement() {
                    Fi = null
                }
                getUserAgent() {
                    return window.navigator.userAgent
                }
                setData(e, t, n) {
                    this.setAttribute(e, "data-" + t, n)
                }
                getData(e, t) {
                    return this.getAttribute(e, "data-" + t)
                }
                getComputedStyle(e) {
                    return getComputedStyle(e)
                }
                supportsWebAnimation() {
                    return "function" == typeof Element.prototype.animate
                }
                performanceNow() {
                    return window.performance && window.performance.now ? window.performance.now() : (new Date).getTime()
                }
                supportsCookies() {
                    return !0
                }
                getCookie(e) {
                    return function(e, t) {
                        t = encodeURIComponent(t);
                        for (const n of e.split(";")) {
                            const e = n.indexOf("="),
                                [l, r] = -1 == e ? [n, ""] : [n.slice(0, e), n.slice(e + 1)];
                            if (l.trim() === t) return decodeURIComponent(r)
                        }
                        return null
                    }(document.cookie, e)
                }
                setCookie(e, t) {
                    document.cookie = encodeURIComponent(e) + "=" + encodeURIComponent(t)
                }
            }
            let Li, Fi = null;

            function Bi() {
                return !!window.history.pushState
            }
            const zi = (() => {
                    class e extends Rs {
                        constructor(e) {
                            super(), this._doc = e, this._init()
                        }
                        _init() {
                            this.location = Ni().getLocation(), this._history = Ni().getHistory()
                        }
                        getBaseHrefFromDOM() {
                            return Ni().getBaseHref(this._doc)
                        }
                        onPopState(e) {
                            Ni().getGlobalEventTarget(this._doc, "window").addEventListener("popstate", e, !1)
                        }
                        onHashChange(e) {
                            Ni().getGlobalEventTarget(this._doc, "window").addEventListener("hashchange", e, !1)
                        }
                        get href() {
                            return this.location.href
                        }
                        get protocol() {
                            return this.location.protocol
                        }
                        get hostname() {
                            return this.location.hostname
                        }
                        get port() {
                            return this.location.port
                        }
                        get pathname() {
                            return this.location.pathname
                        }
                        get search() {
                            return this.location.search
                        }
                        get hash() {
                            return this.location.hash
                        }
                        set pathname(e) {
                            this.location.pathname = e
                        }
                        pushState(e, t, n) {
                            Bi() ? this._history.pushState(e, t, n) : this.location.hash = n
                        }
                        replaceState(e, t, n) {
                            Bi() ? this._history.replaceState(e, t, n) : this.location.hash = n
                        }
                        forward() {
                            this._history.forward()
                        }
                        back() {
                            this._history.back()
                        }
                        getState() {
                            return this._history.state
                        }
                    }
                    return e.ctorParameters = (() => [{
                        type: void 0,
                        decorators: [{
                            type: Y,
                            args: [Ws]
                        }]
                    }]), e
                })(),
                $i = new ge("TRANSITION_ID"),
                Ui = [{
                    provide: or,
                    useFactory: function(e, t, n) {
                        return () => {
                            n.get(sr).donePromise.then(() => {
                                const n = Ni();
                                Array.prototype.slice.apply(n.querySelectorAll(t, "style[ng-transition]")).filter(t => n.getAttribute(t, "ng-transition") === e).forEach(e => n.remove(e))
                            })
                        }
                    },
                    deps: [$i, Ws, ve],
                    multi: !0
                }];
            class Zi {
                static init() {
                    var e;
                    e = new Zi, Fr = e
                }
                addToWindow(e) {
                    he.getAngularTestability = ((t, n = !0) => {
                        const l = e.findTestabilityInTree(t, n);
                        if (null == l) throw new Error("Could not find testability for element.");
                        return l
                    }), he.getAllAngularTestabilities = (() => e.getAllTestabilities()), he.getAllAngularRootElements = (() => e.getAllRootElements()), he.frameworkStabilizers || (he.frameworkStabilizers = []), he.frameworkStabilizers.push(e => {
                        const t = he.getAllAngularTestabilities();
                        let n = t.length,
                            l = !1;
                        const r = function(t) {
                            l = l || t, 0 == --n && e(l)
                        };
                        t.forEach(function(e) {
                            e.whenStable(r)
                        })
                    })
                }
                findTestabilityInTree(e, t, n) {
                    if (null == t) return null;
                    const l = e.getTestability(t);
                    return null != l ? l : n ? Ni().isShadowRoot(t) ? this.findTestabilityInTree(e, Ni().getHost(t), !0) : this.findTestabilityInTree(e, Ni().parentElement(t), !0) : null
                }
            }

            function Wi(e, t) {
                "undefined" != typeof COMPILED && COMPILED || ((he.ng = he.ng || {})[e] = t)
            }
            const Ki = (() => ({
                ApplicationRef: Qr,
                NgZone: Ar
            }))();

            function Qi(e) {
                return eo(e)
            }
            const qi = new ge("EventManagerPlugins"),
                Gi = (() => (class {
                    constructor(e, t) {
                        this._zone = t, this._eventNameToPlugin = new Map, e.forEach(e => e.manager = this), this._plugins = e.slice().reverse()
                    }
                    addEventListener(e, t, n) {
                        return this._findPluginFor(t).addEventListener(e, t, n)
                    }
                    addGlobalEventListener(e, t, n) {
                        return this._findPluginFor(t).addGlobalEventListener(e, t, n)
                    }
                    getZone() {
                        return this._zone
                    }
                    _findPluginFor(e) {
                        const t = this._eventNameToPlugin.get(e);
                        if (t) return t;
                        const n = this._plugins;
                        for (let l = 0; l < n.length; l++) {
                            const t = n[l];
                            if (t.supports(e)) return this._eventNameToPlugin.set(e, t), t
                        }
                        throw new Error(`No event manager plugin found for event ${e}`)
                    }
                }))();
            class Ji {
                constructor(e) {
                    this._doc = e
                }
                addGlobalEventListener(e, t, n) {
                    const l = Ni().getGlobalEventTarget(this._doc, e);
                    if (!l) throw new Error(`Unsupported event target ${l} for event ${t}`);
                    return this.addEventListener(l, t, n)
                }
            }
            const Yi = (() => (class {
                    constructor() {
                        this._stylesSet = new Set
                    }
                    addStyles(e) {
                        const t = new Set;
                        e.forEach(e => {
                            this._stylesSet.has(e) || (this._stylesSet.add(e), t.add(e))
                        }), this.onStylesAdded(t)
                    }
                    onStylesAdded(e) {}
                    getAllStyles() {
                        return Array.from(this._stylesSet)
                    }
                }))(),
                Xi = (() => (class extends Yi {
                    constructor(e) {
                        super(), this._doc = e, this._hostNodes = new Set, this._styleNodes = new Set, this._hostNodes.add(e.head)
                    }
                    _addStylesToHost(e, t) {
                        e.forEach(e => {
                            const n = this._doc.createElement("style");
                            n.textContent = e, this._styleNodes.add(t.appendChild(n))
                        })
                    }
                    addHost(e) {
                        this._addStylesToHost(this._stylesSet, e), this._hostNodes.add(e)
                    }
                    removeHost(e) {
                        this._hostNodes.delete(e)
                    }
                    onStylesAdded(e) {
                        this._hostNodes.forEach(t => this._addStylesToHost(e, t))
                    }
                    ngOnDestroy() {
                        this._styleNodes.forEach(e => Ni().remove(e))
                    }
                }))(),
                eu = {
                    svg: "http://www.w3.org/2000/svg",
                    xhtml: "http://www.w3.org/1999/xhtml",
                    xlink: "http://www.w3.org/1999/xlink",
                    xml: "http://www.w3.org/XML/1998/namespace",
                    xmlns: "http://www.w3.org/2000/xmlns/"
                },
                tu = /%COMP%/g,
                nu = "_nghost-%COMP%",
                lu = "_ngcontent-%COMP%";

            function ru(e, t, n) {
                for (let l = 0; l < t.length; l++) {
                    let r = t[l];
                    Array.isArray(r) ? ru(e, r, n) : (r = r.replace(tu, e), n.push(r))
                }
                return n
            }

            function ou(e) {
                return t => {
                    !1 === e(t) && (t.preventDefault(), t.returnValue = !1)
                }
            }
            const su = (() => (class {
                constructor(e, t, n) {
                    this.eventManager = e, this.sharedStylesHost = t, this.appId = n, this.rendererByCompId = new Map, this.defaultRenderer = new iu(e)
                }
                createRenderer(e, t) {
                    if (!e || !t) return this.defaultRenderer;
                    switch (t.encapsulation) {
                        case je.Emulated: {
                            let n = this.rendererByCompId.get(t.id);
                            return n || (n = new cu(this.eventManager, this.sharedStylesHost, t, this.appId), this.rendererByCompId.set(t.id, n)), n.applyToHost(e), n
                        }
                        case je.Native:
                        case je.ShadowDom:
                            return new du(this.eventManager, this.sharedStylesHost, e, t);
                        default:
                            if (!this.rendererByCompId.has(t.id)) {
                                const e = ru(t.id, t.styles, []);
                                this.sharedStylesHost.addStyles(e), this.rendererByCompId.set(t.id, this.defaultRenderer)
                            }
                            return this.defaultRenderer
                    }
                }
                begin() {}
                end() {}
            }))();
            class iu {
                constructor(e) {
                    this.eventManager = e, this.data = Object.create(null)
                }
                destroy() {}
                createElement(e, t) {
                    return t ? document.createElementNS(eu[t] || t, e) : document.createElement(e)
                }
                createComment(e) {
                    return document.createComment(e)
                }
                createText(e) {
                    return document.createTextNode(e)
                }
                appendChild(e, t) {
                    e.appendChild(t)
                }
                insertBefore(e, t, n) {
                    e && e.insertBefore(t, n)
                }
                removeChild(e, t) {
                    e && e.removeChild(t)
                }
                selectRootElement(e, t) {
                    let n = "string" == typeof e ? document.querySelector(e) : e;
                    if (!n) throw new Error(`The selector "${e}" did not match any elements`);
                    return t || (n.textContent = ""), n
                }
                parentNode(e) {
                    return e.parentNode
                }
                nextSibling(e) {
                    return e.nextSibling
                }
                setAttribute(e, t, n, l) {
                    if (l) {
                        t = `${l}:${t}`;
                        const r = eu[l];
                        r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n)
                    } else e.setAttribute(t, n)
                }
                removeAttribute(e, t, n) {
                    if (n) {
                        const l = eu[n];
                        l ? e.removeAttributeNS(l, t) : e.removeAttribute(`${n}:${t}`)
                    } else e.removeAttribute(t)
                }
                addClass(e, t) {
                    e.classList.add(t)
                }
                removeClass(e, t) {
                    e.classList.remove(t)
                }
                setStyle(e, t, n, l) {
                    l & Zt.DashCase ? e.style.setProperty(t, n, l & Zt.Important ? "important" : "") : e.style[t] = n
                }
                removeStyle(e, t, n) {
                    n & Zt.DashCase ? e.style.removeProperty(t) : e.style[t] = ""
                }
                setProperty(e, t, n) {
                    au(t, "property"), e[t] = n
                }
                setValue(e, t) {
                    e.nodeValue = t
                }
                listen(e, t, n) {
                    return au(t, "listener"), "string" == typeof e ? this.eventManager.addGlobalEventListener(e, t, ou(n)) : this.eventManager.addEventListener(e, t, ou(n))
                }
            }
            const uu = (() => "@".charCodeAt(0))();

            function au(e, t) {
                if (e.charCodeAt(0) === uu) throw new Error(`Found the synthetic ${t} ${e}. Please include either "BrowserAnimationsModule" or "NoopAnimationsModule" in your application.`)
            }
            class cu extends iu {
                constructor(e, t, n, l) {
                    super(e), this.component = n;
                    const r = ru(l + "-" + n.id, n.styles, []);
                    t.addStyles(r), this.contentAttr = lu.replace(tu, l + "-" + n.id), this.hostAttr = nu.replace(tu, l + "-" + n.id)
                }
                applyToHost(e) {
                    super.setAttribute(e, this.hostAttr, "")
                }
                createElement(e, t) {
                    const n = super.createElement(e, t);
                    return super.setAttribute(n, this.contentAttr, ""), n
                }
            }
            class du extends iu {
                constructor(e, t, n, l) {
                    super(e), this.sharedStylesHost = t, this.hostEl = n, this.component = l, this.shadowRoot = l.encapsulation === je.ShadowDom ? n.attachShadow({
                        mode: "open"
                    }) : n.createShadowRoot(), this.sharedStylesHost.addHost(this.shadowRoot);
                    const r = ru(l.id, l.styles, []);
                    for (let o = 0; o < r.length; o++) {
                        const e = document.createElement("style");
                        e.textContent = r[o], this.shadowRoot.appendChild(e)
                    }
                }
                nodeOrShadowRoot(e) {
                    return e === this.hostEl ? this.shadowRoot : e
                }
                destroy() {
                    this.sharedStylesHost.removeHost(this.shadowRoot)
                }
                appendChild(e, t) {
                    return super.appendChild(this.nodeOrShadowRoot(e), t)
                }
                insertBefore(e, t, n) {
                    return super.insertBefore(this.nodeOrShadowRoot(e), t, n)
                }
                removeChild(e, t) {
                    return super.removeChild(this.nodeOrShadowRoot(e), t)
                }
                parentNode(e) {
                    return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(e)))
                }
            }
            const hu = (() => "undefined" != typeof Zone && Zone.__symbol__ || function(e) {
                    return "__zone_symbol__" + e
                })(),
                pu = hu("addEventListener"),
                fu = hu("removeEventListener"),
                mu = {},
                gu = "__zone_symbol__propagationStopped",
                yu = (() => {
                    const e = "undefined" != typeof Zone && Zone[hu("BLACK_LISTED_EVENTS")];
                    if (e) {
                        const t = {};
                        return e.forEach(e => {
                            t[e] = e
                        }), t
                    }
                })(),
                _u = function(e) {
                    return !!yu && yu.hasOwnProperty(e)
                },
                wu = function(e) {
                    const t = mu[e.type];
                    if (!t) return;
                    const n = this[t];
                    if (!n) return;
                    const l = [e];
                    if (1 === n.length) {
                        const e = n[0];
                        return e.zone !== Zone.current ? e.zone.run(e.handler, this, l) : e.handler.apply(this, l)
                    } {
                        const t = n.slice();
                        for (let n = 0; n < t.length && !0 !== e[gu]; n++) {
                            const e = t[n];
                            e.zone !== Zone.current ? e.zone.run(e.handler, this, l) : e.handler.apply(this, l)
                        }
                    }
                },
                bu = (() => (class extends Ji {
                    constructor(e, t, n) {
                        super(e), this.ngZone = t, n && function(e) {
                            return "server" === e
                        }(n) || this.patchEvent()
                    }
                    patchEvent() {
                        if ("undefined" == typeof Event || !Event || !Event.prototype) return;
                        if (Event.prototype.__zone_symbol__stopImmediatePropagation) return;
                        const e = Event.prototype.__zone_symbol__stopImmediatePropagation = Event.prototype.stopImmediatePropagation;
                        Event.prototype.stopImmediatePropagation = function() {
                            this && (this[gu] = !0), e && e.apply(this, arguments)
                        }
                    }
                    supports(e) {
                        return !0
                    }
                    addEventListener(e, t, n) {
                        let l = n;
                        if (!e[pu] || Ar.isInAngularZone() && !_u(t)) e.addEventListener(t, l, !1);
                        else {
                            let n = mu[t];
                            n || (n = mu[t] = hu("ANGULAR" + t + "FALSE"));
                            let r = e[n];
                            const o = r && r.length > 0;
                            r || (r = e[n] = []);
                            const s = _u(t) ? Zone.root : Zone.current;
                            if (0 === r.length) r.push({
                                zone: s,
                                handler: l
                            });
                            else {
                                let e = !1;
                                for (let t = 0; t < r.length; t++)
                                    if (r[t].handler === l) {
                                        e = !0;
                                        break
                                    } e || r.push({
                                    zone: s,
                                    handler: l
                                })
                            }
                            o || e[pu](t, wu, !1)
                        }
                        return () => this.removeEventListener(e, t, l)
                    }
                    removeEventListener(e, t, n) {
                        let l = e[fu];
                        if (!l) return e.removeEventListener.apply(e, [t, n, !1]);
                        let r = mu[t],
                            o = r && e[r];
                        if (!o) return e.removeEventListener.apply(e, [t, n, !1]);
                        let s = !1;
                        for (let i = 0; i < o.length; i++)
                            if (o[i].handler === n) {
                                s = !0, o.splice(i, 1);
                                break
                            } s ? 0 === o.length && l.apply(e, [t, wu, !1]) : e.removeEventListener.apply(e, [t, n, !1])
                    }
                }))(),
                vu = {
                    pan: !0,
                    panstart: !0,
                    panmove: !0,
                    panend: !0,
                    pancancel: !0,
                    panleft: !0,
                    panright: !0,
                    panup: !0,
                    pandown: !0,
                    pinch: !0,
                    pinchstart: !0,
                    pinchmove: !0,
                    pinchend: !0,
                    pinchcancel: !0,
                    pinchin: !0,
                    pinchout: !0,
                    press: !0,
                    pressup: !0,
                    rotate: !0,
                    rotatestart: !0,
                    rotatemove: !0,
                    rotateend: !0,
                    rotatecancel: !0,
                    swipe: !0,
                    swipeleft: !0,
                    swiperight: !0,
                    swipeup: !0,
                    swipedown: !0,
                    tap: !0
                },
                Cu = new ge("HammerGestureConfig"),
                xu = new ge("HammerLoader"),
                Eu = (() => (class {
                    constructor() {
                        this.events = [], this.overrides = {}
                    }
                    buildHammer(e) {
                        const t = new Hammer(e, this.options);
                        t.get("pinch").set({
                            enable: !0
                        }), t.get("rotate").set({
                            enable: !0
                        });
                        for (const n in this.overrides) t.get(n).set(this.overrides[n]);
                        return t
                    }
                }))(),
                ku = (() => (class extends Ji {
                    constructor(e, t, n, l) {
                        super(e), this._config = t, this.console = n, this.loader = l
                    }
                    supports(e) {
                        return !(!vu.hasOwnProperty(e.toLowerCase()) && !this.isCustomEvent(e) || !window.Hammer && !this.loader && (this.console.warn(`The "${e}" event cannot be bound because Hammer.JS is not ` + "loaded and no custom loader has been specified."), 1))
                    }
                    addEventListener(e, t, n) {
                        const l = this.manager.getZone();
                        if (t = t.toLowerCase(), !window.Hammer && this.loader) {
                            let l = !1,
                                r = () => {
                                    l = !0
                                };
                            return this.loader().then(() => {
                                if (!window.Hammer) return this.console.warn("The custom HAMMER_LOADER completed, but Hammer.JS is not present."), void(r = (() => {}));
                                l || (r = this.addEventListener(e, t, n))
                            }).catch(() => {
                                this.console.warn(`The "${t}" event cannot be bound because the custom ` + "Hammer.JS loader failed."), r = (() => {})
                            }), () => {
                                r()
                            }
                        }
                        return l.runOutsideAngular(() => {
                            const r = this._config.buildHammer(e),
                                o = function(e) {
                                    l.runGuarded(function() {
                                        n(e)
                                    })
                                };
                            return r.on(t, o), () => {
                                r.off(t, o), "function" == typeof r.destroy && r.destroy()
                            }
                        })
                    }
                    isCustomEvent(e) {
                        return this._config.events.indexOf(e) > -1
                    }
                }))(),
                Tu = ["alt", "control", "meta", "shift"],
                Iu = {
                    alt: e => e.altKey,
                    control: e => e.ctrlKey,
                    meta: e => e.metaKey,
                    shift: e => e.shiftKey
                },
                Su = (() => {
                    class e extends Ji {
                        constructor(e) {
                            super(e)
                        }
                        supports(t) {
                            return null != e.parseEventName(t)
                        }
                        addEventListener(t, n, l) {
                            const r = e.parseEventName(n),
                                o = e.eventCallback(r.fullKey, l, this.manager.getZone());
                            return this.manager.getZone().runOutsideAngular(() => Ni().onAndCancel(t, r.domEventName, o))
                        }
                        static parseEventName(t) {
                            const n = t.toLowerCase().split("."),
                                l = n.shift();
                            if (0 === n.length || "keydown" !== l && "keyup" !== l) return null;
                            const r = e._normalizeKey(n.pop());
                            let o = "";
                            if (Tu.forEach(e => {
                                    const t = n.indexOf(e);
                                    t > -1 && (n.splice(t, 1), o += e + ".")
                                }), o += r, 0 != n.length || 0 === r.length) return null;
                            const s = {};
                            return s.domEventName = l, s.fullKey = o, s
                        }
                        static getEventFullKey(e) {
                            let t = "",
                                n = Ni().getEventKey(e);
                            return " " === (n = n.toLowerCase()) ? n = "space" : "." === n && (n = "dot"), Tu.forEach(l => {
                                l != n && (0, Iu[l])(e) && (t += l + ".")
                            }), t += n
                        }
                        static eventCallback(t, n, l) {
                            return r => {
                                e.getEventFullKey(r) === t && l.runGuarded(() => n(r))
                            }
                        }
                        static _normalizeKey(e) {
                            switch (e) {
                                case "esc":
                                    return "escape";
                                default:
                                    return e
                            }
                        }
                    }
                    return e
                })();
            class Au {}
            const Nu = (() => (class extends Au {
                constructor(e) {
                    super(), this._doc = e
                }
                sanitize(e, t) {
                    if (null == t) return null;
                    switch (e) {
                        case ft.NONE:
                            return t;
                        case ft.HTML:
                            return t instanceof Ou ? t.changingThisBreaksApplicationSecurity : (this.checkNotSafeValue(t, "HTML"), function(e, t) {
                                let n = null;
                                try {
                                    ht = ht || new Ke(e);
                                    let l = t ? String(t) : "";
                                    n = ht.getInertBodyElement(l);
                                    let r = 5,
                                        o = l;
                                    do {
                                        if (0 === r) throw new Error("Failed to sanitize html because the input is unstable");
                                        r--, l = o, o = n.innerHTML, n = ht.getInertBodyElement(l)
                                    } while (l !== o);
                                    const s = new ut,
                                        i = s.sanitizeChildren(pt(n) || n);
                                    return We() && s.sanitizedSomething && console.warn("WARNING: sanitizing HTML stripped some content, see http://g.co/ng/security#xss"), i
                                } finally {
                                    if (n) {
                                        const e = pt(n) || n;
                                        for (; e.firstChild;) e.removeChild(e.firstChild)
                                    }
                                }
                            }(this._doc, String(t)));
                        case ft.STYLE:
                            return t instanceof Mu ? t.changingThisBreaksApplicationSecurity : (this.checkNotSafeValue(t, "Style"), function(e) {
                                if (!(e = String(e).trim())) return "";
                                const t = e.match(yt);
                                return t && Ge(t[1]) === t[1] || e.match(gt) && function(e) {
                                    let t = !0,
                                        n = !0;
                                    for (let l = 0; l < e.length; l++) {
                                        const r = e.charAt(l);
                                        "'" === r && n ? t = !t : '"' === r && t && (n = !n)
                                    }
                                    return t && n
                                }(e) ? e : (We() && console.warn(`WARNING: sanitizing unsafe style value ${e} (see http://g.co/ng/security#xss).`), "unsafe")
                            }(t));
                        case ft.SCRIPT:
                            if (t instanceof Ru) return t.changingThisBreaksApplicationSecurity;
                            throw this.checkNotSafeValue(t, "Script"), new Error("unsafe value used in a script context");
                        case ft.URL:
                            return t instanceof Vu || t instanceof Pu ? t.changingThisBreaksApplicationSecurity : (this.checkNotSafeValue(t, "URL"), Ge(String(t)));
                        case ft.RESOURCE_URL:
                            if (t instanceof Vu) return t.changingThisBreaksApplicationSecurity;
                            throw this.checkNotSafeValue(t, "ResourceURL"), new Error("unsafe value used in a resource URL context (see http://g.co/ng/security#xss)");
                        default:
                            throw new Error(`Unexpected SecurityContext ${e} (see http://g.co/ng/security#xss)`)
                    }
                }
                checkNotSafeValue(e, t) {
                    if (e instanceof Du) throw new Error(`Required a safe ${t}, got a ${e.getTypeName()} ` + "(see http://g.co/ng/security#xss)")
                }
                bypassSecurityTrustHtml(e) {
                    return new Ou(e)
                }
                bypassSecurityTrustStyle(e) {
                    return new Mu(e)
                }
                bypassSecurityTrustScript(e) {
                    return new Ru(e)
                }
                bypassSecurityTrustUrl(e) {
                    return new Pu(e)
                }
                bypassSecurityTrustResourceUrl(e) {
                    return new Vu(e)
                }
            }))();
            class Du {
                constructor(e) {
                    this.changingThisBreaksApplicationSecurity = e
                }
                toString() {
                    return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity}` + " (see http://g.co/ng/security#xss)"
                }
            }
            class Ou extends Du {
                getTypeName() {
                    return "HTML"
                }
            }
            class Mu extends Du {
                getTypeName() {
                    return "Style"
                }
            }
            class Ru extends Du {
                getTypeName() {
                    return "Script"
                }
            }
            class Pu extends Du {
                getTypeName() {
                    return "URL"
                }
            }
            class Vu extends Du {
                getTypeName() {
                    return "ResourceURL"
                }
            }
            const Hu = Ur(no, "browser", [{
                provide: dr,
                useValue: "browser"
            }, {
                provide: cr,
                useValue: function() {
                    ji.makeCurrent(), Zi.init()
                },
                multi: !0
            }, {
                provide: Rs,
                useClass: zi,
                deps: [Ws]
            }, {
                provide: Ws,
                useFactory: function() {
                    return document
                },
                deps: []
            }]);

            function ju() {
                return new $e
            }
            const Lu = (() => {
                class e {
                    constructor(e) {
                        if (e) throw new Error("BrowserModule has already been loaded. If you need access to common directives such as NgIf and NgFor from a lazy loaded module, import CommonModule instead.")
                    }
                    static withServerTransition(t) {
                        return {
                            ngModule: e,
                            providers: [{
                                provide: ir,
                                useValue: t.appId
                            }, {
                                provide: $i,
                                useExisting: ir
                            }, Ui]
                        }
                    }
                }
                return e
            })();
            "undefined" != typeof window && window;
            var Fu = function() {
                    return function() {}
                }(),
                Bu = As(Ds, [Ms], function(e) {
                    return function(e) {
                        const t = {},
                            n = [];
                        let l = !1;
                        for (let r = 0; r < e.length; r++) {
                            const o = e[r];
                            o.token === At && !0 === o.value && (l = !0), 1073741824 & o.flags && n.push(o.token), o.index = r, t[Dn(o.token)] = o
                        }
                        return {
                            factory: null,
                            providersByKey: t,
                            providers: e,
                            modules: n,
                            isRoot: l
                        }
                    }([cl(512, Pt, Vt, [
                        [8, [Si]],
                        [3, Pt], jt
                    ]), cl(5120, lo, so, [
                        [3, lo]
                    ]), cl(4608, Fs, Bs, [lo, [2, Ls]]), cl(5120, nr, io, [Ar]), cl(4608, wr, wr, []), cl(5120, ir, ur, []), cl(5120, sn, ro, []), cl(5120, un, oo, []), cl(4608, Au, Nu, [Ws]), cl(6144, mt, null, [Au]), cl(4608, Cu, Eu, []), cl(5120, qi, function(e, t, n, l, r, o, s, i) {
                        return [new bu(e, t, n), new Su(l), new ku(r, o, s, i)]
                    }, [Ws, Ar, dr, Ws, Ws, Cu, pr, [2, xu]]), cl(4608, Gi, Gi, [qi, Ar]), cl(135680, Xi, Xi, [Ws]), cl(4608, su, su, [Gi, Xi, ir]), cl(6144, Ut, null, [su]), cl(6144, Yi, null, [Xi]), cl(4608, Vr, Vr, [Ar]), cl(1073742336, Zs, Zs, []), cl(1024, $e, ju, []), cl(1024, or, function(e) {
                        return [(t = e, Wi("probe", Qi), Wi("coreTokens", Object.assign({}, Ki, (t || []).reduce((e, t) => (e[t.name] = t.token, e), {}))), () => Qi)];
                        var t
                    }, [
                        [2, $r]
                    ]), cl(512, sr, sr, [
                        [2, or]
                    ]), cl(131584, Qr, Qr, [Ar, pr, ve, $e, Pt, sr]), cl(1073742336, uo, uo, [Qr]), cl(1073742336, Lu, Lu, [
                        [3, Lu]
                    ]), cl(1073742336, Fu, Fu, []), cl(1073742336, Ds, Ds, []), cl(256, At, !0, [])])
                });
            (function() {
                if (Ze) throw new Error("Cannot enable prod mode after platform setup.");
                Ue = !1
            })(), Hu().bootstrapModuleFactory(Bu).catch(e => console.error(e))
        },
        zn8P: function(e, t) {
            function n(e) {
                return Promise.resolve().then(function() {
                    var t = new Error("Cannot find module '" + e + "'");
                    throw t.code = "MODULE_NOT_FOUND", t
                })
            }
            n.keys = function() {
                return []
            }, n.resolve = n, e.exports = n, n.id = "zn8P"
        }
    },
    [
        [0, 0]
    ]
]);
