// utils/calcCategoryTotals.js
export const calcCategoryTotals = (expenses, categories) => {
  const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);

  const categoryTotals = categories.reduce((acc, category) => {
    const categoryExpenses = expenses.filter(e => e.category === category.name);
    const total = categoryExpenses.reduce((s, e) => s + e.amount, 0);

    if (total > 0) {
      acc.push({
        name: category.name,
        total,
        icon: category.icon,
        percentage: ((total / totalSpent) * 100).toFixed(1)
      });
    }
    return acc;
  }, []);

  return categoryTotals.sort((a, b) => b.total - a.total);
};
