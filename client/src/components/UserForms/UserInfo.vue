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
          ><v-icon>mdi-account-box</v-icon></v-btn>
        </template>
        <template v-slot:default="dialog">
          <v-card class="px-4">
                            <v-card-text>
                                <v-form ref="registerForm" v-model="valid" lazy-validation>
                                    <v-row>
                                        <v-col cols="12" >
                                            <v-avatar :size="200">
                                          <img v-if="USER().users_info.avatar"
                                           :src="USER().users_info.avatar"/>
                                          <v-icon v-else>mdi-account</v-icon>
                                        </v-avatar>
                                        <v-file-input
                                          @change="upldAvater"
                                          accept="image/*"
                                          label="Загрузка Аватарки"
                                        ></v-file-input>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="6">
                                            <v-text-field v-model="USER().users_info.name"
                                             :rules="[rules.required]" label="Имя"
                                              maxlength="20" required></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="6">
                                            <v-text-field v-model="USER().users_info.surname"
                                             :rules="[rules.required]" label="Фамилия"
                                             maxlength="20" required></v-text-field>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-text-field v-model="USER().mail"
                                            :rules="emailRules"
                                            label=" Почта" required></v-text-field>
                                        </v-col>

                                        <v-col class="d-flex" style="max-width: 400px;" >
                                               <v-btn
                                               x-large block
                                              text
                                              @click="dialog.value = false"
                                            >Close</v-btn>
                                            <v-btn x-large block
                                            :disabled="!valid"
                                            color="success"
                                            @click="saveUser">Сохранить</v-btn>
                                        </v-col>
                                    </v-row>
                                </v-form>
                            </v-card-text>
                        </v-card>

        </template>
  </v-dialog>

</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
      dialog: false,
      fileInfo: null,

      tab: 0,
      tabs: [
        { name: 'Вход', icon: 'mdi-account' },
        { name: 'Регистрация', icon: 'mdi-account-outline' },
      ],
      valid: true,
      validLogin: false,
      validRegister: false,
      registerForm: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        verify: '',
      },
      loginForm: {
        password: '',
        email: '',
      },
      loginEmailRules: [
        (v) => !!v || 'Введите почту',
        (v) => /.+@.+\..+/.test(v) || 'Неправильный формат E-mail',
      ],
      emailRules: [
        (v) => !!v || 'Введите почту',
        (v) => /.+@.+\..+/.test(v) || 'Неправильный формат E-mail',
      ],

      show1: false,
      rules: {
        required: (value) => !!value || 'Введите пароль.',
        min: (v) => (v && v.length >= 8) || 'Мин. 8 символов',
      },
    };
  },
  methods: {
    ...mapGetters(['SITE_ONE', 'USER', 'USERID']),
    ...mapActions(['GET_USER']),
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
    saveUser() {
      this.$http.put('/api/users/', this.USER());
    },
    upldAvater(e) {
      if (e) {
        const formData = new FormData();
        formData.append('avatar', e);
        this.$http.post('/api/users/avatar/', formData);
      }
    },
  },
  computed: {
    passwordMatch() {
      return () => this.registerForm.password === this.registerForm.verify || 'Пароли должны совпадать';
    },
  },
  created() {
    this.GET_USER(this.USERID());
  },
};
</script>
