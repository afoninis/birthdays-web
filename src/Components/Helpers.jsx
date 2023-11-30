export const getTargetYear = (day, month) => {
  const currentDate = new Date();
  if (
    month < currentDate.getMonth() ||
    (month === currentDate.getMonth() && day < currentDate.getDate())
  )
    return currentDate.getFullYear() + 1;
  else return currentDate.getFullYear();
};
export const sortByDateIncrease = (data) =>
  data.sort((a, b) => a.days_till - b.days_till);

export const sortByDateDecrease = (data) =>
  data.sort((a, b) => b.days_till - a.days_till);

export const sortByName = (data) =>
  data.sort((a, b) => a.name.localeCompare(b.name));

export const sortByImportantOnly = (data) =>
  data.filter((item) => item.favorite === true);

const sortAdditionSwitching = (data, currentSortFilter) => {
  switch (currentSortFilter) {
    case "Increase": {
      return sortByDateIncrease(data);
    }
    case "Decrease": {
      return sortByDateDecrease(data);
    }
    case "A-Z": {
      return sortByName(data);
    }
    default: {
      return;
    }
  }
};
export const sortByImportantFirst = (data, currentSortFilter) => {
  const favoritesData = data.filter((el) => el.favorite === true);
  const sortedFavoriteData = sortAdditionSwitching(
    favoritesData,
    currentSortFilter
  );

  const notFavoritesData = data.filter((el) => el.favorite === false);
  const sortedNotFavoriteData = sortAdditionSwitching(
    notFavoritesData,
    currentSortFilter
  );
  return [...sortedFavoriteData, ...sortedNotFavoriteData];
};
