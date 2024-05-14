"use strict";
const common_vendor = require("../../common/vendor.js");
const api_apis = require("../../api/apis.js");
const utils_goHome = require("../../utils/goHome.js");
require("../../utils/request.js");
if (!Array) {
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  _easycom_uni_load_more2();
}
const _easycom_uni_load_more = () => "../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
if (!Math) {
  _easycom_uni_load_more();
}
const _sfc_main = {
  __name: "classList",
  setup(__props) {
    const classList = common_vendor.ref([]);
    const noData = common_vendor.ref(false);
    const queryParams = {
      pageNum: 1,
      pageSize: 12
    };
    const getParams = (value) => {
      if (value.type) {
        api_apis.getDownloadList(value).then((res) => {
          console.log("res6", res);
          classList.value = [...classList.value, ...res.data];
          if (queryParams.pageSize > res.data.length) {
            noData.value = true;
          }
          common_vendor.index.setStorageSync("classListSync", classList.value);
        });
      } else if (value.classid) {
        api_apis.getClassList(value).then((res) => {
          console.log("res6", res);
          classList.value = [...classList.value, ...res.data];
          if (queryParams.pageSize > res.data.length) {
            noData.value = true;
          }
          common_vendor.index.setStorageSync("classListSync", classList.value);
        });
      }
    };
    common_vendor.onLoad((e) => {
      const { classid, type, name, id } = e;
      if (!classid && !type && !id) {
        noData.value = true;
        utils_goHome.goHome();
        return;
      }
      if (classid) {
        queryParams.classid = classid;
      } else if (type) {
        queryParams.type = type;
      } else {
        queryParams.classid = id;
      }
      console.log("e", queryParams);
      getParams(queryParams);
      common_vendor.index.setNavigationBarTitle({
        title: name
      });
    });
    common_vendor.onReachBottom(() => {
      if (noData.value) {
        console.log("yes");
        return;
      }
      queryParams.pageNum++;
      getParams(queryParams);
    });
    common_vendor.onUnload(() => {
      common_vendor.index.removeStorageSync("classListSync");
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: !classList.value.length && !noData.value
      }, !classList.value.length && !noData.value ? {
        b: common_vendor.p({
          status: "loading"
        })
      } : {}, {
        c: common_vendor.f(classList.value, (item, index, i0) => {
          return {
            a: item.smallPicurl,
            b: `/pages/preview/preview?id=${item._id}`,
            c: item._id
          };
        }),
        d: classList.value.length || noData.value
      }, classList.value.length || noData.value ? {
        e: common_vendor.p({
          status: noData.value ? "noMore" : "loading"
        })
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-104357ab"], ["__file", "F:/uni-app/wallpaper-app/pages/classList/classList.vue"]]);
wx.createPage(MiniProgramPage);
