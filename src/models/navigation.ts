import Component from './Component';

class Navigation {
	_contentComponent?: Component<'div'>;

	get contentComponent() { return this._contentComponent; }

	set contentComponent(value: Component<'div'> | undefined) {
		if (value === undefined) throw new Error('Cannot set contentComponent to undefined');
		if (this.contentComponent) throw new Error('Cannot set contentComponent more than once');
		this._contentComponent = value;
	}

	_history: Component<'div'>[] = [];

	get history() { return this._history; }

	private _currentIndex: number = 0;

	private get currentIndex() { return this._currentIndex; }

	private set currentIndex(index: number) {
		if (index >= this.history.length) throw new Error('Setting invalid index in navigation');
		if (!this.contentComponent) throw new Error('contentComponent is undefined');
		const newPage = this.history[index];
		this.renderPage(newPage);
		this._currentIndex = index;
	}

	private renderPage(page: Component<'div'>) {
		if (!this.contentComponent) throw new Error('contentComponent is undefined');
		this.contentComponent.children = [page];
	}

	navigate(newPage: Component<'div'>) {
		if (!this.contentComponent) throw new Error('contentComponent is undefined');
		this.renderPage(newPage);

		if (this.history.length === 0) {
			this.history.push(newPage);
			this.currentIndex = 0;
		} else {
			this.history.splice(this.currentIndex + 1, this._history.length - this.currentIndex - 1);
			this.history.push(newPage);
			this.currentIndex += 1;
		}
	}

	goBack() {
		if (this.currentIndex <= 0) throw new Error('Cannot go back further');
		this.currentIndex -= 1;
	}

	goForward() {
		if (this.currentIndex >= this.history.length - 1) throw new Error('Cannot go forwards further');
		this.currentIndex += 1;
	}

	get canGoBack(): boolean {
		return this.currentIndex > 0;
	}

	get canGoForward(): boolean {
		return this.currentIndex < this.history.length - 1;
	}
}

const navigation = new Navigation();
export default navigation;
