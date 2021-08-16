import Component from '../../models/Component';
import navigation from '../../models/navigation';
import { PageComponent } from '../../models/Page';

class NavigationBar extends Component<'div'> {
	titleBar: Component<'div'> = (() => {
		const component = new Component('div');
		return component;
	})();

	constructor() {
		super('div');
		this.element.id = 'navigationBar';

		const backButton = new Component('div');
		backButton.element.innerText = '<';
		backButton.element.classList.add('navigationBarButton', 'backButton');
		backButton.element.onclick = () => {
			if (navigation.canGoBack) navigation.goBack();
		};

		const nextButton = new Component('div');
		nextButton.element.innerText = '>';
		nextButton.element.classList.add('navigationBarButton', 'nextButton');
		nextButton.element.onclick = () => {
			if (navigation.canGoForward) navigation.goForward();
		};

		this.children = [backButton, nextButton, this.titleBar];
		navigation.addListener('navigationBar', this.navigationOnChange.bind(this));
	}

	navigationOnChange(oldPage: PageComponent | undefined, newPage: PageComponent) {
		oldPage?.removeOnChangeListener('navigationBar');
		newPage.addOnChangeListener('navigationBar', this.pageOnChange.bind(this));
		this.updateTitle();
	}

	pageOnChange() {
		this.updateTitle();
	}

	updateTitle() {
		this.titleBar.element.innerText = navigation.currentPage?.title || 'DOGGO';
	}
}

const navigationBar = new NavigationBar();

export default navigationBar;
