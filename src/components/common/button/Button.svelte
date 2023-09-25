<script lang="ts">
	export let click: () => void;
	export let type: 'primary' | 'secondary' | 'tertiary' = 'primary';
	export let size: 'small' | 'medium' | 'large' = 'medium';
	export let colour: 'green' | 'red' | 'blue' | 'yellow' | 'gray' = 'green';
	export let disabled: boolean = false;
	export let loading: boolean = false;
	export let icon: string = '';
	export let iconPosition: 'left' | 'right' = 'left';
	export let text: string = '';

	function applyTailwindStyles() {
		let styles = '';
		const typeStyles = {
			primary: {
				green: 'bg-green-500 hover:bg-green-400',
				red: 'bg-red-500 hover:bg-red-400',
				blue: 'bg-blue-500 hover:bg-blue-400',
				yellow: 'bg-yellow-500 hover:bg-yellow-400',
				gray: 'bg-gray-500 hover:bg-gray-400'
			},
			secondary: {
				green: 'border border-green-500 hover:bg-green-500 hover:text-white',
				red: 'border border-red-500 hover:bg-red-500 hover:text-white',
				blue: 'border border-blue-500 hover:bg-blue-500 hover:text-white',
				yellow: 'border border-yellow-500 hover:bg-yellow-500 hover:text-white',
				gray: 'border border-gray-500 hover:bg-gray-500 hover:text-white'
			},
			tertiary: {
				green: 'hover:bg-green-500 hover:text-white',
				red: 'hover:bg-red-500 hover:text-white',
				blue: 'hover:bg-blue-500 hover:text-white',
				yellow: 'hover:bg-yellow-500 hover:text-white',
				gray: 'hover:bg-gray-500 hover:text-white'
			}
		};
		const sizeStyles = {
			small: 'text-sm px-4 py-1',
			medium: 'text-md px-6 py-2',
			large: 'text-lg px-8 py-3'
		};
		const disabledStyles = 'opacity-50 cursor-not-allowed';
		const loadingStyles = 'cursor-not-allowed';
		const iconStyles = 'flex items-center justify-center gap-2';
		const iconPositionStyles = {
			left: 'flex-row-reverse',
			right: 'flex-row'
		};
		styles += typeStyles[type][colour];
		styles += ' ';
		styles += sizeStyles[size];
		styles += ' ';
		if (disabled) {
			styles += disabledStyles;
		}
		if (loading) {
			styles += loadingStyles;
		}
		if (icon) {
			styles += iconStyles;
			styles += ' ';
			styles += iconPositionStyles[iconPosition];
		}
		return styles;
	}
</script>

<button on:click={click} type="button" class={applyTailwindStyles()}>{text}</button>
