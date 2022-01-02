### FAQ

**Q: Why is there no built-in validator ?**

**A**: Frankly saying, it's because we are **super lazy**. Moreover, we believe that there is no pre-built validator
that can satisfy all of your needs, so it's **redundant** to have any in the first place. Instead, just build your own
validator.

**Q: Why should all parameters be reactive objects?**

**A**: In short, to take advantage of Vue's `watch` method to track their changes effortlessly.

**Q: Why does re-assigning any `rules` or `options` values also cause the validation results to reset??**

**A**: Since the library depends on `watch`'s **shallow comparison**, re-assigning any reactive object will trigger
`watch`'s **callback function**. In this case, it will **re-initialize** the validation.

**Have a question? Feel free to create an [issue](https://github.com/FrontLabsOfficial/vue-tiny-validate/issues). Thank
you.**
