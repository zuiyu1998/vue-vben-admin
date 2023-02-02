<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import {
    createUser,
    updateUser,
    getDeptList,
    isAccountExist,
    getAllRoleList,
  } from '/@/api/fine/system';
  import { FormSchema } from '/@/components/Table';

  export default defineComponent({
    name: 'AccountModal',
    components: { BasicModal, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const rowId = ref('');

      const accountFormSchema: FormSchema[] = [
        {
          field: 'userName',
          label: '用户名',
          component: 'Input',
          helpMessage: ['不能输入带有admin的用户名'],
          rules: [
            {
              required: true,
              message: '请输入用户名',
              trigger: 'blur',
            },
            {
              validator(_, value) {
                return new Promise((resolve, reject) => {
                  isAccountExist(rowId.value, value)
                    .then(() => resolve())
                    .catch((err) => {
                      const msg = err.response?.data?.error?.message || err.message;
                      reject(msg || '验证失败');
                    });
                });
              },
              trigger: 'blur',
            },
          ],
        },
        {
          field: 'password',
          label: '密码',
          component: 'InputPassword',
          required: true,
          ifShow: true,
        },
        {
          label: '角色',
          field: 'roleId',
          component: 'ApiSelect',
          componentProps: {
            api: getAllRoleList,
            labelField: 'roleName',
            valueField: 'id',
            params: { status: true },
            // valueField: 'roleValue',
          },
          required: true,
        },
        {
          field: 'deptId',
          label: '所属部门',
          component: 'TreeSelect',
          componentProps: {
            fieldNames: {
              label: 'deptName',
              key: 'id',
              value: 'id',
            },
            getPopupContainer: () => document.body,
          },
          required: true,
        },
        {
          field: 'realName',
          label: '真实姓名',
          component: 'Input',
          required: true,
        },

        {
          label: '邮箱',
          field: 'email',
          component: 'Input',
          // required: true,
        },
        {
          label: '手机号码',
          field: 'phone',
          component: 'Input',
          // required: true,
        },
        {
          label: '备注',
          field: 'introduction',
          component: 'InputTextArea',
        },
      ];

      const [registerForm, { setFieldsValue, updateSchema, resetFields, validate }] = useForm({
        labelWidth: 100,
        baseColProps: { span: 24 },
        schemas: accountFormSchema,
        showActionButtonGroup: false,
        actionColOptions: {
          span: 23,
        },
      });

      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        resetFields();
        setModalProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;

        if (unref(isUpdate)) {
          rowId.value = data.record.id;
          setFieldsValue({
            ...data.record,
          });
        } else {
          rowId.value = '';
        }

        const treeData = await getDeptList({ status: true });
        updateSchema([
          {
            field: 'password',
            show: !unref(isUpdate),
          },
          {
            field: 'deptId',
            componentProps: { treeData },
          },
        ]);
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增账号' : '编辑账号'));

      async function handleSubmit() {
        try {
          const values = await validate();
          setModalProps({ confirmLoading: true });
          // TODO custom api
          if (unref(isUpdate)) {
            const newParms = Object.assign({}, values, { id: rowId.value });
            updateUser(newParms).then(() => {
              closeModal();
              emit('success', {
                isUpdate: unref(isUpdate),
                values: { ...values, id: rowId.value },
              });
            });
          } else {
            createUser(values).then(() => {
              closeModal();
              emit('success', {
                isUpdate: unref(isUpdate),
                values: { ...values, id: rowId.value },
              });
            });
          }

          // emit('success', { isUpdate: unref(isUpdate), values: { ...values, id: rowId.value } });
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }

      return { registerModal, registerForm, getTitle, handleSubmit };
    },
  });
</script>
