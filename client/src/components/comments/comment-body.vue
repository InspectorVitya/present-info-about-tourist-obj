<template>
  <div class="my-1">
    <div>
      <v-sheet class="d-flex flex-row align-center mb-1" rounded >
        <userHeader class="pa-2"
          :username="username"
          :image-url="avatar"
          size="28"/>

        <div>{{text}}</div>
      </v-sheet>
      <span class="mr-2">Оценка: {{rating}}</span>
      </div>
  </div>
</template>

<script>
import userHeader from '../user-header.vue';

export default {
  name: 'comment-body',
  props: ['username', 'avatar', 'text', 'rating'],
  components: { userHeader },
  data: () => ({
    replying: false,
  }),
};
</script>

<style scoped>

</style>
