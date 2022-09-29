const menuItems = {
    items: [
        {
            id: 'navigation',
            title: 'Navegación',
            type: 'group',
            icon: 'icon-navigation',
            children: [
                {
                    id: 'dashboard',
                    title: 'Home',
                    type: 'item',
                    url: '/',
                    icon: 'feather icon-home'
                },
                {
                    id: 'articles',
                    title: 'Artículos',
                    type: 'item',
                    url: '/articles',
                    icon: 'feather icon-bookmark'
                },
                {
                    id: 'events',
                    title: 'Eventos',
                    type: 'item',
                    url: '/app/events',
                    icon: 'feather icon-calendar'
                }
            ]
        },
        {
            id: 'ui-forms',
            title: 'Predicciones de Energía',
            type: 'group',
            icon: 'icon-group',
            children: [
                {
                    id: 'forms',
                    title: 'Datos Totales',
                    type: 'item',
                    url: '/modelFullData',
                    icon: 'feather icon-file-text'
                },
                {
                    id: 'forms',
                    title: 'Datos Superficiales',
                    type: 'item',
                    url: '/modelSuperficialData',
                    icon: 'feather icon-file-text'
                },
                {
                    id: 'bootstrap',
                    title: 'Datos Volumetricos',
                    type: 'item',
                    url: '/modelBulkData',
                    icon: 'feather icon-server'
                }
                // {
                //     id: 'bootstrap',
                //     title: 'Iris Model',
                //     type: 'item',
                //     url: '/modelsML',
                //     icon: 'feather icon-server'
                // }
            ]
        },
        {
            title: 'Trabajos',
            type: 'group',
            icon: 'icon-ui',
            children: [
                {
                    id: 'basic',
                    title: 'Projectos',
                    type: 'collapse',
                    icon: 'feather icon-box',
                    children: [
                        {
                            id: 'button',
                            title: 'Lista de projectos',
                            type: 'item',
                            url: '/projects'
                        },
                        {
                            id: 'badges',
                            title: 'Nuevo projecto',
                            type: 'item',
                            url: '/projects/newProject'
                        },
                        {
                            id: 'breadcrumb',
                            title: 'Buscar Projecto',
                            type: 'item',
                            url: '/comingSoon'
                        }
                    ]
                },
                {
                    id: 'basic',
                    title: 'Calculadoras',
                    type: 'collapse',
                    icon: 'feather icon-grid',
                    children: [
                        {
                            id: 'button',
                            title: 'Lista de calculadoras',
                            type: 'item',
                            url: '/calculators'
                        },
                        {
                            id: 'badges',
                            title: 'Nueva calculadora',
                            type: 'item',
                            url: '/projects/newCalculator'
                        },
                        {
                            id: 'breadcrumb',
                            title: 'Buscar Calculadora',
                            type: 'item',
                            url: '/comingSoon'
                        }
                    ]
                },
                {
                    id: 'bootstrap',
                    title: 'Gráfico de Energía ',
                    type: 'item',
                    url: '/energy',
                    icon: 'feather icon-server'
                }
            ]
        },
        // {
        //     id: 'chart-maps',
        //     title: 'Selecting Feature',
        //     type: 'group',
        //     icon: 'icon-charts',
        //     children: [
        //         {
        //             id: 'charts',
        //             title: 'Neural Network',
        //             type: 'item',
        //             url: '/NeuralNetwork',
        //             icon: 'feather icon-pie-chart'
        //         }
        //     ]
        // },
        {
            id: 'resources',
            title: 'Contact',
            type: 'group',
            icon: 'icon-pages',
            children: [
                {
                    id: 'product-page',
                    title: 'Download Project',
                    type: 'item',
                    url: 'https://github.com/JosefinaCresta',
                    classes: 'nav-item',
                    icon: 'feather icon-download',
                    target: true,
                    external: true
                },
                {
                    id: 'product-page',
                    title: 'My GitHub',
                    type: 'item',
                    url: 'https://github.com/JosefinaCresta',
                    classes: 'nav-item',
                    icon: 'feather icon-github',
                    target: true,
                    external: true
                },
                {
                    id: 'linkedin',
                    title: 'My LinkedIn',
                    type: 'item',
                    url: 'https://www.linkedin.com/in/josefina-cresta/',
                    classes: 'nav-item',
                    icon: 'feather icon-github',
                    target: true,
                    external: true
                }
            ]
        }
    ]
};

export default menuItems;
