<script lang="ts">
	import "../../app.css";
	import posthog from "posthog-js";
	import { PUBLIC_DEV } from "$env/static/public";
	import { onMount } from "svelte";

	onMount(() => {
		if (!PUBLIC_DEV) {
			posthog.init("phc_TKXoMp1iLDuHtw8lMrBEKKAKwc8uouhxBJS8tNYYiQb", {
				api_host: "https://us.posthog.com"
			});

			posthog.capture("visit");
		}
	});
</script>

<div class="relative h-screen w-screen">
	<slot />
</div>
