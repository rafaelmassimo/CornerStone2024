'use client';

import { useAppSelector } from '@/store';
import { useEffect, useState } from 'react';
import { MdAdd } from 'react-icons/md';
import CreateDivider from './createDivider';
import CreateEmbeddedMedia from './createEmbeddedMedia';
import CreateImage from './createImage';
import CreateImageText from './createImageText';
import CreateText from './createText';

type Props = {
	portfolioId: string;
	order: number;
};

const ChooseSection: React.FC<Props> = ({ portfolioId, order }) => {
	const reloading = useAppSelector((state) => state.reloading.reloading);
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		setIsOpen(false);
	}, [reloading]);

	const openModal = () => {
		setIsOpen(true);
	};

	const closeModal = () => {
		setIsOpen(false);
	};

	return (
		<>
			{/* Open modal button */}
			<div className="flex justify-center z-10">
				<button
					className="bg-slate-600 p-2 rounded text-white"
					type="button"
					onClick={openModal}
				><MdAdd size={20} /></button>
			</div>

			{/* Modal */}
			{isOpen && (
				<div className="fixed z-10 top-0 left-0 w-screen h-screen flex items-center justify-center bg-blue-500 bg-opacity-50 transform scale-100 transition-transform duration-300">
					{/* Modal content */}
					<div className="bg-[#13141A] text-white w-1/2 h-1/2 p-12 rounded-md">
						{/* Close modal button */}
						<button className="focus:outline-none" type="button" onClick={closeModal}>
							{/* Hero icon - close button */}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						</button>
						{/* Modal content */}
						<div>
							<h2 className="text-xl">Add section</h2>
							<div className="border rounded-md flex flex-wrap justify-center gap-3">
								<CreateText portfolioId={portfolioId} order={order} />
								<CreateImage portfolioId={portfolioId} order={order} />
								<CreateImageText portfolioId={portfolioId} order={order} />
								<CreateEmbeddedMedia portfolioId={portfolioId} order={order} />
								<CreateDivider portfolioId={portfolioId} order={order} />
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default ChooseSection;
