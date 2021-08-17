import Component from '../../models/Component';

class FloatingComponent extends Component<'div'> {
	_mainComponent: Component<any> = new Component('div');

	get mainComponent() { return this._mainComponent; }

	set mainComponent(value: Component<any>) {
		this._mainComponent = value;
		this.children = [this.mainComponent, this.dummyComponent];
		this.mainComponent.removeOnChangeListener('floatingComponent');
		this.addSizingClassListToMainComponent();
		setTimeout(this.setDummySize.bind(this), 10);
		this.mainComponent.addOnChangeListener('floatingComponent', this.setDummySize.bind(this));
	}

	readonly dummyComponent: Component<'div'> = new Component('div');

	readonly sizingClassList: string[];

	constructor(...sizingClassList: string[]) {
		super('div');
		this.sizingClassList = sizingClassList;
		this.element.classList.add('floatingComponent');

		this.addSizingClassListToMainComponent();
		this.dummyComponent.element.classList.add('floatingComponentDummy', ...this.sizingClassList);

		this.children = [this.mainComponent, this.dummyComponent];

		setTimeout(this.setDummySize.bind(this), 10);
	}

	addSizingClassListToMainComponent() {
		this.mainComponent.element.classList.add('floatingComponentMain', ...this.sizingClassList);
	}

	setDummySize() {
		const { clientWidth, clientHeight } = this.mainComponent.element;

		this.dummyComponent.element.style.height = `${clientHeight}px`;
		this.dummyComponent.element.style.width = `${clientWidth}px`;
	}
}

export default FloatingComponent;
