"use client";

import {
	isValidElement,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";

/**
 * Rotates through multiple logo elements, sliding them up every couple seconds.
 * - Fixed height container to keep layout stable.
 * - Respects reduced motion preference (no animation, just static first logo).
 */
export function LogoRotator({ items, interval = 2000 }: { items: React.ReactNode[]; interval?: number; }) {
	const [index, setIndex] = useState(0);
	const [itemHeight, setItemHeight] = useState<number | null>(null);
	const reducedMotionRef = useRef(false);
	const listRef = useRef<HTMLDivElement | null>(null);

	// Determine reduced motion once on mount (SSR-safe)
	useEffect(() => {
		if (typeof window !== "undefined" && "matchMedia" in window) {
			const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
			reducedMotionRef.current = mq.matches;
		}
	}, []);

	// Measure tallest child to set a stable container height
	const measure = useCallback(() => {
		const el = listRef.current;
		if (!el) return;
		const heights = Array.from(el.children).map((c) => (c as HTMLElement).offsetHeight || (c as HTMLElement).clientHeight || 0);
		const max = heights.length ? Math.max(...heights) : 0;
		if (max && max !== itemHeight) setItemHeight(max);
	}, [itemHeight]);

	useEffect(() => {
		measure();
		if (typeof window !== "undefined") {
			const ro = new ResizeObserver(() => measure());
			if (listRef.current) ro.observe(listRef.current);
			return () => ro.disconnect();
		}
	}, [measure]);

	useEffect(() => {
		if (!items?.length || items.length === 1) return;
		if (reducedMotionRef.current) return;

		const id = window.setInterval(() => {
			setIndex((i) => (i + 1) % items.length);
		}, Math.max(1200, interval));
		return () => window.clearInterval(id);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [items?.length, interval]);

	if (!items?.length) return null;
	if (items.length === 1 || reducedMotionRef.current) {
		return <>{items[0]}</>;
	}

	const translateY = itemHeight ? -(index * itemHeight) : 0;

	return (
		<div className="relative overflow-hidden" style={itemHeight ? { height: itemHeight } : undefined}>
			<div
				ref={listRef}
				className="flex flex-col transition-transform duration-500 ease-out will-change-transform"
				style={{ transform: `translateY(${translateY}px)` }}
				aria-live="off"
			>
				{items.map((item, i) => {
					const k: React.Key = isValidElement(item) && item.key != null ? item.key : i;
					return (
						<div
							key={k}
							className="flex items-center justify-center"
							style={itemHeight ? { height: itemHeight } : undefined}
							aria-hidden={i !== index}
						>
							{item}
						</div>
					);
				})}
			</div>
		</div>
	);
}
