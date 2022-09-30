<template>
  <div>
    <signIn v-if="!token"></signIn>
    <el-container v-else>
      <el-header>
        <img
          src="https://images.clwy.cn/common/logo.png"
          alt="长乐未央Logo"
          class="logo"
        />
        <h1>长乐未央后台管理</h1>
        <el-button size="mini" round class="signOut" @click="signOut"
          >安全退出</el-button
        >
      </el-header>
      <el-container>
        <Aside />
        <el-container>
          <el-main>
            <router-view />
          </el-main>
          <el-footer
            >Copyright 2013-2022 CLWY Inc. All Rights Reserved.</el-footer
          >
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Aside from "@/components/AsideBar";
import signIn from "@/components/auth/SignIn";
import { getToken, removeToken } from "@/utils/auth";

export default {
  components: { Aside, signIn },
  data() {
    return {
      token: "",
    };
  },
  created() {
    this.token = getToken();
    this.$root.socket.on("new-order", (msg) => {
      this.$notify({
        title: "提醒",
        message: msg,
        type: "warning",
      });
    });
  },
  methods: {
    signOut() {
      removeToken("token");
      location.reload();
    },
  },
};
</script>
<style scoped>
.el-header {
  line-height: 60px !important;
}
.signOut {
  margin-left: 10px;
}
</style>
