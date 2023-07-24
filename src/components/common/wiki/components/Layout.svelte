<div class="w-full md:w-3/4 box-border px-2 pb-8">
	<div class="md:flex gap-4">
		<div
			class="md:border-b md:border-r-2 rounded-sm border-gray-800 w-full min-h-[20rem] md:min-h-0 md:w-1/3 md:h-[52rem] p-2 bg-gray-500 overflow-auto"
		>
			<slot name="panel" />
		</div>
		<slot name="main" />
	</div>
</div>
