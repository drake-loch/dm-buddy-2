import { twMerge } from 'tailwind-merge';

export function classes(classList: string): string {
	return twMerge(classList);
}
