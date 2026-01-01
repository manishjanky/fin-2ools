export default function Footer() {
    return (
        <footer className="border-t border-purple-500/30 pt-20 py-8 bg-slate-900/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <p className="text-purple-300 text-sm">&copy; 2026 fin-2ools by Manish Kumar. All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <a href="#" className="text-purple-300 hover:text-white transition text-sm">Privacy</a>
                        <a href="#" className="text-purple-300 hover:text-white transition text-sm">Terms</a>
                        <a href="#" className="text-purple-300 hover:text-white transition text-sm">Contact</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}