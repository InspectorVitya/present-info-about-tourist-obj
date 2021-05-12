<template>
  <v-dialog v-model="dialogLogin" persistent max-width="600px" min-width="360px">
            <div>
                <v-tabs v-model="tab" show-arrows background-color="deep-purple accent-4"
                 icons-and-text dark grow>
                    <v-tabs-slider color="purple darken-4"></v-tabs-slider>
                    <v-tab v-for="i in tabs" :key="i.name">
                        <v-icon large>{{ i.icon }}</v-icon>
                        <div class="caption py-1">{{ i.name }}</div>
                    </v-tab>
                    <v-btn
                      icon
                      dark
                      @click="$emit('closeLogin')"
                    >
                      <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-tab-item>
                        <v-card class="px-4">
                            <v-card-text>
                                <v-form ref="loginForm" v-model="valid" lazy-validation>
                                    <v-row>
                                        <v-col cols="12">
                                            <v-text-field v-model="loginForm.email"
                                             :rules="loginEmailRules"
                                             label="Почта" required></v-text-field>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-text-field v-model="loginForm.password"
                                            :append-icon="show1?'eye':'eye-off'"
                                            :rules="[rules.required, rules.min]"
                                            :type="show1 ? 'text' : 'password'"
                                            name="input-10-1" label="Пароль"
                                            hint="Минимум 8 символов" counter
                                            @click:append="show1 = !show1"></v-text-field>
                                        </v-col>
                                        <v-col class="d-flex" cols="12" sm="6" xsm="12">
                                          <span style="color: red" v-if="validLogin">
                                            Неправильные данные</span>
                                        </v-col>
                                        <v-spacer></v-spacer>
                                        <v-col class="d-flex" cols="12" sm="3" xsm="12" align-end>
                                            <v-btn x-large block :disabled="!valid"
                                            color="success" @click="login"> Вход </v-btn>
                                        </v-col>
                                    </v-row>
                                </v-form>
                            </v-card-text>
                        </v-card>
                    </v-tab-item>
                    <v-tab-item>
                        <v-card class="px-4">
                            <v-card-text>
                                <v-form ref="registerForm" v-model="valid" lazy-validation>
                                    <v-row>
                                        <v-col cols="12" sm="6" md="6">
                                            <v-text-field v-model="registerForm.firstName"
                                             :rules="[rules.required]" label="Имя"
                                              maxlength="20" required></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="6">
                                            <v-text-field v-model="registerForm.lastName"
                                             :rules="[rules.required]" label="Фамилия"
                                             maxlength="20" required></v-text-field>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-text-field v-model="registerForm.email"
                                            :rules="emailRules"
                                            label=" Почта" required></v-text-field>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-text-field v-model="registerForm.password"
                                             :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                             :rules="[rules.required, rules.min]"
                                             :type="show1 ? 'text' : 'password'"
                                             name="input-10-1" label="Пароль"
                                             hint="Минимум 8 символов" counter
                                             @click:append="show1 = !show1"></v-text-field>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-text-field block v-model="registerForm.verify"
                                            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                            :rules="[rules.required, passwordMatch]"
                                            :type="show1 ? 'text' : 'password'"
                                            name="input-10-1" label="Подтвердить Пароль"
                                            counter @click:append="show1 = !show1"></v-text-field>
                                        </v-col>
                                          <v-col class="d-flex" cols="12" sm="6" xsm="12">
                                          <span style="color: red" v-if="validRegister">
                                            Почта занята</span>
                                        </v-col>
                                        <v-spacer></v-spacer>
                                        <v-col class="d-flex ml-auto" cols="12" sm="5" xsm="12">
                                            <v-btn x-large block
                                            :disabled="!valid"
                                            color="success"
                                            @click="register">Регистрация</v-btn>
                                        </v-col>
                                    </v-row>
                                </v-form>
                            </v-card-text>
                        </v-card>
                    </v-tab-item>
                </v-tabs>
            </div>
        </v-dialog>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Login',
  props: ['dialogLogin'],
  data: () => ({

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
  }),
  methods: {
    ...mapActions([
      'POST_LOGIN',
      'POST_REGISTER',
    ]),
    login() {
      console.log(this.loginForm);
      if (this.$refs.loginForm.validate()) {
        this.POST_LOGIN(this.loginForm).then(() => {
          this.$emit('closeLogin');
          this.reset();
          this.resetValidation();
        }).catch(() => {
          this.validLogin = true;
        });
      }
    },
    register() {
      if (this.$refs.registerForm.validate()) {
        this.POST_REGISTER(this.registerForm).then(() => {
          this.tab = 0;
          this.reset();
          this.resetValidation();
        }).catch(() => {
          this.validRegister = true;
        });
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
  },
  computed: {
    passwordMatch() {
      return () => this.registerForm.password === this.registerForm.verify || 'Пароли должны совпадать';
    },
  },
};
</script>
