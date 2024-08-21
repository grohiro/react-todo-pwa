type Props = {
  onSubmit: () => void;
  onChange: (e: any) => void;
  text: string;
};

export const FormDialog = (props: Props) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        props.onSubmit();
      }}
    >
      <input
        type="text"
        value={props.text}
        onChange={(e) => props.onChange(e)}
      />
      <input type="submit" value="追加" onSubmit={props.onSubmit} />
    </form>
  );
};
