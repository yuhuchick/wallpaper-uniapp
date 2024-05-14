"use strict";
const common_vendor = require("../../common/vendor.js");
const api_apis = require("../../api/apis.js");
require("../../utils/request.js");
if (!Array) {
  const _easycom_uni_tag2 = common_vendor.resolveComponent("uni-tag");
  const _easycom_uni_dateformat2 = common_vendor.resolveComponent("uni-dateformat");
  const _easycom_mp_html2 = common_vendor.resolveComponent("mp-html");
  (_easycom_uni_tag2 + _easycom_uni_dateformat2 + _easycom_mp_html2)();
}
const _easycom_uni_tag = () => "../../uni_modules/uni-tag/components/uni-tag/uni-tag.js";
const _easycom_uni_dateformat = () => "../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js";
const _easycom_mp_html = () => "../../uni_modules/mp-html/components/mp-html/mp-html.js";
if (!Math) {
  (_easycom_uni_tag + _easycom_uni_dateformat + _easycom_mp_html)();
}
const _sfc_main = {
  __name: "notice",
  setup(__props) {
    const noticeContent = common_vendor.ref({});
    common_vendor.onLoad((e) => {
      console.log("res", e);
      const { id, name } = e;
      if (name) {
        common_vendor.index.setNavigationBarTitle({
          title: name
        });
      }
      api_apis.getNoticeDetail({ id }).then((res) => {
        console.log("res", res);
        noticeContent.value = res.data;
      });
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: noticeContent.value.select
      }, noticeContent.value.select ? {
        b: common_vendor.p({
          inverted: true,
          text: "置顶",
          type: "error",
          size: "small"
        })
      } : {}, {
        c: common_vendor.t(noticeContent.value.title),
        d: common_vendor.t(noticeContent.value.author),
        e: common_vendor.p({
          date: noticeContent.value.publish_date,
          format: "yyyy-MM-dd hh:mm:ss"
        }),
        f: common_vendor.p({
          content: noticeContent.value.content
        }),
        g: common_vendor.t(noticeContent.value.view_count)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1c2e4c1e"], ["__file", "F:/uni-app/wallpaper-app/pages/notice/notice.vue"]]);
wx.createPage(MiniProgramPage);
