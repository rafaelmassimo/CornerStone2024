import { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup'
import clsx from 'clsx';
import { SectionGallery } from '@/interfaces';
import { setReloading } from '@/store/slices/reload.slice';
import { useAppDispatch } from '@/store';
import { uploadSectionGallery } from '@/sections/actions/section.update.action';
import styles from '@/users/components/profile.module.css';
import { setUploadingImageKey } from '@/store/slices/imageUpload.slice';

type Props = {
  position: 1 | 2 | 3;
  section: SectionGallery;
};

export const formSchema = yup.object().shape({
  image: yup.mixed().required('Image is required'),
});

const UploadSectionGallery: React.FC<Props> = ({ position, section }) => {
  const [imageFieldKey, setImageFieldKey] = useState(Date.now());
  const dispatch = useAppDispatch();

  const formik = useFormik<{ image: File | null }>({
    initialValues: {
      image: null,
    },
    validationSchema: formSchema,
    onSubmit: async (values) => {
      try{
        dispatch(setReloading(true))
        dispatch(setUploadingImageKey(`${section.item.id}-${position}`))
        const formData = new FormData();

        formData.append('image', values.image!);

        const data = await uploadSectionGallery(position, section.item.id, formData);

        if (data.error) {
          setToast({ message: data.error, type: 'error' });
        } else {
          dispatch(setReloading(false)); // reloading false
        }
        
        setTimeout(() => {
          setToast({ message: '', type: '' });
          setImageFieldKey(Date.now());
        }, 4000);
      }catch(error){
        console.error("There has been a problem with your fetch operation: ", error);
        throw error;
      }finally{
        dispatch(setReloading(false))
        dispatch(setUploadingImageKey(''))
      }
      
    },
  });

  const [toast, setToast] = useState({
    message: '',
    type: ''
  });

  return (
    <div className='flex justify-around w-full text-xs'>
      {toast.message && (
        <div className={`fixed z-[100] top-5 right-5 w-fit bg-${toast.type === 'error' ? 'red' : 'green'}-500 text-white text-lg px-5 py-3 rounded-md mb-5 ${styles.slideLeft}`}>
          {toast.message}
        </div>
      )}
      <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
        <section className="my-5 flex gap-x-3 justify-center items-center max-lg:flex-col max-sm:flex-row">
          <input
            key={`${position}+${imageFieldKey}`}
            id="image"
            type="file"
            name="image"
            onChange={(event) => {
              return formik.setFieldValue('image', event.target.files![0]);
            }}
            className={clsx(
              `block w-[260px] max-md:w-full h-9 rounded-md px-2 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2`,
              { 'border-2 border-red-500': formik.touched.image && formik.errors.image }
            )}
          />
          <button type="submit" className="my-1 px-2 py-1 rounded-lg bg-stone-200 hover:bg-stone-300 text-stone-700 transition-colors">upload</button>
        </section>
      </form>
      {toast.message && (
        <div className={clsx('toast', toast.type)}>
          {toast.message}
        </div>
      )}
    </div>
  );
}

export default UploadSectionGallery;