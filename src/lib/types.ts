export type VideoProps = {
	title: string;
	src: string;
	startTime: number;
	alt: string;
};

export type Album = {
	pos: number;
	artist: string;
	albumArt: string;
	videoProps: VideoProps;
};
