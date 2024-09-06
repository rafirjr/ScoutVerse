import { useNavigate } from "react-router-dom";
import { Table } from "flowbite-react";
import { useAppDispatch } from "../redux/hooks";
import { useSelector } from "react-redux";
import { selectScoutState } from "../redux/slices/scoutSlice";
import { ScoutPayload } from "../redux/types";

interface RosterTableProps {
    scouts: ScoutPayload[];
}

const RosterTable: React.FC<RosterTableProps> = ({ scouts }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    return (
        <div className="flex">
            <div className="flex-col lg:w-1/4"></div>
            <div className=" bg-white rounded-xl mx-auto shadow-lg overflow-hidden w-5/6 h-fit md:w-3/4 lg:mr-36">
                <Table striped>
                    <Table.Head>
                        <Table.HeadCell>First Name</Table.HeadCell>
                        <Table.HeadCell>Last Name</Table.HeadCell>
                        <Table.HeadCell>Khoump</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {scouts.map((scout, index) => (
                            <Table.Row key={index}>
                                <Table.Cell>{scout.first_name}</Table.Cell>
                                <Table.Cell>{scout.last_name}</Table.Cell>
                                <Table.Cell>{scout.khoump}</Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </div>
        </div>
    );
};

export default RosterTable;
