<template>
	<view class="previewLayout" >
		<swiper 
		  class="container"
		 :current="currentIndex" 
		 @change="changePage"
		 circular
		 >
			<swiper-item class="imgBox"
			v-for="(item,index) in classList"
			:key="item._id"
			>
				<image 
				v-if="Math.abs(index-currentIndex)<=1"
				@click="changeMask()" 
				:src="item.picurl" 
				mode="aspectFill"
				></image>
			</swiper-item>
		</swiper>
		<view class="mask" v-show="maskState">
			<view class="goback" @click="goback()">
				<uni-icons type="left" size="20" color="#fff"></uni-icons>
			</view>
			<view class="content">
				
				<view class="number">
					{{currentIndex+1}}/{{classList.length}}
				</view>
				<view class="time">
					<uni-dateformat :date="new Date()" format="hh:mm"></uni-dateformat>
				</view>
				<view class="date">
					<uni-dateformat :date="new Date()" format="MM月dd日"></uni-dateformat>
				</view>
				<view class="footer">
					<view class="info" @click="openPop()">
						<uni-icons type="info" size="20" color="#555"></uni-icons>
						<text>信息</text>
					</view>
					<view class="star" @click="openRemark()">
						<uni-icons type="star" size="20" color="#555"></uni-icons>
						<text>{{currentInfo.score}}分</text>
					</view>
					<view class="download" @click="downloadImg">
						<uni-icons type="download-filled" size="20" color="#555"></uni-icons>
						<text>下载</text>
					</view>
				</view>
				<uni-popup ref="popup" type="bottom" border-radius="10px 10px 0 0">
					<view class="infoPop">
						<view class="popHeader">
							<view class="title">
								壁纸信息
							</view>
							<view class="close" @click="closePop()">
								<uni-icons type="closeempty" size="20" color="#999"></uni-icons>
							</view>
						</view>
						<scroll-view class="popContent" scroll-y>
							<view class="row">
								<view class="label">壁纸ID:</view>
								<text class="content" selectable>{{currentInfo._id}}</text>
							</view>	
							<view class="row">
								<view class="label">发布者:</view>
								<text class="content">{{currentInfo.nickname}}</text>
							</view>	
							<view class="row">
								<view class="label">评分:</view>
								<div class="starContent">
									<uni-rate
									 :readonly="true" 
									 :value="currentInfo.score" 
									 :touchable="false"
									 allowHalf
									 />
									<text>{{currentInfo.score}}分</text>
								</div>
							</view>	
							<view class="row">
								<view class="label">摘要:</view>
								<view class="content">{{currentInfo.description}}</view>
							</view>	
							<view class="row">
								<view class="label">标签:</view>
								<view class="tagContent ">
									<view class="tags"
									 v-for="(item,index) in currentInfo.tabs" 
									 :key="index">
										{{item}}
									</view>
								</view>
							</view>
							<view class="safe-area-inset-bottom"></view>
						</scroll-view>
					</view>
				</uni-popup>
				<uni-popup ref="remarkPop" type="bottom" border-radius="10px 10px 0 0" :is-mask-click="false">
					<view class="remarkPop">
						<view class="popHeader">
							<view class="title">
							{{isStar?"已经评分过了":"评分"}}
							</view>
							<view class="close" @click="closeRemark()">
								<uni-icons type="closeempty" size="20" color="#999"></uni-icons>
							</view>
						</view>
						<view class="popContent">
							<uni-rate allow-half v-model="starValue"
							 :disabled="isStar"
							 disabled-color="#FFCA3E"
							 />
							<text class="userScore">{{ starValue }}分</text>
						</view>
						<view class="popFooter">
							<button plain size="mini" :disabled="!starValue||isStar" @click="onSubmit()">确认评分</button>
						</view>
						
					</view>	
				</uni-popup>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {ref,onMounted} from 'vue'
	import {onLoad} from '@dcloudio/uni-app'
	import { setupScore ,downloadWall} from '../../api/apis';
	import { goHome } from '../../utils/goHome';
	const maskState = ref(true)
	const popup = ref(null)
	const remarkPop = ref(null)
	const starValue = ref(0)
	const classList = ref([])
	const currentIndex = ref(0)
	const currentInfo = ref({})
	const isStar = ref(false)
	// 点击图片关闭文字显示
	const changeMask = () => {
		maskState.value = !maskState.value
	}
	// info弹窗
	const openPop = () => {
		popup.value.open("bottom")
	}
	// 关闭info弹窗
	const closePop = () => {
		popup.value.close()
	}
	// 打开评分弹窗
	const openRemark = () => {
		if(currentInfo.value.userScore){
			starValue.value = currentInfo.value.userScore
			isStar.value = true
		}
		remarkPop.value.open("center")
	}
	//关闭评分弹窗
	const closeRemark = () => {
		remarkPop.value.close()
		starValue.value = 0
		isStar.value = false
	}
	//图片下载接口
	const downloadImg = async() =>{
		
		// #ifdef H5
			uni.showModal({
				title:"提示",
				content:"请长按保存壁纸",
				showCancel:false
			})
		// #endif
		// #ifndef H5
		try{
				uni.showLoading({
					title:"下载中...",
					icon: "none"
				})
				const {classid,_id:wallID} = currentInfo.value
				const res = await downloadWall({
					classid,
					wallID
				})
				console.log('error',res)
				if(res.errCode != 0){
					throw res
				}
				uni.getImageInfo({
					src:currentInfo.value.picurl,
					success: (res)=>{
						console.log('res',res)
						uni.saveImageToPhotosAlbum({
							filePath: res.path,
							success:(res)=>{
								console.log('res2',res)
							},
							fail: (err)=>{
								//因点击取消按钮而导致的未保存
								if(err.errMsg === "saveImageToPhotosAlbum:fail cancel"){
									uni.showToast({
										title:"保存失败，请重新点击下载！",
										icon: "none"
									})
									return;
								}
								//因没有权限而导致的保存失败
								uni.showModal({
									title:"提示",
									content:"需要授权保存相册权限",
									success:(res)=>{
										if(res.confirm){
											console.log("授权了")
											uni.openSetting({
												success:(setting)=>{
													console.log("setting",setting)
													if(setting.authSetting['scope.writePhotosAlbum']){
														uni.showToast({
															title:"获取授权成功！",
															icon:"none"
														})
													}else{
														uni.showToast({
															title:"获取授权失败！",
															icon:"none"
														})
													}
												}
											})
										}
									}
								})
							},
							complete: ()=>{
								uni.hideLoading()
							}
						})
					}
				})
			}
			catch(err){
				console.log('err',err),
				uni.hideLoading()
			}
		// #endif

	}
	//提交评分
	const onSubmit = () => {
		uni.showLoading({
			title:"加载中..."
		})
		const params = {
			classid: currentInfo.value.classid,
			wallId:currentInfo.value._id,
			userScore: starValue.value
		}
		setupScore(params).then(res=>{
			console.log('res',res)
			if(res.errCode === 0){
				
				// 通过缓存修改评分后的用户评分
				classList.value[currentIndex.value].userScore = params.userScore
				console.log(classList.value[currentIndex.value])
				uni.setStorageSync("classListSync",classList.value)
			}
			starValue.value = 0
			closeRemark()
		}).catch(err=>{
			starValue.value = 0
			closeRemark()
		}).finally(fin=>{
			uni.hideLoading()
			uni.showToast({
				title:"评分成功",
				icon: 'none'
			})
		})
	}
	//返回上一级
	const goback = () => {
		uni.navigateBack({
			success:()=>{
				
			},
			fail:()=>{
				uni.reLaunch({
					url: "/pages/index/index"
				})
			}
		})
	}
	//切换图片
	const changePage = (e) =>{
		currentIndex.value = e.detail.current
		currentInfo.value = classList.value[currentIndex.value]
		console.log('value',currentInfo.value)
	}
	onLoad((e)=>{
		const {id} = e
		if(!id){
			goHome()
			return
		}
		const data = uni.getStorageSync('classListSync') || []
		classList.value = data.map(item=>{
			return {
				...item,
				picurl: item.smallPicurl.replace("_small.webp",".jpg")
			}
		})
		currentIndex.value = classList.value.findIndex(item=>item._id == id)
		currentInfo.value = classList.value[currentIndex.value]

	})
