<template>
  <div>
    <router-view></router-view>
    <FooterGuider v-if="$route.meta.isShowFooter" />
  </div>
</template>

<script type="text/ecmascript-6">
import FooterGuider from "./components/FooterGuider/FooterGuider";
export default {
  mounted() {
    this.$store.dispatch("getAddress");
    this.$store.dispatch("getCategorys");
    this.$store.dispatch("autoLogin");
  },
  components: {
    FooterGuider
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped></style>
