import Component from '../models/Component';

const Content = (): Component<'div'> => {
	const component = new Component('div');
	component.element.id = 'content';
	return component;
};

export default Content;
