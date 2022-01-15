function Layout(props) {
	return (
		<>
			<div className="container bg-gray-200 min-h-screen w-screen">
				<div className="flex flex-col flex-wrap justify-center place-content-center">
					<div className="p-20">
						<h1 className="text-4xl">Welcome to Secure Ioio Link</h1>
					</div>

					<div className="bg-white p-20 h-screen w-3/6 text-center shadow-lg rounded m-auto">
						{props.children}
					</div>
				</div>
			</div>
		</>
	);
}

export default Layout;
