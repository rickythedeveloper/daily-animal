class Component {
	_element: HTMLElement;

	_children: Component[];

	get element() { return this._element; }

	get children() { return this._children; }

	set children(value: Component[]) {
		this._children = value;

		while (this.element.lastElementChild) {
			this.element.removeChild(this.element.lastElementChild);
		}
		value.forEach((component) => {
			this.element.appendChild(component.element);
		});
	}

	constructor(element: HTMLElement, children?: Component[]) {
		this._element = element;
		this._children = children || [];
	}

	static new(tag: keyof HTMLElementTagNameMap): Component {
		return new Component(document.createElement(tag));
	}

	appendChildren(...components: Component[]) {
		const newChildren = [...this.children, ...components];
		this.children = newChildren;
	}

	replaceChild(newChild: Component, oldChild: Component) {
		const oldChildIndex = this.children.indexOf(oldChild);
		if (oldChildIndex === -1) return;
		this.children = [
			...this.children.slice(0, oldChildIndex),
			newChild,
			...this.children.slice(oldChildIndex + 1, this.children.length),
		];
	}

	addClass(className: string) {
		this.element.classList.add(className);
	}
}

export default Component;
