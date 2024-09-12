import { isTodo, isTodos } from "../lib/isTodo";

const mockTodos = [
  {id: 0, value: 'hello', checked: false, removed: false},
  {id: 1, value: 'bye', checked: true, removed: true},
];

test('Todo型オブジェクトが与えられると `true` となるか？', () => {
  expect(isTodo(mockTodos[0])).toBeTruthy();
});

test('Todo型オブジェクトの配列が与えられると `true` となるか？', () => {
  expect(isTodos(mockTodos)).toBeTruthy();
});
