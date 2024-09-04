import { useSelector } from "react-redux";
import { useAppDispatch } from "../redux/hooks";
import {
    selectNotifState,
    clearNotification,
} from "../redux/slices/notificationSlice";
import { Toast } from "flowbite-react";
import { HiCheck, HiExclamation } from "react-icons/hi";

const ToastNotification = () => {
    const dispatch = useAppDispatch();
    const { message, type } = useSelector(selectNotifState);

    const clearNotif = () => {
        dispatch(clearNotification());
    };

    if (!message || !type) return null;

    return (
        <div className="flex flex-col gap-4">
            <Toast>
                {type === "success" ? (
                    <>
                        <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
                            <HiCheck className="h-5 w-5" />
                        </div>
                        <div className="p-2"> {message}</div>
                        <Toast.Toggle onClick={clearNotif} />
                    </>
                ) : (
                    <>
                        <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
                            <HiExclamation className="h-5 w-5" />
                        </div>
                        <div className="p-2">{message}</div>
                        <Toast.Toggle onClick={clearNotif} />
                    </>
                )}
            </Toast>
        </div>
    );
};

export default ToastNotification;
