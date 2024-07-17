import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Blog } from './blog';
import { store } from './store';
import './index.css';

const router = createBrowserRouter([
	{
		path: '/*',
		element: <Blog />,
	},
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<Provider store={store}>
		<RouterProvider router={router} />
	</Provider>,
);
