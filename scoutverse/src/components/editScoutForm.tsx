"use client";

import { Label, TextInput, Select, Button } from "flowbite-react";
import { HiMail, HiOutlineArrowRight } from "react-icons/hi";
import * as yup from "yup";
import { useAppDispatch } from "../redux/hooks";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { ScoutData } from "../redux/types";
import { editScout, selectScoutState } from "../redux/slices/scoutSlice";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";
import { notify } from "../redux/slices/notificationSlice";
import { useEffect } from "react";

const validationSchema = yup.object({
    first_name: yup.string().required("Required"),
    last_name: yup.string().required("Required"),
    khoump: yup.string().required("Required"),
    date_of_birth: yup.date().required("Required"),
    street: yup.string().required("Required"),
    city: yup.string().required("Required"),
    state: yup.string().required("Required"),
    zip_code: yup.string().required("Required"),
    contact_number: yup.string().required("Required"),
    contact_email: yup.string().required("Required"),
    parent_name: yup.string().required("Required"),
    parent_email: yup.string().required("Required"),
    parent_number: yup.string().required("Required"),
    allergies: yup.string().required("Required"),
    size: yup.string().required("Required"),
    status: yup
        .string()
        .oneOf(["ACTIVE", "INACTIVE", "PENDING"], "Invalid status")
        .required(),
});

