import type { ActionProps, FieldItemProps, StoreProps } from '@/@types'
import { useAction, useStore } from '@/hooks/context'
import classnames from 'classnames'
import elementResizeEvent from 'element-resize-event'
import React, { useEffect, useState } from 'react'
import FieldItem from './FieldItem'

type IFieldItemProps = FieldItemProps & { isOverstep?: boolean }

const widthForSeat: { width: [number, number]; oneLineSeat: number }[] = [
  {
    width: [0, 1200],
    oneLineSeat: 3
  },
  {
    width: [1240, 1450],
    oneLineSeat: 4
  },
  {
    width: [1450, 1720],
    oneLineSeat: 5
  },
  {
    width: [1720, 100_000],
    oneLineSeat: 6
  }
]
export default function FieldRender({
  className,
  style,
  padding,
  onSearch,
  onReset
}: {
  className?: string
  style?: React.CSSProperties
  padding?: [number?, number?, number?, number?]
  onSearch?: (value: Record<string, any>) => void
  onReset?: () => void
}): JSX.Element {
  const { schema } = useStore() as StoreProps
  const { getData, clearData } = useAction() as ActionProps
  // 展示位置个数
  const [lineCount, setLineCount] = useState<number>(4)
  // 查询表展开状态
  const [searchStatus, setSearchStatus] = useState<'collapse' | 'expand'>('collapse')
  const searchFormBox = React.useRef<HTMLDivElement>(null)
  function getOneLineSeat(width: number) {
    const oneLineSeat =
      widthForSeat.find(
        (item: { width: [number, number]; oneLineSeat: number }) =>
          item.width[0] < width && width < item.width[1]
      )?.oneLineSeat ?? 4
    return oneLineSeat
  }
  useEffect(() => {
    const oneLineSeat = getOneLineSeat(searchFormBox.current?.clientWidth ?? 1)
    if (oneLineSeat !== lineCount) setLineCount(oneLineSeat)
    if (searchFormBox.current) {
      elementResizeEvent(searchFormBox.current, () => {
        const oneLineSeat = getOneLineSeat(searchFormBox.current?.clientWidth ?? 1)
        if (oneLineSeat !== lineCount) setLineCount(oneLineSeat)
      })
    }
  }, [lineCount])
  const flatten = schema?.properties ?? {}
  // 表单item上绑定的属性
  const itemProps = { bordered: true, display: 'inline', ...(schema?.itemProps ?? {}) }
  const display = itemProps?.display || 'block'

  // 解析schema
  const fieldList = Object.keys(flatten).reduce((prev: IFieldItemProps[], item: string) => {
    const baseProps = itemProps?.props || {}
    const fieldItem: IFieldItemProps = {
      ...itemProps,
      ...flatten[item],
      fieldKey: item
    }
    if (fieldItem?.props) {
      fieldItem.props = { ...fieldItem?.props, ...baseProps }
    }
    if (!fieldItem.hide) prev.push(fieldItem)
    return prev
  }, [])
  // 剩余位置
  let residSeat = lineCount * 2 - 1
  let seatCount = 0
  fieldList.forEach((item: any, index: number) => {
    // 计算当前组件占位置多少 根据className来判断
    const currSeat =
      index === lineCount - 1 && item.className === 'x2' ? 3 : item.className === 'x2' ? 2 : 1
    residSeat -= currSeat
    seatCount += currSeat
    // 超出查询范围 样式隐藏
    item.isOverstep = residSeat < 0 && searchStatus === 'collapse'
  })
  // eslint-disable-next-line no-param-reassign
  const paddingStyle = padding?.reduce((acc, item) => (acc += `${item}px `), '')
  return (
    <div
      className={classnames(
        'alloy-form-container alloy-search-container relative',
        `line-${lineCount}-seat`,
        `form-line-${seatCount > lineCount - 1 ? 2 : 1}`,
        className
      )}
      style={style}
      ref={searchFormBox}
    >
      <div
        style={{ padding: paddingStyle }}
        className={classnames('alloy-search-form', { expand: searchStatus === 'expand' })}
      >
        {fieldList.map((item: IFieldItemProps) => {
          return (
            <div
              key={item.fieldKey}
              style={{ width: item.width, display: item.isOverstep ? 'none' : 'inline-block' }}
              className={classnames(
                'alloy-form-item-box',
                {
                  'alloy-form-item-textarea':
                    item.format === 'textarea' || item.format === 'Textarea'
                },
                item.className,
                `alloy-form-${item?.display || display}`
              )}
            >
              {item && <FieldItem fieldItem={item} key={item.fieldKey} />}
            </div>
          )
        })}
        <div className="alloy-search-button">
          <div
            className="alloy-button primary"
            onClick={() => {
              const formData = getData?.() || {}
              onSearch?.(formData)
            }}
          >
            查询
          </div>
          <div
            className="alloy-button"
            onClick={() => {
              clearData?.()
              onReset?.()
            }}
          >
            重置
          </div>
          {seatCount > lineCount * 2 - 1 ? (
            <div
              className="alloy-button"
              onClick={() => setSearchStatus(searchStatus === 'collapse' ? 'expand' : 'collapse')}
            >
              {searchStatus === 'collapse' ? '展开' : '收起'}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
