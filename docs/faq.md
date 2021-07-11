### FAQ

**Q: Why there is no built-in validators?**

**A**: Frankly saying, it's because we are super lazy. Moreover, we believe that, there is no pre-built validators that
satisfies all of your needs. So, it's redundant to have any pre-built validators. Instead, just build your own validator.

**Q: Why all parameters should be reactive object?**

**A**: In short, to take advantage of Vue's `watch` method to track their changes effortlessly.

**Q: Why resetting any of _data_, _rules_ or _options_ values will also reset the validation results?**

**A**: Since the library depends on `watch`'s **shallow comparison**, resetting any reactive object will trigger `watch`'s
**callback function**. In this case, it will **re-initialize** the validation.

**Have a question? Feel free to create an [issue](https://github.com/FrontLabsOfficial/vue-tiny-validate/issues). Thank
you.**
