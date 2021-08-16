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

	onChangeCallbacks: { [listenerName: string]: () => void } = {};

	constructor(tag: T) {
		this._element = document.createElement(tag);
		this._children = [];
	}

	static fromElement<K extends keyof HTMLElementTagNameMap>(
		tag: K,
		element: HTMLElementTagNameMap[K],
		children?: Component<any>[],
	): Component<K> {
		const component = new Component(tag);
		component._element = element; // eslint-disable-line no-underscore-dangle
		component._children = children || []; // eslint-disable-line no-underscore-dangle
		return component;
	}

	appendChildren(...components: Component<any>[]) {
		const newChildren = [...this.children, ...components];
		this.children = newChildren;
	}

	removeChildewn(...children: Component<any>[]) {
		children.forEach((child) => {
			const oldChildIndex = this.children.indexOf(child);
			if (oldChildIndex === -1) throw new Error('Cannot remove a child that does not exist');
			this.children.splice(oldChildIndex, 1);
		});
	}

	replaceChild(newChild: Component<any>, oldChild: Component<any>) {
		const oldChildIndex = this.children.indexOf(oldChild);
		if (oldChildIndex === -1) throw new Error('Cannot replace a child that does not exist');
		this.children = [
			...this.children.slice(0, oldChildIndex),
			newChild,
			...this.children.slice(oldChildIndex + 1, this.children.length),
		];
	}

	addOnChangeListener(listenerName: string, onChange: () => void) { this.onChangeCallbacks[listenerName] = onChange; }

	removeOnChangeListener(listenerName: string) { delete this.onChangeCallbacks[listenerName]; }

	onChange() {
		Object.values(this.onChangeCallbacks).forEach((callback) => callback());
	}
}

export default Component;
