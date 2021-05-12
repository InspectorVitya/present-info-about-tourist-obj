<template>
  <div>
     <div class="">Комментарии:</div>
        <CommentBody v-for="item in SITE_ONE().comments" :key='item.id'
        class="ml-2"
    :username='item.user.users_info.name +" " + item.user.users_info.surname'
     :text='item.text' :rating='item.rating_tourist_sites[0].raiting'
      :avatar="item.user.users_info.avatar"/>
    <comment-input label="comment"
                  />

    <!-- <v-divider class="my-5"/> -->

    <!-- <comment v-for="comment in content" :comment="comment" :key="comment.id"/> -->
    <!-- <div class="d-flex justify-center" v-if="!finished">
      <v-btn outlined small @click="loadContent">load more</v-btn>
    </div> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import CommentInput from './comment-input.vue';
import CommentBody from './comment-body.vue';
/* eslint-disable vue/no-unused-components */
export default {
  components: { CommentInput, CommentBody },

  methods: {
    ...mapGetters(['SITE_ONE']),
  },
};
</script>

<style scoped>

</style>
