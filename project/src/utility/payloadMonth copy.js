const payload = {
    user:
        [
            {
                id: "1",
                name: "Rosario",
                surName: "Trotta",
                email: "trottarosario@gmail.com",
                password: "1234",
                totalFixedCost: 0,
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
                            year: "2023",
                            des: "Raccoglitore Gennaio 2023",
                            salary: 0,
                            cost: 0,
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
                                ],
                            totalLeisure: 0,
                            totalFixedMonthlyCredit: 0,
                            difference: 0
                        },
                        {
                            id: 2,
                            priority: 2,
                            name: "Febbraio",
                            year: "2023",
                            des: "Raccoglitore Febbraio 2023",
                            salary: 0,
                            cost: 0,
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
                                ],
                            totalLeisure: 0,
                            totalFixedMonthlyCredit: 0,
                            difference: 0
                        },
                        {
                            id: 3,
                            priority: 3,
                            name: "Marzo",
                            year: "2023",
                            des: "Raccoglitore Marzo 2023",
                            salary: 0,
                            cost: 0,
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
                                ],
                            totalLeisure: 0,
                            totalFixedMonthlyCredit: 0,
                            difference: 0
                        }
                    ]
            }
        ]
}
export { payload };