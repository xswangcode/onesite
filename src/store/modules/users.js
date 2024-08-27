import {
  LoginInfo
} from "../../api/modules/index.js";
import router from "../../router/router.js";
import {
  mix
} from "../../utils/color.js";
import {
  ElMessage
} from "element-plus";

export default {
  namespaced: true,
  state: {
    UserInfo: {},
    token: sessionStorage.getItem("token") || "",
    isCollapse: true,
    themeConfig: {
      primary: "#4060c7",
      tabColor: "#FFFFFF",
      footColor: "#606266",
      backgroundColor: "#FFFFFF",
      textColor: "#00000099",
      istags: true,
    },
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    setUserInfo(state, userinfo) {
      state.UserInfo = userinfo;
    },
    SetIsCollapse(state, isCollapse) {
      state.isCollapse = isCollapse;
    },
    setThemeConfig(state, primary) {
      state.themeConfig.primary = primary;
    },
    setThemeConfigTbaColor(state, primary) {
      state.themeConfig.tabColor = primary;
      if (primary == "#FFFFFF") {
        state.themeConfig.footColor = "#606266";
      } else {
        state.themeConfig.footColor = "#ffffff";
      }
    },
    setThemeConfigMenuColor(state, primary) {
      if (primary) {
        state.themeConfig.backgroundColor = "#FFFFFF";
        state.themeConfig.textColor = "#00000099";
      } else {
        state.themeConfig.backgroundColor = "#1d2129";
        state.themeConfig.textColor = "#bdbdc0";
      }
    },
    setThemeConfigchangeTags(state, primary) {
      if (primary) {
        state.themeConfig.istags = true
      } else {
        state.themeConfig.istags = false
      }
    },
  },

  actions: {
    login({
      commit
    }, userInfo) {
      return new Promise((resolve, reject) => {
        LoginInfo(userInfo)
          .then((res) => {
            sessionStorage.setItem("token", res.data.data.token);
            sessionStorage.setItem("UserInfo", JSON.stringify(res.data.data));
            commit("setToken", res.data.data.token);
            commit("setUserInfo", res.data.data);
            router.replace("/");
            ElMessage({
              message: "登录成功",
              type: "success",
            });
            resolve();
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    changeIsCollapse({
      commit
    }, str) {
      commit("SetIsCollapse", str);
    },

    changeThem({
      commit
    }, str) {
      commit("setThemeConfig", str);
      const pre = "--el-color-primary";
      // 白色混合色
      const mixWhite = "#ffffff";
      // 黑色混合色
      const mixBlack = "#4060c7";
      const el = document.documentElement;
      el.style.setProperty(pre, str);
      // 这里是覆盖原有颜色的核心代码
      for (let i = 1; i < 10; i += 1) {
        el.style.setProperty(`${pre}-light-${i}`, mix(str, mixWhite, i * 0.7));
      }
      el.style.setProperty("--el-color-primary-dark", mix(str, mixBlack, 0.1));
    },
    changeTabColor({
      commit
    }, val) {
      commit("setThemeConfigTbaColor", val);
    },
    changeMenuColor({
      commit
    }, val) {
      commit("setThemeConfigMenuColor", val);
    },
    changeTags({
      commit
    }, val) {
      commit("setThemeConfigchangeTags", val);
    },
  },
};