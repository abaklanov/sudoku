import * as React from "react";
import Field from "../Field";
import styles from "./styles.module.css";

const Playfield = (): JSX.Element => {
  type KeyMatrix = number[][];
  type SolutionMatrix = (number | null)[][];
  type Indices = [number, number];
  const [key, setKey] = React.useState<KeyMatrix>([]);
  const [solution, setSolution] = React.useState<SolutionMatrix>([]);
  const [selectedFieldIndices, setSelectedFieldIndices] = React.useState<
    [number, number] | null
  >(null);

  React.useEffect(function initialiseMatrix() {
    const matrix: KeyMatrix = [];

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
    let arr: Indices[] = [];
    while (arr.length < 36) {
      const randomElement: Indices = [
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

  const revealKey = (matrix: SolutionMatrix) => {
    const randomIndices = generateRandomIndices();
    randomIndices.forEach((indices) => {
      matrix[indices[0]][indices[1]] = key[indices[0]][indices[1]];
    });
    return matrix;
  };

  const initialiseSolution = () => {
    if (key.length === 0) return;
    let matrix: SolutionMatrix = [];

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

  const toggleField = (indices: Indices) => {
    setSelectedFieldIndices((prev) =>
      prev
        ? prev[0] === indices[0] && prev[1] === indices[1]
          ? null
          : indices
        : indices
    );
  };

  const render = solution.map((row, rowIndex) => [
    ...row.reduce<Array<JSX.Element>>((acc, curr, index) => {
      return [
        ...acc,
        <Field
          value={curr}
          key={`${rowIndex}-${index}`}
          onClick={toggleField}
          indices={[rowIndex, index]}
          selected={
            selectedFieldIndices
              ? rowIndex === selectedFieldIndices[0] &&
                index === selectedFieldIndices[1]
              : false
          }
          highlighted={
            selectedFieldIndices
              ? rowIndex === selectedFieldIndices[0] ||
                index === selectedFieldIndices[1]
              : false
          }
        />,
      ];
    }, []),
    <br key={rowIndex} />,
  ]);

  return <div className={styles.playfield}>{render}</div>;
};

export default Playfield;
