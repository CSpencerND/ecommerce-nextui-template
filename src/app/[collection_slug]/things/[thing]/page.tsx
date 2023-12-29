export default function Thing({
    params: { thing },
}: {
    params: { thing: string };
}) {
    return <h2>{`Hi. I'm Thing ${thing}! `}</h2>;
}
