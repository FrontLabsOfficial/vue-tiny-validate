var e = Object.defineProperty,
  t = Object.getOwnPropertySymbols,
  n = Object.prototype.hasOwnProperty,
  o = Object.prototype.propertyIsEnumerable,
  r = (t, n, o) => (n in t ? e(t, n, { enumerable: !0, configurable: !0, writable: !0, value: o }) : (t[n] = o));
function s(e, t) {
  const n = Object.create(null),
    o = e.split(',');
  for (let r = 0; r < o.length; r++) n[o[r]] = !0;
  return t ? e => !!n[e.toLowerCase()] : e => !!n[e];
}
const i = s(
    'Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,BigInt',
  ),
  l = s('itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly');
function a(e) {
  if (j(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const o = e[n],
        r = a(I(o) ? p(o) : o);
      if (r) for (const e in r) t[e] = r[e];
    }
    return t;
  }
  if (R(e)) return e;
}
const c = /;(?![^(]*\))/g,
  u = /:(.+)/;
function p(e) {
  const t = {};
  return (
    e.split(c).forEach(e => {
      if (e) {
        const n = e.split(u);
        n.length > 1 && (t[n[0].trim()] = n[1].trim());
      }
    }),
    t
  );
}
function d(e) {
  let t = '';
  if (I(e)) t = e;
  else if (j(e))
    for (let n = 0; n < e.length; n++) {
      const o = d(e[n]);
      o && (t += o + ' ');
    }
  else if (R(e)) for (const n in e) e[n] && (t += n + ' ');
  return t.trim();
}
const f = s(
    'html,body,base,head,link,meta,style,title,address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot',
  ),
  h = s(
    'svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistanceLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view',
  ),
  m = e => (null == e ? '' : R(e) ? JSON.stringify(e, g, 2) : String(e)),
  g = (e, t) =>
    E(t)
      ? { [`Map(${t.size})`]: [...t.entries()].reduce((e, [t, n]) => ((e[`${t} =>`] = n), e), {}) }
      : T(t)
      ? { [`Set(${t.size})`]: [...t.values()] }
      : !R(t) || j(t) || U(t)
      ? t
      : String(t),
  y = Object.freeze({}),
  v = Object.freeze([]),
  b = () => {},
  _ = () => !1,
  w = /^on[^a-z]/,
  x = e => w.test(e),
  k = e => e.startsWith('onUpdate:'),
  $ = Object.assign,
  S = (e, t) => {
    const n = e.indexOf(t);
    n > -1 && e.splice(n, 1);
  },
  C = Object.prototype.hasOwnProperty,
  O = (e, t) => C.call(e, t),
  j = Array.isArray,
  E = e => '[object Map]' === N(e),
  T = e => '[object Set]' === N(e),
  P = e => 'function' == typeof e,
  I = e => 'string' == typeof e,
  F = e => 'symbol' == typeof e,
  R = e => null !== e && 'object' == typeof e,
  M = e => R(e) && P(e.then) && P(e.catch),
  A = Object.prototype.toString,
  N = e => A.call(e),
  V = e => N(e).slice(8, -1),
  U = e => '[object Object]' === N(e),
  L = e => I(e) && 'NaN' !== e && '-' !== e[0] && '' + parseInt(e, 10) === e,
  D = s(
    ',key,ref,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted',
  ),
  B = e => {
    const t = Object.create(null);
    return n => t[n] || (t[n] = e(n));
  },
  J = /-(\w)/g,
  H = B(e => e.replace(J, (e, t) => (t ? t.toUpperCase() : ''))),
  K = /\B([A-Z])/g,
  q = B(e => e.replace(K, '-$1').toLowerCase()),
  z = B(e => e.charAt(0).toUpperCase() + e.slice(1)),
  W = B(e => (e ? `on${z(e)}` : '')),
  G = (e, t) => e !== t && (e == e || t == t),
  Y = (e, t) => {
    for (let n = 0; n < e.length; n++) e[n](t);
  },
  X = (e, t, n) => {
    Object.defineProperty(e, t, { configurable: !0, enumerable: !1, value: n });
  },
  Z = e => {
    const t = parseFloat(e);
    return isNaN(t) ? e : t;
  };
let Q;
const ee = new WeakMap(),
  te = [];
let ne;
const oe = Symbol('iterate'),
  re = Symbol('Map key iterate');
function se(e, t = y) {
  (function (e) {
    return e && !0 === e._isEffect;
  })(e) && (e = e.raw);
  const n = (function (e, t) {
    const n = function () {
      if (!n.active) return t.scheduler ? void 0 : e();
      if (!te.includes(n)) {
        ae(n);
        try {
          return ue.push(ce), (ce = !0), te.push(n), (ne = n), e();
        } finally {
          te.pop(), de(), (ne = te[te.length - 1]);
        }
      }
    };
    return (
      (n.id = le++),
      (n.allowRecurse = !!t.allowRecurse),
      (n._isEffect = !0),
      (n.active = !0),
      (n.raw = e),
      (n.deps = []),
      (n.options = t),
      n
    );
  })(e, t);
  return t.lazy || n(), n;
}
function ie(e) {
  e.active && (ae(e), e.options.onStop && e.options.onStop(), (e.active = !1));
}
let le = 0;
function ae(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let n = 0; n < t.length; n++) t[n].delete(e);
    t.length = 0;
  }
}
let ce = !0;
const ue = [];
function pe() {
  ue.push(ce), (ce = !1);
}
function de() {
  const e = ue.pop();
  ce = void 0 === e || e;
}
function fe(e, t, n) {
  if (!ce || void 0 === ne) return;
  let o = ee.get(e);
  o || ee.set(e, (o = new Map()));
  let r = o.get(n);
  r || o.set(n, (r = new Set())),
    r.has(ne) ||
      (r.add(ne),
      ne.deps.push(r),
      ne.options.onTrack && ne.options.onTrack({ effect: ne, target: e, type: t, key: n }));
}
function he(e, t, n, o, r, s) {
  const i = ee.get(e);
  if (!i) return;
  const l = new Set(),
    a = e => {
      e &&
        e.forEach(e => {
          (e !== ne || e.allowRecurse) && l.add(e);
        });
    };
  if ('clear' === t) i.forEach(a);
  else if ('length' === n && j(e))
    i.forEach((e, t) => {
      ('length' === t || t >= o) && a(e);
    });
  else
    switch ((void 0 !== n && a(i.get(n)), t)) {
      case 'add':
        j(e) ? L(n) && a(i.get('length')) : (a(i.get(oe)), E(e) && a(i.get(re)));
        break;
      case 'delete':
        j(e) || (a(i.get(oe)), E(e) && a(i.get(re)));
        break;
      case 'set':
        E(e) && a(i.get(oe));
    }
  l.forEach(i => {
    i.options.onTrigger &&
      i.options.onTrigger({ effect: i, target: e, key: n, type: t, newValue: o, oldValue: r, oldTarget: s }),
      i.options.scheduler ? i.options.scheduler(i) : i();
  });
}
const me = s('__proto__,__v_isRef,__isVue'),
  ge = new Set(
    Object.getOwnPropertyNames(Symbol)
      .map(e => Symbol[e])
      .filter(F),
  ),
  ye = xe(),
  ve = xe(!1, !0),
  be = xe(!0),
  _e = xe(!0, !0),
  we = {};
function xe(e = !1, t = !1) {
  return function (n, o, r) {
    if ('__v_isReactive' === o) return !e;
    if ('__v_isReadonly' === o) return e;
    if ('__v_raw' === o && r === (e ? (t ? tt : et) : t ? Qe : Ze).get(n)) return n;
    const s = j(n);
    if (!e && s && O(we, o)) return Reflect.get(we, o, r);
    const i = Reflect.get(n, o, r);
    if (F(o) ? ge.has(o) : me(o)) return i;
    if ((e || fe(n, 'get', o), t)) return i;
    if (ut(i)) {
      return !s || !L(o) ? i.value : i;
    }
    return R(i) ? (e ? ot(i) : nt(i)) : i;
  };
}
['includes', 'indexOf', 'lastIndexOf'].forEach(e => {
  const t = Array.prototype[e];
  we[e] = function (...e) {
    const n = ct(this);
    for (let t = 0, r = this.length; t < r; t++) fe(n, 'get', t + '');
    const o = t.apply(n, e);
    return -1 === o || !1 === o ? t.apply(n, e.map(ct)) : o;
  };
}),
  ['push', 'pop', 'shift', 'unshift', 'splice'].forEach(e => {
    const t = Array.prototype[e];
    we[e] = function (...e) {
      pe();
      const n = t.apply(this, e);
      return de(), n;
    };
  });
function ke(e = !1) {
  return function (t, n, o, r) {
    let s = t[n];
    if (!e && ((o = ct(o)), (s = ct(s)), !j(t) && ut(s) && !ut(o))) return (s.value = o), !0;
    const i = j(t) && L(n) ? Number(n) < t.length : O(t, n),
      l = Reflect.set(t, n, o, r);
    return t === ct(r) && (i ? G(o, s) && he(t, 'set', n, o, s) : he(t, 'add', n, o)), l;
  };
}
const $e = {
    get: ye,
    set: ke(),
    deleteProperty: function (e, t) {
      const n = O(e, t),
        o = e[t],
        r = Reflect.deleteProperty(e, t);
      return r && n && he(e, 'delete', t, void 0, o), r;
    },
    has: function (e, t) {
      const n = Reflect.has(e, t);
      return (F(t) && ge.has(t)) || fe(e, 'has', t), n;
    },
    ownKeys: function (e) {
      return fe(e, 'iterate', j(e) ? 'length' : oe), Reflect.ownKeys(e);
    },
  },
  Se = {
    get: be,
    set: (e, t) => (console.warn(`Set operation on key "${String(t)}" failed: target is readonly.`, e), !0),
    deleteProperty: (e, t) => (
      console.warn(`Delete operation on key "${String(t)}" failed: target is readonly.`, e), !0
    ),
  },
  Ce = $({}, $e, { get: ve, set: ke(!0) }),
  Oe = $({}, Se, { get: _e }),
  je = e => (R(e) ? nt(e) : e),
  Ee = e => (R(e) ? ot(e) : e),
  Te = e => e,
  Pe = e => Reflect.getPrototypeOf(e);
function Ie(e, t, n = !1, o = !1) {
  const r = ct((e = e.__v_raw)),
    s = ct(t);
  t !== s && !n && fe(r, 'get', t), !n && fe(r, 'get', s);
  const { has: i } = Pe(r),
    l = o ? Te : n ? Ee : je;
  return i.call(r, t) ? l(e.get(t)) : i.call(r, s) ? l(e.get(s)) : void 0;
}
function Fe(e, t = !1) {
  const n = this.__v_raw,
    o = ct(n),
    r = ct(e);
  return e !== r && !t && fe(o, 'has', e), !t && fe(o, 'has', r), e === r ? n.has(e) : n.has(e) || n.has(r);
}
function Re(e, t = !1) {
  return (e = e.__v_raw), !t && fe(ct(e), 'iterate', oe), Reflect.get(e, 'size', e);
}
function Me(e) {
  e = ct(e);
  const t = ct(this);
  return Pe(t).has.call(t, e) || (t.add(e), he(t, 'add', e, e)), this;
}
function Ae(e, t) {
  t = ct(t);
  const n = ct(this),
    { has: o, get: r } = Pe(n);
  let s = o.call(n, e);
  s ? Xe(n, o, e) : ((e = ct(e)), (s = o.call(n, e)));
  const i = r.call(n, e);
  return n.set(e, t), s ? G(t, i) && he(n, 'set', e, t, i) : he(n, 'add', e, t), this;
}
function Ne(e) {
  const t = ct(this),
    { has: n, get: o } = Pe(t);
  let r = n.call(t, e);
  r ? Xe(t, n, e) : ((e = ct(e)), (r = n.call(t, e)));
  const s = o ? o.call(t, e) : void 0,
    i = t.delete(e);
  return r && he(t, 'delete', e, void 0, s), i;
}
function Ve() {
  const e = ct(this),
    t = 0 !== e.size,
    n = E(e) ? new Map(e) : new Set(e),
    o = e.clear();
  return t && he(e, 'clear', void 0, void 0, n), o;
}
function Ue(e, t) {
  return function (n, o) {
    const r = this,
      s = r.__v_raw,
      i = ct(s),
      l = t ? Te : e ? Ee : je;
    return !e && fe(i, 'iterate', oe), s.forEach((e, t) => n.call(o, l(e), l(t), r));
  };
}
function Le(e, t, n) {
  return function (...o) {
    const r = this.__v_raw,
      s = ct(r),
      i = E(s),
      l = 'entries' === e || (e === Symbol.iterator && i),
      a = 'keys' === e && i,
      c = r[e](...o),
      u = n ? Te : t ? Ee : je;
    return (
      !t && fe(s, 'iterate', a ? re : oe),
      {
        next() {
          const { value: e, done: t } = c.next();
          return t ? { value: e, done: t } : { value: l ? [u(e[0]), u(e[1])] : u(e), done: t };
        },
        [Symbol.iterator]() {
          return this;
        },
      }
    );
  };
}
function De(e) {
  return function (...t) {
    {
      const n = t[0] ? `on key "${t[0]}" ` : '';
      console.warn(`${z(e)} operation ${n}failed: target is readonly.`, ct(this));
    }
    return 'delete' !== e && this;
  };
}
const Be = {
    get(e) {
      return Ie(this, e);
    },
    get size() {
      return Re(this);
    },
    has: Fe,
    add: Me,
    set: Ae,
    delete: Ne,
    clear: Ve,
    forEach: Ue(!1, !1),
  },
  Je = {
    get(e) {
      return Ie(this, e, !1, !0);
    },
    get size() {
      return Re(this);
    },
    has: Fe,
    add: Me,
    set: Ae,
    delete: Ne,
    clear: Ve,
    forEach: Ue(!1, !0),
  },
  He = {
    get(e) {
      return Ie(this, e, !0);
    },
    get size() {
      return Re(this, !0);
    },
    has(e) {
      return Fe.call(this, e, !0);
    },
    add: De('add'),
    set: De('set'),
    delete: De('delete'),
    clear: De('clear'),
    forEach: Ue(!0, !1),
  },
  Ke = {
    get(e) {
      return Ie(this, e, !0, !0);
    },
    get size() {
      return Re(this, !0);
    },
    has(e) {
      return Fe.call(this, e, !0);
    },
    add: De('add'),
    set: De('set'),
    delete: De('delete'),
    clear: De('clear'),
    forEach: Ue(!0, !0),
  };
function qe(e, t) {
  const n = t ? (e ? Ke : Je) : e ? He : Be;
  return (t, o, r) =>
    '__v_isReactive' === o
      ? !e
      : '__v_isReadonly' === o
      ? e
      : '__v_raw' === o
      ? t
      : Reflect.get(O(n, o) && o in t ? n : t, o, r);
}
['keys', 'values', 'entries', Symbol.iterator].forEach(e => {
  (Be[e] = Le(e, !1, !1)), (He[e] = Le(e, !0, !1)), (Je[e] = Le(e, !1, !0)), (Ke[e] = Le(e, !0, !0));
});
const ze = { get: qe(!1, !1) },
  We = { get: qe(!1, !0) },
  Ge = { get: qe(!0, !1) },
  Ye = { get: qe(!0, !0) };
function Xe(e, t, n) {
  const o = ct(n);
  if (o !== n && t.call(e, o)) {
    const t = V(e);
    console.warn(
      `Reactive ${t} contains both the raw and reactive versions of the same object${
        'Map' === t ? ' as keys' : ''
      }, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`,
    );
  }
}
const Ze = new WeakMap(),
  Qe = new WeakMap(),
  et = new WeakMap(),
  tt = new WeakMap();
