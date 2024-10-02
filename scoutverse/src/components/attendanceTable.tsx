import { useNavigate } from "react-router-dom";
import { Table } from "flowbite-react";
import { useAppDispatch } from "../redux/hooks";
import { ScoutPayload } from "../redux/types";
import { Button, Modal, Label, Select } from "flowbite-react";
import {
    selectScoutState,
    setCurrentScoutID,
} from "../redux/slices/scoutSlice";
import { useState } from "react";
import ScoutInfoModal from "./scoutInfoModal";
import { useSelector } from "react-redux";
import { IoEyeOutline } from "react-icons/io5";
import { selectAttendanceState } from "../redux/slices/attendanceSlice";

const AttendanceTable: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const attendanceState = useSelector(selectAttendanceState);
    const scoutState = useSelector(selectScoutState);
    const [openModal, setOpenModal] = useState(false);
    const [scoutKhoump, setScoutKhoump] = useState("kylig");

    const scoutList = scoutState.allScouts;
    const khoumpList = scoutList.filter(
        (scout) => scout.khoump === scoutKhoump && scout.status === "ACTIVE"
    );

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
                            <Table.HeadCell>Khoump</Table.HeadCell>
                            <Table.HeadCell>DOB</Table.HeadCell>
                            <Table.HeadCell>Details</Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            {khoumpList.map((scout, index) => (
                                <Table.Row key={index}>
                                    <Table.Cell>{scout.first_name}</Table.Cell>
                                    <Table.Cell>{scout.last_name}</Table.Cell>
                                    <Table.Cell>{scout.khoump}</Table.Cell>
                                    <Table.Cell>
                                        {scout.date_of_birth
                                            .toString()
                                            .substring(0, 10)}
                                    </Table.Cell>
                                    <Button
                                        className="mx-auto mt-2"
                                        pill
                                        size="sm"
                                        color="blue"
                                        onClick={() =>
                                            handleViewScout(scout.id)
                                        }
                                    >
                                        <IoEyeOutline size={20} />
                                    </Button>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
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
