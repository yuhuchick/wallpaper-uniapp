"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = {
  __name: "common-nav",
  setup(__props) {
    const system = common_vendor.index.getSystemInfoSync();
    const statusBarHeight = common_vendor.ref(system.statusBarHeight);
    const { height, top } = common_vendor.index.getMenuButtonBoundingClientRect();
    const titleBarHeight = common_vendor.ref(height + (top - statusBarHeight.value) * 2);
    return (_ctx, _cache) => {
      return {
        a: statusBarHeight.value + "px",
        b: common_vendor.p({
          type: "search",
          size: "20",
          color: "#666"
        }),
        c: titleBarHeight.value + "px",
        d: statusBarHeight.value + titleBarHeight.value + "px"
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-61ed1304"], ["__file", "F:/uni-app/wallpaper-app/components/common-nav/common-nav.vue"]]);
wx.createComponent(Component);
