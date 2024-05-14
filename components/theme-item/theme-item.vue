<template>
	<view class="theme_item">
		<navigator :url="`../../pages/classList/classList?classid=${item._id}&name=${item.name}`" class="box" v-if="!isMore">
			<image :src="item.picurl" mode="aspectFill" class="pic"></image>
			<view class="mask">
				{{item.name}}
			</view>
			<view class="tab">
				{{timeFormat(item.updateTime)}}前更新
			</view>
			
		</navigator>
		<navigator url="../../pages/classify/classify" open-type="reLaunch" class="box more" v-else>
			<image src="../../common/images/more.jpg" mode="aspectFill" class="pic"></image>
			<view class="mask">
				<text>更多</text>
				<uni-icons type="more-filled" size="30" class="text" color="#fff"></uni-icons>
			</view>
		</navigator>
	</view>
</template>

<script setup>
	import { onMounted,ref } from 'vue';
	import {timeFormat} from '@/utils/timeFormat.js'

	const props = defineProps({
		isMore: {
			type:Boolean,
			default:false
		},
		item:{
			type: Object,
			default(){
				return {
					name: 'null',
					picurl: 'null',
					updateTime:Date.now() - 1000*60*60*5,
					_id:"null"
				}
			}
		}
	})


	onMounted(()=>{
		console.log(props.isMore)
	})
</script>

<style lang="scss" scoped>
	.theme_item {
		// width: 100%;
		.box {
			overflow: hidden;
			height: 440rpx;
			position: relative;
			border-radius: 10rpx;
			width: 100%;
			.pic {
				width: 100%;
				height: 100%;
			}
			.mask {
				position: absolute;
				bottom: 0;
				left: 0;
				height: 70rpx;
				width: 100%;
				text-align: center;
				line-height: 70rpx;
				font-size: 36rpx;
				color: #fff;
				font-weight: 600;
				background-color: rgba(0,0,0,0.2);
				backdrop-filter: blur(20rpx);
			}
			.tab {
				position: absolute;
				top: 0;
				left: 0;
				background-color: rgba(250,129,90,0.7);
				font-size: 22rpx;
				border-radius: 0 0 5rpx 0;
				padding: 6rpx 10rpx;
				color: #fff;
				backdrop-filter: blur(20rpx);
			}
		}
		.more {
			.mask {
			width: 100%;
			height: 100%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			
			}
		}
	}
</style>