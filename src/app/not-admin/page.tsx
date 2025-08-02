"use client";
// pages/not-authorized.js

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

export default function NotAuthorized() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <motion.div
        className="max-w-lg p-8 bg-white dark:bg-secondary rounded-lg shadow-lg"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1
          className="mb-6 text-4xl font-bold text-primary"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Access Denied
        </motion.h1>

        <motion.p
          className="mb-8 text-lg text-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          You are not authorized to view this page. Please contact your
          administrator.
        </motion.p>

        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Link href={"/"}>
            <Button className="px-6 py-2  rounded-lg bg-primary hover:bg-secondary hover:text-primary focus:outline-none">
              Go Back
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