function nt(e) {
  return e && e.__v_isReadonly ? e : st(e, !1, $e, ze, Ze);
}
function ot(e) {
  return st(e, !0, Se, Ge, et);
}
function rt(e) {
  return st(e, !0, Oe, Ye, tt);
}
function st(e, t, n, o, r) {
  if (!R(e)) return console.warn(`value cannot be made reactive: ${String(e)}`), e;
  if (e.__v_raw && (!t || !e.__v_isReactive)) return e;
  const s = r.get(e);
  if (s) return s;
  const i =
    (l = e).__v_skip || !Object.isExtensible(l)
      ? 0
      : (function (e) {
          switch (e) {
            case 'Object':
            case 'Array':
              return 1;
            case 'Map':
            case 'Set':
            case 'WeakMap':
            case 'WeakSet':
              return 2;
            default:
              return 0;
          }
        })(V(l));
  var l;
  if (0 === i) return e;
  const a = new Proxy(e, 2 === i ? o : n);
  return r.set(e, a), a;
}
function it(e) {
  return lt(e) ? it(e.__v_raw) : !(!e || !e.__v_isReactive);
}
function lt(e) {
  return !(!e || !e.__v_isReadonly);
}
function at(e) {
  return it(e) || lt(e);
}
function ct(e) {
  return (e && ct(e.__v_raw)) || e;
}
function ut(e) {
  return Boolean(e && !0 === e.__v_isRef);
}
const pt = {
  get: (e, t, n) => {
    return ut((o = Reflect.get(e, t, n))) ? o.value : o;
    var o;
  },
  set: (e, t, n, o) => {
    const r = e[t];
    return ut(r) && !ut(n) ? ((r.value = n), !0) : Reflect.set(e, t, n, o);
  },
};
function dt(e) {
  return it(e) ? e : new Proxy(e, pt);
}
class ft {
  constructor(e, t) {
    (this._object = e), (this._key = t), (this.__v_isRef = !0);
  }
  get value() {
    return this._object[this._key];
  }
  set value(e) {
    this._object[this._key] = e;
  }
}
class ht {
  constructor(e, t, n) {
    (this._setter = t),
      (this._dirty = !0),
      (this.__v_isRef = !0),
      (this.effect = se(e, {
        lazy: !0,
        scheduler: () => {
          this._dirty || ((this._dirty = !0), he(ct(this), 'set', 'value'));
        },
      })),
      (this.__v_isReadonly = n);
  }
  get value() {
    const e = ct(this);
    return e._dirty && ((e._value = this.effect()), (e._dirty = !1)), fe(e, 'get', 'value'), e._value;
  }
  set value(e) {
    this._setter(e);
  }
}
const mt = [];
function gt(e) {
  mt.push(e);
}
function yt() {
  mt.pop();
}
function vt(e, ...t) {
  pe();
  const n = mt.length ? mt[mt.length - 1].component : null,
    o = n && n.appContext.config.warnHandler,
    r = (function () {
      let e = mt[mt.length - 1];
      if (!e) return [];
      const t = [];
      for (; e; ) {
        const n = t[0];
        n && n.vnode === e ? n.recurseCount++ : t.push({ vnode: e, recurseCount: 0 });
        const o = e.component && e.component.parent;
        e = o && o.vnode;
      }
      return t;
    })();
  if (o) xt(o, n, 11, [e + t.join(''), n && n.proxy, r.map(({ vnode: e }) => `at <${Sr(n, e.type)}>`).join('\n'), r]);
  else {
    const n = [`[Vue warn]: ${e}`, ...t];
    r.length &&
      n.push(
        '\n',
        ...(function (e) {
          const t = [];
          return (
            e.forEach((e, n) => {
              t.push(
                ...(0 === n ? [] : ['\n']),
                ...(function ({ vnode: e, recurseCount: t }) {
                  const n = t > 0 ? `... (${t} recursive calls)` : '',
                    o = !!e.component && null == e.component.parent,
                    r = ` at <${Sr(e.component, e.type, o)}`,
                    s = '>' + n;
                  return e.props ? [r, ...bt(e.props), s] : [r + s];
                })(e),
              );
            }),
            t
          );
        })(r),
      ),
      console.warn(...n);
  }
  de();
}
function bt(e) {
  const t = [],
    n = Object.keys(e);
  return (
    n.slice(0, 3).forEach(n => {
      t.push(..._t(n, e[n]));
    }),
    n.length > 3 && t.push(' ...'),
    t
  );
}
function _t(e, t, n) {
  return I(t)
    ? ((t = JSON.stringify(t)), n ? t : [`${e}=${t}`])
    : 'number' == typeof t || 'boolean' == typeof t || null == t
    ? n
      ? t
      : [`${e}=${t}`]
    : ut(t)
    ? ((t = _t(e, ct(t.value), !0)), n ? t : [`${e}=Ref<`, t, '>'])
    : P(t)
    ? [`${e}=fn${t.name ? `<${t.name}>` : ''}`]
    : ((t = ct(t)), n ? t : [`${e}=`, t]);
}
const wt = {
  bc: 'beforeCreate hook',
  c: 'created hook',
  bm: 'beforeMount hook',
  m: 'mounted hook',
  bu: 'beforeUpdate hook',
  u: 'updated',
  bum: 'beforeUnmount hook',
  um: 'unmounted hook',
  a: 'activated hook',
  da: 'deactivated hook',
  ec: 'errorCaptured hook',
  rtc: 'renderTracked hook',
  rtg: 'renderTriggered hook',
  0: 'setup function',
  1: 'render function',
  2: 'watcher getter',
  3: 'watcher callback',
  4: 'watcher cleanup function',
  5: 'native event handler',
  6: 'component event handler',
  7: 'vnode hook',
  8: 'directive hook',
  9: 'transition hook',
  10: 'app errorHandler',
  11: 'app warnHandler',
  12: 'ref function',
  13: 'async component loader',
  14: 'scheduler flush. This is likely a Vue internals bug. Please open an issue at https://new-issue.vuejs.org/?repo=vuejs/vue-next',
};
function xt(e, t, n, o) {
  let r;
  try {
    r = o ? e(...o) : e();
  } catch (s) {
    $t(s, t, n);
  }
  return r;
}
function kt(e, t, n, o) {
  if (P(e)) {
    const r = xt(e, t, n, o);
    return (
      r &&
        M(r) &&
        r.catch(e => {
          $t(e, t, n);
        }),
      r
    );
  }
  const r = [];
  for (let s = 0; s < e.length; s++) r.push(kt(e[s], t, n, o));
  return r;
}
function $t(e, t, n, o = !0) {
  const r = t ? t.vnode : null;
  if (t) {
    let o = t.parent;
    const r = t.proxy,
      s = wt[n];
    for (; o; ) {
      const t = o.ec;
      if (t) for (let n = 0; n < t.length; n++) if (!1 === t[n](e, r, s)) return;
      o = o.parent;
    }
    const i = t.appContext.config.errorHandler;
    if (i) return void xt(i, null, 10, [e, r, s]);
  }
  !(function (e, t, n, o = !0) {
    {
      const r = wt[t];
      if ((n && gt(n), vt('Unhandled error' + (r ? ` during execution of ${r}` : '')), n && yt(), o)) throw e;
      console.error(e);
    }
  })(e, n, r, o);
}
let St = !1,
  Ct = !1;
const Ot = [];
let jt = 0;
const Et = [];
let Tt = null,
  Pt = 0;
const It = [];
let Ft = null,
  Rt = 0;
const Mt = Promise.resolve();
let At = null,
  Nt = null;
