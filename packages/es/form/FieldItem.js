function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
import Tips from "../components/Tips";
import { useAction, useStore } from "../hooks/context";
import { useUpdateLayoutEffect } from "../hooks/useUpdateLayoutEffect";
import { getValuesByEvt, isHasInputTarget, validateRule } from "../utils";
import classnames from 'classnames';
import { isArray, set } from 'lodash-es';
import React, { memo, useState } from 'react';
export default /*#__PURE__*/memo(function FieldItem(_ref) {
  var fieldItem = _ref.fieldItem;
  var format = fieldItem.format;
  var _useStore = useStore(),
    _useStore$components = _useStore.components,
    components = _useStore$components === void 0 ? {} : _useStore$components,
    formData = _useStore.formData,
    ruleResult = _useStore.ruleResult;
  var _fieldItem$props = fieldItem.props,
    props = _fieldItem$props === void 0 ? {} : _fieldItem$props,
    fieldKey = fieldItem.fieldKey,
    label = fieldItem.label,
    bordered = fieldItem.bordered,
    isRequired = fieldItem.isRequired,
    options = fieldItem.options,
    bind = fieldItem.bind,
    labelTips = fieldItem.labelTips,
    labelTipProps = fieldItem.labelTipProps;
  if (bordered) {
    props.variant = 'borderless';
  }
  if (options) {
    props.options = options;
  }
  var _useAction = useAction(),
    setData = _useAction.setData,
    watch = _useAction.watch,
    getFieldRules = _useAction.getFieldRules;

  // useForm中 formData 中field数据
  var fieldData = formData === null || formData === void 0 ? void 0 : formData[fieldKey];
  // 订阅field当前值 atomFamily
  var _useState = useState(fieldData),
    _useState2 = _slicedToArray(_useState, 2),
    val = _useState2[0],
    setVal = _useState2[1];

  // field的校验规则
  var fieldRules = getFieldRules === null || getFieldRules === void 0 ? void 0 : getFieldRules(fieldKey);
  // useForm中 表单验证结果
  var fieldResult = ruleResult === null || ruleResult === void 0 ? void 0 : ruleResult[fieldKey];
  // 表单校验结果
  var _useState3 = useState({}),
    _useState4 = _slicedToArray(_useState3, 2),
    validateResult = _useState4[0],
    setValidateResult = _useState4[1];
  useUpdateLayoutEffect(function () {
    setVal(fieldData);
  }, [fieldData]);
  useUpdateLayoutEffect(function () {
    setValidateResult(fieldResult);
  }, [fieldResult]);

  // change事件
  function changeHandle(value) {
    setVal(value);
    var data = isArray(bind) ? value.reduce(function (prev, item, index) {
      var key = bind[index];
      if (key) set(prev, key, item);
      return prev;
    }, {}) : _defineProperty({}, fieldKey, value);
    setData === null || setData === void 0 ? void 0 : setData(data);
    if (watch && watch[fieldKey]) watch[fieldKey](value);
    if (watch && watch['#']) watch['#'](value, fieldKey);
    // 在form表单中失去change触发 表单校验
    var result = validateRule(fieldRules || [], value);
    if (validateResult.isError !== result.isError || validateResult.message !== result.message) setValidateResult(result);
  }
  var formItem = classnames('alloy-form-item', {
    'alloy-form-item-small': (props === null || props === void 0 ? void 0 : props.size) === 'small'
  }, {
    'alloy-form-item-border': bordered
  }, {
    'alloy-form-item-disabled': props === null || props === void 0 ? void 0 : props.disabled
  }, {
    'alloy-form-item-error-border': (validateResult === null || validateResult === void 0 ? void 0 : validateResult.isError) && bordered
  });
  var FieldComponent = components[format === null || format === void 0 ? void 0 : format.replace(/( |^)[a-z]/g, function (L) {
    return L.toUpperCase();
  })];
  return /*#__PURE__*/React.createElement(React.Fragment, null, FieldComponent ? /*#__PURE__*/React.createElement("div", {
    className: formItem
  }, /*#__PURE__*/React.createElement("div", {
    className: classnames('label-title', {
      required: isRequired
    }),
    style: {
      width: fieldItem.labelWidth
    }
  }, /*#__PURE__*/React.createElement("span", null, label), labelTips || labelTipProps ? /*#__PURE__*/React.createElement(Tips, _extends({
    text: labelTips
  }, labelTipProps)) : null), validateResult !== null && validateResult !== void 0 && validateResult.isError && bordered ? /*#__PURE__*/React.createElement("div", {
    className: "error-message"
  }, " ", validateResult === null || validateResult === void 0 ? void 0 : validateResult.message, " ") : null, /*#__PURE__*/React.createElement("div", {
    className: classnames('flex-full', {
      'alloy-form-item-error': (validateResult === null || validateResult === void 0 ? void 0 : validateResult.isError) && !bordered
    })
  }, validateResult !== null && validateResult !== void 0 && validateResult.isError && !bordered ? /*#__PURE__*/React.createElement("div", {
    className: "error-message"
  }, " ", validateResult === null || validateResult === void 0 ? void 0 : validateResult.message, " ") : null, /*#__PURE__*/React.createElement(FieldComponent, _extends({
    className: "w-full"
  }, props, {
    value: val,
    onChange: function onChange() {
      var currInputEvtIsSelf = function currInputEvtIsSelf(args) {
        var _args$, _args$2;
        return isHasInputTarget(args[0]) && 'currentTarget' in args[0] ? ((_args$ = args[0]) === null || _args$ === void 0 ? void 0 : _args$.target) === ((_args$2 = args[0]) === null || _args$2 === void 0 ? void 0 : _args$2.currentTarget) : true;
      };
      var getValues = function getValues(args) {
        var _args$3;
        if ((_args$3 = args[0]) !== null && _args$3 !== void 0 && _args$3.target) {
          if (!isHasInputTarget(args[0])) return args;
        }
        return getValuesByEvt(args);
      };
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      if (!currInputEvtIsSelf(args)) return;
      var values = getValues(args);
      var value = values[0];
      changeHandle(value);
    }
  })))) : null);
}, function (prevProps, nextProps) {
  return prevProps === nextProps;
});