<template>
  <div id="app">
    <notifications></notifications>
    <router-view/>
  </div>
</template>

<script>

import { USER_REQUEST } from "actions/user";

export default {
  name: "app",
  created: function() {
    if (this.$store.getters.isAuthenticated) {
      this.$store.dispatch(USER_REQUEST);
    }
  }
};
</script>