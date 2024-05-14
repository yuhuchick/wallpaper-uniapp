import { instance } from "../utils/request"
//获取首页轮播
export const getBanner = () => {
	return instance({
		url: "/homeBanner",
	})
}
//获取首页公告
export const getNotices = (data) => {
	return instance({
		url: "/wallNewsList",
		data,
		method:"post"
	})
}
//获取公告详情
export const getNoticeDetail = (data) => {
	return instance({
		url: "/wallNewsDetail",
		data,
		method:"get"
	})
}

//获取首页展示壁纸分类
export const getClassify = (data) => {
	return instance({
		url: "/classify",
		data,
		method:"get"
	})
}
//获取推荐壁纸
export const getRecommend = (data) => {
	return instance({
		url: "/randomWall",
		data,
		method:"get"
	})
}
//获取某分类的所有壁纸
export const getClassList = (data) =>{
	return instance({
		url: "/wallList",
		data,
		method:"get"
	})
}

//为壁纸评分
export const setupScore = (data) =>{
	return instance({
		url: "/setupScore",
		data,
		method:"get"
	})
}
// 壁纸下载
export const downloadWall = (data) =>{
	return instance({
		url: "/downloadWall",
		data,
		method:"get"
	})
}
//获取用户信息
export const getUserInfo = () => {
	return instance({
		url: "/userInfo",
		method:"get"
	})
}
//获取已下载或评分的壁纸
export const getDownloadList = (data) =>{
	return instance({
		url: "/userWallList",
		data,
		method:"get"
	})
}

export const searchWall = (data) => {
	return instance({
		url: "/searchWall",
		data,
		method:"get"
	})
}