import Component from '../../../models/Component';

enum ArrowType {
	left,
	right,
}
class CarouselArrow extends Component<'div'> {
	constructor(public type: ArrowType, public width: number, public height: number) {
		super('div');
		this.element.classList.add(
			'carouselArrow',
			type === ArrowType.left ? 'carouselArrowBack' : 'carouselArrowForward',
		);
		this.element.style.width = `${width}px`;
		this.element.style.height = `${height}px`;
		this.element.style.marginTop = `${-height / 2}px`;

		this.setCanvas();
	}

	setCanvas() {
		const canvasComponent = new Component('canvas');
		const canvas = canvasComponent.element;
		canvas.width = this.width;
		canvas.height = this.height;

		const canvasContext = canvas.getContext('2d');
		if (canvasContext === null) return;

		const cornerRadius = 5;
		canvasContext.beginPath();
		canvasContext.arc(cornerRadius, cornerRadius, cornerRadius, Math.PI, (3 / 2) * Math.PI);
		canvasContext.lineTo(canvas.width - cornerRadius, 0);
		canvasContext.arc(canvas.width - cornerRadius, cornerRadius, cornerRadius, (3 / 2) * Math.PI, 2 * Math.PI);
		canvasContext.lineTo(canvas.width, canvas.height - cornerRadius);
		canvasContext.arc(canvas.width - cornerRadius, canvas.height - cornerRadius, cornerRadius, 0, Math.PI / 2);
		canvasContext.lineTo(cornerRadius, canvas.height);
		canvasContext.arc(cornerRadius, canvas.height - cornerRadius, cornerRadius, Math.PI / 2, Math.PI);
		canvasContext.lineTo(0, cornerRadius);
		canvasContext.fillStyle = '#000a';
		canvasContext.fill();

		const padding = 5;
		canvasContext.beginPath();
		if (this.type === ArrowType.left) {
			canvasContext.moveTo(padding, canvas.height / 2);
			canvasContext.lineTo(canvas.width - padding, canvas.height - padding);
			canvasContext.lineTo(canvas.width - padding, padding);
		} else {
			canvasContext.moveTo(padding, padding);
			canvasContext.lineTo(padding, canvas.height - padding);
			canvasContext.lineTo(canvas.width - padding, canvas.height / 2);
		}
		canvasContext.fillStyle = '#fff7';
		canvasContext.fill();

		this.children = [canvasComponent];
	}
}

export default CarouselArrow;
export { ArrowType };
