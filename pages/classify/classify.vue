<template>
	<view class="layout">
		<common-nav>
			分类
		</common-nav>
		<view class="classify pageBg">
			<theme-item v-for="(item,index) in classifyList" :item="item" :key="item._id">
			</theme-item>
		</view>
	</view>
	
</template>

<script setup>
	import {ref,onMounted} from 'vue'
	import { getClassify } from '../../api/apis';
	import {onShareAppMessage} from '@dcloudio/uni-app'
	const classifyList = ref([])
	onShareAppMessage((e)=>{
		console.log(e)
		return {
			title: "yuhu壁纸~壁纸大分类",
			path: "/pages/classify/classify"
		}
	})
	onMounted(()=>{
		getClassify({
			pageSize:15
		}).then(res=>{
			console.log("res5",res)
			classifyList.value = res.data
		})
	})
</script >

<style lang="scss" scoped>
	.classify {
		padding: 0 15rpx;
		display: grid;
		grid-template-columns: repeat(3,1fr);
		gap: 15rpx;
	}
</style>
