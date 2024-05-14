<template>
	<view class="homeLayout pageBg">
		<common-nav>
			推荐
		</common-nav>
		<view class="banner">
			<swiper 
			indicator-dots 
			indicator-active-color="#fff" 
			indicator-color="rgba(255,255,255,0.5)"
			autoplay
			circular
			>
				<swiper-item v-for="(item,index) in bannerList" :key="item._id">
					<navigator 
					v-if="item.target == 'self'"
					:url="`/pages/classList/classList?${item.url}`" 
					class="link"
					
					>
						<image :src="item.picurl" mode="widthFix"></image>
					</navigator>
					<navigator 
					v-else
					:app-id="item.appid"
					:target="item.target"
					:url="`/pages/classList/classList?${item.url}`" 
					class="link"
					
					>
						<image :src="item.picurl" mode="widthFix"></image>
					</navigator>
				</swiper-item>
			</swiper>
		</view>
		<view class="notice">
		
			<view class="left">
				<uni-icons type="sound-filled" size="20" color="#28b389"></uni-icons>
				<text>公告</text>
			</view>
			<view class="center">
				<swiper 
				vertical
				autoplay
				circular
				interval="2000"
				duration="300"
				>
					<swiper-item 
					v-for="item in noticeList" 
					:key="item._id"
					>
						<navigator :url="`/pages/notice/notice?id=${item._id}`">
							{{ item.title }}
						</navigator>
					</swiper-item>
					
					
				</swiper>
			</view>
			<view class="right">
				<uni-icons type="right" size="20"></uni-icons>
			</view>
		</view>
		<view class="recommend">
			<common-title class="title">
				<template #name class="name">每日推荐</template>
				<template #custom >
					<view class="custom">
						<uni-icons type="calendar-filled" size="20" color="#28b389"></uni-icons>
						<uni-dateformat :date="Date.now()" format="dd日"></uni-dateformat>
					</view>
				</template>
			</common-title>
			<view class="container">
				<scroll-view scroll-x>
					<view class="box" 
					 v-for="item in recommendList"
					 @click="goPreview(item)"
					 :key="item._id"
					 >
						<image :src="item.smallPicurl" mode="aspectFill"></image>
					</view>	
				</scroll-view>
			</view>
		</view>
		<view class="theme">
			<common-title>
				<template #name>专题精选</template>
				<template #custom>
					<navigator url="/pages/classify/classify" open-type="reLaunch">
						<view class="text">More+</view>
					</navigator>
				</template>
			</common-title>
			<view class="content">
				<theme-item v-for="item in classifyList" :isMore="false" :item="item" :key="item._id">
				</theme-item>
				<theme-item :isMore="true"></theme-item>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {ref,onMounted} from 'vue'
	import { getBanner ,getNotices ,getNoticeDetail,getClassify,getRecommend} from '../../api/apis';
	import {onShareAppMessage,onShareTimeline,onLoad} from '@dcloudio/uni-app'
	const bannerList = ref([])
	const noticeList = ref([])
	const selectedNoticeId = ref('')
	const classifyList = ref([])
	const recommendList = ref([])
	const goPreview = (item) => {
		uni.navigateTo({
			url: `/pages/preview/preview?id=${item._id}`
		})
		uni.setStorageSync('classListSync',recommendList.value)
	}
	//分享给好友
	onShareAppMessage((e)=>{
		console.log(e)
		return {
			title: "yuhu壁纸",
			path: "/pages/index/index"
		}
	})
	//分享到朋友圈
	onShareTimeline(()=>{
		return {
			title: "yuhu壁纸",
		}
	})
	onLoad(()=>{
		getBanner().then(res=>{
			bannerList.value = res.data
			console.log("res1",res)
		}).catch(err=>{
			console.log("err",err)
		})
		
		getNotices({select: true}).then(res=>{
			console.log("res2",res)
			noticeList.value = res.data
		})
		getClassify({select:true}).then(res=>{
			console.log("res3",res)
			classifyList.value = res.data
		})
		getRecommend().then(res=>{
			console.log("res4",res)
			recommendList.value = res.data
			
		})
	})
	
</script>

<style lang="scss" scoped>
	@import "../../common/style/common_css.scss";
	
	.banner {
		width: 750rpx;
		padding: 30rpx 0;
		swiper {
			width: 750rpx;
			height: 340rpx;
			swiper-item {
				width: 100%;
				height: 100%;
				padding: 0 30rpx;
				.link {
					width: 100%;
					height: 100%;
					image {
						width: 100%;
						height: 100%;
						border-radius: 10rpx;
					}
				}
			}
		}
	}
	.notice {
		width: 690rpx;
		height: 80rpx;
		line-height: 80rpx;
		background-color: #f9f9f9;
		border-radius: 80rpx;
		margin: 0 auto;
		display: flex;
		.left {
			width: 140rpx;
			font-size: 30rpx;
			font-weight: 700;
			color: #28b389;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.center {
			flex: 1;
			swiper {
				height: 80rpx;
				&-item {
					height: 100%;
					font-size: 30rpx;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}
			}
		}
		.right {
			width: 70rpx;
		}
	}
	.recommend {
		padding-top: 50rpx;
		.container {
			width: 720rpx;
			margin-left: 30rpx;
			scroll-view {
				width: 100%;
				white-space: nowrap;
				.box {
					width: 200rpx;
					height: 430rpx;
					display: inline-block;
					margin-right: 15rpx;
					image {
						width: 100%;
						height: 100%;
						border-radius: 10rpx;
					}
				}
					
				.box:last-child {
					margin-right: 30rpx;
				}
			}
		}
	}
	.theme {
		padding-top: 50rpx;
		.text {
			color: #ccc;
		}
		.content {
			
			padding: 0 30rpx;
			display: grid;
			grid-template-columns: repeat(3,1fr);
			gap: 15rpx;
		}
	}
</style>
