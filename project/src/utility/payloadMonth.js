const payload = {
    fixedCost:
        [
            {
                name: "Rata macchina",
                price: 335
            },
            {
                name: "Assicurazione",
                price: 90
            }
        ],
    months:
        [
            {
                name: "Gennaio",
                salary: 500,
                cost: 400,
                leisure:
                    [
                        { const: 100, note: "Cena" }
                    ],
                FixedMonthlyCredit:
                    [
                        { credit: 100, note: "Psico" }
                    ]
            },
            {
                name: "Febbraio",
                salary: 500,
                cost: 400,
                leisure:
                    [
                        { const: 100, note: "Cena" }
                    ],
                FixedMonthlyCredit:
                    [
                        { credit: 100, note: "Psico" }
                    ]
            },
            {
                name: "Marzo",
                salary: 500,
                cost: 400,
                leisure:
                    [
                        { const: 100, note: "Cena" }
                    ],
                FixedMonthlyCredit:
                    [
                        { credit: 100, note: "Psico" }
                    ]
            }
        ]
}
export { payload};