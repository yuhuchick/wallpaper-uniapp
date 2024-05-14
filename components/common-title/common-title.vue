<template>
	<view class="title">
		<view class="name">
			<slot name="name"></slot>
		</view>
		<view class="custom">
			<slot name="custom"></slot>
		</view>
	</view>
</template>

<script>
	export default {
		name:"common-title",
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
	.title {
		display: flex;
		justify-content: space-between;
		margin: 0 30rpx;
		padding-bottom: 30rpx;
		.custom {
			display: flex;
			justify-content: center;
			align-items: center;
			color: #28b389;
		}
	}
</style>