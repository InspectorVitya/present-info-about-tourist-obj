<template>
  <v-dialog
        transition="dialog-bottom-transition"
        max-width="800"
        @click:outside="test"
        persistent
        v-model="dialogSites"
      >
          <v-card>
            <v-toolbar
              dark
              class="text-h6">
           {{this.SITE_ONE().name}}
            <div class="d-flex align-center">
              <Photo />
              <Edit :siteId='SITE_ONE().id'/>
              <div class="ml-2"><Delete @closeDialog="test" /></div>
            </div>
           </v-toolbar>
            <v-carousel
            height="400"
            cycle
            >
              <v-carousel-item
                v-for="(item,i) in this.SITE_ONE().photos"
                :key="i"
              >
              <v-img
                :src="item.url"
                height="400"
                contain
            ></v-img>
              </v-carousel-item>
            </v-carousel>
            <div style="height: 25px;">
              <div class="float-left">
                    adasda
              </div>
              <div class="float-right">
                    <div class="d-flex">
                      <div class="">
                           Рейтинг
                    <span class=" text--lighten-2 caption mr-2">
                      <span v-text="SITE_ONE().avgrating.raiting"></span>
                      (<span v-text="SITE_ONE().avgrating.count "></span>)
                    </span>
                      </div>
                       <div class="">
                          <v-rating
                      v-model="SITE_ONE().avgrating.raiting"
                      background-color="indigo lighten-3"
                      color="yellow accent-4"
                      dense
                      readonly
                      half-increments
                      hover
                      size="18"
                    ></v-rating>
                       </div>
                      </div>
              </div>
            </div>
            <v-card-text>
              <div class="text-justify text--primary
              subtitle-1 pa-2" v-html="this.SITE_ONE().description"></div>
              <div class="text-justify text--primary
              subtitle-1 pa-2" v-html="this.SITE_ONE().operating_hours"></div>
              <div class="text-justify text--primary
              subtitle-1 pa-2" v-html="this.SITE_ONE().operating_hours_date"></div>
              <div class="text-justify text--primary
              subtitle-1 pa-2" v-html="this.SITE_ONE().tickets"></div>
            </v-card-text>
            <comment />
            <v-card-actions class="justify-end">
              <v-btn
                text
                @click="test"
              >Close</v-btn>
            </v-card-actions>
          </v-card>
      </v-dialog>

</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import comment from './comments/comment.vue';
import Photo from './DialogPhoto.vue';
import Edit from './EditDialog.vue';
import Delete from './DeleteSite.vue';

export default ({
  props: ['dialogSites', 'siteId'],
  components: {
    comment,
    Photo,
    Edit,
    Delete,
  },
  data: () => ({
    rating: 4.3,
    items: [
      {
        src: 'https://sun9-9.userapi.com/impf/c850632/v850632431/1925d5/ARTOX8nTcvo.jpg?size=720x1080&quality=96&sign=720934e4fac65e89c22b29e09b2e97cc&type=album',
      },
      {
        src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
      },
      {
        src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
      },
      {
        src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
      },
    ],
  }),
  methods: {
    ...mapActions(['GET_SITE']),
    ...mapGetters(['SITE_ONE']),
    test() {
      this.$emit('closeSites');
    },
    raitingUpd(e) {
      console.log(e);
      console.log('object');
    },
  },
  watch: {
    async siteId(id, oldId) {
      if (id !== oldId) {
        await this.GET_SITE(id);
        console.log(this.SITE_ONE());
      }
    },
  },
});
</script>
