const container =
{
    idContainer: "",
    codUser: "",
    fixedCost: {
        idFixedCost: "",
        totalFixedCost: "",
        costs: [
            {
                idCost: "",
                note: "",
                price: 0
            }
        ]
    },
    months: []
}


const month =
{
    idUMonth: "",
    title: "",
    note: "",
    des: "",
    cost: 0,
    leisure: [],
    totalLeisure: 0,
    fixedMonthlyCredit: [],
    totalFixedMonthlyCredit: 0,
    difference: 0
}


export { container, month };