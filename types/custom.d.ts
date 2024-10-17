// Объявление модуля 'vuper', если он используется
declare module 'vuper' {
    const content: any;
    export default content;
}

// Объявление модулей для SCSS, если необходимо
declare module '*.scss' {
    const content: Record<string, string>;
    export default content;
}
