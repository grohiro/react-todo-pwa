declare type Todo = {
  value: string;
  readonly id: number;
  checked: boolean;
  removed: boolean;
};

declare export type Filter = "all" | "checked" | "unchecked" | "removed";
