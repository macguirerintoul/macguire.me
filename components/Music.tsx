import { MusicItems } from "@/components/MusicItems";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

const Music = () => {
	const [type, setType] = useState("albums");
	const [time, setTime] = useState("month");

	return (
		<div>
			<div className="flex justify-between">
				<Tabs defaultValue="albums" onValueChange={(value) => setType(value)}>
					<TabsList>
						<TabsTrigger value="albums">Albums</TabsTrigger>
						<TabsTrigger value="artists">Artists</TabsTrigger>
					</TabsList>
				</Tabs>
				<Tabs defaultValue="month" onValueChange={(value) => setTime(value)}>
					<TabsList>
						<TabsTrigger value="week">Week</TabsTrigger>
						<TabsTrigger value="month">Month</TabsTrigger>
						<TabsTrigger value="year">Year</TabsTrigger>
					</TabsList>
				</Tabs>
			</div>
			<MusicItems type={type} time={time} />
		</div>
	);
};

export { Music };
