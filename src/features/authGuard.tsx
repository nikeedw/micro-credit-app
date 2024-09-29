import { useCurrentQuery } from '../app/services/userApi'

export const AuthGuard = ({ children }: { children: JSX.Element }) => {
    const pathname = window.location.pathname;
    const { isLoading } = useCurrentQuery()
    const loading = pathname !== '/auth' && isLoading

    if (loading) {
        return (
            <div className='h-screen flex items-center justify-center'>
                Пожалуйста, подождите...
            </div>
        )
    }

    return children
};
