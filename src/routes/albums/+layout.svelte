<script lang="ts">
	import "../../app.css";
</script>

<div class="relative h-screen w-screen">
	<div
		id="loadingText"
		class={` pointer-events-none fixed flex h-screen w-screen items-center justify-center pb-10`}
	>
		<div class=" text-2xl text-slate-200">loading...</div>
	</div>
	<slot />
</div>
