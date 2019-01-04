interface Mapping {
    keys: string[];
    value: string[];
}

export default interface Mappings {
    [key: string]: Mapping;
}
