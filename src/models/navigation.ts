import Component from './Component';
import { PageComponent } from './Page';

class Navigation {
	_contentComponent?: Component<'div'>;

	get contentComponent() { return this._contentComponent; }

	set contentComponent(value: Component<'div'> | undefined) {
		if (value === undefined) throw new Error('Cannot set contentComponent to undefined');
		if (this.contentComponent) throw new Error('Cannot set contentComponent more than once');
		this._contentComponent = value;
	}

	_history: PageComponent[] = [];

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

	get currentPage() {
		if (this.history.length === 0) return undefined;
		return this.history[this.currentIndex];
	}

	get currentTitle() {
		if (this.currentPage === undefined) return undefined;
		return this.currentPage.title;
	}

	private renderPage(page: PageComponent) {
		if (!this.contentComponent) throw new Error('contentComponent is undefined');
		this.contentComponent.children = [page];
	}

	pageDidChangeCallbacks: {
		[key: string]: (
			oldPage: PageComponent | undefined,
			newPage: PageComponent
		) => void;
	} = {};

	navigate(newPage: PageComponent) {
		if (!this.contentComponent) throw new Error('contentComponent is undefined');
		const oldPage = this.currentPage;
		this.renderPage(newPage);

		if (this.history.length === 0) {
			this.history.push(newPage);
			this.currentIndex = 0;
		} else {
			this.history.splice(this.currentIndex + 1, this._history.length - this.currentIndex - 1);
			this.history.push(newPage);
			this.currentIndex += 1;
		}
		this.pageDidChange(oldPage);
	}

	goBack() {
		if (this.currentIndex <= 0) throw new Error('Cannot go back further');
		const oldPage = this.currentPage;
		this.currentIndex -= 1;
		this.pageDidChange(oldPage);
	}

	goForward() {
		if (this.currentIndex >= this.history.length - 1) throw new Error('Cannot go forwards further');
		const oldPage = this.currentPage;
		this.currentIndex += 1;
		this.pageDidChange(oldPage);
	}

	get canGoBack(): boolean {
		return this.currentIndex > 0;
	}

	get canGoForward(): boolean {
		return this.currentIndex < this.history.length - 1;
	}

	addListener(listenerName: string, onChange: (oldPage: PageComponent | undefined, newPage: PageComponent) => void) {
		this.pageDidChangeCallbacks[listenerName] = onChange;
	}

	pageDidChange(oldPage: PageComponent | undefined) {
		const newPage = this.currentPage;
		if (newPage === undefined) throw new Error('new page not found on change');
		Object.values(this.pageDidChangeCallbacks).forEach((callback) => callback(oldPage, newPage));
	}
}

const navigation = new Navigation();
export default navigation;
