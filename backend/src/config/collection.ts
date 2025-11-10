export interface ICollectionTemplate {
    collectionPrompt: string,
    environments: string[],
    styles: string[]
}

export const collectionTemplate = {
    collectionPrompt: "A cinematic portrait of an AI agent, ultra-detailed, futuristic, digital art style",

    // Layer 1: Environment variations
    environments: [
        "in a neon-lit cityscape",
        "inside a glowing data tunnel",
        "in a futuristic control room",
        "floating among shattered pixels",
        "under electric rain",
        "surrounded by holographic code streams",
        "within a quantum server core",
        "standing before a digital cathedral",
        "inside a holographic lab",
        "emerging from the void of cyberspace",
    ],

    // Layer 2: Mood/Style variations
    styles: [
        "glitch art aesthetic",
        "blue neon lighting",
        "purple holographic tones",
        "chrome reflection finish",
        "soft cinematic blur",
        "fractured mirror composition",
        "electric fractal overlay",
        "hyperreal lens flare",
        "data-particle dispersion",
        "vaporwave pastel mood",
    ],
}