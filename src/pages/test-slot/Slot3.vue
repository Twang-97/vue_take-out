<template>
  <div>
    <ul>
      <li v-for="user in users" :key="user.name">
        <slot :user="user">
          <p>{{user.name}}</p>
        </slot>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      users: [
        {
          name: "bob",
          isComplet: true
        },
        {
          name: "tom",
          isComplet: false
        },
        {
          name: "jerry",
          isComplet: false
        },
        {
          name: "jack",
          isComplet: true
        }
      ]
    };
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped ></style>
