import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumbs = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);

    // Don't show breadcrumbs on home page
    if (pathnames.length === 0) return null;

    return (
        <nav aria-label="breadcrumb" className="py-2 px-1">
            <ol className="flex items-center space-x-2 text-sm text-gray-500">
                <li>
                    <Link to="/" className="hover:text-green-800 transition-colors flex items-center">
                        <Home size={16} />
                    </Link>
                </li>
                {pathnames.map((value, index) => {
                    const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                    const isLast = index === pathnames.length - 1;

                    // Capitalize first letter
                    const title = value.charAt(0).toUpperCase() + value.slice(1);

                    return (
                        <li key={to} className="flex items-center space-x-2">
                            <ChevronRight size={14} className="text-gray-400" />
                            {isLast ? (
                                <span className="font-semibold text-green-800" aria-current="page">
                                    {title}
                                </span>
                            ) : (
                                <Link to={to} className="hover:text-green-800 transition-colors">
                                    {title}
                                </Link>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};

export default Breadcrumbs;
