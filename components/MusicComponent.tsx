"use client";
import { MusicItems } from "@/components/MusicItems";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from "react";
import type { MusicItem } from "../lib/music";

interface MusicProps {
	initialData: MusicItem[];
}

const MusicComponent = ({ initialData }: MusicProps) => {
	const [type, setType] = useState<"albums" | "artists">("albums");
	const [time, setTime] = useState<"week" | "month" | "year" | "all">("month");

	const [data, setData] = useState<MusicItem[]>(initialData);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			setError(null);
			try {
				const res = await fetch(`/api/music?type=${type}&time=${time}`);
				if (!res.ok) throw new Error("Fetch failed");
				const json = await res.json();
				setData(json);
			} catch (err) {
				setError("Error loading data");
				console.error(err);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [type, time]);

	return (
		<div>
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
			{loading && <div className="py-4 text-center">Loading...</div>}
			{error && <div className="py-4 text-center text-red-500">{error}</div>}
			{!loading && !error && <MusicItems musicItems={data} />}
		</div>
	);
};

export { MusicComponent };
