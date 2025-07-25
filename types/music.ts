export interface Album {
	title: string;
	artist: string;
	url: string;
	image: string;
	blurDataURL?: string;
}

export interface MusicItem {
	title: string;
	subtitle?: string;
	imageUrl: string;
	url: string;
	mbid: string;
	blurDataURL: string;
}
