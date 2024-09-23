---
title: 查询条件
order: 8

nav: 文档
group: 文档

filePath: null
---

`表单联动是 特定表单数据`watch` 变量的变动而时时触发一个`callback`实现的 用于数据的监听的唤起回调 需要注意 `AlloyForm`组件并未限制在 watch 的 callback 里能写的内容 使用的时候需要注意 要是在 `callback`里写了任何对`formData`、`schema 的修改，只要对应的值修改就可能会陷入反复触发。所以请确保 watch 的逻辑符合真实联动使用逻辑

## formData 值的联动
`修改输入框 通过from示例setData方法修改订单编号联动的值`

```tsx
import React from 'react';
import { AlloyForm, useForm, AlloySearch } from 'alloy-form';
import { Input, Select } from 'antd'


const schema = {
  type: 'object',
  title: '输入框的联动',
  description: '输入框的联动',
  properties: {
    input: {
      label: '输入框',
      format: 'input',
      props: {
        placeholder: '请输入订单编号',
        type: 'string',
      },
    },
    inputCopy: {
      label: '联动输入框',
      format: 'input',
      props: {
        placeholder: '请输入订单编号',
        type: 'string',
      },
    },
    input1: {
      label: '输入框',
      format: 'input',
      props: {
        placeholder: '请输入订单编号',
        type: 'string',
      },
    },
    inputCopy1: {
      label: '联动输入框',
      format: 'input',
      props: {
        placeholder: '请输入订单编号',
        type: 'string',
      },
    },
    select: {
      label: '输入框',
      format: 'select',
      props: {
        placeholder: '请输入订单编号',
        type: 'string',
      },
    },
    select1: {
      label: '输入框',
      format: 'select',
      props: {
        placeholder: '请输入订单编号',
        type: 'string',
      },
    },
    selectCopy1: {
      label: '联动输入框',
      format: 'select',
      props: {
        placeholder: '请输入订单编号',
        type: 'string',
      },
    },
     selectCopy2: {
      label: '联动输入框',
      format: 'select',
      props: {
        placeholder: '请输入订单编号',
        type: 'string',
      },
    },
    inputCopy11: {
      label: '联动输入框',
      format: 'input',
      props: {
        placeholder: '请输入订单编号',
        type: 'string',
      },
    },
    input11: {
      label: '输入框',
      format: 'input',
      props: {
        placeholder: '请输入订单编号',
        type: 'string',
      },
    },
  },
};

export default function WatchFormDataDemo(): JSX.Element {
  const form = useForm({ schema });
  return <AlloySearch form={form} components={{ Input, Select }} style={{ padding: 24}} />;
}
```
