interface MenuLink {
    label: string;
    to: string;
}

export const menuLinks: MenuLink[] = [
    { label: 'Strona główna', to: '/' },
    { label: 'Operacje', to: '/operations' },
    { label: 'Kategorie', to: '/categories' },
    { label: 'Źródła', to: '/sources' },
    { label: 'Kolorki', to: '/colors' },
];
