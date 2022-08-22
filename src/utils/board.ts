import { reduce, complement, filter, values, isNil, max, keys } from "ramda";

const groupNonNilColumns = (
  column: (number | null)[]
): Record<number, number> => {
  const columnNotNil: number[] = filter(complement(isNil), column);
  return columnNotNil.reduce((acc: Record<number, number>, val) => {
    return {
      ...acc,
      [val]: acc[val] ? acc[val] + 1 : 1,
    };
  }, {});
};

export const getColumnScore = (column: (number | null)[]): number => {
  const groups: Record<number, number> = groupNonNilColumns(column);
  return keys(groups).reduce((acc, key) => {
    if (groups[key] === 3) return acc + Number(key) * 3 * 3;
    else if (groups[key] === 2) return acc + Number(key) * 2 * 2;
    else return acc + Number(key);
  }, 0);
};

export const getScore = (columns: (number | null)[][]): number =>
  columns.reduce((acc, column) => acc + getColumnScore(column), 0);

export const getRepeatsCount = (column: (number | null)[]): number => {
  const groups: Record<number, number> = groupNonNilColumns(column);
  const counts = values(groups);
  return Number(reduce(max, -Infinity, counts));
};
