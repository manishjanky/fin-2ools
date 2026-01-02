export default function MyFunds() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 text-white">
            <header className="bg-slate-900/50 backdrop-blur-sm border-b border-purple-500/30 py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl md:text-5xl font-bold">
                        My <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Funds</span>
                    </h1>
                    <p className="text-lg text-purple-200 mt-2">
                        View and manage your personal mutual fund investments.
                    </p>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Content for My Funds will go here */}
                <section>
                    <p className="text-purple-300">
                        This section is under development. Stay tuned for updates!
                    </p>
                </section>
            </main>
        </div>
    );
}