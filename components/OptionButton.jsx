export default function OptionButton(props) {
  return (
    <button disabled={props.status} onClick={props.act}>
      {props.name}
    </button>
  );
}
