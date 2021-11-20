import * as React from "react";
import Field from "../Field";
import styles from "./styles.module.css";

const Playfield = (): JSX.Element => {
  const [solution, setSolution] = React.useState<number[][]>([]);

  React.useEffect(function initialiseMatrix() {
    const matrix: number[][] = [];

    for (let i = 0; i < 9; i++) {
      matrix.push([]);
      for (let j = 0; j < 9; j++) {
        const value = ((j + 3 * i + Math.floor(i / 3)) % 9) + 1;
        matrix[i].push(value);
      }
    }
    setSolution(matrix);
  }, []);

  const render = solution.map((row, rowIndex) => [
    ...row.reduce<Array<JSX.Element>>((acc, curr, index) => {
      return [...acc, <Field value={curr} key={`${rowIndex}-${index}`} />];
    }, []),
    <div className={styles.linebreak} />,
  ]);

  return <div className={styles.container}>{render}</div>;
};

export default Playfield;
