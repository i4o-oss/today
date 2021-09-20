export interface Source {
	id: string;
	color?: string;
	icon?: any;
	image?: string;
	name: string;
}

export interface Block {
	accessToken?: string;
	coordinates?: { lat: string; lon: string };
	feeds?: string[];
	podcasts?: string[];
	size?: number;
	title: string;
	type?: string;
	visible?: boolean;
}

export interface ConfigureBlockProps {
	saveBlock: (data: any) => void;
}
