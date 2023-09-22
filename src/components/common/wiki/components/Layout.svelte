<div class="w-full md:w-full box-border px-2 pb-8">
	<div class="md:flex gap-4">
		<div
			class="md:border-b md:border-r-2 rounded-sm border-gray-800 w-full min-h-[20rem] md:min-h-0 md:w-1/4 md:h-[52rem] p-2 bg-gray-500 overflow-auto"
		>
			<slot name="panel" />
		</div>

		<div
			class="md:border-b md:border-r-2 rounded-sm border-gray-800 w-full min-h-[20rem] md:min-h-0 md:w-full md:h-[52rem] p-2 md:p-4 bg-gray-500 overflow-auto"
		>
			<slot name="main" />
		</div>
	</div>
</div>
