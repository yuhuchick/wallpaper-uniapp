<template>
	<view class="noticeLayout">
		<view class="title">
			<view class="tag" v-if="noticeContent.select">
				<uni-tag :inverted="true" text="置顶" type="error" size="small"/>
			</view>
			<view class="text">{{ noticeContent.title }}</view>
		</view>
		<view class="tips">
			<view class="author">
				{{ noticeContent.author }}
			</view>
			<view class="time">
				<uni-dateformat :date="noticeContent.publish_date" format="yyyy-MM-dd hh:mm:ss"></uni-dateformat>
			</view>
		</view>
		
		<view class="content">
			<!-- <rich-text :nodes="noticeContent.content"></rich-text> -->
			<mp-html :content="noticeContent.content" />
		</view>
		<view class="readNumbers">
			阅读 {{ noticeContent.view_count}}
		</view>
	</view>
</template>

<script setup>
	import { onMounted,ref } from 'vue';
	import { useRouter } from 'vue-router';
	import { getNoticeDetail } from '../../api/apis';
	import {onLoad} from "@dcloudio/uni-app"
	import {timeFormat} from '@/utils/timeFormat.js'
	const noticeContent = ref({})
		// 另一种可行的取参方法
	// onMounted(() => {
		// const router = useRouter();
		// console.log('id',router.currentRoute.value.query.id);
		// const id = router.currentRoute.value.query.id;
		
		// getNoticeDetail({id:id}).then(res=>{
			// console.log('res',res)
			// noticeContent.value = res.data
		// })
	// });
	
	onLoad((e)=>{
		console.log('res',e)
		const {id,name} = e
		if(name){
			uni.setNavigationBarTitle({
				title:name
			})
		}
		getNoticeDetail({id:id}).then(res=>{
			console.log('res',res)
			noticeContent.value = res.data
		})
		
	})
</script>
<style lang="scss" scoped>
	.noticeLayout {
		padding: 10rpx 30rpx;
		.title {
			display: flex;
			// align-items: ;
			.tag {
				width: 100rpx;
			}
			.text {
				flex: 1;
				font-size: 36rpx;
				font-weight: 500;
			}
		}
		.tips {
			padding-top: 40rpx;
			display: flex;
			align-items: center;
			color: #7d7d7d;
			font-size: 28rpx;
			.author {
				padding-right: 20rpx;
			}
		}
		.content {
			padding-top: 40rpx;
			font-size: 36rpx;
		}
		.readNumbers {
			color: #7d7d7d;
			font-size: 28rpx;
			padding-top: 40rpx;
		}
	}
</style>
