"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const utils_timeFormat = require("../../utils/timeFormat.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = {
  __name: "theme-item",
  props: {
    isMore: {
      type: Boolean,
      default: false
    },
    item: {
      type: Object,
      default() {
        return {
          name: "null",
          picurl: "null",
          updateTime: Date.now() - 1e3 * 60 * 60 * 5,
          _id: "null"
        };
      }
    }
  },
  setup(__props) {
    const props = __props;
    common_vendor.onMounted(() => {
      console.log(props.isMore);
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: !__props.isMore
      }, !__props.isMore ? {
        b: __props.item.picurl,
        c: common_vendor.t(__props.item.name),
        d: common_vendor.t(common_vendor.unref(utils_timeFormat.timeFormat)(__props.item.updateTime)),
        e: `../../pages/classList/classList?classid=${__props.item._id}&name=${__props.item.name}`
      } : {
        f: common_assets._imports_0$1,
        g: common_vendor.p({
          type: "more-filled",
          size: "30",
          color: "#fff"
        })
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-f4eafbca"], ["__file", "F:/uni-app/wallpaper-app/components/theme-item/theme-item.vue"]]);
wx.createComponent(Component);
