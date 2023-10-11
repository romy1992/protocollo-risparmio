const payload = {
    fixedCost:
        [
            {
                id: 1,
                note: "Rata macchina",
                price: 335
            },
            {
                id: 2,
                note: "Assicurazione",
                price: 90
            }
        ],
    months:
        [
            {
                id: 1,
                priority: 1,
                name: "Gennaio",
                year: 2023,
                des: "Raccoglitore Gennaio 2023",
                salary: 500,
                cost: 400,
                leisure:
                    [
                        { id: 1, price: 100, note: "Cena" },
                        { id: 2, price: 150, note: "Gioco" },
                        { id: 3, price: 20, note: "Bibite" },
                        { id: 4, price: 50, note: "Spesa" }
                    ],
                fixedMonthlyCredit:
                    [
                        { id: 1, price: 100, note: "Psico" },
                        { id: 2, price: 50, note: "Gasolio" },
                        { id: 3, price: 20, note: "Regalo" }
                    ]
            },
            {
                id: 2,
                priority: 2,
                name: "Febbraio",
                year: 2023,
                des: "Raccoglitore Febbraio 2023",
                salary: 500,
                cost: 400,
                leisure:
                    [
                        { id: 1, price: 100, note: "Cena" },
                        { id: 2, price: 150, note: "Gioco" },
                        { id: 3, price: 20, note: "Bibite" },
                        { id: 4, price: 50, note: "Spesa" }
                    ],
                fixedMonthlyCredit:
                    [
                        { id: 1, price: 100, note: "Psico" },
                        { id: 2, price: 50, note: "Gasolio" },
                        { id: 3, price: 20, note: "Regalo" }
                    ]
            },
            {
                id: 3,
                priority: 3,
                name: "Marzo",
                year: 2023,
                des: "Raccoglitore Marzo 2023",
                salary: 500,
                cost: 400,
                leisure:
                    [
                        { id: 1, price: 100, note: "Cena" },
                        { id: 2, price: 150, note: "Gioco" },
                        { id: 3, price: 20, note: "Bibite" },
                        { id: 4, price: 50, note: "Spesa" }
                    ],
                fixedMonthlyCredit:
                    [
                        { id: 1, price: 100, note: "Psico" },
                        { id: 2, price: 50, note: "Gasolio" },
                        { id: 3, price: 20, note: "Regalo" }
                    ]
            }
        ]
}
export { payload };