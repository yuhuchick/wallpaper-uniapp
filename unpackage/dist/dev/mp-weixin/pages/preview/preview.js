"use strict";
const common_vendor = require("../../common/vendor.js");
const api_apis = require("../../api/apis.js");
const utils_goHome = require("../../utils/goHome.js");
require("../../utils/request.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_dateformat2 = common_vendor.resolveComponent("uni-dateformat");
  const _easycom_uni_rate2 = common_vendor.resolveComponent("uni-rate");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_icons2 + _easycom_uni_dateformat2 + _easycom_uni_rate2 + _easycom_uni_popup2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_dateformat = () => "../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js";
const _easycom_uni_rate = () => "../../uni_modules/uni-rate/components/uni-rate/uni-rate.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_dateformat + _easycom_uni_rate + _easycom_uni_popup)();
}
const _sfc_main = {
  __name: "preview",
  setup(__props) {
    const maskState = common_vendor.ref(true);
    const popup = common_vendor.ref(null);
    const remarkPop = common_vendor.ref(null);
    const starValue = common_vendor.ref(0);
    const classList = common_vendor.ref([]);
    const currentIndex = common_vendor.ref(0);
    const currentInfo = common_vendor.ref({});
    const isStar = common_vendor.ref(false);
    const changeMask = () => {
      maskState.value = !maskState.value;
    };
    const openPop = () => {
      popup.value.open("bottom");
    };
    const closePop = () => {
      popup.value.close();
    };
    const openRemark = () => {
      if (currentInfo.value.userScore) {
        starValue.value = currentInfo.value.userScore;
        isStar.value = true;
      }
      remarkPop.value.open("center");
    };
    const closeRemark = () => {
      remarkPop.value.close();
      starValue.value = 0;
      isStar.value = false;
    };
    const downloadImg = async () => {
      try {
        common_vendor.index.showLoading({
          title: "下载中...",
          icon: "none"
        });
        const { classid, _id: wallID } = currentInfo.value;
        const res = await api_apis.downloadWall({
          classid,
          wallID
        });
        console.log("error", res);
        if (res.errCode != 0) {
          throw res;
        }
        common_vendor.index.getImageInfo({
          src: currentInfo.value.picurl,
          success: (res2) => {
            console.log("res", res2);
            common_vendor.index.saveImageToPhotosAlbum({
              filePath: res2.path,
              success: (res3) => {
                console.log("res2", res3);
              },
              fail: (err) => {
                if (err.errMsg === "saveImageToPhotosAlbum:fail cancel") {
                  common_vendor.index.showToast({
                    title: "保存失败，请重新点击下载！",
                    icon: "none"
                  });
                  return;
                }
                common_vendor.index.showModal({
                  title: "提示",
                  content: "需要授权保存相册权限",
                  success: (res3) => {
                    if (res3.confirm) {
                      console.log("授权了");
                      common_vendor.index.openSetting({
                        success: (setting) => {
                          console.log("setting", setting);
                          if (setting.authSetting["scope.writePhotosAlbum"]) {
                            common_vendor.index.showToast({
                              title: "获取授权成功！",
                              icon: "none"
                            });
                          } else {
                            common_vendor.index.showToast({
                              title: "获取授权失败！",
                              icon: "none"
                            });
                          }
                        }
                      });
                    }
                  }
                });
              },
              complete: () => {
                common_vendor.index.hideLoading();
              }
            });
          }
        });
      } catch (err) {
        console.log("err", err), common_vendor.index.hideLoading();
      }
    };
    const onSubmit = () => {
      common_vendor.index.showLoading({
        title: "加载中..."
      });
      const params = {
        classid: currentInfo.value.classid,
        wallId: currentInfo.value._id,
        userScore: starValue.value
      };
      api_apis.setupScore(params).then((res) => {
        console.log("res", res);
        if (res.errCode === 0) {
          classList.value[currentIndex.value].userScore = params.userScore;
          console.log(classList.value[currentIndex.value]);
          common_vendor.index.setStorageSync("classListSync", classList.value);
        }
        starValue.value = 0;
        closeRemark();
      }).catch((err) => {
        starValue.value = 0;
        closeRemark();
      }).finally((fin) => {
        common_vendor.index.hideLoading();
        common_vendor.index.showToast({
          title: "评分成功",
          icon: "none"
        });
      });
    };
    const goback = () => {
      common_vendor.index.navigateBack({
        success: () => {
        },
        fail: () => {
          common_vendor.index.reLaunch({
            url: "/pages/index/index"
          });
        }
      });
    };
    const changePage = (e) => {
      currentIndex.value = e.detail.current;
      currentInfo.value = classList.value[currentIndex.value];
      console.log("value", currentInfo.value);
    };
    common_vendor.onLoad((e) => {
      const { id } = e;
      if (!id) {
        utils_goHome.goHome();
        return;
      }
      const data = common_vendor.index.getStorageSync("classListSync") || [];
      classList.value = data.map((item) => {
        return {
          ...item,
          picurl: item.smallPicurl.replace("_small.webp", ".jpg")
        };
      });
      currentIndex.value = classList.value.findIndex((item) => item._id == id);
      currentInfo.value = classList.value[currentIndex.value];
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(classList.value, (item, index, i0) => {
          return common_vendor.e({
            a: Math.abs(index - currentIndex.value) <= 1
          }, Math.abs(index - currentIndex.value) <= 1 ? {
            b: common_vendor.o(($event) => changeMask(), item._id),
            c: item.picurl
          } : {}, {
            d: item._id
          });
        }),
        b: currentIndex.value,
        c: common_vendor.o(changePage),
        d: common_vendor.p({
          type: "left",
          size: "20",
          color: "#fff"
        }),
        e: common_vendor.o(($event) => goback()),
        f: common_vendor.t(currentIndex.value + 1),
        g: common_vendor.t(classList.value.length),
        h: common_vendor.p({
          date: /* @__PURE__ */ new Date(),
          format: "hh:mm"
        }),
        i: common_vendor.p({
          date: /* @__PURE__ */ new Date(),
          format: "MM月dd日"
        }),
        j: common_vendor.p({
          type: "info",
          size: "20",
          color: "#555"
        }),
        k: common_vendor.o(($event) => openPop()),
        l: common_vendor.p({
          type: "star",
          size: "20",
          color: "#555"
        }),
        m: common_vendor.t(currentInfo.value.score),
        n: common_vendor.o(($event) => openRemark()),
        o: common_vendor.p({
          type: "download-filled",
          size: "20",
          color: "#555"
        }),
        p: common_vendor.o(downloadImg),
        q: common_vendor.p({
          type: "closeempty",
          size: "20",
          color: "#999"
        }),
        r: common_vendor.o(($event) => closePop()),
        s: common_vendor.t(currentInfo.value._id),
        t: common_vendor.t(currentInfo.value.nickname),
        v: common_vendor.p({
          readonly: true,
          value: currentInfo.value.score,
          touchable: false,
          allowHalf: true
        }),
        w: common_vendor.t(currentInfo.value.score),
        x: common_vendor.t(currentInfo.value.description),
        y: common_vendor.f(currentInfo.value.tabs, (item, index, i0) => {
          return {
            a: common_vendor.t(item),
            b: index
          };
        }),
        z: common_vendor.sr(popup, "2dad6c07-6", {
          "k": "popup"
        }),
        A: common_vendor.p({
          type: "bottom",
          ["border-radius"]: "10px 10px 0 0"
        }),
        B: common_vendor.t(isStar.value ? "已经评分过了" : "评分"),
        C: common_vendor.p({
          type: "closeempty",
          size: "20",
          color: "#999"
        }),
        D: common_vendor.o(($event) => closeRemark()),
        E: common_vendor.o(($event) => starValue.value = $event),
        F: common_vendor.p({
          ["allow-half"]: true,
          disabled: isStar.value,
          ["disabled-color"]: "#FFCA3E",
          modelValue: starValue.value
        }),
        G: common_vendor.t(starValue.value),
        H: !starValue.value || isStar.value,
        I: common_vendor.o(($event) => onSubmit()),
        J: common_vendor.sr(remarkPop, "2dad6c07-9", {
          "k": "remarkPop"
        }),
        K: common_vendor.p({
          type: "bottom",
          ["border-radius"]: "10px 10px 0 0",
          ["is-mask-click"]: false
        }),
        L: maskState.value
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2dad6c07"], ["__file", "F:/uni-app/wallpaper-app/pages/preview/preview.vue"]]);
wx.createPage(MiniProgramPage);