function Vt(e) {
  const t = At || Mt;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Ut(e) {
  if (!((Ot.length && Ot.includes(e, St && e.allowRecurse ? jt + 1 : jt)) || e === Nt)) {
    const t = (function (e) {
      let t = jt + 1,
        n = Ot.length;
      const o = Kt(e);
      for (; t < n; ) {
        const e = (t + n) >>> 1;
        Kt(Ot[e]) < o ? (t = e + 1) : (n = e);
      }
      return t;
    })(e);
    t > -1 ? Ot.splice(t, 0, e) : Ot.push(e), Lt();
  }
}
function Lt() {
  St || Ct || ((Ct = !0), (At = Mt.then(qt)));
}
function Dt(e, t, n, o) {
  j(e) ? n.push(...e) : (t && t.includes(e, e.allowRecurse ? o + 1 : o)) || n.push(e), Lt();
}
function Bt(e) {
  Dt(e, Ft, It, Rt);
}
function Jt(e, t = null) {
  if (Et.length) {
    for (Nt = t, Tt = [...new Set(Et)], Et.length = 0, e = e || new Map(), Pt = 0; Pt < Tt.length; Pt++)
      zt(e, Tt[Pt]), Tt[Pt]();
    (Tt = null), (Pt = 0), (Nt = null), Jt(e, t);
  }
}
function Ht(e) {
  if (It.length) {
    const t = [...new Set(It)];
    if (((It.length = 0), Ft)) return void Ft.push(...t);
    for (Ft = t, e = e || new Map(), Ft.sort((e, t) => Kt(e) - Kt(t)), Rt = 0; Rt < Ft.length; Rt++)
      zt(e, Ft[Rt]), Ft[Rt]();
    (Ft = null), (Rt = 0);
  }
}
const Kt = e => (null == e.id ? 1 / 0 : e.id);
function qt(e) {
  (Ct = !1), (St = !0), Jt((e = e || new Map())), Ot.sort((e, t) => Kt(e) - Kt(t));
  try {
    for (jt = 0; jt < Ot.length; jt++) {
      const t = Ot[jt];
      t && (zt(e, t), xt(t, null, 14));
    }
  } finally {
    (jt = 0), (Ot.length = 0), Ht(e), (St = !1), (At = null), (Ot.length || It.length) && qt(e);
  }
}
function zt(e, t) {
  if (e.has(t)) {
    const n = e.get(t);
    if (n > 100)
      throw new Error(
        'Maximum recursive updates exceeded. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.',
      );
    e.set(t, n + 1);
  } else e.set(t, 1);
}
let Wt = !1;
const Gt = new Set();
('undefined' != typeof global
  ? global
  : 'undefined' != typeof self
  ? self
  : 'undefined' != typeof window
  ? window
  : {}
).__VUE_HMR_RUNTIME__ = {
  createRecord: Zt(Xt),
  rerender: Zt(function (e, t) {
    const n = Yt.get(e);
    if (!n) return;
    t && (n.component.render = t);
    Array.from(n.instances).forEach(e => {
      t && (e.render = t), (e.renderCache = []), (Wt = !0), e.update(), (Wt = !1);
    });
  }),
  reload: Zt(function (e, t) {
    const n = Yt.get(e);
    if (!n) return;
    const { component: o, instances: r } = n;
    if (!Gt.has(o)) {
      (t = Cr(t) ? t.__vccOpts : t), $(o, t);
      for (const e in o) e in t || delete o[e];
      Gt.add(o),
        Bt(() => {
          Gt.delete(o);
        });
    }
    Array.from(r).forEach(e => {
      e.parent
        ? Ut(e.parent.update)
        : e.appContext.reload
        ? e.appContext.reload()
        : 'undefined' != typeof window
        ? window.location.reload()
        : console.warn('[HMR] Root or manually mounted instance modified. Full reload required.');
    });
  }),
};
const Yt = new Map();
function Xt(e, t) {
  return (
    t ||
      (vt(
        'HMR API usage is out of date.\nPlease upgrade vue-loader/vite/rollup-plugin-vue or other relevant dependency that handles Vue SFC compilation.',
      ),
      (t = {})),
    !Yt.has(e) && (Yt.set(e, { component: Cr(t) ? t.__vccOpts : t, instances: new Set() }), !0)
  );
}
function Zt(e) {
  return (t, n) => {
    try {
      return e(t, n);
    } catch (o) {
      console.error(o),
        console.warn('[HMR] Something went wrong during Vue component hot-reload. Full reload required.');
    }
  };
}
let Qt;
const en = on('component:added'),
  tn = on('component:updated'),
  nn = on('component:removed');
function on(e) {
  return t => {
    Qt && Qt.emit(e, t.appContext.app, t.uid, t.parent ? t.parent.uid : void 0, t);
  };
}
function rn(e, t, ...n) {
  const o = e.vnode.props || y;
  {
    const {
      emitsOptions: o,
      propsOptions: [r],
    } = e;
    if (o)
      if (t in o) {
        const e = o[t];
        if (P(e)) {
          e(...n) || vt(`Invalid event arguments: event validation failed for event "${t}".`);
        }
      } else
        (r && W(t) in r) ||
          vt(`Component emitted event "${t}" but it is neither declared in the emits option nor as an "${W(t)}" prop.`);
  }
  let r = n;
  const s = t.startsWith('update:'),
    i = s && t.slice(7);
  if (i && i in o) {
    const e = `${'modelValue' === i ? 'model' : i}Modifiers`,
      { number: t, trim: s } = o[e] || y;
    s ? (r = n.map(e => e.trim())) : t && (r = n.map(Z));
  }
  !(function (e, t, n) {
    Qt && Qt.emit('component:emit', e.appContext.app, e, t, n);
  })(e, t, r);
  {
    const n = t.toLowerCase();
    n !== t &&
      o[W(n)] &&
      vt(
        `Event "${n}" is emitted in component ${Sr(
          e,
          e.type,
        )} but the handler is registered for "${t}". Note that HTML attributes are case-insensitive and you cannot use v-on to listen to camelCase events when using in-DOM templates. You should probably use "${q(
          t,
        )}" instead of "${t}".`,
      );
  }
  let l,
    a = o[(l = W(t))] || o[(l = W(H(t)))];
  !a && s && (a = o[(l = W(q(t)))]), a && kt(a, e, 6, r);
  const c = o[l + 'Once'];
  if (c) {
    if (e.emitted) {
      if (e.emitted[l]) return;
    } else (e.emitted = {})[l] = !0;
    kt(c, e, 6, r);
  }
}
function sn(e, t, n = !1) {
  if (!t.deopt && void 0 !== e.__emits) return e.__emits;
  const o = e.emits;
  let r = {},
    s = !1;
  if (!P(e)) {
    const o = e => {
      const n = sn(e, t, !0);
      n && ((s = !0), $(r, n));
    };
    !n && t.mixins.length && t.mixins.forEach(o), e.extends && o(e.extends), e.mixins && e.mixins.forEach(o);
  }
  return o || s ? (j(o) ? o.forEach(e => (r[e] = null)) : $(r, o), (e.__emits = r)) : (e.__emits = null);
}
function ln(e, t) {
  return (
    !(!e || !x(t)) &&
    ((t = t.slice(2).replace(/Once$/, '')), O(e, t[0].toLowerCase() + t.slice(1)) || O(e, q(t)) || O(e, t))
  );
}
let an = 0;
const cn = e => (an += e);
let un = null,
  pn = null;
function dn(e) {
  const t = un;
  return (un = e), (pn = (e && e.type.__scopeId) || null), t;
}
const fn = e => hn;
function hn(e, t = un) {
  if (!t) return e;
  const n = (...n) => {
    an || Ao(!0);
    const o = dn(t),
      r = e(...n);
    return dn(o), an || No(), r;
  };
  return (n._c = !0), n;
}
let mn = !1;
function gn() {
  mn = !0;
}
function yn(e) {
  const {
    type: t,
    vnode: n,
    proxy: o,
    withProxy: r,
    props: s,
    propsOptions: [i],
    slots: l,
    attrs: a,
    emit: c,
    render: u,
    renderCache: p,
    data: d,
    setupState: f,
    ctx: h,
  } = e;
  let m;
  const g = dn(e);
  mn = !1;
  try {
    let e;
    if (4 & n.shapeFlag) {
      const t = r || o;
      (m = Go(u.call(t, t, p, s, f, d, h))), (e = a);
    } else {
      const n = t;
      a === s && gn(),
        (m = Go(
          n.length > 1
            ? n(s, {
                get attrs() {
                  return gn(), a;
                },
                slots: l,
                emit: c,
              })
            : n(s, null),
        )),
        (e = t.props ? a : _n(a));
    }
    let g,
      y = m;
    if ((m.patchFlag > 0 && 2048 & m.patchFlag && ([y, g] = vn(m)), !1 !== t.inheritAttrs && e)) {
      const t = Object.keys(e),
        { shapeFlag: n } = y;
      if (t.length)
        if (1 & n || 6 & n) i && t.some(k) && (e = wn(e, i)), (y = Ko(y, e));
        else if (!mn && y.type !== Io) {
          const e = Object.keys(a),
            t = [],
            n = [];
          for (let o = 0, r = e.length; o < r; o++) {
            const r = e[o];
            x(r) ? k(r) || t.push(r[2].toLowerCase() + r.slice(3)) : n.push(r);
          }
          n.length &&
            vt(
              `Extraneous non-props attributes (${n.join(
                ', ',
              )}) were passed to component but could not be automatically inherited because component renders fragment or text root nodes.`,
            ),
            t.length &&
              vt(
                `Extraneous non-emits event listeners (${t.join(
                  ', ',
                )}) were passed to component but could not be automatically inherited because component renders fragment or text root nodes. If the listener is intended to be a component custom event listener only, declare it using the "emits" option.`,
              );
        }
    }
    n.dirs &&
      (xn(y) ||
        vt(
          'Runtime directive used on component with non-element root node. The directives will not function as intended.',
        ),
      (y.dirs = y.dirs ? y.dirs.concat(n.dirs) : n.dirs)),
      n.transition &&
        (xn(y) || vt('Component inside <Transition> renders non-element root node that cannot be animated.'),
        (y.transition = n.transition)),
      g ? g(y) : (m = y);
  } catch (y) {
    (Ro.length = 0), $t(y, e, 1), (m = Ho(Io));
  }
  return dn(g), m;
}
const vn = e => {
  const t = e.children,
    n = e.dynamicChildren,
    o = bn(t);
  if (!o) return [e, void 0];
  const r = t.indexOf(o),
    s = n ? n.indexOf(o) : -1;
  return [
    Go(o),
    o => {
      (t[r] = o), n && (s > -1 ? (n[s] = o) : o.patchFlag > 0 && (e.dynamicChildren = [...n, o]));
    },
  ];
};
function bn(e) {
  let t;
  for (let n = 0; n < e.length; n++) {
    const o = e[n];
    if (!Uo(o)) return;
    if (o.type !== Io || 'v-if' === o.children) {
      if (t) return;
      t = o;
    }
  }
  return t;
}
const _n = e => {
    let t;
    for (const n in e) ('class' === n || 'style' === n || x(n)) && ((t || (t = {}))[n] = e[n]);
    return t;
  },
  wn = (e, t) => {
    const n = {};
    for (const o in e) (k(o) && o.slice(9) in t) || (n[o] = e[o]);
    return n;
  },
  xn = e => 6 & e.shapeFlag || 1 & e.shapeFlag || e.type === Io;
function kn(e, t, n) {
  const o = Object.keys(t);
  if (o.length !== Object.keys(e).length) return !0;
  for (let r = 0; r < o.length; r++) {
    const s = o[r];
    if (t[s] !== e[s] && !ln(n, s)) return !0;
  }
  return !1;
}
function $n(e) {
  if ((P(e) && (e = e()), j(e))) {
    const t = bn(e);
    t || vt('<Suspense> slots expect a single root node.'), (e = t);
  }
  return Go(e);
}
function Sn(e, t, n, o = !1) {
  const r = {},
    s = {};
  X(s, Do, 1),
    (e.propsDefaults = Object.create(null)),
    Cn(e, t, r, s),
    Fn(t || {}, r, e),
    n ? (e.props = o ? r : st(r, !1, Ce, We, Qe)) : e.type.props ? (e.props = r) : (e.props = s),
    (e.attrs = s);
}
function Cn(e, t, n, o) {
  const [r, s] = e.propsOptions;
  if (t)
    for (const i in t) {
      const s = t[i];
      if (D(i)) continue;
      let l;
      r && O(r, (l = H(i))) ? (n[l] = s) : ln(e.emitsOptions, i) || (o[i] = s);
    }
  if (s) {
    const t = ct(n);
    for (let o = 0; o < s.length; o++) {
      const i = s[o];
      n[i] = On(r, t, i, t[i], e);
    }
  }
}
function On(e, t, n, o, r) {
  const s = e[n];
  if (null != s) {
    const e = O(s, 'default');
    if (e && void 0 === o) {
      const e = s.default;
      if (s.type !== Function && P(e)) {
        const { propsDefaults: s } = r;
        n in s ? (o = s[n]) : (hr(r), (o = s[n] = e(t)), hr(null));
      } else o = e;
    }
    s[0] && (O(t, n) || e ? !s[1] || ('' !== o && o !== q(n)) || (o = !0) : (o = !1));
  }
  return o;
}
function jn(e, t, n = !1) {
  if (!t.deopt && e.__props) return e.__props;
  const o = e.props,
    r = {},
    s = [];
  let i = !1;
  if (!P(e)) {
    const o = e => {
      i = !0;
      const [n, o] = jn(e, t, !0);
      $(r, n), o && s.push(...o);
    };
    !n && t.mixins.length && t.mixins.forEach(o), e.extends && o(e.extends), e.mixins && e.mixins.forEach(o);
  }
  if (!o && !i) return (e.__props = v);
  if (j(o))
    for (let l = 0; l < o.length; l++) {
      I(o[l]) || vt('props must be strings when using array syntax.', o[l]);
      const e = H(o[l]);
      En(e) && (r[e] = y);
    }
  else if (o) {
    R(o) || vt('invalid props options', o);
    for (const e in o) {
      const t = H(e);
      if (En(t)) {
        const n = o[e],
          i = (r[t] = j(n) || P(n) ? { type: n } : n);
        if (i) {
          const e = In(Boolean, i.type),
            n = In(String, i.type);
          (i[0] = e > -1), (i[1] = n < 0 || e < n), (e > -1 || O(i, 'default')) && s.push(t);
        }
      }
    }
  }
  return (e.__props = [r, s]);
}
function En(e) {
  return '$' !== e[0] || (vt(`Invalid prop name: "${e}" is a reserved property.`), !1);
}
function Tn(e) {
  const t = e && e.toString().match(/^\s*function (\w+)/);
  return t ? t[1] : '';
}
function Pn(e, t) {
  return Tn(e) === Tn(t);
}
function In(e, t) {
  return j(t) ? t.findIndex(t => Pn(t, e)) : P(t) && Pn(t, e) ? 0 : -1;
}
function Fn(e, t, n) {
  const o = ct(t),
    r = n.propsOptions[0];
  for (const s in r) {
    let t = r[s];
    null != t && Rn(s, o[s], t, !O(e, s) && !O(e, q(s)));
  }
}
function Rn(e, t, n, o) {
  const { type: r, required: s, validator: i } = n;
  if (s && o) vt('Missing required prop: "' + e + '"');
  else if (null != t || n.required) {
    if (null != r && !0 !== r) {
      let n = !1;
      const o = j(r) ? r : [r],
        s = [];
      for (let e = 0; e < o.length && !n; e++) {
        const { valid: r, expectedType: i } = An(t, o[e]);
        s.push(i || ''), (n = r);
      }
      if (!n)
        return void vt(
          (function (e, t, n) {
            let o = `Invalid prop: type check failed for prop "${e}". Expected ${n.map(z).join(', ')}`;
            const r = n[0],
              s = V(t),
              i = Nn(t, r),
              l = Nn(t, s);
            1 === n.length &&
              Vn(r) &&
              !(function (...e) {
                return e.some(e => 'boolean' === e.toLowerCase());
              })(r, s) &&
              (o += ` with value ${i}`);
            (o += `, got ${s} `), Vn(s) && (o += `with value ${l}.`);
            return o;
          })(e, t, s),
        );
    }
    i && !i(t) && vt('Invalid prop: custom validator check failed for prop "' + e + '".');
  }
}
const Mn = s('String,Number,Boolean,Function,Symbol,BigInt');
function An(e, t) {
  let n;
  const o = Tn(t);
  if (Mn(o)) {
    const r = typeof e;
    (n = r === o.toLowerCase()), n || 'object' !== r || (n = e instanceof t);
  } else n = 'Object' === o ? R(e) : 'Array' === o ? j(e) : e instanceof t;
  return { valid: n, expectedType: o };
}
function Nn(e, t) {
  return 'String' === t ? `"${e}"` : 'Number' === t ? `${Number(e)}` : `${e}`;
}
function Vn(e) {
  return ['string', 'number', 'boolean'].some(t => e.toLowerCase() === t);
}
function Un(e, t, n = fr, o = !1) {
  if (n) {
    const r = n[e] || (n[e] = []),
      s =
        t.__weh ||
        (t.__weh = (...o) => {
          if (n.isUnmounted) return;
          pe(), hr(n);
          const r = kt(t, n, e, o);
          return hr(null), de(), r;
        });
    return o ? r.unshift(s) : r.push(s), s;
  }
  vt(
    `${W(
      wt[e].replace(/ hook$/, ''),
    )} is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup(). If you are using async setup(), make sure to register lifecycle hooks before the first await statement.`,
  );
}
const Ln =
    e =>
    (t, n = fr) =>
      !vr && Un(e, t, n),
  Dn = Ln('bm'),
  Bn = Ln('m'),
  Jn = Ln('bu'),
  Hn = Ln('u'),
  Kn = Ln('bum'),
  qn = Ln('um'),
  zn = Ln('rtg'),
  Wn = Ln('rtc'),
  Gn = {};
function Yn(e, t, n) {
  return (
    P(t) ||
      vt(
        '`watch(fn, options?)` signature has been moved to a separate API. Use `watchEffect(fn, options?)` instead. `watch` now only supports `watch(source, cb, options?) signature.',
      ),
    Xn(e, t, n)
  );
}
function Xn(e, t, { immediate: n, deep: o, flush: r, onTrack: s, onTrigger: i } = y, l = fr) {
  t ||
    (void 0 !== n &&
      vt('watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.'),
    void 0 !== o &&
      vt('watch() "deep" option is only respected when using the watch(source, callback, options?) signature.'));
  const a = e => {
    vt(
      'Invalid watch source: ',
      e,
      'A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types.',
    );
  };
  let c,
    u,
    p = !1;
  if (
    (ut(e)
      ? ((c = () => e.value), (p = !!e._shallow))
      : it(e)
      ? ((c = () => e), (o = !0))
      : j(e)
      ? (c = () => e.map(e => (ut(e) ? e.value : it(e) ? Qn(e) : P(e) ? xt(e, l, 2, [l && l.proxy]) : void a(e))))
      : P(e)
      ? (c = t
          ? () => xt(e, l, 2, [l && l.proxy])
          : () => {
              if (!l || !l.isUnmounted) return u && u(), kt(e, l, 3, [d]);
            })
      : ((c = b), a(e)),
    t && o)
  ) {
    const e = c;
    c = () => Qn(e());
  }
  let d = e => {
      u = g.options.onStop = () => {
        xt(e, l, 4);
      };
    },
    f = j(e) ? [] : Gn;
  const h = () => {
    if (g.active)
      if (t) {
        const e = g();
        (o || p || G(e, f)) && (u && u(), kt(t, l, 3, [e, f === Gn ? void 0 : f, d]), (f = e));
      } else g();
  };
  let m;
  (h.allowRecurse = !!t),
    (m =
      'sync' === r
        ? h
        : 'post' === r
        ? () => xo(h, l && l.suspense)
        : () => {
            !l || l.isMounted
              ? (function (e) {
                  Dt(e, Tt, Et, Pt);
                })(h)
              : h();
          });
  const g = se(c, { lazy: !0, onTrack: s, onTrigger: i, scheduler: m });
  return (
    xr(g, l),
    t ? (n ? h() : (f = g())) : 'post' === r ? xo(g, l && l.suspense) : g(),
    () => {
      ie(g), l && S(l.effects, g);
    }
  );
}
function Zn(e, t, n) {
  const o = this.proxy;
  return Xn(I(e) ? () => o[e] : e.bind(o), t.bind(o), n, this);
}
function Qn(e, t = new Set()) {
  if (!R(e) || t.has(e)) return e;
  if ((t.add(e), ut(e))) Qn(e.value, t);
  else if (j(e)) for (let n = 0; n < e.length; n++) Qn(e[n], t);
  else if (T(e) || E(e))
    e.forEach(e => {
      Qn(e, t);
    });
  else for (const n in e) Qn(e[n], t);
  return e;
}
const eo = e => e.type.__isKeepAlive;
function to(e, t, n = fr) {
  const o =
    e.__wdc ||
    (e.__wdc = () => {
      let t = n;
      for (; t; ) {
        if (t.isDeactivated) return;
        t = t.parent;
      }
      e();
    });
  if ((Un(t, o, n), n)) {
    let e = n.parent;
    for (; e && e.parent; ) eo(e.parent.vnode) && no(o, t, n, e), (e = e.parent);
  }
}
function no(e, t, n, o) {
  const r = Un(t, e, o, !0);
  qn(() => {
    S(o[t], r);
  }, n);
}
const oo = e => '_' === e[0] || '$stable' === e,
  ro = e => (j(e) ? e.map(Go) : [Go(e)]),
  so = (e, t, n) =>
    hn(
      n => (
        fr &&
          vt(
            `Slot "${e}" invoked outside of the render function: this will not track dependencies used in the slot. Invoke the slot function inside the render function instead.`,
          ),
        ro(t(n))
      ),
      n,
    ),
  io = (e, t) => {
    const n = e._ctx;
    for (const o in e) {
      if (oo(o)) continue;
      const r = e[o];
      if (P(r)) t[o] = so(o, r, n);
      else if (null != r) {
        vt(`Non-function value encountered for slot "${o}". Prefer function slots for better performance.`);
        const e = ro(r);
        t[o] = () => e;
      }
    }
  },
  lo = (e, t) => {
    eo(e.vnode) || vt('Non-function value encountered for default slot. Prefer function slots for better performance.');
    const n = ro(t);
    e.slots.default = () => n;
  },
  ao = s('bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text');
function co(e) {
  ao(e) && vt('Do not use built-in directive ids as custom directive id: ' + e);
}
function uo(e, t) {
  const n = un;
  if (null === n) return vt('withDirectives can only be used inside render functions.'), e;
  const o = n.proxy,
    r = e.dirs || (e.dirs = []);
  for (let s = 0; s < t.length; s++) {
    let [e, n, i, l = y] = t[s];
    P(e) && (e = { mounted: e, updated: e }),
      r.push({ dir: e, instance: o, value: n, oldValue: void 0, arg: i, modifiers: l });
  }
  return e;
}
function po(e, t, n, o) {
  const r = e.dirs,
    s = t && t.dirs;
  for (let i = 0; i < r.length; i++) {
    const l = r[i];
    s && (l.oldValue = s[i].value);
    const a = l.dir[o];
    a && kt(a, n, 8, [e.el, l, e, t]);
  }
}
function fo() {
  return {
    app: null,
    config: {
      isNativeTag: _,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      isCustomElement: _,
      errorHandler: void 0,
      warnHandler: void 0,
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
  };
}
let ho,
  mo,
  go = 0;
function yo(e, t) {
  return function (n, o = null) {
    null == o || R(o) || (vt('root props passed to app.mount() must be an object.'), (o = null));
    const r = fo(),
      s = new Set();
    let i = !1;
    const l = (r.app = {
      _uid: go++,
      _component: n,
      _props: o,
      _container: null,
      _context: r,
      version: Er,
      get config() {
        return r.config;
      },
      set config(e) {
        vt('app.config cannot be replaced. Modify individual options instead.');
      },
      use: (e, ...t) => (
        s.has(e)
          ? vt('Plugin has already been applied to target app.')
          : e && P(e.install)
          ? (s.add(e), e.install(l, ...t))
          : P(e)
          ? (s.add(e), e(l, ...t))
          : vt('A plugin must either be a function or an object with an "install" function.'),
        l
      ),
      mixin: e => (
        r.mixins.includes(e)
          ? vt('Mixin has already been applied to target app' + (e.name ? `: ${e.name}` : ''))
          : (r.mixins.push(e), (e.props || e.emits) && (r.deopt = !0)),
        l
      ),
      component: (e, t) => (
        gr(e, r.config),
        t
          ? (r.components[e] && vt(`Component "${e}" has already been registered in target app.`),
            (r.components[e] = t),
            l)
          : r.components[e]
      ),
      directive: (e, t) => (
        co(e),
        t
          ? (r.directives[e] && vt(`Directive "${e}" has already been registered in target app.`),
            (r.directives[e] = t),
            l)
          : r.directives[e]
      ),
      mount(s, a, c) {
        if (!i) {
          const u = Ho(n, o);
          return (
            (u.appContext = r),
            (r.reload = () => {
              e(Ko(u), s, c);
            }),
            a && t ? t(u, s) : e(u, s, c),
            (i = !0),
            (l._container = s),
            (s.__vue_app__ = l),
            (function (e, t) {
              Qt && Qt.emit('app:init', e, t, { Fragment: To, Text: Po, Comment: Io, Static: Fo });
            })(l, Er),
            u.component.proxy
          );
        }
        vt(
          'App has already been mounted.\nIf you want to remount the same app, move your app creation logic into a factory function and create fresh app instances for each mount - e.g. `const createMyApp = () => createApp(App)`',
        );
      },
      unmount() {
        i
          ? (e(null, l._container),
            (function (e) {
              Qt && Qt.emit('app:unmount', e);
            })(l),
            delete l._container.__vue_app__)
          : vt('Cannot unmount an app that is not mounted.');
      },
      provide: (e, t) => (
        e in r.provides &&
          vt(`App already provides property with key "${String(e)}". It will be overwritten with the new value.`),
        (r.provides[e] = t),
        l
      ),
    });
    return l;
  };
}
function vo(e, t) {
  e.appContext.config.performance && _o() && mo.mark(`vue-${t}-${e.uid}`);
}
function bo(e, t) {
  if (e.appContext.config.performance && _o()) {
    const n = `vue-${t}-${e.uid}`,
      o = n + ':end';
    mo.mark(o), mo.measure(`<${Sr(e, e.type)}> ${t}`, n, o), mo.clearMarks(n), mo.clearMarks(o);
  }
}
function _o() {
  return (
    void 0 !== ho ||
      ('undefined' != typeof window && window.performance ? ((ho = !0), (mo = window.performance)) : (ho = !1)),
    ho
  );
}
function wo(e) {
  return P(e) ? { setup: e, name: e.name } : e;
}
const xo = function (e, t) {
    t && t.pendingBranch ? (j(e) ? t.effects.push(...e) : t.effects.push(e)) : Bt(e);
  },
  ko = (e, t, n, o) => {
    if (j(e)) return void e.forEach((e, r) => ko(e, t && (j(t) ? t[r] : t), n, o));
    let r;
    if (o) {
      if (o.type.__asyncLoader) return;
      r = 4 & o.shapeFlag ? o.component.exposed || o.component.proxy : o.el;
    } else r = null;
    const { i: s, r: i } = e;
    if (!s)
      return void vt(
        'Missing ref owner context. ref cannot be used on hoisted vnodes. A vnode with ref must be created inside the render function.',
      );
    const l = t && t.r,
      a = s.refs === y ? (s.refs = {}) : s.refs,
      c = s.setupState;
    if (
      (null != l && l !== i && (I(l) ? ((a[l] = null), O(c, l) && (c[l] = null)) : ut(l) && (l.value = null)), I(i))
    ) {
      const e = () => {
        (a[i] = r), O(c, i) && (c[i] = r);
      };
      r ? ((e.id = -1), xo(e, n)) : e();
    } else if (ut(i)) {
      const e = () => {
        i.value = r;
      };
      r ? ((e.id = -1), xo(e, n)) : e();
    } else P(i) ? xt(i, s, 12, [r, a]) : vt('Invalid template ref type:', r, `(${typeof r})`);
  };
function $o(e) {
  return (function (e, t) {
    {
      const e =
        Q ||
        (Q =
          'undefined' != typeof globalThis
            ? globalThis
            : 'undefined' != typeof self
            ? self
            : 'undefined' != typeof window
            ? window
            : 'undefined' != typeof global
            ? global
            : {});
      (e.__VUE__ = !0), (n = e.__VUE_DEVTOOLS_GLOBAL_HOOK__), (Qt = n);
    }
    var n;
    const {
        insert: o,
        remove: r,
        patchProp: s,
        forcePatchProp: i,
        createElement: l,
        createText: a,
        createComment: c,
        setText: u,
        setElementText: p,
        parentNode: d,
        nextSibling: f,
        setScopeId: h = b,
        cloneNode: m,
        insertStaticContent: g,
      } = e,
      _ = (e, t, n, o = null, r = null, s = null, i = !1, l = null, a = !1) => {
        e && !Lo(e, t) && ((o = re(e)), Z(e, r, s, !0), (e = null)),
          -2 === t.patchFlag && ((a = !1), (t.dynamicChildren = null));
        const { type: c, ref: u, shapeFlag: p } = t;
        switch (c) {
          case Po:
            w(e, t, n, o);
            break;
          case Io:
            x(e, t, n, o);
            break;
          case Fo:
            null == e ? k(t, n, o, i) : S(e, t, n, i);
            break;
          case To:
            N(e, t, n, o, r, s, i, l, a);
            break;
          default:
            1 & p
              ? E(e, t, n, o, r, s, i, l, a)
              : 6 & p
              ? V(e, t, n, o, r, s, i, l, a)
              : 64 & p || 128 & p
              ? c.process(e, t, n, o, r, s, i, l, a, ae)
              : vt('Invalid VNode type:', c, `(${typeof c})`);
        }
        null != u && r && ko(u, e && e.ref, s, t);
      },
      w = (e, t, n, r) => {
        if (null == e) o((t.el = a(t.children)), n, r);
        else {
          const n = (t.el = e.el);
          t.children !== e.children && u(n, t.children);
        }
      },
      x = (e, t, n, r) => {
        null == e ? o((t.el = c(t.children || '')), n, r) : (t.el = e.el);
      },
      k = (e, t, n, o) => {
        [e.el, e.anchor] = g(e.children, t, n, o);
      },
      S = (e, t, n, o) => {
        if (t.children !== e.children) {
          const r = f(e.anchor);
          j(e), ([t.el, t.anchor] = g(t.children, n, r, o));
        } else (t.el = e.el), (t.anchor = e.anchor);
      },
      C = ({ el: e, anchor: t }, n, r) => {
        let s;
        for (; e && e !== t; ) (s = f(e)), o(e, n, r), (e = s);
        o(t, n, r);
      },
      j = ({ el: e, anchor: t }) => {
        let n;
        for (; e && e !== t; ) (n = f(e)), r(e), (e = n);
        r(t);
      },
      E = (e, t, n, o, r, s, i, l, a) => {
        (i = i || 'svg' === t.type), null == e ? T(t, n, o, r, s, i, l, a) : F(e, t, r, s, i, l, a);
      },
      T = (e, t, n, r, i, a, c, u) => {
        let d, f;
        const { type: h, props: m, shapeFlag: g, transition: y, patchFlag: v, dirs: b } = e;
        if (
          ((d = e.el = l(e.type, a, m && m.is, m)),
          8 & g
            ? p(d, e.children)
            : 16 & g && I(e.children, d, null, r, i, a && 'foreignObject' !== h, c, u || !!e.dynamicChildren),
          b && po(e, null, r, 'created'),
          m)
        ) {
          for (const t in m) D(t) || s(d, t, null, m[t], a, e.children, r, i, oe);
          (f = m.onVnodeBeforeMount) && So(f, r, e);
        }
        P(d, e, e.scopeId, c, r),
          Object.defineProperty(d, '__vnode', { value: e, enumerable: !1 }),
          Object.defineProperty(d, '__vueParentComponent', { value: r, enumerable: !1 }),
          b && po(e, null, r, 'beforeMount');
        const _ = (!i || (i && !i.pendingBranch)) && y && !y.persisted;
        _ && y.beforeEnter(d),
          o(d, t, n),
          ((f = m && m.onVnodeMounted) || _ || b) &&
            xo(() => {
              f && So(f, r, e), _ && y.enter(d), b && po(e, null, r, 'mounted');
            }, i);
      },
      P = (e, t, n, o, r) => {
        if ((n && h(e, n), o)) for (let s = 0; s < o.length; s++) h(e, o[s]);
        if (r) {
          let n = r.subTree;
          if ((n.patchFlag > 0 && 2048 & n.patchFlag && (n = bn(n.children) || n), t === n)) {
            const t = r.vnode;
            P(e, t, t.scopeId, t.slotScopeIds, r.parent);
          }
        }
      },
      I = (e, t, n, o, r, s, i, l, a = 0) => {
        for (let c = a; c < e.length; c++) {
          const a = (e[c] = i ? Yo(e[c]) : Go(e[c]));
          _(null, a, t, n, o, r, s, i, l);
        }
      },
      F = (e, t, n, o, r, l, a) => {
        const c = (t.el = e.el);
        let { patchFlag: u, dynamicChildren: d, dirs: f } = t;
        u |= 16 & e.patchFlag;
        const h = e.props || y,
          m = t.props || y;
        let g;
        if (
          ((g = m.onVnodeBeforeUpdate) && So(g, n, t, e),
          f && po(t, e, n, 'beforeUpdate'),
          Wt && ((u = 0), (a = !1), (d = null)),
          u > 0)
        ) {
          if (16 & u) A(c, t, h, m, n, o, r);
          else if (
            (2 & u && h.class !== m.class && s(c, 'class', null, m.class, r),
            4 & u && s(c, 'style', h.style, m.style, r),
            8 & u)
          ) {
            const l = t.dynamicProps;
            for (let t = 0; t < l.length; t++) {
              const a = l[t],
                u = h[a],
                p = m[a];
              (p !== u || (i && i(c, a))) && s(c, a, u, p, r, e.children, n, o, oe);
            }
          }
          1 & u && e.children !== t.children && p(c, t.children);
        } else a || null != d || A(c, t, h, m, n, o, r);
        const v = r && 'foreignObject' !== t.type;
        d
          ? (R(e.dynamicChildren, d, c, n, o, v, l), n && n.type.__hmrId && Co(e, t))
          : a || K(e, t, c, null, n, o, v, l, !1),
          ((g = m.onVnodeUpdated) || f) &&
            xo(() => {
              g && So(g, n, t, e), f && po(t, e, n, 'updated');
            }, o);
      },
      R = (e, t, n, o, r, s, i) => {
        for (let l = 0; l < t.length; l++) {
          const a = e[l],
            c = t[l],
            u = a.type === To || !Lo(a, c) || 6 & a.shapeFlag || 64 & a.shapeFlag ? d(a.el) : n;
          _(a, c, u, null, o, r, s, i, !0);
        }
      },
      A = (e, t, n, o, r, l, a) => {
        if (n !== o) {
          for (const c in o) {
            if (D(c)) continue;
            const u = o[c],
              p = n[c];
            (u !== p || (i && i(e, c))) && s(e, c, p, u, a, t.children, r, l, oe);
          }
          if (n !== y) for (const i in n) D(i) || i in o || s(e, i, n[i], null, a, t.children, r, l, oe);
        }
      },
      N = (e, t, n, r, s, i, l, c, u) => {
        const p = (t.el = e ? e.el : a('')),
          d = (t.anchor = e ? e.anchor : a(''));
        let { patchFlag: f, dynamicChildren: h, slotScopeIds: m } = t;
        f > 0 && (u = !0),
          m && (c = c ? c.concat(m) : m),
          Wt && ((f = 0), (u = !1), (h = null)),
          null == e
            ? (o(p, n, r), o(d, n, r), I(t.children, n, d, s, i, l, c, u))
            : f > 0 && 64 & f && h && e.dynamicChildren
            ? (R(e.dynamicChildren, h, n, s, i, l, c),
              s && s.type.__hmrId ? Co(e, t) : (null != t.key || (s && t === s.subTree)) && Co(e, t, !0))
            : K(e, t, n, d, s, i, l, c, u);
      },
      V = (e, t, n, o, r, s, i, l, a) => {
        (t.slotScopeIds = l),
          null == e ? (512 & t.shapeFlag ? r.ctx.activate(t, n, o, i, a) : U(t, n, o, r, s, i, a)) : L(e, t, a);
      },
      U = (e, t, n, o, r, s, i) => {
        const l = (e.component = (function (e, t, n) {
          const o = e.type,
            r = (t ? t.appContext : e.appContext) || pr,
            s = {
              uid: dr++,
              vnode: e,
              type: o,
              parent: t,
              appContext: r,
              root: null,
              next: null,
              subTree: null,
              update: null,
              render: null,
              proxy: null,
              exposed: null,
              withProxy: null,
              effects: null,
              provides: t ? t.provides : Object.create(r.provides),
              accessCache: null,
              renderCache: [],
              components: null,
              directives: null,
              propsOptions: jn(o, r),
              emitsOptions: sn(o, r),
              emit: null,
              emitted: null,
              propsDefaults: y,
              ctx: y,
              data: y,
              props: y,
              attrs: y,
              slots: y,
              refs: y,
              setupState: y,
              setupContext: null,
              suspense: n,
              suspenseId: n ? n.pendingId : 0,
              asyncDep: null,
              asyncResolved: !1,
              isMounted: !1,
              isUnmounted: !1,
              isDeactivated: !1,
              bc: null,
              c: null,
              bm: null,
              m: null,
              bu: null,
              u: null,
              um: null,
              bum: null,
              da: null,
              a: null,
              rtg: null,
              rtc: null,
              ec: null,
            };
          return (
            (s.ctx = (function (e) {
              const t = {};
              Object.defineProperty(t, '_', { configurable: !0, enumerable: !1, get: () => e }),
                Object.keys(ar).forEach(n => {
                  Object.defineProperty(t, n, { configurable: !0, enumerable: !1, get: () => ar[n](e), set: b });
                });
              const { globalProperties: n } = e.appContext.config;
              return (
                Object.keys(n).forEach(e => {
                  Object.defineProperty(t, e, { configurable: !0, enumerable: !1, get: () => n[e], set: b });
                }),
                t
              );
            })(s)),
            (s.root = t ? t.root : s),
            (s.emit = rn.bind(null, s)),
            s
          );
        })(e, o, r));
        if (
          (l.type.__hmrId &&
            (function (e) {
              const t = e.type.__hmrId;
              let n = Yt.get(t);
              n || (Xt(t, e.type), (n = Yt.get(t))), n.instances.add(e);
            })(l),
          gt(e),
          vo(l, 'mount'),
          eo(e) && (l.ctx.renderer = ae),
          vo(l, 'init'),
          (function (e, t = !1) {
            vr = t;
            const { props: n, children: o } = e.vnode,
              r = yr(e);
            Sn(e, n, r, t),
              ((e, t) => {
                if (32 & e.vnode.shapeFlag) {
                  const n = t._;
                  n ? ((e.slots = t), X(t, '_', n)) : io(t, (e.slots = {}));
                } else (e.slots = {}), t && lo(e, t);
                X(e.slots, Do, 1);
              })(e, o);
            const s = r
              ? (function (e, t) {
                  const n = e.type;
                  n.name && gr(n.name, e.appContext.config);
                  if (n.components) {
                    const t = Object.keys(n.components);
                    for (let n = 0; n < t.length; n++) gr(t[n], e.appContext.config);
                  }
                  if (n.directives) {
                    const e = Object.keys(n.directives);
                    for (let t = 0; t < e.length; t++) co(e[t]);
                  }
                  (e.accessCache = Object.create(null)),
                    (e.proxy = new Proxy(e.ctx, cr)),
                    (function (e) {
                      const {
                        ctx: t,
                        propsOptions: [n],
                      } = e;
                      n &&
                        Object.keys(n).forEach(n => {
                          Object.defineProperty(t, n, {
                            enumerable: !0,
                            configurable: !0,
                            get: () => e.props[n],
                            set: b,
                          });
                        });
                    })(e);
                  const { setup: o } = n;
                  if (o) {
                    const n = (e.setupContext =
                      o.length > 1
                        ? (function (e) {
                            const t = t => {
                              e.exposed && vt('expose() should be called only once per setup().'), (e.exposed = dt(t));
                            };
                            return Object.freeze({
                              get attrs() {
                                return new Proxy(e.attrs, wr);
                              },
                              get slots() {
                                return rt(e.slots);
                              },
                              get emit() {
                                return (t, ...n) => e.emit(t, ...n);
                              },
                              expose: t,
                            });
                          })(e)
                        : null);
                    (fr = e), pe();
                    const r = xt(o, e, 0, [rt(e.props), n]);
                    if ((de(), (fr = null), M(r))) {
                      if (t)
                        return r
                          .then(n => {
                            br(e, n, t);
                          })
                          .catch(t => {
                            $t(t, e, 0);
                          });
                      e.asyncDep = r;
                    } else br(e, r, t);
                  } else _r(e, t);
                })(e, t)
              : void 0;
            vr = !1;
          })(l),
          bo(l, 'init'),
          l.asyncDep)
        ) {
          if ((r && r.registerDep(l, B), !e.el)) {
            const e = (l.subTree = Ho(Io));
            x(null, e, t, n);
          }
        } else B(l, e, t, n, r, s, i), yt(), bo(l, 'mount');
      },
      L = (e, t, n) => {
        const o = (t.component = e.component);
        if (
          (function (e, t, n) {
            const { props: o, children: r, component: s } = e,
              { props: i, children: l, patchFlag: a } = t,
              c = s.emitsOptions;
            if ((r || l) && Wt) return !0;
            if (t.dirs || t.transition) return !0;
            if (!(n && a >= 0)) return !((!r && !l) || (l && l.$stable)) || (o !== i && (o ? !i || kn(o, i, c) : !!i));
            if (1024 & a) return !0;
            if (16 & a) return o ? kn(o, i, c) : !!i;
            if (8 & a) {
              const e = t.dynamicProps;
              for (let t = 0; t < e.length; t++) {
                const n = e[t];
                if (i[n] !== o[n] && !ln(c, n)) return !0;
              }
            }
            return !1;
          })(e, t, n)
        ) {
          if (o.asyncDep && !o.asyncResolved) return gt(t), J(o, t, n), void yt();
          (o.next = t),
            (function (e) {
              const t = Ot.indexOf(e);
              t > jt && Ot.splice(t, 1);
            })(o.update),
            o.update();
        } else (t.component = e.component), (t.el = e.el), (o.vnode = t);
      },
      B = (e, t, n, o, r, s, i) => {
        e.update = se(
          function () {
            if (e.isMounted) {
              let t,
                { next: n, bu: o, u: l, parent: a, vnode: c } = e,
                u = n;
              gt(n || e.vnode),
                n ? ((n.el = c.el), J(e, n, i)) : (n = c),
                o && Y(o),
                (t = n.props && n.props.onVnodeBeforeUpdate) && So(t, a, n, c),
                vo(e, 'render');
              const p = yn(e);
              bo(e, 'render');
              const f = e.subTree;
              (e.subTree = p),
                vo(e, 'patch'),
                _(f, p, d(f.el), re(f), e, r, s),
                bo(e, 'patch'),
                (n.el = p.el),
                null === u &&
                  (function ({ vnode: e, parent: t }, n) {
                    for (; t && t.subTree === e; ) ((e = t.vnode).el = n), (t = t.parent);
                  })(e, p.el),
                l && xo(l, r),
                (t = n.props && n.props.onVnodeUpdated) &&
                  xo(() => {
                    So(t, a, n, c);
                  }, r),
                tn(e),
                yt();
            } else {
              let i;
              const { el: l, props: a } = t,
                { bm: c, m: u, parent: p } = e;
              c && Y(c), (i = a && a.onVnodeBeforeMount) && So(i, p, t), vo(e, 'render');
              const d = (e.subTree = yn(e));
              if (
                (bo(e, 'render'),
                l && ue
                  ? (vo(e, 'hydrate'), ue(t.el, d, e, r, null), bo(e, 'hydrate'))
                  : (vo(e, 'patch'), _(null, d, n, o, e, r, s), bo(e, 'patch'), (t.el = d.el)),
                u && xo(u, r),
                (i = a && a.onVnodeMounted))
              ) {
                const e = t;
                xo(() => {
                  So(i, p, e);
                }, r);
              }
              const { a: f } = e;
              f && 256 & t.shapeFlag && xo(f, r), (e.isMounted = !0), en(e), (t = n = o = null);
            }
          },
          (function (e) {
            return {
              scheduler: Ut,
              allowRecurse: !0,
              onTrack: e.rtc ? t => Y(e.rtc, t) : void 0,
              onTrigger: e.rtg ? t => Y(e.rtg, t) : void 0,
            };
          })(e),
        );
      },
      J = (e, t, n) => {
        t.component = e;
        const o = e.vnode.props;
        (e.vnode = t),
          (e.next = null),
          (function (e, t, n, o) {
            const {
                props: r,
                attrs: s,
                vnode: { patchFlag: i },
              } = e,
              l = ct(r),
              [a] = e.propsOptions;
            if (e.type.__hmrId || (e.parent && e.parent.type.__hmrId) || !(o || i > 0) || 16 & i) {
              let o;
              Cn(e, t, r, s);
              for (const s in l)
                (t && (O(t, s) || ((o = q(s)) !== s && O(t, o)))) ||
                  (a
                    ? !n || (void 0 === n[s] && void 0 === n[o]) || (r[s] = On(a, t || y, s, void 0, e))
                    : delete r[s]);
              if (s !== l) for (const e in s) (t && O(t, e)) || delete s[e];
            } else if (8 & i) {
              const n = e.vnode.dynamicProps;
              for (let o = 0; o < n.length; o++) {
                const i = n[o],
                  c = t[i];
                if (a)
                  if (O(s, i)) s[i] = c;
                  else {
                    const t = H(i);
                    r[t] = On(a, l, t, c, e);
                  }
                else s[i] = c;
              }
            }
            he(e, 'set', '$attrs'), Fn(t || {}, r, e);
          })(e, t.props, o, n),
          ((e, t, n) => {
            const { vnode: o, slots: r } = e;
            let s = !0,
              i = y;
            if (32 & o.shapeFlag) {
              const e = t._;
              e
                ? Wt
                  ? $(r, t)
                  : n && 1 === e
                  ? (s = !1)
                  : ($(r, t), n || 1 !== e || delete r._)
                : ((s = !t.$stable), io(t, r)),
                (i = t);
            } else t && (lo(e, t), (i = { default: 1 }));
            if (s) for (const l in r) oo(l) || l in i || delete r[l];
          })(e, t.children, n),
          pe(),
          Jt(void 0, e.update),
          de();
      },
      K = (e, t, n, o, r, s, i, l, a = !1) => {
        const c = e && e.children,
          u = e ? e.shapeFlag : 0,
          d = t.children,
          { patchFlag: f, shapeFlag: h } = t;
        if (f > 0) {
          if (128 & f) return void W(c, d, n, o, r, s, i, l, a);
          if (256 & f) return void z(c, d, n, o, r, s, i, l, a);
        }
        8 & h
          ? (16 & u && oe(c, r, s), d !== c && p(n, d))
          : 16 & u
          ? 16 & h
            ? W(c, d, n, o, r, s, i, l, a)
            : oe(c, r, s, !0)
          : (8 & u && p(n, ''), 16 & h && I(d, n, o, r, s, i, l, a));
      },
      z = (e, t, n, o, r, s, i, l, a) => {
        t = t || v;
        const c = (e = e || v).length,
          u = t.length,
          p = Math.min(c, u);
        let d;
        for (d = 0; d < p; d++) {
          const o = (t[d] = a ? Yo(t[d]) : Go(t[d]));
          _(e[d], o, n, null, r, s, i, l, a);
        }
        c > u ? oe(e, r, s, !0, !1, p) : I(t, n, o, r, s, i, l, a, p);
      },
      W = (e, t, n, o, r, s, i, l, a) => {
        let c = 0;
        const u = t.length;
        let p = e.length - 1,
          d = u - 1;
        for (; c <= p && c <= d; ) {
          const o = e[c],
            u = (t[c] = a ? Yo(t[c]) : Go(t[c]));
          if (!Lo(o, u)) break;
          _(o, u, n, null, r, s, i, l, a), c++;
        }
        for (; c <= p && c <= d; ) {
          const o = e[p],
            c = (t[d] = a ? Yo(t[d]) : Go(t[d]));
          if (!Lo(o, c)) break;
          _(o, c, n, null, r, s, i, l, a), p--, d--;
        }
        if (c > p) {
          if (c <= d) {
            const e = d + 1,
              p = e < u ? t[e].el : o;
            for (; c <= d; ) _(null, (t[c] = a ? Yo(t[c]) : Go(t[c])), n, p, r, s, i, l, a), c++;
          }
        } else if (c > d) for (; c <= p; ) Z(e[c], r, s, !0), c++;
        else {
          const f = c,
            h = c,
            m = new Map();
          for (c = h; c <= d; c++) {
            const e = (t[c] = a ? Yo(t[c]) : Go(t[c]));
            null != e.key &&
              (m.has(e.key) &&
                vt('Duplicate keys found during update:', JSON.stringify(e.key), 'Make sure keys are unique.'),
              m.set(e.key, c));
          }
          let g,
            y = 0;
          const b = d - h + 1;
          let w = !1,
            x = 0;
          const k = new Array(b);
          for (c = 0; c < b; c++) k[c] = 0;
          for (c = f; c <= p; c++) {
            const o = e[c];
            if (y >= b) {
              Z(o, r, s, !0);
              continue;
            }
            let u;
            if (null != o.key) u = m.get(o.key);
            else
              for (g = h; g <= d; g++)
                if (0 === k[g - h] && Lo(o, t[g])) {
                  u = g;
                  break;
                }
            void 0 === u
              ? Z(o, r, s, !0)
              : ((k[u - h] = c + 1), u >= x ? (x = u) : (w = !0), _(o, t[u], n, null, r, s, i, l, a), y++);
          }
          const $ = w
            ? (function (e) {
                const t = e.slice(),
                  n = [0];
                let o, r, s, i, l;
                const a = e.length;
                for (o = 0; o < a; o++) {
                  const a = e[o];
                  if (0 !== a) {
                    if (((r = n[n.length - 1]), e[r] < a)) {
                      (t[o] = r), n.push(o);
                      continue;
                    }
                    for (s = 0, i = n.length - 1; s < i; ) (l = ((s + i) / 2) | 0), e[n[l]] < a ? (s = l + 1) : (i = l);
                    a < e[n[s]] && (s > 0 && (t[o] = n[s - 1]), (n[s] = o));
                  }
                }
                (s = n.length), (i = n[s - 1]);
                for (; s-- > 0; ) (n[s] = i), (i = t[i]);
                return n;
              })(k)
            : v;
          for (g = $.length - 1, c = b - 1; c >= 0; c--) {
            const e = h + c,
              p = t[e],
              d = e + 1 < u ? t[e + 1].el : o;
            0 === k[c] ? _(null, p, n, d, r, s, i, l, a) : w && (g < 0 || c !== $[g] ? G(p, n, d, 2) : g--);
          }
        }
      },
      G = (e, t, n, r, s = null) => {
        const { el: i, type: l, transition: a, children: c, shapeFlag: u } = e;
        if (6 & u) return void G(e.component.subTree, t, n, r);
        if (128 & u) return void e.suspense.move(t, n, r);
        if (64 & u) return void l.move(e, t, n, ae);
        if (l === To) {
          o(i, t, n);
          for (let e = 0; e < c.length; e++) G(c[e], t, n, r);
          return void o(e.anchor, t, n);
        }
        if (l === Fo) return void C(e, t, n);
        if (2 !== r && 1 & u && a)
          if (0 === r) a.beforeEnter(i), o(i, t, n), xo(() => a.enter(i), s);
          else {
            const { leave: e, delayLeave: r, afterLeave: s } = a,
              l = () => o(i, t, n),
              c = () => {
                e(i, () => {
                  l(), s && s();
                });
              };
            r ? r(i, l, c) : c();
          }
        else o(i, t, n);
      },
      Z = (e, t, n, o = !1, r = !1) => {
        const { type: s, props: i, ref: l, children: a, dynamicChildren: c, shapeFlag: u, patchFlag: p, dirs: d } = e;
        if ((null != l && ko(l, null, n, null), 256 & u)) return void t.ctx.deactivate(e);
        const f = 1 & u && d;
        let h;
        if (((h = i && i.onVnodeBeforeUnmount) && So(h, t, e), 6 & u)) ne(e.component, n, o);
        else {
          if (128 & u) return void e.suspense.unmount(n, o);
          f && po(e, null, t, 'beforeUnmount'),
            64 & u
              ? e.type.remove(e, t, n, r, ae, o)
              : c && (s !== To || (p > 0 && 64 & p))
              ? oe(c, t, n, !1, !0)
              : ((s === To && (128 & p || 256 & p)) || (!r && 16 & u)) && oe(a, t, n),
            o && ee(e);
        }
        ((h = i && i.onVnodeUnmounted) || f) &&
          xo(() => {
            h && So(h, t, e), f && po(e, null, t, 'unmounted');
          }, n);
      },
      ee = e => {
        const { type: t, el: n, anchor: o, transition: s } = e;
        if (t === To) return void te(n, o);
        if (t === Fo) return void j(e);
        const i = () => {
          r(n), s && !s.persisted && s.afterLeave && s.afterLeave();
        };
        if (1 & e.shapeFlag && s && !s.persisted) {
          const { leave: t, delayLeave: o } = s,
            r = () => t(n, i);
          o ? o(e.el, i, r) : r();
        } else i();
      },
      te = (e, t) => {
        let n;
        for (; e !== t; ) (n = f(e)), r(e), (e = n);
        r(t);
      },
      ne = (e, t, n) => {
        e.type.__hmrId &&
          (function (e) {
            Yt.get(e.type.__hmrId).instances.delete(e);
          })(e);
        const { bum: o, effects: r, update: s, subTree: i, um: l } = e;
        if ((o && Y(o), r)) for (let a = 0; a < r.length; a++) ie(r[a]);
        s && (ie(s), Z(i, e, t, n)),
          l && xo(l, t),
          xo(() => {
            e.isUnmounted = !0;
          }, t),
          t &&
            t.pendingBranch &&
            !t.isUnmounted &&
            e.asyncDep &&
            !e.asyncResolved &&
            e.suspenseId === t.pendingId &&
            (t.deps--, 0 === t.deps && t.resolve()),
          nn(e);
      },
      oe = (e, t, n, o = !1, r = !1, s = 0) => {
        for (let i = s; i < e.length; i++) Z(e[i], t, n, o, r);
      },
      re = e =>
        6 & e.shapeFlag ? re(e.component.subTree) : 128 & e.shapeFlag ? e.suspense.next() : f(e.anchor || e.el),
      le = (e, t, n) => {
        null == e ? t._vnode && Z(t._vnode, null, null, !0) : _(t._vnode || null, e, t, null, null, null, n),
          Ht(),
          (t._vnode = e);
      },
      ae = { p: _, um: Z, m: G, r: ee, mt: U, mc: I, pc: K, pbc: R, n: re, o: e };
    let ce, ue;
    t && ([ce, ue] = t(ae));
    return { render: le, hydrate: ce, createApp: yo(le, ce) };
  })(e);
}
function So(e, t, n, o = null) {
  kt(e, t, 7, [n, o]);
}
function Co(e, t, n = !1) {
  const o = e.children,
    r = t.children;
  if (j(o) && j(r))
    for (let s = 0; s < o.length; s++) {
      const e = o[s];
      let t = r[s];
      1 & t.shapeFlag &&
        !t.dynamicChildren &&
        ((t.patchFlag <= 0 || 32 === t.patchFlag) && ((t = r[s] = Yo(r[s])), (t.el = e.el)), n || Co(e, t)),
        t.type !== Io || t.el || (t.el = e.el);
    }
}
function Oo(e, t) {
  return (
    (function (e, t, n = !0, o = !1) {
      const r = un || fr;
      if (r) {
        const s = r.type;
        if ('components' === e) {
          const e = $r(s);
          if (e && (e === t || e === H(t) || e === z(H(t)))) return s;
        }
        const i = Eo(r[e] || s[e], t) || Eo(r.appContext[e], t);
        return !i && o ? s : (n && !i && vt(`Failed to resolve ${e.slice(0, -1)}: ${t}`), i);
      }
      vt(`resolve${z(e.slice(0, -1))} can only be used in render() or setup().`);
    })('components', e, !0, t) || e
  );
}
const jo = Symbol();
function Eo(e, t) {
  return e && (e[t] || e[H(t)] || e[z(H(t))]);
}
const To = Symbol('Fragment'),
  Po = Symbol('Text'),
  Io = Symbol('Comment'),
  Fo = Symbol('Static'),
  Ro = [];
let Mo = null;
function Ao(e = !1) {
  Ro.push((Mo = e ? null : []));
}
function No() {
  Ro.pop(), (Mo = Ro[Ro.length - 1] || null);
}
function Vo(e, t, n, o, r) {
  const s = Ho(e, t, n, o, r, !0);
  return (s.dynamicChildren = Mo || v), No(), Mo && Mo.push(s), s;
}
function Uo(e) {
  return !!e && !0 === e.__v_isVNode;
}
function Lo(e, t) {
  return !(6 & t.shapeFlag && Gt.has(t.type)) && e.type === t.type && e.key === t.key;
}
const Do = '__vInternal',
  Bo = ({ key: e }) => (null != e ? e : null),
  Jo = ({ ref: e }) => (null != e ? (I(e) || ut(e) || P(e) ? { i: un, r: e } : e) : null),
  Ho = (...e) =>
    (function (e, t = null, n = null, o = 0, r = null, s = !1) {
      (e && e !== jo) || (e || vt(`Invalid vnode type when creating vnode: ${e}.`), (e = Io));
      if (Uo(e)) {
        const o = Ko(e, t, !0);
        return n && Xo(o, n), o;
      }
      Cr(e) && (e = e.__vccOpts);
      if (t) {
        (at(t) || Do in t) && (t = $({}, t));
        let { class: e, style: n } = t;
        e && !I(e) && (t.class = d(e)), R(n) && (at(n) && !j(n) && (n = $({}, n)), (t.style = a(n)));
      }
      const i = I(e) ? 1 : (e => e.__isSuspense)(e) ? 128 : (e => e.__isTeleport)(e) ? 64 : R(e) ? 4 : P(e) ? 2 : 0;
      4 & i &&
        at(e) &&
        vt(
          'Vue received a Component which was made a reactive object. This can lead to unnecessary performance overhead, and should be avoided by marking the component with `markRaw` or using `shallowRef` instead of `ref`.',
          '\nComponent that was made reactive: ',
          (e = ct(e)),
        );
      const l = {
        __v_isVNode: !0,
        __v_skip: !0,
        type: e,
        props: t,
        key: t && Bo(t),
        ref: t && Jo(t),
        scopeId: pn,
        slotScopeIds: null,
        children: null,
        component: null,
        suspense: null,
        ssContent: null,
        ssFallback: null,
        dirs: null,
        transition: null,
        el: null,
        anchor: null,
        target: null,
        targetAnchor: null,
        staticCount: 0,
        shapeFlag: i,
        patchFlag: o,
        dynamicProps: r,
        dynamicChildren: null,
        appContext: null,
      };
      l.key != l.key && vt('VNode created with invalid key (NaN). VNode type:', l.type);
      if ((Xo(l, n), 128 & i)) {
        const { content: e, fallback: t } = (function (e) {
          const { shapeFlag: t, children: n } = e;
          let o, r;
          return (
            32 & t ? ((o = $n(n.default)), (r = $n(n.fallback))) : ((o = $n(n)), (r = Go(null))),
            { content: o, fallback: r }
          );
        })(l);
        (l.ssContent = e), (l.ssFallback = t);
      }
      !s && Mo && (o > 0 || 6 & i) && 32 !== o && Mo.push(l);
      return l;
    })(...e);
function Ko(e, t, n = !1) {
  const { props: o, ref: r, patchFlag: s, children: i } = e,
    l = t
      ? (function (...e) {
          const t = $({}, e[0]);
          for (let n = 1; n < e.length; n++) {
            const o = e[n];
            for (const e in o)
              if ('class' === e) t.class !== o.class && (t.class = d([t.class, o.class]));
              else if ('style' === e) t.style = a([t.style, o.style]);
              else if (x(e)) {
                const n = t[e],
                  r = o[e];
                n !== r && (t[e] = n ? [].concat(n, o[e]) : r);
              } else '' !== e && (t[e] = o[e]);
          }
          return t;
        })(o || {}, t)
      : o;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: l,
    key: l && Bo(l),
    ref: t && t.ref ? (n && r ? (j(r) ? r.concat(Jo(t)) : [r, Jo(t)]) : Jo(t)) : r,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: -1 === s && j(i) ? i.map(qo) : i,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    patchFlag: t && e.type !== To ? (-1 === s ? 16 : 16 | s) : s,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && Ko(e.ssContent),
    ssFallback: e.ssFallback && Ko(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
  };
}
function qo(e) {
  const t = Ko(e);
  return j(e.children) && (t.children = e.children.map(qo)), t;
}
function zo(e = ' ', t = 0) {
  return Ho(Po, null, e, t);
}
function Wo(e = '', t = !1) {
  return t ? (Ao(), Vo(Io, null, e)) : Ho(Io, null, e);
}
function Go(e) {
  return null == e || 'boolean' == typeof e
    ? Ho(Io)
    : j(e)
    ? Ho(To, null, e)
    : 'object' == typeof e
    ? null === e.el
      ? e
      : Ko(e)
    : Ho(Po, null, String(e));
}
function Yo(e) {
  return null === e.el ? e : Ko(e);
}
function Xo(e, t) {
  let n = 0;
  const { shapeFlag: o } = e;
  if (null == t) t = null;
  else if (j(t)) n = 16;
  else if ('object' == typeof t) {
    if (1 & o || 64 & o) {
      const n = t.default;
      return void (n && (n._c && cn(1), Xo(e, n()), n._c && cn(-1)));
    }
    {
      n = 32;
      const o = t._;
      o || Do in t
        ? 3 === o && un && (1024 & un.vnode.patchFlag ? ((t._ = 2), (e.patchFlag |= 1024)) : (t._ = 1))
        : (t._ctx = un);
    }
  } else
    P(t) ? ((t = { default: t, _ctx: un }), (n = 32)) : ((t = String(t)), 64 & o ? ((n = 16), (t = [zo(t)])) : (n = 8));
  (e.children = t), (e.shapeFlag |= n);
}
function Zo(e, t, n = !1) {
  const o = fr || un;
  if (o) {
    const r = null == o.parent ? o.vnode.appContext && o.vnode.appContext.provides : o.parent.provides;
    if (r && e in r) return r[e];
    if (arguments.length > 1) return n && P(t) ? t() : t;
    vt(`injection "${String(e)}" not found.`);
  } else vt('inject() can only be used inside setup() or functional components.');
}
let Qo = !0;
function er(e, t, n = [], o = [], r = [], s = !1) {
  const {
      mixins: i,
      extends: l,
      data: a,
      computed: c,
      methods: u,
      watch: p,
      provide: d,
      inject: f,
      components: h,
      directives: m,
      beforeMount: g,
      mounted: v,
      beforeUpdate: _,
      updated: w,
      activated: x,
      deactivated: k,
      beforeDestroy: S,
      beforeUnmount: C,
      destroyed: O,
      unmounted: E,
      render: T,
      renderTracked: I,
      renderTriggered: F,
      errorCaptured: M,
      expose: A,
    } = t,
    N = e.proxy,
    V = e.ctx,
    U = e.appContext.mixins;
  s && T && e.render === b && (e.render = T),
    s || ((Qo = !1), tr('beforeCreate', 'bc', t, e, U), (Qo = !0), or(e, U, n, o, r)),
    l && er(e, l, n, o, r, !0),
    i && or(e, i, n, o, r);
  const L = (function () {
    const e = Object.create(null);
    return (t, n) => {
      e[n] ? vt(`${t} property "${n}" is already defined in ${e[n]}.`) : (e[n] = t);
    };
  })();
  {
    const [t] = e.propsOptions;
    if (t) for (const e in t) L('Props', e);
  }
  if (f)
    if (j(f))
      for (let y = 0; y < f.length; y++) {
        const e = f[y];
        (V[e] = Zo(e)), L('Inject', e);
      }
    else
      for (const y in f) {
        const e = f[y];
        R(e) ? (V[y] = Zo(e.from || y, e.default, !0)) : (V[y] = Zo(e)), L('Inject', y);
      }
  if (u)
    for (const y in u) {
      const e = u[y];
      P(e)
        ? (Object.defineProperty(V, y, { value: e.bind(N), configurable: !0, enumerable: !0, writable: !0 }),
          L('Methods', y))
        : vt(
            `Method "${y}" has type "${typeof e}" in the component definition. Did you reference the function correctly?`,
          );
    }
  if (s) a && n.push(a);
  else {
    n.length && n.forEach(t => rr(e, t, N)), a && rr(e, a, N);
    {
      const t = ct(e.data);
      for (const e in t)
        L('Data', e),
          '$' !== e[0] &&
            '_' !== e[0] &&
            Object.defineProperty(V, e, { configurable: !0, enumerable: !0, get: () => t[e], set: b });
    }
  }
  if (c)
    for (const y in c) {
      const e = c[y],
        t = P(e) ? e.bind(N, N) : P(e.get) ? e.get.bind(N, N) : b;
      t === b && vt(`Computed property "${y}" has no getter.`);
      const n = Or({
        get: t,
        set:
          !P(e) && P(e.set)
            ? e.set.bind(N)
            : () => {
                vt(`Write operation failed: computed property "${y}" is readonly.`);
              },
      });
      Object.defineProperty(V, y, { enumerable: !0, configurable: !0, get: () => n.value, set: e => (n.value = e) }),
        L('Computed', y);
    }
  var D;
  if (
    (p && o.push(p),
    !s &&
      o.length &&
      o.forEach(e => {
        for (const t in e) sr(e[t], V, N, t);
      }),
    d && r.push(d),
    !s &&
      r.length &&
      r.forEach(e => {
        const t = P(e) ? e.call(N) : e;
        Reflect.ownKeys(t).forEach(e => {
          !(function (e, t) {
            if (fr) {
              let n = fr.provides;
              const o = fr.parent && fr.parent.provides;
              o === n && (n = fr.provides = Object.create(o)), (n[e] = t);
            } else vt('provide() can only be used inside setup().');
          })(e, t[e]);
        });
      }),
    s &&
      (h && $(e.components || (e.components = $({}, e.type.components)), h),
      m && $(e.directives || (e.directives = $({}, e.type.directives)), m)),
    s || tr('created', 'c', t, e, U),
    g && Dn(g.bind(N)),
    v && Bn(v.bind(N)),
    _ && Jn(_.bind(N)),
    w && Hn(w.bind(N)),
    x && to(x.bind(N), 'a', D),
    k &&
      (function (e, t) {
        to(e, 'da', t);
      })(k.bind(N)),
    M &&
      ((e, t = fr) => {
        Un('ec', e, t);
      })(M.bind(N)),
    I && Wn(I.bind(N)),
    F && zn(F.bind(N)),
    S && vt('`beforeDestroy` has been renamed to `beforeUnmount`.'),
    C && Kn(C.bind(N)),
    O && vt('`destroyed` has been renamed to `unmounted`.'),
    E && qn(E.bind(N)),
    j(A))
  )
    if (s) vt('The `expose` option is ignored when used in mixins.');
    else if (A.length) {
      const t = e.exposed || (e.exposed = dt({}));
      A.forEach(e => {
        t[e] = (function (e, t) {
          return ut(e[t]) ? e[t] : new ft(e, t);
        })(N, e);
      });
    } else e.exposed || (e.exposed = y);
}
function tr(e, t, n, o, r) {
  for (let s = 0; s < r.length; s++) nr(e, t, r[s], o);
  nr(e, t, n, o);
}
function nr(e, t, n, o) {
  const { extends: r, mixins: s } = n,
    i = n[e];
  if ((r && nr(e, t, r, o), s)) for (let l = 0; l < s.length; l++) nr(e, t, s[l], o);
  i && kt(i.bind(o.proxy), o, t);
}
function or(e, t, n, o, r) {
  for (let s = 0; s < t.length; s++) er(e, t[s], n, o, r, !0);
}
function rr(e, t, n) {
  P(t) || vt('The data option must be a function. Plain object usage is no longer supported.'), (Qo = !1);
  const o = t.call(n, n);
  (Qo = !0),
    M(o) &&
      vt(
        'data() returned a Promise - note data() cannot be async; If you intend to perform data fetching before component renders, use async setup() + <Suspense>.',
      ),
    R(o) ? (e.data === y ? (e.data = nt(o)) : $(e.data, o)) : vt('data() should return an object.');
}
function sr(e, t, n, o) {
  const r = o.includes('.')
    ? (function (e, t) {
        const n = t.split('.');
        return () => {
          let t = e;
          for (let e = 0; e < n.length && t; e++) t = t[n[e]];
          return t;
        };
      })(n, o)
    : () => n[o];
  if (I(e)) {
    const n = t[e];
    P(n) ? Yn(r, n) : vt(`Invalid watch handler specified by key "${e}"`, n);
  } else if (P(e)) Yn(r, e.bind(n));
  else if (R(e))
    if (j(e)) e.forEach(e => sr(e, t, n, o));
    else {
      const o = P(e.handler) ? e.handler.bind(n) : t[e.handler];
      P(o) ? Yn(r, o, e) : vt(`Invalid watch handler specified by key "${e.handler}"`, o);
    }
  else vt(`Invalid watch option: "${o}"`, e);
}
function ir(e, t, n) {
  const o = n.appContext.config.optionMergeStrategies,
    { mixins: r, extends: s } = t;
  s && ir(e, s, n), r && r.forEach(t => ir(e, t, n));
  for (const i in t) o && O(o, i) ? (e[i] = o[i](e[i], t[i], n.proxy, i)) : (e[i] = t[i]);
}
const lr = e => (e ? (yr(e) ? (e.exposed ? e.exposed : e.proxy) : lr(e.parent)) : null),
  ar = $(Object.create(null), {
    $: e => e,
    $el: e => e.vnode.el,
    $data: e => e.data,
    $props: e => rt(e.props),
    $attrs: e => rt(e.attrs),
    $slots: e => rt(e.slots),
    $refs: e => rt(e.refs),
    $parent: e => lr(e.parent),
    $root: e => lr(e.root),
    $emit: e => e.emit,
    $options: e =>
      (function (e) {
        const t = e.type,
          { __merged: n, mixins: o, extends: r } = t;
        if (n) return n;
        const s = e.appContext.mixins;
        if (!s.length && !o && !r) return t;
        const i = {};
        return s.forEach(t => ir(i, t, e)), ir(i, t, e), (t.__merged = i);
      })(e),
    $forceUpdate: e => () => Ut(e.update),
    $nextTick: e => Vt.bind(e.proxy),
    $watch: e => Zn.bind(e),
  }),
  cr = {
    get({ _: e }, t) {
      const { ctx: n, setupState: o, data: r, props: s, accessCache: i, type: l, appContext: a } = e;
      if ('__v_skip' === t) return !0;
      if ('__isVue' === t) return !0;
      let c;
      if ('$' !== t[0]) {
        const l = i[t];
        if (void 0 !== l)
          switch (l) {
            case 0:
              return o[t];
            case 1:
              return r[t];
            case 3:
              return n[t];
            case 2:
              return s[t];
          }
        else {
          if (o !== y && O(o, t)) return (i[t] = 0), o[t];
          if (r !== y && O(r, t)) return (i[t] = 1), r[t];
          if ((c = e.propsOptions[0]) && O(c, t)) return (i[t] = 2), s[t];
          if (n !== y && O(n, t)) return (i[t] = 3), n[t];
          Qo && (i[t] = 4);
        }
      }
      const u = ar[t];
      let p, d;
      return u
        ? ('$attrs' === t && (fe(e, 'get', t), gn()), u(e))
        : (p = l.__cssModules) && (p = p[t])
        ? p
        : n !== y && O(n, t)
        ? ((i[t] = 3), n[t])
        : ((d = a.config.globalProperties),
          O(d, t)
            ? d[t]
            : void (
                !un ||
                (I(t) && 0 === t.indexOf('__v')) ||
                (r === y || ('$' !== t[0] && '_' !== t[0]) || !O(r, t)
                  ? e === un &&
                    vt(`Property ${JSON.stringify(t)} was accessed during render but is not defined on instance.`)
                  : vt(
                      `Property ${JSON.stringify(
                        t,
                      )} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`,
                    ))
              ));
    },
    set({ _: e }, t, n) {
      const { data: o, setupState: r, ctx: s } = e;
      if (r !== y && O(r, t)) r[t] = n;
      else if (o !== y && O(o, t)) o[t] = n;
      else if (O(e.props, t)) return vt(`Attempting to mutate prop "${t}". Props are readonly.`, e), !1;
      return '$' === t[0] && t.slice(1) in e
        ? (vt(`Attempting to mutate public property "${t}". Properties starting with $ are reserved and readonly.`, e),
          !1)
        : (t in e.appContext.config.globalProperties
            ? Object.defineProperty(s, t, { enumerable: !0, configurable: !0, value: n })
            : (s[t] = n),
          !0);
    },
    has({ _: { data: e, setupState: t, accessCache: n, ctx: o, appContext: r, propsOptions: s } }, i) {
      let l;
      return (
        void 0 !== n[i] ||
        (e !== y && O(e, i)) ||
        (t !== y && O(t, i)) ||
        ((l = s[0]) && O(l, i)) ||
        O(o, i) ||
        O(ar, i) ||
        O(r.config.globalProperties, i)
      );
    },
    ownKeys: e => (
      vt(
        'Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead.',
      ),
      Reflect.ownKeys(e)
    ),
  },
  ur = $({}, cr, {
    get(e, t) {
      if (t !== Symbol.unscopables) return cr.get(e, t, e);
    },
    has(e, t) {
      const n = '_' !== t[0] && !i(t);
      return (
        !n &&
          cr.has(e, t) &&
          vt(`Property ${JSON.stringify(t)} should not start with _ which is a reserved prefix for Vue internals.`),
        n
      );
    },
  });
const pr = fo();
let dr = 0;
let fr = null;
const hr = e => {
    fr = e;
  },
  mr = s('slot,component');
function gr(e, t) {
  const n = t.isNativeTag || _;
  (mr(e) || n(e)) && vt('Do not use built-in or reserved HTML elements as component id: ' + e);
}
function yr(e) {
  return 4 & e.vnode.shapeFlag;
}
let vr = !1;
function br(e, t, n) {
  P(t)
    ? (e.render = t)
    : R(t)
    ? (Uo(t) && vt('setup() should not return VNodes directly - return a render function instead.'),
      (e.devtoolsRawSetupState = t),
      (e.setupState = dt(t)),
      (function (e) {
        const { ctx: t, setupState: n } = e;
        Object.keys(ct(n)).forEach(e => {
          '$' !== e[0] && '_' !== e[0]
            ? Object.defineProperty(t, e, { enumerable: !0, configurable: !0, get: () => n[e], set: b })
            : vt(
                `setup() return property ${JSON.stringify(
                  e,
                )} should not start with "$" or "_" which are reserved prefixes for Vue internals.`,
              );
        });
      })(e))
    : void 0 !== t && vt('setup() should return an object. Received: ' + (null === t ? 'null' : typeof t)),
    _r(e, n);
}
function _r(e, t) {
  const n = e.type;
  e.render || ((e.render = n.render || b), e.render._rc && (e.withProxy = new Proxy(e.ctx, ur))),
    (fr = e),
    pe(),
    er(e, n),
    de(),
    (fr = null),
    n.render ||
      e.render !== b ||
      t ||
      (n.template
        ? vt(
            'Component provided template option but runtime compilation is not supported in this build of Vue. Configure your bundler to alias "vue" to "vue/dist/vue.esm-bundler.js".',
          )
        : vt('Component is missing template or render function.'));
}
const wr = {
  get: (e, t) => (gn(), e[t]),
  set: () => (vt('setupContext.attrs is readonly.'), !1),
  deleteProperty: () => (vt('setupContext.attrs is readonly.'), !1),
};
function xr(e, t = fr) {
  t && (t.effects || (t.effects = [])).push(e);
}
const kr = /(?:^|[-_])(\w)/g;
function $r(e) {
  return (P(e) && e.displayName) || e.name;
}
function Sr(e, t, n = !1) {
  let o = $r(t);
  if (!o && t.__file) {
    const e = t.__file.match(/([^/\\]+)\.\w+$/);
    e && (o = e[1]);
  }
  if (!o && e && e.parent) {
    const n = e => {
      for (const n in e) if (e[n] === t) return n;
    };
    o = n(e.components || e.parent.type.components) || n(e.appContext.components);
  }
  return o ? o.replace(kr, e => e.toUpperCase()).replace(/[-_]/g, '') : n ? 'App' : 'Anonymous';
}
function Cr(e) {
  return P(e) && '__vccOpts' in e;
}
function Or(e) {
  const t = (function (e) {
    let t, n;
    return (
      P(e)
        ? ((t = e),
          (n = () => {
            console.warn('Write operation failed: computed value is readonly');
          }))
        : ((t = e.get), (n = e.set)),
      new ht(t, n, P(e) || !e.set)
    );
  })(e);
  return xr(t.effect), t;
}
function jr(e, t) {
  let n;
  if (j(e) || I(e)) {
    n = new Array(e.length);
    for (let o = 0, r = e.length; o < r; o++) n[o] = t(e[o], o);
  } else if ('number' == typeof e) {
    if (!Number.isInteger(e)) return vt(`The v-for range expect an integer value but got ${e}.`), [];
    n = new Array(e);
    for (let o = 0; o < e; o++) n[o] = t(o + 1, o);
  } else if (R(e))
    if (e[Symbol.iterator]) n = Array.from(e, t);
    else {
      const o = Object.keys(e);
      n = new Array(o.length);
      for (let r = 0, s = o.length; r < s; r++) {
        const s = o[r];
        n[r] = t(e[s], s, r);
      }
    }
  else n = [];
  return n;
}
const Er = '3.0.11',
  Tr = 'http://www.w3.org/2000/svg',
  Pr = 'undefined' != typeof document ? document : null;
let Ir, Fr;
const Rr = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: e => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, o) => {
    const r = t ? Pr.createElementNS(Tr, e) : Pr.createElement(e, n ? { is: n } : void 0);
    return 'select' === e && o && null != o.multiple && r.setAttribute('multiple', o.multiple), r;
  },
  createText: e => Pr.createTextNode(e),
  createComment: e => Pr.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: e => e.parentNode,
  nextSibling: e => e.nextSibling,
  querySelector: e => Pr.querySelector(e),
  setScopeId(e, t) {
    e.setAttribute(t, '');
  },
  cloneNode(e) {
    const t = e.cloneNode(!0);
    return '_value' in e && (t._value = e._value), t;
  },
  insertStaticContent(e, t, n, o) {
    const r = o ? Fr || (Fr = Pr.createElementNS(Tr, 'svg')) : Ir || (Ir = Pr.createElement('div'));
    r.innerHTML = e;
    const s = r.firstChild;
    let i = s,
      l = i;
    for (; i; ) (l = i), Rr.insert(i, t, n), (i = r.firstChild);
    return [s, l];
  },
};
const Mr = /\s*!important$/;
function Ar(e, t, n) {
  if (j(n)) n.forEach(n => Ar(e, t, n));
  else if (t.startsWith('--')) e.setProperty(t, n);
  else {
    const o = (function (e, t) {
      const n = Vr[t];
      if (n) return n;
      let o = H(t);
      if ('filter' !== o && o in e) return (Vr[t] = o);
      o = z(o);
      for (let r = 0; r < Nr.length; r++) {
        const n = Nr[r] + o;
        if (n in e) return (Vr[t] = n);
      }
      return t;
    })(e, t);
    Mr.test(n) ? e.setProperty(q(o), n.replace(Mr, ''), 'important') : (e[o] = n);
  }
}
const Nr = ['Webkit', 'Moz', 'ms'],
  Vr = {};
