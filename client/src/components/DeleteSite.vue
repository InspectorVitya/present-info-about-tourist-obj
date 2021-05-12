<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="290"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          icon
          v-bind="attrs"
          v-on="on"
        >
        <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="headline">
          Удалить объект?
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="dialog = false"
          >
            Нет
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            @click="del"
          >
            Да
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    ...mapGetters(['SITE_ONE']),
    ...mapActions(['GET_SITES']),
    del() {
      const { id } = this.SITE_ONE();
      this.$http.delete('/api/sites/', {
        data: {
          id,
        },
      });
      this.dialog = false;
      this.$emit('closeDialog');
      setTimeout(() => {
        this.GET_SITES();
      }, 1000);
    },
  },
};
</script>
