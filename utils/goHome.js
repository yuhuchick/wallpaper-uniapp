export const goHome = () => {
	uni.showModal({
		title:"提示",
		content:"获取信息有误，即将返回首页",
		showCancel:false,
		success:()=>{
			uni.reLaunch({
				url:"/pages/index/index"
			})
		}
	})
}