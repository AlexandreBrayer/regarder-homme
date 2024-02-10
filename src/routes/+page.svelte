<script lang="ts">
	import { createGrid } from 'ag-grid-community';
	import type { ColDef, GridApi, Column } from 'ag-grid-community';
	import { onMount } from 'svelte';
	import 'ag-grid-community/styles/ag-grid.css';
	import 'ag-grid-community/styles/ag-theme-quartz.css';
	import { Button } from '$lib/components/ui/button';

	const gridOptions = {
		onColumnMoved,
		onGridReady,
		rowData: [
			{ make: 'Tesla', model: 'Model Y', price: 64950, electric: true },
			{ make: 'Ford', model: 'F-Series', price: 33850, electric: false },
			{ make: 'Toyota', model: 'Corolla', price: 29600, electric: false }
		],
		columnDefs: [
			{ field: 'make' },
			{ field: 'model' },
			{ field: 'price' },
			{ field: 'electric' }
		] satisfies ColDef[] as ColDef[]
	};
	let gridApi: GridApi<typeof gridOptions>;
	let gridElement: HTMLElement;

	function onColumnMoved() {
		const columnState = JSON.stringify(gridApi.getAllGridColumns());
		localStorage.setItem('myColumnState', columnState);
	}

	function onGridReady() {
		const localColumnState = localStorage.getItem('myColumnState');
		if (localColumnState) {
			gridApi.applyColumnState({ state: JSON.parse(localColumnState), applyOrder: true });
		}
	}

	function logOpts() {
		const cols = gridApi.getAllGridColumns();
		console.log(cols);
		const colToNameFunc = (col: Column, index: number) => index + ' = ' + col.getId();
		const colNames = cols.map(colToNameFunc).join(', ');
		console.log('columns are: ' + colNames);
	}

	onMount(() => {
		gridApi = createGrid(gridElement, gridOptions);
	});
</script>

<h1>Watchman :D</h1>
<div bind:this={gridElement} class="ag-theme-quartz-dark" style="height: 500px"></div>
<Button on:click={logOpts}>Test</Button>
