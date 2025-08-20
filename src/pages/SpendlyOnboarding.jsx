import React from "react";
import SpendlyLogo from "../components/SpendlyLogo";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const SpendlyOnboarding = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center duration-300 text-slate-800 dark:bg-slate-900 dark:text-white">
      {/* Theme Toggle */}
 

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center px-6 py-8">
        {/* App Icon */}
        <motion.div
          className="text-center mb-2 md:mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <SpendlyLogo size={80} className="mx-auto mb-2 drop-shadow-2xl" />
        </motion.div>

        {/* Welcome Text */}
        <motion.div
          className="text-center mb-8 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1 className="text-2xl md:text-4xl font-bold mb-4">
            Welcome to Spendly
          </h1>
          <p className="text-sm md:text-lg leading-relaxed px-4 max-w-md mx-auto text-slate-600 dark:text-slate-300">
            Take control of your finances with smart expense tracking and
            insightful analytics
          </p>
        </motion.div>

        {/* Feature List */}
        <div className="space-y-6 mb-12 md:mb-12 max-w-lg mx-auto">
          {[
            {
              iconColor: "blue",
              title: "Track Every Expense",
              description:
                "Add, categorize, and search through all your expenses with custom categories and smart filtering.",
              svgPath:
                "M12 6v6m0 0v6m0-6h6m-6 0H6",
            },
            {
              iconColor: "purple",
              title: "Visual Analytics",
              description:
                "Get insights with beautiful charts, monthly summaries, and spending pattern analysis.",
              svgPath:
                "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
            },
            {
              iconColor: "green",
              title: "Export & Backup",
              description:
                "Export your data to CSV for backup, taxes, or further analysis. Your data, your control.",
              svgPath:
                "M8 17l4 4 4-4m-4-5v9m0-13a9 9 0 110 18 9 9 0 010-18z",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="flex items-start gap-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.2 }}
            >
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 bg-${feature.iconColor}-100 dark:bg-${feature.iconColor}-500/20`}
              >
                <svg
                  className={`w-6 h-6 text-${feature.iconColor}-600 dark:text-${feature.iconColor}-400`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={feature.svgPath}
                  />
                </svg>
              </div>
              <div>
                <h3 className="md:text-lg font-semibold mb-1">
                  {feature.title}
                </h3>
                <p className="text-[12px] md:text-sm text-slate-500 dark:text-slate-400">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Continue Button */}
      <motion.div
        className="flex justify-center px-6 pb-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <motion.button
          onClick={() => {
            localStorage.setItem("hasOnboarded", "true");
            navigate("/dashboard");
          }}
          className="md:w-1/2 w-full font-semibold py-4 px-6 rounded-2xl shadow-xl bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Continue
        </motion.button>
      </motion.div>
    </div>
  );
};

export default SpendlyOnboarding;
