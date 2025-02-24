"use client"

import { motion, AnimatePresence } from "framer-motion"
import type { ReactNode } from "react"

interface TooltipProps {
    content: string
    children: ReactNode
    show: boolean
    onMouseEnter: () => void
    onMouseLeave: () => void
}

export default function CustomTooltip({ content, children, show, onMouseEnter, onMouseLeave }: TooltipProps) {
    return (
        <div className="relative inline-block" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            {children}
            <AnimatePresence>
                {show && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2"
                    >
                        <div className="bg-gray-900 text-white text-sm px-3 py-1.5 rounded-lg whitespace-nowrap">
                            {content}
                            <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-gray-900" />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

