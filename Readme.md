# `aria-owns`
## Useful links
- [MDN aria-owns](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-owns)
- [Our practical example](https://jesusgonzaleza.github.io/ExampleAriaOwns/)

## What is `aria-owns`?
It is an attribute that allows to define the parental relationship of an object in the *Accessibility Object Model*. 

## How to use `aria-owns`?
The attribute accepts a list of `id` separated by a space character. 
If an element has `aria-owns` and DOM children, the order of the child elements would be:
1. The actual DOM children.
2. The referenced children by `id` in `aria-owns`.

## When can I use `aria-owns`?
It is useful when the parent/child relationship cannot be determined from the DOM.

### Example
* `Pop-up sub-menu` that visually appear positioned near a parent menu, but cannot be nested on the DOM because it would affect the visual presentation.
* Managing the order in which elements are announced in a screen reader. You can check [our practical example](https://jesusgonzaleza.github.io/ExampleAriaOwns/).
  Imagine we have a `tablist` with `closable tabs`. As a screen reader user, I would like:
  - To announce the `tablist` ad all its `tab` children at once, when entering the `tablist`.
  - To move from `tab` to `tab` using the arrows, as I frequently do.

  If I had the `closable button` next to the `tab`, when I use the `virtual cursor` in `JAWS` or the `Browser Mode` in `NVDA` the screen reader would follow the tab order, so I would lose the possibility to announce all the tabs at once and implement this type of navigation amongst tabs.
  A way to fix this is to use the `aria-owns` attribute, that allows the developer to define the screen reader order. We can think of a parallelism with `tabindex` in this scenario.
