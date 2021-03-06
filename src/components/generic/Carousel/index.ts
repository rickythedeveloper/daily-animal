import Component from '../../../models/Component';
import CarouselArrow, { ArrowType } from './CarouselArrow';

const CAROUSEL_ARROW_WIDTH = 30;
const CAROUSEL_ARROW_HEIGHT = 30;

class Carousel extends Component<'div'> {
	_photoUrls: string[] = [];

	get photoUrls() { return this._photoUrls; }

	set photoUrls(value: string[]) {
		const urlsNoDuplicate = Array.from(new Set(value));
		const photoComponents = urlsNoDuplicate.map((url, index) => {
			const photoComponent = new Component('img');
			photoComponent.element.classList.add('carouselPhoto');
			photoComponent.element.src = url;
			photoComponent.element.style.left = `${index}00%`;
			return photoComponent;
		});
		this.photosContainer.children = photoComponents;
		this._photoUrls = urlsNoDuplicate;
		this.updateButtons();
	}

	_currentIndex: number = 0;

	get currentIndex() { return this._currentIndex; }

	set currentIndex(value: number) {
		this._currentIndex = value;
		this.photosContainer.element.style.left = `-${this.currentIndex}00%`;
	}

	nextButton: CarouselArrow = (() => {
		const component = new CarouselArrow(ArrowType.right, CAROUSEL_ARROW_WIDTH, CAROUSEL_ARROW_HEIGHT);
		component.element.onclick = this.goToNext.bind(this);
		return component;
	})();

	backButton: Component<'div'> = (() => {
		const component = new CarouselArrow(ArrowType.left, CAROUSEL_ARROW_WIDTH, CAROUSEL_ARROW_HEIGHT);
		component.element.onclick = this.goToPrevious.bind(this);
		return component;
	})();

	photosContainer: Component<'div'> = new Component('div');

	constructor() {
		super('div');
		this.element.classList.add('carousel');
		this.photosContainer.element.classList.add('carouselPhotoContainer');
		this.children = [this.photosContainer, this.nextButton, this.backButton];

		this.updateButtons();
	}

	updateButtons() {
		const nextButtonShouldBeHidden = this.currentIndex === this.photoUrls.length - 1;
		this.nextButton.element.hidden = nextButtonShouldBeHidden;

		const backButtonShouldBeHidden = this.currentIndex === 0;
		this.backButton.element.hidden = backButtonShouldBeHidden;
	}

	goToNext(event: MouseEvent) {
		event.stopPropagation();
		if (this.currentIndex >= this.photoUrls.length - 1) return;
		this.currentIndex += 1;
		this.updateButtons();
	}

	goToPrevious(event: MouseEvent) {
		event.stopPropagation();
		if (this.currentIndex <= 0) return;
		this.currentIndex -= 1;
		this.updateButtons();
	}
}

export default Carousel;
