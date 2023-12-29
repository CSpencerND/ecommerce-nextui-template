export default function Thing({
    params: { thing },
}: {
    params: {
        thing: string;
    };
}) {
    return (
        <div className="fixed inset-0 bg-gray-900/60 grid place-items-center size-full z-50">
            <div className="bg-gray-800/60 grid place-items-center size-96">
                <h2>{`Hi. I'm Thing ${thing}!`}</h2>
            </div>
        </div>
    );
}
