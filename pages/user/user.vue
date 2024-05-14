<template>
	<view class="userLayout pageBg" v-if="userInfo">
		<view class="userInfo">
			<view class="picBox">
				<image class="pic" src="../../common/images/classify2.jpg" mode="aspectFill"></image>
			</view>
			<view class="userName">
			    {{userInfo.IP}}
			</view>
			<view class="address">
				来自于{{userInfo.address.country}} {{userInfo.address.province}}{{userInfo.address.city}}
			</view>
		</view>
		<view class="section">
			<view class="list">
				<view class="row" v-for="(item,index) in list1" :key="item.key">
						<view class="left">
							<view class="icon_L">
								<uni-icons :type="item.icon" size="20" color="#28b389"></uni-icons>
							</view>
							<text class="title">
								{{ item.name }}
							</text>
						</view>
						<view class="right">
							<text class="number">{{ item.value }}</text>
							<view class="icon_R">
								<uni-icons type="right" size="15"></uni-icons>
							</view>
						</view>
						<!-- #ifdef MP-WEIXIN -->
							<button open-type="contact" class="btn" v-if="item.key === 'contact'"></button>
						<!-- #endif -->
						<!-- #ifdef H5 -->
							<button  class="btn" v-if="item.key === 'contact'" @click="clickContact()"></button>
						<!-- #endif -->
						<navigator :url="item.url" class="linkTo" v-show=" item.key === 'download'||item.key === 'star'">
						</navigator>
					
				</view>
				
			</view>
		</view>
		<view class="section">
			<view class="list">
				<navigator
				 class="row" 
				 v-for="(item,index) in list2" 
				 :key="item.key"
				 :url="item.url"
				 >
					<view class="left">
						<view class="icon_L">
							<uni-icons :type="item.icon" size="20" color="#28b389"></uni-icons>
						</view>
						<text class="title">
							{{ item.name }}
						</text>
					</view>
					<view class="right">
						<text class="number">{{ item.value }}</text>
						<view class="icon_R">
							<uni-icons type="right" size="15"></uni-icons>
						</view>
					</view>
				</navigator>
			</view>
		</view>
	</view>
	<view class="loadingLayout" v-else>
		<uni-load-more status="loading"></uni-load-more>
	</view>
</template>

<script setup>
	import {ref} from 'vue';
	import { getUserInfo } from '../../api/apis';
	import {onLoad} from '@dcloudio/uni-app'
	
	const userInfo = ref(null)
	const list1 = ref(null)
	const list2 = ref([
		{
			name: '订阅更新',
			icon: 'notification-filled',
			key: 'notify',
			value: '',
			url: '/pages/notice/notice?id=653507c6466d417a3718e94b&name=订阅更新'
		},{
			name: '常见问题',
			icon: 'help-filled',
			key: 'help',
			value: '',
			url: '/pages/notice/notice?id=6536358ce0ec19c8d67fbe82&name=常见问题'
		},
	])
	const clickContact = () => {
		uni.makePhoneCall({
			phoneNumber: '18221124249'
		})
	}
	onLoad(()=>{
		getUserInfo().then(res=>{
			console.log("res",res)
			userInfo.value = res.data
			list1.value = [
		// {
		// 	name: '我的下载',
		// 	icon: 'download-filled',
		// 	key: 'download',
		// 	value: userInfo.value.downloadSize,
		// 	url: "/pages/classList/classList?type=download&name=我的下载"
		// },{
		// 	name: '我的评分',
		// 	icon: 'star-filled',
		// 	key: 'star',
		// 	value: userInfo.value.scoreSize,
		// 	url:"/pages/classList/classList?type=score&name=我的评分"
		// },{
		// 	name: '联系客服',
		// 	icon: 'email',
		// 	key: 'contact',
		// 	value: '',
		// },
	]
		})
	})
</script>

<style lang="scss" scoped>
	.userLayout {
		padding-top: 100rpx;
		.userInfo {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			margin-bottom: 100rpx;
			.picBox {
				width: 160rpx;
				height: 160rpx;
				border-radius: 50%;
				overflow: hidden;
				.pic {
					width: 100%;
					height: 100%;
				}
			}
			.userName {
				font-size: 32rpx;
				margin-top: 10rpx;
			}
			.address {
				font-size: 28rpx;
				color: #787878;
				margin-top: 10rpx;
			}
		}
		.section {
			width: 650rpx;
			margin: 40rpx auto;
			border-radius: 10rpx;
			padding: 0 20rpx;
			box-shadow: 5rpx 5rpx 30rpx rgba(0,0,0,0.2);
			background-color: #fff;
			.list {
				.row {
					position: relative;
					display: flex;
					justify-content: space-between;
					height: 100rpx;
					line-height: 100rpx;
					border-bottom: 1px dotted #e3e3e3;
					.left {
						.icon_L {
							display: inline-block;
							margin-right: 10rpx;
						}
						.title {
							font-size: 30rpx
						}
					}
					.right {
						.number {
							font-size: 28rpx;
							color: #787878;
						}
						.icon_R {
							display: inline-block;
						}
					}
					.btn {
						width: 100%;
						height: 80rpx;
						position: absolute;
						top: 0;
						left: 0;
						opacity: 0;
					}
					.linkTo {
						position: absolute;
						width: 100%;
						height: 100%;
						// background-color: pink;
					}
				}
			}
		}
	}
	.loadingLayout {
		padding-top: 100rpx;
	}
</style>
