<template>
   <v-row justify="center">
    <v-dialog
      v-model="dialogNewMarker"
      persistent
      max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="headline">Новый объект</span>
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
            <v-col cols="12">
              <v-file-input
                counter
                multiple
                accept="image/*"
                label="Загрузка фотографий"
                show-size
                v-model="fileInfo"
                truncate-length="15"
                ></v-file-input>
            </v-col>
            </v-row>
          </v-form>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="closeDialog"
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
    </v-dialog>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: ['dialogNewMarker'],
  data: () => ({
    fileInfo: null,
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
    ]),
    closeDialog() {
      this.$refs.formNew.reset();
      this.$emit('closeNewMarker');
    },
    test() {
      const formData = new FormData();
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < this.fileInfo.length; i++) {
        formData.append(
          `photo${i}`,
          this.fileInfo[i],
        );
      }
      this.form.latlng = this.GET_NewMarkerCoords();
      formData.append('data', JSON.stringify(this.form));

      this.$http.post('/api/sites', formData);
      this.$refs.formNew.reset();
      // this.closeDialog();
    },
  },
  beforeUpdate() {
    if (this.GET_NewMarkerCoords().length === 2) {
      this.$http.get(`https://geocode-maps.yandex.ru/1.x/?apikey=d484d788-1d9f-4ff7-865e-c8b9854c046c&format=json&geocode=${this.GET_NewMarkerCoords()[1]},${this.GET_NewMarkerCoords()[0]}`)
        .then((res) => {
          // eslint-disable-next-line max-len
          this.form.address = res.data.response.GeoObjectCollection.featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData.Address.formatted;
        });
    }
  },
};
</script>
