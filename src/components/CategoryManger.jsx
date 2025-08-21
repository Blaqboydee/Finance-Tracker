import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "./Modal";

const CategoryManager = ({
  categories,
  newCategory,
  setNewCategory,
  handleAddCategory,
  deleteCategory,
  editCategory,
  setnewName,
  newName,
}) => {
  const [open, setOpen] = useState(false);
  const [activeAction, setActiveAction] = useState(null); // "add" | "edit" | "delete"
  const [manageButtontext, setManageButtontext] = useState("Click to manage categories")

  setManageButtontext

  const buttonVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.3 },
    }),
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
  };

  const handleClick = (action) => {
    setActiveAction(action);
  };

  return (
    <div className="mt-4 relative w-full inline-block">
      {/* Main Button */}
      <button
        type="button"
        onClick={() => {
          setOpen(!open)
          setManageButtontext(open? "Manage Categories" : "Close Tabs")
        }}
        className="w-full md:px-4 md:py-3 py-2 text-[13px] rounded-sm bg-blue-600 text-white shadow-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-all"
      >
       {manageButtontext}
      </button>

      {/* Dropdown Buttons */}
      <AnimatePresence>
        {open && (
          <div className="mt-6 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800/90 dark:to-slate-700/90 p-6 rounded-xl border border-slate-200 dark:border-slate-600/50 shadow-lg backdrop-blur-lg z-10 md:w-[400px] transition-all">
            <div className="mb-4">
              <h3 className="text-sm md:text-lg font-semibold text-slate-800 dark:text-slate-100 mb-1">
                Category Actions
              </h3>
              <p className="text-[13px] md:text-sm text-slate-600 dark:text-slate-400">
                Choose an action to manage your categories
              </p>
            </div>

            <div className="grid gap-3">
              {[
                {
                  text: "Add a Category",
                  icon: (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  ),
                  gradient:
                    "from-green-500 to-green-600 hover:from-green-600 hover:to-green-700",
                  action: "add",
                  description: "Create a new category",
                },
                {
                  text: "Edit a Category",
                  icon: (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  ),
                  gradient:
                    "from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700",
                  action: "edit",
                  description: "Modify existing categories",
                },
                {
                  text: "Delete a Category",
                  icon: (
                    <svg
                      className="w-5 h-5"
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
                  ),
                  gradient:
                    "from-red-500 to-red-600 hover:from-red-600 hover:to-red-700",
                  action: "delete",
                  description: "Remove unwanted categories",
                },
              ].map((btn, i) => (
                <motion.button
                  key={i}
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  type="button"
                  variants={buttonVariants}
                  onClick={() => handleClick(btn.action)}
                  className={`group relative overflow-hidden px-3 py-2 md:py-3 bg-gradient-to-r ${btn.gradient} text-white rounded-xl shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-opacity-50 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]`}
                >
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                        {btn.icon}
                      </div>
                      <div className="text-left">
                        <div className="text-[13px] md:text-sm font-semibold">
                          {btn.text}
                        </div>
                        <div className="text-[12px] md:text-sm text-white/80">
                          {btn.description}
                        </div>
                      </div>
                    </div>
                    <svg
                      className="w-5 h-5 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Dynamic Modal */}
      <Modal
        isOpen={!!activeAction}
        onClose={() => setActiveAction(null)}
        action={activeAction}
        categories={categories}
        newCategory={newCategory}
        setNewCategory={setNewCategory}
        handleAddCategory={handleAddCategory}
        deleteCategory={deleteCategory}
        editCategory={editCategory}
        setnewName={setnewName}
        newName={newName}
      />
    </div>
  );
};

export default CategoryManager;
