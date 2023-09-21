interface Pokemon {
    id: number;
    name: string;
    sprite: string|null;
    animateSprite: string|null;
    types: string[];
    height: number;
    weight: number;
    abilities: string[];
    stats: {
        name: string;
        value: number;
    }[];
    evolutions: {
        id: number;
        name: string;
        sprite: string;
    }[];
}

export default Pokemon;