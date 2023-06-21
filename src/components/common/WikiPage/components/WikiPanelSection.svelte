<script lang="ts">
	export let removeBorder = false;
	export let _class = '';
</script>

<div class={`w-full py-3 ${removeBorder ? '' : 'border-b'} ${_class}`}>
	<slot />
</div>
