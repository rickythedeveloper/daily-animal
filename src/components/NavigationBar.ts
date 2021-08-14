import Component from '../models/Component';
import navigation from '../models/navigation';

class NavigationBar extends Component<'div'> {
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

		this.children = [backButton, nextButton];
	}
}

const navigationBar = new NavigationBar();

export default navigationBar;
