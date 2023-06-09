interface EmptyStateProps {}

const EmptyState = ({}: EmptyStateProps) => {
	return (
		<div className="flex items-center justify-center h-full px-4 py-10 sm:px-6 lg:px-8 bg-neutral-100">
			<div className="flex flex-col items-center text-center">
				<h3 className="mt-2 text-2xl font-semibold text-gray-900">
					Select a chart or start a new conversation
				</h3>
			</div>
		</div>
	);
};

export default EmptyState;
