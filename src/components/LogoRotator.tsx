"use client";

import {
	cloneElement,
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
	// REPLACE index state with linear internalIndex + instant jump flag
	const [internalIndex, setInternalIndex] = useState(0);
	const [isInstant, setIsInstant] = useState(false);
	const [itemHeight, setItemHeight] = useState<number | null>(null);
	const reducedMotionRef = useRef(false);
	const animationsEnabledRef = useRef(true);
	const listRef = useRef<HTMLDivElement | null>(null);

	// Determine reduced motion & listen for design token animation toggle
	useEffect(() => {
		if (typeof window !== "undefined" && "matchMedia" in window) {
			const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
			reducedMotionRef.current = mq.matches;
			const onChange = () => { reducedMotionRef.current = mq.matches; };
			mq.addEventListener?.("change", onChange);
		}
		if (typeof document !== 'undefined') {
			const root = document.documentElement;
			animationsEnabledRef.current = root.dataset.anim !== 'off';
			const handler = (e: Event) => {
				const detail = (e as CustomEvent).detail?.tokens;
				if (detail && typeof detail.animationsEnabled === 'boolean') {
					animationsEnabledRef.current = detail.animationsEnabled;
				} else {
					animationsEnabledRef.current = root.dataset.anim !== 'off';
				}
			};
			document.addEventListener('design-tokens:updated', handler as EventListener);
			return () => document.removeEventListener('design-tokens:updated', handler as EventListener);
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

	// Interval: advance without modulo; allow reaching clone at items.length
	useEffect(() => {
		if (!items?.length || items.length === 1) return;
		if (reducedMotionRef.current || !animationsEnabledRef.current) return;
		const id = window.setInterval(() => {
			setInternalIndex(i => i + 1);
		}, Math.max(1200, interval));
		return () => window.clearInterval(id);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [items?.length, interval]);

	// Handle end-of-list seamless reset after transition (when hitting clone)
	const onTransitionEnd = useCallback(() => {
		if (!items?.length || items.length === 1) return;
		if (internalIndex === items.length) {
			// Jump back to 0 without animation
			setIsInstant(true);
			setInternalIndex(0);
		}
	}, [internalIndex, items]);

	// Re-enable transition after the instant jump
	useEffect(() => {
		if (!isInstant) return;
		const id = requestAnimationFrame(() => setIsInstant(false));
		return () => cancelAnimationFrame(id);
	}, [isInstant]);

	if (!items?.length) return null;
	if (items.length === 1 || reducedMotionRef.current || !animationsEnabledRef.current) {
		return <>{items[0]}</>;
	}

	const first = items[0];
	const clonedFirst = isValidElement(first)
		? cloneElement(first, { key: `__loop-clone-${first.key ?? "0"}` })
		: <span key="__loop-clone-0">{first as React.ReactNode}</span>;
	const displayItems = items.length > 1 ? [...items, clonedFirst] : items;
	const effectiveIndex = internalIndex % items.length;
	const translateY = itemHeight ? -(internalIndex * itemHeight) : 0;

	return (
		<div className="relative overflow-hidden h-12">
			<div
				ref={listRef}
				className={`flex flex-col will-change-transform ${isInstant || !animationsEnabledRef.current ? "" : "transition-transform duration-500 ease-out"}`}
				style={{ transform: `translateY(${translateY}px)` }}
				aria-live="off"
				onTransitionEnd={onTransitionEnd}
			>
				{displayItems.map((item, i) => {
					const k: React.Key = isValidElement(item) && item.key != null ? item.key : i;
					const hidden = (i % items.length) !== effectiveIndex;
					return (
						<div
							key={k}
							className="flex items-center justify-center h-12"
							aria-hidden={hidden}
						>
							{item}
						</div>
					);
				})}
			</div>
		</div>
	);
}
