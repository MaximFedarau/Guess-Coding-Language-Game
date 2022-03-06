export default function OptionButton(props) {
    return (
        <button onClick={props.act}>{props.name}</button>
    )
}