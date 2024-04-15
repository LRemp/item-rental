export const GenerateCategoriesTree = (categories = [], parentCategory = null) => {
  console.log(categories);
  var categoryTree: any = [];
  categories
    .filter((category: any) => category.parent === parentCategory)
    .forEach((category: any) => {
      const categoryObj = {
        label: category.label,
        value: category.name,
        children: GenerateCategoriesTree(categories, category.name),
      };
      categoryTree.push(categoryObj);
    });

  return categoryTree;
};
