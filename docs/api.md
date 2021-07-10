## Parameters

Data:

```ts
type Data = { [key: string]: any };

type DataParam: UnwrapRef<Data> | Ref<Data> | ComputedRef<Data>;
```

Rules:

```ts
type Rule = {
  $test: ((value: any) => boolean) | ((value: any) => Promise<boolean>);
  $message?: string | ((value: any) => string);
  $key: string;
};

type Rules = {
  [key: string]: Array<Rule> | Rule | Rules;
};

type RulesParam: UnwrapRef<Rules> | Ref<Rules> | ComputedRef<Rules>;
```

**Data** and **Rules** should have same structure or at least **Data** has all the properties that **Rules** has.

They all must be **reactive object**. More exactly, they can only be **Ref**, **Reactive** or **Computed**.

## Result

```ts
type Result = {
  $invalid: boolean;
  $errors: Array<Error>;
  $messages: Array<string>;
  $dirty: boolean;

  // method properties...
};
```

### $invalid

- Type: `boolean`
- Default: `false`

Validation state. It's **true** whenever properties has **errors**.

### $errors

```ts
type Error = {
  name: string;
  message?: string | null;
};
```

- Type: `Array<Error>`
- Default: `[]`

All the error objects go here. Each of them contains **name** and **message**.

### $messages

- Type: `Array<string>`
- Default: `[]`

All the error messages go here.

### $dirty

- Type: `boolean`
- Default: `false`

State to check whether property is **touched** or **dirtied**. It's **true** whenever property's value is **changed** or
property is **touched** using `touch` method.

## Methods

```ts
type Result = {
  // result properties...

  $test: () => void;
  $reset: () => void;
  $touch: () => void;
};
```

### $test

- Type: `function`

The `$test` method loops through **rule array** of each property and execute test based on each **rule item**.

### $reset

- Type: `function`

The `$reset` method sets result of property to its default value.

### $touch

- Type: `function`

The `$touch` method sets `dirty` result of property to **true**.

## Options

```ts
type Option = {
  autoTouch?: boolean;
  autoTest?: boolean;
  lazy?: boolean;
  firstError?: boolean;
  touchOnTest?: boolean;
};
```

### autoTest

- Type: `boolean`
- Default: `false`

Normally, the `result` object is only updated whenever `$test` method is called. Set this option to **true** will
make the `$test` method to be executed on **every property changes**.

### autoTouch

Same as the option right above. Set this option to **true** will make `$touch` method to be executed on **every property
changes**.

### lazy

As said above, `$test` method will execute all rule item of each property. It's gonna be **redudant** if `$test` method
tests **undirtied** or **untouched** property because it haven't updated yet. Set this option to **true** will make
`$test` method skip **undirtied** or **untouched** property.

### firstError

In some cases, you only need to get the first error of your validation. Set this option to **true** will make `$test`
method stop after getting its first error.

### touchOnTest

By default, when execute `$test` method, only changed property will be considered as **dirtied** or **touched**. Set
this option to **true** will make `$touch` method to be executed along with `$test` method.
