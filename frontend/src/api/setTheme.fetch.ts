type UpdateThemeProps = {
    id: string;
    theme: string;
};

const updatePortfolioTheme = async ({ id, theme }: UpdateThemeProps) => {
    try {
        const response = await fetch(`http://localhost:4000/api/portfolio/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ theme }),
        });

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const data = await response.json();

        console.log(data.message);
        console.log(data.portfolio);
    } catch (error) {
        console.error("Error:", error);
    }
    return
};

export default updatePortfolioTheme;