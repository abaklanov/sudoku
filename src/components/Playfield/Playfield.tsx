import * as React from "react";
import Field from "../Field";
import styles from "./styles.module.css";
import { Chance } from "chance";

const Playfield = (): JSX.Element => {
  type KeyMatrix = number[][];
  type SolutionMatrix = (number | null)[][];
  type Indices = [number, number];
  const [key, setKey] = React.useState<KeyMatrix>([]);
  const [solution, setSolution] = React.useState<SolutionMatrix>([]);
  const [selectedFieldIndices, setSelectedFieldIndices] = React.useState<
    [number, number] | null
  >(null);
  React.useEffect(function initialiseKey() {
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

  React.useEffect(
    function initialiseSolution() {
      const generateRandomIndices = () => {
        const chance = process.env.REACT_APP_RANDOMIZER_SEED
          ? new Chance(process.env.REACT_APP_RANDOMIZER_SEED)
          : new Chance();

        let arr: Indices[] = [];
        while (arr.length < 36) {
          const randomElement: Indices = [
            chance.integer({ min: 0, max: 8 }),
            chance.integer({ min: 0, max: 8 }),
          ];
          if (
            !arr.find(
              (element) =>
                element[0] === randomElement[0] &&
                element[1] === randomElement[1]
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
      const initialize = () => {
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

      initialize();
    },
    [key]
  );

  const toggleField = (indices: Indices) => {
    setSelectedFieldIndices((prev) =>
      prev
        ? prev[0] === indices[0] && prev[1] === indices[1]
          ? null
          : indices
        : indices
    );
  };

  const isInSquareWithSelected = (indices: Indices) => {
    if (!selectedFieldIndices) return false;

    const convertToSquareCoords = (index: number) => Math.floor(index / 3);
    const selectedSquareCoords = selectedFieldIndices.map(
      convertToSquareCoords
    );
    const attempteeSquareCoords = indices.map(convertToSquareCoords);

    return (
      JSON.stringify(selectedSquareCoords) ===
      JSON.stringify(attempteeSquareCoords)
    );
  };

  const isInLineOrColumnWithSelected = (indices: Indices) => {
    return selectedFieldIndices
      ? indices[0] === selectedFieldIndices[0] ||
          indices[1] === selectedFieldIndices[1]
      : false;
  };

  const isHighlighted = (indices: Indices) => {
    if (!selectedFieldIndices) return false;
    return (
      isInLineOrColumnWithSelected(indices) || isInSquareWithSelected(indices)
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
            !!selectedFieldIndices
              ? rowIndex === selectedFieldIndices[0] &&
                index === selectedFieldIndices[1]
              : false
          }
          highlighted={isHighlighted([rowIndex, index])}
          sameNumber={
            !!selectedFieldIndices
              ? solution[selectedFieldIndices[0]][selectedFieldIndices[1]] ===
                solution[rowIndex][index]
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