const Ur = 'http://www.w3.org/1999/xlink';
let Lr = Date.now,
  Dr = !1;
if ('undefined' != typeof window) {
  Lr() > document.createEvent('Event').timeStamp && (Lr = () => performance.now());
  const e = navigator.userAgent.match(/firefox\/(\d+)/i);
  Dr = !!(e && Number(e[1]) <= 53);
}
let Br = 0;
const Jr = Promise.resolve(),
  Hr = () => {
    Br = 0;
  };
function Kr(e, t, n, o) {
  e.addEventListener(t, n, o);
}
function qr(e, t, n, o, r = null) {
  const s = e._vei || (e._vei = {}),
    i = s[t];
  if (o && i) i.value = o;
  else {
    const [n, l] = (function (e) {
      let t;
      if (zr.test(e)) {
        let n;
        for (t = {}; (n = e.match(zr)); ) (e = e.slice(0, e.length - n[0].length)), (t[n[0].toLowerCase()] = !0);
      }
      return [q(e.slice(2)), t];
    })(t);
    if (o) {
      Kr(
        e,
        n,
        (s[t] = (function (e, t) {
          const n = e => {
            const o = e.timeStamp || Lr();
            (Dr || o >= n.attached - 1) &&
              kt(
                (function (e, t) {
                  if (j(t)) {
                    const n = e.stopImmediatePropagation;
                    return (
                      (e.stopImmediatePropagation = () => {
                        n.call(e), (e._stopped = !0);
                      }),
                      t.map(e => t => !t._stopped && e(t))
                    );
                  }
                  return t;
                })(e, n.value),
                t,
                5,
                [e],
              );
          };
          return (n.value = e), (n.attached = (() => Br || (Jr.then(Hr), (Br = Lr())))()), n;
        })(o, r)),
        l,
      );
    } else
      i &&
        (!(function (e, t, n, o) {
          e.removeEventListener(t, n, o);
        })(e, n, i, l),
        (s[t] = void 0));
  }
}
const zr = /(?:Once|Passive|Capture)$/;
const Wr = /^on[a-z]/;
const Gr = e => {
  const t = e.props['onUpdate:modelValue'];
  return j(t) ? e => Y(t, e) : t;
};
function Yr(e) {
  e.target.composing = !0;
}
function Xr(e) {
  const t = e.target;
  t.composing &&
    ((t.composing = !1),
    (function (e, t) {
      const n = document.createEvent('HTMLEvents');
      n.initEvent(t, !0, !0), e.dispatchEvent(n);
    })(t, 'input'));
}
const Zr = {
    created(e, { modifiers: { lazy: t, trim: n, number: o } }, r) {
      e._assign = Gr(r);
      const s = o || 'number' === e.type;
      Kr(e, t ? 'change' : 'input', t => {
        if (t.target.composing) return;
        let o = e.value;
        n ? (o = o.trim()) : s && (o = Z(o)), e._assign(o);
      }),
        n &&
          Kr(e, 'change', () => {
            e.value = e.value.trim();
          }),
        t || (Kr(e, 'compositionstart', Yr), Kr(e, 'compositionend', Xr), Kr(e, 'change', Xr));
    },
    mounted(e, { value: t }) {
      e.value = null == t ? '' : t;
    },
    beforeUpdate(e, { value: t, modifiers: { trim: n, number: o } }, r) {
      if (((e._assign = Gr(r)), e.composing)) return;
      if (document.activeElement === e) {
        if (n && e.value.trim() === t) return;
        if ((o || 'number' === e.type) && Z(e.value) === t) return;
      }
      const s = null == t ? '' : t;
      e.value !== s && (e.value = s);
    },
  },
  Qr = ['ctrl', 'shift', 'alt', 'meta'],
  es = {
    stop: e => e.stopPropagation(),
    prevent: e => e.preventDefault(),
    self: e => e.target !== e.currentTarget,
    ctrl: e => !e.ctrlKey,
    shift: e => !e.shiftKey,
    alt: e => !e.altKey,
    meta: e => !e.metaKey,
    left: e => 'button' in e && 0 !== e.button,
    middle: e => 'button' in e && 1 !== e.button,
    right: e => 'button' in e && 2 !== e.button,
    exact: (e, t) => Qr.some(n => e[`${n}Key`] && !t.includes(n)),
  },
  ts = {
    esc: 'escape',
    space: ' ',
    up: 'arrow-up',
    left: 'arrow-left',
    right: 'arrow-right',
    down: 'arrow-down',
    delete: 'backspace',
  },
  ns = (e, t) => n => {
    if (!('key' in n)) return;
    const o = q(n.key);
    return t.some(e => e === o || ts[e] === o) ? e(n) : void 0;
  },
  os = {
    beforeMount(e, { value: t }, { transition: n }) {
      (e._vod = 'none' === e.style.display ? '' : e.style.display), n && t ? n.beforeEnter(e) : rs(e, t);
    },
    mounted(e, { value: t }, { transition: n }) {
      n && t && n.enter(e);
    },
    updated(e, { value: t, oldValue: n }, { transition: o }) {
      !t != !n &&
        (o
          ? t
            ? (o.beforeEnter(e), rs(e, !0), o.enter(e))
            : o.leave(e, () => {
                rs(e, !1);
              })
          : rs(e, t));
    },
    beforeUnmount(e, { value: t }) {
      rs(e, t);
    },
  };