const EditScoutForm: React.FC = () => {
    const dispatch = useAppDispatch();
    const scoutState = useSelector(selectScoutState);
    const currentScout = scoutState.allScouts.find(
        (scout) => scout.id === scoutState.currentScoutID
    );

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<ScoutData>({
        mode: "onChange",
        resolver: yupResolver(validationSchema),
    });

    useEffect(() => {
        if (currentScout) {
            setValue("first_name", currentScout.first_name);
            setValue("last_name", currentScout.last_name);
            setValue("khoump", currentScout.khoump);
            setValue("date_of_birth", currentScout.date_of_birth);
            setValue("street", currentScout.street);
            setValue("city", currentScout.city);
            setValue("state", currentScout.state);
            setValue("zip_code", currentScout.zip_code);
            setValue("contact_number", currentScout.contact_number);
            setValue("contact_email", currentScout.contact_email);
            setValue("parent_name", currentScout.parent_name);
            setValue("parent_email", currentScout.parent_email);
            setValue("parent_number", currentScout.parent_number);
            setValue("allergies", currentScout.allergies);
            setValue("size", currentScout.size);
            const status: "ACTIVE" | "INACTIVE" | "PENDING" =
                currentScout.status as "ACTIVE" | "INACTIVE" | "PENDING";
            setValue("status", status);
        }
    }, [currentScout, setValue]);

    const handleSubmitEditScout = ({
        first_name,
        last_name,
        khoump,
        date_of_birth,
        street,
        city,
        state,
        zip_code,
        contact_number,
        contact_email,
        parent_name,
        parent_email,
        parent_number,
        allergies,
        size,
        status,
    }: ScoutData) => {
        if (scoutState.currentScoutID) {
            dispatch(
                editScout(scoutState.currentScoutID, {
                    first_name: first_name,
                    last_name: last_name,
                    khoump: khoump,
                    date_of_birth: date_of_birth,
                    street: street,
                    city: city,
                    state: state,
                    zip_code: zip_code,
                    contact_number: contact_number,
                    contact_email: contact_email,
                    parent_name: parent_name,
                    parent_number: parent_number,
                    parent_email: parent_email,
                    allergies: allergies,
                    size: size,
                    status: status,
                })
            );
            navigate(-1);
        } else {
            dispatch(notify("No scout ID set in state", "error"));
        }
    };

    const handleCancel = () => {
        navigate(-1);
    };

    return (
        <div className="flex">
            <div className="flex-col lg:w-1/4"></div>
            <div className=" bg-white rounded-xl mx-auto shadow-lg overflow-hidden w-5/6 h-fit md:w-3/4 lg:mr-20">
                <form
                    onSubmit={handleSubmit(handleSubmitEditScout)}
                    className="flex max-w flex-col gap-4 p-4"
                    action=""
                >
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="firstname" value="First Name" />
                        </div>
                        <TextInput
                            id="first_name"
                            type="text"
                            required
                            className="w-full"
                            {...register("first_name")}
                        />
                        {errors.first_name && (
                            <p style={{ color: "red" }}>
                                {errors.first_name.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="last_name" value="Last Name" />
                        </div>
                        <TextInput
                            id="last_name"
                            type="text"
                            required
                            className="w-full"
                            {...register("last_name")}
                        />
                        {errors.last_name && (
                            <p style={{ color: "red" }}>
                                {errors.last_name.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="Khoump" value="Khoump" />
                        </div>
                        <Select
                            id="khoump"
                            required
                            className="w-full"
                            {...register("khoump")}
                        >
                            <option value="mogli">Mogli</option>
                            <option value="kylig">Kylig</option>
                            <option value="ardzvig">Ardzvig</option>
                            <option value="ari">Ari</option>
                            <option value="arenoush">Arenoush</option>
                            <option value="yerets">Yerets</option>
                            <option value="barmanouhi">Barmanouhi</option>
                            <option value="kerakouyn">Kerakouyn</option>
                        </Select>
                        {errors.khoump && (
                            <p style={{ color: "red" }}>
                                {errors.khoump.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="dob" value="Date of Birth" />
                        </div>
                        <ReactDatePicker
                            selected={watch("date_of_birth")}
                            onChange={(date) =>
                                setValue("date_of_birth", date as Date)
                            }
                            dateFormat="yyyy-MM-dd"
                            className="w-full rounded-md"
                            id="date_of_birth"
                        />
                        {errors.date_of_birth && (
                            <p style={{ color: "red" }}>
                                {errors.date_of_birth.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="street" value="Street" />
                        </div>
                        <TextInput
                            id="street"
                            type="text"
                            required
                            className="w-full"
                            {...register("street")}
                        />
                        {errors.street && (
                            <p style={{ color: "red" }}>
                                {errors.street.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="city" value="City" />
                        </div>
                        <TextInput
                            id="city"
                            type="text"
                            required
                            className="w-full"
                            {...register("city")}
                        />
                        {errors.city && (
                            <p style={{ color: "red" }}>
                                {errors.city.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="state" value="State" />
                        </div>
                        <input
                            type="hidden"
                            {...register("state")}
                            value="CA"
                        />
                        <TextInput
                            id="state"
                            type="text"
                            placeholder="CA"
                            value="CA"
                            required
                            disabled
                            className="w-full"
                            {...register("state")}
                        />
                        {errors.state && (
                            <p style={{ color: "red" }}>
                                {errors.state.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="zipcode" value="Zip Code" />
                        </div>
                        <TextInput
                            id="zip_code"
                            type="text"
                            required
                            className="w-full"
                            {...register("zip_code")}
                        />
                        {errors.zip_code && (
                            <p style={{ color: "red" }}>
                                {errors.zip_code.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label
                                htmlFor="contactnumber"
                                value="Scout Phone Number"
                            />
                        </div>
                        <TextInput
                            id="contact_number"
                            type="text"
                            className="w-full"
                            {...register("contact_number")}
                        />
                        {errors.contact_email && (
                            <p style={{ color: "red" }}>
                                {errors.contact_email.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label
                                htmlFor="contact_email"
                                value="Scout Email"
                            />
                        </div>
                        <TextInput
                            id="contact_email"
                            type="email"
                            rightIcon={HiMail}
                            className="w-full"
                            {...register("contact_email")}
                        />
                        {errors.contact_email && (
                            <p style={{ color: "red" }}>
                                {errors.contact_email.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="parent_name" value="Parent Name" />
                        </div>
                        <TextInput
                            id="parent_name"
                            type="text"
                            required
                            className="w-full"
                            {...register("parent_name")}
                        />
                        {errors.parent_name && (
                            <p style={{ color: "red" }}>
                                {errors.parent_name.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label
                                htmlFor="parent_email"
                                value="Parent Email"
                            />
                        </div>
                        <TextInput
                            id="parent_email"
                            type="email"
                            required
                            rightIcon={HiMail}
                            className="w-full"
                            {...register("parent_email")}
                        />
                        {errors.parent_email && (
                            <p style={{ color: "red" }}>
                                {errors.parent_email.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label
                                htmlFor="parent_number"
                                value="Parent Phone Number"
                            />
                        </div>
                        <TextInput
                            id="parent_number"
                            type="text"
                            required
                            className="w-full"
                            {...register("parent_number")}
                        />
                        {errors.parent_number && (
                            <p style={{ color: "red" }}>
                                {errors.parent_number.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="allergies" value="Allergies" />
                        </div>
                        <TextInput
                            id="allergies"
                            type="text"
                            required
                            className="w-full"
                            {...register("allergies")}
                        />
                        {errors.allergies && (
                            <p style={{ color: "red" }}>
                                {errors.allergies.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="size" value="T-Shirt Size" />
                        </div>
                        <Select
                            required
                            className="w-full"
                            {...register("size")}
                        >
                            <option value="YS">Youth Small</option>
                            <option value="YM">Youth Medium</option>
                            <option value="YL">Youth Large</option>
                            <option value="AS">Adult Small</option>
                            <option value="AM">Adult Medium</option>
                            <option value="AL">Adult Large</option>
                            <option value="AXL">Adult XL</option>
                            <option value="AXXL">Adult XXL</option>
                        </Select>
                        {errors.size && (
                            <p style={{ color: "red" }}>
                                {errors.size.message}
                            </p>
                        )}
                    </div>
                    <div className="flex mx-auto">
                        <div className="flex-col p-3">
                            <Button color="blue" size="md" pill type="submit">
                                Save
                            </Button>
                        </div>
                        <div className="flex-col p-3">
                            <Button
                                color="gray"
                                size="md"
                                pill
                                onClick={handleCancel}
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditScoutForm;
