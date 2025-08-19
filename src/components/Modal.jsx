import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { p } from "framer-motion/client";

const Modal = ({
  isOpen,
  onClose,
  action,
  isDarkMode,
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
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center" // only the overlay now
        >
          {/* Example: modal positioned at top-right */}
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            className={`fixed top-1/4 w-[80%]  ${
              isDarkMode ? "bg-gray-700" : "bg-gray-100"
            } p-3 rounded-2xl shadow-xl w-96`}
          >
            {/* Modal Title */}
            <h2 className="text-sm md:text-lg  font-bold text-slate-900 dark:text-white mb-4">
              {actionTitles[action]}
            </h2>

            {/* Modal Body */}
            {action === "add" && (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="Enter category name"
                  className={`w-full text-[11px] md:text-sm px-4 py-2 rounded-lg border mb-4 outline-none
        ${
          isDarkMode
            ? "bg-slate-700 border-slate-600 text-slate-100"
            : "bg-slate-50 border-slate-300 text-slate-900"
        }`}
                />

                <div className="">
                  <button
                    type="button"
                    onClick={() => {
                      handleAddCategory();
                      onClose();
                    }}
                    className="px-4 py-2 text-[11px] md:text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Add
                  </button>
                </div>
              </div>
            )}

            {action === "edit" && (
              <div className="text-slate-700 dark:text-slate-300">
                <div className="mb-4">
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Here you can edit a category.
                  </p>
                </div>

                {filtered.length > 0 ? (
                  <div className="space-y-3">
                    {filtered.map((category, index) => (
                      <div
                        className="flex gap-3 w-full items-center p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 hover:shadow-sm transition-all duration-200"
                        key={index}
                      >
                        <input
                          type="text"
                          onChange={(e) => setnewName(e.target.value)}
                          placeholder={category.name}
                          className="flex-1 border border-slate-300 dark:border-slate-600 rounded-md px-3 py-2 text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-200 placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            editCategory(category.name, newName);
                            setHasChanged(true);
                            onClose();
                          }}
                          className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-sm font-medium rounded-md shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 transition-all duration-200 transform hover:scale-105 active:scale-95"
                        >
                          Save
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
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
                    <p className="text-slate-500 dark:text-slate-400 font-medium">
                      You have not added a category yet
                    </p>
                    <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">
                      Create your first category to get started
                    </p>
                  </div>
                )}
              </div>
            )}

            {action === "delete" && (
              <div className="text-slate-700 dark:text-slate-300">
                <div className="mb-4">
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Here you can delete a category.
                  </p>
                </div>

                {filtered.length > 0 ? (
                  <div className="space-y-3">
                    {filtered.map((category, index) => (
                      <div
                        className="flex gap-3 w-full items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 hover:shadow-sm transition-all duration-200 group"
                        key={index}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-slate-400 dark:bg-slate-500"></div>
                          <p className="font-medium text-slate-800 dark:text-slate-200">
                            {category.name}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => deleteCategory(category.name)}
                          className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white text-sm font-medium rounded-md shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 transition-all duration-200 transform hover:scale-105 active:scale-95 group-hover:shadow-lg"
                        >
                          <svg
                            className="w-4 h-4 inline-block mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                          Delete
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
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
                    <p className="text-slate-500 dark:text-slate-400 font-medium">
                      You have not added a category yet
                    </p>
                    <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">
                      Create your first category to get started
                    </p>
                  </div>
                )}
              </div>
            )}

            <button
              type="button"
              onClick={onClose}
              className="md:mt-6 px-4 py-2 text-[11px] md:text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
