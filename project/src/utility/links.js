
const currentUser = localStorage.getItem("user");
console.log(currentUser)
const links =
    [
        {
            path: `/home/${currentUser}`,
            name: "Home"
        },
        {
            path: "/settings",
            name: "Settings"
        }
    ]

export default links;