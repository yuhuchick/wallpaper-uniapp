const baseUrl = "https://tea.qingnian8.com/api/bizhi"

export function instance(config={}){
	let {
		url,
		method='GET',
		header={},
		data={}
	} = config
	url = baseUrl + url
	header['access-key'] = "110269"
	// header['token'] = "12333333"
	return new Promise((resolve,reject)=>{
		uni.request({
			url,
			header,
			method,
			data,
			success:res=>{
				if(res.data.errCode === 0){
					resolve(res.data)
				}else if(res.data.errCode === 400){
					uni.showModal({
						title:"错误提示",
						content:res.data.errMsg,
						showCancel:false
					})
					reject(res.data)
				}else{
					uni.showToast({
						title:"res.data.errMsg",
						icon:"none"
					})
					reject(res.data)
				}
			},
			timeout: 10000
		})
	})
}