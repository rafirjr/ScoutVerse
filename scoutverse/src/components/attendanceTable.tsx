import { useNavigate } from "react-router-dom";
import { Table } from "flowbite-react";
import { useAppDispatch } from "../redux/hooks";
import { AttendanceData, ScoutPayload } from "../redux/types";
import { Button, Modal, Label, Select, Checkbox } from "flowbite-react";
import {
    selectScoutState,
    setCurrentScoutID,
} from "../redux/slices/scoutSlice";
import { useState } from "react";
import ScoutInfoModal from "./scoutInfoModal";
import { useSelector } from "react-redux";
import { IoEyeOutline } from "react-icons/io5";
import { selectAttendanceState } from "../redux/slices/attendanceSlice";
import { HiOutlineArrowRight } from "react-icons/hi";

const AttendanceTable: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const attendanceState = useSelector(selectAttendanceState);
    const scoutState = useSelector(selectScoutState);
    const [openModal, setOpenModal] = useState(false);
    const [scoutKhoump, setScoutKhoump] = useState("kylig");
    const [present, setPresent] = useState(false);
    const [paid, setPaid] = useState(false);
    const [fullDaraz, setFullDaraz] = useState(false);
    const logAttendanceMap: { [scoutID: string]: AttendanceData } = {};
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const day = currentDate.getDate();

    const scoutList = scoutState.allScouts;
    const khoumpList = scoutList.filter(
        (scout) => scout.khoump === scoutKhoump && scout.status === "ACTIVE"
    );

    for (const scout of khoumpList) {
        const id = scout.id;
        const data = {
            present_date: "",
            daraz: false,
            paid: false,
        };

        logAttendanceMap[id] = data;
    }

    const handleViewScout = (scoutID: string) => {
        dispatch(setCurrentScoutID(scoutID));
        setOpenModal(true);
        //navigate("/scoutinfo");
    };

    const handleSelectKhoump = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setScoutKhoump(event.target.value);
    };

    const handlePresentCheck = (scoutID: string) => {
        setPresent(!present);
        if (present) {
            logAttendanceMap[scoutID].present_date = `${year}-${month}-${day}`;
        } else {
            logAttendanceMap[scoutID].present_date = "";
        }
    };

    const handlePaidCheck = (scoutID: string) => {
        setPaid(!paid);
        if (paid) {
            logAttendanceMap[scoutID].paid = true;
        } else {
            logAttendanceMap[scoutID].paid = false;
        }
    };

    const handleFullDarazCheck = (scoutID: string) => {
        setFullDaraz(!fullDaraz);
        if (fullDaraz) {
            logAttendanceMap[scoutID].daraz = true;
        } else {
            logAttendanceMap[scoutID].daraz = false;
        }
    };

    const handleSubmitAttendance = () => {
        console.log("Submitted");

        navigate("/dashboard");
    };

    return (
        <div className="flex">
            <div className="flex-col lg:w-1/4"></div>
            <div className=" bg-white rounded-xl mx-auto shadow-lg overflow-hidden w-5/6 h-fit md:w-3/4 lg:mr-36">
                <div className="overflow-x-auto w-full gap-4 p-4">
                    <div className="mb-2 block">
                        <Label htmlFor="Khoump" value="Khoump" />
                    </div>
                    <Select
                        required
                        className="w-full"
                        onChange={handleSelectKhoump}
                        value={scoutKhoump}
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
                </div>
                <div className="overflow-x-auto w-full">
                    <Table striped>
                        <Table.Head>
                            <Table.HeadCell>First Name</Table.HeadCell>
                            <Table.HeadCell>Last Name</Table.HeadCell>
                            <Table.HeadCell>Present</Table.HeadCell>
                            <Table.HeadCell>Paid</Table.HeadCell>
                            <Table.HeadCell>Full Daraz</Table.HeadCell>
                            <Table.HeadCell>Details</Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            {khoumpList.map((scout, index) => (
                                <Table.Row key={index}>
                                    <Table.Cell>{scout.first_name}</Table.Cell>
                                    <Table.Cell>{scout.last_name}</Table.Cell>
                                    <Table.Cell>
                                        <Checkbox
                                            onChange={() =>
                                                handlePresentCheck(scout.id)
                                            }
                                        />
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Checkbox
                                            onChange={() =>
                                                handlePaidCheck(scout.id)
                                            }
                                        />
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Checkbox
                                            onChange={() =>
                                                handleFullDarazCheck(scout.id)
                                            }
                                        />
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Button
                                            className="mt-2"
                                            pill
                                            size="sm"
                                            color="blue"
                                            onClick={() =>
                                                handleViewScout(scout.id)
                                            }
                                        >
                                            <IoEyeOutline size={20} />
                                        </Button>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                </div>
                <div className="overflow-x-auto w-full gap-4 p-4">
                    <Button
                        className="bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto"
                        size="md"
                        pill
                        type="submit"
                        onClick={handleSubmitAttendance}
                    >
                        Submit
                        <HiOutlineArrowRight className="h-6 w-6" />
                    </Button>
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

export default AttendanceTable;
