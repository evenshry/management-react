interface LabelCol {

}

export function formItemLayout(labelColNum: number = 6, wrapperColNum: number = 18) {
  return {
    labelCol: {
      xs: { span: labelColNum },
      sm: { span: labelColNum },
      md: { span: labelColNum }
    },
    wrapperCol: {
      xs: { span: wrapperColNum },
      sm: { span: wrapperColNum },
      md: { span: wrapperColNum }
    }
  }
}
