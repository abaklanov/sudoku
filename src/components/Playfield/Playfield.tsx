import * as React from "react";
import Field from "../Field";
import styles from "./styles.module.css";

const Playfield = (): JSX.Element => {
  type keyMatrix = number[][];
  type solutionMatrix = (number | null)[][];
  const [key, setKey] = React.useState<keyMatrix>([]);
  const [solution, setSolution] = React.useState<solutionMatrix>([]);

  React.useEffect(function initialiseMatrix() {
    const matrix: keyMatrix = [];

    for (let i = 0; i < 9; i++) {
      matrix.push([]);
      for (let j = 0; j < 9; j++) {
        const value = ((j + 3 * i + Math.floor(i / 3)) % 9) + 1;
        matrix[i].push(value);
      }
    }
    setKey(matrix);
  }, []);

  const generateRandomIndices = () => {
    type indices = [number, number];
    let arr: indices[] = [];
    while (arr.length < 36) {
      const randomElement: indices = [
        Math.floor(Math.random() * 9),
        Math.floor(Math.random() * 9),
      ];
      if (
        !arr.find(
          (element) =>
            element[0] === randomElement[0] && element[1] === randomElement[1]
        )
      )
        arr.push(randomElement);
    }

    return arr;
  };

  const revealKey = (matrix: solutionMatrix) => {
    const randomIndices = generateRandomIndices();
    randomIndices.forEach((indices) => {
      matrix[indices[0]][indices[1]] = key[indices[0]][indices[1]];
    });
    return matrix;
  };

  const initialiseSolution = () => {
    if (key.length === 0) return;
    let matrix: solutionMatrix = [];

    for (let i = 0; i < 9; i++) {
      matrix.push([]);
      for (let j = 0; j < 9; j++) {
        matrix[i].push(null);
      }
    }
    matrix = revealKey(matrix);
    setSolution(matrix);
  };

  React.useEffect(initialiseSolution, [key]);

  const render = solution.map((row, rowIndex) => [
    ...row.reduce<Array<JSX.Element>>((acc, curr, index) => {
      return [...acc, <Field value={curr} key={`${rowIndex}-${index}`} />];
    }, []),
    <br key={rowIndex} />,
  ]);

  return <div className={styles.playfield}>{render}</div>;
};

export default Playfield;
