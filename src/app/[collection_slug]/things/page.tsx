import Link from "next/link";

export default function ThingsPage({
    params: { collection_slug },
}: {
    params: { collection_slug: string };
}) {
    return (
        <menu className="grid h-16 w-full grid-cols-2 place-items-center gap-6">
            {Array(4)
                .fill(null)
                .map((_, i) => {
                    const link = `thing ${i + 1}`;
                    return (
                        <Link
                            key={link}
                            href={`/${collection_slug}/things/${i + 1}`}
                            className="cursor-pointer bg-gray-900 p-6 text-cyan-400 underline transition-colors hover:text-opacity-80"
                        >
                            {link}
                        </Link>
                    );
                })}
        </menu>
    );
}
