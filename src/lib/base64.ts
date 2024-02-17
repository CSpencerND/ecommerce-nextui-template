import { getPlaiceholder } from "plaiceholder";

import type {} from "@/types";

async function getBase64(src: string) {
    try {
        const res = await fetch(src);

        if (!res.ok) {
            throw new Error(
                `Failed to fetch image: { ${res.status}: ${res.statusText} }`,
            );
        }

        const buffer = await res.arrayBuffer();

        const { base64 } = await getPlaiceholder(Buffer.from(buffer));

        return base64;
    } catch (e) {
        if (e instanceof Error) {
            console.log(e.stack);
        }
    }
}

// export async function addBlurredDataUrls(images: )
