---
order: 6
title: 表单校验

nav: 文档
group: 文档

filePath: null
---

同过 scheme 中`rules: RuleProps[]`字段实现表单定制化的校验，目前支持`必填` `正则` `自定义方法 `等校验方式

### `RuleProps字段解析`

| 字段                                    | 描述                                                  | 是否必填 | 类型                                    | 默认值 |
| --------------------------------------- | ----------------------------------------------------- | -------- | --------------------------------------- | ------ |
| <div style="width: 60pt">required</div> | 该字段是否为必填字段                                  | `否`     | `boolean`                               | `--`   |
| pattern                                 | 该字段校验的正则表达式                                | `否`     | `RegExp`                                | `--`   |
| validator                               | 该字段校验的方法入参是该组件的值，返回一个 boolean 值 | `否`     | `(val: Record<string, any>) => boolean` | `--`   |
| message                                 | 该字段校验失败的提示信息                              | `是`     | `string`                                | `--`   |

### 表单必填校验

```tsx
import React from 'react';
import { AlloyForm,  useForm } from 'alloy-form';
import { Input, Select, DatePicker } from 'antd'


const schema = {
  type: 'object',
  title: '表单必填校验',
  description: '表单必填校验',
  itemProps: {
    bordered: false,
    width: '500px',
  },
  properties: {
    select: {
      label: '下拉框',
      format: 'select',
      options: [
        { label: '下拉框1', value: 1 },
        { label: '下拉框2', value: 2 },
        { label: '下拉框3', value: 3 },
        { label: '下拉框4', value: 4 },
      ],
      rules: [{ required: true, message: '请选择下拉框' }],
      props: {
        placeholder: '请输选下拉框',
        allowClear: false,
      },
    },
    input: {
      label: '输入框',
      format: 'input',
      rules: [{ required: true, message: '输入框信息不可以为空' }],
      props: {
        placeholder: '请输入',
      },
    },
    datePicker: {
      label: '日期',
      format: 'datePicker',
      rules: [{ required: true, message: '请选择日期' }],
      props: {
        placeholder: '选择日期',
      },
    },
  },
};

function AlloyFormDemo(): JSX.Element {
  const form = useForm({ schema });
  function onSubmit() {
    form
      .validateFields()
      .then((res) => {
        console.log('res', res);
      })
      .catch((err) => {
        console.log('err', err);
      });
  }
  return (
    <>
      <AlloyForm form={form} components={{ Input, Select, DatePicker }} />
      <button onClick={() => onSubmit()}>提交数据</button>
    </>
  );
}

export default () => {
  return <AlloyFormDemo />;
};
```

### 表单正则校验
` 输入框信息必须是hello`

```tsx
import React from 'react';
import { AlloyForm,  useForm } from 'alloy-form';
import { Input, Select, DatePicker } from 'antd'

const schema = {
  type: 'object',
  title: '表单正则校验',
  description: '表单正则校验',
  itemProps: {
    bordered: false,
    width: '500px',
  },
  properties: {
    select: {
      label: '下拉框',
      format: 'select',
      options: [
        { label: '下拉框1', value: 1 },
        { label: '下拉框2', value: 2 },
        { label: '下拉框3', value: 3 },
        { label: '下拉框4', value: 4 },
      ],
      rules: [{ required: true, message: '请选择下拉框' }],
      props: {
        placeholder: '请输选下拉框',
        allowClear: true,
      },
    },
    input: {
      label: '输入框',
      format: 'input',
      rules: [
        { required: true, message: '输入框信息不可以为空' },
        { pattern: /hello/, message: '输入框信息必须是hello' },
      ],
      props: {
        placeholder: '请输入',
      },
    },
  },
};

function AlloyFormDemo(): JSX.Element {
  const form = useForm({ schema, data: { select: 2 } });
  function onSubmit() {
    form
      .validateFields()
      .then((res) => {
        console.log('res', res);
      })
      .catch((err) => {
        console.log('err', err);
      });
  }
  return (
    <>
      <AlloyForm form={form} components={{ Input, Select }} />
      <button onClick={() => onSubmit()}>提交数据</button>
    </>
  );
}

export default () => {
  return <AlloyFormDemo />;
};
```

### 表单自定方法校验

`只能选择下拉框2和下拉框3并且输入框信息必须包含abc`

```tsx
import React from 'react';
import { AlloyForm,  useForm } from 'alloy-form';
import { Input, Select, DatePicker } from 'antd'

const schema = {
  type: 'object',
  title: '表单自定方法校验',
  description: '表单自定方法校验',
  itemProps: {
    bordered: false,
    width: '500px',
  },
  properties: {
    select: {
      label: '下拉框',
      format: 'select',
      options: [
        { label: '下拉框1', value: 1 },
        { label: '下拉框2', value: 2 },
        { label: '下拉框3', value: 3 },
        { label: '下拉框4', value: 4 },
      ],
      rules: [
        { required: true, message: '请选择下拉框' },
        {
          validator: (val) => val === 2 || val === 3,
          message: '只能选择下拉框2和下拉框3',
        },
      ],
      props: {
        placeholder: '请输选下拉框',
        allowClear: true,
      },
    },
    input: {
      label: '输入框',
      format: 'input',
      rules: [
        { required: true, message: '输入框信息不可以为空' },
        {
          validator: (val) => val.indexOf('abc') >= 0,
          message: '输入框信息必须包含abc',
        },
      ],
      props: {
        placeholder: '请输入',
      },
    },
  },
};

function AlloyFormDemo(): JSX.Element {
  const form = useForm({ schema });
  function onSubmit() {
    form
      .validateFields()
      .then((res) => {
        console.log('res', res);
      })
      .catch((err) => {
        console.log('err', err);
      });
  }
  return (
    <>
      <AlloyForm form={form} components={{ Input, Select }} />
      <button onClick={() => onSubmit()}>提交数据</button>
    </>
  );
}

export default () => {
  return <AlloyFormDemo />;
};
```
