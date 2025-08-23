import categoryModel from '../../../../DB/models/Category.js';

// create category
export const createCat = async (req, res, next) => {
  const { name } = req.body;
  let category = await categoryModel.findOne({ name })
  if (category) {
    return next(new Error("Category already added."), { cause: 400 })
  }
  const newCategory = new categoryModel({ name })
  await newCategory.save()
  category = await categoryModel.findOne({ name })

  return res.status(201).json({ message: "Created category successfully", category })

}



// delete category
export const deleteCategory = async (req, res, next) => {
  const catId = req.params.id;
  const category = await categoryModel.findOne({ _id: catId })

  if (!category) {
    return next(new Error(`Category id not found.`), { cause: 404 })
  }

  await categoryModel.deleteOne({ _id: catId })
  return res.status(204).json({ message: "Deleted category successfully" })

}

export const updateCategory = async (req, res, next) => {
  const catId = req.params.id;
  const category = await categoryModel.findOne({ _id: catId })

  if (!category) {
    return next(new Error(`Category id not found.`), { cause: 404 })
  }
  const { name } = req.body;
  const updatedCategory = await categoryModel.findOneAndUpdate({ _id: catId }, { name }, { new: true })
  return res.status(200).json({ message: "Updated category successfully", updatedCategory })

}
export const getAllCategories = async (req, res, next) => {
  const categories = await categoryModel.find()
  return res.status(200).json({ message: "Done", categories })
}
export const getCategoryById = async (req, res, next) => {
  const catId = req.params.id;
  const category = await categoryModel.findOne({ _id: catId })

  if (!category) {
    return next(new Error(`Category id not found.`), { cause: 404 })
  }
  return res.status(200).json({ message: "Done", category })

}