<div class="w-full md:w-full box-border px-2 pb-8">
	<div class="md:flex gap-10 space-y-2 md:space-y-0">
		<div
			class="md:border rounded-sm border-gray-500 w-full min-h-[20rem] md:min-h-0 md:w-[22rem] md:h-[52rem] px-2 py-4 bg-gray-600 overflow-auto"
		>
			<slot name="panel" />
		</div>

		<div
			class="md:border rounded-sm border-gray-500 w-full min-h-[20rem] md:min-h-0 md:w-[70rem] md:h-[52rem] px-4 py-4 bg-gray-600 overflow-auto"
		>
			<slot name="main" />
		</div>
	</div>
</div>
