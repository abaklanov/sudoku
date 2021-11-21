import * as React from "react";
import styles from "./styles.module.css";

type Indices = [number, number];

type FieldProps = {
  highlighted: boolean;
  indices: Indices;
  onClick: (indices: Indices) => void;
  selected: boolean;
  value: number | null;
};

const Field = (props: FieldProps): JSX.Element => {
  const isHighlighted = props.selected ? false : props.highlighted;
  return (
    <div
      data-testid={`field-${props.indices}`}
      role="field"
      data-indices={props.indices}
      className={`${styles.field} ${props.selected ? styles.selected : ""} ${
        isHighlighted ? styles.highlighted : ""
      }`}
      onClick={() => props.onClick(props.indices)}
    >
      {props.value}
    </div>
  );
};

export default Field;
