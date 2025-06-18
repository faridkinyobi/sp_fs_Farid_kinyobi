'use client';
import { Button } from '@/components/ui/button';
import { ProviderContext } from '@/context/ThemeContext';
import { Plus } from 'lucide-react';
import React, { useCallback } from 'react';
import { DialogTaskDelet, DialogTaskModal } from './DialogTask';
import TaskCard from './TaskCard';

import { useDroppable } from '@dnd-kit/core';
import TaskCardSkeleton from './TaskCardSkeleton';
interface Task {
  id: string | number;
  title: string;
  description?: string;
  status: string;
  updatedAt?: string | number;
}

interface Props {
  title?: string;
  data?: Task[];
  isLoading: boolean;
  column: string | number;
}
export const Colume = React.memo((props: Props) => {
  const { title, data, isLoading, column } = props;
  const [DataEmail, setDataEmail] = React.useState({
    email: '',
    name: '',
  });
  const [deletShowModel, setDeletShowModel] = React.useState<boolean>(false);
  const [showDropdown, setShowDropdown] = React.useState<boolean>(false);

  React.useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    if (storedEmail) {
      setDataEmail((prev) => ({ ...prev, email: storedEmail }));
      setDataEmail((prev) => ({
        ...prev,
        name: storedEmail.charAt(0).toUpperCase(),
      }));
    }
  }, []);

  // context
  const context = React.useContext(ProviderContext);
  if (!context) return null;
  const { open, setId, setOpen } = context;

  const { setNodeRef, over } = useDroppable({
    id: column,
  });

  const handleAddModalOpen = React.useCallback(() => {
    setOpen((prev: typeof open) => ({ ...prev, task: !prev.task }));
  }, [setOpen, open]);

  const handleEdit = useCallback(
    (data: any) => {
      setShowDropdown(showDropdown);
      if (!open.task) {
        setId(data);
        setOpen((prev) => ({ ...prev, task: !prev.task }));
      }
    },
    [setId, setOpen, showDropdown],
  );

  const handleDelet = useCallback(
    (data: any) => {
      if (!open.task) {
        setId(data);
        setDeletShowModel(!deletShowModel);
      }
    },
    [setId, setOpen],
  );

  return (
    <div
      className={`rounded-lg shadow p-4 flex flex-col w-full bg-secondary ${
        column === over?.id &&
        'bg-white outline-2 outline-dashed outline-primary '
      }}`}
    >
      {deletShowModel && (
        <DialogTaskDelet
          deletShowModel={deletShowModel}
          setDeletShowModel={setDeletShowModel}
        />
      )}

      {title?.toLowerCase() === 'todo' && open.task && <DialogTaskModal />}
      <div className="flex flex-wrap justify-between w-full my-2.5 ">
        <h1
          className={`text-lg font-semibold  mb-4 flex items-center flex-nowrap capitalize ${
            column === 'todo'
              ? 'text-indigo-600 '
              : column !== 'done'
                ? 'text-amber-600  '
                : 'text-green-600'
          } `}
        >
          {props.title}
        </h1>
        {props.title?.toLowerCase() === 'todo' && (
          <Button
            size={'sm'}
            className="gap-1.5 cursor-pointer "
            onClick={() => handleAddModalOpen()}
          >
            <Plus />
            Add New Task
          </Button>
        )}
      </div>
      <div ref={setNodeRef} className="h-full space-y-3 md:space-y-5  ">
        {isLoading
          ? Array.from({ length: 1 }).map((_, i) => (
              <TaskCardSkeleton key={i} />
            ))
          : data?.map((task, index) => {
              return (
                <TaskCard
                  {...task}
                  key={task.id ?? index.toString()}
                  id={task.id}
                  column={column}
                  DataEmail={DataEmail}
                  onEdit={() => handleEdit(task)}
                  onDelet={() => handleDelet(task)}
                />
              );
            })}
      </div>
    </div>
  );
});
// export default React.memo(function Colume(props: Props) {
//   const { title, data, isLoading, column } = props;

//   const context = React.useContext(ProviderContext);
//   if (!context) return null;
//   const { open, handleOpen } = context;

//   const { setNodeRef, over } = useDroppable({
//     id: column,
//   });
//   console.log(`🔁 Render: ${title}`);
//   const handleToggleModal = React.useCallback(() => {
//     handleOpen((prev: typeof open) => ({ ...prev, task: !prev.task }));
//   }, [handleOpen, open]);

//   return (
//     <div
//       className={`rounded-lg shadow p-4 flex flex-col w-full bg-secondary ${
//         column === over?.id &&
//         'bg-white outline-2 outline-dashed outline-primary '
//       }}`}
//     >
//       {/* {title?.toLowerCase() === 'todo' && open && <DialogTaskModal />} */}
//       <div className="flex flex-wrap justify-between w-full my-2.5 ">
//         <h1
//           className={`text-lg font-semibold  mb-4 flex items-center flex-nowrap capitalize ${
//             column === 'todo'
//               ? 'text-indigo-600 '
//               : column !== 'done'
//                 ? 'text-amber-600  '
//                 : 'text-green-600'
//           } `}
//         >
//           {props.title}
//         </h1>
//         {props.title?.toLowerCase() === 'todo' && (
//           <Button
//             size={'sm'}
//             className="gap-1.5 cursor-pointer "
//             onClick={() => handleToggleModal()}
//           >
//             <Plus />
//             Add New Task
//           </Button>
//         )}
//       </div>
//       <div ref={setNodeRef} className="h-full space-y-3 md:space-y-5  ">
//         {data?.map((task, index) => {
//           return (
//             <TaskCard
//               {...task}
//               key={task.id ?? index.toString()}
//               id={task.id}
//               column={column}
//             />
//           );
//         })}
//       </div>
//     </div>
//   );
// });
