import { useNavigate } from "react-router-dom";

function useAuthRedirect(): string {
    const navigate = useNavigate();
    const token = document.cookie.split('; ').find((row) => row.startsWith('token='))?.split('=')[1];
    if (!token) {
        alert('Please log in again.');
        navigate('/login');
    }
    return token || '';
}

export default useAuthRedirect;