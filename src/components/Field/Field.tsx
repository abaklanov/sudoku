import * as React from "react";

type FieldProps = {
  value: number;
};

const Field = (props: FieldProps): JSX.Element => {
  return <div data-testid="field">{props.value}</div>;
};

export default Field;
