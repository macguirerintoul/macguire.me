<template>
	<div class="project-block">
		<h2 class="project-block__title">
			<g-link :to="project.path"> {{ project.title }}</g-link>
		</h2>
		<p class="project-block__description">{{ project.shortDescription }}</p>
		<div class="project-block__context">
			<span>{{ project.year }} – {{ project.tags.join(", ") }}</span>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		project: {
			type: Object,
			default: () => {
				return {};
			},
		},
	},
};
</script>
