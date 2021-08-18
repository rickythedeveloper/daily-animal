import OnOffButton from './OnOffButton';
import Component from '../../models/Component';

class SelectionGrid extends Component<'div'> {
	indicators: boolean[];

	optionButtons: OnOffButton[];

	allButton: OnOffButton;

	private onSelectionChange(index: number, isOn: boolean) {
		if (index >= this.indicators.length) return;
		this.indicators[index] = isOn;
	}

	constructor(public options: string[]) {
		super('div');
		this.element.classList.add('grid', 'selectionGrid');
		this.optionButtons = options.map((option, index) => {
			const button = new OnOffButton(option);
			button.addOnChangeListener('selectionGrid', () => {
				this.onSelectionChange(index, button.isOn);
				this.onChange();
			});
			return button;
		});
		this.allButton = new OnOffButton('All', false);
		this.allButton.addOnChangeListener('selectionGrid', () => {
			this.optionButtons.forEach((button, index) => {
				button.setState(this.allButton.isOn);
				this.onSelectionChange(index, this.allButton.isOn);
			});
			this.onChange();
		});
		this.appendChildren(...this.optionButtons, this.allButton);
		this.indicators = Array<boolean>(options.length).fill(false);
	}
}

export default SelectionGrid;
