import * as React from "react";
import styles from "./styles.module.css";

type FieldProps = {
  value: number | null;
};

const Field = (props: FieldProps): JSX.Element => {
  return (
    <div data-testid="field" className={styles.field}>
      {props.value}
    </div>
  );
};

export default Field;
