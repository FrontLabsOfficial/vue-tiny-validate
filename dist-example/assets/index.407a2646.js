var e = Object.defineProperty,
  s = Object.defineProperties,
  t = Object.getOwnPropertyDescriptors,
  r = Object.getOwnPropertySymbols,
  a = Object.prototype.hasOwnProperty,
  i = Object.prototype.propertyIsEnumerable,
  l = (s, t, r) => (t in s ? e(s, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : (s[t] = r)),
  n = (e, s) => {
    for (var t in s || (s = {})) a.call(s, t) && l(e, t, s[t]);
    if (r) for (var t of r(s)) i.call(s, t) && l(e, t, s[t]);
    return e;
  },
  d = (e, r) => s(e, t(r));
import {
  r as o,
  c as u,
  d as m,
  _ as c,
  a as $,
  b as f,
  e as v,
  w as p,
  v as g,
  t as b,
  f as y,
  F as N,
  o as O,
  g as j,
} from './vendor.d088c182.js';
const w = () => !0,
  h = '',
  k = { $invalid: !1, $errors: [], $messages: [], $test: () => {}, $reset: () => {} },
  V = e => '[object Object]' === Object.prototype.toString.call(e);
var I = m({
  name: 'App',
  components: { JsonTreeView: c },
  setup() {
    const e = o({ firstName: '', lastName: '', address: { district: '', street: '', no: '' } }),
      s = e => '' !== e,
      t = {
        firstName: [{ $test: s, $message: 'Input is required' }],
        lastName: [{ $test: s, $message: 'Input is required' }],
        address: {
          district: [{ $test: s, $message: 'Input is required' }],
          street: [
            { $test: s, $message: 'Input is required' },
            { $test: e => String(e).length >= 10, $message: 'At least 10 chars' },
          ],
          no: [
            { $test: s, $message: 'Input is required' },
            {
              $test: e => '' !== e && !isNaN(Number(e)),
              $message: e => `Input ${e} is not allowed. A number is required`,
            },
          ],
        },
      },
      { result: r } = ((e, s) => {
        const t = o({}),
          r = o({}),
          a = o({}),
          i = u(() => l(a, t)),
          l = (e, s) => {
            const t = d(n({}, k), { $dirty: !1 }),
              r = Object.keys(e);
            let a = [],
              i = [];
            const o = (e, s) => {
              !e.$dirty && s.$dirty && (e.$dirty = !0),
                !e.$invalid && s.$invalid && (e.$invalid = !0),
                (e.$errors = [...e.$errors, ...s.$errors]),
                (e.$messages = [...e.$messages, ...s.$messages]),
                (a = [...a, s.$test]),
                (i = [...i, s.$reset]);
            };
            return (
              r.forEach(r => {
                if (V(e[r]) && void 0 === e[r].$invalid) {
                  const a = l(e[r], s[r]);
                  (t[r] = n({}, a)), o(t, a);
                } else (t[r] = n({}, e[r])), (t[r].$dirty = s[r]), o(t, t[r]);
              }),
              (t.$test = () => {
                a.forEach(e => e());
              }),
              (t.$reset = () => {
                i.forEach(e => e());
              }),
              t
            );
          },
          m = (e, s, t, r, a) => {
            Object.keys(e).forEach(i => {
              if (V(e[i])) {
                (r[i] = {}), (t[i] = o({})), (a[i] = o({}));
                const l = [e[i], s[i], t[i], r[i], a[i]];
                return m(...l);
              }
              (t[i] = !1), (r[i] = e[i]);
              const l = { data: e, rules: s, dirt: t, rawData: r, entry: a };
              a[i] = d(n({}, k), { $reset: () => $(l, i), $test: () => c(l, i) });
            });
          },
          c = (e, s) => {
            const { data: t, rules: r, dirt: a, rawData: i, entry: l } = e;
            a[s] = a[s] || t[s] !== i[s];
            let o = [],
              u = [];
            r[s].forEach((e, r) => {
              const { $test: a = w, $message: i = h } = e;
              if (!a(t[s])) {
                const e = 'function' == typeof i ? i(t[s]) : i;
                (u = [...u, e]), (o = [...o, { name: a.name, index: r }]);
              }
            }),
              (l[s] = d(n({}, l[s]), { $errors: o, $messages: u, $invalid: Boolean(o.length) }));
          },
          $ = (e, s) => {
            const { dirt: t } = e;
            t[s] = !1;
          };
        return m(e, s, t, r, a), { result: i, test: i.value.$test, reset: i.value.$reset };
      })(e, t);
    return {
      info: e,
      result: r,
      validate: () => {
        r.value.$test();
      },
    };
  },
});
const q = { class: 'form' },
  E = { class: 'form-item' },
  P = v('label', null, 'First Name', -1),
  S = { key: 0, class: 'form-item-message' },
  U = { class: 'form-item' },
  D = v('label', null, 'Last Name', -1),
  A = { key: 0, class: 'form-item-message' },
  J = { class: 'form-item' },
  F = v('label', null, 'District', -1),
  T = { key: 0, class: 'form-item-message' },
  x = { class: 'form-item' },
  B = v('label', null, 'Street', -1),
  C = { key: 0, class: 'form-item-message' },
  L = { class: 'form-item' },
  _ = v('label', null, 'Number', -1),
  z = { key: 0, class: 'form-item-message' },
  G = { class: 'tree' };
(I.render = function (e, s, t, r, a, i) {
  const l = $('JsonTreeView');
  return (
    O(),
    f(
      N,
      null,
      [
        v('div', q, [
          v('div', E, [
            P,
            p(
              v(
                'input',
                {
                  'onUpdate:modelValue': s[1] || (s[1] = s => (e.info.firstName = s)),
                  class: { 'input-error': e.result.firstName.$invalid },
                },
                null,
                2,
              ),
              [[g, e.info.firstName]],
            ),
            e.result.firstName.$invalid ? (O(), f('div', S, b(e.result.firstName.$messages), 1)) : y('v-if', !0),
          ]),
          v('div', U, [
            D,
            p(
              v(
                'input',
                {
                  'onUpdate:modelValue': s[2] || (s[2] = s => (e.info.lastName = s)),
                  class: { 'input-error': e.result.lastName.$invalid },
                },
                null,
                2,
              ),
              [[g, e.info.lastName]],
            ),
            e.result.lastName.$invalid ? (O(), f('div', A, b(e.result.lastName.$messages), 1)) : y('v-if', !0),
          ]),
          v('div', J, [
            F,
            p(
              v(
                'input',
                {
                  'onUpdate:modelValue': s[3] || (s[3] = s => (e.info.address.district = s)),
                  class: { 'input-error': e.result.address.district.$invalid },
                },
                null,
                2,
              ),
              [[g, e.info.address.district]],
            ),
            e.result.address.district.$invalid
              ? (O(), f('div', T, b(e.result.address.district.$messages), 1))
              : y('v-if', !0),
          ]),
          v('div', x, [
            B,
            p(
              v(
                'input',
                {
                  'onUpdate:modelValue': s[4] || (s[4] = s => (e.info.address.street = s)),
                  class: { 'input-error': e.result.address.street.$invalid },
                },
                null,
                2,
              ),
              [[g, e.info.address.street]],
            ),
            e.result.address.street.$invalid
              ? (O(), f('div', C, b(e.result.address.street.$messages), 1))
              : y('v-if', !0),
          ]),
          v('div', L, [
            _,
            p(
              v(
                'input',
                {
                  'onUpdate:modelValue': s[5] || (s[5] = s => (e.info.address.no = s)),
                  class: { 'input-error': e.result.address.no.$invalid },
                },
                null,
                2,
              ),
              [[g, e.info.address.no]],
            ),
            e.result.address.no.$invalid ? (O(), f('div', z, b(e.result.address.no.$messages), 1)) : y('v-if', !0),
          ]),
          v(
            'button',
            { class: 'validate-btn', onClick: s[6] || (s[6] = (...s) => e.validate && e.validate(...s)) },
            'Validate',
          ),
        ]),
        v('div', G, [v(l, { data: JSON.stringify(e.result) }, null, 8, ['data'])]),
      ],
      64,
    )
  );
}),
  j(I).mount('#app');
