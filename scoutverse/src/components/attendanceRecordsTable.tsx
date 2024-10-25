import { useNavigate } from "react-router-dom";
import { Table, TextInput } from "flowbite-react";
import { useAppDispatch } from "../redux/hooks";
import {
    AttendanceData,
    AttendancePayload,
    ScoutPayload,
} from "../redux/types";
import { Button, Modal, Label, Select, Checkbox } from "flowbite-react";
import {
    selectScoutState,
    setCurrentScoutID,
} from "../redux/slices/scoutSlice";
import { useState } from "react";
import ScoutInfoModal from "./scoutInfoModal";
import { useSelector } from "react-redux";
import { IoEyeOutline } from "react-icons/io5";
import {
    fetchDateAttendance,
    fetchScoutAttendance,
    selectAttendanceState,
} from "../redux/slices/attendanceSlice";
import ReactDatePicker from "react-datepicker";
import { FaRegCheckCircle } from "react-icons/fa";

const AttendanceRecordsTable: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const attendanceState = useSelector(selectAttendanceState);
    const scoutState = useSelector(selectScoutState);
    const [openModal, setOpenModal] = useState(false);
    const [filterBy, setFilterBy] = useState(true);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedDateString, setSelectedDateString] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedScout, setSelectedScout] = useState("");

    const allScouts = scoutState.allScouts;
    const scoutList = allScouts.filter((scout) =>
        attendanceState.attendanceScoutList.includes(scout.id)
    );

    const searchedScouts = allScouts.filter((scout) => {
        const name = scout.first_name + " " + scout.last_name;
        return name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const attendanceRecords = attendanceState.allAttendance;

    const handleViewScout = (scoutID: string) => {
        dispatch(setCurrentScoutID(scoutID));
        setOpenModal(true);
        //navigate("/scoutinfo");
    };

    const handleFilterBy = (event: React.ChangeEvent<HTMLSelectElement>) => {
        if (event.target.value === "date") {
            setFilterBy(true);
        } else {
            setFilterBy(false);
        }
    };

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
        if (date) {
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const day = date.getDate();
            const dateToString = `${year}-${month}-${day}`;
            dispatch(fetchDateAttendance(dateToString));
            setSelectedDateString(dateToString);
        }
    };

    const getAttendanceForScout = (scoutID: string) => {
        return attendanceRecords.find(
            (record) =>
                record.scout_id === scoutID &&
                record.present_date === selectedDateString
        );
    };

    const handleSelectScout = (scout: ScoutPayload) => {
        const scout_id = scout.id;
        dispatch(fetchScoutAttendance(scout_id));
        setSelectedScout(scout_id);
        //console.log(scout_id);
    };

    return (
        <div className="flex">
            <div className="flex-col lg:w-1/4"></div>
            <div className=" bg-white rounded-xl mx-auto shadow-lg overflow-hidden w-5/6 h-fit md:w-3/4 lg:mr-36">
                <div className="overflow-x-auto w-full gap-4 p-4">
                    <div className="mb-2 block">
                        <Label htmlFor="Filter_by" value="Filter By:" />
                    </div>
                    <Select
                        required
                        className="w-full"
                        onChange={handleFilterBy}
                    >
                        <option value="date">Date</option>
                        <option value="scout">Scout</option>
                    </Select>
                </div>
                <div className="overflow-x-auto w-full gap-4 p-4">
                    {filterBy ? (
                        <>
                            <div>
                                <ReactDatePicker
                                    selected={selectedDate}
                                    onSelect={(date) => handleDateChange(date)}
                                    dateFormat="yyyy-MM-dd"
                                    className="w-full rounded-md"
                                    placeholderText="YYYY-MM-DD"
                                />
                            </div>
                            <div className="container mx-auto h-10"></div>
                            <div className="overflow-x-auto w-full">
                                <Table striped>
                                    <Table.Head>
                                        <Table.HeadCell>Name</Table.HeadCell>
                                        <Table.HeadCell>Paid</Table.HeadCell>
                                        <Table.HeadCell>
                                            Full Daraz
                                        </Table.HeadCell>
                                        <Table.HeadCell>Details</Table.HeadCell>
                                    </Table.Head>
                                    <Table.Body className="divide-y">
                                        {scoutList.map((scout) => {
                                            const attendance =
                                                getAttendanceForScout(scout.id);

                                            return (
                                                <Table.Row key={scout.id}>
                                                    <Table.Cell>
                                                        {scout.first_name +
                                                            " " +
                                                            scout.last_name}
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        {attendance?.paid
                                                            ? "Paid"
                                                            : "Not Paid"}
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        {attendance?.daraz
                                                            ? "Full Daraz"
                                                            : "Missing Daraz"}
                                                    </Table.Cell>

                                                    <Table.Cell>
                                                        <Button
                                                            className="mt-2"
                                                            pill
                                                            size="sm"
                                                            color="blue"
                                                            onClick={() =>
                                                                handleViewScout(
                                                                    scout.id
                                                                )
                                                            }
                                                        >
                                                            <IoEyeOutline
                                                                size={20}
                                                            />
                                                        </Button>
                                                    </Table.Cell>
                                                </Table.Row>
                                            );
                                        })}
                                    </Table.Body>
                                </Table>
                            </div>
                        </>
                    ) : (
                        // Displays when user wants to search for specific scout
                        <>
                            <div className="mb-2 block">
                                <Label htmlFor="Name" value="Name" />
                            </div>
                            <TextInput
                                type="text"
                                placeholder="Search by name"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full"
                            />
                            <div className="container mx-auto h-10"></div>
                            <div className="overflow-x-auto w-full">
                                <Table striped>
                                    <Table.Head>
                                        <Table.HeadCell>Name</Table.HeadCell>
                                        <Table.HeadCell>Select</Table.HeadCell>
                                        <Table.HeadCell>Details</Table.HeadCell>
                                    </Table.Head>
                                    <Table.Body className="divide-y">
                                        {searchedScouts.map((scout) => {
                                            return (
                                                <Table.Row key={scout.id}>
                                                    <Table.Cell>
                                                        {scout.first_name +
                                                            " " +
                                                            scout.last_name}
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        <Button
                                                            className=""
                                                            pill
                                                            size="sm"
                                                            color="green"
                                                            onClick={() =>
                                                                handleSelectScout(
                                                                    scout
                                                                )
                                                            }
                                                        >
                                                            <FaRegCheckCircle />
                                                        </Button>
                                                    </Table.Cell>

                                                    <Table.Cell>
                                                        <Button
                                                            className="mt-2"
                                                            pill
                                                            size="sm"
                                                            color="blue"
                                                            onClick={() =>
                                                                handleViewScout(
                                                                    scout.id
                                                                )
                                                            }
                                                        >
                                                            <IoEyeOutline
                                                                size={20}
                                                            />
                                                        </Button>
                                                    </Table.Cell>
                                                </Table.Row>
                                            );
                                        })}
                                    </Table.Body>
                                </Table>
                            </div>
                            {selectedScout ? ( // Displays when scout is selected
                                <div className="overflow-x-auto w-full">
                                    <Table striped>
                                        <Table.Head>
                                            <Table.HeadCell>
                                                Date
                                            </Table.HeadCell>
                                            <Table.HeadCell>
                                                Paid
                                            </Table.HeadCell>
                                            <Table.HeadCell>
                                                Daraz
                                            </Table.HeadCell>
                                        </Table.Head>
                                        <Table.Body className="divide-y">
                                            {attendanceState.attendanceDateList
                                                .slice()
                                                .sort(
                                                    (a, b) =>
                                                        new Date(
                                                            b.present_date
                                                        ).getTime() -
                                                        new Date(
                                                            a.present_date
                                                        ).getTime()
                                                )
                                                .map((record) => {
                                                    return (
                                                        <Table.Row
                                                            key={
                                                                record.attendance_id
                                                            }
                                                        >
                                                            <Table.Cell>
                                                                {
                                                                    record.present_date
                                                                }
                                                            </Table.Cell>
                                                            <Table.Cell>
                                                                {record.paid
                                                                    ? "Paid"
                                                                    : "Not Paid"}
                                                            </Table.Cell>
                                                            <Table.Cell>
                                                                {record.daraz
                                                                    ? "Full Daraz"
                                                                    : "Missing Daraz"}
                                                            </Table.Cell>
                                                        </Table.Row>
                                                    );
                                                })}
                                        </Table.Body>
                                    </Table>
                                </div>
                            ) : (
                                <></>
                            )}
                        </>
                    )}
                </div>

                <Modal show={openModal} onClose={() => setOpenModal(false)}>
                    {scoutState.currentScoutID ? (
                        <ScoutInfoModal
                            currentScoutID={scoutState.currentScoutID}
                            allScouts={scoutState.allScouts}
                        />
                    ) : (
                        <div>No Scout ID</div>
                    )}
                </Modal>
            </div>
        </div>
    );
};

export default AttendanceRecordsTable;
