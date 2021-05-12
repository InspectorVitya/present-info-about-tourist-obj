<template>
   <v-dialog
        transition="dialog-bottom-transition"
        max-width="900"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
          ><v-icon>mdi-plus-box-multiple</v-icon></v-btn>
        </template>
        <template v-slot:default="dialog">
          <v-card>
            <v-toolbar
              color="primary"
              dark
            >Загрузка фотографий</v-toolbar>
            <v-file-input
                class="ml-2 mr-2"
                counter
                multiple
                accept="image/*"
                label="Загрузка фотографий"
                show-size
                v-model="fileInfo"
                truncate-length="15"
                ></v-file-input>
            <v-card-actions class="justify-end">
              <v-btn
                text
                @click="dialog.value = false"
              >Close</v-btn>
              <v-btn
                text
                @click="test"
              >Отправить</v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>

</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      dialog: false,
      fileInfo: null,
    };
  },
  methods: {
    ...mapGetters(['SITE_ONE']),
    test() {
      const formData = new FormData();
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < this.fileInfo.length; i++) {
        formData.append(
          `photo${i}`,
          this.fileInfo[i],
        );
      }
      formData.append('data', this.SITE_ONE().id);

      this.$http.post('/api/sites/photos', formData);
      // this.closeDialog();
    },
  },
};
</script>
