type Props = {
  deckId: string,
  label: string,
};

export default function DeckLink(props: Props) {
  return <DeckLink deckId={props.deckId} label={ props.label } />;
}
