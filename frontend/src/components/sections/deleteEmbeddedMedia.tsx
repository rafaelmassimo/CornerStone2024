"use client";

import { FaTrash } from 'react-icons/fa';
import { deleteSectionEmbeddedMedia } from '@/sections/actions/section.action';
import Swal from 'sweetalert2';
import { useAppDispatch } from '@/store';
import { setToast, resetToast } from '@/store/slices/toast.slice';

type Props = {
  portfolioId: string;
  sectionId: string;
};
const DeleteEmbeddedMedia: React.FC<Props> = ({ portfolioId, sectionId }) => {
  const dispatch = useAppDispatch();

  const handleDeleteEmbeddedMedia = async () => {
    Swal.fire({
			title: "Are you sure?",
			text: "You won't be able to revert this!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, delete it!"
		}).then(async (result) => {
			if (result.isConfirmed) {
				const data = await deleteSectionEmbeddedMedia(portfolioId, sectionId);

        if ("error" in data) {
					dispatch(setToast({ message: data.error, type: "error" }));
				}

				if ("message" in data) {
					dispatch(setToast({ message: data.message, type: "success" }));
				}

				setTimeout(() => dispatch(resetToast()), 3000);
			}
		});
  };

  return (
    <button
      className="m-4 bg-red-500 hover:bg-red-600 text-white p-2 rounded"
      onClick={handleDeleteEmbeddedMedia}
    >
      <FaTrash />
    </button>
  );
};

export default DeleteEmbeddedMedia;
