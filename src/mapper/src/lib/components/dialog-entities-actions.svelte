<script lang="ts">
	import type { ProjectData } from '$lib/types';
	import { getEntitiesStatusStore } from '$store/entities.svelte.ts';
	import { getAlertStore } from '$store/common.svelte.ts';

	type Props = {
		isTaskActionModalOpen: boolean;
		toggleTaskActionModal: (value: boolean) => void;
		selectedTab: string;
		projectData: ProjectData;
	};

	let { isTaskActionModalOpen, toggleTaskActionModal, selectedTab, projectData }: Props = $props();

	const entitiesStore = getEntitiesStatusStore();
	const alertStore = getAlertStore();

	const selectedEntityOsmId = $derived(entitiesStore.selectedEntity);
	const selectedEntity = $derived(
		entitiesStore.entitiesStatusList?.find((entity) => entity.osmid === selectedEntityOsmId),
	);

	const mapFeature = () => {
		const xformId = projectData?.odk_form_id;
		const entityUuid = selectedEntity?.entity_id;

		if (!xformId || !entityUuid) {
			return;
		}

		const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
		if (isMobile) {
			if (selectedEntity?.status === 'READY') {
				entitiesStore.updateEntityStatus(projectData.id, {
					entity_id: entityUuid,
					status: 1,
					label: `Task ${selectedEntity?.task_id} Feature ${selectedEntity?.osmid}`,
				});
			}
			// Load entity in ODK Collect by intent
			document.location.href = `odkcollect://form/${xformId}?feature=${entityUuid}`;
		} else {
			alertStore.setAlert({ message: 'Requires a mobile phone with ODK Collect.', variant: 'warning' });
		}
	};
</script>

{#if isTaskActionModalOpen && selectedTab === 'map' && selectedEntity}
	<div class="flex justify-center !w-[100vw] absolute bottom-[4rem] left-0 pointer-events-none z-50">
		<div
			class="bg-white w-full font-barlow-regular md:max-w-[580px] pointer-events-auto px-4 py-3 sm:py-4 rounded-t-3xl"
		>
			<div class="flex justify-end">
				<hot-icon
					name="close"
					class="!text-[1.5rem] text-[#52525B] cursor-pointer hover:text-red-600 duration-200"
					onclick={() => toggleTaskActionModal(false)}
					onkeydown={(e: KeyboardEvent) => {
						if (e.key === 'Enter') {
							toggleTaskActionModal(false);
						}
					}}
					role="button"
					tabindex="0"
				></hot-icon>
			</div>
			<div class="flex flex-col gap-4">
				<div class="flex items-center justify-between">
					<p class="text-[#333] text-xl font-barlow-semibold">Feature {selectedEntity?.osmid}</p>
					<sl-button
						loading={entitiesStore.syncEntityStatusLoading}
						onclick={async () => {
							await entitiesStore.syncEntityStatus(projectData?.id);
						}}
						onkeydown={(e: KeyboardEvent) => {
							e.key === 'Enter' && {};
						}}
						role="button"
						tabindex="0"
						size="small"
						class="secondary w-fit ml-auto"
					>
						<span class="font-barlow-medium text-SM uppercase">SYNC STATUS</span>
					</sl-button>
				</div>
				<div class="flex flex-col gap-1">
					<p><span class="font-medium">Task Id:</span> {selectedEntity?.task_id}</p>
					<p><span class="font-medium">Entity Uuid:</span> {selectedEntity?.entity_id}</p>
					<p>
						<span class="font-medium">Status:</span>
						{selectedEntity?.status?.replaceAll('_', ' ')}
					</p>
				</div>
				{#if selectedEntity?.status !== 'SURVEY_SUBMITTED'}
					<sl-button
						loading={entitiesStore.updateEntityStatusLoading}
						variant="default"
						size="small"
						class="primary"
						onclick={() => {
							mapFeature();
						}}
						onkeydown={(e: KeyboardEvent) => {
							if (e.key === 'Enter') {
								mapFeature();
							}
						}}
						role="button"
						tabindex="0"
					>
						<span class="font-barlow-medium text-sm">MAP FEATURE IN ODK</span>
					</sl-button>
				{/if}
			</div>
		</div>
	</div>
{/if}
