import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Modal = ({
  isOpen,
  onClose,
  action,
  categories,
  newCategory,
  setNewCategory,
  handleAddCategory,
  deleteCategory,
  editCategory,
  setnewName,
  newName,
}) => {
  const actionTitles = {
    add: "Add a Category",
    edit: "Edit a Category",
    delete: "Delete a Category",
  };

  const [filtered, setFiltered] = useState([]);
  const [hasChanged, setHasChanged] = useState(false);

  useEffect(() => {
    setHasChanged(false);
    const filteredCategories = categories.filter(
      (category) => category.type === "custom"
    );
    setFiltered(filteredCategories);
  }, [categories.length, hasChanged]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            className="fixed top-1/4 w-[80%] md:w-96 bg-gray-100 dark:bg-gray-700 p-3 rounded-2xl shadow-xl"
          >
            {/* Modal Title */}
            <h2 className="text-base md:text-lg font-bold text-slate-900 dark:text-white mb-4">
              {actionTitles[action]}
            </h2>

            {/* Add Category */}
            {action === "add" && (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="Enter category name"
                  className="w-10/12 text-[16px] md:text-sm px-4 py-2 rounded-lg border outline-none bg-slate-50 dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100"
                />
                <button
                  type="button"
                  onClick={() => {
                    handleAddCategory();
                    onClose();
                  }}
                  className="px-4 py-2.5 text-[13px] md:text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                >
                  Add
                </button>
              </div>
            )}

            {/* Edit Category */}
            {action === "edit" && (
              <div className="text-slate-700 dark:text-slate-300">
                <p className="mb-4 text-sm text-slate-600 dark:text-slate-400">
                  Here you can edit a category.
                </p>
                {filtered.length > 0 ? (
                  <div className="space-y-3">
                    {filtered.map((category, index) => (
                      <div
                        key={index}
                        className="flex gap-3 items-center p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700"
                      >
                        <input
                          type="text"
                          onChange={(e) => setnewName(e.target.value)}
                          placeholder={category.name}
                          className="flex-1 text-base border border-slate-300 dark:border-slate-600 rounded-md px-3 py-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-200 placeholder-slate-500 dark:placeholder-slate-400"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            editCategory(category.name, newName);
                            setHasChanged(true);
                            onClose();
                          }}
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md"
                        >
                          Save
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <EmptyState message="You have not added a category yet" />
                )}
              </div>
            )}

            {/* Delete Category */}
            {action === "delete" && (
              <div className="text-slate-700 dark:text-slate-300">
                <p className="mb-4 text-sm text-slate-600 dark:text-slate-400">
                  Here you can delete a category.
                </p>
                {filtered.length > 0 ? (
                  <div className="space-y-3">
                    {filtered.map((category, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700"
                      >
                        <span className="text-slate-800 dark:text-slate-200">
                          {category.name}
                        </span>
                        <button
                          type="button"
                          onClick={() => deleteCategory(category.name)}
                          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded-md"
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <EmptyState message="You have not added a category yet" />
                )}
              </div>
            )}

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="mt-6 px-4 py-2 text-[13px] md:text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const EmptyState = ({ message }) => (
  <div className="text-center py-8">
    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
      <svg
        className="w-8 h-8 text-slate-400 dark:text-slate-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
        />
      </svg>
    </div>
    <p className="text-slate-500 dark:text-slate-400 font-medium">{message}</p>
    <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">
      Create your first category to get started
    </p>
  </div>
);

export default Modal;
