"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const api_apis = require("../../api/apis.js");
require("../../utils/request.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  (_easycom_uni_icons2 + _easycom_uni_load_more2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_load_more = () => "../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_load_more)();
}
const _sfc_main = {
  __name: "user",
  setup(__props) {
    const userInfo = common_vendor.ref(null);
    const list1 = common_vendor.ref(null);
    const list2 = common_vendor.ref([
      {
        name: "订阅更新",
        icon: "notification-filled",
        key: "notify",
        value: "",
        url: "/pages/notice/notice?id=653507c6466d417a3718e94b&name=订阅更新"
      },
      {
        name: "常见问题",
        icon: "help-filled",
        key: "help",
        value: "",
        url: "/pages/notice/notice?id=6536358ce0ec19c8d67fbe82&name=常见问题"
      }
    ]);
    common_vendor.onLoad(() => {
      api_apis.getUserInfo().then((res) => {
        console.log("res", res);
        userInfo.value = res.data;
        list1.value = [
          // {
          // 	name: '我的下载',
          // 	icon: 'download-filled',
          // 	key: 'download',
          // 	value: userInfo.value.downloadSize,
          // 	url: "/pages/classList/classList?type=download&name=我的下载"
          // },{
          // 	name: '我的评分',
          // 	icon: 'star-filled',
          // 	key: 'star',
          // 	value: userInfo.value.scoreSize,
          // 	url:"/pages/classList/classList?type=score&name=我的评分"
          // },{
          // 	name: '联系客服',
          // 	icon: 'email',
          // 	key: 'contact',
          // 	value: '',
          // },
        ];
      });
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: userInfo.value
      }, userInfo.value ? {
        b: common_assets._imports_0,
        c: common_vendor.t(userInfo.value.IP),
        d: common_vendor.t(userInfo.value.address.country),
        e: common_vendor.t(userInfo.value.address.province),
        f: common_vendor.t(userInfo.value.address.city),
        g: common_vendor.f(list1.value, (item, index, i0) => {
          return common_vendor.e({
            a: "0f7520f0-0-" + i0,
            b: common_vendor.p({
              type: item.icon,
              size: "20",
              color: "#28b389"
            }),
            c: common_vendor.t(item.name),
            d: common_vendor.t(item.value),
            e: "0f7520f0-1-" + i0,
            f: item.key === "contact"
          }, item.key === "contact" ? {} : {}, {
            g: item.url,
            h: item.key === "download" || item.key === "star",
            i: item.key
          });
        }),
        h: common_vendor.p({
          type: "right",
          size: "15"
        }),
        i: common_vendor.f(list2.value, (item, index, i0) => {
          return {
            a: "0f7520f0-2-" + i0,
            b: common_vendor.p({
              type: item.icon,
              size: "20",
              color: "#28b389"
            }),
            c: common_vendor.t(item.name),
            d: common_vendor.t(item.value),
            e: "0f7520f0-3-" + i0,
            f: item.key,
            g: item.url
          };
        }),
        j: common_vendor.p({
          type: "right",
          size: "15"
        })
      } : {
        k: common_vendor.p({
          status: "loading"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0f7520f0"], ["__file", "F:/uni-app/wallpaper-app/pages/user/user.vue"]]);
wx.createPage(MiniProgramPage);
