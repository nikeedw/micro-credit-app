import { createRoot } from 'react-dom/client'
import { AuthGuard } from './features/authGuard.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from "react-redux"
import { store } from "./app/store"

import './index.css'
import React from 'react'
import { Auth } from './pages/Auth.tsx'
import { Credit } from './pages/Credit.tsx'

const router = createBrowserRouter([
	{
		path: '/auth',
		element: <Auth />
	},
	{
		path: '/',
		element: <Credit />
	}
])

const container = document.getElementById("root")
if (container) {
    const root = createRoot(container)
  
    root.render(
        <React.StrictMode>
            <Provider store={store}>
                <AuthGuard>
                    <RouterProvider router={router} />
                </AuthGuard>
            </Provider>
        </React.StrictMode>,
    )
  } else {
    throw new Error(
        "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
    )
  }