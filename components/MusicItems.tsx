import { MusicItem as MusicItemType } from "@/types/music";
import { AnimatePresence } from "framer-motion";
import { MusicItem } from "./MusicItem";

const MusicItems = ({
	musicItems = Array(5).fill(0),
	isLoading = true,
	type,
	time,
}: {
	musicItems: MusicItemType[];
	isLoading: boolean;
	type: "album" | "artist";
	time: "week" | "month" | "year" | "all";
}) => {
	return (
		<div className="mx-auto my-4 grid w-5xl max-w-6xl grid-cols-5 gap-2 py-0 pb-12 sm:flex-row sm:pt-4">
			<AnimatePresence mode="wait">
				{musicItems.map((item, index) => (
					<MusicItem
						key={type + time + index}
						item={item}
						isLoading={isLoading}
						index={index}
					/>
				))}
			</AnimatePresence>
		</div>
	);
};

export { MusicItems };
