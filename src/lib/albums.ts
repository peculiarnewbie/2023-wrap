import type { VideoProps } from "./types";

export let albums: {
	pos: number;
	artist: string;
	title: string;
	videoProps: VideoProps;
}[] = [
	{
		pos: 1,
		artist: "Paramore",
		title: "This is Why",
		videoProps: {
			title: "Paramore - Running Out of Time",
			src: "https://www.youtube.com/watch?v=toKJP3luQbI",
			startTime: 58,
			alt: "my favorite"
		}
	},
	{
		pos: 2,
		artist: "Black Country, New Road",
		title: "Live at Bush Hall",
		videoProps: {
			title: "Black Country, New Road - 'Live at Bush Hall'",
			src: "https://www.youtube.com/watch?v=VbHV8oObR54&t=2751s",
			startTime: 2725.5,
			alt: "so happy they're still together"
		}
	},
	{
		pos: 3,
		artist: "Jeff Rosenstock",
		title: "HELLMODE",
		videoProps: {
			title: "",
			src: "https://www.youtube.com/watch?v=y8vJxLjnhBw",
			startTime: 164,
			alt: "definition of catharsis"
		}
	},
	{
		pos: 4,
		artist: "Sufjan Stevens",
		title: "Javelin",
		videoProps: {
			title: "",
			src: "https://www.youtube.com/watch?v=OLeCIRC4taY",
			startTime: 158.8,
			alt: "insane production"
		}
	},
	{
		pos: 5,
		artist: "boygenius",
		title: "the album",
		videoProps: {
			title: "",
			src: "https://www.youtube.com/watch?v=bIX_ouNJsTs",
			startTime: 181.5,
			alt: "feels"
		}
	},
	{
		pos: 6,
		artist: "Carly Rae Jepsen",
		title: "The Loveliest Time",
		videoProps: {
			title: "",
			src: "https://www.youtube.com/watch?v=e9SchUO-Qr8",
			startTime: 102.8,
			alt: "still the pop queen"
		}
	},
	{
		pos: 7,
		artist: "grouptherapy.",
		title: "i was mature for my age, but i was still a child",
		videoProps: {
			title: "",
			src: "https://www.youtube.com/watch?v=s9AMFQbxj1Y",
			startTime: 132,
			alt: "variety with identity"
		}
	},
	{
		pos: 8,
		artist: "KNOWER",
		title: "KNOWER FOREVER",
		videoProps: {
			title: "",
			src: "https://www.youtube.com/watch?v=Ois3gfcwKSA",
			startTime: 87,
			alt: "more like grooves forever amirite"
		}
	},
	{
		pos: 9,
		artist: "underscores",
		title: "Wallsocket",
		videoProps: {
			title: "",
			src: "https://www.youtube.com/watch?v=fG7foCO6wfc",
			startTime: 118.3,
			alt: "hyper zoomer caliber"
		}
	},
	{
		pos: 10,
		artist: "Caroline Polachek",
		title: "Desire, I Want To Turn Into You",
		videoProps: {
			title: "",
			src: "https://www.youtube.com/watch?v=hxgcz_6GKX0",
			startTime: 119.5,
			alt: "how can pop be so distinct"
		}
	},
	{
		pos: 11,
		artist: "Parannoul",
		title: "After the Magic",
		videoProps: {
			title: "",
			src: "https://www.youtube.com/watch?v=nwo48c6aK6I",
			startTime: 131.5,
			alt: "the live album is also magic"
		}
	},
	{
		pos: 12,
		artist: "Olivia Rodrigo",
		title: "GUTS",
		videoProps: {
			title: "",
			src: "https://www.youtube.com/watch?v=ZsJ-BHohXRI",
			startTime: 85.6,
			alt: "yea okay it wasn't a fluke"
		}
	},
	{
		pos: 13,
		artist: "Lana Del Rey",
		title: "Did you know that there's a tunnel under Ocean Blvd",
		videoProps: {
			title: "",
			src: "https://www.youtube.com/watch?v=C2e0H6MUWyU",
			startTime: 296,
			alt: "A&W deserves song of the year at the grammys"
		}
	},
	{
		pos: 14,
		artist: "Mitski",
		title: "My Love Mine All Mine",
		videoProps: {
			title: "Mitski - My Love Mine All Mine",
			src: "https://www.youtube.com/watch?v=vx4kLgnFexo",
			startTime: 66,
			alt: "so funny that this is the one that got her tik tok trending"
		}
	},
	{
		pos: 15,
		artist: "yeule",
		title: "Softscars",
		videoProps: {
			title: "",
			src: "https://www.youtube.com/watch?v=U112Stii6uE",
			startTime: 119,
			alt: "they just don't miss do they"
		}
	},
	{
		pos: 16,
		artist: "feeble little horse",
		title: "Girl with Fish",
		videoProps: {
			title: "",
			src: "https://www.youtube.com/watch?v=K8czw_eChTE",
			startTime: 56.5,
			alt: "the only one brave enough to ask 'Do I make you cringe?'"
		}
	},
	{
		pos: 17,
		artist: "Sampha",
		title: "Lahai",
		videoProps: {
			title: "",
			src: "https://www.youtube.com/watch?v=1YPtbploIyU",
			startTime: 79.5,
			alt: "the word 'lush'"
		}
	},
	{
		pos: 18,
		artist: "Tinashe",
		title: "BB_ANG3L",
		videoProps: {
			title: "",
			src: "https://www.youtube.com/watch?v=RVLGp0Ph9lA",
			startTime: 60,
			alt: "okay but why is it only 20 minutes tho"
		}
	},
	{
		pos: 19,
		artist: "Balming Tiger",
		title: "January Never Dies",
		videoProps: {
			title: "",
			src: "https://www.youtube.com/watch?v=zYNvj7_44Gs",
			startTime: 114.5,
			alt: "RM should just leave BTS and join these guys"
		}
	},
	{
		pos: 20,
		artist: "PinkPantheress",
		title: "Heaven Knows",
		videoProps: {
			title: "",
			src: "https://www.youtube.com/watch?v=fd6tyv8GowY",
			startTime: 154.7,
			alt: "hard to believe that this is a debut"
		}
	}
];
