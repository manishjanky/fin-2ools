
import { lazy, Suspense, } from 'react';
import { Navigate, Outlet, ScrollRestoration, createBrowserRouter } from 'react-router';
import Home from './pages/Home';
import SchemeDetails from './pages/mutual-funds/SchemeDetails';
import './App.css';
import PageLoader from './components/common/PageLoader';
import Footer from './components/common/Footer';

// Lazy load FD and Mutual Funds pages for code splitting
const FD = lazy(() => import('./pages/fd/FD'));
const MutualFunds = lazy(() => import('./pages/mutual-funds/MutualFunds'));
const MyFunds = lazy(() => import('./pages/mutual-funds/MyFunds'));
const MyFundDetails = lazy(() => import('./pages/mutual-funds/MyFundDetails'));

const Layout = () => {
    return (
        <>
            <ScrollRestoration />
            <Outlet />
            <Footer />
        </>
    );
}


const routes = [
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "home",
                element: <Home />,
            },
            {
                path: "fd",
                element: (
                    <Suspense fallback={<PageLoader />}>
                        <FD />
                    </Suspense>
                ),
            },
            {
                path: "mutual-funds",
                children: [
                    {
                        index: true,
                        element: (
                            <Suspense fallback={<PageLoader />}>
                                <MutualFunds />
                            </Suspense>
                        ),
                    },
                    {
                        path: "explore-funds",
                        element: (
                            <Suspense fallback={<PageLoader />}>
                                <MutualFunds />
                            </Suspense>
                        ),
                    },
                    {
                        path: "my-funds",
                        children: [
                            {
                                index: true,
                                element: (
                                    <Suspense fallback={<PageLoader />}>
                                        <MyFunds />
                                    </Suspense>
                                ),
                            },
                            {
                                path: "scheme/:schemeCode",
                                element: (
                                    <Suspense fallback={<PageLoader />}>
                                        <MyFundDetails />
                                    </Suspense>
                                ),
                            },
                        ],
                    },
                    {
                        path: "scheme/:schemeCode",
                        element: (
                            <Suspense fallback={<PageLoader />}>
                                <SchemeDetails />
                            </Suspense>
                        ),
                    },
                ],
            },
        ],
    },
    {
        path: "*",
        element: <Navigate to="/" replace />,
    },
];

const router = createBrowserRouter(routes);
export default router;