const InputForm = (props) => {
  return (
    <div>
      <label> {props.label} </label>
      <input
        name={props.name}
        type={props.type ?? ""}
        placeholder={props.placeholder ?? "..."}
        defaultValue={props.defaultValue ?? ""}
        onChange={props.onChange}
        value={props.value}
      />
    </div>
  );
};

export default InputForm;
