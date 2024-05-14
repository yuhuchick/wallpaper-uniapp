<template>
	<view class="classListLayout">
		<view class="topLoading" v-if="!classList.length && !noData">
			<uni-load-more status="loading"></uni-load-more>
		</view>
		<view class="content">
			<navigator class="item" 
			:url="`/pages/preview/preview?id=${item._id}`"
			v-for="(item,index) in classList" 
			:key="item._id"
			>
				<image class="pic" :src="item.smallPicurl" mode="aspectFill"></image>
			</navigator>
		</view>
		<view class="bottomLoading" v-if="classList.length || noData">
			<uni-load-more :status="noData?'noMore':'loading'" ></uni-load-more>
		</view>
		<view class="safe-area-inset-bottom"></view>
	</view>
</template>

<script setup>
	import {ref} from 'vue'
	import {onLoad,onReachBottom,onUnload} from '@dcloudio/uni-app'
	import { getClassList ,getDownloadList} from '../../api/apis';
	import { goHome } from '../../utils/goHome';
	const classList = ref([])
	const noData = ref(false)
	const queryParams = {
		pageNum:1,
		pageSize:12
	}
	const getParams = (value) =>{
		if(value.type){
			getDownloadList(value).then(res=>{
				console.log('res6',res)
				classList.value = [...classList.value,...res.data]
				if(queryParams.pageSize > res.data.length){
					noData.value = true
				}
				uni.setStorageSync('classListSync',classList.value)
			})
		}else if(value.classid){
			getClassList(value).then(res=>{
				console.log('res6',res)
				classList.value = [...classList.value,...res.data]
				if(queryParams.pageSize > res.data.length){
					noData.value = true
				}
				uni.setStorageSync('classListSync',classList.value)
			})
		}
		
	}

	onLoad((e)=>{
		const {classid,type,name,id} = e
		if(!classid&&!type&&!id){
			noData.value = true
			goHome()
			return
		}
		if(classid){
			queryParams.classid = classid
		}else if(type){
			queryParams.type = type
		}else{
			queryParams.classid = id
		}
		console.log('e',queryParams)
		getParams(queryParams)
		
		uni.setNavigationBarTitle({
			title:name
		})
		
	})
	
	onReachBottom(()=>{
		if(noData.value){
		console.log('yes')
			return
		}
		queryParams.pageNum++
		getParams(queryParams)
	})
	onUnload(()=>{
		uni.removeStorageSync("classListSync")
	})
</script>

<style lang="scss" scoped>
	.classListLayout {
		.content {
			display: grid;
			grid-template-columns: repeat(3,1fr);
			padding: 5rpx;
			gap: 5rpx;
			.item {
				height: 400rpx;
				image {
					width: 100%;
					height: 100%;
					display: block;
				}
			}
		}
	}
</style>