function rs(e, t) {
  e.style.display = t ? e._vod : 'none';
}
const ss = $(
  {
    patchProp: (e, t, n, o, r = !1, s, i, a, c) => {
      switch (t) {
        case 'class':
          !(function (e, t, n) {
            if ((null == t && (t = ''), n)) e.setAttribute('class', t);
            else {
              const n = e._vtc;
              n && (t = (t ? [t, ...n] : [...n]).join(' ')), (e.className = t);
            }
          })(e, o, r);
          break;
        case 'style':
          !(function (e, t, n) {
            const o = e.style;
            if (n)
              if (I(n)) {
                if (t !== n) {
                  const t = o.display;
                  (o.cssText = n), '_vod' in e && (o.display = t);
                }
              } else {
                for (const e in n) Ar(o, e, n[e]);
                if (t && !I(t)) for (const e in t) null == n[e] && Ar(o, e, '');
              }
            else e.removeAttribute('style');
          })(e, n, o);
          break;
        default:
          x(t)
            ? k(t) || qr(e, t, 0, o, i)
            : (function (e, t, n, o) {
                if (o) return 'innerHTML' === t || !!(t in e && Wr.test(t) && P(n));
                if ('spellcheck' === t || 'draggable' === t) return !1;
                if ('form' === t) return !1;
                if ('list' === t && 'INPUT' === e.tagName) return !1;
                if ('type' === t && 'TEXTAREA' === e.tagName) return !1;
                if (Wr.test(t) && I(n)) return !1;
                return t in e;
              })(e, t, o, r)
            ? (function (e, t, n, o, r, s, i) {
                if ('innerHTML' === t || 'textContent' === t) return o && i(o, r, s), void (e[t] = null == n ? '' : n);
                if ('value' !== t || 'PROGRESS' === e.tagName) {
                  if ('' === n || null == n) {
                    const o = typeof e[t];
                    if ('' === n && 'boolean' === o) return void (e[t] = !0);
                    if (null == n && 'string' === o) return (e[t] = ''), void e.removeAttribute(t);
                    if ('number' === o) return (e[t] = 0), void e.removeAttribute(t);
                  }
                  try {
                    e[t] = n;
                  } catch (l) {
                    vt(`Failed setting prop "${t}" on <${e.tagName.toLowerCase()}>: value ${n} is invalid.`, l);
                  }
                } else {
                  e._value = n;
                  const t = null == n ? '' : n;
                  e.value !== t && (e.value = t);
                }
              })(e, t, o, s, i, a, c)
            : ('true-value' === t ? (e._trueValue = o) : 'false-value' === t && (e._falseValue = o),
              (function (e, t, n, o) {
                if (o && t.startsWith('xlink:'))
                  null == n ? e.removeAttributeNS(Ur, t.slice(6, t.length)) : e.setAttributeNS(Ur, t, n);
                else {
                  const o = l(t);
                  null == n || (o && !1 === n) ? e.removeAttribute(t) : e.setAttribute(t, o ? '' : n);
                }
              })(e, t, o, r));
      }
    },
    forcePatchProp: (e, t) => 'value' === t,
  },
  Rr,
);
let is;
const ls = (...e) => {
  const t = (is || (is = $o(ss))).createApp(...e);
  !(function (e) {
    Object.defineProperty(e.config, 'isNativeTag', { value: e => f(e) || h(e), writable: !1 });
  })(t),
    (function (e) {
      {
        const t = e.config.isCustomElement;
        Object.defineProperty(e.config, 'isCustomElement', {
          get: () => t,
          set() {
            vt(
              'The `isCustomElement` config option is only respected when using the runtime compiler.If you are using the runtime-only build, `isCustomElement` must be passed to `@vue/compiler-dom` in the build setup instead- for example, via the `compilerOptions` option in vue-loader: https://vue-loader.vuejs.org/options.html#compileroptions.',
            );
          },
        });
      }
    })(t);
  const { mount: n } = t;
  return (
    (t.mount = e => {
      const o = (function (e) {
        if (I(e)) {
          const t = document.querySelector(e);
          return t || vt(`Failed to mount app: mount target selector "${e}" returned null.`), t;
        }
        e instanceof window.ShadowRoot &&
          'closed' === e.mode &&
          vt('mounting on a ShadowRoot with `{mode: "closed"}` may lead to unpredictable bugs');
        return e;
      })(e);
      if (!o) return;
      const r = t._component;
      P(r) || r.render || r.template || (r.template = o.innerHTML), (o.innerHTML = '');
      const s = n(o, !1, o instanceof SVGElement);
      return o instanceof Element && (o.removeAttribute('v-cloak'), o.setAttribute('data-v-app', '')), s;
    }),
    t
  );
};
!(function () {
  if ('undefined' == typeof window) return;
  const e = { style: 'color:#3ba776' },
    t = { style: 'color:#0b1bc9' },
    n = { style: 'color:#b62e24' },
    o = { style: 'color:#9d288c' },
    r = {
      header: t =>
        R(t)
          ? t.__isVue
            ? ['div', e, 'VueInstance']
            : ut(t)
            ? ['div', {}, ['span', e, u(t)], '<', l(t.value), '>']
            : it(t)
            ? ['div', {}, ['span', e, 'Reactive'], '<', l(t), '>' + (lt(t) ? ' (readonly)' : '')]
            : lt(t)
            ? ['div', {}, ['span', e, 'Readonly'], '<', l(t), '>']
            : null
          : null,
      hasBody: e => e && e.__isVue,
      body(e) {
        if (e && e.__isVue) return ['div', {}, ...s(e.$)];
      },
    };
  function s(e) {
    const t = [];
    e.type.props && e.props && t.push(i('props', ct(e.props))),
      e.setupState !== y && t.push(i('setup', e.setupState)),
      e.data !== y && t.push(i('data', ct(e.data)));
    const n = a(e, 'computed');
    n && t.push(i('computed', n));
    const r = a(e, 'inject');
    return (
      r && t.push(i('injected', r)),
      t.push(['div', {}, ['span', { style: o.style + ';opacity:0.66' }, '$ (internal): '], ['object', { object: e }]]),
      t
    );
  }
  function i(e, t) {
    return (
      (t = $({}, t)),
      Object.keys(t).length
        ? [
            'div',
            { style: 'line-height:1.25em;margin-bottom:0.6em' },
            ['div', { style: 'color:#476582' }, e],
            [
              'div',
              { style: 'padding-left:1.25em' },
              ...Object.keys(t).map(e => ['div', {}, ['span', o, e + ': '], l(t[e], !1)]),
            ],
          ]
        : ['span', {}]
    );
  }
  function l(e, r = !0) {
    return 'number' == typeof e
      ? ['span', t, e]
      : 'string' == typeof e
      ? ['span', n, JSON.stringify(e)]
      : 'boolean' == typeof e
      ? ['span', o, e]
      : R(e)
      ? ['object', { object: r ? ct(e) : e }]
      : ['span', n, String(e)];
  }
  function a(e, t) {
    const n = e.type;
    if (P(n)) return;
    const o = {};
    for (const r in e.ctx) c(n, r, t) && (o[r] = e.ctx[r]);
    return o;
  }
  function c(e, t, n) {
    const o = e[n];
    return (
      !!((j(o) && o.includes(t)) || (R(o) && t in o)) ||
      !(!e.extends || !c(e.extends, t, n)) ||
      !(!e.mixins || !e.mixins.some(e => c(e, t, n))) ||
      void 0
    );
  }
  function u(e) {
    return e._shallow ? 'ShallowRef' : e.effect ? 'ComputedRef' : 'Ref';
  }
  window.devtoolsFormatters ? window.devtoolsFormatters.push(r) : (window.devtoolsFormatters = [r]);
})();
const as = e => ({ is: () => as(e), default: () => e }),
  cs = e => ({ is: (t, n) => (t(e) ? as(n()) : cs(e)), default: e => e() }),
  us = e => () => e;
