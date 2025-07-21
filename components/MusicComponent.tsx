"use client";
import { MusicItems } from "@/components/MusicItems";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect, useRef } from "react";
import { MusicItem } from "types/music";
import useSWR from "swr";
interface MusicProps {
	initialData: MusicItem[];
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const MusicComponent = ({ initialData }: MusicProps) => {
	const [type, setType] = useState<"albums" | "artists">("albums");
	const [time, setTime] = useState<"week" | "month" | "year" | "all">("month");
	const { data, error, isLoading } = useSWR(
		`/api/music?type=${type}&time=${time}`,
		fetcher,
		{ fallbackData: initialData }, // optional
	);
	if (error) return <div>failed to load</div>;

	return (
		<>
			<div className="flex justify-between">
				<Tabs
					value={type}
					onValueChange={(value) => setType(value as "albums" | "artists")}
				>
					<TabsList>
						<TabsTrigger value="albums">Albums</TabsTrigger>
						<TabsTrigger value="artists">Artists</TabsTrigger>
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

			<MusicItems musicItems={data} loading={isLoading} />
		</>
	);
};

export { MusicComponent };
