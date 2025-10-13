"use client";

import { useRef, useEffect, ReactNode, ElementType } from "react";
import { gsap } from "gsap";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

// Map element types to their corresponding HTML element refs
type ElementTagNameMap = {
	div: HTMLDivElement;
	span: HTMLSpanElement;
	ul: HTMLUListElement;
	li: HTMLLIElement;
	section: HTMLElement;
	article: HTMLElement;
	aside: HTMLElement;
	nav: HTMLElement;
	header: HTMLElement;
	footer: HTMLElement;
	main: HTMLElement;
	p: HTMLParagraphElement;
	h1: HTMLHeadingElement;
	h2: HTMLHeadingElement;
	h3: HTMLHeadingElement;
	h4: HTMLHeadingElement;
	h5: HTMLHeadingElement;
	h6: HTMLHeadingElement;
};

type ElementTag = keyof ElementTagNameMap;

interface WrapperFadeInProps<T extends ElementTag = "div"> {
	children: ReactNode;
	delay?: number;
	duration?: number;
	threshold?: number;
	className?: string;
	as?: T;
}

export const WrapperFadeIn = <T extends ElementTag = "div">({
	children,
	delay = 0,
	duration = 0.6,
	threshold = 0.8,
	className = "",
	as,
}: WrapperFadeInProps<T>) => {
	const Component = (as || "div") as ElementType;
	const elementRef = useRef<ElementTagNameMap[T]>(null);
	const hasAnimated = useRef(false);
	const isInView = useIntersectionObserver({ ref: elementRef, threshold });

	useEffect(() => {
		if (!elementRef.current || hasAnimated.current) return;

		const element = elementRef.current;

		// Set initial state
		gsap.set(element, {
			opacity: 0,
			y: 50,
		});

		// Animate when in view (only once)
		if (isInView && !hasAnimated.current) {
			hasAnimated.current = true;
			gsap.to(element, {
				opacity: 1,
				y: 0,
				duration,
				delay,
				ease: "power2.out",
			});
		}
	}, [isInView, delay, duration]);

	return (
		<Component ref={elementRef} className={className}>
			{children}
		</Component>
	);
};
