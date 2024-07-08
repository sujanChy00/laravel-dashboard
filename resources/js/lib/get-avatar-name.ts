export const getAvatarName = (str?: string) => {
    if (!str) return null;

    if (str.includes(" ")) {
        return (
            str.split(" ")[0].charAt(0).toUpperCase() +
            str.split(" ").pop()?.charAt(0).toUpperCase()
        );
    } else {
        return str[0].toUpperCase();
    }
};
