<script lang="ts">
	import '$styles/page.css';
	import { clickOutside } from '$lib/utils/clickOutside.ts';
	import LockImg from '$assets/images/black-lock.png';

	type taskStatusesType = { status: string; color?: string; icon?: string };

	let isOpen = $state(false);

	const taskStatuses: taskStatusesType[] = [
		{ status: 'Ready', color: '#ffffff' },
		{ status: 'Locked For Mapping', color: '#008099' },
		{ status: 'Ready For Validation', color: '#ade6ef' },
		{ status: 'Locked For Validation', color: '#fceca4' },
		{ status: 'Validated', color: '#40ac8c' },
		{ status: 'More Mapping Needed', color: '#d73f3e' },
		{ status: 'Locked', icon: LockImg },
	];
</script>

<div use:clickOutside onclick_outside={() => (isOpen = false)} class="relative font-barlow">
	<div
		aria-label="toggle legend"
		class="group text-nowrap cursor-pointer"
		onclick={() => (isOpen = !isOpen)}
		role="button"
		onkeydown={(e) => {
			if (e.key === 'Enter') {
				isOpen = !isOpen;
			}
		}}
		tabindex="0"
	>
		<hot-icon
			style="border: 1px solid #D7D7D7;"
			name="legend-toggle"
			class={`!text-[1.7rem] text-[#333333] bg-white p-2 rounded-full group-hover:text-red-600 duration-200 ${isOpen && 'text-red-600'}`}
		></hot-icon>
	</div>
	<div
		class={`absolute bottom-0 right-14 bg-white rounded-md p-4 duration-200 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'} overflow-hidden flex flex-col gap-2`}
	>
		<p class="font-semibold leading-0 text-lg mb-3">Legend</p>
		{#each taskStatuses as taskStatus}
			<div class="flex items-center gap-2">
				{#if !taskStatus.color}
					<div class="w-5 h-5 flex justify-center">
						<img src={taskStatus.icon} class="w-4" alt="Lock Icon" />
					</div>
				{:else}
					<div
						style="background-color: {taskStatus.color}; border: 1px solid #D0D0D0;"
						class={`w-5 h-5 opacity-40`}
					></div>
				{/if}
				<p class="font-regular text-[#494949] text-nowrap leading-0">{taskStatus?.status}</p>
			</div>
		{/each}
	</div>
</div>

<style></style>
