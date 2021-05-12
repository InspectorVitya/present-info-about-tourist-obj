<template>
   <v-row justify="center">
    <v-dialog
      persistent
      max-width="600px"
    >
        <template v-slot:activator="{ on, attrs }">
      <v-btn
        icon
        v-bind="attrs"
        v-on="on"
      ><v-icon>mdi-file-edit-outline</v-icon></v-btn>
    </template>
    <template v-slot:default="dialog">
      <v-card>
        <v-card-title>
          <span class="headline">Редактирование</span>
        </v-card-title>
        <v-card-text>
          <v-form ref='formNew'>
            <v-row>
              <v-col
                cols="12"
              >
                <v-text-field
                  label="Название"
                  required
                  v-model="form.name"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"

              >
                <v-text-field
                  label="Адрес(Исправьте если неправильно)"
                  hint="example of helper text only on focus"
                  v-model="form.address"
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                 <v-textarea
                  clear-icon="mdi-close-circle"
                  label="Рабочие часы"
                  rows="2"
                  v-model="form.operating_hours"
                  required
                ></v-textarea>
              </v-col>
              <v-col cols="12">
                 <v-textarea
                  clear-icon="mdi-close-circle"
                  label="Рабочие дни"
                  rows="2"
                  required
                  v-model="form.operating_hours_date"
                ></v-textarea>
              </v-col>
               <v-col cols="12">
                 <v-textarea
                  clear-icon="mdi-close-circle"
                  label="Стоимость входа"
                  rows="2"
                  v-model="form.tickets"
                  required
                ></v-textarea>
              </v-col>
              <v-col cols="12">
                <span>Категории:</span>
              </v-col>
              <v-col
              cols="12"
              >
              <v-card
                class="d-flex flex-wrap"
                flat
                tile
              >
              <v-radio-group v-model="form.categories" row>
      <v-radio
        v-for="cat in CATEGORY()"
        :key = "cat.id"
        :label="cat.category"
        :value="cat.id"
         color="indigo"
      ></v-radio>
    </v-radio-group>

              </v-card>

            </v-col>
              <v-col cols="12">
                 <v-textarea
                  clear-icon="mdi-close-circle"
                  label="Описание"
                  v-model="form.description"
                ></v-textarea>
            </v-col>

            </v-row>
          </v-form>

        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog.value = false"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="test"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </template>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: ['siteId'],
  data: () => ({
    fileInfo: [],
    form: {
      name: null,
      address: null,
      latlng: null,
      operating_hours: null,
      operating_hours_date: null,
      tickets: null,
      description: null,
      categories: [],
    },
  }),
  methods: {
    ...mapGetters([
      'CATEGORY',
      'GET_NewMarkerCoords',
      'SITE_ONE',
    ]),

    test() {
      const formData = new FormData();
      if (this.fileInfo.length > 0) {
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < this.fileInfo.length; i++) {
          formData.append(
            `photo${i}`,
            this.fileInfo[i],
          );
        }
      }
      formData.append('data', JSON.stringify(this.form));
      console.log(this.form);
      this.$http.put('/api/sites', formData);
      // this.closeDialog();
    },
  },
  watch: {
    async siteId(id, oldId) {
      if (id !== oldId) {
        this.form = this.SITE_ONE();
      }
    },
  },
  created() {
    this.form = this.SITE_ONE();
  },
};
</script>
