<template>
	<view class="layout">
		<view class="commonNav">
			<view class="navStatus" :style="{height: statusBarHeight +'px'}">
				
			</view>
			<view class="navContent" :style="{height: titleBarHeight + 'px'}">
				<view class="title">
					<slot></slot>
				</view>
				<navigator class="search" url="/pages/search/search">
					<uni-icons type="search" size="20" color="#666"></uni-icons>
					<text class="text">搜索</text>
				</navigator>
			</view>
		</view>
		<view class="fill" :style="{height: (statusBarHeight + titleBarHeight) + 'px'}">
			
		</view>
		<!-- #ifdef H5 -->
		
		<view class="fill_h5"></view>
		<!-- #endif -->
	</view>
</template>

<script setup>
	import {ref} from 'vue'
	const system = uni.getSystemInfoSync()
	const statusBarHeight = ref(system.statusBarHeight)
	// console.log('system1',statusBarHeight.value)
	const {height,top} = uni.getMenuButtonBoundingClientRect();
	const titleBarHeight = ref(height + (top - statusBarHeight.value)*2)
</script>

<style scoped lang="scss">
	.layout {
		.commonNav {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			z-index: 10;
			padding-left: 30rpx;
			background:
			linear-gradient(to bottom,rgba(0,0,0,0) 0%,#fff 400rpx),
			linear-gradient(to right,#beecdb 20%, #F4E2DB);
			.navStatus {
				position: relative;
			}
			.navContent {
			
				padding: 0 30rpx;
				display: flex;
				align-items: center;
				
				.title {
					color: #000;
					font-size: 40rpx;
					font-weight: 700;
				}
				.search {
					display: flex;
					margin-left: 20rpx;
					align-items: center;
					padding:  8rpx 100rpx 8rpx 20rpx;
					border: 1px solid #fff;
					border-radius: 30rpx;
					background-color: rgba(255,255,255,0.4);
					font-size: 30rpx;
					.text {
						padding-left: 20rpx;
					}
				}
			}
		}
		.fill_h5 {
			height: 80rpx;
			background: linear-gradient(to bottom,rgba(0,0,0,0) 0%,#fff 400rpx),
	linear-gradient(to right,#beecdb 20%, #F4E2DB);;
		}
	}
	
</style>