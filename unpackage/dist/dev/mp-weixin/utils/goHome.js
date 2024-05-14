"use strict";
const common_vendor = require("../common/vendor.js");
const goHome = () => {
  common_vendor.index.showModal({
    title: "提示",
    content: "获取信息有误，即将返回首页",
    showCancel: false,
    success: () => {
      common_vendor.index.reLaunch({
        url: "/pages/index/index"
      });
    }
  });
};
exports.goHome = goHome;