</script>

<style lang="scss" scoped>
	.previewLayout {
		position: relative;
		width: 100%;
		height: 100vh;
		.container {
			width: 100%;
			height: 100%;
				image {
					width: 100%;
					height: 100%;
				}
		}
		.mask {
			.goback {
				position: absolute;
				top: 4vh;
				left: 1.5vh;
				width: 60rpx;
				height: 60rpx;
				background-color: rgba(0,0,0,0.3);
				border-radius: 50%;
				border: 1px solid #ccc;
				display: flex;
				justify-content: center;
				align-items: center;
			}
			.content {	
				&>view {
					position: absolute;
					left: 0;
					right: 0;
					margin: auto;
					width: fit-content;
					color: #fff;
				}
				.number {
					pointer-events: none;
					top: 10vh;
					font-size: 28rpx;
					backdrop-filter: blur(10rpx);
					background-color: rgba(0,0,0,0.3);
					padding: 6rpx 38rpx;
					border-radius: 40rpx;
					text-shadow: 0 4rpx rgba(0,0,0,0.3);
				}
				.time {
					pointer-events: none;
					top: calc(10vh + 80rpx);
					font-size: 140rpx;
					text-shadow: 0 5rpx rgba(0,0,0,0.3);
				}
				.date {
					pointer-events: none;
					top: calc(10vh + 280rpx);
					font-size: 34rpx;
					text-shadow: 0 4rpx rgba(0,0,0,0.3);
				}
				.footer {
					bottom: 10vh;
					width: 65vw;
					height: 120rpx;
					background-color: rgba(255,255,255,0.8);
					border-radius: 60rpx;
					display: flex;
					justify-content: space-between;
					padding: 20rpx 40rpx;
					align-items: center;
					color: #555555;
					backdrop-filter: blur(20rpx);
					&>view {
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
						padding: 15rpx;
					}
				}
				.popHeader {
					// display: flex;
					// justify-content: space-between;
					// align-items: center;
					position: relative;
					padding: 20rpx;
					padding-top: 30rpx;
					.title {
						color: #666666;
						font-size: 28rpx;
						position: absolute;
						top: 20%;
						left: 50%;
						transform: translate(-50%);
					}
					.close {
						font-size: 20rpx;
						position: absolute;
						right: 20rpx;
						top: 20%;
						
					}
				}
				.infoPop {
					background-color: #fff;
					border-radius: 30rpx;
					padding: 0 30rpx;
					color: #555;
					
					.popContent {
					max-height: 60vh;
					padding-top: 20rpx;
						.row {
							line-height: 1.7em;
							margin-bottom: 30rpx;
							display: flex;
							// align-items: center;
							.label {
								color: #ccc;
								margin-right: 20rpx;
								width: 140rpx;
								text-align: right;
							}
							.content {
								flex: 1;
								width: 0;

							
							}
							.starContent {
								flex: 1;
								width: 0;
								display: flex;
								// justify-content: center;
								// flex-direction: row-reverse;
								align-items: center;
								text {
									padding-left: 50rpx;
								}
							}
								
							.tagContent {
								flex: 1;
								width: 0;
								display: flex;
								align-items: center;
								flex-wrap: wrap;
								.tags {
									color: #555;
									border: 1px solid green;
									color: green;
									font-size: 22rpx;
									padding: 10rpx 30rpx;
									border-radius: 40rpx;
									line-height: 1em;
									margin: 0 10rpx 10rpx 0;
									width: fit-content;
								}
							}
						}
					}
				}
				.remarkPop {
					background-color: #fff;
					border-radius: 30rpx;
					width: 60vw;
					padding-bottom: 20rpx;
					color: #666666;
					.popContent {
						display: flex;
						justify-content: center;
						align-items: center;
						padding: 20rpx 0;
						.userScore {
							font-size: 28rpx;
							padding-left: 20rpx;
						}
					}
						
					.popFooter {
						display: flex;
						justify-content: center;
						align-items: center;
					}
				}
			}
			
		}
	}
</style>
