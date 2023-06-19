<template>
  <LoginFormTitle v-show="getShow" class="enter-x" />
  <Form
    class="p-4 enter-x"
    :model="formData"
    :rules="getFormRules"
    ref="formRef"
    v-show="getShow"
    @keypress.enter="handleLogin"
  >
    <FormItem name="account" class="enter-x">
      <Input
        size="large"
        v-model:value="formData.account"
        :placeholder="t('sys.login.userName')"
        class="fix-auto-fill"
      >
        <template #prefix>
          <UserOutlined />
        </template>
      </Input>
    </FormItem>
    <FormItem name="password" class="enter-x">
      <InputPassword
        size="large"
        visibilityToggle
        v-model:value="formData.password"
        :placeholder="t('sys.login.password')"
      >
        <template #prefix>
          <LockOutlined  />
        </template>
      </InputPassword>
    </FormItem>
    <FormItem name="captcha" class="enter-x">
      <ARow :gutter="8">
        <ACol :span="16">
          <Input
            size="large"
            v-model:value="formData.captcha"
            placeholder="验证码"
            class="fix-auto-fill"
            style="min-width: 100%"
          />
        </ACol>
        <ACol :span="8">
          <AImage :preview="false" :width="100" :src="captchaImg" @click="handleRefreshCode" />
        </ACol>
      </ARow>
    </FormItem>

    <ARow class="enter-x">
      <ACol :span="12">
        <FormItem>
          <!-- No logic, you need to deal with it yourself -->
          <Checkbox v-model:checked="rememberMe" size="small">
            {{ t('sys.login.rememberMe') }}
          </Checkbox>
        </FormItem>
      </ACol>
      <ACol :span="12">
        <FormItem :style="{ 'text-align': 'right' }">
          <!-- No logic, you need to deal with it yourself -->
          <!-- <Button type="link" size="small" @click="setLoginState(LoginStateEnum.RESET_PASSWORD)">
            {{ t('sys.login.forgetPassword') }}
          </Button> -->
        </FormItem>
      </ACol>
    </ARow>

    <FormItem class="enter-x">
      <Button type="primary" size="large" block @click="handleLogin" :loading="loading">
        {{ t('sys.login.loginButton') }}
      </Button>
      <!-- <Button size="large" class="mt-4 enter-x" block @click="handleRegister">
        {{ t('sys.login.registerButton') }}
      </Button> -->
    </FormItem>
    <!-- <ARow class="enter-x">
      <ACol :md="8" :xs="24">
        <Button block @click="setLoginState(LoginStateEnum.MOBILE)">
          {{ t('sys.login.mobileSignInFormTitle') }}
        </Button>
      </ACol>
      <ACol :md="8" :xs="24" class="!my-2 !md:my-0 xs:mx-0 md:mx-2">
        <Button block @click="setLoginState(LoginStateEnum.QR_CODE)">
          {{ t('sys.login.qrSignInFormTitle') }}
        </Button>
      </ACol>
      <ACol :md="6" :xs="24">
        <Button block @click="setLoginState(LoginStateEnum.REGISTER)">
          {{ t('sys.login.registerButton') }}
        </Button>
      </ACol>
    </ARow> -->

    <!-- <Divider class="enter-x">{{ t('sys.login.otherSignIn') }}</Divider>

    <div class="flex justify-evenly enter-x" :class="`${prefixCls}-sign-in-way`">
      <GithubFilled />
      <WechatFilled />
      <AlipayCircleFilled />
      <GoogleCircleFilled />
      <TwitterCircleFilled />
    </div> -->
  </Form>
</template>
<script lang="ts" setup>
  import { reactive, ref, unref, computed } from 'vue';
  import { Checkbox, Form, Input, Row, Col, Button, Image } from 'ant-design-vue';
  import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
  import LoginFormTitle from './LoginFormTitle.vue';

  import { useI18n } from '/@/hooks/web/useI18n';
  import { useMessage } from '/@/hooks/web/useMessage';

  import { useUserStore } from '/@/store/modules/user';
  import { LoginStateEnum, useLoginState, useFormRules, useFormValid } from './useLogin';
  import dayjs from 'dayjs';
  import { useGlobSetting } from '/@/hooks/setting';
  import { cacheCipher } from '/@/settings/encryptionSetting';
  import { AesEncryption } from '/@/utils/cipher';

  const ACol = Col;
  const ARow = Row;
  const FormItem = Form.Item;
  const InputPassword = Input.Password;
  const AImage = Image;
  const { t } = useI18n();
  const { notification } = useMessage();
  // const { prefixCls } = useDesign('login');
  const userStore = useUserStore();

  const { getLoginState } = useLoginState();
  const { getFormRules } = useFormRules();

  const formRef = ref();
  const loading = ref(false);
  const rememberMe = ref(false);
  const formData = reactive({
    account: '',
    password: '',
    captcha: '',
    captchaId: dayjs().unix().toString(),
  });
  const { validForm } = useFormValid(formRef);
  //onKeyStroke('Enter', handleLogin);
  const getShow = computed(() => unref(getLoginState) === LoginStateEnum.LOGIN);

  const encryption = new AesEncryption({ key: cacheCipher.key, iv: cacheCipher.iv });
  async function handleLogin() {
    const data = await validForm();
    if (!data) return;
    try {
      loading.value = true;
      const userInfo = await userStore
        .login({
          password: encryption.encryptByAES(data.password),
          username: data.account,
          captcha: data.captcha,
          captchaId: formData.captchaId,
          mode: 'none', //不要默认的错误提示
        })
        .catch(() => {
          handleRefreshCode();
        });
      if (userInfo) {
        notification.success({
          message: t('sys.login.loginSuccessTitle'),
          description: `${t('sys.login.loginSuccessDesc')}: ${userInfo.realName}`,
          duration: 3,
        });
      }
    } catch (error) {
      // createErrorModal({
      //   title: t('sys.api.errorTip'),
      //   content: (error as unknown as Error).message || t('sys.api.networkExceptionMsg'),
      //   getContainer: () => document.body.querySelector(`.${prefixCls}`) || document.body,
      // });
    } finally {
      loading.value = false;
    }
  }

  const globSetting = useGlobSetting();
  const captchaImg = ref(
    `${globSetting.apiUrl}/api/workshop/vben/VbenUser/${formData.captchaId}/Captcha`,
  );
  function handleRefreshCode() {
    formData.captchaId = dayjs().unix().toString();
    captchaImg.value = `${globSetting.apiUrl}/api/workshop/vben/VbenUser/${formData.captchaId}/Captcha`;
  }
</script>
