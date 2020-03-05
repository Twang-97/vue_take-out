<template>
  <div>
    <h1>1.普通插槽</h1>
    <Slot1>
      <h3>我是普通插槽</h3>
    </Slot1>
    <p>---------------------------------</p>
    <h1>2.命名插槽</h1>
    <Slot2>
      <h3 slot="one">我是命名one</h3>
      <h3 slot="two">我是命名two</h3>
    </Slot2>
    <p>---------------------------------</p>
    <h1>3.作用域插槽</h1>
    <Slot3>
      <template slot-scope="slotProps">
        <span v-if="slotProps.user.isComplet" style="color:red">{{slotProps.user.name}}</span>
      </template>
    </Slot3>
  </div>
</template>

<script type="text/ecmascript-6">
import Slot1 from "./Slot1";
import Slot2 from "./Slot2";
import Slot3 from "./Slot3";
export default {
  components: {
    Slot1,
    Slot2,
    Slot3
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped ></style>
