import { useLocation, type useNavigate } from "react-router";

function Back({ navigate, label, to }: { navigate: ReturnType<typeof useNavigate>, label?: string, to?: string }) {
    const location = useLocation();
    const isRootRoute = location.pathname === '/';

    return (
        !isRootRoute &&
        <button
            onClick={() => to ? navigate(to) : navigate(-1)}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition mb-2"
        >
            ← {label || 'Back'}
        </button>
    )
}

export default Back;