"use strict";
const common_vendor = require("../../common/vendor.js");
const api_apis = require("../../api/apis.js");
require("../../utils/request.js");
if (!Array) {
  const _easycom_common_nav2 = common_vendor.resolveComponent("common-nav");
  const _easycom_theme_item2 = common_vendor.resolveComponent("theme-item");
  (_easycom_common_nav2 + _easycom_theme_item2)();
}
const _easycom_common_nav = () => "../../components/common-nav/common-nav.js";
const _easycom_theme_item = () => "../../components/theme-item/theme-item.js";
if (!Math) {
  (_easycom_common_nav + _easycom_theme_item)();
}
const _sfc_main = {
  __name: "classify",
  setup(__props) {
    const classifyList = common_vendor.ref([]);
    common_vendor.onShareAppMessage((e) => {
      console.log(e);
      return {
        title: "yuhu壁纸~壁纸大分类",
        path: "/pages/classify/classify"
      };
    });
    common_vendor.onMounted(() => {
      api_apis.getClassify({
        pageSize: 15
      }).then((res) => {
        console.log("res5", res);
        classifyList.value = res.data;
      });
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(classifyList.value, (item, index, i0) => {
          return {
            a: item._id,
            b: "6bcfa975-1-" + i0,
            c: common_vendor.p({
              item
            })
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-6bcfa975"], ["__file", "F:/uni-app/wallpaper-app/pages/classify/classify.vue"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
