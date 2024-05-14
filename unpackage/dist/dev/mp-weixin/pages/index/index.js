"use strict";
const common_vendor = require("../../common/vendor.js");
const api_apis = require("../../api/apis.js");
require("../../utils/request.js");
if (!Array) {
  const _easycom_common_nav2 = common_vendor.resolveComponent("common-nav");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_dateformat2 = common_vendor.resolveComponent("uni-dateformat");
  const _easycom_common_title2 = common_vendor.resolveComponent("common-title");
  const _easycom_theme_item2 = common_vendor.resolveComponent("theme-item");
  (_easycom_common_nav2 + _easycom_uni_icons2 + _easycom_uni_dateformat2 + _easycom_common_title2 + _easycom_theme_item2)();
}
const _easycom_common_nav = () => "../../components/common-nav/common-nav.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_dateformat = () => "../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js";
const _easycom_common_title = () => "../../components/common-title/common-title.js";
const _easycom_theme_item = () => "../../components/theme-item/theme-item.js";
if (!Math) {
  (_easycom_common_nav + _easycom_uni_icons + _easycom_uni_dateformat + _easycom_common_title + _easycom_theme_item)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const bannerList = common_vendor.ref([]);
    const noticeList = common_vendor.ref([]);
    common_vendor.ref("");
    const classifyList = common_vendor.ref([]);
    const recommendList = common_vendor.ref([]);
    const goPreview = (item) => {
      common_vendor.index.navigateTo({
        url: `/pages/preview/preview?id=${item._id}`
      });
      common_vendor.index.setStorageSync("classListSync", recommendList.value);
    };
    common_vendor.onShareAppMessage((e) => {
      console.log(e);
      return {
        title: "yuhu壁纸",
        path: "/pages/index/index"
      };
    });
    common_vendor.onShareTimeline(() => {
      return {
        title: "yuhu壁纸"
      };
    });
    common_vendor.onLoad(() => {
      api_apis.getBanner().then((res) => {
        bannerList.value = res.data;
        console.log("res1", res);
      }).catch((err) => {
        console.log("err", err);
      });
      api_apis.getNotices({ select: true }).then((res) => {
        console.log("res2", res);
        noticeList.value = res.data;
      });
      api_apis.getClassify({ select: true }).then((res) => {
        console.log("res3", res);
        classifyList.value = res.data;
      });
      api_apis.getRecommend().then((res) => {
        console.log("res4", res);
        recommendList.value = res.data;
      });
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(bannerList.value, (item, index, i0) => {
          return common_vendor.e({
            a: item.target == "self"
          }, item.target == "self" ? {
            b: item.picurl,
            c: `/pages/classList/classList?${item.url}`
          } : {
            d: item.picurl,
            e: item.appid,
            f: item.target,
            g: `/pages/classList/classList?${item.url}`
          }, {
            h: item._id
          });
        }),
        b: common_vendor.p({
          type: "sound-filled",
          size: "20",
          color: "#28b389"
        }),
        c: common_vendor.f(noticeList.value, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: `/pages/notice/notice?id=${item._id}`,
            c: item._id
          };
        }),
        d: common_vendor.p({
          type: "right",
          size: "20"
        }),
        e: common_vendor.p({
          type: "calendar-filled",
          size: "20",
          color: "#28b389"
        }),
        f: common_vendor.p({
          date: Date.now(),
          format: "dd日"
        }),
        g: common_vendor.f(recommendList.value, (item, k0, i0) => {
          return {
            a: item.smallPicurl,
            b: common_vendor.o(($event) => goPreview(item), item._id),
            c: item._id
          };
        }),
        h: common_vendor.f(classifyList.value, (item, k0, i0) => {
          return {
            a: item._id,
            b: "1cf27b2a-7-" + i0,
            c: common_vendor.p({
              isMore: false,
              item
            })
          };
        }),
        i: common_vendor.p({
          isMore: true
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"], ["__file", "F:/uni-app/wallpaper-app/pages/index/index.vue"]]);
_sfc_main.__runtimeHooks = 6;
wx.createPage(MiniProgramPage);
