import { useRef, useState, useEffect } from "react";

function useHeadsObserver() {
	const observer = useRef<IntersectionObserver>();
	const [activeIds, setActiveIds] = useState<string[]>([]);
	const headingElementsRef = useRef<{
		[key: string]: IntersectionObserverEntry;
	}>({});

	useEffect(() => {
		const handleObsever = (headings: IntersectionObserverEntry[]) => {
			headingElementsRef.current = headings.reduce((map, headingElement) => {
				map[headingElement.target.id] = headingElement;
				return map;
			}, headingElementsRef.current);

			const visibleHeadings: IntersectionObserverEntry[] = [];
			Object.keys(headingElementsRef.current).forEach((key) => {
				const headingElement = headingElementsRef.current[key];
				if (headingElement.isIntersecting) visibleHeadings.push(headingElement);
			});
			const ids = visibleHeadings.map((item) => item.target.id);
			setActiveIds(ids);
		};

		observer.current = new IntersectionObserver(handleObsever, {
			rootMargin: "0px 0px -40% 0px",
		});

		const elements = document.querySelectorAll("h2, h3, h4, h5, h6");
		elements.forEach((elem) => observer.current?.observe(elem));
		return () => observer.current?.disconnect();
	}, []);

	return activeIds;
}

export { useHeadsObserver };
