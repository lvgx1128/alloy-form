import Tips from '@/components/Tips'
import { useAction, useStore } from '@/hooks/context'
import { useUpdateLayoutEffect } from '@/hooks/useUpdateLayoutEffect'
import { getValuesByEvt, isHasInputTarget, validateRule } from '@/utils'
import classnames from 'classnames'
import { isArray, set } from 'lodash-es'
import React, { memo, useState } from 'react'
import type { FieldItemProps } from '../@types/index'

interface IProps {
  fieldItem: FieldItemProps
}

export default memo(
  function FieldItem({ fieldItem }: IProps) {
    const { format } = fieldItem
    const { components = {}, formData, ruleResult } = useStore()

    const {
      props = {},
      fieldKey,
      label,
      bordered,
      isRequired,
      options,
      bind,
      labelTips,
      labelTipProps
    } = fieldItem

    if (bordered) {
      props.variant = 'borderless'
    }
    if (options) {
      props.options = options
    }
    const { setData, watch, getFieldRules } = useAction()

    // useForm中 formData 中field数据
    const fieldData = formData?.[fieldKey]
    // 订阅field当前值 atomFamily
    const [val, setVal] = useState(fieldData)

    // field的校验规则
    const fieldRules = getFieldRules?.(fieldKey)
    // useForm中 表单验证结果
    const fieldResult = ruleResult?.[fieldKey]
    // 表单校验结果
    const [validateResult, setValidateResult] = useState<{
      isError?: boolean
      message?: string
    }>({})

    useUpdateLayoutEffect(() => {
      setVal(fieldData)
    }, [fieldData])

    useUpdateLayoutEffect(() => {
      setValidateResult(fieldResult)
    }, [fieldResult])

    // change事件
    function changeHandle(value: any) {
      setVal(value)
      const data: Record<string, any> = isArray(bind)
        ? value.reduce((prev: Record<string, any>, item: any, index: number) => {
            const key = bind[index]
            if (key) set(prev, key, item)
            return prev
          }, {})
        : { [fieldKey]: value }

      setData?.(data)
      if (watch && watch[fieldKey]) watch[fieldKey](value)
      if (watch && watch['#']) watch['#'](value, fieldKey)
      // 在form表单中失去change触发 表单校验
      const result = validateRule(fieldRules || [], value)
      if (validateResult.isError !== result.isError || validateResult.message !== result.message)
        setValidateResult(result)
    }

    const formItem = classnames(
      'alloy-form-item',
      { 'alloy-form-item-small': props?.size === 'small' },
      { 'alloy-form-item-border': bordered },
      { 'alloy-form-item-disabled': props?.disabled },
      { 'alloy-form-item-error-border': validateResult?.isError && bordered }
    )

    const FieldComponent: any = components[format?.replace(/( |^)[a-z]/g, (L) => L.toUpperCase())]

    return (
      <>
        {FieldComponent ? (
          <div className={formItem}>
            <div
              className={classnames('label-title', { required: isRequired })}
              style={{ width: fieldItem.labelWidth }}
            >
              <span>{label}</span>
              {labelTips || labelTipProps ? <Tips text={labelTips} {...labelTipProps} /> : null}
            </div>
            {validateResult?.isError && bordered ? (
              <div className="error-message"> {validateResult?.message} </div>
            ) : null}
            <div
              className={classnames('flex-full', {
                'alloy-form-item-error': validateResult?.isError && !bordered
              })}
            >
              {validateResult?.isError && !bordered ? (
                <div className="error-message"> {validateResult?.message} </div>
              ) : null}
              <FieldComponent
                className="w-full"
                {...props}
                value={val}
                onChange={(...args: any[]) => {
                  const currInputEvtIsSelf = (args: any[]) =>
                    isHasInputTarget(args[0]) && 'currentTarget' in args[0]
                      ? args[0]?.target === args[0]?.currentTarget
                      : true
                  const getValues = (args: any[]) => {
                    if (args[0]?.target) {
                      if (!isHasInputTarget(args[0])) return args
                    }
                    return getValuesByEvt(args)
                  }
                  if (!currInputEvtIsSelf(args)) return
                  const values = getValues(args)
                  const value = values[0]
                  changeHandle(value)
                }}
              />
            </div>
          </div>
        ) : null}
      </>
    )
  },
  (prevProps: IProps, nextProps: IProps) => {
    return prevProps === nextProps
  }
)
