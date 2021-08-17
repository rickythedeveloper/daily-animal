import Component from './Component';

interface Page {
	title: string;
}

type PageComponent = Component<'div'> & Page;

export default Page;
export { PageComponent };
