<div class="w-full md:w-full box-border px-2 pb-8">
	<div class="md:flex gap-10 space-y-2">
		<div
			class="md:border-b md:border-r-2 rounded-sm border-gray-800 w-full min-h-[20rem] md:min-h-0 md:w-[22rem] md:h-[52rem] px-2 py-4 bg-gray-500 overflow-auto"
		>
			<slot name="panel" />
		</div>

		<div
			class="md:border-b md:border-r-2 rounded-sm border-gray-800 w-full min-h-[20rem] md:min-h-0 md:w-[70rem] md:h-[52rem] px-2 py-4 md:py-4 bg-gray-500 overflow-auto"
		>
			<slot name="main" />
		</div>
	</div>
</div>
