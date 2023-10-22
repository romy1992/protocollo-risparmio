
const currentUser = localStorage.getItem("user");

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