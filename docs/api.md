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

`Data` and `Rules` should have the same structure, and `Data` must always have all the properties that `Rules` has.

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

Validation state. It's **true** whenever properties have **errors**.

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

State to check whether property has been **touched** or **dirtied**. It's **true** whenever property's value has been
**changed** or property is **touched** using `touch` method.

### $pending

- Type: `boolean`
- Default: `false`

It's **true** whenever the `$test` method is performing **async validation**.

## Methods

```ts
type Result = {
  // result properties...

  $test: (() => void) | (() => Promise<void>);
  $reset: () => void;
  $touch: () => void;
};
```

### $test

- Type: `async function | function`
- Default: `(value: any, data?: Data, rules?: Rules, option?: Option) => void`

The `$test` method loops through the array of rules of each property and executes `test` function of each rule item.

### $reset

- Type: `function`
- Default: `() => void`

The `$reset` method sets the result of the property to its default value.

### $touch

- Type: `function`
- Default: `() => void`

The `$touch` method sets `dirty` result of the property to **true**.

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

Normally, the `result` object is only updated whenever `$test` method is called. Setting this option to **true** will
have the `$test` method executed on every property change.

### autoTouch

- Type: `boolean`
- Default: `false`

Same as the option right above. Setting this option to **true** will have `$touch` method executed on every property
change.

### lazy

- Type: `boolean`
- Default: `false`

As said above, `$test` method will execute all rule items of each property. It's gonna be **redudant** if the `$test`
method tests **undirtied** or **untouched** properties, as they haven't been updated. Setting this option to **true**
will make the `$test` method skip **undirtied** or **untouched** properties.

### firstError

- Type: `boolean`
- Default: `false`

In some cases, to minimize effort, you only need to validate through the first error. Setting this option to **true**
will make the `$test` method stop the validation process after getting its **first error**.

### touchOnTest

- Type: `boolean`
- Default: `false`

By default, when executing the `$test` method, only changed properties will be considered as **dirtied** or **touched**.
Setting this option to **true** will have the `$touch` method executed along with the `$test` method.

### transform

- Type: `function`
- Default: `(value: any, data?: Data, rules?: Rules, option?: Option) => any`

In some cases, you might want to modify or attach a value to the `result` value. That's when `transform` comes. Use this
option to transform the `result` object to anything that fits your needs.
