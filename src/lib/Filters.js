export const filterRecipes = (searchText, data) => {
    const regex = new RegExp(searchText, "i"); // 'i' flag for case-insensitive search
    return data.filter(
      (item) =>
        regex.test(item.title) ||
        regex.test(item.ingredients) 
    );
  };
