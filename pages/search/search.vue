<template>
	<view class="searchLayout">
		<view class="search">
			<uni-search-bar 
			@confirm="onSearch"
			@cancel="onClear"
			@clear="onClear"
			focus 
			placeholder="搜索"
			v-model="queryParams.keyword">
			</uni-search-bar>
		</view>
		
		
		<view v-if="!classList.length">
			<view class="history" v-if="historySearch.length">
				<view class="topTitle">
					<view class="text">最近搜索</view>
					<view class="icon" @click="removeHistory">
						<uni-icons type="trash" size="25"></uni-icons>
					</view>
				</view>
				<view class="tabs">
					<view class="tab" v-for="tab in historySearch" :key="tab" @click="clickTab(tab)">{{tab}}</view>		
				</view>
			</view>
			
			<view class="recommend">
				<view class="topTitle">
					<view class="text">热门搜索</view>				
				</view>
				<view class="tabs">				
					<view class="tab" v-for="tab in recommendList" :key="tab" @click="clickTab(tab)">{{tab}}</view>
				</view>
			</view>
		</view>
		
		
		<view class="noSearch" v-if="!classList.length">
			<uv-empty mode="search" icon="http://cdn.uviewui.com/uview/empty/search.png"></uv-empty>
		</view>
		
		
		<view v-else>
			<view class="list">
				<view class="item" @click="navigateTo(item)"
				v-for="item in classList" :key="item._id">				
					<image :src="item.smallPicurl" mode="aspectFill"></image>				
				</view>
			</view>		
			<view v-if="noData || classList.length"><uni-load-more :status="noData?'noMore':'loading'"/></view>
		</view>
		
		
	</view>
</template>

<script setup>
import {ref,watch} from "vue";
import {onLoad,onUnload,onReachBottom} from "@dcloudio/uni-app";
import { searchWall } from "../../api/apis";

//查询参数
const queryParams = ref({	
	pageNum:1,
	pageSize:12,
	keyword:""
})

//搜索历史词
const historySearch = ref(uni.getStorageSync('historySearch') || []);

//热门搜索词
const recommendList = ref(["美女","帅哥","宠物","卡通"]);

//没有更多
const noData = ref(false);
//没有搜索结果
const noSearch = ref(false);

//搜索结果列表
const classList = ref([]);

const navigateTo = (item) => {
	uni.navigateTo({
		url: `/pages/preview/preview?id=${item._id}`
	})
	uni.setStorageSync('classListSync',classList.value)
}

const searchData = (data) => {
	searchWall(data).then(res=>{
		console.log('res',res)
		classList.value = [...classList.value,...res.data]
		if(queryParams.value.pageSize > res.data.length){
			noData.value = true
			console.log('yes')
		}
		uni.hideLoading()
	})
}

//监听输入框搜索词改变则初始化
watch(()=>queryParams.value.keyword,()=>{
	queryParams.value.pageNum = 1
})

//点击搜索
const onSearch = ()=>{
	uni.showLoading({
		title:"搜索中...",
	})
	classList.value = []
	historySearch.value = [...new Set([queryParams.value.keyword,...historySearch.value])]
	if(historySearch.value.length>10){
		historySearch.value = historySearch.value.slice(0,10)
	}
	uni.setStorageSync('historySearch',historySearch.value)
	searchData(queryParams.value)
}

//点击清除按钮
const onClear = ()=>{
	initData()
}

const initData = () => {
	noData.value = false
	classList.value = []
	queryParams.value = {
		pageNum:1,
		pageSize:12,
		keyword:""
	}
	
}

//点击标签进行搜索
const clickTab = (value)=>{
	initData()
	queryParams.value.keyword = value
	onSearch()
}


//点击清空搜索记录
const removeHistory = ()=>{
	uni.showModal({
		title:"是否清空历史搜索？",
		success:res=>{
			if(res.confirm){
				console.log("确认删除");	
				uni.removeStorageSync('historySearch')
				historySearch.value = []
			}
		}
	})
}

//触底加载更多
onReachBottom(()=>{
	if(noData.value){
		return
	}
	queryParams.value.pageNum++
	searchData(queryParams.value)
})

//关闭有页面
onUnload(()=>{
	removeStorageSync("classListSync")
})


</script>

<style lang="scss" scoped>
.searchLayout{
	.search{
		padding:0 10rpx;
	}
	.topTitle{
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 32rpx;
		color:#999;
	}
	.history{
		padding:30rpx;		
	}
	.recommend{
		padding:30rpx;
	}
	.tabs{
		display: flex;		
		align-items: center;
		flex-wrap: wrap;
		padding-top:20rpx;
		.tab{
			background: #F4F4F4;
			font-size: 28rpx;
			color:#333;
			padding:10rpx 28rpx;
			border-radius: 50rpx;
			margin-right: 20rpx;
			margin-top: 20rpx;
		}
	}	
	.list{
		display: grid;
		grid-template-columns: repeat(3,1fr);
		gap: 5rpx;
		padding:20rpx 5rpx;		
		.item{
			height: 440rpx;
			image{
				width: 100%;
				height: 100%;
				display: block;
			}			
		}		
	}
}
</style>
