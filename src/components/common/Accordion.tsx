import { useState, type ReactNode } from 'react';

interface AccordionProps {
    title: string;
    isOpen: boolean;
    onToggle?: (isOpen: boolean) => void;
    children: ReactNode;
}

export default function Accordion({ title, isOpen, onToggle, children }: AccordionProps) {

    const [isAccordionOpen, setIsAccordionOpen] = useState(isOpen);

    return (
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-purple-500/30 rounded-lg overflow-hidden">
            {/* Accordion Header */}
            <button
                onClick={() => toggleAccordion()}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-700/30 transition"
            >
                <h3 className="text-lg font-semibold text-purple-300">{title}</h3>
                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-purple-300">
                        {isAccordionOpen ? 'Hide' : 'Show'}
                    </span>
                    <svg
                        className={`w-5 h-5 text-purple-300 transition-transform ${isAccordionOpen ? 'transform rotate-180' : ''
                            }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </div>
            </button>

            {/* Accordion Content */}
            {isAccordionOpen && (
                <div className="px-6 py-4 border-t border-purple-500/30">
                    {children}
                </div>
            )}
        </div>
    );

    function toggleAccordion(): void {
        setIsAccordionOpen(!isAccordionOpen);
        onToggle?.(!isAccordionOpen);
    }
}