var ps, ds;
((ds = ps || (ps = {}))[(ds.OBJECT = 0)] = 'OBJECT'), (ds[(ds.ARRAY = 1)] = 'ARRAY'), (ds[(ds.VALUE = 2)] = 'VALUE');
var fs = wo({
  name: 'JsonTreeViewItem',
  props: {
    data: { required: !0, type: Object },
    maxDepth: { type: Number, required: !1, default: 1 },
    canSelect: { type: Boolean, required: !1, default: !1 },
  },
  setup(e, t) {
    const n = nt({ open: e.data.depth < e.maxDepth });
    const o = Or(() => ({ 'chevron-arrow': !0, opened: n.open })),
      r = Or(() => ({ 'value-key': !0, 'can-select': e.canSelect })),
      s = Or(() => {
        const t = e.data.length;
        return 1 === e.data.type
          ? 1 === t
            ? `${t} element`
            : `${t} elements`
          : 1 === t
          ? `${t} property`
          : `${t} properties`;
      }),
      i = Or(() => (void 0 === e.data.value ? 'undefined' : JSON.stringify(e.data.value)));
    return {
      state: n,
      toggleOpen: function () {
        n.open = !n.open;
      },
      onClick: function (e) {
        t.emit('selected', { key: e.key, value: e.value, path: e.path });
      },
      bubbleSelected: function (e) {
        t.emit('selected', e);
      },
      getKey: function (e) {
        const t = Number(e.key);
        return isNaN(t) ? `"${e.key}":` : `${e.key}":`;
      },
      getValueColor: function (e) {
        return (e => ({ is: (t, n) => (t(e) ? as(n()) : cs(e)) }))(typeof e)
          .is(e => 'string' === e, us('var(--jtv-string-color)'))
          .is(e => 'number' === e, us('var(--jtv-number-color)'))
          .is(e => 'bigint' === e, us('var(--jtv-number-color)'))
          .is(e => 'boolean' === e, us('var(--jtv-boolean-color)'))
          .is(e => 'object' === e, us('var(--jtv-null-color)'))
          .is(e => 'undefined' === e, us('var(--jtv-null-color)'))
          .default(us('var(--jtv-valueKey-color)'));
      },
      classes: o,
      valueClasses: r,
      lengthString: s,
      dataValue: i,
      ItemType: ps,
    };
  },
});
const hs = { class: 'json-view-item' },
  ms = { key: 0 },
  gs = { class: 'properties' },
  ys = { class: 'value-key' };
