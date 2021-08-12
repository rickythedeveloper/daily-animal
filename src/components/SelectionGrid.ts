import OnOffButton from './OnOffButton';
import Component from '../models/Component';

class SelectionGrid extends Component<'div'> {
	indicators: boolean[];

	private onChange(index: number, isOn: boolean) {
		if (index >= this.indicators.length) return;
		this.indicators[index] = isOn;
	}

	constructor(public options: string[], onChange: (index: number, isOn: boolean) => void) {
		super('div');
		this.element.classList.add('grid');
		const buttons = options.map((option, index) => OnOffButton(option, (isOn) => {
			this.onChange(index, isOn);
			onChange(index, isOn);
		}));
		this.appendChildren(...buttons);
		this.indicators = Array<boolean>(options.length).fill(false);
	}
}

export default SelectionGrid;
