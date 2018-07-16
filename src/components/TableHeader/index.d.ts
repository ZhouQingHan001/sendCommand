import * as React from "react";

export interface TableHeaderProps {
  // 搜索框提示文字
  placeholderSearch: string,
  // 新建按钮的显示文字
  nameOfButtonCreate: string,
  // 批量新建按钮的显示文字
  nameOfButtonMultiCreate: string,
  // 搜索框的确认回调
  onButtonSearch?: (value: string) => any;
  // 刷新按钮的点击回调
  onButtonRefresh?: React.FormEventHandler<any>;
  // 新建按钮的点击回调
  onButtonCreate?: React.FormEventHandler<any>;
  // 批量新建按钮的点击回调
  onButtonMultiCreate?: React.FormEventHandler<any>;
  // 详细搜索模式的React节点
  advancedHeader?: React.ReactNode;
  // 是否显示批量新建按钮
  isShowButtonMultiCreate?: boolean;
  // 是否显示新建按钮
  isShowButtonCreate?: boolean;
  // 是否显示刷新按钮
  isShowButtonRefresh?: boolean;
  // 是否有多状态的Header
  isMultiMode?: boolean;
}

export default class TableHeader extends React.Component<
  TableHeaderProps,
  any
  > { }
