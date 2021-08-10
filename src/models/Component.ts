class Component<T extends keyof HTMLElementTagNameMap> {
	_element: HTMLElementTagNameMap[T];

	_children: Component<any>[];

	get element() { return this._element; }

	get children() { return this._children; }

	set children(value: Component<any>[]) {
		this._children = value;

		while (this.element.lastElementChild) {
			this.element.removeChild(this.element.lastElementChild);
		}
		value.forEach((component) => {
			this.element.appendChild(component.element);
		});
	}

	constructor(element: HTMLElementTagNameMap[T], children?: Component<any>[]) {
		this._element = element;
		this._children = children || [];
	}

	static new<K extends keyof HTMLElementTagNameMap>(tag: K): Component<K> {
		return new Component(document.createElement(tag));
	}

	appendChild(component: Component<any>) {
		this.appendChildren(component)
	}

	appendChildren(...components: Component<any>[]) {
		const newChildren = [...this.children, ...components];
		this.children = newChildren;
	}

	replaceChild(newChild: Component<any>, oldChild: Component<any>) {
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
