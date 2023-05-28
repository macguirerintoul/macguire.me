"use client";
import { useEffect, useState, useRef, useCallback } from "react";

export const useIntersectionObserver = () => {
	const headingElementsRef = useRef({});

	useEffect(() => {
		const callback = (headings) => {
			headingElementsRef.current = headings.reduce((map, headingElement) => {
				map[headingElement.target.id] = headingElement;
				return map;
			}, headingElementsRef.current);

			const visibleHeadings = [];
			Object.keys(headingElementsRef.current).forEach((key) => {
				const headingElement = headingElementsRef.current[key];
				if (headingElement.isIntersecting) {
					console.log("hello " + headingElement.target.id);
					visibleHeadings.push(headingElement);
				}
			});
		};

		const observer = new IntersectionObserver(callback, {
			rootMargin: "0px 0px -40% 0px",
		});

		const headingElements = Array.from(document.querySelectorAll("h2, h3"));

		headingElements.forEach((element) => observer.observe(element));

		return () => observer.disconnect();
	}, []);
};
