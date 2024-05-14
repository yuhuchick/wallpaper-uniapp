"use strict";
const utils_request = require("../utils/request.js");
const getBanner = () => {
  return utils_request.instance({
    url: "/homeBanner"
  });
};
const getNotices = (data) => {
  return utils_request.instance({
    url: "/wallNewsList",
    data,
    method: "post"
  });
};
const getNoticeDetail = (data) => {
  return utils_request.instance({
    url: "/wallNewsDetail",
    data,
    method: "get"
  });
};
const getClassify = (data) => {
  return utils_request.instance({
    url: "/classify",
    data,
    method: "get"
  });
};
const getRecommend = (data) => {
  return utils_request.instance({
    url: "/randomWall",
    data,
    method: "get"
  });
};
const getClassList = (data) => {
  return utils_request.instance({
    url: "/wallList",
    data,
    method: "get"
  });
};
const setupScore = (data) => {
  return utils_request.instance({
    url: "/setupScore",
    data,
    method: "get"
  });
};
const downloadWall = (data) => {
  return utils_request.instance({
    url: "/downloadWall",
    data,
    method: "get"
  });
};
const getUserInfo = () => {
  return utils_request.instance({
    url: "/userInfo",
    method: "get"
  });
};
const getDownloadList = (data) => {
  return utils_request.instance({
    url: "/userWallList",
    data,
    method: "get"
  });
};
const searchWall = (data) => {
  return utils_request.instance({
    url: "/searchWall",
    data,
    method: "get"
  });
};
exports.downloadWall = downloadWall;
exports.getBanner = getBanner;
exports.getClassList = getClassList;
exports.getClassify = getClassify;
exports.getDownloadList = getDownloadList;
exports.getNoticeDetail = getNoticeDetail;
exports.getNotices = getNotices;
exports.getRecommend = getRecommend;
exports.getUserInfo = getUserInfo;
exports.searchWall = searchWall;
exports.setupScore = setupScore;
