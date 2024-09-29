import { useDispatch, useSelector } from "react-redux"
import { CiLogout } from "react-icons/ci"
import { logout, selectCurrent, selectIsAuthenticated } from "../features/userSlice"
import { useNavigate } from "react-router-dom"
import { Button } from "@mui/material"

export const Header = () => {
	const isAuthenticated = useSelector(selectIsAuthenticated)
    const current = useSelector(selectCurrent)
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const hadleLogout = () => {
		dispatch(logout())
		localStorage.removeItem('token')
		navigate("/auth")
	}

	return (
		<nav className="py-4 w-full bg-blue-100 flex justify-around items-center">
			<div>
				<p className="font-bold text-inherit">Micro Credit</p>
			</div>

			<div className="flex gap-4 items-center">
				<div>
					{current?.username || ''}
				</div>
				<div>
					{isAuthenticated && (
						<Button
							variant="outlined"
							className="flex gap-2"
                            size="small"
							onClick={hadleLogout}
						>
							<CiLogout /> 
                            <span>Выйти</span>
						</Button>
					)}
				</div>
			</div>
		</nav>
	)
}