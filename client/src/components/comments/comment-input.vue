<template>
  <div  class="ml-5 mr-5">
    <v-textarea
      label="Комментарий"
      v-model="text"
      rows="1"
      clearable
      />

    <!-- //<v-btn  @click="cancel">Cancel</v-btn> -->
  <div class="d-flex align-self-center">
       <v-btn  :disabled="!text" @click="send">Отправить</v-btn>
          <v-rating
      v-model="raiting"
      background-color="indigo lighten-3"
      color="yellow accent-4"
      dense
      half-increments
      hover
      size="25"
    ></v-rating>
  </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'comment-input',
  props: ['parentId'],
  data: () => ({
    text: '',
    raiting: 0,
  }),
  methods: {
    ...mapGetters(['SITE_ONE']),
    ...mapActions(['GET_SITE']),
    send() {
      const data = {
        touristSiteId: this.SITE_ONE().id,
        parentId: this.parentId,
        text: this.text,
        raiting: this.raiting,
      };

      this.$http.post('/api/comments', data);
      this.text = '';
      this.raiting = 0;
      setTimeout(() => {
        this.GET_SITE(this.SITE_ONE().id);
      }, 1000);
    },
  },
};
</script>

<style scoped>

</style>
