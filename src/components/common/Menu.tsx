import { Link } from 'react-router';

export default function Menu({ isMobile }: { isMobile: boolean }) {
  const classes = isMobile ? "grid grid-cols-1 md:hidden gap-4 mt-4 pt-4 border-t border-border-light space-y-3" : "hidden md:flex space-x-8 items-center";
    return (
        <nav className={classes}>
            <Link
                to="/fd"
                className="transition text-text-secondary hover:text-text-primary"
            >
                FD
            </Link>
            <Link
                to="/mutual-funds/my-funds"
                className="transition text-text-secondary hover:text-text-primary"
            >
                My Funds
            </Link>
            <Link
                to="/mutual-funds/watchlist"
                className="transition text-text-secondary hover:text-text-primary"
            >
                Watchlist
            </Link>
            <Link
                to="/mutual-funds/explore-funds"
                className="transition text-text-secondary hover:text-text-primary"
            >
                Explore Funds
            </Link>
            <Link
                to="/ppf"
                className="transition text-text-secondary hover:text-text-primary"
            >
                PPF
            </Link>
            <Link
                to="/privacy"
                className="transition text-text-secondary hover:text-text-primary"
            >
                Privacy & Terms
            </Link>
        </nav>
    )
}
