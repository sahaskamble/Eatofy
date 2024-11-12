export default function LoadingSkeleton() {
	return (
		<div className="p-4 space-y-4">
			<div className="h-8 bg-gray-300 rounded-md animate-pulse"></div>
			<div className="h-8 bg-gray-300 rounded-md animate-pulse"></div>
			<div className="h-8 bg-gray-300 rounded-md animate-pulse"></div>
		</div>
	);
}

