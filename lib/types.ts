export interface Source {
	id: string;
	color?: string;
	icon?: any;
	image?: string;
	name: string;
}

export interface ConfigureBlockProps {
	saveBlock: (data: any) => void;
}
