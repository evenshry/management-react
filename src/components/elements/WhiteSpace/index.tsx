import React from 'react';

interface Props {
  backgroundColor?: string;
  height?: number;
}

export default function WhiteSpace(props: Props) {
  const { backgroundColor, height = 20 } = props;
  const style: any = {};
  if (backgroundColor) {
    style.backgroundColor = backgroundColor;
  }
  if (height) {
    style.height = `${height}px`;
  }
  return <div style={style} />;
}