fs.render = function (e, t, n, o, r, s) {
  const i = Oo('JsonTreeViewItem', !0);
  return (
    Ao(),
    Vo('div', hs, [
      e.data.type === e.ItemType.OBJECT || e.data.type === e.ItemType.ARRAY
        ? (Ao(),
          Vo('div', ms, [
            Ho(
              'button',
              {
                class: 'data-key',
                'aria-expanded': e.state.open ? 'true' : 'false',
                onClick:
                  t[1] ||
                  (t[1] =
                    ((l = (...t) => e.toggleOpen && e.toggleOpen(...t)),
                    (a = ['stop']),
                    (e, ...t) => {
                      for (let n = 0; n < a.length; n++) {
                        const t = es[a[n]];
                        if (t && t(e, a)) return;
                      }
                      return l(e, ...t);
                    })),
              },
              [
                Ho('div', { class: e.classes }, null, 2),
                zo(' ' + m(e.data.key) + ': ', 1),
                Ho('span', gs, m(e.lengthString), 1),
              ],
              8,
              ['aria-expanded'],
            ),
            (Ao(!0),
            Vo(
              To,
              null,
              jr(e.data.children, t =>
                uo(
                  (Ao(),
                  Vo(
                    i,
                    {
                      key: e.getKey(t),
                      data: t,
                      maxDepth: e.maxDepth,
                      canSelect: e.canSelect,
                      onSelected: e.bubbleSelected,
                    },
                    null,
                    8,
                    ['data', 'maxDepth', 'canSelect', 'onSelected'],
                  )),
                  [[os, e.state.open]],
                ),
              ),
              128,
            )),
          ]))
        : Wo('v-if', !0),
      e.data.type === e.ItemType.VALUE
        ? (Ao(),
          Vo(
            'div',
            {
              key: 1,
              class: e.valueClasses,
              role: e.canSelect ? 'button' : void 0,
              tabindex: e.canSelect ? '0' : void 0,
              onClick: t[2] || (t[2] = t => e.onClick(e.data)),
              onKeyup: [
                t[3] || (t[3] = ns(t => e.onClick(e.data), ['enter'])),
                t[4] || (t[4] = ns(t => e.onClick(e.data), ['space'])),
              ],
            },
            [
              Ho('span', ys, m(e.data.key) + ':', 1),
              Ho('span', { style: { color: e.getValueColor(e.data.value) } }, m(e.dataValue), 5),
            ],
            42,
            ['role', 'tabindex'],
          ))
        : Wo('v-if', !0),
    ])
  );
  var l, a;
};
var vs = wo({
  name: 'JsonTreeView',
  components: { JsonTreeViewItem: fs },
  props: {
    data: { type: String, required: !1 },
    rootKey: { type: String, required: !1, default: '/' },
    maxDepth: { type: Number, required: !1, default: 1 },
    colorScheme: { type: String, required: !1, default: 'light', validator: e => -1 !== ['light', 'dark'].indexOf(e) },
  },
  setup(e, s) {
    function i(e, t, n, o, r) {
      if (t instanceof Object) {
        if (t instanceof Array) {
          const s = t.map((t, s) => i(s.toString(), t, n + 1, r ? `${o}${e}[${s}].` : `${o}`, !1));
          return { key: e, type: ps.ARRAY, depth: n, path: o, length: s.length, children: s };
        }
        const s = Object.entries(t).map(([t, s]) => i(t, s, n + 1, r ? `${o}${e}.` : `${o}`, !0));
        return { key: e, type: ps.OBJECT, depth: n, path: o, length: s.length, children: s };
      }
      return { key: e, type: ps.VALUE, path: r ? `${o}${e}` : o.slice(0, -1), depth: n, value: t };
    }
    return {
      itemSelected: function (e) {
        s.emit('selected', e);
      },
      parsed: Or(() => {
        const s = e.data;
        if (null != s && null != s) {
          const l = JSON.parse(s);
          if (l instanceof Object)
            return i(
              e.rootKey,
              ((e, s) => {
                for (var i in s || (s = {})) n.call(s, i) && r(e, i, s[i]);
                if (t) for (var i of t(s)) o.call(s, i) && r(e, i, s[i]);
                return e;
              })({}, l),
              0,
              '',
              !0,
            );
        }
        return { key: e.rootKey, type: ps.VALUE, path: '', depth: 0, value: e.data };
      }),
    };
  },
});
const bs = fn()((e, t, n, o, r, s) => {
  const i = Oo('JsonTreeViewItem');
  return (
    Ao(),
    Vo(
      i,
      {
        class: [{ 'root-item': !0, dark: 'dark' === e.colorScheme }],
        data: e.parsed,
        maxDepth: e.maxDepth,
        onSelected: e.itemSelected,
      },
      null,
      8,
      ['class', 'data', 'maxDepth', 'onSelected'],
    )
  );
});
(vs.render = bs), (vs.__scopeId = 'data-v-69a488e1');
export {
  To as F,
  vs as _,
  Oo as a,
  Vo as b,
  Or as c,
  wo as d,
  Ho as e,
  Wo as f,
  ls as g,
  Ao as o,
  nt as r,
  m as t,
  Zr as v,
  uo as w,
};
