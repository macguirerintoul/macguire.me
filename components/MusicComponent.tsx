"use client";
import { MusicItems } from "@/components/MusicItems";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { MusicItem } from "@/types/music";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const MusicComponent = ({
	initialMusicItems,
}: {
	initialMusicItems: MusicItem[] | undefined;
}) => {
	const [type, setType] = useState<"album" | "artist">("album");
	const [time, setTime] = useState<"week" | "month" | "year" | "all">("month");

	const { data, error, isLoading } = useQuery({
		queryKey: ["music", type, time],
		queryFn: () => fetcher(`/api/music/${type}/${time}`),
		initialData:
			type == "album" && time == "month" ? initialMusicItems : undefined,
	});

	if (error)
		return (
			<div className="flex min-h-48 flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
				<h2 className="mt-4 text-lg font-semibold">Something went wrong.</h2>
				<p className="mt-2 text-sm text-muted-foreground">
					Music data couldn&apos;t be loaded. Please try again later.
				</p>
			</div>
		);

	return (
		<>
			<div className="flex justify-between">
				<Tabs
					value={type}
					onValueChange={(value) => setType(value as "album" | "artist")}
				>
					<TabsList>
						<TabsTrigger value="album">Albums</TabsTrigger>
						<TabsTrigger value="artist">Artists</TabsTrigger>
					</TabsList>
				</Tabs>
				<Tabs
					value={time}
					onValueChange={(value) =>
						setTime(value as "week" | "month" | "year" | "all")
					}
				>
					<TabsList>
						<TabsTrigger value="week">Week</TabsTrigger>
						<TabsTrigger value="month">Month</TabsTrigger>
						<TabsTrigger value="year">Year</TabsTrigger>
						<TabsTrigger value="all">All</TabsTrigger>
					</TabsList>
				</Tabs>
			</div>

			<MusicItems
				musicItems={data}
				isLoading={isLoading}
				type={type}
				time={time}
			/>
		</>
	);
};

export { MusicComponent };
